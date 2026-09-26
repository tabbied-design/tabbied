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
const POOL = '#00A6D6';

const RIPPLES = ['transparent', FOAM, SUN, DEEP];
const POND = ['transparent', POOL, SUN, FOAM];
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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--foam': '#f2fafc',
        '--deep': '#0e2a3b',
        '--pool': '#00a6d6',
        '--coral': '#ff7b54',
        '--sun': '#ffd23f',
        '--gray': '#8fa3ad',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="foam,deep,pool,coral,sun,gray"
      className={s.page}>
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
          <span data-edit="bar.text" data-edit-max="60">Little Fins</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#enroll">Free trial class</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A pool seen from above: rings on the water, a fish, a duck. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Swim school for kids, Harbor Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.title} id="hero-h">
              Every child can learn to <em>love the water.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Small classes in a warm, shallow teaching pool, six levels named
              for the sea, and teachers who get in the water. From a first
              splash at six months to 100 meters at twelve.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#levels">Find your child's level</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#enroll">Book a free trial</a>
            </div>
            <ul className={s.heroFacts}>
              <li>
                <strong data-edit="hero.emphasis">6 mo-12 yrs</strong>
                <span data-edit="hero.text" data-edit-max="60">Six levels</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis2">4 to 1</strong>
                <span data-edit="hero.text2" data-edit-max="60">Children per teacher</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis3">32 C</strong>
                <span data-edit="hero.text3" data-edit-max="60">Teaching pool</span>
              </li>
            </ul>
          </div>
          <div className={s.heroPool}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,4,1" className={s.heroField} aria-hidden="true">
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
            <p data-edit="levels.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Levels</p>
            <h2 data-edit="levels.title" data-edit-max="60" id="levels-h">Six badges, one for every stage</h2>
            <p data-edit="levels.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every level is named for a sea creature and ends with a sewn badge
              for the swim bag. Not sure where to start? Book a trial class and
              the teacher will place your child in the first ten minutes.
            </p>
          </div>
          <ol className={s.badges}>
            {LEVELS.map((lv, i) => (
              <li key={lv.name} className={s.level} data-tone={lv.tone}>
                <div className={s.badge}>
                  <span className={s.badgeNo}>{`Level ${lv.no}`}</span>
                  <h3 data-edit={`levels.badgeName.${i}`} data-edit-max="40" className={s.badgeName}>{lv.name}</h3>
                </div>
                <div className={s.levelBody}>
                  <p data-edit={`levels.levelAge.${i}`} data-edit-max="240" data-edit-multiline className={s.levelAge}>{lv.age}</p>
                  <p data-edit={`levels.levelWith.${i}`} data-edit-max="240" data-edit-multiline className={s.levelWith}>{lv.with}</p>
                  <ul className={s.learn}>
                    {lv.learn.map((l, i2) => (
                      <li data-edit={`levels.item.${i}.${i2}`} data-edit-max="80" key={l}>{l}</li>
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
          <div data-edit-pattern="top.field" data-edit-roles="transparent,4,3,0" className={s.bandField}>
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
          <div data-edit-pattern="timetable.field" data-edit-roles="transparent,0,4,1" className={s.ttTile} aria-hidden="true">
            <TabbiedPattern
              pattern={lagoon}
              palette={RIPPLES}
              fit="grid"
              cellSize={40}
              options={{ frequency: 0.6 }}
              seed="lane-four"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.secHead}>
            <p data-edit="timetable.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Timetable, autumn term</p>
            <h2 data-edit="timetable.title" data-edit-max="60" id="timetable-h">Classes by pool and day</h2>
            <p data-edit="timetable.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Term runs ten weeks from September 14. Times are pm on weekdays
              after 3, am before 11 and on Saturdays. There are no classes on
              Sundays, when the pools are open to families.
            </p>
          </div>
          <div className={s.pools}>
            {POOLS.map((pool, i) => (
              <div key={pool.id} className={s.pool}>
                <table className={s.table}>
                  <caption>
                    <strong data-edit={`timetable.emphasis.${i}`}>{pool.name}</strong>
                    <span data-edit={`timetable.text.${i}`} data-edit-max="60">{pool.about}</span>
                  </caption>
                  <thead>
                    <tr>
                      <th data-edit={`timetable.heading.${i}`} scope="col">Day</th>
                      <th data-edit={`timetable.heading2.${i}`} scope="col">Classes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pool.days.map((row, i2) => (
                      <tr key={row.d}>
                        <th data-edit={`timetable.heading3.${i}.${i2}`} scope="row">{row.d}</th>
                        <td>
                          <ul className={s.slots}>
                            {row.c.map(([t, lv], i3) => (
                              <li key={t} className={s.slot} data-level={lv}>
                                <span data-edit={`timetable.slotTime.${i}.${i2}.${i3}`} data-edit-max="60" className={s.slotTime}>{t}</span>
                                <span data-edit={`timetable.slotLevel.${i}.${i2}.${i3}`} data-edit-max="60" className={s.slotLevel}>{lv}</span>
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
            <div data-edit-pattern="bring.field" data-edit-roles="transparent,3,4" className={s.bringField} aria-hidden="true">
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
            <p data-edit="bring.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>What to bring</p>
            <h2 data-edit="bring.title" data-edit-max="60" id="bring-h">A small bag for a small swimmer</h2>
            <ul className={s.bringList}>
              {BRING.map(([t, b], i) => (
                <li key={t}>
                  <strong data-edit={`bring.emphasis.${i}`}>{t}</strong>
                  <span data-edit={`bring.text.${i}`} data-edit-max="60">{b}</span>
                </li>
              ))}
            </ul>
            <div className={s.provide}>
              <h3 data-edit="bring.title2" data-edit-max="40">We provide</h3>
              <ul>
                {PROVIDE.map((p, i) => (
                  <li data-edit={`bring.item.${i}`} data-edit-max="80" key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- PARENTS */}
        <section id="parents" className={s.parents} aria-labelledby="parents-h">
          <div className={s.secHead}>
            <p data-edit="parents.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>For parents</p>
            <h2 data-edit="parents.title" data-edit-max="60" id="parents-h">The questions we hear at the gallery window</h2>
          </div>
          <div className={s.faq}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`parents.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`parents.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- ENROLL */}
        <section id="enroll" className={s.enroll} aria-labelledby="enroll-h">
          <div className={s.enrollInfo}>
            <p data-edit="enroll.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Enroll</p>
            <h2 data-edit="enroll.title" data-edit-max="60" id="enroll-h">Book a free trial, then a term</h2>
            <p data-edit="enroll.enrollLede" data-edit-max="240" data-edit-multiline className={s.enrollLede}>
              Tell us about your swimmer and we will offer a trial class within
              the week. Places for the autumn term are held for seven days after
              the trial.
            </p>
            <ul className={s.prices}>
              {PRICES.map((p, i) => (
                <li key={p.name}>
                  <span data-edit={`enroll.priceName.${i}`} data-edit-max="60" className={s.priceName}>{p.name}</span>
                  <span data-edit={`enroll.priceWhat.${i}`} data-edit-max="60" className={s.priceWhat}>{p.what}</span>
                  <strong data-edit={`enroll.priceAmount.${i}`} className={s.priceAmount}>{p.price}</strong>
                </li>
              ))}
            </ul>
            <p data-edit="enroll.priceNote" data-edit-max="240" data-edit-multiline className={s.priceNote}>Brothers and sisters: 10% off the second child and every one after.</p>
            <div data-edit-pattern="enroll.field" data-edit-roles="transparent,2,4,0" className={s.pond} aria-hidden="true">
              <TabbiedPattern
                pattern={lagoon}
                palette={POND}
                fit="grid"
                cellSize={30}
                options={{ frequency: 0.4 }}
                seed="duck-pond"
                redrawInterval={10000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
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
                <label data-edit="enroll.label" htmlFor="lf-child">Child's first name</label>
                <input id="lf-child" name="child" type="text" autoComplete="off" />
              </div>
              <div className={s.field}>
                <label data-edit="enroll.label2" htmlFor="lf-dob">Date of birth</label>
                <input id="lf-dob" name="dob" type="date" />
              </div>
            </div>
            <fieldset className={s.choices}>
              <legend data-edit="enroll.legend">Level, if you know it</legend>
              {LEVELS.map((lv, i) => (
                <label key={lv.name} className={s.choice} data-tone={lv.tone}>
                  <input type="radio" name="level" value={lv.name} />
                  <span data-edit={`enroll.text.${i}`} data-edit-max="60">{lv.name}</span>
                </label>
              ))}
            </fieldset>
            <div className={s.formRow}>
              <div className={s.field}>
                <label data-edit="enroll.label3" htmlFor="lf-day">Best day</label>
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
                <label data-edit="enroll.label4" htmlFor="lf-time">Time</label>
                <select id="lf-time" name="time" defaultValue="after">
                  <option value="morning">Morning</option>
                  <option value="after">After school</option>
                </select>
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.field}>
                <label data-edit="enroll.label5" htmlFor="lf-email">Your email</label>
                <input id="lf-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="enroll.label6" htmlFor="lf-phone">Phone</label>
                <input id="lf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>
            <button data-edit="enroll.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a trial class</button>
            <small data-edit="enroll.formNote" className={s.formNote}>We reply within one working day. Nothing is charged until you choose a term.</small>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4" className={s.footBubbles} aria-hidden="true">
          <TabbiedPattern
            pattern={polkadot}
            palette={BUBBLES}
            fit="grid"
            cellSize={44}
            options={{ frequency: 0.3 }}
            seed="foot-bubbles"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footTop}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Little Fins</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Swim school for kids, at the Harbor Street pools.</p>
          </div>
          <dl className={s.footInfo}>
            <div>
              <dt data-edit="footer.term" data-edit-max="28">Pools</dt>
              <dd data-edit="footer.body" data-edit-max="200" data-edit-multiline>220 Harbor Street, entrance on Quay Lane</dd>
            </div>
            <div>
              <dt data-edit="footer.term2" data-edit-max="28">Front desk</dt>
              <dd data-edit="footer.body2" data-edit-max="200" data-edit-multiline>Mon-Fri 9 am-6 pm, Sat 8 am-12 pm</dd>
            </div>
            <div>
              <dt data-edit="footer.term3" data-edit-max="28">Call or write</dt>
              <dd data-edit="footer.body3" data-edit-max="200" data-edit-multiline>(555) 018-3470, splash@littlefins.example</dd>
            </div>
          </dl>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body4" data-edit-max="240" data-edit-multiline>A fictional swim school. Classes, prices and people are invented.</p>
          <p className={s.credit}>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
