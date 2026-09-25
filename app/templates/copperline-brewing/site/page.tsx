import { TabbiedPattern } from 'tabbied/react';
import { sunsetrings, bokeh } from 'tabbied/patterns';
import s from './copperline-brewing.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Figure } from 'components/Figure';

export const metadata = {
  title: 'Copperline Brewing: Brewery and taproom, Foundry Yard',
  description:
    'Copperline Brewing pours twelve beers brewed forty feet from the bar. The tap board, cans to take away, food trucks by day, Saturday brewery tours and private hire, at Foundry Yard.',
};

/* Site colors, the same six as the stylesheet's root rule. Every field
   takes `transparent` first, so the rings and bubbles sit on the board. */
const BOARD = '#161A17';
const AMBER = '#E0A33B';
const HOP = '#8DB255';
const SLATE = '#6D706A';
const PANEL = '#232924';

const PLATE = ['transparent', AMBER, PANEL, HOP, SLATE];
const FIZZ = ['transparent', AMBER, HOP];
const LINE = ['transparent', PANEL, AMBER, BOARD];

const NAV = [
  ['On tap', '#taps'],
  ['Cans', '#cans'],
  ['Food', '#food'],
  ['Tours', '#tours'],
  ['Private hire', '#hire'],
  ['Visit', '#visit'],
];

type Tap = {
  no: string;
  name: string;
  style: string;
  abv: string;
  pours: [string, string][];
  tone: 'straw' | 'gold' | 'hazy' | 'amber' | 'copper' | 'brown' | 'black';
  tag?: string;
};

const TAPS: Tap[] = [
  {
    no: '01',
    name: 'Foundry Pale',
    style: 'American pale ale',
    abv: '5.2%',
    pours: [['Half', '$4.50'], ['Pint', '$7']],
    tone: 'gold',
  },
  {
    no: '02',
    name: 'Canal Street',
    style: 'Helles lager',
    abv: '4.6%',
    pours: [['Half', '$4'], ['Pint', '$6.50']],
    tone: 'straw',
  },
  {
    no: '03',
    name: 'Loose Rivets',
    style: 'West Coast IPA',
    abv: '6.8%',
    pours: [['Half', '$5'], ['Pint', '$8']],
    tone: 'amber',
  },
  {
    no: '04',
    name: 'Soft Focus',
    style: 'Hazy IPA, Citra and Mosaic',
    abv: '6.2%',
    pours: [['Half', '$5'], ['Pint', '$8']],
    tone: 'hazy',
    tag: 'New',
  },
  {
    no: '05',
    name: 'Clocking Off',
    style: 'Session IPA',
    abv: '4.0%',
    pours: [['Half', '$4'], ['Pint', '$6.50']],
    tone: 'straw',
  },
  {
    no: '06',
    name: 'Patina',
    style: 'Farmhouse saison',
    abv: '6.0%',
    pours: [['Half', '$5'], ['Pint', '$8']],
    tone: 'gold',
  },
  {
    no: '07',
    name: 'Tinderbox',
    style: 'Irish red ale',
    abv: '5.5%',
    pours: [['Half', '$4.50'], ['Pint', '$7']],
    tone: 'copper',
  },
  {
    no: '08',
    name: 'Slow Pour',
    style: 'Czech dark lager, side-pull tap',
    abv: '4.2%',
    pours: [['Half', '$4.50'], ['Pint', '$7']],
    tone: 'brown',
  },
  {
    no: '09',
    name: 'Night Shift',
    style: 'Oatmeal stout, on nitro',
    abv: '5.8%',
    pours: [['Half', '$4.50'], ['Pint', '$7.50']],
    tone: 'black',
  },
  {
    no: '10',
    name: 'Brass Band',
    style: 'Double IPA',
    abv: '8.4%',
    pours: [['10 oz', '$7'], ['Pint', '$10']],
    tone: 'amber',
    tag: 'Last keg',
  },
  {
    no: '11',
    name: 'Old Kiln',
    style: 'Barleywine, a year in bourbon barrels',
    abv: '11.2%',
    pours: [['5 oz', '$5'], ['10 oz', '$9']],
    tone: 'brown',
  },
  {
    no: '12',
    name: 'Zero Hour',
    style: 'Non-alcoholic pale ale',
    abv: '0.4%',
    pours: [['Half', '$3.50'], ['Pint', '$5.50']],
    tone: 'straw',
  },
];

const TODAY = [
  ['Thursday', '25 September'],
  ['Open', 'Noon to 11 pm'],
  ['Pouring', '12 lines'],
  ['Board updated', '4:10 pm'],
];

const POURS = [
  ['Taster', '5 oz'],
  ['Half', '10 oz'],
  ['Pint', '16 oz'],
  ['Flight of four', '$10'],
];

type Can = {
  name: string;
  style: string;
  pack: string;
  price: string;
  tone: Tap['tone'];
};

const CANS: Can[] = [
  { name: 'Foundry Pale', style: 'Pale ale, 5.2%', pack: '4 x 16 oz', price: '$16', tone: 'gold' },
  { name: 'Canal Street', style: 'Helles lager, 4.6%', pack: '4 x 16 oz', price: '$14', tone: 'straw' },
  { name: 'Loose Rivets', style: 'West Coast IPA, 6.8%', pack: '4 x 16 oz', price: '$19', tone: 'amber' },
  { name: 'Soft Focus', style: 'Hazy IPA, 6.2%', pack: '4 x 16 oz', price: '$19', tone: 'hazy' },
  { name: 'Night Shift', style: 'Oatmeal stout, 5.8%', pack: '4 x 16 oz', price: '$17', tone: 'black' },
  { name: 'Zero Hour', style: 'Non-alcoholic, 0.4%', pack: '6 x 12 oz', price: '$13', tone: 'straw' },
];

const FILLS = [
  ['Crowler', '32 oz, filled and seamed from any tap', '$12-18'],
  ['Growler refill', '64 oz, your clean growler or ours', '$18-26'],
  ['Mixed case', 'Any 24 cans from the fridge', '10% off'],
];

const TRUCKS = [
  ['Monday', 'Closed for brewing', '', ''],
  ['Tuesday', 'Pierogi Wagon', 'Potato and cheese pierogi, kielbasa, kraut dogs', '5-9 pm'],
  ['Wednesday', 'Smoke Signal BBQ', 'Brisket, pulled pork, burnt ends on Wednesdays only', '5-9 pm'],
  ['Thursday', 'Taco Libre', 'Al pastor, mushroom and poblano, elote', '5-9:30 pm'],
  ['Friday', 'Wood and Fire', 'Neapolitan pizza from a trailer oven', 'Noon-10 pm'],
  ['Saturday', 'Smoke Signal, then Taco Libre', 'Barbecue for lunch, tacos for dinner', 'Noon-10 pm'],
  ['Sunday', 'Dumpling Division', 'Pork and chive, cabbage and tofu, chili oil', 'Noon-7 pm'],
];

const TOUR_STOPS = [
  ['The malt room', 'Where 800 pounds of grain a brew is milled. Hands in the sacks is encouraged.'],
  ['The brewhouse', 'A ten-barrel mash tun and kettle. On a Saturday something is usually boiling.'],
  ['The fermenters', 'Six tanks, each with a chalk tag saying what is in it and how many days it has had.'],
  ['The cold room', 'Kegs, the canning line, and the tap you can pour yourself from under supervision.'],
  ['Back at the bar', 'Four tasters of your choice, and the glass you drank them from goes home with you.'],
];

const HIRE = [
  {
    room: 'The Mezzanine',
    size: '40 standing, 24 seated',
    price: 'From a $300 minimum spend, Sunday to Thursday; $600 on Friday and Saturday',
    note: 'Up the stairs above the fermenters, with its own bar and a view down into the brewhouse. Birthdays, leaving drinks, team nights.',
  },
  {
    room: 'The whole taproom',
    size: '150 standing, 80 seated',
    price: 'Mondays only, from $2,500 including two bartenders',
    note: 'Monday is brew day, so the taproom is dark. Take it over for a wedding party, a launch or a reunion, with a food truck of your choosing.',
  },
];

const HIRE_INCLUDES = [
  'A tab you set a limit on, not a per-head package',
  'Any of the food trucks, booked through us',
  'A playlist cable and a microphone for speeches',
  'A brewer to say a few words about the beer, if you want one',
];

const HOURS = [
  ['Monday', 'Closed, brew day'],
  ['Tuesday', '3-10 pm'],
  ['Wednesday', '3-10 pm'],
  ['Thursday', 'Noon-11 pm'],
  ['Friday', 'Noon-11 pm'],
  ['Saturday', 'Noon-11 pm'],
  ['Sunday', 'Noon-8 pm'],
];

const RULES = [
  ['Ages', 'Everyone is welcome until 8 pm; 21 and over after that. ID is checked at the door.'],
  ['Dogs', 'Welcome inside on a leash. The water bowl by the door is refilled every hour.'],
  ['Getting here', 'Bus 12 to Canal and Mill, then a two-minute walk. Bike racks by the loading dock.'],
  ['Parking', 'Free in the yard after 5 pm and all weekend. Please do not block the grain silo.'],
];

export default function CopperlineBrewingPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Copperline Brewing</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barMeta}>Open today, noon to 11 pm</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------- BOARD
            The page opens on the tap board: a title row with the pint on
            its ring plate, then the twelve lines in a ruled grid. */}
        <section id="taps" className={s.board} aria-labelledby="taps-h">
          <div className={s.boardHead}>
            <div className={s.boardTitle}>
              <p className={s.kicker}>Brewery and taproom, Foundry Yard</p>
              <h1 id="taps-h" className={s.title}>
                On tap <em>today</em>
              </h1>
              <p className={s.lede}>
                Twelve lines, all brewed forty feet from the bar on a
                ten-barrel kit. The board changes when a keg does, which is
                most weeks on a Tuesday and a Friday.
              </p>
              <dl className={s.today}>
                {TODAY.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.plate}>
              <div className={s.plateField} aria-hidden="true">
                <TabbiedPattern
                  pattern={sunsetrings}
                  palette={PLATE}
                  options={{ frequency: 1 }}
                  fit="grid"
                  cellSize={96}
                  seed="copperline-plate"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Figure
                slug="copperline-brewing-pint-cutout"
                cutout
                priority
                alt="A pint glass of golden pale ale with a thick white head"
                className={s.pint}
              />
            </div>
          </div>

          <ol className={s.taps}>
            {TAPS.map((t) => (
              <li key={t.no} className={s.tap}>
                <div className={s.tapTop}>
                  <span className={s.tapNo}>{t.no}</span>
                  {t.tag ? <span className={t.tag === 'New' ? s.tagNew : s.tagLast}>{t.tag}</span> : null}
                  <span className={`${s.glass} ${s[t.tone]}`} aria-hidden="true" />
                </div>
                <p className={s.tapName}>{t.name}</p>
                <p className={s.tapStyle}>{t.style}</p>
                <dl className={s.tapFacts}>
                  <div>
                    <dt>ABV</dt>
                    <dd>{t.abv}</dd>
                  </div>
                  {t.pours.map(([size, price]) => (
                    <div key={size}>
                      <dt>{size}</dt>
                      <dd>{price}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>

          <div className={s.boardFoot}>
            <dl className={s.pours}>
              {POURS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={s.boardNote}>
              Tap water is free and on the bar. Line 12 is always something
              without the alcohol, and there is a dry cider in the fridge for
              anyone avoiding gluten.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- CANS */}
        <section id="cans" className={s.sec} aria-labelledby="cans-h">
          <div className={s.cansGrid}>
            <div className={s.fizz} aria-hidden="true">
              <TabbiedPattern
                pattern={bokeh}
                palette={FIZZ}
                options={{ frequency: 0.6 }}
                fit="grid"
                cellSize={72}
                redrawInterval={8400}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.cansBody}>
              <div className={s.secHead}>
                <span className={s.secNo}>02</span>
                <h2 id="cans-h">Cans to take away</h2>
                <p className={s.secNote}>
                  Canned on Tuesdays and in the fridge by the door by
                  Wednesday. Pay at the bar; the fridge is open whenever we are.
                </p>
              </div>
              <ul className={s.cans}>
                {CANS.map((c) => (
                  <li key={c.name}>
                    <span className={`${s.glass} ${s[c.tone]}`} aria-hidden="true" />
                    <div className={s.canName}>
                      <strong>{c.name}</strong>
                      <span>{c.style}</span>
                    </div>
                    <span className={s.canPack}>{c.pack}</span>
                    <span className={s.canPrice}>{c.price}</span>
                  </li>
                ))}
              </ul>
              <dl className={s.fills}>
                {FILLS.map(([k, v, p]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd className={s.fillWhat}>{v}</dd>
                    <dd className={s.fillPrice}>{p}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- FOOD */}
        <section id="food" className={s.sec} aria-labelledby="food-h">
          <div className={s.secHead}>
            <span className={s.secNo}>03</span>
            <h2 id="food-h">Food trucks by day</h2>
            <p className={s.secNote}>
              We do not have a kitchen, so a different truck parks in the yard
              each night. Order at the window and they will bring it in. You
              are welcome to bring your own food any day.
            </p>
          </div>
          <table className={s.trucks}>
            <caption className={s.srOnly}>Food trucks in the yard, by day of the week</caption>
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Truck</th>
                <th scope="col">Serving</th>
                <th scope="col">Window</th>
              </tr>
            </thead>
            <tbody>
              {TRUCKS.map(([day, truck, food, time]) => (
                <tr key={day} className={food ? undefined : s.dark}>
                  <th scope="row">{day}</th>
                  <td className={s.truckName}>{truck}</td>
                  <td className={s.truckFood}>{food}</td>
                  <td className={s.truckTime}>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={s.footnote}>
            Soft pretzels with beer mustard are at the bar every day we are
            open, $6.
          </p>
        </section>

        {/* ---------------------------------------------------------- TOURS */}
        <section id="tours" className={s.sec} aria-labelledby="tours-h">
          <div className={s.secHead}>
            <span className={s.secNo}>04</span>
            <h2 id="tours-h">Brewery tours</h2>
            <p className={s.secNote}>
              Saturdays at 1 pm and 3 pm, forty-five minutes, fourteen people
              at most. Led by whoever brewed that week.
            </p>
          </div>
          <div className={s.tours}>
            <ol className={s.route}>
              {TOUR_STOPS.map(([stop, body], i) => (
                <li key={stop}>
                  <span className={s.routeNo}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{stop}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <div className={s.ticket}>
              <p className={s.ticketHead}>One ticket</p>
              <p className={s.ticketPrice}>$18</p>
              <ul className={s.ticketList}>
                <li>Four tasters of your choice</li>
                <li>A Copperline glass to keep</li>
                <li>21 and over, with ID</li>
                <li>Closed-toe shoes, please: the floor is wet</li>
              </ul>
              <a className={s.button} href="mailto:tours@copperline.example">Book a tour</a>
              <p className={s.ticketNote}>
                Or ask at the bar. Groups of eight or more, write and we will
                add a tour on a weekday.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- HIRE */}
        <section id="hire" className={s.sec} aria-labelledby="hire-h">
          <div className={s.secHead}>
            <span className={s.secNo}>05</span>
            <h2 id="hire-h">Private hire</h2>
            <p className={s.secNote}>
              Two ways to have the place to yourselves. No room fee: you
              spend the minimum at the bar and the trucks, and that is it.
            </p>
          </div>
          <div className={s.rooms}>
            {HIRE.map((h) => (
              <article key={h.room} className={s.room}>
                <h3>{h.room}</h3>
                <p className={s.roomSize}>{h.size}</p>
                <p className={s.roomPrice}>{h.price}</p>
                <p className={s.roomNote}>{h.note}</p>
              </article>
            ))}
            <div className={s.includes}>
              <h3>Every booking includes</h3>
              <ul>
                {HIRE_INCLUDES.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <a className={s.buttonGhost} href="mailto:events@copperline.example">Ask about a date</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- LINE
            The copper line: one row of rings across the page. */}
        <div className={s.line} aria-hidden="true">
          <TabbiedPattern
            pattern={sunsetrings}
            palette={LINE}
            options={{ frequency: 1 }}
            fit="grid"
            cellSize={48}
            seed="copperline-line"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <span className={s.secNo}>06</span>
            <h2 id="visit-h">Hours and the taproom</h2>
            <p className={s.secNote}>
              A converted brass foundry at the end of the yard. Long tables,
              a small stage for Sunday folk sessions, and the brewhouse behind
              a glass wall.
            </p>
          </div>
          <div className={s.visit}>
            <div>
              <h3 className={s.visitHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d} className={d === 'Thursday' ? s.isToday : undefined}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className={s.visitHead}>Find us</h3>
              <p className={s.address}>
                Unit 4, Foundry Yard
                <br />
                212 Canal Street
              </p>
              <ul className={s.contact}>
                <li>
                  <a href="tel:+15550142290">(555) 014-2290</a>
                </li>
                <li>
                  <a href="mailto:hello@copperline.example">hello@copperline.example</a>
                </li>
              </ul>
              <dl className={s.rules}>
                {RULES.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Copperline Brewing</p>
            <p className={s.footTag}>Twelve lines, a yard full of food trucks, and the brewhouse behind the glass.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p className={s.footAddr}>
            Unit 4, Foundry Yard
            <br />
            212 Canal Street
            <br />
            (555) 014-2290
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional brewery and taproom. Beers, prices, trucks and hours are invented. Please drink responsibly.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
