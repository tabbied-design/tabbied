#!/usr/bin/env node
/**
 * Promote recolorable artwork: the prompts in data/image-prompts.json that
 * carry `recolor`. Each candidate is a PNG on a transparent ground (the
 * prompt is generated with `cutout: true`), and promotion keeps only what a
 * palette cannot supply - shape and tone. The color is left to CSS
 * (components/Artwork.tsx), so a re-color that rewrites `--ink` or `--accent`
 * moves the picture with the page.
 *
 *   mono    one ink. alpha = alpha x darkness, so a white fill the model
 *           added reads as a gap, not as ink -> public/images/art/<id>-mono.webp
 *   layers  a flat illustration in the prompt's key colors. Every opaque
 *           pixel is snapped to its nearest key and each key becomes a layer:
 *           traced to SVG paths into the manifest (render "vector"), or written
 *           as one alpha mask per key, <id>-<n>.webp (render "masks").
 *   tone    a photograph reduced to its luminance, levelled to the full range,
 *           with its alpha -> <id>-tone.webp. Duotone, blend and pattern fill
 *           all read this one file.
 *
 * A layers candidate with more than OFF_KEY_LIMIT of its pixels far from every
 * key is refused: the model ignored the palette, and a separation of it would
 * silently turn one color into another. Regenerate it.
 *
 * Writes lib/generated/artwork.js (committed), keeping entries it did not
 * touch this run.
 *
 * Usage:
 *   node scripts/promote-artwork.mjs [--only id,id] [--project p] [--from dir]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { loadPromptData, selectPrompts } from './lib/prompts.mjs';

const require = createRequire(import.meta.url);
const ImageTracer = require('imagetracerjs');

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DATA_FILE = join(ROOT, 'data', 'image-prompts.json');
const OUT_DIR = join(ROOT, 'public', 'images', 'art');
const BASE = '/images/art';
const MANIFEST = join(ROOT, 'lib', 'generated', 'artwork.js');
const OFF_KEY_LIMIT = 0.06;
// Farther than this (RGB distance) from every key, a pixel is off-palette.
const OFF_KEY_DISTANCE = 120;

function parseArgs(argv) {
  const opts = { only: null, project: null, from: join(process.cwd(), 'generated-images') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--only') opts.only = argv[++i].split(',').map((x) => x.trim()).filter(Boolean);
    else if (a === '--project') opts.project = argv[++i];
    else if (a === '--from') opts.from = argv[++i];
    else { console.error(`Unknown argument: ${a}`); process.exit(1); }
  }
  return opts;
}

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const luminance = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const hashOf = (buffers) => {
  const h = createHash('sha256');
  for (const b of buffers) h.update(b);
  return h.digest('hex').slice(0, 16);
};

/** The box around every pixel with some alpha, padded, as sharp's extract. */
function contentBox(data, width, height, pad = 0.02) {
  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 8) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) return null;
  const p = Math.round(Math.max(x1 - x0, y1 - y0) * pad);
  const left = Math.max(0, x0 - p);
  const top = Math.max(0, y0 - p);
  return {
    left,
    top,
    width: Math.min(width, x1 + p + 1) - left,
    height: Math.min(height, y1 + p + 1) - top,
  };
}

async function load(file, trim) {
  let img = sharp(file).ensureAlpha();
  let { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  if (trim) {
    const box = contentBox(data, info.width, info.height);
    if (!box) throw new Error('the candidate is entirely transparent');
    ({ data, info } = await sharp(file).ensureAlpha().extract(box).raw()
      .toBuffer({ resolveWithObject: true }));
  }
  return { data, width: info.width, height: info.height };
}

// Effort 4, not the 6 promote-images uses: these are masks and grey tone
// maps, which gain little from the slower search, and a batch is 130 files.
const toWebp = (data, width, height, quality = 90) =>
  sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality, alphaQuality: 100, effort: 4 })
    .toBuffer();

/** mono: black, with the ink's darkness as alpha. */
async function promoteMono(r, src) {
  const { data, width, height } = await load(src, r.trim);
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const dark = Math.min(1, Math.max(0, (0.8 - luminance(data[i], data[i + 1], data[i + 2])) / 0.55));
    out[i + 3] = Math.round(data[i + 3] * dark);
  }
  const webp = await toWebp(out, width, height);
  const file = `${r.id}-mono.webp`;
  writeFileSync(join(OUT_DIR, file), webp);
  return { kind: 'mono', width, height, hash: hashOf([webp]), file, bytes: webp.length };
}

/** tone: levelled luminance, with the alpha. */
async function promoteTone(r, src) {
  const { data, width, height } = await load(src, r.trim);
  const values = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 200) values.push(luminance(data[i], data[i + 1], data[i + 2]));
  }
  values.sort((a, b) => a - b);
  const lo = values[Math.floor(values.length * 0.01)] ?? 0;
  const hi = values[Math.floor(values.length * 0.99)] ?? 1;
  const span = Math.max(0.05, hi - lo);
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const l = Math.min(1, Math.max(0, (luminance(data[i], data[i + 1], data[i + 2]) - lo) / span));
    out[i] = out[i + 1] = out[i + 2] = Math.round(l * 255);
    out[i + 3] = data[i + 3];
  }
  // A tone map is read through two inks, never as a photograph, so q80.
  const webp = await toWebp(out, width, height, 80);
  const file = `${r.id}-tone.webp`;
  writeFileSync(join(OUT_DIR, file), webp);
  return { kind: 'tone', width, height, hash: hashOf([webp]), file, bytes: webp.length };
}

/** layers: snap to the keys, then trace or mask each one. */
async function promoteLayers(r, src) {
  const keys = Object.entries(r.keys).map(([hex, name]) => ({ hex: hex.toUpperCase(), name, rgb: hexToRgb(hex) }));
  const { data, width, height } = await load(src, r.trim);
  const owner = new Int16Array(width * height).fill(-1);
  let opaque = 0;
  let off = 0;

  // Faint edge pixels get an owner too, so a mask keeps the soft outer edge;
  // only the solid ones are counted, and only they are traced.
  for (let p = 0, i = 0; i < data.length; p++, i += 4) {
    if (data[i + 3] < 8) continue;
    let best = 0;
    let bestDistance = Infinity;
    keys.forEach((key, k) => {
      const d = (data[i] - key.rgb[0]) ** 2 + (data[i + 1] - key.rgb[1]) ** 2 + (data[i + 2] - key.rgb[2]) ** 2;
      if (d < bestDistance) { bestDistance = d; best = k; }
    });
    owner[p] = best;
    if (data[i + 3] < 128) continue;
    opaque++;
    if (bestDistance > OFF_KEY_DISTANCE ** 2) off++;
  }

  const offShare = opaque ? off / opaque : 1;
  if (offShare > OFF_KEY_LIMIT) {
    throw new Error(
      `${(offShare * 100).toFixed(1)}% of its pixels are far from every key ` +
        `(${keys.map((k) => k.hex).join(', ')}) - the model ignored the palette; regenerate it`
    );
  }

  if (r.render === 'masks') {
    const layers = [];
    const buffers = [];
    for (const [k, key] of keys.entries()) {
      const out = Buffer.alloc(data.length);
      let any = false;
      for (let p = 0; p < owner.length; p++) {
        if (owner[p] === k) { out[p * 4 + 3] = data[p * 4 + 3]; any = true; }
      }
      if (!any) continue;
      const webp = await toWebp(out, width, height);
      const file = `${r.id}-${key.name}.webp`;
      writeFileSync(join(OUT_DIR, file), webp);
      buffers.push(webp);
      layers.push({ name: key.name, key: key.hex, file });
    }
    return {
      kind: 'layers', render: 'masks', width, height, hash: hashOf(buffers), layers,
      bytes: buffers.reduce((n, b) => n + b.length, 0), off: offShare,
    };
  }

  // vector: every pixel painted its key, traced against exactly those keys.
  const snapped = new Uint8ClampedArray(data.length);
  for (let p = 0; p < owner.length; p++) {
    if (owner[p] < 0 || data[p * 4 + 3] < 128) continue;
    const [red, green, blue] = keys[owner[p]].rgb;
    snapped[p * 4] = red;
    snapped[p * 4 + 1] = green;
    snapped[p * 4 + 2] = blue;
    snapped[p * 4 + 3] = 255;
  }
  const pal = [{ r: 0, g: 0, b: 0, a: 0 }, ...keys.map(({ rgb: [red, green, blue] }) => ({ r: red, g: green, b: blue, a: 255 }))];
  const svg = ImageTracer.imagedataToSVG(
    { width, height, data: snapped },
    {
      pal, colorsampling: 0, numberofcolors: pal.length, colorquantcycles: 1,
      ltres: 1, qtres: 1, pathomit: 12, roundcoords: 1, strokewidth: 0,
      blurradius: 0, linefilter: true,
    }
  );
  const byKey = new Map();
  for (const m of svg.matchAll(/<path fill="rgb\((\d+),(\d+),(\d+)\)"[^>]*opacity="([\d.]+)"[^>]*d="([^"]+)"/g)) {
    if (Number(m[4]) === 0) continue;
    const hex = '#' + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, '0')).join('').toUpperCase();
    byKey.set(hex, `${byKey.get(hex) ?? ''}${m[5].trim()} `);
  }
  const layers = keys
    .filter((key) => byKey.has(key.hex))
    .map((key) => ({ name: key.name, key: key.hex, d: byKey.get(key.hex).trim().replace(/\s+/g, ' ') }));
  const bytes = layers.reduce((n, l) => n + l.d.length, 0);
  return { kind: 'layers', render: 'vector', width, height, hash: hashOf(layers.map((l) => l.d)), layers, bytes, off: offShare };
}

function readManifest() {
  if (!existsSync(MANIFEST)) return {};
  const text = readFileSync(MANIFEST, 'utf8').replace(/^[\s\S]*?export default /, '').replace(/;\s*$/, '');
  return JSON.parse(text);
}

function writeManifest(entries) {
  const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(
    MANIFEST,
    '// GENERATED by scripts/promote-artwork.mjs, do not edit by hand.\n' +
      '// Committed. Artwork whose color the palette supplies: components/Artwork.tsx.\n' +
      `export default ${JSON.stringify(sorted, null, 2)};\n`
  );
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const data = loadPromptData(DATA_FILE);
  const selected = selectPrompts(data, { only: opts.only, project: opts.project }).filter((r) => r.recolor);
  if (!selected.length) { console.error('No recolorable prompts matched the filters.'); process.exit(1); }

  mkdirSync(OUT_DIR, { recursive: true });
  const manifest = readManifest();
  let errors = 0;

  for (const r of selected) {
    const src = join(opts.from, `${r.id}.png`);
    if (!existsSync(src)) {
      errors++;
      console.error(`  failed ${r.id}: no ${r.id}.png in ${opts.from}`);
      continue;
    }
    // A re-promotion replaces every file the entry had (a layer may be gone).
    for (const file of readdirSync(OUT_DIR)) {
      if (file.startsWith(`${r.id}-`)) rmSync(join(OUT_DIR, file));
    }
    try {
      const promote = r.recolor === 'mono' ? promoteMono : r.recolor === 'tone' ? promoteTone : promoteLayers;
      const { bytes, off, ...entry } = await promote(r, src);
      manifest[r.id] = { ...entry, base: BASE };
      const extra = off === undefined ? '' : `, ${(off * 100).toFixed(2)}% off-key`;
      const parts = entry.layers ? `, ${entry.layers.length} layer(s)` : '';
      console.log(`  ok ${r.id}: ${entry.kind}${entry.render ? `/${entry.render}` : ''} ${entry.width}x${entry.height}${parts}, ${(bytes / 1024).toFixed(0)} KB${extra}`);
    } catch (err) {
      errors++;
      delete manifest[r.id];
      console.error(`  failed ${r.id}: ${err.message}`);
    }
  }

  writeManifest(manifest);
  console.log(`\n${selected.length - errors} promoted, ${errors} failed; ${Object.keys(manifest).length} in lib/generated/artwork.js`);
  if (errors) process.exitCode = 1;
}

main().catch((err) => { console.error(err.message || err); process.exit(1); });
