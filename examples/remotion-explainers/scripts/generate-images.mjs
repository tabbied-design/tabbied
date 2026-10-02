#!/usr/bin/env node
// Generates a film's cut-outs with the GPT Image API and promotes them to
// public/images/<film>/<id>.webp, where the film reads them with staticFile().
//
// Every image is requested on a transparent background (`background:
// "transparent"`, which gpt-image-2.5-flare honors with a real alpha channel)
// at `quality: "low"`. They are drawn in black and white on purpose: the
// video tints each one with the palette of the scene it sits in (see
// src/components/Tinted.tsx), so one file serves every palette.
//
// Usage:
//   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs <film> [--only id,id] [--force]
//
// <film> names scripts/prompts/<film>.json. The raw PNGs are kept in
// generated/<film>/ (gitignored) so a promotion can be redone without paying
// for the image again; --force asks the API anyway.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const [film, ...args] = process.argv.slice(2);

if (!film || film.startsWith('-')) {
  console.error('Usage: node scripts/generate-images.mjs <film> [--only id,id] [--force]');
  process.exit(1);
}

const spec = JSON.parse(await readFile(path.join(here, 'prompts', `${film}.json`), 'utf8'));
const rawDir = path.join(root, 'generated', film);
const outDir = path.join(root, 'public/images', film);

const force = args.includes('--force');
const onlyIndex = args.indexOf('--only');
const only = onlyIndex >= 0 ? new Set(args[onlyIndex + 1].split(',')) : null;

const key = process.env.OPENAI_API_KEY ?? process.env.AI_API_KEY;
const base = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1';

const exists = (file) => access(file).then(() => true, () => false);

async function generate(image) {
  const response = await fetch(`${base}/images/generations`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: spec.model,
      prompt: `${image.subject} ${spec.style}`,
      size: image.size,
      quality: spec.quality,
      background: 'transparent',
      output_format: 'png',
      n: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`${image.id}: ${response.status} ${await response.text()}`);
  }

  const { data } = await response.json();
  return Buffer.from(data[0].b64_json, 'base64');
}

// A cut-out with no transparent pixels is what a silently ignored
// `background` parameter looks like, and it would draw as a white box over
// the pattern. Refuse it rather than promote it.
//
// The opposite failure is a subject drawn see-through: the model sometimes
// paints soft fur as half-transparent, and the pattern then shows through the
// animal. A clean cut-out keeps partial alpha to its edges (a few percent of
// the pixels); the first marmot pup had 39%, and rewording the prompt ("fur
// drawn in solid black ink ... with a firm outline") brought it to 2%.
async function alphaShares(png) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let clear = 0;
  let partial = 0;
  for (let i = info.channels - 1; i < data.length; i += info.channels) {
    if (data[i] < 8) clear++;
    else if (data[i] < 235) partial++;
  }
  const pixels = info.width * info.height;
  return { clear: clear / pixels, partial: partial / pixels };
}

async function promote(image, png) {
  const { clear: share, partial } = await alphaShares(png);
  if (share < 0.05) {
    throw new Error(`${image.id}: only ${(share * 100).toFixed(1)}% transparent; not a cut-out`);
  }
  if (partial > 0.2) {
    console.warn(
      `${image.id}: note: ${(partial * 100).toFixed(0)}% of its pixels are half-transparent, so the ` +
        `subject may be see-through; look at it over a pattern, and if so reword the prompt and --force it`
    );
  }

  const out = path.join(outDir, `${image.id}.webp`);
  const trimmed = await sharp(png).trim({ threshold: 1 }).toBuffer();
  await sharp(trimmed).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(out);
  const { width, height } = await sharp(out).metadata();
  console.log(`${image.id}: ${width}x${height}, ${(share * 100).toFixed(0)}% transparent -> ${path.relative(root, out)}`);
}

async function run(image) {
  const raw = path.join(rawDir, `${image.id}.png`);
  let png;

  if (!force && (await exists(raw))) {
    png = await readFile(raw);
  } else {
    if (!key) throw new Error('Set OPENAI_API_KEY to generate images.');
    const started = Date.now();
    png = await generate(image);
    await writeFile(raw, png);
    console.log(`${image.id}: generated in ${((Date.now() - started) / 1000).toFixed(1)}s`);
  }

  await promote(image, png);
}

await mkdir(rawDir, { recursive: true });
await mkdir(outDir, { recursive: true });

const todo = spec.images.filter((image) => !only || only.has(image.id));
const results = await Promise.allSettled(todo.map(run));
const failed = results.filter((result) => result.status === 'rejected');

for (const failure of failed) console.error(failure.reason.message);
process.exit(failed.length ? 1 : 0);
