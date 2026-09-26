import { TabbiedPattern } from 'tabbied/react';
import { damier, turbulentsunburst } from 'tabbied/patterns';
import s from './slice-theory.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Slice Theory: Build-your-own pizzeria, Foundry Street',
  description:
    'Slice Theory is a pizzeria where you build the pie: a base, a sauce, a cheese and up to six toppings, baked at 850 degrees in ninety seconds. Prices by size, house pizzas, deals and ordering.',
};

/* Site colors. The oven disc spins sauce and cheese rays on a crust ground;
   the tablecloth checks sit on the flour paper with a transparent ground. */
const CRUST = '#231A15';
const SAUCE = '#D7422E';
const CHEESE = '#F2B134';

const OVEN = [CRUST, SAUCE, CHEESE, SAUCE];
const CLOTH = ['transparent', SAUCE];

const NAV = [
  ['Build', '#build'],
  ['Prices', '#prices'],
  ['House pizzas', '#house'],
  ['Deals', '#deals'],
  ['Order', '#order'],
];

type Choice = { name: string; note: string; price: string };

const BASES: Choice[] = [
  { name: 'Classic', note: '48-hour dough, stretched by hand', price: 'incl.' },
  { name: 'Thin and crisp', note: 'Rolled, docked, a real snap', price: 'incl.' },
  { name: 'Sourdough', note: 'Our starter, a chewier rim', price: '+$1' },
  { name: 'Gluten-free', note: '10 or 12 inch, own tray', price: '+$3' },
];

const SAUCES: Choice[] = [
  { name: 'San Marzano', note: 'Crushed tomato, salt, nothing else', price: 'incl.' },
  { name: 'Garlic cream', note: 'For a white pie', price: 'incl.' },
  { name: 'Basil pesto', note: 'Nut-free, made each morning', price: '+$1' },
  { name: 'Spicy vodka', note: 'Tomato, cream, Calabrian chile', price: '+$1' },
];

const CHEESES: Choice[] = [
  { name: 'Fior di latte', note: 'Fresh, torn, melts in pools', price: 'incl.' },
  { name: 'Mozzarella', note: 'Low-moisture, the classic stretch', price: 'incl.' },
  { name: 'Cashew', note: 'Vegan, browns like the real one', price: '+$2' },
  { name: 'Double it', note: 'Any cheese, twice as much', price: '+$2' },
];

const TOPPINGS = [
  {
    group: 'Vegetables',
    items: ['Mushrooms', 'Red onion', 'Roasted peppers', 'Black olives', 'Roasted garlic', 'Jalapenos', 'Artichoke', 'Pineapple'],
  },
  {
    group: 'Meats',
    items: ['Pepperoni', 'Fennel sausage', 'Soppressata', 'Prosciutto', 'Anchovies'],
  },
  {
    group: 'After the oven',
    items: ['Hot honey', 'Chili oil', 'Arugula', 'Fresh basil', 'Parmesan'],
  },
];

const SIZES = [
  { size: '10 inch', serves: 'Serves 1', cheese: '$11', topping: '$1.50', house: '$15', gf: '+$3' },
  { size: '12 inch', serves: 'Serves 1-2', cheese: '$14', topping: '$2', house: '$19', gf: '+$3' },
  { size: '14 inch', serves: 'Serves 2-3', cheese: '$17', topping: '$2.50', house: '$23', gf: 'No' },
  { size: '16 inch', serves: 'Serves 3-4', cheese: '$20', topping: '$3', house: '$27', gf: 'No' },
  { size: '18 inch', serves: 'Serves 4-6', cheese: '$24', topping: '$3.50', house: '$32', gf: 'No' },
];

const HOUSE = [
  {
    name: 'The Control',
    what: 'San Marzano, fior di latte, basil, olive oil',
    note: 'The margherita every other pizza is measured against.',
    crust: 'var(--sauce)',
    top: 'var(--cheese)',
    tag: 'Vegetarian',
  },
  {
    name: 'The Constant',
    what: 'San Marzano, mozzarella, cupped pepperoni, oregano',
    note: 'Our best seller for six years running.',
    crust: 'var(--sauce)',
    top: 'var(--cheese)',
    tag: 'Best seller',
  },
  {
    name: 'Null Hypothesis',
    what: 'Garlic cream, ricotta, mozzarella, lemon zest',
    note: 'A white pie. No tomato, and no regrets.',
    crust: 'var(--ash)',
    top: 'color-mix(in srgb, var(--cheese) 30%, var(--flour))',
    tag: 'Vegetarian',
  },
  {
    name: 'Peer Review',
    what: 'Mushrooms, roasted garlic, olives, thyme, fontina',
    note: 'Earthy, salty, argued over by the staff.',
    crust: 'var(--crust)',
    top: 'color-mix(in srgb, var(--cheese) 70%, var(--ash))',
    tag: 'Vegetarian',
  },
  {
    name: 'Green Theory',
    what: 'Basil pesto, zucchini, arugula, pecorino',
    note: 'Pesto base, leaves on after the oven.',
    crust: 'var(--basil)',
    top: 'color-mix(in srgb, var(--basil) 45%, var(--cheese))',
    tag: 'Vegetarian',
  },
  {
    name: 'The Outlier',
    what: 'Soppressata, pineapple, jalapeno, hot honey',
    note: 'Sweet, hot and not for purists.',
    crust: 'var(--sauce)',
    top: 'color-mix(in srgb, var(--cheese) 80%, var(--sauce))',
    tag: 'Spicy',
  },
];

const DEALS = [
  {
    day: 'Tuesday',
    title: 'Two-for Tuesday',
    body: 'Buy any large, get a second large at half price. Pickup only.',
    code: 'All day',
  },
  {
    day: 'Weekdays',
    title: 'Lunch theory',
    body: 'A slice of the day, a side salad and a soda for $8.',
    code: '11 am - 3 pm',
  },
  {
    day: 'Friday, Saturday',
    title: 'Late lab',
    body: 'Any medium house pizza for $18 when the kitchen goes quiet.',
    code: 'After 10 pm',
  },
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday - Thursday', '11 am - 10 pm'],
  ['Friday - Saturday', '11 am - midnight'],
  ['Sunday', '12 pm - 9 pm'],
];

export default function SliceTheoryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--flour': '#fbf4ea',
        '--crust': '#231a15',
        '--sauce': '#d7422e',
        '--basil': '#3e8e41',
        '--cheese': '#f2b134',
        '--ash': '#a58e7d',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="flour,crust,sauce,basil,cheese,ash"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.text" data-edit-max="60">Slice</span>
          <em>Theory</em>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:5550147300">(555) 014-7300</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The whole pie on a board, over the oven's molten sunburst. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Pizzeria, 212 Foundry Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              You build it. <em>The oven proves it.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Pick a base, a sauce, a cheese and up to six toppings. We bake it
              at 850 degrees for ninety seconds and hand it over. That is the
              whole theory.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#build">Start building</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#house">Or pick a house pizza</a>
            </div>
            <p className={s.equation} aria-hidden="true">
              <span data-edit="hero.text" data-edit-max="60">Base</span>
              <span data-edit="hero.text2" data-edit-max="60">Sauce</span>
              <span data-edit="hero.text3" data-edit-max="60">Cheese</span>
              <span data-edit="hero.text4" data-edit-max="60">Toppings</span>
              <span data-edit="hero.eqResult" data-edit-max="60" className={s.eqResult}>Your pizza</span>
            </p>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="1,2,4,2" className={s.oven} aria-hidden="true">
              <TabbiedPattern
                pattern={turbulentsunburst}
                palette={OVEN}
                fit="grid"
                cellSize={72}
                seed="slice-oven"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.board}>
              <Artwork
                slug="slice-theory-pizza"
                alt="A whole pizza seen from above, with pepperoni, mushrooms and olives"
                inks={{ red: 'var(--sauce)', blue: 'var(--basil)', yellow: 'var(--cheese)', black: 'var(--crust)' }}
                className={s.pizza}
              />
            </div>
            <p className={s.ovenTag}>
              <strong data-edit="hero.emphasis">850</strong>
              <span data-edit="hero.text5" data-edit-max="60">degrees, 90 seconds</span>
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- BUILD
            Four numbered steps, one column each, the picture filling in as
            the pie does. */}
        <section id="build" className={s.build} aria-labelledby="build-h">
          <div className={s.head}>
            <p data-edit="build.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Build your own</p>
            <h2 data-edit="build.title" data-edit-max="60" id="build-h">Four steps to your pizza</h2>
            <p data-edit="build.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Every pizza starts at the cheese price for its size. Toppings are
              priced by size too; the table below has the numbers.
            </p>
          </div>
          <ol className={s.steps}>
            <li className={s.step}>
              <div className={s.stepHead}>
                <span data-edit="build.stepNo" data-edit-max="60" className={s.stepNo}>01</span>
                <h3 data-edit="build.stepTitle" data-edit-max="40" className={s.stepTitle}>Base</h3>
              </div>
              <div className={s.stepArt}>
                <Artwork
                  slug="slice-theory-pizza"
                  alt="A round of plain dough"
                  inks={{
                    red: 'color-mix(in srgb, var(--cheese) 45%, var(--ash))',
                    blue: 'color-mix(in srgb, var(--cheese) 30%, var(--flour))',
                    yellow: 'color-mix(in srgb, var(--cheese) 30%, var(--flour))',
                    black: 'color-mix(in srgb, var(--cheese) 30%, var(--flour))',
                  }}
                  className={s.stepPic}
                />
              </div>
              <ul className={s.choices}>
                {BASES.map((c, i) => (
                  <li key={c.name}>
                    <span data-edit={`build.choiceName.${i}`} data-edit-max="60" className={s.choiceName}>{c.name}</span>
                    <span data-edit={`build.choiceNote.${i}`} data-edit-max="60" className={s.choiceNote}>{c.note}</span>
                    <span data-edit={`build.choicePrice.${i}`} data-edit-max="60" className={s.choicePrice}>{c.price}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className={s.step}>
              <div className={s.stepHead}>
                <span data-edit="build.stepNo2" data-edit-max="60" className={s.stepNo}>02</span>
                <h3 data-edit="build.stepTitle2" data-edit-max="40" className={s.stepTitle}>Sauce</h3>
              </div>
              <div className={s.stepArt}>
                <Artwork
                  slug="slice-theory-tomato"
                  alt="A tomato beside a sprig of basil"
                  inks={{
                    red: 'var(--sauce)',
                    blue: 'var(--basil)',
                    yellow: 'color-mix(in srgb, var(--basil) 60%, var(--crust))',
                  }}
                  className={s.stepPic}
                />
              </div>
              <ul className={s.choices}>
                {SAUCES.map((c, i) => (
                  <li key={c.name}>
                    <span data-edit={`build.choiceName2.${i}`} data-edit-max="60" className={s.choiceName}>{c.name}</span>
                    <span data-edit={`build.choiceNote2.${i}`} data-edit-max="60" className={s.choiceNote}>{c.note}</span>
                    <span data-edit={`build.choicePrice2.${i}`} data-edit-max="60" className={s.choicePrice}>{c.price}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className={s.step}>
              <div className={s.stepHead}>
                <span data-edit="build.stepNo3" data-edit-max="60" className={s.stepNo}>03</span>
                <h3 data-edit="build.stepTitle3" data-edit-max="40" className={s.stepTitle}>Cheese</h3>
              </div>
              <div className={s.stepArt}>
                <Artwork
                  slug="slice-theory-slice"
                  alt="A slice of cheese pizza"
                  inks={{
                    red: 'color-mix(in srgb, var(--cheese) 45%, var(--ash))',
                    yellow: 'var(--cheese)',
                  }}
                  className={s.stepPic}
                />
              </div>
              <ul className={s.choices}>
                {CHEESES.map((c, i) => (
                  <li key={c.name}>
                    <span data-edit={`build.choiceName3.${i}`} data-edit-max="60" className={s.choiceName}>{c.name}</span>
                    <span data-edit={`build.choiceNote3.${i}`} data-edit-max="60" className={s.choiceNote}>{c.note}</span>
                    <span data-edit={`build.choicePrice3.${i}`} data-edit-max="60" className={s.choicePrice}>{c.price}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className={`${s.step} ${s.stepLast}`}>
              <div className={s.stepHead}>
                <span data-edit="build.stepNo4" data-edit-max="60" className={s.stepNo}>04</span>
                <h3 data-edit="build.stepTitle4" data-edit-max="40" className={s.stepTitle}>Toppings</h3>
              </div>
              <div className={s.stepArt}>
                <Artwork
                  slug="slice-theory-pizza"
                  alt="The finished pizza with its toppings"
                  inks={{ red: 'var(--sauce)', blue: 'var(--basil)', yellow: 'var(--cheese)', black: 'var(--crust)' }}
                  className={s.stepPic}
                />
              </div>
              <p data-edit="build.toppingRule" data-edit-max="240" data-edit-multiline className={s.toppingRule}>Up to six. Half-and-half is free.</p>
              <div className={s.toppingGroups}>
                {TOPPINGS.map((g, i) => (
                  <div key={g.group} className={s.toppingGroup}>
                    <h4 data-edit={`build.toppingHead.${i}`} data-edit-max="36" className={s.toppingHead}>{g.group}</h4>
                    <ul className={s.tags}>
                      {g.items.map((t, i2) => (
                        <li data-edit={`build.item.${i}.${i2}`} data-edit-max="80" key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          </ol>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.prices} aria-labelledby="prices-h">
          <div data-edit-pattern="prices.field" data-edit-roles="1,2,4,2" className={s.pricesOven} aria-hidden="true">
            <TabbiedPattern
              pattern={turbulentsunburst}
              palette={OVEN}
              fit="grid"
              cellSize={32}
              seed="slice-dial"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.head}>
            <p data-edit="prices.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The price matrix</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">Every size, every sum</h2>
            <p data-edit="prices.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              A cheese pizza plus its toppings, or a house pizza at one price.
              Sauce and base upgrades are the same at every size.
            </p>
          </div>
          <div className={s.matrixWrap}>
            <table className={s.matrix}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Pizza prices by size</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Size</th>
                  <th data-edit="prices.heading2" scope="col">Cheese pizza</th>
                  <th data-edit="prices.heading3" scope="col">Each topping</th>
                  <th data-edit="prices.heading4" scope="col">House pizza</th>
                  <th data-edit="prices.heading5" scope="col">Gluten-free base</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((r, i) => (
                  <tr key={r.size}>
                    <th scope="row">
                      <span data-edit={`prices.sizeName.${i}`} data-edit-max="60" className={s.sizeName}>{r.size}</span>
                      <span data-edit={`prices.sizeServes.${i}`} data-edit-max="60" className={s.sizeServes}>{r.serves}</span>
                    </th>
                    <td data-edit={`prices.cell.${i}`}>{r.cheese}</td>
                    <td data-edit={`prices.cell2.${i}`}>{r.topping}</td>
                    <td data-edit={`prices.cell3.${i}`}>{r.house}</td>
                    <td data-edit={`prices.cell4.${i}`}>{r.gf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="prices.example" data-edit-max="240" data-edit-multiline className={s.example}>
            Worked example: a 14 inch sourdough, San Marzano, mozzarella, with
            mushrooms and fennel sausage is $17 + $1 + $2.50 + $2.50 = $23.
          </p>
        </section>

        {/* ----------------------------------------------------------- HOUSE */}
        <section id="house" className={s.house} aria-labelledby="house-h">
          <div className={s.head}>
            <p data-edit="house.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Already proven</p>
            <h2 data-edit="house.title" data-edit-max="60" id="house-h">Six house pizzas</h2>
            <p data-edit="house.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              If you would rather not do the math. Every one can be changed:
              swap anything for anything, at no charge.
            </p>
          </div>
          <ul className={s.houseGrid}>
            {HOUSE.map((p, i) => (
              <li key={p.name} className={s.pie}>
                <div className={s.pieArt}>
                  <Artwork
                    slug="slice-theory-slice"
                    alt=""
                    inks={{ red: p.crust, yellow: p.top }}
                    className={s.pieSlice}
                  />
                </div>
                <div className={s.pieCopy}>
                  <span data-edit={`house.pieTag.${i}`} data-edit-max="60" className={s.pieTag}>{p.tag}</span>
                  <h3 data-edit={`house.pieName.${i}`} data-edit-max="40" className={s.pieName}>{p.name}</h3>
                  <p data-edit={`house.pieWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.pieWhat}>{p.what}</p>
                  <p data-edit={`house.pieNote.${i}`} data-edit-max="240" data-edit-multiline className={s.pieNote}>{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- DEALS
            A strip of tablecloth checks, then three deals on it. */}
        <section id="deals" className={s.deals} aria-labelledby="deals-h">
          <div data-edit-pattern="deals.field" data-edit-roles="transparent,2" className={s.cloth} aria-hidden="true">
            <TabbiedPattern
              pattern={damier}
              palette={CLOTH}
              fit="grid"
              cellSize={40}
              seed="slice-cloth"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.dealsInner}>
            <div className={s.head}>
              <p data-edit="deals.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Deals</p>
              <h2 data-edit="deals.title" data-edit-max="60" id="deals-h">Three standing offers</h2>
            </div>
            <ul className={s.dealGrid}>
              {DEALS.map((d, i) => (
                <li key={d.title} className={s.deal}>
                  <span data-edit={`deals.dealDay.${i}`} data-edit-max="60" className={s.dealDay}>{d.day}</span>
                  <h3 data-edit={`deals.dealTitle.${i}`} data-edit-max="40" className={s.dealTitle}>{d.title}</h3>
                  <p data-edit={`deals.dealBody.${i}`} data-edit-max="240" data-edit-multiline className={s.dealBody}>{d.body}</p>
                  <span data-edit={`deals.dealCode.${i}`} data-edit-max="60" className={s.dealCode}>{d.code}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.order} aria-labelledby="order-h">
          <div className={s.orderCopy}>
            <p data-edit="order.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Order</p>
            <h2 data-edit="order.title" data-edit-max="60" id="order-h">Call it in, walk it out</h2>
            <p data-edit="order.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Pickup is ready in fifteen minutes. We deliver within three miles
              by bike: $3, free on orders over $40.
            </p>
            <div className={s.orderActions}>
              <a data-edit="order.btn" data-edit-max="28" className={s.btn} href="tel:5550147300">Call (555) 014-7300</a>
              <a data-edit="order.btnLine" data-edit-max="28" className={s.btnLine} href="mailto:orders@slicetheory.example">orders@slicetheory.example</a>
            </div>
          </div>
          <div className={s.orderCard}>
            <h3 data-edit="order.orderHead" data-edit-max="40" className={s.orderHead}>Hours</h3>
            <dl className={s.hours}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`order.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`order.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
            <h3 data-edit="order.orderHead2" data-edit-max="40" className={s.orderHead}>Where</h3>
            <p data-edit="order.orderText" data-edit-max="240" data-edit-multiline className={s.orderText}>212 Foundry Street, on the corner of Kiln Lane</p>
            <p data-edit="order.orderText2" data-edit-max="240" data-edit-multiline className={s.orderText}>Twenty seats inside, eight on the sidewalk</p>
          </div>
          <div className={s.sliceStage}>
            <div data-edit-pattern="order.field" data-edit-roles="1,2,4,2" className={s.sliceOven} aria-hidden="true">
              <TabbiedPattern
                pattern={turbulentsunburst}
                palette={OVEN}
                fit="grid"
                cellSize={40}
                seed="slice-order"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="slice-theory-slice"
              alt=""
              inks={{ red: 'var(--sauce)', yellow: 'var(--cheese)' }}
              className={s.orderSlice}
            />
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2" className={s.footCloth} aria-hidden="true">
          <TabbiedPattern
            pattern={damier}
            palette={CLOTH}
            fit="grid"
            cellSize={24}
            seed="slice-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Slice Theory</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Build-your-own pizza, 212 Foundry Street.</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}><a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional pizzeria. Prices, hours and pizzas are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the page's own colors; the pictures follow the same palette.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
