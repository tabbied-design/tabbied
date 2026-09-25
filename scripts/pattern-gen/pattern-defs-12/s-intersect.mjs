// S. Intersect - one shape cut by another, and only what they agree on left.
//
// `mask-composite: intersect` keeps the part every mask layer covers: two
// sectors aimed at each other from opposite corners leave only the lens where
// they cross, which no single gradient or clip path can draw. The converter
// nests one <mask> inside the next, which composites exactly as CSS did.
import { section, F, TR, rot, pieL, both, R4 } from './shared.mjs';

const { add, all } = section('S. Intersect');

add(
  'Bothcut',
  'Two sectors from opposite corners, only the lens where they cross left.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${both(
      c,
      pieL('58deg', { from: '100deg', at: '0% 0%' }),
      pieL('58deg', { from: '280deg', at: '100% 100%' })
    )} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 61 }
);

export const sectionS = { title: 'S. Intersect', all };
