// E. Grove - leaves, petals, scales, seeds and stones.
import { section, F, TR, ink, cp, msk, mskI, B, A, pieL, noise } from './shared.mjs';

const { add, all } = section('E. Grove');

/** A per-cell ink, rolled once and read anywhere in the cell with @var(--name). */
const K = (c, name = 'k', s = 1) => `--${name}: ${ink(c, s)};`;
const xf = (v) => `-webkit-transform: ${v}; transform: ${v};`;

add(
  'Ginkgo',
  'Fan-shaped ginkgo leaves with a notch in the rim and a fine stalk, drifting at angles that lean together across the sheet.',
  (c) => ({
    rule: `${K(c)} ${F} { ${xf(`rotate(@calc(${noise(-70, 70)} + @r(-20, 20))deg)`)}
      ${B(`left: 4%; width: 92%; top: 10%; height: 46%; border-radius: 50% 50% 0 0 / 100% 100% 0 0; background: @p(@var(--k)); ${cp('polygon(50% 100%, 0% 28%, 0% 0%, 45% 0%, 50% 18%, 55% 0%, 100% 0%, 100% 28%)')}`)}
      ${A(`left: 48%; width: 4%; top: 54%; height: 36%; border-radius: 2px; background: @var(--k);`)}
    }${TR}`,
  }),
  {
    pal: 38,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['leaves', 'semicircles', 'grid'], mood: ['organic', 'calm'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

add(
  'Carp Scales',
  'Rounded fish scales tucked row under row in a running bond, each with a thin inner rim in a second ink.',
  (c) => ({
    rule: `--j: ${ink(c)}; ${F} { width: 100%; height: 200%; z-index: @calc(100 - @y);
      ${xf('translate(@calc(-50 * ((@y + 1) % 2))%, -25%)')}
      border-radius: 0 0 50% 50% / 0 0 50% 50%;
      background: radial-gradient(50% 100% at 50% 0%, transparent 0 64%, @var(--j) 64% 76%, transparent 76%) 0 100% / 100% 50% no-repeat, ${ink(c)};
      ${A('top: 0; left: 100%; width: 100%; height: 100%; background: inherit; border-radius: inherit;')}
    }${TR}`,
  }),
  {
    pal: 41,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['scallops', 'semicircles', 'arcs'], mood: ['organic', 'calm'], density: 'dense', goodFor: ['textile', 'wallpaper'] },
  }
);

add(
  'Primrose',
  'Five-petal flowers with notched rounded petals and a contrasting eye, scattered at every angle.',
  (c) => ({
    host: '--flower: @shape(split: 200; r: .5 + .5 * abs(cos(2.5t)); scale: .98);',
    rule: `${F} { ${xf(`rotate(@r(0, 72)deg) scale(${noise(0.7, 1.05)})`)}
      ${B(`inset: 4%; background: ${ink(c, 2)}; ${cp('@var(--flower)')}`)}
      ${A('inset: 38%; border-radius: 50%; background: var(--color1);')}
    }${TR}`,
  }),
  {
    pal: 24,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['petals', 'circles', 'dots'], mood: ['playful', 'organic'], density: 'medium', goodFor: ['textile', 'packaging'] },
  }
);

add(
  'Phyllotaxis',
  'One sunflower head across the whole sheet: seeds set at the golden angle in interlocking spirals, ringed by petals.',
  (c) => ({
    rule: `${F} {
      ${xf(`translate(@calc(100 * (@X / 2 + 0.5 * min(@X, @Y) / sqrt(@I) * sqrt(@i - 0.5) * cos(@i * 2.399963) - @x + 0.5))%, @calc(100 * (@Y / 2 + 0.5 * min(@X, @Y) / sqrt(@I) * sqrt(@i - 0.5) * sin(@i * 2.399963) - @y + 0.5))%) rotate(@calc(@i * 137.5078 + 90)deg) scale(@calc(min(@X, @Y) / sqrt(@I) * (0.75 + 0.5 * sqrt(@i / @I))))`)}
      ${B('left: 22%; right: 22%; top: 14%; bottom: 14%; border-radius: 50%; background: @match(i > I * 0.84, @p(var(--color1), var(--color2)), @p(var(--color3), var(--color4), var(--color5)));')}
    }${TR}`,
  }),
  {
    palette: ['#FBF3DC', '#F2A900', '#E0701B', '#6B3A17', '#3B2210', '#9A5B26'],
    grid: '8x12',
    tg: '10x10',
    meta: { tags: ['spirals', 'radial', 'dots', 'ovals'], mood: ['organic', 'bold'], density: 'medium', goodFor: ['poster', 'og-image'] },
  }
);

add(
  'Lily Pad',
  'Round lily pads with a wedge notched out of each, large and small ones floating together on still water.',
  (c) => ({
    rule: `${F} {
      ${B(`left: 6%; top: 6%; width: 88%; height: 88%; border-radius: 50%; background: ${ink(c)}; ${msk(pieL('330deg'))} ${xf(`translate(@r(-8, 8)%, @r(-8, 8)%) rotate(@r(0, 360)deg) scale(${noise(0.55, 1.05)})`)}`)}
      ${A(`left: 58%; top: 58%; width: 36%; height: 36%; border-radius: 50%; background: ${ink(c)}; ${msk(pieL('325deg'))} ${xf('rotate(@r(0, 360)deg)')} opacity: @p(0, 1, 1);`)}
    }${TR}`,
  }),
  {
    pal: 40,
    inks: 3,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['circles', 'dots', 'grid'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'hero-background'] },
  }
);

add(
  'Bamboo',
  'Bamboo canes rising in segments, each joint a small gap, with slender leaves springing from some of the nodes.',
  (c) => ({
    rule: `${F} {
      ${B(`left: @calc(16 + 9 * ((@x * 7 + 3) % 5))%; width: @calc(20 + 5 * ((@x * 3) % 3))%; top: 5%; bottom: 0; border-radius: 14% / 4%; background: ${ink(c)};`)}
      ${A(`left: @calc(26 + 9 * ((@x * 7 + 3) % 5))%; top: -6%; width: 70%; height: 13%; border-radius: 0 100% 0 100%; background: ${ink(c)}; transform-origin: 0 50%; ${xf('rotate(@p(-35deg, -150deg, 25deg, 160deg))')} opacity: @p(0, 0, 1);`)}
    }${TR}`,
  }),
  {
    pal: 34,
    inks: 4,
    grid: '6x9',
    tg: '6x6',
    meta: { tags: ['stripes', 'leaves', 'lines'], mood: ['calm', 'organic'], density: 'medium', goodFor: ['wallpaper', 'textile'] },
  }
);

export const sectionE = { title: 'E. Grove', all };
