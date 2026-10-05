// C. Illusion - op art: figures that bulge, twist, tunnel and shimmer as they cross the sheet.
//
// Most of these read where the cell sits. Three ways of doing that recur:
//
//   * A mask layer laid out in sheet coordinates. A ring centered at
//     (50 - 100 * @dx)% is centered on the middle of the sheet in every
//     cell, so the rings run on unbroken from cell to cell. Two such fields
//     crossed through a pair of pseudo-elements (one takes A and not B, the
//     other B and not A) give the figure-ground swaps op art lives on.
//   * A warped checker column: the stripes of a cell are cut where a smooth
//     warp of the sheet crosses whole numbers, so a checkerboard can swell
//     like a lens and still meet itself at every cell edge.
//   * A figure drawn once on the host (--fig: polygon(...)) and painted by a
//     pseudo-element the size of the sheet, placed so it lands in the same
//     spot in every cell, with the cell clipping it (overflow: hidden). Each
//     cell then shows its own piece of one big spiral or tunnel.
//
// The thumbnail grids (tg) divide 300px into whole device pixels at 2x
// (5, 6, 8, 10 or 12 a side): a cell edge that lands mid-pixel is snapped by
// the browser and anti-aliased by SVG, which costs parity on every seam.
//
//   Target Stripe   rings crossed with upright stripes
//   Two Stones      two sets of ripples crossed into interference fringes
//   Float           a disc of upright lines hovering in a field of level ones
//   Lens Check      a checkerboard swelling as if under a lens
//   Diamond Ripple  nested diamonds whose bands swell and thin
//   Vanishing Point towers seen from above, leaning out from the middle
//   Undertow        curved rays wound round a point off the middle
//   Twin Spiral     a warm band and a cool band coiled one inside the other
//   Square Tunnel   square frames turning as they recede
//   Blaze           zigzag rings stepped round so they seem to spin
//   Globe           dots squashed into ellipses round the rim of a sphere
//   Cafe Wall       mortar courses that seem to wedge apart
//   Zollner         parallels that seem to splay under slanting hatches
//   Zebra Wave      fine stripes carried on a swell across the sheet
//   Snake Wheels    wheels of stepped wedges, turning against each other
//   Scintillate     a dark grid with pale dots that flicker at the crossings
//   Polar Fan       rays and rings from one corner crossed into a checker
//   Ribbon Twist    ribbons turning about their length, face and back in two inks
//   Spotlit         balls lit from a lamp over the middle of the sheet
//   Wire Cubes      Necker cubes whose far faces all point to the middle
//   Sightline       nested squares looking off in directions that sweep the sheet
//   Phantom Squares bitten discs that conjure squares nobody drew
//   Neon Spread     a lattice whose colored crossings seem to glow
//   Twisted Cord    rings of slanted segments that read as a spiral
//   Kaleidoscope    a picked figure mirrored about both middle lines
import { section, F, TR, cp, msk, mskI, B, A, ink, fr } from './shared.mjs';

const { add, all } = section('C. Illusion');

// -- position helpers --------------------------------------------------------
/** A css-doodle number rounded to two places (no exponent notation leaks out). */
const K = (e) => `@calc(round((${e}) * 100) / 100)`;
/** The middle of the sheet, in the cell's own percent coordinates. */
const CX = '(50 - 100 * @dx)';
const CY = '(50 - 100 * @dy)';
/** Half the sheet's short side, in cells: the radius at which fr reaches 1. */
const RC = '(min(@X, @Y) / 2)';
/** A point of the sheet given as fractions of its width and height, in cell percent. */
const atX = (ox) => `(100 * (${ox} * @X - @x + 1))`;
const atY = (oy) => `(100 * (${oy} * @Y - @y + 1))`;
/** The bearing of the cell from the middle of the sheet, in degrees (0 = right). */
const BEARING = 'atan2(@dy, @dx) * 180 / PI';

const n2 = (v) => +v.toFixed(2);
const col = (...ns) => ns.map((n) => `var(--color${n})`);
/** A random pick from the listed palette slots (repeat a slot to weight it). */
const pick = (...ns) => `@p(${col(...ns).join(', ')})`;

// -- mask layers that run across the sheet -----------------------------------
/** Concentric rings around a sheet point, period and width as % of `size` cells. */
const ringL = (on, period, { inv = false, cx = CX, cy = CY, size = RC } = {}) =>
  `repeating-radial-gradient(ellipse ${K(`${size} * 100`)}% ${K(`${size} * 100`)}% at ${K(cx)}% ${K(cy)}%, ${
    inv ? `transparent 0 ${on}%, #000 ${on}% ${period}%` : `#000 0 ${on}%, transparent ${on}% ${period}%`
  })`;
/** Plain stripes, `on` inked out of every `period` (percent), or the gaps when inverted. */
const stripeL = (angle, on, period, inv = false) =>
  `repeating-linear-gradient(${angle}, ${
    inv ? `transparent 0 ${on}%, #000 ${on}% ${period}%` : `#000 0 ${on}%, transparent ${on}% ${period}%`
  })`;

/**
 * A number worked out once per cell. css-doodle evaluates every @calc on its
 * own, so an expression repeated across a dozen gradient stops is a dozen
 * evaluations; `--name: $(...)` stores it on the cell, and $(name)
 * reads it back as a number in the expressions that follow.
 */
const once = (e, places = 2) => `$(round((${e}) * ${10 ** places}) / ${10 ** places})`;

/**
 * A warped checker column, as stripes whose stops the cell works out once:
 * `--<v>a`, `--<v>b`, `--<v>c` and `--<v>l` (percent) for axis v. The ink is
 * where floor(W) is even; the other parity is the same stops with the ink
 * and the gap swapped. The repeat starts at 0 whatever the phase, so the
 * stripes meet the next cell.
 */
const warpStops = (v, L, ph) =>
  `--${v}a: ${once(`max(0, 0.5 - ${ph}) * ${L}`)}%; --${v}b: ${once(`(1 - ${ph}) * ${L}`)}%; --${v}c: ${once(`min(1, 1.5 - ${ph}) * ${L}`)}%; --${v}l: $(${L})%;`;
const warpV = (angle, v, inv = false) => {
  const [on, off] = inv ? ['transparent', '#000'] : ['#000', 'transparent'];
  return `repeating-linear-gradient(${angle}, ${on} 0 @var(--${v}a), ${off} @var(--${v}a) @var(--${v}b), ${on} @var(--${v}b) @var(--${v}c), ${off} @var(--${v}c) @var(--${v}l))`;
};
/** A smooth monotone warp of 0-1 onto 0-1, dense around t0 when a > 0. */
const warp = (t, a, t0 = 0.5) => `((${t}) + ${a} * sin(2 * PI * ((${t}) - (${t0}))) / (2 * PI))`;

/** A disc of radius r (percent of the cell) at (x, y), as a mask layer. */
const dotL = (r, x = 50, y = 50) => `radial-gradient(ellipse ${r}% ${r}% at ${x}% ${y}%, #000 0 100%, transparent 100%)`;

// -- a figure drawn once on the host, seen through every cell ----------------
/**
 * A square pseudo-element of side `side` cells centered on the sheet point
 * (ox, oy), so a polygon kept on the host lands in the same place in every
 * cell; the cell clips it (overflow: hidden), so each cell shows its own
 * piece in its own ink.
 */
const bigBox = (ox, oy, side) =>
  `width: ${K(`${side} * 100`)}%; height: ${K(`${side} * 100`)}%; left: ${K(`${atX(ox)} - ${side} * 50`)}%; top: ${K(`${atY(oy)} - ${side} * 50`)}%;`;
/** A point at bearing `deg` (0 = up, clockwise) and radius `r`, in box percent. */
const P = (deg, r, cx = 50, cy = 50) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
};
const polyStr = (pts) => `polygon(${pts.map(([x, y]) => `${n2(x)}% ${n2(y)}%`).join(', ')})`;

/**
 * A fan of wedges from the box center: [from, to] bearings, out to radius r.
 * Each wedge leaves from the center and returns to it, so the pieces of one
 * polygon join only at that point.
 */
const fanPts = (spans, r = 80, steps = 1) => {
  const pts = [];
  for (const [a0, a1] of spans) {
    pts.push([50, 50]);
    for (let s = 0; s <= steps; s++) pts.push(P(a0 + ((a1 - a0) * s) / steps, r));
  }
  return pts;
};

// -- 1. crossed fields -------------------------------------------------------

add(
  'Target Stripe',
  'Concentric rings crossed with upright stripes, figure and ground swapping wherever the two meet, so the target shimmers.',
  (c) => ({
    rule: `${F} { ${B(`inset: 0; background: ${ink(c)}; ${mskI(ringL(7, 14), stripeL('90deg', 25, 50, true))}`)} ${A(
      `inset: 0; background: @lp(); ${mskI(ringL(7, 14, { inv: true }), stripeL('90deg', 25, 50))}`
    )} }${TR}`,
  }),
  { pal: 3, inks: 2, grid: '6x9', tg: '6x6', meta: { tags: ['rings', 'stripes', 'concentric'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

add(
  'Two Stones',
  'Two sets of ripples spreading from two points, crossed so figure and ground trade places wherever they meet.',
  (c) => {
    const a = { cx: atX(0.3), cy: atY(0.5) };
    const b = { cx: atX(0.7), cy: atY(0.5) };
    return {
      rule: `${F} { ${B(`inset: 0; background: ${ink(c)}; ${mskI(ringL(6, 12, a), ringL(6, 12, { ...b, inv: true }))}`)} ${A(
        `inset: 0; background: @lp(); ${mskI(ringL(6, 12, { ...a, inv: true }), ringL(6, 12, b))}`
      )} }${TR}`,
    };
  },
  { pal: 41, inks: 3, grid: '6x9', tg: '8x8', meta: { tags: ['rings', 'concentric', 'diamonds'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

add(
  'Float',
  'Fine level lines across the whole sheet, with a disc of upright lines set into the middle so it seems to hover over them.',
  () => {
    const disc = (inside) =>
      `radial-gradient(ellipse ${K(`${RC} * 62`)}% ${K(`${RC} * 62`)}% at ${K(CX)}% ${K(CY)}%, ${
        inside ? '#000 0 100%, transparent 100%' : 'transparent 0 100%, #000 100%'
      })`;
    return {
      rule: `${F} { ${B(`inset: 0; background: ${pick(1, 1, 2)}; ${mskI(stripeL('180deg', 12.5, 25), disc(false))}`)} ${A(
        `inset: 0; background: @lp(); ${mskI(stripeL('90deg', 12.5, 25), disc(true))}`
      )} }${TR}`,
    };
  },
  { palette: ['#E9F1F7', '#0B2545', '#1F4E79'], grid: '8x12', tg: '8x8', meta: { tags: ['stripes', 'circles', 'lines'], mood: ['bold', 'technical'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

// -- 2. a warped checkerboard ------------------------------------------------

add(
  'Lens Check',
  'A checkerboard swelling toward the middle of the sheet as if seen through a lens, its squares shrinking toward every edge.',
  () => {
    // Per cell, once: the warped coordinate at both edges (ax, bx), the
    // two-column repeat (lx) and the phase the cell starts at (kx), the same
    // down the rows, and from those the stripes' stops. The four stripe
    // layers are kept on the cell, so the prefixed and plain masks of both
    // pseudos read them with @var instead of each writing them out.
    const W = (t, n) => `(1.2 * ${n} * ${warp(t, -0.72)})`;
    const axis = (v, edge0, edge1, n) =>
      `--a${v}: ${once(W(edge0, n), 4)}; --b${v}: ${once(W(edge1, n), 4)}; --l${v}: ${once(`200 / (b${v} - a${v})`)}; --k${v}: ${once(`a${v} / 2 - floor(a${v} / 2)`, 4)}; ${warpStops(`s${v}`, `l${v}`, `k${v}`)}`;
    const layers = `--gx: ${warpV('90deg', 'sx')}; --hx: ${warpV('90deg', 'sx', true)}; --gy: ${warpV('180deg', 'sy')}; --hy: ${warpV('180deg', 'sy', true)};`;
    const vars = `${axis('x', '(@x - 1) / @X', '@x / @X', '@X')} ${axis('y', '(@y - 1) / @Y', '@y / @Y', '@Y')} ${layers}`;
    return {
      rule: `${vars} ${F} { ${B(`inset: 0; background: ${pick(1, 1, 2)}; ${mskI('@var(--gx)', '@var(--hy)')}`)} ${A(
        `inset: 0; background: @lp(); ${mskI('@var(--hx)', '@var(--gy)')}`
      )} }${TR}`,
    };
  },
  { palette: ['#F2EFE8', '#16161D', '#2E3170'], grid: '8x12', tg: '8x8', meta: { tags: ['checkerboard', 'squares', 'grid'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

// -- 3. figures around the middle --------------------------------------------

// Diamonds: the L1 rings around the middle, each band a slit polygon (outer
// diamond one way, inner the other), in sheet coordinates.
add(
  'Diamond Ripple',
  'Nested diamonds spreading from the middle of the sheet, their bands swelling and thinning as they go out.',
  (c) => {
    // A cell spans two bands of the ripple; these are the two it holds. The
    // middle of the sheet (cx, cy) and each band's inner and outer radius
    // (ia/oa, ib/ob, in cell percent) are worked out once per cell.
    const band = (k, d, h, i, o) => {
      const dv = `--${d}: ${once(`abs(@dx) + abs(@dy) - 1 + ${k}`)};`;
      const hv = `--${h}: ${once(`0.1 + 0.32 * (0.5 + 0.5 * cos(PI * ${d} / ${RC} * 1.5))`, 4)};`;
      const rv = `--${o}: ${once(`100 * max(0, ${d} + ${h})`)}; --${i}: ${once(`100 * max(0, ${d} - ${h})`)};`;
      return `${dv} ${hv} ${rv}`;
    };
    const pt = (dx, dy) => `$(cx + ${dx})% $(cy + ${dy})%`;
    const ring = (i, o) =>
      `polygon(${[
        [o, 0], [0, o], [`0 - ${o}`, 0], [0, `0 - ${o}`], [o, 0],
        [i, 0], [0, `0 - ${i}`], [`0 - ${i}`, 0], [0, i], [i, 0],
      ]
        .map(([x, y]) => pt(x, y))
        .join(', ')})`;
    // The two rings are kept on the cell, so the prefixed and plain clip of
    // each pseudo read one polygon with @var instead of each working it out.
    const vars = `--cx: $(50 - 100 * @dx); --cy: $(50 - 100 * @dy); ${band(0.5, 'da', 'ha', 'ia', 'oa')} ${band(1.5, 'db', 'hb', 'ib', 'ob')} --ra: ${ring('ia', 'oa')}; --rb: ${ring('ib', 'ob')};`;
    return {
      rule: `--a: ${ink(c)}; ${vars} ${F} { ${B(`inset: 0; background: @var(--a); ${cp('@var(--ra)')}`)} ${A(`inset: 0; background: ${ink(c)}; ${cp('@var(--rb)')}`)} }${TR}`,
    };
  },
  { pal: 13, inks: 3, grid: '6x9', tg: '8x8', meta: { tags: ['diamonds', 'concentric', 'stripes'], mood: ['bold', 'festive'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

add(
  'Vanishing Point',
  'Square towers seen from straight above, their tops leaning out from the middle of the sheet and their walls lit from one side.',
  (c) => {
    const f = 21;
    const kx = `max(-26, min(26, 24 * @dx / ${RC}))`;
    const ky = `max(-26, min(26, 24 * @dy / ${RC}))`;
    const X0 = `(50 - ${f} + ${kx})`;
    const X1 = `(50 + ${f} + ${kx})`;
    const Y0 = `(50 - ${f} + ${ky})`;
    const Y1 = `(50 + ${f} + ${ky})`;
    const [x0, x1, y0, y1] = [X0, X1, Y0, Y1].map(K);
    // The outer corners are pushed 6% further out along each miter, so the
    // cell's own edge (not the clip) cuts the walls where cells meet.
    const out = (c, i) => K(`${c} + 0.06 * (${c} - ${i})`);
    const tl = `${out(0, X0)}% ${out(0, Y0)}%`;
    const tr = `${out(100, X1)}% ${out(0, Y0)}%`;
    const bl = `${out(0, X0)}% ${out(100, Y1)}%`;
    const br = `${out(100, X1)}% ${out(100, Y1)}%`;
    return {
      rule: `${F} { background: ${ink(c, 3)}; ${B(`inset: 0; background: var(--color1); ${cp(`polygon(${tl}, ${tr}, ${x1}% ${y0}%, ${x0}% ${y0}%, ${x0}% ${y1}%, ${bl})`)}`)} ${A(
        `inset: 0; background: var(--color2); ${cp(`polygon(${br}, ${bl}, ${x0}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y0}%, ${tr})`)}`
      )} }${TR}`,
    };
  },
  { palette: ['#EDE6D6', '#E3B04B', '#7A3B2E', '#2B6F77', '#1F3A5F', '#C8553D'], grid: '4x6', tg: '6x6', meta: { tags: ['squares', 'blocks', 'grid'], mood: ['bold', 'retro'], density: 'dense', goodFor: ['poster', 'packaging'] } }
);

// Curved rays: each arm leaves the center and sweeps round as it goes out.
const whirlFan = (arms, duty, twist) => {
  const pts = [];
  const step = 360 / arms;
  const rs = [];
  for (let r = 0; r <= 76; r += r < 10 ? 2 : 4) rs.push(r);
  for (let j = 0; j < arms; j++) {
    const a0 = j * step;
    const a1 = a0 + duty * step;
    pts.push([50, 50]);
    for (const r of rs) pts.push(P(a0 + twist * r, r));
    for (const r of [...rs].reverse()) pts.push(P(a1 + twist * r, r));
  }
  return polyStr(pts);
};
add(
  'Undertow',
  'Curved rays wound tight round a point a little off the middle, sweeping out to the edges in one long swirl.',
  (c) => ({
    host: `--fig: ${whirlFan(18, 0.5, 4.2)};`,
    rule: `${F} { overflow: hidden; ${B(`${bigBox(0.42, 0.45, '(1.3 * max(@X, @Y))')} background: ${ink(c)}; ${cp('@var(--fig)')}`)} }${TR}`,
  }),
  { pal: 44, inks: 4, grid: '6x9', tg: '8x8', meta: { tags: ['spirals', 'radial', 'curves'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

// Two Archimedean bands, the second the first turned half round.
const spiralBand = (turns, half) => {
  const outer = [];
  const inner = [];
  const b = 74 / (360 * turns);
  let th = 0;
  while (th <= 360 * turns + 1e-6) {
    const r = b * th;
    outer.push(P(th, r + half));
    inner.push(P(th, Math.max(0, r - half)));
    th += Math.max(3, Math.min(14, 360 / Math.max(r, 1)));
  }
  return polyStr([...outer, ...inner.reverse()]);
};
add(
  'Twin Spiral',
  'Two bands coiling out from the middle of the sheet, one in warm inks and one in cool, each wound inside the other.',
  () => ({
    host: `--fig: ${spiralBand(4, 74 / 4 / 2 / 2 * 0.62)};`,
    rule: `--a: ${pick(1, 5)}; ${F} { overflow: hidden; ${B(`${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: @var(--a); ${cp('@var(--fig)')}`)} ${A(
      `${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: ${pick(2, 4)}; ${cp('@var(--fig)')} transform: rotate(180deg);`
    )} }${TR}`,
  }),
  { pal: 21, grid: '6x9', tg: '8x8', meta: { tags: ['spirals', 'curves'], mood: ['playful'], density: 'medium', goodFor: ['poster', 'og-image'] } }
);

// Square frames shrinking toward the middle, each turned 7 degrees past the last.
const squareRings = (parity) => {
  const pts = [[50, 50]];
  let r = 1.6;
  let k = 0;
  while (r < 80) {
    const rn = r * 1.28;
    if (k % 2 === parity) {
      const rot = 45 + k * 7;
      const ro = (r + (rn - r) * 0.62) * Math.SQRT2;
      const ri = r * Math.SQRT2;
      const outer = [0, 90, 180, 270, 360].map((d) => P(rot + d, ro));
      const inner = [360, 270, 180, 90, 0].map((d) => P(rot + d, ri));
      pts.push(...outer, ...inner, [50, 50]);
    }
    r = rn;
    k++;
  }
  return polyStr(pts);
};
add(
  'Square Tunnel',
  'Square frames shrinking toward the middle of the sheet, each turned a little further than the last, so the tunnel twists as it recedes.',
  () => ({
    host: `--ra: ${squareRings(0)}; --rb: ${squareRings(1)};`,
    rule: `--a: ${pick(1, 3)}; ${F} { overflow: hidden; ${B(`${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: @var(--a); ${cp('@var(--ra)')}`)} ${A(
      `${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: ${pick(2, 4)}; ${cp('@var(--rb)')}`
    )} }${TR}`,
  }),
  { pal: 10, inks: 4, grid: '6x9', tg: '8x8', meta: { tags: ['squares', 'concentric', 'spirals'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

// Zigzag rings: each band a zigzag of constant width, its teeth stepped round ring by ring.
const zigRings = (rings, teeth, amp, width, stepRot) => {
  const pts = [[50, 50]];
  const step = 360 / teeth;
  const edge = (R, rot) => {
    const out = [];
    for (let j = 0; j <= teeth * 2; j++) out.push(P(rot + (j * step) / 2, R + (j % 2 ? amp : -amp)));
    return out;
  };
  for (let k = 0; k < rings; k++) {
    const r0 = 5 + k * width * 2;
    const rot = k * stepRot;
    pts.push(...edge(r0 + width, rot), ...edge(r0, rot).reverse(), [50, 50]);
  }
  return polyStr(pts);
};
add(
  'Blaze',
  'Concentric zigzag bands with their teeth stepped round a little at every ring, so the circles seem to spin.',
  () => ({
    host: `--fig: ${zigRings(7, 20, 2.6, 5.2, 4.5)};`,
    rule: `${F} { overflow: hidden; ${B(`${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: ${pick(1, 1, 2)}; ${cp('@var(--fig)')}`)} }${TR}`,
  }),
  { palette: ['#F4F1EA', '#161616', '#5B2A86'], grid: '6x9', tg: '8x8', meta: { tags: ['zigzags', 'concentric', 'radial'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

add(
  'Globe',
  'Dots squashed into ellipses toward the rim of a great sphere in the middle of the sheet, with small dots scattered round it.',
  (c) => {
    const q = `min(1, ${fr})`;
    const sc = K(`sqrt(max(0.08, 1 - ${q} * ${q}))`);
    const inside = `(${fr} < 1)`;
    const d = K(`${inside} * 84 + (1 - ${inside}) * 22`);
    return {
      rule: `${F} { ${A(
        `left: 50%; top: 50%; width: ${d}%; height: ${d}%; margin: ${K(`0 - ${d} / 2`)}% 0 0 ${K(`0 - ${d} / 2`)}%; border-radius: 50%; background: ${ink(c)}; transform: rotate(${K(BEARING)}deg) scaleX(${sc});`
      )} }${TR}`,
    };
  },
  { pal: 43, inks: 3, grid: '8x12', tg: '10x10', meta: { tags: ['dots', 'ovals', 'circles'], mood: ['calm', 'technical'], density: 'medium', goodFor: ['poster', 'hero-background'] } }
);

// -- 4. classic illusions ----------------------------------------------------

add(
  'Cafe Wall',
  'Rows of dark tiles divided by thin mortar lines, each row stepped half a tile along, so the level courses seem to wedge apart.',
  () => {
    const s = '(25 * (2 - abs(((@y - 1) % 4) - 2)))';
    const a = K(`max(0, ${s} - 50)`);
    const b = K(s);
    const cc = K(`min(100, ${s} + 50)`);
    return {
      rule: `${F} { ${B(`inset: 0; background: ${pick(2, 2, 3)}; ${mskI(
        `linear-gradient(90deg, #000 0 ${a}%, transparent ${a}% ${b}%, #000 ${b}% ${cc}%, transparent ${cc}% 100%)`,
        'linear-gradient(180deg, transparent 0 6%, #000 6%)'
      )}`)} ${A(`inset: 0; background: var(--color1); ${msk('linear-gradient(180deg, #000 0 6%, transparent 6%)')}`)} }${TR}`,
    };
  },
  { palette: ['#F3F0E8', '#9C9A92', '#1E1E24', '#2A3550'], grid: '8x12', tg: '6x6', meta: { tags: ['blocks', 'lines', 'checkerboard'], mood: ['technical'], density: 'medium', goodFor: ['wallpaper', 'textile'] } }
);

add(
  'Zollner',
  'Long upright rules crossed by short slanting hatches that lean one way and then the other, so the parallels seem to splay.',
  () => ({
    rule: `@x(odd) { --sk: 40deg; } @x(even) { --sk: -40deg; } ${F} { ${B(`inset: 0; background: ${pick(1, 1, 2)}; ${msk('linear-gradient(90deg, transparent 0 45%, #000 45% 55%, transparent 55%)')}`)} ${A(
      `inset: 0 20%; background: @lp(); ${msk(stripeL('180deg', 8, 25))} transform: skewY(@var(--sk));`
    )} }${TR}`,
  }),
  { palette: ['#EFE6D2', '#203A43', '#8A3324'], grid: '8x12', tg: '8x8', meta: { tags: ['lines', 'diagonals', 'stripes'], mood: ['technical'], density: 'medium', goodFor: ['wallpaper', 'textile'] } }
);

// Horizontal stripes carried on a sine across the sheet: each column skewed
// to the slope of the wave over that column and lifted to its mean, so the
// stripes meet the next column's.
const waveD = (t) => `(0.42 * sin(2 * PI * 1.5 * (${t})) * (0.35 + 0.65 * sin(PI * (${t}))))`;
add(
  'Zebra Wave',
  'Fine horizontal stripes rippling across the sheet in long swells that grow toward the middle.',
  () => {
    const d0 = waveD('(@x - 1) / @X');
    const d1 = waveD('@x / @X');
    return {
      rule: `${F} { overflow: hidden; ${B(
        `left: 0; width: 100%; top: ${K(`-100 + 100 * (${d0} + ${d1}) / 2`)}%; height: 300%; background: ${pick(1, 1, 2)}; ${msk(stripeL('180deg', 4.1667, 8.3333))} transform: skewY(${K(`atan((${d1}) - (${d0})) * 180 / PI`)}deg);`
      )} }${TR}`,
    };
  },
  { palette: ['#F8ECE0', '#6E1E1A', '#9C2C22'], grid: '6x9', tg: '6x6', meta: { tags: ['stripes', 'waves', 'lines'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'textile'] } }
);

// A wheel of stepped wedges: black, dark (the cell's own ink), the ground
// (cut away by the cell's clip) and gold, six times round.
const wheelSpans = (from) => [0, 1, 2, 3, 4, 5].map((j) => [from + j * 60, from + j * 60 + 15]);
add(
  'Snake Wheels',
  'Wheels of stepped wedges, black to blue to pale to gold, turning the opposite way in neighboring cells.',
  () => ({
    host: `--rim: ${polyStr(fanPts([0, 1, 2, 3, 4, 5].map((j) => [j * 60 - 15, j * 60 + 30]), 80, 2))}; --wk: ${polyStr(fanPts(wheelSpans(0)))}; --wy: ${polyStr(fanPts(wheelSpans(-15)))};`,
    rule: `--turn: @r(60)deg; ${F} { border-radius: 50%; background: ${pick(2, 2, 4)}; ${cp('@var(--rim)')} transform: scaleX(${K('1 - 2 * ((@x + @y) % 2)')}) rotate(@var(--turn)) scale(0.92); ${B(
      `inset: 0; border-radius: 50%; background: var(--color1); ${cp('@var(--wk)')}`
    )} ${A(`inset: 0; border-radius: 50%; background: var(--color3); ${cp('@var(--wy)')}`)} }${TR}`,
  }),
  { palette: ['#F4EEDC', '#16161C', '#2D57A3', '#E9B93A', '#1F6E6A'], grid: '4x6', tg: '5x5', meta: { tags: ['circles', 'radial', 'triangles'], mood: ['bold', 'playful'], density: 'dense', goodFor: ['poster', 'packaging'] } }
);

add(
  'Scintillate',
  'Gray grid lines on a dark ground with a pale dot at every crossing, the dots swelling a little toward the middle.',
  () => {
    const d = K(`8 + 5 * (1 - min(1, ${fr}))`);
    return {
      rule: `${F} { ${B(`inset: 0; background: var(--color1); ${msk(
        'linear-gradient(90deg, transparent 0 45%, #000 45% 55%, transparent 55%)',
        'linear-gradient(180deg, transparent 0 45%, #000 45% 55%, transparent 55%)'
      )}`)} ${A(`inset: 0; background: ${pick(2, 2, 3)}; ${msk(dotL(d))}`)} }${TR}`,
    };
  },
  { palette: ['#141414', '#7A7A7A', '#FFFFFF', '#F2D98D'], grid: '8x12', tg: '8x8', meta: { tags: ['grid', 'dots', 'lines'], mood: ['technical'], density: 'sparse', goodFor: ['wallpaper', 'hero-background'] } }
);

// Rays from the bottom-left corner crossed with rings from the same corner:
// one ink takes the rays on the rings, the other the gaps between.
add(
  'Polar Fan',
  'Rays and rings thrown out from one corner of the sheet, crossed into a checkerboard that widens as it fans away.',
  () => {
    const spans = (ph) => Array.from({ length: 40 }, (_, j) => [ph + j * 9, ph + j * 9 + 4.5]);
    const box = bigBox(0, 1, '(2 * max(@X, @Y))');
    const rings = (inv) =>
      `repeating-radial-gradient(circle at 50% 50%, ${inv ? 'transparent 0 2.5%, #000 2.5% 5%' : '#000 0 2.5%, transparent 2.5% 5%'})`;
    return {
      host: `--fa: ${polyStr(fanPts(spans(0)))}; --fb: ${polyStr(fanPts(spans(4.5)))};`,
      rule: `${F} { overflow: hidden; ${B(`${box} background: ${pick(1, 1, 3)}; ${cp('@var(--fa)')} ${msk(rings(false))}`)} ${A(
        `${box} background: @lp(); ${cp('@var(--fb)')} ${msk(rings(true))}`
      )} }${TR}`,
    };
  },
  { pal: 7, inks: 3, grid: '6x9', tg: '8x8', meta: { tags: ['radial', 'checkerboard', 'arcs'], mood: ['bold'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

// Each column a ribbon turning about its own length: the edges run straight
// from cell edge to cell edge (a bowtie where it turns edge-on), and a mask
// split at the crossing gives the face one ink and the back another.
add(
  'Ribbon Twist',
  'Upright ribbons twisting about their own length down the sheet, flashing a warm face and a cool back as they turn.',
  () => {
    // Per cell: the ribbon's half-width at the top and bottom edges (wa, wb,
    // negative once it has turned past edge-on), the same run on 2% past the
    // cell (ea, eb) and where it crosses edge-on (tc), each worked out once.
    const w = (yy) => once(`42 * cos(2 * PI * (1.6 * (${yy}) / @Y + 0.21 * @x))`, 3);
    const vars = `--wa: ${w('@y - 1')}; --wb: ${w('@y')}; --ea: ${once('wa - (wb - wa) * 0.02')}; --eb: ${once('wb + (wb - wa) * 0.02')}; --tc: ${once('max(0, min(100, 100 * wa / (wa - wb + 0.0001)))')};`;
    // The edges run on 2% past the cell so the clip never lands on the
    // cell's own edge, where the browser would leave a seam between rows.
    const bow = 'polygon($(50 - ea)% -2%, $(50 + ea)% -2%, $(50 + eb)% 102%, $(50 - eb)% 102%)';
    const face = (cmp) =>
      `linear-gradient(180deg, @match($(wa) ${cmp} 0, #000, transparent) 0 $(tc)%, @match($(wb) ${cmp} 0, #000, transparent) $(tc)% 100%)`;
    // The bow and the two faces are kept on the cell and read with @var, so
    // the prefixed and plain clip and mask share one evaluation.
    const shapes = `--bow: ${bow}; --fa: ${face('>')}; --fb: ${face('<')};`;
    return {
      rule: `--a: ${pick(1, 2)}; ${vars} ${shapes} ${F} { ${B(`inset: 0; background: @var(--a); ${cp('@var(--bow)')} ${msk('@var(--fa)')}`)} ${A(
        `inset: 0; background: ${pick(3, 4)}; ${cp('@var(--bow)')} ${msk('@var(--fb)')}`
      )} }${TR}`,
    };
  },
  { palette: ['#FBF6EC', '#E4572E', '#F3A712', '#29335C', '#2E86AB'], grid: '8x12', tg: '8x8', meta: { tags: ['curves', 'stripes', 'diamonds'], mood: ['playful'], density: 'medium', goodFor: ['poster', 'packaging'] } }
);

add(
  'Spotlit',
  'Balls in rows on a dark ground, each lit on the side that faces a lamp hung over the middle of the sheet.',
  (c) => {
    const hx = K(`50 - 30 * @dx / (sqrt(@dx * @dx + @dy * @dy) + 0.6)`);
    const hy = K(`50 - 30 * @dy / (sqrt(@dx * @dx + @dy * @dy) + 0.6)`);
    return {
      rule: `${F} { ${B(`inset: 8%; border-radius: 50%; background: ${ink(c)}; ${msk(`radial-gradient(circle farthest-corner at ${hx}% ${hy}%, #000 0, #000000f0 18%, #00000026 82%)`)}`)} }${TR}`,
    };
  },
  { pal: 18, inks: 4, grid: '8x12', tg: '8x8', meta: { tags: ['circles', 'gradients', 'dots'], mood: ['calm'], density: 'medium', goodFor: ['wallpaper', 'card-texture'] } }
);

// Necker cubes drawn as one polygon each (front frame and the four edges
// back; the back frame on the other pseudo), flipped so the far face points
// to the middle of the sheet.
const cubeOutline = (t) => {
  const H = [50, 50];
  const frame = (x0, y0, x1, y1) => [
    H, [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0],
    [x0 + t, y0 + t], [x0 + t, y1 - t], [x1 - t, y1 - t], [x1 - t, y0 + t], [x0 + t, y0 + t], [x0, y0], H,
  ];
  const fr0 = [12, 38, 62, 88];
  const bk0 = [38, 12, 88, 62];
  const p = t / 2 / Math.SQRT2;
  const bar = ([fx, fy], [bx, by]) => [H, [fx + p, fy + p], [bx + p, by + p], [bx - p, by - p], [fx - p, fy - p], [fx + p, fy + p], H];
  const fc = [[fr0[0], fr0[1]], [fr0[2], fr0[1]], [fr0[2], fr0[3]], [fr0[0], fr0[3]]];
  const bc = [[bk0[0], bk0[1]], [bk0[2], bk0[1]], [bk0[2], bk0[3]], [bk0[0], bk0[3]]];
  return {
    front: polyStr([...frame(...fr0), ...fc.flatMap((f, i) => bar(f, bc[i]))]),
    back: polyStr(frame(...bk0)),
  };
};
add(
  'Wire Cubes',
  'Wireframe cubes, one to a cell, each turned so its far face points toward the middle of the sheet.',
  () => {
    const { front, back } = cubeOutline(5.5);
    const sx = K('1 - 2 * (@dx > 0)');
    const sy = K('2 * (@dy >= 0) - 1');
    return {
      host: `--cf: ${front}; --cb: ${back};`,
      rule: `${F} { transform: scale(${sx}, ${sy}); ${B(`inset: 0; background: ${pick(1, 1, 2)}; ${cp('@var(--cf)')}`)} ${A(`inset: 0; background: var(--color3); ${cp('@var(--cb)')}`)} }${TR}`,
    };
  },
  { palette: ['#F3EEE3', '#1D2A44', '#2F5D62', '#C8553D'], grid: '6x9', tg: '6x6', meta: { tags: ['squares', 'lines', 'grid'], mood: ['technical'], density: 'medium', goodFor: ['wallpaper', 'card-texture'] } }
);

// -- 5. depth, phantoms and mirrors ----------------------------------------

// Three nested squares per cell, the inner two shifted along a direction that
// sweeps round as it crosses the sheet, so each cell looks down its own tube.
add(
  'Sightline',
  'Nested squares whose inner frames slide off-center, each cell looking down a tube that swings round as it crosses the sheet.',
  () => {
    const phi = '(2 * PI * (0.8 * (@x - 0.5) / @X + 0.55 * (@y - 0.5) / @Y))';
    const sq = (half, off) => {
      const cx = `(50 + ${off} * cos(${phi}))`;
      const cy = `(50 + ${off} * sin(${phi}))`;
      return cp(`inset(${K(`${cy} - ${half}`)}% ${K(`100 - ${cx} - ${half}`)}% ${K(`100 - ${cy} - ${half}`)}% ${K(`${cx} - ${half}`)}%)`);
    };
    return {
      rule: `${F} { background: ${pick(1, 2)}; ${cp('inset(5%)')} ${B(`inset: 0; background: var(--color3); ${sq(29, 15)}`)} ${A(`inset: 0; background: var(--color4); ${sq(13, 29)}`)} }${TR}`,
    };
  },
  { palette: ['#F1ECE2', '#E8B04B', '#E09A6B', '#B5533C', '#3B2A3F'], grid: '6x9', tg: '6x6', meta: { tags: ['squares', 'concentric', 'blocks'], mood: ['retro', 'bold'], density: 'dense', goodFor: ['poster', 'packaging'] } }
);

// Pac-man discs whose missing quarters face the middle of their 2x2 block,
// so a square that is not drawn shows up between every four of them.
add(
  'Phantom Squares',
  'Discs with a quarter bitten out, the bites of each four facing one another so pale squares that are never drawn appear between them.',
  () => {
    const right = '(@x % 2)';
    const down = '(@y % 2)';
    const from = K(`${right} * ${down} * 90 + (1 - ${right}) * ${down} * 180 + (1 - ${right}) * (1 - ${down}) * 270`);
    const r = K(`33 + 9 * (1 - min(1, ${fr}))`);
    return {
      rule: `${F} { ${B(`inset: 0; background: ${pick(1, 1, 2)}; ${mskI(dotL(r), `conic-gradient(from ${from}deg at 50% 50%, transparent 0 90deg, #000 90deg 360deg)`)}`)} }${TR}`,
    };
  },
  { palette: ['#EEF1F4', '#14213D', '#2F3E6E'], grid: '8x12', tg: '8x8', meta: { tags: ['circles', 'quarter-circles', 'grid'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['poster', 'wallpaper'] } }
);

// A lattice of diagonal rules, black except near every crossing, where a
// short run is drawn in color; the color seems to spread into a glowing disc.
add(
  'Neon Spread',
  'A diagonal lattice of fine black rules colored only where they cross, so soft discs of color seem to glow at every crossing.',
  () => {
    const r = K(`20 + 9 * (1 - min(1, ${fr}))`);
    // The two bars run on past the corners, so the cell's own edge (not the
    // clip) cuts them and the rules join their neighbors without a seam.
    const X = cp('polygon(-9% -3%, -3% -9%, 50% 44%, 103% -9%, 109% -3%, 56% 50%, 109% 103%, 103% 109%, 50% 56%, -3% 109%, -9% 103%, 44% 50%)');
    return {
      rule: `${F} { ${B(`inset: 0; background: var(--color1); ${X} ${msk(`radial-gradient(ellipse ${r}% ${r}% at 50% 50%, transparent 0 100%, #000 100%)`)}`)} ${A(
        `inset: 0; background: ${pick(2, 3, 4)}; ${X} ${msk(dotL(r))}`
      )} }${TR}`,
    };
  },
  { palette: ['#F7F5EF', '#17171C', '#E4004B', '#0077B6', '#2BA84A'], grid: '8x12', tg: '8x8', meta: { tags: ['lattice', 'diagonals', 'lines'], mood: ['technical', 'calm'], density: 'sparse', goodFor: ['wallpaper', 'hero-background'] } }
);

// Fraser cords. Each ring is cut into short segments by slanted cuts; one
// pseudo-element takes the even segments and the other the odd. A parity's
// segments are traced as one crenellated loop round the ring (in through a
// cut, along the outer arc, out through the next cut, along the inner arc to
// the next segment of the parity), then the inner circle backwards, which
// cancels the inner arcs and the disc inside. Every ring starts and ends at
// bearing 0 on its inner edge, so the rings are joined along one ray only.
const cordRings = (parity, { h = 3.4, gap = 6, first = 5, seg = 6, tilt = 30 } = {}) => {
  const pts = [];
  const starts = [];
  for (let R = first; R - h / 2 < 74; R += gap) {
    const n = 2 * Math.max(4, Math.round((2 * Math.PI * R) / seg / 2));
    const dth = 360 / n;
    const del = ((h / 2) * Math.tan((tilt * Math.PI) / 180) / R) * (180 / Math.PI);
    // Segment j runs from cut j to cut j + 1; cut j leaves the inner edge at
    // bearing j * dth and meets the outer edge at j * dth + 2 * del.
    const inner = (j) => P(j * dth, R - h / 2);
    const outer = (j) => P(j * dth + 2 * del, R + h / 2);
    const ring = [inner(0)];
    for (let j = parity; j < n; j += 2) ring.push(inner(j), outer(j), outer(j + 1), inner(j + 1));
    for (let j = n; j >= 0; j--) ring.push(inner(j));
    starts.push(inner(0));
    pts.push(...ring);
  }
  // The way back down the bridge ray.
  pts.push(...starts.reverse());
  return polyStr(pts);
};
add(
  'Twisted Cord',
  'Rings of short slanting segments, dark and light by turns, so the plain circles seem to wind inward like a spiral.',
  () => ({
    host: `--ca: ${cordRings(0)}; --cb: ${cordRings(1)};`,
    rule: `--a: ${pick(1, 2)}; ${F} { overflow: hidden; ${B(`${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: @var(--a); ${cp('@var(--ca)')}`)} ${A(
      `${bigBox(0.5, 0.5, '(max(@X, @Y))')} background: ${pick(3, 4)}; ${cp('@var(--cb)')}`
    )} }${TR}`,
  }),
  { palette: ['#8E9A86', '#141418', '#26243A', '#F8F4EA', '#EEE0BC'], grid: '6x9', tg: '8x8', meta: { tags: ['rings', 'concentric', 'spirals'], mood: ['technical', 'calm'], density: 'dense', goodFor: ['poster', 'og-image'] } }
);

// A figure picked by a hash of |dx| and |dy|, then
// mirrored by the signs of dx and dy, so the sheet folds about its middle.
add(
  'Kaleidoscope',
  'Quarter discs and small squares, chosen cell by cell and mirrored about both middle lines, so the sheet reads as one big kaleidoscope.',
  () => {
    const u = 'abs(@dx)';
    const v = 'abs(@dy)';
    const hash = (a, b, m) => `((sin(${u} * ${a} + ${v} * ${b} + 0.7) * ${m}) - floor(sin(${u} * ${a} + ${v} * ${b} + 0.7) * ${m}))`;
    const h1 = hash(12.9898, 78.233, 43758.5453);
    const h2 = hash(39.346, 11.135, 24634.6345);
    const sx = K('2 * (@dx >= 0) - 1');
    const sy = K('2 * (@dy >= 0) - 1');
    return {
      rule: `--a: ${pick(1, 2)}; ${F} { transform: scale(${sx}, ${sy}); ${B(`inset: 0; border-radius: 100% 0 0 0; background: @var(--a); transform: rotate(${K(`90 * floor(${h1} * 4)`)}deg);`)} ${A(
        `inset: 25%; border-radius: ${K(`50 * (${h2} > 0.5)`)}%; background: ${pick(3, 4)}; transform: rotate(${K(`45 * floor(${h2} * 4)`)}deg);`
      )} }${TR}`,
    };
  },
  { palette: ['#FBF4E6', '#1D3557', '#264F7A', '#E63946', '#F1A208'], grid: '6x9', tg: '6x6', meta: { tags: ['quarter-circles', 'squares', 'radial'], mood: ['festive', 'bold'], density: 'medium', goodFor: ['poster'] } }
);

export const sectionC = { title: 'C. Illusion', all };
