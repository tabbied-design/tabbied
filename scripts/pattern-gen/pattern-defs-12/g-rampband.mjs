// G. Rampband - a ramp cut into steps.
//
// `stepFade()` writes a fall as a handful of flat translucent levels, every
// stop pair at the same position: a hard-stop gradient that reads as a ramp,
// with the *amount* of ink quantized rather than the geometry. The alpha is
// carried by the mask, so on a transparent background the sheet shows
// through each step in proportion.
import {
  section,
  F,
  TR,
  rot,
  stepFade,
  faded,
  R4,
} from './shared.mjs';

const { add, all } = section('G. Rampband');

const banded = (c, layer, turns = R4) =>
  `--rot: ${turns}; ${F} { ${faded(c, layer)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Stepramp',
  'A single fall cut into five flat levels, so the fade is counted rather than smooth.',
  (c) => ({ rule: banded(c, stepFade('180deg', 5)) }),
  { pal: 28 }
);

export const sectionG = { title: 'G. Rampband', all };
