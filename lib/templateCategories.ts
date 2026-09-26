// Every template site, by category, for the gallery's filter row. Hand-assigned,
// since no keyword rule sorts free-form topics into bins. A site missing from
// this table fails the build (`categoryOf` throws while the gallery
// prerenders); otherwise it would be a card no filter reaches.

export const TEMPLATE_CATEGORIES = [
  'Shop',
  'Services',
  'Health',
  'Studio',
  'Culture',
  'Community',
  'Science & tech',
  'Industry',
  'Travel',
  'Food & drink',
  'Wellness & sport',
  'Media',
] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

const BY_SLUG: Record<string, TemplateCategory> = {
  // The first collection.
  solstice: 'Wellness & sport',
  'ember-and-oak': 'Food & drink',
  facet: 'Shop',
  verdant: 'Shop',
  nocturne: 'Shop',

  // The second.
  'mistral-cycles': 'Shop',
  'zenith-observatory': 'Culture',
  'maison-ambre': 'Shop',
  'cairn-expeditions': 'Travel',
  'hopscotch-museum': 'Culture',
  'cerulean-swim': 'Shop',
  'oxbow-workshop': 'Studio',
  'piquant-provisions': 'Food & drink',
  'quanta-robotics': 'Science & tech',
  'madrigal-strings': 'Studio',
  'caldera-rail': 'Travel',
  'konzerthaus-halden': 'Culture',
  'institut-vollmer': 'Science & tech',
  'linie-nord': 'Travel',
  'chronometrie-bex': 'Shop',
  'bogen-papier': 'Shop',
  werkraum: 'Studio',
  nordlicht: 'Science & tech',
  halbfett: 'Studio',
  'hafen-sechs': 'Industry',
  klangwerk: 'Studio',
  mesura: 'Science & tech',
  seconde: 'Wellness & sport',
  'cobalt-works': 'Industry',
  nullpunkt: 'Science & tech',
  'sammlung-weiss': 'Culture',
  frequenz: 'Media',
  'fonds-aubert': 'Culture',
  passform: 'Shop',
  meterware: 'Industry',
  sichtbeton: 'Industry',
  kaella: 'Industry',
  nachtzug: 'Travel',
  lichtfeld: 'Studio',
  silbersalz: 'Studio',
  kryss: 'Studio',
  salzhaus: 'Culture',
  zwoelfton: 'Culture',
  'bureau-vektor': 'Science & tech',
  'presse-neun': 'Studio',
  isobar: 'Science & tech',
  beaufort: 'Industry',
  grafit: 'Shop',
  falzbogen: 'Industry',
  kubus: 'Culture',
  tiefsee: 'Science & tech',
  glockenhof: 'Industry',
  orgelwerk: 'Industry',
  'marais-blanc': 'Food & drink',
  ringmark: 'Science & tech',
  kupferwalz: 'Industry',
  purpurhaus: 'Industry',
  betonpark: 'Wellness & sport',
  'revue-marges': 'Media',
  'orbital-lounge': 'Food & drink',
  pixelmelt: 'Studio',
  'birk-mobler': 'Shop',
  'werkstatt-neun': 'Studio',
  'hotel-meridien': 'Travel',
  'kiln-aoi': 'Studio',
  nullsec: 'Science & tech',
  'bonbon-club': 'Culture',
  'sable-and-pine': 'Studio',
  'harbour-ledger': 'Media',
  'fennel-and-thyme': 'Shop',
  norrbolt: 'Shop',
  'lantern-rock': 'Travel',
  'xerox-riot': 'Media',
  'tidy-ledger': 'Science & tech',
  'atelier-vane': 'Shop',
  'mesa-outfitters': 'Travel',
  'velo-criterium': 'Wellness & sport',

  // The minimal set.
  'osteria-lume': 'Food & drink',
  'morrow-coffee': 'Food & drink',
  'crumb-bakehouse': 'Food & drink',
  'clearwater-dental': 'Health',
  'whitlock-ames': 'Services',
  'tally-and-co': 'Services',
  'northgate-homes': 'Services',
  'fringe-salon': 'Wellness & sport',
  'stropline-barbers': 'Wellness & sport',
  'stillpoint-yoga': 'Wellness & sport',
  'forge-strength': 'Wellness & sport',
  'northside-plumbing': 'Services',
  'fernhill-gardens': 'Services',
  'maple-street-vets': 'Health',
  'little-acorns': 'Community',
  'the-glasshouse': 'Travel',
  'wild-stem': 'Shop',
  'dog-eared-books': 'Shop',
  'copperline-brewing': 'Food & drink',
  'align-physio': 'Health',
  'quiet-harbor': 'Health',
  'maren-holt': 'Studio',
  'parallel-studio': 'Studio',
  relay: 'Science & tech',
  'common-table': 'Community',
  'spruce-cleaning': 'Services',
  'kessler-auto': 'Services',
  'linden-guesthouse': 'Travel',
  'cadence-music': 'Community',
  'commons-cowork': 'Services',

  // Pictures that follow the palette (components/Artwork.tsx).
  'inkwell-tattoo': 'Studio',
  'saltline-oyster': 'Food & drink',
  'bolt-and-bench': 'Shop',
  'cellar-door-wines': 'Shop',
  'platen-press': 'Studio',
  'trailhead-club': 'Community',
  'keyway-locksmiths': 'Services',
  'corner-pharmacy': 'Health',
  'scoop-and-cone': 'Food & drink',
  'bright-smiles-kids': 'Health',
  'wayfarer-travel': 'Travel',
  'spoke-and-chain': 'Shop',
  'sunday-market': 'Food & drink',
  'pawsh-grooming': 'Services',
  'rootbound-nursery': 'Shop',
  'el-farolito-truck': 'Food & drink',
  'pinecone-camp': 'Community',
  'slice-theory': 'Food & drink',
  'polyglot-school': 'Community',
  'bloom-events': 'Services',
  'suds-car-wash': 'Services',
  'spin-cycle-laundry': 'Services',
  'tinker-toys': 'Shop',
  'glaze-donuts': 'Food & drink',
  'nori-sushi': 'Food & drink',
  'form-and-field': 'Studio',
  'lumen-portraits': 'Studio',
  'thread-and-hem': 'Shop',
  'blue-note-room': 'Culture',
  'keel-wealth': 'Services',
  'hewn-furniture': 'Shop',
  'restore-clinic': 'Health',
  'hollis-hart': 'Services',
  'grain-and-glow': 'Wellness & sport',
  'vinyl-vault': 'Shop',
  'the-wren-hotel': 'Travel',
  'wheelhouse-ceramics': 'Studio',
  'stride-sneakers': 'Shop',
  'offshore-surf': 'Wellness & sport',
  'wick-and-wax': 'Shop',
  'high-pass-lodge': 'Travel',
  'lakeshore-cabins': 'Travel',
  'old-town-walks': 'Travel',
  'terrace-hill-winery': 'Food & drink',
  'pinewood-rv': 'Travel',
  'cleaver-and-co': 'Food & drink',
  'pressed-juice': 'Food & drink',
  'double-stack-burgers': 'Food & drink',
  'the-rialto-cinema': 'Culture',
  'crabapple-orchard': 'Food & drink',
  'hive-and-honey': 'Shop',
  'little-fins-swim': 'Wellness & sport',
  'green-light-driving': 'Services',
  'cacao-and-co': 'Shop',
  'brim-hat-shop': 'Shop',
  'live-wire-electric': 'Services',
  'hachi-ramen': 'Food & drink',
  'crux-climbing': 'Wellness & sport',
  'pointe-and-pulse': 'Culture',
  'coral-cove-beach-club': 'Travel',
  'meeple-and-mug': 'Community',
  'clear-view-optical': 'Health',
  'veil-and-vow': 'Shop',
  'satchel-and-strap': 'Studio',
  'harbor-light-tours': 'Travel',
  'parkside-family-medicine': 'Health',
  'the-gimlet': 'Food & drink',
  'polish-nail-bar': 'Services',
  'tin-roof-guitars': 'Shop',
  'heron-point-golf': 'Wellness & sport',
};

/**
 * A category as the gallery's URL spells it: `?category=food-and-drink`.
 * Lowercase, "&" read as "and", anything else not a letter or digit a hyphen.
 */
export function categorySlug(category: TemplateCategory): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The category a URL slug names, or null for one that names none. */
export function categoryFromSlug(slug: string): TemplateCategory | null {
  return TEMPLATE_CATEGORIES.find((category) => categorySlug(category) === slug) ?? null;
}

/** The category a site is filed under; throws for a site the table has not met. */
export function categoryOf(slug: string): TemplateCategory {
  const category = BY_SLUG[slug];

  if (!category) {
    throw new Error(
      `templateCategories: no category for "${slug}" - add it to lib/templateCategories.ts`
    );
  }

  return category;
}
