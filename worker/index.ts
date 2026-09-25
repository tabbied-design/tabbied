// The Cloudflare Worker that serves tabbied.com.
//
// Cloudflare serves out/ without invoking this code; only the prefixes in
// wrangler.jsonc's `run_worker_first` reach it:
//
//   /mcp        the remote MCP endpoint (see docs/mcp-server.md)
//   /api        the platform tier: auth, Studio, media, account, admin
//   /health     a liveness probe that doesn't depend on the asset pipeline
//   /downloads  template zips, gated on a session; the rest passes through
//
// Everything else falls through to `env.ASSETS`, which also serves the custom
// 404 page (`not_found_handling: "404-page"`).
//
// The MCP server reads the catalog, the previews, and the reference through
// the assets binding rather than bundling them, so the tools describe exactly
// the bytes this deployment serves. `createMcpHandler` is MCP v2's stateless
// entry point (one server per request, so no Durable Object); it comes from
// the SDK rather than `agents/mcp/server`, which would pull partyserver,
// esbuild and babel into the Worker.
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createMcpHandler } from '@modelcontextprotocol/server';
import { buildAuth, configuredAdmins, configuredProviders } from './auth';
import type { Env } from './env';
import { isDev } from './env';
import journal from './migrations/meta/_journal.json';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './db/schema';
import { requireUser } from './lib/session';
import { forgetDownload, logDownload, parseDownloadName, takesCopy } from './lib/downloads';
import { teamRecipients } from './lib/mail';
import { claimTemplate, limitMessage, mayTake, releaseTemplate, templateStatus } from './lib/templates';
import media from './routes/media';
import account from './routes/account';
import admin from './routes/admin';
import make from './routes/make';
import sites from './routes/sites';
import studio from './routes/studio';
import uploads from './routes/uploads';
import {
  buildServer,
  catalogTools,
  type Catalog,
  type CatalogDesign,
  type TemplateCatalog,
  type TemplateSpec,
} from 'tabbied-mcp';

export type { Env } from './env';

// Isolates are reused across requests, so a cold read of the catalog is paid
// once per isolate rather than once per request. Cached as the promise so
// concurrent first requests don't each start their own fetch.
let catalogPromise: Promise<Catalog> | null = null;
let docsPromise: Promise<string> | null = null;

function assetUrl(request: Request, path: string): string {
  return new URL(path, request.url).toString();
}

async function readAsset(
  env: Env,
  request: Request,
  path: string
): Promise<Response> {
  const response = await env.ASSETS.fetch(assetUrl(request, path));
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return response;
}

function loadCatalog(env: Env, request: Request): Promise<Catalog> {
  catalogPromise ??= readAsset(env, request, '/catalog.json')
    .then((response) => response.json() as Promise<Catalog>)
    // Don't cache a failure: a transient miss would otherwise poison the
    // isolate for as long as it lives.
    .catch((error) => {
      catalogPromise = null;
      throw error;
    });
  return catalogPromise;
}

function loadDocs(env: Env, request: Request): Promise<string> {
  docsPromise ??= readAsset(env, request, '/llms-full.txt')
    .then((response) => response.text())
    .catch((error) => {
      docsPromise = null;
      throw error;
    });
  return docsPromise;
}

// btoa needs a binary string, and spreading a 400 KB array into
// String.fromCharCode blows the argument limit - so build it in chunks.
function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

async function handleMcp(request: Request, env: Env): Promise<Response> {
  const catalog = await loadCatalog(env, request);

  const fetchPreview = async (design: CatalogDesign) => {
    // The catalog's `preview` is an absolute tabbied.com URL, but this Worker
    // may be answering on a *.workers.dev preview deployment; re-resolving the
    // path against the incoming request keeps it reading its own assets.
    const path = new URL(design.preview).pathname;
    const response = await readAsset(env, request, path);
    return {
      data: toBase64(await response.arrayBuffer()),
      mimeType: response.headers.get('Content-Type') ?? 'image/webp',
    };
  };

  // The template tools read the same generated artifacts the site serves.
  // Unlike the catalog these are not memoized per isolate: the per-slug specs
  // are many and each is read rarely, and the index is small.
  const fetchTemplateCatalog = async () =>
    (await readAsset(env, request, '/editable-catalog.json')).json() as
      Promise<TemplateCatalog>;

  const fetchTemplate = async (slug: string) =>
    (await readAsset(env, request, `/editable/${slug}.json`)).json() as
      Promise<TemplateSpec>;

  // No render_design: rendering a css-doodle pattern needs a real browser, and
  // a Worker has none. Agents that need a rendered asset use the local stdio
  // server (`npx tabbied-mcp`) or the `tabbied` CLI.
  const tools = catalogTools({
    catalog,
    fetchPreview,
    fetchDocs: () => loadDocs(env, request),
    fetchTemplateCatalog,
    fetchTemplate,
  });

  // A factory: the handler builds a server per request. `legacy: 'stateless'`
  // is the default, spelled out because it is load-bearing: it keeps 2025-era
  // clients, which still open with `initialize`, working.
  return createMcpHandler(() => buildServer(tools), {
    legacy: 'stateless',
  }).fetch(request);
}

const app = new Hono<{ Bindings: Env }>();

// Every method, because the SDK decides which ones it answers (its 405 is a
// correct MCP reply, a 404 from this router would not be). Both spellings are
// registered so a client that posts to `/mcp/` is not redirected either.
app.all('/mcp', (c) => handleMcp(c.req.raw, c.env));
app.all('/mcp/', (c) => handleMcp(c.req.raw, c.env));

/** Every message down the cause chain, so a wrapped D1 error still reads as one. */
function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;

  for (let depth = 0; current !== undefined && current !== null && depth < 5; depth++) {
    parts.push(current instanceof Error ? current.message : String(current));
    current = current instanceof Error ? current.cause : undefined;
  }

  return parts.join(' <- ');
}

/**
 * SQLite's wording when the code is ahead of the database: a table or column
 * that a migration would have created. Drizzle wraps the D1 error, so the
 * cause chain is what gets matched, not the outer message.
 */
const SCHEMA_BEHIND = /no such (table|column)/i;

/** The newest migration this build ships, from drizzle's own journal. */
const EXPECTED_MIGRATION = journal.entries.at(-1)?.tag ?? null;

/**
 * What the database has actually had applied, against what this build
 * expects. `d1_migrations` is wrangler's ledger (one row per applied file);
 * a database that has never been migrated has no such table, which reads
 * as "nothing applied" rather than as an error.
 */
async function schemaStatus(env: Env) {
  let applied: string | null = null;

  try {
    const row = await env.DB.prepare(
      'SELECT name FROM d1_migrations ORDER BY id DESC LIMIT 1'
    ).first<{ name: string }>();
    applied = row?.name.replace(/\.sql$/, '') ?? null;
  } catch {
    applied = null;
  }

  return { expected: EXPECTED_MIGRATION, applied, current: applied === EXPECTED_MIGRATION };
}

app.onError(async (error, c) => {
  const { pathname } = new URL(c.req.url);
  const detail = describeError(error);
  const ray = c.req.header('cf-ray') ?? null;

  // Say what failed, in the log (Cloudflare's observability keeps console
  // output). The ray id is echoed in the body so a report from a browser
  // console can be matched to that line.
  console.error(
    `${c.req.method} ${pathname}${ray ? ` [${ray}]` : ''}: ${
      error instanceof Error && error.stack ? error.stack : detail
    }`
  );

  // The catalog is an asset; if it can't be read, the deployment is broken
  // rather than the request. Say so in JSON-RPC terms so an MCP client
  // surfaces something better than an opaque 500.
  if (pathname === '/mcp' || pathname === '/mcp/') {
    return c.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32603,
          message: `MCP server unavailable: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      },
      503
    );
  }

  // A table or column the code expects and the database lacks is a deploy
  // that shipped without its migration, not a fault in the request, so it is
  // a 503 that says so (the fix is `npm run db:migrate:remote`).
  if (SCHEMA_BEHIND.test(detail)) {
    return c.json(
      {
        error: 'The database schema is behind this deployment. Apply the pending migrations.',
        ray,
      },
      503
    );
  }

  // The same diagnosis from the ledger, for a migration the regex cannot see
  // (one that relaxes a constraint fails as ordinary SQL). Only a ledger that
  // exists and disagrees counts: with no `d1_migrations` at all, every
  // unrelated 500 in an environment that provisions its tables directly would
  // be relabeled.
  const schema = await schemaStatus(c.env);

  if (schema.expected && schema.applied && schema.applied !== schema.expected) {
    return c.json(
      {
        error: 'The database schema is behind this deployment. Apply the pending migrations.',
        ray,
        schema,
      },
      503
    );
  }

  return c.json({ error: 'Internal error', ray }, 500);
});

app.get('/health', (c) => c.text('ok'));

// ---- template downloads --------------------------------------------------
// Taking a zip is a signed-in act that chooses the template; one not yet
// chosen is refused once the allowance is used (worker/lib/templates.ts).
// Everything else under the folder (the packaged pages the previews read)
// passes to the binding.
//
// A navigation (a click on a download link) is redirected where the answer
// is, to sign in or to the account page; a fetch (the customizer building a
// customized zip) gets JSON and a status it can put in a toast.

const isNavigation = (request: Request): boolean => {
  const mode = request.headers.get('sec-fetch-mode');

  if (mode) return mode === 'navigate';

  return (request.headers.get('accept') ?? '').includes('text/html');
};

/** Where to come back to after signing in: the page the link was on, if it was ours. */
const backTo = (request: Request): string => {
  const referer = request.headers.get('referer');

  if (!referer) return '/templates/';

  try {
    const url = new URL(referer);

    return url.origin === new URL(request.url).origin ? `${url.pathname}${url.search}` : '/templates/';
  } catch {
    return '/templates/';
  }
};

app.get('/downloads/:file', async (c, next) => {
  const named = parseDownloadName(c.req.param('file'));

  if (!named) return next();

  const request = c.req.raw;
  const userId = await requireUser(c.env, request.headers);

  if (!userId) {
    if (isNavigation(request)) {
      return c.redirect(`/sign-in/?next=${encodeURIComponent(backTo(request))}`, 302);
    }

    return c.json({ error: 'Sign in to download a template.' }, 401);
  }

  const db = drizzle(c.env.DB, { schema });
  const counts = takesCopy(request);

  // A request that takes a copy claims the template in the statement that
  // checks the allowance (`claimTemplate`). A HEAD or a resumed range is
  // answered by the same rule but writes nothing.
  const claim = counts ? await claimTemplate(db, userId, named.slug) : null;
  const allowed = claim ? claim.ok : await mayTake(db, userId, named.slug);

  if (!allowed) {
    if (isNavigation(request)) {
      return c.redirect('/account/?templates=full', 302);
    }

    const status = await templateStatus(db, userId);

    return c.json({ error: limitMessage(status.total), used: status.used, total: status.total }, 403);
  }

  const logged = counts ? await logDownload(db, userId, named.slug, named.format) : null;
  const newChoice = claim?.ok ? claim.id : null;

  // A choice made and a row logged by this request are undone when no bytes
  // go out, so both only ever record zips that were served.
  const giveBack = async () => {
    if (logged) await forgetDownload(db, logged);
    if (newChoice) await releaseTemplate(db, newChoice);
  };

  let zip: Response;

  try {
    zip = await c.env.ASSETS.fetch(request);
  } catch (error) {
    await giveBack();
    throw error;
  }

  // A 304 means the browser already holds the bytes, so the choice stands.
  if (!zip.ok && zip.status !== 304) await giveBack();

  return zip;
});

// ---- the platform tier ----------------------------------------------------
// Same-origin with the site in production, which is what makes the session
// cookie work with no CORS surface at all.
const api = new Hono<{ Bindings: Env }>();

// Dev only: `next dev` serves the site from :3000 and the Worker runs on
// :8787. Production ships no CORS headers; the absence is the security
// property, so this must stay behind the flag.
api.use('*', async (c, next) => {
  if (!isDev(c.env)) {
    return next();
  }

  // Any loopback origin, for the same reason trustedOrigins in auth.ts takes any.
  return cors({
    origin: (origin) =>
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ? origin : '',
    credentials: true,
    allowHeaders: ['content-type'],
  })(c, next);
});

// Liveness for the API tier, plus deploy-time facts nothing else reports:
//
//   schema       `degraded`, with `applied` behind `expected`, means a
//                migration never reached this database (routes answer 503).
//   adminEmails  a count, never the addresses. Zero with the variable set on
//                the Worker means it is misspelled, on another environment, or
//                a Text variable that `wrangler deploy` replaced (use a Secret).
//   mail         whether RESEND_API_KEY is set (unset in production, sign-up
//                throws) and how many inboxes hear about "Request more".
api.get('/health', async (c) => {
  const schema = await schemaStatus(c.env);

  return c.json({
    status: schema.current ? 'ok' : 'degraded',
    service: 'tabbied-api',
    version: 1,
    schema,
    adminEmails: configuredAdmins(c.env).length,
    mail: {
      provider: c.env.RESEND_API_KEY ? 'resend' : isDev(c.env) ? 'dev-mail' : 'none',
      teamInboxes: teamRecipients(c.env).length,
    },
  });
});

// Which social providers the sign-in form may offer, so it never draws a
// button that 500s on click. Outside better-auth's prefix, which has no
// equivalent.
api.get('/auth-providers', (c) => c.json({ providers: configuredProviders(c.env) }));

// better-auth owns everything under this prefix and gets the raw Request, so
// its cookie and redirect handling are untouched. `all`, because it answers
// GET, POST and the dev CORS preflight, and 404s anything it does not own.
api.all('/auth/*', async (c) => {
  if (!c.env.BETTER_AUTH_SECRET) {
    // Unconfigured is a 503, not a 500: the site is fine, this tier is not up.
    return c.json({ error: 'Authentication is not configured.' }, 503);
  }

  return buildAuth(c.env).handler(c.req.raw);
});

// Before the wider /studio prefix only for legibility; they do not overlap.
api.route('/studio/make', make);
api.route('/studio/sites', sites);
api.route('/studio', studio);
api.route('/media', media);
api.route('/uploads', uploads);
api.route('/account', account);
api.route('/admin', admin);

// A miss under /api is JSON, never the site's 404 page. `all('*')`, not
// `notFound()`: a sub-app's notFound handler is not used once it is mounted
// with `route()`, so the request would fall through to the assets.
api.all('*', (c) => c.json({ error: 'Not found' }, 404));

app.route('/api', api);

// Anything else that reaches the Worker (the packaged pages under /downloads,
// a miss under a routed prefix) is the binding's to answer.
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
