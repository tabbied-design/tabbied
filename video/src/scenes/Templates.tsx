import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { C, Eyebrow, GRADIENT, GradientText, body, rise, title, useRise } from '../brand';
import { data } from '../data';

// Two rails of the gallery's own screenshots, drifting in opposite directions
// like the homepage's (components/main-page/HomeTemplates).
const CARD_W = 400;
const CARD_H = 300;
const GAP = 26;
const SPEED = 3.6;

function Rail({ slugs, top, direction }: { slugs: string[]; top: number; direction: 1 | -1 }) {
  const frame = useCurrentFrame();
  const span = slugs.length * (CARD_W + GAP);
  const shift = direction === 1 ? -frame * SPEED : -span / 2 + frame * SPEED;
  return (
    <div style={{ position: 'absolute', top, left: 0, height: CARD_H, transform: `translateX(${shift}px)` }}>
      {slugs.map((slug, i) => (
        <Img
          key={slug}
          src={staticFile(`generated/templates/${slug}.webp`)}
          style={{
            position: 'absolute',
            left: i * (CARD_W + GAP),
            width: CARD_W,
            height: CARD_H,
            objectFit: 'cover',
            borderRadius: 14,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
          }}
        />
      ))}
    </div>
  );
}

export function Templates() {
  const text = useRise(0);
  const rails = useRise(4, 16);
  const half = Math.ceil(data.templates.length / 2);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', top: 90, width: 1920, textAlign: 'center', ...rise(text) }}>
        <Eyebrow>Website templates</Eyebrow>
        <h2 style={{ ...title, fontSize: 88, marginTop: 22 }}>
          {data.counts.templates} sites, <GradientText gradient={GRADIENT.sites}>one pattern engine</GradientText>
        </h2>
        <p style={{ ...body, marginTop: 18 }}>Every template starts from the same generative core.</p>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: rails,
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <Rail slugs={data.templates.slice(0, half)} top={404} direction={1} />
        <Rail slugs={data.templates.slice(half)} top={404 + CARD_H + GAP} direction={-1} />
      </div>
    </AbsoluteFill>
  );
}
