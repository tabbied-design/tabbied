// Batch 14 - shared vocabulary.
//
// Batch 14 keeps the promise batches 11-13 made (native SVG export with no
// caveat, checked by validate-svg-batch14.mjs) and widens what a design may
// be built from. Those batches drew one figure per cell, the same in every
// cell but for a random ink and a quarter turn; batch 14 also lets a design
// read where its cell sits in the sheet:
//
//   * @rn() is css-doodle's 2D noise, sampled at the cell's place in the
//     grid, so neighboring cells get neighboring values. It is what a flow
//     field, a contour map or a cloud of halftone dots is made of.
//   * @x, @y, @X, @Y, @i, @I and @dx, @dy (the distance from the middle of
//     the grid, in cells) let a value run across the sheet: a twist that
//     tightens toward the middle, a dot that grows toward one edge, a stripe
//     whose phase steps down the rows.
//   * @nth(), @even, @odd, @at(), @x(), @y() and @match() pick cells out by
//     position, for a checkerboard of two figures or a brick bond's offset.
//
// The grid a design is drawn on is re-derived from its container ("fit:
// grid"), so nothing may assume a particular cell count: a value read from
// @x/@X is a fraction of the sheet, never a fixed column.
//
// The house rules (pattern-lints.mjs, plus the batch-14 checks in
// build-batch14.mjs) are listed in pattern-defs-14.mjs.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export {
  RESERVED,
  F,
  TR,
  cp,
  rot,
  msk,
  mskI,
  B,
  A,
  ink,
  R2,
  R4,
  pieL,
  slotL,
  ringsL,
  bandL,
  bandAt,
  arcSector,
  poly,
} from '../pattern-defs-11/shared.mjs';
export {
  fade,
  rise,
  midFade,
  stepFade,
  dotsL,
  softDotsL,
  faded,
  both,
  across,
  down,
} from '../pattern-defs-12/shared.mjs';
export {
  discL,
  bandFS,
  boreFS,
  bandLin,
  slabLin,
  stepGlow,
  eyeletL,
} from '../pattern-defs-13/shared.mjs';

import { TAKEN13 } from '../pattern-defs-13/shared.mjs';
import { batch13 } from '../pattern-defs-13.mjs';
import { RESERVED } from '../pattern-defs-11/shared.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const PATTERNS_DIR = path.join(ROOT, 'packages/tabbied/patterns');

/** Gallery orders batch 14 owns. */
export const FIRST_ORDER = 4000;
export const PAST_LAST_ORDER = 5000;
export const ownedByBatch14 = (order) => order >= FIRST_ORDER && order < PAST_LAST_ORDER;

// Every motif name used anywhere in the project: the retired names batches
// 10-13 kept out of use, batch 13 itself, and every design on disk that this
// batch does not own (the hand-authored drop at 3000 included).
const onDisk = readdirSync(PATTERNS_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(path.join(PATTERNS_DIR, f), 'utf-8')))
  .filter((p) => !ownedByBatch14(p.galleryOrder ?? 0))
  .map((p) => p.slug);
export const TAKEN14 = new Set([...TAKEN13, ...batch13.map((d) => d.slug), ...onDisk]);

// -- position and noise ------------------------------------------------------

/** 2D noise across the sheet, from `from` to `to` (css-doodle's @rn). */
export const noise = (from, to, frequency = 1) =>
  frequency === 1 ? `@rn(${from}, ${to})` : `@rn(${from}, ${to}, ${frequency})`;

/** The cell's column / row as a fraction 0-1 of the sheet, at its center. */
export const fx = '((@x - 0.5) / @X)';
export const fy = '((@y - 0.5) / @Y)';

/**
 * Distance of the cell's center from the middle of the sheet, normalized so
 * the nearest edge of the sheet is 1 (corners run a little past it).
 */
export const fr = '(sqrt(@dx * @dx + @dy * @dy) / (min(@X, @Y) / 2))';

// -- palettes ----------------------------------------------------------------
// Background first, then up to six inks. The house rules for a palette: no
// ink repeats its background, and at least one ink reads against it at ~3:1.
// A design names one with `pal: n` and takes `inks` of it (default: all), or
// passes `palette: [...]` outright.
export const PAL14 = [
  // 0-9: grounds of paper and cloth
  ['#F4EDE1', '#1F3A5F', '#C8553D', '#E9B44C', '#3C6E71', '#8C5E58'],
  ['#FBF6EC', '#2A2A2A', '#D1495B', '#EDAE49', '#00798C', '#30638E'],
  ['#EFE7DA', '#5B3A29', '#A0522D', '#D9A066', '#6B7F3A', '#2F4858'],
  ['#F7F3EA', '#14213D', '#FCA311', '#E5E5E5', '#9A8C98', '#4A4E69'],
  ['#FFF8EE', '#E63946', '#1D3557', '#457B9D', '#A8DADC', '#F4A261'],
  ['#F2EEE3', '#283D3B', '#197278', '#C44536', '#772E25', '#EDDDD4'],
  ['#FAF3E3', '#3D405B', '#E07A5F', '#81B29A', '#F2CC8F', '#9B5DE5'],
  ['#F5F0E6', '#0B3954', '#087E8B', '#FF5A5F', '#C81D25', '#BFD7EA'],
  ['#FDF8F0', '#2E294E', '#541388', '#F1E9DA', '#FFD400', '#D90368'],
  ['#EEF0EB', '#153243', '#284B63', '#B4B8AB', '#F4F9E9', '#C2A878'],
  // 10-19: dark grounds
  ['#0F1626', '#F5F0E1', '#FF6E6C', '#FFC857', '#4ECDC4', '#7C77B9'],
  ['#14110F', '#D9C5B2', '#7E7F83', '#F3E9DC', '#C08552', '#895737'],
  ['#0B0C10', '#66FCF1', '#45A29E', '#C5C6C7', '#1F2833', '#F25F5C'],
  ['#1B1B3A', '#FFD166', '#EF476F', '#06D6A0', '#118AB2', '#F8F4E3'],
  ['#121212', '#FF6B35', '#F7C59F', '#EFEFD0', '#004E89', '#1A659E'],
  ['#2B193D', '#F49D37', '#F7E1D7', '#C5283D', '#E9724C', '#481D24'],
  ['#0D1F22', '#F2E3BC', '#C19875', '#8FBC94', '#548687', '#DE6449'],
  ['#1A1423', '#E8C547', '#F4F1BB', '#9BC1BC', '#5D576B', '#ED6A5A'],
  ['#101C2C', '#E2E8F0', '#F6AD55', '#63B3ED', '#F56565', '#68D391'],
  ['#231F20', '#F2F1EF', '#BB4430', '#7EBDC2', '#F3DFA2', '#EFE6DD'],
  // 20-29: saturated and playful
  ['#FFE8D6', '#FF6F59', '#254441', '#43AA8B', '#B2B09B', '#EF3054'],
  ['#FFF1E6', '#FF006E', '#3A86FF', '#FFBE0B', '#8338EC', '#FB5607'],
  ['#F0F7F4', '#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#CBF3F0'],
  ['#FEF9EF', '#FE6D73', '#17C3B2', '#FFCB77', '#227C9D', '#FFE2D1'],
  ['#F8F0FB', '#6A4C93', '#1982C4', '#8AC926', '#FFCA3A', '#FF595E'],
  ['#FFFCF2', '#F15BB5', '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5'],
  ['#EAF2EF', '#FF715B', '#1EA896', '#4C5454', '#523F38', '#FFB997'],
  ['#FFFAF0', '#E76F51', '#2A9D8F', '#264653', '#E9C46A', '#F4A261'],
  ['#F1FAEE', '#E63946', '#A8DADC', '#457B9D', '#1D3557', '#F4A261'],
  ['#FCF6F5', '#990011', '#2B2B2B', '#E4B363', '#5C80BC', '#E8DDB5'],
  // 30-39: quiet, tonal and earthy
  ['#ECE8DF', '#6B705C', '#A5A58D', '#B7B7A4', '#CB997E', '#3F4238'],
  ['#E9E4DA', '#7F5539', '#9C6644', '#B08968', '#DDB892', '#3E2723'],
  ['#E8EDDF', '#242423', '#333533', '#CFDBD5', '#F5CB5C', '#6C757D'],
  ['#F3EFE0', '#434343', '#7D8471', '#B5A886', '#D4A373', '#5E6472'],
  ['#E6E2D3', '#2F3E46', '#354F52', '#52796F', '#84A98C', '#CAD2C5'],
  ['#F6F1EB', '#A26769', '#6D2E46', '#D5B9B2', '#ECE2D0', '#582C4D'],
  ['#EDF2F4', '#2B2D42', '#8D99AE', '#EF233C', '#D90429', '#4A5568'],
  ['#F7F4EF', '#4F6D7A', '#C0D6DF', '#DD6E42', '#E8DAB2', '#2D3A3A'],
  ['#FAF7F2', '#1E3A34', '#C2410C', '#CA8A04', '#7C2D12', '#365314'],
  ['#EFEBE4', '#22223B', '#4A4E69', '#9A8C98', '#C9ADA7', '#B5838D'],
  // 40-49: cool, marine and night
  ['#E0F2F1', '#004D40', '#00897B', '#4DB6AC', '#FF7043', '#263238'],
  ['#0A2239', '#53A2BE', '#1D84B5', '#E8F1F2', '#F9C80E', '#176087'],
  ['#03045E', '#90E0EF', '#00B4D8', '#CAF0F8', '#FFB703', '#0077B6'],
  ['#E7ECEF', '#274C77', '#6096BA', '#A3CEF1', '#8B8C89', '#E76F51'],
  ['#071A26', '#F7B267', '#F79D65', '#F4845F', '#F27059', '#F25C54'],
  ['#0E1E2B', '#A9D6E5', '#61A5C2', '#2C7DA0', '#F1FAEE', '#E9C46A'],
  ['#F0F4F8', '#102A43', '#334E68', '#627D98', '#F0B429', '#D64545'],
  ['#1C0F13', '#6E7E85', '#B7CECE', '#BBBAC6', '#E2E2E2', '#C83E4D'],
  ['#11151C', '#F4D06F', '#FF8811', '#9DD9D2', '#FFF8F0', '#392F5A'],
  ['#242038', '#9067C6', '#8D86C9', '#CAC4CE', '#F7ECE1', '#F2A541'],
];

const isDark = (hex) => {
  const m = /^#([0-9a-f]{6})/i.exec(hex);
  if (!m) return false;
  const n = parseInt(m[1], 16);
  return (
    (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) /
      255 <
    0.5
  );
};

/**
 * Builds the per-section `add()` used by every definition file. Each section
 * gets its own collector; pattern-defs-14.mjs concatenates them in order and
 * numbers the whole batch.
 *
 * add(name, description, build, cfg)
 *
 *   name         one to three plain words; the slug is the name lowercased
 *                with everything but letters and digits removed
 *   description  one or two sentences saying what is visible
 *   build(c)     c is the palette length (color0 plus the inks); returns
 *                { rule, vars?, host? }:
 *                  rule  the css-doodle rule, the body of `--rule: ( ... )`
 *                  vars  declarations before `--rule` (rarely needed)
 *                  host  declarations added to the `:doodle` block, for a
 *                        value computed once and read with @var() in cells
 *
 * cfg:
 *   pal      palette index into PAL14            (or `palette: [...]`)
 *   inks     how many inks of PAL14[pal] to use  (default: all of them)
 *   grid     editor default "columns x rows"     (default '6x9')
 *   freq     default frequency                   (default 1)
 *   tg / tf  gallery-thumbnail grid / frequency  (default '5x5' / 1)
 *   min      sizing.minCellPx
 *   multiple sizing.cellMultiple
 *   maxCells sizing.maxCells
 *   meta     { tags, mood, density, goodFor }    (required; closed vocabulary)
 */
export function section(title) {
  const all = [];
  const add = (name, description, build, cfg) => {
    if (!/^[A-Z][A-Za-z0-9]*( [A-Za-z0-9]+){0,2}$/.test(name)) {
      throw new Error(`${title}: bad name "${name}" (plain words, capitalized)`);
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!cfg || !cfg.meta) throw new Error(`${slug}: cfg.meta is required`);
    let palette;
    if (cfg.palette) {
      palette = [...cfg.palette];
    } else {
      if (cfg.pal === undefined) throw new Error(`${slug}: give cfg.pal or cfg.palette`);
      const base = PAL14[cfg.pal];
      if (!base) throw new Error(`${slug}: no palette ${cfg.pal}`);
      palette = base.slice(0, (cfg.inks ?? base.length - 1) + 1);
    }
    if (palette.length < 2 || palette.length > 7) {
      throw new Error(`${slug}: a palette holds a background and 1-6 inks`);
    }
    const c = palette.length;
    const { vars = '', rule, host = '' } = build(c);
    const sizing = {};
    if (cfg.min) sizing.minCellPx = cfg.min;
    if (cfg.multiple) sizing.cellMultiple = cfg.multiple;
    if (cfg.maxCells) sizing.maxCells = cfg.maxCells;
    all.push({
      name,
      slug,
      section: title,
      ...(isDark(palette[0]) ? { white: true } : {}),
      description,
      palette,
      colors: { min: 2, max: c, default: c },
      gridDefault: cfg.grid ?? '6x9',
      freqDefault: cfg.freq ?? 1,
      ...(Object.keys(sizing).length ? { sizing } : {}),
      thumb: { grid: cfg.tg ?? '5x5', frequency: cfg.tf ?? 1 },
      meta: cfg.meta,
      vars,
      rule,
      host,
    });
  };
  return { add, all, title };
}

export { RESERVED as RESERVED14 };
