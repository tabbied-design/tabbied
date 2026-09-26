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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#f6ecd6',
        '--char': '#2b2622',
        '--teal': '#1f8a84',
        '--orange': '#e0662a',
        '--mustard': '#e8b33a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,char,teal,orange,mustard"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300..800&family=Yellowtail&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Whisk & Ladle</a>
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
        {/* ----------------------------------------------------------- COVER */}
        <section className={s.cover} aria-labelledby="cover-h">
          <div className={s.masthead}>
            <span data-edit="cover.text" data-edit-max="60">Fall and winter 2026</span>
            <span data-edit="cover.text2" data-edit-max="60">Catalog no. 38</span>
            <span data-edit="cover.text3" data-edit-max="60">36 Mercer Avenue</span>
          </div>

          <div className={s.coverGrid}>
            <div className={s.coverText}>
              <h1 data-edit="cover.title" data-edit-format="emphasis" data-edit-max="70" id="cover-h" className={s.title}>Everything for the kitchen, <em>and the lessons to go with it.</em></h1>
              <p data-edit="cover.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Pots, pans, knives and bakeware we have cooked with ourselves,
                on the shelves at the front. Cooking classes for twelve at the
                long table in the back. Knives sharpened by Saturday.
              </p>
              <div className={s.ctas}>
                <a data-edit="cover.btn" data-edit-max="28" className={s.btn} href="#classes">See the class schedule</a>
                <a data-edit="cover.btnGhost" data-edit-max="28" className={s.btnGhost} href="#catalog">Browse the catalog</a>
              </div>
            </div>

            <div className={s.kidney}>
              <div data-edit-pattern="cover.field" data-edit-roles="transparent,2,3,4,2,1" className={s.kidneyField} aria-hidden="true">
                <TabbiedPattern
                  pattern={roundcut}
                  palette={COVER}
                  fit="grid"
                  cellSize={56}
                  seed="whisk-cover"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="cover.burst" data-edit-max="240" data-edit-multiline className={s.burst}>Classes from $40</p>
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
              <p data-edit="catalog.script" data-edit-max="240" data-edit-multiline className={s.script}>From the shelves</p>
              <h2 data-edit="catalog.title" data-edit-max="60" id="catalog-h">The catalog</h2>
              <p data-edit="catalog.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
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
                <span data-edit="catalog.featureNo" data-edit-max="60" className={s.featureNo}>No. 4-110</span>
                <span data-edit="catalog.featureText" data-edit-max="60" className={s.featureText}>In three enamels, $129</span>
              </p>
            </div>
          </div>

          <div className={s.spread}>
            {SPREAD.map((leaf, i) => (
              <div key={leaf[0].page} className={s.leaf}>
                {leaf.map((d, i2) => (
                  <div key={d.name} className={s.dept}>
                    <h3 data-edit={`catalog.deptName.${i}.${i2}`} data-edit-max="40" className={s.deptName}>{d.name}</h3>
                    <ul className={s.items}>
                      {d.items.map((it, i3) => (
                        <li key={it.no}>
                          <span data-edit={`catalog.itemNo.${i}.${i2}.${i3}`} data-edit-max="60" className={s.itemNo}>{it.no}</span>
                          <div className={s.itemBody}>
                            <h4 data-edit={`catalog.itemName.${i}.${i2}.${i3}`} data-edit-max="36" className={s.itemName}>{it.name}</h4>
                            <p data-edit={`catalog.itemNote.${i}.${i2}.${i3}`} data-edit-max="240" data-edit-multiline className={s.itemNote}>{it.note}</p>
                            <div className={s.colors} aria-hidden="true">
                              {it.colors.map((c) => (
                                <span key={c} className={s[c]} />
                              ))}
                            </div>
                          </div>
                          <p className={s.price}>
                            <span data-edit={`catalog.text.${i}.${i2}.${i3}`} data-edit-max="60">{it.dollars}</span>
                            <span data-edit={`catalog.cents.${i}.${i2}.${i3}`} data-edit-max="60" className={s.cents}>{it.cents}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p data-edit={`catalog.folio.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.folio}>{d.page}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* The tablecloth band between the catalog and the classes. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,3,4,2" className={s.band} aria-hidden="true">
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
            <p data-edit="classes.script" data-edit-max="240" data-edit-multiline className={s.script}>October and November</p>
            <h2 data-edit="classes.title" data-edit-max="60" id="classes-h">Cooking school</h2>
            <p data-edit="classes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              At the long table in the back: ten seats a class, aprons and
              knives on us, and you eat what you make. Wine with the evening
              classes; lemonade with the cookies.
            </p>
          </div>

          <ol className={s.schedule}>
            {CLASSES.map((c, i) => (
              <li key={c.no} className={c.left === 0 ? s.full : undefined}>
                <span data-edit={`classes.classNo.${i}`} data-edit-max="60" className={s.classNo}>{c.no}</span>
                <p className={s.when}>
                  <span data-edit={`classes.day.${i}`} data-edit-max="60" className={s.day}>{c.day}</span>
                  <span data-edit={`classes.date.${i}`} data-edit-max="60" className={s.date}>{c.date}</span>
                </p>
                <div className={s.classBody}>
                  <h3 data-edit={`classes.className.${i}`} data-edit-max="40" className={s.className}>{c.name}</h3>
                  <p className={s.classMeta}>{`${c.who}, ${c.time}`}</p>
                </div>
                <div className={s.seats} aria-hidden="true">
                  {SEATS.map((j) => (
                    <span key={j} className={j < 10 - c.left ? s.taken : s.open} />
                  ))}
                </div>
                <p className={s.left}>{c.left === 0 ? 'Full, waitlist open' : `${c.left} of 10 seats left`}</p>
                <p data-edit={`classes.classPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.classPrice}>{c.price}</p>
              </li>
            ))}
          </ol>
          <p data-edit="classes.small" data-edit-max="240" data-edit-multiline className={s.small}>
            Cancel a week ahead for a full refund, or send a friend in your
            place any time. Private classes for six to twelve, from $55 a head.
          </p>
        </section>

        {/* ------------------------------------------------------ SHARPENING */}
        <section id="sharpening" className={s.sec} aria-labelledby="sharp-h">
          <div className={s.sharpGrid}>
            <div>
              <div className={s.secHead}>
                <p data-edit="sharpening.script" data-edit-max="240" data-edit-multiline className={s.script}>Service counter</p>
                <h2 data-edit="sharpening.title" data-edit-max="60" id="sharp-h">Knife sharpening, by the inch</h2>
                <p data-edit="sharpening.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Drop them off by Thursday noon, collect them Saturday. On the
                  first Saturday of the month Carlos sharpens while you wait,
                  10 to 1, a dollar extra a knife.
                </p>
              </div>

              <div className={s.ruler}>
                <ol className={s.inches} aria-hidden="true">
                  {INCHES.map((n, i) => (
                    <li data-edit={`sharpening.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                  ))}
                </ol>
                <ul className={s.blades}>
                  {BLADES.map((b, i) => (
                    <li key={b.name} className={s[b.span]}>
                      <span data-edit={`sharpening.bladeName.${i}`} data-edit-max="60" className={s.bladeName}>{b.name}</span>
                      <span data-edit={`sharpening.bladeRange.${i}`} data-edit-max="60" className={s.bladeRange}>{b.range}</span>
                      <strong data-edit={`sharpening.bladePrice.${i}`} className={s.bladePrice}>{b.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className={s.extras}>
                {EXTRAS.map(([what, price], i) => (
                  <li key={what}>
                    <span data-edit={`sharpening.text.${i}`} data-edit-max="60">{what}</span>
                    <span data-edit={`sharpening.extraPrice.${i}`} data-edit-max="60" className={s.extraPrice}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.swatchCol}>
              <div data-edit-pattern="sharpening.field" data-edit-roles="2,0,4,0,3,0" className={s.swatch} aria-hidden="true">
                <TabbiedPattern
                  pattern={roundcut}
                  palette={SWATCH}
                  fit="grid"
                  cellSize={36}
                  seed="whisk-swatch"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="sharpening.deal" data-edit-max="240" data-edit-multiline className={s.deal}>Every sixth knife free</p>
              <p data-edit="sharpening.dealNote" data-edit-max="240" data-edit-multiline className={s.dealNote}>Bring five, and the sixth is on the house. Knives bought here are sharpened free, always.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.sec} aria-labelledby="order-h">
          <form className={s.blank} action="#">
            <div className={s.blankHead}>
              <h2 data-edit="order.blankTitle" data-edit-max="60" id="order-h" className={s.blankTitle}>Order blank</h2>
              <p data-edit="order.blankNote" data-edit-max="240" data-edit-multiline className={s.blankNote}>Reserve a seat, or ask us to set an item aside. Please print.</p>
            </div>
            <div className={s.blankGrid}>
              <div className={`${s.box} ${s.boxWide}`}>
                <label data-edit="order.label" htmlFor="wl-name">Your name</label>
                <input id="wl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.box}>
                <label data-edit="order.label2" htmlFor="wl-phone">Telephone</label>
                <input id="wl-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.box} ${s.boxWide}`}>
                <label data-edit="order.label3" htmlFor="wl-email">Email</label>
                <input id="wl-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.box}>
                <label data-edit="order.label4" htmlFor="wl-no">Class or item no.</label>
                <input id="wl-no" name="number" type="text" placeholder="C-05 or 4-110" />
              </div>
              <div className={s.box}>
                <label data-edit="order.label5" htmlFor="wl-qty">Seats or quantity</label>
                <select id="wl-qty" name="qty" defaultValue="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className={`${s.box} ${s.boxWide}`}>
                <label data-edit="order.label6" htmlFor="wl-notes">Anything else</label>
                <input id="wl-notes" name="notes" type="text" />
              </div>
            </div>
            <div className={s.blankFoot}>
              <p data-edit="order.blankFine" data-edit-max="240" data-edit-multiline className={s.blankFine}>We hold items for a week and seats for two days, then call to confirm. Pay in the shop.</p>
              <button data-edit="order.btn" data-edit-max="24" className={s.btn} type="submit">Send the order</button>
            </div>
          </form>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div>
              <p data-edit="visit.script" data-edit-max="240" data-edit-multiline className={s.script}>Come in</p>
              <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">36 Mercer Avenue, Old Mill</h2>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>
                The green awning between the hardware store and the bakery. The
                classes are through the shop and past the wall of whisks.
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550182260">(555) 018-2260</a>
                <br />
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:shop@whiskandladle.example">shop@whiskandladle.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
            <div className={s.owners}>
              <p data-edit="visit.ownersText" data-edit-max="240" data-edit-multiline className={s.ownersText}>
                June Halvorsen cooked in restaurants for eighteen years and
                teaches most weeknights. Carlos Ibarra ran a hardware store,
                which explains the sharpening. They opened in 2014.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,0,3" className={s.footBand} aria-hidden="true">
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
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Whisk & Ladle</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional kitchenware shop and cooking school. The items, classes, prices and people are invented.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The Dutch oven is a generated image, printed in the page's colors.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
