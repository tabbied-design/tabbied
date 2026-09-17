---
'tabbied': minor
---

Add 43 designs from the September pattern drop, taking the catalog from 295 to
338. They ship as gallery orders 3000-3042, each with committed preview,
closed-vocabulary metadata authored from that preview, and a measured
SVG-export tier.

The designs were authored in a standalone css-doodle editor that splices a
pattern's rule into the element literally. Tabbied mounts it through
`use="var(--rule)"` instead, so three classes of source had to be adapted to
render here at all:

- **A rule-local custom property read with `var(--x)`.** The host computes
  `--rule` first and substitutes every `var()` inside it, so a property the
  host does not define invalidates the whole declaration and the design paints
  nothing at all. These now read through css-doodle's `@var(--x)`, which
  resolves at generation time. Twelve designs were affected, and every one of
  them was blank before the change.
- **A colour reference past the end of the palette** (`softbubbles` picked
  `var(--color5)` with a five-colour palette), which fails the same way.
- **Cell count used as "how many shapes to scatter".** `fit: "grid"` derives
  the grid from the container, so density now comes from the house
  `@random(${shapeFrequency})` gate.

28 of the 43 declare `svgExport: false`, so 15 offer SVG download. Ten of the
28 throw from the shipped converter (double and dashed borders, a border on a
partially-rounded box, `matrix3d`, `color-mix()`,
`repeating-conic-gradient`). The other 18 are the worse case: they export a
plausible SVG that is not what the canvas shows, from 1.3% of pixels up to all
of them, with no warning of any kind. Both groups were found by running the
converter and then `scripts/svg-parity-sweep.mjs` over every new design, and
both are tabulated in `docs/svg-export.md`.
