import { TabbiedPattern } from 'tabbied/react';
import { meridianhatch, rafter } from 'tabbied/patterns';
import s from './kessler-auto.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Kessler Auto: Independent repair garage, Harlow',
  description:
    'Kessler Auto services and repairs cars and light trucks on Mill Road in Harlow: a fixed-price service menu, state inspections while you wait, and a 24-month warranty on every repair.',
};

/* Site colors. The disc and the floor tape both draw on the concrete, so
   their background slot is `transparent`. */
const INK = '#16181B';
const RED = '#D7372B';
const STEEL = '#75797F';

const WHEEL = ['transparent', INK, RED];
const TAPE = ['transparent', RED, INK];
const SEAL = ['transparent', RED, STEEL];

const NAV = [
  ['Bay board', '#bays'],
  ['Services', '#services'],
  ['Inspection', '#inspection'],
  ['Waiting', '#wait'],
  ['Mechanics', '#mechanics'],
  ['Book', '#book'],
  ['Directions', '#find'],
];

type Bay = {
  bay: string;
  car: string;
  job: string;
  tech: string;
  status: string;
  cls: string;
  eta: string;
};

const BAYS: Bay[] = [
  {
    bay: 'Bay 1',
    car: '2016 Subaru Outback',
    job: 'Timing belt and water pump',
    tech: 'Luis',
    status: 'On the lift',
    cls: 'stLift',
    eta: 'Ready about 3:30',
  },
  {
    bay: 'Bay 2',
    car: '2019 Ford F-150',
    job: 'Front pads and rotors',
    tech: 'Priya',
    status: 'Road test',
    cls: 'stTest',
    eta: 'Ready about 11:45',
  },
  {
    bay: 'Bay 3',
    car: '2012 Honda Civic',
    job: 'Check engine light, P0420',
    tech: 'Dieter',
    status: 'Waiting on parts',
    cls: 'stParts',
    eta: 'Catalytic converter due 2:00',
  },
  {
    bay: 'Bay 4',
    car: '2021 Toyota RAV4',
    job: 'State inspection, oil change',
    tech: 'Tom',
    status: 'Ready for pickup',
    cls: 'stReady',
    eta: 'Keys at the counter',
  },
];

const QUEUE = [
  ['11:00', '2014 VW Golf', 'Brake fluid flush'],
  ['12:30', '2018 Kia Sorento', 'Battery and alternator test'],
  ['1:30', '2010 Chevy Silverado', 'State inspection'],
  ['2:15', '2020 Mazda CX-5', '30,000-mile service'],
];

type Job = [string, string, string];

const MENU: { group: string; jobs: Job[] }[] = [
  {
    group: 'Maintenance',
    jobs: [
      ['Oil and filter change, conventional', '30 min', '$49'],
      ['Oil and filter change, full synthetic', '30 min', '$79'],
      ['30,000-mile service', '2 hr', '$289'],
      ['Coolant flush', '1 hr', '$129'],
      ['Transmission fluid service', '1.5 hr', '$179'],
      ['Cabin and engine air filters', '20 min', '$59'],
    ],
  },
  {
    group: 'Brakes and suspension',
    jobs: [
      ['Front brake pads', '1.5 hr', '$219'],
      ['Pads and rotors, per axle', '2 hr', '$389'],
      ['Brake fluid flush', '45 min', '$99'],
      ['Struts, a pair', '3 hr', '$649'],
      ['Four-wheel alignment', '1 hr', '$119'],
    ],
  },
  {
    group: 'Engine and electrical',
    jobs: [
      ['Check engine light diagnosis', '1 hr', '$129'],
      ['Battery, tested and replaced', '30 min', '$189'],
      ['Spark plugs, four cylinder', '1 hr', '$169'],
      ['Alternator', '2.5 hr', '$499'],
      ['Timing belt and water pump', '5 hr', '$899'],
    ],
  },
  {
    group: 'Tires',
    jobs: [
      ['Mount and balance, set of four', '1 hr', '$99'],
      ['Rotation', '30 min', '$35'],
      ['Flat repair, plug and patch', '30 min', '$29'],
    ],
  },
];

const INSPECTION_CHECKS = [
  'Brakes and parking brake',
  'Lights, signals and horn',
  'Tires and wheels',
  'Steering and suspension',
  'Wipers and windshield',
  'Exhaust and emissions',
  'Seat belts and mirrors',
  'Fuel system leaks',
];

const WAITING = [
  {
    title: 'The waiting room',
    body: 'Wifi, a desk with outlets, coffee from a real machine, and a window onto the shop floor if you like to watch.',
  },
  {
    title: 'Done while you wait',
    body: 'Oil changes, rotations, batteries, wipers, bulbs and inspections. Book the first slot at 7:30 and be at work by 8:15.',
  },
  {
    title: 'Shuttle and loaners',
    body: 'A ride anywhere within five miles, weekdays 8:00-4:00. Three loaner cars, free on any job over four hours; book one with the appointment.',
  },
  {
    title: 'Early and late drop-off',
    body: 'Keys go through the slot in door 1 with the envelope beside it. We call when we have looked, and before we touch anything.',
  },
];

const WARRANTY = [
  '24 months or 24,000 miles on parts and labor, whichever comes first',
  'Honored at 30,000 shops nationwide if it fails on a road trip',
  'A written quote before any work, and nothing done without your yes',
  'The old parts in a box on the passenger seat, unless you say not to',
];

const MECHANICS = [
  {
    name: 'Dieter Kessler',
    role: 'Owner, master technician',
    certs: 'ASE Master since 1994',
    knows: 'German cars, diesels, the odd noise nobody else can find',
  },
  {
    name: 'Luis Ortega',
    role: 'Lead technician',
    certs: 'ASE Master, L1 advanced engine',
    knows: 'Engine diagnostics, hybrids, timing jobs',
  },
  {
    name: 'Priya Nair',
    role: 'Technician',
    certs: 'ASE A4 and A5',
    knows: 'Brakes, suspension and alignment',
  },
  {
    name: 'Tom Becker',
    role: 'Technician, state inspector',
    certs: 'State inspector license 22-0417',
    knows: 'Inspections, tires, anything with a trailer hitch',
  },
];

const HOURS = [
  ['Monday to Friday', '7:30-6:00'],
  ['Saturday', '8:00-1:00'],
  ['Sunday', 'Closed'],
  ['Inspections', 'Mon-Fri 8:00-3:00'],
];

export default function KesslerAutoPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--concrete': '#edece8',
        '--ink': '#16181b',
        '--red': '#d7372b',
        '--steel': '#75797f',
        '--pale': '#d5d3ce',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="concrete,ink,red,steel,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400..700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Kessler Auto</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barPhone" data-edit-max="28" className={s.barPhone} href="tel:+15550104471">(555) 010-4471</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A sign over a counter: what we do, the disc, then the number to
            call and the hours in type big enough to read from the road. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroTop}>
            <div className={s.heroCopy}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Independent repair shop, Harlow, since 1994</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Service, repairs and inspections, <em>priced before we lift it.</em>
              </h1>
              <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
                Four bays, four mechanics, and a written quote before any
                wrench turns. Cars and light trucks, most makes, gas, diesel
                and hybrid.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book a repair</a>
                <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#services">See the service menu</a>
              </div>
            </div>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2" className={s.wheel} aria-hidden="true">
              <TabbiedPattern
                pattern={meridianhatch}
                palette={WHEEL}
                fit="grid"
                cellSize={60}
                seed="kessler-wheel"
                redrawInterval={8000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <dl className={s.sign}>
            <div className={s.signPhone}>
              <dt data-edit="hero.term" data-edit-max="28">Call the counter</dt>
              <dd>
                <a data-edit="hero.link" data-edit-max="28" href="tel:+15550104471">(555) 010-4471</a>
              </dd>
            </div>
            <div>
              <dt data-edit="hero.term2" data-edit-max="28">Monday to Friday</dt>
              <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>7:30-6:00</dd>
            </div>
            <div>
              <dt data-edit="hero.term3" data-edit-max="28">Saturday</dt>
              <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>8:00-1:00</dd>
            </div>
          </dl>
        </section>

        {/* Floor tape: the rafter design one row high, red and ink. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,1" className={s.tape} aria-hidden="true">
          <TabbiedPattern
            pattern={rafter}
            palette={TAPE}
            fit="grid"
            cellSize={32}
            seed="kessler-tape"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- BAY BOARD
            The shop's whiteboard, made public: what is on each lift today,
            and what comes in next. */}
        <section id="bays" className={s.board} aria-labelledby="bays-h">
          <div className={s.boardInner}>
            <div className={s.boardHead}>
              <h2 data-edit="bays.title" data-edit-max="60" id="bays-h">Bay board</h2>
              <p data-edit="bays.boardStamp" data-edit-max="240" data-edit-multiline className={s.boardStamp}>Thursday, updated 10:40 am</p>
            </div>
            <ol className={s.bays}>
              {BAYS.map((b, i) => (
                <li key={b.bay} className={`${s.bayCard} ${s[b.cls]}`}>
                  <span data-edit={`bays.bayNo.${i}`} data-edit-max="60" className={s.bayNo}>{b.bay}</span>
                  <span data-edit={`bays.bayStatus.${i}`} data-edit-max="60" className={s.bayStatus}>{b.status}</span>
                  <span data-edit={`bays.bayCar.${i}`} data-edit-max="60" className={s.bayCar}>{b.car}</span>
                  <span data-edit={`bays.bayJob.${i}`} data-edit-max="60" className={s.bayJob}>{b.job}</span>
                  <span data-edit={`bays.bayMeta.${i}`} data-edit-max="60" className={s.bayMeta}>{b.tech}</span>
                  <span data-edit={`bays.bayMeta2.${i}`} data-edit-max="60" className={s.bayMeta}>{b.eta}</span>
                </li>
              ))}
            </ol>
            <div className={s.queue}>
              <h3 data-edit="bays.queueHead" data-edit-max="40" className={s.queueHead}>Next in</h3>
              <ul className={s.queueList}>
                {QUEUE.map(([time, car, job], i) => (
                  <li key={time}>
                    <span data-edit={`bays.queueTime.${i}`} data-edit-max="60" className={s.queueTime}>{time}</span>
                    <span data-edit={`bays.queueCar.${i}`} data-edit-max="60" className={s.queueCar}>{car}</span>
                    <span data-edit={`bays.queueJob.${i}`} data-edit-max="60" className={s.queueJob}>{job}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p data-edit="bays.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>Your car on the board? We text you each time its status changes.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={`${s.sec} ${s.services}`} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="services.title" data-edit-max="60" id="services-h">Service menu</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices from, parts and labor, before tax, for most cars. Labor is
              $138 an hour. We call with a firm price before we start, and the
              diagnosis fee comes off the repair if you go ahead.
            </p>
          </div>
          <table className={s.menu}>
            <caption data-edit="services.visuallyHidden" className={s.visuallyHidden}>Service menu with typical time and price from</caption>
            <thead>
              <tr>
                <th data-edit="services.heading" scope="col">Job</th>
                <th data-edit="services.heading2" scope="col">Time</th>
                <th data-edit="services.heading3" scope="col">From</th>
              </tr>
            </thead>
            {MENU.map((g, i) => (
              <tbody key={g.group}>
                <tr className={s.menuGroup}>
                  <th data-edit={`services.heading4.${i}`} scope="colgroup" colSpan={3}>{g.group}</th>
                </tr>
                {g.jobs.map(([job, time, price], i2) => (
                  <tr key={job}>
                    <th data-edit={`services.menuJob.${i}.${i2}`} scope="row" className={s.menuJob}>{job}</th>
                    <td data-edit={`services.menuTime.${i}.${i2}`} className={s.menuTime}>{time}</td>
                    <td data-edit={`services.menuPrice.${i}.${i2}`} className={s.menuPrice}>{price}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </section>

        {/* ------------------------------------------------------ INSPECTION */}
        <section id="inspection" className={s.sec} aria-labelledby="inspection-h">
          <div className={s.inspection}>
            <div className={s.secHead}>
              <p data-edit="inspection.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
              <h2 data-edit="inspection.title" data-edit-max="60" id="inspection-h">State inspection</h2>
              <p data-edit="inspection.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Official inspection station No. 4417. Walk in on a weekday
                between 8:00 and 3:00; it takes about thirty minutes and you
                can wait for it.
              </p>
            </div>
            <dl className={s.inspPrices}>
              <div>
                <dt data-edit="inspection.term" data-edit-max="28">Safety</dt>
                <dd data-edit="inspection.body" data-edit-max="200" data-edit-multiline>$35</dd>
              </div>
              <div>
                <dt data-edit="inspection.term2" data-edit-max="28">Emissions</dt>
                <dd data-edit="inspection.body2" data-edit-max="200" data-edit-multiline>$25</dd>
              </div>
              <div>
                <dt data-edit="inspection.term3" data-edit-max="28">Both together</dt>
                <dd data-edit="inspection.body3" data-edit-max="200" data-edit-multiline>$55</dd>
              </div>
            </dl>
            <div className={s.inspChecks}>
              <h3 data-edit="inspection.smallHead" data-edit-max="40" className={s.smallHead}>What we check</h3>
              <ul>
                {INSPECTION_CHECKS.map((c, i) => (
                  <li data-edit={`inspection.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
              <p data-edit="inspection.inspNote" data-edit-max="240" data-edit-multiline className={s.inspNote}>
                If it fails, you get the list of what failed and a price to fix
                each item. Fix it here or anywhere; the re-test within thirty
                days is free.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ WAIT AND WARRANTY */}
        <section id="wait" className={s.sec} aria-labelledby="wait-h">
          <div className={s.secHead}>
            <p data-edit="wait.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
            <h2 data-edit="wait.title" data-edit-max="60" id="wait-h">While you wait</h2>
          </div>
          <ul className={s.waitGrid}>
            {WAITING.map((w, i) => (
              <li key={w.title}>
                <h3 data-edit={`wait.title2.${i}`} data-edit-max="40">{w.title}</h3>
                <p data-edit={`wait.body.${i}`} data-edit-max="240" data-edit-multiline>{w.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="warranty" className={s.warranty} aria-labelledby="warranty-h">
          <div className={s.warrantyInner}>
            <div data-edit-pattern="warranty.field" data-edit-roles="transparent,2,3" className={s.seal} aria-hidden="true">
              <TabbiedPattern
                pattern={meridianhatch}
                palette={SEAL}
                fit="grid"
                cellSize={60}
                seed="kessler-seal"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.warrantyCopy}>
              <p data-edit="warranty.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
              <h2 data-edit="warranty.title" data-edit-max="60" id="warranty-h">Two years or 24,000 miles on every repair</h2>
              <ul className={s.warrantyList}>
                {WARRANTY.map((w, i) => (
                  <li data-edit={`warranty.item.${i}`} data-edit-max="80" key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- MECHANICS */}
        <section id="mechanics" className={s.sec} aria-labelledby="mechanics-h">
          <div className={s.secHead}>
            <p data-edit="mechanics.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
            <h2 data-edit="mechanics.title" data-edit-max="60" id="mechanics-h">The mechanics</h2>
            <p data-edit="mechanics.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Hanna Kessler runs the counter, answers the phone and writes every
              quote. These four do the work.
            </p>
          </div>
          <ul className={s.crew}>
            {MECHANICS.map((m, i) => (
              <li key={m.name}>
                <h3 data-edit={`mechanics.crewName.${i}`} data-edit-max="40" className={s.crewName}>{m.name}</h3>
                <p data-edit={`mechanics.crewRole.${i}`} data-edit-max="240" data-edit-multiline className={s.crewRole}>{m.role}</p>
                <p data-edit={`mechanics.crewCerts.${i}`} data-edit-max="240" data-edit-multiline className={s.crewCerts}>{m.certs}</p>
                <p data-edit={`mechanics.crewKnows.${i}`} data-edit-max="240" data-edit-multiline className={s.crewKnows}>{m.knows}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInner}>
            <div className={s.bookIntro}>
              <p data-edit="book.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>06</p>
              <h2 data-edit="book.title" data-edit-max="60" id="book-h">Book an appointment</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Send the form and Hanna calls back within the working day with
                a time and, where she can, a price. For a car that will not
                start, call instead.
              </p>
              <dl className={s.bookFacts}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Counter</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>(555) 010-4471</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Towing</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Route 9 Towing, (555) 010-8800</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="mailto:shop@kesslerauto.example">shop@kesslerauto.example</a>
                  </dd>
                </div>
              </dl>
            </div>
            <form className={s.bookForm} action="#">
              <label className={s.field}>
                <span data-edit="book.text" data-edit-max="60">Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span data-edit="book.text2" data-edit-max="60">Phone</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={s.field}>
                <span data-edit="book.text3" data-edit-max="60">Year, make and model</span>
                <input type="text" name="vehicle" placeholder="2016 Subaru Outback" />
              </label>
              <label className={s.field}>
                <span data-edit="book.text4" data-edit-max="60">Mileage</span>
                <input type="text" name="miles" inputMode="numeric" />
              </label>
              <label className={s.field}>
                <span data-edit="book.text5" data-edit-max="60">What it needs</span>
                <select name="job" defaultValue="service">
                  <option value="service">Scheduled service</option>
                  <option value="oil">Oil change</option>
                  <option value="brakes">Brakes</option>
                  <option value="light">Check engine light</option>
                  <option value="inspection">State inspection</option>
                  <option value="tires">Tires</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label className={s.field}>
                <span data-edit="book.text6" data-edit-max="60">Preferred day</span>
                <input type="date" name="day" />
              </label>
              <fieldset className={s.dropOff}>
                <legend data-edit="book.legend">Drop it off or wait?</legend>
                <label>
                  <input type="radio" name="stay" value="drop" defaultChecked />
                  <span data-edit="book.text7" data-edit-max="60">Drop off</span>
                </label>
                <label>
                  <input type="radio" name="stay" value="wait" />
                  <span data-edit="book.text8" data-edit-max="60">Wait for it</span>
                </label>
                <label>
                  <input type="radio" name="stay" value="loaner" />
                  <span data-edit="book.text9" data-edit-max="60">Need a loaner</span>
                </label>
              </fieldset>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span data-edit="book.text10" data-edit-max="60">What is it doing? Noises, lights, when it started</span>
                <textarea name="notes" rows={4} />
              </label>
              <button data-edit="book.btn" data-edit-max="24" className={s.btn} type="submit">Request appointment</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------ DIRECTIONS */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.find}>
            <div>
              <p data-edit="find.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>07</p>
              <h2 data-edit="find.findTitle" data-edit-max="60" id="find-h" className={s.findTitle}>1180 Mill Road, Harlow</h2>
              <p data-edit="find.findText" data-edit-max="240" data-edit-multiline className={s.findText}>
                From Route 9 northbound, turn right at the second light after
                the lumber yard. We are the long block on the left with four
                bay doors and the counter at door 1.
              </p>
              <p data-edit="find.findText2" data-edit-max="240" data-edit-multiline className={s.findText}>
                Six customer spaces out front, more along the fence. After
                hours, keys go through the slot in door 1.
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`find.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`find.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Kessler Auto</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>1180 Mill Road, Harlow</p>
          <p data-edit="footer.footLine2" data-edit-max="240" data-edit-multiline className={s.footLine}>(555) 010-4471</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional repair garage. Prices, people and the bay board are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
