// K. Press - print, signal and data: screens, dithers, barcodes, flags, gauges and charts.
//
// The marks of presses, screens, codes, signage and instruments, turned into
// repeats. Nothing here is text or a code that could be read: the dots,
// dashes, bars and holes are rolled at random.
//
// Several designs join across cells. A value that must agree between two
// cells is worked out from the sheet column with a phase rolled once per
// drawing (css-doodle's @once, kept on the cell as `--s` or `--p0`..), so a
// stream, a ticket or a block of four keeps its shape and color across the
// join and still changes on a reseed. Long curves (Lissajous figures, rose
// engine rosettes, ECG beats) are polygons computed here and set once on the
// host; `stroke` turns a polyline into the band that draws it.
//
//   printing           Ordered Dither, Ben Day, Register Mark, Imposition,
//                      Swatch Book, Rose Engine, Printers Flower, Contact Sheet
//   paper and forms    Philately, Raffle, Paper Tape
//   codes and boards   Dit Dah, Four State, Split Flap
//   signal and signage Signal Flags, Hazard
//   instruments        Manometer, Radar Sweep, Lissajous, Cardiograph, Equalizer
//   charts             Bar Chart, Pie Chart, Streamgraph, Candlestick
import { section, F, TR, ink, cp, msk, mskI, B, A, noise } from './shared.mjs';

const { add, all } = section('K. Press');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const pct = (n) => `${+n.toFixed(2)}%`;
/** A number worked out per cell, rounded to two places to keep the CSS short. */
const q = (expr) => `$(round((${expr}) * 100) / 100)`;
const P = (pts) => `polygon(${pts.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(', ')})`;

/** One ink chosen by an index expression (0-based) over color s..s+n-1. */
const inkAt = (expr, n, s = 1) => {
  const parts = [];
  for (let i = 0; i < n - 1; i++) parts.push(`${expr} == ${i}, @p(var(--color${s + i}))`);
  parts.push(`@p(var(--color${s + n - 1}))`);
  return `@match(${parts.join(', ')})`;
};


/**
 * A polyline (or closed curve) drawn as a band `w` wide, returned as one
 * polygon: the left offset forward, then the right offset back. Joins are
 * mitered, and beveled on the outside of a turn too sharp to miter. A closed
 * band crosses itself where the curve does; every stretch of band winds the
 * same way, so the crossings fill under the default nonzero rule.
 */
const stroke = (pts, w, closed = false) => {
  const n = pts.length;
  const h = w / 2;
  const seg = (i) => {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % n];
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    return [(y0 - y1) / len, (x1 - x0) / len]; // left normal, y down
  };
  const left = [];
  const right = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const hasPrev = closed || i > 0;
    const hasNext = closed || i < n - 1;
    const nPrev = hasPrev ? seg((i - 1 + n) % n) : null;
    const nNext = hasNext ? seg(i) : null;
    if (!nPrev || !nNext) {
      const m = nPrev || nNext;
      left.push([p[0] + m[0] * h, p[1] + m[1] * h]);
      right.push([p[0] - m[0] * h, p[1] - m[1] * h]);
      continue;
    }
    let mx = nPrev[0] + nNext[0];
    let my = nPrev[1] + nNext[1];
    const ml = Math.hypot(mx, my) || 1;
    mx /= ml;
    my /= ml;
    const cos = mx * nPrev[0] + my * nPrev[1];
    const len = h / Math.max(cos, 0.05);
    // which side is the outside of the turn: the left when it turns right
    const turn = nPrev[0] * nNext[1] - nPrev[1] * nNext[0];
    if (len > h * 2.2) {
      const outerLeft = turn < 0;
      const miter = (sgn) => [p[0] + sgn * mx * len, p[1] + sgn * my * len];
      const bevel = (sgn) => [
        [p[0] + sgn * nPrev[0] * h, p[1] + sgn * nPrev[1] * h],
        [p[0] + sgn * nNext[0] * h, p[1] + sgn * nNext[1] * h],
      ];
      if (outerLeft) {
        left.push(...bevel(1));
        right.push(miter(-1));
      } else {
        left.push(miter(1));
        right.push(...bevel(-1).reverse());
      }
    } else {
      left.push([p[0] + mx * len, p[1] + my * len]);
      right.push([p[0] - mx * len, p[1] - my * len]);
    }
  }
  if (closed) return [...left, left[0], right[0], ...right.slice(1).reverse(), right[0]];
  return [...left, ...right.reverse()];
};
/** Points of a closed parametric curve, t over [0, turns * 2pi). */
const curve = (fn, n, turns = 1) =>
  Array.from({ length: n }, (_, i) => fn((i / n) * Math.PI * 2 * turns));
/** A pseudo-random 0-1 per block of cells, rolled afresh with the seed. */
const blockHash = (bx, by) => `(abs(sin(${bx} * 12.9898 + ${by} * 78.233 + s) * 43758.5453) % 1)`;

// -- K1 Ordered Dither ------------------------------------------------------------
// The 4x4 Bayer matrix: a level L (1-16) lights the pixels whose threshold is
// below L. Each level is a fixed mask, so the seventeen of them are set once
// on the host and a cell names the one its tone calls for.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const ditherMask = (L) => {
  if (L >= 16) return 'linear-gradient(#000, #000)';
  const H = 27.4; // rows overlap, so no seam opens between them
  const layers = [];
  BAYER.forEach((row, j) => {
    if (!row.some((v) => v < L)) return;
    const stops = row
      .map((v, i) => `${v < L ? '#000' : 'transparent'} ${i * 25}% ${(i + 1) * 25}%`)
      .join(', ');
    const top = Math.min(100 - H, Math.max(0, j * 25 - 1.2));
    layers.push(`linear-gradient(90deg, ${stops}) 0 ${pct((top / (100 - H)) * 100)} / 100% ${H}% no-repeat`);
  });
  return layers.join(', ');
};
const DITHER_HOST = Array.from({ length: 15 }, (_, i) => `--d${i + 1}: ${ditherMask(i + 1)};`).join(' ');
const DITHER_PICK = `@match(${Array.from({ length: 14 }, (_, i) => `$(t) < ${i + 2}, @var(--d${i + 1})`).join(', ')}, @var(--d15))`;

add(
  'Ordered Dither',
  'Clouds of tone printed in one bit: every cell a four by four block of square pixels lit in Bayer order, from a single dot to nearly solid, in two inks that meet in broad patches.',
  (c) => ({
    host: DITHER_HOST,
    rule: `${F} { --t: ${noise(-12, 29, 2)}; --u: ${noise(-0.6, 1.6, 1.1)}; background: @match($(u) < 0.5, @p(var(--color1)), @p(var(--color2))); ${msk(DITHER_PICK)} }${TR}`,
  }),
  {
    palette: ['#E8E4D4', '#23305C', '#C2412D'],
    grid: '10x15',
    tg: '10x10',
    meta: { tags: ['squares', 'halftone', 'checkerboard', 'grid'], mood: ['technical', 'retro'], density: 'medium', goodFor: ['card-texture', 'wallpaper', 'poster'] },
  }
);

// -- K2 Ben Day -------------------------------------------------------------------
// Comic panels: each panel filled with a screen of dots on a diagonal lattice
// (two square grids, one shifted half a pitch), a line screen or flat color,
// with a black frame drawn as four edge bands.
const dotScreen = (r) =>
  `radial-gradient(circle closest-side, #000 ${r}, transparent ${r}) 0 0 / 12.5% 12.5%, radial-gradient(circle closest-side, #000 ${r}, transparent ${r}) 7.1429% 7.1429% / 12.5% 12.5%`;
const SCREENS = [
  dotScreen('42%'),
  dotScreen('60%'),
  dotScreen('78%'),
  'repeating-linear-gradient(180deg, #000 0 3.4%, transparent 3.4% 8.33%)',
  'linear-gradient(#000, #000)',
];
const FRAME = [
  'linear-gradient(#000, #000) 0 0 / 100% 5% no-repeat',
  'linear-gradient(#000, #000) 0 100% / 100% 5% no-repeat',
  'linear-gradient(#000, #000) 0 0 / 5% 100% no-repeat',
  'linear-gradient(#000, #000) 100% 0 / 5% 100% no-repeat',
].join(', ');

add(
  'Ben Day',
  'A comic page of square panels in heavy black frames, each panel filled with a Ben-Day dot screen of small, medium or large dots, a line screen or flat color.',
  (c) => ({
    host: `${SCREENS.map((m, i) => `--sc${i}: ${m};`).join(' ')} --frame: ${FRAME};`,
    rule: `${F} { ${B(`inset: 6%; background: ${ink(c, 2)}; ${msk(`@p(@var(--sc0), @var(--sc1), @var(--sc1), @var(--sc2), @var(--sc2), @var(--sc3), @var(--sc4))`)}`)} ${A(`inset: 6%; background: @p(var(--color1)); ${msk('@var(--frame)')}`)} }${TR}`,
  }),
  {
    palette: ['#FBF4E2', '#1B1B1B', '#E63946', '#F4C430', '#2E86DE', '#F28CA8'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['dots', 'halftone', 'squares', 'stripes', 'grid'], mood: ['playful', 'bold', 'retro'], density: 'dense', goodFor: ['poster', 'packaging', 'og-image'] },
  }
);

// -- K3 Register Mark -------------------------------------------------------------
const STAR = (() => {
  const n = 12;
  const s = [];
  for (let i = 0; i < n; i++) {
    const a = (360 / n) * i;
    s.push(`#000 ${pct(a).replace('%', 'deg')} ${pct(a + 180 / n).replace('%', 'deg')}`);
    s.push(`transparent ${pct(a + 180 / n).replace('%', 'deg')} ${pct(a + 360 / n).replace('%', 'deg')}`);
  }
  return `conic-gradient(${s.join(', ')})`;
})();
const TARGET = [
  'radial-gradient(circle closest-side, transparent 66%, #000 66% 74%, transparent 74%)',
  'linear-gradient(90deg, transparent 48.4%, #000 48.4% 51.6%, transparent 51.6%) 0 50% / 100% 92% no-repeat',
  'linear-gradient(180deg, transparent 48.4%, #000 48.4% 51.6%, transparent 51.6%) 50% 0 / 92% 100% no-repeat',
].join(', ');
const QUAD = 'conic-gradient(#000 0 90deg, transparent 90deg 180deg, #000 180deg 270deg, transparent 270deg)';

add(
  'Register Mark',
  'A press proof of registration targets: crosshair rings with a quartered disc at the center alternating with spoked star targets, each in a process ink.',
  (c) => ({
    host: `--tgt: ${TARGET}; --star: ${STAR}; --quad: ${QUAD};`,
    rule: `${F} { background: ${ink(c)}; border-radius: @match((x + y) % 2 == 1, 50%, 0%); ${msk('@match((x + y) % 2 == 1, @var(--star), @var(--tgt))')} ${tf('rotate(@match((x + y) % 2 == 1, @r(0deg, 30deg), @p(0deg, 90deg)))')} ${B(`inset: @match((x + y) % 2 == 1, 43%, 33%); border-radius: 50%; background: ${ink(c)}; ${msk('@match((x + y) % 2 == 1, none, @var(--quad))')}`)} }${TR}`,
  }),
  {
    palette: ['#F5F2EA', '#00A0D6', '#E5007E', '#F2C200', '#1B1B1B'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'crosses', 'radial', 'rings'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['poster', 'packaging', 'card-texture'] },
  }
);

// -- K4 Imposition ----------------------------------------------------------------
const CROP = (() => {
  const L = [];
  const t = 1.4; // line weight
  for (const x of [17, 83]) {
    for (const y of [17, 83]) {
      const ox = x < 50 ? [2, 13] : [87, 98];
      const oy = y < 50 ? [2, 13] : [87, 98];
      L.push(`linear-gradient(#000, #000) ${pct((ox[0] / (100 - 11)) * 100)} ${pct(((y - t / 2) / (100 - t)) * 100)} / 11% ${t}% no-repeat`);
      L.push(`linear-gradient(#000, #000) ${pct(((x - t / 2) / (100 - t)) * 100)} ${pct((oy[0] / (100 - 11)) * 100)} / ${t}% 11% no-repeat`);
    }
  }
  for (const at of ['0% 0%', '100% 0%', '0% 100%', '100% 100%']) {
    L.push(`radial-gradient(7% 7% at ${at}, transparent 62%, #000 62% 84%, transparent 84%)`);
  }
  return L.join(', ');
})();
const CARDS = [
  'linear-gradient(#000, #000)',
  'radial-gradient(circle at 74% 30%, transparent 17%, #000 17%)',
  'linear-gradient(180deg, #000 0 56%, transparent 56% 70%, #000 70%)',
  'linear-gradient(90deg, #000 0 38%, transparent 38%), radial-gradient(circle at 72% 50%, #000 22%, transparent 22%)',
  'conic-gradient(from 45deg, #000 0 180deg, transparent 180deg)',
];

add(
  'Imposition',
  'A press sheet of printed cards before trimming: bold modernist cards in four inks, crop marks at every corner and a small register ring where the gutters cross.',
  (c) => ({
    host: `--crop: ${CROP}; ${CARDS.map((m, i) => `--m${i}: ${m};`).join(' ')}`,
    rule: `${F} { ${B(`inset: 0; background: @p(var(--color2)); ${msk('@var(--crop)')}`)} ${A(`inset: 17%; background: @p(var(--color1), var(--color3), var(--color4), var(--color5)); ${msk(`@p(${CARDS.map((_, i) => `@var(--m${i})`).join(', ')})`)} ${tf('rotate(@p(0deg, 90deg, 180deg, 270deg))')}`)} }${TR}`,
  }),
  {
    pal: 4,
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['squares', 'circles', 'lines', 'grid'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['poster', 'packaging', 'card-texture'] },
  }
);

// -- K5 Swatch Book ---------------------------------------------------------------
// Two chip strips to a cell, each one ink in five stepped tints (alpha steps in
// the mask, so the tints are the ink thinned over the ground), with a rivet hole
// through the end of the strip.
const CHIPS = 'linear-gradient(90deg, #000 0 17.6%, transparent 17.6% 18.6%, #000000c2 18.6% 36.2%, transparent 36.2% 37.2%, #00000087 37.2% 54.8%, transparent 54.8% 55.8%, #0000004d 55.8% 73.4%, transparent 73.4% 74.4%, #00000026 74.4%)';
const RIVET = 'radial-gradient(circle at 88% 50%, transparent 5.6%, #000 5.6%)';

add(
  'Swatch Book',
  'Strips from an ink swatch book, two to a cell, each one color stepped down from solid through four lighter tints, with a rivet hole punched through the pale end.',
  (c) => ({
    host: `--chips: ${CHIPS}; --rivet: ${RIVET};`,
    rule: `${F} { ${B(`left: 5%; right: 5%; top: 9%; height: 36%; background: ${ink(c)}; ${mskI('@var(--chips)', '@var(--rivet)')}`)} ${A(`left: 5%; right: 5%; top: 55%; height: 36%; background: ${ink(c)}; ${mskI('@var(--chips)', '@var(--rivet)')}`)} }${TR}`,
  }),
  {
    pal: 21,
    grid: '5x10',
    tg: '5x5',
    meta: { tags: ['stripes', 'blocks', 'steps', 'gradients'], mood: ['playful', 'calm'], density: 'dense', goodFor: ['packaging', 'card-texture', 'wallpaper'] },
  }
);

// -- K6 Rose Engine ---------------------------------------------------------------
// Banknote rosettes: a wavy ring and a spirograph star traced as fine bands,
// each turned its own way, inside a thin bounding circle.
const GUILL = [
  P(stroke(curve((t) => [50 + (40 + 4 * Math.sin(14 * t)) * Math.cos(t), 50 + (40 + 4 * Math.sin(14 * t)) * Math.sin(t)], 280), 2.4, true)),
  P(stroke(curve((t) => {
    const [R, r, d] = [8, 3, 4.6];
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
    return [50 + x * 3.3, 50 + y * 3.3];
  }, 330, 3), 2.4, true)),
];

add(
  'Rose Engine',
  'Banknote rosettes in fine engraved line, as a rose engine lathe cuts them: a wavy ring around a looping spirograph star, each pair turned its own way, in green, brown, blue and gold on pale paper.',
  (c) => ({
    host: `--g0: ${GUILL[0]}; --g1: ${GUILL[1]};`,
    rule: `${F} { background: radial-gradient(circle closest-side, transparent 93%, @p(var(--color1), var(--color2), var(--color3)) 93% 97%, transparent 97%); ${B(`inset: 0; background: ${ink(c)}; ${cp('@var(--g0)')} ${tf('rotate(@r(0deg, 30deg))')}`)} ${A(`inset: 0; background: ${ink(c)}; ${cp('@var(--g1)')} ${tf('rotate(@r(0deg, 72deg))')}`)} }${TR}`,
  }),
  {
    palette: ['#EEF0E2', '#2E6B4F', '#8C3B2A', '#3B5A8C', '#A8823A'],
    grid: '4x6',
    tg: '4x4',
    meta: { tags: ['rings', 'curves', 'radial', 'petals'], mood: ['elegant', 'technical'], density: 'medium', goodFor: ['packaging', 'card-texture', 'wallpaper'] },
  }
);

// -- K7 Printers Flower -----------------------------------------------------------
// A printer's ivy-leaf ornament set four ways: every cell holds one leaf with
// its stem, mirrored by the parity of its column and row so each block of
// four turns into a rosette, and the block's ink is rolled per block.
const LEAF = (() => {
  const pts = curve((t) => {
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [x, -y];
  }, 72);
  // turn the tip (t = pi, pointing down here) toward the bottom right corner,
  // where it meets the tips of the three mirrored leaves of its block
  const a = -Math.PI / 4;
  const k = 2.35;
  const c = 97 - 12 * k;
  return P(pts.map(([x, y]) => [c + k * (x * Math.cos(a) - y * Math.sin(a)), c + k * (x * Math.sin(a) + y * Math.cos(a))]));
})();
// a tendril from the leaf's cleft curling out toward the far corner
const STEM = P(stroke(Array.from({ length: 30 }, (_, i) => {
  const t = i / 29;
  const ang = Math.PI * (0.25 + 1.75 * t);
  const r = 31 - 21 * t;
  return [31 + r * Math.cos(ang), 31 + r * Math.sin(ang)];
}), 3.6));

add(
  'Printers Flower',
  'Printer\'s ivy-leaf ornaments set four to a block, tips meeting in the middle and stems curling out, so the sheet reads as a run of leafy rosettes in old ink colors.',
  (c) => ({
    host: `--leaf: ${LEAF}; --stem: ${STEM};`,
    rule: `--s: @once(@r(0, 100)); ${F} { --k: $(floor(${blockHash('floor((@x - 1) / 2)', 'floor((@y - 1) / 2)')} * 3)); ${tf('scale(@match(x % 2 == 0, -1, 1), @match(y % 2 == 0, -1, 1))')} ${B(`inset: 0; background: ${inkAt('$(k)', 3)}; ${cp('@var(--leaf)')}`)} ${A(`inset: 0; background: ${inkAt('$(k)', 3)}; ${cp('@var(--stem)')}`)} }${TR}`,
  }),
  {
    palette: ['#F3ECDD', '#7A2E2A', '#1F3B5A', '#2F5D3A'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['leaves', 'curves', 'spirals'], mood: ['elegant', 'retro'], density: 'medium', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// -- K8 Contact Sheet -------------------------------------------------------------
// Strips of film printed on a contact sheet: the film is cut with a row of
// rounded sprocket holes along each edge (two layers of holes, each tiled
// across and covering the whole cell, intersected), and every frame shows a
// small two-tone landscape with a sun.
const FILM = [
  'linear-gradient(180deg, transparent 0 7%, #000 7% 93%, transparent 93%)',
  'radial-gradient(26% 3.3% at 50% 14.5%, transparent 100%, #000 100%) 0 0 / 12.5% 100%',
  'radial-gradient(26% 3.3% at 50% 85.5%, transparent 100%, #000 100%) 0 0 / 12.5% 100%',
].join(', ');

add(
  'Contact Sheet',
  'A contact sheet of film strips with sprocket holes along both edges, every frame a little two-tone landscape with a round sun hanging over its horizon.',
  (c) => ({
    host: `--film: ${FILM};`,
    rule: `${F} { background: @p(var(--color1)); ${mskI('@var(--film)')} ${B(`left: 6%; right: 6%; top: 22%; bottom: 22%; background: linear-gradient(180deg, @p(var(--color2), var(--color3)) 0 @r(52%, 74%), @p(var(--color4), var(--color5)) 0);`)} ${A(`left: @r(14%, 64%); top: @r(25%, 38%); width: 22%; height: 22%; border-radius: 50%; background: @p(var(--color6), var(--color5));`)} }${TR}`,
  }),
  {
    palette: ['#F4F1EA', '#24201E', '#7FB7D6', '#F2B5A0', '#3E7C59', '#C8553D', '#F6D365'],
    grid: '5x8',
    tg: '5x5',
    meta: { tags: ['squares', 'circles', 'stripes', 'dots'], mood: ['retro', 'calm'], density: 'medium', goodFor: ['section-divider', 'poster', 'packaging'] },
  }
);

// -- K9 Philately -----------------------------------------------------------------
// A sheet of stamps: the paper is cut by a grid of round holes centered on
// every cell edge, then filled back everywhere but a band along the edges, so
// the perforations bite each stamp and join into whole holes between them.
const PERF = [
  'radial-gradient(circle closest-side, transparent 56%, #000 56%) -7.1429% -7.1429% / 12.5% 12.5%',
  'linear-gradient(#000, #000) 50% 50% / 90% 90% no-repeat',
].join(', ');
const MOTIFS = [
  'polygon(0% 100%, 0% 72%, 24% 34%, 42% 58%, 64% 18%, 100% 74%, 100% 100%)',
  'circle(42% at 50% 50%)',
  '@var(--star)',
  'polygon(50% 4%, 86% 62%, 96% 66%, 80% 90%, 20% 90%, 4% 66%, 50% 66%)',
  '@var(--heart)',
];

add(
  'Philately',
  'A sheet of postage stamps on a dark album page: cream stamps with perforated edges, each holding a small colored picture of a sun, a peak, a star, a heart or a sailboat.',
  (c) => ({
    host: '--star: @shape(star); --heart: @shape(heart);',
    rule: `${F} { --a: @p(0, 1, 2, 3); --b: @p(1, 2, 3); background: @p(var(--color1)); ${msk(PERF)} ${B(`inset: 15%; background: ${inkAt('$(a)', 4, 2)};`)} ${A(`inset: 25%; background: ${inkAt('$((a + b) % 4)', 4, 2)}; ${cp(`@p(${MOTIFS.join(', ')})`)}`)} }${TR}`,
  }),
  {
    palette: ['#1F2A2E', '#F1E9D8', '#C8553D', '#2F6690', '#E9B44C', '#3C6E71'],
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['squares', 'scallops', 'circles', 'stars'], mood: ['retro', 'playful'], density: 'dense', goodFor: ['packaging', 'poster', 'card-texture'] },
  }
);

// -- K10 Raffle -------------------------------------------------------------------
// A ticket is two cells, the ticket and its stub, so its color is rolled per
// pair (a hash of the pair's place and a once-per-drawing seed). The cell's
// own mask bites the notch at the ticket's end and punches the tear line on
// the stub, and clips both pseudo-elements with it.
const TICKET = blockHash('floor((@x - 1) / 2)', '@y');
const TICKET2 = `(abs(sin(floor((@x - 1) / 2) * 39.346 + @y * 11.135 + s) * 24634.6345) % 1)`;
const RAFFLE = [
  'radial-gradient(circle at @match(x % 2 == 1, 0%, 100%) 50%, transparent 11%, #000 11%)',
  'radial-gradient(circle at 7% 50%, transparent @match(x % 2 == 1, 0%, 2.4%), #000 @match(x % 2 == 1, 0%, 2.4%)) 0 0 / 100% 9.09%',
].join(', ');

add(
  'Raffle',
  'Rows of raffle tickets end to end, each ticket and its stub in one color, round notches at the joins, a perforated tear line, and a star on every ticket.',
  (c) => ({
    host: '--star: @shape(star);',
    rule: `--s: @once(@r(0, 100)); ${F} { --a: $(floor(${TICKET} * 5)); --b: $(1 + floor(${TICKET2} * 4)); ${mskI(RAFFLE)} ${B(`left: 0; right: 0; top: 17%; bottom: 17%; background: ${inkAt('$(a)', 5)};`)} ${A(`left: @match(x % 2 == 1, 30%, 40%); top: @match(x % 2 == 1, 28%, 40%); width: @match(x % 2 == 1, 44%, 20%); height: @match(x % 2 == 1, 44%, 20%); background: ${inkAt('$((a + b) % 5)', 5)}; ${cp('@match(x % 2 == 1, @var(--star), circle(50% at 50% 50%))')} ${tf('rotate(@r(-24deg, 24deg))')}`)} }${TR}`,
  }),
  {
    pal: 20,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['stripes', 'stars', 'semicircles', 'dots'], mood: ['playful', 'festive', 'retro'], density: 'medium', goodFor: ['packaging', 'poster', 'section-divider'] },
  }
);

// -- K11 Paper Tape ---------------------------------------------------------------
// Five-hole tape, two rows of cells to a strip: three data tracks in the upper
// cell, the feed track and two more data tracks in the lower. The tape's mask
// is a grid of every possible hole, filled back in column by column where a
// rolled bit says no hole; the feed holes are bitten by the lower cell's own
// mask, which clips the tape inside it.
const tapeCol = (k) => {
  const stops = [0, 1, 2].map((r) => {
    const a = ((r * 100) / 3).toFixed(2);
    const b = (((r + 1) * 100) / 3).toFixed(2);
    const bit = r === 0 ? '@match(y % 2 == 0, #000, @p(#000, #000, transparent))' : '@p(#000, #000, transparent)';
    return `${bit} ${a}% ${b}%`;
  });
  return `linear-gradient(180deg, ${stops.join(', ')}) ${pct((k * 100) / 3)} 0 / 25% 100% no-repeat`;
};
const TAPE_HOLES = 'radial-gradient(circle closest-side, transparent 72%, #000 72%) 0 0 / 25% 33.333%';
const FEED = 'radial-gradient(circle at 50% 13.8%, transparent 4.2%, #000 4.2%) 0 0 / 25% 100%';

add(
  'Paper Tape',
  'Wide strips of punched paper tape in pastel colors on a dark ground, a line of small feed holes along each and big data holes punched at random above and below it.',
  (c) => ({
    host: `--feed: ${FEED};`,
    rule: `${F} { ${msk('@match(y % 2 == 0, @var(--feed), none)')} ${B(`left: 0; right: 0; top: @match(y % 2 == 1, 14%, -0.6%); bottom: @match(y % 2 == 1, -0.6%, 14%); background: ${inkAt('floor((y - 1) / 2) % 4', 4)}; mask: ${TAPE_HOLES}, ${[0, 1, 2, 3].map(tapeCol).join(', ')};`)} }${TR}`,
  }),
  {
    palette: ['#23262C', '#F2D16B', '#EBA6B4', '#A6D6C8', '#F3EAD6'],
    grid: '6x10',
    tg: '6x6',
    meta: { tags: ['stripes', 'dots', 'circles'], mood: ['retro', 'technical'], density: 'medium', goodFor: ['section-divider', 'textile', 'card-texture'] },
  }
);

// -- K12 Dit Dah ------------------------------------------------------------------

add(
  'Dit Dah',
  'Rows of dots and dashes like a telegraph tape, two lines of marks to a row of cells, mostly in one ink with the odd mark picked out in another.',
  (c) => ({
    rule: `${F} { ${B(`left: 14%; top: 21%; height: 17%; width: @p(17%, 17%, 66%); border-radius: 99px; background: @p(var(--color1), var(--color1), var(--color1), var(--color2), var(--color3));`)} ${A(`left: 14%; top: 62%; height: 17%; width: @p(17%, 17%, 66%); border-radius: 99px; background: @p(var(--color1), var(--color1), var(--color1), var(--color2), var(--color3));`)} }${TR}`,
  }),
  {
    pal: 1,
    inks: 3,
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['dots', 'lines', 'stripes'], mood: ['technical', 'calm'], density: 'sparse', goodFor: ['hero-background', 'section-divider', 'card-texture'] },
  }
);

// -- K13 Four State ---------------------------------------------------------------
// A mail sorting code: bars of four kinds (full, rising, falling and the short
// tracker) at an even pitch, four to a cell, each kind rolled per bar.
const STATES = ['50% / 7% 80%', '20.83% / 7% 52%', '79.17% / 7% 52%', '50% / 7% 24%'];
const stateBar = (k) => `linear-gradient(#000, #000) ${pct(((25 * k + 9) / 93) * 100)} @p(${STATES.join(', ')}) no-repeat`;

add(
  'Four State',
  'Rows of mail sorting bars on kraft paper: tall bars, rising and falling half bars and short trackers at an even pitch, mostly navy with the odd group in red.',
  (c) => ({
    rule: `${F} { background: @p(var(--color1), var(--color1), var(--color1), var(--color2)); mask: ${[0, 1, 2, 3].map(stateBar).join(', ')}; }${TR}`,
  }),
  {
    palette: ['#E6D7BC', '#1E2B4A', '#C23B22'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['lines', 'stripes', 'steps'], mood: ['technical', 'calm'], density: 'medium', goodFor: ['section-divider', 'card-texture', 'packaging'] },
  }
);

// -- K14 Split Flap ---------------------------------------------------------------
// The cell's mask cuts the split across the middle of the flap and clips both
// the flap and its symbol with it.
const FLAPS = [
  'inset(0% round 10%)',
  'inset(0% 0% 50% 0% round 10% 10% 0% 0%)',
  'circle(30% at 50% 50%)',
  'polygon(50% 14%, 86% 82%, 14% 82%)',
  'inset(22% 22%)',
  'inset(40% 12%)',
  'polygon(50% 12%, 88% 50%, 50% 88%, 12% 50%)',
];

add(
  'Split Flap',
  'A departures board of split-flap tiles, each flap parted across the middle and showing a colored square, disc, triangle, bar or a solid flap.',
  (c) => ({
    rule: `${F} { ${msk('linear-gradient(180deg, #000 0 48.6%, transparent 48.6% 51.8%, #000 51.8%)')} ${B(`inset: 6% 8%; border-radius: 10%; background: @p(var(--color1));`)} ${A(`inset: 6% 8%; background: ${ink(c, 2)}; ${cp(`@p(${FLAPS.join(', ')})`)}`)} }${TR}`,
  }),
  {
    palette: ['#141517', '#383B41', '#F4C152', '#F07E4E', '#4FA3D9', '#E9E7E1'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['squares', 'circles', 'triangles', 'diamonds', 'grid'], mood: ['technical', 'retro', 'bold'], density: 'dense', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);

// -- K15 Signal Flags -------------------------------------------------------------
const FLAG_FIGURES = [
  P([[38, 0], [62, 0], [62, 38], [100, 38], [100, 62], [62, 62], [62, 100], [38, 100], [38, 62], [0, 62], [0, 38], [38, 38]]),
  P([[0, 0], [16, 0], [50, 34], [84, 0], [100, 0], [100, 16], [66, 50], [100, 84], [100, 100], [84, 100], [50, 66], [16, 100], [0, 100], [0, 84], [34, 50], [0, 16]]),
  'inset(27%)',
  P([[0, 0], [50, 0], [50, 50], [100, 50], [100, 100], [50, 100], [50, 50], [0, 50]]),
  P([[0, 0], [100, 0], [0, 100]]),
  'inset(0% 50% 0% 0%)',
  'inset(33.3% 0%)',
  'circle(27% at 50% 50%)',
  P([[50, 6], [94, 50], [50, 94], [6, 50]]),
];
const FLAG_FIELDS = [
  'inset(10% 9%)',
  'inset(10% 9%)',
  P([[9, 10], [91, 10], [67, 50], [91, 90], [9, 90]]),
];

add(
  'Signal Flags',
  'A hoist of maritime signal flags, one to a cell: crosses, saltires, quarters, halves, bands, discs and diamonds in red, blue, yellow, black and white, a few cut swallowtail.',
  (c) => ({
    rule: `${F} { --a: @p(0, 1, 2, 3, 4); --b: @p(1, 2, 3, 4); background: ${inkAt('$(a)', 5)}; ${cp(`@p(${FLAG_FIELDS.join(', ')})`)} ${A(`left: 9%; right: 9%; top: 10%; bottom: 10%; background: ${inkAt('$((a + b) % 5)', 5)}; ${cp(`@p(${FLAG_FIGURES.join(', ')})`)}`)} }${TR}`,
  }),
  {
    palette: ['#8EA8B4', '#C8102E', '#0B4EA2', '#F2C200', '#161616', '#F7F5F0'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['crosses', 'squares', 'triangles', 'stripes', 'diamonds', 'circles'], mood: ['bold', 'festive', 'playful'], density: 'dense', goodFor: ['poster', 'packaging', 'textile'] },
  }
);

// -- K16 Hazard -------------------------------------------------------------------
// Each board is two striped halves turned a quarter apart and meeting in a
// chevron. The stripes are drawn straight in each half and turned with it, so
// their edges stay axis-aligned for the export; the period is set so that the
// two halves' stripes meet at the seam.
const HZ_P = 100 / 4.5;
const HZ_STRIPES = `repeating-linear-gradient(90deg, #000 0 ${pct(HZ_P / 2)}, transparent ${pct(HZ_P / 2)} ${pct(HZ_P)})`;

add(
  'Hazard',
  'Hazard boards on concrete: black panels striped with yellow, red or white chevrons that point up, down, left or right from board to board.',
  (c) => ({
    rule: `${F} { background: @p(var(--color1)); ${cp('inset(7%)')} ${tf(`rotate(${'@p(0deg, 90deg, 180deg, 270deg)'})`)} --k: @p(2, 3, 4); ${B(`inset: -30%; background: ${inkAt('$(k - 2)', 3, 2)}; ${msk(HZ_STRIPES)} ${cp('polygon(0% 0%, 100% 100%, 0% 100%)')} ${tf('rotate(45deg)')}`)} ${A(`inset: -30%; background: ${inkAt('$(k - 2)', 3, 2)}; ${msk(HZ_STRIPES)} ${cp('polygon(100% 0%, 100% 100%, 0% 100%)')} ${tf('rotate(-45deg)')}`)} }${TR}`,
  }),
  {
    palette: ['#CFCAC0', '#1D1D1F', '#F4C430', '#E4572E', '#F2F2EE'],
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['chevrons', 'stripes', 'diagonals', 'squares'], mood: ['bold', 'technical'], density: 'dense', goodFor: ['poster', 'og-image'] },
  }
);

// -- K17 Manometer ----------------------------------------------------------------
const TICKS = (() => {
  const s = [];
  for (let k = 0; k <= 10; k++) {
    const a = 27 * k;
    s.push(`#000 ${a}deg ${a + 3}deg`, `transparent ${a + 3}deg ${a + 27}deg`);
  }
  return `conic-gradient(from 223.5deg, ${s.slice(0, -1).join(', ')}, transparent 273deg 360deg)`;
})();
// the needle: a hub disc with a tapered pointer rising from it to the top
const NEEDLE = (() => {
  const r = 6;
  const w = 1.6;
  const f0 = Math.asin(w / r);
  const hub = Array.from({ length: 21 }, (_, i) => {
    const f = f0 + ((2 * Math.PI - 2 * f0) * i) / 20;
    return [50 + r * Math.sin(f), 50 - r * Math.cos(f)];
  });
  return P([...hub, [50, 14]]);
})();

add(
  'Manometer',
  'A panel of pressure gauges: cream dials ringed in grey with a green band and a red band, ticked round three quarters, each needle swung to its own reading.',
  (c) => ({
    host: `--ticks: ${TICKS}; --needle: ${NEEDLE}; --zones: conic-gradient(from 225deg, var(--color5) 0 120deg, var(--color2) 120deg 200deg, var(--color3) 200deg 270deg, var(--color2) 270deg 360deg);`,
    rule: `${F} { ${cp('circle(46% at 50% 50%)')} background: radial-gradient(circle closest-side, @p(var(--color1)) 76%, transparent 76%), @var(--zones); ${B(`inset: 0; background: var(--color4); ${mskI('@var(--ticks)', 'radial-gradient(circle closest-side, transparent 58%, #000 58% 70%, transparent 70%)')}`)} ${A(`inset: 0; background: @p(var(--color4), var(--color3)); ${cp('@var(--needle)')} ${tf(`rotate(@calc(-128 + 256 * max(0, min(1, ${noise(-0.4, 1.4, 1.3)})))deg)`)}`)} }${TR}`,
  }),
  {
    palette: ['#22313A', '#ECE6D6', '#7D8E95', '#D9572B', '#1D2326', '#5E9C76'],
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['circles', 'radial', 'rings', 'lines'], mood: ['technical', 'retro'], density: 'medium', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);

// -- K18 Radar Sweep --------------------------------------------------------------
const SWEEP = 'conic-gradient(transparent 0 270deg, #00000026 270deg 300deg, #00000059 300deg 324deg, #0000009e 324deg 344deg, #000 344deg 360deg)';
const SCOPE = [
  'repeating-radial-gradient(circle closest-side, #000 0 1.8%, transparent 1.8% 23%)',
  'linear-gradient(90deg, transparent 49.2%, #000 49.2% 50.8%, transparent 50.8%)',
  'linear-gradient(180deg, transparent 49.2%, #000 49.2% 50.8%, transparent 50.8%)',
].join(', ');

add(
  'Radar Sweep',
  'Green radar scopes with range rings and crosshairs, each beam sweeping outward from the middle of the sheet and trailing its fading wake, with amber blips.',
  (c) => ({
    host: `--sweep: ${SWEEP}; --scope: ${SCOPE};`,
    rule: `${F} { ${cp('circle(46% at 50% 50%)')} background: radial-gradient(3.6% 3.6% at @r(22%, 78%) @r(22%, 78%), var(--color4) 100%, transparent 100%), radial-gradient(2.6% 2.6% at @r(22%, 78%) @r(22%, 78%), var(--color4) 100%, transparent 100%), @p(var(--color1)); ${B(`inset: 0; background: var(--color2); ${msk('@var(--scope)')}`)} ${A(`inset: 0; background: @p(var(--color3)); ${msk('@var(--sweep)')} ${tf(`rotate(@calc(atan2(@dx, 0 - @dy) * 57.2958 + ${noise(-50, 50, 1.2)})deg)`)}`)} }${TR}`,
  }),
  {
    palette: ['#050D09', '#10301F', '#2C7A51', '#6CF5AE', '#F2B84B'],
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['circles', 'radial', 'rings', 'concentric', 'crosses'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

// -- K19 Lissajous ----------------------------------------------------------------
const LISSA = [
  [1, 3, Math.PI / 4],
  [3, 2, Math.PI / 6],
  [3, 4, Math.PI / 4],
  [5, 4, Math.PI / 2],
  [1, 1, Math.PI / 3],
].map(([a, b, d]) =>
  P(stroke(curve((t) => [50 + 46 * Math.sin(a * t + d), 50 + 46 * Math.sin(b * t)], 180), 2.4, true))
);

add(
  'Lissajous',
  'Oscilloscope screens in a grid, each tracing a glowing Lissajous figure of loops and crossings over a faint graticule.',
  (c) => ({
    host: LISSA.map((l, i) => `--l${i}: ${l};`).join(' '),
    rule: `${F} { background: @p(var(--color1)); ${cp('inset(5% round 12%)')} ${B(`inset: 5%; background: var(--color2); ${msk('repeating-linear-gradient(90deg, #000 0 1.2%, transparent 1.2% 12.5%) 6.25% 0', 'repeating-linear-gradient(180deg, #000 0 1.2%, transparent 1.2% 12.5%) 0 6.25%')}`)} ${A(`inset: 15%; background: @p(var(--color3), var(--color3), var(--color4)); ${cp(`@p(${LISSA.map((_, i) => `@var(--l${i})`).join(', ')})`)} ${tf('rotate(@p(0deg, 90deg))')}`)} }${TR}`,
  }),
  {
    palette: ['#0A1416', '#13292A', '#21453F', '#62F0C2', '#F4B860'],
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['curves', 'lines', 'grid', 'squares'], mood: ['technical', 'retro'], density: 'medium', goodFor: ['poster', 'og-image', 'card-texture'] },
  }
);

// -- K20 Cardiograph --------------------------------------------------------------
// Heartbeats traced on ECG paper. The trace runs a fifth of a cell past both
// sides along the baseline, so a beat shifted a little still meets its
// neighbors; the grid is the paper's own small and large squares.
const BEATS = [
  [[-20, 60], [8, 60], [12, 57], [16, 55], [20, 57], [24, 60], [32, 60], [35, 64], [39, 20], [43, 72], [46, 60], [54, 60], [59, 56], [65, 52], [71, 56], [76, 60], [120, 60]],
  [[-20, 60], [8, 60], [12, 56], [16, 54], [20, 56], [24, 60], [33, 60], [36, 66], [40, 8], [44, 80], [47, 60], [55, 60], [60, 55], [66, 50], [72, 55], [77, 60], [120, 60]],
  [[-20, 60], [10, 60], [14, 57], [18, 55], [22, 57], [26, 60], [34, 60], [37, 64], [41, 26], [45, 70], [48, 60], [56, 60], [61, 64], [67, 67], [73, 64], [78, 60], [120, 60]],
  [[-20, 60], [16, 60], [24, 36], [33, 84], [42, 52], [50, 60], [62, 60], [68, 54], [74, 52], [80, 56], [86, 60], [120, 60]],
];
const beatPoly = (pts) =>
  P(stroke(pts, 3.2).map(([x, y]) => [((x + 20) / 140) * 100, y]));
const ECG_GRID = [
  'repeating-linear-gradient(90deg, #000 0 1.2%, transparent 1.2% 20%)',
  'repeating-linear-gradient(180deg, #000 0 1.2%, transparent 1.2% 20%)',
  'linear-gradient(90deg, #000 0 2.6%, transparent 2.6%)',
  'linear-gradient(180deg, #000 0 2.6%, transparent 2.6%)',
].join(', ');

add(
  'Cardiograph',
  'Heartbeat traces on pink ECG paper, row after row of sharp spikes and soft bumps running over a grid of small and large squares.',
  (c) => ({
    host: BEATS.map((b, i) => `--b${i}: ${beatPoly(b)};`).join(' ') + ` --grid: ${ECG_GRID};`,
    rule: `${F} { ${B(`inset: 0; background: @p(var(--color2)); opacity: 0.55; ${msk('@var(--grid)')}`)} ${A(`left: -20%; width: 140%; top: 0; height: 100%; background: @p(var(--color1)); ${cp('@p(@var(--b0), @var(--b0), @var(--b1), @var(--b2), @var(--b3))')} ${tf('translateX(@r(-4%, 4%))')}`)} }${TR}`,
  }),
  {
    palette: ['#FBEFEA', '#1E1B24', '#E0827A'],
    grid: '5x8',
    tg: '5x5',
    meta: { tags: ['lines', 'zigzags', 'grid'], mood: ['technical', 'calm'], density: 'medium', goodFor: ['section-divider', 'hero-background', 'card-texture'] },
  }
);

// -- K21 Equalizer ----------------------------------------------------------------
// One meter to a cell: a column of dim segments, lit from the bottom to a level
// that follows a smooth spectrum across the row, green, then amber, then red.
const EQ_SEG = 'repeating-linear-gradient(180deg, transparent 0 1.8%, #000 1.8% 10.7%, transparent 10.7% 12.5%)';

add(
  'Equalizer',
  'A wall of graphic equalizer meters, each a column of square segments lit green, then amber, then red to a level that rises and falls across the spectrum.',
  (c) => ({
    rule: `${F} { --n: @calc(${noise(-1, 14, 1.5)} + @r(-1.2, 1.2)); ${B(`left: 19%; right: 19%; top: 4%; bottom: 8%; background: @p(var(--color4)); ${msk(EQ_SEG)}`)} ${A(`left: 19%; right: 19%; top: 4%; bottom: 8%; background: linear-gradient(0deg, var(--color1) 0 50%, var(--color2) 50% 75%, var(--color3) 75%); ${msk(EQ_SEG)} ${cp('inset($(12.5 * (8 - max(1, min(8, round(n)))))% 0% 0% 0%)')}`)} }${TR}`,
  }),
  {
    palette: ['#0F1218', '#3DDC97', '#F5D547', '#FF5E57', '#283140'],
    grid: '10x6',
    tg: '6x6',
    meta: { tags: ['squares', 'blocks', 'stripes', 'grid'], mood: ['technical', 'retro', 'bold'], density: 'dense', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

// -- K22 Bar Chart ----------------------------------------------------------------
// Three series as grouped bars over a baseline, every series' height a smooth
// field of its own, so each one trends across the row while the others wander.
const barH = (k) => q(`max(8, min(84, h${k}))`);
const barClip = (k) => `inset(${q(`(89.5 - max(8, min(84, h${k}))) / 0.895`)}% 0% 0% 0%)`;
const barPosY = (k) => `${q(`(89.5 - max(8, min(84, h${k}))) / (100 - max(8, min(84, h${k}))) * 100`)}%`;

add(
  'Bar Chart',
  'Rows of grouped bar charts, three bars to a group in three inks standing on a ruled baseline, each series rising and falling in a smooth trend across the sheet.',
  (c) => ({
    rule: `${F} { --h1: @calc(${noise(-15, 135, 1.6)} + @r(-6, 6)); --h2: @calc(${noise(-15, 135, 1.4)} + @r(-6, 6)); --h3: @calc(${noise(-15, 135, 1.8)} + @r(-6, 6)); background: linear-gradient(var(--color4), var(--color4)) 0 90% / 100% 2.6% no-repeat, linear-gradient(@p(var(--color1)), var(--color1)) 10.81% ${barPosY(1)} / 26% ${barH(1)}% no-repeat; ${B(`left: 37%; width: 26%; top: 0; bottom: 10.5%; background: @p(var(--color2)); ${cp(barClip(2))}`)} ${A(`left: 66%; width: 26%; top: 0; bottom: 10.5%; background: @p(var(--color3)); ${cp(barClip(3))}`)} }${TR}`,
  }),
  {
    palette: ['#F6F2E9', '#E4572E', '#29335C', '#F3A712', '#8C8A84'],
    grid: '8x6',
    tg: '6x6',
    meta: { tags: ['blocks', 'stripes', 'lines'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['hero-background', 'poster', 'section-divider'] },
  }
);

// -- K23 Pie Chart ----------------------------------------------------------------
// The pie is a disc painted as a gradient on the cell, and two slices laid
// over it, each a round box cut by a sector. Slice angles come in steps of
// ten degrees, so every sector (40 to 300 degrees) is a polygon set once on
// the host, fanned out past the rim (five points on a circle well outside it,
// so every chord clears the edge); a cell names its two and turns the whole
// pie. A donut's hole is bored through the disc and both slices alike.
const PIE_HOST = Array.from({ length: 27 }, (_, i) => {
  const deg = 40 + 10 * i;
  const pts = [0, 1, 2, 3, 4].map((k) => {
    const t = ((deg * k) / 4) * (Math.PI / 180);
    return [50 + 75 * Math.sin(t), 50 - 75 * Math.cos(t)];
  });
  return `--s${deg}: ${P([[50, 50], ...pts])};`;
}).join(' ') + ' --hole0: none; --hole1: radial-gradient(circle closest-side, transparent 50%, #000 50%);';

add(
  'Pie Chart',
  'A sheet of pie and donut charts, each split into three slices in the same three inks at its own proportions and turned to its own angle.',
  (c) => ({
    host: PIE_HOST,
    rule: `${F} { --a1: @p(4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15); --a2: @p(6, 7, 8, 9, 10, 11, 12, 13, 14, 15); --d: @p(0, 1); background: radial-gradient(circle closest-side, transparent $(d * 44)%, @p(var(--color3)) $(d * 44)% 84.6%, transparent 84.6%); ${tf('rotate(@ri(0, 359)deg)')} ${B(`inset: 7%; border-radius: 50%; background: @p(var(--color2)); ${cp('@var(--s$(10 * (a1 + a2)))')} ${msk('@var(--hole$(d))')}`)} ${A(`inset: 7%; border-radius: 50%; background: @p(var(--color1)); ${cp('@var(--s$(10 * a1))')} ${msk('@var(--hole$(d))')}`)} }${TR}`,
  }),
  {
    palette: ['#F4EFE4', '#E4572E', '#29335C', '#76B5A8'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'radial', 'rings'], mood: ['technical', 'playful'], density: 'medium', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);


// -- K24 Streamgraph --------------------------------------------------------------
// Three layers stacked about each row's midline, their thicknesses running on
// sine waves of the sheet column whose phases are rolled once per drawing,
// so the stream is continuous from cell to cell and reshapes on a reseed.
// A cell works out the three thicknesses once at four points across it
// (--ua .. --wd); the top edge (--ta .. --td) and every other vertex are left
// to CSS calc() over those, so no sine is worked out twice, and the
// expressions are kept short, since css-doodle's cost is mostly in reading
// them. Three segments a cell are as smooth as four at any size the waves are
// drawn at, and a stream is never drawn in cells under 54px, where its bands
// would be a few pixels thick. The clips are written unprefixed only, to keep
// the per-cell CSS small.
const SG_N = 3; // segments across a cell
const SG_AT = 'abcd';
const SG_AMP = [13, 11, 12];
const SG_W = [
  [0.9, 1.3, 0.7],
  [2.1, 2.7, 1.9],
];
const SG_Y = [
  [1.7, 2.3, 2.9],
  [0.8, 1.9, 1.3],
];
// the phases, rolled once per drawing and read by every cell
const SG_PHASES = [0, 1, 2].map((j) => `--p${j}: @once(@r(0, 6.283));`).join(' ');
const n4 = (v) => +v.toFixed(4);
// Each band's two sine phases at the cell's right edge (--fj, --gj), from the
// cell's column and row (--X, --Y, so every expression is the same text in
// every cell and css-doodle reads it once) and the band's rolled phase; a
// sample i thirds in from the left steps back from there by a constant.
const SG_BASES = '--X: @x; --Y: @y; ' + [0, 1, 2]
  .map((j) => `--f${j}: $(X*${SG_W[0][j]}+Y*${SG_Y[0][j]}+p${j}); --g${j}: $(X*${SG_W[1][j]}+Y*${SG_Y[1][j]}+p${j}*1.7);`)
  .join(' ');
const sgThick = (j, i) => {
  const A = SG_AMP[j];
  return `$(${n4(A * 1.05)}+${n4(A * 0.6)}*sin(f${j}+${n4((i / SG_N - 1) * SG_W[0][j])})+${n4(A * 0.35)}*sin(g${j}+${n4((i / SG_N - 1) * SG_W[1][j])}))`;
};
const SG_XS = SG_AT.split('').map((a, i) => [a, `${+((i * 100) / SG_N).toFixed(3)}%`]);
const SG_VARS = [
  SG_BASES,
  ...[0, 1, 2].map((j) => SG_AT.split('').map((a, i) => `--${'uvw'[j]}${a}: ${sgThick(j, i)};`).join(' ')),
  SG_AT.split('').map((a) => `--t${a}: calc(50% - (@var(--u${a}) + @var(--v${a}) + @var(--w${a})) * 0.5%);`).join(' '),
  // the stream's top edge left to right, and its bottom edge right to left
  `--up: ${SG_XS.map(([a, x]) => `${x} @var(--t${a})`).join(', ')};`,
  `--dn: ${[...SG_XS].reverse().map(([a, x]) => `${x} calc(100% - @var(--t${a}))`).join(', ')};`,
].join(' ');
// the whole stream; the top band, down to the first boundary; the bottom
// band, up to the second (the middle band is the stream showing between)
const SG_ALL = 'polygon(@var(--up), @var(--dn))';
const SG_TOPBAND = `polygon(@var(--up), ${[...SG_XS].reverse().map(([a, x]) => `${x} calc(@var(--t${a}) + @var(--u${a}) * 1%)`).join(', ')})`;
const SG_BOTBAND = `polygon(${SG_XS.map(([a, x]) => `${x} calc(100% - @var(--t${a}) - @var(--w${a}) * 1%)`).join(', ')}, @var(--dn))`;

add(
  'Streamgraph',
  'Rows of streamgraphs: three colored layers stacked about a midline, swelling and thinning in smooth waves as they flow across the sheet.',
  (c) => ({
    rule: `${SG_PHASES} ${F} { ${SG_VARS} background: @p(var(--color2)); clip-path: ${SG_ALL}; ${B(`inset: 0; background: @p(var(--color1)); clip-path: ${SG_TOPBAND};`)} ${A(`inset: 0; background: @p(var(--color3)); clip-path: ${SG_BOTBAND};`)} }${TR}`,
  }),
  {
    pal: 27,
    inks: 3,
    grid: '6x9',
    tg: '5x5',
    min: 54,
    meta: { tags: ['waves', 'curves', 'stripes'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['hero-background', 'section-divider'] },
  }
);


// -- K25 Candlestick --------------------------------------------------------------
// Every height is a whole percent, so the four levels a candle needs (wick
// top, body top, body bottom, wick bottom) are short to write out per cell.
const candle = (k) =>
  `polygon(46% $(c${k} - h${k} - u${k})%, 54% $(c${k} - h${k} - u${k})%, 54% $(c${k} - h${k})%, 84% $(c${k} - h${k})%, 84% $(c${k} + h${k})%, 54% $(c${k} + h${k})%, 54% $(c${k} + h${k} + d${k})%, 46% $(c${k} + h${k} + d${k})%, 46% $(c${k} + h${k})%, 16% $(c${k} + h${k})%, 16% $(c${k} - h${k})%, 46% $(c${k} - h${k})%)`;
const candleVars = (k) =>
  `--c${k}: $(round(max(34, min(66, m))) + @ri(-9, 9)); --h${k}: @ri(6, 17); --u${k}: @ri(4, 13); --d${k}: @ri(4, 13);`;

add(
  'Candlestick',
  'Rows of candlestick charts on a dark screen: teal and red bodies with thin wicks above and below, drifting up and down with a smooth trend.',
  (c) => ({
    rule: `${F} { --m: ${noise(-30, 130, 1.6)}; ${candleVars(1)} ${candleVars(2)} background: repeating-linear-gradient(180deg, transparent 0 24%, var(--color3) 24% 25%); ${B(`left: 8%; width: 38%; top: 0; bottom: 0; background: @p(var(--color1), var(--color2)); ${cp(candle(1))}`)} ${A(`left: 54%; width: 38%; top: 0; bottom: 0; background: @p(var(--color1), var(--color2)); ${cp(candle(2))}`)} }${TR}`,
  }),
  {
    palette: ['#0E1621', '#2BC4A0', '#F2545B', '#26384A'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['blocks', 'lines', 'stripes'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['hero-background', 'poster', 'og-image'] },
  }
);

export const sectionK = { title: 'K. Press', all };
