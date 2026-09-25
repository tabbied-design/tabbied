import { TabbiedPattern } from 'tabbied/react';
import { lagoon, wander } from 'tabbied/patterns';
import s from './coral-cove-beach-club.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Coral Cove: Beach club, Palm Strand',
  description:
    'Day beds, cabanas and a beach bar on a quiet cove. Rates, the bar menu, Friday sunset sessions and online booking for beds and cabanas.',
};

/* Site colors. The rings in the events panel are coral, sun, lagoon and
   shell on the ink; the wave band is lagoon with ink and sand paths. */
const SAND = '#FFF4EA';
const INK = '#16323D';
const CORAL = '#FF6F59';
const LAGOON = '#20A4B8';
const SUN = '#F7C873';
const SHELL = '#F8E1D1';

const RINGS = ['transparent', CORAL, SUN, LAGOON, SHELL, CORAL];
const WAVES = ['transparent', LAGOON, INK, SAND];

const NAV = [
  ['Beds', '#beds'],
  ['Bar', '#bar'],
  ['Events', '#events'],
  ['Getting here', '#visit'],
  ['Book', '#book'],
];

const TODAY = [
  ['Water', '75F, calm'],
  ['Sunset', '19:42'],
  ['Lifeguard', '10:00 - 18:00'],
  ['Day beds left', '6 of 40'],
];

type Bed = {
  name: string;
  who: string;
  weekday: string;
  weekend: string;
  text: string;
  includes: string[];
  featured?: boolean;
};

const BEDS: Bed[] = [
  {
    name: 'Loungers',
    who: 'A pair, for two',
    weekday: '$35',
    weekend: '$45',
    text: 'Two loungers under one of our striped parasols, on the sand behind the day beds.',
    includes: ['Two towels', 'Parasol', 'Order from the bar'],
  },
  {
    name: 'Day bed',
    who: 'For two, or two and a child',
    weekday: '$80',
    weekend: '$110',
    text: 'A cushioned bed with its own canopy, a side table and service from the bar all day.',
    includes: ['Towels and cushions', 'Canopy and parasol', 'Table service', '$20 more on the front row'],
    featured: true,
  },
  {
    name: 'Cabana',
    who: 'Up to six',
    weekday: '$260',
    weekend: '$340',
    text: 'A curtained cabana on the dune with a sofa, two day beds, a cooler of water and your own host.',
    includes: ['Everything a day bed has', 'Cooler, refilled', 'A host from 10:00 to 18:00', 'Fruit platter on arrival'],
  },
];

const BED_NOTES = [
  'After 14:00, every bed is half price.',
  'Loungers can be taken on the day; day beds and cabanas are best booked.',
  'Cancel up to 48 hours before for a full refund, or move to any other day.',
];

const MENU = [
  {
    head: 'Cocktails',
    items: [
      ['Coral spritz', 'Grapefruit, bitter orange, prosecco', '$13'],
      ['Lagoon margarita', 'Tequila, blue curacao, lime, sea salt', '$14'],
      ['Frozen colada', 'Rum, pineapple, coconut, blended', '$12'],
      ['Rose by the glass', 'From the islands, very cold', '$11'],
      ['Beach lager', 'Draft, in a can for the sand', '$7'],
    ],
  },
  {
    head: 'No alcohol',
    items: [
      ['Watermelon cooler', 'Watermelon, mint, soda', '$7'],
      ['Young coconut', 'With a straw, opened at the bar', '$6'],
      ['Iced hibiscus tea', 'Lightly sweet, refills free', '$4'],
      ['Cold brew', 'With oat or whole milk', '$5'],
    ],
  },
  {
    head: 'From the grill',
    items: [
      ['Fish tacos', 'Today\'s catch, lime slaw, chipotle', '$16'],
      ['Tuna poke bowl', 'Rice, mango, avocado, sesame', '$18'],
      ['Grilled corn', 'Chili butter, cotija', '$8'],
      ['Club sandwich', 'Chicken, bacon, fries', '$15'],
      ['Mango sorbet', 'In half a coconut', '$7'],
    ],
  },
];

const EVENTS = [
  { day: 'Every', month: 'Friday', name: 'Sunset sessions', when: '17:00 - 21:00', text: 'A DJ on the deck, the bar open late and the day beds turned to face the sun.', price: 'Free with any bed' },
  { day: '07', month: 'Oct', name: 'Full moon swim', when: '20:00', text: 'A guided night swim inside the buoys, then hot chocolate and a fire on the sand.', price: '$15' },
  { day: 'Sat', month: 'Sun', name: 'Sunrise yoga', when: '7:30 - 8:30', text: 'Seventy minutes on the sand before the club opens, mats provided.', price: '$18' },
  { day: '18', month: 'Oct', name: 'Crab boil supper', when: '18:30', text: 'Long tables on the beach, crab, corn and potatoes by the bucket.', price: '$55' },
];

const VISIT = [
  {
    head: 'Hours',
    lines: ['Every day, 9:00 to sunset', 'Bar and kitchen 10:00 - 19:00', 'Closed when the flag is red'],
  },
  {
    head: 'Getting here',
    lines: ['Free shuttle from Harbor Square, every 30 minutes', 'Parking on Dune Road, $10 a day', 'Bike racks by the gate'],
  },
  {
    head: 'On the beach',
    lines: ['No glass on the sand, please', 'Dogs welcome before 9:00 and after 18:00', 'Changing rooms and showers by the bar'],
  },
];

export default function CoralCoveBeachClubPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Yeseva+One&family=Quicksand:wght@500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">Coral Cove</a>
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
            The beach at sunset, full width: the sky is the section's coral,
            the palms stand in ink, and the words sit in the sky between them. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <span className={s.heroSea} />
            <Artwork
              slug="coral-cove-beach-club-beach"
              alt=""
              fit="cover"
              inks={{ red: 'var(--ink)', blue: 'var(--lagoon)', yellow: 'var(--sun)', black: 'var(--ink)' }}
            />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>Beach club on Palm Strand, open daily</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Sand, sea and
              <br />
              <em>a bed with a view.</em>
            </h1>
            <p className={s.heroLede}>
              Day beds, cabanas and a beach bar on a quiet cove, from nine in the
              morning until the sun goes into the sea.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Book a day bed</a>
              <a className={s.btnGhost} href="#beds">See the rates</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TODAY */}
        <section className={s.today} aria-labelledby="today-h">
          <h2 id="today-h" className={s.todayHead}>Today at the cove</h2>
          <dl className={s.todayList}>
            {TODAY.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BEDS
            Three cards under striped awnings. */}
        <section id="beds" className={s.beds} aria-labelledby="beds-h">
          <div className={s.secHead}>
            <h2 id="beds-h">Day beds and cabanas</h2>
            <p className={s.secNote}>
              Weekday and weekend rates for the whole day. Towels, parasols and
              the showers are always included.
            </p>
          </div>
          <ul className={s.bedGrid}>
            {BEDS.map((b) => (
              <li key={b.name} className={b.featured ? `${s.bed} ${s.bedFeatured}` : s.bed}>
                <span className={s.awning} aria-hidden="true" />
                <div className={s.bedBody}>
                  <h3>{b.name}</h3>
                  <p className={s.bedWho}>{b.who}</p>
                  <div className={s.rates}>
                    <p>
                      <span className={s.rateLabel}>Weekdays</span>
                      <strong>{b.weekday}</strong>
                    </p>
                    <p>
                      <span className={s.rateLabel}>Weekends</span>
                      <strong>{b.weekend}</strong>
                    </p>
                  </div>
                  <p className={s.bedText}>{b.text}</p>
                  <ul className={s.includes}>
                    {b.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <ul className={s.bedNotes}>
            {BED_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- BAR */}
        <section id="bar" className={s.barMenu} aria-labelledby="bar-h">
          <div className={s.barInner}>
            <div className={s.secHead}>
              <h2 id="bar-h">From the beach bar</h2>
              <p className={s.secNote}>
                Table service to every bed from 11:00 to 18:00. The bar closes at
                sunset, give or take a spritz.
              </p>
            </div>
            <div className={s.menuCols}>
              {MENU.map((col) => (
                <div key={col.head} className={s.menuCol}>
                  <h3>{col.head}</h3>
                  <ul>
                    {col.items.map(([name, what, price]) => (
                      <li key={name}>
                        <div className={s.itemTop}>
                          <strong>{name}</strong>
                          <span className={s.leader} aria-hidden="true" />
                          <span className={s.itemPrice}>{price}</span>
                        </div>
                        <span className={s.itemWhat}>{what}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div className={s.waves} aria-hidden="true">
          <TabbiedPattern
            pattern={wander}
            palette={WAVES}
            options={{ frequency: 0.9 }}
            fit="grid"
            cellSize={40}
            seed="coral-waves"
            redrawInterval={9000}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- EVENTS
            Life rings on the ink beside the list of what is on. */}
        <section id="events" className={s.events} aria-labelledby="events-h">
          <div className={s.eventsInner}>
            <div className={s.rings}>
              <div className={s.ringsField} aria-hidden="true">
                <TabbiedPattern
                  pattern={lagoon}
                  palette={RINGS}
                  options={{ frequency: 0.75 }}
                  fit="grid"
                  cellSize={72}
                  seed="coral-rings"
                  redrawInterval={8000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.ringsBadge}>
                <span className={s.ringsBig}>Fridays</span>
                <span>Sunset sessions, 17:00 until late</span>
              </p>
            </div>

            <div className={s.eventsBody}>
              <h2 id="events-h">What is on</h2>
              <ul className={s.eventList}>
                {EVENTS.map((e) => (
                  <li key={e.name} className={s.event}>
                    <p className={s.eventDate}>
                      <span className={s.eventDay}>{e.day}</span>
                      <span className={s.eventMonth}>{e.month}</span>
                    </p>
                    <div className={s.eventText}>
                      <h3>{e.name}</h3>
                      <p className={s.eventWhen}>{e.when}</p>
                      <p>{e.text}</p>
                    </div>
                    <span className={s.eventPrice}>{e.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <h2 id="visit-h" className={s.visitHead}>Getting here, and a few house rules</h2>
          <div className={s.visitGrid}>
            {VISIT.map((v) => (
              <div key={v.head} className={s.visitCol}>
                <h3>{v.head}</h3>
                <ul>
                  {v.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The pier at night: ink sky, lagoon sea. The generated sea has
            see-through holes, so a lagoon band sits behind the picture's
            bottom third and the holes read as water. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.pier} aria-hidden="true">
            <span className={s.pierSea} />
            <Artwork
              slug="coral-cove-beach-club-pier"
              alt=""
              fit="cover"
              inks={{ red: 'var(--coral)', blue: 'var(--lagoon)', yellow: 'var(--sun)', black: 'var(--ink)' }}
            />
          </div>

          <div className={s.bookInner}>
            <div className={s.bookText}>
              <h2 id="book-h">Book a bed for the day</h2>
              <p>
                Pick a day and a bed and we will hold it until noon. Pay on the
                sand when you arrive, by card or cash.
              </p>
            </div>
            <div className={s.formWrap}>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label htmlFor="cc-date">Date</label>
                  <input id="cc-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="cc-bed">Bed</label>
                  <select id="cc-bed" name="bed" defaultValue="Day bed">
                    {BEDS.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="cc-guests">Guests</label>
                  <input id="cc-guests" name="guests" type="number" min="1" max="6" defaultValue="2" />
                </div>
                <div className={s.field}>
                  <label htmlFor="cc-arrive">Arriving</label>
                  <select id="cc-arrive" name="arrive" defaultValue="Morning">
                    <option value="Morning">In the morning</option>
                    <option value="Afternoon">After 14:00, half price</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label htmlFor="cc-name">Name</label>
                  <input id="cc-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label htmlFor="cc-email">Email</label>
                  <input id="cc-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                </div>
                <button className={s.submit} type="submit">Hold my bed</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Coral Cove</p>
            <p className={s.footTag}>Beach club, Palm Strand. Open every day from 9:00 until sunset.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Find us</h2>
            <p className={s.footText}>End of Dune Road, past the lifeguard tower</p>
          </div>
          <div>
            <h2 className={s.footHead}>Call or write</h2>
            <a className={s.footLink} href="tel:+15550195530">(555) 019-5530</a>
            <a className={s.footLink} href="mailto:beds@coralcove.example">beds@coralcove.example</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional beach club. Rates, menus, events and the cove itself are invented.</p>
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
