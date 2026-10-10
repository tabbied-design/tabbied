import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, F, ease } from '../brand';

// The motion cut's small vocabulary. Every piece is a pure function of the
// frame its Sequence hands it, like everything else in the video.

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export function progress(frame: number, start: number, length: number) {
  return interpolate(frame, [start, start + length], [0, 1], { ...clamp, easing: ease });
}

// A grid of square cells that grow to cover the frame or shrink to reveal it,
// swept corner to corner: the pattern engine's own grid, used as the cut.
export function GridWipe({
  start,
  duration = 18,
  mode,
  color = C.bg,
  cell = 120,
  spread = 10,
}: {
  start: number;
  duration?: number;
  mode: 'cover' | 'reveal';
  color?: string;
  cell?: number;
  spread?: number;
}) {
  const frame = useCurrentFrame();
  const cols = Math.ceil(1920 / cell);
  const rows = Math.ceil(1080 / cell);
  const length = Math.max(1, duration - spread);
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const delay = (spread * (c + r)) / (cols + rows - 2);
      const t = progress(frame, start + delay, length);
      const scale = mode === 'cover' ? t : 1 - t;
      if (scale <= 0) continue;
      cells.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: 'absolute',
            left: c * cell,
            top: r * cell,
            width: cell + 1,
            height: cell + 1,
            background: color,
            transform: `scale(${scale})`,
          }}
        />
      );
    }
  }
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{cells}</AbsoluteFill>;
}

// Text that rises into place from behind its own baseline, and optionally
// leaves the same way it came.
export function Slide({
  start,
  length = 12,
  exit,
  children,
  style,
}: {
  start: number;
  length?: number;
  exit?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const inT = progress(frame, start, length);
  const outT = exit === undefined ? 0 : progress(frame, exit, length);
  const y = (1 - inT) * 110 - outT * 110;
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <div style={{ transform: `translateY(${y}%)` }}>{children}</div>
    </div>
  );
}

// A solid block of the page's ground that draws itself left to right, with
// its text sliding up inside: how type sits on a busy field without a veil.
export function Tag({
  start,
  children,
  style,
  padding = '18px 34px 22px',
}: {
  start: number;
  children: ReactNode;
  style?: CSSProperties;
  padding?: string;
}) {
  const frame = useCurrentFrame();
  const t = progress(frame, start, 10);
  return (
    <div style={{ position: 'absolute', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: C.bg,
          transformOrigin: 'left center',
          transform: `scaleX(${t})`,
        }}
      />
      <div style={{ position: 'relative', padding }}>
        <Slide start={start + 4}>{children}</Slide>
      </div>
    </div>
  );
}

export const display: CSSProperties = {
  fontFamily: F.sans,
  fontWeight: 700,
  letterSpacing: '-0.035em',
  lineHeight: 1,
  color: C.fg,
  margin: 0,
  whiteSpace: 'nowrap',
};

// The frame in the ground color with `text` cut out of it, so whatever is
// underneath shows through the letters. An SVG mask, because a css-doodle
// field is DOM and cannot be a background-clip.
export function Knockout({
  id,
  text,
  fontSize,
  x = 960,
  y = 540,
  textScale = 1,
  style,
}: {
  id: string;
  text: string;
  fontSize: number;
  x?: number;
  y?: number;
  textScale?: number;
  style?: CSSProperties;
}) {
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, ...style }}>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={12000} height={12000}>
          <rect x={-4000} y={-4000} width={12000} height={12000} fill="white" />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={F.sans}
            fontWeight={700}
            fontSize={fontSize}
            letterSpacing={-0.04 * fontSize}
            style={{ fontVariantNumeric: 'tabular-nums' }}
            transform={`translate(${x} ${y}) scale(${textScale}) translate(${-x} ${-y})`}
            fill="black"
          >
            {text}
          </text>
        </mask>
      </defs>
      <rect x={-4000} y={-4000} width={12000} height={12000} fill={C.bg} mask={`url(#${id})`} />
    </svg>
  );
}

// Full-height bars in a palette's colors that sweep up over the frame and on
// out of it. Whatever changes underneath while they cover it is a clean cut;
// `coveredAt` says when that is.
export const BAR_WIPE = { bars: 5, enter: 8, hold: 3, exit: 8, stagger: 2 };

export function barWipeCoveredAt(start: number) {
  const { bars, enter, stagger } = BAR_WIPE;
  return start + (bars - 1) * stagger + enter;
}

export function BarWipe({ start, colors }: { start: number; colors: string[] }) {
  const frame = useCurrentFrame();
  const { bars, enter, hold, exit, stagger } = BAR_WIPE;
  const width = 1920 / bars;
  const outFrom = barWipeCoveredAt(start) + hold;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: bars }, (_, i) => {
        const inT = progress(frame, start + i * stagger, enter);
        const outT = progress(frame, outFrom + i * stagger, exit);
        const y = (1 - inT) * 1080 - outT * 1080;
        if (inT <= 0 || outT >= 1) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: i * width,
              top: 0,
              width: width + 1,
              height: 1080,
              background: colors[i % colors.length],
              transform: `translateY(${y}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}

// A scene revealed through a circle opening from (cx, cy). A radial-gradient
// mask rather than clip-path: a clip-path circle's edge came out a few pixels
// different from one browser tab to the next, and the gradient is the same
// arithmetic everywhere.
export function CircleReveal({
  start,
  duration,
  cx,
  cy,
  children,
}: {
  start: number;
  duration: number;
  cx: number;
  cy: number;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const far = Math.hypot(Math.max(cx, 1920 - cx), Math.max(cy, 1080 - cy));
  const r = progress(frame, start, duration) * far;
  const mask = `radial-gradient(circle ${far + 2}px at ${cx}px ${cy}px, #000 ${r}px, transparent ${r + 1.5}px)`;
  return <AbsoluteFill style={{ WebkitMaskImage: mask, maskImage: mask }}>{children}</AbsoluteFill>;
}
