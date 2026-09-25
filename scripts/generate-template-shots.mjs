#!/usr/bin/env node
// Screenshots of the template sites, for the /templates gallery's cards and
// the homepage's template rails.
//
// Each shot starts below the site's top bar: a thumbnail is small, and the
// brand and nav links at the top of every page are the clutter it can least
// afford. `contentTop` finds that bar (and any thin strip stacked with it,
// such as a rule under the header), the page is scrolled past it, and the
// first 1280x960 of content is written to public/template-shots/<slug>.webp
// at 960x720. A card with no shot shows the pattern alone.
//
// Committed rather than built per deploy, like public/previews: the deploy
// build has no browser. Reshoot after a template's hero changes.
//
//   npm run build                                   # needs out/
//   node scripts/generate-template-shots.mjs [slug ...]   (no args = all)
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const SHOTS = join(ROOT, 'public', 'template-shots');
// 4:3, the gallery card's own proportion. The homepage's 16:10 rail crops the
// bottom, which is the least important part of a shot that starts at content.
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

if (!existsSync(join(OUT, 'templates'))) {
  console.error('template-shots: out/ is missing - run `npm run build` first');
  process.exit(1);
}

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(join(OUT, 'templates')).filter((slug) =>
      existsSync(join(OUT, 'templates', slug, 'site', 'index.html'))
    );

/**
 * Runs in the page. Walks down from the top of the page through the stacked
 * full-width bars (a thin announcement strip, the header, a rule under it) and
 * returns where the content starts, marking each bar with data-shot-chrome.
 * A bar is short, or is a masthead holding nav links; anything with the h1 in
 * it is content. A page whose hero starts at the top returns 0.
 */
function contentTop() {
  const vw = window.innerWidth;
  let y = 0;

  for (let step = 0; step < 4; step++) {
    // The first bar may float inset from the edges (a pill nav), so it is
    // looked for a little lower too.
    const probes = step === 0 ? [y + 2, y + 20] : [y + 2];
    const bar = probes
      .flatMap((probe) => document.elementsFromPoint(vw / 2, probe))
      .filter((el) => {
        if (['HTML', 'BODY', 'MAIN'].includes(el.tagName) || el.querySelector('h1')) return false;
        const r = el.getBoundingClientRect();
        const wide = r.width >= vw * (step === 0 ? 0.85 : 0.9);
        const atY = r.top >= y - 3 && r.top <= y + (step === 0 ? 24 : 3);
        const short = r.height > 0 && (r.height <= 220 || (r.height <= 420 && el.querySelectorAll('a').length >= 3));
        return wide && atY && short;
      })
      .at(-1);

    if (!bar) break;
    bar.setAttribute('data-shot-chrome', '');
    y = bar.getBoundingClientRect().bottom;
  }

  return Math.round(y);
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

    await page.evaluate(() => document.fonts.ready);
    const top = await page.evaluate(contentTop);

    // Scrolled rather than clipped, so lazy images and patterns below the
    // first screen mount. A sticky or fixed bar would follow the scroll into
    // the shot, so the bars found are hidden; their space stays in the flow.
    await page.addStyleTag({ content: '[data-shot-chrome] { visibility: hidden !important; }' });
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);
    // Fonts, images and the first draw of every pattern in view.
    await page.waitForTimeout(1500);

    const shot = await page.screenshot({ type: 'png' });
    await sharp(shot)
      .resize(SIZE.width, SIZE.height)
      .webp({ quality: 80 })
      .toFile(join(SHOTS, `${slug}.webp`));
    console.log(`template-shots: ${slug} (from ${top}px)`);
  }
} finally {
  await browser.close();
  server.close();
}
