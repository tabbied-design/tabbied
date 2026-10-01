import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { damier } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { SIGNAL } from '../palettes';

const [WHITE, BLACK, RED] = SIGNAL.colors;

const CALLS = [
  {
    what: 'PHONES',
    call: 'Little change.',
    why: 'Same rails, same fees, one more middleman.',
    image: 'scissors-card',
    start: 30,
  },
  {
    what: 'PUBLIC MONEY',
    call: 'Pressure on fees.',
    why: 'A digital currency is money, not a loan, so it hits cash and debit first. But every cheap rail gives stores leverage over swipe fees.',
    image: 'digital-coin',
    start: 90,
  },
];

export const Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('verdict', frame, 15);
  const panel = useEntrance(0);
  const punch = useEntrance(190);

  return (
    <AbsoluteFill style={{ background: WHITE }}>
      <div
        style={{
          position: 'absolute',
          left: 1380,
          top: 0,
          width: 540,
          height: 1080,
          clipPath: `inset(${(1 - panel) * 100}% 0 0 0)`,
        }}
      >
        <Pattern pattern={damier} palette={SIGNAL.colors} density={0.45} seed={seed} />
      </div>

      <div style={{ position: 'absolute', left: 110, top: 80, width: 1180 }}>
        <Words
          text="So, will credit cards survive?"
          start={2}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 76, color: BLACK }}
        />
        {CALLS.map((item) => {
          const enter = interpolate(frame, [item.start, item.start + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={item.what}
              style={{
                display: 'flex',
                gap: 36,
                alignItems: 'center',
                marginTop: 26,
                padding: '20px 28px',
                border: `3px solid ${BLACK}`,
                opacity: enter,
                transform: `translateX(${(1 - enter) * -40}px)`,
              }}
            >
              <Tinted
                src={`credit-cards/${item.image}`}
                tones={[BLACK, RED, WHITE]}
                style={{ width: 170, height: 130, objectFit: 'contain', flex: '0 0 170px' }}
              />
              <div>
                <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 24, letterSpacing: 4, color: RED }}>
                  {item.what}
                </div>
                <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 46, color: BLACK }}>{item.call}</div>
                <Words
                  text={item.why}
                  start={item.start + 8}
                  stagger={1}
                  style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 31, lineHeight: 1.26, color: BLACK }}
                />
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 30,
            padding: '22px 28px',
            background: BLACK,
            color: WHITE,
            opacity: punch,
            transform: `translateY(${(1 - punch) * 30}px)`,
          }}
        >
          <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, lineHeight: 1.2 }}>
            Credit cards sell borrowing and rewards, and those stay. But swipe fees pay for your 1.5%:{' '}
            <span style={{ color: RED }}>watch the fee, not the plastic.</span>
          </div>
        </div>
      </div>

      <Props
        pattern="damier"
        palette={SIGNAL}
        seed={seed}
        start={40}
        ground={BLACK}
        ink={WHITE}
        accent={RED}
        style={{ left: 'auto', right: 56 }}
      />
    </AbsoluteFill>
  );
};
