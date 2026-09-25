import { STUDIO_ENTRIES } from 'lib/studioDirections';

// The studio index, emitted as a static asset. The Worker reads it through
// `env.ASSETS.fetch('/studio-index.json')` rather than bundling it, so the API
// matches against exactly what this deployment serves.
//
// A route handler rather than a generator script because the sources are
// TypeScript the build already resolves; a second reader would be a second
// definition of an entry.
export const dynamic = 'force-static';

export async function GET() {
  return Response.json({
    specVersion: 1,
    count: STUDIO_ENTRIES.length,
    entries: STUDIO_ENTRIES,
  });
}
