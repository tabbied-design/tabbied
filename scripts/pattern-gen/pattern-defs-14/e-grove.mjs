// E. Grove - the natural world up close, drawn flat and graphic like a
// botanical wallpaper or a mid-century textile print rather than from life.
//
//   leaves    Monstera
//
// The leaf is a silhouette: a polygon worked out below in plain JS, set once
// on the host and clipped in each cell, turned by 2D noise so neighboring
// leaves lean the same way.
//
// css-doodle traps met here: an @calc() whose expression opens with "(" comes
// out as 0, and @r() gives fractions, so an integer z-index is rolled with
// @ri().
import { section, F, TR, ink, cp, A, noise } from './shared.mjs';

const { add, all } = section('E. Grove');

const xf = (v) => `-webkit-transform: ${v}; transform: ${v};`;

// -- silhouettes -------------------------------------------------------------
// A leaf, a wing or a shell outline is a polygon worked out here, once, in
// percentages of a square box. It goes on the host as a custom property and a
// cell reads it with @var(), so the long point list is written out once
// rather than once per cell.
const pct = (v) => `${Math.round(v * 10) / 10}%`;
const polyOf = (pts) => `polygon(${pts.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(', ')})`;
const rad = (d) => (d * Math.PI) / 180;
const gauss = (x, mu, s) => Math.exp(-(((x - mu) / s) ** 2));

/** Monstera: a heart-shaped blade slashed in from the margin almost to the midrib, on a stalk. */
const monstera = () => {
  const cx = 50;
  const cy = 46;
  const rx = 42;
  const ry = 44;
  const R = (a) =>
    (1 + 0.1 * gauss(a, 0, 16) + 0.1 * gauss(a, 360, 16)) * (1 - 0.5 * gauss(a, 180, 14));
  const at = (a) => [cx + rx * R(a) * Math.sin(rad(a)), cy - ry * R(a) * Math.cos(rad(a))];
  const inner = (a) => {
    const [x, y] = at(a);
    return [50 + (x - 50) * 0.16, cy + (y - cy) * 0.6 - 3];
  };
  const cuts = [52, 90, 128, 232, 270, 308];
  const w = 4;
  const pts = [];
  for (let a = 0; a < 360; a += 2) {
    if (a === 180) {
      pts.push(at(176), [51.4, cy + ry * 0.52], [51.4, 99], [48.6, 99], [48.6, cy + ry * 0.52], at(184));
      continue;
    }
    if (a > 176 && a < 184) continue;
    const cut = cuts.find((c) => Math.abs(a - c) <= w);
    if (cut !== undefined) {
      if (a === cut) pts.push(at(cut - w), inner(cut), at(cut + w));
      continue;
    }
    pts.push(at(a));
  }
  return polyOf(pts);
};

// -- leaves ---------------------------------------------------------------

add(
  'Monstera',
  'Big split monstera leaves, slashed in from the margin almost to the pale midrib, overlapping at angles that sway together across the sheet.',
  (c) => ({
    host: `--monstera: ${monstera()};`,
    rule: `${F} { background: ${ink(c)}; ${cp('@var(--monstera)')} z-index: @ri(1, 9);
      ${xf(`rotate(@calc(${noise(-90, 90, 2)} + @r(-30, 30))deg) scale(1.3)`)}
      ${A('left: 49.2%; width: 1.6%; top: 6%; bottom: 0; background: var(--color1); opacity: 0.7;')} }${TR}`,
  }),
  {
    palette: ['#10241D', '#E9E4C9', '#2F7A4D', '#4E9F5E', '#1D5E44', '#86B86A'],
    grid: '4x6',
    tg: '4x4',
    min: 54,
    meta: { tags: ['leaves', 'curves'], mood: ['organic', 'bold'], density: 'dense', goodFor: ['wallpaper', 'poster', 'textile'] },
  }
);

export const sectionE = { title: 'E. Grove', all };
