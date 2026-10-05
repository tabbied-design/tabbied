// A. Loom - cloth: checks, twills, plaids and the marks woven, printed and stitched into it.
import { section, F, TR, B, A, ink, msk, mskI, cp, rot } from './shared.mjs';

const { add, all } = section('A. Loom');

const inks = (c) => {
  const a = [];
  for (let i = 1; i < c; i++) a.push(`var(--color${i})`);
  return a.join(', ');
};

add(
  'Testcol',
  'Test of column coherent picks.',
  (c) => ({
    rule: `${F} { background-color: @pd(@m(@X, @p(${inks(c)}))); ${msk('linear-gradient(90deg, transparent 0 20%, #000 20% 60%, transparent 60%)')} }${TR}`,
  }),
  { pal: 1, grid: '6x9', tg: '6x6', meta: { tags: ['stripes', 'lines'], mood: ['calm'], density: 'medium', goodFor: ['textile'] } }
);

add(
  'Testrow',
  'Test of row coherent picks.',
  (c) => ({
    rule: `--k0: @pd(@p(${inks(c)})); --k1: @pd(@p(${inks(c)})); --k2: @pd(@p(${inks(c)})); ${F} { background-color: @match(y % 3 == 0, @var(--k0), y % 3 == 1, @var(--k1), @var(--k2)); border-color: @p(${inks(c)}); ${msk('linear-gradient(0deg, transparent 0 20%, #000 20% 60%, transparent 60%)')} }${TR}`,
  }),
  { pal: 1, grid: '6x9', tg: '6x6', meta: { tags: ['stripes', 'lines'], mood: ['calm'], density: 'medium', goodFor: ['textile'] } }
);

add(
  'Testdiag',
  'Test of diagonal coherent picks.',
  (c) => ({
    rule: `${F} { background-color: @pd(@m(@calc(@X - 1), @p(${inks(c)}))); }${TR}`,
  }),
  { pal: 1, grid: '6x9', tg: '6x6', meta: { tags: ['stripes', 'lines'], mood: ['calm'], density: 'medium', goodFor: ['textile'] } }
);

export const sectionA = { title: 'A. Loom', all };
