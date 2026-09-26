import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import capture from '../../public/ui/capture.json';
import { C, Eyebrow, body, ease, rise, title, useRise } from '../brand';
import { BrowserFrame, Pointer } from '../ui';

// The real editor (scripts/capture-ui.mjs), recolored through its own rail:
// the pointer clicks where the palette rows actually were on the page.
const { editor } = capture;
const WIDTH = 1140;
const K = WIDTH / editor.width;
const HEIGHT = Math.round(editor.height * K);
// Frame of each click; the shot after it fades in over FADE frames.
const CLICKS = [50, 102, 154];
const FADE = 8;
const START = { x: WIDTH * 0.62, y: HEIGHT * 0.95 };

export function Editor() {
  const frame = useCurrentFrame();
  const text = useRise(0);
  const win = useRise(4, 26);

  // The pointer travels to each row over the 26 frames before its click.
  let at = START;
  for (const [i, click] of CLICKS.entries()) {
    const target = { x: editor.clicks[i].x * K, y: editor.clicks[i].y * K };
    const t = interpolate(frame, [click - 26, click - 2], [0, 1], {
      easing: ease,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    at = { x: at.x + (target.x - at.x) * t, y: at.y + (target.y - at.y) * t };
  }
  const last = [...CLICKS].reverse().find((c) => frame >= c);
  const press = last === undefined ? 0 : Math.min((frame - last) / 14, 1);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', left: 110, top: 330, width: 540, ...rise(text) }}>
        <Eyebrow>The editor</Eyebrow>
        <h2 style={{ ...title, fontSize: 62, marginTop: 26 }}>Customize it live.</h2>
        <p style={{ ...body, marginTop: 26, width: 490 }}>
          Colors, density and frequency, then export a 3000px PNG or a vector SVG.
        </p>
      </div>
      <BrowserFrame
        url="tabbied.com/patterns/radius"
        width={WIDTH}
        height={HEIGHT}
        style={{ left: 1920 - 110 - WIDTH, top: (1080 - HEIGHT - 46) / 2, ...rise(win, 60) }}
      >
        <Img src={staticFile('ui/editor-0.webp')} style={{ position: 'absolute', width: WIDTH, height: HEIGHT }} />
        {CLICKS.map((click, i) => (
          <Img
            key={click}
            src={staticFile(`ui/editor-${i + 1}.webp`)}
            style={{
              position: 'absolute',
              width: WIDTH,
              height: HEIGHT,
              opacity: interpolate(frame, [click, click + FADE], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        ))}
        <Pointer x={at.x} y={at.y} press={press} />
      </BrowserFrame>
    </AbsoluteFill>
  );
}
