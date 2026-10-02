import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { jibboom } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { BLIZZARD } from '../palettes';

const [SNOW, ICE, STEEL, GRANITE] = BLIZZARD.colors;
const SKY_H = 500;

// The cable runs downhill at the slope it has in the gondola picture, so the
// cabin's own length of cable lies along it.
const CABLE_SLOPE = 0.2;
const CABLE_Y = 60;
const GONDOLA_H = 400;
const GONDOLA_W = Math.round((GONDOLA_H * 714) / 992);

const LETTERS = 'WHISTLER'.split('');
// The picture's open mouth, where its whistle starts.
const MOUTH = { x: 1640, y: 520 };

export const Whistler: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seed = beatSeed('whistler', frame, 14);
  const sky = useEntrance(0, 18);
  const marmot = useEntrance(140, 12);
  const note = useEntrance(158);
  const x = interpolate(frame, [0, 205], [-GONDOLA_W - 40, 1180], { easing: Easing.inOut(Easing.sin) });
  const sway = Math.sin(frame / 9) * 1.5;

  return (
    <AbsoluteFill style={{ background: SNOW }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: SKY_H,
          clipPath: `inset(0 0 ${(1 - sky) * 100}% 0)`,
        }}
      >
        <Pattern pattern={jibboom} palette={BLIZZARD.colors} density={0.3} seed={seed} />
      </div>

      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
        <line x1={0} y1={CABLE_Y} x2={1920} y2={CABLE_Y + 1920 * CABLE_SLOPE} stroke={GRANITE} strokeWidth={5} />
      </svg>
      <Tinted
        src="marmots/gondola"
        tones={[GRANITE, STEEL, SNOW]}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: GONDOLA_H,
          transformOrigin: '30% 2%',
          transform: `translate(${x}px, ${CABLE_Y + x * CABLE_SLOPE - 4}px) rotate(${sway}deg)`,
          filter: 'drop-shadow(0 24px 30px rgba(47, 58, 69, 0.35))',
        }}
      />

      <div style={{ position: 'absolute', left: 110, top: 540, width: 1300 }}>
        <Words
          text="A SKI TOWN, NAMED BY A WHISTLE"
          start={10}
          stagger={2}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: STEEL }}
        />
        <div style={{ display: 'flex', marginTop: 4 }}>
          {LETTERS.map((letter, index) => {
            const drop = spring({ frame: frame - 76 - index * 3, fps, config: { damping: 11 } });
            return (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  fontFamily: ROUNDED,
                  fontWeight: 700,
                  fontSize: 210,
                  lineHeight: 1,
                  color: GRANITE,
                  opacity: Math.min(1, drop * 2),
                  transform: `translateY(${(1 - drop) * -120}px)`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
        <Words
          text="British Columbia, Canada"
          start={104}
          stagger={2}
          style={{ fontFamily: ROUNDED, fontWeight: 500, fontSize: 48, color: STEEL, marginTop: 6 }}
        />
      </div>

      {Array.from({ length: 3 }, (_, index) => {
        const since = frame - 156 - index * 14;
        if (since < 0) return null;
        const age = (since % 42) / 42;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: MOUTH.x - 160,
              top: MOUTH.y - 160,
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: `8px solid ${STEEL}`,
              transform: `scale(${0.1 + age * 0.9})`,
              opacity: 1 - age,
            }}
          />
        );
      })}
      <Tinted
        src="marmots/whistle"
        tones={[GRANITE, STEEL, SNOW]}
        style={{
          position: 'absolute',
          right: 150,
          bottom: 0,
          height: 580,
          transform: `translateY(${(1 - marmot) * 620}px)`,
          filter: 'drop-shadow(0 20px 30px rgba(47, 58, 69, 0.35))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 560,
          bottom: 150,
          width: 540,
          padding: '18px 24px',
          borderRadius: 22,
          background: GRANITE,
          color: SNOW,
          fontFamily: ROUNDED,
          fontWeight: 500,
          fontSize: 30,
          lineHeight: 1.25,
          opacity: note,
          transform: `translateX(${(1 - note) * 40}px)`,
        }}
      >
        after the hoary marmot, <i>Marmota caligata</i>: "the whistler"
      </div>

      <Props
        pattern="jibboom"
        palette={BLIZZARD}
        seed={seed}
        start={44}
        ground={GRANITE}
        ink={SNOW}
        accent={ICE}
      />
    </AbsoluteFill>
  );
};
