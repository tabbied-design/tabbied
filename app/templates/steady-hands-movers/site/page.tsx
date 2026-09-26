import { TabbiedPattern } from 'tabbied/react';
import { isometry, rafter } from 'tabbied/patterns';
import s from './steady-hands-movers.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Steady Hands Movers: Local moving company, Millbrook',
  description:
    'Steady Hands Movers moves homes within sixty miles of Millbrook, by the hour and quoted in writing. Prices by home size, a moving-day checklist, packing boxes sold by the box, the crew and a quote form.',
};

/* Site colors. The stacks are cartons seen from the corner: board and
   kraft faces with the dark gaps between them; the tape bands are drawn
   on a transparent ground over their own strip. */
const KRAFT = '#d7b98c';
const STENCIL = '#1e1a15';
const RED = '#c3362b';
const BOARD = '#a5794a';
const TRUCK = '#2d5a4c';

const STACK = [STENCIL, BOARD, KRAFT, BOARD, KRAFT, TRUCK];
const LOAD = [TRUCK, KRAFT, BOARD, KRAFT, STENCIL];
const CAUTION = ['transparent', STENCIL, RED, STENCIL];

const NAV = [
  ['Prices', '#prices'],
  ['Checklist', '#checklist'],
  ['Boxes', '#supplies'],
  ['Crew', '#crew'],
  ['Questions', '#questions'],
  ['Get a quote', '#quote'],
];

const LABEL = [
  ['Ship to', 'Your new front door'],
  ['From', 'Your old one'],
  ['Carrier', 'Steady Hands Movers, truck 3 of 4'],
  ['Service', 'Local, within 60 miles, by the hour'],
  ['Quote', 'In writing, within one working day'],
];

type Home = { size: string; crew: string; truck: string; hours: string; rate: string; total: string };

const HOMES: Home[] = [
  { size: 'Studio', crew: '2 movers', truck: '16 ft', hours: '2-3 hrs', rate: '$139', total: '$280-420' },
  { size: 'One bedroom', crew: '2 movers', truck: '16 ft', hours: '3-4 hrs', rate: '$139', total: '$420-560' },
  { size: 'Two bedrooms', crew: '3 movers', truck: '20 ft', hours: '4-6 hrs', rate: '$189', total: '$760-1,130' },
  { size: 'Three bedrooms', crew: '3 movers', truck: '26 ft', hours: '6-8 hrs', rate: '$189', total: '$1,130-1,510' },
  { size: 'Four or more', crew: '4 movers', truck: '26 ft and trailer', hours: '8-10 hrs', rate: '$239', total: '$1,910-2,390' },
];

const FINE = [
  'Two-hour minimum. The clock starts when we pull up and stops when the last box is down.',
  'One flat $60 truck fee. No fuel surcharge, no stairs fee, no long-carry fee.',
  'After the first two hours, billed in fifteen-minute steps.',
  'Card, check or cash on the day. No deposit on moves under $1,000.',
];

type Stage = { when: string; items: string[] };

const CHECKLIST: Stage[] = [
  {
    when: 'Four weeks out',
    items: [
      'Book the date, and the elevator at both buildings',
      'Order boxes. A kit comes with free delivery',
      'Start with the rooms you use least: closets, garage, books',
    ],
  },
  {
    when: 'Two weeks out',
    items: [
      'Change your address at the post office',
      'Eat down the freezer',
      'Take down shelves and rods. Bag the screws, tape the bag to the shelf',
    ],
  },
  {
    when: 'The week of',
    items: [
      'Pack all but a week of clothes and one pan',
      'Label every box on two sides with the room it goes to',
      'Defrost the fridge the night before',
    ],
  },
  {
    when: 'Moving day',
    items: [
      'Keep an open-first box with you: kettle, mugs, chargers, toilet paper',
      'Walk the crew lead through the whole home when we arrive',
      'Check every cupboard before the truck leaves',
    ],
  },
];

type Box = { name: string; size: string; use: string; price: string; shape: string };

const BOXES: Box[] = [
  { name: 'Small', size: '16 x 12 x 12 in', use: 'Books, tins, records: anything heavy', price: '$2.25', shape: 'boxSmall' },
  { name: 'Medium', size: '18 x 18 x 16 in', use: 'Kitchen things, toys, shoes', price: '$3.25', shape: 'boxMedium' },
  { name: 'Large', size: '24 x 18 x 18 in', use: 'Bedding, pillows, lampshades', price: '$4.25', shape: 'boxLarge' },
  { name: 'Wardrobe', size: '24 x 21 x 46 in', use: 'Stands up, with a hanging bar', price: '$16', shape: 'boxWardrobe' },
  { name: 'Dish pack', size: '18 x 18 x 28 in', use: 'Double wall, with cell dividers', price: '$9', shape: 'boxDish' },
  { name: 'Picture box', size: '40 x 4 x 30 in', use: 'Adjusts for frames and mirrors', price: '$12', shape: 'boxPicture' },
];

const LOOSE = [
  ['Packing tape, 60 yd roll', '$4'],
  ['Packing paper, 10 lb', '$18'],
  ['Bubble wrap, 50 ft', '$12'],
  ['Mattress bag, any size', '$8'],
];

const KITS = [
  ['Studio kit', '10 small, 10 medium, 5 large, 2 tapes, paper', '$59'],
  ['Two-bedroom kit', '20 small, 25 medium, 10 large, 2 wardrobes, 2 dish packs, 6 tapes, paper', '$169'],
];

type Mover = { no: string; name: string; job: string; since: string; note: string };

const CREW: Mover[] = [
  { no: '01', name: 'Ray Okafor', job: 'Crew lead', since: 'Since 2011', note: 'Has carried eleven upright pianos up Harbor Hill. Asks where the sofa goes before he lifts it.' },
  { no: '02', name: 'Luz Medina', job: 'Crew lead, packing', since: 'Since 2015', note: 'Runs the full-pack crews. Wraps a table leg like a present and labels every box on two sides.' },
  { no: '03', name: 'Sam Petrakis', job: 'Driver', since: 'Since 2018', note: 'Drives the 26 footer. Has never touched a gatepost with it, and would like that to stay true.' },
  { no: '04', name: 'Jonah Reyes', job: 'Mover', since: 'Since 2022', note: 'Carries two mediums at a time and a conversation. Studying for his commercial license.' },
];

const REFUSED = ['Propane and gasoline', 'Paint, bleach, pool chemicals', 'Ammunition and fireworks', 'Pets, of any size', 'Plants over six feet', 'The fish tank, with the fish'];

const QUESTIONS = [
  ['Do you move pianos?', 'Upright pianos, yes, for $150 on top of the hourly rate. Grand pianos go to a specialist, and we will give you a name we trust.'],
  ['Is our stuff insured?', 'Every move includes basic valuation at 60 cents a pound per item, which is what the law sets. Full value protection costs 1% of what you declare, and covers repair or replacement.'],
  ['How far do you go?', 'Anywhere within sixty miles of Millbrook, same day. Past that we will name a long-distance mover we trust, and can pack for them.'],
  ['Do we need to be there?', 'Someone over eighteen has to be at both ends, to sign the inventory and to say where the sofa goes.'],
  ['Can you move us on the first of the month?', 'Yes, if you book four weeks ahead. The 30th, the 31st and the 1st go first, every month.'],
];

export default function SteadyHandsMoversPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil:opsz,wght@10..72,100..900&family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Steady Hands</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ THE CARTON */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Local moves within 60 miles of Millbrook, since 2009</p>
            <h1 id="hero-h" className={s.name}>Steady Hands <em>Movers</em></h1>
            <p className={s.lede}>
              Four trucks, twelve movers, and a crew lead who walks through
              your home before anything leaves it. Priced by the hour, quoted
              in writing, carried like it is ours.
            </p>
            <ul className={s.marks} aria-label="Handling marks">
              <li className={s.upMark}>This side up</li>
              <li className={s.fragile}>Fragile</li>
              <li className={s.care}>Handle with care</li>
            </ul>
            <p className={s.actions}>
              <a className={s.primary} href="#quote">Get a written quote</a>
              <a className={s.secondary} href="#prices">See prices</a>
            </p>
          </div>

          <div className={s.heroRight}>
          <div className={s.stackWrap}>
            <div className={s.stack} aria-hidden="true">
              <TabbiedPattern
                pattern={isometry}
                palette={STACK}
                fit="grid"
                cellSize={56}
                seed="steady-stack"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.label}>
              <p className={s.labelHead}>Local move</p>
              <dl className={s.labelRows}>
                {LABEL.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.barcode}>SHM 2009 0417 60</p>
            </div>
          </div>
          <Artwork
            slug="steady-hands-movers-truck"
            alt="A box truck in side view with its loading ramp down, a stack of boxes on a hand trolley beside it"
            inks={{ red: 'var(--red-art)', blue: 'var(--truck-art)', black: 'var(--text)' }}
            className={s.truckArt}
          />
          </div>
        </section>

        {/* ------------------------------------------------------ CAUTION */}
        <div className={s.caution} aria-hidden="true">
          <TabbiedPattern
            pattern={rafter}
            palette={CAUTION}
            fit="grid"
            cellSize={36}
            seed="steady-caution"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.lot}>
            <p className={s.lotNo}>
              <span className={s.lotNum}>01</span>
              <span className={s.lotOf}>of 06</span>
            </p>
            <div>
              <p className={s.contents}>Contents</p>
              <h2 id="prices-h">Prices by home size</h2>
            </div>
          </div>
          <p className={s.secNote}>
            Most moves land inside the range on the right. We quote your move
            in writing after a video walk-through or a visit, and the quote is
            what you pay unless you add rooms on the day.
          </p>

          <div className={s.sheet}>
            <table className={s.manifest}>
              <caption className={s.srOnly}>Crew, truck, time and price by size of home</caption>
              <thead>
                <tr>
                  <th scope="col">Home</th>
                  <th scope="col">Crew</th>
                  <th scope="col">Truck</th>
                  <th scope="col">Usual time</th>
                  <th scope="col">Per hour</th>
                  <th scope="col">Usual total</th>
                </tr>
              </thead>
              <tbody>
                {HOMES.map((h) => (
                  <tr key={h.size}>
                    <th scope="row">{h.size}</th>
                    <td>{h.crew}</td>
                    <td>{h.truck}</td>
                    <td>{h.hours}</td>
                    <td className={s.rate}>{h.rate}</td>
                    <td className={s.total}>{h.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className={s.fine}>
              {FINE.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- CHECKLIST */}
        <section id="checklist" className={s.sec} aria-labelledby="checklist-h">
          <div className={s.lot}>
            <p className={s.lotNo}>
              <span className={s.lotNum}>02</span>
              <span className={s.lotOf}>of 06</span>
            </p>
            <div>
              <p className={s.contents}>Contents</p>
              <h2 id="checklist-h">The moving-day checklist</h2>
            </div>
          </div>
          <p className={s.secNote}>
            Twelve things, in the order that saves you the most grief. Tick
            them here if it helps; the page forgets when you close it.
          </p>

          <div className={s.checkGrid}>
            <div className={s.checkField} aria-hidden="true">
              <TabbiedPattern
                pattern={isometry}
                palette={STACK}
                fit="grid"
                cellSize={40}
                seed="steady-checks"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            {CHECKLIST.map((st, i) => (
              <div key={st.when} className={s.stage}>
                <h3 className={s.stageWhen}>{st.when}</h3>
                <ul className={s.ticks}>
                  {st.items.map((it, j) => (
                    <li key={it}>
                      <input id={`shm-${i}-${j}`} type="checkbox" />
                      <label htmlFor={`shm-${i}-${j}`}>{it}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- SUPPLIES */}
        <section id="supplies" className={s.supplies} aria-labelledby="supplies-h">
          <div className={s.load} aria-hidden="true">
            <TabbiedPattern
              pattern={isometry}
              palette={LOAD}
              fit="grid"
              cellSize={48}
              seed="steady-load"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.suppliesInner}>
            <div className={s.lot}>
              <p className={s.lotNo}>
                <span className={s.lotNum}>03</span>
                <span className={s.lotOf}>of 06</span>
              </p>
              <div>
                <p className={s.contents}>Contents</p>
                <h2 id="supplies-h">Packing boxes, sold by the box</h2>
              </div>
            </div>
            <p className={s.secNote}>
              New, double-taped at the bottom, at the yard or delivered with a
              kit. Bring back any box you did not use or write on, and we pay
              you half.
            </p>

            <ul className={s.boxes}>
              {BOXES.map((b) => (
                <li key={b.name} className={s.boxCard}>
                  <div className={s.drawing} aria-hidden="true">
                    <span className={`${s.carton} ${s[b.shape]}`} />
                  </div>
                  <h3>{b.name}</h3>
                  <p className={s.dims}>{b.size}</p>
                  <p className={s.use}>{b.use}</p>
                  <p className={s.each}>{b.price}</p>
                </li>
              ))}
            </ul>

            <div className={s.extras}>
              <div>
                <h3 className={s.extrasTitle}>Loose supplies</h3>
                <dl className={s.priceList}>
                  {LOOSE.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className={s.extrasTitle}>Kits, delivered free</h3>
                <dl className={s.priceList}>
                  {KITS.map(([k, d, v]) => (
                    <div key={k}>
                      <dt>
                        <strong>{k}</strong>
                        <span>{d}</span>
                      </dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ CREW */}
        <section id="crew" className={s.sec} aria-labelledby="crew-h">
          <div className={s.lot}>
            <p className={s.lotNo}>
              <span className={s.lotNum}>04</span>
              <span className={s.lotOf}>of 06</span>
            </p>
            <div>
              <p className={s.contents}>Contents</p>
              <h2 id="crew-h">Crew leads and drivers</h2>
            </div>
          </div>
          <p className={s.secNote}>
            Everyone on the truck is on our payroll, background-checked and
            trained in the yard for two weeks before their first move. No day
            labor, ever.
          </p>
          <ul className={s.crew}>
            {CREW.map((m) => (
              <li key={m.name} className={s.badge}>
                <p className={s.badgeTop}>
                  <span className={s.badgeNo}>{m.no}</span>
                  <span className={s.badgeSince}>{m.since}</span>
                </p>
                <h3>{m.name}</h3>
                <p className={s.job}>{m.job}</p>
                <p className={s.note}>{m.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.lot}>
            <p className={s.lotNo}>
              <span className={s.lotNum}>05</span>
              <span className={s.lotOf}>of 06</span>
            </p>
            <div>
              <p className={s.contents}>Contents</p>
              <h2 id="questions-h">Pianos, insurance and other questions</h2>
            </div>
          </div>
          <div className={s.faqGrid}>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
            <aside className={s.refuse} aria-labelledby="refuse-h">
              <h3 id="refuse-h" className={s.refuseTitle}>Not on our truck</h3>
              <ul className={s.refuseList}>
                {REFUSED.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className={s.refuseNote}>
                The law says so for the first three, and good sense for the
                rest. Pets and plants ride with you.
              </p>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.sec} aria-labelledby="quote-h">
          <div className={s.lot}>
            <p className={s.lotNo}>
              <span className={s.lotNum}>06</span>
              <span className={s.lotOf}>of 06</span>
            </p>
            <div>
              <p className={s.contents}>Contents</p>
              <h2 id="quote-h">A written quote, within a day</h2>
            </div>
          </div>

          <div className={s.quoteGrid}>
            <form className={s.form} action="#">
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="shm-from">Moving from (zip)</label>
                  <input id="shm-from" name="from" type="text" inputMode="numeric" />
                </div>
                <div className={s.field}>
                  <label htmlFor="shm-to">Moving to (zip)</label>
                  <input id="shm-to" name="to" type="text" inputMode="numeric" />
                </div>
                <div className={s.field}>
                  <label htmlFor="shm-size">Home size</label>
                  <select id="shm-size" name="size" defaultValue="1">
                    <option value="0">Studio</option>
                    <option value="1">One bedroom</option>
                    <option value="2">Two bedrooms</option>
                    <option value="3">Three bedrooms</option>
                    <option value="4">Four or more</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="shm-date">Moving date</label>
                  <input id="shm-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="shm-stairs">Stairs or elevator</label>
                  <select id="shm-stairs" name="stairs" defaultValue="ground">
                    <option value="ground">Ground floor at both ends</option>
                    <option value="elevator">Elevator</option>
                    <option value="stairs">Stairs, one or more flights</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="shm-pack">Packing</label>
                  <select id="shm-pack" name="pack" defaultValue="self">
                    <option value="self">We pack ourselves</option>
                    <option value="fragile">Pack the fragile things</option>
                    <option value="full">Pack everything</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="shm-name">Name</label>
                  <input id="shm-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="shm-phone">Phone</label>
                  <input id="shm-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="shm-big">Anything big, heavy or fragile?</label>
                  <textarea id="shm-big" name="big" rows={3} />
                </div>
              </div>
              <button className={s.submit} type="submit">Send for a quote</button>
            </form>

            <div className={s.yard}>
              <h3 className={s.yardTitle}>The yard</h3>
              <p className={s.address}>
                1400 Tannery Road, Unit 6
                <br />
                Millbrook
              </p>
              <p className={s.address}>
                <a href="tel:+15550126680">(555) 012-6680</a>
                <br />
                <a href="mailto:moves@steadyhands.example">moves@steadyhands.example</a>
              </p>
              <dl className={s.priceList}>
                <div>
                  <dt>Office</dt>
                  <dd>Mon to Sat, 7 am to 7 pm</dd>
                </div>
                <div>
                  <dt>Moves start</dt>
                  <dd>8 am or 1 pm</dd>
                </div>
                <div>
                  <dt>Box pickup</dt>
                  <dd>Mon to Sat, 8 am to 5 pm</dd>
                </div>
              </dl>
              <p className={s.small}>
                State mover license M-20417. Fully insured for general liability
                and cargo; certificates for your building on request.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={rafter}
            palette={CAUTION}
            fit="grid"
            cellSize={36}
            seed="steady-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p className={s.footName}>Steady Hands Movers</p>
        <p>A fictional moving company. The crew, trucks, prices and license number are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
        <p>The truck is a generated picture, drawn in the page's own colors.</p>
      </footer>
    </div>
  );
}
