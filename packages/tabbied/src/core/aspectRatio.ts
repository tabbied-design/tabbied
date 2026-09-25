// Aspect-ratio + grid helpers. The grid adapts to the ratio so each cell stays
// (near-)square, which keeps every preset looking the way it was authored in
// any orientation. The grid helpers work in the integer density levels 0..4
// that predate the 0-1 `density` in sizing.ts.

export const ASPECT_RATIOS = {
  // portrait
  '1:2': [1, 2],
  '2:3': [2, 3],
  // square
  '1:1': [1, 1],
  // landscape
  '3:2': [3, 2],
  '2:1': [2, 1],
} as const;

export type AspectRatioId = keyof typeof ASPECT_RATIOS;

export const DEFAULT_ASPECT_RATIO: AspectRatioId = '2:3';

// Display order for the aspect-ratio selector (portrait -> square -> landscape).
export const ASPECT_RATIO_IDS = Object.keys(ASPECT_RATIOS) as AspectRatioId[];

// Cells along the canvas's longer edge at each density level, coarsest first.
// At 2:3 these are the authored 2x3 / 4x6 / 6x9 / 8x12 / 10x15 grids exactly.
export const LONG_EDGE_COUNTS = [3, 6, 9, 12, 15] as const;

export const GRID_LEVEL_COUNT = LONG_EDGE_COUNTS.length;

export function isAspectRatioId(value: string): value is AspectRatioId {
  return value in ASPECT_RATIOS;
}

// Canvas pixel dimensions for a ratio, fitted inside a `baseWidth` x
// `baseWidth * 1.5` box (rather than fixing the width), so tall portraits
// don't clip the viewport and wide landscapes don't overflow. 2:3 fills it.
export function getCanvasSize(
  ratio: AspectRatioId,
  baseWidth: number
): { width: number; height: number } {
  const [rw, rh] = ASPECT_RATIOS[ratio];
  const boxWidth = baseWidth;
  const boxHeight = baseWidth * 1.5;
  const scale = Math.min(boxWidth / rw, boxHeight / rh);

  return {
    width: Math.round(rw * scale),
    height: Math.round(rh * scale),
  };
}

// "colsxrows" grid string for a ratio at a given density level, with cells kept
// as square as the ratio allows. The longer edge gets LONG_EDGE_COUNTS[level]
// cells; the shorter edge is scaled down proportionally (min 1).
export function deriveGrid(ratio: AspectRatioId, level: number): string {
  const [rw, rh] = ASPECT_RATIOS[ratio];
  const clampedLevel = Math.min(
    Math.max(level, 0),
    LONG_EDGE_COUNTS.length - 1
  );
  const longCount = LONG_EDGE_COUNTS[clampedLevel];

  let cols: number;
  let rows: number;

  if (rw >= rh) {
    cols = longCount;
    rows = Math.max(1, Math.round((longCount * rh) / rw));
  } else {
    rows = longCount;
    cols = Math.max(1, Math.round((longCount * rw) / rh));
  }

  return `${cols}x${rows}`;
}

// The list of "colsxrows" options offered for a ratio (one per density level).
export function getGridOptions(ratio: AspectRatioId): string[] {
  return LONG_EDGE_COUNTS.map((_, level) => deriveGrid(ratio, level));
}

// Map an authored grid string (e.g. "8x12") back to a density level so a
// preset's preferred density survives an aspect-ratio change. Uses the larger
// dimension (the long-edge count) and snaps to the nearest level.
export function gridToLevel(grid: string): number {
  const parts = grid.split('x').map((part) => Number(part));

  if (parts.length !== 2 || parts.some((value) => Number.isNaN(value))) {
    return 0;
  }

  const longCount = Math.max(parts[0], parts[1]);

  let nearest = 0;
  let smallestDelta = Infinity;

  LONG_EDGE_COUNTS.forEach((count, level) => {
    const delta = Math.abs(count - longCount);

    if (delta < smallestDelta) {
      smallestDelta = delta;
      nearest = level;
    }
  });

  return nearest;
}
