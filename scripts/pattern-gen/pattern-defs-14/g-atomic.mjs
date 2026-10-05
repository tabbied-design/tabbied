// G. Atomic - mid-century to nineties pop: starbursts, boomerangs, supergraphics, squiggles.
//
// Graphic pop from the fifties to the nineties, roughly in order:
//
//   1950s  Starburst, Sputnik, Molecule, Kidney, Atom, Googie, Rabbit Ears
//   1960s  Mod Roundels, Mod Squares, Daisy, Kapow, Lava Lamp
//   1970s  Supergraphic, Groovy, Mushroom, Disco, Record, Pill
//   1980s  Squiggle, Terrazzo, Memphis Mix, Lightning, Pixel Critters,
//   1990s  Off Register, Splatter
//
// Most motifs are polygons computed here once and parked on the host as a
// custom property (read in the cell with @var), so a 200-point outline is
// not written out per cell. Several figures that need more than one piece
// (a television and its antennae, a splat and its lumps, three orbits) are
// one polygon: closed outlines strung together by zero-width seams, drawn as
// their union by the nonzero fill rule. Where two pieces of a cell must share
// an ink roll, the second reads it back with @lp() (the last pick), which is
// why those pseudo-elements set their background before any other @p().
// A few rolls sit ahead of the frequency gate on purpose: they move which
// cell the near-1 gate (@random(0.999)) happens to drop in the catalog
// preview, so the continuous designs ship a preview with no hole in it.
import { section, F, TR, B, A, ink } from './shared.mjs';

const { add, all } = section('G. Atomic');

// -- local helpers -------------------------------------------------------------

const TAU = Math.PI * 2;
const n2 = (v) => +v.toFixed(2);
const pct = (v) => `${n2(v)}%`;
/** A clip-path polygon from [x, y] pairs given in percent of the box. */
const polyOf = (list) => `polygon(${list.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(', ')})`;
/** A point at radius r (percent) and angle a (radians) from (cx, cy). */
const at = (r, a, cx = 50, cy = 50) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
const clip = (v) => `-webkit-clip-path: ${v}; clip-path: ${v};`;
const maskV = (v) => `-webkit-mask: ${v}; mask: ${v};`;
/** A box at (x, y), w x h (percent of the cell), turning about the cell's center. */
const boxAt = (x, y, w, h) =>
  `left: ${pct(x)}; top: ${pct(y)}; width: ${pct(w)}; height: ${pct(h)}; transform-origin: ${pct(((50 - x) / w) * 100)} ${pct(((50 - y) / h) * 100)};`;
const inkOf = (...slots) => `@p(${slots.map((s) => `var(--color${s})`).join(', ')})`;

/** Samples a closed parametric curve (t from 0 to 2pi) and fits it into the box. */
const curve = (n, f, margin = 2) => {
  const raw = Array.from({ length: n }, (_, i) => f((i / n) * TAU));
  const xs = raw.map((p) => p[0]);
  const ys = raw.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = (100 - 2 * margin) / Math.max(x1 - x0, y1 - y0);
  const ox = 50 - ((x0 + x1) / 2) * k;
  const oy = 50 - ((y0 + y1) / 2) * k;
  return raw.map(([x, y]) => [ox + x * k, oy + y * k]);
};

/**
 * A hard-edged dot as a no-repeat mask layer: centered at (cx, cy) with
 * diameter d, all in percent of the box.
 */
const dotL = (cx, cy, d) => {
  const px = ((cx - d / 2) / (100 - d)) * 100;
  const py = ((cy - d / 2) / (100 - d)) * 100;
  return `radial-gradient(circle closest-side, #000 99%, transparent 100%) ${pct(px)} ${pct(py)} / ${pct(d)} ${pct(d)} no-repeat`;
};

/** A straight bar from p to q, half-width w, as polygon corners (all percent). */
const barPts = ([x1, y1], [x2, y2], w) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * w;
  const ny = (dx / len) * w;
  return [
    [x1 + nx, y1 + ny],
    [x2 + nx, y2 + ny],
    [x2 - nx, y2 - ny],
    [x1 - nx, y1 - ny],
  ];
};

/** Shoelace area; positive when the points run clockwise on screen. */
const area = (ps) => ps.reduce((sum, [x1, y1], i) => {
  const [x2, y2] = ps[(i + 1) % ps.length];
  return sum + (x1 * y2 - x2 * y1);
}, 0) / 2;
const cw = (ps) => (area(ps) < 0 ? [...ps].reverse() : ps);

/**
 * Several closed outlines as one polygon: each runs clockwise, and they are
 * strung together by zero-width seams back to the first one's start, so the
 * nonzero fill rule draws their union.
 */
const unionPts = (...subs) => {
  const out = [];
  let home = null;
  for (const sub of subs) {
    const ps = cw(sub);
    out.push(...ps, ps[0]);
    if (home) out.push(home);
    else home = ps[0];
  }
  return out;
};

/** A circle of radius r around (cx, cy) as n points. */
const circlePts = (cx, cy, r, n = 24) =>
  Array.from({ length: n }, (_, i) => at(r, (i / n) * TAU, cx, cy));

/** A rounded rectangle as points, corners of radius r. */
const roundRectPts = (x, y, w, h, r, seg = 6) => {
  const out = [];
  const corners = [
    [x + w - r, y + r, -Math.PI / 2],
    [x + w - r, y + h - r, 0],
    [x + r, y + h - r, Math.PI / 2],
    [x + r, y + r, Math.PI],
  ];
  for (const [cx, cy, a0] of corners) {
    for (let i = 0; i <= seg; i++) out.push(at(r, a0 + (i / seg) * (Math.PI / 2), cx, cy));
  }
  return out;
};

/** Resamples a closed outline to n points spaced evenly along its perimeter. */
const resample = (ps, n) => {
  const segs = ps.map((p, i) => [p, ps[(i + 1) % ps.length]]);
  const lens = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  const total = lens.reduce((s, l) => s + l, 0);
  const out = [];
  let si = 0;
  let acc = 0;
  for (let k = 0; k < n; k++) {
    const d = (k / n) * total;
    while (acc + lens[si] < d) acc += lens[si++];
    const f = (d - acc) / lens[si];
    const [a, b] = segs[si];
    out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
  }
  return out;
};

/** A thick sine stroke with round ends: `waves` periods across the box. */
const squigglePts = (waves, amp, half, from = 8, to = 92, n = 40) => {
  const yAt = (x) => 50 + amp * Math.sin(((x - from) / (to - from)) * waves * TAU);
  const slope = (x) => (amp * waves * TAU * Math.cos(((x - from) / (to - from)) * waves * TAU)) / (to - from);
  const top = [];
  const bottom = [];
  for (let i = 0; i <= n; i++) {
    const x = from + ((to - from) * i) / n;
    const m = slope(x);
    const k = half / Math.hypot(1, m);
    top.push([x + m * k, yAt(x) - k]);
    bottom.push([x - m * k, yAt(x) + k]);
  }
  const cap = (x, y, a0) => Array.from({ length: 7 }, (_, i) => at(half, a0 + ((i + 1) / 8) * Math.PI, x, y));
  const ma = Math.atan(slope(to));
  const mb = Math.atan(slope(from));
  return [...top, ...cap(to, yAt(to), ma - Math.PI / 2), ...bottom.reverse(), ...cap(from, yAt(from), mb + Math.PI / 2)];
};

// -- 1950s ---------------------------------------------------------------------

// Starburst: twelve chunky rays in two lengths around a fat core.
const STAR12 = polyOf(
  Array.from({ length: 24 }, (_, i) => {
    const k = i >> 1;
    const a = (k / 12) * TAU - Math.PI / 2 + (i & 1 ? TAU / 24 : 0);
    if (i & 1) return at(12, a);
    return at(k % 2 === 0 ? 50 : 29, a);
  })
);
const STAR8 = polyOf(
  Array.from({ length: 16 }, (_, i) => {
    const k = i >> 1;
    const a = (k / 8) * TAU - Math.PI / 2 + (i & 1 ? TAU / 16 : 0);
    if (i & 1) return at(13, a);
    return at(k % 2 === 0 ? 50 : 34, a);
  })
);

add(
  'Starburst',
  'Atomic-age starbursts with long and short rays and a bead at the heart, scattered at every size and angle.',
  (c) => ({
    host: `--s12: ${STAR12}; --s8: ${STAR8};`,
    rule: `${F} {
      --t: translate(@r(-20%, 20%), @r(-20%, 20%)) rotate(@r(0deg, 90deg)) scale(@r(.5, 1.2));
      --s: @p(@var(--s12), @var(--s8));
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--s)')} transform: @var(--t);`)}
      ${A(`left: 41%; top: 41%; width: 18%; height: 18%; border-radius: 50%; background: ${ink(c)}; transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    pal: 13,
    grid: '6x9',
    freq: 0.8,
    tg: '5x5',
    tf: 0.8,
    meta: { tags: ['stars', 'dots', 'radial'], mood: ['retro', 'festive', 'playful'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'poster'] },
  }
);

// Sputnik: twelve rods of two lengths, a ball at the hub and at every tip.
const ARMS = 12;
const armLen = (k) => (k % 2 ? 31 : 45);
const SPUTNIK_RODS = (() => {
  const w = 1.6;
  const out = [];
  const step = TAU / ARMS;
  for (let k = 0; k < ARMS; k++) {
    const a = k * step;
    const L = armLen(k);
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    out.push([50 + L * ca + w * sa, 50 + L * sa - w * ca]);
    out.push([50 + L * ca - w * sa, 50 + L * sa + w * ca]);
    out.push(at(w / Math.sin(step / 2), a + step / 2));
  }
  return polyOf(out);
})();
const SPUTNIK_BALLS = [
  dotL(50, 50, 26),
  ...Array.from({ length: ARMS }, (_, k) => {
    const [x, y] = at(armLen(k), (k / ARMS) * TAU);
    return dotL(x, y, k % 2 ? 7 : 10);
  }),
].join(', ');

add(
  'Sputnik',
  'Sputnik lamps: a ball at the hub, twelve rods of two lengths and a bead on every tip, each lamp turned and sized at random.',
  (c) => ({
    host: `--rods: ${SPUTNIK_RODS}; --balls: ${SPUTNIK_BALLS};`,
    rule: `${F} {
      --t: rotate(@r(0deg, 30deg)) scale(@r(.7, 1.05));
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--rods)')} transform: @var(--t);`)}
      ${A(`inset: 0; background: ${ink(c)}; ${maskV('@var(--balls)')} transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    pal: 10,
    grid: '5x7',
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['radial', 'dots', 'lines', 'stars'], mood: ['retro', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'poster', 'packaging'] },
  }
);

// Molecule: a ball in every cell, sticks to the right, below and down-right.
// The stick layer spans a 2x2 block from the cell's top-left corner, so the
// cell center sits at 25% 25% of it.
const MOL = (() => {
  const C = [25, 25];
  const ends = { h: [75, 25], v: [25, 75], d: [75, 75] };
  const w = 1.4;
  const sticks = (keys) => {
    if (!keys.length) return polyOf([C, C, C]);
    return polyOf(keys.flatMap((k) => barPts(C, ends[k], w)));
  };
  const sets = [['h'], ['v'], ['h', 'v'], ['h', 'd'], ['v', 'd'], ['d'], [], ['h', 'v', 'd'], ['h', 'v']];
  return sets.map((s, i) => `--k${i}: ${sticks(s)};`).join(' ');
})();

add(
  'Molecule',
  'A ball-and-stick model spread over the sheet: colored balls of every size joined to their neighbors by dark sticks, across, down and on the slant.',
  (c) => ({
    host: MOL,
    rule: `--d: @r(26%, 56%); ${F} {
      --k: @p(@var(--k0), @var(--k1), @var(--k2), @var(--k3), @var(--k4), @var(--k5), @var(--k6), @var(--k7), @var(--k8));
      ${B(`left: 0; top: 0; width: 200%; height: 200%; background: var(--color1); ${clip('@var(--k)')}`)}
      ${A(`width: @var(--d); height: @var(--d); left: calc(50% - @var(--d) / 2); top: calc(50% - @var(--d) / 2); border-radius: 50%; background: ${ink(c, 2)};`)}
    }${TR}`,
  }),
  {
    palette: ['#F3EBDD', '#2A2A2A', '#E4572E', '#F3A712', '#29335C', '#4F9D69'],
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['dots', 'circles', 'lattice', 'lines', 'diagonals'], mood: ['retro', 'playful', 'technical'], density: 'medium', goodFor: ['wallpaper', 'textile', 'card-texture'] },
  }
);

// Kidney: the 1950s kidney-table outline, with a thumb hole like a palette.
const KIDNEY = polyOf(curve(120, (t) => [Math.cos(t), 0.56 * Math.sin(t) + 0.4 * Math.cos(t) ** 2]));
/** A round hole of radius r at (x, y) in a square box, everything else kept. */
const holeL = (x, y, r) => {
  const far = Math.max(Math.hypot(x, y), Math.hypot(100 - x, y), Math.hypot(x, 100 - y), Math.hypot(100 - x, 100 - y));
  const s = pct((r / far) * 100);
  return `radial-gradient(circle at ${pct(x)} ${pct(y)}, transparent ${s}, #000 ${s})`;
};

add(
  'Kidney',
  'Kidney shapes like mid-century coffee tables and painters\' palettes, each with a thumb hole and a dab of paint, tossed at every angle.',
  (c) => ({
    host: `--kid: ${KIDNEY};`,
    rule: `${F} {
      --t: translate(@r(-14%, 14%), @r(-14%, 14%)) rotate(@r(0deg, 360deg)) scale(@r(.85, 1.25));
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--kid)')}
        ${maskV(holeL(70, 46, 7))}
        transform: @var(--t);`)}
      ${A(`${boxAt(22, 38, 14, 14)} border-radius: 50%; background: ${ink(c)}; transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    pal: 27,
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['ovals', 'curves', 'dots'], mood: ['retro', 'playful', 'organic'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

// Atom: three orbits crossing at sixty degrees, drawn as one polygon whose
// rings are joined by zero-width seams (nonzero fill keeps the overlaps).
const ATOM = (() => {
  const out = [];
  const N = 60;
  const ring = (phi, a, b) => Array.from({ length: N + 1 }, (_, i) => {
    const t = (i / N) * TAU;
    const x = a * Math.cos(t);
    const y = b * Math.sin(t);
    return [50 + x * Math.cos(phi) - y * Math.sin(phi), 50 + x * Math.sin(phi) + y * Math.cos(phi)];
  });
  let home = null;
  for (let k = 0; k < 3; k++) {
    const phi = (k * Math.PI) / 3;
    const outer = ring(phi, 47, 17);
    const inner = ring(phi, 43.5, 13.5).reverse();
    out.push(...outer, ...inner, outer[0]);
    if (home) out.push(home);
    else home = outer[0];
  }
  return polyOf(out);
})();
const ELECTRONS = [dotL(50, 50, 20), dotL(97, 50, 9), ...[1, 2].map((k) => {
  const [x, y] = at(47, (k * Math.PI) / 3 + Math.PI);
  return dotL(x, y, 9);
})].join(', ');

add(
  'Atom',
  'The atomic-age emblem: three crossed orbits around a round nucleus, with an electron riding each ring.',
  (c) => ({
    host: `--orb: ${ATOM}; --nuc: ${ELECTRONS};`,
    rule: `${F} {
      --t: rotate(@r(0deg, 60deg)) scale(@r(.78, .98));
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--orb)')} transform: @var(--t);`)}
      ${A(`inset: 0; background: ${ink(c)}; ${maskV('@var(--nuc)')} transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    pal: 4,
    grid: '5x7',
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['ovals', 'rings', 'dots', 'radial'], mood: ['retro', 'technical', 'playful'], density: 'medium', goodFor: ['wallpaper', 'poster', 'packaging'] },
  }
);

// Googie: a tall roadside-sign kite crossed by a bar with a ball at each end.
const GOOGIE_KITE = polyOf([[50, 1], [62, 36], [50, 99], [38, 36]]);
/** A bar as a no-repeat mask layer: top-left (x, y), size w x h, in percent. */
const barL = (x, y, w, h) =>
  `linear-gradient(#000, #000) ${pct((x / (100 - w)) * 100)} ${pct((y / (100 - h)) * 100)} / ${pct(w)} ${pct(h)} no-repeat`;
const GOOGIE_BAR = [barL(15, 34.5, 70, 3), dotL(15, 36, 13), dotL(85, 36, 13)].join(', ');

add(
  'Googie',
  'Roadside-sign kites from the space age: tall diamonds crossed by a bar with a ball at each end, tilted every which way.',
  (c) => ({
    host: `--kite: ${GOOGIE_KITE}; --bar: ${GOOGIE_BAR};`,
    rule: `${F} {
      --t: translate(@r(-10%, 10%), @r(-8%, 8%)) rotate(@r(-35deg, 35deg)) scale(@r(.8, 1.05));
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--kite)')} transform: @var(--t);`)}
      ${A(`inset: 0; background: ${ink(c)}; ${maskV('@var(--bar)')} transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    palette: ['#1D2B36', '#F2A65A', '#E8E3D3', '#3FB8AF', '#E05A47', '#F4D35E'],
    grid: '6x9',
    freq: 0.9,
    tg: '5x5',
    tf: 0.9,
    meta: { tags: ['diamonds', 'dots', 'lines', 'crosses'], mood: ['retro', 'playful', 'bold'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'textile'] },
  }
);

// Rabbit Ears: a rounded set with a V of antennae, two knobs punched
// through the cabinet and a glinting screen.
const TV = polyOf(
  unionPts(
    roundRectPts(10, 36, 80, 52, 13),
    barPts([50, 37], [27, 8], 1.3),
    barPts([50, 37], [76, 10], 1.3),
    circlePts(27, 8, 3.6, 16),
    circlePts(76, 10, 3.6, 16),
    barPts([30, 86], [25, 97], 2.2),
    barPts([70, 86], [75, 97], 2.2)
  )
);

add(
  'Rabbit Ears',
  'Fifties television sets in candy colors, each with a V of rabbit-ear antennae, two knobs and a glinting screen, tilted this way and that.',
  (c) => ({
    host: `--tv: ${TV};`,
    rule: `${F} {
      --t: translate(@r(-6%, 6%), @r(-6%, 6%)) rotate(@r(-12deg, 12deg)) scale(@r(.78, .96));
      ${B(`inset: 0; background: ${inkOf(1, 2, 3)}; ${clip('@var(--tv)')}
        ${maskV(`${holeL(79, 54, 4)}, ${holeL(79, 70, 4)}`)} -webkit-mask-composite: source-in; mask-composite: intersect;
        transform: @var(--t);`)}
      ${A(`${boxAt(17, 43, 52, 38)} border-radius: 22% / 28%; background: ${inkOf(4, 5)};
        ${maskV('linear-gradient(135deg, #000 20%, #0000007a 45%, #000 70%)')}
        transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    palette: ['#F4ECDD', '#2EB5A8', '#F07167', '#F6BD60', '#22333B', '#4F6D7A'],
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['squares', 'lines', 'dots', 'grid'], mood: ['retro', 'playful'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'card-texture'] },
  }
);

// -- 1960s ---------------------------------------------------------------------

add(
  'Mod Roundels',
  'Bold three-ring roundels overlapping like scales, each row tucked under the one above, the rings changing color on every redraw.',
  (c) => ({
    rule: `${F} {
      border-radius: 50%; background: ${inkOf(1, 2)};
      transform: scale(1.42); z-index: @calc(100 - @y);
      ${B(`inset: 21%; border-radius: 50%; background: ${inkOf(3, 4)};`)}
      ${A(`inset: 38%; border-radius: 50%; background: ${inkOf(1, 2, 5)}; transform: scale(@r(.7, 1.25));`)}
    }${TR}`,
  }),
  {
    pal: 28,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['circles', 'rings', 'concentric', 'scallops'], mood: ['retro', 'bold'], density: 'dense', goodFor: ['poster', 'textile', 'og-image'] },
  }
);

add(
  'Mod Squares',
  'A sixties tile: a square holding a diamond holding a smaller square, in three flat colors, so the corners of neighboring tiles meet as diamonds of their own.',
  (c) => ({
    rule: `${F} {
      background: ${inkOf(1, 2)};
      ${B(`inset: 14.64%; background: ${inkOf(3, 4)}; transform: rotate(45deg);`)}
      ${A(`inset: 25%; background: ${inkOf(1, 2, 5)}; transform: rotate(@p(0deg, 0deg, 45deg));`)}
    }${TR}`,
  }),
  {
    palette: ['#F8F1E5', '#1D3557', '#E63946', '#F4A261', '#2A9D8F', '#F1FAEE'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'diamonds', 'grid', 'concentric'], mood: ['retro', 'bold'], density: 'dense', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

// Daisy: twelve rounded petals around a round eye.
const DAISY = polyOf(
  curve(240, (t) => {
    const r = 0.22 + 0.78 * Math.abs(Math.cos(6 * t)) ** 0.55;
    return [r * Math.cos(t), r * Math.sin(t)];
  })
);

add(
  'Daisy',
  'Flower-power daisies of twelve round petals with a bright eye, strewn at every size so they crowd and overlap.',
  (c) => ({
    host: `--daisy: ${DAISY};`,
    rule: `${F} {
      --t: translate(@r(-18%, 18%), @r(-18%, 18%)) rotate(@r(0deg, 30deg)) scale(@r(.6, 1.3));
      z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 3, 4)}; ${clip('@var(--daisy)')} transform: @var(--t);`)}
      ${A(`inset: 38%; border-radius: 50%; background: ${inkOf(2, 2, 4)}; transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    palette: ['#E8672F', '#FFF4E0', '#FFD23F', '#E8467C', '#1F7A55'],
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['petals', 'circles', 'dots'], mood: ['retro', 'playful', 'festive'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// Kapow: a comic-book burst with jagged points rolled per cell; the inner
// burst is the same outline, smaller and turned.
const KAPOW = (() => {
  const n = 13;
  const pts = [];
  for (let i = 0; i < 2 * n; i++) {
    const a = (i / (2 * n)) * TAU;
    const r = i % 2 ? 31 : 47;
    const j = i % 2 ? 3 : 6;
    const x = Math.round(50 + r * Math.cos(a));
    const y = Math.round(50 + r * Math.sin(a));
    pts.push(`@calc(${x} + @ri(-${j}, ${j}))% @calc(${y} + @ri(-${j}, ${j}))%`);
  }
  return `polygon(${pts.join(', ')})`;
})();

add(
  'Kapow',
  'Pop-art comic bursts: jagged star balloons in yellow and white with a smaller red or black burst inside, crowding each other.',
  (c) => ({
    rule: `${F} {
      --b: ${KAPOW};
      --t: translate(@r(-12%, 12%), @r(-12%, 12%)) rotate(@r(0deg, 360deg)) scale(@r(.95, 1.45));
      z-index: @ri(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 2)}; clip-path: @var(--b); transform: @var(--t);`)}
      ${A(`inset: 0; background: ${inkOf(3, 4)}; clip-path: @var(--b); transform: @var(--t) rotate(14deg) scale(.56);`)}
    }${TR}`,
  }),
  {
    palette: ['#35B4E5', '#FFE14D', '#FFFFFF', '#E8282B', '#1A1A2E'],
    grid: '5x7',
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['stars', 'zigzags', 'radial'], mood: ['bold', 'playful', 'retro'], density: 'dense', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);

// Lava Lamp: a glob of wax in one of three shapes (a tall drop, a peanut
// pinching in two, a lopsided egg) with a small bead of the same ink near it.
const LAVA = [
  (t) => [Math.cos(t) * (0.66 - 0.1 * Math.sin(t)), Math.sin(t) * 0.95],
  (t) => [Math.cos(t) * (0.72 - 0.36 * Math.cos(2 * t) + 0.1 * Math.sin(t)), Math.sin(t)],
  (t) => [Math.cos(t) * (0.6 + 0.12 * Math.sin(t)), Math.sin(t) * 0.8 + 0.14 * Math.cos(t) ** 2],
].map((f) => polyOf(curve(72, f, 1)));

add(
  'Lava Lamp',
  'Lava-lamp wax: tall globs of warm color, some pinching in two, each glowing at its heart with a small bead rising or falling beside it.',
  (c) => ({
    host: LAVA.map((v, i) => `--lava${i}: ${v};`).join(' '),
    rule: `${F} {
      --t: translate(@r(-22%, 22%), @r(-12%, 12%)) rotate(@r(-16deg, 16deg)) scale(@r(.75, 1.2));
      ${B(`inset: 0; clip-path: @p(@var(--lava0), @var(--lava1), @var(--lava2)); background: ${ink(c)};
        ${maskV('radial-gradient(closest-side, #000 45%, #0000008f 100%)')} transform: @var(--t);`)}
      ${A(`background: @lp(); width: 16%; height: 18%; border-radius: 50%; left: @r(8%, 76%); top: @p(-8%, 2%, 86%, 92%);
        ${maskV('radial-gradient(closest-side, #000 45%, #0000008f 100%)')}`)}
    }${TR}`,
  }),
  {
    pal: 15,
    inks: 4,
    grid: '6x9',
    freq: 0.8,
    tg: '5x5',
    tf: 0.8,
    meta: { tags: ['ovals', 'gradients', 'curves'], mood: ['retro', 'organic', 'calm'], density: 'medium', goodFor: ['hero-background', 'poster', 'wallpaper'] },
  }
);

// -- 1970s ---------------------------------------------------------------------

// Supergraphic: a striped ribbon in quarter turns. The stripes are
// palindromic about the middle of the edge, so a ribbon leaving one tile
// always meets the same stripe in the next whichever way that tile turned.
const SUPER = (() => {
  const band = (at) =>
    `radial-gradient(circle farthest-side at ${at}, transparent 33%, var(--color1) 33% 40%, var(--color2) 40% 47%, var(--color3) 47% 53%, var(--color2) 53% 60%, var(--color1) 60% 67%, transparent 67%)`;
  return `${band('0 0')}, ${band('100% 100%')}`;
})();

add(
  'Supergraphic',
  'A seventies wall supergraphic: five-stripe ribbons sweeping round in quarter turns and joining tile to tile, with a colored dot inside every bend.',
  (c) => ({
    host: `--rib: ${SUPER};`,
    rule: `--r: @p(0deg, 90deg); ${F} {
      background: @var(--rib); transform: rotate(@var(--r));
      ${B(`left: -16%; top: -16%; width: 32%; height: 32%; border-radius: 50%; background: ${inkOf(4, 5)};`)}
      ${A(`right: -16%; bottom: -16%; width: 32%; height: 32%; border-radius: 50%; background: @lp();`)}
    }${TR}`,
  }),
  {
    palette: ['#F5E9D3', '#D9480F', '#F08C00', '#F7C948', '#5C7F3B', '#7A4419'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['stripes', 'arcs', 'curves', 'quarter-circles', 'dots'], mood: ['retro', 'bold'], density: 'dense', goodFor: ['wallpaper', 'poster', 'textile'] },
  }
);

// Groovy: four wavy bands per tile in two colors, every other tile turned a
// quarter, like a seventies basketweave of ribbons.
const GROOVY = (() => {
  const n = 32;
  const edge = (y0) => Array.from({ length: n + 1 }, (_, i) => {
    const x = (i / n) * 100;
    return [x, y0 + 7 * Math.sin((i / n) * TAU)];
  });
  const band = (top, bottom) => {
    const t = top === 0 ? [[0, 0], [100, 0]] : edge(top);
    const b = bottom === 100 ? [[100, 100], [0, 100]] : edge(bottom).reverse();
    return [...t, ...b];
  };
  return {
    a: polyOf(unionPts(band(0, 25), band(50, 75))),
    b: polyOf(unionPts(band(25, 50), band(75, 100))),
  };
})();

add(
  'Groovy',
  'Seventies wavy ribbons: tiles of four rippling bands in two colors, every other tile turned on its side so the waves weave.',
  (c) => ({
    host: `--ga: ${GROOVY.a}; --gb: ${GROOVY.b};`,
    rule: `--ia: ${inkOf(1, 2, 3)}; @odd { transform: rotate(90deg); } ${F} {
      ${B(`inset: 0; background: @var(--ia); ${clip('@var(--ga)')}`)}
      ${A(`inset: 0; background: ${inkOf(4, 5, 6)}; ${clip('@var(--gb)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F3E3C3', '#D9480F', '#E8A33D', '#B5651D', '#3F2E1F', '#7A8450', '#FFF6E5'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['waves', 'stripes', 'checkerboard', 'curves'], mood: ['retro', 'organic', 'bold'], density: 'dense', goodFor: ['textile', 'wallpaper', 'card-texture'] },
  }
);

// Mushroom: a domed cap with its spots punched through, over a short stem.
add(
  'Mushroom',
  'Seventies toadstools with spotted domed caps on stubby stems, sprouting at every size across the sheet.',
  (c) => ({
    rule: `${F} {
      transform: translate(@r(-14%, 14%), @r(-10%, 10%)) rotate(@r(-16deg, 16deg)) scale(@r(.6, 1.35));
      z-index: @ri(1, 9);
      ${B(`left: 8%; top: 14%; width: 84%; height: 44%; z-index: 1; background: ${inkOf(1, 2, 3)};
        border-radius: 50% 50% 14% 14% / 100% 100% 22% 22%;
        ${maskV(`${holeL(30, 40, 6)}, ${holeL(58, 30, 7)}, ${holeL(78, 62, 5)}`)}
        -webkit-mask-composite: source-in; mask-composite: intersect;`)}
      ${A(`left: 36%; top: 50%; width: 28%; height: 38%; border-radius: 30% 30% 40% 40% / 20% 20% 30% 30%; background: ${inkOf(4, 5)};`)}
    }${TR}`,
  }),
  {
    palette: ['#F2E6CF', '#C1440E', '#E9A23B', '#7D8C3C', '#5B3A29', '#A0522D'],
    grid: '6x9',
    freq: 0.85,
    tg: '5x5',
    tf: 0.85,
    meta: { tags: ['semicircles', 'dots', 'curves'], mood: ['retro', 'playful', 'organic'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

// Disco: a light-up dance floor, the lit tiles following a noise field.
const SPARK4 = polyOf([[50, 0], [58, 42], [100, 50], [58, 58], [50, 100], [42, 58], [0, 50], [42, 42]]);

add(
  'Disco',
  'A light-up disco floor: square tiles glowing from the middle out, bright in drifting patches and dim between, with a sparkle on a few.',
  (c) => ({
    host: `--spark: ${SPARK4};`,
    rule: `${F} {
      ${B(`inset: 5%; border-radius: 6%; background: ${ink(c, 2)}; opacity: @rn(.42, 1.25);
        ${maskV('radial-gradient(closest-side, #000 25%, #0000008c 100%)')}`)}
      ${A(`left: 52%; top: 12%; width: 36%; height: 36%; background: var(--color1); ${clip('@var(--spark)')} transform: scale(@p(0, 0, 0, 1));`)}
    }${TR}`,
  }),
  {
    palette: ['#120E1F', '#FFFFFF', '#F15BB5', '#00BBF9', '#FEE440', '#9B5DE5'],
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['squares', 'grid', 'gradients', 'stars'], mood: ['festive', 'retro', 'bold'], density: 'dense', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

// Record: a grooved disc, a paper label and a spindle hole through both.
add(
  'Record',
  'Long-playing records in colored vinyl, grooved rings round a bright paper label and a spindle hole, scattered so they overlap like a pile on the floor.',
  (c) => ({
    rule: `${F} {
      transform: translate(@r(-16%, 16%), @r(-16%, 16%)) scale(@r(1, 1.25));
      z-index: @ri(1, 9);
      ${B(`inset: 0; border-radius: 50%; background: ${inkOf(1, 2, 3)};
        ${maskV('repeating-radial-gradient(circle closest-side, #000 0 5%, #0000009e 5% 7%), radial-gradient(circle closest-side, transparent 5%, #000 5%)')}
        -webkit-mask-composite: source-in; mask-composite: intersect;`)}
      ${A(`inset: 33%; border-radius: 50%; background: ${inkOf(4, 5)};
        ${maskV('radial-gradient(circle closest-side, transparent 15%, #000 15%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#EADFC8', '#1E1E24', '#B33A3A', '#2E5E8C', '#F2B134', '#F7F3E8'],
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['circles', 'rings', 'concentric', 'dots'], mood: ['retro', 'playful'], density: 'medium', goodFor: ['poster', 'packaging', 'wallpaper'] },
  }
);

// Pill: a two-tone capsule, each half its own color, scattered at angles.
add(
  'Pill',
  'Two-tone capsules, each half a different flat color, tossed across the sheet at every angle like a spilled bottle.',
  (c) => ({
    rule: `${F} {
      transform: translate(@r(-12%, 12%), @r(-12%, 12%)) rotate(@r(0deg, 180deg)) scale(@r(1, 1.35));
      z-index: @ri(1, 9);
      ${B(`left: 12%; top: 37%; width: 38%; height: 26%; border-radius: 50% 0 0 50% / 50% 0 0 50%; background: ${inkOf(1, 2, 3)};`)}
      ${A(`left: 50%; top: 37%; width: 38%; height: 26%; border-radius: 0 50% 50% 0 / 0 50% 50% 0; background: ${inkOf(4, 5, 6)};`)}
    }${TR}`,
  }),
  {
    palette: ['#FCE9EC', '#E5446D', '#FF9F1C', '#3D348B', '#2EC4B6', '#FFFFFF', '#1B998B'],
    grid: '6x9',
    freq: 0.85,
    tg: '5x5',
    tf: 0.85,
    meta: { tags: ['ovals', 'semicircles', 'blocks'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'card-texture'] },
  }
);

// -- 1980s and 1990s -------------------------------------------------------------

const SQUIGGLE = polyOf(squigglePts(2, 15, 6.5));

add(
  'Squiggle',
  'Memphis-style squiggles: fat wavy strokes with rounded ends tossed at every angle, with loose dots between them.',
  (c) => ({
    host: `--sq: ${SQUIGGLE};`,
    rule: `${F} {
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--sq)')}
        transform: translate(@r(-12%, 12%), @r(-12%, 12%)) rotate(@r(0deg, 180deg)) scale(@r(.8, 1.25));`)}
      ${A(`width: 13%; height: 13%; left: @r(5%, 80%); top: @r(5%, 80%); border-radius: 50%; background: ${ink(c)}; transform: scale(@p(0, 1, 1.5));`)}
    }${TR}`,
  }),
  {
    palette: ['#FFF8EC', '#151515', '#FF5E8A', '#21B6A8', '#FFC43D', '#4361EE'],
    grid: '6x9',
    freq: 0.9,
    tg: '5x5',
    tf: 0.9,
    meta: { tags: ['waves', 'curves', 'dots', 'lines'], mood: ['playful', 'retro', 'bold'], density: 'medium', goodFor: ['packaging', 'poster', 'wallpaper'] },
  }
);

// Terrazzo: two chips per cell, each an irregular hexagon rolled per cell.
const CHIP = (() => {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU + 0.3;
    pts.push(`@calc(50 + ${n2(Math.cos(a))} * @r(28, 50))% @calc(50 + ${n2(Math.sin(a))} * @r(28, 50))%`);
  }
  return `polygon(${pts.join(', ')})`;
})();

add(
  'Terrazzo',
  'An eighties terrazzo: sharp chips of bright stone in every color and size, scattered thick across a pale ground.',
  (c) => ({
    rule: `${F} {
      ${B(`inset: 0; background: ${ink(c)}; clip-path: ${CHIP};
        transform: translate(@r(-28%, 28%), @r(-28%, 28%)) rotate(@r(0deg, 360deg)) scale(@r(.5, .95));`)}
      ${A(`inset: 0; background: ${ink(c)}; clip-path: ${CHIP};
        transform: translate(@r(-35%, 35%), @r(-35%, 35%)) rotate(@r(0deg, 360deg)) scale(@r(.25, .55));`)}
    }${TR}`,
  }),
  {
    palette: ['#EEE9E1', '#1F1F1F', '#F25C78', '#2BB3A3', '#F5B82E', '#7E8CE0', '#F08A4B'],
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['mosaic', 'blocks', 'triangles'], mood: ['playful', 'retro', 'organic'], density: 'medium', goodFor: ['card-texture', 'packaging', 'wallpaper'] },
  }
);

// Memphis Mix: one bold motif per cell, all traced with the same number of
// points so a redraw morphs one into another, over a patch of dots or stripes.
const MOTIF_N = 36;
const MOTIFS = (() => {
  const tri = [[50, 10], [92, 84], [8, 84]];
  const half = [...Array.from({ length: 13 }, (_, i) => at(42, Math.PI + (i / 12) * Math.PI, 50, 66))];
  const zig = (() => {
    const top = [];
    const bot = [];
    for (let i = 0; i <= 4; i++) {
      const x = 6 + i * 22;
      const y = i % 2 ? 62 : 38;
      top.push([x, y - 9]);
      bot.push([x, y + 9]);
    }
    return [...top, ...bot.reverse()];
  })();
  const cross = [[40, 8], [60, 8], [60, 40], [92, 40], [92, 60], [60, 60], [60, 92], [40, 92], [40, 60], [8, 60], [8, 40], [40, 40]];
  const diamond = [[50, 4], [80, 50], [50, 96], [20, 50]];
  const arch = [
    ...Array.from({ length: 13 }, (_, i) => at(42, Math.PI + (i / 12) * Math.PI, 50, 72)),
    ...Array.from({ length: 13 }, (_, i) => at(22, TAU - (i / 12) * Math.PI, 50, 72)),
  ];
  return [tri, half, zig, cross, diamond, arch].map((ps) => polyOf(resample(cw(ps), MOTIF_N)));
})();
const PATCH_DOTS = 'radial-gradient(circle closest-side, #000 55%, transparent 58%) 0 0 / 25% 25%';
const PATCH_STRIPES = 'repeating-linear-gradient(90deg, #000 0 12.5%, transparent 12.5% 25%)';

add(
  'Memphis Mix',
  'An eighties Memphis jumble: a triangle, half-moon, zigzag, cross, diamond or arch in each cell, laid over little patches of black dots and stripes.',
  (c) => ({
    host: MOTIFS.map((m, i) => `--m${i}: ${m};`).join(' '),
    rule: `${F} {
      --pm: @p(${PATCH_DOTS}, ${PATCH_STRIPES});
      ${B(`width: 52%; height: 52%; left: @r(0%, 48%); top: @r(0%, 48%); border-radius: @p(0, 50%); background: var(--color1);
        ${maskV('@var(--pm)')} transform: rotate(@p(0deg, 90deg, 45deg));`)}
      ${A(`inset: 8%; background: ${ink(c, 2)}; clip-path: @p(${MOTIFS.map((_, i) => `@var(--m${i})`).join(', ')});
        transform: translate(@r(-10%, 10%), @r(-10%, 10%)) rotate(@r(-60deg, 60deg)) scale(@r(.7, 1));`)}
    }${TR}`,
  }),
  {
    palette: ['#FFFBF3', '#161616', '#FF6FA8', '#28C2B0', '#FFCF3D', '#5468FF', '#FF7A45'],
    grid: '6x9',
    freq: 0.9,
    tg: '5x5',
    tf: 0.9,
    meta: { tags: ['triangles', 'zigzags', 'semicircles', 'crosses', 'dots', 'stripes'], mood: ['playful', 'bold', 'retro'], density: 'medium', goodFor: ['poster', 'packaging', 'og-image'] },
  }
);

// Lightning: a bolt over a small checkerboard patch.
const BOLT = polyOf([[58, 2], [24, 54], [46, 54], [34, 98], [78, 40], [55, 40], [72, 2]]);
// A four-by-four checkerboard: four untiled two-by-two conic blocks, one per
// quadrant (a tiled conic layer does not export).
const CHECKS = ['0 0', '100% 0', '0 100%', '100% 100%']
  .map((pos) => `conic-gradient(#000 0 90deg, transparent 90deg 180deg, #000 180deg 270deg, transparent 270deg) ${pos} / 50% 50% no-repeat`)
  .join(', ');

add(
  'Lightning',
  'Eighties lightning bolts in hot colors, each striking across a little black-and-white checkerboard patch set askew behind it.',
  (c) => ({
    host: `--bolt: ${BOLT}; --chk: ${CHECKS};`,
    rule: `${F} {
      ${B(`width: 56%; height: 56%; left: @r(4%, 40%); top: @r(4%, 40%); background: var(--color1);
        ${maskV('@var(--chk)')} transform: rotate(@r(-25deg, 25deg));`)}
      ${A(`inset: 0; background: ${ink(c, 2)}; ${clip('@var(--bolt)')}
        transform: translate(@r(-8%, 8%), @r(-6%, 6%)) rotate(@r(-28deg, 28deg)) scale(@r(.85, 1.05));`)}
    }${TR}`,
  }),
  {
    palette: ['#F2F0EB', '#141414', '#FF3F8E', '#FFD23F', '#1FB5E8', '#8A4FFF'],
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['zigzags', 'checkerboard', 'squares'], mood: ['bold', 'playful', 'retro'], density: 'medium', goodFor: ['poster', 'packaging', 'og-image'] },
  }
);

// Pixel Critters: a five-by-five sprite, mirrored about its middle column,
// rolled per cell; two eyes are always left open in the second row.
const SPRITE = (() => {
  // each row overlaps its neighbors by a hair, so no seam opens between them
  const row = (y, a, b, cc) => {
    const top = Math.max(0, Math.min(79.2, y * 20 - 0.4));
    return `linear-gradient(90deg, ${a} 0 20%, ${b} 20% 40%, ${cc} 40% 60%, ${b} 60% 80%, ${a} 80%) 0 ${pct((top / 79.2) * 100)} / 100% 20.8% no-repeat`;
  };
  const v = (k) => `@var(--${k})`;
  return [
    row(0, v('a0'), v('b0'), v('c0')),
    row(1, v('a1'), 'transparent', '#000'),
    row(2, v('a2'), v('b2'), '#000'),
    row(3, v('a3'), v('b3'), v('c3')),
    row(4, v('a4'), v('b4'), v('c4')),
  ].join(', ');
})();
// Each bit is rolled per cell, so the sprite's mask is written out per cell;
// it is spelled once (unprefixed) to keep the stylesheet small.
const BIT = '@p(#000, #000, transparent)';
const BITS = ['a0', 'b0', 'c0', 'a1', 'a2', 'b2', 'a3', 'b3', 'c3', 'a4', 'b4', 'c4'];

add(
  'Pixel Critters',
  'Arcade critters: little five-by-five pixel sprites, each mirrored down the middle with two eyes, rolled fresh in every cell.',
  (c) => ({
    rule: `--a0: ${BIT}; ${F} {
      ${BITS.slice(1).map((k) => `--${k}: ${BIT};`).join(' ')}
      ${B(`inset: 15%; background: ${ink(c)}; mask: ${SPRITE};`)}
    }${TR}`,
  }),
  {
    pal: 48,
    inks: 4,
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'grid', 'mosaic'], mood: ['playful', 'retro', 'technical'], density: 'medium', goodFor: ['wallpaper', 'card-texture', 'packaging'] },
  }
);

// Off Register: an outline and its fill printed out of step. The shape is
// chosen by position (a diagonal rhythm), so the outline and fill agree.
const SHAPES = (() => {
  const t = 5;
  const circ = (r) => circlePts(50, 50, r, 40);
  const sq = (h) => [[50 - h, 50 - h], [50 + h, 50 - h], [50 + h, 50 + h], [50 - h, 50 + h]];
  // an equilateral triangle about its incenter at (50, 56)
  const tri = (r) => [0, 1, 2].map((k) => at(r, -Math.PI / 2 + (k * TAU) / 3, 50, 56));
  // the outline runs clockwise, the hole back the other way, joined by a seam
  const out = (o, i) => {
    const O = cw(o);
    const I = cw(i).reverse();
    return polyOf([...O, O[0], ...I, I[0]]);
  };
  return {
    circle: { line: out(circ(36), circ(36 - t)), fill: polyOf(circ(36)) },
    square: { line: out(sq(31), sq(31 - t)), fill: polyOf(sq(31)) },
    triangle: { line: out(tri(42), tri(42 - 2 * t)), fill: polyOf(tri(42)) },
  };
})();

add(
  'Off Register',
  'Circles, squares and triangles printed out of register: a bold black outline with its flat color fill slipped off to one side.',
  (c) => ({
    host: Object.entries(SHAPES).map(([k, v]) => `--${k}-line: ${v.line}; --${k}-fill: ${v.fill};`).join(' '),
    rule: `${F} {
      --t: rotate(@match((x + y) % 3 == 2, @p(0deg, 60deg, 180deg), 0deg));
      ${B(`inset: 0; background: ${ink(c, 2)}; clip-path: @match((x + y) % 3 == 0, @var(--circle-fill), (x + y) % 3 == 1, @var(--square-fill), @var(--triangle-fill));
        transform: @var(--t) translate(@p(-9%, 9%), @p(-9%, 9%));`)}
      ${A(`inset: 0; background: var(--color1); clip-path: @match((x + y) % 3 == 0, @var(--circle-line), (x + y) % 3 == 1, @var(--square-line), @var(--triangle-line));
        transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    palette: ['#F7F3EA', '#111111', '#FF5A5F', '#00A6A6', '#FFC145', '#5B5BD6'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['circles', 'squares', 'triangles', 'grid'], mood: ['playful', 'bold', 'retro'], density: 'medium', goodFor: ['poster', 'packaging', 'wallpaper'] },
  }
);

// Splatter: a round blot with lumps bulging from its rim, in three
// variants, and a spray of droplets flung round it.
const BLOTS = [
  [[0, 30], [70, 26], [150, 32], [215, 24], [290, 30]],
  [[20, 34], [110, 28], [175, 22], [250, 33], [320, 20]],
  [[45, 28], [130, 34], [200, 26], [300, 30]],
].map((lumps) =>
  polyOf(
    unionPts(
      circlePts(50, 50, 27, 36),
      ...lumps.map(([deg, d]) => circlePts(...at(d, (deg * Math.PI) / 180), 10 + (d % 7), 18))
    )
  )
);
const DROPS = [dotL(88, 30, 9), dotL(94, 58, 5), dotL(20, 88, 7), dotL(8, 22, 5), dotL(62, 94, 4), dotL(30, 6, 6)].join(', ');

add(
  'Splatter',
  'Nineties paint splatters: lumpy blots of neon and white on black, each with a spray of droplets flung around it.',
  (c) => ({
    host: `--drops: ${DROPS}; ${BLOTS.map((v, i) => `--blot${i}: ${v};`).join(' ')}`,
    rule: `${F} {
      --t: translate(@r(-10%, 10%), @r(-10%, 10%)) rotate(@r(0deg, 360deg)) scale(@r(.7, 1.15));
      z-index: @ri(1, 9);
      ${B(`inset: 0; clip-path: @p(@var(--blot0), @var(--blot1), @var(--blot2)); background: ${ink(c)}; transform: @var(--t);`)}
      ${A(`inset: 0; background: @lp(); ${maskV('@var(--drops)')} transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    palette: ['#111014', '#F5F5F0', '#FF2E88', '#B6F500', '#00C2FF', '#A66BFF'],
    grid: '6x9',
    freq: 0.85,
    tg: '5x5',
    tf: 0.85,
    meta: { tags: ['dots', 'circles', 'curves'], mood: ['bold', 'playful'], density: 'medium', goodFor: ['poster', 'packaging', 'og-image'] },
  }
);

export const sectionG = { title: 'G. Atomic', all };
