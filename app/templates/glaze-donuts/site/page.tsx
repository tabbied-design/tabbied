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
const CREAM = '#FFF6F1';

const RINGS = ['transparent', PINK, ORANGE, PURPLE, PINK];
const SPRINKLES = ['transparent', PINK, PURPLE, ORANGE, GRAY];
const LEDGE = ['transparent', PINK, ORANGE, CREAM, PURPLE];

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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fff6f1',
        '--choc': '#2e1b1b',
        '--pink': '#f06292',
        '--purple': '#7e57c2',
        '--orange': '#ffb74d',
        '--gray': '#a1887f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,choc,pink,purple,orange,gray"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Shrikhand&family=Work+Sans:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">
          Glaze
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#dozen">
          Pre-order
        </a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>
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
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Donut shop, Market Street, since 2014</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Glazed at five,
              <br />
              <em>gone by noon.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              We start frying at 5 am, a dozen kinds every morning, and we close the door when the last tray is empty.
              Come early for the vanilla bean, or order the night before and we will keep yours back.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#board">
                See today's board
              </a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#dozen">
                Build a dozen
              </a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,4,3,2" className={s.heroField} aria-hidden="true">
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
              <span data-edit="hero.stickerBig" data-edit-max="60" className={s.stickerBig}>12</span>
              <span data-edit="hero.stickerSmall" data-edit-max="60" className={s.stickerSmall}>kinds today</span>
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- BOARD
            The menu board over the counter: every donut in its own glaze. */}
        <section id="board" className={s.boardWrap} aria-labelledby="board-h">
          <div className={s.board}>
            <div className={s.boardHead}>
              <h2 data-edit="board.title" data-edit-max="60" id="board-h">Today's donuts</h2>
              <p data-edit="board.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>Fried from 5 am. Sprinkles on everything.</p>
            </div>
            <ul className={s.donuts}>
              {DONUTS.map((d, i) => (
                <li key={d.name} className={s.donut}>
                  {d.tag ? <span data-edit={`board.donutTag.${i}`} data-edit-max="60" className={s.donutTag}>{d.tag}</span> : null}
                  <Artwork slug="glaze-donuts-donut" alt="" inks={d.inks} className={s.donutArt} />
                  <h3 data-edit={`board.donutName.${i}`} data-edit-max="40" className={s.donutName}>{d.name}</h3>
                  <p data-edit={`board.donutNote.${i}`} data-edit-max="240" data-edit-multiline className={s.donutNote}>{d.note}</p>
                  <p className={s.donutPrice}>
                    <span data-edit={`board.cur.${i}`} data-edit-max="60" className={s.cur}>$</span>
                    <span data-edit={`board.text.${i}`} data-edit-max="60">{d.price}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p data-edit="board.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>Vegan Fridays: two flavors, fried separately. Ask what they are.</p>
            <div data-edit-pattern="board.field" data-edit-roles="transparent,2,4,0,3" className={s.boardLedge} aria-hidden="true">
              <TabbiedPattern
                pattern={sliver}
                palette={LEDGE}
                fit="grid"
                cellSize={24}
                seed="glaze-ledge"
                options={{ frequency: 0.7 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* A strip of sprinkles between the board and the box. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4,5" className={s.band} aria-hidden="true">
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
            <div data-edit-pattern="dozen.field" data-edit-roles="transparent,2,4,3,2" className={s.dozenField} aria-hidden="true">
              <TabbiedPattern
                pattern={annulus}
                palette={RINGS}
                fit="grid"
                cellSize={56}
                seed="glaze-box"
                redrawInterval={10000}
                options={{ frequency: 0.4 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="glaze-donuts-box"
              alt="An open box of six donuts"
              inks={{ red: 'var(--pink)', yellow: 'var(--cream)', blue: 'var(--purple)', black: 'var(--choc)' }}
              className={s.box}
            />
          </div>
          <div className={s.dozenBody}>
            <h2 data-edit="dozen.title" data-edit-format="emphasis" data-edit-max="60" id="dozen-h">
              Build a dozen,
              <br />
              <em>any way you like.</em>
            </h2>
            <p data-edit="dozen.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Point at the board and we fill the box. Twelve different or twelve the same, it is the same price.
            </p>
            <dl className={s.ladder}>
              {DOZEN.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`dozen.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`dozen.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <ol className={s.dozenSteps}>
              {DOZEN_STEPS.map(([no, title, body], i) => (
                <li key={no}>
                  <span data-edit={`dozen.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{no}</span>
                  <h3 data-edit={`dozen.title.${i}`} data-edit-max="40">{title}</h3>
                  <p data-edit={`dozen.body2.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
                </li>
              ))}
            </ol>
            <form className={s.form} action="#">
              <h3 data-edit="dozen.formHead" data-edit-max="40" className={s.formHead}>Pre-order for tomorrow</h3>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="dozen.text" data-edit-max="60">Name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span data-edit="dozen.text2" data-edit-max="60">Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="dozen.text3" data-edit-max="60">How many</span>
                  <select name="size" defaultValue="dozen">
                    <option value="half">Half dozen</option>
                    <option value="dozen">Dozen</option>
                    <option value="two">Two dozen</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span data-edit="dozen.text4" data-edit-max="60">Pickup</span>
                  <select name="time" defaultValue="7">
                    <option value="6">6-7 am</option>
                    <option value="7">7-8 am</option>
                    <option value="8">8-9 am</option>
                    <option value="9">9-10 am</option>
                  </select>
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="dozen.text5" data-edit-max="60">Which ones (or leave it to us)</span>
                <textarea name="flavors" rows={3} />
              </label>
              <button data-edit="dozen.submit" data-edit-max="24" className={s.submit} type="submit">
                Send the order
              </button>
            </form>
          </div>
        </section>

        {/* ---------------------------------------------------------- COFFEE */}
        <section id="coffee" className={s.coffee} aria-labelledby="coffee-h">
          <div className={s.coffeeInner}>
            <div className={s.coffeeBody}>
              <h2 data-edit="coffee.title" data-edit-format="emphasis" data-edit-max="60" id="coffee-h">
                And a coffee
                <br />
                <em>to dunk it in.</em>
              </h2>
              <p data-edit="coffee.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Roasted across town and brewed every half hour. Drip refills are free for as long as you are at a table.
              </p>
              <ul className={s.drinks}>
                {DRINKS.map((d, i) => (
                  <li key={d.name}>
                    <span data-edit={`coffee.drinkName.${i}`} data-edit-max="60" className={s.drinkName}>{d.name}</span>
                    <span data-edit={`coffee.drinkNote.${i}`} data-edit-max="60" className={s.drinkNote}>{d.note}</span>
                    <span data-edit={`coffee.drinkPrice.${i}`} data-edit-max="60" className={s.drinkPrice}>{d.price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="coffee.combo" data-edit-max="240" data-edit-multiline className={s.combo}>Any donut and a drip coffee: $5</p>
            </div>
            <div className={s.coffeeArt}>
              <div data-edit-pattern="coffee.field" data-edit-roles="transparent,2,3,4,5" className={s.coffeeField} aria-hidden="true">
                <TabbiedPattern
                  pattern={sliver}
                  palette={SPRINKLES}
                  fit="grid"
                  cellSize={34}
                  seed="glaze-table"
                  options={{ frequency: 0.45 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
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
            <h2 data-edit="hours.title" data-edit-max="60" id="hours-h">Open early, until we sell out</h2>
            <p data-edit="hours.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              The hours below are when the door is open. The sign in the window flips to Sold Out when the last tray
              goes, which is usually sooner.
            </p>
          </div>
          <div className={s.hoursGrid}>
            <dl className={s.hoursList}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`hours.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
            <div className={s.where}>
              <p data-edit="hours.whereBig" data-edit-max="240" data-edit-multiline className={s.whereBig}>140 Market Street</p>
              <p data-edit="hours.body2" data-edit-max="240" data-edit-multiline>On the corner of Vine, with the pink awning. Four stools inside and two benches out front.</p>
              <a data-edit="hours.whereLink" data-edit-max="28" className={s.whereLink} href="tel:5550191400">
                (555) 019-1400
              </a>
              <a data-edit="hours.whereLink2" data-edit-max="28" className={s.whereLink} href="mailto:dozen@glaze.example">
                dozen@glaze.example
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Asked at the counter</h2>
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

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,2" className={s.footRings} aria-hidden="true">
          <TabbiedPattern
            pattern={annulus}
            palette={RINGS}
            fit="grid"
            cellSize={30}
            seed="glaze-footer"
            options={{ frequency: 0.6 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Glaze</p>
        <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Donuts from 5 am, 140 Market Street. Closed Mondays.</p>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional donut shop. Flavors, prices and hours are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the page's own colors; the pictures follow the palette too.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
