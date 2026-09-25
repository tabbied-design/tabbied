import { TabbiedPattern } from 'tabbied/react';
import { concentricrings, picket } from 'tabbied/patterns';
import s from './cadence-music.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Figure } from 'components/Figure';

export const metadata = {
  title: 'Cadence Music School: Music lessons for all ages, Millbrook',
  description:
    'Piano, violin, guitar, voice, drums and cello lessons for ages four to adult, in 30, 45 and 60 minute lessons. Term dates, recitals, group classes and a $20 trial lesson.',
};

/* Site colors. The fields take `transparent` in the background slot, so the
   rings and the stripes draw straight onto the paper. */
const INK = '#1B1A24';
const VERMILION = '#E0533C';
const GRAY = '#8D8A93';
const PALE = '#E9E6DF';

const RINGS = ['transparent', VERMILION, GRAY, INK];
const KEYS = ['transparent', INK, PALE, GRAY, PALE, VERMILION];

const NAV = [
  ['Instruments', '#instruments'],
  ['Teachers', '#teachers'],
  ['Term dates', '#term'],
  ['Rates', '#rates'],
  ['Classes', '#classes'],
  ['Trial lesson', '#trial'],
  ['Find us', '#find-us'],
];

const FACTS = [
  ['6', 'instruments'],
  ['9', 'teachers'],
  ['4 to 84', 'the ages we teach'],
  ['$20', 'for a trial lesson'],
];

type Instrument = {
  no: string;
  name: string;
  ages: string;
  body: string;
  from: string;
  teachers: string;
};

const INSTRUMENTS: Instrument[] = [
  {
    no: '01',
    name: 'Piano',
    ages: 'Ages 5 to adult',
    body: 'Our most asked-for lessons, on six upright pianos and a grand in the hall. Classical, jazz and pop, and graded exams to Grade 8.',
    from: 'From $34',
    teachers: 'With Helen, Daniel and Mei Lin',
  },
  {
    no: '02',
    name: 'Violin',
    ages: 'Ages 4 to adult',
    body: 'Starting at four on a small-size violin you can hire from us. Players join the string orchestra from Grade 2.',
    from: 'From $34',
    teachers: 'With Oskar and Priya',
  },
  {
    no: '03',
    name: 'Guitar',
    ages: 'Ages 7 to adult',
    body: 'Acoustic, classical and electric. Chords and songs first, reading music when you want it, and a band when you are ready.',
    from: 'From $34',
    teachers: 'With Sam',
  },
  {
    no: '04',
    name: 'Voice',
    ages: 'Ages 8 to adult',
    body: 'Breathing, technique and repertoire, from musical theater to art song. Younger singers start in the junior choir.',
    from: 'From $34',
    teachers: 'With Lucia',
  },
  {
    no: '05',
    name: 'Drums',
    ages: 'Ages 7 to adult',
    body: 'In a soundproofed room with two kits, so the teacher plays along. Rock school bands rehearse on Saturdays.',
    from: 'From $34',
    teachers: 'With Jonah',
  },
  {
    no: '06',
    name: 'Cello',
    ages: 'Ages 6 to adult',
    body: 'Quarter-size cellos to hire for the youngest players, and chamber groups for anyone past Grade 4.',
    from: 'From $34',
    teachers: 'With Ruth',
  },
];

type Teacher = {
  initials: string;
  name: string;
  teaches: string;
  days: string;
  note: string;
};

const TEACHERS: Teacher[] = [
  {
    initials: 'HA',
    name: 'Helen Achebe',
    teaches: 'Piano, head of school',
    days: 'Mon, Wed, Thu',
    note: 'Taught at the city conservatory for twelve years before opening Cadence in 2011.',
  },
  {
    initials: 'DR',
    name: 'Daniel Ruiz',
    teaches: 'Piano and theory',
    days: 'Tue, Thu, Sat',
    note: 'A jazz pianist on weekends. Runs the Wednesday theory class and our exam preparation.',
  },
  {
    initials: 'ML',
    name: 'Mei Lin Chow',
    teaches: 'Piano, early years',
    days: 'Mon, Tue, Sat',
    note: 'Teaches most of our five and six year olds, and the Little Notes class on Saturdays.',
  },
  {
    initials: 'OB',
    name: 'Oskar Brandt',
    teaches: 'Violin and viola',
    days: 'Mon, Fri, Sat',
    note: 'Conducts the string orchestra, and plays second violin in the Millbrook Quartet.',
  },
  {
    initials: 'PN',
    name: 'Priya Nair',
    teaches: 'Violin',
    days: 'Wed, Thu',
    note: 'Specializes in beginners of every age, including a Thursday group for adult starters.',
  },
  {
    initials: 'SO',
    name: 'Sam Okafor',
    teaches: 'Guitar and bass',
    days: 'Tue, Wed, Sat',
    note: 'Toured for ten years as a session player. Coaches the rock school bands.',
  },
  {
    initials: 'LF',
    name: 'Lucia Ferrante',
    teaches: 'Voice',
    days: 'Tue, Thu',
    note: 'A soprano who sings with the county opera, and leads the junior choir.',
  },
  {
    initials: 'JW',
    name: 'Jonah Weiss',
    teaches: 'Drums and percussion',
    days: 'Wed, Fri, Sat',
    note: 'Plays in three bands and teaches reading rhythm to anyone who will sit still for it.',
  },
  {
    initials: 'RC',
    name: 'Ruth Castellanos',
    teaches: 'Cello',
    days: 'Mon, Thu',
    note: 'Principal cellist of the Millbrook Symphony, and coach of the Friday chamber groups.',
  },
];

/* The autumn term on a grid of sixteen week columns: fifteen weeks of term
   and the first week of the winter break. `week` is the column an event
   starts in, `span` how many columns its label may use, and `row` puts it
   above or below the line. */
type TermEvent = {
  week: number;
  span: number;
  row: 'up' | 'down';
  kind: string;
  date: string;
  title: string;
  body: string;
};

const TERM: TermEvent[] = [
  {
    week: 1,
    span: 3,
    row: 'up',
    kind: 'Term',
    date: 'Tue Sep 8',
    title: 'Term begins',
    body: 'Lessons at your usual time. Timetables go out the week before.',
  },
  {
    week: 2,
    span: 3,
    row: 'down',
    kind: 'Classes',
    date: 'Mon Sep 14',
    title: 'Group classes start',
    body: 'Little Notes, theory, choir, orchestra and the bands.',
  },
  {
    week: 4,
    span: 3,
    row: 'up',
    kind: 'Open day',
    date: 'Sat Oct 3',
    title: 'Open morning',
    body: 'Try every instrument, 10 am to 1 pm. Free, no booking.',
  },
  {
    week: 7,
    span: 3,
    row: 'up',
    kind: 'Break',
    date: 'Oct 19 to 23',
    title: 'Half term',
    body: 'No lessons. Holiday workshops for ages 7 to 12.',
  },
  {
    week: 9,
    span: 3,
    row: 'down',
    kind: 'Exams',
    date: 'Fri Nov 6',
    title: 'Exam entries close',
    body: 'Tell your teacher by today if you are sitting a grade.',
  },
  {
    week: 11,
    span: 3,
    row: 'up',
    kind: 'Recital',
    date: 'Sat Nov 21',
    title: 'Student recital',
    body: 'In our hall at 3 pm. Everyone who wants to play, plays.',
  },
  {
    week: 13,
    span: 2,
    row: 'down',
    kind: 'Exams',
    date: 'Dec 1 to 5',
    title: 'Practical exams',
    body: 'In our own rooms, with times sent three weeks ahead.',
  },
  {
    week: 14,
    span: 3,
    row: 'up',
    kind: 'Concert',
    date: 'Sat Dec 12',
    title: 'Winter concert',
    body: 'Ensembles and bands at Grange Hall, 6 pm. Tickets $8.',
  },
  {
    week: 15,
    span: 2,
    row: 'down',
    kind: 'Term',
    date: 'Fri Dec 18',
    title: 'Term ends',
    body: 'Last lessons. Spring term starts on Tuesday January 5.',
  },
];

const WEEKS = [
  'Sep 7',
  'Sep 14',
  'Sep 21',
  'Sep 28',
  'Oct 5',
  'Oct 12',
  'Oct 19',
  'Oct 26',
  'Nov 2',
  'Nov 9',
  'Nov 16',
  'Nov 23',
  'Nov 30',
  'Dec 7',
  'Dec 14',
  'Dec 21',
];

const YEAR = [
  ['Autumn', 'Sep 8 to Dec 18', '14 teaching weeks'],
  ['Spring', 'Jan 5 to Mar 26', '12 teaching weeks'],
  ['Summer', 'Apr 13 to Jun 25', '11 teaching weeks'],
];

type Rate = {
  minutes: string;
  lesson: string;
  term: string;
  suits: string;
};

const RATES: Rate[] = [
  {
    minutes: '30',
    lesson: '$34',
    term: '$384 a term of 12',
    suits: 'Beginners, and most players under nine.',
  },
  {
    minutes: '45',
    lesson: '$48',
    term: '$540 a term of 12',
    suits: 'Grades 3 to 5, and adults who like time to talk.',
  },
  {
    minutes: '60',
    lesson: '$62',
    term: '$696 a term of 12',
    suits: 'Grade 6 and up, and anyone preparing a recital.',
  },
];

const RATE_NOTES = [
  'Paying by the term saves one lesson in twelve.',
  'Brothers and sisters: 10% off the second and third.',
  'Instruments to hire from $15 a month.',
  'Bursaries for a third of our places. Ask, quietly.',
];

type GroupClass = {
  name: string;
  ages: string;
  when: string;
  price: string;
};

const CLASSES: GroupClass[] = [
  { name: 'Little Notes', ages: 'Ages 3 to 5, with a grown-up', when: 'Sat 9:30 am', price: '$140 a term' },
  { name: 'Music theory', ages: 'Ages 9 and up', when: 'Wed 5:00 pm', price: '$120 a term' },
  { name: 'Junior choir', ages: 'Ages 7 to 11', when: 'Thu 4:30 pm', price: '$95 a term' },
  { name: 'String orchestra', ages: 'Grade 2 and up', when: 'Fri 5:00 pm', price: '$110 a term' },
  { name: 'Rock school bands', ages: 'Ages 11 to 17', when: 'Sat 1:00 pm', price: '$160 a term' },
  { name: 'Adult beginners guitar', ages: 'Grown-ups, from scratch', when: 'Tue 7:00 pm', price: '$150 a term' },
];

const HOURS = [
  ['Monday to Friday', '2 pm to 9 pm'],
  ['Saturday', '9 am to 5 pm'],
  ['Sunday', 'Closed, except concerts'],
];

export default function CadenceMusicPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markName}>Cadence</span>
          <span className={s.markSub}>Music School</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#trial">Book a trial</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The promise on the left; on the right the rings, spreading from
            the middle of the plate like sound, and the violin on them. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Music lessons for all ages, Millbrook</p>
            <h1 className={s.heroTitle} id="hero-h">
              From the first note <em>to Grade 8,</em> and every week between.
            </h1>
            <p className={s.heroLede}>
              One-to-one lessons on six instruments, group classes from age
              three, and three concerts a year for anyone who wants to play in
              them. Nine teachers, fourteen rooms and one very patient grand
              piano on Foundry Row.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#trial">Book a $20 trial lesson</a>
              <a className={s.btnLine} href="#instruments">See the instruments</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([value, label]) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroPlate}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={concentricrings}
                palette={RINGS}
                fit="grid"
                cellSize={64}
                seed="cadence-rings"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Figure
              slug="cadence-music-violin-cutout"
              cutout
              priority
              alt="A violin standing upright, seen from the front, with its chin rest and four strings"
              className={s.violin}
            />
          </div>
        </section>

        {/* ----------------------------------------------------- INSTRUMENTS
            Six tiles on a hairline grid, the name as large as the tile
            allows. */}
        <section id="instruments" className={s.sec} aria-labelledby="instruments-h">
          <div className={s.secHead}>
            <span className={s.secNo}>01</span>
            <h2 id="instruments-h">Six instruments</h2>
            <p className={s.secNote}>
              Every lesson is one to one, every week of term, in a room with
              its own instrument. Prices are for a 30-minute lesson.
            </p>
          </div>
          <ul className={s.grid}>
            {INSTRUMENTS.map((inst) => (
              <li key={inst.no} className={s.tile}>
                <div className={s.tileTop}>
                  <span className={s.tileNo}>{inst.no}</span>
                  <span className={s.tileAges}>{inst.ages}</span>
                </div>
                <h3 className={s.tileName}>{inst.name}</h3>
                <p className={s.tileBody}>{inst.body}</p>
                <div className={s.tileFoot}>
                  <strong>{inst.from}</strong>
                  <span>{inst.teachers}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- TEACHERS */}
        <section id="teachers" className={s.sec} aria-labelledby="teachers-h">
          <div className={s.secHead}>
            <span className={s.secNo}>02</span>
            <h2 id="teachers-h">The teachers</h2>
            <p className={s.secNote}>
              All nine are working musicians with a degree or a diploma in
              teaching, and all are background checked every two years.
            </p>
          </div>
          <ul className={s.teachers}>
            {TEACHERS.map((t) => (
              <li key={t.name} className={s.teacher}>
                <span className={s.initials} aria-hidden="true">{t.initials}</span>
                <div className={s.teacherText}>
                  <h3>{t.name}</h3>
                  <p className={s.teaches}>{t.teaches}</p>
                  <p className={s.teacherNote}>{t.note}</p>
                  <p className={s.days}>{t.days}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ TERM
            The autumn term as a line of sixteen weeks: milestones and
            concerts above it, exams and deadlines below. On a phone it
            becomes a list running down the page. */}
        <section id="term" className={s.termSec} aria-labelledby="term-h">
          <div className={s.termInner}>
            <div className={s.secHead}>
              <span className={s.secNo}>03</span>
              <h2 id="term-h">Autumn term, 2026</h2>
              <p className={s.secNote}>
                Fourteen weeks of lessons, one recital, one concert and the
                exam season. No lessons on Thanksgiving Thursday and Friday.
              </p>
            </div>
            <div className={s.timeline}>
              <ol className={s.events}>
                <li className={s.track} aria-hidden="true">
                  <span className={s.breakHalf} />
                  <span className={s.breakWinter} />
                  {WEEKS.map((w) => (
                    <span key={w} className={s.tick}>{w}</span>
                  ))}
                </li>
                {TERM.map((e) => (
                  <li
                    key={e.title}
                    className={e.row === 'up' ? s.eventUp : s.eventDown}
                    style={{ gridColumn: `${e.week} / span ${e.span}` }}>
                    <span className={s.eventKind}>{e.kind}</span>
                    <time className={s.eventDate}>{e.date}</time>
                    <h3 className={s.eventTitle}>{e.title}</h3>
                    <p className={s.eventBody}>{e.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <dl className={s.year}>
              {YEAR.map(([term, dates, weeks]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd className={s.yearDates}>{dates}</dd>
                  <dd className={s.yearWeeks}>{weeks}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- RATES */}
        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.secHead}>
            <span className={s.secNo}>04</span>
            <h2 id="rates-h">Lesson rates</h2>
            <p className={s.secNote}>
              The same on every instrument and with every teacher. Pay by the
              lesson or by the term; either way, a lesson missed with a
              day's notice is made up.
            </p>
          </div>
          <ul className={s.rates}>
            {RATES.map((r) => (
              <li key={r.minutes} className={s.rate}>
                <p className={s.rateMin}>
                  <strong>{r.minutes}</strong>
                  <span>minutes</span>
                </p>
                <p className={s.ratePrice}>
                  <strong>{r.lesson}</strong>
                  <span>a lesson</span>
                </p>
                <p className={s.rateTerm}>{r.term}</p>
                <p className={s.rateSuits}>{r.suits}</p>
              </li>
            ))}
          </ul>
          <ul className={s.rateNotes}>
            {RATE_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.secHead}>
            <span className={s.secNo}>05</span>
            <h2 id="classes-h">Group classes</h2>
            <p className={s.secNote}>
              Small groups of six to twelve, once a week in term time. Open to
              anyone, whether or not you have lessons here.
            </p>
          </div>
          <table className={s.classes}>
            <caption className={s.srOnly}>Group classes, ages, times and prices per term</caption>
            <thead>
              <tr>
                <th scope="col">Class</th>
                <th scope="col">Who</th>
                <th scope="col">When</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {CLASSES.map((c) => (
                <tr key={c.name}>
                  <th scope="row" className={s.className}>{c.name}</th>
                  <td className={s.classAges}>{c.ages}</td>
                  <td className={s.classWhen}>{c.when}</td>
                  <td className={s.classPrice}>{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* A band of stripes, quiet as a row of piano keys, before the form. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={picket}
            palette={KEYS}
            fit="grid"
            cellSize={48}
            seed="cadence-keys"
            options={{ frequency: 0.4 }}
            redrawInterval={8000}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- TRIAL */}
        <section id="trial" className={s.trialSec} aria-labelledby="trial-h">
          <div className={s.trial}>
            <div className={s.trialIntro}>
              <span className={s.secNo}>06</span>
              <h2 id="trial-h">Book a trial lesson</h2>
              <p>
                Thirty minutes with the teacher you would have, for $20, taken
                off your first term if you stay. Bring nothing but the player:
                we have the instrument.
              </p>
              <ol className={s.trialSteps}>
                <li>
                  <strong>Send the form</strong>
                  <span>We reply within one working day with two or three times.</span>
                </li>
                <li>
                  <strong>Come and play</strong>
                  <span>Parents are welcome in the room for the under-tens.</span>
                </li>
                <li>
                  <strong>Decide at home</strong>
                  <span>No forms on the day. We hold the slot for a week.</span>
                </li>
              </ol>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="cm-name">Your name</label>
                <input id="cm-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="cm-student">Student's age</label>
                <input id="cm-student" name="age" type="number" min="3" max="99" />
              </div>
              <div className={s.field}>
                <label htmlFor="cm-instrument">Instrument</label>
                <select id="cm-instrument" name="instrument" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Piano</option>
                  <option>Violin</option>
                  <option>Guitar</option>
                  <option>Voice</option>
                  <option>Drums</option>
                  <option>Cello</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="cm-level">Playing so far</label>
                <select id="cm-level" name="level" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Never played</option>
                  <option>A year or two</option>
                  <option>Grade 3 or above</option>
                  <option>Coming back after a break</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="cm-email">Email</label>
                <input id="cm-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label htmlFor="cm-days">Best days</label>
                <select id="cm-days" name="days" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Weekdays after school</option>
                  <option>Weekday evenings</option>
                  <option>Saturday</option>
                  <option>Any time</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="cm-note">Anything else</label>
                <textarea id="cm-note" name="note" rows={3} placeholder="Music they love, a teacher you have heard about" />
              </div>
              <div className={s.formFoot}>
                <button className={s.btn} type="submit">Request a trial</button>
                <small>Or call the office on (555) 310-4477.</small>
              </div>
            </form>
          </div>
        </section>

        {/* --------------------------------------------------------- FIND US */}
        <section id="find-us" className={s.sec} aria-labelledby="find-h">
          <div className={s.secHead}>
            <span className={s.secNo}>07</span>
            <h2 id="find-h">Find us</h2>
            <p className={s.secNote}>
              The red brick building with the round window, between the
              library and the old foundry.
            </p>
          </div>
          <div className={s.find}>
            <address className={s.address}>
              <span className={s.addrName}>Cadence Music School</span>
              <span>22 Foundry Row</span>
              <span>Millbrook</span>
              <a href="tel:+15553104477">(555) 310-4477</a>
              <a href="mailto:hello@cadencemusic.example">hello@cadencemusic.example</a>
            </address>
            <div>
              <h3 className={s.findHead}>Office hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([day, time]) => (
                  <div key={day}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className={s.findHead}>Getting here</h3>
              <ul className={s.getting}>
                <li>Bus 4 and 11 stop outside the library, a minute away.</li>
                <li>Free parking behind the building after 5 pm and all Saturday.</li>
                <li>Step-free entrance on Mill Street, and a lift to every floor.</li>
                <li>A waiting room with wifi for parents, and a quiet corner for homework.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Cadence</p>
          <p className={s.footLine}>Music lessons for all ages, on Foundry Row since 2011.</p>
        </div>
        <div className={s.footGrid}>
          <ul className={s.footLinks}>
            <li><a href="#instruments">Instruments</a></li>
            <li><a href="#teachers">Teachers</a></li>
            <li><a href="#term">Term dates</a></li>
          </ul>
          <ul className={s.footLinks}>
            <li><a href="#rates">Lesson rates</a></li>
            <li><a href="#classes">Group classes</a></li>
            <li><a href="#trial">Trial lesson</a></li>
          </ul>
          <ul className={s.footLinks}>
            <li><a href="tel:+15553104477">(555) 310-4477</a></li>
            <li><a href="mailto:hello@cadencemusic.example">hello@cadencemusic.example</a></li>
            <li><a href="#find-us">22 Foundry Row, Millbrook</a></li>
          </ul>
        </div>
        <div className={s.footFine}>
          <p>A fictional music school. Teachers, prices and dates are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
