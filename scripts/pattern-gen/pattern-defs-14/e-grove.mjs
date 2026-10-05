// E. Grove - leaves, petals, scales, seeds and stones.
import { section, F, TR, ink, cp, msk, mskI, B, A, pieL, bandLin, noise, fr } from './shared.mjs';

const { add, all } = section('E. Grove');

const xf = (v) => `-webkit-transform: ${v}; transform: ${v};`;

// -- silhouettes -------------------------------------------------------------
// A leaf, a wing or a shell outline is a polygon worked out here, once, in
// percentages of a square box. It goes on the host as a custom property and a
// cell reads it with @var(), so the long point list is written out once
// rather than once per cell.
const pct = (v) => `${Math.round(v * 10) / 10}%`;
const polyOf = (pts) => `polygon(${pts.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(', ')})`;
const rad = (d) => (d * Math.PI) / 180;
const gauss = (x, mu, s) => Math.exp(-(((x - mu) / s) ** 2));

/** Ginkgo: a fan on a stalk, the rim waved and notched in the middle. */
const ginkgo = () => {
  const ax = 50;
  const ay = 70;
  const R = 52;
  const half = 62;
  const pts = [[51.4, 99], [51.4, ay + 3]];
  // right edge, bowed in a little
  for (let i = 1; i <= 4; i++) {
    const t = i / 5;
    const r = R * t;
    const a = rad(half - 6 * Math.sin(Math.PI * t));
    pts.push([ax + r * Math.sin(a), ay - r * Math.cos(a)]);
  }
  for (let d = half; d >= -half; d -= 4) {
    const notch = 15 * Math.max(0, 1 - Math.abs(d) / 7);
    const r = R * (1 + 0.035 * Math.cos(rad(d * 11))) - notch;
    pts.push([ax + r * Math.sin(rad(d)), ay - r * Math.cos(rad(d))]);
  }
  for (let i = 4; i >= 1; i--) {
    const t = i / 5;
    const r = R * t;
    const a = rad(-half + 6 * Math.sin(Math.PI * t));
    pts.push([ax + r * Math.sin(a), ay - r * Math.cos(a)]);
  }
  pts.push([48.6, ay + 3], [48.6, 99]);
  return polyOf(pts);
};

/** Monstera: a heart-shaped blade slashed in from the margin almost to the midrib, on a stalk. */
const monstera = () => {
  const cx = 50;
  const cy = 46;
  const rx = 42;
  const ry = 44;
  const R = (a) =>
    (1 + 0.1 * gauss(a, 0, 16) + 0.1 * gauss(a, 360, 16)) * (1 - 0.5 * gauss(a, 180, 14));
  const at = (a) => [cx + rx * R(a) * Math.sin(rad(a)), cy - ry * R(a) * Math.cos(rad(a))];
  const inner = (a) => {
    const [x, y] = at(a);
    return [50 + (x - 50) * 0.16, cy + (y - cy) * 0.6 - 3];
  };
  const cuts = [52, 90, 128, 232, 270, 308];
  const w = 4;
  const pts = [];
  for (let a = 0; a < 360; a += 2) {
    if (a === 180) {
      pts.push(at(176), [51.4, cy + ry * 0.52], [51.4, 99], [48.6, 99], [48.6, cy + ry * 0.52], at(184));
      continue;
    }
    if (a > 176 && a < 184) continue;
    const cut = cuts.find((c) => Math.abs(a - c) <= w);
    if (cut !== undefined) {
      if (a === cut) pts.push(at(cut - w), inner(cut), at(cut + w));
      continue;
    }
    pts.push(at(a));
  }
  return polyOf(pts);
};

/** Oak: a lobed blade on a short stalk. */
const oak = () => {
  const right = [];
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const env = 40 * Math.sin(Math.PI * t ** 0.85) * (1 - 0.25 * t);
    const lobe = 0.5 + 0.5 * Math.abs(Math.cos(Math.PI * 3.5 * t)) ** 0.7;
    right.push([50 + env * lobe, 86 - 80 * t]);
  }
  const left = right.map(([x, y]) => [100 - x, y]).reverse();
  return polyOf([[51.5, 98], [51.5, 86], ...right, ...left, [48.5, 86], [48.5, 98]]);
};

/** Maple: five pointed lobes, the lower pair small. */
const maple = () => {
  const half = [
    [50, 4], [56, 19], [63, 14], [61, 31], [70, 34], [86, 20], [82, 37], [94, 39],
    [82, 51], [85, 60], [70, 61], [76, 74], [61, 70], [53, 73], [52, 98],
  ];
  const left = half.slice(1, -1).map(([x, y]) => [100 - x, y]).reverse();
  return polyOf([...half, [48, 98], [47, 73], ...left]);
};

/** Elm: an oval blade with a sawtooth margin. */
const elm = () => {
  const right = [];
  const n = 18;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const env = 30 * Math.sin(Math.PI * t) ** 0.8 * (1 + 0.15 * (0.5 - t));
    right.push([50 + env, 84 - 78 * t]);
    if (i < n) right.push([50 + env * 0.9, 84 - 78 * (t + 0.6 / n)]);
  }
  const left = right.map(([x, y]) => [100 - x, y]).reverse();
  return polyOf([[51.2, 98], [51.2, 84], ...right, ...left, [48.8, 84], [48.8, 98]]);
};

/** Fern: a lance-shaped frond cut into pinnae that sweep toward the tip. */
const fern = () => {
  const right = [];
  const n = 11;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const t2 = (i + 1) / n;
    const env = 44 * Math.sin(Math.PI * (0.12 + 0.88 * t) ** 1.2) * (1 - 0.6 * t);
    right.push([52, 94 - 90 * t]);
    right.push([52 + env, 94 - 90 * t - 10]);
    right.push([52 + env * 0.5, 94 - 90 * t2 + 2]);
  }
  right.push([50, 2]);
  const left = right.slice(0, -1).map(([x, y]) => [100 - x, y]).reverse();
  return polyOf([[51.2, 99], ...right, ...left, [48.8, 99]]);
};

/** A butterfly seen from above, from a polar outline of bumps. */
const butterfly = () => {
  const pts = [];
  for (let d = 0; d < 360; d += 3) {
    const a = d > 180 ? 360 - d : d;
    const r =
      0.16 + 0.84 * gauss(a, 52, 26) + 0.62 * gauss(a, 122, 20) + 0.42 * gauss(a, 160, 7) + 0.1 * gauss(a, 0, 6);
    pts.push([50 + 48 * r * Math.sin(rad(d)), 52 - 48 * r * Math.cos(rad(d))]);
  }
  return polyOf(pts);
};

/** A scallop shell: a ribbed fan with its two ears at the hinge. */
const scallop = () => {
  const hx = 50;
  const hy = 82;
  const R = 64;
  const pts = [[34, 90], [35, 82], [42, 79]];
  for (let d = -48; d <= 48; d += 2) {
    const rib = 1 + 0.035 * Math.abs(Math.cos(rad((d + 48) * 7.5)));
    pts.push([hx + R * 1.02 * rib * Math.sin(rad(d)), hy - R * rib * Math.cos(rad(d))]);
  }
  pts.push([58, 79], [65, 82], [66, 90]);
  return polyOf(pts);
};

/** A samara: a seed bulb with one veined wing sweeping off it. */
const samara = () => {
  const pts = [];
  for (let d = 200; d <= 340; d += 10) pts.push([30 + 14 * Math.cos(rad(d)), 78 + 14 * Math.sin(rad(d))]);
  // wing: upper edge, then the rounded tip, then the lower edge back to the bulb
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    pts.push([40 + 52 * t, 66 - 56 * t + 10 * Math.sin(Math.PI * t)]);
  }
  for (let d = -40; d <= 140; d += 15) pts.push([88 + 9 * Math.cos(rad(d)), 14 + 9 * Math.sin(rad(d))]);
  for (let i = 10; i >= 0; i--) {
    const t = i / 10;
    pts.push([42 + 40 * t, 86 - 66 * t + 18 * Math.sin(Math.PI * t)]);
  }
  for (let d = 30; d <= 160; d += 10) pts.push([30 + 14 * Math.cos(rad(d)), 78 + 14 * Math.sin(rad(d))]);
  return polyOf(pts);
};

/** Tulip cup: a rounded bowl with three petal tips along its rim. */
const tulipCup = () => {
  const pts = [];
  for (let d = 0; d <= 90; d += 10) pts.push([50 - 40 * Math.sin(rad(d)), 50 + 46 * Math.cos(rad(d))]);
  pts.push([11, 30], [14, 6], [26, 16], [34, 28], [42, 10], [50, 2], [58, 10], [66, 28], [74, 16], [86, 6], [89, 30]);
  for (let d = 90; d >= 0; d -= 10) pts.push([50 + 40 * Math.sin(rad(d)), 50 + 46 * Math.cos(rad(d))]);
  return polyOf(pts);
};

/** A tiered fir, three skirts of branches. */
const fir = () =>
  polyOf([
    [50, 0], [66, 28], [58, 28], [76, 56], [64, 56], [86, 86], [14, 86], [36, 56], [24, 56], [42, 28], [34, 28],
  ]);

/** A spray of three slender bamboo leaves from one point at the left. */
const bambooSpray = () => {
  const leaf = (ang, len, w) => {
    const out = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const h = w * Math.sin(Math.PI * t ** 0.8);
      out.push([t * len, -h]);
    }
    for (let i = 7; i >= 1; i--) {
      const t = i / 8;
      const h = w * Math.sin(Math.PI * t ** 0.8);
      out.push([t * len, h * 0.4]);
    }
    const a = rad(ang);
    return out.map(([x, y]) => [4 + x * Math.cos(a) - y * Math.sin(a), 50 + x * Math.sin(a) + y * Math.cos(a)]);
  };
  return polyOf([...leaf(-24, 92, 8), ...leaf(6, 96, 8), ...leaf(34, 84, 7)]);
};

/** Frangipani: five petals that overlap like a pinwheel, each lobe swelling early. */
const frangipani = () => {
  const pts = [];
  for (let d = 0; d < 360; d += 2) {
    const f = ((d * 5) / 360) % 1;
    const r = 0.3 + 0.7 * Math.sin(Math.PI * f ** 0.62) ** 0.85;
    pts.push([50 + 48 * r * Math.cos(rad(d)), 50 + 48 * r * Math.sin(rad(d))]);
  }
  return polyOf(pts);
};

/** A conker husk: a round green case bristling with short spikes. */
const husk = () => {
  const pts = [];
  const n = 26;
  for (let k = 0; k < n; k++) {
    const a0 = (360 * k) / n;
    const a1 = (360 * (k + 0.5)) / n;
    pts.push([50 + 38 * Math.cos(rad(a0)), 50 + 38 * Math.sin(rad(a0))]);
    pts.push([50 + 49 * Math.cos(rad(a1)), 50 + 49 * Math.sin(rad(a1))]);
  }
  return polyOf(pts);
};

// -- small helpers -----------------------------------------------------------

/** A per-cell ink, rolled once and read in several places with @var(--name). */
const K = (c, name = 'k', s = 1) => `--${name}: ${ink(c, s)};`;
/** The per-cell ink read back, as a pick so it stays a sampled ink. */
const KK = (name = 'k') => `@p(@var(--${name}))`;
/** An ellipse of radii rx, ry (percent of the box) centered at x y, hard edged. */
const ovalL = (rx, ry, at) => `radial-gradient(${rx} ${ry} at ${at}, #000 100%, transparent 100%)`;
/** The same, inverted: a hole. */
const holeL = (rx, ry, at) => `radial-gradient(${rx} ${ry} at ${at}, transparent 100%, #000 100%)`;
/** n hard-edged spokes `on` degrees wide around `at`, as a conic mask layer. */
const spokes = (n, on, { at = '50% 50%', from = 0 } = {}) => {
  const p = 360 / n;
  const f = (v) => `${Math.round(v * 100) / 100}deg`;
  const stops = [];
  for (let i = 0; i < n; i++) {
    stops.push(`#000 ${f(i * p)} ${f(i * p + on)}, transparent ${f(i * p + on)} ${f((i + 1) * p)}`);
  }
  return `conic-gradient(from ${from}deg at ${at}, ${stops.join(', ')})`;
};
/** A random organic radius, eight corners rolled from lo to hi percent. */
const blob = (lo, hi) => {
  const r = () => `@r(${lo}, ${hi})%`;
  return `border-radius: ${r()} ${r()} ${r()} ${r()} / ${r()} ${r()} ${r()} ${r()};`;
};

// -- leaves ------------------------------------------------------------------

add(
  'Ginkgo',
  'Fan-shaped ginkgo leaves with a notched, waved rim and a fine stalk, drifting at angles that lean together across the sheet.',
  (c) => ({
    host: `--ginkgo: ${ginkgo()};`,
    rule: `${F} { background: ${ink(c)}; ${cp('@var(--ginkgo)')} ${xf(`rotate(@calc(${noise(-120, 120, 3)} + @r(-25, 25))deg) scale(1.15)`)} }${TR}`,
  }),
  {
    pal: 38,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['leaves', 'semicircles'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

add(
  'Monstera',
  'Big split monstera leaves, slashed in from the margin almost to the pale midrib, overlapping at angles that sway together across the sheet.',
  (c) => ({
    host: `--monstera: ${monstera()};`,
    rule: `${F} { background: ${ink(c)}; ${cp('@var(--monstera)')} z-index: @r(1, 9, 1);
      ${xf(`rotate(@calc(${noise(-90, 90, 2)} + @r(-30, 30))deg) scale(1.3)`)}
      ${A('left: 49.2%; width: 1.6%; top: 6%; bottom: 0; background: var(--color1); opacity: 0.7;')} }${TR}`,
  }),
  {
    palette: ['#10241D', '#E9E4C9', '#2F7A4D', '#4E9F5E', '#1D5E44', '#86B86A'],
    grid: '4x6',
    tg: '4x4',
    min: 54,
    meta: { tags: ['leaves', 'curves'], mood: ['organic', 'bold'], density: 'dense', goodFor: ['wallpaper', 'poster', 'textile'] },
  }
);

add(
  'Leaf Litter',
  'Fallen oak, maple and elm leaves scattered at every angle, each with a pale midrib.',
  (c) => ({
    host: `--oak: ${oak()}; --maple: ${maple()}; --elm: ${elm()};`,
    rule: `${F} { background: ${ink(c)}; ${cp('@p(@var(--oak), @var(--maple), @var(--elm))')}
      ${xf(`translate(@r(-10, 10)%, @r(-10, 10)%) rotate(@r(0, 360)deg) scale(@r(0.95, 1.25))`)} z-index: @r(1, 9, 1);
      ${A('left: 49.2%; width: 1.6%; top: 10%; bottom: 0; background: var(--color5); opacity: 0.55;')} }${TR}`,
  }),
  {
    pal: 38,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['leaves', 'mosaic'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

add(
  'Bracken',
  'Fern fronds laid in a herringbone, each lance-shaped frond cut into pinnae that sweep toward its tip.',
  (c) => ({
    host: `--fern: ${fern()};`,
    rule: `${F} { background: ${ink(c)}; ${cp('@var(--fern)')}
      ${xf('rotate(@calc(38 - 76 * (@y % 2))deg) scale(1.3, 1.5)')} }${TR}`,
  }),
  {
    palette: ['#F1EEE4', '#2F5233', '#4F7942', '#7DA05A', '#A3B86C', '#B9873F'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['leaves', 'chevrons', 'zigzags'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['textile', 'wallpaper'] },
  }
);

add(
  'Silver Dollar',
  'Eucalyptus stems climbing the sheet behind round coin leaves, the coins alternating single and in pairs.',
  (c) => ({
    rule: `${F} { background: linear-gradient(90deg, transparent 0 47.5%, var(--color1) 47.5% 52.5%, transparent 52.5%);
      ${B(`left: @match((x + y) % 2 == 0, 50%, 26%); top: 50%; width: @match((x + y) % 2 == 0, ${noise(58, 76, 2)}%, 47%); height: @match((x + y) % 2 == 0, ${noise(58, 76, 2)}%, 47%); border-radius: 50%; background: ${ink(c, 2)}; ${xf('translate(-50%, -50%)')}`)}
      ${A(`left: 74%; top: 50%; width: 47%; height: 47%; border-radius: 50%; background: ${ink(c, 2)}; ${xf('translate(-50%, -50%)')} opacity: @match((x + y) % 2 == 0, 0, 1);`)}
    }${TR}`,
  }),
  {
    palette: ['#1F2B2A', '#C9A27E', '#9DB4AB', '#C9D6CF', '#6F8F86', '#E5EDE8'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'dots', 'lines', 'grid'], mood: ['calm', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

add(
  'Bamboo',
  'Bamboo canes rising in segments, each joint a small gap, with sprays of slender leaves springing from some of the nodes.',
  (c) => ({
    host: `--spray: ${bambooSpray()};`,
    rule: `${F} {
      ${B(`left: @calc(16 + 9 * ((@x * 7 + 3) % 5))%; width: @calc(18 + 5 * ((@x * 3) % 3))%; top: 5%; bottom: 0; border-radius: 14% / 4%; background: ${ink(c)};`)}
      ${A(`left: @calc(24 + 9 * ((@x * 7 + 3) % 5))%; top: -20%; width: 115%; height: 46%; background: ${ink(c)}; ${cp('@var(--spray)')} transform-origin: 4% 50%; ${xf('rotate(@p(-30deg, 25deg, 155deg, 210deg))')} opacity: @p(0, 0, 1);`)}
    }${TR}`,
  }),
  {
    pal: 34,
    inks: 4,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['stripes', 'leaves', 'lines'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

add(
  'Conker',
  'Horse chestnuts bursting from their spiny green husks, each case split open on one side to show the glossy nut and its pale scar.',
  (c) => ({
    host: `--husk: ${husk()};`,
    rule: `${F} { ${xf(`translate(@r(-8, 8)%, @r(-8, 8)%) rotate(@r(0, 360)deg) scale(${noise(0.75, 1.05, 3)})`)}
      ${B(`inset: 0; background: @p(var(--color2), var(--color3), var(--color4)); ${cp('@var(--husk)')} ${msk(pieL('262deg', { from: '140deg' }))}`)}
      ${A(`left: 36%; top: 23%; width: 52%; height: 56%; border-radius: 50%; background: radial-gradient(34% 64% at 100% 50%, var(--color1) 0 100%, transparent 100%), @p(var(--color5), var(--color6));`)}
    }${TR}`,
  }),
  {
    palette: ['#F1E7D3', '#E9D3A6', '#6E8B3D', '#8FA34A', '#4F6B2E', '#7A3E1D', '#5A2A12'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['circles', 'stars', 'semicircles'], mood: ['organic', 'playful'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

add(
  'Kelp',
  'A kelp forest: long ribbon blades waving up the sheet side by side, with a gas float here and there along their edges.',
  (c) => ({
    rule: `${F} {
      ${B(`inset: 0; background: @match(@x % 4 == 1, var(--color2), @match(@x % 4 == 2, var(--color4), @match(@x % 4 == 3, var(--color3), var(--color5)))); ${cp('polygon(@calc(50 + 14 * sin((@y - 1) * 0.8 + @x * 2.1) - 20 - 6 * sin((@y - 1) * 0.55 + @x * 1.3))% 0%, @calc(50 + 14 * sin((@y - 1) * 0.8 + @x * 2.1) + 20 + 6 * sin((@y - 1) * 0.55 + @x * 1.3))% 0%, @calc(50 + 14 * sin((@y - 0.5) * 0.8 + @x * 2.1) + 20 + 6 * sin((@y - 0.5) * 0.55 + @x * 1.3))% 50%, @calc(50 + 14 * sin((@y) * 0.8 + @x * 2.1) + 20 + 6 * sin((@y) * 0.55 + @x * 1.3))% 100%, @calc(50 + 14 * sin((@y) * 0.8 + @x * 2.1) - 20 - 6 * sin((@y) * 0.55 + @x * 1.3))% 100%, @calc(50 + 14 * sin((@y - 0.5) * 0.8 + @x * 2.1) - 20 - 6 * sin((@y - 0.5) * 0.55 + @x * 1.3))% 50%)')}`)}
      ${A(`left: @calc(50 + 14 * sin((@y - 0.5) * 0.8 + @x * 2.1) + 20 + 6 * sin((@y - 0.5) * 0.55 + @x * 1.3) - 4)%; top: 36%; width: 16%; height: 22%; border-radius: 50%; background: @p(var(--color1), var(--color6)); opacity: @p(0, 0, 1); ${xf('rotate(@r(-30, 30)deg)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#0E2A33', '#E0B860', '#8C7A2E', '#5E7D3A', '#A3A84B', '#3F6B4A', '#F0D9A0'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['waves', 'stripes', 'curves'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'hero-background', 'textile'] },
  }
);

// -- flowers and seeds -------------------------------------------------------

add(
  'Frangipani',
  'Frangipani blossoms with five petals overlapping like a pinwheel, each flower glowing yellow at its throat.',
  (c) => ({
    host: `--frangipani: ${frangipani()};`,
    rule: `${F} { ${xf(`translate(@r(-8, 8)%, @r(-8, 8)%) rotate(@r(0, 72)deg) scale(${noise(0.7, 1.1, 3)})`)}
      ${B(`inset: 0; background: radial-gradient(circle at 50% 50%, var(--color1) 0 7%, transparent 36%), ${ink(c, 2)}; ${cp('@var(--frangipani)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#163A2E', '#F6C84C', '#FBF5EC', '#F4B6C2', '#E8836B', '#F7DCC0'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['petals', 'spirals', 'radial'], mood: ['elegant', 'organic'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

add(
  'Phyllotaxis',
  'One sunflower head across the whole sheet: seeds set at the golden angle in interlocking spirals, ringed by petals.',
  (c) => ({
    rule: `${F} {
      ${xf(`translate(@calc(100 * (@X / 2 + 0.42 * min(@X, @Y) / sqrt(@I) * sqrt(@i - 0.5) * cos(@i * 2.399963) - @x + 0.5))%, @calc(100 * (@Y / 2 + 0.42 * min(@X, @Y) / sqrt(@I) * sqrt(@i - 0.5) * sin(@i * 2.399963) - @y + 0.5))%) rotate(@calc(@i * 137.5078)deg) scale(@calc(0.42 * min(@X, @Y) / sqrt(@I) * 2.6 * (0.8 + 0.4 * sqrt(@i / @I))))`)}
      ${B('left: @match(i > I * 0.82, 30%, 15%); width: @match(i > I * 0.82, 165%, 70%); top: @match(i > I * 0.82, 32%, 20%); height: @match(i > I * 0.82, 36%, 60%); border-radius: 50%; background: @match(i > I * 0.82, @p(var(--color1), var(--color2)), @p(var(--color3), var(--color4), var(--color5)));')}
    }${TR}`,
  }),
  {
    palette: ['#FBF3DC', '#F2A900', '#E0701B', '#6B3A17', '#3B2210', '#9A5B26'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['spirals', 'radial', 'dots', 'ovals'], mood: ['organic', 'bold'], density: 'medium', goodFor: ['poster', 'og-image'] },
  }
);

add(
  'Dandelion',
  'Dandelion clocks on fine stalks: rays spread from a seed head, each ending in a small tuft.',
  (c) => ({
    host: `--rays: ${spokes(28, 3.2)}; --tufts: ${spokes(28, 7, { from: -1.9 })};`,
    rule: `${F} { background: radial-gradient(circle at 50% 50%, var(--color2) 0 8%, transparent 8%), linear-gradient(90deg, transparent 0 49%, var(--color2) 49% 51%, transparent 51%) 0 100% / 100% 50% no-repeat;
      ${xf(`translate(@r(-6, 6)%, @r(-6, 6)%) rotate(@r(-20, 20)deg) scale(${noise(0.75, 1.05, 3)})`)}
      ${B(`inset: 6%; border-radius: 50%; background: ${ink(c, 3)}; ${mskI('@var(--rays)', 'radial-gradient(circle closest-side, transparent 30%, #000 30% 84%, transparent 84%)')}`)}
      ${A(`inset: 6%; border-radius: 50%; background: ${ink(c, 3)}; ${mskI('@var(--tufts)', 'radial-gradient(circle closest-side, transparent 83%, #000 83% 100%, transparent 100%)')}`)}
    }${TR}`,
  }),
  {
    pal: 45,
    grid: '6x9',
    min: 48,
    tg: '5x5',
    meta: { tags: ['radial', 'lines', 'circles'], mood: ['calm', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'hero-background'] },
  }
);

add(
  'Tulip',
  'Tulip cups with three pointed petals on straight stems, each with one long leaf, nodding a little out of line.',
  (c) => ({
    host: `--cup: ${tulipCup()};`,
    rule: `${F} { background: linear-gradient(90deg, transparent 0 48.5%, var(--color1) 48.5% 51.5%, transparent 51.5%) 0 100% / 100% 56% no-repeat;
      transform-origin: 50% 100%; ${xf(`rotate(${noise(-12, 12, 3)}deg)`)}
      ${B(`left: 22%; right: 22%; top: 6%; height: 46%; background: ${ink(c, 2)}; ${cp('@var(--cup)')}`)}
      ${A(`left: 50%; top: 56%; width: 30%; height: 40%; border-radius: 0 100% 0 100%; background: var(--color1); transform-origin: 0 100%; ${xf('scaleX(@p(1, -1))')}`)}
    }${TR}`,
  }),
  {
    palette: ['#FBF4E8', '#2F6B3C', '#E63946', '#F28C28', '#F2C14E', '#C2185B', '#7B2D8E'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['petals', 'leaves', 'grid'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

add(
  'Sand Dollar',
  'Sand dollars resting on the sea floor, each pale disc marked with its five-petal star of slots.',
  (c) => ({
    rule: `${F} { ${xf(`translate(@r(-8, 8)%, @r(-8, 8)%) rotate(@r(0, 72)deg) scale(${noise(0.62, 1, 3)})`)}
      ${B(`inset: 5%; border-radius: 50%; background: ${ink(c)}; ${msk(`conic-gradient(from -5deg, ${[0, 1, 2, 3, 4].map((k) => `transparent ${k * 72}deg ${k * 72 + 10}deg, #000 ${k * 72 + 10}deg ${k * 72 + 72}deg`).join(', ')})`, 'radial-gradient(circle closest-side, #000 0 22%, transparent 22% 70%, #000 70%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#24586A', '#F4EBDD', '#E6D3B3', '#D9BE95', '#FBF7F0'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'stars', 'radial'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'textile', 'hero-background'] },
  }
);

add(
  'Lunaria',
  'Honesty seed pods: translucent oval discs on short stalks, overlapping on the sheet, each showing the three dark seeds inside it.',
  (c) => ({
    rule: `${F} { ${xf(`translate(@r(-10, 10)%, @r(-10, 10)%) rotate(@r(-30, 30)deg) scale(@r(0.8, 1.05))`)}
      ${B(`left: 8%; right: 8%; top: 2%; bottom: 10%; border-radius: 50%; background: ${ink(c, 2)}; opacity: @r(0.55, 0.85);`)}
      ${A(`inset: 0; background: var(--color1); ${msk(ovalL('6%', '8%', '47% 26%'), ovalL('6%', '8%', '53% 45%'), ovalL('6%', '8%', '47% 64%'), 'linear-gradient(90deg, transparent 0 48.5%, #000 48.5% 51.5%, transparent 51.5%) 0 100% / 100% 12% no-repeat')}`)}
    }${TR}`,
  }),
  {
    palette: ['#EFE9DF', '#4E3B57', '#B8A9C9', '#9FB8B0', '#D9AE9C', '#C9C098'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['ovals', 'dots', 'circles'], mood: ['calm', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'hero-background', 'textile'] },
  }
);

add(
  'Mackerel',
  'Striped mackerel laid in rows like a fishmonger\'s print, each row swimming the opposite way to the one above.',
  (c) => ({
    host: '--fish: @shape(fish);',
    rule: `${F} { ${xf(`translate(@r(-6, 6)%, @r(-10, 10)%) rotate(@r(-8, 8)deg) scaleX(@calc(1 - 2 * (@y % 2)))`)}
      ${B(`left: -8%; top: 16%; width: 116%; height: 68%; ${cp('@var(--fish)')} background: repeating-linear-gradient(90deg, transparent 0 12%, var(--color1) 12% 17%), ${ink(c, 2)};`)}
      ${A('left: 16%; top: 42%; width: 8%; height: 8%; border-radius: 50%; background: var(--color1);')}
    }${TR}`,
  }),
  {
    pal: 43,
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['ovals', 'stripes', 'grid'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

add(
  'Opuntia',
  'Prickly pear cactus: oval pads budding from the shoulders of one another, each dotted all over with pale areoles.',
  (c) => ({
    rule: `${F} { width: 40%; height: 54%; top: 20%; border-radius: 50%;
      background: radial-gradient(circle closest-side, var(--color1) 0 28%, transparent 28%) 0 0 / 33.3% 25%, ${ink(c, 2)};
      ${xf(`rotate(${noise(-12, 12, 3)}deg)`)}
      ${B(`left: -24%; bottom: 84%; width: 86%; height: 84%; border-radius: 50%; background: radial-gradient(circle closest-side, var(--color1) 0 28%, transparent 28%) 0 0 / 33.3% 25%, ${ink(c, 2)}; transform-origin: 50% 100%; ${xf('rotate(-34deg)')} opacity: @p(0, 1, 1);`)}
      ${A(`left: 38%; bottom: 82%; width: 80%; height: 80%; border-radius: 50%; background: radial-gradient(circle closest-side, var(--color1) 0 28%, transparent 28%) 0 0 / 33.3% 25%, ${ink(c, 2)}; transform-origin: 50% 100%; ${xf('rotate(30deg)')} opacity: @p(0, 1, 1);`)}
    }${TR}`,
  }),
  {
    palette: ['#F6EBDD', '#F7F1E6', '#4E7D5B', '#6E9E6E', '#33604A', '#9BB878'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['ovals', 'dots'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'packaging'] },
  }
);

add(
  'Arboretum',
  'Rows of stylized trees, round, tiered and columnar, standing in staggered ranks in front of one another like a mid-century print.',
  (c) => ({
    host: `--fir: ${fir()};`,
    rule: `${F} { z-index: @y; ${xf(`translateX(@calc(50 * (@y % 2) - 25 + @r(-6, 6))%) scale(${noise(0.85, 1.12, 3)})`)}
      ${B('left: 47.5%; width: 5%; top: 62%; bottom: 2%; background: var(--color1);')}
      ${A(`left: 4%; right: 4%; top: -22%; height: 100%; background: ${ink(c, 2)}; ${cp('@p(circle(36% at 50% 46%), @var(--fir), ellipse(20% 47% at 50% 50%))')}`)}
    }${TR}`,
  }),
  {
    palette: ['#F3EAD7', '#5B3A29', '#2F5D50', '#6E9A5A', '#C9A227', '#D9643A', '#1F3B3A'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'triangles', 'ovals'], mood: ['retro', 'playful'], density: 'medium', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// -- creatures and the sea ---------------------------------------------------

add(
  'Carp Scales',
  'Fish scales tucked row under row in a running bond, each scale two-toned with a darker heart inside its rim.',
  (c) => ({
    rule: `--j: ${ink(c)}; ${F} { width: 100%; height: 200%; z-index: @calc(100 - @y);
      ${xf('translate(@calc(-50 * ((@y + 1) % 2))%, -25%)')}
      border-radius: 0 0 50% 50% / 0 0 50% 50%;
      background: radial-gradient(50% 100% at 50% 0%, @var(--j) 0 60%, transparent 60%) 0 100% / 100% 50% no-repeat, ${ink(c)};
      ${A('top: 0; left: 100%; width: 100%; height: 100%; background: inherit; border-radius: inherit;')}
    }${TR}`,
  }),
  {
    pal: 41,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['scallops', 'semicircles', 'arcs'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['textile', 'wallpaper'] },
  }
);

add(
  'Peacock',
  'Peacock tail feathers row on row, each a fringed plume of barbs around a ringed eye.',
  (c) => ({
    host: `--barbs: ${spokes(32, 6, { at: '50% 58%' })};`,
    rule: `${F} { z-index: @y; ${xf(`rotate(${noise(-25, 25, 3)}deg)`)}
      ${B(`left: 6%; right: 6%; top: -10%; bottom: -2%; border-radius: 50% 50% 50% 50% / 56% 56% 44% 44%; background: ${ink(c, 3)}; ${msk('@var(--barbs)', ovalL('32%', '30%', '50% 58%'))}`)}
      ${A(`left: 28%; right: 28%; top: 22%; bottom: 22%; border-radius: 50% 50% 50% 50% / 56% 56% 44% 44%; background: radial-gradient(50% 50% at 50% 58%, var(--color1) 0 42%, var(--color2) 42% 68%, transparent 68%), ${ink(c, 3)};`)}
    }${TR}`,
  }),
  {
    palette: ['#0B1E2D', '#1F3F8C', '#1B998B', '#5FAD56', '#F2C14E', '#B4654A', '#2BB3A3'],
    grid: '6x9',
    min: 50,
    tg: '4x4',
    meta: { tags: ['ovals', 'radial', 'concentric'], mood: ['elegant', 'bold'], density: 'dense', goodFor: ['textile', 'wallpaper', 'poster'] },
  }
);

add(
  'Fritillary',
  'Butterflies with spotted wings fluttering at tilted angles, scattered over the sheet.',
  (c) => ({
    host: `--wings: ${butterfly()};`,
    rule: `${F} { background: ${ink(c, 2)}; ${cp('@var(--wings)')}
      ${xf(`translate(@r(-8, 8)%, @r(-8, 8)%) rotate(@calc(${noise(-40, 40, 3)} + @r(-15, 15))deg) scale(@r(0.95, 1.2))`)}
      ${B(`inset: 0; background: var(--color1); ${msk(ovalL('9%', '9%', '26% 36%'), ovalL('9%', '9%', '74% 36%'), ovalL('6%', '6%', '34% 68%'), ovalL('6%', '6%', '66% 68%'))}`)}
      ${A('left: 47%; width: 6%; top: 26%; height: 52%; border-radius: 50%; background: var(--color1);')}
    }${TR}`,
  }),
  {
    pal: 6,
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['petals', 'dots', 'ovals'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

add(
  'Cockle',
  'Scallop shells with a fluted rim and two ears at the hinge, their ribs parted by fine grooves fanning from it.',
  (c) => ({
    host: `--shell: ${scallop()}; --grooves: ${spokes(18, 16.4, { at: '50% 82%', from: -52 })};`,
    rule: `${F} { background: ${ink(c)}; ${cp('@var(--shell)')} ${msk('@var(--grooves)', 'linear-gradient(180deg, transparent 0 66%, #000 66%)')}
      ${xf('rotate(@p(0deg, 180deg)) scale(0.96)')} }${TR}`,
  }),
  {
    pal: 5,
    inks: 4,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['scallops', 'radial', 'lines'], mood: ['organic', 'elegant'], density: 'medium', goodFor: ['textile', 'packaging'] },
  }
);

add(
  'Ammonite',
  'Coiled ammonite fossils, each a spiral groove winding out from the center, its outer whorls crossed by radial ribs.',
  (c) => ({
    host: `--ribs: ${spokes(24, 12, { at: '48% 50%' })};`,
    rule: `${K(c)} ${F} { ${msk('@var(--ribs)', ovalL('24%', '24%', '48% 50%'))} ${xf(`translate(@r(-6, 6)%, @r(-6, 6)%) rotate(@r(0, 360)deg) scale(${noise(0.75, 1.08, 3)})`)}
      ${B(`left: 4%; top: 6%; width: 88%; height: 88%; border-radius: 50%; background: ${KK()}; ${mskI('repeating-radial-gradient(circle closest-side at 50% 50%, #000 0 15%, transparent 15% 19%)', 'linear-gradient(180deg, #000 0 50%, transparent 50%)')}`)}
      ${A(`left: 8.18%; top: 6%; width: 88%; height: 88%; border-radius: 50%; background: ${KK()}; ${mskI('repeating-radial-gradient(circle closest-side at 50% 50%, #000 0 5.5%, transparent 5.5% 9.5%, #000 9.5% 19%)', 'linear-gradient(180deg, transparent 0 50%, #000 50%)')}`)}
    }${TR}`,
  }),
  {
    pal: 31,
    grid: '6x9',
    min: 50,
    tg: '5x5',
    meta: { tags: ['spirals', 'circles', 'radial'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['textile', 'card-texture'] },
  }
);

// -- stone and wood ----------------------------------------------------------

add(
  'Stone Stack',
  'Smooth river stones balanced three high, each stone a different soft shape that shifts when the pile is reset.',
  (c) => ({
    rule: `${F} { width: 54%; height: 21%; top: 6%; ${blob(38, 62)} background: ${ink(c)}; ${xf(`rotate(@r(-6, 6)deg)`)}
      ${B(`left: -32%; top: 98%; width: 164%; height: 132%; ${blob(36, 64)} background: ${ink(c)}; ${xf('rotate(@r(-4, 4)deg)')}`)}
      ${A(`left: 16%; bottom: 97%; width: 68%; height: 104%; ${blob(36, 64)} background: ${ink(c)}; ${xf('rotate(@r(-8, 8)deg)')}`)}
    }${TR}`,
  }),
  {
    pal: 33,
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['ovals', 'blocks', 'steps'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'hero-background'] },
  }
);

add(
  'Woodpile',
  'Sawn log ends stacked in a woodpile, every one showing its growth rings around an off-center heart and a drying crack.',
  (c) => ({
    rule: `--cx: @r(36, 64)%; --cy: @r(36, 64)%; ${F} { ${xf(`rotate(@r(0, 360)deg) scale(${noise(0.8, 1.04, 3)})`)}
      ${B(`inset: 1%; ${blob(44, 56)} background: @p(var(--color1), var(--color2));`)}
      ${A(`inset: 8%; ${blob(44, 56)} background: ${ink(c, 3)}; ${mskI('repeating-radial-gradient(circle at @var(--cx) @var(--cy), #000 0 9%, transparent 9% 13%)', pieL('346deg', { from: '@r(360)deg', at: '@var(--cx) @var(--cy)' }))}`)}
    }${TR}`,
  }),
  {
    palette: ['#2B211C', '#5C3B28', '#7A4E33', '#E2C08D', '#D19C62', '#F0D9B5', '#C7864F'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['rings', 'concentric', 'circles'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['textile', 'card-texture', 'wallpaper'] },
  }
);

add(
  'Lily Pad',
  'Round lily pads with a wedge notched out of each, large and small ones floating together on still water.',
  (c) => ({
    rule: `${F} {
      ${B(`left: 4%; top: 4%; width: 92%; height: 92%; border-radius: 50%; background: ${ink(c)}; ${msk(pieL('328deg'))} ${xf(`translate(@r(-8, 8)%, @r(-8, 8)%) rotate(@r(0, 360)deg) scale(${noise(0.5, 1.15, 3)})`)}`)}
      ${A(`left: 60%; top: 60%; width: 34%; height: 34%; border-radius: 50%; background: ${ink(c)}; ${msk(pieL('325deg'))} ${xf('rotate(@r(0, 360)deg)')} opacity: @p(0, 1, 1);`)}
    }${TR}`,
  }),
  {
    pal: 40,
    inks: 3,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'dots'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'hero-background'] },
  }
);

export const sectionE = { title: 'E. Grove', all };
