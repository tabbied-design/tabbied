---
"tabbied": patch
---

A grid change now cuts to the new cells instead of animating each one in from its unstyled state. When the grid changes (a resize that derives a different grid, or a new `density` or `cellSize`), css-doodle builds every cell anew, which is a first paint, and a first paint was already drawn without the designs' transitions. Concentric Rings showed why it matters: each of its rings is rotated and as large as the sheet, so the ease made every ring a compositing layer, and in Chromium the pattern and the page around it briefly turned into a block of the ground color. Redraws and palette or option changes on the same grid still morph as before.
