import { Hono } from 'hono';
import { and, desc, eq, gte, like, or, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import * as schema from '../db/schema';
import { aiUsage, devMail, generation, revision, site, templateChoice, templateRequest, upload, user } from '../db/schema';
import type { Env } from '../env';
import { buildAuth } from '../auth';
import { isDev } from '../env';
import { notifyRequestDecision } from '../lib/mail';
import { FREE_TEMPLATES, MAX_GRANT, REQUEST_STATUSES, templateStatus, type RequestStatus } from '../lib/templates';
import { DAILY_CAPS, startOfUtcDay } from '../lib/quota';
import { authConfigured } from '../lib/session';
import { loadEditableCatalog } from '../lib/templateAssets';

// The admin tier: reads over everything, for people whose user row says
// `role = 'admin'`. Bans and impersonation are better-auth's own endpoints
// under /api/auth/admin/* and are not repeated here; this is the data those
// pages show. Every route runs the gate - the pages hiding themselves is
// cosmetic.

type AdminUser = { id: string; role?: string | null };

async function requireAdmin(env: Env, headers: Headers): Promise<AdminUser | null> {
  // No secret, no admins: see requireUser for why this is not a lookup.
  if (!authConfigured(env)) return null;

  // Past the cookie cache, on purpose: a role revoked a minute ago must not
  // keep answering here for the cache's remaining minutes. One D1 read per
  // admin request is the right price for that.
  const session = await buildAuth(env).api.getSession({
    headers,
    query: { disableCookieCache: true },
  });
  const current = session?.user as AdminUser | undefined;

  return current && current.role === 'admin' ? current : null;
}

const admin = new Hono<{ Bindings: Env }>();

admin.use('*', async (c, next) => {
  const who = await requireAdmin(c.env, c.req.raw.headers);

  if (!who) {
    // 404 rather than 403: the tier's existence is not something to confirm
    // to a signed-in person who is not an admin.
    return c.json({ error: 'Not found' }, 404);
  }

  await next();
});

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000);

admin.get('/overview', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const today = startOfUtcDay();
  const week = daysAgo(7);

  const fortnight = daysAgo(14);

  const [[users], [newUsers], [generations], [sites], [fallbacks], [spend], [images], signups, [chosen], [pending]] = await Promise.all([
    db.select({ n: sql<number>`count(*)` }).from(user),
    db.select({ n: sql<number>`count(*)` }).from(user).where(gte(user.createdAt, week)),
    db.select({ n: sql<number>`count(*)` }).from(generation).where(gte(generation.createdAt, week)),
    db.select({ n: sql<number>`count(*)` }).from(site).where(gte(site.createdAt, week)),
    db
      .select({ n: sql<number>`count(*)` })
      .from(generation)
      .where(and(gte(generation.createdAt, week), eq(generation.source, 'matched-fallback'))),
    db
      .select({ cost: sql<number>`coalesce(sum(${aiUsage.costEstimate}), 0)`, calls: sql<number>`count(*)` })
      .from(aiUsage)
      .where(gte(aiUsage.createdAt, today)),
    db
      .select({ n: sql<number>`coalesce(sum(${aiUsage.imageCount}), 0)` })
      .from(aiUsage)
      .where(gte(aiUsage.createdAt, week)),
    // The growth chart: accounts created per UTC day over the last fortnight.
    // Days with none are absent here and filled in by the page, so the
    // answer stays small and the chart stays honest about quiet days.
    db
      .select({ day: sql<string>`date(${user.createdAt}, 'unixepoch')`, n: sql<number>`count(*)` })
      .from(user)
      .where(gte(user.createdAt, fortnight))
      .groupBy(sql`date(${user.createdAt}, 'unixepoch')`)
      .orderBy(sql`date(${user.createdAt}, 'unixepoch')`),
    db.select({ n: sql<number>`count(*)` }).from(templateChoice),
    db.select({ n: sql<number>`count(*)` }).from(templateRequest).where(eq(templateRequest.status, 'pending')),
  ]);

  return c.json({
    users: Number(users.n),
    templatesChosen: Number(chosen.n),
    averageChosen: Number(users.n) ? Number(chosen.n) / Number(users.n) : 0,
    freeTemplates: FREE_TEMPLATES,
    pendingRequests: Number(pending.n),
    newUsersThisWeek: Number(newUsers.n),
    generationsThisWeek: Number(generations.n),
    sitesThisWeek: Number(sites.n),
    fallbackRate: Number(generations.n) ? Number(fallbacks.n) / Number(generations.n) : 0,
    aiCallsToday: Number(spend.calls),
    aiCostToday: Number(spend.cost),
    imagesThisWeek: Number(images.n),
    signupsByDay: signups.map((row) => ({ day: row.day, n: Number(row.n) })),
  });
});

const listQuery = z.object({
  q: z.string().trim().max(120).optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

const usageQuery = z.object({
  days: z.coerce.number().int().min(1).max(90).default(14),
});

// A query string that does not parse is the caller's mistake, answered as
// one. `parse` threw, and a `?limit=abc` came back as a 500 with a needless
// schema check behind it.
const badQuery = (c: { json: (body: unknown, status: 400) => Response }) =>
  c.json({ error: 'Bad query.' }, 400);

admin.get('/users', async (c) => {
  const query = listQuery.safeParse({ q: c.req.query('q'), limit: c.req.query('limit') });

  if (!query.success) return badQuery(c);

  const { q, limit } = query.data;
  const db = drizzle(c.env.DB, { schema });

  const rows = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      banned: user.banned,
      createdAt: user.createdAt,
      // Qualified by hand: with no join in the outer query drizzle renders
      // `${user.id}` as a bare "id", which inside the subquery resolves to
      // *site*.id and counts nothing. `${site}` alone is the table name.
      sites: sql<number>`(select count(*) from ${site} where ${site}.user_id = ${user}.id)`,
      generations: sql<number>`(select count(*) from ${generation} where ${generation}.user_id = ${user}.id)`,
      chosen: sql<number>`(select count(*) from ${templateChoice} where ${templateChoice}.user_id = ${user}.id)`,
      allowance: sql<number>`(${FREE_TEMPLATES} + coalesce((select granted from ${templateRequest} where ${templateRequest}.user_id = ${user}.id and ${templateRequest}.status = 'granted'), 0))`,
    })
    .from(user)
    .where(q ? or(like(user.email, `%${q}%`), like(user.name, `%${q}%`)) : undefined)
    .orderBy(desc(user.createdAt))
    .limit(limit);

  return c.json({
    users: rows.map((row) => ({
      ...row,
      sites: Number(row.sites),
      generations: Number(row.generations),
      chosen: Number(row.chosen),
      allowance: Number(row.allowance),
    })),
  });
});

admin.get('/users/:id', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = c.req.param('id');

  const [row] = await db.select().from(user).where(eq(user.id, id)).limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  const [sites, generations, usage, templates] = await Promise.all([
    db
      .select({ id: site.id, slug: site.slug, title: site.title, updatedAt: site.updatedAt })
      .from(site)
      .where(eq(site.userId, id))
      .orderBy(desc(site.updatedAt))
      .limit(50),
    db
      .select({ id: generation.id, description: generation.description, source: generation.source, model: generation.model, createdAt: generation.createdAt })
      .from(generation)
      .where(eq(generation.userId, id))
      .orderBy(desc(generation.createdAt))
      .limit(50),
    db
      .select({ endpoint: aiUsage.endpoint, calls: sql<number>`count(*)`, cost: sql<number>`coalesce(sum(${aiUsage.costEstimate}), 0)` })
      .from(aiUsage)
      .where(and(eq(aiUsage.userId, id), gte(aiUsage.createdAt, startOfUtcDay())))
      .groupBy(aiUsage.endpoint),
    templateStatus(db, id),
  ]);

  return c.json({
    user: { id: row.id, name: row.name, email: row.email, emailVerified: row.emailVerified, role: row.role, banned: row.banned, banReason: row.banReason, banExpires: row.banExpires, createdAt: row.createdAt },
    sites,
    generations,
    usageToday: usage.map((u) => ({ ...u, calls: Number(u.calls), cost: Number(u.cost), cap: DAILY_CAPS[u.endpoint as keyof typeof DAILY_CAPS]?.calls ?? null })),
    templates: {
      used: templates.used,
      total: templates.total,
      left: templates.left,
      chosen: templates.chosen,
    },
  });
});

// ---- "Request more" --------------------------------------------------------
// The messages people at their limit sent, and the admin's answer to each.
// A grant adds its number to the person's five while the status says
// 'granted'; declining, or undoing back to pending, takes it away again.
// Every decision but an undo mails the person (lib/mail.ts), after the row
// is written, and a failed send is reported in the answer rather than
// unwinding the decision.

const requestQuery = z.object({
  status: z.enum(REQUEST_STATUSES as [RequestStatus, ...RequestStatus[]]).default('pending'),
});

admin.get('/requests', async (c) => {
  const query = requestQuery.safeParse({ status: c.req.query('status') });

  if (!query.success) return badQuery(c);

  const db = drizzle(c.env.DB, { schema });
  const [rows, counts] = await Promise.all([
    db
      .select({
        id: templateRequest.id,
        userId: templateRequest.userId,
        name: user.name,
        email: user.email,
        note: templateRequest.note,
        status: templateRequest.status,
        granted: templateRequest.granted,
        decidedAt: templateRequest.decidedAt,
        createdAt: templateRequest.createdAt,
        chosen: sql<number>`(select count(*) from ${templateChoice} where ${templateChoice}.user_id = ${templateRequest}.user_id)`,
      })
      .from(templateRequest)
      .innerJoin(user, eq(user.id, templateRequest.userId))
      .where(eq(templateRequest.status, query.data.status))
      .orderBy(desc(templateRequest.createdAt))
      .limit(200),
    db
      .select({ status: templateRequest.status, n: sql<number>`count(*)` })
      .from(templateRequest)
      .groupBy(templateRequest.status),
  ]);
  const byStatus = new Map(counts.map((row) => [row.status, Number(row.n)]));

  return c.json({
    free: FREE_TEMPLATES,
    counts: Object.fromEntries(REQUEST_STATUSES.map((status) => [status, byStatus.get(status) ?? 0])),
    requests: rows.map((row) => ({ ...row, chosen: Number(row.chosen) })),
  });
});

const decisionSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('granted'), granted: z.number().int().min(1).max(MAX_GRANT) }),
  z.object({ status: z.literal('declined') }),
  z.object({ status: z.literal('pending') }),
]);

admin.post('/requests/:id', async (c) => {
  const parsed = decisionSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: `Grant 1 to ${MAX_GRANT} templates, decline, or undo.` }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const id = c.req.param('id');
  const decision = parsed.data;
  const granted = decision.status === 'granted' ? decision.granted : 0;

  const [row] = await db
    .update(templateRequest)
    .set({
      status: decision.status,
      granted,
      decidedAt: decision.status === 'pending' ? null : new Date(),
    })
    .where(eq(templateRequest.id, id))
    .returning();

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  let mailed: boolean | null = null;

  if (decision.status !== 'pending') {
    const [person] = await db.select({ email: user.email }).from(user).where(eq(user.id, row.userId)).limit(1);
    const status = await templateStatus(db, row.userId);

    mailed = await notifyRequestDecision(c.env, {
      email: person.email,
      status: decision.status,
      granted,
      total: status.total,
      origin: new URL(c.req.url).origin,
    })
      .then(() => true)
      .catch((error) => {
        console.error('[mail] request decision failed', error);
        return false;
      });
  }

  return c.json({ request: { id: row.id, status: row.status, granted: row.granted, decidedAt: row.decidedAt }, mailed });
});

admin.get('/usage', async (c) => {
  const query = usageQuery.safeParse({ days: c.req.query('days') });

  if (!query.success) return badQuery(c);

  const { days } = query.data;
  const db = drizzle(c.env.DB, { schema });
  const since = daysAgo(days);

  const [byDay, topUsers] = await Promise.all([
    db
      .select({
        day: sql<string>`date(${aiUsage.createdAt}, 'unixepoch')`,
        endpoint: aiUsage.endpoint,
        calls: sql<number>`count(*)`,
        promptTokens: sql<number>`coalesce(sum(${aiUsage.promptTokens}), 0)`,
        completionTokens: sql<number>`coalesce(sum(${aiUsage.completionTokens}), 0)`,
        images: sql<number>`coalesce(sum(${aiUsage.imageCount}), 0)`,
        cost: sql<number>`coalesce(sum(${aiUsage.costEstimate}), 0)`,
      })
      .from(aiUsage)
      .where(gte(aiUsage.createdAt, since))
      .groupBy(sql`date(${aiUsage.createdAt}, 'unixepoch')`, aiUsage.endpoint)
      .orderBy(desc(sql`date(${aiUsage.createdAt}, 'unixepoch')`)),
    db
      .select({
        userId: aiUsage.userId,
        email: user.email,
        calls: sql<number>`count(*)`,
        cost: sql<number>`coalesce(sum(${aiUsage.costEstimate}), 0)`,
      })
      .from(aiUsage)
      .innerJoin(user, eq(user.id, aiUsage.userId))
      .where(gte(aiUsage.createdAt, since))
      .groupBy(aiUsage.userId, user.email)
      .orderBy(desc(sql`count(*)`))
      .limit(20),
  ]);

  return c.json({
    days,
    caps: DAILY_CAPS,
    byDay: byDay.map((r) => ({ ...r, calls: Number(r.calls), promptTokens: Number(r.promptTokens), completionTokens: Number(r.completionTokens), images: Number(r.images), cost: Number(r.cost) })),
    topUsers: topUsers.map((r) => ({ ...r, calls: Number(r.calls), cost: Number(r.cost) })),
  });
});

admin.get('/generations', async (c) => {
  const query = listQuery.safeParse({ limit: c.req.query('limit') });

  if (!query.success) return badQuery(c);

  const { limit } = query.data;
  const db = drizzle(c.env.DB, { schema });

  const rows = await db
    .select({
      id: generation.id,
      userEmail: user.email,
      description: generation.description,
      source: generation.source,
      model: generation.model,
      createdAt: generation.createdAt,
      sites: sql<number>`(select count(*) from ${site} where ${site.generationId} = ${generation.id})`,
    })
    .from(generation)
    .innerJoin(user, eq(user.id, generation.userId))
    .orderBy(desc(generation.createdAt))
    .limit(limit);

  return c.json({ generations: rows.map((r) => ({ ...r, sites: Number(r.sites) })) });
});

admin.get('/generations/:id', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const [row] = await db
    .select({ generation, userEmail: user.email })
    .from(generation)
    .innerJoin(user, eq(user.id, generation.userId))
    .where(eq(generation.id, c.req.param('id')))
    .limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  // Qualified by hand, as in /users: no join in the outer query, so drizzle
  // would render both columns bare and the subquery would compare
  // revision.site_id to revision.id - every count was 0.
  const sites = await db
    .select({
      id: site.id,
      title: site.title,
      slug: site.slug,
      revisions: sql<number>`(select count(*) from ${revision} where ${revision}.site_id = ${site}.id)`,
    })
    .from(site)
    .where(eq(site.generationId, row.generation.id));

  return c.json({
    ...row.generation,
    result: JSON.parse(row.generation.result) as unknown,
    userEmail: row.userEmail,
    sites: sites.map((s) => ({ ...s, revisions: Number(s.revisions) })),
  });
});

admin.get('/templates', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const [catalog, counts] = await Promise.all([
    loadEditableCatalog(c.env, c.req.raw),
    db.select({ slug: site.slug, n: sql<number>`count(*)` }).from(site).groupBy(site.slug),
  ]);
  const bySlug = new Map(counts.map((r) => [r.slug, Number(r.n)]));

  return c.json({
    templates: (catalog.templates as { slug: string; name?: string; copyRoles?: string[]; slots?: Record<string, number>; patterns?: string[] }[]).map((t) => ({
      slug: t.slug,
      name: t.name ?? t.slug,
      copyRoles: t.copyRoles ?? [],
      slots: t.slots ?? {},
      patterns: t.patterns ?? [],
      sites: bySlug.get(t.slug) ?? 0,
    })),
  });
});

admin.get('/uploads', async (c) => {
  const query = listQuery.safeParse({ limit: c.req.query('limit') });

  if (!query.success) return badQuery(c);

  const { limit } = query.data;
  const db = drizzle(c.env.DB, { schema });

  const rows = await db
    .select({ id: upload.id, key: upload.key, contentType: upload.contentType, bytes: upload.bytes, note: upload.note, createdAt: upload.createdAt, userEmail: user.email })
    .from(upload)
    .innerJoin(user, eq(user.id, upload.userId))
    .orderBy(desc(upload.createdAt))
    .limit(limit);

  return c.json({ uploads: rows.map((r) => ({ ...r, src: `/api/media/${r.key}` })) });
});

admin.delete('/uploads/:id', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const [row] = await db.select().from(upload).where(eq(upload.id, c.req.param('id'))).limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  await db.delete(upload).where(eq(upload.id, row.id));
  await c.env.MEDIA.delete(row.key);

  return c.json({ ok: true });
});

admin.get('/quotas', (c) =>
  c.json({
    // Read-only for now: the caps are constants in worker/lib/quota.ts and the
    // burst windows in the routes. Editing them from here means a `setting`
    // table and a read on every call; the page says so.
    caps: {
      ...DAILY_CAPS,
      'template-choice': { calls: FREE_TEMPLATES, label: 'templates an account may choose' },
    },
    editable: false,
  })
);

/** Dev only: the mailbox verification and reset links land in with no mail key. */
admin.get('/mail', async (c) => {
  if (!isDev(c.env)) {
    return c.json({ error: 'Not found' }, 404);
  }

  const db = drizzle(c.env.DB, { schema });
  const rows = await db.select().from(devMail).orderBy(desc(devMail.createdAt)).limit(100);

  return c.json({ mail: rows });
});

export default admin;
