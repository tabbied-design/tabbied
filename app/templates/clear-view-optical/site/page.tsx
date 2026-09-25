import { TabbiedPattern } from 'tabbied/react';
import { gimbal, recession } from 'tabbied/patterns';
import s from './clear-view-optical.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Clear View Optical: Optician and eyewear, Linden Row',
  description:
    'Clear View Optical on Linden Row: eye exams with retinal photographs included, frames chosen by face shape, lenses priced plainly, and most vision plans billed for you.',
};

/* Site colors. Both fields sit on `transparent`: the dots on the pale
   stage behind the chart, the lenses on the pale card tops. */
const INK = '#121821';
const BLUE = '#2D5BFF';
const AMBER = '#F2A541';
const GRAY = '#8B93A1';

const STAGE = ['transparent', BLUE, GRAY, AMBER];
const LENSES = ['transparent', BLUE, AMBER, INK];

const NAV = [
  ['Frames', '#frames'],
  ['Eye exams', '#exams'],
  ['Prices', '#prices'],
  ['Insurance', '#insurance'],
  ['Book', '#book'],
];

/* The chart above and below the headline: letters only, for the eye. */
const CHART_TOP = [
  { acuity: '20/200', letters: 'E', size: '1' },
  { acuity: '20/100', letters: 'F P', size: '2' },
  { acuity: '20/70', letters: 'T O Z', size: '3' },
  { acuity: '20/50', letters: 'L P E D', size: '4' },
];

const CHART_BOTTOM = [
  { acuity: '20/25', letters: 'E D F C Z P', size: '7' },
  { acuity: '20/20', letters: 'F E L O P Z D', size: '8' },
  { acuity: '20/15', letters: 'D E F P O T E C', size: '9' },
];

type Face = {
  shape: string;
  rule: string;
  art: string;
  /* The layer inks, by key color: which part each is depends on the picture. */
  red: string;
  blue: string;
  frames: { name: string; material: string; price: string }[];
};

const FACES: Face[] = [
  {
    shape: 'Round face',
    rule: 'Angles add definition. An upswept cat-eye or a square front lifts the cheekbones.',
    art: 'clear-view-optical-cateye',
    red: 'var(--blue)',
    blue: 'var(--ink)',
    frames: [
      { name: 'Mireille', material: 'Cat-eye, acetate', price: '$168' },
      { name: 'Harlow', material: 'Rectangle, acetate', price: '$148' },
      { name: 'Juno', material: 'Browline, metal and acetate', price: '$182' },
    ],
  },
  {
    shape: 'Square face',
    rule: 'Curves soften a strong jaw. Round and oval fronts with a thin rim.',
    art: 'clear-view-optical-round',
    red: 'var(--amber)',
    blue: 'var(--ink)',
    frames: [
      { name: 'Arlo', material: 'Round, titanium', price: '$210' },
      { name: 'Pim', material: 'Panto, acetate', price: '$138' },
      { name: 'Ode', material: 'Oval, metal', price: '$156' },
    ],
  },
  {
    shape: 'Heart face',
    rule: 'Weight at the bottom balances a wide brow. Aviators, and temples set low.',
    art: 'clear-view-optical-sun',
    red: 'var(--ink)',
    blue: 'var(--blue)',
    frames: [
      { name: 'Colt', material: 'Aviator, metal', price: '$174' },
      { name: 'Sable', material: 'Soft square, acetate', price: '$152' },
      { name: 'Wren', material: 'Rimless, titanium', price: '$235' },
    ],
  },
  {
    shape: 'Oval face',
    rule: 'Most shapes suit. This is the face that can go oversized, or bold in color.',
    art: 'clear-view-optical-round',
    red: 'var(--ink)',
    blue: 'var(--blue)',
    frames: [
      { name: 'Otto', material: 'Oversized square, acetate', price: '$164' },
      { name: 'Nell', material: 'Geometric, metal', price: '$172' },
      { name: 'Bea', material: 'Round, acetate', price: '$142' },
    ],
  },
];

const EXAMS = [
  { name: 'Comprehensive eye exam', time: '40 min', price: '$95', note: 'For glasses, and a health check of the whole eye.' },
  { name: 'Contact lens exam', time: '30 min', price: '$65', note: 'Fitting, a trial pair, and a follow-up a week later.' },
  { name: "Children's eye exam", time: '30 min', price: '$60', note: 'Under 16. Picture charts for the youngest.' },
  { name: 'Dry eye assessment', time: '30 min', price: '$70', note: 'For gritty, tired or watering eyes, with a plan.' },
];

const STEPS = [
  { t: 'A conversation', b: 'Your eyes, your work, how long you spend on screens, and anything that has changed.' },
  { t: 'The chart', b: 'Distance and near, each eye on its own and then both together.' },
  { t: 'Refraction', b: 'Better with one or with two? This is where the prescription comes from.' },
  { t: 'Eye pressure', b: 'A quick check for glaucoma, without the puff of air.' },
  { t: 'Retinal photographs', b: 'Included in every exam. For most people, no drops and no blurry drive home.' },
  { t: 'The results', b: 'We show you the pictures, explain the numbers, and print you a copy to keep.' },
];

const LENSES_PRICES = [
  ['Single vision, anti-glare', 'Included with any frame', '$60 alone'],
  ['Progressive, anti-glare', 'Distance, desk and reading', '$220'],
  ['Thin and light, 1.67 index', 'For strong prescriptions', '+$80'],
  ['Blue light filter', 'For long screen days', '+$40'],
  ['Light-reactive', 'Clear inside, tinted in sun', '+$110'],
  ['Prescription sun tint', 'Gray, brown or green', '+$50'],
];

const PLANS = [
  'Lumen Vision Plan',
  'Northstar Health',
  'Keystone Benefits',
  'Maple Mutual',
  'Harbor County Vision',
  'Brightline Dental and Vision',
];

const HOURS = [
  ['Monday-Wednesday', '9-6'],
  ['Thursday', '9-8'],
  ['Friday', '9-6'],
  ['Saturday', '9-4'],
  ['Sunday', 'Closed'],
];

export default function ClearViewOpticalPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork slug="clear-view-optical-round" alt="" inks={{ red: 'var(--ink)', blue: 'var(--blue)' }} className={s.markArt} />
          <span>Clear View Optical</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#book">Book an exam</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A letter chart on a dotted stage, the headline set as two of its
            lines, and a pair of glasses put down on the corner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.stage}>
            <div className={s.stageField} aria-hidden="true">
              <TabbiedPattern
                pattern={recession}
                palette={STAGE}
                fit="grid"
                cellSize={34}
                seed="clear-view-stage"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.chart}>
              {CHART_TOP.map((row, i) => (
                <div key={row.acuity} className={s.row} data-size={row.size} aria-hidden="true">
                  <span className={s.acuity}>{row.acuity}</span>
                  <span className={s.letters}>{row.letters}</span>
                  <span className={s.lineNo}>{String(i + 1)}</span>
                </div>
              ))}
              <div className={s.row} data-size="5">
                <span className={s.acuity} aria-hidden="true">20/40</span>
                <h1 id="hero-h" className={s.title}>
                  See far, read close,
                  <br />
                  <em>and like the frames.</em>
                </h1>
                <span className={s.lineNo} aria-hidden="true">5</span>
              </div>
              {CHART_BOTTOM.map((row, i) => (
                <div key={row.acuity} className={s.row} data-size={row.size} aria-hidden="true">
                  <span className={s.acuity}>{row.acuity}</span>
                  <span className={s.letters}>{row.letters}</span>
                  <span className={s.lineNo}>{String(i + 7)}</span>
                </div>
              ))}
              <div className={s.duo} aria-hidden="true">
                <span className={s.duoBlue}>C O Z</span>
                <span className={s.duoAmber}>C O Z</span>
              </div>
            </div>
            <Artwork
              slug="clear-view-optical-round"
              alt="A pair of round glasses set down on the chart"
              inks={{ red: 'var(--ink)', blue: 'var(--blue)' }}
              className={s.heroGlasses}
            />
          </div>

          <div className={s.heroText}>
            <p className={s.kicker}>Optician and eyewear, 14 Linden Row</p>
            <p className={s.lede}>
              An eye exam that takes its time, retinal photographs included,
              and four hundred frames to try on afterwards. We fit them to
              your face and your prescription, and bill most vision plans for
              you.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Book an eye exam</a>
              <a className={s.btnLine} href="#frames">Find frames for your face</a>
            </div>
            <dl className={s.today}>
              <div>
                <dt>Open today</dt>
                <dd>9 am-6 pm</dd>
              </div>
              <div>
                <dt>Next free exam</dt>
                <dd>Today, 2:15 pm</dd>
              </div>
              <div>
                <dt>Glasses ready in</dt>
                <dd>7-10 days</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- FRAMES */}
        <section id="frames" className={s.frames} aria-labelledby="frames-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Frames</p>
            <h2 id="frames-h">Start with the shape of your face</h2>
            <p className={s.secNote}>
              A rule of thumb, not a rule: the frame should echo what your face
              does not. Try any of them on in the shop, and we measure your
              bridge and pupil distance for free.
            </p>
          </div>
          <ul className={s.faces}>
            {FACES.map((f) => (
              <li key={f.shape} className={s.face}>
                <div className={s.faceTop}>
                  <div className={s.faceField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={gimbal}
                      palette={LENSES}
                      fit="grid"
                      cellSize={52}
                      seed={`clear-view-${f.shape}`}
                      options={{ frequency: 0.3 }}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <Artwork slug={f.art} alt="" inks={{ red: f.red, blue: f.blue }} className={s.faceArt} />
                </div>
                <div className={s.faceBody}>
                  <h3>{f.shape}</h3>
                  <p className={s.faceRule}>{f.rule}</p>
                  <ul className={s.frameList}>
                    {f.frames.map((fr) => (
                      <li key={fr.name}>
                        <strong>{fr.name}</strong>
                        <span className={s.frameMat}>{fr.material}</span>
                        <span className={s.framePrice}>{fr.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <p className={s.framesNote}>
            Every frame price includes single-vision lenses with anti-glare.
            Bring your own frame and we will glaze it for the lens price alone.
          </p>
        </section>

        {/* ----------------------------------------------------------- EXAMS */}
        <section id="exams" className={s.exams} aria-labelledby="exams-h">
          <div className={s.examsInner}>
            <div className={s.secHead}>
              <p className={s.secKick}>Eye exams</p>
              <h2 id="exams-h">Forty minutes, and nothing rushed</h2>
              <p className={s.secNote}>
                Every exam is with an optometrist, not a machine, and every
                one includes photographs of the back of the eye.
              </p>
            </div>
            <div className={s.examsGrid}>
              <ol className={s.steps}>
                {STEPS.map((st, i) => (
                  <li key={st.t}>
                    <span className={s.stepNo}>{String(i + 1).padStart(2, '0')}</span>
                    <h3>{st.t}</h3>
                    <p>{st.b}</p>
                  </li>
                ))}
              </ol>
              <ul className={s.examList}>
                {EXAMS.map((e) => (
                  <li key={e.name}>
                    <h3>{e.name}</h3>
                    <span className={s.examTime}>{e.time}</span>
                    <strong className={s.examPrice}>{e.price}</strong>
                    <p>{e.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- SUN */}
        <section className={s.sun} aria-labelledby="sun-h">
          <div className={s.sunInner}>
            <Artwork
              slug="clear-view-optical-sun"
              alt="A pair of sunglasses"
              inks={{ red: 'var(--ink)', blue: 'var(--blue)' }}
              className={s.sunArt}
            />
            <div className={s.sunText}>
              <p className={s.sunKick}>Prescription sun</p>
              <h2 id="sun-h">Any frame in the shop, made into sunglasses</h2>
              <p>
                Gray, brown or green tints, polarized for driving and water,
                from $180 with single-vision lenses. A second pair within 30
                days of the first is 40% off.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.prices} aria-labelledby="prices-h">
          <div className={s.pricesGrid}>
            <div>
              <div className={s.secHead}>
                <p className={s.secKick}>Prices</p>
                <h2 id="prices-h">Lenses, priced plainly</h2>
                <p className={s.secNote}>
                  The frame price includes basic lenses. Anything more is
                  added on, and written on your quote before you pay.
                </p>
              </div>
              <table className={s.lensTable}>
                <caption className={s.srOnly}>Lens prices</caption>
                <thead>
                  <tr>
                    <th scope="col">Lens</th>
                    <th scope="col">For</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {LENSES_PRICES.map(([lens, what, price]) => (
                    <tr key={lens}>
                      <th scope="row">{lens}</th>
                      <td>{what}</td>
                      <td className={s.lensPrice}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section id="insurance" className={s.insurance} aria-labelledby="insurance-h">
              <p className={s.secKick}>Insurance</p>
              <h2 id="insurance-h" className={s.insHead}>We bill these plans for you</h2>
              <ul className={s.plans}>
                {PLANS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className={s.insNote}>
                Bring your member card to the exam. On another plan? We give
                you an itemized receipt to claim yourself. FSA and HSA cards
                are welcome.
              </p>
              <Artwork
                slug="clear-view-optical-cateye"
                alt=""
                inks={{ red: 'var(--amber)', blue: 'var(--ink)' }}
                className={s.insArt}
              />
            </section>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInner}>
            <div className={s.bookInfo}>
              <p className={s.secKick}>Book</p>
              <h2 id="book-h">Book an eye exam</h2>
              <p className={s.bookLede}>
                Pick a day and a time of day and we will call or write to
                confirm the exact slot. Same-week appointments are usual.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.addr}>14 Linden Row, next to the post office. Step-free, with parking behind the shop.</p>
              <ul className={s.contact}>
                <li>
                  <a href="tel:+15550134478">(555) 013-4478</a>
                </li>
                <li>
                  <a href="mailto:hello@clearviewoptical.example">hello@clearviewoptical.example</a>
                </li>
              </ul>
            </div>

            <form className={s.form} action="#">
              <label className={s.field}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span>Phone</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={`${s.field} ${s.wide}`}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={`${s.field} ${s.wide}`}>
                <span>Exam</span>
                <select name="exam" defaultValue="comprehensive">
                  <option value="comprehensive">Comprehensive eye exam, $95</option>
                  <option value="contacts">Contact lens exam, $65</option>
                  <option value="child">Children's eye exam, $60</option>
                  <option value="dry">Dry eye assessment, $70</option>
                </select>
              </label>
              <label className={s.field}>
                <span>Preferred day</span>
                <input type="date" name="day" />
              </label>
              <label className={s.field}>
                <span>Time of day</span>
                <select name="when" defaultValue="morning">
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Thursday evening</option>
                </select>
              </label>
              <label className={`${s.field} ${s.wide}`}>
                <span>Vision plan, if any</span>
                <input type="text" name="plan" />
              </label>
              <button className={s.btn} type="submit">Request the appointment</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Clear View Optical</p>
          <p className={s.footTag}>Eye exams and eyewear, 14 Linden Row.</p>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p>A fictional optician. Prices, plans and hours are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
