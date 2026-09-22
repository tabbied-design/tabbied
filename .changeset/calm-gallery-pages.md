---
"tabbied": patch
---

Twelve of the September designs were the reason the pattern gallery's pages 13 and 14 crashed on iOS and dragged on desktop, and they are fixed at the source:

- `diamondconfetti`, `teardropleaves`, `diamondember`, `confettitriangles` and `scatteredgems` nested a `@doodle` on a 10,000px canvas (100,000px for the first), the rotated-tile trick that covers any host. css-doodle renders a sized nested doodle as an SVG image, and on WebKit it rasterizes that to a PNG canvas of the declared size first: 400 MB each, and beyond any canvas limit at 100,000px. The tile only has to cover its own square, which the designs' `scale(1.5)` and `scale(2)` already do, so the canvases are 3,000px now, larger than any host a page draws. The render is unchanged.
- `turbulentsunburst`, `randomrings`, `horizonbands`, `tidewashbands`, `spinningrings`, `concentricrings` and `scattershrink` declared `@keyframes` animations, four of them authored paused. An animated cell is a compositing layer whether it moves or not, so those seven put 131 to 517 layers behind one gallery card, and page 14 as a whole asked for 317 layers of textures. The animations are removed; the four paused designs look exactly as before, and the three that moved now rest on their first frame (`tidewashbands` keeps each band at the offset its animation delay gave it).

Under `prefers-reduced-motion: reduce` the controller now also pauses any keyframe animation a design declares, beside the redraw timer and the cell transitions it already stops.
