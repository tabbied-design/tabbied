import { TabbiedPattern } from 'tabbied/react';
import { roundcut, elbow } from 'tabbied/patterns';
import s from './whisk-and-ladle.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Whisk & Ladle: Kitchenware shop and cooking school, Mercer Avenue',
  description:
    'Whisk & Ladle sells pots, pans, knives and bakeware on Mercer Avenue and teaches cooking classes in the kitchen at the back. The catalog, the class schedule, knife sharpening and the order blank.',
};

/* Site colors. The quadrants are cut from the three enamel colors on the
   cream, the way a 1958 tablecloth was printed; the arcs in the footer are
   the same enamels on the charcoal. */
const CREAM = '#f6ecd6';
const CHAR = '#2b2622';
const TEAL = '#1f8a84';
const ORANGE = '#e0662a';
const MUSTARD = '#e8b33a';

const COVER = ['transparent', TEAL, ORANGE, MUSTARD, TEAL, CHAR];
const BAND = ['transparent', MUSTARD, TEAL, ORANGE, MUSTARD, TEAL];
const SWATCH = [TEAL, CREAM, MUSTARD, CREAM, ORANGE, CREAM];
const ARCS = ['transparent', TEAL, ORANGE, MUSTARD, CREAM, ORANGE];

const NAV = [
  ['Catalog', '#catalog'],
  ['Classes', '#classes'],
  ['Sharpening', '#sharpening'],
  ['Order blank', '#order'],
  ['Visit', '#visit'],
];

type Item = {
  no: string;
  name: string;
  note: string;
  dollars: string;
  cents: string;
  colors: ('teal' | 'orange' | 'mustard')[];
};

type Dept = {
  page: string;
  name: string;
  items: Item[];
};

const LEFT: Dept[] = [
  {
    page: 'Page 4',
    name: 'Pots and pans',
    items: [
      { no: '4-110', name: 'Enameled Dutch oven, 5.5 qt', note: 'Cast iron, oven-safe to 500 degrees. In teal, orange or mustard.', dollars: '$129', cents: '00', colors: ['teal', 'orange', 'mustard'] },
      { no: '4-126', name: 'Carbon steel skillet, 10 in', note: 'Seasons like cast iron at half the weight. Seasoned for you, once.', dollars: '$54', cents: '00', colors: [] },
      { no: '4-131', name: 'Tri-ply saucepan, 2 qt', note: 'Steel, aluminum, steel. Lid and a pouring lip.', dollars: '$78', cents: '00', colors: [] },
    ],
  },
  {
    page: 'Page 5',
    name: 'Knives',
    items: [
      { no: '5-202', name: 'Chef\'s knife, 8 in', note: 'German steel, full tang. Sharpened free for as long as you own it.', dollars: '$110', cents: '00', colors: [] },
      { no: '5-215', name: 'Paring knife, 3.5 in', note: 'The one you will actually reach for.', dollars: '$24', cents: '00', colors: [] },
      { no: '5-230', name: 'Bread knife, 10 in', note: 'Scalloped edge, will not tear a tomato either.', dollars: '$42', cents: '50', colors: [] },
    ],
  },
];

const RIGHT: Dept[] = [
  {
    page: 'Page 6',
    name: 'Bakeware',
    items: [
      { no: '6-301', name: 'Half sheet pan', note: 'Heavy aluminum, rolled edge. Buy two.', dollars: '$19', cents: '50', colors: [] },
      { no: '6-318', name: 'Stoneware pie dish, 9.5 in', note: 'Fluted rim, glazed inside. In teal or mustard.', dollars: '$32', cents: '00', colors: ['teal', 'mustard'] },
      { no: '6-340', name: 'Stand mixer, 5 qt', note: 'Ten speeds, a dough hook, a whisk and a paddle. Teal only this season.', dollars: '$389', cents: '00', colors: ['teal'] },
    ],
  },
  {
    page: 'Page 7',
    name: 'Whisks, ladles and the rest',
    items: [
      { no: '7-402', name: 'Balloon whisk, 12 in', note: 'Eleven wires. Whips a cup of cream in two minutes.', dollars: '$14', cents: '00', colors: [] },
      { no: '7-415', name: 'Ladle, one-piece steel', note: 'No seam for soup to hide in.', dollars: '$16', cents: '00', colors: [] },
      { no: '7-433', name: 'Kitchen scale, to the gram', note: 'Bakers weigh. It changes everything.', dollars: '$29', cents: '95', colors: [] },
    ],
  },
];

const SPREAD = [LEFT, RIGHT];

type Lesson = {
  no: string;
  day: string;
  date: string;
  name: string;
  who: string;
  time: string;
  price: string;
  left: number;
};

const CLASSES: Lesson[] = [
  { no: 'C-01', day: 'Thu', date: 'Oct 8', name: 'Knife skills', who: 'June', time: '6:30 to 9 pm', price: '$65', left: 3 },
  { no: 'C-02', day: 'Sat', date: 'Oct 10', name: 'Pasta by hand', who: 'Carlos', time: '11 am to 2 pm', price: '$85', left: 2 },
  { no: 'C-03', day: 'Tue', date: 'Oct 13', name: 'Weeknight braises', who: 'June', time: '6:30 to 9 pm', price: '$70', left: 6 },
  { no: 'C-04', day: 'Sat', date: 'Oct 17', name: 'Cookie morning, ages 7 to 12', who: 'Carlos', time: '10 am to noon', price: '$40', left: 0 },
  { no: 'C-05', day: 'Thu', date: 'Oct 22', name: 'Bread basics', who: 'June', time: '6 to 9:30 pm', price: '$80', left: 5 },
  { no: 'C-06', day: 'Sat', date: 'Oct 24', name: 'Curry pastes from scratch', who: 'Anong Chai, guest', time: '11 am to 2 pm', price: '$85', left: 4 },
  { no: 'C-07', day: 'Thu', date: 'Oct 29', name: 'All-butter pie crust', who: 'Carlos', time: '6:30 to 9 pm', price: '$70', left: 8 },
  { no: 'C-08', day: 'Sat', date: 'Nov 7', name: 'The holiday roast', who: 'June and Carlos', time: '11 am to 3 pm', price: '$120', left: 10 },
];

const SEATS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const BLADES = [
  { name: 'Paring and utility', range: 'Up to 5 in', price: '$6', span: 'r1' },
  { name: 'Chef\'s knives and santokus', range: '6 to 9 in', price: '$8', span: 'r2' },
  { name: 'Slicers and bread knives', range: '10 in and up', price: '$10', span: 'r3' },
];

const EXTRAS = [
  ['Scissors and shears', '$8'],
  ['Cleavers', '$12'],
  ['Japanese single-bevel, on the stones', '$14'],
  ['Serrated, any length', '$10'],
];

const INCHES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const HOURS = [
  ['Tuesday to Saturday', '10 to 6'],
  ['Sunday', '11 to 4'],
  ['Monday', 'Closed, except for classes'],
];

export default function WhiskAndLadlePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300..800&family=Yellowtail&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Whisk & Ladle</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ----------------------------------------------------------- COVER */}
        <section className={s.cover} aria-labelledby="cover-h">
          <div className={s.masthead}>
            <span>Fall and winter 2026</span>
            <span>Catalog no. 38</span>
            <span>36 Mercer Avenue</span>
          </div>

          <div className={s.coverGrid}>
            <div className={s.coverText}>
              <h1 id="cover-h" className={s.title}>Everything for the kitchen, <em>and the lessons to go with it.</em></h1>
              <p className={s.lede}>
                Pots, pans, knives and bakeware we have cooked with ourselves,
                on the shelves at the front. Cooking classes for twelve at the
                long table in the back. Knives sharpened by Saturday.
              </p>
              <div className={s.ctas}>
                <a className={s.btn} href="#classes">See the class schedule</a>
                <a className={s.btnGhost} href="#catalog">Browse the catalog</a>
              </div>
            </div>

            <div className={s.kidney}>
              <div className={s.kidneyField} aria-hidden="true">
                <TabbiedPattern
                  pattern={roundcut}
                  palette={COVER}
                  fit="grid"
                  cellSize={56}
                  seed="whisk-cover"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.burst}>Classes from $40</p>
              <span className={`${s.spark} ${s.sparkA}`} aria-hidden="true" />
              <span className={`${s.spark} ${s.sparkB}`} aria-hidden="true" />
              <span className={`${s.spark} ${s.sparkC}`} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CATALOG
            A spread: two pages, a gutter, departments and numbered items. */}
        <section id="catalog" className={s.sec} aria-labelledby="catalog-h">
          <div className={s.catHead}>
            <div className={s.secHead}>
              <p className={s.script}>From the shelves</p>
              <h2 id="catalog-h">The catalog</h2>
              <p className={s.secNote}>
                A few of the 600 things in the shop. Quote the number when you
                call and we will set it aside for a week.
              </p>
            </div>
            <div className={s.feature}>
              <Artwork
                slug="whisk-and-ladle-dutchoven"
                alt="An enameled Dutch oven with its lid on and a wooden spoon resting against it"
                inks={{ red: 'var(--orange)', yellow: 'var(--teal)' }}
                className={s.featureArt}
              />
              <p className={s.featureTag}>
                <span className={s.featureNo}>No. 4-110</span>
                <span className={s.featureText}>In three enamels, $129</span>
              </p>
            </div>
          </div>

          <div className={s.spread}>
            {SPREAD.map((leaf) => (
              <div key={leaf[0].page} className={s.leaf}>
                {leaf.map((d) => (
                  <div key={d.name} className={s.dept}>
                    <h3 className={s.deptName}>{d.name}</h3>
                    <ul className={s.items}>
                      {d.items.map((it) => (
                        <li key={it.no}>
                          <span className={s.itemNo}>{it.no}</span>
                          <div className={s.itemBody}>
                            <h4 className={s.itemName}>{it.name}</h4>
                            <p className={s.itemNote}>{it.note}</p>
                            <div className={s.colors} aria-hidden="true">
                              {it.colors.map((c) => (
                                <span key={c} className={s[c]} />
                              ))}
                            </div>
                          </div>
                          <p className={s.price}>
                            <span>{it.dollars}</span>
                            <span className={s.cents}>{it.cents}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className={s.folio}>{d.page}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* The tablecloth band between the catalog and the classes. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={roundcut}
            palette={BAND}
            fit="grid"
            cellSize={44}
            seed="whisk-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.secHead}>
            <p className={s.script}>October and November</p>
            <h2 id="classes-h">Cooking school</h2>
            <p className={s.secNote}>
              At the long table in the back: ten seats a class, aprons and
              knives on us, and you eat what you make. Wine with the evening
              classes; lemonade with the cookies.
            </p>
          </div>

          <ol className={s.schedule}>
            {CLASSES.map((c) => (
              <li key={c.no} className={c.left === 0 ? s.full : undefined}>
                <span className={s.classNo}>{c.no}</span>
                <p className={s.when}>
                  <span className={s.day}>{c.day}</span>
                  <span className={s.date}>{c.date}</span>
                </p>
                <div className={s.classBody}>
                  <h3 className={s.className}>{c.name}</h3>
                  <p className={s.classMeta}>{`${c.who}, ${c.time}`}</p>
                </div>
                <div className={s.seats} aria-hidden="true">
                  {SEATS.map((j) => (
                    <span key={j} className={j < 10 - c.left ? s.taken : s.open} />
                  ))}
                </div>
                <p className={s.left}>{c.left === 0 ? 'Full, waitlist open' : `${c.left} of 10 seats left`}</p>
                <p className={s.classPrice}>{c.price}</p>
              </li>
            ))}
          </ol>
          <p className={s.small}>
            Cancel a week ahead for a full refund, or send a friend in your
            place any time. Private classes for six to twelve, from $55 a head.
          </p>
        </section>

        {/* ------------------------------------------------------ SHARPENING */}
        <section id="sharpening" className={s.sec} aria-labelledby="sharp-h">
          <div className={s.sharpGrid}>
            <div>
              <div className={s.secHead}>
                <p className={s.script}>Service counter</p>
                <h2 id="sharp-h">Knife sharpening, by the inch</h2>
                <p className={s.secNote}>
                  Drop them off by Thursday noon, collect them Saturday. On the
                  first Saturday of the month Carlos sharpens while you wait,
                  10 to 1, a dollar extra a knife.
                </p>
              </div>

              <div className={s.ruler}>
                <ol className={s.inches} aria-hidden="true">
                  {INCHES.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ol>
                <ul className={s.blades}>
                  {BLADES.map((b) => (
                    <li key={b.name} className={s[b.span]}>
                      <span className={s.bladeName}>{b.name}</span>
                      <span className={s.bladeRange}>{b.range}</span>
                      <strong className={s.bladePrice}>{b.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className={s.extras}>
                {EXTRAS.map(([what, price]) => (
                  <li key={what}>
                    <span>{what}</span>
                    <span className={s.extraPrice}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.swatchCol}>
              <div className={s.swatch} aria-hidden="true">
                <TabbiedPattern
                  pattern={roundcut}
                  palette={SWATCH}
                  fit="grid"
                  cellSize={36}
                  seed="whisk-swatch"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.deal}>Every sixth knife free</p>
              <p className={s.dealNote}>Bring five, and the sixth is on the house. Knives bought here are sharpened free, always.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.sec} aria-labelledby="order-h">
          <form className={s.blank} action="#">
            <div className={s.blankHead}>
              <h2 id="order-h" className={s.blankTitle}>Order blank</h2>
              <p className={s.blankNote}>Reserve a seat, or ask us to set an item aside. Please print.</p>
            </div>
            <div className={s.blankGrid}>
              <div className={`${s.box} ${s.boxWide}`}>
                <label htmlFor="wl-name">Your name</label>
                <input id="wl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.box}>
                <label htmlFor="wl-phone">Telephone</label>
                <input id="wl-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.box} ${s.boxWide}`}>
                <label htmlFor="wl-email">Email</label>
                <input id="wl-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.box}>
                <label htmlFor="wl-no">Class or item no.</label>
                <input id="wl-no" name="number" type="text" placeholder="C-05 or 4-110" />
              </div>
              <div className={s.box}>
                <label htmlFor="wl-qty">Seats or quantity</label>
                <select id="wl-qty" name="qty" defaultValue="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className={`${s.box} ${s.boxWide}`}>
                <label htmlFor="wl-notes">Anything else</label>
                <input id="wl-notes" name="notes" type="text" />
              </div>
            </div>
            <div className={s.blankFoot}>
              <p className={s.blankFine}>We hold items for a week and seats for two days, then call to confirm. Pay in the shop.</p>
              <button className={s.btn} type="submit">Send the order</button>
            </div>
          </form>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div>
              <p className={s.script}>Come in</p>
              <h2 id="visit-h">36 Mercer Avenue, Old Mill</h2>
              <p className={s.address}>
                The green awning between the hardware store and the bakery. The
                classes are through the shop and past the wall of whisks.
              </p>
              <p className={s.contact}>
                <a href="tel:+15550182260">(555) 018-2260</a>
                <br />
                <a href="mailto:shop@whiskandladle.example">shop@whiskandladle.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <div className={s.owners}>
              <p className={s.ownersText}>
                June Halvorsen cooked in restaurants for eighteen years and
                teaches most weeknights. Carlos Ibarra ran a hardware store,
                which explains the sharpening. They opened in 2014.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={elbow}
            palette={ARCS}
            fit="grid"
            cellSize={48}
            seed="whisk-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footText}>
          <p className={s.footName}>Whisk & Ladle</p>
          <p>A fictional kitchenware shop and cooking school. The items, classes, prices and people are invented.</p>
          <p>The Dutch oven is a generated image, printed in the page's colors.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
