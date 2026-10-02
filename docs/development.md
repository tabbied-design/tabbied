# Developing Tabbied

The setup, testing and deployment notes that used to live in the main
README. For the long-form reasoning behind how things are built, see
[`CLAUDE.md`](../CLAUDE.md) and the other files in this folder.

## What's in this repo

Tabbied is an [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) monorepo:

- **The website** (repo root): the [Next.js](https://nextjs.org/) app behind
  [tabbied.com](https://tabbied.com), where you browse, customize, reseed and
  export the designs. It ships as a static export served by
  [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/),
  with a Worker in [`worker/`](../worker) for the API, accounts and the MCP
  endpoint.
- **The [`tabbied`](../packages/tabbied) package**: the generative engine as a
  published, framework-agnostic library with an optional React component. The
  site renders every design through this package, so it doubles as the
  package's integration test.
- **The [`tabbied-mcp`](../packages/tabbied-mcp) package**: an
  [MCP](https://modelcontextprotocol.io) server over the design catalog. The
  same code serves the site's `/mcp` endpoint and a local `tabbied-mcp` bin.
- **The [`tabbied-templates`](../packages/tabbied-templates) package**: the
  editable-section spec for the website templates and the engine that applies
  edits to them.

## Using the `tabbied` package

```bash
npm install tabbied
```

```tsx
import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Example() {
  return (
    <TabbiedPattern pattern={radius} fit="cover" style={{ width: '100%', height: 320 }} />
  );
}
```

Presets are imported individually, so your bundle only includes the designs
you actually use. See the [package README](../packages/tabbied/README.md) for
the full API, the framework-agnostic core, and exporting to PNG and SVG.

## Using Tabbied with an AI coding assistant

The hard part for an assistant is not the API but picking one of the 338
designs, since the slugs (`cleat`, `gnomonwedge`, `karst`) say nothing about
what they draw.

**The best answer is the MCP server**, because it lets the assistant *look* at
the designs before choosing rather than guessing from a name. Nothing to
install:

```bash
claude mcp add --transport http tabbied https://tabbied.com/mcp
```

It exposes `search_designs` (filter by motif, mood, density, intended use),
`preview_design` (the rendered image for up to six candidates), `get_design`,
`get_docs`, and `list_templates` and `get_template` for the website
templates. Running it locally adds `render_design`, which writes real SVG and
PNG files; it needs Playwright beside the server, so start it as
`npx -y -p tabbied-mcp -p playwright tabbied-mcp` (and run
`npx playwright install chromium` once). See
[`mcp-server.md`](./mcp-server.md) and the
[package README](../packages/tabbied-mcp/README.md).

For assistants without MCP, the same catalog is three static files:

| File | For |
| --- | --- |
| [`/llms.txt`](https://tabbied.com/llms.txt) | The [llms.txt](https://llmstxt.org/) index: a short pointer to everything below. |
| [`/llms-full.txt`](https://tabbied.com/llms-full.txt) | The full API contract and a one-line entry for every design. |
| [`/catalog.json`](https://tabbied.com/catalog.json) | Structured per-design data: palette, options and accepted values, default fit, SVG-export support. Also shipped in the package as `tabbied/catalog.json`. |

All three are generated at build time from the same `patterns/*.json` the
package is built from ([`scripts/generate-llms.mjs`](../scripts/generate-llms.mjs)),
so they can't drift from what's published, and the MCP server reads those same
files rather than a copy of its own.

## Running it locally

```bash
# Clone the repository
git clone https://github.com/tabbied-design/tabbied.git
cd tabbied

# Install dependencies
npm install

# Run the site (builds the workspace packages first, then starts Next.js)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.
Accounts, template downloads and the customizer talk to the Worker, so run
`npm run dev:api` beside it (and `npm run db:migrate` once) when you need
those; `.dev.vars.example` documents the local secrets.

The designs live as JSON in
[`packages/tabbied/patterns/`](../packages/tabbied/patterns). The package's
codegen turns them into a typed module that both the site and the published
package consume, so adding a new design is just a new JSON file (plus its
preview and metadata; see `CLAUDE.md`).

## Testing

End-to-end tests run with [Playwright](https://playwright.dev/) against a
production build:

```bash
# Install the browser once
npx playwright install chromium

# Build and run the e2e tests
npm run build
npm run test:e2e
```

Unit tests for the packages run under `node --test`, and the Worker has its
own suite (run it after a build):

```bash
npm test --workspace tabbied
npm test --workspace tabbied-mcp
npm run test:worker
```

Everything written in the repo is plain ASCII; `npm run check:typography`
checks it, and CI runs it first.

## Deploying

The site is a static export hosted on
[Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/),
configured in [`wrangler.jsonc`](../wrangler.jsonc). Everything in `out/` is
served straight off Cloudflare's network; [`worker/index.ts`](../worker/index.ts)
runs only for the paths `run_worker_first` names: `/mcp`, `/health`, `/api`,
the template downloads (it gates the zips, and refuses the React package's
unzipped source), and the live template pages (it adds their license
notice).

```bash
# Run the real Worker over a build, including the MCP endpoint
npm run build
npm run preview

# Build, apply database migrations, and ship
npm run deploy
```

On Workers Builds, set the build command to `npm run build`, and make sure
the deploy applies `worker/migrations` (`npx wrangler d1 migrations apply
tabbied --remote`) before `npx wrangler deploy`. Response headers live in
[`public/_headers`](../public/_headers): a static export has no server to
attach them to, so `headers()` in `next.config.mjs` would be inert.

Publishing the npm packages is covered in [`RELEASING.md`](../RELEASING.md).

## The README images

The pictures in the main README live in [`readme/`](./readme). They are
screenshots of tabbied.com plus collages of the committed pattern previews
(`public/previews/`) and template shots (`public/template-shots/`). Retake
them when the homepage, the editor or the lead templates change enough that
the README no longer shows the site as it is.
