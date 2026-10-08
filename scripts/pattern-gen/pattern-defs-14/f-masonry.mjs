// F. Masonry - walls, screens and paving: bonds and stones.
//
// Walls and screens:  Flemish Bond, Hit and Miss, Subway Tile
// Paving and floors:  Cobblestone, Crazy Paving, Hongrie
//
// A piece laid across a cell edge (a brick in a shifted course, a stone in a
// staggered row) is drawn by the cell it starts in, and the sheet's first
// column also lays the piece that would have come in from outside it, so
// the left edge is never left with a gap. A cut both neighbors must agree on
// (where Crazy Paving breaks a square into two flagstones) is chosen by
// position rather than rolled.
import { section, F, TR, B, A, ink, cp, msk } from './shared.mjs';

const { add, all } = section('F. Masonry');

// -- local helpers -------------------------------------------------------------

const n3 = (v) => +(+v).toFixed(3);
const pc = (v) => `${n3(v)}%`;
/** A clip-path polygon from [x, y] pairs in percent of the box. */
const polyOf = (pts) => `polygon(${pts.map(([x, y]) => `${pc(x)} ${pc(y)}`).join(', ')})`;
/** One specific set of ink slots, picked at random per cell. */
const inkOf = (...slots) => `@p(${slots.map((s) => `var(--color${s})`).join(', ')})`;
/** A box given in percent of the cell. */
const box = (l, t, w, h) => `left: ${pc(l)}; top: ${pc(t)}; width: ${pc(w)}; height: ${pc(h)};`;

/**
 * A no-repeat rectangle as a mask layer: x, y, w, h in percent of the box the
 * mask is drawn in. A percentage position places the layer at
 * (box - layer) * p, so the position is converted from a left/top offset.
 */
const rectL = (x, y, w, h) => {
  const px = w >= 100 ? 0 : (x / (100 - w)) * 100;
  const py = h >= 100 ? 0 : (y / (100 - h)) * 100;
  return `linear-gradient(#000, #000) ${pc(px)} ${pc(py)} / ${pc(w)} ${pc(h)} no-repeat`;
};

/**
 * Rectangles given in cell percent, drawn in an element that spans
 * [x0, x0 + w] x [y0, y0 + h] of the cell: returns the element's box and the
 * mask layers re-expressed in its own percent.
 */
const rectsIn = (x0, y0, w, h, rects) => ({
  box: box(x0, y0, w, h),
  layers: rects
    .map(([x, y, rw, rh]) => rectL(((x - x0) / w) * 100, ((y - y0) / h) * 100, (rw / w) * 100, (rh / h) * 100))
    .join(', '),
});

/**
 * Several closed shapes (all wound the same way) as one polygon, joined by
 * zero-width seams from the first shape's first point; the nonzero fill
 * keeps every shape and their overlaps.
 */
const joined = (shapes) => {
  const home = shapes[0][0];
  const pts = [];
  shapes.forEach((sh, i) => {
    if (i > 0) pts.push(home);
    pts.push(...sh, sh[0]);
  });
  return polyOf(pts);
};

// -- walls and screens ------------------------------------------------------------

// Flemish bond: a stretcher and a header in every course, the header of one
// course centered on the stretcher below. A cell is one stretcher plus one
// header wide (three units) and four courses tall. Headers sit inside the
// cell; the shifted courses' stretchers run half a unit into the next cell,
// so each cell also draws the one running in from the left. The two overlap
// exactly and the later cell wins, which keeps every brick one color and
// covers the sheet's left edge.
const FLEMISH = (() => {
  const u = 100 / 3;
  const jx = 3.4;
  const jy = 3.4;
  const ch = 25;
  const heads = [];
  const strs = [];
  for (let r = 0; r < 4; r++) {
    const y = r * ch;
    const h = ch - jy;
    if (r % 2 === 0) {
      strs.push([0, y, 2 * u - jx, h]);
      heads.push([2 * u, y, u - jx, h]);
    } else {
      heads.push([0.5 * u, y, u - jx, h]);
      strs.push([1.5 * u, y, 2 * u - jx, h]);
      strs.push([-1.5 * u, y, 2 * u - jx, h]);
    }
  }
  const s = rectsIn(-1.5 * u, 0, 5 * u, 100, strs);
  const hd = rectsIn(0, 0, 100, 100, heads);
  return { sBox: s.box, sMask: s.layers, hMask: hd.layers };
})();

add(
  'Flemish Bond',
  'A brick wall in Flemish bond, stretchers and dark burnt headers alternating in every course so the headers line up into a diagonal diaper.',
  (c) => ({
    host: `--st: ${FLEMISH.sMask}; --hd: ${FLEMISH.hMask};`,
    rule: `${F} {
      ${A(`${FLEMISH.sBox} background: ${inkOf(3, 4, 5, 6)}; ${msk('@var(--st)')}`)}
      ${B(`inset: 0; background: ${inkOf(1, 2)}; ${msk('@var(--hd)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#D9D2C3', '#2E2224', '#4A2C26', '#B4533A', '#C76B45', '#9C4330', '#D9895E'],
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['blocks', 'grid', 'diamonds'], mood: ['calm', 'retro'], density: 'dense', goodFor: ['wallpaper', 'card-texture', 'textile'] },
  }
);

// Hit and miss: a honeycomb screen wall, every course laid with gaps a third
// of a brick wide and the next course's bricks bridging them.
const HONEY = (() => {
  const L = 64;
  const jy = 4;
  const ch = 25;
  const a = [];
  const b = [];
  for (let r = 0; r < 4; r++) {
    const y = r * ch;
    if (r % 2 === 0) a.push([0, y, L, ch - jy]);
    else {
      b.push([50, y, L, ch - jy]);
      b.push([-50, y, L, ch - jy]);
    }
  }
  const ea = rectsIn(0, 0, 100, 100, a);
  const eb = rectsIn(-50, 0, 50 + 50 + L, 100, b);
  return { aMask: ea.layers, bBox: eb.box, bMask: eb.layers };
})();

add(
  'Hit and Miss',
  'A honeycomb brick screen: each course laid with open gaps between the bricks, and the course above bridging every gap.',
  (c) => ({
    host: `--ha: ${HONEY.aMask}; --hb: ${HONEY.bMask};`,
    rule: `${F} {
      ${B(`inset: 0; background: ${ink(c)}; ${msk('@var(--ha)')}`)}
      ${A(`${HONEY.bBox} background: ${ink(c)}; ${msk('@var(--hb)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#24302F', '#C2623F', '#D98A5F', '#A9472F', '#E3B27E', '#8E3B2A'],
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['blocks', 'lattice', 'grid'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'hero-background', 'card-texture'] },
  }
);

// Subway tile: glazed tiles two courses to a cell in running bond, each with
// a gloss along its top edge and a shade along its foot. The second course
// draws its own tile and the one running in from the left (see Flemish).
const SUBWAY = (() => {
  const g = 2;
  const lo = -50 + g;
  const w = 200 - 2 * g;
  const cut = (x) => ((x - lo) / w) * 100;
  return {
    bBox: box(g, g, 100 - 2 * g, 50 - 2 * g),
    aBox: box(lo, 50 + g, w, 50 - 2 * g),
    joint: `linear-gradient(90deg, #000 ${pc(cut(50 - g))}, transparent ${pc(cut(50 - g))} ${pc(cut(50 + g))}, #000 ${pc(cut(50 + g))})`,
  };
})();
const GLAZE = 'linear-gradient(180deg, var(--color6) 0, transparent 34% 70%, var(--color1) 100%)';

add(
  'Subway Tile',
  'Glazed subway tiles in running bond, bottle greens and ivories with a gloss along each top edge and a shade along each foot.',
  (c) => ({
    host: `--sj: ${SUBWAY.joint};`,
    rule: `${F} {
      ${B(`${SUBWAY.bBox} background: ${GLAZE}, ${inkOf(2, 3, 4, 5)};`)}
      ${A(`${SUBWAY.aBox} background: ${GLAZE}, ${inkOf(2, 3, 4, 5)}; ${msk('@var(--sj)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#D6D0C4', '#2B4A42', '#3E7B6B', '#5E9C86', '#E9E1CC', '#A8CBBB', '#FBF8F0'],
    grid: '5x10',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['blocks', 'stripes', 'gradients', 'grid'], mood: ['calm', 'retro'], density: 'dense', goodFor: ['wallpaper', 'card-texture', 'textile'] },
  }
);

// -- paving and floors ------------------------------------------------------------

// Cobblestone: rounded stones laid in staggered courses. Every other row is
// shifted half a stone, and the first column of a shifted row lays one more
// stone in the gap that opens at the sheet's left edge.
add(
  'Cobblestone',
  'Rounded cobblestones laid in staggered courses, every stone a little different in shape, set and shade.',
  (c) => ({
    rule: `@y(even) { transform: translateX(50%); } ${F} {
      --t: translate(@r(-3%, 3%), @r(-3%, 3%)) rotate(@r(-6deg, 6deg));
      --rd: @r(28%, 48%) @r(28%, 48%) @r(28%, 48%) @r(28%, 48%) / @r(28%, 48%) @r(28%, 48%) @r(28%, 48%) @r(28%, 48%);
      ${A(`inset: 5%; background: radial-gradient(circle at 34% 28%, var(--color5) 0, transparent 58%), ${inkOf(1, 2, 3, 4)}; border-radius: @var(--rd); transform: @var(--t);`)}
      ${B(`top: 5%; bottom: 5%; left: -95%; width: @match(x == 1, 90%, 0); background: radial-gradient(circle at 34% 28%, var(--color5) 0, transparent 58%), ${inkOf(1, 2, 3, 4)}; border-radius: @var(--rd); transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    palette: ['#2E2A26', '#7A7166', '#8E8579', '#665F56', '#A2958A', '#C8BFB0'],
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['blocks', 'ovals', 'grid'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'card-texture', 'textile'] },
  }
);

// Crazy paving: each square of the sheet is broken into two flagstones along
// one of three cuts (chosen by position, so both stones agree on it), and the
// pair is turned and mirrored at random. Every outer corner is pulled in by
// its own amount, so the joints wander.
const CRAZY = (() => {
  const jit = (lo, hi) => `@r(${lo}%, ${hi}%)`;
  const TL = `${jit(1, 7)} ${jit(1, 7)}`;
  const TRc = `${jit(93, 99)} ${jit(1, 7)}`;
  const BR = `${jit(93, 99)} ${jit(93, 99)}`;
  const BL = `${jit(1, 7)} ${jit(93, 99)}`;
  const top = (x) => `${pc(x)} ${jit(1, 5)}`;
  const bot = (x) => `${pc(x)} ${jit(95, 99)}`;
  const rgt = (y) => `${jit(95, 99)} ${pc(y)}`;
  const at = (x, y) => `${pc(x)} ${pc(y)}`;
  const g = 2.2;
  const P = (...p) => `polygon(${p.join(', ')})`;
  return {
    b: [
      P(TL, top(40 - g), bot(60 - g), BL),
      P(TL, top(54 - 1.4 * g), rgt(60 + 1.4 * g), BR, BL),
      P(TL, top(30 - g), at(58 - g, 46), bot(44 - g), BL),
    ],
    a: [
      P(top(40 + g), TRc, BR, bot(60 + g)),
      P(top(54 + 1.4 * g), TRc, rgt(60 - 1.4 * g)),
      P(top(30 + g), TRc, BR, bot(44 + g), at(58 + g, 46)),
    ],
  };
})();
const crazyPick = (list) => {
  const k = '((x * 7 + y * 3) % 3)';
  return `@match(${k} == 0, ${list[0]}, ${k} == 1, ${list[1]}, ${list[2]})`;
};

add(
  'Crazy Paving',
  'Crazy paving of broken flagstones: irregular slabs cut every which way, with joints that widen and narrow as they wander.',
  (c) => ({
    rule: `${F} {
      transform: rotate(@p(0deg, 90deg, 180deg, 270deg)) scaleX(@p(1, -1));
      ${B(`inset: 0; background: ${ink(c)}; ${cp(crazyPick(CRAZY.b))}`)}
      ${A(`inset: 0; background: ${ink(c)}; ${cp(crazyPick(CRAZY.a))}`)}
    }${TR}`,
  }),
  {
    pal: 33,
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['mosaic', 'blocks', 'triangles'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'card-texture', 'textile'] },
  }
);

// Point de Hongrie: chevron parquet, two planks meeting on the cell's center
// line in a V. A plank is a cell tall and slants half a cell down, so it runs
// into the cell below; each side draws its own plank and the one running in
// from above, and the twin lands exactly on the plank the cell above drew.
// Both planks are one clip-path (joined by a zero-width seam), so every
// joint is a clipped edge rather than a mask band.
const HONGRIE = (() => {
  const jm = 1.4;
  const g = 1.8;
  const plank = (dy) => [
    [jm, jm + g + dy],
    [50 - jm, 50 - jm + g + dy],
    [50 - jm, 50 - jm + 100 - g + dy],
    [jm, jm + 100 - g + dy],
  ];
  // the element spans the cell and the row above it: y from -100 to 100
  const inBox = (pts) => pts.map(([x, y]) => [x, (y + 100) / 2]);
  const left = [plank(0), plank(-100)].map(inBox);
  const right = left.map((sh) => sh.map(([x, y]) => [100 - x, y]).reverse());
  return { box: box(0, -100, 100, 200), left: joined(left), right: joined(right) };
})();

add(
  'Hongrie',
  'Point de Hongrie parquet: planks mitered into stacked chevrons, every plank its own shade of oak, honey and walnut.',
  (c) => ({
    host: `--hl: ${HONGRIE.left}; --hr: ${HONGRIE.right};`,
    rule: `${F} {
      ${B(`${HONGRIE.box} background: ${ink(c)}; ${cp('@var(--hl)')}`)}
      ${A(`${HONGRIE.box} background: ${ink(c)}; ${cp('@var(--hr)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#3A281C', '#C8955A', '#A8743F', '#E0B47A', '#7A4E2D', '#B9824C'],
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['chevrons', 'zigzags', 'stripes'], mood: ['elegant', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'card-texture'] },
  }
);

export const sectionF = { title: 'F. Masonry', all };
