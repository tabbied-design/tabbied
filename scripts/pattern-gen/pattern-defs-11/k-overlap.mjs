// K. Overlap - two shapes crossing, and what the crossing does.
//
// The region where both shapes are reads as its own color because the upper
// one is let down with opacity, which exports exactly as a group attribute.
// mix-blend-mode is deliberately not used: it exports as an SVG blend style,
// the least portable thing the converter emits, and needs a caveat.
import { section, A, B, F, TR, ink, rot, R4, c1 } from './shared.mjs';

const { add, all } = section('K. Overlap');

add(
  'Fanned',
  'Two long shapes fanned from a common corner.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${B(`left: 12%; right: 46%; top: 8%; bottom: 8%; background: ${c1}; ${rot('-22deg')}`)} ${A(`left: 46%; right: 12%; top: 8%; bottom: 8%; background: ${ink(c, 2)}; ${rot('22deg')} opacity: 0.78;`)} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 24 }
);

export const sectionK = { title: 'K. Overlap', all };
