import { Composition } from 'remotion';
import { FPS, HEIGHT, WIDTH } from './components/Film';
import { CreditCards, DURATION as CREDIT_CARDS } from './credit-cards/Film';
import './fonts';
import { GraceHopper, DURATION as GRACE_HOPPER } from './grace-hopper/Film';

export const Root: React.FC = () => (
  <>
    <Composition
      id="GraceHopper"
      component={GraceHopper}
      durationInFrames={GRACE_HOPPER}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="CreditCards"
      component={CreditCards}
      durationInFrames={CREDIT_CARDS}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
