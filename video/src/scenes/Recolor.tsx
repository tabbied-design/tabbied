import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { patterns } from 'tabbied/patterns';
import { PatternField } from '../PatternField';
import { C, Eyebrow, F, body, ease, rise, title, useRise } from '../brand';
import { data } from '../data';

// One arrangement, recolored through the library: the seed stays, the palette
// moves, so what changes is only color. The rail lights the palette in use.
//
// The recolor is a dissolve between two fields, not the design's transition:
// many designs paint with gradients, which CSS cannot interpolate, so their
// own recolor is a cut. The field underneath is keyed by palette, so it stays
// mounted when the one fading in becomes the base.
const HOLD = 22;
const MORPH = 12;
const SEED = 'recolor';

function Layer({ index, opacity }: { index: number; opacity: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <PatternField
        pattern={patterns.blossom}
        steps={[{ seed: SEED, palette: data.recolor[index].colors }]}
        hold={1}
        morph={1}
        loop={false}
        density={0.3}
      />
    </div>
  );
}

export function Recolor() {
  const frame = useCurrentFrame();
  const text = useRise(0);
  const list = useRise(14);
  const cycle = HOLD + MORPH;
  const last = data.recolor.length - 1;
  const from = Math.min(Math.floor(frame / cycle), last);
  const within = frame - from * cycle;
  const blend =
    from < last && within >= HOLD
      ? interpolate(within, [HOLD, cycle], [0, 1], { easing: ease, extrapolateRight: 'clamp' })
      : 0;
  const active = blend >= 0.5 ? from + 1 : from;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div
        style={{
          position: 'absolute',
          left: 128,
          top: 140,
          width: 800,
          height: 800,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        <Layer key={from} index={from} opacity={1} />
        {blend > 0 ? <Layer key={from + 1} index={from + 1} opacity={blend} /> : null}
      </div>
      <div style={{ position: 'absolute', left: 1040, top: 150, width: 760 }}>
        <div style={rise(text)}>
          <Eyebrow>{data.counts.palettes} palettes</Eyebrow>
          <h2 style={{ ...title, fontSize: 96, marginTop: 26 }}>Recolor anything.</h2>
          <p style={{ ...body, marginTop: 26, width: 680 }}>
            Pick one from the library, or mix your own. Every design follows.
          </p>
        </div>
        <div style={{ marginTop: 44, ...rise(list) }}>
          {data.recolor.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 62,
                padding: '0 22px',
                borderRadius: 14,
                background: i === active ? 'rgba(255,255,255,0.09)' : 'transparent',
                boxShadow: i === active ? `inset 0 0 0 1px ${C.cyan}` : 'none',
              }}
            >
              <span style={{ fontFamily: F.mono, fontSize: 24, color: i === active ? C.fg : C.dim }}>
                {p.name}
              </span>
              <span style={{ display: 'flex', gap: 6 }}>
                {p.colors.map((color, j) => (
                  <span
                    key={j}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      background: color,
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}
