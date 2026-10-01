import type { CSSProperties } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { MONO } from '../fonts';
import type { Palette } from '../palettes';

/** How far a spring that starts at `start` has come by this frame (0 to 1). */
export const useEntrance = (start: number, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - start, fps, config: { damping } });
};

/** Words that rise into place one after another, each from behind a mask. */
export const Words: React.FC<{
  text: string;
  start?: number;
  stagger?: number;
  style?: CSSProperties;
}> = ({ text, start = 0, stagger = 3, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={style}>
      {text.split(' ').map((word, index) => {
        const progress = spring({
          frame: frame - start - index * stagger,
          fps,
          config: { damping: 200 },
        });

        return (
          <span key={index}>
            {index > 0 ? ' ' : null}
            <span
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'top',
                paddingBottom: '0.14em',
                marginBottom: '-0.14em',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${(1 - progress) * 110}%)`,
                }}
              >
                {word}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Text typed out a character at a time, with a block cursor. */
export const Typed: React.FC<{
  text: string;
  start: number;
  perChar?: number;
  style?: CSSProperties;
  cursor?: string;
}> = ({ text, start, perChar = 1.2, style, cursor = 'currentColor' }) => {
  const frame = useCurrentFrame();
  const shown = Math.max(0, Math.min(text.length, Math.floor((frame - start) / perChar)));
  const blink = Math.floor(frame / 8) % 2 === 0;

  return (
    <div style={{ whiteSpace: 'pre', ...style }}>
      {text.slice(0, shown)}
      <span
        style={{
          display: 'inline-block',
          width: '0.6em',
          height: '1.05em',
          verticalAlign: '-0.15em',
          marginLeft: 2,
          background: cursor,
          opacity: frame >= start && (blink || shown < text.length) ? 1 : 0,
        }}
      />
    </div>
  );
};

/**
 * The props behind the pattern on screen, as the JSX that would draw it.
 * The seed ticks along with the frame, which is the point: the picture is a
 * function of these values and nothing else.
 */
export const Props: React.FC<{
  pattern: string;
  palette: Palette;
  seed: string;
  /** Any further props to show, written as JSX attributes. */
  extra?: string;
  start?: number;
  ground: string;
  ink: string;
  accent: string;
  style?: CSSProperties;
}> = ({ pattern, palette, seed, extra, start = 8, ground, ink, accent, style }) => {
  const progress = useEntrance(start);
  const key = palette.name.toUpperCase().replace(/\s+/g, '_');

  return (
    <div
      style={{
        position: 'absolute',
        left: 56,
        bottom: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '14px 22px',
        background: ground,
        color: ink,
        fontFamily: MONO,
        fontSize: 22,
        borderRadius: 6,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [24, 0])}px)`,
        ...style,
      }}
    >
      <span>
        {'<TabbiedPattern pattern={'}
        <span style={{ color: accent }}>{pattern}</span>
        {'} palette={'}
        <span style={{ color: accent }}>{key}</span>
        {'} seed="'}
        <span style={{ color: accent }}>{seed}</span>
        {'"'}
        {extra ? ` ${extra}` : null}
        {' />'}
      </span>
      <span style={{ display: 'flex', gap: 4 }}>
        {palette.colors.map((color) => (
          <span
            key={color}
            style={{
              width: 18,
              height: 18,
              borderRadius: 3,
              background: color,
              boxShadow: `inset 0 0 0 1px ${ink}33`,
            }}
          />
        ))}
      </span>
    </div>
  );
};
