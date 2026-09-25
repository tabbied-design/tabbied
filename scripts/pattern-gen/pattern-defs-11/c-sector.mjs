// C. Sector - hard-stop conic pies.
//
// SVG has no primitive for a conic sweep. A span whose two ends are the same
// color is a sector, which the converter emits as a path; a span whose ends
// differ is a smooth angular blend, which it refuses. Every conic here is a
// hard stop used as a mask, so the rest of the cell is a genuine hole.
import { section, F, TR, ink, rot, pie1, arcSector, R4 } from './shared.mjs';

const { add, all } = section('C. Sector');

add(
  'Beamspread',
  'One wide beam thrown from the middle of an edge, opening to nearly a half-circle.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { background: ${ink(c)}; ${pie1('104deg', { from: '308deg', at: '50% 100%' })} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 20 }
);

add(
  'Protractor',
  'A half circle with the middle bored out - a sector taken all the way to 180 degrees.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { background: ${ink(c)}; ${arcSector('180deg', '36%')} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 59 }
);

export const sectionC = { title: 'C. Sector', all };
