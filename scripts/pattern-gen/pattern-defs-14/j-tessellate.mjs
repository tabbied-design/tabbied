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

/**
 * A mask layer that shows nothing. A mask list whose every layer is `none`
 * means no mask at all, so a list of optional layers always carries one.
 */
const EMPTY = 'linear-gradient(transparent, transparent)';

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


/** A polygon string from cell-unit points, mapped into a box `span` cells wide. */
const polyIn = (span, pts) => flagPoly(() => pts, [], inSpan(span));
/** A band of half-width hw along a straight segment, as a quad. */
const segQuad = (p, q, hw) => {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * hw;
  const ny = (dx / len) * hw;
  return [[p[0] + nx, p[1] + ny], [q[0] + nx, q[1] + ny], [q[0] - nx, q[1] - ny], [p[0] - nx, p[1] - ny]];
};
/** An annular sector about (cx, cy), radius r +- hw, from angle a0 to a1 (radians). */
const arcBand = (cx, cy, r, hw, a0, a1, n = 12) => {
  const outer = [];
  const inner = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    outer.push([cx + (r + hw) * Math.cos(a), cy + (r + hw) * Math.sin(a)]);
    inner.push([cx + (r - hw) * Math.cos(a), cy + (r - hw) * Math.sin(a)]);
  }
  return [...outer, ...inner.reverse()];
};
/** Pick one of several host properties by a per-cell number. */
const pickVar = (num, names) =>
  `@match(${names.slice(0, -1).map((n, i) => `${num} == ${i}, @var(${n})`).join(', ')}, @var(${names[names.length - 1]}))`;

// Knotwork: a plait of diagonal strands crossing at every cell middle and
// every cell corner, over and under in turn. A strand meeting a corner of the
// cell from the top left or bottom right goes under there on one parity of
// the checkerboard, from the other two corners on the other parity, and the
// crossing in the middle is the opposite way round; that keeps the over and
// under alternating along every strand. Some cells break the crossing into
// two arcs that turn the strands back, which is what ties the plait into knots.
const KNOT = (() => {
  const hw = 0.085;
  const gap = hw + 0.05;
  const R = Math.SQRT1_2;
  const L = Math.SQRT2;
  const along = (p, q, s) => [p[0] + ((q[0] - p[0]) * s) / L, p[1] + ((q[1] - p[1]) * s) / L];
  const corners = { TL: [0, 0], TR: [1, 0], BR: [1, 1], BL: [0, 1] };
  // does a strand end at this corner go under, for a cell of parity q
  const under = (corner, q) => (corner === 'TL' || corner === 'BR' ? q === 1 : q === 0);
  /** A straight diagonal from corner a to corner b, gapped at the ends and maybe the middle. */
  const diag = (a, b, q, midGap) => {
    const p = corners[a];
    const r = corners[b];
    const s0 = under(a, q) ? gap : 0;
    const s1 = L - (under(b, q) ? gap : 0);
    const pieces = midGap
      ? [segQuad(along(p, r, s0), along(p, r, L / 2 - gap), hw), segQuad(along(p, r, L / 2 + gap), along(p, r, s1), hw)]
      : [segQuad(along(p, r, s0), along(p, r, s1), hw)];
    return slit(...pieces);
  };
  /** An arc about (cx, cy) from corner a to corner b, gapped where it goes under. */
  const arc = (cx, cy, a, b, q) => {
    const ang = (c) => Math.atan2(corners[c][1] - cy, corners[c][0] - cx);
    let a0 = ang(a);
    let a1 = ang(b);
    if (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
    if (a0 - a1 > Math.PI) a1 += 2 * Math.PI;
    const dir = Math.sign(a1 - a0);
    if (under(a, q)) a0 += (dir * gap) / R;
    if (under(b, q)) a1 -= (dir * gap) / R;
    return arcBand(cx, cy, R, hw, a0, a1);
  };
  const host = [];
  const before = [];
  const after = [];
  for (const q of [0, 1]) {
    const shapes = [
      [diag('TL', 'BR', q, q === 0), diag('TR', 'BL', q, q === 1)],
      [arc(-0.5, 0.5, 'TL', 'BL', q), arc(1.5, 0.5, 'TR', 'BR', q)],
      [arc(0.5, -0.5, 'TL', 'TR', q), arc(0.5, 1.5, 'BL', 'BR', q)],
    ];
    shapes.forEach(([b, a], t) => {
      host.push(`--kb${q}${t}: ${polyIn(1.5, b)};`, `--ka${q}${t}: ${polyIn(1.5, a)};`);
      before.push(`--kb${q}${t}`);
      after.push(`--ka${q}${t}`);
    });
  }
  return { host: host.join(' '), before, after };
})();

add(
  'Knotwork',
  'A plait of diagonal bands passing over and under one another, broken here and there into arcs that turn back, so the strands tie up into knots.',
  (c) => {
    const key = `@calc(3 * ${Q} + $(t))`;
    return {
      host: KNOT.host,
      rule: `--t: @p(0, 0, 0, 1, 2); --kk: ${key}; --ink: ${sheetInk(c)}; ${F} { ${B(`${spanBox(1.5)} background: @p(@var(--ink)); ${cp(pickVar('$(kk)', KNOT.before))}`)} ${A(`${spanBox(1.5)} background: @p(@var(--ink)); ${cp(pickVar('$(kk)', KNOT.after))}`)} }${TR}`,
    };
  },
  {
    pal: 16,
    inks: 2,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['braids', 'diagonals', 'curves', 'lattice'], mood: ['elegant', 'organic'], density: 'medium', goodFor: ['textile', 'wallpaper'] },
  }
);

// Racetrack: Smith tiles drawn as roads, a broad band on each quarter arc
// with a lane line down each edge and one down the middle. The lines sit
// symmetrically about the arc, so they meet their neighbors' lines whichever
// way the next tile turns.
const ringFS = (at, a, b) => `radial-gradient(circle farthest-side at ${at}, transparent ${a}%, #000 ${a}% ${b}%, transparent ${b}%)`;
add(
  'Racetrack',
  'Winding roads made of quarter turns, each a dark band with pale lane lines at its edges and down its middle, looping and meandering across the sheet.',
  (c) => {
    const road = (at) => ringFS(at, 26, 74);
    const lines = (at) => [ringFS(at, 30.5, 33.5), ringFS(at, 48.5, 51.5), ringFS(at, 66.5, 69.5)];
    return {
      rule: `--road: ${sheetInk(c, 1, 2)}; --line: ${sheetInk(c, 3, 4)}; ${F} { ${tf(`rotate(${'@p(0deg, 90deg)'})`)} ${B(`inset: 0; background: @p(@var(--road)); ${msk(road('0 0'), road('100% 100%'))}`)} ${A(`inset: 0; background: @p(@var(--line)); ${msk(...lines('0 0'), ...lines('100% 100%'))}`)} }${TR}`,
    };
  },
  {
    palette: ['#C9D6B8', '#2F3437', '#3D3A4B', '#F4D35E', '#F7F4EA'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['curves', 'arcs', 'lines', 'maze'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['packaging', 'wallpaper'] },
  }
);

// Pixel Maze: the 10 PRINT maze in blocky pixels, a two-pixel staircase
// running corner to corner, either way up, cut off at the cell edge so it
// meets the next staircase at the corner.
const PIX = (() => {
  const n = 6;
  const pts = [];
  // upper outline, left to right: row r spans x in [(n-1-r)/n, (n+1-r)/n], clipped
  for (let r = n - 1; r >= 0; r--) {
    const x0 = (n - 1 - r) / n;
    pts.push([x0, (r + 1) / n], [x0, r / n]);
  }
  pts.push([1, 0]);
  const lower = [];
  for (let r = 0; r < n; r++) {
    const x1 = Math.min(1, (n + 1 - r) / n);
    lower.push([x1, r / n], [x1, (r + 1) / n]);
  }
  return [...pts, ...lower.slice(1)];
})();
add(
  'Pixel Maze',
  'The ten print maze in chunky pixels: stepped diagonal strokes, one per cell, leaning either way and joining at the corners into a blocky labyrinth.',
  (c) => ({
    rule: `${F} { ${tf('rotate(@p(0deg, 90deg))')} background: @p(var(--color1), var(--color1), var(--color2)); ${cp(polyIn(1, PIX))} }${TR}`,
  }),
  {
    palette: ['#2E2A6B', '#8C82E6', '#B9B2F5'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['maze', 'steps', 'diagonals'], mood: ['retro', 'technical'], density: 'medium', goodFor: ['wallpaper', 'card-texture'] },
  }
);

// Euler Square: two orthogonal Latin squares of order five laid over each
// other, one choosing the shape and one the ink, so in any five by five
// block every shape meets every ink exactly once. The outlines all have 24
// points, so a reseed (which shifts both squares) morphs one into another.
const EULER = (() => {
  const N = 24;
  const ring = (fn) => Array.from({ length: N }, (_, i) => fn(i / N));
  const along = (verts, t) => {
    // a point at fraction t round the closed outline `verts`
    const segs = verts.map((v, i) => [v, verts[(i + 1) % verts.length]]);
    const lens = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
    const total = lens.reduce((x, y) => x + y, 0);
    let d = t * total;
    for (let i = 0; i < segs.length; i++) {
      if (d <= lens[i] || i === segs.length - 1) {
        const f = lens[i] ? d / lens[i] : 0;
        return [segs[i][0][0] + (segs[i][1][0] - segs[i][0][0]) * f, segs[i][0][1] + (segs[i][1][1] - segs[i][0][1]) * f];
      }
      d -= lens[i];
    }
  };
  const poly = (verts) => ring((t) => along(verts, t));
  const circle = ring((t) => [0.5 + 0.34 * Math.sin(2 * Math.PI * t), 0.5 - 0.34 * Math.cos(2 * Math.PI * t)]);
  const square = poly([[0.5, 0.2], [0.8, 0.2], [0.8, 0.8], [0.2, 0.8], [0.2, 0.2]]);
  const tri = poly([[0.5, 0.14], [0.86, 0.8], [0.14, 0.8]]);
  const diamond = poly([[0.5, 0.12], [0.88, 0.5], [0.5, 0.88], [0.12, 0.5]]);
  const k = 0.12;
  const plus = poly([[0.5 - k, 0.14], [0.5 + k, 0.14], [0.5 + k, 0.5 - k], [0.86, 0.5 - k], [0.86, 0.5 + k], [0.5 + k, 0.5 + k], [0.5 + k, 0.86], [0.5 - k, 0.86], [0.5 - k, 0.5 + k], [0.14, 0.5 + k], [0.14, 0.5 - k], [0.5 - k, 0.5 - k]]);
  const shapes = [circle, square, tri, diamond, plus];
  return {
    host: shapes.map((sh, i) => `--e${i}: ${polyIn(1, sh)};`).join(' '),
    names: shapes.map((_, i) => `--e${i}`),
  };
})();
add(
  'Euler Square',
  'Circles, squares, triangles, diamonds and crosses in five inks, arranged as a Graeco-Latin square so every shape meets every color once in each five by five block.',
  () => ({
    host: EULER.host,
    rule: `--a: @pd(@ri(0, 4)); --b: @pd(@ri(0, 4)); --sh: @calc(0 + (@x + @y + $(a)) % 5); --ik: @calc(0 + (@x + 2 * @y + $(b)) % 5); ${F} { background: @match(${[0, 1, 2, 3]
      .map((i) => `$(ik) == ${i}, @p(var(--color${i + 1}))`)
      .join(', ')}, @p(var(--color5))); ${cp(pickVar('$(sh)', EULER.names))} }${TR}`,
  }),
  {
    pal: 1,
    grid: '5x5',
    tg: '5x5',
    meta: { tags: ['circles', 'squares', 'triangles', 'diamonds', 'crosses', 'grid'], mood: ['playful', 'technical'], density: 'medium', goodFor: ['poster', 'packaging'] },
  }
);

// Fibonacci Grid: columns and rows cut long and short in the order of the
// Fibonacci word (a Sturmian sequence, which never repeats), so the
// rectangles come in four sizes laid out quasi-periodically. Each cell draws
// the rectangle of its own column and row, wherever the sequence has carried
// it; the long and short sides average a little over one cell, so the last
// rectangles always reach the sheet edge. Inks follow the four sizes.
const FIB = (() => {
  const alpha = 0.6180339887;
  const avg = 1.15;
  const S = avg / (1 + alpha * (1.6180339887 - 1));
  const Lg = 1.6180339887 * S;
  const D = Lg - S;
  const pos = (n, r) => `(${n} * ${r2(S * 1000) / 1000} + ${r2(D * 1000) / 1000} * floor(${n} * ${alpha} + $(${r})))`;
  const wide = (n, r) => `(floor((${n} + 1) * ${alpha} + $(${r})) - floor(${n} * ${alpha} + $(${r})))`;
  return { pos, wide, S: r2(S * 1000) / 1000, D: r2(D * 1000) / 1000 };
})();
add(
  'Fibonacci Grid',
  'Rectangles in four sizes on a black ground, their columns and rows cut long and short in the never-repeating order of the Fibonacci word, the smallest in primary colors.',
  () => {
    const g = 3.2;
    const nx = '(@x - 1)';
    const ny = '(@y - 1)';
    return {
      rule: `--rx: @pd(@r(0, 1)); --ry: @pd(@r(0, 1)); --w: @calc(0 + ${FIB.wide(nx, 'rx')}); --h: @calc(0 + ${FIB.wide(ny, 'ry')}); ${F} { ${B(
        `left: @calc(100 * ${FIB.pos(nx, 'rx')} - 100 * ${nx} + ${g})%; top: @calc(100 * ${FIB.pos(ny, 'ry')} - 100 * ${ny} + ${g})%; width: @calc(100 * ${FIB.S} + 100 * ${FIB.D} * $(w) - ${2 * g})%; height: @calc(100 * ${FIB.S} + 100 * ${FIB.D} * $(h) - ${2 * g})%; background: @match($(w) + 2 * $(h) == 3, @p(var(--color1)), $(w) + 2 * $(h) == 2, @p(var(--color1), var(--color1), var(--color3)), $(w) + 2 * $(h) == 1, @p(var(--color1), var(--color4)), @p(var(--color2), var(--color4), var(--color3)));`
      )} }${TR}`,
    };
  },
  {
    palette: ['#161616', '#F1EDE3', '#D3262A', '#F3C613', '#1F4C9C'],
    grid: '8x12',
    tg: '8x8',
    meta: { tags: ['squares', 'blocks', 'grid', 'mosaic'], mood: ['bold', 'retro'], density: 'dense', goodFor: ['poster', 'wallpaper'] },
  }
);

// Pentomino: the twelve pentominoes packed into a six by ten rectangle (a
// solution found by search), repeated across the sheet. A cell looks itself
// up in the packing, and the table also says which of its four sides face a
// different piece; those sides are inset to open the grout. A reseed slides
// the window across the packing and re-deals the inks.
const PENTO = (() => {
  const sol = [
    [0, 1, 1, 1, 1, 1, 2, 7, 7, 7],
    [0, 0, 0, 2, 2, 2, 2, 11, 11, 7],
    [10, 0, 3, 3, 3, 6, 6, 6, 11, 7],
    [10, 3, 3, 8, 5, 6, 9, 6, 11, 11],
    [10, 10, 8, 8, 5, 9, 9, 9, 4, 4],
    [10, 8, 8, 5, 5, 5, 9, 4, 4, 4],
  ];
  const at = (x, y) => (x < 0 || x > 9 || y < 0 || y > 5 ? -1 : sol[y][x]);
  const entries = [];
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 10; x++) {
      const id = sol[y][x];
      const t = at(x, y - 1) !== id ? 1 : 0;
      const r = at(x + 1, y) !== id ? 1 : 0;
      const b = at(x, y + 1) !== id ? 1 : 0;
      const l = at(x - 1, y) !== id ? 1 : 0;
      entries.push(id * 16 + t * 8 + r * 4 + b * 2 + l);
    }
  }
  return `@match(${entries.slice(0, -1).map((v, i) => `$(pk) == ${i}, ${v}`).join(', ')}, ${entries[entries.length - 1]})`;
})();
add(
  'Pentomino',
  'All twelve pentominoes packed into a rectangle and repeated edge to edge, each piece a solid block of one ink with grout lines between pieces.',
  () => {
    const g = 4;
    const bit = (k) => `@calc(${g} * (floor($(pv) / ${k}) % 2))%`;
    const rad = (k1, k2) => `@calc(18 * (floor($(pv) / ${k1}) % 2) * (floor($(pv) / ${k2}) % 2))%`;
    return {
      rule: `--ox: @pd(@ri(0, 9)); --oy: @pd(@ri(0, 5)); --co: @pd(@ri(0, 3)); --pk: @calc(0 + (@x - 1 + $(ox)) % 10 + 10 * ((@y - 1 + $(oy)) % 6)); --pv: ${PENTO}; --pid: @calc(floor($(pv) / 16)); ${F} { background: @match(${[0, 1, 2, 3]
        .slice(0, 3)
        .map((i) => `($(pid) + $(co)) % 4 == ${i}, @p(var(--color${i + 1}))`)
        .join(', ')}, @p(var(--color4))); ${cp(`inset(${bit(8)} ${bit(4)} ${bit(2)} ${bit(1)} round ${rad(8, 1)} ${rad(8, 4)} ${rad(2, 4)} ${rad(2, 1)})`)} }${TR}`,
    };
  },
  {
    pal: 22,
    inks: 4,
    grid: '10x15',
    tg: '10x10',
    meta: { tags: ['blocks', 'squares', 'mosaic', 'grid'], mood: ['playful', 'retro'], density: 'dense', goodFor: ['packaging', 'wallpaper'] },
  }
);


add(
  'Neon Truchet',
  'Smith truchet arcs drawn as neon tubes: a bright white core inside a soft colored glow, the loops winding unbroken across a dark sheet.',
  (c) => {
    const glow = (at) => `radial-gradient(circle farthest-side at ${at}, transparent 24%, #000 50%, transparent 76%)`;
    return {
      rule: `--glow: ${sheetInk(c, 2)}; ${F} { ${tf('rotate(@p(0deg, 90deg))')} ${B(`inset: 0; background: @p(@var(--glow)); opacity: 0.62; ${msk(glow('0 0'), glow('100% 100%'))}`)} ${A(
        `inset: 0; background: @p(var(--color1)); ${msk(ringFS('0 0', 46.5, 53.5), ringFS('100% 100%', 46.5, 53.5))}`
      )} }${TR}`,
    };
  },
  {
    palette: ['#120B26', '#FFF2FA', '#FF3FA4', '#3FE0FF', '#B46BFF', '#FFC94A'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['curves', 'arcs', 'gradients', 'maze'], mood: ['bold', 'retro'], density: 'medium', goodFor: ['poster', 'og-image'] },
  }
);

// Hex Truchet: hexagons on offset rows (stretched to sit on square cells,
// all six sides kept equal), each holding three arcs round alternate corners.
// The arcs meet the midpoints of the sides, so every arc runs on into the
// next hexagon; a hexagon turned half round swaps to the other three corners.
const HEX = (() => {
  const t = 0.1875;
  const hex = [[0.5, -t], [1, t], [1, 1 - t], [0.5, 1 + t], [0, 1 - t], [0, t]];
  const r = 0.3125;
  const hw = 0.06;
  const map = inSpan(1.5);
  const ring = ([u, v]) => {
    const [bx, by] = map([u, v]);
    return `radial-gradient(ellipse 33.33% 33.33% at ${r2(bx)}% ${r2(by)}%, transparent ${r2(((r - hw) / 0.5) * 100)}%, #000 ${r2(((r - hw) / 0.5) * 100)}% ${r2(((r + hw) / 0.5) * 100)}%, transparent ${r2(((r + hw) / 0.5) * 100)}%)`;
  };
  return { clip: polyIn(1.5, hex), rings: [hex[0], hex[2], hex[4]].map(ring) };
})();
add(
  'Hex Truchet',
  'Hexagonal truchet tiles: three arcs in every hexagon, each joining two neighboring sides, so the arcs link into long meandering loops with no ends.',
  (c) => {
    const tile = `${HEX.rings.length ? msk(...HEX.rings) : ''} ${cp(HEX.clip)} ${tf('rotate(@p(0deg, 180deg))')}`;
    return {
      rule: `${F} { ${tf('translateX(@calc(50 - 50 * (@y % 2))%)')} ${B(`${spanBox(1.5)} background: ${ink(c)}; ${tile}`)} ${A(
        `left: -125%; top: -25%; width: 150%; height: 150%; background: ${ink(c)}; opacity: @calc(max(0, 2 - @x) * (1 - @y % 2)); ${tile}`
      )} }${TR}`,
    };
  },
  {
    pal: 47,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['hexagons', 'curves', 'arcs', 'maze'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['textile', 'wallpaper'] },
  }
);

// Boogie Woogie: a Wang network. Each cell edge is open or shut by the hash
// of its place, so both cells sharing it agree; a cell draws the line from
// its middle to its right and lower neighbors' middles where those edges are
// open (the first column and row also their outer edges), and a small block
// over its middle.
const BW = 22;
add(
  'Boogie Woogie',
  'A Wang network of yellow street lines that meet, turn and stop where the edge rules say, with small red, blue and gray blocks set along them.',
  () => {
    const open = (xe, ye, a, b, k) =>
      `floor(0.5 + ((sin(${xe} * ${a} + ${ye} * ${b} + $(s) * ${k}) * 43758.5453) - floor(sin(${xe} * ${a} + ${ye} * ${b} + $(s) * ${k}) * 43758.5453)))`;
    const H = (xe, ye) => open(xe, ye, 12.9898, 78.233, 1);
    const G = (xe, ye) => open(xe, ye, 39.3467, 11.1351, 1.7);
    const h = BW / 2;
    // a cell percent written into the three-cell box
    const bx = (e) => `@calc((100 + ${e}) / 3)%`;
    const rect = (x0, x1, y0, y1) => [`${bx(x0)} ${bx(y0)}`, `${bx(x1)} ${bx(y0)}`, `${bx(x1)} ${bx(y1)}`, `${bx(x0)} ${bx(y1)}`];
    const across = rect(`50 - ${h} - 100 * $(hl)`, `50 + ${h} + 100 * $(hr)`, `50 - ${h}`, `50 + ${h}`);
    const down = rect(`50 - ${h}`, `50 + ${h}`, `50 - ${h} - 100 * $(vt)`, `50 + ${h} + 100 * $(vb)`);
    const lines = `polygon(${[...across, across[0], ...down, down[0]].join(', ')})`;
    return {
      rule: `${SEED} --hr: @calc(0 + ${H('@x', '@y')}); --hl: @calc(${FIRST_X} * ${H('(@x - 1)', '@y')}); --vb: @calc(0 + ${G('@x', '@y')}); --vt: @calc(${FIRST_Y} * ${G('@x', '(@y - 1)')}); ${F} { ${B(
        `${spanBox(3)} background: @p(var(--color1)); ${cp(lines)}`
      )} ${A(`left: ${50 - h}%; top: ${50 - h}%; width: ${BW}%; height: ${BW}%; z-index: 1; background: @p(var(--color2), var(--color3), var(--color4), var(--color1), var(--color1));`)} }${TR}`,
    };
  },
  {
    palette: ['#EEEAE0', '#F2C40C', '#C7311E', '#2350A0', '#A9A69C'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['lines', 'squares', 'grid', 'maze'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['poster', 'wallpaper'] },
  }
);

// Autotile: the corner-matched tiles a game map is drawn with. Every grid
// corner is land or water by a smooth field the whole sheet shares, and each
// cell draws its piece of the coast from its four corners (marching squares
// with round corners): a quarter disc for a lone corner, a half for a land
// side, the cell less a quarter disc for a single water corner. Pieces agree
// along every shared side, so the coast runs on unbroken. A second, higher
// level draws hills inside the land.
const AUTO = (() => {
  const field = (i, j) =>
    `(sin(${i} * 0.73 + ${j} * 0.31 + $(s)) + sin(${j} * 0.67 - ${i} * 0.29 + 1.7 * $(s)) + 0.6 * sin((${i} + ${j}) * 0.45 + 2.3 * $(s)))`;
  const step = (i, j, t) => `@calc(max(0, min(1, floor(${field(i, j)} - ${t} + 1))))`;
  const corners = (p, t) =>
    `--${p}a: ${step('(@x - 1)', '(@y - 1)', t)}; --${p}b: ${step('@x', '(@y - 1)', t)}; --${p}c: ${step('@x', '@y', t)}; --${p}d: ${step('(@x - 1)', '@y', t)};`;
  const layers = (p) => {
    const [a, b, cc, d] = ['a', 'b', 'c', 'd'].map((k) => `$(${p}${k})`);
    const on = (cond, layer) => `@match(${cond} == 1, ${layer}, none)`;
    return [
      on(a, cornerDisc('50%', '0 0')),
      on(b, cornerDisc('50%', '100% 0')),
      on(cc, cornerDisc('50%', '100% 100%')),
      on(d, cornerDisc('50%', '0 100%')),
      on(`${a} * ${b}`, 'linear-gradient(#000 0 50%, transparent 50%)'),
      on(`${b} * ${cc}`, 'linear-gradient(90deg, transparent 50%, #000 50%)'),
      on(`${cc} * ${d}`, 'linear-gradient(transparent 50%, #000 50%)'),
      on(`${d} * ${a}`, 'linear-gradient(90deg, #000 0 50%, transparent 50%)'),
      on(`${b} * ${cc} * ${d} * (1 - ${a})`, cornerBore('50%', '0 0')),
      on(`${a} * ${cc} * ${d} * (1 - ${b})`, cornerBore('50%', '100% 0')),
      on(`${a} * ${b} * ${d} * (1 - ${cc})`, cornerBore('50%', '100% 100%')),
      on(`${a} * ${b} * ${cc} * (1 - ${d})`, cornerBore('50%', '0 100%')),
      EMPTY,
    ];
  };
  return { corners, layers };
})();
add(
  'Autotile',
  'A game map drawn with corner-matched tiles: rounded islands of land in open water, with hills rising inside them, the coastlines running smoothly from tile to tile.',
  () => ({
    rule: `${SEED} ${AUTO.corners('l', 0.2)} ${AUTO.corners('h', 1.1)} ${F} { ${B(`inset: 0; background: @p(var(--color1), var(--color2)); ${msk(...AUTO.layers('l'))}`)} ${A(`inset: 0; background: @p(var(--color3)); ${msk(...AUTO.layers('h'))}`)} }${TR}`,
  }),
  {
    palette: ['#7FC8D8', '#E8D9A8', '#F0E2B4', '#6E9B57'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['curves', 'blocks', 'quarter-circles', 'grid'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['wallpaper', 'packaging'] },
  }
);

// Edge Match: an edge-matching puzzle in the manner of Eternity II. Each
// cell edge carries a diamond of one color with a cut-out motif, half on
// either side, so the tiles only fit one way round; a cell draws the
// diamonds on its right and lower edges whole, split down the middle by the
// tile seam.
const EM = (() => {
  const g = 0.02;
  const dia = (cx, cy) => insetPoly([[cx - 0.5, cy], [cx, cy - 0.5], [cx + 0.5, cy], [cx, cy + 0.5]], g);
  const vert = flagPoly(([e]) => {
    const a = dia(1, 0.5);
    const b = dia(0, 0.5);
    return slit(a, e ? b : b.map(() => a[0]));
  }, [FIRST_X], inSpan(3));
  const horiz = flagPoly(([e]) => {
    const a = dia(0.5, 1);
    const b = dia(0.5, 0);
    return slit(a, e ? b : b.map(() => a[0]));
  }, [FIRST_Y], inSpan(3));
  const map = inSpan(3);
  // the seam: a gap down x = 0 and x = 1 (or across y = 0 and y = 1)
  const gp = (100 * g) / 3;
  const seam = (deg, a, b) =>
    `linear-gradient(${deg}, #000 ${r2(a - gp)}%, transparent ${r2(a - gp)}% ${r2(a + gp)}%, #000 ${r2(a + gp)}% ${r2(b - gp)}%, transparent ${r2(b - gp)}% ${r2(b + gp)}%, #000 ${r2(b + gp)}%)`;
  const motif = (cx, cy) => {
    const [x, y] = map([cx, cy]).map(r2);
    const e = (rx, ry, stops) => `radial-gradient(ellipse ${r2((rx / 3) * 100)}% ${r2((ry / 3) * 100)}% at ${x}% ${y}%, ${stops})`;
    return [
      e(0.15, 0.15, 'transparent 100%, #000 100%'),
      e(0.17, 0.17, '#000 0 38%, transparent 38% 100%, #000 100%'),
      e(0.22, 0.1, 'transparent 100%, #000 100%'),
      e(0.1, 0.22, 'transparent 100%, #000 100%'),
    ];
  };
  const pickM = (list) => `@match(${list.slice(0, -1).map((l, i) => `$(m) == ${i}, ${l}`).join(', ')}, ${list[list.length - 1]})`;
  const motifs = (a, b) => [pickM(motif(...a)), pickM(motif(...b))];
  return {
    vert,
    horiz,
    vMask: [seam('90deg', map([0, 0])[0], map([1, 0])[0]), ...motifs([1, 0.5], [0, 0.5])],
    hMask: [seam('180deg', map([0, 0])[1], map([0, 1])[1]), ...motifs([0.5, 1], [0.5, 0])],
  };
})();
add(
  'Edge Match',
  'An edge-matching puzzle: square tiles whose sides carry half-diamonds with round cut-out motifs, laid so every pair of halves meets its partner across the seams.',
  (c) => ({
    rule: `${F} { ${B(`--m: @p(0, 1, 2, 3); ${spanBox(3)} background: ${ink(c)}; ${cp(EM.vert)} ${mskI(...EM.vMask)}`)} ${A(`--m: @p(0, 1, 2, 3); ${spanBox(3)} background: ${ink(c)}; ${cp(EM.horiz)} ${mskI(...EM.hMask)}`)} }${TR}`,
  }),
  {
    pal: 18,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['diamonds', 'circles', 'grid', 'mosaic'], mood: ['playful', 'bold'], density: 'dense', goodFor: ['packaging', 'poster'] },
  }
);

// Apollonian: three generations of an Apollonian packing on the square grid.
// A disc fills every cell, a smaller disc sits in the hollow at every grid
// corner, and the smallest discs fill the curved triangles left between
// them; the sizes follow from Descartes' circle theorem.
const APO = (() => {
  const g = 0.014;
  const R1 = 0.5;
  const R2 = Math.SQRT1_2 - 0.5;
  const k4 = 2 + 2 + 1 / R2 + 2 * Math.sqrt(4 + 4 / R2);
  const R3 = 1 / k4;
  const y3 = 1 - R2 - R3;
  const map = inSpan(1.6);
  const disc = ([u, v], r) => {
    const [x, y] = map([u, v]).map(r2);
    const rr = r2(((r - g) / 1.6) * 100);
    return `radial-gradient(ellipse ${rr}% ${rr}% at ${x}% ${y}%, #000 100%, transparent 100%)`;
  };
  const small = (corner, edges) => [disc(corner, R2), ...edges.map((p) => disc(p, R3))];
  return {
    big: `inset: ${r2(g * 100)}%; border-radius: 50%;`,
    // right and bottom edges, the bottom right corner
    main: small([1, 1], [[1, 1 - y3], [1, y3], [1 - y3, 1], [y3, 1]]),
    left: small([0, 1], [[0, 1 - y3], [0, y3]]),
    top: small([1, 0], [[1 - y3, 0], [y3, 0]]),
    corner: [disc([0, 0], R2)],
  };
})();
add(
  'Apollonian',
  'Three generations of an Apollonian circle packing: big discs touching in a square grid, middling discs in the hollows between them and tiny discs in the gaps left over.',
  (c) => {
    const when = (cond, list) => list.map((l) => `@match(${cond} == 1, ${l}, none)`);
    return {
      rule: `${F} { ${B(`${APO.big} background: @p(var(--color1), var(--color2), var(--color3));`)} ${A(
        `${spanBox(1.6)} background: @p(var(--color4), var(--color5)); ${msk(...APO.main, ...when(FIRST_X, APO.left), ...when(FIRST_Y, APO.top), ...when(`${FIRST_X} * ${FIRST_Y}`, APO.corner))}`
      )} }${TR}`,
    };
  },
  {
    pal: 44,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'dots', 'grid'], mood: ['calm', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

// Interlock: a tiling of one tile by translation (Heesch's type TTTT), its
// sides bent into S curves. Each side's bend is read from a smooth field at
// that side's place, so the two tiles sharing a side bend it alike, and the
// tiles ripple from nearly square to deeply interlocked across the sheet.
const IL = (() => {
  const n = 10;
  const map = inSpan(1.5);
  const sinT = (i) => Math.sin((2 * Math.PI * i) / n);
  const pt = (u, du, v, dv, amp) => {
    // a point (u + du * amp, v + dv * amp) in cell units, written into the box
    const [bx, by] = map([u, v]);
    const kx = r2((du / 1.5) * 100);
    const ky = r2((dv / 1.5) * 100);
    const xs = kx ? `@calc(${r2(bx)} + ${kx} * $(${amp}))%` : `${r2(bx)}%`;
    const ys = ky ? `@calc(${r2(by)} + ${ky} * $(${amp}))%` : `${r2(by)}%`;
    return `${xs} ${ys}`;
  };
  const pts = [];
  for (let i = 0; i < n; i++) pts.push(pt(i / n, 0, 0, sinT(i), 'at'));
  for (let i = 0; i < n; i++) pts.push(pt(1, sinT(i), i / n, 0, 'ar'));
  for (let i = n; i > 0; i--) pts.push(pt(i / n, 0, 1, sinT(i), 'ab'));
  for (let i = n; i > 0; i--) pts.push(pt(0, sinT(i), i / n, 0, 'al'));
  const amp = (xe, ye) => `@calc(0.17 * sin(${xe} * 0.9 + ${ye} * 0.55 + $(s)))`;
  return {
    clip: `polygon(${pts.join(', ')})`,
    amps: `--at: ${amp('@x', '(@y - 0.5)')}; --ab: ${amp('@x', '(@y + 0.5)')}; --al: ${amp('(@x - 0.5)', '@y')}; --ar: ${amp('(@x + 0.5)', '@y')};`,
  };
})();
add(
  'Interlock',
  'One tile repeated by translation, its sides bent into S curves that deepen and flatten across the sheet, so the checkered tiles hook into each other like a puzzle.',
  () => ({
    rule: `${SEED} ${IL.amps} ${F} { ${B(`${spanBox(1.5)} background: @match((x + y) % 2 == 0, @p(var(--color1), var(--color2)), @p(var(--color3), var(--color4))); ${cp(IL.clip)} ${tf('scale(0.96)')}`)} }${TR}`,
  }),
  {
    pal: 28,
    inks: 4,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['curves', 'waves', 'checkerboard', 'mosaic'], mood: ['organic', 'playful'], density: 'dense', goodFor: ['textile', 'wallpaper'] },
  }
);

export const sectionJ = { title: 'J. Tessellate', all };
