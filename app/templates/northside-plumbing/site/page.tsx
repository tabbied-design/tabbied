import { TabbiedPattern } from 'tabbied/react';
import { circuit, truchetrings } from 'tabbied/patterns';
import s from './northside-plumbing.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Northside Plumbing: Plumbing and heating, 24/7, Northside',
  description:
    'Northside Plumbing and Heating answers the phone day and night. Burst pipes, no heat, blocked drains and water heaters, with the price agreed before any work starts.',
};

/* Site colors. Both fields are drawn on `transparent`: the pipes over the
   navy hero, the street traces over the pale map panel. */
const NAVY = '#0D1B2A';
const BLUE = '#1565C0';
const COPPER = '#C46B2E';
const GRAY = '#8A96A3';

const PIPES = ['transparent', BLUE, COPPER, GRAY];
const MAP = ['transparent', GRAY, BLUE, COPPER, NAVY];

const PHONE = '(555) 014-2290';
const PHONE_HREF = 'tel:+15550142290';

const NAV = [
  ['Services', '#services'],
  ['Prices', '#prices'],
  ['Areas', '#areas'],
  ['Guarantees', '#guarantees'],
  ['Reviews', '#reviews'],
  ['Quote', '#quote'],
];

const URGENT = [
  'Burst or leaking pipes',
  'No heat or no hot water',
  'Blocked drains and toilets',
  'Gas smell after the utility has made it safe',
];

const SERVICES = [
  {
    name: 'Leaks and burst pipes',
    body: 'Found, stopped and repaired, usually in one visit. We carry copper, PEX and push-fit on every van.',
  },
  {
    name: 'Drains and sewer lines',
    body: 'Snaking, hydro-jetting and camera surveys, with the footage sent to you before we quote a repair.',
  },
  {
    name: 'Water heaters',
    body: 'Tank and tankless, gas and electric. Repairs same day, replacements usually next day.',
  },
  {
    name: 'Boilers and furnaces',
    body: 'Breakdowns, annual service and replacements. Licensed for gas, oil and heat pumps.',
  },
  {
    name: 'Toilets, faucets, disposals',
    body: 'The small jobs, at a fixed price, done by the same people who do the big ones.',
  },
  {
    name: 'Kitchen and bath fitting',
    body: 'Rough-in and finish plumbing for remodels, working to your contractor or on our own.',
  },
  {
    name: 'Repiping',
    body: 'Galvanized and polybutylene out, copper or PEX in, with the walls patched before we leave.',
  },
  {
    name: 'Sump pumps and backflow',
    body: 'Installed, tested and certified, including the yearly backflow test your city asks for.',
  },
];

const RATES = [
  {
    label: 'Call-out',
    value: '$89',
    note: 'Weekdays 7 am-6 pm. Nights, weekends and holidays $149. Includes the first 30 minutes.',
  },
  {
    label: 'Hourly',
    value: '$118',
    note: 'After the first 30 minutes, charged in 15-minute steps. Parts at list price, shown on the invoice.',
  },
  {
    label: 'Fixed price',
    value: 'From $145',
    note: 'For the common jobs below. The price is the price, however long it takes us.',
  },
];

const JOBS = [
  ['Clear a blocked sink or tub', '$145', 'About 1 hour'],
  ['Clear a blocked toilet', '$145', 'About 1 hour'],
  ['Replace a toilet fill valve and flapper', '$165', 'About 1 hour'],
  ['Replace a kitchen faucet (yours or ours)', '$210', '1-2 hours'],
  ['Replace a garbage disposal (1/2 hp included)', '$385', '1-2 hours'],
  ['Annual boiler or furnace service', '$159', '1-2 hours'],
  ['Main drain camera survey', '$225', 'About 1 hour'],
  ['40-gallon gas water heater, supplied and fitted', '$1,650', 'Half a day'],
];

const AREAS = [
  ['Northside', '55501'],
  ['Millbrook', '55502'],
  ['Harbor Heights', '55503'],
  ['Old Quarry', '55504'],
  ['Elm Park', '55505'],
  ['Riverbend', '55506'],
  ['Canal Street', '55507'],
  ['Foxhollow', '55508'],
  ['Kingsgate', '55509'],
  ['West Mill', '55511'],
  ['Stonebridge', '55512'],
  ['Lakeview', '55514'],
];

const GUARANTEES = [
  {
    title: 'The price before the work',
    body: 'You get a written price on the doorstep. If the job turns out bigger, we stop and ask before we go on.',
  },
  {
    title: 'No fix, no fee',
    body: 'If we cannot fix it on the first visit and have to come back, the call-out fee comes off the bill.',
  },
  {
    title: 'One year on labor',
    body: 'Every repair and installation is guaranteed for twelve months. Water heaters and boilers, five years on parts.',
  },
  {
    title: 'Clean when we leave',
    body: 'Shoe covers in, dust sheets down, and the old parts taken away unless you want to keep them.',
  },
];

const LICENSES = [
  ['Master Plumber', 'MP-04417'],
  ['Gas Fitter', 'GF-2210'],
  ['Mechanical (HVAC)', 'MC-8841'],
  ['Liability insurance', '$2,000,000'],
  ['Backflow tester', 'BT-0392'],
];

const REVIEWS = [
  {
    quote: 'Pipe burst under the sink at 2 am. Someone answered on the second ring and a van was outside in 40 minutes.',
    who: 'Grace M., Millbrook',
    job: 'Emergency leak',
  },
  {
    quote: 'Quoted $1,650 for the water heater on the phone, and the invoice said $1,650. That never happens.',
    who: 'Luis R., Elm Park',
    job: 'Water heater',
  },
  {
    quote: 'They showed me the camera footage of the drain before telling me what it needed. It needed less than I feared.',
    who: 'Dana P., Riverbend',
    job: 'Drain survey',
  },
  {
    quote: 'Our boiler died the week before Christmas. Fixed the same afternoon, and they left the kitchen cleaner than they found it.',
    who: 'The Okafors, Kingsgate',
    job: 'Boiler repair',
  },
  {
    quote: 'Repiped a 1950s house in three days and patched every hole. The painter could not find where they had been.',
    who: 'Sam T., Old Quarry',
    job: 'Repiping',
  },
  {
    quote: 'Small job, a dripping faucet, and they still came on time and charged exactly the fixed price.',
    who: 'Ruth A., Northside',
    job: 'Faucet',
  },
];

export default function NorthsidePlumbingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f7f9',
        '--navy': '#0d1b2a',
        '--blue': '#1565c0',
        '--copper': '#c46b2e',
        '--gray': '#8a96a3',
        '--pale': '#e1e7ed',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,navy,blue,copper,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Public+Sans:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Northside</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Plumbing and Heating</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barPhone" data-edit-max="28" className={s.barPhone} href={PHONE_HREF}>{PHONE}</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Call first: the number is the biggest thing on the page, and the
            pipes run underneath it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroInner}>
            <p className={s.status}>
              <span className={s.statusDot} aria-hidden="true" />
              <span data-edit="hero.text" data-edit-max="60">Phones answered now. Average response this month: 47 minutes.</span>
            </p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Emergency plumbing and heating,
              <br />
              <em>24 hours a day, 7 days a week.</em>
            </h1>
            <a data-edit="hero.bigPhone" data-edit-max="28" className={s.bigPhone} href={PHONE_HREF}>{PHONE}</a>
            <div className={s.heroFoot}>
              <ul className={s.urgent} aria-label="Call us straight away for">
                {URGENT.map((u, i) => (
                  <li data-edit={`hero.item.${i}`} data-edit-max="80" key={u}>{u}</li>
                ))}
              </ul>
              <div className={s.heroActions}>
                <a data-edit="hero.btnCopper" data-edit-max="28" className={s.btnCopper} href={PHONE_HREF}>Call now</a>
                <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#quote">Not urgent? Get a quote</a>
              </div>
            </div>
          </div>
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4" className={s.pipes} aria-hidden="true">
            <TabbiedPattern
              pattern={truchetrings}
              palette={PIPES}
              fit="grid"
              cellSize={60}
              seed="northside"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* The facts a caller asks first, as a plain strip under the hero. */}
        <div className={s.strip}>
          <dl className={s.stripList}>
            <div>
              <dt data-edit="top.term" data-edit-max="28">47 min</dt>
              <dd data-edit="top.body" data-edit-max="200" data-edit-multiline>Average emergency response</dd>
            </div>
            <div>
              <dt data-edit="top.term2" data-edit-max="28">9 vans</dt>
              <dd data-edit="top.body2" data-edit-max="200" data-edit-multiline>On the road, day and night</dd>
            </div>
            <div>
              <dt data-edit="top.term3" data-edit-max="28">4.9 / 5</dt>
              <dd data-edit="top.body3" data-edit-max="200" data-edit-multiline>From 812 reviews</dd>
            </div>
            <div>
              <dt data-edit="top.term4" data-edit-max="28">Since 1994</dt>
              <dd data-edit="top.body4" data-edit-max="200" data-edit-multiline>Family run, licensed and insured</dd>
            </div>
          </dl>
        </div>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <h2 data-edit="services.title" data-edit-max="60" id="services-h">What we fix</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Homes and small businesses, plumbing and heating, from a
              dripping faucet to a whole-house repipe.
            </p>
          </div>
          <ul className={s.services}>
            {SERVICES.map((sv, i) => (
              <li key={sv.name} className={s.service}>
                <h3 data-edit={`services.title2.${i}`} data-edit-max="40">{sv.name}</h3>
                <p data-edit={`services.body.${i}`} data-edit-max="240" data-edit-multiline>{sv.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">Price guide</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              All prices include tax and are for a single visit to a home in
              our area. The technician confirms the price in writing before
              starting.
            </p>
          </div>
          <dl className={s.rates}>
            {RATES.map((r, i) => (
              <div key={r.label} className={s.rate}>
                <dt data-edit={`prices.rateLabel.${i}`} data-edit-max="28" className={s.rateLabel}>{r.label}</dt>
                <dd data-edit={`prices.rateValue.${i}`} data-edit-max="200" data-edit-multiline className={s.rateValue}>{r.value}</dd>
                <dd data-edit={`prices.rateNote.${i}`} data-edit-max="200" data-edit-multiline className={s.rateNote}>{r.note}</dd>
              </div>
            ))}
          </dl>
          <div className={s.jobsWrap}>
            <table className={s.jobs}>
              <caption data-edit="prices.jobsCaption" className={s.jobsCaption}>Fixed-price jobs</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Job</th>
                  <th data-edit="prices.heading2" scope="col">Typical time</th>
                  <th data-edit="prices.heading3" scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {JOBS.map(([job, price, time], i) => (
                  <tr key={job}>
                    <th data-edit={`prices.heading4.${i}`} scope="row">{job}</th>
                    <td data-edit={`prices.jobTime.${i}`} className={s.jobTime}>{time}</td>
                    <td data-edit={`prices.jobPrice.${i}`} className={s.jobPrice}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------------------------------------- AREAS */}
        <section id="areas" className={s.sec} aria-labelledby="areas-h">
          <div className={s.secHead}>
            <h2 data-edit="areas.title" data-edit-max="60" id="areas-h">Where we go</h2>
            <p data-edit="areas.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Twelve neighborhoods, one yard in the middle of them. Outside
              the list? Call anyway: within twelve miles we come for a $25
              travel charge.
            </p>
          </div>
          <div className={s.areas}>
            <div>
              <ul className={s.areaList}>
                {AREAS.map(([name, zip], i) => (
                  <li key={zip}>
                    <span data-edit={`areas.areaName.${i}`} data-edit-max="60" className={s.areaName}>{name}</span>
                    <span data-edit={`areas.areaZip.${i}`} data-edit-max="60" className={s.areaZip}>{zip}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="areas.areaNote" data-edit-max="240" data-edit-multiline className={s.areaNote}>
                Emergency calls in these ZIP codes are reached in under an hour
                on most nights. Put your ZIP code in the quote form and we will
                confirm before we book.
              </p>
            </div>
            <div className={s.mapPanel}>
              <div data-edit-pattern="areas.field" data-edit-roles="transparent,4,2,3,1" className={s.mapField} aria-hidden="true">
                <TabbiedPattern
                  pattern={circuit}
                  palette={MAP}
                  fit="grid"
                  cellSize={44}
                  seed="streets"
                  options={{ frequency: 0.6 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="areas.mapLabel" data-edit-max="240" data-edit-multiline className={s.mapLabel}>The yard</p>
              <p data-edit="areas.body" data-edit-max="240" data-edit-multiline className={s.mapAddr}>
                1180 Canal Street
                <br />
                Northside 55507
              </p>
              <p data-edit="areas.mapNote" data-edit-max="240" data-edit-multiline className={s.mapNote}>Parts counter open weekdays 7 am-4 pm</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ GUARANTEES */}
        <section id="guarantees" className={s.sec} aria-labelledby="guarantees-h">
          <div className={s.secHead}>
            <h2 data-edit="guarantees.title" data-edit-max="60" id="guarantees-h">Guarantees and licenses</h2>
            <p data-edit="guarantees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Four promises we put in writing on every job, and the numbers
              you can check with the state board.
            </p>
          </div>
          <div className={s.promises}>
            <ol className={s.guarantees}>
              {GUARANTEES.map((g, i) => (
                <li key={g.title}>
                  <h3 data-edit={`guarantees.title2.${i}`} data-edit-max="40">{g.title}</h3>
                  <p data-edit={`guarantees.body.${i}`} data-edit-max="240" data-edit-multiline>{g.body}</p>
                </li>
              ))}
            </ol>
            <div className={s.licenseCard}>
              <h3 data-edit="guarantees.licenseHead" data-edit-max="40" className={s.licenseHead}>Licensed and insured</h3>
              <dl className={s.licenses}>
                {LICENSES.map(([what, num], i) => (
                  <div key={what}>
                    <dt data-edit={`guarantees.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`guarantees.body2.${i}`} data-edit-max="200" data-edit-multiline>{num}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- REVIEWS */}
        <section id="reviews" className={s.sec} aria-labelledby="reviews-h">
          <div className={s.secHead}>
            <h2 data-edit="reviews.title" data-edit-max="60" id="reviews-h">What neighbors say</h2>
            <p data-edit="reviews.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              4.9 out of 5 from 812 reviews over the last three years. A few
              of the short ones.
            </p>
          </div>
          <ul className={s.reviews}>
            {REVIEWS.map((r, i) => (
              <li key={r.who} className={s.review}>
                <blockquote data-edit={`reviews.quote.${i}`} data-edit-max="240" data-edit-multiline>{r.quote}</blockquote>
                <p data-edit={`reviews.reviewWho.${i}`} data-edit-max="240" data-edit-multiline className={s.reviewWho}>{r.who}</p>
                <p data-edit={`reviews.reviewJob.${i}`} data-edit-max="240" data-edit-multiline className={s.reviewJob}>{r.job}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.sec} aria-labelledby="quote-h">
          <div className={s.quote}>
            <div className={s.quoteSide}>
              <h2 data-edit="quote.title" data-edit-max="60" id="quote-h">Request a quote</h2>
              <p data-edit="quote.quoteLede" data-edit-max="240" data-edit-multiline className={s.quoteLede}>
                For work that can wait a day or two. Tell us what you need and
                we will call back within two working hours with a price or a
                time to come and look.
              </p>
              <div className={s.quoteCall}>
                <p data-edit="quote.quoteCallLabel" data-edit-max="240" data-edit-multiline className={s.quoteCallLabel}>Water coming through the ceiling? Skip the form.</p>
                <a data-edit="quote.quoteCallNum" data-edit-max="28" className={s.quoteCallNum} href={PHONE_HREF}>{PHONE}</a>
              </div>
              <dl className={s.office}>
                <div>
                  <dt data-edit="quote.term" data-edit-max="28">Emergencies</dt>
                  <dd data-edit="quote.body" data-edit-max="200" data-edit-multiline>24/7, every day of the year</dd>
                </div>
                <div>
                  <dt data-edit="quote.term2" data-edit-max="28">Office</dt>
                  <dd data-edit="quote.body2" data-edit-max="200" data-edit-multiline>Mon-Fri 7 am-6 pm, Sat 8 am-12 pm</dd>
                </div>
                <div>
                  <dt data-edit="quote.term3" data-edit-max="28">Email</dt>
                  <dd><a data-edit="quote.link" data-edit-max="28" href="mailto:office@northside.example">office@northside.example</a></dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span data-edit="quote.text" data-edit-max="60">Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span data-edit="quote.text2" data-edit-max="60">Phone</span>
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>
              <label className={s.field}>
                <span data-edit="quote.text3" data-edit-max="60">ZIP code</span>
                <input type="text" name="zip" inputMode="numeric" autoComplete="postal-code" />
              </label>
              <label className={s.field}>
                <span data-edit="quote.text4" data-edit-max="60">Type of job</span>
                <select name="job" defaultValue="repair">
                  <option value="repair">Repair</option>
                  <option value="heater">Water heater</option>
                  <option value="heating">Boiler or furnace</option>
                  <option value="drain">Drains</option>
                  <option value="remodel">Kitchen or bath</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <fieldset className={s.when}>
                <legend data-edit="quote.legend">How soon?</legend>
                <label>
                  <input type="radio" name="when" value="week" defaultChecked />
                  <span data-edit="quote.text5" data-edit-max="60">This week</span>
                </label>
                <label>
                  <input type="radio" name="when" value="month" />
                  <span data-edit="quote.text6" data-edit-max="60">This month</span>
                </label>
                <label>
                  <input type="radio" name="when" value="planning" />
                  <span data-edit="quote.text7" data-edit-max="60">Just planning</span>
                </label>
              </fieldset>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span data-edit="quote.text8" data-edit-max="60">What is going on?</span>
                <textarea name="details" rows={4} />
              </label>
              <button data-edit="quote.submit" data-edit-max="24" className={s.submit} type="submit">Send request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Northside Plumbing and Heating</p>
            <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>1180 Canal Street, Northside 55507</p>
          </div>
          <a data-edit="footer.footPhone" data-edit-max="28" className={s.footPhone} href={PHONE_HREF}>{PHONE}</a>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional plumbing contractor. Prices, licenses, reviews and ZIP codes are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>

      {/* On a phone the number stays on screen: a bar pinned to the bottom. */}
      <div className={s.callBar}>
        <a className={s.callBarPhone} href={PHONE_HREF}>
          <span data-edit="page.callWord" data-edit-max="60" className={s.callWord}>Call </span>
          <span data-edit="page.text" data-edit-max="60">{PHONE}</span>
        </a>
        <a data-edit="page.callBarQuote" data-edit-max="28" className={s.callBarQuote} href="#quote">Quote</a>
      </div>
    </div>
  );
}
