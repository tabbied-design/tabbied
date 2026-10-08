// H. Orbit - sky and space: stars, moons, planets, orbits, comets and eclipses.
//
//   Milky Way       a band of glinting stars and haze lying across the sheet
//   Northern Lights curtains of rayed light swaying across the sheet
//
// Both read where the cell sits in the sheet, so the band and the curtains
// run on from cell to cell; @rn() lets neighbors agree on a size or a
// heading.
import { section, F, TR, cp, B, A, ink, poly } from './shared.mjs';

const { add, all } = section('H. Orbit');

// -- sheet geometry ------------------------------------------------------------
// A cell is one unit square. @dx/@dy is the offset of its center from the
// middle of the sheet, in cells, so the middle of the sheet sits at
// (50 - 100 * @dx)% across the cell box. An `ellipse W% H%` radial gradient
// sized in cell percentages draws the same circle in every cell, so a ring
// centered off the cell runs on across the whole sheet without a seam.

/** The cell's column / row as a fraction of the sheet. */
const FX = '((@x - 0.5) / @X)';
const FY = '((@y - 0.5) / @Y)';

// Mask layers written once, unprefixed. css-doodle writes a rule out for
// every cell, so a design with long per-cell masks halves its CSS this way.
const msk1 = (...layers) => `mask: ${layers.join(', ')};`;
const mskI1 = (...layers) => `mask: ${layers.join(', ')}; mask-composite: intersect;`;

/** A concave four-point star, the twinkle. */
const STAR4 = poly([
  [50, 0], [58, 42], [100, 50], [58, 58], [50, 100], [42, 58], [0, 50], [42, 42],
]);

// =============================================================================
// Stars
// =============================================================================

add(
  'Milky Way',
  'A hazy band of starlight lies across the sheet from corner to corner, crowded with bright four-point glints that dwindle to specks away from it.',
  (c) => {
    const d = `abs(${FX} + ${FY} - 1 + @rn(-0.18, 0.18)) / 1.414`;
    const w = `max(0, 1 - ${d} / 0.26)`;
    return {
      rule: `--w: @calc(${w});
      ${F} {
        ${B(`inset: -55%; background: var(--color1); ${msk1('radial-gradient(closest-side, #000, transparent)')} opacity: calc(0.42 * @var(--w));`)}
        ${A(`inset: 4%; background: ${ink(c, 2)}; ${cp(STAR4)} transform: translate(@r(-22%, 22%), @r(-22%, 22%)) scale(calc(0.12 + 0.8 * @var(--w) * @r(0.35, 1)));`)}
        background: radial-gradient(circle at @r(8, 92)% @r(8, 92)%, var(--color2) 0 1.4%, transparent 2.2%);
      }${TR}`,
    };
  },
  {
    palette: ['#0B0A1F', '#5B4C9A', '#F6F1FF', '#FFD98E', '#A9C8FF', '#F2A7D8'],
    grid: '9x13',
    tg: '10x10',
    meta: { tags: ['stars', 'dots', 'diagonals', 'gradients'], mood: ['calm', 'elegant'], density: 'medium', goodFor: ['hero-background', 'poster', 'og-image'] },
  }
);

// =============================================================================
// Comets and light
// =============================================================================

// Each curtain hangs from a curve across the sheet, y = Y * (base + amp *
// sin(...)), measured in rows. The one cell in each column that the curve
// passes through draws the whole curtain, from the curve up, skewed to the
// curve's slope there, so the columns join into one hem.
const hem = (base, amp, k, ph) => {
  const arg = `6.283 * ${k} * ${FX} + ${ph}`;
  const yc = `(@Y * (${base} + ${amp} * sin(${arg})))`;
  const slope = `(@Y * ${amp} * 6.283 * ${k} * cos(${arg}) / @X)`;
  return {
    on: `((${yc} >= @y - 1) * (${yc} < @y))`,
    top: `(${yc} - @y + 1)`,
    skew: `atan(${slope}) * 180 / PI`,
  };
};

const curtain = (h, H, inks) =>
  `left: -1%; width: 102%; height: calc(@var(${H}) * 100%); top: calc((@calc(${h.top}) - @var(${H})) * 100%); transform-origin: 50% 100%; transform: skewY(@calc(${h.skew})deg); background: ${inks}; opacity: @calc(${h.on} * @r(0.55, 1)); ${mskI1('linear-gradient(0deg, transparent 0, #000 6%, #00000080 40%, transparent 100%)', 'repeating-linear-gradient(90deg, #000 0 @r(3, 8)%, #00000047 0 @r(9, 15)%)')}`;

add(
  'Northern Lights',
  'Two curtains of rayed light hang across a night sky in green, teal and violet, brightest along their swaying lower hems and fading upward among faint stars.',
  (c) => {
    const upper = hem(0.5, 0.16, 1.1, 0.7);
    const lower = hem(0.8, 0.08, 1.7, 2.5);
    return {
      rule: `--h1: @r(2.2, 3.6); --h2: @r(1.4, 2.4);
      ${F} {
        background: radial-gradient(circle at @r(6, 94)% @r(6, 94)%, var(--color1) 0 1.6%, transparent 2.4%);
        ${B(curtain(upper, '--h1', '@p(var(--color2), var(--color3), var(--color4))'))}
        ${A(curtain(lower, '--h2', '@p(var(--color2), var(--color3), var(--color5))'))}
      }${TR}`,
    };
  },
  {
    palette: ['#06131F', '#E9F7F2', '#5BE3A8', '#3CC6D6', '#9B7BEA', '#E07AB8'],
    grid: '8x12',
    min: 44,
    tg: '6x6',
    meta: { tags: ['stripes', 'gradients', 'waves', 'lines'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['hero-background', 'poster', 'og-image'] },
  }
);

// =============================================================================
// The moon
// =============================================================================

// =============================================================================
// Planets and orbits
// =============================================================================

// =============================================================================
// Instruments
// =============================================================================

export const sectionH = { title: 'H. Orbit', all };
