// M. Kilnglow - a smooth radial ramp, behaving like a glaze.
//
// A scorch reaching in from one corner: solid for a fifth of its radius, then
// a long smooth fall to nothing. It is the effect a blur or box-shadow would
// normally draw (and does in bokeh, neon, lantern and terrain, which carry an
// svgExportNote); written as stops, a <radialGradient> needs no note. The ramp
// is a mask over a solid ink (see pattern-defs-12/shared.mjs for why).
import { section, F, TR, rot, faded, R4 } from './shared.mjs';

const { add, all } = section('M. Kilnglow');

/** Solid to `hold`, gone by `gone`, thrown from `at`. */
const glow = (at, hold, gone) =>
  `radial-gradient(circle farthest-side at ${at}, #000 0 ${hold}, transparent ${gone})`;

add(
  'Raku',
  'A scorch reaching in from one corner across most of the cell.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${faded(c, glow('100% 100%', '20%', '86%'))} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 19 }
);

export const sectionM = { title: 'M. Kilnglow', all };
