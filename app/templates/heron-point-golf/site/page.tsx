import { TabbiedPattern } from 'tabbied/react';
import { bobbinet, hurdle } from 'tabbied/patterns';
import s from './heron-point-golf.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Heron Point: Public golf club, the marsh road',
  description:
    'Heron Point is an eighteen-hole, par-72 public course along the marsh, with a practice range, lessons with two PGA professionals, a clubhouse restaurant and tee times bookable a week ahead.',
};

/* Site colors. The mown checker and the dimples sit on `transparent`, so
   they are drawn on the paper and the pale of the page itself. */
const GREEN = '#2F6B3A';
const SAND = '#C8A45A';
const GRAY = '#8B9488';
const PALE = '#DCE3D5';

const MOWN = ['transparent', GREEN, PALE];
const DIMPLES = ['transparent', GREEN, SAND, GRAY];
const BALL = ['transparent', GRAY, PALE];
const STRIPES = ['transparent', PALE, SAND];

const NAV = [
  ['The course', '#course'],
  ['Lessons', '#lessons'],
  ['Clubhouse', '#clubhouse'],
  ['Rates', '#rates'],
  ['Tee times', '#tee'],
];

const CONDITIONS = [
  ['Course', 'Open, all 18'],
  ['Greens', 'Rolling 10.5'],
  ['Carts', 'Paths only on 7 and 16'],
  ['First tee', '6:30 am'],
];

type Hole = {
  no: number;
  par: number;
  yards: number;
  note: string;
};

const FRONT: Hole[] = [
  { no: 1, par: 4, yards: 392, note: 'A gentle opener; favor the left side of the fairway.' },
  { no: 2, par: 5, yards: 528, note: 'Reachable in two with the wind behind you.' },
  { no: 3, par: 3, yards: 164, note: 'All carry over the reeds to a long, narrow green.' },
  { no: 4, par: 4, yards: 418, note: 'Dogleg left around the heron pond.' },
  { no: 5, par: 4, yards: 367, note: 'Short, but the green slopes hard back to front.' },
  { no: 6, par: 3, yards: 198, note: 'The longest par three; two bunkers guard the right.' },
  { no: 7, par: 5, yards: 551, note: 'Three shots for most. The layup is the whole hole.' },
  { no: 8, par: 4, yards: 405, note: 'Tee shot through the pines, then wide open.' },
  { no: 9, par: 4, yards: 429, note: 'Uphill to the clubhouse, playing a club longer.' },
];

const BACK: Hole[] = [
  { no: 10, par: 4, yards: 384, note: 'Out toward the water; the wind decides everything.' },
  { no: 11, par: 3, yards: 152, note: 'The island green. There is a drop zone. Use it.' },
  { no: 12, par: 5, yards: 540, note: 'A marsh crosses at 280 yards from the back tee.' },
  { no: 13, par: 4, yards: 436, note: 'Our number one handicap, and it has earned it.' },
  { no: 14, par: 4, yards: 348, note: 'Driver is not always the play here.' },
  { no: 15, par: 3, yards: 176, note: 'Heron Rock, the signature hole, from a raised tee.' },
  { no: 16, par: 5, yards: 512, note: 'Birdie chance, if you find the fairway.' },
  { no: 17, par: 4, yards: 402, note: 'A two-tier green; know where the flag is.' },
  { no: 18, par: 4, yards: 440, note: 'Home along the marsh, the deck watching.' },
];

const STATS = [
  ['Par', '72'],
  ['Yards, back tees', '6,842'],
  ['Rating and slope', '72.4 / 131'],
  ['Opened', '1964'],
];

const PROS = [
  {
    name: 'Maggie Dunmore',
    role: 'PGA head professional',
    note: 'Twenty years of teaching, half of it to people who had never held a club.',
  },
  {
    name: 'Luis Ferreira',
    role: 'PGA teaching professional',
    note: 'Short game and putting, and the only person here who likes bunkers.',
  },
];

const LESSONS = [
  ['Half-hour lesson', '$55'],
  ['One-hour lesson', '$95'],
  ['Playing lesson, nine holes', '$180'],
  ['Series of five hours', '$425'],
  ['Junior clinic, Saturday 9 am', '$20'],
];

const BUCKETS = [
  { size: 'Small', balls: '35 balls', price: '$6' },
  { size: 'Medium', balls: '70 balls', price: '$10' },
  { size: 'Large', balls: '110 balls', price: '$14' },
];

const CLUBHOUSE = [
  {
    title: 'The Heron Room',
    body: 'Breakfast from 6 am, lunch until 3, and the bar and deck over the 18th green until 9 pm. Open to everyone, golfer or not.',
  },
  {
    title: 'Pro shop',
    body: 'Balls, gloves, rain gear and rental sets. Club fitting by appointment with Maggie or Luis.',
  },
  {
    title: 'Locker rooms',
    body: 'Showers, towels and day lockers are free with any round. Members keep a locker all year.',
  },
  {
    title: 'Outings and weddings',
    body: 'Shotgun starts for up to 144 players, and a lawn by the pond that seats 160 for dinner.',
  },
];

const RATES = [
  { round: '18 holes, walking', week: '$58', weekend: '$72', twilight: '$38' },
  { round: '18 holes, with cart', week: '$78', weekend: '$94', twilight: '$52' },
  { round: '9 holes, walking', week: '$32', weekend: '$40', twilight: '$24' },
  { round: 'Juniors under 18', week: '$18', weekend: '$24', twilight: '$12' },
];

const MEMBERS = [
  ['Weekday member', '$1,450 a year'],
  ['Full member', '$2,900 a year'],
  ['Junior member', '$300 a year'],
];

export default function HeronPointGolfPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#eff2ea',
        '--ink': '#172117',
        '--green': '#2f6b3a',
        '--sand': '#c8a45a',
        '--gray': '#8b9488',
        '--pale': '#dce3d5',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,green,sand,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500..700;1,500..600&family=Figtree:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Heron Point</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Golf club</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#tee">Book a tee time</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The fairway fills the screen, tinted green; the sky left empty in
            the picture is the paper of the page, and the words stand in it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <Artwork
              slug="heron-point-golf-fairway"
              alt=""
              mode="tint"
              fit="cover"
              inks={['var(--ink)', 'var(--pale)']}
            />
          </div>
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Public golf on the marsh road</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Eighteen holes
              <br />
              <em>along the marsh.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              A par-72 course open to everyone, seven days a week, with a
              range, two teaching pros and breakfast from six.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#tee">Book a tee time</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#course">See the scorecard</a>
            </div>
          </div>
          <dl className={s.conditions}>
            {CONDITIONS.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`hero.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BAND
            Mown turf: laths across and along, the way a fairway is cut. */}
        <div className={s.band} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,5" className={s.bandField}>
            <TabbiedPattern
              pattern={hurdle}
              palette={MOWN}
              fit="grid"
              cellSize={32}
              seed="heron-mown"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------- COURSE
            The scorecard: front nine and back nine side by side, with a note
            for every hole. */}
        <section id="course" className={s.course} aria-labelledby="course-h">
          <div className={s.courseHead}>
            <div>
              <p data-edit="course.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The course</p>
              <h2 data-edit="course.title" data-edit-max="60" id="course-h">The card, hole by hole</h2>
              <p data-edit="course.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Parkland through the pines on the front nine, then out along
                the water for the back. Yardages are from the back tees; the
                white tees play 6,104.
              </p>
            </div>
            <dl className={s.stats}>
              {STATS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`course.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`course.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.card}>
            <div className={s.nine}>
              <h3 data-edit="course.nineTitle" data-edit-max="40" className={s.nineTitle}>Out, the front nine</h3>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th data-edit="course.heading" scope="col">Hole</th>
                    <th data-edit="course.heading2" scope="col">Par</th>
                    <th data-edit="course.heading3" scope="col">Yards</th>
                    <th data-edit="course.heading4" scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {FRONT.map((h, i) => (
                    <tr key={h.no}>
                      <th scope="row">
                        <span data-edit={`course.holeNo.${i}`} data-edit-max="60" className={s.holeNo}>{h.no}</span>
                      </th>
                      <td data-edit={`course.par.${i}`} className={s.par}>{h.par}</td>
                      <td data-edit={`course.yards.${i}`} className={s.yards}>{h.yards}</td>
                      <td data-edit={`course.note.${i}`} className={s.note}>{h.note}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th data-edit="course.heading5" scope="row">Out</th>
                    <td data-edit="course.par2" className={s.par}>36</td>
                    <td data-edit="course.yards2" className={s.yards}>3,452</td>
                    <td data-edit="course.note2" className={s.note}>Front nine</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className={s.nine}>
              <h3 data-edit="course.nineTitle2" data-edit-max="40" className={s.nineTitle}>In, the back nine</h3>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th data-edit="course.heading6" scope="col">Hole</th>
                    <th data-edit="course.heading7" scope="col">Par</th>
                    <th data-edit="course.heading8" scope="col">Yards</th>
                    <th data-edit="course.heading9" scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {BACK.map((h, i) => (
                    <tr key={h.no}>
                      <th scope="row">
                        <span data-edit={`course.holeNo2.${i}`} data-edit-max="60" className={s.holeNo}>{h.no}</span>
                      </th>
                      <td data-edit={`course.par3.${i}`} className={s.par}>{h.par}</td>
                      <td data-edit={`course.yards3.${i}`} className={s.yards}>{h.yards}</td>
                      <td data-edit={`course.note3.${i}`} className={s.note}>{h.note}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th data-edit="course.heading10" scope="row">In</th>
                    <td data-edit="course.par4" className={s.par}>36</td>
                    <td data-edit="course.yards4" className={s.yards}>3,390</td>
                    <td data-edit="course.note4" className={s.note}>Total 72, 6,842 from the tips</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- LESSONS */}
        <section id="lessons" className={s.lessons} aria-labelledby="lessons-h">
          <div className={s.lessonsInner}>
            <div className={s.lessonsText}>
              <p data-edit="lessons.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Lessons and the range</p>
              <h2 data-edit="lessons.title" data-edit-max="60" id="lessons-h">Two pros, a range and a short-game yard</h2>
              <ul className={s.pros}>
                {PROS.map((p, i) => (
                  <li key={p.name} className={s.pro}>
                    <h3 data-edit={`lessons.proName.${i}`} data-edit-max="40" className={s.proName}>{p.name}</h3>
                    <p data-edit={`lessons.proRole.${i}`} data-edit-max="240" data-edit-multiline className={s.proRole}>{p.role}</p>
                    <p data-edit={`lessons.proNote.${i}`} data-edit-max="240" data-edit-multiline className={s.proNote}>{p.note}</p>
                  </li>
                ))}
              </ul>
              <dl className={s.priceList}>
                {LESSONS.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`lessons.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`lessons.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.range}>
              <div data-edit-pattern="lessons.field" data-edit-roles="transparent,2,3,4" className={s.rangeField} aria-hidden="true">
                <TabbiedPattern
                  pattern={bobbinet}
                  palette={DIMPLES}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={56}
                  seed="heron-dimples"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.rangeBoard}>
                <h3 data-edit="lessons.rangeTitle" data-edit-max="40" className={s.rangeTitle}>The range</h3>
                <p data-edit="lessons.rangeNote" data-edit-max="240" data-edit-multiline className={s.rangeNote}>Twenty-four bays, eight of them covered. Open 6:30 am until dusk.</p>
                <ul className={s.buckets}>
                  {BUCKETS.map((b, i) => (
                    <li key={b.size} className={s.bucket}>
                      <span data-edit={`lessons.bucketSize.${i}`} data-edit-max="60" className={s.bucketSize}>{b.size}</span>
                      <span data-edit={`lessons.bucketBalls.${i}`} data-edit-max="60" className={s.bucketBalls}>{b.balls}</span>
                      <span data-edit={`lessons.bucketPrice.${i}`} data-edit-max="60" className={s.bucketPrice}>{b.price}</span>
                    </li>
                  ))}
                </ul>
                <p data-edit="lessons.rangeFree" data-edit-max="240" data-edit-multiline className={s.rangeFree}>The putting green and the chipping yard are free to use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- CLUBHOUSE */}
        <section id="clubhouse" className={s.clubhouse} aria-labelledby="clubhouse-h">
          <span className={s.ball} aria-hidden="true">
            <TabbiedPattern
              pattern={bobbinet}
              palette={BALL}
              fit="grid"
              cellSize={44}
              seed="ball"
              style={{ position: 'absolute', inset: 0 }}
            />
          </span>
          <div className={s.secHead}>
            <p data-edit="clubhouse.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The clubhouse</p>
            <h2 data-edit="clubhouse.title" data-edit-max="60" id="clubhouse-h">Above the eighteenth green</h2>
          </div>
          <ul className={s.houseList}>
            {CLUBHOUSE.map((c, i) => (
              <li key={c.title} className={s.houseItem}>
                <span className={s.houseNo}>{String(i + 1).padStart(2, '0')}</span>
                <h3 data-edit={`clubhouse.houseTitle.${i}`} data-edit-max="40" className={s.houseTitle}>{c.title}</h3>
                <p data-edit={`clubhouse.houseBody.${i}`} data-edit-max="240" data-edit-multiline className={s.houseBody}>{c.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- RATES */}
        <section id="rates" className={s.rates} aria-labelledby="rates-h">
          <div className={s.ratesMown} aria-hidden="true">
            <TabbiedPattern
              pattern={hurdle}
              palette={STRIPES}
              fit="grid"
              cellSize={64}
              seed="rates-mown"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.ratesInner}>
            <div className={s.ratesText}>
              <p data-edit="rates.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Green fees</p>
              <h2 data-edit="rates.title" data-edit-max="60" id="rates-h">Rates for this season</h2>
              <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Twilight starts at 3 pm. Weekends include public holidays. Rental clubs are $30 a set.</p>
              <dl className={s.members}>
                {MEMBERS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`rates.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`rates.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.rateWrap}>
              <table className={s.rateTable}>
                <caption data-edit="rates.srOnly" className={s.srOnly}>Green fees by round and day</caption>
                <thead>
                  <tr>
                    <th data-edit="rates.heading" scope="col">Round</th>
                    <th data-edit="rates.heading2" scope="col">Weekday</th>
                    <th data-edit="rates.heading3" scope="col">Weekend</th>
                    <th data-edit="rates.heading4" scope="col">Twilight</th>
                  </tr>
                </thead>
                <tbody>
                  {RATES.map((r, i) => (
                    <tr key={r.round}>
                      <th data-edit={`rates.heading5.${i}`} scope="row">{r.round}</th>
                      <td data-edit={`rates.cell.${i}`}>{r.week}</td>
                      <td data-edit={`rates.cell2.${i}`}>{r.weekend}</td>
                      <td data-edit={`rates.cell3.${i}`}>{r.twilight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- TEE TIMES
            The green and its pond behind the whole section: the heading in
            the empty sky, the form standing on the water. */}
        <section id="tee" className={s.tee} aria-labelledby="tee-h">
          <div className={s.teeArt} aria-hidden="true">
            <Artwork
              slug="heron-point-golf-green"
              alt=""
              fit="cover"
              inks={['var(--ink)', 'var(--pale)']}
            />
          </div>
          <div className={s.teeInner}>
            <div className={s.teeText}>
              <p data-edit="tee.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Tee times</p>
              <h2 data-edit="tee.title" data-edit-max="60" id="tee-h">Book a time on the first tee</h2>
              <p data-edit="tee.teeLede" data-edit-max="240" data-edit-multiline className={s.teeLede}>Tee times open seven days ahead, fourteen for members. Pay at the pro shop when you check in.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="tee.label" htmlFor="hp-date">Day</label>
                <input id="hp-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="tee.label2" htmlFor="hp-time">Around</label>
                <select id="hp-time" name="time" defaultValue="Morning">
                  <option value="Early">Before 8 am</option>
                  <option value="Morning">Morning</option>
                  <option value="Midday">Midday</option>
                  <option value="Twilight">Twilight, after 3 pm</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="tee.label3" htmlFor="hp-players">Players</label>
                <select id="hp-players" name="players" defaultValue="4">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="tee.label4" htmlFor="hp-holes">Round</label>
                <select id="hp-holes" name="holes" defaultValue="18 walking">
                  <option value="18 walking">18 holes, walking</option>
                  <option value="18 cart">18 holes, with cart</option>
                  <option value="9 walking">9 holes, walking</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="tee.label5" htmlFor="hp-name">Name</label>
                <input id="hp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="tee.label6" htmlFor="hp-email">Email</label>
                <input id="hp-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <button data-edit="tee.formBtn" data-edit-max="24" className={s.formBtn} type="submit">Find a tee time</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footMown} aria-hidden="true">
          <TabbiedPattern
            pattern={hurdle}
            palette={MOWN}
            fit="grid"
            cellSize={24}
            seed="foot-mown"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Heron Point</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Public golf on the marsh road since 1964.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Find us</h2>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>1 Heron Point Road, at the end of the marsh road</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Pro shop</h2>
            <a data-edit="footer.footLink" data-edit-max="28" className={s.footLink} href="tel:+15550128840">(555) 012-8840</a>
            <a data-edit="footer.footLink2" data-edit-max="28" className={s.footLink} href="mailto:proshop@heronpoint.example">proshop@heronpoint.example</a>
          </div>
          <div>
            <h2 data-edit="footer.footHead3" data-edit-max="60" className={s.footHead}>Hours</h2>
            <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>First tee 6:30 am, last tee two hours before dusk</p>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional golf club. The course, people, prices and the address are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
