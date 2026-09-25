import { TabbiedPattern } from 'tabbied/react';
import { elbow, quartercirclequilt } from 'tabbied/patterns';
import s from './little-acorns.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Little Acorns: Nursery and daycare for ages 1-5, Linden Park',
  description:
    'Little Acorns is a small nursery and daycare for children from one to five, open 7:30am to 6pm all year. See a day at the nursery, the rooms, the food, the fees and how to enroll.',
};

/* Site colors, the same hexes as the root rule. The quilt keeps a
   transparent ground, so its seams are the cream of the page. */
const CREAM = '#FFF9F0';
const CORAL = '#F28C6B';
const SAGE = '#6CB8A8';
const SUN = '#F5C85B';
const LILAC = '#A9A2B0';

const QUILT = ['transparent', CORAL, SAGE, SUN, CREAM];
const PIPES = ['transparent', CORAL, SAGE, SUN, LILAC];

const NAV = [
  ['Our day', '#day'],
  ['Rooms', '#rooms'],
  ['Food and naps', '#food'],
  ['Fees', '#fees'],
  ['Team', '#team'],
  ['Enroll', '#enroll'],
  ['Visit', '#visit'],
];

/* Three soft blocks of quilt beside the hero, like a stack of play mats. */
const BLOCKS = [
  { seed: 'acorns-block-1', cell: 96 },
  { seed: 'acorns-block-2', cell: 80 },
  { seed: 'acorns-block-3', cell: 80 },
];

const FACTS = [
  ['1-5', 'Years old'],
  ['1:4', 'Adults to under-twos'],
  ['7:30-6', 'Open, all year'],
];

type Moment = {
  time: string;
  meridiem: string;
  title: string;
  body: string;
  where: string;
  seed: string;
};

/* The day. Every room keeps to this rhythm; the youngest sleep and eat
   when they need to, and it bends around them. */
const DAY: Moment[] = [
  {
    time: '8:00',
    meridiem: 'am',
    title: 'Arrival and breakfast',
    body: 'Doors open at 7:30 for early starts. Breakfast is porridge, toast and fruit until 8:30, and a hello from the same key person every morning.',
    where: 'Indoors',
    seed: 'acorns-node-01',
  },
  {
    time: '9:00',
    meridiem: 'am',
    title: 'Circle time',
    body: 'Songs, the weather, the day of the week and who is here today. The Acorns room takes turns being the one who counts.',
    where: 'Indoors',
    seed: 'acorns-node-02',
  },
  {
    time: '9:30',
    meridiem: 'am',
    title: 'Play and projects',
    body: 'Painting, blocks, the sand tray, dressing up and the book corner, with a small project each week that the children choose.',
    where: 'Indoors',
    seed: 'acorns-node-03',
  },
  {
    time: '10:30',
    meridiem: 'am',
    title: 'Snack, then the garden',
    body: 'Fruit and milk, then outside in every weather. We have the boots and the waterproofs; you only need to send a warm hat.',
    where: 'Outdoors',
    seed: 'acorns-node-04',
  },
  {
    time: '11:45',
    meridiem: 'am',
    title: 'Lunch',
    body: 'A hot lunch cooked in our kitchen that morning. The older children set the table and serve themselves.',
    where: 'Indoors',
    seed: 'acorns-node-05',
  },
  {
    time: '12:30',
    meridiem: 'pm',
    title: 'Naps and quiet time',
    body: 'Cots in a dark, calm room for the little ones. Children who no longer nap have stories, puzzles and a rest on the cushions.',
    where: 'Rest',
    seed: 'acorns-node-06',
  },
  {
    time: '2:30',
    meridiem: 'pm',
    title: 'Out and about',
    body: 'A walk to Linden Park, music with Mr. Ade on Tuesdays, cooking on Thursdays, or back to the morning project.',
    where: 'Outdoors',
    seed: 'acorns-node-07',
  },
  {
    time: '3:30',
    meridiem: 'pm',
    title: 'Afternoon snack',
    body: 'Something light: crackers and cheese, vegetable sticks, a slice of banana bread on Fridays.',
    where: 'Indoors',
    seed: 'acorns-node-08',
  },
  {
    time: '4:00',
    meridiem: 'pm',
    title: 'Stories and free play',
    body: 'A slower hour. Picture books, the train set, drawing, and time to finish whatever got started this morning.',
    where: 'Indoors',
    seed: 'acorns-node-09',
  },
  {
    time: '5:30',
    meridiem: 'pm',
    title: 'Home time',
    body: 'Pick-up is any time from 4:30 until we close at 6:00. You get a short note of the day: what they ate, how long they slept, what made them laugh.',
    where: 'Hello again',
    seed: 'acorns-node-10',
  },
];

const ROOMS = [
  {
    name: 'Saplings',
    ages: '12-24 months',
    group: '8 children',
    ratio: '1 adult to 4',
    body: 'A soft, low room with its own sleep room and a small garden of its own, so the littlest ones can be outside without the big ones rushing past.',
  },
  {
    name: 'Seedlings',
    ages: '2-3 years',
    group: '12 children',
    ratio: '1 adult to 4',
    body: 'Climbing, painting and a great deal of talking. Potty training is done together with you, at the pace your child sets.',
  },
  {
    name: 'Acorns',
    ages: '3-5 years',
    group: '20 children',
    ratio: '1 adult to 8',
    body: 'Letters, numbers and longer projects, getting ready for kindergarten without anyone sitting at a desk. The funded Pre-K hours are in this room.',
  },
];

const MENU = [
  ['Monday', 'Chicken and vegetable pie', 'Apple and oat crumble'],
  ['Tuesday', 'Lentil and sweet potato curry, rice', 'Yogurt and pear'],
  ['Wednesday', 'Fish cakes, peas, new potatoes', 'Banana and berries'],
  ['Thursday', 'Pasta with tomato and hidden vegetables', 'Rice pudding'],
  ['Friday', 'Bean chili, jacket potatoes', 'Fruit salad'],
];

const NAPS = [
  ['Saplings', 'Two naps if they need them, in their own cot, with the sleep routine you use at home.'],
  ['Seedlings', 'One nap after lunch, usually an hour to ninety minutes. We wake no one unless you ask us to.'],
  ['Acorns', 'Quiet time after lunch on the cushions. Most do not sleep; some always will, and that is fine.'],
];

const FEES = [
  ['Full day, 7:30-6:00', '$98', '$92', '$84'],
  ['Morning, 7:30-1:00', '$62', '$58', '$52'],
  ['Afternoon, 1:00-6:00', '$56', '$52', '$48'],
  ['Full week, 5 days', '$450', '$425', '$390'],
];

const FEE_NOTES = [
  'Meals, snacks, diapers and wipes are included in every session.',
  'Children aged 3 and 4 can use up to 15 funded Pre-K hours a week, in term time. We take the funding and bill only the hours above it.',
  'A second child in the nursery at the same time gets 10% off.',
  'Fees are billed monthly in advance. We close for one week at New Year, and it is not charged.',
];

const TEAM = [
  { initials: 'HO', name: 'Hannah Obi', role: 'Nursery manager', note: 'Early years teacher, 16 years with little ones, the first person you will meet.' },
  { initials: 'MA', name: 'Mateo Alvarez', role: 'Saplings room lead', note: 'Infant and toddler certificate. Knows every lullaby in two languages.' },
  { initials: 'PK', name: 'Priya Kaur', role: 'Seedlings room lead', note: 'Early childhood degree, and in charge of the garden and its vegetables.' },
  { initials: 'JB', name: 'Joel Baptiste', role: 'Acorns room lead', note: 'Pre-K teacher. Runs the Thursday cooking and the end-of-year show.' },
  { initials: 'MS', name: 'Maria Santos', role: 'Cook', note: 'Cooks lunch from scratch every morning and knows every allergy by heart.' },
  { initials: 'AD', name: 'Ade Daniels', role: 'Music, Tuesdays', note: 'Brings a guitar, a drum and a bag of shakers, and leaves with none of them.' },
];

const STEPS = [
  {
    no: '1',
    title: 'Come and see us',
    body: 'Visit on a weekday morning, with your child if you like. It takes about 40 minutes.',
  },
  {
    no: '2',
    title: 'Join the list',
    body: 'Fill in one form and pay a $50 deposit, which comes off your first month.',
  },
  {
    no: '3',
    title: 'Settling in',
    body: 'Two free short sessions with you in the room, then one without. More if they need it.',
  },
  {
    no: '4',
    title: 'First day',
    body: 'Their key person meets you at the door, and we send a photo of them playing by 10.',
  },
];

const HOURS = [
  ['Monday-Friday', '7:30am-6:00pm'],
  ['Saturday and Sunday', 'Closed'],
  ['Visits', 'Weekdays, 9:30am-11:00am'],
];

export default function LittleAcornsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fff9f0',
        '--ink': '#2b2a33',
        '--coral': '#f28c6b',
        '--sage': '#6cb8a8',
        '--sun': '#f5c85b',
        '--lilac': '#a9a2b0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,ink,coral,sage,sun,lilac"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markBadge} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Little Acorns</span>
        </a>
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
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Nursery and daycare for ages 1 to 5</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Big days for <em>small people.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              A small nursery on Chestnut Row with three rooms, a garden, a
              cook who makes lunch every morning, and a day with a shape your
              child can learn by heart.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#visit">Book a visit</a>
              <a data-edit="hero.btnSoft" data-edit-max="28" className={s.btnSoft} href="#day">See our day</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.blocks} aria-hidden="true">
            {BLOCKS.map((b, i) => (
              <div data-edit-pattern={`hero.field.${i}`} data-edit-roles="transparent,2,3,4,0" key={b.seed} className={s.block} aria-hidden="true">
                <TabbiedPattern
                  pattern={quartercirclequilt}
                  palette={QUILT}
                  fit="grid"
                  cellSize={b.cell}
                  seed={b.seed}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- THE DAY
            The centerpiece: one long line from arrival to home time, each
            stop a small quilt tile on the line and a soft card beside it. */}
        <section id="day" className={s.day} aria-labelledby="day-h">
          <div className={s.dayHead}>
            <p data-edit="day.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>A day at Little Acorns</p>
            <h2 data-edit="day.title" data-edit-max="60" id="day-h">From hello to home time</h2>
            <p data-edit="day.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Small children do best when they know what comes next, so every
              day has the same shape. The youngest nap and eat when they need
              to, and the day bends around them.
            </p>
          </div>
          <ol className={s.timeline}>
            {DAY.map((m, i) => (
              <li key={m.seed} className={s.moment}>
                <p className={s.when}>
                  <span data-edit={`day.time.${i}`} data-edit-max="60" className={s.time}>{m.time}</span>
                  <span data-edit={`day.meridiem.${i}`} data-edit-max="60" className={s.meridiem}>{m.meridiem}</span>
                </p>
                <div data-edit-pattern={`day.field.${i}`} data-edit-roles="transparent,2,3,4,0" className={s.node} aria-hidden="true">
                  <TabbiedPattern
                    pattern={quartercirclequilt}
                    palette={QUILT}
                    fit="grid"
                    cellSize={28}
                    seed={m.seed}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.momentCard}>
                  <span data-edit={`day.where.${i}`} data-edit-max="60" className={s.where}>{m.where}</span>
                  <h3 data-edit={`day.title2.${i}`} data-edit-max="40">{m.title}</h3>
                  <p data-edit={`day.body.${i}`} data-edit-max="240" data-edit-multiline>{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- ROOMS */}
        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <h2 data-edit="rooms.title" data-edit-max="60" id="rooms-h">Three rooms, by age</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Children move up when they are ready, not on a birthday, and
              spend a few mornings visiting the next room first.
            </p>
          </div>
          <ul className={s.rooms}>
            {ROOMS.map((r, i) => (
              <li key={r.name} className={s.room}>
                <div className={s.roomTop}>
                  <h3 data-edit={`rooms.title2.${i}`} data-edit-max="40">{r.name}</h3>
                  <span data-edit={`rooms.roomAges.${i}`} data-edit-max="60" className={s.roomAges}>{r.ages}</span>
                </div>
                <dl className={s.roomFacts}>
                  <div>
                    <dt data-edit={`rooms.term.${i}`} data-edit-max="28">Group</dt>
                    <dd data-edit={`rooms.body.${i}`} data-edit-max="200" data-edit-multiline>{r.group}</dd>
                  </div>
                  <div>
                    <dt data-edit={`rooms.term2.${i}`} data-edit-max="28">Ratio</dt>
                    <dd data-edit={`rooms.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.ratio}</dd>
                  </div>
                </dl>
                <p data-edit={`rooms.roomBody.${i}`} data-edit-max="240" data-edit-multiline className={s.roomBody}>{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- FOOD, NAPS */}
        <section id="food" className={s.sec} aria-labelledby="food-h">
          <div className={s.secHead}>
            <h2 data-edit="food.title" data-edit-max="60" id="food-h">Food and naps</h2>
            <p data-edit="food.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Everything is cooked here, nut-free, with a separate plate for
              every allergy we know about. This is a typical week of lunches.
            </p>
          </div>
          <div className={s.foodGrid}>
            <div className={s.menuCard}>
              <h3 data-edit="food.cardTitle" data-edit-max="40" className={s.cardTitle}>This week's lunches</h3>
              <dl className={s.menu}>
                {MENU.map(([d, main, pud], i) => (
                  <div key={d}>
                    <dt data-edit={`food.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`food.menuMain.${i}`} data-edit-max="200" data-edit-multiline className={s.menuMain}>{main}</dd>
                    <dd data-edit={`food.menuPud.${i}`} data-edit-max="200" data-edit-multiline className={s.menuPud}>{pud}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.napCard}>
              <h3 data-edit="food.cardTitle2" data-edit-max="40" className={s.cardTitle}>Naps</h3>
              <dl className={s.naps}>
                {NAPS.map(([room, text], i) => (
                  <div key={room}>
                    <dt data-edit={`food.term2.${i}`} data-edit-max="28">{room}</dt>
                    <dd data-edit={`food.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <h2 data-edit="fees.title" data-edit-max="60" id="fees-h">Fees and funded hours</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Per child, per session, with everything included. There is no
              registration fee.
            </p>
          </div>
          <div className={s.feeCard}>
            <table className={s.feeTable}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>Session fees by age</caption>
              <thead>
                <tr>
                  <th data-edit="fees.heading" scope="col">Session</th>
                  <th data-edit="fees.heading2" scope="col">1-2 yrs</th>
                  <th data-edit="fees.heading3" scope="col">2-3 yrs</th>
                  <th data-edit="fees.heading4" scope="col">3-5 yrs</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map(([session, a, b, c], i) => (
                  <tr key={session}>
                    <th data-edit={`fees.heading5.${i}`} scope="row">{session}</th>
                    <td data-edit={`fees.cell.${i}`}>{a}</td>
                    <td data-edit={`fees.cell2.${i}`}>{b}</td>
                    <td data-edit={`fees.cell3.${i}`}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={s.feeNotes}>
            {FEE_NOTES.map((n, i) => (
              <li data-edit={`fees.item.${i}`} data-edit-max="80" key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.sec} aria-labelledby="team-h">
          <div className={s.secHead}>
            <h2 data-edit="team.title" data-edit-max="60" id="team-h">The people your child will know</h2>
            <p data-edit="team.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every child has a key person who settles them in, writes the
              daily note and is the one you talk to. Everyone here is
              first-aid trained and background checked.
            </p>
          </div>
          <ul className={s.team}>
            {TEAM.map((t, i) => (
              <li key={t.name} className={s.person}>
                <span className={s.initials} aria-hidden="true">{t.initials}</span>
                <div>
                  <h3 data-edit={`team.title2.${i}`} data-edit-max="40">{t.name}</h3>
                  <span data-edit={`team.role.${i}`} data-edit-max="60" className={s.role}>{t.role}</span>
                  <p data-edit={`team.body.${i}`} data-edit-max="240" data-edit-multiline>{t.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- ENROLL */}
        <section id="enroll" className={s.sec} aria-labelledby="enroll-h">
          <div className={s.enrollGrid}>
            <div>
              <div className={s.secHeadStack}>
                <h2 data-edit="enroll.title" data-edit-max="60" id="enroll-h">How to enroll</h2>
                <p data-edit="enroll.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  We have places in Acorns from January, and a short waiting
                  list for Saplings. Four steps, and you will not be rushed
                  through any of them.
                </p>
              </div>
              <ol className={s.steps}>
                {STEPS.map((st, i) => (
                  <li key={st.no}>
                    <span data-edit={`enroll.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                    <h3 data-edit={`enroll.title2.${i}`} data-edit-max="40">{st.title}</h3>
                    <p data-edit={`enroll.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div data-edit-pattern="enroll.field" data-edit-roles="transparent,2,3,4,5" className={s.pipes} aria-hidden="true">
              <TabbiedPattern
                pattern={elbow}
                palette={PIPES}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={72}
                seed="acorns-pipes"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div className={s.visitInfo}>
              <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Visit us</h2>
              <p data-edit="visit.visitLede" data-edit-max="240" data-edit-multiline className={s.visitLede}>
                The best way to know if we are right for your child is to come
                and see a morning. Pick a day and we will confirm by email.
              </p>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.address}>
                Little Acorns Nursery
                <br />
                14 Chestnut Row
                <br />
                Linden Park
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.contactList}>
                <li>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550148820">(555) 014-8820</a>
                </li>
                <li>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@littleacorns.example">hello@littleacorns.example</a>
                </li>
              </ul>
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="visit.formTitle" data-edit-max="40" className={s.formTitle}>Book a visit</h3>
              <div className={s.field}>
                <label data-edit="visit.label" htmlFor="la-name">Your name</label>
                <input id="la-name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label2" htmlFor="la-email">Email</label>
                <input id="la-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label3" htmlFor="la-phone">Phone</label>
                <input id="la-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label4" htmlFor="la-age">Your child's age</label>
                <select id="la-age" name="age" defaultValue="2">
                  <option value="0">Under 1, planning ahead</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="visit.label5" htmlFor="la-day">Best day to visit</label>
                <select id="la-day" name="day" defaultValue="tue">
                  <option value="mon">Monday</option>
                  <option value="tue">Tuesday</option>
                  <option value="wed">Wednesday</option>
                  <option value="thu">Thursday</option>
                  <option value="fri">Friday</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="visit.label6" htmlFor="la-start">Hoping to start</label>
                <select id="la-start" name="start" defaultValue="soon">
                  <option value="soon">As soon as there is a place</option>
                  <option value="jan">January</option>
                  <option value="spring">In the spring</option>
                  <option value="sep">September</option>
                  <option value="later">Later, just looking</option>
                </select>
              </div>
              <div className={s.fieldWide}>
                <label data-edit="visit.label7" htmlFor="la-note">Anything we should know</label>
                <textarea id="la-note" name="note" rows={3} />
              </div>
              <button data-edit="visit.btn" data-edit-max="24" className={s.btn} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Little Acorns</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Nursery and daycare for ages 1 to 5, on Chestnut Row.</p>
          </div>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.day" data-edit-max="28" href="#day">Our day</a></li>
            <li><a data-edit="footer.rooms" data-edit-max="28" href="#rooms">Rooms</a></li>
            <li><a data-edit="footer.food" data-edit-max="28" href="#food">Food and naps</a></li>
          </ul>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.fees" data-edit-max="28" href="#fees">Fees</a></li>
            <li><a data-edit="footer.enroll" data-edit-max="28" href="#enroll">Enroll</a></li>
            <li><a data-edit="footer.visit" data-edit-max="28" href="#visit">Visit</a></li>
          </ul>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
            14 Chestnut Row, Linden Park
            <br />
            (555) 014-8820
            <br />
            hello@littleacorns.example
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional nursery. Fees, hours, places and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
