import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { gyre } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { GASLIGHT } from '../palettes';

const [SOOT, BRASS, BRONZE, CREAM] = GASLIGHT.colors;

export const Clocks: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('1906', frame, 15);
  const dial = useEntrance(0);
  const clock = useEntrance(10, 12);
  // The alarm goes off: a shake that starts and settles on fixed frames.
  const ring = interpolate(frame, [40, 46, 80], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shake = Math.sin(frame * 2.4) * 5 * ring;
  const yale = useEntrance(96);

  return (
    <AbsoluteFill style={{ background: SOOT }}>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 90,
          width: 900,
          height: 900,
          borderRadius: '50%',
          overflow: 'hidden',
          transform: `scale(${interpolate(dial, [0, 1], [0.7, 1])}) rotate(${frame * 0.25}deg)`,
          opacity: dial,
        }}
      >
        <Pattern pattern={gyre} palette={GASLIGHT.colors} density={0.55} seed={seed} />
      </div>
      <Tinted
        src="grace-hopper/alarm-clock"
        tones={[BRONZE, BRASS, CREAM]}
        style={{
          position: 'absolute',
          left: 230,
          top: 230,
          width: 660,
          transform: `translateY(${(1 - clock) * 300}px) rotate(${shake}deg)`,
          opacity: clock,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.45))',
        }}
      />

      <div style={{ position: 'absolute', left: 1110, top: 170, width: 700 }}>
        <Words
          text="1906"
          start={6}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 230, lineHeight: 0.9, color: BRASS }}
        />
        <Words
          text="Born in New York City."
          start={16}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 56, color: CREAM, marginTop: 30 }}
        />
        <Words
          text="At seven she took apart seven alarm clocks, one after another, to find out how they worked."
          start={30}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 42, lineHeight: 1.25, color: CREAM, marginTop: 22 }}
        />
        <div
          style={{
            marginTop: 54,
            display: 'inline-block',
            padding: '12px 20px',
            border: `2px solid ${BRASS}`,
            color: BRASS,
            fontFamily: MONO,
            fontSize: 28,
            opacity: yale,
            transform: `translateX(${(1 - yale) * 40}px)`,
          }}
        >
          1934 / PhD in mathematics, Yale
        </div>
      </div>

      <Props
        pattern="gyre"
        palette={GASLIGHT}
        seed={seed}
        ground={SOOT}
        ink={CREAM}
        accent={BRASS}
        style={{ left: 'auto', right: 56 }}
      />
    </AbsoluteFill>
  );
};
