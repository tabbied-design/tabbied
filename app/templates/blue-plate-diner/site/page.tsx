import { TabbiedPattern } from 'tabbied/react';
import { damier, hourglass } from 'tabbied/patterns';
import s from './blue-plate-diner.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'The Blue Plate: All-day diner, Larkin Heights',
  description:
    'The Blue Plate has served eggs, burgers and pie at the corner of Mill Street and Route 9 since 1956. The weekday blue plate specials, the whole menu, the pie case and the hours.',
};

/* Site colors. The china plate lays its bowties in plate blue and navy on
   the cream of the well; the floor band is cherry and cream, with navy
   pips, the way the tiles by the register are. */
const CREAM = '#f7efdc';
const NAVY = '#1b2a4a';
const CHERRY = '#c62f36';
const PLATE = '#2f5da8';

const CHINA = [CREAM, PLATE, NAVY, CREAM, PLATE];
const FLOOR = [CREAM, CHERRY, NAVY];
const TRIM = [NAVY, PLATE, CREAM, CHERRY];

const NAV = [
  ['Specials', '#specials'],
  ['Menu', '#menu'],
  ['Pie case', '#pie'],
  ['Counter', '#counter'],
  ['Hours', '#hours'],
];

const FACTS = [
  ['Coffee', '$1.75, bottomless'],
  ['Breakfast', 'All day, every day'],
  ['Seats', '14 stools, 7 booths'],
];

type Special = {
  day: string;
  short: string;
  dish: string;
  sides: string;
};

const SPECIALS: Special[] = [
  { day: 'Monday', short: 'Mon', dish: 'Meatloaf and brown gravy', sides: 'Mashed potatoes, green beans, a dinner roll' },
  { day: 'Tuesday', short: 'Tue', dish: 'Chicken pot pie', sides: 'Baked in its own dish, with a side salad and cranberry' },
  { day: 'Wednesday', short: 'Wed', dish: 'Hot turkey, open-faced', sides: 'On white bread, gravy over all, peas and carrots' },
  { day: 'Thursday', short: 'Thu', dish: 'Pot roast', sides: 'In the oven since 5 am, carrots, potatoes, horseradish cream' },
  { day: 'Friday', short: 'Fri', dish: 'Haddock fish fry', sides: 'Two pieces, fries, cole slaw, tartar sauce and lemon' },
];

type Item = {
  name: string;
  note?: string;
  price: string;
};

type Group = {
  title: string;
  aside: string;
  items: Item[];
};

const MENU: Group[] = [
  {
    title: 'Eggs and the griddle',
    aside: 'served all day',
    items: [
      { name: 'Two eggs any style', note: 'home fries and toast', price: '8.75' },
      { name: 'The Route 9', note: 'three eggs, bacon or sausage, home fries, two pancakes', price: '13.25' },
      { name: 'Buttermilk pancakes', note: 'short stack or tall stack', price: '7.50 / 9.75' },
      { name: 'Corned beef hash', note: 'made here, crisped on the flat top, two eggs', price: '12.50' },
      { name: 'Denver omelet', note: 'ham, green pepper, onion, cheddar', price: '11.75' },
      { name: 'French toast', note: 'thick challah, cinnamon, powdered sugar', price: '9.50' },
      { name: 'Biscuits and gravy', note: 'sausage gravy, two biscuits', price: '8.95' },
    ],
  },
  {
    title: 'Sandwiches',
    aside: 'with chips and a pickle',
    items: [
      { name: 'Grilled cheese', note: 'American and cheddar on white', price: '7.25' },
      { name: 'BLT', note: 'thick bacon, toasted white', price: '9.50' },
      { name: 'Turkey club', note: 'three decks, bacon, mayo', price: '12.75' },
      { name: 'Patty melt', note: 'on rye, Swiss, griddled onions', price: '12.95' },
      { name: 'Tuna melt', note: 'on rye with tomato', price: '10.95' },
      { name: 'Reuben', note: 'corned beef, kraut, Swiss, Russian', price: '13.50' },
    ],
  },
  {
    title: 'For kids',
    aside: 'under ten, with milk or juice',
    items: [
      { name: 'Silver dollar pancakes', price: '6.50' },
      { name: 'Grilled cheese and fries', price: '6.50' },
      { name: 'Chicken fingers and fries', price: '6.50' },
    ],
  },
  {
    title: 'Burgers',
    aside: 'five ounces, smashed, with fries',
    items: [
      { name: 'Hamburger', note: 'lettuce, tomato, onion', price: '10.50' },
      { name: 'Cheeseburger', note: 'American, cheddar or Swiss', price: '11.25' },
      { name: 'The Blue Plate', note: 'two patties, onions griddled in, house sauce', price: '14.50' },
      { name: 'Black bean burger', note: 'made here, with pepper jack', price: '11.50' },
    ],
  },
  {
    title: 'On the side',
    aside: 'or as a meal',
    items: [
      { name: 'Home fries', price: '3.50' },
      { name: 'French fries', price: '3.75' },
      { name: 'Onion rings', price: '4.75' },
      { name: 'Cole slaw', price: '2.75' },
      { name: 'Soup of the day', note: 'cup or bowl', price: '4.25 / 6.50' },
    ],
  },
  {
    title: 'The fountain',
    aside: 'made at the counter',
    items: [
      { name: 'Milkshake', note: 'chocolate, vanilla, strawberry', price: '6.50' },
      { name: 'Malted', note: 'any shake, with malt', price: '7.00' },
      { name: 'Root beer float', price: '5.75' },
      { name: 'Egg cream', note: 'chocolate syrup, milk, seltzer', price: '4.25' },
      { name: 'Cherry cola', note: 'syrup and soda, the fountain way', price: '3.00' },
    ],
  },
];

type Pie = {
  name: string;
  kind: 'fruit' | 'berry' | 'cream' | 'nut';
  note: string;
};

const PIES: Pie[] = [
  { name: 'Apple', kind: 'fruit', note: 'lattice top, every day' },
  { name: 'Sour cherry', kind: 'fruit', note: 'lattice top, every day' },
  { name: 'Blueberry', kind: 'berry', note: 'double crust, every day' },
  { name: 'Peach', kind: 'fruit', note: 'June to September' },
  { name: 'Coconut cream', kind: 'cream', note: 'gone by 8 most nights' },
  { name: 'Chocolate cream', kind: 'cream', note: 'every day' },
  { name: 'Lemon meringue', kind: 'cream', note: 'Thursday to Sunday' },
  { name: 'Pecan', kind: 'nut', note: 'Friday to Sunday' },
];

const PIE_PRICES = [
  ['A slice', '$5.25'],
  ['A la mode', '+$1.75'],
  ['Whole fruit pie', '$26'],
  ['Whole cream pie', '$30'],
];

type Hand = {
  no: string;
  name: string;
  role: string;
  since: string;
  note: string;
};

const COUNTER: Hand[] = [
  { no: 'No. 0412', name: 'Dot Kowalski', role: 'Owner and pies', since: 'Since 1988', note: 'Bought the place from her father. In at 5 every morning for the pie case, out front by 7.' },
  { no: 'No. 0413', name: 'Earl Haines', role: 'Grill, weekdays', since: 'Since 1993', note: 'Thirty-one years on this flat top. Your eggs come out the way you asked or they go back on.' },
  { no: 'No. 0414', name: 'Rosa Delgado', role: 'Counter and booths', since: 'Since 2004', note: 'Pours your coffee before you sit. Ask her which pie is nearly gone.' },
  { no: 'No. 0415', name: 'Marcus Bell', role: 'Grill, nights and weekends', since: 'Since 2017', note: 'Burgers, patty melts and the midnight crowd on Fridays and Saturdays.' },
];

const HOURS = [
  ['Monday to Thursday', '6 am to 10 pm'],
  ['Friday and Saturday', '6 am to midnight'],
  ['Sunday', '7 am to 9 pm'],
];

const NOTES = [
  'Breakfast is served until the door locks.',
  'No reservations. Parties of eight or more, call ahead on a weekday and we will push the booths together.',
  'Cash and cards. Booths 1 to 4 are step-free from the side door.',
  'Parking for thirty cars in the lot out back, off Mill Street.',
];

export default function BluePlateDinerPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Yellowtail&family=Barlow+Condensed:ital,wght@0,500;0,600;0,700;0,800;1,600&family=Barlow:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">The Blue Plate</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550142290">(555) 014-2290</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ SIGN
            The sign over the door on the left, and on the right the plate
            the place is named for: a china rim of bowties around a cream
            well that carries the weekday special. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.sign}>
            <p className={s.script}>Eat at</p>
            <h1 id="hero-h" className={s.title}>The Blue Plate</h1>
            <p className={s.since}>Mill Street at Route 9, Larkin Heights. Same counter since 1956.</p>
            <p className={s.lede}>
              Eggs any way at any hour, a hot plate special every weekday
              from 11 to 3, and pie from the case until we lock the door.
            </p>
            <dl className={s.facts}>
              {FACTS.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.plate}>
            <div className={s.plateRim} aria-hidden="true">
              <TabbiedPattern
                pattern={hourglass}
                palette={CHINA}
                fit="grid"
                cellSize={40}
                seed="blue-plate-china"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.plateWell}>
              <p className={s.wellKicker}>Blue plate special</p>
              <p className={s.wellPrice}>$13.50</p>
              <p className={s.wellNote}>Weekdays 11 to 3, two sides and a roll</p>
            </div>
          </div>
        </section>

        {/* The floor by the register: cherry and cream, set between two
            chrome rails. */}
        <div className={s.floor} aria-hidden="true">
          <TabbiedPattern
            pattern={damier}
            palette={FLOOR}
            fit="grid"
            cellSize={32}
            seed="blue-plate-floor"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- SPECIALS */}
        <section id="specials" className={s.specials} aria-labelledby="specials-h">
          <div className={s.head}>
            <p className={s.scriptSmall}>Monday to Friday</p>
            <h2 id="specials-h">The blue plates</h2>
            <p className={s.headNote}>
              One hot plate a day, from 11 until the pan is empty or 3
              o'clock, whichever comes first. $13.50 with two sides and a
              roll, or $9.50 for the half plate. Weekends, the griddle is the
              special.
            </p>
          </div>
          <ol className={s.week}>
            {SPECIALS.map((d) => (
              <li key={d.day}>
                <div className={s.dish} aria-hidden="true">
                  <span className={s.dishDay}>{d.short}</span>
                </div>
                <p className={s.day}>{d.day}</p>
                <h3>{d.dish}</h3>
                <p className={s.sides}>{d.sides}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ MENU
            The laminated card on the counter: a navy sleeve around a cream
            sheet, two columns, dotted leaders to the price. */}
        <section id="menu" className={s.counterTop} aria-labelledby="menu-h">
          <div className={s.trim} aria-hidden="true">
            <TabbiedPattern
              pattern={hourglass}
              palette={TRIM}
              fit="grid"
              cellSize={28}
              seed="blue-plate-trim"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.card}>
            <div className={s.cardHead}>
              <h2 id="menu-h">Menu</h2>
              <p className={s.cardScript}>breakfast all day</p>
              <p className={s.cardNote}>Prices in dollars. Substitutions happily made.</p>
            </div>
            <div className={s.columns}>
              {MENU.map((g) => (
                <div className={s.group} key={g.title}>
                  <h3>{g.title}</h3>
                  <p className={s.groupAside}>{g.aside}</p>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <span className={s.itemName}>{it.name}</span>
                        <span className={s.leader} aria-hidden="true" />
                        <span className={s.itemPrice}>{it.price}</span>
                        {it.note ? <small className={s.itemNote}>{it.note}</small> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className={s.cardFoot}>
              Egg whites or turkey bacon, add $1. Gluten-free toast, add
              $1.50. Our fryer is shared, so nothing fried is gluten-free.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- PIE CASE */}
        <section id="pie" className={s.pie} aria-labelledby="pie-h">
          <div className={s.pieText}>
            <p className={s.scriptSmall}>Baked by Dot at 5 am</p>
            <h2 id="pie-h">The pie case</h2>
            <p className={s.headNote}>
              Eight pies in the case by 7 every morning. When a pie is gone it
              is gone until tomorrow, so if your heart is set on coconut cream,
              come before dinner or order a whole one.
            </p>
            <dl className={s.piePrices}>
              {PIE_PRICES.map(([what, price]) => (
                <div key={what}>
                  <dt>{what}</dt>
                  <dd>{price}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.case}>
            <ul className={s.shelf}>
              {PIES.map((p) => (
                <li key={p.name}>
                  <span className={`${s.pieDisc} ${s[p.kind]}`} aria-hidden="true" />
                  <strong>{p.name}</strong>
                  <small>{p.note}</small>
                </li>
              ))}
            </ul>
          </div>

          <form className={s.order} action="#">
            <div className={s.orderHead}>
              <h3>Order a whole pie</h3>
              <p className={s.formNote}>A day's notice, please. We call to confirm, and you pay when you pick it up.</p>
            </div>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="bp-name">Name</label>
                <input id="bp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="bp-phone">Phone</label>
                <input id="bp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="bp-pie">Which pie</label>
                <select id="bp-pie" name="pie" defaultValue="Apple">
                  {PIES.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="bp-date">Pick-up day</label>
                <input id="bp-date" name="date" type="date" />
              </div>
            </div>
            <button className={s.submit} type="submit">Hold my pie</button>
          </form>
        </section>

        {/* --------------------------------------------------------- COUNTER
            The people, each on a guest check from the pad by the register. */}
        <section id="counter" className={s.counter} aria-labelledby="counter-h">
          <div className={s.head}>
            <p className={s.scriptSmall}>Who is working</p>
            <h2 id="counter-h">Behind the counter</h2>
          </div>
          <ul className={s.checks}>
            {COUNTER.map((c) => (
              <li key={c.name} className={s.check}>
                <p className={s.checkTop}>
                  <span>Guest check</span>
                  <span>{c.no}</span>
                </p>
                <h3>{c.name}</h3>
                <p className={s.checkRole}>{c.role}</p>
                <p className={s.checkNote}>{c.note}</p>
                <p className={s.checkSince}>{c.since}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hours} aria-labelledby="hours-h">
          <div className={s.board}>
            <h2 id="hours-h">Open</h2>
            <dl>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.boardNote}>The grill stops 15 minutes before we close. Pie does not.</p>
          </div>
          <div className={s.find}>
            <p className={s.scriptSmall}>Find us</p>
            <p className={s.address}>411 Mill Street, at Route 9</p>
            <p className={s.town}>Larkin Heights</p>
            <p className={s.contact}>
              <a href="tel:+15550142290">(555) 014-2290</a>
            </p>
            <p className={s.contact}>
              <a href="mailto:dot@theblueplate.example">dot@theblueplate.example</a>
            </p>
            <ul className={s.notes}>
              {NOTES.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className={s.floor} aria-hidden="true">
          <TabbiedPattern
            pattern={damier}
            palette={FLOOR}
            fit="grid"
            cellSize={32}
            seed="blue-plate-door"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>The Blue Plate</p>
        <p>A fictional all-day diner. The menu, the people and the prices are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
