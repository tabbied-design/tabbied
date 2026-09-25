import { TabbiedPattern } from 'tabbied/react';
import { circuit, rafter } from 'tabbied/patterns';
import s from './live-wire-electric.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Live Wire Electric: Licensed electricians, Eastbrook',
  description:
    'Repairs, rewiring, panel upgrades, lighting and EV chargers for homes and small shops. Fixed quotes in writing, a 24-hour emergency line and a 12-month guarantee.',
};

/* Site colors. The circuit board in the hero is ink traces with blue and
   paper components on the yellow panel; the hazard tape is yellow on ink. */
const PAPER = '#F2F2EE';
const INK = '#111418';
const VOLT = '#FFC21A';
const BLUE = '#2F5BEA';

const BOARD = ['transparent', INK, BLUE, PAPER, INK];
const TAPE = ['transparent', VOLT];

const NAV = [
  ['Services', '#services'],
  ['Emergency', '#emergency'],
  ['Licensed', '#licensed'],
  ['Areas', '#areas'],
  ['Quote', '#quote'],
];

const PHONE = '(555) 014-7720';
const PHONE_HREF = 'tel:+15550147720';
const EMERGENCY = '(555) 014-7799';
const EMERGENCY_HREF = 'tel:+15550147799';
const EMAIL = 'jobs@livewire.example';

const FACTS = [
  ['Callout from', '$95'],
  ['Emergency line', '24/7'],
  ['Guarantee', '12 months'],
];

type Service = {
  no: string;
  name: string;
  text: string;
  covers: string[];
  price: string;
  unit: string;
};

const SERVICES: Service[] = [
  {
    no: '01',
    name: 'Fault finding and repairs',
    text: 'Breakers that trip, outlets that went dead, lights that flicker when the dryer runs. We trace it to the cause and fix that, not the symptom.',
    covers: ['Tripping breakers and GFCIs', 'Dead outlets and switches', 'Flickering or buzzing lights'],
    price: '$95',
    unit: 'callout, first hour included',
  },
  {
    no: '02',
    name: 'Outlets, switches and USB points',
    text: 'New outlets where the furniture actually is, GFCI protection in kitchens and baths, and USB-C points by the bed and the desk.',
    covers: ['Add or move an outlet', 'GFCI and AFCI protection', 'Dimmers and smart switches'],
    price: '$85',
    unit: 'per point',
  },
  {
    no: '03',
    name: 'Lighting, inside and out',
    text: 'Recessed downlights, pendants over an island, under-cabinet strips and porch lights on a timer. Fitted, patched and tested.',
    covers: ['Recessed and pendant lights', 'Under-cabinet LED strips', 'Outdoor and motion lights'],
    price: '$120',
    unit: 'per fixture',
  },
  {
    no: '04',
    name: 'Panel upgrades',
    text: 'From 100 amps to 200, a new breaker panel to replace a fused one, and whole-house surge protection while the cover is off.',
    covers: ['100A to 200A service', 'Fuse box replacement', 'Whole-house surge protection'],
    price: '$1,850',
    unit: 'permit and inspection included',
  },
  {
    no: '05',
    name: 'EV chargers',
    text: 'A Level 2 charger in the garage or on the drive, on its own circuit, sized to your panel. We check the load before we quote.',
    covers: ['Level 2, 40 or 48 amp', 'Dedicated circuit and permit', 'Load check and rebate paperwork'],
    price: '$690',
    unit: 'install, charger extra',
  },
  {
    no: '06',
    name: 'Rewiring',
    text: 'Knob and tube, ungrounded two-wire or aluminum branch wiring, replaced room by room so you can stay living in the house.',
    covers: ['Whole-house or room by room', 'Knob and tube removal', 'Plaster patched, ready to paint'],
    price: '$4,200',
    unit: 'for a two-bedroom house',
  },
  {
    no: '07',
    name: 'Inspections and certificates',
    text: 'A written condition report for a purchase, an insurer or a rental license, with photos and a priced list of anything we find.',
    covers: ['Pre-purchase inspections', 'Rental safety certificates', 'Insurance condition reports'],
    price: '$180',
    unit: 'per report',
  },
];

const FEES = [
  { when: 'Weekdays, 7:00-18:00', first: '$95', extra: '$45' },
  { when: 'Evenings, 18:00-22:00', first: '$165', extra: '$60' },
  { when: 'Nights and weekends', first: '$210', extra: '$75' },
  { when: 'Public holidays', first: '$260', extra: '$90' },
];

const BEFORE = [
  'If it is safe to reach, switch off the main breaker at the panel.',
  'Keep everyone away from a sparking outlet, a hot switch plate or anything wet.',
  'See smoke or flames: call 911 first, then call us.',
  'A power line down outside: stay 35 feet away and call the utility on (555) 010-0100.',
];

const CREDENTIALS = [
  { big: 'E-40218', label: 'State master electrician license', note: 'Held by Rosa Delgado since 2011. Every job is run by a licensed journeyman or above.' },
  { big: '$2M', label: 'Liability insurance', note: 'Certificates sent to your landlord, HOA or property manager on request, same day.' },
  { big: '12 mo', label: 'Workmanship guarantee', note: 'If our work fails in the first year we come back and fix it free. Parts carry the maker warranty.' },
  { big: '100%', label: 'Permits pulled by us', note: 'Where a job needs a permit we file it, book the inspection and meet the inspector.' },
];

const STEPS = [
  ['Tell us', 'Call, or send the form with a few photos.'],
  ['Fixed price', 'A written quote within one working day.'],
  ['Done and tested', 'Every circuit we touch is tested and labelled.'],
  ['Paperwork', 'Invoice, test results and the permit sign-off.'],
];

const ZONE_ONE = ['Eastbrook', 'Millbrook', 'Old Quarry', 'Harrow Hill', 'Riverside', 'North End'];
const ZONE_TWO = ['Cedar Falls', 'Linden', 'Pike Crossing', 'Westvale', 'Stony Point', 'Ashby'];

const HOURS = [
  ['Monday to Friday', '7:00 - 18:00'],
  ['Saturday', '8:00 - 14:00'],
  ['Sunday', 'Emergencies only'],
  ['Emergency line', '24 hours, every day'],
];

export default function LiveWireElectricPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Saira:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true">
            <Artwork slug="live-wire-electric-bulb" alt="" inks={['var(--ink)']} className={s.brandBulb} />
          </span>
          <span className={s.brandName}>Live Wire Electric</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href={PHONE_HREF}>{PHONE}</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Words on the paper, and a yellow board of circuit traces with
            the bulb hanging from its cord in a paper socket. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Licensed electricians for Eastbrook and the valley</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Wired right,
              <br />
              <em>first time.</em>
            </h1>
            <p className={s.heroLede}>
              Repairs, rewiring, panels and EV chargers for homes and small
              shops. A fixed price in writing before we start, and a 12-month
              guarantee on everything we touch.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#quote">Get a fixed quote</a>
              <a className={s.btnLine} href={EMERGENCY_HREF}>
                <span>Emergency </span>
                <span>{EMERGENCY}</span>
              </a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.board}>
            <div className={s.boardField} aria-hidden="true">
              <TabbiedPattern
                pattern={circuit}
                palette={BOARD}
                options={{ frequency: 0.5 }}
                fit="grid"
                cellSize={52}
                seed="live-wire-board"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.cord} aria-hidden="true" />
            <div className={s.socket}>
              <Artwork slug="live-wire-electric-bulb" alt="A light bulb" inks={['var(--ink)']} className={s.heroBulb} />
            </div>
            <p className={s.boardTag}>Est. 2011, Foundry Lane</p>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES
            The page's spine: one wire from the plug at the top to the
            ground symbol at the bottom, a node for each service, the card
            on one side of the wire and its price on the other. */}
        <section id="services" className={s.services} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Services</p>
            <h2 id="services-h">Everything on the circuit</h2>
            <p className={s.secNote}>
              Prices are from, for a typical house. Parts are charged at cost
              plus 15%, and every job gets a written quote before we start.
            </p>
          </div>

          <div className={s.source} aria-hidden="true">
            <Artwork slug="live-wire-electric-plug" alt="" inks={['var(--ink)']} className={s.sourcePlug} />
          </div>

          <ol className={s.wire}>
            {SERVICES.map((sv) => (
              <li key={sv.no} className={s.stop}>
                <span className={s.node} aria-hidden="true" />
                <div className={s.card}>
                  <span className={s.stopNo}>{sv.no}</span>
                  <h3>{sv.name}</h3>
                  <p className={s.stopText}>{sv.text}</p>
                  <ul className={s.covers}>
                    {sv.covers.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.price}>
                  <span className={s.priceFrom}>from</span>
                  <strong className={s.priceValue}>{sv.price}</strong>
                  <span className={s.priceUnit}>{sv.unit}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className={s.ground} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>

        {/* ------------------------------------------------------- EMERGENCY
            Ink, with hazard tape top and bottom and the unplugged plug. */}
        <section id="emergency" className={s.emergency} aria-labelledby="emergency-h">
          <div className={s.tape} aria-hidden="true">
            <TabbiedPattern
              pattern={rafter}
              palette={TAPE}
              fit="grid"
              cellSize={34}
              seed="live-wire-tape"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.emInner}>
            <div className={s.emMain}>
              <p className={s.emKicker}>Emergency line, answered 24 hours</p>
              <h2 id="emergency-h">No power, sparks, or a burning smell?</h2>
              <a className={s.emPhone} href={EMERGENCY_HREF}>{EMERGENCY}</a>
              <p className={s.emNote}>
                A licensed electrician answers, not a call center. Last year we
                reached Zone 1 callouts in 52 minutes on average.
              </p>

              <h3 className={s.emSub}>Before we get there</h3>
              <ol className={s.before}>
                {BEFORE.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ol>
            </div>

            <div className={s.emSide}>
              <Artwork slug="live-wire-electric-plug" alt="An unplugged electrical plug" inks={['var(--volt)']} className={s.emPlug} />
              <table className={s.fees}>
                <caption>Emergency callout fees</caption>
                <thead>
                  <tr>
                    <th scope="col">When</th>
                    <th scope="col">First hour</th>
                    <th scope="col">Each extra 30 min</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f) => (
                    <tr key={f.when}>
                      <th scope="row">{f.when}</th>
                      <td data-label="First hour">{f.first}</td>
                      <td data-label="Each extra 30 min">{f.extra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- LICENSED */}
        <section id="licensed" className={s.licensed} aria-labelledby="licensed-h">
          <div className={s.licInner}>
            <div className={s.licArt}>
              <Artwork slug="live-wire-electric-pliers" alt="A pair of lineman's pliers" inks={['var(--ink)']} className={s.pliers} />
            </div>

            <div className={s.licBody}>
              <p className={s.eyebrow}>Licenses and guarantees</p>
              <h2 id="licensed-h">Licensed, insured and signed off</h2>
              <ul className={s.creds}>
                {CREDENTIALS.map((c) => (
                  <li key={c.label} className={s.cred}>
                    <strong className={s.credBig}>{c.big}</strong>
                    <h3>{c.label}</h3>
                    <p>{c.note}</p>
                  </li>
                ))}
              </ul>

              <h3 className={s.stepsHead}>How a job goes</h3>
              <ol className={s.steps}>
                {STEPS.map(([title, text], n) => (
                  <li key={title}>
                    <span className={s.stepNo}>{`0${n + 1}`}</span>
                    <strong>{title}</strong>
                    <span className={s.stepText}>{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- AREAS
            Two rings around the depot: no travel charge inside, a flat
            charge in the outer ring. */}
        <section id="areas" className={s.areas} aria-labelledby="areas-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Areas served</p>
            <h2 id="areas-h">Where the vans go</h2>
            <p className={s.secNote}>
              Both vans leave the depot on Foundry Lane. Outside the outer ring
              we still come for panels and rewires; ask for a price.
            </p>
          </div>

          <div className={s.areaGrid}>
            <div className={s.rings} aria-hidden="true">
              <span className={s.ringOuter} />
              <span className={s.ringInner} />
              <span className={s.depot} />
              <span className={s.ringLabelOne}>5 mi</span>
              <span className={s.ringLabelTwo}>12 mi</span>
            </div>

            <div className={s.zone}>
              <h3>Zone 1</h3>
              <p className={s.zoneTerms}>No travel charge. Emergencies within 90 minutes.</p>
              <ul className={s.towns}>
                {ZONE_ONE.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className={s.zone}>
              <h3>Zone 2</h3>
              <p className={s.zoneTerms}>$25 travel charge. Emergencies within 2 hours.</p>
              <ul className={s.towns}>
                {ZONE_TWO.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.quote} aria-labelledby="quote-h">
          <div className={s.quoteInner}>
            <div className={s.quoteText}>
              <p className={s.eyebrow}>Fixed quotes</p>
              <h2 id="quote-h">Tell us what needs doing</h2>
              <p>
                We answer within one working day, usually with a price and
                sometimes with a visit to look first, which is free in Zone 1.
                Photos help: reply to our confirmation email with them.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time]) => (
                  <div key={day}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.contact}>
                <a href={PHONE_HREF}>{PHONE}</a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <span>118 Foundry Lane, Eastbrook</span>
              </div>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="lw-name">Name</label>
                <input id="lw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="lw-phone">Phone</label>
                <input id="lw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="lw-email">Email</label>
                <input id="lw-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <div className={s.field}>
                <label htmlFor="lw-zip">Zip code</label>
                <input id="lw-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label htmlFor="lw-job">Kind of job</label>
                <select id="lw-job" name="job" defaultValue={SERVICES[0].name}>
                  {SERVICES.map((sv) => (
                    <option key={sv.no} value={sv.name}>{sv.name}</option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label htmlFor="lw-desc">What is going on</label>
                <textarea id="lw-desc" name="description" rows={4} placeholder="Which rooms, how old the house is, anything you have noticed." />
              </div>
              <fieldset className={`${s.when} ${s.wide}`}>
                <legend>Best time for a visit</legend>
                <label>
                  <input type="radio" name="when" value="morning" defaultChecked />
                  <span>Mornings</span>
                </label>
                <label>
                  <input type="radio" name="when" value="afternoon" />
                  <span>Afternoons</span>
                </label>
                <label>
                  <input type="radio" name="when" value="any" />
                  <span>Any time</span>
                </label>
              </fieldset>
              <button className={s.submit} type="submit">Send for a quote</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <Artwork slug="live-wire-electric-bulb" alt="" inks={['var(--volt)']} className={s.footBulb} />
            <div>
              <p className={s.footName}>Live Wire Electric</p>
              <p className={s.footTag}>Master electrician license E-40218. Insured, bonded and guaranteed.</p>
            </div>
          </div>
          <div>
            <h2 className={s.footHead}>Call</h2>
            <a className={s.footLink} href={PHONE_HREF}>{PHONE}</a>
            <a className={s.footLink} href={EMERGENCY_HREF}>{EMERGENCY}</a>
          </div>
          <div>
            <h2 className={s.footHead}>Write</h2>
            <a className={s.footLink} href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className={s.footText}>118 Foundry Lane, Eastbrook</p>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional electrical contractor. Prices, licenses, people and places are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
