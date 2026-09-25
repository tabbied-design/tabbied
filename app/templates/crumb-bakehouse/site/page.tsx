import { TabbiedPattern } from 'tabbied/react';
import { hurdle, wovenkhaki } from 'tabbied/patterns';
import s from './crumb-bakehouse.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Figure } from 'components/Figure';

export const metadata = {
  title: 'Crumb Bakehouse: Neighborhood bakery, Orchard Row',
  description:
    'Crumb Bakehouse bakes sourdough, pastry and cake through the day on Orchard Row. Here is today\'s list, the breads of the week, celebration cakes and how to pre-order.',
};

/* Site colors. The woven fields paint the pale flour tone as their own
   cloth, with the rings drawn in honey; the basket plate lays its laths on
   a transparent ground so the plate's own color shows between them. */
const HONEY = '#C98B3A';
const PALE = '#EDE3D1';
const FLOUR = '#FBF7EF';

const WOVEN = ['transparent', PALE, HONEY];
const BASKET = ['transparent', HONEY, FLOUR];

const NAV = [
  ['Today', '#today'],
  ['This week', '#week'],
  ['Cakes and orders', '#orders'],
  ['Wholesale', '#wholesale'],
  ['Allergens', '#allergens'],
  ['The shop', '#shop'],
];

type Bake = {
  time: string;
  name: string;
  note: string;
  price: string;
  lasts: string;
};

const TODAY: Bake[] = [
  { time: '7:00', name: 'Country sourdough', note: 'white and wholewheat, thirty-six hours from mix to oven', price: '$9', lasts: 'All day' },
  { time: '7:00', name: 'Croissants', note: 'and pain au chocolat, laminated yesterday afternoon', price: '$4 / $4.50', lasts: 'Gone by 11' },
  { time: '7:30', name: 'Seeded rye', note: 'sunflower, flax and pumpkin seeds, a dark close crumb', price: '$10', lasts: 'Gone by 1' },
  { time: '8:30', name: 'Cardamom buns', note: 'knotted, glazed, still warm until about nine', price: '$4.50', lasts: 'Gone by noon' },
  { time: '9:30', name: 'Baguettes', note: 'the first bake, crackling as they cool', price: '$4', lasts: 'Gone by 12' },
  { time: '10:30', name: 'Focaccia', note: 'rosemary and sea salt, sold by the slab', price: '$5', lasts: 'Gone by 2' },
  { time: '12:00', name: 'Tin loaf', note: 'soft white sandwich bread, sliced if you ask', price: '$8', lasts: 'All day' },
  { time: '2:00', name: 'Baguettes', note: 'the second bake, for dinner', price: '$4', lasts: 'Until close' },
  { time: '3:00', name: 'Brown butter cookies', note: 'dark chocolate and flaky salt', price: '$3', lasts: 'Until close' },
];

const DAYS = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/* Which bread on which day: one flag per day, Tuesday to Sunday. */
const ROTA: { name: string; days: boolean[] }[] = [
  { name: 'Country sourdough', days: [true, true, true, true, true, true] },
  { name: 'Seeded rye', days: [true, false, true, false, true, false] },
  { name: 'Whole spelt', days: [false, true, false, true, false, false] },
  { name: 'Walnut and raisin', days: [false, true, false, false, true, true] },
  { name: 'Dark rye', days: [false, false, true, false, false, false] },
  { name: 'Olive and rosemary', days: [false, false, false, true, true, false] },
  { name: 'Challah', days: [false, false, false, true, false, false] },
  { name: 'Focaccia', days: [true, true, true, true, true, true] },
  { name: 'Cinnamon swirl', days: [false, false, false, false, false, true] },
];

const CAKES = [
  ['6 inch', 'serves 8 to 10', '$48'],
  ['8 inch', 'serves 12 to 16', '$64'],
  ['10 inch', 'serves 20 to 24', '$88'],
  ['Two tiers', 'serves 40, by arrangement', 'from $180'],
];

const FLAVORS = [
  'Chocolate and salted caramel',
  'Lemon and elderflower',
  'Carrot and walnut',
  'Vanilla sponge, strawberries, cream',
  'Coconut and lime (vegan)',
];

const ALLERGENS = [
  ['Country sourdough, focaccia, baguettes', 'Wheat'],
  ['Seeded rye, dark rye', 'Wheat, rye, sesame'],
  ['Whole spelt', 'Spelt (a wheat)'],
  ['Croissants, cardamom buns, challah', 'Wheat, milk, egg'],
  ['Pain au chocolat, cookies', 'Wheat, milk, egg, soy'],
  ['Walnut and raisin, carrot cake', 'Wheat, tree nuts'],
  ['Celebration cakes', 'Wheat, milk, egg; ask about each flavor'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Friday', '7 am to 5 pm'],
  ['Saturday', '7 am to 4 pm'],
  ['Sunday', '8 am to 2 pm'],
];

export default function CrumbBakehousePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Crumb</a>
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
        {/* -------------------------------------------------------- MASTHEAD */}
        <section className={s.mast} aria-labelledby="name-h">
          <p className={s.kicker}>Bakehouse on Orchard Row, since 2019</p>
          <h1 id="name-h" className={s.name}>Crumb Bakehouse</h1>
          <p className={s.lede}>
            Sourdough, pastry and cake, baked all day in the room behind the
            counter. This page is the list we chalk up by the door each
            morning.
          </p>
          <p className={s.dateLine}>
            <span>Today's list</span>
            <span className={s.dateSep} aria-hidden="true" />
            <span>Thursday, September 25</span>
          </p>
        </section>

        {/* The woven band: a basket liner laid across the top of the list. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={wovenkhaki}
              palette={WOVEN}
              fit="grid"
              cellSize={96}
              seed="crumb-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ----------------------------------------------------------- TODAY */}
        <section id="today" className={s.sec} aria-labelledby="today-h">
          <div className={s.secHead}>
            <h2 id="today-h">Out of the oven today</h2>
            <p className={s.secNote}>
              Times are when a bake comes out of the oven, give or take ten
              minutes. The last column is when it usually sells out.
            </p>
          </div>

          <div className={s.hang}>
            <div className={s.plate}>
              <div className={s.plateField} aria-hidden="true">
                <TabbiedPattern
                  pattern={wovenkhaki}
                  palette={WOVEN}
                  fit="grid"
                  cellSize={96}
                  seed="crumb-loaf"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Figure
                slug="crumb-bakehouse-loaf-cutout"
                cutout
                alt="A round country sourdough loaf, floured, with one deep open score"
                className={s.loaf}
              />
            </div>
            <p className={s.plateCaption}>The country loaf, out at seven.</p>
          </div>

          <ol className={s.list}>
            {TODAY.map((b) => (
              <li key={`${b.time}-${b.name}`}>
                <span className={s.time}>{b.time}</span>
                <div className={s.bake}>
                  <h3>{b.name}</h3>
                  <p className={s.bakeNote}>{b.note}</p>
                </div>
                <span className={s.bakePrice}>{b.price}</span>
                <span className={s.lasts}>{b.lasts}</span>
              </li>
            ))}
          </ol>
          <p className={s.halfPrice}>
            From 4 pm, everything left on the shelves is half price.
          </p>
        </section>

        {/* ------------------------------------------------------------ WEEK */}
        <section id="week" className={s.sec} aria-labelledby="week-h">
          <div className={s.secHead}>
            <h2 id="week-h">Breads of the week</h2>
            <p className={s.secNote}>
              The country loaf and the focaccia are baked every day. The rest
              come round on their own days. Closed Mondays: the oven gets the
              day off too.
            </p>
          </div>

          <div className={`${s.hang} ${s.hangLeft}`}>
            <div className={`${s.plate} ${s.plateBasket}`}>
              <div className={s.plateField} aria-hidden="true">
                <TabbiedPattern
                  pattern={hurdle}
                  palette={BASKET}
                  options={{ frequency: 1 }}
                  fit="grid"
                  cellSize={28}
                  seed="crumb-basket"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Figure
                slug="crumb-bakehouse-croissant-cutout"
                cutout
                alt="A golden croissant with deep, dark curls"
                className={s.croissant}
              />
            </div>
            <p className={s.plateCaption}>Croissants, every day we are open.</p>
          </div>

          <table className={s.rota}>
            <caption className={s.srOnly}>Which bread is baked on which day, Tuesday to Sunday</caption>
            <thead>
              <tr>
                <th scope="col" className={s.rotaBread}>Bread</th>
                {DAYS.map((d) => (
                  <th key={d} scope="col">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROTA.map((r) => (
                <tr key={r.name}>
                  <th scope="row" className={s.rotaBread}>{r.name}</th>
                  {r.days.map((on, i) => (
                    <td key={DAYS[i]} className={on ? s.on : s.off}>
                      <span className={s.srOnly}>{on ? 'Baked' : 'Not baked'}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ---------------------------------------------------------- ORDERS */}
        <section id="orders" className={s.sec} aria-labelledby="orders-h">
          <div className={s.secHead}>
            <h2 id="orders-h">Pre-orders and celebration cakes</h2>
            <p className={s.secNote}>
              Any bread on the week list, ordered by 2 pm the day before, is
              kept for you under your name until we close.
            </p>
          </div>

          <div className={s.cakes}>
            <div>
              <h3 className={s.label}>Cakes, with three days' notice</h3>
              <dl className={s.sizes}>
                {CAKES.map(([size, serves, price]) => (
                  <div key={size}>
                    <dt>{size}</dt>
                    <dd className={s.serves}>{serves}</dd>
                    <dd className={s.sizePrice}>{price}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.small}>
                A message piped on top and candles are free. A deposit of half
                is taken when you order.
              </p>
            </div>
            <div>
              <h3 className={s.label}>Flavors</h3>
              <ul className={s.flavors}>
                {FLAVORS.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <form className={s.form} action="#">
            <h3 className={s.formTitle}>Place an order</h3>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="crumb-name">Name</label>
                <input id="crumb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="crumb-phone">Phone</label>
                <input id="crumb-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="crumb-date">Pick-up day</label>
                <input id="crumb-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="crumb-kind">Order</label>
                <select id="crumb-kind" name="kind" defaultValue="bread">
                  <option value="bread">Bread or pastry</option>
                  <option value="cake">Celebration cake</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="crumb-what">What you would like</label>
                <textarea id="crumb-what" name="what" rows={3} />
              </div>
            </div>
            <button className={s.submit} type="submit">Send the order</button>
            <p className={s.small}>We call back within the day to confirm. Nothing is baked until we have spoken.</p>
          </form>
        </section>

        {/* ------------------------------------------------------- WHOLESALE */}
        <section id="wholesale" className={s.sec} aria-labelledby="wholesale-h">
          <div className={s.secHead}>
            <h2 id="wholesale-h">Wholesale</h2>
          </div>
          <p className={s.prose}>
            We bake for four cafes and two restaurants within a mile of the
            shop, delivered by cargo bike before seven. Standing orders only,
            from $60 a day, with a week's notice to change them. We are full
            until the new year; write to join the list.
          </p>
          <p className={s.prose}>
            <a href="mailto:trade@crumbbakehouse.example">trade@crumbbakehouse.example</a>
          </p>
        </section>

        {/* ------------------------------------------------------- ALLERGENS */}
        <section id="allergens" className={s.sec} aria-labelledby="allergens-h">
          <div className={s.secHead}>
            <h2 id="allergens-h">Allergens</h2>
            <p className={s.secNote}>
              One kitchen, flour in the air, nuts and sesame on the same
              benches. We cannot promise anything is free of anything, and we
              do not make gluten-free bread.
            </p>
          </div>
          <dl className={s.allergens}>
            {ALLERGENS.map(([what, contains]) => (
              <div key={what}>
                <dt>{what}</dt>
                <dd>{contains}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ SHOP */}
        <section id="shop" className={s.sec} aria-labelledby="shop-h">
          <div className={s.secHead}>
            <h2 id="shop-h">The shop</h2>
          </div>
          <div className={s.shop}>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className={s.address}>
                12 Orchard Row
                <br />
                next to the laundromat
              </p>
              <p className={s.address}>
                <a href="tel:+15550167720">(555) 016-7720</a>
                <br />
                <a href="mailto:hello@crumbbakehouse.example">hello@crumbbakehouse.example</a>
              </p>
              <p className={s.small}>
                Card and cash. Bring a bag, or take one of our paper ones for
                ten cents. There is one step at the door and a ramp inside it.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Crumb Bakehouse</p>
        <p>A fictional neighborhood bakery. Breads, prices and hours are invented.</p>
        <p>
          Patterns by{' '}
          <a href="https://tabbied.com" rel="noopener">
            Tabbied
          </a>
          , drawn live on a transparent ground; the loaf and the croissant are generated images.
        </p>
      </footer>
    </div>
  );
}
