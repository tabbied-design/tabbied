import { TabbiedPattern } from 'tabbied/react';
import { nutation, grainfall, louvre } from 'tabbied/patterns';
import s from './rye-and-levain.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Rye & Levain: Sourdough bakery and stone mill, Weirside',
  description:
    'Rye & Levain mills its own grain on a granite stone and bakes it into sourdough the next morning. The departures board, flour by the kilo, the bread line subscription and baking classes.',
};

/* Site colors. The millstone swirls its furrows over a transparent ground,
   so the plate's derived stone tone shows between them; the flour dust and
   the flap slats do the same over the flour and the board. */
const FLOUR = '#f5f3ee';
const INK = '#1c1b19';
const RYE = '#7a5230';
const SIGNAL = '#f0b43c';

const STONE = ['transparent', INK, RYE, FLOUR, INK];
const DUST = ['transparent', RYE, INK, RYE];
const SLATS = ['transparent', FLOUR, SIGNAL, FLOUR, FLOUR, RYE];
const SIFT = ['transparent', RYE, INK];

const NAV = [
  ['Departures', '#board'],
  ['The mill', '#mill'],
  ['Bread line', '#line'],
  ['Classes', '#classes'],
  ['Visit', '#visit'],
];

const FACTS = [
  ['First bake', '06:30'],
  ['Milled here', 'Tue & Fri'],
  ['Starter born', '2016'],
];

type Departure = {
  h: string;
  m: string;
  bake: string;
  shelf: string;
  status: string;
  kind: 'shelf' | 'oven' | 'proving' | 'sold';
};

const BOARD: Departure[] = [
  { h: '06', m: '30', bake: 'Country levain', shelf: 'Shelf 1', status: 'On the shelf', kind: 'shelf' },
  { h: '06', m: '30', bake: 'Rugbrød, all rye', shelf: 'Shelf 2', status: 'On the shelf', kind: 'shelf' },
  { h: '07', m: '00', bake: 'Cardamom knots', shelf: 'Counter', status: 'Sold out', kind: 'sold' },
  { h: '07', m: '15', bake: 'Seeded rye', shelf: 'Shelf 3', status: 'On the shelf', kind: 'shelf' },
  { h: '07', m: '45', bake: 'Spelt and honey tin', shelf: 'Shelf 4', status: 'On the shelf', kind: 'shelf' },
  { h: '08', m: '30', bake: 'Cinnamon buns', shelf: 'Counter', status: 'In the oven', kind: 'oven' },
  { h: '09', m: '00', bake: 'Carrot and caraway rolls', shelf: 'Shelf 5', status: 'In the oven', kind: 'oven' },
  { h: '10', m: '30', bake: 'Porridge loaf', shelf: 'Shelf 1', status: 'Proving', kind: 'proving' },
  { h: '12', m: '00', bake: 'Baguettes', shelf: 'Basket', status: 'Proving', kind: 'proving' },
  { h: '14', m: '30', bake: 'Second country levain', shelf: 'Shelf 1', status: 'Proving', kind: 'proving' },
];

const STOPS = [
  { day: 'Tue', time: '06:00', name: 'The stone', note: 'Rye and wheat through the mill, sifted once for the white loaves.' },
  { day: 'Tue', time: '20:00', name: 'Levain', note: 'The starter gets its last feed and goes to bed warm.' },
  { day: 'Wed', time: '07:00', name: 'Mix', note: 'Flour, water, levain, salt. Rye is mixed like mortar, not kneaded.' },
  { day: 'Wed', time: '08:00', name: 'Bulk', note: 'Four folds an hour apart, then left alone.' },
  { day: 'Wed', time: '13:00', name: 'Shape', note: 'Into linen baskets and black tins, by hand.' },
  { day: 'Wed', time: '14:00', name: 'Cold room', note: 'Overnight at four degrees. This is where the flavor comes from.' },
  { day: 'Thu', time: '05:30', name: 'Oven', note: 'Stone deck, a burst of steam, forty minutes.' },
  { day: 'Thu', time: '06:30', name: 'Shelf', note: 'Cooled on the rack, then up on the board.' },
];

const MILL_STATS = [
  ['1.2 m', 'granite stones, dressed by hand each spring'],
  ['90 kg', 'an hour, milled cold and slow'],
  ['40 km', 'the furthest any of our grain travels'],
];

type Grain = {
  grain: string;
  farm: string;
  grind: string;
  kilo: string;
  sack: string;
};

const GRAINS: Grain[] = [
  { grain: 'Rye, Petkus', farm: 'Lindqvist farm, Upper Weir', grind: 'Wholemeal or sifted', kilo: '$5.50', sack: '$24' },
  { grain: 'Hard red wheat', farm: 'Hollow Oak Farm', grind: 'Wholemeal or T85', kilo: '$5.00', sack: '$22' },
  { grain: 'Spelt', farm: 'Brekke fields', grind: 'Wholemeal', kilo: '$6.50', sack: '$29' },
  { grain: 'Emmer', farm: 'Hollow Oak Farm', grind: 'Wholemeal', kilo: '$8.00', sack: '$36' },
  { grain: 'Einkorn', farm: 'Small lots, when we can', grind: 'Wholemeal', kilo: '$9.00', sack: 'Ask' },
  { grain: 'Buckwheat', farm: 'Lindqvist farm, Upper Weir', grind: 'Light flour', kilo: '$7.00', sack: '$31' },
];

type Pass = {
  line: string;
  name: string;
  price: string;
  per: string;
  gets: string;
  pickup: string;
};

const PASSES: Pass[] = [
  { line: '1', name: 'One loaf', price: '$10', per: 'a week', gets: 'Any loaf on the board, chosen by Monday night, or the country levain if you forget.', pickup: 'Pick up Thursday or Saturday' },
  { line: '2', name: 'Two loaves', price: '$19', per: 'a week', gets: 'Two loaves, the same day or split across Thursday and Saturday.', pickup: 'Pick up Thursday, Saturday or both' },
  { line: '3', name: 'Household', price: '$30', per: 'a week', gets: 'Three loaves and a kilo of fresh flour from that week\'s milling.', pickup: 'Pick up Thursday or Saturday' },
];

const LINE_RULES = [
  ['Pause', 'Any week, by Monday at 20:00. No limit on pauses.'],
  ['Pay', 'Monthly, by card, on the first. The first month is prorated.'],
  ['Collect', 'After 10:00, from the shelf with your name on it.'],
  ['Forgot?', 'Unclaimed bread goes to the Weirside food bank at close.'],
];

type Class = {
  date: string;
  mon: string;
  name: string;
  time: string;
  price: string;
  seats: string;
  full: boolean;
};

const CLASSES: Class[] = [
  { date: '04', mon: 'Oct', name: 'Sourdough from scratch', time: 'Sat 09:00-14:00', price: '$110', seats: '3 seats left', full: false },
  { date: '12', mon: 'Oct', name: 'Rye, rugbrød and crispbread', time: 'Sun 10:00-14:00', price: '$95', seats: 'Full, waitlist open', full: true },
  { date: '18', mon: 'Oct', name: 'Starter clinic, bring yours', time: 'Sat 10:00-11:30', price: '$30', seats: '8 seats left', full: false },
  { date: '25', mon: 'Oct', name: 'Cardamom and cinnamon buns', time: 'Sat 09:00-13:00', price: '$90', seats: '5 seats left', full: false },
  { date: '02', mon: 'Nov', name: 'Milling at home', time: 'Sun 10:00-12:00', price: '$45', seats: '6 seats left', full: false },
  { date: '08', mon: 'Nov', name: 'Kids\' bread morning, ages 8-12', time: 'Sat 09:30-11:30', price: '$35', seats: '4 seats left', full: false },
];

const TAKE_HOME = [
  'Everything you bake, wrapped',
  'A jar of our starter, fed that morning',
  'Two kilos of flour from the week\'s milling',
  'The recipes, on one printed card',
];

const FLOURS = [
  ['Gluten', 'Every grain we mill contains it except buckwheat, and the buckwheat goes through the same stone.'],
  ['Seeds', 'Sesame, sunflower and flax in the seeded rye. Caraway in the rolls.'],
  ['Milk and egg', 'Buns and knots only. Every loaf on the board is flour, water and salt.'],
  ['Nuts', 'None in the bakery. The cafe next door shares our bins, so we cannot promise.'],
];

const HOURS = [
  ['Monday', 'Closed, mill day'],
  ['Tuesday to Friday', '07:00-16:00'],
  ['Saturday', '07:00-14:00'],
  ['Sunday', '08:00-12:00'],
];

export default function RyeAndLevainPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..700&family=Spline+Sans+Mono:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Rye &amp; Levain</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className={s.barNote}>Open today 07:00-16:00</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Sourdough bakery and stone mill, Weirside</p>
            <h1 id="hero-h" className={s.name}>Rye &amp; Levain</h1>
            <p className={s.lede}>
              We grind rye and wheat on a granite mill in the back room and
              bake it into sourdough the next morning. What is out of the
              oven, and what is already gone, is on the board below.
            </p>
            <dl className={s.facts}>
              {FACTS.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.stoneWrap}>
            <div className={s.stone} aria-hidden="true">
              <TabbiedPattern
                pattern={nutation}
                palette={STONE}
                fit="grid"
                cellSize={30}
                seed="rye-millstone"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.stoneCaption}>The runner stone, 1.2 m across, turning at 110 revolutions a minute.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- BOARD */}
        <section id="board" className={s.boardSec} aria-labelledby="board-h">
          <div className={s.board}>
            <div className={s.boardHead}>
              <div>
                <h2 id="board-h" className={s.boardTitle}>Departures</h2>
                <p className={s.boardSub}>Out of the oven today, Thursday</p>
              </div>
              <p className={s.clock}>
                <span className={s.clockLabel}>Board at</span>
                <span className={s.flapBig}>08</span>
                <span className={s.flapBig}>20</span>
              </p>
            </div>

            <div className={s.slats} aria-hidden="true">
              <TabbiedPattern
                pattern={louvre}
                palette={SLATS}
                fit="grid"
                cellSize={28}
                seed="rye-slats"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <table className={s.rows}>
              <caption className={s.srOnly}>Today's bakes: when each leaves the oven, where it goes and whether it is still there</caption>
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Bake</th>
                  <th scope="col" className={s.colShelf}>Shelf</th>
                  <th scope="col" className={s.colStatus}>Status</th>
                </tr>
              </thead>
              <tbody>
                {BOARD.map((b) => (
                  <tr key={`${b.h}${b.m}-${b.bake}`} className={b.kind === 'sold' ? s.gone : undefined}>
                    <td className={s.cellTime}>
                      <span className={s.flap}>{b.h}</span>
                      <span className={s.flap}>{b.m}</span>
                    </td>
                    <td className={s.cellBake}>{b.bake}</td>
                    <td className={s.cellShelf}>{b.shelf}</td>
                    <td className={s.cellStatus}>
                      <span className={`${s.status} ${s[b.kind]}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className={s.boardFoot}>
              Times are when a bake leaves the oven. The status is changed by
              hand at the counter, whenever somebody remembers. From 15:00,
              whatever is left is half price.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROUTE */}
        <section id="route" className={s.sec} aria-labelledby="route-h">
          <div className={s.secHead}>
            <p className={s.secNum}>02</p>
            <h2 id="route-h">Every loaf calls at eight stops</h2>
            <p className={s.secNote}>
              Thirty-six hours from the stone to the shelf. This is the
              country levain's route; the all-rye takes a day longer and
              skips the folds.
            </p>
          </div>
          <ol className={s.route}>
            {STOPS.map((stop) => (
              <li key={`${stop.day}-${stop.time}`}>
                <p className={s.stopWhen}>
                  <span className={s.stopDay}>{stop.day}</span>
                  <span className={s.stopTime}>{stop.time}</span>
                </p>
                <h3 className={s.stopName}>{stop.name}</h3>
                <p className={s.stopNote}>{stop.note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ MILL */}
        <section id="mill" className={s.sec} aria-labelledby="mill-h">
          <div className={s.secHead}>
            <p className={s.secNum}>03</p>
            <h2 id="mill-h">The mill, and flour by the kilo</h2>
            <p className={s.secNote}>
              We mill on Tuesdays and Fridays, cold and slow, and date every
              bag. Fresh flour is at its best for three weeks, or a year in
              the freezer.
            </p>
          </div>

          <div className={s.millGrid}>
            <dl className={s.millStats}>
              {MILL_STATS.map(([figure, what]) => (
                <div key={figure}>
                  <dt>{figure}</dt>
                  <dd>{what}</dd>
                </div>
              ))}
            </dl>

            <div className={s.grainsWrap}>
              <table className={s.grains}>
                <caption className={s.srOnly}>Grains we stone-grind, where they grow and the price by weight</caption>
                <thead>
                  <tr>
                    <th scope="col">Grain</th>
                    <th scope="col" className={s.colFarm}>Grown at</th>
                    <th scope="col" className={s.colGrind}>Grind</th>
                    <th scope="col" className={s.num}>1 kg</th>
                    <th scope="col" className={s.num}>5 kg</th>
                  </tr>
                </thead>
                <tbody>
                  {GRAINS.map((g) => (
                    <tr key={g.grain}>
                      <th scope="row">{g.grain}</th>
                      <td className={s.colFarm}>{g.farm}</td>
                      <td className={s.colGrind}>{g.grind}</td>
                      <td className={s.num}>{g.kilo}</td>
                      <td className={s.num}>{g.sack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={s.small}>
                Bring your own bag or jar and we take 50 cents off each kilo.
                Sacks of 25 kg for bakers and schools, with a week's notice.
              </p>
            </div>
          </div>
        </section>

        {/* The flour dust: what settles on every surface of the mill room. */}
        <div className={s.dust} aria-hidden="true">
          <TabbiedPattern
            pattern={grainfall}
            palette={DUST}
            fit="grid"
            cellSize={84}
            seed="rye-dust"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ LINE */}
        <section id="line" className={s.sec} aria-labelledby="line-h">
          <div className={s.secHead}>
            <p className={s.secNum}>04</p>
            <h2 id="line-h">The bread line</h2>
            <p className={s.secNote}>
              A season pass for bread: the same loaves kept back for you every
              week, so you never arrive to a sold-out board.
            </p>
          </div>

          <ul className={s.passes}>
            {PASSES.map((p) => (
              <li key={p.line} className={s.pass}>
                <p className={s.passLine}>
                  <span className={s.bullet}>{p.line}</span>
                  <span className={s.passName}>{p.name}</span>
                </p>
                <p className={s.passPrice}>
                  <strong>{p.price}</strong>
                  <span>{p.per}</span>
                </p>
                <p className={s.passGets}>{p.gets}</p>
                <p className={s.passPickup}>{p.pickup}</p>
              </li>
            ))}
          </ul>

          <dl className={s.rules}>
            {LINE_RULES.map(([term, text]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>

          <form className={s.form} action="#">
            <h3 className={s.formTitle}>Join the line</h3>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="rye-name">Name</label>
                <input id="rye-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="rye-email">Email</label>
                <input id="rye-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label htmlFor="rye-pass">Pass</label>
                <select id="rye-pass" name="pass" defaultValue="1">
                  <option value="1">Line 1, one loaf</option>
                  <option value="2">Line 2, two loaves</option>
                  <option value="3">Line 3, household</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="rye-day">Pick-up day</label>
                <select id="rye-day" name="day" defaultValue="thu">
                  <option value="thu">Thursday</option>
                  <option value="sat">Saturday</option>
                  <option value="both">Both, for two loaves</option>
                </select>
              </div>
            </div>
            <button className={s.submit} type="submit">Hold my bread</button>
            <p className={s.small}>We write back within two days with a start date. Nothing is charged until then.</p>
          </form>
        </section>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.secHead}>
            <p className={s.secNum}>05</p>
            <h2 id="classes-h">Baking classes in the mill room</h2>
            <p className={s.secNote}>
              Six people round the big table, with Ingrid or Tomas. Aprons,
              flour and coffee are ours; bring a bag to carry it all home.
            </p>
          </div>

          <div className={s.classGrid}>
            <ol className={s.classes}>
              {CLASSES.map((c) => (
                <li key={`${c.date}-${c.mon}`} className={c.full ? s.classFull : undefined}>
                  <p className={s.classDate}>
                    <span className={s.classDay}>{c.date}</span>
                    <span className={s.classMon}>{c.mon}</span>
                  </p>
                  <div className={s.classBody}>
                    <h3>{c.name}</h3>
                    <p className={s.classTime}>{c.time}</p>
                  </div>
                  <p className={s.classPrice}>{c.price}</p>
                  <p className={s.classSeats}>{c.seats}</p>
                </li>
              ))}
            </ol>

            <aside className={s.takeHome} aria-labelledby="take-h">
              <div className={s.sift} aria-hidden="true">
                <TabbiedPattern
                  pattern={nutation}
                  palette={SIFT}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={26}
                  seed="rye-sift"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 id="take-h" className={s.takeTitle}>You go home with</h3>
              <ul className={s.takeList}>
                {TAKE_HOME.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={s.small}>
                Book by email or at the counter. Cancel up to a week before for
                a full refund; after that we will move you to another date.
              </p>
            </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------- FLOURS */}
        <section id="flours" className={s.sec} aria-labelledby="flours-h">
          <div className={s.secHead}>
            <p className={s.secNum}>06</p>
            <h2 id="flours-h">What is in it</h2>
            <p className={s.secNote}>
              One mill, one room, flour in the air. Ask at the counter about a
              particular loaf and we will read you the recipe.
            </p>
          </div>
          <dl className={s.flours}>
            {FLOURS.map(([term, text]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p className={s.secNum}>07</p>
            <h2 id="visit-h">Visit the counter</h2>
          </div>
          <div className={s.visit}>
            <dl className={s.hours}>
              {HOURS.map(([day, time]) => (
                <div key={day}>
                  <dt>{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
            <div className={s.where}>
              <p className={s.address}>8 Millrace Lane, Weirside</p>
              <p className={s.whereNote}>
                By the weir, in the brick building with the old wheel on the
                gable. Bicycle racks at the door, and the number 14 bus stops
                at Weir Bridge, two minutes away.
              </p>
              <p className={s.contact}>
                <a href="tel:+15550142290">(555) 014-2290</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:hello@ryeandlevain.example">hello@ryeandlevain.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Rye &amp; Levain</p>
        <p>A fictional sourdough bakery and stone mill. The loaves, farms, prices and times are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
