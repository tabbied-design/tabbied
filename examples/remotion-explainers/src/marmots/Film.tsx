import { clockWipe } from '@remotion/transitions/clock-wipe';
import { iris } from '@remotion/transitions/iris';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Film, HEIGHT, WIDTH, type Cast } from '../components/Film';
import { timelineDuration } from '../timeline';
import { TIMING, type SceneId } from './timing';
import { Comeback } from './scenes/Comeback';
import { Feast } from './scenes/Feast';
import { Greeting } from './scenes/Greeting';
import { Groundhog } from './scenes/Groundhog';
import { Huddle } from './scenes/Huddle';
import { Outro } from './scenes/Outro';
import { Range } from './scenes/Range';
import { Sleep } from './scenes/Sleep';
import { Title } from './scenes/Title';
import { Whistle } from './scenes/Whistle';
import { Whistler } from './scenes/Whistler';

// Who plays each scene, and how it takes over from the one before; the
// order and the lengths are in timing.ts.
const CAST: Cast<SceneId> = {
  title: { Scene: Title },
  range: { Scene: Range, enter: wipe({ direction: 'from-right' }) },
  whistle: { Scene: Whistle, enter: iris({ width: WIDTH, height: HEIGHT }) },
  greeting: { Scene: Greeting, enter: slide({ direction: 'from-bottom' }) },
  feast: { Scene: Feast, enter: wipe({ direction: 'from-left' }) },
  // Day turns to night.
  sleep: { Scene: Sleep, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
  huddle: { Scene: Huddle, enter: iris({ width: WIDTH, height: HEIGHT }) },
  // Up out of the burrow.
  groundhog: { Scene: Groundhog, enter: slide({ direction: 'from-bottom' }) },
  whistler: { Scene: Whistler, enter: wipe({ direction: 'from-top' }) },
  comeback: { Scene: Comeback, enter: slide({ direction: 'from-right' }) },
  outro: { Scene: Outro, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
};

export const DURATION = timelineDuration(TIMING);

export const Marmots: React.FC = () => <Film timing={TIMING} cast={CAST} />;
