import type { PatternDefinition } from 'tabbied';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { chain, mixtape, terrain } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { palette } from '../../palettes';
import { PRIMARY } from '../palettes';

const [CHALK, RED, NAVY, YELLOW, TEAL] = PRIMARY.colors;
const GREY = '#6b7280';

// Each bar is filled with a design in Primary's colors, its party's color as
// the ground.
const ISSUER = palette('Issuer', RED, CHALK, NAVY, YELLOW);
const NETWORK = palette('Network', NAVY, YELLOW, CHALK, TEAL);
const PROCESSOR = palette('Processor', TEAL, CHALK, NAVY, YELLOW);

// Bars share one axis: the whole $2.40 is BAR_MAX px.
const BAR_MAX = 1180;
const TOTAL = 2.4;

type Share = {
  amount: number;
  fee: string;
  who: string;
  names: string;
  image: string;
  design: PatternDefinition;
  slug: string;
  colors: ReturnType<typeof palette>;
  start: number;
};

const SHARES: Share[] = [
  {
    amount: 2.0,
    fee: 'INTERCHANGE',
    who: 'Your bank, the card issuer',
    names: 'Chase, Citi, Capital One ...',
    image: 'bank',
    design: mixtape,
    slug: 'mixtape',
    colors: ISSUER,
    start: 40,
  },
  {
    amount: 0.14,
    fee: 'NETWORK FEE',
    who: 'The card network',
    names: 'Visa, Mastercard',
    image: 'toll-booth',
    design: chain,
    slug: 'chain',
    colors: NETWORK,
    start: 100,
  },
  {
    amount: 0.26,
    fee: 'PROCESSING',
    who: "The store's payment processor",
    names: 'Fiserv, Stripe, Square ...',
    image: 'terminal',
    design: terrain,
    slug: 'terrain',
    colors: PROCESSOR,
    start: 160,
  },
];

const Row: React.FC<{ share: Share; top: number; seed: string }> = ({ share, top, seed }) => {
  const frame = useCurrentFrame();
  const enter = useEntrance(share.start);
  const fill = interpolate(frame, [share.start + 6, share.start + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const width = Math.max(56, (share.amount / TOTAL) * BAR_MAX);

  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        top,
        width: 1700,
        height: 220,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -60}px)`,
      }}
    >
      <Tinted
        src={`credit-cards/${share.image}`}
        tones={[NAVY, share.colors.colors[0], CHALK]}
        style={{ position: 'absolute', left: 0, top: 10, width: 170, height: 150, objectFit: 'contain' }}
      />
      <div
        style={{
          position: 'absolute',
          left: 210,
          top: 0,
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 92,
          lineHeight: 1,
          color: share.colors.colors[0],
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        ${share.amount.toFixed(2)}
      </div>
      <div style={{ position: 'absolute', left: 520, top: 4 }}>
        <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 24, letterSpacing: 4, color: share.colors.colors[0] }}>
          {share.fee}
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, color: NAVY, marginTop: 4 }}>{share.who}</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 30, color: GREY, marginTop: 2 }}>{share.names}</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 150,
          width,
          height: 56,
          borderRadius: 6,
          overflow: 'hidden',
          clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
        }}
      >
        <Pattern pattern={share.design} palette={share.colors.colors} density={0.85} seed={seed} />
      </div>
    </div>
  );
};

export const Split: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('split', frame, 10);
  const note = useEntrance(30);

  return (
    <AbsoluteFill style={{ background: CHALK }}>
      <Words
        text="Where the $2.40 goes"
        start={4}
        highlight={{ '$2.40': RED }}
        style={{
          position: 'absolute',
          left: 110,
          top: 70,
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 96,
          color: NAVY,
        }}
      />
      {SHARES.map((share, index) => (
        <Row key={share.fee} share={share} top={240 + index * 240} seed={`${seed}-${index}`} />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 186,
          fontFamily: MONO,
          fontSize: 22,
          color: GREY,
          opacity: note,
        }}
      >
        Typical U.S. rewards credit card. Real rates vary by card, store and sale.
      </div>
      <Props
        pattern="mixtape"
        palette={ISSUER}
        seed={`${seed}-0`}
        start={60}
        ground={NAVY}
        ink={CHALK}
        accent={YELLOW}
      />
    </AbsoluteFill>
  );
};
