import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { pebble } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { SUNDOG } from '../palettes';

const [PAPER, GOLD, ORANGE, BLUE, INK] = SUNDOG.colors;

export const Groundhog: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('groundhog', frame, 14);
  // A spring with little damping: it pops up and settles.
  const pop = useEntrance(8, 9);
  const page = useEntrance(92, 13);
  const chips = useEntrance(52);
  const phil = useEntrance(138);
  // A glance left, then right, once it is up.
  const look = interpolate(frame, [60, 75, 95, 110], [0, -4, -4, 3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: GOLD }}>
      <Pattern pattern={pebble} palette={SUNDOG.colors} density={0.3} seed={seed} />

      <div style={{ position: 'absolute', left: 110, top: 80, width: 960 }}>
        <div style={{ display: 'inline-block', padding: '28px 40px 34px', borderRadius: 30, background: PAPER }}>
          <Words
            text="THE GROUNDHOG"
            start={6}
            style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: ORANGE }}
          />
          <Words
            text="is a marmot too."
            start={14}
            stagger={3}
            style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 96, lineHeight: 1.02, color: INK, marginTop: 6 }}
          />
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 20,
              opacity: chips,
              transform: `translateY(${(1 - chips) * 20}px)`,
            }}
          >
            {['Marmota monax', 'a.k.a. woodchuck'].map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: BLUE,
                  color: PAPER,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Tinted
        src="marmots/groundhog"
        tones={[INK, ORANGE, PAPER]}
        style={{
          position: 'absolute',
          left: 60,
          bottom: -30,
          width: 700,
          transformOrigin: '50% 100%',
          transform: `translateY(${(1 - pop) * 700}px) rotate(${look}deg)`,
          filter: 'drop-shadow(0 20px 30px rgba(43, 43, 43, 0.4))',
        }}
      />

      <div style={{ position: 'absolute', left: 1200, top: 120, width: 560, perspective: 1600 }}>
        <div
          style={{
            borderRadius: 30,
            background: PAPER,
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(43, 43, 43, 0.35)',
            transformOrigin: '50% 0%',
            transform: `rotateX(${(1 - page) * -100}deg)`,
            opacity: page > 0.02 ? 1 : 0,
          }}
        >
          <div
            style={{
              padding: '22px 0',
              background: ORANGE,
              color: PAPER,
              textAlign: 'center',
              fontFamily: ROUNDED,
              fontWeight: 700,
              fontSize: 54,
              letterSpacing: 6,
            }}
          >
            FEBRUARY
          </div>
          <div
            style={{
              textAlign: 'center',
              fontFamily: ROUNDED,
              fontWeight: 700,
              fontSize: 330,
              lineHeight: 1.05,
              color: INK,
            }}
          >
            2
          </div>
          <div
            style={{
              textAlign: 'center',
              paddingBottom: 30,
              fontFamily: MONO,
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: 4,
              color: BLUE,
            }}
          >
            GROUNDHOG DAY
          </div>
        </div>
        <div
          style={{
            marginTop: 26,
            padding: '20px 28px',
            borderRadius: 24,
            background: INK,
            color: PAPER,
            opacity: phil,
            transform: `translateY(${(1 - phil) * 30}px)`,
          }}
        >
          <div style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 42 }}>Punxsutawney Phil</div>
          <div style={{ fontFamily: ROUNDED, fontWeight: 500, fontSize: 30, color: GOLD, marginTop: 4 }}>
            forecasting the spring since 1887
          </div>
        </div>
      </div>

      <Props
        pattern="pebble"
        palette={SUNDOG}
        seed={seed}
        start={40}
        ground={INK}
        ink={PAPER}
        accent={GOLD}
        style={{ left: 'auto', right: 56 }}
      />
    </AbsoluteFill>
  );
};
