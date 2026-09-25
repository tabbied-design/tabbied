// D. Drybrush - a ruled field with a ramp laid over it.
//
// Section C's intersection with a stripe field in place of the dots: the
// rules keep their width all the way across, but less and less of them
// survives, like a brush running out. The variety is which way the ramp runs
// against the rules.
import { section, F, TR, rot, slotL, fade, both, R2, R4 } from './shared.mjs';

const { add, all } = section('D. Drybrush');

/** A ruled field thinned by a ramp, turned a quarter at a time. */
const dragged = (c, rules, ramp, turns = R4) =>
  `--rot: ${turns}; ${F} { ${both(c, rules, ramp)} ${rot('@var(--rot)')} }${TR}`;

add(
  'Drybrush',
  'Rules dragged across the cell, thinning as they go until the ground shows through.',
  (c) => ({ rule: dragged(c, slotL('0deg', '12%', '22%'), fade('90deg', '4%', '100%')) }),
  { pal: 57 }
);

add(
  'Streaking',
  'The rules lean at forty-five degrees and the fall runs square across them.',
  (c) => ({
    rule: dragged(c, slotL('45deg', '10%', '20%'), fade('135deg', '0%', '100%'), R2),
  }),
  { pal: 43 }
);

export const sectionD = { title: 'D. Drybrush', all };
