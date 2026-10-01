import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { midnightblossoms } from 'tabbied/patterns';
import { Pattern, beatSeed } from '../components/Pattern';
import { Tinted } from '../components/Tinted';
import { Props, Typed, Words, useEntrance } from '../components/Type';
import { DISPLAY, MONO, SERIF } from '../fonts';
import { NOCTURNE } from '../palettes';

const [NIGHT, DUSK, VIOLET, LAVENDER] = NOCTURNE.colors;

export const Bug: React.FC = () => {
  const frame = useCurrentFrame();
  // A fast reseed, so the field flutters like a swarm.
  const seed = beatSeed('1947', frame, 4);
  const page = useEntrance(12, 16);
  const moth = useEntrance(30, 10);
  const tilt = interpolate(page, [0, 1], [12, -3]);

  return (
    <AbsoluteFill style={{ background: NIGHT }}>
      <Pattern pattern={midnightblossoms} palette={NOCTURNE.colors} density={0.4} seed={seed} />

      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 110,
          width: 760,
          padding: '44px 52px 50px',
          background: NIGHT,
        }}
      >
        <Words
          text="1947"
          start={2}
          style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 200, lineHeight: 0.9, color: LAVENDER }}
        />
        <Words
          text="Her team pulls a moth out of a relay in the Mark II and tapes it into the logbook."
          start={12}
          stagger={2}
          style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 46, lineHeight: 1.22, color: LAVENDER, marginTop: 26 }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 150,
          width: 820,
          height: 780,
          padding: '56px 60px',
          background: LAVENDER,
          color: NIGHT,
          transform: `translateY(${(1 - page) * 900}px) rotate(${tilt}deg)`,
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5)',
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 63px, ${VIOLET}55 63px 65px)`,
        }}
      >
        <Typed
          text={'9/9   1545   Relay #70 Panel F\n             (moth) in relay.'}
          start={34}
          perChar={0.7}
          cursor={DUSK}
          style={{ fontFamily: MONO, fontSize: 30, lineHeight: '64px' }}
        />
        <Tinted
          src="moth"
          tones={[NIGHT, VIOLET, LAVENDER]}
          style={{
            position: 'absolute',
            left: 150,
            top: 200,
            width: 520,
            transform: `scale(${interpolate(moth, [0, 1], [1.6, 1])}) rotate(${interpolate(moth, [0, 1], [-30, 4])}deg)`,
            opacity: moth,
          }}
        />
        <Words
          text="First actual case of bug being found."
          start={80}
          stagger={3}
          style={{
            position: 'absolute',
            left: 60,
            right: 40,
            bottom: 70,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 64,
            lineHeight: 1.05,
            color: DUSK,
          }}
        />
      </div>

      <Props
        pattern="midnightblossoms"
        palette={NOCTURNE}
        seed={seed}
        ground={NIGHT}
        ink={LAVENDER}
        accent={VIOLET}
      />
    </AbsoluteFill>
  );
};
