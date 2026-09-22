# Remove the editor's aspect ratio - implementation plan - 2026-09-22

A scoped implementation plan for a coding agent, not a strategy. Tabbied now
targets digital mediums (embeds, hero fields, template sites) rather than
prints and posters, and the pattern editor's canvas ratio is a print idea: a
plate that is 2:3 or 1:1 before it is anything else. This plan removes that
idea end to end and says what the editor draws instead. Section 8 is the
summary of potential issues; section 9 lists the decisions this plan takes
so nothing needs re-deciding, and the three that are the owner's.

Everything below was read off the code at commit `74ed15f` (main, 2026-09-22).

---

## 1. Two things are called "aspect ratio", and only one goes

**Goes: the canvas ratio.** `packages/tabbied/src/core/aspectRatio.ts` and
everything that reads it:

- the five ratios (`1:2`, `2:3`, `1:1`, `3:2`, `2:1`), their picker in the
  editor's Layout group (`renderRatioTile`, the `.ratioTile*` rules), and
  the ratio in the plate's caption;
- the `aspectRatio` parameter in `/patterns/<slug>/` share links;
- `PatternDefinition.defaultAspectRatio`, which 10 of the September designs
  set to `1:1` (`grep -l defaultAspectRatio packages/tabbied/patterns/*.json`
  lists them), passed through by codegen into `catalog.json` and typed as
  `CatalogDesign.defaultAspectRatio` in `tabbied-mcp`;
- the grid helpers that only exist to keep cells square on a chosen ratio:
  `deriveGrid`, `getGridOptions`, `gridToLevel`, `getCanvasSize`,
  `LONG_EDGE_COUNTS`, `GRID_LEVEL_COUNT`, `isAspectRatioId`,
  `ASPECT_RATIOS`, `ASPECT_RATIO_IDS`, `DEFAULT_ASPECT_RATIO`,
  `AspectRatioId`, all public exports of `tabbied`;
- the e2e tests and the llms.txt paragraph that describe the above.

**Stays: the `aspectRatio` box prop.** `PatternBoxSize.aspectRatio`,
`resolveBoxStyle`, the React prop, and every doc that names it (`README.md`,
`AGENTS.md`, `llms.txt`, `/docs/react`, the MCP `sizing` hint). It is CSS
`aspect-ratio` on the element an embed renders into, the documented answer to
the number-one integration mistake (a parent that sizes to content), and it
is the digital-medium feature rather than the print one. The owner confirmed
on 2026-09-22 that the picker is the target and the box prop stays.

Also untouched, because they only share the words: the CSS `aspect-ratio`
declarations in template stylesheets and site CSS (thumbnails, gallery
cells), and `ASPECT_RATIO` in `scripts/images/common.mjs` (the image vendor's
parameter for the offline collection pipeline).

## 2. What the editor draws instead

Today the plate is `fitToBox(ratio, 0.9 * stage)`, drawn `fit="fixed"` at
that size, and the design's `grid` option is forced onto the ratio's
five-grid list (`getGridOptions`), whatever list the design authored.

After: **the plate is the stage**, less the same 10% margin, in every layout
(the flex-filled pane on desktop, the 330px or 48vh band on phones, the whole
editor when expanded). There is no shape to choose. The shape is the
viewer's, exactly as an embed takes its container's. The grid is derived
from the plate the way `fit: "grid"` derives it from a container, at a
target cell size, and the density slider becomes one number from 0 to 1
that sets that cell size (below).

The plate keeps `fit="fixed"`, and the editor snaps the canvas *down* to
whole square cells before handing it over. Two reasons this is not simply
`fit="grid"`:

- `fit: "grid"` oversizes its canvas (`applyGridSnap`, docs/grid-snapping.md)
  and lets the host clip the overflow. Both exports read the element, not
  the host: css-doodle's `export()` renders the whole canvas and
  `doodleToSvg` snapshots it, so a PNG or SVG would carry a strip of cells
  the plate never showed. The SVG parity harness (`e2e/svg-export.spec.ts`,
  `scripts/svg-parity-sweep.mjs`) crops a screenshot to the `cssd-grid` rect
  and would compare a clipped paint against an unclipped export.
- Snapping down puts every track on a whole CSS pixel with the plate a few
  px inside the stage, which costs nothing here: nothing depends on the plate
  reaching the stage's edge. It also puts the parity harness into the
  integer-cell regime docs/svg-export.md calls the tight one.

Density becomes one number from 0 to 1 (the owner's request, 2026-09-22),
in the package and in the editor alike: 0 is the coarsest cell the slider
draws, 1 the finest. The mapping keeps today's five stops exact, so nothing
authored moves. The original plate was 360px wide and showed 2, 4, 6, 8 or
10 cells across at its five stops (180, 90, 60, 45 and 36px cells), and a
density walks that span continuously:

    cellPx = 360 / (2 + 8 * density)

so the former levels 0 to 4 sit at 0, 0.25, 0.5, 0.75 and 1, and 0.5 is the
60px cell most designs open at today. What changes on screen is the extent:
a desktop plate shows more cells and a phone band fewer (section 8, item 5).
The copied React snippet carries the number as the package's `density` prop,
and an embed under the default grid fit then draws the cells the editor
showed at the size it showed them, which is the point of previewing on a
fluid plate. Today the snippet writes `options={{ grid: '6x9', ... }}`, and
under the default fit that key is dead: `buildSource` overrides the grid
option whenever `fit === 'grid'`.

`density` exists today as an integer level 0 to 4, so this is a rescale of a
shipped prop, not a new one. Section 3.1 has the package side and section
8, item 14, the silent case it creates.

## 3. The package: `packages/tabbied`

### 3.1 Additions to `src/core/sizing.ts`, and the `density` rescale, with tests

Beside `snapSpanToTracks`, unit-tested in `test/sizing.test.mjs`:

```ts
/**
 * A whole-cell canvas that fits inside a box: the snap-down twin of
 * applyGridSnap, for a caller that would rather shrink than clip. `pinned`
 * keeps a grid already chosen (the editor keeps its arrangement while
 * expanded) and only re-fits the cell.
 */
export function fitGridToBox(
  width: number,
  height: number,
  targetCellPx: number,
  sizing?: PatternSizing,
  pinned?: { cols: number; rows: number }
): { cols: number; rows: number; cellPx: number; width: number; height: number } {
  const { cols, rows } =
    pinned ?? deriveGridForBox(width, height, targetCellPx, sizing);
  const multiple = Math.max(1, Math.round(sizing?.cellMultiple ?? 2));
  const cellPx = Math.max(
    multiple,
    Math.floor(Math.min(width / cols, height / rows) / multiple) * multiple
  );

  return { cols, rows, cellPx, width: cols * cellPx, height: rows * cellPx };
}

// The original editor plate: 360px wide, 2 to 10 cells across over its five
// density stops. A density in [0, 1] walks that span continuously, so the
// former levels 0..4 sit at 0, 0.25, 0.5, 0.75 and 1.
export const DENSITY_REFERENCE_PX = 360;

/** Target cell size for a density in [0, 1]: 180px at 0, 36px at 1. */
export function densityToCellPx(density: number): number {
  const d = Math.min(Math.max(density, 0), 1);

  return DENSITY_REFERENCE_PX / (2 + 8 * d);
}

/**
 * The density whose cell, on the original 360x540 plate, has the long edge
 * of a "colsxrows" grid; null when the value is not one. Reads a preset's
 * authored default and the old editor's `grid=8x12` links: 6x9 is 0.5,
 * 10x15 is 1, and anything finer clamps to 1.
 */
export function densityFromGrid(grid: string): number | null {
  const parsed = parseGridValue(grid);

  if (!parsed) return null;

  const longEdge = Math.max(parsed.cols, parsed.rows);
  const cellPx = 540 / longEdge;
  const density = (DENSITY_REFERENCE_PX / cellPx - 2) / 8;

  return Math.round(Math.min(Math.max(density, 0), 1) * 100) / 100;
}
```

The rescale, in `createPattern.ts` and `react/TabbiedPattern.tsx`:
`clampDensity` clamps to [0, 1] without rounding, `targetCellPx` reads
`densityToCellPx(config.density)`, `DENSITY_CELL_PX` is deleted, the React
prop becomes `density?: number` with the doc comment "0 coarse to 1 fine, an
alternative to cellSize", and the controller logs one `console.warn` per
page when a density above 1 arrives, naming the old-to-new mapping.
`hydrate.ts` and `tabbied-templates` pass the number through and need no
change. Section 8, item 14, lists what has to migrate.

Tests to write: the fitted canvas never exceeds the box; `cellPx` is a
multiple of `cellMultiple` (2 default, 3 for fractal, 4 for matryoshka);
`pinned` is honoured and only the cell changes; a box smaller than one
multiple still returns a positive cell. For `densityToCellPx`: 0 is 180,
0.25 is 90, 0.5 is 60, 0.75 is 45, 1 is 36, and a value outside the range
clamps. For `densityFromGrid`: `2x3` is 0, `6x9` is 0.5, `8x12` is 0.75,
`10x15` is 1, `80x1` is 1, `9x9` is 0.5, `7x7` is 0.33, `8` is null.

### 3.2 Removals

| File | Change |
| --- | --- |
| `src/core/aspectRatio.ts` | Delete. |
| `src/core/index.ts` | Drop `export * from './aspectRatio.js'`. |
| `src/core/types.ts` | Drop the `AspectRatioId` import and the `defaultAspectRatio` field. |
| `patterns/*.json` (10 files) | Remove the `defaultAspectRatio` key. |
| `scripts/codegen.mjs` | Drop the `defaultAspectRatio` pass-through into the catalog (the spread near line 187). |
| `scripts/generate-llms.mjs` | Rewrite the share-link scheme (section 6). |

### 3.3 Comments that name the old plate, values that stay

- `DENSITY_CELL_PX` goes with the levels; its provenance (the 360px plate
  at 2 to 10 cells across) lives on `DENSITY_REFERENCE_PX`. `DEFAULT_CELL_PX`
  stays 36, which is now `densityToCellPx(1)`: a consumer that passes
  neither `cellSize` nor `density` sees no change.
- `DEFAULT_FIXED_SIZE`: "the editor's original 2:3 preview footprint". The
  value stays: `fit: "fixed"` consumers that pass no size rely on it, and
  `/docs/react` documents 360x540. Reword to say it is the package default.
- `deriveGridForBox`: "Generalizes deriveGrid() from the five preset aspect
  ratios" describes a function that no longer exists. Reword.
- `doodleSource.ts` line 96: "stretching with the aspect ratio" is about the
  box's shape; reword.

### 3.4 Changeset

`npm run changeset`, `tabbied` **minor** (the package is 0.x; #55 shipped
its removals of `contain`, `lockAspectRatio` and four helpers as 0.5.0 with a
"Breaking changes" list, and that changelog entry is the model). Name every
removed export, the removed definition field, the `catalog.json` change, and
the two additions. `tabbied-mcp` gets a **patch** for the type.

## 4. The MCP package

`packages/tabbied-mcp/src/types.ts`: drop `defaultAspectRatio` from
`CatalogDesign`. The type is structural and optional, so a server reading an
older `catalog.json` over HTTP still works (unknown keys are ignored as they
are today). No test references the field; `get_design` spreads the whole
design record, so its output loses the key for the 10 designs.

## 5. The editor: `components/edit-pattern-page/EditPattern.tsx`

1. **Imports.** Drop `AspectRatioId`, `ASPECT_RATIOS`, `ASPECT_RATIO_IDS`,
   `DEFAULT_ASPECT_RATIO`, `deriveGrid`, `getGridOptions`, `gridToLevel`,
   `isAspectRatioId`. Add `densityToCellPx`, `DEFAULT_FIXED_SIZE`,
   `fitGridToBox`, `densityFromGrid`. The local `GRID_OPTION_ID` can be the
   package's export of the same name. Delete `fitToBox`, `RATIO_GLYPH_SIZE`,
   `defaultAspectRatio`, `aspectRatioFromQuery`, the `aspectRatio` state,
   `changeAspectRatio`, `renderRatioTile`, and the "Aspect ratio" field in
   the Layout group.

2. **Density state.** `gridIndex` and `hasGrid` as now. A `density` state
   (0 to 1) initialised by `densityFromQuery()`: the `density` param when it
   parses as a number in range, rounded to two decimals; else a legacy
   `grid=CxR` param through `densityFromGrid`; else
   `densityFromGrid(String(option.default)) ?? 0.5`.
   The grid option's slot in `optionValues` stops being state: keep the
   array shape, but `optionFromQuery` returns `option.default` for it, the
   two sync effects skip it, and nothing reads it.

3. **The plate.** Replace the `fitToBox` block:

   ```ts
   const box = previewSize
     ? {
         width: Math.round(previewSize.width * PREVIEW_FIT_MARGIN),
         height: Math.round(previewSize.height * PREVIEW_FIT_MARGIN),
       }
     : DEFAULT_FIXED_SIZE;
   const plate = hasGrid
     ? fitGridToBox(
         box.width,
         box.height,
         densityToCellPx(density),
         pattern.sizing,
         pinnedGrid.current ?? undefined
       )
     : { ...box, cols: null, rows: null };
   ```

   `pinnedGrid` is a ref. The expand toggle sets it to the current
   `{cols, rows}` before `setIsExpanded(true)` and clears it on collapse, so
   expanding scales the cells and keeps the arrangement (section 8, item 4).
   The unmeasured fallback only feeds handlers; the pattern is still drawn
   only once `previewSize` exists.

4. **Pattern props.** `options` gets `grid: \`${plate.cols}x${plate.rows}\``
   when `hasGrid`; `<TabbiedPattern fit="fixed" width={plate.width}
   height={plate.height} />` otherwise as today. `fit="fixed"` substitutes
   `config.options.grid` straight into `@grid`, which is what makes the
   snapped canvas exact.

5. **URL sync.** The outbound effect writes `density` when `hasGrid`, skips
   the grid option in its options loop, and no longer writes `aspectRatio`;
   its dependency list swaps `aspectRatio` for `density`. The inbound effect
   compares `densityFromQuery()` with `density`, drops the ratio branch, and
   skips the grid option. A legacy link is rewritten to the canonical form on
   load, as any non-empty query already is.

6. **Copy React component.** Omit the grid option from `optionsLiteral`; add
   `density={density}` after `seed` when `hasGrid`. The comment line about
   `height`, `maxWidth` or `aspectRatio` bounding the box stays true.

7. **Caption.** `captionParts` is the palette name and, when `hasGrid`,
   `${cols}\u00D7${rows} grid`. No ratio.

8. **Layout controls.** The grid option's slider is `min 0`, `max 1`,
   `step 0.05`, `value={density}`, `onChange={setDensity}`, readout the
   plate's `cols x rows`; the frequency slider beside it steps by 0.1 over
   0.2 to 1, so the two read as one kind of control. A tick that changes
   `cols x rows` redraws the arrangement live, as a frequency tick does;
   section 8, item 15, says what to do if that reads as flicker. Other
   option types are unchanged. Render the Layout
   `<section>` only when it has content: 12 designs have no options at all
   and 16 have no grid option, and the ratio picker was the only thing that
   guaranteed the group a control.

9. **Export.** `exportPattern`'s `scale = ceil(3000 / max(width, height))`
   reads the plate. Unchanged in spirit.

10. **CSS.** Delete `.ratioTiles`, `.ratioTile`, its hover, active and
    focus rules, and `.ratioGlyph` from `EditPattern.module.css`. Nothing
    else in the sheet is ratio-specific: `.doodleFrame` is an inline block
    sized by the pattern's inline width and height, and the stage rules
    already accept any shape.

## 6. Docs, generated text and CLAUDE.md

- `packages/tabbied/scripts/generate-llms.mjs`, the "Share links" section:
  the scheme becomes
  `/patterns/<slug>/?seed=<seed>&palette=<color0>&palette=<color1>&...&density=<0-1>&<optionId>=<value>`,
  `density` is a number from 0 (coarse) to 1 (fine), the same scale as the
  `density` prop,
  the `grid` option is derived from the viewer's screen and not part of a
  link, and unknown or out-of-range values still fall back to defaults. Drop
  the sentence naming the ratio ids. `npm run llms` regenerates the site
  copies; nothing is hand-edited.
- `docs/svg-export.md`, "Cell boundaries: integer vs fractional": the
  paragraph about the editor's 364x546 plate and 60.66px cells is false
  after this change (the editor snaps to whole cells). Rewrite from the new
  measurements (section 7); `SVG_CELL=301` stays the way to reproduce
  fractional cells, which `cover` embeds can still produce.
- `docs/grid-snapping.md`, the sentence citing the editor's 364x546 preview.
- `CLAUDE.md`: in "The 17 September updates", the bullet that says grid
  density is a slider over `getGridOptions(ratio)` with `gridToLevel` putting
  a shared URL's thumb on its level. Replace with the density-level story
  and add a short "The editor's plate" note carrying the four things worth
  not re-litigating: `fit="fixed"` with a snapped-down canvas rather than
  `fit="grid"` (exports and the parity harness read the element); density is
  a cell size in px because that is the embed's unit and it keeps the copied
  snippet honest; expand pins the grid; the `aspectRatio` box prop is a
  different thing and stays.
- `app/docs/react/page.tsx`: the props table types `density` as
  `0 | 1 | 2 | 3 | 4` with default `4`, and the fit-modes list says
  "`density` (0-4)". Make it `number`, default `1`, "0 is the coarsest cell
  (180px), 1 the finest (36px); 0.5 is the 60px cell most designs open at".
  Its three `density={1}` samples become `0.25`. The sentence that `fixed`
  is "what the Tabbied editor uses" stays true. The doc comments on the
  `density` field in `createPattern.ts` and `TabbiedPattern.tsx` say "level
  0..4" and change with the type; the README and llms.txt attribute tables
  only name `data-density` and need nothing.

## 7. Tests

**Package** (`npm test --workspace tabbied`): section 3.1's tests, plus one
line in `test/catalog.test.mjs` asserting no design carries
`defaultAspectRatio` (codegen does not reject unknown keys, so a JSON that
re-adds it would flow into the runtime bundle unnoticed).
`test/hydrate.test.mjs` round-trips `density: 2`; make it `0.5`. In
`tabbied-templates`, `test/extract.test.mjs` reads `data-density="1"`; make
it `0.25` (pass-through either way, but the fixture should not teach the
old scale).

**e2e smoke** (`e2e/smoke.spec.ts`), five tests encode the old scheme:

- "pattern editor renders the css-doodle and controls": the readout is no
  longer a literal `6x9`; assert it matches `/^\d+\u00D7\d+$/`.
- "changing an option syncs to the URL query": expect `density=0.5`, then
  ArrowLeft gives `density=0.45` and a changed readout.
- "changing the aspect ratio remaps the grid to keep square cells": delete.
  Replace with "the plate fits the stage on whole-pixel cells": read the
  shadow grid's tracks the way `e2e/package.spec.ts`'s `gridTrackPx` does,
  assert every track is an integer and the canvas sits inside
  `.previewWrapper`.
- "gallery cards link with a seed so edits sync to the URL": ArrowRight gives
  `density=0.55`, not `grid=8x12`.
- "editor opens directly in the state described by a shared URL": open
  `?seed=ZZZZ&density=0.5` and assert the slider's `aria-valuenow` is 0.5.
  Add a legacy case: `?seed=ZZZZ&grid=9x9&aspectRatio=1%3A1` opens at
  `aria-valuenow` 0.5 and the URL is rewritten to carry `density=0.5` and
  no `aspectRatio`.

The readout depends on the viewport now, so assert `aria-valuenow` and the
URL's `density=`, never a literal grid.

**SVG parity** (`e2e/svg-export.spec.ts`): no code change, but the canvas it
measures changes shape and moves to integer cells. Run the representative
set through `npm run build && npm run test:e2e`, then
`SVG_FULL_SWEEP=1 npx playwright test e2e/svg-export.spec.ts` once locally.
The `stepramp` headroom and its comment were written for 60.66px cells and
should become unnecessary; tighten `PER_PATTERN_MAX` where the numbers
allow, never loosen.

**Manual pass**, at desktop and at 390px, collapsed and expanded: `radius`
(the default look), `subdivide`, `fractal` and `matryoshka` (cell multiples
2, 3, 4: no seams), `driftspiral`, `horizonbands`, `tidewashbands` and
`concentricrings` (section 8, item 6), `confettitriangles` (no options: no
empty Layout group), and a legacy link with `grid=9x9&aspectRatio=1%3A1`.
Export a PNG and an SVG from one design and check they are the plate's size
with no strip beyond it.

## 8. Potential issues

1. **It is a breaking change to the published `tabbied` package.** Eleven
   exports removed, `DENSITY_CELL_PX` removed, a definition field removed,
   `catalog.json` loses a key on 10 entries, and the `density` prop changes
   scale (item 14). JavaScript callers of a removed export get `undefined`
   silently; TypeScript callers get an error. The precedent is #55 (0.5.0),
   which removed a fit mode and four helpers as a minor with a "Breaking
   changes" list; do the same and name everything.

2. **A share link stops pinning a picture.** Today seed, ratio and grid
   reproduce one image on every screen. After, the grid comes from the
   viewer's plate, so the same link is a different arrangement on a
   different screen, and the PNG or SVG downloaded from it differs too.
   This is the embed's behaviour (`fit: "grid"` re-derives per container)
   and it is consistent with the stated goal, but anyone who has been
   sharing editor links *as images* loses that. If it matters, honour an
   explicit `grid=CxR` as a pin (read, never written). This plan does not:
   it reads `grid=` only as a legacy density.

3. **Exports take the plate's shape, which is the window's shape.** There is
   no longer a way to ask the editor for a 2:3 poster at 3000px; the
   3000px-long-edge rule stays and applies to whatever the plate is. A
   "download at a size" is an off-screen render, which the CLI and MCP
   `render` already do at any `--size`; it is not a ratio picker and not
   this PR.

4. **Expand and resize can re-roll the arrangement.** Same seed plus a
   different `cols x rows` is a different layout (inherent, see
   `GRID_RESIZE_DEBOUNCE_MS` in `createPattern.ts`). Today expanding scales
   the same picture; after, an unpinned re-derivation would redraw it. The
   plan pins the grid while expanded. A window resize that crosses a cell
   boundary still re-rolls, as every embed does; if that proves noisy in
   use, debounce the derivation (the package waits 180ms).

5. **Density is now a cell size, and a phone shows fewer cells.** Today the
   2:3 plate is scaled into the phone band (about 200x300 at 6x9, so 33px
   cells). After, 0.5 is 60px cells in a plate of about 322x268: 5x4.
   That is what an embed on that phone draws, which is the point, but the
   phone preview reads coarser than today. The alternative (density as a
   count along the long edge, as `LONG_EDGE_COUNTS` was) keeps today's look
   on every screen and makes exports predictable (9 across at 0.5), but
   the copied snippet cannot then express it honestly, because `density`
   and `cellSize` are px. The plan takes px. If the phone preview is judged
   too coarse, scale the target cell by `min(1, shortEdge / 360)` on the
   band only, and write the resulting `cellSize` into the snippet there.

6. **27 September designs have a grid list the editor never honoured.**
   Their `grid` options are single numbers (`5..9`), one-row or one-column
   strips (`40x1`, `1x72`) or squares (`8x8`). Today the editor swaps that
   list for the ratio's (`driftspiral` opens at `80x1` and the slider's next
   stop is `12x12`), and `gridToLevel('8')` is 0, so the eleven
   single-number designs open at the coarsest stop. After, every one gets a
   derived two-dimensional grid, as they already do under `fit: "grid"` on
   every template page, and `densityFromGrid` falls back to 0.5 for a
   single-number default. Look at all 27 after the change. A design that
   only reads right as one strip (`driftspiral`, `marbledarcs`,
   `radiantswirl`, `spiralrosette`, `turbulentsunburst`, `confettidotfield`,
   `warpribbon`, `tidewashbands`) is an authoring question (a `sizing` hint,
   or a fixed `@grid` in the doodle, the way the 16 grid-less designs are
   written) for a separate PR, not a reason to keep the ratio.

7. **The SVG parity harness measures the editor.** `e2e/svg-export.spec.ts`
   and `scripts/svg-parity-sweep.mjs` open `/patterns/<slug>/` and compare
   the live canvas against its export. The geometry changes: integer cells
   (better), a landscape plate whose size follows Playwright's default
   1280x720 viewport. Re-measure with the full sweep before touching any
   threshold, and rewrite the two doc paragraphs that explain the old
   364x546 case from the new numbers.

8. **Five e2e smoke tests encode the old URL scheme** (section 7). Their
   readout assertions are viewport-dependent now and have to move to the
   slider's `aria-valuenow` and the URL.

9. **Old links in the wild.** `llms.txt` has told agents to write
   `aspectRatio=2:3&grid=8x12`. `aspectRatio` is ignored (unknown params
   already fall back to defaults), `grid=` is read as a density and the URL
   is rewritten. Keep that read path for at least one release; it is a few
   lines in `densityFromQuery`.

10. **The Layout group can be empty.** 12 designs have no options and 16
    have no grid option; render the group conditionally (section 5, item 8).

11. **Stale comments that name the editor's box** (section 3.3). Keep the
    values, fix the words. In passing: the `DEFAULT_CELL_PX` comment says
    most presets default to `10x15`; 217 of the 322 with a grid option
    default to `6x9`. Pre-existing and not this PR's, but do not repeat it.

12. **`check:typography` gates everything**, including the changeset and
    the CLAUDE.md edit: ASCII only. The readout's multiplication sign stays
    `\u00D7` in code, as it is today.

13. **Nothing else reads the ratio.** Studio, the customizer, the template
    pages (407 `fit="grid"` mounts, 23 `cover`, sized by `cellSize` or
    `density`), `hydrate.ts`, `tabbied-templates`, the gallery (cover fit at
    the authored grid) and the committed previews (square, `fit: "grid"` at
    1024) are unaffected; the gallery card link carries seed and palette
    only. Verified by grep at `74ed15f`; re-verify with
    `grep -rn "aspectRatio\|AspectRatio\|deriveGrid\|gridToLevel\|getGridOptions" --include=*.ts --include=*.tsx --include=*.mjs .`
    (excluding `node_modules`, `out`, `public/downloads`) before opening
    the PR: the only hits left should be the box prop.

14. **`density` is a shipped prop, and its scale changes underneath it.**
    Today it is an integer level 0 to 4; after, a number 0 to 1. A legacy
    `density={2}` clamps to 1 and draws 36px cells instead of 60px. A
    legacy `density={1}` is the silent case: 90px today, 36px after, and
    nothing can tell the two apart. What bounds it: every known use is in
    this repo, about twenty call sites that `grep -rn "density={" app
    components` lists (eleven in `app/template`, six plus the `Decor`
    default and its `0 | 1 | 2 | 3 | 4` type in
    `components/template/TemplateSite.tsx`, one each in `LazyPattern.tsx`
    and `StudioResults.tsx`, three in the docs page), and they migrate in
    the same PR, level n to n / 4. The packaged downloads and the React zips
    are derived from those pages at build time, so they follow. Nothing
    stored carries a density: `planEdits` and `applyEdits` never touch it
    and the Worker stores none. A template someone downloaded earlier keeps
    working because its bootstrap pins `tabbied` on esm.sh. For everyone
    else the changeset names the rescale with the mapping table, and
    `createPattern` warns once on a value above 1; it cannot warn on 1.

15. **A continuous slider re-rolls the arrangement as it moves.** Every tick
    that changes `cols x rows` is a new layout (item 4), and with twenty
    stops a drag crosses several. The frequency slider already redraws live
    on every 0.1 step and reads fine, so the plan keeps `onChange` live. If
    it flickers in use, base-ui's `Slider.Root` takes an `onValueCommitted`;
    add it to `components/ValueSlider` and apply the density on release
    while the readout follows the thumb.

## 9. Decisions

Taken in this plan, not to be re-opened by the implementing agent:

- The `aspectRatio` box prop stays (section 1), confirmed by the owner.
- The plate is `fit="fixed"` with a snapped-down whole-cell canvas, not
  `fit="grid"` (section 2).
- Density is one number from 0 to 1 (the owner, 2026-09-22), mapped so the
  five former stops sit at 0, 0.25, 0.5, 0.75 and 1; the snippet carries
  `density`.
- Legacy `grid=CxR` links are read as a density for at least one release;
  `aspectRatio=` is ignored.
- Expand pins the grid; a plain resize does not.
- `DEFAULT_FIXED_SIZE` and `DEFAULT_CELL_PX` keep their values; the default
  cell is density 1.
- `tabbied` takes a minor bump with a named breaking-changes list;
  `tabbied-mcp` a patch.

For the owner, each with the default the plan assumes:

- (a) Should a link be able to pin a grid (`grid=CxR` honoured verbatim, so
  a link reproduces one image)? Default: no.
- (b) Scale the target cell on the phone band so the preview stays as fine
  as today? Default: no; px semantics everywhere.
- (c) A "download at a size" export later? Default: not in this PR.

## 10. Order of work

1. Package: add `fitGridToBox`, `densityToCellPx` and `densityFromGrid`
   with tests; rescale `density` in `createPattern.ts` and the React prop
   type; delete the ratio module and field; codegen, the 10 JSON files, the
   llms generator;
   `npm run typecheck --workspace tabbied && npm run build:packages && npm test --workspace tabbied`.
2. MCP type; `npm test --workspace tabbied-mcp`.
3. Editor and its stylesheet, and the density call sites in section 8, item
   14; `npm run dev` and the manual pass in section 7.
4. e2e rewrites; `npm run build && npm run test:e2e`; the full SVG sweep.
5. Docs, CLAUDE.md, changesets; `npm run check:typography`; the final grep
   in section 8, item 13.
