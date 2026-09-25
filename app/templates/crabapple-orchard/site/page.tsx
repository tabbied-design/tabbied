import { TabbiedPattern } from 'tabbied/react';
import { frond, ivy } from 'tabbied/patterns';
import s from './crabapple-orchard.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Crabapple Orchard: Pick-your-own apples, Hollow Road',
  description:
    'Crabapple Orchard is a pick-your-own orchard on Hollow Road with 22 kinds of apple, pears and pumpkins. See what is ripe each week, visit the farm shop and bakery, and book a picking slot.',
};

/* Site colors. The leaves in the shop panel and the hedge band sit on
   `transparent`, so they grow straight out of the page's paper. */
const INK = '#1F2419';
const RED = '#C0392B';
const GREEN = '#5B8C3A';
const GOLD = '#E3B23C';
const PALE = '#E6E0CF';

const LEAVES = ['transparent', GREEN, GOLD, RED, INK];
const HEDGE = ['transparent', GREEN, PALE, GOLD];

const NAV = [
  ['Ripe now', '#calendar'],
  ['Picking', '#picking'],
  ['Farm shop', '#shop'],
  ['Visit', '#visit'],
  ['FAQ', '#faq'],
];

/* The picking calendar runs from early August to late November in half
   months: column 1 is early August, column 8 late November. `from` and
   `to` are grid lines, so a variety spanning early and late September is
   3 / 5. */
const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov'];

type Variety = {
  name: string;
  note: string;
  use: string;
  kind: 'apple' | 'pear' | 'squash';
  from: number;
  to: number;
};

const VARIETIES: Variety[] = [
  { name: 'Paula Red', note: 'Tart, soft, the first of the year', use: 'Sauce', kind: 'apple', from: 1, to: 3 },
  { name: 'Gala', note: 'Sweet and crisp, kids pick it first', use: 'Eating', kind: 'apple', from: 2, to: 4 },
  { name: 'Honeycrisp', note: 'Explosively crisp, goes fast', use: 'Eating', kind: 'apple', from: 3, to: 5 },
  { name: 'McIntosh', note: 'Tangy, tender, the smell of fall', use: 'Sauce, cider', kind: 'apple', from: 3, to: 6 },
  { name: 'Macoun', note: 'Our favorite: wine-sweet, snappy', use: 'Eating', kind: 'apple', from: 4, to: 6 },
  { name: 'Cortland', note: 'Stays white when cut', use: 'Salads, pies', kind: 'apple', from: 4, to: 7 },
  { name: 'Jonagold', note: 'Big, honeyed, a little sharp', use: 'Pies', kind: 'apple', from: 5, to: 7 },
  { name: 'Northern Spy', note: 'Hard and sour off the tree, perfect baked', use: 'Pies', kind: 'apple', from: 6, to: 8 },
  { name: 'Dolgo crabapples', note: 'Tiny, scarlet, very sour', use: 'Jelly', kind: 'apple', from: 3, to: 6 },
  { name: 'Bartlett pears', note: 'Pick hard, ripen on the counter', use: 'Eating', kind: 'pear', from: 2, to: 4 },
  { name: 'Bosc pears', note: 'Russet skin, holds its shape', use: 'Poaching', kind: 'pear', from: 4, to: 6 },
  { name: 'Pumpkins and squash', note: 'Cut from the vine with our clippers', use: 'Carving, soup', kind: 'squash', from: 4, to: 8 },
];

const BAGS = [
  { size: 'Half peck', holds: 'About 5 lb, 12-15 apples', price: '$16' },
  { size: 'Peck', holds: 'About 10 lb, 25-30 apples', price: '$28' },
  { size: 'Half bushel', holds: 'About 20 lb, enough for pies and sauce', price: '$48' },
];

const STEPS = [
  { head: 'Book a slot', body: 'Weekend slots are two hours and $5 a car, paid back off your first bag. Weekdays, just come.' },
  { head: 'Check in at the barn', body: 'Buy your bags, pick up a map of what is ripe that day, and borrow a picking pole if you want one.' },
  { head: 'Ride out to the rows', body: 'The wagon leaves every twenty minutes, or walk: the nearest rows are five minutes away.' },
  { head: 'Twist and lift', body: 'Roll the apple up and twist; it comes away with its stem. Please do not shake the trees or climb them.' },
];

const BAKERY = [
  { name: 'Cider donuts', note: 'Fried all day in the barn window', price: '$1.50, $15 a dozen' },
  { name: 'Apple pie, double crust', note: 'Macoun and Northern Spy, 9 in', price: '$24' },
  { name: 'Fresh cider, pressed Thursday', note: 'Unfiltered, a blend of six apples', price: '$9 a gallon' },
  { name: 'Crabapple jelly', note: 'From the Dolgo trees by the pond', price: '$8' },
  { name: 'Caramel apples', note: 'Rolled in peanuts or left plain', price: '$4' },
  { name: 'Hot cider by the cup', note: 'With a cinnamon stick, weekends', price: '$3' },
];

const SLOTS = [
  { id: 'slot-9', label: '9 - 11 am' },
  { id: 'slot-11', label: '11 am - 1 pm' },
  { id: 'slot-1', label: '1 - 3 pm' },
  { id: 'slot-3', label: '3 - 5 pm' },
];

const HOURS = [
  ['Aug', 'Sat-Sun 9-5'],
  ['Sep - Oct', 'Every day 9-5, until 6 on Saturdays'],
  ['Nov', 'Fri-Sun 10-4, while the Spys last'],
];

const FAQS = [
  {
    q: 'Can we eat while we pick?',
    a: 'A taste of each variety, yes, that is half the fun. Please do not fill up in the rows; everything you carry out is weighed in the bag.',
  },
  {
    q: 'Are dogs allowed?',
    a: 'Only service animals in the rows, because of food safety rules. Dogs on a leash are welcome at the farm shop and the picnic tables.',
  },
  {
    q: 'Is it accessible?',
    a: 'The shop, the bakery and the first four rows are on firm, level gravel, and the wagon has a ramp. Call ahead and we will park you by the barn.',
  },
  {
    q: 'What if it rains?',
    a: 'We stay open in light rain and close the rows in a storm. If we close during your slot, your $5 comes back automatically.',
  },
  {
    q: 'Do you spray?',
    a: 'As little as we can. We use traps and timing first, and the orchard is certified under the state low-spray program. Wash your apples all the same.',
  },
];

export default function CrabappleOrchardPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=Vollkorn:ital,wght@0,500;0,700;1,500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markApple} aria-hidden="true" />
          <span className={s.markName}>Crabapple Orchard</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBtn} href="#visit">Book a slot</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The rows run away across the hills at the foot of the screen;
            the words stand in the empty sky above them. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <Artwork
              slug="crabapple-orchard-rows"
              alt=""
              fit="cover"
              inks={{ red: 'var(--red)', blue: 'var(--green)', yellow: 'var(--gold)', black: 'var(--ink)' }}
            />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>Pick-your-own on Hollow Road, since 1962</p>
            <h1 id="hero-h" className={s.title}>
              Forty rows, <em>twenty-two kinds of apple.</em>
            </h1>
            <p className={s.lede}>
              Bring a bag, ride the wagon out to the trees and pick what is
              ripe this week. The cider donuts are waiting when you get back.
            </p>
            <div className={s.actions}>
              <a className={s.btn} href="#visit">Book a picking slot</a>
              <a className={s.btnLine} href="#calendar">What is ripe now</a>
            </div>
            <p className={s.ripe}>
              <span className={s.ripeDot} aria-hidden="true" />
              <span>Picking this weekend: Honeycrisp, McIntosh, Macoun and Bosc pears</span>
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- CALENDAR
            Every variety as a bar across the picking season, in half
            months, with a rule where this week falls. */}
        <section id="calendar" className={s.calendar} aria-labelledby="calendar-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The picking calendar</p>
            <h2 id="calendar-h">What is ripe, and when</h2>
            <p className={s.secNote}>
              A good guide, not a promise: a hot August brings everything on a
              week early. The board at the barn has the day's rows.
            </p>
          </div>

          <div className={s.chart}>
            <div className={s.chartHead} aria-hidden="true">
              <span className={s.chartCorner}>Variety</span>
              <div className={s.months}>
                {MONTHS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
                <span className={s.now}>
                  <span className={s.nowLabel}>This week</span>
                </span>
              </div>
            </div>
            <ul className={s.rowsList}>
              {VARIETIES.map((v) => (
                <li key={v.name} className={s.variety}>
                  <div className={s.varName}>
                    <h3>{v.name}</h3>
                    <p>{v.note}</p>
                  </div>
                  <div className={s.track}>
                    <span
                      className={s.span}
                      data-kind={v.kind}
                      style={{ gridColumn: `${v.from} / ${v.to}` }}>
                      {v.use}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ul className={s.legend}>
            <li data-kind="apple">Apples</li>
            <li data-kind="pear">Pears</li>
            <li data-kind="squash">Pumpkins and squash</li>
          </ul>
        </section>

        {/* The hedge: a band of leaves between the calendar and the rules. */}
        <div className={s.hedge} aria-hidden="true">
          <TabbiedPattern
            pattern={ivy}
            palette={HEDGE}
            fit="grid"
            cellSize={40}
            seed="hedge"
            options={{ frequency: 0.75 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- PICKING */}
        <section id="picking" className={s.picking} aria-labelledby="picking-h">
          <div className={s.secHead}>
            <p className={s.secKick}>How picking works</p>
            <h2 id="picking-h">Pay by the bag, not the pound</h2>
            <p className={s.secNote}>
              Fill it as full as it will close. Pears and crabapples go in the
              same bags; pumpkins are $0.75 a pound at the scale by the barn.
            </p>
          </div>
          <div className={s.pickGrid}>
            <ol className={s.steps}>
              {STEPS.map((st, i) => (
                <li key={st.head}>
                  <span className={s.stepNo}>{`${i + 1}`}</span>
                  <h3>{st.head}</h3>
                  <p>{st.body}</p>
                </li>
              ))}
            </ol>
            <ul className={s.bags}>
              {BAGS.map((b) => (
                <li key={b.size} className={s.bag}>
                  <h3>{b.size}</h3>
                  <p>{b.holds}</p>
                  <strong>{b.price}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- FARM SHOP
            The shop's list beside a big panel of leaves. */}
        <section id="shop" className={s.shop} aria-labelledby="shop-h">
          <div className={s.leafPanel} aria-hidden="true">
            <TabbiedPattern
              pattern={frond}
              palette={LEAVES}
              fit="grid"
              cellSize={64}
              seed="shop-wall"
              options={{ frequency: 0.7 }}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.shopBody}>
            <p className={s.secKick}>The farm shop and bakery</p>
            <h2 id="shop-h">Donuts in the barn window</h2>
            <p className={s.shopLede}>
              The shop is in the old packing barn, open whenever the orchard
              is, and all winter on Saturdays for cider, jelly and pies to
              order. Everything is made here or two farms down the road.
            </p>
            <ul className={s.bakery}>
              {BAKERY.map((b) => (
                <li key={b.name}>
                  <div className={s.bakeHead}>
                    <h3>{b.name}</h3>
                    <span className={s.bakeDots} aria-hidden="true" />
                    <strong>{b.price}</strong>
                  </div>
                  <p>{b.note}</p>
                </li>
              ))}
            </ul>
            <p className={s.shopNote}>Pies to order with two days notice: (555) 019-1962.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT
            The barn across the foot of the section, the sky gold; the
            booking card stands in the sky beside the hours. */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitArt} aria-hidden="true">
            <Artwork
              slug="crabapple-orchard-barn"
              alt=""
              fit="cover"
              inks={{ red: 'var(--red)', yellow: 'var(--green)', black: 'var(--ink)' }}
            />
          </div>
          <div className={s.visitInner}>
            <div className={s.visitText}>
              <p className={s.visitKick}>Visit and book</p>
              <h2 id="visit-h">Come out to Hollow Road</h2>
              <p className={s.visitLede}>
                Weekend slots sell out by Thursday in October. On weekdays
                there is no need to book; just come.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([m, h]) => (
                  <div key={m}>
                    <dt>{m}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.address}>
                1420 Hollow Road, three miles past the covered bridge. Free
                parking in the lower field.
              </p>
            </div>
            <form className={s.form} action="#">
              <h3 className={s.formHead}>Book a weekend slot</h3>
              <div className={s.field}>
                <label htmlFor="ca-date">Day</label>
                <select id="ca-date" name="date" defaultValue="sat-oct-4">
                  <option value="sat-sep-27">Saturday, September 27</option>
                  <option value="sun-sep-28">Sunday, September 28</option>
                  <option value="sat-oct-4">Saturday, October 4</option>
                  <option value="sun-oct-5">Sunday, October 5</option>
                </select>
              </div>
              <fieldset className={s.slots}>
                <legend>Arrival time</legend>
                {SLOTS.map((sl) => (
                  <label key={sl.id} className={s.slot}>
                    <input type="radio" name="slot" value={sl.id} />
                    <span>{sl.label}</span>
                  </label>
                ))}
              </fieldset>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="ca-name">Name</label>
                  <input id="ca-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="ca-email">Email</label>
                  <input id="ca-email" name="email" type="email" autoComplete="email" />
                </div>
              </div>
              <button className={s.submit} type="submit">Book for $5 a car</button>
              <small className={s.formNote}>The $5 comes off your first bag at the barn.</small>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.faqHead}>
            <p className={s.secKick}>Before you come</p>
            <h2 id="faq-h">Questions we hear at the gate</h2>
          </div>
          <div className={s.faqList}>
            {FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p className={s.footName}>Crabapple Orchard</p>
            <p className={s.footTag}>Pick-your-own apples, pears and pumpkins. A family farm since 1962.</p>
          </div>
          <p className={s.footAddr}>
            1420 Hollow Road
            <br />
            hello@crabappleorchard.example
            <br />
            (555) 019-1962
          </p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p>A fictional orchard. Varieties, prices and dates are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
