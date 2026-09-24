import { eq } from 'drizzle-orm';
import { download } from '../db/schema';
import type { Db } from './quota';

// Template downloads: the file names the gate recognises, and the log of what
// went out. What a person may take is decided by the templates they have
// chosen (lib/templates.ts); a row here only records a zip that was served.

/** The zip formats a template ships as, in the file name `<slug>-<format>.zip`. */
export const DOWNLOAD_FORMATS = ['html', 'react'] as const;

export type DownloadFormat = (typeof DOWNLOAD_FORMATS)[number];

/**
 * Record one download before the zip is served. The caller gives the row back
 * (`forgetDownload`) when the asset turns out not to exist, so a row is only
 * ever kept for bytes that went out.
 */
export async function logDownload(db: Db, userId: string, slug: string, format: DownloadFormat): Promise<string> {
  const id = crypto.randomUUID();

  await db.insert(download).values({ id, userId, slug, format });

  return id;
}

/** Remove a logged download whose zip was never served. */
export async function forgetDownload(db: Db, id: string): Promise<void> {
  await db.delete(download).where(eq(download.id, id));
}

/**
 * Whether a request takes a copy of the zip, and so may choose a template and
 * is logged. A HEAD asks about the file without taking it (a link checker, a
 * download manager sizing it up), and a Range that starts past the first
 * byte resumes a copy whose first request already counted.
 */
export function takesCopy(request: Request): boolean {
  if (request.method !== 'GET') return false;

  const range = request.headers.get('range');

  return !range || /^bytes=0-/.test(range.trim());
}

/** `<slug>-<format>.zip`, or null for any other file under /downloads. */
export function parseDownloadName(file: string): { slug: string; format: DownloadFormat } | null {
  const match = /^([a-z0-9-]+)-(html|react)\.zip$/.exec(file);

  return match ? { slug: match[1], format: match[2] as DownloadFormat } : null;
}
