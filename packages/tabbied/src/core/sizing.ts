// Sizing strategies for rendering a pattern into an arbitrary container.
//
// The generated pattern depends only on the seed and grid (see
// doodleSource.ts), so a pattern can be drawn at any size; what varies per
// strategy is how the cell grid and the css-doodle canvas relate to the
// container. See createPattern() for how each FitMode is applied.
import type { PatternSizing, FitMode } from './types.js';

// Options with this id hold a "colsxrows" grid string; the adaptive `grid`
// fit overrides it with a grid derived from the measured container.
export const GRID_OPTION_ID = 'grid';

// The editor's original plate was 360px wide and showed 2, 4, 6, 8 or 10
// cells across at its five density stops (180, 90, 60, 45 and 36px cells). A
// density in [0, 1] walks that span continuously, so the former levels 0..4
// sit at 0, 0.25, 0.5, 0.75 and 1, and 0.5 is the 60px cell most designs
// open at.
export const DENSITY_REFERENCE_PX = 360;

/**
 * Target cell size for a density in [0, 1]: 180px at 0 (the coarsest cell
 * the editor draws), 36px at 1 (the finest). Values outside the range clamp.
 */
export function densityToCellPx(density: number): number {
  const d = Math.min(Math.max(density, 0), 1);

  return DENSITY_REFERENCE_PX / (2 + 8 * d);
}

// The 36px default is density 1: a consumer that passes neither `cellSize`
// nor `density` draws the finest cell, which is what it always drew.
export const DEFAULT_CELL_PX = densityToCellPx(1);

// css-doodle caps grids at 64×64 cells (parse_grid).
export const MAX_GRID_EDGE = 64;

// Bounds applied to the requested cell size when a pattern doesn't declare
// its own (sizing.minCellPx / sizing.maxCellPx).
const DEFAULT_MIN_CELL_PX = 24;
const DEFAULT_MAX_CELL_PX = 220;

/** Render resolution for the `cover` fit. */
export type CoverRender = { width: number; height: number };

// The gallery's proven default: render at a fixed 800×800 and scale into the
// container, preserving the proportions of fixed-px strokes and shadows.
export const DEFAULT_COVER_RENDER: CoverRender = { width: 800, height: 800 };

// Canvas size for fit:"fixed" when no width/height is given - the editor's
// original 2:3 preview footprint.
export const DEFAULT_FIXED_SIZE = { width: 360, height: 540 };

// Every mode works for every design, so there is no per-pattern capability
// check: `fit` is a plain choice, and an unset one takes the default. The
// list exists so `data-fit` can be validated (see hydrate.ts).
export const FIT_MODES: readonly FitMode[] = ['grid', 'cover', 'fixed'];

/**
 * The fit used when none is requested. Every design is cell-tiled, so the
 * adaptive grid is always the right starting point: it fills any box with
 * whole, near-square cells and no letterboxing.
 */
export const DEFAULT_FIT_MODE: FitMode = 'grid';

// ---- box sizing -----------------------------------------------------------
// A pattern has no intrinsic size: `fit` says how the drawing relates to its
// box, and these say how big the box is. They're deliberately the CSS
// properties they map to - the element a pattern renders into is a normal
// block box, so anything expressible in CSS stays expressible here.

/** How big the element a pattern renders into should be. */
export type PatternBoxSize = {
  /**
   * Fill the containing block (`width: 100%; height: 100%`). Default, so a
   * pattern dropped into a sized parent shows up without extra CSS. An
   * explicit `width`/`height` takes over that axis; `fill: false` opts out of
   * both, leaving the box to a class name or the surrounding layout.
   *
   * `height: 100%` only resolves against a parent with a definite height. In a
   * parent that sizes to its content, give the pattern a `height` or an
   * `aspectRatio` instead.
   */
  fill?: boolean;
  /** Box width/height. Numbers are px; strings are used as written. */
  width?: number | string;
  height?: number | string;
  /** Upper bounds on the box. Numbers are px; strings are used as written. */
  maxWidth?: number | string;
  maxHeight?: number | string;
  /**
   * CSS `aspect-ratio` (e.g. `3 / 2` or `1.5`). Derives the height from the
   * width, so it pairs with `maxWidth` in a parent that has no fixed height.
   */
  aspectRatio?: number | string;
};

/** The CSS the box props resolve to (assignable to a style object). */
export type PatternBoxStyle = {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  aspectRatio?: string;
};

const cssLength = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;

/**
 * Turn the box props into CSS. `tabbied/react` spreads the result into the
 * wrapper's `style` (so the box is right on the server render too); with the
 * core API, assign it to the host yourself:
 *
 * ```js
 * Object.assign(host.style, resolveBoxStyle({ maxWidth: 720, aspectRatio: 3 / 2 }));
 * ```
 */
export function resolveBoxStyle(size: PatternBoxSize = {}): PatternBoxStyle {
  const { fill = true, width, height, maxWidth, maxHeight, aspectRatio } = size;
  const style: PatternBoxStyle = {};

  if (width != null) {
    style.width = cssLength(width);
  } else if (fill) {
    style.width = '100%';
  }

  if (height != null) {
    style.height = cssLength(height);
  } else if (fill && aspectRatio == null) {
    // With an aspect ratio the height is derived from the width - pinning it
    // to 100% would override the ratio rather than honor it.
    style.height = '100%';
  }

  if (maxWidth != null) {
    style.maxWidth = cssLength(maxWidth);
  }

  if (maxHeight != null) {
    style.maxHeight = cssLength(maxHeight);
  }

  if (aspectRatio != null) {
    style.aspectRatio = String(aspectRatio);
  }

  return style;
}

// "cols × rows" for an arbitrary box at a target cell size, keeping cells
// near-square. Generalizes deriveGrid() from the five preset aspect ratios to
// any measured container: respect the pattern's cell-size bounds (px-effect
// designs need a floor), though never a cell larger than the box's short
// edge, then css-doodle's hard 64x64 cap.
//
// cols and rows are chosen jointly, squareness first and closeness to the
// target breaking ties. Rounding each axis on its own can pair a rounded-up
// axis with a rounded-down one and stretch cells up to ~2x at small counts.
export function deriveGridForBox(
  width: number,
  height: number,
  targetCellPx: number,
  sizing?: PatternSizing
): { cols: number; rows: number } {
  if (width <= 0 || height <= 0) {
    return { cols: 1, rows: 1 };
  }

  const minCell = sizing?.minCellPx ?? DEFAULT_MIN_CELL_PX;
  const maxCell = sizing?.maxCellPx ?? DEFAULT_MAX_CELL_PX;
  const maxCells = sizing?.maxCells;
  const bounded = Math.min(Math.max(targetCellPx, minCell), maxCell);
  const cell = Math.max(
    // A cell floor above the short edge would force cells far from square
    // (e.g. a 200px floor in a 5000×100 banner); squareness wins there.
    Math.min(bounded, width, height),
    width / MAX_GRID_EDGE,
    height / MAX_GRID_EDGE,
    // A design whose cells are a count of things (rings, rays, bars) is held
    // to the count it was drawn for: the smallest cell that fits no more.
    maxCells ? Math.sqrt((width * height) / maxCells) : 0
  );

  const axisCandidates = (span: number): number[] => {
    const low = Math.max(1, Math.floor(span / cell));
    const high = Math.max(1, Math.min(Math.ceil(span / cell), MAX_GRID_EDGE));

    return low === high ? [low] : [low, high];
  };

  let best = { cols: 1, rows: 1, score: Infinity };

  for (const cols of axisCandidates(width)) {
    for (const rows of axisCandidates(height)) {
      if (maxCells && cols * rows > maxCells) continue;

      const cellW = width / cols;
      const cellH = height / rows;
      const score =
        4 * Math.abs(Math.log(cellW / cellH)) +
        Math.abs(Math.log(cellW / cell)) +
        Math.abs(Math.log(cellH / cell));

      if (score < best.score) {
        best = { cols, rows, score };
      }
    }
  }

  // Every candidate over the cap: a box so long that even its short edge
  // holds one cell and the long one more than the cap. Keep the one row (or
  // column) and as many cells along it as the cap allows.
  if (best.score === Infinity && maxCells) {
    return width >= height
      ? { cols: Math.max(1, Math.min(maxCells, MAX_GRID_EDGE)), rows: 1 }
      : { cols: 1, rows: Math.max(1, Math.min(maxCells, MAX_GRID_EDGE)) };
  }

  return { cols: best.cols, rows: best.rows };
}

/**
 * The canvas span that makes every grid track a whole pixel: the smallest
 * multiple of the track count that still covers the box.
 *
 * css-doodle lays its grid out as `repeat(n, 1fr)`, so a box that isn't
 * divisible by n puts every cell boundary on a sub-pixel, and the browser
 * draws a hairline seam at each one. A fluid container almost never divides.
 *
 * The cell is snapped to a whole multiple of `cellMultiple`, not merely to a
 * whole pixel: a design that subdivides its cell puts a boundary at
 * `cell / n`, which seams if the cell doesn't divide. The default of 2 covers
 * centered rules and strokes; designs that mask with a finer grid declare
 * their own (see `PatternSizing`). See docs/grid-snapping.md.
 *
 * The returned span overflows the box by less than two cells, which the host
 * clips. Rounding down instead would leave a strip of the container
 * uncovered, which is far more visible on a background field.
 */
export function snapSpanToTracks(
  span: number,
  tracks: number,
  cellMultiple = 2
): number {
  if (!(span > 0) || !(tracks > 0)) {
    return Math.max(0, Math.ceil(span));
  }

  const unit = tracks * Math.max(1, Math.round(cellMultiple));

  return Math.ceil(span / unit) * unit;
}

/**
 * The cell that lets a `cols x rows` grid cover a `width x height` box with
 * whole, divisible, square cells: each axis is snapped with
 * `snapSpanToTracks`, and the larger of the two cells is used on both. A
 * canvas of `cols * cell` by `rows * cell` then covers the box, and the host
 * clips what overflows it (under `cellMultiple` px per track on the axis
 * that decided the cell, plus what squaring added on the other).
 *
 * Square, not merely whole. Many designs rotate their cell by a quarter turn
 * (`transform: rotate(@pick(0deg, 90deg, 180deg, 270deg))`), and a quarter
 * turn of an oblong swaps its axes: a 120 x 124 cell paints 124 x 120 once
 * rotated, leaving 2px uncovered top and bottom, which reads as a seam even
 * though every track is exact. Both snapped cells are multiples of
 * `cellMultiple`, so the larger is too.
 *
 * `applyGridSnap` runs this on a `grid` fit's host and the `cover` fit on its
 * render box; the editor runs it on its plate, which is why it is exported.
 */
export function snapCellToBox(
  width: number,
  height: number,
  cols: number,
  rows: number,
  cellMultiple = 2
): number {
  const c = cols > 0 ? cols : 1;
  const r = rows > 0 ? rows : 1;

  return Math.max(
    snapSpanToTracks(width, c, cellMultiple) / c,
    snapSpanToTracks(height, r, cellMultiple) / r
  );
}

// Parse a "colsxrows" grid option value (e.g. "6x9").
export function parseGridValue(
  value: string
): { cols: number; rows: number } | null {
  const match = /^\s*(\d+)\s*x\s*(\d+)\s*$/i.exec(value);

  if (!match) {
    return null;
  }

  const cols = Number(match[1]);
  const rows = Number(match[2]);

  return cols > 0 && rows > 0 ? { cols, rows } : null;
}

// The long edge of the editor's original 360x540 plate, which is what an
// authored "colsxrows" default was drawn against.
const DENSITY_REFERENCE_LONG_EDGE = 540;

/**
 * The density whose cell, on the original 360x540 plate, has the long edge
 * of a "colsxrows" grid; null when the value is not one. Reads a preset's
 * authored default and the old editor's `grid=8x12` links: 6x9 is 0.5,
 * 10x15 is 1, and anything finer clamps to 1. Two decimals, the precision a
 * share link carries.
 */
export function densityFromGrid(grid: string): number | null {
  const parsed = parseGridValue(grid);

  if (!parsed) return null;

  const longEdge = Math.max(parsed.cols, parsed.rows);
  const cellPx = DENSITY_REFERENCE_LONG_EDGE / longEdge;
  const density = (DENSITY_REFERENCE_PX / cellPx - 2) / 8;

  return Math.round(Math.min(Math.max(density, 0), 1) * 100) / 100;
}

// The render box `cover` uses for a grid-driven pattern: the largest box of
// the host's aspect ratio that fits inside the base coverRender box. Matching
// the host's shape (instead of cropping a fixed-shape render into it) lets the
// grid tile it edge-to-edge with whole cells, so nothing is cut off mid-cell;
// staying inside the base box keeps the render resolution - and with it the
// look of fixed-px strokes and shadows - in the authored range.
export function adaptCoverRenderToBox(
  hostWidth: number,
  hostHeight: number,
  base: CoverRender
): CoverRender {
  if (hostWidth <= 0 || hostHeight <= 0) {
    return base;
  }

  const scale = Math.min(base.width / hostWidth, base.height / hostHeight);

  return {
    width: Math.max(1, Math.round(hostWidth * scale)),
    height: Math.max(1, Math.round(hostHeight * scale)),
  };
}

// Target cell size (in render px) that reproduces the authored/pinned grid's
// cell area on the base render box - so a host shaped like the base box keeps
// exactly the grid it asked for, and other shapes tile at the same visual
// density.
export function coverCellPx(
  gridValue: string,
  base: CoverRender
): number | null {
  const grid = parseGridValue(gridValue);

  if (!grid) {
    return null;
  }

  return Math.sqrt((base.width / grid.cols) * (base.height / grid.rows));
}

// Scale + offsets that fit a fixed-resolution render into a host box, filling
// it and cropping the overflow. This is the gallery-thumbnail technique:
// scaling the rendered element (instead of rendering at the host's pixel size)
// preserves the authored proportions of fixed-px strokes and shadows, and DOM
// scaling stays vector-crisp.
export function fitRenderToBox(
  hostWidth: number,
  hostHeight: number,
  render: CoverRender,
  cellPx?: number
): { scale: number; translateX: number; translateY: number } {
  let scale = Math.max(hostWidth / render.width, hostHeight / render.height);

  // Land every cell edge on a whole pixel after the transform. Snapping the
  // render box is not enough on its own: a scaled canvas maps exact layout
  // tracks onto fractional device pixels, and the browser seams there unless
  // `cell * scale` is whole (measured in docs/grid-snapping.md). The scale
  // rounds up, which only ever crops further; the box is filled either way.
  if (cellPx && cellPx > 0 && Number.isFinite(scale)) {
    const quantized = Math.ceil(cellPx * scale);

    if (quantized >= 1) {
      scale = quantized / cellPx;
    }
  }

  // The offset has to be whole too: half a pixel of translation puts every
  // boundary back on a fraction.
  return {
    scale,
    translateX: Math.round((hostWidth - render.width * scale) / 2),
    translateY: Math.round((hostHeight - render.height * scale) / 2),
  };
}
