import { TabbiedPattern } from 'tabbied/react';
import { radius, thirdstop } from 'tabbied/patterns';
import s from './tatami-dojo.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Tatami: Karate school for kids and adults, Foundry Street',
  description:
    'Tatami teaches karate to children from four and adults of any age on Foundry Street. The timetable by age group, the grading path from white belt to black, fees, the sensei, and a free first class.',
};

/* Site colors, the same values as the roles on .page. The circles and the
   folded belts are drawn on a transparent ground, so the mat shows through
   them. */
const MAT = '#f6f4ef';
const INK = '#121212';
const YELLOW = '#f2b705';
const GREEN = '#2b8a57';
const BLUE = '#1f4fa3';
const RED = '#d33a22';

const BAUHAUS = ['transparent', YELLOW, RED, BLUE, INK, GREEN];
const BELTS = ['transparent', INK, YELLOW, GREEN, BLUE, RED];
const FREE = ['transparent', RED, YELLOW, INK, BLUE];
const FLOOR = ['transparent', YELLOW, RED, BLUE, GREEN];

const NAV = [
  ['Classes', '#classes'],
  ['Timetable', '#timetable'],
  ['Belts', '#belts'],
  ['First class', '#first'],
  ['Fees', '#fees'],
  ['Sensei', '#sensei'],
  ['Find us', '#find'],
];

const RACK = [
  { name: 'White', tone: 'toneWhite' },
  { name: 'Yellow', tone: 'toneYellow' },
  { name: 'Green', tone: 'toneGreen' },
  { name: 'Blue', tone: 'toneBlue' },
  { name: 'Red', tone: 'toneRed' },
  { name: 'Black', tone: 'toneBlack' },
];

const GROUPS = [
  { name: 'Little dragons', ages: 'Ages 4 to 6', shape: 'circle', note: 'Forty minutes of balance, listening, and falling over safely, with karate mixed in. Parents on the bench.' },
  { name: 'Juniors', ages: 'Ages 7 to 11', shape: 'square', note: 'An hour. Basics, kata and games, and the first gradings. Most children start here.' },
  { name: 'Teens', ages: 'Ages 12 to 16', shape: 'triangle', note: 'Seventy-five minutes, harder and faster, with sparring from green belt.' },
  { name: 'Adults', ages: '16 and up, any age after', shape: 'half', note: 'Ninety minutes. Beginners and black belts on the same mat, each at their own pace.' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Row = {
  group: string;
  ages: string;
  tone: 'toneWhite' | 'toneYellow' | 'toneGreen' | 'toneBlue' | 'toneRed' | 'toneBlack';
  slots: string[];
};

const TIMETABLE: Row[] = [
  { group: 'Little dragons', ages: '4 to 6', tone: 'toneYellow', slots: ['4:00-4:40', '', '4:00-4:40', '', '', '9:00-9:40', ''] },
  { group: 'Juniors', ages: '7 to 11', tone: 'toneGreen', slots: ['4:45-5:45', '4:45-5:45', '', '4:45-5:45', '', '10:00-11:00', ''] },
  { group: 'Teens', ages: '12 to 16', tone: 'toneBlue', slots: ['', '6:00-7:15', '', '6:00-7:15', '', '11:15-12:30', ''] },
  { group: 'Adults', ages: '16 and up', tone: 'toneRed', slots: ['7:00-8:30', '', '7:00-8:30', '', '7:00-8:30', '12:45-2:00', ''] },
  { group: 'Kumite', ages: 'Green belt up, 12+', tone: 'toneBlack', slots: ['', '', '', '', '6:00-7:00', '', ''] },
  { group: 'Family class', ages: 'A grown-up and a child', tone: 'toneWhite', slots: ['', '', '', '', '', '', '10:00-11:00'] },
];

type Belt = {
  belt: string;
  grade: string;
  tone: 'toneWhite' | 'toneYellow' | 'toneGreen' | 'toneBlue' | 'toneRed' | 'toneBlack';
  time: string;
  learn: string;
  fee: string;
};

const PATH: Belt[] = [
  { belt: 'White', grade: '9th kyu', tone: 'toneWhite', time: 'Day one', learn: 'Standing, bowing, falling safely, the first blocks and punches.', fee: 'Free' },
  { belt: 'Yellow', grade: '8th kyu', tone: 'toneYellow', time: 'After 3 months', learn: 'Heian Shodan, the first kata. Front kick. Counting to ten in Japanese.', fee: '$25' },
  { belt: 'Green', grade: '7th and 6th kyu', tone: 'toneGreen', time: 'After 4 months each', learn: 'Heian Nidan and Sandan. Roundhouse kick. Controlled partner drills.', fee: '$25' },
  { belt: 'Blue', grade: '5th and 4th kyu', tone: 'toneBlue', time: 'After 6 months each', learn: 'Heian Yondan and Godan. Free sparring, with gloves and rules.', fee: '$35' },
  { belt: 'Red', grade: '3rd to 1st kyu', tone: 'toneRed', time: 'After 6 to 9 months each', learn: 'Tekki Shodan and Bassai Dai. Leading a line of juniors through their basics.', fee: '$45' },
  { belt: 'Black', grade: '1st dan', tone: 'toneBlack', time: 'Four years at least, and 16 or over', learn: 'A kata of your choosing, three sparring partners in a row, and a short paper on why you train.', fee: '$120' },
];

const FIRST = [
  ['Five minutes early', 'Shoes off at the door, change, and a sensei comes to say hello and ask about old injuries.'],
  ['Bow in', 'Everyone kneels in a line, highest grade on the right. You go at the left end with the other white belts.'],
  ['Warm up', 'Ten minutes of jogging, stretching and a few push-ups. Do what you can; nobody counts yours.'],
  ['Basics', 'A punch, a block, a stance, over and over, with a senior student beside you who knows them.'],
  ['A game or a kata', 'Children finish with a game. Adults learn the first eight moves of Heian Shodan.'],
  ['Bow out', 'Then a word about whether you want to come back. No contract, no pressure, and the gi is lent for a month.'],
];

const FEES = [
  ['Little dragons', 'Two classes a week', '$70 a month'],
  ['Juniors and teens', 'Up to three classes a week', '$95 a month'],
  ['Adults', 'Every adult class, and kumite', '$110 a month'],
  ['Family class', 'Sundays, one grown-up and one child', '$60 a month'],
  ['A gi', 'Kids $45, adults $65. The first month, we lend one', 'Once'],
];

type Sensei = {
  name: string;
  dan: 'dan1' | 'dan2' | 'dan3' | 'dan4' | 'dan5';
  role: string;
  note: string;
};

const SENSEI: Sensei[] = [
  { name: 'Aiko Moreno', dan: 'dan5', role: 'Head instructor, 5th dan', note: 'Opened Tatami in 2008 in a church hall with eleven students. Teaches the adults and the family class.' },
  { name: 'Daniel Osei', dan: 'dan3', role: 'Juniors and teens, 3rd dan', note: 'National kata silver in 2019. Can quiet a room of nine-year-olds by raising one hand.' },
  { name: 'Priya Nair', dan: 'dan2', role: 'Adults and kumite, 2nd dan', note: 'A physiotherapist in the daytime, which is why the warm-ups are good for your knees.' },
  { name: 'Leo Brandt', dan: 'dan1', role: 'Assistant, 1st dan', note: 'Started here at six. Runs the little dragons with Daniel on Mondays and Saturdays.' },
];

const ASK = [
  ['Is my four-year-old too young?', 'Four is the youngest we take, and only if they can follow a simple instruction from someone who is not you. Try the free class and see.'],
  ['Am I too old to start?', 'Our oldest white belt started at 67. We change kneeling, kick height and sparring to suit your body, not the other way round.'],
  ['Is there fighting?', 'Sparring starts at green belt, always with gloves, rules and a sensei watching every pair. Nobody spars in their first months.'],
  ['Can I watch my child?', 'Yes, from the bench along the window. Phones on silent, cheering after the bow.'],
];

const HOURS = [
  ['Monday to Friday', '3:30 to 8:45 pm'],
  ['Saturday', '8:30 am to 2:15 pm'],
  ['Sunday', '9:30 to 11:15 am'],
];

export default function TatamiDojoPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--mat': '#f6f4ef',
        '--ink': '#121212',
        '--yellow': '#f2b705',
        '--green': '#2b8a57',
        '--blue': '#1f4fa3',
        '--red': '#d33a22',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="mat,ink,yellow,green,blue,red"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;700;800&family=Martian+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Tatami</a>
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
          <div>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Karate school, 220 Foundry Street. Ages 4 and up</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>Everyone starts on a <em>white belt.</em></h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Tatami teaches traditional karate to children from four and to
              adults of any age, on one long mat above the bike shop. Six
              belts, four sensei, and a first class that costs nothing.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#first">Book a free first class</a>
              <a data-edit="hero.buttonLine" data-edit-max="28" className={s.buttonLine} href="#timetable">See the timetable</a>
            </div>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,5,4,1,3" className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={radius}
                palette={BAUHAUS}
                fit="grid"
                cellSize={72}
                seed="tatami-hero"
                options={{ frequency: 0.8 }}
                redrawInterval={7000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.since" data-edit-max="240" data-edit-multiline className={s.since}>Since 2008</p>
          </div>
        </section>

        {/* The belt rack: six grades, top to bottom of the page. */}
        <ol className={s.rack} aria-label="The six belts">
          {RACK.map((b, i) => (
            <li data-edit={`top.item.${i}`} data-edit-max="80" key={b.name} className={s[b.tone]}>{b.name}</li>
          ))}
        </ol>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.head}>
            <p data-edit="classes.num" data-edit-max="240" data-edit-multiline className={s.num}>01</p>
            <h2 data-edit="classes.title" data-edit-max="60" id="classes-h">Classes by age</h2>
            <p data-edit="classes.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Grouped by age, not by belt, so a nervous eight-year-old is never
              on the mat with teenagers. Adults train together whatever their
              grade.
            </p>
          </div>
          <ul className={s.groups}>
            {GROUPS.map((g, i) => (
              <li key={g.name}>
                <span className={`${s.shape} ${s[g.shape]}`} aria-hidden="true" />
                <h3 data-edit={`classes.title2.${i}`} data-edit-max="40">{g.name}</h3>
                <p data-edit={`classes.ages.${i}`} data-edit-max="240" data-edit-multiline className={s.ages}>{g.ages}</p>
                <p data-edit={`classes.body.${i}`} data-edit-max="240" data-edit-multiline>{g.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- TIMETABLE */}
        <section id="timetable" className={s.sec} aria-labelledby="timetable-h">
          <div className={s.head}>
            <p data-edit="timetable.num" data-edit-max="240" data-edit-multiline className={s.num}>02</p>
            <h2 data-edit="timetable.title" data-edit-max="60" id="timetable-h">The week on the mat</h2>
            <p data-edit="timetable.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Times are pm on weekdays and am on weekend mornings until noon.
              Arrive ten minutes early; the door to the mat closes at the bow.
            </p>
          </div>

          <table className={s.timetable}>
            <caption data-edit="timetable.srOnly" className={s.srOnly}>Class times by age group and day</caption>
            <thead>
              <tr>
                <th data-edit="timetable.heading" scope="col">Group</th>
                {DAYS.map((d, i) => (
                  <th data-edit={`timetable.heading2.${i}`} key={d} scope="col">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMETABLE.map((r, i) => (
                <tr key={r.group}>
                  <th scope="row">
                    <span data-edit={`timetable.groupName.${i}`} data-edit-max="60" className={s.groupName}>{r.group}</span>
                    <span data-edit={`timetable.groupAges.${i}`} data-edit-max="60" className={s.groupAges}>{r.ages}</span>
                  </th>
                  {r.slots.map((slot, j) => (
                    <td key={DAYS[j]} className={slot ? s.on : s.off}>
                      <span data-edit={`timetable.slotDay.${i}.${j}`} data-edit-max="60" className={s.slotDay}>{DAYS[j]}</span>
                      <span data-edit={`timetable.slot.${i}.${j}`} data-edit-max="60" className={`${s.slot} ${s[r.tone]}`}>{slot}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* -------------------------------------------------------- THE PATH */}
        <section id="belts" className={s.pathSec} aria-labelledby="belts-h">
          <div data-edit-pattern="belts.field" data-edit-roles="transparent,1,2,3,4,5" className={s.folded} aria-hidden="true">
            <TabbiedPattern
              pattern={thirdstop}
              palette={BELTS}
              fit="grid"
              cellSize={56}
              seed="tatami-belts"
              options={{ frequency: 0.9 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.pathInner}>
            <div className={s.head}>
              <p data-edit="belts.num" data-edit-max="240" data-edit-multiline className={s.num}>03</p>
              <h2 data-edit="belts.title" data-edit-max="60" id="belts-h">From white to black</h2>
              <p data-edit="belts.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Gradings are on the last Saturday of March, June, September and
                December. Your sensei tells you when you are ready; nobody
                grades by asking.
              </p>
            </div>

            <ol className={s.path}>
              {PATH.map((b, i) => (
                <li key={b.belt}>
                  <p data-edit={`belts.belt.${i}`} data-edit-max="240" data-edit-multiline className={`${s.belt} ${s[b.tone]}`}>{b.belt}</p>
                  <div className={s.pathBody}>
                    <p data-edit={`belts.grade.${i}`} data-edit-max="240" data-edit-multiline className={s.grade}>{b.grade}</p>
                    <h3 data-edit={`belts.title2.${i}`} data-edit-max="40">{b.time}</h3>
                    <p data-edit={`belts.body.${i}`} data-edit-max="240" data-edit-multiline>{b.learn}</p>
                  </div>
                  <p data-edit={`belts.fee.${i}`} data-edit-max="240" data-edit-multiline className={s.fee}>{b.fee}</p>
                </li>
              ))}
            </ol>
            <p data-edit="belts.pathNote" data-edit-max="240" data-edit-multiline className={s.pathNote}>
              Under sixteen, the last step is a junior black belt, with a white
              stripe through it. It becomes a full 1st dan without a second test.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------- FIRST CLASS */}
        <section id="first" className={s.sec} aria-labelledby="first-h">
          <div className={s.first}>
            <div className={s.firstArt}>
              <div data-edit-pattern="first.field" data-edit-roles="transparent,5,2,1,4" className={s.firstField} aria-hidden="true">
                <TabbiedPattern
                  pattern={radius}
                  palette={FREE}
                  fit="grid"
                  cellSize={56}
                  seed="tatami-free"
                  options={{ frequency: 0.85 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="first.freeDisc" data-edit-max="240" data-edit-multiline className={s.freeDisc}>Free</p>
            </div>

            <div>
              <div className={s.firstHead}>
                <p data-edit="first.num" data-edit-max="240" data-edit-multiline className={s.num}>04</p>
                <h2 data-edit="first.title" data-edit-format="emphasis" data-edit-max="60" id="first-h">Your first class, <em>on us</em></h2>
              </div>
              <ol className={s.steps}>
                {FIRST.map(([title, body], i) => (
                  <li key={title}>
                    <h3 data-edit={`first.title.${i}`} data-edit-max="40">{title}</h3>
                    <p data-edit={`first.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <form className={s.form} action="#">
            <div className={s.formBody}>
              <h3 data-edit="first.formTitle" data-edit-max="40" className={s.formTitle}>Book it</h3>
              <p data-edit="first.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                Tell us who is coming and when. We reply the same day with a
                place on the mat and a gi in the right size.
              </p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="first.label" htmlFor="tt-name">Name of the student</label>
                  <input id="tt-name" name="name" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="first.label2" htmlFor="tt-group">Group</label>
                  <select id="tt-group" name="group" defaultValue="juniors">
                    <option value="dragons">Little dragons, 4 to 6</option>
                    <option value="juniors">Juniors, 7 to 11</option>
                    <option value="teens">Teens, 12 to 16</option>
                    <option value="adults">Adults, 16 and up</option>
                    <option value="family">Family class</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="first.label3" htmlFor="tt-day">Day you would like</label>
                  <select id="tt-day" name="day" defaultValue="sat">
                    <option value="mon">Monday</option>
                    <option value="tue">Tuesday</option>
                    <option value="wed">Wednesday</option>
                    <option value="thu">Thursday</option>
                    <option value="fri">Friday</option>
                    <option value="sat">Saturday</option>
                    <option value="sun">Sunday</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="first.label4" htmlFor="tt-contact">Your phone or email</label>
                  <input id="tt-contact" name="contact" type="text" autoComplete="email" />
                </div>
              </div>
              <button data-edit="first.button" data-edit-max="24" className={s.button} type="submit">Hold a place on the mat</button>
            </div>
            <Artwork
              slug="tatami-dojo-bow"
              alt="A child and an adult in karate uniforms and belts, bowing to each other"
              inks={['var(--text)']}
              className={s.bow}
            />
          </form>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.head}>
            <p data-edit="fees.num" data-edit-max="240" data-edit-multiline className={s.num}>05</p>
            <h2 data-edit="fees.title" data-edit-max="60" id="fees-h">Fees</h2>
            <p data-edit="fees.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              No joining fee and no contract; thirty days' notice to stop. A
              second person from the same family pays 15 percent less, a third
              25 percent less.
            </p>
          </div>
          <table className={s.fees}>
            <caption data-edit="fees.srOnly" className={s.srOnly}>Monthly fees</caption>
            <tbody>
              {FEES.map(([plan, what, price], i) => (
                <tr key={plan}>
                  <th data-edit={`fees.heading.${i}`} scope="row">{plan}</th>
                  <td data-edit={`fees.cell.${i}`}>{what}</td>
                  <td data-edit={`fees.price.${i}`} className={s.price}>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ---------------------------------------------------------- SENSEI */}
        <section id="sensei" className={s.sec} aria-labelledby="sensei-h">
          <div className={s.head}>
            <p data-edit="sensei.num" data-edit-max="240" data-edit-multiline className={s.num}>06</p>
            <h2 data-edit="sensei.title" data-edit-max="60" id="sensei-h">Sensei</h2>
            <p data-edit="sensei.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Every class has two black belts on the mat, one teaching and one
              walking the lines.
            </p>
          </div>
          <ul className={s.sensei}>
            {SENSEI.map((p, i) => (
              <li key={p.name}>
                <span className={`${s.blackBelt} ${s[p.dan]}`} aria-hidden="true" />
                <h3 data-edit={`sensei.title2.${i}`} data-edit-max="40">{p.name}</h3>
                <p data-edit={`sensei.role.${i}`} data-edit-max="240" data-edit-multiline className={s.role}>{p.role}</p>
                <p data-edit={`sensei.body.${i}`} data-edit-max="240" data-edit-multiline>{p.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- ASK */}
        <section className={s.sec} aria-labelledby="ask-h">
          <div className={s.head}>
            <p data-edit="ask.num" data-edit-max="240" data-edit-multiline className={s.num}>07</p>
            <h2 data-edit="ask.title" data-edit-max="60" id="ask-h">Parents ask</h2>
          </div>
          <dl className={s.ask}>
            {ASK.map(([q, a], i) => (
              <div key={q}>
                <dt data-edit={`ask.term.${i}`} data-edit-max="28">{q}</dt>
                <dd data-edit={`ask.body.${i}`} data-edit-max="200" data-edit-multiline>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ FIND */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.find}>
            <div>
              <p data-edit="find.num" data-edit-max="240" data-edit-multiline className={s.num}>08</p>
              <h2 data-edit="find.findTitle" data-edit-max="60" id="find-h" className={s.findTitle}>220 Foundry Street</h2>
              <p data-edit="find.findText" data-edit-max="240" data-edit-multiline className={s.findText}>
                Second floor, above Spoke and Chain bicycles. Stairs, and a
                lift at the back. Street parking on Foundry is free after six.
              </p>
              <p className={s.findText}>
                <a data-edit="find.link" data-edit-max="28" href="tel:+15550153390">(555) 015-3390</a>
                <br />
                <a data-edit="find.link2" data-edit-max="28" href="mailto:osu@tatamidojo.example">osu@tatamidojo.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([day, time], i) => (
                <div key={day}>
                  <dt data-edit={`find.term.${i}`} data-edit-max="28">{day}</dt>
                  <dd data-edit={`find.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,5,4,3" className={s.floor} aria-hidden="true">
          <TabbiedPattern
            pattern={radius}
            palette={FLOOR}
            fit="grid"
            cellSize={40}
            seed="tatami-floor"
            options={{ frequency: 0.7 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tatami</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional karate school. The sensei, times, grades and fees are invented.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The two bowing figures are a generated picture, drawn in the page's own colors.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
