// B. Fell - a rounded mass standing off the side of the cell.
//
// A `farthest-side` radial seated *on* an edge, so the disc is cut exactly in
// half by the side it stands on and reads as a headland face rather than a
// circle that happens to be clipped. `closest-side` could not draw it - it
// collapses to a zero radius the moment the center reaches an edge - and
// `farthest-corner` would rescale the stop as the center moved.
//
// The ink is a plain background-color under the mask, so a reseed morphs
// through the color, and the sky is a real hole rather than a second fill.
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
