// Gathers what the showcase reads from the rest of the repo, so no figure or
// screenshot in the video is typed in by hand:
//
//   src/generated/data.json      the counts the site quotes, the designs on the
//                                pattern carousel and their palettes, the
//                                palettes the recolor scene cycles and the
//                                outro's, the templates on the rails
//   public/generated/templates/  those templates' committed screenshots
//
// Both are gitignored and rewritten on every `npm run render` / `studio`.
// Node imports the site's TypeScript modules directly (type stripping), the
// same ones lib/siteCounts.ts counts.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const videoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repo = path.dirname(videoRoot);

const catalogPath = path.join(repo, 'packages/tabbied/catalog.json');
if (!existsSync(path.join(repo, 'packages/tabbied/dist')) || !existsSync(catalogPath)) {
  console.error(
    'prepare: the tabbied package is not built. From the repo root run\n' +
      '  npm ci && npm run build --workspace tabbied'
  );
  process.exit(1);
}

const { designs } = JSON.parse(readFileSync(catalogPath, 'utf-8'));
const { PALETTE_LIBRARY } = await import(path.join(repo, 'lib/paletteLibrary.ts'));
const { GALLERY_ORDER } = await import(path.join(repo, 'lib/templateOrder.ts'));

const byId = new Map(PALETTE_LIBRARY.map((palette) => [palette.id, palette]));
const libraryPalette = (id) => {
  const palette = byId.get(id);
  if (!palette) throw new Error(`prepare: no palette "${id}" in lib/paletteLibrary.ts`);
  return palette;
};

// The recolor scene's palettes, by id, in the order it shows them.
const RECOLOR = ['lib-neon', 'lib-bauhaus', 'lib-sunset', 'lib-ocean', 'lib-candy', 'lib-terracotta'];
const recolor = RECOLOR.map(libraryPalette);

// The field behind the closing lockup: quiet, so the mark is what reads.
const outro = libraryPalette('lib-graphite');

// The pattern carousel: designs in the gallery's own order, each in a library
// palette, the way the gallery's default "Random per pattern" draws its cards.
// The pool leaves out the neon and candy stories so the columns stay calm, and
// the draw is a seeded shuffle, so every render gets the same pairs.
const CAROUSEL_COUNT = 32;
// A card is small, so the catalog's sparse designs (a few marks on a wide
// ground) leave it nearly empty, and these do not survive the size either:
// a blur, two single sweeps, a soft gradient, and one that ignores its palette.
const CAROUSEL_SKIP = new Set(['bokeh', 'spectrum', 'coil', 'crescendo', 'midnightconfetti']);
const sparse = new Set(designs.filter((design) => design.density === 'sparse').map((design) => design.slug));
const CAROUSEL_PALETTES = [
  'lib-bauhaus', 'lib-terracotta', 'lib-ocean', 'lib-forest', 'lib-oat', 'lib-linen',
  'lib-graphite', 'lib-slate', 'lib-denim', 'lib-moss', 'lib-fern', 'lib-matcha',
  'lib-pine', 'lib-clay', 'lib-marigold', 'lib-brick', 'lib-sable', 'lib-harvest',
  'lib-canyon', 'lib-desert', 'lib-dune', 'lib-espresso', 'lib-seaglass', 'lib-tundra',
  'lib-arctic', 'lib-tide', 'lib-aegean', 'lib-saffron', 'lib-mustard', 'lib-lilac',
  'lib-thistle', 'lib-mauve', 'lib-seventies', 'lib-paper', 'lib-newsprint',
].map(libraryPalette);

const patternsDir = path.join(repo, 'packages/tabbied/patterns');
const galleryDesigns = readdirSync(patternsDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => JSON.parse(readFileSync(path.join(patternsDir, file), 'utf-8')))
  .sort((a, b) => a.galleryOrder - b.galleryOrder)
  .map((design) => design.slug)
  .filter((slug) => !CAROUSEL_SKIP.has(slug) && !sparse.has(slug))
  .slice(0, CAROUSEL_COUNT);

// mulberry32: a few lines, and the same sequence in every Node.
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = seeded(338);
const pool = [...CAROUSEL_PALETTES];
for (let i = pool.length - 1; i > 0; i -= 1) {
  const j = Math.floor(rand() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}
const carousel = galleryDesigns.map((slug, i) => ({ slug, palette: pool[i % pool.length].colors }));

// The rails take the first templates in gallery order, which is already
// spread so that neighbors differ in style.
const RAIL_COUNT = 36;
const shotsDir = path.join(repo, 'public/template-shots');
const templates = GALLERY_ORDER.filter((slug) =>
  existsSync(path.join(shotsDir, `${slug}.webp`))
).slice(0, RAIL_COUNT);

const outShots = path.join(videoRoot, 'public/generated/templates');
rmSync(outShots, { recursive: true, force: true });
mkdirSync(outShots, { recursive: true });
for (const slug of templates) {
  cpSync(path.join(shotsDir, `${slug}.webp`), path.join(outShots, `${slug}.webp`));
}

const data = {
  counts: {
    patterns: designs.length,
    palettes: PALETTE_LIBRARY.length,
    templates: GALLERY_ORDER.length,
  },
  carousel,
  recolor,
  outro,
  templates,
};
mkdirSync(path.join(videoRoot, 'src/generated'), { recursive: true });
writeFileSync(
  path.join(videoRoot, 'src/generated/data.json'),
  JSON.stringify(data, null, 2) + '\n'
);
console.log(
  `prepare: ${data.counts.patterns} patterns, ${data.counts.palettes} palettes, ` +
    `${data.counts.templates} templates; ${templates.length} template shots copied`
);
