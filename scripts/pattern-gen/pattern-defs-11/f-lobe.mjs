// F. Lobe - everything border-radius can be talked into.
//
// Eight numbers (a horizontal and a vertical radius per corner) give circles,
// leaves and ovals, and every one interpolates into every other, so a reseed
// morphs rather than cuts. The converter emits a path with matching
// elliptical arcs; it refuses a *border* on a partially-rounded box, and
// nothing here has one.
import { section, F, TR, ink, rot, R2, R4 } from './shared.mjs';

const { add, all } = section('F. Lobe');

/** A rounded solid filling the cell, turned a quarter at a time. */
const lobe = (c, radius, turns = R4) =>
  `--rot: ${turns}; ${F} { background: ${ink(c)}; border-radius: ${radius}; ${rot('@var(--rot)')} }${TR}`;

add(
  'Lobeform',
  'Three corners rounded and one left square: the plainest leaf there is.',
  (c) => ({ rule: lobe(c, '50% 50% 50% 0') }),
  { pal: 0 }
);

add(
  'Petalcut',
  'Two opposite corners taken all the way round and two left sharp.',
  (c) => ({ rule: lobe(c, '100% 0 100% 0', R2) }),
  { pal: 19 }
);

export const sectionF = { title: 'F. Lobe', all };
