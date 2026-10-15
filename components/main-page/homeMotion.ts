// What is left of the 2026 homepage's animated grids, kept for the pages that
// still read it: a seeded random (lib/randomPalettes.ts) and the four palette
// pools the docs draw their decoration in (components/react-docs-page/
// homePalettes.ts). The homepage of 14 October draws neither.
//
// Deterministic first paint, random afterwards. `Math.random()` during render
// makes the prerendered HTML disagree with the first client render and breaks
// hydration, so an initial arrangement comes from a fixed seed (server and
// client build the same one) and real randomness only enters through timers,
// which start after mount.

export type Rand = () => number;

/** mulberry32: small, fast, and bit-identical in Node and the browser. */
export function seededRandom(seed: number): Rand {
  let a = seed >>> 0;

  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// -- Palettes -----------------------------------------------------------------
// Four palettes, by name, independent of the palette library's.

export const PALETTE_CYCLE = ['Mint', 'Ocean', 'Sunset', 'Lilac'] as const;

export type PaletteName = (typeof PALETTE_CYCLE)[number];

/** Flat colors in each palette, ground excluded. */
export const PALETTE_POOLS: Record<PaletteName, readonly string[]> = {
  Mint: ['#3fffb2', '#3eecff', 'oklch(0.32 0.04 250)', 'oklch(0.5 0.1 195)', 'oklch(0.65 0.16 185)', '#eef0f6'],
  Ocean: ['#2f8bff', '#3eecff', 'oklch(0.3 0.08 250)', 'oklch(0.45 0.12 230)', 'oklch(0.65 0.12 210)', '#eef0f6'],
  Sunset: ['#ff6b4a', '#ffb84a', 'oklch(0.32 0.06 30)', 'oklch(0.55 0.15 40)', 'oklch(0.7 0.16 70)', '#eef0f6'],
  Lilac: ['#b98aff', '#ff8ad1', 'oklch(0.32 0.06 300)', 'oklch(0.55 0.15 320)', 'oklch(0.68 0.14 340)', '#eef0f6'],
};
