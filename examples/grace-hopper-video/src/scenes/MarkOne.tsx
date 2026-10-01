import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { circuit } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../components/Pattern';
import { Tinted } from '../components/Tinted';
import { Props, Words, useEntrance } from '../components/Type';
import { DISPLAY, MONO } from '../fonts';
import { BLUEPRINT } from '../palettes';

const [NAVY, WHITE, STEEL, GOLD] = BLUEPRINT.colors;
const FACTS = ['51 FT LONG', '530 MILES OF WIRE', '3 ADDITIONS A SECOND'];

export const MarkOne: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('1944', frame, 6);
  const machine = useEntrance(18);

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <Pattern pattern={circuit} palette={BLUEPRINT.colors} density={0.45} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 90,
          width: 820,
          padding: '48px 56px 52px',
          background: NAVY,
          border: `2px solid ${STEEL}`,
        }}
      >
        <Words
          text="1944"
          start={4}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 200, lineHeight: 0.9, color: GOLD }}
        />
        <Words
          text="Lieutenant Hopper of the U.S. Navy Reserve becomes one of the first programmers of the Harvard Mark I."
          start={14}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 46, lineHeight: 1.22, color: WHITE, marginTop: 28 }}
        />
        <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
          {FACTS.map((fact, index) => {
            const progress = interpolate(frame, [48 + index * 8, 56 + index * 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={fact}
                style={{
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: 26,
                  padding: '8px 14px',
                  background: GOLD,
                  color: NAVY,
                  opacity: progress,
                }}
              >
                {fact}
              </span>
            );
          })}
        </div>
      </div>

      <Tinted
        src="mark-one"
        tones={['#071a30', STEEL, WHITE]}
        style={{
          position: 'absolute',
          right: -90,
          bottom: 60,
          width: 1080,
          transform: `translateX(${(1 - machine) * 900}px)`,
          filter: 'drop-shadow(0 24px 30px rgba(0, 0, 0, 0.5))',
        }}
      />

      <Props
        pattern="circuit"
        palette={BLUEPRINT}
        seed={seed}
        ground={NAVY}
        ink={WHITE}
        accent={GOLD}
        style={{ border: `2px solid ${STEEL}` }}
      />
    </AbsoluteFill>
  );
};
