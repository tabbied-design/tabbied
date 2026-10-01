import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { hilbert } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../components/Pattern';
import { Tinted } from '../components/Tinted';
import { Props, Words, useEntrance } from '../components/Type';
import { DISPLAY, MONO, SERIF } from '../fonts';
import { RISOGRAPH } from '../palettes';

const [PAPER, RED, TEAL, YELLOW, INK] = RISOGRAPH.colors;
// The field steps from coarse to fine as the scene runs: `density` is a prop
// like any other, so it can be keyed to the frame too.
const STEPS = [0.15, 0.4, 0.65, 0.9];

export const Compiler: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('1952', frame, 20);
  const density = STEPS[Math.min(STEPS.length - 1, Math.floor(frame / 24))];
  const panel = useEntrance(0);
  const reel = useEntrance(14, 14);

  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <div
        style={{
          position: 'absolute',
          left: 1000,
          top: 0,
          width: 920,
          height: 1080,
          clipPath: `inset(${(1 - panel) * 100}% 0 0 0)`,
        }}
      >
        <Pattern pattern={hilbert} palette={RISOGRAPH.colors} density={density} seed={seed} />
      </div>
      <Tinted
        src="tape-reel"
        tones={[INK, TEAL, PAPER]}
        style={{
          position: 'absolute',
          left: 1110,
          top: 210,
          width: 660,
          transform: `rotate(${interpolate(reel, [0, 1], [-200, 0]) - frame * 0.6}deg) scale(${reel})`,
          filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.35))',
        }}
      />

      <div style={{ position: 'absolute', left: 110, top: 140, width: 800 }}>
        <Words
          text="1952"
          start={4}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 200, lineHeight: 0.9, color: RED }}
        />
        <Words
          text="She builds A-0, one of the first compilers: a program that writes programs."
          start={14}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, lineHeight: 1.18, color: INK, marginTop: 28 }}
        />
        <div style={{ borderLeft: `6px solid ${YELLOW}`, paddingLeft: 28, marginTop: 44 }}>
          <Words
            text={'"Nobody would touch it. They told me computers could only do arithmetic."'}
            start={50}
            stagger={2}
            style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 50, lineHeight: 1.12, color: INK }}
          />
        </div>
      </div>

      <Props
        pattern="hilbert"
        palette={RISOGRAPH}
        seed={seed}
        extra={`density={${density}}`}
        ground={INK}
        ink={PAPER}
        accent={YELLOW}
      />
    </AbsoluteFill>
  );
};
