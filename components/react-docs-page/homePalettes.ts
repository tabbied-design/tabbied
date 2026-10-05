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

/** One sRGB channel, linear light to its gamma-encoded byte, clipped to the gamut. */
const srgbByte = (linear: number): string => {
  const encoded = linear <= 0.0031308 ? 12.92 * linear : 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
  return Math.round(Math.min(1, Math.max(0, encoded)) * 255)
    .toString(16)
    .padStart(2, '0');
};

/** `oklch(L C H)` as `#rrggbb` (OKLab to linear sRGB, Ottosson's matrices). */
function oklchToHex(l: number, c: number, h: number): string {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const lms = [
    l + 0.3963377774 * a + 0.2158037573 * b,
    l - 0.1055613458 * a - 0.0638541728 * b,
    l - 0.0894841775 * a - 1.291485548 * b,
  ].map((value) => value ** 3);
  const [lc, mc, sc] = lms;
  return `#${[
    4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc,
    -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc,
    -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc,
  ]
    .map(srgbByte)
    .join('')}`;
}

const OKLCH = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/;
const HEX = /^#[0-9a-f]{6}$/i;

/**
 * A palette as the pattern editor takes it from a link: hex only, since its
 * swatches are hex pickers (`isValidPaletteColor`), plus `transparent` for
 * the ground. The pools' oklch inks are converted; anything else throws, at
 * build time, rather than making a link the editor quietly ignores.
 */
export function editorColors(colors: readonly string[]): string[] {
  return colors.map((color) => {
    if (color === 'transparent' || HEX.test(color)) return color;
    const match = OKLCH.exec(color);
    if (!match) throw new Error(`No hex form for the palette color ${color}`);
    return oklchToHex(Number(match[1]), Number(match[2]), Number(match[3]));
  });
}
