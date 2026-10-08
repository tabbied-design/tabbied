// L. Papercraft - paper cut, torn and layered.
//
//   paper      Slit Lattice, Paper Scraps, Paper Sea
//
// Things learned on the way, for whoever extends this file (the file once
// held patchwork, stitches and bunting too, and some of these come from
// them):
//
//   * Outlines (frames with slits, torn scraps) are polygons worked out here
//     and set once on the host, read with @var().
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
//     The sea's layers draw a cell's worth more than their own, so a
//     neighbor covers the gap.
import { section, F, TR, ink, cp, B, A } from './shared.mjs';

const { add, all } = section('L. Papercraft');

// -- local helpers -------------------------------------------------------------

const xf = (v) => `-webkit-transform: ${v}; transform: ${v};`;
const n2 = (v) => (Math.abs(v) < 1e-9 ? 0 : Math.round(v * 100) / 100);
/** 'var(--color1), ..., var(--colorN)' for the inks from..to (default all). */
const list = (c, from = 1, to = c - 1) => {
  const a = [];
  for (let i = from; i <= to; i++) a.push(`var(--color${i})`);
  return a.join(', ');
};
/** One random pick for the whole sheet, re-rolled on reseed (see a-loom.mjs). */
const constant = (c, from, to) => `@pd(@p(${list(c, from, to)}))`;
/** A per-cell ink already chosen, read back as a pick. */
const paint = (name) => `@p(@var(--${name}))`;
/** Clip or mask by a value set once on the host. */
const clipBy = (name) => cp(`@var(--${name})`);
// -- paper, folded and cut ----------------------------------------------------

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
  // For speed: the two sines' phases are worked out once per cell (--a,
  // --b), each of the thirteen sample heights is then one short expression
  // written without spaces (css-doodle rescans every argument character by
  // character in every cell), and the outline is built once on the cell
  // (--e) for both layers to read.
  const n = 12;
  const k1 = 6.2832 / 4.6;
  const k2 = 6.2832 / 2.2;
  const f6 = (v) => Math.round(v * 1e6) / 1e6;
  const f4 = (v) => Math.round(v * 1e4) / 1e4;
  const edge = Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * i) / n - 1;
    return `${n2((100 * i) / n)}% $(round(2100+1300*sin(${f4(k1 * t)}+a)+500*sin(${f4(k2 * t)}+b))/100)%`;
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

export const sectionL = { title: 'L. Papercraft', all };
