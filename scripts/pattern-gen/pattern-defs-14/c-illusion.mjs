// C. Illusion - op art: figures that bulge, twist, tunnel and shimmer as they cross the sheet.
//
// Most of these read where the cell sits. Two ways of doing that recur:
//
//   * A mask layer laid out in sheet coordinates. A ring centered at
//     (50 - 100 * @dx)% is centered on the middle of the sheet in every
//     cell, so the rings run on unbroken from cell to cell. Two such fields
//     crossed through a pair of pseudo-elements (one takes A and not B, the
//     other B and not A) give the figure-ground swaps op art lives on.
//   * A figure drawn once on the host (--fig: polygon(...)) and painted by a
//     pseudo-element the size of the sheet, placed so it lands in the same
//     spot in every cell, with the cell clipping it (overflow: hidden). Each
//     cell then shows its own piece of one big tunnel or fan.
//
// The thumbnail grids (tg) divide 300px into whole device pixels at 2x
// (5, 6, 8, 10 or 12 a side): a cell edge that lands mid-pixel is snapped by
// the browser and anti-aliased by SVG, which costs parity on every seam.
//
//   Float           a disc of upright lines hovering in a field of level ones
//   Vanishing Point towers seen from above, leaning out from the middle
//   Square Tunnel   square frames turning as they recede
//   Globe           dots squashed into ellipses round the rim of a sphere
//   Polar Fan       rays and rings from one corner crossed into a checker
import { section, F, TR, cp, msk, mskI, B, A, ink, fr } from './shared.mjs';

const { add, all } = section('C. Illusion');

// -- position helpers --------------------------------------------------------
/** A css-doodle number rounded to two places (no exponent notation leaks out). */
const K = (e) => `@calc(round((${e}) * 100) / 100)`;
/** The middle of the sheet, in the cell's own percent coordinates. */
const CX = '(50 - 100 * @dx)';
const CY = '(50 - 100 * @dy)';
/** Half the sheet's short side, in cells: the radius at which fr reaches 1. */
const RC = '(min(@X, @Y) / 2)';
/** A point of the sheet given as fractions of its width and height, in cell percent. */
const atX = (ox) => `(100 * (${ox} * @X - @x + 1))`;
const atY = (oy) => `(100 * (${oy} * @Y - @y + 1))`;
/** The bearing of the cell from the middle of the sheet, in degrees (0 = right). */
const BEARING = 'atan2(@dy, @dx) * 180 / PI';

const n2 = (v) => +v.toFixed(2);
const col = (...ns) => ns.map((n) => `var(--color${n})`);
/** A random pick from the listed palette slots (repeat a slot to weight it). */
const pick = (...ns) => `@p(${col(...ns).join(', ')})`;

/** Plain stripes, `on` inked out of every `period` (percent), or the gaps when inverted. */
const stripeL = (angle, on, period, inv = false) =>
  `repeating-linear-gradient(${angle}, ${
    inv ? `transparent 0 ${on}%, #000 ${on}% ${period}%` : `#000 0 ${on}%, transparent ${on}% ${period}%`
  })`;

// -- a figure drawn once on the host, seen through every cell ----------------
/**
 * A square pseudo-element of side `side` cells centered on the sheet point
 * (ox, oy), so a polygon kept on the host lands in the same place in every
 * cell; the cell clips it (overflow: hidden), so each cell shows its own
 * piece in its own ink.
 */
const bigBox = (ox, oy, side) =>
  `width: ${K(`${side} * 100`)}%; height: ${K(`${side} * 100`)}%; left: ${K(`${atX(ox)} - ${side} * 50`)}%; top: ${K(`${atY(oy)} - ${side} * 50`)}%;`;
/** A point at bearing `deg` (0 = up, clockwise) and radius `r`, in box percent. */
const P = (deg, r, cx = 50, cy = 50) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
};
const polyStr = (pts) => `polygon(${pts.map(([x, y]) => `${n2(x)}% ${n2(y)}%`).join(', ')})`;

/**
 * A fan of wedges from the box center: [from, to] bearings, out to radius r.
 * Each wedge leaves from the center and returns to it, so the pieces of one
 * polygon join only at that point.
 */
const fanPts = (spans, r = 80, steps = 1) => {
  const pts = [];
  for (const [a0, a1] of spans) {
    pts.push([50, 50]);
    for (let s = 0; s <= steps; s++) pts.push(P(a0 + ((a1 - a0) * s) / steps, r));
  }
  return pts;
};

// -- 1. crossed fields -------------------------------------------------------

add(
  'Float',
  'Fine level lines across the whole sheet, with a disc of upright lines set into the middle so it seems to hover over them.',
  () => {
    const disc = (inside) =>
      `radial-gradient(ellipse ${K(`${RC} * 62`)}% ${K(`${RC} * 62`)}% at ${K(CX)}% ${K(CY)}%, ${
        inside ? '#000 0 100%, transparent 100%' : 'transparent 0 100%, #000 100%'
      })`;
    return {
      rule: `${F} { ${B(`inset: 0; background: ${pick(1, 1, 2)}; ${mskI(stripeL('180deg', 12.5, 25), disc(false))}`)} ${A(
        `inset: 0; background: @lp(); ${mskI(stripeL('90deg', 12.5, 25), disc(true))}`
      )} }${TR}`,
    };
  },
  { palette: ['#E9F1F7', '#0B2545', '#1F4E79'], grid: '8x12', tg: '8x8', meta: { tags: ['stripes', 'circles', 'lines'], mood: ['bold', 'technical'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

// -- 3. figures around the middle --------------------------------------------

add(
  'Vanishing Point',
  'Square towers seen from straight above, their tops leaning out from the middle of the sheet and their walls lit from one side.',
  (c) => {
    const f = 21;
    const kx = `max(-26, min(26, 24 * @dx / ${RC}))`;
    const ky = `max(-26, min(26, 24 * @dy / ${RC}))`;
    const X0 = `(50 - ${f} + ${kx})`;
    const X1 = `(50 + ${f} + ${kx})`;
    const Y0 = `(50 - ${f} + ${ky})`;
    const Y1 = `(50 + ${f} + ${ky})`;
    const [x0, x1, y0, y1] = [X0, X1, Y0, Y1].map(K);
    // The outer corners are pushed 6% further out along each miter, so the
    // cell's own edge (not the clip) cuts the walls where cells meet.
    const out = (c, i) => K(`${c} + 0.06 * (${c} - ${i})`);
    const tl = `${out(0, X0)}% ${out(0, Y0)}%`;
    const tr = `${out(100, X1)}% ${out(0, Y0)}%`;
    const bl = `${out(0, X0)}% ${out(100, Y1)}%`;
    const br = `${out(100, X1)}% ${out(100, Y1)}%`;
    return {
      rule: `${F} { background: ${ink(c, 3)}; ${B(`inset: 0; background: var(--color1); ${cp(`polygon(${tl}, ${tr}, ${x1}% ${y0}%, ${x0}% ${y0}%, ${x0}% ${y1}%, ${bl})`)}`)} ${A(
        `inset: 0; background: var(--color2); ${cp(`polygon(${br}, ${bl}, ${x0}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y0}%, ${tr})`)}`
      )} }${TR}`,
    };
  },
  { palette: ['#EDE6D6', '#E3B04B', '#7A3B2E', '#2B6F77', '#1F3A5F', '#C8553D'], grid: '4x6', tg: '6x6', meta: { tags: ['squares', 'blocks', 'grid'], mood: ['bold', 'retro'], density: 'dense', goodFor: ['poster', 'packaging'] } }
);

// Square frames shrinking toward the middle, each turned 7 degrees past the last.
const squareRings = (parity) => {
  const pts = [[50, 50]];
  let r = 1.6;
  let k = 0;
  while (r < 80) {
    const rn = r * 1.28;
    if (k % 2 === parity) {
      const rot = 45 + k * 7;
      const ro = (r + (rn - r) * 0.62) * Math.SQRT2;
      const ri = r * Math.SQRT2;
      const outer = [0, 90, 180, 270, 360].map((d) => P(rot + d, ro));
      const inner = [360, 270, 180, 90, 0].map((d) => P(rot + d, ri));
      pts.push(...outer, ...inner, [50, 50]);
    }
    r = rn;
    k++;
  }
  return polyStr(pts);
};
add(
  'Square Tunnel',
  'Square frames shrinking toward the middle of the sheet, each turned a little further than the last, so the tunnel twists as it recedes.',
  () => ({
    host: `--ra: ${squareRings(0)}; --rb: ${squareRings(1)};`,
    rule: `--a: ${pick(1, 3)}; ${F} { overflow: hidden; ${B(`${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: @var(--a); ${cp('@var(--ra)')}`)} ${A(
      `${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: ${pick(2, 4)}; ${cp('@var(--rb)')}`
    )} }${TR}`,
  }),
  { pal: 10, inks: 4, grid: '6x9', tg: '8x8', meta: { tags: ['squares', 'concentric', 'spirals'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

add(
  'Globe',
  'Dots squashed into ellipses toward the rim of a great sphere in the middle of the sheet, with small dots scattered round it.',
  (c) => {
    const q = `min(1, ${fr})`;
    const sc = K(`sqrt(max(0.08, 1 - ${q} * ${q}))`);
    const inside = `(${fr} < 1)`;
    const d = K(`${inside} * 84 + (1 - ${inside}) * 22`);
    return {
      rule: `${F} { ${A(
        `left: 50%; top: 50%; width: ${d}%; height: ${d}%; margin: ${K(`0 - ${d} / 2`)}% 0 0 ${K(`0 - ${d} / 2`)}%; border-radius: 50%; background: ${ink(c)}; transform: rotate(${K(BEARING)}deg) scaleX(${sc});`
      )} }${TR}`,
    };
  },
  { pal: 43, inks: 3, grid: '8x12', tg: '10x10', meta: { tags: ['dots', 'ovals', 'circles'], mood: ['calm', 'technical'], density: 'medium', goodFor: ['poster', 'hero-background'] } }
);

// -- 4. classic illusions ----------------------------------------------------

// Rays from the bottom-left corner crossed with rings from the same corner:
// one ink takes the rays on the rings, the other the gaps between.
add(
  'Polar Fan',
  'Rays and rings thrown out from one corner of the sheet, crossed into a checkerboard that widens as it fans away.',
  () => {
    const spans = (ph) => Array.from({ length: 40 }, (_, j) => [ph + j * 9, ph + j * 9 + 4.5]);
    const box = bigBox(0, 1, '(2 * max(@X, @Y))');
    const rings = (inv) =>
      `repeating-radial-gradient(circle at 50% 50%, ${inv ? 'transparent 0 2.5%, #000 2.5% 5%' : '#000 0 2.5%, transparent 2.5% 5%'})`;
    return {
      host: `--fa: ${polyStr(fanPts(spans(0)))}; --fb: ${polyStr(fanPts(spans(4.5)))};`,
      rule: `${F} { overflow: hidden; ${B(`${box} background: ${pick(1, 1, 3)}; ${cp('@var(--fa)')} ${msk(rings(false))}`)} ${A(
        `${box} background: @lp(); ${cp('@var(--fb)')} ${msk(rings(true))}`
      )} }${TR}`,
    };
  },
  { pal: 7, inks: 3, grid: '6x9', tg: '8x8', meta: { tags: ['radial', 'checkerboard', 'arcs'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

export const sectionC = { title: 'C. Illusion', all };
