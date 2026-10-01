import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { goldencoil } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { EMERALD } from '../palettes';

const [FOREST, GREEN, MINT, PALE] = EMERALD.colors;

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('swipe', frame, 12);
  const panel = useEntrance(2);
  const card = useEntrance(18, 13);
  const bob = Math.sin(frame / 18) * 10;

  return (
    <AbsoluteFill style={{ background: FOREST }}>
      <Pattern pattern={goldencoil} palette={EMERALD.colors} density={0.3} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 170,
          width: 1080,
          padding: '64px 70px 70px 110px',
          background: FOREST,
          clipPath: `inset(0 ${(1 - panel) * 100}% 0 0)`,
        }}
      >
        <Words
          text="THE ECONOMICS OF A SWIPE"
          start={8}
          stagger={2}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 30, letterSpacing: 5, color: MINT }}
        />
        <Words
          text="Who pays for your 1.5% cash back?"
          start={16}
          highlight={{ '1.5%': MINT }}
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 124,
            lineHeight: 1.0,
            letterSpacing: -2,
            color: PALE,
            marginTop: 30,
          }}
        />
        <Words
          text="And who keeps the rest: the bank, Visa, or someone else?"
          start={44}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 40, lineHeight: 1.25, color: PALE, marginTop: 34 }}
        />
      </div>

      <Tinted
        src="credit-cards/card"
        tones={[FOREST, GREEN, PALE]}
        style={{
          position: 'absolute',
          right: 90,
          top: 300,
          width: 760,
          transform: `translate(${(1 - card) * 700}px, ${bob}px) rotate(${interpolate(card, [0, 1], [30, -10])}deg)`,
          filter: 'drop-shadow(0 40px 50px rgba(0, 0, 0, 0.55))',
        }}
      />

      <Props
        pattern="goldencoil"
        palette={EMERALD}
        seed={seed}
        start={50}
        ground={FOREST}
        ink={PALE}
        accent={MINT}
      />
    </AbsoluteFill>
  );
};
