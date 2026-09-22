---
"tabbied": minor
---

`density` is now one number from 0 (coarse) to 1 (fine) instead of an integer level 0..4, in the `density` prop, the `createPattern` config and `data-density`. It maps onto the cell sizes the editor's original 360px plate drew at its five stops, `cellPx = 360 / (2 + 8 * density)`, so the former levels sit at round values and nothing authored moves:

| Former level | Density | Cell (px) |
| --- | --- | --- |
| 0 | 0 | 180 |
| 1 | 0.25 | 90 |
| 2 | 0.5 | 60 |
| 3 | 0.75 | 45 |
| 4 | 1 | 36 |

**Breaking changes**

- A `density` above 1 clamps to 1 and draws 36px cells; the controller warns once per page naming the mapping. A legacy `density={1}` is the silent case: 90px cells before, 36px after. Migrate level n to n / 4.
- `DENSITY_CELL_PX` is removed. `DEFAULT_CELL_PX` keeps its value (36px, now `densityToCellPx(1)`), so a consumer that passes neither `cellSize` nor `density` sees no change.

**Additions**

- `densityToCellPx(density)`: the target cell size for a density, clamped to the range.
- `densityFromGrid("colsxrows")`: the density whose cell that grid had on the original 360x540 plate (6x9 is 0.5, 10x15 is 1), or null for anything that is not a grid. This is what reads an older editor link's `grid=` parameter.
- `DENSITY_REFERENCE_PX`, the 360px the mapping is defined against.

The Tabbied editor's grid control is now this density: a slider from 0 to 1 whose readout is the grid the plate resolves to at that cell size, with the aspect ratio picker unchanged. Share links carry `density=` in place of the grid; an older `grid=8x12` link still opens at the density it had.
