import { TabbiedPattern } from 'tabbied/react';
import { protractor } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './benchmark-surveying.module.css';

export const metadata = {
  title: 'Benchmark Land Surveying: Boundary, topographic and elevation surveys, Quarry Road',
  description:
    'Benchmark Land Surveying finds and sets property corners, draws topographic surveys and signs FEMA elevation certificates for homeowners, builders and title companies in Ashby, Wren and Coldwater counties.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is
   a plat on blueprint: the parcel in the hero is cut out of the protractor
   field, half rings in chalk, flagging-tape orange, survey gold and sky,
   laid on a transparent ground so the blueprint shows between them. */
const BLUE = '#173a5c';
const CHALK = '#edf0e9';
const FLAG = '#ee6a35';
const GOLD = '#f1bf3d';
const SKY = '#7fb0d8';

const PARCEL = ['transparent', CHALK, FLAG, GOLD, SKY, FLAG];
const BAND = ['transparent', SKY, GOLD, CHALK, FLAG, SKY];
const STAKE = ['transparent', FLAG, GOLD, SKY, CHALK, GOLD];

const NAV = [
  ['Surveys', '#surveys'],
  ['Field to certificate', '#process'],
  ['Reading a plat', '#plat'],
  ['Questions', '#faq'],
  ['Order a survey', '#order'],
];

/* The lot in the hero, its calls read clockwise from the point of
   beginning. The degree sign is an escape: a design glyph, not prose. */
const CALLS = [
  { id: 'ab', bearing: 'N 79\u00B049\'12" E', dist: "221.80'" },
  { id: 'bc', bearing: 'S 09\u00B028\'05" E', dist: "187.31'" },
  { id: 'cd', bearing: 'S 68\u00B035\'40" W', dist: "153.42'" },
  { id: 'de', bearing: 'N 61\u00B011\'27" W', dist: "127.68'" },
  { id: 'ea', bearing: 'N 02\u00B017\'09" E', dist: "140.07'" },
];

type Survey = { name: string; shows: string; for: string; fee: string; time: string };

const SURVEYS: Survey[] = [
  { name: 'Boundary survey', shows: 'Every corner found or set, and a signed plat of the lines and anything that crosses them.', for: 'Fences, sales, a dispute with next door', fee: '$1,150', time: '2-3 weeks' },
  { name: 'Topographic survey', shows: 'One-foot contours, trees over six inches, utilities, spot elevations and the house as built.', for: 'Architects, additions, drainage design', fee: '$1,600', time: '3 weeks' },
  { name: 'Elevation certificate', shows: 'The FEMA form: lowest floor, adjacent grade and flood zone, signed and sealed.', for: 'Flood insurance, a lender, a map amendment', fee: '$475', time: '5-7 days' },
  { name: 'ALTA/NSPS title survey', shows: 'Boundary, easements, improvements and the Table A items your title company asks for.', for: 'Commercial sales and loans', fee: '$3,800', time: '4-5 weeks' },
  { name: 'Construction staking', shows: 'Building corners, offsets and finished grades marked in the field before the forms go in.', for: 'Builders and excavators', fee: '$95 / hr', time: '2 days notice' },
  { name: 'Lot split plat', shows: 'A recordable plat dividing one parcel in two, taken through the county review for you.', for: 'Selling or gifting part of a lot', fee: '$2,400', time: '6-8 weeks' },
];

const STATIONS = [
  ['Research', 'Deeds, old plats and the neighbors\' surveys pulled from the county recorder. Most boundary questions are answered on paper first.'],
  ['Find the evidence', 'A crew walks the lines looking for monuments: iron pins, stones, fence corners, old blazes. What we find outranks what the deed says.'],
  ['Measure', 'GNSS receivers tie the job to the state grid, and a robotic total station measures the rest to a few millimeters.'],
  ['Compute', 'The measurements are adjusted, then the deed, the plats and the monuments reconciled. Where they disagree, we call you before we decide.'],
  ['Set the corners', 'A missing corner gets a 5/8 inch iron rod with an orange cap stamped PLS 21874, and a flagged lath beside it so you can find it.'],
  ['Sign and seal', 'The plat is drafted, checked by a second surveyor, signed and sealed, and recorded at the county when the survey calls for it.'],
];

const LEGEND = [
  { mark: 'mIrf', term: 'IRF', means: 'Iron rod found. A monument already in the ground that we measured and accepted.' },
  { mark: 'mIrs', term: 'IRS', means: 'Iron rod set by us, 5/8 inch, capped and stamped with our license number.' },
  { mark: 'mPob', term: 'POB', means: 'Point of beginning. The description of the lot starts and ends here.' },
  { mark: 'mBrg', term: 'Bearing', means: 'The direction of a line, measured east or west from north or south, in degrees, minutes and seconds.' },
  { mark: 'mEase', term: 'Easement', means: 'A dashed line: a strip someone else may use, for a sewer, a power line or a shared drive.' },
  { mark: 'mBm', term: 'BM', means: 'Benchmark. A point of known elevation that the heights on a topographic survey hang from.' },
];

const FAQ = [
  ['Do I need a survey to build a fence?', 'Not by law here, but a fence a foot over the line is the most common dispute we are called to. A boundary survey with corners set costs less than moving a fence.'],
  ['Will you talk to my neighbor?', 'Yes, and we usually knock on their door before the crew arrives. We work for you, but the corners we set are the same for both of you.'],
  ['My deed says one thing and the fence says another.', 'That is what the research and the evidence are for. Long-standing fences and found monuments often control over a deed, and the plat will show both.'],
  ['Why not just use the county GIS map?', 'Parcel maps online are drawn for taxes, not boundaries, and can be off by twenty feet or more. Only a licensed survey locates a line.'],
];

const HOURS = [
  ['Office', 'Monday to Friday, 7:30-4:30'],
  ['Field crews', 'Out from first light, all year'],
  ['Staking requests', 'Two working days notice'],
];

export default function BenchmarkSurveyingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--blue': '#173a5c',
        '--chalk': '#edf0e9',
        '--flag': '#ee6a35',
        '--gold': '#f1bf3d',
        '--sky': '#7fb0d8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="blue,chalk,flag,gold,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,400;0,600;0,800;1,400&family=Overpass+Mono:wght@400;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDisk} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Benchmark</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Land Surveying, PLS 21874</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550127790">(555) 012-7790</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A plat of one lot: the parcel cut out of the protractor field,
            its calls lettered along each line, north up, scale below. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Licensed land surveyors, Ashby County, since 1998</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              We find the corners <span>and prove them.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Boundary, topographic and elevation surveys for homeowners,
              builders and title companies. Every corner set with a capped iron
              rod, every line tied to the state grid, every plat signed and
              sealed by a licensed surveyor.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#order">Order a survey</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#surveys">Survey types and fees</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Parcels surveyed</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>4,260</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Licensed surveyors</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>3</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Typical boundary</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>15 days</dd>
              </div>
            </dl>
          </div>

          <div className={s.platSheet}>
            <div className={s.plat}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,2" className={s.parcel} aria-hidden="true">
                <TabbiedPattern
                  pattern={protractor}
                  palette={PARCEL}
                  fit="grid"
                  cellSize={40}
                  seed="benchmark-parcel"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <svg className={s.lines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="6,22 84,8 95,74 44,94 4,72" />
                <polyline className={s.easement} points="30,90 60,87.7" />
              </svg>
              <span className={`${s.corner} ${s.cA}`} aria-hidden="true" />
              <span className={`${s.corner} ${s.cB}`} aria-hidden="true" />
              <span className={`${s.corner} ${s.cC}`} aria-hidden="true" />
              <span className={`${s.corner} ${s.cD}`} aria-hidden="true" />
              <span className={`${s.corner} ${s.cE}`} aria-hidden="true" />
              <p data-edit="hero.pob" data-edit-max="240" data-edit-multiline className={s.pob}>POB</p>
              {CALLS.map((c, i) => (
                <p key={c.id} className={`${s.call} ${s[c.id]}`}>
                  <span data-edit={`hero.callBearing.${i}`} data-edit-max="60" className={s.callBearing}>{c.bearing}</span>
                  <span data-edit={`hero.callDist.${i}`} data-edit-max="60" className={s.callDist}>{c.dist}</span>
                </p>
              ))}
              <div className={s.lotCard}>
                <p data-edit="hero.lotName" data-edit-max="240" data-edit-multiline className={s.lotName}>Lot 14, Block 3</p>
                <p data-edit="hero.lotSub" data-edit-max="240" data-edit-multiline className={s.lotSub}>Larkin Hollow Addition</p>
                <p data-edit="hero.lotArea" data-edit-max="240" data-edit-multiline className={s.lotArea}>1.06 acres</p>
                <p data-edit="hero.lotSub2" data-edit-max="240" data-edit-multiline className={s.lotSub}>46,170 sq ft</p>
              </div>
            </div>
            <div className={s.platFoot}>
              <p data-edit="hero.north" data-edit-max="240" data-edit-multiline className={s.north}>N</p>
              <p data-edit="hero.scale" data-edit-max="240" data-edit-multiline className={s.scale}>Scale: 1 inch = 40 feet</p>
              <p data-edit="hero.sheet" data-edit-max="240" data-edit-multiline className={s.sheet}>Sheet 1 of 1</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SURVEYS
            The survey types as a schedule on a sheet of vellum. */}
        <section id="surveys" className={s.vellum} aria-labelledby="surveys-h">
          <div className={s.vellumInner}>
            <div className={s.secHead}>
              <p data-edit="surveys.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Schedule A</p>
              <h2 data-edit="surveys.secTitle" data-edit-max="60" id="surveys-h" className={s.secTitle}>Which survey do you need?</h2>
              <p data-edit="surveys.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Fees are for a residential lot under two acres with a recorded
                plat. Rural land, missing records or heavy brush add time, and
                we tell you before we start, never after.
              </p>
            </div>
            <div className={s.tableWrap}>
              <table className={s.schedule}>
                <caption data-edit="surveys.srOnly" className={s.srOnly}>Survey types, what each shows, who needs it, fees and turnaround</caption>
                <thead>
                  <tr>
                    <th data-edit="surveys.heading" scope="col">Survey</th>
                    <th data-edit="surveys.heading2" scope="col">What you get</th>
                    <th data-edit="surveys.heading3" scope="col">Usually for</th>
                    <th data-edit="surveys.heading4" scope="col">Fee from</th>
                    <th data-edit="surveys.heading5" scope="col">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {SURVEYS.map((v, i) => (
                    <tr key={v.name}>
                      <th data-edit={`surveys.heading6.${i}`} scope="row">{v.name}</th>
                      <td data-edit={`surveys.cell.${i}`}>{v.shows}</td>
                      <td data-edit={`surveys.cell2.${i}`}>{v.for}</td>
                      <td data-edit={`surveys.fee.${i}`} className={s.fee}>{v.fee}</td>
                      <td data-edit={`surveys.time.${i}`} className={s.time}>{v.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- PROCESS
            A traverse: six stations from the recorder's office to the seal. */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <p data-edit="process.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Traverse</p>
            <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>From the field to a signed certificate</h2>
            <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A boundary survey is mostly research and arithmetic. The day
              with the tripods is one station of six.
            </p>
          </div>
          <ol className={s.stations}>
            {STATIONS.map(([title, text], i) => (
              <li key={title} className={s.station}>
                <h3 data-edit={`process.stationTitle.${i}`} data-edit-max="40" className={s.stationTitle}>{title}</h3>
                <p data-edit={`process.stationText.${i}`} data-edit-max="240" data-edit-multiline className={s.stationText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,3,1,2,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={protractor}
            palette={BAND}
            fit="grid"
            cellSize={48}
            seed="benchmark-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ PLAT
            The legend from the corner of every plat, explained. */}
        <section id="plat" className={s.sec} aria-labelledby="plat-h">
          <div className={s.secHead}>
            <p data-edit="plat.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Legend</p>
            <h2 data-edit="plat.secTitle" data-edit-max="60" id="plat-h" className={s.secTitle}>How to read the plat we hand you</h2>
            <p data-edit="plat.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every survey comes with a sheet like the one at the top of this
              page. These are the marks on it that clients ask about.
            </p>
          </div>
          <dl className={s.legend}>
            {LEGEND.map((l, i) => (
              <div key={l.term} className={s.legendRow}>
                <dt className={s.legendTerm}>
                  <span className={`${s.sym} ${s[l.mark]}`} aria-hidden="true" />
                  <span data-edit={`plat.legendWord.${i}`} data-edit-max="60" className={s.legendWord}>{l.term}</span>
                </dt>
                <dd data-edit={`plat.legendMeans.${i}`} data-edit-max="200" data-edit-multiline className={s.legendMeans}>{l.means}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqGrid}>
            <div className={s.faqSide}>
              <p data-edit="faq.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Before you call</p>
              <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Questions about lines</h2>
              <div className={s.detail}>
                <div data-edit-pattern="faq.field" data-edit-roles="transparent,2,3,4,1,3" className={s.disk} aria-hidden="true">
                  <TabbiedPattern
                    pattern={protractor}
                    palette={STAKE}
                    fit="grid"
                    cellSize={34}
                    seed="benchmark-disk"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit="faq.detailLabel" data-edit-max="240" data-edit-multiline className={s.detailLabel}>Detail A: a corner we set, seen from above</p>
              </div>
            </div>
            <dl className={s.faq}>
              {FAQ.map(([q, a], i) => (
                <div key={q} className={s.faqItem}>
                  <dt data-edit={`faq.faqQ.${i}`} data-edit-max="28" className={s.faqQ}>{q}</dt>
                  <dd data-edit={`faq.faqA.${i}`} data-edit-max="200" data-edit-multiline className={s.faqA}>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- ORDER
            The order form, and the office as a plat's title block. */}
        <section id="order" className={s.order} aria-labelledby="order-h">
          <div className={s.orderInner}>
            <div className={s.orderText}>
              <p data-edit="order.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Order</p>
              <h2 data-edit="order.secTitle" data-edit-max="60" id="order-h" className={s.secTitle}>Order a survey</h2>
              <p data-edit="order.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us the address and what the survey is for. We pull the
                records first and send a fixed quote within two working days.
              </p>
              <div className={s.titleBlock}>
                <div className={s.tbWide}>
                  <p data-edit="order.tbLabel" data-edit-max="240" data-edit-multiline className={s.tbLabel}>Office</p>
                  <p data-edit="order.tbValue" data-edit-max="240" data-edit-multiline className={s.tbValue}>406 Quarry Road, Fenwick</p>
                </div>
                <div className={s.tbWide}>
                  <p data-edit="order.tbLabel2" data-edit-max="240" data-edit-multiline className={s.tbLabel}>Email</p>
                  <p className={s.tbValue}>
                    <a data-edit="order.link" data-edit-max="28" href="mailto:orders@benchmarksurvey.example">orders@benchmarksurvey.example</a>
                  </p>
                </div>
                <div>
                  <p data-edit="order.tbLabel3" data-edit-max="240" data-edit-multiline className={s.tbLabel}>Phone</p>
                  <p className={s.tbValue}>
                    <a data-edit="order.link2" data-edit-max="28" href="tel:+15550127790">(555) 012-7790</a>
                  </p>
                </div>
                {HOURS.map(([label, value], i) => (
                  <div key={label}>
                    <p data-edit={`order.tbLabel4.${i}`} data-edit-max="240" data-edit-multiline className={s.tbLabel}>{label}</p>
                    <p data-edit={`order.tbValue2.${i}`} data-edit-max="240" data-edit-multiline className={s.tbValue}>{value}</p>
                  </div>
                ))}
                <div className={s.tbWide}>
                  <p data-edit="order.tbLabel5" data-edit-max="240" data-edit-multiline className={s.tbLabel}>Service area</p>
                  <p data-edit="order.tbValue3" data-edit-max="240" data-edit-multiline className={s.tbValue}>Ashby, Wren and Coldwater counties, no trip charge. Beyond them, $1.10 a mile.</p>
                </div>
              </div>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="order.label" htmlFor="bm-name">Your name</label>
                <input id="bm-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label2" htmlFor="bm-phone">Phone</label>
                <input id="bm-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="order.label3" htmlFor="bm-email">Email</label>
                <input id="bm-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="order.label4" htmlFor="bm-address">Property address or parcel number</label>
                <input id="bm-address" name="address" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label5" htmlFor="bm-type">Survey</label>
                <select id="bm-type" name="type" defaultValue="unsure">
                  <option value="boundary">Boundary survey</option>
                  <option value="topo">Topographic survey</option>
                  <option value="elevation">Elevation certificate</option>
                  <option value="alta">ALTA/NSPS title survey</option>
                  <option value="staking">Construction staking</option>
                  <option value="split">Lot split plat</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="order.label6" htmlFor="bm-date">Needed by</label>
                <input id="bm-date" name="date" type="date" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="order.label7" htmlFor="bm-note">What is the survey for?</label>
                <textarea id="bm-note" name="note" rows={4} />
              </div>
              <button data-edit="order.submit" data-edit-max="24" className={s.submit} type="submit">Send for a quote</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,4,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={protractor}
            palette={PARCEL}
            fit="grid"
            cellSize={32}
            seed="benchmark-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Benchmark Land Surveying</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional business: the surveyors, license number, prices, parcels
            and address are invented, and nothing here is a survey or legal advice.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
