import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { lobe } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { MARMOT } from '../palettes';

const [CREAM, TAN, BROWN, BARK] = MARMOT.colors;

// The letters take the same design on a dark ground, so the name is cut
// from the pattern rather than set over it.
const LETTER_PALETTE = [BARK, TAN, BROWN, CREAM];

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('marmot', frame, 12);
  const panel = useEntrance(2);
  const name = useEntrance(14);
  const marmot = useEntrance(24, 12);
  const chips = useEntrance(96);
  // A slow breath, so the sentinel is alive between beats.
  const breath = 1 + Math.sin(frame / 14) * 0.012;

  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <Pattern pattern={lobe} palette={MARMOT.colors} density={0.3} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 150,
          width: 1140,
          padding: '64px 70px 70px 110px',
          background: CREAM,
          borderRadius: '0 60px 60px 0',
          clipPath: `inset(0 ${(1 - panel) * 100}% 0 0 round 0 60px 60px 0)`,
        }}
      >
        <Words
          text="MEET THE"
          start={8}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 32, letterSpacing: 8, color: BROWN }}
        />
        <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
          <clipPath id="marmot-letters" clipPathUnits="userSpaceOnUse">
            <text x={-4} y={176} fontFamily="Fredoka" fontWeight={700} fontSize={212} letterSpacing={-3}>
              MARMOTS
            </text>
          </clipPath>
        </svg>
        <div
          style={{
            width: 960,
            height: 214,
            marginTop: 12,
            clipPath: 'url(#marmot-letters)',
            transform: `translateY(${(1 - name) * 60}px)`,
            opacity: name,
          }}
        >
          <Pattern pattern={lobe} palette={LETTER_PALETTE} density={0.75} seed={seed} />
        </div>
        <Words
          text="A squirrel, believe it or not, and the heaviest kind there is."
          start={32}
          stagger={2}
          highlight={{ squirrel: BROWN, heaviest: BROWN }}
          style={{
            fontFamily: ROUNDED,
            fontWeight: 500,
            fontSize: 50,
            lineHeight: 1.2,
            color: BARK,
            width: 900,
            marginTop: 30,
          }}
        />
        <div
          style={{
            display: 'flex',
            gap: 14,
            marginTop: 34,
            opacity: chips,
            transform: `translateY(${(1 - chips) * 24}px)`,
          }}
        >
          {['Family: Sciuridae', 'Genus: Marmota'].map((chip) => (
            <span
              key={chip}
              style={{
                fontFamily: MONO,
                fontSize: 24,
                padding: '10px 18px',
                borderRadius: 999,
                background: BARK,
                color: CREAM,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 150,
          width: 640,
          height: 640,
          borderRadius: '50%',
          background: TAN,
          transform: `scale(${marmot})`,
        }}
      />
      <Tinted
        src="marmots/sentinel"
        tones={[BARK, BROWN, CREAM]}
        style={{
          position: 'absolute',
          right: 230,
          bottom: 0,
          height: 900,
          transformOrigin: '50% 100%',
          transform: `translateY(${interpolate(marmot, [0, 1], [900, 0])}px) scale(${breath})`,
          filter: 'drop-shadow(0 30px 40px rgba(51, 41, 31, 0.45))',
        }}
      />

      <Props
        pattern="lobe"
        palette={MARMOT}
        seed={seed}
        start={44}
        ground={BARK}
        ink={CREAM}
        accent={TAN}
      />
    </AbsoluteFill>
  );
};
