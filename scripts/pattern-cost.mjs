#!/usr/bin/env node
// What a design costs to generate, measured in headless Chromium at the
// editor's densest grid.
//
// scripts/gallery-cost.mjs counts what a design costs the gallery to keep on
// screen. This counts what it costs css-doodle to produce: the stylesheet it
// writes into the shadow root, and how long generating and reshuffling take.
// css-doodle evaluates `--rule` once per cell, so a value that is the same in
// every cell (a 240-point `@shape`, an `@svg` texture) is copied into every
// cell; `@var` on a `:doodle` custom property computes it once on the host.
//
//   node scripts/pattern-cost.mjs                 # every design, heaviest first
//   node scripts/pattern-cost.mjs <slug> ...      # just those
//   node scripts/pattern-cost.mjs --budget        # fail on a design over budget
//
// Each design is mounted alone at 418x646 with 36px cells, which is the
// editor's plate at 2:3 and density 1 (an 11x17 grid for the standard
// grid option), through the package's own createPattern, so it is measured
// the way the site draws it. Run `npm run build --workspace tabbied` first.
//
// The budget is on the stylesheet and the node count, which are properties
// of the design and the same on every machine. Timings are printed but never
// gated: they are one machine's, and a gate on them is a flaky test.
import { createServer } from 'node:http';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PATTERNS_DIR = join(ROOT, 'packages/tabbied/patterns');
const PLATE = { width: 418, height: 646, cell: 36 };

/**
 * Per design, at the plate above. A design that goes over is either writing a
 * value into every cell that could be computed once on `:doodle` and read
 * with `@var`, or has cells that are a count of things and wants
 * `sizing.maxCells`.
 */
const BUDGET = { cssKB: 300, nodes: 800 };

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
        const body = readFileSync(file);
        out.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
        out.end(body);
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

const args = process.argv.slice(2);
const budget = args.includes('--budget');
const named = args.filter((arg) => !arg.startsWith('--'));
const chosen = named.length
  ? named.map((slug) => {
      const found = definitions.find((d) => d.slug === slug);
      if (!found) {
        console.error(`pattern-cost: unknown design "${slug}"`);
        process.exit(1);
      }
      return found;
    })
  : definitions;

const { server, port } = await serveRepo();
const browser = await chromium.launch({
  ...(process.env.MOCKUP_CHROMIUM ? { executablePath: process.env.MOCKUP_CHROMIUM } : {}),
});

try {
  const page = await browser.newPage({ viewport: { width: 640, height: 720 }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/scripts/render-pattern.html`);

  const rows = [];

  for (const definition of chosen) {
    const row = await page.evaluate(
      async ([def, plate]) => {
        const stage = document.getElementById('stage');
        const doodle = () => stage.querySelector('css-doodle');
        const cssBytes = () =>
          [...(doodle()?.shadowRoot?.querySelectorAll('style') ?? [])].reduce(
            (sum, style) => sum + style.textContent.length,
            0
          );
        const layout = () => {
          void stage.offsetHeight;
          doodle()?.shadowRoot?.querySelector('cssd-grid, [part="grid"]')?.lastElementChild?.getBoundingClientRect();
        };
        // `@svg` and `@doodle` images are generated after the first paint:
        // wait until the stylesheet stops growing.
        const settle = async () => {
          let last = -1;
          let stable = 0;
          while (stable < 20) {
            await new Promise((r) => requestAnimationFrame(r));
            const now = cssBytes();
            stable = now === last ? stable + 1 : 0;
            last = now;
          }
          return last;
        };

        const t0 = performance.now();
        await window.__render(def, {
          seed: 'cost01',
          fit: 'grid',
          width: plate.width,
          height: plate.height,
          cell: plate.cell,
        });
        layout();
        const genMs = performance.now() - t0;
        const bytes = await settle();
        const nodes = doodle()?.shadowRoot?.querySelectorAll('*').length ?? 0;

        const t1 = performance.now();
        window.__controller.redraw('cost02');
        await new Promise((r) => requestAnimationFrame(r));
        layout();
        const shuffleMs = performance.now() - t1;

        return { cssKB: bytes / 1024, nodes, genMs, shuffleMs };
      },
      [definition, PLATE]
    );

    rows.push({ slug: definition.slug, ...row });
  }

  rows.sort((a, b) => b.cssKB - a.cssKB);

  const header = ['design', 'cssKB', 'nodes', 'genMs', 'shuffleMs'];
  console.log(header.map((h, i) => (i ? h.padStart(10) : h.padEnd(22))).join(''));
  for (const row of rows) {
    console.log(
      [row.slug.padEnd(22), row.cssKB.toFixed(0), row.nodes, row.genMs.toFixed(0), row.shuffleMs.toFixed(0)]
        .map((v, i) => (i ? String(v).padStart(10) : v))
        .join('')
    );
  }

  if (budget) {
    const over = rows.flatMap((row) => {
      const problems = [];
      if (row.cssKB > BUDGET.cssKB) problems.push(`${row.cssKB.toFixed(0)} KB of CSS (budget ${BUDGET.cssKB})`);
      if (row.nodes > BUDGET.nodes) problems.push(`${row.nodes} nodes (budget ${BUDGET.nodes})`);
      return problems.length ? [`${row.slug}: ${problems.join(', ')}`] : [];
    });

    if (over.length) {
      console.error(`\npattern-cost: ${over.length} design(s) over budget\n${over.join('\n')}`);
      process.exitCode = 1;
    } else {
      console.log(`\npattern-cost: ${rows.length} design(s) within budget`);
    }
  }
} finally {
  await browser.close();
  server.close();
}
