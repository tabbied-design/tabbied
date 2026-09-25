import { Hono } from 'hono';
import { and, desc, eq, inArray, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import {
  directionToEdits,
  emptyEdits,
  hasErrors,
  isImageSlot,
  planEdits,
  type EditsDocument,
} from 'tabbied-templates';
import type {
  SiteDocument,
  SiteSummary,
  StoredDirection,
  StoredResult,
  StoredRevision,
} from '../../lib/studioDocument';
import * as schema from '../db/schema';
import { generation, revision, site, upload } from '../db/schema';
import type { Env } from '../env';
import {
  generateImage,
  respondJson,
  hasUpstream,
  UpstreamError,
  type ReferenceImage,
} from '../ai/client';
import {
  reviseSystemPrompt,
  reviseUserPrompt,
  siteImagePrompt,
  siteSystemPrompt,
  siteUserPrompt,
} from '../ai/prompt';
import {
  buildReviseValidator,
  buildSiteValidator,
  reviseJsonSchema,
  siteJsonSchema,
  siteSlots,
} from '../ai/siteSchema';
import { ensurePalette } from '../lib/palette';
import { checkQuota, recordUsage } from '../lib/quota';
import { consume } from '../lib/ratelimit';
import { claimTemplate, limitMessage, releaseTemplate, templateStatus } from '../lib/templates';
import { requireUser } from '../lib/session';
import { loadStudioIndex } from '../lib/studioIndex';
import {
  hashPackagedHtml,
  loadDesignSlugs,
  loadTemplateSpec,
} from '../lib/templateAssets';

// A site is a template a person is customizing, pinned to the template it was
// started on, with a revision history from the first document on. It starts
// one of two ways:
//
// - From a direction Studio generated: the full document, every text slot on
//   the template rewritten for the business. This is the second, dearer stage
//   after the directions call, and it is behind a click for that reason.
// - Straight from the template gallery, with nothing written for the
//   business: the site is made on the first Save with the customizer's
//   document as revision 1. No model is called, so no daily cap applies; the
//   burst limiter still does.
//
// The document is keyed by slot id, so this reaches every template alike.

const BURST = {
  make: { max: 3, windowSeconds: 60 },
  image: { max: 4, windowSeconds: 60 },
  revise: { max: 6, windowSeconds: 60 },
  // A manual save calls no model, so it has no daily cap, but it appends a
  // row each time.
  save: { max: 30, windowSeconds: 60 },
};

/**
 * The most a manual revision may be on the wire. A document is a few
 * kilobytes of slot text; `c.req.json()` buffers the whole body first, so the
 * declared length is checked before it is read.
 */
const MAX_REVISION_BYTES = 256 * 1024;

/** How many reference pictures one image call may take. */
const MAX_REFERENCES = 4;

/** Over-estimate for an upstream that omitted `usage`, as in studio.ts. */
const ESTIMATED_TOKENS = { prompt: 8_000, completion: 4_000 };

// Bounded throughout: the planner treats a value over a slot's budget as a
// warning, not an error, so without these a megabyte of text under a real
// slot id would be stored verbatim. The bounds are generous against anything
// the customizer writes (the planner, not the schema, refuses a design slug
// the catalog lacks, with its reason).
const slotId = z.string().min(1).max(120);
const color = z.string().max(32);
const editsDocumentSchema = z.object({
  specVersion: z.number().int(),
  slug: z.string().min(1).max(80),
  edits: z.object({
    text: z.record(slotId, z.string().max(4_000)).optional(),
    images: z
      .record(slotId, z.object({ src: z.string().min(1).max(512), alt: z.string().max(300).optional() }))
      .optional(),
    patterns: z
      .record(
        slotId,
        z.object({
          slug: z.string().max(64).optional(),
          palette: z.array(color).max(16).optional(),
          options: z
            .record(z.string().max(64), z.union([z.string().max(64), z.number(), z.boolean()]))
            .optional(),
          seed: z.string().max(64).optional(),
        })
      )
      .optional(),
    palette: z.array(color).max(16).optional(),
  }),
});

// A direction to make, or a template to start from. A template site arrives
// on its first Save with the document to store as revision 1 and whatever
// name the person gave it; a bare {slug} makes an empty revision 1.
const requestSchema = z.union([
  z.object({
    generationId: z.string().min(8).max(64),
    index: z.number().int().min(0).max(2),
  }),
  z.object({
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .max(80),
    edits: editsDocumentSchema.optional(),
    title: z.string().trim().min(1).max(80).optional(),
  }),
]);

const titleSchema = z.object({ title: z.string().trim().min(1).max(80) });

type Db = ReturnType<typeof drizzle<typeof schema>>;

/**
 * The site row and, when it was made from a direction, its generation's
 * description and result - null for a site started from the gallery.
 */
async function loadSite(db: Db, id: string) {
  const [row] = await db
    .select({ site, description: generation.description, result: generation.result })
    .from(site)
    .leftJoin(generation, eq(generation.id, site.generationId))
    .where(eq(site.id, id))
    .limit(1);

  return row ?? null;
}

/** The direction a site was made from, or undefined for a gallery site. */
function directionOf(row: {
  site: { directionIndex: number | null };
  result: string | null;
}): StoredDirection | undefined {
  if (row.result == null || row.site.directionIndex == null) return undefined;

  return (JSON.parse(row.result) as StoredResult).directions[row.site.directionIndex];
}

/**
 * The template's own name and palette, from the studio index. What a gallery
 * site is described by, and the fallback for a direction whose generation
 * has since gone.
 */
async function templateEntry(env: Env, request: Request, slug: string) {
  return (await loadStudioIndex(env, request)).find((entry) => entry.slug === slug);
}

/**
 * The latest revision's document for each of several sites, in one query.
 * The subquery qualifies its columns by hand: drizzle renders a column of the
 * outer table bare when the outer query has no join, and inside the subquery
 * a bare `site_id` is the alias's own.
 */
async function latestEditsFor(db: Db, siteIds: string[]): Promise<Map<string, EditsDocument>> {
  if (siteIds.length === 0) return new Map();

  const rows = await db
    .select({ siteId: revision.siteId, edits: revision.edits })
    .from(revision)
    .where(
      and(
        inArray(revision.siteId, siteIds),
        sql`${revision}.n = (select max(r2.n) from ${revision} r2 where r2.site_id = ${revision}.site_id)`
      )
    );

  return new Map(rows.map((row) => [row.siteId, JSON.parse(row.edits) as EditsDocument]));
}

/** The newest revision, which every write builds on. */
async function latestRevision(db: Db, siteId: string) {
  const [row] = await db
    .select()
    .from(revision)
    .where(eq(revision.siteId, siteId))
    .orderBy(desc(revision.n))
    .limit(1);

  return row ?? null;
}

/**
 * Append revision n+1 and touch the site, in that order - the site's
 * updatedAt is what the listing sorts on, so a write that changed the
 * document has to move it.
 */
async function appendRevision(
  db: Db,
  options: {
    siteId: string;
    n: number;
    edits: EditsDocument;
    instruction: string | null;
    source: 'ai' | 'manual' | 'fallback';
    model: string;
    responseId: string | null;
  }
) {
  const now = new Date();

  await db.insert(revision).values({
    id: newId(),
    siteId: options.siteId,
    n: options.n,
    edits: JSON.stringify(options.edits),
    instruction: options.instruction,
    source: options.source,
    model: options.model,
    responseId: options.responseId,
    createdAt: now,
  });
  await db.update(site).set({ updatedAt: now }).where(eq(site.id, options.siteId));

  return { n: options.n, createdAt: now };
}

/**
 * Reference pictures, by upload id, owned by this person. Someone else's
 * upload id is treated as unknown rather than as forbidden - an id is not a
 * thing to confirm the existence of.
 */
async function loadReferences(
  env: Env,
  db: Db,
  userId: string,
  ids: string[]
): Promise<ReferenceImage[] | null> {
  if (ids.length === 0) return [];

  const rows = await db
    .select({ id: upload.id, key: upload.key, contentType: upload.contentType })
    .from(upload)
    .where(and(eq(upload.userId, userId), inArray(upload.id, ids)));

  if (rows.length !== ids.length) return null;

  const objects = await Promise.all(rows.map((row) => env.MEDIA.get(row.key)));

  if (objects.some((object) => object === null)) return null;

  return Promise.all(
    objects.map(async (object, index) => ({
      bytes: await object!.arrayBuffer(),
      contentType: rows[index].contentType,
    }))
  );
}

const sites = new Hono<{ Bindings: Env }>();

const newId = () => crypto.randomUUID().replace(/-/g, '');

/**
 * The output budget scales with the page. Reasoning is spent from the same
 * cap before any text is emitted, and a 300-slot bespoke page is a long
 * answer - a cap sized for three strings comes back `incomplete` with nothing.
 */
const outputBudget = (slotCount: number) => Math.min(24_000, 3_000 + slotCount * 60);

sites.post('/', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to make a site.' }, 401);
  }

  // The first document of a template site rides on this call.
  if (Number(c.req.header('content-length') ?? 0) > MAX_REVISION_BYTES) {
    return c.json({ error: 'That document is too large to be one.' }, 413);
  }

  const parsed = requestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Choose a direction to make, or a template to start from.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });

  // ---- from the gallery ---------------------------------------------------
  // The customizer calls this on the first Save, with the document it has
  // been holding, so opening Customize and leaving writes nothing. Not
  // idempotent: each Save of a new draft is a new site.
  if ('slug' in parsed.data) {
    const { slug, title } = parsed.data;
    const entry = await templateEntry(c.env, c.req.raw, slug);

    if (!entry) {
      return c.json({ error: 'No such template.' }, 404);
    }

    const burst = await consume(db, { key: `site:${userId}`, ...BURST.make });

    if (!burst.ok) {
      return c.json({ error: 'Too fast. Try again in a minute.' }, 429, {
        'retry-after': String(burst.retryAfter),
      });
    }

    const [spec, templateHash] = await Promise.all([
      loadTemplateSpec(c.env, c.req.raw, slug),
      hashPackagedHtml(c.env, c.req.raw, slug),
    ]);
    const edits = (parsed.data.edits as EditsDocument | undefined) ?? emptyEdits(spec);
    const refused = await refuseDocument(c.env, c.req.raw, { spec, slug, siteId: null, edits });

    if (refused) {
      return c.json(refused.body, refused.status);
    }

    // Saving makes the template one of the person's, the same claim a first
    // download makes (lib/templates.ts). One already theirs saves freely.
    const claim = await claimTemplate(db, userId, slug);

    if (!claim.ok) {
      const status = await templateStatus(db, userId);

      return c.json({ error: limitMessage(status.total), used: status.used, total: status.total }, 403);
    }

    const id = newId();
    const now = new Date();

    // One batch, so a site cannot exist without its first revision. A claim
    // this request made is given back if the write fails, so a D1 error does
    // not spend one of the five on a site never saved.
    try {
      await db.batch([
        db.insert(site).values({
          id,
          userId,
          generationId: null,
          directionIndex: null,
          slug,
          title: title ?? entry.name,
          specVersion: spec.specVersion,
          templateHash,
          createdAt: now,
          updatedAt: now,
        }),
        db.insert(revision).values({
          id: newId(),
          siteId: id,
          n: 1,
          edits: JSON.stringify(edits),
          instruction: null,
          source: 'manual',
          model: 'none',
          responseId: null,
          createdAt: now,
        }),
      ]);
    } catch (error) {
      if (claim.id) {
        await releaseTemplate(db, claim.id).catch((cause) =>
          console.error('[templates] could not give back the claim after a failed save', cause)
        );
      }

      throw error;
    }

    return c.json({ id, source: 'template', revision: 1, title: title ?? entry.name });
  }

  // ---- from a direction ---------------------------------------------------
  const { generationId, index } = parsed.data;

  const [row] = await db
    .select()
    .from(generation)
    .where(eq(generation.id, generationId))
    .limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  // Reading a generation is a capability; spending money against one is not.
  // A site made from somebody else's generation would also be deleted with
  // their account, since `site.generation_id` cascades.
  if (row.userId !== userId) {
    return c.json({ error: 'Not yours to make. Generate your own directions first.' }, 403);
  }

  const result = JSON.parse(row.result) as StoredResult;
  const direction = result.directions[index];

  if (!direction) {
    return c.json({ error: 'That direction is not in this set.' }, 404);
  }

  // Idempotent per (person, generation, direction): a double-click or a retry
  // lands on the site that already exists rather than spending again.
  const [existing] = await db
    .select({ id: site.id })
    .from(site)
    .where(
      and(
        eq(site.userId, userId),
        eq(site.generationId, generationId),
        eq(site.directionIndex, index)
      )
    )
    .limit(1);

  if (existing) {
    return c.json({ id: existing.id, source: 'existing' });
  }

  const burst = await consume(db, { key: `site:${userId}`, ...BURST.make });

  if (!burst.ok) {
    return c.json({ error: 'Too fast. Try again in a minute.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const quota = await checkQuota(db, userId, 'site');

  if (!quota.ok) {
    return c.json({ error: quota.message }, 429);
  }

  const [spec, templateHash] = await Promise.all([
    loadTemplateSpec(c.env, c.req.raw, direction.slug),
    hashPackagedHtml(c.env, c.req.raw, direction.slug),
  ]);
  const slots = siteSlots(spec);

  // The three-string rebrand is both the fallback and the floor: whatever the
  // model manages, the page is at least branded.
  const floor = directionToEdits(spec, { copy: direction.copy, palette: direction.palette });

  let edits: EditsDocument = floor;
  let source: 'ai' | 'fallback' = 'fallback';
  let model = 'none';
  let responseId: string | undefined;

  if (hasUpstream(c.env) && slots.length > 0) {
    const validator = buildSiteValidator(slots);
    const instructions = siteSystemPrompt(direction, spec.site.name);
    const user = siteUserPrompt(row.description, slots);

    let usage = { promptTokens: 0, completionTokens: 0 };
    let repairNote = '';
    let previousResponseId: string | undefined;
    let done = false;

    for (let attempt = 0; attempt < 2 && !done; attempt++) {
      const chained = attempt > 0 && previousResponseId !== undefined;

      try {
        const completion = await respondJson(c.env, {
          instructions,
          input: attempt === 0 ? user : chained ? repairNote : `${user}\n\n${repairNote}`,
          schemaName: 'studio_site',
          schema: siteJsonSchema(slots),
          maxOutputTokens: outputBudget(slots.length),
          previousResponseId: chained ? previousResponseId : undefined,
        });

        model = completion.model;
        responseId = completion.responseId ?? responseId;
        previousResponseId = completion.responseId;
        usage = {
          promptTokens:
            usage.promptTokens + (completion.usage.promptTokens || ESTIMATED_TOKENS.prompt),
          completionTokens:
            usage.completionTokens +
            (completion.usage.completionTokens || ESTIMATED_TOKENS.completion),
        };

        const checked = validator.safeParse(JSON.parse(completion.content) as unknown);

        if (!checked.success) {
          repairNote =
            'Your previous answer was rejected. Fix exactly these problems:\n' +
            checked.error.issues
              .slice(0, 40)
              .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
              .join('\n');
          continue;
        }

        // The engine's own planner is the second gate - pure, so it runs here
        // with no DOM - and what it rejects is what the page would reject.
        const candidate: EditsDocument = {
          specVersion: spec.specVersion,
          slug: spec.site.slug,
          edits: { text: checked.data.text, ...(floor.edits.palette ? { palette: floor.edits.palette } : {}) },
        };
        const plan = planEdits(spec, candidate);

        if (hasErrors(plan.problems)) {
          repairNote =
            'Your previous answer was rejected. Fix exactly these problems:\n' +
            plan.problems
              .filter((problem) => problem.level === 'error')
              .slice(0, 40)
              .map((problem) => `- ${problem.path}: ${problem.message}`)
              .join('\n');
          continue;
        }

        edits = candidate;
        source = 'ai';
        done = true;
      } catch (error) {
        // Not-JSON is the model's mistake, and the repair turn's job.
        if (error instanceof SyntaxError) {
          repairNote = 'Your previous answer was not valid JSON. Answer with the JSON object alone.';
          continue;
        }
        if (error instanceof UpstreamError) {
          console.error(`studio/sites: ${String(error)}`);
          break;
        }
        throw error;
      }
    }

    // Recorded whether or not it produced a document: a failed call still
    // spent tokens.
    await recordUsage(db, {
      userId,
      endpoint: 'site',
      model,
      promptTokens: usage.promptTokens,
      completionTokens: usage.completionTokens,
    });
  }

  const id = newId();
  const now = new Date();

  await db.insert(site).values({
    id,
    userId,
    generationId,
    directionIndex: index,
    slug: direction.slug,
    title: direction.copy?.brandName ?? direction.name,
    specVersion: spec.specVersion,
    templateHash,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(revision).values({
    id: newId(),
    siteId: id,
    n: 1,
    edits: JSON.stringify(edits),
    instruction: null,
    source,
    model,
    responseId: source === 'ai' ? (responseId ?? null) : null,
    createdAt: now,
  });

  return c.json({ id, source });
});

/** The signed-in person's own sites, newest first. Session-scoped, never by id. */
sites.get('/', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to see your sites.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });

  const rows = await db
    .select({
      id: site.id,
      slug: site.slug,
      title: site.title,
      generationId: site.generationId,
      directionIndex: site.directionIndex,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt,
      result: generation.result,
      revisions: sql<number>`(select count(*) from ${revision} where ${revision.siteId} = ${site.id})`,
    })
    .from(site)
    .leftJoin(generation, eq(generation.id, site.generationId))
    .where(eq(site.userId, userId))
    .orderBy(desc(site.updatedAt))
    .limit(100);

  // The swatches a row shows are the colors the site wears now, so the
  // latest document is read for each.
  const [index, latest] = await Promise.all([
    loadStudioIndex(c.env, c.req.raw),
    latestEditsFor(
      db,
      rows.map((row) => row.id)
    ),
  ]);
  const entries = new Map(index.map((entry) => [entry.slug, entry]));

  const summaries: SiteSummary[] = rows.map((row) => {
    const direction = directionOf({ site: { directionIndex: row.directionIndex }, result: row.result });
    const entry = entries.get(row.slug);

    return {
      id: row.id,
      slug: row.slug,
      templateName: direction?.name ?? entry?.name ?? row.slug,
      title: row.title,
      stance: direction?.stance ?? '',
      palette: latest.get(row.id)?.edits.palette ?? direction?.palette ?? entry?.palette ?? [],
      revisions: Number(row.revisions),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  });

  return c.json({ sites: summaries });
});

/**
 * One site with its latest revision. Unauthenticated by design, like a
 * generation: the 128-bit id is the capability. The template's current hash
 * is compared to the pinned one so drift is reported, not discovered.
 */
sites.get('/:id', async (c) => {
  const db = drizzle(c.env.DB, { schema });

  const row = await loadSite(db, c.req.param('id'));

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  const latest = await latestRevision(db, row.site.id);

  if (!latest) {
    return c.json({ error: 'Not found' }, 404);
  }

  // A missing package counts as drift too (the template was retired). Reads
  // are by capability; whether the reader may write is a session question,
  // answered here so the workspace knows to show its editor.
  const [[{ count }], entry, currentHash, viewer] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(revision)
      .where(eq(revision.siteId, row.site.id)),
    templateEntry(c.env, c.req.raw, row.site.slug),
    hashPackagedHtml(c.env, c.req.raw, row.site.slug).catch(() => null),
    requireUser(c.env, c.req.raw.headers),
  ]);

  const direction = directionOf(row);

  const stored: StoredRevision = {
    n: latest.n,
    edits: JSON.parse(latest.edits) as EditsDocument,
    instruction: latest.instruction,
    source: latest.source as StoredRevision['source'],
    model: latest.model,
    createdAt: latest.createdAt,
  };

  const body: SiteDocument = {
    mine: viewer !== null && viewer === row.site.userId,
    id: row.site.id,
    slug: row.site.slug,
    templateName: direction?.name ?? entry?.name ?? row.site.slug,
    title: row.site.title,
    stance: direction?.stance ?? '',
    palette: stored.edits.edits.palette ?? direction?.palette ?? entry?.palette ?? [],
    revisions: Number(count),
    createdAt: row.site.createdAt,
    updatedAt: row.site.updatedAt,
    generationId: row.site.generationId,
    directionIndex: row.site.directionIndex,
    description: row.description,
    specVersion: row.site.specVersion,
    templateChanged: currentHash !== row.site.templateHash,
    latest: stored,
  };

  return c.json(body);
});

/**
 * Rename a site. The title is what the listing and the customizer's rail
 * call it; nothing on the page reads it, so no revision is written.
 */
sites.patch('/:id', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to rename a site.' }, 401);
  }

  const parsed = titleSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Give the site a name of 1 to 80 characters.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const row = await loadSite(db, c.req.param('id'));

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  if (row.site.userId !== userId) {
    return c.json({ error: 'Not yours to change.' }, 403);
  }

  await db
    .update(site)
    .set({ title: parsed.data.title, updatedAt: new Date() })
    .where(eq(site.id, row.site.id));

  return c.json({ title: parsed.data.title });
});

/**
 * Delete a site, its owner only: the row, every revision (they cascade), and
 * the pictures Studio generated for it, which R2 does not cascade.
 */
sites.delete('/:id', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to delete a site.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const row = await loadSite(db, c.req.param('id'));

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  if (row.site.userId !== userId) {
    return c.json({ error: 'Not yours to change.' }, 403);
  }

  const prefix = `gen/site/${row.site.id}/`;
  let cursor: string | undefined;

  do {
    const listed = await c.env.MEDIA.list({ prefix, cursor });

    if (listed.objects.length > 0) {
      await c.env.MEDIA.delete(listed.objects.map((object) => object.key));
    }

    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  await db.delete(site).where(eq(site.id, row.site.id));

  return c.json({ deleted: row.site.id });
});

const imageRequestSchema = z.object({
  slot: z.string().min(1).max(120),
  referenceIds: z.array(z.string().min(8).max(64)).max(MAX_REFERENCES).optional(),
});

/**
 * A picture for one of the site's image slots, on request, written as the
 * next revision. Transparent, so it sits on the template's own ground the way
 * the template's own cut-outs do. Not idempotent: asking again is asking for
 * a different picture, and the old one stays in the previous revision.
 */
sites.post('/:id/images', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to add imagery.' }, 401);
  }

  const parsed = imageRequestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Choose an image slot.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const row = await loadSite(db, c.req.param('id'));

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  if (row.site.userId !== userId) {
    return c.json({ error: 'Not yours to change.' }, 403);
  }

  const latest = await latestRevision(db, row.site.id);

  if (!latest) {
    return c.json({ error: 'Not found' }, 404);
  }

  const spec = await loadTemplateSpec(c.env, c.req.raw, row.site.slug);
  const slot = spec.slots.find((candidate) => isImageSlot(candidate) && candidate.id === parsed.data.slot);

  if (!slot || !isImageSlot(slot)) {
    return c.json({ error: 'That template has no such image slot.' }, 404);
  }

  if (!hasUpstream(c.env)) {
    return c.json({ error: 'Image generation is not configured.' }, 503);
  }

  const references = await loadReferences(c.env, db, userId, parsed.data.referenceIds ?? []);

  if (!references) {
    return c.json({ error: 'One of those reference pictures is not available.' }, 404);
  }

  const burst = await consume(db, { key: `simg:${userId}`, ...BURST.image });

  if (!burst.ok) {
    return c.json({ error: 'Too fast. Try again in a minute.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const quota = await checkQuota(db, userId, 'site-image');

  if (!quota.ok) {
    return c.json({ error: quota.message }, 429);
  }

  const direction = directionOf(row);
  const current = JSON.parse(latest.edits) as EditsDocument;
  const palette = current.edits.palette ?? direction?.palette ?? spec.palette.colors;

  let image;

  try {
    image = await generateImage(c.env, {
      prompt: siteImagePrompt({
        description: row.description ?? '',
        stance: direction?.stance ?? '',
        why: direction?.why ?? '',
        palette,
        slotAlt: slot.alt,
        references: references.length,
      }),
      transparent: true,
      references,
    });
  } catch (error) {
    if (error instanceof UpstreamError) {
      // Still charged: the call was made.
      await recordUsage(db, {
        userId,
        endpoint: 'site-image',
        model: c.env.AI_IMAGE_MODEL,
        imageCount: 1,
      });
      console.error(`studio/sites/images: ${String(error)}`);

      return c.json({ error: 'Image generation failed. Try again.' }, 502);
    }
    throw error;
  }

  // Keyed by revision as well as slot, so a re-generation never overwrites the
  // bytes an earlier revision still points at.
  const key = `gen/site/${row.site.id}/${latest.n + 1}/${slot.id}.webp`;

  await c.env.MEDIA.put(key, image.bytes, { httpMetadata: { contentType: image.contentType } });

  const next: EditsDocument = {
    ...current,
    edits: {
      ...current.edits,
      images: { ...current.edits.images, [slot.id]: { src: `/api/media/${key}`, alt: slot.alt } },
    },
  };

  const written = await appendRevision(db, {
    siteId: row.site.id,
    n: latest.n + 1,
    edits: next,
    instruction: null,
    source: 'ai',
    model: image.model,
    responseId: null,
  });

  await recordUsage(db, { userId, endpoint: 'site-image', model: image.model, imageCount: 1 });

  return c.json({ key, slot: slot.id, revision: written.n });
});

const revisionRequestSchema = z.object({ edits: editsDocumentSchema });

/**
 * Where a saved document's images may point: this site's own generated
 * media, or a file the template ships (`./images/x.webp`), by a relative
 * path with no way back up.
 */
const TEMPLATE_FILE = /^\.\/[A-Za-z0-9._-]+(\/[A-Za-z0-9._-]+)*$/;

/**
 * Why a document cannot be stored on a site of this template, or null when
 * it can. Validated by the same planner the page applies it with, so what is
 * stored is what will render: a document the engine would reject is refused
 * with its reasons rather than saved and discovered as a blank slot.
 *
 * `siteId` is the site whose own generated media the document may point at;
 * a site not made yet has none, so only the template's own files pass.
 */
async function refuseDocument(
  env: Env,
  request: Request,
  options: {
    spec: Awaited<ReturnType<typeof loadTemplateSpec>>;
    slug: string;
    siteId: string | null;
    edits: EditsDocument;
  }
): Promise<{ body: Record<string, unknown>; status: 400 | 422 } | null> {
  const { spec, slug, siteId, edits } = options;

  if (edits.slug !== slug) {
    return { body: { error: 'That document is for a different template.' }, status: 400 };
  }

  // An image src may only point at this site's own media (not any site's) or
  // the template's own files: the document is applied into a page, and a src
  // is a fetch.
  const ownMedia = siteId ? `/api/media/gen/site/${siteId}/` : null;
  const foreign = Object.values(edits.edits.images ?? {}).find(
    (image) => !((ownMedia && image.src.startsWith(ownMedia)) || TEMPLATE_FILE.test(image.src))
  );

  if (foreign) {
    return { body: { error: 'Images must come from this site or its template.' }, status: 400 };
  }

  // A pattern swap is held to the catalog being served: a slug outside it
  // hydrates to a blank field with a console warning, which is the silent
  // failure the planner exists to refuse.
  const plan = planEdits(spec, edits, { designs: await loadDesignSlugs(env, request) });

  if (hasErrors(plan.problems)) {
    return {
      body: {
        error: 'Some of that could not be placed on the template.',
        problems: plan.problems.filter((problem) => problem.level === 'error'),
      },
      status: 422,
    };
  }

  return null;
}

/** A manual revision: the editor's document, whole (see `refuseDocument`). */
sites.post('/:id/revisions', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to save.' }, 401);
  }

  if (Number(c.req.header('content-length') ?? 0) > MAX_REVISION_BYTES) {
    return c.json({ error: 'That document is too large to be one.' }, 413);
  }

  const parsed = revisionRequestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'That is not an edits document.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const row = await loadSite(db, c.req.param('id'));

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  if (row.site.userId !== userId) {
    return c.json({ error: 'Not yours to change.' }, 403);
  }

  const burst = await consume(db, { key: `save:${userId}`, ...BURST.save });

  if (!burst.ok) {
    return c.json({ error: 'Too fast. Try again in a minute.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const latest = await latestRevision(db, row.site.id);

  if (!latest) {
    return c.json({ error: 'Not found' }, 404);
  }

  const spec = await loadTemplateSpec(c.env, c.req.raw, row.site.slug);
  const edits = parsed.data.edits as EditsDocument;
  const refused = await refuseDocument(c.env, c.req.raw, {
    spec,
    slug: row.site.slug,
    siteId: row.site.id,
    edits,
  });

  if (refused) {
    return c.json(refused.body, refused.status);
  }

  const written = await appendRevision(db, {
    siteId: row.site.id,
    n: latest.n + 1,
    edits,
    instruction: null,
    source: 'manual',
    model: 'none',
    responseId: null,
  });

  return c.json({ revision: written.n });
});

/** Every revision, newest first - the history the workspace shows. */
sites.get('/:id/revisions', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const row = await loadSite(db, c.req.param('id'));

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  const rows = await db
    .select({
      n: revision.n,
      instruction: revision.instruction,
      source: revision.source,
      model: revision.model,
      createdAt: revision.createdAt,
    })
    .from(revision)
    .where(eq(revision.siteId, row.site.id))
    .orderBy(desc(revision.n))
    .limit(200);

  return c.json({ revisions: rows });
});

/** One revision's document - what "go back" reads. */
sites.get('/:id/revisions/:n', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const n = Number(c.req.param('n'));

  if (!Number.isInteger(n) || n < 1) {
    return c.json({ error: 'Not found' }, 404);
  }

  const [row] = await db
    .select()
    .from(revision)
    .where(and(eq(revision.siteId, c.req.param('id')), eq(revision.n, n)))
    .limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  const stored: StoredRevision = {
    n: row.n,
    edits: JSON.parse(row.edits) as EditsDocument,
    instruction: row.instruction,
    source: row.source as StoredRevision['source'],
    model: row.model,
    createdAt: row.createdAt,
  };

  return c.json(stored);
});

const reviseRequestSchema = z.object({
  instruction: z.string().trim().min(3).max(600),
});

/**
 * "Make the headline warmer." A revision by request: the model sees the page
 * as it currently reads (the person's document, not the template's) and
 * answers with a diff, which is merged, planned and stored as the next
 * revision with the request beside it.
 *
 * The latest AI revision's turn is quoted as `previous_response_id` when
 * there is one, so the call carries the request alone; otherwise the whole
 * page is restated.
 */
sites.post('/:id/revise', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to make changes.' }, 401);
  }

  const parsed = reviseRequestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Say what to change, in 3-600 characters.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const row = await loadSite(db, c.req.param('id'));

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  if (row.site.userId !== userId) {
    return c.json({ error: 'Not yours to change.' }, 403);
  }

  const latest = await latestRevision(db, row.site.id);

  if (!latest) {
    return c.json({ error: 'Not found' }, 404);
  }

  if (!hasUpstream(c.env)) {
    return c.json({ error: 'Conversational editing is not configured.' }, 503);
  }

  const burst = await consume(db, { key: `rev:${userId}`, ...BURST.revise });

  if (!burst.ok) {
    return c.json({ error: 'Too fast. Try again in a minute.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const quota = await checkQuota(db, userId, 'site');

  if (!quota.ok) {
    return c.json({ error: quota.message }, 429);
  }

  const spec = await loadTemplateSpec(c.env, c.req.raw, row.site.slug);
  const current = JSON.parse(latest.edits) as EditsDocument;
  const direction = directionOf(row);

  // The page as it reads now: the document's value where there is one, the
  // template's where there is not.
  const slots = siteSlots(spec).map((slot) => ({
    ...slot,
    value: current.edits.text?.[slot.id] ?? slot.value,
  }));
  const validator = buildReviseValidator(slots);
  const instructions = reviseSystemPrompt(direction ?? ({ stance: '', why: '' } as never), spec.site.name);
  const user = reviseUserPrompt(row.description ?? '', slots, parsed.data.instruction);
  const chainFrom = latest.source === 'ai' ? (latest.responseId ?? undefined) : undefined;

  let usage = { promptTokens: 0, completionTokens: 0 };
  let model = c.env.AI_MODEL;
  let responseId: string | undefined;
  let previousResponseId = chainFrom;
  let repairNote = '';
  let next: EditsDocument | null = null;
  let note = '';
  // A stored turn the upstream no longer holds is a cache miss, not a
  // failure: the call is made again with the page restated, and that
  // restatement gets its own repair turn.
  let restated = false;

  for (let attempt = 0; attempt < (restated ? 3 : 2) && !next; attempt++) {
    // First turn: the request alone when a context exists, the whole page
    // otherwise. Repair turn: the correction alone when the rejected answer
    // stored, the whole thing again when it did not.
    const chained = previousResponseId !== undefined;
    const input = chained
      ? repairNote || `The request:\n"""\n${parsed.data.instruction}\n"""`
      : repairNote
        ? `${user}\n\n${repairNote}`
        : user;

    try {
      const completion = await respondJson(c.env, {
        instructions,
        input,
        schemaName: 'studio_revise',
        schema: reviseJsonSchema(slots),
        maxOutputTokens: 6_000,
        previousResponseId,
      });

      model = completion.model;
      responseId = completion.responseId ?? responseId;
      previousResponseId = completion.responseId ?? previousResponseId;
      usage = {
        promptTokens: usage.promptTokens + (completion.usage.promptTokens || ESTIMATED_TOKENS.prompt),
        completionTokens:
          usage.completionTokens + (completion.usage.completionTokens || ESTIMATED_TOKENS.completion),
      };

      const checked = validator.safeParse(JSON.parse(completion.content) as unknown);

      if (!checked.success) {
        repairNote =
          'Your previous answer was rejected. Fix exactly these problems:\n' +
          checked.error.issues.slice(0, 40).map((issue) => `- ${issue.path.join('.')}: ${issue.message}`).join('\n');
        continue;
      }

      const text = { ...current.edits.text };
      for (const change of checked.data.changes) text[change.id] = change.value;

      const palette = checked.data.palette
        ? ensurePalette(checked.data.palette, current.edits.palette ?? spec.palette.colors).colors
        : current.edits.palette;

      const candidate: EditsDocument = {
        ...current,
        edits: { ...current.edits, text, ...(palette ? { palette } : {}) },
      };
      const plan = planEdits(spec, candidate);

      if (hasErrors(plan.problems)) {
        repairNote =
          'Your previous answer was rejected. Fix exactly these problems:\n' +
          plan.problems
            .filter((problem) => problem.level === 'error')
            .slice(0, 40)
            .map((problem) => `- ${problem.path}: ${problem.message}`)
            .join('\n');
        continue;
      }

      next = candidate;
      note = checked.data.note;
    } catch (error) {
      if (error instanceof SyntaxError) {
        repairNote = 'Your previous answer was not valid JSON. Answer with the JSON object alone.';
        continue;
      }
      if (error instanceof UpstreamError) {
        // A 4xx on a chained first turn is the upstream saying it does not
        // know the id; anything else, or a failure of the restatement, ends
        // the attempt.
        const staleChain =
          chained && !restated && error.status !== undefined && error.status >= 400 && error.status < 500;

        if (staleChain) {
          console.warn(`studio/sites/revise: previous_response_id not honored, restating (${error.status})`);
          previousResponseId = undefined;
          restated = true;
          continue;
        }

        console.error(`studio/sites/revise: ${String(error)}`);
        break;
      }
      throw error;
    }
  }

  await recordUsage(db, {
    userId,
    endpoint: 'site',
    model,
    promptTokens: usage.promptTokens,
    completionTokens: usage.completionTokens,
  });

  if (!next) {
    return c.json({ error: 'The model could not make that change. Try saying it differently.' }, 502);
  }

  const written = await appendRevision(db, {
    siteId: row.site.id,
    n: latest.n + 1,
    edits: next,
    instruction: parsed.data.instruction,
    source: 'ai',
    model,
    responseId: responseId ?? null,
  });

  return c.json({ revision: written.n, note });
});

export default sites;
