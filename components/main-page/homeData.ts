// What the homepage shows of the template catalog: the trades the hero's tabs
// switch between, the slides of the "skilled hands" carousel, and the
// template the "Any template" section recolors. Every entry names a real
// template by slug; homeShowcase.ts resolves the rest (its name, kind,
// category, colors and screenshot) from the registries on the server, and
// fails the export on a slug no template has, so what the homepage shows and
// where it leads cannot come apart.
//
// The 14 October design drew these as mockups of fictional businesses
// (Lumen, Kettle Plumbing, Ashby Plumbing, Studio Nova), several of which
// were not templates and some of which named a different one. Only the
// editorial choices live here now: which template stands for a trade, the
// tab's height, and a slide's photograph and sentence.
//
// No imports, so scripts/capture-home-tabs.mjs can read the slugs under
// Node's own TypeScript support, and the client components that read this
// carry only these few kilobytes.

/** One of the hero's trades: the tab's label, the template behind it, and the tab's visible height in px. */
export type HeroTrade = { label: string; slug: string; tabHeight: number };

export const HERO_TRADES: readonly HeroTrade[] = [
  { label: 'Upholsterer', slug: 'tack-and-button', tabHeight: 50 },
  { label: 'Locksmith', slug: 'keyway-locksmiths', tabHeight: 58 },
  { label: 'Café', slug: 'morrow-coffee', tabHeight: 46 },
  { label: 'Dog groomer', slug: 'muddy-paws-mobile', tabHeight: 62 },
  { label: 'Tailor', slug: 'running-stitch-alterations', tabHeight: 52 },
  { label: 'Florist', slug: 'posy-wedding-flowers', tabHeight: 56 },
  { label: 'Hair salon', slug: 'fringe-salon', tabHeight: 64 },
  { label: 'Plumber', slug: 'northside-plumbing', tabHeight: 48 },
  { label: 'Baker', slug: 'rye-and-levain', tabHeight: 60 },
  { label: 'Joiner', slug: 'true-grain-carpentry', tabHeight: 50 },
  { label: 'Electrician', slug: 'live-wire-electric', tabHeight: 58 },
  { label: 'Landscaper', slug: 'fernhill-gardens', tabHeight: 46 },
  { label: 'Ceramicist', slug: 'wheelhouse-ceramics', tabHeight: 54 },
  { label: 'Barber', slug: 'stropline-barbers', tabHeight: 50 },
];

/** The trades the hero opens on: the large window, then the small one. */
export const FIRST_TRADE = 6;
export const SECOND_TRADE = 7;

/**
 * A slide of the carousel: a template, a photograph of its trade
 * (public/images/home/slides/<photo>.webp, 1600x900), and a sentence on what
 * the template holds, written from its own sections.
 */
export type HomeSlide = { slug: string; photo: string; description: string };

export const SLIDES: readonly HomeSlide[] = [
  { slug: 'inkwell-tattoo', photo: 'tattoo', description: 'A flash wall, house rules, the artists, aftercare and deposits for a tattoo studio.' },
  { slug: 'el-farolito-truck', photo: 'tacos', description: "This week's stops, the menu, salsas and catering bookings for a taco truck." },
  { slug: 'ringlet-curl-studio', photo: 'hair-salon', description: 'A curl type guide, prices by length and booking for a curly hair specialist.' },
  { slug: 'pawsh-grooming', photo: 'dog-grooming', description: 'Prices by size, extras, the groomers and first-visit notes for a dog grooming salon.' },
  { slug: 'crumb-bakehouse', photo: 'bakery', description: "Today's bakes, breads of the week, pre-orders and wholesale for a neighborhood bakery." },
  { slug: 'stitch-lane-tailors', photo: 'tailor', description: 'A price on every tag, turnaround times and fittings for a tailor and alterations shop.' },
  { slug: 'oxbow-workshop', photo: 'woodwork', description: 'The collection, notes on joinery and commissions for a furniture workshop.' },
  { slug: 'heartwood-arborists', photo: 'landscaping', description: 'Services, tree surveys, storm callouts and a pricing guide for tree surgeons.' },
  { slug: 'northside-plumbing', photo: 'plumbing', description: 'Services, a price guide, the areas covered and quote requests for plumbers and heating engineers.' },
];

/**
 * "Any template. Entirely your own.": the template the section recolors, live,
 * through the same engine and runtime as the customizer, and what its toolbar
 * offers. The template's own palette and patterns come first; then library
 * palettes (lib/paletteLibrary.ts, by id) and catalog designs (by slug).
 */
export const MAKE_IT_YOURS = {
  slug: 'live-wire-electric',
  palettes: ['lib-cobalt', 'lib-seventies', 'lib-matcha'],
  designs: ['truchetrings', 'ogee', 'kawung'],
} as const;

/**
 * The developers section's sample: the catalog design it imports, the palette
 * it passes and the height it pins. The code card prints these and the strip
 * under it draws them, so the two cannot disagree. Here rather than beside
 * the strip because the code is written on the server and the strip is a
 * client module, whose plain exports a server component cannot read.
 */
export const DEV_SAMPLE = {
  // The strip imports this design by its own entry (DevelopersLive.tsx), so
  // a change here is a change there.
  design: 'ogee',
  palette: ['#2b1e3f', '#ff4f8b', '#ffd23e', '#7048e8'],
  height: 120,
} as const;
