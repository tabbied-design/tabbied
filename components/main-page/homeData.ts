// What the homepage shows of the template catalog: the slides of the hero's
// carousel and the template the "Make any template your own" section
// recolors. Every entry names a real template by slug; homeShowcase.ts
// resolves the rest (its name, kind, colors and screenshot) from the
// registries on the server, and fails the export on a slug no template has,
// so what the homepage shows and where it leads cannot come apart.
//
// The designs drew these as mockups of fictional businesses (Black Koi
// Tattoo, Ashby Plumbing, Studio Nova), several of which were not templates
// and some of which named a different one. Only the editorial choices live
// here: which template stands for a trade, and a slide's photograph, heading
// and sentence.
//
// No imports, so scripts/capture-home-showcase.mjs can read the slugs under
// Node's own TypeScript support, and the client components that read this
// carry only these few kilobytes.

/**
 * A slide of the hero's carousel: a template, a photograph of its trade
 * (public/images/home/slides/<photo>.webp, 1600x900), and the trades it
 * stands for, as a heading and the sentence under it (the 15 October
 * design's own copy).
 */
export type HomeSlide = { slug: string; photo: string; trade: string; description: string };

export const SLIDES: readonly HomeSlide[] = [
  { slug: 'crumb-bakehouse', photo: 'bakery', trade: 'Cafés & bakeries', description: 'For bakeries, coffee shops and patisseries.' },
  { slug: 'el-farolito-truck', photo: 'tacos', trade: 'Food & drink', description: 'For food trucks, restaurants and pop-up kitchens.' },
  { slug: 'ringlet-curl-studio', photo: 'hair-salon', trade: 'Hair & beauty', description: 'For hair salons, barbers and nail studios.' },
  { slug: 'pawsh-grooming', photo: 'dog-grooming', trade: 'Pet care', description: 'For dog groomers, walkers and pet sitters.' },
  { slug: 'inkwell-tattoo', photo: 'tattoo', trade: 'Art & design', description: 'For tattoo studios, illustrators and independent artists.' },
  { slug: 'stitch-lane-tailors', photo: 'tailor', trade: 'Fashion & tailoring', description: 'For tailors, dressmakers and alteration studios.' },
  { slug: 'oxbow-workshop', photo: 'woodwork', trade: 'Makers & crafts', description: 'For furniture makers, joiners and ceramicists.' },
  { slug: 'heartwood-arborists', photo: 'landscaping', trade: 'Home & garden', description: 'For landscapers, gardeners and tree surgeons.' },
  { slug: 'northside-plumbing', photo: 'plumbing', trade: 'Trades & repairs', description: 'For plumbers, electricians and heating engineers.' },
];

/**
 * "Make any template your own.": the template the section recolors, live,
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
