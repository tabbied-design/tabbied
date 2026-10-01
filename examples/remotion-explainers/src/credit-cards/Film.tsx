import { clockWipe } from '@remotion/transitions/clock-wipe';
import { iris } from '@remotion/transitions/iris';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Film, HEIGHT, WIDTH, filmDuration, type Scene } from '../components/Film';
import { CashBack } from './scenes/CashBack';
import { Debit } from './scenes/Debit';
import { Interest } from './scenes/Interest';
import { Outro } from './scenes/Outro';
import { Phones } from './scenes/Phones';
import { PublicMoney } from './scenes/PublicMoney';
import { Purchase } from './scenes/Purchase';
import { Split } from './scenes/Split';
import { Title } from './scenes/Title';
import { Verdict } from './scenes/Verdict';
import { WhoPays } from './scenes/WhoPays';
import { WhoProfits } from './scenes/WhoProfits';

// Scene lengths in frames, and how each one hands over to the next.
const SCENES: Scene[] = [
  { Scene: Title, frames: 165 },
  { Scene: Purchase, frames: 200, enter: wipe({ direction: 'from-right' }) },
  { Scene: Split, frames: 300, enter: slide({ direction: 'from-bottom' }) },
  { Scene: CashBack, frames: 220, enter: wipe({ direction: 'from-left' }) },
  { Scene: Interest, frames: 280, enter: iris({ width: WIDTH, height: HEIGHT }) },
  { Scene: WhoPays, frames: 260, enter: slide({ direction: 'from-right' }) },
  { Scene: WhoProfits, frames: 340, enter: wipe({ direction: 'from-top' }) },
  { Scene: Debit, frames: 330, enter: slide({ direction: 'from-left' }) },
  { Scene: Phones, frames: 290, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
  { Scene: PublicMoney, frames: 330, enter: iris({ width: WIDTH, height: HEIGHT }) },
  { Scene: Verdict, frames: 300, enter: wipe({ direction: 'from-bottom' }) },
  { Scene: Outro, frames: 210, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
];

export const DURATION = filmDuration(SCENES);

export const CreditCards: React.FC = () => <Film scenes={SCENES} />;
