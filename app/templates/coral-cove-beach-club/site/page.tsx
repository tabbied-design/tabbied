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
const FOAM = ['transparent', LAGOON, SAND];
const PALE_RINGS = ['transparent', SAND];

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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sand': '#fff4ea',
        '--ink': '#16323d',
        '--coral': '#ff6f59',
        '--lagoon': '#20a4b8',
        '--sun': '#f7c873',
        '--gray': '#8fa1a6',
        '--shell': '#f8e1d1',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sand,ink,coral,lagoon,sun,gray,shell"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Yeseva+One&family=Quicksand:wght@500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.brand" data-edit-max="28" className={s.brand} href="#top">Coral Cove</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
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
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Beach club on Palm Strand</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Sand, sea and
              <br />
              <em>a bed with a view.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Day beds, cabanas and a beach bar on a quiet cove, from nine in the
              morning until the sun goes into the sea.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book a day bed</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#beds">See the rates</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TODAY */}
        <section className={s.today} aria-labelledby="today-h">
          <span data-edit-pattern="today.field" data-edit-roles="transparent,2,4,3,6,2" className={s.todayRing} aria-hidden="true">
            <TabbiedPattern
              pattern={lagoon}
              palette={RINGS}
              fit="grid"
              cellSize={28}
              seed="life-ring"
              style={{ position: 'absolute', inset: 0 }}
            />
          </span>
          <h2 data-edit="today.todayHead" data-edit-max="60" id="today-h" className={s.todayHead}>Today at the cove</h2>
          <dl className={s.todayList}>
            {TODAY.map(([term, value], i) => (
              <div key={term}>
                <dt data-edit={`today.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`today.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BEDS
            Three cards under striped awnings. */}
        <section id="beds" className={s.beds} aria-labelledby="beds-h">
          <div className={s.secHead}>
            <h2 data-edit="beds.title" data-edit-max="60" id="beds-h">Day beds and cabanas</h2>
            <p data-edit="beds.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Weekday and weekend rates for the whole day. Towels, parasols and
              the showers are always included.
            </p>
          </div>
          <ul className={s.bedGrid}>
            {BEDS.map((b, i) => (
              <li key={b.name} className={b.featured ? `${s.bed} ${s.bedFeatured}` : s.bed}>
                <span className={s.awning} aria-hidden="true" />
                <div className={s.bedBody}>
                  <h3 data-edit={`beds.title2.${i}`} data-edit-max="40">{b.name}</h3>
                  <p data-edit={`beds.bedWho.${i}`} data-edit-max="240" data-edit-multiline className={s.bedWho}>{b.who}</p>
                  <div className={s.rates}>
                    <p>
                      <span data-edit={`beds.rateLabel.${i}`} data-edit-max="60" className={s.rateLabel}>Weekdays</span>
                      <strong data-edit={`beds.emphasis.${i}`}>{b.weekday}</strong>
                    </p>
                    <p>
                      <span data-edit={`beds.rateLabel2.${i}`} data-edit-max="60" className={s.rateLabel}>Weekends</span>
                      <strong data-edit={`beds.emphasis2.${i}`}>{b.weekend}</strong>
                    </p>
                  </div>
                  <p data-edit={`beds.bedText.${i}`} data-edit-max="240" data-edit-multiline className={s.bedText}>{b.text}</p>
                  <ul className={s.includes}>
                    {b.includes.map((item, i2) => (
                      <li data-edit={`beds.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <ul className={s.bedNotes}>
            {BED_NOTES.map((n, i) => (
              <li data-edit={`beds.item2.${i}`} data-edit-max="80" key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- BAR */}
        <section id="bar" className={s.barMenu} aria-labelledby="bar-h">
          <div data-edit-pattern="bar.field" data-edit-roles="transparent,0" className={s.barRings} aria-hidden="true">
            <TabbiedPattern
              pattern={lagoon}
              palette={PALE_RINGS}
              options={{ frequency: 0.3 }}
              fit="grid"
              cellSize={96}
              seed="bar-rings"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.barInner}>
            <div className={s.secHead}>
              <h2 data-edit="bar.title" data-edit-max="60" id="bar-h">From the beach bar</h2>
              <p data-edit="bar.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Table service to every bed from 11:00 to 18:00. The bar closes at
                sunset, give or take a spritz.
              </p>
            </div>
            <div className={s.menuCols}>
              {MENU.map((col, i) => (
                <div key={col.head} className={s.menuCol}>
                  <h3 data-edit={`bar.title2.${i}`} data-edit-max="40">{col.head}</h3>
                  <ul>
                    {col.items.map(([name, what, price], i2) => (
                      <li key={name}>
                        <div className={s.itemTop}>
                          <strong data-edit={`bar.emphasis.${i}.${i2}`}>{name}</strong>
                          <span className={s.leader} aria-hidden="true" />
                          <span data-edit={`bar.itemPrice.${i}.${i2}`} data-edit-max="60" className={s.itemPrice}>{price}</span>
                        </div>
                        <span data-edit={`bar.itemWhat.${i}.${i2}`} data-edit-max="60" className={s.itemWhat}>{what}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,1,0" className={s.waves} aria-hidden="true">
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
              <div data-edit-pattern="events.field" data-edit-roles="transparent,2,4,3,6,2" className={s.ringsField} aria-hidden="true">
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
                <span data-edit="events.ringsBig" data-edit-max="60" className={s.ringsBig}>Fridays</span>
                <span data-edit="events.text" data-edit-max="60">Sunset sessions, 17:00 until late</span>
              </p>
            </div>

            <div className={s.eventsBody}>
              <h2 data-edit="events.title" data-edit-max="60" id="events-h">What is on</h2>
              <ul className={s.eventList}>
                {EVENTS.map((e, i) => (
                  <li key={e.name} className={s.event}>
                    <p className={s.eventDate}>
                      <span data-edit={`events.eventDay.${i}`} data-edit-max="60" className={s.eventDay}>{e.day}</span>
                      <span data-edit={`events.eventMonth.${i}`} data-edit-max="60" className={s.eventMonth}>{e.month}</span>
                    </p>
                    <div className={s.eventText}>
                      <h3 data-edit={`events.title2.${i}`} data-edit-max="40">{e.name}</h3>
                      <p data-edit={`events.eventWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.eventWhen}>{e.when}</p>
                      <p data-edit={`events.body.${i}`} data-edit-max="240" data-edit-multiline>{e.text}</p>
                    </div>
                    <span data-edit={`events.eventPrice.${i}`} data-edit-max="60" className={s.eventPrice}>{e.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <h2 data-edit="visit.visitHead" data-edit-max="60" id="visit-h" className={s.visitHead}>Getting here, and a few house rules</h2>
          <div className={s.visitGrid}>
            {VISIT.map((v, i) => (
              <div key={v.head} className={s.visitCol}>
                <h3 data-edit={`visit.title.${i}`} data-edit-max="40">{v.head}</h3>
                <ul>
                  {v.lines.map((line, i2) => (
                    <li data-edit={`visit.item.${i}.${i2}`} data-edit-max="80" key={line}>{line}</li>
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
              <h2 data-edit="book.title" data-edit-max="60" id="book-h">Book a bed for the day</h2>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline>
                Pick a day and a bed and we will hold it until noon. Pay on the
                sand when you arrive, by card or cash.
              </p>
            </div>
            <div className={s.formWrap}>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="cc-date">Date</label>
                  <input id="cc-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="cc-bed">Bed</label>
                  <select id="cc-bed" name="bed" defaultValue="Day bed">
                    {BEDS.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="cc-guests">Guests</label>
                  <input id="cc-guests" name="guests" type="number" min="1" max="6" defaultValue="2" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="cc-arrive">Arriving</label>
                  <select id="cc-arrive" name="arrive" defaultValue="Morning">
                    <option value="Morning">In the morning</option>
                    <option value="Afternoon">After 14:00, half price</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="book.label5" htmlFor="cc-name">Name</label>
                  <input id="cc-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="book.label6" htmlFor="cc-email">Email</label>
                  <input id="cc-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                </div>
                <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Hold my bed</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,0" className={s.footWaves} aria-hidden="true">
          <TabbiedPattern
            pattern={wander}
            palette={FOAM}
            fit="grid"
            cellSize={28}
            seed="foot-waves"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Coral Cove</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Beach club, Palm Strand. Open every day from 9:00 until sunset.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Find us</h2>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>End of Dune Road, past the lifeguard tower</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Call or write</h2>
            <a data-edit="footer.footLink" data-edit-max="28" className={s.footLink} href="tel:+15550195530">(555) 019-5530</a>
            <a data-edit="footer.footLink2" data-edit-max="28" className={s.footLink} href="mailto:beds@coralcove.example">beds@coralcove.example</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional beach club. Rates, menus, events and the cove itself are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
