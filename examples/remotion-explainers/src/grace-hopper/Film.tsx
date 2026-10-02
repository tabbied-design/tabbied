import { clockWipe } from '@remotion/transitions/clock-wipe';
import { iris } from '@remotion/transitions/iris';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Film, HEIGHT, WIDTH, type Cast } from '../components/Film';
import { timelineDuration } from '../timeline';
import { TIMING, type SceneId } from './timing';
import { Admiral } from './scenes/Admiral';
import { Bug } from './scenes/Bug';
import { Clocks } from './scenes/Clocks';
import { Cobol } from './scenes/Cobol';
import { Compiler } from './scenes/Compiler';
import { MarkOne } from './scenes/MarkOne';
import { Nanosecond } from './scenes/Nanosecond';
import { Outro } from './scenes/Outro';
import { Quote } from './scenes/Quote';
import { Title } from './scenes/Title';

// Who plays each scene, and how it takes over from the one before; the
// order and the lengths are in timing.ts.
const CAST: Cast<SceneId> = {
  title: { Scene: Title },
  clocks: { Scene: Clocks, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
  markOne: { Scene: MarkOne, enter: wipe({ direction: 'from-right' }) },
  bug: { Scene: Bug, enter: slide({ direction: 'from-bottom' }) },
  compiler: { Scene: Compiler, enter: wipe({ direction: 'from-left' }) },
  cobol: { Scene: Cobol, enter: slide({ direction: 'from-right' }) },
  nanosecond: { Scene: Nanosecond, enter: iris({ width: WIDTH, height: HEIGHT }) },
  admiral: { Scene: Admiral, enter: wipe({ direction: 'from-top' }) },
  quote: { Scene: Quote, enter: slide({ direction: 'from-left' }) },
  outro: { Scene: Outro, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
};

export const DURATION = timelineDuration(TIMING);

export const GraceHopper: React.FC = () => <Film timing={TIMING} cast={CAST} />;
