// L. Papercraft - paper folded and cut, patchwork blocks, stitching, bunting and rosettes.
import { section, F, TR, ink, cp, msk, mskI, B, A, noise, fx, fy } from './shared.mjs';

const { add, all } = section('L. Papercraft');

// -- local helpers -------------------------------------------------------------

const xf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const tfo = (v) => `-webkit-transform-origin: ${v}; transform-origin: ${v};`;
const n2 = (v) => (Math.abs(v) < 1e-9 ? 0 : Math.round(v * 100) / 100);
/** A polygon from [x, y] points already in percent of the box. */
const P = (pts) => `polygon(${pts.map(([x, y]) => `${n2(x)}% ${n2(y)}%`).join(', ')})`;
const rad = (d) => (d * Math.PI) / 180;
/** A point at radius r, angle a (degrees, 0 = up, clockwise) around (cx, cy). */
const polar = (cx, cy, r, a) => [cx + r * Math.sin(rad(a)), cy - r * Math.cos(rad(a))];

/** 'var(--color1), ..., var(--colorN)' for the inks from..to (default all). */
const list = (c, from = 1, to = c - 1) => {
  const a = [];
  for (let i = from; i <= to; i++) a.push(`var(--color${i})`);
  return a.join(', ');
};
/** One random pick for the whole sheet, re-rolled on reseed (see a-loom.mjs). */
const constant = (c, from, to) => `@pd(@p(${list(c, from, to)}))`;
/** A pick shared by every cell of a column. */
const byColumn = (c, from, to) => `@pd(@m(@X, @p(${list(c, from, to)})))`;
/** A per-cell ink already chosen, read back as a pick. */
const paint = (name) => `@p(@var(--${name}))`;
/** Clip or mask by a value set once on the host. */
const clipBy = (name) => cp(`@var(--${name})`);
const maskBy = (name) => `-webkit-mask: @var(--${name}); mask: @var(--${name});`;
const maskAllOf = (name) =>
  `${maskBy(name)} -webkit-mask-composite: source-in; mask-composite: intersect;`;

/**
 * A solid rectangle as one background layer, placed by its left/top edge in
 * percent of the box. A sized layer's background-position is a fraction of
 * the slack (box minus layer), so the edge is converted to that.
 */
const rect = (color, l, t, w, h) => {
  const pos = (edge, size) => (size >= 100 ? 0 : n2((edge / (100 - size)) * 100));
  return `linear-gradient(${color}, ${color}) ${pos(l, w)}% ${pos(t, h)}% / ${n2(w)}% ${n2(h)}% no-repeat`;
};

/** n hard-edged spokes `on` degrees wide around `at`, as a conic mask layer. */
const spokes = (n, on, { at = '50% 50%', from = 0, inv = false } = {}) => {
  const p = 360 / n;
  const f = (v) => `${n2(v)}deg`;
  const [a, b] = inv ? ['transparent', '#000'] : ['#000', 'transparent'];
  const stops = [];
  for (let i = 0; i < n; i++) {
    stops.push(`${a} ${f(i * p)} ${f(i * p + on)}, ${b} ${f(i * p + on)} ${f((i + 1) * p)}`);
  }
  return `conic-gradient(from ${from}deg at ${at}, ${stops.join(', ')})`;
};

// -- paper, folded and cut -----------------------------------------------------

{
  // A dart seen from above: the near wing and the far wing share the fold
  // from the nose; the far one is drawn in the same ink, thinner.
  const near = P([[95, 45], [6, 15], [31, 54]]);
  const far = P([[95, 45], [31, 54], [16, 79]]);
  add(
    'Paper Planes',
    'Folded paper darts flying in a loose flock, every plane trailing a dashed line, their headings swinging together across the sheet.',
    (c) => ({
      host: `--near: ${near}; --far: ${far};`,
      rule: `${F} { --k: ${ink(c)};
        background: repeating-linear-gradient(90deg, @var(--k) 0 7%, transparent 7% 14%) 0% 60% / 34% 2.4% no-repeat;
        ${xf(`translate(@r(-12, 12)%, @r(-12, 12)%) rotate(@calc(${noise(-75, 35, 1.4)} + @r(-12, 12))deg) scale(@r(0.85, 1.05))`)}
        ${B(`inset: 0; background: ${paint('k')}; ${clipBy('near')}`)}
        ${A(`inset: 0; background: ${paint('k')}; opacity: 0.55; ${clipBy('far')}`)}
      }${TR}`,
    }),
    {
      pal: 23,
      inks: 4,
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['triangles', 'lines', 'diagonals'], mood: ['playful', 'calm'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'card-texture'] },
    }
  );
}

{
  // An open hand fan: ten pleats over 140 degrees, the mountain folds poking
  // past the rim, a dark wash on every other pleat, the sticks showing below
  // the leaf and a rivet at the pivot.
  const cx = 50;
  const cy = 86;
  const R = 58;
  const r0 = 26;
  const N = 10;
  const half = 70;
  const step = (2 * half) / N;
  const outer = [];
  for (let i = 0; i <= 2 * N; i++) {
    const a = -half + (step / 2) * i;
    outer.push(polar(cx, cy, i % 2 ? R - 3 : R, a));
  }
  const inner = [];
  for (let i = N; i >= 0; i--) inner.push(polar(cx, cy, r0, -half + step * i));
  const leaf = P([...outer, ...inner]);
  const whole = P([...outer, [cx, cy + 4]]);
  const at = `${cx}% ${cy}%`;
  const sticks = [];
  for (let i = 0; i <= N; i++) {
    const a = step * i;
    sticks.push(`var(--color1) ${n2(a - 1.6)}deg ${n2(a + 1.6)}deg, transparent ${n2(a + 1.6)}deg ${n2(a + step - 1.6)}deg`);
  }
  const shade = [];
  for (let i = 0; i < N; i++) {
    const a = step * i;
    shade.push(`${i % 2 ? 'transparent' : '#000'} ${n2(a)}deg ${n2(a + step)}deg`);
  }
  add(
    'Folding Fan',
    'Open paper hand fans tossed at angles, each leaf folded into ten pleats with every other one in shadow, the sticks and rivet showing below.',
    (c) => ({
      host: `--leaf: ${leaf}; --fan: ${whole};
        --sticks: radial-gradient(circle at ${at}, var(--color1) 0 3%, transparent 3%), conic-gradient(from ${-half - 1.6}deg at ${at}, ${sticks.join(', ')}, transparent ${n2(2 * half + 1.6)}deg);
        --pleats: conic-gradient(from ${-half}deg at ${at}, ${shade.join(', ')}, transparent ${2 * half}deg);`,
      rule: `${F} { background: @var(--sticks); ${clipBy('fan')}
        ${xf(`translate(@r(-8, 8)%, @r(-2, 14)%) rotate(@r(-30, 30)deg) scale(@r(1.05, 1.3))`)}
        ${B(`inset: 0; background: ${ink(c, 2)}; ${clipBy('leaf')}`)}
        ${A(`inset: 0; background: var(--color1); opacity: 0.24; ${clipBy('leaf')} ${maskBy('pleats')}`)}
      }${TR}`,
    }),
    {
      palette: ['#F3EDE2', '#4A2C21', '#1F6F78', '#C0392B', '#D99A2B', '#2E3F6E', '#E58F8F'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['radial', 'semicircles', 'stripes'], mood: ['elegant', 'festive'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'textile'] },
    }
  );
}

{
  // A six-fold paper snowflake: one arm half drawn here, mirrored about the
  // 30 degree fold and turned six times; round holes punched along the arms
  // and a hexagon of holes round the middle.
  const half = [
    [48, 0], [41, 2.6], [38.5, 3.2], [45, 11.5], [41.5, 12.6], [35, 4.4], [29, 4.6],
    [33, 15.5], [29.5, 16.6], [24, 6.6], [17.5, 7.4], [22.5, 13],
  ];
  const toPolar = ([x, y]) => [Math.hypot(x, y), (Math.atan2(y, x) * 180) / Math.PI];
  const fromPolar = ([r, a]) => [50 + r * Math.cos(rad(a)), 50 + r * Math.sin(rad(a))];
  const seg = half.map(toPolar);
  const mirrored = seg.slice(0, -1).reverse().map(([r, a]) => [r, 60 - a]);
  const sixth = [...seg, ...mirrored];
  const pts = [];
  for (let k = 0; k < 6; k++) for (const [r, a] of sixth) pts.push(fromPolar([r, a + 60 * k - 90]));
  const holes = [];
  for (let k = 0; k < 6; k++) {
    const [x1, y1] = fromPolar([30, 60 * k - 90]);
    holes.push(`radial-gradient(2.4% 2.4% at ${n2(x1)}% ${n2(y1)}%, transparent 100%, #000 100%)`);
    const [x2, y2] = fromPolar([11, 60 * k - 60]);
    holes.push(`radial-gradient(3.2% 3.2% at ${n2(x2)}% ${n2(y2)}%, transparent 100%, #000 100%)`);
  }
  add(
    'Paper Snowflake',
    'Six-armed snowflakes cut from folded paper, every arm branched and notched and punched with small round holes, scattered at all angles.',
    (c) => ({
      host: `--flake: ${P(pts)}; --holes: ${holes.join(', ')};`,
      rule: `${F} { background: ${ink(c)}; ${clipBy('flake')} ${maskAllOf('holes')}
        ${xf(`translate(@r(-10, 10)%, @r(-10, 10)%) rotate(@r(0, 60)deg) scale(${noise(0.85, 1.3, 2)})`)}
      }${TR}`,
    }),
    {
      palette: ['#1D3557', '#F1FAEE', '#A8DADC', '#E9F1F7', '#CDE3EE'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['stars', 'radial', 'dots'], mood: ['calm', 'festive', 'elegant'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'card-texture'] },
    }
  );
}

// -- patchwork -------------------------------------------------------------------

{
  // Log cabin: a center square and three rounds of logs laid round it, the
  // two sides added last in light fabrics and the other two in dark. Turned
  // by quadrant and by the parity of the distance from the middle, the
  // blocks build concentric light and dark diamonds: barn raising.
  const u = 12.5;
  const layers = [];
  for (let k = 3; k >= 1; k--) {
    const lo = 4 - (k + 1);
    const hi = 4 + (k + 1);
    const ilo = 4 - k;
    const ihi = 4 + k;
    const L = k % 2 ? '--l1' : '--l2';
    const D = k % 2 ? '--d1' : '--d2';
    layers.push(rect(`@var(${L})`, lo * u, lo * u, (ihi - lo) * u, (ilo - lo) * u));
    layers.push(rect(`@var(${L === '--l1' ? '--l2' : '--l1'})`, ihi * u, lo * u, (hi - ihi) * u, (ihi - lo) * u));
    layers.push(rect(`@var(${D})`, ilo * u, ihi * u, (hi - ilo) * u, (hi - ihi) * u));
    layers.push(rect(`@var(${D === '--d1' ? '--d2' : '--d1'})`, lo * u, ilo * u, (ilo - lo) * u, (hi - ilo) * u));
  }
  const q = 'match(@dx >= 0, 1, 0)';
  const s = 'match(@dy >= 0, 1, 0)';
  const turn = `@calc(90 * (1 + ${q} + ${s} * (3 - 2 * ${q})) + 180 * ((floor(abs(@dx)) + floor(abs(@dy))) % 2))deg`;
  add(
    'Barn Raising',
    'Log cabin quilt blocks, each a red center wrapped in rounds of light and dark logs, turned so the halves build concentric diamonds out from the middle.',
    (c) => ({
      rule: `${F} { --l1: @p(var(--color3), var(--color4)); --l2: @p(var(--color3), var(--color4)); --d1: @p(var(--color1), var(--color2)); --d2: @p(var(--color1), var(--color2));
        background: ${layers.join(', ')};
        ${xf(`rotate(${turn})`)}
        ${A(`left: 37.5%; top: 37.5%; width: 25%; height: 25%; background: @p(var(--color5), var(--color6));`)}
      }${TR}`,
    }),
    {
      palette: ['#EADDC4', '#2F4858', '#5B3A29', '#F6EBD3', '#D3B98C', '#C8553D', '#B7472A'],
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['squares', 'stripes', 'diamonds', 'concentric'], mood: ['retro', 'calm'], density: 'dense', goodFor: ['textile', 'wallpaper', 'poster'] },
    }
  );
}

{
  // Grandmother's flower garden: hexagons in offset rows (an equal-sided
  // hexagon that tiles a square pitch), grouped into seven-patch flowers on a
  // lattice of index 13 with a one-hexagon path between them. Each hexagon
  // finds its class from (q - 3r) mod 13 and, for a petal, the flower it
  // belongs to; the flowers take the sheet-wide inks by a hash of their place.
  const s = 0.375;
  const hexTop = (s / (1 + 2 * s)) * 100;
  const shrink = (pts, k) => pts.map(([x, y]) => [50 + (x - 50) * k, 50 + (y - 50) * k]);
  const hex = P(shrink([[50, 0], [100, hexTop], [100, 100 - hexTop], [50, 100], [0, 100 - hexTop], [0, hexTop]], 0.95));
  // offset rows: even rows (y even, 1-based) are pushed right by half a cell
  const q = '(x - 1 - floor((y - 1) / 2))';
  const r = '(y - 1)';
  const g = `((((${q}) - 3 * ${r}) % 13 + 13) % 13)`;
  // petal class -> offset of the flower center
  const petals = { 1: [1, 0], 12: [-1, 0], 10: [0, 1], 3: [0, -1], 4: [1, -1], 9: [-1, 1] };
  const centerQ = (dq) => `(${q} - ${dq})`;
  const centerR = (dr) => `(${r} - ${dr})`;
  // lattice coordinates of a center: a = (4cq + cr) / 13, b = (3cr - cq) / 13
  const flowerId = (dq, dr) =>
    `((((4 * ${centerQ(dq)} + ${centerR(dr)}) / 13) * 2 + ((3 * ${centerR(dr)} - ${centerQ(dq)}) / 13) * 3) % 4 + 4) % 4`;
  const flowerInk = (dq, dr) =>
    `@match(${flowerId(dq, dr)} == 0, @var(--k0), ${flowerId(dq, dr)} == 1, @var(--k1), ${flowerId(dq, dr)} == 2, @var(--k2), @var(--k3))`;
  const petalCases = Object.entries(petals)
    .map(([cls, [dq, dr]]) => `${g} == ${cls}, ${flowerInk(dq, dr)}`)
    .join(', ');
  const fill = `@match(${g} == 0, var(--color1), ${petalCases}, var(--color2))`;
  add(
    'Flower Garden',
    'Grandmother\'s flower garden: hexagon patches pieced into seven-patch flowers, each a ring of one fabric round a yellow center, set apart by a cream path.',
    (c) => ({
      host: `--hex: ${hex};`,
      rule: `--k0: ${constant(c, 3, 4)}; --k1: ${constant(c, 4, 5)}; --k2: ${constant(c, 5, 6)}; --k3: ${constant(c, 3, 6)};
        @y(even) { --sh: 50%; } @y(odd) { --sh: 0%; }
        ${F} { --f: ${fill};
        ${B(`left: @var(--sh); top: -${s * 100}%; width: 100%; height: ${100 + 200 * s}%; background: @p(@var(--f)); ${clipBy('hex')}`)}
        ${A(`left: calc(@var(--sh) - 100%); top: -${s * 100}%; width: @match(x == 1, 100%, 0%); height: ${100 + 200 * s}%; background: @p(@var(--f)); ${clipBy('hex')}`)}
      }${TR}`,
    }),
    {
      palette: ['#7D8C6E', '#F2C14E', '#F4EBD9', '#D1495B', '#3E7CB1', '#8E5572', '#E07A5F'],
      grid: '6x9',
      tg: '8x8',
      meta: { tags: ['hexagons', 'mosaic', 'petals'], mood: ['retro', 'playful'], density: 'dense', goodFor: ['textile', 'wallpaper', 'packaging'] },
    }
  );
}

{
  // A paper doily: a scalloped round, an eyelet punched in every scallop, a
  // ring of larger holes inside that, and a second paper rosette laid on the
  // middle with its own hole.
  const outline = [];
  for (let d = 0; d < 360; d += 1.5) {
    const r = 39 + 8 * Math.sqrt(Math.abs(Math.cos(rad(8 * d))));
    outline.push(polar(50, 50, r, d));
  }
  const bore = (r, at) => `radial-gradient(${r}% ${r}% at ${at}, transparent 100%, #000 100%)`;
  const holes = [];
  for (let k = 0; k < 16; k++) {
    const [x, y] = polar(50, 50, 39.5, k * 22.5);
    holes.push(bore(2.4, `${n2(x)}% ${n2(y)}%`));
  }
  for (let k = 0; k < 12; k++) {
    const [x, y] = polar(50, 50, 27, k * 30 + 15);
    holes.push(bore(4.2, `${n2(x)}% ${n2(y)}%`));
  }
  const rosette = [];
  for (let d = 0; d < 360; d += 3) rosette.push(polar(50, 50, 10 + 8 * Math.abs(Math.cos(rad(4 * d))), d));
  add(
    'Doily',
    'Round paper doilies with scalloped edges, an eyelet punched in every scallop and a ring of holes inside, each with a smaller paper rosette laid on its middle.',
    (c) => ({
      host: `--lace: ${P(outline)}; --holes: ${holes.join(', ')}; --rosette: ${P(rosette)};`,
      rule: `${F} { ${xf('rotate(@r(0, 22.5)deg) scale(1.08)')}
        ${B(`inset: 0; background: ${ink(c)}; ${clipBy('lace')} ${maskAllOf('holes')}`)}
        ${A(`inset: 0; background: ${ink(c)}; ${clipBy('rosette')} ${msk(bore(3.2, '50% 50%'))}`)}
      }${TR}`,
    }),
    {
      palette: ['#9E4A57', '#FBF3E8', '#F3DCC4', '#F4C7CC', '#E9B44C'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['scallops', 'circles', 'dots', 'radial'], mood: ['elegant', 'retro'], density: 'medium', goodFor: ['wallpaper', 'packaging', 'card-texture'] },
    }
  );
}

{
  // Dresden plate: twelve pointed blades round a center circle, the blades
  // dealt from four fabrics in turn.
  const blades = [];
  for (let j = 0; j < 12; j++) {
    const a = j * 30;
    blades.push(polar(50, 50, 37, a), polar(50, 50, 44, a + 7), polar(50, 50, 48, a + 15), polar(50, 50, 44, a + 23));
  }
  const fabric = ['--b1', '--b2', '--b3', '--b4'];
  const sectors = [];
  for (let j = 0; j < 12; j++) {
    sectors.push(`@var(${fabric[j % 4]}) ${j * 30}deg ${(j + 1) * 30}deg`);
  }
  add(
    'Dresden Plate',
    'Dresden plate quilt blocks: twelve pointed blades in four alternating fabrics fanned round a plain center circle.',
    (c) => ({
      host: `--plate: ${P(blades)};`,
      rule: `${F} { --b1: ${ink(c, 2)}; --b2: ${ink(c, 2)}; --b3: ${ink(c, 2)}; --b4: ${ink(c, 2)};
        ${xf('rotate(@r(0, 30)deg)')}
        ${B(`inset: 0; background: conic-gradient(${sectors.join(', ')}); ${clipBy('plate')}`)}
        ${A(`left: 33%; top: 33%; width: 34%; height: 34%; border-radius: 50%; background: @p(var(--color1));`)}
      }${TR}`,
    }),
    {
      palette: ['#F1E9DA', '#2E294E', '#D90368', '#F49D37', '#3F88C5', '#7CB518', '#FFD400'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['radial', 'stars', 'circles', 'triangles'], mood: ['retro', 'festive', 'playful'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
    }
  );
}

{
  // Cathedral window: squares of folded muslin, and on every seam a curved
  // window of colored fabric with the muslin rolled back round it. Each cell
  // draws the windows on its left and top seams, so the one painted after it
  // never covers them.
  const h = 0.21;
  const rho = (0.25 + h * h) / (2 * h);
  const side = [];
  for (let i = 0; i <= 16; i++) {
    const y = i / 16;
    const x = -(rho - h) + Math.sqrt(rho * rho - (y - 0.5) ** 2);
    side.push([50 + (x / (2 * h)) * 100, y * 100]);
  }
  const lens = [...side, ...side.slice(1, -1).reverse().map(([x, y]) => [100 - x, y])];
  const lensV = P(lens);
  const lensH = P(lens.map(([x, y]) => [y, x]));
  const w = n2(2 * h * 100);
  const rim = `radial-gradient(closest-side, transparent 84%, var(--color2) 84%)`;
  add(
    'Cathedral Window',
    'Cathedral window patchwork: squares of cream muslin, a curved window of bright fabric on every seam, the muslin rolled back round each one.',
    (c) => ({
      host: `--lv: ${lensV}; --lh: ${lensH};`,
      rule: `${F} { background: linear-gradient(var(--color1), var(--color1)) 50% 50% / 96% 96% no-repeat;
        ${B(`left: -${w / 2}%; top: 0; width: ${w}%; height: 100%; background: ${rim}, ${ink(c, 3)}; ${clipBy('lv')}`)}
        ${A(`left: 0; top: -${w / 2}%; width: 100%; height: ${w}%; background: ${rim}, ${ink(c, 3)}; ${clipBy('lh')}`)}
      }${TR}`,
    }),
    {
      palette: ['#3B3355', '#F6EFE2', '#E5D8C3', '#E4572E', '#29335C', '#F3A712', '#669BBC'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['diamonds', 'curves', 'grid', 'squares'], mood: ['elegant', 'retro'], density: 'dense', goodFor: ['textile', 'wallpaper', 'card-texture'] },
    }
  );
}

{
  // Sawtooth star: a large center square with two points on each side, and a
  // square on point set in the middle. Neighboring blocks meet point to point.
  const star = P([
    [25, 0], [50, 25], [75, 0], [75, 25], [100, 25], [75, 50], [100, 75], [75, 75],
    [75, 100], [50, 75], [25, 100], [25, 75], [0, 75], [25, 50], [0, 25], [25, 25],
  ]);
  add(
    'Sawtooth Star',
    'Sawtooth star quilt blocks, each an eight-pointed star with a square on point at its heart, the stars meeting tip to tip across the sheet.',
    (c) => ({
      host: `--star: ${star}; --gem: ${P([[50, 27], [73, 50], [50, 73], [27, 50]])};`,
      rule: `${F} {
        ${B(`inset: 0; background: ${ink(c)}; ${clipBy('star')}`)}
        ${A(`inset: 0; background: ${ink(c)}; ${clipBy('gem')}`)}
      }${TR}`,
    }),
    {
      pal: 27,
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['stars', 'squares', 'diamonds', 'grid'], mood: ['retro', 'bold'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
    }
  );
}

{
  // Flying geese: two geese to a cell, stacked base to tip in columns that
  // fly up and down by turns between strips of sashing.
  const goose = P([[0, 100], [50, 0], [100, 100]]);
  add(
    'Flying Geese',
    'Flying geese patchwork: columns of triangles stacked base to tip, flying up and down by turns between plain strips of sashing.',
    (c) => ({
      host: `--goose: ${goose};`,
      rule: `${F} { background: linear-gradient(90deg, var(--color1) 0 8%, transparent 8% 92%, var(--color1) 92%);
        ${xf('rotate(@calc(180 * (@x % 2))deg)')}
        ${B(`left: 10%; width: 80%; top: 0; height: 50%; background: ${ink(c, 2)}; ${clipBy('goose')}`)}
        ${A(`left: 10%; width: 80%; top: 50%; height: 50%; background: ${ink(c, 2)}; ${clipBy('goose')}`)}
      }${TR}`,
    }),
    {
      pal: 0,
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['triangles', 'stripes', 'chevrons'], mood: ['retro', 'calm'], density: 'medium', goodFor: ['textile', 'wallpaper', 'section-divider'] },
    }
  );
}

{
  // Single Irish chain: nine-patch blocks (four corners and the middle) set
  // checkerwise with plain blocks, so the corner squares run in chains on
  // both diagonals; each plain block is quilted with a ring of running stitch.
  const t = 100 / 3;
  const corners = [
    rect('@var(--k)', 0, 0, t, t), rect('@var(--k)', 2 * t, 0, t, t),
    rect('@var(--k)', 0, 2 * t, t, t), rect('@var(--k)', 2 * t, 2 * t, t, t),
  ].join(', ');
  const ring = `${spokes(12, 15)}, radial-gradient(closest-side, transparent 88%, #000 88% 100%, transparent 100%)`;
  const even = '(x + y) % 2 == 0';
  add(
    'Irish Chain',
    'Single Irish chain: nine-patch blocks set checkerwise with plain ones, so small squares run in chains along both diagonals, each plain block quilted with a stitched ring.',
    (c) => ({
      host: `--nine: ${corners}; --ring: ${ring};`,
      rule: `--k: ${constant(c, 1, 2)}; ${F} { background: @match(${even}, @var(--nine), none);
        ${A(`inset: @match(${even}, ${n2(t)}%, 14%); border-radius: @match(${even}, 0%, 50%); background: @match(${even}, ${ink(c, 3)}, @p(var(--color1))); opacity: @match(${even}, 1, 0.55); -webkit-mask: @match(${even}, none, @var(--ring)); mask: @match(${even}, none, @var(--ring)); -webkit-mask-composite: source-in; mask-composite: intersect;`)}
      }${TR}`,
    }),
    {
      pal: 7,
      grid: '8x12',
      tg: '7x7',
      meta: { tags: ['squares', 'diagonals', 'checkerboard', 'rings'], mood: ['calm', 'retro'], density: 'sparse', goodFor: ['textile', 'wallpaper', 'hero-background'] },
    }
  );
}

{
  // Crazy quilt: each block cut once from edge to edge at a random slant, the
  // two patches in different fabrics, the seam worked over with a fly stitch
  // and the block edges with running stitch.
  const thread = 'var(--color1)';
  const edges = `repeating-linear-gradient(90deg, ${thread} 0 6%, transparent 6% 12%) 0 2% / 100% 3% no-repeat, repeating-linear-gradient(180deg, ${thread} 0 6%, transparent 6% 12%) 2% 0 / 3% 100% no-repeat`;
  const fly = `linear-gradient(${thread}, ${thread}) 0 50% / 100% 22% no-repeat, repeating-linear-gradient(90deg, ${thread} 0 3%, transparent 3% 12%) 0 0 / 100% 50% no-repeat, repeating-linear-gradient(90deg, transparent 0 6%, ${thread} 6% 9%, transparent 9% 12%) 0 100% / 100% 50% no-repeat`;
  add(
    'Crazy Quilt',
    'Crazy quilt blocks: every square cut once on a random slant into two fabrics, the seam embroidered with a gold fly stitch and the edges with running stitch.',
    (c) => ({
      host: `--edges: ${edges}; --fly: ${fly};`,
      rule: `${F} { --a: @r(6, 94); --b: @r(6, 94);
        background: @var(--edges), ${ink(c, 2)};
        ${xf('rotate(@p(0deg, 90deg, 180deg, 270deg))')}
        ${B(`inset: 0; background: @var(--edges), ${ink(c, 2)}; ${cp('polygon($(a)% 0%, 100% 0%, 100% 100%, $(b)% 100%)')}`)}
        ${A(`left: $((a + b) / 2)%; top: 50%; width: $(sqrt(10000 + (b - a) * (b - a)))%; height: 12%; background: @var(--fly); ${xf('translate(-50%, -50%) rotate($(atan2(100, b - a) * 57.29578)deg)')}`)}
      }${TR}`,
    }),
    {
      palette: ['#2A1F2D', '#E8B04A', '#6B2737', '#2D4A53', '#7A5C2E', '#4B3B6B', '#A23E48'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['diagonals', 'mosaic', 'lines', 'blocks'], mood: ['elegant', 'retro', 'organic'], density: 'dense', goodFor: ['textile', 'wallpaper', 'card-texture'] },
    }
  );
}

export const sectionL = { title: 'L. Papercraft', all };
