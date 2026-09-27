import { TabbiedPattern } from 'tabbied/react';
import { diminuendo, sunray, dotfield, perforate, centroid } from 'tabbied/patterns';
import s from './sunward-solar.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Sunward Solar: Solar panels and home batteries, Brightwater',
  description:
    'Sunward Solar surveys, designs and fits solar panels and home batteries around Brightwater. See what a roof could save, the three packages, a recent install and the grants that help pay for it.',
};

/* Site colors: a white ground, the navy of a panel's cells, the sun and a
   green for everything the house keeps for itself. */
const WHITE = '#f6f7f2';
const NAVY = '#152238';
const SUN = '#f5b82e';
const GREEN = '#3a9a5b';

/* Rows of cells fading in from the top: an array filling with light. */
const ARRAY = ['transparent', SUN, WHITE, SUN, GREEN, SUN];
/* Noon: rays over a pale sky. */
const RAYS = ['transparent', SUN, WHITE, SUN, WHITE];
/* 9 pm: the stars over a navy sky. */
const STARS = ['transparent', WHITE, SUN, WHITE];
/* Perforated cell sheet beside the savings table. */
const SHEET = [NAVY, SUN, GREEN, WHITE, SUN];
/* The array again, as a band under the packages. */
const BAND = [NAVY, SUN, WHITE, GREEN, SUN];
/* A tiled roof seen from the drone, for the case study. */
const ROOF = [NAVY, GREEN, SUN, WHITE, NAVY];
/* The array fading out at the foot of the page. */
const DUSK = ['transparent', SUN, WHITE, GREEN];

const NAV = [
  ['How it works', '#how'],
  ['Savings', '#savings'],
  ['Packages', '#packages'],
  ['A recent install', '#install'],
  ['Grants', '#grants'],
];

type Tile = { label: string; value: string; unit: string; note: string };

const TILES: Tile[] = [
  { label: 'Generated today', value: '18.4', unit: 'kWh', note: 'Peak 5.9 kW at 13:10' },
  { label: 'Battery', value: '86', unit: '%', note: 'Full by about 15:30' },
  { label: 'Sent to the grid', value: '6.2', unit: 'kWh', note: 'Paid at 15c a unit' },
];

const WEEK = [
  { day: 'M', kwh: '21.6', h: '82%' },
  { day: 'T', kwh: '18.4', h: '70%' },
  { day: 'W', kwh: '9.8', h: '37%' },
  { day: 'T', kwh: '24.1', h: '92%' },
  { day: 'F', kwh: '26.2', h: '100%' },
  { day: 'S', kwh: '14.3', h: '55%' },
  { day: 'S', kwh: '19.7', h: '75%' },
];

/* The sun's path across the sky at Brightwater, 51.5 degrees north, drawn
   on a polar chart: the horizon is the outer ring, overhead the middle. */
const SUN_PATHS = [
  {
    id: 'june',
    label: '21 June',
    note: 'Up at 04:50, 62 degrees at noon, 16 hours of light',
    d: 'M315.4 104.1 L318.8 116.9 L320.5 129.6 L320.6 141.8 L319.4 153.6 L316.9 164.8 L313.2 175.4 L308.6 185.3 L303.1 194.4 L296.8 202.9 L289.9 210.6 L282.3 217.5 L274.3 223.7 L265.9 229.1 L257.1 233.8 L248.0 237.8 L238.7 241.0 L229.2 243.5 L219.5 245.3 L209.8 246.4 L200.0 246.8 L190.2 246.4 L180.5 245.3 L170.8 243.5 L161.3 241.0 L152.0 237.8 L142.9 233.8 L134.1 229.1 L125.7 223.7 L117.7 217.5 L110.1 210.6 L103.2 202.9 L96.9 194.4 L91.4 185.3 L86.8 175.4 L83.1 164.8 L80.6 153.6 L79.4 141.8 L79.5 129.6 L81.2 116.9 L84.6 104.1',
    hours: [[320.7, 141], [315.6, 168.8], [304.2, 192.7], [288.1, 212.3], [268.6, 227.5], [246.9, 238.2], [223.8, 244.6], [200, 246.8], [176.2, 244.6], [153.1, 238.2], [131.4, 227.5], [111.9, 212.3], [95.8, 192.7], [84.4, 168.8], [79.3, 141]],
  },
  {
    id: 'equinox',
    label: 'March and September',
    note: 'Due east to due west, 38 degrees at noon, 12 hours',
    d: 'M350.0 200.0 L345.1 208.9 L339.6 217.3 L333.7 225.1 L327.5 232.4 L320.8 239.2 L313.9 245.4 L306.7 251.2 L299.3 256.5 L291.7 261.3 L283.8 265.6 L275.9 269.5 L267.8 273.0 L259.5 276.0 L251.2 278.7 L242.8 280.9 L234.3 282.7 L225.8 284.0 L217.2 285.0 L208.6 285.6 L200.0 285.8 L191.4 285.6 L182.8 285.0 L174.2 284.0 L165.7 282.7 L157.2 280.9 L148.8 278.7 L140.5 276.0 L132.2 273.0 L124.1 269.5 L116.2 265.6 L108.3 261.3 L100.7 256.5 L93.3 251.2 L86.1 245.4 L79.2 239.2 L72.5 232.4 L66.3 225.1 L60.4 217.3 L54.9 208.9 L50.0 200.0',
    hours: [[331.7, 227.6], [309.2, 249.3], [283.8, 265.6], [256.8, 277], [228.6, 283.6], [200, 285.8], [171.4, 283.6], [143.2, 277], [116.2, 265.6], [90.8, 249.3], [68.3, 227.6]],
  },
  {
    id: 'december',
    label: '21 December',
    note: 'A low arc in the south, 15 degrees at noon, 8 hours',
    d: 'M315.4 295.9 L309.9 298.8 L304.3 301.6 L298.7 304.2 L293.1 306.6 L287.4 308.9 L281.7 311.0 L276.0 312.9 L270.3 314.7 L264.5 316.4 L258.7 317.9 L252.9 319.2 L247.0 320.4 L241.2 321.5 L235.3 322.4 L229.5 323.2 L223.6 323.8 L217.7 324.3 L211.8 324.6 L205.9 324.8 L200.0 324.9 L194.1 324.8 L188.2 324.6 L182.3 324.3 L176.4 323.8 L170.5 323.2 L164.7 322.4 L158.8 321.5 L153.0 320.4 L147.1 319.2 L141.3 317.9 L135.5 316.4 L129.7 314.7 L124.0 312.9 L118.3 311.0 L112.6 308.9 L106.9 306.6 L101.3 304.2 L95.7 301.6 L90.1 298.8 L84.6 295.9',
    hours: [[292, 307.1], [261.8, 317.1], [231, 323], [200, 324.9], [169, 323], [138.2, 317.1], [108, 307.1]],
  },
];

/* Bearings every 30 degrees round the horizon ring. */
const BEARINGS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
  const a = (deg * Math.PI) / 180;
  const label = deg === 0 ? 'N' : deg === 90 ? 'E' : deg === 180 ? 'S' : deg === 270 ? 'W' : String(deg);
  return {
    deg,
    label,
    x1: +(200 + 150 * Math.sin(a)).toFixed(1),
    y1: +(200 - 150 * Math.cos(a)).toFixed(1),
    x2: +(200 + 158 * Math.sin(a)).toFixed(1),
    y2: +(200 - 158 * Math.cos(a)).toFixed(1),
    tx: +(200 + 174 * Math.sin(a)).toFixed(1),
    ty: +(200 - 174 * Math.cos(a) + 4).toFixed(1),
    cardinal: deg % 90 === 0,
  };
});

type Moment = { label: string; value: string };

const NOON: Moment[] = [
  { label: 'From the roof', value: '5.9 kW' },
  { label: 'Used in the house', value: '1.1 kW' },
  { label: 'Charging the battery', value: '2.6 kW' },
  { label: 'Sent to the grid', value: '2.2 kW' },
];

const NIGHT: Moment[] = [
  { label: 'From the roof', value: '0 kW' },
  { label: 'Used in the house', value: '0.9 kW' },
  { label: 'Battery', value: '71% to 58%' },
  { label: 'Bought from the grid', value: '0 kW' },
];

type Step = { n: string; name: string; body: string; kind: 'panel' | 'inverter' | 'battery' | 'house' | 'grid' };

const STEPS: Step[] = [
  { n: '01', name: 'Panels', body: 'Daylight on the cells makes direct current, even under cloud. Each panel has its own optimiser, so one shaded by the chimney does not drag the rest down.', kind: 'panel' },
  { n: '02', name: 'Inverter', body: 'In the loft or the garage, it turns that into the alternating current your sockets use, and logs every minute of it to the app.', kind: 'inverter' },
  { n: '03', name: 'Battery', body: 'Whatever the house is not using fills the battery first, to run the kettle, the lights and the television after dark.', kind: 'battery' },
  { n: '04', name: 'The house', body: 'Appliances take from the roof first, then the battery, then the grid. You do not have to change a thing to make that happen.', kind: 'house' },
  { n: '05', name: 'The grid', body: 'When the battery is full the rest goes out through the meter, and your supplier pays you for every unit of it.', kind: 'grid' },
];

type Roof = { roof: string; panels: string; kw: string; kwh: string; w: string; saving: string; payback: string };

const ROOFS: Roof[] = [
  { roof: 'Terrace, one south slope', panels: '8', kw: '3.4 kW', kwh: '3,100 kWh', w: '27%', saving: '$620', payback: '8.5 yrs' },
  { roof: 'Semi, facing south-west', panels: '12', kw: '5.0 kW', kwh: '4,450 kWh', w: '38%', saving: '$890', payback: '7.9 yrs' },
  { roof: 'Detached, east and west', panels: '16', kw: '6.8 kW', kwh: '5,600 kWh', w: '48%', saving: '$1,120', payback: '7.6 yrs' },
  { roof: 'Detached, facing south', panels: '18', kw: '7.6 kW', kwh: '7,100 kWh', w: '61%', saving: '$1,420', payback: '6.8 yrs' },
  { roof: 'Farmhouse or barn', panels: '30', kw: '12.6 kW', kwh: '11,600 kWh', w: '100%', saving: '$2,260', payback: '6.1 yrs' },
];

const ASSUMPTIONS = [
  ['Import price', '32c a unit, the Brightwater average this spring'],
  ['Export price', '15c a unit on a smart export tariff'],
  ['Used at home', 'Half without a battery, four fifths with one'],
  ['Not included', 'Grants, which shorten every payback on the list'],
];

type Pack = {
  kw: string;
  name: string;
  price: string;
  panels: string;
  year: string;
  gets: string[];
  battery: boolean;
};

const PACKS: Pack[] = [
  {
    kw: '4',
    name: 'Starter',
    price: '$6,900',
    panels: '10 panels',
    year: 'About 3,600 kWh a year',
    gets: ['Hybrid inverter, battery-ready', 'Scaffolding and bird mesh', 'The Sunward app', '10-year workmanship warranty'],
    battery: false,
  },
  {
    kw: '6',
    name: 'Family',
    price: '$8,900',
    panels: '14 panels',
    year: 'About 5,400 kWh a year',
    gets: ['Everything in Starter', 'Optimisers on every panel', 'An EV charger point fitted', 'First-year health check'],
    battery: false,
  },
  {
    kw: '8',
    name: 'Whole house',
    price: '$14,600',
    panels: '19 panels and a 10 kWh battery',
    year: 'About 7,200 kWh a year',
    gets: ['Everything in Family', '10 kWh battery, 10-year warranty', 'Backup circuit for a power cut', 'Smart tariff set up for you'],
    battery: true,
  },
];

const CASE_FIGURES = [
  ['7.6 kW', 'on the roof, 18 panels'],
  ['10 kWh', 'battery in the garage'],
  ['2 days', 'from scaffold up to switch on'],
  ['6,840 kWh', 'generated in the first year'],
  ['$1,530', 'off the year\'s bills'],
  ['2,310 kWh', 'sent to the grid and paid for'],
];

const MONTHS = [
  { m: 'J', h: '18%' },
  { m: 'F', h: '30%' },
  { m: 'M', h: '52%' },
  { m: 'A', h: '74%' },
  { m: 'M', h: '92%' },
  { m: 'J', h: '100%' },
  { m: 'J', h: '97%' },
  { m: 'A', h: '84%' },
  { m: 'S', h: '63%' },
  { m: 'O', h: '41%' },
  { m: 'N', h: '22%' },
  { m: 'D', h: '14%' },
];

type Grant = { amount: string; name: string; body: string };

const GRANTS: Grant[] = [
  { amount: '$2,500', name: 'Brightwater Home Energy Grant', body: 'From the county, for owner-occupied homes in council tax bands A to D. We apply for you and take it off the invoice.' },
  { amount: '0%', name: 'Green home loan', body: 'Over five years through Harbour Mutual, from $118 a month for the Starter package. No early repayment fee.' },
  { amount: '15c', name: 'Smart export payments', body: 'Every unit you send to the grid, paid by your supplier. We register the meter and send the certificate.' },
  { amount: '10%', name: 'Pay in three', body: 'A tenth to book, most of it on the day we switch on, and the last 30% after a month of watching it work.' },
];

const SURVEY_STEPS = [
  'We look at the roof with a drone and at the fuse board with a torch.',
  'We read a year of your bills, if you have them to hand.',
  'You get a drawing and a written quote within three working days.',
  'Nothing is booked until you say so. The survey is free either way.',
];

export default function SunwardSolarPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--white': '#f6f7f2',
        '--navy': '#152238',
        '--sun': '#f5b82e',
        '--green': '#3a9a5b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="white,navy,sun,green"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Geologica:wght@300..800&family=Reddit+Mono:wght@400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markSun} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Sunward Solar</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#survey">Book a survey</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The pitch and a live dashboard on the left; on the right an array
            filling with light, and the sun's paths over Brightwater. */}
        <section className={s.hero} aria-labelledby="sw-hero-h">
          <div className={s.heroText}>
            <p data-edit="swHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Solar panels and home batteries, Brightwater</p>
            <h1 data-edit="swHero.name" data-edit-max="70" id="sw-hero-h" className={s.name}>Put the roof to work.</h1>
            <p data-edit="swHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              We survey, design, fit and look after solar panels and batteries
              for homes within 40 miles of Brightwater. One team from the first
              ladder to the last cable, and an app that shows you every
              kilowatt-hour.
            </p>
            <div className={s.heroActions}>
              <a data-edit="swHero.btn" data-edit-max="28" className={s.btn} href="#survey">Book a free survey</a>
              <a data-edit="swHero.btnLine" data-edit-max="28" className={s.btnLine} href="#savings">What could I save?</a>
            </div>

            <div className={s.dash}>
              <div className={s.dashHead}>
                <p data-edit="swHero.dashTitle" data-edit-max="240" data-edit-multiline className={s.dashTitle}>Linden Row, 18 panels</p>
                <p data-edit="swHero.dashLive" data-edit-max="240" data-edit-multiline className={s.dashLive}>Live, Tuesday 14:20</p>
              </div>
              <ul className={s.tiles}>
                {TILES.map((t, i) => (
                  <li key={t.label} className={s.tile}>
                    <p data-edit={`swHero.tileLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.tileLabel}>{t.label}</p>
                    <p className={s.tileValue}>
                      <strong data-edit={`swHero.emphasis.${i}`}>{t.value}</strong>
                      <span data-edit={`swHero.text.${i}`} data-edit-max="60">{t.unit}</span>
                    </p>
                    <p data-edit={`swHero.tileNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tileNote}>{t.note}</p>
                  </li>
                ))}
                <li className={`${s.tile} ${s.tileWeek}`}>
                  <p data-edit="swHero.tileLabel2" data-edit-max="240" data-edit-multiline className={s.tileLabel}>This week, kWh</p>
                  <ol className={s.week}>
                    {WEEK.map((d, i) => (
                      <li key={`${d.day}-${i}`} style={{ '--h': d.h } as React.CSSProperties}>
                        <span className={s.weekBar} title={`${d.kwh} kWh`} />
                        <span data-edit={`swHero.weekDay.${i}`} data-edit-max="60" className={s.weekDay}>{d.day}</span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>
            </div>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="swHero.field" data-edit-roles="transparent,2,0,2,3,2" className={s.array} aria-hidden="true">
              <TabbiedPattern
                pattern={diminuendo}
                palette={ARRAY}
                fit="grid"
                cellSize={48}
                seed="sunward-array"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figure className={s.sunPath}>
              <svg className={s.chart} viewBox="0 0 400 400" role="img" aria-labelledby="sw-chart-t">
                <title id="sw-chart-t">Sun-path chart for Brightwater: the sun&apos;s track across the sky on 21 June, at the equinoxes and on 21 December</title>
                <circle className={s.chartFace} cx="200" cy="200" r="150" />
                <circle className={s.chartRing} cx="200" cy="200" r="100" />
                <circle className={s.chartRing} cx="200" cy="200" r="50" />
                <line className={s.chartAxis} x1="200" y1="50" x2="200" y2="350" />
                <line className={s.chartAxis} x1="50" y1="200" x2="350" y2="200" />
                <path className={s.chartRoof} d="M200 200 L 125 330 A 150 150 0 0 0 275 330 Z" />
                {BEARINGS.map((b) => (
                  <g key={b.deg}>
                    <line className={s.chartTick} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
                    <text className={b.cardinal ? s.chartCardinal : s.chartDeg} x={b.tx} y={b.ty} textAnchor="middle">{b.label}</text>
                  </g>
                ))}
                <text className={s.chartAlt} x="204" y="97">30</text>
                <text className={s.chartAlt} x="204" y="147">60</text>
                {SUN_PATHS.map((p) => (
                  <g key={p.id} className={s[`path_${p.id}`]}>
                    <path className={s.chartCase} d={p.d} />
                    <path className={s.chartPath} d={p.d} />
                    {p.hours.map(([x, y]) => (
                      <circle key={`${x}-${y}`} className={s.chartHour} cx={x} cy={y} r="3.2" />
                    ))}
                  </g>
                ))}
                <circle className={s.chartHome} cx="200" cy="200" r="6" />
              </svg>
              <figcaption className={s.legend}>
                <p data-edit="swHero.legendTitle" data-edit-max="240" data-edit-multiline className={s.legendTitle}>The sun over Brightwater</p>
                <ul className={s.legendList}>
                  {SUN_PATHS.map((p, i) => (
                    <li key={p.id} className={s[`key_${p.id}`]}>
                      <span data-edit={`swHero.legendLabel.${i}`} data-edit-max="60" className={s.legendLabel}>{p.label}</span>
                      <span data-edit={`swHero.legendNote.${i}`} data-edit-max="60" className={s.legendNote}>{p.note}</span>
                    </li>
                  ))}
                </ul>
                <p data-edit="swHero.legendRoof" data-edit-max="240" data-edit-multiline className={s.legendRoof}>Shaded wedge: what a south-facing roof sees best.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* -------------------------------------------------------- DAY/NIGHT
            The same house twice: at noon and at nine in the evening. */}
        <section id="day" className={s.sec} aria-labelledby="sw-day-h">
          <div className={s.secHead}>
            <p data-edit="day.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>01</p>
            <h2 data-edit="day.secTitle" data-edit-max="60" id="sw-day-h" className={s.secTitle}>One roof, from noon to nine</h2>
            <p data-edit="day.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The 8 kW Whole house package on a family home in Brightwater, on
              an ordinary day in May. The panels make more than the house needs
              at lunchtime; the battery keeps the surplus for the evening.
            </p>
          </div>
          <div className={s.moments}>
            <figure className={`${s.moment} ${s.noon}`}>
              <div className={s.momentSky}>
                <div data-edit-pattern="day.field" data-edit-roles="transparent,2,0,2,0" className={s.rays} aria-hidden="true">
                  <TabbiedPattern
                    pattern={sunray}
                    palette={RAYS}
                    options={{ frequency: 0.5 }}
                    fit="grid"
                    cellSize={44}
                    seed="sunward-noon"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit="day.clock" data-edit-max="240" data-edit-multiline className={s.clock}>12:00</p>
                <Artwork
                  slug="sunward-solar-house"
                  alt="The house at noon: solar panels on the roof in full sun, the car charging in the drive"
                  inks={{ red: 'var(--wall-day)', blue: 'var(--navy)', yellow: 'var(--sun)', black: 'var(--green)' }}
                  className={s.house}
                />
              </div>
              <figcaption className={s.momentCap}>
                <p data-edit="day.momentTitle" data-edit-max="240" data-edit-multiline className={s.momentTitle}>Noon: the panels are generating</p>
                <dl className={s.momentStats}>
                  {NOON.map((m, i) => (
                    <div key={m.label}>
                      <dt data-edit={`day.term.${i}`} data-edit-max="28">{m.label}</dt>
                      <dd data-edit={`day.body.${i}`} data-edit-max="200" data-edit-multiline>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </figcaption>
            </figure>

            <figure className={`${s.moment} ${s.night}`}>
              <div className={s.momentSky}>
                <div data-edit-pattern="day.field2" data-edit-roles="transparent,0,2,0" className={s.stars} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dotfield}
                    palette={STARS}
                    options={{ frequency: 0.4 }}
                    fit="grid"
                    cellSize={40}
                    seed="sunward-night"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit="day.clock2" data-edit-max="240" data-edit-multiline className={s.clock}>21:00</p>
                <Artwork
                  slug="sunward-solar-house"
                  alt="The same house at night: the windows lit, the battery running the house"
                  inks={{ red: 'var(--wall-night)', blue: 'var(--roof-night)', yellow: 'var(--sun)', black: 'var(--tree-night)' }}
                  className={s.house}
                />
              </div>
              <figcaption className={s.momentCap}>
                <p data-edit="day.momentTitle2" data-edit-max="240" data-edit-multiline className={s.momentTitle}>9 pm: the battery runs the house</p>
                <dl className={s.momentStats}>
                  {NIGHT.map((m, i) => (
                    <div key={m.label}>
                      <dt data-edit={`day.term2.${i}`} data-edit-max="28">{m.label}</dt>
                      <dd data-edit={`day.body2.${i}`} data-edit-max="200" data-edit-multiline>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW
            Five boxes on a panel of cells, joined by the cable they share. */}
        <section id="how" className={s.how} aria-labelledby="sw-how-h">
          <div className={s.howInner}>
            <div className={s.secHead}>
              <p data-edit="how.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>02</p>
              <h2 data-edit="how.secTitle" data-edit-max="60" id="sw-how-h" className={s.secTitle}>How it works</h2>
              <p data-edit="how.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Five pieces of kit, one cable run, and the house decides for
                itself where each unit of power comes from.
              </p>
            </div>
            <ol className={s.flow}>
              {STEPS.map((st, i) => (
                <li key={st.n} className={s.node}>
                  <span className={`${s.icon} ${s[`icon_${st.kind}`]}`} aria-hidden="true">
                    <span />
                  </span>
                  <p data-edit={`how.nodeNum.${i}`} data-edit-max="240" data-edit-multiline className={s.nodeNum}>{st.n}</p>
                  <h3 data-edit={`how.nodeName.${i}`} data-edit-max="40" className={s.nodeName}>{st.name}</h3>
                  <p data-edit={`how.nodeBody.${i}`} data-edit-max="240" data-edit-multiline className={s.nodeBody}>{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- SAVINGS */}
        <section id="savings" className={s.sec} aria-labelledby="sw-save-h">
          <div className={s.secHead}>
            <p data-edit="savings.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>03</p>
            <h2 data-edit="savings.secTitle" data-edit-max="60" id="sw-save-h" className={s.secTitle}>What could you save?</h2>
            <p data-edit="savings.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Five real roofs we quoted this year, from a terrace to a barn,
              with a battery on each. Your own figures come from the survey.
            </p>
          </div>
          <div className={s.saveGrid}>
            <div className={s.tableWrap}>
              <table className={s.roofs}>
                <caption data-edit="savings.srOnly" className={s.srOnly}>Example systems by roof: panels, size, yearly generation, yearly saving and payback</caption>
                <thead>
                  <tr>
                    <th data-edit="savings.heading" scope="col">Roof</th>
                    <th data-edit="savings.num" scope="col" className={s.num}>Panels</th>
                    <th data-edit="savings.num2" scope="col" className={s.num}>System</th>
                    <th data-edit="savings.genCol" scope="col" className={s.genCol}>Generation a year</th>
                    <th data-edit="savings.num3" scope="col" className={s.num}>Saving a year</th>
                    <th data-edit="savings.num4" scope="col" className={s.num}>Payback</th>
                  </tr>
                </thead>
                <tbody>
                  {ROOFS.map((r, i) => (
                    <tr key={r.roof}>
                      <th data-edit={`savings.heading2.${i}`} scope="row">{r.roof}</th>
                      <td className={`${s.num} ${s.cPanels}`}>
                        <span data-edit={`savings.cellLabel.${i}`} data-edit-max="60" className={s.cellLabel}>Panels</span>
                        {r.panels}
                      </td>
                      <td className={`${s.num} ${s.cSystem}`}>
                        <span data-edit={`savings.cellLabel2.${i}`} data-edit-max="60" className={s.cellLabel}>System</span>
                        {r.kw}
                      </td>
                      <td className={s.genCol}>
                        <span className={s.gen} style={{ '--w': r.w } as React.CSSProperties}>
                          <span className={s.genBar} />
                          <span data-edit={`savings.genNum.${i}`} data-edit-max="60" className={s.genNum}>{r.kwh}</span>
                        </span>
                      </td>
                      <td className={`${s.num} ${s.saving}`}>
                        <span data-edit={`savings.cellLabel3.${i}`} data-edit-max="60" className={s.cellLabel}>Saving</span>
                        {r.saving}
                      </td>
                      <td className={`${s.num} ${s.cPayback}`}>
                        <span data-edit={`savings.cellLabel4.${i}`} data-edit-max="60" className={s.cellLabel}>Payback</span>
                        {r.payback}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <aside className={s.assume} aria-labelledby="sw-assume-h">
              <div data-edit-pattern="swAssume.field" data-edit-roles="1,2,3,0,2" className={s.sheet} aria-hidden="true">
                <TabbiedPattern
                  pattern={perforate}
                  palette={SHEET}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={30}
                  seed="sunward-sheet"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.assumeCard}>
                <h3 data-edit="swAssume.assumeTitle" data-edit-max="40" id="sw-assume-h" className={s.assumeTitle}>How we worked it out</h3>
                <dl className={s.assumeList}>
                  {ASSUMPTIONS.map(([term, text], i) => (
                    <div key={term}>
                      <dt data-edit={`swAssume.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`swAssume.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="sw-pack-h">
          <div className={s.secHead}>
            <p data-edit="packages.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>04</p>
            <h2 data-edit="packages.secTitle" data-edit-max="60" id="sw-pack-h" className={s.secTitle}>Three packages</h2>
            <p data-edit="packages.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Fixed prices for a normal pitched roof, fitted and switched on.
              Flat roofs, slate and listed buildings are quoted after the
              survey.
            </p>
          </div>
          <ul className={s.packs}>
            {PACKS.map((p, i) => (
              <li key={p.kw} className={`${s.pack} ${p.battery ? s.packBig : ''}`}>
                <div className={s.packPanel}>
                  <p className={s.packKw}>
                    <strong data-edit={`packages.emphasis.${i}`}>{p.kw}</strong>
                    <span data-edit={`packages.text.${i}`} data-edit-max="60">kW</span>
                  </p>
                  <p data-edit={`packages.packPanels.${i}`} data-edit-max="240" data-edit-multiline className={s.packPanels}>{p.panels}</p>
                  {p.battery ? <p data-edit={`packages.packFlag.${i}`} data-edit-max="240" data-edit-multiline className={s.packFlag}>With battery</p> : null}
                </div>
                <div className={s.packBody}>
                  <h3 data-edit={`packages.packName.${i}`} data-edit-max="40" className={s.packName}>{p.name}</h3>
                  <p data-edit={`packages.packYear.${i}`} data-edit-max="240" data-edit-multiline className={s.packYear}>{p.year}</p>
                  <ul className={s.packGets}>
                    {p.gets.map((g, i2) => (
                      <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={g}>{g}</li>
                    ))}
                  </ul>
                  <p className={s.packPrice}>
                    <strong data-edit={`packages.emphasis2.${i}`}>{p.price}</strong>
                    <span data-edit={`packages.text2.${i}`} data-edit-max="60">fitted, before grants</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div data-edit-pattern="packages.field" data-edit-roles="1,2,0,3,2" className={s.band} aria-hidden="true">
            <TabbiedPattern
              pattern={diminuendo}
              palette={BAND}
              fit="grid"
              cellSize={32}
              seed="sunward-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* --------------------------------------------------------- INSTALL */}
        <section id="install" className={s.sec} aria-labelledby="sw-install-h">
          <div className={s.caseGrid}>
            <div className={s.caseText}>
              <p data-edit="install.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>05</p>
              <h2 data-edit="install.secTitle" data-edit-max="60" id="sw-install-h" className={s.secTitle}>A recent install: 18 panels on Linden Row</h2>
              <p data-edit="install.caseLede" data-edit-max="240" data-edit-multiline className={s.caseLede}>
                A four-bedroom house with a south-west roof, a heat pump and an
                electric car, fitted last April. This is its first full year,
                read straight off the app.
              </p>
              <dl className={s.caseFigures}>
                {CASE_FIGURES.map(([value, what], i) => (
                  <div key={what}>
                    <dt data-edit={`install.term.${i}`} data-edit-max="28">{value}</dt>
                    <dd data-edit={`install.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
              <blockquote className={s.quote}>
                <p data-edit="install.body2" data-edit-max="240" data-edit-multiline>
                  We watch the app like the weather now. From April to
                  September the car has not taken a unit from the grid.
                </p>
                <cite data-edit="install.attribution" data-edit-max="48">Adaeze and Tom Okafor, Linden Row</cite>
              </blockquote>
            </div>
            <div className={s.caseSide}>
              <div data-edit-pattern="install.field" data-edit-roles="1,3,2,0,1" className={s.roofView} aria-hidden="true">
                <TabbiedPattern
                  pattern={centroid}
                  palette={ROOF}
                  fit="grid"
                  cellSize={36}
                  seed="sunward-roof"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.monthly}>
                <p data-edit="install.tileLabel" data-edit-max="240" data-edit-multiline className={s.tileLabel}>Generation by month, first year</p>
                <ol className={s.months}>
                  {MONTHS.map((m, i) => (
                    <li key={`${m.m}-${i}`} style={{ '--h': m.h } as React.CSSProperties}>
                      <span className={s.monthBar} />
                      <span data-edit={`install.monthName.${i}`} data-edit-max="60" className={s.monthName}>{m.m}</span>
                    </li>
                  ))}
                </ol>
                <p data-edit="install.monthNote" data-edit-max="240" data-edit-multiline className={s.monthNote}>June best at 1,020 kWh; December 140 kWh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- GRANTS */}
        <section id="grants" className={s.sec} aria-labelledby="sw-grants-h">
          <div className={s.secHead}>
            <p data-edit="grants.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>06</p>
            <h2 data-edit="grants.secTitle" data-edit-max="60" id="sw-grants-h" className={s.secTitle}>Grants and financing</h2>
            <p data-edit="grants.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Most of our customers use at least one of these. We check which
              you qualify for at the survey and do the paperwork.
            </p>
          </div>
          <ul className={s.grants}>
            {GRANTS.map((g, i) => (
              <li key={g.name} className={s.grant}>
                <p data-edit={`grants.grantAmount.${i}`} data-edit-max="240" data-edit-multiline className={s.grantAmount}>{g.amount}</p>
                <h3 data-edit={`grants.grantName.${i}`} data-edit-max="40" className={s.grantName}>{g.name}</h3>
                <p data-edit={`grants.grantBody.${i}`} data-edit-max="240" data-edit-multiline className={s.grantBody}>{g.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- SURVEY */}
        <section id="survey" className={s.survey} aria-labelledby="sw-survey-h">
          <div className={s.surveyInner}>
            <div className={s.surveyText}>
              <p data-edit="survey.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>07</p>
              <h2 data-edit="survey.secTitle" data-edit-max="60" id="sw-survey-h" className={s.secTitle}>Book a survey</h2>
              <p data-edit="survey.surveyLede" data-edit-max="240" data-edit-multiline className={s.surveyLede}>
                Forty-five minutes at your house with one of our designers. We
                come out Monday to Saturday, and in the evening if that suits.
              </p>
              <ol className={s.surveySteps}>
                {SURVEY_STEPS.map((step, i) => (
                  <li data-edit={`survey.item.${i}`} data-edit-max="80" key={step}>{step}</li>
                ))}
              </ol>
              <p data-edit="survey.surveyAddr" data-edit-max="240" data-edit-multiline className={s.surveyAddr}>Sunward Solar, 5 Enterprise Way, Brightwater</p>
              <p className={s.surveyContact}>
                <a data-edit="survey.link" data-edit-max="28" href="tel:+15550186420">(555) 018-6420</a>
              </p>
              <p className={s.surveyContact}>
                <a data-edit="survey.link2" data-edit-max="28" href="mailto:hello@sunward.example">hello@sunward.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="survey.label" htmlFor="sw-name">Name</label>
                  <input id="sw-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="survey.label2" htmlFor="sw-phone">Phone</label>
                  <input id="sw-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="survey.label3" htmlFor="sw-email">Email</label>
                  <input id="sw-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="survey.label4" htmlFor="sw-address">Address and postcode</label>
                  <input id="sw-address" name="address" type="text" autoComplete="street-address" />
                </div>
                <div className={s.field}>
                  <label data-edit="survey.label5" htmlFor="sw-facing">Main roof faces</label>
                  <select id="sw-facing" name="facing" defaultValue="south">
                    <option value="south">South</option>
                    <option value="south-west">South-west or south-east</option>
                    <option value="east-west">East and west</option>
                    <option value="unsure">Not sure</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="survey.label6" htmlFor="sw-bill">Monthly electricity bill</label>
                  <select id="sw-bill" name="bill" defaultValue="100">
                    <option value="60">Under $60</option>
                    <option value="100">$60-$120</option>
                    <option value="180">$120-$200</option>
                    <option value="250">Over $200</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="survey.label7" htmlFor="sw-when">Best time for a visit</label>
                  <input id="sw-when" name="when" type="text" />
                </div>
                <div className={`${s.check} ${s.fieldWide}`}>
                  <input id="sw-battery" name="battery" type="checkbox" />
                  <label data-edit="survey.label8" htmlFor="sw-battery">I would like a battery quoted too</label>
                </div>
              </div>
              <button data-edit="survey.btn" data-edit-max="24" className={s.btn} type="submit">Book my free survey</button>
              <p data-edit="survey.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We ring within one working day to fix a time.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,0,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={diminuendo}
            palette={DUSK}
            fit="grid"
            cellSize={36}
            seed="sunward-dusk"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <span className={s.markSun} aria-hidden="true" />
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Sunward Solar</p>
          </div>
          <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>5 Enterprise Way, Brightwater. Open Monday to Friday 08:00-17:30, Saturday 09:00-13:00.</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional solar installer; the roofs, figures, grants and prices are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The house is a generated image, drawn twice in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
