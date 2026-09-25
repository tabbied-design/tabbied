#!/usr/bin/env node
/**
 * Rasterize a real Tabbied pattern to PNG, for use as an image input to an
 * image model (see docs/pattern-mockups.md).
 *
 * A mockup has to contain the ACTUAL pattern, and a model cannot execute
 * css-doodle, so it is rendered here and the model is handed the pixels.
 *
 * css-doodle is a custom element, so this runs in a real browser: a tiny
 * static server exposes the repo, Playwright loads the built core from it, and
 * the mounted element is screenshotted directly.
 *
 * Usage:
 *   node scripts/render-pattern.mjs --design prisma --out refs/poster.png \
 *     [--palette "#111,#eee,#e1261c"] [--seed mk1] [--width 1024] [--height 1536]
 *
 * Options:
 *   --design <slug>    Pattern slug from packages/tabbied/patterns (required)
 *   --out <file>       PNG destination (required)
 *   --palette <list>   Comma-separated hexes, background first (default: authored)
 *   --seed <string>    Fixed seed, so a re-render is byte-identical
 *   --width/--height   Render size in px (default 1024 x 1024)
 *   --fit <mode>       grid | cover | fixed (default grid)
 *   --cell <n>         cellSize override; larger cells survive the model redraw
 *   --scale <n>        deviceScaleFactor (default 2)
 */
import { createServer } from 'node:http';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const o = {
    design: null, out: null, palette: null, seed: 'mockup',
    width: 1024, height: 1024, fit: 'grid', cell: null, scale: 2,
  };
  for (let i = 0; i < argv.length; i++) {
    const next = () => argv[++i];
    switch (argv[i]) {
      case '--design': o.design = next(); break;
      case '--out': o.out = next(); break;
      case '--palette': o.palette = next().split(',').map((s) => s.trim()).filter(Boolean); break;
      case '--seed': o.seed = next(); break;
      case '--width': o.width = Number(next()); break;
      case '--height': o.height = Number(next()); break;
      case '--fit': o.fit = next(); break;
      case '--cell': o.cell = Number(next()); break;
      case '--scale': o.scale = Number(next()); break;
      default: console.error(`Unknown argument: ${argv[i]}`); process.exit(1);
    }
  }
  if (!o.design || !o.out) { console.error('--design and --out are required'); process.exit(1); }
  return o;
}

const MIME = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.html': 'text/html' };

/** Serve the repo so the page can import the built ESM by URL. */
function serveRepo() {
  return new Promise((res) => {
    const server = createServer((req, out) => {
      const file = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (!file.startsWith(ROOT) || !existsSync(file)) { out.writeHead(404).end(); return; }
      out.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
      out.end(readFileSync(file));
    });
    server.listen(0, '127.0.0.1', () => res({ server, port: server.address().port }));
  });
}

export async function renderPattern(opts) {
  const defPath = join(ROOT, 'packages/tabbied/patterns', `${opts.design}.json`);
  if (!existsSync(defPath)) throw new Error(`unknown design "${opts.design}"`);
  const definition = JSON.parse(readFileSync(defPath, 'utf8'));

  const { server, port } = await serveRepo();
  const browser = await chromium.launch({
    // Playwright's own browser unless a binary is named.
    ...(process.env.MOCKUP_CHROMIUM ? { executablePath: process.env.MOCKUP_CHROMIUM } : {}),
  });
  try {
    const page = await browser.newPage({
      viewport: { width: opts.width, height: opts.height },
      deviceScaleFactor: opts.scale,
    });
    await page.goto(`http://127.0.0.1:${port}/scripts/render-pattern.html`);
    await page.evaluate(
      async ([def, o]) => window.__render(def, o),
      [definition, { palette: opts.palette, seed: opts.seed, fit: opts.fit, cell: opts.cell,
                     width: opts.width, height: opts.height }],
    );
    // css-doodle paints asynchronously; give it a frame or two to settle.
    await page.waitForTimeout(900);
    mkdirSync(dirname(opts.out), { recursive: true });
    await page.locator('#stage').screenshot({ path: opts.out });
  } finally {
    await browser.close();
    server.close();
  }
  return opts.out;
}

if (process.argv[1] && process.argv[1].endsWith('render-pattern.mjs')) {
  const opts = parseArgs(process.argv.slice(2));
  renderPattern(opts)
    .then((p) => console.log(`rendered ${opts.design} -> ${p} (${opts.width}x${opts.height} @${opts.scale}x)`))
    .catch((e) => { console.error(e.message || e); process.exit(1); });
}
