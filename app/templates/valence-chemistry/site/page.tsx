import { TabbiedPattern } from 'tabbied/react';
import { hextruchet } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './valence-chemistry.module.css';

export const metadata = {
  title: 'Valence Chemistry Tutoring: High school, AP and college chemistry',
  description:
    'One-to-one chemistry tutoring from balancing equations to NMR. A periodic table of topics, weekly sessions for high school and college students, exam prep plans and plain hourly rates.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Hex truchet
   tiles link three arcs per hexagon into loops with no ends, which reads
   as bonds closing into rings. The field fills the benzene-ring hexagon
   in the hero, the gap at the top of the periodic table of topics, a band
   before the rates and the edge of the footer, always on the board. */
const BOARD = '#0f1f2b';
const CHALK = '#e8eef0';
const FLAME = '#e8574a';
const TEAL = '#5cc2b8';
const BRASS = '#e0b44c';
const MIST = '#8fa3b3';

const RING = ['transparent', MIST, TEAL, CHALK, BRASS, FLAME];
const QUIET = ['transparent', MIST, TEAL, MIST, CHALK, TEAL];
const WARM = ['transparent', BRASS, FLAME, MIST, TEAL, BRASS];

const NAV = [
  ['Topics', '#topics'],
  ['Sessions', '#sessions'],
  ['Exam prep', '#exams'],
  ['Rates', '#rates'],
  ['Contact', '#contact'],
];

const STATS = [
  ['Students since 2016', '340'],
  ['Courses covered', '9'],
  ['First session', 'Free'],
];

/* Laid out like the periodic table: the first two tiles stand alone on
   the top row, two blocks of three hang either side of the gap, and the
   bottom row runs the full width. */
const TOPICS = [
  ['1', 'Ms', 'Measurement and significant figures', 'hs'],
  ['2', 'Lb', 'Lab reports and error analysis', 'lab'],
  ['3', 'At', 'Atomic structure', 'hs'],
  ['4', 'Pt', 'Periodic trends', 'hs'],
  ['5', 'Fg', 'Functional groups', 'org'],
  ['6', 'Mc', 'Reaction mechanisms', 'org'],
  ['7', 'Sp', 'IR and NMR spectroscopy', 'org'],
  ['8', 'Bd', 'Bonding and Lewis structures', 'hs'],
  ['9', 'Nm', 'Naming compounds', 'hs'],
  ['10', 'Qm', 'Orbitals and quantum numbers', 'col'],
  ['11', 'Th', 'Thermochemistry', 'col'],
  ['12', 'Kn', 'Kinetics and rate laws', 'col'],
  ['13', 'Mo', 'The mole', 'hs'],
  ['14', 'St', 'Stoichiometry', 'ap'],
  ['15', 'Gs', 'Gas laws', 'ap'],
  ['16', 'Sl', 'Solutions and molarity', 'ap'],
  ['17', 'Eq', 'Equilibrium', 'ap'],
  ['18', 'Ab', 'Acids, bases and buffers', 'ap'],
  ['19', 'Rx', 'Redox and electrochemistry', 'ap'],
];

const KEY = [
  ['hs', 'High school chemistry'],
  ['ap', 'AP and IB chemistry'],
  ['col', 'College general chemistry'],
  ['org', 'Organic chemistry'],
  ['lab', 'Lab skills'],
];

const SESSIONS = [
  {
    level: 'High school',
    courses: 'Chemistry, Honors, AP Chemistry, IB Chemistry SL and HL',
    how: 'Weekly 60-minute sessions after school, built around your class: the unit you are in, the homework due, the test on Friday.',
    points: ['Your teacher\'s notes and worksheets, not a different curriculum', 'Short written summary to parents after every session', 'Calculator skills: scientific notation, logs, unit conversions'],
  },
  {
    level: 'College',
    courses: 'General Chemistry I and II, Organic I and II, intro physical chemistry',
    how: 'Sessions of 60 or 90 minutes, weekly or twice a week before exams. We work from your syllabus, problem sets and past exams.',
    points: ['Mechanisms drawn by hand until arrows make sense', 'Lab report reviews within 48 hours', 'Office-hours prep: what to ask your professor'],
  },
];

const EXAMS = [
  { name: 'AP Chemistry', when: 'May', weeks: '10 weeks', plan: 'Two sessions a week from late February: one unit review, one timed free-response set, then three full practice exams.', price: '$1,350' },
  { name: 'General chemistry final', when: 'December and May', weeks: '4 weeks', plan: 'A standardized-style final reviewed topic by topic from your course, with two mock exams under time.', price: '$560' },
  { name: 'MCAT chemistry', when: 'Any test date', weeks: '12 weeks', plan: 'General and organic chemistry for the chemical and physical foundations section, passage practice every week.', price: '$1,620' },
];

const RATES = [
  ['High school, 60 min', '$70'],
  ['AP and IB, 60 min', '$80'],
  ['College general chemistry, 60 min', '$85'],
  ['Organic chemistry, 60 min', '$95'],
  ['Any level, 90 min', '1.5 x the hour'],
  ['Small group of 2 or 3, 60 min', '$45 each'],
];

const HOURS = [
  ['Monday to Thursday', '3:30-9:00'],
  ['Saturday', '9:00-2:00'],
  ['Exam weeks', 'Sundays too'],
];

export default function ValenceChemistryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--board': '#0f1f2b',
        '--chalk': '#e8eef0',
        '--flame': '#e8574a',
        '--teal': '#5cc2b8',
        '--brass': '#e0b44c',
        '--mist': '#8fa3b3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="board,chalk,flame,teal,brass,mist"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandTile" data-edit-max="60" className={s.brandTile}>Va</span>
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Valence</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Chemistry Tutoring</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Free first session</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: the pitch, and a benzene ring cut from the truchet. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Chemistry tutoring, from balancing equations to NMR</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Chemistry that finally <em>clicks into place.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              One-to-one tutoring for high school, AP and college chemistry.
              Sessions at the Halden Branch Library or online with a shared
              whiteboard, and practice problems written for your course, not
              someone else's.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free first session</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#topics">See the topics</a>
            </div>
            <dl className={s.stats}>
              {STATS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,3,1,4,2" className={s.ring} aria-hidden="true">
              <TabbiedPattern
                pattern={hextruchet}
                palette={RING}
                fit="grid"
                cellSize={56}
                seed="va-ring"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.element}>
              <span data-edit="hero.elNo" data-edit-max="60" className={s.elNo}>1:1</span>
              <span data-edit="hero.elSym" data-edit-max="60" className={s.elSym}>Va</span>
              <span data-edit="hero.elName" data-edit-max="60" className={s.elName}>Valence</span>
              <span data-edit="hero.elMass" data-edit-max="60" className={s.elMass}>from $70 an hour</span>
            </div>
          </div>
        </section>

        {/* TOPICS: the periodic table of what we cover. */}
        <section id="topics" className={s.sec} aria-labelledby="topics-h">
          <div className={s.secHead}>
            <p data-edit="topics.label" data-edit-max="240" data-edit-multiline className={s.label}>Group 1 / Topics</p>
            <h2 data-edit="topics.secTitle" data-edit-max="60" id="topics-h" className={s.secTitle}>The periodic table of what we cover</h2>
            <p data-edit="topics.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Nineteen topics, colored by the course they usually turn up in.
              Most students come for one tile and stay for the three next to
              it, because chemistry is built in that order.
            </p>
          </div>
          <div className={s.table}>
            <ul className={s.keyList}>
              {KEY.map(([k, v], i) => (
                <li data-edit={`topics.item.${i}`} data-edit-max="80" key={k} className={s[k]}>{v}</li>
              ))}
            </ul>
            <div data-edit-pattern="topics.field" data-edit-roles="transparent,5,3,5,1,3" className={s.tableGap} aria-hidden="true">
              <TabbiedPattern
                pattern={hextruchet}
                palette={QUIET}
                fit="grid"
                cellSize={34}
                seed="va-gap"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ol className={s.tiles}>
              {TOPICS.map(([n, sym, name, cat], i) => (
                <li key={sym} className={`${s.tile} ${s[cat]}`}>
                  <span data-edit={`topics.tileNo.${i}`} data-edit-max="60" className={s.tileNo}>{n}</span>
                  <span data-edit={`topics.tileSym.${i}`} data-edit-max="60" className={s.tileSym}>{sym}</span>
                  <span data-edit={`topics.tileName.${i}`} data-edit-max="60" className={s.tileName}>{name}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SESSIONS: high school on one side, college on the other. */}
        <section id="sessions" className={s.sessions} aria-labelledby="sessions-h">
          <div className={s.sessionsInner}>
            <div className={s.secHead}>
              <p data-edit="sessions.label" data-edit-max="240" data-edit-multiline className={s.label}>Group 2 / Sessions</p>
              <h2 data-edit="sessions.secTitle" data-edit-max="60" id="sessions-h" className={s.secTitle}>Two levels, one way of teaching</h2>
              <p data-edit="sessions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Every session starts with what you got wrong last time and ends
                with three problems you can do alone. Your tutor is Dr. Elena
                Varga, PhD in physical chemistry, eleven years of teaching
                general and organic chemistry.
              </p>
            </div>
            <div className={s.levels}>
              {SESSIONS.map((x, i) => (
                <article key={x.level} className={s.level}>
                  <h3 data-edit={`level.levelName.${i}`} data-edit-max="40" className={s.levelName}>{x.level}</h3>
                  <p data-edit={`level.levelCourses.${i}`} data-edit-max="240" data-edit-multiline className={s.levelCourses}>{x.courses}</p>
                  <p data-edit={`level.levelHow.${i}`} data-edit-max="240" data-edit-multiline className={s.levelHow}>{x.how}</p>
                  <ul className={s.levelPoints}>
                    {x.points.map((p, i2) => (
                      <li data-edit={`level.item.${i}.${i2}`} data-edit-max="80" key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXAMS: three plans, each a reaction from now to exam day. */}
        <section id="exams" className={s.sec} aria-labelledby="exams-h">
          <div className={s.secHead}>
            <p data-edit="exams.label" data-edit-max="240" data-edit-multiline className={s.label}>Group 3 / Exam prep</p>
            <h2 data-edit="exams.secTitle" data-edit-max="60" id="exams-h" className={s.secTitle}>Exam prep, planned backward from the date</h2>
          </div>
          <ul className={s.exams}>
            {EXAMS.map((x, i) => (
              <li key={x.name} className={s.exam}>
                <p data-edit={`exams.examWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.examWhen}>{x.when}</p>
                <h3 data-edit={`exams.examName.${i}`} data-edit-max="40" className={s.examName}>{x.name}</h3>
                <p className={s.reaction}>
                  <span data-edit={`exams.reactFrom.${i}`} data-edit-max="60" className={s.reactFrom}>Now</span>
                  <span className={s.reactArrow} aria-hidden="true" />
                  <span data-edit={`exams.reactTo.${i}`} data-edit-max="60" className={s.reactTo}>{x.weeks}</span>
                </p>
                <p data-edit={`exams.examPlan.${i}`} data-edit-max="240" data-edit-multiline className={s.examPlan}>{x.plan}</p>
                <p data-edit={`exams.examPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.examPrice}>{x.price}</p>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,5,3,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={hextruchet}
            palette={WARM}
            fit="grid"
            cellSize={46}
            seed="va-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* RATES */}
        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.ratesGrid}>
            <div>
              <p data-edit="rates.label" data-edit-max="240" data-edit-multiline className={s.label}>Group 4 / Rates</p>
              <h2 data-edit="rates.secTitle" data-edit-max="60" id="rates-h" className={s.secTitle}>Hourly, and nothing hidden</h2>
              <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Pay per session or buy ten and take 10 percent off. No sign-up
                fee, no contract, and a session cancelled a day ahead is never
                charged.
              </p>
              <div className={s.freeCard}>
                <p data-edit="rates.freeTitle" data-edit-max="240" data-edit-multiline className={s.freeTitle}>The first session is free</p>
                <p data-edit="rates.freeText" data-edit-max="240" data-edit-multiline className={s.freeText}>
                  Forty-five minutes on whatever is hardest right now. If it is
                  not a fit, you have lost nothing but an evening.
                </p>
              </div>
            </div>
            <dl className={s.rates}>
              {RATES.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`rates.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`rates.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.label" data-edit-max="240" data-edit-multiline className={s.label}>Group 5 / Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book the free session</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us the course and what is due next. We reply the same
                evening with two or three times.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>Halden Branch Library, study room 3B, 80 Cedar Row</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Or online, anywhere, with a shared whiteboard and a document camera for handwritten work.</p>
              <p className={s.line}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550192240">(555) 019-2240</a>
              </p>
              <p className={s.line}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:elena@valencetutoring.example">elena@valencetutoring.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="va-name">Student name</label>
                <input id="va-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="va-email">Email</label>
                <input id="va-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="va-course">Course</label>
                <select id="va-course" name="course" defaultValue="hs">
                  <option value="hs">High school chemistry</option>
                  <option value="ap">AP or IB chemistry</option>
                  <option value="gen">College general chemistry</option>
                  <option value="org">Organic chemistry</option>
                  <option value="mcat">MCAT chemistry</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="va-where">Where</label>
                <select id="va-where" name="where" defaultValue="library">
                  <option value="library">At the library</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label6" htmlFor="va-next">Next test or deadline</label>
                <input id="va-next" name="next" type="date" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label7" htmlFor="va-note">What is hardest right now</label>
                <textarea id="va-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a time</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,5,3,5,1,3" className={s.footEdge} aria-hidden="true">
          <TabbiedPattern
            pattern={hextruchet}
            palette={QUIET}
            fit="grid"
            cellSize={32}
            seed="va-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Valence Chemistry Tutoring</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional tutoring service. The tutor, the library, the rates and the results are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
