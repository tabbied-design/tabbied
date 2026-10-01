import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { gravure } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../components/Pattern';
import { Tinted } from '../components/Tinted';
import { Props, Typed, Words, useEntrance } from '../components/Type';
import { DISPLAY, MONO } from '../fonts';
import { FORMICA } from '../palettes';

const [LAMINATE, TEAL, MUSTARD, INK] = FORMICA.colors;

const PROGRAM = [
  'MULTIPLY PRICE BY QUANTITY',
  '    GIVING TOTAL.',
  'ADD TOTAL TO DAILY-SALES.',
  'DISPLAY "TOTAL: " TOTAL.',
].join('\n');

export const Cobol: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('1959', frame, 8);
  const band = useEntrance(0);
  const cards = useEntrance(20, 14);
  const sheet = useEntrance(30);
  const marker = useEntrance(62);

  return (
    <AbsoluteFill style={{ background: LAMINATE }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: 330,
          clipPath: `inset(0 ${(1 - band) * 100}% 0 0)`,
        }}
      >
        <Pattern pattern={gravure} palette={FORMICA.colors} density={0.7} seed={seed} />
      </div>

      <div style={{ position: 'absolute', left: 110, top: 390, width: 820 }}>
        <Words
          text="1959"
          start={6}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 180, lineHeight: 0.9, color: TEAL }}
        />
        <Words
          text="Her FLOW-MATIC becomes the backbone of COBOL: business programs written in English words."
          start={16}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 46, lineHeight: 1.22, color: INK, marginTop: 26 }}
        />
        <Words
          text="It still runs banks and governments today."
          start={66}
          stagger={2}
          style={{
            display: 'inline-block',
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 40,
            color: INK,
            marginTop: 26,
            padding: '4px 12px',
            // A highlighter pass that lands just ahead of the words.
            background: `linear-gradient(${MUSTARD}, ${MUSTARD}) no-repeat 0 0 / ${marker * 100}% 100%`,
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1000,
          top: 470,
          width: 820,
          padding: '40px 44px',
          background: INK,
          color: LAMINATE,
          borderRadius: 8,
          transform: `translateY(${(1 - sheet) * 120}px)`,
          opacity: sheet,
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 22, color: MUSTARD, marginBottom: 18 }}>
          PROCEDURE DIVISION.
        </div>
        <Typed
          text={PROGRAM}
          start={36}
          perChar={0.9}
          cursor={TEAL}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 34, lineHeight: 1.45 }}
        />
      </div>

      <Tinted
        src="punch-cards"
        tones={[INK, TEAL, LAMINATE]}
        style={{
          position: 'absolute',
          right: 120,
          top: 70,
          width: 330,
          transform: `translateY(${interpolate(cards, [0, 1], [-500, 0])}px) rotate(${interpolate(cards, [0, 1], [-40, 12])}deg)`,
          filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.35))',
        }}
      />

      <Props
        pattern="gravure"
        palette={FORMICA}
        seed={seed}
        ground={INK}
        ink={LAMINATE}
        accent={MUSTARD}
      />
    </AbsoluteFill>
  );
};
