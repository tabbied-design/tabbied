#!/usr/bin/env node
// What the homepage needs from a template page that its screenshot does not
// hold: a strip of the pattern the site wears, for the hero's trade tabs, and
// the face its headline is set in, for the carousel's "Set in" chip.
//
// For every template components/main-page/homeData.ts names, the page at
// /templates/<slug>/site/ is opened, its first pattern field of some size is
// photographed alone (everything but it and the sections holding it hidden,
// so no headline or picture sits over it), and the middle of it is written to
// public/images/home/tabs/<slug>.webp at twice a tab's size. The h1's face
// goes to components/main-page/homeShowcase.json beside the others.
//
// Committed, like the template screenshots: the deploy build has no browser.
// Recapture after a showcased template's pattern or type changes, or after
// homeData.ts names a new one (homeShowcase.ts falls back to the design's
// catalog preview, in its own colors, until then).
//
//   npm run build && node scripts/capture-home-tabs.mjs [slug ...]
//   node scripts/capture-home-tabs.mjs --base http://localhost:3000 [slug ...]
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const TABS = join(ROOT, 'public', 'images', 'home', 'tabs');
const MANIFEST = join(ROOT, 'components', 'main-page', 'homeShowcase.json');

// The region of the field photographed, in CSS px, and the file written from
// it: a tab is at most 172 by 88, drawn at twice that for a sharp screen.
const REGION = { width: 480, height: 240 };
const SIZE = { width: 400, height: 200 };
// A field smaller than this is a rule or an icon, not something to show.
const MIN_FIELD = { width: 200, height: 100 };

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

const args = process.argv.slice(2);
const baseAt = args.indexOf('--base');
const base = baseAt >= 0 ? args[baseAt + 1] : null;
const named = args.filter((arg, index) => !arg.startsWith('--') && (baseAt < 0 || index !== baseAt + 1));

const { HERO_TRADES, SLIDES, MAKE_IT_YOURS } = await import(
  pathToFileURL(join(ROOT, 'components', 'main-page', 'homeData.ts')).href
);
const showcased = [...new Set([...HERO_TRADES, ...SLIDES, MAKE_IT_YOURS].map((entry) => entry.slug))];
const slugs = named.length ? named : showcased;

if (!base && !existsSync(join(OUT, 'templates'))) {
  console.error('home-tabs: out/ is missing - run `npm run build` first, or pass --base <url>');
  process.exit(1);
}

/**
 * Runs in the page: marks the first pattern field big enough to show and
 * returns the face the h1 is set in. A field is the element a pattern mounts
 * in (`[data-pattern]`), or a <css-doodle>'s parent where none says so.
 */
function markField(min) {
  const hosts = [...document.querySelectorAll('css-doodle')].map(
    (doodle) => doodle.closest('[data-pattern]') ?? doodle.parentElement
  );
  const field = hosts.find((host) => {
    const box = host?.getBoundingClientRect();
    return box && box.width >= min.width && box.height >= min.height;
  });

  field?.setAttribute('data-home-tab', '');
  // Its ancestors stay painted: a field with a transparent ground is drawn
  // over whatever section holds it, and that is part of what the site wears.
  for (let up = field?.parentElement; up && up !== document.body; up = up.parentElement) {
    up.setAttribute('data-home-tab-up', '');
  }

  const h1 = document.querySelector('h1');
  const display = h1 ? getComputedStyle(h1).fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '') : null;

  return { found: Boolean(field), display };
}

let server = null;
let origin = base?.replace(/\/$/, '');

if (!origin) {
  // The export, served the way the host serves it: a directory is its index.
  server = createServer((req, res) => {
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
  origin = `http://127.0.0.1:${server.address().port}`;
}

const browser = await chromium.launch({
  ...(process.env.MOCKUP_CHROMIUM ? { executablePath: process.env.MOCKUP_CHROMIUM } : {}),
});

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};

try {
  mkdirSync(TABS, { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 2,
    // Patterns draw without their morph, so the photograph is the settled one.
    reducedMotion: 'reduce',
  });

  for (const slug of slugs) {
    const response = await page
      .goto(`${origin}/templates/${slug}/site/`, { waitUntil: 'load', timeout: 60_000 })
      .catch(() => null);

    if (!response || !response.ok()) {
      console.error(`home-tabs: ${slug}: no page at /templates/${slug}/site/`);
      process.exitCode = 1;
      continue;
    }

    // Every field in the page mounts and draws.
    await page.waitForFunction(() => customElements.get('css-doodle'), null, { timeout: 30_000 }).catch(() => null);
    await page.waitForTimeout(1500);

    const { found, display } = await page.evaluate(markField, MIN_FIELD);
    manifest[slug] = { ...(manifest[slug] ?? {}), display };

    if (!found) {
      console.error(`home-tabs: ${slug}: no pattern field of ${MIN_FIELD.width}x${MIN_FIELD.height} or more`);
      process.exitCode = 1;
      continue;
    }

    // The field on its ground: every element that is neither the field, inside
    // it, nor one of the sections around it is hidden (visibility is
    // inherited, so a hidden sibling takes its whole subtree with it).
    const style = await page.addStyleTag({
      content:
        'body *:not([data-home-tab-up]):not([data-home-tab]):not([data-home-tab] *) { visibility: hidden !important; }',
    });
    const field = page.locator('[data-home-tab]');
    await field.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const box = await field.boundingBox();
    const shot = await field.screenshot({ type: 'png' });
    const scale = (await sharp(shot).metadata()).width / box.width;
    const width = Math.round(Math.min(box.width, REGION.width) * scale);
    const height = Math.round(Math.min(box.height, REGION.height) * scale);
    const left = Math.round(((box.width * scale) - width) / 2);
    const top = Math.round(((box.height * scale) - height) / 2);

    await sharp(shot)
      .extract({ left, top, width, height })
      .resize(SIZE.width, SIZE.height, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(join(TABS, `${slug}.webp`));

    await style.evaluate((node) => node.remove());
    await page.evaluate(() =>
      document.querySelectorAll('[data-home-tab], [data-home-tab-up]').forEach((el) => {
        el.removeAttribute('data-home-tab');
        el.removeAttribute('data-home-tab-up');
      })
    );
    console.log(`home-tabs: ${slug} (set in ${display ?? 'no h1'})`);
  }
} finally {
  await browser.close();
  server?.close();
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
