import type { PatternDefinition } from 'tabbied';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { battlement, odessa, parity } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { palette, type Palette } from '../../palettes';
import { SEAFOAM } from '../palettes';

const [FOAM, SAGE, TEAL, DEEP] = SEAFOAM.colors;

// One axis for all three bars: $2.00 is BAR_MAX px.
const BAR_MAX = 760;

const BARS: { label: string; amount: number; design: PatternDefinition; colors: Palette; start: number }[] = [
  { label: 'U.S. rewards credit card', amount: 2.0, design: parity, colors: palette('Credit', DEEP, SAGE, FOAM, TEAL), start: 40 },
  { label: 'U.S. big-bank debit card (capped)', amount: 0.27, design: odessa, colors: palette('Debit', TEAL, FOAM, DEEP, SAGE), start: 80 },
  { label: 'Credit card in the EU (capped at 0.3%)', amount: 0.3, design: battlement, colors: palette('EU', SAGE, DEEP, FOAM, TEAL), start: 120 },
];

export const Debit: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('debit', frame, 10);
  const pig = useEntrance(90, 10);

  return (
    <AbsoluteFill style={{ background: FOAM }}>
      <div style={{ position: 'absolute', left: 110, top: 80, width: 820 }}>
        <Words
          text="Debit: your own money, and a capped fee"
          start={2}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 70, lineHeight: 1.04, color: DEEP }}
        />
        <Words
          text="A debit card lends nothing, so there is no interest to earn."
          start={24}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 42, lineHeight: 1.22, color: DEEP, marginTop: 34 }}
        />
        <Words
          text="Since 2011 the Durbin Amendment caps debit fees at big U.S. banks at 21 cents + 0.05%, plus a cent for fraud prevention."
          start={60}
          stagger={1}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 36, lineHeight: 1.28, color: DEEP, marginTop: 26 }}
        />
        <Words
          text="So big-bank debit cards rarely pay rewards. Banks under $10 billion are exempt, which is why many fintech accounts sit at small banks."
          start={150}
          stagger={1}
          highlight={{ rewards: TEAL }}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 36, lineHeight: 1.28, color: DEEP, marginTop: 26 }}
        />
      </div>

      <div style={{ position: 'absolute', left: 1010, top: 350, width: 820 }}>
        <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 24, letterSpacing: 3, color: TEAL }}>
          WHAT THE CARD'S BANK EARNS ON $100
        </div>
        {BARS.map((bar, index) => {
          const enter = interpolate(frame, [bar.start, bar.start + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const fill = interpolate(frame, [bar.start + 4, bar.start + 26], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div key={bar.label} style={{ marginTop: 44, opacity: enter }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 32, color: DEEP }}>{bar.label}</span>
                <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 56, color: DEEP }}>
                  ${bar.amount.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  width: Math.max(40, (bar.amount / 2) * BAR_MAX),
                  height: 70,
                  marginTop: 10,
                  borderRadius: 6,
                  overflow: 'hidden',
                  clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
                }}
              >
                <Pattern pattern={bar.design} palette={bar.colors.colors} density={0.8} seed={`${seed}-${index}`} />
              </div>
            </div>
          );
        })}
      </div>
      <Tinted
        src="credit-cards/piggy-bank"
        tones={[DEEP, TEAL, FOAM]}
        style={{
          position: 'absolute',
          right: 140,
          top: 50,
          width: 290,
          transform: `translateY(${(1 - pig) * -500}px)`,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.3))',
        }}
      />

      <Props
        pattern="odessa"
        palette={BARS[1].colors}
        seed={`${seed}-1`}
        start={90}
        ground={DEEP}
        ink={FOAM}
        accent={SAGE}
      />
    </AbsoluteFill>
  );
};
