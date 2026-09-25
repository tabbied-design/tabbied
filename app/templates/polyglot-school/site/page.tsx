import { TabbiedPattern } from 'tabbied/react';
import { diamondconfetti, metro } from 'tabbied/patterns';
import s from './polyglot-school.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Polyglot: Language school, Market Square',
  description:
    "Polyglot teaches ten languages in small groups, from a first A1 lesson to C2. The six levels, the week's timetable, courses and fees, and a free placement test.",
};

/* Site colors. The staircase is filled with the confetti diamonds in the
   page's blues and coral; the route lines under the form sit on the paper
   with a transparent ground. */
const INK = '#16213E';
const BLUE = '#3D5AFE';
const CORAL = '#FF7A59';
const GRAY = '#8A90A6';
const PALE = '#E6E9F5';
const PAPER = '#F6F7FB';

const STAIRS = ['transparent', INK, BLUE, PALE, CORAL, PAPER, BLUE, PALE];
const ROUTES = ['transparent', PALE, BLUE, PALE, GRAY];

const NAV = [
  ['Levels', '#levels'],
  ['Timetable', '#timetable'],
  ['Languages', '#languages'],
  ['Courses', '#courses'],
  ['Placement test', '#placement'],
];

type Level = {
  code: string;
  name: string;
  can: string;
  hours: string;
  step: string;
};

const LEVELS: Level[] = [
  {
    code: 'A1',
    name: 'Beginner',
    can: 'Order a coffee, say who you are, ask the way.',
    hours: '60 hours',
    step: 's1',
  },
  {
    code: 'A2',
    name: 'Elementary',
    can: 'Talk about your week, shop, book a room.',
    hours: '80 hours',
    step: 's2',
  },
  {
    code: 'B1',
    name: 'Intermediate',
    can: 'Travel on your own and tell a story.',
    hours: '120 hours',
    step: 's3',
  },
  {
    code: 'B2',
    name: 'Upper intermediate',
    can: 'Follow a film, argue a point, work in it.',
    hours: '160 hours',
    step: 's4',
  },
  {
    code: 'C1',
    name: 'Advanced',
    can: 'Read a novel, write a report, get the jokes.',
    hours: '200 hours',
    step: 's5',
  },
  {
    code: 'C2',
    name: 'Proficient',
    can: 'Say exactly what you mean, with nuance.',
    hours: '240 hours',
    step: 's6',
  },
];

const SLOTS = [
  {
    time: 'Morning',
    hours: '9:30 - 11:30',
    days: ['Spanish A1', 'French B1', 'Spanish A1', 'French B1', 'Intensive, all levels', ''],
  },
  {
    time: 'Lunch',
    hours: '12:15 - 1:15',
    days: ['Italian A2', 'Conversation club', 'Italian A2', 'Conversation club', 'German A1', ''],
  },
  {
    time: 'Early evening',
    hours: '5:30 - 7:30',
    days: ['Japanese A1', 'German B2', 'Japanese A1', 'German B2', '', 'Portuguese A1'],
  },
  {
    time: 'Evening',
    hours: '7:45 - 9:45',
    days: ['Spanish B2', 'Mandarin A2', 'Spanish B2', 'Mandarin A2', '', 'Arabic A1'],
  },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const LANGUAGES = [
  { hello: 'Hola', name: 'Spanish', levels: 'A1 - C2', teachers: '6 teachers' },
  { hello: 'Bonjour', name: 'French', levels: 'A1 - C2', teachers: '4 teachers' },
  { hello: 'Hallo', name: 'German', levels: 'A1 - C1', teachers: '3 teachers' },
  { hello: 'Ciao', name: 'Italian', levels: 'A1 - C1', teachers: '3 teachers' },
  { hello: 'Ola', name: 'Portuguese', levels: 'A1 - B2', teachers: '2 teachers' },
  { hello: 'Konnichiwa', name: 'Japanese', levels: 'A1 - B2', teachers: '2 teachers' },
  { hello: 'Ni hao', name: 'Mandarin', levels: 'A1 - B2', teachers: '2 teachers' },
  { hello: 'Marhaba', name: 'Arabic', levels: 'A1 - B1', teachers: '1 teacher' },
  { hello: 'Annyeong', name: 'Korean', levels: 'A1 - A2', teachers: '1 teacher' },
  { hello: 'Hello', name: 'English', levels: 'A1 - C2', teachers: '5 teachers' },
];

const COURSES = [
  {
    name: 'Group course',
    price: '$420',
    per: 'for 10 weeks',
    points: ['Two evenings or two mornings a week', 'Ten students at most', 'Book and audio included'],
  },
  {
    name: 'Intensive',
    price: '$560',
    per: 'for 4 weeks',
    points: ['Every weekday morning, 9:30 - 11:30', 'One level in a month', 'Good before a move abroad'],
  },
  {
    name: 'Private',
    price: '$58',
    per: 'an hour',
    points: ['At the school or on a video call', 'Business, exams, or just talking', 'Packs of ten for $540'],
  },
];

const FAQ = [
  {
    q: 'I learned some at school years ago. Where do I start?',
    a: 'Take the placement test. Most people who did three years at school start in A2, and the test puts you in the right group rather than the one you guess.',
  },
  {
    q: 'What if I miss a class?',
    a: 'Join the same lesson in the other group that week, or watch the recording and bring questions to Friday conversation club.',
  },
  {
    q: 'Do you prepare people for exams?',
    a: 'Yes: DELE, DELF, Goethe, CILS and JLPT, in private lessons or in a six-week exam group before each sitting.',
  },
  {
    q: 'Can my company pay?',
    a: 'We invoice employers directly and issue a certificate of attendance at the end of every course.',
  },
];

export default function PolyglotPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f7fb',
        '--ink': '#16213e',
        '--blue': '#3d5afe',
        '--coral': '#ff7a59',
        '--gray': '#8a90a6',
        '--pale': '#e6e9f5',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,blue,coral,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;800&family=Red+Hat+Text:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Polyglot</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#placement">Free placement test</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Language school, 14 Market Square</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Climb one level <em>at a time.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Ten languages, taught in groups of ten or fewer, from your first
              hello to reading the newspaper. Every course is one step on the
              same six-level ladder, so you always know where you are.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#placement">Find your level</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#timetable">See the timetable</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <Artwork
              slug="polyglot-school-bubbles"
              alt="Two overlapping speech bubbles"
              inks={{ red: 'var(--coral)', blue: 'var(--blue)' }}
              className={s.bubbles}
            />
            <span data-edit="hero.text" data-edit-max="60" className={s.sayOne} aria-hidden="true">Hola!</span>
            <span data-edit="hero.text2" data-edit-max="60" className={s.sayTwo} aria-hidden="true">Bonjour!</span>
          </div>
        </section>

        {/* ---------------------------------------------------------- LEVELS
            The six levels as a staircase: one pattern field clipped to the
            stair outline, a card on every tread. */}
        <section id="levels" className={s.levels} aria-labelledby="levels-h">
          <div className={s.ladder}>
            <div data-edit-pattern="levels.field" data-edit-roles="transparent,1,2,5,3,0,2,5" className={s.stairField} aria-hidden="true">
              <TabbiedPattern
                pattern={diamondconfetti}
                palette={STAIRS}
                fit="grid"
                cellSize={60}
                seed="polyglot-stairs"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.ladderHead}>
              <p data-edit="levels.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The level ladder</p>
              <h2 data-edit="levels.title" data-edit-max="60" id="levels-h">Six steps from hello to fluent</h2>
              <p data-edit="levels.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                The European framework every school and exam uses. Each step
                is two or three of our ten-week courses.
              </p>
            </div>
            <ol className={s.steps}>
              {LEVELS.map((l, i) => (
                <li key={l.code} className={`${s.step} ${s[l.step]}`}>
                  <div className={s.card}>
                    <span data-edit={`levels.code.${i}`} data-edit-max="60" className={s.code}>{l.code}</span>
                    <h3 data-edit={`levels.levelName.${i}`} data-edit-max="40" className={s.levelName}>{l.name}</h3>
                    <p data-edit={`levels.can.${i}`} data-edit-max="240" data-edit-multiline className={s.can}>{l.can}</p>
                    <span data-edit={`levels.hours.${i}`} data-edit-max="60" className={s.hours}>{l.hours}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- TIMETABLE */}
        <section id="timetable" className={s.timetable} aria-labelledby="timetable-h">
          <div className={s.head}>
            <p data-edit="timetable.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>This term</p>
            <h2 data-edit="timetable.title" data-edit-max="60" id="timetable-h">The week's timetable</h2>
            <p data-edit="timetable.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Groups meet twice a week at the same time. The term runs ten
              weeks from September 14; the next starts January 11.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <caption data-edit="timetable.srOnly" className={s.srOnly}>Group classes by day and time</caption>
              <thead>
                <tr>
                  <th data-edit="timetable.heading" scope="col">Time</th>
                  {DAYS.map((d, i) => (
                    <th data-edit={`timetable.heading2.${i}`} key={d} scope="col">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLOTS.map((slot, i) => (
                  <tr key={slot.time}>
                    <th scope="row">
                      <span data-edit={`timetable.slotName.${i}`} data-edit-max="60" className={s.slotName}>{slot.time}</span>
                      <span data-edit={`timetable.slotHours.${i}`} data-edit-max="60" className={s.slotHours}>{slot.hours}</span>
                    </th>
                    {slot.days.map((c, i) => (
                      <td key={DAYS[i]} className={c ? s.hasClass : s.noClass}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="timetable.tableNote" data-edit-max="240" data-edit-multiline className={s.tableNote}>Conversation club is free for anyone enrolled in a course.</p>
        </section>

        {/* ------------------------------------------------------- LANGUAGES */}
        <section id="languages" className={s.languages} aria-labelledby="languages-h">
          <div className={s.langHead}>
            <div className={s.head}>
              <p data-edit="languages.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Languages</p>
              <h2 data-edit="languages.title" data-edit-max="60" id="languages-h">Ten languages, one front door</h2>
              <p data-edit="languages.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Every teacher is a native speaker and a trained teacher. English
                for speakers of other languages runs all year, at every level.
              </p>
            </div>
            <Artwork
              slug="polyglot-school-globe"
              alt="A desk globe on its stand"
              inks={{ red: 'var(--coral)', blue: 'var(--blue)', black: 'var(--ink)' }}
              className={s.globe}
            />
          </div>
          <ul className={s.langGrid}>
            {LANGUAGES.map((l, i) => (
              <li key={l.name} className={s.lang}>
                <span data-edit={`languages.hello.${i}`} data-edit-max="60" className={s.hello}>{l.hello}</span>
                <h3 data-edit={`languages.langName.${i}`} data-edit-max="40" className={s.langName}>{l.name}</h3>
                <span data-edit={`languages.langLevels.${i}`} data-edit-max="60" className={s.langLevels}>{l.levels}</span>
                <span data-edit={`languages.langTeachers.${i}`} data-edit-max="60" className={s.langTeachers}>{l.teachers}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- COURSES */}
        <section id="courses" className={s.courses} aria-labelledby="courses-h">
          <div className={s.coursesInner}>
            <div className={s.courseArt}>
              <Artwork
                slug="polyglot-school-book"
                alt="An open book"
                inks={{ red: 'var(--paper)', blue: 'var(--coral)', black: 'var(--ink)' }}
                className={s.book}
              />
            </div>
            <div className={s.courseCopy}>
              <div className={s.head}>
                <p data-edit="courses.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Courses and fees</p>
                <h2 data-edit="courses.title" data-edit-max="60" id="courses-h">Three ways to study</h2>
              </div>
              <ul className={s.courseList}>
                {COURSES.map((c, i) => (
                  <li key={c.name} className={s.course}>
                    <h3 data-edit={`courses.courseName.${i}`} data-edit-max="40" className={s.courseName}>{c.name}</h3>
                    <p className={s.coursePrice}>
                      <strong data-edit={`courses.emphasis.${i}`}>{c.price}</strong>
                      <span data-edit={`courses.text.${i}`} data-edit-max="60">{c.per}</span>
                    </p>
                    <ul className={s.coursePoints}>
                      {c.points.map((pt, i2) => (
                        <li data-edit={`courses.item.${i}.${i2}`} data-edit-max="80" key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- PLACEMENT */}
        <section id="placement" className={s.placement} aria-labelledby="placement-h">
          <div data-edit-pattern="placement.field" data-edit-roles="transparent,5,2,5,4" className={s.routes} aria-hidden="true">
            <TabbiedPattern
              pattern={metro}
              palette={ROUTES}
              fit="grid"
              cellSize={96}
              seed="polyglot-routes"
              options={{ frequency: 0.6 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.placementInner}>
            <div className={s.placementCopy}>
              <p data-edit="placement.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Placement test</p>
              <h2 data-edit="placement.title" data-edit-max="60" id="placement-h">Twenty minutes to find your step</h2>
              <p data-edit="placement.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                A short test online, then a ten-minute chat with a teacher, who
                tells you which group to join. It is free and there is nothing
                to prepare.
              </p>
              <ol className={s.howList}>
                <li data-edit="placement.item" data-edit-max="80">Send the form. We email a link within a day.</li>
                <li data-edit="placement.item2" data-edit-max="80">Take the test whenever suits you.</li>
                <li data-edit="placement.item3" data-edit-max="80">Talk to a teacher and choose a group.</li>
              </ol>
            </div>
            <form className={s.form} action="#">
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="placement.text" data-edit-max="60">Your name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span data-edit="placement.text2" data-edit-max="60">Email</span>
                  <input type="email" name="email" autoComplete="email" />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="placement.text3" data-edit-max="60">Language</span>
                <select name="language" defaultValue="">
                  <option value="" disabled>Choose a language</option>
                  {LANGUAGES.map((l) => (
                    <option key={l.name}>{l.name}</option>
                  ))}
                </select>
              </label>
              <fieldset className={s.choice}>
                <legend data-edit="placement.legend">How much do you know already?</legend>
                <div className={s.pills}>
                  <label>
                    <input type="radio" name="level" value="none" />
                    <span data-edit="placement.text4" data-edit-max="60">Nothing yet</span>
                  </label>
                  <label>
                    <input type="radio" name="level" value="some" />
                    <span data-edit="placement.text5" data-edit-max="60">A few words</span>
                  </label>
                  <label>
                    <input type="radio" name="level" value="by" />
                    <span data-edit="placement.text6" data-edit-max="60">I get by</span>
                  </label>
                  <label>
                    <input type="radio" name="level" value="comfortable" />
                    <span data-edit="placement.text7" data-edit-max="60">Comfortable</span>
                  </label>
                </div>
              </fieldset>
              <fieldset className={s.choice}>
                <legend data-edit="placement.legend2">When could you come?</legend>
                <div className={s.pills}>
                  <label>
                    <input type="checkbox" name="when" value="morning" />
                    <span data-edit="placement.text8" data-edit-max="60">Mornings</span>
                  </label>
                  <label>
                    <input type="checkbox" name="when" value="lunch" />
                    <span data-edit="placement.text9" data-edit-max="60">Lunch</span>
                  </label>
                  <label>
                    <input type="checkbox" name="when" value="evening" />
                    <span data-edit="placement.text10" data-edit-max="60">Evenings</span>
                  </label>
                  <label>
                    <input type="checkbox" name="when" value="saturday" />
                    <span data-edit="placement.text11" data-edit-max="60">Saturdays</span>
                  </label>
                </div>
              </fieldset>
              <button data-edit="placement.btn" data-edit-max="24" type="submit" className={s.btn}>Send me the test</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.head}>
            <p data-edit="faq.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Questions</p>
            <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Before you enroll</h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Polyglot</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>A language school in ten languages and six levels.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Visit</h2>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>14 Market Square, second floor</p>
            <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>Office open Mon-Fri, 9 am - 8 pm</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Contact</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.link" data-edit-max="28" href="tel:5550146120">(555) 014-6120</a></li>
              <li><a data-edit="footer.link2" data-edit-max="28" href="mailto:hello@polyglot.example">hello@polyglot.example</a></li>
            </ul>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional language school. Courses, prices and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the page's own colors; the pictures follow the same palette.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
