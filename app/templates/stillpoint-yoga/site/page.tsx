import { TabbiedPattern } from 'tabbied/react';
import { gyre, spiralrosette } from 'tabbied/patterns';
import s from './stillpoint-yoga.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Stillpoint Yoga: Yoga studio, Alder Street',
  description:
    'Stillpoint is a small yoga studio above the bike shop on Alder Street: twenty-four classes a week, fourteen mats a class, and two weeks unlimited for new students.',
};

/* Site colors. Both fields draw on `transparent`, so the rings and the
   dashes sit in the page's own clay-white ground. */
const SAGE = '#7C8C6E';
const STONE = '#A39C92';
const PALE = '#E6E0D5';
const CLAY = '#C0795A';

const ROSETTE = ['transparent', SAGE, CLAY, STONE];
const DRIFT = ['transparent', STONE, SAGE, PALE];

const NAV = [
  ['Timetable', '#timetable'],
  ['Classes', '#classes'],
  ['Teachers', '#teachers'],
  ['Prices', '#prices'],
  ['Etiquette', '#etiquette'],
  ['Visit', '#visit'],
];

/* The timetable. `band` is the row a class sits in on the desktop grid
   (1 early, 2 morning, 3 midday, 4 evening, 5 late), so a class lines up
   with the others at roughly the same hour. */
type Level = 'gentle' | 'steady' | 'strong';

type Session = {
  time: string;
  name: string;
  teacher: string;
  level: Level;
  band: 1 | 2 | 3 | 4 | 5;
};

const LEVEL_WORD: Record<Level, string> = {
  gentle: 'Gentle',
  steady: 'Steady',
  strong: 'Strong',
};

const BANDS = [
  ['Early', '6:45-8:00 am'],
  ['Morning', '9:30-11:30 am'],
  ['Midday', '12:15-1:00 pm'],
  ['Evening', '5:30-6:45 pm'],
  ['Late', '7:15-8:30 pm'],
];

const WEEK: { day: string; sessions: Session[] }[] = [
  {
    day: 'Monday',
    sessions: [
      { time: '7:00 am', name: 'Morning Flow', teacher: 'Ana', level: 'steady', band: 1 },
      { time: '12:15 pm', name: 'Lunchtime Stretch', teacher: 'Tom', level: 'gentle', band: 3 },
      { time: '5:45 pm', name: 'Vinyasa', teacher: 'Ana', level: 'strong', band: 4 },
      { time: '7:30 pm', name: 'Yin', teacher: 'Priya', level: 'gentle', band: 5 },
    ],
  },
  {
    day: 'Tuesday',
    sessions: [
      { time: '6:45 am', name: 'Strong Flow', teacher: 'Jonah', level: 'strong', band: 1 },
      { time: '9:30 am', name: 'Gentle Hatha', teacher: 'Maeve', level: 'gentle', band: 2 },
      { time: '5:45 pm', name: 'Hatha Foundations', teacher: 'Tom', level: 'steady', band: 4 },
      { time: '7:30 pm', name: 'Restorative', teacher: 'Maeve', level: 'gentle', band: 5 },
    ],
  },
  {
    day: 'Wednesday',
    sessions: [
      { time: '7:00 am', name: 'Morning Flow', teacher: 'Priya', level: 'steady', band: 1 },
      { time: '12:15 pm', name: 'Core and Balance', teacher: 'Jonah', level: 'strong', band: 3 },
      { time: '5:45 pm', name: 'Vinyasa', teacher: 'Ana', level: 'strong', band: 4 },
      { time: '7:30 pm', name: 'Yin', teacher: 'Tom', level: 'gentle', band: 5 },
    ],
  },
  {
    day: 'Thursday',
    sessions: [
      { time: '9:30 am', name: 'Pregnancy Yoga', teacher: 'Maeve', level: 'gentle', band: 2 },
      { time: '12:15 pm', name: 'Lunchtime Stretch', teacher: 'Priya', level: 'gentle', band: 3 },
      { time: '5:45 pm', name: 'Strong Flow', teacher: 'Jonah', level: 'strong', band: 4 },
      { time: '7:30 pm', name: 'Breath and Stillness', teacher: 'Priya', level: 'gentle', band: 5 },
    ],
  },
  {
    day: 'Friday',
    sessions: [
      { time: '7:00 am', name: 'Morning Flow', teacher: 'Ana', level: 'steady', band: 1 },
      { time: '12:15 pm', name: 'Core and Balance', teacher: 'Jonah', level: 'strong', band: 3 },
      { time: '5:30 pm', name: 'Slow Flow', teacher: 'Tom', level: 'steady', band: 4 },
    ],
  },
  {
    day: 'Saturday',
    sessions: [
      { time: '9:30 am', name: 'Vinyasa', teacher: 'Ana', level: 'strong', band: 2 },
      { time: '11:30 am', name: 'Beginners Course', teacher: 'Tom', level: 'steady', band: 3 },
    ],
  },
  {
    day: 'Sunday',
    sessions: [
      { time: '10:00 am', name: 'Slow Flow', teacher: 'Priya', level: 'steady', band: 2 },
      { time: '12:15 pm', name: 'Family Yoga', teacher: 'Maeve', level: 'gentle', band: 3 },
      { time: '5:30 pm', name: 'Yin and Sound', teacher: 'Maeve', level: 'gentle', band: 4 },
    ],
  },
];

const LEGEND: { level: Level; note: string }[] = [
  { level: 'gentle', note: 'Slow, mostly on the floor. Nobody sweats.' },
  { level: 'steady', note: 'Some flow, some holds. Any fit adult.' },
  { level: 'strong', note: 'Fast and warm. Know your sun salutes.' },
];

const CLASSES = [
  {
    name: 'Morning Flow',
    level: 'Steady',
    length: '60 min',
    body: 'A clear, unhurried flow to wake the spine and the hips before work. The same shape every week, so you can stop thinking and move.',
  },
  {
    name: 'Vinyasa',
    level: 'Strong',
    length: '75 min',
    body: 'Breath-led sequences that build to one peak pose and come down again. Warm room, quick transitions, a long rest at the end.',
  },
  {
    name: 'Strong Flow',
    level: 'Strong',
    length: '60 min',
    body: 'Vinyasa with more holding: lunges, arm balances and a lot of core. For people who came to yoga from running or lifting.',
  },
  {
    name: 'Hatha Foundations',
    level: 'Steady',
    length: '60 min',
    body: 'Standing poses taken apart and put back together, with blocks and straps. The best class in the week for fixing habits.',
  },
  {
    name: 'Slow Flow',
    level: 'Steady',
    length: '60 min',
    body: 'Half the speed of Vinyasa and twice the attention. A good first class if you have done a little yoga somewhere else.',
  },
  {
    name: 'Yin',
    level: 'Gentle',
    length: '75 min',
    body: 'Long, quiet holds on the floor, three to five minutes each, for the joints and the connective tissue. Bring socks.',
  },
  {
    name: 'Restorative',
    level: 'Gentle',
    length: '75 min',
    body: 'Five or six poses, fully supported by bolsters and blankets. You will not stretch much. You will probably fall asleep.',
  },
  {
    name: 'Pregnancy Yoga',
    level: 'Gentle',
    length: '60 min',
    body: 'From 14 weeks until you would rather not. Taught by a midwife, capped at ten, with time for questions over tea afterward.',
  },
  {
    name: 'Breath and Stillness',
    level: 'Gentle',
    length: '45 min',
    body: 'Twenty minutes of breathing practice and twenty of sitting. No poses beyond getting comfortable. Chairs are fine.',
  },
];

const TEACHERS = [
  {
    name: 'Ana Ruiz',
    role: 'Founder, Vinyasa and Morning Flow',
    since: 'Teaching since 2011',
    body: 'Opened Stillpoint in 2017 after six years of teaching in gyms. Believes a class should end five minutes early, not five late.',
  },
  {
    name: 'Priya Nair',
    role: 'Yin, Slow Flow, Breath and Stillness',
    since: 'Teaching since 2015',
    body: 'Trained as a physical therapist first. Her Yin classes are the quietest hour on Alder Street, including the library.',
  },
  {
    name: 'Jonah Weiss',
    role: 'Strong Flow, Core and Balance',
    since: 'Teaching since 2016',
    body: 'A former rower who found yoga through a bad back. Cues in plain English and counts every breath out loud.',
  },
  {
    name: 'Maeve Doyle',
    role: 'Pregnancy, Restorative, Family Yoga',
    since: 'Teaching since 2009',
    body: 'Midwife by day. Runs the pregnancy class and the Sunday family hour, which ends in a loud and happy savasana.',
  },
  {
    name: 'Tom Bakker',
    role: 'Hatha Foundations, Beginners Course',
    since: 'Teaching since 2019',
    body: 'Teaches the four-week Beginners Course and most of the people in the evening classes started with him.',
  },
];

const PRICES = [
  ['Drop-in class', 'Any class on the timetable', '$22'],
  ['Ten classes', 'Shareable with one other person, 4 months to use', '$185'],
  ['Monthly unlimited', 'Rolling, cancel with 30 days notice', '$135'],
  ['Annual unlimited', 'Paid once, two months free', '$1,350'],
  ['Beginners Course', 'Four Saturdays, then a week unlimited', '$90'],
  ['Private session', 'One hour, at the studio or online', '$95'],
];

const RULES = [
  ['Arrive ten minutes early', 'The door closes when the class begins, and we do not open it again. It is kinder to the people already lying down.'],
  ['Shoes stay on the rack', 'Past the bench by the door, bare feet only. Socks are fine for Yin and Restorative.'],
  ['Phones stay in the lockers', 'Lockers are free and take a padlock or a code. Doctors on call can tell the teacher and keep one face down.'],
  ['Mats are provided', 'Ours are cleaned after every class. Bring your own if you prefer; there is a shelf to leave it on.'],
  ['Cancel twelve hours ahead', 'Later than that, or not at all, and the class is used. Two missed classes a month on unlimited pauses booking for a week.'],
  ['Tell the teacher', 'About an injury, a pregnancy, a hard day. Quietly, before the class. Every pose has a version for you.'],
];

const HOURS = [
  ['Monday-Thursday', '6:30 am-9:00 pm'],
  ['Friday', '6:30 am-7:00 pm'],
  ['Saturday', '9:00 am-1:00 pm'],
  ['Sunday', '9:30 am-7:00 pm'],
];

const COUNT = WEEK.reduce((n, d) => n + d.sessions.length, 0);

export default function StillpointYogaPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f1ea',
        '--ink': '#2a2a26',
        '--sage': '#7c8c6e',
        '--stone': '#a39c92',
        '--pale': '#e6e0d5',
        '--clay': '#c0795a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,sage,stone,pale,clay"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..500&family=Outfit:wght@300..600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Stillpoint</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#prices">Two weeks for $40</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Short on purpose: one sentence, three facts, and the rosette. The
            timetable is what people come for, so it starts in the first
            screen. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Yoga studio, 48 Alder Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              A quiet room, a full week,
              <br />
              <em>and a mat kept for you.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Twenty-four classes from early morning to late evening, from
              floor-bound Yin to a sweaty Strong Flow. Fourteen mats a class,
              so the teacher knows your name by the second week.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#timetable">See this week</a>
              <a data-edit="hero.btnQuiet" data-edit-max="28" className={s.btnQuiet} href="#prices">New here? Two weeks for $40</a>
            </div>
          </div>
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,5,3" className={s.heroPlate} aria-hidden="true">
            <TabbiedPattern
              pattern={spiralrosette}
              palette={ROSETTE}
              fit="grid"
              cellSize={48}
              seed="stillpoint"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- TIMETABLE
            The centerpiece. On a wide screen the week is a grid: seven day
            columns on a shared set of time bands, so the 7 am classes line
            up. Below 1000px each day becomes its own short list. */}
        <section id="timetable" className={s.timetable} aria-labelledby="timetable-h">
          <div className={s.ttHead}>
            <div>
              <p data-edit="timetable.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>This week</p>
              <h2 data-edit="timetable.title" data-edit-max="60" id="timetable-h">The timetable</h2>
            </div>
            <p data-edit="timetable.ttNote" data-edit-max="240" data-edit-multiline className={s.ttNote}>
              Book in the Stillpoint app or at the desk. Classes open for
              booking seven days ahead and most evening classes fill by the
              afternoon before.
            </p>
          </div>

          <ul className={s.legend} aria-label="Intensity">
            {LEGEND.map((l, i) => (
              <li key={l.level} className={s[l.level]}>
                <span className={s.swatch} aria-hidden="true" />
                <strong data-edit={`timetable.emphasis.${i}`}>{LEVEL_WORD[l.level]}</strong>
                <span data-edit={`timetable.text.${i}`} data-edit-max="60">{l.note}</span>
              </li>
            ))}
          </ul>

          <div className={s.grid}>
            <ol className={s.bands} aria-hidden="true">
              {BANDS.map(([band, span], i) => (
                <li key={band}>
                  <span data-edit={`timetable.bandName.${i}`} data-edit-max="60" className={s.bandName}>{band}</span>
                  <span data-edit={`timetable.bandSpan.${i}`} data-edit-max="60" className={s.bandSpan}>{span}</span>
                </li>
              ))}
            </ol>
            <ol className={s.week}>
              {WEEK.map((d, i) => (
                <li key={d.day} className={s.day}>
                  <h3 data-edit={`timetable.dayName.${i}`} data-edit-max="40" className={s.dayName}>{d.day}</h3>
                  <ul className={s.sessions}>
                    {d.sessions.map((c, i2) => (
                      <li
                        key={c.time + c.name}
                        className={`${s.session} ${s[c.level]} ${s[`band${c.band}`]}`}>
                        <time data-edit={`timetable.sTime.${i}.${i2}`} className={s.sTime}>{c.time}</time>
                        <span data-edit={`timetable.sName.${i}.${i2}`} data-edit-max="60" className={s.sName}>{c.name}</span>
                        <span data-edit={`timetable.sWho.${i}.${i2}`} data-edit-max="60" className={s.sWho}>{c.teacher}</span>
                        <span data-edit={`timetable.sLevel.${i}.${i2}`} data-edit-max="60" className={s.sLevel}>{LEVEL_WORD[c.level]}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <dl className={s.ttFacts}>
            <div>
              <dt data-edit="timetable.term" data-edit-max="28">{COUNT}</dt>
              <dd data-edit="timetable.body" data-edit-max="200" data-edit-multiline>Classes a week</dd>
            </div>
            <div>
              <dt data-edit="timetable.term2" data-edit-max="28">14</dt>
              <dd data-edit="timetable.body2" data-edit-max="200" data-edit-multiline>Mats a class</dd>
            </div>
            <div>
              <dt data-edit="timetable.term3" data-edit-max="28">60</dt>
              <dd data-edit="timetable.body3" data-edit-max="200" data-edit-multiline>Minutes, most classes</dd>
            </div>
            <div>
              <dt data-edit="timetable.term4" data-edit-max="28">12 h</dt>
              <dd data-edit="timetable.body4" data-edit-max="200" data-edit-multiline>To cancel for free</dd>
            </div>
          </dl>
        </section>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.secHead}>
            <p data-edit="classes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="classes.title" data-edit-max="60" id="classes-h">The classes</h2>
            <p data-edit="classes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Nine kinds, three intensities. If you are not sure, start with
              Slow Flow or the Beginners Course and ask the teacher afterward.
            </p>
          </div>
          <ul className={s.classes}>
            {CLASSES.map((c, i) => (
              <li key={c.name} className={s.classItem}>
                <div className={s.classTop}>
                  <h3 data-edit={`classes.title2.${i}`} data-edit-max="40">{c.name}</h3>
                  <span data-edit={`classes.classMeta.${i}`} data-edit-max="60" className={s.classMeta}>{c.length}</span>
                </div>
                <span data-edit={`classes.classLevel.${i}`} data-edit-max="60" className={s.classLevel}>{c.level}</span>
                <p data-edit={`classes.body.${i}`} data-edit-max="240" data-edit-multiline>{c.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- TEACHERS */}
        <section id="teachers" className={s.sec} aria-labelledby="teachers-h">
          <div className={s.secHead}>
            <p data-edit="teachers.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
            <h2 data-edit="teachers.title" data-edit-max="60" id="teachers-h">The teachers</h2>
            <p data-edit="teachers.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Five of us, all trained to at least 500 hours, all insured, and
              all still taking classes from each other every week.
            </p>
          </div>
          <ul className={s.teachers}>
            {TEACHERS.map((t, i) => (
              <li key={t.name} className={s.teacher}>
                <h3 data-edit={`teachers.title2.${i}`} data-edit-max="40">{t.name}</h3>
                <p data-edit={`teachers.teacherRole.${i}`} data-edit-max="240" data-edit-multiline className={s.teacherRole}>{t.role}</p>
                <p data-edit={`teachers.teacherBody.${i}`} data-edit-max="240" data-edit-multiline className={s.teacherBody}>{t.body}</p>
                <span data-edit={`teachers.teacherSince.${i}`} data-edit-max="60" className={s.teacherSince}>{t.since}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- PRICES
            The intro offer gets the second field: slow dashes turning about
            one center, the rosette's quieter relative. */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">Intro offer and memberships</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Students, over-65s and anyone between jobs pay 30% less on every
              membership. Just ask at the desk; we do not ask for proof.
            </p>
          </div>

          <div className={s.offer}>
            <div data-edit-pattern="prices.field" data-edit-roles="transparent,3,2,4" className={s.offerField} aria-hidden="true">
              <TabbiedPattern
                pattern={gyre}
                palette={DRIFT}
                fit="grid"
                cellSize={34}
                options={{ frequency: 0.45 }}
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.offerText}>
              <p data-edit="prices.offerKicker" data-edit-max="240" data-edit-multiline className={s.offerKicker}>New to Stillpoint</p>
              <h3 data-edit="prices.offerTitle" data-edit-max="40" className={s.offerTitle}>Two weeks unlimited</h3>
              <p data-edit="prices.offerPrice" data-edit-max="240" data-edit-multiline className={s.offerPrice}>$40</p>
              <p data-edit="prices.offerBody" data-edit-max="240" data-edit-multiline className={s.offerBody}>
                Every class on the timetable for fourteen days from your first
                visit. Mat, blocks and a towel included. Once per person, and
                it turns into nothing unless you choose a membership.
              </p>
              <a data-edit="prices.btn" data-edit-max="28" className={s.btn} href="#timetable">Start with any class</a>
            </div>
          </div>

          <ul className={s.priceList}>
            {PRICES.map(([name, note, price], i) => (
              <li key={name} className={s.priceRow}>
                <span data-edit={`prices.priceName.${i}`} data-edit-max="60" className={s.priceName}>{name}</span>
                <span data-edit={`prices.priceNote.${i}`} data-edit-max="60" className={s.priceNote}>{note}</span>
                <span data-edit={`prices.priceValue.${i}`} data-edit-max="60" className={s.priceValue}>{price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- ETIQUETTE */}
        <section id="etiquette" className={s.sec} aria-labelledby="etiquette-h">
          <div className={s.secHead}>
            <p data-edit="etiquette.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
            <h2 data-edit="etiquette.title" data-edit-max="60" id="etiquette-h">How the room works</h2>
            <p data-edit="etiquette.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six things, so that fourteen people can share one quiet room.
            </p>
          </div>
          <ol className={s.rules}>
            {RULES.map(([title, body], i) => (
              <li key={title}>
                <h3 data-edit={`etiquette.title2.${i}`} data-edit-max="40">{title}</h3>
                <p data-edit={`etiquette.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">The room, and how to find it</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One long room on the second floor, facing west, with a sprung
              oak floor and heat under it. Changing rooms, two showers and
              lockers at the back.
            </p>
          </div>
          <div className={s.visit}>
            <div className={s.visitCol}>
              <h3 data-edit="visit.visitHead" data-edit-max="40" className={s.visitHead}>Address</h3>
              <p data-edit="visit.body4" data-edit-max="240" data-edit-multiline className={s.visitBig}>
                48 Alder Street, second floor
                <br />
                Above Spoke and Chain bicycles
              </p>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>
                The door is to the left of the bike shop, with a small brass
                plate. There is a lift; ring the bell marked Stillpoint and we
                will send it down.
              </p>
            </div>
            <div className={s.visitCol}>
              <h3 data-edit="visit.visitHead2" data-edit-max="40" className={s.visitHead}>Getting here</h3>
              <dl className={s.visitList}>
                <div>
                  <dt data-edit="visit.term" data-edit-max="28">Bus</dt>
                  <dd data-edit="visit.body" data-edit-max="200" data-edit-multiline>Routes 12 and 40, stop Alder and Fifth, two minutes</dd>
                </div>
                <div>
                  <dt data-edit="visit.term2" data-edit-max="28">Bike</dt>
                  <dd data-edit="visit.body2" data-edit-max="200" data-edit-multiline>Ten hoops in the yard behind the building</dd>
                </div>
                <div>
                  <dt data-edit="visit.term3" data-edit-max="28">Car</dt>
                  <dd data-edit="visit.body3" data-edit-max="200" data-edit-multiline>Street parking is free after 6 pm and on Sundays</dd>
                </div>
              </dl>
            </div>
            <div className={s.visitCol}>
              <h3 data-edit="visit.visitHead3" data-edit-max="40" className={s.visitHead}>Front desk</h3>
              <dl className={s.visitList}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body4.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.visitContact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550148820">(555) 014-8820</a>
              </p>
              <p className={s.visitContact}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@stillpoint.example">hello@stillpoint.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Stillpoint Yoga</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>A small yoga studio above the bike shop on Alder Street.</p>
          </div>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.timetable" data-edit-max="28" href="#timetable">Timetable</a></li>
            <li><a data-edit="footer.classes" data-edit-max="28" href="#classes">Classes</a></li>
            <li><a data-edit="footer.prices" data-edit-max="28" href="#prices">Prices</a></li>
            <li><a data-edit="footer.visit" data-edit-max="28" href="#visit">Visit</a></li>
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional yoga studio. Classes, prices and teachers are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
