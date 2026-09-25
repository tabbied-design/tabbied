// L. Knitwork - what a knitted face does, in the two ways it does it.
//
// Ribbing end-on is a repeating gradient whose period carries two ribs and the
// groove between them, which no single on/off slot can draw. A sawtooth
// skyline has to be a polygon: a gradient can fade to a point but cannot hold
// one. Both keep their ground open (mask holes, and sky outside the clip).
import { section, F, TR, cp, ink, poly, rot, faded, R2, R4 } from './shared.mjs';

const { add, all } = section('L. Knitwork');

add(
  'Wale',
  'Ribbing read end-on: paired ribs with a groove down each pair.',
  (c) => ({
    rule: `--rot: ${R2}; ${F} { ${faded(
      c,
      'repeating-linear-gradient(90deg, #000 0 8%, transparent 8% 10%, #000 10% 18%, transparent 18% 33.33%)'
    )} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 69 }
);

add(
  'Guernsey',
  'A sawtooth skyline filled solid to the hem.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { background: ${ink(c)}; ${cp(
      poly([[0, 44], [25, 20], [50, 44], [75, 20], [100, 44], [100, 100], [0, 100]])
    )} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 56 }
);

export const sectionL = { title: 'L. Knitwork', all };
