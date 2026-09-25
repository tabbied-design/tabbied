import { TabbiedPattern } from 'tabbied/react';
import { annulus, sliver } from 'tabbied/patterns';
import s from './glaze-donuts.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Glaze: Donut shop, Market Street',
  description:
    'Glaze fries a dozen kinds of donut every morning from 5 am on Market Street and sells them until they are gone. Build a dozen, pre-order for the office, and a cup of coffee to dunk.',
};

/* Site colors. Both fields sit on the page's own ground. */
const PINK = '#F06292';
const PURPLE = '#7E57C2';
const ORANGE = '#FFB74D';
const GRAY = '#A1887F';

const RINGS = ['transparent', PINK, ORANGE, PURPLE, PINK];
const SPRINKLES = ['transparent', PINK, PURPLE, ORANGE, GRAY];

const NAV = [
  ['The board', '#board'],
  ['Build a dozen', '#dozen'],
  ['Coffee', '#coffee'],
  ['Hours', '#hours'],
  ['FAQ', '#faq'],
];

/* The board. Each donut is the same picture in its own inks: the icing
   (red), the dough and a third of the sprinkles (yellow), and the other
   sprinkles (blue, black). Every donut here gets sprinkles. */
type Donut = {
  name: string;
  note: string;
  price: string;
  inks: Record<string, string>;
  tag?: string;
};

const DOUGH = 'var(--orange)';

const DONUTS: Donut[] = [
  {
    name: 'Vanilla bean',
    note: 'The one we are known for. Yeast raised, dipped warm.',
    price: '2.75',
    inks: {
      red: 'color-mix(in srgb, var(--cream) 78%, var(--orange))',
      yellow: DOUGH,
      blue: 'var(--pink)',
      black: 'var(--purple)',
    },
    tag: 'Best seller',
  },
  {
    name: 'Strawberry sprinkle',
    note: 'Fresh berry glaze and rainbow jimmies.',
    price: '3.25',
    inks: { red: 'var(--pink)', yellow: DOUGH, blue: 'var(--cream)', black: 'var(--purple)' },
  },
  {
    name: 'Ube coconut',
    note: 'Purple yam glaze, toasted coconut.',
    price: '3.50',
    inks: { red: 'var(--purple)', yellow: DOUGH, blue: 'var(--cream)', black: 'var(--cream)' },
  },
  {
    name: 'Milk chocolate',
    note: 'A thick coat of it, and rainbow sprinkles.',
    price: '3.00',
    inks: { red: 'var(--gray)', yellow: DOUGH, blue: 'var(--cream)', black: 'var(--pink)' },
  },
  {
    name: 'Maple bacon',
    note: 'Maple icing and crisp bacon from the butcher next door.',
    price: '3.75',
    inks: {
      red: 'var(--orange)',
      yellow: 'color-mix(in srgb, var(--orange) 55%, var(--choc))',
      blue: 'var(--pink)',
      black: 'var(--choc)',
    },
  },
  {
    name: 'Birthday cake',
    note: 'Vanilla bean icing, sprinkles, a candle on request.',
    price: '3.25',
    inks: { red: 'var(--cream)', yellow: DOUGH, blue: 'var(--pink)', black: 'var(--purple)' },
  },
  {
    name: 'Pink lemonade',
    note: 'Lemon curd inside, pink lemon glaze outside.',
    price: '3.50',
    inks: { red: 'var(--pink)', yellow: DOUGH, blue: 'var(--orange)', black: 'var(--cream)' },
    tag: 'Filled',
  },
  {
    name: 'Blueberry cake',
    note: 'A cake donut with berries in the batter.',
    price: '3.00',
    inks: {
      red: 'color-mix(in srgb, var(--purple) 55%, var(--cream))',
      yellow: DOUGH,
      blue: 'var(--purple)',
      black: 'var(--purple)',
    },
  },
  {
    name: 'Cinnamon sugar',
    note: 'Rolled while it is still too hot to hold.',
    price: '2.75',
    inks: {
      red: 'color-mix(in srgb, var(--orange) 55%, var(--gray))',
      yellow: DOUGH,
      blue: 'var(--cream)',
      black: 'var(--cream)',
    },
  },
  {
    name: 'Cookies and cream',
    note: 'Vanilla icing, crushed chocolate cookies.',
    price: '3.50',
    inks: { red: 'var(--cream)', yellow: DOUGH, blue: 'var(--choc)', black: 'var(--choc)' },
  },
  {
    name: 'Salted caramel',
    note: 'Burnt-sugar caramel and flakes of sea salt.',
    price: '3.50',
    inks: {
      red: 'var(--orange)',
      yellow: 'color-mix(in srgb, var(--orange) 55%, var(--choc))',
      blue: 'var(--cream)',
      black: 'var(--cream)',
    },
  },
  {
    name: 'Jam-filled',
    note: 'Raspberry jam, powdered sugar, messy.',
    price: '3.25',
    inks: { red: 'var(--cream)', yellow: DOUGH, blue: 'var(--pink)', black: 'var(--pink)' },
    tag: 'Filled',
  },
];

const DOZEN = [
  ['One', 'from $2.75'],
  ['Half dozen', '$16'],
  ['Dozen', '$29'],
  ['Two dozen', '$55'],
];

const DOZEN_STEPS = [
  ['1', 'Pick any twelve', 'Mix every flavor on the board. Filled ones count the same as the rest.'],
  ['2', 'We box them warm', 'In the pink box, with a sheet of paper between the layers so the icing survives.'],
  ['3', 'Order ahead', 'By 8 pm for the next morning, from 6 am. A pre-order is held until 10.'],
];

type Drink = { name: string; note: string; price: string };

const DRINKS: Drink[] = [
  { name: 'Drip coffee', note: 'Medium roast, refilled for free while you sit', price: '2.50 / 3.00' },
  { name: 'Americano', note: 'Two shots, hot water', price: '3.25' },
  { name: 'Latte', note: 'Whole, oat or almond milk', price: '4.50' },
  { name: 'Cold brew', note: 'Steeped overnight', price: '4.25' },
  { name: 'Chai', note: 'Spiced, not too sweet', price: '4.25' },
  { name: 'Hot chocolate', note: 'With a marshmallow on top', price: '3.75' },
];

const HOURS = [
  ['Tuesday-Friday', '6 am-1 pm'],
  ['Saturday', '6 am-2 pm'],
  ['Sunday', '7 am-1 pm'],
  ['Monday', 'Closed'],
];

const FAQ = [
  {
    q: 'What time do you sell out?',
    a: 'Most weekdays by noon and Saturdays by eleven. If you want a particular flavor after 10 am, call and we will tell you what is left, or pre-order.',
  },
  {
    q: 'Do you make vegan or gluten-free donuts?',
    a: 'Vegan on Fridays: two flavors, fried in a separate fryer. We do not make gluten-free donuts; the whole kitchen is dusted in flour.',
  },
  {
    q: 'What about nuts and other allergens?',
    a: 'Every donut contains wheat, milk, egg and soy, and the kitchen handles peanuts and tree nuts. Ask to see the allergen card at the counter.',
  },
  {
    q: 'Can I order for an office or a party?',
    a: 'Yes, from two dozen, with 48 hours notice. We deliver within three miles before 9 am for $10, and bring napkins and plates.',
  },
];

export default function GlazeDonutsPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Shrikhand&family=Work+Sans:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          Glaze
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className={s.barCta} href="#dozen">
          Pre-order
        </a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            One donut, very large, on a field of rings. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p className={s.kicker}>Donut shop, Market Street, since 2014</p>
            <h1 className={s.heroTitle} id="hero-h">
              Glazed at five,
              <br />
              <em>gone by noon.</em>
            </h1>
            <p className={s.heroLede}>
              We start frying at 5 am, a dozen kinds every morning, and we close the door when the last tray is empty.
              Come early for the vanilla bean, or order the night before and we will keep yours back.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#board">
                See today's board
              </a>
              <a className={s.btnLine} href="#dozen">
                Build a dozen
              </a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={annulus}
                palette={RINGS}
                fit="grid"
                cellSize={64}
                seed="glaze-hero"
                redrawInterval={8000}
                options={{ frequency: 0.55 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="glaze-donuts-donut"
              alt="A glazed donut with sprinkles"
              inks={{ red: 'var(--pink)', yellow: 'var(--orange)', blue: 'var(--cream)', black: 'var(--purple)' }}
              className={s.heroDonut}
            />
            <p className={s.heroSticker}>
              <span className={s.stickerBig}>12</span>
              <span className={s.stickerSmall}>kinds today</span>
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- BOARD
            The menu board over the counter: every donut in its own glaze. */}
        <section id="board" className={s.boardWrap} aria-labelledby="board-h">
          <div className={s.board}>
            <div className={s.boardHead}>
              <h2 id="board-h">Today's donuts</h2>
              <p className={s.boardNote}>Fried from 5 am. Sprinkles on everything.</p>
            </div>
            <ul className={s.donuts}>
              {DONUTS.map((d) => (
                <li key={d.name} className={s.donut}>
                  {d.tag ? <span className={s.donutTag}>{d.tag}</span> : null}
                  <Artwork slug="glaze-donuts-donut" alt="" inks={d.inks} className={s.donutArt} />
                  <h3 className={s.donutName}>{d.name}</h3>
                  <p className={s.donutNote}>{d.note}</p>
                  <p className={s.donutPrice}>
                    <span className={s.cur}>$</span>
                    <span>{d.price}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className={s.boardFoot}>Vegan Fridays: two flavors, fried separately. Ask what they are.</p>
          </div>
        </section>

        {/* A strip of sprinkles between the board and the box. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={sliver}
            palette={SPRINKLES}
            fit="grid"
            cellSize={30}
            seed="glaze-sprinkles"
            options={{ frequency: 0.8 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- DOZEN */}
        <section id="dozen" className={s.dozen} aria-labelledby="dozen-h">
          <div className={s.dozenArt}>
            <Artwork
              slug="glaze-donuts-box"
              alt="An open box of six donuts"
              inks={{ red: 'var(--pink)', yellow: 'var(--cream)', blue: 'var(--purple)', black: 'var(--choc)' }}
              className={s.box}
            />
          </div>
          <div className={s.dozenBody}>
            <h2 id="dozen-h">
              Build a dozen,
              <br />
              <em>any way you like.</em>
            </h2>
            <p className={s.lede}>
              Point at the board and we fill the box. Twelve different or twelve the same, it is the same price.
            </p>
            <dl className={s.ladder}>
              {DOZEN.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <ol className={s.dozenSteps}>
              {DOZEN_STEPS.map(([no, title, body]) => (
                <li key={no}>
                  <span className={s.stepNo}>{no}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <form className={s.form} action="#">
              <h3 className={s.formHead}>Pre-order for tomorrow</h3>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span>Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>How many</span>
                  <select name="size" defaultValue="dozen">
                    <option value="half">Half dozen</option>
                    <option value="dozen">Dozen</option>
                    <option value="two">Two dozen</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span>Pickup</span>
                  <select name="time" defaultValue="7">
                    <option value="6">6-7 am</option>
                    <option value="7">7-8 am</option>
                    <option value="8">8-9 am</option>
                    <option value="9">9-10 am</option>
                  </select>
                </label>
              </div>
              <label className={s.field}>
                <span>Which ones (or leave it to us)</span>
                <textarea name="flavors" rows={3} />
              </label>
              <button className={s.submit} type="submit">
                Send the order
              </button>
            </form>
          </div>
        </section>

        {/* ---------------------------------------------------------- COFFEE */}
        <section id="coffee" className={s.coffee} aria-labelledby="coffee-h">
          <div className={s.coffeeInner}>
            <div className={s.coffeeBody}>
              <h2 id="coffee-h">
                And a coffee
                <br />
                <em>to dunk it in.</em>
              </h2>
              <p className={s.lede}>
                Roasted across town and brewed every half hour. Drip refills are free for as long as you are at a table.
              </p>
              <ul className={s.drinks}>
                {DRINKS.map((d) => (
                  <li key={d.name}>
                    <span className={s.drinkName}>{d.name}</span>
                    <span className={s.drinkNote}>{d.note}</span>
                    <span className={s.drinkPrice}>{d.price}</span>
                  </li>
                ))}
              </ul>
              <p className={s.combo}>Any donut and a drip coffee: $5</p>
            </div>
            <div className={s.coffeeArt}>
              <Artwork
                slug="glaze-donuts-coffee"
                alt="A paper coffee cup with a lid"
                inks={{ red: 'var(--choc)', blue: 'var(--pink)', yellow: 'var(--cream)', black: 'var(--choc)' }}
                className={s.cup}
              />
              <Artwork
                slug="glaze-donuts-donut"
                alt=""
                inks={{ red: 'var(--purple)', yellow: 'var(--orange)', blue: 'var(--pink)', black: 'var(--cream)' }}
                className={s.cupDonut}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hours} aria-labelledby="hours-h">
          <div className={s.hoursHead}>
            <h2 id="hours-h">Open early, until we sell out</h2>
            <p className={s.lede}>
              The hours below are when the door is open. The sign in the window flips to Sold Out when the last tray
              goes, which is usually sooner.
            </p>
          </div>
          <div className={s.hoursGrid}>
            <dl className={s.hoursList}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <div className={s.where}>
              <p className={s.whereBig}>140 Market Street</p>
              <p>On the corner of Vine, with the pink awning. Four stools inside and two benches out front.</p>
              <a className={s.whereLink} href="tel:5550191400">
                (555) 019-1400
              </a>
              <a className={s.whereLink} href="mailto:dozen@glaze.example">
                dozen@glaze.example
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <h2 id="faq-h">Asked at the counter</h2>
          <div className={s.faqList}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Glaze</p>
        <p className={s.footTag}>Donuts from 5 am, 140 Market Street. Closed Mondays.</p>
        <div className={s.footFine}>
          <p>A fictional donut shop. Flavors, prices and hours are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            <span>, drawn live in the page's own colors; the pictures follow the palette too.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
