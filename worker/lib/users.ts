import { inArray, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { generation, site, user } from '../db/schema';
import type { Env } from '../env';
import { deletePrefix } from './media';

// Accounts as the admin tier handles them: the plan the directory shows, the
// test accounts the Test users page makes, and removal.

/**
 * Every account's plan during the beta. There is one and nothing stores it;
 * the directory shows it so that a second plan is a column in `user` and a
 * change here, not a redesign of the page.
 */
export const PLAN = 'free';

/**
 * Where the Test users page makes its accounts. `.test` is reserved (RFC
 * 2606) and never resolves, so no mail sent to one arrives, which is why they
 * are made verified. A test account is recognised by this domain and nothing
 * else: there is no flag to fall out of step with it.
 */
export const TEST_EMAIL_DOMAIN = 'tabbied.test';

export const isTestEmail = (email: string) => email.toLowerCase().endsWith(`@${TEST_EMAIL_DOMAIN}`);

/**
 * The same rule as a WHERE on `user`: the suffix, never a substring, so
 * `someone@tabbied.testing.com` is not a test account and "Remove all" cannot
 * reach it.
 */
export const testEmailSql = sql`lower(${user.email}) like ${`%@${TEST_EMAIL_DOMAIN}`}`;

/** D1 binds at most 100 parameters a statement, so ids go in batches under it. */
const BATCH = 50;

/**
 * Where accounts' pictures live in R2: their uploads, their directions'
 * images and their sites' pictures. Read it before the rows are deleted:
 * once they cascade, nothing names the generations and sites. At most
 * BATCH ids at a time.
 */
export async function mediaPrefixes(env: Env, ids: string[]): Promise<string[]> {
  const db = drizzle(env.DB, { schema });
  const [sites, generations] = await Promise.all([
    db.select({ id: site.id }).from(site).where(inArray(site.userId, ids)),
    db.select({ id: generation.id }).from(generation).where(inArray(generation.userId, ids)),
  ]);

  return [
    ...ids.map((id) => `up/${id}/`),
    ...generations.map((row) => `gen/${row.id}/`),
    ...sites.map((row) => `gen/site/${row.id}/`),
  ];
}

export async function deleteMedia(env: Env, prefixes: string[]): Promise<void> {
  await Promise.all(prefixes.map((prefix) => deletePrefix(env.MEDIA, prefix)));
}

/**
 * Remove accounts and everything hanging off them. D1 cascades the rows
 * (sessions, sign-in accounts, sites and their revisions, generations,
 * uploads, the usage ledger, the download log, and the beta's template
 * history); R2 does not, so the pictures go by prefix afterwards
 * (`mediaPrefixes`). Product events stay, with their user cleared, so the
 * customizer and Save gate counts do not move when someone leaves.
 *
 * Rows first, bytes second, as a single upload's removal does: a failure
 * between the two leaves bytes nothing points at, never rows pointing at
 * nothing. Someone deleting their own account goes the same way, through
 * better-auth's delete hooks (auth.ts).
 *
 * Who may be removed is the caller's decision; this is only the mechanism.
 * Returns how many accounts were actually there to remove.
 */
export async function removeUsers(env: Env, ids: string[]): Promise<number> {
  const db = drizzle(env.DB, { schema });
  let removed = 0;

  for (let start = 0; start < ids.length; start += BATCH) {
    const batch = ids.slice(start, start + BATCH);
    const prefixes = await mediaPrefixes(env, batch);
    const gone = await db.delete(user).where(inArray(user.id, batch)).returning({ id: user.id });

    removed += gone.length;
    await deleteMedia(env, prefixes);
  }

  return removed;
}
