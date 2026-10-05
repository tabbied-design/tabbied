// B. Wagara - the old repeat motifs of Japan and of tilework and folk ornament elsewhere.
import { section, F, TR, ink, cp, msk, mskI, B, A, noise } from './shared.mjs';

const { add, all } = section('B. Wagara');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const tfo = (v) => `-webkit-transform-origin: ${v}; transform-origin: ${v};`;
const n2 = (v) => (Math.abs(v) < 1e-9 ? 0 : +v.toFixed(2));
/** A polygon from [x, y] points already in percent of the box. */
const P = (pts) => `polygon(${pts.map(([x, y]) => `${n2(x)}% ${n2(y)}%`).join(', ')})`;
/** Scales [x, y] points in unit space (0-1) to percent. */
const pct = (pts, sx = 100, sy = sx, ox = 0, oy = 0) => pts.map(([x, y]) => [ox + x * sx, oy + y * sy]);

/**
 * The outlines of a bitmap ('#' is ink) as closed loops of grid points, each
 * running clockwise around its ink (y down). Where two squares touch only at
 * a corner the walk turns into the ink, so every loop stays simple.
 */
const loops = (rows) => {
  const H = rows.length;
  const W = rows[0].length;
  const on = (x, y) => y >= 0 && y < H && x >= 0 && x < W && rows[y][x] === '#';
  const out = new Map();
  const key = (x, y) => `${x},${y}`;
  const edge = (x0, y0, x1, y1) => {
    const k = key(x0, y0);
    if (!out.has(k)) out.set(k, []);
    out.get(k).push([x1, y1]);
  };
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!on(x, y)) continue;
      if (!on(x, y - 1)) edge(x, y, x + 1, y);
      if (!on(x + 1, y)) edge(x + 1, y, x + 1, y + 1);
      if (!on(x, y + 1)) edge(x + 1, y + 1, x, y + 1);
      if (!on(x - 1, y)) edge(x, y + 1, x, y);
    }
  }
  const result = [];
  for (;;) {
    const start = [...out.entries()].find(([, v]) => v.length);
    if (!start) break;
    let [x, y] = start[0].split(',').map(Number);
    let dir = null;
    const pts = [];
    for (let guard = 0; guard < 100000; guard++) {
      const list = out.get(key(x, y));
      if (!list || !list.length) break;
      let pick = 0;
      if (dir && list.length > 1) {
        let best = -Infinity;
        list.forEach(([nx, ny], i) => {
          const cross = dir[0] * (ny - y) - dir[1] * (nx - x);
          if (cross > best) {
            best = cross;
            pick = i;
          }
        });
      }
      const [nx, ny] = list.splice(pick, 1)[0];
      pts.push([x, y]);
      dir = [nx - x, ny - y];
      x = nx;
      y = ny;
    }
    // Drop the points in the middle of a straight run.
    result.push(
      pts.filter((p, i) => {
        const a = pts[(i + pts.length - 1) % pts.length];
        const b = pts[(i + 1) % pts.length];
        return !((a[0] === p[0] && p[0] === b[0]) || (a[1] === p[1] && p[1] === b[1]));
      })
    );
  }
  return result.map((l) => l.map(([x, y]) => [x / W, y / H]));
};

/**
 * Several closed loops joined into one polygon by zero-width bridges, so a
 * single clip-path can hold islands (and, wound the other way, holes).
 */
const joined = (list) => {
  const [first, ...rest] = list;
  let poly = [...first];
  for (const loop of rest) {
    let best = [Infinity, 0, 0];
    poly.forEach(([px, py], i) =>
      loop.forEach(([lx, ly], j) => {
        const d = (px - lx) ** 2 + (py - ly) ** 2;
        if (d < best[0]) best = [d, i, j];
      })
    );
    const [, i, j] = best;
    const turn = [...loop.slice(j), ...loop.slice(0, j), loop[j]];
    poly = [...poly.slice(0, i + 1), ...turn, poly[i], ...poly.slice(i + 1)];
  }
  return poly;
};

/** A bitmap as one clip-path polygon, scaled to the box. */
const bitmap = (rows) => P(pct(joined(loops(rows))));

/**
 * The union of thin straight arms radiating from a center, as one polygon:
 * `arms` is a list of [dx, dy] tip offsets (any units), `t` the arm thickness
 * in the same units. Points are returned in those units, around (0, 0).
 */
const asterisk = (arms, t) => {
  const sorted = arms
    .map(([x, y]) => ({ a: Math.atan2(y, x), L: Math.hypot(x, y) }))
    .sort((p, q) => p.a - q.a);
  const h = t / 2;
  const pts = [];
  const n = sorted.length;
  // The inner corner where arm p's counter-clockwise edge meets arm q's.
  const corner = (p, q) => {
    const ux = Math.cos(p.a), uy = Math.sin(p.a);
    const vx = Math.cos(q.a), vy = Math.sin(q.a);
    const pnx = -uy, pny = ux;
    const qnx = vy, qny = -vx;
    const bx = h * (qnx - pnx), by = h * (qny - pny);
    const det = ux * -vy - uy * -vx;
    const s = (bx * -vy - by * -vx) / det;
    return [s * ux + h * pnx, s * uy + h * pny];
  };
  for (let i = 0; i < n; i++) {
    const p = sorted[i];
    const ux = Math.cos(p.a), uy = Math.sin(p.a);
    const L = p.L + h;
    pts.push([L * ux + h * uy, L * uy - h * ux]);
    pts.push([L * ux - h * uy, L * uy + h * ux]);
    pts.push(corner(p, sorted[(i + 1) % n]));
  }
  return pts;
};

/** Points around (0, 0) from a polar radius function of the angle (y down). */
const polar = (r, steps = 180) => {
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const R = r(t);
    pts.push([R * Math.cos(t), R * Math.sin(t)]);
  }
  return pts;
};

/** A centered polar shape of unit radius as a polygon filling the box. */
const polarPoly = (r, steps) => P(polar(r, steps).map(([x, y]) => [50 + 50 * x, 50 + 50 * y]));

/** A convex polygon moved inward by `t` on every side (same units as pts). */
const inset = (pts, t) => {
  const n = pts.length;
  const lines = pts.map((p, i) => {
    const q = pts[(i + 1) % n];
    const dx = q[0] - p[0], dy = q[1] - p[1];
    const L = Math.hypot(dx, dy);
    // Clockwise in y-down coordinates: the inside is to the right.
    const nx = -dy / L, ny = dx / L;
    return [p[0] + nx * t, p[1] + ny * t, dx, dy];
  });
  return lines.map((l, i) => {
    const m = lines[(i + n - 1) % n];
    // Intersect line m with line l.
    const det = m[2] * -l[3] + l[2] * m[3];
    const s = ((l[0] - m[0]) * -l[3] + l[2] * (l[1] - m[1])) / det;
    return [m[0] + s * m[2], m[1] + s * m[3]];
  });
};

/** A frame: the polygon less its inset, as one keyhole polygon. */
const frame = (pts, t) => {
  const inner = inset(pts, t);
  return [...pts, pts[0], inner[0], ...inner.slice(1).reverse(), inner[0]];
};

/** A ring band as a mask layer, its radii in percent of the box half-side. */
const ringL = (inner, outer, at = '50% 50%') =>
  `radial-gradient(circle closest-side at ${at}, transparent ${inner}%, #000 ${inner}% ${outer}%, transparent ${outer}%)`;

/** Opposite quadrants of the box, starting at `from` (0deg = top right). */
const quadL = (from) =>
  `conic-gradient(from ${from}, #000 0 90deg, transparent 90deg 180deg, #000 180deg 270deg, transparent 270deg 360deg)`;

/** A hole of radius r (percent of the box half-side) bored at the center. */
const boreL = (r) => `radial-gradient(circle closest-side, transparent ${r}%, #000 ${r}%)`;

/** Picks one of the listed inks (1-based palette slots). */
const pick = (...slots) => `@p(${slots.map((s) => `var(--color${s})`).join(', ')})`;

/** A pseudo-element filling the box (or `box`), inked and clipped. */
const clipped = (shape, inkValue, box = 'inset: 0;', extra = '') =>
  `${box} background: ${inkValue}; ${cp(shape)} ${extra}`;

// -- Japan ---------------------------------------------------------------------

{
  // Concentric fans, opaque, in rows half a fan apart; each row is stacked
  // over the one above it so only a scale-shaped part of every fan shows.
  // A cell holds one fan at its middle and the two below it at its lower
  // corners (the right one is covered by the next cell's left one, except at
  // the sheet's edge); the top row also lays the fans above it underneath.
  const rings = 'repeating-radial-gradient(circle closest-side, transparent 0 15%, var(--color1) 15% 25%)';
  const disc = 'radial-gradient(circle closest-side, #000 98%, transparent 100%)';
  const top = (at) => `repeating-radial-gradient(circle farthest-side at ${at}, var(--color2) 0 7.5%, var(--color1) 7.5% 12.5%)`;
  add(
    'Wave Fans',
    'Fans of concentric rings in rows, each row overlapping the one above so only a scale of every fan shows, like waves on a calm sea.',
    (c) => ({
      rule: `z-index: @y; @y(1) { background-image: ${top('0 0')}, ${top('100% 0')}; background-size: 50% 100%; background-position: 0 0, 100% 0; background-repeat: no-repeat; } ${F} { ${B(`inset: 0; border-radius: 50%; background-color: ${ink(c, 2)}; background-image: ${rings};`)} ${A(`left: -50%; top: 50%; width: 200%; height: 100%; background-color: ${ink(c, 2)}; background-image: ${rings}, ${rings}; background-size: 50% 100%; background-position: 0 0, 100% 0; background-repeat: no-repeat; ${msk(`${disc} 0 0 / 50% 100% no-repeat`, `${disc} 100% 0 / 50% 100% no-repeat`)}`)} }${TR}`,
    }),
    {
      palette: ['#0A2239', '#E8F1F2', '#1D84B5', '#176087', '#53A2BE', '#F9C80E'],
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['scallops', 'arcs', 'concentric', 'waves'], mood: ['calm', 'elegant'], density: 'dense', goodFor: ['wallpaper', 'textile', 'packaging'] },
    }
  );
}

{
  // Each hexagon of a stretched triangular lattice holds twelve spokes, to
  // its corners and the middles of its sides; together they draw the leaf
  // star. Rows step one cell and sit half a cell apart.
  const arms = [
    [0, -2 / 3], [0.5, -1 / 3], [0.5, 1 / 3], [0, 2 / 3], [-0.5, 1 / 3], [-0.5, -1 / 3],
    [0.5, 0], [0.25, 0.5], [-0.25, 0.5], [-0.5, 0], [-0.25, -0.5], [0.25, -0.5],
  ];
  const star = P(asterisk(arms, 0.055).map(([x, y]) => [(x + 0.5) * 100, ((y + 2 / 3) / (4 / 3)) * 100]));
  const hex = (left, extra = '') =>
    `left: ${left}; top: -16.67%; width: 100%; height: 133.33%; ${extra}`;
  add(
    'Hemp Leaf',
    'Fine lines radiating twelve ways from every point of a hexagonal grid, joining into six-pointed stars of slender leaves.',
    (c) => ({
      host: `--star: ${star};`,
      rule: `@y(even) { ${tf('translateX(50%)')} } ${F} { ${B(hex('0', `background: ${ink(c)}; ${cp('@var(--star)')}`))} ${A(hex('-100%', `background: ${ink(c)}; ${cp('@var(--star)')} opacity: @match(x == 1, 1, 0);`))} }${TR}`,
    }),
    {
      pal: 0,
      inks: 4,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['lattice', 'stars', 'lines'], mood: ['elegant', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile', 'card-texture'] },
    }
  );
}

{
  // Arrow fletching: a chevron split down its shaft into two parallelograms,
  // stacked up the column; every other column points the other way.
  const a = 36;
  const h = 100 + a;
  const left = P([[0, (a / h) * 100], [50, 0], [50, (100 / h) * 100], [0, 100]]);
  const right = P([[50, 0], [100, (a / h) * 100], [100, 100], [50, (100 / h) * 100]]);
  add(
    'Yabane',
    'Arrow feathers stacked in columns, each chevron split down the shaft into a dark half and a light half, the columns pointing up and down by turns.',
    () => ({
      rule: `@x(even) { ${tf('scaleY(-1)')} } ${F} { ${B(clipped(left, pick(1, 2), `left: 0; top: 0; width: 100%; height: ${h}%;`))} ${A(clipped(right, pick(3, 4), `left: 0; top: 0; width: 100%; height: ${h}%;`))} }${TR}`,
    }),
    {
      palette: ['#F6EFE6', '#4E2A5A', '#7A2E4F', '#EADBC8', '#D7AFC0'],
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['chevrons', 'stripes', 'zigzags'], mood: ['bold', 'retro'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
    }
  );
}

{
  // Two up-pointing triangles per three: each cell's triangle split into the
  // three-scale crest, its middle a real hole, the gaps between the cells'
  // triangles the plain scales of the ground.
  const topT = P([[50, 0], [75, 50], [25, 50]]);
  const feet = P([[25, 50], [50, 100], [75, 50], [100, 100], [0, 100]]);
  add(
    'Mitsuuroko',
    'Rows of triangles like dragon scales, each one split into three smaller triangles round an empty middle, in red, black and gold.',
    (c) => ({
      rule: `${F} { ${B(clipped(topT, ink(c)))} ${A(clipped(feet, ink(c)))} }${TR}`,
    }),
    {
      pal: 29,
      inks: 3,
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['triangles', 'mosaic', 'grid'], mood: ['bold', 'festive'], density: 'medium', goodFor: ['textile', 'packaging', 'poster'] },
    }
  );
}

{
  // Five notched petals: the union of five lobes, each a rounded polar
  // profile with a small V cut at its tip.
  const step = (2 * Math.PI) / 5;
  const lobe = (phi) => {
    const w = 0.7;
    if (Math.abs(phi) >= w) return 0;
    const base = Math.cos((phi / w) * (Math.PI / 2)) ** 0.55;
    return base * (1 - 0.2 * Math.exp(-((phi / 0.085) ** 2)));
  };
  const r = (t) => {
    let m = 0.16;
    for (let k = 0; k < 5; k++) {
      let phi = t - (-Math.PI / 2 + k * step);
      phi = Math.atan2(Math.sin(phi), Math.cos(phi));
      m = Math.max(m, lobe(phi));
    }
    return m;
  };
  const bloom = polarPoly(r, 200);
  const pistil = polarPoly((t) => 0.55 + 0.45 * Math.abs(Math.cos(2.5 * (t + Math.PI / 2))), 60);
  add(
    'Sakura',
    'Cherry blossoms of five notched petals strewn over a night ground, every flower turned and sized a little differently, each with a pale star at its heart.',
    (c) => ({
      host: `--bloom: ${bloom}; --heart: ${pistil};`,
      rule: `${F} { ${tf(`translate(@r(-14%, 14%), @r(-14%, 14%)) rotate(${noise(-40, 40, 1.2)}deg) scale(@r(0.62, 1.04))`)} ${B(clipped('@var(--bloom)', pick(1, 2, 3, 4), 'inset: 2%;'))} ${A(clipped('@var(--heart)', pick(5, 3), 'inset: 39%;'))} }${TR}`,
    }),
    {
      palette: ['#1D2440', '#F7C6D0', '#F09CB2', '#FBE4EA', '#E07A98', '#F4D06F'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['petals', 'stars'], mood: ['organic', 'calm', 'elegant'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
    }
  );
}

{
  // Sixteen rounded petals in two ranks, the back rank turned half a petal;
  // full crests on one square of the checker and small ones on the other.
  const petals = polarPoly((t) => 0.58 + 0.42 * Math.abs(Math.cos(8 * t)) ** 0.45, 192);
  add(
    'Kiku',
    'Chrysanthemum crests of sixteen rounded petals in two ranks, large and small crests alternating like a checker, each with an open heart.',
    (c) => ({
      host: `--kiku: ${petals};`,
      rule: `@odd { ${tf('scale(0.56)')} } ${F} { ${B(clipped('@var(--kiku)', ink(c), 'inset: 3%;', tf('rotate(11.25deg)')))} ${A(clipped('@var(--kiku)', ink(c), 'inset: 13%;', msk(boreL(22))))} }${TR}`,
    }),
    {
      palette: ['#1F2E2A', '#E6B44C', '#C8473E', '#F2E3C6', '#8DA77B'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['petals', 'radial', 'checkerboard', 'circles'], mood: ['elegant', 'festive'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
    }
  );
}

{
  // Shibori dots: two tied dots to a cell on a diagonal grid, each a softly
  // squared knot with the undyed point at its middle, set a little askew.
  const dot = (c, pos) =>
    `left: ${pos}; top: ${pos}; width: 36%; height: 36%; margin: -18% 0 0 -18%; border-radius: 24%; background: ${ink(c)}; ${msk(boreL(34))} ${tf('rotate(@r(32deg, 58deg)) scale(@r(0.82, 1.04))')}`;
  add(
    'Kanoko',
    'Tie-dye dots on a diagonal grid, each a softly squared knot with a dyed point at its middle, set slightly askew the way hand-tied cloth comes out.',
    (c) => ({
      rule: `${F} { ${B(dot(c, '25%'))} ${A(dot(c, '75%'))} }${TR}`,
    }),
    {
      palette: ['#8E1B2C', '#F6EEE6', '#F2D9C9', '#E9B9A5'],
      grid: '7x10',
      tg: '6x6',
      meta: { tags: ['dots', 'squares', 'diamonds', 'grid'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['textile', 'card-texture', 'wallpaper'] },
    }
  );
}

{
  // Well-curb crosses in kasuri: the four bars dyed into the threads, so the
  // ends blur and each pair sits a little off its neighbor.
  const bars = (c, turn) =>
    `left: 26%; top: 12%; width: 48%; height: 76%; background: ${ink(c)}; ${mskI('linear-gradient(90deg, #000 0 22%, transparent 22% 78%, #000 78%)', 'linear-gradient(180deg, transparent, #000 24% 76%, transparent)')} ${tf(`rotate(${turn}) translate(@r(-5%, 5%), @r(-4%, 4%))`)}`;
  add(
    'Igeta',
    'Well-curb crosses dyed into indigo cloth, the bars soft at their ends and each one a little out of register, like ikat-woven kasuri.',
    (c) => ({
      rule: `${F} { ${B(bars(c, '0deg'))} ${A(bars(c, '90deg'))} }${TR}`,
    }),
    {
      palette: ['#1F2F4D', '#EDE7DA', '#C9D4E2', '#A4B7CF'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['crosses', 'lattice', 'gradients', 'grid'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['textile', 'wallpaper', 'card-texture'] },
    }
  );
}

{
  // Fishing net: every cell carries three arcs of circles one cell in
  // radius, hung from the middle of its top edge and from its neighbors'
  // middles, so the arcs cross into curved meshes. A knot sits where three
  // arcs meet.
  const arc = (at) =>
    `radial-gradient(ellipse 100% 100% at ${at}, transparent 94%, #000 94% 100%, transparent 100%)`;
  add(
    'Amime',
    'A fishing net of sagging arcs crossing into curved meshes, with a colored knot tied at the top of every mesh.',
    (c) => ({
      rule: `${F} { ${B(`inset: 0; background: var(--color1); ${msk(arc('-50% 0'), arc('50% 0'), arc('150% 0'))}`)} ${A(`left: 50%; top: 0; width: 14%; height: 14%; margin: -7% 0 0 -7%; border-radius: 50%; background: ${ink(c, 2)};`)} }${TR}`,
    }),
    {
      pal: 40,
      inks: 4,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['curves', 'lattice', 'arcs', 'dots'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'hero-background', 'textile'] },
    }
  );
}

{
  // Pine-bark lozenge: a wide diamond with a smaller one rising out of its
  // top and bottom, nested with a second, smaller copy in another ink.
  const shape = [
    [0.5, 0], [0.75, 0.25], [2 / 3, 1 / 3], [1, 0.5], [2 / 3, 2 / 3], [0.75, 0.75],
    [0.5, 1], [0.25, 0.75], [1 / 3, 2 / 3], [0, 0.5], [1 / 3, 1 / 3], [0.25, 0.25],
  ];
  const outer = P(pct(shape));
  add(
    'Matsukawabishi',
    'Stepped pine-bark diamonds, each a wide lozenge with smaller ones rising from its top and bottom, nested two deep and touching tip to tip.',
    (c) => ({
      rule: `${F} { ${B(clipped(outer, ink(c)))} ${A(clipped(outer, ink(c), 'inset: 22%;'))} }${TR}`,
    }),
    {
      pal: 5,
      inks: 4,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['diamonds', 'steps', 'lattice'], mood: ['elegant', 'calm'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
    }
  );
}

{
  // Hexagons touching only at their corners, so the triangles between them
  // make the six-pointed stars of a woven bamboo basket.
  const k = 0.07;
  const hexPts = [[0, 0.5], [0.25, 0], [0.75, 0], [1, 0.5], [0.75, 1], [0.25, 1]];
  const ring = P(pct(frame(hexPts, k)));
  const box = (left) => `left: ${left}; top: 0; width: 100%; height: 100%;`;
  add(
    'Kagome',
    'A woven-basket lattice: hexagon outlines touching corner to corner, the triangles between them closing into rows of six-pointed stars.',
    (c) => ({
      rule: `@y(even) { ${tf('translateX(50%)')} } ${F} { ${B(clipped(ring, ink(c), box('0')))} ${A(clipped(ring, ink(c), box('-100%'), 'opacity: @match(x == 1, 1, 0);'))} }${TR}`,
    }),
    {
      pal: 31,
      inks: 4,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['hexagons', 'lattice', 'stars', 'lines'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile', 'card-texture'] },
    }
  );
}

{
  // Hitomezashi: every grid line is a running stitch starting on or off the
  // first square, chosen per line by a fixed hash, so the stitches lock into
  // a maze of steps and crosses.
  const bit = (v, a, b) => {
    const s = `sin(${v} * ${a} + ${b}) * 437.585`;
    return `floor(2 * ((${s}) - floor(${s})))`;
  };
  const across = `opacity: @calc((${bit('@y', 12.9898, 7.1)} + @x) % 2);`;
  const down = `opacity: @calc((${bit('@x', 78.233, 3.3)} + @y) % 2);`;
  add(
    'Hitomezashi',
    'Sashiko running stitches along every line of a grid, each line starting on or off the first square, so the stitches lock into a maze of steps.',
    (c) => ({
      rule: `${F} { ${B(`left: 9%; width: 82%; top: -4%; height: 8%; border-radius: 99px; background: ${ink(c)}; ${across}`)} ${A(`top: 9%; height: 82%; left: -4%; width: 8%; border-radius: 99px; background: ${ink(c)}; ${down}`)} }${TR}`,
    }),
    {
      palette: ['#1B2A47', '#F1ECE1', '#E3D5B8', '#C5D1E0', '#D8604C'],
      grid: '8x12',
      tg: '9x9',
      meta: { tags: ['lines', 'maze', 'steps', 'grid'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['textile', 'card-texture', 'wallpaper'] },
    }
  );
}

{
  // Shark-skin dots: tiny dashes along four rings of a fan, cut by the rings
  // and a fan of spokes; the fans overlap row on row.
  const n = 22;
  const stops = [];
  for (let i = 0; i < n; i++) {
    const a0 = +((180 / n) * i).toFixed(3);
    const a1 = +((180 / n) * (i + 0.5)).toFixed(3);
    const a2 = +((180 / n) * (i + 1)).toFixed(3);
    stops.push(`#000 ${a0}deg ${a1}deg`, `transparent ${a1}deg ${a2}deg`);
  }
  const spokes = `conic-gradient(from -90deg, ${stops.join(', ')}, transparent 180deg 360deg)`;
  const rings = 'radial-gradient(circle closest-side, transparent 0 52%, #000 52% 58%, transparent 58% 67%, #000 67% 73%, transparent 73% 82%, #000 82% 88%, transparent 88% 94%, #000 94% 100%, transparent 100%)';
  add(
    'Same Komon',
    'A fine sharkskin texture: tiny dots strung along overlapping fans of arcs, so the cloth seems to shimmer from a distance.',
    (c) => ({
      host: `--spokes: ${spokes};`,
      rule: `${F} { ${B(`left: -50%; top: 0; width: 200%; height: 200%; background: ${ink(c)}; ${mskI('@var(--spokes)', rings)}`)} }${TR}`,
    }),
    {
      palette: ['#26355A', '#E8E4DA', '#C9CFDB'],
      grid: '8x12',
      tg: '8x8',
      meta: { tags: ['dots', 'arcs', 'scallops', 'halftone'], mood: ['calm', 'elegant'], density: 'dense', goodFor: ['textile', 'card-texture', 'wallpaper'] },
    }
  );
}

{
  // Rising steam: two wavy lines per column that swell apart and pinch
  // together, every other column half a wave out of step so the neighbors
  // run parallel.
  const band = (phase, side) => {
    const N = 48;
    const h = 0.032;
    const cx = (y) => {
      const s = Math.sin(Math.PI * y + phase) ** 2;
      const x = 0.5 - 0.07 - 0.29 * s;
      return side < 0 ? x : 1 - x;
    };
    const L = [];
    const R = [];
    for (let i = 0; i <= N; i++) {
      const y = i / N;
      L.push([cx(y) - h, y]);
      R.push([cx(y) + h, y]);
    }
    return P(pct([...L, ...R.reverse()]));
  };
  add(
    'Tachiwaki',
    'Rising steam: pairs of wavy lines swelling apart and pinching together up every column, the neighbors half a wave out of step.',
    (c) => ({
      host: `--la: ${band(0, -1)}; --ra: ${band(0, 1)}; --lb: ${band(Math.PI / 2, -1)}; --rb: ${band(Math.PI / 2, 1)};`,
      rule: `${F} { ${B(clipped('@match(x % 2 == 0, @var(--lb), @var(--la))', ink(c)))} ${A(clipped('@match(x % 2 == 0, @var(--rb), @var(--ra))', ink(c)))} }${TR}`,
    }),
    {
      pal: 30,
      inks: 4,
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['waves', 'lines', 'curves', 'stripes'], mood: ['calm', 'organic', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'textile', 'hero-background'] },
    }
  );
}

// -- elsewhere -----------------------------------------------------------------

{
  // A simple key: the line runs along the foot of the module, climbs the
  // left side, crosses the top and hooks back in. Each module is a glazed
  // tile of its own color; the key runs on across them in one ink.
  const key = bitmap(['......', '#####.', '#...#.', '#.###.', '#.....', '######']);
  add(
    'Greek Key',
    'A running meander: one square-cornered line turning in on itself along every row, laid over tiles glazed in dark shades like a temple frieze.',
    (c) => ({
      host: `--key: ${key};`,
      rule: `${F} { background: ${ink(c, 2)}; ${B(clipped('@var(--key)', 'var(--color1)'))} }${TR}`,
    }),
    {
      palette: ['#E9DDC8', '#D98A4E', '#1F1A17', '#3A2A22', '#6E2A1C'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['maze', 'lines', 'squares', 'blocks'], mood: ['elegant', 'retro'], density: 'dense', goodFor: ['section-divider', 'textile', 'packaging'] },
    }
  );
}

{
  // Each ring is cut into opposite quarters on two layers; the layers sit at
  // different heights, so where two rings cross one passes over and the
  // next crossing passes under.
  const band = ringL(83, 96);
  add(
    'Guilloche',
    'Rings linked into a mesh, every ring passing over one neighbor and under the next, like a band of interlaced chain.',
    (c) => ({
      rule: `--k: ${ink(c)}; ${F} { ${B(`inset: -20%; background: @p(@var(--k)); ${mskI(band, quadL('0deg'))} z-index: 2;`)} ${A(`inset: -20%; background: @var(--k); ${mskI(band, quadL('90deg'))} z-index: 1;`)} }${TR}`,
    }),
    {
      pal: 10,
      inks: 4,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['rings', 'circles', 'lattice', 'braids'], mood: ['elegant', 'technical'], density: 'medium', goodFor: ['wallpaper', 'card-texture', 'textile'] },
    }
  );
}

{
  // Kawung: four ovals pointing to the corners of every cell, each with an
  // oval eye; the ovals of four cells close into a flower at every corner.
  const oval = (y) => `radial-gradient(ellipse 11.3% 21.3% at 50% ${y}, transparent 0 42%, #000 42% 100%, transparent 100%)`;
  const pair = (c, turn) =>
    `inset: -25%; background: ${ink(c)}; ${msk(oval('26.4%'), oval('73.6%'))} ${tf(`rotate(${turn})`)}`;
  const dot = (at, r) => `radial-gradient(circle farthest-side at ${at}, var(--color1) ${r}%, transparent ${r}%)`;
  add(
    'Kawung',
    'Javanese batik ovals, four to a cell pointing into the corners, each with an oval eye, closing into four-petaled flowers with a seed at every center.',
    (c) => ({
      rule: `${F} { background: ${dot('50% 50%', 13)}, ${dot('0 0', 6.5)}, ${dot('100% 0', 6.5)}, ${dot('0 100%', 6.5)}, ${dot('100% 100%', 6.5)}; ${B(pair(c, '45deg'))} ${A(pair(c, '-45deg'))} }${TR}`,
    }),
    {
      pal: 2,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['ovals', 'petals', 'lattice', 'dots'], mood: ['organic', 'elegant'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
    }
  );
}

{
  // Egg and dart: an egg in a shell hung from a running fillet, with a
  // spear-point dart between every pair of shells.
  const shell = 'radial-gradient(ellipse 38% 46% at 50% 50%, transparent 85%, #000 85% 100%, transparent 100%)';
  const dart = (x) => `conic-gradient(from -8deg at ${x} 90%, #000 0 16deg, transparent 16deg 360deg)`;
  const fillet = 'linear-gradient(180deg, #000 0 6%, transparent 6%)';
  add(
    'Egg And Dart',
    'A classical molding in rows: eggs held in shells that hang from a running fillet, with a slim dart pointing down between each pair.',
    (c) => ({
      rule: `${F} { ${B(clipped('ellipse(28% 36% at 50% 52%)', ink(c, 2)))} ${A(`inset: 0; background: var(--color1); ${msk(shell, dart('0%'), dart('100%'), fillet)}`)} }${TR}`,
    }),
    {
      pal: 31,
      inks: 4,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['ovals', 'triangles', 'stripes'], mood: ['elegant', 'retro'], density: 'medium', goodFor: ['section-divider', 'packaging', 'textile'] },
    }
  );
}

{
  // Two squares, one turned an eighth, make each eight-pointed star; the
  // crosses left between four stars are the ground.
  const h = 0.3536;
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8 - Math.PI / 2;
    const R = i % 2 === 0 ? h * Math.SQRT2 : h * 1.0824;
    pts.push([0.5 + R * Math.cos(a), 0.5 + R * Math.sin(a)]);
  }
  const star = P(pct(pts));
  add(
    'Star And Cross',
    'Zellige tilework: eight-pointed stars point to point, the cross-shaped spaces between them left open, each star holding a smaller star and a round hole.',
    (c) => ({
      host: `--star: ${star};`,
      rule: `${F} { ${B(clipped('@var(--star)', ink(c), 'inset: 0;', msk(boreL(16))))} ${A(clipped('@var(--star)', ink(c), 'inset: 25%;', `${msk(boreL(32))} ${tf('rotate(22.5deg)')}`))} }${TR}`,
    }),
    {
      palette: ['#F3EEE4', '#1B5E5A', '#1D3E7A', '#C8892B', '#2B2B2B'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['stars', 'crosses', 'mosaic', 'grid'], mood: ['bold', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'poster'] },
    }
  );
}

{
  // Andean stepped cross: three steps to each side, a round hole at the
  // middle, a smaller cross set inside; the arms meet the neighbors' arms.
  const cross = [
    '....###....',
    '....###....',
    '..#######..',
    '..#######..',
    '###########',
    '###########',
    '###########',
    '..#######..',
    '..#######..',
    '....###....',
    '....###....',
  ];
  const shape = bitmap(cross);
  add(
    'Chakana',
    'Andean stepped crosses, three steps to every side and a round hole at the heart, their arms joining into a lattice with stepped diamonds of ground between.',
    (c) => ({
      host: `--chakana: ${shape};`,
      rule: `${F} { ${B(clipped('@var(--chakana)', ink(c), 'inset: 0;', msk(boreL(22))))} ${A(clipped('@var(--chakana)', ink(c), 'inset: 25%;', msk(boreL(44))))} }${TR}`,
    }),
    {
      pal: 15,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['crosses', 'steps', 'lattice', 'diamonds'], mood: ['bold', 'festive'], density: 'dense', goodFor: ['textile', 'poster', 'packaging'] },
    }
  );
}

{
  // Selbu star: eight slanted petals of knitted stitches round an empty
  // middle, a small cross at the heart and a block of stitches at each
  // corner where four cells meet.
  const N = 17;
  const c0 = 8;
  const rows = [];
  const dots = [];
  for (let y = 0; y < N; y++) {
    let row = '';
    let d = '';
    for (let x = 0; x < N; x++) {
      const dx = Math.abs(x - c0), dy = Math.abs(y - c0);
      const a = Math.max(dx, dy), b = Math.min(dx, dy);
      row += b >= 1 && b <= 3 && a >= b + 1 && a <= b + 4 ? '#' : '.';
      const corner = (x === 0 || x === N - 1) && (y === 0 || y === N - 1);
      d += dx + dy <= 1 || corner ? '#' : '.';
    }
    rows.push(row);
    dots.push(d);
  }
  add(
    'Selbu Star',
    'Knitted eight-petal stars, every petal a slanted block of stitches, with a little cross at each heart and stitch dots where the stars meet.',
    (c) => ({
      host: `--petals: ${bitmap(rows)}; --dots: ${bitmap(dots)};`,
      rule: `${F} { ${B(clipped('@var(--petals)', ink(c)))} ${A(clipped('@var(--dots)', ink(c)))} }${TR}`,
    }),
    {
      palette: ['#1D2433', '#F2EDE3', '#C9373F', '#E8D8B0'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['stars', 'squares', 'steps', 'grid'], mood: ['festive', 'retro'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
    }
  );
}

{
  // A rosette tile: four broad and four narrow petals round an open heart;
  // the quarter rings at the corners close into a ring and dot wherever four
  // tiles meet.
  const lobe = (phi, w) => (Math.abs(phi) >= w ? 0 : Math.cos((phi / w) * (Math.PI / 2)) ** 0.7);
  const r = (t) => {
    let m = 0.2;
    for (let k = 0; k < 4; k++) {
      const big = Math.atan2(Math.sin(t - (k * Math.PI) / 2 + Math.PI / 2), Math.cos(t - (k * Math.PI) / 2 + Math.PI / 2));
      const small = Math.atan2(Math.sin(t - (k * Math.PI) / 2 - Math.PI / 4), Math.cos(t - (k * Math.PI) / 2 - Math.PI / 4));
      m = Math.max(m, lobe(big, 0.62), 0.6 * lobe(small, 0.42));
    }
    return m;
  };
  const rosette = polarPoly(r, 200);
  const corner = (at) => `radial-gradient(circle farthest-side at ${at}, #000 0 12%, transparent 12% 19%, #000 19% 24%, transparent 24%)`;
  add(
    'Talavera',
    'Painted tiles each holding a rosette of four broad and four narrow petals, with quarter rings at the corners that close into a ring wherever four tiles meet.',
    (c) => ({
      host: `--rosette: ${rosette};`,
      rule: `${F} { ${B(clipped('@var(--rosette)', ink(c, 2), 'inset: 8%;', msk(boreL(18))))} ${A(`inset: 0; background: var(--color1); ${msk(corner('0 0'), corner('100% 0'), corner('0 100%'), corner('100% 100%'))}`)} }${TR}`,
    }),
    {
      palette: ['#F7F3EA', '#1F4E9C', '#E2A72E', '#2E7D5B', '#C0502E', '#3C6FC4'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['petals', 'rings', 'radial', 'grid'], mood: ['festive', 'bold'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'textile'] },
    }
  );
}

{
  // Cracked ice: the grid's corners pushed about by a fixed hash, so every
  // cell is a crooked quadrilateral; each is split corner to corner along a
  // random diagonal and both halves pulled in a little, leaving the cracks.
  const A0 = 0.22;
  const hash = (i, j, k) => {
    const s = `sin(${i} * 12.9898 + ${j} * 78.233 + ${k}) * 437.5453`;
    return `(${s} - floor(${s}))`;
  };
  const jit = (name, i, j, k) => `--${name}: @calc(${A0} * (2 * ${hash(i, j, k)} - 1));`;
  const corners = [
    ['a', '(@x - 1)', '(@y - 1)'],
    ['b', '@x', '(@y - 1)'],
    ['c', '@x', '@y'],
    ['d', '(@x - 1)', '@y'],
  ];
  const vars = corners.map(([n, i, j]) => `${jit(`${n}x`, i, j, 1.7)} ${jit(`${n}y`, i, j, 9.1)}`).join(' ');
  // Corner positions in cell units, as expressions.
  const C = {
    a: ['@var(--ax)', '@var(--ay)'],
    b: ['(1 + @var(--bx))', '@var(--by)'],
    c: ['(1 + @var(--cx))', '(1 + @var(--cy))'],
    d: ['@var(--dx)', '(1 + @var(--dy))'],
  };
  const mix = (p, q, axis) => `(${C[p][axis]} + @var(--s) * (${C[q][axis]} - ${C[p][axis]}))`;
  const tri = (pts) => {
    const X = (e) => `@calc(62.5 * ${e} + 18.75)%`;
    const poly = `polygon(${pts.map(([x, y]) => `${X(x)} ${X(y)}`).join(', ')})`;
    const ox = `@calc(62.5 * (${pts[0][0]} + ${pts[1][0]} + ${pts[2][0]}) / 3 + 18.75)%`;
    const oy = `@calc(62.5 * (${pts[0][1]} + ${pts[1][1]} + ${pts[2][1]}) / 3 + 18.75)%`;
    return `${cp(poly)} ${tfo(`${ox} ${oy}`)} ${tf('scale(0.9)')}`;
  };
  const t1 = tri([C.a, C.b, [mix('c', 'd', 0), mix('c', 'd', 1)]]);
  const t2 = tri([[mix('a', 'b', 0), mix('a', 'b', 1)], C.c, C.d]);
  const box = 'left: -30%; top: -30%; width: 160%; height: 160%;';
  add(
    'Ice Crack',
    'Cracked ice: a crooked web of shards in pale glazes, every shard split once more and the cracks between them left open.',
    (c) => ({
      rule: `${vars} --s: @p(0, 1); ${F} { ${B(`${box} background: ${ink(c)}; ${t1}`)} ${A(`${box} background: ${ink(c)}; ${t2}`)} }${TR}`,
    }),
    {
      palette: ['#2D3A36', '#CFE0D5', '#B8D0C2', '#A3C2B0', '#E2EDE5'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['triangles', 'mosaic', 'lines'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'card-texture', 'hero-background'] },
    }
  );
}

export const sectionB = { title: 'B. Wagara', all };
