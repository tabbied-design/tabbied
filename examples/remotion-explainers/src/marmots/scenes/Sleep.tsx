import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { sparkle } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { SMALL_HOURS } from '../palettes';
import { HEART } from '../shapes';

const [NIGHT, FROST, MIST, SLATE, DUSK] = SMALL_HOURS.colors;
const MOON = '#ffd98a';

// Hibernation from September to May: nine of the twelve months.
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const ASLEEP = [8, 9, 10, 11, 0, 1, 2, 3, 4];

// A heart trace whose beats spread further and further apart.
const TRACE_W = 760;
const TRACE_H = 150;
const BEATS = [30, 100, 185, 290, 425, 590];
const trace = () => {
  const base = TRACE_H * 0.62;
  let d = `M0 ${base}`;
  for (const x of BEATS) {
    d += ` L${x} ${base} L${x + 8} ${base - 18} L${x + 14} ${base} L${x + 20} ${base + 16} L${x + 28} ${base - 84} L${x + 36} ${base + 30} L${x + 44} ${base} L${x + 56} ${base - 14} L${x + 66} ${base}`;
  }
  return `${d} L${TRACE_W} ${base}`;
};
const TRACE = trace();

export const Sleep: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('sleep', frame, 24);
  const den = useEntrance(4, 16);
  const monitor = useEntrance(116, 16);
  const pen = interpolate(frame, [124, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const breath = 1 + Math.sin(frame / 22) * 0.015;
  // The heart beats once each time the pen crosses a spike.
  const lastBeat = BEATS.filter((x) => pen * TRACE_W >= x + 28).length;
  const sinceBeat = lastBeat ? frame - (124 + ((BEATS[lastBeat - 1] + 28) / TRACE_W) * 86) : 99;
  const thump = 1 + Math.max(0, 1 - sinceBeat / 8) * 0.2;

  return (
    <AbsoluteFill style={{ background: NIGHT }}>
      <Pattern pattern={sparkle} palette={SMALL_HOURS.colors} density={0.25} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 200,
          width: 760,
          height: 760,
          borderRadius: '50%',
          background: DUSK,
          boxShadow: `0 0 0 18px ${NIGHT}, 0 0 0 22px ${SLATE}`,
          transform: `scale(${den})`,
        }}
      />
      <Tinted
        src="marmots/asleep"
        tones={[NIGHT, SLATE, FROST]}
        style={{
          position: 'absolute',
          left: 210,
          top: 290,
          width: 600,
          transformOrigin: '50% 100%',
          transform: `scale(${den * breath})`,
        }}
      />
      {[0, 1, 2].map((index) => {
        const t = ((frame + index * 22) % 66) / 66;
        return (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: 700 + t * 120,
              top: 300 - t * 200,
              fontFamily: ROUNDED,
              fontWeight: 700,
              fontSize: 50 + t * 50,
              color: MOON,
              opacity: frame < 20 ? 0 : Math.sin(t * Math.PI),
            }}
          >
            z
          </span>
        );
      })}

      <div style={{ position: 'absolute', left: 1010, top: 170, width: 820 }}>
        <Words
          text="HIBERNATION"
          start={6}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: MOON }}
        />
        <Words
          text="Up to 9 months"
          start={60}
          highlight={{ '9': MOON }}
          style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 104, lineHeight: 1, color: FROST, marginTop: 10 }}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
          {MONTHS.map((month, index) => {
            const order = ASLEEP.indexOf(index);
            const lit =
              order < 0
                ? 0
                : interpolate(frame, [62 + order * 5, 70 + order * 5], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });
            return (
              <span
                key={index}
                style={{
                  width: 60,
                  height: 74,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: 26,
                  background: lit > 0.5 ? MIST : DUSK,
                  color: lit > 0.5 ? NIGHT : MIST,
                  transform: `translateY(${-lit * 6}px)`,
                }}
              >
                {month}
              </span>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 54,
            padding: '26px 30px 22px',
            borderRadius: 24,
            background: DUSK,
            opacity: monitor,
            transform: `translateY(${(1 - monitor) * 40}px)`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 24, letterSpacing: 4, color: MIST }}>
              HEART RATE
            </span>
            <svg viewBox="0 0 24 24" width={44} height={44} style={{ transform: `scale(${thump})` }}>
              <path d={HEART} fill={MOON} />
            </svg>
          </div>
          <svg width={TRACE_W} height={TRACE_H} style={{ display: 'block', marginTop: 6 }}>
            <path d={TRACE} fill="none" stroke={SLATE} strokeWidth={3} />
            <path
              d={TRACE}
              fill="none"
              stroke={MOON}
              strokeWidth={5}
              strokeLinejoin="round"
              style={{ clipPath: `inset(0 ${(1 - pen) * 100}% 0 0)` }}
            />
          </svg>
          <Words
            text="slows to about 5 beats a minute"
            start={170}
            stagger={2}
            highlight={{ '5': MOON }}
            style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 46, color: FROST, marginTop: 4 }}
          />
        </div>
      </div>

      <Props
        pattern="sparkle"
        palette={SMALL_HOURS}
        seed={seed}
        start={36}
        ground={DUSK}
        ink={FROST}
        accent={MOON}
      />
    </AbsoluteFill>
  );
};
