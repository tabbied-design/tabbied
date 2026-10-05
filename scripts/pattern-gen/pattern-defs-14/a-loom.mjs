// A. Loom - woven and printed cloth: checks, plaids, twills, stripes and the
// figures printed onto fabric.
import { section, F, TR, B, A, msk, mskI, cp, rot, poly, noise } from './shared.mjs';

const { add, all } = section('A. Loom');

// -- picking inks that hold together across the sheet -----------------------
// css-doodle composes the cells in reading order with one shared context, and
// @pd() shuffles its arguments once per call site and then deals them out by
// a counter that counts cells. So a list exactly @X long hands every cell of
// a column the same ink, a list @X - 1 long does the same along each
// anti-diagonal, and a list one item long is a constant for the whole sheet.
// All three are random per seed, so a reseed re-dyes the cloth. They are
// declared before the gate, so every cell advances the counter and thinning
// the field never shifts a column's ink.
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
const byColumn = (c, from, to) => `@pd(@m(@X, @p(${list(c, from, to)})))`;
const byDiagonal = (c, from, to) => `@pd(@m(@calc(@X - 1), @p(${list(c, from, to)})))`;
const constant = (c, from, to) => `@pd(@p(${list(c, from, to)}))`;

/** Cycle through the named cell-level properties by `expr` (x, y, x + y...). */
const cycle = (expr, names) =>
  `@match(${names
    .slice(0, -1)
    .map((n, i) => `(${expr}) % ${names.length} == ${i}, @var(${n})`)
    .join(', ')}, @var(${names[names.length - 1]}))`;

/** A per-cell ink already chosen: still written as a pick, read once. */
const paint = (name) => `background-color: @p(@var(${name}));`;

/** The gate as a switch, so position blocks may sit outside it. */
const GATE = `visibility: hidden; ${F} { visibility: visible; }`;

const xf = (v) => `-webkit-transform: ${v}; transform: ${v};`;

// A value the same in every cell is written once on the host and read back
// with @var(), so it is not copied into every cell's rule.
const clipBy = (name) => `-webkit-clip-path: @var(${name}); clip-path: @var(${name});`;
const maskBy = (name) => `-webkit-mask: @var(${name}); mask: @var(${name});`;
const maskAllOf = (name) =>
  `${maskBy(name)} -webkit-mask-composite: source-in; mask-composite: intersect;`;

/** Hard-stop bands across `angle`: [[from, to], ...] in percent. */
const bands = (angle, spans) => {
  const stops = ['transparent 0'];
  for (const [a, b] of spans) stops.push(`transparent ${a}%`, `#000 ${a}% ${b}%`, `transparent ${b}%`);
  return `linear-gradient(${angle}, ${stops.join(', ')})`;
};

/** A polygon with a hole: the outer ring clockwise, the inner one back. */
const ring = (outer, inner) =>
  poly([...outer, outer[0], ...[...inner].reverse(), [...inner].reverse()[0]]);

/** A diamond drawn in `k` pixel steps a side, half-height `r`, centered. */
const stepDiamond = (r, k, cx = 50, cy = 50) => {
  const h = r / k;
  const right = [];
  for (let i = 0; i < k; i++) {
    const w = (i + 0.5) * h;
    right.push([cx + w, cy - r + i * h], [cx + w, cy - r + (i + 1) * h]);
  }
  for (let i = k - 1; i >= 0; i--) {
    const w = (i + 0.5) * h;
    right.push([cx + w, cy + r - (i + 1) * h], [cx + w, cy + r - i * h]);
  }
  const left = right.map(([x, y]) => [2 * cx - x, y]).reverse();
  return [...right, ...left];
};

/** A small disc of radius `r` (percent of the cell) at x, y; `soft` feathers it. */
const dot = (x, y, r, soft = 0.96) =>
  `radial-gradient(${r}% ${r}% at ${x}% ${y}%, #000 ${Math.round(soft * 100)}%, transparent 100%)`;
const hole = (x, y, r, soft = 0.96) =>
  `radial-gradient(${r}% ${r}% at ${x}% ${y}%, transparent ${Math.round(soft * 100)}%, #000 100%)`;

// -- checks ------------------------------------------------------------------

add(
  'Tartan',
  'A tartan sett: warp bands of three widths crossed by a translucent weft in the same order, mixing where they meet, under a fine light overcheck.',
  (c) => {
    const over = (angle) => `linear-gradient(${angle}, transparent 0 84%, @var(--ko) 84% 88%, transparent 88%)`;
    return {
      rule: `--ka: ${constant(c, 1, 2)}; --kb: ${constant(c, 3, 4)}; --kc: ${constant(c, 5, 6)}; --ko: ${constant(c, 5, 6)};
        --wx: ${cycle('x', ['--ka', '--kb', '--kc', '--kb'])};
        --wy: ${cycle('y', ['--ka', '--kb', '--kc', '--kb'])};
        --sx: @match(x % 4 == 0, 64%, x % 4 == 2, 24%, 42%);
        --sy: @match(y % 4 == 0, 64%, y % 4 == 2, 24%, 42%);
        ${F} {
          ${B(`left: 0; top: 0; bottom: 0; width: @var(--sx); ${paint('--wx')}`)}
          ${A(`inset: 0; background-color: @var(--wy); background-image: ${over('90deg')}, ${over('180deg')}; opacity: .6; ${msk(
            'linear-gradient(180deg, #000 0 @var(--sy), transparent @var(--sy))',
            bands('90deg', [[84, 88]]),
            bands('180deg', [[84, 88]])
          )}`)}
        }${TR}`,
    };
  },
  {
    palette: ['#141B26', '#B3262C', '#2B4C8C', '#1E5B43', '#7A2E2A', '#E2B33C', '#EFE6D2'],
    grid: '6x9',
    tg: '8x8',
    meta: { tags: ['stripes', 'grid', 'squares', 'lines'], mood: ['bold', 'retro'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

add(
  'Vichy',
  'A two-color gingham: translucent warp and weft checks crossing to a third, deeper shade on a pale ground.',
  (c) => ({
    rule: `--g: ${constant(c)}; --h: ${constant(c)}; ${F} {
        ${B(`inset: 0; ${paint('--g')} opacity: .5; ${msk('repeating-linear-gradient(90deg, #000 0 25%, transparent 25% 50%)')}`)}
        ${A(`inset: 0; ${paint('--h')} opacity: .5; ${msk('repeating-linear-gradient(180deg, #000 0 25%, transparent 25% 50%)')}`)}
      }${TR}`,
  }),
  {
    pal: 4,
    inks: 3,
    grid: '6x9',
    tg: '5x5',
    meta: { tags: ['checkerboard', 'squares', 'grid'], mood: ['calm', 'playful'], density: 'medium', goodFor: ['textile', 'packaging', 'card-texture'] },
  }
);

add(
  'Glen Check',
  'A glen check: blocks of tiny pin squares alternating with blocks of fine stripes running across and down, crossed by a thin colored overcheck.',
  (c) => {
    const quad = 'conic-gradient(from 90deg, #000 0 90deg, transparent 90deg 180deg, #000 180deg 270deg, transparent 270deg)';
    const stripes = (angle) => `repeating-linear-gradient(${angle}, @var(--m) 0 8.333%, transparent 8.333% 16.667%)`;
    return {
      rule: `--m: ${constant(c, 1, 3)}; --o: ${constant(c, 4, 5)}; ${F} {
          background: ${stripes('90deg')} 100% 0 / 50% 50% no-repeat, ${stripes('180deg')} 0 100% / 50% 50% no-repeat;
          ${B(`inset: 0; background-color: @p(@var(--m), var(--color1)); ${maskAllOf('--pins')}`)}
          ${A(`inset: 0; background-color: @var(--o); opacity: .85; ${maskBy('--over')}`)}
        }${TR}`,
      host: `--pins: repeating-linear-gradient(90deg, #000 0 10.417%, transparent 10.417% 16.667%), repeating-linear-gradient(180deg, #000 0 10.417%, transparent 10.417% 16.667%), ${quad};
        --over: ${bands('90deg', [[0, 1.2], [98.8, 100]])}, ${bands('180deg', [[0, 1.2], [98.8, 100]])};`,
    };
  },
  {
    palette: ['#F1EEE8', '#73767D', '#7D6A5C', '#64718A', '#B5492F', '#2E7D9A'],
    grid: '4x6',
    tg: '4x4',
    meta: { tags: ['squares', 'stripes', 'grid', 'lines'], mood: ['elegant', 'retro'], density: 'dense', goodFor: ['textile', 'card-texture'] },
  }
);

add(
  'Patch Madras',
  'Squares of bleeding madras plaid sewn edge to edge, each patch dyed its own colors, the stripes soft as if the dye had run.',
  (c) => ({
    rule: `${F} {
        background-color: @p(${list(c)});
        ${cp('inset(1.5%)')}
        ${B(`inset: 0; background-color: @p(${list(c)}); opacity: .7; ${msk('linear-gradient(90deg, transparent 6%, #000 12% 30%, transparent 36% 52%, #000 56% 62%, transparent 66% 76%, #000 80% 86%, transparent 90%)')}`)}
        ${A(`inset: 0; background-color: @p(${list(c)}); opacity: .55; ${msk('linear-gradient(180deg, transparent 4%, #000 10% 22%, transparent 28% 44%, #000 50% 70%, transparent 76% 84%, #000 88% 92%, transparent 96%)')}`)}
      }${TR}`,
  }),
  {
    palette: ['#2A2335', '#F2C14E', '#E4572E', '#29A3A3', '#7DBE5A', '#D9487A', '#3D5AA8'],
    grid: '4x6',
    tg: '4x4',
    meta: { tags: ['squares', 'stripes', 'mosaic', 'gradients'], mood: ['playful', 'festive'], density: 'dense', goodFor: ['textile', 'packaging', 'poster'] },
  }
);

// -- stripes -----------------------------------------------------------------

add(
  'Ticking',
  'Mattress ticking: every column a broad stripe of its own color and width between two pinlines, with a hairline of another color dividing the columns.',
  (c) => ({
    rule: `--t: ${byColumn(c, 1, c - 2)}; --w: @pd(@m(@X, @p(12%, 22%, 32%))); ${F} {
        background: linear-gradient(90deg, var(--color${c - 1}) 0 1%, transparent 1% 99%, var(--color${c - 1}) 99%);
        ${B(`top: 0; bottom: 0; left: 50%; width: @var(--w); ${paint('--t')} ${xf('translateX(-50%)')}`)}
        ${A(`inset: 0; background-color: @var(--t); ${msk(bands('90deg', [[19, 23], [77, 81]]))}`)}
      }${TR}`,
  }),
  {
    palette: ['#F4EEE1', '#1F3A5F', '#B8322A', '#3C6E71', '#8C5E58', '#C9A227'],
    grid: '8x12',
    tg: '6x6',
    meta: { tags: ['stripes', 'lines'], mood: ['calm', 'retro'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

add(
  'Plisse',
  'Seersucker: puckered stripes, each column bubbled with soft crinkles, between flat stripes of plain ground.',
  (c) => ({
    rule: `--t: ${byColumn(c)}; ${F} {
        ${B(`top: 0; bottom: 0; left: 0; width: 50%; ${paint('--t')} ${msk('radial-gradient(ellipse 50% 50% at 50% 50%, #000 45%, #0000004d 100%) 0 0 / 100% 25%')}`)}
        ${A(`top: 0; bottom: 0; left: 73%; width: 4%; background-color: @var(--t); opacity: .55;`)}
      }${TR}`,
  }),
  {
    pal: 28,
    inks: 4,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['stripes', 'ovals', 'gradients'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['textile', 'card-texture'] },
  }
);

add(
  'Serape',
  'A Saltillo serape: bright horizontal bands, each row a broad stripe and a zigzag ribbon, the colors stepping down the cloth.',
  (c) => ({
    rule: `--k0: ${constant(c)}; --k1: ${constant(c)}; --k2: ${constant(c)}; --k3: ${constant(c)}; --k4: ${constant(c)};
      --a: ${cycle('y', ['--k0', '--k1', '--k2', '--k3', '--k4'])};
      --b: ${cycle('y + 2', ['--k0', '--k1', '--k2', '--k3', '--k4'])};
      --h: @match(y % 3 == 0, 44%, y % 3 == 1, 28%, 36%);
      ${F} {
        ${B(`left: 0; right: 0; top: 0; height: @var(--h); ${paint('--a')}`)}
        ${A(`left: 0; right: 0; top: 56%; height: 32%; background-color: @var(--b); ${cp(poly([[0, 0], [25, 60], [50, 0], [75, 60], [100, 0], [100, 40], [75, 100], [50, 40], [25, 100], [0, 40]]))}`)}
      }${TR}`,
  }),
  {
    pal: 13,
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['stripes', 'zigzags', 'lines'], mood: ['festive', 'bold'], density: 'medium', goodFor: ['textile', 'poster', 'section-divider'] },
  }
);

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

add(
  'Chalk Stripe',
  'Suiting flannel: soft, broad chalk lines in pale colors on a dark ground, each pair parted by a fine pinstripe.',
  (c) => ({
    rule: `--t: ${byColumn(c, 1, c - 2)}; ${F} {
        ${B(`inset: 0; ${paint('--t')} opacity: .9; ${msk('linear-gradient(90deg, transparent 36%, #000 45% 55%, transparent 64%)')}`)}
        ${A(`top: 0; bottom: 0; left: -2%; width: 4%; background-color: var(--color${c - 1}); opacity: .35;`)}
      }${TR}`,
  }),
  {
    palette: ['#2A2E35', '#EDE6D6', '#C6D4E1', '#E7C3BE', '#8FA3B8'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['stripes', 'lines', 'gradients'], mood: ['elegant', 'calm'], density: 'sparse', goodFor: ['textile', 'hero-background', 'card-texture'] },
  }
);

// -- twills and weaves -------------------------------------------------------

add(
  'Donegal',
  'Herringbone tweed: twill lines slanting one way down one column and back the other way down the next, flecked with bright knops of color.',
  (c) => ({
    rule: `--m: ${constant(c, 1, 2)}; --r: @match(x % 2 == 0, 45deg, -45deg); ${F} {
        ${B(`left: -20.71%; top: -20.71%; width: 141.42%; height: 141.42%; ${paint('--m')} ${cp('polygon(50% 0, 100% 50%, 50% 100%, 0 50%)')} ${msk('repeating-linear-gradient(90deg, #000 0 6.25%, transparent 6.25% 12.5%)')} ${rot('@var(--r)')}`)}
        ${A(`inset: 0; background-color: @p(${list(c, 3)}); ${msk(dot('@r(8, 92)', '@r(8, 92)', 4), dot('@r(8, 92)', '@r(8, 92)', 3))}`)}
      }${TR}`,
  }),
  {
    palette: ['#D9D1C1', '#4A3F35', '#5E5A55', '#E07A2E', '#2E86AB', '#C23B5A', '#3F7D4E'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['chevrons', 'diagonals', 'lines', 'dots'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['textile', 'card-texture', 'wallpaper'] },
  }
);

add(
  'Waffle',
  'Waffle weave: deep square pockets set in a grid of ridges, each shaded on its upper walls and lit on its lower ones.',
  (c) => ({
    rule: `${F} {
        background-color: @p(var(--color2), var(--color4));
        ${cp('inset(4%)')}
        ${B(`inset: 0; background-color: var(--color3); ${cp(poly([[0, 0], [100, 0], [74, 26], [26, 26], [26, 74], [0, 100]]))}`)}
        ${A(`inset: 0; background-color: var(--color1); ${cp(poly([[100, 0], [100, 100], [0, 100], [26, 74], [74, 74], [74, 26]]))}`)}
      }${TR}`,
  }),
  {
    palette: ['#F3EDE2', '#E9D6B9', '#B89272', '#7F5539', '#A8806A'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['squares', 'grid', 'blocks'], mood: ['calm', 'organic'], density: 'dense', goodFor: ['textile', 'card-texture', 'packaging'] },
  }
);

add(
  'Lampas',
  'A damask diaper: tall ornamental medallions over a crossed flourish, alternating with small flourishes alone, woven tone on tone.',
  (c) => ({
    rule: `${GATE}
      @even {
        ${B(`left: 4%; top: 4%; width: 92%; height: 92%; background-color: @p(${list(c, 1, 2)}); clip-path: @var(--flourish); -webkit-clip-path: @var(--flourish);`)}
        ${A(`left: 12%; top: 1%; width: 76%; height: 98%; background-color: @p(${list(c, 3, c - 1)}); clip-path: @var(--vase); -webkit-clip-path: @var(--vase);`)}
      }
      @odd {
        ${B(`left: 26%; top: 26%; width: 48%; height: 48%; background-color: @p(${list(c, 3, c - 1)}); clip-path: @var(--flourish); -webkit-clip-path: @var(--flourish);`)}
        ${A(`left: 43%; top: 43%; width: 14%; height: 14%; border-radius: 50%; background-color: @p(${list(c, 1, 2)});`)}
      }${TR}`,
    host: '--vase: @shape(split: 240; x: sin(t) * (.55 + .45 * cos(4t)) * (1 - .25 * cos(t)) * .95; y: -cos(t) * .95); --flourish: @shape(split: 240; r: .55 + .3 * cos(4t) + .15 * cos(8t); rotate: 45);',
  }),
  {
    palette: ['#4A1C27', '#6E2A3A', '#7E3446', '#C08B5C', '#B5707A'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['petals', 'curves', 'checkerboard'], mood: ['elegant', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile', 'packaging'] },
  }
);

add(
  'Patola',
  'Ikat lozenges: open diamonds whose rows of thread are dyed slightly out of register, so every edge is feathered and drifts across the cloth.',
  (c) => {
    const lozenge = ring([[50, 0], [100, 50], [50, 100], [0, 50]], [[50, 28], [72, 50], [50, 72], [28, 50]]);
    return {
      rule: `--k: @p(${list(c)}); ${F} {
          ${B(`inset: 0; ${paint('--k')} ${clipBy('--lozenge')} ${maskBy('--odd')} ${xf(`translateX(${noise(-9, 9, 1.4)}%)`)}`)}
          ${A(`inset: 0; background-color: @var(--k); ${clipBy('--lozenge')} ${maskBy('--even')} ${xf(`translateX(${noise(-9, 9, 1.4)}%)`)}`)}
        }${TR}`,
      host: `--lozenge: ${lozenge};
        --odd: repeating-linear-gradient(180deg, #000 0 6.25%, transparent 6.25% 12.5%);
        --even: repeating-linear-gradient(180deg, transparent 0 6.25%, #000 6.25% 12.5%);`,
    };
  },
  {
    palette: ['#2B193D', '#F49D37', '#F7E1D7', '#C5283D', '#E9724C', '#6FB3B8'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['diamonds', 'stripes', 'lattice'], mood: ['festive', 'organic'], density: 'medium', goodFor: ['textile', 'poster', 'packaging'] },
  }
);

add(
  'Itajime',
  'Clamp-resist shibori: indigo cloth folded into squares, each one left with a soft pale window in the middle and blurred pale seams where the folds were pressed.',
  (c) => {
    const side = (angle) => `linear-gradient(${angle}, transparent 6%, #000 14% 86%, transparent 94%)`;
    const pair = (angle) => `linear-gradient(${angle}, transparent 6%, #000 14% 27%, transparent 36% 64%, #000 73% 86%, transparent 94%)`;
    return {
      rule: `--k: @p(${list(c)}); ${F} {
          ${B(`inset: 0; ${paint('--k')} ${mskI(pair('90deg'), side('180deg'))}`)}
          ${A(`inset: 0; background-color: @var(--k); ${mskI(side('90deg'), pair('180deg'))}`)}
        }${TR}`,
    };
  },
  {
    palette: ['#EEF0F0', '#1C2E57', '#24407A', '#16244A', '#2F5590'],
    grid: '4x6',
    tg: '4x4',
    meta: { tags: ['squares', 'grid', 'gradients'], mood: ['calm', 'organic'], density: 'dense', goodFor: ['textile', 'wallpaper', 'card-texture'] },
  }
);

add(
  'Tie Dye',
  'A bullseye tie-dye: soft rings of three dyes spreading out from one point of the cloth, with a pale line left between each pair.',
  (c) => {
    const rings = (stops) => `repeating-radial-gradient(ellipse 160% 160% at @var(--at), ${stops})`;
    return {
      // Every cell draws the same rings about one point of the sheet, so
      // they run on unbroken across the cell edges. The point is a constant
      // for the sheet (one dice roll per axis), so a reseed moves it.
      rule: `--a: ${constant(c, 1, 2)}; --b: ${constant(c, 3, 4)};
        --at: @calc(50 - @dx * 100 + @pd(@p(-140, -60, 0, 60, 140)))% @calc(50 - @dy * 100 + @pd(@p(-140, -60, 0, 60, 140)))%;
        ${F} {
          background: ${rings(`transparent 0 40%, var(--color${c - 1}) 46% 54%, transparent 60%`)};
          ${B(`inset: 0; ${paint('--a')} ${msk(rings('transparent 0, #000 6% 14%, transparent 20% 60%'))}`)}
          ${A(`inset: 0; background-color: @var(--b); ${msk(rings('transparent 0 20%, #000 26% 34%, transparent 40% 60%'))}`)}
        }${TR}`,
    };
  },
  {
    palette: ['#FBF7EF', '#E4407B', '#F06A3F', '#2E86C8', '#7A4FB5', '#F2B33D'],
    grid: '8x12',
    tg: '8x8',
    meta: { tags: ['concentric', 'rings', 'gradients', 'radial'], mood: ['playful', 'festive'], density: 'dense', goodFor: ['poster', 'og-image', 'textile'] },
  }
);

add(
  'Bandhani',
  'Bandhani tie-dots: a dyed cloth pricked with rosettes of small pale resist dots, each with the dark knot of its tie at the center.',
  (c) => {
    const ring8 = [];
    for (let k = 0; k < 8; k++) {
      ring8.push([50 + 31 * Math.cos((k * Math.PI) / 4), 50 + 31 * Math.sin((k * Math.PI) / 4)].map((v) => +v.toFixed(1)));
    }
    const ring4 = [[50, 22], [78, 50], [50, 78], [22, 50]];
    const all8 = [[50, 50], ...ring8];
    const all4 = [[50, 50], ...ring4];
    const rosette = (n) => `${B(`inset: 0; ${paint('--k')} ${maskAllOf(`--holes${n}`)}`)}
        ${A(`inset: 0; background-color: @p(${list(c, 3)}); ${maskBy(`--knots${n}`)}`)}`;
    return {
      rule: `--k: ${constant(c, 1, 2)}; ${GATE}
        @even { ${rosette(8)} }
        @odd { ${rosette(4)} }${TR}`,
      host: `--holes8: ${all8.map(([x, y]) => hole(x, y, 7, 0.7)).join(', ')};
        --knots8: ${all8.map(([x, y]) => dot(x, y, 2, 0.5)).join(', ')};
        --holes4: ${all4.map(([x, y]) => hole(x, y, 7, 0.7)).join(', ')};
        --knots4: ${all4.map(([x, y]) => dot(x, y, 2, 0.5)).join(', ')};`,
    };
  },
  {
    palette: ['#F6E7C8', '#B3202A', '#7A1631', '#1F2A55', '#3E2A1E', '#E0A526'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['dots', 'circles', 'radial'], mood: ['festive', 'organic'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

add(
  'Bogolan',
  'Mudcloth: hand-painted rows of marks, a row of dots, a row of crosses, a zigzag and a ladder, in pale earth on a dark ground.',
  (c) => {
    const X = poly([[0, 0], [16, 0], [50, 34], [84, 0], [100, 0], [100, 16], [66, 50], [100, 84], [100, 100], [84, 100], [50, 66], [16, 100], [0, 100], [0, 84], [34, 50], [0, 16]]);
    const zig = poly([[0, 0], [25, 70], [50, 0], [75, 70], [100, 0], [100, 30], [75, 100], [50, 30], [25, 100], [0, 30]]);
    return {
      rule: `--k: @p(${list(c)}); ${GATE}
        @match(y % 4 == 1) { ${B(`left: 0; right: 0; top: 38%; height: 24%; ${paint('--k')} ${msk('radial-gradient(closest-side, #000 72%, transparent 78%) 0 0 / 33.333% 100%')}`)} }
        @match(y % 4 == 2) { ${B(`left: 22%; top: 22%; width: 56%; height: 56%; ${paint('--k')} ${cp(X)}`)} }
        @match(y % 4 == 3) { ${B(`left: 0; right: 0; top: 30%; height: 40%; ${paint('--k')} ${cp(zig)}`)} }
        @match(y % 4 == 0) {
          ${B(`left: 0; right: 0; top: 28%; height: 44%; ${paint('--k')} ${msk(bands('180deg', [[0, 14], [86, 100]]))}`)}
          ${A(`left: 0; right: 0; top: 34%; height: 32%; background-color: @var(--k); ${msk('repeating-linear-gradient(90deg, transparent 0 9.5%, #000 9.5% 15.5%, transparent 15.5% 25%)')}`)}
        }${TR}`,
    };
  },
  {
    palette: ['#2B1E16', '#EDE0C4', '#E4CFA3', '#C99A4B'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['dots', 'crosses', 'zigzags', 'lines'], mood: ['organic', 'bold'], density: 'medium', goodFor: ['textile', 'poster', 'section-divider'] },
  }
);

add(
  'Batik',
  'Wax-resist batik: dark six-petal flowers on a pale ground crazed all over with fine dark cracks, where the dye ran into the split wax.',
  (c) => ({
    rule: `${F} {
        ${B(`left: -50%; top: 49.5%; width: 200%; height: 1%; background-color: @p(${list(c, 1, 2)}); opacity: .6; ${xf('translate(@r(-30, 30)%, @r(-40, 40)%) rotate(@r(0, 180)deg)')}`)}
        ${A(`left: 9%; top: 9%; width: 82%; height: 82%; z-index: 1; background-color: @p(${list(c)}); clip-path: @var(--flower); -webkit-clip-path: @var(--flower); ${msk(hole(50, 50, 13, 0.98))}`)}
      }${TR}`,
    host: '--flower: @shape(split: 180; r: .66 + .34 * abs(cos(3t)); scale: .96);',
  }),
  {
    palette: ['#EFE6D2', '#2B3A55', '#5A3A28', '#3D5A80', '#7A4A2A', '#8C3B2E'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['petals', 'lines', 'circles'], mood: ['organic', 'elegant'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

// -- printed -----------------------------------------------------------------

add(
  'Boteh',
  'Paisley: curling teardrop botehs, a small one nested inside each large one, turning head to tail from square to square.',
  (c) => ({
    rule: `--a: @p(${list(c, 1, 3)}); --r: @calc((@x + @y) % 2 * 180 + @r(-12, 12))deg; ${F} {
        ${xf('rotate(@var(--r))')}
        ${B(`inset: 0; ${paint('--a')} clip-path: @var(--boteh); -webkit-clip-path: @var(--boteh);`)}
        ${A(`left: 30%; top: 34%; width: 44%; height: 44%; background-color: @p(${list(c, 4)}); clip-path: @var(--boteh); -webkit-clip-path: @var(--boteh);`)}
      }${TR}`,
    host: '--boteh: @shape(split: 160; x: sin(t); y: (1 + sin(t)) * cos(t) / 1.3 - 1.3 * ((1 - sin(t)) / 2)^3; rotate: 90; scale: .72);',
  }),
  {
    palette: ['#1F2440', '#E07A5F', '#D1495B', '#81B29A', '#F2CC8F', '#F4F1DE'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['leaves', 'curves', 'grid'], mood: ['elegant', 'retro'], density: 'medium', goodFor: ['textile', 'wallpaper', 'packaging'] },
  }
);

add(
  'Foulard',
  'A foulard tie print: small open diamonds, each holding a dot of another color, with a pin dot set between every four.',
  (c) => {
    const lozenge = ring([[50, 22], [78, 50], [50, 78], [22, 50]], [[50, 38], [62, 50], [50, 62], [38, 50]]);
    const corner = (at) => `radial-gradient(circle at ${at}, var(--color${c - 1}) 7%, transparent 7.5%)`;
    return {
      rule: `${F} {
          background: ${corner('0 0')}, ${corner('100% 0')}, ${corner('0 100%')}, ${corner('100% 100%')};
          ${B(`inset: 0; background-color: @p(${list(c, 1, 3)}); ${cp(lozenge)}`)}
          ${A(`left: 45%; top: 45%; width: 10%; height: 10%; border-radius: 50%; background-color: @p(${list(c, 3, c - 2)});`)}
        }${TR}`,
    };
  },
  {
    palette: ['#1D2B45', '#E9C46A', '#E76F51', '#8AB17D', '#C9D6E8', '#F1E3C8'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['diamonds', 'dots', 'grid'], mood: ['elegant', 'calm'], density: 'sparse', goodFor: ['textile', 'wallpaper', 'card-texture'] },
  }
);

add(
  'Calico',
  'A ditsy calico print: tiny five-petal flowers scattered at every angle, each with a bright eye, on a dark cotton ground.',
  (c) => ({
    rule: `--tx: @r(-18, 18)%; --ty: @r(-18, 18)%; --s: @r(.62, 1); --r: @r(0, 72)deg; ${F} {
        ${B(`left: 22%; top: 22%; width: 56%; height: 56%; background-color: @p(${list(c, 1, c - 2)}); clip-path: @var(--flower); -webkit-clip-path: @var(--flower); ${xf('translate(@var(--tx), @var(--ty)) rotate(@var(--r)) scale(@var(--s))')}`)}
        ${A(`left: 44%; top: 44%; width: 12%; height: 12%; border-radius: 50%; background-color: var(--color${c - 1}); ${xf('translate(@var(--tx), @var(--ty)) scale(@var(--s))')}`)}
      }${TR}`,
    host: '--flower: @shape(split: 150; r: .38 + .62 * abs(cos(2.5t)); scale: .98);',
  }),
  {
    palette: ['#3A2B3F', '#F4EBD9', '#F2A7B5', '#9FD3C7', '#E8706F', '#F6C85F'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['petals', 'dots'], mood: ['playful', 'organic'], density: 'sparse', goodFor: ['textile', 'wallpaper', 'packaging', 'hero-background'] },
  }
);

// -- knitted -----------------------------------------------------------------

add(
  'Fair Isle',
  'Fair Isle knitting: rows of V stitches charted into a band of stepped diamonds between plain stripes, three colors to the piece.',
  (c) => {
    // A knitting chart, one stitch to a cell: every sixth row a stripe, and
    // between, diamonds six stitches apart. The chart is slid along by a
    // dice roll read back with @lp() (the last pick, the @pd just before), so
    // every branch of the test agrees on it.
    const u = '(x + @lp())';
    return {
      rule: `--k0: ${constant(c, 1, 2)}; --k1: ${constant(c, 3, 4)}; --k2: ${constant(c, 5, 6)}; --n: @pd(@p(0, 1, 2, 3, 4, 5));
        --k: @match(y % 8 == 0, @var(--k2), abs(${u} % 6 - 3) + abs(y % 8 - 4) <= 2, @var(--k1), @var(--k0));
        ${F} {
          ${B(`left: 13%; top: -10%; width: 36%; height: 120%; ${paint('--k')} clip-path: @var(--leg); -webkit-clip-path: @var(--leg); ${rot('-20deg')}`)}
          ${A(`left: 51%; top: -10%; width: 36%; height: 120%; background-color: @var(--k); clip-path: @var(--leg); -webkit-clip-path: @var(--leg); ${rot('20deg')}`)}
        }${TR}`,
      host: '--leg: @shape(split: 120; x: sin(t) * abs(sin(t))^.6; y: cos(t) * .98);',
    };
  },
  {
    palette: ['#26242B', '#EDE6D6', '#D8CDB4', '#C8413B', '#3D7EA6', '#E2A23B', '#5E9E7A'],
    grid: '10x15',
    tg: '10x10',
    meta: { tags: ['chevrons', 'diamonds', 'stripes', 'ovals'], mood: ['playful', 'retro'], density: 'dense', goodFor: ['textile', 'packaging', 'card-texture'] },
  }
);

add(
  'Aran',
  'An Aran knit: twisted rope cables running up the piece between panels of seed stitch, all in cream wool.',
  (c) => {
    const seed = (at) => `radial-gradient(17% 17% at ${at}, #000 55%, transparent 100%) 0 0 / 50% 50%`;
    return {
      rule: `--k: @p(${list(c)}); ${GATE}
        @match(x % 3 == 2) {
          z-index: @calc(100 - @y);
          ${B(`left: 20%; top: -24%; width: 60%; height: 148%; border-radius: 50%; ${paint('--k')} ${rot('40deg')} ${msk('linear-gradient(90deg, #00000073, #000 30% 62%, #00000099)')}`)}
          ${A(`inset: 0; background-color: @var(--k); opacity: .55; ${msk(bands('90deg', [[2, 8], [92, 98]]))}`)}
        }
        @match(x % 3 != 2) {
          ${B(`inset: 0; ${paint('--k')} opacity: .8; ${msk(seed('25% 25%'), seed('75% 75%'))}`)}
        }${TR}`,
    };
  },
  {
    palette: ['#3A4248', '#EDE6D6', '#E3D7BF', '#D6C8AA'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['braids', 'dots', 'ovals', 'stripes'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['textile', 'card-texture', 'packaging'] },
  }
);

// -- figured -----------------------------------------------------------------

add(
  'Argyll',
  'Argyle: a field of solid diamonds in mixed colors, crossed corner to corner by a fine overcheck that runs through every one.',
  (c) => {
    const d = 2;
    const X = poly([
      [0, 0], [d, 0], [50, 50 - d], [100 - d, 0], [100, 0], [100, d], [50 + d, 50], [100, 100 - d],
      [100, 100], [100 - d, 100], [50, 50 + d], [d, 100], [0, 100], [0, 100 - d], [50 - d, 50], [0, d],
    ]);
    return {
      rule: `--f: ${constant(c, 1, 2)}; ${F} {
          background-color: @var(--f);
          ${B(`inset: 0; background-color: @p(${list(c, 3, c - 2)}); ${cp('polygon(50% 0, 100% 50%, 50% 100%, 0 50%)')}`)}
          ${A(`inset: 0; background-color: var(--color${c - 1}); ${cp(X)}`)}
        }${TR}`,
    };
  },
  {
    palette: ['#2E2A2A', '#1F3A5F', '#2F5D50', '#C8553D', '#E9B44C', '#8E7CC3', '#F1E9DA'],
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['diamonds', 'diagonals', 'lattice'], mood: ['retro', 'elegant'], density: 'dense', goodFor: ['textile', 'packaging', 'wallpaper'] },
  }
);

add(
  'Dhurrie',
  'A dhurrie rug: stepped lozenges built from little square blocks, nested one inside another, in bands of color down the rug.',
  (c) => ({
    rule: `--r0: ${constant(c, 1, 2)}; --r1: ${constant(c, 3, 4)}; --a: ${cycle('y', ['--r0', '--r1'])}; ${F} {
        ${B(`inset: 0; ${paint('--a')} ${clipBy('--lozenge')}`)}
        ${A(`inset: 0; background-color: @p(${list(c)}); ${clipBy('--heart')}`)}
      }${TR}`,
    host: `--lozenge: ${ring(stepDiamond(48, 6), stepDiamond(32, 4))}; --heart: ${poly(stepDiamond(16, 2))};`,
  }),
  {
    palette: ['#2A1F1A', '#B5332E', '#C8642F', '#E8D5B0', '#D9A441', '#2F5D7C'],
    grid: '4x6',
    tg: '5x5',
    meta: { tags: ['diamonds', 'steps', 'concentric'], mood: ['bold', 'retro'], density: 'medium', goodFor: ['textile', 'poster', 'packaging'] },
  }
);

export const sectionA = { title: 'A. Loom', all };
