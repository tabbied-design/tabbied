// What the homepage's pictures of websites are made of: the trades the hero's
// tabs switch between, the slides of the "skilled hands" carousel, and the
// palettes and patterns the "Any template" toolbar offers. They are mockups,
// drawn from the 14 October design's own data, not the template catalog: the
// sites are fictional, and the patterns are still images of real designs,
// cheap enough to draw a dozen of above the fold.
//
// No hooks and no catalog imports, so the client components that read this
// carry only these few kilobytes.

/** A still of a pattern, in public/images/home/patterns/. */
export type PatternImage = { src: string; width: number; height: number; name: string };

const pattern = (name: string, width: number, height: number): PatternImage => ({
  src: `/images/home/patterns/${name}.webp`,
  width,
  height,
  name: name[0].toUpperCase() + name.slice(1),
});

/** The ten stills, by the name the toolbar gives each. */
export const PATTERNS = {
  petals: pattern('petals', 798, 598),
  grid: pattern('grid', 794, 594),
  triangles: pattern('triangles', 792, 592),
  leaves: pattern('leaves', 790, 590),
  shards: pattern('shards', 790, 586),
  rings: pattern('rings', 790, 596),
  folds: pattern('folds', 788, 592),
  ribbons: pattern('ribbons', 790, 588),
  bricks: pattern('bricks', 790, 586),
  steps: pattern('steps', 786, 580),
} as const;

export type PatternName = keyof typeof PATTERNS;

/**
 * A mock site's display face: the family (a next/font variable from
 * homeFonts.ts, with a generic fallback), the weights its brand and headline
 * take, the headline's line height, and `scale`, which evens out how large
 * the faces draw at one font size (Comfortaa is wide, Barlow Condensed
 * narrow).
 */
export type MockFont = {
  family: string;
  brandWeight: number;
  headWeight: number;
  lineHeight: number;
  scale: number;
};

export const MOCK_FONTS = {
  cormorant: { family: 'var(--font-home-cormorant), serif', brandWeight: 500, headWeight: 400, lineHeight: 1.02, scale: 1 },
  italiana: { family: 'var(--font-home-italiana), serif', brandWeight: 400, headWeight: 400, lineHeight: 1.04, scale: 1 },
  jost: { family: 'var(--font-home-jost), sans-serif', brandWeight: 500, headWeight: 300, lineHeight: 1.04, scale: 0.94 },
  barlow: { family: 'var(--font-home-barlow), sans-serif', brandWeight: 600, headWeight: 500, lineHeight: 1, scale: 1.04 },
  comfortaa: { family: 'var(--font-home-comfortaa), sans-serif', brandWeight: 600, headWeight: 600, lineHeight: 1.08, scale: 0.8 },
  oxanium: { family: 'var(--font-home-oxanium), sans-serif', brandWeight: 600, headWeight: 500, lineHeight: 1.04, scale: 0.88 },
} as const satisfies Record<string, MockFont>;

export type MockFontName = keyof typeof MOCK_FONTS;

/** One of the hero's trades: its tab, and the site the mockups draw for it. */
export type Trade = {
  label: string;
  pattern: PatternName;
  /** The tab's visible height above the hero's edge, in px. */
  tabHeight: number;
  font: MockFontName;
  brand: string;
  domain: string;
  head: string;
  sub: string;
  cta: string;
  nav: readonly string[];
  /** The row of mono labels along the large mockup's foot. */
  strip: readonly string[];
  bg: string;
  ink: string;
  muted: string;
  buttonBg: string;
  buttonInk: string;
};

export const TRADES: readonly Trade[] = [
  { label: 'Upholsterer', pattern: 'shards', tabHeight: 50, font: 'cormorant', brand: 'Thread & Frame', domain: 'threadandframe.co', head: 'Old chairs, new stories.', sub: 'Reupholstery and repairs from our workshop on Mill Lane.', cta: 'Get a quote', nav: ['Work', 'Fabrics', 'Process', 'Quote'], strip: ['Chairs', 'Sofas', 'Headboards', 'Fabrics'], bg: '#efe9df', ink: '#2c2620', muted: '#6b5f52', buttonBg: '#2c2620', buttonInk: '#efe9df' },
  { label: 'Locksmith', pattern: 'folds', tabHeight: 58, font: 'barlow', brand: 'Keyway', domain: 'keyway.co', head: "Locked out? We're close.", sub: 'Emergency entry, lock changes and security checks, day or night.', cta: 'Call now', nav: ['Services', 'Areas', 'Prices', 'Contact'], strip: ['Emergency', 'Homes', 'Businesses', 'Safes'], bg: '#1d2229', ink: '#f1f3f5', muted: '#a9b2bd', buttonBg: '#f2c94c', buttonInk: '#1d2229' },
  { label: 'Café', pattern: 'bricks', tabHeight: 46, font: 'cormorant', brand: 'Morrow', domain: 'morrow.coffee', head: 'Good coffee for brighter days.', sub: 'Small-batch roasts, delivered every other Friday.', cta: 'Shop coffee', nav: ['Shop', 'Journal', 'About', 'Cart (0)'], strip: ['Blends', 'Brew gear', 'Journal', 'Our story'], bg: '#f4ede3', ink: '#2a1d14', muted: '#5e4a3b', buttonBg: '#2a1d14', buttonInk: '#f4ede3' },
  { label: 'Dog groomer', pattern: 'ribbons', tabHeight: 62, font: 'comfortaa', brand: 'Scruff', domain: 'scruffgrooming.co', head: 'Fresh cuts for good dogs.', sub: 'Baths, trims and nail care, with treats on the house.', cta: 'Book a groom', nav: ['Services', 'Prices', 'Team', 'Book'], strip: ['Baths', 'Trims', 'Nails', 'Puppies'], bg: '#fff4e8', ink: '#3a2416', muted: '#7a5a44', buttonBg: '#e8743b', buttonInk: '#fff' },
  { label: 'Tailor', pattern: 'grid', tabHeight: 52, font: 'cormorant', brand: 'Hale & Hem', domain: 'haleandhem.com', head: 'Made to fit, made to last.', sub: 'Bespoke suits and alterations, cut by hand.', cta: 'Book a fitting', nav: ['Bespoke', 'Alterations', 'Cloth', 'Visit'], strip: ['Suits', 'Shirts', 'Alterations', 'Cloth'], bg: '#1c1d22', ink: '#ece8df', muted: '#a8a294', buttonBg: '#ece8df', buttonInk: '#1c1d22' },
  { label: 'Florist', pattern: 'leaves', tabHeight: 56, font: 'italiana', brand: 'Rose & Stem', domain: 'roseandstem.co', head: 'Flowers for any Tuesday.', sub: 'Seasonal bouquets, weddings and weekly deliveries.', cta: 'Order flowers', nav: ['Shop', 'Weddings', 'Events', 'About'], strip: ['Bouquets', 'Weddings', 'Subscriptions', 'Plants'], bg: '#eef3ea', ink: '#1f3326', muted: '#4f6655', buttonBg: '#2f6b45', buttonInk: '#fff' },
  { label: 'Hair salon', pattern: 'petals', tabHeight: 64, font: 'italiana', brand: 'Lumen', domain: 'lumenhair.co', head: 'Good hair days, booked.', sub: 'Cuts, color and styling on Elm Street. Open late on Thursdays.', cta: 'Book a chair', nav: ['Services', 'Stylists', 'Prices', 'Book'], strip: ['Cuts', 'Color', 'Styling', 'Bridal'], bg: '#f6ebe7', ink: '#2b1a1d', muted: '#6b4f55', buttonBg: '#2b1a1d', buttonInk: '#f6ebe7' },
  { label: 'Plumber', pattern: 'rings', tabHeight: 48, font: 'jost', brand: 'Kettle Plumbing', domain: 'kettleplumbing.co', head: 'Leaks fixed today.', sub: 'Local plumbers for repairs, boilers and bathrooms.', cta: 'Call now', nav: ['Services', 'Areas', 'Contact', 'Reviews'], strip: ['Repairs', 'Boilers', 'Bathrooms', 'Emergencies'], bg: '#16232b', ink: '#eef3f2', muted: '#b9c7c6', buttonBg: '#ffcf5a', buttonInk: '#16232b' },
  { label: 'Baker', pattern: 'steps', tabHeight: 60, font: 'jost', brand: 'Crumb', domain: 'crumbbakery.co', head: 'Bread worth waking up for.', sub: 'Sourdough, pastries and cakes, baked before sunrise.', cta: "See today's bakes", nav: ['Bakes', 'Cakes', 'Wholesale', 'Visit'], strip: ['Bread', 'Pastries', 'Cakes', 'Coffee'], bg: '#fbf1e3', ink: '#3b2412', muted: '#7a5638', buttonBg: '#c8642d', buttonInk: '#fff' },
  { label: 'Joiner', pattern: 'bricks', tabHeight: 50, font: 'barlow', brand: 'Oak & Joint', domain: 'oakandjoint.co', head: 'Built in, built well.', sub: 'Kitchens, staircases and fitted furniture, made to measure.', cta: 'Start a project', nav: ['Work', 'Services', 'Process', 'Contact'], strip: ['Kitchens', 'Stairs', 'Wardrobes', 'Doors'], bg: '#f1ebe2', ink: '#2d2218', muted: '#6a5848', buttonBg: '#8a5a32', buttonInk: '#fff' },
  { label: 'Electrician', pattern: 'triangles', tabHeight: 58, font: 'oxanium', brand: 'Brightline', domain: 'brightline.co', head: 'Power, sorted.', sub: 'Rewires, lighting and EV chargers. Certified and insured.', cta: 'Book a visit', nav: ['Services', 'Areas', 'Reviews', 'Contact'], strip: ['Rewires', 'Lighting', 'EV chargers', 'Testing'], bg: '#16182a', ink: '#f4f3ee', muted: '#a9abc0', buttonBg: '#ffd23f', buttonInk: '#16182a' },
  { label: 'Landscaper', pattern: 'leaves', tabHeight: 46, font: 'jost', brand: 'Fieldwork', domain: 'fieldwork.garden', head: 'Gardens that grow on you.', sub: 'Design, planting and upkeep for gardens of every size.', cta: 'Plan your garden', nav: ['Projects', 'Services', 'Process', 'Contact'], strip: ['Design', 'Planting', 'Patios', 'Upkeep'], bg: '#e8eee3', ink: '#213020', muted: '#566650', buttonBg: '#3d5c33', buttonInk: '#fff' },
  { label: 'Ceramicist', pattern: 'shards', tabHeight: 54, font: 'cormorant', brand: 'Kiln Studio', domain: 'kilnstudio.co', head: 'Made by hand, fired with care.', sub: 'Small-batch tableware and weekend wheel classes.', cta: 'Shop pieces', nav: ['Shop', 'Classes', 'Studio', 'About'], strip: ['Tableware', 'Vases', 'Classes', 'Commissions'], bg: '#f3ece6', ink: '#3a2a22', muted: '#7a6458', buttonBg: '#3a2a22', buttonInk: '#f3ece6' },
  { label: 'Barber', pattern: 'ribbons', tabHeight: 50, font: 'barlow', brand: 'Northside', domain: 'northsidebarbers.co', head: 'Sharp cuts, no fuss.', sub: 'Walk-ins welcome, Tuesday to Saturday.', cta: 'Book a cut', nav: ['Services', 'Barbers', 'Prices', 'Book'], strip: ['Cuts', 'Fades', 'Beards', 'Hot towel'], bg: '#191919', ink: '#f2efe8', muted: '#a8a49b', buttonBg: '#c9a227', buttonInk: '#191919' },
];

/** The trades the hero opens on: the large mockup, then the small one. */
export const FIRST_TRADE = 6;
export const SECOND_TRADE = 7;

export const SLIDE_CATEGORIES = ['All', 'Home services', 'Makers', 'Food', 'Personal care'] as const;

export type SlideCategory = Exclude<(typeof SLIDE_CATEGORIES)[number], 'All'>;

/** A slide of the carousel: a trade, a photograph of it, and a site for it. */
export type Slide = {
  name: string;
  category: SlideCategory;
  description: string;
  /** public/images/home/slides/<photo>.webp, 1600x900. */
  photo: string;
  /** The gallery search the slide's arrow opens, and the words its label says. */
  query: string;
  browseLabel: string;
  brand: string;
  domain: string;
  nav: readonly string[];
  head: string;
  sub: string;
  cta: string;
  font: MockFontName;
  fontName: string;
  headWeight: number;
  pattern: PatternName;
  /** The card's ground while the photograph loads. */
  card: string;
  bg: string;
  ink: string;
  muted: string;
  buttonBg: string;
  buttonInk: string;
  palette: readonly string[];
};

export const SLIDES: readonly Slide[] = [
  { name: 'Black Koi Tattoo', category: 'Personal care', description: 'Portfolios, flash sheets and consultation booking for tattoo artists.', photo: 'tattoo', query: 'tattoo', browseLabel: 'tattoo', brand: 'BLACK KOI', domain: 'blackkoi.studio', nav: ['Artists', 'Flash', 'Aftercare', 'Book'], head: 'Custom tattoos, drawn for you.', sub: 'Consultations all week. Walk-ins on Saturdays.', cta: 'Book a consult', font: 'italiana', fontName: 'Italiana', headWeight: 400, pattern: 'shards', card: '#223836', bg: '#f5f0f7', ink: '#120a1d', muted: '#5a4e66', buttonBg: '#120a1d', buttonInk: '#f5f0f7', palette: ['#120a1d', '#5b1a9a', '#e0aaff', '#f5f0f7'] },
  { name: 'La Esquina Tacos', category: 'Food', description: 'Daily locations, menus and catering requests for food trucks.', photo: 'tacos', query: 'truck', browseLabel: 'food truck', brand: 'LA ESQUINA', domain: 'laesquinatacos.com', nav: ['Menu', 'Find us', 'Catering', 'Order'], head: 'Tacos, wherever we park.', sub: "Find today's spot, then come hungry.", cta: 'Find the truck', font: 'barlow', fontName: 'Barlow Condensed', headWeight: 600, pattern: 'rings', card: '#41322b', bg: '#fff6ea', ink: '#2e1a12', muted: '#6e4f3e', buttonBg: '#e8743b', buttonInk: '#fff', palette: ['#2e1a12', '#e8743b', '#2a7fc1', '#fff6ea'] },
  { name: 'Fringe Salon', category: 'Personal care', description: 'Booking-ready pages for barbers, salons and stylists.', photo: 'hair-salon', query: 'salon', browseLabel: 'salon', brand: 'FRINGE', domain: 'fringesalon.co', nav: ['Services', 'Team', 'Prices', 'Book'], head: 'A fresh take on natural beauty.', sub: 'Cuts, colour and care in Hackney.', cta: 'Book a visit', font: 'oxanium', fontName: 'Oxanium', headWeight: 500, pattern: 'petals', card: '#40343e', bg: '#fdf1f4', ink: '#3b1630', muted: '#6d4a60', buttonBg: '#3b1630', buttonInk: '#fdf1f4', palette: ['#3b1630', '#ff4f8b', '#ffd23f', '#fdf1f4'] },
  { name: 'Scruff Grooming', category: 'Personal care', description: 'Services, prices and online booking for dog groomers.', photo: 'dog-grooming', query: 'grooming', browseLabel: 'grooming', brand: 'Scruff', domain: 'scruffgrooming.co', nav: ['Services', 'Prices', 'Team', 'Book'], head: 'Fresh cuts for good dogs.', sub: 'Baths, trims and nail care, with treats on the house.', cta: 'Book a groom', font: 'comfortaa', fontName: 'Comfortaa', headWeight: 600, pattern: 'ribbons', card: '#273b3a', bg: '#f1f8f6', ink: '#173a3a', muted: '#4b6a68', buttonBg: '#ef6f5e', buttonInk: '#fff', palette: ['#173a3a', '#2fa39b', '#ef6f5e', '#f1f8f6'] },
  { name: 'Crumb Bakehouse', category: 'Food', description: 'Menus, hours and pre-orders for neighborhood bakeries.', photo: 'bakery', query: 'bakery', browseLabel: 'bakery', brand: 'Crumb', domain: 'crumbbakehouse.com', nav: ['Menu', 'Our story', 'Order', 'Visit'], head: 'Baked goodness, for brighter days.', sub: 'Fresh from the oven at 7am, every day.', cta: 'See the menu', font: 'comfortaa', fontName: 'Comfortaa', headWeight: 600, pattern: 'steps', card: '#402f25', bg: '#fbf3e8', ink: '#3a2016', muted: '#6e4c3d', buttonBg: '#2a8c7e', buttonInk: '#fff', palette: ['#3a2016', '#e9965b', '#2a8c7e', '#fbf3e8'] },
  { name: 'Thread & Hem', category: 'Makers', description: 'Pricing, fittings and bookings for tailors and alteration studios.', photo: 'tailor', query: 'tailor', browseLabel: 'tailoring', brand: 'Thread & Hem', domain: 'threadandhem.com', nav: ['Services', 'Pricing', 'About', 'Book'], head: 'Alterations, made to measure.', sub: 'Hems, fittings and repairs, usually within a week.', cta: 'Book a fitting', font: 'jost', fontName: 'Jost', headWeight: 400, pattern: 'folds', card: '#2f3944', bg: '#f5f2ed', ink: '#1f2a33', muted: '#56636c', buttonBg: '#e0703f', buttonInk: '#1f2a33', palette: ['#1f2a33', '#5f8fa6', '#e0703f', '#f5f2ed'] },
  { name: 'Grain Joinery', category: 'Makers', description: 'A portfolio and commissions page for furniture makers and joiners.', photo: 'woodwork', query: 'furniture', browseLabel: 'furniture maker', brand: 'GRAIN', domain: 'grainjoinery.co', nav: ['Work', 'Commissions', 'Process', 'Contact'], head: 'Furniture built to outlast us.', sub: 'Handmade tables, shelving and kitchens in solid oak.', cta: 'Start a commission', font: 'cormorant', fontName: 'Cormorant', headWeight: 500, pattern: 'grid', card: '#47403c', bg: '#efe6da', ink: '#2b1d13', muted: '#6b5544', buttonBg: '#2b1d13', buttonInk: '#efe6da', palette: ['#2b1d13', '#8a5a36', '#d9a066', '#efe6da'] },
  { name: 'Form & Field', category: 'Home services', description: 'Project galleries and quote requests for landscapers and gardeners.', photo: 'landscaping', query: 'garden', browseLabel: 'garden', brand: 'Form & Field', domain: 'formandfield.garden', nav: ['Work', 'Services', 'About', 'Quote'], head: 'Gardens for a calmer tomorrow.', sub: 'Garden design, planting and seasonal care.', cta: 'Get a quote', font: 'italiana', fontName: 'Italiana', headWeight: 400, pattern: 'leaves', card: '#3d4134', bg: '#f1f5ef', ink: '#1d3326', muted: '#4d6455', buttonBg: '#1d3326', buttonInk: '#f1f5ef', palette: ['#1d3326', '#3f7a52', '#9cc7a4', '#f1f5ef'] },
  { name: 'Ashby Plumbing', category: 'Home services', description: 'Service areas, reviews and same-day booking for plumbers and heating engineers.', photo: 'plumbing', query: 'plumbing', browseLabel: 'plumbing', brand: 'ASHBY & SONS', domain: 'ashbyplumbing.com', nav: ['Services', 'Areas', 'Reviews', 'Book'], head: 'Leaks fixed. Same day.', sub: 'Licensed plumbers serving the east side since 1998.', cta: 'Book a visit', font: 'barlow', fontName: 'Barlow Condensed', headWeight: 600, pattern: 'triangles', card: '#323d4f', bg: '#f2f5f9', ink: '#132338', muted: '#4b5d74', buttonBg: '#f2a33a', buttonInk: '#132338', palette: ['#132338', '#2d6fb8', '#f2a33a', '#f2f5f9'] },
];

/** A colorway the "Any template" toolbar offers: ground, ink, and an accent with its own ink. */
export type MockPalette = { name: string; bg: string; ink: string; accent: string; accentInk: string };

export const MOCK_PALETTES: readonly MockPalette[] = [
  { name: 'Ink', bg: '#16232b', ink: '#eef3f2', accent: '#ffcf5a', accentInk: '#16232b' },
  { name: 'Paper', bg: '#f6f4ef', ink: '#16232b', accent: '#0f7c86', accentInk: '#fff' },
  { name: 'Clay', bg: '#f3e2d6', ink: '#3b1f17', accent: '#c4552f', accentInk: '#fff' },
  { name: 'Sage', bg: '#e4ece2', ink: '#1f3326', accent: '#2f6b45', accentInk: '#fff' },
];

export const MOCK_PATTERNS: readonly PatternName[] = ['ribbons', 'rings', 'triangles', 'folds'];

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
