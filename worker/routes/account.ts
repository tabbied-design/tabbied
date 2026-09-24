import { Hono } from 'hono';
import { and, desc, eq, gte, sql } from 'drizzle-orm';
import { z } from 'zod';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { aiUsage, site, templateRequest } from '../db/schema';
import type { Env } from '../env';
import { loadEditableCatalog } from '../lib/templateAssets';
import { notifyTemplateRequest } from '../lib/mail';
import {
  REQUEST_NOTE_MAX,
  claimTemplate,
  limitMessage,
  requestOf,
  templateStatus,
} from '../lib/templates';
import { DAILY_CAPS, startOfUtcDay, type Endpoint } from '../lib/quota';
import { requireUser } from '../lib/session';

// A person's own account data beyond what better-auth serves: today's spend
// against the caps, the templates they have chosen and their "Request more"
// message, and the recent ledger. Session-scoped throughout.

const account = new Hono<{ Bindings: Env }>();

account.get('/usage', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to see your usage.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const since = startOfUtcDay();

  const today = await db
    .select({ endpoint: aiUsage.endpoint, calls: sql<number>`count(*)` })
    .from(aiUsage)
    .where(and(eq(aiUsage.userId, userId), gte(aiUsage.createdAt, since)))
    .groupBy(aiUsage.endpoint);

  const used = new Map(today.map((row) => [row.endpoint, Number(row.calls)]));

  const usage = (Object.keys(DAILY_CAPS) as Endpoint[]).map((endpoint) => ({
    endpoint,
    label: DAILY_CAPS[endpoint].label,
    used: used.get(endpoint) ?? 0,
    cap: DAILY_CAPS[endpoint].calls,
  }));

  const recent = await db
    .select({
      endpoint: aiUsage.endpoint,
      model: aiUsage.model,
      promptTokens: aiUsage.promptTokens,
      completionTokens: aiUsage.completionTokens,
      imageCount: aiUsage.imageCount,
      createdAt: aiUsage.createdAt,
    })
    .from(aiUsage)
    .where(eq(aiUsage.userId, userId))
    .orderBy(desc(aiUsage.createdAt))
    .limit(30);

  const templates = await templateStatus(db, userId);

  return c.json({
    resetsAt: new Date(since.getTime() + 86_400_000),
    usage,
    recent,
    templates: { used: templates.used, total: templates.total, left: templates.left },
  });
});

const SLUG = /^[a-z0-9-]{1,80}$/;

/** The template slugs the deployment serves, or null when the catalog cannot be read. */
async function catalogSlugs(c: { env: Env; req: { raw: Request } }): Promise<Set<string> | null> {
  const catalog = await loadEditableCatalog(c.env, c.req.raw).catch(() => null);

  return catalog ? new Set(catalog.templates.map((entry) => entry.slug)) : null;
}

// The chosen templates, oldest first, each with the site the person has
// customized from it (the newest, when there is more than one), plus the
// allowance and the "Request more" message if one was sent. Names, kinds
// and colors are the site's to look up: it has the template data at build
// time, and the Worker would only be copying it.
account.get('/templates', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to see your templates.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const [status, sites, request] = await Promise.all([
    templateStatus(db, userId),
    db
      .select({ id: site.id, slug: site.slug, updatedAt: site.updatedAt })
      .from(site)
      .where(eq(site.userId, userId))
      .orderBy(desc(site.updatedAt)),
    requestOf(db, userId),
  ]);

  const newest = new Map<string, { id: string; updatedAt: Date }>();

  for (const row of sites) {
    if (!newest.has(row.slug)) newest.set(row.slug, { id: row.id, updatedAt: row.updatedAt });
  }

  return c.json({
    used: status.used,
    total: status.total,
    left: status.left,
    chosen: status.chosen.map((row) => ({
      slug: row.slug,
      chosenAt: row.createdAt,
      site: newest.get(row.slug) ?? null,
    })),
    request: request
      ? { status: request.status, granted: request.granted, createdAt: request.createdAt }
      : null,
  });
});

// "Choose template": make one of the person's templates without taking it
// yet. The same claim a first download or a first customizer save makes.
account.post('/templates', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to choose a template.' }, 401);
  }

  const body = (await c.req.json().catch(() => null)) as { slug?: unknown } | null;
  const slug = typeof body?.slug === 'string' ? body.slug : '';

  if (!SLUG.test(slug)) {
    return c.json({ error: 'Name a template to choose.' }, 400);
  }

  const slugs = await catalogSlugs(c);

  if (slugs && !slugs.has(slug)) {
    return c.json({ error: 'No such template.' }, 404);
  }

  const db = drizzle(c.env.DB, { schema });
  const claim = await claimTemplate(db, userId, slug);
  const status = await templateStatus(db, userId);
  const counts = { used: status.used, total: status.total, left: status.left };

  if (!claim.ok) {
    return c.json({ error: limitMessage(status.total), ...counts }, 403);
  }

  return c.json({ slug, chosen: claim.id !== null, ...counts });
});

const requestSchema = z.object({ note: z.string().trim().min(1).max(REQUEST_NOTE_MAX) });

// "Request more": one message per person during the beta, sent once every
// template they may choose is chosen. The row is what the admin's Requests
// page reads; the mail to the team is a courtesy that must not decide
// whether the message was received, so a failed send is logged, not thrown.
account.post('/templates/request', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to ask for more templates.' }, 401);
  }

  const parsed = requestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Say a little about what you are building.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const status = await templateStatus(db, userId);

  if (status.left > 0) {
    return c.json({ error: `You still have ${status.left} template${status.left === 1 ? '' : 's'} to choose.` }, 409);
  }

  // One per person, enforced by the unique index: a second message, or two
  // sent at once, inserts nothing.
  const id = crypto.randomUUID();
  const result = await db.run(sql`
    insert or ignore into template_request (id, user_id, note)
    values (${id}, ${userId}, ${parsed.data.note})
  `);

  if ((result.meta.changes ?? 0) === 0) {
    return c.json({ error: 'You have already sent your message. We will reply by email.' }, 409);
  }

  const [person] = await db
    .select({ name: schema.user.name, email: schema.user.email })
    .from(schema.user)
    .where(eq(schema.user.id, userId))
    .limit(1);

  if (person) {
    const sending = notifyTemplateRequest(c.env, {
      name: person.name,
      email: person.email,
      note: parsed.data.note,
      used: status.used,
      total: status.total,
      origin: new URL(c.req.url).origin,
    }).catch((error) => console.error('[mail] template request notice failed', error));

    c.executionCtx.waitUntil(sending);
  }

  const [row] = await db.select().from(templateRequest).where(eq(templateRequest.id, id)).limit(1);

  return c.json({ request: { status: row.status, granted: row.granted, createdAt: row.createdAt } });
});

export default account;
