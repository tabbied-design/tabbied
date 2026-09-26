import { TabbiedPattern } from 'tabbied/react';
import { mullion, rafter, streaking } from 'tabbied/patterns';
import s from './bright-pane-windows.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Bright Pane: Window and gutter cleaning, Eastgate',
  description:
    'Bright Pane cleans windows for $6 each, inside and out, and clears gutters by the height of the house. Prices, the round by street, service areas and a quick quote.',
};

/* Site colors, the same values as the roles on .page. The panes, the shine
   and the roof rake all draw on a transparent ground, so the frame or band
   they sit in is the glass behind them. */
const PAPER = '#fbfcfd';
const INK = '#0c0e11';
const SKY = '#9cd3f4';
const BLUE = '#1d5fd1';
const HIVIS = '#ffd43b';

const PANES = ['transparent', PAPER, BLUE, INK, PAPER];
const SHINE = ['transparent', BLUE, SKY, INK];
const RAKE = ['transparent', INK, HIVIS];
const SILL = ['transparent', SKY, BLUE, PAPER];

const NAV = [
  ['Prices', '#prices'],
  ['The round', '#round'],
  ['Gutters', '#gutters'],
  ['How it goes', '#visit'],
  ['Where we work', '#area'],
  ['Get a price', '#quote'],
];

const TABS = ['tab-1', 'tab-2', 'tab-3', 'tab-4', 'tab-5', 'tab-6', 'tab-7', 'tab-8', 'tab-9', 'tab-10', 'tab-11', 'tab-12'];

const PRICES = [
  ['$6', 'Standard window, both sides', 'Up to 4 by 5 feet, sash or casement. Screens off, and back on.'],
  ['$4', 'Outside only', 'For the round, or when you would rather do the inside yourself.'],
  ['$9', 'Patio or French door', 'Both sides, the frame wiped, the track vacuumed.'],
  ['$10', 'Picture window', 'Anything bigger than 4 by 5 feet.'],
  ['$12', 'Skylight', 'From the roof outside, from a step ladder inside.'],
  ['$3', 'Storm window', 'The extra pane, both faces.'],
];

const EXTRAS = [
  ['Screens washed', '$2 each'],
  ['Tracks and sills, vacuumed and wiped', '$2 each'],
  ['Second story, outside', '+$2 a window'],
  ['Hard water spots taken off', '$15 a window'],
  ['Paint and stickers scraped', '$5 a window'],
  ['Smallest visit', '$90'],
];

const SUM = [
  ['24 windows, both sides', '$144'],
  ['24 screens washed', '$48'],
  ['Total, a three-bed house', '$192'],
];

type Round = {
  letter: string;
  day: string;
  area: string;
  streets: string[];
  next: string;
};

const ROUNDS: Round[] = [
  { letter: 'A', day: 'Monday and Tuesday', area: 'Eastgate North', streets: ['Alder Avenue', 'Birch Court', 'Cedar Row', 'Dunmore Street', 'Elm Terrace'], next: 'Oct 5 and 6, then Nov 30 and Dec 1' },
  { letter: 'B', day: 'Wednesday', area: 'Millbrook', streets: ['Fenwick Road', 'Garnet Way', 'Holloway Street', 'Iris Lane', 'Juniper Close'], next: 'Oct 7, then Dec 2' },
  { letter: 'C', day: 'Thursday', area: 'Harbor Heights', streets: ['Keel Road', 'Lantern Hill', 'Marina Walk', "Netmaker's Row"], next: 'Oct 8, then Dec 3' },
  { letter: 'D', day: 'Friday', area: 'Old Town', streets: ['North Street', 'Orchard Row', 'Pike Street', "Queen's Walk", 'River Road'], next: 'Oct 9, then Dec 4' },
];

const GUTTERS = [
  { name: 'Clear out', note: 'Scooped by hand, bagged, taken away.', one: '$120', two: '$160', three: '$220' },
  { name: 'Clear and flush', note: 'The same, then every downspout flushed and tested.', one: '$150', two: '$195', three: '$260' },
  { name: 'Guards fitted', note: 'Steel mesh, per foot of gutter, cleared first.', one: '$9/ft', two: '$10/ft', three: '$12/ft' },
];

const STEPS = [
  ['The day before', 'We text you a two-hour window, and a photo of whoever is coming.'],
  ['Outside first', 'A water-fed pole and pure water: no soap, so nothing is left on the glass to catch the dust.'],
  ['Then inside', 'Shoe covers on, cloths on the sills, every pane by hand with a squeegee and a scrim.'],
  ['The walk-round', 'You look, we look. Anything we missed gets done while the ladders are still out.'],
  ['Pay how you like', 'Card on the day, cash, or an invoice by email with a week to pay.'],
];

const AREAS = [
  { name: 'Eastgate North', round: true },
  { name: 'Millbrook', round: true },
  { name: 'Harbor Heights', round: true },
  { name: 'Old Town', round: true },
  { name: 'Westfield', round: false },
  { name: 'Pine Hollow', round: false },
  { name: 'Crane Park', round: false },
  { name: 'Southbank', round: false },
  { name: 'Lakeside', round: false },
];

const CREW = [
  ['Dale Okonkwo', 'Owner. On the ladder since 2014, and still on it most days.'],
  ['Rosa Brandt', 'Gutters and skylights. The one you will see on the roof.'],
  ['Theo Marsh', 'Inside windows. Slow, careful, has never broken an ornament.'],
];

export default function BrightPanePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&family=Chivo:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Bright Pane</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550127788">(555) 012-7788</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ THE POSTER */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroInner}>
            <div>
              <p className={s.kicker}>Window and gutter cleaning, Eastgate and around, since 2014</p>
              <h1 id="hero-h" className={s.title}>Clean windows <em>by Friday.</em></h1>
              <div className={s.priceLine}>
                <p className={s.bigPrice}>$6</p>
                <p className={s.per}>a window, inside and out</p>
              </div>
              <p className={s.lede}>
                Two of us, a van of ladders and a water-fed pole. Pure water,
                no soap, no streaks, and we wipe the sills on the way out. Most
                houses take under two hours.
              </p>
              <div className={s.actions}>
                <a className={s.button} href="#quote">Get a price</a>
                <a className={s.buttonLine} href="#round">Join the round</a>
              </div>
            </div>

            <div className={s.window}>
              <div className={s.glass} aria-hidden="true">
                <TabbiedPattern
                  pattern={mullion}
                  palette={PANES}
                  fit="grid"
                  cellSize={52}
                  seed="bright-pane-window"
                  options={{ frequency: 0.75 }}
                  redrawInterval={6000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.sticker}>Insured to $2 million</p>
            </div>
          </div>

          {/* The bottom of the flyer: tear off a number. */}
          <ul className={s.tabs} aria-label="Our number, to tear off">
            {TABS.map((t) => (
              <li key={t}>Bright Pane (555) 012-7788</li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.head}>
            <h2 id="prices-h">Price per window</h2>
            <p className={s.headNote}>
              Counted, not guessed. Tell us how many windows and doors you
              have and the price is the sum. No call-out fee, no surprise at
              the door.
            </p>
          </div>

          <div className={s.prices}>
            <ul className={s.priceList}>
              {PRICES.map(([price, name, note]) => (
                <li key={name}>
                  <span className={s.price}>{price}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{note}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <h3 className={s.sideTitle}>On top</h3>
              <dl className={s.extras}>
                {EXTRAS.map(([what, cost]) => (
                  <div key={what}>
                    <dt>{what}</dt>
                    <dd>{cost}</dd>
                  </div>
                ))}
              </dl>

              <div className={s.sum}>
                <p className={s.sumTitle}>A worked example</p>
                <dl>
                  {SUM.map(([what, cost]) => (
                    <div key={what}>
                      <dt>{what}</dt>
                      <dd>{cost}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* The shine: light across a clean pane. */}
        <div className={s.shine} aria-hidden="true">
          <TabbiedPattern
            pattern={streaking}
            palette={SHINE}
            fit="grid"
            cellSize={60}
            seed="bright-pane-shine"
            options={{ frequency: 0.7 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- THE ROUND */}
        <section id="round" className={s.round} aria-labelledby="round-h">
          <div className={s.roundInner}>
            <div className={s.head}>
              <h2 id="round-h">The round</h2>
              <p className={s.headNote}>
                Every eight weeks we are back on the same streets on the same
                day. On the round a window is $5, not $6, you do not need to be
                home for the outside, and you never have to call us. Leave
                whenever you like.
              </p>
            </div>

            <ol className={s.rounds}>
              {ROUNDS.map((r) => (
                <li key={r.letter}>
                  <p className={s.letter}>{r.letter}</p>
                  <h3>{r.day}</h3>
                  <p className={s.area}>{r.area}</p>
                  <ul className={s.streets}>
                    {r.streets.map((st) => (
                      <li key={st}>{st}</li>
                    ))}
                  </ul>
                  <p className={s.next}>Next</p>
                  <p className={s.nextDates}>{r.next}</p>
                </li>
              ))}
            </ol>
            <p className={s.roundNote}>
              Your street is not here? If five houses on it sign up, it goes on
              the round that passes nearest.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- GUTTERS */}
        <section id="gutters" className={s.sec} aria-labelledby="gutters-h">
          <div className={s.head}>
            <h2 id="gutters-h">Gutters, by the story</h2>
            <p className={s.headNote}>
              Best done in late November, after the leaves are down, and again
              in spring. Every clear-out comes with a before and after photo of
              every run, sent to your phone before we leave.
            </p>
          </div>

          <div className={s.roof} aria-hidden="true">
            <TabbiedPattern
              pattern={rafter}
              palette={RAKE}
              fit="grid"
              cellSize={32}
              seed="bright-pane-rake"
              options={{ frequency: 1 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <table className={s.gutters}>
            <caption className={s.srOnly}>Gutter prices by number of stories</caption>
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">One story</th>
                <th scope="col">Two stories</th>
                <th scope="col">Three stories</th>
              </tr>
            </thead>
            <tbody>
              {GUTTERS.map((g) => (
                <tr key={g.name}>
                  <th scope="row">
                    <span className={s.gName}>{g.name}</span>
                    <span className={s.gNote}>{g.note}</span>
                  </th>
                  <td>{g.one}</td>
                  <td>{g.two}</td>
                  <td>{g.three}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ------------------------------------------------------- THE VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div className={s.visitHead}>
              <div>
                <h2 id="visit-h" className={s.visitTitle}>How a visit goes</h2>
                <p className={s.visitLede}>
                  Most houses take under two hours, from the van door opening
                  to the last sill wiped. This is what the two hours hold.
                </p>
              </div>
              <Artwork
                slug="bright-pane-windows-cleaner"
                alt="A window cleaner on the ground reaching an upstairs window of a house with a long water-fed pole"
                inks={{ blue: 'var(--on-blue)', yellow: 'var(--blue)', red: 'var(--hivis)', black: 'var(--ink)' }}
                className={s.cleaner}
              />
            </div>
            <ol className={s.steps}>
              {STEPS.map(([title, body]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <div className={s.promise}>
              <p className={s.promiseTitle}>The rain promise</p>
              <p className={s.promiseBody}>
                Rain on clean glass dries clean. If it rains within two days
                and leaves spots anyway, call, and we come back and do the
                outside again for nothing.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ AREA */}
        <section id="area" className={s.sec} aria-labelledby="area-h">
          <div className={s.head}>
            <h2 id="area-h">Where we work</h2>
            <p className={s.headNote}>
              The four set solid are on the round, and we are there every week. The rest
              we visit by quote, usually within ten days.
            </p>
          </div>
          <ul className={s.areas}>
            {AREAS.map((a) => (
              <li key={a.name} className={a.round ? s.onRound : s.byQuote}>{a.name}</li>
            ))}
          </ul>

          <div className={s.crewWrap}>
            <h3 className={s.sideTitle}>Who turns up</h3>
            <ul className={s.crew}>
              {CREW.map(([name, note]) => (
                <li key={name}>
                  <p className={s.crewName}>{name}</p>
                  <p>{note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.sec} aria-labelledby="quote-h">
          <form className={s.quote} action="#">
            <div className={s.quoteHead}>
              <h2 id="quote-h">Get a price</h2>
              <p>
                We text you a price within the working day. Most houses we can
                count from the street map, so nobody needs to come round first.
              </p>
            </div>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="bp-name">Name</label>
                <input id="bp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="bp-phone">Mobile, for the text</label>
                <input id="bp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="bp-address">Address</label>
                <input id="bp-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label htmlFor="bp-windows">Windows, roughly</label>
                <select id="bp-windows" name="windows" defaultValue="11-20">
                  <option value="1-10">1 to 10</option>
                  <option value="11-20">11 to 20</option>
                  <option value="21-30">21 to 30</option>
                  <option value="31+">More than 30</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="bp-stories">Stories</label>
                <select id="bp-stories" name="stories" defaultValue="2">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className={`${s.checks} ${s.fieldWide}`}>
                <label className={s.check} htmlFor="bp-gutters">
                  <input id="bp-gutters" name="gutters" type="checkbox" />
                  <span>Gutters too</span>
                </label>
                <label className={s.check} htmlFor="bp-screens">
                  <input id="bp-screens" name="screens" type="checkbox" />
                  <span>Wash the screens</span>
                </label>
                <label className={s.check} htmlFor="bp-round">
                  <input id="bp-round" name="round" type="checkbox" />
                  <span>Put me on the round</span>
                </label>
              </div>
            </div>
            <button className={s.button} type="submit">Text me a price</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.sill} aria-hidden="true">
          <TabbiedPattern
            pattern={mullion}
            palette={SILL}
            fit="grid"
            cellSize={30}
            seed="bright-pane-sill"
            options={{ frequency: 0.6 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>Bright Pane</p>
          <p>A fictional window and gutter cleaner. The prices, streets, rounds and crew are invented.</p>
          <p>The window cleaner is a generated picture, drawn in the page's own colors.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
