// Batch 12 - designs that export as native SVG with no caveat at all, the
// rule batch 11 set. This batch spends most of its designs on the part of the
// supported subset the catalog had barely used, the smooth gradient: straight
// fades over a solid ink, dot and ruled fields thinned across a cell, a glow
// thrown from a corner, ramps shut inside a cut shape, and a fade posterized
// into flat alpha levels. Every ramp is a mask over an ordinary
// background-color (pattern-defs-12/shared.mjs says why). The rest work in
// batch 11's hard-edged vocabulary. Only *conic* blends are impossible, and
// there are none.
//
// The families, in the order they ship:
//
//   A. Falloff     one ink, one straight ramp.
//   C. Stipple     dot fields thinned by a ramp.
//   D. Drybrush    ruled fields thinned by a ramp.
//   E. Bloom       a radial ramp thrown from a corner.
//   F. Cutfade     a ramp confined to a cut shape.
//   G. Rampband    a fade posterized into flat alpha levels.
//   I. Split       one cut across the cell, an ink either side.
//   J. Chamfer     corners taken off the square.
//   L. Ring        hard-stop radial bands.
//   N. Speck       hard-edged dot fields.
//   R. Overlap     two shapes crossing, read through opacity.
//   S. Intersect   mask-composite: intersect.
//   T. Radius      border-radius forms.
//
// (B, H, K, M, O, P and Q were authored and cut; the letters skip them rather
// than renumber designs that already have their gallery order.)
//
// House rules, enforced by generate-batch12.mjs (via pattern-lints.mjs) and
// validate-batch12.mjs: exactly one @random(${shapeFrequency}) gate per
// design; every design samples a transition-able ink per cell so a reseed
// morphs; a randomized custom prop read more than once goes through
// @var(--x); nothing paints var(--color0), because a hole knocked out in the
// background color stops being a hole the moment the background is
// transparent.
import { RESERVED, TAKEN12 } from './pattern-defs-12/shared.mjs';
import { sectionA } from './pattern-defs-12/a-falloff.mjs';
import { sectionC } from './pattern-defs-12/c-stipple.mjs';
import { sectionD } from './pattern-defs-12/d-drybrush.mjs';
import { sectionE } from './pattern-defs-12/e-bloom.mjs';
import { sectionF } from './pattern-defs-12/f-cutfade.mjs';
import { sectionG } from './pattern-defs-12/g-rampband.mjs';
import { sectionI } from './pattern-defs-12/i-split.mjs';
import { sectionJ } from './pattern-defs-12/j-chamfer.mjs';
import { sectionL } from './pattern-defs-12/l-ring.mjs';
import { sectionN } from './pattern-defs-12/n-speck.mjs';
import { sectionR } from './pattern-defs-12/r-overlap.mjs';
import { sectionS } from './pattern-defs-12/s-intersect.mjs';
import { sectionT } from './pattern-defs-12/t-radius.mjs';

const SECTIONS = [
  sectionA,
  sectionC,
  sectionD,
  sectionE,
  sectionF,
  sectionG,
  sectionI,
  sectionJ,
  sectionL,
  sectionN,
  sectionR,
  sectionS,
  sectionT,
];

// Batch 12 owns gallery orders 1400-1999 (see generate-batch12.mjs).
const FIRST_ORDER = 1400;

let order = FIRST_ORDER;
const seen = new Set();
export const batch12 = [];

for (const { title, all } of SECTIONS) {
  for (const def of all) {
    if (RESERVED.has(def.slug)) {
      throw new Error(`${def.slug}: slug is a JS reserved word`);
    }
    // A name should never come to mean two different things: TAKEN12 carries
    // every motif name used anywhere in the project, cut designs included.
    if (TAKEN12.has(def.slug)) {
      throw new Error(`${def.slug} (${title}): name already used elsewhere`);
    }
    if (seen.has(def.slug)) throw new Error(`duplicate slug in batch 12: ${def.slug}`);
    seen.add(def.slug);
    batch12.push({ ...def, order: order++ });
  }
}
