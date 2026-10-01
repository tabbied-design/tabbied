import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { dipole } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../components/Pattern';
import { Tinted } from '../components/Tinted';
import { Props, Words, useEntrance } from '../components/Type';
import { DISPLAY, MONO } from '../fonts';
import { HOT_WIRE } from '../palettes';

const [VOID, PINK, CYAN, ICE] = HOT_WIRE.colors;
const TICKS = 13;

export const Nanosecond: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('nanosecond', frame, 8);
  const drawn = interpolate(frame, [26, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ruler = useEntrance(60);

  return (
    <AbsoluteFill style={{ background: VOID }}>
      <Pattern pattern={dipole} palette={HOT_WIRE.colors} density={0.5} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 80,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ background: VOID, padding: '30px 56px 36px', width: 1460, textAlign: 'center' }}>
          <Words
            text="How long is a nanosecond?"
            start={2}
            style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 92, color: CYAN }}
          />
          <Words
            text="She handed out wires 11.8 inches long: as far as light travels in a billionth of a second."
            start={14}
            stagger={2}
            style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 44, lineHeight: 1.22, color: ICE, marginTop: 14 }}
          />
        </div>
      </div>

      <Tinted
        src="wire"
        tones={[VOID, PINK, ICE]}
        style={{
          position: 'absolute',
          left: 210,
          top: 470,
          width: 1500,
          clipPath: `inset(0 ${(1 - drawn) * 100}% 0 0)`,
          filter: `drop-shadow(0 0 24px ${PINK})`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 260,
          width: 1400,
          top: 810,
          height: 120,
          background: VOID,
          padding: '18px 30px 0',
          opacity: ruler,
          transform: `translateY(${(1 - ruler) * 40}px)`,
        }}
      >
        <div style={{ position: 'relative', height: 40, borderTop: `3px solid ${CYAN}` }}>
          {Array.from({ length: TICKS }, (_, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${(index / (TICKS - 1)) * 100}%`,
                top: 0,
                width: 3,
                height: index % 6 === 0 ? 34 : 18,
                background: CYAN,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: MONO,
            fontWeight: 600,
            fontSize: 30,
            color: ICE,
          }}
        >
          <span>0</span>
          <span style={{ color: PINK }}>1 ns = 11.8 in = 30 cm</span>
          <span>11.8 in</span>
        </div>
      </div>

      <Props
        pattern="dipole"
        palette={HOT_WIRE}
        seed={seed}
        start={40}
        ground={VOID}
        ink={ICE}
        accent={CYAN}
      />
    </AbsoluteFill>
  );
};
