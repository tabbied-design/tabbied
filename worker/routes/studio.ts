import { Hono } from 'hono';
import { desc, eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import { matchDirections, type StudioDirection } from '../../lib/studioMatch';
import * as schema from '../db/schema';
import { generation, site } from '../db/schema';
import type { Env } from '../env';
import { requireUser } from '../lib/session';
import { loadEditableCatalog } from '../lib/templateAssets';
import { respondJson, generateImage, hasUpstream, UpstreamError } from '../ai/client';
import {
  directionImagePrompt,
  directionsSystemPrompt,
  directionsUserPrompt,
} from '../ai/prompt';
import {
  buildDirectionsSchema,
  directionsJsonSchema,
  type StoredDirection,
  type StoredResult,
} from '../ai/schema';
import { ensurePalette } from '../lib/palette';
import { checkQuota, recordUsage } from '../lib/quota';
import { consume } from '../lib/ratelimit';
import { loadStudioIndex } from '../lib/studioIndex';

// Studio's generation tier.
//
// The client-side matcher stays the signed-out path; here it is candidate
// assembly. The model picks three from a scored dozen, and the response
// schema's slug enum is built from exactly that dozen, so an invented template
// cannot survive validation.

/** How many scored candidates the model gets to choose from. */
const CANDIDATE_COUNT = 12;

/** Same bounds StudioForm enforces client-side. */
const requestSchema = z.object({
  description: z.string().trim().min(10).max(600),
});

/**
 * Burst gates (lib/ratelimit.ts): a short window on top of the daily ledger,
 * so a script cannot spend a whole day's budget in ten seconds.
 */
const BURST = {
  directions: { max: 6, windowSeconds: 60 },
  image: { max: 4, windowSeconds: 60 },
};

/**
 * Estimated tokens for an upstream that omitted `usage`. Deliberately high:
 * over-counting costs a user some headroom, under-counting costs real money.
 */
const ESTIMATED_TOKENS = { prompt: 3_000, completion: 900 };

const studio = new Hono<{ Bindings: Env }>();

/** One scored candidate, reduced to what the stored result needs. */
const toStored = (
  entry: StudioDirection,
  extra: Partial<StoredDirection> = {}
): StoredDirection => ({
  slug: entry.slug,
  name: entry.name,
  topic: entry.topic,
  patternSlug: entry.patternSlug,
  patternName: entry.patternName,
  paletteName: entry.paletteName,
  palette: entry.palette,
  descriptors: entry.descriptors,
  stance: entry.descriptors[0] ?? entry.name,
  why: entry.reasons.length
    ? `Matched on ${entry.reasons.join(', ')}.`
    : `A ${entry.moods.join(' and ') || 'distinct'} direction from the library.`,
  copy: null,
  image: null,
  ...extra,
});

studio.post('/directions', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to generate.' }, 401);
  }

  const parsed = requestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Describe your business in 10-600 characters.' }, 400);
  }

  const { description } = parsed.data;

  const db = drizzle(c.env.DB, { schema });

  const burst = await consume(db, { key: `dir:${userId}`, ...BURST.directions });

  if (!burst.ok) {
    return c.json({ error: 'Too fast. Try again in a minute.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const quota = await checkQuota(db, userId, 'directions');

  if (!quota.ok) {
    return c.json({ error: quota.message }, 429);
  }

  // Candidate assembly: the shipped scorer, server-side. Its diversity
  // penalties already spread the shortlist across moods, hues and motifs, so
  // the model is choosing between genuinely different starting points.
  const entries = await loadStudioIndex(c.env, c.req.raw);
  const candidates = matchDirections(entries, description, CANDIDATE_COUNT);

  // Which templates can take brand copy, recorded on each direction now so the
  // stored document stands on its own when it is read later.
  const copyRoles = new Map(
    (await loadEditableCatalog(c.env, c.req.raw)).templates.map((template) => [
      template.slug,
      (template.copyRoles ?? []) as StoredDirection['copyRoles'],
    ])
  );

  const fallback = (): StoredResult => ({
    specVersion: 1,
    source: 'matched-fallback',
    recommended: 0,
    directions: candidates.slice(0, 3).map((entry) =>
      toStored(entry, { copyRoles: copyRoles.get(entry.slug) ?? [] })
    ),
  });

  let result: StoredResult;
  let model = 'matcher';
  // The turn the stored document came from, so a later revision can continue
  // it. Null for a matched answer, or when the upstream stored nothing.
  let responseId: string | undefined;

  if (!hasUpstream(c.env)) {
    // No key configured: the matcher's own three, and nothing is charged.
    result = fallback();
  } else {
    const slugs = candidates.map((entry) => entry.slug) as [string, ...string[]];
    const validator = buildDirectionsSchema(slugs);
    const instructions = directionsSystemPrompt(candidates);
    const user = directionsUserPrompt(description);

    let payload: z.infer<typeof validator> | null = null;
    let usage = { promptTokens: 0, completionTokens: 0 };
    let repairNote = '';

    // One repair retry, carrying the validation errors; a second failure gets
    // the matcher rather than an error page. The retry quotes the rejected
    // response as `previous_response_id`, so it sends the correction alone
    // against a context that still holds what the model wrote. An upstream
    // that stored nothing returns no id, and the retry re-sends everything.
    let previousResponseId: string | undefined;

    for (let attempt = 0; attempt < 2 && !payload; attempt++) {
      const chained = attempt > 0 && previousResponseId !== undefined;

      try {
        const completion = await respondJson(c.env, {
          instructions,
          input: attempt === 0 ? user : chained ? repairNote : `${user}\n\n${repairNote}`,
          schemaName: 'studio_directions',
          schema: directionsJsonSchema(slugs),
          previousResponseId: chained ? previousResponseId : undefined,
        });

        model = completion.model;
        responseId = completion.responseId ?? responseId;
        previousResponseId = completion.responseId;

        // Accumulated, not replaced: a rejected first turn spent real tokens,
        // and a chained retry is billed for the context it re-reads.
        usage = {
          promptTokens:
            usage.promptTokens +
            (completion.usage.promptTokens || ESTIMATED_TOKENS.prompt),
          completionTokens:
            usage.completionTokens +
            (completion.usage.completionTokens || ESTIMATED_TOKENS.completion),
        };

        const candidateJson = JSON.parse(completion.content) as unknown;
        const checked = validator.safeParse(candidateJson);

        if (checked.success) {
          payload = checked.data;
        } else {
          repairNote =
            'Your previous answer was rejected. Fix exactly these problems:\n' +
            checked.error.issues
              .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
              .join('\n');
        }
      } catch (error) {
        // An answer that is not JSON is what the repair turn exists for; only
        // the upstream failing ends the attempt.
        if (error instanceof SyntaxError) {
          repairNote = 'Your previous answer was not valid JSON. Answer with the JSON object alone.';
          continue;
        }
        if (error instanceof UpstreamError) {
          console.error(`studio/directions: ${String(error)}`);
          break;
        }
        throw error;
      }
    }

    // Recorded whether or not it produced a usable answer: a ledger that only
    // counts successes is one a bad prompt can loop against for free.
    await recordUsage(db, {
      userId,
      endpoint: 'directions',
      model,
      promptTokens: usage.promptTokens,
      completionTokens: usage.completionTokens,
    });

    if (!payload) {
      result = fallback();
    } else {
      const bySlug = new Map(candidates.map((entry) => [entry.slug, entry]));

      result = {
        specVersion: 1,
        source: 'ai',
        recommended: payload.recommended,
        directions: payload.directions.flatMap((direction) => {
          const entry = bySlug.get(direction.slug);

          // The enum makes this unreachable; keeping it means a schema drift
          // upstream degrades to two cards rather than a crash.
          if (!entry) {
            return [];
          }

          const palette = ensurePalette(direction.palette, entry.palette);

          return [
            toStored(entry, {
              stance: direction.stance,
              why: direction.why,
              copy: direction.copy,
              palette: palette.colors,
              copyRoles: copyRoles.get(entry.slug) ?? [],
            }),
          ];
        }),
      };

      // A model that returned three usable directions but whose slugs all
      // collapsed is still a failure; fall back rather than ship one card.
      if (result.directions.length < 3) {
        result = fallback();
      }
    }
  }

  const id = crypto.randomUUID().replace(/-/g, '');

  await db.insert(generation).values({
    id,
    userId,
    description,
    result: JSON.stringify(result),
    source: result.source,
    model,
    responseId: result.source === 'ai' ? (responseId ?? null) : null,
    createdAt: new Date(),
  });

  return c.json({ id, source: result.source });
});

/**
 * The signed-in person's own generations, newest first. Session-scoped: the
 * no-listing rule is about anonymous enumeration, not a person's own rows.
 * Each row carries the directions' names and palettes but not the copy, which
 * keeps 100 rows a small answer.
 */
studio.get('/generations', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to see your generations.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });

  const rows = await db
    .select({
      id: generation.id,
      description: generation.description,
      source: generation.source,
      createdAt: generation.createdAt,
      result: generation.result,
      // Qualified by hand: with no join in the outer query drizzle renders
      // both columns bare, and `generation_id = id` would compare two columns
      // of site (see CLAUDE.md).
      sites: sql<number>`(select count(*) from ${site} where ${site}.generation_id = ${generation}.id)`,
    })
    .from(generation)
    .where(eq(generation.userId, userId))
    .orderBy(desc(generation.createdAt))
    .limit(100);

  return c.json({
    generations: rows.map((row) => {
      const result = JSON.parse(row.result) as StoredResult;

      return {
        id: row.id,
        description: row.description,
        source: row.source,
        createdAt: row.createdAt,
        sites: Number(row.sites),
        directions: result.directions.map((direction) => ({
          name: direction.name,
          stance: direction.stance,
          palette: direction.palette,
        })),
      };
    }),
  });
});

/**
 * Unauthenticated by design: the 128-bit id is the capability, the way an
 * unlisted link is, and there is no endpoint that enumerates ids.
 */
studio.get('/generations/:id', async (c) => {
  const db = drizzle(c.env.DB, { schema });

  const [row] = await db
    .select()
    .from(generation)
    .where(eq(generation.id, c.req.param('id')))
    .limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  return c.json({
    id: row.id,
    description: row.description,
    result: JSON.parse(row.result) as StoredResult,
    createdAt: row.createdAt,
  });
});

const imageRequestSchema = z.object({
  generationId: z.string().min(8).max(64),
  index: z.number().int().min(0).max(2),
});

/**
 * Imagery for one direction, on demand and capped separately, never three up
 * front. Idempotent per (generation, index): a second call returns the stored
 * key rather than spending again, so a double-click or a retry is safe.
 */
studio.post('/direction-image', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to generate imagery.' }, 401);
  }

  const parsed = imageRequestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Bad request.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });

  const [row] = await db
    .select()
    .from(generation)
    .where(eq(generation.id, parsed.data.generationId))
    .limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  // Reading a generation is a capability; spending money against one is not.
  if (row.userId !== userId) {
    return c.json({ error: 'Not yours to add to.' }, 403);
  }

  const result = JSON.parse(row.result) as StoredResult;
  const direction = result.directions[parsed.data.index];

  if (!direction) {
    return c.json({ error: 'No such direction.' }, 404);
  }

  if (direction.image) {
    return c.json({ key: direction.image, cached: true });
  }

  if (!hasUpstream(c.env)) {
    return c.json({ error: 'Image generation is not configured.' }, 503);
  }

  const burst = await consume(db, { key: `img:${userId}`, ...BURST.image });

  if (!burst.ok) {
    return c.json({ error: 'Too fast. Try again in a minute.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const quota = await checkQuota(db, userId, 'direction-image');

  if (!quota.ok) {
    return c.json({ error: quota.message }, 429);
  }

  let image;

  try {
    // Transparent, so the still life sits on the card's own ground (and in a
    // template's image slot) rather than in a box of its own.
    image = await generateImage(c.env, {
      prompt: directionImagePrompt(direction, row.description),
      transparent: true,
    });
  } catch (error) {
    if (error instanceof UpstreamError) {
      // Still charged: the call was made.
      await recordUsage(db, {
        userId,
        endpoint: 'direction-image',
        model: c.env.AI_IMAGE_MODEL,
        imageCount: 1,
      });
      console.error(`studio/direction-image: ${String(error)}`);

      return c.json({ error: 'Image generation failed. Try again.' }, 502);
    }
    throw error;
  }

  const key = `gen/${row.id}/${parsed.data.index}.webp`;

  await c.env.MEDIA.put(key, image.bytes, {
    httpMetadata: { contentType: image.contentType },
  });

  direction.image = key;

  await db
    .update(generation)
    .set({ result: JSON.stringify(result) })
    .where(eq(generation.id, row.id));

  await recordUsage(db, {
    userId,
    endpoint: 'direction-image',
    model: image.model,
    imageCount: 1,
  });

  return c.json({ key, cached: false });
});

export default studio;
