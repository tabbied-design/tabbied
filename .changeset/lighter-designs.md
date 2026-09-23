---
"tabbied": minor
---

Fourteen designs generate a fraction of the CSS they did, and the densest ones draw what they were designed to.

**Additions**

- `sizing.maxCells` on a definition caps the grid `fit: "grid"` (and a density or cell size under `cover`) derives from the box. It is for the designs whose cells are a count of things rather than a tiling: radiantswirl, driftspiral, turbulentsunburst, marbledarcs, warpribbon, spiralrosette, confettidotfield and tidewashbands now carry the largest count their grid option offers. At the finest density a 2:3 box drew 187 rings of radiantswirl where it is designed for 12 to 28.

**Designs**

- A value that was the same in every cell is generated once on the doodle and read with `@var`: evolute (3.4 MB of CSS at an 11x17 grid, now 40 KB), blossom and sparkle (1.7 MB each, now about 100 KB), fractal, drypoint, charcoal, linocut, reedpen, crosslattice and sunsetrings (1.6 MB, now 81 KB). They render pixel for pixel as before.
- matryoshka and subdivide mask each cell with gradient layers instead of a nested `@doodle`: no images to generate (matryoshka took a second at an 11x17 grid, now under 100 ms), and no hairline seams on screen. The same seed draws a different arrangement than before.
- midnightblossoms plots its petals at 120 points instead of 240; the difference is anti-aliasing.

**Fixes**

- The SVG exporter paints a `no-repeat` background or mask layer smaller than its box once, in its own area, instead of padding its edge color across the whole box. matryoshka and subdivide now export exactly.
