import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PatternField } from '../PatternField';
import { C, F, LogoMark, Wordmark } from '../brand';
import { data } from '../data';
import { designs } from './designs';
import { Slide, progress } from './kit';

// The mark traces itself on a plate of ground over a quiet, moving field.
export const LOCKUP_FRAMES = 94;

export function Lockup() {
  const frame = useCurrentFrame();
  const { design, palette } = data.motion.outro;
  const plate = progress(frame, 6, 14);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <PatternField
        pattern={designs[design]}
        steps={['lockup-1', 'lockup-2', 'lockup-3'].map((seed) => ({ seed, palette: palette.colors }))}
        hold={26}
        morph={14}
        density={0.35}
      />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '64px 96px 56px',
            borderRadius: 32,
            background: C.bg,
            boxShadow: `0 0 0 1px ${C.rule}`,
            color: C.fg,
            opacity: plate,
            transform: `scale(${0.9 + 0.1 * plate})`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <LogoMark size={130} draw={progress(frame, 14, 26)} />
            <Slide start={28}>
              <Wordmark size={120} />
            </Slide>
          </div>
          <Slide start={40} style={{ marginTop: 34 }}>
            <p style={{ margin: 0, fontFamily: F.mono, fontSize: 30, letterSpacing: '0.08em', color: C.cyan }}>
              tabbied.com
            </p>
          </Slide>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
