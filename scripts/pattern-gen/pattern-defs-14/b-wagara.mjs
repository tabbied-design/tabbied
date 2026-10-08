// B. Wagara - the old repeat motifs of Japan and of tilework and folk ornament elsewhere.
//
//   Japan      Wave Fans (seigaiha), Hemp Leaf (asanoha), Yabane
//   elsewhere  Guilloche, Kawung, Selbu Star, Ice Crack, Cross Stitch
//
// Most motifs are drawn once, in JS, as a polygon on the host and read in
// the cell with @var(), so a long outline costs nothing per cell: a bitmap is
// traced square by square (Selbu Star) and a smooth shape is contoured from
// an implicit function by marching squares (Cross Stitch). Patterns that
// join across cells do it without z-index
// between cells, which the SVG export does not keep: the fans of Wave Fans
// stack inside one cell's stacking context, and Guilloche cuts a real gap
// in the under strand of every crossing instead of layering the rings.
import { section, F, TR, ink, cp, msk, B, A } from './shared.mjs';

const { add, all } = section('B. Wagara');

// -- local helpers -------------------------------------------------------------

const tf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
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

/**
 * Smooth outlines of an implicit shape (inside where f < 0) by marching
 * squares on an n x n sampling of the unit box. Loops run clockwise around
 * the ink (y down), holes the other way, so joined() keeps holes open.
 */
const contour = (f, n = 96, eps = 0.0012) => {
  const v = [];
  for (let j = 0; j <= n; j++) {
    const row = [];
    for (let i = 0; i <= n; i++) row.push(f(i / n, j / n));
    v.push(row);
  }
  const inside = (i, j) => v[j][i] < 0;
  const at = (k) => {
    const [t, i, j] = k.split(',');
    const a = +i, b = +j;
    if (t === 'h') {
      const u = v[b][a] / (v[b][a] - v[b][a + 1]);
      return [(a + u) / n, b / n];
    }
    const u = v[b][a] / (v[b][a] - v[b + 1][a]);
    return [a / n, (b + u) / n];
  };
  const next = new Map();
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      // The cell's sides, walked clockwise: [from corner, to corner, edge key].
      const sides = [
        [[i, j], [i + 1, j], `h,${i},${j}`],
        [[i + 1, j], [i + 1, j + 1], `v,${i + 1},${j}`],
        [[i + 1, j + 1], [i, j + 1], `h,${i},${j + 1}`],
        [[i, j + 1], [i, j], `v,${i},${j}`],
      ];
      const cross = [];
      for (const [a, b, k] of sides) {
        const ia = inside(...a), ib = inside(...b);
        if (ia && !ib) cross.push(['out', k]);
        if (!ia && ib) cross.push(['in', k]);
      }
      cross.forEach(([type, k], idx) => {
        if (type === 'out') next.set(k, cross[(idx + 1) % cross.length][1]);
      });
    }
  }
  const result = [];
  while (next.size) {
    const [start] = next.keys();
    const loop = [];
    let k = start;
    for (let guard = 0; guard < 1e6 && next.has(k); guard++) {
      loop.push(at(k));
      const nk = next.get(k);
      next.delete(k);
      k = nk;
    }
    // Drop points that sit on the line through their kept neighbors.
    const kept = [];
    for (let idx = 0; idx < loop.length; idx++) {
      const p = loop[idx];
      const q = loop[(idx + 1) % loop.length];
      const o = kept.length ? kept[kept.length - 1] : loop[loop.length - 1];
      const L = Math.hypot(q[0] - o[0], q[1] - o[1]) || 1;
      const d = Math.abs((q[0] - o[0]) * (o[1] - p[1]) - (o[0] - p[0]) * (q[1] - o[1])) / L;
      if (d > eps || idx === 0) kept.push(p);
    }
    if (kept.length > 2) result.push(kept);
  }
  return result;
};

/** An implicit shape on the unit box as one clip-path polygon. */
const shapeOf = (f, n, eps) => P(pct(joined(contour(f, n, eps))));

/** Signed distance to a disc. */
const disc = (x, y, cx, cy, r) => Math.hypot(x - cx, y - cy) - r;

/** A ring band as a mask layer, its radii in percent of the box half-side. */
const ringL = (inner, outer, at = '50% 50%') =>
  `radial-gradient(circle closest-side at ${at}, transparent ${inner}%, #000 ${inner}% ${outer}%, transparent ${outer}%)`;

/** Opposite quadrants of the box, starting at `from` (0deg = top right). */
const quadL = (from) =>
  `conic-gradient(from ${from}, #000 0 90deg, transparent 90deg 180deg, #000 180deg 270deg, transparent 270deg 360deg)`;

/**
 * Mask layers kept on the host as one property and read in the cell, so a
 * long value is written once rather than once per cell.
 */
const mskVar = (name, intersect = false) =>
  `-webkit-mask: @var(--${name}); mask: @var(--${name});${intersect ? ' -webkit-mask-composite: source-in; mask-composite: intersect;' : ''}`;

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
    'Arrow feathers stacked in columns, dark and light by turns like a checker, each chevron split down the shaft in two shades and the columns pointing up and down.',
    () => ({
      rule: `@x(even) { ${tf('scaleY(-1)')} } ${F} { ${B(clipped(left, `@match((x + y) % 2 == 0, ${pick(1, 2)}, ${pick(3, 4)})`, `left: 0; top: 0; width: 100%; height: ${h}%;`))} ${A(clipped(right, `@match((x + y) % 2 == 0, ${pick(2, 1)}, ${pick(4, 3)})`, `left: 0; top: 0; width: 100%; height: ${h}%;`))} }${TR}`,
    }),
    {
      palette: ['#F6EFE6', '#4E2A5A', '#7A2E4F', '#EADBC8', '#D7AFC0'],
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['chevrons', 'stripes', 'zigzags'], mood: ['bold', 'retro'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
    }
  );
}

// -- elsewhere -----------------------------------------------------------------

{
  // Each ring passes over its neighbors in two opposite quarters and under
  // them in the other two. The under quarters have a real gap cut wherever a
  // neighbor's band crosses them, so the over-under reads in any paint
  // order, the way interlace is drawn in line art.
  const band = ringL(83, 96);
  // A neighbor's band, widened a little, as a hole: its ring is centered one
  // cell away, and the element box is 1.4 cells wide.
  const cut = (at) => `radial-gradient(ellipse 100% 100% at ${at}, #000 39%, transparent 39% 50.5%, #000 50.5%)`;
  const near = ['-21.43% 50%', '121.43% 50%', '50% -21.43%', '50% 121.43%'].map(cut);
  add(
    'Guilloche',
    'Rings linked into a mesh, every ring passing over one neighbor and under the next, the under strand broken where it crosses, like interlaced chain.',
    (c) => ({
      host: `--over: ${band}, ${quadL('0deg')}; --under: ${[band, quadL('90deg'), ...near].join(', ')};`,
      rule: `--k: ${ink(c)}; ${F} { ${B(`inset: -20%; background: @p(@var(--k)); ${mskVar('over', true)}`)} ${A(`inset: -20%; background: @var(--k); ${mskVar('under', true)}`)} }${TR}`,
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
    `inset: -25%; background: ${ink(c)}; ${mskVar('ovals')} ${tf(`rotate(${turn})`)}`;
  const dot = (at, r) => `radial-gradient(circle farthest-side at ${at}, var(--color1) ${r}%, transparent ${r}%)`;
  add(
    'Kawung',
    'Javanese batik ovals, four to a cell pointing into the corners, each with an oval eye, closing into four-petaled flowers with a seed at every center.',
    (c) => ({
      host: `--ovals: ${oval('26.4%')}, ${oval('73.6%')}; --seeds: ${dot('50% 50%', 13)}, ${dot('0 0', 6.5)}, ${dot('100% 0', 6.5)}, ${dot('0 100%', 6.5)}, ${dot('100% 100%', 6.5)};`,
      rule: `${F} { background: @var(--seeds); ${B(pair(c, '45deg'))} ${A(pair(c, '-45deg'))} }${TR}`,
    }),
    {
      palette: ['#F1E4CC', '#3B2A1E', '#7A4A26', '#2F3F5C', '#B07A3E'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['ovals', 'petals', 'lattice', 'dots'], mood: ['organic', 'elegant'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
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
  // Cracked ice: the grid's corners pushed about by a fixed hash, so every
  // cell is a crooked quadrilateral; each is split corner to corner along a
  // random diagonal and both halves pulled in a little, leaving the cracks.
  //
  // css-doodle evaluates only each corner's place, in percent of the
  // pseudo-element's box (1.6 cells wide, from 0.3 cells out), moved by a
  // hash of the corner, fract(sin(12.9898 i + 78.233 j + k) * 437.5453), read
  // off one sum per cell. The corner opposite the split and each triangle's
  // middle are plain CSS calc() over those properties, which the browser
  // resolves. A corner on the sheet's border only slides along it, set by
  // the edge selectors. The transform goes unprefixed to keep the CSS small.
  const V = (name) => `@var(--${name})`;
  const decl = ['--s: @p(0, 1);', '--u: @calc(@x * 12.9898 + @y * 78.233);'];
  const corners = [
    ['a', -1, -1, 0, 0],
    ['b', 0, -1, 1, 0],
    ['c', 0, 0, 1, 1],
    ['d', -1, 0, 0, 1],
  ];
  // A corner sits at 18.75% or 81.25% and moves up to 16.25% either way.
  for (const [n, di, dj, ox, oy] of corners) {
    for (const [axis, k, o] of [['x', 1.7, ox], ['y', 9.1, oy]]) {
      const shift = +(di * 12.9898 + dj * 78.233 + k).toFixed(4);
      // fract(v) for |v| < 1000, in one modulo.
      decl.push(`--${n}${axis}: @calc(${2.5 + 62.5 * o} + 32.5 * ((sin($(u) + ${shift}) * 437.5453 + 1000) % 1))%;`);
    }
  }
  for (const axis of ['x', 'y']) {
    decl.push(`--m${axis}: calc(${V(`c${axis}`)} + ${V('s')} * (${V(`d${axis}`)} - ${V(`c${axis}`)}));`);
    decl.push(`--n${axis}: calc(${V(`a${axis}`)} + ${V('s')} * (${V(`b${axis}`)} - ${V(`a${axis}`)}));`);
    decl.push(`--o${axis}: calc((${V(`a${axis}`)} + ${V(`b${axis}`)} + ${V(`m${axis}`)}) / 3);`);
    decl.push(`--q${axis}: calc((${V(`n${axis}`)} + ${V(`c${axis}`)} + ${V(`d${axis}`)}) / 3);`);
  }
  const edges =
    '@x(1) { --ax: 18.75%; --dx: 18.75%; } @y(1) { --ay: 18.75%; --by: 18.75%; } @match(x == X) { --bx: 81.25%; --cx: 81.25%; } @match(y == Y) { --cy: 81.25%; --dy: 81.25%; }';
  const vars = `${decl.join(' ')} ${edges}`;
  const tri = (pts, o) =>
    `${cp(`polygon(${pts.map((p) => `${V(`${p}x`)} ${V(`${p}y`)}`).join(', ')})`)} transform-origin: ${V(`${o}x`)} ${V(`${o}y`)}; transform: scale(0.9);`;
  const t1 = tri(['a', 'b', 'm'], 'o');
  const t2 = tri(['n', 'c', 'd'], 'q');
  const box = 'inset: -30%;';
  add(
    'Ice Crack',
    'Cracked ice: a crooked web of shards in pale glazes, every shard split once more and the cracks between them left open.',
    (c) => ({
      rule: `${vars} ${F} { ${B(`${box} background: ${ink(c)}; ${t1}`)} ${A(`${box} background: ${ink(c)}; ${t2}`)} }${TR}`,
    }),
    {
      palette: ['#2D3A36', '#CFE0D5', '#B8D0C2', '#A3C2B0', '#E2EDE5'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['triangles', 'mosaic', 'lines'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['wallpaper', 'card-texture', 'hero-background'] },
    }
  );
}

{
  // Cross-stitch: a stepped diamond, a smaller one inside it and a star at
  // the heart, every stitch a little X; the outer diamonds of neighbors meet
  // tip to tip, and a small diamond closes at every corner.
  const G = 11;
  const c0 = 5;
  const sets = { outer: new Set(), inner: new Set() };
  for (let j = 0; j < G; j++) {
    for (let i = 0; i < G; i++) {
      const d = Math.abs(i - c0) + Math.abs(j - c0);
      if (d === 5 || d >= 9) sets.outer.add(`${i},${j}`);
      if (d === 2 || d === 0 || (d === 1 && (i === c0 || j === c0))) sets.inner.add(`${i},${j}`);
    }
  }
  const stitches = (set) => (x, y) => {
    const gi = Math.floor(x * G), gj = Math.floor(y * G);
    let best = 1;
    for (let j = gj - 1; j <= gj + 1; j++) {
      for (let i = gi - 1; i <= gi + 1; i++) {
        if (!set.has(`${i},${j}`)) continue;
        const dx = x * G - (i + 0.5), dy = y * G - (j + 0.5);
        const arm = Math.min(Math.abs(dx - dy), Math.abs(dx + dy)) / Math.SQRT2 - 0.19;
        best = Math.min(best, Math.max(arm, Math.max(Math.abs(dx), Math.abs(dy)) - 0.5));
      }
    }
    return best;
  };
  add(
    'Cross Stitch',
    'Folk embroidery in little X stitches: stepped diamonds meeting tip to tip, a smaller diamond and a star inside each, worked in red and black on linen.',
    (c) => ({
      host: `--outer: ${shapeOf(stitches(sets.outer), 154)}; --inner: ${shapeOf(stitches(sets.inner), 154)};`,
      rule: `${F} { ${B(clipped('@var(--outer)', pick(1, 2)))} ${A(clipped('@var(--inner)', pick(3, 4)))} }${TR}`,
    }),
    {
      palette: ['#EEE6D6', '#B3262E', '#8E1C24', '#1F1B1A', '#3B2F5C'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['diamonds', 'crosses', 'stars', 'steps'], mood: ['festive', 'retro'], density: 'medium', goodFor: ['textile', 'packaging', 'card-texture'] },
    }
  );
}

export const sectionB = { title: 'B. Wagara', all };
