import { TabbiedPattern } from 'tabbied/react';
import { nutation, grainfall, louvre } from 'tabbied/patterns';
import s from './rye-and-levain.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--flour': '#f5f3ee',
        '--ink': '#1c1b19',
        '--rye': '#7a5230',
        '--signal': '#f0b43c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="flour,ink,rye,signal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..700&family=Spline+Sans+Mono:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Rye &amp; Levain</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open today 07:00-16:00</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Sourdough bakery and stone mill, Weirside</p>
            <h1 data-edit="hero.name" data-edit-max="70" id="hero-h" className={s.name}>Rye &amp; Levain</h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              We grind rye and wheat on a granite mill in the back room and
              bake it into sourdough the next morning. What is out of the
              oven, and what is already gone, is on the board below.
            </p>
            <dl className={s.facts}>
              {FACTS.map(([label, value], i) => (
                <div key={label}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.stoneWrap}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,0,1" className={s.stone} aria-hidden="true">
              <TabbiedPattern
                pattern={nutation}
                palette={STONE}
                fit="grid"
                cellSize={30}
                seed="rye-millstone"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.stoneCaption" data-edit-max="240" data-edit-multiline className={s.stoneCaption}>The runner stone, 1.2 m across, turning at 110 revolutions a minute.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- BOARD */}
        <section id="board" className={s.boardSec} aria-labelledby="board-h">
          <div className={s.board}>
            <div className={s.boardHead}>
              <div>
                <h2 data-edit="board.boardTitle" data-edit-max="60" id="board-h" className={s.boardTitle}>Departures</h2>
                <p data-edit="board.boardSub" data-edit-max="240" data-edit-multiline className={s.boardSub}>Out of the oven today, Thursday</p>
              </div>
              <p className={s.clock}>
                <span data-edit="board.clockLabel" data-edit-max="60" className={s.clockLabel}>Board at</span>
                <span data-edit="board.flapBig" data-edit-max="60" className={s.flapBig}>08</span>
                <span data-edit="board.flapBig2" data-edit-max="60" className={s.flapBig}>20</span>
              </p>
            </div>

            <div data-edit-pattern="board.field" data-edit-roles="transparent,0,3,0,0,2" className={s.slats} aria-hidden="true">
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
              <caption data-edit="board.srOnly" className={s.srOnly}>Today's bakes: when each leaves the oven, where it goes and whether it is still there</caption>
              <thead>
                <tr>
                  <th data-edit="board.heading" scope="col">Time</th>
                  <th data-edit="board.heading2" scope="col">Bake</th>
                  <th data-edit="board.colShelf" scope="col" className={s.colShelf}>Shelf</th>
                  <th data-edit="board.colStatus" scope="col" className={s.colStatus}>Status</th>
                </tr>
              </thead>
              <tbody>
                {BOARD.map((b, i) => (
                  <tr key={`${b.h}${b.m}-${b.bake}`} className={b.kind === 'sold' ? s.gone : undefined}>
                    <td className={s.cellTime}>
                      <span data-edit={`board.flap.${i}`} data-edit-max="60" className={s.flap}>{b.h}</span>
                      <span data-edit={`board.flap2.${i}`} data-edit-max="60" className={s.flap}>{b.m}</span>
                    </td>
                    <td data-edit={`board.cellBake.${i}`} className={s.cellBake}>{b.bake}</td>
                    <td data-edit={`board.cellShelf.${i}`} className={s.cellShelf}>{b.shelf}</td>
                    <td className={s.cellStatus}>
                      <span data-edit={`board.status.${i}`} data-edit-max="60" className={`${s.status} ${s[b.kind]}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p data-edit="board.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>
              Times are when a bake leaves the oven. The status is changed by
              hand at the counter, whenever somebody remembers. From 15:00,
              whatever is left is half price.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROUTE */}
        <section id="route" className={`${s.sec} ${s.routeSec}`} aria-labelledby="route-h">
          <div className={s.secHead}>
            <p data-edit="route.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>02</p>
            <h2 data-edit="route.title" data-edit-max="60" id="route-h">Every loaf calls at eight stops</h2>
            <p data-edit="route.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Thirty-six hours from the stone to the shelf. This is the
              country levain's route; the all-rye takes a day longer and
              skips the folds.
            </p>
          </div>
          <ol className={s.route}>
            {STOPS.map((stop, i) => (
              <li key={`${stop.day}-${stop.time}`}>
                <p className={s.stopWhen}>
                  <span data-edit={`route.stopDay.${i}`} data-edit-max="60" className={s.stopDay}>{stop.day}</span>
                  <span data-edit={`route.stopTime.${i}`} data-edit-max="60" className={s.stopTime}>{stop.time}</span>
                </p>
                <h3 data-edit={`route.stopName.${i}`} data-edit-max="40" className={s.stopName}>{stop.name}</h3>
                <p data-edit={`route.stopNote.${i}`} data-edit-max="240" data-edit-multiline className={s.stopNote}>{stop.note}</p>
              </li>
            ))}
          </ol>
          {/* Where the route ends: the loaf itself, drawn in the page's ink. */}
          <div className={s.arrival}>
            <Artwork
              slug="rye-and-levain-loaf"
              alt="A round country sourdough loaf with one deep curling score and a floured crust"
              inks={['var(--text)']}
              className={s.loaf}
            />
            <p data-edit="route.arrivalNote" data-edit-max="240" data-edit-multiline className={s.arrivalNote}>Arrived: the country levain, shelf 1, 06:30.</p>
          </div>
        </section>

        {/* ------------------------------------------------------------ MILL */}
        <section id="mill" className={s.sec} aria-labelledby="mill-h">
          <div className={s.secHead}>
            <p data-edit="mill.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>03</p>
            <h2 data-edit="mill.title" data-edit-max="60" id="mill-h">The mill, and flour by the kilo</h2>
            <p data-edit="mill.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We mill on Tuesdays and Fridays, cold and slow, and date every
              bag. Fresh flour is at its best for three weeks, or a year in
              the freezer.
            </p>
          </div>

          <div className={s.millGrid}>
            <dl className={s.millStats}>
              {MILL_STATS.map(([figure, what], i) => (
                <div key={figure}>
                  <dt data-edit={`mill.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`mill.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>

            <div className={s.grainsWrap}>
              <table className={s.grains}>
                <caption data-edit="mill.srOnly" className={s.srOnly}>Grains we stone-grind, where they grow and the price by weight</caption>
                <thead>
                  <tr>
                    <th data-edit="mill.heading" scope="col">Grain</th>
                    <th data-edit="mill.colFarm" scope="col" className={s.colFarm}>Grown at</th>
                    <th data-edit="mill.colGrind" scope="col" className={s.colGrind}>Grind</th>
                    <th data-edit="mill.num" scope="col" className={s.num}>1 kg</th>
                    <th data-edit="mill.num2" scope="col" className={s.num}>5 kg</th>
                  </tr>
                </thead>
                <tbody>
                  {GRAINS.map((g, i) => (
                    <tr key={g.grain}>
                      <th data-edit={`mill.heading2.${i}`} scope="row">{g.grain}</th>
                      <td data-edit={`mill.colFarm2.${i}`} className={s.colFarm}>{g.farm}</td>
                      <td data-edit={`mill.colGrind2.${i}`} className={s.colGrind}>{g.grind}</td>
                      <td data-edit={`mill.num3.${i}`} className={s.num}>{g.kilo}</td>
                      <td data-edit={`mill.num4.${i}`} className={s.num}>{g.sack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="mill.small" data-edit-max="240" data-edit-multiline className={s.small}>
                Bring your own bag or jar and we take 50 cents off each kilo.
                Sacks of 25 kg for bakers and schools, with a week's notice.
              </p>
            </div>
          </div>
        </section>

        {/* The flour dust: what settles on every surface of the mill room. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,1,2" className={s.dust} aria-hidden="true">
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
            <p data-edit="line.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>04</p>
            <h2 data-edit="line.title" data-edit-max="60" id="line-h">The bread line</h2>
            <p data-edit="line.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A season pass for bread: the same loaves kept back for you every
              week, so you never arrive to a sold-out board.
            </p>
          </div>

          <ul className={s.passes}>
            {PASSES.map((p, i) => (
              <li key={p.line} className={s.pass}>
                <p className={s.passLine}>
                  <span data-edit={`line.bullet.${i}`} data-edit-max="60" className={s.bullet}>{p.line}</span>
                  <span data-edit={`line.passName.${i}`} data-edit-max="60" className={s.passName}>{p.name}</span>
                </p>
                <p className={s.passPrice}>
                  <strong data-edit={`line.emphasis.${i}`}>{p.price}</strong>
                  <span data-edit={`line.text.${i}`} data-edit-max="60">{p.per}</span>
                </p>
                <p data-edit={`line.passGets.${i}`} data-edit-max="240" data-edit-multiline className={s.passGets}>{p.gets}</p>
                <p data-edit={`line.passPickup.${i}`} data-edit-max="240" data-edit-multiline className={s.passPickup}>{p.pickup}</p>
              </li>
            ))}
          </ul>

          <dl className={s.rules}>
            {LINE_RULES.map(([term, text], i) => (
              <div key={term}>
                <dt data-edit={`line.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`line.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
              </div>
            ))}
          </dl>

          <form className={s.form} action="#">
            <h3 data-edit="line.formTitle" data-edit-max="40" className={s.formTitle}>Join the line</h3>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label data-edit="line.label" htmlFor="rye-name">Name</label>
                <input id="rye-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="line.label2" htmlFor="rye-email">Email</label>
                <input id="rye-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="line.label3" htmlFor="rye-pass">Pass</label>
                <select id="rye-pass" name="pass" defaultValue="1">
                  <option value="1">Line 1, one loaf</option>
                  <option value="2">Line 2, two loaves</option>
                  <option value="3">Line 3, household</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="line.label4" htmlFor="rye-day">Pick-up day</label>
                <select id="rye-day" name="day" defaultValue="thu">
                  <option value="thu">Thursday</option>
                  <option value="sat">Saturday</option>
                  <option value="both">Both, for two loaves</option>
                </select>
              </div>
            </div>
            <button data-edit="line.submit" data-edit-max="24" className={s.submit} type="submit">Hold my bread</button>
            <p data-edit="line.small" data-edit-max="240" data-edit-multiline className={s.small}>We write back within two days with a start date. Nothing is charged until then.</p>
          </form>
        </section>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.secHead}>
            <p data-edit="classes.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>05</p>
            <h2 data-edit="classes.title" data-edit-max="60" id="classes-h">Baking classes in the mill room</h2>
            <p data-edit="classes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six people round the big table, with Ingrid or Tomas. Aprons,
              flour and coffee are ours; bring a bag to carry it all home.
            </p>
          </div>

          <div className={s.classGrid}>
            <ol className={s.classes}>
              {CLASSES.map((c, i) => (
                <li key={`${c.date}-${c.mon}`} className={c.full ? s.classFull : undefined}>
                  <p className={s.classDate}>
                    <span data-edit={`classes.classDay.${i}`} data-edit-max="60" className={s.classDay}>{c.date}</span>
                    <span data-edit={`classes.classMon.${i}`} data-edit-max="60" className={s.classMon}>{c.mon}</span>
                  </p>
                  <div className={s.classBody}>
                    <h3 data-edit={`classes.title2.${i}`} data-edit-max="40">{c.name}</h3>
                    <p data-edit={`classes.classTime.${i}`} data-edit-max="240" data-edit-multiline className={s.classTime}>{c.time}</p>
                  </div>
                  <p data-edit={`classes.classPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.classPrice}>{c.price}</p>
                  <p data-edit={`classes.classSeats.${i}`} data-edit-max="240" data-edit-multiline className={s.classSeats}>{c.seats}</p>
                </li>
              ))}
            </ol>

            <aside className={s.takeHome} aria-labelledby="take-h">
              <div data-edit-pattern="take.field" data-edit-roles="transparent,2,1" className={s.sift} aria-hidden="true">
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
              <h3 data-edit="take.takeTitle" data-edit-max="40" id="take-h" className={s.takeTitle}>You go home with</h3>
              <ul className={s.takeList}>
                {TAKE_HOME.map((item, i) => (
                  <li data-edit={`take.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <p data-edit="take.small" data-edit-max="240" data-edit-multiline className={s.small}>
                Book by email or at the counter. Cancel up to a week before for
                a full refund; after that we will move you to another date.
              </p>
            </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------- FLOURS */}
        <section id="flours" className={s.sec} aria-labelledby="flours-h">
          <div className={s.secHead}>
            <p data-edit="flours.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>06</p>
            <h2 data-edit="flours.title" data-edit-max="60" id="flours-h">What is in it</h2>
            <p data-edit="flours.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One mill, one room, flour in the air. Ask at the counter about a
              particular loaf and we will read you the recipe.
            </p>
          </div>
          <dl className={s.flours}>
            {FLOURS.map(([term, text], i) => (
              <div key={term}>
                <dt data-edit={`flours.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`flours.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>07</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Visit the counter</h2>
          </div>
          <div className={s.visit}>
            <dl className={s.hours}>
              {HOURS.map(([day, time], i) => (
                <div key={day}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                </div>
              ))}
            </dl>
            <div className={s.where}>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>8 Millrace Lane, Weirside</p>
              <p data-edit="visit.whereNote" data-edit-max="240" data-edit-multiline className={s.whereNote}>
                By the weir, in the brick building with the old wheel on the
                gable. Bicycle racks at the door, and the number 14 bus stops
                at Weir Bridge, two minutes away.
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550142290">(555) 014-2290</a>
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@ryeandlevain.example">hello@ryeandlevain.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Rye &amp; Levain</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional sourdough bakery and stone mill. The loaves, farms, prices and times are invented.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
        <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The loaf is a generated image, drawn in the page's own colors.</p>
      </footer>
    </div>
  );
}
