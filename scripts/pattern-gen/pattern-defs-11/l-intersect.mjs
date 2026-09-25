// L. Intersect - one shape cut by another, and only what they agree on left.
//
// `mask-composite: intersect` keeps the part every mask layer covers: two
// stripe fields crossed leave a lattice of blocks, two sectors aimed at each
// other the diamond where they meet. The converter nests one <mask> inside
// the next, which composites exactly as CSS did.
import {
  section,
  F,
  TR,
  cp,
  ink,
  poly,
  rot,
  msk,
  mskI,
  slotL,
  pieL,
  R4,
} from './shared.mjs';

const { add, all } = section('L. Intersect');

/** One ink, cut by everything the layers agree on. */
const both = (c, ...layers) => `background: ${ink(c)}; ${mskI(...layers)}`;

add(
  'Bothways',
  'A field ruled both ways at once, so only the crossings survive.',
  (c) => ({
    rule: `${F} { ${both(c, slotL('0deg', '14%', '25%'), slotL('90deg', '14%', '25%'))} }${TR}`,
  }),
  { pal: 12 }
);

add(
  'Meetpart',
  'Two sectors from opposite corners, only the diamond where they meet left.',
  (c) => ({
    // Each apex only sees one quadrant of the turn: 90-180deg from the
    // top-left corner, 270-360deg from the bottom-right, and the two sectors
    // are aimed at each other so they cross in the middle.
    rule: `--rot: ${R4}; ${F} { ${both(c, pieL('62deg', { from: '98deg', at: '0% 0%' }), pieL('62deg', { from: '278deg', at: '100% 100%' }))} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 62 }
);

add(
  'Shearpair',
  'A triangle cut by rules running the other way from its slope.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { background: ${ink(c)}; ${cp(poly([[0, 100], [100, 0], [100, 100]]))} ${msk(slotL('45deg', '9%', '20%'))} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 4 }
);

export const sectionL = { title: 'L. Intersect', all };
