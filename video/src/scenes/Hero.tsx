import { AbsoluteFill } from 'remotion';
import { patterns } from 'tabbied/patterns';
import { PatternField } from '../PatternField';
import { C, GRADIENT, GradientText, body, rise, title, useRise } from '../brand';
import { data, palette } from '../data';

// The homepage's promise, beside a field that keeps rearranging itself.
export function Hero() {
  // After the cross-fade from the logo, so the two never overlap.
  const line1 = useRise(16);
  const line2 = useRise(24);
  const lede = useRise(38);
  const card = useRise(10, 30);
  const neon = palette('lib-neon');
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', left: 128, top: 300, width: 1110 }}>
        <h1 style={{ ...title, fontSize: 92 }}>
          <div style={rise(line1)}>
            <GradientText gradient={GRADIENT.patterns}>Free patterns</GradientText> and
          </div>
          <div style={rise(line2)}>
            <GradientText gradient={GRADIENT.sites}>websites</GradientText>, yours to shape.
          </div>
        </h1>
        <p style={{ ...body, marginTop: 44, width: 760, ...rise(lede) }}>
          Explore a growing library of {data.counts.patterns} customizable patterns and{' '}
          {data.counts.templates} free website templates, ready to edit, download, and use.
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 128,
          top: 150,
          width: 540,
          height: 780,
          borderRadius: 28,
          overflow: 'hidden',
          opacity: card,
          transform: `scale(${0.94 + card * 0.06})`,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        <PatternField
          pattern={patterns.radius}
          steps={['h1', 'h2', 'h3', 'h4'].map((seed) => ({ seed, palette: neon }))}
          hold={26}
          morph={18}
          density={0.2}
        />
      </div>
    </AbsoluteFill>
  );
}
