import { TabbiedPattern } from 'tabbied/react';
import { contourlines, terrain } from 'tabbied/patterns';
import s from './high-pass-lodge.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'High Pass Lodge: Mountain lodge, Kettle Pass',
  description:
    'Twelve rooms, a bunk loft and one cabin at 7,020 feet, at the top of the Kettle Pass road. Half board, trails from the door, open all year.',
};

/* Site colors. The fields sit on `transparent`, so the pattern is drawn on
   whatever ground the section has: the ink band under the forest, the snow
   of the trails panel. */
const INK = '#16222B';
const LAKE = '#3E6E8E';
const EMBER = '#D97B4A';
const STONE = '#8D99A1';
const FROST = '#CBD8DE';

const BAND = ['transparent', FROST, EMBER, STONE];
const SURVEY = ['transparent', LAKE, STONE, INK];

const NAV = [
  ['Rooms', '#rooms'],
  ['Dining', '#dining'],
  ['Seasons', '#seasons'],
  ['Trails', '#trails'],
  ['Getting here', '#getting-here'],
  ['Book', '#book'],
];

const CONDITIONS = [
  ['Pass road', 'Open', 'Chains advised after 6 pm'],
  ['Snow at the lodge', '34 in', 'Fresh 6 in overnight'],
  ['Lake', '48 F', 'Ice-out came May 30'],
  ['Sunset tonight', '7:32 pm', 'Over the North Col'],
];

type Room = {
  name: string;
  count: string;
  sleeps: string;
  beds: string;
  view: string;
  price: string;
  unit: string;
  note: string;
};

const ROOMS: Room[] = [
  {
    name: 'Pass Room',
    count: '8 rooms',
    sleeps: 'Sleeps 2',
    beds: 'Queen or two twins',
    view: 'Valley side',
    price: '$240',
    unit: 'per night for two',
    note: 'Pine walls, a shower room, a deep window seat over the valley and a wool blanket on every bed.',
  },
  {
    name: 'Ridge Room',
    count: '3 rooms',
    sleeps: 'Sleeps 2 to 3',
    beds: 'King and a daybed',
    view: 'Range side, balcony',
    price: '$310',
    unit: 'per night for two',
    note: 'The corner rooms. A balcony facing the range, a bath as well as a shower, and the first light of the morning.',
  },
  {
    name: 'Bunk Loft',
    count: '10 bunks',
    sleeps: 'Per person',
    beds: 'Single bunks, sheets included',
    view: 'Under the roof beams',
    price: '$85',
    unit: 'per person per night',
    note: 'For climbers and ski tourers who want to be first out the door. Lockers, a drying room and shared washrooms on the landing.',
  },
  {
    name: 'Stove Cabin',
    count: '1 cabin',
    sleeps: 'Sleeps 4',
    beds: 'Queen and two bunks',
    view: 'By the lake path',
    price: '$420',
    unit: 'per night for up to four',
    note: 'A hundred yards from the lodge with a woodstove, a porch and a kitchen corner. Dinner is still ours, and still at seven.',
  },
];

const MENU = [
  ['Barley broth with smoked lake trout and dill', 'First'],
  ['Roasted beets, mountain cheese, walnuts, rye crumbs', 'Second'],
  ['Braised elk shoulder, juniper, soft polenta', 'Main'],
  ['Wild mushroom barley with brown butter', 'Or'],
  ['Blueberry tart, sour cream, a glass of the house liqueur', 'Last'],
];

const MEALS = [
  ['Breakfast', '7:00 to 9:30'],
  ['Packed lunch', 'Order by 9 pm, $16'],
  ['Dinner', 'One sitting at 7:00'],
  ['The bar', '4 pm to 11 pm'],
  ['Dinner for non-residents', '$58, book by noon'],
];

type Season = {
  name: string;
  months: string;
  body: string;
  doing: string[];
};

const SEASONS: Season[] = [
  {
    name: 'Winter',
    months: 'December to March',
    body: 'The road is plowed by eight and the snowshoe loops are packed every morning. Skins go on at the boot room door.',
    doing: ['Ski touring', 'Snowshoe loops', 'Avalanche course, January'],
  },
  {
    name: 'Spring',
    months: 'April to mid-May',
    body: 'Corn snow on the north bowls into May, bare trails on the south slope. We close May 12 to 30 to mend the roof.',
    doing: ['Spring skiing', 'First hikes', 'Closed May 12 to 30'],
  },
  {
    name: 'Summer',
    months: 'June to September',
    body: 'Wildflowers in July, the lake warm enough for a fast swim by August, every trail open to the summit ridge.',
    doing: ['Hiking', 'Lake swims', 'Guided summit days'],
  },
  {
    name: 'Fall',
    months: 'October and November',
    body: 'The larches turn gold in the second week of October. Weekdays are quiet and the fire is lit by four.',
    doing: ['Larch walks', 'Stargazing', 'Quiet weekdays'],
  },
];

type Trail = {
  name: string;
  distance: string;
  climb: string;
  time: string;
  grade: string;
};

const TRAILS: Trail[] = [
  { name: 'Lake Loop', distance: '2.4 mi', climb: '180 ft', time: '1 hour', grade: 'Easy' },
  { name: 'Larch Ridge', distance: '5.1 mi', climb: '1,150 ft', time: '3 hours', grade: 'Moderate' },
  { name: 'North Col', distance: '7.8 mi', climb: '2,300 ft', time: '5 hours', grade: 'Hard' },
  { name: 'Mount Ober summit', distance: '10.2 mi', climb: '3,480 ft', time: '7 hours', grade: 'Hard, some scrambling' },
];

const ROUTES = [
  {
    how: 'By car',
    body: '27 miles from Harlow on Route 9. The last six are switchbacks; winter tires or chains from November 1 to April 15.',
  },
  {
    how: 'By bus',
    body: 'The mountain bus leaves Harlow station at 8:10, 12:40 and 5:15 and stops at our door 55 minutes later.',
  },
  {
    how: 'Parking',
    body: 'Free, thirty spaces beside the lodge and two chargers for electric cars. Leave the keys at the desk in snow.',
  },
  {
    how: 'When the road closes',
    body: 'We meet you at the lower lot with the snowcat. Call from Harlow and we will be there within the hour.',
  },
];

const POLICIES = [
  ['Check-in', 'From 3 pm'],
  ['Check-out', 'By 10 am'],
  ['Weekends', 'Two nights minimum'],
  ['Deposit', 'One night'],
  ['Cancel', 'Free to 14 days out'],
];

const FAQS = [
  {
    q: 'Will the altitude bother us?',
    a: 'At 7,020 feet most people notice the stairs on the first evening and nothing after. Drink water, go easy on the bar the first night and take the Lake Loop before the summit.',
  },
  {
    q: 'Is there Wi-Fi and cell signal?',
    a: 'Wi-Fi in the lounge and the dining room, slow but steady. Cell signal comes and goes on the terrace and is gone once you are on the trail.',
  },
  {
    q: 'Can we bring the dog?',
    a: 'Dogs are welcome in the Stove Cabin and two of the Pass Rooms, $20 a night. They sleep on their own bed, not ours, and stay leashed near the lake.',
  },
  {
    q: 'Are children welcome?',
    a: 'Yes. Under fives stay free, children eat from the same menu at half price, and the games cupboard in the lounge has survived thirty winters.',
  },
  {
    q: 'Do you rent gear?',
    a: 'Snowshoes and poles are free for guests. Touring skis, skins and avalanche kits are $45 a day from the boot room; book them with your room.',
  },
];

export default function HighPassLodgePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markName}>High Pass Lodge</span>
          <span className={s.markAlt}>7,020 ft</span>
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
            The range fills the bottom of the screen. Its sky is transparent,
            so the frost ground above it is the sky, and the sun is a disc
            set behind the peaks, inside the picture's own frame. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <span className={s.sun} />
            <Artwork
              slug="high-pass-lodge-range"
              alt=""
              fit="cover"
              inks={{ red: 'var(--lake)', yellow: 'var(--snow)', black: 'var(--ink)' }}
            />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>A mountain lodge at the top of Kettle Pass</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Sleep above
              <br />
              <em>the tree line.</em>
            </h1>
            <p className={s.heroLede}>
              Twelve rooms under the pass, dinner at seven, a fire lit by four
              and trails from the boot room door. Open all year.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Check dates</a>
              <a className={s.btnGhost} href="#rooms">See the rooms</a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ CONDITIONS
            The forest runs straight into this band: same ink, no seam. */}
        <section className={s.conditions} aria-labelledby="conditions-h">
          <div className={s.conditionsField} aria-hidden="true">
            <TabbiedPattern
              pattern={terrain}
              palette={BAND}
              options={{ frequency: 0.45 }}
              fit="grid"
              cellSize={64}
              seed="high-pass-band"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.conditionsInner}>
            <h2 id="conditions-h" className={s.conditionsHead}>On the pass this morning</h2>
            <dl className={s.conditionsList}>
              {CONDITIONS.map(([label, value, note]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd className={s.condValue}>{value}</dd>
                  <dd className={s.condNote}>{note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROOMS */}
        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <span className={s.secNo}>01</span>
            <h2 id="rooms-h">Rooms</h2>
            <p className={s.secNote}>
              Every rate is half board: breakfast, the four-course dinner and
              a thermos of tea to take out in the morning.
            </p>
          </div>
          <div className={s.rooms}>
            {ROOMS.map((r) => (
              <article key={r.name} className={s.room}>
                <div className={s.roomTop}>
                  <h3>{r.name}</h3>
                  <span className={s.roomCount}>{r.count}</span>
                </div>
                <ul className={s.roomFacts}>
                  <li>{r.sleeps}</li>
                  <li>{r.beds}</li>
                  <li>{r.view}</li>
                </ul>
                <p className={s.roomNote}>{r.note}</p>
                <div className={s.roomPrice}>
                  <strong>{r.price}</strong>
                  <span>{r.unit}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- DINING */}
        <section id="dining" className={s.dining} aria-labelledby="dining-h">
          <div className={s.diningInner}>
            <div className={s.diningText}>
              <span className={s.secNo}>02</span>
              <h2 id="dining-h">One table, one sitting, seven o'clock</h2>
              <p>
                The kitchen cooks one dinner a night for everyone in the house,
                from what came up the pass that week. Tell us at check-in what
                you do not eat and it will not be on your plate.
              </p>
              <dl className={s.meals}>
                {MEALS.map(([meal, when]) => (
                  <div key={meal}>
                    <dt>{meal}</dt>
                    <dd>{when}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.menuCard}>
              <p className={s.menuKicker}>This week's dinner</p>
              <ol className={s.menu}>
                {MENU.map(([dish, course]) => (
                  <li key={dish}>
                    <span className={s.menuCourse}>{course}</span>
                    <span className={s.menuDish}>{dish}</span>
                  </li>
                ))}
              </ol>
              <p className={s.menuFoot}>Vegetarian and gluten-free every night, asked for once.</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SEASONS */}
        <section id="seasons" className={s.sec} aria-labelledby="seasons-h">
          <div className={s.secHead}>
            <span className={s.secNo}>03</span>
            <h2 id="seasons-h">Four seasons at the pass</h2>
            <p className={s.secNote}>
              The lodge closes for three weeks in May and not otherwise. Each
              season has its own crowd, and its own quiet weeks.
            </p>
          </div>
          <ol className={s.seasons}>
            {SEASONS.map((se) => (
              <li key={se.name} className={s.season}>
                <h3>{se.name}</h3>
                <span className={s.seasonMonths}>{se.months}</span>
                <p>{se.body}</p>
                <ul className={s.seasonDoing}>
                  {se.doing.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- TRAILS
            A survey-map panel beside the list of walks from the door. */}
        <section id="trails" className={s.sec} aria-labelledby="trails-h">
          <div className={s.secHead}>
            <span className={s.secNo}>04</span>
            <h2 id="trails-h">Trails from the door</h2>
            <p className={s.secNote}>
              Times are for a steady walker in summer. The desk has maps, the
              morning forecast, and a book to write your route in.
            </p>
          </div>
          <div className={s.trailsGrid}>
            <div className={s.survey} aria-hidden="true">
              <TabbiedPattern
                pattern={contourlines}
                palette={SURVEY}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={48}
                seed="high-pass-survey"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.trailsTable}>
              <table className={s.trails}>
                <caption className={s.srOnly}>Walks that start at the lodge</caption>
                <thead>
                  <tr>
                    <th scope="col">Trail</th>
                    <th scope="col">Distance</th>
                    <th scope="col">Climb</th>
                    <th scope="col">Time</th>
                    <th scope="col">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {TRAILS.map((t) => (
                    <tr key={t.name}>
                      <th scope="row">{t.name}</th>
                      <td data-label="Distance">{t.distance}</td>
                      <td data-label="Climb">{t.climb}</td>
                      <td data-label="Time">{t.time}</td>
                      <td data-label="Grade">{t.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={s.trailsNote}>
                Guided summit days run Saturdays in July and August, $95 a
                person with lunch. Sign up at the desk by Thursday.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- GETTING HERE */}
        <section id="getting-here" className={s.sec} aria-labelledby="getting-h">
          <div className={s.secHead}>
            <span className={s.secNo}>05</span>
            <h2 id="getting-h">Getting here</h2>
            <p className={s.secNote}>
              4 Summit Road, Kettle Pass. The nearest town is Harlow, 27 miles
              and a thousand switchback feet below.
            </p>
          </div>
          <dl className={s.routes}>
            {ROUTES.map((r) => (
              <div key={r.how}>
                <dt>{r.how}</dt>
                <dd>{r.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The lake, edge to edge. Sky and water are both the section's
            ground; the request form sits on the water in a card. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookArt} aria-hidden="true">
            <Artwork
              slug="high-pass-lodge-lake"
              alt=""
              fit="cover"
              inks={{ yellow: 'var(--frost)', black: 'var(--ink)', blue: 'var(--ember)', red: 'var(--ember)' }}
            />
          </div>
          <div className={s.bookInner}>
            <div className={s.bookText}>
              <span className={s.secNoLight}>06</span>
              <h2 id="book-h">Stay two nights, or stay the week</h2>
              <p>
                Send us your dates and we will answer within a day with what is
                free and a link to pay the deposit. Or call the desk, which is
                staffed from 7 am to 10 pm.
              </p>
              <dl className={s.policies}>
                {POLICIES.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <h3 className={s.formHead}>Request dates</h3>
              <div className={s.formRow}>
                <label htmlFor="hp-arrive">Arrive</label>
                <input id="hp-arrive" name="arrive" type="date" />
              </div>
              <div className={s.formPair}>
                <div className={s.formRow}>
                  <label htmlFor="hp-nights">Nights</label>
                  <input id="hp-nights" name="nights" type="number" min="1" max="21" defaultValue="2" />
                </div>
                <div className={s.formRow}>
                  <label htmlFor="hp-guests">Guests</label>
                  <input id="hp-guests" name="guests" type="number" min="1" max="10" defaultValue="2" />
                </div>
              </div>
              <div className={s.formRow}>
                <label htmlFor="hp-room">Room</label>
                <select id="hp-room" name="room" defaultValue="pass">
                  <option value="pass">Pass Room, $240</option>
                  <option value="ridge">Ridge Room, $310</option>
                  <option value="loft">Bunk Loft, $85 a person</option>
                  <option value="cabin">Stove Cabin, $420</option>
                </select>
              </div>
              <div className={s.formRow}>
                <label htmlFor="hp-email">Email</label>
                <input id="hp-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <button className={s.formBtn} type="submit">Send the request</button>
              <p className={s.formNote}>Or call (555) 014-2140, 7 am to 10 pm.</p>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <span className={s.secNo}>07</span>
            <h2 id="faq-h">Good to know</h2>
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
            <p className={s.footName}>High Pass Lodge</p>
            <p className={s.footTag}>Twelve rooms, a bunk loft and a cabin at the top of Kettle Pass. Open all year.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Stay</h2>
            <ul className={s.footLinks}>
              <li><a href="#rooms">Rooms and rates</a></li>
              <li><a href="#dining">Dining</a></li>
              <li><a href="#book">Request dates</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Out there</h2>
            <ul className={s.footLinks}>
              <li><a href="#seasons">Seasons</a></li>
              <li><a href="#trails">Trails from the door</a></li>
              <li><a href="#getting-here">Getting here</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>The desk</h2>
            <p className={s.footAddr}>
              4 Summit Road
              <br />
              Kettle Pass
            </p>
            <a className={s.footContact} href="mailto:desk@highpasslodge.example">desk@highpasslodge.example</a>
            <a className={s.footContact} href="tel:+15550142140">(555) 014-2140</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional mountain lodge. Rooms, prices, trails and conditions are invented.</p>
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
