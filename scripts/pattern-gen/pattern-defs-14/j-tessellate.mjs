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
const LAST_X = 'max(0, @x - @X + 1)';
const LAST_Y = 'max(0, @y - @Y + 1)';

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


// Pythagorean: a small square on every cell, turned so its sides run 3:4,
// and a big square on every cell corner. The two sizes are the legs of a
// 3-4-5 triangle, which is what lets them close up with no gap.
const PY = { a: 0.8, b: 0.6, c: 0.8, s: 0.6, g: 0.018 };
const turnedSquare = (cx, cy, side) => {
  const h = side / 2;
  return [[-h, -h], [h, -h], [h, h], [-h, h]].map(([u, v]) => [cx + PY.c * u - PY.s * v, cy + PY.s * u + PY.c * v]);
};

add(
  'Pythagorean',
  'The Pythagorean tiling: big and small squares, both turned off the grid, locking together so every small square sits in the notch between four big ones.',
  (c) => {
    const small = flagPoly(() => insetPoly(turnedSquare(0.5, 0.5, PY.b), PY.g), [], inSpan(3));
    // the big squares on the right and bottom corners, and on the sheet's
    // outer corners for the first column and row
    const big = flagPoly(
      ([ex, ey]) => {
        const sqAt = (u, v) => insetPoly(turnedSquare(u, v, PY.a), PY.g);
        const a = sqAt(1, 1);
        const none = (pts) => pts.map(() => a[0]);
        const bl = sqAt(0, 1);
        const tr = sqAt(1, 0);
        const tl = sqAt(0, 0);
        return slit(a, ex ? bl : none(bl), ey ? tr : none(tr), ex && ey ? tl : none(tl));
      },
      [FIRST_X, FIRST_Y],
      inSpan(3)
    );
    return {
      rule: `${F} { ${B(`${spanBox(3)} background: @p(var(--color1), var(--color5)); ${cp(small)}`)} ${A(`${spanBox(3)} background: @p(var(--color2), var(--color3), var(--color4)); ${cp(big)}`)} }${TR}`,
    };
  },
  {
    pal: 2,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['squares', 'mosaic', 'grid'], mood: ['calm', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'textile'] },
  }
);

// Snub square: squares turned 30 degrees one way and the other on the
// checkerboard, with equilateral triangles in pairs between them. Every cell
// edge carries exactly one triangle, so a cell draws its square and the
// triangles across its right and bottom edges.
const SNUB = (() => {
  const d = 1 / (1 + Math.sqrt(3)) * Math.sqrt(2); // half-diagonal of the square
  const sq = (cx, cy, q) => {
    const th = ((q ? -30 : 30) * Math.PI) / 180;
    return [45, 135, 225, 315].map((a) => {
      const t = (a * Math.PI) / 180 + th;
      return [cx + d * Math.cos(t), cy + d * Math.sin(t)];
    });
  };
  /** The rhombus round vertex (vx, vy): the four square corners on the cell edges meeting there, split in two. */
  const rhombusTris = (vx, vy, q) => {
    const cells = [[vx - 0.5, vy - 0.5], [vx + 0.5, vy - 0.5], [vx + 0.5, vy + 0.5], [vx - 0.5, vy + 0.5]];
    const vs = [];
    for (const [cx, cy] of cells) {
      for (const v of sq(cx, cy, (q + Math.round(cx + cy) + 4) % 2)) {
        const onEdge = Math.abs(v[0] - vx) < 1e-9 || Math.abs(v[1] - vy) < 1e-9;
        if (onEdge && !vs.some((w) => Math.hypot(w[0] - v[0], w[1] - v[1]) < 1e-9)) vs.push(v);
      }
    }
    if (vs.length !== 4) throw new Error(`snub: ${vs.length} rhombus corners`);
    vs.sort((a, b) => Math.atan2(a[1] - vy, a[0] - vx) - Math.atan2(b[1] - vy, b[0] - vx));
    const d02 = Math.hypot(vs[0][0] - vs[2][0], vs[0][1] - vs[2][1]);
    const d13 = Math.hypot(vs[1][0] - vs[3][0], vs[1][1] - vs[3][1]);
    return d02 < d13 ? [[vs[0], vs[1], vs[2]], [vs[0], vs[2], vs[3]]] : [[vs[1], vs[2], vs[3]], [vs[1], vs[3], vs[0]]];
  };
  const cent = (t) => [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3];
  /** The triangle straddling the cell edge whose midpoint is m (cell centered at 0, 0). */
  const across = (m, q) => {
    const cands = [];
    for (const vx of [-0.5, 0.5]) for (const vy of [-0.5, 0.5]) cands.push(...rhombusTris(vx, vy, q));
    return cands.reduce((b, t) => {
      const cb = cent(b);
      const ct = cent(t);
      return Math.hypot(ct[0] - m[0], ct[1] - m[1]) < Math.hypot(cb[0] - m[0], cb[1] - m[1]) ? t : b;
    });
  };
  const toCell = (pts) => pts.map(([u, v]) => [u + 0.5, v + 0.5]);
  return {
    square: (q) => toCell(sq(0, 0, q)),
    right: (q) => toCell(across([0.5, 0], q)),
    bottom: (q) => toCell(across([0, 0.5], q)),
    left: (q) => toCell(across([-0.5, 0], q)),
    top: (q) => toCell(across([0, -0.5], q)),
  };
})();

add(
  'Snub Square',
  'The snub square tiling: squares tipped alternately left and right, with pairs of equilateral triangles filling the gaps between them.',
  (c) => {
    const g = 0.018;
    const square = flagPoly(([q]) => insetPoly(SNUB.square(q), g), [Q], inSpan(3));
    const tris = flagPoly(
      ([q, ex, ey]) => {
        const r = insetPoly(SNUB.right(q), g);
        const b = insetPoly(SNUB.bottom(q), g);
        const l = insetPoly(SNUB.left(q), g);
        const t = insetPoly(SNUB.top(q), g);
        return slit(r, b, ex ? l : l.map(() => r[0]), ey ? t : t.map(() => r[0]));
      },
      [Q, FIRST_X, FIRST_Y],
      inSpan(3)
    );
    return {
      rule: `${F} { ${B(`${spanBox(3)} background: @p(var(--color1), var(--color2)); ${cp(square)}`)} ${A(`${spanBox(3)} background: @p(var(--color3), var(--color4), var(--color5)); ${cp(tris)}`)} }${TR}`,
    };
  },
  {
    pal: 10,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['squares', 'triangles', 'mosaic'], mood: ['elegant', 'bold'], density: 'dense', goodFor: ['wallpaper', 'poster'] },
  }
);

// -- tile games ------------------------------------------------------------------

// A hash of an edge's place in the sheet, 0 or 1, the same whichever of its
// two cells asks. `s` is a per-sheet number rolled once (@pd caches the
// first roll), so a reseed recuts the whole puzzle.
const hash01 = (xe, ye, a, b, k) =>
  `floor(2 * ((sin(${xe} * ${a} + ${ye} * ${b} + $(s) * ${k}) * 43758.5453) - floor(sin(${xe} * ${a} + ${ye} * ${b} + $(s) * ${k}) * 43758.5453)))`;
const SEED = '--s: @pd(@r(0, 50));';

// Jigsaw: each piece's four edges carry a knob that points out or in by the
// hash of that edge, so neighbors always fit. The sixteen outlines are worked
// out here and parked on the host; a cell picks its own by number.
const JIG = (() => {
  const g = 0.024;
  const bez = (p0, p1, p2, p3, n) =>
    Array.from({ length: n }, (_, i) => {
      const t = (i + 1) / n;
      const m = 1 - t;
      return [
        m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0],
        m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1],
      ];
    });
  // the cut line of a top edge with its knob out (toward -v)
  const half = [
    [0.36, 0],
    ...bez([0.36, 0], [0.43, 0], [0.465, -0.025], [0.445, -0.07], 4),
    ...bez([0.445, -0.07], [0.41, -0.13], [0.37, -0.25], [0.5, -0.25], 7),
  ];
  const cut = [[0, 0], ...half, ...half.slice(0, -1).reverse().map(([u, v]) => [1 - u, v]), [1, 0]];
  const edge = (out) => {
    const pts = out ? cut : cut.map(([u, v]) => [u, -v]);
    // offset toward the piece (+v side of travel) by g / 2
    const off = pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)];
      const b = pts[Math.min(pts.length - 1, i + 1)];
      const tx = b[0] - a[0];
      const ty = b[1] - a[1];
      const len = Math.hypot(tx, ty);
      return [p[0] - (ty / len) * (g / 2), p[1] + (tx / len) * (g / 2)];
    });
    off[0] = [g / 2, g / 2];
    off[off.length - 1] = [1 - g / 2, g / 2];
    return off.slice(0, -1);
  };
  const frames = [
    ([u, v]) => [u, v],
    ([u, v]) => [1 - v, u],
    ([u, v]) => [1 - u, 1 - v],
    ([u, v]) => [v, 1 - u],
  ];
  const piece = (k) => {
    const outs = [k & 1, (k >> 3) & 1, (k >> 2) & 1, (k >> 1) & 1]; // top, right, bottom, left
    return frames.flatMap((fr, i) => edge(outs[i]).map(fr));
  };
  const host = Array.from({ length: 16 }, (_, k) => `--j${k}: ${flagPoly(() => piece(k), [], inSpan(1.6))};`).join(' ');
  const pickRule = `@match(${Array.from({ length: 15 }, (_, k) => `$(k) == ${k}, @var(--j${k})`).join(', ')}, @var(--j15))`;
  return { host, pickRule };
})();

add(
  'Jigsaw',
  'Jigsaw puzzle pieces in mixed colors, each edge cut with a round knob that pokes out of one piece and into its neighbor, so the whole sheet fits together.',
  (c) => {
    const H = (xe, ye) => hash01(xe, ye, 12.9898, 78.233, 1);
    const G = (xe, ye) => hash01(xe, ye, 39.3467, 11.1351, 1.7);
    return {
      host: JIG.host,
      rule: `${SEED} --k: @calc(8 * max(${LAST_X}, ${H('@x', '@y')}) + 4 * max(${LAST_Y}, ${G('@x', '@y')}) + 2 * max(${FIRST_X}, 1 - ${H('(@x - 1)', '@y')}) + max(${FIRST_Y}, 1 - ${G('@x', '(@y - 1)')})); ${F} { ${B(`${spanBox(1.6)} background: ${ink(c)}; ${cp(JIG.pickRule)}`)} }${TR}`,
    };
  },
  {
    pal: 24,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['blocks', 'curves', 'mosaic', 'grid'], mood: ['playful'], density: 'dense', goodFor: ['wallpaper', 'packaging'] },
  }
);

export const sectionJ = { title: 'J. Tessellate', all };
