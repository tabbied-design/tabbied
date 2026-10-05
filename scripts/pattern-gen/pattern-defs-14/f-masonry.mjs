// F. Masonry - floors, walls and roofs: bonds, parquet, shingles, screens and tracery.
import { section, F, TR, B, A, ink, cp, msk, mskI, slabLin } from './shared.mjs';

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
const SQ2 = Math.SQRT2;

/**
 * Points given in cell percent, re-expressed in the own percent of a square
 * box of side s (cell percent) centered at (cx, cy) and turned by deg. An
 * element turned that way can cut a diagonal joint with an axis-aligned mask.
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

const rectsIn = (x0, y0, w, h, rects) => ({
  box: box(x0, y0, w, h),
  layers: rects
    .map(([x, y, rw, rh]) => rectL(((x - x0) / w) * 100, ((y - y0) / h) * 100, (rw / w) * 100, (rh / h) * 100))
    .join(', '),
});

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
    pal: 2,
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['blocks', 'lattice', 'grid'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'hero-background', 'card-texture'] },
  }
);

// Breeze block: a square concrete screen block pierced with a slotted ring,
// four spokes holding the middle boss.
add(
  'Breeze Block',
  'Mid-century concrete screen blocks, each pierced with a ring of four curved slots around a solid middle.',
  (c) => ({
    rule: `${F} {
      background: ${ink(c)};
      ${cp('inset(3%)')}
      ${msk(
        'radial-gradient(circle closest-side, #000 34%, transparent 34% 62%, #000 62%)',
        'linear-gradient(90deg, transparent 44%, #000 44% 56%, transparent 56%)',
        'linear-gradient(180deg, transparent 44%, #000 44% 56%, transparent 56%)'
      )}
    }${TR}`,
  }),
  {
    pal: 13,
    grid: '5x8',
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'rings', 'grid'], mood: ['retro', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile', 'packaging'] },
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
  const hw = ((g / SQ2) / S) * 100;
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
// bands, clipped back to the square field inside the frame.
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
  const frame = [slabLin('90deg', `${f - 2}%`), slabLin('270deg', `${f - 2}%`), slabLin('180deg', `${f - 2}%`), slabLin('0deg', `${f - 2}%`)].join(', ');
  return { lBox: turnedBox(50, 50, S, 45), clip, lattice: `${band('90deg')}, ${band('180deg')}`, frame };
})();

add(
  'Versailles',
  'Parquet de Versailles: square panels, each framed by a border of boards and crossed by a diagonal lattice with a diamond at its heart.',
  (c) => ({
    host: `--vc: ${VERSAILLES.clip}; --vl: ${VERSAILLES.lattice}; --vf: ${VERSAILLES.frame};`,
    rule: `${F} {
      --fd: ${ink(c)};
      background: linear-gradient(@var(--fd), @var(--fd)) 50% 50% / 97% 97% no-repeat;
      ${B(`inset: 1.5%; background: ${ink(c)}; ${msk('@var(--vf)')}`)}
      ${A(`${VERSAILLES.lBox} background: ${ink(c)}; ${cp('@var(--vc)')} ${msk('@var(--vl)')}`)}
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

// Crazy paving: flagstones broken into irregular polygons, each corner and
// edge pulled in by its own amount so the joints wander.
add(
  'Crazy Paving',
  'Crazy paving of broken flagstones, irregular many-sided slabs with joints that widen and narrow as they wander.',
  (c) => ({
    rule: `${F} {
      background: ${ink(c)};
      ${cp(`polygon(@r(1%, 9%) @r(1%, 9%), @r(30%, 70%) @r(0%, 6%), @r(91%, 99%) @r(1%, 9%), @r(94%, 100%) @r(30%, 70%), @r(91%, 99%) @r(91%, 99%), @r(30%, 70%) @r(94%, 100%), @r(1%, 9%) @r(91%, 99%), @r(0%, 6%) @r(30%, 70%))`)}
    }${TR}`,
  }),
  {
    pal: 33,
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['mosaic', 'blocks', 'grid'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'card-texture', 'textile'] },
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

// -- openings and ornament -----------------------------------------------------

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

export const sectionF = { title: 'F. Masonry', all };
