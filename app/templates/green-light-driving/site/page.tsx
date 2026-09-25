import { TabbiedPattern } from 'tabbied/react';
import { hairpin, percale, slashbar } from 'tabbied/patterns';
import s from './green-light-driving.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Green Light: Driving school, Eastfield',
  description:
    'Driving lessons in automatic and manual cars, from a first drive on quiet streets to the car for your test. Six packages, four instructors and a 91% first-time pass rate.',
};

/* Site colors. The car, the light and the sign are stacked masks, one per
   color layer, each painted with one of the page's custom properties. */
const ASPHALT = '#141A16';
const GREEN = '#1F9D55';
const AMBER = '#F6C026';
const GRAY = '#858D87';

const BENDS = ['transparent', GREEN, GRAY];
const CROSSING = ['transparent', AMBER, ASPHALT];
const MARKINGS = ['transparent', AMBER, GREEN, GRAY];

const NAV = [
  ['Lessons', '#lessons'],
  ['Test prep', '#test'],
  ['Instructors', '#instructors'],
  ['Pass rates', '#results'],
  ['Book', '#book'],
];

const STOPS = [
  {
    no: '1',
    name: 'First drive',
    time: 'One 90-minute lesson',
    price: '$85',
    body: 'Quiet streets behind the school. The controls, moving off, stopping where you mean to, and the mirrors before all of it.',
    tag: 'For complete beginners',
  },
  {
    no: '2',
    name: 'Starter five',
    time: 'Five hours',
    price: '$325',
    body: 'Junctions, roundabouts and the right of way. By the fifth hour most learners are driving the loop through town without help.',
    tag: '$65 an hour',
  },
  {
    no: '3',
    name: 'Road ready ten',
    time: 'Ten hours',
    price: '$620',
    body: 'Traffic, lane changes, parallel parking and the three-point turn, until they are dull. The package most of our learners pass on.',
    tag: 'Most booked',
  },
  {
    no: '4',
    name: 'Highway session',
    time: 'Two hours',
    price: '$140',
    body: 'On-ramps, merging at speed, following distance and exits, on Route 9 in the middle of the day when it is steady.',
    tag: 'After ten hours',
  },
  {
    no: '5',
    name: 'Mock test',
    time: 'One hour',
    price: '$70',
    body: 'A real test route, the examiner\'s own script and the marking sheet, then twenty minutes going through every mark.',
    tag: 'Book two weeks before',
  },
  {
    no: '6',
    name: 'Test day',
    time: 'Two hours on the day',
    price: '$150',
    body: 'A warm-up drive, the car for the test, your instructor waiting in the lot, and a ride home whichever way it goes.',
    tag: 'Car and pickup included',
  },
];

const CHECKS = [
  {
    head: 'Paperwork',
    items: [
      'Learner permit, held for at least six months',
      '50 logged hours, 10 of them after dark, signed',
      'Photo ID and proof of address',
      'Test fee paid online, receipt printed',
    ],
  },
  {
    head: 'In the car',
    items: [
      'Seat, mirrors and belt before the engine',
      'Name the controls when asked: wipers, hazards, defrost',
      'Parallel park within 18 inches of the curb',
      'Full stop at every stop line, wheels still',
    ],
  },
  {
    head: 'On the day',
    items: [
      'A mock test in the last two weeks',
      'Glasses or contacts if your permit says so',
      'At the test center 20 minutes early',
      'A good night of sleep and a real breakfast',
    ],
  },
];

const INSTRUCTORS = [
  { initials: 'DM', name: 'Dana Moreno', years: '14 years teaching', car: 'Automatic', langs: 'English, Spanish', note: 'Calm with nervous drivers, and patient with the ones who were told they never would.', tone: 'green' },
  { initials: 'KO', name: 'Kofi Owusu', years: '9 years teaching', car: 'Manual and automatic', langs: 'English, Twi', note: 'Teaches the clutch the old way: on a hill, early, until it stops being a thing.', tone: 'amber' },
  { initials: 'LP', name: 'Lena Park', years: '6 years teaching', car: 'Automatic', langs: 'English, Korean', note: 'Former test examiner. Knows every route and what gets marked on each.', tone: 'red' },
  { initials: 'SB', name: 'Sam Brennan', years: '11 years teaching', car: 'Manual and automatic', langs: 'English, ASL', note: 'Evening and weekend lessons, and the highway sessions.', tone: 'green' },
];

const YEARS = [
  { y: '2021', ours: 86 },
  { y: '2022', ours: 88 },
  { y: '2023', ours: 87 },
  { y: '2024', ours: 90 },
  { y: '2025', ours: 91 },
];

export default function GreenLightPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800;900&family=Overpass+Mono:wght@500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markLight} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Green Light</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550174400">(555) 017-4400</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The light at green over a field of bends, the car on the road. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Driving school, Eastfield</p>
            <h1 className={s.title} id="hero-h">
              Learn calm. <em>Pass first time.</em>
            </h1>
            <p className={s.lede}>
              Lessons in dual-control cars with instructors who have heard
              every excuse and panic before. We pick you up from home, school
              or work, and plan every lesson toward the test from the first one.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Book a first drive</a>
              <a className={s.btnLine} href="#lessons">See the packages</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={hairpin}
                palette={BENDS}
                fit="grid"
                cellSize={64}
                options={{ frequency: 0.4 }}
                seed="eastfield-bends"
                redrawInterval={8400}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="green-light-driving-light"
              alt="A traffic light"
              inks={{ red: 'var(--red)', yellow: 'var(--amber)', blue: 'var(--green)', black: 'var(--asphalt)' }}
              className={s.heroLight}
            />
            <dl className={s.heroStat}>
              <dt>First-time pass rate, 2025</dt>
              <dd>91%</dd>
            </dl>
          </div>
        </section>

        {/* A side view of the road, the car on it, where the route begins. */}
        <div className={s.street}>
          <Artwork
            slug="green-light-driving-car"
            alt="A small green hatchback, seen from the side"
            inks={{ red: 'var(--green)', blue: 'color-mix(in srgb, var(--gray) 45%, var(--paper))', yellow: 'var(--amber)', black: 'var(--asphalt)' }}
            className={s.streetCar}
          />
          <span className={s.streetRoad} aria-hidden="true" />
        </div>

        {/* --------------------------------------------------------- LESSONS
            The packages as stops down one road, in the order most take them. */}
        <section id="lessons" className={s.lessons} aria-labelledby="lessons-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Lessons and packages</p>
            <h2 id="lessons-h">Six stops from the first drive to the test</h2>
            <p className={s.secNote}>
              Take them in order, or join the road where you are: every learner
              who has driven before starts with one lesson so we can tell. Prices
              include the car, fuel and pickup within Eastfield.
            </p>
          </div>
          <ol className={s.route}>
            <li className={s.routeStart} aria-hidden="true">
              <span>Start</span>
            </li>
            {STOPS.map((st) => (
              <li key={st.no} className={s.stop}>
                <span className={s.stopSign}>
                  <span className={s.stopLabel}>Stop</span>
                  <strong>{st.no}</strong>
                </span>
                <div className={s.stopCard}>
                  <span className={s.stopTag}>{st.tag}</span>
                  <h3 className={s.stopName}>{st.name}</h3>
                  <p className={s.stopTime}>{st.time}</p>
                  <p className={s.stopBody}>{st.body}</p>
                  <p className={s.stopPrice}>{st.price}</p>
                </div>
              </li>
            ))}
            <li className={s.routeEnd}>
              <Artwork
                slug="green-light-driving-sign"
                alt=""
                inks={{ red: 'var(--red)', blue: 'var(--green)', yellow: 'var(--paper)', black: 'var(--asphalt)' }}
                className={s.endSign}
              />
              <p className={s.endText}>Licensed. And no stopping from here.</p>
            </li>
          </ol>
          <p className={s.refresher}>
            Licensed already and out of practice? A refresher is three hours for
            $190, at your pace and on the roads you drive.
          </p>
        </section>

        {/* ------------------------------------------------------------ BAND
            A crossing between the road and the test. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={percale}
              palette={CROSSING}
              fit="grid"
              cellSize={56}
              options={{ frequency: 0.6 }}
              seed="crossing"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ------------------------------------------------------- TEST PREP */}
        <section id="test" className={s.test} aria-labelledby="test-h">
          <div className={s.testHead}>
            <div className={s.secHead}>
              <p className={s.secKick}>Test prep</p>
              <h2 id="test-h">The checklist we go through the week before</h2>
              <p className={s.secNote}>
                Tick them off here as you go. Most failed tests we hear about
                failed on the first list, not the second.
              </p>
            </div>
            <Artwork
              slug="green-light-driving-sign"
              alt="A round road sign on a post"
              inks={{ red: 'var(--red)', blue: 'var(--asphalt)', yellow: 'var(--amber)', black: 'var(--gray)' }}
              className={s.testSign}
            />
          </div>
          <div className={s.checks}>
            {CHECKS.map((group) => (
              <fieldset key={group.head} className={s.checkGroup}>
                <legend>{group.head}</legend>
                {group.items.map((it) => (
                  <label key={it} className={s.check}>
                    <input type="checkbox" name={group.head} value={it} />
                    <span>{it}</span>
                  </label>
                ))}
              </fieldset>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- INSTRUCTORS */}
        <section id="instructors" className={s.instructors} aria-labelledby="instructors-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Instructors</p>
            <h2 id="instructors-h">Four instructors, four cars, one way of teaching</h2>
          </div>
          <ul className={s.people}>
            {INSTRUCTORS.map((p) => (
              <li key={p.name} className={s.person} data-tone={p.tone}>
                <span className={s.initials} aria-hidden="true">{p.initials}</span>
                <h3>{p.name}</h3>
                <p className={s.personYears}>{p.years}</p>
                <dl className={s.personFacts}>
                  <div>
                    <dt>Car</dt>
                    <dd>{p.car}</dd>
                  </div>
                  <div>
                    <dt>Speaks</dt>
                    <dd>{p.langs}</dd>
                  </div>
                </dl>
                <p className={s.personNote}>{p.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- RESULTS */}
        <section id="results" className={s.results} aria-labelledby="results-h">
          <div className={s.resultsField} aria-hidden="true">
            <TabbiedPattern
              pattern={slashbar}
              palette={MARKINGS}
              fit="grid"
              cellSize={48}
              options={{ frequency: 0.35 }}
              seed="markings"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.resultsInner}>
            <div className={s.resultsText}>
              <p className={s.secKick}>Pass rates</p>
              <h2 id="results-h">Nine in ten pass on the first try</h2>
              <p className={s.resultsNote}>
                Counted from the state&apos;s own results for every learner who
                took a test in our car, including the ones who booked before we
                thought they were ready.
              </p>
              <dl className={s.figures}>
                <div>
                  <dt>First-time passes, 2025</dt>
                  <dd>91%</dd>
                </div>
                <div>
                  <dt>State average</dt>
                  <dd>52%</dd>
                </div>
                <div>
                  <dt>Learners since 2011</dt>
                  <dd>1,480</dd>
                </div>
                <div>
                  <dt>Average hours before a test</dt>
                  <dd>27</dd>
                </div>
              </dl>
            </div>
            <figure className={s.chart}>
              <figcaption>First-time pass rate by year, against the state average of about 52%</figcaption>
              <ul className={s.bars}>
                {YEARS.map((yr) => (
                  <li key={yr.y} className={s.barItem}>
                    <span className={s.barValue}>{`${yr.ours}%`}</span>
                    <span className={s.barTrack} aria-hidden="true">
                      <span className={s.barFill} style={{ height: `${yr.ours}%` }} />
                    </span>
                    <span className={s.barYear}>{yr.y}</span>
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInfo}>
            <p className={s.secKick}>Book a lesson</p>
            <h2 id="book-h">Tell us where to pick you up</h2>
            <p className={s.bookLede}>
              We call back the same day to agree a first time. Lessons run from 7
              am to 8 pm on weekdays and 8 am to 4 pm on Saturdays.
            </p>
            <dl className={s.bookFacts}>
              <div>
                <dt>Office</dt>
                <dd>40 Mercer Avenue, Eastfield</dd>
              </div>
              <div>
                <dt>Call</dt>
                <dd>(555) 017-4400</dd>
              </div>
              <div>
                <dt>Write</dt>
                <dd>lessons@greenlight.example</dd>
              </div>
              <div>
                <dt>Cancel</dt>
                <dd>Free up to 24 hours before</dd>
              </div>
            </dl>
            <Artwork
              slug="green-light-driving-light"
              alt=""
              inks={{ red: 'var(--gray)', yellow: 'var(--gray)', blue: 'var(--green)', black: 'var(--asphalt)' }}
              className={s.bookLight}
            />
          </div>
          <form className={s.form} action="#">
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="gl-name">Name</label>
                <input id="gl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="gl-phone">Phone</label>
                <input id="gl-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div className={s.field}>
              <label htmlFor="gl-package">Package</label>
              <select id="gl-package" name="package" defaultValue="1">
                {STOPS.map((st) => (
                  <option key={st.no} value={st.no}>{`Stop ${st.no}: ${st.name}, ${st.price}`}</option>
                ))}
                <option value="refresher">Refresher, $190</option>
              </select>
            </div>
            <fieldset className={s.radios}>
              <legend>Gearbox</legend>
              <label className={s.radio}>
                <input type="radio" name="gearbox" value="automatic" defaultChecked />
                <span>Automatic</span>
              </label>
              <label className={s.radio}>
                <input type="radio" name="gearbox" value="manual" />
                <span>Manual</span>
              </label>
            </fieldset>
            <div className={s.field}>
              <label htmlFor="gl-pickup">Pick me up at</label>
              <input id="gl-pickup" name="pickup" type="text" placeholder="Street and number, or a school" />
            </div>
            <fieldset className={s.radios}>
              <legend>Best times</legend>
              <label className={s.radio}>
                <input type="checkbox" name="times" value="mornings" />
                <span>Mornings</span>
              </label>
              <label className={s.radio}>
                <input type="checkbox" name="times" value="afternoons" />
                <span>Afternoons</span>
              </label>
              <label className={s.radio}>
                <input type="checkbox" name="times" value="evenings" />
                <span>Evenings</span>
              </label>
              <label className={s.radio}>
                <input type="checkbox" name="times" value="saturdays" />
                <span>Saturdays</span>
              </label>
            </fieldset>
            <button className={s.submit} type="submit">Request a lesson</button>
            <small className={s.formNote}>Pay after each lesson, or for a package up front. Packages do not expire.</small>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p className={s.footName}>Green Light</p>
            <p className={s.footTag}>Driving school, 40 Mercer Avenue, Eastfield.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p>A fictional driving school. Prices, pass rates and people are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
