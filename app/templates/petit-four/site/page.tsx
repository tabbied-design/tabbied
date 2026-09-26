import { TabbiedPattern } from 'tabbied/react';
import { foldback, picket } from 'tabbied/patterns';
import s from './petit-four.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Petit Four: French patisserie and salon, Linden Arcade',
  description:
    'Petit Four makes French pastry in the room behind its cabinet on Linden Arcade. What is on each shelf today, macarons by the box, gateaux to order with 48 hours of notice, and the six marble tables of the salon.',
};

/* Site colors. The awning's pales and the cartouche's folded arcs are drawn
   from the same four inks the page is set in; the cabinet's back wall keeps
   its ground transparent so the tinted panel behind it shows through. */
const CREAM = '#fbf6ee';
const COCOA = '#3a2327';
const PISTACHIO = '#bcd4a0';
const ROSE = '#f0bcc6';
const GILT = '#a57a42';

const AWNING = [CREAM, ROSE];
const CARTOUCHE = [CREAM, PISTACHIO, ROSE];
const BACKWALL = ['transparent', PISTACHIO, CREAM];
const RIBBON = [ROSE, CREAM, PISTACHIO];

const NAV_LEFT = [
  ['The cabinet', '#cabinet'],
  ['Macarons', '#macarons'],
  ['Gateaux', '#gateaux'],
];

const NAV_RIGHT = [
  ['The salon', '#salon'],
  ['The kitchen', '#kitchen'],
  ['Visit', '#visit'],
];

const NAV = [...NAV_LEFT, ...NAV_RIGHT];

type Tray = { name: string; note: string; price: string };
type Shelf = { name: string; when: string; trays: Tray[] };

const SHELVES: Shelf[] = [
  {
    name: 'Top shelf: choux',
    when: 'Filled at 9, again at 1',
    trays: [
      { name: 'Eclair au cafe', note: 'Coffee creme patissiere, coffee fondant', price: '$6.50' },
      { name: 'Eclair au chocolat', note: 'Dark ganache, a little salt on top', price: '$6.50' },
      { name: 'Religieuse', note: 'Two choux, violet glaze, a buttercream collar', price: '$7.50' },
      { name: 'Paris-Brest', note: 'A hazelnut praline wheel, cut in two', price: '$8' },
    ],
  },
  {
    name: 'Middle shelf: tarts',
    when: 'Out of the oven at 8',
    trays: [
      { name: 'Tarte au citron', note: 'Sharp lemon curd, burnt meringue peaks', price: '$7' },
      { name: 'Tarte aux fraises', note: 'Strawberries on vanilla cream, June to September', price: '$7.50' },
      { name: 'Tartelette pistache', note: 'Pistachio frangipane and raspberries', price: '$7' },
      { name: 'Tarte Tatin', note: 'By the slice, with creme fraiche', price: '$7' },
    ],
  },
  {
    name: 'Bottom shelf: layers',
    when: 'Built yesterday, set overnight',
    trays: [
      { name: 'Mille-feuille', note: 'Three leaves of puff pastry, feathered icing', price: '$8' },
      { name: 'Opera', note: 'Almond sponge, coffee syrup, ganache, eight layers', price: '$8' },
      { name: 'Fraisier', note: 'The pink one: strawberries, mousseline, marzipan lid', price: '$8.50' },
      { name: 'Petits fours glaces', note: 'Little iced cakes in paper cases, the shop\'s name', price: '$2.50 each' },
    ],
  },
];

type Macaron = { name: string; tone: 'rose' | 'pistachio' | 'gilt' | 'cocoa' | 'cream' };

const MACARONS: Macaron[] = [
  { name: 'Rose and lychee', tone: 'rose' },
  { name: 'Pistachio', tone: 'pistachio' },
  { name: 'Salted caramel', tone: 'gilt' },
  { name: 'Dark chocolate', tone: 'cocoa' },
  { name: 'Vanilla bean', tone: 'cream' },
  { name: 'Raspberry', tone: 'rose' },
  { name: 'Coffee', tone: 'gilt' },
  { name: 'Fig and honey', tone: 'pistachio' },
];

const BOXES = [
  ['Six', 'in the small ribboned box', '$16'],
  ['Twelve', 'two rows, your choice of flavors', '$30'],
  ['Twenty-four', 'the tall box, for a table', '$56'],
];

const SIZES = [
  ['6 inch', 'serves 6 to 8', '$42'],
  ['8 inch', 'serves 10 to 12', '$58'],
  ['10 inch', 'serves 16 to 20', '$78'],
  ['Croquembouche', '40 choux, serves 20', '$120'],
];

const GATEAUX = [
  ['Fraisier', 'strawberries, mousseline, pistachio marzipan'],
  ['Opera', 'coffee and chocolate in eight thin layers'],
  ['Saint-Honore', 'caramel choux on puff pastry, piped chantilly'],
  ['Charlotte aux poires', 'pear mousse in a fence of ladyfingers'],
  ['Pistache-framboise', 'green outside, raspberry red when you cut it'],
  ['Tarte au citron, large', 'for when a whole cake is too much'],
];

const NOTICE = [
  ['Gateaux', '48 hours'],
  ['Croquembouche', '5 days'],
  ['Two tiers or more', '3 weeks, with a tasting'],
];

const SALON = [
  ['Cafe creme', '$4.50'],
  ['Chocolat chaud, thick enough to stand a spoon in', '$6'],
  ['A pot of tea, loose leaf', '$4.50'],
  ['Croissant and cafe, before 10', '$7'],
  ['Le gouter: a pot of tea and three petits fours', '$14'],
];

const PEOPLE = [
  {
    initials: 'OM',
    name: 'Odile Marchand',
    role: 'Owner, chef patissiere',
    note: 'Eleven years in Lyon and Paris before this counter. Makes every gateau herself.',
  },
  {
    initials: 'BR',
    name: 'Bastien Roy',
    role: 'Viennoiserie',
    note: 'In at three for the croissants and kouign-amann. Home again before lunch.',
  },
  {
    initials: 'HU',
    name: 'Hana Ueda',
    role: 'Macarons and petits fours',
    note: 'Colors every shell by hand and weighs every one. Rejects about one in ten.',
  },
  {
    initials: 'PN',
    name: 'Priya Nair',
    role: 'The salon and the phone',
    note: 'Takes your cake order, writes it in the book, and calls you the day before.',
  },
];

const QUESTIONS = [
  [
    'Can you keep something back for me?',
    'Call before 10 and we will box it with your name on it until 4. After that it goes back in the cabinet.',
  ],
  [
    'Is anything gluten-free?',
    'The macarons are made with almond flour and no wheat. They share a kitchen with a great deal of flour, so we cannot promise more than that.',
  ],
  [
    'What about nuts?',
    'Almonds are in most of what we make, with hazelnuts and pistachios in plenty more. If nuts are a danger to you, we are the wrong shop, and we are sorry.',
  ],
  [
    'Do you deliver?',
    'Gateaux only, within three miles of the arcade, Tuesday to Saturday, for $12. Pastries travel badly and we would rather you came.',
  ],
  [
    'What happens to what is left at the end of the day?',
    'At 5 we box whatever is in the cabinet into mixed boxes of six for $15. First come; there are rarely more than four.',
  ],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Saturday', '8 am to 6 pm'],
  ['Sunday', '9 am to 3 pm'],
  ['Salon service', 'until an hour before close'],
];

export default function PetitFourPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Bodoni+Moda+SC:opsz,wght@6..96,400..600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Petit Four</a>
        <nav className={s.nav} aria-label="Sections">
          <div className={s.navLeft}>
            {NAV_LEFT.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>
          <div className={s.navRight}>
            {NAV_RIGHT.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      {/* The awning over the window: rose and cream pales, cut to scallops. */}
      <div className={s.awning} aria-hidden="true">
        <TabbiedPattern
          pattern={picket}
          palette={AWNING}
          fit="grid"
          cellSize={80}
          seed="petit-four-awning"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <main id="top">
        {/* ------------------------------------------------------------ FRONT */}
        <section className={s.front} aria-labelledby="front-h">
          <p className={s.eyebrow}>Patisserie and salon de the, 14 Linden Arcade</p>
          <h1 id="front-h" className={s.title}>
            Petit <em>Four</em>
          </h1>
          <div className={s.orn} aria-hidden="true" />

          <div className={s.window}>
            <div className={s.wing}>
              <Artwork
                slug="petit-four-eclair"
                alt="A chocolate eclair, drawn as an engraving"
                inks={['var(--text)']}
                className={s.wingArt}
              />
              <p className={s.wingLabel}>The cabinet opens</p>
              <p className={s.wingBig}>at eight</p>
              <p className={s.wingNote}>Tuesday to Saturday, and nine on Sundays. Full by ten.</p>
            </div>
            <div className={s.cartouche}>
              <div className={s.cartoucheField} aria-hidden="true">
                <TabbiedPattern
                  pattern={foldback}
                  palette={CARTOUCHE}
                  fit="grid"
                  cellSize={30}
                  seed="petit-four-cartouche"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div className={s.wing}>
              <Artwork
                slug="petit-four-millefeuille"
                alt="A slice of mille-feuille, drawn as an engraving"
                inks={['var(--text)']}
                className={s.wingArt}
              />
              <p className={s.wingLabel}>A whole gateau needs</p>
              <p className={s.wingBig}>two days</p>
              <p className={s.wingNote}>of notice. A croquembouche needs five, and a good reason.</p>
            </div>
          </div>

          <p className={s.lede}>
            French pastry, made in the room behind the cabinet since 2011. We
            fill each tray once. When it is empty it stays empty until
            tomorrow, so come in the morning or call ahead.
          </p>
        </section>

        {/* ---------------------------------------------------------- CABINET */}
        <section id="cabinet" className={s.sec} aria-labelledby="cabinet-h">
          <div className={s.head}>
            <p className={s.label}>La vitrine</p>
            <h2 id="cabinet-h">What is in the cabinet today</h2>
            <div className={s.orn} aria-hidden="true" />
            <p className={s.note}>
              Three shelves, twelve trays, in the order they come out of the
              kitchen. Point, and we will box it; everything here keeps until
              tomorrow in the fridge, except the eclairs.
            </p>
          </div>

          <div className={s.cabinet}>
            <div className={s.cabinetBack} aria-hidden="true">
              <TabbiedPattern
                pattern={foldback}
                palette={BACKWALL}
                fit="grid"
                cellSize={56}
                seed="petit-four-backwall"
                options={{ frequency: 0.5 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            {SHELVES.map((shelf) => (
              <div className={s.shelf} key={shelf.name}>
                <div className={s.shelfHead}>
                  <h3 className={s.shelfName}>{shelf.name}</h3>
                  <p className={s.shelfWhen}>{shelf.when}</p>
                </div>
                <ul className={s.trays}>
                  {shelf.trays.map((t) => (
                    <li key={t.name} className={s.tray}>
                      <p className={s.trayName}>{t.name}</p>
                      <p className={s.trayNote}>{t.note}</p>
                      <p className={s.trayPrice}>{t.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={s.under}>Canneles, madeleines and financiers are sold by the bag at the till.</p>
        </section>

        {/* --------------------------------------------------------- MACARONS */}
        <section id="macarons" className={`${s.sec} ${s.macSec}`} aria-labelledby="macarons-h">
          <div className={s.head}>
            <Artwork
              slug="petit-four-macarons"
              alt="A stack of three macarons, drawn as an engraving"
              inks={['var(--on-rose)']}
              className={s.macStack}
            />
            <p className={s.label}>By the box</p>
            <h2 id="macarons-h">Macarons</h2>
            <div className={s.orn} aria-hidden="true" />
            <p className={s.note}>
              Eight flavors, made on Tuesdays and Fridays and rested two days
              before they reach the counter. That is when they are best.
            </p>
          </div>
          <ul className={s.macarons}>
            {MACARONS.map((m) => (
              <li key={m.name} className={s.macaron}>
                <span className={`${s.shell} ${s[m.tone]}`} aria-hidden="true" />
                <span className={s.macName}>{m.name}</span>
              </li>
            ))}
          </ul>
          <dl className={s.boxes}>
            {BOXES.map(([n, what, price]) => (
              <div key={n} className={s.box}>
                <dt>{n}</dt>
                <dd className={s.boxWhat}>{what}</dd>
                <dd className={s.boxPrice}>{price}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------- GATEAUX
            The ribbon round a cake box, with the tag tied on. */}
        <div className={s.ribbonWrap}>
          <div className={s.ribbon} aria-hidden="true">
            <TabbiedPattern
              pattern={foldback}
              palette={RIBBON}
              fit="grid"
              cellSize={32}
              seed="petit-four-ribbon"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p className={s.tag}>Gateaux to order</p>
        </div>

        <section id="gateaux" className={s.sec} aria-labelledby="gateaux-h">
          <div className={s.gateauHead}>
            <Artwork
              slug="petit-four-parisbrest"
              alt="A Paris-Brest ring with sliced almonds, drawn as an engraving"
              inks={['var(--text)']}
              className={s.headArt}
            />
            <div className={s.head}>
              <p className={s.label}>For a table, a birthday, a Sunday</p>
              <h2 id="gateaux-h">Order a gateau</h2>
              <div className={s.orn} aria-hidden="true" />
            </div>
            <Artwork
              slug="petit-four-tarte"
              alt="A lemon tart with a fluted edge, drawn as an engraving"
              inks={['var(--text)']}
              className={s.headArt}
            />
          </div>

          <div className={s.pair}>
            <div className={s.pairCol}>
              <h3 className={s.colTitle}>Sizes</h3>
              <dl className={s.sizes}>
                {SIZES.map(([size, serves, price]) => (
                  <div key={size}>
                    <dt>{size}</dt>
                    <dd className={s.serves}>{serves}</dd>
                    <dd className={s.sizePrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.pairRule} aria-hidden="true" />
            <div className={s.pairCol}>
              <h3 className={s.colTitle}>Flavors</h3>
              <dl className={s.flavors}>
                {GATEAUX.map(([name, what]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ul className={s.notice}>
            {NOTICE.map(([what, time]) => (
              <li key={what}>
                <span className={s.noticeWhat}>{what}</span>
                <span className={s.noticeTime}>{time}</span>
              </li>
            ))}
          </ul>

          <form className={s.form} action="#">
            <h3 className={s.formTitle}>Ask for a cake</h3>
            <p className={s.formNote}>Priya answers every request by phone the same day. Nothing is baked until you have spoken.</p>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="pf-name">Your name</label>
                <input id="pf-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="pf-phone">Telephone</label>
                <input id="pf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="pf-cake">Gateau</label>
                <select id="pf-cake" name="cake" defaultValue="fraisier">
                  <option value="fraisier">Fraisier</option>
                  <option value="opera">Opera</option>
                  <option value="saint-honore">Saint-Honore</option>
                  <option value="charlotte">Charlotte aux poires</option>
                  <option value="pistache">Pistache-framboise</option>
                  <option value="citron">Tarte au citron, large</option>
                  <option value="croquembouche">Croquembouche</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="pf-size">Size</label>
                <select id="pf-size" name="size" defaultValue="8">
                  <option value="6">6 inch, serves 6 to 8</option>
                  <option value="8">8 inch, serves 10 to 12</option>
                  <option value="10">10 inch, serves 16 to 20</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="pf-date">Collection day</label>
                <input id="pf-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="pf-plaque">Written on the plaque</label>
                <input id="pf-plaque" name="plaque" type="text" maxLength={30} placeholder="Up to 30 letters" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="pf-notes">Anything else</label>
                <textarea id="pf-notes" name="notes" rows={3} />
              </div>
            </div>
            <button className={s.submit} type="submit">Send the request</button>
          </form>
        </section>

        {/* ------------------------------------------------------------ SALON */}
        <section id="salon" className={`${s.sec} ${s.salonSec}`} aria-labelledby="salon-h">
          <div className={s.salon}>
            <div className={s.head}>
              <p className={s.label}>Salon de the</p>
              <h2 id="salon-h">Six marble tables</h2>
              <div className={s.orn} aria-hidden="true" />
              <p className={s.note}>
                Behind the cabinet, under the skylight. Sit down and we come to
                you; pastries from the cabinet are the same price at the table.
                No laptops on Saturdays and Sundays, please.
              </p>
            </div>
            <div className={s.carte}>
              <Artwork
                slug="petit-four-croissant"
                alt="A croissant, drawn as an engraving"
                inks={['var(--text)']}
                className={s.carteArt}
              />
              <h3 className={s.carteTitle}>La carte</h3>
              <ul className={s.carteList}>
                {SALON.map(([item, price]) => (
                  <li key={item}>
                    <span className={s.carteItem}>{item}</span>
                    <span className={s.cartePrice}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className={s.under}>Le gouter is served from 3 to 5 on weekdays. Groups of six or more may book a table.</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- KITCHEN */}
        <section id="kitchen" className={s.sec} aria-labelledby="kitchen-h">
          <div className={s.head}>
            <p className={s.label}>Behind the cabinet</p>
            <h2 id="kitchen-h">The kitchen</h2>
            <div className={s.orn} aria-hidden="true" />
          </div>
          <ul className={s.people}>
            {PEOPLE.map((p) => (
              <li key={p.name} className={s.person}>
                <span className={s.monogram} aria-hidden="true">{p.initials}</span>
                <h3 className={s.personName}>{p.name}</h3>
                <p className={s.personRole}>{p.role}</p>
                <p className={s.personNote}>{p.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.head}>
            <p className={s.label}>Asked at the counter</p>
            <h2 id="questions-h">Good to know</h2>
            <div className={s.orn} aria-hidden="true" />
          </div>
          <div className={s.faq}>
            {QUESTIONS.map(([q, a]) => (
              <details key={q} className={s.qa}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.head}>
            <p className={s.label}>Under the arcade clock</p>
            <h2 id="visit-h">Visit</h2>
            <div className={s.orn} aria-hidden="true" />
          </div>
          <div className={s.pair}>
            <div className={s.pairCol}>
              <h3 className={s.colTitle}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.pairRule} aria-hidden="true" />
            <div className={s.pairCol}>
              <h3 className={s.colTitle}>The shop</h3>
              <p className={s.address}>
                14 Linden Arcade
                <br />
                Wexley Square
              </p>
              <p className={s.small}>Between the florist and the bookbinder, under the clock. Step-free from the square side.</p>
              <p className={s.contact}>
                <a href="tel:+15550134410">(555) 013-4410</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:bonjour@petitfour.example">bonjour@petitfour.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footAwning} aria-hidden="true">
          <TabbiedPattern
            pattern={picket}
            palette={AWNING}
            fit="grid"
            cellSize={64}
            seed="petit-four-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>Petit Four</p>
          <p>A fictional French patisserie. Pastries, prices and people are invented.</p>
          <p>The pastry engravings are generated images, drawn in the page's own colors.</p>
          <p>
            Patterns by{' '}
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
