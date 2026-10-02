import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { roundpair } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { PEACHY } from '../palettes';
import { HEART } from '../shapes';

const [BLUSH, PINK, CORAL, CLAY] = PEACHY.colors;

const IMAGE_W = 1240;
const IMAGE_H = Math.round((IMAGE_W * 628) / 1504);
const IMAGE_LEFT = (1920 - IMAGE_W) / 2;
const IMAGE_TOP = 1080 - 130 - IMAGE_H;
// The two noses meet on the picture's center line, at this height.
const NOSE_Y = IMAGE_TOP + Math.round(IMAGE_H * 0.16);
const MEET = 118;

/** One of the pair: half the picture, walking in from its own side. */
const Half: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const frame = useCurrentFrame();
  const approach = interpolate(frame, [8, MEET], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const sign = side === 'left' ? -1 : 1;
  // A small hop on every step until they meet.
  const hop = approach > 0 ? Math.abs(Math.sin(frame / 4)) * 14 * Math.min(1, approach * 4) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: IMAGE_LEFT,
        top: IMAGE_TOP,
        width: IMAGE_W,
        height: IMAGE_H,
        clipPath: side === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
        transform: `translate(${sign * approach * 420}px, ${-hop}px)`,
      }}
    >
      <Tinted src="marmots/greeting" tones={[CLAY, CORAL, BLUSH]} style={{ width: IMAGE_W, display: 'block' }} />
    </div>
  );
};

export const Greeting: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('greeting', frame, 16);
  const ground = useEntrance(0, 18);
  const heart = useEntrance(MEET + 2, 9);
  const meter = useEntrance(148, 16);
  const fill = interpolate(frame, [158, 196], [0, 1.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const cuteness = Math.round(Math.min(fill, 1) * 100);

  return (
    <AbsoluteFill style={{ background: PINK }}>
      <Pattern pattern={roundpair} palette={PEACHY.colors} density={0.3} seed={seed} />

      {/* The burrow's mouth: a pale mound the pair meets on. */}
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 560,
          width: 1600,
          height: 1000,
          borderRadius: '50%',
          background: BLUSH,
          transform: `translateY(${(1 - ground) * 600}px)`,
        }}
      />

      <Half side="left" />
      <Half side="right" />

      <svg
        viewBox="0 0 24 24"
        width={150}
        height={150}
        style={{
          position: 'absolute',
          left: 960 - 75,
          top: NOSE_Y - 230,
          transform: `translateY(${(1 - heart) * 80}px) scale(${heart * (1 + Math.sin(frame / 5) * 0.06)})`,
          overflow: 'visible',
        }}
      >
        <path d={HEART} fill={CORAL} stroke={CLAY} strokeWidth={1.2} />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 70,
          width: 860,
          padding: '26px 36px 32px',
          borderRadius: 28,
          background: BLUSH,
          boxShadow: '0 24px 60px rgba(122, 59, 46, 0.3)',
        }}
      >
        <Words
          text="FAMILY LIFE"
          start={6}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: CLAY }}
        />
        <Words
          text="They share a burrow, and greet nose to nose."
          start={14}
          stagger={2}
          highlight={{ nose: CORAL }}
          style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 62, lineHeight: 1.08, color: CLAY, marginTop: 8 }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 96,
          width: 560,
          padding: '24px 30px 28px',
          borderRadius: 26,
          background: BLUSH,
          boxShadow: '0 24px 60px rgba(122, 59, 46, 0.3)',
          opacity: meter,
          transform: `translateY(${(1 - meter) * -40}px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: MONO,
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: 3,
            color: CLAY,
          }}
        >
          <span>CUTENESS</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fill > 1.02 ? 'OFF THE SCALE' : `${cuteness}%`}</span>
        </div>
        {/* The bar overruns its track: the pattern is revealed, never resized. */}
        <div style={{ position: 'relative', height: 54, marginTop: 16, borderRadius: 27, background: PINK }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 500 * 1.18,
              height: 54,
              borderRadius: 27,
              overflow: 'hidden',
              clipPath: `inset(0 ${(1 - fill / 1.18) * 100}% 0 0 round 27px)`,
            }}
          >
            <Pattern pattern={roundpair} palette={[CORAL, CLAY, PINK, BLUSH]} density={0.8} seed={seed} />
          </div>
        </div>
      </div>

      <Props
        pattern="roundpair"
        palette={PEACHY}
        seed={seed}
        start={40}
        ground={CLAY}
        ink={BLUSH}
        accent={PINK}
      />
    </AbsoluteFill>
  );
};
