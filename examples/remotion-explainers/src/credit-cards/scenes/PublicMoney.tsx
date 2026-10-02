import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { comet } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { BIOLUMINESCENCE } from '../palettes';

const [ABYSS, AQUA, SKY, VIOLET] = BIOLUMINESCENCE.colors;
const WHITE = '#eef6ff';

const PLACES = [
  { place: 'BRAZIL', text: 'Pix, launched by the central bank in 2020, is now the most used way to pay.', start: 40 },
  { place: 'INDIA', text: 'UPI carries billions of payments a month, with no fee for merchants.', start: 95 },
  { place: 'EUROPE', text: 'A digital euro is in preparation, partly to depend less on non-European card networks.', start: 150 },
  { place: 'U.S.', text: 'A federal digital dollar was ruled out in 2025. Regulated stablecoins got a law instead.', start: 205 },
];

export const PublicMoney: React.FC = () => {
  const frame = useCurrentFrame();
  // The fastest reseed in the film: payments that settle in seconds.
  const seed = beatSeed('rails', frame, 3);
  const coin = useEntrance(10, 12);
  // The coin turns on its vertical axis, read off the frame.
  const turn = Math.cos(frame / 22);

  return (
    <AbsoluteFill style={{ background: ABYSS }}>
      <Pattern pattern={comet} palette={BIOLUMINESCENCE.colors} density={0.5} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 70,
          width: 1130,
          padding: '40px 50px 46px',
          background: ABYSS,
          borderRadius: 14,
        }}
      >
        <Words
          text="The bigger threat: cheap public payment rails"
          start={2}
          highlight={{ public: AQUA }}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 72, lineHeight: 1.05, color: WHITE }}
        />
        {PLACES.map(({ place, text, start }) => {
          const enter = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div key={place} style={{ display: 'flex', gap: 28, marginTop: 34, opacity: enter }}>
              <span
                style={{
                  flex: '0 0 150px',
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: 26,
                  letterSpacing: 3,
                  color: place === 'U.S.' ? VIOLET : AQUA,
                  paddingTop: 8,
                }}
              >
                {place}
              </span>
              <Words
                text={text}
                start={start + 4}
                stagger={1}
                style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 40, lineHeight: 1.25, color: WHITE }}
              />
            </div>
          );
        })}
      </div>

      <Tinted
        src="credit-cards/digital-coin"
        tones={[ABYSS, SKY, WHITE]}
        style={{
          position: 'absolute',
          right: 110,
          top: 270,
          width: 520,
          transform: `translateY(${(1 - coin) * 900}px) scaleX(${0.25 + 0.75 * Math.abs(turn)})`,
          filter: `drop-shadow(0 0 40px ${AQUA}88)`,
        }}
      />

      <Props
        pattern="comet"
        palette={BIOLUMINESCENCE}
        seed={seed}
        start={60}
        ground={ABYSS}
        ink={WHITE}
        accent={AQUA}
      />
    </AbsoluteFill>
  );
};
