// Screenshots of the site for the showcase's product scenes, written to
// public/ui/*.webp and committed: rendering the video then needs no running
// site, the way the template gallery's shots need no browser at deploy time.
// public/ui/capture.json records their sizes, in image pixels, and where the
// editor's palette rows were, which is where the video's pointer clicks.
//
//   npm run dev                      # at the repo root, in another terminal
//   npm run capture [-- <base-url>]  # here; defaults to http://localhost:3000
//
// Re-run it after a change to any page it shoots. Playwright and sharp come
// from the root install, which the site's own screenshot scripts use too.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const videoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(path.join(videoRoot, '..', 'package.json'));
const { chromium } = require('playwright');
const sharp = require('sharp');

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const OUT = path.join(videoRoot, 'public/ui');
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 1.25;
const SITE = 'orbital-lounge';
const MAX_SITE_HEIGHT = 4200;

// The dev server's own badge, and anything else that is chrome rather than page.
const HIDE = 'nextjs-portal { display: none !important; }';

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(
  process.env.TABBIED_CHROMIUM ? { executablePath: process.env.TABBIED_CHROMIUM } : {}
);
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: SCALE });

async function visit(url) {
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 180_000 });
  await page.addStyleTag({ content: HIDE });
  await page.evaluate(() => document.fonts.ready);
  // Patterns morph in for ~400ms after they mount.
  await page.waitForTimeout(2500);
}

async function shoot(name, options = {}) {
  const png = await page.screenshot(options);
  await sharp(png).webp({ quality: 82 }).toFile(path.join(OUT, `${name}.webp`));
  console.log(`capture: ${name}.webp`);
}

try {
  // The editor, recolored through its own palette rail, one shot per palette.
  await visit('/patterns/radius/');
  await shoot('editor-0');
  const clicks = [];
  for (const [i, name] of ['Sunset', 'Bauhaus', 'Neon'].entries()) {
    const row = page.getByText(name, { exact: true }).first();
    const box = await row.boundingBox();
    clicks.push({ name, x: (box.x + box.width / 2) * SCALE, y: (box.y + box.height / 2) * SCALE });
    await row.click();
    await page.waitForTimeout(1500);
    await shoot(`editor-${i + 1}`);
  }

  // One template site, top to bottom, for the scroll-through.
  await visit(`/templates/${SITE}/site/`);
  const height = Math.min(
    await page.evaluate(() => document.documentElement.scrollHeight),
    MAX_SITE_HEIGHT
  );
  await shoot('site', { fullPage: true, clip: { x: 0, y: 0, width: VIEWPORT.width, height } });

  writeFileSync(
    path.join(OUT, 'capture.json'),
    JSON.stringify(
      {
        editor: { width: VIEWPORT.width * SCALE, height: VIEWPORT.height * SCALE, clicks },
        site: { slug: SITE, width: VIEWPORT.width * SCALE, height: height * SCALE },
      },
      null,
      2
    ) + '\n'
  );
} finally {
  await browser.close();
}
