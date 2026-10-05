// F. Masonry - floors, walls and roofs: bonds, parquet, shingles, screens and tracery.
//
// Walls and screens:  Flemish Bond, Hit and Miss, Subway Tile, Fachwerk,
//                     Reticulatum, Diamond Point, Breeze Block, Glass Block,
//                     Brise Soleil
// Paving and floors:  Cobblestone, Crazy Paving, Tactile Paving, Manhole,
//                     Hongrie, Versailles, Encaustic
// Roofs and ceilings: Pantile, Slate, Coffered
// Openings, ornament: Rose Window, Lancet, Ablaq, Balustrade, Portico, Skyline
//
// Three constructions recur:
//
//   * A piece laid across a cell edge (a brick in a shifted course, a plank
//     slanting into the next row) is drawn by the cell it starts in, and the
//     same element also draws the piece running in from the neighbor. The
//     twin lands exactly on the piece the neighbor drew and the later cell
//     paints over it, so every piece keeps one color and the sheet's first
//     row or column is never left with a gap.
//   * A diagonal joint is cut by a box turned 45deg, in whose own space the
//     joint is an axis-aligned band (a hard diagonal gradient edge is drawn
//     aliased and fails parity); its outline is the box's clip-path.
//   * Something that sits on a cell edge or corner and must look the same
//     from both sides (a timber, a fin, a medallion, a pier) takes an ink
//     that is fixed, or a function of the grid point it sits on, so every
//     cell that draws a part of it agrees.
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

/** Clips a polygon to the axis-aligned box [x0, x1] x [y0, y1] (Sutherland-Hodgman). */
const clipToBox = (pts, x0, y0, x1, y1) => {
  const edges = [
    [(p) => p[0] >= x0, (a, b) => [x0, a[1] + ((b[1] - a[1]) * (x0 - a[0])) / (b[0] - a[0])]],
    [(p) => p[0] <= x1, (a, b) => [x1, a[1] + ((b[1] - a[1]) * (x1 - a[0])) / (b[0] - a[0])]],
    [(p) => p[1] >= y0, (a, b) => [a[0] + ((b[0] - a[0]) * (y0 - a[1])) / (b[1] - a[1]), y0]],
    [(p) => p[1] <= y1, (a, b) => [a[0] + ((b[0] - a[0]) * (y1 - a[1])) / (b[1] - a[1]), y1]],
  ];
  let out = pts;
  for (const [inside, cross] of edges) {
    const input = out;
    out = [];
    input.forEach((cur, i) => {
      const prev = input[(i + input.length - 1) % input.length];
      if (inside(cur)) {
        if (!inside(prev)) out.push(cross(prev, cur));
        out.push(cur);
      } else if (inside(prev)) out.push(cross(prev, cur));
    });
  }
  return out;
};

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

// Fachwerk: German timber framing. Posts and rails sit on the cell edges,
// half a timber in each cell, so the frame takes one ink; the braces inside
// (a single strut either way, a St Andrew's cross or a plain rail) are
// picked per panel, and every panel is plastered its own color.
const FACH = (() => {
  const h = 4.6;
  const d = h * SQ2;
  const slash = [[100 - d, 0], [100, 0], [100, d], [d, 100], [0, 100], [0, 100 - d]];
  const back = [[0, 0], [d, 0], [100, 100 - d], [100, 100], [100 - d, 100], [0, d]];
  const cross = [
    [d, 0], [50, 50 - d], [100 - d, 0], [100, 0], [100, d], [50 + d, 50], [100, 100 - d], [100, 100],
    [100 - d, 100], [50, 50 + d], [d, 100], [0, 100], [0, 100 - d], [50 - d, 50], [0, d], [0, 0],
  ];
  const rail = [[0, 50 - h], [100, 50 - h], [100, 50 + h], [0, 50 + h]];
  const frame = ['90deg', '270deg', '180deg', '0deg'].map((a) => slabLin(a, `${h}%`)).join(', ');
  return { slash: polyOf(slash), back: polyOf(back), cross: polyOf(cross), rail: polyOf(rail), frame };
})();

add(
  'Fachwerk',
  'Half-timbered walls: dark posts and rails framing plastered panels in chalk, ochre and rose, braced with struts, crosses and rails.',
  (c) => ({
    host: `--f1: ${FACH.slash}; --f2: ${FACH.back}; --f3: ${FACH.cross}; --f4: ${FACH.rail}; --ff: ${FACH.frame};`,
    rule: `${F} {
      background: ${inkOf(3, 3, 4, 5, 6)};
      ${B(`inset: 0; background: var(--color1); ${msk('@var(--ff)')}`)}
      ${A(`inset: 0; background: ${inkOf(1, 2)}; ${cp('@p(@var(--f1), @var(--f2), @var(--f3), @var(--f3), @var(--f4))')}`)}
    }${TR}`,
  }),
  {
    palette: ['#EDE6D6', '#3A2B22', '#4C392C', '#F3EEE2', '#E7C77F', '#D9A7A0', '#C9D3C4'],
    grid: '5x7',
    min: 40,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['crosses', 'diagonals', 'grid', 'lattice'], mood: ['retro', 'organic'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// Opus reticulatum: square stones set on their points in a net, banded every
// third row by courses of thin Roman brick. The net is two turned boxes, so
// its stones are plain rectangles in their masks: one stone at the cell's
// heart, and the four on its corners, which neighbors draw too (exactly on
// top of each other, so each stone keeps one color).
const RETIC = (() => {
  const S = 216;
  const hs = 50 / SQ2 - 1.7;
  const sq = (cx, cy) => {
    const [[u, v]] = localPts([[cx, cy]], 50, 50, S, 45);
    const half = (hs / S) * 100;
    return rectL(u - half, v - half, 2 * half, 2 * half);
  };
  const corners = [sq(0, 0), sq(100, 0), sq(0, 100), sq(100, 100)].join(', ');
  const heart = sq(50, 50);
  const brick = (x, y, w, h, color) => rectL(x, y, w, h).replace('#000, #000', `${color}, ${color}`);
  const bricks = [];
  const courses = [[3, 0], [36.3, -25], [69.6, 0]];
  courses.forEach(([y, off], k) => {
    const color = k === 1 ? 'var(--color5)' : 'var(--color4)';
    for (let x = off; x < 100; x += 50) bricks.push(brick(x + 1.5, y, 47, 27.4, color));
  });
  return { box: turnedBox(50, 50, S, 45), corners, heart, bricks: bricks.join(', ') };
})();

add(
  'Reticulatum',
  'A Roman wall in opus reticulatum: square stones set on their points in a diagonal net, banded every few courses with thin red brick.',
  (c) => ({
    host: `--rc: ${RETIC.corners}; --rh: ${RETIC.heart}; --rb: ${RETIC.bricks};`,
    rule: `${F} {
      background: @match(y % 3 == 0, @var(--rb), none);
      ${B(`${RETIC.box} background: ${inkOf(1, 2, 3)}; ${msk('@var(--rh)')} opacity: @match(y % 3 == 0, 0, 1);`)}
      ${A(`${RETIC.box} background: ${inkOf(1, 2, 3)}; ${msk('@var(--rc)')} opacity: @match(y % 3 == 0, 0, 1);`)}
    }${TR}`,
  }),
  {
    palette: ['#5A4A3E', '#D8CBB0', '#C7B794', '#E6DCC6', '#A4452E', '#BF5B3A'],
    grid: '6x9',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['diamonds', 'lattice', 'blocks', 'stripes'], mood: ['calm', 'organic'], density: 'dense', goodFor: ['wallpaper', 'textile', 'card-texture'] },
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
    min: 40,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'squares', 'grid'], mood: ['bold', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'poster', 'packaging'] },
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
    holeL(20, 50, 15, 7.4),
    holeL(80, 50, 15, 7.4),
    holeL(50, 20, 7.4, 15),
    holeL(50, 80, 7.4, 15),
    holeL(50, 50, 9.5, 9.5),
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
    min: 40,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['petals', 'squares', 'grid', 'circles'], mood: ['retro', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
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
    min: 40,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'concentric', 'grid', 'rings'], mood: ['calm', 'retro'], density: 'dense', goodFor: ['wallpaper', 'hero-background', 'card-texture'] },
  }
);

// Brise soleil: a concrete egg-crate sunscreen. The fins sit on the cell
// edges (half in each cell, one ink); the panel behind each opening is
// painted its own color, and the fins' shadow falls across it in an L whose
// two arms are sized by two noise fields, as if the sun swung across the
// facade.
add(
  'Brise Soleil',
  'A concrete egg-crate sunscreen over panels painted in mid-century colors, the fins casting an L of shadow that deepens and thins across the facade.',
  (c) => ({
    host: `--bf: ${['90deg', '270deg', '180deg', '0deg'].map((a) => slabLin(a, '8%')).join(', ')};`,
    rule: `${F} {
      background: ${inkOf(2, 3, 4, 5)};
      ${B(`inset: 8%; background: ${inkOf(1)}; opacity: .45;
        ${msk('linear-gradient(#000, #000) 0 0 / 100% @rn(2%, 62%) no-repeat', 'linear-gradient(#000, #000) 0 0 / @rn(2%, 56%) 100% no-repeat')}`)}
      ${A(`inset: 0; background: var(--color6); ${msk('@var(--bf)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#EFE9DC', '#231F1C', '#E07A5F', '#3D7A8C', '#E9B44C', '#81B29A', '#F2EDE2'],
    grid: '5x7',
    min: 40,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'grid', 'blocks'], mood: ['retro', 'bold'], density: 'dense', goodFor: ['wallpaper', 'poster', 'packaging'] },
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
    palette: ['#5F5C57', '#F2C230', '#E8B21E', '#7A5A10', '#FFE07A', '#F7D25A'],
    grid: '5x8',
    min: 44,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['dots', 'squares', 'stripes', 'grid'], mood: ['bold', 'technical'], density: 'dense', goodFor: ['wallpaper', 'poster', 'packaging'] },
  }
);

// Manhole: cast-iron covers on a concrete pavement, each with its own raised
// tread - dots, squares, rings, ribs or bars - around a round boss.
const FULL = 'linear-gradient(#000, #000)';
const COVERS = {
  dots: `radial-gradient(circle closest-side, #000 58%, transparent 58%) 0 0 / 14.2857% 14.2857%, ${FULL}`,
  squares: 'linear-gradient(90deg, #000 70%, transparent 70%) 0 0 / 14.2857% 14.2857%, linear-gradient(180deg, #000 70%, transparent 70%) 0 0 / 14.2857% 14.2857%',
  rings: `repeating-radial-gradient(circle at 50% 50%, #000 0 6%, transparent 6% 12%), ${FULL}`,
  ribs: `${slotsConic(16, 0.45)}, ${FULL}`,
  bars: `linear-gradient(90deg, transparent 6%, #000 6% 16%, transparent 16% 26%, #000 26% 36%, transparent 36% 46%, #000 46% 56%, transparent 56% 66%, #000 66% 76%, transparent 76% 86%, #000 86% 96%, transparent 96%), ${FULL}`,
};

add(
  'Manhole',
  'Cast-iron manhole covers set in the pavement, each cast with its own tread of studs, squares, rings, ribs or bars around a round boss.',
  (c) => ({
    host: Object.entries(COVERS).map(([k, v]) => `--m${k}: ${v};`).join(' '),
    rule: `${F} {
      --m: @p(@var(--mdots), @var(--msquares), @var(--mrings), @var(--mribs), @var(--mbars));
      background: radial-gradient(circle closest-side, ${inkOf(1, 2)} 92%, transparent 92%);
      ${B(`inset: 12%; border-radius: 50%; background: ${inkOf(3, 4, 5)}; ${mskI('@var(--m)')}`)}
      ${A(`inset: 39%; border-radius: 50%; background: ${inkOf(1, 2)}; ${msk('radial-gradient(circle closest-side, #000 60%, transparent 60% 78%, #000 78%)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#C9C3B6', '#33373C', '#45403B', '#6E757D', '#8C6A4E', '#5A6470'],
    grid: '4x6',
    min: 50,
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['circles', 'dots', 'radial', 'grid'], mood: ['technical', 'bold'], density: 'medium', goodFor: ['wallpaper', 'poster', 'card-texture'] },
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

// Parquet de Versailles: a framed panel with a diagonal lattice laid in its
// field. Each lattice strip is a band clipped to the field square, and the
// strips are joined into one polygon (a clip-path edge is antialiased the
// way the exported SVG is; a hard mask edge on a turned box is not). Field,
// frame and lattice draw from separate inks so they never vanish into each
// other.
const VERSAILLES = (() => {
  const f = 13;
  const h = 50 - f;
  const w = 2.4 * SQ2;
  const strips = [];
  const band = (dir, c, half) => {
    // dir 1: the line x - y = c; dir -1: the line x + y = c
    const L = 400;
    const pts =
      dir === 1
        ? [[c - L + half, -L], [c + L + half, L], [c + L - half, L], [c - L - half, -L]]
        : [[c + L - half, -L], [c - L - half, L], [c - L + half, L], [c + L + half, -L]];
    const clipped = clipToBox(pts, f, f, 100 - f, 100 - f);
    if (clipped.length > 2) strips.push(clipped);
  };
  for (const k of [-1, -0.5, 0, 0.5, 1]) {
    const half = k === 0 || Math.abs(k) === 1 ? w : w * 0.6;
    band(1, k * h, half);
    band(-1, 100 + k * h, half);
  }
  const area = (pts) => pts.reduce((acc, p, i) => {
    const q = pts[(i + 1) % pts.length];
    return acc + p[0] * q[1] - q[0] * p[1];
  }, 0);
  const wound = strips.map((sh) => (area(sh) < 0 ? [...sh].reverse() : sh));
  const frame = ['90deg', '270deg', '180deg', '0deg'].map((a) => slabLin(a, `${f - 2}%`)).join(', ');
  return { lattice: joined(wound), frame };
})();

add(
  'Versailles',
  'Parquet de Versailles: square panels, each framed by a border of boards and crossed by a diagonal lattice with a diamond at its heart.',
  (c) => ({
    host: `--vl: ${VERSAILLES.lattice}; --vf: ${VERSAILLES.frame};`,
    rule: `${F} {
      --fd: ${inkOf(1, 3)};
      background: linear-gradient(@var(--fd), @var(--fd)) 50% 50% / 96% 96% no-repeat;
      ${B(`inset: 2%; background: ${inkOf(2, 5)}; ${msk('@var(--vf)')}`)}
      ${A(`inset: 0; background: ${inkOf(2, 4)}; ${cp('@var(--vl)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#2B1D14', '#D6A86A', '#9C6A3C', '#E8C48E', '#6E4426', '#B9844F'],
    grid: '4x6',
    min: 48,
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
    min: 48,
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['circles', 'stars', 'concentric', 'grid'], mood: ['elegant', 'festive'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// -- roofs and ceilings -----------------------------------------------------------

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
        background: linear-gradient(180deg, var(--color1) 0 21%, transparent 33%), linear-gradient(90deg, transparent 14%, var(--color1) 52%, transparent 90%), ${inkOf(2, 3, 4)};`)}
      ${A(`left: -6%; top: 0; width: 56%; height: 127%; border-radius: 0 0 50% 50% / 0 0 22% 22%;
        background: linear-gradient(180deg, var(--color1) 0 20%, transparent 31%), linear-gradient(90deg, var(--color1) 0, transparent 32% 72%, var(--color1) 100%), linear-gradient(90deg, transparent 38%, var(--color5) 47%, transparent 56%), ${inkOf(2, 3, 4)};`)}
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

// Slate: courses of slates, each hanging a quarter of a cell over the one
// below and sitting above it, every other course shifted half a slate (the
// first column of a shifted row lays an extra slate at the edge). Most
// slates have their lower corners clipped; every fourth course is a band of
// pointed slates in a darker, purpler stone.
const SLATE = {
  clipped: polyOf([[0, 0], [100, 0], [100, 86], [86, 100], [14, 100], [0, 86]]),
  pointed: polyOf([[0, 0], [100, 0], [100, 76], [50, 100], [0, 76]]),
};

add(
  'Slate',
  'A slate roof laid in staggered courses, each slate lapping the course below with its lower corners clipped, and a band of pointed purple slates every few rows.',
  (c) => ({
    host: `--sc: ${SLATE.clipped}; --sp: ${SLATE.pointed};`,
    rule: `@y(even) { transform: translateX(50%); } ${F} {
      z-index: @calc(100 - @y);
      --sh: @match(y % 4 == 0, @var(--sp), @var(--sc));
      ${A(`left: 1.5%; top: 0; width: 97%; height: 124%; background: linear-gradient(180deg, var(--color6) 0, transparent 30%), @match(y % 4 == 0, var(--color5), ${inkOf(1, 2, 3, 4)}); ${cp('@var(--sh)')}`)}
      ${B(`left: -98.5%; top: 0; width: @match(x == 1, 97%, 0); height: 124%; background: linear-gradient(180deg, var(--color6) 0, transparent 30%), @match(y % 4 == 0, var(--color5), ${inkOf(1, 2, 3, 4)}); ${cp('@var(--sh)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#1C2027', '#4E5A6B', '#5C6878', '#455063', '#69778A', '#5D4F6E', '#8D99A8'],
    grid: '6x10',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['blocks', 'grid', 'triangles'], mood: ['calm', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'textile', 'card-texture'] },
  }
);

// Coffered: a coffered ceiling seen from below. Each coffer steps down in
// two bevelled frames (hard-stop conic sectors sized to each frame, lit
// from below so the upper faces fall in shade) to a painted floor holding a
// gilt rosette. The ribs between coffers are the ground.
const ROSETTE = polyOf(
  Array.from({ length: 96 }, (_, i) => {
    const t = (i / 96) * Math.PI * 2;
    const r = 26 + 24 * Math.pow(Math.abs(Math.cos(4 * t)), 0.6);
    return [50 + r * Math.cos(t), 50 + r * Math.sin(t)];
  })
);
const BEVEL = 'conic-gradient(from -45deg, var(--color1) 0 90deg, var(--color2) 90deg 180deg, var(--color3) 180deg 270deg, var(--color2) 270deg 360deg)';
const RIB = (deg) => `linear-gradient(${deg}, var(--color6) 0 5%, transparent 5% 95%, var(--color6) 95%)`;

add(
  'Coffered',
  'A coffered ceiling: gilt-ribbed square coffers stepping down in two bevelled frames to painted blue and red floors, each holding a rosette.',
  (c) => ({
    host: `--ro: ${ROSETTE};`,
    rule: `${F} {
      --fl: ${inkOf(4, 5)};
      background: ${RIB('90deg')}, ${RIB('180deg')}, ${BEVEL};
      ${B(`inset: 20%; background: linear-gradient(@var(--fl), @var(--fl)) 50% 50% / 58.3333% 58.3333% no-repeat, ${BEVEL};`)}
      ${A(`inset: 33%; background: ${inkOf(6, 3)}; ${cp('@var(--ro)')} transform: rotate(@r(0deg, 45deg));`)}
    }${TR}`,
  }),
  {
    palette: ['#EDE3CC', '#776B57', '#A99C82', '#D8CDB4', '#2D4778', '#8C2E2E', '#D9A93B'],
    grid: '5x7',
    min: 48,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['squares', 'concentric', 'petals', 'grid'], mood: ['elegant', 'calm'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

// -- openings and ornament --------------------------------------------------------

// Rose window: a wheel of twelve glass petals (hard conic slots cut to a
// ring), a band of tracery round it and a pierced roundel at the hub.
add(
  'Rose Window',
  'Gothic rose windows set in a dark wall: a wheel of twelve stained glass petals inside a pale stone ring, with a ringed jewel at the hub.',
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
    min: 56,
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['radial', 'circles', 'petals', 'rings'], mood: ['elegant', 'festive'], density: 'medium', goodFor: ['wallpaper', 'poster', 'packaging'] },
  }
);

// Lancet: a two-light Gothic window per cell, two pointed lancets drawn as
// equilateral arches with a quatrefoil in the oculus above them.
const LANCET = (() => {
  const arch = (x0, w, spring, sill, n = 14) => {
    const r = w;
    const pts = [[x0, sill], [x0, spring]];
    for (let i = 1; i <= n; i++) {
      const t = Math.PI + (Math.PI / 3) * (i / n);
      pts.push([x0 + w + r * Math.cos(t), spring + r * Math.sin(t)]);
    }
    for (let i = 1; i <= n; i++) {
      const t = (5 * Math.PI) / 3 + (Math.PI / 3) * (i / n);
      pts.push([x0 + r * Math.cos(t), spring + r * Math.sin(t)]);
    }
    pts.push([x0 + w, sill]);
    return polyOf(pts);
  };
  const lobe = (x, y) => `radial-gradient(6% 6% at ${pc(x)} ${pc(y)}, @var(--q) 100%, transparent 100%)`;
  return {
    left: arch(11, 36, 56, 97),
    right: arch(53, 36, 56, 97),
    foil: [lobe(44.6, 18), lobe(55.4, 18), lobe(50, 12.6), lobe(50, 23.4)].join(', '),
  };
})();

add(
  'Lancet',
  'Gothic two-light windows in a pale stone wall: twin pointed lancets of deep stained glass under a quatrefoil in the window head.',
  (c) => ({
    host: `--ll: ${LANCET.left}; --lr: ${LANCET.right};`,
    rule: `${F} {
      --q: ${inkOf(3, 4, 5, 6)};
      background: ${LANCET.foil}, radial-gradient(13.8% 13.8% at 50% 18%, transparent 84%, var(--color2) 84% 100%, transparent 100%);
      ${B(`inset: 0; background: ${inkOf(1, 3, 4, 5, 6)}; ${cp('@var(--ll)')}`)}
      ${A(`inset: 0; background: ${inkOf(1, 3, 4, 5, 6)}; ${cp('@var(--lr)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#DCD2BE', '#24345C', '#8C7F67', '#7E1F2B', '#2E5F4F', '#C9902C', '#3B5E9A'],
    grid: '5x6',
    min: 54,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['arcs', 'curves', 'circles', 'grid'], mood: ['elegant', 'calm'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'poster'] },
  }
);

// Ablaq: arcades in striped masonry, the voussoirs of each round arch
// alternating red brick and pale stone as in the great mosque of Cordoba.
// Each cell is one bay; the piers and the wall over the arch sit on the
// cell edges (half in each cell), so they take one fixed ink, and so does
// the string course along the top of every tier.
const ABLAQ = (() => {
  const n = 11;
  const step = 180 / n;
  const gap = 0.9;
  const set = (parity) => {
    const stops = [];
    for (let k = 0; k < n; k++) {
      const a = n3(k * step);
      const e = n3((k + 1) * step);
      if (k % 2 === parity) stops.push(`transparent ${a}deg ${n3(a + gap)}deg`, `#000 ${n3(a + gap)}deg ${n3(e - gap)}deg`, `transparent ${n3(e - gap)}deg ${e}deg`);
      else stops.push(`transparent ${a}deg ${e}deg`);
    }
    stops.push('transparent 180deg 360deg');
    return `conic-gradient(from -90deg at 50% 50%, ${stops.join(', ')})`;
  };
  return { even: set(0), odd: set(1), ring: 'radial-gradient(circle closest-side, transparent 64%, #000 64% 100%, transparent 100%)' };
})();

add(
  'Ablaq',
  'Arcades in ablaq masonry: round arches whose wedge-shaped voussoirs alternate red brick and pale stone, on stout piers under a string course.',
  (c) => ({
    host: `--ae: ${ABLAQ.even}; --ao: ${ABLAQ.odd}; --ar: ${ABLAQ.ring};`,
    rule: `${F} {
      background: linear-gradient(180deg, var(--color2) 0 6%, transparent 6%),
        radial-gradient(33% 52.38% at 50% 100%, transparent 100%, var(--color1) 100%) 0 0 / 100% 63% no-repeat,
        linear-gradient(90deg, var(--color1) 0 17%, transparent 17% 83%, var(--color1) 83%);
      ${B(`${box(0, 13, 100, 100)} background: ${inkOf(3, 4)}; ${mskI('@var(--ae)', '@var(--ar)')}`)}
      ${A(`${box(0, 13, 100, 100)} background: ${inkOf(5, 6)}; ${mskI('@var(--ao)', '@var(--ar)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#2A2320', '#C4A276', '#7E6347', '#F6EEDC', '#EDE1C6', '#B8392A', '#9A2E22'],
    grid: '4x6',
    min: 56,
    freq: 1,
    tg: '4x4',
    tf: 1,
    meta: { tags: ['arcs', 'semicircles', 'stripes', 'radial'], mood: ['bold', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'poster', 'section-divider'] },
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
    min: 44,
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['curves', 'stripes', 'grid'], mood: ['elegant', 'calm'], density: 'medium', goodFor: ['wallpaper', 'section-divider', 'packaging'] },
  }
);

// Portico: a temple front in every cell, pediment over four columns on a
// three-stepped stylobate, with a round light in the tympanum.
const PORTICO = {
  ped: polyOf([[50, 8], [95, 30], [95, 38], [5, 38], [5, 30]]),
  base: polyOf([
    [2, 97], [98, 97], [98, 93], [94, 93], [94, 89], [90, 89], [90, 85],
    [87, 85], [87, 40], [79, 40], [79, 85], [65, 85], [65, 40], [57, 40], [57, 85],
    [43, 85], [43, 40], [35, 40], [35, 85], [21, 85], [21, 40], [13, 40], [13, 85],
    [10, 85], [10, 89], [6, 89], [6, 93], [2, 93],
  ]),
};

add(
  'Portico',
  'Little classical temple fronts in rows: a pediment with a round light, four columns and a three-stepped base, in marble, stone and painted stucco.',
  (c) => ({
    host: `--pp: ${PORTICO.ped}; --pb: ${PORTICO.base};`,
    rule: `${F} {
      ${B(`inset: 0; background: ${inkOf(3, 4, 5)}; ${cp('@var(--pp)')} ${msk('radial-gradient(4.5% 4.5% at 50% 25%, transparent 100%, #000 100%)')}`)}
      ${A(`inset: 0; background: ${inkOf(1, 2, 6)}; ${cp('@var(--pb)')}`)}
    }${TR}`,
  }),
  {
    palette: ['#2F4858', '#F2ECE0', '#E3D6BE', '#D9734E', '#E9B44C', '#86A99A', '#F7E7CE'],
    grid: '5x7',
    min: 54,
    freq: 1,
    tg: '5x5',
    tf: 1,
    meta: { tags: ['triangles', 'stripes', 'steps', 'grid'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'poster'] },
  }
);

// Skyline: a city at night. Each column is one tower whose height and crown
// come from a hash of the column, so the cells of a tower agree on both;
// below its crown every cell is facade with a grid of windows, some floors
// lit, and above it is sky with one star.
const SKY = (() => {
  const h = (k1, k2) => `(sin(x * ${k1} + ${k2}) * 43758.5453 - floor(sin(x * ${k1} + ${k2}) * 43758.5453))`;
  const hc = h(12.9898, 4.1414);
  const hk = h(78.233, 1.7);
  const T = `floor(Y * (0.12 + 0.46 * ${hc}))`;
  const sky = `y <= ${T}`;
  const crown = `y == ${T} + 1`;
  const cols = 'linear-gradient(90deg, transparent 13%, #000 13% 30%, transparent 30% 41.5%, #000 41.5% 58.5%, transparent 58.5% 70%, #000 70% 87%, transparent 87%)';
  const floors = 'linear-gradient(180deg, transparent 8%, #000 8% 19%, transparent 19% 33%, #000 33% 44%, transparent 44% 58%, #000 58% 69%, transparent 69% 83%, #000 83% 94%, transparent 94%)';
  const band = (a, b) => `linear-gradient(180deg, transparent ${a}%, #000 ${a}% ${b}%, transparent ${b}%)`;
  const strip = (a, b) => `linear-gradient(90deg, transparent ${a}%, #000 ${a}% ${b}%, transparent ${b}%)`;
  const lit = [
    [strip(0, 100), band(0, 50)],
    [strip(0, 35), band(0, 100)],
    [strip(35, 100), band(25, 100)],
    [strip(0, 100), band(50, 100)],
    [strip(35, 65), band(0, 75)],
    [strip(0, 65), band(25, 75)],
  ].map(([s, b]) => `${cols}, ${floors}, ${s}, ${b}`);
  const crowns = [
    [[4, 100], [4, 72], [14, 72], [14, 52], [26, 52], [26, 34], [38, 34], [38, 18], [47, 18], [47, 2], [53, 2], [53, 18], [62, 18], [62, 34], [74, 34], [74, 52], [86, 52], [86, 72], [96, 72], [96, 100]],
    [[4, 100], [4, 62], [20, 62], [30, 42], [40, 30], [46, 8], [50, 0], [54, 8], [60, 30], [70, 42], [80, 62], [96, 62], [96, 100]],
    [[4, 100], [4, 42], [18, 42], [18, 30], [46, 30], [46, 4], [54, 4], [54, 30], [82, 30], [82, 42], [96, 42], [96, 100]],
  ].map(polyOf);
  return { hc, hk, sky, crown, cols, floors, lit, crowns };
})();

add(
  'Skyline',
  'A city at night: towers of every height in a row, crowned with setbacks, spires and masts, their windows lit floor by floor under a starry sky.',
  (c) => ({
    host: [
      ...SKY.lit.map((v, i) => `--l${i}: ${v};`),
      ...SKY.crowns.map((v, i) => `--k${i}: ${v};`),
      `--win: ${SKY.cols}, ${SKY.floors};`,
    ].join(' '),
    rule: `${F} {
      --lit: @p(@var(--l0), @var(--l1), @var(--l2), @var(--l3), @var(--l4), @var(--l5));
      --star: radial-gradient(circle farthest-side at @r(12%, 88%) @r(12%, 88%), #000 @r(2.5%, 5%), transparent 0), linear-gradient(#000, #000);
      background: @match(${SKY.sky}, transparent, ${SKY.hk} < 0.34, var(--color1), ${SKY.hk} < 0.67, var(--color2), var(--color3));
      ${cp(`@match(${SKY.sky}, none, ${SKY.crown} && ${SKY.hc} < 0.34, @var(--k0), ${SKY.crown} && ${SKY.hc} < 0.67, @var(--k1), ${SKY.crown}, @var(--k2), inset(0 4% 0 4%))`)}
      ${B(`inset: 0; background: @match(${SKY.sky}, transparent, var(--color4)); ${msk('@var(--win)')} -webkit-mask-composite: source-in; mask-composite: intersect;`)}
      ${A(`inset: 0; background: ${inkOf(5, 5, 6)}; ${mskI(`@match(${SKY.sky}, @var(--star), @var(--lit))`)}`)}
    }${TR}`,
  }),
  {
    palette: ['#131A2C', '#2D3A56', '#3B4C70', '#24304A', '#1A2238', '#F3C45B', '#F8E6AE'],
    grid: '8x10',
    freq: 1,
    tg: '6x6',
    tf: 1,
    meta: { tags: ['blocks', 'grid', 'steps', 'dots'], mood: ['retro', 'calm'], density: 'medium', goodFor: ['hero-background', 'poster', 'wallpaper'] },
  }
);

export const sectionF = { title: 'F. Masonry', all };
