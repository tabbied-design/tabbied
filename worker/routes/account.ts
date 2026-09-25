import { Hono, type Context } from 'hono';
import { and, desc, eq, gte, sql } from 'drizzle-orm';
import { z } from 'zod';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { aiUsage, site } from '../db/schema';
import type { Env } from '../env';
import { loadEditableCatalog } from '../lib/templateAssets';
import { notifyTemplateRequest, sendApprovalLink } from '../lib/mail';
import {
  FIRST_REQUEST_DELAY_MS,
  FIRST_REQUEST_GRANT,
  LINK_LIFETIME_MS,
  REQUEST_CHOICES,
  REQUEST_NOTE_MAX,
  activateLink,
  claimTemplate,
  limitMessage,
  newLinkToken,
  openRequest,
  requestOf,
  requestsOf,
  templateStatus,
} from '../lib/templates';
import { DAILY_CAPS, startOfUtcDay, type Endpoint } from '../lib/quota';
import { consume } from '../lib/ratelimit';
import { requireUser } from '../lib/session';

// A person's own account data beyond what better-auth serves: today's spend
// against the caps, the templates they have chosen and their "Request more"
// message, and the recent ledger. Session-scoped throughout.

const account = new Hono<{ Bindings: Env }>();

/**
 * Burst gates (lib/ratelimit.ts). Both request routes send a real email, so a
 * script must not be able to loop them; a request is already held to one open
 * at a time, so its gate only needs room for a form answered a few times.
 * Choosing sends nothing and gets the generous gate a manual save has.
 */
const BURST = {
  choose: { max: 30, windowSeconds: 60 },
  request: { max: 10, windowSeconds: 60 },
  resend: { max: 3, windowSeconds: 10 * 60 },
};

/** The answer every gate here gives, with how long to wait. */
const tooFast = (c: Context<{ Bindings: Env }>, retryAfter: number, message = 'Too fast. Try again in a minute.') =>
  c.json({ error: message }, 429, { 'retry-after': String(retryAfter) });

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
  const [status, sites, history] = await Promise.all([
    templateStatus(db, userId),
    db
      .select({ id: site.id, slug: site.slug, updatedAt: site.updatedAt })
      .from(site)
      .where(eq(site.userId, userId))
      .orderBy(desc(site.updatedAt)),
    // Newest first: the latest request is what the page shows, and the
    // whole history says whether the emailed-link round has been used.
    requestsOf(db, userId),
  ]);
  const request = history[0] ?? null;

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
    request: request ? publicRequest(request) : null,
    // Whether the emailed-link round has been used: a first request is
    // answered by the person, every later one by the team.
    firstUsed: history.some((row) => row.round === 1),
  });
});

// "Choose template": make one of the person's templates without taking it
// yet. The same claim a first download or a first customizer save makes.
account.post('/templates', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to choose a template.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const burst = await consume(db, { key: `choose:${userId}`, ...BURST.choose });

  if (!burst.ok) return tooFast(c, burst.retryAfter);

  const body = (await c.req.json().catch(() => null)) as { slug?: unknown } | null;
  const slug = typeof body?.slug === 'string' ? body.slug : '';

  if (!SLUG.test(slug)) {
    return c.json({ error: 'Name a template to choose.' }, 400);
  }

  const slugs = await catalogSlugs(c);

  if (slugs && !slugs.has(slug)) {
    return c.json({ error: 'No such template.' }, 404);
  }

  const claim = await claimTemplate(db, userId, slug);
  const status = await templateStatus(db, userId);
  const counts = { used: status.used, total: status.total, left: status.left };

  if (!claim.ok) {
    return c.json({ error: limitMessage(status.total), ...counts }, 403);
  }

  return c.json({ slug, chosen: claim.id !== null, ...counts });
});

type RequestRow = NonNullable<Awaited<ReturnType<typeof requestOf>>>;

/** What the account page needs of a request: never the token's hash. */
function publicRequest(row: RequestRow) {
  return {
    round: row.round,
    status: row.status,
    granted: row.granted,
    role: row.role,
    building: row.building,
    sites: row.sites,
    sendAt: row.sendAt,
    expiresAt: row.expiresAt,
    createdAt: row.createdAt,
  };
}

const choice = <T extends readonly string[]>(values: T) => z.enum(values as unknown as [string, ...string[]]);

const requestSchema = z.object({
  role: choice(REQUEST_CHOICES.role).optional(),
  building: choice(REQUEST_CHOICES.building).optional(),
  sites: choice(REQUEST_CHOICES.sites).optional(),
  need: choice(REQUEST_CHOICES.need).optional(),
  pay: choice(REQUEST_CHOICES.pay).optional(),
  fairPrice: z.string().trim().max(120).optional(),
  link: z.string().trim().max(300).optional(),
  note: z.string().trim().max(REQUEST_NOTE_MAX).optional(),
});

/**
 * The link in a first request's email, on the configured origin. Never the
 * host the request arrived on, which is the Worker's port under `npm run dev`
 * and the alias on a preview.
 */
const activationUrl = (origin: string, token: string) =>
  `${origin}/api/account/templates/activate?token=${encodeURIComponent(token)}`;

async function personOf(db: ReturnType<typeof drizzle<typeof schema>>, userId: string) {
  const [person] = await db
    .select({ name: schema.user.name, email: schema.user.email })
    .from(schema.user)
    .where(eq(schema.user.id, userId))
    .limit(1);

  return person ?? null;
}

// "Request more", once every template the person may choose is chosen.
//
// The first request answers three questions and is granted by the person:
// the email with its single-use link is scheduled for a few minutes out, and
// following the link adds FIRST_REQUEST_GRANT. Every later request carries
// more answers and a note and goes to the team, who are mailed with the
// person as Reply-To. One request may be open at a time (`openRequest`).
// A send that fails is logged: the row is what the pages read, and a first
// request's link can be sent again from the account page.
account.post('/templates/request', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to ask for more templates.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const burst = await consume(db, { key: `request:${userId}`, ...BURST.request });

  if (!burst.ok) return tooFast(c, burst.retryAfter);

  const parsed = requestSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: 'Choose one of the answers offered for each question.' }, 400);
  }

  const [status, history, person] = await Promise.all([
    templateStatus(db, userId),
    requestsOf(db, userId),
    personOf(db, userId),
  ]);

  if (status.left > 0) {
    return c.json({ error: `You still have ${status.left} template${status.left === 1 ? '' : 's'} to choose.` }, 409);
  }

  if (!person) return c.json({ error: 'Sign in to ask for more templates.' }, 401);

  if (history.some((row) => row.status === 'sent' || row.status === 'pending')) {
    return c.json({ error: 'You already have a request open.' }, 409);
  }

  const answers = parsed.data;
  const first = !history.some((row) => row.round === 1);
  const last = history[0];
  const origin = c.env.PUBLIC_ORIGIN;

  if (first) {
    if (!answers.role || !answers.building || !answers.sites) {
      return c.json({ error: 'Answer the three questions to get your templates.' }, 400);
    }

    const { token, hash } = await newLinkToken();
    const now = Date.now();
    const sendAt = new Date(now + FIRST_REQUEST_DELAY_MS);
    const id = await openRequest(db, userId, {
      round: 1,
      role: answers.role,
      building: answers.building,
      sites: answers.sites,
      note: answers.note ?? '',
      tokenHash: hash,
      expiresAt: new Date(now + LINK_LIFETIME_MS),
      sendAt,
    });

    if (!id) return c.json({ error: 'You already have a request open.' }, 409);

    await sendApprovalLink(c.env, {
      email: person.email,
      name: person.name,
      url: activationUrl(origin, token),
      granted: FIRST_REQUEST_GRANT,
      total: status.total + FIRST_REQUEST_GRANT,
      sendAt,
    }).catch((error) => console.error('[mail] approval link failed', error));

    return c.json({ request: publicRequest((await requestOf(db, userId))!) });
  }

  // A later request: the first three answers carry forward unless changed.
  const role = answers.role ?? last?.role ?? null;
  const building = answers.building ?? last?.building ?? null;
  const sites = answers.sites ?? last?.sites ?? null;

  if (!answers.need || !answers.pay || !answers.note) {
    return c.json({ error: 'Say how many you need, whether you would pay, and what they are for.' }, 400);
  }

  const round = Math.max(1, ...history.map((row) => row.round)) + 1;
  const id = await openRequest(db, userId, {
    round,
    role,
    building,
    sites,
    need: answers.need,
    pay: answers.pay,
    fairPrice: answers.fairPrice || null,
    link: answers.link || null,
    note: answers.note,
  });

  if (!id) return c.json({ error: 'You already have a request open.' }, 409);

  const sending = notifyTemplateRequest(c.env, {
    name: person.name,
    email: person.email,
    note: answers.note,
    used: status.used,
    total: status.total,
    answers: [
      [role, building, sites ? `${sites} sites in the next 3 months` : null].filter(Boolean).join(', '),
      `Needs ${answers.need} more. Would pay: ${answers.pay}${answers.fairPrice ? ` (${answers.fairPrice})` : ''}`,
      ...(answers.link ? [`Work: ${answers.link}`] : []),
    ],
    origin,
  }).catch((error) => console.error('[mail] template request notice failed', error));

  c.executionCtx.waitUntil(sending);

  return c.json({ request: publicRequest((await requestOf(db, userId))!) });
});

// Send a first request's link again: a new token (the old link stops
// working), a fresh week, and now rather than in five minutes, since the
// person is asking because the first one did not arrive.
account.post('/templates/request/resend', async (c) => {
  const userId = await requireUser(c.env, c.req.raw.headers);

  if (!userId) {
    return c.json({ error: 'Sign in to ask for more templates.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const burst = await consume(db, { key: `resend:${userId}`, ...BURST.resend });

  if (!burst.ok) {
    return tooFast(c, burst.retryAfter, 'You have asked for a new link a few times already. Try again in a few minutes.');
  }

  const [request, person, status] = await Promise.all([requestOf(db, userId), personOf(db, userId), templateStatus(db, userId)]);

  if (!request || request.round !== 1 || request.status !== 'sent' || !person) {
    return c.json({ error: 'There is no link waiting to be sent.' }, 409);
  }

  const now = new Date();

  // Not before the first email is due: Resend still holds that message, and
  // a new token now would make the link in it dead on arrival.
  if (request.sendAt && request.sendAt.getTime() > now.getTime()) {
    return c.json({ error: 'Your email has not gone out yet. You can send a new one once it is due.' }, 409);
  }

  const { token, hash } = await newLinkToken();

  await db
    .update(schema.templateRequest)
    .set({ tokenHash: hash, expiresAt: new Date(now.getTime() + LINK_LIFETIME_MS), sendAt: now })
    .where(eq(schema.templateRequest.id, request.id));

  try {
    await sendApprovalLink(c.env, {
      email: person.email,
      name: person.name,
      url: activationUrl(c.env.PUBLIC_ORIGIN, token),
      granted: FIRST_REQUEST_GRANT,
      total: status.total + FIRST_REQUEST_GRANT,
    });
  } catch (error) {
    console.error('[mail] approval link resend failed', error);
    return c.json({ error: 'The email could not be sent. Try again in a minute.' }, 502);
  }

  return c.json({ request: publicRequest((await requestOf(db, userId))!) });
});

// The emailed link. No session needed: the token is the capability, and the
// email may be opened on another device. It lands on the account page,
// which says what happened (`?activated=`).
account.get('/templates/activate', async (c) => {
  const token = c.req.query('token') ?? '';

  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) {
    return c.redirect('/account/?activated=unknown', 302);
  }

  const db = drizzle(c.env.DB, { schema });
  const result = await activateLink(db, token);

  return c.redirect(`/account/?activated=${result.ok ? result.granted : result.reason}`, 302);
});

export default account;
