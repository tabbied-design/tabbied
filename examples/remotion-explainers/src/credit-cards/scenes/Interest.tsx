import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { marbledarcs } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { LAVA } from '../palettes';

const [CHAR, FLAME, ORANGE, GOLD] = LAVA.colors;
const CREAM = '#fff4e0';

export const Interest: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('interest', frame, 18);
  const glass = useEntrance(10, 14);
  const stat = useEntrance(170);
  // The rate counts up to a typical card APR.
  const apr = Math.round(
    interpolate(frame, [16, 56], [0, 22], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <AbsoluteFill style={{ background: CHAR }}>
      <div style={{ position: 'absolute', left: 1140, top: 0, width: 780, height: 1080 }}>
        <Pattern pattern={marbledarcs} palette={LAVA.colors} density={0.4} seed={seed} />
      </div>
      <Tinted
        src="credit-cards/hourglass"
        tones={[CHAR, FLAME, GOLD]}
        style={{
          position: 'absolute',
          left: 1330,
          top: 110,
          height: 860,
          transform: `translateY(${(1 - glass) * 1000}px) rotate(${interpolate(glass, [0, 1], [180, 0])}deg)`,
          filter: 'drop-shadow(0 40px 50px rgba(0, 0, 0, 0.6))',
        }}
      />

      <div style={{ position: 'absolute', left: 110, top: 90, width: 980 }}>
        <Words
          text="THE REAL MONEY: INTEREST"
          start={4}
          stagger={2}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 30, letterSpacing: 5, color: ORANGE }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginTop: 10 }}>
          <span
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 230,
              lineHeight: 1,
              color: GOLD,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {apr}%
          </span>
          <Words
            text="a typical card APR"
            start={30}
            style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 44, color: CREAM }}
          />
        </div>
        <Words
          text="Nearly half of cardholders carry a balance at some point in the year."
          start={60}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 50, lineHeight: 1.18, color: CREAM, marginTop: 26 }}
        />
        <Words
          text="Carry $5,000 for a year at 22% and it costs about $1,100."
          start={110}
          stagger={2}
          highlight={{ '$1,100': FLAME }}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 46, lineHeight: 1.22, color: CREAM, marginTop: 22 }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            marginTop: 44,
            padding: '24px 30px',
            border: `3px solid ${FLAME}`,
            opacity: stat,
            transform: `translateY(${(1 - stat) * 30}px)`,
          }}
        >
          <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 96, color: FLAME, lineHeight: 1 }}>
            $130B+
          </span>
          <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 32, lineHeight: 1.25, color: CREAM }}>
            in interest and fees charged by U.S. card issuers in 2022 (CFPB)
          </span>
        </div>
      </div>

      <Props
        pattern="marbledarcs"
        palette={LAVA}
        seed={seed}
        start={40}
        ground={CHAR}
        ink={CREAM}
        accent={ORANGE}
      />
    </AbsoluteFill>
  );
};
