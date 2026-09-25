import { TabbiedPattern } from 'tabbied/react';
import { loophole, picket } from 'tabbied/patterns';
import s from './spin-cycle-laundry.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Spin Cycle: Laundromat and wash-and-fold, Linden Avenue',
  description:
    'Spin Cycle is a bright, attended laundromat on Linden Avenue with 24 machines, wash-and-fold by the pound and pickup and delivery. Open 6 am to 11 pm every day.',
};

/* Site colors. The hero's rings show through the washer's glass door, so
   the pattern reads as the load turning inside it. Its ground is the pale
   tone rather than transparent: the design cuts each ring's hole in color 0. */
const PAPER = '#F5F7F7';
const TEAL = '#13A6A3';
const ORANGE = '#F2994A';
const PALE = '#E1EBEB';
const GRAY = '#8B989C';
const INK = '#16232B';

const DRUM = [PALE, TEAL, ORANGE, PAPER, TEAL];
const STRIPE = ['transparent', TEAL, PALE, ORANGE, GRAY];
const DOORS = [INK, TEAL, ORANGE, GRAY, TEAL];
const HEM = ['transparent', TEAL, ORANGE, PAPER];

const NAV = [
  ['Machines', '#machines'],
  ['Prices', '#prices'],
  ['Wash and fold', '#wash-fold'],
  ['Pickup', '#pickup'],
  ['Visit', '#visit'],
];

/* The machine board. Each state paints the washer picture in its own inks:
   body, then door ring and controls. */
type State = 'free' | 'busy' | 'done' | 'out';

const INKS: Record<State, Record<string, string>> = {
  free: { red: 'var(--teal)', blue: 'var(--paper)', black: 'var(--paper)' },
  busy: { red: 'var(--orange)', blue: 'var(--ink)', black: 'var(--ink)' },
  done: { red: 'var(--pale)', blue: 'var(--teal)', black: 'var(--teal)' },
  out: { red: 'var(--gray)', blue: 'var(--ink)', black: 'var(--ink)' },
};

type Machine = { code: string; state: State; status: string };

type Bank = { title: string; spec: string; machines: Machine[] };

const BOARD: Bank[] = [
  {
    title: 'Washers',
    spec: 'Front-load, 25 lb',
    machines: [
      { code: 'W01', state: 'busy', status: '18 min' },
      { code: 'W02', state: 'free', status: 'Free' },
      { code: 'W03', state: 'busy', status: '31 min' },
      { code: 'W04', state: 'done', status: 'Done' },
      { code: 'W05', state: 'free', status: 'Free' },
      { code: 'W06', state: 'busy', status: '6 min' },
      { code: 'W07', state: 'free', status: 'Free' },
      { code: 'W08', state: 'out', status: 'Repair' },
    ],
  },
  {
    title: 'Large washers',
    spec: '40 and 60 lb, comforters',
    machines: [
      { code: 'L01', state: 'busy', status: '24 min' },
      { code: 'L02', state: 'free', status: 'Free' },
      { code: 'L03', state: 'done', status: 'Done' },
      { code: 'L04', state: 'busy', status: '12 min' },
    ],
  },
  {
    title: 'Dryers',
    spec: 'Stacked, 30 lb',
    machines: [
      { code: 'D01', state: 'busy', status: '40 min' },
      { code: 'D02', state: 'free', status: 'Free' },
      { code: 'D03', state: 'busy', status: '16 min' },
      { code: 'D04', state: 'busy', status: '8 min' },
      { code: 'D05', state: 'free', status: 'Free' },
      { code: 'D06', state: 'done', status: 'Done' },
      { code: 'D07', state: 'free', status: 'Free' },
      { code: 'D08', state: 'busy', status: '22 min' },
      { code: 'D09', state: 'free', status: 'Free' },
      { code: 'D10', state: 'busy', status: '35 min' },
      { code: 'D11', state: 'free', status: 'Free' },
      { code: 'D12', state: 'busy', status: '3 min' },
    ],
  },
];

const LEGEND: [State, string][] = [
  ['free', 'Free now'],
  ['busy', 'In use, minutes left'],
  ['done', 'Done, waiting for pickup'],
  ['out', 'Out for repair'],
];

const TALLY = [
  ['4', 'of 12 washers free'],
  ['6', 'of 12 dryers free'],
  ['3 min', 'until the next dryer'],
];

type Price = { machine: string; load: string; cycle: string; price: string };

const PRICES: Price[] = [
  { machine: 'Front-load washer', load: '25 lb, about two baskets', cycle: '29 min', price: '$4.50' },
  { machine: 'Large washer', load: '40 lb, a queen comforter', cycle: '33 min', price: '$6.75' },
  { machine: 'Giant washer', load: '60 lb, a king comforter', cycle: '36 min', price: '$9.25' },
  { machine: 'Dryer', load: 'Up to 30 lb', cycle: '8 min', price: '$0.25' },
  { machine: 'Hot water or extra rinse', load: 'Any washer', cycle: '+4 min', price: '+$0.75' },
];

const PAY = [
  ['Card or phone', 'Tap at any machine. No minimum.'],
  ['The app', 'Start a machine, get a text at 5 minutes left.'],
  ['Quarters', 'The change machine by the door takes bills to $20.'],
];

const FOLD_PRICES = [
  ['Wash and fold', '$1.85 / lb'],
  ['Minimum', '15 lb'],
  ['Same day', 'In by 10 am, ready by 6 pm'],
  ['Next day', 'In after 10 am, ready by noon'],
  ['Comforter or duvet', '$18 each'],
  ['Shirts on hangers', '+$0.75 each'],
];

const FOLD_NOTES = [
  {
    title: 'Sorted, never mixed',
    body: 'Your load is washed on its own in its own machine. Darks, lights and towels are separated unless you tell us otherwise.',
  },
  {
    title: 'Your detergent, or ours',
    body: 'Ours is free and clear. Leave a bottle of yours with the order and we will use it and send it back.',
  },
  {
    title: 'Hang dry, on request',
    body: 'Tag anything that should not go in the dryer. It comes back flat on a rack in a separate bag.',
  },
];

const PICKUP_STEPS = [
  ['1', 'Book a window', 'Online or by phone, by 9 pm the night before.'],
  [
    '2',
    'Leave the bag out',
    'We bring a blue Spin Cycle bag on the first visit. Anything bag-shaped works until then.',
  ],
  ['3', 'We weigh and wash', 'You get a text with the weight and the price before we start.'],
  ['4', 'Back the next day', 'Folded, wrapped and delivered in the same window you chose.'],
];

const ZONES = [
  ['Zone A, under 2 miles', 'Free on orders over $40, otherwise $4'],
  ['Zone B, 2 to 5 miles', '$6 each way'],
  ['Pickup windows', '7-9 am and 6-9 pm, Monday-Saturday'],
];

const HOURS = [
  ['Every day', '6 am-11 pm'],
  ['Last wash', '9:45 pm'],
  ['Attendant on site', '8 am-8 pm'],
  ['Wash and fold desk', '7 am-7 pm'],
];

const AMENITIES = [
  'Free wifi',
  'Folding tables',
  'Carts and hangers',
  'Kids corner',
  'Parking behind the building',
  'Restroom',
];

const FAQ = [
  {
    q: 'Can I reserve a machine?',
    a: 'Not in the shop: machines are first come, first served. The app shows the same board as the screen by the door, so you can check before you leave home.',
  },
  {
    q: 'What if my load is still in the machine when I get back?',
    a: 'Nothing happens to it. After 15 minutes the attendant may move it to a clean cart with your machine number on it, never onto a table.',
  },
  {
    q: 'Do you wash pet bedding?',
    a: 'Yes, in the two giant washers marked for it, which are cleaned with a hot empty cycle after every use. Please shake the hair out first.',
  },
  {
    q: 'Is there a minimum for pickup?',
    a: 'The wash-and-fold minimum is 15 lb, and delivery is free in Zone A above $40, which is about 22 lb.',
  },
];

export default function SpinCycleLaundryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f7f7',
        '--ink': '#16232b',
        '--teal': '#13a6a3',
        '--orange': '#f2994a',
        '--gray': '#8b989c',
        '--pale': '#e1ebeb',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,teal,orange,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDot} aria-hidden="true" />
          <span data-edit="bar.text" data-edit-max="60">Spin Cycle</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <span data-edit="bar.barOpen" data-edit-max="60" className={s.barOpen}>Open 6 am-11 pm</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>
              {label}
            </a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The washer stands on a plate of rings; its glass door is empty,
            so the rings turn inside it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Laundromat, wash and fold, delivery</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Clean clothes,
              <br />
              <em>no waiting around.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Twenty-four machines on Linden Avenue, a board that tells you which ones are free before you leave the
              house, and a wash-and-fold desk for the weeks you would rather not.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#machines">
                Check the board
              </a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#pickup">
                Book a pickup
              </a>
            </div>
          </div>
          <div className={s.heroStage}>
            <div data-edit-pattern="hero.field" data-edit-roles="5,2,3,0,2" className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={loophole}
                palette={DRUM}
                fit="grid"
                cellSize={68}
                seed="spin-hero"
                redrawInterval={3200}
                options={{ frequency: 0.75 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="spin-cycle-laundry-washer"
              alt="A front-loading washing machine"
              inks={{ red: 'var(--paper)', blue: 'var(--ink)', black: 'var(--ink)' }}
              className={s.heroWasher}
            />
            <p className={s.heroBadge}>
              <span data-edit="hero.badgeBig" data-edit-max="60" className={s.badgeBig}>$1.85</span>
              <span data-edit="hero.badgeSmall" data-edit-max="60" className={s.badgeSmall}>a pound, washed and folded</span>
            </p>
          </div>
        </section>

        {/* --------------------------------------------------- MACHINE BOARD
            The screen by the door, as a page: every machine, its state and
            the minutes it has left. */}
        <section id="machines" className={s.machines} aria-labelledby="machines-h">
          <div className={s.board}>
            <div className={s.boardDoors} aria-hidden="true">
              <TabbiedPattern
                pattern={loophole}
                palette={DOORS}
                fit="grid"
                cellSize={40}
                seed="spin-doors"
                redrawInterval={9000}
                options={{ frequency: 0.55 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.boardTop}>
              <div className={s.boardTitle}>
                <p data-edit="machines.boardKicker" data-edit-max="240" data-edit-multiline className={s.boardKicker}>Machine board</p>
                <h2 data-edit="machines.title" data-edit-max="60" id="machines-h">What is free right now</h2>
              </div>
              <p data-edit="machines.boardClock" data-edit-max="240" data-edit-multiline className={s.boardClock}>Sample board, 10:42 am</p>
            </div>

            <dl className={s.tally}>
              {TALLY.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`machines.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`machines.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>

            <div className={s.banks}>
              {BOARD.map((bank, i) => (
                <div key={bank.title} className={s.bank}>
                  <div className={s.bankHead}>
                    <h3 data-edit={`machines.title2.${i}`} data-edit-max="40">{bank.title}</h3>
                    <span data-edit={`machines.text.${i}`} data-edit-max="60">{bank.spec}</span>
                  </div>
                  <ul className={s.tiles}>
                    {bank.machines.map((m, i2) => (
                      <li key={m.code} className={`${s.tile} ${s[m.state]}`}>
                        <Artwork slug="spin-cycle-laundry-washer" alt="" inks={INKS[m.state]} className={s.tileArt} />
                        <span data-edit={`machines.tileCode.${i}.${i2}`} data-edit-max="60" className={s.tileCode}>{m.code}</span>
                        <span data-edit={`machines.tileStatus.${i}.${i2}`} data-edit-max="60" className={s.tileStatus}>{m.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <ul className={s.legend}>
              {LEGEND.map(([state, label], i) => (
                <li data-edit={`machines.item.${i}`} data-edit-max="80" key={state} className={s[state]}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <p data-edit="machines.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>
            The same board runs on the screen by the door and in the Spin Cycle app, updated every minute. This one is a
            sample.
          </p>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.prices} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">Machine prices</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Per cycle, soap not included. A vending machine by the tables sells it for $1.25.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Machine</th>
                  <th data-edit="prices.heading2" scope="col">Load</th>
                  <th data-edit="prices.heading3" scope="col">Cycle</th>
                  <th data-edit="prices.heading4" scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((p, i) => (
                  <tr key={p.machine}>
                    <th data-edit={`prices.heading5.${i}`} scope="row">{p.machine}</th>
                    <td data-edit={`prices.tdLoad.${i}`} className={s.tdLoad}>{p.load}</td>
                    <td data-edit={`prices.tdCycle.${i}`} className={s.tdCycle}>{p.cycle}</td>
                    <td data-edit={`prices.tdPrice.${i}`} className={s.tdPrice}>{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className={s.pay}>
            {PAY.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`prices.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------- WASH AND FOLD */}
        <section id="wash-fold" className={s.fold} aria-labelledby="fold-h">
          <div className={s.foldArt}>
            <div className={s.foldCloth} aria-hidden="true">
              <TabbiedPattern
                pattern={picket}
                palette={HEM}
                fit="grid"
                cellSize={30}
                seed="spin-cloth"
                options={{ frequency: 1 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="spin-cycle-laundry-towels"
              alt="A stack of folded towels"
              inks={{ red: 'var(--teal)', blue: 'var(--orange)', black: 'var(--ink)' }}
              className={s.towels}
            />
          </div>
          <div className={s.foldBody}>
            <div className={s.secHead}>
              <p data-edit="washFold.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
              <h2 data-edit="washFold.title" data-edit-format="emphasis" data-edit-max="60" id="fold-h">
                Wash and fold,
                <br />
                <em>by the pound.</em>
              </h2>
              <p data-edit="washFold.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Drop a bag at the desk, pick it up folded. We weigh it in front of you and write the price on the
                ticket.
              </p>
            </div>
            <dl className={s.foldPrices}>
              {FOLD_PRICES.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`washFold.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`washFold.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <ul className={s.foldNotes}>
              {FOLD_NOTES.map((n, i) => (
                <li key={n.title}>
                  <h3 data-edit={`washFold.title.${i}`} data-edit-max="40">{n.title}</h3>
                  <p data-edit={`washFold.body2.${i}`} data-edit-max="240" data-edit-multiline>{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* A thin band of stripes, like the edge of a folded towel. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,5,3,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={picket}
            palette={STRIPE}
            fit="grid"
            cellSize={36}
            seed="spin-band"
            options={{ frequency: 0.7 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- PICKUP */}
        <section id="pickup" className={s.pickup} aria-labelledby="pickup-h">
          <div className={s.pickupHead}>
            <div className={s.secHead}>
              <p data-edit="pickup.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
              <h2 data-edit="pickup.title" data-edit-max="60" id="pickup-h">Pickup and delivery</h2>
              <p data-edit="pickup.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Wash and fold, collected from your door and brought back the next day. Same price per pound as the desk.
              </p>
            </div>
            <Artwork
              slug="spin-cycle-laundry-basket"
              alt="A laundry basket full of clothes"
              inks={{ red: 'var(--orange)', blue: 'var(--teal)', black: 'var(--ink)' }}
              className={s.basket}
            />
          </div>
          <ol className={s.pickupSteps}>
            {PICKUP_STEPS.map(([no, title, body], i) => (
              <li key={no}>
                <span data-edit={`pickup.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{no}</span>
                <h3 data-edit={`pickup.title2.${i}`} data-edit-max="40">{title}</h3>
                <p data-edit={`pickup.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
              </li>
            ))}
          </ol>
          <div className={s.pickupGrid}>
            <dl className={s.zones}>
              {ZONES.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`pickup.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`pickup.body2.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <form className={s.form} action="#">
              <div className={s.formEdge} aria-hidden="true">
                <TabbiedPattern
                  pattern={picket}
                  palette={STRIPE}
                  fit="grid"
                  cellSize={28}
                  seed="spin-ticket"
                  options={{ frequency: 0.8 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="pickup.formHead" data-edit-max="40" className={s.formHead}>Book a pickup</h3>
              <label className={s.field}>
                <span data-edit="pickup.text" data-edit-max="60">Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span data-edit="pickup.text2" data-edit-max="60">Street address</span>
                <input type="text" name="address" autoComplete="street-address" />
              </label>
              <div className={s.fieldRow}>
                <label className={s.field}>
                  <span data-edit="pickup.text3" data-edit-max="60">Day</span>
                  <select name="day" defaultValue="tomorrow">
                    <option value="tomorrow">Tomorrow</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span data-edit="pickup.text4" data-edit-max="60">Window</span>
                  <select name="window" defaultValue="morning">
                    <option value="morning">7-9 am</option>
                    <option value="evening">6-9 pm</option>
                  </select>
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="pickup.text5" data-edit-max="60">Phone, for the text with the price</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <button data-edit="pickup.submit" data-edit-max="24" className={s.submit} type="submit">
                Request pickup
              </button>
            </form>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Come by</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Big windows, clean floors and a bench out front. Weekday mornings are the quietest; Sunday afternoon is
              the busiest.
            </p>
          </div>
          <div className={s.visitGrid}>
            <div className={s.addr}>
              <h3 data-edit="visit.visitHead" data-edit-max="40" className={s.visitHead}>Where</h3>
              <p data-edit="visit.addrLine" data-edit-max="240" data-edit-multiline className={s.addrLine}>311 Linden Avenue</p>
              <p data-edit="visit.addrNote" data-edit-max="240" data-edit-multiline className={s.addrNote}>
                Between the bakery and the post office. Parking behind, entrance off Birch Lane.
              </p>
              <a data-edit="visit.addrLink" data-edit-max="28" className={s.addrLink} href="tel:5550173110">
                (555) 017-3110
              </a>
              <a data-edit="visit.addrLink2" data-edit-max="28" className={s.addrLink} href="mailto:hello@spincycle.example">
                hello@spincycle.example
              </a>
            </div>
            <div>
              <h3 data-edit="visit.visitHead2" data-edit-max="40" className={s.visitHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 data-edit="visit.visitHead3" data-edit-max="40" className={s.visitHead}>Inside</h3>
              <ul className={s.amenities}>
                {AMENITIES.map((a, i) => (
                  <li data-edit={`visit.item.${i}`} data-edit-max="80" key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p data-edit="faq.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
            <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Good to know</h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={loophole}
            palette={DOORS}
            fit="grid"
            cellSize={56}
            seed="spin-foot"
            options={{ frequency: 0.5 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Spin Cycle</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Laundromat, wash and fold, pickup and delivery. 311 Linden Avenue.</p>
          <ul className={s.footLinks}>
            <li>
              <a data-edit="footer.machines" data-edit-max="28" href="#machines">Machine board</a>
            </li>
            <li>
              <a data-edit="footer.prices" data-edit-max="28" href="#prices">Prices</a>
            </li>
            <li>
              <a data-edit="footer.washFold" data-edit-max="28" href="#wash-fold">Wash and fold</a>
            </li>
            <li>
              <a data-edit="footer.pickup" data-edit-max="28" href="#pickup">Pickup</a>
            </li>
            <li>
              <a data-edit="footer.visit" data-edit-max="28" href="#visit">Hours</a>
            </li>
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional laundromat. Prices, machines and hours are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the page's own colors; the pictures follow the palette too.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
