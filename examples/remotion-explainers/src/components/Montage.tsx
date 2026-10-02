import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { PatternDefinition } from 'tabbied';
import { DISPLAY, MONO } from '../fonts';
import type { Palette } from '../palettes';
import { Pattern, beatSeed } from './Pattern';
import { useEntrance } from './Type';

const COLUMNS = 4;
const TILE_W = 444;
const TILE_H = 252;
const GAP = 16;
const GRID_W = COLUMNS * TILE_W + (COLUMNS - 1) * GAP;
const GRID_H = 4 * TILE_H + 3 * GAP;
const GROUND = '#0d0d12';
const WHITE = '#f5f5f5';

/**
 * The closing wall: sixteen designs, each walking through the palettes on
 * its own beat, then a card with the code that drew the film. A snippet line
 * alternates plain and highlighted parts, starting plain.
 */
export const Montage: React.FC<{
  designs: PatternDefinition[];
  palettes: Palette[];
  snippet: string[][];
  stats: string;
  accent: string;
  highlight: string;
  card?: number;
}> = ({ designs, palettes, snippet, stats, accent, highlight, card: cardStart = 62 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const card = useEntrance(cardStart, 18);
  const fade = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: GROUND, opacity: fade }}>
      <div
        style={{
          position: 'absolute',
          left: (1920 - GRID_W) / 2,
          top: (1080 - GRID_H) / 2,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLUMNS}, ${TILE_W}px)`,
          gap: GAP,
        }}
      >
        {designs.map((design, index) => {
          // Offset beats, so the wall never changes all at once.
          const beat = Math.floor((frame + index * 5) / 14);
          const palette = palettes[(index + beat) % palettes.length];
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
        <div style={{ fontFamily: MONO, fontSize: 26, color: accent, letterSpacing: 3 }}>
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
          {snippet.map((line, row) => (
            <div key={row}>
              {line.map((part, column) => (
                <span key={column} style={{ color: column % 2 ? highlight : WHITE }}>
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
          <span>{stats}</span>
          <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, color: accent }}>tabbied.com</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
