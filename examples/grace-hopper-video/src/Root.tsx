import { Composition } from 'remotion';
import './fonts';
import { DURATION, FPS, GraceHopper, HEIGHT, WIDTH } from './Video';

export const Root: React.FC = () => (
  <Composition
    id="GraceHopper"
    component={GraceHopper}
    durationInFrames={DURATION}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
