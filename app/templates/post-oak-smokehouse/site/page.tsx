import { TabbiedPattern } from 'tabbied/react';
import { drypoint } from 'tabbied/patterns';
import s from './post-oak-smokehouse.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Post Oak Smokehouse: Texas barbecue, Ferris Road',
  description:
    'Post Oak Smokehouse smokes brisket, ribs, sausage and turkey over split post oak and sells it by the half pound until it runs out. The board, the sold-out tally, the pit schedule and catering by the pound.',
};

/* Site colors. Every field is drypoint, the engraver's hatching, drawn in
   the char ink on a transparent ground so the paper behind it shows through
   like the uncut wood of a block. The red comes in rarely, as it would on a
   two-color handbill. */
const CHAR = '#1b1612';
const RED = '#9e2418';
const SMOKE = '#6f5a45';

const WOODCUT = ['transparent', CHAR, CHAR, CHAR, SMOKE, CHAR];
const GRAIN = ['transparent', CHAR, SMOKE, CHAR, SMOKE, CHAR];
const FIREBOX = ['transparent', CHAR, CHAR, RED, CHAR, CHAR];

const NAV = [
  ['The board', '#board'],
  ['Sold-out tally', '#tally'],
  ['The pit', '#pit'],
  ['Sides', '#sides'],
  ['Catering', '#catering'],
  ['The line', '#line'],
  ['Find us', '#find'],
];

const BILL_TOP = ['Texas barbecue', 'Ferris Road, Millbrook', 'Since 2016'];

const FACTS = [
  ['Open', 'Thursday to Sunday'],
  ['From', '11 am till sold out'],
  ['Find us', '2210 Ferris Road'],
];

type Meat = {
  name: string;
  note: string;
  price: string;
  per: string;
  days: string;
};

const BOARD: Meat[] = [
  { name: 'Brisket', note: 'Moist from the point or lean from the flat. Salt, coarse pepper and fourteen hours.', price: '$17', per: 'half pound', days: 'Every day we open' },
  { name: 'Pork spare ribs', note: 'St. Louis cut, about three bones to the half pound, black pepper and a little brown sugar.', price: '$14', per: 'half pound', days: 'Every day we open' },
  { name: 'Beef short rib', note: 'One bone with a pound and a quarter of meat on it. Split it or do not.', price: '$36', per: 'the bone', days: 'Thursday and Saturday' },
  { name: 'Burnt ends', note: 'Cubed brisket point, back on the pit with a spoon of sauce until the edges candy.', price: '$15', per: 'half pound', days: 'Saturday only' },
  { name: 'Turkey breast', note: 'Brined overnight, butter at the wrap. The one people do not expect to like.', price: '$12', per: 'half pound', days: 'Every day we open' },
  { name: 'Pulled pork', note: 'Shoulder, pulled by hand at the block, with a splash of the vinegar mop.', price: '$11', per: 'half pound', days: 'Every day we open' },
  { name: 'Beef sausage', note: 'Coarse ground and stuffed here on Tuesdays, natural casing, a proper snap.', price: '$7', per: 'the link', days: 'Every day we open' },
  { name: 'Jalapeno cheddar', note: 'The same link with sharp cheddar and fresh jalapeno folded through.', price: '$8', per: 'the link', days: 'Every day we open' },
];

/* The tally on the wall by the cutting block: days each meat ran out before
   we closed, September so far (fourteen days open). */
const TALLY_RAW = [
  { name: 'Brisket', count: 11, earliest: '12:35 pm' },
  { name: 'Beef short rib', count: 7, earliest: '11:48 am' },
  { name: 'Pork spare ribs', count: 7, earliest: '1:05 pm' },
  { name: 'Jalapeno cheddar', count: 5, earliest: '1:40 pm' },
  { name: 'Burnt ends', count: 3, earliest: '12:10 pm' },
  { name: 'Beef sausage', count: 3, earliest: '2:50 pm' },
  { name: 'Turkey breast', count: 2, earliest: '1:50 pm' },
  { name: 'Pulled pork', count: 0, earliest: 'Not yet' },
];

const TALLY = TALLY_RAW.map((t) => ({
  ...t,
  total: `${t.count} of 14`,
  fives: Array.from({ length: Math.floor(t.count / 5) }, (_, k) => `five-${k}`),
  rest: t.count % 5,
}));

/* Last Saturday, 11 am to 3 pm: when each meat ran out, as a share of the
   four hours. */
const SATURDAY = [
  { time: '11:48', what: 'Beef short rib', at: 20 },
  { time: '12:10', what: 'Burnt ends', at: 29.2 },
  { time: '12:35', what: 'Brisket', at: 39.6 },
  { time: '1:05', what: 'Pork spare ribs', at: 52.1 },
  { time: '1:40', what: 'Jalapeno cheddar', at: 66.7 },
  { time: '2:15', what: 'Turkey breast', at: 81.3 },
  { time: '2:50', what: 'Beef sausage', at: 95.8 },
];

const AXIS = ['11 am', 'Noon', '1 pm', '2 pm', '3 pm'];

const WEEK = [
  { day: 'Mon', what: 'Splitting wood', open: false },
  { day: 'Tue', what: 'Sausage day', open: false },
  { day: 'Wed', what: 'Trim, season, fire at 10 pm', open: false },
  { day: 'Thu', what: 'Open 11 till sold out', open: true },
  { day: 'Fri', what: 'Open 11 till sold out', open: true },
  { day: 'Sat', what: 'Open 10:30 till sold out', open: true },
  { day: 'Sun', what: 'Open 11 till 3, or sold out', open: true },
];

const PIT = [
  { time: '10 pm', title: 'Fire lit', note: 'Split post oak, seasoned a year in the yard. Never anything else, not even to get it going.' },
  { time: '11 pm', title: 'Briskets on', note: 'Forty of them, fat side up, salt and coarse black pepper. The night shift holds the pit at 275.' },
  { time: '4 am', title: 'Ribs on', note: 'Pork ribs every night, and the beef short ribs before a Thursday or a Saturday.' },
  { time: '6 am', title: 'Briskets wrapped', note: 'In butcher paper, once the bark is set hard and does not smear under a thumb.' },
  { time: '7 am', title: 'Turkey and links on', note: 'The sausage hangs at the cool end, away from the firebox.' },
  { time: '9:30', title: 'Briskets rest', note: 'Off the pit and into the warmer for at least ninety minutes. The step nobody here skips.' },
  { time: '11 am', title: 'First slice', note: 'The line has usually been there since ten.' },
];

const SIDES = [
  ['Pinto beans', 'Slow, with brisket trim and dried chile', '$4', '$7', '$13'],
  ['Potato salad', 'Yellow mustard, egg, dill pickle', '$4', '$7', '$13'],
  ['Vinegar slaw', 'No mayonnaise, plenty of celery seed', '$4', '$7', '$13'],
  ['Mac and cheese', 'Baked in a hotel pan, crust on top', '$5', '$9', '$16'],
  ['Collard greens', 'Cooked down with smoked turkey', '$5', '$9', '$16'],
];

const AFTER = [
  ['Banana pudding', 'Made every morning, vanilla wafers', '$5'],
  ['Peach cobbler', 'Saturday and Sunday', '$6'],
  ['Pecan pie', 'By the slice, from Mrs. Pruitt', '$6'],
];

const DRINKS = [
  ['Sweet or unsweet tea', 'Refills are free', '$3'],
  ['Cane sugar cola', 'In the glass bottle', '$3.50'],
  ['Lager on tap', 'From the brewery next door', '$6'],
];

const PER_POUND = [
  ['Brisket, whole or sliced', '$32'],
  ['Pork spare ribs', '$27'],
  ['Turkey breast', '$23'],
  ['Pulled pork', '$21'],
  ['Sausage, four links', '$13'],
  ['Any side, by the gallon', '$38'],
];

const GUESTS = [
  ['10', '5 lb', '2 quarts each of 2 sides', '$200'],
  ['25', '12 lb', 'A gallon each of 2 sides', '$420'],
  ['50', '22 lb', 'A gallon each of 3 sides', '$730'],
  ['100', '40 lb', 'Two gallons each of 3 sides', '$1,350'],
];

const TERMS = [
  'Ten pounds minimum. Three days of notice, a week for fifty guests or more.',
  'Pick up between 9:30 and 10:30 am, Thursday to Sunday, at the side door, before the line.',
  'Delivery inside ten miles is $40. We drop it off hot; we do not serve.',
  'It comes sliced or whole in foil pans under butcher paper, with bread, pickles, onions, sauce and a knife.',
  'Half down when you book. Cancel two days ahead and you get all of it back.',
];

const FAQ = [
  ['What time should I get here?', 'On a Saturday, by 10:30 if you want beef rib. On Thursday and Sunday you can usually walk up at noon and have your pick of everything except the rib.'],
  ['Can one person hold a place for friends?', 'One person can hold for up to four. Past that the people behind you get a say, and they will use it.'],
  ['Can I order ahead and skip the line?', 'Only for catering, ten pounds and up. Everyone else stands in the same line as the pitmaster\'s mother, who comes every Sunday.'],
  ['What happens when something sells out?', 'We walk the line and say what is left, so nobody waits forty minutes for a brisket that is gone. The sign on the door flips when the last tray goes.'],
  ['Is there anything without meat?', 'The slaw, the potato salad, the mac and cheese, the pie and the pudding. The beans and the collards both have meat in them.'],
  ['Are kids and dogs welcome?', 'Both, at the tables outside under the tin roof. There is a water bowl by the door and a high chair behind the counter.'],
];

const HOURS = [
  ['Monday to Wednesday', 'Closed, the pit is not'],
  ['Thursday', '11 am till sold out'],
  ['Friday', '11 am till sold out'],
  ['Saturday', '10:30 am till sold out'],
  ['Sunday', '11 am to 3 pm, or sold out'],
];

export default function PostOakSmokehousePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Ultra&family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Post Oak</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ HANDBILL */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.bill}>
            <ul className={s.billTop}>
              {BILL_TOP.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h1 id="hero-h" className={s.name}>
              Post Oak <em>Smokehouse</em>
            </h1>
            <p className={s.strap}>Brisket, ribs, sausage and turkey</p>
            <p className={s.lede}>
              Smoked fourteen hours over split post oak and nothing else, cut
              to order on butcher paper and sold by the half pound. We open at
              eleven and close when the last brisket goes, which on a Saturday
              is about half past twelve.
            </p>
            <dl className={s.facts}>
              {FACTS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={s.ctas}>
              <a className={s.btn} href="#board">See the board</a>
              <a className={s.btnGhost} href="#catering">Catering by the pound</a>
            </p>
          </div>

          <div className={s.cut}>
            <div className={s.plate} aria-hidden="true">
              <TabbiedPattern
                pattern={drypoint}
                palette={WOODCUT}
                fit="grid"
                cellSize={44}
                seed="post-oak-plate"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.stamp}>
              <span>Sold by the</span>
              <strong>1/2 lb</strong>
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- BOARD */}
        <section id="board" className={s.board} aria-labelledby="board-h">
          <div className={s.wrap}>
            <div className={s.boardHead}>
              <h2 id="board-h">The board</h2>
              <p className={s.boardNote}>
                Everything is priced by weight and cut in front of you. Tell
                the cutter fatty or lean and how much; it gets weighed on the
                paper and that is what you pay.
              </p>
            </div>
            <ul className={s.meats}>
              {BOARD.map((m) => (
                <li key={m.name} className={s.meat}>
                  <h3>{m.name}</h3>
                  <span className={s.leader} aria-hidden="true" />
                  <strong className={s.price}>{m.price}</strong>
                  <p className={s.meatNote}>{m.note}</p>
                  <small className={s.per}>{m.per}</small>
                  <p className={s.days}>{m.days}</p>
                </li>
              ))}
            </ul>
            <p className={s.free}>
              Free on every tray: white bread, dill pickles, raw onion and
              pickled jalapenos. There are no plates and no combos, so order a
              little of a lot.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- TALLY */}
        <section id="tally" className={s.sec} aria-labelledby="tally-h">
          <div className={s.secHead}>
            <p className={s.kicker}>On the wall by the cutting block</p>
            <h2 id="tally-h">The sold-out tally</h2>
            <p className={s.secNote}>
              A chalk mark for every day a meat ran out before we closed. It
              is September, we have opened fourteen days so far, and the
              brisket has made it to closing three times.
            </p>
          </div>

          <table className={s.tally}>
            <caption className={s.srOnly}>Days each meat sold out in September, and the earliest it went</caption>
            <thead>
              <tr>
                <th scope="col">Meat</th>
                <th scope="col">Marks on the wall</th>
                <th scope="col">Days</th>
                <th scope="col">Earliest gone</th>
              </tr>
            </thead>
            <tbody>
              {TALLY.map((t) => (
                <tr key={t.name}>
                  <th scope="row">{t.name}</th>
                  <td className={s.marksCell}>
                    <span className={s.marks} aria-hidden="true">
                      {t.fives.map((k) => (
                        <span key={k} className={s.five} />
                      ))}
                      {t.rest > 0 ? <span className={`${s.rest} ${s[`r${t.rest}`]}`} /> : null}
                    </span>
                  </td>
                  <td className={s.count}>{t.total}</td>
                  <td className={s.earliest}>{t.earliest}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={s.saturday}>
            <h3>Last Saturday, by the clock</h3>
            <p className={s.satNote}>Doors at 10:30, sixty-four people in line. This is when each tray came off the board.</p>
            <ol className={s.clock}>
              {SATURDAY.map((e) => (
                <li key={e.what} style={{ '--at': `${e.at}%` } as React.CSSProperties}>
                  <time>{e.time}</time>
                  <span>{e.what}</span>
                </li>
              ))}
            </ol>
            <ul className={s.axis} aria-hidden="true">
              {AXIS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* The woodcut band: a strip of the block, laid across the page. */}
        <div className={s.woodBand} aria-hidden="true">
          <TabbiedPattern
            pattern={drypoint}
            palette={GRAIN}
            fit="grid"
            cellSize={40}
            seed="post-oak-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- PIT */}
        <section id="pit" className={`${s.sec} ${s.pit}`} aria-labelledby="pit-h">
          <div className={s.pitSide}>
            <p className={s.kicker}>Wednesday night to Sunday afternoon</p>
            <h2 id="pit-h">The pit schedule</h2>
            <p className={s.secNote}>
              One thousand-gallon offset pit, welded from a propane tank in
              2015, and two people who take turns sleeping on the cot in the
              office. The fire is never left alone.
            </p>
            <ol className={s.week}>
              {WEEK.map((d) => (
                <li key={d.day} className={d.open ? s.dayOpen : s.dayShut}>
                  <span className={s.wd}>{d.day}</span>
                  <span className={s.wdWhat}>{d.what}</span>
                </li>
              ))}
            </ol>
            <div className={s.firebox} aria-hidden="true">
              <TabbiedPattern
                pattern={drypoint}
                palette={FIREBOX}
                fit="grid"
                cellSize={36}
                seed="post-oak-firebox"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>

          <ol className={s.timeline}>
            {PIT.map((p) => (
              <li key={p.title}>
                <time className={s.pitTime}>{p.time}</time>
                <div className={s.pitBody}>
                  <h3>{p.title}</h3>
                  <p>{p.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- SIDES */}
        <section id="sides" className={s.sec} aria-labelledby="sides-h">
          <div className={s.secHead}>
            <p className={s.kicker}>Made in the back kitchen every morning</p>
            <h2 id="sides-h">Sides, sweets and something cold</h2>
          </div>

          <div className={s.sheet}>
            <table className={s.sides}>
              <caption className={s.srOnly}>Sides by the half pint, pint and quart</caption>
              <thead>
                <tr>
                  <th scope="col">Side</th>
                  <th scope="col">Half pint</th>
                  <th scope="col">Pint</th>
                  <th scope="col">Quart</th>
                </tr>
              </thead>
              <tbody>
                {SIDES.map(([name, note, a, b, c]) => (
                  <tr key={name}>
                    <th scope="row">
                      <span className={s.sideName}>{name}</span>
                      <span className={s.sideNote}>{note}</span>
                    </th>
                    <td>{a}</td>
                    <td>{b}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={s.extras}>
              <h3 className={s.extrasTitle}>After</h3>
              <dl className={s.priced}>
                {AFTER.map(([name, note, price]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd className={s.pricedNote}>{note}</dd>
                    <dd className={s.pricedPrice}>{price}</dd>
                  </div>
                ))}
              </dl>
              <h3 className={s.extrasTitle}>To drink</h3>
              <dl className={s.priced}>
                {DRINKS.map(([name, note, price]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd className={s.pricedNote}>{note}</dd>
                    <dd className={s.pricedPrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ CATERING */}
        <section id="catering" className={s.sec} aria-labelledby="catering-h">
          <div className={s.secHead}>
            <p className={s.kicker}>For weddings, wakes and the office</p>
            <h2 id="catering-h">Catering by the pound</h2>
            <p className={s.secNote}>
              Figure half a pound of meat a guest before sides, a third if
              there is plenty else on the table. Brisket and ribs is the
              order most people land on.
            </p>
          </div>

          <div className={s.caterGrid}>
            <div className={s.caterInfo}>
              <h3 className={s.label}>Meat and sides, per pound</h3>
              <dl className={s.perLb}>
                {PER_POUND.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>

              <h3 className={s.label}>How much to order</h3>
              <table className={s.guests}>
                <caption className={s.srOnly}>Meat and sides by guest count, with a rough total</caption>
                <thead>
                  <tr>
                    <th scope="col">Guests</th>
                    <th scope="col">Meat</th>
                    <th scope="col">Sides</th>
                    <th scope="col">About</th>
                  </tr>
                </thead>
                <tbody>
                  {GUESTS.map(([g, meat, sides, total]) => (
                    <tr key={g}>
                      <th scope="row">{g}</th>
                      <td>{meat}</td>
                      <td>{sides}</td>
                      <td>{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className={s.terms}>
                {TERMS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <form className={s.form} action="#">
              <div className={s.formStrip} aria-hidden="true">
                <TabbiedPattern
                  pattern={drypoint}
                  palette={WOODCUT}
                  fit="grid"
                  cellSize={32}
                  seed="post-oak-order"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.formBody}>
                <h3 className={s.formTitle}>Order ticket</h3>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label htmlFor="po-name">Name</label>
                    <input id="po-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="po-phone">Phone</label>
                    <input id="po-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="po-date">Day you need it</label>
                    <input id="po-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="po-guests">Guests</label>
                    <input id="po-guests" name="guests" type="number" min="10" inputMode="numeric" />
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label htmlFor="po-how">Pick up or delivery</label>
                    <select id="po-how" name="how" defaultValue="pickup">
                      <option value="pickup">Pick up at the side door</option>
                      <option value="delivery">Delivery inside ten miles, $40</option>
                    </select>
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label htmlFor="po-what">What and how much</label>
                    <textarea id="po-what" name="what" rows={3} />
                  </div>
                </div>
                <button className={s.submit} type="submit">Send the ticket</button>
                <p className={s.small}>Lo calls back within a day to confirm and take the deposit. Nothing goes on the pit until she has.</p>
              </div>
            </form>
          </div>
        </section>

        {/* ---------------------------------------------------------- LINE */}
        <section id="line" className={s.sec} aria-labelledby="line-h">
          <div className={s.secHead}>
            <p className={s.kicker}>Questions we answer every weekend</p>
            <h2 id="line-h">The line</h2>
          </div>
          <div className={s.faq}>
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- FIND */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.secHead}>
            <p className={s.kicker}>Past the rail crossing</p>
            <h2 id="find-h">Find us</h2>
          </div>
          <div className={s.findGrid}>
            <div className={s.sign}>
              <p className={s.signAddr}>2210 Ferris Road</p>
              <p className={s.signSub}>In the old feed store, Millbrook</p>
              <p className={s.signLinks}>
                <a href="tel:+15550142210">(555) 014-2210</a>
                <a href="mailto:pit@postoaksmokehouse.example">pit@postoaksmokehouse.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <div className={s.findNotes}>
              <p>
                Card and cash. Gravel lot out front; on Saturdays the church
                across the road lets us use theirs, on Sundays it does not.
              </p>
              <p>
                Tables outside under the roof, fans in summer and heaters in
                winter. We pick up the phone after two, once the rush is done.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Post Oak Smokehouse</p>
        <p>A fictional Texas barbecue joint. The meats, prices, times and people are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
