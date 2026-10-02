import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { roundstep } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../../components/Pattern';
import { Tinted } from '../../components/Tinted';
import { Props, Words, useEntrance } from '../../components/Type';
import { MONO, ROUNDED } from '../../fonts';
import { FERN } from '../palettes';

const [MINT_WHITE, GREEN, MINT, FOREST] = FERN.colors;

// Vancouver Island marmots in the wild: fewer than 30 in 2003, and 427 going
// into the winter of 2025 (Marmot Recovery Foundation).
const THEN = 30;
const NOW = 427;
const BASELINE = 920;
const MAX_H = 420;
const BAR_W = 230;
const height = (count: number) => (MAX_H * count) / NOW;

const PUP_H = 260;
const PUP_W = Math.round((PUP_H * 601) / 942);

/** A bar filled with the pattern, revealed from the baseline. */
const Bar: React.FC<{
  left: number;
  count: number;
  grow: number;
  seed: string;
  year: string;
  label: string;
  /** Where the count sits: over the bar, or beside its top (the pup sits on it). */
  labelBeside?: boolean;
}> = ({ left, count, grow, seed, year, label, labelBeside }) => {
  const h = height(count);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left,
          top: BASELINE - h,
          width: BAR_W,
          height: h,
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          clipPath: `inset(${(1 - grow) * 100}% 0 0 0 round 24px 24px 0 0)`,
        }}
      >
        <Pattern pattern={roundstep} palette={FERN.colors} density={0.8} seed={seed} />
      </div>
      <div
        style={{
          position: 'absolute',
          left,
          width: BAR_W,
          top: BASELINE + 16,
          textAlign: 'center',
          fontFamily: MONO,
          fontWeight: 600,
          fontSize: 34,
          color: FOREST,
          opacity: Math.min(1, grow * 3),
        }}
      >
        {year}
      </div>
      <div
        style={{
          position: 'absolute',
          left: labelBeside ? left + BAR_W + 24 : left - 40,
          width: labelBeside ? undefined : BAR_W + 80,
          top: BASELINE - h * grow - (labelBeside ? 20 : 96),
          textAlign: labelBeside ? 'left' : 'center',
          fontFamily: ROUNDED,
          fontWeight: 700,
          fontSize: 72,
          color: FOREST,
          fontVariantNumeric: 'tabular-nums',
          opacity: Math.min(1, grow * 3),
        }}
      >
        {label}
      </div>
    </>
  );
};

export const Comeback: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = beatSeed('comeback', frame, 16);
  const then = interpolate(frame, [56, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const now = interpolate(frame, [204, 262], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const panel = useEntrance(6, 16);
  const card = useEntrance(262, 14);
  const pup = useEntrance(196, 12);
  const count = Math.round(now * NOW);
  const nowTop = BASELINE - height(NOW) * now;

  return (
    <AbsoluteFill style={{ background: MINT_WHITE }}>
      <div
        style={{
          position: 'absolute',
          left: 1240,
          top: 0,
          width: 680,
          height: 1080,
          clipPath: `inset(0 0 0 ${(1 - panel) * 100}%)`,
        }}
      >
        <Pattern pattern={roundstep} palette={FERN.colors} density={0.35} seed={seed} />
      </div>

      <div style={{ position: 'absolute', left: 110, top: 80, width: 1080 }}>
        <Words
          text="THE VANCOUVER ISLAND MARMOT"
          start={6}
          stagger={2}
          style={{ fontFamily: MONO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: GREEN }}
        />
        <Words
          text="Found nowhere else on Earth."
          start={14}
          stagger={2}
          style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 70, lineHeight: 1.05, color: FOREST, marginTop: 8 }}
        />
      </div>

      <div style={{ position: 'absolute', left: 150, top: BASELINE, width: 900, height: 6, background: FOREST }} />
      <Bar left={240} count={THEN} grow={then} seed={`${seed}-then`} year="2003" label="under 30" />
      <Bar left={700} count={NOW} grow={now} seed={`${seed}-now`} year="2025" label={String(count)} labelBeside />

      {/* The pup rides the bar up. */}
      <Tinted
        src="marmots/pup"
        tones={[FOREST, GREEN, MINT_WHITE]}
        style={{
          position: 'absolute',
          left: 700 + (BAR_W - PUP_W) / 2,
          top: nowTop - PUP_H + 4,
          height: PUP_H,
          transformOrigin: '50% 100%',
          transform: `translateY(${(1 - pup) * 400}px)`,
          opacity: pup,
          filter: 'drop-shadow(0 16px 24px rgba(27, 67, 50, 0.35))',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 1310,
          top: 330,
          width: 540,
          padding: '34px 40px 38px',
          borderRadius: 30,
          background: MINT_WHITE,
          boxShadow: '0 30px 70px rgba(27, 67, 50, 0.35)',
          transform: `translateX(${(1 - card) * 700}px)`,
        }}
      >
        <div style={{ fontFamily: ROUNDED, fontWeight: 700, fontSize: 64, lineHeight: 1.05, color: FOREST }}>
          From under 30 to 427
        </div>
        <div style={{ fontFamily: ROUNDED, fontWeight: 500, fontSize: 34, lineHeight: 1.3, color: GREEN, marginTop: 16 }}>
          bred in zoos, released, and now living in 35 colonies
        </div>
        <div style={{ fontFamily: MONO, fontSize: 20, color: GREEN, marginTop: 22 }}>
          Marmot Recovery Foundation, 2025 count
        </div>
      </div>

      <Props
        pattern="roundstep"
        palette={FERN}
        seed={seed}
        start={40}
        ground={FOREST}
        ink={MINT_WHITE}
        accent={MINT}
      />
    </AbsoluteFill>
  );
};
