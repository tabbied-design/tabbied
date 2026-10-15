import { sql } from 'drizzle-orm';
import type { Db } from './quota';

// Burst limiting, one atomic statement per request.
//
// Not on KV: it throws on a second write to a key within a second (exactly the
// burst this catches, turning the 429 into a 500) and has no compare-and-set.
// In D1 the read, the window rollover and the increment are one statement, so
// the count is exact. A rollover updates the row in place, so there is at most
// one row per user per endpoint. A gate keyed by something with no end to it
// (a client address, for the unauthenticated events route) sweeps its own
// expired rows as well (`sweepExpired`), so the table stays that size.

export type Limit = { key: string; max: number; windowSeconds: number };

export type LimitVerdict = { ok: true; count: number } | { ok: false; retryAfter: number };

type Row = { count: number; expires_at: number };

export async function consume(db: Db, limit: Limit): Promise<LimitVerdict> {
  const now = Math.floor(Date.now() / 1000);
  const windowEnd = now + limit.windowSeconds;

  // The CASE arms are what make a window rollover part of the same atomic
  // step: an expired row is reset to 1 rather than being incremented into the
  // next window, without a read-then-write race in between.
  const row = await db.get<Row>(sql`
    INSERT INTO rate_window (key, count, expires_at)
    VALUES (${limit.key}, 1, ${windowEnd})
    ON CONFLICT(key) DO UPDATE SET
      count = CASE
        WHEN rate_window.expires_at <= ${now} THEN 1
        ELSE rate_window.count + 1
      END,
      expires_at = CASE
        WHEN rate_window.expires_at <= ${now} THEN ${windowEnd}
        ELSE rate_window.expires_at
      END
    RETURNING count, expires_at
  `);

  const count = Number(row?.count ?? 1);

  if (count > limit.max) {
    return {
      ok: false,
      // What the client should actually wait, not the whole window.
      retryAfter: Math.max(1, Number(row?.expires_at ?? windowEnd) - now),
    };
  }

  return { ok: true, count };
}

/**
 * Delete the windows under `prefix` that have already ended. An ended window
 * counts for nothing (`consume` resets it to 1), so this changes no verdict;
 * it only keeps keys that are never seen twice from piling up.
 */
export async function sweepExpired(db: Db, prefix: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);

  await db.run(sql`DELETE FROM rate_window WHERE key LIKE ${`${prefix}%`} AND expires_at <= ${now}`);
}
