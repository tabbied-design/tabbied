// The authoring loop for batch 14: checks one family straight from its
// definitions, without writing anything into packages/tabbied/patterns/, so
// several families can be worked on at once.
//
//   node scripts/pattern-gen/check-batch14.mjs d            # lint + render gate
//   node scripts/pattern-gen/check-batch14.mjs d --preview  # + default-look sheets
//   node scripts/pattern-gen/check-batch14.mjs d --svg      # + the SVG-export gate
//   node scripts/pattern-gen/check-batch14.mjs d --cost     # + generation cost
//   node scripts/pattern-gen/check-batch14.mjs d --all      # all of the above
//   ONLY=slug,slug node scripts/pattern-gen/check-batch14.mjs d --svg
//   FREQ=0.4 node scripts/pattern-gen/check-batch14.mjs d --preview  # thinned out
//
// The family is named by its file's letter (pattern-defs-14/d-drift.mjs is
// `d`). Contact sheets land in $B14_OUT/<letter>/ (default /tmp/b14/<letter>/):
//
//   sheet-*-seed1.png / -seed2.png  the thumbnail look (300px, gate wide open)
//                                   before and after a reseed
//   sheet-*-clear.png               the same over a checkerboard with the
//                                   background slot transparent
//   preview-*.png                   the catalog preview look: default options,
//                                   fit "grid", through the package itself
//
// The SVG and cost checks need the built package (npm run build --workspace
// tabbied). Exits non-zero on any failure.
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { RESERVED, TAKEN14, FIRST_ORDER } from './pattern-defs-14/shared.mjs';
import { buildPattern } from './build-batch14.mjs';
import { runRenderSweep } from './render-sweep.mjs';
import { runSvgSweep } from './svg-sweep.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const DEFS_DIR = path.join(HERE, 'pattern-defs-14');

if (!process.env.CHROMIUM_PATH && existsSync('/opt/pw-browsers/chromium')) {
  process.env.CHROMIUM_PATH = '/opt/pw-browsers/chromium';
}
const launch = () =>
  chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

const args = process.argv.slice(2);
const letter = args.find((a) => !a.startsWith('--'));
const flag = (name) => args.includes(`--${name}`) || args.includes('--all');
if (!letter) {
  console.error('usage: check-batch14.mjs <family letter> [--preview] [--svg] [--cost] [--all]');
  process.exit(1);
}

const familyFiles = readdirSync(DEFS_DIR).filter((f) => /^[a-z]-[\w-]+\.mjs$/.test(f)).sort();
const file = familyFiles.find((f) => f.startsWith(`${letter}-`));
if (!file) {
  console.error(`no family file pattern-defs-14/${letter}-*.mjs`);
  process.exit(1);
}

const loadFamily = async (f) => {
  const mod = await import(pathToFileURL(path.join(DEFS_DIR, f)).href);
  const found = Object.values(mod).find((v) => v && Array.isArray(v.all));
  if (!found) throw new Error(`${f} exports no section`);
  return found;
};

const { title, all } = await loadFamily(file);
const OUT = path.join(process.env.B14_OUT || '/tmp/b14', letter);
mkdirSync(OUT, { recursive: true });

const problems = [];

// Names: unique in the project, and unique across the families that load.
const others = new Map();
for (const f of familyFiles) {
  if (f === file) continue;
  try {
    for (const def of (await loadFamily(f)).all) others.set(def.slug, f);
  } catch (e) {
    console.log(`note: could not load ${f} for the name check (${e.message.split('\n')[0]})`);
  }
}
const seen = new Set();
for (const def of all) {
  const where = [];
  if (RESERVED.has(def.slug)) where.push('a JS reserved word');
  if (TAKEN14.has(def.slug)) where.push('already used elsewhere in the project');
  if (others.has(def.slug)) where.push(`also defined in ${others.get(def.slug)}`);
  if (seen.has(def.slug)) where.push('defined twice in this family');
  seen.add(def.slug);
  if (where.length) problems.push(`${def.slug}: name is ${where.join(', ')}`);
}

// Build (lint) each definition; the ones that build go on to the browser.
const built = new Map();
const defs = [];
all.forEach((def, i) => {
  const numbered = { ...def, order: FIRST_ORDER + i };
  try {
    built.set(def.slug, buildPattern(numbered));
    defs.push(numbered);
  } catch (e) {
    problems.push(e.message);
  }
});

const only = process.env.ONLY ? new Set(process.env.ONLY.split(',').map((s) => s.trim())) : null;
const chosen = only ? defs.filter((d) => only.has(d.slug)) : defs;
delete process.env.ONLY; // the sweeps would read it again
const load = (slug) => built.get(slug);

console.log(`${title}: ${all.length} defined, ${defs.length} built, checking ${chosen.length}`);

if (chosen.length) {
  const failures = await runRenderSweep({
    defs: chosen,
    label: letter,
    load,
    sheetDir: OUT,
    exit: false,
  });
  for (const f of failures) problems.push(`${f.slug}: ${f.problems.join('; ')}`);
}

// -- the catalog preview look, through the package --------------------------
const serveRepo = () =>
  new Promise((res) => {
    const MIME = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html' };
    const server = createServer((req, out) => {
      const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      try {
        const body = readFileSync(f);
        out.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
        out.end(body);
      } catch {
        out.writeHead(404);
        out.end();
      }
    });
    server.listen(0, '127.0.0.1', () => res({ server, port: server.address().port }));
  });

if (chosen.length && (flag('preview') || flag('cost'))) {
  const { server, port } = await serveRepo();
  const browser = await launch();
  try {
    if (flag('preview')) {
      const SIZE = 330;
      const COLS = 5;
      const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
      await page.goto(`http://127.0.0.1:${port}/scripts/render-pattern.html`);
      const tiles = [];
      // FREQ=0.4 draws the sheets at that frequency instead of the default,
      // to see the slider thin each design out.
      const atFrequency = (pattern) =>
        process.env.FREQ
          ? {
              ...pattern,
              options: pattern.options.map((o) =>
                o.id === 'frequency' ? { ...o, default: Number(process.env.FREQ) } : o
              ),
            }
          : pattern;
      for (const def of chosen) {
        await page.evaluate(async ([d, o]) => window.__render(d, o), [
          atFrequency(built.get(def.slug)),
          { seed: 'preview1', fit: 'grid', width: SIZE, height: SIZE },
        ]);
        await page.waitForTimeout(600);
        tiles.push({ name: def.name, png: await page.locator('#stage').screenshot() });
      }
      await page.close();
      const LABEL = 22;
      const GAP = 10;
      for (let s = 0; s * 20 < tiles.length; s++) {
        const group = tiles.slice(s * 20, s * 20 + 20);
        const rows = Math.ceil(group.length / COLS);
        const W = COLS * (SIZE + GAP) + GAP;
        const H = rows * (SIZE + LABEL + GAP) + GAP;
        const composites = [];
        group.forEach((t, i) => {
          const x = GAP + (i % COLS) * (SIZE + GAP);
          const y = GAP + Math.floor(i / COLS) * (SIZE + LABEL + GAP);
          composites.push({
            input: Buffer.from(
              `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${LABEL}"><text x="2" y="16" font-family="sans-serif" font-size="14" fill="#fff">${t.name}</text></svg>`
            ),
            left: x,
            top: y,
          });
          composites.push({ input: t.png, left: x, top: y + LABEL });
        });
        const out = path.join(
          OUT,
          `preview-${s + 1}${process.env.FREQ ? `-freq${process.env.FREQ}` : ''}.png`
        );
        await sharp({ create: { width: W, height: H, channels: 3, background: '#555555' } })
          .composite(composites)
          .png()
          .toFile(out);
        console.log(`preview sheet: ${out}`);
      }
    }

    if (flag('cost')) {
      // The same plate and budget as scripts/pattern-cost.mjs, plus the
      // timings it prints: generating and reshuffling are paid on every
      // redraw in the editor and the gallery, so a design past TIME_MS on
      // either is reported too (one machine's numbers, so a soft budget).
      const BUDGET = { cssKB: 300, nodes: 800 };
      const TIME_MS = Number(process.env.TIME_MS) || 300;
      const page = await browser.newPage({ viewport: { width: 640, height: 720 } });
      await page.goto(`http://127.0.0.1:${port}/scripts/render-pattern.html`);
      for (const def of chosen) {
        const row = await page.evaluate(async (d) => {
          const stage = document.getElementById('stage');
          const doodle = () => stage.querySelector('css-doodle');
          const bytes = () =>
            [...(doodle()?.shadowRoot?.querySelectorAll('style') ?? [])].reduce(
              (sum, s) => sum + s.textContent.length,
              0
            );
          const layout = () => {
            void stage.offsetHeight;
            doodle()?.shadowRoot?.querySelector('cssd-grid, [part="grid"]')?.lastElementChild?.getBoundingClientRect();
          };
          const t0 = performance.now();
          await window.__render(d, { seed: 'cost01', fit: 'grid', width: 418, height: 646, cell: 36 });
          layout();
          const genMs = performance.now() - t0;
          let last = -1;
          let stable = 0;
          while (stable < 20) {
            await new Promise((r) => requestAnimationFrame(r));
            const now = bytes();
            stable = now === last ? stable + 1 : 0;
            last = now;
          }
          const t1 = performance.now();
          window.__controller.redraw('cost02');
          await new Promise((r) => requestAnimationFrame(r));
          layout();
          const shuffleMs = performance.now() - t1;
          return {
            cssKB: last / 1024,
            nodes: doodle()?.shadowRoot?.querySelectorAll('*').length ?? 0,
            genMs,
            shuffleMs,
          };
        }, built.get(def.slug));
        const over = row.cssKB > BUDGET.cssKB || row.nodes > BUDGET.nodes;
        const slow = row.genMs > TIME_MS || row.shuffleMs > TIME_MS;
        console.log(
          `  cost ${def.slug.padEnd(22)} ${row.cssKB.toFixed(0).padStart(5)} KB ${String(row.nodes).padStart(5)} nodes ${row.genMs.toFixed(0).padStart(6)} ms gen ${row.shuffleMs.toFixed(0).padStart(6)} ms shuffle${over ? '  OVER BUDGET' : ''}${slow ? '  SLOW' : ''}`
        );
        if (over) {
          problems.push(`${def.slug}: ${row.cssKB.toFixed(0)} KB of CSS, ${row.nodes} nodes (budget ${BUDGET.cssKB} KB, ${BUDGET.nodes} nodes)`);
        }
        if (slow) {
          problems.push(`${def.slug}: ${row.genMs.toFixed(0)} ms to generate, ${row.shuffleMs.toFixed(0)} ms to reshuffle (soft budget ${TIME_MS} ms)`);
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

if (chosen.length && flag('svg')) {
  const failures = await runSvgSweep({
    defs: chosen,
    label: `batch-14 ${letter}`,
    artifactsPrefix: `tabbied-svg-b14-${letter}`,
    load,
    exit: false,
  });
  for (const f of failures) problems.push(`${f.slug} [svg ${f.seed}]: ${f.problem}`);
}

console.log(`\nsheets in ${OUT}`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ${p}`);
  process.exit(1);
}
console.log(`${title}: all ${chosen.length} checked designs pass`);
