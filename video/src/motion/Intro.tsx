import { AbsoluteFill } from 'remotion';
import { PatternField } from '../PatternField';
import { C } from '../brand';
import { data } from '../data';
import { designs } from './designs';
import { GridWipe, Tag, display } from './kit';

// A field opens cell by cell, the claim sets itself over it on two blocks of
// ground, and the grid closes again.
export const INTRO_FRAMES = 72;

export function Intro() {
  const { design, palette } = data.motion.intro;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <PatternField
        pattern={designs[design]}
        steps={['intro-1', 'intro-2'].map((seed) => ({ seed, palette: palette.colors }))}
        hold={30}
        morph={14}
        loop={false}
        density={0.3}
      />
      <GridWipe start={0} duration={22} mode="reveal" />
      <Tag start={14} style={{ left: 110, top: 560 }}>
        <h1 style={{ ...display, fontSize: 150 }}>Generative</h1>
      </Tag>
      <Tag start={20} style={{ left: 110, top: 750 }}>
        <h1 style={{ ...display, fontSize: 150, color: C.mint }}>patterns.</h1>
      </Tag>
      <GridWipe start={54} duration={18} mode="cover" />
    </AbsoluteFill>
  );
}
