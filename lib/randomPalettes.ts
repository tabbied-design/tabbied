// The gallery's "Random per pattern": one library palette per card.
//
// The spread is drawn once per session and kept, so coming back from the
// editor shows the cards as they were; choosing the option again draws a new
// one. The server renders with a fixed seed and the session's seed is applied
// after mount - a Math.random() during render would make the prerendered grid
// disagree with the first client render, the same trap the homepage's grids
// avoid with seededRandom().
import { seededRandom } from 'components/main-page/homeMotion';

/**
 * `count` picks from `pool` in a seeded shuffle, so no palette repeats until
 * the pool is used up (the library is larger than the catalog, so it never
 * is). Deterministic in the seed: the same seed gives the same spread.
 */
export function assignRandomPalettes<T>(
  count: number,
  pool: readonly T[],
  seed: number
): T[] {
  if (pool.length === 0) return [];

  const rand = seededRandom(seed);
  const order = pool.map((_, index) => index);

  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  return Array.from({ length: count }, (_, index) => pool[order[index % order.length]]);
}

/**
 * A palette cut or padded to what a pattern can take, ground first and the
 * inks cycling. The card and the editor it opens both get this, so a pattern
 * that needs four inks is drawn with the same four in both places.
 */
export function fitToColorBounds(
  colors: readonly string[],
  min = 2,
  max = colors.length
): string[] {
  const inks = colors.slice(1);
  const wanted = Math.min(Math.max(colors.length, min), Math.max(max, 1));

  return Array.from({ length: wanted }, (_, index) =>
    index === 0 ? colors[0] : (inks[(index - 1) % inks.length] ?? colors[0])
  );
}

let sessionSeed: number | null = null;

const drawSeed = () => Math.floor(Math.random() * 0x7fffffff) + 1;

/** The session's spread, drawn on first use. Client only. */
export const sessionRandomSeed = (): number => sessionSeed ?? (sessionSeed = drawSeed());

/** A new spread for the session. */
export const rerollRandomSeed = (): number => (sessionSeed = drawSeed());
