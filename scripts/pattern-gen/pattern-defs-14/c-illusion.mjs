// C. Illusion - op art: figures that bulge, twist, tunnel and shimmer as they cross the sheet.
import { section, F, TR, cp, rot, msk, mskI, B, A, ink } from './shared.mjs';

const { add, all } = section('C. Illusion');

// -- position helpers --------------------------------------------------------
/** A css-doodle number rounded to two places (no exponent notation leaks out). */
const K = (e) => `@calc(round((${e}) * 100) / 100)`;
/** The middle of the sheet, in the cell's own percent coordinates. */
const CX = '(50 - 100 * @dx)';
const CY = '(50 - 100 * @dy)';
/** Half the sheet's short side, in cells: the radius at which fr reaches 1. */
const RC = '(min(@X, @Y) / 2)';

// -- prototypes --------------------------------------------------------------

const ringL = (on, period, inv = false) =>
  `repeating-radial-gradient(ellipse ${K(`${RC} * 100`)}% ${K(`${RC} * 100`)}% at ${K(CX)}% ${K(CY)}%, ${
    inv ? `transparent 0 ${on}%, #000 ${on}% ${period}%` : `#000 0 ${on}%, transparent ${on}% ${period}%`
  })`;
const stripeL = (angle, on, period, inv = false) =>
  `repeating-linear-gradient(${angle}, ${
    inv ? `transparent 0 ${on}%, #000 ${on}% ${period}%` : `#000 0 ${on}%, transparent ${on}% ${period}%`
  })`;

add(
  'Target Stripe',
  'Concentric rings crossed with upright stripes, each swapping figure and ground where they meet.',
  (c) => ({
    rule: `${F} { ${B(`inset: 0; background: ${ink(c)}; ${mskI(ringL(7, 14), stripeL('90deg', 25, 50, true))}`)} ${A(
      `inset: 0; background: @lp(); ${mskI(ringL(7, 14, true), stripeL('90deg', 25, 50))}`
    )} }${TR}`,
  }),
  { pal: 3, inks: 2, grid: '6x9', tg: '6x6', meta: { tags: ['rings', 'stripes'], mood: ['bold'], density: 'dense', goodFor: ['poster'] } }
);

// Pleat: a checkerboard whose columns crowd together toward a fold.
const g = (t, a) => `((${t}) + ${a} * sin(2 * PI * ((${t}) - 0.5)) / (2 * PI))`;
const warpStops = (W0, W1, par) => {
  const s = `((${W1}) - (${W0}))`;
  const L = `(200 / ${s})`;
  const z = `(((${W0}) + ${par}) / 2)`;
  const ph = `(${z} - floor(${z}))`;
  const A_ = K(`max(0, 0.5 - ${ph}) * ${L}`);
  const B_ = K(`(1 - ${ph}) * ${L}`);
  const C_ = K(`min(1, 1.5 - ${ph}) * ${L}`);
  return `#000 0 ${A_}%, transparent ${A_}% ${B_}%, #000 ${B_}% ${C_}%, transparent ${C_}% ${K(L)}%`;
};
add(
  'Pleat',
  'A checkerboard whose columns crowd into thin slivers at a fold and open out again either side.',
  (c) => {
    const n = '(1.4 * @X)';
    const W0 = `${n} * ${g('(@x - 1) / @X', 0.7)}`;
    const W1 = `${n} * ${g('@x / @X', 0.7)}`;
    return {
      rule: `${F} { ${B(`inset: 0; background: ${ink(c)}; ${msk(`repeating-linear-gradient(90deg, ${warpStops(W0, W1, '(@y % 2)')})`)}`)} }${TR}`,
    };
  },
  { pal: 32, inks: 2, grid: '8x12', tg: '8x8', meta: { tags: ['checkerboard', 'stripes'], mood: ['bold'], density: 'dense', goodFor: ['poster'] } }
);

// Vanishing Point: towers seen from above the middle of the sheet.
add(
  'Vanishing Point',
  'Square towers seen from straight above, their tops leaning out from the middle of the sheet and their walls lit from one side.',
  (c) => {
    const f = 23; // half the top face, percent
    const kx = `max(-24, min(24, 20 * @dx / ${RC}))`;
    const ky = `max(-24, min(24, 20 * @dy / ${RC}))`;
    const x0 = K(`50 - ${f} + ${kx}`);
    const x1 = K(`50 + ${f} + ${kx}`);
    const y0 = K(`50 - ${f} + ${ky}`);
    const y1 = K(`50 + ${f} + ${ky}`);
    return {
      rule: `${F} { background: ${ink(c, 3)}; ${B(`inset: 0; background: var(--color1); ${cp(`polygon(0 0, 100% 0, ${x1}% ${y0}%, ${x0}% ${y0}%, ${x0}% ${y1}%, 0 100%)`)}`)} ${A(
        `inset: 0; background: var(--color2); ${cp(`polygon(100% 100%, 0 100%, ${x0}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y0}%, 100% 0)`)}`
      )} }${TR}`,
    };
  },
  { palette: ['#EDE6D6', '#E3B04B', '#7A3B2E', '#2B6F77', '#1F3A5F', '#C8553D'], grid: '6x9', tg: '6x6', meta: { tags: ['squares', 'blocks'], mood: ['bold'], density: 'dense', goodFor: ['poster'] } }
);

// Diamond ripple: L1 rings around the middle, as slit polygons.
const P2 = (X, Y) => `${K(`100 * (${X}) + ${CX}`)}% ${K(`100 * (${Y}) + ${CY}`)}%`;
const diamondRing = (c1, c2) =>
  `polygon(${[
    [c2, 0],
    [0, c2],
    [`0 - ${c2}`, 0],
    [0, `0 - ${c2}`],
    [c2, 0],
    [c1, 0],
    [0, `0 - ${c1}`],
    [`0 - ${c1}`, 0],
    [0, c1],
    [c1, 0],
  ]
    .map(([x, y]) => P2(x, y))
    .join(', ')})`;
add(
  'Diamond Ripple',
  'Nested diamonds spreading from the middle, their bands swelling and thinning as they go out.',
  (c) => {
    const base = '(abs(@dx) + abs(@dy) - 1)';
    const band = (k) => {
      const d = `(${base} + ${k})`;
      const h = `(0.1 + 0.32 * (0.5 + 0.5 * cos(PI * ${d} / ${RC} * 1.5)))`;
      return diamondRing(`max(0, ${d} - ${h})`, `max(0, ${d} + ${h})`);
    };
    return {
      rule: `${F} { ${B(`inset: 0; background: ${ink(c)}; ${cp(band(0.5))}`)} ${A(`inset: 0; background: ${ink(c)}; ${cp(band(1.5))}`)} }${TR}`,
    };
  },
  { pal: 13, inks: 3, grid: '6x9', tg: '7x7', meta: { tags: ['diamonds', 'concentric'], mood: ['bold'], density: 'dense', goodFor: ['poster'] } }
);

export const sectionC = { title: 'C. Illusion', all };
