// E. Bloom - the ramp run outwards from a point instead of across the cell.
//
// A radial-gradient mask is a glow with no blur, shadow or filter: written as
// stops it exports as a <radialGradient> and needs no svgExportNote, unlike
// the designs that reach for box-shadow or blur (`bokeh`, `neon`, `lantern`,
// `terrain`). The light is thrown from a corner, so the quarter turn moves
// the source around from cell to cell.
import { section, F, TR, rot, faded, R4 } from './shared.mjs';

const { add, all } = section('E. Bloom');

/** A ramp anchored off the middle of the cell, turned a quarter at a time. */
const turned = (c, layer, turns = R4) =>
  `--rot: ${turns}; ${F} { ${faded(c, layer)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Radiance',
  'The light comes from one corner of the cell rather than the center of it.',
  (c) => ({
    rule: turned(c, 'radial-gradient(circle at 0% 100%, #000 0%, transparent 82%)'),
  }),
  { pal: 45 }
);

export const sectionE = { title: 'E. Bloom', all };
