# Would vinext make the build faster?

The question was whether moving the site from `next build` to
[vinext](https://github.com/cloudflare/vinext) (Cloudflare's reimplementation
of the Next.js API surface on Vite) would cut the build time. It was tried on
2026-10-17 against commit `777b64d`, in a throwaway worktree, and measured
beside the current build on the same machine.

**No.** On this repository vinext is slower: about 79s for a build pass where
`next build` takes about 51s cold and 28s with its cache, and the whole
`npm run build` goes from about 158s to about 244s. It also needs changes
before its output matches what the site ships today, listed below. Nothing was
changed in the repository.

## Setup

- A 4-core cloud container with 15 GB of memory, Node 22.22.
- Next.js 16.3.8 (Turbopack), TypeScript 7.0.2, as checked in.
- vinext 1.2.1 (the latest on npm on the day), Vite 8.3.4,
  `@vitejs/plugin-rsc` 0.5.38, `@vitejs/plugin-react` 6.1.2,
  `react-server-dom-webpack` 19.3.1, with React and React DOM raised to
  19.3.1 (vinext's peer range).
- `next.config.mjs` unchanged: vinext reads it, `output: 'export'` and
  `trailingSlash: true` included.
- Each pass was timed from a clean output folder. "Cold" means no `.next`
  folder; "warm" means `.next/cache` was left from the previous build.

`vinext check` reported the app 94% compatible: `next/link`,
`next/navigation`, `next/dynamic` and `next/font/google` supported, `images`
and `reactStrictMode` partial (strict mode is not applied to App Router
pages), and better-auth, lucide-react and zod compatible.

## Measurements

One framework pass (the export of 1,181 pages, before the template downloads
exist):

| Run | Next.js | vinext |
|---|---|---|
| Cold, each run | 59.4s, 50.4s, 52.7s | 78.2s, 78.6s, 79.5s with Lightning CSS |
| Cold, Vite's default CSS (PostCSS) | | 91.2s, 93.0s, 93.6s, 94.4s |
| Warm (`.next/cache` kept) | 28.4s | no equivalent cache |
| Second pass of `npm run build`, with `public/downloads` | 30.2s | 88.8s (Lightning CSS), 105.3s (PostCSS) |

The whole build, phase by phase (Next.js from a cold `.next`, vinext with
Lightning CSS):

| Phase | Next.js | vinext |
|---|---|---|
| prebuild (packages, llms, images, checks, share cards) | 42.9s | same steps, 42.9s |
| type check | inside `next build` | 6.4s (`tsc --noEmit`, run separately) |
| first build pass | 59.4s | 78.6s |
| `editable` | 1.8s | 2.0s |
| `templates` | 23.4s | 25.2s (5 sites failed, below) |
| `preview:runtime` | 0.4s | 0.4s |
| second build pass | 30.2s | 88.8s |
| **total** | **158.1s** | **244.3s** |

The vinext column takes the prebuild time from the Next.js run, since the
steps are the same scripts.

## Where the time goes

Next.js, cold: 21-26s compiling, 8-10s type checking, 14-15s prerendering.
Warm, the compile drops to about 2s and the type check to under 2s, which is
why the second pass of `npm run build` costs 30s.

vinext, with Lightning CSS:

| Step | Time |
|---|---|
| Analyze client references (a full scan of the server-component graph) | about 19s |
| Analyze server references | about 1.5s |
| Server-component (RSC) build | about 22s (35s with PostCSS) |
| Client build | about 5s |
| SSR build | about 2.5s |
| Prerendering 1,177 routes | about 14s |
| "CDN warmup" path discovery | about 10s |
| Route report | about 2s |

- **Compiling is the difference.** About 51s against Turbopack's 21-26s cold.
  Vite's own timing report says 91-98% of each environment build was spent in
  JavaScript plugin callbacks, not in Rolldown: `vite:css` (391 CSS Modules,
  14s with PostCSS), vinext's `config` load hook (6s), its
  `optimize-imports` transform (6s) and `rsc:importer-resources` (2s).
  Switching Vite to Lightning CSS (`css: { transformer: 'lightningcss' }`)
  was the one tuning that helped, saving about 14s.
- **There is no build cache.** Turbopack's persistent cache makes the second
  pass of `npm run build` compile in 2s; Vite has nothing equivalent, so vinext
  pays the whole compile on both passes. Workers Builds also caches
  `.next/cache` (234 MB here) when build caching is turned on for the project,
  so the first pass on a deploy can be warm too.
- **Prerendering is a wash.** Both prerender 1,177 pages in about 14s on three
  workers.
- **The warmup discovery is waste for an export.** After prerendering, vinext
  1.2.1 starts a second production server and lists every route as a "CDN
  warmup path" (`emitPrerenderPathManifest` in `build/lifecycle.js`). A static
  export never reads that manifest, and there is no option or environment
  variable to skip it.

Even without the warmup step and with Lightning CSS, a vinext pass is about
68s, slower than a cold `next build` with its type check included.

## What it took to build, and what still differs

To get a build at all:

- **`wrangler.jsonc` had to be moved aside.** vinext refuses to build when it
  finds a Wrangler config without `@cloudflare/vite-plugin` in the Vite config,
  even with `output: 'export'`. It expects to own the Worker, which does not fit
  this repository's shape (a static export served by Workers static assets,
  with a separate Hono Worker for the `run_worker_first` routes).
- **The root `package.json` needs `"type": "module"`.** Without it the
  server-component entry is written as `dist/server/index.mjs` and the prerender
  server, which looks for `index.js`, stops with "No build output found".
- **npm could not add the packages normally.** Both `npm install <pkg>` and a
  plain `npm install` after editing `package.json` crashed in npm 10.9.4's
  arborist ("Cannot read properties of null (reading 'edgesOut')");
  `--legacy-peer-deps` worked.

Differences in the output (`dist/client/`, symlinked to `out/` so the
packaging scripts could read it):

- **Three files are missing:** `robots.txt` and `sitemap.xml` (from
  `app/robots.ts` and `app/sitemap.ts`) and `studio-index.json` (the route
  handler in `app/studio-index.json/route.ts`). vinext's export skips route
  handlers and emitted neither metadata route. The Worker reads
  `studio-index.json` through `env.ASSETS` for Studio matching, and
  `generate-editable.mjs` warns that catalog entries will carry no topic
  without it.
- **Five template downloads fail.** The packager wrote 372 of 377 sites. The
  five on the shared `TemplateSite` component (ember-and-oak, facet, nocturne,
  solstice, verdant) fail with "no CSS module on the page". The other HTML
  packages came out 2-3 KB larger than from the Next.js export; they were not
  pixel-diffed.
- **No type check.** `vite build` does not run TypeScript, so the build would
  need its own `tsc` step (6.4s), as in the table above.
- **Not checked:** the e2e suite, the Worker against the vinext output,
  client-side navigation, and the share cards and previews in a browser.

## One upside: fewer files

vinext writes one RSC payload per page (`index.txt`) where Next.js writes four
(`index.txt` plus three `__next.*.txt` segment files). The finished export was
14,986 files against Next.js's 18,675, about 3,500 fewer (the five failed
downloads account for about 125 of that). With about 1,400 files of headroom
left on Workers Free, that is the most useful thing the experiment found, but
it does not make up for a slower build and the breakage above.

## Reproducing it

In a copy of the repository, after `npm ci`:

```bash
# package.json: add "type": "module"; raise react and react-dom to ^19.3.1;
# add vinext 1.2.1 and react-server-dom-webpack ^19.3.1 to dependencies, and
# vite ^8.3.4, @vitejs/plugin-rsc ^0.5.38, @vitejs/plugin-react ^6.1.2 to
# devDependencies
npm install --legacy-peer-deps
npm run prebuild
mv wrangler.jsonc wrangler.jsonc.off
ln -s dist/client out
npx vite build
```

with this `vite.config.mts`:

```ts
import { defineConfig } from 'vite';
import vinext from 'vinext';

export default defineConfig({
  plugins: [vinext()],
  css: { transformer: 'lightningcss' },
});
```

Then `npm run editable`, `npm run templates -- --out-dir public/downloads`,
`npm run preview:runtime` and `npx vite build` again for the second pass.

## If it is worth another look

The numbers are for vinext 1.2.1 on this app: 419 page modules, 391 CSS
Modules and a large data graph (382 patterns, 377 template registries). It is
under active development, and three upstream changes would move the result:

- an option to skip CDN warmup discovery under `output: 'export'` (about 10s
  a pass);
- a persistent build cache, or a cheaper client-reference scan than a full
  RSC graph build (about 19s a pass);
- emitting route handlers and `robots`/`sitemap` metadata routes in export
  mode.

Even with all three, a vinext pass would need to beat Turbopack's warm 28s to
make the build faster, and the Wrangler config check would still need a way
round for a site whose Worker is not vinext's.

## Sources

- [cloudflare/vinext README](https://github.com/cloudflare/vinext)
- [vinext static export guide (Mintlify mirror)](https://mintlify.wiki/cloudflare/vinext/guides/static-export)
- [Workers Builds build caching](https://developers.cloudflare.com/workers/ci-cd/builds/build-caching)
