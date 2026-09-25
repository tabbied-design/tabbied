import { TabbiedPattern } from 'tabbied/react';
import { crosslattice, midnightblossoms } from 'tabbied/patterns';
import s from './corner-pharmacy.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Corner Pharmacy: Independent pharmacy, Bellhaven',
  description:
    'Corner Pharmacy fills prescriptions, gives vaccines and runs health checks at Linden and 4th in Bellhaven. Refills ready in two hours and free delivery within three miles.',
};

/* Site colors. The lattice lays its own pale tile down, so the sign reads
   as a panel; the blossoms sit on the same pale. */
const PAPER = '#F6F8F6';
const INK = '#13201A';
const GREEN = '#1E8A5A';
const GRAY = '#86918B';
const PALE = '#DDE7E1';

const SIGN = ['transparent', PALE, GREEN];
const STRIP = ['transparent', GREEN, PALE];
const BLOSSOM = ['transparent', PALE, GREEN, GRAY];
const MAT = ['transparent', PALE, PAPER];
const NIGHT = ['transparent', INK, GREEN, GRAY, PALE];

const PHONE = '(555) 017-3321';
const PHONE_HREF = 'tel:+15550173321';

const NAV = [
  ['Services', '#services'],
  ['Refills', '#refill'],
  ['Vaccines', '#vaccines'],
  ['Hours', '#hours'],
  ['Visit', '#visit'],
];

const SERVICES = [
  {
    id: 'rx',
    art: 'corner-pharmacy-mortar',
    title: 'Prescriptions and refills',
    body: 'Most refills are ready two hours after you ask, and we text when the bag is on the shelf. We take most plans, Medicare Part D included, and we tell you the price before we fill it if there is a cheaper way.',
    facts: [
      ['Ready in', 'About 2 hours'],
      ['Transfers', 'We make the call'],
      ['Auto-refill', 'Free, by text'],
    ],
  },
  {
    id: 'vaccines',
    art: 'corner-pharmacy-bottle',
    title: 'Vaccines',
    body: 'Walk in for flu, COVID and Tdap. Shingles, RSV, pneumonia and travel shots take a fifteen-minute booking so the dose is here and warm when you are.',
    facts: [
      ['Walk-in', 'Flu, COVID, Tdap'],
      ['Booked', '15 minutes'],
      ['Ages', '3 and up for flu'],
    ],
  },
  {
    id: 'checks',
    art: 'corner-pharmacy-leaf',
    title: 'Health checks',
    body: 'Blood pressure, cholesterol and A1c, taken in the consultation room with the door shut, and a sit-down review of everything you take if the list has grown long.',
    facts: [
      ['Blood pressure', 'Free'],
      ['Cholesterol and A1c', '$25'],
      ['Medicine review', 'Free, 30 minutes'],
    ],
  },
];

const VACCINES = [
  ['Flu, 2026-27', 'Everyone 3 and up', 'Walk in', '$45'],
  ['COVID-19, 2026-27', 'Everyone 12 and up', 'Walk in', '$140'],
  ['Tdap', 'Every 10 years, and in pregnancy', 'Walk in', '$65'],
  ['Shingles, two doses', '50 and up', 'Book', '$210 a dose'],
  ['RSV', '60 and up, and in pregnancy', 'Book', '$320'],
  ['Pneumococcal', '65 and up, or with a condition', 'Book', '$290'],
  ['Hepatitis A and B', 'Travel and some jobs', 'Book', '$120 a dose'],
  ['Typhoid', 'Travel', 'Book', '$95'],
];

/* The week as bars on a 7 am to 9 pm scale; the counter closes for half an
   hour at lunch on weekdays while the shop stays open. */
const DAY_START = 7;
const DAY_SPAN = 14;
const pct = (h: number) => `${((h - DAY_START) / DAY_SPAN) * 100}%`;

const WEEK = [
  { day: 'Monday', short: 'Mon', open: 8, close: 20, label: '8 am-8 pm', lunch: true },
  { day: 'Tuesday', short: 'Tue', open: 8, close: 20, label: '8 am-8 pm', lunch: true },
  { day: 'Wednesday', short: 'Wed', open: 8, close: 20, label: '8 am-8 pm', lunch: true },
  { day: 'Thursday', short: 'Thu', open: 8, close: 20, label: '8 am-8 pm', lunch: true },
  { day: 'Friday', short: 'Fri', open: 8, close: 20, label: '8 am-8 pm', lunch: true },
  { day: 'Saturday', short: 'Sat', open: 9, close: 18, label: '9 am-6 pm', lunch: false },
  { day: 'Sunday', short: 'Sun', open: 10, close: 16, label: '10 am-4 pm', lunch: false },
];

const TICKS = ['7 am', '9', '11', '1 pm', '3', '5', '7', '9 pm'];

const SWITCH = [
  ['1', 'Tell us where', 'The name of your old pharmacy and the medicines you take. Your bottles are enough.'],
  ['2', 'We make the call', 'We ask them to send everything over, refills left included. It takes a day, two for a chain.'],
  ['3', 'Pick it up', 'We text when the first fill is ready and set up auto-refill if you want it.'],
];

export default function CornerPharmacyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f8f6',
        '--ink': '#13201a',
        '--green': '#1e8a5a',
        '--gray': '#86918b',
        '--pale': '#dde7e1',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,green,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=Public+Sans:wght@400;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.cross} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Corner Pharmacy</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#refill">Refill now</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      {/* The hours, always in view under the header. */}
      <div className={s.today}>
        <span className={s.todayDot} aria-hidden="true" />
        <span data-edit="page.todayText" data-edit-max="60" className={s.todayText}>Open Mon-Fri 8-8, Sat 9-6, Sun 10-4</span>
        <a data-edit="page.todayPhone" data-edit-max="28" className={s.todayPhone} href={PHONE_HREF}>{PHONE}</a>
      </div>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            An apothecary sign: a tiled lattice frame, an arched green
            window, and the mortar engraved in the paper color. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Independent pharmacy at Linden and 4th, since 1962</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your prescriptions, <em>ready when you walk in.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              A pharmacist who knows your name, refills ready in two hours,
              vaccines without an appointment, and free delivery within three
              miles of the corner.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#refill">Refill a prescription</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href={PHONE_HREF}>Call the pharmacist</a>
            </div>
          </div>
          <div className={s.sign}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,4,2" className={s.signField} aria-hidden="true">
              <TabbiedPattern
                pattern={crosslattice}
                palette={SIGN}
                fit="grid"
                cellSize={80}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.signWindow}>
              <Artwork slug="corner-pharmacy-mortar" alt="A mortar and pestle, engraved" inks={['var(--paper)']} className={s.signArt} />
              <span data-edit="hero.signCaption" data-edit-max="60" className={s.signCaption}>Est. 1962</span>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- TWO COLUMNS
            Services on the left, each under its engraving; the refill form
            on the right, held in view while the services scroll past. */}
        <div className={s.split}>
          <section id="services" className={s.services} aria-labelledby="services-h">
            <div className={s.colHead}>
              <span data-edit="services.secNo" data-edit-max="60" className={s.secNo}>01</span>
              <h2 data-edit="services.title" data-edit-max="60" id="services-h">At the counter</h2>
            </div>
            {SERVICES.map((sv, i) => (
              <div key={sv.id} className={s.service}>
                <div className={s.serviceArt}>
                  <Artwork slug={sv.art} alt="" inks={['var(--ink)']} className={s.serviceMark} />
                </div>
                <div className={s.serviceText}>
                  <h3 data-edit={`services.title2.${i}`} data-edit-max="40">{sv.title}</h3>
                  <p data-edit={`services.body.${i}`} data-edit-max="240" data-edit-multiline>{sv.body}</p>
                  <dl className={s.serviceFacts}>
                    {sv.facts.map(([k, v], i2) => (
                      <div key={k}>
                        <dt data-edit={`services.term.${i}.${i2}`} data-edit-max="28">{k}</dt>
                        <dd data-edit={`services.body2.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}

            {/* Delivery carries all three engravings, as the bag does. */}
            <div className={`${s.service} ${s.delivery}`}>
              <div className={s.bag} aria-hidden="true">
                <div data-edit-pattern="services.field" data-edit-roles="transparent,4,0" className={s.bagMat} aria-hidden="true">
                  <TabbiedPattern
                    pattern={crosslattice}
                    palette={MAT}
                    fit="grid"
                    cellSize={40}
                    seed="corner-bag"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork slug="corner-pharmacy-bottle" alt="" inks={['var(--green)']} className={s.bagBottle} />
                <Artwork slug="corner-pharmacy-leaf" alt="" inks={['var(--green)']} className={s.bagLeaf} />
                <Artwork slug="corner-pharmacy-mortar" alt="" inks={['var(--green)']} className={s.bagMortar} />
              </div>
              <div className={s.serviceText}>
                <h3 data-edit="services.title3" data-edit-max="40">Delivery</h3>
                <p data-edit="services.body3" data-edit-max="240" data-edit-multiline>
                  Free within three miles, the same day if you ask by 2 pm.
                  Refrigerated medicines travel in a cold bag and the driver
                  waits for a signature.
                </p>
                <dl className={s.serviceFacts}>
                  <div>
                    <dt data-edit="services.term2" data-edit-max="28">Up to 3 miles</dt>
                    <dd data-edit="services.body4" data-edit-max="200" data-edit-multiline>Free</dd>
                  </div>
                  <div>
                    <dt data-edit="services.term3" data-edit-max="28">3-10 miles</dt>
                    <dd data-edit="services.body5" data-edit-max="200" data-edit-multiline>$5</dd>
                  </div>
                  <div>
                    <dt data-edit="services.term4" data-edit-max="28">Same day</dt>
                    <dd data-edit="services.body6" data-edit-max="200" data-edit-multiline>Order by 2 pm</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <aside id="refill" className={s.refill} aria-labelledby="refill-h">
            <div data-edit-pattern="refill.field" data-edit-roles="transparent,2,4" className={s.refillTop} aria-hidden="true">
              <TabbiedPattern
                pattern={crosslattice}
                palette={STRIP}
                fit="grid"
                cellSize={48}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <form className={s.form} action="#">
              <h2 data-edit="refill.formTitle" data-edit-max="60" id="refill-h" className={s.formTitle}>Refill a prescription</h2>
              <p data-edit="refill.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Ready in about two hours. We text you when it is on the shelf.</p>
              <div className={s.field}>
                <label data-edit="refill.label" htmlFor="cp-rx">Prescription numbers</label>
                <input id="cp-rx" name="rx" type="text" placeholder="From the label, e.g. 604-2217" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label data-edit="refill.label2" htmlFor="cp-last">Last name</label>
                  <input id="cp-last" name="last" type="text" autoComplete="family-name" />
                </div>
                <div className={s.field}>
                  <label data-edit="refill.label3" htmlFor="cp-dob">Date of birth</label>
                  <input id="cp-dob" name="dob" type="text" placeholder="MM/DD/YYYY" autoComplete="bday" />
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="refill.label4" htmlFor="cp-phone">Mobile, for the text</label>
                <input id="cp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={s.choice}>
                <legend data-edit="refill.legend">How would you like it?</legend>
                <label>
                  <input type="radio" name="how" value="pickup" defaultChecked />
                  <span data-edit="refill.text" data-edit-max="60">Pick up at the counter</span>
                </label>
                <label>
                  <input type="radio" name="how" value="delivery" />
                  <span data-edit="refill.text2" data-edit-max="60">Deliver it, free within 3 miles</span>
                </label>
              </fieldset>
              <div className={s.field}>
                <label data-edit="refill.label5" htmlFor="cp-when">When</label>
                <select id="cp-when" name="when" defaultValue="today">
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="later">Later this week</option>
                </select>
              </div>
              <button data-edit="refill.submit" data-edit-max="24" type="submit" className={s.submit}>Send the refill</button>
              <small data-edit="refill.formFine" className={s.formFine}>Controlled medicines need a new prescription from your doctor.</small>
            </form>
          </aside>
        </div>

        {/* -------------------------------------------------------- VACCINES */}
        <section id="vaccines" className={s.sec} aria-labelledby="vaccines-h">
          <div className={s.vaccinesTop}>
            <div className={s.secHead}>
              <span data-edit="vaccines.secNo" data-edit-max="60" className={s.secNo}>02</span>
              <h2 data-edit="vaccines.title" data-edit-max="60" id="vaccines-h">Vaccines this season</h2>
              <p data-edit="vaccines.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Most plans cover all of these at $0; bring your card. The price
                is what you pay without insurance.
              </p>
            </div>
            <div data-edit-pattern="vaccines.field" data-edit-roles="transparent,4,2" className={s.crossSign} aria-hidden="true">
              <TabbiedPattern
                pattern={crosslattice}
                palette={SIGN}
                fit="grid"
                cellSize={36}
                seed="corner-cross"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.tableWrap}>
            <table className={s.vaccines}>
              <caption data-edit="vaccines.visuallyHidden" className={s.visuallyHidden}>Vaccines, who they are for, how to get one, and the price</caption>
              <thead>
                <tr>
                  <th data-edit="vaccines.heading" scope="col">Vaccine</th>
                  <th data-edit="vaccines.heading2" scope="col">Who it is for</th>
                  <th data-edit="vaccines.heading3" scope="col">How</th>
                  <th data-edit="vaccines.heading4" scope="col">Without insurance</th>
                </tr>
              </thead>
              <tbody>
                {VACCINES.map(([name, who, how, price], i) => (
                  <tr key={name}>
                    <th data-edit={`vaccines.heading5.${i}`} scope="row">{name}</th>
                    <td data-edit={`vaccines.cell.${i}`}>{who}</td>
                    <td>
                      <span data-edit={`vaccines.walk.${i}`} data-edit-max="60" className={how === 'Walk in' ? s.walk : s.book}>{how}</span>
                    </td>
                    <td data-edit={`vaccines.price.${i}`} className={s.price}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={midnightblossoms}
            palette={BLOSSOM}
            options={{ frequency: 0.5 }}
            fit="grid"
            cellSize={120}
            seed="chamomile"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- HOURS
            The week drawn as bars on one scale, so a late Tuesday and a
            short Sunday are obvious at a glance. */}
        <section id="hours" className={s.sec} aria-labelledby="hours-h">
          <div className={s.secHead}>
            <span data-edit="hours.secNo" data-edit-max="60" className={s.secNo}>03</span>
            <h2 data-edit="hours.title" data-edit-max="60" id="hours-h">Hours</h2>
            <p data-edit="hours.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The shop and the pharmacy counter keep the same hours, except for
              the pharmacist's lunch, 1-1:30 on weekdays.
            </p>
          </div>
          <div className={s.week}>
            <div className={s.ticks} aria-hidden="true">
              {TICKS.map((t, i) => (
                <span data-edit={`hours.text.${i}`} data-edit-max="60" key={t}>{t}</span>
              ))}
            </div>
            <ul className={s.days}>
              {WEEK.map((d, i) => (
                <li key={d.day} className={s.dayRow}>
                  <div className={s.dayLabel}>
                    <span data-edit={`hours.dayName.${i}`} data-edit-max="60" className={s.dayName}>{d.day}</span>
                    <span data-edit={`hours.dayShort.${i}`} data-edit-max="60" className={s.dayShort}>{d.short}</span>
                  </div>
                  <div className={s.track}>
                    <div className={s.open} style={{ left: pct(d.open), width: `${((d.close - d.open) / DAY_SPAN) * 100}%` }}>
                      <span data-edit={`hours.openLabel.${i}`} data-edit-max="60" className={s.openLabel}>{d.label}</span>
                    </div>
                    {d.lunch ? <div className={s.lunch} style={{ left: pct(13), width: `${(0.5 / DAY_SPAN) * 100}%` }} /> : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className={s.weekKey}>
              <span data-edit="hours.keyOpen" data-edit-max="60" className={s.keyOpen}>Open</span>
              <span data-edit="hours.keyLunch" data-edit-max="60" className={s.keyLunch}>Pharmacist at lunch</span>
              <span data-edit="hours.keyNote" data-edit-max="60" className={s.keyNote}>Closed Thanksgiving, Christmas Day and New Year's Day</span>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <span data-edit="visit.secNo" data-edit-max="60" className={s.secNo}>04</span>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Find us, or switch to us</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>On the corner of Linden and 4th, across from the library, with four parking spaces out front for a quick pick-up.</p>
          </div>
          <div className={s.visit}>
            <dl className={s.contact}>
              <div>
                <dt data-edit="visit.term" data-edit-max="28">Address</dt>
                <dd data-edit="visit.body" data-edit-max="200" data-edit-multiline>400 Linden Avenue, Bellhaven</dd>
              </div>
              <div>
                <dt data-edit="visit.term2" data-edit-max="28">Pharmacist</dt>
                <dd>
                  <a data-edit="visit.link" data-edit-max="28" href={PHONE_HREF}>{PHONE}</a>
                </dd>
              </div>
              <div>
                <dt data-edit="visit.term3" data-edit-max="28">Doctors, fax</dt>
                <dd data-edit="visit.body2" data-edit-max="200" data-edit-multiline>(555) 017-3399</dd>
              </div>
              <div>
                <dt data-edit="visit.term4" data-edit-max="28">Write</dt>
                <dd>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:counter@cornerpharmacy.example">counter@cornerpharmacy.example</a>
                </dd>
              </div>
            </dl>
            <div className={s.switch}>
              <div className={s.switchHead}>
                <Artwork slug="corner-pharmacy-leaf" alt="" inks={['var(--green)']} className={s.switchArt} />
                <h3 data-edit="visit.title2" data-edit-max="40">Switching takes three steps</h3>
              </div>
              <ol className={s.steps}>
                {SWITCH.map(([n, t, b], i) => (
                  <li key={n}>
                    <span data-edit={`visit.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{n}</span>
                    <h4 data-edit={`visit.title3.${i}`} data-edit-max="36">{t}</h4>
                    <p data-edit={`visit.body3.${i}`} data-edit-max="240" data-edit-multiline>{b}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,4" className={s.footBlooms} aria-hidden="true">
          <TabbiedPattern
            pattern={midnightblossoms}
            palette={NIGHT}
            options={{ frequency: 0.9 }}
            fit="grid"
            cellSize={120}
            seed="corner-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <Artwork slug="corner-pharmacy-bottle" alt="" inks={['var(--pale)']} className={s.footArt} />
            <div>
              <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Corner Pharmacy</p>
              <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>An independent pharmacy at Linden and 4th, Bellhaven, since 1962.</p>
            </div>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>The counter</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.services" data-edit-max="28" href="#services">Services</a></li>
              <li><a data-edit="footer.refill" data-edit-max="28" href="#refill">Refill a prescription</a></li>
              <li><a data-edit="footer.vaccines" data-edit-max="28" href="#vaccines">Vaccines</a></li>
            </ul>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Visit</h2>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
              400 Linden Avenue
              <br />
              Mon-Fri 8-8, Sat 9-6, Sun 10-4
              <br />
              (555) 017-3321
            </p>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional pharmacy. Prices, hours, people and the address are invented, and nothing here is medical advice.</p>
          <p>
            Patterns by{' '}
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live in the page's own colors.
          </p>
        </div>
      </footer>
    </div>
  );
}
