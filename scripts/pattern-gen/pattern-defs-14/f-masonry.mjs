// F. Masonry - floors, walls and roofs: bonds, parquet, shingles, screens and tracery.
import { section, F, TR, B, A, ink, cp, msk, mskI, slabLin } from './shared.mjs';

const { add, all } = section('F. Masonry');

// -- local helpers -------------------------------------------------------------

const n3 = (v) => +(+v).toFixed(3);
const pc = (v) => `${n3(v)}%`;
const SQ2 = Math.SQRT2;
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
 * Points given in cell percent, re-expressed in the own percent of a square
 * box of side s (cell percent) centered at (cx, cy) and turned by deg. An
 * element turned that way can cut a diagonal joint with an axis-aligned mask
 * (a hard diagonal gradient edge would be drawn aliased).
 */
const localPts = (pts, cx, cy, s, deg) => {
  const t = (deg * Math.PI) / 180;
  const [c, sn] = [Math.cos(t), Math.sin(t)];
  return pts.map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    return [50 + ((dx * c + dy * sn) / s) * 100, 50 + ((-dx * sn + dy * c) / s) * 100];
  });
};
/** The box and turn that go with localPts(). */
const turnedBox = (cx, cy, s, deg) => `${box(cx - s / 2, cy - s / 2, s, s)} transform: rotate(${deg}deg);`;

/** An elliptical hole (radii in percent of the box) - everything else kept. */
const holeL = (cx, cy, rx, ry) =>
  `radial-gradient(${pc(rx)} ${pc(ry)} at ${pc(cx)} ${pc(cy)}, transparent 100%, #000 100%)`;

/** A regular star polygon: n points, outer and inner radius in percent. */
const starPoly = (n, outer, inner, turn = -90) =>
  polyOf(
    Array.from({ length: 2 * n }, (_, i) => {
      const a = ((turn + (i * 180) / n) * Math.PI) / 180;
      const r = i % 2 ? inner : outer;
      return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
    })
  );

/** A conic mask of n equal hard-stop slots, each `duty` of its share. */
const slotsConic = (n, duty, from = 0) => {
  const step = 360 / n;
  const stops = [];
  for (let k = 0; k < n; k++) {
    const a = n3(k * step);
    const b = n3(k * step + duty * step);
    const e = n3((k + 1) * step);
    stops.push(`#000 ${a}deg ${b}deg`, `transparent ${b}deg ${e}deg`);
  }
  return `conic-gradient(from ${from}deg at 50% 50%, ${stops.join(', ')})`;
};

// -- walls -----------------------------------------------------------------------

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

// Breeze block: a square concrete screen block pierced with four petals that
// point at its corners and a round eye in the middle, so the petals of four
// blocks meet as a flower at every joint. The block is a box turned 45deg
// (the petals are then upright ellipses in its mask) clipped back to square.
const BREEZE = (() => {
  const S = 100 * SQ2;
  const j = 2.6;
  const clip = polyOf(localPts([[j, j], [100 - j, j], [100 - j, 100 - j], [j, 100 - j]], 50, 50, S, 45));
  const holes = [
    holeL(22, 50, 12.5, 6.2),
    holeL(78, 50, 12.5, 6.2),
    holeL(50, 22, 6.2, 12.5),
    holeL(50, 78, 6.2, 12.5),
    holeL(50, 50, 8.5, 8.5),
  ];
  return { box: turnedBox(50, 50, S, 45), clip, holes: holes.join(', ') };
})();

add(
  'Breeze Block',
  'Mid-century concrete screen blocks pierced with four petals and a round eye, the petals of neighboring blocks meeting as flowers at every joint.',
  (c) => ({
    host: `--bc: ${BREEZE.clip}; --bh: ${BREEZE.holes};`,
    rule: `${F} {
      ${B(`${BREEZE.box} background: ${inkOf(1, 1, 2, 2, 3, 4)}; ${cp('@var(--bc)')} ${mskI('@var(--bh)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#263A3A', '#ECE5D3', '#E0D7C1', '#F4EFE3', '#E9B44C'],
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['petals', 'squares', 'grid', 'circles'], mood: ['retro', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// Diamond point: rusticated blocks cut as low pyramids. Light falls from the
// top, so a block that stands proud has a bright upper facet; a cell turned
// half a turn reads as a block sunk into the wall. Noise decides which, so
// the wall is carved in broad swells.
add(
  'Diamond Point',
  'Blocks cut as low four-sided pyramids like the Palazzo dei Diamanti, lit from above, with broad patches sunk where the rest stand proud.',
  (c) => ({
    rule: `${F} {
      --turn: @calc(round(@rn(0, 1, 2)) * 180)deg;
      background: conic-gradient(from 225deg at 50% 50%, var(--color2) 0 90deg, transparent 90deg), ${inkOf(3)};
      ${cp('inset(3%)')}
      transform: rotate(@var(--turn));
      ${B(`inset: 0; background: ${inkOf(1)}; ${cp(polyOf([[0, 0], [100, 0], [50, 50]]))}`)}
      ${A(`inset: 0; background: ${inkOf(4, 5)}; ${cp(polyOf([[0, 100], [100, 100], [50, 50]]))}`)}
    }${TR}`,
  }),
  {
    palette: ['#2B2622', '#F2E6D0', '#D9C6A5', '#B89E78', '#7E6A50', '#6F5C45'],
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'squares', 'grid'], mood: ['bold', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'poster', 'packaging'] },
  }
);

// Glass block: a pressed-glass brick with a pillowed face rippled in rings,
// lit unevenly from behind so some of the wall glows.
add(
  'Glass Block',
  'A wall of pressed glass blocks, each pillowed face rippled with concentric rings and lit unevenly from behind.',
  (c) => ({
    rule: `${F} {
      background: ${inkOf(1, 2)};
      ${cp('inset(3.5% round 7%)')}
      ${B(`inset: 12%; border-radius: 9%; background: ${inkOf(3, 4)}; opacity: @rn(.35, 1);`)}
      ${A(`inset: 12%; border-radius: 9%; background: ${inkOf(5)}; ${msk('repeating-radial-gradient(circle at 50% 50%, #000 0 7%, transparent 7% 14%)')} opacity: .55;`)}
    }${TR}`,
  }),
  {
    palette: ['#14202B', '#7FA7B8', '#6C97A8', '#CDE7EE', '#A9D4DE', '#F4FBFC'],
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'concentric', 'grid', 'rings'], mood: ['calm', 'retro'], density: 'dense', goodFor: ['wallpaper', 'hero-background', 'card-texture'] },
  }
);

// -- paving ----------------------------------------------------------------------

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
      ${A(`inset: 6%; background: ${ink(c)}; border-radius: @var(--rd); transform: @var(--t);`)}
      ${B(`top: 6%; bottom: 6%; left: -94%; width: @match(x == 1, 88%, 0); background: ${ink(c)}; border-radius: @var(--rd); transform: @var(--t);`)}
    }${TR}`,
  }),
  {
    pal: 30,
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

// Tactile paving: blister slabs and corduroy slabs, every raised dome or bar
// with its shadow cast down and to the right.
const TACT = {
  dots: 'radial-gradient(circle closest-side, #000 62%, transparent 62%) 0 0 / 25% 25%',
  bars: 'linear-gradient(180deg, transparent 30%, #000 30% 70%, transparent 70%) 0 0 / 100% 25%',
};

add(
  'Tactile Paving',
  'Tactile paving slabs, some studded with rows of blister domes and some ribbed with corduroy bars, each raised mark casting a small shadow.',
  (c) => ({
    host: `--td: ${TACT.dots}; --tb: ${TACT.bars};`,
    rule: `${F} {
      --m: @p(@var(--td), @var(--td), @var(--tb));
      background: ${inkOf(1, 2)};
      ${cp('inset(3%)')}
      ${B(`inset: 9%; background: ${inkOf(3)}; opacity: .45; ${msk('@var(--m)')} transform: translate(2.5%, 3%);`)}
      ${A(`inset: 9%; background: ${inkOf(4, 5)}; ${msk('@var(--m)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#8D8A84', '#F2C230', '#E8B21E', '#7A5A10', '#FFE07A', '#F7D25A'],
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['dots', 'squares', 'stripes', 'grid'], mood: ['bold', 'technical'], density: 'dense', goodFor: ['wallpaper', 'poster', 'packaging'] },
  }
);

// -- floors ----------------------------------------------------------------------

// Point de Hongrie: chevron parquet, two planks meeting on the cell's center
// line in a V. A plank is a cell tall and slants half a cell down, so it runs
// into the cell below; each side draws its own plank and the one running in
// from above, and the twin lands exactly on the plank the cell above drew.
// The side is a box turned 45deg, so the joint between the two planks is an
// axis-aligned band in its mask and the miter cuts are its clip-path.
const HONGRIE = (() => {
  const jm = 1.4;
  const g = 1.8;
  const S = 224;
  const left = [
    [jm, jm - 100 + g],
    [50 - jm, 50 - jm - 100 + g],
    [50 - jm, 50 - jm + 100 - g],
    [jm, jm + 100 - g],
  ];
  const right = left.map(([x, y]) => [100 - x, y]);
  const hw = (g / SQ2 / S) * 100;
  const joint = `linear-gradient(180deg, #000 ${pc(50 - hw)}, transparent ${pc(50 - hw)} ${pc(50 + hw)}, #000 ${pc(50 + hw)})`;
  return {
    lBox: turnedBox(25, 25, S, 45),
    rBox: turnedBox(75, 25, S, -45),
    lClip: polyOf(localPts(left, 25, 25, S, 45)),
    rClip: polyOf(localPts(right, 75, 25, S, -45)),
    joint,
  };
})();

add(
  'Hongrie',
  'Point de Hongrie parquet: planks mitered into stacked chevrons, every plank its own shade of oak, honey and walnut.',
  (c) => ({
    host: `--hl: ${HONGRIE.lClip}; --hr: ${HONGRIE.rClip}; --hj: ${HONGRIE.joint};`,
    rule: `${F} {
      ${B(`${HONGRIE.lBox} background: ${ink(c)}; ${cp('@var(--hl)')} ${msk('@var(--hj)')}`)}
      ${A(`${HONGRIE.rBox} background: ${ink(c)}; ${cp('@var(--hr)')} ${msk('@var(--hj)')}`)}
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

// Parquet de Versailles: a framed panel with a diagonal lattice laid in its
// field. The lattice is a box turned 45deg so its strips are axis-aligned
// bands, clipped back to the square field inside the frame. Field, frame and
// lattice draw from separate inks so they never vanish into each other.
const VERSAILLES = (() => {
  const f = 13;
  const S = 100 * SQ2;
  const h = 50 - f;
  const corners = [[f, f], [100 - f, f], [100 - f, 100 - f], [f, 100 - f]];
  const clip = polyOf(localPts(corners, 50, 50, S, 45));
  const d = (h / SQ2 / S) * 100;
  const w = 2.4;
  const lines = [50 - d, 50 - d / 2, 50, 50 + d / 2, 50 + d];
  const band = (angle) => {
    const stops = ['transparent 0'];
    for (const p of lines) {
      const half = p === 50 || Math.abs(p - 50) > d * 0.9 ? w : w * 0.6;
      stops.push(`transparent ${pc(p - half)}`, `#000 ${pc(p - half)} ${pc(p + half)}`, `transparent ${pc(p + half)}`);
    }
    return `linear-gradient(${angle}, ${stops.join(', ')})`;
  };
  const frame = ['90deg', '270deg', '180deg', '0deg'].map((a) => slabLin(a, `${f - 2}%`)).join(', ');
  return { lBox: turnedBox(50, 50, S, 45), clip, lattice: `${band('90deg')}, ${band('180deg')}`, frame };
})();

add(
  'Versailles',
  'Parquet de Versailles: square panels, each framed by a border of boards and crossed by a diagonal lattice with a diamond at its heart.',
  (c) => ({
    host: `--vc: ${VERSAILLES.clip}; --vl: ${VERSAILLES.lattice}; --vf: ${VERSAILLES.frame};`,
    rule: `${F} {
      --fd: ${inkOf(1, 3)};
      background: linear-gradient(@var(--fd), @var(--fd)) 50% 50% / 97% 97% no-repeat;
      ${B(`inset: 1.5%; background: ${inkOf(2, 5)}; ${msk('@var(--vf)')}`)}
      ${A(`${VERSAILLES.lBox} background: ${inkOf(2, 4)}; ${cp('@var(--vc)')} ${msk('@var(--vl)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#2B1D14', '#D6A86A', '#9C6A3C', '#E8C48E', '#6E4426', '#B9844F'],
    grid: '4x6',
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['squares', 'diamonds', 'lattice', 'grid'], mood: ['elegant', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// Encaustic cement tiles. The corners of each tile carry a quarter of a
// banded medallion and the edges half a fan, so four tiles complete each
// medallion. A medallion's colors are a function of the grid point it sits
// on, so all four tiles agree on it; the star at each tile's heart is the
// tile's own.
const ENC = (() => {
  const idx = (px, py, k) => `((${px}) * ${k[0]} + (${py}) * ${k[1]} + (${px}) * (${py}) * ${k[2]}) % 3`;
  const pick = (expr, slots) =>
    `@match(${expr} == 0, var(--color${slots[0]}), ${expr} == 1, var(--color${slots[1]}), var(--color${slots[2]}))`;
  const corner = (at, px, py) => {
    const a = pick(idx(px, py, [5, 7, 1]), [3, 4, 5]);
    const b = pick(idx(px, py, [2, 1, 3]), [4, 5, 3]);
    return `radial-gradient(circle farthest-side at ${at}, ${a} 0 15%, transparent 15% 20%, var(--color2) 20% 25%, transparent 25% 29%, ${b} 29% 35%, transparent 35%)`;
  };
  const fan = (at) => `radial-gradient(circle farthest-side at ${at}, var(--color2) 0 9%, transparent 9%)`;
  return [
    corner('0 0', 'x - 1', 'y - 1'),
    corner('100% 0', 'x', 'y - 1'),
    corner('0 100%', 'x - 1', 'y'),
    corner('100% 100%', 'x', 'y'),
    fan('50% 0'),
    fan('50% 100%'),
    fan('0 50%'),
    fan('100% 50%'),
  ].join(', ');
})();

add(
  'Encaustic',
  'Encaustic cement tiles: banded medallions completed across every four tiles, small fans on the edges and a star at the heart of each tile.',
  (c) => ({
    host: `--es: ${starPoly(8, 50, 27)};`,
    rule: `${F} {
      background: ${ENC}, ${inkOf(1, 1, 6)};
      ${B(`inset: 31%; background: ${inkOf(2, 3, 4)}; ${cp('@var(--es)')}`)}
      ${A(`inset: 45%; border-radius: 50%; background: ${inkOf(1, 5)};`)}
    }${TR}`,
  }),
  {
    palette: ['#E6DCC6', '#F2E8D2', '#283845', '#B5462F', '#2E6E6A', '#D9A23A', '#E7D9BB'],
    grid: '4x6',
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['circles', 'stars', 'concentric', 'grid'], mood: ['elegant', 'festive'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// -- roofs -------------------------------------------------------------------------

// Pantiles: an S-tile per cell, a round cover on the left lapping over the
// pan beside it. Each course hangs a quarter of a cell over the course below
// and sits above it, so the rows read as laid from the ridge down.
add(
  'Pantile',
  'A clay pantile roof: rounded covers and hollow pans side by side, every course lapping over the one below, shaded so the rolls stand out.',
  (c) => ({
    rule: `${F} {
      z-index: @calc(100 - @y);
      ${B(`left: 46%; top: 0; width: 54%; height: 121%; border-radius: 0 0 40% 40% / 0 0 12% 12%;
        background: linear-gradient(90deg, transparent 12%, var(--color1) 52%, transparent 92%), ${inkOf(2, 3, 4)};`)}
      ${A(`left: -6%; top: 0; width: 56%; height: 127%; border-radius: 0 0 50% 50% / 0 0 22% 22%;
        background: linear-gradient(90deg, var(--color1) 0, transparent 34% 70%, var(--color1) 100%), linear-gradient(90deg, transparent 32%, var(--color5) 48%, transparent 64%), ${inkOf(2, 3, 4)};`)}
    }${TR}`,
  }),
  {
    palette: ['#2A1A14', '#5E2A1C', '#C2603C', '#B04F31', '#D27A4F', '#F0B58A'],
    grid: '6x9',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['stripes', 'curves', 'scallops'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'card-texture'] },
  }
);

// -- openings and ornament -----------------------------------------------------

add(
  'Rose Window',
  'Gothic rose windows: a wheel of glass petals around a ring of roundels, a jewel at the hub, set in a dark stone wall.',
  (c) => ({
    host: `--rp: ${slotsConic(12, 0.62, -11.16)};`,
    rule: `${F} {
      background: radial-gradient(circle closest-side, transparent 88%, ${inkOf(1, 2)} 88% 96%, transparent 96%);
      ${B(`inset: 3%; background: ${ink(c)}; ${mskI('@var(--rp)', 'radial-gradient(circle closest-side, transparent 40%, #000 40% 89%, transparent 89%)')}`)}
      ${A(`inset: 33%; border-radius: 50%; background: ${ink(c)}; ${msk('radial-gradient(circle closest-side, #000 52%, transparent 52% 70%, #000 70%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#1D1A24', '#C9B98F', '#8E8064', '#2F5DA8', '#C2343C', '#E3A92B', '#3E8E6B'],
    grid: '4x6',
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['radial', 'circles', 'petals', 'rings'], mood: ['elegant', 'festive'], density: 'medium', goodFor: ['wallpaper', 'poster', 'packaging'] },
  }
);

// Balustrade: a turned baluster in every cell between a handrail and a
// plinth that run unbroken along the row. Alternate rows turn a different
// profile. The rails take one ink per row so they read as continuous.
const BALUSTERS = (() => {
  const body = (t0, t1, w0, w1, peak, belly, n = 18) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const u = i / n;
      const base = w0 + (w1 - w0) * u;
      return [t0 + (t1 - t0) * u, base + (belly - base) * Math.sin(Math.PI * Math.pow(u, peak))];
    });
  const vase = [
    [13, 21], [19, 21], [19, 8], [23, 8], [23, 13], [27, 13], [27, 7],
    ...body(27, 80, 7, 9, 1.6, 23).slice(1),
    [80, 9], [80, 14], [85, 14], [85, 21], [91, 21],
  ];
  const twin = [
    [13, 21], [19, 21], [19, 10], [24, 14], [24, 9],
    ...body(24, 52, 9, 7, 0.8, 17).slice(1),
    [52, 12], [55, 12], [55, 7],
    ...body(55, 83, 7, 9, 1.2, 17).slice(1),
    [83, 14], [86, 10], [86, 21], [91, 21],
  ];
  const outline = (prof) => {
    const right = prof.map(([t, w]) => [50 + w, t]);
    const left = [...prof].reverse().map(([t, w]) => [50 - w, t]);
    return polyOf([...right, ...left]);
  };
  return { vase: outline(vase), twin: outline(twin) };
})();

add(
  'Balustrade',
  'Rows of turned stone balusters, swelling vases and double-bellied spindles in turn, each row standing between a handrail and a plinth.',
  (c) => ({
    host: `--bv: ${BALUSTERS.vase}; --bt: ${BALUSTERS.twin};`,
    rule: `${F} {
      ${B(`inset: 0; background: @match(y % 2 == 1, var(--color1), var(--color2)); ${msk(
        'linear-gradient(180deg, transparent 2%, #000 2% 12%, transparent 12% 91%, #000 91%)'
      )}`)}
      ${A(`inset: 0; background: ${inkOf(3, 4, 5)}; ${cp('@match(y % 2 == 1, @var(--bv), @var(--bt))')}`)}
    }${TR}`,
  }),
  {
    palette: ['#33465A', '#E9DFC9', '#D8C9A7', '#F1E9D8', '#CDBB98', '#E2D4B4'],
    grid: '6x6',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['curves', 'stripes', 'grid'], mood: ['elegant', 'calm'], density: 'medium', goodFor: ['wallpaper', 'section-divider', 'packaging'] },
  }
);

// Egg and dart: the classical ovolo carving, an egg in its cup in every
// cell and a dart on every joint. The darts and the fillet above each run
// sit on the cell edges, half in each cell, so they take one fixed ink.
const DART = (x) => `conic-gradient(from 0deg at ${x} 97%, var(--color1) 0 4deg, transparent 4deg 356deg, var(--color1) 356deg)`;

add(
  'Egg and Dart',
  'Egg and dart molding run after run: ivory eggs held in terracotta cups, gilded darts between them and a gilded fillet over every course.',
  (c) => ({
    rule: `${F} {
      background: linear-gradient(180deg, var(--color1) 0 6%, transparent 6%), ${DART('0%')}, ${DART('100%')};
      ${B(`${box(12, 9, 76, 86)} border-radius: 50%; background: ${inkOf(4, 5)};
        ${msk('radial-gradient(closest-side, transparent 82%, #000 82%)')} ${cp('inset(30% 0 0 0)')}`)}
      ${A(`${box(24, 15, 52, 68)} border-radius: 50%; background: ${inkOf(2, 3)};`)}
    }${TR}`,
  }),
  {
    palette: ['#1F2B45', '#D8A84A', '#F0E7D4', '#E2D3B5', '#B5523B', '#99432F'],
    grid: '6x8',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['ovals', 'arcs', 'stripes'], mood: ['elegant', 'retro'], density: 'medium', goodFor: ['section-divider', 'wallpaper', 'packaging'] },
  }
);

export const sectionF = { title: 'F. Masonry', all };
