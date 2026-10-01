import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { quoit } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { MINT } from '../palettes';

const [FROST, GREEN, INK, BLUE] = MINT.colors;

const Line: React.FC<{ amount: string; label: string; color: string; start: number }> = ({
  amount,
  label,
  color,
  start,
}) => {
  const enter = useEntrance(start);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 36,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -50}px)`,
      }}
    >
      <span
        style={{
          width: 540,
          textAlign: 'right',
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 130,
          lineHeight: 1.05,
          color,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {amount}
      </span>
      <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 3, color: INK }}>{label}</span>
    </div>
  );
};

export const CashBack: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('cashback', frame, 9);
  const panel = useEntrance(0, 18);
  const coins = useEntrance(12, 11);
  const rule = useEntrance(60);

  return (
    <AbsoluteFill style={{ background: FROST }}>
      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 90,
          width: 640,
          height: 900,
          borderRadius: 320,
          overflow: 'hidden',
          transform: `scale(${panel})`,
        }}
      >
        <Pattern pattern={quoit} palette={MINT.colors} density={0.5} seed={seed} />
      </div>
      <Tinted
        src="credit-cards/coins"
        tones={[INK, GREEN, FROST]}
        style={{
          position: 'absolute',
          right: 330,
          top: 140,
          height: 780,
          transform: `translateY(${(1 - coins) * -1000}px)`,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.35))',
        }}
      />

      <div style={{ position: 'absolute', left: 20, top: 110 }}>
        <Line amount="$2.00" label="THE BANK'S FEE" color={INK} start={6} />
        <Line amount="-$1.50" label="YOUR 1.5% CASH BACK" color={GREEN} start={26} />
        <div
          style={{
            height: 6,
            width: 1060,
            marginLeft: 60,
            marginTop: 14,
            marginBottom: 10,
            background: INK,
            transformOrigin: 'left',
            transform: `scaleX(${rule})`,
          }}
        />
        <Line amount="$0.50" label="LEFT FOR THE BANK" color={BLUE} start={66} />
      </div>
      <Words
        text="...before fraud, servicing, and fronting your money until the bill is due."
        start={92}
        stagger={2}
        style={{
          position: 'absolute',
          left: 120,
          top: 690,
          width: 980,
          fontFamily: DISPLAY,
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1.22,
          color: INK,
        }}
      />
      <Words
        text="Thin. So where is the profit?"
        start={140}
        stagger={3}
        highlight={{ profit: GREEN }}
        style={{
          position: 'absolute',
          left: 120,
          top: 840,
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 60,
          color: INK,
        }}
      />

      <Props
        pattern="quoit"
        palette={MINT}
        seed={seed}
        start={40}
        ground={INK}
        ink={FROST}
        accent={GREEN}
        style={{ left: 'auto', right: 56 }}
      />
    </AbsoluteFill>
  );
};
