# tabbied - notes for AI agents

You are probably here to put a generative pattern on a page, export one as an
asset, or animate one. Everything you need is in two files that ship with
this package:

- **`llms.txt`** (this directory) - the complete reference: every entry
  point below, sizing gotchas that compile but render wrong, integration
  recipes (hero background, video frames, static HTML), the share-link URL
  scheme, and a one-line entry for every design.
- **`catalog.json`** (this directory, also `import from 'tabbied/catalog.json'`)
  is every design as data: description, closed-vocabulary `tags` / `mood` /
  `density` / `goodFor` for filtering, palette, options, SVG-export support,
  and a stable `preview` image URL. Its `usage` has a ready-to-paste snippet
  for each setup below, written for one example design.

**If your harness speaks MCP, connect to the server instead of reading any of
this**: `https://tabbied.com/mcp` (nothing to install) or
`npx -y -p tabbied-mcp -p playwright tabbied-mcp` (local, and adds a
`render_design` tool; run `npx playwright install chromium` once). It wraps the
same catalog in `search_designs` / `preview_design` / `get_design` /
`get_docs`, plus `list_templates` / `get_template` for the website templates.
`preview_design` returns the actual images, which is the difference between
choosing a design and guessing one, and `get_design` writes the code for
whichever setup the project uses (`framework`: `react`, `vue`, `svelte`,
`element`, `html` or `core`).

## Entry points

Use the one that matches the project; React is one setup of six, not the
default.

| Import | Provides |
| --- | --- |
| `tabbied` | Framework-agnostic core: `createPattern`, `hydratePatterns`, `resolveBoxStyle`, sizing/seed helpers, types. |
| `tabbied/react` | The `TabbiedPattern` component and its handle/prop types. |
| `tabbied/vue` | The `TabbiedPattern` Vue 3 component (Nuxt included). |
| `tabbied/svelte` | The `tabbied` action, `tabbiedAttributes` for a SvelteKit server render, `patternController`. |
| `tabbied/element` | The `<tabbied-pattern>` custom element, `definePatterns`, `setPatternsBase`. CDN file: `dist/element/tabbied-element.js` (copy the whole `dist/element/` folder to self-host). |
| `tabbied/element/react-jsx` | Types only: `<tabbied-pattern>` in React's JSX for a TypeScript app. |
| `tabbied/patterns` | The presets. Import individually; the `patterns` record holds every design. |
| `tabbied/patterns/<slug>` | One design as a default export, no imports. |
| `tabbied/snippets` | `buildSnippet(setup, input)`: the code for one design in any of the six setups, as the editor and the MCP server write it. |
| `tabbied/svg-export` | `doodleToSvg`, the vector converter, for use on a doodle you manage. |
| `tabbied/catalog.json` | The catalog as data. |

With no build step, a page needs no install at all: data attributes plus
`hydratePatterns()` from esm.sh, or the web component from a CDN, both
pinned to a version (`tabbied@<version>`).

## Before writing any code

1. **Designs are picked by slug, and slugs are opaque** (`cleat`, `karst`).
   Query the catalog on its enum fields, then - if you can read images -
   look at `https://tabbied.com/previews/<slug>.webp` for your shortlist
   before committing. The preview is ground truth.
2. **A pattern has no intrinsic size.** It fills its parent; in a parent that
   sizes to content it collapses to nothing. Pass `height` or `aspectRatio`
   when in doubt (`aspect-ratio` in Vue and on the element, an inline style
   in plain HTML). This is the number-one integration mistake.
3. **You can render without an app**: `npx tabbied render <slug> --out out.svg`
   (or `.png`, or `--frames N` for a video-ready PNG sequence). It needs
   Playwright where it runs (`npm i -D playwright && npx playwright install
   chromium`), or run it as `npx -y -p tabbied -p playwright tabbied render
   ...`. `npx tabbied list --tag dots` queries the catalog from the shell.

The same docs are served at https://tabbied.com/llms.txt (index) and
https://tabbied.com/llms-full.txt (full reference); the setup guides for
people are at https://tabbied.com/docs/.
