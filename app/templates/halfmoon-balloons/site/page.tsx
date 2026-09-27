import { TabbiedPattern } from 'tabbied/react';
import { thirdstop, bengaline, stepramp, sunsetrings, horizonbands } from 'tabbied/patterns';
import s from './halfmoon-balloons.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Halfmoon Balloon Flights: Hot air balloon rides from Halfmoon Farm, Avon Vale',
  description:
    'Sunrise, sunset and private balloon flights over Avon Vale from the launch field at Halfmoon Farm. The pilot\'s weather board, the logbook, gift certificates and booking.',
};

/* Site colors. The sky is the lead pattern over a dawn wash; the balloons
   and the valley are generated pictures inked from the same five roles. */
const DAWN = '#f7e9da';
const INK = '#22223a';
const RED = '#e0503a';
const YELLOW = '#f2b43b';
const BLUE = '#3e6fb5';

const SKY = ['transparent', DAWN, YELLOW, DAWN, RED, YELLOW];
const RIBBON = ['transparent', RED, YELLOW, BLUE, RED, INK];
const CLIMB = ['transparent', BLUE, INK, BLUE, YELLOW, BLUE];
const GUILLOCHE = ['transparent', RED, DAWN, BLUE, YELLOW];
const MANIFEST = ['transparent', INK, YELLOW, RED, BLUE, DAWN];
const HORIZON = ['transparent', BLUE, YELLOW, RED, DAWN, YELLOW];

const NAV = [
  ['Flights', '#flights'],
  ['On the day', '#day'],
  ['Weather', '#weather'],
  ['Vouchers', '#vouchers'],
  ['Launch sites', '#sites'],
  ['FAQ', '#faq'],
];

const ALTITUDES = ['3,000', '2,500', '2,000', '1,500', '1,000', '500', '0'];

const TODAY = [
  ['Sunrise', 'GO', 'Lift-off 06:52'],
  ['Sunset', 'HOLD', 'Decision at 15:00'],
];

type Flight = {
  name: string;
  price: string;
  per: string;
  margin: string;
  rows: [string, string][];
};

const FLIGHTS: Flight[] = [
  {
    name: 'Sunrise flight',
    price: '$245',
    per: 'per person',
    margin: 'Stillest air of the day',
    rows: [
      ['Meet', 'An hour before sunrise'],
      ['In the air', 'About one hour'],
      ['Whole morning', '3.5 to 4 hours'],
      ['Basket', 'Up to 12 passengers'],
      ['Season', 'April to October, daily'],
    ],
  },
  {
    name: 'Sunset flight',
    price: '$225',
    per: 'per person',
    margin: 'Long shadows, warm light',
    rows: [
      ['Meet', 'Three hours before sunset'],
      ['In the air', 'About one hour'],
      ['Whole evening', 'About 3.5 hours'],
      ['Basket', 'Up to 12 passengers'],
      ['Season', 'May to September, weekdays'],
    ],
  },
  {
    name: 'Private for two',
    price: '$690',
    per: 'for two',
    margin: 'Just you, one other and the pilot',
    rows: [
      ['Meet', 'Sunrise or sunset, your date'],
      ['In the air', 'About one hour'],
      ['Whole trip', '3.5 to 4 hours'],
      ['Basket', 'The small one, Wren'],
      ['Season', 'April to October'],
    ],
  },
];

type Entry = {
  date: string;
  flight: string;
  launch: string;
  landing: string;
  time: string;
  alt: string;
  pax: string;
  remarks: string;
  grounded?: boolean;
};

const LOG: Entry[] = [
  { date: '21 Sep', flight: 'Sunrise', launch: 'Halfmoon Farm', landing: 'Top Meadow, Coldharbour', time: '1 h 05', alt: '2,650 ft', pax: '10', remarks: 'Mist in the vale, gone by 07:10' },
  { date: '20 Sep', flight: 'Sunset', launch: 'Halfmoon Farm', landing: 'Long Acre, Stanton', time: '0 h 58', alt: '1,900 ft', pax: '11', remarks: 'Six deer in Bishops Wood' },
  { date: '19 Sep', flight: 'Sunrise', launch: 'Kestrel Down', landing: 'Stubble field, Frome Lane', time: '1 h 12', alt: '3,050 ft', pax: '12', remarks: 'Two birthdays aboard' },
  { date: '17 Sep', flight: 'Private', launch: 'Halfmoon Farm', landing: 'Paddock behind the Swan', time: '1 h 00', alt: '2,200 ft', pax: '2', remarks: 'She said yes' },
  { date: '16 Sep', flight: 'Sunrise', launch: '-', landing: 'Not flown', time: '-', alt: '-', pax: '-', remarks: 'NO-GO, 14 kt at 1,000 ft', grounded: true },
  { date: '14 Sep', flight: 'Sunset', launch: 'Millbrook Common', landing: 'Water meadow, Hatch End', time: '0 h 55', alt: '1,700 ft', pax: '9', remarks: 'Soft landing, wet boots' },
];

const DAY = [
  { time: '05:30', name: 'The call', note: 'We ring and text everyone with the pilot\'s decision, made on the 05:00 forecast.' },
  { time: '06:00', name: 'Meet at the barn', note: 'Park in the yard at Halfmoon Farm. Coffee in the tack room.' },
  { time: '06:15', name: 'Cold inflation', note: 'A big fan fills the envelope on the grass while you hold the crown line.' },
  { time: '06:35', name: 'Burners on', note: 'The balloon stands up. You climb into your compartment of the basket.' },
  { time: '06:45', name: 'Lift-off', note: 'No jolt at all. The field simply drops away beneath you.' },
  { time: '07:00', name: 'In the air', note: 'An hour wherever the wind goes, between 500 and 3,000 feet.' },
  { time: '07:50', name: 'Landing', note: 'In a farmer\'s field, with permission. Knees bent, hold the handles.' },
  { time: '08:15', name: 'Champagne', note: 'The toast, your certificate, and the minibus back to the barn.' },
];

type Reading = { measure: string; limit: string; now: string; state: 'go' | 'hold' | 'nogo'; flag: string };

const BOARD: Reading[] = [
  { measure: 'Surface wind', limit: 'Under 8 kt', now: '4 kt SW', state: 'go', flag: 'GO' },
  { measure: 'Wind at 1,000 ft', limit: 'Under 15 kt', now: '11 kt WSW', state: 'go', flag: 'GO' },
  { measure: 'Cloud base', limit: 'Above 1,500 ft', now: '2,800 ft', state: 'go', flag: 'GO' },
  { measure: 'Visibility', limit: 'Over 5 km', now: '12 km', state: 'go', flag: 'GO' },
  { measure: 'Showers within 30 mi', limit: 'None', now: 'None', state: 'go', flag: 'GO' },
  { measure: 'Thermals, evening', limit: 'Settled by 17:30', now: 'Check 15:00', state: 'hold', flag: 'HOLD' },
];

const WEEK = [
  { day: 'Sat', state: 'go', flag: 'GO' },
  { day: 'Sun', state: 'hold', flag: 'HOLD' },
  { day: 'Mon', state: 'nogo', flag: 'NO' },
  { day: 'Tue', state: 'nogo', flag: 'NO' },
  { day: 'Wed', state: 'go', flag: 'GO' },
  { day: 'Thu', state: 'go', flag: 'GO' },
  { day: 'Fri', state: 'hold', flag: 'HOLD' },
];

const REBOOK = [
  ['Called off by us', 'Rebook free, as often as it takes. A ticket is valid for two years from the first date you booked.'],
  ['Changed by you', 'Move your date free up to seven days before. Inside the week, one move is free.'],
  ['Still grounded', 'If two years pass without a flight we extend by a year, or refund you less $20.'],
  ['How you hear', 'A text and a call at 05:30 for sunrise, 14:00 for sunset. Please keep your phone on.'],
];

const SEASON = [
  ['164', 'flights planned in 2025'],
  ['109', 'flew'],
  ['0', 'tickets lost to weather'],
];

const VOUCHERS = [
  ['Sunrise flight', 'For one', '$245'],
  ['Sunset flight', 'For one', '$225'],
  ['Any flight', 'Sunrise or sunset, their choice', '$260'],
  ['Private for two', 'The whole of Wren', '$690'],
];

const VOUCHER_NOTES = [
  'Valid for two years, and the date is theirs to choose.',
  'Posted in a card tube within two days, or emailed the same day.',
  'Filled in by hand by the pilot, with the name you give us.',
];

type Site = { name: string; wind: string; note: string; meet: string; angle: number };

const SITES: Site[] = [
  { name: 'Halfmoon Farm', wind: 'W and SW winds', note: 'Our home field and the barn. Most flights start here.', meet: 'Halfmoon Lane, Avon Vale', angle: 247 },
  { name: 'Kestrel Down', wind: 'N and NE winds', note: 'High chalk down with a long view up the vale.', meet: 'Down car park, B4012', angle: 22 },
  { name: 'Millbrook Common', wind: 'E and SE winds', note: 'Flat common by the river, five minutes from the lay-by.', meet: 'Mill Road lay-by, Millbrook', angle: 112 },
  { name: 'Stanton Meadows', wind: 'S winds', note: 'Hay meadow behind the church, cut in July.', meet: 'Church Lane, Stanton', angle: 182 },
];

const FAQ = [
  ['How high do we go?', 'Usually between 1,000 and 3,000 feet, and sometimes low enough to talk to people in their gardens. The pilot sets the height by the wind we want.'],
  ['Who can fly?', 'Anyone aged 8 or over and at least 1.2 m tall. Passengers over 110 kg book a roomy compartment for $40 more, so the basket balances.'],
  ['What should I wear?', 'Flat shoes you can walk across a wet field in, trousers, and layers. A hat is good: the burners are warm on the top of your head.'],
  ['Can I fly if I use a wheelchair?', 'On set dates, yes. Our basket Heron has a door and a seat for one passenger. Ring us to plan it together.'],
  ['Where do we land?', 'Wherever the wind puts us, in a field whose farmer knows us. The retrieve crew follows by road and meets us there.'],
  ['I am afraid of heights. Will I cope?', 'Most people who are find the basket calm. There is no drop in your stomach and no wind in your face, because you move with the air.'],
  ['Can I take photographs?', 'Yes, and please do. Use a wrist strap for your phone; anything dropped over the vale stays there.'],
  ['Who are the pilots?', 'Tom Ashdown and Priya Varma, both commercial balloon pilots with over 2,000 hours between them. The balloons are inspected every 100 hours.'],
];

export default function HalfmoonBalloonsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--dawn': '#f7e9da',
        '--ink': '#22223a',
        '--red': '#e0503a',
        '--yellow': '#f2b43b',
        '--blue': '#3e6fb5',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="dawn,ink,red,yellow,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=Marcellus+SC&family=Crimson+Pro:ital,wght@0,400..700;1,400..600&family=Reenie+Beanie&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markGlyph} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Halfmoon</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Balloon Flights</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
          <a data-edit="bar.navBook" data-edit-max="28" className={s.navBook} href="#book">Book a flight</a>
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
          <a data-edit="bar.book" data-edit-max="28" href="#book">Book a flight</a>
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The sky is the lead pattern over a dawn wash, strongest at the
            horizon. Four balloons float in it at their own heights, read
            off the altimeter down the right edge, and the vale runs across
            the bottom with its empty sky letting the pattern through. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,3,0,2,3" className={s.sky} aria-hidden="true">
            <TabbiedPattern
              pattern={thirdstop}
              palette={SKY}
              options={{ frequency: 0.55 }}
              fit="grid"
              cellSize={56}
              seed="halfmoon-dawn-sky"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.altimeter} aria-hidden="true">
            <span data-edit="hero.altLabel" data-edit-max="60" className={s.altLabel}>ALT FT</span>
            <ol className={s.altTicks}>
              {ALTITUDES.map((a, i) => (
                <li data-edit={`hero.item.${i}`} data-edit-max="80" key={a}>{a}</li>
              ))}
            </ol>
          </div>

          <figure className={`${s.flight} ${s.flightA}`}>
            <Artwork
              slug="halfmoon-balloons-balloon"
              alt="A striped hot air balloon with its basket, high over the vale"
              inks={{ red: 'var(--red)', blue: 'var(--blue)', yellow: 'var(--yellow)', black: 'var(--ink)' }}
              className={s.balloon}
            />
            <figcaption data-edit="hero.tag" data-edit-max="120" data-edit-multiline className={s.tag}>G-HMFL</figcaption>
          </figure>
          <figure className={`${s.flight} ${s.flightB}`}>
            <Artwork
              slug="halfmoon-balloons-balloon"
              alt=""
              inks={{ red: 'var(--blue)', blue: 'var(--yellow)', yellow: 'var(--red)', black: 'var(--ink)' }}
              className={s.balloon}
            />
            <figcaption data-edit="hero.tag2" data-edit-max="120" data-edit-multiline className={s.tag}>G-WREN</figcaption>
          </figure>
          <figure className={`${s.flight} ${s.flightC}`}>
            <Artwork
              slug="halfmoon-balloons-balloon"
              alt=""
              inks={{ red: 'var(--yellow)', blue: 'var(--red)', yellow: 'var(--blue)', black: 'var(--ink)' }}
              className={s.balloon}
            />
            <figcaption data-edit="hero.tag3" data-edit-max="120" data-edit-multiline className={s.tag}>G-HERN</figcaption>
          </figure>
          <figure className={`${s.flight} ${s.flightD}`}>
            <Artwork
              slug="halfmoon-balloons-balloon"
              alt=""
              inks={{ red: 'var(--ink)', blue: 'var(--red)', yellow: 'var(--yellow)', black: 'var(--ink)' }}
              className={s.balloon}
            />
          </figure>

          <div className={s.valley} aria-hidden="true">
            <Artwork
              slug="halfmoon-balloons-valley"
              alt=""
              fit="cover"
              inks={{
                red: 'color-mix(in oklab, var(--red) 82%, var(--dawn))',
                blue: 'var(--blue)',
                yellow: 'color-mix(in oklab, var(--yellow) 78%, var(--dawn))',
                black: 'var(--ink)',
              }}
            />
          </div>

          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Hot air balloon flights over Avon Vale</p>
            <h1 id="hero-h" className={s.title}>
              <span data-edit="hero.titleTop" data-edit-max="60" className={s.titleTop}>Halfmoon</span>
              <span data-edit="hero.titleBottom" data-edit-max="60" className={s.titleBottom}>Balloon Flights</span>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              An hour in a wicker basket over the patchwork of Avon Vale, from
              the launch field at Halfmoon Farm. We fly at sunrise and sunset,
              when the air is still, and land wherever the wind agrees to.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book a flight</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#vouchers">Give a flight</a>
            </div>
            <div className={s.today}>
              <p data-edit="hero.todayHead" data-edit-max="240" data-edit-multiline className={s.todayHead}>Today at Halfmoon Farm, Sat 27 Sep</p>
              <ul className={s.todayList}>
                {TODAY.map(([flight, flag, note], i) => (
                  <li key={flight}>
                    <span data-edit={`hero.todayFlight.${i}`} data-edit-max="60" className={s.todayFlight}>{flight}</span>
                    <strong data-edit={`hero.flagGo.${i}`} className={flag === 'GO' ? s.flagGo : s.flagHold}>{flag}</strong>
                    <span data-edit={`hero.todayNote.${i}`} data-edit-max="60" className={s.todayNote}>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- FLIGHTS */}
        <section id="flights" className={s.sec} aria-labelledby="flights-h">
          <div data-edit-pattern="flights.field" data-edit-roles="transparent,2,3,4,2,1" className={s.ribbon} aria-hidden="true">
            <TabbiedPattern
              pattern={bengaline}
              palette={RIBBON}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={34}
              seed="halfmoon-ribbon"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.secHead}>
            <p data-edit="flights.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Log. 01</p>
            <h2 data-edit="flights.secTitle" data-edit-max="60" id="flights-h" className={s.secTitle}>Three ways up</h2>
            <p data-edit="flights.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every flight is about an hour in the air, and the whole outing,
              from the call to the champagne, takes most of a morning or an
              evening. Prices include the toast, the certificate and the ride
              back to the barn.
            </p>
          </div>

          <ul className={s.flights}>
            {FLIGHTS.map((f, i) => (
              <li key={f.name} className={s.leaf}>
                <div className={s.pageHead}>
                  <h3 data-edit={`flights.flightName.${i}`} data-edit-max="40" className={s.flightName}>{f.name}</h3>
                  <p className={s.flightPrice}>
                    <strong data-edit={`flights.emphasis.${i}`}>{f.price}</strong>
                    <span data-edit={`flights.text.${i}`} data-edit-max="60">{f.per}</span>
                  </p>
                </div>
                <dl className={s.lines}>
                  {f.rows.map(([k, v], i2) => (
                    <div key={k}>
                      <dt data-edit={`flights.term.${i}.${i2}`} data-edit-max="28">{k}</dt>
                      <dd data-edit={`flights.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit={`flights.margin.${i}`} data-edit-max="240" data-edit-multiline className={s.margin}>{f.margin}</p>
              </li>
            ))}
          </ul>

          <div className={s.logWrap}>
            <div className={s.logHead}>
              <h3 data-edit="flights.logTitle" data-edit-max="40" className={s.logTitle}>From the pilot&apos;s logbook</h3>
              <p data-edit="flights.logNote" data-edit-max="240" data-edit-multiline className={s.logNote}>The last six entries, copied out as written. One in three mornings is a NO-GO, and we write those down too.</p>
            </div>
            <div className={s.tableScroll}>
              <table className={s.log}>
                <caption data-edit="flights.srOnly" className={s.srOnly}>Recent flights: date, flight, launch site, landing field, time aloft, highest altitude, passengers and remarks</caption>
                <thead>
                  <tr>
                    <th data-edit="flights.heading" scope="col">Date</th>
                    <th data-edit="flights.heading2" scope="col">Flight</th>
                    <th data-edit="flights.heading3" scope="col">Launch</th>
                    <th data-edit="flights.heading4" scope="col">Landing field</th>
                    <th data-edit="flights.heading5" scope="col">Aloft</th>
                    <th data-edit="flights.heading6" scope="col">Max alt.</th>
                    <th data-edit="flights.heading7" scope="col">Pax</th>
                    <th data-edit="flights.heading8" scope="col">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {LOG.map((e, i) => (
                    <tr key={`${e.date}-${e.flight}`} className={e.grounded ? s.grounded : undefined}>
                      <th data-edit={`flights.heading9.${i}`} scope="row">{e.date}</th>
                      <td data-edit={`flights.cell.${i}`}>{e.flight}</td>
                      <td data-edit={`flights.cell2.${i}`}>{e.launch}</td>
                      <td data-edit={`flights.cell3.${i}`}>{e.landing}</td>
                      <td data-edit={`flights.cell4.${i}`}>{e.time}</td>
                      <td data-edit={`flights.cell5.${i}`}>{e.alt}</td>
                      <td data-edit={`flights.cell6.${i}`}>{e.pax}</td>
                      <td data-edit={`flights.remarks.${i}`} className={s.remarks}>{e.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- DAY
            The morning as a flight trace: the profile of altitude against
            the clock, filled with stepped bands, and the stops beneath it. */}
        <section id="day" className={`${s.sec} ${s.daySec}`} aria-labelledby="day-h">
          <div className={s.secHead}>
            <p data-edit="day.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Log. 02</p>
            <h2 data-edit="day.secTitle" data-edit-max="60" id="day-h" className={s.secTitle}>On the day, from the call to the champagne</h2>
            <p data-edit="day.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A sunrise flight in September, minute by minute. Sunset flights
              run the same way, three hours before the sun goes down.
            </p>
          </div>

          <div className={s.trace}>
            <div data-edit-pattern="day.field" data-edit-roles="transparent,4,1,4,3,4" className={s.profile} aria-hidden="true">
              <TabbiedPattern
                pattern={stepramp}
                palette={CLIMB}
                fit="grid"
                cellSize={36}
                seed="halfmoon-trace"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.traceGround} aria-hidden="true" />
            <span data-edit="day.text" data-edit-max="60" className={s.traceTop} aria-hidden="true">Top of climb, 2,650 ft</span>
          </div>

          <ol className={s.stops}>
            {DAY.map((d, i) => (
              <li key={d.time}>
                <p data-edit={`day.stopTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stopTime}>{d.time}</p>
                <h3 data-edit={`day.stopName.${i}`} data-edit-max="40" className={s.stopName}>{d.name}</h3>
                <p data-edit={`day.stopNote.${i}`} data-edit-max="240" data-edit-multiline className={s.stopNote}>{d.note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- WEATHER */}
        <section id="weather" className={s.sec} aria-labelledby="weather-h">
          <div className={s.secHead}>
            <p data-edit="weather.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Log. 03</p>
            <h2 data-edit="weather.secTitle" data-edit-max="60" id="weather-h" className={s.secTitle}>Weather, and rebooking</h2>
            <p data-edit="weather.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A balloon flies only in light, steady wind with a high cloud base.
              The pilot reads the board at 05:00 and decides. It is never a
              close call we make in your favor.
            </p>
          </div>

          <div className={s.weatherGrid}>
            <div className={s.board}>
              <div className={s.boardHead}>
                <div>
                  <p data-edit="weather.boardKicker" data-edit-max="240" data-edit-multiline className={s.boardKicker}>Pilot&apos;s board</p>
                  <h3 data-edit="weather.boardTitle" data-edit-max="40" className={s.boardTitle}>Sunrise, Saturday 27 September</h3>
                </div>
                <p data-edit="weather.boardTime" data-edit-max="240" data-edit-multiline className={s.boardTime}>Read at 05:00</p>
              </div>
              <table className={s.readings}>
                <caption data-edit="weather.srOnly" className={s.srOnly}>Weather limits for flying and this morning&apos;s readings</caption>
                <thead>
                  <tr>
                    <th data-edit="weather.heading" scope="col">Measure</th>
                    <th data-edit="weather.heading2" scope="col">Limit</th>
                    <th data-edit="weather.heading3" scope="col">Now</th>
                    <th data-edit="weather.heading4" scope="col">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {BOARD.map((r, i) => (
                    <tr key={r.measure}>
                      <th data-edit={`weather.heading5.${i}`} scope="row">{r.measure}</th>
                      <td data-edit={`weather.cell.${i}`}>{r.limit}</td>
                      <td data-edit={`weather.now.${i}`} className={s.now}>{r.now}</td>
                      <td>
                        <span data-edit={`weather.pennant.${i}`} data-edit-max="60" className={`${s.pennant} ${s[r.state]}`}>{r.flag}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.decision}>
                <p data-edit="weather.stamp" data-edit-max="240" data-edit-multiline className={s.stamp}>GO</p>
                <p data-edit="weather.decisionNote" data-edit-max="240" data-edit-multiline className={s.decisionNote}>Sunrise flight is on. Meet at the barn at 06:00, lift-off about 06:52. Signed T.A.</p>
              </div>
              <ul className={s.week} aria-label="Outlook for the week">
                {WEEK.map((w, i) => (
                  <li key={w.day}>
                    <span data-edit={`weather.weekDay.${i}`} data-edit-max="60" className={s.weekDay}>{w.day}</span>
                    <span data-edit={`weather.weekFlag.${i}`} data-edit-max="60" className={`${s.weekFlag} ${s[w.state]}`}>{w.flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.rebook}>
              <p data-edit="weather.rebookLead" data-edit-max="240" data-edit-multiline className={s.rebookLead}>About one flight in three is called off. That is ballooning, not bad luck, and nobody loses a ticket to it.</p>
              <dl className={s.rebookList}>
                {REBOOK.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`weather.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`weather.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <dl className={s.season}>
                {SEASON.map(([n, what], i) => (
                  <div key={what}>
                    <dt data-edit={`weather.term2.${i}`} data-edit-max="28">{n}</dt>
                    <dd data-edit={`weather.body2.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- VOUCHERS
            The gift is a certificate: a guilloche border of stacked rings,
            copperplate by hand, and a seal pressed from concentric rings. */}
        <section id="vouchers" className={`${s.sec} ${s.voucherSec}`} aria-labelledby="vouchers-h">
          <div className={s.secHead}>
            <p data-edit="vouchers.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Log. 04</p>
            <h2 data-edit="vouchers.secTitle" data-edit-max="60" id="vouchers-h" className={s.secTitle}>Give someone the sky</h2>
            <p data-edit="vouchers.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A gift voucher is a certificate of flight, filled in by the pilot.
              They choose the morning or evening; we keep an eye on the weather.
            </p>
          </div>

          <div className={s.voucherGrid}>
            <div className={s.cert}>
              <div data-edit-pattern="vouchers.field" data-edit-roles="transparent,2,0,4,3" className={s.guilloche} aria-hidden="true">
                <TabbiedPattern
                  pattern={sunsetrings}
                  palette={GUILLOCHE}
                  fit="grid"
                  cellSize={40}
                  seed="halfmoon-guilloche"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.certInner}>
                <p data-edit="vouchers.certNo" data-edit-max="240" data-edit-multiline className={s.certNo}>No. 2231-S</p>
                <p data-edit="vouchers.certHouse" data-edit-max="240" data-edit-multiline className={s.certHouse}>Halfmoon Balloon Flights</p>
                <h3 data-edit="vouchers.certTitle" data-edit-max="40" className={s.certTitle}>Certificate of Flight</h3>
                <p data-edit="vouchers.certLine" data-edit-max="240" data-edit-multiline className={s.certLine}>This entitles</p>
                <p data-edit="vouchers.certHand" data-edit-max="240" data-edit-multiline className={s.certHand}>Margaret Oyelaran</p>
                <p data-edit="vouchers.certLine2" data-edit-max="240" data-edit-multiline className={s.certLine}>to one sunrise balloon flight from Halfmoon Farm, Avon Vale, on a morning of her choosing, with the toast on landing.</p>
                <div className={s.certFoot}>
                  <p className={s.certSign}>
                    <span data-edit="vouchers.certHandSmall" data-edit-max="60" className={s.certHandSmall}>Sam and the children</span>
                    <span data-edit="vouchers.certRule" data-edit-max="60" className={s.certRule}>Given by</span>
                  </p>
                  <div className={s.seal} aria-hidden="true">
                    <span className={s.sealRibbon} />
                    <span className={s.sealDisc}>
                      <span className={s.sealStar} />
                      <span data-edit="vouchers.sealText" data-edit-max="60" className={s.sealText}>Avon Vale</span>
                    </span>
                  </div>
                  <p className={s.certSign}>
                    <span data-edit="vouchers.certHandSmall2" data-edit-max="60" className={s.certHandSmall}>T. Ashdown</span>
                    <span data-edit="vouchers.certRule2" data-edit-max="60" className={s.certRule}>Pilot in command</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={s.voucherSide}>
              <ul className={s.voucherList}>
                {VOUCHERS.map(([name, note, price], i) => (
                  <li key={name}>
                    <span data-edit={`vouchers.vName.${i}`} data-edit-max="60" className={s.vName}>{name}</span>
                    <span data-edit={`vouchers.vNote.${i}`} data-edit-max="60" className={s.vNote}>{note}</span>
                    <span data-edit={`vouchers.vPrice.${i}`} data-edit-max="60" className={s.vPrice}>{price}</span>
                  </li>
                ))}
              </ul>
              <ul className={s.voucherNotes}>
                {VOUCHER_NOTES.map((n, i) => (
                  <li data-edit={`vouchers.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                ))}
              </ul>
              <a data-edit="vouchers.btn" data-edit-max="28" className={s.btn} href="#book">Order a certificate</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- SITES */}
        <section id="sites" className={s.sec} aria-labelledby="sites-h">
          <div className={s.secHead}>
            <p data-edit="sites.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Log. 05</p>
            <h2 data-edit="sites.secTitle" data-edit-max="60" id="sites-h" className={s.secTitle}>Launch sites, chosen by the wind</h2>
            <p data-edit="sites.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We launch upwind of the vale so the air carries us along it, not
              over the town. The pilot picks the field at 05:00 and the text
              you get tells you which one.
            </p>
          </div>

          <div className={s.sitesGrid}>
            <div className={s.rose} aria-hidden="true">
              <span className={s.roseRing} />
              <span className={s.roseRingInner} />
              <span className={s.roseStar} />
              <span data-edit="sites.cardinal" data-edit-max="60" className={`${s.cardinal} ${s.north}`}>N</span>
              <span data-edit="sites.cardinal2" data-edit-max="60" className={`${s.cardinal} ${s.east}`}>E</span>
              <span data-edit="sites.cardinal3" data-edit-max="60" className={`${s.cardinal} ${s.south}`}>S</span>
              <span data-edit="sites.cardinal4" data-edit-max="60" className={`${s.cardinal} ${s.west}`}>W</span>
              {SITES.map((site, i) => (
                <span key={site.name} className={s.spoke} style={{ '--angle': `${site.angle}deg` } as React.CSSProperties}>
                  <span className={s.spokeDot}>{i + 1}</span>
                </span>
              ))}
              <Artwork
                slug="halfmoon-balloons-balloon"
                alt=""
                inks={{ red: 'var(--red)', blue: 'var(--dawn)', yellow: 'var(--blue)', black: 'var(--ink)' }}
                className={s.roseBalloon}
              />
            </div>

            <ol className={s.sites}>
              {SITES.map((site, i) => (
                <li key={site.name}>
                  <h3 data-edit={`sites.siteName.${i}`} data-edit-max="40" className={s.siteName}>{site.name}</h3>
                  <p data-edit={`sites.siteWind.${i}`} data-edit-max="240" data-edit-multiline className={s.siteWind}>{site.wind}</p>
                  <p data-edit={`sites.siteNote.${i}`} data-edit-max="240" data-edit-multiline className={s.siteNote}>{site.note}</p>
                  <p className={s.siteMeet}>Meet at {site.meet}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p data-edit="faq.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Log. 06</p>
            <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Asked at the barn</h2>
          </div>
          <div className={s.faq}>
            {FAQ.map(([q, a], i) => (
              <details key={q} className={s.qa}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={`${s.sec} ${s.bookSec}`} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <aside className={s.bookSide} aria-labelledby="call-h">
              <div data-edit-pattern="call.field" data-edit-roles="transparent,1,3,2,4,0" className={s.manifestField} aria-hidden="true">
                <TabbiedPattern
                  pattern={thirdstop}
                  palette={MANIFEST}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={44}
                  seed="halfmoon-manifest"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.callCard}>
                <h3 data-edit="call.callTitle" data-edit-max="40" id="call-h" className={s.callTitle}>Or ring the barn</h3>
                <p className={s.callPhone}>
                  <a data-edit="call.link" data-edit-max="28" href="tel:+15550143380">(555) 014-3380</a>
                </p>
                <p data-edit="call.callNote" data-edit-max="240" data-edit-multiline className={s.callNote}>Weekdays 9-5, and from 05:00 on flying mornings.</p>
                <p className={s.callNote}>
                  <a data-edit="call.link2" data-edit-max="28" href="mailto:flights@halfmoonballoons.example">flights@halfmoonballoons.example</a>
                </p>
                <p data-edit="call.callAddress" data-edit-max="240" data-edit-multiline className={s.callAddress}>Halfmoon Farm, Halfmoon Lane, Avon Vale</p>
              </div>
            </aside>

            <form className={s.form} action="#">
              <p data-edit="book.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Log. 07</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Ask for a date</h2>
              <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Tell us who is flying and roughly when. We write back within a day with the dates we have; nothing is charged until one is agreed.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="hb-name">Your name</label>
                  <input id="hb-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="hb-email">Email</label>
                  <input id="hb-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="hb-phone">Mobile, for the 05:30 call</label>
                  <input id="hb-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="hb-flight">Flight</label>
                  <select id="hb-flight" name="flight" defaultValue="sunrise">
                    <option value="sunrise">Sunrise, $245 each</option>
                    <option value="sunset">Sunset, $225 each</option>
                    <option value="private">Private for two, $690</option>
                    <option value="voucher">A gift certificate</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label5" htmlFor="hb-month">Month</label>
                  <select id="hb-month" name="month" defaultValue="oct">
                    <option value="oct">October</option>
                    <option value="apr">April</option>
                    <option value="may">May</option>
                    <option value="jun">June</option>
                    <option value="jul">July</option>
                    <option value="aug">August</option>
                    <option value="sep">September</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label6" htmlFor="hb-pax">Passengers</label>
                  <input id="hb-pax" name="passengers" type="number" min="1" max="12" defaultValue="2" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="book.label7" htmlFor="hb-notes">Anything the pilot should know</label>
                  <textarea id="hb-notes" name="notes" rows={3} />
                </div>
                <div className={`${s.check} ${s.fieldWide}`}>
                  <input id="hb-ok" name="ok" type="checkbox" />
                  <label data-edit="book.label8" htmlFor="hb-ok">Everyone is 8 or over and at least 1.2 m tall</label>
                </div>
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send to the barn</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,3,2,0,3" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={horizonbands}
            palette={HORIZON}
            options={{ frequency: 0.35 }}
            fit="grid"
            cellSize={40}
            seed="halfmoon-horizon"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Halfmoon Balloon Flights</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Halfmoon Farm, Halfmoon Lane, Avon Vale</p>
            <p>
              <a data-edit="footer.link" data-edit-max="28" href="tel:+15550143380">(555) 014-3380</a>
            </p>
          </div>
          <ul className={s.footNav}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link2.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <div className={s.footFine}>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional balloon company; the pilots, flights, fields and prices are invented.</p>
            <p>
              Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The balloons and the vale are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
