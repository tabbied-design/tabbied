// C. Roofline - profiles taken off the top of a solid mass.
//
// A gable with its peak clipped back to a short flat, and a projecting course
// with its underside bevelled away to the wall. clip-path: polygon() exports
// as an SVG <clipPath> with the same points, and nothing is filled back in,
// so what is cut away stays a real hole on a transparent background.
import { section, F, TR, cp, ink, poly, rot, R2, R4 } from './shared.mjs';

const { add, all } = section('C. Roofline');

/** A solid mass clipped to a profile, turned a quarter at a time. */
const profile = (c, shape, turns = R4) =>
  `--rot: ${turns}; ${F} { background: ${ink(c)}; ${cp(shape)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Jerkinhead',
  'A gable with its peak clipped back, leaving a short flat instead of a point.',
  (c) => ({
    rule: profile(
      c,
      poly([[0, 100], [100, 100], [100, 46], [72, 14], [28, 14], [0, 46]])
    ),
  }),
  { pal: 47 }
);

add(
  'Larmier',
  'A projecting course: a flat band with its underside bevelled back to the wall.',
  (c) => ({
    rule: profile(
      c,
      poly([[0, 30], [100, 30], [100, 52], [84, 68], [16, 68], [0, 52]]),
      R2
    ),
  }),
  { pal: 44 }
);

export const sectionC = { title: 'C. Roofline', all };
