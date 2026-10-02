import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PatternField } from '../PatternField';
import { C, F } from '../brand';
import { data } from '../data';
import { designs } from './designs';
import { COUNT_LAST_SEED } from './Count';
import { BarWipe, Slide, Tag, barWipeCoveredAt, display } from './kit';

// The field the count zoomed into, recolored three times. Each new palette
// arrives as bars of its own colors sweeping over the frame, and the field
// underneath is swapped while they cover it.
export const WIPES = [18, 44, 70];
export const PALETTES_FRAMES = 130;

export function Palettes() {
  const frame = useCurrentFrame();
  const { design, palettes } = data.motion.count;
  const index = WIPES.filter((start) => frame >= barWipeCoveredAt(start)).length;
  const palette = palettes[index];
  const nameFrom = index === 0 ? 10 : barWipeCoveredAt(WIPES[index - 1]) + 2;
  return (
    <AbsoluteFill>
      <PatternField
        key={index}
        pattern={designs[design]}
        steps={[{ seed: COUNT_LAST_SEED, palette: palette.colors }]}
        hold={1}
        morph={1}
        loop={false}
        density={0.3}
      />
      {WIPES.map((start, i) => (
        <BarWipe key={start} start={start} colors={palettes[i + 1].colors} />
      ))}
      <Tag start={4} style={{ left: 110, top: 690 }}>
        <h1 style={{ ...display, fontSize: 150 }}>Any palette.</h1>
      </Tag>
      <Tag start={10} style={{ left: 110, top: 880 }} padding="12px 26px 16px">
        <Slide key={index} start={nameFrom}>
          <p style={{ margin: 0, fontFamily: F.mono, fontSize: 30, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <span style={{ color: C.fg }}>{palette.name}</span>
            <span style={{ color: C.dim }}> / {data.counts.palettes} in the library</span>
          </p>
        </Slide>
      </Tag>
    </AbsoluteFill>
  );
}
