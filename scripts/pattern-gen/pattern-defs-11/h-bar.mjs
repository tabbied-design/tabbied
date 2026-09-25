// H. Bar - marks assembled from plain rectangles.
//
// An absolutely-positioned pseudo-element is a rectangle, and two of them are
// a cross, a tee, an ell, a pair of rails. A rectangle exports as a <rect>
// with the same four numbers, the most exact thing the converter does. These
// are *placed* marks; section B has the repeating fields.
import { section, A, B, F, TR, ink, rot, R2, R4 } from './shared.mjs';

const { add, all } = section('H. Bar');

/** Two bars, one from each pseudo-element, on a cell that is otherwise empty. */
const bars = (first, second, turns = R4) =>
  `--rot: ${turns}; ${F} { ${B(first)} ${A(second)} ${rot('@var(--rot)')} }${TR}`;

const across = (top, height, inkValue, from = '0', to = '0') =>
  `left: ${from}; right: ${to}; top: ${top}; height: ${height}; background: ${inkValue};`;

add(
  'Doublebar',
  'Two parallel bars of equal weight with a wide channel between them.',
  (c) => ({
    rule: bars(across('22%', '18%', ink(c)), across('60%', '18%', ink(c)), R2),
  }),
  { pal: 24 }
);

add(
  'Slashbar',
  'One bar leaning at forty-five degrees, kept inside its cell.',
  (c) => ({
    rule: `--rot: ${R2}; ${F} { ${A(`left: 14%; right: 14%; top: 44%; height: 13%; background: ${ink(c)}; ${rot('-45deg')}`)} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 26 }
);

export const sectionH = { title: 'H. Bar', all };
