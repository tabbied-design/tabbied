import { TabbiedPattern } from 'tabbied/react';
import { scramble, maze } from 'tabbied/patterns';
import s from './honor-roll-tutoring.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Honor Roll Tutoring: Tutoring center, Linden Park',
  description:
    'Honor Roll Tutoring teaches math, reading, writing, science, Spanish and test prep to grades K to 12 above the Alder Avenue library. Subjects by grade, the weekly schedule, session packs and a free first assessment.',
};

/* Site colors. The cover's marbling is graphite and paper and nothing else,
   the way a composition book's is; the doodle across the page is drawn in
   ballpoint, with a pencil line here and there, on a transparent ground so
   the sheet shows through. */
const PAPER = '#fbf9f1';
const GRAPHITE = '#23262d';
const BALLPOINT = '#2f55a4';

const MARBLE = [GRAPHITE, PAPER, GRAPHITE, PAPER, PAPER, GRAPHITE];
const DOODLE = ['transparent', BALLPOINT, BALLPOINT, GRAPHITE, BALLPOINT, BALLPOINT];
const BACK = [PAPER, GRAPHITE, PAPER, GRAPHITE, GRAPHITE, PAPER];

const NAV = [
  ['Subjects', '#subjects'],
  ['Schedule', '#schedule'],
  ['Packs', '#packs'],
  ['Tutors', '#tutors'],
  ['First week', '#first-week'],
  ['Book', '#book'],
];

const LABEL = [
  ['Grades', 'K to 12'],
  ['Subjects', 'math, reading, writing, science, Spanish, test prep'],
  ['Room', '2B, above the Alder Avenue library'],
];

const BANDS = ['K-2', '3-5', '6-8', '9-10', '11-12'];

/* One flag per grade band, K-2 to 11-12. */
const SUBJECTS: { name: string; bands: boolean[] }[] = [
  { name: 'Phonics and early reading', bands: [true, true, false, false, false] },
  { name: 'Reading comprehension', bands: [true, true, true, true, false] },
  { name: 'Writing and essays', bands: [false, true, true, true, true] },
  { name: 'Arithmetic and math facts', bands: [true, true, false, false, false] },
  { name: 'Pre-algebra', bands: [false, true, true, false, false] },
  { name: 'Algebra I and II', bands: [false, false, true, true, true] },
  { name: 'Geometry', bands: [false, false, true, true, false] },
  { name: 'Precalculus and calculus', bands: [false, false, false, true, true] },
  { name: 'Biology', bands: [false, false, true, true, true] },
  { name: 'Chemistry and physics', bands: [false, false, false, true, true] },
  { name: 'Spanish', bands: [true, true, true, true, true] },
  { name: 'SAT and ACT', bands: [false, false, false, true, true] },
  { name: 'Study skills', bands: [false, true, true, true, false] },
];

type Slot = {
  time: string;
  what: string;
  who: string;
  kind: 'read' | 'math' | 'sci' | 'test';
};

const WEEK: { day: string; hours: string; slots: Slot[] }[] = [
  {
    day: 'Monday',
    hours: '3:30 to 8',
    slots: [
      { time: '3:30', what: 'Phonics, K-3', who: 'Ines', kind: 'read' },
      { time: '4:30', what: 'Algebra, geometry', who: 'Dana', kind: 'math' },
      { time: '5:30', what: 'Chemistry', who: 'Theo', kind: 'sci' },
      { time: '6:30', what: 'Algebra II, precalc', who: 'Dana', kind: 'math' },
    ],
  },
  {
    day: 'Tuesday',
    hours: '3:30 to 8',
    slots: [
      { time: '3:30', what: 'Math, grades 1-5', who: 'Sam', kind: 'math' },
      { time: '4:30', what: 'Writing, grades 4-8', who: 'Ines', kind: 'read' },
      { time: '5:30', what: 'Biology', who: 'Priya', kind: 'sci' },
      { time: '6:30', what: 'SAT class, six seats', who: 'Ruth', kind: 'test' },
    ],
  },
  {
    day: 'Wednesday',
    hours: '3:30 to 8',
    slots: [
      { time: '3:30', what: 'Reading circle, K-2', who: 'Ines', kind: 'read' },
      { time: '4:30', what: 'Spanish, any grade', who: 'Sam', kind: 'read' },
      { time: '5:30', what: 'Physics', who: 'Theo', kind: 'sci' },
      { time: '6:30', what: 'Calculus', who: 'Dana', kind: 'math' },
    ],
  },
  {
    day: 'Thursday',
    hours: '3:30 to 8',
    slots: [
      { time: '3:30', what: 'Study skills, 6-8', who: 'Priya', kind: 'test' },
      { time: '4:30', what: 'Pre-algebra', who: 'Sam', kind: 'math' },
      { time: '5:30', what: 'Essays, applications', who: 'Ruth', kind: 'read' },
      { time: '6:30', what: 'SAT class, six seats', who: 'Ruth', kind: 'test' },
    ],
  },
  {
    day: 'Friday',
    hours: '3:30 to 6:30',
    slots: [
      { time: '3:30', what: 'Homework hour, drop in', who: 'Everyone', kind: 'test' },
      { time: '4:30', what: 'Geometry', who: 'Dana', kind: 'math' },
      { time: '5:30', what: 'Reading, grades 3-8', who: 'Ines', kind: 'read' },
    ],
  },
  {
    day: 'Saturday',
    hours: '9 to 1',
    slots: [
      { time: '9:00', what: 'Practice test, timed', who: 'Ruth', kind: 'test' },
      { time: '10:00', what: 'Biology, chemistry', who: 'Priya, Theo', kind: 'sci' },
      { time: '11:00', what: 'Math, any grade', who: 'Dana, Sam', kind: 'math' },
      { time: '12:00', what: 'Reading, any grade', who: 'Ines', kind: 'read' },
    ],
  },
];

const KINDS: [Slot['kind'], string][] = [
  ['read', 'Reading, writing, Spanish'],
  ['math', 'Math'],
  ['sci', 'Science'],
  ['test', 'Test prep and study skills'],
];

type Pack = {
  letter: string;
  name: string;
  detail: string;
  price: string;
  each: string;
  note: string;
};

const PACKS: Pack[] = [
  { letter: 'A', name: 'One session', detail: 'To try us, or for a test next week.', price: '$68', each: '55 minutes', note: '' },
  { letter: 'B', name: 'Five sessions', detail: 'A unit that did not stick, or a report card to rescue.', price: '$315', each: '$63 a session', note: '' },
  { letter: 'C', name: 'Ten sessions', detail: 'Once a week for a semester, same tutor, same time.', price: '$590', each: '$59 a session', note: 'Most families' },
  { letter: 'D', name: 'SAT or ACT course', detail: 'Eight 90-minute classes of six students, plus three practice tests on Saturday mornings.', price: '$840', each: 'Eight weeks', note: '' },
];

const WORKINGS = [
  'One at a time: 10 x $68 = $680',
  'As a pack: 10 x $59 = $590',
  '$680 - $590 = $90 saved',
  'That is one and a third sessions free',
];

type Tutor = {
  name: string;
  teaches: string;
  before: string;
  ask: string;
};

const TUTORS: Tutor[] = [
  { name: 'Dana Whitcomb', teaches: 'Math, grades 6-12. Director.', before: 'Taught algebra at Linden High for fourteen years.', ask: 'Ask her about why a negative times a negative is positive' },
  { name: 'Ines Park', teaches: 'Reading and writing, K-8', before: 'Third grade teacher, then a reading specialist.', ask: 'Ask her about books for kids who say they hate books' },
  { name: 'Theo Marsh', teaches: 'Chemistry, physics, precalculus', before: 'Finishing a PhD in materials engineering.', ask: 'Ask him about the periodic table song, at your own risk' },
  { name: 'Ruth Adeyemi', teaches: 'SAT, ACT, essays, applications', before: 'Ran test prep for a college access nonprofit.', ask: 'Ask her about the one reading question everybody misses' },
  { name: 'Sam Castillo', teaches: 'Spanish, math for grades 1-8', before: 'Grew up translating for his whole block.', ask: 'Ask him about fractions with a pizza you cannot eat' },
  { name: 'Priya Nair', teaches: 'Biology, study skills, grades 6-10', before: 'Middle school science teacher for six years.', ask: 'Ask her how to study for a test in three nights, not one' },
];

const FIRST_WEEK = [
  ['Day 1', 'Call, or fill in the slip at the bottom of this page. We call back the same evening.'],
  ['Day 2 or 3', 'A free 30-minute assessment: a short reading, a few problems, a chat. No grades, no pressure.'],
  ['Day 4', 'We call with a plan: which tutor, which slot, how many weeks we think it takes.'],
  ['Week 1', 'The first session. Bring the textbook, the last test and the homework that went wrong.'],
  ['Every 4 sessions', 'A one-page note home: what we covered, what clicked, what is next.'],
];

const FAQ = [
  ['Do you help with homework, or teach ahead?', 'Both. Most students bring the week\'s homework for the first ten minutes, then we work on whatever is underneath it.'],
  ['Can parents stay?', 'For the first session, of course. After that, the reading nook by the window has coffee and the library downstairs has wifi.'],
  ['What if we miss a session?', 'Tell us by noon and it moves to another slot that week. Without notice it counts, because the tutor was here.'],
  ['Do you tutor online?', 'Yes, for students in grade 6 and up, on a shared whiteboard. Same prices. Younger kids do better at the table with us.'],
  ['Is there help with the cost?', 'Four seats a week are free for students on the school lunch program. Ask Dana, it stays between you and her.'],
];

const HOURS = [
  ['Monday to Thursday', '3:30 to 8 pm'],
  ['Friday', '3:30 to 6:30 pm'],
  ['Saturday', '9 am to 1 pm'],
  ['Summer, June to August', 'Mornings, 9 to 1'],
];

export default function HonorRollTutoringPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbf9f1',
        '--graphite': '#23262d',
        '--ballpoint': '#2f55a4',
        '--margin': '#d6453a',
        '--highlight': '#f3dc3f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,graphite,ballpoint,margin,highlight"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Lexend:wght@300..700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Honor Roll</a>
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
        {/* ----------------------------------------------------------- COVER
            A composition book: marbled board, a cloth spine, a label. */}
        <section className={s.coverWrap} aria-labelledby="cover-h">
          <div className={s.cover}>
            <div data-edit-pattern="cover.field" data-edit-roles="1,0,1,0,0,1" className={s.marble} aria-hidden="true">
              <TabbiedPattern
                pattern={scramble}
                palette={MARBLE}
                fit="grid"
                cellSize={24}
                seed="honor-roll-cover"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.spine} aria-hidden="true" />

            <div className={s.label}>
              <p data-edit="cover.labelTop" data-edit-max="240" data-edit-multiline className={s.labelTop}>Honor Roll Tutoring</p>
              <h1 data-edit="cover.title" data-edit-format="emphasis" data-edit-max="70" id="cover-h" className={s.title}>Homework that <em>finally makes sense.</em></h1>
              <dl className={s.labelLines}>
                {LABEL.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`cover.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`cover.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className={s.coverFoot}>
            <p data-edit="cover.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Six tutors, one long table and a lot of pencils, on the second
              floor of 41 Alder Avenue. One tutor and one student, the same time
              each week, until the report card says so.
            </p>
            <div className={s.ctas}>
              <a data-edit="cover.btn" data-edit-max="28" className={s.btn} href="#book">Book a free assessment</a>
              <a data-edit="cover.btnLine" data-edit-max="28" className={s.btnLine} href="#packs">See the prices</a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SUBJECTS */}
        <section id="subjects" className={s.sec} aria-labelledby="subjects-h">
          <div className={s.secHead}>
            <p data-edit="subjects.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>p. 1</p>
            <h2 data-edit="subjects.title" data-edit-format="emphasis" data-edit-max="60" id="subjects-h">Subjects, <em>by grade</em></h2>
            <p data-edit="subjects.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A tick means one of us teaches it at that level, every week. If
              you do not see it, ask: we know people.
            </p>
          </div>

          <div className={s.gridSheet}>
            <table className={s.subjects}>
              <caption data-edit="subjects.srOnly" className={s.srOnly}>Which subjects are taught in which grade bands</caption>
              <thead>
                <tr>
                  <th data-edit="subjects.subjectCol" scope="col" className={s.subjectCol}>Subject</th>
                  {BANDS.map((b, i) => (
                    <th data-edit={`subjects.heading.${i}`} key={b} scope="col">{b}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((sub, i) => (
                  <tr key={sub.name}>
                    <th data-edit={`subjects.subjectCol2.${i}`} scope="row" className={s.subjectCol}>{sub.name}</th>
                    {sub.bands.map((on, i) => (
                      <td key={BANDS[i]} className={on ? s.tick : s.blank}>
                        <span className={s.srOnly}>{on ? 'Taught' : 'Not taught'}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------------------------------------------- SCHEDULE */}
        <section id="schedule" className={s.sec} aria-labelledby="schedule-h">
          <div className={s.secHead}>
            <p data-edit="schedule.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>p. 2</p>
            <h2 data-edit="schedule.title" data-edit-format="emphasis" data-edit-max="60" id="schedule-h">The week, <em>by the hour</em></h2>
            <p data-edit="schedule.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Who sits at the table when. Sessions start on the hour and run 55
              minutes, so there is time to sharpen a pencil in between.
            </p>
          </div>

          <ul className={s.legend}>
            {KINDS.map(([kind, label], i) => (
              <li data-edit={`schedule.item.${i}`} data-edit-max="80" key={kind} className={s[kind]}>{label}</li>
            ))}
          </ul>

          <div className={s.week}>
            {WEEK.map((d, i) => (
              <div key={d.day} className={s.day}>
                <h3 data-edit={`schedule.dayName.${i}`} data-edit-max="40" className={s.dayName}>{d.day}</h3>
                <p data-edit={`schedule.dayHours.${i}`} data-edit-max="240" data-edit-multiline className={s.dayHours}>{d.hours}</p>
                <ul className={s.slots}>
                  {d.slots.map((slot, j) => (
                    <li key={`${slot.time}-${j}`} className={s[slot.kind]}>
                      <span data-edit={`schedule.slotTime.${i}.${j}`} data-edit-max="60" className={s.slotTime}>{slot.time}</span>
                      <span data-edit={`schedule.slotWhat.${i}.${j}`} data-edit-max="60" className={s.slotWhat}>{slot.what}</span>
                      <span data-edit={`schedule.slotWho.${i}.${j}`} data-edit-max="60" className={s.slotWho}>{slot.who}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* The margin doodle: a ballpoint maze drawn down a strip of the sheet. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,2,1,2,2" className={s.doodleBand} aria-hidden="true">
          <TabbiedPattern
            pattern={maze}
            palette={DOODLE}
            options={{ thickness: 4 }}
            fit="grid"
            cellSize={28}
            seed="honor-roll-doodle"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- PACKS */}
        <section id="packs" className={s.sec} aria-labelledby="packs-h">
          <div className={s.secHead}>
            <p data-edit="packs.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>p. 3</p>
            <h2 data-edit="packs.title" data-edit-format="emphasis" data-edit-max="60" id="packs-h">Packs and <em>prices</em></h2>
            <p data-edit="packs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Sessions carry over for six months, and siblings can share a
              pack. The first assessment is always free.
            </p>
          </div>

          <div className={s.packs}>
          <div className={s.quiz}>
            <p data-edit="packs.qNo" data-edit-max="240" data-edit-multiline className={s.qNo}>Question 4</p>
            <h3 data-edit="packs.question" data-edit-max="40" className={s.question}>How many sessions does your student need?</h3>
            <p data-edit="packs.qHint" data-edit-max="240" data-edit-multiline className={s.qHint}>Choose one answer. Show your work.</p>
            <ol className={s.choices}>
              {PACKS.map((p, i) => (
                <li key={p.letter} className={p.note ? s.chosen : undefined}>
                  <span data-edit={`packs.bubble.${i}`} data-edit-max="60" className={s.bubble}>{p.letter}</span>
                  <div className={s.choiceBody}>
                    <h4 data-edit={`packs.choiceName.${i}`} data-edit-max="36" className={s.choiceName}>{p.name}</h4>
                    <p data-edit={`packs.choiceDetail.${i}`} data-edit-max="240" data-edit-multiline className={s.choiceDetail}>{p.detail}</p>
                  </div>
                  <div className={s.choicePrice}>
                    <strong data-edit={`packs.emphasis.${i}`}>{p.price}</strong>
                    <small data-edit={`packs.note.${i}`}>{p.each}</small>
                  </div>
                  {p.note ? <span data-edit={`packs.redNote.${i}`} data-edit-max="60" className={s.redNote}>{p.note}</span> : null}
                </li>
              ))}
            </ol>
          </div>

          <aside className={s.workings} aria-labelledby="work-h">
            <h3 data-edit="work.workTitle" data-edit-max="40" id="work-h" className={s.workTitle}>Show your work</h3>
            <ol className={s.workLines}>
              {WORKINGS.map((line, i) => (
                <li data-edit={`work.item.${i}`} data-edit-max="80" key={line}>{line}</li>
              ))}
            </ol>
            <p className={s.answerLine}>
              <span data-edit="work.text" data-edit-max="60">Answer:</span>
              <span data-edit="work.answer" data-edit-max="60" className={s.answer}>C</span>
            </p>
            <p data-edit="work.workNote" data-edit-max="240" data-edit-multiline className={s.workNote}>Siblings can share one pack, so two kids at ten sessions each is two packs, not four.</p>
            <Artwork
              slug="honor-roll-tutoring-doodle"
              alt="A ballpoint doodle of a sharpened pencil, an apple and a protractor"
              inks={['var(--pen)']}
              className={s.doodle}
            />
          </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------- TUTORS */}
        <section id="tutors" className={s.sec} aria-labelledby="tutors-h">
          <div className={s.secHead}>
            <p data-edit="tutors.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>p. 4</p>
            <h2 data-edit="tutors.title" data-edit-format="emphasis" data-edit-max="60" id="tutors-h">Who is <em>at the table</em></h2>
            <p data-edit="tutors.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every tutor here has taught a full class before. Your student keeps
              the same one from the first session to the last.
            </p>
          </div>

          <ol className={`${s.ruled} ${s.roster}`}>
            {TUTORS.map((t, i) => (
              <li key={t.name}>
                <h3 data-edit={`tutors.tutorName.${i}`} data-edit-max="40" className={s.tutorName}>{t.name}</h3>
                <p data-edit={`tutors.tutorTeaches.${i}`} data-edit-max="240" data-edit-multiline className={s.tutorTeaches}>{t.teaches}</p>
                <p data-edit={`tutors.tutorBefore.${i}`} data-edit-max="240" data-edit-multiline className={s.tutorBefore}>{t.before}</p>
                <p data-edit={`tutors.tutorAsk.${i}`} data-edit-max="240" data-edit-multiline className={s.tutorAsk}>{t.ask}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ FIRST WEEK */}
        <section id="first-week" className={s.sec} aria-labelledby="first-h">
          <div className={s.firstGrid}>
            <div>
              <div className={s.secHead}>
                <p data-edit="firstWeek.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>p. 5</p>
                <h2 data-edit="firstWeek.title" data-edit-format="emphasis" data-edit-max="60" id="first-h">Your <em>first week</em></h2>
                <p data-edit="firstWeek.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>A to-do list, in the order it happens.</p>
              </div>
              <ol className={`${s.ruled} ${s.todo}`}>
                {FIRST_WEEK.map(([when, what], i) => (
                  <li key={when}>
                    <span data-edit={`firstWeek.todoWhen.${i}`} data-edit-max="60" className={s.todoWhen}>{when}</span>
                    <p data-edit={`firstWeek.body.${i}`} data-edit-max="240" data-edit-multiline>{what}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className={s.faqCol}>
              <h3 data-edit="firstWeek.faqTitle" data-edit-max="40" className={s.faqTitle}>Questions parents ask</h3>
              {FAQ.map(([q, a], i) => (
                <details key={q} className={s.q}>
                  <summary data-edit={`firstWeek.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`firstWeek.body2.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
              <div data-edit-pattern="firstWeek.field" data-edit-roles="transparent,2,2,1,2,2" className={s.cardDoodle} aria-hidden="true">
                <TabbiedPattern
                  pattern={maze}
                  palette={DOODLE}
                  options={{ thickness: 4 }}
                  fit="grid"
                  cellSize={26}
                  seed="honor-roll-card"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.office}>
              <p data-edit="book.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>p. 6</p>
              <h2 data-edit="book.title" data-edit-format="emphasis" data-edit-max="60" id="book-h">Room 2B, <em>Alder Avenue</em></h2>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline className={s.address}>
                41 Alder Avenue, second floor
                <br />
                Linden Park, up the stairs past the library
              </p>
              <p className={s.contact}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550143380">(555) 014-3380</a>
                <br />
                <a data-edit="book.link2" data-edit-max="28" href="mailto:desk@honorrolltutoring.example">desk@honorrolltutoring.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="book.small" data-edit-max="240" data-edit-multiline className={s.small}>
                There is a lift at the library entrance. Street parking is free
                after 6 pm, and the 14 bus stops at the corner.
              </p>
            </div>

            <form className={s.slip} action="#">
              <p data-edit="book.cut" data-edit-max="240" data-edit-multiline className={s.cut}>Cut along the line and hand it in</p>
              <h3 data-edit="book.slipTitle" data-edit-max="40" className={s.slipTitle}>Free assessment, sign-up slip</h3>
              <div className={s.slipGrid}>
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="hr-student">Student's name</label>
                  <input id="hr-student" name="student" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="hr-grade">Grade</label>
                  <select id="hr-grade" name="grade" defaultValue="">
                    <option value="" disabled>Pick one</option>
                    <option value="k2">K to 2</option>
                    <option value="35">3 to 5</option>
                    <option value="68">6 to 8</option>
                    <option value="910">9 to 10</option>
                    <option value="1112">11 to 12</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="hr-parent">Parent or guardian</label>
                  <input id="hr-parent" name="parent" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="hr-phone">Phone</label>
                  <input id="hr-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="book.label5" htmlFor="hr-what">What is going wrong, in a sentence or two</label>
                  <textarea id="hr-what" name="what" rows={3} />
                </div>
              </div>
              <button data-edit="book.btn" data-edit-max="24" className={s.btn} type="submit">Hand it in</button>
              <p data-edit="book.slipNote" data-edit-max="240" data-edit-multiline className={s.slipNote}>We call back the same evening, before 8.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        {/* The back cover: the same marbled board as the front. */}
        <div data-edit-pattern="footer.field" data-edit-roles="0,1,0,1,1,0" className={s.backCover} aria-hidden="true">
          <TabbiedPattern
            pattern={scramble}
            palette={BACK}
            fit="grid"
            cellSize={24}
            seed="honor-roll-back"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footText}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Honor Roll Tutoring</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional tutoring center. The tutors, prices, schedule and address are invented.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The doodle in the margin is a generated image, drawn in the page's colors.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
