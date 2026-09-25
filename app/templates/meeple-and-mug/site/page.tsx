import { TabbiedPattern } from 'tabbied/react';
import { damier, dieblock, polkadot } from 'tabbied/patterns';
import s from './meeple-and-mug.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Meeple & Mug: Board game cafe, Tollgate Street',
  description:
    'Meeple & Mug is a board game cafe on Tollgate Street with 412 games on the shelf, tables booked by the hour, coffee, snacks that keep the cards clean, and a game night every evening.',
};

/* Site colors. The fields sit on `transparent`, so the board and the
   bands are drawn straight onto the paper. */
const INK = '#1F1B2E';
const TOMATO = '#E4572E';
const TEAL = '#2A9D8F';
const GRAY = '#8D8697';
const PALE = '#E8DFD0';

const BOARD = ['transparent', TEAL, TOMATO, INK, PALE];
const BAND = ['transparent', TOMATO, TEAL, PALE];
const PIPS = ['transparent', TEAL, TOMATO, GRAY];

const NAV = [
  ['The shelf', '#shelf'],
  ['Tables', '#tables'],
  ['Menu', '#menu'],
  ['Game nights', '#nights'],
  ['House rules', '#rules'],
  ['Visit', '#visit'],
];

const FACTS = [
  ['412', 'games on the shelf'],
  ['18', 'tables, 2 to 12 seats'],
  ['10 min', 'to learn any game'],
];

/* A spine's height (1-4) and thickness (1-3) are the box's, so the shelf
   reads like a shelf and not a bar chart. */
type Game = {
  name: string;
  players: string;
  time: string;
  tone: 'tomato' | 'teal' | 'ink' | 'pale' | 'gray';
  h: '1' | '2' | '3' | '4';
  w: '1' | '2' | '3';
  pick?: boolean;
};

type Shelf = {
  id: string;
  label: string;
  who: string;
  length: string;
  note: string;
  games: Game[];
};

const SHELVES: Shelf[] = [
  {
    id: 'A',
    label: 'Shelf A',
    who: 'For two',
    length: '15-45 minutes',
    note: 'Date night, lunch break, or a rematch before the bus.',
    games: [
      { name: 'Backgammon', players: '2', time: '30 min', tone: 'ink', h: '3', w: '2' },
      { name: 'Two Rooks', players: '2', time: '25 min', tone: 'tomato', h: '4', w: '1', pick: true },
      { name: 'Cribbage', players: '2', time: '30 min', tone: 'pale', h: '2', w: '2' },
      { name: 'Tidepool Duel', players: '2', time: '20 min', tone: 'teal', h: '3', w: '1' },
      { name: 'Mancala', players: '2', time: '15 min', tone: 'gray', h: '1', w: '3' },
      { name: 'Quiltwork', players: '2', time: '30 min', tone: 'tomato', h: '4', w: '2' },
      { name: 'Lost Letters', players: '2', time: '30 min', tone: 'ink', h: '2', w: '1' },
      { name: 'Chess', players: '2', time: '45 min', tone: 'pale', h: '3', w: '2', pick: true },
      { name: 'Checkers', players: '2', time: '20 min', tone: 'teal', h: '2', w: '1' },
    ],
  },
  {
    id: 'B',
    label: 'Shelf B',
    who: 'Three to five',
    length: 'About an hour',
    note: 'The heart of the shelf, and where to start if you are new.',
    games: [
      { name: 'Harbor Lights', players: '3-5', time: '60 min', tone: 'teal', h: '4', w: '3', pick: true },
      { name: 'Seed and Stone', players: '2-4', time: '45 min', tone: 'pale', h: '3', w: '2' },
      { name: 'Orchard Market', players: '3-5', time: '50 min', tone: 'tomato', h: '2', w: '2' },
      { name: 'Mahjong', players: '4', time: '60 min', tone: 'ink', h: '3', w: '3' },
      { name: 'Night Owls', players: '3-6', time: '40 min', tone: 'gray', h: '4', w: '1' },
      { name: 'Railway Barons', players: '2-5', time: '75 min', tone: 'tomato', h: '4', w: '2' },
      { name: 'Dominoes', players: '2-4', time: '30 min', tone: 'pale', h: '1', w: '2' },
      { name: 'Map Makers', players: '2-5', time: '60 min', tone: 'teal', h: '3', w: '2' },
    ],
  },
  {
    id: 'C',
    label: 'Shelf C',
    who: 'Six and up',
    length: '15-30 minutes',
    note: 'Loud, quick, and good for a birthday at the long table.',
    games: [
      { name: 'Wordsmiths', players: '4-10', time: '20 min', tone: 'tomato', h: '3', w: '1' },
      { name: 'Secret Moles', players: '5-10', time: '30 min', tone: 'ink', h: '4', w: '2', pick: true },
      { name: 'Sketch Relay', players: '6-12', time: '25 min', tone: 'pale', h: '2', w: '2' },
      { name: "Liar's Dice", players: '2-6', time: '15 min', tone: 'teal', h: '1', w: '2' },
      { name: 'Codebook', players: '4-8', time: '15 min', tone: 'gray', h: '3', w: '1' },
      { name: 'Telephone Tower', players: '6-10', time: '30 min', tone: 'tomato', h: '4', w: '2' },
      { name: 'Werewolf Hollow', players: '7-15', time: '30 min', tone: 'ink', h: '2', w: '1' },
    ],
  },
  {
    id: 'D',
    label: 'Shelf D',
    who: 'The long table',
    length: 'Two hours and up',
    note: 'Book at least three hours, and ask for the corner booth.',
    games: [
      { name: 'Empire of Salt', players: '2-4', time: '3 hr', tone: 'ink', h: '4', w: '3', pick: true },
      { name: 'Deep Space Freight', players: '1-4', time: '2.5 hr', tone: 'teal', h: '3', w: '3' },
      { name: 'The Long Winter', players: '3-5', time: '2 hr', tone: 'pale', h: '4', w: '2' },
      { name: 'Iron Rails', players: '3-6', time: '3 hr', tone: 'tomato', h: '2', w: '3' },
      { name: 'Vault Crawl', players: '1-4', time: '2 hr', tone: 'gray', h: '3', w: '2' },
      { name: 'Go', players: '2', time: '90 min', tone: 'ink', h: '1', w: '3' },
    ],
  },
];

const RATES = [
  { table: 'Window table', seats: '2 seats', price: '$8', unit: 'an hour' },
  { table: 'Booth', seats: '4 seats', price: '$14', unit: 'an hour' },
  { table: 'Round table', seats: '6 seats', price: '$20', unit: 'an hour' },
  { table: 'The long table', seats: '8-12 seats', price: '$36', unit: 'an hour' },
];

const HOURS_ROW = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

/* Tonight's board: one letter an hour from noon, x for booked. */
const BOARD_ROWS = [
  { name: 'Window 1', seats: '2', slots: '..xx....xxx.' },
  { name: 'Window 2', seats: '2', slots: '.......xxxx.' },
  { name: 'Booth 3', seats: '4', slots: 'xxx...xxxx..' },
  { name: 'Booth 4', seats: '4', slots: '....xx..xxxx' },
  { name: 'Round 5', seats: '6', slots: '.xx.....xxx.' },
  { name: 'Long table', seats: '12', slots: '......xxxxxx' },
];

type Item = { name: string; note: string; price: string };

const MENU: { title: string; when: string; items: Item[] }[] = [
  {
    title: 'Coffee and tea',
    when: 'All day',
    items: [
      { name: 'Espresso', note: 'House blend, from Longwater Roasters', price: '$3' },
      { name: 'Flat white', note: 'Or any milk you like', price: '$4.50' },
      { name: 'The Meeple Mocha', note: 'Dark chocolate, a double shot, cream', price: '$5.50' },
      { name: 'Pour over', note: 'This week: a washed coffee from Huila', price: '$5.50' },
      { name: 'Pot of tea for two', note: 'Breakfast, earl grey, mint or chamomile', price: '$6' },
    ],
  },
  {
    title: 'For the table',
    when: 'One hand, no crumbs',
    items: [
      { name: 'Pretzel bites', note: 'Warm, with grain mustard', price: '$7' },
      { name: 'Popcorn', note: 'Butter, cinnamon sugar or chili lime', price: '$5' },
      { name: 'Veggie sticks', note: 'With hummus and a green dip', price: '$7' },
      { name: 'Natural 20 nachos', note: 'Served with forks, on the side table', price: '$12' },
      { name: 'Grilled cheese fingers', note: 'Cut in six, tomato soup to dip', price: '$9' },
    ],
  },
  {
    title: 'After five',
    when: 'From 5 pm, 21 and up',
    items: [
      { name: 'Draft cider', note: 'Dry, from the Pell orchard', price: '$7' },
      { name: 'Local lager', note: 'Tollgate Brewing, on tap', price: '$7' },
      { name: 'House red or white', note: 'By the glass', price: '$8' },
      { name: 'Critical Hit', note: 'Ginger, lime and soda, no alcohol', price: '$6' },
    ],
  },
];

const WEEK = [
  { day: 'Mon', name: 'Chess and coffee', time: '7 pm', note: 'Clocks on the tables, all levels, a coach on hand.' },
  { day: 'Tue', name: 'Learn to play', time: '6 pm', note: 'Staff teach one new game from the shelf, start to finish.' },
  { day: 'Wed', name: 'Legacy league', time: '7 pm', note: 'Campaign games that carry on week to week.' },
  { day: 'Thu', name: 'Quiz at the long table', time: '8 pm', note: 'Teams of up to six. Prize is next month free.' },
  { day: 'Fri', name: 'Late shelf', time: 'To midnight', note: 'Long games welcome, last booking at 9.' },
  { day: 'Sat', name: 'Family morning', time: '10 am', note: 'Games for five and up, pancakes till noon.' },
  { day: 'Sun', name: 'Tournament', time: '2 pm', note: 'A different game each month, $10 entry.' },
];

const SPECIALS = [
  { date: 'Oct 3', name: 'Blitz chess, 32 boards', note: '5 minute games, $10 entry, prizes for the top four.' },
  { date: 'Oct 11', name: 'Launch night: Harbor Lights, second edition', note: 'The designer teaches it at 7 and 9.' },
  { date: 'Oct 18', name: 'Two-player tournament', note: 'Shelf A only, bring a partner or we will find you one.' },
  { date: 'Oct 31', name: 'Hidden roles, in costume', note: 'Werewolf Hollow and Secret Moles until late.' },
];

const RULES = [
  { t: 'One fee, the whole shelf', b: 'Your table covers every game. Swap as often as you like and bring back the last one before you take the next.' },
  { t: 'Count it back in', b: 'Every box has a card listing its pieces. Count them into the box before it goes back, and tell us if something is missing.' },
  { t: 'Drinks on the side table', b: 'Never on the board. Every table has a side table; ask and we will bring a second.' },
  { t: 'Ask for a teach', b: 'Anyone in a teal apron can teach any game on the shelf in about ten minutes. It is the best part of the job.' },
  { t: 'Bookings wait fifteen minutes', b: 'After that the table goes to the next group. Call us if you are running late and we will hold it.' },
  { t: 'Kids until 8 pm', b: 'With a grown-up at the table. Shelf C and Family Morning are the places to start.' },
];

const HOURS = [
  ['Monday', '4 pm-11 pm'],
  ['Tuesday-Thursday', '12 pm-11 pm'],
  ['Friday', '12 pm-12 am'],
  ['Saturday', '10 am-12 am'],
  ['Sunday', '10 am-9 pm'],
];

export default function MeepleAndMugPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gabarito:wght@500;600;700;800;900&family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork slug="meeple-and-mug-mug" alt="" inks={['var(--tomato)']} className={s.markArt} />
          <span className={s.markName}>Meeple &amp; Mug</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#tables">Book a table</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Three pieces on the edge of a board. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Board game cafe, 22 Tollgate Street</p>
            <h1 id="hero-h" className={s.title}>
              Four hundred games, <em>one long table,</em> and coffee that stays hot.
            </h1>
            <p className={s.lede}>
              Book a table by the hour, pick anything off the shelf, and let
              us teach it while the kettle boils. Open every day, and until
              midnight at the weekend.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#tables">Book a table</a>
              <a className={s.btnGhost} href="#shelf">Browse the shelf</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([v, k]) => (
                <div key={k}>
                  <dt>{v}</dt>
                  <dd>{k}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.table}>
            <div className={s.board} aria-hidden="true">
              <TabbiedPattern
                pattern={damier}
                palette={BOARD}
                fit="grid"
                cellSize={52}
                seed="meeple-board"
                options={{ frequency: 0.55 }}
                redrawInterval={8000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork slug="meeple-and-mug-knight" alt="A chess knight" inks={['var(--ink)']} className={s.heroKnight} />
            <Artwork slug="meeple-and-mug-mug" alt="A mug of coffee, steaming" inks={['var(--tomato)']} className={s.heroMug} />
            <Artwork slug="meeple-and-mug-die" alt="A die showing five" inks={['var(--teal)']} className={s.heroDie} />
            <span className={s.tableEdge} aria-hidden="true" />
          </div>
        </section>

        {/* ----------------------------------------------------------- SHELF
            The library as a bookcase: one shelf per kind of evening, each
            box standing on its spine. */}
        <section id="shelf" className={s.shelfSec} aria-labelledby="shelf-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The shelf</p>
            <h2 id="shelf-h">Pick by who is coming and how long you have</h2>
            <p className={s.secNote}>
              A few of the 412, sorted the way people actually choose. Every
              game is free to play with a table, and the ones marked with a
              dot are what the staff reach for first.
            </p>
          </div>

          <div className={s.bookcase}>
            {SHELVES.map((shelf) => (
              <div key={shelf.id} className={s.shelf}>
                <div className={s.shelfLabel}>
                  <span className={s.shelfId}>{shelf.label}</span>
                  <h3>{shelf.who}</h3>
                  <p className={s.shelfLength}>{shelf.length}</p>
                  <p className={s.shelfNote}>{shelf.note}</p>
                </div>
                <ul className={s.spines}>
                  {shelf.games.map((g) => (
                    <li key={g.name} className={s.spine} data-tone={g.tone} data-h={g.h} data-w={g.w}>
                      <strong className={s.spineName}>{g.name}</strong>
                      <span className={s.spineMeta}>{`${g.players} players, ${g.time}`}</span>
                      {g.pick ? <span className={s.pick}>Staff pick</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={s.shelfFoot}>
            The full list, with ages and weights, is on the tablet by the
            door. Looking for something we do not have? Tell us and it goes on
            the next order.
          </p>
        </section>

        {/* ---------------------------------------------------------- TABLES */}
        <section id="tables" className={s.tables} aria-labelledby="tables-h">
          <div className={s.tablesInner}>
            <div className={s.tablesHead}>
              <Artwork slug="meeple-and-mug-die" alt="" inks={['var(--tomato)']} className={s.tablesDie} />
              <div>
                <p className={s.secKick}>Tables</p>
                <h2 id="tables-h">Booked by the hour, the games included</h2>
                <p className={s.secNote}>
                  Pay for the table, not the games. Walk-ins are welcome when a
                  table is free; at the weekend, book.
                </p>
              </div>
            </div>

            <ul className={s.rates}>
              {RATES.map((r) => (
                <li key={r.table}>
                  <h3>{r.table}</h3>
                  <span className={s.rateSeats}>{r.seats}</span>
                  <strong className={s.ratePrice}>{r.price}</strong>
                  <span className={s.rateUnit}>{r.unit}</span>
                </li>
              ))}
            </ul>

            <div className={s.tonight}>
              <div className={s.tonightHead}>
                <h3>Tonight's tables</h3>
                <p>Updated at 4 pm. Shaded hours are booked.</p>
              </div>
              <div className={s.boardScroll}>
                <table className={s.avail}>
                  <caption className={s.srOnly}>Table availability by hour, noon to midnight</caption>
                  <thead>
                    <tr>
                      <th scope="col">Table</th>
                      {HOURS_ROW.map((h) => (
                        <th key={h} scope="col">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BOARD_ROWS.map((row) => (
                      <tr key={row.name}>
                        <th scope="row">
                          <span className={s.availName}>{row.name}</span>
                          <span className={s.availSeats}>{row.seats}</span>
                        </th>
                        {row.slots.split('').map((c, i) => (
                          <td key={i} data-booked={c === 'x' ? 'yes' : 'no'}>
                            <span className={s.srOnly}>{c === 'x' ? 'Booked' : 'Free'}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <form className={s.book} action="#">
              <h3>Book a table</h3>
              <label className={s.field}>
                <span>Date</span>
                <input type="date" name="date" required />
              </label>
              <label className={s.field}>
                <span>From</span>
                <select name="time" defaultValue="18:00">
                  <option value="12:00">12 pm</option>
                  <option value="14:00">2 pm</option>
                  <option value="16:00">4 pm</option>
                  <option value="18:00">6 pm</option>
                  <option value="19:00">7 pm</option>
                  <option value="20:00">8 pm</option>
                  <option value="21:00">9 pm</option>
                </select>
              </label>
              <label className={s.field}>
                <span>Hours</span>
                <select name="hours" defaultValue="3">
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                  <option value="5">5 hours</option>
                </select>
              </label>
              <label className={s.field}>
                <span>Players</span>
                <input type="number" name="players" min="1" max="12" defaultValue="4" />
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <button className={s.btn} type="submit">Request the table</button>
              <p className={s.bookNote}>We confirm by email within the hour. No deposit under six players.</p>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------ MENU */}
        <section id="menu" className={s.menu} aria-labelledby="menu-h">
          <div className={s.menuArt} aria-hidden="true">
            <div className={s.menuField}>
              <TabbiedPattern
                pattern={polkadot}
                palette={PIPS}
                fit="grid"
                cellSize={44}
                seed="meeple-pips"
                options={{ frequency: 0.5 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork slug="meeple-and-mug-mug" alt="" inks={['var(--ink)']} className={s.menuMug} />
          </div>
          <div className={s.menuBody}>
            <div className={s.secHead}>
              <p className={s.secKick}>Menu</p>
              <h2 id="menu-h">Food that keeps the cards clean</h2>
              <p className={s.secNote}>
                Everything on the table menu is eaten with one hand or a fork.
                Plates come on a side table so the board stays where it is.
              </p>
            </div>
            <div className={s.menuCols}>
              {MENU.map((col) => (
                <div key={col.title} className={s.menuCol}>
                  <h3>{col.title}</h3>
                  <p className={s.menuWhen}>{col.when}</p>
                  <ul>
                    {col.items.map((it) => (
                      <li key={it.name}>
                        <span className={s.itemName}>{it.name}</span>
                        <span className={s.itemPrice}>{it.price}</span>
                        <span className={s.itemNote}>{it.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={dieblock}
            palette={BAND}
            fit="grid"
            cellSize={40}
            seed="meeple-band"
            options={{ frequency: 0.45 }}
            redrawInterval={9000}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- NIGHTS */}
        <section id="nights" className={s.nights} aria-labelledby="nights-h">
          <div className={s.nightsHead}>
            <div className={s.secHead}>
              <p className={s.secKick}>Game nights</p>
              <h2 id="nights-h">Something on every evening</h2>
              <p className={s.secNote}>
                Weekly nights are free with a table. Specials take an entry fee
                and a booking, and fill up.
              </p>
            </div>
            <Artwork slug="meeple-and-mug-knight" alt="" inks={['var(--teal)']} className={s.nightsKnight} />
          </div>

          <ol className={s.week}>
            {WEEK.map((w) => (
              <li key={w.day} className={s.day}>
                <span className={s.dayName}>{w.day}</span>
                <h3>{w.name}</h3>
                <span className={s.dayTime}>{w.time}</span>
                <p>{w.note}</p>
              </li>
            ))}
          </ol>

          <div className={s.specials}>
            <h3 className={s.specialsHead}>Specials in October</h3>
            <ul>
              {SPECIALS.map((sp) => (
                <li key={sp.date}>
                  <time className={s.spDate}>{sp.date}</time>
                  <strong className={s.spName}>{sp.name}</strong>
                  <span className={s.spNote}>{sp.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- RULES
            The house rules as a rulebook page. */}
        <section id="rules" className={s.rules} aria-labelledby="rules-h">
          <div className={s.rulesCard}>
            <div className={s.rulesHead}>
              <p className={s.secKick}>House rules</p>
              <h2 id="rules-h">Six rules, and one more: be a good winner</h2>
            </div>
            <ol className={s.ruleList}>
              {RULES.map((r, i) => (
                <li key={r.t}>
                  <span className={s.ruleNo}>{String(i + 1)}</span>
                  <h3>{r.t}</h3>
                  <p>{r.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Visit</p>
            <h2 id="visit-h">Find the teal door on Tollgate Street</h2>
          </div>
          <div className={s.visitGrid}>
            <div className={s.visitCol}>
              <h3>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.visitCol}>
              <h3>Where</h3>
              <p>22 Tollgate Street, across from the library. Step-free from the street, with an accessible restroom.</p>
              <p>The 14 and 31 buses stop outside. Bike racks by the door; parking in the Mill Lane garage.</p>
            </div>
            <div className={s.visitCol}>
              <h3>Ask us</h3>
              <ul className={s.contact}>
                <li>
                  <a href="tel:+15550142290">(555) 014-2290</a>
                </li>
                <li>
                  <a href="mailto:tables@meepleandmug.example">tables@meepleandmug.example</a>
                </li>
              </ul>
              <p>Birthdays, office nights and school clubs: write and we will plan the games with you.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <a className={s.footMark} href="#top">
            <Artwork slug="meeple-and-mug-die" alt="" inks={['var(--paper)']} className={s.footDie} />
            <span>Meeple &amp; Mug</span>
          </a>
          <p className={s.footTag}>A board game cafe with a very full shelf. 22 Tollgate Street.</p>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p>A fictional board game cafe. Games, prices and hours are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
