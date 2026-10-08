import { TabbiedPattern } from 'tabbied/react';
import { gully } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './tidy-tank-septic.module.css';

export const metadata = {
  title: 'Tidy Tank Septic: Pump-outs, inspections and septic repairs',
  description:
    'Tidy Tank pumps and inspects septic tanks across the valley. Pump-out intervals by household size, inspections for home sales with a report in two days, what never to flush, and flat prices.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   service log card: manila stock, black ink, and the colors of the ground
   the tank sits in (loam, olive, stone) with a high-visibility orange for
   the truck. The gully is the soil itself, blocks of earth with a V worn up
   into them like water finding its way down: the cross-section beside the
   log card in the hero, the drain field between the sections, and the
   ground line at the foot of the page. */
const MANILA = '#e9dfc6';
const INK = '#1f2420';
const HIVIS = '#e0662a';
const OLIVE = '#6b7046';
const LOAM = '#7c5b3e';
const STONE = '#b8ab8d';

const SOIL = ['transparent', LOAM, OLIVE, INK, STONE, HIVIS];
const FIELD = ['transparent', OLIVE, STONE, LOAM, OLIVE, INK];
const GROUND = ['transparent', LOAM, STONE, OLIVE, HIVIS, LOAM];

const NAV = [
  ['How often', '#intervals'],
  ['Inspections', '#inspections'],
  ['Do not flush', '#flush'],
  ['Prices', '#prices'],
  ['Book', '#book'],
];

const LOG = [
  { date: '03/14/2017', work: 'Pump-out', sludge: '14 in', tech: 'RJ' },
  { date: '05/02/2020', work: 'Pump-out, filter cleaned', sludge: '11 in', tech: 'DM' },
  { date: '06/18/2023', work: 'Pump-out, riser fitted', sludge: '12 in', tech: 'RJ' },
  { date: '06/09/2026', work: 'Pump-out', sludge: '13 in', tech: 'TS' },
];

const PEOPLE = ['1', '2', '3', '4', '5', '6+'];

/* Years between pump-outs, by tank size and the number of people in the
   house; `short` marks the intervals of two years or less. */
const INTERVALS = [
  { tank: '750 gal', years: ['9.1', '4.2', '2.6', '1.8', '1.3', '1.0'], short: [false, false, false, true, true, true] },
  { tank: '1,000 gal', years: ['12.4', '5.9', '3.7', '2.6', '2.0', '1.5'], short: [false, false, false, false, true, true] },
  { tank: '1,250 gal', years: ['15.6', '7.5', '4.8', '3.4', '2.6', '2.0'], short: [false, false, false, false, false, true] },
  { tank: '1,500 gal', years: ['18.9', '9.1', '5.9', '4.2', '3.3', '2.6'], short: [false, false, false, false, false, false] },
];

const INSPECTION = [
  ['Find and uncover', 'We locate every lid, dig to it if we must, and note the depth for the next owner.'],
  ['Pump and look inside', 'The tank is emptied so we can see the walls, the baffles and the inlet and outlet pipes.'],
  ['Check the filter', 'The outlet filter is pulled, cleaned and checked for the roots and grease that mean trouble.'],
  ['Camera the line', 'A camera runs from the tank to the distribution box, looking for cracks, sags and roots.'],
  ['Probe the drain field', 'We probe each trench for standing water and run a flow test for thirty minutes.'],
  ['Write it up', 'A signed report within two working days: pass, pass with notes, or fail with a costed repair.'],
];

const FLUSH_NEVER = [
  ['Wipes, even ones sold as flushable', 'They do not break down. They knot into ropes at the inlet baffle.'],
  ['Cooking fat and grease', 'It floats, sets hard, and seals the drain field from above.'],
  ['Paper towels and tissues', 'Made to stay strong when wet, which is exactly the problem.'],
  ['Cat litter', 'Clay and sand settle into a layer no pump can lift.'],
  ['Medicines', 'They kill the bacteria that do the tank\'s work. Take them back to a pharmacy.'],
  ['Paint, solvents, motor oil', 'Poison for the tank, and for the well water downhill of it.'],
  ['Coffee grounds', 'They never break down, and a pot a day adds a bucket a month.'],
  ['Dental floss and hair', 'They wrap round anything that moves, including our pump.'],
  ['Tampons, pads and condoms', 'Bin them. They are the commonest cause of a blocked inlet.'],
  ['Bleach by the bottle', 'A splash in the laundry is fine. A gallon down the drain is not.'],
];

const FLUSH_FINE = [
  'Toilet paper, any brand',
  'What your body makes',
  'Ordinary washing-up and laundry water, spread across the week',
];

const PRICES = [
  ['Pump-out, tank up to 1,000 gallons', '$345'],
  ['Each extra 250 gallons', '$65'],
  ['Dig to find a buried lid', '$90'],
  ['Riser and lid fitted, so we never dig again', '$650'],
  ['Outlet filter, cleaned', 'Included'],
  ['Outlet filter, replaced', '$85'],
  ['Camera inspection of the line', '$225'],
  ['Inspection for a home sale, with report', '$395'],
  ['Evenings, weekends and holidays', '+ $150'],
];

const HOURS = [
  ['Monday to Friday', '7:00-5:00'],
  ['Saturday', '8:00-12:00'],
  ['Backups and overflows', 'Every hour, every day'],
];

const TOWNS = ['Harlow Valley', 'Millbrook', 'Cedar Fork', 'East Tamsin', 'Pellam', 'Rook Hollow', 'Stonebridge'];

export default function TidyTankSepticPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--manila': '#e9dfc6',
        '--ink': '#1f2420',
        '--hivis': '#e0662a',
        '--olive': '#6b7046',
        '--loam': '#7c5b3e',
        '--stone': '#b8ab8d',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="manila,ink,hivis,olive,loam,stone"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Public+Sans:wght@400;500;600&family=Courier+Prime&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Tidy Tank</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Septic service</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="tel:+15550158812">
          <span data-edit="bar.barCallLabel" data-edit-max="60" className={s.barCallLabel}>Backed up? 24 hours</span>
          <span data-edit="bar.barCallNumber" data-edit-max="60" className={s.barCallNumber}>(555) 015-8812</span>
        </a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* The hero: the claim on the left, and on the right a cross-section
            of the ground with the service log card for one tank laid over it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Septic pumping and inspection, family-run since 1994</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Pumped, inspected, <span>and written down.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Every tank we pump gets a log card: the date, the gallons, how
              deep the sludge was and who did the work. We keep a copy, you
              keep a copy, and we call you when the next one is due.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a pump-out</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#intervals">How often do I need one?</a>
            </div>
            <ul className={s.creds}>
              <li data-edit="hero.item" data-edit-max="80">State septic license 4471</li>
              <li data-edit="hero.item2" data-edit-max="80">Same-week pump-outs</li>
              <li data-edit="hero.item3" data-edit-max="80">Three trucks, eleven towns</li>
            </ul>
          </div>
          <div className={s.heroGround}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,4,3,1,5,2" className={s.soil} aria-hidden="true">
              <TabbiedPattern
                pattern={gully}
                palette={SOIL}
                fit="grid"
                cellSize={56}
                seed="tidytank-soil"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.card}>
              <div className={s.cardHead}>
                <p data-edit="hero.cardTitle" data-edit-max="240" data-edit-multiline className={s.cardTitle}>Service log</p>
                <p data-edit="hero.cardNo" data-edit-max="240" data-edit-multiline className={s.cardNo}>Card 0388</p>
              </div>
              <dl className={s.cardFacts}>
                <div>
                  <dt data-edit="hero.term" data-edit-max="28">Address</dt>
                  <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>14 Orchard Lane, Millbrook</dd>
                </div>
                <div>
                  <dt data-edit="hero.term2" data-edit-max="28">Tank</dt>
                  <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>1,000 gal concrete, 2 compartments</dd>
                </div>
              </dl>
              <table className={s.log}>
                <caption data-edit="hero.srOnly" className={s.srOnly}>Pump-outs logged for this tank</caption>
                <thead>
                  <tr>
                    <th data-edit="hero.heading" scope="col">Date</th>
                    <th data-edit="hero.heading2" scope="col">Work</th>
                    <th data-edit="hero.heading3" scope="col">Sludge</th>
                    <th data-edit="hero.heading4" scope="col">By</th>
                  </tr>
                </thead>
                <tbody>
                  {LOG.map((row, i) => (
                    <tr key={row.date}>
                      <td data-edit={`hero.cell.${i}`}>{row.date}</td>
                      <td data-edit={`hero.cell2.${i}`}>{row.work}</td>
                      <td data-edit={`hero.cell3.${i}`}>{row.sludge}</td>
                      <td data-edit={`hero.cell4.${i}`}>{row.tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="hero.nextDue" data-edit-max="240" data-edit-multiline className={s.nextDue}>Next due: June 2029</p>
            </div>
          </div>
        </section>

        {/* How often: the interval table, a row per tank size and a column per
            person in the house. */}
        <section id="intervals" className={s.sec} aria-labelledby="intervals-h">
          <div className={s.secHead}>
            <p data-edit="intervals.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>Section 1</p>
            <h2 data-edit="intervals.secTitle" data-edit-max="60" id="intervals-h" className={s.secTitle}>How often to pump</h2>
            <p data-edit="intervals.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Years between pump-outs, by the size of your tank and the number
              of people living in the house. Find your row, then read across.
              Whatever the table says, we suggest no more than five years.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.intervals}>
              <caption data-edit="intervals.srOnly" className={s.srOnly}>Years between pump-outs by tank size and household size</caption>
              <thead>
                <tr>
                  <th data-edit="intervals.corner" scope="col" className={s.corner}>Tank size</th>
                  {PEOPLE.map((p, i) => (
                    <th data-edit={`intervals.heading.${i}`} key={p} scope="col">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INTERVALS.map((row, i) => (
                  <tr key={row.tank}>
                    <th data-edit={`intervals.heading2.${i}`} scope="row">{row.tank}</th>
                    {row.years.map((y, j) => (
                      <td data-edit={`intervals.short.${i}.${j}`} key={PEOPLE[j]} className={row.short[j] ? s.short : undefined}>{y}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.legend}>
            <p data-edit="intervals.legendPeople" data-edit-max="240" data-edit-multiline className={s.legendPeople}>Across the top: people living in the house</p>
            <p data-edit="intervals.legendShort" data-edit-max="240" data-edit-multiline className={s.legendShort}>Boxed: every two years or sooner</p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,5,4,3,1" className={s.field} aria-hidden="true">
          <TabbiedPattern
            pattern={gully}
            palette={FIELD}
            fit="grid"
            cellSize={40}
            seed="tidytank-field"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* Inspections for a home sale, laid out like the report itself. */}
        <section id="inspections" className={s.sec} aria-labelledby="inspections-h">
          <div className={s.inspectGrid}>
            <div className={s.inspectIntro}>
              <p data-edit="inspections.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>Section 2</p>
              <h2 data-edit="inspections.secTitle" data-edit-max="60" id="inspections-h" className={s.secTitle}>Selling a house?</h2>
              <p data-edit="inspections.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Most lenders and the county want a septic inspection before a
                sale closes. Ours takes about three hours, and the report is
                accepted by every lender we have worked with.
              </p>
              <div className={s.priceTag}>
                <p data-edit="inspections.priceBig" data-edit-max="240" data-edit-multiline className={s.priceBig}>$395</p>
                <p data-edit="inspections.priceSmall" data-edit-max="240" data-edit-multiline className={s.priceSmall}>Inspection and report. The pump-out at the same visit is $345.</p>
              </div>
            </div>
            <ol className={s.report}>
              {INSPECTION.map(([title, text], i) => (
                <li key={title} className={s.reportItem}>
                  <h3 data-edit={`inspections.reportTitle.${i}`} data-edit-max="40" className={s.reportTitle}>{title}</h3>
                  <p data-edit={`inspections.reportText.${i}`} data-edit-max="240" data-edit-multiline className={s.reportText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What not to flush: a warning notice inside hazard tape. */}
        <section id="flush" className={s.flush} aria-labelledby="flush-h">
          <div className={s.flushInner}>
            <div className={s.flushHead}>
              <p data-edit="flush.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>Section 3</p>
              <h2 data-edit="flush.flushTitle" data-edit-max="60" id="flush-h" className={s.flushTitle}>Never flush these</h2>
              <p data-edit="flush.flushNote" data-edit-max="240" data-edit-multiline className={s.flushNote}>
                Half of our emergency calls come back to one of the ten things
                below. Print this part and stick it inside the bathroom cabinet.
              </p>
              <h3 data-edit="flush.fineTitle" data-edit-max="40" className={s.fineTitle}>Fine to flush</h3>
              <ul className={s.fine}>
                {FLUSH_FINE.map((f, i) => (
                  <li data-edit={`flush.item.${i}`} data-edit-max="80" key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <ol className={s.never}>
              {FLUSH_NEVER.map(([what, why], i) => (
                <li key={what} className={s.neverItem}>
                  <h3 data-edit={`flush.neverWhat.${i}`} data-edit-max="40" className={s.neverWhat}>{what}</h3>
                  <p data-edit={`flush.neverWhy.${i}`} data-edit-max="240" data-edit-multiline className={s.neverWhy}>{why}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Prices, as the rate card taped inside the truck door. */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.pricesGrid}>
            <div>
              <p data-edit="prices.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>Section 4</p>
              <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Flat prices</h2>
              <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                What you see here is what the invoice says. No fuel surcharge,
                no disposal fee added at the end, and the tech will tell you the
                total before the hose comes off the truck.
              </p>
              <h3 data-edit="prices.townsTitle" data-edit-max="40" className={s.townsTitle}>Where we go</h3>
              <ul className={s.towns}>
                {TOWNS.map((t, i) => (
                  <li data-edit={`prices.item.${i}`} data-edit-max="80" key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <table className={s.rates}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Septic service prices</caption>
              <tbody>
                {PRICES.map(([what, price], i) => (
                  <tr key={what}>
                    <th data-edit={`prices.heading.${i}`} scope="row">{what}</th>
                    <td data-edit={`prices.cell.${i}`}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Booking. */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.bookInfo}>
              <p data-edit="book.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>Section 5</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a visit</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us roughly where the tank is and when it was last pumped.
                If you have no idea, that is normal, and we will find it.
              </p>
              <p data-edit="book.yard" data-edit-max="240" data-edit-multiline className={s.yard}>Yard and office: 2 Gravel Pit Road, Millbrook</p>
              <p className={s.contactLine}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550158812">(555) 015-8812</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:office@tidytank.example">office@tidytank.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field2}>
                <label data-edit="book.label" htmlFor="tt-name">Name</label>
                <input id="tt-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field2}>
                <label data-edit="book.label2" htmlFor="tt-phone">Phone</label>
                <input id="tt-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field2} ${s.wide}`}>
                <label data-edit="book.label3" htmlFor="tt-address">Address of the tank</label>
                <input id="tt-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field2}>
                <label data-edit="book.label4" htmlFor="tt-service">What you need</label>
                <select id="tt-service" name="service" defaultValue="pump">
                  <option value="pump">Pump-out</option>
                  <option value="sale">Inspection for a sale</option>
                  <option value="riser">Riser and lid</option>
                  <option value="slow">Slow drains or a smell</option>
                </select>
              </div>
              <div className={s.field2}>
                <label data-edit="book.label5" htmlFor="tt-people">People in the house</label>
                <input id="tt-people" name="people" type="number" min="1" max="20" />
              </div>
              <div className={`${s.field2} ${s.wide}`}>
                <label data-edit="book.label6" htmlFor="tt-last">Last pumped, if you know</label>
                <input id="tt-last" name="last" type="text" />
              </div>
              <div className={`${s.field2} ${s.wide}`}>
                <label data-edit="book.label7" htmlFor="tt-note">Anything else</label>
                <textarea id="tt-note" name="note" rows={3} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send booking request</button>
              <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>For a backup or an overflow, call. Do not wait for an email.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,5,3,2,4" className={s.groundLine} aria-hidden="true">
          <TabbiedPattern
            pattern={gully}
            palette={GROUND}
            fit="grid"
            cellSize={36}
            seed="tidytank-ground"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tidy Tank Septic</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional septic company. The people, license number, prices,
            towns and address are invented.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
