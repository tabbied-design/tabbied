// The homepage's four palettes (components/main-page/homeMotion.ts), as
// palettes a pattern can take: a ground first, then the pool the homepage's
// skyline and pattern demo draw from, cut or cycled to the design's own color
// bounds. The docs draw their decoration and their sizing diagrams in these,
// so they read as a part of the same site.
import type { PatternDefinition } from 'tabbied';
import { PALETTE_POOLS, type PaletteName } from 'components/main-page/homeMotion';
import { fitToColorBounds } from 'lib/randomPalettes';

/** `--h-bg`, the homepage's ground. */
export const HOME_GROUND = '#0e0e13';

/** The pool's near-white, the dark shell's own ink: on the docs' white paper it draws nothing. */
const PAPER_INK = '#eef0f6';

/**
 * A home palette for `pattern`. On the dark ground by default; with
 * `transparent`, the page shows through the ground (every design paints
 * color 0 on its own container), and the pool's near-white goes, since on
 * the docs' white paper it would read as holes.
 */
export function homePalette(
  name: PaletteName,
  pattern: PatternDefinition,
  { transparent = false }: { transparent?: boolean } = {}
): string[] {
  const inks = transparent ? PALETTE_POOLS[name].filter((ink) => ink !== PAPER_INK) : PALETTE_POOLS[name];
  return fitToColorBounds(
    [transparent ? 'transparent' : HOME_GROUND, ...inks],
    pattern.colors?.min ?? 2,
    pattern.colors?.max ?? inks.length + 1
  );
}
