import { TabbiedPattern } from 'tabbied/react';
import { strand, dotwash, wavelet, contourlines, ribline } from 'tabbied/patterns';
import s from './tidewater-paddle.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Tidewater Paddle Co.: Kayak and paddleboard hire, Heron Reach',
  description:
    'Kayaks and paddleboards for hire from the boathouse at Heron Reach, on the Saltings estuary. Five routes keyed to the tide, the week\'s tide table, guided dawn and full-moon paddles, and online booking.',
};

/* Site colors: the chart paper, the ink the chart is printed in, the buoy
   red of the channel marks and the tint of the shallows. The same hexes as
   the root rule in the stylesheet. */
const CHART = '#f2eedf';
const NAVY = '#14294a';
const BUOY = '#d9482f';
const SHALLOWS = '#71b8b0';

/* The sandbars: slabs of shallows with the odd channel mark, over the paper. */
const BARS = ['transparent', SHALLOWS, NAVY, SHALLOWS, SHALLOWS, BUOY];
/* The water on the illustrated chart: a stipple wash under the picture. */
const STIPPLE = ['transparent', NAVY, SHALLOWS, NAVY, SHALLOWS, SHALLOWS];
/* The swell along the tide table and the foot of the page. */
const SWELL = [NAVY, SHALLOWS, CHART, SHALLOWS, CHART, BUOY];
/* Depth contours round the full moon. */
const RINGS = ['transparent', CHART, SHALLOWS, BUOY];
/* The woven lashings on the launch notes. */
const LASHING = ['transparent', SHALLOWS, NAVY, SHALLOWS, SHALLOWS, BUOY];

const DEG = '\u00B0';

const NAV = [
  ['Routes', '#routes'],
  ['Fleet', '#fleet'],
  ['Tides', '#tides'],
  ['Guided trips', '#trips'],
  ['Before you launch', '#launch'],
  ['Book', '#book'],
  ['Visit', '#visit'],
];

/* Soundings: depths in metres at chart datum, set small and italic in the
   margins the way a chart scatters them over open water. */
type Sounding = { m: string; d: string; x: string; y: string };

const HERO_SOUNDINGS: Sounding[] = [
  { m: '2', d: '4', x: '3%', y: '18%' },
  { m: '0', d: '8', x: '5.5%', y: '46%' },
  { m: '3', d: '1', x: '2.6%', y: '72%' },
  { m: '1', d: '6', x: '95%', y: '24%' },
  { m: '4', d: '2', x: '96.4%', y: '58%' },
  { m: '2', d: '9', x: '94.2%', y: '84%' },
];

const PLATE_SOUNDINGS: Sounding[] = [
  { m: '1', d: '2', x: '12%', y: '16%' },
  { m: '0', d: '6', x: '31%', y: '38%' },
  { m: '2', d: '7', x: '58%', y: '12%' },
  { m: '3', d: '4', x: '78%', y: '30%' },
  { m: '0', d: '4', x: '20%', y: '66%' },
  { m: '5', d: '1', x: '52%', y: '58%' },
  { m: '1', d: '9', x: '86%', y: '8%' },
];

const MARGIN_SOUNDINGS: Sounding[] = [
  { m: '6', d: '3', x: '2.8%', y: '12%' },
  { m: '4', d: '8', x: '5%', y: '38%' },
  { m: '7', d: '0', x: '3.2%', y: '64%' },
  { m: '3', d: '5', x: '95.6%', y: '20%' },
  { m: '5', d: '2', x: '94%', y: '52%' },
  { m: '8', d: '1', x: '96.2%', y: '82%' },
];

const HERO_FACTS = [
  ['Open daily', '08:00-19:00'],
  ['High water', '09:10, 21:33'],
  ['Hire from', '$18 an hour'],
];

type Route = {
  n: string;
  name: string;
  km: string;
  time: string;
  tide: string;
  level: string;
  note: string;
  x: string;
  y: string;
};

const ROUTES: Route[] = [
  {
    n: '1',
    name: 'Boathouse Creek',
    km: '3.2 km',
    time: '1-1.5 h',
    tide: 'Any state but the last hour of the ebb',
    level: 'First time',
    note: 'A sheltered loop behind the jetty with reed beds on both banks. Where we teach.',
    x: '69%',
    y: '56%',
  },
  {
    n: '2',
    name: 'Samphire Channel',
    km: '6.8 km',
    time: '2-3 h',
    tide: 'Out 2 h before high water, home on the first of the ebb',
    level: 'Easy',
    note: 'Up the main channel between the marsh islands to the old sluice, and back with the tide.',
    x: '46%',
    y: '71%',
  },
  {
    n: '3',
    name: 'Round the Middle Ground',
    km: '5.5 km',
    time: '2 h',
    tide: 'High water, plus or minus 2 h. Dries at low water',
    level: 'Easy',
    note: 'A lap of the big island. Common seals haul out on its north side from September.',
    x: '40%',
    y: '50%',
  },
  {
    n: '4',
    name: 'Godwit Spit',
    km: '9.4 km',
    time: '3-4 h',
    tide: 'Out on the last of the flood, home on the ebb',
    level: 'Moderate',
    note: 'Out to the dunes for a picnic on the spit. Some open water, and only in winds under 12 knots.',
    x: '86%',
    y: '36%',
  },
  {
    n: '5',
    name: 'Saltings Bar',
    km: '12 km',
    time: '4-5 h',
    tide: 'Across at slack high water only',
    level: 'Guided',
    note: 'Over the bar to the open coast. With a guide, or with a sea-kayak record we have seen.',
    x: '12%',
    y: '42%',
  },
];

type Craft = {
  no: string;
  name: string;
  kind: string;
  spec: string;
  hour: string;
  half: string;
  day: string;
  inks: Record<string, string>;
  alt: string;
};

/* The fleet is one drawing in four colorways: the hull, the seat and blades,
   and the shaft and deck lines take a different role on each boat. */
const KAYAKS: Craft[] = [
  {
    no: 'No. 1',
    name: 'Curlew',
    kind: 'Single sit-in kayak',
    spec: '4.3 m, one paddler, a dry hatch fore and aft',
    hour: '$22',
    half: '$48',
    day: '$70',
    inks: { red: 'var(--navy)', blue: 'var(--buoy)', black: 'var(--text)' },
    alt: 'Curlew: a single kayak with a dark hull and red paddle blades',
  },
  {
    no: 'No. 2',
    name: 'Godwit',
    kind: 'Tandem kayak',
    spec: '5.2 m, two paddlers and a child between them',
    hour: '$34',
    half: '$72',
    day: '$105',
    inks: { red: 'var(--buoy)', blue: 'var(--navy)', black: 'var(--text)' },
    alt: 'Godwit: a tandem kayak with a red hull and dark paddle blades',
  },
  {
    no: 'No. 3',
    name: 'Knot',
    kind: 'Sit-on-top kayak',
    spec: '3.7 m, self-draining, for swimmers and small dogs',
    hour: '$20',
    half: '$44',
    day: '$64',
    inks: { red: 'var(--shallows)', blue: 'var(--buoy)', black: 'var(--navy)' },
    alt: 'Knot: a sit-on-top kayak with a pale green hull and red paddle blades',
  },
];

const INCLUDED = [
  'Buoyancy aid, fitted on the jetty',
  'Paddle, whistle and a 10 litre dry bag',
  'A waterproof tide card for the day',
  'Wetsuits and spray decks, $8 extra',
];

type Tide = { k: 'HW' | 'LW'; t: string; h: string; best?: boolean };
type TideDay = { day: string; date: string; today?: boolean; tides: Tide[]; window: string };

const WEEK: TideDay[] = [
  {
    day: 'Sun',
    date: '27 Sep',
    today: true,
    tides: [
      { k: 'LW', t: '02:56', h: '1.0' },
      { k: 'HW', t: '09:10', h: '4.0', best: true },
      { k: 'LW', t: '15:18', h: '1.2' },
      { k: 'HW', t: '21:33', h: '4.1' },
    ],
    window: '07:10-11:10',
  },
  {
    day: 'Mon',
    date: '28 Sep',
    tides: [
      { k: 'LW', t: '03:44', h: '0.9' },
      { k: 'HW', t: '09:58', h: '4.1', best: true },
      { k: 'LW', t: '16:06', h: '1.1' },
      { k: 'HW', t: '22:21', h: '4.2' },
    ],
    window: '07:58-11:58',
  },
  {
    day: 'Tue',
    date: '29 Sep',
    tides: [
      { k: 'LW', t: '04:32', h: '0.8' },
      { k: 'HW', t: '10:46', h: '4.2', best: true },
      { k: 'LW', t: '16:55', h: '1.0' },
      { k: 'HW', t: '23:09', h: '4.3' },
    ],
    window: '08:46-12:46',
  },
  {
    day: 'Wed',
    date: '30 Sep',
    tides: [
      { k: 'LW', t: '05:19', h: '0.7' },
      { k: 'HW', t: '11:33', h: '4.3', best: true },
      { k: 'LW', t: '17:43', h: '0.9' },
      { k: 'HW', t: '23:56', h: '4.4' },
    ],
    window: '09:33-13:33',
  },
  {
    day: 'Thu',
    date: '1 Oct',
    tides: [
      { k: 'LW', t: '06:05', h: '0.6' },
      { k: 'HW', t: '12:19', h: '4.4', best: true },
      { k: 'LW', t: '18:30', h: '0.8' },
      { k: 'HW', t: '00:43', h: '4.4' },
    ],
    window: '10:19-14:19',
  },
  {
    day: 'Fri',
    date: '2 Oct',
    tides: [
      { k: 'HW', t: '01:29', h: '4.5' },
      { k: 'LW', t: '07:37', h: '0.5' },
      { k: 'HW', t: '13:50', h: '4.6', best: true },
      { k: 'LW', t: '20:02', h: '0.6' },
    ],
    window: '11:50-15:50',
  },
  {
    day: 'Sat',
    date: '3 Oct',
    tides: [
      { k: 'HW', t: '02:14', h: '4.5' },
      { k: 'LW', t: '08:22', h: '0.5' },
      { k: 'HW', t: '14:35', h: '4.6', best: true },
      { k: 'LW', t: '20:47', h: '0.6' },
    ],
    window: '12:35-16:35',
  },
];

/* Today's curve, drawn from the day's own four tides: a cosine through
   high water at 09:10, 40 px to the hour and 45 px to the metre. */
const HOUR = 40;
const METRE = 45;
const FLOOR = 238;
const level = (t: number) => 2.55 + 1.5 * Math.cos((2 * Math.PI * (t - 9.17)) / 12.42);
const CURVE = Array.from({ length: 97 }, (_, i) => {
  const t = i / 4;
  return `${i ? 'L' : 'M'}${(t * HOUR).toFixed(1)} ${(FLOOR - level(t) * METRE).toFixed(1)}`;
}).join(' ');
const CURVE_FILL = `${CURVE} L960 ${FLOOR} L0 ${FLOOR} Z`;
const HOURS_AXIS = [0, 3, 6, 9, 12, 15, 18, 21, 24];
const METRES_AXIS = [0, 1, 2, 3, 4, 5];

const CURVE_MARKS = [
  { k: 'LW', t: '02:56', h: '1.0 m', at: 2.93 },
  { k: 'HW', t: '09:10', h: '4.0 m', at: 9.17 },
  { k: 'LW', t: '15:18', h: '1.2 m', at: 15.3 },
  { k: 'HW', t: '21:33', h: '4.1 m', at: 21.55 },
];

const READING = [
  ['HW, LW', 'High and low water, in 24-hour local time.'],
  ['Heights', 'In metres above chart datum. Under 1.2 m the creeks empty and the mud shows.'],
  ['Best window', 'Two hours either side of a daylight high water, when every route has water under it.'],
  ['Springs', 'Friday and Saturday: the biggest tides of the month, so the ebb runs hard. Stay inside the bar.'],
];

type Trip = {
  name: string;
  when: string;
  length: string;
  price: string;
  group: string;
  next: string;
  body: string;
  kind: 'dawn' | 'moon' | 'birds';
};

const TRIPS: Trip[] = [
  {
    name: 'Dawn paddle',
    when: 'Saturdays at 06:45',
    length: '2 hours',
    price: '$55',
    group: 'Up to 8, ages 12 and up',
    next: 'Next: Sat 3 Oct, Sat 10 Oct',
    body: 'Out on the still water before the wind gets up, as the waders come in to roost. Coffee and cardamom buns on the jetty after.',
    kind: 'dawn',
  },
  {
    name: 'Full-moon paddle',
    when: 'The night of each full moon, 19:30',
    length: '2.5 hours',
    price: '$65',
    group: 'Up to 10, ages 14 and up',
    next: 'Next: Mon 26 Oct',
    body: 'Lit boats in a line behind a guide, up Samphire Channel with the moon coming off the dunes. A second guide sweeps at the back.',
    kind: 'moon',
  },
  {
    name: 'Birding with a naturalist',
    when: 'Wednesdays, September to March, 10:00',
    length: '3 hours',
    price: '$70',
    group: 'Up to 6, binoculars lent',
    next: 'Next: Wed 30 Sep',
    body: 'Ruth Amberley of the Saltings Bird Trust takes you quietly in among the islands: brent geese, curlew, redshank and, most winters, a hen harrier.',
    kind: 'birds',
  },
];

const BRING = [
  'Clothes that can get wet, and not cotton',
  'A warm layer, even in August',
  'Shoes that stay on: no flip-flops',
  'Water, a snack and sun cream',
  'Your phone goes in the dry bag we give you',
];

const BRIEFING = [
  'Fifteen minutes on the jetty before every hire',
  'A capsize drill in the creek for first-timers',
  'How to read the tide board and the flags',
  'Where not to go: the sluice gates at low water',
  'Call the boathouse on VHF 72 or (555) 014-3380',
];

const RULES = [
  'Under 16s paddle with an adult; under 8s ride in a tandem',
  'Everyone wears the buoyancy aid, all the time',
  'You can swim 50 m in clothes',
  'Nothing to drink before you go out',
  'Last boats back two hours before sunset',
];

const FLAGS = [
  { flag: 'shallows', name: 'Open', body: 'All craft, all five routes.' },
  { flag: 'navy', name: 'Sheltered water only', body: 'Routes 1 to 3. Wind 12 to 18 knots.' },
  { flag: 'buoy', name: 'Water closed', body: 'Wind over 18 knots, fog, or lightning within 10 miles.' },
];

const HOURS = [
  ['Apr to Oct', 'Daily 08:00-19:00'],
  ['Last boats out', '17:00'],
  ['Nov to Mar', 'Sat, Sun 09:00-16:00'],
  ['Closed', '24-26 December'],
];

const GETTING_HERE = [
  ['By bus', 'The 37 from Marram Bay station to Heron Reach Turn, then ten minutes along the sea wall.'],
  ['By car', 'Pay and display at Beacon Hill, $4 a day, 400 m from the boathouse. Roof racks unload at the gate.'],
  ['By bike', 'Racks under the boathouse stairs, and a hose for the salt.'],
];

export default function TidewaterPaddlePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--chart': '#f2eedf',
        '--navy': '#14294a',
        '--buoy': '#d9482f',
        '--shallows': '#71b8b0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="chart,navy,buoy,shallows"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=IM+Fell+English:ital@1&family=Libre+Caslon+Text&family=Sofia+Sans+Semi+Condensed:wght@400..800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Tidewater Paddle Co.</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Heron Reach</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>HW 09:10, 4.0 m</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.sheet}>
        {/* ------------------------------------------------------------ HERO
            The chart's title block beside its plate: the sandbars of the
            Saltings, a compass rose and the soundings. */}
        <section className={s.hero} aria-labelledby="tp-hero-h">
          <div className={s.margin} aria-hidden="true">
            {HERO_SOUNDINGS.map((d) => (
              <span key={`${d.x}${d.y}`} className={s.snd} style={{ left: d.x, top: d.y }}>
                {d.m}<sub>{d.d}</sub>
              </span>
            ))}
          </div>

          <div className={s.cartouche}>
            <p data-edit="tpHero.chartNo" data-edit-max="240" data-edit-multiline className={s.chartNo}>Chart TP 1: The Saltings estuary</p>
            <h1 data-edit="tpHero.title" data-edit-max="70" id="tp-hero-h" className={s.title}>Tidewater Paddle Co.</h1>
            <p data-edit="tpHero.trade" data-edit-max="240" data-edit-multiline className={s.trade}>Kayak &amp; paddleboard hire</p>
            <p data-edit="tpHero.place" data-edit-max="240" data-edit-multiline className={s.place}>The Boathouse, Heron Reach</p>
            <p data-edit="tpHero.scale" data-edit-max="240" data-edit-multiline className={s.scale}>Natural scale 1:12,500. Soundings in metres, reduced to chart datum.</p>
            <p data-edit="tpHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Sit-in, tandem and sit-on-top kayaks and a rack of paddleboards,
              launched from our own jetty on the quietest estuary on the coast.
              Five routes keyed to the tide, a briefing before every hire, and
              the kettle on when you come back.
            </p>
            <p className={s.ctas}>
              <a data-edit="tpHero.btn" data-edit-max="28" className={s.btn} href="#book">Book a boat</a>
              <a data-edit="tpHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#tides">This week&apos;s tides</a>
            </p>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`tpHero.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`tpHero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className={s.plate}>
            <div data-edit-pattern="tpHero.field" data-edit-roles="transparent,3,1,3,3,2" className={s.plateField} aria-hidden="true">
              <TabbiedPattern
                pattern={strand}
                palette={BARS}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={44}
                seed="tidewater-saltings-bars"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.plateMarks} aria-hidden="true">
              {PLATE_SOUNDINGS.map((d) => (
                <span key={`${d.x}${d.y}`} className={s.snd} style={{ left: d.x, top: d.y }}>
                  {d.m}<sub>{d.d}</sub>
                </span>
              ))}
              <span data-edit="tpHero.placeName" data-edit-max="60" className={`${s.placeName} ${s.pnSaltings}`}>The Saltings</span>
              <span data-edit="tpHero.placeName2" data-edit-max="60" className={`${s.placeName} ${s.pnReach}`}>Heron Reach</span>
              <span data-edit="tpHero.placeName3" data-edit-max="60" className={`${s.placeName} ${s.pnBar}`}>Saltings Bar (dries)</span>
              <span className={`${s.lat} ${s.latTop}`}>{`51${DEG}44'N`}</span>
              <span className={`${s.lat} ${s.latBottom}`}>{`51${DEG}42'N`}</span>
              <span className={`${s.lon} ${s.lonLeft}`}>{`1${DEG}01'E`}</span>
              <span className={`${s.lon} ${s.lonRight}`}>{`1${DEG}04'E`}</span>
            </div>
            <div className={s.rose} aria-hidden="true">
              <span className={s.roseRing} />
              <span className={s.roseStar} />
              <span className={s.roseStar2} />
              <span className={s.roseHub} />
              <span data-edit="tpHero.roseN" data-edit-max="60" className={s.roseN}>N</span>
            </div>
            <figcaption className={s.plateCap}>{`Variation 1${DEG}15'W (2026), decreasing 8' a year.`}</figcaption>
          </figure>
        </section>

        {/* ---------------------------------------------------------- ROUTES
            The illustrated chart: the estuary from Beacon Hill with the
            launch points pinned on it, each keyed to a route beside it. */}
        <section id="routes" className={s.sec} aria-labelledby="tp-routes-h">
          <div className={s.secHead}>
            <p data-edit="routes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Sheet 2</p>
            <h2 data-edit="routes.title" data-edit-max="60" id="tp-routes-h">Five routes, keyed to the tide</h2>
            <p data-edit="routes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every route starts at the jetty. The numbers on the chart are
              where each one turns for home; ask at the hut which is running
              best today.
            </p>
          </div>

          <div className={s.routeGrid}>
            <figure className={s.estuary}>
              <div className={s.estuaryFrame}>
                <div className={s.estuaryPic}>
                  <div data-edit-pattern="routes.field" data-edit-roles="transparent,1,3,1,3,3" className={s.water} aria-hidden="true">
                    <TabbiedPattern
                      pattern={dotwash}
                      palette={STIPPLE}
                      fit="grid"
                      cellSize={30}
                      seed="tidewater-water"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <Artwork
                    slug="tidewater-paddle-estuary"
                    alt="The Saltings estuary from Beacon Hill: marsh islands in a winding tidal channel, the boathouse on its jetty, reed beds and a line of dunes"
                    inks={{ yellow: 'var(--shallows)', black: 'var(--navy)', red: 'var(--buoy)' }}
                    className={s.estuaryArt}
                  />
                  {ROUTES.map((r, i) => (
                    <span key={r.n} className={s.pin} style={{ left: r.x, top: r.y }} aria-hidden="true">
                      <span data-edit={`routes.pinNo.${i}`} data-edit-max="60" className={s.pinNo}>{r.n}</span>
                    </span>
                  ))}
                  <p data-edit="routes.body" data-edit-max="240" data-edit-multiline className={s.skyLabel} aria-hidden="true">Heron Reach from Beacon Hill</p>
                </div>
              </div>
              <figcaption data-edit="routes.estuaryCap" data-edit-max="120" data-edit-multiline className={s.estuaryCap}>
                The pins mark each route&apos;s turning point. Launch from the
                jetty below the red-roofed boathouse.
              </figcaption>
            </figure>

            <ol className={s.routes}>
              {ROUTES.map((r, i) => (
                <li key={r.n} className={s.route}>
                  <span className={s.routeNo} aria-hidden="true">{r.n}</span>
                  <div className={s.routeBody}>
                    <h3 data-edit={`routes.title2.${i}`} data-edit-max="40">{r.name}</h3>
                    <p data-edit={`routes.routeNote.${i}`} data-edit-max="240" data-edit-multiline className={s.routeNote}>{r.note}</p>
                    <dl className={s.routeStats}>
                      <div>
                        <dt data-edit={`routes.term.${i}`} data-edit-max="28">Distance</dt>
                        <dd data-edit={`routes.body.${i}`} data-edit-max="200" data-edit-multiline>{r.km}</dd>
                      </div>
                      <div>
                        <dt data-edit={`routes.term2.${i}`} data-edit-max="28">Time</dt>
                        <dd data-edit={`routes.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.time}</dd>
                      </div>
                      <div>
                        <dt data-edit={`routes.term3.${i}`} data-edit-max="28">Level</dt>
                        <dd data-edit={`routes.body3.${i}`} data-edit-max="200" data-edit-multiline>{r.level}</dd>
                      </div>
                      <div className={s.routeTide}>
                        <dt data-edit={`routes.term4.${i}`} data-edit-max="28">Tide</dt>
                        <dd data-edit={`routes.body4.${i}`} data-edit-max="200" data-edit-multiline>{r.tide}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- FLEET
            The rack by the boathouse door: one kayak drawn four ways. */}
        <section id="fleet" className={s.sec} aria-labelledby="tp-fleet-h">
          <div className={s.margin} aria-hidden="true">
            {MARGIN_SOUNDINGS.map((d) => (
              <span key={`${d.x}${d.y}`} className={s.snd} style={{ left: d.x, top: d.y }}>
                {d.m}<sub>{d.d}</sub>
              </span>
            ))}
          </div>
          <div className={s.secHead}>
            <p data-edit="fleet.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Sheet 3</p>
            <h2 data-edit="fleet.title" data-edit-max="60" id="tp-fleet-h">The fleet on the rack</h2>
            <p data-edit="fleet.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every boat is named for a wader of the Saltings and painted so
              you can pick yours out from the far bank. Prices are per boat.
            </p>
          </div>

          <div className={s.rack}>
            <span className={s.post} aria-hidden="true" />
            <span className={`${s.post} ${s.postRight}`} aria-hidden="true" />
            <ul className={s.boats}>
              {KAYAKS.map((k, i) => (
                <li key={k.name} className={s.boat}>
                  <div className={s.boatPic}>
                    <Artwork slug="tidewater-paddle-kayak" alt={k.alt} inks={k.inks} className={s.kayak} />
                    <span className={s.arm} aria-hidden="true" />
                    <span className={`${s.arm} ${s.armRight}`} aria-hidden="true" />
                  </div>
                  <div className={s.tag}>
                    <p data-edit={`fleet.tagNo.${i}`} data-edit-max="240" data-edit-multiline className={s.tagNo}>{k.no}</p>
                    <h3 data-edit={`fleet.boatName.${i}`} data-edit-max="40" className={s.boatName}>{k.name}</h3>
                    <p data-edit={`fleet.boatKind.${i}`} data-edit-max="240" data-edit-multiline className={s.boatKind}>{k.kind}</p>
                    <p data-edit={`fleet.boatSpec.${i}`} data-edit-max="240" data-edit-multiline className={s.boatSpec}>{k.spec}</p>
                    <dl className={s.tariff}>
                      <div>
                        <dt data-edit={`fleet.term.${i}`} data-edit-max="28">1 hour</dt>
                        <dd data-edit={`fleet.body.${i}`} data-edit-max="200" data-edit-multiline>{k.hour}</dd>
                      </div>
                      <div>
                        <dt data-edit={`fleet.term2.${i}`} data-edit-max="28">Half day</dt>
                        <dd data-edit={`fleet.body2.${i}`} data-edit-max="200" data-edit-multiline>{k.half}</dd>
                      </div>
                      <div>
                        <dt data-edit={`fleet.term3.${i}`} data-edit-max="28">Day</dt>
                        <dd data-edit={`fleet.body3.${i}`} data-edit-max="200" data-edit-multiline>{k.day}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
              <li className={`${s.boat} ${s.boatBoard}`}>
                <div className={s.boatPic}>
                  <span className={s.board} aria-hidden="true">
                    <span className={s.boardPad} />
                    <span className={s.boardFin} />
                  </span>
                  <span className={s.arm} aria-hidden="true" />
                  <span className={`${s.arm} ${s.armRight}`} aria-hidden="true" />
                </div>
                <div className={s.tag}>
                  <p data-edit="fleet.tagNo2" data-edit-max="240" data-edit-multiline className={s.tagNo}>No. 4</p>
                  <h3 data-edit="fleet.boatName2" data-edit-max="40" className={s.boatName}>Sanderling</h3>
                  <p data-edit="fleet.boatKind2" data-edit-max="240" data-edit-multiline className={s.boatKind}>Stand-up paddleboard</p>
                  <p data-edit="fleet.boatSpec2" data-edit-max="240" data-edit-multiline className={s.boatSpec}>3.2 m inflatable, wide and steady, leash and kneeling pad</p>
                  <dl className={s.tariff}>
                    <div>
                      <dt data-edit="fleet.term4" data-edit-max="28">1 hour</dt>
                      <dd data-edit="fleet.body4" data-edit-max="200" data-edit-multiline>$18</dd>
                    </div>
                    <div>
                      <dt data-edit="fleet.term5" data-edit-max="28">Half day</dt>
                      <dd data-edit="fleet.body5" data-edit-max="200" data-edit-multiline>$40</dd>
                    </div>
                    <div>
                      <dt data-edit="fleet.term6" data-edit-max="28">Day</dt>
                      <dd data-edit="fleet.body6" data-edit-max="200" data-edit-multiline>$58</dd>
                    </div>
                  </dl>
                </div>
              </li>
            </ul>
          </div>

          <div className={s.included}>
            <h3 data-edit="fleet.includedTitle" data-edit-max="40" className={s.includedTitle}>With every boat</h3>
            <ul>
              {INCLUDED.map((item, i) => (
                <li data-edit={`fleet.item.${i}`} data-edit-max="80" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- TIDES
            The almanac: today's curve, then the week. */}
        <section id="tides" className={`${s.sec} ${s.tidesSec}`} aria-labelledby="tp-tides-h">
          <div data-edit-pattern="tides.field" data-edit-roles="1,3,0,3,0,2" className={s.swell} aria-hidden="true">
            <TabbiedPattern
              pattern={wavelet}
              palette={SWELL}
              fit="grid"
              cellSize={32}
              seed="tidewater-swell"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.secHead}>
            <p data-edit="tides.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Sheet 4</p>
            <h2 data-edit="tides.title" data-edit-max="60" id="tp-tides-h">Tides this week at Heron Reach</h2>
            <p data-edit="tides.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Predicted times for the boathouse jetty. Wind and pressure move
              them by twenty minutes either way, so we chalk the real ones on
              the board by the hut each morning.
            </p>
          </div>

          <div className={s.today}>
            <figure className={s.curveFig}>
              <figcaption className={s.curveCap}>
                <span data-edit="tides.curveDay" data-edit-max="60" className={s.curveDay}>Today, Sunday 27 September</span>
                <span data-edit="tides.curveKey" data-edit-max="60" className={s.curveKey}>Best window 07:10-11:10</span>
              </figcaption>
              <div className={s.curveScroll}>
                <svg className={s.curve} viewBox="-44 -14 1020 290" role="img" aria-label="Today's tide curve: low water 02:56, high water 09:10, low water 15:18, high water 21:33">
                  <rect className={s.night} x="0" y="0" width={6.97 * HOUR} height={FLOOR} />
                  <rect className={s.night} x={18.73 * HOUR} y="0" width={(24 - 18.73) * HOUR} height={FLOOR} />
                  <rect className={s.window} x={7.17 * HOUR} y="0" width={4 * HOUR} height={FLOOR} />
                  {METRES_AXIS.map((m) => (
                    <g key={m}>
                      <line className={s.gridLine} x1="0" x2="960" y1={FLOOR - m * METRE} y2={FLOOR - m * METRE} />
                      <text className={s.axisText} x="-12" y={FLOOR - m * METRE + 5} textAnchor="end">{`${m} m`}</text>
                    </g>
                  ))}
                  {HOURS_AXIS.map((h) => (
                    <g key={h}>
                      <line className={s.tick} x1={h * HOUR} x2={h * HOUR} y1={FLOOR} y2={FLOOR + 8} />
                      <text className={s.axisText} x={h * HOUR} y={FLOOR + 28} textAnchor="middle">{String(h).padStart(2, '0')}</text>
                    </g>
                  ))}
                  <path className={s.curveArea} d={CURVE_FILL} />
                  <path className={s.curveLine} d={CURVE} />
                  {CURVE_MARKS.map((c) => (
                    <g key={c.t}>
                      <circle className={s.curveDot} cx={c.at * HOUR} cy={FLOOR - level(c.at) * METRE} r="6" />
                      <text
                        className={s.curveLabel}
                        x={c.at * HOUR}
                        y={FLOOR - level(c.at) * METRE + (c.k === 'HW' ? -16 : 26)}
                        textAnchor="middle">
                        {`${c.k} ${c.t}, ${c.h}`}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <p data-edit="tides.curveNote" data-edit-max="240" data-edit-multiline className={s.curveNote}>Shaded ends: before sunrise at 06:58 and after sunset at 18:44.</p>
            </figure>

            <dl className={s.reading}>
              {READING.map(([term, body], i) => (
                <div key={term}>
                  <dt data-edit={`tides.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`tides.body.${i}`} data-edit-max="200" data-edit-multiline>{body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.tableWrap}>
            <table className={s.tides}>
              <caption data-edit="tides.srOnly" className={s.srOnly}>High and low water at Heron Reach for the week, with the best paddling window each day</caption>
              <thead>
                <tr>
                  <th data-edit="tides.heading" scope="col">Day</th>
                  <th data-edit="tides.heading2" scope="col">1st</th>
                  <th data-edit="tides.heading3" scope="col">2nd</th>
                  <th data-edit="tides.heading4" scope="col">3rd</th>
                  <th data-edit="tides.heading5" scope="col">4th</th>
                  <th data-edit="tides.heading6" scope="col">Best window</th>
                </tr>
              </thead>
              <tbody>
                {WEEK.map((d, i) => (
                  <tr key={d.date} className={d.today ? s.isToday : undefined}>
                    <th scope="row">
                      <span data-edit={`tides.tDay.${i}`} data-edit-max="60" className={s.tDay}>{d.day}</span>
                      <span data-edit={`tides.tDate.${i}`} data-edit-max="60" className={s.tDate}>{d.date}</span>
                    </th>
                    {d.tides.map((t, i2) => (
                      <td key={`${d.date}${t.t}`} className={t.best ? s.tBest : undefined}>
                        <span data-edit={`tides.tKind.${i}.${i2}`} data-edit-max="60" className={s.tKind}>{t.k}</span>
                        <span data-edit={`tides.tTime.${i}.${i2}`} data-edit-max="60" className={s.tTime}>{t.t}</span>
                        <span data-edit={`tides.tHeight.${i}.${i2}`} data-edit-max="60" className={s.tHeight}>{t.h}</span>
                      </td>
                    ))}
                    <td data-edit={`tides.tWindow.${i}`} className={s.tWindow}>{d.window}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------------------------------------- TRIPS */}
        <section id="trips" className={s.sec} aria-labelledby="tp-trips-h">
          <div className={s.secHead}>
            <p data-edit="trips.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Sheet 5</p>
            <h2 data-edit="trips.title" data-edit-max="60" id="tp-trips-h">Guided trips</h2>
            <p data-edit="trips.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              With one of our four guides, all of them sea-kayak leaders and
              all of them locals. Boats, kit and a hot drink included.
            </p>
          </div>
          <ul className={s.trips}>
            {TRIPS.map((t, i) => (
              <li key={t.name} className={s.trip}>
                <div className={`${s.inset} ${s[t.kind]}`} aria-hidden="true">
                  {t.kind === 'moon' ? (
                    <span data-edit-pattern={`trips.field.${i}`} data-edit-roles="transparent,0,3,2" className={s.moonField}>
                      <TabbiedPattern
                        pattern={contourlines}
                        palette={RINGS}
                        options={{ frequency: 0.35 }}
                        fit="grid"
                        cellSize={24}
                        seed="tidewater-moon"
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </span>
                  ) : (
                    <span className={s.insetMark} />
                  )}
                </div>
                <div className={s.tripBody}>
                  <h3 data-edit={`trips.title2.${i}`} data-edit-max="40">{t.name}</h3>
                  <p data-edit={`trips.tripWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.tripWhen}>{t.when}</p>
                  <p data-edit={`trips.tripText.${i}`} data-edit-max="240" data-edit-multiline className={s.tripText}>{t.body}</p>
                  <dl className={s.tripFacts}>
                    <div>
                      <dt data-edit={`trips.term.${i}`} data-edit-max="28">Length</dt>
                      <dd data-edit={`trips.body.${i}`} data-edit-max="200" data-edit-multiline>{t.length}</dd>
                    </div>
                    <div>
                      <dt data-edit={`trips.term2.${i}`} data-edit-max="28">Price</dt>
                      <dd data-edit={`trips.body2.${i}`} data-edit-max="200" data-edit-multiline>{t.price}</dd>
                    </div>
                    <div>
                      <dt data-edit={`trips.term3.${i}`} data-edit-max="28">Group</dt>
                      <dd data-edit={`trips.body3.${i}`} data-edit-max="200" data-edit-multiline>{t.group}</dd>
                    </div>
                  </dl>
                  <p data-edit={`trips.tripNext.${i}`} data-edit-max="240" data-edit-multiline className={s.tripNext}>{t.next}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- LAUNCH
            The chart's notes and cautions. */}
        <section id="launch" className={s.sec} aria-labelledby="tp-launch-h">
          <div className={s.secHead}>
            <p data-edit="launch.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Sheet 6</p>
            <h2 data-edit="launch.title" data-edit-max="60" id="tp-launch-h">Before you launch</h2>
            <p data-edit="launch.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The Saltings are gentle water with a strong tide under them.
              Read these once; we will say them again on the jetty.
            </p>
          </div>

          <div className={s.notes}>
            <div className={s.note}>
              <h3 data-edit="launch.noteKey" data-edit-format="emphasis" data-edit-max="40"><span className={s.noteKey}>Note A</span> What to bring</h3>
              <ol>
                {BRING.map((item, i) => (
                  <li data-edit={`launch.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div className={s.note}>
              <h3 data-edit="launch.noteKey2" data-edit-format="emphasis" data-edit-max="40"><span className={s.noteKey}>Note B</span> The safety briefing</h3>
              <ol>
                {BRIEFING.map((item, i) => (
                  <li data-edit={`launch.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div className={`${s.note} ${s.caution}`}>
              <h3 data-edit="launch.noteKey3" data-edit-format="emphasis" data-edit-max="40"><span className={s.noteKey}>Caution</span> Age and swim rules</h3>
              <ol>
                {RULES.map((item, i) => (
                  <li data-edit={`launch.item3.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>

          <aside className={s.flags} aria-labelledby="tp-flags-h">
            <div data-edit-pattern="tpFlags.field" data-edit-roles="transparent,3,1,3,3,2" className={s.lashing} aria-hidden="true">
              <TabbiedPattern
                pattern={ribline}
                palette={LASHING}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={26}
                seed="tidewater-lashing"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.flagsBody}>
              <h3 data-edit="tpFlags.flagsTitle" data-edit-max="40" id="tp-flags-h" className={s.flagsTitle}>The flag on the boathouse mast</h3>
              <ul className={s.flagList}>
                {FLAGS.map((f, i) => (
                  <li key={f.name}>
                    <span className={`${s.flag} ${s[`flag_${f.flag}`]}`} aria-hidden="true" />
                    <span data-edit={`tpFlags.flagName.${i}`} data-edit-max="60" className={s.flagName}>{f.name}</span>
                    <span data-edit={`tpFlags.flagBody.${i}`} data-edit-max="60" className={s.flagBody}>{f.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="tp-book-h">
          <div className={s.bookGrid}>
            <form className={s.form} action="#">
              <p data-edit="book.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Sheet 7</p>
              <h2 data-edit="book.title" data-edit-max="60" id="tp-book-h">Book a boat</h2>
              <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                Pick a day and a launch time; we hold the boat for thirty
                minutes past it. Nothing is charged until you are on the jetty.
              </p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="tp-name">Name</label>
                  <input id="tp-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="tp-email">Email</label>
                  <input id="tp-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="tp-phone">Phone</label>
                  <input id="tp-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="tp-date">Day</label>
                  <input id="tp-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label5" htmlFor="tp-time">Launch time</label>
                  <select id="tp-time" name="time" defaultValue="best">
                    <option value="best">The best window that day</option>
                    <option value="0800">08:00</option>
                    <option value="1000">10:00</option>
                    <option value="1200">12:00</option>
                    <option value="1400">14:00</option>
                    <option value="1600">16:00</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label6" htmlFor="tp-craft">Boat</label>
                  <select id="tp-craft" name="craft" defaultValue="curlew">
                    <option value="curlew">Curlew, single kayak</option>
                    <option value="godwit">Godwit, tandem kayak</option>
                    <option value="knot">Knot, sit-on-top</option>
                    <option value="sanderling">Sanderling, paddleboard</option>
                    <option value="trip">A guided trip</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label7" htmlFor="tp-boats">How many boats</label>
                  <input id="tp-boats" name="boats" type="number" min="1" max="12" defaultValue="1" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label8" htmlFor="tp-length">For how long</label>
                  <select id="tp-length" name="length" defaultValue="hour">
                    <option value="hour">One hour</option>
                    <option value="two">Two hours</option>
                    <option value="half">Half day, 4 hours</option>
                    <option value="day">All day</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="book.label9" htmlFor="tp-notes">Anything we should know</label>
                  <textarea id="tp-notes" name="notes" rows={3} />
                </div>
              </div>
              <label className={s.check} htmlFor="tp-first">
                <input id="tp-first" name="first" type="checkbox" />
                <span data-edit="book.text" data-edit-max="60">First time in a kayak: add the capsize drill (free)</span>
              </label>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Hold my boat</button>
            </form>

            <aside className={s.desk} aria-labelledby="tp-desk-h">
              <div data-edit-pattern="tpDesk.field" data-edit-roles="transparent,3,1,3,3,2" className={s.deskField} aria-hidden="true">
                <TabbiedPattern
                  pattern={strand}
                  palette={BARS}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={36}
                  seed="tidewater-desk-bars"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.deskCard}>
                <h3 data-edit="tpDesk.deskTitle" data-edit-max="40" id="tp-desk-h" className={s.deskTitle}>The hire hut</h3>
                <p data-edit="tpDesk.body" data-edit-max="240" data-edit-multiline>Walk-ups are welcome whenever a boat is on the rack; weekends in summer, book.</p>
                <p className={s.deskPhone}>
                  <a data-edit="tpDesk.link" data-edit-max="28" href="tel:+15550143380">(555) 014-3380</a>
                </p>
                <p className={s.deskMail}>
                  <a data-edit="tpDesk.link2" data-edit-max="28" href="mailto:hire@tidewaterpaddle.example">hire@tidewaterpaddle.example</a>
                </p>
                <p data-edit="tpDesk.deskSmall" data-edit-max="240" data-edit-multiline className={s.deskSmall}>Cancel up to 24 hours before for nothing. If we close the water, we move you or refund you.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="tp-visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Sheet 8</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="tp-visit-h">Finding the boathouse</h2>
          </div>
          <div className={s.visit}>
            <div className={s.visitWhere}>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>The Boathouse, Heron Reach, Saltings Lane, Marram Bay</p>
              <p className={s.position}>{`51${DEG}43.2'N  1${DEG}02.6'E`}</p>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>
                At the end of the sea wall, below Beacon Hill: the only building
                on the estuary with a red roof. The hire hut is on the jetty.
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
            <dl className={s.getting}>
              {GETTING_HERE.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`visit.term2.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,3,0,3,0,2" className={s.footSwell} aria-hidden="true">
          <TabbiedPattern
            pattern={wavelet}
            palette={SWELL}
            fit="grid"
            cellSize={28}
            seed="tidewater-foot-swell"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tidewater Paddle Co.</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional kayak and paddleboard hire. The boathouse, estuary, tides, guides and prices are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The estuary and the kayaks are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
