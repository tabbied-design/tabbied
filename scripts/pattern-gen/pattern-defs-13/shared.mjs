// Batch 13 - shared vocabulary.
//
// Batch 13 keeps the constraint of batches 11 and 12 (native SVG export with
// no caveat) and re-exports what it uses of their vocabulary;
// pattern-defs-11/shared.mjs lists what is off the table and why. The helpers
// below are for anchoring geometry to the cell's corners and edges:
// `farthest-side` radials, so a stop at 100% means "one cell side" wherever
// the center sits, and hard linear bands that read as bars without needing a
// pseudo-element. The house rules are listed in pattern-defs-13.mjs.
export {
  RESERVED,
  section,
  F,
  TR,
  cp,
  rot,
  msk,
  B,
  A,
  ink,
  R2,
  R4,
  pieL,
  slotL,
  ringsL,
  poly,
} from '../pattern-defs-11/shared.mjs';
export {
  fade,
  midFade,
  stepFade,
  dotsL,
  softDotsL,
  faded,
  both,
  across,
} from '../pattern-defs-12/shared.mjs';

import { TAKEN12 } from '../pattern-defs-12/shared.mjs';
import { batch12 } from '../pattern-defs-12.mjs';

// Every motif name used anywhere in the project, batches 11 and 12 included.
export const TAKEN13 = new Set([...TAKEN12, ...batch12.map((d) => d.slug)]);

// -- anchored radials -------------------------------------------------------
// `farthest-side` makes a percentage stop mean "that fraction of one cell
// side" no matter where the center sits - `closest-side` collapses to zero
// the moment the center reaches a corner, and the default `farthest-corner`
// quietly rescales as the center moves. Every layer paints #000/transparent
// only, so the ink stays a transitionable background-color underneath.

/** A solid disc of radius `r`, centered at `at`. */
export const discL = (r, at = '50% 50%') =>
  `radial-gradient(circle farthest-side at ${at}, #000 ${r}, transparent ${r})`;

/** The band between two radii, centered at `at`, sized against one cell side. */
export const bandFS = (inner, outer, at = '50% 50%') =>
  `radial-gradient(circle farthest-side at ${at}, transparent ${inner}, #000 ${inner} ${outer}, transparent ${outer})`;

/** Everything *outside* a disc: a hole of radius `r` bored at `at`. */
export const boreFS = (r, at = '50% 50%') =>
  `radial-gradient(circle farthest-side at ${at}, transparent ${r}, #000 ${r})`;

// -- hard linear bands ------------------------------------------------------
// A bar as a mask layer rather than a pseudo-element: the strip between two
// stops, at any angle. Composable - msk(a, b) adds bars into crosses and
// frames, mskI(a, b) intersects them.

/** The strip between `from` and `to`, running across the `angle` direction. */
export const bandLin = (angle, from, to) =>
  `linear-gradient(${angle}, transparent 0 ${from}, #000 ${from} ${to}, transparent ${to})`;

/** Ink from the `angle`-start edge up to `to` - a slab against one edge. */
export const slabLin = (angle, to) =>
  `linear-gradient(${angle}, #000 0 ${to}, transparent ${to})`;

// -- stepped radial ---------------------------------------------------------

/**
 * The radial counterpart of stepFade(): a falloff from `at` posterized into
 * `steps` flat alpha levels. Hard stops throughout, so it exports as a
 * <radialGradient> with paired stops rather than anything smooth.
 */
export const stepGlow = (at, steps, span = 100) => {
  const stops = [];
  for (let i = 0; i < steps; i++) {
    const a = Math.round(255 * (1 - i / steps))
      .toString(16)
      .padStart(2, '0');
    const from = ((i * span) / steps).toFixed(1);
    const to = (((i + 1) * span) / steps).toFixed(1);
    stops.push(`#000000${a} ${from}% ${to}%`);
  }
  stops.push(`transparent ${span}%`);
  return `radial-gradient(circle farthest-side at ${at}, ${stops.join(', ')})`;
};

// -- tiled layers -----------------------------------------------------------
// A gradient smaller than its box tiles, and the converter turns the layer
// into an SVG <pattern> holding one tile.

/** Any gradient, tiled at `w` x `h` from the top-left corner. */
const tiled = (gradient, w, h = w) => `${gradient} 0 0 / ${w} ${h}`;

/** A hard-edged ring (eyelet) in each `pitch`-sized tile. */
export const eyeletL = (inner, outer, pitch) =>
  tiled(
    `radial-gradient(circle at 50% 50%, transparent ${inner}, #000 ${inner} ${outer}, transparent ${outer})`,
    pitch
  );
