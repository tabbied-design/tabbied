// I. Pantry - things on a table: fruit cut open, sweets, buttons and other small objects.
//
// Cheerful flat graphics for packaging, wrapping paper, kitchen cloths and
// cafe menus. Every color still comes from the palette, so a lemon is a
// lemon by its rind and segments whatever ink it takes.
//
//   fruit     Citrus Wheel, Watermelon, Kiwi, Strawberry, Cherries, Avocado
//   sweets    Peppermint, Doughnut, Allsorts, Candy Corn, Gingerbread,
//             Linzer, Ice Cream
//   savory    Sunny Side, Emmental, Farfalle, Coffee Beans, Peapod,
//             Cocktail Olives
//   drawer    Buttons, Dice, Card Suits, Marbles, Spools, Paper Clips
//
// Most figures are outlines computed here once and parked on the host as a
// custom property, read in the cell with @var(). A figure with a hole in it
// (a doughnut's icing, a bean's crease, a cookie's window) is one polygon:
// the outline runs clockwise and each hole counter-clockwise, strung
// together by zero-width seams, so the nonzero fill rule leaves the holes
// empty. Where a figure needs bands of color inside one element (the three
// bands of a candy corn) the bands are hard-stop gradients over a picked
// background color, so the picked ink still transitions on a reseed.
import { section, F, TR, B, A } from './shared.mjs';

const { add, all } = section('I. Pantry');

// -- local helpers -------------------------------------------------------------

const TAU = Math.PI * 2;
const n2 = (v) => +v.toFixed(2);
const pct = (v) => `${n2(v)}%`;
/** A clip-path polygon from [x, y] pairs given in percent of the box. */
const polyOf = (list) => `polygon(${list.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(', ')})`;
/** A point at radius r and angle a (radians) from (cx, cy). */
const at = (r, a, cx = 50, cy = 50) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
const clip = (v) => `-webkit-clip-path: ${v}; clip-path: ${v};`;
const maskV = (...layers) => {
  const v = layers.join(', ');
  return `-webkit-mask: ${v}; mask: ${v};`;
};
const maskI = (...layers) =>
  `${maskV(...layers)} -webkit-mask-composite: source-in; mask-composite: intersect;`;
const inkOf = (...slots) => `@p(${slots.map((s) => `var(--color${s})`).join(', ')})`;

/** Shoelace area; positive when the points run clockwise on screen. */
const area = (ps) =>
  ps.reduce((sum, [x1, y1], i) => {
    const [x2, y2] = ps[(i + 1) % ps.length];
    return sum + (x1 * y2 - x2 * y1);
  }, 0) / 2;
const cw = (ps) => (area(ps) < 0 ? [...ps].reverse() : ps);
const ccw = (ps) => (area(ps) > 0 ? [...ps].reverse() : ps);

/**
 * Filled outlines (clockwise) and holes (counter-clockwise) as one polygon,
 * every contour joined to the first one's start by a zero-width seam.
 */
const compound = (fills, holes = []) => {
  const out = [];
  let home = null;
  const push = (ps) => {
    out.push(...ps, ps[0]);
    if (home) out.push(home);
    else home = ps[0];
  };
  fills.forEach((f) => push(cw(f)));
  holes.forEach((h) => push(ccw(h)));
  return out;
};

const circlePts = (cx, cy, r, n = 32) => Array.from({ length: n }, (_, i) => at(r, (i / n) * TAU, cx, cy));
const ellipsePts = (cx, cy, rx, ry, n = 32, rot = 0) =>
  Array.from({ length: n }, (_, i) => {
    const t = (i / n) * TAU;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)];
  });

/** A closed Catmull-Rom spline through the points, `per` samples a span. */
const spline = (pts, per = 8) => {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [pts[(i - 1 + n) % n], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]];
    for (let k = 0; k < per; k++) {
      const t = k / per;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push(
        [0, 1].map(
          (j) =>
            0.5 *
            (2 * p1[j] +
              (-p0[j] + p2[j]) * t +
              (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 +
              (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)
        )
      );
    }
  }
  return out;
};

/** The outline of a thick open stroke along `path`, half-width w, round caps. */
const strokePts = (path, w, capN = 7) => {
  const n = path.length;
  const dir = (i) => {
    const [a, b] = [path[Math.max(0, i - 1)], path[Math.min(n - 1, i + 1)]];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  };
  const left = [];
  const right = [];
  path.forEach((p, i) => {
    const [dx, dy] = dir(i);
    left.push([p[0] - dy * w, p[1] + dx * w]);
    right.push([p[0] + dy * w, p[1] - dx * w]);
  });
  const cap = (p, [dx, dy], from) => {
    const a0 = Math.atan2(dy, dx) + from;
    return Array.from({ length: capN - 1 }, (_, k) => at(w, a0 - ((k + 1) / capN) * Math.PI, p[0], p[1]));
  };
  return [
    ...left,
    ...cap(path[n - 1], dir(n - 1), Math.PI / 2),
    ...right.reverse(),
    ...cap(path[0], dir(0), -Math.PI / 2),
  ];
};

/** A convex polygon with each corner rounded to its own radius. */
const roundCorners = (pts, radii, seg = 6) => {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const a = pts[(i - 1 + n) % n];
    const b = pts[(i + 1) % n];
    const r = Array.isArray(radii) ? radii[i] : radii;
    const unit = (q) => {
      const l = Math.hypot(q[0] - p[0], q[1] - p[1]);
      return [(q[0] - p[0]) / l, (q[1] - p[1]) / l];
    };
    const u1 = unit(a);
    const u2 = unit(b);
    const ang = Math.acos(u1[0] * u2[0] + u1[1] * u2[1]);
    const t = r / Math.tan(ang / 2);
    const bl = Math.hypot(u1[0] + u2[0], u1[1] + u2[1]);
    const bis = [(u1[0] + u2[0]) / bl, (u1[1] + u2[1]) / bl];
    const d = r / Math.sin(ang / 2);
    const c = [p[0] + bis[0] * d, p[1] + bis[1] * d];
    const p1 = [p[0] + u1[0] * t, p[1] + u1[1] * t];
    const p2 = [p[0] + u2[0] * t, p[1] + u2[1] * t];
    const a1 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
    let da = Math.atan2(p2[1] - c[1], p2[0] - c[0]) - a1;
    while (da > Math.PI) da -= TAU;
    while (da < -Math.PI) da += TAU;
    for (let k = 0; k <= seg; k++) out.push(at(r, a1 + (da * k) / seg, c[0], c[1]));
  }
  return out;
};

/** Maps points given in percent of the cell into a box placed at (left, top), w x h. */
const toBox = (pts, left, top, w, h) => pts.map(([x, y]) => [((x - left) / w) * 100, ((y - top) / h) * 100]);

/** Rotates points about (cx, cy) by `a` radians. */
const turn = (pts, a, cx = 50, cy = 50) =>
  pts.map(([x, y]) => [
    cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a),
    cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a),
  ]);

/** A small seeded generator, so a scatter computed here is the same every build. */
const rng = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** A hole of radius r at (x, y) in a square box, as a mask layer to intersect. */
const holeL = (x, y, r) => {
  const far = Math.max(Math.hypot(x, y), Math.hypot(100 - x, y), Math.hypot(x, 100 - y), Math.hypot(100 - x, 100 - y));
  const s = pct((r / far) * 100);
  return `radial-gradient(circle at ${pct(x)} ${pct(y)}, transparent ${s}, #000 ${s})`;
};

/** A hard-edged dot of diameter d centered at (cx, cy), as a no-repeat mask layer. */
const dotL = (cx, cy, d) => {
  const px = ((cx - d / 2) / (100 - d)) * 100;
  const py = ((cy - d / 2) / (100 - d)) * 100;
  return `radial-gradient(circle closest-side, #000 98%, transparent 100%) ${pct(px)} ${pct(py)} / ${pct(d)} ${pct(d)} no-repeat`;
};

/** The band between two radii (fractions of the half side), centered. */
const ringL = (inner, outer) =>
  `radial-gradient(circle closest-side, transparent ${inner}%, #000 ${inner}% ${outer}%, transparent ${outer}%)`;

/** A hard-stop conic of n spokes, each `on` degrees wide, as a mask layer. */
const spokesL = (n, on, from = 0) => {
  const step = 360 / n;
  const stops = [];
  for (let i = 0; i < n; i++) {
    const a = n2(i * step);
    const b = n2(i * step + on);
    const e = n2((i + 1) * step);
    stops.push(`#000 ${a}deg ${b}deg`, `transparent ${b}deg ${e}deg`);
  }
  return `conic-gradient(from ${from}deg, ${stops.join(', ')})`;
};

// -- fruit -------------------------------------------------------------------------

// Citrus Wheel: a rind ring, a pith gap, then ten segments parted by gaps
// of even width and stopped short of the core; a third of them cut in half.
const SEGMENTS = (() => {
  const segs = [];
  const h = 1.3;
  const [ri, ro] = [7.5, 40];
  for (let k = 0; k < 10; k++) {
    const p0 = ((k * 36 - 18) * Math.PI) / 180;
    const p1 = p0 + (36 * Math.PI) / 180;
    const arc = (r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => at(r, a0 + ((a1 - a0) * i) / n));
    const [go, gi] = [Math.asin(h / ro), Math.asin(h / ri)];
    segs.push([...arc(ro, p0 + go, p1 - go, 10), ...arc(ri, p1 - gi, p0 + gi, 3)]);
  }
  return polyOf(compound(segs));
})();

add(
  'Citrus Wheel',
  'Lemon, lime and orange slices: a rind ring, a pale gap, then wedge segments round a hollow core, some cut in half, tossed at every angle.',
  () => ({
    host: `--seg: ${SEGMENTS};`,
    rule: `${F} {
      --cut: @p(inset(0), inset(0), inset(0 0 50% 0));
      transform: translate(@r(-8%, 8%), @r(-8%, 8%)) rotate(@r(0deg, 360deg)) scale(@r(.8, 1.08));
      z-index: @ri(1, 9); ${clip('@var(--cut)')}
      ${B(`inset: 0; border-radius: 50%; background: ${inkOf(1, 2, 3, 4)}; ${maskV(ringL(88, 100))}`)}
      ${A(`inset: 0; background: @lp(); opacity: .78; ${clip('@var(--seg)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#FFF8E8', '#F2B705', '#F27405', '#7FB539', '#E8505B'],
    grid: '5x7',
    freq: 0.9,
    tg: '5x5',
    tf: 0.9,
    meta: { tags: ['circles', 'radial', 'rings', 'semicircles'], mood: ['playful', 'festive'], density: 'medium', goodFor: ['packaging', 'textile', 'wallpaper'] },
  }
);

// Watermelon: wide wedges, point up and point down in a checkerboard, so
// each row interlocks like a plate of slices. Rind and flesh are two
// pieces with a pale gap between; the pips are holes in the flesh.
const MELON = (() => {
  const apex = [50, 8];
  const half = (48 * Math.PI) / 180;
  const R = 90;
  const arc = (r, a0, a1, n = 24) =>
    Array.from({ length: n + 1 }, (_, i) => at(r, a0 + ((a1 - a0) * i) / n, apex[0], apex[1]));
  const down = Math.PI / 2;
  const rind = [...arc(R, down - half, down + half), ...arc(R * 0.83, down + half, down - half)];
  const flesh = [apex, ...arc(R * 0.76, down - half + 0.035, down + half - 0.035)];
  const pip = (r, a) => {
    const pts = [];
    for (let i = 0; i < 14; i++) {
      const t = (i / 14) * TAU;
      const s = 3.6 * Math.cos(t);
      const w = 2.2 * Math.sin(t) * Math.abs(Math.sin(t / 2)) ** 0.9;
      // along the radius toward the apex (s), across it (w)
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      pts.push([apex[0] + (r + s) * ca - w * sa, apex[1] + (r + s) * sa + w * ca]);
    }
    return pts;
  };
  const pips = [
    pip(46, down - 0.5),
    pip(50, down - 0.17),
    pip(50, down + 0.17),
    pip(46, down + 0.5),
    pip(30, down - 0.25),
    pip(30, down + 0.25),
  ];
  const box = (pts) => toBox(pts, -25, 0, 150, 100);
  return {
    rind: polyOf(box(rind)),
    flesh: polyOf(box(compound([flesh], pips))),
  };
})();

add(
  'Watermelon',
  'Wide watermelon wedges pointing up and down in turn, so each row interlocks: a curved rind, a pale gap and pink flesh with dark pips.',
  () => ({
    host: `--rind: ${MELON.rind}; --flesh: ${MELON.flesh};`,
    rule: `@odd { transform: rotate(180deg); } ${F} {
      ${B(`left: -25%; top: 0; width: 150%; height: 100%; background: ${inkOf(2, 4)}; ${clip('@var(--rind)')}`)}
      ${A(`left: -25%; top: 0; width: 150%; height: 100%; background: ${inkOf(1, 3)}; ${clip('@var(--flesh)')}`)}
    }${TR}`,
  }),
  {
    pal: 23,
    inks: 4,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'arcs', 'checkerboard'], mood: ['playful', 'festive'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// -- sweets ------------------------------------------------------------------------

// Candy Corn: two kernels in every cell, one point up and one point down,
// so a row of them interlocks. Each kernel is one element: the tip and the
// middle band are a hard-stop gradient over the picked base color.
const CORN = (() => {
  const a = 6;
  const up = roundCorners([[25, a], [25 + 43, 100 - a], [25 - 43, 100 - a]], [4, 9, 9], 7);
  const dn = roundCorners([[75, 100 - a], [75 - 43, a], [75 + 43, a]], [4, 9, 9], 7);
  return { up: polyOf(toBox(up, -25, 0, 150, 100)), dn: polyOf(toBox(dn, -25, 0, 150, 100)) };
})();
const kernel = (dir, shape) =>
  `left: -25%; top: 0; width: 150%; height: 100%; ${clip(shape)}
   background: linear-gradient(${dir}, var(--color1) 0 30%, ${inkOf(2, 5)} 30% 62%, transparent 62%) ${inkOf(3, 4)};`;

add(
  'Candy Corn',
  'Rows of candy corn kernels, point up and point down in turn so they nest, each banded white at the tip, orange through the middle and yellow at the base.',
  () => ({
    host: `--up: ${CORN.up}; --dn: ${CORN.dn};`,
    rule: `${F} {
      ${B(kernel('180deg', '@var(--up)'))}
      ${A(kernel('0deg', '@var(--dn)'))}
    }${TR}`,
  }),
  {
    palette: ['#2B193D', '#FFF6E5', '#F28C28', '#F9C846', '#9B5B3B', '#E7609E'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'stripes', 'zigzags'], mood: ['festive', 'playful', 'retro'], density: 'dense', goodFor: ['packaging', 'wallpaper', 'textile'] },
  }
);

// Doughnut: a ring of dough, a wavy collar of icing with its own hole,
// and a scatter of sprinkles across the icing.
const DONUT = (() => {
  const n = 96;
  const outer = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * TAU;
    const drip = Math.max(0, Math.sin(5 * t + 0.6)) ** 6 * 5;
    return at(39 + 2.4 * Math.sin(7 * t) + 1.4 * Math.sin(11 * t + 1) + drip, t);
  });
  const inner = Array.from({ length: 48 }, (_, i) => {
    const t = (i / 48) * TAU;
    return at(17 + 1.2 * Math.sin(6 * t + 0.4), t);
  });
  const icing = polyOf(compound([outer], [inner]));
  const rand = rng(7);
  const bits = [];
  let guard = 0;
  while (bits.length < 17 && guard++ < 2000) {
    const r = 23 + rand() * 12;
    const t = rand() * TAU;
    const [x, y] = at(r, t);
    if (bits.some(([bx, by]) => Math.hypot(bx - x, by - y) < 8.4)) continue;
    bits.push([x, y, rand() * Math.PI]);
  }
  const sprinkles = bits.map(([x, y, a]) =>
    strokePts([at(-2.6, a, x, y), at(2.6, a, x, y)], 1.25, 5)
  );
  return { icing, sprinkles: polyOf(compound(sprinkles)) };
})();

add(
  'Doughnut',
  'Iced doughnuts from above: a ring of dough, a wavy collar of pink, chocolate or white icing, and a scatter of sprinkles, each turned its own way.',
  () => ({
    host: `--icing: ${DONUT.icing}; --spr: ${DONUT.sprinkles};`,
    rule: `${F} {
      transform: translate(@r(-6%, 6%), @r(-6%, 6%)) scale(@r(.86, 1)); z-index: @ri(1, 9);
      border-radius: 50%; background: ${inkOf(1, 2)}; ${maskV('radial-gradient(circle closest-side, transparent 22%, #000 22%)')}
      ${B(`inset: 0; background: ${inkOf(3, 4, 5)}; ${clip('@var(--icing)')} transform: rotate(@r(0deg, 360deg));`)}
      ${A(`inset: 0; background: ${inkOf(3, 5, 6)}; ${clip('@var(--spr)')} transform: rotate(@r(0deg, 360deg));`)}
    }${TR}`,
  }),
  {
    palette: ['#CFE8E0', '#D9A066', '#B9733E', '#F48FB1', '#5B3A29', '#FFF7EC', '#3E7CB1'],
    grid: '5x7',
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['rings', 'circles', 'waves', 'dots'], mood: ['playful', 'festive'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'textile'] },
  }
);

// -- savory ------------------------------------------------------------------------

// Sunny Side: the white an uneven blob (three of them to pick from), the
// yolk a disc set off-center with a glint cut out of it.
const EGG = [
  [0.4, 1.3, 2.2],
  [2.1, 0.2, 4.0],
  [5.0, 3.1, 0.9],
].map(([p1, p2, p3]) => {
  const n = 72;
  return polyOf(
    Array.from({ length: n }, (_, i) => {
      const t = (i / n) * TAU;
      const r = 40 * (1 + 0.1 * Math.sin(3 * t + p1) + 0.07 * Math.sin(5 * t + p2) + 0.035 * Math.sin(8 * t + p3));
      return at(r, t);
    })
  );
});

add(
  'Sunny Side',
  'Fried eggs sunny side up: rippled whites of every outline, each with a round yolk set a little off center and a glint of light on it.',
  () => ({
    host: EGG.map((v, i) => `--egg${i}: ${v};`).join(' '),
    rule: `${F} {
      transform: translate(@r(-10%, 10%), @r(-10%, 10%)) rotate(@r(0deg, 360deg)) scale(@r(.85, 1.15)); z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 2)}; ${clip('@p(@var(--egg0), @var(--egg1), @var(--egg2))')}`)}
      ${A(`left: 36%; top: 30%; width: 36%; height: 36%; border-radius: 50%; background: ${inkOf(3, 4)};
        ${maskV('radial-gradient(ellipse 22% 13% at 32% 30%, transparent 98%, #000 100%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#2F6B7E', '#FFFDF5', '#F2EBDD', '#FFB703', '#F48C06'],
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['circles', 'curves', 'dots'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'packaging', 'card-texture'] },
  }
);

// Coffee Beans: an oval with an S-shaped crease cut through it, two beans
// to a cell at any angle so they pile.
const BEAN = (() => {
  const body = ellipsePts(50, 50, 34, 24, 48);
  const n = 28;
  const top = [];
  const bot = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const x = 50 - 27 + 54 * u;
    const c = 50 + 6 * Math.sin(TAU * (u - 0.5) * 0.85);
    const w = 2.6 * Math.sin(Math.PI * u) ** 0.7;
    top.push([x, c - w]);
    bot.push([x, c + w]);
  }
  return polyOf(compound([body], [[...top, ...bot.reverse()]]));
})();
const bean = (ink) =>
  `inset: 0; background: ${ink}; ${clip('@var(--bean)')}
   transform: translate(@r(-22%, 22%), @r(-22%, 22%)) rotate(@r(0deg, 360deg)) scale(@r(.62, .86));`;

add(
  'Coffee Beans',
  'Roasted coffee beans heaped at every angle, each an oval split down its length by a curving crease, in two or three roasts.',
  () => ({
    host: `--bean: ${BEAN};`,
    rule: `${F} { ${B(bean(inkOf(1, 4, 5)))} ${A(bean(inkOf(1, 4, 5)))} }${TR}`,
  }),
  {
    pal: 11,
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['ovals', 'curves'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['packaging', 'textile', 'card-texture'] },
  }
);

// -- the drawer ----------------------------------------------------------------------

// Buttons: a disc with two or four holes bored right through, a raised lip
// drawn as a ring inside the rim.
const HOLES2 = [holeL(41, 50, 5.6), holeL(59, 50, 5.6)].join(', ');
const HOLES4 = [holeL(41.5, 41.5, 5), holeL(58.5, 41.5, 5), holeL(41.5, 58.5, 5), holeL(58.5, 58.5, 5)].join(', ');

add(
  'Buttons',
  'A spilled tin of sewing buttons in mixed colors and sizes, each with a raised lip and two or four holes right through it.',
  () => ({
    host: `--h2: ${HOLES2}; --h4: ${HOLES4};`,
    rule: `${F} {
      --holes: @p(@var(--h2), @var(--h4));
      transform: translate(@r(-12%, 12%), @r(-12%, 12%)) rotate(@r(0deg, 360deg)) scale(@r(.62, 1.05)); z-index: @ri(1, 9);
      border-radius: 50%; background: ${inkOf(1, 2, 3, 4, 5)};
      -webkit-mask: @var(--holes); mask: @var(--holes); -webkit-mask-composite: source-in; mask-composite: intersect;
      ${B(`inset: 13%; border-radius: 50%; background: ${inkOf(1, 2, 3, 4, 5)}; opacity: .55; ${maskV(ringL(84, 100))}`)}
    }${TR}`,
  }),
  {
    pal: 0,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['circles', 'dots', 'rings'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// Dice: a rounded face with the pips of one to six, tossed a little askew.
const PIP = 15;
const DIE = (() => {
  const L = 27;
  const M = 50;
  const H = 73;
  const faces = [
    [[M, M]],
    [[L, L], [H, H]],
    [[L, L], [M, M], [H, H]],
    [[L, L], [H, L], [L, H], [H, H]],
    [[L, L], [H, L], [M, M], [L, H], [H, H]],
    [[L, L], [H, L], [L, M], [H, M], [L, H], [H, H]],
  ];
  return faces.map((f, i) => `--f${i + 1}: ${f.map(([x, y]) => dotL(x, y, PIP)).join(', ')};`).join(' ');
})();

add(
  'Dice',
  'Dice faces showing one to six, tossed a little askew in rows: colored cubes with their pips picked out in a second ink.',
  () => ({
    host: DIE,
    rule: `${F} {
      --pips: @p(@var(--f1), @var(--f2), @var(--f3), @var(--f4), @var(--f5), @var(--f6));
      transform: translate(@r(-5%, 5%), @r(-5%, 5%)) rotate(@r(-16deg, 16deg)) scale(.78);
      border-radius: 18%; background: ${inkOf(2, 3, 4)};
      ${B(`inset: 0; background: ${inkOf(1, 5)}; -webkit-mask: @var(--pips); mask: @var(--pips);`)}
    }${TR}`,
  }),
  {
    pal: 13,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'dots', 'grid'], mood: ['playful', 'bold'], density: 'medium', goodFor: ['packaging', 'poster', 'wallpaper'] },
  }
);

export const sectionI = { title: 'I. Pantry', all };
