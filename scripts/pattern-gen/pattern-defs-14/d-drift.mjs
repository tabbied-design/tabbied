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
// Curved figures (crescent, half rings, quarter rings, lens, bird) are
// polygons computed here and set once on the host, so their edges are
// antialiased the same way on screen and in the SVG export.
//
//   flow       Jet Stream, Pelage, Declination, Bait Ball, Wind Barbs, Windrow,
//              Mermaid Sequins, Murmuration, Downpour, Barchan, Hachures
//   size, place and tone
//              Overcast, Floe, Metamorphosis, Rubber Sheet, Sea State,
//              Engraving, Aquarelle, Foothills
//   levels     Anabranch, Furlong, Hillshade, Overworld, Camouflage, Hypsometric
import { section, F, TR, ink, cp, msk, B, A, noise } from './shared.mjs';

const { add, all } = section('D. Drift');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const tfo = (v) => `-webkit-transform-origin: ${v}; transform-origin: ${v};`;

/** A per-cell noise sample, read back with $(name). */
const nv = (name, from, to, f = 1) => `--${name}: ${noise(from, to, f)};`;

/** A 0-1 sample stretched so the field reaches both ends (clamped). */
const wide = (name, f = 1) => `--${name}: ${noise(-0.5, 1.5, f)};`;

/** A polygon written as percentages. */
const P = (pts) => `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(', ')})`;
const arcPts = (cx, cy, r, from, to, n) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = ((from + ((to - from) * i) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });

/** A crescent: a disc with an offset disc taken out of it, horns pointing down. */
const CRESCENT = (() => {
  const [R, r, d] = [45, 40, 22];
  const y = (R * R - r * r + d * d) / (2 * d); // horn height below the outer center
  const xh = Math.sqrt(R * R - y * y);
  const phi = (Math.atan2(y, xh) * 180) / Math.PI;
  const psi = (Math.atan2(y - d, xh) * 180) / Math.PI;
  return P([
    ...arcPts(50, 50, R, phi, -180 - phi, 28),
    ...arcPts(50, 50 + d, r, -180 - psi, psi, 24),
  ]);
})();

/** Half of a ring 0.42-0.58 of its box wide, the upper half (or the lower). */
const halfRing = (upper) => {
  const [a, b] = upper ? [180, 360] : [0, 180];
  return P([...arcPts(50, 50, 50, a, b, 30), ...arcPts(50, 50, 36.2, b, a, 30)]);
};

/** A bird in flight seen from below: two swept wings meeting at a small body. */
const BIRD = P([
  [0, 22], [18, 30], [34, 46], [46, 58], [50, 52], [54, 58], [66, 46], [82, 30], [100, 22],
  [86, 48], [70, 66], [56, 84], [50, 100], [44, 84], [30, 66], [14, 48],
]);

/** A long lens, thin at both ends and full in the middle, for one engraved rule. */
const LENS = P([
  ...Array.from({ length: 13 }, (_, i) => [(100 * i) / 12, 50 - 3 - 37 * Math.sin((Math.PI * i) / 12)]),
  ...Array.from({ length: 13 }, (_, i) => [100 - (100 * i) / 12, 50 + 3 + 37 * Math.sin((Math.PI * i) / 12)]),
]);

/** An ink picked by which band a value falls in: cuts ascending, one ink more than cuts. */
const band = (e, cuts, inks) =>
  `@match(${cuts.map((t, i) => `${e} < ${t}, @p(var(--color${inks[i]}))`).join(', ')}, @p(var(--color${inks[inks.length - 1]})))`;

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
  'Pelage',
  'Tapered hairs in tufts of two, every tuft combed along a swirling field, so the sheet grows a coat of fur with whorls and partings.',
  (c) => ({
    rule: `${F} { ${nv('a', -40, 240, 1.4)} ${tf('rotate($deg(a))')} ${B(`left: 30%; top: -50%; width: 12%; height: 150%; background: ${ink(c)}; ${cp('polygon(50% 0, 100% 100%, 0 100%)')} ${tfo('50% 100%')} ${tf('rotate(-9deg)')}`)} ${A(`left: 56%; top: -32%; width: 12%; height: 132%; background: ${ink(c)}; ${cp('polygon(50% 0, 100% 100%, 0 100%)')} ${tfo('50% 100%')} ${tf('rotate(11deg)')}`)} }${TR}`,
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
    rule: `${F} { ${nv('a', -90, 270, 1.2)} ${tf('rotate($deg(a))')} ${B(`left: 38%; top: 4%; width: 24%; height: 46%; background: @p(var(--color2), var(--color3)); ${cp('polygon(50% 0, 100% 100%, 0 100%)')}`)} ${A(`left: 38%; top: 50%; width: 24%; height: 46%; background: @p(var(--color1), var(--color4)); ${cp('polygon(0 0, 100% 0, 50% 100%)')}`)} }${TR}`,
  }),
  {
    palette: ['#0D1F22', '#F2E3BC', '#E4572E', '#F3A712', '#A8C5C9'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['diamonds', 'triangles', 'lines'], mood: ['technical', 'calm'], density: 'medium', goodFor: ['hero-background', 'poster'] },
  }
);

add(
  'Bait Ball',
  'A shoal of small fish two to a cell, every fish swimming along a swirling current so the school wheels round in one mass.',
  (c) => ({
    host: '--fish: @shape(fish);',
    rule: `${F} { ${nv('a', -60, 240, 1.2)} ${tf('rotate($deg(a))')} ${B(`left: 4%; top: 10%; width: 56%; height: 32%; background: ${ink(c)}; ${cp('@var(--fish)')}`)} ${A(`left: 40%; top: 56%; width: 56%; height: 32%; background: ${ink(c)}; ${cp('@var(--fish)')}`)} }${TR}`,
  }),
  {
    pal: 40,
    grid: '7x10',
    tg: '7x7',
    meta: { tags: ['curves', 'ovals'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

add(
  'Wind Barbs',
  'Weather-map wind barbs turned to a smooth wind field, the barbs on each staff counting the speed and tinted warmer where it blows hardest.',
  (c) => ({
    rule: `${F} { ${nv('a', -60, 240, 1)} ${wide('s', 1.6)} ${tf('rotate($deg(a))')} ${B(`left: 12%; top: 47%; width: 76%; height: 6%; background: @p(var(--color1)); border-radius: 99px;`)} ${A(`left: 12%; top: 19%; width: 30%; height: 31%; background: @match($(s) < 0.34, @p(var(--color2)), $(s) < 0.67, @p(var(--color3)), @p(var(--color4))); ${msk('linear-gradient(90deg, #000 0 16%, transparent 16% 36%, #000 36% 52%, transparent 52% 72%, #000 72% 88%, transparent 88%)')} ${cp('inset(0 @calc(86 - 36 * floor(max(0, min(2, $(s) * 3))))% 0 0)')} ${tfo('0 100%')} ${tf('skewX(-28deg)')}`)} }${TR}`,
  }),
  {
    pal: 18,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['lines', 'diagonals'], mood: ['technical'], density: 'medium', goodFor: ['hero-background', 'poster'] },
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
  'Mermaid Sequins',
  'Reversible sequins brushed into swirls: each disc turned by a smooth field, showing its gold face or its jewel face and thinning to an edge where it stands halfway between.',
  (c) => ({
    rule: `${F} { z-index: @y; ${nv('a', -200, 560, 1.3)} --k: $(cos(a / 57.2958)); ${A(`inset: -5%; border-radius: 50%; background: @match($(k) > 0, @p(var(--color1), var(--color2)), @p(var(--color3), var(--color4))); ${msk('radial-gradient(circle closest-side, transparent 12%, #000 12%)')} ${tf('scaleX($(max(0.08, abs(k))))')}`)} }${TR}`,
  }),
  {
    palette: ['#1C1530', '#E8C766', '#D3A84A', '#D14A86', '#B23A78'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['circles', 'ovals', 'dots'], mood: ['festive', 'bold'], density: 'dense', goodFor: ['textile', 'packaging', 'poster'] },
  }
);

add(
  'Murmuration',
  'Starlings over an evening sky, each a small dark chevron turned by a swirling field, crowding large and close where the flock is thick and dwindling to specks at its edge.',
  (c) => ({
    host: `--bird: ${BIRD};`,
    rule: `${F} { ${nv('a', -50, 50, 1.3)} ${nv('k', -0.3, 1.6, 1.2)} --s: $(max(0.22, min(1.2, k))); ${tf('rotate($deg(a))')} ${B(`left: -4%; top: 4%; width: 78%; height: 44%; background: ${ink(c)}; ${cp('@var(--bird)')} ${tf('scale($(s))')}`)} ${A(`left: 34%; top: 52%; width: 68%; height: 40%; background: ${ink(c)}; ${cp('@var(--bird)')} ${tf('rotate(@r(-14deg, 14deg)) scale($(s))')}`)} }${TR}`,
  }),
  {
    palette: ['#F4D8B8', '#2B2D42', '#4A4363', '#7A4E5E'],
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['chevrons', 'curves'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['hero-background', 'wallpaper', 'poster'] },
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

add(
  'Barchan',
  'Crescent dunes seen from the air, every crescent turned with its horns downwind by a smooth wind field and larger where the sand runs deep.',
  (c) => ({
    host: `--moon: ${CRESCENT};`,
    rule: `${F} { ${tf(`rotate(${noise(-60, 240, 1.1)}deg)`)} ${A(`inset: 6%; background: ${ink(c)}; ${cp('@var(--moon)')} ${tf(`scale(@calc(max(0.42, min(1.05, ${noise(0.1, 1.4, 1.5)}))))`)}`)} }${TR}`,
  }),
  {
    palette: ['#F3E3C3', '#C8864B', '#A9673A', '#E0A96D', '#7A4A2A'],
    grid: '7x10',
    tg: '7x7',
    meta: { tags: ['arcs', 'curves'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

add(
  'Hachures',
  'Round patches of close parallel hatching, one to a cell, the hatching turned by a smooth field like the slope strokes an engraver cuts into an old relief map.',
  (c) => ({
    rule: `${F} { ${cp('circle(47% at 50% 50%)')} ${A(`inset: -21%; background: ${ink(c)}; ${msk('repeating-linear-gradient(90deg, #000 0 3.6%, transparent 3.6% 10%)')} ${tf(`rotate(${noise(-20, 200, 1)}deg)`)}`)} }${TR}`,
  }),
  {
    palette: ['#F4EFE6', '#1F2A44', '#3D5A80', '#9A4C2E'],
    grid: '7x10',
    tg: '8x8',
    meta: { tags: ['lines', 'circles', 'stripes'], mood: ['technical', 'calm'], density: 'medium', goodFor: ['card-texture', 'wallpaper'] },
  }
);

// -- size, place and tone --------------------------------------------------------

add(
  'Overcast',
  'A halftone of cloud: discs swelling and shrinking with a smooth field, the largest merging into banks and the cores of them palest.',
  (c) => ({
    rule: `${F} { ${nv('n', -0.2, 1.2, 1.5)} ${A(`inset: -30%; background: @match($(n) > 0.62, @p(var(--color1)), $(n) > 0.32, @p(var(--color2)), @p(var(--color3))); ${cp('circle(@calc(3 + 29 * max(0, min(1, $(n))))% at 50% 50%)')}`)} }${TR}`,
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
  'Broken plates of ice on dark water, larger and smaller with a smooth field and all turned a little with the drift, like pack ice breaking up.',
  (c) => ({
    rule: `${F} { ${A(`inset: 4%; background: ${ink(c)}; ${cp('@pick(polygon(8% 14%, 70% 2%, 98% 40%, 84% 94%, 18% 86%), polygon(2% 30%, 46% 4%, 96% 18%, 90% 78%, 40% 98%, 6% 74%), polygon(14% 4%, 92% 10%, 96% 66%, 60% 96%, 4% 82%))')} ${tf(`rotate(${noise(-70, 70, 1.3)}deg) scale(@calc(max(0.35, min(1.08, ${noise(0.05, 1.4, 1.2)}))))`)}`)} }${TR}`,
  }),
  {
    palette: ['#0B2533', '#F4F8FA', '#CFE3EC', '#9CC6D8', '#6FA3BC'],
    grid: '7x10',
    tg: '7x7',
    meta: { tags: ['mosaic', 'blocks'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'hero-background'] },
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

add(
  'Rubber Sheet',
  'A grid of plus marks pushed out of line by a smooth displacement, bunching, shrinking, spreading and twisting as if printed on stretched rubber.',
  (c) => ({
    rule: `${F} { background: ${ink(c)}; ${cp('polygon(42% 16%, 58% 16%, 58% 42%, 84% 42%, 84% 58%, 58% 58%, 58% 84%, 42% 84%, 42% 58%, 16% 58%, 16% 42%, 42% 42%)')} ${tf(`translate(${noise(-70, 70, 2.2)}%, ${noise(-70, 70, 2.2)}%) rotate(${noise(-50, 50, 1.4)}deg) scale(@calc(max(0.45, min(1.3, ${noise(0, 1.6, 1.3)}))))`)} }${TR}`,
  }),
  {
    pal: 20,
    grid: '8x12',
    tg: '9x9',
    meta: { tags: ['crosses', 'grid'], mood: ['playful', 'technical'], density: 'medium', goodFor: ['wallpaper', 'card-texture'] },
  }
);

add(
  'Sea State',
  'One wave line to every row, rolling evenly from cell to cell, its swell lifting and settling with a smooth field so calm water and rough water lie side by side.',
  (c) => ({
    host: `--crest: ${halfRing(true)}; --trough: ${halfRing(false)};`,
    rule: `${F} { ${tf(`scaleY(@calc(max(0.4, min(1.15, ${noise(0.1, 1.5, 1.4)}))))`)} ${B(`left: -4%; top: 50%; width: 58%; aspect-ratio: 1; background: ${ink(c)}; ${cp('@var(--crest)')} ${tf('translateY(-50%)')}`)} ${A(`left: 46%; top: 50%; width: 58%; aspect-ratio: 1; background: ${ink(c)}; ${cp('@var(--trough)')} ${tf('translateY(-50%)')}`)} }${TR}`,
  }),
  {
    pal: 41,
    grid: '6x12',
    tg: '6x9',
    meta: { tags: ['waves', 'curves', 'lines'], mood: ['calm'], density: 'medium', goodFor: ['hero-background', 'section-divider'] },
  }
);

add(
  'Engraving',
  'Engraved rules two to a row, each swelling to a long lens and tapering to a hairline, their weight following a smooth field so a cloud of tone is cut in line alone.',
  (c) => ({
    host: `--lens: ${LENS};`,
    rule: `${F} { ${nv('w', -0.3, 1.5, 1.4)} --s: $(max(0.08, min(1, w))); ${B(`left: -1%; top: 0; width: 102%; height: 50%; background: ${ink(c)}; ${cp('@var(--lens)')} ${tf('scaleY($(s))')}`)} ${A(`left: -1%; top: 50%; width: 102%; height: 50%; background: ${ink(c)}; ${cp('@var(--lens)')} ${tf('scaleY($(s))')}`)} }${TR}`,
  }),
  {
    palette: ['#F2EEE3', '#283D3B', '#3B5B57', '#7A4E2D'],
    grid: '6x12',
    tg: '7x9',
    meta: { tags: ['lines', 'ovals', 'halftone'], mood: ['technical', 'elegant'], density: 'medium', goodFor: ['card-texture', 'hero-background', 'wallpaper'] },
  }
);

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

add(
  'Foothills',
  'Row upon row of rounded hills, each nearer row overlapping the one behind it, their heights rising and falling with a smooth field.',
  (c) => ({
    rule: `${F} { z-index: @y; ${nv('d', 0, 150, 1.6)} --D: $(max(40, min(120, d))); ${A(`left: -40%; bottom: 0; width: 180%; height: @calc(100 + $(D))%; border-radius: 50% 50% 0 0 / @calc(100 * $(D) / (100 + $(D)))% @calc(100 * $(D) / (100 + $(D)))% 0 0; background: ${ink(c)};`)} }${TR}`,
  }),
  {
    pal: 34,
    grid: '6x9',
    tg: '7x7',
    meta: { tags: ['scallops', 'curves', 'waves'], mood: ['calm', 'organic'], density: 'dense', goodFor: ['wallpaper', 'section-divider', 'hero-background'] },
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

add(
  'Furlong',
  'Farmland seen from the air: furrowed plots of four crops, the furrows running across or along each field as a smooth field decides.',
  (c) => ({
    rule: `${F} { ${wide('n', 1.5)} ${wide('m', 2)} background: ${band('$(m)', [0.25, 0.45, 0.62, 0.8], [1, 2, 3, 4, 5])}; ${msk('repeating-linear-gradient(90deg, #000 0 17%, transparent 17% 25%)')} ${tf('rotate(@calc(floor($(n) * 3) % 2 * 90)deg)')} }${TR}`,
  }),
  {
    palette: ['#4A3426', '#E9C46A', '#A7C957', '#6A994E', '#D4A373', '#386641'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['stripes', 'blocks', 'mosaic'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

add(
  'Hillshade',
  'A field of low pyramids lit from the upper left, every apex pushed off center by a smooth field so the faces swell and shrink like shaded relief.',
  (c) => ({
    rule: `${F} { ${nv('px', -10, 110, 1.2)} ${nv('py', -10, 110, 1.2)} --x: $(max(12, min(88, px))); --y: $(max(12, min(88, py))); background: @p(var(--color1), var(--color2)); ${B(`inset: 0; background: @p(var(--color3)); ${cp('polygon(100% 0, 100% 100%, $(x)% $(y)%)')}`)} ${A(`inset: 0; background: @p(var(--color4), var(--color5)); ${cp('polygon(100% 100%, 0 100%, $(x)% $(y)%)')}`)} }${TR}`,
  }),
  {
    palette: ['#2E2A24', '#F1E4C8', '#E8D5AE', '#B9A27C', '#6E5B45', '#5E4C3A'],
    grid: '7x10',
    tg: '10x10',
    meta: { tags: ['triangles', 'squares', 'mosaic'], mood: ['calm', 'organic'], density: 'dense', goodFor: ['wallpaper', 'textile', 'card-texture'] },
  }
);

add(
  'Overworld',
  'A pixel map drawn by a height field: open sea with wavelets, shallows, beaches, meadows, forests of little trees and grey peaks capped with snow.',
  (c) => ({
    rule: `${F} { ${wide('e', 1.7)} background: @match($(e) < 0.3, transparent, $(e) < 0.4, @p(var(--color1)), $(e) < 0.48, @p(var(--color2)), @p(var(--color3))); ${A(`left: @match($(e) < 0.3, 22%, 16%); top: @match($(e) < 0.3, 42%, 14%); width: @match($(e) < 0.3, 56%, $(e) < 0.68, 0%, 68%); height: @match($(e) < 0.3, 16%, $(e) < 0.68, 0%, 72%); border-radius: @match($(e) < 0.3, 99px, 0%); background: @match($(e) < 0.3, @p(var(--color1)), $(e) < 0.86, @p(var(--color4)), @p(var(--color5))); ${cp('@match($(e) < 0.3, inset(0), polygon(50% 0, 100% 100%, 0 100%))')}`)} ${B(`z-index: 1; left: 37%; top: 14%; width: @match($(e) < 0.86, 0%, 26%); height: @match($(e) < 0.86, 0%, 26%); background: @p(var(--color6)); ${cp('polygon(50% 0, 100% 100%, 0 100%)')}`)} }${TR}`,
  }),
  {
    palette: ['#1B4965', '#5FA8D3', '#F2E3BC', '#8CB369', '#3B6E3B', '#8D99AE', '#F8F9FA'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['squares', 'triangles', 'mosaic'], mood: ['playful', 'retro'], density: 'dense', goodFor: ['poster', 'packaging', 'wallpaper'] },
  }
);

add(
  'Camouflage',
  'Digital camouflage: four drab inks laid in blotches by a smooth field, each cell split into pixels that dither where one blotch gives way to the next.',
  (c) => ({
    rule: `${F} { ${wide('n', 2.2)} --j1: @r(-0.12, 0.12); --j2: @r(-0.12, 0.12); --j3: @r(-0.12, 0.12); background: ${band('$(n + j1)', [0.3, 0.5, 0.7], [1, 2, 3, 4])}; ${B(`left: 50%; top: 0; width: 50%; height: 50%; background: ${band('$(n + j2)', [0.3, 0.5, 0.7], [1, 2, 3, 4])};`)} ${A(`left: 0; top: 50%; width: 50%; height: 50%; background: ${band('$(n + j3)', [0.3, 0.5, 0.7], [1, 2, 3, 4])};`)} }${TR}`,
  }),
  {
    palette: ['#3A3D2A', '#C2B58C', '#7D8452', '#5B4A36', '#1F1E19'],
    grid: '10x15',
    tg: '12x12',
    meta: { tags: ['squares', 'mosaic', 'blocks'], mood: ['bold', 'technical'], density: 'dense', goodFor: ['textile', 'packaging', 'card-texture'] },
  }
);

add(
  'Hypsometric',
  'Layer tints of a relief map, each level a flat ink holding a dot of the next level up that swells as the ground rises, so the bands dither into each other.',
  (c) => ({
    rule: `${F} { ${nv('n', -0.4, 4.4, 1.3)} --v: $(max(0, min(3.999, n))); background: ${band('$(v)', [1, 2, 3], [1, 2, 3, 4])}; ${A(`inset: 0; background: ${band('$(v)', [1, 2, 3], [2, 3, 4, 5])}; ${cp('circle(@calc(72 * ($(v) - floor($(v))))% at 50% 50%)')}`)} }${TR}`,
  }),
  {
    palette: ['#1E3A34', '#3C7A5A', '#9DBF6B', '#EBD27A', '#C9874A', '#F6F0E4'],
    grid: '9x13',
    tg: '10x10',
    meta: { tags: ['dots', 'halftone', 'squares'], mood: ['organic', 'technical'], density: 'dense', goodFor: ['wallpaper', 'poster'] },
  }
);

export const sectionD = { title: 'D. Drift', all };
