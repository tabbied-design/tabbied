import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { maze } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../components/Pattern';
import { Tinted } from '../components/Tinted';
import { Props, Words, useEntrance } from '../components/Type';
import { DISPLAY, MONO } from '../fonts';
import { TOUCAN } from '../palettes';

const [NAVY, YELLOW, ORANGE, BLUE, WHITE] = TOUCAN.colors;

// The same design inside the letters, on the yellow ground, so the name is
// cut from the pattern rather than set over it.
const LETTER_PALETTE = [YELLOW, NAVY, ORANGE, BLUE];

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('hopper', frame, 10);
  const panel = useEntrance(4);
  const name = useEntrance(16);
  const portrait = useEntrance(26, 14);

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <Pattern pattern={maze} palette={TOUCAN.colors} density={0.3} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 150,
          width: 1180,
          background: NAVY,
          clipPath: `inset(0 ${(1 - panel) * 100}% 0 0)`,
          padding: '70px 0 64px 110px',
        }}
      >
        <Words
          text="1906 - 1992"
          start={10}
          style={{ fontFamily: MONO, fontSize: 30, color: YELLOW, letterSpacing: 4 }}
        />
        <Words
          text="GRACE"
          start={14}
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 210,
            lineHeight: 0.95,
            color: WHITE,
            marginTop: 26,
          }}
        />
        <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
          <clipPath id="hopper-letters" clipPathUnits="userSpaceOnUse">
            <text
              x={-8}
              y={178}
              fontFamily="Space Grotesk"
              fontWeight={700}
              fontSize={210}
              letterSpacing={-2}
            >
              HOPPER
            </text>
          </clipPath>
        </svg>
        <div
          style={{
            width: 960,
            height: 210,
            clipPath: 'url(#hopper-letters)',
            transform: `translateY(${(1 - name) * 60}px)`,
            opacity: name,
          }}
        >
          <Pattern pattern={maze} palette={LETTER_PALETTE} density={0.7} seed={seed} />
        </div>
        <Words
          text="The mathematician who taught computers to read words."
          start={34}
          stagger={2}
          style={{
            fontFamily: DISPLAY,
            fontWeight: 500,
            fontSize: 46,
            lineHeight: 1.2,
            color: WHITE,
            width: 900,
            marginTop: 40,
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 120,
          width: 720,
          height: 720,
          borderRadius: '50%',
          background: YELLOW,
          transform: `scale(${portrait})`,
        }}
      />
      <Tinted
        src="hopper"
        tones={[NAVY, BLUE, WHITE]}
        style={{
          position: 'absolute',
          right: 150,
          bottom: 0,
          height: 960,
          transform: `translateY(${interpolate(portrait, [0, 1], [400, 0])}px)`,
        }}
      />

      <Props
        pattern="maze"
        palette={TOUCAN}
        seed={seed}
        start={44}
        ground={NAVY}
        ink={WHITE}
        accent={YELLOW}
      />
    </AbsoluteFill>
  );
};
