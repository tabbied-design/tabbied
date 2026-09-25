// The download with the person's changes in it, built in the browser: a
// Worker has no DOM to apply the document with and would re-upload a large
// archive per click. Fetch the packaged zip, apply the document to its
// index.html with the same engine the canvas was drawn with, and zip it again.
//
// Beyond the engine's work, two things only: the bootstrap's import list is
// rewritten to the designs the page mounts now (a swapped field names one the
// packager never listed), and a picture Studio made, reached through
// /api/media, is shipped inside the archive, since an unzipped folder has no
// API behind it.
import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate';
import {
  applyEdits,
  type EditsDocument,
  type Problem,
  type TemplateSpec,
} from 'tabbied-templates';
import { apiFetch } from 'lib/apiFetch';
import type { SiteDocument } from 'lib/studioDocument';
import { templateSpecUrl } from 'lib/studioPreview';

/** `zip`'s default and fflate's, the level the packager writes at. */
const ZIP_LEVEL = 6;

/** Every design the document mounts, sorted, for the bootstrap's import. */
const mountedDesigns = (doc: Document): string[] =>
  [
    ...new Set(
      [...doc.querySelectorAll('[data-pattern]')]
        .map((element) => element.getAttribute('data-pattern') ?? '')
        .filter((slug) => /^[a-z0-9]+$/.test(slug))
    ),
  ].sort();

/**
 * Point the packaged bootstrap at the designs the page mounts now. Matched on
 * the esm.sh specifier the packager writes (scripts/package-templates.mjs);
 * false when there is no such script, which a caller reports rather than
 * shipping a page whose patterns would not draw.
 */
function rewriteBootstrap(doc: Document): boolean {
  const script = [...doc.querySelectorAll('script[type="module"]')].find((candidate) =>
    candidate.textContent?.includes('esm.sh/tabbied')
  );

  if (!script) return false;

  const list = mountedDesigns(doc).join(', ');
  const text = script.textContent ?? '';

  script.textContent = text
    .replace(
      /import \{[^}]*\} from '(https:\/\/esm\.sh\/tabbied@[^']*\/patterns)'/,
      `import { ${list} } from '$1'`
    )
    .replace(/hydratePatterns\(\{ patterns: \{[^}]*\} \}\)/, `hydratePatterns({ patterns: { ${list} } })`);

  return true;
}

const extensionFor = (contentType: string): string => {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg';
  return 'webp';
};

/**
 * Bring Studio's pictures into the archive. Each `/api/media/...` image is
 * fetched from this origin, written under images/, and the page pointed at
 * the copy. One that cannot be fetched is left as it was and reported.
 */
async function inlineMedia(
  doc: Document,
  slug: string,
  entries: Record<string, Uint8Array>
): Promise<Problem[]> {
  const problems: Problem[] = [];
  const images = [...doc.querySelectorAll('img[src^="/api/media/"]')];

  for (const [index, image] of images.entries()) {
    const src = image.getAttribute('src') ?? '';

    try {
      const response = await fetch(src);

      if (!response.ok) throw new Error(String(response.status));

      const file = `images/studio-${index + 1}.${extensionFor(response.headers.get('content-type') ?? '')}`;

      entries[`${slug}/${file}`] = new Uint8Array(await response.arrayBuffer());
      image.setAttribute('src', `./${file}`);
    } catch {
      problems.push({
        level: 'warning',
        path: 'images',
        message: `${src} could not be fetched and is still referenced by its URL`,
      });
    }
  }

  return problems;
}

export type CustomisedArchive = {
  bytes: Uint8Array;
  problems: Problem[];
};

/**
 * The packaged HTML download for `slug`, with the document applied. The
 * archive keeps the package's entries, order and root folder, with index.html
 * replaced.
 */
export async function buildCustomisedArchive(options: {
  slug: string;
  spec: TemplateSpec;
  edits: EditsDocument;
}): Promise<CustomisedArchive> {
  const { slug, spec, edits } = options;
  const response = await fetch(`/downloads/${slug}-html.zip`);

  if (!response.ok) {
    // The Worker's claim answers a refused fetch (signed out, or every
    // template already chosen) with a JSON sentence, which is the toast.
    const said = await response
      .json()
      .then((body: { error?: string }) => body.error)
      .catch(() => undefined);

    throw new Error(said ?? `The ${slug} package is not available (${response.status}).`);
  }

  const entries = unzipSync(new Uint8Array(await response.arrayBuffer()));
  const page = `${slug}/index.html`;

  if (!entries[page]) {
    throw new Error(`The ${slug} package has no index.html.`);
  }

  const doc = new DOMParser().parseFromString(strFromU8(entries[page]), 'text/html');
  const problems = [...applyEdits(doc, spec, edits).problems];

  if (!rewriteBootstrap(doc)) {
    problems.push({
      level: 'error',
      path: 'runtime',
      message: 'the packaged template has no esm.sh bootstrap to update - its patterns would not draw',
    });
  }

  problems.push(...(await inlineMedia(doc, slug, entries)));

  entries[page] = strToU8(`<!DOCTYPE html>\n${doc.documentElement.outerHTML}\n`);

  return { bytes: zipSync(entries, { level: ZIP_LEVEL }), problems };
}

/** `Park & Co.` to `park-and-co`; a name with nothing usable in it is `site`. */
export const archiveNameFor = (title: string): string =>
  title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'site';

/** Hand the bytes to the browser as a download. */
export function saveArchive(bytes: Uint8Array, fileName: string): void {
  const blob = new Blob([bytes as BlobPart], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  // Revoking synchronously can abort the just-started download.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/**
 * A saved site's customized HTML download, from anywhere a site id is known:
 * the customizer's build, on the site's latest saved revision.
 */
export async function downloadCustomisedSite(siteId: string): Promise<void> {
  const site = await apiFetch<SiteDocument>(`/api/studio/sites/${encodeURIComponent(siteId)}`);
  const specResponse = await fetch(templateSpecUrl(site.slug));

  if (!specResponse.ok) {
    throw new Error(`The ${site.templateName} template is not available right now.`);
  }

  const spec = (await specResponse.json()) as TemplateSpec;
  const { bytes } = await buildCustomisedArchive({ slug: site.slug, spec, edits: site.latest.edits });

  saveArchive(bytes, `${archiveNameFor(site.title)}-html.zip`);
}
