// The Cloudflare Worker that serves tabbied.com.
//
// It is almost entirely a static-asset server: `next build` writes the whole
// site into out/, wrangler uploads it, and Cloudflare serves matching paths
// without ever invoking this code. Only three prefixes reach the Worker:
//
//   /mcp     the remote MCP endpoint (see docs/mcp-server.md)
//   /api     the platform tier: accounts, projects, AI tasks
//   /health  a liveness probe that doesn't depend on the asset pipeline
//
// and everything else falls through to `env.ASSETS`, which is also how the
// custom 404 page is served (`not_found_handling: "404-page"`).
//
// Routing is Hono's rather than a chain of `if (pathname === ...)`. That was the
// right shape for two routes and the wrong one for twenty: the platform work
// (see agent-outputs/20260827-studio-ai-plan.md) adds an authenticated API whose
// session extraction, rate limiting, and error shaping all want one place to
// live. Nothing about the two existing endpoints changes - same handlers, same
// statelessness, same fallthrough.
//
// The MCP server reads the catalog, the previews, and the reference *through
// the assets binding* rather than bundling them. That is deliberate: the tools
// then describe exactly the bytes this deployment serves, so a design added in
// the same commit can't be missing from the catalog the agent queries, and a
// 384 KB JSON file stays out of the Worker bundle.
//
// `createMcpHandler` is MCP v2's stateless entry point: it builds one server
// per request, which is exactly what the 2026-07-28 revision made possible by
// dropping the initialize/initialized handshake and the session id. That is
// why this endpoint needs no Durable Object - the protocol no longer needs one
// to be spoken. The same function is re-exported by `agents/mcp/server`; taking
// it from the SDK avoids pulling partyserver, esbuild, and babel into a Worker
// that wants none of them.
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
import {
  claimDownload,
  downloadStatus,
  downloadedThisMonth,
  parseDownloadName,
  releaseDownload,
  takesCopy,
} from './lib/downloads';
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

  // The template tools read the same generated artifacts the site serves, so
  // an agent and the web builder see one set of bytes - and a template
  // annotated in this commit cannot be missing from the index an agent
  // queries. Unlike the catalog these are not worth memoizing per isolate: the
  // per-slug specs are many and each is read rarely, and the index is small.
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

  // A factory, per the stateless model - the handler builds a server per
  // request. `legacy: 'stateless'` (the default, spelled out here because it is
  // load-bearing) keeps 2025-era clients working: they still open with
  // `initialize`, and every shipping client does so today.
  return createMcpHandler(() => buildServer(tools), {
    legacy: 'stateless',
  }).fetch(request);
}

const app = new Hono<{ Bindings: Env }>();

// Every method, because the transport uses more than POST and the SDK is what
// decides which ones it answers - a 405 from the SDK is a correct MCP reply,
// whereas a 404 from this router would not be. Both spellings are registered
// because `run_worker_first` hands us the unslashed form and a client that
// posts to `/mcp/` must not be redirected (see wrangler.jsonc).
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

  // Say what failed, in the log. Cloudflare's observability keeps console
  // output, and a 500 that names nothing gets diagnosed by reading every
  // handler on the path instead of one line. The ray id is echoed in the
  // body so a report from a browser console can be matched to that line.
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
  // that shipped without its migration, not a fault in the request. It is
  // answered as a 503 that says so: the fix is `npm run db:migrate:remote`,
  // and until it runs this route is down rather than mysteriously broken.
  // (This is what "Make this one" looked like from the outside when
  // migration 0003 had never been applied to production: every route that
  // touched `site` answered "Internal error", and the working routes around
  // it made the failure look like the model call.)
  if (SCHEMA_BEHIND.test(detail)) {
    return c.json(
      {
        error: 'The database schema is behind this deployment. Apply the pending migrations.',
        ray,
      },
      503
    );
  }

  // The same diagnosis, reached the other way. `no such table|column` only
  // catches a migration that would have *added* something; one that relaxes a
  // constraint is invisible to it, and fails as ordinary SQL. 0005 is exactly
  // that shape - it made `site.generation_id` and `direction_index` nullable so
  // a site could start from a template - so with 0005 unapplied, `POST
  // /api/studio/sites {slug}` raises `NOT NULL constraint failed` and answered
  // "Internal error" while every generation-backed route around it worked.
  //
  // So when the ledger says the database is behind this build, say that instead
  // of guessing from the wording. Only a ledger that exists and disagrees
  // counts: a database with no `d1_migrations` at all is the case the regex
  // above already catches, and treating "no ledger" as behind would relabel
  // every unrelated 500 in an environment that provisions its tables directly.
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
// The zips are static assets, and `run_worker_first` sends /downloads/*
// here so that taking one is a signed-in act counted against the month's
// cap (worker/lib/downloads.ts). Everything else under the folder (the
// packaged pages the customizer and the previews read) passes straight to
// the assets binding.
//
// Two kinds of caller, told apart by the fetch metadata a browser sends: a
// navigation (a click on a download link) is sent where the answer is, to
// sign in or to the account page that says the cap is spent; a fetch (the
// customizer building a customized zip from the packaged one) gets JSON and
// a status it can put in a toast.

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

  // A request that takes a copy claims its row in the same statement that
  // checks the cap (see `claimDownload`), so concurrent requests cannot all
  // slip under it. A HEAD or a resumed range is answered by the same gate
  // but writes nothing. A template already among the month's is free to
  // take again, in either format: the cap counts templates, not zips.
  const claimed = counts ? await claimDownload(db, userId, named.slug, named.format) : null;
  const allowed = counts
    ? claimed !== null
    : (await downloadStatus(db, userId)).ok || (await downloadedThisMonth(db, userId, named.slug));

  if (!allowed) {
    if (isNavigation(request)) {
      return c.redirect('/account/?downloads=capped', 302);
    }

    const status = await downloadStatus(db, userId);

    return c.json(
      {
        error: `You have used all ${status.cap} template downloads for this month. The count starts over on ${status.resetsAt.toISOString().slice(0, 10)}.`,
        used: status.used,
        cap: status.cap,
        resetsAt: status.resetsAt,
      },
      429
    );
  }

  // A zip the packager never wrote is a 404 that costs nothing: the claim is
  // given back, so a row is only ever kept for bytes that went out.
  let zip: Response;

  try {
    zip = await c.env.ASSETS.fetch(request);
  } catch (error) {
    if (claimed) await releaseDownload(db, claimed);
    throw error;
  }

  if (claimed && !zip.ok) {
    await releaseDownload(db, claimed);
  }

  return zip;
});

// ---- the platform tier ----------------------------------------------------
// Identity, Studio's generation endpoints, and R2 media. Everything here is
// same-origin with the site in production, which is the property that makes the
// session cookie work with no CORS surface at all.
const api = new Hono<{ Bindings: Env }>();

// Dev only, and narrowly: `next dev` serves the site from :3000 while the
// Worker runs on :8787, so the daily loop is cross-origin even though
// production never is. Production ships no CORS headers - the absence is the
// security property, so this must stay behind the flag.
api.use('*', async (c, next) => {
  if (!isDev(c.env)) {
    return next();
  }

  // Any loopback origin, for the same reason trustedOrigins in auth.ts takes
  // any: the site is :3000, the Worker :8787, `npm run preview` picks its own
  // and a test harness another, and a list of two ports refused the rest.
  return cors({
    origin: (origin) =>
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ? origin : '',
    credentials: true,
    allowHeaders: ['content-type'],
  })(c, next);
});

// Liveness for the API tier, plus the two deploy-time facts nothing else
// reports: whether the database has had this build's migrations applied, and
// how many addresses ADMIN_EMAILS names. `degraded` here, with
// `schema.applied` behind `schema.expected`, is the whole diagnosis of a
// Studio that answers 503 on every site route.
//
// `adminEmails` is a count and never the addresses - the setting is a secret,
// and the count is the only part of it that is a fact about the deployment.
// Zero here, with the variable visibly set on the Worker, is the whole
// diagnosis of an admin-by-configuration that never happens: the name is
// misspelled, it was added to another Worker or environment, or it was added
// as a plain-text variable, which `wrangler deploy` replaces with this repo's
// own `vars` block on the next deploy (a Secret survives that; a Text variable
// does not). Without this the only way to tell a deploy that has the setting
// from one that silently lost it is to sign in and see whether anything
// happened.
api.get('/health', async (c) => {
  const schema = await schemaStatus(c.env);

  return c.json({
    status: schema.current ? 'ok' : 'degraded',
    service: 'tabbied-api',
    version: 1,
    schema,
    adminEmails: configuredAdmins(c.env).length,
  });
});

// Which social providers the sign-in form may offer. Public and cheap: it
// reads the environment and touches nothing. Deliberately outside better-auth's
// own prefix, which has no equivalent - a button for an unconfigured provider
// would otherwise be one that 500s on click.
api.get('/auth-providers', (c) => c.json({ providers: configuredProviders(c.env) }));

// better-auth owns everything under this prefix: sign-up, sign-in, callbacks,
// verification, session. Handing it the raw Request keeps us out of the way of
// its cookie and redirect handling.
// `all` rather than an explicit method list: better-auth answers GET, POST and
// the OPTIONS preflight the dev-only CORS layer above generates, and it returns
// its own 404 for anything it does not own.
api.all('/auth/*', async (c) => {
  if (!c.env.BETTER_AUTH_SECRET) {
    // Unconfigured is a 503, not a 500: the site is fine, this tier is not up.
    return c.json({ error: 'Authentication is not configured.' }, 503);
  }

  return buildAuth(c.env).handler(c.req.raw);
});

// Before the wider /studio prefix only for legibility - the two do not
// overlap, since studio.ts registers nothing under /sites.
api.route('/studio/make', make);
api.route('/studio/sites', sites);
api.route('/studio', studio);
api.route('/media', media);
api.route('/uploads', uploads);
api.route('/account', account);
api.route('/admin', admin);

// A miss under /api is JSON, never the site's 404 page. This is `all('*')`
// rather than `notFound()` because a sub-app's notFound handler is not used
// once it is mounted with `route()` - the request would fall through to the
// asset handler below and answer an API client with HTML.
api.all('*', (c) => c.json({ error: 'Not found' }, 404));

app.route('/api', api);

// Anything that is not one of ours is an asset. This is the common path by a
// wide margin - Cloudflare only routes the prefixes in `run_worker_first` here
// at all, and everything else that reaches us is a miss the asset router
// answers with out/404.html.
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
