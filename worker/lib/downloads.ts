import { eq } from 'drizzle-orm';
import { download, event } from '../db/schema';
import type { Db } from './quota';

// Template downloads: the file names the route recognises, and the log of
// what went out. Every template is free to take, with or without an account,
// so nothing here decides anything; a row only records a zip that was served,
// and the admin overview counts them.
//
// The customizer builds its download from the packaged zip in the browser
// (lib/studioDownload.ts), and says what each fetch is for in `?for=`: the
// zip it turns into the person's download is `customized`, logged like any
// download and marked with a `download-customized` event beside it, and a
// package it only reads to make another (the HTML page a customized React
// project takes its result from) is `build`, not logged at all. Before the
// two were told apart, a customized React download counted as two downloads
// and no download said it was customized.

/** The zip formats a template ships as, in the file name `<slug>-<format>.zip`. */
const DOWNLOAD_FORMATS = ['html', 'react'] as const;

export type DownloadFormat = (typeof DOWNLOAD_FORMATS)[number];

/** What a fetch of a zip is for: a plain download unless the customizer says otherwise. */
export type DownloadUse = 'download' | 'customized' | 'build';

export const downloadUse = (value: string | undefined): DownloadUse =>
  value === 'customized' || value === 'build' ? value : 'download';

/** The rows one download wrote, to give back if the zip is not served. */
export type LoggedDownload = { download: string; event: string | null };

/**
 * Record one download before the zip is served, against the person when one
 * is signed in and against nobody (null) otherwise, and a customized one's
 * event beside it. The caller gives the rows back (`forgetDownload`) when the
 * asset turns out not to exist, so a row is only ever kept for bytes that
 * went out.
 */
export async function logDownload(
  db: Db,
  userId: string | null,
  slug: string,
  format: DownloadFormat,
  customized = false
): Promise<LoggedDownload> {
  const id = crypto.randomUUID();

  await db.insert(download).values({ id, userId, slug, format });

  if (!customized) return { download: id, event: null };

  const eventId = crypto.randomUUID();
  await db.insert(event).values({ id: eventId, kind: 'download-customized', slug, userId });

  return { download: id, event: eventId };
}

/** Remove a logged download whose zip was never served. */
export async function forgetDownload(db: Db, logged: LoggedDownload): Promise<void> {
  await db.delete(download).where(eq(download.id, logged.download));
  if (logged.event) await db.delete(event).where(eq(event.id, logged.event));
}

/**
 * Whether a request takes a copy of the zip, and so is logged. A HEAD asks
 * about the file without taking it (a link checker, a download manager sizing
 * it up), and a Range that starts past the first byte resumes a copy whose
 * first request already counted.
 */
export function takesCopy(request: Request): boolean {
  if (request.method !== 'GET') return false;

  const range = request.headers.get('range');

  return !range || /^bytes=0-/.test(range.trim());
}

/**
 * A path inside a React package's unzipped folder (`/downloads/<slug>-react/`),
 * which is never served. The folder is the template's authored source, in the
 * deploy only because the zip beside it is made from it; the zip is the one
 * way that source leaves. Nothing on the site reads the
 * folder (the e2e suite reads it from disk), unlike the HTML package's, which
 * the customizer and the Studio preview draw from.
 */
export function isReactSource(pathname: string): boolean {
  return /^\/downloads\/[a-z0-9-]+-react(?:\/|$)/.test(pathname);
}

/** `<slug>-<format>.zip`, or null for any other file under /downloads. */
export function parseDownloadName(file: string): { slug: string; format: DownloadFormat } | null {
  const match = /^([a-z0-9-]+)-(html|react)\.zip$/.exec(file);

  return match ? { slug: match[1], format: match[2] as DownloadFormat } : null;
}
