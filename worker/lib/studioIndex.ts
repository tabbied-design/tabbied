import type { Env } from '../env';
import type { StudioEntry } from '../../lib/studioMatch';

// The template sites' match index, read as an asset rather than bundled.
//
// `/studio-index.json` is emitted by the export (app/studio-index.json/route.ts)
// from the same TypeScript the site matches against, so the API and the browser
// score identical data. Memoized like the MCP catalog: cached as the promise so
// concurrent first requests share one fetch, and a failure is not cached, so a
// transient miss cannot poison the isolate.

type Index = { specVersion: number; count: number; entries: StudioEntry[] };

let indexPromise: Promise<StudioEntry[]> | null = null;

export function loadStudioIndex(env: Env, request: Request): Promise<StudioEntry[]> {
  indexPromise ??= env.ASSETS.fetch(new URL('/studio-index.json', request.url).toString())
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`/studio-index.json returned ${response.status}`);
      }

      const body = (await response.json()) as Index;

      if (!Array.isArray(body.entries) || body.entries.length === 0) {
        throw new Error('/studio-index.json contained no entries');
      }

      return body.entries;
    })
    .catch((error) => {
      indexPromise = null;
      throw error;
    });

  return indexPromise;
}
