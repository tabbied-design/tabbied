import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { misprint } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { DUOTONE } from '../palettes';

const [WHITE, SLATE, ROSE] = DUOTONE.colors;

const POINTS = [
  {
    who: 'Every shopper.',
    text: 'Stores build card fees into their prices, for cash and debit customers too.',
    start: 40,
  },
  {
    who: 'People who carry a balance.',
    text: "Their interest is the issuer's biggest income.",
    start: 100,
  },
];

export const WhoPays: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('whopays', frame, 12);
  const disc = useEntrance(0, 16);
  const tag = useEntrance(14, 9);
  const finding = useEntrance(160);
  const swing = Math.sin(frame / 9) * 8 * Math.exp(-Math.max(0, frame - 14) / 45);

  return (
    <AbsoluteFill style={{ background: WHITE }}>
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 140,
          width: 800,
          height: 800,
          borderRadius: '50%',
          overflow: 'hidden',
          transform: `scale(${disc})`,
        }}
      >
        <Pattern pattern={misprint} palette={DUOTONE.colors} density={0.45} seed={seed} />
      </div>
      <Tinted
        src="credit-cards/price-tag"
        tones={[SLATE, ROSE, WHITE]}
        style={{
          position: 'absolute',
          left: 270,
          top: 170,
          height: 720,
          transformOrigin: '70% 5%',
          transform: `translateY(${(1 - tag) * -900}px) rotate(${-12 + swing}deg)`,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.3))',
        }}
      />

      <div style={{ position: 'absolute', left: 990, top: 110, width: 830 }}>
        <Words
          text="Who really pays for the rewards?"
          start={4}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 84, lineHeight: 1.02, color: SLATE }}
        />
        {POINTS.map((point, index) => {
          const enter = interpolate(frame, [point.start, point.start + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={point.who}
              style={{ display: 'flex', gap: 26, marginTop: 40, opacity: enter }}
            >
              <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 30, color: ROSE }}>0{index + 1}</span>
              <div>
                <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 44, color: SLATE }}>{point.who}</div>
                <Words
                  text={point.text}
                  start={point.start + 6}
                  stagger={2}
                  style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 38, lineHeight: 1.25, color: SLATE, marginTop: 6 }}
                />
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 48,
            padding: '24px 28px',
            background: SLATE,
            color: WHITE,
            opacity: finding,
            transform: `translateY(${(1 - finding) * 30}px)`,
          }}
        >
          <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 22, letterSpacing: 3, color: ROSE }}>
            BOSTON FED RESEARCH
          </div>
          <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, lineHeight: 1.22, marginTop: 8 }}>
            The net transfer runs from lower-income households to higher-income ones.
          </div>
        </div>
      </div>

      <Props
        pattern="misprint"
        palette={DUOTONE}
        seed={seed}
        start={40}
        ground={SLATE}
        ink={WHITE}
        accent={ROSE}
      />
    </AbsoluteFill>
  );
};
