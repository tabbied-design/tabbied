import { TabbiedPattern } from 'tabbied/react';
import { roundstep, ivy } from 'tabbied/patterns';
import s from './beet-street-grocer.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Beet Street Grocer: Greengrocer, Market Hill',
  description:
    "Beet Street Grocer sells fruit and vegetables from six farms within forty miles of Market Hill. Today's board, what is in season month by month, weekly veg boxes, the farms and the shop hours.",
};

/* Site colors. The crate fields lay leaves in beet, leaf and carrot on a
   transparent ground, so the board or the crate shows between them. */
const SLATE = '#1f2a27';
const CHALK = '#ece8dc';
const BEET = '#b0305a';
const LEAF = '#7aa35a';
const CARROT = '#e58a3a';

const CRATE = ['transparent', BEET, LEAF, CARROT, LEAF, CHALK];
const ROW = ['transparent', LEAF, BEET, LEAF, CARROT];
const GREENS = ['transparent', LEAF, CHALK, LEAF, BEET];

const NAV = [
  ["Today's board", '#board'],
  ['In season', '#season'],
  ['Veg boxes', '#boxes'],
  ['Farms', '#farms'],
  ['Visit', '#visit'],
];

type Item = { name: string; from: string; price: string; unit: string };
type Group = { title: string; items: Item[] };

const BOARD: Group[] = [
  {
    title: 'Roots',
    items: [
      {
        name: 'Beets, red and golden',
        from: 'Hollow Creek',
        price: '$2.50',
        unit: 'bunch',
      },
      {
        name: 'Carrots, tops on',
        from: 'Hollow Creek',
        price: '$3',
        unit: 'bunch',
      },
      { name: 'New potatoes', from: 'Ridgeback', price: '$1.80', unit: 'lb' },
      { name: 'Red onions', from: 'Ridgeback', price: '$1.50', unit: 'lb' },
      {
        name: 'Garlic, hardneck',
        from: 'Two Crows',
        price: '$1',
        unit: 'head',
      },
    ],
  },
  {
    title: 'Greens',
    items: [
      { name: 'Lacinato kale', from: 'Two Crows', price: '$3', unit: 'bunch' },
      { name: 'Salad mix', from: 'Meadowlark', price: '$6', unit: 'half lb' },
      { name: 'Spinach', from: 'Meadowlark', price: '$5', unit: 'half lb' },
      { name: 'Rainbow chard', from: 'Two Crows', price: '$3', unit: 'bunch' },
      {
        name: 'Parsley, dill, cilantro',
        from: 'Two Crows',
        price: '$2',
        unit: 'bunch',
      },
    ],
  },
  {
    title: 'Fruit',
    items: [
      {
        name: 'Honeycrisp apples',
        from: 'Orchard Hill',
        price: '$2.80',
        unit: 'lb',
      },
      {
        name: 'Bartlett pears',
        from: 'Orchard Hill',
        price: '$2.40',
        unit: 'lb',
      },
      {
        name: 'Heirloom tomatoes',
        from: 'Sunny Acre',
        price: '$4',
        unit: 'lb',
      },
      {
        name: 'Concord grapes',
        from: 'Stone Wall',
        price: '$4.50',
        unit: 'quart',
      },
    ],
  },
  {
    title: 'Pantry',
    items: [
      {
        name: 'Eggs, pastured',
        from: 'Meadowlark',
        price: '$7',
        unit: 'dozen',
      },
      {
        name: 'Wildflower honey',
        from: 'Bee Line',
        price: '$12',
        unit: 'lb jar',
      },
      {
        name: 'Apple cider, unfiltered',
        from: 'Orchard Hill',
        price: '$6',
        unit: 'half gal',
      },
      {
        name: 'Sweet corn, last of it',
        from: 'Sunny Acre',
        price: '$0.75',
        unit: 'ear',
      },
    ],
  },
];

const SPECIALS = [
  ['Sauce tomatoes', 'Seconds, a bit split, perfect for the pot', '$15', 'the 10 lb box'],
  ['Beets', 'Any color, while they last', '2 for $4', 'bunches'],
  ['Honeycrisp', 'First of the year, picked Tuesday', '$2.80', 'a pound'],
];

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/* One letter a month: o fresh from the field, s from the farm's store,
   a dot for none. */
const SEASON = [
  { name: 'Asparagus', kind: 'green', months: '...ooo......' },
  { name: 'Rhubarb', kind: 'fruit', months: '...ooo......' },
  { name: 'Peas', kind: 'green', months: '.....oo.....' },
  { name: 'Strawberries', kind: 'fruit', months: '.....oo.....' },
  { name: 'Zucchini', kind: 'green', months: '.....oooo...' },
  { name: 'Tomatoes', kind: 'fruit', months: '......ooo...' },
  { name: 'Sweet corn', kind: 'root', months: '......ooo...' },
  { name: 'Kale', kind: 'green', months: 'o...oo..oooo' },
  { name: 'Beets', kind: 'root', months: 'ss...oooooos' },
  { name: 'Carrots', kind: 'root', months: 'sss..oooooos' },
  { name: 'Potatoes', kind: 'root', months: 'sss...ooooos' },
  { name: 'Apples', kind: 'fruit', months: 'sss....ooooo' },
  { name: 'Pears', kind: 'fruit', months: '.......ooos.' },
  { name: 'Winter squash', kind: 'root', months: 'ss......ooos' },
];

const NOW = 8;

const BOXES = [
  {
    size: 'Small',
    price: '$22',
    who: 'For one or two',
    what: '6 to 7 kinds, about 6 lb',
  },
  {
    size: 'Medium',
    price: '$32',
    who: 'For two or three',
    what: '8 to 9 kinds, about 9 lb',
  },
  {
    size: 'Large',
    price: '$44',
    who: 'For a family',
    what: '10 to 12 kinds, about 13 lb',
  },
];

const THIS_WEEK = [
  'Beets, a bunch',
  'Carrots, a bunch',
  'New potatoes, 2 lb',
  'Lacinato kale',
  'Salad mix, half lb',
  'Red onions, 1 lb',
  'Honeycrisp apples, 2 lb',
  'Garlic, a head',
  'Parsley',
];

const BOX_RULES = [
  'Order, change or skip by Tuesday noon, online or at the till.',
  'Pick up Thursday 3 to 7 pm, or any time Friday and Saturday.',
  'Delivered Thursday evening within three miles, for $4.',
  'Paid week by week. No sign-up fee, stop whenever you like.',
];

const ADD_ONS = [
  ['Fruit bag', '$10'],
  ['Dozen eggs', '$7'],
  ['Honey, 1 lb', '$12'],
];

const FARMS = [
  {
    miles: '4',
    name: 'Two Crows Garden',
    grows: 'Kale, chard, garlic, herbs',
    note: 'Two acres behind the old mill. Delivered by bike trailer, three mornings a week.',
  },
  {
    miles: '9',
    name: 'Hollow Creek Farm',
    grows: 'Beets, carrots, leeks',
    note: 'Rosa and Tom Alder. On our first delivery in 2014, and every one since.',
  },
  {
    miles: '14',
    name: 'Sunny Acre',
    grows: 'Tomatoes, peppers, sweet corn',
    note: 'Grown in hoop houses, so the tomatoes start early and finish late.',
  },
  {
    miles: '22',
    name: 'Meadowlark Farm',
    grows: 'Salad, spinach, eggs',
    note: 'The hens move across the pasture in a trailer. The salad is cut the morning it comes.',
  },
  {
    miles: '31',
    name: 'Ridgeback Farm',
    grows: 'Potatoes, onions, squash',
    note: 'Stores its crops in a cold barn, which is how we have carrots in February.',
  },
  {
    miles: '38',
    name: 'Orchard Hill',
    grows: 'Apples, pears, cider',
    note: 'Forty-one kinds of apple. We carry six at a time and change them as they come.',
  },
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Friday', '7 am to 7 pm'],
  ['Saturday', '7 am to 5 pm'],
  ['Sunday', '9 am to 3 pm'],
];

export default function BeetStreetGrocerPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Cabin:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700&family=Caveat:wght@400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          Beet Street Grocer
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------- THE A-FRAME */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.hand}>Fruit, veg and a few good things, since 2014</p>
            <h1 id="hero-h" className={s.name}>
              <em>Beet</em> Street Grocer
            </h1>
            <p className={s.lede}>
              A corner shop on Market Hill that sells what six farms within forty miles picked this week. The board
              changes every morning at seven, when the vans have been.
            </p>
            <ul className={s.facts}>
              <li>Open 7 to 7, Tuesday to Friday</li>
              <li>SNAP doubled on fruit and veg</li>
              <li>Veg boxes every Thursday</li>
            </ul>
          </div>

          <div className={s.crateWrap}>
            <div className={s.crate} aria-hidden="true">
              <TabbiedPattern
                pattern={roundstep}
                palette={CRATE}
                fit="grid"
                cellSize={60}
                seed="beet-crate"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.priceCard}>
              <p className={s.cardName}>Beets</p>
              <p className={s.cardPrice}>$2.50</p>
              <p className={s.cardUnit}>a bunch, Hollow Creek, 9 miles</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- THE BOARD */}
        <section id="board" className={s.boardSec} aria-labelledby="board-h">
          <div className={s.frame}>
            <div className={s.boardHead}>
              <h2 id="board-h" className={s.boardTitle}>
                Today's board
              </h2>
              <p className={s.boardDate}>Friday the 26th. Chalked at 7:10</p>
            </div>
            <div className={s.groups}>
              {BOARD.map((g) => (
                <div key={g.title} className={s.group}>
                  <h3 className={s.groupTitle}>{g.title}</h3>
                  <ul className={s.items}>
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <span className={s.itemName}>{it.name}</span>
                        <span className={s.itemPrice}>{it.price}</span>
                        <span className={s.itemFrom}>{it.from}</span>
                        <span className={s.itemUnit}>{it.unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <ul className={s.specials}>
            {SPECIALS.map(([name, note, price, unit]) => (
              <li key={name} className={s.special}>
                <p className={s.specialName}>{name}</p>
                <p className={s.specialPrice}>{price}</p>
                <p className={s.specialUnit}>{unit}</p>
                <p className={s.specialNote}>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ LEAF BAND */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={roundstep}
            palette={ROW}
            fit="grid"
            cellSize={44}
            seed="beet-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- IN SEASON */}
        <section id="season" className={s.sec} aria-labelledby="season-h">
          <div className={s.secHead}>
            <p className={s.hand}>Month by month</p>
            <h2 id="season-h">What is in season, and when</h2>
            <p className={s.secNote}>
              A solid line is picked that week. A dashed one comes out of a farm's cold store, which is how we have
              carrots in February and no tomatoes in March. We are in September.
            </p>
          </div>

          <div className={s.chartWrap}>
            <table className={s.chart}>
              <caption className={s.srOnly}>Months each crop is in the shop, fresh or from store</caption>
              <thead>
                <tr>
                  <th scope="col" className={s.cropHead}>
                    Crop
                  </th>
                  {MONTHS.map((m, i) => (
                    <th key={MONTH_NAMES[i]} scope="col" className={i === NOW ? s.nowHead : undefined}>
                      <span aria-hidden="true">{m}</span>
                      <span className={s.srOnly}>{MONTH_NAMES[i]}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SEASON.map((c) => (
                  <tr key={c.name} className={s[c.kind]}>
                    <th scope="row">{c.name}</th>
                    {c.months.split('').map((m, j) => (
                      <td
                        key={MONTH_NAMES[j]}
                        className={`${m === 'o' ? s.fresh : m === 's' ? s.stored : s.none} ${
                          j === NOW ? s.nowCol : ''
                        }`}
                      >
                        <span className={s.srOnly}>{m === 'o' ? 'Fresh' : m === 's' ? 'From store' : 'None'}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={s.key}>
            <li className={s.keyRoot}>Roots and corn</li>
            <li className={s.keyGreen}>Greens and pods</li>
            <li className={s.keyFruit}>Fruit</li>
            <li className={s.keyStore}>From the cold store</li>
          </ul>
        </section>

        {/* ------------------------------------------------------- VEG BOXES */}
        <section id="boxes" className={s.sec} aria-labelledby="boxes-h">
          <div className={s.secHead}>
            <p className={s.hand}>Every Thursday</p>
            <h2 id="boxes-h">Veg boxes, three sizes</h2>
            <p className={s.secNote}>
              We pack whatever the farms sent that week, heavier on what is at its best. Bring the crate back and we use
              it again.
            </p>
          </div>

          <div className={s.boxGrid}>
            <div className={s.boxLeft}>
              <ul className={s.crates}>
                {BOXES.map((b) => (
                  <li key={b.size} className={s.crateCard}>
                    <div className={s.plate}>
                      <h3>{b.size}</h3>
                      <p className={s.platePrice}>{b.price}</p>
                      <p className={s.plateWho}>{b.who}</p>
                      <p className={s.plateWhat}>{b.what}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <ol className={s.rules}>
                {BOX_RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
            </div>

            <div className={s.thisWeek}>
              <div className={s.weekField} aria-hidden="true">
                <TabbiedPattern
                  pattern={ivy}
                  palette={GREENS}
                  fit="grid"
                  cellSize={48}
                  seed="beet-week"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.weekList}>
                <h3 className={s.weekTitle}>In this week's medium box</h3>
                <ul>
                  {THIS_WEEK.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                <dl className={s.addOns}>
                  {ADD_ONS.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- FARMS */}
        <section id="farms" className={s.sec} aria-labelledby="farms-h">
          <div className={s.secHead}>
            <p className={s.hand}>Nearest first</p>
            <h2 id="farms-h">The six farms we buy from</h2>
            <p className={s.secNote}>
              We pay what the farm asks, on the day it delivers. Everything on the board says where it grew; if it does
              not, ask, and we will tell you.
            </p>
          </div>
          <ol className={s.farms}>
            {FARMS.map((f) => (
              <li key={f.name} className={s.farm}>
                <p className={s.miles}>
                  <span className={s.milesNum}>{f.miles}</span>
                  <span className={s.milesUnit}>miles</span>
                </p>
                <h3>{f.name}</h3>
                <p className={s.grows}>{f.grows}</p>
                <p className={s.farmNote}>{f.note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div>
              <div className={s.secHead}>
                <p className={s.hand}>Corner of Beet and Vine</p>
                <h2 id="visit-h">Come by the shop</h2>
              </div>
              <p className={s.address}>
                214 Beet Street, Market Hill
                <br />
                <a href="tel:+15550194417">(555) 019-4417</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.notes}>
                <li>SNAP and EBT welcome, and doubled on fruit and veg up to $20 a day.</li>
                <li>Bring bags and jars. Veg scraps go in the bin by the door, and on to Two Crows for compost.</li>
                <li>Restaurants and cafes: trade prices by the case, ordered by 4 pm for the next morning.</li>
              </ul>
            </div>

            <form className={s.form} action="#">
              <h3 className={s.formTitle}>The Thursday list</h3>
              <p className={s.formNote}>
                One email a week: what came in, what is ending, and what goes in the boxes. Nothing else, ever.
              </p>
              <div className={s.field}>
                <label htmlFor="bsg-name">Name</label>
                <input id="bsg-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="bsg-email">Email</label>
                <input id="bsg-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label htmlFor="bsg-box">Veg box</label>
                <select id="bsg-box" name="box" defaultValue="none">
                  <option value="none">Just the list, thanks</option>
                  <option value="small">Small box, $22</option>
                  <option value="medium">Medium box, $32</option>
                  <option value="large">Large box, $44</option>
                </select>
              </div>
              <button className={s.submit} type="submit">
                Put me on the list
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={roundstep}
            palette={ROW}
            fit="grid"
            cellSize={44}
            seed="beet-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p className={s.footName}>Beet Street Grocer</p>
        <p>A fictional greengrocer. The farms, prices and hours are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
