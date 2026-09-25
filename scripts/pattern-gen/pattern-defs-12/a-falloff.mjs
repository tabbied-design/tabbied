// A. Falloff - one ink and one straight ramp.
//
// Where does the ink stop being ink? A `linear-gradient(#000 ...,
// transparent ...)` mask answers it, and moving the two stops is the design
// space: hold solid and then drop away, run corner to corner, break the fall
// with a flat step, or shut the ramp inside a bar so it fades along its own
// length. Always a mask over a solid ink (see shared.mjs for why).
import {
  section,
  B,
  F,
  TR,
  ink,
  rot,
  msk,
  fade,
  faded,
  across,
  down,
  R2,
  R4,
} from './shared.mjs';

const { add, all } = section('A. Falloff');

/** A full-bleed ink cut by one ramp, turned a quarter at a time. */
const ramp = (c, layer, turns = R4) =>
  `--rot: ${turns}; ${F} { ${faded(c, layer)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Gloaming',
  'The ink holds for a moment at one edge and then falls away to nothing across the rest of the cell.',
  (c) => ({ rule: ramp(c, fade('180deg', '18%', '100%')) }),
  { pal: 3 }
);

add(
  'Rolloff',
  'The ramp runs corner to corner rather than edge to edge, so the fall is on the diagonal.',
  (c) => ({ rule: ramp(c, fade('135deg', '0%', '100%'), R2) }),
  { pal: 44 }
);

add(
  'Decay',
  'A fall broken by one flat step half way down, so the drop reads in two stages.',
  (c) => ({
    rule: ramp(
      c,
      'linear-gradient(180deg, #000 0 16%, #00000080 52%, transparent 100%)'
    ),
  }),
  { pal: 11 }
);

add(
  'Subside',
  'A band across the middle of the cell, fading along its own length.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${B(`${across('20%', '60%', ink(c))} ${msk(fade('90deg', '0%', '100%'))}`)} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 29 }
);

add(
  'Tailoff',
  'A narrow upright, solid at the foot and spent by the head.',
  (c) => ({
    rule: `--rot: ${R4}; ${F} { ${B(`${down('34%', '32%', ink(c))} ${msk(fade('0deg', '0%', '100%'))}`)} ${rot('@var(--rot)')} }${TR}`,
  }),
  { pal: 67 }
);

export const sectionA = { title: 'A. Falloff', all };
