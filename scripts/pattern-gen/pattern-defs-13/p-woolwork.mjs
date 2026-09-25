// P. Woolwork - a periodic field crossed with a smooth ramp.
//
// `mask-composite: intersect` multiplies two mask layers: the field decides
// where ink *can* go, the ramp how much of it survives, giving a halftone that
// lives in a band. The intersection exports as one <mask> nested inside the
// next, and the field as an SVG <pattern> holding a single tile.
import {
  section,
  F,
  TR,
  rot,
  both,
  midFade,
  dotsL,
  slotL,
  R2,
} from './shared.mjs';

const { add, all } = section('P. Woolwork');

/** A field thinned by a ramp. Both designs are read across their own width,
 *  so the half turn is the one that changes anything. */
const finished = (c, field, ramp) =>
  `--rot: ${R2}; ${F} { ${both(c, field, ramp)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Combed',
  'Fine rules surviving only in a band across the middle.',
  (c) => ({
    rule: finished(c, slotL('90deg', '5%', '10%'), midFade('180deg', '10%', '40%', '60%', '90%')),
  }),
  { pal: 52 }
);

add(
  'Mercerising',
  'Dots given a luster band on the bias.',
  (c) => ({
    rule: finished(c, dotsL('26%', '12.5%'), midFade('135deg', '15%', '42%', '58%', '85%')),
  }),
  { pal: 55 }
);

export const sectionP = { title: 'P. Woolwork', all };
