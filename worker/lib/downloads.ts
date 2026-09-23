import { and, desc, eq, gt, gte, sql } from 'drizzle-orm';
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
// The count is exact for the same reason the daily ledger is: it reads rows
// in D1, claimed in the statement that checks the cap and kept only for a
// zip that was served (`claimDownload`). What it counts is
// templates, not zips: a template taken twice in a month, or in both formats,
// is one of the thirty, since the second copy costs nothing and a person who
// re-downloads after a fix should not pay for it. An admin's reset is a
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

/** The rows that count this month: this person's, since the month started. */
const thisMonth = (userId: string, since: Date, afterReset: boolean) =>
  and(
    eq(download.userId, userId),
    afterReset ? gt(download.createdAt, since) : gte(download.createdAt, since)
  );

/** This month's templates against the cap. */
export async function downloadStatus(db: Db, userId: string): Promise<DownloadStatus> {
  const { since, afterReset } = await countedSince(db, userId);
  const [row] = await db
    .select({ used: sql<number>`count(distinct ${download.slug})` })
    .from(download)
    .where(thisMonth(userId, since, afterReset));
  const used = Number(row?.used ?? 0);

  return {
    used,
    cap: TEMPLATE_DOWNLOADS_PER_MONTH,
    resetsAt: startOfNextUtcMonth(),
    ok: used < TEMPLATE_DOWNLOADS_PER_MONTH,
  };
}

/** Whether this template is already one of the month's: taking it again is free. */
export async function downloadedThisMonth(db: Db, userId: string, slug: string): Promise<boolean> {
  const { since, afterReset } = await countedSince(db, userId);
  const [row] = await db
    .select({ id: download.id })
    .from(download)
    .where(and(thisMonth(userId, since, afterReset), eq(download.slug, slug)))
    .limit(1);

  return row !== undefined;
}

export type DownloadRow = { slug: string; format: string; createdAt: Date };

/** How far back the history a person can see reaches. */
export const HISTORY_MONTHS = 6;

/** Every zip this person took in the last HISTORY_MONTHS months, newest first. */
export async function recentDownloads(db: Db, userId: string): Promise<DownloadRow[]> {
  const now = new Date();
  const since = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - HISTORY_MONTHS, now.getUTCDate()));

  return db
    .select({ slug: download.slug, format: download.format, createdAt: download.createdAt })
    .from(download)
    .where(and(eq(download.userId, userId), gte(download.createdAt, since)))
    .orderBy(desc(download.createdAt))
    .limit(500);
}

/**
 * Take one download against the cap: write its row if the template is
 * already among the month's or the month is under the cap, and report
 * whether it was written. Null means the cap is spent.
 *
 * The check and the write are one statement, and must stay that way. Read
 * the count, compare, then insert was the first version, and a person who
 * fired a hundred requests at once had every one of them read the same
 * count under thirty before any of them wrote: fifty-one templates went out
 * against a cap of thirty. D1 runs one statement at a time, so an INSERT
 * whose own WHERE does the counting is exact however many arrive together.
 *
 * The row is written before the zip is served, so the caller releases it
 * (`releaseDownload`) when the asset turns out not to exist: a row is still
 * only ever kept for bytes that went out.
 */
export async function claimDownload(
  db: Db,
  userId: string,
  slug: string,
  format: DownloadFormat
): Promise<string | null> {
  const { since, afterReset } = await countedSince(db, userId);
  const id = crypto.randomUUID();
  // Unix seconds, the column's own unit (see `countedSince` for why the
  // comparison differs after a reset).
  const from = Math.floor(since.getTime() / 1000);
  const after = sql.raw(afterReset ? '>' : '>=');
  const result = await db.run(sql`
    insert into download (id, user_id, slug, format)
    select ${id}, ${userId}, ${slug}, ${format}
    where exists (
      select 1 from download
      where user_id = ${userId} and created_at ${after} ${from} and slug = ${slug}
    ) or (
      select count(distinct slug) from download
      where user_id = ${userId} and created_at ${after} ${from}
    ) < ${TEMPLATE_DOWNLOADS_PER_MONTH}
  `);

  return (result.meta.changes ?? 0) > 0 ? id : null;
}

/** Give back a claimed download whose zip was never served. */
export async function releaseDownload(db: Db, id: string): Promise<void> {
  await db.delete(download).where(eq(download.id, id));
}

/**
 * Whether a request takes a copy of the zip, and so counts. A HEAD asks
 * about the file without taking it (a link checker, a download manager
 * sizing it up), and a Range that starts past the first byte resumes a copy
 * whose first request already counted.
 */
export function takesCopy(request: Request): boolean {
  if (request.method !== 'GET') return false;

  const range = request.headers.get('range');

  return !range || /^bytes=0-/.test(range.trim());
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
