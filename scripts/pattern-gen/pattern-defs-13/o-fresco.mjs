// O. Fresco - the fall of ink quantized into counted levels.
//
// `stepFade()` writes a linear fall as flat translucent levels; `stepGlow()`
// does the same on a circle. Every stop pair sits at the same position, so
// both are hard-stop gradients that *read* as ramps. The alpha is carried by
// the mask, so on a transparent background the sheet shows through each step
// in proportion.
import {
  section,
  F,
  TR,
  rot,
  faded,
  both,
  slotL,
  stepFade,
  stepGlow,
  R2,
  R4,
} from './shared.mjs';

const { add, all } = section('O. Fresco');

const turned = (decls, turns = R4) =>
  `--rot: ${turns}; ${F} { ${decls} ${rot('@var(--rot)')} }${TR}`;

add(
  'Giornata',
  'A diagonal fall worked in four flat stages - one day\'s plaster each.',
  (c) => ({ rule: turned(faded(c, stepFade('135deg', 4)), R2) }),
  { pal: 5 }
);

add(
  'Gesso',
  'Six fine levels, close enough to read almost as a smooth ground.',
  (c) => ({ rule: turned(faded(c, stepFade('180deg', 6))) }),
  { pal: 73 }
);

add(
  'Arriccio',
  'The rough coat thrown from a corner, its reach stepped rather than smooth.',
  (c) => ({ rule: turned(faded(c, stepGlow('0% 100%', 5))) }),
  { pal: 38 }
);

add(
  'Basse',
  'Wide columns rising through counted levels of translucent enamel.',
  (c) => ({
    rule: turned(both(c, slotL('90deg', '16%', '25%'), stepFade('0deg', 4)), R2),
  }),
  { pal: 43 }
);

export const sectionO = { title: 'O. Fresco', all };
