import { TabbiedPattern } from 'tabbied/react';
import { scotia, weave, diagonalweave, roundcut } from 'tabbied/patterns';
import s from './eight-folds-dumplings.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Eight Folds: Dumpling house, 31 Lantern Street, Riverside',
  description:
    'Eight Folds folds every dumpling to order on Lantern Street: soup dumplings, har gow, pan-fried potstickers and bao, ticked off on a paper order sheet. Saturday dumpling classes and frozen bags to cook at home.',
};

/* Site colors. The bamboo is the ground; soy, chili and scallion are the
   inks. Lids and mats keep a transparent pattern ground so the wood tone
   mixed under them shows through. */
const BAMBOO = '#eed8a6';
const SOY = '#2a1f17';
const CHILI = '#c6362e';
const SCALLION = '#6a994b';

const LID = ['transparent', SOY, BAMBOO, CHILI, BAMBOO, SCALLION];
const WEAVE_LID = ['transparent', SOY, BAMBOO, SOY, SCALLION, BAMBOO];
const MAT = ['transparent', BAMBOO, SOY, BAMBOO, SCALLION, CHILI];
const PRINT = ['transparent', CHILI, SOY, SCALLION, SOY];
const TRAY = ['transparent', CHILI, BAMBOO, SCALLION, SOY, BAMBOO];
const FROST = ['transparent', BAMBOO, SCALLION, BAMBOO];
const HEM = ['transparent', CHILI, BAMBOO, SCALLION, BAMBOO, SOY];

const NAV = [
  ['The folds', '#folds'],
  ['Order sheet', '#menu'],
  ['Class', '#class'],
  ['Frozen bags', '#frozen'],
  ['Visit', '#visit'],
];

const HERO_FACTS = [
  ['8', 'folds on every har gow'],
  ['18 g', 'of filling, weighed'],
  ['4,000', 'folded by hand a day'],
];

/* How the pleats are made, one fold at a time round the circle. */
const FOLDS = [
  { n: '1', title: 'Rest the dough', note: 'Hot-water dough, rested half an hour under a damp cloth.' },
  { n: '2', title: 'Roll the skin', note: 'Eight centimetres across, thin at the edge and thicker at the middle.' },
  { n: '3', title: 'Weigh the filling', note: 'Eighteen grams on the scale, every time, for every folder.' },
  { n: '4', title: 'Cup the hand', note: 'The skin sits in the palm; the thumb holds the filling down.' },
  { n: '5', title: 'The first fold', note: 'Pinch a pleat at twelve o\'clock and press it flat against the next.' },
  { n: '6', title: 'Pleat and turn', note: 'Pinch, push, turn the dumpling a little. Six more times.' },
  { n: '7', title: 'The eighth fold', note: 'The last pleat meets the first and closes the circle.' },
  { n: '8', title: 'Twist and steam', note: 'A twist at the top, onto the liner, eight minutes over the wok.' },
];

const KITCHEN = [
  ['2011', 'Wen Lihua opens in the old laundry'],
  ['6', 'folders at the long table, from 07:00'],
  ['3', 'woks under the steamer stacks'],
];

type Item = {
  name: string;
  note: string;
  pcs: string;
  price: string;
  mark?: string;
};

type Category = {
  id: string;
  stamp: string;
  items: Item[];
  side: 'steamed' | 'soup' | 'bao' | 'note';
  pencil?: string;
};

const MENU: Category[] = [
  {
    id: 'steamed',
    stamp: 'Steamed',
    side: 'steamed',
    items: [
      { name: 'Har gow', note: 'Shrimp and bamboo shoot, crystal skin, eight folds', pcs: '4', price: '$7.50', mark: '2' },
      { name: 'Siu mai', note: 'Pork and shrimp, open top, flying fish roe', pcs: '4', price: '$7.00' },
      { name: 'Chiu chow fun guo', note: 'Peanut, chive, pork and dried radish', pcs: '3', price: '$6.50' },
      { name: 'Scallop and chive', note: 'Clear skin, a whole scallop in each', pcs: '3', price: '$8.50' },
      { name: 'Spinach and shiitake', note: 'Vegan, green skin', pcs: '4', price: '$6.50' },
    ],
  },
  {
    id: 'soup',
    stamp: 'Soup dumplings',
    side: 'soup',
    items: [
      { name: 'Xiao long bao', note: 'Pork, with the soup set inside; eat from the spoon', pcs: '6', price: '$9.00', mark: '1' },
      { name: 'Crab and pork', note: 'Blue swimmer crab, a little ginger', pcs: '6', price: '$12.50' },
      { name: 'Chicken and ginger', note: 'Clear chicken broth, no pork', pcs: '6', price: '$9.50' },
    ],
  },
  {
    id: 'fried',
    stamp: 'Pan-fried',
    side: 'note',
    pencil: 'ask for the lace bottoms extra crisp. worth the wait!',
    items: [
      { name: 'Potstickers', note: 'Pork and napa cabbage, joined by a crisp lace', pcs: '6', price: '$8.50' },
      { name: 'Sheng jian bao', note: 'Pan-fried soup buns, sesame and scallion', pcs: '4', price: '$9.00' },
      { name: 'Leek and egg', note: 'Vegetarian, glass noodles', pcs: '6', price: '$8.00' },
    ],
  },
  {
    id: 'bao',
    stamp: 'Bao',
    side: 'bao',
    items: [
      { name: 'Char siu bao', note: 'Roast pork, the bun split at the top', pcs: '3', price: '$6.50', mark: '1' },
      { name: 'Mushroom and tofu bao', note: 'Vegan, black pepper', pcs: '3', price: '$6.00' },
      { name: 'Pork belly gua bao', note: 'Pickled mustard greens, peanut, coriander', pcs: '2', price: '$9.00' },
    ],
  },
  {
    id: 'greens',
    stamp: 'Greens',
    side: 'note',
    pencil: 'one plate of greens for every two baskets. house rule.',
    items: [
      { name: 'Gai lan', note: 'Blanched, oyster sauce', pcs: '', price: '$8.00' },
      { name: 'Smacked cucumber', note: 'Black vinegar, garlic, chili oil', pcs: '', price: '$6.00' },
      { name: 'Morning glory', note: 'Wok-fried with garlic and chili', pcs: '', price: '$9.00' },
    ],
  },
  {
    id: 'sweet',
    stamp: 'Sweet',
    side: 'note',
    pencil: 'save room for the custard bao',
    items: [
      { name: 'Custard bao', note: 'Salted egg yolk custard, runs when you tear it', pcs: '3', price: '$6.50' },
      { name: 'Sesame balls', note: 'Red bean inside, fried to order', pcs: '3', price: '$5.50' },
      { name: 'Mango pudding', note: 'With evaporated milk', pcs: '', price: '$5.00' },
    ],
  },
];

const CLASS_PARTS = [
  { time: '10:00', title: 'Dough and skins', note: 'Hot-water dough, the rolling pin, and why the middle stays thick.' },
  { time: '10:45', title: 'Two fillings', note: 'Pork and cabbage, and a vegetable one. Weighing is not optional.' },
  { time: '11:15', title: 'The folds', note: 'Crescent, the eight-fold purse, and the soup dumpling twist.' },
  { time: '12:00', title: 'Steam and eat', note: 'Your own basket at the long table, with tea and the vinegar.' },
];

const CLASS_DATES = [
  { date: 'Sat 11 Oct', seats: '3 places' },
  { date: 'Sat 25 Oct', seats: 'Full' },
  { date: 'Sat 8 Nov', seats: '6 places' },
  { date: 'Sat 22 Nov', seats: '8 places' },
];

const BAGS = [
  { name: 'Pork and cabbage', note: 'The potsticker filling. Steam, boil or fry.', twenty: '$16', fifty: '$36', tag: 'Most bought' },
  { name: 'Chicken and ginger', note: 'Light, a lot of ginger. Best boiled in broth.', twenty: '$17', fifty: '$38', tag: 'No pork' },
  { name: 'Leek, egg and noodle', note: 'Vegetarian. Fry them until the skins blister.', twenty: '$15', fifty: '$34', tag: 'Vegetarian' },
  { name: 'Xiao long bao', note: 'Steam from frozen, 12 minutes, on a liner.', twenty: '$19', fifty: '', tag: 'By the 20 only' },
];

const COOK = [
  ['Steam', '12 minutes from frozen, on a liner or a cabbage leaf.'],
  ['Boil', 'Into rolling water, back to the boil twice with a cup of cold, 7 minutes.'],
  ['Pan-fry', 'Oil, dumplings, 2 minutes; a splash of water and a lid, 7 more.'],
];

const HOURS = [
  { days: 'Tuesday to Thursday', time: '11:30-21:00' },
  { days: 'Friday and Saturday', time: '11:30-22:30' },
  { days: 'Sunday', time: '11:00-20:00' },
];

export default function EightFoldsDumplingsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--bamboo': '#eed8a6',
        '--soy': '#2a1f17',
        '--chili': '#c6362e',
        '--scallion': '#6a994b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="bamboo,soy,chili,scallion"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gelasio:ital,wght@0,500;0,700;1,500&family=Gantari:wght@400;600&family=Reenie+Beanie&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markBasket} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Eight Folds</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className={s.barNote}>
          <span data-edit="bar.text" data-edit-max="60">Order ahead</span>
          <a data-edit="bar.link2" data-edit-max="28" href="tel:+15550138808">(555) 013-8808</a>
        </p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link3.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Steamers from above. The front lid has a window cut through it,
            and a soup dumpling sits inside on its cabbage leaf. */}
        <section className={s.hero} aria-labelledby="ef-hero-h">
          <div className={s.heroCopy}>
            <p data-edit="efHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Dumpling house, 31 Lantern Street, Riverside</p>
            <h1 data-edit="efHero.title" data-edit-max="70" id="ef-hero-h" className={s.title}>Eight Folds</h1>
            <p data-edit="efHero.subtitle" data-edit-max="240" data-edit-multiline className={s.subtitle}>Folded to order, steamed in bamboo</p>
            <p data-edit="efHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Six of us fold at the long table in the window from seven in the
              morning. Tick what you want on the order sheet, hand it over, and
              the baskets come up the stairs as each one is ready.
            </p>
            <p className={s.actions}>
              <a data-edit="efHero.btn" data-edit-max="28" className={s.btn} href="#menu">Read the order sheet</a>
              <a data-edit="efHero.btnLine" data-edit-max="28" className={s.btnLine} href="#class">Saturday class</a>
            </p>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([figure, what], i) => (
                <div key={what}>
                  <dt data-edit={`efHero.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`efHero.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.table}>
            <div className={`${s.steamer} ${s.steamerBack}`}>
              <div data-edit-pattern="efHero.field" data-edit-roles="transparent,1,0,1,3,0" className={s.lidPlain} aria-hidden="true">
                <TabbiedPattern
                  pattern={weave}
                  palette={WEAVE_LID}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={26}
                  seed="eight-folds-back-lid"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>

            <div className={`${s.steamer} ${s.steamerFront}`}>
              <div className={s.inside}>
                <span className={s.leaf} aria-hidden="true" />
                <Artwork
                  slug="eight-folds-dumplings-xiaolongbao"
                  alt="A soup dumpling with a pleated, twisted top, seen through a window cut in the steamer lid"
                  inks={{ red: 'var(--paper)', black: 'var(--soy)' }}
                  className={s.heroDumpling}
                />
              </div>
              <div data-edit-pattern="efHero.field2" data-edit-roles="transparent,1,0,2,0,3" className={s.lid} aria-hidden="true">
                <TabbiedPattern
                  pattern={scotia}
                  palette={LID}
                  fit="grid"
                  cellSize={34}
                  seed="eight-folds-lid"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.windowEdge} aria-hidden="true" />
            </div>

            <div className={s.dish} aria-hidden="true">
              <span className={s.ginger} />
              <span className={s.ginger} />
              <span className={s.ginger} />
            </div>
            <div className={s.heroSticks} aria-hidden="true">
              <span />
              <span />
            </div>
            <p data-edit="efHero.tableNote" data-edit-max="240" data-edit-multiline className={s.tableNote}>Pork xiao long bao, six to a basket, $9</p>
          </div>
        </section>

        <div className={s.rest} aria-hidden="true">
          <span className={s.restBody} />
          <span className={s.stickA} />
          <span className={s.stickB} />
        </div>

        {/* ----------------------------------------------------------- FOLDS */}
        <section id="folds" className={s.sec} aria-labelledby="ef-folds-h">
          <div className={s.secHead}>
            <p data-edit="folds.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The eight folds</p>
            <h2 data-edit="folds.title" data-edit-max="60" id="ef-folds-h">Eight pleats, no more and no fewer</h2>
            <p data-edit="folds.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Wen Lihua learned to fold in her aunt&apos;s kitchen in Wuxi,
              where a har gow with seven pleats went back in the bowl. She has
              taught the same eight to everyone who has folded here since.
            </p>
          </div>

          <div className={s.foldGrid}>
            <div className={s.pleatWrap}>
              <div className={s.pleats} aria-hidden="true">
                <span className={s.knot} />
              </div>
              <ol className={s.pleatNums} aria-hidden="true">
                {FOLDS.map((f, i) => (
                  <li data-edit={`folds.item.${i}`} data-edit-max="80" key={f.n} style={{ '--i': i } as React.CSSProperties}>{f.n}</li>
                ))}
              </ol>
            </div>
            <ol className={s.steps}>
              {FOLDS.map((f, i) => (
                <li key={f.n} className={s.step}>
                  <span data-edit={`folds.stepN.${i}`} data-edit-max="60" className={s.stepN}>{f.n}</span>
                  <h3 data-edit={`folds.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{f.title}</h3>
                  <p data-edit={`folds.stepNote.${i}`} data-edit-max="240" data-edit-multiline className={s.stepNote}>{f.note}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className={s.kitchen}>
            <div data-edit-pattern="folds.field" data-edit-roles="transparent,0,1,0,3,2" className={s.mat} aria-hidden="true">
              <TabbiedPattern
                pattern={weave}
                palette={MAT}
                options={{ frequency: 0.9 }}
                fit="grid"
                cellSize={30}
                seed="eight-folds-mat"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.kitchenCard}>
              <h3 data-edit="folds.cardTitle" data-edit-max="40" className={s.cardTitle}>The kitchen</h3>
              <p data-edit="folds.body" data-edit-max="240" data-edit-multiline>
                Eight Folds opened in 2011 in what had been the Lantern Street
                laundry, and the long table is the old folding table from the
                back room. The steamers are stacked five high over three woks;
                the stairs are the only way the baskets reach you.
              </p>
              <dl className={s.kitchenFacts}>
                {KITCHEN.map(([figure, what], i) => (
                  <div key={what}>
                    <dt data-edit={`folds.term.${i}`} data-edit-max="28">{figure}</dt>
                    <dd data-edit={`folds.body2.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ MENU
            The order sheet: printed columns, stamps down the side, a pencil
            note or two, and the baskets set down beside their section. */}
        <section id="menu" className={s.sec} aria-labelledby="ef-menu-h">
          <div className={s.secHead}>
            <p data-edit="menu.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The menu</p>
            <h2 data-edit="menu.title" data-edit-max="60" id="ef-menu-h">Tick the boxes, hand it over</h2>
            <p data-edit="menu.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every table gets a sheet and a pencil. Write how many baskets in
              the boxes; a basket is the count on the line. Nothing is cooked
              until it is ordered, so the first basket takes ten minutes.
            </p>
          </div>

          <div className={s.sheetWrap}>
            <div className={s.sheetTop}>
              <div data-edit-pattern="menu.field" data-edit-roles="transparent,2,1,3,1" className={s.printBand} aria-hidden="true">
                <TabbiedPattern
                  pattern={scotia}
                  palette={PRINT}
                  fit="grid"
                  cellSize={20}
                  seed="eight-folds-print"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.sheetHeadRow}>
                <p data-edit="menu.sheetBrand" data-edit-max="240" data-edit-multiline className={s.sheetBrand}>Eight Folds</p>
                <p data-edit="menu.sheetKind" data-edit-max="240" data-edit-multiline className={s.sheetKind}>Dim sum order sheet</p>
              </div>
              <p className={s.blanks}>
                <span className={s.blank}><span data-edit="menu.text" data-edit-max="60">Table</span><span data-edit="menu.pencilIn" data-edit-max="60" className={s.pencilIn}>12</span></span>
                <span className={s.blank}><span data-edit="menu.text2" data-edit-max="60">Guests</span><span data-edit="menu.pencilIn2" data-edit-max="60" className={s.pencilIn}>3</span></span>
                <span className={s.blank}><span data-edit="menu.text3" data-edit-max="60">Tea</span><span data-edit="menu.pencilIn3" data-edit-max="60" className={s.pencilIn}>jasmine</span></span>
              </p>
              <p className={s.colHeads} aria-hidden="true">
                <span data-edit="menu.text4" data-edit-max="60">Item</span>
                <span data-edit="menu.text5" data-edit-max="60">Pcs</span>
                <span data-edit="menu.text6" data-edit-max="60">Price</span>
                <span data-edit="menu.text7" data-edit-max="60">Baskets</span>
              </p>
            </div>
            <div className={s.pencil} aria-hidden="true" />

            {MENU.map((c, i) => (
              <div key={c.id} className={s.catRow}>
                <div className={s.cat}>
                  <p data-edit={`menu.stamp.${i}`} data-edit-max="240" data-edit-multiline className={s.stamp}>{c.stamp}</p>
                  <table className={s.items}>
                    <caption data-edit={`menu.srOnly.${i}`} className={s.srOnly}>{c.stamp}</caption>
                    <tbody>
                      {c.items.map((it, i2) => (
                        <tr key={it.name}>
                          <th scope="row">
                            <span data-edit={`menu.itemName.${i}.${i2}`} data-edit-max="60" className={s.itemName}>{it.name}</span>
                            <span data-edit={`menu.itemNote.${i}.${i2}`} data-edit-max="60" className={s.itemNote}>{it.note}</span>
                          </th>
                          <td data-edit={`menu.pcs.${i}.${i2}`} className={s.pcs}>{it.pcs}</td>
                          <td data-edit={`menu.price.${i}.${i2}`} className={s.price}>{it.price}</td>
                          <td className={s.boxes}>
                            <span className={s.box}>{it.mark ? <span data-edit={`menu.pencilMark.${i}.${i2}`} data-edit-max="60" className={s.pencilMark}>{it.mark}</span> : null}</span>
                            <span className={s.box} />
                            <span className={s.box} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={s.side}>
                  {c.side === 'steamed' ? (
                    <div className={s.pair}>
                      <div className={`${s.basket} ${s.linerPaper}`}>
                        <Artwork
                          slug="eight-folds-dumplings-hargow"
                          alt="A crescent har gow with neat pleats along its edge"
                          inks={{ red: 'var(--paper)', blue: 'var(--chili)' }}
                          className={s.hargow}
                        />
                      </div>
                      <div className={`${s.basket} ${s.basketSmall} ${s.linerLeaf}`}>
                        <Artwork
                          slug="eight-folds-dumplings-siumai"
                          alt="An open-topped siu mai with a frilled wrapper and a dot of roe"
                          inks={{ red: 'var(--chili)', blue: 'var(--paper)' }}
                          className={s.siumai}
                        />
                      </div>
                    </div>
                  ) : null}
                  {c.side === 'soup' ? (
                    <div className={`${s.basket} ${s.linerSoy}`}>
                      <Artwork
                        slug="eight-folds-dumplings-xiaolongbao"
                        alt="A soup dumpling with its pleated, twisted top"
                        inks={{ red: 'var(--scallion)', black: 'var(--paper)' }}
                        className={s.xlb}
                      />
                    </div>
                  ) : null}
                  {c.side === 'bao' ? (
                    <div className={`${s.basket} ${s.linerPaper}`}>
                      <Artwork
                        slug="eight-folds-dumplings-bao"
                        alt="A round steamed bun with a pleated swirl on top"
                        inks={{ red: 'var(--soy)', blue: 'var(--bamboo)' }}
                        className={s.bao}
                      />
                    </div>
                  ) : null}
                  {c.pencil ? <p data-edit={`menu.pencilNote.${i}`} data-edit-max="240" data-edit-multiline className={s.pencilNote}>{c.pencil}</p> : null}
                </div>
              </div>
            ))}

            <div className={s.sheetFoot}>
              <p data-edit="menu.body" data-edit-max="240" data-edit-multiline>Baskets arrive as they are ready, not in the order on the sheet. Tea is $2 a head and refilled until you leave. We add nothing for service; the jar by the stairs goes to the folders.</p>
              <p className={s.total}>
                <span data-edit="menu.text8" data-edit-max="60">Total</span>
                <span data-edit="menu.pencilIn4" data-edit-max="60" className={s.pencilIn}>$41.50</span>
              </p>
            </div>
          </div>
        </section>

        <div className={s.rest} aria-hidden="true">
          <span className={s.restBody} />
          <span className={s.stickA} />
          <span className={s.stickB} />
        </div>

        {/* ----------------------------------------------------------- CLASS */}
        <section id="class" className={s.sec} aria-labelledby="ef-class-h">
          <div className={s.classGrid}>
            <div className={s.board}>
              <div data-edit-pattern="class.field" data-edit-roles="transparent,2,0,3,1,0" className={s.tray} aria-hidden="true">
                <TabbiedPattern
                  pattern={roundcut}
                  palette={TRAY}
                  options={{ frequency: 0.75 }}
                  fit="grid"
                  cellSize={40}
                  seed="eight-folds-tray"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.ticket}>
                <p data-edit="class.ticketTop" data-edit-max="240" data-edit-multiline className={s.ticketTop}>Saturday mornings</p>
                <p data-edit="class.ticketTime" data-edit-max="240" data-edit-multiline className={s.ticketTime}>10:00-12:30</p>
                <p data-edit="class.ticketPrice" data-edit-max="240" data-edit-multiline className={s.ticketPrice}>$65</p>
                <p data-edit="class.ticketNote" data-edit-max="240" data-edit-multiline className={s.ticketNote}>Eight at the long table. Aprons, flour and tea are ours.</p>
              </div>
            </div>

            <div className={s.classText}>
              <p data-edit="class.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Dumpling class</p>
              <h2 data-edit="class.title" data-edit-max="60" id="ef-class-h">Fold at the long table with us</h2>
              <p data-edit="class.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Before the doors open on a Saturday the table is yours. Wen or
                Joss teaches; you fold about sixty, eat a basket of your own,
                and take the rest home frozen with the recipe.
              </p>
              <ol className={s.parts}>
                {CLASS_PARTS.map((p, i) => (
                  <li key={p.time}>
                    <span data-edit={`class.partTime.${i}`} data-edit-max="60" className={s.partTime}>{p.time}</span>
                    <h3 data-edit={`class.partTitle.${i}`} data-edit-max="40" className={s.partTitle}>{p.title}</h3>
                    <p data-edit={`class.partNote.${i}`} data-edit-max="240" data-edit-multiline className={s.partNote}>{p.note}</p>
                  </li>
                ))}
              </ol>
              <ul className={s.dates}>
                {CLASS_DATES.map((d, i) => (
                  <li key={d.date} className={d.seats === 'Full' ? s.dateFull : undefined}>
                    <span data-edit={`class.dateDay.${i}`} data-edit-max="60" className={s.dateDay}>{d.date}</span>
                    <span data-edit={`class.dateSeats.${i}`} data-edit-max="60" className={s.dateSeats}>{d.seats}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="class.small" data-edit-max="240" data-edit-multiline className={s.small}>Book at the counter or by email. Ages 12 and up with an adult; tell us about allergies when you book.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- FROZEN */}
        <section id="frozen" className={s.sec} aria-labelledby="ef-frozen-h">
          <div className={s.secHead}>
            <p data-edit="frozen.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>To cook at home</p>
            <h2 data-edit="frozen.title" data-edit-max="60" id="ef-frozen-h">Frozen bags, by the 20 or the 50</h2>
            <p data-edit="frozen.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Folded the same morning, frozen on trays so they never stick, and
              bagged in the freezer by the stairs. They keep three months.
            </p>
          </div>

          <div className={s.freezer}>
            <div data-edit-pattern="frozen.field" data-edit-roles="transparent,0,3,0" className={s.frost} aria-hidden="true">
              <TabbiedPattern
                pattern={diagonalweave}
                palette={FROST}
                fit="grid"
                cellSize={34}
                seed="eight-folds-frost"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ul className={s.bags}>
              {BAGS.map((b, i) => (
                <li key={b.name} className={s.bag}>
                  <div className={s.label}>
                    <p data-edit={`frozen.labelBrand.${i}`} data-edit-max="240" data-edit-multiline className={s.labelBrand}>Eight Folds</p>
                    <h3 data-edit={`frozen.labelName.${i}`} data-edit-max="40" className={s.labelName}>{b.name}</h3>
                    <p data-edit={`frozen.labelNote.${i}`} data-edit-max="240" data-edit-multiline className={s.labelNote}>{b.note}</p>
                    <dl className={s.labelPrices}>
                      <div>
                        <dt data-edit={`frozen.term.${i}`} data-edit-max="28">20</dt>
                        <dd data-edit={`frozen.body.${i}`} data-edit-max="200" data-edit-multiline>{b.twenty}</dd>
                      </div>
                      {b.fifty ? (
                        <div>
                          <dt data-edit={`frozen.term2.${i}`} data-edit-max="28">50</dt>
                          <dd data-edit={`frozen.body2.${i}`} data-edit-max="200" data-edit-multiline>{b.fifty}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                  <p data-edit={`frozen.bagTag.${i}`} data-edit-max="240" data-edit-multiline className={s.bagTag}>{b.tag}</p>
                </li>
              ))}
            </ul>
          </div>

          <dl className={s.cook}>
            {COOK.map(([how, text], i) => (
              <div key={how}>
                <dt data-edit={`frozen.term3.${i}`} data-edit-max="28">{how}</dt>
                <dd data-edit={`frozen.body3.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className={s.rest} aria-hidden="true">
          <span className={s.restBody} />
          <span className={s.stickA} />
          <span className={s.stickB} />
        </div>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="ef-visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Hours and visit</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="ef-visit-h">Up the stairs on Lantern Street</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Walk-ins only for tables under six. The queue moves fast; a
              basket takes eight minutes and nobody lingers over dumplings.
            </p>
          </div>

          <ul className={s.frieze}>
            {HOURS.map((h, i) => (
              <li key={h.days} className={s.tier}>
                <Artwork
                  slug="eight-folds-dumplings-steamer"
                  alt=""
                  inks={['var(--text)']}
                  className={s.steamerArt}
                />
                <p data-edit={`visit.tierDays.${i}`} data-edit-max="240" data-edit-multiline className={s.tierDays}>{h.days}</p>
                <p data-edit={`visit.tierTime.${i}`} data-edit-max="240" data-edit-multiline className={s.tierTime}>{h.time}</p>
              </li>
            ))}
          </ul>
          <p data-edit="visit.closed" data-edit-max="240" data-edit-multiline className={s.closed}>Closed Mondays, when we make the dough for the week.</p>

          <div className={s.visitGrid}>
            <div className={s.address}>
              <p data-edit="visit.addrLine" data-edit-max="240" data-edit-multiline className={s.addrLine}>31 Lantern Street</p>
              <p data-edit="visit.addrTown" data-edit-max="240" data-edit-multiline className={s.addrTown}>Riverside</p>
              <p data-edit="visit.addrNote" data-edit-max="240" data-edit-multiline className={s.addrNote}>
                Between the herbalist and the lantern shop; the door is the red
                one with the steamers in the window. Upstairs, twenty-eight
                seats and the long table. Bus 4 or 11 to Lantern Bridge.
              </p>
            </div>
            <div className={s.contact}>
              <p className={s.contactLine}>
                <span data-edit="visit.text" data-edit-max="60">Order ahead for pickup</span>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550138808">(555) 013-8808</a>
              </p>
              <p className={s.contactLine}>
                <span data-edit="visit.text2" data-edit-max="60">Class bookings and large tables</span>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:fold@eightfolds.example">fold@eightfolds.example</a>
              </p>
              <p data-edit="visit.pencilNote" data-edit-max="240" data-edit-multiline className={s.pencilNote}>parties of 6+ ring a day ahead please</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,0,3,0,1" className={s.hem} aria-hidden="true">
          <TabbiedPattern
            pattern={scotia}
            palette={HEM}
            fit="grid"
            cellSize={36}
            seed="eight-folds-hem"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Eight Folds</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional dumpling house. The folders, dishes, prices and hours are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The dumplings and the steamer are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
