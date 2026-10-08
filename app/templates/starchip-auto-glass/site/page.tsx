import { TabbiedPattern } from 'tabbied/react';
import { icecrack } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './starchip-auto-glass.module.css';

export const metadata = {
  title: 'Starchip Auto Glass: Windshield repair and replacement, we come to you',
  description:
    'Starchip repairs windshield chips in thirty minutes and replaces cracked glass wherever your car is parked. A coin test to tell repair from replace, flat prices, and insurance billed for you.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Concrete and
   asphalt from the parking lot, signal yellow from the van, and two glass
   tints. Ice Crack is laid on asphalt so the cracks read as the dark seal
   between shards: it is the windshield in the hero, the glass that has to
   be replaced in the coin test, the band before the van schedule and the
   edge of the footer. */
const CONCRETE = '#e8e6e1';
const ASPHALT = '#1c2124';
const SIGNAL = '#f2b51e';
const GLASS = '#9cc6cc';
const PANE = '#cfe3e3';

const SHARDS = ['transparent', GLASS, PANE, CONCRETE, GLASS];
const COLD = ['transparent', PANE, GLASS, PANE, CONCRETE];
const WARN = ['transparent', GLASS, SIGNAL, PANE, GLASS];

const NAV = [
  ['Coin test', '#guide'],
  ['Prices', '#prices'],
  ['Mobile service', '#mobile'],
  ['Insurance', '#insurance'],
  ['Book', '#book'],
];

const VERDICTS = [
  { tag: 'Repair', art: 'artChip', size: 'Smaller than a quarter', text: 'A star, a bullseye or a small chip. Resin is injected, cured with UV light and polished flush. Thirty minutes, and the chip stops spreading.', price: '$69', fine: 'Usually $0 with comprehensive cover' },
  { tag: 'Repair, probably', art: 'artCrack', size: 'A crack shorter than a dollar bill', text: 'Up to six inches can be filled if it is not at the edge of the glass and not in the driver\'s line of sight. We tell you on the phone from a photo.', price: '$99', fine: 'Send a photo first, the answer is free' },
];

const HOW_TO = [
  'Measure the damage from the outside, with the car in shade.',
  'For a chip, count the legs: the star is the whole width, legs included.',
  'For a crack, measure end to end, not along the wiggle.',
  'Note where it is: inside the wipers in front of the driver, or near the edge.',
];

const PRICES = [
  ['Chip repair, first chip', '30 min', '$69', 'Most insurers pay in full'],
  ['Each extra chip, same visit', '10 min', '$20', 'Most insurers pay in full'],
  ['Crack repair, up to 6 in', '45 min', '$99', 'Usually covered'],
  ['Windshield, most sedans', '90 min', 'from $289', 'Deductible applies'],
  ['Windshield, SUV or truck', '2 hr', 'from $340', 'Deductible applies'],
  ['Camera recalibration (ADAS)', '45 min', '$150', 'Billed with the glass'],
  ['Side window, door glass', '60 min', 'from $189', 'Deductible applies'],
  ['Back glass with defroster', '90 min', 'from $249', 'Deductible applies'],
];

const ROUTE = [
  ['Mon', 'Northgate, Fallow Park', 'Office lots and the hospital garage'],
  ['Tue', 'Harrow Mills, Eastbank', 'Driveways and the industrial estate'],
  ['Wed', 'Downtown, Pier Street', 'Covered garages only in the rain'],
  ['Thu', 'Larkspur, Oldfield', 'Driveways and school lots after 9'],
  ['Fri', 'Anywhere in the county', 'Fleets and the week\'s overflow'],
  ['Sat', 'The shop, 3 Kiln Road', 'Walk-in chips, no appointment'],
];

const ON_SITE = [
  'About an hour of parking where the van can stop beside the car',
  'Dry glass: covered parking if it rains, above 40 F for resin',
  'The keys, or the car unlocked, if you cannot be there',
  'After a new windshield: one hour before driving, a day before a car wash',
];

const CLAIM = [
  ['Call with your policy number', 'Or type it in the form below. We need the insurer, the number and the date it happened.'],
  ['We check your cover', 'Comprehensive usually pays for a repair in full and a replacement after the deductible. We tell you which before we start.'],
  ['We bill the insurer', 'Directly. No forms for you, no waiting for a check, and no claim on your record for a chip repair with most insurers.'],
  ['You pay the deductible, if any', 'On the day, by card. For repairs that is usually nothing at all.'],
];

const INSURERS = ['Granite Mutual', 'Northfield Casualty', 'Keystone General', 'Prairie State', 'Evergreen Auto', 'Union Fidelity', 'Harbor & Main', 'Lantern Direct'];

export default function StarchipAutoGlassPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--concrete': '#e8e6e1',
        '--asphalt': '#1c2124',
        '--signal': '#f2b51e',
        '--glass': '#9cc6cc',
        '--pane': '#cfe3e3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="concrete,asphalt,signal,glass,pane"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Public+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Starchip</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Auto Glass</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550147722">Call (555) 014-7722</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Windshield repair, mobile across the county</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Chipped glass, <span>fixed where you parked.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              A chip repaired today costs $69 and thirty minutes. Left for a cold
              night, it runs into a crack and a new windshield. Our vans come to
              your driveway or your office lot, and we bill your insurer for you.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a repair</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#guide">Repair or replace?</a>
            </div>
            <ul className={s.heroFacts}>
              <li>
                <strong data-edit="hero.emphasis">30 min</strong>
                <span data-edit="hero.text2" data-edit-max="60">for most chips</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis2">Same day</strong>
                <span data-edit="hero.text3" data-edit-max="60">if you call before 11</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis3">Lifetime</strong>
                <span data-edit="hero.text4" data-edit-max="60">warranty on repairs</span>
              </li>
            </ul>
          </div>

          <div className={s.heroArt}>
            <div className={s.windshield}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,4,0,3" className={s.glassField} aria-hidden="true">
                <TabbiedPattern
                  pattern={icecrack}
                  palette={SHARDS}
                  fit="grid"
                  cellSize={72}
                  seed="starchip-windshield"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.mirror} aria-hidden="true" />
              <span className={s.chipMark} aria-hidden="true" />
            </div>
            <p className={s.callout}>
              <strong data-edit="hero.emphasis4">Chip, 14 mm</strong>
              <span data-edit="hero.text5" data-edit-max="60">Smaller than a quarter: repair it, $69</span>
            </p>
          </div>
        </section>

        <div className={s.hazard} aria-hidden="true" />

        <section id="guide" className={s.sec} aria-labelledby="guide-h">
          <div className={s.secHead}>
            <h2 data-edit="guide.secTitle" data-edit-max="60" id="guide-h" className={s.secTitle}>The coin test</h2>
            <p data-edit="guide.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Hold a coin to the damage. Smaller than a quarter, it can be repaired.
              Longer than a dollar bill, it has to be replaced. In between, send us
              a photo and we will say which, free.
            </p>
          </div>

          <div className={s.scale}>
            <div className={s.ruler} aria-hidden="true" />
            <ol className={s.zones}>
              <li className={s.zoneRepair}>
                <span data-edit="guide.zoneName" data-edit-max="60" className={s.zoneName}>Repair</span>
                <span data-edit="guide.zoneRange" data-edit-max="60" className={s.zoneRange}>0-1 in</span>
              </li>
              <li className={s.zoneMaybe}>
                <span data-edit="guide.zoneName2" data-edit-max="60" className={s.zoneName}>Repair if not in the driver&apos;s view</span>
                <span data-edit="guide.zoneRange2" data-edit-max="60" className={s.zoneRange}>1-6 in</span>
              </li>
              <li className={s.zoneReplace}>
                <span data-edit="guide.zoneName3" data-edit-max="60" className={s.zoneName}>Replace</span>
                <span data-edit="guide.zoneRange3" data-edit-max="60" className={s.zoneRange}>over 6 in, or at the edge</span>
              </li>
            </ol>
            <div className={s.measure}>
              <div className={s.objects} aria-hidden="true">
                <span className={s.quarter} />
                <span className={s.bill} />
              </div>
              <div className={s.howTo}>
                <h3 data-edit="guide.howTitle" data-edit-max="40" className={s.howTitle}>Measuring it yourself</h3>
                <ol className={s.howList}>
                  {HOW_TO.map((step, i) => (
                    <li data-edit={`guide.item.${i}`} data-edit-max="80" key={step}>{step}</li>
                  ))}
                </ol>
                <p data-edit="guide.scaleNote" data-edit-max="240" data-edit-multiline className={s.scaleNote}>
                  Drawn to scale on this rule: a quarter is just under an inch across,
                  a dollar bill a little over six inches long.
                </p>
              </div>
            </div>
          </div>

          <div className={s.verdicts}>
            {VERDICTS.map((v, i) => (
              <article key={v.tag} className={s.verdict}>
                <div className={`${s.verdictArt} ${s[v.art]}`} aria-hidden="true" />
                <p data-edit={`verdict.verdictTag.${i}`} data-edit-max="240" data-edit-multiline className={s.verdictTag}>{v.tag}</p>
                <h3 data-edit={`verdict.verdictSize.${i}`} data-edit-max="40" className={s.verdictSize}>{v.size}</h3>
                <p data-edit={`verdict.verdictText.${i}`} data-edit-max="240" data-edit-multiline className={s.verdictText}>{v.text}</p>
                <p data-edit={`verdict.verdictPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.verdictPrice}>{v.price}</p>
                <p data-edit={`verdict.verdictFine.${i}`} data-edit-max="240" data-edit-multiline className={s.verdictFine}>{v.fine}</p>
              </article>
            ))}
            <article className={`${s.verdict} ${s.verdictReplace}`}>
              <div data-edit-pattern="verdict.field" data-edit-roles="transparent,4,3,4,0" className={s.replaceField} aria-hidden="true">
                <TabbiedPattern
                  pattern={icecrack}
                  palette={COLD}
                  fit="grid"
                  cellSize={46}
                  seed="starchip-replace"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.replaceCard}>
                <p data-edit="verdict.verdictTag2" data-edit-max="240" data-edit-multiline className={s.verdictTag}>Replace</p>
                <h3 data-edit="verdict.verdictSize2" data-edit-max="40" className={s.verdictSize}>Longer than a dollar bill</h3>
                <p data-edit="verdict.verdictText2" data-edit-max="240" data-edit-multiline className={s.verdictText}>
                  Or any crack that reaches the edge, or a chip right in front of the
                  driver. The glass is part of the roof&apos;s strength; we fit OEM-grade
                  glass and recalibrate the camera behind it.
                </p>
                <p data-edit="verdict.verdictPrice2" data-edit-max="240" data-edit-multiline className={s.verdictPrice}>from $289</p>
                <p data-edit="verdict.verdictFine2" data-edit-max="240" data-edit-multiline className={s.verdictFine}>Your deductible, billed to the insurer</p>
              </div>
            </article>
          </div>
        </section>

        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Prices, written down</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Parts, labor, the call-out and disposal of the old glass are all in
              the price. Luxury models and heated or acoustic glass are quoted by
              the VIN, usually in ten minutes.
            </p>
          </div>
          <div className={s.workOrder}>
            <p className={s.orderHead}>
              <span data-edit="prices.text" data-edit-max="60">Work order</span>
              <span data-edit="prices.text2" data-edit-max="60">Starchip Auto Glass, 3 Kiln Road</span>
            </p>
            <table className={s.prices}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Starchip prices</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Service</th>
                  <th data-edit="prices.heading2" scope="col">Time</th>
                  <th data-edit="prices.heading3" scope="col">Price</th>
                  <th data-edit="prices.heading4" scope="col">Insurance</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map(([service, time, price, insurance], i) => (
                  <tr key={service}>
                    <th data-edit={`prices.heading5.${i}`} scope="row">{service}</th>
                    <td data-edit={`prices.cell.${i}`}>{time}</td>
                    <td data-edit={`prices.priceCell.${i}`} className={s.priceCell}>{price}</td>
                    <td data-edit={`prices.cell2.${i}`}>{insurance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,4,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={icecrack}
            palette={WARN}
            fit="grid"
            cellSize={56}
            seed="starchip-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="mobile" className={s.mobile} aria-labelledby="mobile-h">
          <div className={s.mobileInner}>
            <div className={s.mobileHead}>
              <h2 data-edit="mobile.mobileTitle" data-edit-max="60" id="mobile-h" className={s.mobileTitle}>The van comes to you</h2>
              <p data-edit="mobile.mobileNote" data-edit-max="240" data-edit-multiline className={s.mobileNote}>
                Four vans, each in one part of the county on a set day, so a booking
                rarely waits more than two days. Chips are done in the rain under
                cover; replacements need a dry hour.
              </p>
              <h3 data-edit="mobile.needTitle" data-edit-max="40" className={s.needTitle}>What we need on site</h3>
              <ul className={s.need}>
                {ON_SITE.map((item, i) => (
                  <li data-edit={`mobile.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <ol className={s.route}>
              {ROUTE.map(([day, where, note], i) => (
                <li key={day} className={s.routeRow}>
                  <span data-edit={`mobile.routeDay.${i}`} data-edit-max="60" className={s.routeDay}>{day}</span>
                  <span data-edit={`mobile.routeWhere.${i}`} data-edit-max="60" className={s.routeWhere}>{where}</span>
                  <span data-edit={`mobile.routeNote.${i}`} data-edit-max="60" className={s.routeNote}>{note}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="insurance" className={s.sec} aria-labelledby="insurance-h">
          <div className={s.secHead}>
            <h2 data-edit="insurance.secTitle" data-edit-max="60" id="insurance-h" className={s.secTitle}>Insurance, billed for you</h2>
            <p data-edit="insurance.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Glass claims are the one claim most people should make. We handle the
              paperwork with every major insurer and most small ones.
            </p>
          </div>
          <ol className={s.claim}>
            {CLAIM.map(([title, text], i) => (
              <li key={title} className={s.claimStep}>
                <span className={s.claimNo}>{i + 1}</span>
                <h3 data-edit={`insurance.claimTitle.${i}`} data-edit-max="40" className={s.claimTitle}>{title}</h3>
                <p data-edit={`insurance.claimText.${i}`} data-edit-max="240" data-edit-multiline className={s.claimText}>{text}</p>
              </li>
            ))}
          </ol>
          <div className={s.insurers}>
            <p data-edit="insurance.insurersHead" data-edit-max="240" data-edit-multiline className={s.insurersHead}>Billed directly</p>
            <ul className={s.insurerList}>
              {INSURERS.map((name, i) => (
                <li data-edit={`insurance.item.${i}`} data-edit-max="80" key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a repair</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us the car and where it will be. We call back within the hour
                in working time to confirm a slot and check your cover.
              </p>
              <dl className={s.shop}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Call or text</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550147722">(555) 014-7722</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:book@starchipglass.example">book@starchipglass.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Shop</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>3 Kiln Road, Harrow Mills</dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Vans</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Monday to Friday, 7:30-6:00</dd>
                </div>
                <div>
                  <dt data-edit="book.term5" data-edit-max="28">Shop walk-ins</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>Saturday, 8:00-1:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="sc-name">Name</label>
                <input id="sc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="sc-phone">Phone</label>
                <input id="sc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label3" htmlFor="sc-car">Year, make and model</label>
                <input id="sc-car" name="vehicle" type="text" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="book.legend">What happened</legend>
                <div className={s.picks}>
                  <input id="sc-d1" type="radio" name="damage" value="chip" />
                  <label data-edit="book.label4" htmlFor="sc-d1">A chip</label>
                  <input id="sc-d2" type="radio" name="damage" value="crack" />
                  <label data-edit="book.label5" htmlFor="sc-d2">A crack</label>
                  <input id="sc-d3" type="radio" name="damage" value="shattered" />
                  <label data-edit="book.label6" htmlFor="sc-d3">Shattered</label>
                  <input id="sc-d4" type="radio" name="damage" value="side" />
                  <label data-edit="book.label7" htmlFor="sc-d4">Side or back glass</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label8" htmlFor="sc-where">Where the car will be</label>
                <input id="sc-where" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label9" htmlFor="sc-insurer">Insurer</label>
                <input id="sc-insurer" name="insurer" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label10" htmlFor="sc-policy">Policy number</label>
                <input id="sc-policy" name="policy" type="text" />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a slot</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,0,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={icecrack}
            palette={SHARDS}
            fit="grid"
            cellSize={40}
            seed="starchip-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Starchip Auto Glass</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional auto glass business. The names, insurers, prices and address
            are invented, and nothing here is insurance advice.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
