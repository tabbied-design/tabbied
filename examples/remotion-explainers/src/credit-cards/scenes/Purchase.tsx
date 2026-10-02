import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { dotmatrix } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { PAPER } from '../palettes';

const [SHEET, INK, GOLD] = PAPER.colors;

const dollars = (value: number) => `$${value.toFixed(2)}`;

export const Purchase: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('receipt', frame, 10);
  const band = useEntrance(0);
  const bag = useEntrance(10, 14);
  const receipt = useEntrance(24, 14);
  const store = useEntrance(52);
  // The store's side of the purchase counts down from $100 to what it keeps.
  const received = interpolate(frame, [64, 104], [100, 97.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: SHEET }}>
      <div
        style={{
          position: 'absolute',
          left: 1160,
          top: 0,
          width: 760,
          height: 1080,
          clipPath: `inset(0 0 ${(1 - band) * 100}% 0)`,
        }}
      >
        <Pattern pattern={dotmatrix} palette={PAPER.colors} density={0.5} seed={seed} />
      </div>
      <Tinted
        src="credit-cards/grocery-bag"
        tones={[INK, GOLD, SHEET]}
        style={{
          position: 'absolute',
          left: 1200,
          top: 230,
          height: 760,
          transform: `translateY(${(1 - bag) * 900}px)`,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.3))',
        }}
      />
      <Tinted
        src="credit-cards/receipt"
        tones={[INK, GOLD, SHEET]}
        style={{
          position: 'absolute',
          left: 1560,
          top: 120,
          height: 700,
          transform: `translateY(${(1 - receipt) * -900}px) rotate(8deg)`,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.3))',
        }}
      />

      <div style={{ position: 'absolute', left: 120, top: 120, width: 960, fontVariantNumeric: 'tabular-nums' }}>
        <Words
          text="YOU PAY"
          start={4}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 30, letterSpacing: 5, color: GOLD }}
        />
        <Words
          text="$100.00"
          start={8}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 190, lineHeight: 1, color: INK }}
        />
        <div style={{ opacity: store, transform: `translateY(${(1 - store) * 30}px)`, marginTop: 36 }}>
          <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 30, letterSpacing: 5, color: GOLD }}>
            THE STORE GETS
          </div>
          <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 190, lineHeight: 1, color: INK }}>
            {dollars(received)}
          </div>
        </div>
        <Words
          text="The missing $2.40 is the swipe fee, and three companies split it."
          start={110}
          stagger={2}
          highlight={{ '$2.40': GOLD }}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 48, lineHeight: 1.22, color: INK, marginTop: 44, width: 900 }}
        />
      </div>

      <Props
        pattern="dotmatrix"
        palette={PAPER}
        seed={seed}
        start={30}
        ground={INK}
        ink={SHEET}
        accent={GOLD}
      />
    </AbsoluteFill>
  );
};
