/**
 * The order the template gallery shows its sites in, and how it was made.
 *
 * The order is committed (`GALLERY_ORDER`, below) and only ever grows at the
 * end, so the cards on a page, and on each category's pages, stay where
 * they are when templates are added: a link to `?page=3` keeps meaning the
 * same cards. A template the list does not name fails the export, like one
 * with no category, and the error prints the lines to append.
 *
 * `spreadTemplates` is how the list was made, and how an addition is laid
 * out before it is appended. The registries list templates in the batches
 * they were made in, and a batch shares a look (the Swiss sets, the minimal
 * set, the 70 artwork sites sorted by picture technique), so in registry
 * order a page of the gallery was one style repeated. A plain shuffle still
 * lets a big batch clump, and so does drawing a card at a time: the artwork
 * sites are 40% of the catalog, and any rule that skips a batch after it was
 * used spends the big one slowest, which left the last page all artwork. So
 * each batch is shuffled and its cards are placed at even, jittered steps
 * along the whole list (the tenth of 70 near 10/70 of the way down), which
 * gives every page its share of every batch; then where a card repeats its
 * neighbor's batch, or the category or pattern of either card before it,
 * the nearest later card that does not is moved up into its place.
 *
 * Appending is the trade: an addition is spread among itself, not through
 * the pages already published, so a large batch of one look lands together
 * on the last pages.
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

/**
 * The templates in gallery order. Throws for a template `GALLERY_ORDER` does
 * not name, printing where to append it, and for a name no template has
 * (removing one shifts every card after it by a place, so it is a decision,
 * not something to do in passing).
 */
export function orderTemplates<T extends Spreadable & { slug: string }>(items: readonly T[]): T[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const listed = new Set(GALLERY_ORDER);

  const stale = GALLERY_ORDER.filter((slug) => !bySlug.has(slug));
  if (stale.length > 0) {
    throw new Error(
      `templateOrder: GALLERY_ORDER names ${stale.join(', ')}, which no template has - remove it from lib/templateOrder.ts`
    );
  }

  const missing = items.filter((item) => !listed.has(item.slug));
  if (missing.length > 0) {
    const lines = spreadTemplates(missing, GALLERY_ORDER.length).map((item) => `  '${item.slug}',`);
    throw new Error(
      `templateOrder: ${missing.length} template(s) not in GALLERY_ORDER - append these to the end of it in lib/templateOrder.ts:\n${lines.join('\n')}`
    );
  }

  return GALLERY_ORDER.map((slug) => bySlug.get(slug)!);
}

/**
 * The gallery's order. Append only: a new template goes at the end, in the
 * order `orderTemplates` prints for it.
 */
export const GALLERY_ORDER: readonly string[] = [
  // 2026-09-26: the first 177, laid out by spreadTemplates (seed 177).
  'veil-and-vow',
  'orbital-lounge',
  'quiet-harbor',
  'linie-nord',
  'tin-roof-guitars',
  'bureau-vektor',
  'the-wren-hotel',
  'wild-stem',
  'werkraum',
  'bloom-events',
  'nachtzug',
  'stride-sneakers',
  'stropline-barbers',
  'wheelhouse-ceramics',
  'institut-vollmer',
  'pressed-juice',
  'werkstatt-neun',
  'hive-and-honey',
  'maple-street-vets',
  'cairn-expeditions',
  'thread-and-hem',
  'ringmark',
  'mesa-outfitters',
  'nocturne',
  'common-table',
  'old-town-walks',
  'seconde',
  'corner-pharmacy',
  'tidy-ledger',
  'meeple-and-mug',
  'sichtbeton',
  'live-wire-electric',
  'fringe-salon',
  'beaufort',
  'lumen-portraits',
  'little-acorns',
  'cobalt-works',
  'heron-point-golf',
  'kubus',
  'pinecone-camp',
  'purpurhaus',
  'the-gimlet',
  'hotel-meridien',
  'passform',
  'platen-press',
  'northside-plumbing',
  'lantern-rock',
  'klangwerk',
  'cellar-door-wines',
  'copperline-brewing',
  'green-light-driving',
  'lichtfeld',
  'cleaver-and-co',
  'facet',
  'polish-nail-bar',
  'kiln-aoi',
  'osteria-lume',
  'zwoelfton',
  'oxbow-workshop',
  'slice-theory',
  'linden-guesthouse',
  'the-rialto-cinema',
  'madrigal-strings',
  'brim-hat-shop',
  'piquant-provisions',
  'coral-cove-beach-club',
  'atelier-vane',
  'suds-car-wash',
  'cadence-music',
  'vinyl-vault',
  'nordlicht',
  'parkside-family-medicine',
  'revue-marges',
  'double-stack-burgers',
  'align-physio',
  'zenith-observatory',
  'harbor-light-tours',
  'orgelwerk',
  'salzhaus',
  'whitlock-ames',
  'hachi-ramen',
  'konzerthaus-halden',
  'birk-mobler',
  'crabapple-orchard',
  'hafen-sechs',
  'dog-eared-books',
  'ember-and-oak',
  'hopscotch-museum',
  'bolt-and-bench',
  'relay',
  'terrace-hill-winery',
  'norrbolt',
  'spin-cycle-laundry',
  'caldera-rail',
  'blue-note-room',
  'grafit',
  'lakeshore-cabins',
  'forge-strength',
  'satchel-and-strap',
  'sammlung-weiss',
  'trailhead-club',
  'commons-cowork',
  'sunday-market',
  'fennel-and-thyme',
  'bright-smiles-kids',
  'frequenz',
  'grain-and-glow',
  'marais-blanc',
  'kryss',
  'stillpoint-yoga',
  'tinker-toys',
  'presse-neun',
  'el-farolito-truck',
  'cerulean-swim',
  'sable-and-pine',
  'clearwater-dental',
  'cacao-and-co',
  'solstice',
  'nori-sushi',
  'xerox-riot',
  'pointe-and-pulse',
  'maison-ambre',
  'offshore-surf',
  'spruce-cleaning',
  'kaella',
  'the-glasshouse',
  'pawsh-grooming',
  'nullsec',
  'polyglot-school',
  'kupferwalz',
  'hewn-furniture',
  'fonds-aubert',
  'fernhill-gardens',
  'clear-view-optical',
  'isobar',
  'high-pass-lodge',
  'harbour-ledger',
  'nullpunkt',
  'restore-clinic',
  'parallel-studio',
  'pinewood-rv',
  'mesura',
  'inkwell-tattoo',
  'velo-criterium',
  'northgate-homes',
  'saltline-oyster',
  'silbersalz',
  'falzbogen',
  'scoop-and-cone',
  'chronometrie-bex',
  'little-fins-swim',
  'tally-and-co',
  'verdant',
  'pixelmelt',
  'keel-wealth',
  'mistral-cycles',
  'glaze-donuts',
  'maren-holt',
  'bogen-papier',
  'hollis-hart',
  'glockenhof',
  'wick-and-wax',
  'crumb-bakehouse',
  'form-and-field',
  'betonpark',
  'quanta-robotics',
  'spoke-and-chain',
  'morrow-coffee',
  'halbfett',
  'rootbound-nursery',
  'tiefsee',
  'bonbon-club',
  'crux-climbing',
  'meterware',
  'wayfarer-travel',
  'kessler-auto',
  'keyway-locksmiths',
];
