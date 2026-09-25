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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--oat': '#f3eee6',
        '--espresso': '#231a14',
        '--roast': '#b06a3b',
        '--gray': '#8d8177',
        '--pale': '#e3dacd',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="oat,espresso,roast,gray,pale"
      className={s.page}>
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
            <span data-edit="left.text" data-edit-max="60">Open now, until 6 pm</span>
          </p>
          <nav className={s.nav} aria-label="Sections">
            {NAV.map(([label, href], i) => (
              <a data-edit={`left.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </nav>
          <TemplateMenu className={s.siteMenu}>
            {NAV.map(([label, href], i) => (
              <a data-edit={`left.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </TemplateMenu>
        </div>

        <div className={s.title}>
          <h1 data-edit="left.name" data-edit-max="70" className={s.name}>Morrow Coffee</h1>
          <p data-edit="left.tagline" data-edit-max="240" data-edit-multiline className={s.tagline}>A coffee bar at the front, a roaster at the back.</p>
        </div>

        <div className={s.stage}>
          <div className={s.saucer}>
            <div data-edit-pattern="left.field" data-edit-roles="transparent,2,1" className={s.saucerField} aria-hidden="true">
              <TabbiedPattern
                pattern={goldencoil}
                palette={SAUCER}
                fit="grid"
                cellSize={120}
                seed="morrow-saucer"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Figure editId="photo.morrow-coffee-cup-cutout"
              slug="morrow-coffee-cup-cutout"
              cutout
              alt="A flat white in a stoneware cup, a heart poured in the foam"
              className={s.cup}
              priority
            />
          </div>
        </div>

        <dl className={s.today}>
          {TODAY.map(([k, v], i) => (
            <div key={k}>
              <dt data-edit={`left.term.${i}`} data-edit-max="28">{k}</dt>
              <dd data-edit={`left.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ----------------------------------------------------- RIGHT HALF */}
      <div className={s.right}>
        <main id="top">
          <p data-edit="top.intro" data-edit-max="240" data-edit-multiline className={s.intro}>
            We roast twice a week in the back room on Canal Street and pour it
            in the front, seven days a week. Everything below is on the board
            today.
          </p>

          {/* ---------------------------------------------------------- MENU */}
          <section id="menu" className={s.sec} aria-labelledby="menu-h">
            <div className={s.secHead}>
              <span data-edit="menu.secNo" data-edit-max="60" className={s.secNo}>01</span>
              <h2 data-edit="menu.title" data-edit-max="60" id="menu-h">The menu</h2>
            </div>
            <div className={s.menuGrid}>
              {MENU.map((g, i) => (
                <div key={g.title} className={s.group}>
                  <div className={s.groupHead}>
                    <h3 data-edit={`menu.title2.${i}`} data-edit-max="40">{g.title}</h3>
                    {g.sizes ? <span data-edit={`menu.sizes.${i}`} data-edit-max="60" className={s.sizes}>{g.sizes}</span> : null}
                  </div>
                  <ul className={s.items}>
                    {g.items.map((it, i2) => (
                      <li key={it.name}>
                        <div className={s.itemText}>
                          <span data-edit={`menu.itemName.${i}.${i2}`} data-edit-max="60" className={s.itemName}>{it.name}</span>
                          {it.note ? <span data-edit={`menu.itemNote.${i}.${i2}`} data-edit-max="60" className={s.itemNote}>{it.note}</span> : null}
                        </div>
                        <span data-edit={`menu.itemPrice.${i}.${i2}`} data-edit-max="60" className={s.itemPrice}>{it.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p data-edit="menu.fine" data-edit-max="240" data-edit-multiline className={s.fine}>
              Oat, almond or whole milk at no charge. An extra shot is $1, and
              any drink can be made with decaf.
            </p>
          </section>

          {/* --------------------------------------------------------- BEANS */}
          <section id="beans" className={s.sec} aria-labelledby="beans-h">
            <div className={s.secHead}>
              <span data-edit="beans.secNo" data-edit-max="60" className={s.secNo}>02</span>
              <h2 data-edit="beans.title" data-edit-max="60" id="beans-h">Beans on the shelf</h2>
            </div>
            <p data-edit="beans.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Whole bean or ground to order, in 12 oz bags with the roast date
              on the front. Two pounds of any coffee for twice the bag price,
              less ten percent.
            </p>
            <ul className={s.beans}>
              {BEANS.map((b, i) => (
                <li key={b.name} className={s.bean}>
                  <div className={s.beanMain}>
                    <h3 data-edit={`beans.title2.${i}`} data-edit-max="40">{b.name}</h3>
                    <p data-edit={`beans.beanOrigin.${i}`} data-edit-max="240" data-edit-multiline className={s.beanOrigin}>{b.origin}</p>
                    <p data-edit={`beans.beanNotes.${i}`} data-edit-max="240" data-edit-multiline className={s.beanNotes}>{b.notes}</p>
                  </div>
                  <div className={s.beanRoast}>
                    <span className={s.roastScale} aria-hidden="true">
                      {ROAST_STEPS.map((n) => (
                        <span key={n} className={n <= b.roast ? s.roastOn : s.roastOff} />
                      ))}
                    </span>
                    <span data-edit={`beans.roastLabel.${i}`} data-edit-max="60" className={s.roastLabel}>{b.roastLabel}</span>
                  </div>
                  <span data-edit={`beans.beanPrice.${i}`} data-edit-max="60" className={s.beanPrice}>{b.price}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ------------------------------------------------- SUBSCRIPTIONS */}
          <section id="subscriptions" className={s.sec} aria-labelledby="subscriptions-h">
            <div className={s.secHead}>
              <span data-edit="subscriptions.secNo" data-edit-max="60" className={s.secNo}>03</span>
              <h2 data-edit="subscriptions.title" data-edit-max="60" id="subscriptions-h">Subscriptions</h2>
            </div>
            <p data-edit="subscriptions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Fresh coffee on a schedule, roasted the day before it leaves.
            </p>
            <ul className={s.plans}>
              {PLANS.map((p, i) => (
                <li key={p.name}>
                  <h3 data-edit={`subscriptions.title2.${i}`} data-edit-max="40">{p.name}</h3>
                  <p data-edit={`subscriptions.planWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.planWhat}>{p.what}</p>
                  <p data-edit={`subscriptions.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{p.price}</p>
                </li>
              ))}
            </ul>
            <ul className={s.terms}>
              {PLAN_TERMS.map((t, i) => (
                <li data-edit={`subscriptions.item.${i}`} data-edit-max="80" key={t}>{t}</li>
              ))}
            </ul>
            <a data-edit="subscriptions.button" data-edit-max="28" className={s.button} href="mailto:beans@morrowcoffee.example">Start a subscription</a>
          </section>

          {/* ----------------------------------------------------- WHOLESALE */}
          <section id="wholesale" className={s.sec} aria-labelledby="wholesale-h">
            <div className={s.secHead}>
              <span data-edit="wholesale.secNo" data-edit-max="60" className={s.secNo}>04</span>
              <h2 data-edit="wholesale.title" data-edit-max="60" id="wholesale-h">Wholesale</h2>
            </div>
            <p data-edit="wholesale.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We roast for nine cafes, two restaurants and a bike shop. If you
              want to serve Morrow, we will come and pull shots on your machine
              before you decide anything.
            </p>
            <dl className={s.facts}>
              {WHOLESALE.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`wholesale.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`wholesale.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={s.contactLine}>
              <span data-edit="wholesale.text" data-edit-max="60">Write to Dana at </span>
              <a data-edit="wholesale.link" data-edit-max="28" href="mailto:wholesale@morrowcoffee.example">wholesale@morrowcoffee.example</a>
            </p>
          </section>

          {/* The chaff: thin flakes blown off the beans in the roaster, the
              one field on this half of the page. */}
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3" className={s.chaff} aria-hidden="true">
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
              <span data-edit="events.secNo" data-edit-max="60" className={s.secNo}>05</span>
              <h2 data-edit="events.title" data-edit-max="60" id="events-h">Events</h2>
            </div>
            <p data-edit="events.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Small, early and mostly free. Sign up at the counter or by email;
              we keep a waiting list.
            </p>
            <ol className={s.events}>
              {EVENTS.map((e, i) => (
                <li key={e.title}>
                  <p className={s.date}>
                    <span data-edit={`events.dateDay.${i}`} data-edit-max="60" className={s.dateDay}>{e.day}</span>
                    <span data-edit={`events.dateMonth.${i}`} data-edit-max="60" className={s.dateMonth}>{e.month}</span>
                  </p>
                  <div className={s.eventText}>
                    <h3 data-edit={`events.title2.${i}`} data-edit-max="40">{e.title}</h3>
                    <p data-edit={`events.eventWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.eventWhen}>{e.when}</p>
                    <p data-edit={`events.eventDetail.${i}`} data-edit-max="240" data-edit-multiline className={s.eventDetail}>{e.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* --------------------------------------------------------- VISIT */}
          <section id="visit" className={s.sec} aria-labelledby="visit-h">
            <div className={s.secHead}>
              <span data-edit="visit.secNo" data-edit-max="60" className={s.secNo}>06</span>
              <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Visit</h2>
            </div>
            <div className={s.visit}>
              <div>
                <h3 data-edit="visit.label" data-edit-max="40" className={s.label}>Hours</h3>
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
                <h3 data-edit="visit.label2" data-edit-max="40" className={s.label}>Address</h3>
                <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.address}>
                  Morrow Coffee
                  <br />
                  88 Canal Street
                  <br />
                  at Mill Bridge
                </p>
                <p className={s.address}>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550134478">(555) 013-4478</a>
                  <br />
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@morrowcoffee.example">hello@morrowcoffee.example</a>
                </p>
              </div>
            </div>
            <dl className={s.room}>
              {ROOM.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`visit.term2.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </main>

        <footer className={s.footer}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Morrow Coffee</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional coffee shop and roastery. Coffees, prices and hours are invented.</p>
          <p>
            Patterns by{' '}
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live on a transparent ground; the cup is a generated image.
          </p>
        </footer>
      </div>
    </div>
  );
}
