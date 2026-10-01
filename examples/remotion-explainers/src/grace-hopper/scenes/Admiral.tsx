import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { northstar } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY } from '../../fonts';
import { DECO } from '../palettes';

const [JET, GOLD, IVORY, PATINA] = DECO.colors;

export const Admiral: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('admiral', frame, 6);
  const arch = useEntrance(0);
  const medal = useEntrance(16, 9);
  // The medal swings on its ribbon and comes to rest.
  const swing = Math.sin(frame / 7) * 9 * Math.exp(-Math.max(0, frame - 16) / 40) * medal;

  return (
    <AbsoluteFill style={{ background: JET }}>
      <div
        style={{
          position: 'absolute',
          right: 140,
          top: 60,
          width: 660,
          height: 960,
          borderRadius: '330px 330px 0 0',
          overflow: 'hidden',
          transform: `translateY(${(1 - arch) * 1000}px)`,
          boxShadow: `0 0 0 10px ${JET}, 0 0 0 14px ${GOLD}`,
        }}
      >
        <Pattern pattern={northstar} palette={DECO.colors} density={0.6} seed={seed} />
      </div>
      <Tinted
        src="grace-hopper/medal"
        tones={[JET, GOLD, IVORY]}
        style={{
          position: 'absolute',
          right: 270,
          top: 140,
          width: 400,
          transformOrigin: '50% 0',
          transform: `translateY(${(1 - medal) * -700}px) rotate(${swing}deg)`,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.6))',
        }}
      />

      <div style={{ position: 'absolute', left: 110, top: 130, width: 940 }}>
        <Words
          text="1986"
          start={4}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 170, lineHeight: 0.9, color: GOLD }}
        />
        <Words
          text="She retires a rear admiral, at 79 the oldest serving officer in the U.S. Navy."
          start={12}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 46, lineHeight: 1.22, color: IVORY, marginTop: 22 }}
        />
        <div
          style={{
            height: 4,
            background: PATINA,
            marginTop: 50,
            marginBottom: 46,
            width: `${interpolate(frame, [50, 80], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
          }}
        />
        <Words
          text="2016"
          start={64}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 170, lineHeight: 0.9, color: GOLD }}
        />
        <Words
          text="The Presidential Medal of Freedom."
          start={72}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 46, lineHeight: 1.22, color: IVORY, marginTop: 22 }}
        />
      </div>

      <Props
        pattern="northstar"
        palette={DECO}
        seed={seed}
        ground={JET}
        ink={IVORY}
        accent={GOLD}
        style={{ border: `2px solid ${PATINA}` }}
      />
    </AbsoluteFill>
  );
};
