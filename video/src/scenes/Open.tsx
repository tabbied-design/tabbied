import { AbsoluteFill } from 'remotion';
import { C, LogoMark, Wordmark, rise, useRise } from '../brand';

// The mark traces itself, then the word arrives beside it.
export function Open() {
  const draw = useRise(4, 40);
  const word = useRise(30, 22);
  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <LogoMark size={190} draw={draw} />
        <div style={{ ...rise(word, 0), transform: `translateX(${(1 - word) * -24}px)` }}>
          <Wordmark size={176} />
        </div>
      </div>
    </AbsoluteFill>
  );
}
