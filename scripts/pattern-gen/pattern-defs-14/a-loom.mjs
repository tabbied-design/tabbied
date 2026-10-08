// A. Loom - woven cloth: a check and a stripe.
//
//   checks    Vichy
//   stripes   Regimental
//
// Cloth runs across the sheet, so these keep an ink for a whole diagonal or
// the whole sheet (the pickers below) rather than rolling one per cell: a
// warp thread is one color from selvedge to selvedge. Crossings (the
// gingham's) are translucent layers, the one way an ink can be mixed here.
import { section, F, TR, B, A, msk, rot } from './shared.mjs';

const { add, all } = section('A. Loom');

// -- picking inks that hold together across the sheet -----------------------
// css-doodle composes the cells in reading order with one shared context, and
// @pd() shuffles its arguments once per call site and then deals them out by
// a counter that counts cells. So a list @X - 1 long hands every cell of an
// anti-diagonal the same ink (byDiagonal), and a list one item long is a
// constant for the whole sheet (constant); a list exactly @X long would do the
// same down each column. Both are random per seed, so a reseed re-dyes the
// cloth. They are declared outside the gate, so every cell advances the
// counter and thinning the field never shifts a diagonal's ink.
//
// @var(--x) is written out as var(--x) and resolved by the browser, so a
// property chosen this way can be painted anywhere but never tested inside
// @match() or @calc(): those see only x, y and the other grid values.

/** 'var(--color1), ..., var(--colorN)' for the inks from..to (default all). */
const list = (c, from = 1, to = c - 1) => {
  const a = [];
  for (let i = from; i <= to; i++) a.push(`var(--color${i})`);
  return a.join(', ');
};
const byDiagonal = (c, from, to) => `@pd(@m(@calc(@X - 1), @p(${list(c, from, to)})))`;
const constant = (c, from, to) => `@pd(@p(${list(c, from, to)}))`;

/** A per-cell ink already chosen: still written as a pick, read once. */
const paint = (name) => `background-color: @p(@var(${name}));`;

/**
 * The gate as a switch, so position blocks may sit outside it. At frequency
 * 1 the package gates at 0.999, so about one cell in a thousand drops out.
 * Where the catalog preview's seed dropped one, the switch goes after the
 * design's own rolls: that moves the gate's roll along the sequence, and a
 * cell switched off still makes its rolls, so the cells after it keep theirs.
 */
const GATE = `visibility: hidden; ${F} { visibility: visible; }`;

// -- checks ------------------------------------------------------------------

add(
  'Vichy',
  'A two-color gingham: translucent warp and weft checks crossing to a third, deeper shade on a pale ground.',
  (c) => ({
    rule: `--g: ${constant(c)}; --h: ${constant(c)};
        ${B(`inset: 0; ${paint('--g')} opacity: .5; ${msk('repeating-linear-gradient(90deg, #000 0 25%, transparent 25% 50%)')}`)}
        ${A(`inset: 0; ${paint('--h')} opacity: .5; ${msk('repeating-linear-gradient(180deg, #000 0 25%, transparent 25% 50%)')}`)}
      ${GATE}${TR}`,
  }),
  {
    pal: 4,
    inks: 3,
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['checkerboard', 'squares', 'grid'], mood: ['calm', 'playful'], density: 'medium', goodFor: ['textile', 'packaging', 'card-texture'] },
  }
);

// -- stripes -----------------------------------------------------------------

add(
  'Regimental',
  'Repp stripes raked on the bias, each broad band its own color, with a fine contrasting line running between every pair.',
  (c) => ({
    rule: `--d: ${byDiagonal(c, 1, c - 2)}; ${F} {
        ${B(`left: -25%; width: 150%; top: 34%; height: 32%; ${paint('--d')} ${rot('-45deg')}`)}
        ${A(`left: -25%; width: 150%; top: 12.6%; height: 74.8%; background-color: var(--color${c - 1}); ${msk('linear-gradient(180deg, #000 0 5.3%, transparent 5.3% 94.7%, #000 94.7%)')} ${rot('-45deg')}`)}
      }${TR}`,
  }),
  {
    palette: ['#14213D', '#8E2D3A', '#2F6B4F', '#C9A227', '#5C7FA8', '#EDE3CF'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['stripes', 'diagonals', 'lines'], mood: ['elegant', 'retro'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

export const sectionA = { title: 'A. Loom', all };
