// The homepage's four palettes (components/main-page/homeMotion.ts), as
// palettes a pattern can take: the dark shell's ground first, then the pool
// the homepage's skyline and pattern demo draw from, cut or cycled to the
// design's own color bounds. The Developers page draws its decoration in
// these, so it reads as a part of the same site.
import type { PatternDefinition } from 'tabbied';
import { PALETTE_POOLS, type PaletteName } from 'components/main-page/homeMotion';
import { fitToColorBounds } from 'lib/randomPalettes';

/** `--h-bg`, the homepage's ground. */
export const HOME_GROUND = '#0e0e13';

export function homePalette(name: PaletteName, pattern: PatternDefinition): string[] {
  return fitToColorBounds(
    [HOME_GROUND, ...PALETTE_POOLS[name]],
    pattern.colors?.min ?? 2,
    pattern.colors?.max ?? PALETTE_POOLS[name].length + 1
  );
}
