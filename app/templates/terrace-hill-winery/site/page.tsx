import { TabbiedPattern } from 'tabbied/react';
import { dotset, teardropleaves } from 'tabbied/patterns';
import s from './terrace-hill-winery.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Terrace Hill: Vineyard and winery, Terrace Hill Road',
  description:
    'A family vineyard of eleven terraces and six wines. Tastings daily on the terrace, cellar tours, a Saturday vineyard walk with lunch, and suppers among the barrels.',
};

/* Site colors. The leaf band and the grape tile sit on `transparent`, so
   both are drawn on the page's own paper. */
const WINE = '#7A2E44';
const VINE = '#6A7F3E';
const GOLD = '#B99A5B';
const GRAY = '#9A8F84';

const LEAVES = ['transparent', VINE, GOLD];
const GRAPES = ['transparent', WINE, GOLD, GRAY];

const NAV = [
  ['Tastings', '#tastings'],
  ['Wines', '#wines'],
  ['Events', '#events'],
  ['Visit', '#visit'],
  ['Club', '#club'],
  ['Reserve', '#reserve'],
];

type Tasting = {
  name: string;
  body: string;
  length: string;
  when: string;
  price: string;
  booking: string;
};

const TASTINGS: Tasting[] = [
  {
    name: 'Terrace Flight',
    body: 'Five wines at the bar or out on the terrace, poured by whoever made them that year. The fee comes off a two-bottle purchase.',
    length: '40 minutes',
    when: 'Daily, 11 to 5',
    price: '$18',
    booking: 'Walk in',
  },
  {
    name: 'Cellar Tour and Tasting',
    body: 'Through the press house and down to the barrel cellar, then six wines at the long table, one of them drawn straight from the barrel.',
    length: '75 minutes',
    when: 'Daily, 11:30 and 3:00',
    price: '$35',
    booking: 'Book ahead',
  },
  {
    name: 'Vineyard Walk and Lunch',
    body: 'Up through all eleven terraces with the grower, then lunch at the farmhouse table with four wines and whatever the garden has.',
    length: '3 hours',
    when: 'Saturdays at 10, May to October',
    price: '$68',
    booking: 'Book ahead',
  },
];

type Wine = {
  name: string;
  grape: string;
  note: string;
  price: string;
};

const WINES: Wine[] = [
  { name: 'Terrace White', grape: 'Riesling, 2024', note: 'Lime, wet stone and a little sweetness held firmly in check.', price: '$22' },
  { name: 'Hillside Rose', grape: 'Cabernet Franc, 2024', note: 'Pale and dry, strawberries and a crack of pepper.', price: '$20' },
  { name: 'Eleven Rows', grape: 'Pinot Noir, 2023', note: 'From the top terrace only. Cherry, forest floor, a fine grip.', price: '$34' },
  { name: 'Farmhouse Red', grape: 'Merlot and Cabernet Franc, 2022', note: 'The everyday red: plum, cedar, soft at the edges.', price: '$26' },
  { name: 'Cypress', grape: 'Syrah, 2022', note: 'Blackberry, violets and black olive, eighteen months in oak.', price: '$38' },
  { name: 'Late Harvest', grape: 'Riesling, 2023, half bottle', note: 'Apricot and honey. With blue cheese, or instead of dessert.', price: '$28' },
];

type Happening = {
  day: string;
  month: string;
  weekday: string;
  title: string;
  body: string;
  time: string;
  price: string;
};

const EVENTS: Happening[] = [
  {
    day: '4',
    month: 'Oct',
    weekday: 'Saturday',
    title: 'Harvest Day',
    body: 'Take a pair of shears and a row. Lunch in the vines, and your name on a bottle of the vintage.',
    time: '9:00 to 2:00',
    price: '$45',
  },
  {
    day: '17',
    month: 'Oct',
    weekday: 'Friday',
    title: 'Cellar Supper',
    body: 'Four courses at one table between the barrels, each with a wine from the hill.',
    time: '7:00',
    price: '$95',
  },
  {
    day: '26',
    month: 'Oct',
    weekday: 'Sunday',
    title: 'Barrel Tasting',
    body: 'The 2025 wines, three weeks old, tasted from the barrel with the winemaker.',
    time: '2:00',
    price: '$30',
  },
  {
    day: '15',
    month: 'Nov',
    weekday: 'Saturday',
    title: 'First Pour',
    body: 'The first bottles of the year opened on the terrace, with a fiddle band and chestnuts.',
    time: '4:00 to 9:00',
    price: 'Free',
  },
  {
    day: '6',
    month: 'Dec',
    weekday: 'Saturday',
    title: 'Winter Market',
    body: 'Twenty makers from the valley in the press house: cheese, wool, honey, pottery.',
    time: '10:00 to 4:00',
    price: 'Free',
  },
];

const HOURS = [
  ['Monday to Thursday', '11 to 5'],
  ['Friday and Saturday', '11 to 7'],
  ['Sunday', '12 to 5'],
  ['December 24 to January 1', 'Closed'],
];

const VISIT_NOTES = [
  'Drivers taste our grape juice free, and so do children.',
  'Dogs are welcome on the terrace, on a lead.',
  'Groups of eight or more, please book a table.',
  'The terrace is step-free from the car park.',
];

const CLUB = [
  { size: 'Three bottles', price: '$75', every: 'a quarter' },
  { size: 'Six bottles', price: '$140', every: 'a quarter' },
  { size: 'Twelve bottles', price: '$265', every: 'a quarter' },
];

const PERKS = [
  '15% off every bottle, all year',
  'Tastings free for you and three friends',
  'First pick of the Late Harvest',
  'The members\' supper in the vines each June',
];

const FAQS = [
  {
    q: 'Can we bring children?',
    a: 'Yes. There is grape juice from our own Concord vines, a lawn below the terrace and a box of chalk for the flagstones.',
  },
  {
    q: 'Do you ship?',
    a: 'Within the state, yes: $15 for up to six bottles, free on twelve. We cannot ship out of state, which is the law and not our choice.',
  },
  {
    q: 'Is the terrace covered?',
    a: 'Half of it, under the pergola, and there are heaters from October. On a wet day the tasting moves into the press house.',
  },
  {
    q: 'Can we bring a picnic?',
    a: 'On weekdays, gladly; buy a bottle and take any table on the lawn. On weekends the terrace kitchen does boards of cheese and bread.',
  },
];

export default function TerraceHillPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markName}>Terrace Hill</span>
          <span className={s.markSub}>Vineyard and winery</span>
        </a>
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
        {/* ------------------------------------------------------------ HERO
            The hill itself, edge to edge: rows of vines in the wine color,
            the farmhouse at the top, and the page's pale as the sky. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <Artwork
              slug="terrace-hill-winery-hills"
              alt=""
              fit="cover"
              inks={{ red: 'var(--vine)', blue: 'var(--gold)', yellow: 'var(--paper)', black: 'var(--wine)' }}
            />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>Eleven terraces, six wines, one family, since 1987</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Wine from one hill,
              <br />
              <em>poured on it.</em>
            </h1>
            <div className={s.heroFoot}>
              <p className={s.heroLede}>
                Taste on the terrace with the rows running down in front of
                you, walk up to the farmhouse with the grower, or eat among
                the barrels on a Friday night.
              </p>
              <div className={s.heroActions}>
                <a className={s.btn} href="#reserve">Reserve a tasting</a>
                <a className={s.btnLine} href="#wines">The wines</a>
              </div>
            </div>
          </div>
          <p className={s.open}>Open today, 11 to 5</p>
        </section>

        {/* -------------------------------------------------------- TASTINGS */}
        <section id="tastings" className={s.sec} aria-labelledby="tastings-h">
          <div className={s.secHead}>
            <div className={s.grapes} aria-hidden="true">
              <TabbiedPattern
                pattern={dotset}
                palette={GRAPES}
                options={{ frequency: 0.6 }}
                fit="grid"
                cellSize={30}
                seed="terrace-grapes"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div>
              <h2 id="tastings-h">Three ways to taste</h2>
              <p className={s.secNote}>
                Every tasting is poured by someone who worked the harvest, and
                every one ends with a glass of the Late Harvest.
              </p>
            </div>
          </div>
          <div className={s.tastings}>
            {TASTINGS.map((t) => (
              <article key={t.name} className={s.tasting}>
                <span className={s.tastingPrice}>{t.price}</span>
                <h3>{t.name}</h3>
                <p className={s.tastingBody}>{t.body}</p>
                <dl className={s.tastingFacts}>
                  <div>
                    <dt>Length</dt>
                    <dd>{t.length}</dd>
                  </div>
                  <div>
                    <dt>When</dt>
                    <dd>{t.when}</dd>
                  </div>
                  <div>
                    <dt>Booking</dt>
                    <dd>{t.booking}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- WINES
            A wine list, two columns, prices on a dotted leader. */}
        <section id="wines" className={s.sec} aria-labelledby="wines-h">
          <div className={s.secHead}>
            <div className={s.secRule} aria-hidden="true" />
            <div>
              <h2 id="wines-h">The wines</h2>
              <p className={s.secNote}>
                Six wines, all from the hill, none bought in. Bottle prices;
                club members take 15% off.
              </p>
            </div>
          </div>
          <ul className={s.wines}>
            {WINES.map((w) => (
              <li key={w.name} className={s.wine}>
                <div className={s.wineLine}>
                  <h3>{w.name}</h3>
                  <span className={s.wineDots} aria-hidden="true" />
                  <strong className={s.winePrice}>{w.price}</strong>
                </div>
                <span className={s.wineGrape}>{w.grape}</span>
                <p className={s.wineNote}>{w.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BAND
            Vine leaves in green and gold across the full width: the loudest
            pattern on the page. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={teardropleaves}
              palette={LEAVES}
              options={{ frequency: 0.75 }}
              fit="grid"
              cellSize={84}
              seed="terrace-leaves"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------- EVENTS */}
        <section id="events" className={s.sec} aria-labelledby="events-h">
          <div className={s.secHead}>
            <div className={s.secRule} aria-hidden="true" />
            <div>
              <h2 id="events-h">This fall on the hill</h2>
              <p className={s.secNote}>
                Book the ticketed evenings at the bar or by email; the free
                ones need nothing but turning up.
              </p>
            </div>
          </div>
          <ol className={s.events}>
            {EVENTS.map((e) => (
              <li key={e.title} className={s.event}>
                <div className={s.eventDate}>
                  <span className={s.eventDay}>{e.day}</span>
                  <span className={s.eventMonth}>{e.month}</span>
                </div>
                <div className={s.eventText}>
                  <span className={s.eventWeekday}>{e.weekday}</span>
                  <h3>{e.title}</h3>
                  <p>{e.body}</p>
                </div>
                <span className={s.eventTime}>{e.time}</span>
                <span className={s.eventPrice}>{e.price}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- VISIT
            The barrels, tinted wine and pale, fill the left half to the
            page edge; hours and directions sit beside them. */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitArt}>
            <Artwork
              slug="terrace-hill-winery-barrels"
              alt="Oak barrels stacked three high in the cellar"
              mode="tint"
              fit="cover"
              inks={['var(--wine)', 'var(--pale)']}
              className={s.barrels}
            />
          </div>
          <div className={s.visitText}>
            <h2 id="visit-h">Visit the hill</h2>
            <p className={s.visitLede}>
              480 Terrace Hill Road, twelve minutes out of town. Turn in at
              the two cypresses and follow the gravel up to the farmhouse.
            </p>
            <h3 className={s.visitHead}>Tasting room hours</h3>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <h3 className={s.visitHead}>Good to know</h3>
            <ul className={s.visitNotes}>
              {VISIT_NOTES.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ CLUB */}
        <section id="club" className={s.sec} aria-labelledby="club-h">
          <div className={s.club}>
            <div className={s.clubText}>
              <h2 id="club-h">The Terrace Club</h2>
              <p>
                Four boxes a year, chosen by us, collected from the farmhouse
                or shipped within the state. Change the size or stop whenever
                you like.
              </p>
              <ul className={s.perks}>
                {PERKS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <ul className={s.tiers}>
              {CLUB.map((c) => (
                <li key={c.size}>
                  <span className={s.tierSize}>{c.size}</span>
                  <strong className={s.tierPrice}>{c.price}</strong>
                  <span className={s.tierEvery}>{c.every}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- RESERVE
            The hill again, after sunset: the same picture in other inks,
            with the wine color as the sky. */}
        <section id="reserve" className={s.reserve} aria-labelledby="reserve-h">
          <div className={s.reserveArt} aria-hidden="true">
            <Artwork
              slug="terrace-hill-winery-hills"
              alt=""
              fit="cover"
              inks={{ red: 'var(--ink)', blue: 'var(--gold)', yellow: 'var(--gold)', black: 'var(--wine)' }}
            />
          </div>
          <div className={s.reserveInner}>
            <div className={s.reserveText}>
              <h2 id="reserve-h">Reserve a tasting</h2>
              <p>
                Walk-ins are welcome for the Terrace Flight. For the cellar
                tour, the vineyard walk or a table for eight or more, tell us
                when and we will hold it.
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="th-tasting">Tasting</label>
                <select id="th-tasting" name="tasting" defaultValue="cellar">
                  <option value="flight">Terrace Flight, $18</option>
                  <option value="cellar">Cellar Tour and Tasting, $35</option>
                  <option value="walk">Vineyard Walk and Lunch, $68</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="th-date">Date</label>
                <input id="th-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="th-guests">Guests</label>
                <input id="th-guests" name="guests" type="number" min="1" max="20" defaultValue="2" />
              </div>
              <div className={s.field}>
                <label htmlFor="th-email">Email</label>
                <input id="th-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <button className={s.formBtn} type="submit">Hold my places</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <div className={s.secRule} aria-hidden="true" />
            <h2 id="faq-h">Questions at the bar</h2>
          </div>
          <div className={s.faq}>
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
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Terrace Hill</p>
            <p className={s.footTag}>A family vineyard of eleven terraces, pouring on the hill since 1987.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Find us</h2>
            <p className={s.footText}>
              480 Terrace Hill Road
              <br />
              Turn in at the two cypresses
            </p>
          </div>
          <div>
            <h2 className={s.footHead}>Talk to us</h2>
            <a className={s.footLink} href="mailto:cellar@terracehill.example">cellar@terracehill.example</a>
            <a className={s.footLink} href="tel:+15550129870">(555) 012-9870</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional winery. Wines, prices, events and the hill are invented. Please drink responsibly.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
