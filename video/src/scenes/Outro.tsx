import { AbsoluteFill } from 'remotion';
import { patterns } from 'tabbied/patterns';
import { PatternField } from '../PatternField';
import { C, F, LogoMark, Wordmark, rise, useRise } from '../brand';
import { data } from '../data';

// The lockup and the address on a plate of the page's own ground, over a field
// in a quiet palette that keeps rearranging behind it.
export function Outro() {
  const field = useRise(0, 16);
  const plate = useRise(4);
  const address = useRise(12);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ opacity: field }}>
        <PatternField
          pattern={patterns.veil}
          steps={['o1', 'o2', 'o3'].map((seed) => ({ seed, palette: data.outro.colors }))}
          hold={22}
          morph={14}
          density={0.35}
        />
      </AbsoluteFill>
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
            ...rise(plate, 24),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <LogoMark size={130} />
            <Wordmark size={120} />
          </div>
          <p
            style={{
              margin: '34px 0 0',
              fontFamily: F.mono,
              fontSize: 30,
              letterSpacing: '0.08em',
              color: C.cyan,
              ...rise(address, 12),
            }}
          >
            tabbied.com
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
