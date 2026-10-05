// K. Press - print, signal and data: screens, dithers, barcodes, flags, gauges and charts.
import { section, F, TR, ink, cp, msk, mskI, B, A, noise } from './shared.mjs';

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
  const H = 25.6; // rows overlap a hair, so no seam opens between them
  const layers = [];
  BAYER.forEach((row, j) => {
    if (!row.some((v) => v < L)) return;
    const stops = row
      .map((v, i) => `${v < L ? '#000' : 'transparent'} ${i * 25}% ${(i + 1) * 25}%`)
      .join(', ');
    const top = Math.min(100 - H, Math.max(0, j * 25 - 0.3));
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
    rule: `${F} { --t: ${noise(-11, 28, 1.1)}; --u: ${noise(0, 1, 0.6)}; background: @match($(u) < 0.5, @p(var(--color1)), @p(var(--color2))); ${msk(DITHER_PICK)} }${TR}`,
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
    rule: `${F} { --k: @calc((@x + @y) % 2); background: ${ink(c)}; border-radius: @match((x + y) % 2 == 1, 50%, 0); ${msk('@match((x + y) % 2 == 1, @var(--star), @var(--tgt))')} ${tf('rotate(@match((x + y) % 2 == 1, @r(0deg, 30deg), @p(0deg, 90deg)))')} ${B(`inset: @match((x + y) % 2 == 1, 43%, 33%); border-radius: 50%; background: ${ink(c)}; ${msk('@match((x + y) % 2 == 1, none, @var(--quad))')}`)} }${TR}`,
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
  `(${[9, 7, 8][j]} * (1.25 + sin(${X} * ${[0.9, 1.3, 0.7][j]} + p${j} + @y * ${[1.7, 2.3, 2.9][j]})))`;
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

export const sectionK = { title: 'K. Press', all };
