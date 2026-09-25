// C. Stipple - a dot field with a ramp laid over it.
//
// Two mask layers intersected: the tiled dot field decides where ink can go,
// the ramp how much of it survives, and the result is a halftone that thins
// across the cell. `mask-composite: intersect` exports as one <mask> nested
// inside the next, and the dot field as an SVG <pattern> holding one dot, so
// a dense field costs one gradient.
import {
  section,
  F,
  TR,
  rot,
  fade,
  rise,
  midFade,
  dotsL,
  softDotsL,
  both,
  R2,
  R4,
} from './shared.mjs';

const { add, all } = section('C. Stipple');

/** A dot field thinned by a ramp, turned a quarter at a time. */
const thinned = (c, field, ramp, turns = R4) =>
  `--rot: ${turns}; ${F} { ${both(c, field, ramp)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Stipplefade',
  'An even stipple at one edge of the cell, thinning to nothing at the other.',
  (c) => ({ rule: thinned(c, dotsL('30%', '12.5%'), fade('180deg', '0%', '100%')) }),
  { pal: 24 }
);

add(
  'Dotfade',
  'Big dots on a wide pitch, falling away on the diagonal.',
  (c) => ({ rule: thinned(c, dotsL('40%', '25%'), fade('135deg', '0%', '100%'), R2) }),
  { pal: 5 }
);

add(
  'Grainfall',
  'A fine grain, dense enough to read as a tint where it starts and as specks where it ends.',
  (c) => ({ rule: thinned(c, dotsL('26%', '11.1%'), fade('180deg', '10%', '100%')) }),
  { pal: 21 }
);

add(
  'Spraydown',
  'Nothing at the top of the cell and a heavy spray by the bottom.',
  (c) => ({
    rule: thinned(c, softDotsL('6%', '48%', '6.25%'), rise('180deg', '4%', '100%')),
  }),
  { pal: 59 }
);

add(
  'Dustfall',
  'A fine field on a close pitch, settling toward one edge.',
  (c) => ({ rule: thinned(c, dotsL('24%', '10%'), fade('0deg', '0%', '100%')) }),
  { pal: 66 }
);

add(
  'Dotdrift',
  'A soft-edged band of stipple running across the cell with clear ground either side.',
  (c) => ({
    rule: thinned(c, dotsL('26%', '16.67%'), midFade('90deg', '0%', '35%', '65%', '100%')),
  }),
  { pal: 12 }
);

add(
  'Peppering',
  'Coarse dots concentrated in the middle third and thinning out from there.',
  (c) => ({
    rule: thinned(c, dotsL('34%', '20%'), midFade('180deg', '8%', '40%', '60%', '92%'), R2),
  }),
  { pal: 49 }
);

add(
  'Dotwash',
  'The field pooled in one corner, thinning as it goes out from it.',
  (c) => ({
    rule: thinned(
      c,
      dotsL('28%', '14.3%'),
      'radial-gradient(circle at 100% 0%, #000 0%, transparent 92%)'
    ),
  }),
  { pal: 74 }
);

export const sectionC = { title: 'C. Stipple', all };
