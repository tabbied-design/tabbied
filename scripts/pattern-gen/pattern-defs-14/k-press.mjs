// K. Press - signal and data: an instrument trace and a chart.
//
// The marks of instruments and charts, turned into repeats. Nothing here is
// a reading: the beats and the slices are rolled at random. Long curves (the
// ECG beats) are polygons computed here and set once on the host; `stroke`
// turns a polyline into the band that draws it.
//
//   instruments        Cardiograph
//   charts             Pie Chart
import { section, F, TR, cp, msk, B, A } from './shared.mjs';

const { add, all } = section('K. Press');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const pct = (n) => `${+n.toFixed(2)}%`;
const P = (pts) => `polygon(${pts.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(', ')})`;

/**
 * A polyline (or closed curve) drawn as a band `w` wide, returned as one
 * polygon: the left offset forward, then the right offset back. Joins are
 * mitered, and beveled on the outside of a turn too sharp to miter. A closed
 * band crosses itself where the curve does; every stretch of band winds the
 * same way, so the crossings fill under the default nonzero rule.
 */
const stroke = (pts, w, closed = false) => {
  const n = pts.length;
  const h = w / 2;
  const seg = (i) => {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % n];
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    return [(y0 - y1) / len, (x1 - x0) / len]; // left normal, y down
  };
  const left = [];
  const right = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const hasPrev = closed || i > 0;
    const hasNext = closed || i < n - 1;
    const nPrev = hasPrev ? seg((i - 1 + n) % n) : null;
    const nNext = hasNext ? seg(i) : null;
    if (!nPrev || !nNext) {
      const m = nPrev || nNext;
      left.push([p[0] + m[0] * h, p[1] + m[1] * h]);
      right.push([p[0] - m[0] * h, p[1] - m[1] * h]);
      continue;
    }
    let mx = nPrev[0] + nNext[0];
    let my = nPrev[1] + nNext[1];
    const ml = Math.hypot(mx, my) || 1;
    mx /= ml;
    my /= ml;
    const cos = mx * nPrev[0] + my * nPrev[1];
    const len = h / Math.max(cos, 0.05);
    // which side is the outside of the turn: the left when it turns right
    const turn = nPrev[0] * nNext[1] - nPrev[1] * nNext[0];
    if (len > h * 2.2) {
      const outerLeft = turn < 0;
      const miter = (sgn) => [p[0] + sgn * mx * len, p[1] + sgn * my * len];
      const bevel = (sgn) => [
        [p[0] + sgn * nPrev[0] * h, p[1] + sgn * nPrev[1] * h],
        [p[0] + sgn * nNext[0] * h, p[1] + sgn * nNext[1] * h],
      ];
      if (outerLeft) {
        left.push(...bevel(1));
        right.push(miter(-1));
      } else {
        left.push(miter(1));
        right.push(...bevel(-1).reverse());
      }
    } else {
      left.push([p[0] + mx * len, p[1] + my * len]);
      right.push([p[0] - mx * len, p[1] - my * len]);
    }
  }
  if (closed) return [...left, left[0], right[0], ...right.slice(1).reverse(), right[0]];
  return [...left, ...right.reverse()];
};
// -- K20 Cardiograph --------------------------------------------------------------
// Heartbeats traced on ECG paper. The trace runs a fifth of a cell past both
// sides along the baseline, so a beat shifted a little still meets its
// neighbors; the grid is the paper's own small and large squares.
const BEATS = [
  [[-20, 60], [8, 60], [12, 57], [16, 55], [20, 57], [24, 60], [32, 60], [35, 64], [39, 20], [43, 72], [46, 60], [54, 60], [59, 56], [65, 52], [71, 56], [76, 60], [120, 60]],
  [[-20, 60], [8, 60], [12, 56], [16, 54], [20, 56], [24, 60], [33, 60], [36, 66], [40, 8], [44, 80], [47, 60], [55, 60], [60, 55], [66, 50], [72, 55], [77, 60], [120, 60]],
  [[-20, 60], [10, 60], [14, 57], [18, 55], [22, 57], [26, 60], [34, 60], [37, 64], [41, 26], [45, 70], [48, 60], [56, 60], [61, 64], [67, 67], [73, 64], [78, 60], [120, 60]],
  [[-20, 60], [16, 60], [24, 36], [33, 84], [42, 52], [50, 60], [62, 60], [68, 54], [74, 52], [80, 56], [86, 60], [120, 60]],
];
const beatPoly = (pts) =>
  P(stroke(pts, 3.2).map(([x, y]) => [((x + 20) / 140) * 100, y]));
const ECG_GRID = [
  'repeating-linear-gradient(90deg, #000 0 1.2%, transparent 1.2% 20%)',
  'repeating-linear-gradient(180deg, #000 0 1.2%, transparent 1.2% 20%)',
  'linear-gradient(90deg, #000 0 2.6%, transparent 2.6%)',
  'linear-gradient(180deg, #000 0 2.6%, transparent 2.6%)',
].join(', ');

add(
  'Cardiograph',
  'Heartbeat traces on pink ECG paper, row after row of sharp spikes and soft bumps running over a grid of small and large squares.',
  (c) => ({
    host: BEATS.map((b, i) => `--b${i}: ${beatPoly(b)};`).join(' ') + ` --grid: ${ECG_GRID};`,
    rule: `${F} { ${B(`inset: 0; background: @p(var(--color2)); opacity: 0.55; ${msk('@var(--grid)')}`)} ${A(`left: -20%; width: 140%; top: 0; height: 100%; background: @p(var(--color1)); ${cp('@p(@var(--b0), @var(--b0), @var(--b1), @var(--b2), @var(--b3))')} ${tf('translateX(@r(-4%, 4%))')}`)} }${TR}`,
  }),
  {
    palette: ['#FBEFEA', '#1E1B24', '#E0827A'],
    grid: '5x8',
    tg: '5x5',
    meta: { tags: ['lines', 'zigzags', 'grid'], mood: ['technical', 'calm'], density: 'medium', goodFor: ['section-divider', 'hero-background', 'card-texture'] },
  }
);

// -- K23 Pie Chart ----------------------------------------------------------------
// The pie is a disc painted as a gradient on the cell, and two slices laid
// over it, each a round box cut by a sector. Slice angles come in steps of
// ten degrees, so every sector (40 to 300 degrees) is a polygon set once on
// the host, fanned out past the rim (five points on a circle well outside it,
// so every chord clears the edge); a cell names its two and turns the whole
// pie. A donut's hole is bored through the disc and both slices alike.
const PIE_HOST = Array.from({ length: 27 }, (_, i) => {
  const deg = 40 + 10 * i;
  const pts = [0, 1, 2, 3, 4].map((k) => {
    const t = ((deg * k) / 4) * (Math.PI / 180);
    return [50 + 75 * Math.sin(t), 50 - 75 * Math.cos(t)];
  });
  return `--s${deg}: ${P([[50, 50], ...pts])};`;
}).join(' ') + ' --hole0: none; --hole1: radial-gradient(circle closest-side, transparent 50%, #000 50%);';

add(
  'Pie Chart',
  'A sheet of pie and donut charts, each split into three slices in the same three inks at its own proportions and turned to its own angle.',
  (c) => ({
    host: PIE_HOST,
    rule: `${F} { --a1: @p(4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15); --a2: @p(6, 7, 8, 9, 10, 11, 12, 13, 14, 15); --d: @p(0, 1); background: radial-gradient(circle closest-side, transparent $(d * 44)%, @p(var(--color3)) $(d * 44)% 84.6%, transparent 84.6%); ${tf('rotate(@ri(0, 359)deg)')} ${B(`inset: 7%; border-radius: 50%; background: @p(var(--color2)); ${cp('@var(--s$(10 * (a1 + a2)))')} ${msk('@var(--hole$(d))')}`)} ${A(`inset: 7%; border-radius: 50%; background: @p(var(--color1)); ${cp('@var(--s$(10 * a1))')} ${msk('@var(--hole$(d))')}`)} }${TR}`,
  }),
  {
    palette: ['#F4EFE4', '#E4572E', '#29335C', '#76B5A8'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'radial', 'rings'], mood: ['technical', 'playful'], density: 'medium', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);

export const sectionK = { title: 'K. Press', all };
