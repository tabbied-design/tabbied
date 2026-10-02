import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { petalcut } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { MEADOW } from '../palettes';

const [DEW, LEAF, NAVY] = MEADOW.colors;
const SPRING = '#a9d86e';
const TRACK = '#cfe8c8';

// The marmot's paws, where each bunch of flowers ends up.
const PAWS = { x: 1395, y: 500 };
const BUNCHES = [
  { start: 24, from: { x: 1180, y: -260 }, spin: -40 },
  { start: 64, from: { x: 1700, y: -280 }, spin: 50 },
  { start: 104, from: { x: 1400, y: -320 }, spin: -20 },
];
const FALL = 30;
const MONTHS = ['JUN', 'JUL', 'AUG', 'SEP'];
const METER_W = 760;

export const Feast: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('feast', frame, 14);
  const panel = useEntrance(2);
  const marmot = useEntrance(6, 14);
  // A third of the winter fat for every bunch eaten.
  const fat = BUNCHES.reduce(
    (sum, { start }) =>
      sum +
      interpolate(frame, [start + FALL, start + FALL + 14], [0, 1 / 3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      }),
    0
  );
  const munch = BUNCHES.some(({ start }) => frame >= start + FALL - 4 && frame < start + FALL + 10)
    ? Math.abs(Math.sin(frame / 2)) * 0.02
    : 0;

  return (
    <AbsoluteFill style={{ background: LEAF }}>
      <Pattern pattern={petalcut} palette={MEADOW.colors} density={0.3} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 110,
          width: 1000,
          padding: '56px 70px 60px 110px',
          background: DEW,
          borderRadius: '0 60px 60px 0',
          clipPath: `inset(0 ${(1 - panel) * 100}% 0 0 round 0 60px 60px 0)`,
        }}
      >
        <Words
          text="ALL SUMMER LONG"
          start={8}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: LEAF }}
        />
        <Words
          text="Grasses, herbs and flowers."
          start={20}
          stagger={3}
          style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 86, lineHeight: 1.02, color: NAVY, marginTop: 10 }}
        />
        <Words
          text="Fattening up for winter."
          start={96}
          stagger={2}
          highlight={{ winter: LEAF }}
          style={{ fontFamily: ROUNDED, fontWeight: 500, fontSize: 54, color: NAVY, marginTop: 18 }}
        />

        <div style={{ marginTop: 44 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: METER_W,
              fontFamily: MONO,
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: 3,
              color: NAVY,
            }}
          >
            <span>WINTER FAT</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{Math.round(fat * 100)}%</span>
          </div>
          <div
            style={{
              position: 'relative',
              width: METER_W,
              height: 64,
              marginTop: 12,
              borderRadius: 32,
              background: TRACK,
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${(1 - fat) * 100}% 0 0)` }}>
              <Pattern pattern={petalcut} palette={[NAVY, LEAF, DEW]} density={0.85} seed={seed} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: METER_W,
              marginTop: 10,
              fontFamily: MONO,
              fontSize: 22,
              color: LEAF,
            }}
          >
            {MONTHS.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>

      <Tinted
        src="marmots/snack"
        tones={[NAVY, DEW]}
        style={{
          position: 'absolute',
          left: 1180,
          top: 250,
          height: 780,
          transformOrigin: '50% 100%',
          // Rounder as the summer goes on.
          transform: `translateY(${(1 - marmot) * 900}px) scale(${1 + fat * 0.14 + munch}, ${1 + munch})`,
          filter: 'drop-shadow(0 30px 40px rgba(39, 48, 92, 0.45))',
        }}
      />

      {BUNCHES.map(({ start, from, spin }, index) => {
        const t = interpolate(frame, [start, start + FALL], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.quad),
        });
        if (frame < start || t >= 1) return null;
        return (
          <Tinted
            key={index}
            src="marmots/flowers"
            tones={[NAVY, LEAF, DEW]}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: 300,
              transformOrigin: '50% 50%',
              transform: `translate(${interpolate(t, [0, 1], [from.x, PAWS.x]) - 105}px, ${interpolate(t, [0, 1], [from.y, PAWS.y]) - 150}px) rotate(${spin * (1 - t)}deg) scale(${1 - t * 0.85})`,
            }}
          />
        );
      })}

      <Props
        pattern="petalcut"
        palette={MEADOW}
        seed={seed}
        start={30}
        ground={NAVY}
        ink={DEW}
        accent={SPRING}
      />
    </AbsoluteFill>
  );
};
