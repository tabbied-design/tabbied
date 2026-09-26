/**
 * The order the template gallery shows its sites in: shuffled, then spread so
 * that neighbors differ.
 *
 * The registries list templates in the batches they were made in, and a batch
 * shares a look (the Swiss sets, the minimal set, the 70 artwork sites sorted
 * by picture technique), so in registry order a page of the gallery was one
 * style repeated. A plain shuffle still lets a big batch clump, and so does
 * drawing a card at a time: the artwork sites are 40% of the catalog, and
 * any rule that skips a batch after it was used spends the big one slowest,
 * which left the last page all artwork. So each batch is shuffled and its
 * cards are placed at even, jittered steps along the whole list (the tenth
 * of 70 near 10/70 of the way down), which gives every page its share of
 * every batch; then where a card repeats its neighbor's batch, or the
 * category or pattern of either card before it, the nearest later card that
 * does not is moved up into its place.
 *
 * Seeded, and computed at build time: the prerendered page and every visit
 * agree, and `?page=2` names the same cards for everyone until a template is
 * added.
 */

export type Spreadable = {
  /** The batch a template was made in; the unit of "similar style". */
  family: string;
  category: string;
  pattern: string;
};

/** mulberry32: small, fast, and the same sequence on every machine. */
function seededRandom(seed: number): () => number {
  let a = seed >>> 0;

  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function spreadTemplates<T extends Spreadable>(items: readonly T[], seed = 177): T[] {
  const random = seededRandom(seed);
  const families = new Map<string, T[]>();

  for (const item of items) {
    const list = families.get(item.family);
    if (list) list.push(item);
    else families.set(item.family, [item]);
  }

  // Fisher-Yates within each batch.
  for (const list of families.values()) {
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
  }

  // Stratified: card k of a batch of n lands at (k + jitter) / n.
  const keyed: { item: T; key: number }[] = [];

  for (const list of families.values()) {
    list.forEach((item, k) => keyed.push({ item, key: (k + 0.2 + random() * 0.6) / list.length }));
  }

  const order = keyed.sort((a, b) => a.key - b.key).map(({ item }) => item);

  const clashes = (at: number, card: T) => {
    const before = order.slice(Math.max(0, at - 2), at);

    return (
      before[before.length - 1]?.family === card.family ||
      before.some((placed) => placed.category === card.category || placed.pattern === card.pattern)
    );
  };

  for (let i = 1; i < order.length; i += 1) {
    if (!clashes(i, order[i])) continue;

    const j = order.findIndex((card, k) => k > i && !clashes(i, card));
    if (j > i) order.splice(i, 0, order.splice(j, 1)[0]);
  }

  return order;
}
