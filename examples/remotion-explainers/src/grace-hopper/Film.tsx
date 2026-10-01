import { clockWipe } from '@remotion/transitions/clock-wipe';
import { iris } from '@remotion/transitions/iris';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Film, HEIGHT, WIDTH, filmDuration, type Scene } from '../components/Film';
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

// Scene lengths in frames, and how each one hands over to the next.
const SCENES: Scene[] = [
  { Scene: Title, frames: 150 },
  { Scene: Clocks, frames: 170, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
  { Scene: MarkOne, frames: 170, enter: wipe({ direction: 'from-right' }) },
  { Scene: Bug, frames: 170, enter: slide({ direction: 'from-bottom' }) },
  { Scene: Compiler, frames: 165, enter: wipe({ direction: 'from-left' }) },
  { Scene: Cobol, frames: 170, enter: slide({ direction: 'from-right' }) },
  { Scene: Nanosecond, frames: 165, enter: iris({ width: WIDTH, height: HEIGHT }) },
  { Scene: Admiral, frames: 165, enter: wipe({ direction: 'from-top' }) },
  { Scene: Quote, frames: 170, enter: slide({ direction: 'from-left' }) },
  { Scene: Outro, frames: 190, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
];

export const DURATION = filmDuration(SCENES);

export const GraceHopper: React.FC = () => <Film scenes={SCENES} />;
