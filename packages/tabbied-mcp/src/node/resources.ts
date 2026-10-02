// Where the stdio server gets its catalog, previews, and docs.
//
// The catalog is read from the installed `tabbied` package rather than fetched,
// so the tools describe exactly the version the caller will `npm install`: a
// design that only exists on the site would give an import that doesn't
// resolve. The network is the fallback, not the default.
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type {
  Catalog,
  CatalogDesign,
  TemplateCatalog,
  TemplateSpec,
} from '../types.js';

const require = createRequire(import.meta.url);

const SITE = 'https://tabbied.com';

// Every read here is a small static file. Without a limit, a network that
// swallows packets would hold a tool call (or the server's startup) open for
// as long as the client is willing to wait.
const FETCH_TIMEOUT_MS = 10_000;

/**
 * GET a URL, failing with a message that names it. Node's own failure is a
 * bare "fetch failed" (the reason is in `cause`), which tells an agent nothing
 * about what was unreachable.
 */
async function get(url: string): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (error) {
    const reason =
      error instanceof Error && error.name === 'TimeoutError'
        ? `no answer within ${FETCH_TIMEOUT_MS / 1000}s`
        : error instanceof Error
          ? [error.message, (error.cause as Error | undefined)?.message]
              .filter(Boolean)
              .join(': ')
          : String(error);
    throw new Error(`${url} could not be reached (${reason})`);
  }
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response;
}

/** Root of the installed `tabbied` package, or null when it isn't resolvable. */
export function tabbiedRoot(): string | null {
  try {
    return path.dirname(require.resolve('tabbied/package.json'));
  } catch {
    return null;
  }
}

export async function loadCatalog(): Promise<Catalog> {
  const root = tabbiedRoot();

  if (root) {
    try {
      return JSON.parse(
        await readFile(path.join(root, 'catalog.json'), 'utf-8')
      ) as Catalog;
    } catch (error) {
      // A resolvable package with no catalog.json means a source checkout that
      // hasn't been built. Say so - the network copy would silently disagree
      // with the local patterns the user is about to edit.
      const reason = error instanceof Error ? error.message : String(error);
      process.stderr.write(
        `tabbied-mcp: could not read the local catalog (${reason}); ` +
          `falling back to ${SITE}/catalog.json\n`
      );
    }
  }

  try {
    return (await (await get(`${SITE}/catalog.json`)).json()) as Catalog;
  } catch (error) {
    throw new Error(
      `no local catalog, and ${error instanceof Error ? error.message : String(error)}. ` +
        'Install the `tabbied` package (npm i tabbied) or restore network access.'
    );
  }
}

/**
 * Preview bytes for one design: the committed @2x renders the site serves, so
 * the agent sees the same image a human browsing the gallery does.
 */
export async function fetchPreview(
  design: CatalogDesign
): Promise<{ data: string; mimeType: string }> {
  const response = await get(design.preview);
  const buffer = Buffer.from(await response.arrayBuffer());
  return {
    data: buffer.toString('base64'),
    mimeType: response.headers.get('Content-Type') ?? 'image/webp',
  };
}

/**
 * The full reference. The package's own llms.txt is the *full* text (in
 * node_modules depth beats brevity), so this works offline too.
 */
export async function fetchDocs(): Promise<string> {
  const root = tabbiedRoot();
  if (root) {
    try {
      return await readFile(path.join(root, 'llms.txt'), 'utf-8');
    } catch {
      // fall through to the network copy
    }
  }

  return await (await get(`${SITE}/llms-full.txt`)).text();
}

/**
 * The editable-template index and one site's spec. Network only, deliberately:
 * they are *site* artifacts generated from the static export
 * (docs/editable-templates.md), and the `tabbied` package does not contain them.
 */
export async function fetchTemplateCatalog(): Promise<TemplateCatalog> {
  return (await (await get(`${SITE}/editable-catalog.json`)).json()) as TemplateCatalog;
}

export async function fetchTemplate(slug: string): Promise<TemplateSpec> {
  return (await (await get(`${SITE}/editable/${encodeURIComponent(slug)}.json`)).json()) as TemplateSpec;
}
