---
"tabbied": minor
---

`snapCellToBox(width, height, cols, rows, cellMultiple?)` is exported from the core: the whole, divisible, square cell that lets a `cols x rows` grid cover a box, which is the arithmetic the `grid` fit already ran on its host and the `cover` fit on its render box, now in one place. It is what the site's editor sizes its plate with, so a 3:2 plate no longer draws 58.2px tracks with a hairline seam down every column.

`exportSvg()` and `doodleToSvg()` take a `clip: { width, height }` option: the viewBox becomes that top-left box and the drawing is clipped to it. A `grid` fit's canvas is oversized to whole tracks and clipped by its host, so this is what makes an exported file show what the page showed.
