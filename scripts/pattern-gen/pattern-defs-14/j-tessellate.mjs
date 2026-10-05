// J. Tessellate - tilings and tile games: truchet sets, Cairo and rhombille tilings, Wang tiles.
import { section, F, TR, cp, msk, mskI, B, A, ink } from './shared.mjs';

const { add, all } = section('J. Tessellate');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const r2 = (n) => {
  const v = Math.round(n * 100) / 100;
  return Object.is(v, -0) ? 0 : v;
};
const inks = (c, from = 1, to = c - 1) => {
  const a = [];
  for (let i = from; i <= to; i++) a.push(`var(--color${i})`);
  return a.join(', ');
};
/** One ink for the whole sheet, chosen again on every reseed. */
const sheetInk = (c, from = 1, to = c - 1) => `@pd(@p(${inks(c, from, to)}))`;

/** The cell's checkerboard parity, 0 or 1, as a css-doodle expression. */
const Q = '((@x + @y) % 2)';
/** 1 in the first column (or row), 0 elsewhere. */
const FIRST_X = 'max(0, 2 - @x)';
const FIRST_Y = 'max(0, 2 - @y)';

/**
 * A number that depends on binary flags, as one @calc: `table` maps each
 * flag combination (a bit string, flag 0 first) to its value, and the result
 * is the multilinear blend, exact at every corner.
 */
const blend = (table, flags) => {
  const n = flags.length;
  const val = (bits) => table[bits.join('')];
  // Moebius transform: coefficient of each subset of flags.
  const terms = [];
  for (let s = 0; s < 1 << n; s++) {
    let coef = 0;
    for (let t = 0; t < 1 << n; t++) {
      if ((t & s) !== t) continue;
      const bits = [];
      for (let i = 0; i < n; i++) bits.push((t >> i) & 1);
      const sign = (popcount(s) - popcount(t)) % 2 === 0 ? 1 : -1;
      coef += sign * val(bits);
    }
    coef = r2(coef);
    if (coef === 0 && s !== 0) continue;
    const factors = [];
    for (let i = 0; i < n; i++) if ((s >> i) & 1) factors.push(flags[i]);
    terms.push({ coef, factors });
  }
  const c0 = terms.find((t) => !t.factors.length)?.coef ?? 0;
  const rest = terms.filter((t) => t.factors.length);
  if (!rest.length) return `${c0}`;
  return `@calc(${c0}${rest.map((t) => `${t.coef < 0 ? ' - ' : ' + '}${Math.abs(t.coef)} * ${t.factors.join(' * ')}`).join('')})`;
};
const popcount = (n) => n.toString(2).replace(/0/g, '').length;

/**
 * A polygon whose points move with binary flags. `variant(bits)` returns the
 * point list (cell units) for one combination; every combination must give
 * the same number of points. `map` turns a cell-unit point into box percent.
 */
const flagPoly = (variant, flags, map) => {
  const combos = [];
  for (let t = 0; t < 1 << flags.length; t++) {
    const bits = [];
    for (let i = 0; i < flags.length; i++) bits.push((t >> i) & 1);
    combos.push([bits.join(''), variant(bits).map(map)]);
  }
  const count = combos[0][1].length;
  const pts = [];
  for (let k = 0; k < count; k++) {
    const xs = {};
    const ys = {};
    for (const [key, list] of combos) {
      if (list.length !== count) throw new Error('flagPoly: point counts differ');
      xs[key] = list[k][0];
      ys[key] = list[k][1];
    }
    pts.push(`${blend(xs, flags)}% ${blend(ys, flags)}%`);
  }
  return `polygon(${pts.join(', ')})`;
};

/** A box `span` cells wide centered on the cell, and cell units mapped into it. */
const spanBox = (span) => {
  const o = ((span - 1) / 2) * 100;
  return `left: ${r2(-o)}%; top: ${r2(-o)}%; width: ${r2(span * 100)}%; height: ${r2(span * 100)}%;`;
};
const inSpan = (span) => ([u, v]) => [((u + (span - 1) / 2) / span) * 100, ((v + (span - 1) / 2) / span) * 100];

/**
 * Several closed outlines as one polygon: each loop is closed back to its
 * first point, joined to the next by a zero-width seam, and the seams are
 * walked back at the end, so the nonzero rule fills the union.
 */
const slit = (...loops) => {
  const pts = [];
  for (const loop of loops) pts.push(...loop, loop[0]);
  for (let i = loops.length - 2; i >= 1; i--) pts.push(loops[i][0]);
  return pts;
};

/** Shrink a convex outline toward its centroid by a fixed inset `g` (cell units). */
const insetPoly = (pts, g) => {
  const n = pts.length;
  const cx = pts.reduce((s, p) => s + p[0], 0) / n;
  const cy = pts.reduce((s, p) => s + p[1], 0) / n;
  // offset every edge inward by g and intersect neighbors
  const lines = pts.map((p, i) => {
    const q = pts[(i + 1) % n];
    let nx = q[1] - p[1];
    let ny = p[0] - q[0];
    const len = Math.hypot(nx, ny);
    nx /= len;
    ny /= len;
    // point the normal at the centroid
    if ((cx - p[0]) * nx + (cy - p[1]) * ny < 0) {
      nx = -nx;
      ny = -ny;
    }
    return { p: [p[0] + nx * g, p[1] + ny * g], d: [q[0] - p[0], q[1] - p[1]] };
  });
  return lines.map((l, i) => {
    const m = lines[(i - 1 + n) % n];
    // intersect m (p + t d) with l
    const det = m.d[0] * l.d[1] - m.d[1] * l.d[0];
    const t = ((l.p[0] - m.p[0]) * l.d[1] - (l.p[1] - m.p[1]) * l.d[0]) / det;
    return [m.p[0] + t * m.d[0], m.p[1] + t * m.d[1]];
  });
};

/** A disc of radius r (fraction of the cell side) about a cell corner, as a mask layer. */
const cornerDisc = (r, at) => `radial-gradient(circle farthest-side at ${at}, #000 ${r}, transparent ${r})`;
const cornerBore = (r, at) => `radial-gradient(circle farthest-side at ${at}, transparent ${r}, #000 ${r})`;

// -- Truchet sets --------------------------------------------------------------

add(
  'Duotone Truchet',
  'Smith truchet tiles filled in two tones, so the quarter arcs close into round blobs and winding channels that run unbroken across the sheet.',
  (c) => ({
    rule: `--k: @p(0, 1); ${F} { ${tf(`rotate(@calc(90 * ((@x + @y + $(k)) % 2))deg)`)} ${B(
      `inset: 0; background: ${sheetInk(c)}; ${msk(cornerDisc('50%', '0 0'), cornerDisc('50%', '100% 100%'))} opacity: @calc(1 - $(k));`
    )} ${A(`inset: 0; background: @lp(); ${mskI(cornerBore('50%', '0 0'), cornerBore('50%', '100% 100%'))} opacity: $(k);`)} }${TR}`,
  }),
  {
    pal: 3,
    inks: 2,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['quarter-circles', 'curves', 'maze'], mood: ['bold', 'playful'], density: 'dense', goodFor: ['poster', 'textile'] },
  }
);

// -- polygon tilings -------------------------------------------------------------

// Cairo: every cell has a short bar through its middle, level on one parity
// and upright on the other, joined to the cell's corners. A pentagon is the
// triangle on one side of a cell edge plus the trapezoid on the other, so
// each cell draws the pentagon across its right edge and the one across its
// bottom edge (and the first column and row the ones across their outer
// edges too).
const CAIRO_S = 0.5486; // the bar length that makes the pentagons equilateral
const cairoBar = (q) =>
  q === 0
    ? [[0.5 - CAIRO_S / 2, 0.5], [0.5 + CAIRO_S / 2, 0.5]]
    : [[0.5, 0.5 - CAIRO_S / 2], [0.5, 0.5 + CAIRO_S / 2]];
/** The pentagon across the right edge of a cell of parity q, in its own units. */
const cairoRight = (q) => {
  if (q === 0) {
    const [, p2] = cairoBar(0);
    const [q1, q2] = cairoBar(1).map(([u, v]) => [u + 1, v]);
    return [p2, [1, 0], q1, q2, [1, 1]];
  }
  const [q1, q2] = cairoBar(1);
  const [p1] = cairoBar(0).map(([u, v]) => [u + 1, v]);
  return [q1, [1, 0], p1, [1, 1], q2];
};
const swapXY = (pts) => pts.map(([u, v]) => [v, u]);
const shift = (pts, du, dv) => pts.map(([u, v]) => [u + du, v + dv]);
/** Across the bottom edge: the right-edge figure mirrored in the diagonal (parity flips the bar). */
const cairoBottom = (q) => swapXY(cairoRight(1 - q));
const CAIRO_G = 0.022;

add(
  'Cairo',
  'The Cairo pentagonal tiling: house-shaped pentagons in pairs, each pair turned a right angle from its neighbors, laid with thin grout lines.',
  (c) => {
    const right = (e) =>
      flagPoly(
        ([q, ex]) => {
          const a = insetPoly(cairoRight(q), CAIRO_G);
          const bRaw = insetPoly(shift(cairoRight(1 - q), -1, 0), CAIRO_G);
          return slit(a, ex ? bRaw : bRaw.map(() => a[0]));
        },
        [Q, e],
        inSpan(3)
      );
    const bottom = (e) =>
      flagPoly(
        ([q, ex]) => {
          const a = insetPoly(cairoBottom(q), CAIRO_G);
          const bRaw = insetPoly(shift(cairoBottom(1 - q), 0, -1), CAIRO_G);
          return slit(a, ex ? bRaw : bRaw.map(() => a[0]));
        },
        [Q, e],
        inSpan(3)
      );
    return {
      rule: `${F} { ${B(`${spanBox(3)} background: ${ink(c)}; ${cp(right(FIRST_X))}`)} ${A(`${spanBox(3)} background: ${ink(c)}; ${cp(bottom(FIRST_Y))}`)} }${TR}`,
    };
  },
  {
    pal: 27,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['mosaic', 'grid'], mood: ['calm', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'textile'] },
  }
);

export const sectionJ = { title: 'J. Tessellate', all };
