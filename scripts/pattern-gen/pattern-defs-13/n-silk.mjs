// N. Silk - linear ramps as sheen: where the light lies on the cloth.
//
// A ribbon whose ends feather out, two ribbons fading in opposite directions,
// and a sash cut on the bias that fades along its own length. For the sash,
// clip-path decides the silhouette and the mask how much of it is there; the
// converter emits them in Filter Effects order (children, filter, clip,
// mask), so it is a <clipPath> and a <mask> on the same group.
import {
  section,
  A,
  B,
  F,
  TR,
  cp,
  ink,
  poly,
  rot,
  msk,
  fade,
  midFade,
  across,
  R2,
  R4,
} from './shared.mjs';

const { add, all } = section('N. Silk');

const turned = (decls, turns = R4) =>
  `--rot: ${turns}; ${F} { ${decls} ${rot('@var(--rot)')} }${TR}`;

add(
  'Grosgrain',
  'A wide ribbon whose ends feather out instead of stopping.',
  (c) => ({
    rule: turned(
      B(`${across('30%', '40%', ink(c))} ${msk(midFade('90deg', '0%', '16%', '84%', '100%'))}`),
      R2
    ),
  }),
  { pal: 15 }
);

add(
  'Bengaline',
  'Two ribbons fading in opposite directions, warp against weft.',
  (c) => ({
    rule: turned(
      `${B(`${across('16%', '26%', ink(c))} ${msk(fade('90deg', '0%', '100%'))}`)} ${A(
        `${across('58%', '26%', ink(c))} ${msk(fade('270deg', '0%', '100%'))}`
      )}`,
      R2
    ),
  }),
  { pal: 45 }
);

add(
  'Cendal',
  'A sash cut on the bias, fading along its own length.',
  (c) => ({
    rule: turned(
      `background: ${ink(c)}; ${cp(
        poly([[0, 78], [78, 0], [100, 0], [100, 22], [22, 100], [0, 100]])
      )} ${msk(fade('45deg', '10%', '96%'))}`
    ),
  }),
  { pal: 57 }
);

export const sectionN = { title: 'N. Silk', all };
