import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { concentricrings } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { SKY } from '../palettes';

const [CLOUD, BLUE, DEEP, SUN] = SKY.colors;
const NIGHT = '#132f4c';

// The marmot is placed so its open mouth sits here; the calls ring out from it.
const MOUTH = { x: 520, y: 330 };
const CALL_START = 50;
const RING_EVERY = 18;
const RINGS = 4;

/** One call: a row of pulses, one for an eagle, a string for a fox. */
const Call: React.FC<{ pulses: number; start: number }> = ({ pulses, start }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', gap: 10, height: 44, alignItems: 'center' }}>
      {Array.from({ length: pulses }, (_, index) => {
        const lit = interpolate(frame, [start + index * 4, start + index * 4 + 6], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <span
            key={index}
            style={{
              width: pulses === 1 ? 150 : 34,
              height: 22,
              borderRadius: 11,
              background: DEEP,
              opacity: 0.2 + lit * 0.8,
              transform: `scaleY(${0.6 + lit * 0.4})`,
            }}
          />
        );
      })}
    </div>
  );
};

const Card: React.FC<{ start: number; label: string; meaning: string; pulses: number }> = ({
  start,
  label,
  meaning,
  pulses,
}) => {
  const progress = useEntrance(start, 15);
  return (
    <div
      style={{
        padding: '30px 38px 34px',
        borderRadius: 28,
        background: CLOUD,
        boxShadow: '0 24px 60px rgba(19, 47, 76, 0.35)',
        transform: `translateX(${(1 - progress) * 900}px) rotate(${(1 - progress) * 8}deg)`,
      }}
    >
      <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 26, letterSpacing: 4, color: BLUE }}>{label}</div>
      <div style={{ marginTop: 16 }}>
        <Call pulses={pulses} start={start + 6} />
      </div>
      <div style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 64, color: NIGHT, marginTop: 14, lineHeight: 1 }}>
        {meaning}
      </div>
    </div>
  );
};

export const Whistle: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('whistle', frame, 16);
  const rise = useEntrance(4, 14);

  return (
    <AbsoluteFill style={{ background: BLUE }}>
      <Pattern pattern={concentricrings} palette={SKY.colors} density={0.3} seed={seed} />

      {/* The call: rings spreading from the mouth, a new one on every beat. */}
      {Array.from({ length: RINGS }, (_, index) => {
        const since = frame - CALL_START - index * RING_EVERY;
        if (since < 0) return null;
        const age = (since % (RING_EVERY * RINGS)) / (RING_EVERY * RINGS);
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: MOUTH.x,
              top: MOUTH.y,
              width: 900,
              height: 900,
              marginLeft: -450,
              marginTop: -450,
              borderRadius: '50%',
              border: `16px solid ${DEEP}`,
              transform: `scale(${0.05 + age * 0.95})`,
              opacity: 1 - age,
            }}
          />
        );
      })}

      <Tinted
        src="marmots/whistle"
        tones={[NIGHT, DEEP, CLOUD]}
        style={{
          position: 'absolute',
          left: 230,
          top: 290,
          height: 790,
          transform: `translateY(${(1 - rise) * 800}px)`,
          filter: 'drop-shadow(0 30px 40px rgba(19, 47, 76, 0.5))',
        }}
      />

      <div style={{ position: 'absolute', left: 1040, top: 90, width: 780 }}>
        <div style={{ padding: '26px 36px', borderRadius: 28, background: NIGHT }}>
          <Words
            text="ON LOOKOUT"
            start={6}
            style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: SUN }}
          />
          <Words
            text="One stands tall and whistles."
            start={14}
            stagger={2}
            style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 64, lineHeight: 1.1, color: CLOUD, marginTop: 8 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 30 }}>
          <Card start={104} label="ONE WHISTLE" meaning="Eagle overhead" pulses={1} />
          <Card start={156} label="A STRING OF THEM" meaning="Fox on the ground" pulses={7} />
        </div>
      </div>

      <Props
        pattern="concentricrings"
        palette={SKY}
        seed={seed}
        start={36}
        ground={NIGHT}
        ink={CLOUD}
        accent={SUN}
        style={{ left: 'auto', right: 56 }}
      />
    </AbsoluteFill>
  );
};
