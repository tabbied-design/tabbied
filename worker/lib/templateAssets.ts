import type { TemplateSpec } from 'tabbied-templates';
import type { Env } from '../env';

// The template artifacts, read through the assets binding, so the Worker
// authors against exactly the bytes this deployment serves. Specs and pages
// are read fresh (many slugs, each read rarely). The page hashes and the
// design catalog are memoized: an isolate lives inside one deployment, so a
// value that changes only with a deploy cannot go stale within it. A memoized
// promise is dropped on failure, so a transient miss does not stick.

type CatalogEntry = { slug: string; name?: string; copyRoles?: string[] };
type EditableCatalog = { templates: CatalogEntry[] };
type DesignCatalog = { designs: { slug: string }[] };

/** How many redirects a read will follow before giving up. */
const MAX_HOPS = 3;

/**
 * Read one asset, the way a browser would. The binding applies the edge's
 * `html_handling`, which answers `/dir/index.html` with a 307 to `/dir/`, so
 * callers ask for the URL the router serves outright (see `loadPackagedHtml`)
 * and a same-origin redirect handed back anyway is followed, a bounded number
 * of times.
 */
async function readAsset(env: Env, request: Request, path: string): Promise<Response> {
  let url = new URL(path, request.url);

  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    const response = await env.ASSETS.fetch(url.toString());

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      const next = location ? new URL(location, url) : null;

      if (!next || next.origin !== url.origin) {
        throw new Error(`${path} redirected off-site (${response.status})`);
      }

      url = next;
      continue;
    }

    if (!response.ok) {
      throw new Error(`${path} returned ${response.status}`);
    }

    return response;
  }

  throw new Error(`${path} redirected more than ${MAX_HOPS} times`);
}

/** `/editable-catalog.json`: which templates can take which brand copy. */
export async function loadEditableCatalog(env: Env, request: Request): Promise<EditableCatalog> {
  return (await readAsset(env, request, '/editable-catalog.json')).json() as Promise<EditableCatalog>;
}

// Read on every save that swaps a pattern.
let designsPromise: Promise<ReadonlySet<string>> | null = null;

/**
 * `/catalog.json`: every design's slug, as the set a pattern slot may be
 * swapped to. A slug outside it hydrates to a blank field with a console
 * warning, so the planner is handed this and refuses it up front.
 */
export function loadDesignSlugs(env: Env, request: Request): Promise<ReadonlySet<string>> {
  designsPromise ??= readAsset(env, request, '/catalog.json')
    .then(async (response) => {
      const body = (await response.json()) as DesignCatalog;

      if (!Array.isArray(body.designs) || body.designs.length === 0) {
        throw new Error('/catalog.json contained no designs');
      }

      return new Set(body.designs.map((design) => design.slug));
    })
    .catch((error) => {
      designsPromise = null;
      throw error;
    });

  return designsPromise;
}

/** `/editable/<slug>.json`: the spec the site is authored against. */
export async function loadTemplateSpec(env: Env, request: Request, slug: string): Promise<TemplateSpec> {
  return (await readAsset(env, request, `/editable/${slug}.json`)).json() as Promise<TemplateSpec>;
}

/**
 * The packaged page, `out/downloads/<slug>/index.html`: the artifact previewed
 * and shipped. Asked for as `/downloads/<slug>/`, the URL the asset router
 * serves it under (as `packagedTemplateUrl` in lib/studioPreview.ts does);
 * see `readAsset`.
 */
export async function loadPackagedHtml(env: Env, request: Request, slug: string): Promise<string> {
  return (await readAsset(env, request, `/downloads/${slug}/`)).text();
}

/** SHA-256 as hex, what `site.templateHash` pins. */
export async function hashText(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));

  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

const hashPromises = new Map<string, Promise<string>>();

/**
 * The packaged page's hash, once per slug per isolate. Written into
 * `site.templateHash` when a site is made and compared to it on every read,
 * so a re-packaged template is announced rather than discovered.
 */
export function hashPackagedHtml(env: Env, request: Request, slug: string): Promise<string> {
  let promise = hashPromises.get(slug);

  if (!promise) {
    promise = loadPackagedHtml(env, request, slug)
      .then(hashText)
      .catch((error) => {
        hashPromises.delete(slug);
        throw error;
      });
    hashPromises.set(slug, promise);
  }

  return promise;
}
