import { TabbiedPattern } from 'tabbied/react';
import { maline } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './deep-end-pool-care.module.css';

export const metadata = {
  title: 'Deep End Pool Care: Weekly pool service, openings, closings and repairs',
  description:
    'Deep End tests and balances your pool every week on a fixed neighborhood route: pH, chlorine and alkalinity on every visit, chemicals included, a photo report before we leave the gate. Spring openings, fall closings and repairs at posted prices.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   water test strip: each reading is a pad, the pads are the sections. Maline
   is the water itself, a net of feathered dots in aqua, foam, chlorine
   yellow and float coral over the deep end. It fills the pool in the hero,
   runs as the waterline between the route and the seasons, lies under the
   winter cover and edges the footer. */
const FOAM = '#edf5f2';
const DEEP = '#0c3442';
const AQUA = '#2aa6a0';
const CORAL = '#ee6a4e';
const SUN = '#f2c14e';

const WATER = ['transparent', AQUA, FOAM, SUN, CORAL, AQUA];
const WATERLINE = ['transparent', FOAM, AQUA, AQUA, SUN, FOAM];
const WINTER = ['transparent', FOAM, AQUA, FOAM, AQUA, SUN];

const NAV = [
  ['Readings', '#readings'],
  ['Weekly visit', '#visit'],
  ['The route', '#route'],
  ['Open and close', '#seasons'],
  ['Repairs', '#repairs'],
  ['Contact', '#contact'],
];

const STRIP = [
  ['pH', '7.5'],
  ['FC', '2.5'],
  ['TA', '100'],
  ['CYA', '40'],
];

type Reading = { key: string; name: string; target: string; scale: string[]; low: string; high: string; fix: string };

const READINGS: Reading[] = [
  {
    key: 'ph',
    name: 'pH',
    target: '7.4-7.6',
    scale: ['6.8', '7.2', '7.5', '7.8', '8.2'],
    low: 'Below 7.2 the water turns corrosive: it etches plaster, pits the heater and stings eyes.',
    high: 'Above 7.8 chlorine stops working, the water clouds, and scale crusts the tile line.',
    fix: 'Acid or soda ash, dosed by the gallons in your pool, never by the jug.',
  },
  {
    key: 'cl',
    name: 'Free chlorine',
    target: '1-3 ppm',
    scale: ['0', '0.5', '2', '5', '10'],
    low: 'Under 1 ppm algae takes hold in two warm days, and green water takes a week to clear.',
    high: 'Over 5 ppm swimsuits fade and skin dries. The pool smell is usually too little, not too much.',
    fix: 'Liquid chlorine every visit, and a tablet feeder topped up to carry it to the next.',
  },
  {
    key: 'ta',
    name: 'Total alkalinity',
    target: '80-120 ppm',
    scale: ['40', '80', '100', '120', '180'],
    low: 'Low alkalinity lets pH swing with every rainstorm and every pool party.',
    high: 'High alkalinity pins pH up and makes it stubborn to bring back down.',
    fix: 'Baking soda to raise it, acid and aeration to lower it. A full panel every month.',
  },
];

const VISIT = [
  ['Skim and empty', 'The surface, the skimmer basket and the pump basket.'],
  ['Brush', 'Walls, steps, benches and the tile line, where scale starts.'],
  ['Vacuum', 'The floor by hand, or we check the robot did its job.'],
  ['Test and balance', 'pH, chlorine and alkalinity, dosed on the spot.'],
  ['Read the filter', 'Backwash or clean when pressure is 8 psi over clean.'],
  ['Check the equipment', 'Pump, timer, heater and salt cell, for leaks and faults.'],
  ['Photo report', 'The pool and the readings, sent to your phone before we leave.'],
  ['Close the gate', 'We check the self-latching gate catches behind us, every time.'],
];

const PLANS = [
  { name: 'Weekly full service', price: '$165', per: 'a month', note: 'Chemicals included up to 25,000 gallons. Most of our pools.' },
  { name: 'Every other week', price: '$115', per: 'a month', note: 'Chemicals included. For pools with a robot cleaner and few trees.' },
  { name: 'Chemicals only', price: '$90', per: 'a month', note: 'Weekly test and balance. You do the brushing.' },
];

type Stop = { day: string; area: string; window: string; streets: string; pools: string; open: string; full?: boolean };

const ROUTE: Stop[] = [
  { day: 'Mon', area: 'Harbor Heights', window: '7:30-12:30', streets: 'Bayview, Gull Lane, Pier Road', pools: '14 pools', open: '1 opening' },
  { day: 'Tue', area: 'Westlake and Linden Park', window: '7:30-1:30', streets: 'Lakeshore, Fern Court, Alder Way', pools: '16 pools', open: 'Full', full: true },
  { day: 'Wed', area: 'Cedar Bluffs', window: '8:00-1:00', streets: 'Ridge Road, Juniper, Overlook', pools: '13 pools', open: '2 openings' },
  { day: 'Thu', area: 'Old Orchard and Millbrook', window: '7:30-2:00', streets: 'Pippin Lane, Mill Race, Cider Hill', pools: '17 pools', open: 'Full', full: true },
  { day: 'Fri', area: 'Sandpiper Cove', window: '7:30-12:00', streets: 'Tern Drive, Dune Path, Marsh End', pools: '12 pools', open: '3 openings' },
];

const OPENING = [
  'Pump off the cover water, lift and fold the cover',
  'Pull the winter plugs, refit ladders, rails and baskets',
  'Start the pump and filter and check every union for leaks',
  'Shock and balance, then a return visit three days later',
];

const CLOSING = [
  'Balance and shock for the months under cover',
  'Lower the water below the skimmer mouth',
  'Blow out every line and plug it at the wall',
  'Drain the pump, filter and heater; antifreeze in the lines',
];

const REPAIRS = [
  ['Filter cartridge deep clean', '$85', 'Every six months on most pools'],
  ['Sand change, 300 lb', '$260', 'Every five to seven years'],
  ['Pump motor replacement', 'from $480', 'Parts and labor, two-year warranty'],
  ['Heater diagnosis', '$95', 'Credited to the repair if you go ahead'],
  ['Leak detection', '$225', 'Dye and pressure test, written report'],
  ['Salt cell acid wash', '$70', 'When the cell reads scale'],
  ['Green-to-clean recovery', 'from $350', 'Three visits in one week'],
];

const HOURS = [
  ['Route days', 'Mon-Fri, 7:30-2:00'],
  ['Phones', 'Mon-Sat, 8:00-5:00'],
  ['Shop counter', 'Mon-Fri 2:00-6:00, Sat 9:00-1:00'],
];

export default function DeepEndPoolCarePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--foam': '#edf5f2',
        '--deep': '#0c3442',
        '--aqua': '#2aa6a0',
        '--coral': '#ee6a4e',
        '--sun': '#f2c14e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="foam,deep,aqua,coral,sun"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Figtree:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDot} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Deep End</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Pool Care</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550173300">(555) 017-3300</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The pool from above, with this morning's test strip on the deck. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Weekly pool service on the north shore since 2011</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Clear water, tested <span>not guessed.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              One technician, the same day every week, on a route that never
              crosses town. We test three readings at every visit, balance on
              the spot, and send you a photo of the water before we close the
              gate.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Get on the route</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#route">See the weekly route</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Weekly service</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>$165 / mo</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Chemicals</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Included</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Pools on the route</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>72</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,0,4,3,2" className={s.pool} aria-hidden="true">
              <TabbiedPattern
                pattern={maline}
                palette={WATER}
                fit="grid"
                cellSize={84}
                seed="deepend-pool"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figure className={s.strip}>
              <ul className={s.pads}>
                {STRIP.map(([k, v], i) => (
                  <li key={k} className={s.padRow}>
                    <span className={s.pad} aria-hidden="true" />
                    <span data-edit={`hero.padKey.${i}`} data-edit-max="60" className={s.padKey}>{k}</span>
                    <span data-edit={`hero.padVal.${i}`} data-edit-max="60" className={s.padVal}>{v}</span>
                  </li>
                ))}
              </ul>
              <figcaption data-edit="hero.stripCap" data-edit-max="120" data-edit-multiline className={s.stripCap}>A Westlake pool, Tuesday 9:14</figcaption>
            </figure>
          </div>
        </section>

        {/* -------------------------------------------------------- READINGS
            Three pads, three sections: what each reading does. */}
        <section id="readings" className={s.sec} aria-labelledby="readings-h">
          <div className={s.secHead}>
            <p data-edit="readings.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Every visit, three readings</p>
            <h2 data-edit="readings.secTitle" data-edit-max="60" id="readings-h" className={s.secTitle}>What we test, and why it matters</h2>
            <p data-edit="readings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A test strip has a pad for each reading and a chart on the bottle
              to read it against. Here is ours, with the range we hold your pool
              to and what goes wrong outside it.
            </p>
          </div>
          <div className={s.readings}>
            {READINGS.map((r, i) => (
              <article key={r.key} className={`${s.reading} ${s[r.key]}`}>
                <div className={s.readingPad} aria-hidden="true" />
                <h3 data-edit={`reading.readingName.${i}`} data-edit-max="40" className={s.readingName}>{r.name}</h3>
                <p className={s.readingTarget}>{`Target ${r.target}`}</p>
                <ol className={s.scale}>
                  {r.scale.map((v, j) => (
                    <li key={v} className={j === 2 ? s.scaleHit : undefined}>
                      <span className={s.chip} aria-hidden="true" />
                      <span data-edit={`reading.chipVal.${i}.${j}`} data-edit-max="60" className={s.chipVal}>{v}</span>
                    </li>
                  ))}
                </ol>
                <dl className={s.readingNotes}>
                  <div>
                    <dt data-edit={`reading.term.${i}`} data-edit-max="28">Too low</dt>
                    <dd data-edit={`reading.body.${i}`} data-edit-max="200" data-edit-multiline>{r.low}</dd>
                  </div>
                  <div>
                    <dt data-edit={`reading.term2.${i}`} data-edit-max="28">Too high</dt>
                    <dd data-edit={`reading.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.high}</dd>
                  </div>
                  <div>
                    <dt data-edit={`reading.term3.${i}`} data-edit-max="28">What we do</dt>
                    <dd data-edit={`reading.body3.${i}`} data-edit-max="200" data-edit-multiline>{r.fix}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visitSec} aria-labelledby="visit-h">
          <div className={s.visitGrid}>
            <div>
              <p data-edit="visit.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>About 35 minutes at the pool</p>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>The weekly visit</h2>
              <ol className={s.visitList}>
                {VISIT.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.visitNo}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 data-edit={`visit.visitTitle.${i}`} data-edit-max="40" className={s.visitTitle}>{t}</h3>
                    <p data-edit={`visit.visitText.${i}`} data-edit-max="240" data-edit-multiline className={s.visitText}>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.plans}>
              {PLANS.map((p, i) => (
                <article key={p.name} className={i === 0 ? `${s.plan} ${s.planMain}` : s.plan}>
                  <h3 data-edit={`plan.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                  <p className={s.planPrice}>
                    <span data-edit={`plan.planAmount.${i}`} data-edit-max="60" className={s.planAmount}>{p.price}</span>
                    <span data-edit={`plan.planPer.${i}`} data-edit-max="60" className={s.planPer}>{p.per}</span>
                  </p>
                  <p data-edit={`plan.planNote.${i}`} data-edit-max="240" data-edit-multiline className={s.planNote}>{p.note}</p>
                </article>
              ))}
              <p data-edit="visit.planSmall" data-edit-max="240" data-edit-multiline className={s.planSmall}>Over 25,000 gallons, add $20 a month per 5,000. No contract: stop with one visit's notice.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROUTE */}
        <section id="route" className={s.sec} aria-labelledby="route-h">
          <div className={s.secHead}>
            <p data-edit="route.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>One neighborhood a day</p>
            <h2 data-edit="route.secTitle" data-edit-max="60" id="route-h" className={s.secTitle}>The weekly route</h2>
            <p data-edit="route.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We keep each day to one part of town, so the truck spends its
              morning at pools, not at lights. If your street is on a day with
              an opening, you can start next week.
            </p>
          </div>
          <ol className={s.route}>
            {ROUTE.map((r, i) => (
              <li key={r.day} className={r.full ? `${s.stop} ${s.stopFull}` : s.stop}>
                <span className={s.stopDot} aria-hidden="true" />
                <p data-edit={`route.stopDay.${i}`} data-edit-max="240" data-edit-multiline className={s.stopDay}>{r.day}</p>
                <h3 data-edit={`route.stopArea.${i}`} data-edit-max="40" className={s.stopArea}>{r.area}</h3>
                <p data-edit={`route.stopWindow.${i}`} data-edit-max="240" data-edit-multiline className={s.stopWindow}>{r.window}</p>
                <p data-edit={`route.stopStreets.${i}`} data-edit-max="240" data-edit-multiline className={s.stopStreets}>{r.streets}</p>
                <p data-edit={`route.stopPools.${i}`} data-edit-max="240" data-edit-multiline className={s.stopPools}>{r.pools}</p>
                <p data-edit={`route.stopOpen.${i}`} data-edit-max="240" data-edit-multiline className={s.stopOpen}>{r.open}</p>
              </li>
            ))}
          </ol>
          <p data-edit="route.routeNote" data-edit-max="240" data-edit-multiline className={s.routeNote}>Saturdays are for green-pool rescues and repairs, by appointment.</p>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,0,2,2,4,0" className={s.waterline} aria-hidden="true">
          <TabbiedPattern
            pattern={maline}
            palette={WATERLINE}
            fit="grid"
            cellSize={80}
            seed="deepend-waterline"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- SEASONS */}
        <section id="seasons" className={s.sec} aria-labelledby="seasons-h">
          <div className={s.secHead}>
            <p data-edit="seasons.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Twice a year</p>
            <h2 data-edit="seasons.secTitle" data-edit-max="60" id="seasons-h" className={s.secTitle}>Opening and closing</h2>
            <p data-edit="seasons.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Both are booked by date, first come, and both are free for weekly
              customers who stay on the route through the summer.
            </p>
          </div>
          <div className={s.seasons}>
            <article className={s.opening}>
              <div className={s.springPad}>
                <p data-edit="opening.springLabel" data-edit-max="240" data-edit-multiline className={s.springLabel}>Booking window</p>
                <p data-edit="opening.springDates" data-edit-max="240" data-edit-multiline className={s.springDates}>March 15 to May 15</p>
              </div>
              <div className={s.openingBody}>
                <h3 data-edit="opening.seasonName" data-edit-max="40" className={s.seasonName}>Spring opening</h3>
                <p data-edit="opening.seasonPrice" data-edit-max="240" data-edit-multiline className={s.seasonPrice}>$325</p>
                <ol className={s.seasonSteps}>
                  {OPENING.map((o, i) => (
                    <li data-edit={`opening.item.${i}`} data-edit-max="80" key={o}>{o}</li>
                  ))}
                </ol>
                <p data-edit="opening.seasonNote" data-edit-max="240" data-edit-multiline className={s.seasonNote}>Swimmable in about a week, sooner in a warm spring.</p>
              </div>
            </article>
            <article className={s.closing}>
              <div data-edit-pattern="closing.field" data-edit-roles="transparent,0,2,0,2,4" className={s.cover} aria-hidden="true">
                <TabbiedPattern
                  pattern={maline}
                  palette={WINTER}
                  fit="grid"
                  cellSize={64}
                  seed="deepend-winter"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.closingBody}>
                <p data-edit="closing.seasonWhen" data-edit-max="240" data-edit-multiline className={s.seasonWhen}>Booked September 15 to November 1</p>
                <h3 data-edit="closing.seasonName" data-edit-max="40" className={s.seasonName}>Fall closing</h3>
                <p data-edit="closing.seasonPrice" data-edit-max="240" data-edit-multiline className={s.seasonPrice}>$295</p>
                <ol className={s.seasonSteps}>
                  {CLOSING.map((c, i) => (
                    <li data-edit={`closing.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                  ))}
                </ol>
                <p data-edit="closing.seasonNote" data-edit-max="240" data-edit-multiline className={s.seasonNote}>Safety cover fitted and tensioned. We check it once in January.</p>
              </div>
            </article>
          </div>
        </section>

        {/* --------------------------------------------------------- REPAIRS */}
        <section id="repairs" className={s.sec} aria-labelledby="repairs-h">
          <div className={s.repairsGrid}>
            <div className={s.secHead}>
              <p data-edit="repairs.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Priced before we start</p>
              <h2 data-edit="repairs.secTitle" data-edit-max="60" id="repairs-h" className={s.secTitle}>Repairs</h2>
              <p data-edit="repairs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Our two technicians are certified pool operators and carry the
                common parts on the truck. You get the price in writing before
                anything is opened.
              </p>
            </div>
            <table className={s.repairs}>
              <caption data-edit="repairs.srOnly" className={s.srOnly}>Repair prices</caption>
              <thead>
                <tr>
                  <th data-edit="repairs.heading" scope="col">Job</th>
                  <th data-edit="repairs.heading2" scope="col">Price</th>
                  <th data-edit="repairs.heading3" scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {REPAIRS.map(([job, price, note], i) => (
                  <tr key={job}>
                    <th data-edit={`repairs.heading4.${i}`} scope="row">{job}</th>
                    <td data-edit={`repairs.repairPrice.${i}`} className={s.repairPrice}>{price}</td>
                    <td data-edit={`repairs.cell.${i}`}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contactSec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Start next week</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Get on the route</h2>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>1880 Tidewater Road, Unit 4</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Shop and chemical counter, behind the boatyard. Free water testing, bring a sample in a clean bottle.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550173300">(555) 017-3300</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:route@deependpools.example">route@deependpools.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="de-name">Name</label>
                <input id="de-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="de-phone">Phone</label>
                <input id="de-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="de-address">Street address</label>
                <input id="de-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">What you need</legend>
                <div className={s.picks}>
                  <input id="de-n1" type="radio" name="need" value="weekly" />
                  <label data-edit="contact.label4" htmlFor="de-n1">Weekly service</label>
                  <input id="de-n2" type="radio" name="need" value="season" />
                  <label data-edit="contact.label5" htmlFor="de-n2">Opening or closing</label>
                  <input id="de-n3" type="radio" name="need" value="repair" />
                  <label data-edit="contact.label6" htmlFor="de-n3">A repair</label>
                  <input id="de-n4" type="radio" name="need" value="green" />
                  <label data-edit="contact.label7" htmlFor="de-n4">A green pool</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label8" htmlFor="de-note">About the pool (size, surface, salt or chlorine)</label>
                <textarea id="de-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to the office</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We reply the same working day with your route day and a price.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,0,4,3,2" className={s.footWater} aria-hidden="true">
          <TabbiedPattern
            pattern={maline}
            palette={WATER}
            fit="grid"
            cellSize={72}
            seed="deepend-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Deep End Pool Care</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional pool service. The technicians, route, prices and address are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
