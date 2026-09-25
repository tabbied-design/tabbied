// R. Overlap - two shapes crossing, and what the crossing does.
//
// The region where both shapes are reads as its own color because the upper
// one is let down with opacity, which exports exactly as a group attribute.
// mix-blend-mode is deliberately not used: it exports as an SVG blend style,
// the least portable thing the converter emits, and needs a caveat.
import { section, A, B, F, TR, ink, rot, R4, c1 } from './shared.mjs';

const { add, all } = section('R. Overlap');

add(
  'Overbar',
  'Two long bars fanned from a common corner, the upper one let down over it.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${B(`left: 10%; right: 44%; top: 10%; bottom: 10%; background: ${c1}; ${rot('-18deg')}`)} ${A(`left: 44%; right: 10%; top: 10%; bottom: 10%; background: ${ink(c, 2)}; ${rot('18deg')} opacity: 0.74;`)} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 71 }
);

export const sectionR = { title: 'R. Overlap', all };
