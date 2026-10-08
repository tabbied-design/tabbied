// J. Tessellate - tilings and tile games: truchet sets, Cairo and rhombille tilings, Wang tiles.
//
// The mathematician's side of the repeat: tiles that join across the cell
// edges, so the sheet reads as one surface rather than a grid of stamps.
//
//   truchet sets and paths
//     Duotone Truchet  Smith tiles filled two-tone, the regions colored by the parity of their corners
//     Racetrack        Smith arcs as roads with lane lines
//     Hex Truchet      three arcs per hexagon on offset rows
//     Knotwork         a diagonal plait, over and under, broken into knots
//   tilings
//     Cairo            the Cairo pentagonal tiling
//     Snub Square      tipped squares and equilateral triangles
//     Interlock        one S-sided tile by translation, rippling
//     Pyramid Relief   the triangular lattice raised into lit pyramids
//   tile games and rules
//     Jigsaw           puzzle pieces whose knobs are cut by a hash of each edge
//     Pentomino        a six by ten pentomino packing, repeated
//
// Three ways of making neighbors agree recur:
//
//   * Position. The cell's checkerboard parity (Q below) or the first column
//     and row (FIRST_X, FIRST_Y) switch a shape, and a polygon whose points
//     move with such flags is written as one @calc() per coordinate (flagPoly).
//   * A hash of an edge's or a corner's place in the sheet, plus a number
//     rolled once per sheet (SEED, which @pd() caches). Both cells sharing an
//     edge compute the same hash, so jigsaw knobs always match, and a reseed
//     recuts the whole sheet.
//   * A tile bigger than its cell, drawn whole by one cell in a box two or
//     three cells wide. The sheet's first column and row also draw the pieces
//     that would have come from outside it, through a second outline in the
//     same polygon that otherwise collapses to a point (slit).
//
// The SVG converter paints cell after cell and honors z-index only inside a
// cell, so nothing here leans on a later cell's background staying under an
// earlier cell's overflow; rounded tiles are boxes with border-radius, since
// the converter reads only the first radius of inset(... round ...).
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

/**
 * A roll spent ahead of the rule. At full frequency the package's gate is
 * @random(0.999), so about one cell in a thousand is dropped, which shows in
 * a design that joins across cells. Css-doodle deals every roll from one
 * seeded sequence, so one more roll per cell moves the dropped cell; the
 * designs that lost a cell in their catalog preview carry it.
 */
const SHIFT = '--gate: @r(1);';

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
  return rc(`${c0}${rest.map((t) => `${t.coef < 0 ? ' - ' : ' + '}${Math.abs(t.coef)} * ${t.factors.join(' * ')}`).join('')}`);
};
/**
 * A css-doodle number rounded to two places. @calc() otherwise writes every
 * digit of the float out into every cell, which is most of a design's CSS.
 */
const rc = (e) => `@calc(round((${e}) * 100) / 100)`;
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

/**
 * The same, worked out on the host instead: one fixed polygon per
 * combination of the binary `flags`, named --<name>0, --<name>1, ... (flag i
 * adds 2^i), with a cell-level number that picks its own. The cell then
 * computes one small @calc rather than one per coordinate.
 */
const hostPolys = (name, variant, flags, map) => {
  const host = [];
  for (let t = 0; t < 1 << flags.length; t++) {
    const bits = flags.map((_, i) => (t >> i) & 1);
    host.push(`--${name}${t}: polygon(${variant(bits).map(map).map(([x, y]) => `${r2(x)}% ${r2(y)}%`).join(', ')});`);
  }
  const key = flags.length ? `--${name}k: @calc(0${flags.map((f, i) => ` + ${1 << i} * ${f}`).join('')});` : '';
  return { host: host.join(' '), key, clip: flags.length ? `@var(--${name}$(${name}k))` : `@var(--${name}0)` };
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

/** A host declaration holding a list of mask layers (or any value), read in a cell with @var(). */
const hostList = (name, layers) => `--${name}: ${Array.isArray(layers) ? layers.join(', ') : layers};`;

/** A disc of radius r (fraction of the cell side) about a cell corner, as a mask layer. */
const cornerDisc = (r, at) => `radial-gradient(circle farthest-side at ${at}, #000 ${r}, transparent ${r})`;
const cornerBore = (r, at) => `radial-gradient(circle farthest-side at ${at}, transparent ${r}, #000 ${r})`;

// The edge and corner hashes below are worked out from a place in the sheet,
// so both cells sharing an edge get the same answer, plus `s`, a per-sheet
// number rolled once (@pd caches the first roll), so a reseed recuts the
// whole sheet.
const SEED = '--s: @pd(@r(0, 50));';

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

/** A band between radii a and b (percent of one cell side) about a cell corner, as a mask layer. */
const ringFS = (at, a, b) => `radial-gradient(circle farthest-side at ${at}, transparent ${a}%, #000 ${a}% ${b}%, transparent ${b}%)`;

// -- linear expressions in per-cell numbers --------------------------------------
// A coordinate that moves with a per-cell number ($(name)) is kept as
// c + sum(k * $(name)) until it is written out, so shapes can be averaged,
// shrunk and mapped into a box before they become @calc() strings.
const lin = (c, terms = {}) => ({ c, terms });
const ladd = (a, b) => {
  const terms = { ...a.terms };
  for (const [k, v] of Object.entries(b.terms)) terms[k] = (terms[k] ?? 0) + v;
  return lin(a.c + b.c, terms);
};
const lscale = (a, k) => lin(a.c * k, Object.fromEntries(Object.entries(a.terms).map(([n, v]) => [n, v * k])));
const lstr = (a) => {
  const parts = Object.entries(a.terms).filter(([, v]) => r2(v) !== 0);
  if (!parts.length) return `${r2(a.c)}`;
  return rc(`${r2(a.c)}${parts.map(([n, v]) => `${v < 0 ? ' - ' : ' + '}${Math.abs(r2(v))} * ${n.split('*').map((m) => `$(${m})`).join(' * ')}`).join('')}`);
};
/** A point from two linear coordinates, written into a box `span` cells wide. */
const lpt = ([u, v], span) => {
  const o = (span - 1) / 2;
  const m = (e) => lscale(ladd(e, lin(o)), 100 / span);
  return `${lstr(m(u))}% ${lstr(m(v))}%`;
};
const L = (c, name, k = 1) => (name ? lin(c, { [name]: k }) : lin(c));

// -- truchet sets and paths ------------------------------------------------------

add(
  'Duotone Truchet',
  'Smith truchet tiles filled in two tones, so the quarter arcs close into round blobs and winding channels that run unbroken across the sheet.',
  (c) => ({
    host: `${hostList('dd', [cornerDisc('50%', '0 0'), cornerDisc('50%', '100% 100%')])} ${hostList('db', [cornerBore('50%', '0 0'), cornerBore('50%', '100% 100%')])}`,
    rule: `${SHIFT} --k: @p(0, 1); ${F} { ${tf(`rotate(@calc(90 * ((@x + @y + $(k)) % 2))deg)`)} ${B(
      `inset: 0; background: ${sheetInk(c)}; ${msk('@var(--dd)')} opacity: @calc(1 - $(k));`
    )} ${A(`inset: 0; background: @lp(); ${mskI('@var(--db)')} opacity: $(k);`)} }${TR}`,
  }),
  {
    pal: 3,
    inks: 2,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['quarter-circles', 'curves', 'maze'], mood: ['bold', 'playful'], density: 'dense', goodFor: ['poster', 'textile'] },
  }
);

// Racetrack: Smith tiles drawn as roads, a broad band on each quarter arc
// with a lane line down each edge and one down the middle. The lines sit
// symmetrically about the arc, so they meet their neighbors' lines whichever
// way the next tile turns.
add(
  'Racetrack',
  'Winding roads made of quarter turns, each a dark band with pale lane lines at its edges and down its middle, looping and meandering across the sheet.',
  (c) => {
    const road = (at) => ringFS(at, 26, 74);
    const lines = (at) => [ringFS(at, 30.5, 33.5), ringFS(at, 48.5, 51.5), ringFS(at, 66.5, 69.5)];
    return {
      host: `${hostList('rr', [road('0 0'), road('100% 100%')])} ${hostList('rl', [...lines('0 0'), ...lines('100% 100%')])}`,
      rule: `--road: ${sheetInk(c, 1, 2)}; --line: ${sheetInk(c, 3, 4)}; ${F} { ${tf('rotate(@p(0deg, 90deg))')} ${B(`inset: 0; background: @p(@var(--road)); ${msk('@var(--rr)')}`)} ${A(`inset: 0; background: @p(@var(--line)); ${msk('@var(--rl)')}`)} }${TR}`,
    };
  },
  {
    palette: ['#C9D6B8', '#2F3437', '#3D3A4B', '#F4D35E', '#F7F4EA'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['curves', 'arcs', 'lines', 'maze'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['packaging', 'wallpaper'] },
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
    const tile = `${msk('@var(--hm)')} ${cp('@var(--hc)')} ${tf('rotate(@p(0deg, 180deg))')}`;
    return {
      host: `${hostList('hm', HEX.rings)} --hc: ${HEX.clip};`,
      rule: `${SHIFT} ${F} { ${tf('translateX(@calc(50 - 50 * (@y % 2))%)')} ${B(`${spanBox(1.5)} background: ${ink(c)}; ${tile}`)} ${A(
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

// -- tilings ---------------------------------------------------------------------

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
    // the pentagon across one edge, and for the first column (row) the one across the outer edge too
    const pair = (fig, du, dv) => ([q, ex]) => {
      const a = insetPoly(fig(q), CAIRO_G);
      const b = insetPoly(shift(fig(1 - q), du, dv), CAIRO_G);
      return slit(a, ex ? b : b.map(() => a[0]));
    };
    const right = hostPolys('cr', pair(cairoRight, -1, 0), [Q, FIRST_X], inSpan(3));
    const bottom = hostPolys('cb', pair(cairoBottom, 0, -1), [Q, FIRST_Y], inSpan(3));
    return {
      host: `${right.host} ${bottom.host}`,
      rule: `${SHIFT} ${right.key} ${bottom.key} ${F} { ${B(`${spanBox(3)} background: ${ink(c)}; ${cp(right.clip)}`)} ${A(`${spanBox(3)} background: ${ink(c)}; ${cp(bottom.clip)}`)} }${TR}`,
    };
  },
  {
    pal: 27,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['mosaic', 'grid'], mood: ['calm', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'textile'] },
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
    const square = hostPolys('ss', ([q]) => insetPoly(SNUB.square(q), g), [Q], inSpan(3));
    const tris = hostPolys(
      'st',
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
      host: `${square.host} ${tris.host}`,
      rule: `${SHIFT} ${square.key} ${tris.key} ${F} { ${B(`${spanBox(3)} background: @p(var(--color1), var(--color2)); ${cp(square.clip)}`)} ${A(`${spanBox(3)} background: @p(var(--color3), var(--color4), var(--color5)); ${cp(tris.clip)}`)} }${TR}`,
    };
  },
  {
    pal: 10,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['squares', 'triangles', 'mosaic'], mood: ['elegant', 'bold'], density: 'dense', goodFor: ['wallpaper', 'poster'] },
  }
);

// Interlock: a tiling of one tile by translation (Heesch's type TTTT), its
// sides bent into S curves. Each side's bend is read from a smooth field at
// that side's place, so the two tiles sharing a side bend it alike, and the
// tiles ripple from nearly square to deeply interlocked across the sheet.
const IL = (() => {
  const n = 8;
  const map = inSpan(1.5);
  const sinT = (i) => Math.sin((2 * Math.PI * i) / n);
  const pt = (u, du, v, dv, amp) => {
    // a point (u + du * amp, v + dv * amp) in cell units, written into the box
    const [bx, by] = map([u, v]);
    const kx = r2((du / 1.5) * 100);
    const ky = r2((dv / 1.5) * 100);
    const xs = kx ? `${rc(`${r2(bx)} + ${kx} * $(${amp})`)}%` : `${r2(bx)}%`;
    const ys = ky ? `${rc(`${r2(by)} + ${ky} * $(${amp})`)}%` : `${r2(by)}%`;
    return `${xs} ${ys}`;
  };
  const pts = [];
  for (let i = 0; i < n; i++) pts.push(pt(i / n, 0, 0, sinT(i), 'at'));
  for (let i = 0; i < n; i++) pts.push(pt(1, sinT(i), i / n, 0, 'ar'));
  for (let i = n; i > 0; i--) pts.push(pt(i / n, 0, 1, sinT(i), 'ab'));
  for (let i = n; i > 0; i--) pts.push(pt(0, sinT(i), i / n, 0, 'al'));
  const amp = (xe, ye) => rc(`0.17 * sin(${xe} * 0.9 + ${ye} * 0.55 + $(s))`);
  return {
    clip: `polygon(${pts.join(', ')})`,
    amps: `--at: ${amp('@x', '(@y - 0.5)')}; --ab: ${amp('@x', '(@y + 0.5)')}; --al: ${amp('(@x - 0.5)', '@y')}; --ar: ${amp('(@x + 0.5)', '@y')};`,
  };
})();
add(
  'Interlock',
  'One tile repeated by translation, its sides bent into S curves that deepen and flatten across the sheet, so the checkered tiles hook into each other like a puzzle.',
  () => ({
    rule: `${SHIFT} ${SEED} ${IL.amps} ${F} { ${B(`${spanBox(1.5)} background: @match((x + y) % 2 == 0, @p(var(--color1), var(--color2)), @p(var(--color3), var(--color4))); ${cp(IL.clip)} ${tf('scale(0.96)')}`)} }${TR}`,
  }),
  {
    pal: 28,
    inks: 4,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['curves', 'waves', 'checkerboard', 'mosaic'], mood: ['organic', 'playful'], density: 'dense', goodFor: ['textile', 'wallpaper'] },
  }
);

// Pyramid Relief: the triangular lattice on offset rows, every triangle
// raised into a low pyramid lit from the upper left, its peak pushed off
// center by a hash of its place. A cell draws what falls inside its own
// square: its own triangle and half of each neighbor's, whose peaks sit on
// the shared side, so the halves always agree. The cell's ink is the half
// light; its two pseudo-elements lay the lit and the shaded faces over it.
const PYR = (() => {
  const own = (cy) => [lin(0.5, { pa: 1 }), lin(cy, { pb: 1 })];
  const left = (cy) => [lin(0), lin(cy, { pl: 1 })];
  const right = (cy) => [lin(1), lin(cy, { pr: 1 })];
  const P = (u, v) => [lin(u), lin(v)];
  const poly = (tris) => `polygon(${slit(...tris).map((p) => lpt(p, 1)).join(', ')})`;
  // rows of upright triangles (y odd) and of inverted ones (y even)
  const up = {
    light: poly([[P(0, 1), P(0.5, 0), own(2 / 3)], [P(0, 0), P(0.5, 0), left(1 / 3)], [P(0.5, 0), P(1, 0), right(1 / 3)]]),
    dark: poly([[P(1, 1), P(0, 1), own(2 / 3)], [P(0.5, 0), P(0, 1), left(1 / 3)]]),
  };
  const down = {
    light: poly([[P(0, 0), P(1, 0), own(1 / 3)], [P(0.5, 1), P(1, 0), right(2 / 3)]]),
    dark: poly([[P(1, 0), P(0.5, 1), own(1 / 3)], [P(0.5, 1), P(0, 1), left(2 / 3)], [P(1, 1), P(0.5, 1), right(2 / 3)]]),
  };
  const fr = (i, j, a, b) => `((sin(${i} * ${a} + ${j} * ${b} + $(s)) * 43758.5453) - floor(sin(${i} * ${a} + ${j} * ${b} + $(s)) * 43758.5453))`;
  const vars = `--pa: @calc(0.16 * ${fr('@x', '@y', 12.9898, 78.233)} - 0.08); --pb: @calc(0.12 * ${fr('@x', '@y', 39.3467, 11.1351)} - 0.06); --pl: @calc(0.16 * ${fr('(@x - 1)', '@y', 27.123, 51.871)} - 0.08); --pr: @calc(0.16 * ${fr('@x', '@y', 27.123, 51.871)} - 0.08);`;
  return { up, down, vars };
})();
add(
  'Pyramid Relief',
  'A triangular grid raised into low pyramids lit from the upper left, each face in one of three tones and every peak nudged a little off center, like chip-carved wood.',
  () => ({
    rule: `${SEED} ${PYR.vars} ${F} { background: @p(var(--color2)); ${B(`inset: 0; background: @p(var(--color1)); ${cp(`@match(y % 2 == 1, ${PYR.up.light}, ${PYR.down.light})`)}`)} ${A(
      `inset: 0; background: @p(var(--color3)); ${cp(`@match(y % 2 == 1, ${PYR.up.dark}, ${PYR.down.dark})`)}`
    )} }${TR}`,
  }),
  {
    palette: ['#3A2E26', '#EBD9BC', '#C49A6C', '#7A5235'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['triangles', 'grid', 'mosaic'], mood: ['elegant', 'organic'], density: 'dense', goodFor: ['textile', 'wallpaper'] },
  }
);

// -- tile games and rules --------------------------------------------------------

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
  // the cell's outline by name: css-doodle joins the text, so this reads --j0 .. --j15
  const pickRule = '@var(--j$(k))';
  return { host, pickRule };
})();

add(
  'Jigsaw',
  'Jigsaw puzzle pieces in mixed colors, each edge cut with a round knob that pokes out of one piece and into its neighbor, so the whole sheet fits together.',
  (c) => {
    // Each edge's hash, written over the cell's own variables so the text of
    // the whole sum is the same in every cell and css-doodle parses it once.
    // The sheet's last column and row read their size as X + 0.5 (--ex,
    // --ey): $() treats four equal values read in a row as a cycle and reads
    // the fourth as 0, and the column, the row and the size can all be equal.
    const hash = (xe, ye, a, b, k) => `floor(2 * ((sin(${xe} * ${a} + ${ye} * ${b} + s * ${k}) * 43758.5453 % 1 + 1) % 1))`;
    const H = (xe, ye) => hash(xe, ye, 12.9898, 78.233, 1);
    const G = (xe, ye) => hash(xe, ye, 39.3467, 11.1351, 1.7);
    const code = `--k: $(8 * max(${H('ix', 'iy')}, ix > ex - 1) + 4 * max(${G('ix', 'iy')}, iy > ey - 1) + 2 * max(1 - ${H('(ix - 1)', 'iy')}, ix < 2) + max(1 - ${G('ix', '(iy - 1)')}, iy < 2));`;
    return {
      host: JIG.host,
      rule: `${SEED} --ix: @x; --iy: @y; --ex: @calc(@X + 0.5); --ey: @calc(@Y + 0.5); ${code} ${F} { ${B(`${spanBox(1.6)} background: ${ink(c)}; ${cp(JIG.pickRule)}`)} }${TR}`,
    };
  },
  {
    pal: 24,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['blocks', 'curves', 'mosaic', 'grid'], mood: ['playful'], density: 'dense', goodFor: ['wallpaper', 'packaging'] },
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
      rule: `--ox: @pd(@ri(0, 9)); --oy: @pd(@ri(0, 5)); --co: @pd(@ri(0, 3)); --pk: @calc(0 + (@x - 1 + $(ox)) % 10 + 10 * ((@y - 1 + $(oy)) % 6)); --pv: ${PENTO}; --pid: @calc(floor($(pv) / 16)); ${F} { ${B(`top: ${bit(8)}; right: ${bit(4)}; bottom: ${bit(2)}; left: ${bit(1)}; border-radius: ${rad(8, 1)} ${rad(8, 4)} ${rad(2, 4)} ${rad(2, 1)}; background: @match(${[0, 1, 2]
        .map((i) => `($(pid) + $(co)) % 4 == ${i}, @p(var(--color${i + 1}))`)
        .join(', ')}, @p(var(--color4)));`)} }${TR}`,
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

export const sectionJ = { title: 'J. Tessellate', all };
