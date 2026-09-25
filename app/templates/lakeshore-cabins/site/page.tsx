import { TabbiedPattern } from 'tabbied/react';
import { sparkle, tidering } from 'tabbied/patterns';
import s from './lakeshore-cabins.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Lakeshore Cabins: Cabin rentals, Heron Lake',
  description:
    'Six cabins on the quiet north shore of Heron Lake, each with a dock, a canoe and a woodstove. Open May to October, winter weekends in two cabins.',
};

/* Site colors. Both star fields sit on `transparent`, so the stars are
   drawn straight onto the section's own dusk sky. */
const CREAM = '#EFE9DD';
const AMBER = '#E0A458';
const LAKE = '#7FA3B5';
const SLATE = '#6C7684';

const STARS = ['transparent', CREAM, AMBER, LAKE];
const RIPPLE = ['transparent', LAKE, SLATE, AMBER];

const NAV = [
  ['Cabins', '#cabins'],
  ['Rates', '#rates'],
  ['The lake', '#lake'],
  ['Staying', '#staying'],
  ['FAQ', '#faq'],
  ['Book', '#book'],
];

type Cabin = {
  no: string;
  name: string;
  sleeps: string;
  beds: string;
  features: string;
  night: string;
  week: string;
};

const CABINS: Cabin[] = [
  {
    no: '1',
    name: 'Heron',
    sleeps: 'Sleeps 2',
    beds: 'One queen',
    features: 'Screened porch, the closest cabin to the swimming dock',
    night: '$165',
    week: '$1,050',
  },
  {
    no: '2',
    name: 'Loon',
    sleeps: 'Sleeps 4',
    beds: 'Queen and a bunk room',
    features: 'Woodstove, open all winter, dogs welcome',
    night: '$195',
    week: '$1,250',
  },
  {
    no: '3',
    name: 'Birch',
    sleeps: 'Sleeps 4',
    beds: 'Two queens',
    features: 'A porch built out over the water, the best sunsets on the shore',
    night: '$210',
    week: '$1,340',
  },
  {
    no: '4',
    name: 'Tamarack',
    sleeps: 'Sleeps 6',
    beds: 'Three bedrooms',
    features: 'Woodstove, its own fire pit and dock, open all winter',
    night: '$265',
    week: '$1,690',
  },
  {
    no: '5',
    name: 'Osprey',
    sleeps: 'Sleeps 2',
    beds: 'One king',
    features: 'Alone on the point, with an outdoor cedar shower',
    night: '$185',
    week: '$1,180',
  },
  {
    no: '6',
    name: 'Boathouse Loft',
    sleeps: 'Sleeps 3',
    beds: 'Queen and a daybed',
    features: 'Above the boathouse, a kitchenette and the only Wi-Fi',
    night: '$150',
    week: '$950',
  },
];

type Season = {
  name: string;
  dates: string;
  rule: string;
  note: string;
};

const SEASONS: Season[] = [
  {
    name: 'Early',
    dates: 'May 15 to June 20',
    rule: '15% off the rates above',
    note: 'Cold water, warm afternoons and the loons nesting. Two nights minimum.',
  },
  {
    name: 'Summer',
    dates: 'June 21 to August 31',
    rule: 'Full rates, weeks run Saturday to Saturday',
    note: 'July and August book by the week. Short stays open up from mid-June if a gap is left.',
  },
  {
    name: 'Fall',
    dates: 'September to October 15',
    rule: '10% off, two nights minimum',
    note: 'The maples go red along the far shore and the lake is yours on a weekday.',
  },
  {
    name: 'Winter weekends',
    dates: 'December to March',
    rule: 'Loon and Tamarack only, $210 and $280',
    note: 'The road is plowed to the lot; you walk the last 200 yards on a lit path.',
  },
];

const INCLUDED = [
  'Linens, towels and a stack of firewood',
  'A canoe, paddles and life jackets at every dock',
  'The wood-fired sauna, Wednesday and Saturday',
  'Coffee from the roaster in Heron Falls',
];

const EXTRAS = [
  ['Dog, Loon or Tamarack', '$20 a night'],
  ['Late checkout, to 2 pm', '$40'],
  ['Extra firewood bundle', '$8'],
  ['Kayak, by the day', '$35'],
];

const LAKE_THINGS = [
  {
    title: 'Swim from the dock',
    body: 'Sandy bottom, a ladder, and water that reaches 72 F by the end of July. The raft is anchored forty strokes out.',
  },
  {
    title: 'Paddle to the island',
    body: 'Half an hour by canoe to Gull Island, where there is a picnic table, a fire ring and nobody else.',
  },
  {
    title: 'Fish',
    body: 'Pike off the point, perch along the weed beds. A state license is needed; you can buy one online in five minutes.',
  },
  {
    title: 'Take the sauna',
    body: 'Wood-fired, at the end of the boathouse dock. We light it at five on Wednesdays and Saturdays; the lake is the cold plunge.',
  },
  {
    title: 'Walk the shore trail',
    body: 'Four miles around the north bay through cedar and birch, flat all the way, with a lookout over the narrows.',
  },
  {
    title: 'Look up',
    body: 'No town lights for eleven miles. On a clear night in August the Milky Way comes down to the treeline.',
  },
];

const PRACTICAL = [
  ['Check-in', 'From 4 pm. The lockbox code comes by text the day before.'],
  ['Checkout', 'By 11 am. Strip the beds, leave the towels in the bin, and that is all.'],
  ['Groceries', 'Heron Falls General, nine miles, open 7 am to 9 pm. Bring what you can.'],
  ['Wi-Fi', 'In the Boathouse Loft and on its porch. The cabins have none, on purpose.'],
  ['Quiet hours', '10 pm to 7 am. Sound carries a long way over still water.'],
  ['Fires', 'In the stone rings and the stoves only. We post a notice when there is a burn ban.'],
];

const FAQS = [
  {
    q: 'Is there cell signal?',
    a: 'One bar on most docks and none in the cabins. The Boathouse Loft has Wi-Fi, and the office phone is on the porch of the main house for anything urgent.',
  },
  {
    q: 'Are the cabins heated?',
    a: 'Loon and Tamarack have woodstoves and are open all winter. The other four have electric heaters for cold nights in May and October.',
  },
  {
    q: 'Can we bring a boat?',
    a: 'Yes, anything you can launch by hand. The public ramp for trailers is on the south shore, four miles round by road.',
  },
  {
    q: 'What about bugs?',
    a: 'Black flies in early June and mosquitoes at dusk until mid-July. The porches are screened; bring repellent for the trail.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Full refund up to 30 days before arrival, half after that. If we can rebook the dates, you get the rest back too.',
  },
];

export default function LakeshoreCabinsPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Figtree:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Lakeshore Cabins</a>
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
            The shore photograph in two inks, full width, over a dusk sky:
            the photo's own sky is empty, so the section's gradient and its
            stars show through above the trees. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroStars} aria-hidden="true">
            <TabbiedPattern
              pattern={sparkle}
              palette={STARS}
              options={{ frequency: 0.3 }}
              fit="grid"
              cellSize={34}
              seed="lakeshore-sky"
              redrawInterval={8000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroArt} aria-hidden="true">
            <Artwork slug="lakeshore-cabins-shore" alt="" fit="cover" inks={['var(--night)', 'var(--lake)']} />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>Six cabins on the north shore of Heron Lake</p>
            <h1 id="hero-h" className={s.heroTitle}>
              A dock, a stove,
              <br />
              <em>and no neighbors in sight.</em>
            </h1>
            <p className={s.heroLede}>
              Each cabin has its own stretch of shore, a canoe tied up at the
              end of the dock and a woodpile by the door. Open May to October,
              and two of them all winter.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Check availability</a>
              <a className={s.btnLine} href="#cabins">See the six cabins</a>
            </div>
          </div>
          <dl className={s.tonight}>
            <div>
              <dt>Sunset tonight</dt>
              <dd>8:14 pm</dd>
            </div>
            <div>
              <dt>Water at the dock</dt>
              <dd>68 F</dd>
            </div>
            <div>
              <dt>Next free week</dt>
              <dd>Aug 23</dd>
            </div>
          </dl>
        </section>

        {/* ---------------------------------------------------------- CABINS */}
        <section id="cabins" className={s.sec} aria-labelledby="cabins-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>The cabins</p>
            <h2 id="cabins-h">Six cabins, spread along a mile of shore</h2>
            <p className={s.secNote}>
              Rates are for the whole cabin, per night and per week, in
              summer. Every one has a kitchen, a bathroom with a shower, a
              porch and its own dock.
            </p>
          </div>
          <ol className={s.cabins}>
            <li className={s.cabinHead} aria-hidden="true">
              <span>Cabin</span>
              <span>Beds</span>
              <span>What sets it apart</span>
              <span>Night</span>
              <span>Week</span>
            </li>
            {CABINS.map((c) => (
              <li key={c.name} className={s.cabin}>
                <span className={s.cabinNo}>{c.no}</span>
                <div className={s.cabinName}>
                  <h3>{c.name}</h3>
                  <span>{c.sleeps}</span>
                </div>
                <span className={s.cabinBeds}>{c.beds}</span>
                <p className={s.cabinFeatures}>{c.features}</p>
                <div className={s.cabinRates}>
                  <span className={s.cabinNight}>{c.night}</span>
                  <span className={s.rateUnit}>a night</span>
                  <span className={s.cabinWeek}>{c.week}</span>
                  <span className={s.rateUnit}>a week</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ BAND
            Rings spreading from the foot of every cell, like the wake of a
            paddle stroke. Nothing to read. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={tidering}
              palette={RIPPLE}
              options={{ frequency: 0.5 }}
              fit="grid"
              cellSize={72}
              seed="lakeshore-wake"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ----------------------------------------------------------- RATES */}
        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Rates and seasons</p>
            <h2 id="rates-h">When to come, and what it costs</h2>
          </div>
          <div className={s.seasons}>
            {SEASONS.map((se) => (
              <article key={se.name} className={s.season}>
                <h3>{se.name}</h3>
                <span className={s.seasonDates}>{se.dates}</span>
                <p className={s.seasonRule}>{se.rule}</p>
                <p className={s.seasonNote}>{se.note}</p>
              </article>
            ))}
          </div>
          <div className={s.included}>
            <div>
              <h3 className={s.listHead}>Always included</h3>
              <ul className={s.ticks}>
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={s.listHead}>Extras</h3>
              <dl className={s.extras}>
                {EXTRAS.map(([item, price]) => (
                  <div key={item}>
                    <dt>{item}</dt>
                    <dd>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ LAKE */}
        <section id="lake" className={s.lake} aria-labelledby="lake-h">
          <div className={s.lakeInner}>
            <div className={s.lakeIntro}>
              <p className={s.eyebrow}>The lake</p>
              <h2 id="lake-h">Eleven miles from the nearest streetlight</h2>
              <p>
                Heron Lake is two miles long, spring-fed and closed to
                motorboats over ten horsepower, so what you hear from the
                porch is loons and the odd paddle knocking a gunwale.
              </p>
              <div className={s.lakePhoto}>
                <Artwork
                  slug="lakeshore-cabins-shore"
                  alt="The shore at dusk: pines, flat water and the swimming dock"
                  mode="tint"
                  inks={['var(--deep)', 'var(--amber)']}
                />
              </div>
            </div>
            <ul className={s.things}>
              {LAKE_THINGS.map((t) => (
                <li key={t.title}>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- STAYING */}
        <section id="staying" className={s.sec} aria-labelledby="staying-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Staying here</p>
            <h2 id="staying-h">The practical part</h2>
          </div>
          <dl className={s.practical}>
            {PRACTICAL.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The cabin photograph behind the whole section, warm this time,
            with the stars again in its empty sky. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookStars} aria-hidden="true">
            <TabbiedPattern
              pattern={sparkle}
              palette={STARS}
              options={{ frequency: 0.25 }}
              fit="grid"
              cellSize={52}
              seed="lakeshore-book"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.bookArt} aria-hidden="true">
            <Artwork slug="lakeshore-cabins-cabin" alt="" fit="cover" inks={['var(--night)', 'var(--amber)']} />
          </div>
          <div className={s.bookInner}>
            <div className={s.bookText}>
              <p className={s.eyebrow}>Book a cabin</p>
              <h2 id="book-h">Tell us the week, we will find the cabin</h2>
              <p>
                We answer every request within a day, by email, with what is
                free and a link for the 30% deposit. The rest is due two weeks
                before you arrive.
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.formPair}>
                <div className={s.field}>
                  <label htmlFor="lc-in">Arrive</label>
                  <input id="lc-in" name="arrive" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="lc-out">Leave</label>
                  <input id="lc-out" name="leave" type="date" />
                </div>
              </div>
              <div className={s.formPair}>
                <div className={s.field}>
                  <label htmlFor="lc-cabin">Cabin</label>
                  <select id="lc-cabin" name="cabin" defaultValue="any">
                    <option value="any">Any that is free</option>
                    {CABINS.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="lc-guests">Guests</label>
                  <input id="lc-guests" name="guests" type="number" min="1" max="6" defaultValue="2" />
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="lc-email">Email</label>
                <input id="lc-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <button className={s.formBtn} type="submit">Ask for these dates</button>
              <p className={s.formNote}>Or call Ruth at the office, (555) 018-4471.</p>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Questions</p>
            <h2 id="faq-h">Asked on the dock, most summers</h2>
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
            <p className={s.footName}>Lakeshore Cabins</p>
            <p className={s.footTag}>Six cabins, six docks, one quiet lake.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Find us</h2>
            <p className={s.footText}>
              1180 North Shore Road
              <br />
              Heron Lake
            </p>
          </div>
          <div>
            <h2 className={s.footHead}>Write or call</h2>
            <a className={s.footLink} href="mailto:stay@lakeshorecabins.example">stay@lakeshorecabins.example</a>
            <a className={s.footLink} href="tel:+15550184471">(555) 018-4471</a>
          </div>
          <div>
            <h2 className={s.footHead}>Office hours</h2>
            <p className={s.footText}>Daily, 9 am to 6 pm, May to October</p>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional cabin rental. Cabins, rates and the lake itself are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, photographs painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
