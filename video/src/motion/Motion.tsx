import { AbsoluteFill, Sequence } from 'remotion';
import { C, useFontGate } from '../brand';
import { CircleReveal } from './kit';
import { INTRO_FRAMES, Intro } from './Intro';
import { COUNT_FRAMES, Count } from './Count';
import { PALETTES_FRAMES, Palettes } from './Palettes';
import { DENSITY_FRAMES, Density } from './Density';
import { SITES_FRAMES, Sites } from './Sites';
import { INSTALL_FRAMES, Install } from './Install';
import { LOCKUP_FRAMES, Lockup } from './Lockup';

// The motion-graphics cut: the same story as Showcase, told in type and
// shapes instead of screenshots of the product. Beats hand over with a cut
// of their own (a grid closing, a zoom through a digit, bars, panels rising,
// a circle opening), so each starts where the one before leaves the frame.
const AT = {
  intro: 0,
  count: INTRO_FRAMES,
  palettes: INTRO_FRAMES + COUNT_FRAMES,
  // The density panels rise over the palette beat's last frames.
  density: INTRO_FRAMES + COUNT_FRAMES + 106,
};
const SITES_AT = AT.density + DENSITY_FRAMES;
const INSTALL_AT = SITES_AT + SITES_FRAMES;
// The lockup opens in a circle over the install line's last frames.
const LOCKUP_AT = INSTALL_AT + INSTALL_FRAMES - 22;

export const MOTION_FRAMES = LOCKUP_AT + LOCKUP_FRAMES;

export function Motion() {
  useFontGate();
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Sequence from={AT.intro} durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>
      <Sequence from={AT.count} durationInFrames={COUNT_FRAMES}>
        <Count />
      </Sequence>
      <Sequence from={AT.palettes} durationInFrames={PALETTES_FRAMES}>
        <Palettes />
      </Sequence>
      <Sequence from={AT.density} durationInFrames={DENSITY_FRAMES}>
        <Density />
      </Sequence>
      <Sequence from={SITES_AT} durationInFrames={SITES_FRAMES}>
        <Sites />
      </Sequence>
      <Sequence from={INSTALL_AT} durationInFrames={INSTALL_FRAMES}>
        <Install />
      </Sequence>
      <Sequence from={LOCKUP_AT} durationInFrames={LOCKUP_FRAMES}>
        <CircleReveal start={0} duration={22} cx={960} cy={540}>
          <Lockup />
        </CircleReveal>
      </Sequence>
    </AbsoluteFill>
  );
}
