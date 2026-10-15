import { Hono } from 'hono';
import { and, desc, eq, gte, like, ne, or, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import * as schema from '../db/schema';
import { aiUsage, download, event, generation, revision, site, upload, user } from '../db/schema';
import type { Env } from '../env';
import { APIError } from 'better-auth/api';
import { buildAuth } from '../auth';
import { EMAIL_PREVIEWS } from '../lib/emailPreview';
import { mailProvider, sendMail } from '../lib/mail';
import { DAILY_CAPS, startOfUtcDay } from '../lib/quota';
import { consume } from '../lib/ratelimit';
import { authConfigured } from '../lib/session';
import { loadEditableCatalog } from '../lib/templateAssets';
import { PLAN, TEST_EMAIL_DOMAIN, isTestEmail, removeUsers, testEmailSql } from '../lib/users';
import type { EventKind } from './events';

// The admin tier: reads over everything, for people whose user row says
// `role = 'admin'`. Bans and impersonation are better-auth's own endpoints
// under /api/auth/admin/*; removing an account is here, because R2 does not
// cascade and better-auth's remove-user would leave the person's pictures
// behind. Every route runs the gate; the pages hiding themselves is cosmetic.

type AdminUser = { id: string; email: string; role?: string | null };

async function requireAdmin(env: Env, headers: Headers): Promise<AdminUser | null> {
  // No secret, no admins: see requireUser for why this is not a lookup.
  if (!authConfigured(env)) return null;

  // Past the cookie cache, on purpose: a revoked role must not keep answering
  // here for the cache's remaining minutes.
  const session = await buildAuth(env).api.getSession({
    headers,
    query: { disableCookieCache: true },
  });
  const current = session?.user as AdminUser | undefined;

  return current && current.role === 'admin' ? current : null;
}

const admin = new Hono<{ Bindings: Env; Variables: { admin: AdminUser } }>();

admin.use('*', async (c, next) => {
  const who = await requireAdmin(c.env, c.req.raw.headers);

  if (!who) {
    // 404 rather than 403: the tier's existence is not something to confirm
    // to a signed-in person who is not an admin.
    return c.json({ error: 'Not found' }, 404);
  }

  // The routes that act on accounts need to know whose they are not to touch.
  c.set('admin', who);
  await next();
});

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000);

// The overview's figures. The headline four are the 2026-10 design's:
// downloads over the last 30 days (no account needed, so most carry no
// user), customizer sessions, new accounts and how many of them began at the
// Save gate, and the sites saved across every account. The rest are the
// generation tier's, held back from the first launch but still answered.
admin.get('/overview', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const today = startOfUtcDay();
  const week = daysAgo(7);
  const fortnight = daysAgo(14);
  const month = daysAgo(30);

  const [
    [users],
    [newUsers],
    [generations],
    [sites],
    [fallbacks],
    [spend],
    [images],
    signups,
    [downloads],
    events,
    [newAccounts],
    [fromSave],
    [saved],
  ] = await Promise.all([
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
    // Days with none are absent here and filled in by the page.
    db
      .select({ day: sql<string>`date(${user.createdAt}, 'unixepoch')`, n: sql<number>`count(*)` })
      .from(user)
      .where(gte(user.createdAt, fortnight))
      .groupBy(sql`date(${user.createdAt}, 'unixepoch')`)
      .orderBy(sql`date(${user.createdAt}, 'unixepoch')`),
    db
      .select({
        n: sql<number>`count(*)`,
        anonymous: sql<number>`coalesce(sum(${download.userId} is null), 0)`,
      })
      .from(download)
      .where(gte(download.createdAt, month)),
    db
      .select({ kind: event.kind, n: sql<number>`count(*)` })
      .from(event)
      .where(gte(event.createdAt, month))
      .groupBy(event.kind),
    db.select({ n: sql<number>`count(*)` }).from(user).where(gte(user.createdAt, month)),
    // "71% started from a save": the month's new accounts that went on to
    // save the edits they were holding when Save asked them to sign up.
    db
      .select({ n: sql<number>`count(distinct ${event.userId})` })
      .from(event)
      .innerJoin(user, eq(user.id, event.userId))
      .where(and(eq(event.kind, 'gate-save'), gte(user.createdAt, month))),
    db.select({ n: sql<number>`count(*)` }).from(site),
  ]);

  const eventCount = (kind: EventKind) => Number(events.find((row) => row.kind === kind)?.n ?? 0);

  return c.json({
    users: Number(users.n),
    newUsersThisWeek: Number(newUsers.n),
    downloads30d: Number(downloads.n),
    anonymousDownloads30d: Number(downloads.anonymous),
    customizerSessions30d: eventCount('customize'),
    saveGates30d: eventCount('save-gate'),
    newAccounts30d: Number(newAccounts.n),
    newAccountsFromSave30d: Number(fromSave.n),
    savedTemplates: Number(saved.n),
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
  /** `test`: only the accounts the Test users page made (lib/users.ts). */
  scope: z.enum(['all', 'test']).default('all'),
});

const usageQuery = z.object({
  days: z.coerce.number().int().min(1).max(90).default(14),
});

// A query string that does not parse is the caller's mistake: a 400, not a 500.
const badQuery = (c: { json: (body: unknown, status: 400) => Response }) =>
  c.json({ error: 'Bad query.' }, 400);

admin.get('/users', async (c) => {
  const query = listQuery.safeParse({ q: c.req.query('q'), limit: c.req.query('limit'), scope: c.req.query('scope') });

  if (!query.success) return badQuery(c);

  const { q, limit, scope } = query.data;
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
      // site.id (see CLAUDE.md). `${site}` alone is the table name.
      // `sites` is the directory's "Saved templates".
      sites: sql<number>`(select count(*) from ${site} where ${site}.user_id = ${user}.id)`,
      generations: sql<number>`(select count(*) from ${generation} where ${generation}.user_id = ${user}.id)`,
      // Every zip this person took while signed in, all time.
      downloads: sql<number>`(select count(*) from ${download} where ${download}.user_id = ${user}.id)`,
    })
    .from(user)
    .where(
      and(
        q ? or(like(user.email, `%${q}%`), like(user.name, `%${q}%`)) : undefined,
        scope === 'test' ? testEmailSql : undefined
      )
    )
    .orderBy(desc(user.createdAt))
    .limit(limit);

  return c.json({
    testDomain: TEST_EMAIL_DOMAIN,
    users: rows.map((row) => ({
      ...row,
      plan: PLAN,
      test: isTestEmail(row.email),
      sites: Number(row.sites),
      generations: Number(row.generations),
      downloads: Number(row.downloads),
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

  const [sites, generations, usage, [downloads]] = await Promise.all([
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
    db.select({ n: sql<number>`count(*)` }).from(download).where(eq(download.userId, id)),
  ]);

  return c.json({
    user: {
      id: row.id,
      name: row.name,
      email: row.email,
      emailVerified: row.emailVerified,
      role: row.role,
      banned: row.banned,
      banReason: row.banReason,
      banExpires: row.banExpires,
      createdAt: row.createdAt,
      plan: PLAN,
      test: isTestEmail(row.email),
    },
    sites,
    generations,
    usageToday: usage.map((u) => ({ ...u, calls: Number(u.calls), cost: Number(u.cost), cap: DAILY_CAPS[u.endpoint as keyof typeof DAILY_CAPS]?.calls ?? null })),
    downloads: Number(downloads.n),
  });
});

/**
 * Remove an account and everything hanging off it (lib/users.ts). Not your
 * own, which would lock you out mid-click, and not another admin's: the role
 * comes from outside the app (ADMIN_EMAILS or `npm run admin:grant`), and an
 * address in ADMIN_EMAILS would come straight back as an admin on sign-up.
 */
admin.delete('/users/:id', async (c) => {
  const who = c.get('admin');
  const id = c.req.param('id');

  if (id === who.id) {
    return c.json({ error: 'You cannot remove your own account from here.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const [row] = await db.select({ id: user.id, role: user.role }).from(user).where(eq(user.id, id)).limit(1);

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  if (row.role === 'admin') {
    return c.json({ error: 'Admins are not removed from here. Take the role away in D1, and out of ADMIN_EMAILS, first.' }, 409);
  }

  await removeUsers(c.env, [row.id]);

  return c.json({ removed: row.id });
});

// ---- Test users ----------------------------------------------------------------
// Disposable accounts for trying what a member sees (saving a customization,
// the account page, a customized download) without a real inbox. Made
// verified on the reserved domain, since nothing sent there arrives, and only
// there: this route cannot make an account that looks like a person's.
//
// One account per call. better-auth hashes the password with scrypt in plain
// JS (the Worker has no node:crypto), and a batch in one request would spend
// that CPU several times over; the page loops instead, and says how far it got.

const testUserSchema = z.object({
  password: z.string().min(8).max(128),
  /** The address before the @; generated when absent. */
  prefix: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9](?:[a-z0-9._+-]{0,38}[a-z0-9])?$/)
    .optional(),
});

/** Five base-36 characters from the CSPRNG: these become live sign-ins. */
const randomSlug = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(5)), (byte) => (byte % 36).toString(36)).join('');

admin.post('/test-users', async (c) => {
  const parsed = testUserSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json(
      { error: 'A password of 8 to 128 characters, and an address of letters, digits, dots and dashes.' },
      400
    );
  }

  const slug = randomSlug();
  const local = parsed.data.prefix || `test-${slug}`;

  try {
    const created = await buildAuth(c.env).api.createUser({
      body: {
        email: `${local}@${TEST_EMAIL_DOMAIN}`,
        password: parsed.data.password,
        name: `Test user ${parsed.data.prefix || slug}`,
        // Nothing sent to the domain arrives, so the link could never be followed.
        data: { emailVerified: true },
      },
      // better-auth checks the caller's permission again from the session.
      headers: c.req.raw.headers,
    });

    return c.json({ user: { id: created.user.id, email: created.user.email, name: created.user.name } });
  } catch (error) {
    // Its message is written for a person ("User already exists. Use another email.").
    if (error instanceof APIError) {
      return c.json({ error: error.message || 'Could not create that account.' }, 400);
    }

    throw error;
  }
});

/** Every test account at once, but never an admin's or your own. */
admin.delete('/test-users', async (c) => {
  const who = c.get('admin');
  const db = drizzle(c.env.DB, { schema });
  const rows = await db
    .select({ id: user.id })
    .from(user)
    .where(and(testEmailSql, ne(user.id, who.id), sql`(${user.role} is null or ${user.role} <> 'admin')`));

  return c.json({ removed: await removeUsers(c.env, rows.map((row) => row.id)) });
});

// ---- Email preview ---------------------------------------------------------------
// Every message the Worker sends, rendered by the functions that send it
// (lib/emailPreview.ts), and a way to send one to yourself to see it in a
// real client. Only ever to the admin asking: never a caller-supplied
// address, so this cannot relay mail anywhere.

const emailKeys = EMAIL_PREVIEWS.map((email) => email.key) as [string, ...string[]];

/** Where this page is served from: the lockup image is fetched from here (lib/emailPreview.ts). */
const hereOf = (url: string) => new URL(url).origin;

admin.get('/emails', (c) =>
  c.json({
    provider: mailProvider(c.env),
    to: c.get('admin').email,
    emails: EMAIL_PREVIEWS.map(({ build, ...about }) => {
      const message = build(c.env.PUBLIC_ORIGIN, hereOf(c.req.url));

      return { ...about, subject: message.subject, text: message.text, html: message.html ?? null };
    }),
  })
);

admin.post('/emails/test', async (c) => {
  const parsed = z.object({ key: z.enum(emailKeys) }).safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: `Send one of: ${emailKeys.join(', ')}.` }, 400);
  }

  const provider = mailProvider(c.env);

  if (provider === 'none') {
    return c.json({ error: 'Sending is not configured here: RESEND_API_KEY is not set.' }, 400);
  }

  const who = c.get('admin');
  const db = drizzle(c.env.DB, { schema });
  // Each call is a real message, so it sits behind a burst gate.
  const burst = await consume(db, { key: `mailtest:${who.id}`, max: 10, windowSeconds: 10 * 60 });

  if (!burst.ok) {
    return c.json({ error: 'That is ten test emails in ten minutes. Try again shortly.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const email = EMAIL_PREVIEWS.find((entry) => entry.key === parsed.data.key)!;

  try {
    await sendMail(c.env, { to: who.email, ...email.build(c.env.PUBLIC_ORIGIN, hereOf(c.req.url)) });
  } catch (error) {
    console.error('[mail] test send failed', error);
    return c.json({ error: error instanceof Error ? error.message : 'The email could not be sent.' }, 502);
  }

  return c.json({ to: who.email, provider });
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

  // Qualified by hand, as in /users: bare columns would compare
  // revision.site_id to revision.id.
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
    // Read-only: the caps are constants in worker/lib/quota.ts and the burst
    // windows in the routes.
    caps: DAILY_CAPS,
    editable: false,
  })
);

export default admin;
