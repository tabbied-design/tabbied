import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { halftone } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, SERIF } from '../../fonts';
import { LETTERPRESS } from '../palettes';

const [PAPER, INK, GREY, RED] = LETTERPRESS.colors;

export const Quote: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('quote', frame, 30);
  const disc = useEntrance(0, 18);
  const sign = useEntrance(96);

  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 120,
          width: 760,
          height: 760,
          borderRadius: '50%',
          overflow: 'hidden',
          transform: `scale(${disc})`,
        }}
      >
        <Pattern pattern={halftone} palette={LETTERPRESS.colors} density={0.45} seed={seed} />
      </div>
      <Tinted
        src="grace-hopper/hopper"
        tones={[INK, RED, PAPER]}
        style={{
          position: 'absolute',
          left: 160,
          bottom: 0,
          height: 930,
          transform: `translateY(${interpolate(disc, [0, 1], [300, 0])}px)`,
        }}
      />

      <div style={{ position: 'absolute', left: 960, top: 170, width: 860 }}>
        <Words
          text={'"The most dangerous phrase in the language is, \'We\'ve always done it this way.\'"'}
          start={12}
          stagger={3}
          style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 92, lineHeight: 1.04, color: INK }}
        />
        <div
          style={{
            marginTop: 50,
            fontFamily: MONO,
            fontWeight: 600,
            fontSize: 30,
            letterSpacing: 4,
            color: RED,
            opacity: sign,
            transform: `translateX(${(1 - sign) * 30}px)`,
          }}
        >
          GRACE HOPPER
        </div>
      </div>

      <Props
        pattern="halftone"
        palette={LETTERPRESS}
        seed={seed}
        start={20}
        ground={INK}
        ink={PAPER}
        accent={RED}
        style={{ left: 'auto', right: 56 }}
      />
    </AbsoluteFill>
  );
};
