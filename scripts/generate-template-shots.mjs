#!/usr/bin/env node
// Screenshots of template sites, for the /templates gallery's cards.
//
// A pilot: the gallery's cards drew only the template's pattern, and a person
// choosing a website template could not see a website. This renders a site's
// first screen from the static export (1280x960, the hero as a visitor meets
// it) and writes public/template-shots/<slug>.webp at 960x720. The gallery
// uses a shot wherever one exists and falls back to the pattern alone, so a
// template with no shot is unchanged; the set is whatever files are here.
//
// Committed rather than built per deploy, like public/previews: the deploy
// build has no browser. Regenerate after a template's hero changes.
//
//   npm run build                                   # needs out/
//   node scripts/generate-template-shots.mjs <slug> ...
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const SHOTS = join(ROOT, 'public', 'template-shots');
// 4:3, the card's own proportion, so the card shows the whole first screen
// rather than cropping the sides off a wider one.
const VIEWPORT = { width: 1280, height: 960 };
const SIZE = { width: 960, height: 720 };
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const slugs = process.argv.slice(2);

if (slugs.length === 0) {
  console.error('template-shots: name the templates to shoot, e.g. solstice werkraum');
  process.exit(1);
}

if (!existsSync(join(OUT, 'templates'))) {
  console.error('template-shots: out/ is missing - run `npm run build` first');
  process.exit(1);
}

// The export, served the way the host serves it: a directory is its index.
const server = createServer((req, res) => {
  let file = join(OUT, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');

  try {
    const body = readFileSync(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const { port } = server.address();

const browser = await chromium.launch({
  ...(process.env.MOCKUP_CHROMIUM ? { executablePath: process.env.MOCKUP_CHROMIUM } : {}),
});

try {
  mkdirSync(SHOTS, { recursive: true });
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });

  for (const slug of slugs) {
    const url = `http://127.0.0.1:${port}/templates/${slug}/site/`;
    const response = await page.goto(url, { waitUntil: 'load', timeout: 60_000 }).catch(() => null);

    if (!response || !response.ok()) {
      console.error(`template-shots: ${slug}: no page at /templates/${slug}/site/`);
      process.exitCode = 1;
      continue;
    }

    // Fonts, images and the first draw of every pattern in view.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);

    const shot = await page.screenshot({ type: 'png' });
    await sharp(shot)
      .resize(SIZE.width, SIZE.height)
      .webp({ quality: 80 })
      .toFile(join(SHOTS, `${slug}.webp`));
    console.log(`template-shots: ${slug}`);
  }
} finally {
  await browser.close();
  server.close();
}
