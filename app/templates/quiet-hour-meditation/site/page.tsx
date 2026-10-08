import { TabbiedPattern } from 'tabbied/react';
import { float } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './quiet-hour-meditation.module.css';

export const metadata = {
  title: 'Quiet Hour Meditation: Classes, an eight-week course and retreats',
  description:
    'Quiet Hour is a small meditation room above the bookbinder on Alder Lane. Drop-in classes through the week, an eight-week course for beginners, day and weekend retreats, and a first sit that costs nothing.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The float is
   the room's one focal point: level lines all the way across, and a disc of
   upright lines that seems to hover over them, the way attention settles on
   one thing. It is the round window of the hero, the horizon between the
   course and the retreats, and the small circle that waits by the first
   sit. */
const NIGHT = '#1c2030';
const MOON = '#ebe5d6';
const CANDLE = '#d4a05a';
const DUSK = '#5f6f95';

const HALO = ['transparent', MOON, MOON];
const HORIZON = ['transparent', DUSK, CANDLE];
const SMALL = ['transparent', CANDLE, DUSK];

const NAV = [
  ['The week', '#week'],
  ['Eight weeks', '#course'],
  ['Retreats', '#retreats'],
  ['First sit', '#first-sit'],
  ['Find the room', '#visit'],
];

type Slot = { time: string; name: string; length: string };
type Day = { day: string; slots: Slot[] };

const WEEK: Day[] = [
  { day: 'Monday', slots: [{ time: '7:00', name: 'Morning sit', length: '30 min' }, { time: '18:30', name: 'Beginners', length: '60 min' }] },
  { day: 'Tuesday', slots: [{ time: '12:15', name: 'Lunchtime half hour', length: '30 min' }, { time: '19:00', name: 'Eight-week course', length: '2 hrs' }] },
  { day: 'Wednesday', slots: [{ time: '7:00', name: 'Morning sit', length: '30 min' }, { time: '18:30', name: 'Kindness practice', length: '60 min' }] },
  { day: 'Thursday', slots: [{ time: '12:15', name: 'Lunchtime half hour', length: '30 min' }, { time: '19:00', name: 'The silent hour', length: '60 min' }] },
  { day: 'Friday', slots: [{ time: '7:00', name: 'Morning sit', length: '30 min' }] },
  { day: 'Saturday', slots: [{ time: '9:30', name: 'Walking, Riverside Park', length: '45 min' }, { time: '11:00', name: 'Beginners', length: '60 min' }] },
  { day: 'Sunday', slots: [{ time: '17:00', name: 'Evening sit and tea', length: '75 min' }] },
];

const PRICES = [
  ['Drop in', '$14', 'Any class, pay at the door'],
  ['Ten classes', '$120', 'Used within six months'],
  ['A month, unlimited', '$75', 'Paused for holidays on request'],
];

type Week = { no: string; title: string; body: string };

const COURSE: Week[] = [
  { no: '1', title: 'Arriving', body: 'How to sit, on a chair or a cushion, and what to do when you notice you have stopped paying attention.' },
  { no: '2', title: 'The breath', body: 'Ten minutes with the breath each day, and a log of when it was easy and when it was not.' },
  { no: '3', title: 'The body', body: 'The body scan, lying down. Most people fall asleep in it at least once; that is allowed.' },
  { no: '4', title: 'Sounds and thoughts', body: 'Letting sounds come and go, then treating thoughts the same way, as events rather than orders.' },
  { no: '5', title: 'Difficult weather', body: 'Sitting with something unpleasant without fixing it or running from it, for a little longer each time.' },
  { no: '6', title: 'Kindness', body: 'A practice of goodwill toward yourself first, which most people find the hardest week.' },
  { no: '7', title: 'Daily life', body: 'Three-minute pauses in the working day, and one ordinary task done slowly, on purpose.' },
  { no: '8', title: 'Keeping going', body: 'Building a practice that survives a busy month, and a quiet Saturday together to close.' },
];

type Retreat = { kind: string; title: string; when: string; where: string; price: string; body: string };

const RETREATS: Retreat[] = [
  { kind: 'One day', title: 'A quiet Saturday', when: 'First Saturday of each month, 9:30-4:00', where: 'In the room on Alder Lane', price: '$85, lunch included', body: 'Sitting and walking periods, a talk after lunch, and the afternoon in silence. Open to anyone who has sat with us before.' },
  { kind: 'Two nights', title: 'A weekend at Fernhollow', when: 'March 6-8 and October 16-18', where: 'Fernhollow farmhouse, forty minutes north', price: '$420 shared, $520 own room', body: 'Friday supper to Sunday lunch. Simple vegetarian food, a woodland walk at dawn, and two nights without a phone signal.' },
  { kind: 'Five days', title: 'Five days of silence', when: 'May 18-23', where: 'Stillwell retreat house, by the lake', price: '$890, all meals', body: 'For people who have done the course or a weekend. Five full days of practice, a short talk each evening, and one interview with the teacher.' },
];

const EXPECT = [
  'Arrive ten minutes early; the door closes when the bell rings',
  'Chairs, cushions and blankets are provided',
  'No experience needed, and no special clothes',
  'You can sit with your eyes open, and leave if you need to',
];

const HOURS = [
  ['Classes', 'Every day, see the week above'],
  ['Office', 'Tuesday and Thursday, 10:00-2:00'],
  ['Room', 'Second floor, by stairs or lift'],
];

export default function QuietHourMeditationPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#1c2030',
        '--moon': '#ebe5d6',
        '--candle': '#d4a05a',
        '--dusk': '#5f6f95',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,moon,candle,dusk"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDot} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Quiet Hour</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#first-sit">Book a free sit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,1" className={s.halo} aria-hidden="true">
            <TabbiedPattern
              pattern={float}
              palette={HALO}
              fit="grid"
              cellSize={40}
              seed="quiet-hour-halo"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Meditation classes, courses and retreats on Alder Lane</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Sit down. <em>Let one thing be enough.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Quiet Hour is a plain room with forty cushions and one teacher. We
              teach the oldest, simplest kind of meditation, sitting still and
              paying attention, without incense, apps or promises.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#first-sit">Your first sit is free</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#week">See this week</a>
            </div>
          </div>
        </section>

        <section id="week" className={s.sec} aria-labelledby="week-h">
          <div className={s.secHead}>
            <p data-edit="week.secMark" data-edit-max="240" data-edit-multiline className={s.secMark}>Every week</p>
            <h2 data-edit="week.secTitle" data-edit-max="60" id="week-h" className={s.secTitle}>Twelve classes, seven days</h2>
            <p data-edit="week.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Morning sits are silent and need no booking. Evening classes start
              with ten minutes of guidance, and beginners are always welcome.
            </p>
          </div>
          <ol className={s.week}>
            {WEEK.map((day, i) => (
              <li key={day.day} className={s.day}>
                <h3 data-edit={`week.dayName.${i}`} data-edit-max="40" className={s.dayName}>{day.day}</h3>
                <ul className={s.slots}>
                  {day.slots.map((slot, i2) => (
                    <li key={slot.time} className={s.slot}>
                      <span data-edit={`week.slotTime.${i}.${i2}`} data-edit-max="60" className={s.slotTime}>{slot.time}</span>
                      <span data-edit={`week.slotName.${i}.${i2}`} data-edit-max="60" className={s.slotName}>{slot.name}</span>
                      <span data-edit={`week.slotLength.${i}.${i2}`} data-edit-max="60" className={s.slotLength}>{slot.length}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <dl className={s.prices}>
            {PRICES.map(([name, price, note], i) => (
              <div key={name} className={s.priceItem}>
                <dt data-edit={`week.term.${i}`} data-edit-max="28">{name}</dt>
                <dd data-edit={`week.priceFig.${i}`} data-edit-max="200" data-edit-multiline className={s.priceFig}>{price}</dd>
                <dd data-edit={`week.priceNote.${i}`} data-edit-max="200" data-edit-multiline className={s.priceNote}>{note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="course" className={s.course} aria-labelledby="course-h">
          <div className={s.courseInner}>
            <div className={s.courseHead}>
              <p data-edit="course.secMark" data-edit-max="240" data-edit-multiline className={s.secMark}>For beginners</p>
              <h2 data-edit="course.secTitle" data-edit-max="60" id="course-h" className={s.secTitle}>The eight-week course</h2>
              <p data-edit="course.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tuesday evenings, 7:00-9:00, in a group of no more than sixteen.
                Twenty minutes of practice at home each day, with recordings. The
                next courses begin on January 13, April 14 and September 8.
              </p>
              <dl className={s.courseFacts}>
                <div>
                  <dt data-edit="course.term" data-edit-max="28">Fee</dt>
                  <dd data-edit="course.body" data-edit-max="200" data-edit-multiline>$340, with the closing Saturday</dd>
                </div>
                <div>
                  <dt data-edit="course.term2" data-edit-max="28">Bursaries</dt>
                  <dd data-edit="course.body2" data-edit-max="200" data-edit-multiline>Four places a course at $90</dd>
                </div>
              </dl>
              <a data-edit="course.button" data-edit-max="28" className={s.button} href="#visit">Ask for a place</a>
            </div>
            <ol className={s.weeks}>
              {COURSE.map((week, i) => (
                <li key={week.no} className={`${s.weekItem} ${s[`w${week.no}`]}`}>
                  <span className={s.moon} aria-hidden="true" />
                  <p className={s.weekNo}>Week {week.no}</p>
                  <h3 data-edit={`course.weekTitle.${i}`} data-edit-max="40" className={s.weekTitle}>{week.title}</h3>
                  <p data-edit={`course.weekBody.${i}`} data-edit-max="240" data-edit-multiline className={s.weekBody}>{week.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2" className={s.horizon} aria-hidden="true">
          <TabbiedPattern
            pattern={float}
            palette={HORIZON}
            fit="grid"
            cellSize={40}
            seed="quiet-hour-horizon"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="retreats" className={s.sec} aria-labelledby="retreats-h">
          <div className={s.secHead}>
            <p data-edit="retreats.secMark" data-edit-max="240" data-edit-multiline className={s.secMark}>Further</p>
            <h2 data-edit="retreats.secTitle" data-edit-max="60" id="retreats-h" className={s.secTitle}>Retreats, a day to five</h2>
            <p data-edit="retreats.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Retreats are where practice deepens. Places are limited and held
              with a deposit of $50, returned in full up to two weeks before.
            </p>
          </div>
          <ul className={s.retreats}>
            {RETREATS.map((r, i) => (
              <li key={r.title} className={s.retreat}>
                <p data-edit={`retreats.retreatKind.${i}`} data-edit-max="240" data-edit-multiline className={s.retreatKind}>{r.kind}</p>
                <h3 data-edit={`retreats.retreatTitle.${i}`} data-edit-max="40" className={s.retreatTitle}>{r.title}</h3>
                <p data-edit={`retreats.retreatBody.${i}`} data-edit-max="240" data-edit-multiline className={s.retreatBody}>{r.body}</p>
                <dl className={s.retreatFacts}>
                  <div>
                    <dt data-edit={`retreats.term.${i}`} data-edit-max="28">When</dt>
                    <dd data-edit={`retreats.body.${i}`} data-edit-max="200" data-edit-multiline>{r.when}</dd>
                  </div>
                  <div>
                    <dt data-edit={`retreats.term2.${i}`} data-edit-max="28">Where</dt>
                    <dd data-edit={`retreats.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.where}</dd>
                  </div>
                  <div>
                    <dt data-edit={`retreats.term3.${i}`} data-edit-max="28">Cost</dt>
                    <dd data-edit={`retreats.body3.${i}`} data-edit-max="200" data-edit-multiline>{r.price}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section id="first-sit" className={s.first} aria-labelledby="first-h">
          <div className={s.firstInner}>
            <div data-edit-pattern="firstSit.field" data-edit-roles="transparent,2,3" className={s.firstCircle} aria-hidden="true">
              <TabbiedPattern
                pattern={float}
                palette={SMALL}
                fit="grid"
                cellSize={30}
                seed="quiet-hour-first"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.firstText}>
              <p data-edit="firstSit.secMark" data-edit-max="240" data-edit-multiline className={s.secMark}>No charge, no catch</p>
              <h2 data-edit="firstSit.firstTitle" data-edit-max="60" id="first-h" className={s.firstTitle}>Your first sit is free</h2>
              <p data-edit="firstSit.firstLead" data-edit-max="240" data-edit-multiline className={s.firstLead}>
                Come to any Beginners class or a Sunday evening sit as our guest.
                Stay for tea afterwards and ask whatever you like.
              </p>
              <ul className={s.expect}>
                {EXPECT.map((item, i) => (
                  <li data-edit={`firstSit.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <a data-edit="firstSit.button" data-edit-max="28" className={s.button} href="#visit">Book your free sit</a>
            </div>
          </div>
        </section>

        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visitGrid}>
            <div className={s.visitInfo}>
              <p data-edit="visit.secMark" data-edit-max="240" data-edit-multiline className={s.secMark}>Find the room</p>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>Above the bookbinder</h2>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>14 Alder Lane, second floor</p>
              <p data-edit="visit.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>The blue door between the bookbinder and the bakery. Ring the top bell; the stairs are steep, the lift is at the back.</p>
              <dl className={s.hours}>
                {HOURS.map(([label, value], i) => (
                  <div key={label}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contactLine}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550186640">(555) 018-6640</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:sit@quiethour.example">sit@quiethour.example</a>
              </p>
              <p data-edit="visit.teacher" data-edit-max="240" data-edit-multiline className={s.teacher}>Taught by Ines Marlow, who has practised for twenty years and taught for twelve. She trained in a residential teacher programme of four years and keeps the room small on purpose.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="visit.label" htmlFor="qh-name">Your name</label>
                <input id="qh-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label2" htmlFor="qh-email">Email</label>
                <input id="qh-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label3" htmlFor="qh-what">I would like</label>
                <select id="qh-what" name="what" defaultValue="first">
                  <option value="first">My free first sit</option>
                  <option value="course">A place on the eight-week course</option>
                  <option value="retreat">A retreat place</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="visit.label4" htmlFor="qh-note">Anything the teacher should know</label>
                <textarea id="qh-note" name="note" rows={4} />
              </div>
              <button data-edit="visit.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
              <p data-edit="visit.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Ines replies herself, usually within two days.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Quiet Hour Meditation</p>
        <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional meditation teacher. The names, classes, prices, places and address are invented, and nothing here is medical advice.</p>
        <p className={s.footText}>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
