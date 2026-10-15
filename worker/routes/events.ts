import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import * as schema from '../db/schema';
import { event } from '../db/schema';
import type { Env } from '../env';
import { consume, sweepExpired } from '../lib/ratelimit';
import { requireUser } from '../lib/session';

// First-party product counts, reported by the site and read back only as
// totals on the admin overview. No third-party analytics: a row in D1 per
// event, with the person attached when one is signed in.
//
// The kinds are a closed list, so a typo on the page is a 400 rather than a
// new number nobody reads:
//
//   customize   the customizer opened on a template
//   save-gate   a signed-out person pressed Save and was asked to make an account
//   gate-save   the edits held at that gate were saved after signing in
//
// and one the Worker writes itself, beside the download row, which is why it
// is not in the list a page may post (worker/lib/downloads.ts):
//
//   download-customized   a download the customizer built from a template
//
// Anyone may post, signed in or not, so the gate is per client address
// (`CF-Connecting-IP`, which Cloudflare sets on every request; the constant is
// for local dev, where nothing does). Generous, since a person opening a few
// templates in a minute is the point: it only stops a loop.

export const EVENT_KINDS = ['customize', 'save-gate', 'gate-save'] as const;

/** Every kind the `event` table holds: the ones a page posts, and the Worker's own. */
export type EventKind = (typeof EVENT_KINDS)[number] | 'download-customized';

const eventSchema = z.object({
  kind: z.enum(EVENT_KINDS),
  slug: z
    .string()
    .regex(/^[a-z0-9-]{1,80}$/)
    .optional(),
});

const BURST = { max: 60, windowSeconds: 60 };

/** The rate window's key prefix, which `sweepExpired` clears behind it. */
const KEY = 'event:';

/** A body this small is all an event is; anything larger is not one. */
const MAX_BYTES = 2048;

const events = new Hono<{ Bindings: Env }>();

events.post('/', async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const client = c.req.header('cf-connecting-ip') ?? 'local';
  const burst = await consume(db, { key: `${KEY}${client}`, ...BURST });

  // One request in fifty clears the windows that have ended. Keyed by
  // address, each visitor would otherwise leave a row behind for good
  // (lib/ratelimit.ts); after the response, so no one waits on it.
  if (Math.random() < 0.02) {
    c.executionCtx.waitUntil(
      sweepExpired(db, KEY).catch((error) => console.error('[events] rate window sweep failed', error))
    );
  }

  if (!burst.ok) {
    return c.json({ error: 'Too many events. Try again in a minute.' }, 429, {
      'retry-after': String(burst.retryAfter),
    });
  }

  if (Number(c.req.header('content-length') ?? 0) > MAX_BYTES) {
    return c.json({ error: 'That is too large to be an event.' }, 413);
  }

  const parsed = eventSchema.safeParse(await c.req.json().catch(() => null));

  if (!parsed.success) {
    return c.json({ error: `Send a kind (${EVENT_KINDS.join(', ')}) and, if there is one, a template slug.` }, 400);
  }

  // Only to put a name on the row: an event counts with or without one, so a
  // session lookup that fails records it as anonymous rather than losing it.
  const userId = await requireUser(c.env, c.req.raw.headers).catch(() => null);

  await db.insert(event).values({
    id: crypto.randomUUID(),
    kind: parsed.data.kind,
    slug: parsed.data.slug ?? null,
    userId,
  });

  return c.body(null, 204);
});

export default events;
