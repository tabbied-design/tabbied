import { TabbiedPattern } from 'tabbied/react';
import { slashbar, tidewashbands } from 'tabbied/patterns';
import s from './stropline-barbers.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Stropline Barbers: Barbershop, Canal Street',
  description:
    'Stropline Barbers cuts hair, fades and shaves on Canal Street, seven days a week. Walk in or book a chair; prices, barbers, the loyalty card and the hours are all on this page.',
};

/* Site colors. The strop's streaks and the card's slashes are drawn on a
   transparent ground, so each sits on the band behind it. */
const CHALK = '#F1EDE4';
const RED = '#D63A2F';
const STEEL = '#6F737A';
const STROP = ['transparent', RED, CHALK, STEEL];
const SLASHES = ['transparent', RED, CHALK, STEEL, RED, CHALK];

const NAV = [
  ['Walk-ins', '#walk-ins'],
  ['Services', '#services'],
  ['Chairs', '#chairs'],
  ['Loyalty', '#loyalty'],
  ['Hours', '#hours'],
  ['The shop', '#shop'],
];

const WAITS = [
  ['Weekday mornings', '5-10 min'],
  ['Weekday lunch', '20-30 min'],
  ['Weekdays after 5', '30-45 min'],
  ['Saturday', '40-60 min'],
  ['Sunday', '10-20 min'],
];

type Service = {
  name: string;
  note: string;
  time: string;
  price: string;
};

const SERVICES: Service[] = [
  { name: 'Haircut', note: 'Scissor or clipper, washed and styled', time: '40 min', price: '$38' },
  { name: 'Skin fade', note: 'Down to the skin, blended by hand', time: '45 min', price: '$42' },
  { name: 'Buzz cut', note: 'One guard all over, neck tidied', time: '20 min', price: '$25' },
  { name: 'Beard trim', note: 'Shaped, lined up, hot towel to finish', time: '20 min', price: '$22' },
  { name: 'Hot towel shave', note: 'Straight razor, two towels, cold balm', time: '40 min', price: '$45' },
  { name: 'Cut and beard', note: 'The two together, one sitting', time: '60 min', price: '$55' },
  { name: 'Kids, under 12', note: 'Any cut, with a lollipop if earned', time: '30 min', price: '$26' },
  { name: 'Seniors, 65 and over', note: 'Tuesday to Thursday, any cut', time: '30 min', price: '$28' },
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type Barber = {
  chair: string;
  name: string;
  since: string;
  known: string;
  days: string;
  on: boolean[];
};

const BARBERS: Barber[] = [
  {
    chair: '01',
    name: 'Sal Moretti',
    since: 'Owner. Cutting since 1994',
    known: 'Scissor cuts, side parts and the hot towel shave',
    days: 'Tuesday to Saturday',
    on: [false, true, true, true, true, true, false],
  },
  {
    chair: '02',
    name: 'Dre Coleman',
    since: 'At Stropline since 2015',
    known: 'Skin fades, tapers, line-ups and designs',
    days: 'Monday, Wednesday to Saturday',
    on: [true, false, true, true, true, true, false],
  },
  {
    chair: '03',
    name: 'Kit Navarro',
    since: 'At Stropline since 2019',
    known: 'Beards, longer hair and curls',
    days: 'Sunday to Thursday',
    on: [true, true, true, true, false, false, true],
  },
  {
    chair: '04',
    name: 'Yusuf Adeyemi',
    since: 'At Stropline since 2023',
    known: 'Kids, first cuts and buzz cuts',
    days: 'Friday to Monday',
    on: [true, false, false, false, true, true, true],
  },
];

const STAMPS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const CARD_RULES = [
  ['One stamp a visit', 'For any cut or shave over $20. A beard trim on its own counts.'],
  ['The tenth is on us', 'Any service on the list, with any barber, on any day.'],
  ['No app, no email', 'The card lives in your wallet, or in the drawer under the till with your name on it.'],
  ['Never expires', 'Lose it and we will start you a new one at the stamp you were on.'],
];

type Day = {
  day: string;
  open: string;
  close: string;
  note: string;
};

const HOURS: Day[] = [
  { day: 'Monday', open: '10:00', close: '19:00', note: 'Walk-ins only' },
  { day: 'Tuesday', open: '9:00', close: '19:00', note: 'Seniors all day' },
  { day: 'Wednesday', open: '9:00', close: '19:00', note: 'Seniors all day' },
  { day: 'Thursday', open: '9:00', close: '21:00', note: 'Late night' },
  { day: 'Friday', open: '9:00', close: '19:00', note: 'Book ahead after 4' },
  { day: 'Saturday', open: '8:00', close: '17:00', note: 'Busiest day' },
  { day: 'Sunday', open: '10:00', close: '16:00', note: 'Quietest day' },
];

const SHELF = [
  ['Matte clay', '$18'],
  ['Pomade, medium hold', '$18'],
  ['Beard oil, cedar', '$16'],
  ['Shaving soap and bowl', '$24'],
  ['Pocket comb', '$6'],
];

export default function StroplineBarbersPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;800&family=Public+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Stropline</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550173300">(555) 017-3300</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The name at poster size, then the strop: the tide of streaks
            laid on its side, so every stroke runs the way a razor does. */}
        <section className={`${s.band} ${s.night} ${s.heroBand}`} aria-labelledby="hero-h">
          <div className={s.hero}>
            <div className={s.heroHead}>
              <p className={s.kicker}>118 Canal Street. Seven days. Since 2011.</p>
              <h1 id="hero-h" className={s.heroTitle}>
                Stropline
                <br />
                <em>Barbers</em>
              </h1>
            </div>
            <div className={s.heroText}>
              <p className={s.heroLead}>
                Cuts, fades and hot towel shaves by four barbers who know your
                name by the second visit. Walk in, or book a chair.
              </p>
              <div className={s.actions}>
                <a className={s.button} href="#walk-ins">Walk-in wait</a>
                <a className={s.ghost} href="#services">See prices</a>
              </div>
            </div>
          </div>
          <div className={s.strop} aria-hidden="true">
            <div className={s.stropField} aria-hidden="true">
              <TabbiedPattern
                pattern={tidewashbands}
                palette={STROP}
                fit="grid"
                cellSize={120}
                seed="stropline-strop"
                redrawInterval={8000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- WALK-INS
            One number, as big as a sign in the window. */}
        <section id="walk-ins" className={`${s.band} ${s.deep}`} aria-labelledby="walk-h">
          <div className={s.inner}>
            <div className={s.walk}>
              <div className={s.walkMain}>
                <h2 id="walk-h" className={s.bandTitle}>Walk-ins welcome</h2>
                <p className={s.waitLabel}>Typical wait, weekday afternoon</p>
                <p className={s.waitNumber}>
                  <span>20</span>
                  <span className={s.waitUnit}>min</span>
                </p>
                <p className={s.walkNote}>
                  Two chairs are kept for walk-ins every day. Put your name on
                  the board at the counter, get a coffee next door, and we text
                  you when you are next.
                </p>
              </div>
              <div className={s.walkSide}>
                <h3 className={s.smallHead}>When it is quiet</h3>
                <dl className={s.waits}>
                  {WAITS.map(([when, wait]) => (
                    <div key={when}>
                      <dt>{when}</dt>
                      <dd>{wait}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.textLine}>
                  <span>Text your name to </span>
                  <a href="sms:+15550173300">(555) 017-3300</a>
                  <span> to join the board from home.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={`${s.band} ${s.night}`} aria-labelledby="services-h">
          <div className={s.inner}>
            <div className={s.bandHead}>
              <h2 id="services-h" className={s.bandTitle}>Services</h2>
              <p className={s.bandNote}>Every price includes a hot towel and a neck shave. Card or cash.</p>
            </div>
            <ul className={s.services}>
              {SERVICES.map((sv) => (
                <li key={sv.name} className={s.service}>
                  <h3 className={s.serviceName}>{sv.name}</h3>
                  <p className={s.serviceNote}>{sv.note}</p>
                  <p className={s.serviceTime}>{sv.time}</p>
                  <p className={s.servicePrice}>{sv.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- CHAIRS */}
        <section id="chairs" className={`${s.band} ${s.deep}`} aria-labelledby="chairs-h">
          <div className={s.inner}>
            <div className={s.bandHead}>
              <h2 id="chairs-h" className={s.bandTitle}>The chairs</h2>
              <p className={s.bandNote}>Four chairs, four barbers. Ask for one by name or take the next free chair.</p>
            </div>
            <ol className={s.chairs}>
              {BARBERS.map((b) => (
                <li key={b.chair} className={s.chair}>
                  <p className={s.chairNo}>{b.chair}</p>
                  <h3 className={s.chairName}>{b.name}</h3>
                  <p className={s.chairSince}>{b.since}</p>
                  <p className={s.chairKnown}>{b.known}</p>
                  <ul className={s.week} aria-hidden="true">
                    {DAYS.map((d, i) => (
                      <li key={i} className={b.on[i] ? s.dayOn : s.dayOff}>{d}</li>
                    ))}
                  </ul>
                  <p className={s.chairDays}>{b.days}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- LOYALTY
            The one light band on the page, holding the card itself. */}
        <section id="loyalty" className={`${s.band} ${s.light}`} aria-labelledby="loyalty-h">
          <div className={s.inner}>
            <div className={s.loyalty}>
              <div className={s.loyaltyText}>
                <h2 id="loyalty-h" className={s.bandTitle}>Ten cuts, the tenth is on us</h2>
                <dl className={s.rules}>
                  {CARD_RULES.map(([t, d]) => (
                    <div key={t}>
                      <dt>{t}</dt>
                      <dd>{d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={s.card}>
                <div className={s.cardStrip} aria-hidden="true">
                  <TabbiedPattern
                    pattern={slashbar}
                    palette={SLASHES}
                    fit="grid"
                    cellSize={28}
                    seed="stropline-card"
                    options={{ frequency: 0.7 }}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.cardBody}>
                  <p className={s.cardName}>Stropline Barbers</p>
                  <p className={s.cardSub}>Loyalty card. Seven stamps so far.</p>
                  <ol className={s.stamps}>
                    {STAMPS.map((n, i) => (
                      <li key={n} className={i < 7 ? s.stamped : s.empty}>{n}</li>
                    ))}
                    <li className={s.free}>Free</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={`${s.band} ${s.deep}`} aria-labelledby="hours-h">
          <div className={s.inner}>
            <div className={s.bandHead}>
              <h2 id="hours-h" className={s.bandTitle}>Hours</h2>
              <p className={s.bandNote}>Last walk-in half an hour before we close. Open every public holiday except two.</p>
            </div>
            <table className={s.hours}>
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Open</th>
                  <th scope="col">Close</th>
                  <th scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {HOURS.map((h) => (
                  <tr key={h.day} className={h.note === 'Late night' ? s.late : undefined}>
                    <th scope="row">{h.day}</th>
                    <td>{h.open}</td>
                    <td>{h.close}</td>
                    <td className={s.hourNote}>{h.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------ SHOP */}
        <section id="shop" className={`${s.band} ${s.night}`} aria-labelledby="shop-h">
          <div className={s.inner}>
            <div className={s.bandHead}>
              <h2 id="shop-h" className={s.bandTitle}>The shop</h2>
              <p className={s.bandNote}>Between the bakery and the bike shop, under the red and white awning.</p>
            </div>
            <div className={s.shop}>
              <div className={s.shopCol}>
                <h3 className={s.smallHead}>Find us</h3>
                <p className={s.shopAddr}>
                  118 Canal Street
                  <br />
                  Ground floor, step-free
                </p>
                <p className={s.shopText}>
                  Two-hour street parking on Canal Street, and the number 9 bus
                  stops across the road.
                </p>
              </div>
              <div className={s.shopCol}>
                <h3 className={s.smallHead}>Book a chair</h3>
                <a className={s.shopPhone} href="tel:+15550173300">(555) 017-3300</a>
                <a className={s.shopMail} href="mailto:chair@stropline.example">chair@stropline.example</a>
                <p className={s.shopText}>
                  Bookings open seven days ahead. Card, cash or phone; no checks.
                </p>
              </div>
              <div className={s.shopCol}>
                <h3 className={s.smallHead}>On the shelf</h3>
                <dl className={s.shelf}>
                  {SHELF.map(([item, price]) => (
                    <div key={item}>
                      <dt>{item}</dt>
                      <dd>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p className={s.footMark}>Stropline Barbers</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <div className={s.footFine}>
            <p>A fictional barbershop. Prices, hours and people are invented.</p>
            <p>
              <span>Patterns by </span>
              <a href="https://tabbied.com" rel="noopener">Tabbied</a>
              <span>, drawn live in the shop's own colors.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
