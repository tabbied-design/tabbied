// F. Metalwork - beads turned concentric on the lathe.
//
// A repeating-radial-gradient run from the center of the cell. The first stop
// has to sit at 0 or the repeat starts mid-ring and the center reads as a
// blot. The converter maps the stops to <radialGradient> one for one, and the
// rings are a mask, so the ground between them stays see-through.
import { section, F, TR, rot, faded, ringsL, R4 } from './shared.mjs';

const { add, all } = section('F. Metalwork');

add(
  'Capstan',
  'Fine concentric beads turned all the way out from the center.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${faded(c, ringsL('4%', '12%'))} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 54 }
);

export const sectionF = { title: 'F. Metalwork', all };
