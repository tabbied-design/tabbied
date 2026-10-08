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
// wider one and clamped (see `wide`). A level is cut from a field with
// floor(), and floor(n) % 2 turns a smooth field into alternating bands whose
// edges follow its contours.
//
// Curved figures (Anabranch's quarter rings) are polygons computed here and
// set once on the host, so their edges are antialiased the same way on
// screen and in the SVG export.
//
//   flow       Jet Stream, Windrow, Downpour
//   tone       Aquarelle
//   levels     Anabranch
import { section, F, TR, ink, cp, msk, B, A, noise } from './shared.mjs';

const { add, all } = section('D. Drift');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const tfo = (v) => `-webkit-transform-origin: ${v}; transform-origin: ${v};`;

/** A per-cell noise sample, read back with $(name). */
const nv = (name, from, to, f = 1) => `--${name}: ${noise(from, to, f)};`;

/** A polygon written as percentages. */
const P = (pts) => `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(', ')})`;
const arcPts = (cx, cy, r, from, to, n) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = ((from + ((to - from) * i) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });

/** A quarter ring 0.4-0.6 of the cell wide around the top left corner (or the bottom right). */
const quarterRing = (flip) => {
  const pts = [...arcPts(0, 0, 60, 0, 90, 24), ...arcPts(0, 0, 40, 90, 0, 24)];
  return P(flip ? pts.map(([x, y]) => [100 - x, 100 - y]) : pts);
};

// -- flow: strokes and figures turned by the field -------------------------------

add(
  'Jet Stream',
  'Long thin strokes laid end to end along a slow, smooth current, so the sheet reads as a wind map of streaming lines.',
  (c) => ({
    rule: `${F} { ${nv('a', -60, 220, 0.9)} ${A(`left: -34%; top: 45%; width: 168%; height: 10%; border-radius: 99px; background: ${ink(c)}; ${tf('rotate($deg(a))')}`)} }${TR}`,
  }),
  {
    pal: 45,
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['lines', 'curves', 'waves'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['hero-background', 'wallpaper'] },
  }
);

add(
  'Windrow',
  'Tall curved blades of grass two to a cell, rooted along each row and leaning together as gusts move over the field.',
  (c) => ({
    rule: `${F} { z-index: @y; ${nv('a', -38, 38, 1.3)} ${B(`left: 18%; bottom: 0; width: 22%; height: 160%; background: ${ink(c)}; ${cp('polygon(0 100%, 34% 46%, 80% 0, 52% 48%, 46% 100%)')} ${tfo('20% 100%')} ${tf('rotate($deg(a - 6))')}`)} ${A(`left: 56%; bottom: 0; width: 22%; height: 132%; background: ${ink(c)}; ${cp('polygon(0 100%, 34% 46%, 80% 0, 52% 48%, 46% 100%)')} ${tfo('20% 100%')} ${tf('rotate($deg(a + 6))')}`)} }${TR}`,
  }),
  {
    pal: 38,
    grid: '8x10',
    tg: '9x9',
    meta: { tags: ['curves', 'triangles', 'lines'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

add(
  'Downpour',
  'Rain in thin streaks, each bright at its head and fading up its tail, slanting with the gusts so the shower leans one way and then another.',
  (c) => ({
    rule: `${F} { ${nv('a', -30, 30, 1.1)} ${nv('l', 0.55, 1.25, 2)} ${tf('rotate($deg(a + 16))')} ${B(`left: 24%; top: -40%; width: 8%; height: 120%; border-radius: 99px; background: ${ink(c)}; ${msk('linear-gradient(180deg, transparent, #000 85%)')} ${tfo('50% 100%')} ${tf('scaleY($(l))')}`)} ${A(`left: 66%; top: -10%; width: 8%; height: 100%; border-radius: 99px; background: ${ink(c)}; ${msk('linear-gradient(180deg, transparent, #000 85%)')} ${tfo('50% 100%')} ${tf('scaleY($(l))')}`)} }${TR}`,
  }),
  {
    palette: ['#14213D', '#E5E5E5', '#8ECAE6', '#B8C0FF'],
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['lines', 'gradients', 'diagonals'], mood: ['calm'], density: 'medium', goodFor: ['hero-background', 'wallpaper'] },
  }
);

// -- size, place and tone --------------------------------------------------------

add(
  'Aquarelle',
  'Two washes of translucent discs laid half a cell apart, each thickening and thinning with its own smooth field, so where they cross they pool into a third tone.',
  (c) => ({
    rule: `${F} { ${B(`left: -8%; top: -8%; width: 116%; height: 116%; border-radius: 50%; background: @p(var(--color1)); opacity: @calc(max(0.06, min(0.78, ${noise(-0.4, 1.3, 1.2)})));`)} ${A(`left: 42%; top: 42%; width: 116%; height: 116%; border-radius: 50%; background: @p(var(--color2)); opacity: @calc(max(0.06, min(0.78, ${noise(-0.4, 1.3, 1.7)})));`)} }${TR}`,
  }),
  {
    palette: ['#FAF5EC', '#2D7DA8', '#E39B2D'],
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['circles', 'gradients', 'lattice'], mood: ['calm', 'organic'], density: 'dense', goodFor: ['hero-background', 'wallpaper'] },
  }
);

// -- levels: the field cut into bands --------------------------------------------

add(
  'Anabranch',
  'Truchet tiles of paired quarter arcs whose turn follows a smooth field, so the arcs run in long parallel channels that split and rejoin like a braided river.',
  (c) => ({
    host: `--qa: ${quarterRing(false)}; --qb: ${quarterRing(true)};`,
    rule: `${F} { ${nv('n', 0, 6, 1.3)} ${tf('rotate(@calc(floor($(n)) % 2 * 90)deg)')} ${B(`inset: 0; background: ${ink(c)}; ${cp('@var(--qa)')}`)} ${A(`inset: 0; background: ${ink(c)}; ${cp('@var(--qb)')}`)} }${TR}`,
  }),
  {
    pal: 13,
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['arcs', 'quarter-circles', 'curves', 'maze'], mood: ['playful'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

export const sectionD = { title: 'D. Drift', all };
