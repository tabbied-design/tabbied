import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { patterns } from 'tabbied/patterns';
import type { PatternDefinition } from 'tabbied';
import { PatternField } from '../PatternField';
import { C, Eyebrow, body, ease, rise, title, useRise } from '../brand';
import { data } from '../data';

// The library as four columns of live cards drifting in turn up and down, the
// template rails (Templates.tsx) stood on end. Each card is a real design in
// a library palette (scripts/prepare.mjs picks both), drawn once and moved.
const COLUMNS = 4;
const TILE = 212;
const GAP = 22;
const SPEED = 3.2;
const WIDTH = COLUMNS * TILE + (COLUMNS - 1) * GAP;
// Where each column's strip starts; the up and down columns alternate, and
// every start keeps the strip covering the frame for the whole scene.
const STARTS = [-90, -560, -300, -700];

const designs = patterns as unknown as Record<string, PatternDefinition>;

function Column({ index }: { index: number }) {
  const frame = useCurrentFrame();
  const cards = data.carousel.filter((_, i) => i % COLUMNS === index);
  const up = index % 2 === 0;
  const y = STARTS[index] + (up ? -1 : 1) * frame * SPEED;
  return (
    <div style={{ position: 'absolute', left: index * (TILE + GAP), top: y, width: TILE }}>
      {cards.map((card, i) => (
        <div
          key={card.slug}
          style={{
            position: 'absolute',
            top: i * (TILE + GAP),
            width: TILE,
            height: TILE,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <PatternField
            pattern={designs[card.slug]}
            steps={[{ seed: card.slug, palette: card.palette }]}
            hold={1}
            morph={1}
            loop={false}
            density={0.4}
          />
        </div>
      ))}
    </div>
  );
}

export function Patterns() {
  const frame = useCurrentFrame();
  const count = Math.round(
    interpolate(frame, [0, 26], [0, data.counts.patterns], { easing: ease, extrapolateRight: 'clamp' })
  );
  const text = useRise(0);
  const lede = useRise(10);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', left: 128, top: 290, width: 640, ...rise(text) }}>
        <Eyebrow>Pattern library</Eyebrow>
        <h2 style={{ ...title, fontSize: 180, marginTop: 28, fontVariantNumeric: 'tabular-nums' }}>{count}</h2>
        <h2 style={{ ...title, fontSize: 84 }}>patterns</h2>
        <p style={{ ...body, marginTop: 36, width: 600, ...rise(lede) }}>
          Each one drawn live in the browser, and reseeded into a new arrangement whenever you like.
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 128,
          width: WIDTH,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {Array.from({ length: COLUMNS }, (_, i) => (
          <Column key={i} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
}
