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

// Kiwi: green flesh round a burst-shaped hollow core, a ring of dark seeds
// and a thin skin, laid as ovals that turn a quarter from cell to cell.
const KIWI = (() => {
  const rays = 30;
  const core = [];
  for (let i = 0; i < rays; i++) {
    const t = (i / rays) * TAU;
    core.push(at(8.5, t), at(23 + (i % 3 === 0 ? 3 : 0), t + TAU / rays / 2 - 0.012), at(23 + (i % 3 === 0 ? 3 : 0), t + TAU / rays / 2 + 0.012));
  }
  const flesh = polyOf(compound([circlePts(50, 50, 50, 64)], [core]));
  const rand = rng(31);
  const seeds = [];
  const n = 34;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU + (rand() - 0.5) * 0.06;
    const r = 32 + (rand() - 0.5) * 4;
    const len = 2.6 + rand() * 1.2;
    const pts = [];
    for (let k = 0; k < 12; k++) {
      const u = (k / 12) * TAU;
      const s = len * Math.cos(u);
      const w = 1.25 * Math.sin(u) * (0.55 + 0.45 * Math.cos(u));
      pts.push([50 + (r + s) * Math.cos(t) - w * Math.sin(t), 50 + (r + s) * Math.sin(t) + w * Math.cos(t)]);
    }
    seeds.push(pts);
  }
  return { flesh, seeds: polyOf(compound(seeds)) };
})();

add(
  'Kiwi',
  'Kiwi slices as ovals turning a quarter from cell to cell: green or gold flesh, a ring of dark seeds and a pale starburst core.',
  () => ({
    host: `--flesh: ${KIWI.flesh}; --seeds: ${KIWI.seeds};`,
    rule: `@even { transform: rotate(90deg) scale(.94, .76); } @odd { transform: scale(.94, .76); } ${F} {
      background: ${inkOf(2, 3, 4)}; ${clip('@var(--flesh)')}
      ${B(`inset: 0; border-radius: 50%; background: var(--color1); ${maskV(ringL(91, 100))}`)}
      ${A(`inset: 0; background: var(--color5); ${clip('@var(--seeds)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F6F1E4', '#6E4B2A', '#7FAF2F', '#A6C84A', '#E2B43B', '#2A1C10'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['ovals', 'radial', 'dots', 'checkerboard'], mood: ['playful', 'organic'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// Strawberry: a heart-shouldered berry with its seeds as holes in a
// staggered grid, under a crown of pointed leaves and a stalk.
const BERRY = (() => {
  const body = spline(
    [[50, 22], [66, 18], [80, 25], [84, 40], [78, 58], [66, 76], [54, 89], [50, 91], [46, 89], [34, 76], [22, 58], [16, 40], [20, 25], [34, 18]],
    6
  );
  const inside = (x, y) => {
    let c = false;
    for (let i = 0, j = body.length - 1; i < body.length; j = i++) {
      const [xi, yi] = body[i];
      const [xj, yj] = body[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const seeds = [];
  for (let row = 0; row < 8; row++) {
    const y = 33 + row * 7.4;
    for (let col = -5; col <= 5; col++) {
      const x = 50 + col * 9 + (row % 2 ? 4.5 : 0);
      if ([[0, 0], [5, 0], [-5, 0], [0, 5], [0, -5]].every(([dx, dy]) => inside(x + dx, y + dy))) {
        seeds.push(ellipsePts(x, y, 1.3, 2.1, 12, (x - 50) * 0.012));
      }
    }
  }
  const leaves = [];
  for (let i = 0; i < 14; i++) {
    const t = (i / 14) * TAU;
    const r = i % 2 ? 4 : 17;
    leaves.push([50 + r * Math.cos(t), 21 + r * 0.55 * Math.sin(t)]);
  }
  const stalk = strokePts([[50, 21], [51, 14], [54, 7]], 1.8, 5);
  return { body: polyOf(compound([body], seeds)), crown: polyOf(compound([leaves, stalk])) };
})();

add(
  'Strawberry',
  'Strawberries tumbling at easy angles, each berry dotted with seed holes in staggered rows under a crown of pointed leaves and a short stalk.',
  () => ({
    host: `--berry: ${BERRY.body}; --crown: ${BERRY.crown};`,
    rule: `${F} {
      transform: translate(@r(-8%, 8%), @r(-8%, 8%)) rotate(@r(-35deg, 35deg)) scale(@r(.82, 1.08)); z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 2, 5)}; ${clip('@var(--berry)')}`)}
      ${A(`inset: 0; background: ${inkOf(3, 4)}; ${clip('@var(--crown)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#FDF0E9', '#E3354B', '#F07F90', '#2F7D3B', '#6AAF4A', '#B3172F'],
    grid: '5x7',
    freq: 0.9,
    tg: '5x5',
    tf: 0.9,
    meta: { tags: ['dots', 'stars', 'curves'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// Cherries: a pair hanging from stalks that meet at the top, a leaf
// beside the joint, a glint cut out of each cherry.
const CHERRY = (() => {
  const quad = (p0, c, p1, n = 16) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n;
      return [0, 1].map((j) => (1 - t) ** 2 * p0[j] + 2 * (1 - t) * t * c[j] + t * t * p1[j]);
    });
  const glint = (x, y) => ellipsePts(x - 5.5, y - 5.5, 3.4, 1.9, 14, -0.75);
  const fruit = compound([circlePts(33, 70, 14.5, 40), circlePts(65, 63, 14.5, 40)], [glint(33, 70), glint(65, 63)]);
  const leaf = (() => {
    const pts = [];
    const n = 12;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      pts.push([57 + 26 * u, 15 - 9 * u - 5.5 * Math.sin(Math.PI * u)]);
    }
    for (let i = n - 1; i > 0; i--) {
      const u = i / n;
      pts.push([57 + 26 * u, 15 - 9 * u + 4 * Math.sin(Math.PI * u)]);
    }
    return pts;
  })();
  const stems = [
    strokePts(quad([33, 57], [36, 30], [57, 15]), 1.5, 5),
    strokePts(quad([65, 50], [64, 30], [57, 15]), 1.5, 5),
    leaf,
  ];
  return { fruit: polyOf(fruit), stems: polyOf(compound(stems)) };
})();

add(
  'Cherries',
  'Pairs of cherries on stalks joined at the top with a single leaf, a glint on every cherry, swinging at easy angles across a dark ground.',
  () => ({
    host: `--fruit: ${CHERRY.fruit}; --stems: ${CHERRY.stems};`,
    rule: `${F} {
      transform: translate(@r(-8%, 8%), @r(-6%, 6%)) rotate(@r(-30deg, 30deg)) scale(@r(.85, 1.05)); z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 2)}; ${clip('@var(--fruit)')}`)}
      ${A(`inset: 0; background: ${inkOf(3, 4)}; ${clip('@var(--stems)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#16253D', '#E63946', '#FF8FA3', '#7FB069', '#E9C46A'],
    grid: '5x7',
    freq: 0.9,
    tg: '5x5',
    tf: 0.9,
    meta: { tags: ['circles', 'curves', 'leaves'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// Avocado: a halved avocado, the dark skin as the cell's own outline, the
// flesh inset inside it and the round stone in the wide end; columns
// alternate stalk-up and stalk-down.
const AVO = (() => {
  const skin = spline(
    [[50, 5], [60, 8], [66, 18], [70, 33], [80, 50], [84, 67], [80, 84], [66, 94], [50, 97], [34, 94], [20, 84], [16, 67], [20, 50], [30, 33], [34, 18], [40, 8]],
    6
  );
  const flesh = skin.map(([x, y]) => [50 + (x - 50) * 0.85, 64 + (y - 64) * 0.88]);
  return { skin: polyOf(skin), flesh: polyOf(flesh) };
})();

add(
  'Avocado',
  'Halved avocados in columns, stalk up then stalk down: a dark skin, a pale green rim of flesh and a round brown stone in the wide end.',
  () => ({
    host: `--skin: ${AVO.skin}; --avo: ${AVO.flesh};`,
    rule: `@x(even) { transform: rotate(180deg) scale(.9); } @x(odd) { transform: scale(.9); } ${F} {
      background: ${inkOf(1, 2)}; ${clip('@var(--skin)')}
      ${B(`inset: 0; background: ${inkOf(3, 4)}; ${clip('@var(--avo)')}`)}
      ${A(`left: 34.5%; top: 52.5%; width: 31%; height: 31%; border-radius: 50%; background: ${inkOf(5, 6)};
        ${maskV('radial-gradient(ellipse 20% 12% at 34% 30%, #00000066 98%, #000 100%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F7D9D3', '#2F4A2C', '#46663A', '#C5D86D', '#E8E59C', '#7A4B2A', '#A8693E'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['ovals', 'circles', 'curves'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'packaging', 'card-texture'] },
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

// Peppermint: a striped mint in a cellophane twist. The cell is clipped to
// the wrapper's outline (two pinked fans and the disc between them) and
// painted the wrapper's color; the mint and its curved stripes sit on top.
const MINT = (() => {
  const R = 28;
  const fan = (side) => {
    const x = (d) => 50 + side * d;
    const pts = [[x(R - 9), 39], [x(R + 3), 47], [x(46), 31]];
    const teeth = 5;
    for (let i = 1; i < teeth * 2; i++) pts.push([x(46 - (i % 2 ? 3.5 : 0)), 31 + (38 * i) / (teeth * 2)]);
    pts.push([x(46), 69], [x(R + 3), 53], [x(R - 9), 61]);
    return pts;
  };
  const wrap = polyOf(compound([circlePts(50, 50, R + 0.5, 48), fan(1), fan(-1)]));
  const arms = [];
  const n = 7;
  for (let k = 0; k < n; k++) {
    const t0 = (k / n) * TAU;
    const edge = (off) =>
      Array.from({ length: 13 }, (_, i) => {
        const r = 2 + ((R - 2) * i) / 12;
        const w = 0.02 + 0.3 * (r / R);
        return at(r, t0 + 1.1 * (r / R) + off * w);
      });
    const a = edge(-1);
    const b = edge(1).reverse();
    arms.push([...a, ...b]);
  }
  return { wrap, swirl: polyOf(compound(arms)) };
})();

add(
  'Peppermint',
  'Starlight mints in twisted cellophane: a white disc with curving red or green stripes between two pinked wrapper ends, scattered at every angle.',
  () => ({
    host: `--wrap: ${MINT.wrap}; --swirl: ${MINT.swirl};`,
    rule: `${F} {
      transform: translate(@r(-6%, 6%), @r(-6%, 6%)) rotate(@r(0deg, 360deg)) scale(@r(.8, 1.05)); z-index: @ri(1, 9);
      background: ${inkOf(4, 5)}; ${clip('@var(--wrap)')}
      ${B(`inset: 22%; border-radius: 50%; background: var(--color1);`)}
      ${A(`inset: 0; background: ${inkOf(2, 3)}; ${clip('@var(--swirl)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#2E5266', '#FBF8F1', '#E63946', '#2A9D8F', '#9FB7C9', '#D6E2E9'],
    grid: '5x7',
    freq: 0.9,
    tg: '5x5',
    tf: 0.9,
    meta: { tags: ['circles', 'spirals', 'radial'], mood: ['festive', 'playful'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'textile'] },
  }
);

// Allsorts: one roll per cell decides the sweet, and every part reads it:
// a sandwich of fondant and licorice, a coconut wheel round a licorice
// core, or a square of fondant framing one.
const SORTS = [
  'linear-gradient(180deg, #000 0 27%, transparent 27% 73%, #000 73%)',
  'radial-gradient(circle closest-side, transparent 40%, #000 40%)',
  'linear-gradient(90deg, #000 0 27%, transparent 27% 73%, #000 73%), linear-gradient(180deg, #000 0 27%, transparent 27% 73%, #000 73%)',
];

add(
  'Allsorts',
  'Licorice allsorts in a loose heap of rows: striped sandwiches of fondant and licorice, coconut wheels round a black core and framed licorice squares.',
  () => ({
    host: SORTS.map((v, i) => `--m${i}: ${v};`).join(' ') + ' --mid: linear-gradient(180deg, transparent 0 38%, #000 38% 62%, transparent 62%);',
    rule: `${F} {
      --k: @p(0, 1, 2);
      --mk: @match($(k) == 0, @var(--m0), $(k) == 1, @var(--m1), @var(--m2));
      transform: translate(@r(-5%, 5%), @r(-5%, 5%)) rotate(@p(0deg, 90deg)) rotate(@r(-12deg, 12deg)) scale(.8);
      border-radius: @match($(k) == 1, 50%, 7%); background: var(--color1);
      ${B(`inset: 0; border-radius: inherit; background: ${inkOf(2, 3, 4, 5)}; -webkit-mask: @var(--mk); mask: @var(--mk);`)}
      ${A(`inset: 0; background: ${inkOf(2, 3, 4, 5)}; opacity: @match($(k) == 0, 1, 0%); ${maskV('@var(--mid)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F3EEE4', '#1E1B1C', '#F49AC1', '#FFD23F', '#F7F3EA', '#5FB7D4'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'circles', 'stripes', 'blocks'], mood: ['playful', 'retro', 'bold'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'poster'] },
  }
);

// Gingerbread: a row of gingerbread men holding hands, arms running to the
// edges of the cell so neighbors join; the icing (eyes, smile, buttons and
// zigzag cuffs) is a second piece in a second ink.
const GINGER = (() => {
  const armY = (x) => (x < 50 ? 50 - (x / 50) * 8.5 : 41.5 + ((x - 50) / 50) * 8.5);
  const body = [
    circlePts(50, 22, 12.5, 40),
    strokePts([[50, 36], [50, 60]], 14, 8),
    strokePts([[-3, armY(0) + 0.5], [25, armY(25)], [50, armY(50)], [75, armY(75)], [103, armY(100) + 0.5]], 6.4, 6),
    strokePts([[44, 62], [33, 90]], 7.5, 8),
    strokePts([[56, 62], [67, 90]], 7.5, 8),
  ];
  const zig = (pts) => strokePts(pts, 1.05, 4);
  const cuffs = [
    zig([[13, armY(13) - 6], [15, armY(13) - 3], [11, armY(13)], [15, armY(13) + 3], [13, armY(13) + 6]]),
    zig([[87, armY(87) - 6], [85, armY(87) - 3], [89, armY(87)], [85, armY(87) + 3], [87, armY(87) + 6]]),
    zig([[30.7, 79], [33.7, 82], [36.7, 79], [39.7, 82], [42.7, 79]]),
    zig([[57.3, 79], [60.3, 82], [63.3, 79], [66.3, 82], [69.3, 79]]),
  ];
  const smile = strokePts(Array.from({ length: 9 }, (_, i) => at(5.5, Math.PI * (0.2 + (0.6 * i) / 8), 50, 23)), 1.05, 4);
  const icing = [
    circlePts(45.5, 19.5, 1.9, 12),
    circlePts(54.5, 19.5, 1.9, 12),
    smile,
    circlePts(50, 41, 2.3, 14),
    circlePts(50, 49.5, 2.3, 14),
    circlePts(50, 58, 2.3, 14),
    ...cuffs,
  ];
  return { body: polyOf(compound(body)), icing: polyOf(compound(icing)) };
})();

add(
  'Gingerbread',
  'Rows of gingerbread men holding hands in a long chain, each piped with white or pink icing: dot eyes, a smile, three buttons and zigzag cuffs.',
  () => ({
    host: `--man: ${GINGER.body}; --icing: ${GINGER.icing};`,
    rule: `${F} {
      ${B(`inset: 0; background: ${inkOf(1, 2, 3)}; ${clip('@var(--man)')}`)}
      ${A(`inset: 0; background: ${inkOf(4, 5)}; ${clip('@var(--icing)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#8E1B1B', '#C47A3A', '#A65E2E', '#D9965B', '#FFF6EA', '#F7B2C4'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['circles', 'zigzags', 'dots'], mood: ['festive', 'playful'], density: 'medium', goodFor: ['packaging', 'textile', 'wallpaper'] },
  }
);

// Linzer: a scalloped shortbread with a window cut in it (a heart, a star,
// a ring or a flower) over a disc of jam that shows through.
const LINZER = (() => {
  const edge = Array.from({ length: 120 }, (_, i) => {
    const t = (i / 120) * TAU;
    return at(41 + 4 * Math.abs(Math.cos(6 * t)) ** 0.55, t);
  });
  const heart = Array.from({ length: 40 }, (_, i) => {
    const t = (i / 40) * TAU;
    const x = 16 * Math.sin(t) ** 3;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return [50 + x * 0.78, 48 + y * 0.78];
  });
  const star = Array.from({ length: 10 }, (_, i) => at(i % 2 ? 6.5 : 15, (i / 10) * TAU - Math.PI / 2, 50, 51.5));
  const flower = Array.from({ length: 60 }, (_, i) => {
    const t = (i / 60) * TAU;
    return at(9 + 4.5 * Math.cos(6 * t), t);
  });
  const ring = circlePts(50, 50, 11.5, 32);
  return [heart, star, flower, ring].map((h) => polyOf(compound([edge], [h])));
})();

add(
  'Linzer',
  'Linzer cookies with scalloped edges, each with a heart, star, flower or round window cut through to the jam beneath.',
  () => ({
    host: LINZER.map((v, i) => `--lz${i}: ${v};`).join(' '),
    rule: `${F} {
      transform: translate(@r(-5%, 5%), @r(-5%, 5%)) rotate(@r(-20deg, 20deg)) scale(.92);
      ${B(`left: 28%; top: 28%; width: 44%; height: 44%; border-radius: 50%; background: ${inkOf(3, 4, 5)};`)}
      ${A(`inset: 0; background: ${inkOf(1, 2)}; ${clip('@p(@var(--lz0), @var(--lz1), @var(--lz2), @var(--lz3))')}`)}
    }${TR}`,
  }),
  {
    palette: ['#DCE8EF', '#E2B877', '#F4E3C3', '#C2263A', '#7D2E68', '#F29E38'],
    grid: '5x7',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['scallops', 'circles', 'stars'], mood: ['festive', 'playful', 'elegant'], density: 'medium', goodFor: ['packaging', 'textile', 'card-texture'] },
  }
);

// Ice Cream: a waffle cone (its grid drawn square in an element turned an
// eighth, so the lines are axis-aligned where they are drawn) under a
// scoop with drips, and a cherry tucked in behind the top.
const CONE = (() => {
  const tri = roundCorners([[33, 53], [67, 53], [50, 97]], [2, 2, 3], 4);
  const local = turn(tri, -Math.PI / 4);
  const scoop = [];
  for (let i = 0; i <= 24; i++) scoop.push(at(19.5, Math.PI + (Math.PI * i) / 24, 50, 39));
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const x = 69.5 - 39 * u;
    const drip = Math.max(0, Math.sin(Math.PI * 3 * u + 0.5)) ** 3 * 8 * (0.6 + 0.4 * Math.sin(7 * u));
    scoop.push([x, 50 + 3 * Math.sin(Math.PI * u) + drip]);
  }
  return { cone: polyOf(local), scoop: polyOf(scoop) };
})();

add(
  'Ice Cream',
  'Ice cream cones in rows, each leaning its own way: a waffle cone with a diamond grid, a dripping scoop and a cherry on top.',
  () => ({
    host: `--cone: ${CONE.cone}; --scoop: ${CONE.scoop};
      --waffle: repeating-linear-gradient(0deg, #000 0 8%, #00000052 8% 10%), repeating-linear-gradient(90deg, #000 0 8%, #00000052 8% 10%);`,
    rule: `${F} {
      transform: translate(@r(-5%, 5%), @r(-3%, 3%)) rotate(@r(-14deg, 14deg)) scale(.95);
      background: radial-gradient(circle at 50% 17%, var(--color6) 0 6.5%, transparent 6.5%);
      ${B(`inset: 0; background: ${inkOf(1, 2)}; ${clip('@var(--cone)')} transform: rotate(45deg);
        -webkit-mask: @var(--waffle); mask: @var(--waffle); -webkit-mask-composite: source-in; mask-composite: intersect;`)}
      ${A(`inset: 0; background: ${inkOf(3, 4, 5)}; ${clip('@var(--scoop)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#BDE4E0', '#E0A458', '#B7793A', '#F48FB1', '#FFF7E6', '#6B3E2E', '#D7263D'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'circles', 'diamonds', 'grid'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['packaging', 'textile', 'poster'] },
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

// Emmental: every cell cut on the diagonal into two wedges of cheese, each
// bored with holes whose places and sizes are rolled per wedge, so a hole
// that meets an edge leaves a bite in it.
const WEDGE = (() => {
  const g = 1.6;
  const d = g * Math.SQRT2;
  const a = [[g, g], [100 - g - d, g], [g, 100 - g - d]];
  const b = [[100 - g, 100 - g], [g + d, 100 - g], [100 - g, g + d]];
  return { a: polyOf(roundCorners(a, [3, 2, 2], 4)), b: polyOf(roundCorners(b, [3, 2, 2], 4)) };
})();
const cheeseHoles = () =>
  Array.from(
    { length: 4 },
    () => 'radial-gradient(circle at @r(4%, 70%) @r(4%, 70%), transparent @r(5%, 12%), #000 0)'
  ).join(', ');
const cheeseHolesB = () =>
  Array.from(
    { length: 4 },
    () => 'radial-gradient(circle at @r(30%, 96%) @r(30%, 96%), transparent @r(5%, 12%), #000 0)'
  ).join(', ');

add(
  'Emmental',
  'Wedges of cheese, two to a square and turned every way, each bored with round holes of every size that bite into its edges.',
  () => ({
    host: `--wa: ${WEDGE.a}; --wb: ${WEDGE.b};`,
    rule: `${F} {
      transform: rotate(@p(0deg, 90deg, 180deg, 270deg));
      ${B(`inset: 0; background: ${inkOf(1, 2, 3)}; ${clip('@var(--wa)')} ${maskI(cheeseHoles())}`)}
      ${A(`inset: 0; background: ${inkOf(1, 2, 3)}; ${clip('@var(--wb)')} ${maskI(cheeseHolesB())}`)}
    }${TR}`,
  }),
  {
    palette: ['#3D5A80', '#F7D35E', '#F4A940', '#FBE7A1'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'circles', 'diagonals'], mood: ['playful', 'bold'], density: 'dense', goodFor: ['packaging', 'poster', 'wallpaper'] },
  }
);

// Farfalle: a pasta bow pinched at the waist with pinked ends, faint ridges
// across it and two creases cut beside the pinch.
const BOW = (() => {
  const top = [];
  const bot = [];
  const n = 30;
  for (let i = 0; i <= n; i++) {
    const x = 13 + (74 * i) / n;
    const d = Math.abs(x - 50) / 37;
    const h = 5.5 + 17 * d ** 1.1 - 2 * Math.sin(Math.PI * d);
    top.push([x, 50 - h]);
    bot.push([x, 50 + h]);
  }
  const end = (x0, side) => {
    const pts = [];
    const teeth = 7;
    for (let i = 1; i < teeth * 2; i++) {
      const y = 50 - 20.5 + (41 * i) / (teeth * 2);
      pts.push([x0 + side * (i % 2 ? 2.6 : 0), y]);
    }
    return side > 0 ? pts : pts.reverse();
  };
  const outline = [...top, ...end(87, 1), ...bot.reverse(), ...end(13, -1)];
  const crease = (x) => [[x, 43], [x + 0.9, 50], [x, 57], [x - 0.9, 50]];
  return polyOf(compound([outline], [crease(44.5), crease(55.5)]));
})();

add(
  'Farfalle',
  'Farfalle bows in plain, spinach and tomato colors, scattered at every angle: pinched at the middle, pinked at both ends and ridged across.',
  () => ({
    host: `--bow: ${BOW};`,
    rule: `${F} {
      transform: translate(@r(-10%, 10%), @r(-10%, 10%)) rotate(@r(0deg, 180deg)) scale(@r(.85, 1.1)); z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(2, 3, 4)}; ${clip('@var(--bow)')}
        ${maskV('repeating-linear-gradient(90deg, #000 0 2.6%, #000000a8 2.6% 4%)')}`)}
    }${TR}`,
  }),
  {
    pal: 2,
    inks: 4,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'zigzags', 'stripes'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['packaging', 'textile', 'card-texture'] },
  }
);

// Peapod: an open pod (a pointed lens with a narrower lens cut out of it,
// and a curl of stalk) holding five peas, the pods drifting on a noise field.
const POD = (() => {
  const lens = (x0, x1, h, n = 26) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      pts.push([x0 + (x1 - x0) * u, 50 - h * Math.sin(Math.PI * u) ** 0.8]);
    }
    for (let i = n - 1; i > 0; i--) {
      const u = i / n;
      pts.push([x0 + (x1 - x0) * u, 50 + h * Math.sin(Math.PI * u) ** 0.8]);
    }
    return pts;
  };
  const stalk = strokePts([[89, 50], [94, 47], [96, 41], [93, 37]], 1.4, 5);
  const pod = polyOf(compound([lens(6, 92, 19), stalk], [lens(14, 84, 13.5)]));
  const peas = [24, 37, 50, 63, 76].map((x) => dotL(x, 50, 14.5)).join(', ');
  return { pod, peas };
})();

add(
  'Peapod',
  'Open pea pods drifting in a slow current across the sheet, each a pointed green shell with a curl of stalk and a row of five round peas inside.',
  () => ({
    host: `--pod: ${POD.pod}; --peas: ${POD.peas};`,
    rule: `${F} {
      transform: rotate(@rn(-100, 100, .6)deg) rotate(@r(-10deg, 10deg)) scale(@r(.95, 1.12)); z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 2)}; ${clip('@var(--pod)')}`)}
      ${A(`inset: 0; background: ${inkOf(3, 4)}; ${maskV('@var(--peas)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#FBF6E9', '#2F6B3C', '#4F9D5D', '#8CC084', '#B9D86A'],
    grid: '5x7',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['ovals', 'dots', 'curves'], mood: ['organic', 'calm', 'playful'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// Cocktail Olives: a pick with a ball on its end skewering three stuffed
// olives. The pimentos are the cell's own background, under the pick and
// the olives, so the pick runs through them and only their caps show.
const OLIVE = (() => {
  const xs = [32, 53, 74];
  const olives = xs.map((x) => ellipsePts(x, 50, 9.6, 7.4, 32));
  const pick = [strokePts([[9, 50], [95, 50]], 1.15, 4), circlePts(9, 50, 4.4, 20)];
  const pim = xs
    .map((x) => {
      const cx = x - 9;
      const r = pct((3.4 / Math.hypot(Math.max(cx, 100 - cx), 50)) * 100);
      return `radial-gradient(circle at ${cx}% 50%, @var(--pim) 0 ${r}, transparent ${r})`;
    })
    .join(', ');
  return { olives: polyOf(compound(olives)), pick: polyOf(compound(pick)), pim };
})();

add(
  'Cocktail Olives',
  'Cocktail picks at every angle, each skewering three stuffed olives with the red pimento showing at their ends.',
  () => ({
    host: `--olives: ${OLIVE.olives}; --pick: ${OLIVE.pick};`,
    rule: `${F} {
      --pim: ${inkOf(4, 5)};
      transform: translate(@r(-6%, 6%), @r(-6%, 6%)) rotate(@r(0deg, 360deg)) scale(@r(.95, 1.1)); z-index: @ri(1, 9);
      background: ${OLIVE.pim};
      ${B(`inset: 0; background: ${inkOf(3, 6)}; ${clip('@var(--pick)')}`)}
      ${A(`inset: 0; background: ${inkOf(1, 2)}; ${clip('@var(--olives)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F1E9D8', '#6B8E23', '#3D4A1F', '#C9A227', '#D62828', '#F77F00', '#2B2D42'],
    grid: '5x7',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['ovals', 'lines', 'dots'], mood: ['retro', 'playful'], density: 'medium', goodFor: ['packaging', 'poster', 'textile'] },
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

// Card Suits: hearts, diamonds, clubs and spades on a card-back lattice,
// one roll per cell choosing the suit and the red or black ink to match;
// every other row stands on its head, and a small lozenge marks each corner.
const SUITS = (() => {
  const heartPts = (cx, cy, k, flip = 1) =>
    Array.from({ length: 48 }, (_, i) => {
      const t = (i / 48) * TAU;
      const x = 16 * Math.sin(t) ** 3;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return [cx + x * k, cy + flip * y * k];
    });
  const heart = heartPts(50, 47, 1.3);
  const diamond = (() => {
    const pts = [];
    const side = (p, q, bow) => {
      for (let i = 0; i < 8; i++) {
        const u = i / 8;
        const mx = p[0] + (q[0] - p[0]) * u;
        const my = p[1] + (q[1] - p[1]) * u;
        const b = bow * Math.sin(Math.PI * u);
        pts.push([mx + b * Math.sign(50 - mx), my + b * Math.sign(50 - my)]);
      }
    };
    const v = [[50, 24], [72, 50], [50, 76], [28, 50]];
    for (let i = 0; i < 4; i++) side(v[i], v[(i + 1) % 4], 1.8);
    return pts;
  })();
  const stem = [[50, 56], [56, 72], [60, 76], [40, 76], [44, 72]];
  const spade = [heartPts(50, 50, 1.15, -1), stem];
  const club = [circlePts(50, 37, 10.5, 32), circlePts(39, 55, 10.5, 32), circlePts(61, 55, 10.5, 32), [[50, 40], [56, 52], [44, 52]], stem];
  return {
    heart: polyOf(heart),
    diamond: polyOf(diamond),
    club: polyOf(compound(club)),
    spade: polyOf(compound(spade)),
  };
})();

add(
  'Card Suits',
  'A card-back lattice of hearts, diamonds, clubs and spades, red and black, every other row upside down, with a small lozenge at each crossing.',
  () => ({
    host: `--hearts: ${SUITS.heart}; --diamonds: ${SUITS.diamond}; --clubs: ${SUITS.club}; --spades: ${SUITS.spade};`,
    rule: `${F} {
      --k: @p(0, 1, 2, 3);
      ${B(`inset: 0; background: @match($(k) < 2, ${inkOf(1, 2)}, ${inkOf(3, 4)});
        ${clip('@match($(k) == 0, @var(--hearts), $(k) == 1, @var(--diamonds), $(k) == 2, @var(--clubs), @var(--spades))')}
        transform: rotate(@match(y % 2 == 0, 180deg, 0deg)) scale(.86);`)}
      ${A(`left: -10%; top: -10%; width: 20%; height: 20%; background: ${inkOf(5)}; ${clip('polygon(50% 8%, 82% 50%, 50% 92%, 18% 50%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F7F1E3', '#C8102E', '#E04A5F', '#1F1F24', '#33415C', '#C9A227'],
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['grid', 'diamonds', 'curves'], mood: ['bold', 'retro', 'elegant'], density: 'medium', goodFor: ['packaging', 'textile', 'wallpaper'] },
  }
);

// Marbles: glass marbles with a twisted cat's eye of three curved vanes and
// a glint of light, rolled together at every size.
const VANES = (() => {
  const blades = [];
  for (let k = 0; k < 3; k++) {
    const t0 = (k / 3) * TAU;
    const side = (s) =>
      Array.from({ length: 15 }, (_, i) => {
        const u = i / 14;
        const r = 2 + 34 * u;
        const w = 0.42 * Math.sin(Math.PI * u) ** 0.9 * (1 - 0.35 * u);
        return at(r, t0 + 1.3 * u + s * w);
      });
    blades.push([...side(-1), ...side(1).reverse()]);
  }
  return polyOf(compound(blades));
})();

add(
  'Marbles',
  'Glass marbles rolled together at every size, each a colored sphere with a twisted three-vaned cat\'s eye inside and a bright glint of light.',
  () => ({
    host: `--vanes: ${VANES};`,
    rule: `${F} {
      transform: translate(@r(-14%, 14%), @r(-14%, 14%)) rotate(@r(0deg, 360deg)) scale(@r(.55, 1)); z-index: @ri(1, 9);
      border-radius: 50%; background: ${inkOf(1, 2, 5)};
      ${B(`inset: 0; background: ${inkOf(3, 4)}; ${clip('@var(--vanes)')}`)}
      ${A(`left: 24%; top: 18%; width: 22%; height: 14%; border-radius: 50%; background: var(--color3); opacity: .9; transform: rotate(-35deg);`)}
    }${TR}`,
  }),
  {
    pal: 41,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['circles', 'spirals', 'dots'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'poster'] },
  }
);

// Spools: cotton reels standing in rows, two wooden flanges and the wound
// thread between them, ridged with fine lines, each reel wound a little
// fuller or emptier than the next.
const SPOOL = (() => {
  const rr = (x0, y0, x1, y1, r) => roundCorners([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], r, 4);
  const flanges = [rr(20, 9, 80, 21, 3), rr(20, 79, 80, 91, 3)];
  const core = rr(36, 18, 64, 82, 1);
  return { wood: polyOf(compound([...flanges, core])) };
})();

add(
  'Spools',
  'Cotton reels standing in rows like a haberdasher\'s shelf: wooden flanges top and bottom and the colored thread between them, some reels fuller than others.',
  () => ({
    host: `--wood: ${SPOOL.wood};`,
    rule: `${F} {
      transform: scale(.9);
      ${B(`inset: 0; background: ${inkOf(1, 2)}; ${clip('@var(--wood)')}`)}
      ${A(`left: 25%; top: 21%; width: 50%; height: 58%; background: ${inkOf(3, 4, 5, 6)}; transform: scaleX(@r(.5, 1));
        ${maskV('repeating-linear-gradient(180deg, #000 0 4.4%, #00000080 4.4% 6%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F3EEE6', '#C99A5B', '#A87443', '#D7263D', '#1B998B', '#2E294E', '#F49D37'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['blocks', 'stripes', 'grid'], mood: ['retro', 'calm'], density: 'medium', goodFor: ['textile', 'packaging', 'card-texture'] },
  }
);

// Paper Clips: one bent wire, three straight runs and three turns of
// shrinking radius, drawn as a single stroke outline.
const CLIP = (() => {
  const path = [];
  const line = (p, q, n = 8) => {
    for (let i = 0; i < n; i++) path.push([p[0] + ((q[0] - p[0]) * i) / n, p[1] + ((q[1] - p[1]) * i) / n]);
  };
  const turnArc = (cx, cy, r, a0, a1, n = 12) => {
    for (let i = 0; i < n; i++) path.push(at(r, a0 + ((a1 - a0) * i) / n, cx, cy));
  };
  line([36, 47], [70, 47]);
  turnArc(70, 51, 4, -Math.PI / 2, Math.PI / 2);
  line([70, 55], [22, 55]);
  turnArc(22, 48.5, 6.5, Math.PI / 2, (3 * Math.PI) / 2);
  line([22, 42], [80, 42]);
  turnArc(80, 51, 9, -Math.PI / 2, Math.PI / 2);
  line([80, 60], [34, 60]);
  path.push([34, 60]);
  const big = path.map(([x, y]) => [50 + (x - 52) * 1.2, 50 + (y - 51) * 1.2]);
  return polyOf(strokePts(big, 1.35, 6));
})();

add(
  'Paper Clips',
  'Bright vinyl paper clips spilled across the desk at every angle, each one bent wire looping back on itself in three runs.',
  () => ({
    host: `--clip: ${CLIP};`,
    rule: `${F} {
      transform: translate(@r(-12%, 12%), @r(-12%, 12%)) rotate(@r(0deg, 180deg)) scale(@r(.85, 1.15)); z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 2, 3, 4, 5)}; ${clip('@var(--clip)')}`)}
    }${TR}`,
  }),
  {
    pal: 25,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['lines', 'curves'], mood: ['playful', 'technical'], density: 'sparse', goodFor: ['card-texture', 'hero-background', 'packaging'] },
  }
);

export const sectionI = { title: 'I. Pantry', all };
