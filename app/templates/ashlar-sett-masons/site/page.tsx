import { TabbiedPattern } from 'tabbied/react';
import { cobblestone } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './ashlar-sett-masons.module.css';

export const metadata = {
  title: 'Ashlar & Sett: Stonemasons and dry-stone wallers, Hobb Lane yard',
  description:
    'Ashlar & Sett build and mend stone: dry-stone field walls by the meter, retaining walls, solid steps, granite setts and lime repairs to old buildings. Prices on the yard board, free site visits within 25 miles.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The cobbles
   are the yard's whole stock in one picture: limestone, slate and sandstone
   set in dark mortar. They build the field wall that runs under the hero,
   fill the battered section beside the method, run as a course between the
   sections and pave the lane in the footer. */
const LIME = '#e6dfd1';
const MORTAR = '#2a2622';
const SAND = '#a8622e';
const MOSS = '#5f6b45';
const SLATE = '#7d8a94';

const WALL = [MORTAR, LIME, SLATE, SAND, LIME, LIME];
const RUN = [MORTAR, SLATE, LIME, SAND, LIME, LIME];
const LANE = [MORTAR, SLATE, LIME, SLATE, MOSS, LIME];
const COURSE = ['transparent', SAND, LIME, SLATE, MOSS, LIME];

const NAV = [
  ['Price board', '#board'],
  ['How a wall goes up', '#wall'],
  ['Heritage', '#heritage'],
  ['Recent work', '#work'],
  ['The yard', '#yard'],
];

type Row = [string, string, string];

const BOARD: { group: string; note: string; rows: Row[] }[] = [
  {
    group: 'Dry-stone walls',
    note: 'Per linear meter, both faces built',
    rows: [
      ['Field wall to 1.0 m, your stone', 'per m', '$420'],
      ['Field wall to 1.4 m, your stone', 'per m', '$560'],
      ['Walling stone from our yard, add', 'per m', '$140'],
      ['Rebuilding a gap, 2 m minimum', 'per m', '$480'],
    ],
  },
  {
    group: 'Retaining and mortared',
    note: 'Drainage and footing included',
    rows: [
      ['Retaining wall to 1.0 m', 'per m', '$690'],
      ['Lime-mortared garden wall, coped', 'per m', '$610'],
      ['Gate piers, pair, with caps', 'per pair', '$2,400'],
    ],
  },
  {
    group: 'Steps',
    note: 'Solid stone, never a veneer',
    rows: [
      ['Block step, up to 1.2 m wide', 'per tread', '$380'],
      ['Steps cantilevered from a wall', 'per tread', '$520'],
      ['Stile through a field wall', 'each', '$650'],
    ],
  },
  {
    group: 'Setts and paving',
    note: 'Laid on a lime bed, joints swept',
    rows: [
      ['Granite setts, new', 'per m2', '$165'],
      ['Reclaimed cobbles', 'per m2', '$140'],
      ['Sawn flagstone terrace', 'per m2', '$120'],
    ],
  },
  {
    group: 'Heritage repairs',
    note: 'Lime only, matched stone',
    rows: [
      ['Raking out and lime repointing', 'per m2', '$95'],
      ['Re-setting loose coping', 'per m', '$70'],
      ['Carved sill, quoin or finial', 'from', '$650'],
    ],
  },
];

/* Bottom course first: the list is drawn as the wall, footing at the foot. */
const COURSES = [
  ['Strip and dig the footing', 'Turf and topsoil off, down to firm subsoil, a trench a little wider than the wall. Every stone is sorted by size along both sides before one is laid.'],
  ['Lay the foundation stones', 'The biggest, flattest stones go in first, long side into the wall, never along it. They carry everything above for the next hundred years.'],
  ['Set the batter frames', 'A timber frame at each end and lines between them: the wall leans in as it rises, 60 cm wide at the foot and 35 cm under the cover.'],
  ['Build the courses and hearting', 'Two faces climb together, each stone across two below it, and the middle is packed tight with small stone by hand. No mortar, no rubble thrown in.'],
  ['Lay the through stones', 'Halfway up, long stones run right through both faces every meter, tying the wall together so it cannot belly out.'],
  ['Cover band and coping', 'Flat cover stones close the top, and the coping stands on edge along it, tight enough to sit on and heavy enough that sheep do not shift it.'],
];

const SIGN = [
  ['Field wall, 1.4 m high', '$560', 'a meter'],
  ['Granite setts, laid', '$165', 'a square meter'],
  ['Solid stone steps', '$380', 'a tread'],
  ['Lime repointing', '$95', 'a square meter'],
];

const HERITAGE = [
  ['Lime, never cement', 'Old stone breathes through its joints. Hard cement mortar traps the water and the stone spalls around it. We rake it out and repoint in hot-mixed lime.'],
  ['Matched stone', 'Replacement stone comes from the same beds where it still can: our yard keeps reclaimed sandstone, limestone and slate sorted by quarry.'],
  ['The paperwork', 'For listed buildings and conservation areas we write the method statement, send samples to the officer and keep the photographic record.'],
];

const WORK = [
  ['Field wall rebuild', 'Hollins Farm, Wexcombe', '46 m at 1.4 m', '5 weeks'],
  ['Granite sett lane', 'Chapel Row, Old Harnby', '210 m2', '4 weeks'],
  ['Retaining wall and steps', 'A garden on Steep Hill', '18 m, 14 treads', '3 weeks'],
  ['Lime repointing', 'St Aldric Church tower', '320 m2', '7 weeks'],
  ['Gate piers and coping', 'The Old Rectory, Pellow', '2 piers, 22 m', '2 weeks'],
];

const YARD = [
  ['Walling stone, reclaimed', 'per tonne', '$210'],
  ['Granite setts, reclaimed', 'each', '$4'],
  ['Coping stones', 'per m', '$28'],
  ['Flagstones, mixed sizes', 'per m2', '$64'],
];

const HOURS = [
  ['Monday to Friday', '7:30-4:30'],
  ['Saturday', '8:00-12:00, yard only'],
  ['Sunday', 'Closed'],
];

const JOBS = ['Dry-stone wall', 'Retaining wall', 'Steps', 'Setts or paving', 'Heritage repair'];

export default function AshlarSettPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--lime': '#e6dfd1',
        '--mortar': '#2a2622',
        '--sand': '#a8622e',
        '--moss': '#5f6b45',
        '--slate': '#7d8a94',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="lime,mortar,sand,moss,slate"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=Barlow+Condensed:wght@600;700&family=Barlow:ital,wght@0,400;0,500;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Ashlar &amp; Sett</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Stonemasons and dry-stone wallers</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#contact">Book a site visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: the yard sign, and a field wall running the width of the page. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Hobb Lane stone yard, walling since 1994</p>
              <h1 data-edit="intro.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Stone laid to stand <span>another hundred years.</span>
              </h1>
              <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Dry-stone field walls, retaining walls, solid steps, granite setts
                and careful lime repairs to old buildings. Every price is on the
                board, and the person who quotes is the person who builds.
              </p>
              <div className={s.heroActions}>
                <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#board">Read the price board</a>
                <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#contact">Book a free site visit</a>
              </div>
            </div>

            <div className={s.sign}>
              <p data-edit="intro.signHead" data-edit-max="240" data-edit-multiline className={s.signHead}>On the board this month</p>
              <dl className={s.signList}>
                {SIGN.map(([item, price, unit], i) => (
                  <div key={item}>
                    <dt data-edit={`intro.term.${i}`} data-edit-max="28">{item}</dt>
                    <dd>
                      <strong data-edit={`intro.emphasis.${i}`}>{price}</strong>
                      <span data-edit={`intro.text2.${i}`} data-edit-max="60">{unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p data-edit="intro.signFoot" data-edit-max="240" data-edit-multiline className={s.signFoot}>Site visits within 25 miles are free.</p>
            </div>
          </div>

          <div className={s.run}>
            <span className={s.runCoping} aria-hidden="true" />
            <div data-edit-pattern="intro.field" data-edit-roles="1,4,0,2,0,0" className={s.runWall} aria-hidden="true">
              <TabbiedPattern pattern={cobblestone} palette={RUN} fit="grid" cellSize={44} seed="ashlar-run" style={{ position: 'absolute', inset: 0 }} />
            </div>
          </div>
        </section>

        {/* BOARD: the yard's painted price board. */}
        <section id="board" className={s.boardSec} aria-labelledby="board-h">
          <div className={s.secHead}>
            <p data-edit="board.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Prices for 2026</p>
            <h2 data-edit="board.secTitle" data-edit-max="60" id="board-h" className={s.secTitle}>The yard board</h2>
            <p data-edit="board.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The same board that hangs by the yard gate. Prices include labor,
              lime, sand and carting away the spoil. Barrow access is assumed;
              a crane or a long hand carry is quoted on the visit.
            </p>
          </div>
          <div className={s.board}>
            <div className={s.boardTop}>
              <p data-edit="board.boardName" data-edit-max="240" data-edit-multiline className={s.boardName}>Ashlar &amp; Sett</p>
              <p data-edit="board.boardYear" data-edit-max="240" data-edit-multiline className={s.boardYear}>Price list, January 2026</p>
            </div>
            <div className={s.boardGrid}>
              {BOARD.map((g, i) => (
                <table key={g.group} className={s.price}>
                  <caption data-edit={`board.priceGroup.${i}`} className={s.priceGroup}>{g.group}</caption>
                  <thead>
                    <tr>
                      <th data-edit={`board.priceNote.${i}`} scope="col" colSpan={3} className={s.priceNote}>{g.note}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map(([item, unit, price], i2) => (
                      <tr key={item}>
                        <th data-edit={`board.heading.${i}.${i2}`} scope="row">{item}</th>
                        <td data-edit={`board.unit.${i}.${i2}`} className={s.unit}>{unit}</td>
                        <td data-edit={`board.amount.${i}.${i2}`} className={s.amount}>{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
              <div className={s.boardAside}>
                <p data-edit="board.asideHead" data-edit-max="240" data-edit-multiline className={s.asideHead}>Not on the board?</p>
                <p data-edit="board.asideText" data-edit-max="240" data-edit-multiline className={s.asideText}>
                  Bread ovens, sheepfolds, mounting blocks, a single stone carved
                  with a house name. Ask, and we will chalk up a price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WALL: the method, drawn as the wall itself, footing at the foot. */}
        <section id="wall" className={s.sec} aria-labelledby="wall-h">
          <div className={s.wallGrid}>
            <div className={s.wallIntro}>
              <p data-edit="wall.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Method</p>
              <h2 data-edit="wall.secTitle" data-edit-max="60" id="wall-h" className={s.secTitle}>How a dry-stone wall goes up</h2>
              <p data-edit="wall.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                No mortar anywhere. A dry wall holds by weight, friction and the
                lean of its faces, so it flexes with the frost instead of cracking.
                Read it from the ground up.
              </p>
              <figure className={s.wallFig}>
                <div className={s.drawing}>
                  <span className={s.coping} aria-hidden="true" />
                  <div data-edit-pattern="wall.field" data-edit-roles="1,0,4,2,0,0" className={s.wallFace} aria-hidden="true">
                    <TabbiedPattern pattern={cobblestone} palette={WALL} fit="grid" cellSize={30} seed="ashlar-section" style={{ position: 'absolute', inset: 0 }} />
                  </div>
                  <span className={s.through} aria-hidden="true" />
                  <span className={s.dimLine} aria-hidden="true" />
                  <p data-edit="wall.dim" data-edit-max="240" data-edit-multiline className={s.dim}>1.4 m</p>
                </div>
                <figcaption data-edit="wall.caption" data-edit-max="120" data-edit-multiline className={s.caption}>The wall in section: 60 cm at the foot, 35 cm under the coping, tied by through stones halfway up.</figcaption>
              </figure>
              <dl className={s.wallFacts}>
                <div>
                  <dt data-edit="wall.term" data-edit-max="28">Stone per meter</dt>
                  <dd data-edit="wall.body" data-edit-max="200" data-edit-multiline>About one tonne at 1.4 m</dd>
                </div>
                <div>
                  <dt data-edit="wall.term2" data-edit-max="28">A good day</dt>
                  <dd data-edit="wall.body2" data-edit-max="200" data-edit-multiline>3-4 m by two wallers</dd>
                </div>
                <div>
                  <dt data-edit="wall.term3" data-edit-max="28">Best months</dt>
                  <dd data-edit="wall.body3" data-edit-max="200" data-edit-multiline>March to November</dd>
                </div>
              </dl>
            </div>
            <ol className={s.courses}>
              {COURSES.map(([title, text], i) => (
                <li key={title} className={s.course}>
                  <span className={s.courseNo}>{i + 1}</span>
                  <h3 data-edit={`wall.courseTitle.${i}`} data-edit-max="40" className={s.courseTitle}>{title}</h3>
                  <p data-edit={`wall.courseText.${i}`} data-edit-max="240" data-edit-multiline className={s.courseText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,0,4,3,0" className={s.courseBand} aria-hidden="true">
          <TabbiedPattern pattern={cobblestone} palette={COURSE} fit="grid" cellSize={46} seed="ashlar-course" style={{ position: 'absolute', inset: 0 }} />
        </div>

        {/* HERITAGE */}
        <section id="heritage" className={s.heritage} aria-labelledby="heritage-h">
          <div className={s.heritageInner}>
            <div className={s.heritageHead}>
              <p data-edit="heritage.heritageEyebrow" data-edit-max="240" data-edit-multiline className={s.heritageEyebrow}>Old buildings</p>
              <h2 data-edit="heritage.heritageTitle" data-edit-max="60" id="heritage-h" className={s.heritageTitle}>Heritage repairs</h2>
              <p data-edit="heritage.heritageLead" data-edit-max="240" data-edit-multiline className={s.heritageLead}>
                Churches, mills, farmhouses and the garden walls of listed houses.
                We repair the way they were built, so the next mason in eighty
                years can take our work out without harming theirs.
              </p>
            </div>
            <ul className={s.heritageList}>
              {HERITAGE.map(([title, text], i) => (
                <li key={title} className={s.heritageItem}>
                  <h3 data-edit={`heritage.heritageItemTitle.${i}`} data-edit-max="40" className={s.heritageItemTitle}>{title}</h3>
                  <p data-edit={`heritage.heritageText.${i}`} data-edit-max="240" data-edit-multiline className={s.heritageText}>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className={s.sec} aria-labelledby="work-h">
          <div className={s.secHead}>
            <p data-edit="work.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Recent work</p>
            <h2 data-edit="work.secTitle" data-edit-max="60" id="work-h" className={s.secTitle}>Off the yard this year</h2>
          </div>
          <div className={s.tableWrap}>
            <table className={s.work}>
              <caption data-edit="work.srOnly" className={s.srOnly}>Recent jobs with place, size and time on site</caption>
              <thead>
                <tr>
                  <th data-edit="work.heading" scope="col">Job</th>
                  <th data-edit="work.heading2" scope="col">Where</th>
                  <th data-edit="work.heading3" scope="col">Size</th>
                  <th data-edit="work.heading4" scope="col">On site</th>
                </tr>
              </thead>
              <tbody>
                {WORK.map(([job, where, size, time], i) => (
                  <tr key={job}>
                    <th data-edit={`work.heading5.${i}`} scope="row">{job}</th>
                    <td data-edit={`work.cell.${i}`}>{where}</td>
                    <td data-edit={`work.cell2.${i}`}>{size}</td>
                    <td data-edit={`work.cell3.${i}`}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* YARD AND CONTACT */}
        <section id="yard" className={s.sec} aria-labelledby="yard-h">
          <div className={s.yardGrid}>
            <div>
              <p data-edit="yard.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The yard</p>
              <h2 data-edit="yard.secTitle" data-edit-max="60" id="yard-h" className={s.secTitle}>Come and choose your stone</h2>
              <p data-edit="yard.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Reclaimed stone sorted by quarry and color, sold by the tonne to
                anyone building their own. Bring a trailer, or we deliver within
                25 miles for $60 a load.
              </p>
              <table className={s.stock}>
                <caption data-edit="yard.srOnly" className={s.srOnly}>Reclaimed stone for sale</caption>
                <tbody>
                  {YARD.map(([item, unit, price], i) => (
                    <tr key={item}>
                      <th data-edit={`yard.heading.${i}`} scope="row">{item}</th>
                      <td data-edit={`yard.cell.${i}`}>{unit}</td>
                      <td data-edit={`yard.cell2.${i}`}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="yard.term" data-edit-max="28">Yard</dt>
                  <dd data-edit="yard.body" data-edit-max="200" data-edit-multiline>Hobb Lane, Wexcombe, behind the old mill</dd>
                </div>
                <div>
                  <dt data-edit="yard.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="yard.body2" data-edit-max="200" data-edit-multiline>(555) 013-7720</dd>
                </div>
                <div>
                  <dt data-edit="yard.term3" data-edit-max="28">Email</dt>
                  <dd data-edit="yard.body3" data-edit-max="200" data-edit-multiline>yard@ashlarandsett.example</dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`yard.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`yard.body4.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form id="contact" className={s.form} action="#">
              <h3 data-edit="yard.formTitle" data-edit-max="40" className={s.formTitle}>Book a free site visit</h3>
              <p data-edit="yard.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Within 25 miles of the yard. We measure, look at the stone and send a written price within a week.</p>
              <div className={s.field}>
                <label data-edit="yard.label" htmlFor="as-name">Name</label>
                <input id="as-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="yard.label2" htmlFor="as-phone">Phone</label>
                <input id="as-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="yard.label3" htmlFor="as-where">Where is the job</label>
                <input id="as-where" name="where" type="text" autoComplete="street-address" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="yard.legend">What needs doing</legend>
                <div className={s.picks}>
                  {JOBS.map((j, i) => (
                    <div key={j} className={s.pick}>
                      <input id={`as-job-${i}`} type="checkbox" name="job" value={j} />
                      <label data-edit={`yard.label4.${i}`} htmlFor={`as-job-${i}`}>{j}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="yard.label5" htmlFor="as-length">Rough length, meters</label>
                <input id="as-length" name="length" type="number" min="0" />
              </div>
              <div className={s.field}>
                <label data-edit="yard.label6" htmlFor="as-email">Email</label>
                <input id="as-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="yard.label7" htmlFor="as-note">Tell us about it</label>
                <textarea id="as-note" name="note" rows={4} />
              </div>
              <button data-edit="yard.submit" data-edit-max="24" className={s.submit} type="submit">Send to the yard</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,4,0,4,3,0" className={s.footLane} aria-hidden="true">
          <TabbiedPattern pattern={cobblestone} palette={LANE} fit="grid" cellSize={34} seed="ashlar-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ashlar &amp; Sett</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional stonemasons. The names, jobs, prices and address are
            invented for this template.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
