// L. Ring - hard-stop radial bands.
//
// A radial-gradient whose stops pair up at the same positions is a set of
// concentric hard edges; as a mask that is a real ring with a real hole. The
// converter maps the stops to <radialGradient> one for one, so there is no
// geometry for a vector renderer to re-derive.
import { section, F, TR, rot, ringsL, faded, R4 } from './shared.mjs';

const { add, all } = section('L. Ring');

add(
  'Ringfield',
  'Rings on a close pitch, run from a point on one edge rather than the center.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${faded(c, ringsL('4%', '13%', '50% 100%'))} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 75 }
);

export const sectionL = { title: 'L. Ring', all };
