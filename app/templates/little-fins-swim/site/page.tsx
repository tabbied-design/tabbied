import { TabbiedPattern } from 'tabbied/react';
import { lagoon, polkadot, rimband } from 'tabbied/patterns';
import s from './little-fins-swim.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Little Fins: Swim school for kids, Harbor Street',
  description:
    'Swimming lessons for children from six months to twelve years, four to a teacher, in a warm teaching pool. Find your child\'s level, see the timetable and enroll for the autumn term.',
};

/* Site colors. The fish, the goggles and the duck are drawn in these too:
   each of their color layers is one of the page's custom properties. */
const FOAM = '#F2FAFC';
const DEEP = '#0E2A3B';
const CORAL = '#FF7B54';
const SUN = '#FFD23F';

const RIPPLES = ['transparent', FOAM, SUN, DEEP];
const RINGS = ['transparent', SUN, CORAL, FOAM];
const BUBBLES = ['transparent', CORAL, SUN];

const NAV = [
  ['Levels', '#levels'],
  ['Timetable', '#timetable'],
  ['What to bring', '#bring'],
  ['Parents', '#parents'],
  ['Enroll', '#enroll'],
];

const LEVELS = [
  {
    no: '1',
    name: 'Seahorse',
    tone: 'sun',
    age: '6-36 months',
    with: 'A parent in the water',
    learn: ['Happy with water on the face', 'Floating held, then with a noodle', 'Holding the wall and climbing out'],
  },
  {
    no: '2',
    name: 'Starfish',
    tone: 'coral',
    age: '3-4 years',
    with: 'On their own, 4 to a teacher',
    learn: ['Blowing bubbles, then breathing out underwater', 'A star float on the back', 'Kicking across the pool with a board'],
  },
  {
    no: '3',
    name: 'Turtle',
    tone: 'pool',
    age: '4-6 years',
    with: 'On their own, 4 to a teacher',
    learn: ['Five meters on the front, face in', 'Rolling from front to back to breathe', 'Jumping in and turning to the wall'],
  },
  {
    no: '4',
    name: 'Otter',
    tone: 'sun',
    age: '5-8 years',
    with: 'Main pool, 5 to a teacher',
    learn: ['Front crawl and backstroke, 10 meters', 'Treading water for 30 seconds', 'Swimming out of the deep end'],
  },
  {
    no: '5',
    name: 'Dolphin',
    tone: 'coral',
    age: '7-10 years',
    with: 'Main pool, 6 to a teacher',
    learn: ['Breaststroke legs and timing', 'Side breathing on front crawl', '25 meters of any stroke, no stops'],
  },
  {
    no: '6',
    name: 'Orca',
    tone: 'deep',
    age: '9-12 years',
    with: 'Main pool, 6 to a teacher',
    learn: ['All four strokes, butterfly included', 'Tumble turns and dives', '100 meters and a survival swim in clothes'],
  },
];

const POOLS = [
  {
    id: 'warm',
    name: 'Warm pool',
    about: '32 C, 0.9 m deep, levels 1-3, classes of 30 minutes',
    days: [
      { d: 'Mon', c: [['9:30', 'Seahorse'], ['10:15', 'Seahorse'], ['3:45', 'Starfish'], ['4:30', 'Turtle']] },
      { d: 'Tue', c: [['9:30', 'Seahorse'], ['3:45', 'Turtle'], ['4:30', 'Starfish']] },
      { d: 'Wed', c: [['10:15', 'Seahorse'], ['3:45', 'Starfish'], ['4:30', 'Turtle']] },
      { d: 'Thu', c: [['9:30', 'Seahorse'], ['3:45', 'Turtle'], ['4:30', 'Starfish']] },
      { d: 'Sat', c: [['8:30', 'Seahorse'], ['9:15', 'Starfish'], ['10:00', 'Turtle'], ['10:45', 'Seahorse']] },
    ],
  },
  {
    id: 'main',
    name: 'Main pool',
    about: '29 C, 1.2-2 m deep, levels 4-6, classes of 45 minutes',
    days: [
      { d: 'Mon', c: [['4:30', 'Otter'], ['5:15', 'Dolphin']] },
      { d: 'Tue', c: [['4:30', 'Dolphin'], ['5:15', 'Orca']] },
      { d: 'Wed', c: [['4:30', 'Otter'], ['5:15', 'Orca']] },
      { d: 'Thu', c: [['4:30', 'Otter'], ['5:15', 'Dolphin']] },
      { d: 'Fri', c: [['4:30', 'Dolphin'], ['5:15', 'Orca']] },
      { d: 'Sat', c: [['9:00', 'Otter'], ['9:45', 'Dolphin'], ['10:30', 'Orca']] },
    ],
  },
];

const BRING = [
  ['A swimsuit', 'Fitted, not baggy. Board shorts drag a small swimmer down.'],
  ['A swim diaper', 'Under three, and a neoprene one over it. We sell both at the desk for $6.'],
  ['Goggles', 'From Turtle up. Seahorses and Starfish learn to open their eyes without them first.'],
  ['A cap for long hair', 'Silicone, not latex. It keeps hair out of their mouth, not their head dry.'],
  ['A hooded towel', 'The walk from the pool to the changing room is the coldest part of the lesson.'],
  ['A snack for after', 'Swimming makes children hungry. The cafe does toast and warm milk.'],
];

const PROVIDE = ['Floats, noodles and boards', 'Sinking toys and hoops', 'Changing mats and a warm family room', 'A report card at the end of every term'];

const FAQ = [
  {
    q: 'Do I get in the water?',
    a: 'For Seahorse, yes: one parent or carer in the water with each child. From Starfish up you watch from the gallery, which has a window at pool level.',
  },
  {
    q: 'What if my child cries?',
    a: 'Most do, once. Teachers keep a crying child close and busy rather than out of the water. If a child is still upset after three weeks we talk about a move of day or teacher.',
  },
  {
    q: 'How does a child move up a level?',
    a: 'When they can do the three things on their badge, on a normal day, without help. Teachers assess in weeks 5 and 10 and a move can happen mid-term if there is room.',
  },
  {
    q: 'What if we miss a class?',
    a: 'Book a make-up in any class at the same level within the term, up to three a term. Tell us 24 hours ahead and it is free.',
  },
  {
    q: 'Are the teachers qualified?',
    a: 'Every teacher holds a national swim teaching certificate and a lifeguard award, and has a background check. A lifeguard who is not teaching is on the side at all times.',
  },
  {
    q: 'Is the water chlorinated?',
    a: 'Lightly, with a UV system so the level can stay low. Sensitive skin usually does fine; rinse in the showers after and bring a plain moisturizer.',
  },
];

const PRICES = [
  { name: 'Levels 1-3', what: '10 weekly classes of 30 minutes', price: '$210' },
  { name: 'Levels 4-6', what: '10 weekly classes of 45 minutes', price: '$240' },
  { name: 'Trial class', what: 'One class, any level, then decide', price: 'Free' },
];

export default function LittleFinsPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;600;700;800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork
            slug="little-fins-swim-fish"
            alt=""
            inks={{ red: 'var(--coral)', blue: 'var(--pool)', yellow: 'var(--sun)', black: 'var(--deep)' }}
            className={s.markFish}
          />
          <span>Little Fins</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#enroll">Free trial class</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A pool seen from above: rings on the water, a fish, a duck. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Swim school for kids, Harbor Street</p>
            <h1 className={s.title} id="hero-h">
              Every child can learn to <em>love the water.</em>
            </h1>
            <p className={s.lede}>
              Small classes in a warm, shallow teaching pool, six levels named
              for the sea, and teachers who get in the water. From a first
              splash at six months to 100 meters at twelve.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#levels">Find your child's level</a>
              <a className={s.btnLine} href="#enroll">Book a free trial</a>
            </div>
            <ul className={s.heroFacts}>
              <li>
                <strong>6 mo-12 yrs</strong>
                <span>Six levels</span>
              </li>
              <li>
                <strong>4 to 1</strong>
                <span>Children per teacher</span>
              </li>
              <li>
                <strong>32 C</strong>
                <span>Teaching pool</span>
              </li>
            </ul>
          </div>
          <div className={s.heroPool}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={lagoon}
                palette={RIPPLES}
                fit="grid"
                cellSize={72}
                options={{ frequency: 0.45 }}
                seed="warm-pool"
                redrawInterval={8000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.lane} aria-hidden="true" />
            <Artwork
              slug="little-fins-swim-fish"
              alt="A cartoon fish with big eyes, swimming"
              inks={{ red: 'var(--coral)', blue: 'var(--deep)', yellow: 'var(--sun)', black: 'var(--deep)' }}
              className={s.heroFish}
            />
            <Artwork
              slug="little-fins-swim-duck"
              alt="A rubber duck floating"
              inks={{ red: 'var(--coral)', blue: 'var(--foam)', yellow: 'var(--sun)', black: 'var(--deep)' }}
              className={s.heroDuck}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------- LEVELS
            The badges a child collects, in a row along a lane rope. */}
        <section id="levels" className={s.levels} aria-labelledby="levels-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Levels</p>
            <h2 id="levels-h">Six badges, one for every stage</h2>
            <p className={s.secNote}>
              Every level is named for a sea creature and ends with a sewn badge
              for the swim bag. Not sure where to start? Book a trial class and
              the teacher will place your child in the first ten minutes.
            </p>
          </div>
          <ol className={s.badges}>
            {LEVELS.map((lv) => (
              <li key={lv.name} className={s.level} data-tone={lv.tone}>
                <div className={s.badge}>
                  <span className={s.badgeNo}>{`Level ${lv.no}`}</span>
                  <h3 className={s.badgeName}>{lv.name}</h3>
                </div>
                <div className={s.levelBody}>
                  <p className={s.levelAge}>{lv.age}</p>
                  <p className={s.levelWith}>{lv.with}</p>
                  <ul className={s.learn}>
                    {lv.learn.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ BAND
            Swim rings on the water, between the levels and the timetable. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={rimband}
              palette={RINGS}
              fit="grid"
              cellSize={64}
              options={{ frequency: 0.35 }}
              seed="rings"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ------------------------------------------------------- TIMETABLE */}
        <section id="timetable" className={s.timetable} aria-labelledby="timetable-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Timetable, autumn term</p>
            <h2 id="timetable-h">Classes by pool and day</h2>
            <p className={s.secNote}>
              Term runs ten weeks from September 14. Times are pm on weekdays
              after 3, am before 11 and on Saturdays. There are no classes on
              Sundays, when the pools are open to families.
            </p>
          </div>
          <div className={s.pools}>
            {POOLS.map((pool) => (
              <div key={pool.id} className={s.pool}>
                <table className={s.table}>
                  <caption>
                    <strong>{pool.name}</strong>
                    <span>{pool.about}</span>
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Classes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pool.days.map((row) => (
                      <tr key={row.d}>
                        <th scope="row">{row.d}</th>
                        <td>
                          <ul className={s.slots}>
                            {row.c.map(([t, lv]) => (
                              <li key={t} className={s.slot} data-level={lv}>
                                <span className={s.slotTime}>{t}</span>
                                <span className={s.slotLevel}>{lv}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- BRING */}
        <section id="bring" className={s.bring} aria-labelledby="bring-h">
          <div className={s.bringArt}>
            <div className={s.bringField} aria-hidden="true">
              <TabbiedPattern
                pattern={polkadot}
                palette={BUBBLES}
                fit="grid"
                cellSize={60}
                options={{ frequency: 0.3 }}
                seed="bubbles"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="little-fins-swim-goggles"
              alt="A pair of children's swimming goggles"
              inks={{ red: 'var(--coral)', blue: 'var(--deep)', yellow: 'var(--pool)', black: 'var(--deep)' }}
              className={s.goggles}
            />
          </div>
          <div className={s.bringBody}>
            <p className={s.secKick}>What to bring</p>
            <h2 id="bring-h">A small bag for a small swimmer</h2>
            <ul className={s.bringList}>
              {BRING.map(([t, b]) => (
                <li key={t}>
                  <strong>{t}</strong>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className={s.provide}>
              <h3>We provide</h3>
              <ul>
                {PROVIDE.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- PARENTS */}
        <section id="parents" className={s.parents} aria-labelledby="parents-h">
          <div className={s.secHead}>
            <p className={s.secKick}>For parents</p>
            <h2 id="parents-h">The questions we hear at the gallery window</h2>
          </div>
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- ENROLL */}
        <section id="enroll" className={s.enroll} aria-labelledby="enroll-h">
          <div className={s.enrollInfo}>
            <p className={s.secKick}>Enroll</p>
            <h2 id="enroll-h">Book a free trial, then a term</h2>
            <p className={s.enrollLede}>
              Tell us about your swimmer and we will offer a trial class within
              the week. Places for the autumn term are held for seven days after
              the trial.
            </p>
            <ul className={s.prices}>
              {PRICES.map((p) => (
                <li key={p.name}>
                  <span className={s.priceName}>{p.name}</span>
                  <span className={s.priceWhat}>{p.what}</span>
                  <strong className={s.priceAmount}>{p.price}</strong>
                </li>
              ))}
            </ul>
            <p className={s.priceNote}>Brothers and sisters: 10% off the second child and every one after.</p>
            <Artwork
              slug="little-fins-swim-duck"
              alt=""
              inks={{ red: 'var(--coral)', blue: 'var(--foam)', yellow: 'var(--sun)', black: 'var(--deep)' }}
              className={s.enrollDuck}
            />
          </div>
          <form className={s.form} action="#">
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="lf-child">Child's first name</label>
                <input id="lf-child" name="child" type="text" autoComplete="off" />
              </div>
              <div className={s.field}>
                <label htmlFor="lf-dob">Date of birth</label>
                <input id="lf-dob" name="dob" type="date" />
              </div>
            </div>
            <fieldset className={s.choices}>
              <legend>Level, if you know it</legend>
              {LEVELS.map((lv) => (
                <label key={lv.name} className={s.choice} data-tone={lv.tone}>
                  <input type="radio" name="level" value={lv.name} />
                  <span>{lv.name}</span>
                </label>
              ))}
            </fieldset>
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="lf-day">Best day</label>
                <select id="lf-day" name="day" defaultValue="any">
                  <option value="any">Any day</option>
                  <option value="mon">Monday</option>
                  <option value="tue">Tuesday</option>
                  <option value="wed">Wednesday</option>
                  <option value="thu">Thursday</option>
                  <option value="fri">Friday</option>
                  <option value="sat">Saturday</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="lf-time">Time</label>
                <select id="lf-time" name="time" defaultValue="after">
                  <option value="morning">Morning</option>
                  <option value="after">After school</option>
                </select>
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="lf-email">Your email</label>
                <input id="lf-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label htmlFor="lf-phone">Phone</label>
                <input id="lf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>
            <button className={s.submit} type="submit">Ask for a trial class</button>
            <small className={s.formNote}>We reply within one working day. Nothing is charged until you choose a term.</small>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p className={s.footName}>Little Fins</p>
            <p className={s.footTag}>Swim school for kids, at the Harbor Street pools.</p>
          </div>
          <dl className={s.footInfo}>
            <div>
              <dt>Pools</dt>
              <dd>220 Harbor Street, entrance on Quay Lane</dd>
            </div>
            <div>
              <dt>Front desk</dt>
              <dd>Mon-Fri 9 am-6 pm, Sat 8 am-12 pm</dd>
            </div>
            <div>
              <dt>Call or write</dt>
              <dd>(555) 018-3470, splash@littlefins.example</dd>
            </div>
          </dl>
        </div>
        <div className={s.footFine}>
          <p>A fictional swim school. Classes, prices and people are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
