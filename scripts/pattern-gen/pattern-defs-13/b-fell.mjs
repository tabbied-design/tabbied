// B. Fell - a rounded mass standing off the side of the cell.
//
// A `farthest-side` radial seated *on* an edge, so the disc is cut exactly in
// half by the side it stands on and reads as a headland rather than a clipped
// circle. `closest-side` collapses to a zero radius once the center reaches
// an edge, and `farthest-corner` would rescale as the center moved. The sky
// is a real hole in a mask over one ink.
import { section, F, TR, rot, faded, discL, R2 } from './shared.mjs';

const { add, all } = section('B. Fell');

add(
  'Bluff',
  'A half-round face standing straight off one side of the cell.',
  (c) => ({
    rule: `--rot: ${R2}; ${F} { ${faded(c, discL('66%', '0% 50%'))} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 12 }
);

export const sectionB = { title: 'B. Fell', all };
