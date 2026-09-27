import { TabbiedPattern } from 'tabbied/react';
import { fanned, sunray, ogee, radiance } from 'tabbied/patterns';
import s from './fairweather-signs.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Fairweather Signs: Sign painter and gilder, Ledbury Cross',
  description:
    'Hand-lettered shop fascias, gold leaf on glass, ghost sign restoration, vans and narrowboats, from the workshop behind 23 Guild Street. Lettering weekends and gilding days too.',
};

/* Site colors. The whole page is a showcard: black enamel, gold leaf,
   cream and the house red. The fanned brush strokes sit over the enamel
   with a transparent ground; the fanlight, the leaf book and the pressed
   tin mat around the price board do the same. */
const ENAMEL = '#121212';
const GOLD = '#d4a64a';
const CREAM = '#f2e9d5';
const RED = '#c33a2c';

const FAN = ['transparent', GOLD, RED, CREAM, GOLD, RED];
const FAN_FOOT = ['transparent', GOLD, RED, GOLD, CREAM];
const FANLIGHT = ['transparent', GOLD, CREAM, GOLD, RED, GOLD];
const LEAF = [ENAMEL, GOLD, CREAM, GOLD, GOLD, RED];
const TIN = ['transparent', GOLD, RED, ENAMEL, GOLD, CREAM];

const NAV = [
  ['Fascias', '#fascias'],
  ['Glass', '#glass'],
  ['Murals', '#murals'],
  ['Vehicles', '#vehicles'],
  ['Workshop', '#workshop'],
  ['Prices', '#prices'],
];

const TRADES = ['Fascias', 'Gold leaf on glass', 'Murals', 'Vans and boats'];

const HERO_FACTS = [
  ['Lettered by hand', 'since 1988'],
  ['Gold leaf', '23.5 carat'],
  ['Guaranteed', 'five years'],
];

type Board = {
  kind: 'gilt' | 'cream' | 'red';
  top: string;
  mid: string;
  side: string;
  where: string;
  spec: string;
};

const BOARDS: Board[] = [
  {
    kind: 'gilt',
    top: 'H. Prentice & Son',
    mid: 'Ironmongers',
    side: 'Since 1921',
    where: 'Prentice\'s, 9 Guild Street, 2024',
    spec: 'A 4.2 m board in black enamel, the name in 23.5 carat gold with a red shade.',
  },
  {
    kind: 'cream',
    top: 'The Copper Kettle',
    mid: 'Tea room and bakery',
    side: 'Open daily',
    where: 'The Copper Kettle, Market Square, 2023',
    spec: 'One-stroke script on a cream ground, outlined and shaded by hand.',
  },
  {
    kind: 'red',
    top: 'Post Office',
    mid: 'Ledbury Cross',
    side: 'No. 4',
    where: 'The post office, Station Road, 2022',
    spec: 'Block capitals in cream on the house red, with a gold keyline.',
  },
];

const FASCIA_STEPS = [
  'A survey, and a drawing of the whole board at full size',
  'Boards primed and flatted in six coats of enamel',
  'Every letter painted by hand, one stroke at a time',
  'Gold leaf where it counts, and a shade to lift it off the board',
  'Fitted by us, or ready to collect from the workshop',
];

const FASCIA_FACTS = [
  ['3 weeks', 'from the drawing to the fitting'],
  ['10 years', 'before a board wants a touch-up'],
  ['$1,450', 'for a typical 4 m fascia'],
];

const GLASS_STEPS = [
  ['Set out', 'The lettering is drawn in reverse and taped to the street side of the glass.'],
  ['Size', 'Gelatine and water, brushed on the inside, one letter at a time.'],
  ['Lay', 'Leaf is lifted off the book on a squirrel-hair tip and falls flat onto the size.'],
  ['Burnish', 'Polished with cotton wool until it reads as a mirror from across the road.'],
  ['Back up', 'Outline and shade go on behind the gold, so the street sees only gold and line.'],
];

type Gold = { name: string; ct: string; note: string; kind: 'deep' | 'lemon' | 'white' };

const GOLDS: Gold[] = [
  { name: 'Double gold', ct: '23.5 ct', note: 'The deep, warm yellow on most doors and windows.', kind: 'deep' },
  { name: 'Lemon gold', ct: '18 ct', note: 'Paler and cooler, for a quieter shop front.', kind: 'lemon' },
  { name: 'White gold', ct: '12 ct', note: 'Nearly silver, and lovely on dark glass.', kind: 'white' },
];

const GHOST = [
  { state: 'As found, 2019', kind: 'found' },
  { state: 'Restored, 2021', kind: 'restored' },
];

const MURAL_JOBS = [
  'Ghost signs traced, recorded and repainted from photographs',
  'Painted walls for shops, pubs and schools, designed with you',
  'Heritage lettering matched to the original hand',
  'A clear anti-graffiti coat on anything the street can reach',
];

const MURAL_FACTS = [
  ['Survey', '$150, taken off the job if it goes ahead'],
  ['Scaffold', 'Arranged by us and charged at cost'],
  ['Season', 'April to October: paint wants 10 C and a dry wall'],
];

type Vehicle = { name: string; note: string; price: string };

const VEHICLES: Vehicle[] = [
  { name: 'Vans and lorries', note: 'Both sides and the back doors, in the workshop over two days.', price: 'from $950' },
  { name: 'Narrowboats', note: 'Names, panels and roses, painted in the dry dock at Ledbury basin.', price: 'from $420' },
  { name: 'Horse boxes', note: 'Names and numbers, shaded, with a clear coat over.', price: 'from $380' },
  { name: 'Fairground work', note: 'Scrolls, shaded capitals and gilding for showmen and carousels.', price: 'by quote' },
];

type Course = {
  kind: 'weekend' | 'gild';
  name: string;
  when: string;
  price: string;
  places: string;
  dates: string[];
  items: string[];
};

const COURSES: Course[] = [
  {
    kind: 'weekend',
    name: 'Beginners\' weekend',
    when: 'Saturday and Sunday, 10:00-16:30',
    price: '$340',
    places: 'Six at the bench',
    dates: ['18-19 Oct', '15-16 Nov', '10-11 Jan'],
    items: [
      'Loading a brush, and the six basic strokes',
      'Roman, block and script capitals',
      'Your own showcard to take home',
      'Brushes, enamels and lunch included',
    ],
  },
  {
    kind: 'gild',
    name: 'Gilding day',
    when: 'Saturday, 10:00-16:00',
    price: '$185',
    places: 'Five at the bench',
    dates: ['25 Oct', '22 Nov', '17 Jan'],
    items: [
      'Water gilding on a glass panel',
      'Oil gilding on a painted board',
      'Burnishing, backing up and shading',
      'A book of 23.5 carat leaf to take home',
    ],
  },
];

type Row = { label: string; text: string; kind: 'roman' | 'block' | 'script' | 'figures' };

const SAMPLER: Row[] = [
  { label: 'Roman, shaded', text: 'ABCDEFGHIJKLM NOPQRSTUVWXYZ', kind: 'roman' },
  { label: 'Block, outlined', text: 'ABCDEFGHIJKLM NOPQRSTUVWXYZ', kind: 'block' },
  { label: 'Script, one stroke', text: 'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk', kind: 'script' },
  { label: 'Figures', text: '1234567890 & $', kind: 'figures' },
];

type Price = { item: string; note: string; price: string };

const PRICES: Price[] = [
  { item: 'A shop fascia, up to 4 m', note: 'Enamel board, lettered by hand', price: 'From $1,450' },
  { item: 'Each further metre', note: 'Same board, same hand', price: '$240' },
  { item: 'A shop window', note: 'Name and trade in gold leaf', price: 'From $680' },
  { item: 'A door', note: 'Number and name on the glass', price: '$220' },
  { item: 'A van', note: 'Both sides and the back doors', price: 'From $950' },
  { item: 'A narrowboat', note: 'The name on both sides of the cabin', price: '$420' },
  { item: 'A house name', note: 'Oak board, 60 cm, gilded', price: '$240' },
  { item: 'A ghost sign', note: 'Restored after a survey', price: 'By quote' },
];

const PRICE_NOTES = [
  'A third on booking, the rest on fitting',
  'Free travel within 20 miles of Ledbury Cross',
  'Every job guaranteed for five years',
];

const HOURS = [
  ['Tuesday to Friday', '08:30-17:00'],
  ['Saturday', '09:00-13:00, or a course'],
  ['Sunday and Monday', 'Closed'],
];

export default function FairweatherSignsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--enamel': '#121212',
        '--gold': '#d4a64a',
        '--cream': '#f2e9d5',
        '--red': '#c33a2c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="enamel,gold,cream,red"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Oswald:wght@400..700&family=Yesteryear&family=Sancreek&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Fairweather</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Signs</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a key={href} href={href}>
              <Artwork slug="fairweather-signs-manicule" alt="" inks={['var(--gilt)']} className={s.navHand} />
              <span data-edit={`bar.text.${i}`} data-edit-max="60">{label}</span>
            </a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#enquire">Enquire</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
          <a data-edit="bar.enquire" data-edit-max="28" href="#enquire">Enquire</a>
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="fw-hero-h">
          <div data-edit-pattern="fwHero.field" data-edit-roles="transparent,1,3,2,1,3" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={fanned}
              palette={FAN}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={44}
              seed="fairweather-fan"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.showcard}>
            <p className={s.est}>
              <span data-edit="fwHero.estScript" data-edit-max="60" className={s.estScript}>Est.</span>
              <span data-edit="fwHero.estYear" data-edit-max="60" className={s.estYear}>1988</span>
              <span data-edit="fwHero.estPlace" data-edit-max="60" className={s.estPlace}>Ledbury Cross</span>
            </p>
            <p data-edit="fwHero.heroPre" data-edit-max="240" data-edit-multiline className={s.heroPre}>Sign painters and gilders</p>
            <h1 id="fw-hero-h" className={s.heroName}>
              <span data-edit="fwHero.heroLine" data-edit-max="60" className={s.heroLine}>Fairweather</span>
              <span data-edit="fwHero.heroSigns" data-edit-max="60" className={s.heroSigns}>Signs</span>
            </h1>
            <ul className={s.trades}>
              {TRADES.map((t, i) => (
                <li data-edit={`fwHero.item.${i}`} data-edit-max="80" key={t}>{t}</li>
              ))}
            </ul>
            <p data-edit="fwHero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Every letter painted by hand, with a sable brush, a steady
              mahl stick and thirty-seven years of practice. Shop fronts,
              gold leaf on glass, walls, vans and boats, from the workshop
              behind 23 Guild Street.
            </p>
            <div className={s.heroActions}>
              <a data-edit="fwHero.btnGold" data-edit-max="28" className={s.btnGold} href="#enquire">Ask for a quote</a>
              <a data-edit="fwHero.btnLine" data-edit-max="28" className={s.btnLine} href="#workshop">Learn to letter</a>
            </div>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`fwHero.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`fwHero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- FASCIAS */}
        <section id="fascias" className={s.sec} aria-labelledby="fw-fascias-h">
          <div className={s.secHead}>
            <p data-edit="fascias.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>No. 1</p>
            <h2 id="fw-fascias-h" className={s.secTitle}>
              <span data-edit="fascias.tRoman" data-edit-max="60" className={s.tRoman}>Shop fronts</span>
              <span data-edit="fascias.tScript" data-edit-max="60" className={s.tScript}>and</span>
              <span data-edit="fascias.tBlock" data-edit-max="60" className={s.tBlock}>fascias</span>
            </h2>
            <p data-edit="fascias.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The board over the door is the first thing a street reads.
              We draw it at full size, paint it by hand in the workshop and
              fit it ourselves. A few from the last three years:
            </p>
          </div>

          <ul className={s.boards}>
            {BOARDS.map((b, i) => (
              <li key={b.top} className={s.boardItem}>
                <div className={`${s.board} ${s[b.kind]}`}>
                  <span data-edit={`fascias.boardSide.${i}`} data-edit-max="60" className={s.boardSide}>{b.side}</span>
                  <p data-edit={`fascias.boardTop.${i}`} data-edit-max="240" data-edit-multiline className={s.boardTop}>{b.top}</p>
                  <p data-edit={`fascias.boardMid.${i}`} data-edit-max="240" data-edit-multiline className={s.boardMid}>{b.mid}</p>
                  <span data-edit={`fascias.boardSide2.${i}`} data-edit-max="60" className={s.boardSide}>{b.side}</span>
                </div>
                <p data-edit={`fascias.boardWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.boardWhere}>{b.where}</p>
                <p data-edit={`fascias.boardSpec.${i}`} data-edit-max="240" data-edit-multiline className={s.boardSpec}>{b.spec}</p>
              </li>
            ))}
          </ul>

          <div className={s.fasciaBody}>
            <div className={s.fasciaSteps}>
              <h3 data-edit="fascias.subTitle" data-edit-max="40" className={s.subTitle}>What a fascia takes</h3>
              <ul className={s.pointers}>
                {FASCIA_STEPS.map((step, i) => (
                  <li key={step}>
                    <Artwork slug="fairweather-signs-manicule" alt="" inks={['var(--gilt)']} className={s.hand} />
                    <span data-edit={`fascias.text.${i}`} data-edit-max="60">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <dl className={s.medallions}>
              {FASCIA_FACTS.map(([figure, what], i) => (
                <div key={figure}>
                  <dt data-edit={`fascias.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`fascias.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className={s.flourish} aria-hidden="true" />

        {/* ----------------------------------------------------------- GLASS */}
        <section id="glass" className={s.sec} aria-labelledby="fw-glass-h">
          <div className={s.glassGrid}>
            <figure className={s.door}>
              <div data-edit-pattern="glass.field" data-edit-roles="transparent,1,2,1,3,1" className={s.fanlight} aria-hidden="true">
                <TabbiedPattern
                  pattern={sunray}
                  palette={FANLIGHT}
                  fit="grid"
                  cellSize={30}
                  seed="fairweather-fanlight"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.doorFrame}>
                <div className={s.doorGlass}>
                  <p data-edit="glass.glassNo" data-edit-max="240" data-edit-multiline className={s.glassNo}>23</p>
                  <p data-edit="glass.glassName" data-edit-max="240" data-edit-multiline className={s.glassName}>Fairweather</p>
                  <p data-edit="glass.glassSub" data-edit-max="240" data-edit-multiline className={s.glassSub}>Signs and gilding</p>
                  <p data-edit="glass.glassHours" data-edit-max="240" data-edit-multiline className={s.glassHours}>Tues to Sat</p>
                </div>
                <span className={s.doorPanel} aria-hidden="true" />
              </div>
              <figcaption data-edit="glass.doorCaption" data-edit-max="120" data-edit-multiline className={s.doorCaption}>Our own door on Guild Street: water gilded in 23.5 carat, backed up in black and shaded in red, 1996. Still bright.</figcaption>
            </figure>

            <div className={s.glassText}>
              <div className={s.secHead}>
                <p data-edit="glass.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>No. 2</p>
                <h2 id="fw-glass-h" className={s.secTitle}>
                  <span data-edit="glass.tRoman" data-edit-max="60" className={s.tRoman}>Gold leaf</span>
                  <span data-edit="glass.tScript" data-edit-max="60" className={s.tScript}>on</span>
                  <span data-edit="glass.tBlock" data-edit-max="60" className={s.tBlock}>glass</span>
                </h2>
                <p data-edit="glass.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Windows, doors and fanlights, gilded from the inside so the
                  weather never touches the gold. A good window outlasts the
                  shop it was painted for.
                </p>
              </div>

              <ol className={s.glassSteps}>
                {GLASS_STEPS.map(([name, text], i) => (
                  <li key={name}>
                    <h3 data-edit={`glass.stepName.${i}`} data-edit-max="40" className={s.stepName}>{name}</h3>
                    <p data-edit={`glass.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                  </li>
                ))}
              </ol>

              <ul className={s.golds}>
                {GOLDS.map((g, i) => (
                  <li key={g.name} className={s.goldItem}>
                    <span className={`${s.swatch} ${s[g.kind]}`} aria-hidden="true" />
                    <p className={s.goldName}>
                      <strong data-edit={`glass.emphasis.${i}`}>{g.name}</strong>
                      <span data-edit={`glass.text.${i}`} data-edit-max="60">{g.ct}</span>
                    </p>
                    <p data-edit={`glass.goldNote.${i}`} data-edit-max="240" data-edit-multiline className={s.goldNote}>{g.note}</p>
                  </li>
                ))}
              </ul>
              <p data-edit="glass.glassPrice" data-edit-max="240" data-edit-multiline className={s.glassPrice}>Door numbers from $220. A whole window from $680.</p>
            </div>
          </div>
        </section>

        <div className={s.flourish} aria-hidden="true" />

        {/* ---------------------------------------------------------- MURALS */}
        <section id="murals" className={s.sec} aria-labelledby="fw-murals-h">
          <div className={s.secHead}>
            <p data-edit="murals.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>No. 3</p>
            <h2 id="fw-murals-h" className={s.secTitle}>
              <span data-edit="murals.tRoman" data-edit-max="60" className={s.tRoman}>Murals</span>
              <span data-edit="murals.tScript" data-edit-max="60" className={s.tScript}>and</span>
              <span data-edit="murals.tBlock" data-edit-max="60" className={s.tBlock}>ghost signs</span>
            </h2>
            <p data-edit="murals.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Under a century of render there is often an advertisement.
              We find it, photograph it, trace every surviving letter and
              paint it back, in the colors it was first put up in.
            </p>
          </div>

          <div className={s.walls}>
            {GHOST.map((g, i) => (
              <figure key={g.kind} className={`${s.wall} ${s[g.kind]}`}>
                <div className={s.bricks}>
                  <div className={s.ghost}>
                    <p data-edit={`murals.ghostName.${i}`} data-edit-max="240" data-edit-multiline className={s.ghostName}>Pearson&apos;s</p>
                    <p data-edit={`murals.ghostWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.ghostWhat}>Famous cocoa</p>
                    <p data-edit={`murals.ghostPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.ghostPrice}>2d a tin</p>
                  </div>
                </div>
                <figcaption data-edit={`murals.wallCaption.${i}`} data-edit-max="120" data-edit-multiline className={s.wallCaption}>{g.state}</figcaption>
              </figure>
            ))}
          </div>
          <p data-edit="murals.wallNote" data-edit-max="240" data-edit-multiline className={s.wallNote}>The Pearson&apos;s wall on Mill Lane, found under render when the bakery was refitted and repainted from a photograph taken in 1934.</p>

          <div className={s.muralBody}>
            <ul className={s.pointers}>
              {MURAL_JOBS.map((job, i) => (
                <li key={job}>
                  <Artwork slug="fairweather-signs-manicule" alt="" inks={['var(--gilt)']} className={s.hand} />
                  <span data-edit={`murals.text.${i}`} data-edit-max="60">{job}</span>
                </li>
              ))}
            </ul>
            <dl className={s.ledger}>
              {MURAL_FACTS.map(([term, text], i) => (
                <div key={term}>
                  <dt data-edit={`murals.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`murals.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className={s.flourish} aria-hidden="true" />

        {/* -------------------------------------------------------- VEHICLES */}
        <section id="vehicles" className={s.sec} aria-labelledby="fw-vehicles-h">
          <div className={s.secHead}>
            <p data-edit="vehicles.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>No. 4</p>
            <h2 id="fw-vehicles-h" className={s.secTitle}>
              <span data-edit="vehicles.tRoman" data-edit-max="60" className={s.tRoman}>Vans</span>
              <span data-edit="vehicles.tScript" data-edit-max="60" className={s.tScript}>and</span>
              <span data-edit="vehicles.tBlock" data-edit-max="60" className={s.tBlock}>boats</span>
            </h2>
            <p data-edit="vehicles.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              A lettered van is a sign that drives round town all day. Boats
              get the same care, with the name shaded so it reads across the
              water.
            </p>
          </div>

          <div className={s.fleet}>
            <figure className={s.van}>
              <div className={s.vanBody}>
                <span className={s.vanWindow} aria-hidden="true" />
                <div className={s.vanPanel}>
                  <p data-edit="vehicles.vanName" data-edit-max="240" data-edit-multiline className={s.vanName}>A. Morrow</p>
                  <p data-edit="vehicles.vanTrade" data-edit-max="240" data-edit-multiline className={s.vanTrade}>Plumbing and heating</p>
                  <p data-edit="vehicles.vanPhone" data-edit-max="240" data-edit-multiline className={s.vanPhone}>(555) 013-4471</p>
                </div>
                <span className={`${s.wheel} ${s.wheelFront}`} aria-hidden="true" />
                <span className={`${s.wheel} ${s.wheelBack}`} aria-hidden="true" />
              </div>
              <figcaption data-edit="vehicles.fleetCaption" data-edit-max="120" data-edit-multiline className={s.fleetCaption}>Morrow&apos;s van, both sides and the back doors, shaded capitals and a script trade line. Two days in the workshop.</figcaption>
            </figure>

            <figure className={s.boat}>
              <div className={s.cabin}>
                <span className={s.porthole} aria-hidden="true" />
                <div className={s.cabinPanel}>
                  <p data-edit="vehicles.boatName" data-edit-max="240" data-edit-multiline className={s.boatName}>Kingfisher</p>
                  <p data-edit="vehicles.boatPort" data-edit-max="240" data-edit-multiline className={s.boatPort}>Ledbury Cross</p>
                </div>
                <span className={s.porthole} aria-hidden="true" />
              </div>
              <figcaption data-edit="vehicles.fleetCaption2" data-edit-max="120" data-edit-multiline className={s.fleetCaption}>The cabin side of Kingfisher, gilded script on a red panel, painted in the dry dock at Ledbury basin.</figcaption>
            </figure>
          </div>

          <ul className={s.jobs}>
            {VEHICLES.map((v, i) => (
              <li key={v.name}>
                <Artwork slug="fairweather-signs-manicule" alt="" inks={['var(--gilt)']} className={s.hand} />
                <h3 data-edit={`vehicles.jobName.${i}`} data-edit-max="40" className={s.jobName}>{v.name}</h3>
                <p data-edit={`vehicles.jobNote.${i}`} data-edit-max="240" data-edit-multiline className={s.jobNote}>{v.note}</p>
                <p data-edit={`vehicles.jobPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.jobPrice}>{v.price}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className={s.flourish} aria-hidden="true" />

        {/* -------------------------------------------------------- WORKSHOP */}
        <section id="workshop" className={s.sec} aria-labelledby="fw-workshop-h">
          <div className={s.workshopGrid}>
            <figure className={s.brushFigure}>
              <Artwork
                slug="fairweather-signs-brushes"
                alt="Long lettering brushes standing in a jar, with a mahl stick leaning beside them"
                inks={['var(--gilt)']}
                className={s.brushes}
              />
              <figcaption data-edit="workshop.brushCaption" data-edit-max="120" data-edit-multiline className={s.brushCaption}>The kit: sable pencils for the strokes, a flat for the fills, and the mahl stick to rest a hand on.</figcaption>
            </figure>

            <figure className={s.leafFigure}>
              <div data-edit-pattern="workshop.field" data-edit-roles="0,1,2,1,1,3" className={s.leafBook} aria-hidden="true">
                <TabbiedPattern
                  pattern={radiance}
                  palette={LEAF}
                  fit="grid"
                  cellSize={26}
                  seed="fairweather-leaf"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="workshop.leafCaption" data-edit-max="120" data-edit-multiline className={s.leafCaption}>A book of leaf: 25 sheets of 23.5 carat gold, 80 mm square, between rouged tissue. $38 from the workshop counter.</figcaption>
            </figure>

            <div className={s.workshopText}>
              <div className={s.secHead}>
                <p data-edit="workshop.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>No. 5</p>
                <h2 id="fw-workshop-h" className={s.secTitle}>
                  <span data-edit="workshop.tRoman" data-edit-max="60" className={s.tRoman}>The</span>
                  <span data-edit="workshop.tBlock" data-edit-max="60" className={s.tBlock}>workshop</span>
                </h2>
                <p data-edit="workshop.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Two courses at the long bench under the skylight, taught by
                  Ada Fairweather. No experience needed, only a steady cup of
                  tea and the patience to paint an O more than once.
                </p>
              </div>

              <div className={s.courses}>
                {COURSES.map((c, i) => (
                  <article key={c.name} className={`${s.ticket} ${s[c.kind]}`}>
                    <h3 data-edit={`ticket.ticketName.${i}`} data-edit-max="40" className={s.ticketName}>{c.name}</h3>
                    <p data-edit={`ticket.ticketWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketWhen}>{c.when}</p>
                    <p className={s.ticketPrice}>
                      <strong data-edit={`ticket.emphasis.${i}`}>{c.price}</strong>
                      <span data-edit={`ticket.text.${i}`} data-edit-max="60">{c.places}</span>
                    </p>
                    <ul className={s.ticketItems}>
                      {c.items.map((item, i2) => (
                        <li data-edit={`ticket.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                      ))}
                    </ul>
                    <p data-edit={`ticket.ticketDatesLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketDatesLabel}>Next dates</p>
                    <ul className={s.ticketDates}>
                      {c.dates.map((d, i2) => (
                        <li data-edit={`ticket.item2.${i}.${i2}`} data-edit-max="80" key={d}>{d}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className={s.sampler}>
            <div className={s.samplerHead}>
              <h3 data-edit="workshop.samplerTitle" data-edit-max="40" className={s.samplerTitle}>By Sunday afternoon, you will have painted this card</h3>
              <p data-edit="workshop.samplerNote" data-edit-max="240" data-edit-multiline className={s.samplerNote}>The weekend sampler: three alphabets and the figures, on a primed showcard 60 cm across.</p>
            </div>
            <dl className={s.samplerRows}>
              {SAMPLER.map((row, i) => (
                <div key={row.label} className={s[row.kind]}>
                  <dt data-edit={`workshop.term.${i}`} data-edit-max="28">{row.label}</dt>
                  <dd data-edit={`workshop.body.${i}`} data-edit-max="200" data-edit-multiline>{row.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className={s.flourish} aria-hidden="true" />

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="fw-prices-h">
          <div className={s.priceFrame}>
            <div data-edit-pattern="prices.field" data-edit-roles="transparent,1,3,0,1,2" className={s.tin} aria-hidden="true">
              <TabbiedPattern
                pattern={ogee}
                palette={TIN}
                options={{ frequency: 0.9 }}
                fit="grid"
                cellSize={36}
                seed="fairweather-tin"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.priceBoard}>
              <p data-edit="prices.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>No. 6</p>
              <h2 data-edit="prices.priceTitle" data-edit-max="60" id="fw-prices-h" className={s.priceTitle}>Prices</h2>
              <p data-edit="prices.priceSub" data-edit-max="240" data-edit-multiline className={s.priceSub}>What most jobs come to, painted and fitted</p>
              <dl className={s.priceList}>
                {PRICES.map((p, i) => (
                  <div key={p.item}>
                    <dt>
                      <span data-edit={`prices.priceItem.${i}`} data-edit-max="60" className={s.priceItem}>{p.item}</span>
                      <span data-edit={`prices.priceNote.${i}`} data-edit-max="60" className={s.priceNote}>{p.note}</span>
                    </dt>
                    <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{p.price}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.priceNotes}>
                {PRICE_NOTES.map((n, i) => (
                  <li data-edit={`prices.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- ENQUIRE */}
        <section id="enquire" className={s.sec} aria-labelledby="fw-enquire-h">
          <div className={s.enquireGrid}>
            <div className={s.enquireText}>
              <p data-edit="enquire.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>No. 7</p>
              <h2 id="fw-enquire-h" className={s.secTitle}>
                <span data-edit="enquire.tRoman" data-edit-max="60" className={s.tRoman}>Enquire</span>
              </h2>
              <p data-edit="enquire.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Tell us what needs lettering and roughly how big it is. A
                photograph of the wall, van or window helps. Ada or Tom will
                write back within three working days.
              </p>
              <Artwork
                slug="fairweather-signs-manicule"
                alt="A pointing hand in a shirt cuff, pointing at the enquiry form"
                inks={['var(--gilt)']}
                className={s.bigHand}
              />
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`enquire.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`enquire.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="enquire.formTitle" data-edit-max="40" className={s.formTitle}>Ask for a quote</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="enquire.label" htmlFor="fw-name">Your name</label>
                  <input id="fw-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label2" htmlFor="fw-email">Email</label>
                  <input id="fw-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label3" htmlFor="fw-phone">Phone</label>
                  <input id="fw-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label4" htmlFor="fw-job">The job</label>
                  <select id="fw-job" name="job" defaultValue="fascia">
                    <option value="fascia">A shop fascia</option>
                    <option value="glass">Gold leaf on glass</option>
                    <option value="mural">A mural or ghost sign</option>
                    <option value="vehicle">A van or a boat</option>
                    <option value="course">A place on a course</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="enquire.label5" htmlFor="fw-size">Where, and roughly how big</label>
                  <input id="fw-size" name="size" type="text" placeholder="4 m board over a shop on Guild Street" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="enquire.label6" htmlFor="fw-words">The words you want painted</label>
                  <textarea id="fw-words" name="words" rows={4} />
                </div>
              </div>
              <button data-edit="enquire.submit" data-edit-max="24" className={s.submit} type="submit">Send the enquiry</button>
              <p data-edit="enquire.formSmall" data-edit-max="240" data-edit-multiline className={s.formSmall}>We never share your details. Quotes are free and hold for three months.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,3,1,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={fanned}
            palette={FAN_FOOT}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={32}
            seed="fairweather-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Fairweather Signs</p>
            <p data-edit="footer.footEst" data-edit-max="240" data-edit-multiline className={s.footEst}>Sign painters and gilders, est. 1988</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel" data-edit-max="240" data-edit-multiline className={s.footLabel}>The workshop</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Behind 23 Guild Street, Ledbury Cross. Through the yard gate, under the gilded hand.</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel2" data-edit-max="240" data-edit-multiline className={s.footLabel}>Write or ring</p>
            <p><a data-edit="footer.link" data-edit-max="28" href="tel:+15550148823">(555) 014-8823</a></p>
            <p><a data-edit="footer.link2" data-edit-max="28" href="mailto:letters@fairweathersigns.example">letters@fairweathersigns.example</a></p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel3" data-edit-max="240" data-edit-multiline className={s.footLabel}>Small print</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional sign painter; the jobs, people, prices and places are invented.</p>
            <p>Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The hand and the brushes are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
