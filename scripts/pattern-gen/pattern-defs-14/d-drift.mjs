// D. Drift - fields steered by 2D noise: strokes that flow, dots that cloud, levels that contour.
//
// Every design here reads css-doodle's 2D noise (@rn, through the shared
// noise() helper): neighboring cells get neighboring values, so a field
// flows, clouds and contours instead of scattering. A noise value read in
// more than one place is set once per cell as a custom property
// (`--n: @rn(...)`) and read back at generation time with css-doodle's
// `$(n)` (`$deg(n)` adds the unit), so every read sees the same sample; two
// separate @rn calls are two independent fields.
//
// Noise samples are bell-shaped: @rn(0, 1) lands between 0.27 and 0.73 nine
// times in ten, so a value meant to sweep its whole range is drawn from a
// wider one and clamped (see `wide`).
import { section, F, TR, ink, cp, msk, mskI, B, A, noise } from './shared.mjs';

const { add, all } = section('D. Drift');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const tfo = (v) => `-webkit-transform-origin: ${v}; transform-origin: ${v};`;

/** A per-cell noise sample, read back with $(name). */
const nv = (name, from, to, f = 1) => `--${name}: ${noise(from, to, f)};`;

/** A 0-1 sample stretched so the field reaches both ends (clamped). */
const wide = (name, f = 1) => `--${name}: ${noise(-0.5, 1.5, f)};`;
const cl = (e) => `max(0, min(1, ${e}))`;

// -- flow ----------------------------------------------------------------------

add(
  'Jet Stream',
  'Long thin strokes laid end to end along a slow, smooth current, so the sheet reads as a wind map of streaming lines.',
  (c) => ({
    rule: `${F} { ${nv('a', -170, 370, 1.1)} ${A(`left: -34%; top: 45%; width: 168%; height: 10%; border-radius: 99px; background: ${ink(c)}; ${tf('rotate($deg(a))')}`)} }${TR}`,
  }),
  {
    pal: 45,
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['lines', 'curves', 'waves'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['hero-background', 'wallpaper'] },
  }
);

add(
  'Pelage',
  'Tapered hairs in tufts of two, every tuft combed along a swirling field, so the sheet grows a coat of fur with whorls and partings.',
  (c) => ({
    rule: `${F} { ${nv('a', -200, 400, 2.2)} ${tf('rotate($deg(a))')} ${B(`left: 30%; top: -18%; width: 13%; height: 118%; background: ${ink(c)}; ${cp('polygon(50% 0, 100% 100%, 0 100%)')} ${tfo('50% 100%')} ${tf('rotate(-9deg)')}`)} ${A(`left: 56%; top: -6%; width: 13%; height: 106%; background: ${ink(c)}; ${cp('polygon(50% 0, 100% 100%, 0 100%)')} ${tfo('50% 100%')} ${tf('rotate(11deg)')}`)} }${TR}`,
  }),
  {
    pal: 31,
    grid: '9x13',
    tg: '10x10',
    meta: { tags: ['lines', 'triangles', 'curves'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['textile', 'card-texture'] },
  }
);

add(
  'Declination',
  'Compass needles, a warm north half and a pale south half, each swung to the bearing of a smooth magnetic field.',
  (c) => ({
    rule: `${F} { ${nv('a', -180, 360, 1.3)} ${tf('rotate($deg(a))')} ${B(`left: 41%; top: 6%; width: 18%; height: 44%; background: @p(var(--color2), var(--color3)); ${cp('polygon(50% 0, 100% 100%, 0 100%)')}`)} ${A(`left: 41%; top: 50%; width: 18%; height: 44%; background: @p(var(--color1), var(--color4)); ${cp('polygon(0 0, 100% 0, 50% 100%)')}`)} }${TR}`,
  }),
  {
    pal: 16,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['diamonds', 'triangles', 'lines'], mood: ['technical', 'calm'], density: 'medium', goodFor: ['hero-background', 'poster'] },
  }
);

add(
  'Wind Barbs',
  'Weather-map wind barbs turned to a smooth wind field, the barbs on each staff counting the speed and tinted warmer where it blows hardest.',
  (c) => ({
    rule: `${F} { ${nv('a', -180, 360, 1.2)} ${wide('s', 1.6)} ${tf('rotate($deg(a))')} ${B(`left: 12%; top: 47%; width: 76%; height: 6%; background: @p(var(--color1)); border-radius: 99px;`)} ${A(`left: 12%; top: 19%; width: 30%; height: 31%; background: @match($(s) < 0.34, @p(var(--color2)), $(s) < 0.67, @p(var(--color3)), @p(var(--color4))); ${msk('linear-gradient(90deg, #000 0 16%, transparent 16% 36%, #000 36% 52%, transparent 52% 72%, #000 72% 88%, transparent 88%)')} ${cp('inset(0 @calc(86 - 36 * floor(max(0, min(2, $(s) * 3))))% 0 0)')} ${tfo('0 100%')} ${tf('skewX(-28deg)')}`)} }${TR}`,
  }),
  {
    pal: 18,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['lines', 'stripes'], mood: ['technical'], density: 'medium', goodFor: ['hero-background', 'poster'] },
  }
);

add(
  'Eddies',
  'Pairs of open arcs swirling one inside the other, every pair turned by a slow current so the sheet fills with eddies and backwaters.',
  (c) => ({
    rule: `${F} { ${nv('a', -180, 360, 1.5)} ${A(`inset: -22%; background: ${ink(c)}; ${mskI('radial-gradient(circle closest-side, transparent 72%, #000 72% 92%, transparent 92%)', 'conic-gradient(#000 0 150deg, transparent 150deg 360deg)')} ${tf('rotate($deg(a))')}`)} ${B(`inset: 14%; background: ${ink(c)}; ${mskI('radial-gradient(circle closest-side, transparent 58%, #000 58% 88%, transparent 88%)', 'conic-gradient(#000 0 200deg, transparent 200deg 360deg)')} ${tf('rotate($deg(a + 160))')}`)} }${TR}`,
  }),
  {
    pal: 42,
    grid: '6x9',
    tg: '7x7',
    meta: { tags: ['arcs', 'curves', 'waves'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

add(
  'Bait Ball',
  'A shoal of small fish two to a cell, every fish swimming along a swirling current so the school wheels round in one mass.',
  (c) => ({
    host: '--fish: @shape(fish);',
    rule: `${F} { ${nv('a', -180, 360, 1.4)} ${tf('rotate($deg(a))')} ${B(`left: 4%; top: 10%; width: 56%; height: 32%; background: ${ink(c)}; ${cp('@var(--fish)')}`)} ${A(`left: 40%; top: 56%; width: 56%; height: 32%; background: ${ink(c)}; ${cp('@var(--fish)')}`)} }${TR}`,
  }),
  {
    pal: 40,
    grid: '7x10',
    tg: '7x7',
    meta: { tags: ['curves', 'ovals'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

add(
  'Downpour',
  'Rain in thin streaks, each bright at its head and fading up its tail, slanting with the gusts so the shower leans one way and then another.',
  (c) => ({
    rule: `${F} { ${nv('a', -40, 40, 1.2)} ${nv('l', 0.5, 1.3, 2)} ${tf('rotate($deg(a + 18))')} ${B(`left: 26%; top: -24%; width: 5%; height: 110%; border-radius: 99px; background: ${ink(c)}; ${msk('linear-gradient(180deg, transparent, #000)')} ${tfo('50% 100%')} ${tf('scaleY($(l))')}`)} ${A(`left: 66%; top: 6%; width: 5%; height: 96%; border-radius: 99px; background: ${ink(c)}; ${msk('linear-gradient(180deg, transparent, #000)')} ${tfo('50% 100%')} ${tf('scaleY($(l))')}`)} }${TR}`,
  }),
  {
    pal: 45,
    inks: 4,
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['lines', 'gradients', 'diagonals'], mood: ['calm'], density: 'medium', goodFor: ['hero-background', 'wallpaper'] },
  }
);

// -- size and tone -------------------------------------------------------------

add(
  'Overcast',
  'A halftone of cloud: discs swelling and shrinking with a smooth field, the largest merging into banks and the cores of them palest.',
  (c) => ({
    rule: `${F} { ${wide('n', 1.5)} ${A(`inset: -30%; background: @match($(n) > 0.62, @p(var(--color1)), $(n) > 0.32, @p(var(--color2)), @p(var(--color3))); ${cp('circle(@calc(4 + 44 * max(0, min(1, $(n))))% at 50% 50%)')}`)} }${TR}`,
  }),
  {
    palette: ['#3B6E9E', '#F7F9FA', '#D5E3EE', '#A9C6DD'],
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['dots', 'halftone', 'circles'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['hero-background', 'wallpaper'] },
  }
);

add(
  'Floe',
  'Square plates of ice in a dark sea, larger and smaller with a smooth field and turned a little with the drift, like pack ice breaking up.',
  (c) => ({
    rule: `${F} { ${A(`inset: 8%; border-radius: 6%; background: ${ink(c)}; ${tf(`rotate(${noise(-50, 50, 1.6)}deg) scale(@calc(max(0.3, min(1, ${noise(0.05, 1.35, 1.2)}))))`)}`)} }${TR}`,
  }),
  {
    pal: 42,
    inks: 4,
    grid: '7x10',
    tg: '7x7',
    meta: { tags: ['squares', 'diamonds'], mood: ['calm'], density: 'medium', goodFor: ['wallpaper', 'hero-background'] },
  }
);

add(
  'Metamorphosis',
  'Squares that soften into discs and turn into diamonds as a slow field crosses the sheet, the same tile becoming every shape in turn.',
  (c) => ({
    rule: `${F} { ${A(`inset: 10%; background: ${ink(c)}; border-radius: @calc(max(0, min(50, ${noise(-25, 75, 1.1)})))%; ${tf(`rotate(@calc(max(0, min(45, ${noise(-22, 67, 1)})))deg) scale(@calc(max(0.45, min(1, ${noise(0.3, 1.3, 1.6)}))))`)}`)} }${TR}`,
  }),
  {
    pal: 27,
    grid: '6x9',
    tg: '7x7',
    meta: { tags: ['squares', 'circles', 'diamonds'], mood: ['playful', 'bold'], density: 'medium', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);

export const sectionD = { title: 'D. Drift', all };
