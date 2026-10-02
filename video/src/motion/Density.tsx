import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PatternField } from '../PatternField';
import { C, F } from '../brand';
import { data } from '../data';
import { designs } from './designs';
import { GridWipe, Tag, display, progress } from './kit';

// One design, one seed, four densities side by side: panels rise over the
// palette beat, a label each, then the grid closes.
const DENSITIES = [0.1, 0.4, 0.7, 1];
const GAP = 10;
const PANEL = (1920 - GAP * (DENSITIES.length - 1)) / DENSITIES.length;
export const DENSITY_FRAMES = 90;

export function Density() {
  const frame = useCurrentFrame();
  const { design, palette } = data.motion.density;
  return (
    <AbsoluteFill>
      {DENSITIES.map((density, i) => {
        const t = progress(frame, i * 3, 14);
        return (
          <div
            key={density}
            style={{
              position: 'absolute',
              left: i * (PANEL + GAP),
              top: 0,
              width: PANEL + (i > 0 ? GAP : 0),
              marginLeft: i > 0 ? -GAP : 0,
              height: 1080,
              background: C.bg,
              transform: `translateY(${(1 - t) * 1080}px)`,
            }}
          >
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: PANEL, overflow: 'hidden' }}>
              <PatternField
                pattern={designs[design]}
                steps={[{ seed: 'density', palette: palette.colors }]}
                hold={1}
                morph={1}
                loop={false}
                density={density}
              />
              <Tag start={18 + i * 3} style={{ left: 28, bottom: 36 }} padding="10px 20px 14px">
                <span style={{ fontFamily: F.mono, fontSize: 28, letterSpacing: '0.08em', color: C.fg }}>
                  density {density.toFixed(1)}
                </span>
              </Tag>
            </div>
          </div>
        );
      })}
      <Tag start={22} style={{ left: 110, top: 100 }}>
        <h1 style={{ ...display, fontSize: 150 }}>Any density.</h1>
      </Tag>
      <GridWipe start={DENSITY_FRAMES - 18} duration={18} mode="cover" />
    </AbsoluteFill>
  );
}
