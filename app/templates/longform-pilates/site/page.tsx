import { TabbiedPattern } from 'tabbied/react';
import { shading } from 'tabbied/patterns';
import s from './longform-pilates.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Longform Pilates: Reformer Pilates studio, Eastmoor',
  description:
    'Longform is a reformer Pilates studio with eight machines on Kiln Street. The week of classes on one line, what the three levels mean, the introductory offer, prices and the four instructors.',
};

/* Site colors. The soft fields are shade falling across oat and clay on
   the stone of the walls, the way the light comes through the studio's
   long east window. */
const STONE = '#ebe6de';
const ESPRESSO = '#2a2521';
const OAT = '#d8cab3';
const CLAY = '#8c6450';

const WINDOW = [STONE, OAT, CLAY, STONE, OAT];
const LIGHT = [STONE, OAT, STONE, CLAY, OAT];
const FLOOR = [OAT, STONE, CLAY, OAT, STONE, ESPRESSO];
const MAT = [OAT, STONE, CLAY, OAT];

const NAV = [
  ['The week', '#week'],
  ['Levels', '#levels'],
  ['New here', '#intro'],
  ['Prices', '#prices'],
  ['Instructors', '#instructors'],
  ['The studio', '#studio'],
];

const FACTS = [
  ['8', 'reformers, never more'],
  ['50', 'minutes a class'],
  ['6:30', 'the first class, weekdays'],
];

/* The timeline runs from 6 am to 9 pm; start is in hours from midnight. */
const HOURS_AXIS = ['6 am', '8', '10', '12 pm', '2', '4', '6', '8 pm'];

type Class = {
  time: string;
  start: number;
  length: number;
  name: string;
  level: 1 | 2 | 3;
};

type Day = {
  day: string;
  short: string;
  classes: Class[];
};

const WEEK: Day[] = [
  {
    day: 'Monday',
    short: 'Mon',
    classes: [
      { time: '6:30', start: 6.5, length: 50, name: 'Flow', level: 2 },
      { time: '7:45', start: 7.75, length: 50, name: 'Foundations', level: 1 },
      { time: '9:30', start: 9.5, length: 60, name: 'Slow', level: 1 },
      { time: '12:15', start: 12.25, length: 45, name: 'Strength', level: 2 },
      { time: '5:30', start: 17.5, length: 50, name: 'Foundations', level: 1 },
      { time: '6:45', start: 18.75, length: 50, name: 'Advanced', level: 3 },
    ],
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    classes: [
      { time: '6:30', start: 6.5, length: 45, name: 'Jumpboard', level: 2 },
      { time: '9:30', start: 9.5, length: 50, name: 'Pre and postnatal', level: 1 },
      { time: '12:15', start: 12.25, length: 45, name: 'Flow', level: 2 },
      { time: '5:30', start: 17.5, length: 50, name: 'Strength', level: 2 },
      { time: '6:45', start: 18.75, length: 50, name: 'Foundations', level: 1 },
      { time: '8:00', start: 20, length: 50, name: 'Slow', level: 1 },
    ],
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    classes: [
      { time: '6:30', start: 6.5, length: 50, name: 'Advanced', level: 3 },
      { time: '7:45', start: 7.75, length: 50, name: 'Flow', level: 2 },
      { time: '9:30', start: 9.5, length: 50, name: 'Foundations', level: 1 },
      { time: '12:15', start: 12.25, length: 45, name: 'Jumpboard', level: 2 },
      { time: '5:30', start: 17.5, length: 50, name: 'Flow', level: 2 },
      { time: '6:45', start: 18.75, length: 50, name: 'Strength', level: 2 },
    ],
  },
  {
    day: 'Thursday',
    short: 'Thu',
    classes: [
      { time: '6:30', start: 6.5, length: 50, name: 'Strength', level: 2 },
      { time: '9:30', start: 9.5, length: 50, name: 'Pre and postnatal', level: 1 },
      { time: '12:15', start: 12.25, length: 45, name: 'Foundations', level: 1 },
      { time: '5:30', start: 17.5, length: 45, name: 'Jumpboard', level: 2 },
      { time: '6:45', start: 18.75, length: 50, name: 'Advanced', level: 3 },
      { time: '8:00', start: 20, length: 50, name: 'Slow', level: 1 },
    ],
  },
  {
    day: 'Friday',
    short: 'Fri',
    classes: [
      { time: '6:30', start: 6.5, length: 50, name: 'Flow', level: 2 },
      { time: '7:45', start: 7.75, length: 50, name: 'Foundations', level: 1 },
      { time: '9:30', start: 9.5, length: 50, name: 'Strength', level: 2 },
      { time: '12:15', start: 12.25, length: 60, name: 'Slow', level: 1 },
      { time: '5:30', start: 17.5, length: 50, name: 'Advanced', level: 3 },
    ],
  },
  {
    day: 'Saturday',
    short: 'Sat',
    classes: [
      { time: '8:00', start: 8, length: 50, name: 'Foundations', level: 1 },
      { time: '9:15', start: 9.25, length: 50, name: 'Flow', level: 2 },
      { time: '10:30', start: 10.5, length: 45, name: 'Jumpboard', level: 2 },
      { time: '11:45', start: 11.75, length: 60, name: 'Slow', level: 1 },
    ],
  },
  {
    day: 'Sunday',
    short: 'Sun',
    classes: [
      { time: '9:00', start: 9, length: 60, name: 'Slow', level: 1 },
      { time: '10:15', start: 10.25, length: 50, name: 'Foundations', level: 1 },
      { time: '11:30', start: 11.5, length: 50, name: 'Flow', level: 2 },
      { time: '5:00', start: 17, length: 60, name: 'Slow', level: 1 },
    ],
  },
];

const LEVELS = [
  {
    level: 'Level 1',
    name: 'Foundations, Slow, Pre and postnatal',
    body: 'The springs, the straps and the footwork, taught slowly enough to learn them. Start here even if you run marathons; the machine is its own skill.',
    ready: 'You can set your own springs and footbar, and you know what neutral spine feels like.',
  },
  {
    level: 'Level 2',
    name: 'Flow, Strength, Jumpboard',
    body: 'Longer sequences with fewer stops. More kneeling and standing work, heavier springs, and the jumpboard on its own days.',
    ready: 'You can move between exercises without the instructor at your machine, and hold side kneeling work.',
  },
  {
    level: 'Level 3',
    name: 'Advanced',
    body: 'Long spine, short box, balance on the carriage. Taught to people who have been coming for a year or so, and who would rather be told than praised.',
    ready: 'An instructor has asked you to come. Ask any of us if you are wondering.',
  },
];

const PRICES = [
  ['Single class', '$38', 'Valid for a month'],
  ['Five classes', '$175', 'Valid for two months'],
  ['Ten classes', '$330', 'Valid for four months'],
  ['Unlimited', '$260', 'A month, twelve months minimum'],
  ['Private, one to one', '$110', 'Fifty-five minutes, any level'],
  ['Duet, two of you', '$140', 'Fifty-five minutes, together'],
];

type Teacher = {
  initials: string;
  name: string;
  trained: string;
  teaches: string;
  note: string;
};

const TEACHERS: Teacher[] = [
  { initials: 'IM', name: 'Ines Marsh', trained: 'Owner. Comprehensive, 2012', teaches: 'Advanced, Flow', note: 'Danced for eleven years and came to the reformer after a hip. Opened Longform in 2019 with four machines.' },
  { initials: 'TO', name: 'Tobias Oyelaran', trained: 'BASI Comprehensive, 2016', teaches: 'Strength, Jumpboard', note: 'Former rower. Teaches the early mornings and counts every rep out loud whether you like it or not.' },
  { initials: 'CL', name: 'Clara Lindqvist', trained: 'STOTT Reformer, 2018', teaches: 'Foundations, Pre and postnatal', note: 'Physiotherapy assistant by day. The person to see if you are coming back from an injury or a baby.' },
  { initials: 'RA', name: 'Rafael Amaro', trained: 'Polestar, 2021', teaches: 'Slow, Foundations', note: 'Teaches the Slow classes with the lights low. Most of his regulars came for one and stayed.' },
];

const STUDIO = [
  ['Arrive ten minutes early', 'The first class of the day starts on the minute, and the door locks five minutes in.'],
  ['Grip socks, always', 'Bring your own, or buy a pair at the desk for $14. No shoes past the bench.'],
  ['Cancel twelve hours ahead', 'Late cancellations and no-shows use the class. On unlimited, a $15 fee.'],
  ['Showers, lockers, towels', 'Two showers, a hair dryer, and lockers with your own padlock.'],
];

const QUESTIONS = [
  ['I have never done Pilates. Can I start on the reformer?', 'Yes, that is what the introductory offer is for. Your set-up session covers the machine before your first Foundations class.'],
  ['Is it suitable in pregnancy?', 'Tuesday and Thursday Pre and postnatal classes are, from twelve weeks, with your midwife or doctor\'s go-ahead. Clara teaches both.'],
  ['What if I have a bad back?', 'Tell us when you book. Many people come to us for exactly that, but start with a private so we can see how you move.'],
  ['Can I book for a friend?', 'On a class pack, yes: book two places and give us their name at the desk.'],
];

export default function LongformPilatesPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stone': '#ebe6de',
        '--espresso': '#2a2521',
        '--oat': '#d8cab3',
        '--clay': '#8c6450',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stone,espresso,oat,clay"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Instrument+Serif:ital@0;1&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Longform</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#intro">Book</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The words set very large and very light; beside them a tall
            capsule of soft shade, the shape of a reformer's strap loop. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Reformer Pilates, 210 Kiln Street, Eastmoor</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>
              Long, slow and <em>strong.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Eight reformers in a long white room on the third floor. Classes
              of fifty minutes, never more than eight people, taught by four
              instructors who will learn your name and your left hip.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#intro">Three classes, $75</a>
              <a data-edit="hero.link" data-edit-max="28" className={s.link} href="#week">See the week</a>
            </div>
          </div>
          <div data-edit-pattern="hero.field" data-edit-roles="0,2,3,0,2" className={s.capsule} aria-hidden="true">
            <TabbiedPattern
              pattern={shading}
              palette={WINDOW}
              fit="grid"
              cellSize={72}
              seed="longform-window"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        <dl className={s.facts}>
          {FACTS.map(([n, what], i) => (
            <div key={what}>
              <dt data-edit={`top.term.${i}`} data-edit-max="28">{n}</dt>
              <dd data-edit={`top.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
            </div>
          ))}
        </dl>

        {/* ------------------------------------------------------- THE WEEK
            One line per day, 6 am on the left, 9 pm on the right, each class
            laid on it where it starts and as long as it lasts. */}
        <section id="week" className={s.section} aria-labelledby="week-h">
          <div className={s.weekHead}>
            <div className={s.head}>
              <p data-edit="week.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The week</p>
              <h2 data-edit="week.title" data-edit-max="60" id="week-h">Monday to Sunday, on one line</h2>
              <ul className={s.legend}>
                <li data-edit="week.l1" data-edit-max="80" className={s.l1}>Level 1</li>
                <li data-edit="week.l2" data-edit-max="80" className={s.l2}>Level 2</li>
                <li data-edit="week.l3" data-edit-max="80" className={s.l3}>Level 3</li>
              </ul>
            </div>
            <figure className={s.machine}>
              <Artwork
                slug="longform-pilates-reformer"
                alt="A Pilates reformer in side view: the frame, the padded carriage, the foot bar and the straps"
                inks={['var(--text)', 'var(--clay)']}
                mode="duotone"
                className={s.reformer}
              />
              <div data-edit-pattern="week.field" data-edit-roles="2,0,3,2" className={s.mat} aria-hidden="true">
                <TabbiedPattern
                  pattern={shading}
                  palette={MAT}
                  fit="grid"
                  cellSize={24}
                  seed="longform-mat"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="week.caption" data-edit-max="120" data-edit-multiline>One of the eight, set four feet apart and facing the long east window.</figcaption>
            </figure>
          </div>

          <div className={s.timeline}>
            <ol className={s.axis} aria-hidden="true">
              {HOURS_AXIS.map((h, i) => (
                <li data-edit={`week.item.${i}`} data-edit-max="80" key={`${h}-${i}`}>{h}</li>
              ))}
            </ol>
            {WEEK.map((d, i) => (
              <div className={s.day} key={d.day}>
                <h3 data-edit={`week.dayName.${i}`} data-edit-max="40" className={s.dayName}>{d.day}</h3>
                <ol className={s.track}>
                  {d.classes.map((c, i2) => (
                    <li
                      key={`${d.short}-${c.time}`}
                      className={s[`l${c.level}`]}
                      style={{ '--start': c.start, '--length': c.length } as React.CSSProperties}
                    >
                      <span data-edit={`week.classTime.${i}.${i2}`} data-edit-max="60" className={s.classTime}>{c.time}</span>
                      <span data-edit={`week.className.${i}.${i2}`} data-edit-max="60" className={s.className}>{c.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p data-edit="week.note" data-edit-max="240" data-edit-multiline className={s.note}>
            Times from 5 pm are evening classes. Book up to fourteen days ahead;
            a waitlist opens when a class is full and moves by text.
          </p>
        </section>

        {/* ---------------------------------------------------------- LEVELS */}
        <section id="levels" className={s.section} aria-labelledby="levels-h">
          <div className={s.head}>
            <p data-edit="levels.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Levels</p>
            <h2 data-edit="levels.title" data-edit-max="60" id="levels-h">Three levels, and how to know you are ready</h2>
          </div>
          <ol className={s.levels}>
            {LEVELS.map((l, i) => (
              <li key={l.level} className={s[`l${i + 1}`]}>
                <p data-edit={`levels.levelNo.${i}`} data-edit-max="240" data-edit-multiline className={s.levelNo}>{l.level}</p>
                <h3 data-edit={`levels.title2.${i}`} data-edit-max="40">{l.name}</h3>
                <p data-edit={`levels.levelBody.${i}`} data-edit-max="240" data-edit-multiline className={s.levelBody}>{l.body}</p>
                <p data-edit={`levels.ready.${i}`} data-edit-max="240" data-edit-multiline className={s.ready}>{l.ready}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- INTRO
            The offer on a stone card, over a wide field of window light. */}
        <section id="intro" className={s.intro} aria-labelledby="intro-h">
          <div data-edit-pattern="intro.field" data-edit-roles="0,2,0,3,2" className={s.introField} aria-hidden="true">
            <TabbiedPattern
              pattern={shading}
              palette={LIGHT}
              fit="grid"
              cellSize={96}
              seed="longform-light"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.introCard}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>New here</p>
            <h2 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="60" id="intro-h">Three classes in fourteen days, <em>$75.</em></h2>
            <p data-edit="intro.introBody" data-edit-max="240" data-edit-multiline className={s.introBody}>
              It starts with twenty minutes on your own with an instructor,
              learning the springs and the straps, then two Foundations
              classes. After that you will know which level to book.
            </p>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="intro.label" htmlFor="lf-name">Name</label>
                <input id="lf-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="intro.label2" htmlFor="lf-email">Email</label>
                <input id="lf-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="intro.label3" htmlFor="lf-when">Best time for you</label>
                <select id="lf-when" name="when" defaultValue="morning">
                  <option value="early">Before 8 am</option>
                  <option value="morning">Weekday mornings</option>
                  <option value="lunch">Lunchtime</option>
                  <option value="evening">Evenings</option>
                  <option value="weekend">Weekends</option>
                </select>
              </div>
              <button data-edit="intro.button" data-edit-max="24" className={s.button} type="submit">Start with the set-up</button>
            </form>
            <p data-edit="intro.small" data-edit-max="240" data-edit-multiline className={s.small}>Once per person. We reply within a day with times for your set-up.</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.section} aria-labelledby="prices-h">
          <div className={s.head}>
            <p data-edit="prices.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Prices</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">Packs, a monthly, and privates</h2>
          </div>
          <ul className={s.prices}>
            {PRICES.map(([name, price, note], i) => (
              <li key={name}>
                <p data-edit={`prices.priceName.${i}`} data-edit-max="240" data-edit-multiline className={s.priceName}>{name}</p>
                <p data-edit={`prices.priceNote.${i}`} data-edit-max="240" data-edit-multiline className={s.priceNote}>{note}</p>
                <p data-edit={`prices.priceFigure.${i}`} data-edit-max="240" data-edit-multiline className={s.priceFigure}>{price}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- INSTRUCTORS */}
        <section id="instructors" className={s.section} aria-labelledby="team-h">
          <div className={s.head}>
            <p data-edit="instructors.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Instructors</p>
            <h2 data-edit="instructors.title" data-edit-max="60" id="team-h">Four instructors, all fully certified</h2>
          </div>
          <ul className={s.team}>
            {TEACHERS.map((t, i) => (
              <li key={t.name}>
                <span className={s.initials} aria-hidden="true">{t.initials}</span>
                <h3 data-edit={`instructors.title2.${i}`} data-edit-max="40">{t.name}</h3>
                <p data-edit={`instructors.trained.${i}`} data-edit-max="240" data-edit-multiline className={s.trained}>{t.trained}</p>
                <p data-edit={`instructors.teaches.${i}`} data-edit-max="240" data-edit-multiline className={s.teaches}>{t.teaches}</p>
                <p data-edit={`instructors.teacherNote.${i}`} data-edit-max="240" data-edit-multiline className={s.teacherNote}>{t.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- STUDIO */}
        <section id="studio" className={`${s.section} ${s.studio}`} aria-labelledby="studio-h">
          <div className={s.studioInfo}>
            <p data-edit="studio.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The studio</p>
            <h2 data-edit="studio.title" data-edit-max="60" id="studio-h">Third floor, 210 Kiln Street</h2>
            <p data-edit="studio.studioAddress" data-edit-max="240" data-edit-multiline className={s.studioAddress}>
              Eastmoor, above the frame shop. Lift from the courtyard entrance.
              Bike racks in the courtyard; the 14 bus stops at Kiln and Vale.
            </p>
            <p className={s.contact}>
              <a data-edit="studio.link" data-edit-max="28" href="tel:+15550157730">(555) 015-7730</a>
            </p>
            <p className={s.contact}>
              <a data-edit="studio.link2" data-edit-max="28" href="mailto:desk@longformpilates.example">desk@longformpilates.example</a>
            </p>
            <p data-edit="studio.small" data-edit-max="240" data-edit-multiline className={s.small}>The desk is staffed from 6 am to 8 pm on weekdays, 7:30 to 1 on weekends.</p>
          </div>
          <div className={s.studioRules}>
            <dl className={s.rules}>
              {STUDIO.map(([t, d], i) => (
                <div key={t}>
                  <dt data-edit={`studio.term.${i}`} data-edit-max="28">{t}</dt>
                  <dd data-edit={`studio.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
                </div>
              ))}
            </dl>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a], i) => (
                <details key={q}>
                  <summary data-edit={`studio.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`studio.body2.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="2,0,3,2,0,1" className={s.floor} aria-hidden="true">
          <TabbiedPattern
            pattern={shading}
            palette={FLOOR}
            fit="grid"
            cellSize={64}
            seed="longform-floor"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Longform Pilates</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional reformer Pilates studio. The classes, instructors and prices are invented; the reformer is a generated image drawn in the page's colors.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
