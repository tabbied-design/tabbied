import { TabbiedPattern } from 'tabbied/react';
import { goldencoil, sliver } from 'tabbied/patterns';
import s from './morrow-coffee.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Figure } from 'components/Figure';

export const metadata = {
  title: 'Morrow Coffee: Coffee bar and roastery, Canal Street',
  description:
    'Morrow Coffee roasts twice a week at the back of the shop on Canal Street and pours it at the front. Espresso, filter, beans to take home, subscriptions and wholesale.',
};

/* Site colors. The saucer draws its coils in roast on the espresso panel;
   the chaff takes `transparent`, so it sits on the oat paper. */
const ESPRESSO = '#231A14';
const ROAST = '#B06A3B';
const GRAY = '#8D8177';

const SAUCER = ['transparent', ROAST, ESPRESSO];
const CHAFF = ['transparent', ROAST, GRAY];

const NAV = [
  ['Menu', '#menu'],
  ['Beans', '#beans'],
  ['Subscriptions', '#subscriptions'],
  ['Wholesale', '#wholesale'],
  ['Events', '#events'],
  ['Visit', '#visit'],
];

const TODAY = [
  ['Today', 'Thursday, 7 am to 6 pm'],
  ['Where', '88 Canal Street, at Mill Bridge'],
  ['Roasting', 'Monday and Thursday mornings'],
];

type Item = {
  name: string;
  note?: string;
  price: string;
};

type Group = {
  title: string;
  sizes?: string;
  items: Item[];
};

const MENU: Group[] = [
  {
    title: 'Espresso',
    sizes: '8 oz / 12 oz',
    items: [
      { name: 'Espresso', note: 'a double, always', price: '3.25' },
      { name: 'Macchiato', price: '3.50' },
      { name: 'Cortado', price: '4.00' },
      { name: 'Flat white', price: '4.50' },
      { name: 'Cappuccino', price: '4.50 / 5.00' },
      { name: 'Latte', price: '4.75 / 5.25' },
      { name: 'Mocha', note: 'with 70% chocolate', price: '5.25 / 5.75' },
    ],
  },
  {
    title: 'Filter',
    sizes: '8 oz / 12 oz',
    items: [
      { name: 'Batch brew', note: 'a single origin, changed daily', price: '3.00 / 3.50' },
      { name: 'Pour-over', note: 'any bag on the shelf, by hand', price: '5.50' },
      { name: 'Cold brew', note: 'steeped eighteen hours', price: '4.75' },
      { name: 'Iced latte', price: '5.25' },
    ],
  },
  {
    title: 'Tea and the rest',
    items: [
      { name: 'Loose-leaf tea', note: 'sencha, Assam, chamomile or fresh mint', price: '3.75' },
      { name: 'Chai latte', note: 'spiced and brewed here', price: '4.75' },
      { name: 'London fog', price: '4.75' },
      { name: 'Hot chocolate', price: '4.25' },
    ],
  },
  {
    title: 'Pastries',
    items: [
      { name: 'Butter croissant', price: '3.75' },
      { name: 'Pain au chocolat', price: '4.25' },
      { name: 'Cardamom bun', price: '4.50' },
      { name: 'Banana bread', note: 'toasted, with salted butter', price: '4.00' },
      { name: 'Sourdough toast', note: 'butter and apricot jam', price: '5.00' },
    ],
  },
];

type Bean = {
  name: string;
  origin: string;
  notes: string;
  roast: number;
  roastLabel: string;
  price: string;
};

const BEANS: Bean[] = [
  {
    name: 'Canal Blend',
    origin: 'Brazil and Colombia, the house espresso',
    notes: 'Milk chocolate, hazelnut, raisin',
    roast: 3,
    roastLabel: 'Medium',
    price: '$17',
  },
  {
    name: 'Kochere',
    origin: 'Yirgacheffe, Ethiopia. Washed heirloom',
    notes: 'Jasmine, lemon peel, black tea',
    roast: 1,
    roastLabel: 'Light',
    price: '$21',
  },
  {
    name: 'La Esperanza',
    origin: 'Huila, Colombia. Honey-processed Caturra',
    notes: 'Red apple, caramel, orange',
    roast: 2,
    roastLabel: 'Medium-light',
    price: '$19',
  },
  {
    name: 'Kerinci',
    origin: 'Sumatra, Indonesia. Wet-hulled',
    notes: 'Cedar, dark chocolate, molasses',
    roast: 4,
    roastLabel: 'Medium-dark',
    price: '$18',
  },
  {
    name: 'Cajamarca Decaf',
    origin: 'Peru. Sugarcane decaffeinated',
    notes: 'Cocoa, brown sugar, almond',
    roast: 3,
    roastLabel: 'Medium',
    price: '$18',
  },
];

const ROAST_STEPS = [1, 2, 3, 4, 5];

const PLANS = [
  {
    name: 'Fortnightly',
    what: 'One 12 oz bag every two weeks',
    price: '$16 a bag',
  },
  {
    name: 'Weekly',
    what: 'One 12 oz bag every week',
    price: '$15 a bag',
  },
  {
    name: 'Office',
    what: 'Two pounds of the Canal Blend every week',
    price: '$32 a week',
  },
];

const PLAN_TERMS = [
  'Roaster\'s choice, or the same coffee every time',
  'Delivered by bike in town for free; $4 shipping anywhere else',
  'Skip, swap or pause from the link in every email',
];

const WHOLESALE = [
  ['Minimum', '10 lb a week, any mix of coffees'],
  ['Delivery', 'Tuesday and Friday, within fifteen miles'],
  ['Training', 'Two barista sessions for your staff, included'],
  ['Equipment', 'Grinders and espresso machines to lease or buy'],
];

const EVENTS = [
  {
    day: '04',
    month: 'Oct',
    title: 'Public cupping',
    when: 'Saturday, 9 am',
    detail: 'Taste the week\'s roasts side by side with the roaster. Free, twelve places.',
  },
  {
    day: '08',
    month: 'Oct',
    title: 'Brewing at home',
    when: 'Wednesday, 7 pm',
    detail: 'Pour-over, French press and a cheap grinder done well. $35, with a bag to take home.',
  },
  {
    day: '18',
    month: 'Oct',
    title: 'Latte art basics',
    when: 'Saturday, 8 am',
    detail: 'Steaming milk and pouring a heart on our machine, before we open. $45, six places.',
  },
  {
    day: '26',
    month: 'Oct',
    title: 'Roastery open morning',
    when: 'Sunday, 10 am',
    detail: 'The back room with the door open, a roast from green to bag, and coffee on us.',
  },
];

const HOURS = [
  ['Monday to Friday', '7 am to 6 pm'],
  ['Saturday', '8 am to 5 pm'],
  ['Sunday', '8 am to 3 pm'],
  ['Holidays', 'Posted a week ahead'],
];

const ROOM = [
  ['Seats', 'Twenty inside and eight on the bench out front'],
  ['Access', 'Step-free entrance and an accessible restroom'],
  ['Dogs', 'Welcome on the bench, with a bowl of water'],
  ['Laptops', 'Welcome on weekdays; the tables are for people at the weekend'],
];

export default function MorrowCoffeePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
      />

      {/* ------------------------------------------------------ LEFT HALF
          The fixed half: the name, the saucer, and what you need today. */}
      <header className={s.left}>
        <div className={s.leftTop}>
          <p className={s.status}>
            <span className={s.statusDot} aria-hidden="true" />
            <span>Open now, until 6 pm</span>
          </p>
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
        </div>

        <div className={s.title}>
          <h1 className={s.name}>Morrow Coffee</h1>
          <p className={s.tagline}>A coffee bar at the front, a roaster at the back.</p>
        </div>

        <div className={s.stage}>
          <div className={s.saucer}>
            <div className={s.saucerField} aria-hidden="true">
              <TabbiedPattern
                pattern={goldencoil}
                palette={SAUCER}
                fit="grid"
                cellSize={120}
                seed="morrow-saucer"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Figure
              slug="morrow-coffee-cup-cutout"
              cutout
              alt="A flat white in a stoneware cup, a heart poured in the foam"
              className={s.cup}
              priority
            />
          </div>
        </div>

        <dl className={s.today}>
          {TODAY.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ----------------------------------------------------- RIGHT HALF */}
      <div className={s.right}>
        <main id="top">
          <p className={s.intro}>
            We roast twice a week in the back room on Canal Street and pour it
            in the front, seven days a week. Everything below is on the board
            today.
          </p>

          {/* ---------------------------------------------------------- MENU */}
          <section id="menu" className={s.sec} aria-labelledby="menu-h">
            <div className={s.secHead}>
              <span className={s.secNo}>01</span>
              <h2 id="menu-h">The menu</h2>
            </div>
            <div className={s.menuGrid}>
              {MENU.map((g) => (
                <div key={g.title} className={s.group}>
                  <div className={s.groupHead}>
                    <h3>{g.title}</h3>
                    {g.sizes ? <span className={s.sizes}>{g.sizes}</span> : null}
                  </div>
                  <ul className={s.items}>
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <div className={s.itemText}>
                          <span className={s.itemName}>{it.name}</span>
                          {it.note ? <span className={s.itemNote}>{it.note}</span> : null}
                        </div>
                        <span className={s.itemPrice}>{it.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className={s.fine}>
              Oat, almond or whole milk at no charge. An extra shot is $1, and
              any drink can be made with decaf.
            </p>
          </section>

          {/* --------------------------------------------------------- BEANS */}
          <section id="beans" className={s.sec} aria-labelledby="beans-h">
            <div className={s.secHead}>
              <span className={s.secNo}>02</span>
              <h2 id="beans-h">Beans on the shelf</h2>
            </div>
            <p className={s.secNote}>
              Whole bean or ground to order, in 12 oz bags with the roast date
              on the front. Two pounds of any coffee for twice the bag price,
              less ten percent.
            </p>
            <ul className={s.beans}>
              {BEANS.map((b) => (
                <li key={b.name} className={s.bean}>
                  <div className={s.beanMain}>
                    <h3>{b.name}</h3>
                    <p className={s.beanOrigin}>{b.origin}</p>
                    <p className={s.beanNotes}>{b.notes}</p>
                  </div>
                  <div className={s.beanRoast}>
                    <span className={s.roastScale} aria-hidden="true">
                      {ROAST_STEPS.map((n) => (
                        <span key={n} className={n <= b.roast ? s.roastOn : s.roastOff} />
                      ))}
                    </span>
                    <span className={s.roastLabel}>{b.roastLabel}</span>
                  </div>
                  <span className={s.beanPrice}>{b.price}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ------------------------------------------------- SUBSCRIPTIONS */}
          <section id="subscriptions" className={s.sec} aria-labelledby="subscriptions-h">
            <div className={s.secHead}>
              <span className={s.secNo}>03</span>
              <h2 id="subscriptions-h">Subscriptions</h2>
            </div>
            <p className={s.secNote}>
              Fresh coffee on a schedule, roasted the day before it leaves.
            </p>
            <ul className={s.plans}>
              {PLANS.map((p) => (
                <li key={p.name}>
                  <h3>{p.name}</h3>
                  <p className={s.planWhat}>{p.what}</p>
                  <p className={s.planPrice}>{p.price}</p>
                </li>
              ))}
            </ul>
            <ul className={s.terms}>
              {PLAN_TERMS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a className={s.button} href="mailto:beans@morrowcoffee.example">Start a subscription</a>
          </section>

          {/* ----------------------------------------------------- WHOLESALE */}
          <section id="wholesale" className={s.sec} aria-labelledby="wholesale-h">
            <div className={s.secHead}>
              <span className={s.secNo}>04</span>
              <h2 id="wholesale-h">Wholesale</h2>
            </div>
            <p className={s.secNote}>
              We roast for nine cafes, two restaurants and a bike shop. If you
              want to serve Morrow, we will come and pull shots on your machine
              before you decide anything.
            </p>
            <dl className={s.facts}>
              {WHOLESALE.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={s.contactLine}>
              <span>Write to Dana at </span>
              <a href="mailto:wholesale@morrowcoffee.example">wholesale@morrowcoffee.example</a>
            </p>
          </section>

          {/* The chaff: thin flakes blown off the beans in the roaster, the
              one field on this half of the page. */}
          <div className={s.chaff} aria-hidden="true">
            <TabbiedPattern
              pattern={sliver}
              palette={CHAFF}
              options={{ frequency: 0.34 }}
              fit="grid"
              cellSize={34}
              seed="morrow-chaff"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          {/* -------------------------------------------------------- EVENTS */}
          <section id="events" className={s.sec} aria-labelledby="events-h">
            <div className={s.secHead}>
              <span className={s.secNo}>05</span>
              <h2 id="events-h">Events</h2>
            </div>
            <p className={s.secNote}>
              Small, early and mostly free. Sign up at the counter or by email;
              we keep a waiting list.
            </p>
            <ol className={s.events}>
              {EVENTS.map((e) => (
                <li key={e.title}>
                  <p className={s.date}>
                    <span className={s.dateDay}>{e.day}</span>
                    <span className={s.dateMonth}>{e.month}</span>
                  </p>
                  <div className={s.eventText}>
                    <h3>{e.title}</h3>
                    <p className={s.eventWhen}>{e.when}</p>
                    <p className={s.eventDetail}>{e.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* --------------------------------------------------------- VISIT */}
          <section id="visit" className={s.sec} aria-labelledby="visit-h">
            <div className={s.secHead}>
              <span className={s.secNo}>06</span>
              <h2 id="visit-h">Visit</h2>
            </div>
            <div className={s.visit}>
              <div>
                <h3 className={s.label}>Hours</h3>
                <dl className={s.hours}>
                  {HOURS.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className={s.label}>Address</h3>
                <p className={s.address}>
                  Morrow Coffee
                  <br />
                  88 Canal Street
                  <br />
                  at Mill Bridge
                </p>
                <p className={s.address}>
                  <a href="tel:+15550134478">(555) 013-4478</a>
                  <br />
                  <a href="mailto:hello@morrowcoffee.example">hello@morrowcoffee.example</a>
                </p>
              </div>
            </div>
            <dl className={s.room}>
              {ROOM.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </main>

        <footer className={s.footer}>
          <p className={s.footName}>Morrow Coffee</p>
          <p>A fictional coffee shop and roastery. Coffees, prices and hours are invented.</p>
          <p>
            Patterns by{' '}
            <a href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live on a transparent ground; the cup is a generated image.
          </p>
        </footer>
      </div>
    </div>
  );
}
