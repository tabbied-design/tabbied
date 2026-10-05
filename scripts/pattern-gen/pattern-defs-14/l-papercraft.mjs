// L. Papercraft - paper folded and cut, patchwork blocks, stitching, bunting and rosettes.
//
//   paper      Paper Planes, Folding Fan, Paper Snowflake, Doily, Slit Lattice,
//              Paper Scraps, Paper Sea, Paper Chain, Paper Dolls
//   patchwork  Barn Raising, Flower Garden, Dresden Plate, Cathedral Window,
//              Sawtooth Star, Flying Geese, Irish Chain, Crazy Quilt
//   stitches   Granny Square, Blanket Stitch, Rickrack, Fishbone
//   party      Pennant String, Rosette, Washi Tape, Sticker Sheet
//
// Things learned on the way, for whoever extends this file:
//
//   * Outlines (leaves, flakes, dolls, hexagons, frames with slits) are
//     polygons worked out here and set once on the host, read with @var().
//   * A sized background layer (background-size smaller than the box) is
//     snapped to whole pixels on screen and not in the SVG export, so blocks
//     of rectangles are drawn as hard-stop bands across the whole box, or as
//     polygons, instead.
//   * Two conic wedges side by side export with a hairline between them; a
//     pie of fabrics is drawn as every other wedge over the disc's own color.
//   * The SVG export paints cells in document order whatever their z-index,
//     so anything that reaches into a neighbor is drawn so that the cell
//     painted later is the one on top.
//   * At frequency 1 the gate still leaves out about one cell in a thousand.
//     The sea's layers and the rickrack draw a cell's worth more than their
//     own, so a neighbor covers the gap; the quilts paint their ground (the
//     muslin, the sashing) outside the gate where it is a separate fabric.
import { section, F, TR, ink, cp, msk, B, A, noise } from './shared.mjs';

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

// -- paper, folded and cut ----------------------------------------------------

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
  // past the rim, a dark wash on every other pleat, and the wooden guard
  // showing below the leaf.
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
  const shade = [];
  for (let i = 0; i < N; i++) {
    const a = step * i;
    shade.push(`${i % 2 ? 'transparent' : '#000'} ${n2(a)}deg ${n2(a + step)}deg`);
  }
  add(
    'Folding Fan',
    'Open paper hand fans tossed at angles, each leaf folded into ten pleats with every other one in shadow, the wooden guard showing below.',
    (c) => ({
      host: `--leaf: ${leaf}; --fan: ${whole};
        --pleats: conic-gradient(from ${-half}deg at ${at}, ${shade.join(', ')}, transparent ${2 * half}deg);`,
      rule: `${F} { background: var(--color1); ${clipBy('fan')}
        ${xf(`translate(@r(-8, 8)%, @r(-2, 14)%) rotate(@r(-30, 30)deg) scale(@r(1.05, 1.3))`)}
        ${B(`inset: 0; background: ${ink(c, 2)}; ${clipBy('leaf')}`)}
        ${A(`inset: 0; background: var(--color1); opacity: 0.3; ${clipBy('leaf')} ${maskBy('pleats')}`)}
      }${TR}`,
    }),
    {
      palette: ['#F3EDE2', '#7A4A2E', '#1F6F78', '#C0392B', '#D99A2B', '#2E3F6E', '#E58F8F'],
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
  // Kirigami: rows of slits cut half a pitch out of step, the sheet pulled
  // open so each slit gapes into a diamond. Every cell owns the halves of
  // four diamonds on its edges; a diamond's height is worked out from its own
  // place on the sheet, so the two cells that share it agree. The sheet gapes
  // widest round a point drawn once per sheet and stays nearly shut away from it.
  const a = 38;
  const open = (px, py) =>
    `@calc(1.5 + 30 * pow(max(0, cos(min(1.5708, 1.5708 * sqrt(pow((${px}) - $(cx) * @X, 2) + pow((${py}) - $(cy) * @Y, 2)) / (0.6 * max(@X, @Y))))), 2))`;
  const tb = open('@x - 0.5', '@y - 1');
  const bb = open('@x - 0.5', '@y');
  const lb = open('@x - 1', '@y - 0.5');
  const rb = open('@x', '@y - 0.5');
  add(
    'Slit Lattice',
    'A sheet of paper cut with staggered rows of slits and pulled open, the slits gaping into diamonds that are widest round one point and close up to thin slits away from it.',
    (c) => ({
      rule: `--k: ${constant(c)}; --cx: @pd(@p(0.3, 0.38, 0.46, 0.54, 0.62, 0.7)); --cy: @pd(@p(0.3, 0.38, 0.46, 0.54, 0.62, 0.7)); ${F} { --t: ${tb}; --b: ${bb}; --l: ${lb}; --r: ${rb};
        background: ${paint('k')}; ${xf('scale(1.012)')}
        ${cp(`polygon(0% 0%, ${50 - a}% 0%, 50% $(t)%, ${50 + a}% 0%, 100% 0%, 100% $(50 - r)%, ${100 - a}% 50%, 100% $(50 + r)%, 100% 100%, ${50 + a}% 100%, 50% $(100 - b)%, ${50 - a}% 100%, 0% 100%, 0% $(50 + l)%, ${a}% 50%, 0% $(50 - l)%)`)}
      }${TR}`,
    }),
    {
      pal: 21,
      grid: '8x12',
      tg: '10x10',
      meta: { tags: ['diamonds', 'lattice', 'grid'], mood: ['technical', 'bold'], density: 'dense', goodFor: ['hero-background', 'poster', 'wallpaper'] },
    }
  );
}

{
  // Torn paper scraps: a ragged quadrilateral per cell, its edge torn at
  // random, the white core of the paper showing round a colored face, and a
  // ruled, squared or dotted print on some of them. Laid in reading order,
  // each scrap overlaps the ones before it.
  const j = (v, d) => `@calc(${v} + @ri(-${d}, ${d}))%`;
  const side = (x0, y0, x1, y1, n, d) => {
    const out = [];
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t;
      out.push(x0 === x1 ? `${j(x, d)} ${n2(y)}%` : `${n2(x)}% ${j(y, d)}`);
    }
    return out;
  };
  const corner = (x, y) => `${j(x, 5)} ${j(y, 5)}`;
  const pts = [
    corner(8, 8), ...side(8, 8, 92, 8, 7, 3),
    corner(92, 8), ...side(92, 8, 92, 92, 7, 3),
    corner(92, 92), ...side(92, 92, 8, 92, 7, 3),
    corner(8, 92), ...side(8, 92, 8, 8, 7, 3),
  ];
  const lines = 'repeating-linear-gradient(180deg, transparent 0 11%, var(--color1) 11% 13.5%)';
  const grid = 'repeating-linear-gradient(90deg, transparent 0 11%, var(--color1) 11% 13%), repeating-linear-gradient(180deg, transparent 0 11%, var(--color1) 11% 13%)';
  const dots = 'radial-gradient(circle at 50% 50%, var(--color1) 0 22%, transparent 22%) 0 0 / 14% 14%';
  add(
    'Paper Scraps',
    'A collage of torn paper scraps laid over one another at angles, each with a ragged white torn edge, some ruled, squared or dotted like pages from a notebook.',
    (c) => ({
      host: `--lines: ${lines}; --grid: ${grid}; --dots: ${dots};`,
      rule: `${F} { background: var(--color1); ${cp(`polygon(${pts.join(', ')})`)}
        ${xf(`translate(@r(-14, 14)%, @r(-14, 14)%) rotate(@r(-40, 40)deg) scale(@r(1.15, 1.45))`)}
        ${B(`inset: 11%; background: ${ink(c, 2)};`)}
        ${A(`inset: 11%; background: @p(@var(--lines), @var(--grid), @var(--dots), none, none); opacity: 0.45;`)}
      }${TR}`,
    }),
    {
      palette: ['#2B2D42', '#FBF7EF', '#E63946', '#F4A261', '#2A9D8F', '#A8DADC', '#E9C46A'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['squares', 'mosaic', 'lines', 'dots'], mood: ['playful', 'organic'], density: 'dense', goodFor: ['poster', 'packaging', 'card-texture'] },
    }
  );
}

{
  // Cut-paper sea: one layer of paper per row, its top edge a wave that runs
  // the whole width of the sheet, each layer laid over the one behind with a
  // thin shadow along its edge. The wave is worked out from the cell's place
  // on the sheet, so the edge runs on unbroken from cell to cell; each cell
  // draws its own stretch and the one to its left, so a cell the frequency
  // gate leaves out is covered by its neighbor. The wave's two phases are
  // drawn once per sheet, so a reseed rolls the swell along.
  // The two sines' phases are worked out once per cell (--a, --b), each of
  // the thirteen sample heights is then one short expression, and the
  // outline is built once on the cell (--e) for both layers to read.
  const n = 12;
  const k1 = 6.2832 / 4.6;
  const k2 = 6.2832 / 2.2;
  const f6 = (v) => Math.round(v * 1e6) / 1e6;
  const edge = Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * i) / n - 1;
    return `${n2((100 * i) / n)}% $(round(2100 + 1300 * sin(a + ${f6(k1 * t)}) + 500 * sin(b + ${f6(k2 * t)})) / 100)%`;
  }).join(', ');
  const tone = '1 + floor(min(0.999, (@y - 1) / @Y) * 5)';
  // The shadow is the same outline lifted by a twentieth of a cell.
  const box = (top) => `left: -100%; width: 200%; top: ${top}%; height: 200%;`;
  add(
    'Paper Sea',
    'A sea cut from layers of paper, one wave-edged sheet per row from pale at the top to deep at the bottom, each laid over the one behind with a thin shadow along its edge.',
    (c) => ({
      rule: `--ph: @pd(@p(0, 0.8, 1.6, 2.4, 3.2, 4, 4.8, 5.6)); --pk: @pd(@p(0, 0.8, 1.6, 2.4, 3.2, 4, 4.8, 5.6)); ${F} {
        --a: @calc(${f6(k1)} * (@x - 1) + 1.9 * @y + $(ph)); --b: @calc(${f6(k2)} * (@x - 1) - 1.3 * @y + $(pk));
        --t: @calc(${tone});
        --w: @match($(t) == 1, var(--color1), $(t) == 2, var(--color2), $(t) == 3, var(--color3), $(t) == 4, var(--color4), var(--color5));
        --e: polygon(${edge}, 100% 100%, 0% 100%);
        ${B(`${box(-5)} background: var(--color5); opacity: 0.3; ${clipBy('e')}`)}
        ${A(`${box(0)} background: ${paint('w')}; ${clipBy('e')}`)}
      }${TR}`,
    }),
    {
      palette: ['#FDF6E9', '#BFE3E8', '#7CC3CF', '#3E8EA8', '#1F5F82', '#0E3352'],
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['waves', 'stripes', 'curves'], mood: ['calm', 'organic'], density: 'dense', goodFor: ['hero-background', 'wallpaper', 'poster'] },
    }
  );
}

{
  // Paper chains hanging in columns: a loop seen face on in every cell and
  // a loop seen edge on threading it to the one above. The edge-on loop is
  // drawn first, so the loop below passes in front of it and the loop above
  // (painted earlier) behind it.
  const ring = (t) => msk(`radial-gradient(closest-side, transparent ${t}%, #000 ${t}%)`);
  add(
    'Paper Chain',
    'Paper chains hanging in columns, the links in mixed colors, each face-on loop threaded through a narrow edge-on loop to the next.',
    (c) => ({
      rule: `${F} { ${xf(`translateX(@calc(7 * sin(@y * 0.7 + @x * 2.3))%)`)}
        ${B(`left: 41%; width: 18%; top: -30%; height: 60%; border-radius: 50%; background: ${ink(c)}; ${ring(56)}`)}
        ${A(`left: 17%; width: 66%; top: 8%; height: 84%; border-radius: 50%; background: ${ink(c)}; ${ring(74)}`)}
      }${TR}`,
    }),
    {
      palette: ['#FBF5EA', '#E94F37', '#F6AE2D', '#33658A', '#86BBD8', '#7FB069', '#B5838D'],
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['rings', 'ovals', 'stripes'], mood: ['festive', 'playful'], density: 'medium', goodFor: ['packaging', 'wallpaper', 'section-divider'] },
    }
  );
}

{
  // A row of paper dolls cut from one folded strip: hands joined at the cell
  // edges, a girl in a flared skirt or a boy in trousers in every cell (the
  // two outlines share a point count, so a reseed morphs one into the other).
  // Each row is cut from a sheet in one of the sheet-wide colors.
  const half = (body) => {
    const head = [];
    for (let d = 0; d <= 150; d += 30) head.push(polar(50, 16, 11, d));
    return [...head, [53.5, 28], [62, 31], [100, 31], [100, 39], [66, 39], ...body];
  };
  const girl = half([[63, 44], [79, 79], [60, 79], [60, 93], [66, 95], [66, 99], [53, 99], [53, 81], [50, 81]]);
  const boy = half([[64, 46], [64, 64], [63, 64], [62, 93], [66, 95], [66, 99], [53, 99], [52, 66], [50, 66]]);
  const whole = (pts) => P([...pts, ...pts.slice(1, -1).reverse().map(([x, y]) => [100 - x, y])]);
  add(
    'Paper Dolls',
    'Chains of paper dolls holding hands across the sheet, girls in flared skirts and boys in trousers, each row cut from one sheet of colored paper.',
    (c) => ({
      host: `--girl: ${whole(girl)}; --boy: ${whole(boy)};`,
      rule: `--k0: ${constant(c, 1, 2)}; --k1: ${constant(c, 3, 4)}; --k2: ${constant(c, 5, 5)};
        ${F} { --d: @match(y % 3 == 0, @var(--k0), y % 3 == 1, @var(--k1), @var(--k2));
        ${B(`inset: 4% 0 0 0; background: ${paint('d')}; ${cp('@p(@var(--girl), @var(--boy))')}`)}
      }${TR}`,
    }),
    {
      pal: 28,
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['stripes', 'grid', 'curves'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['packaging', 'section-divider', 'wallpaper'] },
    }
  );
}

// -- patchwork ----------------------------------------------------------------

{
  // Log cabin: a center square and four rounds of logs round it, light on
  // the top and right, dark on the bottom and left. The logs are hard-stop
  // bands across the whole block (rows on the cell for the top and bottom,
  // columns on a bow-tie of the left and right quarters), so every edge is a
  // plain gradient stop; the ends meet in a miter. Turned by quadrant and by
  // the parity of the distance from the middle, the blocks build concentric
  // light and dark diamonds: barn raising.
  const u = 10;
  const k = 4;
  const bands = (angle, near, far) => {
    const stops = [];
    near.forEach((v, i) => stops.push(`@var(${v}) ${i * u}% ${(i + 1) * u}%`));
    stops.push(`transparent ${k * u}% ${100 - k * u}%`);
    far.forEach((v, i) => stops.push(`@var(${v}) ${100 - (k - i) * u}% ${100 - (k - i - 1) * u}%`));
    return `linear-gradient(${angle}, ${stops.join(', ')})`;
  };
  // outermost round first on the near side, innermost first on the far side
  const rows = bands('180deg', ['--ly', '--lx', '--ly', '--lx'], ['--dy', '--dx', '--dy', '--dx']);
  const cols = bands('90deg', ['--dx', '--dy', '--dx', '--dy'], ['--lx', '--ly', '--lx', '--ly']);
  // the middle sits on a block corner even when the grid is odd, so the
  // diamonds stay whole (half a block off center rather than split)
  const dx = '(@x - floor(@X / 2) - 0.5)';
  const dy = '(@y - floor(@Y / 2) - 0.5)';
  const q = `match(${dx} > 0, 1, 0)`;
  const sy = `match(${dy} > 0, 1, 0)`;
  const turn = `@calc(90 * (1 + ${q} + ${sy} * (3 - 2 * ${q})) + 180 * ((floor(abs(${dx})) + floor(abs(${dy}))) % 2))deg`;
  add(
    'Barn Raising',
    'Log cabin quilt blocks, each a bright center framed by rounds of light and dark logs, turned so the light and dark halves build concentric diamonds out from the middle.',
    (c) => ({
      host: `--bowtie: ${P([[0, 0], [50, 50], [100, 0], [100, 100], [50, 50], [0, 100]])};`,
      rule: `${F} { --li: @p(0, 1); --di: @p(0, 1);
        --lx: @match($(li) == 0, var(--color3), var(--color4)); --ly: @match($(li) == 0, var(--color4), var(--color3));
        --dx: @match($(di) == 0, var(--color1), var(--color2)); --dy: @match($(di) == 0, var(--color2), var(--color1));
        background: ${rows};
        ${xf(`rotate(${turn}) scale(1.012)`)}
        ${B(`left: ${k * u}%; top: ${k * u}%; width: ${100 - 2 * k * u}%; height: ${100 - 2 * k * u}%; background: @p(var(--color5), var(--color6));`)}
        ${A(`inset: 0; background: ${cols}; ${clipBy('bowtie')}`)}
      }${TR}`,
    }),
    {
      palette: ['#E6D9BF', '#1F3A4D', '#6E3B2A', '#FAF3E3', '#EBD3A2', '#D1495B', '#E07A3F'],
      grid: '8x12',
      tg: '10x10',
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
  // T + S = 1 (half height plus half shoulder) tiles the offset rows; equal
  // sides then give a slant 0.375 tall and a vertical side 0.625 long.
  const s = 0.375;
  const H = 1 + s;
  const hexTop = (s / H) * 100;
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
        ${B(`left: @var(--sh); top: -${n2(s * 50)}%; width: 100%; height: ${n2(H * 100)}%; background: @p(@var(--f)); ${clipBy('hex')}`)}
        ${A(`left: calc(@var(--sh) - 100%); top: -${n2(s * 50)}%; width: @match(x == 1, 100%, 0%); height: ${n2(H * 100)}%; background: @p(@var(--f)); ${clipBy('hex')}`)}
      }${TR}`,
    }),
    {
      palette: ['#7D8C6E', '#F2C14E', '#F4EBD9', '#D1495B', '#3E7CB1', '#8E5572', '#E07A5F'],
      grid: '10x15',
      tg: '12x12',
      meta: { tags: ['hexagons', 'mosaic', 'petals'], mood: ['retro', 'playful'], density: 'dense', goodFor: ['textile', 'wallpaper', 'packaging'] },
    }
  );
}

{
  // Dresden plate: twelve pointed blades round a center circle, the blades
  // dealt from four fabrics in turn, the odd ones from one pair of inks and
  // the even ones from another, so two neighbors never share a fabric. The
  // first fabric is the plate's own color, under wedges of the other three.
  const blades = [];
  for (let j = 0; j < 12; j++) {
    const a = j * 30;
    blades.push(polar(50, 50, 40, a), polar(50, 50, 45.5, a + 8), polar(50, 50, 49, a + 15), polar(50, 50, 45.5, a + 22));
  }
  const fabric = ['--b1', '--b2', '--b3', '--b4'];
  const band = (angle) => `linear-gradient(${angle}, var(--color2) 0 2.5%, transparent 2.5% 97.5%, var(--color2) 97.5%)`;
  const sash = `${band('90deg')}, ${band('180deg')}, var(--color1)`;
  const sectors = [];
  for (let j = 0; j < 12; j++) {
    sectors.push(`${j % 4 ? `@var(${fabric[j % 4]})` : 'transparent'} ${j * 30}deg ${(j + 1) * 30}deg`);
  }
  add(
    'Dresden Plate',
    'Dresden plate quilt blocks: twelve pointed blades in four alternating fabrics fanned round a plain center circle.',
    (c) => ({
      host: `--plate: ${P(blades)};`,
      rule: `background: ${sash}; ${F} { --b1: @p(var(--color3), var(--color4)); --b3: @p(var(--color3), var(--color4)); --b2: @p(var(--color5), var(--color6)); --b4: @p(var(--color5), var(--color6));
        ${B(`inset: 2%; background: conic-gradient(${sectors.join(', ')}), @var(--b1); ${clipBy('plate')} ${xf('rotate(@r(0, 30)deg)')}`)}
        ${A(`left: 35%; top: 35%; width: 30%; height: 30%; border-radius: 50%; background: ${ink(c, 3)};`)}
      }${TR}`,
    }),
    {
      palette: ['#2F3E46', '#F3EBDD', '#3B4A52', '#C8553D', '#E9B44C', '#4F8A8B', '#B56576'],
      grid: '4x6',
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
      rule: `background: linear-gradient(var(--color1), var(--color1)) 50% 50% / 96% 96% no-repeat; ${F} {
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
      rule: `--k0: ${constant(c, 1, 3)}; --k1: ${constant(c, 4, 5)}; ${F} { --s: @match((x + y) % 2 == 0, @var(--k0), @var(--k1));
        ${B(`inset: 0; background: ${paint('s')}; ${clipBy('star')}`)}
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
      rule: `background: linear-gradient(90deg, var(--color1) 0 8%, transparent 8% 92%, var(--color1) 92%);
        ${xf('rotate(@calc(180 * (@x % 2))deg) scale(1.012)')} ${F} {
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
      host: `--ring: ${ring};`,
      rule: `--k: ${constant(c, 1, 2)}; --nine: ${corners}; ${F} { background: @match(${even}, @var(--nine), none);
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
      rule: `background: @var(--edges); ${F} { --a: @r(6, 94); --b: @r(6, 94);
        background: @var(--edges), ${ink(c, 2)};
        ${xf('rotate(@p(0deg, 90deg, 180deg, 270deg)) scale(1.012)')}
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

// -- stitches and yarn --------------------------------------------------------

{
  // A granny square: a ring of yarn at the middle, then two square rounds of
  // treble clusters, every cluster three posts, a gap at each corner and
  // between the clusters. A round is a box whose middle is masked out (two
  // hard bands, added) and whose outline is a square notched with the slits
  // between posts and clusters and with its corners cut away, worked out once
  // on the host. The outer round is the same black on every square.
  const frame = (f, clusters) => {
    const g = 5;
    const span = 100 - 2 * g;
    const cuts = [];
    for (let k = 0; k < clusters; k++) {
      const a = g + (span * k) / clusters;
      const len = span / clusters;
      // the gap between clusters goes right through; the two between the
      // three posts of a cluster are shallow nicks in the top of it
      if (k > 0) cuts.push([a, 4.4, f + 6]);
      cuts.push([a + len / 3, 1.6, f * 0.28], [a + (2 * len) / 3, 1.6, f * 0.28]);
    }
    // one side, left to right along x at y = 0, then a mitred gap at the
    // corner closing to a point at the inner corner of the round
    const side = [[g, 0]];
    for (const [x, w, d] of cuts) side.push([x - w / 2, 0], [x - w / 2, d], [x + w / 2, d], [x + w / 2, 0]);
    side.push([100 - g, 0], [100 - f, f]);
    const turn = (pts, k) =>
      pts.map(([x, y]) => {
        for (let i = 0; i < k; i++) [x, y] = [100 - y, x];
        return [x, y];
      });
    const pts = [];
    for (let k = 0; k < 4; k++) pts.push(...turn(side, k));
    const hole = (angle) => `linear-gradient(${angle}, #000 0 ${n2(f)}%, transparent ${n2(f)}% ${n2(100 - f)}%, #000 ${n2(100 - f)}%)`;
    return { clip: P(pts), mask: `${hole('90deg')}, ${hole('180deg')}` };
  };
  const outer = frame((12 / 90) * 100, 3);
  const inner = frame((10.5 / 61) * 100, 2);
  add(
    'Granny Square',
    'Crocheted granny squares: a ring of yarn round a small center hole, then a bright round and a black round of three-post clusters, with gaps between the clusters and at the corners.',
    (c) => ({
      host: `--oc: ${outer.clip}; --om: ${outer.mask}; --ic: ${inner.clip}; --im: ${inner.mask};`,
      rule: `${F} { --c1: ${ink(c, 2)}; background: radial-gradient(closest-side, transparent 0 14%, @var(--c1) 14% 31%, transparent 31%);
        ${B(`left: 19.5%; top: 19.5%; width: 61%; height: 61%; background: ${ink(c, 2)}; ${clipBy('ic')} ${maskBy('im')}`)}
        ${A(`left: 5%; top: 5%; width: 90%; height: 90%; background: var(--color1); ${clipBy('oc')} ${maskBy('om')}`)}
      }${TR}`,
    }),
    {
      palette: ['#EFE6D2', '#26211E', '#E4572E', '#F3A712', '#29A19C', '#A23B72', '#4D9DE0'],
      grid: '4x6',
      tg: '5x5',
      meta: { tags: ['squares', 'concentric', 'grid', 'rings'], mood: ['retro', 'playful'], density: 'medium', goodFor: ['textile', 'packaging', 'wallpaper'] },
    }
  );
}

{
  // Felt patches sewn down with blanket stitch: a thread run round each patch
  // just inside its edge, and a short upright stitch every tenth of a side
  // from that line in toward the middle.
  const th = 'var(--color1)';
  const layer = (img, l, t, w, h) => {
    const pos = (edge, size) => (size >= 100 ? 0 : n2((edge / (100 - size)) * 100));
    return `${img} ${pos(l, w)}% ${pos(t, h)}% / ${n2(w)}% ${n2(h)}% no-repeat`;
  };
  const e = 8;
  const lw = 2.2;
  const tick = 11;
  const ticksX = `repeating-linear-gradient(90deg, ${th} 0 2.6%, transparent 2.6% 10%)`;
  const ticksY = `repeating-linear-gradient(180deg, ${th} 0 2.6%, transparent 2.6% 10%)`;
  const stitches = [
    rect(th, e, e, 100 - 2 * e, lw), rect(th, e, 100 - e - lw, 100 - 2 * e, lw),
    rect(th, e, e, lw, 100 - 2 * e), rect(th, 100 - e - lw, e, lw, 100 - 2 * e),
    layer(ticksX, e + 3.6, e, 100 - 2 * e - 3.6, tick), layer(ticksX, e + 3.6, 100 - e - tick, 100 - 2 * e - 3.6, tick),
    layer(ticksY, e, e + 3.6, tick, 100 - 2 * e - 3.6), layer(ticksY, 100 - e - tick, e + 3.6, tick, 100 - 2 * e - 3.6),
  ];
  add(
    'Blanket Stitch',
    'Squares of colored felt sewn down slightly askew, each edged with a cream blanket stitch: a running thread with short upright stitches at even spacing.',
    (c) => ({
      host: `--stitches: ${stitches.join(', ')};`,
      rule: `${F} { background: ${ink(c, 2)}; ${xf('rotate(@r(-9, 9)deg) scale(0.8)')}
        ${A('inset: 0; background: @var(--stitches);')}
      }${TR}`,
    }),
    {
      palette: ['#E8E0D0', '#FBF6EC', '#B5543C', '#3E6259', '#D9A441', '#6C4F70', '#8A9A5B'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['squares', 'lines', 'grid'], mood: ['organic', 'calm', 'retro'], density: 'medium', goodFor: ['textile', 'card-texture', 'wallpaper'] },
    }
  );
}

{
  // Rickrack braid running down the sheet, one color to a column, with a
  // running stitch sewn down its middle. The braid is two periods tall and
  // slides by a whole number of quarter periods per column, so every column
  // keeps its own phase and a reseed slides them.
  // The braid's middle line, in cell units over a box two cells tall, and
  // the ribbon laid along it at an even width (offset along the normal), so
  // the peaks round off the way woven rickrack does.
  const band = (amp, w, periods) => {
    const n = 40 * periods;
    const mid = (t) => {
      const sn = Math.sin(2 * Math.PI * periods * t);
      return [50 + amp * Math.sign(sn) * Math.abs(sn) ** 0.6, 200 * t];
    };
    const left = [];
    const right = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const [x, y] = mid(t);
      const [x1, y1] = mid(Math.min(1, t + 1e-4));
      const [x0, y0] = mid(Math.max(0, t - 1e-4));
      const len = Math.hypot(x1 - x0, y1 - y0);
      const nx = (y1 - y0) / len;
      const ny = -(x1 - x0) / len;
      left.push([x - w * nx, (y - w * ny) / 2]);
      right.push([x + w * nx, (y + w * ny) / 2]);
    }
    return P([...left, ...right.reverse()]);
  };
  add(
    'Rickrack',
    'Columns of wavy rickrack braid in bright colors, each sewn down its middle with a dashed running stitch.',
    (c) => ({
      host: `--rick: ${band(17, 12, 2)}; --seam: ${band(17, 1.4, 2)};`,
      rule: `--k: ${byColumn(c, 2, c - 1)}; --ph: @pd(@m(@X, @p(0%, 12.5%, 25%, 37.5%))); ${F} {
        ${B(`left: 0; right: 0; top: -100%; height: 200%; background: ${paint('k')}; ${clipBy('rick')} ${xf('translateY(@var(--ph))')}`)}
        ${A(`left: 0; right: 0; top: -100%; height: 200%; background: var(--color1); ${clipBy('seam')} ${msk('repeating-linear-gradient(180deg, #000 0 3%, transparent 3% 5%)')} ${xf('translateY(@var(--ph))')}`)}
      }${TR}`,
    }),
    {
      palette: ['#F7F1E5', '#FFFFFF', '#E63946', '#2A9D8F', '#F4A261', '#457B9D', '#E9C46A'],
      grid: '8x12',
      tg: '8x8',
      meta: { tags: ['waves', 'stripes', 'lines'], mood: ['playful', 'retro'], density: 'medium', goodFor: ['textile', 'section-divider', 'packaging'] },
    }
  );
}

{
  // Fishbone stitch: each leaf is two halves of satin stitch slanting back
  // from the midrib. A half is an element turned 45 degrees one way or the
  // other, so its stitches are plain horizontal stripes; its outline is the
  // half leaf worked out here in that turned frame.
  const leafHalf = (sign) => {
    const pts = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      pts.push([50 + sign * 31 * Math.sin(Math.PI * t) ** 0.85 * (1 - 0.18 * t), 6 + 88 * t]);
    }
    return [[50, 94], [50, 6], ...pts.slice(1, -1)];
  };
  const turned = (pts, deg) => {
    const a = rad(-deg);
    return pts.map(([x, y]) => {
      const dx = x - 50;
      const dy = y - 50;
      const lx = 50 + dx * Math.cos(a) - dy * Math.sin(a);
      const ly = 50 + dx * Math.sin(a) + dy * Math.cos(a);
      return [((lx + 25) / 150) * 100, ((ly + 25) / 150) * 100];
    });
  };
  const stitch = 'repeating-linear-gradient(180deg, transparent 0 1%, #000 1% 5.2%)';
  add(
    'Fishbone',
    'Embroidered leaves in fishbone stitch, each half worked in slanting satin stitches that meet at the midrib, scattered at angles that sway together across the sheet.',
    (c) => ({
      host: `--right: ${P(turned(leafHalf(1), -45))}; --left: ${P(turned(leafHalf(-1), 45))}; --stitch: ${stitch};`,
      rule: `${F} { --k: ${ink(c)}; ${xf(`rotate(@calc(${noise(-80, 80, 1.6)} + @r(-25, 25))deg) scale(1.1)`)}
        ${B(`inset: -25%; background: ${paint('k')}; ${clipBy('right')} ${maskBy('stitch')} ${xf('rotate(-45deg)')}`)}
        ${A(`inset: -25%; background: ${paint('k')}; opacity: 0.72; ${clipBy('left')} ${maskBy('stitch')} ${xf('rotate(45deg)')}`)}
      }${TR}`,
    }),
    {
      palette: ['#F3EEE3', '#2F5D50', '#6A994E', '#BC4749', '#386641', '#D4A373'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['leaves', 'lines', 'diagonals'], mood: ['organic', 'elegant'], density: 'medium', goodFor: ['textile', 'wallpaper', 'card-texture'] },
    }
  );
}

// -- party trimmings ----------------------------------------------------------

{
  // Bunting: a string drooping across the whole width of the sheet in every
  // row, the drop worked out from the cell's place so the string runs on
  // unbroken from cell to cell, and a flag hung from it in each cell, either
  // a pennant or a swallowtail (same point count, so a reseed morphs them).
  // The string is drawn outside the frequency gate: thinning takes flags
  // off the string, never the string itself.
  const sag = (f) => `(10 + (36 + 22 * ((@y % 3) / 2)) * 4 * (${f}) * (1 - (${f})))`;
  const yl = sag('(@x - 1) / @X');
  const yr = sag('@x / @X');
  const pennant = P([[10, 0], [90, 0], [70, 40], [50, 80], [30, 40]]);
  const swallow = P([[12, 0], [88, 0], [88, 74], [50, 50], [12, 74]]);
  add(
    'Pennant String',
    'Strings of party bunting drooping across the sheet row under row, hung with bright pennants and swallowtail flags.',
    (c) => ({
      host: `--pennant: ${pennant}; --swallow: ${swallow};`,
      rule: `--l: @calc(${yl}); --r: @calc(${yr});
        ${A(`left: 0; top: calc($(l) * 1% - 1.2%); width: $(sqrt(10000 + (r - l) * (r - l)))%; height: 2.4%; background: var(--color1); ${tfo('0 50%')} ${xf('rotate($(atan2(r - l, 100) * 57.29578)deg)')}`)}
        ${F} {
        ${B(`left: 8%; width: 84%; top: $((l + r) / 2)%; height: 82%; background: ${ink(c, 2)}; ${cp('@p(@var(--pennant), @var(--swallow))')} ${tfo('50% 0')} ${xf('rotate($(atan2(r - l, 100) * 57.29578)deg)')}`)}
      }${TR}`,
    }),
    {
      palette: ['#FFF8EC', '#3D405B', '#E63946', '#F4A261', '#2A9D8F', '#E9C46A', '#8E7DBE'],
      grid: '6x9',
      tg: '6x6',
      meta: { tags: ['triangles', 'curves', 'lines'], mood: ['festive', 'playful'], density: 'medium', goodFor: ['section-divider', 'packaging', 'og-image'] },
    }
  );
}

{
  // Prize rosettes: a disc of sixteen pleats in two colors with a pointed
  // edge, a button in the middle, and a pair of swallowtail ribbons hanging
  // below that reach into the row beneath (laid in reading order, the next
  // row's rosettes sit over them).
  const edge = [];
  for (let i = 0; i < 32; i++) edge.push(polar(50, 50, i % 2 ? 44 : 49, i * 11.25));
  const tails = P([[44, 30], [56, 30], [80, 100], [70, 92], [62, 104], [50, 52], [38, 104], [30, 92], [20, 100]]);
  // the two pleat colors are always different inks, and only every other
  // pleat is a wedge, over the disc's own color: two wedges side by side
  // export with a hairline between them
  const pick = (idx) => `@match(${[0, 1, 2, 3].map((k) => `${idx} == ${k}, var(--color${k + 2})`).join(', ')}, var(--color6))`;
  const pleats = [];
  for (let i = 0; i < 16; i++) pleats.push(`${i % 2 ? '@var(--q)' : 'transparent'} ${n2(i * 22.5)}deg ${n2((i + 1) * 22.5)}deg`);
  add(
    'Rosette',
    'Prize rosettes in rows: discs of sixteen pleats in two colors with pointed edges, a button at the middle and two swallowtail ribbons hanging below.',
    (c) => ({
      host: `--edge: ${P(edge)}; --tails: ${tails};`,
      rule: `${F} { --pi: @p(0, 1, 2, 3, 4); --qd: @p(1, 2, 3, 4);
        --p: ${pick('$(pi)')}; --q: ${pick('($(pi) + $(qd)) % 5')}; ${xf('rotate(@r(-10, 10)deg)')}
        ${B(`left: 10%; width: 80%; top: 22%; height: 96%; background: ${paint('p')}; ${clipBy('tails')}`)}
        ${A(`left: 8%; width: 84%; top: 0; height: 84%; background: radial-gradient(closest-side, var(--color1) 0 30%, transparent 30% 35%, @var(--q) 35% 40%, transparent 40%), conic-gradient(from -5.625deg, ${pleats.join(', ')}), @var(--p); ${clipBy('edge')}`)}
      }${TR}`,
    }),
    {
      palette: ['#F6F1E7', '#F2C14E', '#1D4E89', '#C1121F', '#2A7F62', '#6A4C93', '#F28C28'],
      grid: '4x6',
      tg: '5x5',
      meta: { tags: ['radial', 'circles', 'triangles', 'stars'], mood: ['festive', 'retro'], density: 'medium', goodFor: ['packaging', 'poster', 'wallpaper'] },
    }
  );
}

{
  // Washi tape: a strip of paper tape per cell with torn zigzag ends, laid
  // at a slant that leans together across the sheet, translucent where the
  // strips cross, and printed with stripes, dots or a check on some.
  const zig = [];
  for (let i = 0; i <= 8; i++) zig.push([i % 2 ? 3 : 0, i * 12.5]);
  const tape = P([...zig, ...zig.slice().reverse().map(([x, y]) => [100 - x, y])]);
  const ink1 = 'var(--color1)';
  add(
    'Washi Tape',
    'Strips of translucent washi tape with torn zigzag ends crisscrossing the sheet, some plain and some printed with stripes, dots or a check.',
    (c) => ({
      host: `--tape: ${tape};
        --stripes: repeating-linear-gradient(90deg, transparent 0 4%, ${ink1} 4% 6%);
        --dots: radial-gradient(circle at 50% 50%, ${ink1} 0 18%, transparent 18%) 0 0 / 7% 25%;
        --check: repeating-linear-gradient(90deg, transparent 0 3%, ${ink1} 3% 6%), repeating-linear-gradient(180deg, transparent 0 12.5%, ${ink1} 12.5% 25%);`,
      rule: `${F} { ${xf(`translate(@r(-12, 12)%, @r(-12, 12)%) rotate(@calc(${noise(-70, 70, 1.3)} + @p(-90, 0, 0))deg)`)}
        ${B(`left: -25%; width: 150%; top: 30%; height: 40%; background: @p(@var(--stripes), @var(--dots), @var(--check), none), ${ink(c, 2)}; opacity: 0.82; ${clipBy('tape')}`)}
      }${TR}`,
    }),
    {
      palette: ['#33374A', '#FFFDF8', '#F4A7B9', '#9AD1D4', '#F6D186', '#B8B5E3', '#A7D7A0'],
      grid: '6x9',
      freq: 0.7,
      tg: '5x5',
      tf: 0.8,
      meta: { tags: ['stripes', 'diagonals', 'dots', 'mosaic'], mood: ['playful', 'calm'], density: 'dense', goodFor: ['packaging', 'card-texture', 'wallpaper'] },
    }
  );
}

{
  // A sheet of die-cut stickers: a star, a heart, a round, a lightning bolt
  // or a flower, each on a white backing cut a little wider than the shape.
  const star = [];
  for (let i = 0; i < 10; i++) star.push(polar(50, 54, i % 2 ? 20 : 47, i * 36));
  const heart = [];
  for (let i = 0; i < 48; i++) {
    const t = (i / 48) * 2 * Math.PI;
    heart.push([50 + 2.8 * 16 * Math.sin(t) ** 3, 46 - 2.8 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))]);
  }
  const round = [];
  for (let d = 0; d < 360; d += 10) round.push(polar(50, 50, 42, d));
  const bolt = [[60, 4], [24, 56], [46, 56], [36, 96], [78, 40], [55, 40], [70, 4]];
  const flower = [];
  for (let d = 0; d < 360; d += 5) flower.push(polar(50, 50, 33 + 13 * Math.cos(rad(6 * d)), d));
  const grow = (pts, k) => pts.map(([x, y]) => [50 + (x - 50) * k, 50 + (y - 50) * k]);
  const both = (pts, k) => [P(pts), P(grow(pts, k))];
  const shapes = { star: both(star, 1.2), heart: both(heart, 1.14), round: both(round, 1.13), bolt: both(bolt, 1.2), flower: both(flower, 1.14) };
  const host = Object.entries(shapes).map(([n, [f, b]]) => `--${n}: ${f}; --${n}b: ${b};`).join(' ');
  const names = Object.keys(shapes);
  add(
    'Sticker Sheet',
    'Die-cut stickers scattered and overlapping: stars, hearts, rounds, lightning bolts and flowers in bright colors, each on a white backing cut a little wider.',
    (c) => ({
      host,
      rule: `${F} { --n: @p(${names.map((_, i) => i).join(', ')}); ${xf(`translate(@r(-12, 12)%, @r(-12, 12)%) rotate(@r(-35, 35)deg) scale(${noise(0.8, 1.15, 2)})`)}
        ${B(`inset: 0; background: var(--color1); ${cp(`@match(${names.slice(0, -1).map((n, i) => `$(n) == ${i}, @var(--${n}b)`).join(', ')}, @var(--${names[names.length - 1]}b))`)}`)}
        ${A(`inset: 0; background: ${ink(c, 2)}; ${cp(`@match(${names.slice(0, -1).map((n, i) => `$(n) == ${i}, @var(--${n})`).join(', ')}, @var(--${names[names.length - 1]}))`)}`)}
      }${TR}`,
    }),
    {
      palette: ['#A8DADC', '#FFFFFF', '#E63946', '#1D3557', '#F4A261', '#7B2CBF', '#2A9D8F'],
      grid: '6x9',
      tg: '5x5',
      meta: { tags: ['stars', 'circles', 'petals'], mood: ['playful', 'bold'], density: 'medium', goodFor: ['packaging', 'card-texture', 'poster'] },
    }
  );
}

export const sectionL = { title: 'L. Papercraft', all };
