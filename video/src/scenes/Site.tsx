import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C, Eyebrow, body, ease, rise, title, useRise } from '../brand';
import capture from '../../public/ui/capture.json';
import { BrowserFrame } from '../ui';

// One template, top to bottom: the full-page capture scrolls in the window.
const { site } = capture;
const WIDTH = 1140;
const HEIGHT = 713;
const SHOT_H = site.height * (WIDTH / site.width);

export function Site() {
  const frame = useCurrentFrame();
  const text = useRise(0);
  const win = useRise(4, 26);
  const scroll = interpolate(frame, [30, 170], [0, Math.max(0, SHOT_H - HEIGHT - 400)], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', left: 110, top: 330, width: 540, ...rise(text) }}>
        <Eyebrow>Ready to ship</Eyebrow>
        <h2 style={{ ...title, fontSize: 62, marginTop: 26 }}>HTML or React.</h2>
        <p style={{ ...body, marginTop: 26, width: 490 }}>
          Every template is a real site. Recolor it, then download it as plain HTML or a Vite and React project.
        </p>
      </div>
      <BrowserFrame
        url={`tabbied.com/templates/${site.slug}/site`}
        width={WIDTH}
        height={HEIGHT}
        style={{ left: 1920 - 110 - WIDTH, top: (1080 - HEIGHT - 46) / 2, ...rise(win, 60) }}
      >
        <Img
          src={staticFile('ui/site.webp')}
          style={{ position: 'absolute', width: WIDTH, top: -scroll }}
        />
      </BrowserFrame>
    </AbsoluteFill>
  );
}
