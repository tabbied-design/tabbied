import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { tidering } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { DISPLAY, MONO } from '../../fonts';
import { VOLTAGE } from '../palettes';

const [NIGHT, BLUE, CYAN, ICE] = VOLTAGE.colors;

// The phone picture is 851 x 1407; its screen sits inside this box.
const PHONE_H = 940;
const SCALE = PHONE_H / 1407;
const SCREEN = { left: 274 * SCALE, top: 66 * SCALE, width: 392 * SCALE, height: 852 * SCALE };

const RAILS = ['PHONE', 'TOKEN', 'VISA / MASTERCARD', 'YOUR BANK'];

export const Phones: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('phones', frame, 6);
  const phone = useEntrance(0, 15);

  return (
    <AbsoluteFill style={{ background: NIGHT }}>
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 110,
          width: 851 * SCALE,
          height: PHONE_H,
          transform: `translateY(${(1 - phone) * 1100}px)`,
        }}
      >
        <Tinted src="credit-cards/phone" tones={[NIGHT, BLUE, ICE]} style={{ height: PHONE_H }} />
        <div
          style={{
            position: 'absolute',
            ...SCREEN,
            borderRadius: 34,
            overflow: 'hidden',
          }}
        >
          <Pattern pattern={tidering} palette={VOLTAGE.colors} density={0.6} seed={seed} />
        </div>
      </div>

      <div style={{ position: 'absolute', left: 860, top: 110, width: 960 }}>
        <Words
          text="Phones replace the plastic, not the plumbing."
          start={6}
          highlight={{ plumbing: CYAN }}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 80, lineHeight: 1.04, color: ICE }}
        />
        <Words
          text="Apple Pay and Google Pay store a token in place of your card number."
          start={30}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 40, lineHeight: 1.25, color: ICE, marginTop: 30 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 34 }}>
          {RAILS.map((rail, index) => {
            const on = interpolate(frame, [62 + index * 10, 70 + index * 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={rail} style={{ display: 'flex', alignItems: 'center', opacity: on }}>
                {index > 0 ? <div style={{ width: 34, height: 4, background: CYAN }} /> : null}
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 600,
                    fontSize: 22,
                    padding: '10px 14px',
                    border: `2px solid ${CYAN}`,
                    color: CYAN,
                    borderRadius: 6,
                  }}
                >
                  {rail}
                </span>
              </div>
            );
          })}
        </div>
        <Words
          text="The payment still runs on the card network, and your bank still earns its fee."
          start={104}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 40, lineHeight: 1.25, color: ICE, marginTop: 30 }}
        />
        <Words
          text="Apple reportedly takes about 0.15% of each credit purchase from the bank: a new middleman, the same economics."
          start={160}
          stagger={2}
          highlight={{ '0.15%': CYAN }}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, lineHeight: 1.25, color: ICE, marginTop: 26 }}
        />
      </div>

      <Props
        pattern="tidering"
        palette={VOLTAGE}
        seed={seed}
        start={50}
        ground={NIGHT}
        ink={ICE}
        accent={CYAN}
        style={{ left: 'auto', right: 56, border: `2px solid ${BLUE}` }}
      />
    </AbsoluteFill>
  );
};
