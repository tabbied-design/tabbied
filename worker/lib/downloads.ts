import { and, eq, gt, gte, sql } from 'drizzle-orm';
import { download, user } from '../db/schema';
import type { Db } from './quota';

// The template download cap: how many zips an account may take in a month.
//
// A cap over a month rather than a day, because a download is a deliberate
// act a person makes a few of, not a call a script can spend a day's budget
// on in ten seconds (that is what the burst limiter and the daily ledger are
// for). Thirty is the number the account page's artboard drew, and every
// account gets it while the site is free.
//
// The count is exact for the same reason the daily ledger is: it sums rows
// in D1 that are written only after the zip was served. An admin's reset is a
// timestamp on the person's row, not a deletion, so the ledger keeps saying
// what was taken and the month's count simply starts again from there.

export const TEMPLATE_DOWNLOADS_PER_MONTH = 30;

/** The zip formats a template ships as, in the file name `<slug>-<format>.zip`. */
export const DOWNLOAD_FORMATS = ['html', 'react'] as const;

export type DownloadFormat = (typeof DOWNLOAD_FORMATS)[number];

/** Midnight UTC on the first of this month. */
export const startOfUtcMonth = (now = new Date()) =>
  new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

/** Midnight UTC on the first of next month: when the count starts over. */
export const startOfNextUtcMonth = (now = new Date()) =>
  new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

export type DownloadStatus = {
  used: number;
  cap: number;
  /** When the month's count starts over. */
  resetsAt: Date;
  ok: boolean;
};

/**
 * Where this person's month started: the month, or an admin's later reset.
 *
 * Both are whole seconds in D1, so a download in the very second of a reset
 * cannot be placed on either side of it. It goes uncounted: the rows from
 * the month's first second count (the boundary is a clock, nothing was
 * taken at it), the rows from the reset's second do not (the person was
 * downloading as the admin pressed the button, and the reset is the later
 * word).
 */
async function countedSince(db: Db, userId: string): Promise<{ since: Date; afterReset: boolean }> {
  const [row] = await db
    .select({ resetAt: user.downloadsResetAt })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);
  const month = startOfUtcMonth();

  return row?.resetAt && row.resetAt > month
    ? { since: row.resetAt, afterReset: true }
    : { since: month, afterReset: false };
}

/** This month's downloads against the cap. */
export async function downloadStatus(db: Db, userId: string): Promise<DownloadStatus> {
  const { since, afterReset } = await countedSince(db, userId);
  const [row] = await db
    .select({ used: sql<number>`count(*)` })
    .from(download)
    .where(
      and(
        eq(download.userId, userId),
        afterReset ? gt(download.createdAt, since) : gte(download.createdAt, since)
      )
    );
  const used = Number(row?.used ?? 0);

  return {
    used,
    cap: TEMPLATE_DOWNLOADS_PER_MONTH,
    resetsAt: startOfNextUtcMonth(),
    ok: used < TEMPLATE_DOWNLOADS_PER_MONTH,
  };
}

/** Write the row for a download that was served. */
export async function recordDownload(
  db: Db,
  userId: string,
  slug: string,
  format: DownloadFormat
): Promise<void> {
  await db.insert(download).values({ id: crypto.randomUUID(), userId, slug, format });
}

/** Give a person the whole month's cap back, from now. */
export async function resetDownloads(db: Db, userId: string): Promise<void> {
  await db.update(user).set({ downloadsResetAt: new Date() }).where(eq(user.id, userId));
}

/** `<slug>-<format>.zip`, or null for any other file under /downloads. */
export function parseDownloadName(file: string): { slug: string; format: DownloadFormat } | null {
  const match = /^([a-z0-9-]+)-(html|react)\.zip$/.exec(file);

  return match ? { slug: match[1], format: match[2] as DownloadFormat } : null;
}
