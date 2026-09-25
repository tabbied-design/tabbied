import { TabbiedPattern } from 'tabbied/react';
import { apse, frond } from 'tabbied/patterns';
import s from './rootbound-nursery.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Rootbound: Plant nursery and greenhouse, Orchard Row',
  description:
    'Rootbound grows houseplants in a 1928 glasshouse on Orchard Row. The plant catalog with light, water and care for each, weekend workshops, delivery by van and a Saturday care clinic.',
};

/* Site colors, the same six as the stylesheet's root rule. The arches take
   `transparent` first and sit on the page, in everything but green so the
   monstera in front of them stays readable. The fronds are laid on the pale
   pane of the greenhouse panel, which also draws the vein in each leaf. */
const LEAF = '#3E7D4F';
const CLAY = '#D98E4A';
const GRAY = '#919C92';
const PALE = '#DFE7DC';
const INK = '#1A261D';

const ARCHES = ['transparent', PALE, CLAY, GRAY, PALE];
const FRONDS = [PALE, LEAF, GRAY, CLAY, INK];

const NAV = [
  ['Catalog', '#catalog'],
  ['Workshops', '#workshops'],
  ['Delivery', '#delivery'],
  ['Greenhouse', '#greenhouse'],
  ['Visit', '#visit'],
];

type Light = 'Bright' | 'Bright, indirect' | 'Medium' | 'Low to medium';
type Water = 'Keep moist' | 'Weekly' | 'Every 2 weeks' | 'Monthly';
type Care = 'Easy' | 'Moderate' | 'Fussy';

type Plant = {
  name: string;
  latin: string;
  light: Light;
  water: Water;
  care: Care;
  sizes: string;
  pets: boolean;
};

const PLANTS: Plant[] = [
  { name: 'Swiss cheese plant', latin: 'Monstera deliciosa', light: 'Bright, indirect', water: 'Weekly', care: 'Easy', sizes: '6 in $32 / 10 in $78 / 14 in $145', pets: false },
  { name: 'Snake plant', latin: 'Dracaena trifasciata', light: 'Low to medium', water: 'Monthly', care: 'Easy', sizes: '4 in $14 / 8 in $42', pets: false },
  { name: 'ZZ plant', latin: 'Zamioculcas zamiifolia', light: 'Low to medium', water: 'Every 2 weeks', care: 'Easy', sizes: '6 in $28 / 10 in $64', pets: false },
  { name: 'Golden pothos', latin: 'Epipremnum aureum', light: 'Medium', water: 'Weekly', care: 'Easy', sizes: '4 in $12 / 6 in hanging $26', pets: false },
  { name: 'Parlor palm', latin: 'Chamaedorea elegans', light: 'Medium', water: 'Weekly', care: 'Easy', sizes: '6 in $24 / 10 in $58', pets: true },
  { name: 'Golden barrel cactus', latin: 'Echinocactus grusonii', light: 'Bright', water: 'Monthly', care: 'Easy', sizes: '4 in $18 / 8 in $48', pets: true },
  { name: 'Wax plant', latin: 'Hoya carnosa', light: 'Bright, indirect', water: 'Every 2 weeks', care: 'Easy', sizes: '4 in $16 / 6 in hanging $34', pets: true },
  { name: 'Rubber plant', latin: 'Ficus elastica', light: 'Bright, indirect', water: 'Every 2 weeks', care: 'Moderate', sizes: '6 in $30 / 10 in $72', pets: false },
  { name: 'Fiddle-leaf fig', latin: 'Ficus lyrata', light: 'Bright', water: 'Weekly', care: 'Fussy', sizes: '10 in $85 / 14 in $190', pets: false },
  { name: 'Round-leaf calathea', latin: 'Goeppertia orbifolia', light: 'Medium', water: 'Keep moist', care: 'Fussy', sizes: '6 in $36', pets: true },
  { name: 'Boston fern', latin: 'Nephrolepis exaltata', light: 'Bright, indirect', water: 'Keep moist', care: 'Moderate', sizes: '6 in hanging $28', pets: true },
  { name: 'String of pearls', latin: 'Curio rowleyanus', light: 'Bright', water: 'Every 2 weeks', care: 'Moderate', sizes: '4 in hanging $22', pets: false },
  { name: 'Peace lily', latin: 'Spathiphyllum wallisii', light: 'Low to medium', water: 'Weekly', care: 'Easy', sizes: '6 in $26 / 10 in $55', pets: false },
  { name: 'Giant bird of paradise', latin: 'Strelitzia nicolai', light: 'Bright', water: 'Weekly', care: 'Moderate', sizes: '10 in $68 / 14 in $160', pets: false },
];

/* Chip classes for each value, so the colors live in the stylesheet. */
const LIGHT_CLASS: Record<Light, string> = {
  Bright: s.sunFull,
  'Bright, indirect': s.sunHigh,
  Medium: s.sunMid,
  'Low to medium': s.sunLow,
};

const CARE_CLASS: Record<Care, string> = {
  Easy: s.careEasy,
  Moderate: s.careMid,
  Fussy: s.careFussy,
};

const SHELF = [
  {
    slug: 'rootbound-nursery-monstera',
    alt: 'A monstera plant in a pot',
    name: 'Swiss cheese plant',
    note: 'The one everyone asks for. Grows a new leaf a month in summer.',
    cls: s.shelfTall,
  },
  {
    slug: 'rootbound-nursery-cactus',
    alt: 'A tall cactus in a pot',
    name: 'Cactus, any cactus',
    note: 'Sun, a gritty mix and a drink when you remember.',
    cls: s.shelfNarrow,
  },
];

const WORKSHOPS = [
  {
    day: '12',
    month: 'Oct',
    title: 'Repotting without tears',
    body: 'Roots, mixes and pot sizes, then repot one of your own plants on the bench. Bring it; we supply the soil.',
    time: 'Saturday, 10 am - noon',
    price: '$35',
    left: '4 places left',
  },
  {
    day: '19',
    month: 'Oct',
    title: 'Build a terrarium',
    body: 'A glass jar, four small plants, moss and a layer of charcoal. You take it home in the jar you made it in.',
    time: 'Saturday, 2 - 4 pm',
    price: '$65',
    left: '2 places left',
  },
  {
    day: '26',
    month: 'Oct',
    title: 'Propagation party',
    body: 'Cuttings from our mother plants, rooting in water and in soil, and a tray of six to take away.',
    time: 'Saturday, 10 am - noon',
    price: '$40',
    left: '9 places left',
  },
  {
    day: '09',
    month: 'Nov',
    title: 'Kokedama, the moss ball',
    body: 'A Japanese way of growing a plant in a ball of soil wrapped in moss and string. Hangs anywhere.',
    time: 'Sunday, 1 - 3 pm',
    price: '$45',
    left: 'Full, waiting list open',
  },
];

const DELIVERY = [
  ['Within 3 miles', '$8, free over $75'],
  ['3 to 10 miles', '$15'],
  ['10 to 20 miles', '$25'],
  ['Plants over 5 feet', '$40, two people carry it in'],
  ['Repot on arrival', '$10 per plant'],
];

const GREENHOUSE = [
  ['1928', 'Built as a cut-flower house for the orchard'],
  ['4,000', 'Square feet under glass, heated to 62 F all winter'],
  ['600+', 'Plants on the benches on any given week'],
];

const HOURS = [
  ['April - October', 'Tue - Sun, 9 am - 6 pm'],
  ['November - March', 'Wed - Sun, 10 am - 5 pm'],
  ['Care clinic', 'Saturdays, 9 - 11 am'],
];

export default function RootboundNurseryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f3f5ef',
        '--ink': '#1a261d',
        '--leaf': '#3e7d4f',
        '--clay': '#d98e4a',
        '--gray': '#919c92',
        '--pale': '#dfe7dc',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,leaf,clay,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Epilogue:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Rootbound</span>
          <span data-edit="bar.brandMeta" data-edit-max="60" className={s.brandMeta}>Plant nursery, Orchard Row</span>
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
            The monstera stands in a greenhouse arch filled with arches. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Plant nursery and greenhouse, since 2011</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Raised under glass, <em>ready for your windowsill.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Houseplants grown on in a 1928 glasshouse, sold with a care card
              written for your room, not the tropics. If it outgrows its pot,
              bring it back and we repot it for free.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#catalog">Browse the catalog</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#visit">Plan a visit</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Plants on the benches</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>600+</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Free repot with any pot</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>$0</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Care clinic, Saturdays</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>9-11</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,3,4,5" className={s.arch} aria-hidden="true">
              <TabbiedPattern
                pattern={apse}
                palette={ARCHES}
                options={{ frequency: 0.9 }}
                fit="grid"
                cellSize={40}
                seed="rootbound-arch"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="rootbound-nursery-monstera"
              alt="A monstera plant in a pot"
              inks={{ red: 'var(--leaf)', blue: 'var(--clay)' }}
              className={s.heroPlant}
            />
          </div>
        </section>

        {/* --------------------------------------------------------- CATALOG
            The plant table with its chips, and a shelf of drawn plants
            beside it that stays in view while the table scrolls. */}
        <section id="catalog" className={s.catalog} aria-labelledby="catalog-h">
          <div className={s.catHead}>
            <div className={s.secHead}>
              <p data-edit="catalog.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The catalog</p>
              <h2 data-edit="catalog.secTitle" data-edit-max="60" id="catalog-h" className={s.secTitle}>What is on the benches this week</h2>
              <p data-edit="catalog.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Every plant has been with us at least six weeks, so it has
                settled to indoor light before it comes home with you. Prices
                include a nursery pot; decorative pots are in the shop.
              </p>
            </div>
            <ul className={s.legend} aria-label="How to read the chips">
              <li>
                <span data-edit="catalog.chip" data-edit-max="60" className={`${s.chip} ${s.sunFull}`}>Bright</span>
                <span data-edit="catalog.legendText" data-edit-max="60" className={s.legendText}>A south window or a sunroom</span>
              </li>
              <li>
                <span data-edit="catalog.chip2" data-edit-max="60" className={`${s.chip} ${s.sunLow}`}>Low to medium</span>
                <span data-edit="catalog.legendText2" data-edit-max="60" className={s.legendText}>A north window, or across the room</span>
              </li>
              <li>
                <span data-edit="catalog.chip3" data-edit-max="60" className={`${s.chip} ${s.careEasy}`}>Easy</span>
                <span data-edit="catalog.legendText3" data-edit-max="60" className={s.legendText}>Forgives a missed week</span>
              </li>
              <li>
                <span data-edit="catalog.chip4" data-edit-max="60" className={`${s.chip} ${s.careFussy}`}>Fussy</span>
                <span data-edit="catalog.legendText4" data-edit-max="60" className={s.legendText}>Wants a routine, and humidity</span>
              </li>
            </ul>
          </div>

          <div className={s.catGrid}>
            <table className={s.plants}>
              <caption data-edit="catalog.srOnly" className={s.srOnly}>Houseplants in stock with light, water and care needs</caption>
              <thead>
                <tr>
                  <th data-edit="catalog.heading" scope="col">Plant</th>
                  <th data-edit="catalog.heading2" scope="col">Light</th>
                  <th data-edit="catalog.heading3" scope="col">Water</th>
                  <th data-edit="catalog.heading4" scope="col">Care</th>
                  <th data-edit="catalog.heading5" scope="col">Sizes and prices</th>
                </tr>
              </thead>
              <tbody>
                {PLANTS.map((p, i) => (
                  <tr key={p.latin}>
                    <th scope="row">
                      <span data-edit={`catalog.plantName.${i}`} data-edit-max="60" className={s.plantName}>{p.name}</span>
                      <span data-edit={`catalog.plantLatin.${i}`} data-edit-max="60" className={s.plantLatin}>{p.latin}</span>
                      {p.pets ? <span data-edit={`catalog.petSafe.${i}`} data-edit-max="60" className={s.petSafe}>Pet safe</span> : null}
                    </th>
                    <td>
                      <span data-edit={`catalog.chip5.${i}`} data-edit-max="60" className={`${s.chip} ${LIGHT_CLASS[p.light]}`}>{p.light}</span>
                    </td>
                    <td>
                      <span data-edit={`catalog.chip6.${i}`} data-edit-max="60" className={`${s.chip} ${s.water}`}>{p.water}</span>
                    </td>
                    <td>
                      <span data-edit={`catalog.chip7.${i}`} data-edit-max="60" className={`${s.chip} ${CARE_CLASS[p.care]}`}>{p.care}</span>
                    </td>
                    <td data-edit={`catalog.sizes.${i}`} className={s.sizes}>{p.sizes}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <aside className={s.shelf} aria-label="From the benches">
              {SHELF.map((it, i) => (
                <div key={it.slug} className={s.shelfItem}>
                  <div className={s.shelfPlate}>
                    <Artwork
                      slug={it.slug}
                      alt={it.alt}
                      inks={{ red: 'var(--leaf)', blue: 'var(--clay)' }}
                      className={it.cls}
                    />
                  </div>
                  <p data-edit={`shelf.shelfName.${i}`} data-edit-max="240" data-edit-multiline className={s.shelfName}>{it.name}</p>
                  <p data-edit={`shelf.shelfNote.${i}`} data-edit-max="240" data-edit-multiline className={s.shelfNote}>{it.note}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------- WORKSHOPS */}
        <section id="workshops" className={s.workshops} aria-labelledby="workshops-h">
          <div className={s.secHead}>
            <p data-edit="workshops.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Workshops</p>
            <h2 data-edit="workshops.secTitle" data-edit-max="60" id="workshops-h" className={s.secTitle}>Weekends at the potting bench</h2>
            <p data-edit="workshops.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Twelve people, two hours, all materials and a cup of tea. Book
              at the till or by phone; we refund up to two days before.
            </p>
          </div>
          <ol className={s.wsList}>
            {WORKSHOPS.map((w, i) => (
              <li key={w.title} className={s.ws}>
                <p className={s.wsDate}>
                  <span data-edit={`workshops.wsDay.${i}`} data-edit-max="60" className={s.wsDay}>{w.day}</span>
                  <span data-edit={`workshops.wsMonth.${i}`} data-edit-max="60" className={s.wsMonth}>{w.month}</span>
                </p>
                <div className={s.wsBody}>
                  <h3 data-edit={`workshops.wsTitle.${i}`} data-edit-max="40" className={s.wsTitle}>{w.title}</h3>
                  <p data-edit={`workshops.wsText.${i}`} data-edit-max="240" data-edit-multiline className={s.wsText}>{w.body}</p>
                  <p data-edit={`workshops.wsTime.${i}`} data-edit-max="240" data-edit-multiline className={s.wsTime}>{w.time}</p>
                </div>
                <div className={s.wsMeta}>
                  <p data-edit={`workshops.wsPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.wsPrice}>{w.price}</p>
                  <p data-edit={`workshops.wsLeft.${i}`} data-edit-max="240" data-edit-multiline className={s.wsLeft}>{w.left}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- DELIVERY */}
        <section id="delivery" className={s.delivery} aria-labelledby="delivery-h">
          <div className={s.deliveryInner}>
            <div className={s.canBox}>
              <Artwork
                slug="rootbound-nursery-can"
                alt="A watering can"
                inks={{ red: 'var(--clay)', blue: 'var(--leaf)' }}
                className={s.can}
              />
            </div>
            <div className={s.deliveryText}>
              <p data-edit="delivery.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Delivery</p>
              <h2 data-edit="delivery.secTitle" data-edit-max="60" id="delivery-h" className={s.secTitle}>By van, upright, watered the morning it leaves</h2>
              <p data-edit="delivery.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Tuesdays and Fridays, in a van with shelves and a heater. We
                text a two-hour window the day before.
              </p>
              <dl className={s.rates}>
                {DELIVERY.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`delivery.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`delivery.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ GREENHOUSE
            The story of the glasshouse beside a pane of fronds. */}
        <section id="greenhouse" className={s.greenhouse} aria-labelledby="greenhouse-h">
          <div data-edit-pattern="greenhouse.field" data-edit-roles="5,2,4,3,1" className={s.pane} aria-hidden="true">
            <TabbiedPattern
              pattern={frond}
              palette={FRONDS}
              options={{ frequency: 0.7 }}
              fit="grid"
              cellSize={64}
              seed="rootbound-fronds"
              redrawInterval={8800}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.ghText}>
            <p data-edit="greenhouse.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The greenhouse</p>
            <h2 data-edit="greenhouse.secTitle" data-edit-max="60" id="greenhouse-h" className={s.secTitle}>A cut-flower house, given a second life</h2>
            <p data-edit="greenhouse.ghBody" data-edit-max="240" data-edit-multiline className={s.ghBody}>
              The glasshouse was built in 1928 to grow carnations for the
              orchard's farm stand. It stood empty for thirty years
              before we reglazed it, pane by pane, in 2011.
            </p>
            <p data-edit="greenhouse.ghBody2" data-edit-max="240" data-edit-multiline className={s.ghBody}>
              Bring a sick plant to the care clinic on a Saturday morning and
              one of the growers will look at it with you, free. Bring one you
              have outgrown and we will rehome it for store credit.
            </p>
            <dl className={s.ghFacts}>
              {GREENHOUSE.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`greenhouse.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`greenhouse.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitIntro}>
            <p data-edit="visit.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Visit</p>
            <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>At the end of Orchard Row</h2>
            <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.visitAddr}>
              88 Orchard Row, behind the farm stand
              <br />
              Parking in the gravel yard, and room for a trolley to the car
            </p>
          </div>
          <dl className={s.hours}>
            {HOURS.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`visit.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
          <div className={s.contact}>
            <p>
              <a data-edit="visit.link" data-edit-max="28" href="tel:+15550166240">(555) 016-6240</a>
            </p>
            <p>
              <a data-edit="visit.link2" data-edit-max="28" href="mailto:grow@rootbound.example">grow@rootbound.example</a>
            </p>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Rootbound</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional plant nursery. Plants, prices and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the greenhouse's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
