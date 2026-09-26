import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { patterns } from 'tabbied/patterns';
import { PatternField } from '../PatternField';
import { C, Eyebrow, body, ease, rise, title, useRise } from '../brand';
import { data } from '../data';

// Nine designs from the library, each reseeding on its own beat. Chosen from
// the designs whose own transition covers the whole change: some animate
// only a size or an angle and cut the colors, which reads as a flicker here.
const WALL = ['radius', 'bauhaus', 'ogee', 'annulus', 'foldback', 'sunray', 'circusposter', 'lobe', 'veil'] as const;
const TILE = 256;
const GAP = 22;

export function Wall() {
  const frame = useCurrentFrame();
  const count = Math.round(
    interpolate(frame, [6, 46], [0, data.counts.patterns], { easing: ease, extrapolateRight: 'clamp' })
  );
  const text = useRise(0);
  const lede = useRise(20);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', left: 128, top: 290, width: 640, ...rise(text) }}>
        <Eyebrow>Pattern library</Eyebrow>
        <h2 style={{ ...title, fontSize: 180, marginTop: 28, fontVariantNumeric: 'tabular-nums' }}>{count}</h2>
        <h2 style={{ ...title, fontSize: 84 }}>patterns</h2>
        <p style={{ ...body, marginTop: 36, width: 600, ...rise(lede) }}>
          Each one drawn live in the browser, and reseeded into a new arrangement whenever you like.
        </p>
      </div>
      <div style={{ position: 'absolute', right: 128, top: (1080 - (TILE * 3 + GAP * 2)) / 2 }}>
        {WALL.map((slug, i) => {
          const pop = interpolate(frame, [i * 3, i * 3 + 18], [0, 1], {
            easing: ease,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={slug}
              style={{
                position: 'absolute',
                left: (i % 3) * (TILE + GAP) - (TILE * 3 + GAP * 2),
                top: Math.floor(i / 3) * (TILE + GAP),
                width: TILE,
                height: TILE,
                borderRadius: 18,
                overflow: 'hidden',
                opacity: pop,
                transform: `scale(${0.88 + pop * 0.12})`,
              }}
            >
              <PatternField
                pattern={patterns[slug]}
                steps={[{ seed: `${slug}-1` }, { seed: `${slug}-2` }, { seed: `${slug}-3` }]}
                hold={40}
                morph={16}
                offset={i * 9}
                density={0.25}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
