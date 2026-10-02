import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { metro } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { COBALT } from '../palettes';

const [NAVY, BLUE, CYAN, ICE] = COBALT.colors;

const PLAYERS = [
  {
    role: 'THE BANK THAT ISSUES THE CARD',
    names: 'Chase, Citi, Capital One',
    image: 'bank',
    text: 'The biggest share: interest, fees and interchange. Also the risk: unpaid debt, fraud and the rewards bill.',
    start: 30,
  },
  {
    role: 'THE NETWORK',
    names: 'Visa, Mastercard',
    image: 'toll-booth',
    text: "A small toll on every swipe, with no loans to lose. Visa's profit is about half its revenue.",
    start: 110,
  },
  {
    role: 'BOTH IN ONE',
    names: 'American Express, Discover',
    image: 'card',
    text: 'They issue the card and run the network, so they keep nearly all of the fee. Capital One bought Discover in 2025.',
    start: 190,
  },
];

const Player: React.FC<(typeof PLAYERS)[number] & { left: number }> = ({ role, names, image, text, start, left }) => {
  const enter = useEntrance(start, 16);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: 250,
        width: 540,
        height: 700,
        padding: '30px 36px',
        background: NAVY,
        border: `3px solid ${BLUE}`,
        borderRadius: 14,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 120}px)`,
      }}
    >
      <div style={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Tinted
          src={`credit-cards/${image}`}
          tones={[NAVY, BLUE, ICE]}
          style={{ maxWidth: 400, maxHeight: 220, objectFit: 'contain' }}
        />
      </div>
      <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 22, letterSpacing: 3, color: CYAN, marginTop: 18 }}>
        {role}
      </div>
      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, lineHeight: 1.1, color: ICE, marginTop: 8 }}>
        {names}
      </div>
      <Words
        text={text}
        start={start + 14}
        stagger={1}
        style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 32, lineHeight: 1.3, color: ICE, marginTop: 18 }}
      />
    </div>
  );
};

export const WhoProfits: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('profits', frame, 8);

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <Pattern pattern={metro} palette={COBALT.colors} density={0.35} seed={seed} />
      <div style={{ position: 'absolute', left: 110, top: 70, padding: '18px 30px', background: NAVY }}>
        <Words
          text="So who keeps the profit?"
          start={2}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 96, color: ICE }}
        />
      </div>
      {PLAYERS.map((player, index) => (
        <Player key={player.role} {...player} left={110 + index * 580} />
      ))}
      <Props
        pattern="metro"
        palette={COBALT}
        seed={seed}
        start={20}
        ground={NAVY}
        ink={ICE}
        accent={CYAN}
        style={{ border: `2px solid ${BLUE}` }}
      />
    </AbsoluteFill>
  );
};
