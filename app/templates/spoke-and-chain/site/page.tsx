import { TabbiedPattern } from 'tabbied/react';
import { confettitriangles, ring } from 'tabbied/patterns';
import s from './spoke-and-chain.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Spoke & Chain: Bike shop and workshop, Harrow Street',
  description:
    'Spoke & Chain sells city, road, gravel, mountain and electric bikes, services them in four fixed-price levels and rents them by the hour or the day. Fit sessions by appointment.',
};

/* Site colors, the same six as the stylesheet's root rule. Both fields take
   `transparent` first. The triangles are laid on a tile of their own (the
   second color), which is the pale plate behind the hero bicycle. */
const TEAL = '#0FA3A3';
const CORAL = '#F25C54';
const GRAY = '#8C959A';
const PALE = '#DCE3E2';

const CONFETTI = ['transparent', PALE, TEAL, CORAL, GRAY, TEAL];
const WHEELS = ['transparent', TEAL, PALE, CORAL];

const NAV = [
  ['Bikes', '#bikes'],
  ['Service', '#service'],
  ['Rentals', '#rentals'],
  ['Fit', '#fit'],
  ['Visit', '#visit'],
];

/* The same bicycle in six paint jobs: the frame layer takes one ink, the
   wheels and saddle another. */
type Bike = {
  name: string;
  use: string;
  price: string;
  sizes: string;
  stock: string;
  frame: string;
  tires: string;
  kid?: boolean;
};

const BIKES: Bike[] = [
  {
    name: 'City',
    use: 'Upright, mudguards, a rack and a bell. For commuting in work clothes.',
    price: '$520 - $1,150',
    sizes: 'S to XL, step-through or diamond',
    stock: '18 in stock',
    frame: 'var(--teal)',
    tires: 'var(--ink)',
  },
  {
    name: 'Road',
    use: 'Light, fast and drop-barred, for club rides and long Sunday loops.',
    price: '$1,100 - $3,800',
    sizes: '49 to 61 cm',
    stock: '11 in stock',
    frame: 'var(--coral)',
    tires: 'var(--ink)',
  },
  {
    name: 'Gravel',
    use: 'Road geometry with wide tires, for towpaths, fire roads and bad weather.',
    price: '$1,250 - $3,200',
    sizes: 'XS to XL',
    stock: '9 in stock',
    frame: 'var(--ink)',
    tires: 'var(--teal)',
  },
  {
    name: 'Mountain',
    use: 'Front or full suspension, for the trails at Ridgeback Park and beyond.',
    price: '$890 - $4,400',
    sizes: 'S to XL, 29 inch wheels',
    stock: '7 in stock',
    frame: 'var(--gray)',
    tires: 'var(--ink)',
  },
  {
    name: 'Electric',
    use: 'Pedal assist to 20 mph, with a range of 40 to 70 miles on one charge.',
    price: '$1,900 - $5,600',
    sizes: 'M to XL',
    stock: '12 in stock',
    frame: 'var(--teal)',
    tires: 'var(--coral)',
  },
  {
    name: 'Kids',
    use: 'Balance bikes to 24 inch wheels. Trade one in when they outgrow it.',
    price: '$180 - $620',
    sizes: '12 to 24 inch wheels',
    stock: '21 in stock',
    frame: 'var(--coral)',
    tires: 'var(--teal)',
    kid: true,
  },
];

const LEVELS = [
  { name: 'Safety check', price: '$35', when: 'Same day' },
  { name: 'Tune-up', price: '$95', when: '48 hours', tag: 'Most booked' },
  { name: 'Full service', price: '$175', when: '3 days' },
  { name: 'Overhaul', price: '$295', when: '5 days' },
];

const INCLUDED: [string, boolean[]][] = [
  ['Tire pressure set, bolts checked to torque', [true, true, true, true]],
  ['A written report of what needs doing', [true, true, true, true]],
  ['Brakes and gears adjusted', [false, true, true, true]],
  ['Chain and cables cleaned and lubed', [false, true, true, true]],
  ['Wheels trued on the bike', [false, true, true, true]],
  ['Drivetrain off and through the parts washer', [false, false, true, true]],
  ['New gear and brake cables fitted', [false, false, true, true]],
  ['Hubs, headset and bottom bracket serviced', [false, false, false, true]],
  ['Stripped to the frame, cleaned and rebuilt', [false, false, false, true]],
];

const REPAIRS = [
  ['Flat repair, tube included', '$18'],
  ['Tubeless setup, per wheel', '$35'],
  ['Hydraulic brake bleed, per brake', '$40'],
  ['Chain fitted', '$15 + chain'],
  ['Wheel true, off the bike', '$25'],
  ['Derailleur hanger aligned', '$20'],
  ['Bar tape or grips fitted', '$20 + parts'],
  ['E-bike diagnostic and update', '$45'],
];

const RENTALS = [
  { bike: 'City bike', hours: '$16', half: '$28', day: '$40', week: '$140' },
  { bike: 'Road or gravel', hours: '$24', half: '$42', day: '$60', week: '$210' },
  { bike: 'Electric', hours: '$30', half: '$52', day: '$75', week: '$260' },
  { bike: 'Kids bike', hours: '$10', half: '$16', day: '$22', week: '$80' },
  { bike: 'Child seat or trailer', hours: '$6', half: '$10', day: '$14', week: '$45' },
];

const RENTAL_RULES = [
  'A helmet and a lock come with every rental, in your size.',
  'Bring a photo ID and a card for the deposit; nothing is charged unless something breaks.',
  'Bikes go out from 9 am and come back by 7 pm, or the next morning on a day rate.',
  'Rent for a week and the rental comes off the price if you buy that model.',
];

const FIT_STEPS = [
  {
    no: '01',
    title: 'Talk',
    body: 'How you ride, how far, and what hurts. Old injuries matter more than new shoes.',
  },
  {
    no: '02',
    title: 'Measure',
    body: 'Flexibility, sit-bone width, foot shape and the bike you ride now, taken as it is.',
  },
  {
    no: '03',
    title: 'Adjust',
    body: 'On the trainer: saddle height and setback, reach, bar height and cleats, one change at a time.',
  },
  {
    no: '04',
    title: 'Write it down',
    body: 'Every number on one sheet, so the next bike can be set up the same way in ten minutes.',
  },
];

const HOURS = [
  ['Monday', 'Workshop only, 8 am - 4 pm'],
  ['Tuesday - Friday', '8 am - 7 pm'],
  ['Saturday', '9 am - 6 pm'],
  ['Sunday', '10 am - 4 pm'],
];

export default function SpokeAndChainPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--chrome': '#f2f4f3',
        '--ink': '#111820',
        '--teal': '#0fa3a3',
        '--coral': '#f25c54',
        '--gray': '#8c959a',
        '--pale': '#dce3e2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="chrome,ink,teal,coral,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed:ital,wght@0,600;0,800;1,800&family=Sofia+Sans:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Spoke & Chain</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#visit">Book a service</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The bicycle stands on the floor line in front of a panel of
            confetti triangles. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Bike shop and workshop, 48 Harrow Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Sold, fixed and fitted <em>on Harrow Street.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Six kinds of bike on the floor, a four-stand workshop behind it and
              mechanics who ride to work. Service at a fixed price, written down
              before we start.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#visit">Book a service</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#service">See the service menu</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,2,3,4,2" className={s.confetti} aria-hidden="true">
              <TabbiedPattern
                pattern={confettitriangles}
                palette={CONFETTI}
                fit="grid"
                cellSize={64}
                seed="spoke-hero"
                redrawInterval={8000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="spoke-and-chain-bicycle"
              alt="A city bicycle seen from the side"
              inks={{ red: 'var(--coral)', black: 'var(--ink)' }}
              className={s.heroBike}
            />
          </div>
          <ul className={s.heroFacts}>
            <li>
              <strong data-edit="hero.emphasis">48 h</strong>
              <span data-edit="hero.text" data-edit-max="60">Most tune-ups, start to finish</span>
            </li>
            <li>
              <strong data-edit="hero.emphasis2">Free</strong>
              <span data-edit="hero.text2" data-edit-max="60">Loaner bike while yours is in</span>
            </li>
            <li>
              <strong data-edit="hero.emphasis3">30 days</strong>
              <span data-edit="hero.text3" data-edit-max="60">Free adjustments after any service</span>
            </li>
            <li>
              <strong data-edit="hero.emphasis4">7 days</strong>
              <span data-edit="hero.text4" data-edit-max="60">Open every day of the week</span>
            </li>
          </ul>
        </section>

        {/* ------------------------------------------------------------ BIKES
            Six cards, one bicycle in six paint jobs. */}
        <section id="bikes" className={s.bikes} aria-labelledby="bikes-h">
          <div className={s.secHead}>
            <p data-edit="bikes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01 / Bikes</p>
            <h2 data-edit="bikes.secTitle" data-edit-max="60" id="bikes-h" className={s.secTitle}>Six kinds of bike, all ridden before they are sold</h2>
            <p data-edit="bikes.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Every bike on the floor can go round the block with you. Buy one
              and the first tune-up, a fit to your height and a year of flat
              repairs come with it.
            </p>
          </div>
          <ul className={s.bikeGrid}>
            {BIKES.map((b, i) => (
              <li key={b.name} className={s.bikeCard}>
                <div className={s.bikeStage}>
                  <Artwork
                    slug="spoke-and-chain-bicycle"
                    alt={`A ${b.name.toLowerCase()} bicycle`}
                    inks={{ red: b.frame, black: b.tires }}
                    className={b.kid ? s.bikeArtKid : s.bikeArt}
                  />
                  <span data-edit={`bikes.bikeStock.${i}`} data-edit-max="60" className={s.bikeStock}>{b.stock}</span>
                </div>
                <div className={s.bikeBody}>
                  <h3 data-edit={`bikes.bikeName.${i}`} data-edit-max="40" className={s.bikeName}>{b.name}</h3>
                  <p data-edit={`bikes.bikeUse.${i}`} data-edit-max="240" data-edit-multiline className={s.bikeUse}>{b.use}</p>
                  <dl className={s.bikeFacts}>
                    <div>
                      <dt data-edit={`bikes.term.${i}`} data-edit-max="28">Price</dt>
                      <dd data-edit={`bikes.body.${i}`} data-edit-max="200" data-edit-multiline>{b.price}</dd>
                    </div>
                    <div>
                      <dt data-edit={`bikes.term2.${i}`} data-edit-max="28">Sizes</dt>
                      <dd data-edit={`bikes.body2.${i}`} data-edit-max="200" data-edit-multiline>{b.sizes}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- SERVICE
            The service menu as a comparison table, then the a la carte list
            with the pump beside it. */}
        <section id="service" className={s.service} aria-labelledby="service-h">
          <div className={s.serviceInner}>
            <div className={s.secHead}>
              <p data-edit="service.secNoLight" data-edit-max="240" data-edit-multiline className={s.secNoLight}>02 / Service menu</p>
              <h2 data-edit="service.secTitle" data-edit-max="60" id="service-h" className={s.secTitle}>Four levels, one fixed price each</h2>
              <p data-edit="service.secLedeLight" data-edit-max="240" data-edit-multiline className={s.secLedeLight}>
                Parts are extra and quoted before we fit them. If the bike needs
                less than the level you booked, you pay for the lower one.
              </p>
            </div>

            <p data-edit="service.swipe" data-edit-max="240" data-edit-multiline className={s.swipe}>Swipe the table to compare</p>
            <div className={s.tableWrap}>
              <table className={s.menu}>
                <caption data-edit="service.srOnly" className={s.srOnly}>What each service level includes</caption>
                <thead>
                  <tr>
                    <th data-edit="service.menuCorner" scope="col" className={s.menuCorner}>What we do</th>
                    {LEVELS.map((l, i) => (
                      <th key={l.name} scope="col" className={l.tag ? s.levelHot : s.level}>
                        <span data-edit={`service.levelName.${i}`} data-edit-max="60" className={s.levelName}>{l.name}</span>
                        <span data-edit={`service.levelPrice.${i}`} data-edit-max="60" className={s.levelPrice}>{l.price}</span>
                        {l.tag ? <span data-edit={`service.levelTag.${i}`} data-edit-max="60" className={s.levelTag}>{l.tag}</span> : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INCLUDED.map(([task, marks], i) => (
                    <tr key={task}>
                      <th data-edit={`service.heading.${i}`} scope="row">{task}</th>
                      {marks.map((m, i) => (
                        <td key={LEVELS[i].name} className={LEVELS[i].tag ? s.cellHot : undefined}>
                          <span className={m ? s.yes : s.no}>{m ? 'Included' : 'Not included'}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className={s.menuFoot}>
                    <th data-edit="service.heading2" scope="row">Usual turnaround</th>
                    {LEVELS.map((l, i) => (
                      <td data-edit={`service.cellHot.${i}`} key={l.name} className={l.tag ? s.cellHot : undefined}>{l.when}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={s.repairs}>
              <div className={s.repairsText}>
                <h3 data-edit="service.subTitle" data-edit-max="40" className={s.subTitle}>A la carte</h3>
                <p data-edit="service.repairsNote" data-edit-max="240" data-edit-multiline className={s.repairsNote}>
                  Small jobs while you wait, most in under twenty minutes. Walk
                  in; no booking needed.
                </p>
                <dl className={s.repairList}>
                  {REPAIRS.map(([k, v], i) => (
                    <div key={k}>
                      <dt data-edit={`service.term.${i}`} data-edit-max="28">{k}</dt>
                      <dd data-edit={`service.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={s.pumpBox}>
                <Artwork
                  slug="spoke-and-chain-pump"
                  alt="A floor bike pump"
                  inks={{ red: 'var(--teal)', black: 'var(--chrome)' }}
                  className={s.pump}
                />
                <p className={s.pumpNote}>
                  <strong data-edit="service.emphasis">Free air, day and night.</strong>
                  <span data-edit="service.text" data-edit-max="60">The pump by our door is chained to the wall and fits every valve.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- RENTALS */}
        <section id="rentals" className={s.rentals} aria-labelledby="rentals-h">
          <div className={s.rentalsHead}>
            <div className={s.secHead}>
              <p data-edit="rentals.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03 / Rentals</p>
              <h2 data-edit="rentals.secTitle" data-edit-max="60" id="rentals-h" className={s.secTitle}>By the hour, the day or the week</h2>
            </div>
            <Artwork
              slug="spoke-and-chain-helmet"
              alt="A cycling helmet"
              inks={{ red: 'var(--coral)', blue: 'var(--teal)', black: 'var(--ink)' }}
              className={s.helmet}
            />
          </div>
          <div className={s.rentalsGrid}>
            <div className={s.tableWrap}>
              <table className={s.rates}>
                <caption data-edit="rentals.srOnly" className={s.srOnly}>Rental prices by bike and length of hire</caption>
                <thead>
                  <tr>
                    <th data-edit="rentals.heading" scope="col">Bike</th>
                    <th data-edit="rentals.heading2" scope="col">2 hours</th>
                    <th data-edit="rentals.heading3" scope="col">Half day</th>
                    <th data-edit="rentals.heading4" scope="col">Day</th>
                    <th data-edit="rentals.heading5" scope="col">Week</th>
                  </tr>
                </thead>
                <tbody>
                  {RENTALS.map((r, i) => (
                    <tr key={r.bike}>
                      <th data-edit={`rentals.heading6.${i}`} scope="row">{r.bike}</th>
                      <td data-edit={`rentals.cell.${i}`}>{r.hours}</td>
                      <td data-edit={`rentals.cell2.${i}`}>{r.half}</td>
                      <td data-edit={`rentals.cell3.${i}`}>{r.day}</td>
                      <td data-edit={`rentals.cell4.${i}`}>{r.week}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={s.rules}>
              {RENTAL_RULES.map((r, i) => (
                <li data-edit={`rentals.item.${i}`} data-edit-max="80" key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- FIT
            The fit session on a dark panel, with a field of rings like a
            stack of wheels at one edge. */}
        <section id="fit" className={s.fit} aria-labelledby="fit-h">
          <div className={s.fitPanel}>
            <div data-edit-pattern="fit.field" data-edit-roles="transparent,2,5,3" className={s.wheels} aria-hidden="true">
              <TabbiedPattern
                pattern={ring}
                palette={WHEELS}
                options={{ frequency: 0.85 }}
                fit="grid"
                cellSize={56}
                seed="spoke-wheels"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.fitText}>
              <p data-edit="fit.secNoLight" data-edit-max="240" data-edit-multiline className={s.secNoLight}>04 / Fit session</p>
              <h2 data-edit="fit.fitTitle" data-edit-max="60" id="fit-h" className={s.fitTitle}>Ninety minutes that fix the ache in your knee.</h2>
              <p data-edit="fit.fitLede" data-edit-max="240" data-edit-multiline className={s.fitLede}>
                A fit on your own bike, on the trainer, with a fitter who has
                done more than two thousand of them. Worth it before a long ride
                and after any pain that comes back.
              </p>
              <dl className={s.fitPrice}>
                <div>
                  <dt data-edit="fit.term" data-edit-max="28">Session</dt>
                  <dd data-edit="fit.body" data-edit-max="200" data-edit-multiline>$180</dd>
                </div>
                <div>
                  <dt data-edit="fit.term2" data-edit-max="28">Length</dt>
                  <dd data-edit="fit.body2" data-edit-max="200" data-edit-multiline>90 min</dd>
                </div>
                <div>
                  <dt data-edit="fit.term3" data-edit-max="28">Back if you buy a bike in 30 days</dt>
                  <dd data-edit="fit.body3" data-edit-max="200" data-edit-multiline>$60</dd>
                </div>
              </dl>
            </div>
            <ol className={s.fitSteps}>
              {FIT_STEPS.map((f, i) => (
                <li key={f.no}>
                  <span data-edit={`fit.fitNo.${i}`} data-edit-max="60" className={s.fitNo}>{f.no}</span>
                  <h3 data-edit={`fit.fitStepTitle.${i}`} data-edit-max="40" className={s.fitStepTitle}>{f.title}</h3>
                  <p data-edit={`fit.fitStepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.fitStepBody}>{f.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ VISIT
            Book a service, and where and when to bring the bike. */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInfo}>
            <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05 / Visit</p>
            <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>Book a service, or just come by</h2>
            <p data-edit="visit.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Book online and drop the bike off any time that day. We text
              you the quote before we touch anything, and again when it is
              ready.
            </p>
            <div className={s.visitCols}>
              <div>
                <h3 data-edit="visit.visitHead" data-edit-max="40" className={s.visitHead}>The shop</h3>
                <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.visitText}>
                  48 Harrow Street
                  <br />
                  Between the bakery and the laundromat
                </p>
                <p className={s.visitText}>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550148811">(555) 014-8811</a>
                </p>
                <p className={s.visitText}>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:workshop@spokeandchain.example">workshop@spokeandchain.example</a>
                </p>
              </div>
              <div>
                <h3 data-edit="visit.visitHead2" data-edit-max="40" className={s.visitHead}>Hours</h3>
                <dl className={s.hours}>
                  {HOURS.map(([d, h], i) => (
                    <div key={d}>
                      <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                      <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <form className={s.form} action="#">
            <h3 data-edit="visit.formTitle" data-edit-max="40" className={s.formTitle}>Book a service</h3>
            <label className={s.field}>
              <span data-edit="visit.text" data-edit-max="60">Name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className={s.field}>
              <span data-edit="visit.text2" data-edit-max="60">Mobile, for the quote</span>
              <input type="tel" name="phone" autoComplete="tel" required />
            </label>
            <label className={s.field}>
              <span data-edit="visit.text3" data-edit-max="60">Service</span>
              <select name="level" defaultValue="Tune-up">
                {LEVELS.map((l) => (
                  <option key={l.name}>{l.name}</option>
                ))}
              </select>
            </label>
            <label className={s.field}>
              <span data-edit="visit.text4" data-edit-max="60">Drop-off day</span>
              <input type="date" name="day" />
            </label>
            <label className={s.fieldWide}>
              <span data-edit="visit.text5" data-edit-max="60">The bike, and what it is doing</span>
              <textarea name="notes" rows={3} placeholder="Gravel bike, gears skip in the two smallest cogs" />
            </label>
            <button data-edit="visit.submit" data-edit-max="24" className={s.submit} type="submit">Book my drop-off</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Spoke & Chain</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional bike shop. Prices, hours and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the shop's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
