import { TabbiedPattern } from 'tabbied/react';
import { wavefans } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './leeward-sailing.module.css';

export const metadata = {
  title: 'Leeward Sailing Lessons: From first sail to skipper, Leeward Cove',
  description:
    'Sailing lessons in the sheltered water of Leeward Cove: a five-rung course ladder from a three-hour first sail to Day Skipper, a tide and wind planner for every lesson day, and private and group rates.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is
   night water: a deep sea ground, sailcloth for type, brass for the one
   button that matters, and three flag colors for the fans. The wave fans
   are the sea and the sails at once: the two sails of the boat in the hero
   are cut from them, a band of them runs between the planner and the rates
   like a swell, and they lap the foot of the page. */
const SEA = '#0f2b3d';
const SAIL = '#f0ebe0';
const BRASS = '#e2b04a';
const SIGNAL = '#d9483b';
const TEAL = '#2f8f9d';
const HARBOR = '#2a5f86';

const MAINSAIL = ['transparent', SAIL, TEAL, HARBOR, BRASS, HARBOR];
const JIB = ['transparent', SAIL, BRASS, SIGNAL, TEAL, BRASS];
const SWELL = ['transparent', SEA, TEAL, HARBOR, BRASS, HARBOR];
const SHORE = ['transparent', SAIL, HARBOR, TEAL, HARBOR, BRASS];

const NAV = [
  ['Courses', '#courses'],
  ['Planner', '#planner'],
  ['Rates', '#rates'],
  ['Instructor', '#instructor'],
  ['Book', '#book'],
];

/* The ladder, from the bottom rung to the top. */
const RUNGS = [
  {
    level: 'Rung 1',
    name: 'First Sail',
    time: '3 hours',
    price: '$95',
    needs: 'No experience',
    learn: 'Your hand on the tiller in the first half hour. Where the wind is, how to steer by it, and how to duck the boom.',
  },
  {
    level: 'Rung 2',
    name: 'Start Sailing',
    time: '2 days',
    price: '$380',
    needs: 'First Sail, or a summer of messing about',
    learn: 'Tacking and gybing, sailing a course round three buoys, a capsize and getting back in, and six knots.',
  },
  {
    level: 'Rung 3',
    name: 'Better Sailing',
    time: '2 days',
    price: '$360',
    needs: 'Start Sailing',
    learn: 'Reefing in a breeze, picking up a mooring, man overboard drills, and sailing without the instructor aboard.',
  },
  {
    level: 'Rung 4',
    name: 'Coastal Crew',
    time: '3 days aboard',
    price: '$690',
    needs: 'Better Sailing, or dinghy experience',
    learn: 'On Tern, our 31-foot keelboat: helming, sail trim, ropework, a night watch and the radio.',
  },
  {
    level: 'Rung 5',
    name: 'Day Skipper',
    time: '5 days aboard',
    price: '$1,250',
    needs: 'Coastal Crew and 100 sea miles',
    learn: 'Passage planning, tides and pilotage, anchoring for lunch, and being in charge of a boat and her crew.',
  },
];

/* The planner: each lesson day on a strip from 07:00 to 21:00. Left and
   width are that window's percentages; turn is the wind arrow's bearing. */
const DAYS = [
  { day: 'Sat 16 May', plan: 'go', verdict: 'On the water', who: 'First Sail and Start Sailing', hw: '10:12', lw: '16:24', wind: 'SW 8-12 kn', lesson: '09:00-13:00', slotL: '14.29%', slotW: '28.57%', hwL: '22.86%', turn: 'rotate(45deg)' },
  { day: 'Sun 17 May', plan: 'go', verdict: 'On the water', who: 'Better Sailing, one reef in', hw: '11:02', lw: '17:15', wind: 'W 12-16 kn', lesson: '09:30-13:30', slotL: '17.86%', slotW: '28.57%', hwL: '28.81%', turn: 'rotate(90deg)' },
  { day: 'Wed 20 May', plan: 'shore', verdict: 'Shore session', who: 'Evening club: charts and the rules of the road', hw: '13:35', lw: '19:48', wind: 'NW 22-28 kn', lesson: '17:00-20:00', slotL: '71.43%', slotW: '21.43%', hwL: '47.02%', turn: 'rotate(135deg)' },
  { day: 'Sat 23 May', plan: 'go', verdict: 'On the water', who: 'Coastal Crew aboard Tern', hw: '16:10', lw: '09:58', wind: 'S 10-14 kn', lesson: '13:00-17:00', slotL: '42.86%', slotW: '28.57%', hwL: '65.48%', turn: 'rotate(0deg)' },
  { day: 'Sun 24 May', plan: 'moved', verdict: 'Moved to Monday', who: 'Gusts over 25 knots forecast', hw: '16:55', lw: '10:42', wind: 'SW 18-26 kn', lesson: '13:30-17:30', slotL: '46.43%', slotW: '28.57%', hwL: '70.83%', turn: 'rotate(45deg)' },
];

const HOURS_SCALE = ['07:00', '10:30', '14:00', '17:30', '21:00'];

const RATES = [
  ['Group, up to four to a boat', '$95 each', '$165 each'],
  ['Two sharing a boat', '$210 for both', '$360 for both'],
  ['Private, one to one', '$240', '$410'],
  ['Tern with a skipper, up to six', '$520', '$880'],
];

const INCLUDED = [
  'Buoyancy aid, wetsuit and waterproof smock',
  'The boat, the safety launch and its fuel',
  'Tea, and a hot shower at the quay afterward',
  'A logbook signed at the end of each rung',
];

const BRING = ['Shoes that can get wet, with soles that grip', 'A warm layer under the smock', 'Sunscreen and a hat, even in May', 'A packed lunch on full days'];

const HOURS = [
  ['Lesson days', 'Wed evening, Sat and Sun'],
  ['Season', 'April to October'],
  ['Phone line', 'Mon-Fri 9-5'],
];

export default function LeewardSailingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sea': '#0f2b3d',
        '--sail': '#f0ebe0',
        '--brass': '#e2b04a',
        '--signal': '#d9483b',
        '--teal': '#2f8f9d',
        '--harbor': '#2a5f86',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sea,sail,brass,signal,teal,harbor"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Leeward</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Sailing Lessons</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book a first sail</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* The hero: the promise on the left, and a sloop on the right whose
            two sails are cut from the wave fans. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Sailing school, Leeward Cove, Sallow Island</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              From first sail <em>to skipper.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Small boats, small groups and one instructor who has taught in
              this cove for fifteen summers. The point keeps the swell off, so
              the water inside it is the best classroom on the coast.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a first sail</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#courses">Climb the ladder</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">To a boat</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>4 at most</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Season</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Apr-Oct</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">From</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>$95</dd>
              </div>
            </dl>
          </div>
          <div className={s.boat}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,2" className={s.jib} aria-hidden="true">
              <TabbiedPattern
                pattern={wavefans}
                palette={JIB}
                fit="grid"
                cellSize={36}
                seed="leeward-jib"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div data-edit-pattern="hero.field2" data-edit-roles="transparent,1,4,5,2,5" className={s.mainsail} aria-hidden="true">
              <TabbiedPattern
                pattern={wavefans}
                palette={MAINSAIL}
                fit="grid"
                cellSize={42}
                seed="leeward-main"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.mast} aria-hidden="true" />
            <span className={s.hull} aria-hidden="true" />
            <span className={s.water} aria-hidden="true" />
          </div>
        </section>

        {/* The course ladder: five rungs, each one a step up from the last. */}
        <section id="courses" className={s.sec} aria-labelledby="courses-h">
          <div className={s.secHead}>
            <h2 data-edit="courses.secTitle" data-edit-max="60" id="courses-h" className={s.secTitle}>The course ladder</h2>
            <p data-edit="courses.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Start on whichever rung fits. Each one ends with a signed
              logbook, and most people take a month or two of sailing between
              rungs. Prices are per person, in a group of up to four.
            </p>
          </div>
          <ol className={s.ladder}>
            {RUNGS.map((r, i) => (
              <li key={r.name} className={s.rung}>
                <p data-edit={`courses.rungLevel.${i}`} data-edit-max="240" data-edit-multiline className={s.rungLevel}>{r.level}</p>
                <h3 data-edit={`courses.rungName.${i}`} data-edit-max="40" className={s.rungName}>{r.name}</h3>
                <p data-edit={`courses.rungMeta.${i}`} data-edit-max="240" data-edit-multiline className={s.rungMeta}>{r.time}</p>
                <p data-edit={`courses.rungLearn.${i}`} data-edit-max="240" data-edit-multiline className={s.rungLearn}>{r.learn}</p>
                <p data-edit={`courses.rungNeeds.${i}`} data-edit-max="240" data-edit-multiline className={s.rungNeeds}>{r.needs}</p>
                <p data-edit={`courses.rungPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.rungPrice}>{r.price}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* The planner: tide and wind for the next lesson days. */}
        <section id="planner" className={s.sec} aria-labelledby="planner-h">
          <div className={s.secHead}>
            <h2 data-edit="planner.secTitle" data-edit-max="60" id="planner-h" className={s.secTitle}>Tide and wind planner</h2>
            <p data-edit="planner.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The slipway dries at low water, so lessons launch within three
              hours of high water. Beginners sail between 5 and 18 knots; above
              that, we stay ashore or move the day. Updated every Thursday.
            </p>
          </div>
          <div className={s.planner}>
            <div className={s.scale} aria-hidden="true">
              {HOURS_SCALE.map((h, i) => (
                <span data-edit={`planner.text.${i}`} data-edit-max="60" key={h}>{h}</span>
              ))}
            </div>
            <ol className={s.days}>
              {DAYS.map((d, i) => (
                <li key={d.day} className={`${s.dayRow} ${s[d.plan]}`}>
                  <div className={s.dayHead}>
                    <h3 data-edit={`planner.dayName.${i}`} data-edit-max="40" className={s.dayName}>{d.day}</h3>
                    <p data-edit={`planner.verdict.${i}`} data-edit-max="240" data-edit-multiline className={s.verdict}>{d.verdict}</p>
                    <p data-edit={`planner.who.${i}`} data-edit-max="240" data-edit-multiline className={s.who}>{d.who}</p>
                  </div>
                  <div className={s.dayBody}>
                    <div className={s.strip} aria-hidden="true">
                      <span className={s.slot} style={{ left: d.slotL, width: d.slotW }} />
                      <span className={s.hwMark} style={{ left: d.hwL }} />
                    </div>
                    <dl className={s.dayFacts}>
                      <div>
                        <dt data-edit={`planner.term.${i}`} data-edit-max="28">Lesson</dt>
                        <dd data-edit={`planner.body.${i}`} data-edit-max="200" data-edit-multiline>{d.lesson}</dd>
                      </div>
                      <div>
                        <dt data-edit={`planner.term2.${i}`} data-edit-max="28">High water</dt>
                        <dd data-edit={`planner.body2.${i}`} data-edit-max="200" data-edit-multiline>{d.hw}</dd>
                      </div>
                      <div>
                        <dt data-edit={`planner.term3.${i}`} data-edit-max="28">Low water</dt>
                        <dd data-edit={`planner.body3.${i}`} data-edit-max="200" data-edit-multiline>{d.lw}</dd>
                      </div>
                      <div>
                        <dt data-edit={`planner.term4.${i}`} data-edit-max="28">Wind</dt>
                        <dd>
                          <span className={s.arrow} style={{ transform: d.turn }} aria-hidden="true" />
                          <span data-edit={`planner.text2.${i}`} data-edit-max="60">{d.wind}</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
            <div className={s.key}>
              <p data-edit="planner.keySlot" data-edit-max="240" data-edit-multiline className={s.keySlot}>The lesson</p>
              <p data-edit="planner.keyHw" data-edit-max="240" data-edit-multiline className={s.keyHw}>High water</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,0,4,5,2,5" className={s.swell} aria-hidden="true">
          <TabbiedPattern
            pattern={wavefans}
            palette={SWELL}
            fit="grid"
            cellSize={48}
            seed="leeward-swell"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* Rates: group, shared and private, by the half day and the day. */}
        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.ratesGrid}>
            <div>
              <h2 data-edit="rates.secTitle" data-edit-max="60" id="rates-h" className={s.secTitle}>Private and group rates</h2>
              <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                For time on the water outside the ladder: practice, a refresher
                before your own boat goes in, or a day out with a skipper.
              </p>
              <h3 data-edit="rates.includedTitle" data-edit-max="40" className={s.includedTitle}>Always included</h3>
              <ul className={s.included}>
                {INCLUDED.map((x, i) => (
                  <li data-edit={`rates.item.${i}`} data-edit-max="80" key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className={s.ratesCard}>
              <table className={s.rates}>
                <caption data-edit="rates.ratesCaption" className={s.ratesCaption}>Per session</caption>
                <thead>
                  <tr>
                    <th data-edit="rates.heading" scope="col">Who is aboard</th>
                    <th data-edit="rates.heading2" scope="col">Half day, 4 hrs</th>
                    <th data-edit="rates.heading3" scope="col">Full day, 7 hrs</th>
                  </tr>
                </thead>
                <tbody>
                  {RATES.map(([who, half, full], i) => (
                    <tr key={who}>
                      <th data-edit={`rates.heading4.${i}`} scope="row">{who}</th>
                      <td data-edit={`rates.cell.${i}`}>{half}</td>
                      <td data-edit={`rates.cell2.${i}`}>{full}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="rates.pass" data-edit-max="240" data-edit-multiline className={s.pass}>Season pass: ten group half days for $780, used any time from April to October.</p>
            </div>
          </div>
        </section>

        {/* The instructor, and what to bring. */}
        <section id="instructor" className={s.sec} aria-labelledby="instructor-h">
          <div className={s.instructor}>
            <div className={s.monogram} aria-hidden="true">
              <span data-edit="instructor.text" data-edit-max="60">TC</span>
            </div>
            <div className={s.bio}>
              <h2 data-edit="instructor.secTitle" data-edit-max="60" id="instructor-h" className={s.secTitle}>Tess Carrow, your instructor</h2>
              <p data-edit="instructor.bioText" data-edit-max="240" data-edit-multiline className={s.bioText}>
                Commercially endorsed skipper and senior sailing instructor,
                teaching here since 2011. Thirty thousand sea miles, two
                Atlantic crossings, and a firm belief that nobody learns
                anything while they are cold.
              </p>
              <p data-edit="instructor.bioText2" data-edit-max="240" data-edit-multiline className={s.bioText}>
                Owen Pryce teaches the weekend dinghy groups with her, and
                drives the safety launch on the Wednesday evenings.
              </p>
            </div>
            <div className={s.bring}>
              <h3 data-edit="instructor.bringTitle" data-edit-max="40" className={s.bringTitle}>What to bring</h3>
              <ul className={s.bringList}>
                {BRING.map((b, i) => (
                  <li data-edit={`instructor.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Booking. */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a lesson</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us which rung and a few dates that suit. We confirm within
                a day, and again on the Thursday before with the forecast.
              </p>
              <p data-edit="book.quay" data-edit-max="240" data-edit-multiline className={s.quay}>Berth 12, Leeward Quay, Sallow Island</p>
              <p data-edit="book.quayNote" data-edit-max="240" data-edit-multiline className={s.quayNote}>Parking at the harbor office. The school is the blue hut at the top of the slipway.</p>
              <p className={s.contactLine}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550163390">(555) 016-3390</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:ahoy@leewardsailing.example">ahoy@leewardsailing.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="lw-name">Name</label>
                <input id="lw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="lw-email">Email</label>
                <input id="lw-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="lw-course">Course or session</label>
                <select id="lw-course" name="course" defaultValue="first">
                  <option value="first">First Sail</option>
                  <option value="start">Start Sailing</option>
                  <option value="better">Better Sailing</option>
                  <option value="crew">Coastal Crew</option>
                  <option value="skipper">Day Skipper</option>
                  <option value="private">Private session</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="lw-people">How many sailing</label>
                <input id="lw-people" name="people" type="number" min="1" max="6" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label5" htmlFor="lw-dates">Dates that suit</label>
                <input id="lw-dates" name="dates" type="text" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label6" htmlFor="lw-exp">Sailing so far, if any</label>
                <textarea id="lw-exp" name="experience" rows={3} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a place</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,5,4,5,2" className={s.footWaves} aria-hidden="true">
          <TabbiedPattern
            pattern={wavefans}
            palette={SHORE}
            fit="grid"
            cellSize={34}
            seed="leeward-shore"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Leeward Sailing Lessons</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional sailing school. The instructors, boat, tides, prices
            and island are invented; check a real forecast before you go out.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
