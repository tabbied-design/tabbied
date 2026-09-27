import { TabbiedPattern } from 'tabbied/react';
import { peppering, speckfield, dustfall, bokeh } from 'tabbied/patterns';
import s from './pollen-count-allergy.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Pollen Count Allergy Clinic: Allergy testing and treatment, Hayfield',
  description:
    'The allergy clinic at 9 Meadow Court, Hayfield, with the valley pollen count every morning at six: skin prick, blood and patch tests, immunotherapy by tablet or injection, and a pollen calendar for the year.',
};

/* Site colors. The pollen cloud, the skin, the settling dust and the
   weather symbols all run over a transparent ground. */
const SKY = '#eaf2f4';
const NAVY = '#13293d';
const POLLEN = '#f2c12e';
const GRASS = '#58a14e';
const ALERT = '#e4572e';

const CLOUD = ['transparent', POLLEN, ALERT, POLLEN, GRASS, POLLEN];
const SKIN = ['transparent', NAVY, ALERT, NAVY, GRASS];
const SETTLE = ['transparent', NAVY, GRASS, NAVY, POLLEN];
const GLINTS = ['transparent', POLLEN, GRASS, POLLEN, ALERT];
const DRIFT = ['transparent', POLLEN, SKY, ALERT, POLLEN];

const NAV = [
  ['Forecast', '#forecast'],
  ['Testing', '#testing'],
  ['Immunotherapy', '#immuno'],
  ['Calendar', '#calendar'],
  ['Tips', '#tips'],
  ['Fees', '#fees'],
];

type Town = {
  name: string;
  count: string;
  level: string;
  lv: string;
  cls: string;
};

const TOWNS: Town[] = [
  { name: 'Upper Barley', count: '131', level: 'Very high', lv: 'lvVhigh', cls: 'tBarley' },
  { name: 'Hayfield', count: '94', level: 'High', lv: 'lvHigh', cls: 'tHay' },
  { name: 'Meadow End', count: '58', level: 'Moderate', lv: 'lvMod', cls: 'tMeadow' },
  { name: 'Rushmoor', count: '41', level: 'Moderate', lv: 'lvMod', cls: 'tRush' },
  { name: 'Coldwater Bay', count: '12', level: 'Low', lv: 'lvLow', cls: 'tBay' },
];

const LEGEND = [
  ['Low', 'lvLow', 'under 30'],
  ['Moderate', 'lvMod', '30-79'],
  ['High', 'lvHigh', '80-119'],
  ['Very high', 'lvVhigh', '120 and up'],
];

const TODAY = [
  ['Weed', '61'],
  ['Grass', '27'],
  ['Tree', '6'],
];

type Day = {
  day: string;
  date: string;
  weather: string;
  overall: string;
  lv: string;
  rows: string[][];
};

const FIVE_DAY: Day[] = [
  { day: 'Thu', date: '20 Aug', weather: 'Sunny, 26C', overall: 'High', lv: 'lvHigh', rows: [['Tree', 'Low', 'lvLow'], ['Grass', 'Mod', 'lvMod'], ['Weed', 'High', 'lvHigh']] },
  { day: 'Fri', date: '21 Aug', weather: 'Sun, a warm wind, 27C', overall: 'Very high', lv: 'lvVhigh', rows: [['Tree', 'Low', 'lvLow'], ['Grass', 'Mod', 'lvMod'], ['Weed', 'V high', 'lvVhigh']] },
  { day: 'Sat', date: '22 Aug', weather: 'Showers, 21C', overall: 'Moderate', lv: 'lvMod', rows: [['Tree', 'Low', 'lvLow'], ['Grass', 'Low', 'lvLow'], ['Weed', 'Mod', 'lvMod']] },
  { day: 'Sun', date: '23 Aug', weather: 'Rain all day, 18C', overall: 'Low', lv: 'lvLow', rows: [['Tree', 'Low', 'lvLow'], ['Grass', 'Low', 'lvLow'], ['Weed', 'Low', 'lvLow']] },
  { day: 'Mon', date: '24 Aug', weather: 'Cloud clearing, 22C', overall: 'High', lv: 'lvHigh', rows: [['Tree', 'Low', 'lvLow'], ['Grass', 'Mod', 'lvMod'], ['Weed', 'High', 'lvHigh']] },
];

type Test = {
  name: string;
  time: string;
  result: string;
  price: string;
  what: string;
  note: string;
};

const TESTS: Test[] = [
  {
    name: 'Skin prick test',
    time: '20 minutes',
    result: 'Results in the room',
    price: '$180',
    what: 'A drop of each allergen on your forearm and a tiny prick through it. A raised bump after fifteen minutes means your body has noticed.',
    note: 'Stop antihistamines five days before.',
  },
  {
    name: 'Blood test',
    time: '10 minutes',
    result: 'Results in a week',
    price: '$220',
    what: 'Specific IgE for up to twelve allergens from one small sample. For eczema, for anyone who cannot stop antihistamines, and for small children.',
    note: 'No need to stop any medicine.',
  },
  {
    name: 'Patch test',
    time: 'Three visits in a week',
    result: 'Read at 48 and 96 hours',
    price: '$260',
    what: 'For rashes rather than sneezes: small patches taped to your back to find what your skin reacts to, from nickel to hair dye.',
    note: 'Keep your back dry for the week.',
  },
];

/* A skin prick panel as it looks at fifteen minutes. */
const WHEALS = [
  { n: '1', name: 'Birch', size: '6 mm', cls: 'w3' },
  { n: '2', name: 'Oak', size: '3 mm', cls: 'w1' },
  { n: '3', name: 'Timothy grass', size: '8 mm', cls: 'w4' },
  { n: '4', name: 'Ragweed', size: '5 mm', cls: 'w2' },
  { n: '5', name: 'Cat', size: 'none', cls: 'w0' },
  { n: '6', name: 'Dust mite', size: '3 mm', cls: 'w1' },
  { n: '7', name: 'Histamine, control', size: '5 mm', cls: 'w2' },
  { n: '8', name: 'Saline, control', size: 'none', cls: 'w0' },
];

type Treatment = {
  name: string;
  for: string;
  how: string;
  cost: string;
};

const TREATMENTS: Treatment[] = [
  {
    name: 'Tablets under the tongue',
    for: 'Grass or tree pollen, house dust mite',
    how: 'One tablet a day at home, starting twelve weeks before the season, every day for three years. The first one is taken here, with half an hour to watch.',
    cost: '$95 a month, covered by most insurers',
  },
  {
    name: 'Injections',
    for: 'Grass, tree and weed pollen; bee and wasp venom',
    how: 'Weekly for sixteen weeks while the dose builds, then once a month for three years. A minute for the injection, then an hour in the chair while we watch.',
    cost: '$85 a visit',
  },
];

const SCORES = [
  { when: 'Before', score: '9', cls: 'b9', note: 'Your worst summer' },
  { when: 'Year 1', score: '6', cls: 'b6', note: 'Most people notice' },
  { when: 'Year 2', score: '4', cls: 'b4', note: 'Fewer tablets of your own' },
  { when: 'Year 3', score: '3', cls: 'b3', note: 'Lasts years after' },
];

type Plate = {
  slug: string;
  alt: string;
  name: string;
  latin: string;
  season: string;
  mag: string;
};

const PLATES: Plate[] = [
  { slug: 'pollen-count-allergy-birch', alt: 'A birch pollen grain under the microscope: round, stippled, with three pores', name: 'Birch', latin: 'Betula pendula', season: 'Trees, March to May', mag: 'x 1200' },
  { slug: 'pollen-count-allergy-oak', alt: 'An oak pollen grain: warty all over, split by three furrows', name: 'Oak', latin: 'Quercus robur', season: 'Trees, April to June', mag: 'x 1100' },
  { slug: 'pollen-count-allergy-grass', alt: 'A grass pollen grain: an oval with a single pore near one end', name: 'Grass', latin: 'Phleum pratense', season: 'Grasses, May to August', mag: 'x 900' },
  { slug: 'pollen-count-allergy-ragweed', alt: 'A ragweed pollen grain: a ball covered in short sharp spikes', name: 'Ragweed', latin: 'Ambrosia artemisiifolia', season: 'Weeds, July to October', mag: 'x 1500' },
];

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

type CalRow = {
  name: string;
  kind: string;
  levels: string[];
};

const CAL: CalRow[] = [
  { name: 'Birch', kind: 'Tree', levels: ['c0', 'c0', 'c1', 'c3', 'c3', 'c1', 'c0', 'c0', 'c0', 'c0', 'c0', 'c0'] },
  { name: 'Oak', kind: 'Tree', levels: ['c0', 'c0', 'c0', 'c1', 'c3', 'c2', 'c0', 'c0', 'c0', 'c0', 'c0', 'c0'] },
  { name: 'Grass', kind: 'Grass', levels: ['c0', 'c0', 'c0', 'c0', 'c2', 'c3', 'c3', 'c2', 'c1', 'c0', 'c0', 'c0'] },
  { name: 'Nettle', kind: 'Weed', levels: ['c0', 'c0', 'c0', 'c0', 'c1', 'c2', 'c2', 'c2', 'c1', 'c0', 'c0', 'c0'] },
  { name: 'Ragweed', kind: 'Weed', levels: ['c0', 'c0', 'c0', 'c0', 'c0', 'c0', 'c1', 'c3', 'c3', 'c1', 'c0', 'c0'] },
  { name: 'Mould spores', kind: 'Other', levels: ['c0', 'c0', 'c0', 'c0', 'c0', 'c1', 'c2', 'c2', 'c3', 'c3', 'c1', 'c0'] },
];

const LEVEL_WORDS: Record<string, string> = {
  c0: 'None',
  c1: 'Low',
  c2: 'Moderate',
  c3: 'High',
};

const TIPS = [
  ['Check at six', 'The count goes up here every morning at 06:00. On a high day, run in the evening instead.'],
  ['Wraparound glasses', 'Big sunglasses keep more pollen out of your eyes than any drop can.'],
  ['Balm at the door', 'A smear of petroleum jelly round the nostrils catches grains before they get in.'],
  ['Shower at night', 'Rinse the day out of your hair and leave the day\'s clothes outside the bedroom.'],
  ['Windows shut, 10 to 4', 'The count peaks late morning and again in the afternoon. Air the house early.'],
  ['Laundry indoors', 'Sheets dried on the line come back dusted with whatever is flowering.'],
];

const FEES = [
  ['First consultation, 45 minutes', '$160'],
  ['Skin prick test, up to 12 allergens', '$180'],
  ['Blood test, specific IgE', '$220'],
  ['Patch test, three visits', '$260'],
  ['Immunotherapy review', '$90'],
  ['Injection visit', '$85'],
];

const REFERRALS = [
  ['From your doctor', 'A letter helps, but you do not need one to book.'],
  ['Insurance', 'Meadowlands Health, Harvest Mutual and Blue Harbor pay us directly.'],
  ['Children', 'From age four, with a parent in the room for every test.'],
  ['Emergencies', 'We do not treat anaphylaxis here. Use your pen and call 911.'],
];

const HOURS = [
  ['Monday to Friday', '8:00-18:00'],
  ['Saturday', '8:00-12:00'],
  ['The count', 'Every day, 06:00'],
];

export default function PollenCountAllergyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sky': '#eaf2f4',
        '--navy': '#13293d',
        '--pollen': '#f2c12e',
        '--grass': '#58a14e',
        '--alert': '#e4572e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sky,navy,pollen,grass,alert"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600;1,700;1,800&family=Red+Hat+Text:ital,wght@0,400..700;1,400..700&family=Red+Hat+Mono:wght@400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDial} aria-hidden="true" />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Pollen Count</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Allergy Clinic</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book a test</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
          <a data-edit="bar.book" data-edit-max="28" href="#book">Book a test</a>
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------- HERO */}
        <section id="forecast" className={s.hero} aria-labelledby="pc-hero-h">
          <Artwork
            slug="pollen-count-allergy-ragweed"
            alt=""
            inks={['color-mix(in oklab, var(--text) 8%, transparent)']}
            className={s.heroGrain}
          />

          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <p className={s.onAir}>
                <span data-edit="forecast.live" data-edit-max="60" className={s.live}>Live</span>
                <span data-edit="forecast.text" data-edit-max="60">Pollen watch, Thursday 20 August, 06:00</span>
              </p>
              <h1 data-edit="forecast.title" data-edit-max="70" id="pc-hero-h" className={s.title}>Pollen Count Allergy Clinic</h1>
              <p data-edit="forecast.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Hayfield&apos;s allergy clinic, with the valley&apos;s pollen count
                on our roof every morning at six. Tests that find the cause,
                treatment that retrains your immune system, and a forecast you
                can plan a picnic by.
              </p>

              <div className={s.today}>
                <p data-edit="forecast.todayLabel" data-edit-max="240" data-edit-multiline className={s.todayLabel}>Hayfield today</p>
                <p className={s.todayCount}>
                  <strong data-edit="forecast.emphasis">94</strong>
                  <span data-edit="forecast.text2" data-edit-max="60">grains per cubic metre</span>
                </p>
                <p data-edit="forecast.levelChip" data-edit-max="240" data-edit-multiline className={`${s.levelChip} ${s.lvHigh}`}>High</p>
                <dl className={s.todaySplit}>
                  {TODAY.map(([kind, n], i) => (
                    <div key={kind}>
                      <dt data-edit={`forecast.term.${i}`} data-edit-max="28">{kind}</dt>
                      <dd data-edit={`forecast.body.${i}`} data-edit-max="200" data-edit-multiline>{n}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className={s.actions}>
                <a data-edit="forecast.btnSolid" data-edit-max="28" className={s.btnSolid} href="#book">Book an allergy test</a>
                <a data-edit="forecast.btnLine" data-edit-max="28" className={s.btnLine} href="#calendar">The pollen calendar</a>
              </div>
            </div>

            <div className={s.board}>
              <div className={s.screen}>
                <span className={s.landWest} aria-hidden="true" />
                <span className={s.landEast} aria-hidden="true" />
                <span className={s.landHills} aria-hidden="true" />
                <span className={s.river} aria-hidden="true" />
                <div data-edit-pattern="forecast.field" data-edit-roles="transparent,2,4,2,3,2" className={s.cloud} aria-hidden="true">
                  <TabbiedPattern
                    pattern={peppering}
                    palette={CLOUD}
                    options={{ frequency: 0.7 }}
                    fit="grid"
                    cellSize={40}
                    seed="pc-cloud"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit="forecast.mapTitle" data-edit-max="240" data-edit-multiline className={s.mapTitle}>Meadow Valley, this afternoon</p>
                <ul className={s.towns}>
                  {TOWNS.map((t, i) => (
                    <li key={t.name} className={`${s.town} ${s[t.cls]}`}>
                      <span className={`${s.dial} ${s[t.lv]}`} aria-hidden="true" />
                      <span data-edit={`forecast.townName.${i}`} data-edit-max="60" className={s.townName}>{t.name}</span>
                      <span data-edit={`forecast.townCount.${i}`} data-edit-max="60" className={s.townCount}>{t.count}</span>
                      <span data-edit={`forecast.townLevel.${i}`} data-edit-max="60" className={`${s.townLevel} ${s[t.lv]}`}>{t.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className={s.legend}>
                {LEGEND.map(([name, lv, range], i) => (
                  <li key={name}>
                    <span className={`${s.legendSwatch} ${s[lv]}`} aria-hidden="true" />
                    <span data-edit={`forecast.legendName.${i}`} data-edit-max="60" className={s.legendName}>{name}</span>
                    <span data-edit={`forecast.legendRange.${i}`} data-edit-max="60" className={s.legendRange}>{range}</span>
                  </li>
                ))}
              </ul>
              <p className={s.lowerThird}>
                <span data-edit="forecast.ltTag" data-edit-max="60" className={s.ltTag}>Pollen alert</span>
                <span data-edit="forecast.ltText" data-edit-max="60" className={s.ltText}>Ragweed high across the valley from midday. Tablets at breakfast, windows shut by ten.</span>
              </p>
            </div>
          </div>

          <div className={s.fiveDay}>
            <p data-edit="forecast.fiveHead" data-edit-max="240" data-edit-multiline className={s.fiveHead}>Five-day pollen forecast</p>
            <ol className={s.days}>
              {FIVE_DAY.map((d, i) => (
                <li key={d.day} className={s.dayCol}>
                  <p className={s.dayName}>
                    <strong data-edit={`forecast.emphasis2.${i}`}>{d.day}</strong>
                    <span data-edit={`forecast.text3.${i}`} data-edit-max="60">{d.date}</span>
                  </p>
                  <span className={`${s.dayDial} ${s[d.lv]}`} aria-hidden="true" />
                  <p data-edit={`forecast.dayOverall.${i}`} data-edit-max="240" data-edit-multiline className={s.dayOverall}>{d.overall}</p>
                  <p data-edit={`forecast.dayWeather.${i}`} data-edit-max="240" data-edit-multiline className={s.dayWeather}>{d.weather}</p>
                  <ul className={s.dayRows}>
                    {d.rows.map(([kind, level, lv], i2) => (
                      <li key={kind}>
                        <span data-edit={`forecast.dayKind.${i}.${i2}`} data-edit-max="60" className={s.dayKind}>{kind}</span>
                        <span data-edit={`forecast.tile.${i}.${i2}`} data-edit-max="60" className={`${s.tile} ${s[lv]}`}>{level}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- TESTING */}
        <section id="testing" className={s.sec} aria-labelledby="pc-test-h">
          <div className={s.secHead}>
            <p data-edit="testing.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Allergy testing</p>
            <h2 data-edit="testing.title" data-edit-max="60" id="pc-test-h">Find out what you are reacting to</h2>
            <p data-edit="testing.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Three tests, chosen at the first consultation by what your
              symptoms are and what you can stop taking. Most people need only
              the first.
            </p>
          </div>

          <div className={s.testGrid}>
            <ul className={s.tests}>
              {TESTS.map((t, i) => (
                <li key={t.name} className={s.test}>
                  <p className={s.testBand}>
                    <strong data-edit={`testing.emphasis.${i}`}>{t.name}</strong>
                    <span data-edit={`testing.text.${i}`} data-edit-max="60">{t.price}</span>
                  </p>
                  <div className={s.testBody}>
                    <p data-edit={`testing.testWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.testWhat}>{t.what}</p>
                    <dl className={s.testMeta}>
                      <div>
                        <dt data-edit={`testing.term.${i}`} data-edit-max="28">Takes</dt>
                        <dd data-edit={`testing.body.${i}`} data-edit-max="200" data-edit-multiline>{t.time}</dd>
                      </div>
                      <div>
                        <dt data-edit={`testing.term2.${i}`} data-edit-max="28">Results</dt>
                        <dd data-edit={`testing.body2.${i}`} data-edit-max="200" data-edit-multiline>{t.result}</dd>
                      </div>
                    </dl>
                    <p data-edit={`testing.testNote.${i}`} data-edit-max="240" data-edit-multiline className={s.testNote}>{t.note}</p>
                  </div>
                </li>
              ))}
            </ul>

            <figure className={s.armFig}>
              <div className={s.arm}>
                <div data-edit-pattern="testing.field" data-edit-roles="transparent,1,4,1,3" className={s.skin} aria-hidden="true">
                  <TabbiedPattern
                    pattern={speckfield}
                    palette={SKIN}
                    options={{ frequency: 0.45 }}
                    fit="grid"
                    cellSize={30}
                    seed="pc-skin"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <ol className={s.wheals} aria-hidden="true">
                  {WHEALS.map((w, i) => (
                    <li key={w.n}>
                      <span className={`${s.wheal} ${s[w.cls]}`} />
                      <span data-edit={`testing.whealNo.${i}`} data-edit-max="60" className={s.whealNo}>{w.n}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption className={s.armCap}>
                <p data-edit="testing.armTitle" data-edit-max="240" data-edit-multiline className={s.armTitle}>A forearm at fifteen minutes</p>
                <ol className={s.whealKey}>
                  {WHEALS.map((w, i) => (
                    <li key={w.n}>
                      <span data-edit={`testing.keyNo.${i}`} data-edit-max="60" className={s.keyNo}>{w.n}</span>
                      <span data-edit={`testing.keyName.${i}`} data-edit-max="60" className={s.keyName}>{w.name}</span>
                      <span data-edit={`testing.keySize.${i}`} data-edit-max="60" className={s.keySize}>{w.size}</span>
                    </li>
                  ))}
                </ol>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* -------------------------------------------------- IMMUNOTHERAPY */}
        <section id="immuno" className={s.sec} aria-labelledby="pc-immuno-h">
          <div className={s.secHead}>
            <p data-edit="immuno.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Immunotherapy</p>
            <h2 data-edit="immuno.title" data-edit-max="60" id="pc-immuno-h">The long-range forecast</h2>
            <p data-edit="immuno.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Small, steady doses of the pollen you react to teach your immune
              system to stop overreacting. It takes three years, and it lasts
              for years after you stop.
            </p>
          </div>

          <div className={s.immunoGrid}>
            <ul className={s.treatments}>
              {TREATMENTS.map((t, i) => (
                <li key={t.name} className={s.treatment}>
                  <h3 data-edit={`immuno.treatName.${i}`} data-edit-max="40" className={s.treatName}>{t.name}</h3>
                  <p data-edit={`immuno.treatFor.${i}`} data-edit-max="240" data-edit-multiline className={s.treatFor}>{t.for}</p>
                  <p data-edit={`immuno.treatHow.${i}`} data-edit-max="240" data-edit-multiline className={s.treatHow}>{t.how}</p>
                  <p data-edit={`immuno.treatCost.${i}`} data-edit-max="240" data-edit-multiline className={s.treatCost}>{t.cost}</p>
                </li>
              ))}
            </ul>

            <figure className={s.chart}>
              <p data-edit="immuno.chartTitle" data-edit-max="240" data-edit-multiline className={s.chartTitle}>Peak-season symptom score, out of 12</p>
              <div className={s.plot}>
                <div data-edit-pattern="immuno.field" data-edit-roles="transparent,1,3,1,2" className={s.settle} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dustfall}
                    palette={SETTLE}
                    options={{ frequency: 0.6 }}
                    fit="grid"
                    cellSize={30}
                    seed="pc-settle"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <ol className={s.bars}>
                  {SCORES.map((b, i) => (
                    <li key={b.when} className={s.barCol}>
                      <span className={`${s.barFill} ${s[b.cls]}`}>
                        <strong data-edit={`immuno.emphasis.${i}`}>{b.score}</strong>
                      </span>
                      <span data-edit={`immuno.barWhen.${i}`} data-edit-max="60" className={s.barWhen}>{b.when}</span>
                      <span data-edit={`immuno.barNote.${i}`} data-edit-max="60" className={s.barNote}>{b.note}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption data-edit="immuno.chartCap" data-edit-max="120" data-edit-multiline className={s.chartCap}>
                Average scores for 212 of our patients on grass tablets, 2021-2025.
                Your own forecast may vary.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------ CALENDAR */}
        <section id="calendar" className={s.sec} aria-labelledby="pc-cal-h">
          <div className={s.secHead}>
            <p data-edit="calendar.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>The pollen calendar</p>
            <h2 data-edit="calendar.title" data-edit-max="60" id="pc-cal-h">What is in the air, month by month</h2>
            <p data-edit="calendar.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The grains we count most in the Meadow Valley, as our microscope
              sees them, and when each one is flying.
            </p>
          </div>

          <ul className={s.plates}>
            {PLATES.map((p, i) => (
              <li key={p.slug}>
                <figure className={s.plateFig}>
                  <div className={s.scope}>
                    <Artwork slug={p.slug} alt={p.alt} inks={['var(--text)']} className={s.grain} />
                    <span className={s.cross} aria-hidden="true" />
                    <span data-edit={`calendar.scaleBar.${i}`} data-edit-max="60" className={s.scaleBar}>10 um</span>
                    <span data-edit={`calendar.mag.${i}`} data-edit-max="60" className={s.mag}>{p.mag}</span>
                  </div>
                  <figcaption className={s.plateCap}>
                    <strong data-edit={`calendar.emphasis.${i}`}>{p.name}</strong>
                    <em>{p.latin}</em>
                    <span data-edit={`calendar.text.${i}`} data-edit-max="60">{p.season}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className={s.calWrap}>
            <table className={s.cal}>
              <caption data-edit="calendar.srOnly" className={s.srOnly}>How much of each pollen is in the air in each month, from none to high</caption>
              <thead>
                <tr>
                  <th data-edit="calendar.calCorner" scope="col" className={s.calCorner}>Pollen</th>
                  {MONTHS.map((m, i) => (
                    <th data-edit={`calendar.calNow.${i}`} key={MONTH_KEYS[i]} scope="col" className={i === 7 ? s.calNow : undefined}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAL.map((row, i) => (
                  <tr key={row.name}>
                    <th scope="row">
                      <strong data-edit={`calendar.emphasis2.${i}`}>{row.name}</strong>
                      <span data-edit={`calendar.text2.${i}`} data-edit-max="60">{row.kind}</span>
                    </th>
                    {row.levels.map((l, i) => (
                      <td key={MONTH_KEYS[i]} className={`${s.calCell} ${s[l]}`}>
                        <span className={s.srOnly}>{LEVEL_WORDS[l]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={s.calKey}>
            <li data-edit="calendar.keyLow" data-edit-max="80" className={s.keyLow}>Low</li>
            <li data-edit="calendar.keyMod" data-edit-max="80" className={s.keyMod}>Moderate</li>
            <li data-edit="calendar.keyHigh" data-edit-max="80" className={s.keyHigh}>High</li>
            <li data-edit="calendar.keyNow" data-edit-max="80" className={s.keyNow}>This week</li>
          </ul>
        </section>

        {/* ---------------------------------------------------------- TIPS */}
        <section id="tips" className={s.sec} aria-labelledby="pc-tips-h">
          <div data-edit-pattern="tips.field" data-edit-roles="transparent,2,3,2,4" className={s.glints} aria-hidden="true">
            <TabbiedPattern
              pattern={bokeh}
              palette={GLINTS}
              options={{ frequency: 0.7 }}
              fit="grid"
              cellSize={44}
              seed="pc-glints"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.secHead}>
            <p data-edit="tips.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Hay fever tips</p>
            <h2 data-edit="tips.title" data-edit-max="60" id="pc-tips-h">Six things to do on a high day</h2>
            <p data-edit="tips.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              None of them replaces treatment, and all of them help. Our
              patients swear by the balm.
            </p>
          </div>

          <ol className={s.tips}>
            {TIPS.map(([title, text], i) => (
              <li key={title} className={s.tip}>
                <span className={s.warn} aria-hidden="true" />
                <h3 data-edit={`tips.tipTitle.${i}`} data-edit-max="40" className={s.tipTitle}>{title}</h3>
                <p data-edit={`tips.tipText.${i}`} data-edit-max="240" data-edit-multiline className={s.tipText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- FEES */}
        <section id="fees" className={s.sec} aria-labelledby="pc-fees-h">
          <div className={s.secHead}>
            <p data-edit="fees.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Referrals and fees</p>
            <h2 data-edit="fees.title" data-edit-max="60" id="pc-fees-h">No referral needed, no surprises</h2>
            <p data-edit="fees.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Book yourself in. We send a letter to your doctor after every
              visit, unless you would rather we did not.
            </p>
          </div>

          <div className={s.feesGrid}>
            <table className={s.fees}>
              <caption data-edit="fees.feesCap" className={s.feesCap}>Fees, before insurance</caption>
              <tbody>
                {FEES.map(([what, price], i) => (
                  <tr key={what}>
                    <th data-edit={`fees.heading.${i}`} scope="row">{what}</th>
                    <td data-edit={`fees.cell.${i}`}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className={s.referrals}>
              {REFERRALS.map(([term, text], i) => (
                <div key={term}>
                  <dt data-edit={`fees.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- BOOK */}
        <section id="book" className={s.sec} aria-labelledby="pc-book-h">
          <div className={s.studio}>
            <div data-edit-pattern="book.field" data-edit-roles="transparent,2,0,4,2" className={s.drift} aria-hidden="true">
              <TabbiedPattern
                pattern={peppering}
                palette={DRIFT}
                options={{ frequency: 0.6 }}
                fit="grid"
                cellSize={36}
                seed="pc-drift"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.studioText}>
              <p data-edit="book.secTagLight" data-edit-max="240" data-edit-multiline className={s.secTagLight}>Book</p>
              <h2 data-edit="book.studioTitle" data-edit-max="60" id="pc-book-h" className={s.studioTitle}>Book an appointment</h2>
              <p data-edit="book.studioLede" data-edit-max="240" data-edit-multiline className={s.studioLede}>
                First consultations are 45 minutes, and we can usually do a
                skin prick test in the same visit. We reply the same working day.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="book.address" data-edit-max="240" data-edit-multiline className={s.address}>9 Meadow Court, Hayfield</p>
              <p className={s.contact}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550197720">(555) 019-7720</a>
              </p>
              <p className={s.contact}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:clinic@pollencount.example">clinic@pollencount.example</a>
              </p>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="pc-name">Name</label>
                <input id="pc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="pc-email">Email</label>
                <input id="pc-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="pc-phone">Phone</label>
                <input id="pc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="pc-for">What is it</label>
                <select id="pc-for" name="for" defaultValue="hayfever">
                  <option value="hayfever">Hay fever</option>
                  <option value="food">A food allergy</option>
                  <option value="skin">A rash or eczema</option>
                  <option value="venom">Bee or wasp stings</option>
                  <option value="asthma">Asthma that flares</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="pc-who">For</label>
                <select id="pc-who" name="who" defaultValue="adult">
                  <option value="adult">An adult</option>
                  <option value="child">A child, 4 to 15</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="pc-when">Best time</label>
                <select id="pc-when" name="when" defaultValue="morning">
                  <option value="morning">Mornings</option>
                  <option value="afternoon">Afternoons</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a booking</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.ticker}>
          <span data-edit="footer.tickerTag" data-edit-max="60" className={s.tickerTag}>Pollen Count</span>
          <span data-edit="footer.text" data-edit-max="60">Weed high</span>
          <span data-edit="footer.text2" data-edit-max="60">Grass moderate</span>
          <span data-edit="footer.text3" data-edit-max="60">Tree low</span>
          <span data-edit="footer.text4" data-edit-max="60">Next count 06:00 tomorrow</span>
        </p>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Pollen Count Allergy Clinic</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional allergy clinic. The counts, towns, patients, prices and forecasts are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The micrographs are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
