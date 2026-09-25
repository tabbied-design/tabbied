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
const GREEN = '#1E8A5A';
const GRAY = '#86918B';
const PALE = '#DDE7E1';

const SIGN = ['transparent', PALE, GREEN];
const STRIP = ['transparent', GREEN, PALE];
const BLOSSOM = ['transparent', PALE, GREEN, GRAY];

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
    <div className={s.page}>
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
          <span className={s.markName}>Corner Pharmacy</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#refill">Refill now</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      {/* The hours, always in view under the header. */}
      <div className={s.today}>
        <span className={s.todayDot} aria-hidden="true" />
        <span className={s.todayText}>Open Mon-Fri 8-8, Sat 9-6, Sun 10-4</span>
        <a className={s.todayPhone} href={PHONE_HREF}>{PHONE}</a>
      </div>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            An apothecary sign: a tiled lattice frame, an arched green
            window, and the mortar engraved in the paper color. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Independent pharmacy at Linden and 4th, since 1962</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Your prescriptions, <em>ready when you walk in.</em>
            </h1>
            <p className={s.heroLede}>
              A pharmacist who knows your name, refills ready in two hours,
              vaccines without an appointment, and free delivery within three
              miles of the corner.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#refill">Refill a prescription</a>
              <a className={s.btnLine} href={PHONE_HREF}>Call the pharmacist</a>
            </div>
          </div>
          <div className={s.sign}>
            <div className={s.signField} aria-hidden="true">
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
              <span className={s.signCaption}>Est. 1962</span>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- TWO COLUMNS
            Services on the left, each under its engraving; the refill form
            on the right, held in view while the services scroll past. */}
        <div className={s.split}>
          <section id="services" className={s.services} aria-labelledby="services-h">
            <div className={s.colHead}>
              <span className={s.secNo}>01</span>
              <h2 id="services-h">At the counter</h2>
            </div>
            {SERVICES.map((sv) => (
              <div key={sv.id} className={s.service}>
                <div className={s.serviceArt}>
                  <Artwork slug={sv.art} alt="" inks={['var(--ink)']} className={s.serviceMark} />
                </div>
                <div className={s.serviceText}>
                  <h3>{sv.title}</h3>
                  <p>{sv.body}</p>
                  <dl className={s.serviceFacts}>
                    {sv.facts.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}

            {/* Delivery carries all three engravings, as the bag does. */}
            <div className={`${s.service} ${s.delivery}`}>
              <div className={s.bag} aria-hidden="true">
                <Artwork slug="corner-pharmacy-bottle" alt="" inks={['var(--green)']} className={s.bagBottle} />
                <Artwork slug="corner-pharmacy-leaf" alt="" inks={['var(--green)']} className={s.bagLeaf} />
                <Artwork slug="corner-pharmacy-mortar" alt="" inks={['var(--green)']} className={s.bagMortar} />
              </div>
              <div className={s.serviceText}>
                <h3>Delivery</h3>
                <p>
                  Free within three miles, the same day if you ask by 2 pm.
                  Refrigerated medicines travel in a cold bag and the driver
                  waits for a signature.
                </p>
                <dl className={s.serviceFacts}>
                  <div>
                    <dt>Up to 3 miles</dt>
                    <dd>Free</dd>
                  </div>
                  <div>
                    <dt>3-10 miles</dt>
                    <dd>$5</dd>
                  </div>
                  <div>
                    <dt>Same day</dt>
                    <dd>Order by 2 pm</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <aside id="refill" className={s.refill} aria-labelledby="refill-h">
            <div className={s.refillTop} aria-hidden="true">
              <TabbiedPattern
                pattern={crosslattice}
                palette={STRIP}
                fit="grid"
                cellSize={48}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <form className={s.form} action="#">
              <h2 id="refill-h" className={s.formTitle}>Refill a prescription</h2>
              <p className={s.formNote}>Ready in about two hours. We text you when it is on the shelf.</p>
              <div className={s.field}>
                <label htmlFor="cp-rx">Prescription numbers</label>
                <input id="cp-rx" name="rx" type="text" placeholder="From the label, e.g. 604-2217" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label htmlFor="cp-last">Last name</label>
                  <input id="cp-last" name="last" type="text" autoComplete="family-name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="cp-dob">Date of birth</label>
                  <input id="cp-dob" name="dob" type="text" placeholder="MM/DD/YYYY" autoComplete="bday" />
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="cp-phone">Mobile, for the text</label>
                <input id="cp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={s.choice}>
                <legend>How would you like it?</legend>
                <label>
                  <input type="radio" name="how" value="pickup" defaultChecked />
                  <span>Pick up at the counter</span>
                </label>
                <label>
                  <input type="radio" name="how" value="delivery" />
                  <span>Deliver it, free within 3 miles</span>
                </label>
              </fieldset>
              <div className={s.field}>
                <label htmlFor="cp-when">When</label>
                <select id="cp-when" name="when" defaultValue="today">
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="later">Later this week</option>
                </select>
              </div>
              <button type="submit" className={s.submit}>Send the refill</button>
              <small className={s.formFine}>Controlled medicines need a new prescription from your doctor.</small>
            </form>
          </aside>
        </div>

        {/* -------------------------------------------------------- VACCINES */}
        <section id="vaccines" className={s.sec} aria-labelledby="vaccines-h">
          <div className={s.secHead}>
            <span className={s.secNo}>02</span>
            <h2 id="vaccines-h">Vaccines this season</h2>
            <p className={s.secNote}>
              Most plans cover all of these at $0; bring your card. The price
              is what you pay without insurance.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.vaccines}>
              <caption className={s.visuallyHidden}>Vaccines, who they are for, how to get one, and the price</caption>
              <thead>
                <tr>
                  <th scope="col">Vaccine</th>
                  <th scope="col">Who it is for</th>
                  <th scope="col">How</th>
                  <th scope="col">Without insurance</th>
                </tr>
              </thead>
              <tbody>
                {VACCINES.map(([name, who, how, price]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td>{who}</td>
                    <td>
                      <span className={how === 'Walk in' ? s.walk : s.book}>{how}</span>
                    </td>
                    <td className={s.price}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div className={s.band} aria-hidden="true">
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
            <span className={s.secNo}>03</span>
            <h2 id="hours-h">Hours</h2>
            <p className={s.secNote}>
              The shop and the pharmacy counter keep the same hours, except for
              the pharmacist's lunch, 1-1:30 on weekdays.
            </p>
          </div>
          <div className={s.week}>
            <div className={s.ticks} aria-hidden="true">
              {TICKS.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <ul className={s.days}>
              {WEEK.map((d) => (
                <li key={d.day} className={s.dayRow}>
                  <div className={s.dayLabel}>
                    <span className={s.dayName}>{d.day}</span>
                    <span className={s.dayShort}>{d.short}</span>
                  </div>
                  <div className={s.track}>
                    <div className={s.open} style={{ left: pct(d.open), width: `${((d.close - d.open) / DAY_SPAN) * 100}%` }}>
                      <span className={s.openLabel}>{d.label}</span>
                    </div>
                    {d.lunch ? <div className={s.lunch} style={{ left: pct(13), width: `${(0.5 / DAY_SPAN) * 100}%` }} /> : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className={s.weekKey}>
              <span className={s.keyOpen}>Open</span>
              <span className={s.keyLunch}>Pharmacist at lunch</span>
              <span className={s.keyNote}>Closed Thanksgiving, Christmas Day and New Year's Day</span>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <span className={s.secNo}>04</span>
            <h2 id="visit-h">Find us, or switch to us</h2>
            <p className={s.secNote}>On the corner of Linden and 4th, across from the library, with four parking spaces out front for a quick pick-up.</p>
          </div>
          <div className={s.visit}>
            <dl className={s.contact}>
              <div>
                <dt>Address</dt>
                <dd>400 Linden Avenue, Bellhaven</dd>
              </div>
              <div>
                <dt>Pharmacist</dt>
                <dd>
                  <a href={PHONE_HREF}>{PHONE}</a>
                </dd>
              </div>
              <div>
                <dt>Doctors, fax</dt>
                <dd>(555) 017-3399</dd>
              </div>
              <div>
                <dt>Write</dt>
                <dd>
                  <a href="mailto:counter@cornerpharmacy.example">counter@cornerpharmacy.example</a>
                </dd>
              </div>
            </dl>
            <div className={s.switch}>
              <div className={s.switchHead}>
                <Artwork slug="corner-pharmacy-leaf" alt="" inks={['var(--green)']} className={s.switchArt} />
                <h3>Switching takes three steps</h3>
              </div>
              <ol className={s.steps}>
                {SWITCH.map(([n, t, b]) => (
                  <li key={n}>
                    <span className={s.stepNo}>{n}</span>
                    <h4>{t}</h4>
                    <p>{b}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <Artwork slug="corner-pharmacy-bottle" alt="" inks={['var(--pale)']} className={s.footArt} />
            <div>
              <p className={s.footName}>Corner Pharmacy</p>
              <p className={s.footTag}>An independent pharmacy at Linden and 4th, Bellhaven, since 1962.</p>
            </div>
          </div>
          <div>
            <h2 className={s.footHead}>The counter</h2>
            <ul className={s.footLinks}>
              <li><a href="#services">Services</a></li>
              <li><a href="#refill">Refill a prescription</a></li>
              <li><a href="#vaccines">Vaccines</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Visit</h2>
            <p className={s.footAddr}>
              400 Linden Avenue
              <br />
              Mon-Fri 8-8, Sat 9-6, Sun 10-4
              <br />
              (555) 017-3321
            </p>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional pharmacy. Prices, hours, people and the address are invented, and nothing here is medical advice.</p>
          <p>
            Patterns by{' '}
            <a href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live in the page's own colors.
          </p>
        </div>
      </footer>
    </div>
  );
}
