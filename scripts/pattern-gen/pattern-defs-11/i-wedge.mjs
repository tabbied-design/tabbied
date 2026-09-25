// I. Wedge - triangles, points and tapers. A triangle is three points in a
// clip path, which maps to an SVG <clipPath> vertex for vertex.
import { section, F, TR, cp, ink, poly, rot, R4 } from './shared.mjs';

const { add, all } = section('I. Wedge');

/** A solid cut to a profile and turned a quarter at a time. */
const cut = (c, shape, turns = R4) =>
  `--rot: ${turns}; ${F} { background: ${ink(c)}; ${cp(shape)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Gnomonwedge',
  'A right triangle filling half the cell, the hypotenuse running corner to corner.',
  (c) => ({ rule: cut(c, poly([[0, 0], [100, 100], [0, 100]])) }),
  { pal: 0 }
);

add(
  'Quoinwedge',
  'A wedge set into a corner, its point running to the far edge.',
  (c) => ({ rule: cut(c, poly([[0, 0], [100, 0], [100, 34], [0, 100]])) }),
  { pal: 50 }
);

export const sectionI = { title: 'I. Wedge', all };
