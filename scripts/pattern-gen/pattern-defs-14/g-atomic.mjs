// G. Atomic - mid-century to nineties pop: starbursts, boomerangs, supergraphics, squiggles.
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
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@p(@var(--s12), @var(--s8))')} transform: @var(--t);`)}
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
    rule: `${F} {
      --k: @p(@var(--k0), @var(--k1), @var(--k2), @var(--k3), @var(--k4), @var(--k5), @var(--k6), @var(--k7), @var(--k8));
      --d: @r(26%, 56%);
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
    meta: { tags: ['dots', 'circles', 'lattice', 'lines'], mood: ['retro', 'playful', 'technical'], density: 'medium', goodFor: ['wallpaper', 'textile', 'card-texture'] },
  }
);

// Kidney: the 1950s kidney-table outline, with a thumb hole like a palette.
const KIDNEY = polyOf(curve(120, (t) => [Math.cos(t), 0.5 * Math.sin(t) + 0.62 * Math.cos(t) ** 2]));

add(
  'Kidney',
  'Kidney shapes like mid-century coffee tables and painters\' palettes, each with a thumb hole, tossed at every angle with a dot of paint beside.',
  (c) => ({
    host: `--kid: ${KIDNEY};`,
    rule: `${F} {
      --t: translate(@r(-14%, 14%), @r(-14%, 14%)) rotate(@r(0deg, 360deg)) scale(@r(.85, 1.25));
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--kid)')}
        ${maskV('radial-gradient(circle closest-side at 72% 42%, transparent 9%, #000 9%) 0 0 / 100% 100%')}
        transform: @var(--t);`)}
      ${A(`left: 22%; top: 30%; width: 13%; height: 13%; border-radius: 50%; background: ${ink(c)}; transform: @var(--t);`)}
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
  for (let k = 0; k < 3; k++) {
    const phi = (k * Math.PI) / 3;
    const outer = ring(phi, 47, 17);
    const inner = ring(phi, 43.5, 13.5).reverse();
    out.push(...outer, ...inner, outer[0]);
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

// Googie: three long kites fanned from one hub, like a roadside sign.
const GOOGIE = (() => {
  const kite = (ang, len, wid) => {
    const a = (ang * Math.PI) / 180;
    const tip = at(len, a, 30, 70);
    const sideL = at(len * 0.3, a, 30, 70);
    const n = [-Math.sin(a) * wid, Math.cos(a) * wid];
    return [[30, 70], [sideL[0] + n[0], sideL[1] + n[1]], tip, [sideL[0] - n[0], sideL[1] - n[1]]];
  };
  return polyOf([...kite(-80, 62, 7), ...kite(-45, 70, 8), ...kite(-12, 52, 6.5)]);
})();

add(
  'Googie',
  'Roadside-sign kites: three long diamonds fanned from one point, with a ball at the hub, flung about at playful angles.',
  (c) => ({
    host: `--kite: ${GOOGIE};`,
    rule: `${F} {
      --t: translate(@r(-12%, 12%), @r(-12%, 12%)) rotate(@r(-40deg, 40deg)) scale(@r(.8, 1.15));
      ${B(`inset: 0; background: ${ink(c)}; ${clip('@var(--kite)')} transform: @var(--t);`)}
      ${A(`left: 23%; top: 63%; width: 14%; height: 14%; border-radius: 50%; background: ${ink(c)}; transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    pal: 22,
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['diamonds', 'triangles', 'dots', 'radial'], mood: ['retro', 'playful', 'bold'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'poster'] },
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
      ${A(`inset: 38%; border-radius: 50%; background: ${inkOf(1, 2, 5)};`)}
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
      z-index: @r(1, 9);
      ${B(`inset: 0; background: ${inkOf(1, 3, 4)}; ${clip('@var(--daisy)')} transform: @var(--t);`)}
      ${A(`inset: 38%; border-radius: 50%; background: ${inkOf(2, 2, 4)}; transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    palette: ['#F07B3F', '#FFF4E0', '#FFD23F', '#E8467C', '#2D936C'],
    grid: '5x7',
    freq: 0.9,
    tg: '4x4',
    tf: 0.9,
    meta: { tags: ['petals', 'circles', 'dots'], mood: ['retro', 'playful', 'festive'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

export const sectionG = { title: 'G. Atomic', all };
