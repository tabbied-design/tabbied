#!/usr/bin/env node
// Writes the favicons, app icons and pinned-tab mask in public/ from the mark
// itself, components/logo/LogoMark.tsx, so the two cannot drift: run it after
// the mark changes.
//
//   node scripts/build-favicons.mjs
//
// The paths, box and stroke are read out of LogoMark.tsx rather than copied
// here; the script stops if it cannot find them.
//
// The favicons a browser tab draws (16-48px, and the SVG it scales to the
// same size) are the mark in ink on a transparent ground, filling the icon.
// That disappears on a dark tab strip; it is the look asked for. The app
// icons stay paper on an ink tile: iOS fills a transparent touch icon with
// black, which would swallow a black mark, and the Windows tile and the
// manifest's splash use the ink as their ground.
//
// Two optical sizes: LogoMark's 17-unit stroke is a 0.4px line at 16px and
// vanishes, so the tab icons take a heavier stroke; the app icons, 180px
// and up, keep the authored one. The Android icons are rounded tiles; the
// iOS and Windows tiles are full-bleed squares, because those platforms cut
// their own shape.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');

const INK = '#0e0e13';
const PAPER = '#eef0f6';
// Stroke for the tab-sized icons, in the mark's own units.
const TAB_STROKE = 26;

function readMark() {
  const source = readFileSync(path.join(root, 'components/logo/LogoMark.tsx'), 'utf8');
  const constant = (name) => source.match(new RegExp(`const ${name} = '([^']+)'`))?.[1];
  const mark = {
    viewBox: constant('VIEW_BOX')?.split(/\s+/).map(Number),
    left: constant('LEFT'),
    right: constant('RIGHT'),
    stroke: Number(source.match(/strokeWidth="(\d+(?:\.\d+)?)"/)?.[1]),
  };
  if (mark.viewBox?.length !== 4 || !mark.left || !mark.right || !mark.stroke) {
    throw new Error('build-favicons: could not read VIEW_BOX, LEFT, RIGHT and strokeWidth from LogoMark.tsx');
  }
  return mark;
}

const mark = readMark();
const [vx, vy, vw, vh] = mark.viewBox;
const cx = vx + vw / 2;
const cy = vy + vh / 2;

/**
 * The mark centred in a square that it fills `fill` of, on an ink ground with
 * corners rounded by `radius` of the side (0 for full-bleed), or on nothing.
 */
function iconSvg({ stroke, fill, radius = 0, ground = INK, ink = PAPER }) {
  const side = Math.max(vw, vh) / fill;
  const x = cx - side / 2;
  const y = cy - side / 2;
  const box = [x, y, side, side].map((n) => +n.toFixed(2)).join(' ');
  const rect = ground
    ? `<rect x="${+x.toFixed(2)}" y="${+y.toFixed(2)}" width="${+side.toFixed(2)}" height="${+side.toFixed(2)}" rx="${+(side * radius).toFixed(2)}" fill="${ground}"/>`
    : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}">${rect}` +
    `<g fill="none" stroke="${ink}" stroke-width="${stroke}" stroke-linecap="butt" stroke-linejoin="miter">` +
    `<path d="${mark.left}"/><path d="${mark.right}"/></g></svg>\n`
  );
}

const TAB = { stroke: TAB_STROKE, fill: 0.92, ground: null, ink: INK };
const APP = { stroke: mark.stroke, fill: 0.62, radius: 0.22 };
const BLEED = { stroke: mark.stroke, fill: 0.62, radius: 0 };

// Rasterized at four times the target, then reduced, so the strokes are
// antialiased by the resize. An SVG without width or height is one pixel per
// viewBox unit at 72 dpi.
const png = (svg, size) => {
  const side = Number(svg.match(/viewBox="[^"]*?([\d.]+)"/)[1]);
  return sharp(Buffer.from(svg), { density: (72 * size * 4) / side })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
};

/** An .ico whose entries are PNGs, which every browser that reads .ico takes. */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const written = [];
const write = (name, data) => {
  writeFileSync(path.join(pub, name), data);
  written.push(name);
};

const tabSvg = iconSvg(TAB);
write('favicon.svg', tabSvg);
for (const size of [16, 32]) write(`favicon-${size}x${size}.png`, await png(tabSvg, size));
write(
  'favicon.ico',
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(tabSvg, size) }))))
);

const appSvg = iconSvg(APP);
for (const size of [192, 256, 384, 512]) write(`android-chrome-${size}x${size}.png`, await png(appSvg, size));

const bleedSvg = iconSvg(BLEED);
write('apple-touch-icon.png', await png(bleedSvg, 180));
// browserconfig.xml asks for the 150 tile; Windows draws it from a 270 source.
write('mstile-150x150.png', await png(bleedSvg, 270));

// Safari's pinned-tab mask: one colour on nothing, recoloured by the
// `mask-icon` link's `color` (app/layout.tsx).
write('safari-pinned-tab.svg', iconSvg({ stroke: TAB_STROKE, fill: 0.86, ground: null, ink: '#000' }));

console.log(`build-favicons: wrote ${written.map((name) => `public/${name}`).join(', ')}`);
