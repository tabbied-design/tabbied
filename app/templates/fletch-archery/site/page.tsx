import { TabbiedPattern } from 'tabbied/react';
import { yabane } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './fletch-archery.module.css';

export const metadata = {
  title: 'Fletch Archery Coaching: Beginner courses and private lessons, Ashgrove fields',
  description:
    'Fletch is a one-coach archery school on the Ashgrove playing fields: six-week beginner courses, private lessons for every kind of bow, honest equipment advice and an open range five days a week.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Yabane is the
   arrow feather: gold and red fletching beside chalk and blue, column on
   column, on a transparent ground so the night-green field shows between.
   It fills the outer rings of the target, runs as a quiver band, and edges
   the footer. */
const FIELD = '#17241d';
const CHALK = '#efe8d6';
const GOLD = '#e2b23a';
const RED = '#c8452f';
const BLUE = '#3d78a8';

const FLETCHING = ['transparent', GOLD, RED, CHALK, BLUE];
const QUIVER = ['transparent', RED, GOLD, BLUE, CHALK];
const DUSK = ['transparent', BLUE, GOLD, CHALK, RED];

const NAV = [
  ['Beginners', '#courses'],
  ['Lessons', '#lessons'],
  ['Range times', '#range'],
  ['Equipment', '#equipment'],
  ['Book', '#book'],
];

const END = ['X', '10', '10', '9', '9', '7'];

type Week = { week: string; date: string; distance: string; focus: string; arrows: string };

const WEEKS: Week[] = [
  { week: '1', date: 'Sat 7 Mar', distance: '10 m', focus: 'Safety on the line, stance, your first end', arrows: '36' },
  { week: '2', date: 'Sat 14 Mar', distance: '10 m', focus: 'Nocking, drawing to the same anchor every time', arrows: '60' },
  { week: '3', date: 'Sat 21 Mar', distance: '15 m', focus: 'The release: letting go without plucking', arrows: '72' },
  { week: '4', date: 'Sat 28 Mar', distance: '15 m', focus: 'Sight marks and aiming off in a crosswind', arrows: '72' },
  { week: '5', date: 'Sat 4 Apr', distance: '18 m', focus: 'Scoring, calling your arrows, walking back', arrows: '84' },
  { week: '6', date: 'Sat 11 Apr', distance: '18 m', focus: 'Your first full round, scored and signed', arrows: '108' },
];

const LESSONS = [
  { name: 'One lesson', price: '$65', per: 'an hour on the range', what: 'Any bow, any level. Bring yours, or borrow one of ours at no charge.' },
  { name: 'Five lessons', price: '$295', per: 'use them within three months', what: 'The usual way to fix one thing properly: a release, a collapse, a flinch.' },
  { name: 'Video session', price: '$90', per: '90 minutes', what: 'Filmed from three sides at full speed and in slow motion. You keep the clips.' },
  { name: 'Competition block', price: '$220', per: 'a month', what: 'Four lessons, a written training plan and a coach at one tournament.' },
];

type Slot = { day: string; times: string[] };

const RANGE: Slot[] = [
  { day: 'Mon', times: ['Closed'] },
  { day: 'Tue', times: ['4:00-8:00 open range'] },
  { day: 'Wed', times: ['4:00-6:00 open range', '6:30-8:30 adult course'] },
  { day: 'Thu', times: ['4:00-8:00 open range'] },
  { day: 'Fri', times: ['4:00-6:00 juniors, 10-16'] },
  { day: 'Sat', times: ['9:00-12:00 beginner courses', '1:00-5:00 open range'] },
  { day: 'Sun', times: ['9:00-1:00 open range', '2:00-4:00 private lessons'] },
];

const RANGE_FACTS = [
  ['Distances', '10-70 m outdoors, 18 m in the hall from November to March'],
  ['Range fee', '$12 a visit, free in the month after a course'],
  ['Who can shoot', 'Anyone who has finished a course or holds a club card'],
];

const BOWS = [
  { name: 'Recurve', draw: '18-26 lb to start', note: 'The Olympic bow, with a sight and a stabilizer. Where most of our beginners stay.' },
  { name: 'Barebow', draw: '18-24 lb to start', note: 'A recurve with nothing on it. You aim by where the arrow sits. Hard, honest, cheap.' },
  { name: 'Compound', draw: '30-40 lb, let-off 70%', note: 'Cams, a release aid and a peep sight. Very accurate, and best bought after a season.' },
  { name: 'Longbow', draw: '25-35 lb to start', note: 'One piece of wood, no sight. Slow to learn and nothing else feels the same.' },
];

const KIT = [
  ['Starter recurve, limbs and riser', '$180-260'],
  ['Twelve aluminum arrows, cut to you', '$90-120'],
  ['Finger tab, arm guard, quiver', '$45-70'],
  ['Sight, rest and plunger', '$60-110'],
];

const HOURS = [
  ['Phone', 'Tuesday to Sunday, 10:00-6:00'],
  ['Range', 'See the timetable above'],
  ['Courses', 'New groups every six weeks'],
];

export default function FletchArcheryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--field': '#17241d',
        '--chalk': '#efe8d6',
        '--gold': '#e2b23a',
        '--red': '#c8452f',
        '--blue': '#3d78a8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="field,chalk,gold,red,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Fletch</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Archery Coaching</span>
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
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Archery coaching, Ashgrove playing fields</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Every archer starts at <em>ten metres.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Fletch is a one-coach archery school. Six-week beginner courses,
              private lessons for every kind of bow, and honest advice before
              you spend a dollar on kit.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#courses">Join a beginner course</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#range">Range times</a>
            </div>
          </div>

          <div className={s.heroTarget}>
            <div className={s.target}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,1,4" className={s.targetField} aria-hidden="true">
                <TabbiedPattern
                  pattern={yabane}
                  palette={FLETCHING}
                  fit="grid"
                  cellSize={58}
                  seed="fletch-target"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.rings} aria-hidden="true" />
              <span className={`${s.nock} ${s.nock1}`} aria-hidden="true" />
              <span className={`${s.nock} ${s.nock2}`} aria-hidden="true" />
              <span className={`${s.nock} ${s.nock3}`} aria-hidden="true" />
            </div>
            <div className={s.card}>
              <p data-edit="hero.cardHead" data-edit-max="240" data-edit-multiline className={s.cardHead}>End 4 at 18 m, week 6</p>
              <ol className={s.cardEnd}>
                {END.map((score, i) => (
                  <li data-edit={`hero.item.${i}`} data-edit-max="80" key={`${score}-${i}`}>{score}</li>
                ))}
              </ol>
              <p className={s.cardTotal}>
                <span data-edit="hero.text" data-edit-max="60">End total</span>
                <strong data-edit="hero.emphasis">55</strong>
              </p>
            </div>
          </div>
        </section>

        <section id="courses" className={s.sec} aria-labelledby="courses-h">
          <div className={s.secHead}>
            <p data-edit="courses.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Beginner course</p>
            <h2 data-edit="courses.secTitle" data-edit-max="60" id="courses-h" className={s.secTitle}>Six Saturdays, from first arrow to a scored round</h2>
            <p data-edit="courses.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Eight archers to a group, ages ten and up, every bow, arrow and
              arm guard lent. $180 for the six weeks, and the range is free for
              the month after.
            </p>
          </div>

          <div className={s.sheet}>
            <div className={s.sheetTop}>
              <p data-edit="courses.sheetTitle" data-edit-max="240" data-edit-multiline className={s.sheetTitle}>Score sheet: spring course</p>
              <p data-edit="courses.sheetMeta" data-edit-max="240" data-edit-multiline className={s.sheetMeta}>Starts Saturday 7 March, 9:00-12:00</p>
            </div>
            <div className={s.tableWrap}>
              <table className={s.weeks}>
                <caption data-edit="courses.srOnly" className={s.srOnly}>The six weeks of the spring beginner course</caption>
                <thead>
                  <tr>
                    <th data-edit="courses.heading" scope="col">Week</th>
                    <th data-edit="courses.heading2" scope="col">Date</th>
                    <th data-edit="courses.heading3" scope="col">Distance</th>
                    <th data-edit="courses.heading4" scope="col">What we work on</th>
                    <th data-edit="courses.heading5" scope="col">Arrows</th>
                  </tr>
                </thead>
                <tbody>
                  {WEEKS.map((w, i) => (
                    <tr key={w.week}>
                      <td data-edit={`courses.weekNo.${i}`} className={s.weekNo}>{w.week}</td>
                      <td data-edit={`courses.cell.${i}`}>{w.date}</td>
                      <td data-edit={`courses.cell2.${i}`}>{w.distance}</td>
                      <th data-edit={`courses.heading6.${i}`} scope="row">{w.focus}</th>
                      <td data-edit={`courses.num.${i}`} className={s.num}>{w.arrows}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td data-edit="courses.cell3" colSpan={4}>Arrows shot over the course</td>
                    <td data-edit="courses.num2" className={s.num}>432</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className={s.sheetFoot}>
              <p data-edit="courses.sheetNext" data-edit-max="240" data-edit-multiline className={s.sheetNext}>Next groups: 7 March, 25 April, 13 June</p>
              <a data-edit="courses.button" data-edit-max="28" className={s.button} href="#book">Book a place, $180</a>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,4,1" className={s.quiver} aria-hidden="true">
          <TabbiedPattern
            pattern={yabane}
            palette={QUIVER}
            fit="grid"
            cellSize={44}
            seed="fletch-quiver"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="lessons" className={s.sec} aria-labelledby="lessons-h">
          <div className={s.secHead}>
            <p data-edit="lessons.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Private lessons</p>
            <h2 data-edit="lessons.secTitle" data-edit-max="60" id="lessons-h" className={s.secTitle}>One archer, one coach, one thing to fix</h2>
            <p data-edit="lessons.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most people come with a problem they can name: arrows that drift
              left, a shaking hold, a score that stopped climbing. We find what
              causes it and give you one drill at a time.
            </p>
          </div>
          <ul className={s.lessons}>
            {LESSONS.map((l, i) => (
              <li key={l.name} className={s.lesson}>
                <span className={s.lessonMark} aria-hidden="true" />
                <h3 data-edit={`lessons.lessonName.${i}`} data-edit-max="40" className={s.lessonName}>{l.name}</h3>
                <p data-edit={`lessons.lessonPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.lessonPrice}>{l.price}</p>
                <p data-edit={`lessons.lessonPer.${i}`} data-edit-max="240" data-edit-multiline className={s.lessonPer}>{l.per}</p>
                <p data-edit={`lessons.lessonWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.lessonWhat}>{l.what}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="range" className={s.range} aria-labelledby="range-h">
          <div className={s.rangeInner}>
            <div className={s.rangeHead}>
              <p data-edit="range.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Range times</p>
              <h2 data-edit="range.secTitle" data-edit-max="60" id="range-h" className={s.secTitle}>When the line is open</h2>
              <dl className={s.rangeFacts}>
                {RANGE_FACTS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`range.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`range.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ol className={s.week}>
              {RANGE.map((slot, i) => (
                <li key={slot.day} className={slot.times[0] === 'Closed' ? `${s.day} ${s.closed}` : s.day}>
                  <p data-edit={`range.dayName.${i}`} data-edit-max="240" data-edit-multiline className={s.dayName}>{slot.day}</p>
                  <ul className={s.dayTimes}>
                    {slot.times.map((t, i2) => (
                      <li data-edit={`range.item.${i}.${i2}`} data-edit-max="80" key={t}>{t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="equipment" className={s.sec} aria-labelledby="equipment-h">
          <div className={s.equip}>
            <div className={s.equipSide}>
              <p data-edit="equipment.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Equipment advice</p>
              <h2 data-edit="equipment.secTitle" data-edit-max="60" id="equipment-h" className={s.secTitle}>Do not buy a bow before week four</h2>
              <p data-edit="equipment.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                By then you know which bow you like, your draw length is
                measured, and your draw weight has settled. We fit you for free
                and send you to a shop with a written list, not a sales pitch.
              </p>
              <div className={s.kit}>
                <h3 data-edit="equipment.kitTitle" data-edit-max="40" className={s.kitTitle}>A first recurve kit, roughly</h3>
                <dl className={s.kitList}>
                  {KIT.map(([item, price], i) => (
                    <div key={item}>
                      <dt data-edit={`equipment.term.${i}`} data-edit-max="28">{item}</dt>
                      <dd data-edit={`equipment.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <ul className={s.bows}>
              {BOWS.map((b, i) => (
                <li key={b.name} className={s.bow}>
                  <h3 data-edit={`equipment.bowName.${i}`} data-edit-max="40" className={s.bowName}>{b.name}</h3>
                  <p data-edit={`equipment.bowDraw.${i}`} data-edit-max="240" data-edit-multiline className={s.bowDraw}>{b.draw}</p>
                  <p data-edit={`equipment.bowNote.${i}`} data-edit-max="240" data-edit-multiline className={s.bowNote}>{b.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="coach" className={s.sec} aria-labelledby="coach-h">
          <div className={s.coach}>
            <div data-edit-pattern="coach.field" data-edit-roles="transparent,4,2,1,3" className={s.coachPanel} aria-hidden="true">
              <TabbiedPattern
                pattern={yabane}
                palette={DUSK}
                fit="grid"
                cellSize={52}
                seed="fletch-coach"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.coachText}>
              <p data-edit="coach.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Your coach</p>
              <h2 data-edit="coach.secTitle" data-edit-max="60" id="coach-h" className={s.secTitle}>Marta Vey</h2>
              <blockquote data-edit="coach.quote" data-edit-max="240" data-edit-multiline className={s.quote}>
                I teach the shot I wish someone had taught me: the same eight
                steps, in the same order, every single arrow. The score follows
                the routine.
              </blockquote>
              <ul className={s.creds}>
                <li data-edit="coach.item" data-edit-max="80">Senior coach certificate, 14 years coaching</li>
                <li data-edit="coach.item2" data-edit-max="80">Regional recurve champion, three seasons</li>
                <li data-edit="coach.item3" data-edit-max="80">First aid and child safeguarding, renewed yearly</li>
                <li data-edit="coach.item4" data-edit-max="80">Range safety officer for the Ashgrove fields</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.book}>
            <div className={s.bookInfo}>
              <p data-edit="book.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Book</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Come and shoot</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Book a course or a lesson, or ask a question. We answer within
                a day, and we can usually find you a place on the line this
                week.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="book.link" data-edit-max="28" href="tel:+15550168840">(555) 016-8840</a></dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Email</dt>
                  <dd><a data-edit="book.link2" data-edit-max="28" href="mailto:coach@fletcharchery.example">coach@fletcharchery.example</a></dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Range</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Ashgrove Fields, gate 3, off Bowyer Lane</dd>
                </div>
                {HOURS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`book.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="book.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Booking request</p>
              <label className={s.field}>
                <span data-edit="book.text" data-edit-max="60">Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text2" data-edit-max="60">Email</span>
                  <input type="email" name="email" autoComplete="email" />
                </label>
                <label className={s.field}>
                  <span data-edit="book.text3" data-edit-max="60">Age of the archer</span>
                  <input type="text" name="age" inputMode="numeric" />
                </label>
              </div>
              <fieldset className={s.choices}>
                <legend data-edit="book.legend">I would like</legend>
                <label className={s.choice}>
                  <input type="radio" name="want" value="course" />
                  <span data-edit="book.text4" data-edit-max="60">A beginner course</span>
                </label>
                <label className={s.choice}>
                  <input type="radio" name="want" value="lesson" />
                  <span data-edit="book.text5" data-edit-max="60">A private lesson</span>
                </label>
                <label className={s.choice}>
                  <input type="radio" name="want" value="advice" />
                  <span data-edit="book.text6" data-edit-max="60">Equipment advice</span>
                </label>
              </fieldset>
              <label className={s.field}>
                <span data-edit="book.text7" data-edit-max="60">Your bow, if you have one</span>
                <textarea name="notes" rows={3} />
              </label>
              <button data-edit="book.button" data-edit-max="24" className={s.button} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,1,4" className={s.footerBand} aria-hidden="true">
          <TabbiedPattern
            pattern={yabane}
            palette={FLETCHING}
            fit="grid"
            cellSize={36}
            seed="fletch-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footerInner}>
          <p data-edit="footer.footerName" data-edit-max="240" data-edit-multiline className={s.footerName}>Fletch Archery Coaching</p>
          <p data-edit="footer.footerLine" data-edit-max="240" data-edit-multiline className={s.footerLine}>Ashgrove Fields, gate 3, off Bowyer Lane.</p>
          <p data-edit="footer.footerLine2" data-edit-max="240" data-edit-multiline className={s.footerLine}>
            Fletch is a fictional business: the names, people, prices and
            address on this page are invented.
          </p>
          <p className={s.footerCredit}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
