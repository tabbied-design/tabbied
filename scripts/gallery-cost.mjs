#!/usr/bin/env node
// What a design costs the gallery, measured in headless Chromium.
//
// The gallery draws 24 live cards a page and keeps every card it has drawn,
// so a design's cost is paid 24 times over. Three numbers decide whether a
// page survives on a phone: DOM nodes across shadow roots, SVG image documents
// opened by `@svg` and `@doodle` backgrounds, and compositing layers. Layers
// matter most: an animated cell is one even when paused, and its texture
// scales with the device pixel ratio squared. See CLAUDE.md, "Importing a
// pattern authored outside this repo".
//
//   node scripts/gallery-cost.mjs                 # every design, sorted by layers
//   node scripts/gallery-cost.mjs <slug> ...      # just those
//   node scripts/gallery-cost.mjs --page 14       # one gallery page's 24
//
// Each design is mounted alone in a 300x260 card at fit: "cover" (the
// gallery's mount), measured after its first arrangement has settled. The
// harness is scripts/render-pattern.html, served from the repo root like the
// preview generator, so the built package is what gets measured: run
// `npm run build --workspace tabbied` first.
import { createServer } from 'node:http';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PATTERNS_DIR = join(ROOT, 'packages/tabbied/patterns');
const PER_PAGE = 24;
const CARD = { width: 300, height: 260 };
const MIME = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.html': 'text/html',
};

const serveRepo = () =>
  new Promise((res) => {
    const server = createServer((req, out) => {
      const file = join(ROOT, decodeURIComponent(req.url.split('?')[0]));

      try {
        out.writeHead(200, {
          'Content-Type': MIME[extname(file)] || 'application/octet-stream',
        });
        out.end(readFileSync(file));
      } catch {
        out.writeHead(404);
        out.end();
      }
    });
    server.listen(0, '127.0.0.1', () => res({ server, port: server.address().port }));
  });

const definitions = readdirSync(PATTERNS_DIR)
  .filter((file) => file.endsWith('.json'))
  .map((file) => JSON.parse(readFileSync(join(PATTERNS_DIR, file), 'utf8')));
const byOrder = [...definitions].sort(
  (a, b) =>
    (a.galleryOrder ?? Number.MAX_SAFE_INTEGER) - (b.galleryOrder ?? Number.MAX_SAFE_INTEGER) ||
    a.name.localeCompare(b.name)
);

const args = process.argv.slice(2);
const pageFlag = args.indexOf('--page');
let chosen;

if (pageFlag >= 0) {
  const n = Number(args[pageFlag + 1]);
  chosen = byOrder.slice((n - 1) * PER_PAGE, n * PER_PAGE);
} else if (args.length) {
  chosen = args.map((slug) => {
    const found = definitions.find((d) => d.slug === slug);
    if (!found) {
      console.error(`gallery-cost: unknown design "${slug}"`);
      process.exit(1);
    }
    return found;
  });
} else {
  chosen = byOrder;
}

const { server, port } = await serveRepo();
const browser = await chromium.launch({
  ...(process.env.MOCKUP_CHROMIUM ? { executablePath: process.env.MOCKUP_CHROMIUM } : {}),
});

try {
  const context = await browser.newContext({ viewport: { width: 640, height: 480 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('LayerTree.enable');
  let layers = [];
  cdp.on('LayerTree.layerTreeDidChange', (event) => {
    layers = event.layers ?? [];
  });
  const documents = async () =>
    (await cdp.send('Performance.getMetrics')).metrics.find((m) => m.name === 'Documents')?.value ?? 0;

  const rows = [];

  for (const definition of chosen) {
    // A fresh document per design: layers and image documents from the last
    // one would otherwise count against the next.
    await page.goto(`http://127.0.0.1:${port}/scripts/render-pattern.html`);
    const before = await documents();

    await page.evaluate(
      async ([def, o]) => window.__render(def, o),
      [definition, { seed: 'cost01', fit: 'cover', ...CARD }]
    );
    await page.waitForTimeout(900);

    // Counted inside the page: nodes and shadow roots under the host, and
    // the animations declared on cells and their pseudo-elements.
    const counted = await page.evaluate(() => {
      const acc = { nodes: 0, shadowRoots: 0, animations: 0 };
      const walk = (root) => {
        for (const el of root.querySelectorAll('*')) {
          acc.nodes += 1;
          if (el.shadowRoot) {
            acc.shadowRoots += 1;
            walk(el.shadowRoot);
          }
          acc.animations += el
            .getAnimations({ subtree: true })
            .filter((a) => a instanceof CSSAnimation).length;
        }
      };
      walk(document.getElementById('stage'));
      return acc;
    });
    const area = layers.reduce((sum, layer) => sum + layer.width * layer.height, 0);

    rows.push({
      slug: definition.slug,
      nodes: counted.nodes,
      shadowRoots: counted.shadowRoots,
      animations: counted.animations,
      documents: Math.max(0, (await documents()) - before),
      layers: layers.length,
      textureMB: Math.round((area * 4) / 1e6),
    });
  }

  rows.sort((a, b) => b.layers - a.layers || b.documents - a.documents || b.nodes - a.nodes);

  const header = ['design', 'nodes', 'shadow', 'anims', 'svgDocs', 'layers', 'texMB@1x'];
  console.log(header.map((h, i) => (i ? h.padStart(9) : h.padEnd(20))).join(''));
  for (const row of rows) {
    console.log(
      [row.slug.padEnd(20), row.nodes, row.shadowRoots, row.animations, row.documents, row.layers, row.textureMB]
        .map((v, i) => (i ? String(v).padStart(9) : v))
        .join('')
    );
  }
} finally {
  await browser.close();
  server.close();
}

