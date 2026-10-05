// Batch 14 - 300 designs in twelve families, gallery orders 4000-4999. Each
// family is drawn from a subject rather than from one geometric primitive,
// and the batch reads where a cell sits in the sheet as well as what is in it
// (css-doodle's 2D noise, the cell's column, row and distance from the
// middle); pattern-defs-14/shared.mjs has the vocabulary for that.
//
// The families, in the order they ship:
//
//   A. Loom         cloth: checks, twills, plaids and the marks woven, printed and stitched into it.
//   B. Wagara       the old repeat motifs of Japan and of tilework and folk ornament elsewhere.
//   C. Illusion     op art: figures that bulge, twist, tunnel and shimmer as they cross the sheet.
//   D. Drift        fields steered by 2D noise: strokes that flow, dots that cloud, levels that contour.
//   E. Grove        leaves, petals, scales, seeds and stones.
//   F. Masonry      floors, walls and roofs: bonds, parquet, shingles, screens and tracery.
//   G. Atomic       mid-century to nineties pop: starbursts, boomerangs, supergraphics, squiggles.
//   H. Orbit        sky and space: stars, moons, planets, orbits, comets and eclipses.
//   I. Pantry       things on a table: fruit cut open, sweets, buttons and other small objects.
//   J. Tessellate   tilings and tile games: truchet sets, Cairo and rhombille tilings, Wang tiles.
//   K. Press        print, signal and data: screens, dithers, barcodes, flags, gauges and charts.
//   L. Papercraft   paper folded and cut, patchwork blocks, stitching, bunting and rosettes.
//
// House rules, enforced by build-batch14.mjs (via pattern-lints.mjs) and by
// validate-batch14.mjs / validate-svg-batch14.mjs:
//
//   * every design exports as native SVG with no caveat: no svgExport: false,
//     no svgExportNote, no converter warning, pixel parity with the screen;
//   * exactly one @random(${shapeFrequency}) gate, so the frequency slider
//     always thins the whole field, and every cell paints with it wide open;
//   * every design samples a transition-able ink per cell, so a reseed
//     morphs rather than snapping;
//   * nothing paints var(--color0) - a hole is a mask, a clip or a gap, so it
//     stays a hole on a transparent background;
//   * a rule-local custom property is read with @var(), never var(), and a
//     randomized one read more than once is set per cell first;
//   * no keyframe animations, nested @doodle() or @svg() images, and no text;
//   * catalog metadata (tags, mood, density, goodFor) is authored from the
//     rendered design and lives in the definition, so regenerating the batch
//     never loses it.
import { RESERVED, TAKEN14, FIRST_ORDER } from './pattern-defs-14/shared.mjs';
import { sectionA } from './pattern-defs-14/a-loom.mjs';
import { sectionB } from './pattern-defs-14/b-wagara.mjs';
import { sectionC } from './pattern-defs-14/c-illusion.mjs';
import { sectionD } from './pattern-defs-14/d-drift.mjs';
import { sectionE } from './pattern-defs-14/e-grove.mjs';
import { sectionF } from './pattern-defs-14/f-masonry.mjs';
import { sectionG } from './pattern-defs-14/g-atomic.mjs';
import { sectionH } from './pattern-defs-14/h-orbit.mjs';
import { sectionI } from './pattern-defs-14/i-pantry.mjs';
import { sectionJ } from './pattern-defs-14/j-tessellate.mjs';
import { sectionK } from './pattern-defs-14/k-press.mjs';
import { sectionL } from './pattern-defs-14/l-papercraft.mjs';

export const SECTIONS = [
  sectionA,
  sectionB,
  sectionC,
  sectionD,
  sectionE,
  sectionF,
  sectionG,
  sectionH,
  sectionI,
  sectionJ,
  sectionK,
  sectionL,
];

let order = FIRST_ORDER;
const seen = new Set();
export const batch14 = [];

for (const { title, all } of SECTIONS) {
  for (const def of all) {
    if (RESERVED.has(def.slug)) {
      throw new Error(`${def.slug}: slug is a JS reserved word`);
    }
    // A name should never come to mean two different things: TAKEN14 carries
    // every motif name used anywhere in the project.
    if (TAKEN14.has(def.slug)) {
      throw new Error(`${def.slug} (${title}): name already used elsewhere`);
    }
    if (seen.has(def.slug)) throw new Error(`duplicate slug in batch 14: ${def.slug}`);
    seen.add(def.slug);
    batch14.push({ ...def, order: order++ });
  }
}
