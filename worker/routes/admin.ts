import { Hono } from 'hono';
import { and, desc, eq, gte, like, ne, or, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import * as schema from '../db/schema';
import { aiUsage, devMail, generation, revision, site, templateChoice, templateGrant, templateRequest, upload, user } from '../db/schema';
import type { Env } from '../env';
import { APIError } from 'better-auth/api';
import { buildAuth } from '../auth';
import { isDev } from '../env';
import { EMAIL_PREVIEWS } from '../lib/emailPreview';
import { mailProvider, notifyAdminGrant, notifyRequestDecision, sendMail } from '../lib/mail';
import { FREE_TEMPLATES, MAX_GRANT, allowanceSql, templateStatus } from '../lib/templates';
import { DAILY_CAPS, startOfUtcDay } from '../lib/quota';
import { consume } from '../lib/ratelimit';
import { authConfigured } from '../lib/session';
import { loadEditableCatalog } from '../lib/templateAssets';
import { PLAN, TEST_EMAIL_DOMAIN, isTestEmail, removeChosenTemplates, removeUsers, testEmailSql } from '../lib/users';

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
    // Days with none are absent here and filled in by the page.
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
      sites: sql<number>`(select count(*) from ${site} where ${site}.user_id = ${user}.id)`,
      generations: sql<number>`(select count(*) from ${generation} where ${generation}.user_id = ${user}.id)`,
      chosen: sql<number>`(select count(*) from ${templateChoice} where ${templateChoice}.user_id = ${user}.id)`,
      // The same rule the person's own page and the claim apply
      // (lib/templates.ts), correlated to this row.
      allowance: sql<number>`${allowanceSql(sql`${user}.id`)}`,
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

  const [sites, generations, usage, templates, grants] = await Promise.all([
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
    db
      .select({
        id: templateGrant.id,
        granted: templateGrant.granted,
        note: templateGrant.note,
        createdAt: templateGrant.createdAt,
        // Qualified by hand, as in /users: the admin's address, while they last.
        grantedBy: sql<string | null>`(select u.email from ${user} u where u.id = ${templateGrant}.granted_by)`,
      })
      .from(templateGrant)
      .where(eq(templateGrant.userId, id))
      .orderBy(desc(templateGrant.createdAt)),
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
    templates: {
      used: templates.used,
      total: templates.total,
      left: templates.left,
      chosen: templates.chosen,
      grants,
    },
  });
});

// ---- A person's templates -----------------------------------------------------
// What an admin can do to someone's allowance without a request: take chosen
// templates back (one, several, or all of them) and add to the limit. Taking a
// template back also deletes what the person made on it, their sites and those
// sites' pictures (lib/users.ts). Adding writes a template_grant row, which
// allowanceSql counts beside granted requests, and can mail the person.

const removeTemplatesSchema = z.union([
  z.object({ all: z.literal(true) }),
  z.object({ slugs: z.array(z.string().min(1).max(120)).min(1).max(500) }),
]);

admin.post('/users/:id/templates/remove', async (c) => {
  const parsed = removeTemplatesSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Name the templates to remove, or all of them.' }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const id = c.req.param('id');
  const [person] = await db.select({ id: user.id }).from(user).where(eq(user.id, id)).limit(1);

  if (!person) {
    return c.json({ error: 'Not found' }, 404);
  }

  // Only what is actually chosen: a slug the person does not have is not an error, just nothing.
  const wanted = 'all' in parsed.data ? null : new Set(parsed.data.slugs);
  const chosen = await db.select({ slug: templateChoice.slug }).from(templateChoice).where(eq(templateChoice.userId, id));
  const slugs = chosen.map((row) => row.slug).filter((slug) => !wanted || wanted.has(slug));
  const sitesDeleted = await removeChosenTemplates(c.env, id, slugs);
  const status = await templateStatus(db, id);

  return c.json({ removed: slugs, sitesDeleted, used: status.used, total: status.total });
});

const grantSchema = z.object({
  granted: z.number().int().min(1).max(MAX_GRANT),
  note: z.string().trim().max(500).default(''),
  notify: z.boolean().default(true),
});

admin.post('/users/:id/grants', async (c) => {
  const parsed = grantSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: `Add 1 to ${MAX_GRANT} templates.` }, 400);
  }

  const who = c.get('admin');
  const db = drizzle(c.env.DB, { schema });
  const id = c.req.param('id');
  const [person] = await db.select({ email: user.email }).from(user).where(eq(user.id, id)).limit(1);

  if (!person) {
    return c.json({ error: 'Not found' }, 404);
  }

  const { granted, note, notify } = parsed.data;

  // Each notified grant is a real message, so it sits behind a burst gate like
  // every route here that sends mail. A quiet grant sends nothing.
  if (notify) {
    const burst = await consume(db, { key: `grantmail:${who.id}`, max: 20, windowSeconds: 10 * 60 });

    if (!burst.ok) {
      return c.json({ error: 'That is twenty emails in ten minutes. Untick "Email them", or try again shortly.' }, 429, {
        'retry-after': String(burst.retryAfter),
      });
    }
  }

  const [row] = await db
    .insert(templateGrant)
    .values({ id: crypto.randomUUID(), userId: id, granted, note, grantedBy: who.id })
    .returning();
  const status = await templateStatus(db, id);
  let mailed: boolean | null = null;

  if (notify) {
    // Written first, mailed second: a failed send is reported, never unwinds the grant.
    mailed = await notifyAdminGrant(c.env, { email: person.email, granted, total: status.total, origin: c.env.PUBLIC_ORIGIN })
      .then(() => true)
      .catch((error) => {
        console.error('[mail] admin grant notice failed', error);
        return false;
      });
  }

  return c.json({ grant: { id: row.id, granted: row.granted }, total: status.total, mailed });
});

/** Take a grant back: a mistyped number, say. Nothing chosen is taken away; the person just has fewer left. */
admin.delete('/users/:id/grants/:grantId', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = c.req.param('id');
  const [row] = await db
    .delete(templateGrant)
    .where(and(eq(templateGrant.id, c.req.param('grantId')), eq(templateGrant.userId, id)))
    .returning({ id: templateGrant.id });

  if (!row) {
    return c.json({ error: 'Not found' }, 404);
  }

  const status = await templateStatus(db, id);

  return c.json({ removed: row.id, total: status.total });
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
// Disposable accounts for trying what a member sees (the five templates, the
// "Request more" rounds, a customized download) without a real inbox. Made
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

admin.get('/emails', (c) =>
  c.json({
    provider: mailProvider(c.env),
    to: c.get('admin').email,
    emails: EMAIL_PREVIEWS.map(({ build, ...about }) => {
      const message = build(c.env.PUBLIC_ORIGIN);

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
  // Each call is a real message (see CLAUDE.md, "Request more").
  const burst = await consume(db, { key: `mailtest:${who.id}`, max: 10, windowSeconds: 10 * 60 });

  if (!burst.ok) {
    return c.json({ error: 'That is ten test emails in ten minutes. Try again shortly.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  const email = EMAIL_PREVIEWS.find((entry) => entry.key === parsed.data.key)!;

  try {
    await sendMail(c.env, { to: who.email, ...email.build(c.env.PUBLIC_ORIGIN) });
  } catch (error) {
    console.error('[mail] test send failed', error);
    return c.json({ error: error instanceof Error ? error.message : 'The email could not be sent.' }, 502);
  }

  return c.json({ to: who.email, provider });
});

// ---- "Request more" --------------------------------------------------------
// The requests people at their limit sent (lib/templates.ts). A first request
// is granted by the person following its emailed link, so it is only listed
// here, on a tab of its own; a later one takes the admin's answer. A grant
// counts toward the allowance while the status says 'granted'. Every decision
// but an undo mails the person after the row is written, and a failed send is
// reported in the answer rather than unwinding the decision.

// The tabs of the Requests page: what each shows, as a WHERE clause.
const REQUEST_TABS = {
  review: sql`${templateRequest.round} > 1 and ${templateRequest.status} = 'pending'`,
  link: sql`${templateRequest.round} = 1`,
  granted: sql`${templateRequest.round} > 1 and ${templateRequest.status} = 'granted'`,
  declined: sql`${templateRequest.round} > 1 and ${templateRequest.status} = 'declined'`,
} as const;

type RequestTab = keyof typeof REQUEST_TABS;

const requestQuery = z.object({
  tab: z.enum(Object.keys(REQUEST_TABS) as [RequestTab, ...RequestTab[]]).default('review'),
});

admin.get('/requests', async (c) => {
  const query = requestQuery.safeParse({ tab: c.req.query('tab') });

  if (!query.success) return badQuery(c);

  const db = drizzle(c.env.DB, { schema });
  const tabs = Object.keys(REQUEST_TABS) as RequestTab[];
  const [rows, ...counts] = await Promise.all([
    db
      .select({
        id: templateRequest.id,
        userId: templateRequest.userId,
        name: user.name,
        email: user.email,
        round: templateRequest.round,
        status: templateRequest.status,
        granted: templateRequest.granted,
        role: templateRequest.role,
        building: templateRequest.building,
        sites: templateRequest.sites,
        need: templateRequest.need,
        pay: templateRequest.pay,
        fairPrice: templateRequest.fairPrice,
        link: templateRequest.link,
        note: templateRequest.note,
        sendAt: templateRequest.sendAt,
        decidedAt: templateRequest.decidedAt,
        createdAt: templateRequest.createdAt,
        chosen: sql<number>`(select count(*) from ${templateChoice} where ${templateChoice}.user_id = ${templateRequest}.user_id)`,
        allowance: sql<number>`${allowanceSql(sql`${templateRequest}.user_id`)}`,
        // The person's emailed-link request, for "+5 via email link on ...".
        firstActivatedAt: sql<number | null>`(select r1.decided_at from ${templateRequest} r1 where r1.user_id = ${templateRequest}.user_id and r1.round = 1 and r1.status = 'activated')`,
      })
      .from(templateRequest)
      .innerJoin(user, eq(user.id, templateRequest.userId))
      .where(REQUEST_TABS[query.data.tab])
      .orderBy(desc(templateRequest.createdAt))
      .limit(200),
    ...tabs.map((tab) => db.select({ n: sql<number>`count(*)` }).from(templateRequest).where(REQUEST_TABS[tab])),
  ]);

  return c.json({
    free: FREE_TEMPLATES,
    counts: Object.fromEntries(tabs.map((tab, i) => [tab, Number(counts[i][0]?.n ?? 0)])),
    requests: rows.map((row) => ({
      ...row,
      chosen: Number(row.chosen),
      allowance: Number(row.allowance),
      firstActivatedAt: row.firstActivatedAt ? new Date(Number(row.firstActivatedAt) * 1000) : null,
    })),
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

  // Only a reviewed request takes a decision: a first request's grant is
  // the person's own, by the emailed link.
  const [row] = await db
    .update(templateRequest)
    .set({
      status: decision.status,
      granted,
      decidedAt: decision.status === 'pending' ? null : new Date(),
    })
    .where(and(eq(templateRequest.id, id), sql`${templateRequest.round} > 1`))
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
      // The configured origin, never the host this request arrived on (a
      // preview alias would otherwise be mailed out).
      origin: c.env.PUBLIC_ORIGIN,
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
