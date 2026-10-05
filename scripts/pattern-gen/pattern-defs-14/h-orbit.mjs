// H. Orbit - sky and space: stars, moons, planets, orbits, comets and eclipses.
//
// Stars
//   Firmament       five-point stars gathering into clusters and thinning out
//   Milky Way       a band of glinting stars and haze lying across the sheet
//   Star Map        stars on a jittered lattice, joined into constellations
//   Planisphere     a pale star chart: hour lines and declination circles
//   Star Trails     arcs wheeling round a pole below the sheet
//   Deep Field      faint galaxies with the odd spiked foreground star
//   Whirlpool       two-armed spiral galaxies with soft cores
// Comets and light
//   Perseids        a meteor shower streaming out of one radiant
//   Halley          comets with a curved dust tail and a straight ion tail
//   Northern Lights curtains of rayed light swaying across the sheet
//   Sun Dogs        a sun, its halo and two mock suns on one long line
// The moon
//   Lunation        a printed moon calendar, phases in reading order
//   Umbra           a field of moons with the earth's round shadow on them
//   Regolith        craters of every size, lit from the upper left
//   Totality        an eclipse: a black moon, its corona and streamers
// Planets and orbits
//   Saturn          ringed planets, the near ring passing in front
//   Jovian          banded gas giants, each with its storm
//   Sunward         half-lit planets all facing a sun in the corner
//   Galilean        Galileo's notebook: Jupiter and four moons in a line
//   Orrery          orbits round the middle of the sheet, planets on them
//   Perihelion      three orbits sharing a focus, the sun in it
//   Asteroid Belt   lumpy rocks crowding an arc across the sheet
//   Event Horizon   a black hole: lensed ring, hole and a bright disk
// Instruments
//   Armillary       globes of meridians and parallels with a zodiac band
//   Astrolabe       graduated dials with almucantars and an alidade
//
// Many of these read where the cell sits in the sheet: @dx/@dy put a sun,
// a pole or a radiant at one place for the whole sheet, and @rn() lets
// neighbors agree on a size or a heading.
import { section, F, TR, cp, msk, B, A, ink, poly } from './shared.mjs';

const { add, all } = section('H. Orbit');

// -- sheet geometry ------------------------------------------------------------
// A cell is one unit square. @dx/@dy is the offset of its center from the
// middle of the sheet, in cells, so the middle of the sheet sits at
// (50 - 100 * @dx)% across the cell box. An `ellipse W% H%` radial gradient
// sized in cell percentages draws the same circle in every cell, so a ring
// centered off the cell runs on across the whole sheet without a seam.

/** A gradient position for the sheet point (px, py), in cells from the middle. */
const sheetAt = (px = '0', py = '0') =>
  `at @calc(50 + (${px} - @dx) * 100)% @calc(50 + (${py} - @dy) * 100)%`;

/** An ellipse sized so that 100% of its ray is `cells` cells. */
const unit = (cells) => `ellipse @calc(${cells} * 100)% @calc(${cells} * 100)%`;

/** Half the sheet's short side, in cells. */
const HALF = '(min(@X, @Y) / 2)';

/** The cell's distance from the middle of the sheet, in cells. */
const DIST = 'sqrt(@dx * @dx + @dy * @dy)';

/** The cell's column / row as a fraction of the sheet. */
const FX = '((@x - 0.5) / @X)';
const FY = '((@y - 0.5) / @Y)';

// Mask layers written once, unprefixed. css-doodle writes a rule out for
// every cell, so a design with long per-cell masks halves its CSS this way.
const msk1 = (...layers) => `mask: ${layers.join(', ')};`;
const mskI1 = (...layers) => `mask: ${layers.join(', ')}; mask-composite: intersect;`;

/** A hard-edged disc of radius r (percent of the box side), at a position. */
const disc = (r, at = '50% 50%') => `radial-gradient(ellipse ${r}% ${r}% at ${at}, #000 100%, transparent 100%)`;
/** Everything outside such a disc. */
const bore = (r, at = '50% 50%') => `radial-gradient(ellipse ${r}% ${r}% at ${at}, transparent 100%, #000 100%)`;
/** Hard conic sectors from a list of [from, to] angles in degrees, #000 on them. */
const sectorStops = (list) => {
  const out = [];
  let at = 0;
  for (const [a, b] of list) {
    if (a > at) out.push(`transparent ${at}deg ${a}deg`);
    out.push(`#000 ${a}deg ${b}deg`);
    at = b;
  }
  if (at < 360) out.push(`transparent ${at}deg 360deg`);
  return out.join(', ');
};

/** A concave four-point star, the twinkle. */
const STAR4 = poly([
  [50, 0], [58, 42], [100, 50], [58, 58], [50, 100], [42, 58], [0, 50], [42, 42],
]);

/** A five-point star outline with its points out to the box. */
const STAR5 = '@shape(split: 10; r: 0.7 + 0.3 * cos(5t); rotate: -18)';

// =============================================================================
// Stars
// =============================================================================

add(
  'Firmament',
  'Five-point stars scattered over a night sky, gathering into bright clusters and thinning to pinpricks between them, each turned its own way.',
  (c) => ({
    host: `--st: ${STAR5};`,
    rule: `${F} {
      ${B(`inset: 4%; background: ${ink(c)}; ${cp('@var(--st)')} transform: translate(@r(-14%, 14%), @r(-14%, 14%)) rotate(@r(-36deg, 36deg)) scale(@calc(max(0.24, @rn(0, 1.3, 1.3))));`)}
      ${A(`width: 6%; height: 6%; left: @r(6%, 88%); top: @r(6%, 88%); border-radius: 50%; background: ${ink(c)}; opacity: 0.75;`)}
    }${TR}`,
  }),
  {
    pal: 13,
    grid: '7x10',
    tg: '6x6',
    meta: { tags: ['stars', 'dots'], mood: ['festive', 'playful'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'textile'] },
  }
);

add(
  'Milky Way',
  'A hazy band of starlight lies across the sheet from corner to corner, crowded with bright four-point glints that dwindle to specks away from it.',
  (c) => {
    const d = `abs(${FX} + ${FY} - 1 + @rn(-0.18, 0.18)) / 1.414`;
    const w = `max(0, 1 - ${d} / 0.26)`;
    return {
      rule: `--w: @calc(${w});
      ${F} {
        ${B(`inset: -55%; background: var(--color1); ${msk1('radial-gradient(closest-side, #000, transparent)')} opacity: calc(0.42 * @var(--w));`)}
        ${A(`inset: 4%; background: ${ink(c, 2)}; ${cp(STAR4)} transform: translate(@r(-22%, 22%), @r(-22%, 22%)) scale(calc(0.12 + 0.8 * @var(--w) * @r(0.35, 1)));`)}
        background: radial-gradient(circle at @r(8, 92)% @r(8, 92)%, var(--color2) 0 1.4%, transparent 2.2%);
      }${TR}`,
    };
  },
  {
    palette: ['#0B0A1F', '#5B4C9A', '#F6F1FF', '#FFD98E', '#A9C8FF', '#F2A7D8'],
    grid: '9x13',
    tg: '10x10',
    meta: { tags: ['stars', 'dots', 'diagonals', 'gradients'], mood: ['calm', 'elegant'], density: 'medium', goodFor: ['hero-background', 'poster', 'og-image'] },
  }
);

// Each star sits at a fixed jitter from its cell's center, written as a
// function of the cell's column and row, so a cell can work out where its
// neighbor's star is and draw a line to it.
const SX = (x, y) => `(0.5 + 0.27 * sin(1.9 * (${x}) + 2.7 * (${y}) + 0.3))`;
const SY = (x, y) => `(0.5 + 0.27 * sin(2.3 * (${x}) - 1.7 * (${y}) + 1.9))`;
const starLink = (ox, oy) => {
  const nx = ox === 0 ? '@x' : ox > 0 ? `@x + ${ox}` : `@x - ${-ox}`;
  const ny = oy === 0 ? '@y' : `@y + ${oy}`;
  const ddx = `(${ox} + ${SX(nx, ny)} - ${SX('@x', '@y')})`;
  const ddy = `(${oy} + ${SY(nx, ny)} - ${SY('@x', '@y')})`;
  return `rotate(@calc(atan2(${ddy}, ${ddx}) * 180 / PI)deg) scaleX(@calc(sqrt(${ddx} * ${ddx} + ${ddy} * ${ddy})))`;
};

add(
  'Star Map',
  'Stars of several magnitudes, loosely scattered, with fine lines joining them into constellations that wander across the sheet.',
  (c) => ({
    rule: `--z: @p(5%, 7%, 9%, 12%, 15%);
    ${F} {
      ${B(`left: @calc(${SX('@x', '@y')} * 100)%; top: calc(@calc(${SY('@x', '@y')} * 100)% - 1.1%); width: 100%; height: 2.2%; transform-origin: 0 50%; background: var(--color1); transform: @p(${starLink(1, 0)}, ${starLink(0, 1)}, ${starLink(1, 1)}, ${starLink(-1, 1)}, scaleX(0));`)}
      ${A(`z-index: 1; width: @var(--z); height: @var(--z); left: calc(@calc(${SX('@x', '@y')} * 100)% - @var(--z) / 2); top: calc(@calc(${SY('@x', '@y')} * 100)% - @var(--z) / 2); border-radius: 50%; background: ${ink(c, 2)};`)}
    }${TR}`,
  }),
  {
    palette: ['#101828', '#4A5D80', '#F7F2E4', '#FFD27A', '#9CC9F5'],
    grid: '7x10',
    tg: '6x6',
    meta: { tags: ['dots', 'lines', 'diagonals'], mood: ['technical', 'calm'], density: 'sparse', goodFor: ['hero-background', 'wallpaper'] },
  }
);

// Hour lines are straight lines out of the pole. A conic gradient would draw
// them, but one centered far outside the cell draws a little off in every
// cell. So each cell lays one bar along the hour line nearest its center,
// long enough to meet the bars its neighbors lay along the same line.
const hourLine = (PX, PY, inner, step = 30) => {
  const ux = `(@dx - ${PX})`;
  const uy = `(@dy - ${PY})`;
  const th = `(atan2(${uy}, ${ux}) * 180 / PI)`;
  const phi = `(round((${th} - ${step / 2}) / ${step}) * ${step} + ${step / 2})`;
  const r = `sqrt(${ux} * ${ux} + ${uy} * ${uy})`;
  const proj = `(${r} * cos((${th} - ${phi}) * PI / 180))`;
  const px = `(${proj} * cos(${phi} * PI / 180) - ${ux})`;
  const py = `(${proj} * sin(${phi} * PI / 180) - ${uy})`;
  // the bar is 2.4 cells long; its near end is at proj - 1.2 from the pole
  const cut = `((${inner} - ${proj} + 1.2) / 2.4 * 100)`;
  return `width: 240%; height: 1.4%; left: @calc(50 + ${px} * 100 - 120)%; top: @calc(50 + ${py} * 100 - 0.7)%; transform: rotate(@calc(${phi})deg); ${msk1(`linear-gradient(90deg, transparent @calc(${cut})%, #000 @calc(${cut})%)`)}`;
};

add(
  'Planisphere',
  'A pale star chart: hour lines fan out from a pole near one corner, declination circles ring it, the ecliptic sweeps through in red and stars of every magnitude dot the sheet.',
  (c) => {
    const U = 'min(@X, @Y)';
    const PX = '(-0.3 * @X)';
    const PY = '(-0.28 * @Y)';
    const pole = sheetAt(PX, PY);
    const ecl = sheetAt(`(${PX} + 0.22 * ${U})`, `(${PY} + 0.12 * ${U})`);
    return {
      rule: `background: radial-gradient(${unit(U)} ${ecl}, transparent 61.6%, var(--color2) 61.6% 62.4%, transparent 62.4%), repeating-radial-gradient(${unit(U)} ${pole}, var(--color4) 0 0.32%, transparent 0.32% 12.5%);
      ${B(`background: var(--color4); ${hourLine(PX, PY, `(0.25 * ${U})`)}`)}
      ${F} {
        ${A(`--z: @p(3%, 3.5%, 4.5%, 5.5%, 7%, 9.5%); width: @var(--z); height: @var(--z); left: @r(8%, 86%); top: @r(8%, 86%); border-radius: 50%; background: @p(var(--color1), var(--color1), var(--color1), var(--color3));`)}
      }${TR}`,
    };
  },
  {
    palette: ['#F3EDDE', '#1C2C4C', '#B5402F', '#C8922E', '#8E9AB3'],
    grid: '8x12',
    freq: 0.8,
    tg: '10x10',
    tf: 0.85,
    meta: { tags: ['lines', 'concentric', 'radial', 'dots'], mood: ['technical', 'elegant'], density: 'sparse', goodFor: ['hero-background', 'card-texture', 'wallpaper'] },
  }
);

add(
  'Star Trails',
  'Arcs of light wheel round a pole below the sheet, the long exposure of a night sky, each trail a different length and brightness.',
  (c) => {
    // the pole sits a little below the middle of the bottom edge
    const PX = '0';
    const PY = '(@Y / 2 + 0.6)';
    // vector from the pole to the cell center, in cells
    const ux = `(@dx - ${PX})`;
    const uy = `(@dy - ${PY})`;
    const r = `sqrt(${ux} * ${ux} + ${uy} * ${uy})`;
    const th = `(atan2(${uy}, ${ux}) * 180 / PI + 90)`;
    // the pseudo box is 4 x 4 cells, centered on the cell; the ring's ellipse
    // is sized to twice the cell's own radius, so every stop stays under 100%
    const atBox = `at @calc(50 + (${PX} - @dx) * 25)% @calc(50 + (${PY} - @dy) * 25)%`;
    const size = `ellipse @calc(${r} * 50)% @calc(${r} * 50)%`;
    const trail = (m, L) => {
      const ring = `radial-gradient(${size} ${atBox}, transparent calc(@var(${m}) - @var(--w)), #000 0 calc(@var(${m}) + @var(--w)), transparent 0)`;
      const arc = `conic-gradient(from calc(@calc(${th})deg - @var(${L}) / 2) ${atBox}, #000 0 @var(${L}), transparent 0)`;
      return `inset: -150%; background: ${ink(c)}; ${mskI1(ring, arc)}`;
    };
    const m = (lo, hi) => `@calc(50 + @r(${lo}, ${hi}) * 50 / ${r})%`;
    const L = (lo, hi) => `@calc(@r(${lo}, ${hi}) / max(${r}, 0.6) * 57.3)deg`;
    return {
      rule: `--w: @calc(1.8 / ${r})%; --m1: ${m(-0.45, 0.45)}; --m2: ${m(-0.45, 0.45)}; --l1: ${L(0.7, 2.2)}; --l2: ${L(0.5, 1.6)};
        ${F} { ${B(`${trail('--m1', '--l1')} opacity: @r(0.55, 1);`)} ${A(`${trail('--m2', '--l2')} opacity: @r(0.4, 0.9);`)} }${TR}`,
    };
  },
  {
    palette: ['#0A1020', '#F4F1E6', '#9CC7F0', '#F6C36A', '#E58FB0', '#7FD6C2'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['arcs', 'concentric', 'lines', 'curves'], mood: ['calm', 'elegant'], density: 'medium', goodFor: ['hero-background', 'wallpaper'] },
  }
);

add(
  'Deep Field',
  'A deep sky of faint galaxies, round and edge-on, in warm and cool light, with now and then a nearer star throwing four soft spikes.',
  (c) => ({
    rule: `${F} {
      ${B(`inset: @r(16%, 34%); background: ${ink(c)}; ${msk1('radial-gradient(closest-side, #000 0 10%, #00000080 34%, transparent 100%)')} transform: translate(@r(-20%, 20%), @r(-20%, 20%)) rotate(@r(0deg, 180deg)) scaleY(@r(0.26, 1));`)}
      ${A(`inset: 4%; background: var(--color1); opacity: @p(0, 0, 0, 1); ${msk1('radial-gradient(ellipse 50% 2.6% at 50% 50%, #000, transparent)', 'radial-gradient(ellipse 2.6% 50% at 50% 50%, #000, transparent)', 'radial-gradient(closest-side, #000 0 9%, transparent 30%)')} transform: translate(@r(-14%, 14%), @r(-14%, 14%)) scale(@r(0.45, 1));`)}
      background: radial-gradient(circle at @r(6, 94)% @r(6, 94)%, var(--color3) 0 0.9%, transparent 2.2%), radial-gradient(circle at @r(6, 94)% @r(6, 94)%, var(--color4) 0 0.7%, transparent 1.8%);
    }${TR}`,
  }),
  {
    palette: ['#05060D', '#F4F2EC', '#F6C88F', '#93B9F2', '#E99B8F', '#C3A6EE'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['ovals', 'dots', 'gradients', 'crosses'], mood: ['calm', 'organic'], density: 'sparse', goodFor: ['hero-background', 'poster', 'og-image'] },
  }
);

// A two-armed spiral as one polygon: t runs round four quarters, out along
// the leading edge of an arm and back along its trailing edge, then the same
// for the second arm half a turn on.
const SPIRAL = (() => {
  const q = 'floor(t / (PI / 2))';
  const s = `((t - ${q} * PI / 2) / (PI / 2))`;
  const u = `(${s} + (${q} % 2) * (1 - 2 * ${s}))`;
  const e = `(1 - 2 * (${q} % 2))`;
  const phi = `(PI * floor(${q} / 2) + ${u} * 4.6)`;
  const rad = `(0.08 + 0.9 * ${u} + ${e} * (0.15 * (1 - ${u}) + 0.02))`;
  return `@shape(split: 240; x: ${rad} * cos(${phi}); y: ${rad} * sin(${phi}))`;
})();

add(
  'Whirlpool',
  'Two-armed spiral galaxies, each tipped and turned by its place in the sheet, around a soft bright core.',
  (c) => ({
    host: `--g: ${SPIRAL};`,
    rule: `${F} {
      ${B(`inset: 3%; background: ${ink(c, 2)}; ${cp('@var(--g)')} transform: rotate(@rn(0, 360)deg) scale(@rn(0.6, 1.1), @rn(0.6, 1.1));`)}
      ${A(`inset: 30%; border-radius: 50%; background: var(--color1); ${msk1('radial-gradient(closest-side, #000 22%, transparent 100%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#120C24', '#FFF4D6', '#B9A4F2', '#7FC8E8', '#F2A7C3', '#F6D186'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['spirals', 'curves', 'radial'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'poster'] },
  }
);

// =============================================================================
// Comets and light
// =============================================================================

add(
  'Perseids',
  'A meteor shower: streaks of light fly out of one radiant above the sheet, short near it and longer far away, among still stars.',
  (c) => {
    const RX = '(-0.2 * @X)';
    const RY = '(-0.62 * @Y)';
    const vx = `(@dx - ${RX})`;
    const vy = `(@dy - ${RY})`;
    const D = `sqrt(${vx} * ${vx} + ${vy} * ${vy})`;
    return {
      rule: `--jx: @r(-22%, 22%); --jy: @r(-22%, 22%); --len: @calc(min(2, 0.25 + ${D} * 0.2) * @r(0.5, 1.1) * 100)%;
      ${F} {
        ${B(`width: @var(--len); height: 3.6%; left: calc(50% + @var(--jx) - @var(--len)); top: calc(50% + @var(--jy) - 1.8%); transform-origin: 100% 50%; transform: rotate(@calc(atan2(${vy}, ${vx}) * 180 / PI)deg); border-radius: 99px; background: ${ink(c, 2)}; ${msk1('linear-gradient(90deg, transparent, #000 85%)')} opacity: @p(1, 1, 1, 0.7, 0);`)}
        ${A(`width: 6.4%; height: 6.4%; left: calc(50% + @var(--jx) - 3.2%); top: calc(50% + @var(--jy) - 3.2%); border-radius: 50%; background: var(--color1);`)}
      }${TR}`,
    };
  },
  {
    palette: ['#0B1530', '#F6F3EA', '#8EC5FF', '#FFC870', '#7EE0C3', '#F59AB6'],
    grid: '7x10',
    tg: '6x6',
    meta: { tags: ['lines', 'radial', 'dots', 'gradients'], mood: ['bold', 'elegant'], density: 'sparse', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

// A comet drawn in cell units and laid into a box 1.8 cells wide (inset
// -40%), so its tails can run past the cell. The dust tail is a curved band
// that widens away from the head; the ion tail is a straight sliver with the
// head on its end. Both are clip-path polygons, faded along their length by
// one mask layer.
const toBox = (v) => ((v + 0.4) / 1.8) * 100;
const COMET = (() => {
  const N = 14;
  const head = [0.8, 0.4];
  const up = [];
  const down = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = head[0] - 1.05 * t;
    const y = head[1] + 0.46 * t * t;
    // normal to the centerline (dx, dy) = (-1.05, 0.92 t)
    const len = Math.hypot(1.05, 0.92 * t);
    const nx = (0.92 * t) / len;
    const ny = 1.05 / len;
    const w = 0.014 + 0.22 * t;
    up.push([x - (nx * w) / 2, y - (ny * w) / 2]);
    down.push([x + (nx * w) / 2, y + (ny * w) / 2]);
  }
  const dust = poly([...up, ...down.reverse()].map(([x, y]) => [toBox(x), toBox(y)]));
  const ring = [];
  for (let i = 0; i < 16; i++) {
    const a = Math.PI / 2 + (i / 16) * 2 * Math.PI;
    ring.push([head[0] + 0.07 * Math.cos(a), head[1] - 0.07 * Math.sin(a)]);
  }
  // round the head from the bottom, then out along the sliver and back
  const ion = poly(
    [...ring.slice(4, 13), [head[0] - 0.95, head[1] - 0.07], [head[0] - 0.95, head[1] - 0.055]]
      .map(([x, y]) => [toBox(x), toBox(y)])
  );
  return { dust, ion };
})();

add(
  'Halley',
  'Comets streaming across the sky in loose shoals, each with a bright head, a broad curved dust tail and a thin straight ion tail.',
  (c) => ({
    host: `--dust: ${COMET.dust}; --ion: ${COMET.ion};`,
    rule: `${F} {
      transform: rotate(@rn(-200, 560)deg) scale(@r(0.8, 1.15));
      ${B(`inset: -40%; background: @p(var(--color2), var(--color3)); ${cp('@var(--dust)')} ${msk1(`linear-gradient(90deg, transparent ${toBox(-0.18).toFixed(1)}%, #000 ${toBox(0.66).toFixed(1)}%)`)}`)}
      ${A(`inset: -40%; background: @p(var(--color1), var(--color4), var(--color5)); ${cp('@var(--ion)')} ${msk1(`linear-gradient(90deg, transparent ${toBox(-0.15).toFixed(1)}%, #000 ${toBox(0.62).toFixed(1)}%)`)}`)}
    }${TR}`,
  }),
  {
    palette: ['#0D1328', '#F4F8FF', '#FFE9B8', '#FFC98A', '#9DD1FF', '#B2F2E6'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['curves', 'dots', 'gradients', 'arcs'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'poster'] },
  }
);

// Each curtain hangs from a curve across the sheet, y = Y * (base + amp *
// sin(...)), measured in rows. The one cell in each column that the curve
// passes through draws the whole curtain, from the curve up, skewed to the
// curve's slope there, so the columns join into one hem.
const hem = (base, amp, k, ph) => {
  const arg = `6.283 * ${k} * ${FX} + ${ph}`;
  const yc = `(@Y * (${base} + ${amp} * sin(${arg})))`;
  const slope = `(@Y * ${amp} * 6.283 * ${k} * cos(${arg}) / @X)`;
  return {
    on: `((${yc} >= @y - 1) * (${yc} < @y))`,
    top: `(${yc} - @y + 1)`,
    skew: `atan(${slope}) * 180 / PI`,
  };
};

const curtain = (h, H, inks) =>
  `left: -1%; width: 102%; height: calc(@var(${H}) * 100%); top: calc((@calc(${h.top}) - @var(${H})) * 100%); transform-origin: 50% 100%; transform: skewY(@calc(${h.skew})deg); background: ${inks}; opacity: @calc(${h.on} * @r(0.55, 1)); ${mskI1('linear-gradient(0deg, transparent 0, #000 6%, #00000080 40%, transparent 100%)', 'repeating-linear-gradient(90deg, #000 0 @r(3, 8)%, #00000047 0 @r(9, 15)%)')}`;

add(
  'Northern Lights',
  'Two curtains of rayed light hang across a night sky in green, teal and violet, brightest along their swaying lower hems and fading upward among faint stars.',
  (c) => {
    const upper = hem(0.5, 0.16, 1.1, 0.7);
    const lower = hem(0.8, 0.08, 1.7, 2.5);
    return {
      rule: `--h1: @r(2.2, 3.6); --h2: @r(1.4, 2.4);
      ${F} {
        background: radial-gradient(circle at @r(6, 94)% @r(6, 94)%, var(--color1) 0 1.6%, transparent 2.4%);
        ${B(curtain(upper, '--h1', '@p(var(--color2), var(--color3), var(--color4))'))}
        ${A(curtain(lower, '--h2', '@p(var(--color2), var(--color3), var(--color5))'))}
      }${TR}`,
    };
  },
  {
    palette: ['#06131F', '#E9F7F2', '#5BE3A8', '#3CC6D6', '#9B7BEA', '#E07AB8'],
    grid: '8x12',
    min: 44,
    tg: '6x6',
    meta: { tags: ['stripes', 'gradients', 'waves', 'lines'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['hero-background', 'poster', 'og-image'] },
  }
);

add(
  'Sun Dogs',
  'Pale suns in a blue sky, each inside its halo with a mock sun at either side, strung together row by row on one long parhelic line.',
  (c) => ({
    rule: `--hr: @rn(31, 39)%;
    ${F} {
      background: radial-gradient(closest-side, var(--color2) 0 12%, transparent 46%);
      ${B(`inset: 0; background: var(--color1); opacity: @r(0.6, 0.9); ${msk1(`radial-gradient(ellipse @var(--hr) @var(--hr) at 50% 50%, transparent 82%, #000 95%, transparent 100%)`, 'linear-gradient(transparent 49.3%, #000 49.3% 50.7%, transparent 50.7%)')}`)}
      ${A(`inset: 0; background: ${ink(c, 2)}; ${msk1(disc(8.5), 'radial-gradient(ellipse 4.6% 7.6% at calc(50% - @var(--hr) - 1.5%) 50%, #000 45%, transparent 100%)', 'radial-gradient(ellipse 4.6% 7.6% at calc(50% + @var(--hr) + 1.5%) 50%, #000 45%, transparent 100%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#3B76B2', '#E8F1FA', '#FFF6DC', '#FFE29A', '#FFD0B8'],
    grid: '5x8',
    min: 50,
    tg: '4x4',
    meta: { tags: ['rings', 'circles', 'lines', 'dots'], mood: ['calm', 'elegant'], density: 'sparse', goodFor: ['hero-background', 'textile', 'wallpaper'] },
  }
);

// =============================================================================
// The moon
// =============================================================================

add(
  'Lunation',
  'A printed moon calendar: moons wax and wane cell by cell in reading order, new to full and back over every eight, each lit part inked over the pale disc of the whole moon.',
  (c) => {
    const p = '(((@i - 1) % 8) / 8)';
    const k = `(-220 * ${p} * (${p} <= 0.5) + (220 - 220 * ${p}) * (${p} > 0.5))`;
    const cx = `(50 + ${k})`;
    const R = `(5000 / max(abs(${cx}), abs(100 - ${cx}), 50) + 0.6)`;
    return {
      rule: `${F} {
        ${B(`inset: 14%; border-radius: 50%; background: var(--color1);`)}
        ${A(`inset: 14%; border-radius: 50%; background: ${ink(c, 2)}; ${msk(`radial-gradient(circle farthest-side at @calc(${cx})% 50%, transparent @calc(${R})%, #000 @calc(${R})%)`)}`)}
      }${TR}`,
    };
  },
  {
    palette: ['#F2EDE3', '#DDD4C3', '#1F2D4A', '#3D5C8F', '#B4762A'],
    grid: '8x12',
    tg: '6x6',
    meta: { tags: ['circles', 'semicircles', 'grid', 'dots'], mood: ['calm', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

add(
  'Umbra',
  "A field of full moons with the earth's round shadow fallen across the middle of the sheet: moons inside it glow red, and those on its edge are cut by its curve.",
  (c) => {
    // the moon's box is 76% of the cell, so a cell is 131.58% of it
    const Ru = `(0.62 * ${HALF})`;
    const at = 'at @calc(50 - @dx * 131.58)% @calc(50 - @dy * 131.58)%';
    const size = `ellipse @calc(${Ru} * 131.58)% @calc(${Ru} * 131.58)%`;
    return {
      rule: `${F} {
        ${B(`inset: 12%; border-radius: 50%; background: @p(var(--color1), var(--color2), var(--color3)); ${msk1(`radial-gradient(${size} ${at}, #000 100%, transparent 100%)`)}`)}
        ${A(`inset: 12%; border-radius: 50%; background: @p(var(--color4), var(--color5)); opacity: @calc(min(1, 0.4 + 0.6 * max(0, ${DIST} - ${Ru}) / (0.5 * ${HALF}))); ${msk1(`radial-gradient(${size} ${at}, transparent 100%, #000 100%)`)}`)}
      }${TR}`,
    };
  },
  {
    palette: ['#0D0B16', '#B5322B', '#D4572E', '#8E2A2A', '#F1EAD7', '#DCE2EC'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['circles', 'grid', 'dots', 'arcs'], mood: ['bold', 'calm'], density: 'medium', goodFor: ['poster', 'og-image', 'wallpaper'] },
  }
);

add(
  'Regolith',
  'A grey lunar surface pocked with craters of every size, each a raised rim with its inner wall in shadow on the side the light comes from.',
  (c) => {
    const turn = 'transform: translate(@var(--jx), @var(--jy)) scale(@var(--s));';
    return {
      rule: `--s: @calc(@rn(0.35, 1.5, 1.3) * @r(0.45, 1.3)); --jx: @r(-22%, 22%); --jy: @r(-22%, 22%); z-index: @calc(round(120 - $(s) * 60));
      ${F} {
        background: radial-gradient(circle at @r(6, 94)% @r(6, 94)%, var(--color2) 0 2%, transparent 2.6%), radial-gradient(circle at @r(6, 94)% @r(6, 94)%, var(--color1) 0 1.6%, transparent 2.2%);
        ${B(`inset: 8%; border-radius: 50%; background: @p(var(--color1), var(--color3)); ${msk1(bore(38))} ${turn}`)}
        ${A(`inset: 8%; border-radius: 50%; background: var(--color2); ${mskI1(disc(38), bore(38, '60% 60%'))} ${turn}`)}
      }${TR}`,
    };
  },
  {
    palette: ['#D8D4CB', '#A29D93', '#615D57', '#BDB8AE'],
    grid: '7x10',
    tg: '6x6',
    meta: { tags: ['circles', 'rings', 'semicircles', 'dots'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['card-texture', 'wallpaper', 'textile'] },
  }
);

const STREAMERS = `conic-gradient(${sectorStops([
  [0, 9], [38, 43], [84, 97], [140, 146], [176, 188], [228, 233], [262, 276], [318, 324],
])})`;

add(
  'Totality',
  'A total eclipse in every cell: the black disc of the moon, a pale corona fading around it, long streamers, and one bright bead of the diamond ring on its edge.',
  (c) => ({
    rule: `--t: @r(0deg, 360deg);
    ${F} {
      background: radial-gradient(closest-side, transparent 40%, var(--color1) 40%, transparent 100%);
      ${B(`inset: -26%; background: ${ink(c, 2)}; transform: rotate(@var(--t)); ${mskI1(STREAMERS, 'radial-gradient(closest-side, transparent 26.5%, #000 27.5%, transparent 100%)')} opacity: 0.75;`)}
      ${A(`width: 9%; height: 9%; left: calc(50% + 20% * cos(@var(--t)) - 4.5%); top: calc(50% + 20% * sin(@var(--t)) - 4.5%); border-radius: 50%; background: ${ink(c, 2)};`)}
    }${TR}`,
  }),
  {
    palette: ['#07080F', '#F6EFD8', '#FFF8E8', '#F7D58C', '#BFD9F2', '#F2B8A0'],
    grid: '6x9',
    min: 44,
    tg: '5x5',
    meta: { tags: ['rings', 'radial', 'circles', 'gradients'], mood: ['bold', 'elegant'], density: 'dense', goodFor: ['poster', 'og-image', 'wallpaper'] },
  }
);

// =============================================================================
// Planets and orbits
// =============================================================================

add(
  'Saturn',
  'Ringed planets tilted every way, the near side of each ring crossing in front of the globe and the far side tucked behind it.',
  (c) => {
    const band = 'transparent 70%, #000 70% 100%, transparent 100%';
    const hole = '#000 70%, transparent 70% 100%, #000 100%';
    const turn = 'transform: rotate(@var(--t)) scale(@var(--s));';
    return {
      rule: `--t: @r(-32deg, 32deg); --s: @r(0.72, 1.06);
        ${F} {
          ${B(`inset: 0; z-index: 1; background: @p(var(--color3), var(--color4)); ${msk(`radial-gradient(ellipse 46% 15% at 50% 50%, ${band})`)} ${turn}`)}
          ${A(`inset: 26%; z-index: 2; border-radius: 50%; background: @p(var(--color1), var(--color2)); ${msk(`radial-gradient(ellipse 95.83% 31.25% at 50% 50%, ${hole})`, 'linear-gradient(#000 50%, transparent 50%)')} ${turn}`)}
        }${TR}`,
    };
  },
  {
    palette: ['#F4EBDD', '#E8A33D', '#D4573B', '#1F3A5F', '#3F8F8A'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['circles', 'ovals', 'rings'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'poster'] },
  }
);

add(
  'Jovian',
  'Gas giants banded in ochre and rust, each with its oval storm, their axes tipped together in slow drifts across the sheet.',
  (c) => {
    const belts = 'linear-gradient(transparent 13.5%, #000 14.5% 20.5%, transparent 21.5% 30.5%, #000 31.5% 40.5%, transparent 41.5% 46.5%, #000 47.5% 49.5%, transparent 50.5% 57.5%, #000 58.5% 68.5%, transparent 69.5% 79.5%, #000 80.5% 84.5%, transparent 85.5%)';
    return {
      rule: `${F} {
        transform: rotate(@rn(-40, 40)deg);
        ${B(`inset: 14%; border-radius: 50%; background: @p(var(--color1), var(--color2));`)}
        ${A(`inset: 14%; border-radius: 50%; background: @p(var(--color3), var(--color4), var(--color5)); ${msk1(belts, 'radial-gradient(ellipse 15% 8.5% at 64% 64%, #000 100%, transparent 100%)')}`)}
      }${TR}`,
    };
  },
  {
    palette: ['#F2EBDD', '#E0A458', '#EBC98C', '#8C4A2F', '#5B3A29', '#C8553D'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['circles', 'stripes', 'ovals'], mood: ['retro', 'playful'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'textile'] },
  }
);

add(
  'Sunward',
  'Planets lit on one side, every terminator turned so the bright half faces a big sun rising out of the top corner of the sheet in a wide glow.',
  (c) => {
    // the sun sits 0.6 cells in from the top left corner
    const SX = '(0.6 - @X / 2)';
    const SY = '(0.6 - @Y / 2)';
    const sunR = `(0.34 * ${HALF})`;
    const D = `sqrt((@dx - ${SX}) ^ 2 + (@dy - ${SY}) ^ 2)`;
    const show = `((${D} > ${sunR} + 0.55) * 1)`;
    const turn = `transform: rotate(@calc(atan2(${SY} - @dy, ${SX} - @dx) * 180 / PI)deg) scale(@calc(${show}));`;
    const at = sheetAt(SX, SY);
    return {
      rule: `--ps: @p(24%, 30%, 36%, 44%); --jx: @r(-12%, 12%); --jy: @r(-12%, 12%);
      background: radial-gradient(${unit(HALF)} ${at}, var(--color2) 0 34%, transparent 34%), radial-gradient(${unit(HALF)} ${at}, var(--color3) 34%, transparent 100%);
      ${F} {
        ${B(`width: @var(--ps); height: @var(--ps); left: calc(50% + @var(--jx) - @var(--ps) / 2); top: calc(50% + @var(--jy) - @var(--ps) / 2); border-radius: 50%; background: var(--color1); ${turn}`)}
        ${A(`width: @var(--ps); height: @var(--ps); left: calc(50% + @var(--jx) - @var(--ps) / 2); top: calc(50% + @var(--jy) - @var(--ps) / 2); border-radius: 50%; background: ${ink(c, 4)}; ${cp('inset(0 0 0 50%)')} ${turn}`)}
      }${TR}`,
    };
  },
  {
    palette: ['#0B0F1E', '#273049', '#FFC94D', '#E8743B', '#F4EEDC', '#8FD0E8', '#F29E9E'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['circles', 'semicircles', 'radial', 'dots', 'gradients'], mood: ['bold', 'technical'], density: 'medium', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

add(
  'Galilean',
  "Galileo's notebook: Jupiter drawn as a small open circle with its four moons strung out beside it on a line, a little differently every night.",
  (c) => {
    const moon = () =>
      `radial-gradient(ellipse @p(4.2, 5, 6)% @lp()% at @calc(50 + @p(-1, 1) * @r(19, 45))% 50%, #000 100%, transparent 100%)`;
    return {
      rule: `${F} {
        ${B(`inset: 37%; border-radius: 50%; background: var(--color1); ${msk1('radial-gradient(closest-side, transparent 60%, #000 60%)')}`)}
        ${A(`inset: 0; background: ${ink(c)}; ${msk1(moon(), moon(), moon(), moon())}`)}
      }${TR}`,
    };
  },
  {
    pal: 0,
    inks: 3,
    grid: '5x10',
    min: 56,
    tg: '4x4',
    meta: { tags: ['dots', 'circles', 'rings'], mood: ['technical', 'calm'], density: 'sparse', goodFor: ['hero-background', 'card-texture', 'textile'] },
  }
);

add(
  'Orrery',
  'Thin orbits ring the middle of the sheet around a small sun, and planets of every size ride on them.',
  (c) => {
    const P = `(0.24 * ${HALF})`;
    const Rn = `(max(round(${DIST} / ${P}), 1) * ${P})`;
    const th = 'atan2(@dy, @dx) * 180 / PI';
    const k = `(57.3 / ${Rn})`;
    const pos = (trig, d) =>
      `calc(50% + (@calc(${Rn}) * ${trig}(@calc(${th})deg + @var(--a) * @calc(${k})deg) - ${d}) * 100% - @var(--ps) / 2)`;
    return {
      rule: `--a: @r(-0.4, 0.4); --ps: @p(10%, 13%, 16%, 21%, 27%);
        ${B(`inset: 0; background: radial-gradient(${unit(HALF)} ${sheetAt()}, var(--color2) 0 10%, transparent 10%), repeating-radial-gradient(${unit(HALF)} ${sheetAt()}, var(--color1) 0 0.9%, transparent 0.9% 24%);`)}
        ${F} { ${A(`width: @var(--ps); height: @var(--ps); left: ${pos('cos', '@dx')}; top: ${pos('sin', '@dy')}; border-radius: 50%; background: ${ink(c, 2)};`)} }${TR}`,
    };
  },
  {
    palette: ['#0B1426', '#33476B', '#F2C14E', '#F28F6B', '#8FD3E8', '#E9E4D8', '#B48EE0'],
    grid: '8x12',
    freq: 0.5,
    tg: '10x10',
    tf: 0.55,
    meta: { tags: ['rings', 'concentric', 'circles', 'dots'], mood: ['technical', 'calm'], density: 'sparse', goodFor: ['hero-background', 'poster'] },
  }
);

// Three orbits sharing their right-hand focus (79.4%, 50%): [center x, a, b].
const ORBITS = [
  [50, 42, 30],
  [61.4, 26, 18.76],
  [74.4, 12, 10.9],
];

add(
  'Perihelion',
  'Diagrams of three nested orbits that share one focus, the sun sitting in it and a single body somewhere on its path, turned every way.',
  (c) => {
    const bands = ORBITS.map(([cx, a, b]) => {
      const t = (100 * (1 - 2.2 / Math.min(a, b))).toFixed(2);
      return `radial-gradient(ellipse ${a}% ${b}% at ${cx}% 50%, transparent ${t}%, #000 ${t}% 100%, transparent 100%)`;
    });
    const at = ORBITS.map(
      ([cx, a, b]) => `translate(calc(${(cx - 50).toFixed(1)}% + ${a}% * cos(@var(--e))), calc(${b}% * sin(@var(--e))))`
    );
    return {
      rule: `--e: @r(0deg, 360deg);
      ${F} {
        transform: rotate(@r(0deg, 360deg));
        background: radial-gradient(ellipse 6.5% 6.5% at 79.4% 50%, var(--color2) 100%, transparent 100%);
        ${B(`inset: 0; background: var(--color1); ${msk1(...bands)}`)}
        ${A(`inset: 0; background: @p(var(--color3), var(--color4)); ${msk1(disc(5.2))} transform: @p(${at.join(', ')});`)}
      }${TR}`,
    };
  },
  {
    palette: ['#F0F4F8', '#334E68', '#E0912F', '#D64545', '#102A43'],
    grid: '6x9',
    min: 48,
    tg: '5x5',
    meta: { tags: ['ovals', 'rings', 'dots', 'curves'], mood: ['technical', 'calm'], density: 'sparse', goodFor: ['hero-background', 'card-texture', 'wallpaper'] },
  }
);

add(
  'Asteroid Belt',
  'Lumpy rocks crowd a broad arc across the sheet, big boulders along its middle and grit and pebbles thinning out to either side.',
  (c) => {
    const d = `abs(sqrt((${FX} + 0.2) ^ 2 + (${FY} - 1.2) ^ 2) - 0.92 + @rn(-0.07, 0.07))`;
    const w = `max(0, 1 - ${d} / 0.26)`;
    const rock = () =>
      `@shape(split: 9; r: 0.8 + 0.13 * sin(3t + @r(0, 6.28)) + 0.07 * sin(5t + @r(0, 6.28)))`;
    return {
      rule: `--w: @calc(${w});
      ${F} {
        ${B(`inset: 5%; background: ${ink(c)}; clip-path: ${rock()}; ${msk1('linear-gradient(45deg, #000 30%, #00000099 100%)')} transform: translate(@r(-24%, 24%), @r(-24%, 24%)) rotate(@r(0deg, 360deg)) scale(calc(0.14 + 1.15 * @var(--w) * @r(0.6, 1.1)));`)}
        ${A(`inset: 32%; background: ${ink(c)}; clip-path: ${rock()}; transform: translate(@r(-125%, 125%), @r(-125%, 125%)) rotate(@r(0deg, 360deg)) scale(calc(0.3 + 1.1 * @var(--w) * @r(0.3, 1)));`)}
      }${TR}`,
    };
  },
  {
    pal: 11,
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['blocks', 'dots', 'arcs', 'diagonals'], mood: ['organic', 'bold'], density: 'medium', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

add(
  'Event Horizon',
  'Black holes: a round hole ringed by bright lensed light, with a glowing accretion disk lying across it, one side brighter than the other.',
  (c) => ({
    rule: `--t: @r(-26deg, 26deg);
    ${F} {
      ${B(`inset: -8%; background: ${ink(c, 2)}; ${msk1('radial-gradient(closest-side, transparent 34%, #000 34% 39%, #00000073 45%, transparent 76%)')}`)}
      ${A(`inset: -14%; background: var(--color1); transform: rotate(@var(--t)); ${msk1('radial-gradient(ellipse 58% 6.5% at 42% 50%, #000 0 50%, transparent 100%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#08070C', '#FFE7B3', '#F59E4C', '#F7C873', '#E8604C'],
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['rings', 'ovals', 'gradients', 'circles'], mood: ['bold', 'elegant'], density: 'medium', goodFor: ['poster', 'og-image'] },
  }
);

// =============================================================================
// Instruments
// =============================================================================

add(
  'Armillary',
  'Globes drawn in fine line, meridians and parallels on each, with a broader zodiac band crossing at a tilt, the globes leaning together across the sheet.',
  (c) => {
    const lines = [
      'radial-gradient(closest-side, transparent 95%, #000 95%)',
      'radial-gradient(ellipse 33% 50% at 50% 50%, transparent 94%, #000 94% 100%, transparent 100%)',
      'radial-gradient(ellipse 15% 50% at 50% 50%, transparent 88%, #000 88% 100%, transparent 100%)',
      'linear-gradient(90deg, transparent 49%, #000 49% 51%, transparent 51%)',
      'linear-gradient(transparent 24%, #000 24% 26%, transparent 26% 49%, #000 49% 51%, transparent 51% 74%, #000 74% 76%, transparent 76%)',
    ];
    return {
      rule: `${F} {
        transform: rotate(@rn(-45, 45)deg);
        ${B(`inset: 9%; border-radius: 50%; background: @p(var(--color1), var(--color2)); ${msk1(...lines)}`)}
        ${A(`inset: 9%; background: @p(var(--color3), var(--color4)); transform: rotate(-24deg); ${msk1('radial-gradient(ellipse 50% 19% at 50% 50%, transparent 80%, #000 80% 100%, transparent 100%)')}`)}
      }${TR}`,
    };
  },
  {
    pal: 5,
    inks: 4,
    grid: '6x9',
    min: 44,
    tg: '5x5',
    meta: { tags: ['circles', 'ovals', 'lines', 'rings'], mood: ['technical', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'card-texture', 'textile'] },
  }
);

const TICKS = `conic-gradient(${sectorStops(Array.from({ length: 72 }, (_, k) => [k * 5, k * 5 + 1.3]))})`;

add(
  'Astrolabe',
  'Brass astrolabes on parchment: a graduated rim, nested almucantar circles drawn toward the zenith, and the alidade laid across, each dial turned its own way.',
  (c) => {
    const alm = [
      [37, 55], [29, 59], [21, 62.5], [13, 65.5],
    ].map(([r, cy]) => `radial-gradient(ellipse ${r}% ${r}% at 50% ${cy}%, transparent ${(100 - 140 / r).toFixed(1)}%, var(--color3) ${(100 - 140 / r).toFixed(1)}% 100%, transparent 100%)`);
    return {
      host: `--tk: ${TICKS};`,
      rule: `${F} {
        transform: rotate(@r(0deg, 360deg));
        background: ${disc(3).replace('#000 100%', 'var(--color4) 100%')}, linear-gradient(90deg, transparent 49%, var(--color4) 49% 51%, transparent 51%) 0 8% / 100% 84% no-repeat, ${alm.join(', ')};
        ${B(`inset: 6%; border-radius: 50%; background: @p(var(--color1), var(--color2)); ${msk1('radial-gradient(closest-side, transparent 88%, #000 88%)')}`)}
        ${A(`inset: 6%; background: @p(var(--color1), var(--color5)); ${mskI1('@var(--tk)', 'radial-gradient(closest-side, transparent 74%, #000 74% 86%, transparent 86%)')}`)}
      }${TR}`,
    };
  },
  {
    palette: ['#EFE6D2', '#8A5A24', '#B8862E', '#C9A25A', '#9C3D2E', '#2F3B52'],
    grid: '5x8',
    min: 52,
    tg: '4x4',
    meta: { tags: ['rings', 'radial', 'circles', 'lines'], mood: ['technical', 'elegant', 'retro'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'card-texture'] },
  }
);

export const sectionH = { title: 'H. Orbit', all };
