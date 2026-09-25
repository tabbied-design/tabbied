// E. Shirting - one stripe, four weights.
//
// One repeating-linear-gradient mask per design, and only the ratio of rule to
// ground changes: a hairline on an open set, an even stripe, a dense rib, and
// cloth so nearly solid only a pinstripe of ground survives. A repeating
// gradient exports as a tiled <linearGradient>, so the ground stays a real
// hole on a transparent background.
import { section, F, TR, rot, faded, slotL, R2 } from './shared.mjs';

const { add, all } = section('E. Shirting');

/** A ruled field over one ink. Every design here is upright, so the turn is
 *  the half turn - a quarter would only swap warp for weft. */
const ruled = (c, layer) =>
  `--rot: ${R2}; ${F} { ${faded(c, layer)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Batiste',
  'Hairlines spaced far apart on an airy ground.',
  (c) => ({ rule: ruled(c, slotL('90deg', '2%', '20%')) }),
  { pal: 48 }
);

add(
  'Percale',
  'A crisp, even stripe, ink and ground given equal measure.',
  (c) => ({ rule: ruled(c, slotL('90deg', '10%', '20%')) }),
  { pal: 9 }
);

add(
  'Fustian',
  'A dense, hard-wearing rib - more ink than ground.',
  (c) => ({ rule: ruled(c, slotL('90deg', '14%', '22%')) }),
  { pal: 57 }
);

add(
  'Moleskin',
  'Cloth nearly solid, with only a pinstripe of ground surviving the shear.',
  (c) => ({ rule: ruled(c, slotL('90deg', '21%', '25%')) }),
  { pal: 61 }
);

export const sectionE = { title: 'E. Shirting', all };
