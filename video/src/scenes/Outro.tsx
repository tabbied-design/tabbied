import { AbsoluteFill } from 'remotion';
import { patterns } from 'tabbied/patterns';
import { PatternField } from '../PatternField';
import { C, F, LogoMark, Wordmark, body, rise, useRise } from '../brand';
import { palette } from '../data';

// The lockup and the address, over a field that keeps moving.
export function Outro() {
  const field = useRise(0, 30);
  const lockup = useRise(10);
  const line = useRise(22);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ opacity: field * 0.5 }}>
        <PatternField
          pattern={patterns.veil}
          steps={['o1', 'o2', 'o3'].map((seed) => ({ seed, palette: palette('lib-neon') }))}
          hold={34}
          morph={18}
          density={0.35}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse at center, ${C.bg} 0%, ${C.bg}f2 34%, ${C.bg}66 100%)` }}
      />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', color: C.fg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, ...rise(lockup) }}>
          <LogoMark size={130} />
          <Wordmark size={120} />
        </div>
        <p style={{ ...body, color: C.fg, marginTop: 40, ...rise(line) }}>Free patterns and websites, yours to shape.</p>
        <p style={{ fontFamily: F.mono, fontSize: 30, color: C.cyan, letterSpacing: '0.08em', marginTop: 22, ...rise(line) }}>
          tabbied.com
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
