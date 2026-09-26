import type { CSSProperties, ReactNode } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/cormorant-garamond/300.css';

// The homepage's dark treatment (components/main-page/home.module.css), which
// is the brand's own: the video reads as the site in motion, not a new look.
export const C = {
  bg: '#0e0e13',
  fg: '#eef0f6',
  mint: '#3fffb2',
  cyan: '#3eecff',
  violet: '#b98aff',
  dim: '#7c808c',
  card: '#15151b',
  rule: 'rgba(255, 255, 255, 0.08)',
};

export const F = {
  sans: '"IBM Plex Sans", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
  word: '"Cormorant Garamond", Georgia, serif',
};

// Every face the video draws, for the font gate in Showcase.
export const FONT_FACES = [
  `400 16px "IBM Plex Sans"`,
  `500 16px "IBM Plex Sans"`,
  `600 16px "IBM Plex Sans"`,
  `400 16px "IBM Plex Mono"`,
  `500 16px "IBM Plex Mono"`,
  `300 16px "Cormorant Garamond"`,
];

// The hero's two gradients: "Free patterns" and "websites".
export const GRADIENT = {
  patterns: `linear-gradient(90deg, ${C.violet}, ${C.cyan})`,
  sites: `linear-gradient(90deg, ${C.cyan}, ${C.mint})`,
};

export const ease = Easing.bezier(0.22, 1, 0.36, 1);

// 0 -> 1 over [start, start + length] frames, eased.
export function useRise(start: number, length = 18) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + length], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// The Tabbied mark (components/logo/LogoMark.tsx), with an optional draw-on:
// `draw` runs 0 -> 1 as the two strokes are traced.
const LEFT = 'M191 261 H277 C277 172.6 205.4 101 116 101 V311 C116 401.1 188.7 474 277 474 V312 H221';
const RIGHT = 'M414 261 H328 C328 172.6 399.6 101 489 101 V311 C489 401.1 416.3 474 328 474 V312 H391';

export function LogoMark({ size, draw = 1, style }: { size: number; draw?: number; style?: CSSProperties }) {
  return (
    <svg viewBox="107 92 391 391" width={size} height={size} style={{ display: 'block', ...style }}>
      <g fill="none" stroke="currentColor" strokeWidth="17">
        {[LEFT, RIGHT].map((d) => (
          <path key={d} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        ))}
      </g>
    </svg>
  );
}

export function Wordmark({ size, style }: { size: number; style?: CSSProperties }) {
  return (
    <span style={{ fontFamily: F.word, fontWeight: 300, fontSize: size, letterSpacing: '0.01em', lineHeight: 1, ...style }}>
      tabbied
    </span>
  );
}

export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: F.mono,
        fontSize: 20,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: C.cyan,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function GradientText({ children, gradient }: { children: ReactNode; gradient: string }) {
  return (
    <span
      style={{
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </span>
  );
}

export const title: CSSProperties = {
  fontFamily: F.sans,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  lineHeight: 1.04,
  color: C.fg,
  margin: 0,
};

export const body: CSSProperties = {
  fontFamily: F.sans,
  fontWeight: 400,
  fontSize: 30,
  lineHeight: 1.45,
  color: C.dim,
  margin: 0,
};

// A block that rises into place as `t` goes 0 -> 1.
export function rise(t: number, distance = 36): CSSProperties {
  return { opacity: t, transform: `translateY(${(1 - t) * distance}px)` };
}
