// H. Sheer - the dotted grounds of net and lace.
//
// Tiled radial fields: a hard dot, a feathered dot, and a ring. The converter
// turns each tiled layer into an SVG <pattern> holding one tile.
//
// Mind the pitch: a dot far below a pixel at thumbnail scale is rounded
// differently by CSS and by a vector rasterizer, and the parity sweep sees a
// whole-field diff. The two finest designs (Bobbinet, Tulle) are drawn coarse
// enough, on a 3x3 thumbnail grid, that their features stay whole pixels.
import {
  section,
  F,
  TR,
  rot,
  faded,
  dotsL,
  softDotsL,
  eyeletL,
  R4,
} from './shared.mjs';

const { add, all } = section('H. Sheer');

const turned = (decls, turns = R4) =>
  `--rot: ${turns}; ${F} { ${decls} ${rot('@var(--rot)')} }${TR}`;

add(
  'Bobbinet',
  'A net of eyelets - the ground a bobbin lace is worked on.',
  (c) => ({ rule: turned(faded(c, eyeletL('16%', '28%', '25%'))) }),
  { pal: 51, tg: '3x3' }
);

add(
  'Tulle',
  'An even veil of dots, close enough to read almost as a tint.',
  (c) => ({ rule: turned(faded(c, dotsL('28%', '12.5%'))) }),
  { pal: 14, tg: '3x3' }
);

add(
  'Maline',
  'Small dots with feathered edges, soft as pressed net.',
  (c) => ({ rule: turned(faded(c, softDotsL('8%', '30%', '12.5%'))) }),
  { pal: 44 }
);

add(
  'Ninon',
  'Sparse pin dots on a wide open ground.',
  (c) => ({ rule: turned(faded(c, dotsL('10%', '14.3%'))) }),
  { pal: 27 }
);

export const sectionH = { title: 'H. Sheer', all };
