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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f2f2ee',
        '--ink': '#111418',
        '--volt': '#ffc21a',
        '--blue': '#2f5bea',
        '--gray': '#83868c',
        '--pale': '#dcddd8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,volt,blue,gray,pale"
      className={s.page}>
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
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Live Wire Electric</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href={PHONE_HREF}>{PHONE}</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Words on the paper, and a yellow board of circuit traces with
            the bulb hanging from its cord in a paper socket. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Licensed electricians for Eastbrook and the valley</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Wired right,
              <br />
              <em>first time.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Repairs, rewiring, panels and EV chargers for homes and small
              shops. A fixed price in writing before we start, and a 12-month
              guarantee on everything we touch.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#quote">Get a fixed quote</a>
              <a className={s.btnLine} href={EMERGENCY_HREF}>
                <span data-edit="hero.text" data-edit-max="60">Emergency </span>
                <span data-edit="hero.text2" data-edit-max="60">{EMERGENCY}</span>
              </a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.board}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,3,0,1" className={s.boardField} aria-hidden="true">
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
            <p data-edit="hero.boardTag" data-edit-max="240" data-edit-multiline className={s.boardTag}>Est. 2011, Foundry Lane</p>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES
            The page's spine: one wire from the plug at the top to the
            ground symbol at the bottom, a node for each service, the card
            on one side of the wire and its price on the other. */}
        <section id="services" className={s.services} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Services</p>
            <h2 data-edit="services.title" data-edit-max="60" id="services-h">Everything on the circuit</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are from, for a typical house. Parts are charged at cost
              plus 15%, and every job gets a written quote before we start.
            </p>
          </div>

          <div className={s.source} aria-hidden="true">
            <Artwork slug="live-wire-electric-plug" alt="" inks={['var(--ink)']} className={s.sourcePlug} />
          </div>

          <ol className={s.wire}>
            {SERVICES.map((sv, i) => (
              <li key={sv.no} className={s.stop}>
                <span className={s.node} aria-hidden="true" />
                <div className={s.card}>
                  <span data-edit={`services.stopNo.${i}`} data-edit-max="60" className={s.stopNo}>{sv.no}</span>
                  <h3 data-edit={`services.title2.${i}`} data-edit-max="40">{sv.name}</h3>
                  <p data-edit={`services.stopText.${i}`} data-edit-max="240" data-edit-multiline className={s.stopText}>{sv.text}</p>
                  <ul className={s.covers}>
                    {sv.covers.map((c, i2) => (
                      <li data-edit={`services.item.${i}.${i2}`} data-edit-max="80" key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.price}>
                  <span data-edit={`services.priceFrom.${i}`} data-edit-max="60" className={s.priceFrom}>from</span>
                  <strong data-edit={`services.priceValue.${i}`} className={s.priceValue}>{sv.price}</strong>
                  <span data-edit={`services.priceUnit.${i}`} data-edit-max="60" className={s.priceUnit}>{sv.unit}</span>
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
          <div data-edit-pattern="emergency.field" data-edit-roles="transparent,2" className={s.tape} aria-hidden="true">
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
              <p data-edit="emergency.emKicker" data-edit-max="240" data-edit-multiline className={s.emKicker}>Emergency line, answered 24 hours</p>
              <h2 data-edit="emergency.title" data-edit-max="60" id="emergency-h">No power, sparks, or a burning smell?</h2>
              <a data-edit="emergency.emPhone" data-edit-max="28" className={s.emPhone} href={EMERGENCY_HREF}>{EMERGENCY}</a>
              <p data-edit="emergency.emNote" data-edit-max="240" data-edit-multiline className={s.emNote}>
                A licensed electrician answers, not a call center. Last year we
                reached Zone 1 callouts in 52 minutes on average.
              </p>

              <h3 data-edit="emergency.emSub" data-edit-max="40" className={s.emSub}>Before we get there</h3>
              <ol className={s.before}>
                {BEFORE.map((b, i) => (
                  <li data-edit={`emergency.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ol>
            </div>

            <div className={s.emSide}>
              <Artwork slug="live-wire-electric-plug" alt="An unplugged electrical plug" inks={['var(--volt)']} className={s.emPlug} />
              <table className={s.fees}>
                <caption data-edit="emergency.caption">Emergency callout fees</caption>
                <thead>
                  <tr>
                    <th data-edit="emergency.heading" scope="col">When</th>
                    <th data-edit="emergency.heading2" scope="col">First hour</th>
                    <th data-edit="emergency.heading3" scope="col">Each extra 30 min</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f, i) => (
                    <tr key={f.when}>
                      <th data-edit={`emergency.heading4.${i}`} scope="row">{f.when}</th>
                      <td data-edit={`emergency.cell.${i}`} data-label="First hour">{f.first}</td>
                      <td data-edit={`emergency.cell2.${i}`} data-label="Each extra 30 min">{f.extra}</td>
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
              <div className={s.licField} aria-hidden="true">
                <TabbiedPattern
                  pattern={circuit}
                  palette={BOARD}
                  options={{ frequency: 0.5 }}
                  fit="grid"
                  cellSize={44}
                  seed="live-wire-bench"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork slug="live-wire-electric-pliers" alt="A pair of lineman's pliers" inks={['var(--ink)']} className={s.pliers} />
            </div>

            <div className={s.licBody}>
              <p data-edit="licensed.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Licenses and guarantees</p>
              <h2 data-edit="licensed.title" data-edit-max="60" id="licensed-h">Licensed, insured and signed off</h2>
              <ul className={s.creds}>
                {CREDENTIALS.map((c, i) => (
                  <li key={c.label} className={s.cred}>
                    <strong data-edit={`licensed.credBig.${i}`} className={s.credBig}>{c.big}</strong>
                    <h3 data-edit={`licensed.title2.${i}`} data-edit-max="40">{c.label}</h3>
                    <p data-edit={`licensed.body.${i}`} data-edit-max="240" data-edit-multiline>{c.note}</p>
                  </li>
                ))}
              </ul>

              <h3 data-edit="licensed.stepsHead" data-edit-max="40" className={s.stepsHead}>How a job goes</h3>
              <ol className={s.steps}>
                {STEPS.map(([title, text], n) => (
                  <li key={title}>
                    <span className={s.stepNo}>{`0${n + 1}`}</span>
                    <strong data-edit={`licensed.emphasis.${n}`}>{title}</strong>
                    <span data-edit={`licensed.stepText.${n}`} data-edit-max="60" className={s.stepText}>{text}</span>
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
            <p data-edit="areas.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Areas served</p>
            <h2 data-edit="areas.title" data-edit-max="60" id="areas-h">Where the vans go</h2>
            <p data-edit="areas.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Both vans leave the depot on Foundry Lane. Outside the outer ring
              we still come for panels and rewires; ask for a price.
            </p>
          </div>

          <div className={s.areaGrid}>
            <div className={s.rings} aria-hidden="true">
              <span className={s.ringOuter} />
              <div className={s.ringStreets} aria-hidden="true">
                <TabbiedPattern
                  pattern={circuit}
                  palette={BOARD}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={28}
                  seed="live-wire-streets"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.ringInner} />
              <span className={s.depot} />
              <span data-edit="areas.ringLabelOne" data-edit-max="60" className={s.ringLabelOne}>5 mi</span>
              <span data-edit="areas.ringLabelTwo" data-edit-max="60" className={s.ringLabelTwo}>12 mi</span>
            </div>

            <div className={s.zone}>
              <h3 data-edit="areas.title2" data-edit-max="40">Zone 1</h3>
              <p data-edit="areas.zoneTerms" data-edit-max="240" data-edit-multiline className={s.zoneTerms}>No travel charge. Emergencies within 90 minutes.</p>
              <ul className={s.towns}>
                {ZONE_ONE.map((t, i) => (
                  <li data-edit={`areas.item.${i}`} data-edit-max="80" key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className={s.zone}>
              <h3 data-edit="areas.title3" data-edit-max="40">Zone 2</h3>
              <p data-edit="areas.zoneTerms2" data-edit-max="240" data-edit-multiline className={s.zoneTerms}>$25 travel charge. Emergencies within 2 hours.</p>
              <ul className={s.towns}>
                {ZONE_TWO.map((t, i) => (
                  <li data-edit={`areas.item2.${i}`} data-edit-max="80" key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.quote} aria-labelledby="quote-h">
          <div className={s.quoteInner}>
            <div className={s.quoteText}>
              <p data-edit="quote.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Fixed quotes</p>
              <h2 data-edit="quote.title" data-edit-max="60" id="quote-h">Tell us what needs doing</h2>
              <p data-edit="quote.body" data-edit-max="240" data-edit-multiline>
                We answer within one working day, usually with a price and
                sometimes with a visit to look first, which is free in Zone 1.
                Photos help: reply to our confirmation email with them.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`quote.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`quote.body2.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.contact}>
                <a data-edit="quote.link" data-edit-max="28" href={PHONE_HREF}>{PHONE}</a>
                <a data-edit="quote.link2" data-edit-max="28" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <span data-edit="quote.text" data-edit-max="60">118 Foundry Lane, Eastbrook</span>
              </div>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="quote.label" htmlFor="lw-name">Name</label>
                <input id="lw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label2" htmlFor="lw-phone">Phone</label>
                <input id="lw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label3" htmlFor="lw-email">Email</label>
                <input id="lw-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label4" htmlFor="lw-zip">Zip code</label>
                <input id="lw-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="quote.label5" htmlFor="lw-job">Kind of job</label>
                <select id="lw-job" name="job" defaultValue={SERVICES[0].name}>
                  {SERVICES.map((sv) => (
                    <option key={sv.no} value={sv.name}>{sv.name}</option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="quote.label6" htmlFor="lw-desc">What is going on</label>
                <textarea id="lw-desc" name="description" rows={4} placeholder="Which rooms, how old the house is, anything you have noticed." />
              </div>
              <fieldset className={`${s.when} ${s.wide}`}>
                <legend data-edit="quote.legend">Best time for a visit</legend>
                <label>
                  <input type="radio" name="when" value="morning" defaultChecked />
                  <span data-edit="quote.text2" data-edit-max="60">Mornings</span>
                </label>
                <label>
                  <input type="radio" name="when" value="afternoon" />
                  <span data-edit="quote.text3" data-edit-max="60">Afternoons</span>
                </label>
                <label>
                  <input type="radio" name="when" value="any" />
                  <span data-edit="quote.text4" data-edit-max="60">Any time</span>
                </label>
              </fieldset>
              <button data-edit="quote.submit" data-edit-max="24" className={s.submit} type="submit">Send for a quote</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTape} aria-hidden="true">
          <TabbiedPattern
            pattern={rafter}
            palette={TAPE}
            fit="grid"
            cellSize={34}
            seed="live-wire-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <Artwork slug="live-wire-electric-bulb" alt="" inks={['var(--volt)']} className={s.footBulb} />
            <div>
              <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Live Wire Electric</p>
              <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Master electrician license E-40218. Insured, bonded and guaranteed.</p>
            </div>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Call</h2>
            <a data-edit="footer.footLink" data-edit-max="28" className={s.footLink} href={PHONE_HREF}>{PHONE}</a>
            <a data-edit="footer.footLink2" data-edit-max="28" className={s.footLink} href={EMERGENCY_HREF}>{EMERGENCY}</a>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Write</h2>
            <a data-edit="footer.footLink3" data-edit-max="28" className={s.footLink} href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>118 Foundry Lane, Eastbrook</p>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional electrical contractor. Prices, licenses, people and places are invented.</p>
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
