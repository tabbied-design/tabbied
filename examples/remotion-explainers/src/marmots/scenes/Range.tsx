import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { bight } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { HIGHLAND } from '../palettes';

const [MIST, SAGE, PINE, SLATE, RUST] = HIGHLAND.colors;

// Timed to the narration: "...of Europe, Asia and North America."
const PLACES = [
  { name: 'Europe', start: 104 },
  { name: 'Asia', start: 118 },
  { name: 'North America', start: 132 },
];

export const Range: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('range', frame, 14);
  const arch = useEntrance(4, 16);
  const peak = useEntrance(16);
  const note = useEntrance(150);
  const species = Math.round(
    interpolate(frame, [14, 60], [0, 15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <AbsoluteFill style={{ background: MIST }}>
      {/* A window onto the highlands: the arch rises, the pattern inside it holds still. */}
      <div
        style={{
          position: 'absolute',
          left: 1010,
          top: 90,
          width: 800,
          height: 990,
          borderRadius: '400px 400px 0 0',
          overflow: 'hidden',
          clipPath: `inset(${(1 - arch) * 100}% 0 0 0)`,
        }}
      >
        <Pattern pattern={bight} palette={HIGHLAND.colors} density={0.35} seed={seed} />
      </div>
      <Tinted
        src="marmots/peak"
        tones={[SLATE, PINE, MIST]}
        style={{
          position: 'absolute',
          left: 1000,
          bottom: 0,
          width: 820,
          transform: `translateY(${(1 - peak) * 600}px)`,
        }}
      />

      <div style={{ position: 'absolute', left: 120, top: 120, width: 820 }}>
        <Words
          text="WHERE THEY LIVE"
          start={6}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 30, letterSpacing: 6, color: RUST }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 30, marginTop: 8 }}>
          <span
            style={{
              fontFamily: ROUNDED,
              fontWeight: 700,
              fontSize: 280,
              lineHeight: 1,
              color: SLATE,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {species}
          </span>
          <Words
            text="species"
            start={30}
            style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 90, color: PINE }}
          />
        </div>
        <Words
          text="across the mountains and meadows of"
          start={56}
          stagger={2}
          style={{ fontFamily: ROUNDED, fontWeight: 500, fontSize: 52, lineHeight: 1.2, color: SLATE, marginTop: 6 }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
          {PLACES.map(({ name, start }) => {
            const progress = interpolate(frame, [start, start + 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={name}
                style={{
                  fontFamily: ROUNDED,
                  fontWeight: 700,
                  fontSize: 50,
                  padding: '12px 30px',
                  borderRadius: 999,
                  background: PINE,
                  color: MIST,
                  opacity: progress,
                  transform: `scale(${interpolate(progress, [0, 1], [0.6, 1])})`,
                }}
              >
                {name}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 48,
            fontFamily: ROUNDED,
            fontWeight: 500,
            fontSize: 34,
            lineHeight: 1.3,
            color: PINE,
            opacity: note,
          }}
        >
          The name may come from the Latin <i>mus montanus</i>: "mountain mouse".
        </div>
      </div>

      <Props
        pattern="bight"
        palette={HIGHLAND}
        seed={seed}
        start={30}
        ground={SLATE}
        ink={MIST}
        accent={SAGE}
      />
    </AbsoluteFill>
  );
};
