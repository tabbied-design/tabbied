import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  bracket,
  capstan,
  cascade,
  coil,
  epicentre,
  flux,
  foliage,
  frond,
  isometry,
  pivot,
  raking,
  spark,
  sunsetrings,
  torsion,
  windowpane,
  ziggurat,
} from 'tabbied/patterns';
import { Pattern, beatSeed } from '../components/Pattern';
import { useEntrance } from '../components/Type';
import { DISPLAY, MONO } from '../fonts';
import { MONTAGE } from '../palettes';

const DESIGNS = [
  windowpane, coil, isometry, epicentre,
  foliage, torsion, cascade, flux,
  bracket, capstan, raking, ziggurat,
  spark, sunsetrings, frond, pivot,
];
const COLUMNS = 4;
const TILE_W = 444;
const TILE_H = 252;
const GAP = 16;
const GRID_W = COLUMNS * TILE_W + (COLUMNS - 1) * GAP;
const GROUND = '#0d0d12';
const WHITE = '#f5f5f5';
const MINT = '#3fffb2';
const PINK = '#ff3d8b';

const SNIPPET = [
  ['const ', 'frame', ' = useCurrentFrame();'],
  ['<TabbiedPattern pattern={', 'gyre', '} palette={', 'GASLIGHT', '}'],
  ['  seed={`1906-${', 'Math.floor(frame / 15)', '}`} />'],
];

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = useEntrance(62, 18);

  return (
    <AbsoluteFill style={{ background: GROUND }}>
      <div
        style={{
          position: 'absolute',
          left: (1920 - GRID_W) / 2,
          top: (1080 - 4 * TILE_H - 3 * GAP) / 2,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLUMNS}, ${TILE_W}px)`,
          gap: GAP,
        }}
      >
        {DESIGNS.map((design, index) => {
          // Each tile walks through the montage palettes on its own beat, so
          // the wall never changes all at once.
          const beat = Math.floor((frame + index * 5) / 14);
          const palette = MONTAGE[(index + beat) % MONTAGE.length];
          const pop = spring({ frame: frame - index * 2, fps, config: { damping: 14 } });
          return (
            <div
              key={design.name}
              style={{
                position: 'relative',
                width: TILE_W,
                height: TILE_H,
                borderRadius: 10,
                overflow: 'hidden',
                transform: `scale(${pop})`,
              }}
            >
              <Pattern
                pattern={design}
                palette={palette.colors}
                density={0.55}
                seed={beatSeed(`tile-${index}`, frame + index * 5, 14)}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 270,
          right: 270,
          top: 250,
          padding: '48px 64px 52px',
          background: GROUND,
          borderRadius: 18,
          boxShadow: '0 40px 120px rgba(0, 0, 0, 0.7)',
          transform: `translateY(${interpolate(card, [0, 1], [700, 0])}px)`,
          color: WHITE,
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 26, color: MINT, letterSpacing: 3 }}>
          MADE WITH TABBIED + REMOTION
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 78, lineHeight: 1.05, marginTop: 14 }}>
          Every frame is a function of its props.
        </div>
        <div
          style={{
            marginTop: 30,
            padding: '24px 30px',
            background: '#17171f',
            borderRadius: 10,
            fontFamily: MONO,
            fontSize: 30,
            lineHeight: 1.5,
            whiteSpace: 'pre',
          }}
        >
          {SNIPPET.map((line, row) => (
            <div key={row}>
              {line.map((part, column) => (
                <span key={column} style={{ color: column % 2 ? PINK : WHITE }}>
                  {part}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: 30,
            fontFamily: MONO,
            fontSize: 26,
            color: '#a5a5b5',
          }}
        >
          <span>25 designs / 21 palettes / 8 GPT Image cut-outs</span>
          <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, color: MINT }}>tabbied.com</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
