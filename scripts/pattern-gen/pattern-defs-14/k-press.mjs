// K. Press - print, signal and data: screens, dithers, barcodes, flags, gauges and charts.
import { section, F, TR, ink, cp, msk, mskI, B, A, noise, fx, fy, fr } from './shared.mjs';

const { add, all } = section('K. Press');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const tfo = (v) => `-webkit-transform-origin: ${v}; transform-origin: ${v};`;
const pct = (n) => `${+n.toFixed(2)}%`;
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

// -- K1 Ordered Dither ----------------------------------------------------------
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
const DITHER_HOST = Array.from({ length: 16 }, (_, i) => `--d${i + 1}: ${ditherMask(i + 1)};`).join(' ');
const DITHER_PICK = `@match(${Array.from({ length: 15 }, (_, i) => `$(t) < ${i + 2}, @var(--d${i + 1})`).join(', ')}, @var(--d16))`;

add(
  'Ordered Dither',
  'A soft cloud of tone printed in one bit: every cell a four by four block of square pixels lit in the Bayer order, from a single dot to solid ink.',
  (c) => ({
    host: DITHER_HOST,
    rule: `${F} { --t: ${noise(-12, 29, 1.7)}; background: @match(@r(0, 1) < ${fx} * 1.8 - 0.4, @p(var(--color2)), @p(var(--color1))); ${msk(DITHER_PICK)} }${TR}`,
  }),
  {
    palette: ['#E8E4D4', '#23305C', '#C2412D'],
    grid: '10x15',
    tg: '10x10',
    meta: { tags: ['squares', 'grid', 'halftone'], mood: ['technical', 'retro'], density: 'medium', goodFor: ['card-texture', 'wallpaper'] },
  }
);

// -- K2 Register Mark -------------------------------------------------------------
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
    rule: `${F} { --k: @calc((@x + @y) % 2); background: ${ink(c)}; border-radius: @match((x + y) % 2 == 1, 50%, 0%); ${msk('@match((x + y) % 2 == 1, @var(--star), @var(--tgt))')} ${tf('rotate(@match((x + y) % 2 == 1, @r(0deg, 30deg), @p(0deg, 90deg)))')} ${B(`inset: @match((x + y) % 2 == 1, 43%, 33%); border-radius: 50%; background: ${ink(c)}; ${msk('@match((x + y) % 2 == 1, none, @var(--quad))')}`)} }${TR}`,
  }),
  {
    palette: ['#F5F2EA', '#00A0D6', '#E5007E', '#F2C200', '#1B1B1B'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'crosses', 'radial', 'rings'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['poster', 'packaging', 'card-texture'] },
  }
);

// -- K3 Streamgraph -----------------------------------------------------------
// Three layers stacked about each row's midline, their thicknesses running on
// sine waves of the sheet column whose phases are rolled once per drawing, so
// the stream is continuous from cell to cell and reshapes on a reseed.
const SG_N = 4; // segments across a cell
const sgThick = (j, X) =>
  `(${[13, 11, 12][j]} * (1.05 + 0.6 * sin(${X} * ${[0.9, 1.3, 0.7][j]} + p${j} + @y * ${[1.7, 2.3, 2.9][j]}) + 0.35 * sin(${X} * ${[2.1, 2.7, 1.9][j]} + p${j} * 1.7 + @y * ${[0.8, 1.9, 1.3][j]})))`;
const sgEdges = (X) => {
  const h = [0, 1, 2].map((j) => sgThick(j, X));
  const top = `(50 - (${h[0]} + ${h[1]} + ${h[2]}) / 2)`;
  return [top, `(${top} + ${h[0]})`, `(${top} + ${h[0]} + ${h[1]})`, `(${top} + ${h[0]} + ${h[1]} + ${h[2]})`];
};
/** The region from the stream's top edge down to boundary k (1-3). */
const sgDown = (k) => {
  const xs = Array.from({ length: SG_N + 1 }, (_, i) => i / SG_N);
  const upper = xs.map((u) => `${(u * 100).toFixed(1)}% $(${sgEdges(`(@x - 1 + ${u})`)[0]})%`);
  const lower = [...xs].reverse().map((u) => `${(u * 100).toFixed(1)}% $(${sgEdges(`(@x - 1 + ${u})`)[k]})%`);
  return `polygon(${[...upper, ...lower].join(', ')})`;
};

add(
  'Streamgraph',
  'Rows of streamgraphs: three colored layers stacked about a midline, swelling and thinning in smooth waves as they flow across the sheet.',
  (c) => ({
    rule: `--p0: @once(@r(0, 6.283)); --p1: @once(@r(0, 6.283)); --p2: @once(@r(0, 6.283)); ${F} { background: @p(var(--color3)); ${cp(sgDown(3))} ${B(`inset: 0; background: @p(var(--color2)); ${cp(sgDown(2))}`)} ${A(`inset: 0; background: @p(var(--color1)); ${cp(sgDown(1))}`)} }${TR}`,
  }),
  {
    pal: 27,
    inks: 3,
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['waves', 'curves', 'stripes'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['hero-background', 'section-divider'] },
  }
);


// -- K4 Philately -------------------------------------------------------------
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

// -- K5 Raffle ---------------------------------------------------------------
// The cell's own mask bites the notches and punches the tear line, and clips
// both pseudo-elements with it: the ticket body and the star printed on it.
const RAFFLE = [
  'radial-gradient(circle at 0% 50%, transparent 12%, #000 12%)',
  'radial-gradient(circle at 100% 50%, transparent 12%, #000 12%)',
  'radial-gradient(circle at 70% 50%, transparent 2.6%, #000 2.6%) 0 0 / 100% 10%',
].join(', ');

add(
  'Raffle',
  'Rolls of raffle tickets end to end, every ticket in its own color with round notches at the joins, a perforated tear line and a printed star.',
  (c) => ({
    host: '--star: @shape(star);',
    rule: `${F} { --a: @p(0, 1, 2, 3, 4); --b: @p(1, 2, 3, 4); ${mskI(RAFFLE)} ${B(`left: 0; right: 0; top: 21%; bottom: 21%; background: ${inkAt('$(a)', 5)};`)} ${A(`left: 22%; top: 34%; width: 30%; height: 32%; background: ${inkAt('$((a + b) % 5)', 5)}; ${cp('@var(--star)')} ${tf('rotate(@r(-20deg, 20deg))')}`)} }${TR}`,
  }),
  {
    pal: 20,
    grid: '4x8',
    tg: '5x5',
    meta: { tags: ['stripes', 'stars', 'semicircles'], mood: ['playful', 'festive', 'retro'], density: 'medium', goodFor: ['packaging', 'poster', 'section-divider'] },
  }
);

// -- K6 Paper Tape -------------------------------------------------------------
// Five-hole tape: three data tracks above the feed holes and two below. The
// tape's mask is a grid of every possible hole, filled back in column by
// column where a rolled bit says no hole; the feed holes are bitten by the
// cell's own mask, which clips the tape inside it.
const TAPE_ROWS = 6;
const tapeCol = (pos) => {
  const stops = [];
  for (let r = 0; r < TAPE_ROWS; r++) {
    const a = ((r * 100) / TAPE_ROWS).toFixed(2);
    const b = (((r + 1) * 100) / TAPE_ROWS).toFixed(2);
    const col = r === 3 ? '#000' : '@p(#000, #000, transparent)';
    stops.push(`${col} ${a}% ${b}%`);
  }
  return `linear-gradient(180deg, ${stops.join(', ')}) ${pos} 0 / 50% 100% no-repeat`;
};
const TAPE_HOLES = `radial-gradient(circle closest-side, transparent 60%, #000 60%) 0 0 / 50% ${(100 / TAPE_ROWS).toFixed(3)}%`;
// the feed track, in cell coordinates: the tape runs 16-84%, row 3 of 6
const FEED = (() => {
  const top = 16 + (68 * 3) / TAPE_ROWS;
  const h = 68 / TAPE_ROWS;
  return [
    `linear-gradient(180deg, #000 0 ${pct(top)}, transparent ${pct(top)} ${pct(top + h)}, #000 ${pct(top + h)})`,
    `radial-gradient(circle closest-side, transparent 34%, #000 34%) 0 ${pct((top / (100 - h)) * 100)} / 50% ${pct(h)} repeat-x`,
  ].join(', ');
})();

add(
  'Paper Tape',
  'Strips of punched paper tape in pastel colors, one strip to a row, with a line of small feed holes and big data holes punched at random above and below it.',
  (c) => ({
    host: `--feed: ${FEED};`,
    rule: `${F} { ${msk('@var(--feed)')} ${B(`left: 0; right: 0; top: 16%; bottom: 16%; background: ${inkAt('y % 4', 4)}; mask: ${TAPE_HOLES}, ${tapeCol('0%')}, ${tapeCol('100%')};`)} }${TR}`,
  }),
  {
    palette: ['#23262C', '#F2D16B', '#EBA6B4', '#A6D6C8', '#F3EAD6'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['stripes', 'dots', 'circles'], mood: ['retro', 'technical'], density: 'medium', goodFor: ['section-divider', 'textile', 'card-texture'] },
  }
);

// -- K7 Dit Dah ----------------------------------------------------------------

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

// -- K8 Split Flap -------------------------------------------------------------
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
    meta: { tags: ['squares', 'circles', 'triangles', 'grid'], mood: ['technical', 'retro', 'bold'], density: 'dense', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);

// -- K9 Signal Flags ---------------------------------------------------------
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
    meta: { tags: ['crosses', 'squares', 'triangles', 'stripes'], mood: ['bold', 'festive', 'playful'], density: 'dense', goodFor: ['poster', 'packaging', 'textile'] },
  }
);

// -- K10 Hazard ----------------------------------------------------------------
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

// -- K11 Bar Chart -------------------------------------------------------------
// Three series as grouped bars over a baseline, every series' height a smooth
// field of its own, so each one trends across the row while the others wander.
const barH = (k) => `$(max(7, min(80, h${k})))`;
const barPosY = (k) => `$((89.5 - max(7, min(80, h${k}))) / (100 - max(7, min(80, h${k}))) * 100)%`;

add(
  'Bar Chart',
  'Rows of grouped bar charts, three bars to a group in three inks standing on a ruled baseline, each series rising and falling in a smooth trend across the sheet.',
  (c) => ({
    rule: `${F} { --h1: @calc(${noise(-25, 120, 1.6)} + @r(-6, 6)); --h2: @calc(${noise(-25, 120, 1.4)} + @r(-6, 6)); --h3: @calc(${noise(-25, 120, 1.8)} + @r(-6, 6)); background: linear-gradient(var(--color4), var(--color4)) 0 90% / 100% 2.6% no-repeat, linear-gradient(@p(var(--color1)), var(--color1)) 15.79% ${barPosY(1)} / 21% ${barH(1)}% no-repeat; ${B(`left: 39.5%; width: 21%; bottom: 10.5%; height: ${barH(2)}%; background: @p(var(--color2));`)} ${A(`left: 64%; width: 21%; bottom: 10.5%; height: ${barH(3)}%; background: @p(var(--color3));`)} }${TR}`,
  }),
  {
    palette: ['#F6F2E9', '#E4572E', '#29335C', '#F3A712', '#8C8A84'],
    grid: '8x6',
    tg: '6x6',
    meta: { tags: ['blocks', 'stripes', 'lines'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['hero-background', 'poster', 'section-divider'] },
  }
);

// -- K12 Pie Chart -------------------------------------------------------------

add(
  'Pie Chart',
  'A sheet of pie and donut charts, each split into three slices in the same three inks at its own proportions and turned to its own angle.',
  (c) => ({
    rule: `${F} { --a1: @r(40, 150); --a2: @r(60, 150); background: @p(var(--color3)); ${cp('circle(43% at 50% 50%)')} ${msk('@p(linear-gradient(#000, #000), radial-gradient(circle closest-side, transparent 50%, #000 50%))')} ${tf('rotate(@r(0deg, 360deg))')} ${B(`inset: 0; background: @p(var(--color2)); ${msk('conic-gradient(#000 0 $(a1 + a2)deg, transparent $(a1 + a2)deg)')}`)} ${A(`inset: 0; background: @p(var(--color1)); ${msk('conic-gradient(#000 0 $(a1)deg, transparent $(a1)deg)')}`)} }${TR}`,
  }),
  {
    palette: ['#F4EFE4', '#E4572E', '#29335C', '#76B5A8'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'radial', 'rings'], mood: ['technical', 'playful'], density: 'medium', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);


// -- K13 Equalizer -------------------------------------------------------------
// One meter to a cell: a column of dim segments, lit from the bottom to a level
// that follows a smooth spectrum across the row, green, then amber, then red.
const EQ_SEG = 'repeating-linear-gradient(180deg, transparent 0 1.6%, #000 1.6% 10.9%, transparent 10.9% 12.5%)';

add(
  'Equalizer',
  'A wall of graphic equalizer meters, each a column of square segments lit green, then amber, then red to a level that rises and falls across the spectrum.',
  (c) => ({
    rule: `${F} { --n: @calc(${noise(-3, 12, 1.5)} + @r(-1.2, 1.2)); ${B(`left: 19%; right: 19%; top: 0; bottom: 0; background: @p(var(--color4)); ${msk(EQ_SEG)}`)} ${A(`left: 19%; right: 19%; top: 0; bottom: 0; background: linear-gradient(0deg, var(--color1) 0 50%, var(--color2) 50% 75%, var(--color3) 75%); ${msk(EQ_SEG)} ${cp('inset($(12.5 * (8 - max(1, min(8, round(n)))))% 0% 0% 0%)')}`)} }${TR}`,
  }),
  {
    palette: ['#0F1218', '#3DDC97', '#F5D547', '#FF5E57', '#283140'],
    grid: '10x6',
    tg: '6x6',
    meta: { tags: ['squares', 'blocks', 'grid'], mood: ['technical', 'retro', 'bold'], density: 'dense', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

// -- K14 Cardiograph -----------------------------------------------------------
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
  P(stroke(pts, 2.6).map(([x, y]) => [((x + 20) / 140) * 100, y]));
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

// -- K15 Manometer -------------------------------------------------------------
const TICKS = (() => {
  const s = [];
  for (let k = 0; k <= 10; k++) {
    const a = 27 * k;
    s.push(`#000 ${a}deg ${a + 3}deg`, `transparent ${a + 3}deg ${a + 27}deg`);
  }
  return `conic-gradient(from 223.5deg, ${s.slice(0, -1).join(', ')}, transparent 273deg 360deg)`;
})();
const NEEDLE = P([
  ...curve((t) => [50 + 6 * Math.sin(t + Math.PI * 0.62), 50 - 6 * Math.cos(t + Math.PI * 0.62)], 18).slice(0, 14),
  [51.4, 50],
  [50, 15],
  [48.6, 50],
]);

add(
  'Manometer',
  'A panel of pressure gauges: cream dials ringed in grey with a green band and a red band, ticked round three quarters, each needle swung to its own reading.',
  (c) => ({
    host: `--ticks: ${TICKS};`,
    rule: `${F} { ${cp('circle(46% at 50% 50%)')} background: radial-gradient(circle closest-side, @p(var(--color1)) 76%, transparent 76%), conic-gradient(from 225deg, var(--color5) 0 120deg, var(--color2) 120deg 200deg, var(--color3) 200deg 270deg, var(--color2) 270deg); ${B(`inset: 0; background: var(--color4); ${mskI('@var(--ticks)', 'radial-gradient(circle closest-side, transparent 58%, #000 58% 70%, transparent 70%)')}`)} ${A(`inset: 0; background: @p(var(--color4), var(--color3)); ${cp(NEEDLE)} ${tf(`rotate(@calc(-128 + 256 * max(0, min(1, ${noise(-0.4, 1.4, 1.3)}))) deg)`)}`)} }${TR}`,
  }),
  {
    palette: ['#22313A', '#ECE6D6', '#7D8E95', '#D9572B', '#1D2326', '#5E9C76'],
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['circles', 'radial', 'rings', 'lines'], mood: ['technical', 'retro'], density: 'medium', goodFor: ['poster', 'og-image', 'packaging'] },
  }
);

// -- K16 Radar Sweep -----------------------------------------------------------
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
    meta: { tags: ['circles', 'radial', 'rings', 'crosses'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['poster', 'og-image', 'hero-background'] },
  }
);

// -- K17 Lissajous -------------------------------------------------------------
const LISSA = [
  [1, 2, Math.PI / 4],
  [3, 2, Math.PI / 2],
  [3, 4, Math.PI / 4],
  [5, 4, Math.PI / 2],
  [1, 1, Math.PI / 3],
].map(([a, b, d]) =>
  P(stroke(curve((t) => [50 + 46 * Math.sin(a * t + d), 50 + 46 * Math.sin(b * t)], 300), 2.4, true))
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

// -- K18 Candlestick -------------------------------------------------------------
const candle = (k) =>
  `polygon(46% $(c${k} - h${k} - u${k})%, 54% $(c${k} - h${k} - u${k})%, 54% $(c${k} - h${k})%, 84% $(c${k} - h${k})%, 84% $(c${k} + h${k})%, 54% $(c${k} + h${k})%, 54% $(c${k} + h${k} + d${k})%, 46% $(c${k} + h${k} + d${k})%, 46% $(c${k} + h${k})%, 16% $(c${k} + h${k})%, 16% $(c${k} - h${k})%, 46% $(c${k} - h${k})%)`;
const candleVars = (k) =>
  `--c${k}: $(max(28, min(72, m)) + @r(-10, 10)); --h${k}: @r(3, 12); --u${k}: @r(2, 12); --d${k}: @r(2, 12);`;

add(
  'Candlestick',
  'Rows of candlestick charts on a dark screen: teal and red bodies with thin wicks above and below, drifting up and down with a smooth trend.',
  (c) => ({
    rule: `${F} { --m: ${noise(-10, 110, 1.6)}; ${candleVars(1)} ${candleVars(2)} background: repeating-linear-gradient(180deg, transparent 0 24%, var(--color3) 24% 25%); ${B(`left: 8%; width: 38%; top: 0; bottom: 0; background: @p(var(--color1), var(--color2)); ${cp(candle(1))}`)} ${A(`left: 54%; width: 38%; top: 0; bottom: 0; background: @p(var(--color1), var(--color2)); ${cp(candle(2))}`)} }${TR}`,
  }),
  {
    palette: ['#0E1621', '#2BC4A0', '#F2545B', '#26384A'],
    grid: '8x10',
    tg: '8x8',
    meta: { tags: ['lines', 'blocks', 'stripes'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['hero-background', 'poster', 'og-image'] },
  }
);

// -- K19 Imposition --------------------------------------------------------------
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
  return L.join(', ');
})();
const CARDS = [
  'linear-gradient(#000, #000)',
  'radial-gradient(circle at 74% 30%, transparent 17%, #000 17%)',
  'linear-gradient(180deg, #000 0 56%, transparent 56% 70%, #000 70%)',
  'linear-gradient(90deg, #000 0 38%, transparent 38%), radial-gradient(circle at 72% 50%, #000 22%, transparent 22%)',
  'linear-gradient(135deg, #000 0 50%, transparent 50%)',
];

add(
  'Imposition',
  'A press sheet of printed cards before trimming: bold modernist cards in four inks, each with crop marks at its corners in the gutters.',
  (c) => ({
    host: `--crop: ${CROP}; ${CARDS.map((m, i) => `--m${i}: ${m};`).join(' ')}`,
    rule: `${F} { ${B(`inset: 0; background: @p(var(--color1)); ${msk('@var(--crop)')}`)} ${A(`inset: 17%; background: ${ink(c, 2)}; ${msk(`@p(${CARDS.map((_, i) => `@var(--m${i})`).join(', ')})`)} ${tf('rotate(@p(0deg, 90deg, 180deg, 270deg))')}`)} }${TR}`,
  }),
  {
    pal: 4,
    grid: '5x7',
    tg: '5x5',
    meta: { tags: ['squares', 'circles', 'lines', 'grid'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['poster', 'packaging', 'card-texture'] },
  }
);

export const sectionK = { title: 'K. Press', all };
