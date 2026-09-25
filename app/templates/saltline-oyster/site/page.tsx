import { TabbiedPattern } from 'tabbied/react';
import { eclipserings, tidering } from 'tabbied/patterns';
import s from './saltline-oyster.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Saltline Oyster Bar: Oysters and seafood, Pier Street',
  description:
    'Saltline is an oyster bar on the fish quay. Ten oysters charted by salinity every day, a raw bar, a short kitchen menu, weekday happy hour and a marble bar for walk-ins.',
};

/* Site colors. The rings are drawn in the tide and mist blues on a
   transparent ground, so they sit in the foam of the page. */
const TIDE = '#2F6F8F';
const PEBBLE = '#8C9296';
const MIST = '#DCE3E6';

const RINGS = ['transparent', TIDE, MIST, MIST, PEBBLE];
const SWELL = ['transparent', TIDE, MIST, PEBBLE];
const WAKE = ['transparent', TIDE, MIST, PEBBLE];
const ICE = ['transparent', MIST, MIST, MIST, PEBBLE, MIST];
const QUAY = ['transparent', TIDE, PEBBLE, TIDE];

const NAV = [
  ['Oysters', '#oysters'],
  ['Raw bar', '#raw'],
  ['Kitchen', '#kitchen'],
  ['Happy hour', '#happy'],
  ['The room', '#room'],
  ['Reserve', '#reserve'],
];

const TIDES = [
  ['High water', '5:42 am'],
  ['Low water', '11:58 am'],
  ['High water', '6:10 pm'],
  ['Oysters in', '10:30 am'],
];

type Oyster = {
  no: string;
  name: string;
  water: string;
  notes: string;
  size: string;
  salt: number;
  each: string;
  six: string;
};

const EAST: Oyster[] = [
  {
    no: '01',
    name: 'Saltline Select',
    water: 'Our own lease, outer harbor',
    notes: 'Clean brine, sweet finish. The house oyster.',
    size: 'M, 3 in',
    salt: 3.5,
    each: '2.75',
    six: '15',
  },
  {
    no: '02',
    name: 'Gull Rock',
    water: 'Cape Tern Bay',
    notes: 'A mouthful of sea water, then butter.',
    size: 'M, 3 in',
    salt: 4.5,
    each: '3.50',
    six: '20',
  },
  {
    no: '03',
    name: 'Pilot Point',
    water: 'Mercy Pond',
    notes: 'Firm, mineral, a little seaweed.',
    size: 'M, 2.75 in',
    salt: 4,
    each: '3.25',
    six: '18',
  },
  {
    no: '04',
    name: 'North Reach',
    water: 'Harrow River mouth',
    notes: 'Deep cup, meaty, mild.',
    size: 'L, 3.5 in',
    salt: 3,
    each: '3.75',
    six: '21',
  },
  {
    no: '05',
    name: 'Little Wren',
    water: 'Kettle Cove',
    notes: 'Small and bright, good first oyster.',
    size: 'S, 2.5 in',
    salt: 3.5,
    each: '3.25',
    six: '18',
  },
  {
    no: '06',
    name: 'Iron Flats',
    water: 'Stone Harbor, a flat oyster',
    notes: 'Metallic, long, not for everybody.',
    size: 'L, 3.5 in',
    salt: 5,
    each: '5.50',
    six: '31',
  },
];

const WEST: Oyster[] = [
  {
    no: '07',
    name: 'Kumo Bay',
    water: 'Otter Inlet',
    notes: 'Honeydew and cucumber, a deep little cup.',
    size: 'S, 2 in',
    salt: 2,
    each: '4.00',
    six: '22',
  },
  {
    no: '08',
    name: 'Sweetwater Cup',
    water: 'Long Sound',
    notes: 'The sweetest on the chart. Creamy.',
    size: 'S, 2.25 in',
    salt: 1.5,
    each: '3.75',
    six: '21',
  },
  {
    no: '09',
    name: 'Hollow Point',
    water: 'Deep Channel',
    notes: 'Mild brine, a green, grassy finish.',
    size: 'M, 2.75 in',
    salt: 2.5,
    each: '3.50',
    six: '20',
  },
  {
    no: '10',
    name: 'Tidewood',
    water: 'Cedar Spit',
    notes: 'Balanced and plump. Good with mignonette.',
    size: 'M, 3 in',
    salt: 3,
    each: '3.25',
    six: '18',
  },
];

const SCALE = ['1', '2', '3', '4', '5'];

const RAW = [
  ['Littleneck clams', 'each', '2.50'],
  ['Cherrystone clams', 'each', '2.75'],
  ['Shrimp cocktail', 'five, with horseradish', '16'],
  ['Tuna crudo', 'citrus, chili, olive oil', '18'],
  ['Scallop crudo', 'brown butter, capers', '17'],
  ['Half lobster, chilled', 'with lemon mayonnaise', '28'],
  ['The tower', '12 oysters, 6 clams, 4 shrimp, half lobster', '95'],
];

const KITCHEN = [
  ['Clam chowder', 'cup or bowl, oyster crackers', '12 / 16'],
  ['Grilled mackerel', 'fennel, blood orange, dill', '26'],
  ['Lobster roll', 'warm with butter or cold with mayo, fries', '34'],
  ['Mussels', 'cider, cream, grilled bread', '22'],
  ['Fried clam bellies', 'tartar sauce, lemon', '18'],
  ['Crab cake', 'remoulade, little gem salad', '19'],
  ['Hake and chips', 'beer batter, mushy peas', '24'],
  ['Fish of the day', 'brown butter, capers, potatoes', 'Market'],
];

const HAPPY = [
  ['Saltline Select oysters', '1.50'],
  ['Muscadet, by the glass', '7'],
  ['Draft lager', '5'],
  ['Fried clam bellies', '10'],
];

const ROOM = [
  ['Seats', '44, with 14 at the marble bar'],
  ['Private room', 'Up to 14, from $600'],
  ['Access', 'Step-free, accessible restroom'],
  ['Children', 'Welcome until 8 pm'],
];

const HOURS = [
  ['Monday to Thursday', '4 to 10 pm'],
  ['Friday and Saturday', 'Noon to 11 pm'],
  ['Sunday', 'Noon to 9 pm'],
  ['Kitchen closes', 'An hour before we do'],
];

export default function SaltlineOysterPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--foam': '#f2f0ea',
        '--deep': '#0f2233',
        '--tide': '#2f6f8f',
        '--pebble': '#8c9296',
        '--mist': '#dce3e6',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="foam,deep,tide,pebble,mist"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Saltline</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span data-edit="bar.barMeta" data-edit-max="60" className={s.barMeta}>Open today, 4 to 10</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A porthole of rings with the oyster in it, and today's tides. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Oyster bar and kitchen, on the fish quay</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.title} id="hero-h">
              Ten oysters on ice,
              <br />
              <em>charted by the brine.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Every oyster we open today is on the chart below, from the
              sweetest cup to the saltiest flat, with where it grew and what
              it costs. Point at a line and the shuckers will do the rest.
            </p>
            <dl className={s.tides}>
              {TIDES.map(([k, v], i) => (
                <div key={`${k}-${i}`}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.porthole}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,4,4,3" className={s.portField} aria-hidden="true">
              <TabbiedPattern
                pattern={eclipserings}
                palette={RINGS}
                fit="grid"
                cellSize={72}
                redrawInterval={9000}
                seed="saltline-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.portDisc}>
              <Artwork
                slug="saltline-oyster-oyster"
                alt="An engraved oyster lying half open"
                inks={['var(--deep)']}
                className={s.heroOyster}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- TIDE CHART
            The oysters as a chart: one line each, salinity drawn as a bar
            on a five-step scale. Engraved creatures hang in the margins. */}
        <section id="oysters" className={s.chartSec} aria-labelledby="oysters-h">
          <div className={s.hangLeft} aria-hidden="true">
            <Artwork slug="saltline-oyster-lobster" alt="" inks={['var(--tide)']} className={s.hangLobster} />
          </div>
          <div className={s.hangRight} aria-hidden="true">
            <span className={s.hangFish}>
              <Artwork slug="saltline-oyster-mackerel" alt="" inks={['var(--deep)']} className={s.hangMackerel} />
            </span>
          </div>

          <div className={s.chartWrap}>
            <div className={s.chartHead}>
              <span data-edit="oysters.secNo" data-edit-max="60" className={s.secNo}>Chart 01</span>
              <h2 data-edit="oysters.secTitle" data-edit-max="60" className={s.secTitle} id="oysters-h">Today's oysters</h2>
              <p data-edit="oysters.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Sold by the piece or the half dozen, with mignonette, cocktail
                sauce, fresh horseradish and lemon. The chart is rewritten at
                10:30 each morning when the boat is in.
              </p>
            </div>

            <div className={s.chart} role="table" aria-label="Today's oysters by salinity">
              <div className={s.chartCols} role="row">
                <span data-edit="oysters.text" data-edit-max="60" role="columnheader">No.</span>
                <span data-edit="oysters.text2" data-edit-max="60" role="columnheader">Oyster and water</span>
                <span data-edit="oysters.text3" data-edit-max="60" role="columnheader">Size</span>
                <div role="columnheader" className={s.scaleHead}>
                  <span className={s.scaleEnds}>
                    <span data-edit="oysters.text4" data-edit-max="60">Sweet</span>
                    <span data-edit="oysters.text5" data-edit-max="60">Salinity</span>
                    <span data-edit="oysters.text6" data-edit-max="60">Briny</span>
                  </span>
                  <span className={s.scaleTicks} aria-hidden="true">
                    {SCALE.map((n, i) => (
                      <span data-edit={`oysters.text7.${i}`} data-edit-max="60" key={n}>{n}</span>
                    ))}
                  </span>
                </div>
                <span data-edit="oysters.num" data-edit-max="60" role="columnheader" className={s.num}>Each</span>
                <span data-edit="oysters.num2" data-edit-max="60" role="columnheader" className={s.num}>Six</span>
              </div>

              <div className={s.station} role="row">
                <span data-edit="oysters.text8" data-edit-max="60" role="cell">East coast: cold water, more salt</span>
              </div>
              {EAST.map((o, i) => (
                <div key={o.no} className={s.row} role="row">
                  <span data-edit={`oysters.rowNo.${i}`} data-edit-max="60" className={s.rowNo} role="cell">{o.no}</span>
                  <div className={s.rowName} role="cell">
                    <h3 data-edit={`oysters.title.${i}`} data-edit-max="40">{o.name}</h3>
                    <span data-edit={`oysters.rowWater.${i}`} data-edit-max="60" className={s.rowWater}>{o.water}</span>
                    <span data-edit={`oysters.rowNotes.${i}`} data-edit-max="60" className={s.rowNotes}>{o.notes}</span>
                  </div>
                  <span data-edit={`oysters.rowSize.${i}`} data-edit-max="60" className={s.rowSize} role="cell">{o.size}</span>
                  <div className={s.track} role="cell">
                    <span className={s.gauge}>
                      <span className={s.fill} style={{ width: `${o.salt * 20}%` }} />
                    </span>
                    <span className={s.fillLabel}>{o.salt.toFixed(1)}</span>
                  </div>
                  <span data-edit={`oysters.rowPrice.${i}`} data-edit-max="60" className={`${s.rowPrice} ${s.num}`} role="cell">{o.each}</span>
                  <span data-edit={`oysters.rowSix.${i}`} data-edit-max="60" className={`${s.rowSix} ${s.num}`} role="cell">{o.six}</span>
                </div>
              ))}

              <div className={s.station} role="row">
                <span data-edit="oysters.text9" data-edit-max="60" role="cell">West coast: sweeter, deeper cups</span>
              </div>
              {WEST.map((o, i) => (
                <div key={o.no} className={s.row} role="row">
                  <span data-edit={`oysters.rowNo2.${i}`} data-edit-max="60" className={s.rowNo} role="cell">{o.no}</span>
                  <div className={s.rowName} role="cell">
                    <h3 data-edit={`oysters.title2.${i}`} data-edit-max="40">{o.name}</h3>
                    <span data-edit={`oysters.rowWater2.${i}`} data-edit-max="60" className={s.rowWater}>{o.water}</span>
                    <span data-edit={`oysters.rowNotes2.${i}`} data-edit-max="60" className={s.rowNotes}>{o.notes}</span>
                  </div>
                  <span data-edit={`oysters.rowSize2.${i}`} data-edit-max="60" className={s.rowSize} role="cell">{o.size}</span>
                  <div className={s.track} role="cell">
                    <span className={s.gauge}>
                      <span className={s.fill} style={{ width: `${o.salt * 20}%` }} />
                    </span>
                    <span className={s.fillLabel}>{o.salt.toFixed(1)}</span>
                  </div>
                  <span data-edit={`oysters.rowPrice2.${i}`} data-edit-max="60" className={`${s.rowPrice} ${s.num}`} role="cell">{o.each}</span>
                  <span data-edit={`oysters.rowSix2.${i}`} data-edit-max="60" className={`${s.rowSix} ${s.num}`} role="cell">{o.six}</span>
                </div>
              ))}
            </div>
            <p data-edit="oysters.chartFoot" data-edit-max="240" data-edit-multiline className={s.chartFoot}>
              Raw shellfish carries a risk for anyone with a weak immune
              system, liver trouble or a pregnancy. Ask us and we will steer you.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- RAW BAR */}
        <section id="raw" className={s.sec} aria-labelledby="raw-h">
          <div className={s.split}>
            <div className={s.splitHead}>
              <span data-edit="raw.secNo" data-edit-max="60" className={s.secNo}>Chart 02</span>
              <h2 data-edit="raw.secTitle" data-edit-max="60" className={s.secTitle} id="raw-h">The rest of the raw bar</h2>
              <p data-edit="raw.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Clams opened to order, crudo cut at the counter, lobster boiled
                that morning and chilled. Towers take about fifteen minutes.
              </p>
              <div className={s.rawPlate}>
                <div className={s.rawIce} aria-hidden="true">
                  <TabbiedPattern
                    pattern={tidering}
                    palette={ICE}
                    fit="grid"
                    cellSize={44}
                    options={{ frequency: 0.8 }}
                    seed="saltline-ice"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="saltline-oyster-oyster"
                  alt=""
                  inks={['var(--tide)']}
                  className={s.rawOyster}
                />
              </div>
            </div>
            <ul className={s.menu}>
              {RAW.map(([name, note, price], i) => (
                <li key={name}>
                  <span data-edit={`raw.menuName.${i}`} data-edit-max="60" className={s.menuName}>{name}</span>
                  <span className={s.menuLeader} aria-hidden="true" />
                  <span data-edit={`raw.menuPrice.${i}`} data-edit-max="60" className={s.menuPrice}>{price}</span>
                  <span data-edit={`raw.menuNote.${i}`} data-edit-max="60" className={s.menuNote}>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- KITCHEN
            The mackerel stretched across the top of the menu like a label. */}
        <section id="kitchen" className={s.kitchen} aria-labelledby="kitchen-h">
          <div className={s.kitchenBand} aria-hidden="true">
            <TabbiedPattern
              pattern={eclipserings}
              palette={SWELL}
              fit="grid"
              cellSize={52}
              seed="saltline-kitchen"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.kitchenInner}>
            <div className={s.kitchenArt}>
              <Artwork
                slug="saltline-oyster-mackerel"
                alt="An engraved mackerel seen from the side"
                inks={['var(--deep)']}
                className={s.kitchenFish}
              />
            </div>
            <div className={s.kitchenHead}>
              <span data-edit="kitchen.secNo" data-edit-max="60" className={s.secNo}>Chart 03</span>
              <h2 data-edit="kitchen.secTitle" data-edit-max="60" className={s.secTitle} id="kitchen-h">From the kitchen</h2>
              <p data-edit="kitchen.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A short menu that follows the boat. Bread from the bakery on
                Rope Walk; butter from the dairy up the valley.
              </p>
            </div>
            <ul className={`${s.menu} ${s.menuTwo}`}>
              {KITCHEN.map(([name, note, price], i) => (
                <li key={name}>
                  <span data-edit={`kitchen.menuName.${i}`} data-edit-max="60" className={s.menuName}>{name}</span>
                  <span className={s.menuLeader} aria-hidden="true" />
                  <span data-edit={`kitchen.menuPrice.${i}`} data-edit-max="60" className={s.menuPrice}>{price}</span>
                  <span data-edit={`kitchen.menuNote.${i}`} data-edit-max="60" className={s.menuNote}>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ HAPPY HOUR
            The one dark band, with the rings running along it. */}
        <section id="happy" className={s.happy} aria-labelledby="happy-h">
          <div data-edit-pattern="happy.field" data-edit-roles="transparent,2,4,3" className={s.happyField} aria-hidden="true">
            <TabbiedPattern
              pattern={eclipserings}
              palette={SWELL}
              fit="grid"
              cellSize={110}
              seed="saltline-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.happyInner}>
            <div className={s.happyHead}>
              <span data-edit="happy.happyWhen" data-edit-max="60" className={s.happyWhen}>Monday to Friday, 4 to 6, at the bar</span>
              <h2 data-edit="happy.happyTitle" data-edit-max="60" className={s.happyTitle} id="happy-h">Happy hour at low tide</h2>
              <p data-edit="happy.happyNote" data-edit-max="240" data-edit-multiline className={s.happyNote}>
                Bar stools only, first come. The house oyster at a price that
                makes the second dozen easy.
              </p>
            </div>
            <ul className={s.happyList}>
              {HAPPY.map(([name, price], i) => (
                <li key={name}>
                  <span data-edit={`happy.happyPrice.${i}`} data-edit-max="60" className={s.happyPrice}>{price}</span>
                  <span data-edit={`happy.happyName.${i}`} data-edit-max="60" className={s.happyName}>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- THE ROOM */}
        <section id="room" className={s.sec} aria-labelledby="room-h">
          <div className={s.room}>
            <div data-edit-pattern="room.field" data-edit-roles="transparent,2,4,3" className={s.roomPanel} aria-hidden="true">
              <TabbiedPattern
                pattern={tidering}
                palette={WAKE}
                fit="grid"
                cellSize={84}
                options={{ frequency: 1 }}
                redrawInterval={8800}
                seed="saltline-room"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.roomText}>
              <span data-edit="room.secNo" data-edit-max="60" className={s.secNo}>Chart 04</span>
              <h2 data-edit="room.secTitle" data-edit-max="60" className={s.secTitle} id="room-h">The room</h2>
              <p data-edit="room.roomLede" data-edit-max="240" data-edit-multiline className={s.roomLede}>
                An old ice house on the quay: a long marble bar facing the
                shuckers, tables along the windows, and a back room with its
                own door for parties.
              </p>
              <p data-edit="room.roomBody" data-edit-max="240" data-edit-multiline className={s.roomBody}>
                The bar is kept for walk-ins every night. Tables can be booked
                up to thirty days ahead, and we hold a few back for the
                weather.
              </p>
              <dl className={s.roomFacts}>
                {ROOM.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`room.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`room.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- RESERVE */}
        <section id="reserve" className={s.sec} aria-labelledby="reserve-h">
          <div className={s.reserve}>
            <div className={s.reserveInfo}>
              <span data-edit="reserve.secNo" data-edit-max="60" className={s.secNo}>Chart 05</span>
              <h2 data-edit="reserve.secTitle" data-edit-max="60" className={s.secTitle} id="reserve-h">Book a table</h2>
              <p data-edit="reserve.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Parties of seven or more, call us. For the bar, just come
                down: there is usually a stool within twenty minutes.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`reserve.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`reserve.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="reserve.address" data-edit-max="240" data-edit-multiline className={s.address}>12 Pier Street, on the fish quay</p>
              <ul className={s.contact}>
                <li>
                  <a data-edit="reserve.link" data-edit-max="28" href="tel:+15550184471">(555) 018-4471</a>
                </li>
                <li>
                  <a data-edit="reserve.link2" data-edit-max="28" href="mailto:table@saltline.example">table@saltline.example</a>
                </li>
              </ul>
              <Artwork
                slug="saltline-oyster-lobster"
                alt=""
                inks={['var(--pebble)']}
                className={s.reserveLobster}
              />
            </div>
            <form className={s.form} action="#">
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="reserve.text" data-edit-max="60">Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className={s.field}>
                  <span data-edit="reserve.text2" data-edit-max="60">Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" required />
                </label>
              </div>
              <div className={s.formRow3}>
                <label className={s.field}>
                  <span data-edit="reserve.text3" data-edit-max="60">Date</span>
                  <input type="date" name="date" required />
                </label>
                <label className={s.field}>
                  <span data-edit="reserve.text4" data-edit-max="60">Time</span>
                  <select name="time" defaultValue="19:00">
                    <option value="17:00">5:00 pm</option>
                    <option value="17:30">5:30 pm</option>
                    <option value="18:00">6:00 pm</option>
                    <option value="18:30">6:30 pm</option>
                    <option value="19:00">7:00 pm</option>
                    <option value="19:30">7:30 pm</option>
                    <option value="20:00">8:00 pm</option>
                    <option value="20:30">8:30 pm</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span data-edit="reserve.text5" data-edit-max="60">Guests</span>
                  <select name="guests" defaultValue="2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </label>
              </div>
              <fieldset className={s.choice}>
                <legend data-edit="reserve.legend">Where would you like to sit</legend>
                <label>
                  <input type="radio" name="seat" value="window" defaultChecked />
                  <span data-edit="reserve.text6" data-edit-max="60">By the windows</span>
                </label>
                <label>
                  <input type="radio" name="seat" value="room" />
                  <span data-edit="reserve.text7" data-edit-max="60">Anywhere in the room</span>
                </label>
                <label>
                  <input type="radio" name="seat" value="back" />
                  <span data-edit="reserve.text8" data-edit-max="60">The back room</span>
                </label>
              </fieldset>
              <label className={s.field}>
                <span data-edit="reserve.text9" data-edit-max="60">Anything we should know</span>
                <textarea name="notes" rows={3} placeholder="Allergies, a birthday, a high chair" />
              </label>
              <button data-edit="reserve.submit" data-edit-max="24" className={s.submit} type="submit">Request the table</button>
              <small data-edit="reserve.formNote" className={s.formNote}>We confirm by text within the hour while we are open.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={tidering}
            palette={QUAY}
            fit="grid"
            cellSize={40}
            seed="saltline-quay"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Saltline</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Oyster bar and kitchen, 12 Pier Street.</p>
          </div>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.oysters" data-edit-max="28" href="#oysters">Today's oysters</a></li>
            <li><a data-edit="footer.kitchen" data-edit-max="28" href="#kitchen">Kitchen menu</a></li>
            <li><a data-edit="footer.happy" data-edit-max="28" href="#happy">Happy hour</a></li>
            <li><a data-edit="footer.reserve" data-edit-max="28" href="#reserve">Book a table</a></li>
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional oyster bar. Oysters, prices, tides and hours are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the bar's own blues.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
