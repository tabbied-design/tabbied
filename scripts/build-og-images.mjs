#!/usr/bin/env node
/**
 * The share cards for the pattern pages: 1200x630 JPEGs in `public/og/`, the
 * shape X, LinkedIn and Slack frame a large card in. They used to be the
 * 960x960 WebP previews, which those unfurlers crop to a strip (and some do
 * not read at all).
 *
 *   public/og/patterns/<slug>.jpg   og.png's brand panel beside the design's
 *                                   committed preview (public/previews)
 *
 * The templates had cards of their own, their screenshots, until their
 * framed preview pages were removed (a template opens straight in the
 * customizer, one page for every template); public/og/templates/ is cleared
 * if an older build left it.
 *
 * Derived from committed files only, with no browser and no fonts: the brand
 * panel is cut from public/og.png, so the deploy build makes the same bytes a
 * laptop does. Not committed: the build writes them before the export
 * (prebuild), like the image manifest.
 *
 * Incremental: a card newer than its sources and this script is kept, so a
 * second run is a no-op. Retired designs lose their cards.
 *
 *   node scripts/build-og-images.mjs [--force]
 */
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PUBLIC = join(ROOT, 'public');
const OUT = join(PUBLIC, 'og');
const PREVIEWS = join(PUBLIC, 'previews');
const BASE = join(PUBLIC, 'og.png');
const SELF = fileURLToPath(import.meta.url);

const WIDTH = 1200;
const HEIGHT = 630;
// og.png's left panel (the mark, the line of copy, the URL) ends where its
// pattern tiles begin; the design fills the square to its right.
const PANEL = WIDTH - HEIGHT;
const JPEG = { quality: 84 };

const force = process.argv.includes('--force');

const slugsIn = (dir, extension) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((file) => file.endsWith(extension))
        .map((file) => file.slice(0, -extension.length))
        .sort()
    : [];

const mtime = (file) => statSync(file).mtimeMs;

const stale = (target, sources) =>
  force || !existsSync(target) || sources.some((source) => mtime(source) > mtime(target));

function removeOrphans(dir, keep) {
  for (const file of existsSync(dir) ? readdirSync(dir) : []) {
    if (!keep.has(file.replace(/\.jpg$/, ''))) rmSync(join(dir, file));
  }
}

const sharp = (await import('sharp')).default;

const panel = await sharp(BASE)
  .extract({ left: 0, top: 0, width: PANEL, height: HEIGHT })
  .png()
  .toBuffer();

const canvas = () =>
  sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: '#0e0e13' } });

async function patternCard(slug) {
  const preview = join(PREVIEWS, `${slug}.webp`);
  const target = join(OUT, 'patterns', `${slug}.jpg`);

  if (!stale(target, [preview, BASE, SELF])) return false;

  const square = await sharp(preview).resize(HEIGHT, HEIGHT, { fit: 'cover' }).toBuffer();
  await canvas()
    .composite([
      { input: panel, left: 0, top: 0 },
      { input: square, left: PANEL, top: 0 },
    ])
    .jpeg(JPEG)
    .toFile(target);

  return true;
}

const patterns = slugsIn(PREVIEWS, '.webp');

mkdirSync(join(OUT, 'patterns'), { recursive: true });
removeOrphans(join(OUT, 'patterns'), new Set(patterns));
rmSync(join(OUT, 'templates'), { recursive: true, force: true });

// A few at a time: sharp works off the main thread, so this is what keeps a
// fresh build (every card) to seconds.
async function eachLimited(jobs, limit) {
  let next = 0;
  let count = 0;
  const worker = async () => {
    while (next < jobs.length) if (await jobs[next++]()) count += 1;
  };
  await Promise.all(Array.from({ length: limit }, worker));
  return count;
}

const written = await eachLimited(
  patterns.map((slug) => () => patternCard(slug)),
  4
);

console.log(`og: ${written} share card(s) written, ${patterns.length - written} up to date`);
