#!/usr/bin/env node
// Generates the video's cut-outs with the GPT Image API and promotes them to
// public/images/<id>.webp, where the composition reads them with staticFile().
//
// Every image is requested on a transparent background (`background:
// "transparent"`, which gpt-image-2.5-flare honors with a real alpha channel)
// at `quality: "low"`. They are drawn in black and white on purpose: the
// video tints each one with the palette of the scene it sits in (see
// src/components/Duotone.tsx), so one file serves every palette.
//
// Usage:
//   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs [--only id,id] [--force]
//
// The raw PNGs are kept in generated/ (gitignored) so a promotion can be
// redone without paying for the image again; --force asks the API anyway.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const spec = JSON.parse(await readFile(path.join(here, 'images.json'), 'utf8'));

const args = process.argv.slice(2);
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
async function transparentShare(png) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let clear = 0;
  for (let i = info.channels - 1; i < data.length; i += info.channels) {
    if (data[i] < 8) clear++;
  }
  return clear / (info.width * info.height);
}

async function promote(image, png) {
  const share = await transparentShare(png);
  if (share < 0.05) {
    throw new Error(`${image.id}: only ${(share * 100).toFixed(1)}% transparent; not a cut-out`);
  }

  const out = path.join(root, 'public/images', `${image.id}.webp`);
  const trimmed = await sharp(png).trim({ threshold: 1 }).toBuffer();
  await sharp(trimmed).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(out);
  const { width, height } = await sharp(out).metadata();
  console.log(`${image.id}: ${width}x${height}, ${(share * 100).toFixed(0)}% transparent -> ${path.relative(root, out)}`);
}

async function run(image) {
  const raw = path.join(root, 'generated', `${image.id}.png`);
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

await mkdir(path.join(root, 'generated'), { recursive: true });
await mkdir(path.join(root, 'public/images'), { recursive: true });

const todo = spec.images.filter((image) => !only || only.has(image.id));
const results = await Promise.allSettled(todo.map(run));
const failed = results.filter((result) => result.status === 'rejected');

for (const failure of failed) console.error(failure.reason.message);
process.exit(failed.length ? 1 : 0);
