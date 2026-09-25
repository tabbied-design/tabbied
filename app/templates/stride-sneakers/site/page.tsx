import { TabbiedPattern } from 'tabbied/react';
import { bias, damier, dimetric, mixtape, quaver, sheared } from 'tabbied/patterns';
import s from './stride-sneakers.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Stride: Sneaker store and release calendar, Dock Row',
  description:
    'Stride sells court, running and canvas sneakers on Dock Row. See the release calendar, shop what is on the wall, check your size and enter the raffle for Saturday drops.',
};

/* Site colors. A sneaker is cut out of a pattern whose first color is the
   upper itself; the photograph's shading is laid back over it. */
const INK = '#121212';
const FLAME = '#FF4F1F';
const COBALT = '#2D6CDF';
const PALE = '#DEDED9';

const HERO_FILL = [FLAME, INK, PALE, COBALT];
const DROP_FILL = [PALE, INK, FLAME, COBALT];
const COURT_FILL = [COBALT, PALE, INK, FLAME];
const RUN_FILL = [FLAME, PALE, INK];
const STRIPE = ['transparent', INK, FLAME, COBALT];

const NAV = [
  ['Drops', '#drops'],
  ['Shop', '#shop'],
  ['Sizes', '#sizes'],
  ['Raffle', '#raffle'],
  ['Store', '#store'],
];

type Day = {
  wd: string;
  d: string;
  note?: string;
  drop?: {
    name: string;
    color: string;
    price: string;
    how: string;
    art: string;
    design: typeof sheared;
  };
};

const DAYS: Day[] = [
  {
    wd: 'Thu',
    d: '01',
    drop: { name: 'Pace Runner', color: 'Signal', price: '$130', how: 'First come, online 9 am', art: 'stride-sneakers-runner', design: dimetric },
  },
  { wd: 'Fri', d: '02' },
  {
    wd: 'Sat',
    d: '03',
    drop: { name: 'Court High', color: 'Ember', price: '$140', how: 'Raffle, in store 10 am', art: 'stride-sneakers-hightop', design: sheared },
  },
  { wd: 'Sun', d: '04' },
  { wd: 'Mon', d: '05', note: 'Closed' },
  { wd: 'Tue', d: '06', note: 'Restock' },
  { wd: 'Wed', d: '07' },
  {
    wd: 'Thu',
    d: '08',
    drop: { name: 'Deck Slip', color: 'Check', price: '$75', how: 'First come, in store', art: 'stride-sneakers-slipon', design: damier },
  },
  { wd: 'Fri', d: '09' },
  {
    wd: 'Sat',
    d: '10',
    drop: { name: 'Court High', color: 'Cobalt', price: '$140', how: 'Raffle, entries from Mon', art: 'stride-sneakers-hightop', design: mixtape },
  },
  { wd: 'Sun', d: '11' },
  { wd: 'Mon', d: '12', note: 'Closed' },
  { wd: 'Tue', d: '13' },
  { wd: 'Wed', d: '14' },
];

type Shoe = {
  name: string;
  color: string;
  price: string;
  sizes: string;
  art: string;
  shape: string;
  design: typeof sheared;
};

const COURT: Shoe[] = [
  { name: 'Court High', color: 'Chalk', price: '$140', sizes: 'US 7-13, most halves', art: 'stride-sneakers-hightop', shape: 'hightop', design: quaver },
  { name: 'Deck Slip', color: 'Harbor', price: '$75', sizes: 'US 5-12, whole sizes', art: 'stride-sneakers-slipon', shape: 'slipon', design: damier },
  { name: 'Court High', color: 'Static', price: '$140', sizes: 'US 8-11 only', art: 'stride-sneakers-hightop', shape: 'hightop', design: mixtape },
  { name: 'Deck Slip', color: 'Pennant', price: '$75', sizes: 'US 6-12, whole sizes', art: 'stride-sneakers-slipon', shape: 'slipon', design: bias },
];

const RUN: Shoe[] = [
  { name: 'Pace Runner', color: 'Tempo', price: '$130', sizes: 'US 7-14, all halves', art: 'stride-sneakers-runner', shape: 'runner', design: dimetric },
  { name: 'Pace Runner', color: 'Split', price: '$130', sizes: 'US 7-12, all halves', art: 'stride-sneakers-runner', shape: 'runner', design: sheared },
];

const SIZE_ROWS = [
  { label: 'US men', values: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'] },
  { label: 'US women', values: ['8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5'] },
  { label: 'UK', values: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'] },
  { label: 'EU', values: ['40', '40.5', '41', '42', '42.5', '43', '44', '44.5', '45', '45.5', '46'] },
  { label: 'Foot, cm', values: ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30'] },
];

const FIT = [
  { name: 'Court High', note: 'True to size. Wide feet, go up half a size; the toe box is narrow until it breaks in.' },
  { name: 'Pace Runner', note: 'Runs small. Go up half a size, a full size if you run long in them.' },
  { name: 'Deck Slip', note: 'Whole sizes only. Between sizes, go down: canvas gives.' },
];

const RULES = [
  { t: 'One entry each', b: 'One entry per person per drop. Two entries with the same name, address or card are both removed before the draw.' },
  { t: 'Monday to Thursday', b: 'Entries open Monday at 10 am and close Thursday at 8 pm before a Saturday drop.' },
  { t: 'Friday at noon', b: 'We draw by computer, on camera, and post the video. Winners get an email and a text by 2 pm.' },
  { t: '24 hours to pay', b: 'Pay by the link in the email within a day, or the pair goes to the next name on the list.' },
  { t: 'Collect or ship', b: 'Collect in store from 10 am Saturday with the ID on your entry, or ship for $12.' },
  { t: 'No resale bots', b: 'Staff and their households cannot enter, and neither can any address we have seen on a resale listing.' },
];

const HOURS = [
  ['Tuesday to Friday', '11 am to 8 pm'],
  ['Saturday', '10 am to 8 pm'],
  ['Sunday', '12 to 6 pm'],
  ['Monday', 'Closed'],
];

export default function StrideSneakersPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@400;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Stride</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barNext}>Next drop Sat 10 am</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            This Saturday's pair, huge, on a half court. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.tag}>
              <span>Drop 14</span>
              <span>Sat Oct 3</span>
              <span>10:00 am</span>
            </p>
            <h1 className={s.title} id="hero-h">
              Court High <em>Ember</em>
            </h1>
            <p className={s.lede}>
              A leather high-top in rust and black, 180 pairs, sizes 4 to 14.
              Raffle entries close Thursday at 8 pm; winners collect in store
              from 10 on Saturday morning.
            </p>
            <dl className={s.stats}>
              <div>
                <dt>Price</dt>
                <dd>$140</dd>
              </div>
              <div>
                <dt>Pairs</dt>
                <dd>180</dd>
              </div>
              <div>
                <dt>Method</dt>
                <dd>Raffle</dd>
              </div>
            </dl>
            <div className={s.actions}>
              <a className={s.btn} href="#raffle">Enter the raffle</a>
              <a className={s.btnLine} href="#drops">See the calendar</a>
            </div>
          </div>
          <div className={s.court}>
            <span className={s.courtLines} aria-hidden="true" />
            <Artwork slug="stride-sneakers-hightop" alt="The Court High in the Ember colorway, seen from the side" mode="fill" inks={[]} className={s.heroShoe}>
              <TabbiedPattern
                pattern={sheared}
                palette={HERO_FILL}
                fit="grid"
                cellSize={36}
                seed="court-high-ember"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
            <span className={s.courtNo} aria-hidden="true">14</span>
          </div>
        </section>

        {/* ----------------------------------------------------------- DROPS
            Two weeks as a strip: every day a column, drop days wide. */}
        <section id="drops" className={s.drops} aria-labelledby="drops-h">
          <div className={s.dropsHead}>
            <h2 id="drops-h">Drop calendar</h2>
            <p className={s.dropsMonth}>October, weeks 1 and 2</p>
            <p className={s.dropsNote}>
              Raffle drops are collected in store on Saturday. First-come drops
              go live online at 9 am and on the wall when we open.
            </p>
          </div>
          <div className={s.strip}>
            <ol className={s.days}>
              {DAYS.map((day) => (
                <li key={day.d} className={day.drop ? `${s.day} ${s.dropDay}` : s.day}>
                  <span className={s.wd}>{day.wd}</span>
                  <span className={s.dd}>{day.d}</span>
                  {day.note && <span className={s.dayNote}>{day.note}</span>}
                  {day.drop && (
                    <div className={s.dropBody}>
                      <Artwork slug={day.drop.art} alt={`${day.drop.name} ${day.drop.color}`} mode="fill" inks={[]} className={s.dropShoe}>
                        <TabbiedPattern
                          pattern={day.drop.design}
                          palette={DROP_FILL}
                          fit="grid"
                          cellSize={24}
                          seed={day.d}
                          style={{ position: 'absolute', inset: 0 }}
                        />
                      </Artwork>
                      <strong className={s.dropName}>{day.drop.name}</strong>
                      <span className={s.dropColor}>{day.drop.color}</span>
                      <span className={s.dropPrice}>{day.drop.price}</span>
                      <span className={s.dropHow}>{day.drop.how}</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <p className={s.swipe}>Swipe the strip for all fourteen days</p>
        </section>

        {/* ------------------------------------------------------------ SHOP */}
        <section id="shop" className={s.shop} aria-labelledby="shop-h">
          <div className={s.secHead}>
            <p className={s.secNo}>02</p>
            <h2 id="shop-h">On the wall now</h2>
            <p className={s.secNote}>
              In store and online. Try any pair on; we lace them for you. Free
              returns within 30 days, unworn and in the box.
            </p>
          </div>
          <ul className={s.shoes}>
            {COURT.map((sh) => (
              <li key={sh.color} className={s.shoe}>
                <div className={s.shoeArt}>
                  <Artwork slug={sh.art} alt={`${sh.name} in ${sh.color}`} mode="fill" inks={[]} className={`${s.shoePic} ${s[sh.shape]}`}>
                    <TabbiedPattern
                      pattern={sh.design}
                      palette={COURT_FILL}
                      fit="grid"
                      cellSize={30}
                      seed={sh.color}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                </div>
                <div className={s.shoeCap}>
                  <h3>{sh.name}</h3>
                  <span className={s.shoePrice}>{sh.price}</span>
                  <span className={s.shoeColor}>{sh.color}</span>
                  <span className={s.shoeSizes}>{sh.sizes}</span>
                </div>
              </li>
            ))}
            {RUN.map((sh) => (
              <li key={sh.color} className={s.shoe}>
                <div className={s.shoeArt}>
                  <Artwork slug={sh.art} alt={`${sh.name} in ${sh.color}`} mode="fill" inks={[]} className={`${s.shoePic} ${s[sh.shape]}`}>
                    <TabbiedPattern
                      pattern={sh.design}
                      palette={RUN_FILL}
                      fit="grid"
                      cellSize={30}
                      seed={sh.color}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                </div>
                <div className={s.shoeCap}>
                  <h3>{sh.name}</h3>
                  <span className={s.shoePrice}>{sh.price}</span>
                  <span className={s.shoeColor}>{sh.color}</span>
                  <span className={s.shoeSizes}>{sh.sizes}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- SIZES */}
        <section id="sizes" className={s.sizes} aria-labelledby="sizes-h">
          <div className={s.secHead}>
            <p className={s.secNo}>03</p>
            <h2 id="sizes-h">Size guide</h2>
            <p className={s.secNote}>
              Stand on a sheet of paper, heel to the wall, and mark your longest
              toe. That length in centimeters is the bottom row. Between two
              sizes, read the fit notes.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.sizeTable}>
              <caption>Sneaker sizes across systems, by foot length</caption>
              <tbody>
                {SIZE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((v) => (
                      <td key={v}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={s.fit}>
            {FIT.map((f) => (
              <li key={f.name}>
                <strong>{f.name}</strong>
                <span>{f.note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- RAFFLE */}
        <section id="raffle" className={s.raffle} aria-labelledby="raffle-h">
          <div className={s.raffleBand} aria-hidden="true">
            <TabbiedPattern
              pattern={sheared}
              palette={STRIPE}
              fit="grid"
              cellSize={36}
              seed="raffle-band"
              options={{ frequency: 0.7 }}
              redrawInterval={7000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.raffleInner}>
            <div className={s.raffleRules}>
              <p className={s.secNo}>04</p>
              <h2 id="raffle-h">Raffle rules</h2>
              <p className={s.raffleLede}>
                Every limited pair goes by raffle, so nobody has to sleep on
                the pavement. Six rules, no exceptions, and the draw is filmed.
              </p>
              <ol className={s.rules}>
                {RULES.map((r) => (
                  <li key={r.t}>
                    <strong>{r.t}</strong>
                    <span>{r.b}</span>
                  </li>
                ))}
              </ol>
            </div>
            <form className={s.form} action="#">
              <h3 className={s.formTitle}>Enter: Court High Ember</h3>
              <p className={s.formSub}>Closes Thursday Oct 1 at 8 pm</p>
              <div className={s.field}>
                <label htmlFor="stride-name">Full name, as on your ID</label>
                <input id="stride-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="stride-email">Email</label>
                <input id="stride-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label htmlFor="stride-phone">Mobile, for the text</label>
                  <input id="stride-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label htmlFor="stride-size">US men's size</label>
                  <select id="stride-size" name="size" defaultValue="10">
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="9.5">9.5</option>
                    <option value="10">10</option>
                    <option value="10.5">10.5</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>
              <fieldset className={s.choice}>
                <legend>If you win</legend>
                <label>
                  <input type="radio" name="collect" value="store" defaultChecked />
                  <span>Collect in store</span>
                </label>
                <label>
                  <input type="radio" name="collect" value="ship" />
                  <span>Ship to me, $12</span>
                </label>
              </fieldset>
              <label className={s.agree}>
                <input type="checkbox" name="rules" />
                <span>I have read the six rules and this is my only entry.</span>
              </label>
              <button className={s.submit} type="submit">Enter the raffle</button>
            </form>
          </div>
        </section>

        {/* ----------------------------------------------------------- STORE */}
        <section id="store" className={s.store} aria-labelledby="store-h">
          <div className={s.secHead}>
            <p className={s.secNo}>05</p>
            <h2 id="store-h">The store</h2>
            <p className={s.secNote}>
              One room on Dock Row, a wall of shoes, a bench and a lacing
              station. On drop mornings the line forms from 8 and wristbands go
              out at 9:30.
            </p>
          </div>
          <div className={s.storeGrid}>
            <div className={s.storeCard}>
              <h3>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.storeCard}>
              <h3>Find us</h3>
              <p>
                48 Dock Row
                <br />
                Between the ferry and the bridge
              </p>
              <p className={s.storeSmall}>Bike racks outside. The 12 bus stops at the corner.</p>
            </div>
            <div className={s.storeCard}>
              <h3>Ask us</h3>
              <p>
                <a href="mailto:wall@stride.example">wall@stride.example</a>
              </p>
              <p>(555) 013-7788</p>
              <p className={s.storeSmall}>Size questions answered the same day, drop questions by Friday noon.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footMark}>Stride</p>
        <ul className={s.footLinks}>
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className={s.footFine}>
          <p>A fictional sneaker store. Shoes, drops and prices are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
