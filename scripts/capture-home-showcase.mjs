#!/usr/bin/env node
// What the homepage needs from a template page that its screenshot does not
// hold: the face its headline is set in, for the hero carousel's "Set in"
// chip, and, for the template the "Make any template your own" section
// recolors, a strip of the pattern the site wears, its toolbar's first
// pattern choice.
//
// For every template components/main-page/homeData.ts names, the page at
// /templates/<slug>/site/ is opened and the h1's face goes to
// components/main-page/homeShowcase.json. For the demo's template, its first
// pattern field of some size is also photographed alone (everything but it
// and the sections holding it hidden, so no headline or picture sits over
// it), and the middle of it is written to public/images/home/strips/<slug>.webp.
//
// Committed, like the template screenshots: the deploy build has no browser.
// Recapture after a showcased template's pattern or type changes, or after
// homeData.ts names a new one (homeShowcase.ts falls back to the design's
// catalog preview, in its own colors, until then). Run with no slugs, it
// rewrites the manifest whole, so a template the homepage no longer shows
// leaves it.
//
//   npm run build && node scripts/capture-home-showcase.mjs [slug ...]
//   node scripts/capture-home-showcase.mjs --base http://localhost:3000 [slug ...]
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const STRIPS = join(ROOT, 'public', 'images', 'home', 'strips');
const MANIFEST = join(ROOT, 'components', 'main-page', 'homeShowcase.json');

// The region of the field photographed, in CSS px, and the file written from
// it, with room to spare for the toolbar's 40 by 32 thumbnail.
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

const { SLIDES, MAKE_IT_YOURS } = await import(
  pathToFileURL(join(ROOT, 'components', 'main-page', 'homeData.ts')).href
);
const showcased = [...new Set([...SLIDES, MAKE_IT_YOURS].map((entry) => entry.slug))];
const slugs = named.length ? named : showcased;

if (!base && !existsSync(join(OUT, 'templates'))) {
  console.error('home-showcase: out/ is missing - run `npm run build` first, or pass --base <url>');
  process.exit(1);
}

/**
 * Runs in the page: marks the first pattern field big enough to show (when
 * asked to) and returns the face the h1 is set in. A field is the element a pattern mounts
 * in (`[data-pattern]`), or a <css-doodle>'s parent where none says so.
 */
function markField({ min, strip }) {
  const h1 = document.querySelector('h1');
  const display = h1 ? getComputedStyle(h1).fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '') : null;

  if (!strip) return { found: false, display };

  const hosts = [...document.querySelectorAll('css-doodle')].map(
    (doodle) => doodle.closest('[data-pattern]') ?? doodle.parentElement
  );
  const field = hosts.find((host) => {
    const box = host?.getBoundingClientRect();
    return box && box.width >= min.width && box.height >= min.height;
  });

  field?.setAttribute('data-home-strip', '');
  // Its ancestors stay painted: a field with a transparent ground is drawn
  // over whatever section holds it, and that is part of what the site wears.
  for (let up = field?.parentElement; up && up !== document.body; up = up.parentElement) {
    up.setAttribute('data-home-strip-up', '');
  }

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

// Named slugs update their entries; a full run starts the manifest afresh.
const manifest = named.length && existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};

try {
  mkdirSync(STRIPS, { recursive: true });
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
      console.error(`home-showcase: ${slug}: no page at /templates/${slug}/site/`);
      process.exitCode = 1;
      continue;
    }

    // Every field in the page mounts and draws.
    await page.waitForFunction(() => customElements.get('css-doodle'), null, { timeout: 30_000 }).catch(() => null);
    await page.waitForTimeout(1500);

    const strip = slug === MAKE_IT_YOURS.slug;
    const { found, display } = await page.evaluate(markField, { min: MIN_FIELD, strip });
    manifest[slug] = { ...(manifest[slug] ?? {}), display };

    if (!strip) {
      console.log(`home-showcase: ${slug} (set in ${display ?? 'no h1'})`);
      continue;
    }

    if (!found) {
      console.error(`home-showcase: ${slug}: no pattern field of ${MIN_FIELD.width}x${MIN_FIELD.height} or more`);
      process.exitCode = 1;
      continue;
    }

    // The field on its ground: every element that is neither the field, inside
    // it, nor one of the sections around it is hidden (visibility is
    // inherited, so a hidden sibling takes its whole subtree with it).
    const style = await page.addStyleTag({
      content:
        'body *:not([data-home-strip-up]):not([data-home-strip]):not([data-home-strip] *) { visibility: hidden !important; }',
    });
    const field = page.locator('[data-home-strip]');
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
      .toFile(join(STRIPS, `${slug}.webp`));

    await style.evaluate((node) => node.remove());
    await page.evaluate(() =>
      document.querySelectorAll('[data-home-strip], [data-home-strip-up]').forEach((el) => {
        el.removeAttribute('data-home-strip');
        el.removeAttribute('data-home-strip-up');
      })
    );
    console.log(`home-showcase: ${slug} (set in ${display ?? 'no h1'}, with its pattern strip)`);
  }
} finally {
  await browser.close();
  server?.close();
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
