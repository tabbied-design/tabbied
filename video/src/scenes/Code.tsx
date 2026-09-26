import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { patterns } from 'tabbied/patterns';
import { PatternField } from '../PatternField';
import { C, Eyebrow, rise, title, useRise } from '../brand';
import { CodePanel } from '../ui';

// The docs page's first example (app/docs/react/page.tsx), shortened and typed
// out, beside the pattern it draws: radius at seed k9Pz, as the code says.
const CODE = `import { TabbiedPattern } from 'tabbied/react';
import { radius } from 'tabbied/patterns';

export function Banner() {
  return <TabbiedPattern pattern={radius} seed="k9Pz" />;
}`;
const TYPE_FROM = 8;
const PER_FRAME = 4;

export function Code() {
  const frame = useCurrentFrame();
  const text = useRise(0);
  const panel = useRise(2, 14);
  const chars = Math.max(0, Math.floor((frame - TYPE_FROM) * PER_FRAME));
  const done = TYPE_FROM + CODE.length / PER_FRAME;
  const art = interpolate(frame, [done, done + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', left: 110, top: 110, ...rise(text) }}>
        <Eyebrow>For developers</Eyebrow>
        <h2 style={{ ...title, fontSize: 76, marginTop: 22 }}>npm install tabbied</h2>
      </div>
      <CodePanel
        title="Banner.tsx"
        code={CODE}
        chars={chars}
        caret={frame < done + 24 && Math.floor(frame / 12) % 2 === 0}
        style={{ left: 110, top: 360, width: 1080, ...rise(panel) }}
      />
      <div
        style={{
          position: 'absolute',
          left: 1250,
          top: 250,
          width: 560,
          height: 580,
          borderRadius: 24,
          overflow: 'hidden',
          opacity: art,
          transform: `scale(${0.92 + art * 0.08})`,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        <PatternField pattern={patterns.radius} steps={[{ seed: 'k9Pz' }]} hold={1000} morph={1} loop={false} density={0.3} />
      </div>
    </AbsoluteFill>
  );
}
