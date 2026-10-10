import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { PatternField } from '../PatternField';
import { C, F, ease } from '../brand';
import { data } from '../data';
import { designs } from './designs';
import { Knockout, Slide, progress } from './kit';

// The count, cut out of the ground so the field shows through its digits,
// then a zoom into the 8 until the field is the whole frame: the palette
// beat opens on exactly this picture (same design, seed and palette).
export const COUNT_FRAMES = 84;
export const COUNT_LAST_SEED = 'count-2';

// Inside the 8's waist, where the zoom goes through; read off a still.
const ZOOM_AT = { x: 1296, y: 470 };

export function Count() {
  const frame = useCurrentFrame();
  const { design, palettes } = data.motion.count;
  const n = Math.round(
    interpolate(frame, [2, 28], [0, data.counts.patterns], {
      easing: ease,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const zoom = interpolate(frame, [62, COUNT_FRAMES], [1, 48], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const veil = interpolate(frame, [COUNT_FRAMES - 6, COUNT_FRAMES - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <PatternField
        pattern={designs[design]}
        steps={['count-1', COUNT_LAST_SEED].map((seed) => ({ seed, palette: palettes[0].colors }))}
        hold={30}
        morph={16}
        loop={false}
        density={0.3}
      />
      <AbsoluteFill
        style={{ transform: `scale(${zoom})`, transformOrigin: `${ZOOM_AT.x}px ${ZOOM_AT.y}px`, opacity: veil }}
      >
        <Knockout id="count" text={String(n)} fontSize={600} y={470} textScale={0.86 + 0.14 * progress(frame, 0, 14)} />
      </AbsoluteFill>
      <Slide start={24} exit={56} style={{ position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center' }}>
        <p
          style={{
            margin: 0,
            fontFamily: F.mono,
            fontSize: 34,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.cyan,
          }}
        >
          patterns, every one drawn live
        </p>
      </Slide>
    </AbsoluteFill>
  );
}
