import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C, F, ease } from '../brand';
import { data } from '../data';
import { GridWipe, Slide, display, progress } from './kit';

// The gallery's screenshots laid on a tilted board that drifts past, each
// card dropping onto it; the count on a column of ground beside it.
const COLS = 6;
const CARD_W = 400;
const CARD_H = 300;
const GAP = 28;
export const SITES_FRAMES = 118;

export function Sites() {
  const frame = useCurrentFrame();
  const shots = data.templates;
  const rows = Math.ceil(shots.length / COLS);
  const boardW = COLS * (CARD_W + GAP) - GAP;
  const boardH = rows * (CARD_H + GAP) - GAP;
  const n = Math.round(
    interpolate(frame, [6, 30], [0, data.counts.templates], {
      easing: ease,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ perspective: 2400, perspectiveOrigin: '1320px 540px' }}>
        <div
          style={{
            position: 'absolute',
            left: 1320 - boardW / 2,
            top: 540 - boardH / 2,
            width: boardW,
            height: boardH,
            transformStyle: 'preserve-3d',
            transform: `rotateX(50deg) rotateZ(-36deg) translateY(${420 - frame * 3}px)`,
          }}
        >
          {shots.map((slug, i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const t = progress(frame, (c + r) * 1.6, 16);
            return (
              <Img
                key={slug}
                src={staticFile(`generated/templates/${slug}.webp`)}
                style={{
                  position: 'absolute',
                  left: c * (CARD_W + GAP),
                  top: r * (CARD_H + GAP),
                  width: CARD_W,
                  height: CARD_H,
                  objectFit: 'cover',
                  borderRadius: 14,
                  opacity: t,
                  transform: `translateZ(${(1 - t) * 520}px)`,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 760, background: C.bg }}>
        <div style={{ position: 'absolute', left: 110, top: 250 }}>
          <Slide start={4}>
            <h1 style={{ ...display, fontSize: 300, color: C.mint, fontVariantNumeric: 'tabular-nums' }}>{n}</h1>
          </Slide>
          <Slide start={10}>
            <h1 style={{ ...display, fontSize: 120 }}>websites.</h1>
          </Slide>
          <Slide start={18} style={{ marginTop: 34 }}>
            <p style={{ margin: 0, fontFamily: F.sans, fontSize: 34, color: C.dim }}>HTML or React, ready to ship.</p>
          </Slide>
        </div>
      </div>
      <GridWipe start={SITES_FRAMES - 18} duration={18} mode="cover" />
    </AbsoluteFill>
  );
}
