// The aspect ratios the editor offers. The grid for a ratio is derived from
// the plate at a density (deriveGridForBox in sizing.ts), not stored here.

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

export function isAspectRatioId(value: string): value is AspectRatioId {
  return value in ASPECT_RATIOS;
}
