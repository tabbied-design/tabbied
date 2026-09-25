// I. Rigging - spars run out on the diagonal.
//
// A spar is a hard linear band written as a mask layer, so several compose
// freely. CSS and a vector renderer disagree by a fraction of a pixel along a
// 45deg edge, which the sweep tolerates but which is why nothing here butts
// two bands edge to edge: they cross, or they stand clear.
import {
  section,
  F,
  TR,
  rot,
  faded,
  bandLin,
  slabLin,
  R2,
  R4,
} from './shared.mjs';

const { add, all } = section('I. Rigging');

const turned = (decls, turns = R4) =>
  `--rot: ${turns}; ${F} { ${decls} ${rot('@var(--rot)')} }${TR}`;

add(
  'Bowsprit',
  'A spar run out on the diagonal over the hull below.',
  (c) => ({
    rule: turned(faded(c, slabLin('0deg', '16%'), bandLin('45deg', '58%', '72%'))),
  }),
  { pal: 23 }
);

add(
  'Jibboom',
  'Two spars run out parallel on the same diagonal.',
  (c) => ({
    rule: turned(
      faded(c, bandLin('45deg', '46%', '56%'), bandLin('45deg', '66%', '76%')),
      R2
    ),
  }),
  { pal: 62 }
);

export const sectionI = { title: 'I. Rigging', all };
