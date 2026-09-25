// Batch 11 - designs that export as native SVG with no caveat at all: no
// warning dialog, no filter effects for a design tool to mangle, and no
// sub-pixel deviation from what is on screen. That rules out a lot of CSS:
// pattern-defs-11/shared.mjs lists what and why and holds the helpers;
// docs/svg-export.md is the export contract itself.
//
// The families, in the order they ship:
//
//   A. Split       one straight cut across the cell; two inks meet.
//   B. Rule        stripe fields - pitch, duty, angle.
//   C. Sector      hard-stop conic pies.
//   D. Annulus     radial hard stops: rings and bands.
//   E. Chamfer     polygons that cut corners, notches and steps.
//   F. Lobe        border-radius forms.
//   H. Bar         placed bars rather than repeating fields.
//   I. Wedge       triangles.
//   J. Speck       dot fields and halftones.
//   K. Overlap     two shapes crossing, read through opacity.
//   L. Intersect   mask-composite: intersect - one shape cut by another.
//   M. Fade        smooth linear ramps, used as masks.
//
// (G, N, O and P were authored and cut; the letters skip them rather than
// renumber designs that already have their gallery order.)
//
// House rules, enforced by generate-batch11.mjs (via pattern-lints.mjs) and
// validate-batch11.mjs: exactly one @random(${shapeFrequency}) gate per
// design; every design samples a transition-able ink per cell so a reseed
// morphs; a randomized custom prop read more than once goes through
// @var(--x); nothing paints var(--color0), because a hole knocked out in the
// background color stops being a hole the moment the background is
// transparent.
import { RESERVED, TAKEN } from './pattern-defs-11/shared.mjs';
import { sectionA } from './pattern-defs-11/a-split.mjs';
import { sectionB } from './pattern-defs-11/b-rule.mjs';
import { sectionC } from './pattern-defs-11/c-sector.mjs';
import { sectionD } from './pattern-defs-11/d-annulus.mjs';
import { sectionE } from './pattern-defs-11/e-chamfer.mjs';
import { sectionF } from './pattern-defs-11/f-lobe.mjs';
import { sectionH } from './pattern-defs-11/h-bar.mjs';
import { sectionI } from './pattern-defs-11/i-wedge.mjs';
import { sectionJ } from './pattern-defs-11/j-speck.mjs';
import { sectionK } from './pattern-defs-11/k-overlap.mjs';
import { sectionL } from './pattern-defs-11/l-intersect.mjs';
import { sectionM } from './pattern-defs-11/m-fade.mjs';

const SECTIONS = [
  sectionA,
  sectionB,
  sectionC,
  sectionD,
  sectionE,
  sectionF,
  sectionH,
  sectionI,
  sectionJ,
  sectionK,
  sectionL,
  sectionM,
];

// Batch 11 owns gallery orders 1200-1399 (see generate-batch11.mjs).
const FIRST_ORDER = 1200;

let order = FIRST_ORDER;
const seen = new Set();
export const batch11 = [];

for (const { title, all } of SECTIONS) {
  for (const def of all) {
    if (RESERVED.has(def.slug)) {
      throw new Error(`${def.slug}: slug is a JS reserved word`);
    }
    // A name should never come to mean two different things: TAKEN carries
    // every motif name used anywhere in the project, cut designs included.
    if (TAKEN.has(def.slug)) {
      throw new Error(`${def.slug} (${title}): name already used elsewhere`);
    }
    if (seen.has(def.slug)) throw new Error(`duplicate slug in batch 11: ${def.slug}`);
    seen.add(def.slug);
    batch11.push({ ...def, order: order++ });
  }
}
