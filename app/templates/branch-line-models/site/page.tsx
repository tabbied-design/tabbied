import { TabbiedPattern } from 'tabbied/react';
import { seamband, circuit, metro, switchback } from 'tabbied/patterns';
import s from './branch-line-models.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Branch Line Models: Model railway shop, Little Hadley',
  description:
    'Locomotives, track, scenery and secondhand stock in OO, N and O gauge at 7 Station Approach, Little Hadley. New arrivals, a guide to building a first layout, club open days, repairs and DCC fitting.',
};

/* Site colors. The track bed is a maze of green bands with a brass seam on
   the dark ink of the baseboard; the wiring, the club poster and the works
   drawings take the same roles over transparent grounds. */
const PAPER = '#efede6';
const INK = '#1c1d1f';
const GREEN = '#2e5b3b';
const MAROON = '#7d2630';
const BRASS = '#c9993c';

const TRACKBED = [INK, GREEN, BRASS, PAPER, MAROON, GREEN];
const SIDINGS = [PAPER, GREEN, BRASS, INK, MAROON, GREEN];
const WIRING = ['transparent', INK, MAROON, GREEN, BRASS, MAROON];
const POSTER = ['transparent', BRASS, PAPER, MAROON, BRASS, PAPER];
const WORKS = ['transparent', MAROON, INK, GREEN, BRASS, INK];

const NAV = [
  ['Arrivals', '#arrivals'],
  ['Scales', '#scales'],
  ['Building', '#building'],
  ['Open days', '#club'],
  ['Repairs', '#repairs'],
  ['Secondhand', '#secondhand'],
  ['Visit', '#visit'],
];

/* The stations on the track plan: where each sits over the drawing (as a
   percentage of its box) and which side its board hangs. */
const STATIONS = [
  { no: '1', name: 'New arrivals', href: '#arrivals', x: 48.33, y: 17.65, side: 'above' },
  { no: '2', name: 'Which scale?', href: '#scales', x: 90.29, y: 30.88, side: 'left' },
  { no: '3', name: 'Building a layout', href: '#building', x: 70.83, y: 76.47, side: 'above' },
  { no: '4', name: 'Club open days', href: '#club', x: 52.5, y: 65.88, side: 'above' },
  { no: '5', name: 'Repairs and DCC', href: '#repairs', x: 92.5, y: 91.18, side: 'above' },
  { no: '6', name: 'Secondhand', href: '#secondhand', x: 7.5, y: 88.24, side: 'above' },
  { no: '7', name: 'Visit', href: '#visit', x: 31.67, y: 76.47, side: 'below' },
];

type Livery = {
  cat: string;
  livery: string;
  era: string;
  price: string;
  stock: 'in' | 'order';
  status: string;
  inks: Record<string, string>;
  swatches: string[];
};

/* One model, four liveries: the layer inks rotate through the roles. */
const LIVERIES: Livery[] = [
  {
    cat: 'BLM 4011',
    livery: 'Brunswick green',
    era: 'Late crest, lined orange and black',
    price: '$189.00',
    stock: 'in',
    status: 'In stock, 6',
    inks: {
      red: 'var(--green)',
      blue: 'color-mix(in oklab, var(--green) 72%, var(--ink))',
      yellow: 'var(--brass)',
      black: 'var(--text)',
    },
    swatches: ['var(--green)', 'color-mix(in oklab, var(--green) 72%, var(--ink))', 'var(--brass)', 'var(--text)'],
  },
  {
    cat: 'BLM 4012',
    livery: 'Crimson lake',
    era: 'Pre-grouping, gold lettering',
    price: '$189.00',
    stock: 'in',
    status: 'In stock, 3',
    inks: {
      red: 'var(--maroon)',
      blue: 'color-mix(in oklab, var(--maroon) 70%, var(--ink))',
      yellow: 'color-mix(in oklab, var(--brass) 80%, var(--paper))',
      black: 'var(--text)',
    },
    swatches: ['var(--maroon)', 'color-mix(in oklab, var(--maroon) 70%, var(--ink))', 'color-mix(in oklab, var(--brass) 80%, var(--paper))', 'var(--text)'],
  },
  {
    cat: 'BLM 4013',
    livery: 'Caledonian blue',
    era: 'Lined white, red buffer beams',
    price: '$194.00',
    stock: 'order',
    status: 'On order, due 14 Nov',
    inks: {
      red: 'color-mix(in oklab, color-mix(in oklch longer hue, var(--green), var(--maroon)) 70%, var(--paper))',
      blue: 'color-mix(in oklch longer hue, var(--green), var(--maroon))',
      yellow: 'var(--paper)',
      black: 'var(--maroon)',
    },
    swatches: ['color-mix(in oklab, color-mix(in oklch longer hue, var(--green), var(--maroon)) 70%, var(--paper))', 'color-mix(in oklch longer hue, var(--green), var(--maroon))', 'var(--paper)', 'var(--maroon)'],
  },
  {
    cat: 'BLM 4014',
    livery: 'Works grey',
    era: 'Photographic grey, as ex-works',
    price: '$169.00',
    stock: 'in',
    status: 'In stock, 9',
    inks: {
      red: 'color-mix(in oklab, var(--text) 38%, var(--paper))',
      blue: 'color-mix(in oklab, var(--text) 58%, var(--paper))',
      yellow: 'color-mix(in oklab, var(--paper) 86%, var(--text))',
      black: 'var(--text)',
    },
    swatches: ['color-mix(in oklab, var(--text) 38%, var(--paper))', 'color-mix(in oklab, var(--text) 58%, var(--paper))', 'color-mix(in oklab, var(--paper) 86%, var(--text))', 'var(--text)'],
  },
];

const LOCO_SPECS = [
  ['Model', 'Hadley Tank, class H1, 0-4-0T'],
  ['Scale', 'OO, 1:76, 16.5 mm gauge'],
  ['Motor', '5-pole, flywheel, all wheels picking up'],
  ['DCC', 'Ready, 8-pin socket; fitted for $55'],
];

type Scale = { name: string; ratio: string; gauge: string; foot: string; note: string; size: string; track: string };

const SCALES: Scale[] = [
  { name: 'O', ratio: '1:43', gauge: '32 mm', foot: '7 mm to the foot', note: 'Heavy, detailed, and happiest in a garden or a long shed. A layout wants a room.', size: 'sizeO', track: 'gaugeO' },
  { name: 'OO', ratio: '1:76', gauge: '16.5 mm', foot: '4 mm to the foot', note: 'The British standard. The widest choice of models, and a layout fits on a door.', size: 'sizeOO', track: 'gaugeOO' },
  { name: 'N', ratio: '1:148', gauge: '9 mm', foot: '2 mm to the foot', note: 'Long trains in small rooms. A whole branch line on a bookshelf.', size: 'sizeN', track: 'gaugeN' },
];

const BUILD_STEPS = [
  { no: '01', title: 'Baseboard', text: 'A flush door or 9 mm ply on a 2 x 1 inch frame. Flat, level, and at elbow height. We cut ply to size on Saturdays.', need: 'From $38' },
  { no: '02', title: 'Track plan', text: 'An oval and a siding is enough to start. Draw it full size on the board before you buy a single point.', need: 'Plans free at the counter' },
  { no: '03', title: 'Track and wiring', text: 'Pin the track, then run a bus wire under the board with droppers every metre. Test every rail before the ballast.', need: 'Starter track pack $64' },
  { no: '04', title: 'Scenery', text: 'Foam hills, plaster cloth, then scatter and static grass. The first hedgerow takes an evening; the tenth takes ten minutes.', need: 'Scenery box $45' },
];

type OpenDay = { date: string; day: string; time: string; layout: string; gauge: string; note: string };

const OPEN_DAYS: OpenDay[] = [
  { date: '12 Oct', day: 'Sun', time: '10:00-16:00', layout: 'Hadley Junction', gauge: 'OO', note: 'Running a full timetable, 1958' },
  { date: '26 Oct', day: 'Sun', time: '10:00-16:00', layout: 'Wren Valley', gauge: 'N', note: 'Children drive the goods trains' },
  { date: '9 Nov', day: 'Sun', time: '10:00-16:00', layout: 'Coldharbour Quarry', gauge: 'O', note: 'Narrow gauge guests from Farrow' },
  { date: '23 Nov', day: 'Sun', time: '10:00-15:00', layout: 'Hadley Junction', gauge: 'OO', note: 'Bring a loco for the test track' },
  { date: '7 Dec', day: 'Sun', time: '10:00-17:00', layout: 'The Christmas layout', gauge: 'OO', note: 'Mince pies, snow on the hills' },
];

const REPAIRS = [
  ['Service and clean, any loco', '1 week', '$28'],
  ['Replace motor, OO or N', '2 weeks', 'from $45'],
  ['DCC fit, 8 or 21-pin socket', '3 days', '$55'],
  ['DCC fit, hard-wired', '1 week', '$85'],
  ['DCC sound fit, speaker included', '2 weeks', '$165'],
  ['Wheel re-profile, per axle', '1 week', '$12'],
];

type Used = { cat: string; item: string; grade: string; price: string; fresh: boolean };

const SECONDHAND: Used[] = [
  { cat: 'SH 2231', item: 'Pannier tank, 0-6-0, GWR green', grade: 'Boxed, runs well', price: '$72', fresh: true },
  { cat: 'SH 2232', item: 'Six mineral wagons, weathered', grade: 'Unboxed, good', price: '$36', fresh: true },
  { cat: 'SH 2219', item: 'Class 08 shunter, BR green, N gauge', grade: 'Boxed, as new', price: '$64', fresh: false },
  { cat: 'SH 2204', item: 'Signal box kit, built and painted', grade: 'Good, one handrail bent', price: '$28', fresh: false },
  { cat: 'SH 2198', item: 'Clockwork tank set, 1950s, O gauge', grade: 'Played with, key present', price: '$140', fresh: false },
  { cat: 'SH 2190', item: 'Box of 40 points and crossings, OO', grade: 'Mixed, all tested', price: '$90', fresh: false },
];

const TIMETABLE = [
  ['Mon', 'Closed'],
  ['Tue', '09:30-17:30'],
  ['Wed', '09:30-17:30'],
  ['Thu', '09:30-20:00'],
  ['Fri', '09:30-17:30'],
  ['Sat', '09:00-17:00'],
  ['Sun', 'Open days only'],
];

export default function BranchLineModelsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#efede6',
        '--ink': '#1c1d1f',
        '--green': '#2e5b3b',
        '--maroon': '#7d2630',
        '--brass': '#c9993c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,green,maroon,brass"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,300..900;1,400..700&family=Overpass+Mono:wght@400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDisc} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Branch Line Models</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>7 Station Approach</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The catalog's cover: the name, a panel of track bed, and the
            layout's track plan, whose stations are this page's sections. */}
        <section className={s.hero} aria-labelledby="bl-hero-h">
          <div className={s.cover}>
            <div className={s.coverText}>
              <p className={s.kicker}>
                <span data-edit="blHero.kickerCat" data-edit-max="60" className={s.kickerCat}>Catalogue 38</span>
                <span data-edit="blHero.text" data-edit-max="60">Autumn and winter 2026</span>
              </p>
              <h1 data-edit="blHero.title" data-edit-max="70" id="bl-hero-h" className={s.title}>Branch Line Models</h1>
              <p data-edit="blHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                A model railway shop by the station at Little Hadley:
                locomotives and rolling stock in OO, N and O, track by the
                yard, scenery, secondhand stock, and a workbench at the back
                for repairs and DCC fitting.
              </p>
              <div className={s.actions}>
                <a data-edit="blHero.btn" data-edit-max="28" className={s.btn} href="#arrivals">See the new arrivals</a>
                <a data-edit="blHero.btnLine" data-edit-max="28" className={s.btnLine} href="#building">Start a first layout</a>
              </div>
            </div>

            <div className={s.bedWrap}>
              <div data-edit-pattern="blHero.field" data-edit-roles="1,2,4,0,3,2" className={s.bed} aria-hidden="true">
                <TabbiedPattern
                  pattern={seamband}
                  palette={TRACKBED}
                  fit="grid"
                  cellSize={40}
                  seed="branch-trackbed"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.bedPlate}>
                <span data-edit="blHero.bedPlateNo" data-edit-max="60" className={s.bedPlateNo}>No. 38</span>
                <span data-edit="blHero.text2" data-edit-max="60">Little Hadley, est. 1974</span>
              </p>
            </div>
          </div>

          <figure className={s.plan}>
            <figcaption className={s.planHead}>
              <span data-edit="blHero.planTitle" data-edit-max="60" className={s.planTitle}>Track plan: the page as a layout</span>
              <span data-edit="blHero.planNote" data-edit-max="60" className={s.planNote}>Every station is a section. Choose one to travel there.</span>
            </figcaption>
            <div className={s.planScroll}>
              <div className={s.planBoard}>
                <svg className={s.planSvg} viewBox="0 0 1200 340" aria-hidden="true">
                  <g className={s.sleepers}>
                    <path d="M 200 60 H 1000 A 100 100 0 0 1 1000 260 H 200 A 100 100 0 0 1 200 60 Z" />
                    <path d="M 330 60 C 370 60 380 96 420 96 H 740 C 780 96 790 60 830 60" />
                    <path d="M 450 260 C 490 260 500 224 540 224 H 720" />
                    <path d="M 780 260 C 840 260 860 310 920 310 H 1150" />
                    <path d="M 960 310 C 1000 310 1010 330 1050 330 H 1150" />
                    <path d="M 290 260 C 230 260 200 300 140 300 H 118" />
                  </g>
                  <g className={s.rails}>
                    <path d="M 200 60 H 1000 A 100 100 0 0 1 1000 260 H 200 A 100 100 0 0 1 200 60 Z" />
                    <path d="M 330 60 C 370 60 380 96 420 96 H 740 C 780 96 790 60 830 60" />
                    <path d="M 450 260 C 490 260 500 224 540 224 H 720" />
                    <path d="M 780 260 C 840 260 860 310 920 310 H 1150" />
                    <path d="M 960 310 C 1000 310 1010 330 1050 330 H 1150" />
                    <path d="M 290 260 C 230 260 200 300 140 300 H 118" />
                  </g>
                  <g className={s.railGap}>
                    <path d="M 200 60 H 1000 A 100 100 0 0 1 1000 260 H 200 A 100 100 0 0 1 200 60 Z" />
                    <path d="M 330 60 C 370 60 380 96 420 96 H 740 C 780 96 790 60 830 60" />
                    <path d="M 450 260 C 490 260 500 224 540 224 H 720" />
                    <path d="M 780 260 C 840 260 860 310 920 310 H 1150" />
                    <path d="M 960 310 C 1000 310 1010 330 1050 330 H 1150" />
                    <path d="M 290 260 C 230 260 200 300 140 300 H 118" />
                  </g>
                  {/* Platforms, buffer stops, the turntable and the shed. */}
                  <rect className={s.platform} x="470" y="72" width="220" height="12" />
                  <path className={s.buffer} d="M 720 214 V 234 M 1150 301 V 319 M 1150 321 V 339" />
                  <circle className={s.turntable} cx="90" cy="300" r="28" />
                  <path className={s.turntableDeck} d="M 64 300 H 116" />
                  <path className={s.stalls} d="M 70 320 L 46 342 M 90 328 V 356 M 110 320 L 134 342" />
                  <rect className={s.shed} x="250" y="132" width="92" height="40" />
                  <path className={s.shedRoof} d="M 244 132 L 296 114 L 348 132" />
                  <g className={s.planNumbers}>
                    {STATIONS.map((st) => (
                      <g key={st.href} transform={`translate(${st.x * 12} ${st.y * 3.4})`}>
                        <circle r="26" />
                        <text y="11" textAnchor="middle">{st.no}</text>
                      </g>
                    ))}
                  </g>
                </svg>
                <ol className={s.stations}>
                  {STATIONS.map((st, i) => (
                    <li
                      key={st.href}
                      className={`${s.station} ${s[st.side]}`}
                      style={{ left: `${st.x}%`, top: `${st.y}%` }}
                    >
                      <a href={st.href}>
                        <span data-edit={`blHero.stationNo.${i}`} data-edit-max="60" className={s.stationNo}>{st.no}</span>
                        <span data-edit={`blHero.stationName.${i}`} data-edit-max="60" className={s.stationName}>{st.name}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </figure>
        </section>

        <div className={s.route}>
          {/* ------------------------------------------------------ ARRIVALS
              One model in four liveries: the same drawing, its layers
              painted with the roles in turn. */}
          <section id="arrivals" className={s.sec} aria-labelledby="bl-arr-h">
            <div className={s.lineside}>
              <Artwork slug="branch-line-models-signal" alt="" inks={['var(--text)']} className={s.signal} />
            </div>
            <div className={s.body}>
              <div className={s.secHead}>
                <p className={s.totem}>
                  <span data-edit="arrivals.totemBar" data-edit-max="60" className={s.totemBar}>New arrivals</span>
                </p>
                <p data-edit="arrivals.platformNo" data-edit-max="240" data-edit-multiline className={s.platformNo}>Platform 1</p>
                <h2 data-edit="arrivals.secTitle" data-edit-max="60" id="bl-arr-h" className={s.secTitle}>The Hadley Tank, in four liveries</h2>
                <p data-edit="arrivals.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Our own model, made for us in a run of 400: a little
                  0-4-0 tank of the kind that shunted every branch line
                  yard. One chassis, four paint shops.
                </p>
              </div>

              <ul className={s.liveries}>
                {LIVERIES.map((l, i) => (
                  <li key={l.cat} className={s.livery}>
                    <p className={s.catLine}>
                      <span data-edit={`arrivals.catNo.${i}`} data-edit-max="60" className={s.catNo}>{l.cat}</span>
                      <span data-edit={`arrivals.stock.${i}`} data-edit-max="60" className={`${s.stock} ${l.stock === 'in' ? s.stockIn : s.stockOrder}`}>{l.status}</span>
                    </p>
                    <div className={s.locoStage}>
                      <Artwork
                        slug="branch-line-models-loco"
                        alt={`The Hadley Tank locomotive in ${l.livery} livery`}
                        inks={l.inks}
                        className={s.loco}
                      />
                      <span className={s.stageTrack} aria-hidden="true" />
                    </div>
                    <div className={s.liveryFoot}>
                      <div>
                        <h3 data-edit={`arrivals.liveryName.${i}`} data-edit-max="40" className={s.liveryName}>{l.livery}</h3>
                        <p data-edit={`arrivals.liveryEra.${i}`} data-edit-max="240" data-edit-multiline className={s.liveryEra}>{l.era}</p>
                      </div>
                      <p data-edit={`arrivals.liveryPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.liveryPrice}>{l.price}</p>
                    </div>
                    <ul className={s.swatches} aria-label={`${l.livery} colors`}>
                      {l.swatches.map((sw, i) => (
                        <li key={`${l.cat}-${i}`} style={{ background: sw }} />
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <dl className={s.specs}>
                {LOCO_SPECS.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`arrivals.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`arrivals.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* A scale rule between stations. */}
          <div className={s.ruler} aria-hidden="true">
            <span data-edit="top.rulerLabel" data-edit-max="60" className={s.rulerLabel}>OO 1:76</span>
            <span className={s.rulerTicks} />
            <span data-edit="top.rulerLabel2" data-edit-max="60" className={s.rulerLabel}>4 mm = 1 ft</span>
          </div>

          {/* -------------------------------------------------------- SCALES */}
          <section id="scales" className={s.sec} aria-labelledby="bl-scale-h">
            <div className={s.lineside}>
              <Artwork slug="branch-line-models-signal" alt="" inks={['var(--text)']} className={s.signal} />
            </div>
            <div className={s.body}>
              <div className={s.secHead}>
                <p className={s.totem}>
                  <span data-edit="scales.totemBar" data-edit-max="60" className={s.totemBar}>Which scale?</span>
                </p>
                <p data-edit="scales.platformNo" data-edit-max="240" data-edit-multiline className={s.platformNo}>Platform 2</p>
                <h2 data-edit="scales.secTitle" data-edit-max="60" id="bl-scale-h" className={s.secTitle}>The same engine in three scales</h2>
                <p data-edit="scales.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Drawn here at their true sizes against each other. Pick
                  by the room you have and how close you like to look.
                </p>
              </div>

              <ul className={s.scales}>
                {SCALES.map((sc, i) => (
                  <li key={sc.name} className={s.scale}>
                    <div className={s.scaleStage}>
                      <Artwork
                        slug="branch-line-models-loco"
                        alt={`The Hadley Tank drawn at ${sc.name} scale, ${sc.ratio}`}
                        inks={{
                          red: 'color-mix(in oklab, var(--text) 30%, var(--paper))',
                          blue: 'color-mix(in oklab, var(--text) 52%, var(--paper))',
                          yellow: 'color-mix(in oklab, var(--text) 12%, var(--paper))',
                          black: 'var(--text)',
                        }}
                        className={`${s.scaleLoco} ${s[sc.size]}`}
                      />
                      <span className={`${s.gauge} ${s[sc.track]}`} aria-hidden="true" />
                    </div>
                    <div className={s.scaleText}>
                      <p className={s.scaleName}>
                        <span data-edit={`scales.text.${i}`} data-edit-max="60">{sc.name}</span>
                        <span data-edit={`scales.scaleRatio.${i}`} data-edit-max="60" className={s.scaleRatio}>{sc.ratio}</span>
                      </p>
                      <p className={s.scaleFacts}>{`${sc.gauge} gauge, ${sc.foot}`}</p>
                      <p data-edit={`scales.scaleNote.${i}`} data-edit-max="240" data-edit-multiline className={s.scaleNote}>{sc.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className={s.ruler} aria-hidden="true">
            <span data-edit="top.rulerLabel3" data-edit-max="60" className={s.rulerLabel}>N 1:148</span>
            <span className={`${s.rulerTicks} ${s.rulerFine}`} />
            <span data-edit="top.rulerLabel4" data-edit-max="60" className={s.rulerLabel}>2 mm = 1 ft</span>
          </div>

          {/* ------------------------------------------------------ BUILDING */}
          <section id="building" className={s.sec} aria-labelledby="bl-build-h">
            <div className={s.lineside}>
              <Artwork slug="branch-line-models-signal" alt="" inks={['var(--text)']} className={s.signal} />
            </div>
            <div className={s.body}>
              <div className={s.secHead}>
                <p className={s.totem}>
                  <span data-edit="building.totemBar" data-edit-max="60" className={s.totemBar}>Building a layout</span>
                </p>
                <p data-edit="building.platformNo" data-edit-max="240" data-edit-multiline className={s.platformNo}>Platform 3</p>
                <h2 data-edit="building.secTitle" data-edit-max="60" id="bl-build-h" className={s.secTitle}>A first layout in four evenings</h2>
                <p data-edit="building.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  The short version of the guide we give away at the counter.
                  The long version is Gerald, on Thursday evenings.
                </p>
              </div>

              <div className={s.buildGrid}>
                <ol className={s.buildSteps}>
                  {BUILD_STEPS.map((b, i) => (
                    <li key={b.no}>
                      <span data-edit={`building.buildNo.${i}`} data-edit-max="60" className={s.buildNo}>{b.no}</span>
                      <h3 data-edit={`building.title.${i}`} data-edit-max="40">{b.title}</h3>
                      <p data-edit={`building.body.${i}`} data-edit-max="240" data-edit-multiline>{b.text}</p>
                      <p data-edit={`building.buildNeed.${i}`} data-edit-max="240" data-edit-multiline className={s.buildNeed}>{b.need}</p>
                    </li>
                  ))}
                </ol>

                <aside className={s.wiring} aria-labelledby="bl-wire-h">
                  <div data-edit-pattern="blWire.field" data-edit-roles="transparent,1,3,2,4,3" className={s.wiringField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={circuit}
                      palette={WIRING}
                      options={{ frequency: 0.55 }}
                      fit="grid"
                      cellSize={30}
                      seed="branch-wiring"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <div className={s.wiringText}>
                    <p data-edit="blWire.wiringKicker" data-edit-max="240" data-edit-multiline className={s.wiringKicker}>Under the board</p>
                    <h3 data-edit="blWire.title" data-edit-max="40" id="bl-wire-h">The starter box, $249</h3>
                    <p data-edit="blWire.body" data-edit-max="240" data-edit-multiline>
                      An OO oval with two points and a siding, a controller,
                      a bus-wire kit, a Hadley Tank in works grey and three
                      wagons. Everything on this page, in one box.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <div className={s.ruler} aria-hidden="true">
            <span data-edit="top.rulerLabel5" data-edit-max="60" className={s.rulerLabel}>O 1:43</span>
            <span className={`${s.rulerTicks} ${s.rulerCoarse}`} />
            <span data-edit="top.rulerLabel6" data-edit-max="60" className={s.rulerLabel}>7 mm = 1 ft</span>
          </div>

          {/* ---------------------------------------------------------- CLUB */}
          <section id="club" className={s.sec} aria-labelledby="bl-club-h">
            <div className={s.lineside}>
              <Artwork slug="branch-line-models-signal" alt="" inks={['var(--text)']} className={s.signal} />
            </div>
            <div className={s.body}>
              <div className={s.secHead}>
                <p className={s.totem}>
                  <span data-edit="club.totemBar" data-edit-max="60" className={s.totemBar}>Club open days</span>
                </p>
                <p data-edit="club.platformNo" data-edit-max="240" data-edit-multiline className={s.platformNo}>Platform 4</p>
                <h2 data-edit="club.secTitle" data-edit-max="60" id="bl-club-h" className={s.secTitle}>Hadley Model Railway Club, upstairs</h2>
                <p data-edit="club.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  The club meets above the shop and opens its layouts to
                  everyone on these Sundays. Free, and children can drive.
                </p>
              </div>

              <div className={s.clubGrid}>
                <div className={s.departures}>
                  <p className={s.depHead}>
                    <span data-edit="club.text" data-edit-max="60">Departures</span>
                    <span data-edit="club.depSub" data-edit-max="60" className={s.depSub}>Open days, Sundays</span>
                  </p>
                  <table className={s.depTable}>
                    <caption data-edit="club.srOnly" className={s.srOnly}>Club open days: date, times, layout and gauge</caption>
                    <thead>
                      <tr>
                        <th data-edit="club.heading" scope="col">Date</th>
                        <th data-edit="club.heading2" scope="col">Time</th>
                        <th data-edit="club.heading3" scope="col">Layout</th>
                        <th data-edit="club.heading4" scope="col">Gauge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OPEN_DAYS.map((d, i) => (
                        <tr key={d.date}>
                          <th scope="row">
                            <span data-edit={`club.depDay.${i}`} data-edit-max="60" className={s.depDay}>{d.day}</span>
                            <span data-edit={`club.text2.${i}`} data-edit-max="60">{d.date}</span>
                          </th>
                          <td data-edit={`club.depTime.${i}`} className={s.depTime}>{d.time}</td>
                          <td>
                            <span data-edit={`club.depLayout.${i}`} data-edit-max="60" className={s.depLayout}>{d.layout}</span>
                            <span data-edit={`club.depNote.${i}`} data-edit-max="60" className={s.depNote}>{d.note}</span>
                          </td>
                          <td data-edit={`club.depGauge.${i}`} className={s.depGauge}>{d.gauge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <aside className={s.poster} aria-labelledby="bl-poster-h">
                  <div data-edit-pattern="blPoster.field" data-edit-roles="transparent,4,0,3,4,0" className={s.posterField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={metro}
                      palette={POSTER}
                      options={{ frequency: 0.8 }}
                      fit="grid"
                      cellSize={40}
                      seed="branch-poster"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <div className={s.posterText}>
                    <p data-edit="blPoster.posterKicker" data-edit-max="240" data-edit-multiline className={s.posterKicker}>Join the club</p>
                    <h3 data-edit="blPoster.posterTitle" data-edit-max="40" id="bl-poster-h" className={s.posterTitle}>$40 a year</h3>
                    <p data-edit="blPoster.body" data-edit-max="240" data-edit-multiline>
                      Thursday evenings from 19:00, a key to the layout
                      room, and ten percent off in the shop below.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- REPAIRS */}
          <section id="repairs" className={s.sec} aria-labelledby="bl-rep-h">
            <div className={s.lineside}>
              <Artwork slug="branch-line-models-signal" alt="" inks={['var(--text)']} className={s.signal} />
            </div>
            <div className={s.body}>
              <div className={s.secHead}>
                <p className={s.totem}>
                  <span data-edit="repairs.totemBar" data-edit-max="60" className={s.totemBar}>Repairs and DCC</span>
                </p>
                <p data-edit="repairs.platformNo" data-edit-max="240" data-edit-multiline className={s.platformNo}>Platform 5</p>
                <h2 data-edit="repairs.secTitle" data-edit-max="60" id="bl-rep-h" className={s.secTitle}>The workbench at the back</h2>
                <p data-edit="repairs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Ruth services, repairs and chips locomotives of any age and
                  make. Every job is test-run for half an hour on the rolling
                  road before it comes back to you.
                </p>
              </div>

              <div className={s.worksGrid}>
                <figure className={s.works}>
                  <div data-edit-pattern="repairs.field" data-edit-roles="transparent,3,1,2,4,1" className={s.worksDrawing} aria-hidden="true">
                    <TabbiedPattern
                      pattern={switchback}
                      palette={WORKS}
                      options={{ frequency: 0.7 }}
                      fit="grid"
                      cellSize={36}
                      seed="branch-works"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <figcaption className={s.worksCaption}>
                    <span data-edit="repairs.worksTitle" data-edit-max="60" className={s.worksTitle}>The rolling road</span>
                    <span data-edit="repairs.text" data-edit-max="60">Four axles, speed read in scale miles an hour. Every job runs on it for half an hour.</span>
                  </figcaption>
                </figure>
                <table className={s.priceTable}>
                  <caption data-edit="repairs.priceCaption" className={s.priceCaption}>Workbench price list</caption>
                  <thead>
                    <tr>
                      <th data-edit="repairs.heading" scope="col">Job</th>
                      <th data-edit="repairs.heading2" scope="col">Turnaround</th>
                      <th data-edit="repairs.num" scope="col" className={s.num}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REPAIRS.map(([job, time, price], i) => (
                      <tr key={job}>
                        <th data-edit={`repairs.heading3.${i}`} scope="row">{job}</th>
                        <td data-edit={`repairs.cell.${i}`}>{time}</td>
                        <td data-edit={`repairs.num2.${i}`} className={s.num}>{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className={s.ruler} aria-hidden="true">
            <span data-edit="top.rulerLabel7" data-edit-max="60" className={s.rulerLabel}>OO 1:76</span>
            <span className={s.rulerTicks} />
            <span data-edit="top.rulerLabel8" data-edit-max="60" className={s.rulerLabel}>4 mm = 1 ft</span>
          </div>

          {/* ---------------------------------------------------- SECONDHAND */}
          <section id="secondhand" className={s.sec} aria-labelledby="bl-used-h">
            <div className={s.lineside}>
              <Artwork slug="branch-line-models-signal" alt="" inks={['var(--text)']} className={s.signal} />
            </div>
            <div className={s.body}>
              <div className={s.secHead}>
                <p className={s.totem}>
                  <span data-edit="secondhand.totemBar" data-edit-max="60" className={s.totemBar}>Secondhand</span>
                </p>
                <p data-edit="secondhand.platformNo" data-edit-max="240" data-edit-multiline className={s.platformNo}>Platform 6</p>
                <h2 data-edit="secondhand.secTitle" data-edit-max="60" id="bl-used-h" className={s.secTitle}>From the secondhand shelves</h2>
                <p data-edit="secondhand.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Tested on the track and graded honestly. We buy whole
                  collections too, and we come to you to see them.
                </p>
              </div>

              <ul className={s.used}>
                {SECONDHAND.map((u, i) => (
                  <li key={u.cat} className={s.usedCard}>
                    <p className={s.usedTop}>
                      <span data-edit={`secondhand.catNo.${i}`} data-edit-max="60" className={s.catNo}>{u.cat}</span>
                      {u.fresh ? <span data-edit={`secondhand.stock.${i}`} data-edit-max="60" className={`${s.stock} ${s.stockIn}`}>Just in</span> : null}
                    </p>
                    <h3 data-edit={`secondhand.usedItem.${i}`} data-edit-max="40" className={s.usedItem}>{u.item}</h3>
                    <p className={s.usedFoot}>
                      <span data-edit={`secondhand.usedGrade.${i}`} data-edit-max="60" className={s.usedGrade}>{u.grade}</span>
                      <span data-edit={`secondhand.usedPrice.${i}`} data-edit-max="60" className={s.usedPrice}>{u.price}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* --------------------------------------------------------- VISIT */}
          <section id="visit" className={`${s.sec} ${s.terminus}`} aria-labelledby="bl-visit-h">
            <div className={s.lineside}>
              <Artwork slug="branch-line-models-signal" alt="" inks={['var(--text)']} className={s.signal} />
              <span className={s.bufferStop} aria-hidden="true" />
            </div>
            <div className={s.body}>
              <div className={s.secHead}>
                <p className={s.totem}>
                  <span data-edit="visit.totemBar" data-edit-max="60" className={s.totemBar}>Little Hadley</span>
                </p>
                <p data-edit="visit.platformNo" data-edit-max="240" data-edit-multiline className={s.platformNo}>Terminus</p>
                <h2 data-edit="visit.secTitle" data-edit-max="60" id="bl-visit-h" className={s.secTitle}>7 Station Approach</h2>
                <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Out of Little Hadley station, turn left, and we are the
                  green shopfront with the signal in the window.
                </p>
              </div>

              <div className={s.visitGrid}>
                <div className={s.timetable}>
                  <p data-edit="visit.ttHead" data-edit-max="240" data-edit-multiline className={s.ttHead}>Shop hours</p>
                  <dl className={s.ttList}>
                    {TIMETABLE.map(([day, hours], i) => (
                      <div key={day}>
                        <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                        <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className={s.visitInfo}>
                  <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>7 Station Approach, Little Hadley</p>
                  <p data-edit="visit.body2" data-edit-max="240" data-edit-multiline>
                    Trains from Farrow every half hour; the shop is two
                    minutes from platform 1. A small car park behind the
                    shop, and the club door is round the side.
                  </p>
                  <p className={s.contactLine}><a data-edit="visit.link" data-edit-max="28" href="tel:+15550196674">(555) 019-6674</a></p>
                  <p className={s.contactLine}><a data-edit="visit.link2" data-edit-max="28" href="mailto:counter@branchlinemodels.example">counter@branchlinemodels.example</a></p>
                </div>

                <form className={s.form} action="#">
                  <p data-edit="visit.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>The wants list</p>
                  <p data-edit="visit.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Tell us what you are hunting for and we will ring when it comes in.</p>
                  <div className={s.field}>
                    <label data-edit="visit.label" htmlFor="bl-want">Model, scale, maker</label>
                    <input id="bl-want" name="want" type="text" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="visit.label2" htmlFor="bl-phone">Phone or email</label>
                    <input id="bl-phone" name="contact" type="text" autoComplete="email" />
                  </div>
                  <button data-edit="visit.btn" data-edit-max="24" className={s.btn} type="submit">Add to the list</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="0,2,4,1,3,2" className={s.footBed} aria-hidden="true">
          <TabbiedPattern
            pattern={seamband}
            palette={SIDINGS}
            fit="grid"
            cellSize={32}
            seed="branch-sidings"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Branch Line Models</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional model railway shop. The models, catalog numbers, prices and club are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The locomotive and the signal are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
