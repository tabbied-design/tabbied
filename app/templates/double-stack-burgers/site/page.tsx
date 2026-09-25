import { TabbiedPattern } from 'tabbied/react';
import { bowl, ziggy } from 'tabbied/patterns';
import s from './double-stack-burgers.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Double Stack: Smash burgers, fries and shakes, Route 9',
  description:
    'Double Stack smashes two patties to order on a flat-top on Route 9. The menu, the combo deals, ordering ahead and delivery, and the hours, open till 1 am on weekends.',
};

/* Site colors. The zigzag trim sits on `transparent` over the cream, the
   row of buns over the dark footer. */
const INK = '#231815';
const KETCHUP = '#E03A1E';
const MUSTARD = '#F7B32B';
const CREAM = '#FFF6E9';

const BUNS = ['transparent', MUSTARD, KETCHUP, CREAM];
const ZIGZAG = ['transparent', INK, KETCHUP, MUSTARD];

const NAV = [
  ['Menu', '#menu'],
  ['Combos', '#combos'],
  ['Order', '#order'],
  ['Hours', '#hours'],
];

const BURGER_INKS = { red: 'var(--ketchup)', yellow: 'var(--mustard)', black: 'var(--ink)' };

/* The burger is drawn six times, each copy clipped to one layer and
   dropped a little further than the last (see .slice in the stylesheet).
   `top` puts each label level with its layer once the stack is apart. */
const LAYERS = [
  { no: '1', name: 'Potato bun', detail: 'Toasted face down in butter', side: 'left', top: '11%' },
  { no: '2', name: 'The fixings', detail: 'Iceberg, beefsteak tomato, American cheese', side: 'right', top: '32%' },
  { no: '3', name: 'Patty one', detail: '4 oz of chuck and brisket, smashed thin', side: 'left', top: '48.5%' },
  { no: '4', name: 'Round two', detail: 'More tomato and a second slice of cheese', side: 'right', top: '61.5%' },
  { no: '5', name: 'Patty two', detail: 'Same again, lacy and crisp at the edge', side: 'left', top: '75%' },
  { no: '6', name: 'The heel', detail: 'Stack sauce, so it never goes soggy', side: 'right', top: '92%' },
];

const SLICES = ['a', 'b', 'c', 'd', 'e', 'f'];

const BURGERS = [
  { name: 'The Double Stack', desc: 'Two smashed patties, two slices of American, lettuce, tomato, Stack sauce.', price: '$11.50', tag: 'The one' },
  { name: 'Single Stack', desc: 'One patty, one slice, the same fixings.', price: '$8.50', tag: '' },
  { name: 'Bacon Stack', desc: 'The double with thick-cut bacon and sharp cheddar.', price: '$13.50', tag: '' },
  { name: 'Mushroom Swiss', desc: 'The double with griddled mushrooms, Swiss and garlic mayo.', price: '$13.00', tag: '' },
  { name: 'Hot Honey', desc: 'Pepper jack, pickled jalapenos and a drizzle of hot honey.', price: '$13.00', tag: 'Spicy' },
  { name: 'Garden Stack', desc: 'Two black bean patties, avocado, pickled red onion.', price: '$12.00', tag: 'Veggie' },
  { name: "Kids' Single", desc: 'One patty, cheese and ketchup, with small fries.', price: '$7.00', tag: '' },
];

const SIDES = [
  { name: 'Fries, regular or large', price: '$3.50 / $5' },
  { name: 'Stack fries, sauce and onions', price: '$6.50' },
  { name: 'Onion rings', price: '$5.00' },
  { name: 'Tater tots', price: '$4.50' },
  { name: 'Fried pickle chips', price: '$5.00' },
];

const SHAKES = [
  { name: 'Vanilla bean', price: '$6.00' },
  { name: 'Chocolate malt', price: '$6.50' },
  { name: 'Strawberry', price: '$6.00' },
  { name: 'Black and white', price: '$6.50' },
  { name: 'Salted caramel pretzel', price: '$7.00' },
  { name: 'Root beer float', price: '$5.50' },
];

const COMBOS = [
  { name: 'The Double Deal', what: 'Any double, regular fries, a fountain drink', price: '$15', save: 'Save $2.75' },
  { name: 'Shake Combo', what: 'Any double, regular fries, any shake', price: '$19.50', save: 'Save $3' },
  { name: 'Family Stack', what: 'Four doubles, two large fries, four drinks', price: '$52', save: 'Save $9' },
  { name: 'Late Night', what: 'Single Stack, fries and a drink, Thu-Sat after 10 pm', price: '$10', save: 'Save $4' },
];

const STEPS = [
  { no: '1', head: 'Order', body: 'Online at doublestack.example or by phone. Pay ahead or at the counter.' },
  { no: '2', head: 'Pick a time', body: 'The first slot is 15 minutes out. We start smashing when you are 8 minutes away.' },
  { no: '3', head: 'Grab the bag', body: 'Your name is on it, on the shelf inside the door. No line, no waiting.' },
];

const DELIVERY = [
  ['Up to 1.5 miles', '$2.50'],
  ['1.5 to 3 miles', '$3.50'],
  ['Orders over $35', 'Free'],
  ['Typical wait', '30-40 min'],
];

const HOURS = [
  ['Monday - Wednesday', '11 am - 10 pm'],
  ['Thursday', '11 am - 11 pm'],
  ['Friday - Saturday', '11 am - 1 am'],
  ['Sunday', '12 pm - 9 pm'],
];

const SWAPS = [
  'Gluten-free bun, $1.50',
  'Lettuce wrap, no charge',
  'Any burger as a veggie, no charge',
  'Fries are cooked in beef tallow; tots and rings in canola',
];

export default function DoubleStackBurgersPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=Rubik:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markTop}>Double</span>
          <span className={s.markBottom}>Stack</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBtn} href="#order">Order ahead</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* The counter trim, under the bar. */}
        <div className={s.trim} aria-hidden="true">
          <TabbiedPattern
            pattern={ziggy}
            palette={ZIGZAG}
            fit="grid"
            cellSize={32}
            seed="top-trim"
            options={{ frequency: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ HERO
            The house burger taken apart layer by layer on a blue panel,
            each layer named on a leader line. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Smash burgers on Route 9</p>
            <h1 id="hero-h" className={s.title}>
              Two patties. <em>Six layers.</em> No shortcuts.
            </h1>
            <p className={s.lede}>
              Every burger is smashed to order on a seasoned flat-top, so the
              edges go crisp and lacy and the middle stays juicy. Here is the
              house one, taken apart.
            </p>
            <div className={s.actions}>
              <a className={s.btn} href="#order">Order ahead</a>
              <a className={s.btnLine} href="#menu">See the menu</a>
            </div>
            <p className={s.today}>
              <span className={s.todayDot} aria-hidden="true" />
              <span>Open today until 10 pm, till 1 am Friday and Saturday</span>
            </p>
          </div>

          <div className={s.stage}>
            <div className={s.panel} aria-hidden="true" />
            <div
              className={s.burger}
              role="img"
              aria-label="The Double Stack taken apart: bun, fixings, a patty, cheese and tomato, a second patty, and the bottom bun">
              <div className={s.burgerArt}>
                {SLICES.map((k) => (
                  <span key={k} className={s.slice}>
                    <Artwork slug="double-stack-burgers-burger" alt="" inks={BURGER_INKS} className={s.sliceArt} />
                  </span>
                ))}
              </div>
            </div>
            <ol className={s.labels}>
              {LAYERS.map((l) => (
                <li key={l.no} className={s.label} data-side={l.side} style={{ top: l.top }}>
                  <span className={s.labelNo}>{l.no}</span>
                  <strong className={s.labelName}>{l.name}</strong>
                  <span className={s.labelDetail}>{l.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ MENU
            The menu as three stacks: a bun on top, the list as the layers,
            a bun underneath. */}
        <section id="menu" className={s.menu} aria-labelledby="menu-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The menu</p>
            <h2 id="menu-h">Burgers, sides, shakes</h2>
            <p className={s.secNote}>
              Everything is made here: the patties ground twice a day, the
              fries cut every morning, the shakes spun with real ice cream.
            </p>
          </div>

          <div className={s.menuGrid}>
            <div className={`${s.stack} ${s.stackBurgers}`}>
              <div className={s.bunTop}>
                <h3>Burgers</h3>
                <span>All on a potato bun</span>
              </div>
              <ul className={s.items}>
                {BURGERS.map((b) => (
                  <li key={b.name} className={s.item}>
                    <div className={s.itemHead}>
                      <h4>{b.name}</h4>
                      <span className={s.tag}>{b.tag}</span>
                      <span className={s.dots} aria-hidden="true" />
                      <strong>{b.price}</strong>
                    </div>
                    <p>{b.desc}</p>
                  </li>
                ))}
              </ul>
              <div className={s.bunBottom} aria-hidden="true" />
            </div>

            <div className={s.stackPair}>
              <div className={s.stack}>
                <div className={`${s.bunTop} ${s.bunArt}`}>
                  <Artwork
                    slug="double-stack-burgers-fries"
                    alt="A paper carton of french fries"
                    inks={{ red: 'var(--ketchup)', yellow: 'var(--mustard)' }}
                    className={s.fries}
                  />
                  <div>
                    <h3>Sides</h3>
                    <span>Cut every morning</span>
                  </div>
                </div>
                <ul className={s.items}>
                  {SIDES.map((sd) => (
                    <li key={sd.name} className={s.itemShort}>
                      <h4>{sd.name}</h4>
                      <span className={s.dots} aria-hidden="true" />
                      <strong>{sd.price}</strong>
                    </li>
                  ))}
                </ul>
                <div className={s.bunBottom} aria-hidden="true" />
              </div>

              <div className={s.stack}>
                <div className={`${s.bunTop} ${s.bunArt}`}>
                  <Artwork
                    slug="double-stack-burgers-shake"
                    alt="A milkshake in a tall glass with a straw and a cherry"
                    inks={{ red: 'var(--ketchup)', blue: 'var(--blue)', yellow: 'var(--cream)', black: 'var(--ink)' }}
                    className={s.shake}
                  />
                  <div>
                    <h3>Shakes</h3>
                    <span>16 oz, real ice cream</span>
                  </div>
                </div>
                <ul className={s.items}>
                  {SHAKES.map((sh) => (
                    <li key={sh.name} className={s.itemShort}>
                      <h4>{sh.name}</h4>
                      <span className={s.dots} aria-hidden="true" />
                      <strong>{sh.price}</strong>
                    </li>
                  ))}
                </ul>
                <div className={s.bunBottom} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className={s.swaps}>
            <h3 className={s.swapsHead}>Swaps and allergies</h3>
            <ul>
              {SWAPS.map((sw) => (
                <li key={sw}>{sw}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* The zigzag band, like the trim along the counter. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={ziggy}
            palette={ZIGZAG}
            fit="grid"
            cellSize={40}
            seed="counter-trim"
            options={{ frequency: 0.8 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- COMBOS */}
        <section id="combos" className={s.combos} aria-labelledby="combos-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Combo deals</p>
            <h2 id="combos-h">Make it a meal</h2>
            <p className={s.secNote}>
              Swap the fries for rings or tots at no charge, or upgrade the
              drink to a shake for $4.
            </p>
          </div>
          <ul className={s.comboList}>
            {COMBOS.map((c, i) => (
              <li key={c.name} className={s.combo}>
                <span className={s.comboNo}>{`#${i + 1}`}</span>
                <h3>{c.name}</h3>
                <p>{c.what}</p>
                <div className={s.comboPrice}>
                  <strong>{c.price}</strong>
                  <span>{c.save}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.order} aria-labelledby="order-h">
          <div className={s.orderInner}>
            <div className={s.orderText}>
              <p className={s.secKick}>Order ahead and delivery</p>
              <h2 id="order-h">Skip the line, or stay on the couch</h2>
              <ol className={s.steps}>
                {STEPS.map((st) => (
                  <li key={st.no}>
                    <span className={s.stepNo}>{st.no}</span>
                    <h3>{st.head}</h3>
                    <p>{st.body}</p>
                  </li>
                ))}
              </ol>
              <div className={s.orderActions}>
                <a className={s.btn} href="#order">Start an order</a>
                <a className={s.phone} href="tel:+15550127829">(555) 012-7829</a>
              </div>
            </div>
            <div className={s.delivery}>
              <Artwork
                slug="double-stack-burgers-fries"
                alt=""
                inks={{ red: 'var(--blue)', yellow: 'var(--mustard)' }}
                className={s.deliveryFries}
              />
              <h3 className={s.deliveryHead}>Delivered by our own drivers</h3>
              <p className={s.deliveryNote}>
                In insulated bags, fries packed separately so they arrive
                crisp. Delivery runs until 30 minutes before closing.
              </p>
              <dl className={s.zones}>
                {DELIVERY.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hours} aria-labelledby="hours-h">
          <div className={s.hoursCard}>
            <p className={s.secKick}>Hours and finding us</p>
            <h2 id="hours-h">Open late, every day</h2>
            <dl className={s.hoursList}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.hoursNote}>The grill closes 15 minutes before we do.</p>
          </div>
          <div className={s.findUs}>
            <Artwork
              slug="double-stack-burgers-shake"
              alt=""
              inks={{ red: 'var(--ketchup)', blue: 'var(--cream)', yellow: 'var(--mustard)', black: 'var(--ink)' }}
              className={s.findShake}
            />
            <div className={s.findText}>
              <h3>1150 Route 9</h3>
              <p>
                Across from the bowling alley, with a lot out back. Forty seats,
                ten stools at the counter and four picnic tables in summer.
              </p>
              <a href="mailto:hello@doublestack.example">hello@doublestack.example</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.buns} aria-hidden="true">
          <TabbiedPattern
            pattern={bowl}
            palette={BUNS}
            fit="grid"
            cellSize={48}
            seed="bun-row"
            options={{ frequency: 0.8 }}
            redrawInterval={8000}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footTop}>
          <p className={s.footName}>Double Stack</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p className={s.footAddr}>
            1150 Route 9
            <br />
            (555) 012-7829
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional burger joint. Menu, prices and hours are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
