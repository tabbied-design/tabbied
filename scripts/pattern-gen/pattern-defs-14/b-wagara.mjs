// B. Wagara - the old repeat motifs of Japan and of tilework and folk ornament elsewhere.
import { section, F, TR, ink, cp, msk, mskI, B, A } from './shared.mjs';

const { add, all } = section('B. Wagara');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const tfo = (v) => `-webkit-transform-origin: ${v}; transform-origin: ${v};`;
const n2 = (v) => (Math.abs(v) < 1e-9 ? 0 : +v.toFixed(2));
/** A polygon from [x, y] points already in percent of the box. */
const P = (pts) => `polygon(${pts.map(([x, y]) => `${n2(x)}% ${n2(y)}%`).join(', ')})`;

/**
 * The outline of a union of unit squares, as polygon points in percent. The
 * bitmap is a list of strings ('#' is ink); the region must be one piece with
 * no holes. Returns [x, y] pairs scaled to `w` x `h` percent.
 */
const trace = (rows, w = 100, h = 100) => {
  const H = rows.length;
  const W = rows[0].length;
  const on = (x, y) => y >= 0 && y < H && x >= 0 && x < W && rows[y][x] === '#';
  // Directed boundary edges, clockwise around the ink (y down).
  const next = new Map();
  const key = (x, y) => `${x},${y}`;
  const edge = (x0, y0, x1, y1) => next.set(key(x0, y0), [x1, y1]);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!on(x, y)) continue;
      if (!on(x, y - 1)) edge(x, y, x + 1, y);
      if (!on(x + 1, y)) edge(x + 1, y, x + 1, y + 1);
      if (!on(x, y + 1)) edge(x + 1, y + 1, x, y + 1);
      if (!on(x - 1, y)) edge(x, y + 1, x, y);
    }
  }
  const [start] = next.keys();
  const pts = [];
  let cur = start;
  do {
    const [x, y] = cur.split(',').map(Number);
    pts.push([x, y]);
    const [nx, ny] = next.get(cur);
    cur = key(nx, ny);
  } while (cur !== start && pts.length < 10000);
  // Drop the points in the middle of a straight run.
  const out = pts.filter((p, i) => {
    const a = pts[(i + pts.length - 1) % pts.length];
    const b = pts[(i + 1) % pts.length];
    return !((a[0] === p[0] && p[0] === b[0]) || (a[1] === p[1] && p[1] === b[1]));
  });
  return out.map(([x, y]) => [(x / W) * w, (y / H) * h]);
};

/**
 * The union of thin straight arms radiating from a center, as one polygon:
 * `arms` is a list of [dx, dy] tip offsets (any units), `t` the arm thickness
 * in the same units. Points are returned in those units, around (0, 0).
 */
const asterisk = (arms, t) => {
  const sorted = arms
    .map(([x, y]) => ({ x, y, a: Math.atan2(y, x), L: Math.hypot(x, y) }))
    .sort((p, q) => p.a - q.a);
  const h = t / 2;
  const pts = [];
  const n = sorted.length;
  // Inner corner between arm i (its counter-clockwise edge) and arm i+1.
  const corner = (p, q) => {
    const ux = Math.cos(p.a), uy = Math.sin(p.a);
    const vx = Math.cos(q.a), vy = Math.sin(q.a);
    // p's edge offset toward q (left normal), q's edge offset toward p.
    const pnx = -uy, pny = ux;
    const qnx = vy, qny = -vx;
    // Solve s*u + h*pn = r*v + h*qn.
    const bx = h * (qnx - pnx), by = h * (qny - pny);
    const det = ux * -vy - uy * -vx;
    const s = (bx * -vy - by * -vx) / det;
    return [s * ux + h * pnx, s * uy + h * pny];
  };
  for (let i = 0; i < n; i++) {
    const p = sorted[i];
    const q = sorted[(i + 1) % n];
    const ux = Math.cos(p.a), uy = Math.sin(p.a);
    const L = p.L + h;
    pts.push([L * ux + h * uy, L * uy - h * ux]);
    pts.push([L * ux - h * uy, L * uy + h * ux]);
    pts.push(corner(p, q));
  }
  return pts;
};

/** A ring band as a mask layer, its radii in percent of the box half-side. */
const ringL = (inner, outer, at = '50% 50%') =>
  `radial-gradient(circle closest-side at ${at}, transparent ${inner}%, #000 ${inner}% ${outer}%, transparent ${outer}%)`;

/** Opposite quadrants of the box, starting at `from` (0deg = top right). */
const quadL = (from) =>
  `conic-gradient(from ${from}, #000 0 90deg, transparent 90deg 180deg, #000 180deg 270deg, transparent 270deg 360deg)`;

// -- Japan ---------------------------------------------------------------------

{
  // Concentric fans, opaque, in rows half a fan apart; each row is stacked
  // over the one above it so only a scale-shaped part of every fan shows.
  const rings = 'repeating-radial-gradient(circle closest-side, transparent 0 13%, var(--color1) 13% 20%)';
  const fan = (c, where) =>
    `${where} width: 100%; height: 100%; border-radius: 50%; background-color: ${ink(c, 2)}; background-image: ${rings};`;
  add(
    'Wave Fans',
    'Fans of concentric rings in rows, each row overlapping the one above so only a scale of every fan shows, like waves on a calm sea.',
    (c) => ({
      rule: `z-index: @y; ${F} { border-radius: 50%; background-color: ${ink(c, 2)}; background-image: ${rings}; ${B(fan(c, 'left: -50%; top: 50%;'))} ${A(fan(c, 'left: 50%; top: 50%; opacity: @match(x == X, 1, 0);'))} }${TR}`,
    }),
    {
      pal: 41,
      inks: 4,
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
  const t = 0.055;
  const arms = [
    [0, -2 / 3], [0.5, -1 / 3], [0.5, 1 / 3], [0, 2 / 3], [-0.5, 1 / 3], [-0.5, -1 / 3],
    [0.5, 0], [0.25, 0.5], [-0.25, 0.5], [-0.5, 0], [-0.25, -0.5], [0.25, -0.5],
  ];
  const star = P(asterisk(arms, t).map(([x, y]) => [(x + 0.5) * 100, ((y + 2 / 3) / (4 / 3)) * 100]));
  add(
    'Hemp Leaf',
    'Fine lines radiating twelve ways from every point of a hexagonal grid, joining into six-pointed stars of slender leaves.',
    (c) => ({
      host: `--star: ${star};`,
      rule: `@y(even) { ${tf('translateX(50%)')} } ${F} { ${B(`left: 0; top: -16.67%; width: 100%; height: 133.33%; background: ${ink(c)}; ${cp('@var(--star)')}`)} ${A(`left: -100%; top: -16.67%; width: 100%; height: 133.33%; background: ${ink(c)}; ${cp('@var(--star)')} opacity: @match(x == 1, 1, 0);`)} }${TR}`,
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
    'Arrow feathers stacked in columns, each chevron split down the shaft into two colors, the columns pointing up and down by turns.',
    (c) => ({
      rule: `@x(even) { ${tf('scaleY(-1)')} } ${F} { ${B(`left: 0; top: 0; width: 100%; height: ${h}%; background: ${ink(c)}; ${cp(left)}`)} ${A(`left: 0; top: 0; width: 100%; height: ${h}%; background: ${ink(c)}; ${cp(right)}`)} }${TR}`,
    }),
    {
      pal: 35,
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['chevrons', 'stripes', 'zigzags'], mood: ['bold', 'retro'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
    }
  );
}

// -- elsewhere -----------------------------------------------------------------

{
  // A simple key: the line runs along the foot of the module, climbs the
  // left side, crosses the top and hooks back in.
  const key = trace(['......', '#####.', '#...#.', '#.###.', '#.....', '######']);
  add(
    'Greek Key',
    'A running meander: one square-cornered line turning in on itself along every row, the keys repeating edge to edge like a temple frieze.',
    (c) => ({
      host: `--key: ${P(key)};`,
      rule: `${F} { ${B(`inset: 0; background: ${ink(c)}; ${cp('@var(--key)')}`)} }${TR}`,
    }),
    {
      pal: 29,
      inks: 3,
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['maze', 'lines', 'squares'], mood: ['elegant', 'retro'], density: 'medium', goodFor: ['section-divider', 'textile', 'packaging'] },
    }
  );
}

{
  // Each ring is cut into opposite quarters on two layers; the layers sit at
  // different heights, so where two rings cross one passes over and the
  // next crossing passes under.
  const band = ringL(81, 96);
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

export const sectionB = { title: 'B. Wagara', all };
