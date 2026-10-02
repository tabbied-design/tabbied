import { clockWipe } from '@remotion/transitions/clock-wipe';
import { iris } from '@remotion/transitions/iris';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Film, HEIGHT, WIDTH, type Cast } from '../components/Film';
import { timelineDuration } from '../timeline';
import { TIMING, type SceneId } from './timing';
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

// Who plays each scene, and how it takes over from the one before; the
// order and the lengths are in timing.ts.
const CAST: Cast<SceneId> = {
  title: { Scene: Title },
  purchase: { Scene: Purchase, enter: wipe({ direction: 'from-right' }) },
  split: { Scene: Split, enter: slide({ direction: 'from-bottom' }) },
  cashBack: { Scene: CashBack, enter: wipe({ direction: 'from-left' }) },
  interest: { Scene: Interest, enter: iris({ width: WIDTH, height: HEIGHT }) },
  whoPays: { Scene: WhoPays, enter: slide({ direction: 'from-right' }) },
  whoProfits: { Scene: WhoProfits, enter: wipe({ direction: 'from-top' }) },
  debit: { Scene: Debit, enter: slide({ direction: 'from-left' }) },
  phones: { Scene: Phones, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
  publicMoney: { Scene: PublicMoney, enter: iris({ width: WIDTH, height: HEIGHT }) },
  verdict: { Scene: Verdict, enter: wipe({ direction: 'from-bottom' }) },
  outro: { Scene: Outro, enter: clockWipe({ width: WIDTH, height: HEIGHT }) },
};

export const DURATION = timelineDuration(TIMING);

export const CreditCards: React.FC = () => <Film timing={TIMING} cast={CAST} />;
