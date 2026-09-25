# CLAUDE.md

Guidance for coding agents working in this repository.

## Repo layout & commands

Tabbied: generative patterns built on css-doodle. npm workspaces - the
Next.js site at the root consumes the `tabbied` package in
`packages/tabbied/` (framework-free core + React wrapper + 338 pattern
presets as JSON in `packages/tabbied/patterns/`, embedded by codegen), the
`tabbied-mcp` package in `packages/tabbied-mcp/` (the MCP server, shared by
the site's `/mcp` endpoint and a `tabbied-mcp` stdio bin), and
`tabbied-templates` in `packages/tabbied-templates/` (the editable-section
spec and its apply engine - see below).

```bash
npm run dev                          # site (predev builds both packages)
npm run build:packages               # codegen + tsc for tabbied, then tabbied-mcp
npm test --workspace tabbied         # package unit tests (node --test)
npm test --workspace tabbied-mcp     # MCP toolset + both protocol eras
npm run build && npm run test:e2e    # static export + Playwright suite
npm run preview                      # run the real Worker over out/ (wrangler dev)
npm run deploy                       # build, then wrangler deploy
npm run typecheck:worker             # worker/ is excluded from the site tsconfig
npm run dev:api                      # the Worker on :8787 (the API half of `npm run dev`)
npm run db:migrate                   # apply worker/migrations to the local D1
npm run db:generate                  # re-emit them from worker/db/schema.ts
npm run stub:ai                      # a local OpenAI-shaped upstream on :8788
npm run test:worker                  # Worker unit tests (local D1/KV/R2, stub upstream)
npm run llms                         # regenerate public/llms*.txt + catalog
npm run templates [slug]             # repackage template site(s) by hand
npm run editable [slug]              # derive editable specs from out/ (also the gate)
npm run preview:runtime              # bundle Studio's same-origin pattern runtime
npm run admin:grant -- <email>       # make the first admin (--remote for production)
npm run check:thumbnails             # gallery configs all name a real design
```

`galleryThumbnails.ts` is the one pattern-keyed file nothing regenerates -
its palettes and densities were tuned by eye. The gallery reads it as
`galleryThumbnails[item.slug]`, so a config whose slug names nothing is never
read and rots silently; 278 accumulated that way when the catalog moved from
`artworks/` to `patterns/`. `check:thumbnails` runs on `prebuild`/`predev` and
fails on one. A design with *no* entry is fine - it falls back to its own
palette and option defaults, which is how 19 of the catalog renders.

## Plain punctuation

Everything written in this repository uses ASCII punctuation: code comments,
docs, commit messages, UI copy, template copy, prompts, and this file. Not
used, anywhere: the em dash and en dash, curly quotes and apostrophes, the
ellipsis character, arrows, bullets, check marks, emoji, and the invisible
ones (no-break space, zero-width space). The HTML entities that render the
same glyphs (`&mdash;`, `&rsquo;`, `&hellip;`) count too: the rendered page
is where a reader meets them.

Why: they are the fingerprints of word processors and language models, and
mixed with the ASCII a keyboard produces they make a file read as written
by two hands. They also do not survive a terminal, a diff, or a `grep`
reliably, and a curly apostrophe inside a single-quoted string is a syntax
error waiting for its line to be copied.

What to write instead:

- A dash in a sentence is a comma, a colon, a period, or a pair of
  parentheses, chosen for the sentence. A spaced hyphen is the plain-text
  stand-in and is what the mechanical conversion on 2026-09-04 produced, so
  the existing ones are not a model for new writing.
- A range is a hyphen (`10-600`, `2024-2026`).
- Quotes and apostrophes are straight.
- An ellipsis is three periods.
- An arrow is "to", or `->` in a comment.
- A check mark or a warning is a word: "ok", "failed", "note".

A glyph that is part of a *design* (a CSS `content`, an icon, a musical
flat in a bell foundry's table, a timetable arrow) is written as an escape
or an entity: `'\2714'` in CSS, `'\u266D'` in a string, `&#x2726;` in JSX
text. The source stays ASCII and the choice is visible in review. Prose
never gets that exemption.

`npm run check:typography` scans every tracked text file and fails on the
first banned character, naming the file, line, column and code point. CI
runs it before anything else. Run it before committing.

## Hosting - Cloudflare Workers static assets

The site is a static export served by Workers static assets. `wrangler.jsonc`
points `assets.directory` at `out/`; Cloudflare serves anything that matches a
file there **without invoking the Worker**, so `worker/index.ts` runs for
the paths `run_worker_first` names (`/mcp`, `/health`, `/api`, and
`/downloads`, below) and hands everything else to `env.ASSETS`.

Three things that are explicit here and were implicit or automatic on Vercel:

- **`not_found_handling: "404-page"`.** Workers does not infer a custom 404
  from the presence of `out/404.html` the way Pages did. Without this line a
  miss returns a bare `404 Not Found` and `app/not-found.tsx` is never seen.
- **Headers live in `public/_headers`**, not in `next.config.mjs` (an export
  has no server to attach them to) and no longer in `vercel.json`. Next copies
  `public/` verbatim, so the file lands at `out/_headers` where wrangler reads
  it - and wrangler *consumes* it rather than serving it. `wrangler dev` prints
  `Parsed N valid header rules` on boot, which is the cheapest way to catch a
  typo. Limits: 100 rules, 2,000 characters per line.
- **`run_worker_first: ["/mcp", "/mcp/*", "/health", "/api", "/api/*"]`.**
  `/mcp` is not a file, so it would reach the Worker anyway - but only after
  the asset router looked at it, and with `trailingSlash: true` the default
  `html_handling` answers a POST to `/mcp` with a 308 to `/mcp/`. Redirecting
  an MCP client's POST breaks it. `/api` is listed for exactly the same reason
  and it is not optional: every POST to the platform tier would otherwise be
  answered with a redirect before the Worker saw it. **Any new non-asset route
  must join this list.** `/downloads/*` is the one asset folder on it: a
  template zip is a signed-in act that makes the template one of the
  person's five (see "Five templates per account" below), and the edge
  would otherwise hand it to anyone. The Worker gates `<slug>-<format>.zip` and passes everything else
  under the folder, the packaged pages the previews read, back to the binding.

**Redirects live in `public/_redirects`**, beside `_headers` and read the
same way. The template sites moved from `/template/<slug>/` to
`/templates/<slug>/site/` (one noun, one tree: the framed preview is
`/templates/<slug>/` and the site it frames is under it), and the old paths
301 there. A route under `run_worker_first` never reaches this file, so a
redirect for one of those belongs in the Worker.

The Worker routes with Hono (`worker/index.ts`). That was added for the
platform tier - the right shape for two routes was the wrong one for twenty -
and it changed no behavior: same MCP handler, same statelessness, same
`env.ASSETS` fallthrough. `/api` is scaffolding today (`/api/health` and a
JSON 404); auth, generations, media, and the AI gateway land with the bindings
they need. See `agent-outputs/20260827-studio-ai-plan.md`.

The export is comfortably inside the platform limits - roughly 9,500 files
against a 20,000 free-plan ceiling, largest file 3.0 MB against 25 MiB - but
both are counted per Worker *version*. Don't treat that file count as stable:
most of it is per-route RSC payloads, and a Next minor can move it a lot (16.3
cut ~1,400 files off 16.2's output without changing a page). What is stable is
`public/downloads/`, a flat 4,256 files for 177 sites (the artwork ones ship
their pictures in both packages), so a batch of new template sites is the
thing most likely to actually threaten the ceiling. `wrangler deploy` prints
the count it uploaded.

`vercel.json` and `scripts/vercel-ignore-build.sh` are gone. The ignore-build
script's job - don't redeploy when only `agent-outputs/` changed - has no
in-repo equivalent on Cloudflare; it is a **build watch path** configured on
the Workers Builds project (exclude `agent-outputs/*`), so it lives in the
dashboard rather than in git.

## The MCP server - one implementation, two transports

`packages/tabbied-mcp/` exposes the catalog to agents over the Model Context
Protocol. Full reference: `docs/mcp-server.md`.

The protocol comes from `@modelcontextprotocol/server` (MCP SDK v2). We own
the tools; the SDK owns the wire.

- `src/tools.ts` - the four catalog tools, with no runtime imports at all. The
  host injects what differs (preview bytes, docs text) through `ToolContext`.
- `src/server.ts` - registers those tools onto an `McpServer`. The seam.
- `src/stdio.ts`, `src/node/` - the bin, the local catalog reader, and
  `render_design`. Node only, never reached from the Worker.

Both transports are the SDK's: the Worker wraps the factory in
`createMcpHandler`, the bin hands it to `serveStdio`. So the remote endpoint
and the local bin answer `tools/list` identically. **A tool that needs a
browser cannot be remote**: `render_design` exists only over stdio, because
rendering a css-doodle pattern needs a real browser and a Worker has none.

Four things worth not re-litigating:

- **`buildServer` is a factory, and must stay one.** MCP v2 is stateless - the
  SDK builds a server per request (per connection on stdio). Capturing
  per-request state in it would work locally and break under concurrency.
- **Tool schemas stay plain JSON Schema, adapted with `fromJsonSchema`,** not
  authored as Zod. `search_designs`'s enums are derived from the catalog being
  served, so static Zod could not express them without drifting from what is
  actually queryable. Registering the schema is also what buys argument
  validation - the SDK rejects an out-of-vocabulary tag before our handler runs.
- **`createMcpHandler` comes from the SDK, not from `agents/mcp/server`.**
  Cloudflare's is a re-export of the same function (it graduated upstream), but
  taking it from `agents` drags partyserver, esbuild, and babel into a Worker
  that needs none of them. The SDK's own deps are `zod` and
  `@modelcontextprotocol/core`; the bundle is ~122 KB gzipped.
- **The Worker reads the catalog through `env.ASSETS`, not from its bundle.**
  The tools then describe exactly the bytes that deployment serves: a design
  added in the same commit cannot be missing from the catalog an agent queries,
  and 384 KB of JSON stays out of the Worker.

`legacy: 'stateless'` is spelled out at the call site even though it is the
default: it is what keeps 2025-era clients working, and every shipping client
still opens with `initialize`. Dropping it to `'reject'` would strand them.

## Downloadable templates - derived from the export, never hand-ported

`npm run templates` writes two downloads per site - `<slug>-html.zip` and
`<slug>-react.zip` - plus the folders they were zipped from. The `/templates`
gallery links to both formats from every card, so a dead button means the
packager skipped that site. Both `out` and `public/downloads` are in
tsconfig's `exclude` because the React packages contain their own
`vite.config.ts`, which the site's typecheck would otherwise try to compile -
and in `public/downloads` that isn't hypothetical: it fails the second pass.

**`npm run build` is two `next build` passes with the packager between them**,
and that shape is forced by both ends of the problem:

- The packager *reads* the export, so it can only run after a build. It has no
  framework-free source to copy from - deriving from the export is the whole
  strategy: a hand-port is four artifacts per site to keep in step, and within
  two edits the download and the live site disagree.
- The deploy has to *ship* what it writes, and the host decides when it stops
  looking. This shape was forced by Vercel, where writing into `out/` after the
  build was too late: the Next.js builder patched the config ("Applying
  modifyConfig from Vercel" in the build log) and captured the export during
  `next build`, so a `postbuild` step packaged all 57 sites green and all 114
  buttons still 404ed - the files existed on the build machine and were never
  uploaded.

So the packager writes into `public/downloads/`, and the second pass exports
that folder like any other static asset. Nothing about the host is assumed;
it is just Next copying `public/`. The zips are gitignored (~106 MB), so the
deploy's own build is the only thing that ever produces the `/downloads/*.zip`
the site links to - which is why this is wired into `build` rather than left
to be remembered.

**The archives are written in-process, and must stay that way.** The packager
used to shell out to `zip -qr`. That binary is on GitHub Actions' runner and on
most developer machines, but Cloudflare's Workers Builds image ships `unzip`
and *not* `zip` - so CI stayed green while the first Workers deploy died with
`spawn zip ENOENT` on all 57 sites. `zipDirectory` now builds the archive with
fflate (zero dependencies), so the only thing the packaging step needs is the
Node that is already running it. Don't reintroduce a PATH lookup here. Two
details it depends on: every directory gets its own zero-length `<name>/`
entry, because 74 of the 177 sites reference no images and their empty
`images/` (and the React package's `public/`) would otherwise vanish from
the download;
and entries carry the source file's real mtime, which `zip -r` did and fflate
does not do on its own.

**Cloudflare would tolerate a cheaper shape, and it is deliberately not used.**
`wrangler deploy` uploads `out/` from disk after the build command has already
exited, so a single pass plus a `postbuild` packaging step into `out/downloads/`
would work here and would save a whole `next build`. The two-pass version is
kept because it depends on nothing but Next copying `public/`, and the failure
it guards against is silent and total - 114 dead buttons on a green build. If
you do collapse it, prove it by fetching a `/downloads/*.zip` from a real
deployment, not from a local `out/`.

Run `npm run templates [slug]` by hand to repackage into `out/downloads/`
without rebuilding (that is where the e2e suite looks). Packaging everything
wipes the target folder first, so a retired site can't linger in the deploy;
naming a slug repackages just that one in place.

The two formats are built in opposite directions, and that is the point:

- **HTML is derived from the export**, because there is no framework-free
  source to copy - hand-porting is the trap the derive-don't-port strategy
  above exists to avoid.
- **React is a copy of the page**, because a template page already *is* a plain
  React component. The only Next.js API any of the 177 uses is `export const
  metadata`; there is no next/image, next/link, `'use client'` or
  `generateStaticParams` anywhere. So `page.tsx` ships as authored and only the
  frame changes: metadata lifted into `index.html`, workspace imports pointed
  at copied neighbors, plus a Vite scaffold. Vite resolves `.module.css`
  natively, so the React package needs **no CSS transform at all** - only the
  bundler-less HTML package needs `composes:`/`:global()` flattened.

**The two formats also lay their images out differently, and must.** The HTML
package flattens everything into `images/`, which it can only do because it
rewrites the markup on the way past - `rewriteImagePaths` points every `src` at
the flat copy. The React package ships the *source*, which asks for its images
by the URL it was authored with, so it copies them under the sub-paths they
have on the site (`public/images/sites/...`, `public/images/template/...`). Two
mechanisms depend on that: `Figure` builds its `src` from the manifest's `base`
(`/images/sites`), and `ImageCard` hardcodes `/images/template/<id>.webp`.
Flattening breaks the hardcoded kind - and breaks it *silently*, because Vite's
dev server answers a miss under `public/` with `index.html` and a 200, so
nothing 404s and the images just render blank. It emptied all five
`TemplateSite` pages under `vite dev` while the HTML zip looked fine.
`e2e/templates.spec.ts` guards this by taking the exported page as ground truth
for what gets requested and asserting the React package serves every one.

Two things it does *not* do, deliberately. It doesn't de-hash and un-minify
the built CSS: the authored `.module.css` is already the clean, commented
stylesheet a person should edit, so that ships and only the class names in the
*HTML* are rewritten back to plain ones. And it doesn't hand-write the mount
code: the placeholders already carry their config as `data-*` attributes
(`TabbiedPattern` serializes it via `patternConfigToAttributes`), so one
`hydratePatterns()` call revives the whole page.

A site fails loudly rather than shipping broken: more than one CSS module on a
page, or two hashed names collapsing onto one plain name. All 177 sites
package, so `KNOWN_UNSUPPORTED` is empty - anything that throws is a new
problem and exits non-zero.

`composes:` needs no flattening, which is easy to get backwards. CSS Modules
resolves a local `composes` in the **markup**: `.h2Light { composes: h2 }`
compiles to `class="...__h2Light ...__h2"` and both rules are already in the
sheet, so the declaration is inert - just not valid CSS outside the pipeline.
`dropComposes` removes it, having first checked the build really did add the
composed class (a premise about build output, so it is verified, not assumed).
A cross-file `composes ... from` would introduce a second module and is caught
by the one-module check before that runs.

**Two stylesheet paths, and they fail differently.** A site with its own
`<slug>.module.css` ships it byte-for-byte. The five built on the shared
`TemplateSite` component have no per-page sheet, so the component's is shipped
trimmed by `trimUnusedRules` to the rules the page can actually match (~45% of
it is other sites' layout kits). The trim is conservative - a rule goes only
when it names a class the page doesn't have, and a selector with no class at
all is always kept - and it is safe only because the packaged page has no
framework left to add a class after load.

Two traps that trimmer already fell into, both silent:

- **Comments containing braces.** This codebase documents its CSS heavily and
  one comment contains a literal `{ color: inherit }` as an example. Counted
  naively that desynchronizes brace depth for the rest of the file, so the
  walker skips comments when scanning. Do not "simplify" it back to
  `indexOf('{')`.
- **Comments containing class names**, which poison the selector parsed out of
  the prelude. The selector is taken with comments stripped; they are put back
  on the way out so the shipped sheet stays documented.

`e2e/templates.spec.ts` covers one site of each of the three kinds and
asserts every class the markup uses survives into the stylesheet. Note it navigates to
`/downloads/<slug>/` **with the trailing slash**: `serve` rewrites
`<dir>/index.html` to an extensionless `<dir>`, and every relative asset then
resolves a level too high and 404s - which once had this spec passing against
a completely unstyled page. What actually proves a template is the pixel diff
against its live page (see the packaging commit); the spec is the cheap guard
that runs every time.

## Editable templates (full reference: docs/editable-templates.md)

`data-edit*` attributes in a template page name the parts a person or an agent
may change; `scripts/generate-editable.mjs` reads them back out of the export
into `public/editable/<slug>.json`, and `packages/tabbied-templates` validates
and applies an *edits document* against a DOM. Five sites are annotated (the
shared `TemplateSite` ones); the 52 bespoke pages follow in batches, and an
unannotated page is not a failure.

Four things worth not re-litigating:

- **The generator is the gate.** It runs inside `npm run build` (between the
  two `next build` passes, so the second exports it) and exits non-zero on an
  annotation that resolves to nothing. That failure is otherwise silent - the
  spec looks fine and the editor's control just does nothing, which is the
  `galleryThumbnails` rot in a new costume.
- **The engine never sets classes**, only text, attributes, and inline custom
  properties. `trimUnusedRules` ships a stylesheet trimmed to the classes the
  markup already uses, and that is safe *only* because nothing adds one after
  load.
- **Color derivation has one implementation.** `derivePaletteProperties()` is
  shared by `TemplateSite.tsx` (first render) and `applyEdits` (re-color); a
  second copy of that math is how a re-colored page gets unreadable body
  copy. Pattern fields re-color through a declared role map, and a literal
  `transparent` in color 0 must survive it - that is what lets a field read
  over a photograph.
- **One slot id may sit on several elements** (brand name in masthead and
  footer) and an edit reaches all of them; the generator fails the build if
  they don't currently agree.

All 177 sites are annotated. The 172 bespoke pages were done by
`scripts/annotate-templates.mjs`, a one-time codemod (`npm run
annotate:templates`) - run it after adding a new bespoke template, and note it
skips any page already carrying `data-edit-root`, so a hand-annotated page is
never overwritten. It refuses to annotate a component rendered more than once,
two nested maps sharing an index name, or a pattern wrapped in a fragment, and
says so; those need a wrapper or an id by hand.

**A slot has to cover the container, not just the tidy child inside it.** That
first codemod only made a slot of an element whose whole content is one text
run, so a heading with mixed inline content was passed over and only its
annotatable *descendants* got ids - leaving the container's own words with
nothing addressing them. Cobalt Works' headline was the shape: `hero.text` sat
on the accent `<span>`, so a generated site rewrote "material" and left the
rest, reading "Color is a Find your place. before it is an effect." The
masthead was worse - neither its text nor its `<i>` was annotated at all, so
the brand name could not be reached by anything.

`scripts/annotate-orphan-text.mjs` (`npm run annotate:orphans`) is the second
codemod that fixes it, and the tool for finding what is still uncovered
(`--dry-run` lists it). Two shapes are handled, matching what the five shared
`TemplateSite` pages already do by hand: a container of text and `<br>` becomes
a plain slot, and a container holding one accent element becomes
`data-edit-format="emphasis"`. Where the accent already had an id **the
container takes it over** rather than minting one, which is what keeps stored
revisions resolving - a document keyed by `hero.text` still applies, and now
reaches the whole sentence. Its budget is the tag's, but never less than what
the design already fits, or the template's own words warn against themselves.

92 runs are deliberately left: text beside a link, or beside an expression in a
`.map()` (`{h.d} on the year`). Wrapping those in a span is not safe in
general - a page that styles `.hero h1 span` would color the wrapper too - and
most of them are units and connectives rather than copy, so they want a person.

**The accent tag is read off the page, never assumed.** `writeText` used to
rebuild an accented run as an `<em>`, which is right for the five shared pages
and wrong for the 172 bespoke ones: each accents with whatever its stylesheet
targets, and Cobalt Works styles `.hero h1 span`. `accentTagOf` reads it at
generate time and the slot carries it as `emphasisTag`, so the round trip keeps
the tag it found. It defaults to `em`, so a page that declares none is
unchanged. A `<br>` reads back as a space, not as nothing - JSX leaves no
whitespace either side of a break, so dropping it ran "before" and "it"
together.

When resolving a pattern's palette into a role map it chases **aliased
constants** (`const TILE_A = STEEL`) and **array constants** (`palette={FULL}`);
not doing so left 109 of 434 fields unable to re-color. The 31 that remain
take a per-item palette from a data array or a conditional, so no static map
can describe them - they re-color only through an explicit `palette` in the
edits document.

**Two palette derivations, and the bespoke one is not `--brand-N`.** Those 102
pages each declare their own property names on their root rule (`--paper`,
`--ink`, ...) with the stylesheet reading `var(--...)`, so they use
`data-edit-root="vars"` plus `data-edit-vars` naming the role order. The
properties are written *inline*, which is what makes an edit beat the authored
default still in the class rule. A color interpolated into an inline style in
JS is baked at render time and a re-color cannot reach it - write those as
`var(--ink)`.

`page.tsx` sources that import `tabbied-templates` get it added to the React
download's dependencies automatically - `EXTERNAL_DEPENDENCIES` in
`scripts/package-templates.mjs` is derived from the shipped source, not
maintained by hand.

## A template's links on a phone - TemplateMenu

57 of the 77 templates hid their header nav below a breakpoint and put
nothing in its place, so a phone visitor, on the site or on a site shipped
from the download, had the footer and nothing else. Each of them now renders
`components/template/TemplateMenu` in its header: a copy of the nav's links
(same `data-edit` ids, which is allowed, and the editable gate checks they
agree) behind a "Menu" toggle. The 30 minimal templates and the 70 artwork
ones were built with it, so 157 of the 177 carry one. Four things it
depends on:

- **It is a `<details>`, because the HTML package has no React left.** Open
  and shut are the browser's own there. Closing on a followed link, an
  outside click and Escape is the component's effect on the site and in the
  React package, and `MENU_SCRIPT` in `scripts/package-templates.mjs` in the
  HTML package: a plain script, not part of the esm.sh bootstrap, because the
  Studio preview replaces that bootstrap and this should survive into it.
- **Its shape is in `styles/globals.css`** (`.template-menu*`), the one
  global sheet every package ships as `base.css`, since a page may ship only
  one module of its own. `e2e/templates.spec.ts` allowlists those classes.
- **Each page supplies the rest through the class it passes** (`siteMenu` by
  convention): `display: none` by default and `display: block` in the same
  media query that hides its nav, plus `--template-menu-bg`, the ground the
  panel sits on, taken from the header's own background variable so a
  re-colored page re-colors its menu. The panel inherits the header's type
  and color.
- **`e2e/template-menus.spec.ts` is the gate.** At 390px, every link a
  header hides must be in a visible menu that fits on the screen. A new
  template that hides its nav fails it until it carries the menu.

## The minimal set - the businesses that most need a site

The 30 entries before the artwork set in `lib/templateSites.ts` (2026-09-25)
are sites for ordinary local businesses: a restaurant, a cafe, a dentist, a
law firm, a plumber, a salon, a vet, a daycare, and so on. Each is built
on a different layout (a printed menu card, a split screen, a fixed
sidebar, a sticky contents rail, a timetable grid, a bento, a tap board, a
letter, a floor plan), and the pattern is the only ornament. Seven carry one or two product
cut-outs generated on gpt-image-2.5-flare (`docs/image-pipeline.md`); the
rest have no pictures. They brought three gallery categories, Services,
Health and Community, because none of the nine before fit a dentist or a
plumber. Four things worth knowing before editing one:

- **In the sidebar layouts the sidebar is the `<header>`** (Clearwater
  Dental, Morrow Coffee, Maren Holt): it is a column on a desktop and folds
  into a top bar with the TemplateMenu on a phone, because the menu gate
  reads the page's first `<header>`.
- **Some classes come from data** (`s[t.kind]`: a listing's status tag, a
  tap's glass color, a floor-plan zone). Both packages are fine with it,
  since the HTML one reads classes off the export, but an edit to the tag's
  text does not change its color.
- **A few designs ignore the seed** (`isometricblocks`, `diamondember`), so
  where a page repeats one as tiles the variety is a CSS crop, not a seed.
- **`midnightconfetti` cannot re-color**: it has one color slot and paints
  its petals in fixed hues. It was Wild Stem's first hero and was swapped
  for `foliage` for that reason; a primary pattern that ignores the palette
  breaks the customizer's promise.

## Pictures that follow the palette - Artwork

The 70 templates after the minimal set are built around generated pictures
that re-color with the page: `components/Artwork.tsx`, fed by
`lib/generated/artwork.js` and `public/images/art/`, which
`scripts/promote-artwork.mjs` derives from prompts carrying `recolor`
(`docs/image-pipeline.md`, "Recolorable artwork"). A file holds only shape
or tone; every color is an ink the page passes (`var(--ink)`), written as
an inline `--art-*` property. That is the whole trick, and it is why the
edits engine needed no change: a re-color rewrites the root's custom
properties and the pictures follow. Nine sites (High Pass Lodge through
Pinewood RV, then Crabapple Orchard, Coral Cove, Harbor Light Tours and
Heron Point) put one full-bleed behind their hero with `fit="cover"`, the
generated sky left transparent so the section's own color is the sky.
Five things worth not re-litigating:

- **Never a hex in `inks`**, and never `hue-rotate`: a color not taken from
  the palette is one a re-color cannot reach, and a filter can only shift
  hues, not land on one.
- **Layer inks are keyed by layer name** (`{ red: 'var(--accent)' }`), not
  by position: a picture may lack one of its prompt's key colors, and a
  list would shift every ink after it.
- **The duotone in CSS is two masks, not blend modes.** Multiply-then-
  lighten only works while the shadow ink is the darker one; a re-color to
  a dark palette flipped it and painted a flat box. `mode="tint"` is the
  mask version, correct either way round; the default, an SVG filter,
  takes the same care with `feBlend` darken and lighten.
- **The HTML package inlines every `--artwork-mask`** as a data URI
  (`inlineArtworkMasks` in the packager). A CSS mask is a CORS fetch, and
  a page opened from disk, as its README says to, is refused every one.
- **A pattern fill's pattern is the Artwork's only child**, and the
  annotator treats the Artwork as the pattern's wrapper, so the
  `data-edit-pattern` and `data-edit-roles` it writes land on `<Artwork>`,
  which forwards every `data-*` prop to the element it renders. That is how
  a fill re-colors: through its pattern, by the engine, not through CSS.

`e2e/recolor.spec.ts` is the gate: every page with artwork is re-colored
through its root palette properties and each picture's pixels must move; a
fill must carry its role map; the HTML package must carry its masks inline.
It also holds the family to its pattern: a field in at least four parts of
the page (the nearest header, footer, section or aside), three of them past
the hero, measured at 1440px. The first cut had most of its patterns in the
hero; a field added after a page was annotated gets its slot and role map
from `annotate-templates.mjs --patterns`, which touches nothing else.

## Template screenshots on the cards

Every template has a screenshot in `public/template-shots/<slug>.webp`: the
`/templates` card shows it with the site's live pattern as a tile in the
corner, and the homepage's template rails show it alone. `lib/templateShots.ts`
reads the folder at build time, so a template with no shot falls back to its
pattern on both.

`npm run build`, then `node scripts/generate-template-shots.mjs [slug ...]`
(no slugs shoots all). A shot starts **below the site's top bar**: a
thumbnail is small, and the brand and nav are the clutter it can least
afford. `contentTop` walks down from y=0 through stacked full-width bars (a
strip, the header, a rule under it; a masthead up to 420px if it holds nav
links; a first bar inset up to 24px, like Orbital's pill) and stops at
anything holding the `h1`. The page is scrolled past the bars, which are
hidden so a sticky one does not follow, and the first 1280x960 of content is
written at 960x720. A page that opens on its hero (Oxbow) is shot from 0.
Committed like the previews, because the deploy build has no browser; reshoot
a template after its hero or header changes, and check a new one's crop by
eye.

## The mark, and the font that travels with it

`components/logo/` is the whole of the brand mark: `LogoMark` is the glyph,
two mirrored strokes in `currentColor`, and `Logo` is the lockup that adds the
wordmark. Every masthead draws one of them - the shared `SiteNav` in both its
tones, the admin sidebar, the editor's and the customizer's bars and the
account forms' own shell. Nothing else should draw a Tabbied mark: the four
outlined cells that preceded it existed in three hand-copied variants (a
css-doodle, a CSS grid, and a grid with one cell omitted), and keeping them in
step is exactly the work this component removes.

## The masthead - one bar, two tones

`components/nav/SiteNav` is the site's masthead: the lockup on the left,
Home / Patterns / Websites in the middle, and on the right either "Sign in" or
the person as a pill - the initials in a circle beside two rules - opening a
menu (email, My Account, Settings, and Admin for a person whose row says
`role = 'admin'`, then Sign out). Signed in, the first destination reads My
Account. Below 768px the destinations fold into that menu, or behind
a hamburger when signed out. It takes a `tone` (`dark` for the homepage and
the template gallery, `light` for everything else) and a `sticky` flag the
pattern library uses because its rail starts where the bar ends. `HomeNav`,
`MainHeader`, `AccountHeader` and `GalleryTopBar` are now one-line wrappers
over it.

Four things worth not re-litigating:

- **The bar states a height; it does not add up to one.** 62px light, 67px
  dark, 56px below 768px - the artboards' own bars, measured. Vertical
  padding plus whatever the right-hand slot happened to be drew it 13px
  taller than the design everywhere, because the circle rather than the
  lockup was the tallest thing in the row. A stated height also keeps the bar
  from changing height when the session resolves, and it lets the 42px
  account pill sit inside the artboards' bar rather than setting it.
  `--gallery-bar-h` in `SelectPattern.module.css` is the light number: the
  library's rail is fixed below the bar, so the two have to agree.
- **Below 768px it is pinned**, on every route and in both tones, which is
  why `--n-bg` exists - the bar is otherwise transparent and takes whatever
  the page is. At those widths the destinations live *behind* this bar, so a
  bar that scrolled away would take the site's navigation with it. The
  `sticky` flag stays a page's own choice; the narrow rule is the width's.
- **GitHub and Docs are in the footer, not the bar.** The 2026 artboards put
  three destinations and the account up top and everything else in
  `HomeFooter`; the bar used to carry a different set of links on every
  page, which is what one component ends. Studio is in neither now: the
  generation flow is held back from the first launch (see below), and the
  footer's Product list is the artboard's own - Patterns, Websites, My
  Account.
- **It renders the signed-out chrome until a session says otherwise, unless
  this browser was signed in last time.** The export cannot know who is
  looking, and most visitors are nobody; a ghost in the right-hand slot for
  everyone while the session resolves would leave the phone layout with no
  menu at all until the fetch returned. But a signed-in person saw "Sign in"
  flash to their initials on every page, so `useSessionUser` keeps a hint in
  localStorage (`SESSION_HINT_KEY`) and a script inline in the bar marks it
  `data-session="likely"` as the page is parsed, which swaps "Sign in" for a
  placeholder circle; state keeps it until the session answers. Only a
  browser with the hint gets the ghost, and a wrong hint costs one fetch.

The stroke is authored at 17 units in a 391-unit viewBox, which is what keeps
it hairline at the ~20px the navs draw it at. Scale the box, never the stroke.

**The wordmark's font is declared by `Logo` itself**, not by a route and not
by the root layout. `plexMono` and `ebGaramond` are applied by the routes that
use them; the lockup is in a dozen mastheads and in none of the 177 template
pages, so the component that draws the word is the only place that knows
where the font is actually read.

The root layout was tried first, and is the trap. A class on `<html>` rides
onto every template page and into the HTML package derived from it, where
`trimUnusedRules` ships a stylesheet cut to the classes the markup uses - so
the packaged page carried a class with no rule behind it.
`e2e/templates.spec.ts` is the gate that caught that, and it is the shape of
every other silent rot in this file: the build stays green and the download
quietly carries residue.

## The 17 September updates - a random spread, a masonry, one action

Sy's second set of notes, applied. Six pages moved; the decisions that are
not obvious from the diff:

- **"Random per pattern" is the gallery's default, and it lives in the
  palette store.** `RANDOM_PALETTE_ID` sits in `activePaletteId` beside a
  saved or library id, because it is chosen from the same list. It names no
  colors: `SelectPattern` draws one library palette per card
  (`lib/randomPalettes.ts`, a seeded shuffle keyed by the card's place in the
  whole catalog, so a page change keeps each design in its palette), and the
  seed is the session's - drawn after mount, never during render, and kept
  until the option is chosen again, so coming back from the editor shows the
  cards as they were. `resolveActivePalette` returns null for it, which is
  what makes a bare editor visit open in the pattern's own colors; a card's
  link carries its palette instead, and the editor looks the linked colors up
  in the list so the row lights. `fitToColorBounds` cuts or pads a palette to
  what the pattern can take, for the card and the link alike.
- **The masonry is the grid's own dense placement, plus one JS step.** Every
  card is one column wide and three, four or five 52px rows tall; with
  `grid-auto-flow: dense` each lands under the shortest column, which is
  masonry. `flushGridBottom` then stretches the lowest card in each column to
  the last row line, written as the `grid-row` shorthand: an inline
  `grid-row-end` alone is ignored when the class already sets the start as a
  span, which is exactly how the first version of it did nothing.
- **No "New palette" button anywhere.** The pencil on any row opens the
  editor, and saving a library palette's edit is how a new one is made; the
  editor's desktop rail keeps its "+ New Palette" text, the only place the
  design still draws one.
- **Shuffle shuffles the layout.** The three scopes (layout, colors, both)
  and the remembered default are gone with `shuffleActions.ts`; the colors
  are chosen from the list under the swatches. Grid density is a slider
  from 0 to 1 over the cell size (see "The editor's density" below), read
  out as that number; the plate's caption names the grid it resolves to.
- **The editor on a phone: no caption, no export sheet, a strip and a sheet.**
  Export is the same dropdown as the desktop. The palettes are the first
  thirty (and the one in use) in a swipeable row, and "View all" opens
  `PaletteBrowser` in a fullscreen `Dialog`; the rail search is desktop only.
- **The template preview has one action.** "Use this template" opens, when
  signed in, a menu headed by the count of chosen templates and what taking
  this one costs, then Customize and the two original downloads; a template
  not yet the person's asks first (`ChooseTemplate.tsx`). Signed out it is a
  card asking for a sign-in, with the customizer as `?next=`. The bar's left
  edge is the Tabbied mark and "Websites", the way back to the gallery.
- **Popups are portaled, so they carry their own tokens.** The preview's
  menus and the customizer's are rendered under `<body>`, outside the page
  wrapper that declares `--s-*`; a `font:` or `background-color:` naming an
  undeclared token is invalid as a whole, which is how the sign-in card's
  "Log in" pill lost its background. Each popup class redeclares what it
  reads.
- **The customizer: Save in the rail, no Reset palette, no editor on a
  phone, no download gauge.** Save is at the foot of the rail beside the
  controls, and the bar is dark like the preview's. The template's own
  palette row is the reset. Below 768px the rail is hidden and a notice says
  customizing wants a larger screen, with the site full bleed to preview and
  download; the canvas-first layout that pinned the page at half the viewport
  is gone. The count of chosen templates is drawn on the account overview
  and in the preview's menu, not in the customizer's rail.
- **The account overview is "Your templates"** (the 23 September designs).
  The ring counts the chosen templates against the allowance, with an (i)
  saying what counts; beside it the AI card ("Not yet available", a hatched
  track, a sentence about a later release). Under them the chosen templates
  as a table: name and kind, when it was last customized and when it was
  added, a Download menu (the customized version's HTML when a site was
  saved, then the original's HTML and React) and Customize, which opens the
  newest saved site or a fresh draft. Then either the empty slot, leading to
  the gallery, or, at the limit, "Request more". There is no account
  sub-navigation: pages beyond the overview (settings, sites) carry one
  "Account overview" link back, and the downloads history page is gone.

## The editor's density - one number, the cell's size

`density` is a number from 0 (coarse) to 1 (fine), in the package and in the
editor alike, mapped onto the cell sizes the editor's original 360px plate
drew at its five stops: `cellPx = 360 / (2 + 8 * density)`, so the former
integer levels 0..4 sit at 0, 0.25, 0.5, 0.75 and 1, and 0.5 is the 60px cell
most designs open at (`densityToCellPx` in `sizing.ts`;
`agent-outputs/20260922-remove-aspect-ratio-plan.md` has the discussion). The
aspect ratio picker stayed; only the grid control changed. Five things worth
not re-litigating:

- **Density is a cell size in px, not a count.** The editor derives the
  grid from its plate at that cell (`deriveGridForBox`, the same derivation
  `fit: "grid"` runs on a container), so a wider stage shows more cells at
  the same density, and the copied snippet's `density={0.5}` draws in an
  embed the cells the plate showed at the size it showed them. A count along
  the long edge would keep one picture on every screen, and the snippet
  could not then say it honestly, because the package's unit is px.
- **The grid is not a link parameter.** A share link carries `density=`,
  and a `grid=` parameter is ignored like any unknown one. A design's
  authored grid default only sets the density it opens at
  (`densityFromGrid`, the long edge against the original 540px plate). The
  grid option's slot in `optionValues` is inert and never reaches the URL
  or the snippet.
- **Expand pins the grid.** Same seed plus a different `cols x rows` is a
  different arrangement, so expanding the plate holds the grid it showed
  and scales the cells; a ratio change, a density change or a collapse
  releases it. A plain window resize re-derives, as every embed does.
- **The rescale is a breaking change to a shipped prop**, made without a
  compatibility path: a `density` above 1 clamps to 1 (36px cells), and
  nothing warns about it. Every call site in this repo migrated level n to
  n / 4 in the same change.
- **The plate is clipped, the way a `fit: "grid"` field is.** The plate is
  the ratio's box; the canvas drawn in it is that box snapped to whole,
  square cells (`snapCellToBox`, the arithmetic `applyGridSnap` runs on a
  container) and the frame clips the sub-cell overflow. Drawn at the box's
  own size, a plate of any ratio but the grid's has fractional, oblong
  cells: a 3:2 plate at 15 x 10 drew 58.2px tracks with a hairline seam
  down every column, while 1:1 happened to land on 60. Both exports are cut
  to the plate (the PNG on a canvas, the SVG through the converter's `clip`
  option), so the file is what the stage showed, at the ratio that was
  picked.

## The homepage - its own shell, and a hydration rule

`app/page.tsx` and `/templates` are the two routes in the dark editorial
treatment. The homepage brings its own token set
(`components/main-page/home.module.css`, inherited by every `Home*` section as
`var(--h-...)`) and the dark `HomeFooter`; the template gallery wraps itself in
the same tokens so its masthead, cards and footer read from one set, and so
does `/docs/react`, as a light section of that shell (below). Every other
route renders the masthead in its light tone; the legal pages and the 404 are
the older light theme and end in `components/Footer`. Nothing here is global:
the tokens sit on the page wrapper, not on `:root`, so restyling the homepage
cannot reach `/patterns`, only the pages that opt into the set. The three
how-it-works steps are hidden below 768px, as the artboard hides them.

**The docs page is the design's light section, not a third theme.**
`app/docs/react` wraps itself in `home.home` plus the two fonts, draws the
masthead in its light tone over a white `.paper` wrapper, and ends in
`HomeFooter`, which brings its own dark ground; the light tokens the homepage
declares for its inset sections (`--h-paper`, `--h-ink`, `--h-teal`, the
paper rule and well) are what the article reads, and the code panels are the
dark shell turned back on (`--h-bg`, `--h-card`, mint for strings, cyan for
keywords). Two things about it:

- **The code coloring is a tokenizer, not a highlighter**
  (`components/react-docs-page/highlight.ts`): comments, strings, a short
  keyword list and JSX tag openings, scanned left to right so an apostrophe
  in a comment never opens a string. It runs at build time over the page's
  own samples and leaves anything it is unsure of plain. Do not reach for a
  grammar library to color a dozen snippets.
- **The section numbers come from the `SECTIONS` array**, in the contents
  rail and above each heading alike, so reordering a section renumbers both;
  a heading that is not in the array has no index and no rail entry, which is
  the cue that it was forgotten.

Three things worth not re-litigating:

- **The animated grids are seeded, then random.** The hero skyline, its margin
  columns, the pattern demo, and the story backdrop are all grids of randomly
  shaped cells that reshuffle on a timer. A `Math.random()` call during render
  makes the prerendered HTML disagree with the first client render and hydration
  blows up, so the *initial* grid comes from `seededRandom()` in `homeMotion.ts`
  (the same one on the server and in the browser), and only the timers, which
  start after mount, use real randomness. The same trap catches module-scope
  constants: a `Math.random()` at the top level of a module runs once per
  process, which is not once per page.
- **Every figure is derived.** `lib/siteCounts.ts` counts the presets, the
  template sites, and the palette library; the hero sentence, both stat rows and
  the two "view all" links read it. It is server-only on purpose - counting the
  keys of `patterns` in a client component would ship the whole catalog to the
  browser to learn one number. `e2e/smoke.spec.ts` asserts the same count
  appears in all three places rather than pinning the value.
- **Reduced motion stops all of it.** Six independent clocks run on this page
  plus three CSS animations (the two marquees and the orbiting squares). Every
  timer is gated on `useMediaQuery('(prefers-reduced-motion: reduce)')` and every
  animation and transition has a `@media (prefers-reduced-motion: reduce)`
  override; a marquee that merely slows down is the failure this guards against.

IBM Plex Mono and IBM Plex Sans are loaded by `next/font` (`lib/fonts.ts`)
**in the page**, not the root layout, so only the routes that use them preload
them. The two sans split by role, as the artboards do: proxima-nova, from the
layout's typekit link, sets display type (headings, stat figures, primary
buttons), and Plex Sans sets body and UI copy.

## The platform tier - auth, generation, media

`worker/` is no longer two routes. `/api` now carries better-auth over **D1**,
Studio's generation endpoints, and **R2** media, and the site gained
`/sign-in`, `/sign-up`, `/account`. Two datastores, deliberately: D1 for
everything stateful, R2 for bytes. Everything is still a static export;
everything stateful is a `fetch` to `/api/*` on the same origin, which is the
property that makes the session cookie work with no CORS surface at all.

```bash
npm run dev            # site on :3000, with NEXT_PUBLIC_API_BASE set
npm run dev:api        # the Worker on :8787 - run both
npm run db:migrate     # apply worker/migrations to the local D1
npm run stub:ai        # a local OpenAI-shaped upstream on :8788
npm run test:worker    # workerd, over local D1 and R2
```

**No binding declares an id, deliberately.** Wrangler provisions a binding
whose id is absent and looks one up whose id is present, so a placeholder is
strictly worse than nothing: it turns "create this for me" into "find
0000...000f", which fails the deploy with a `10041`. Local dev and the tests
simulate both bindings either way.

**There is no KV, and that is the second lesson from the same deploy.** It
briefly held three things - the session cache, the burst counters, and dev
mail - and none of them needed it. The counters in particular were *wrong*
there: Workers KV permits one write per second to a key and throws on the
second, so a client sending two requests in a second (exactly the burst the
limiter catches) turned the intended 429 into a 500, and with no
compare-and-set the count could only ever be approximate. In D1 the rollover
and the increment are one atomic statement, the count is exact, and the table
cannot grow past one row per user per endpoint. Sessions moved to
better-auth's `cookieCache`, which beats a second store by removing the lookup
rather than relocating it.

Provisioning cannot do the schema, and neither does a deploy: **every
migration under `worker/migrations` has to be applied to production by
hand or by the deploy command**, not only the first. `npm run deploy` runs
`db:migrate:remote` before `wrangler deploy` for that reason; a Workers
Builds project that deploys with its own command needs
`npx wrangler d1 migrations apply tabbied --remote` in it too. The failure
when this is skipped is exact and misleading: the routes that touch a new
table answer 503 ("The database schema is behind this deployment") while
everything around them works, which is how "Make this one" read as a
broken model call when 0003 had never reached production. `GET /api/health`
reports `schema.expected` against `schema.applied` (read from wrangler's
`d1_migrations` ledger), and `status: "degraded"` there is the whole
diagnosis. Then `wrangler secret put BETTER_AUTH_SECRET`. Until that secret
exists `/api/auth/*` answers 503 and nothing else changes, the intended
degradation, not an outage. `.dev.vars` is gitignored;
`.dev.vars.example` documents the shape.

Things worth not re-litigating:

- **`worker/db/schema.ts` is the source of truth and `worker/migrations` is
  emitted from it** (`npm run db:generate`). better-auth's four tables are
  transcribed from its own `getAuthTables()` output rather than guessed - run
  it after an upgrade, because a field added upstream is a migration here
  (that is how `account.issuer` was caught).
- **`buildAuth` is a factory**, for the same reason `buildServer` is on the
  MCP side: an isolate is shared across requests, so capturing bindings in a
  module-scope singleton works locally and breaks under concurrency.
- **Two ceilings, both exact.** `lib/ratelimit.ts` is a short window that stops
  a script spending a day's budget in ten seconds; `lib/quota.ts` is the daily
  ledger, summed per user per endpoint per UTC day. Text and images are capped
  separately, because they cost differently by an order of magnitude.
- **`trustedOrigins` trusts any loopback origin in dev, not a list of ports.**
  The site is :3000, the Worker :8787, `npm run preview` picks its own and a
  test harness another again; a hardcoded pair rejects every port it does not
  name as "Invalid origin", which reads like a bug in the sign-in form.
- **Secrets are typed optional and each feature degrades on its own.** No
  `AI_API_KEY` and the endpoints answer from the matcher; no `RESEND_API_KEY`
  *in dev* and the verification mail is written to KV instead of sent (which
  is how the e2e flow reads a link back). In production that same branch
  throws - a silently swallowed verification strands the account.
- **Provider buttons come from `/api/auth-providers`, not from the form.**
  `configuredProviders()` lists the social providers the Worker actually
  holds ids for (Google, Apple, GitHub), and the sign-in form draws a button
  per answer. With no Worker behind the export the request fails quietly and
  the form is email and password. A button for an unconfigured provider is
  one that 500s on click, which is the thing this exists to prevent.
- **A person's own generations are listable, like their sites.** `GET
  /api/studio/generations` is session-scoped and carries the three directions'
  names and palettes (never the copy); the account overview merges it with
  `/api/studio/sites` into one history. The no-listing rule is about anonymous
  enumeration by id, not about a person's own rows.
- **A correlated subquery in a single-table select must qualify its columns
  by hand.** drizzle renders `${user.id}` as a bare `"id"` when the outer
  query has no join, and inside `(select count(*) from site where ...)` that
  resolves to *site*.id - every count came back 0 and nothing errored.
  `${site}.user_id = ${user}.id` spells the tables out; the same pattern with
  a join in the outer query happens to work, which is why it looked fine on
  the generations list and not on the users list.
- **A miss under `/api` is `api.all('*')`, not `api.notFound()`.** A sub-app's
  notFound handler is not used once it is mounted with `route()`, so the
  request falls through to the asset handler and answers an API client with
  the marketing 404 page.
- **`createAuthClient` gets no `baseURL` in production.** A relative
  `/api/auth` looks equivalent and is not: the client validates the URL at
  construction, at module scope, during the export - where there is no origin
  to resolve it against. That threw the prerender of every page importing it.
- **The session type is narrowed once**, in `lib/authClient.ts`. better-auth
  infers it from the *server* config, which lives in `worker/` and is outside
  the site's tsconfig on purpose, so the client types `data` as `never`.

## Five templates per account - chosen once, then unlimited

During the beta every account chooses five website templates. Choosing is
explicit ("Choose template" on a gallery card) or implicit (the first
download of a template, or the first customizer Save of it), and once a
template is chosen its colors and patterns can be changed and it can be
downloaded as often as the person likes. This replaced a cap of thirty
distinct templates a month (migration 0007 carries every template a person
had already downloaded or saved into the new table, more than five for an
early account if so; nothing taken is taken back, they just cannot choose
another). Five things worth not re-litigating:

- **The claim lives where the bytes leave.** `/downloads/*` is in
  `run_worker_first`, and `GET /downloads/<slug>-<format>.zip` in
  `worker/index.ts` requires a session and runs `claimTemplate`
  (`worker/lib/templates.ts`) before serving the zip through `env.ASSETS`;
  a miss gives a choice this request made back, so a zip the packager never
  wrote costs nothing (a 304 is not a miss: the browser already holds the
  bytes, and the choice stands). The check and the write are one `INSERT OR IGNORE
  ... SELECT ... WHERE count < allowance`, over a unique `(user, slug)`
  index: read, compare, then write let 154 concurrent requests all read a
  count under the old cap, and one account took 51. A HEAD or a Range
  resuming past byte 0 is answered by the same rule and writes nothing
  (`takesCopy`). `POST /api/studio/sites {slug}` (the customizer's first
  Save) and `POST /api/account/templates {slug}` make the same claim.
- **The dialog is the page's, the rule is the Worker's.** Every way to take
  a template that is not yet the person's asks first
  (`components/template/ChooseTemplate.tsx`): how many are chosen, what this
  one costs, and at the limit the chosen ones and "Request more". The page
  learns what is chosen from `GET /api/account/templates`, read once per
  page into a small store (`lib/myTemplates.ts`) the 177 gallery cards
  share. Someone who opens a zip's URL directly is held to the same five.
- **A click and a fetch are answered differently.** A navigation (a download
  link, told by `Sec-Fetch-Mode`) is sent where the answer is: to
  `/sign-in/?next=` with the page it came from, or to `/account/?templates=
  full`, which the overview reads after mount and says out loud. A fetch
  (the customizer building a customized zip) gets JSON and a 401 or 403,
  and `buildCustomisedArchive` puts that sentence in a toast. The
  `download` table is now a log of served zips, nothing more.
- **"Request more" comes in two rounds** (the 24 September designs). The
  first request answers three questions (role, what they build, how many
  sites) and is granted by the person: `POST /api/account/templates/request`
  writes a round-1 row and schedules an email for five minutes later
  (Resend's `scheduled_at`, so nothing here has to wake up) carrying a
  single-use link, `GET /api/account/templates/activate?token=`, that adds
  5 and lands on `/account/?activated=5`. Only the token's SHA-256 is kept,
  the link lapses after 7 days, and a resend mints a new one (the old link
  stops working). A resend is refused until the first email is due, since
  Resend still holds that message and a new token would make its link dead
  on arrival, and is held to three in ten minutes; every route here that
  sends mail sits behind a `consume` burst gate, because each call is a
  real message. The five-minute wait is the design's, so the request
  reads as looked at rather than paid out; the account row says "on its
  way" until the send time, then "approved" with a Resend button. Every
  later request carries those answers forward and adds how many, whether
  the person would pay, a link and a note; it goes to the team (`TEAM_EMAIL`,
  else `ADMIN_EMAILS`, with the person as Reply-To) and waits under
  `/admin/requests/`, where granting adds 1 to 20, declining adds none, Undo
  puts it back, and a decision mails the person. One request may be open at
  a time, checked in the insert itself (`openRequest`). The allowance is
  five plus every `granted` whose status is `activated` or `granted`, and
  that rule is one `allowanceSql`, read by the person's page, the claim and
  both admin lists alike; the users directory once carried a copy of its
  own that read a single grant row and left `activated` out, so an account
  that had followed the link showed 10 / 5 there. Emailed links are built
  on `PUBLIC_ORIGIN`, as the auth mails are, never on the host a request
  arrived on.
  Migration 0008 rebuilt `template_request` for this by hand: drizzle's
  output copied columns the old table did not have and switched foreign
  keys off, which D1 does not allow.
- **The e2e suite never sees the gate.** `serve out` has no Worker, so the
  zips are plain files there and the specs stub the session and
  `/api/account/templates`; `worker/test/templates.test.ts` is where the
  claim, the concurrency, the customizer save and the request are proved.

Mail itself (Resend, `MAIL_FROM`, `TEAM_EMAIL`, the DNS records and what
`/api/health` reports) is `docs/email.md`.

## Studio - matching, then generating

**The generation flow is unlinked for the first launch, and the code is all
still here.** `/studio`, `/studio/results` and `/studio/preview` build, export
and answer at their URLs; nothing on the site points at them. So does every
`/api/studio/*` endpoint and every cap in `worker/lib/quota.ts`. What went was
the links: the footer's "Studio", the account overview's "+ New Studio
request" and its generation history, `AuthForm`'s and `PasswordForms`'
post-sign-in default (now `/account`), the shared page's way out (now
`/templates`), and Pictures and Usage in the account nav - both of those
pages exist only to serve generation, and every cap belongs to one of its
endpoints, so with the flow held back they would report a feature nobody can
reach. Putting it back is adding those links again, which is why none of the
routes were deleted.

The customizer is **not** part of this. `/studio/customize/?slug=` and
`/studio/site/?id=` are the template customizer, they make no model call, and
they stay reachable from the framed template preview and from the account.

The rest of this section describes the flow as built, for when it comes back.

`/studio` takes a description of a business and `/studio/results` answers with
three template sites. Studio answers with what the repo actually has: 177
finished template sites, each on one of the 338 patterns and one of the 437
palettes, each with a real page and a real zip. (The AI tier this was designed
against - `agent-outputs/20260827-studio-ai-plan.md` - has since landed; see
below. The matcher was not replaced by it.)

- **`lib/studioMatch.ts` is pure and isomorphic; `lib/studioDirections.ts` is
  server-only.** The index - 177 entries of names, palettes and vocabulary - is
  built at build time and passed to the client as plain data. Importing the
  catalog (384 KB) or the template data into the browser to match against it is
  the thing this split exists to prevent.
- **Everyday words are mapped onto the closed catalog vocabulary**
  (`packages/tabbied/scripts/catalog-vocabulary.mjs`), and moods are scored by
  *votes*: "warm, earthy, friendly" is three words asking for `organic` and
  outranks one word asking for `technical`. Scoring presence rather than votes
  put a deep-sea research site at the top of a warm-and-earthy query.
- **The description travels in the query string**, so a result is refreshable
  and shareable, and the match is a pure function of it. Ties break on a hash of
  the text, which is what makes an empty or unmatched description still return a
  stable spread rather than the same three every time.
- **Every card leads somewhere that exists**: Preview to `/templates/<slug>/site/`,
  Download to `/downloads/<slug>-html.zip`. `e2e/smoke.spec.ts` fetches each
  preview href and asserts a 200 - that guard is the whole difference between
  this and the mockup it came from.

**The AI tier landed, and the matcher was not replaced by it - it became
candidate assembly.** `POST /api/studio/directions` runs the same scorer
server-side, puts the top dozen in the prompt, and builds the response schema's
slug enum from exactly that dozen, so an invented template cannot survive
validation. The answer is validated against the same zod schema, then once more
after a repair retry carrying the validation errors; a second failure falls
back to the matcher's own three (`source: 'matched-fallback'`, which the page
says out loud) rather than erroring.

**Text goes to `${AI_BASE_URL}/responses`, not `/chat/completions`.** The
Responses API is what OpenAI recommends for new work, and it is the only one of
the two that carries a turn forward: the repair retry quotes the rejected
response as `previous_response_id`, so it sends the correction alone against a
context that still holds what the model just wrote, and the id is stored on the
`generation` row so a revision can continue the document a user kept. Four
things that shape follows from:

- **Reasoning tokens are output tokens.** `max_output_tokens` is spent thinking
  *before* any message is emitted, so a cap sized for the old
  `max_completion_tokens` comes back `status: "incomplete"` with no content -
  which reads exactly like a broken upstream. `respondJson` names that case;
  `AI_REASONING_EFFORT` (omitted entirely when unset, because a non-reasoning
  model rejects the field) and the cap trade against each other.
- **There is no `choices[0].message.content`.** The answer is an item in an
  `output` array that also carries reasoning items, so it is walked, and a
  `refusal` part is reported as a refusal rather than as absence.
- **Continuity is an optimization, never a dependency.** `store: true` is what
  makes an id resolvable - and means prompts and answers are retained upstream,
  which is a deliberate trade. An upstream that stores nothing returns no id and
  both callers restate in full, so `responseId` is nullable and a stale one is a
  cache miss. The document in `generation` stays the source of truth: a shared
  `?g=` link is read by someone with no session and no upstream context.
- **Images stay on `/images/generations`.** The Responses API's
  `image_generation` tool would put a reasoning model in front of every image
  whose job is to rewrite a prompt `docs/image-pipeline.md` tunes deliberately,
  and bill the rewrite. Two endpoints, two failure modes, one metered call each.

- **The matcher remains the signed-out path**, unchanged and Worker-free:
  `?q=` still means matched and is still a pure function of the text. `?g=<id>`
  means generated, because an LLM answer is not reproducible - so shareability
  moved into storage. The id is the capability; reads need no session, writes
  check ownership, and there is no listing endpoint to enumerate.
- **Palettes are the one field the model authors freely**, so they are checked
  against the palette library's two rules and repaired deterministically with
  `tabbied-templates`' own color math. Shorthand hex is expanded first -
  `#fff` and `#ffffff` are one color, and comparing them as strings let an
  invisible ink get "repaired" into a color nobody chose.
- **Imagery is lazy, idempotent and separately capped**: one image per
  direction, on request, never three up front. `gpt-image-2.5-flare` emits real
  alpha, which is why this reaches one vendor and not two
  (`docs/image-pipeline.md`).
- **Two image models, and the split is the Batch API.** The Worker generates at
  `quality: "low"` on `gpt-image-2.5-flare` (`AI_IMAGE_MODEL`), which OpenAI's
  pricing page lists at exactly the `gpt-image-2` rates, so the switch bought
  up to 50% lower latency for the same money. The offline collection pipeline
  (`scripts/generate-images.mjs`, `scripts/generate-mockups.mjs`) stays on
  `gpt-image-2` because **flare has no Batch API**, and batch is where that
  pipeline gets its half-price rate: 159 images for ~$0.42. A version bump is
  not a global find-and-replace here.
- The artboard's **photo upload** waits on `/api/uploads`; the **spinner** it
  drew for a synchronous match is now real, because generating is a real call.

**A generated direction now reaches the template**, which is what makes
Preview more than a link to somebody else's website. The model authors a brand
name, a headline, a tagline and a palette; `/studio/preview/` applies them to
the template and shows the result.

- **Slot ids are local; roles are not.** An edits document is keyed by slot id,
  and those ids are whatever the annotator called them - `brand.name` on the
  five shared `TemplateSite` pages, `bar.mark` or `index.text12` on the bespoke
  ones. A caller holding three strings cannot address that, so a text slot may
  declare `data-edit-copy="brandName|headline|tagline"` and `directionToEdits`
  maps a direction onto whatever ids that particular page uses. Three roles,
  because they are the three the model authors and the three that are
  unambiguous on every page. Only the five `TemplateSite` pages carry them so
  far; `/editable-catalog.json` publishes `copyRoles` per site and the results
  page reads it to decide whether a card's Preview can promise a rebrand.
- **The artifact previewed is the download, not the live page.** `/templates/
  <slug>/site/` mounts its patterns through React, which ignores a `data-*` write
  from outside - `applyPlan` deliberately does not re-mount anything, because
  re-mounting is `hydratePatterns()`'s job. The packaged `out/downloads/<slug>/`
  has no framework left in it, so the engine's attribute rewrites are exactly
  what a plain `hydratePatterns()` then reads. Previewing what is actually
  downloaded is also the difference between a preview and a mockup.
- **The bootstrap is repointed at a same-origin bundle, and must be.** The
  package imports `tabbied` from esm.sh, pinned, which is right for a stranger
  who unzipped it years later and wrong for this site drawing its own preview.
  `scripts/build-preview-runtime.mjs` bundles `hydratePatterns` plus the whole
  catalog (338 designs, 108 KB gzipped, cached across previews) into
  `public/studio/preview-runtime.js`, and the shell rewrites that one script
  tag. Serving `tabbied/dist` raw instead does not
  work: `register.js` does a bare `import 'css-doodle'` that no browser
  resolves. The step runs between the two `next build` passes, after the
  packager it reads from - **it is derived from the packaged HTML**, so a
  template added in the same commit cannot be missing a design it needs.
- **The preview document spells its resource paths out, and handles its own
  `#` links.** The injected `<base>` is correct and complete, and two things
  still go wrong in an `about:srcdoc` document without help. Chromium's
  preload scanner ignores the `<base>` and fetches every relative stylesheet
  and preloaded image against the *page's* URL first - a 404 at
  `/studio/results/styles/base.css`, then `ERR_ABORTED` once the parser
  catches up and fetches the right one; the preview drew fine and the console
  said otherwise. So `buildPreviewDocument` also rewrites `link`/`img`/
  `script` references to absolute paths under the package. And a `#work` link
  resolves against the `<base>` to the package's URL, which is never the
  document's own `about:srcdoc`, so the browser *navigates* the frame there -
  the raw page, rebrand gone, esm.sh bootstrap back; a sandbox does not stop
  a frame navigating itself. The injected bootstrap turns fragment links into
  the scroll the template meant. `e2e/studio-preview.spec.ts` pins both.
- **The iframe needs `allow-same-origin`, and that is not laziness.** With
  `allow-scripts` alone the document gets an opaque origin and the same-origin
  runtime import is blocked as cross-origin - the page renders with every
  pattern silently missing. What stays denied is what the packaged page
  actually contains: its `<form action="#">` and `<a href="#">` cannot navigate
  the top frame, submit, or open a popup. Model-authored strings reach the
  document as text nodes (`writeText` builds them with `createTextNode`
  precisely so there is no markup path), and everything else is first-party.
- **The three strings are the floor; a *site* is the whole page.** "Make this
  one" on a generated card is `POST /api/studio/sites`: every text slot on the
  chosen template rewritten for the business, against a strict JSON schema
  built from that template's spec (`worker/ai/siteSchema.ts`) - the same
  closed-vocabulary move as the slug enum, one level up, so an invented slot
  cannot survive and a forgotten one is a schema failure rather than a headline
  that silently stays the plant shop's. The answer is checked by zod and then by
  `planEdits`, which is pure and so runs in the Worker with no DOM; one repair
  retry; a second failure writes the three-string `directionToEdits` floor as
  revision 1 with `source: 'fallback'`, and the workspace says so. Because the
  document is keyed by slot id, **this reaches all 177 templates today** -
  `data-edit-copy` roles matter only for the cheap card-stage preview.
- **Sites are pinned and versioned.** `site` records `specVersion` and a
  SHA-256 of the packaged `index.html` it was authored against; `GET
  /api/studio/sites/:id` re-hashes the served package and reports
  `templateChanged`, so a re-packaged template is announced on the page rather
  than discovered as a missing headline. `revision` is append-only (`n`,
  `edits`, `instruction`, `source`, `responseId`) - a conversational or manual
  edit writes n+1, which is what makes "go back" possible. The listing is
  session-scoped (`GET /api/studio/sites`, on the `(userId, updatedAt)` index)
  and the read is by capability id, the same split as generations: the
  no-listing rule is about anonymous *enumeration*, not a person's own rows.
- **The output budget scales with the page.** A 300-slot bespoke page is a long
  answer and reasoning is spent from the same cap first, so `outputBudget`
  grows with the slot count; the 6,000 default that fits three strings comes
  back `incomplete` with nothing on a full page.
- **`worker/test/sites.test.ts` runs a real session.** Sign up, read the
  verification link out of `dev_mail` (DEV=1 writes it to D1), follow it, keep
  the cookie - then make, list and read through the real routes against the
  packaged assets the binding serves. With no `AI_API_KEY` it exercises every
  row the tier writes via the fallback path, which is the point.

**The customizer, and what surrounds it.** `/studio/site/?id=` is where a
site is worked on. For its owner (the read says `mine`, decided by session)
a rail sits beside the canvas; a visitor by link gets the page alone. The
first release of the customizer changes two things, **colors and patterns**,
and says so: the rail's third tab, Content, reads that words and pictures are
not edited here yet. The Worker keeps the routes that would edit them
(`revise`, `images`, text slots on a saved revision) and the document keeps
whatever text Studio wrote, so putting them back is a UI change.

- **A site starts from a direction or from the gallery.** `POST
  /api/studio/sites` takes `{generationId, index}` as before, or `{slug,
  edits?, title?}`: a copy of the template whose first revision is the
  document sent (checked by the same `refuseDocument` as a revision) or empty,
  no model call and no daily cap (the burst limiter still applies), and
  `generationId` and `directionIndex` null. **A gallery site is made on its
  first Save, never on the visit.** `/studio/customize/` renders the
  customizer on an unsaved draft (`StudioSite` with `template`), and the Save
  that makes the site moves the address to `/studio/site/?id=` with
  `history.replaceState`, so the canvas is not reloaded; making it on the
  visit left one copy in the account per look at a template, phones
  included. `DELETE /api/studio/sites/:id` removes a site, its revisions and
  its R2 pictures, from the Custom sites list. Migration 0005 made those columns nullable by
  rebuilding `site` and `revision` **child first**: SQLite cannot alter a
  column's constraint and D1 cannot switch foreign keys off, and dropping a
  parent under enforced keys runs an implicit DELETE that would cascade every
  saved document away. `/studio/customize/?slug=` is the one door in - the
  framed `/templates/<slug>/` preview's "Use this template" links to it, and
  it handles the sign-in detour. The gallery cards no longer do: the
  artboard's card footer is the DOWNLOAD label and the two format pills, and
  nothing else. The account's "Create new site" leads to `/templates`, since
  a site starts from a template and the slug is the choice being made.
- **The rail edits through the engine, live.** Choosing a palette plans the
  properties and the pattern-host rewrites and runs them against the iframe's
  document, then calls `window.__tabbied.rehydrate()` inside it, which the
  bundled runtime exports - it tears down the controllers it mounted and
  mounts from the attributes as they now are, because a rewritten `data-*` is
  not a re-render. "Shuffle patterns" draws a new design for every pattern field
  (`lib/studioPatterns.ts`: same density as the field has now, no design
  twice on a page, a fresh seed each) and applies it the same way; "Reset
  patterns" rebuilds the canvas from the package, since a swap removed the
  field's authored options and a partial plan cannot put them back. Saving is
  `POST /api/studio/sites/:id/revisions` with the whole document, validated
  by `planEdits` server-side with the catalog's slugs as `designs`; a swap to
  a design the catalog does not have is a 422, not a blank field.
- **Colors is a list of palettes, not a row of pickers.** The rail offers the
  template's own palette and then all 437 in `lib/paletteLibrary.ts`; the
  pickers are still there, behind the pencil on a row (`PaletteDialog`), which
  is what keeps a color nobody shipped reachable. A library palette carries
  3-7 colors and a template declares as many roles as its stylesheet reads,
  so `lib/studioPalettes.ts` fits one to the other by cycling the inks - and
  leaves a role the template authored as `transparent` alone, because that is
  what lets a field read over a photograph.
- **The preview runtime carries the whole catalog.** It used to bundle the
  231 designs the packaged templates mount, which was right while a preview
  could only re-color a field; a shuffle can swap to any of the 338, and a
  design missing from the bundle hydrates to nothing with a console warning.
- **The download is rebuilt where the changes are.** The customizer's
  Download menu fetches the packaged `<slug>-html.zip`, applies the document
  to its `index.html` with the same engine the canvas was drawn with, rewrites
  the bootstrap's import list to the designs the page mounts now, ships any
  `/api/media` picture Studio made inside `images/`, and zips it again with
  fflate (`lib/studioDownload.ts`). The React package is offered as the
  template's source and labelled that way: the document cannot be applied to
  JSX.
- **A site's title is its own.** `PATCH /api/studio/sites/:id {title}`
  renames it; the rail's name field commits on blur or Enter, and nothing on
  the page reads the title, so no revision is written. The listing's
  swatches are the colors the site wears now - the latest revision's palette
  where one was saved - read in one query that qualifies its subquery's
  columns by hand (see the drizzle note above).
- **The 2026 designs for the new pages** (agent-outputs has none; the source
  was a Claude Design export). Sign-in, sign-up and the password pages share
  `AuthShell` and `AuthForm.module.css`: a 440px card on warm paper, under a
  white bar carrying the way back and the lockup, provider buttons above an
  "or" rule. The shell is a server component, and each thing that reads
  `?next=` - the back link, the form - sits in its own Suspense boundary.
  Reading it in the shell put the boundary at the top of the page and bailed
  the whole route out to client rendering, exporting HTML with no markup in
  it; nothing catches that, because the build succeeds and the pages are
  `noindex`. `/studio` leads with one button - "Generate websites", the three
  directions - and keeps "Make my website" and "Match from the library" as
  text actions under it; the photo dropzone uploads to `/api/uploads` with
  each file's note before the generate call, and a description typed before
  signing in survives the round trip in `sessionStorage`. On
  `/studio/results` Preview is still a real link to the full page, and a
  plain click opens `PreviewDialog` instead: the packaged download with the
  direction applied, in an iframe, built by the same `buildPreviewDocument`
  the preview route uses. The account pages sit under the shared masthead in
  its light tone (initials on the right, a menu with the account's pages and
  Sign out) and the admin pages under a sidebar shell whose
  "Export users" writes the directory as CSV in the browser. All of it is
  responsive down to 390px; the account and admin tables collapse to stacked
  rows, the admin rows labelling their cells once the header row is gone.
- **Pages.** `/account/{sites,uploads,usage,settings}` under one nav;
  `/verify-email` is where the confirmation link lands (`callbackURL` on
  sign-up), `/forgot-password` and `/reset-password` use better-auth 1.7's
  `requestPasswordReset`; `/s/?id=&n=` is a site at one revision, read-only.
  Every per-item page takes `?id=` - the export cannot enumerate ids.
- **Admin.** better-auth's `admin()` plugin supplies `role`, the ban fields
  and impersonation; its columns are transcribed into `schema.ts` and are
  migration 0004. `/api/admin/*` answers **404** to anyone without
  `role = 'admin'` - the pages hiding themselves is cosmetic. The first admin
  is either `ADMIN_EMAILS` (a comma-separated var or secret; the role is set
  on sign-up, or on the next sign-in for an account that already exists) or
  `npm run admin:grant -- you@example.com` (a D1 UPDATE; `--remote` for
  production); after that `/admin/users` does it through the client plugin.
  The caps page is read-only because the caps are constants.
- **`ADMIN_EMAILS` promotes in front of the endpoint, not in a session hook,
  and `/api/health` counts it.** Three things make this setting look broken
  when it is working, and all three are now answerable. It takes effect on the
  *next sign-in*, so a reload on a session minted before the setting existed
  does nothing. It has to be a **Secret**, not a plain-text variable: a Text
  variable added in the dashboard is replaced by this repo's own `vars` block
  on the next `wrangler deploy`, silently, while a Secret survives - so
  `/api/health` reports `adminEmails`, the count of configured addresses and
  never the addresses, and a zero there with the variable visibly set on the
  Worker is the whole diagnosis. And the promotion runs from a `hooks.before`
  middleware on `/sign-in/email` rather than from `databaseHooks.session
  .create.after`, because `signInEmail` reads the user row, creates the
  session, and only then calls `setSessionCookie` with the row it read
  *first*: with `cookieCache` on, a role written from the session hook lands
  in D1 and is missing from the very session that triggered it, so the nav
  drew no Admin link and `/admin` said "Not found" for five minutes after
  doing everything right. The session hook stays as the catch-all for paths
  that learn the address too late (a social callback, a verification link);
  one `grantConfiguredAdmin` statement serves both, so the rule has one
  implementation. `worker/test/admin.test.ts` pins the *session*, not just
  the row - the row passing is what let this ship.

`worker/test/*.test.ts` sign up real users and follow the verification link
out of `dev_mail`; run them **after** a build, not during one: `next build`
empties `out/` and the assets binding reads from there, which reads as a
random failure in `beforeAll`. Each test file pays its own setup (about 10s),
so a new test joins an existing file unless it needs a fresh database.

## Agent-facing docs - all generated, never hand-edited

Five build artifacts describe the catalog to tools that can't see the
patterns. They're gitignored and regenerated on every build, so edit the
generators, not the output:

- `packages/tabbied/catalog.json` - written by the package's
  `scripts/codegen.mjs` from the same `patterns/*.json` it compiles, exported
  as `tabbied/catalog.json`. Carries each design's description, its
  closed-vocabulary metadata (`tags`/`mood`/`density`/`goodFor` - see below),
  its `preview` image URL, palette, options, and SVG-export tier - but
  **not** the css-doodle `code`, which is what keeps it readable.
- `packages/tabbied/llms.txt` - the full agent reference, written by the
  package's `scripts/generate-llms.mjs` during its build (so a publish can't
  ship without it; it's in the tarball `files` along with the hand-written
  `AGENTS.md`).
- `public/llms.txt`, `public/llms-full.txt`, `public/catalog.json` - the
  site's copies, written by the root `scripts/generate-llms.mjs`, a thin
  wrapper over the package generator. One template, two consumers.

Codegen re-implements `supportsSvgExport()` because it runs before tsc and
has no compiled module to import. `test/catalog.test.mjs` pins it against the
real implementation - if you change the rule in `types.ts`, change it in
codegen too or that test fails.

**Catalog metadata is a closed vocabulary.** Every `patterns/*.json` carries
`tags` (visible motifs), `mood`, `density`, and `goodFor`, validated by
codegen against `packages/tabbied/scripts/catalog-vocabulary.mjs` - an
out-of-vocabulary value or a missing field fails the build. The values were
authored by *looking at each rendered preview* (not the description), so when
adding a design, look at it before tagging it; when adding a vocabulary term,
remember published catalogs query these exact strings. The metadata is
catalog-only: codegen strips it from the runtime bundle, and a test pins that.

**Every design ships a committed preview** at `public/previews/<slug>.webp`
(authored palette, default options, seed `preview1`, rendered @2x - at @1x
the finest stipples vanish). `check:previews` (prebuild/predev) fails on a
missing or orphaned file; regenerate with `npm run previews [slug]`. The
catalog points agents at these URLs, which is why they're committed rather
than rebuilt per deploy - a headless browser isn't available on the deploy
build, and stable URLs shouldn't re-render anyway.

The package also ships a `tabbied` bin (`src/cli.ts`): `render` (SVG/PNG,
`--frames` for deterministic PNG sequences) and `list`/`info` over the
catalog. It acquires a browser from whichever Playwright is installed -
never add a hard Playwright dependency to the package.

## Grid snapping - invariant (full reference: docs/grid-snapping.md)

css-doodle lays its grid out as `repeat(n, 1fr)`, so a container that isn't
divisible by `n` puts every cell boundary on a sub-pixel and the browser draws
a hairline seam at each one. `fit: "grid"` therefore **oversizes its canvas**:
`applyGridSnap` sets it inline to `snapSpanToTracks(hostSpan, tracks)` (the
smallest multiple of the track count that still covers the box) and the host
clips the sub-cell overflow with `overflow: hidden`. Don't "simplify" that
back to `width: 100%`.

The cell is snapped to a whole multiple of `sizing.cellMultiple` (default 2),
not merely to a whole pixel: a design that subdivides its cell seams at
`cell / n` if the cell doesn't divide, however exact the outer track is. Only
`subdivide` (2), `fractal` (3) and `matryoshka` (4) - the three that mask the
cell with a 2, 3 or 4 grid of their own - declare their own.

The cell is also **squared** - `applyGridSnap` uses the larger of the two
snapped cells on both axes. Well over a hundred designs rotate a cell by a quarter
turn, which swaps an oblong's axes and leaves a strip uncovered (a 120×124
cell paints 124×120 rotated). Cobalt Works' coda seamed on exactly that.

The snap is an inline style on the `<css-doodle>` element, *not* a change to
`@size` in the generated source - the source feeds SVG export and the
definitions' `${width}`/`${height}` substitution, and neither should move
because a container happened to be 1441px wide. Two traps: a CSS class can't
set the box (`resolveBoxStyle` writes width/height inline on the wrapper, so a
class loses), and css-doodle caps grids at 64×64, so a box implying more
columns than that silently rescales the cell and puts the seams back.

`cover` scales its render box with a transform, so snapping alone does nothing
there - measured: 6 interior seams with integral tracks under a fractional
scale, 0 once `fitRenderToBox` quantized the scale so `cell × scale` is whole
(rounded up, translate rounded). Both halves are required; the render-box snap
only exists to give the quantizer a whole cell.

## What a design costs to generate - once, not per cell

css-doodle evaluates `--rule` once per cell and writes the result into a
block of its own, so a value that is the same in every cell is copied into
every cell: evolute's 240-point `@shape`, written twice, came to 3.4 MB of CSS
at the editor's densest plate; blossom and sparkle, on gallery page 1, 1.7 MB
each. `scripts/pattern-cost.mjs` measures every design the way the editor
draws it (418x646, 36px cells, through `createPattern`) and `npm run
check:pattern-cost` fails CI on any over 300 KB of CSS or 800 nodes. Three
things keep a design under it:

- **Compute a shared value once, on `:doodle`, and read it with `@var`.**
  `:doodle { --shape: @shape(...) }` in the design's `code.doodle`, then
  `clip-path: @var(--shape)` in the rule: the host holds the value and every
  cell inherits it. `@var`, never `var()`: the latter is substituted when the
  host computes `--rule`, before `:doodle` exists, and the design paints
  nothing (see below). Pixel-identical for evolute, blossom, sparkle, fractal,
  drypoint, charcoal, linocut, reedpen, crosslattice (inside its nested doodle)
  and sunsetrings, whose 50-ring stacks depend only on the row's and the
  cell's parity and are four `:doodle` values picked by `@match`. PNG export
  carries it: css-doodle copies the host's computed custom properties onto
  the exported `.host`.
- **A per-cell random mask is gradient layers, not a nested `@doodle`.**
  matryoshka and subdivide drew a random 4x4 and 2x2 `@doodle` per cell, and
  twice (`-webkit-mask` and `mask` each rolled their own, and only the second
  painted): 374 images to rasterize, a second to generate. `@m(4, linear-
  gradient(90deg, @p(...) 0 25%, ...))` is the same distribution with no
  image at all. It re-rolled their pictures (the previews were regenerated),
  and it needed the SVG exporter to paint a small `no-repeat` layer once
  rather than across the box (docs/svg-export.md).
- **A design whose cells are a count of things declares `sizing.maxCells`.**
  radiantswirl's rings, driftspiral's dots, turbulentsunburst's rays: every
  cell is a full-canvas layer placed by `@i`, and the density a grid is
  derived from knows nothing of that, so the editor's finest density drew 187
  rings where the design offers 12 to 28. The cap is the largest count the
  grid option offers; the eight such designs carry one.

## Importing a pattern authored outside this repo

The September 2026 drop was 60 hand-authored designs from a standalone
css-doodle editor. 43 shipped as gallery orders 3000-3042; the 17 "river
study" files did not (see the follow-up issue). Adding a batch from outside
is mostly mechanical, and four things are not:

- **`var(--x)` in a rule body is fatal, and silently so.** Tabbied mounts a
  design with `use="var(--rule)"`, so the host computes `--rule` first and
  substitutes every `var()` inside it. A helper property the host does not
  define makes the whole declaration invalid at computed-value time, and the
  design paints *nothing* - no console error, no partial render, just the
  ground color. That is why the house rule says a rule-local custom property
  is read with css-doodle's `@var(--x)`, which resolves at generation time,
  before CSS sees it. Exactly 12 of the 43 arrived with `var(--x)` and all 12
  were blank; nothing else in the batch was. An editor that splices the rule
  in literally, as the source editor did, never hits this, so a design can
  look finished and still be un-mountable here.
  Two relatives of the same failure: `@var()` is not expanded inside the
  `@size` directive, and a `var(--colorN)` past the end of the palette is the
  same invalid value (`softbubbles` picked `--color5` with five colors).
- **The grid belongs to `fit: "grid"`, not to the design.** `buildSource`
  overrides the grid option with tracks derived from the host, so a design
  that treats cell count as "how many things to scatter" gets whatever number
  the container implies. Density comes from a `@random(${shapeFrequency})`
  gate, which is why every design here has one.
- **Metadata is authored from the render, not the prose.** The drop's own tags
  were largely out of vocabulary, and mapping them by hand from the
  descriptions put `stripes, gradients` on a basket weave. Render the previews
  first, look at them, then tag.
- **A nested `@doodle` canvas and a `@keyframes` animation are both paid
  for per cell, per card, and the gallery holds 24 cards.** Five of the 43
  arrived nesting a `@doodle` on a 10,000px (one on a 100,000px) canvas, the
  editor trick that rotates a huge tile so it covers any host; css-doodle
  renders a sized nested doodle as an SVG image, and on WebKit (Safari, and
  every browser on iOS) it rasterizes that to a PNG canvas of the declared
  size first, 400 MB at 10,000px and beyond any canvas limit at 100,000px.
  Seven arrived with keyframe animations, four of them authored
  `animation-play-state: paused`: an animated cell is a compositing layer
  whether it moves or not, so those four cost 131 layers per card for a
  still image, and page 14 asked for 317 layers (267 MB of textures at 1x,
  nine times that on a phone). That is what crashed the gallery's pages 13
  and 14 on iOS and slowed them on desktop. The tile only needs the rotated
  square to cover its own tile (`scale >= 1.42`, which all five have) and a
  side longer than any host, so 3,000px; and the package moves patterns by
  reseeding, not by keyframes, so the animations went. `node
  scripts/gallery-cost.mjs --page N` (or a list of slugs) measures a design
  the way the gallery pays for it: nodes across shadow roots, SVG image
  documents, compositing layers and their texture bytes. Run it over a new
  batch before it reaches a page; anything past a few layers a card wants a
  reason.
- **The SVG tier is measured, never assumed, and a throw is the easy half.**
  10 of the 43 threw, for constructs the converter has no primitive for
  (double and dashed borders, a border on a partially-rounded box, `matrix3d`,
  `color-mix()`, `repeating-conic-gradient`). Another 18 exported happily and
  disagreed with the canvas, from 1.3% of pixels up to all of them. Only
  `scripts/svg-parity-sweep.mjs` tells those apart, so run it over every new
  design and set `svgExport: false` on anything that throws or misses the
  threshold; both groups are tabulated in docs/svg-export.md.

## Reduced motion - invariant

A pattern moves three ways, and `prefers-reduced-motion` has to stop all of
them. The `redrawInterval` timer is the obvious one. The second is that
**all 338 designs declare a ~400ms `transition`** - the thing that makes a
redraw morph rather than cut - and it fires on any re-render, including ones
nobody asked for: `grid` and `cover` re-derive their cell grid on resize, so
turning a phone would otherwise animate every cell on the page. The third
arrived with the September drop: seven designs declare `@keyframes`
animations that run for as long as the element lives (a sunburst that turns,
bands that drift), four of them authored `animation-play-state: paused` and
three not.

`createPattern` mutes them by injecting `transition: none !important` and
`animation-play-state: paused !important` into the shadow root (the generated
cell styles live there; a light-DOM rule can't reach them). The same override
suppresses the first paint for two frames - under reduced motion it simply
never lifts. Paused, not `animation: none`: a paused animation holds its
first frame, which is the still the four already-paused designs show, while
`none` would also drop a `to` state.

Two things that look redundant and are not:

- **`ensureMuted()` after every `element.update()`.** css-doodle regenerates
  the shadow root when the grid changes, which takes the injected `<style>`
  with it. Without the re-assert the mute holds at mount and is gone after the
  first resize-driven re-render - i.e. it fails in exactly the case it exists
  for. `e2e/package.spec.ts` covers this by resizing and asserting the cell
  transition-duration is still 0ms.
- **The `change` listener on the media query.** The preference is observed,
  not read once: `syncRedrawTimer` only re-checks on a config change, so a
  toggle mid-session would otherwise leave a running timer ticking.

## SVG export - invariants (full reference: docs/svg-export.md)

The native SVG exporter (`packages/tabbied/src/core/svgExport.ts`) converts
rendered patterns to true vector SVG. Rules that must not regress:

- **Support tiers are metadata-driven.** `"svgExport": false` marks the 32
  designs SVG cannot represent: the original four smooth conic sweeps (coil,
  spectrum, pinwheel, wedge) plus 28 from the September drop, and the editor
  *disables* "Download SVG" for all of them. `"svgExportNote"` on a definition
  (9 designs) documents limitations - filter-based effects or ≤1px
  deviations. The option-level form still works but no design uses it: the
  Shadow toggle that was its only user was removed rather than left as an
  export trap. Everything else (297) is clean.
  See docs/svg-export.md for the complete lists and reasons.
- **The tier is measured, not read off the source.** Ten of the drop's
  designs throw; eighteen more export a plausible SVG that is not what the
  canvas shows, one of them differing on every pixel, and *nothing warns* -
  the converter is as confident about those as about a correct export. So a
  new design's tier comes from running `scripts/svg-parity-sweep.mjs` over it,
  never from judging its CSS.
- **Limited exports must warn before downloading**: a right-aligned amber
  `TriangleAlert` on the "Download SVG" item (desktop menu + mobile panel)
  and a Base UI **`Dialog`** (not `AlertDialog` - outside-click must
  dismiss) titled "About this SVG export" listing the active notes, with
  Cancel / Download SVG. No notes -> download directly, no dialog.
- **Fail loudly, never silently wrong**: unsupported CSS throws
  `SvgExportUnsupportedError`. New patterns must either stay inside the
  supported CSS subset, extend the converter, or set `svgExport: false`
  (+ note). Batches 11 and 12 are authored to be clean throughout and share
  their lints (`scripts/pattern-gen/pattern-lints.mjs`) and their two gates
  (`svg-sweep.mjs`, `render-sweep.mjs`); a batch generator owns a *bounded*
  range of gallery orders and deletes anything in range it no longer defines.
  Verify with `node scripts/svg-parity-sweep.mjs <slug>` and keep
  `e2e/svg-export.spec.ts`'s representative list + thresholds in sync.
- **Bundle contract**: the converter (~21 KB gz) is lazy-loaded by
  `exportSvg()`; `core/index.ts` re-exports only its *types*
  (`supportsSvgExport` lives in `types.ts`); `dist/core/svgExport.js` must
  keep zero runtime imports (tests inject it into pages).
- **Parity testing** compares against live element screenshots (css-doodle's
  own foreignObject export is unfaithful for conic masks) with an
  anti-aliasing-tolerant diff.


## The pattern editor's background image

`/patterns/<slug>` can put a picture behind the pattern instead of a color:
a third chip beside the ground swatch and the transparent toggle. Three things
follow from how the ground is actually painted:

- **Choosing a picture makes the ground transparent**, because every design
  paints `--color0` on its own container inside the doodle, so nothing behind
  the host shows unless color 0 is `#rrggbb00`. The picture is drawn on the
  stage frame around the host, cover-fitted. Removing it puts the color back
  only if there was one (a ground that was already transparent stays so), and
  a palette chip applied while a picture is set keeps the ground transparent
  rather than covering the picture.
- **The picture is local and stays local.** It is an object URL: not in the
  query string, not in a saved palette, not in the shared link, and "Copy
  shareable link" says so in its toast. Nothing about it reaches the
  `tabbied` package.
- **Both exports carry it.** PNG asks css-doodle for `detail` rather than
  `download`, gets the pattern alone with its transparent ground, and draws
  it over the picture on a canvas at the export's size. SVG embeds the
  picture as a data URL in an `<image>` that is the root's first child, cover
  fitted to the viewBox, so the converter's own primitives paint over it
  exactly as the pattern paints over the stage.
