import { Composition } from 'remotion';
import { SHOWCASE_FRAMES, Showcase } from './Showcase';
import { MOTION_FRAMES, Motion } from './motion/Motion';

export const Root = () => (
  <>
    <Composition
      id="Showcase"
      component={Showcase}
      durationInFrames={SHOWCASE_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Motion"
      component={Motion}
      durationInFrames={MOTION_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
