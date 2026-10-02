import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { wovenkhaki } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { COCOA } from '../palettes';

const [BARK, SAND, BROWN, CREAM] = COCOA.colors;

// A schematic, not data: the study found the trend, and these bars only show
// its direction.
const GROUPS = [
  { size: 1, odds: 0.3 },
  { size: 2, odds: 0.5 },
  { size: 4, odds: 0.72 },
  { size: 8, odds: 0.94 },
];
const BAR_W = 130;
const BAR_H = 300;

export const Huddle: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('huddle', frame, 20);
  const blanket = useEntrance(2, 16);
  const pile = useEntrance(12, 14);
  const chart = useEntrance(90, 16);
  const breath = 1 + Math.sin(frame / 20) * 0.01;

  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 400,
          width: 1040,
          height: 540,
          borderRadius: 70,
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(75, 46, 30, 0.35)',
          transform: `translateY(${(1 - blanket) * 800}px) rotate(${(1 - blanket) * -6 - 1.5}deg)`,
        }}
      >
        <Pattern pattern={wovenkhaki} palette={COCOA.colors} density={0.45} seed={seed} />
      </div>
      <Tinted
        src="marmots/huddle"
        tones={[BARK, BROWN, CREAM]}
        style={{
          position: 'absolute',
          left: 200,
          top: 330,
          width: 800,
          transformOrigin: '50% 100%',
          transform: `translateY(${(1 - pile) * -700}px) scale(${breath})`,
          opacity: pile,
          filter: 'drop-shadow(0 26px 30px rgba(75, 46, 30, 0.5))',
        }}
      />

      <div style={{ position: 'absolute', left: 110, top: 80, width: 1000 }}>
        <Words
          text="BETTER TOGETHER"
          start={6}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: BROWN }}
        />
        <Words
          text="They sleep in a family pile."
          start={14}
          stagger={2}
          style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 84, lineHeight: 1.05, color: BARK, marginTop: 10 }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1200,
          top: 130,
          width: 640,
          opacity: chart,
          transform: `translateY(${(1 - chart) * 40}px)`,
        }}
      >
        <Words
          text="Bigger huddles, better odds of making it to spring."
          start={92}
          stagger={2}
          highlight={{ Bigger: BROWN, spring: BROWN }}
          style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 50, lineHeight: 1.12, color: BARK }}
        />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, height: BAR_H, marginTop: 40 }}>
          {GROUPS.map(({ size, odds }, index) => {
            const grow = interpolate(frame, [104 + index * 10, 128 + index * 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={size}
                style={{
                  position: 'relative',
                  width: BAR_W,
                  height: BAR_H * odds,
                  borderRadius: '22px 22px 6px 6px',
                  overflow: 'hidden',
                  clipPath: `inset(${(1 - grow) * 100}% 0 0 0 round 22px 22px 6px 6px)`,
                }}
              >
                <Pattern pattern={wovenkhaki} palette={COCOA.colors} density={0.75} seed={`${seed}-${index}`} />
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 40, marginTop: 16 }}>
          {GROUPS.map(({ size }) => (
            <div
              key={size}
              style={{ width: BAR_W, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}
            >
              {Array.from({ length: size }, (_, dot) => (
                <span key={dot} style={{ width: 22, height: 22, borderRadius: '50%', background: BROWN }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 22, color: BROWN, marginTop: 22 }}>
          huddle size, from 1 to 8 / illustrative
        </div>
      </div>

      <Props
        pattern="wovenkhaki"
        palette={COCOA}
        seed={seed}
        start={36}
        ground={BARK}
        ink={CREAM}
        accent={SAND}
        style={{ left: 'auto', right: 56 }}
      />
    </AbsoluteFill>
  );
};
