// Gathers what the showcase reads from the rest of the repo, so no figure or
// screenshot in the video is typed in by hand:
//
//   src/generated/data.json      the counts the site quotes, the palettes the
//                                recolor scene cycles, the templates on the rails
//   public/generated/templates/  those templates' committed screenshots
//
// Both are gitignored and rewritten on every `npm run render` / `studio`.
// Node imports the site's TypeScript modules directly (type stripping), the
// same ones lib/siteCounts.ts counts.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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

// The recolor scene's palettes, by id, in the order it shows them.
const RECOLOR = ['lib-neon', 'lib-bauhaus', 'lib-sunset', 'lib-ocean', 'lib-candy', 'lib-terracotta'];
const byId = new Map(PALETTE_LIBRARY.map((palette) => [palette.id, palette]));
const recolor = RECOLOR.map((id) => {
  const palette = byId.get(id);
  if (!palette) throw new Error(`prepare: no palette "${id}" in lib/paletteLibrary.ts`);
  return palette;
});

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
  recolor,
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
