import { TabbiedPattern } from 'tabbied/react';
import { cornerbloom, lobe } from 'tabbied/patterns';
import s from './sunday-market.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Sunday Market: Farmers market, Mill Square, Harlow Falls',
  description:
    'Twenty-six stalls of farmers, bakers and makers on Mill Square every Sunday from April to November. The stall map, what is in season, SNAP and payments, and how to get there.',
};

/* Site colors, the same six as the stylesheet's root rule. The mosaic paints
   its own ground from the palette, so it takes the paper first and the
   inks after; the leaves take `transparent` and sit on the page. */
const PAPER = '#FBF7EE';
const INK = '#26231C';
const TOMATO = '#E4572E';
const LEAF = '#4E8F4A';
const SQUASH = '#F3B63F';

const BLOOM = ['transparent', PAPER, TOMATO, LEAF, SQUASH, INK];
const LEAVES = ['transparent', LEAF, SQUASH, TOMATO];
/* On the green payments band the leaves turn squash and paper. */
const LEAVES_ON_GREEN = ['transparent', SQUASH, PAPER, TOMATO];

const NAV = [
  ['Stall map', '#map'],
  ['In season', '#season'],
  ['SNAP and payments', '#payments'],
  ['Directions', '#directions'],
  ['Questions', '#faq'],
];

/* Stall categories: each one is a color on the map and in the key. */
type Kind = 'produce' | 'bakery' | 'dairy' | 'food' | 'craft';

const KINDS: { id: Kind; name: string }[] = [
  { id: 'produce', name: 'Fruit and vegetables' },
  { id: 'dairy', name: 'Meat, eggs and dairy' },
  { id: 'bakery', name: 'Bread and baking' },
  { id: 'food', name: 'Coffee and hot food' },
  { id: 'craft', name: 'Flowers, plants and crafts' },
];

type Stall = {
  no: number;
  name: string;
  sells: string;
  kind: Kind;
  col: number;
  row: number;
};

/* The square is nine cells by seven. Stalls run clockwise from the Canal
   Walk entrance at the top left. */
const STALLS: Stall[] = [
  { no: 1, name: 'Hollow Oak Farm', sells: 'Salad greens, radishes, herbs', kind: 'produce', col: 1, row: 1 },
  { no: 2, name: 'Pell Orchard', sells: 'Apples, pears, cider', kind: 'produce', col: 2, row: 1 },
  { no: 3, name: 'Rye and Rise', sells: 'Sourdough, rye, focaccia', kind: 'bakery', col: 3, row: 1 },
  { no: 4, name: 'Blue Gate Dairy', sells: 'Milk, butter, fresh cheese', kind: 'dairy', col: 4, row: 1 },
  { no: 5, name: 'Two Crows Coffee', sells: 'Espresso, cold brew', kind: 'food', col: 5, row: 1 },
  { no: 6, name: 'Marsh End Growers', sells: 'Tomatoes, peppers, eggplant', kind: 'produce', col: 6, row: 1 },
  { no: 7, name: 'Tillery Eggs', sells: 'Pasture eggs, duck eggs', kind: 'dairy', col: 7, row: 1 },
  { no: 8, name: 'Fern and Frond', sells: 'Cut flowers, bouquets', kind: 'craft', col: 8, row: 1 },
  { no: 9, name: 'Stonecrop Farm', sells: 'Potatoes, onions, garlic', kind: 'produce', col: 9, row: 1 },
  { no: 10, name: 'Little Mill Bakery', sells: 'Pastries, pies, hand pies', kind: 'bakery', col: 9, row: 2 },
  { no: 11, name: 'Canal Smokehouse', sells: 'Bacon, sausages, smoked fish', kind: 'dairy', col: 9, row: 3 },
  { no: 12, name: 'Brightwater Berries', sells: 'Strawberries to blueberries', kind: 'produce', col: 9, row: 4 },
  { no: 13, name: 'The Dumpling Cart', sells: 'Dumplings, noodle soup', kind: 'food', col: 9, row: 5 },
  { no: 14, name: 'Wick Lane Honey', sells: 'Honey, beeswax', kind: 'craft', col: 9, row: 6 },
  { no: 15, name: 'Greyfield Beef', sells: 'Grass-fed beef, bones', kind: 'dairy', col: 9, row: 7 },
  { no: 16, name: 'Ash Hill Mushrooms', sells: 'Oyster, shiitake, lion\'s mane', kind: 'produce', col: 8, row: 7 },
  { no: 17, name: 'Pressed', sells: 'Juices, lemonade', kind: 'food', col: 7, row: 7 },
  { no: 18, name: 'Harlow Seedlings', sells: 'Vegetable starts, herbs', kind: 'craft', col: 6, row: 7 },
  { no: 19, name: 'Sweetwater Farm', sells: 'Corn, beans, squash', kind: 'produce', col: 5, row: 7 },
  { no: 20, name: 'Crumb and Co.', sells: 'Cookies, gluten-free baking', kind: 'bakery', col: 4, row: 7 },
  { no: 21, name: 'Taqueria Sol', sells: 'Tacos, breakfast burritos', kind: 'food', col: 3, row: 7 },
  { no: 22, name: 'Kettle Creek Cheese', sells: 'Aged cheddar, tomme', kind: 'dairy', col: 2, row: 7 },
  { no: 23, name: 'Old Barn Pottery', sells: 'Mugs, bowls, planters', kind: 'craft', col: 1, row: 7 },
  { no: 24, name: 'Riverbend Greens', sells: 'Kale, chard, microgreens', kind: 'produce', col: 1, row: 6 },
  { no: 25, name: 'Pickle Barrel', sells: 'Pickles, kraut, kimchi', kind: 'food', col: 1, row: 5 },
  { no: 26, name: 'Maple Row Farm', sells: 'Syrup, jams, preserves', kind: 'produce', col: 1, row: 4 },
];

/* The middle of the square: the things that are not stalls. */
const PLACES = [
  { name: 'Info tent', note: 'SNAP tokens, lost and found', cls: 'info' },
  { name: 'Fountain', note: 'Meet here', cls: 'fountain' },
  { name: 'Music', note: 'From 10 am', cls: 'music' },
  { name: 'Picnic tables', note: 'Seats 60', cls: 'tables' },
];

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

/* 0: not at market, 1: in season, 2: at its best. */
const PRODUCE: { name: string; tone: 'leaf' | 'tomato' | 'squash'; months: number[] }[] = [
  { name: 'Asparagus', tone: 'leaf', months: [1, 2, 1, 0, 0, 0, 0, 0] },
  { name: 'Salad greens', tone: 'leaf', months: [2, 2, 1, 1, 1, 2, 2, 1] },
  { name: 'Strawberries', tone: 'tomato', months: [0, 1, 2, 1, 0, 0, 0, 0] },
  { name: 'Peas', tone: 'leaf', months: [0, 2, 2, 0, 0, 0, 0, 0] },
  { name: 'Blueberries', tone: 'tomato', months: [0, 0, 1, 2, 2, 0, 0, 0] },
  { name: 'Sweet corn', tone: 'squash', months: [0, 0, 0, 2, 2, 1, 0, 0] },
  { name: 'Tomatoes', tone: 'tomato', months: [0, 0, 0, 1, 2, 2, 1, 0] },
  { name: 'Peaches', tone: 'squash', months: [0, 0, 0, 1, 2, 1, 0, 0] },
  { name: 'Peppers', tone: 'tomato', months: [0, 0, 0, 1, 2, 2, 1, 0] },
  { name: 'Apples', tone: 'tomato', months: [0, 0, 0, 0, 1, 2, 2, 1] },
  { name: 'Winter squash', tone: 'squash', months: [0, 0, 0, 0, 0, 1, 2, 2] },
  { name: 'Carrots', tone: 'squash', months: [0, 1, 1, 1, 1, 2, 2, 2] },
  { name: 'Kale', tone: 'leaf', months: [1, 1, 0, 0, 0, 1, 2, 2] },
  { name: 'Potatoes', tone: 'squash', months: [0, 0, 0, 1, 1, 2, 2, 2] },
];

const PAYMENTS = [
  {
    title: 'SNAP and EBT',
    body: 'Swipe your EBT card at the Info tent and take wooden tokens in dollar amounts. They spend at every stall that sells food and never expire.',
  },
  {
    title: 'Market Match',
    body: 'Every SNAP dollar you spend on fruit and vegetables is matched with a second, up to $20 each market day. Ask for the green tokens.',
  },
  {
    title: 'WIC and senior coupons',
    body: 'Farm-to-family checks are taken at any stall showing the green sign, which is most of the produce row.',
  },
  {
    title: 'Cards and cash',
    body: 'Most stalls take cards and phones. The nearest cash machine is outside the pharmacy on Mill Street.',
  },
];

const GETTING_HERE = [
  ['By bus', 'Routes 4 and 11 stop at Mill Street, a minute from the square.'],
  ['By bike', 'Forty racks along the Canal Walk entrance, and a free valet by the fountain.'],
  ['By car', 'Free in the Brick Street garage until 2 pm on Sundays. The square itself is closed to cars.'],
  ['Access', 'The square is level and paved. Wheelchairs to borrow at the Info tent.'],
];

const FAQ = [
  {
    q: 'What happens when it rains?',
    a: 'The market opens rain or shine. Only lightning closes it, and we post that on the board at the Info tent and by text by 7 am.',
  },
  {
    q: 'Can I bring my dog?',
    a: 'Leashed dogs are welcome on the outer walk and at the picnic tables. Please keep them out of the stall rows, where the food is.',
  },
  {
    q: 'When is the best time to come?',
    a: 'Before 9 for the berries and the bread, which often sell out. After noon for the quietest aisles and the odd end-of-day bargain.',
  },
  {
    q: 'How do I sell at the market?',
    a: 'We take applications from growers and makers within 100 miles, every January. Write to the market manager for the form and the fees.',
  },
];

export default function SundayMarketPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbf7ee',
        '--ink': '#26231c',
        '--tomato': '#e4572e',
        '--leaf': '#4e8f4a',
        '--squash': '#f3b63f',
        '--gray': '#a39c8c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,tomato,leaf,squash,gray"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Work+Sans:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Sunday Market</span>
          <span data-edit="bar.brandMeta" data-edit-max="60" className={s.brandMeta}>Mill Square, 8 am - 1 pm</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The basket sits in front of a mosaic panel, like produce under a
            patched awning. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Farmers market, Harlow Falls</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              26 stalls, one square, <em>every Sunday.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Farmers, bakers and makers from within a hundred miles, on Mill
              Square from the first Sunday in April to the last one in
              November. Bring a bag, bring the kids, come hungry.
            </p>
            <ul className={s.badges}>
              <li>
                <strong data-edit="hero.emphasis">8 am - 1 pm</strong>
                <span data-edit="hero.text" data-edit-max="60">Every Sunday, April to November</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis2">Rain or shine</strong>
                <span data-edit="hero.text2" data-edit-max="60">Only lightning closes the square</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis3">SNAP doubled</strong>
                <span data-edit="hero.text3" data-edit-max="60">Up to $20 on fruit and vegetables</span>
              </li>
            </ul>
            <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#map">Find a stall</a>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,2,3,4,1" className={s.awning} aria-hidden="true">
              <TabbiedPattern
                pattern={cornerbloom}
                palette={BLOOM}
                fit="grid"
                cellSize={48}
                seed="sunday-awning-2"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.basketPlate}>
              <Artwork
                slug="sunday-market-basket"
                alt="A woven basket of vegetables"
                inks={{ red: 'var(--tomato)', blue: 'var(--leaf)', yellow: 'var(--squash)' }}
                className={s.basket}
              />
            </div>
            <p className={s.today}>
              <span data-edit="hero.todayTop" data-edit-max="60" className={s.todayTop}>This Sunday</span>
              <span data-edit="hero.todayMain" data-edit-max="60" className={s.todayMain}>First strawberries</span>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- MAP
            The square as a grid of numbered stalls, colored by what they
            sell, with the directory in the same numbers beside it. */}
        <section id="map" className={s.mapSec} aria-labelledby="map-h">
          <div className={s.valance} aria-hidden="true">
            <TabbiedPattern
              pattern={cornerbloom}
              palette={BLOOM}
              fit="grid"
              cellSize={48}
              seed="sunday-valance-2"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.secHead}>
            <p data-edit="map.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Stall map</p>
            <h2 data-edit="map.secTitle" data-edit-max="60" id="map-h" className={s.secTitle}>Find your way round the square</h2>
            <p data-edit="map.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Stalls keep the same number all season. Walk in from the Canal
              Walk and the numbers run clockwise, ending by the syrup at 26.
            </p>
          </div>

          <div className={s.mapGrid}>
            <div className={s.mapCol}>
              <div className={s.mapFrame}>
                <p data-edit="map.gateTop" data-edit-max="240" data-edit-multiline className={s.gateTop}>Canal Walk entrance</p>
                <ol className={s.map} aria-label="Stalls around Mill Square">
                  {STALLS.map((st, i) => (
                    <li
                      key={st.no}
                      className={`${s.stall} ${s[st.kind]}`}
                      style={{ gridColumn: st.col, gridRow: st.row }}>
                      <span data-edit={`map.stallNo.${i}`} data-edit-max="60" className={s.stallNo}>{st.no}</span>
                      <span data-edit={`map.srOnly.${i}`} data-edit-max="60" className={s.srOnly}>{st.name}</span>
                    </li>
                  ))}
                </ol>
                <ul className={s.places}>
                  {PLACES.map((p, i) => (
                    <li key={p.name} className={s[p.cls]}>
                      <strong data-edit={`map.emphasis.${i}`}>{p.name}</strong>
                      <span data-edit={`map.text.${i}`} data-edit-max="60">{p.note}</span>
                    </li>
                  ))}
                </ul>
                <p data-edit="map.gateBottom" data-edit-max="240" data-edit-multiline className={s.gateBottom}>Mill Street entrance</p>
              </div>
              <ul className={s.key}>
                {KINDS.map((k, i) => (
                  <li key={k.id}>
                    <span className={`${s.keyChip} ${s[k.id]}`} aria-hidden="true" />
                    <span data-edit={`map.text2.${i}`} data-edit-max="60">{k.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.directory}>
              {KINDS.map((k, i) => (
                <div key={k.id} className={s.dirGroup}>
                  <div className={s.dirHeadRow}>
                    <span className={`${s.keyChip} ${s[k.id]}`} aria-hidden="true" />
                    <h3 data-edit={`map.dirHead.${i}`} data-edit-max="40" className={s.dirHead}>{k.name}</h3>
                  </div>
                  <ul className={s.dirList}>
                    {STALLS.filter((st) => st.kind === k.id).map((st, i2) => (
                      <li key={st.no}>
                        <span data-edit={`map.dirNo.${i}.${i2}`} data-edit-max="60" className={`${s.dirNo} ${s[st.kind]}`}>{st.no}</span>
                        <span data-edit={`map.dirName.${i}.${i2}`} data-edit-max="60" className={s.dirName}>{st.name}</span>
                        <span data-edit={`map.dirSells.${i}.${i2}`} data-edit-max="60" className={s.dirSells}>{st.sells}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- SEASON
            Months across, produce down: a bar where it is at market, solid
            where it is at its best. */}
        <section id="season" className={s.season} aria-labelledby="season-h">
          <div className={s.seasonGrid}>
            <div className={s.seasonHead}>
              <p data-edit="season.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>In season</p>
              <h2 data-edit="season.secTitle" data-edit-max="60" id="season-h" className={s.secTitle}>What to look for, month by month</h2>
              <p data-edit="season.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                A pale bar means it is on the tables; a solid one means it is
                at its best and cheapest. Weather moves everything by a week
                or two.
              </p>
              <div className={s.seasonArt}>
                <div className={s.carrotPlate} aria-hidden="true">
                  <TabbiedPattern
                    pattern={lobe}
                    palette={LEAVES}
                    options={{ frequency: 0.6 }}
                    fit="grid"
                    cellSize={40}
                    seed="sunday-carrots"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="sunday-market-carrots"
                  alt="A bunch of carrots with leafy tops"
                  inks={{ red: 'var(--tomato)', blue: 'var(--leaf)', yellow: 'var(--squash)' }}
                  className={s.carrots}
                />
              </div>
            </div>
            <div className={s.calWrap}>
              <table className={s.cal}>
                <caption data-edit="season.srOnly" className={s.srOnly}>Produce in season at the market, April to November</caption>
                <thead>
                  <tr>
                    <th data-edit="season.calCorner" scope="col" className={s.calCorner}>Produce</th>
                    {MONTHS.map((m, i) => (
                      <th data-edit={`season.heading.${i}`} key={m} scope="col">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCE.map((p, i) => (
                    <tr key={p.name} className={s[p.tone]}>
                      <th data-edit={`season.heading2.${i}`} scope="row">{p.name}</th>
                      {p.months.map((v, i) => (
                        <td key={MONTHS[i]}>
                          {v ? <span className={v === 2 ? s.peak : s.on}>{v === 2 ? 'Best' : 'In season'}</span> : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className={s.calKey}>
                <li>
                  <span className={s.keyOn} aria-hidden="true" />
                  <span data-edit="season.text" data-edit-max="60">At market</span>
                </li>
                <li>
                  <span className={s.keyPeak} aria-hidden="true" />
                  <span data-edit="season.text2" data-edit-max="60">At its best</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- PAYMENTS */}
        <section id="payments" className={s.payments} aria-labelledby="pay-h">
          <div className={s.payLeaves} aria-hidden="true">
            <TabbiedPattern
              pattern={lobe}
              palette={LEAVES_ON_GREEN}
              options={{ frequency: 0.4 }}
              fit="grid"
              cellSize={52}
              seed="sunday-pay"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.payInner}>
            <div className={s.payLead}>
              <p data-edit="payments.secKickerLight" data-edit-max="240" data-edit-multiline className={s.secKickerLight}>SNAP and payments</p>
              <h2 data-edit="payments.title" data-edit-format="emphasis" data-edit-max="60" id="pay-h" className={s.payTitle}>
                Your food dollars go <em>twice as far here.</em>
              </h2>
              <p className={s.payBig}>
                <span data-edit="payments.payFrom" data-edit-max="60" className={s.payFrom}>$1</span>
                <span data-edit="payments.payEq" data-edit-max="60" className={s.payEq}>SNAP buys</span>
                <span data-edit="payments.payTo" data-edit-max="60" className={s.payTo}>$2</span>
              </p>
              <p data-edit="payments.payNote" data-edit-max="240" data-edit-multiline className={s.payNote}>of fruit and vegetables, up to $20 every Sunday.</p>
              <Artwork
                slug="sunday-market-apples"
                alt="A wooden crate of apples"
                inks={{ red: 'var(--tomato)', blue: 'var(--leaf)', yellow: 'var(--squash)' }}
                className={s.apples}
              />
            </div>
            <ul className={s.payCards}>
              {PAYMENTS.map((p, i) => (
                <li key={p.title}>
                  <h3 data-edit={`payments.payCardTitle.${i}`} data-edit-max="40" className={s.payCardTitle}>{p.title}</h3>
                  <p data-edit={`payments.body.${i}`} data-edit-max="240" data-edit-multiline>{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ DIRECTIONS */}
        <section id="directions" className={s.directions} aria-labelledby="dir-h">
          <div className={s.dirIntro}>
            <p data-edit="directions.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Directions</p>
            <h2 data-edit="directions.secTitle" data-edit-max="60" id="dir-h" className={s.secTitle}>Mill Square, by the old mill race</h2>
            <p data-edit="directions.body4" data-edit-max="240" data-edit-multiline className={s.address}>
              Mill Square, between Mill Street and the Canal Walk
              <br />
              Harlow Falls
            </p>
            <dl className={s.when}>
              <div>
                <dt data-edit="directions.term" data-edit-max="28">Market days</dt>
                <dd data-edit="directions.body" data-edit-max="200" data-edit-multiline>Sundays, April 5 to November 29</dd>
              </div>
              <div>
                <dt data-edit="directions.term2" data-edit-max="28">Hours</dt>
                <dd data-edit="directions.body2" data-edit-max="200" data-edit-multiline>8 am - 1 pm</dd>
              </div>
              <div>
                <dt data-edit="directions.term3" data-edit-max="28">Winter market</dt>
                <dd data-edit="directions.body3" data-edit-max="200" data-edit-multiline>First Sunday of the month, in the Mill Hall</dd>
              </div>
            </dl>
          </div>
          <dl className={s.routes}>
            {GETTING_HERE.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`directions.term4.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`directions.body4.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.faqHead}>
            <p data-edit="faq.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Questions</p>
            <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Asked at the Info tent</h2>
            <p data-edit="faq.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Anything else, ask the market manager on the day, or write to
              hello@sundaymarket.example.
            </p>
          </div>
          <div className={s.faqList}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <div data-edit-pattern="page.field" data-edit-roles="transparent,3,4,2" className={s.leaves} aria-hidden="true">
        <TabbiedPattern
          pattern={lobe}
          palette={LEAVES}
          options={{ frequency: 0.45 }}
          fit="grid"
          cellSize={52}
          seed="sunday-leaves"
          redrawInterval={9000}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Sunday Market</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Mill Square, Harlow Falls. Sundays, 8 am - 1 pm, April to November.</p>
          </div>
          <div className={s.footContact}>
            <p>
              <a data-edit="footer.link" data-edit-max="28" href="mailto:hello@sundaymarket.example">hello@sundaymarket.example</a>
            </p>
            <p>
              <a data-edit="footer.link2" data-edit-max="28" href="tel:+15550133300">(555) 013-3300</a>
            </p>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional farmers market. Stalls, prices and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the market's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
