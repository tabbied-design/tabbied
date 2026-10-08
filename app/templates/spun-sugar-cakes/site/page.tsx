import { TabbiedPattern } from 'tabbied/react';
import { spandrel } from 'tabbied/patterns';
import s from './spun-sugar-cakes.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Spun Sugar Cakes: Custom cakes made to order',
  description:
    'Spun Sugar is a one-woman cake studio on Larkspur Row. Birthday, wedding and anything-at-all cakes, made to order: pick a size, a flavor and a finish, or start with a tasting box.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The spandrel's
   quarter-round scallops are piped icing: each tier of the hero cake is
   iced in it, a ribbon of it runs under the menu, and it trims the
   footer like the edge of a cake box. */
const SUGAR = '#fcf3ee';
const COCOA = '#43212e';
const RASPBERRY = '#c93a68';
const PISTACHIO = '#a8c99b';
const BUTTER = '#f5d98b';
const BLUSH = '#f3bccb';

const TOP = ['transparent', RASPBERRY, BLUSH, PISTACHIO, BUTTER, RASPBERRY];
const MIDDLE = ['transparent', PISTACHIO, RASPBERRY, BUTTER, BLUSH, PISTACHIO];
const BOTTOM = ['transparent', BLUSH, PISTACHIO, RASPBERRY, BUTTER, BLUSH];
const RIBBON = ['transparent', RASPBERRY, PISTACHIO, BUTTER, BLUSH, COCOA];
const BOX = ['transparent', BLUSH, PISTACHIO, BUTTER, RASPBERRY, SUGAR];

const NAV = [
  ['Sizes', '#sizes'],
  ['Flavors', '#flavors'],
  ['Tasting boxes', '#tasting'],
  ['Lead times', '#lead-times'],
  ['Order', '#order'],
];

type Size = { name: string; tiers: string; across: string; party: string; wedding: string; from: string; shape: string };

const SIZES: Size[] = [
  { name: 'Little cake', tiers: '1', across: '6 in', party: '8-10', wedding: '12', from: '$65', shape: 't1' },
  { name: 'Party cake', tiers: '1', across: '8 in', party: '16-20', wedding: '24', from: '$95', shape: 't1' },
  { name: 'Tall party cake', tiers: '1, double height', across: '8 in', party: '24-30', wedding: '36', from: '$135', shape: 'tTall' },
  { name: 'Two tiers', tiers: '2', across: '6 and 8 in', party: '30-40', wedding: '50', from: '$240', shape: 't2' },
  { name: 'Three tiers', tiers: '3', across: '6, 8 and 10 in', party: '60-75', wedding: '100', from: '$420', shape: 't3' },
  { name: 'Four tiers', tiers: '4', across: '6, 8, 10 and 12 in', party: '110-130', wedding: '180', from: '$720', shape: 't4' },
];

const SPONGES = [
  { name: 'Vanilla bean', note: 'Madagascar vanilla, buttermilk crumb', fav: true },
  { name: 'Dark chocolate', note: 'Made with coffee, very moist', fav: true },
  { name: 'Lemon and poppy seed', note: 'Bright, a little sharp', fav: false },
  { name: 'Pistachio and rose', note: 'Ground pistachios, rose water', fav: false },
  { name: 'Brown butter banana', note: 'Our one cake that is better on day two', fav: false },
  { name: 'Carrot and walnut', note: 'Spiced, with orange zest', fav: false },
];

const FILLINGS = [
  ['Raspberry jam', 'Ours, seeds and all'],
  ['Salted caramel', 'Cooked dark'],
  ['Lemon curd', 'Folded with cream'],
  ['Passion fruit curd', 'For the brave'],
  ['Chocolate ganache', '70% cocoa'],
  ['Cream cheese', 'Whipped, for carrot cake'],
];

const FINISHES = [
  ['Swiss meringue buttercream', 'Silky, not too sweet', 'included'],
  ['Semi-naked', 'Sponge peeking through', 'included'],
  ['Chocolate ganache', 'Sharp edges, a glossy drip', '+ $1 a slice'],
  ['Fondant', 'Smooth, for sugar flowers', '+ $2 a slice'],
];

const TASTING = [
  ['Vanilla bean', 'with raspberry jam', 'blush'],
  ['Dark chocolate', 'with salted caramel', 'butter'],
  ['Lemon and poppy', 'with lemon curd', 'pistachio'],
  ['Pistachio and rose', 'with raspberry jam', 'butter'],
  ['Brown butter banana', 'with caramel', 'pistachio'],
  ['Carrot and walnut', 'with cream cheese', 'blush'],
];

/* Weeks of notice, drawn as bars on a twelve-week ruler. */
const LEADS = [
  ['Tasting box', '3 days', 'w1'],
  ['Little or party cake', '2 weeks', 'w2'],
  ['Two tiers', '4 weeks', 'w4'],
  ['Three or four tiers', '6 weeks', 'w6'],
  ['Wedding cakes', '8-12 weeks', 'w12'],
];

const HOURS = [
  ['Pickups', 'Thursday to Saturday, 10:00-4:00'],
  ['Consultations', 'Tuesday and Wednesday, by appointment'],
  ['Delivery', 'Tiered cakes within 25 miles, set up on the table'],
];

export default function SpunSugarCakesPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sugar': '#fcf3ee',
        '--cocoa': '#43212e',
        '--raspberry': '#c93a68',
        '--pistachio': '#a8c99b',
        '--butter': '#f5d98b',
        '--blush': '#f3bccb',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sugar,cocoa,raspberry,pistachio,butter,blush"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Figtree:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Spun Sugar</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Cakes</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barOrder" data-edit-max="28" className={s.barOrder} href="#order">Order a cake</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A three-tier cake, each tier iced in the spandrel, on a stand. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Custom cakes, made to order on Larkspur Row</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your party, <em>one tier at a time.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Birthday cakes, wedding cakes and cakes for no reason at all. Pick
              a size, a flavor and a finish below, and Mara will send you a
              sketch and a price within two days.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#order">Start an order</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#tasting">Try a tasting box</a>
            </div>
            <dl className={s.ticket}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">From</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>$65</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Serves</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>8 to 180</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Notice</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>2 weeks</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroCake}>
            <span className={s.candles} aria-hidden="true" />
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,5,3,4,2" className={s.tierTop} aria-hidden="true">
              <TabbiedPattern
                pattern={spandrel}
                palette={TOP}
                fit="grid"
                cellSize={34}
                seed="spun-sugar-top"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div data-edit-pattern="hero.field2" data-edit-roles="transparent,3,2,4,5,3" className={s.tierMiddle} aria-hidden="true">
              <TabbiedPattern
                pattern={spandrel}
                palette={MIDDLE}
                fit="grid"
                cellSize={38}
                seed="spun-sugar-middle"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div data-edit-pattern="hero.field3" data-edit-roles="transparent,5,3,2,4,5" className={s.tierBottom} aria-hidden="true">
              <TabbiedPattern
                pattern={spandrel}
                palette={BOTTOM}
                fit="grid"
                cellSize={42}
                seed="spun-sugar-bottom"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.stand} aria-hidden="true" />
            <p data-edit="hero.cakeNote" data-edit-max="240" data-edit-multiline className={s.cakeNote}>Three tiers, 6, 8 and 10 inches, serves 75. From $420.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- SIZES */}
        <section id="sizes" className={s.sec} aria-labelledby="sizes-h">
          <div className={s.secHead}>
            <p data-edit="sizes.step" data-edit-max="240" data-edit-multiline className={s.step}>Step 1</p>
            <h2 data-edit="sizes.secTitle" data-edit-max="60" id="sizes-h" className={s.secTitle}>Choose a size</h2>
            <p data-edit="sizes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Party slices are generous, about 1 by 2 inches. Wedding slices are
              the slimmer 1 by 1 kind, served after a dinner. Every cake is four
              layers of sponge and three of filling.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.sizes}>
              <caption data-edit="sizes.srOnly" className={s.srOnly}>Cake sizes, servings and prices</caption>
              <thead>
                <tr>
                  <th data-edit="sizes.heading" scope="col">Cake</th>
                  <th data-edit="sizes.heading2" scope="col">Tiers</th>
                  <th data-edit="sizes.heading3" scope="col">Across</th>
                  <th data-edit="sizes.heading4" scope="col">Party slices</th>
                  <th data-edit="sizes.heading5" scope="col">Wedding slices</th>
                  <th data-edit="sizes.heading6" scope="col">From</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((size, i) => (
                  <tr key={size.name}>
                    <th scope="row">
                      <span className={`${s.mini} ${s[size.shape]}`} aria-hidden="true" />
                      <span data-edit={`sizes.sizeName.${i}`} data-edit-max="60" className={s.sizeName}>{size.name}</span>
                    </th>
                    <td data-edit={`sizes.cell.${i}`}>{size.tiers}</td>
                    <td data-edit={`sizes.cell2.${i}`}>{size.across}</td>
                    <td data-edit={`sizes.cell3.${i}`}>{size.party}</td>
                    <td data-edit={`sizes.cell4.${i}`}>{size.wedding}</td>
                    <td data-edit={`sizes.sizeFrom.${i}`} className={s.sizeFrom}>{size.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --------------------------------------------------------- FLAVORS */}
        <section id="flavors" className={s.sec} aria-labelledby="flavors-h">
          <div className={s.secHead}>
            <p data-edit="flavors.step" data-edit-max="240" data-edit-multiline className={s.step}>Step 2</p>
            <h2 data-edit="flavors.secTitle" data-edit-max="60" id="flavors-h" className={s.secTitle}>Flavor, filling and finish</h2>
            <p data-edit="flavors.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Pick one of each, or a different flavor for every tier at no extra
              charge. Everything is baked from scratch the day before.
            </p>
          </div>
          <div className={s.menu}>
            <div className={s.menuCol}>
              <h3 data-edit="flavors.menuTitle" data-edit-max="40" className={s.menuTitle}>Sponge</h3>
              <ul className={s.menuList}>
                {SPONGES.map((sponge, i) => (
                  <li key={sponge.name}>
                    <span data-edit={`flavors.menuName.${i}`} data-edit-max="60" className={s.menuName}>{sponge.name}</span>
                    {sponge.fav ? <span data-edit={`flavors.fav.${i}`} data-edit-max="60" className={s.fav}>Favorite</span> : null}
                    <span data-edit={`flavors.menuNote.${i}`} data-edit-max="60" className={s.menuNote}>{sponge.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.menuCol}>
              <h3 data-edit="flavors.menuTitle2" data-edit-max="40" className={s.menuTitle}>Filling</h3>
              <ul className={s.menuList}>
                {FILLINGS.map(([name, note], i) => (
                  <li key={name}>
                    <span data-edit={`flavors.menuName2.${i}`} data-edit-max="60" className={s.menuName}>{name}</span>
                    <span data-edit={`flavors.menuNote2.${i}`} data-edit-max="60" className={s.menuNote}>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.menuCol}>
              <h3 data-edit="flavors.menuTitle3" data-edit-max="40" className={s.menuTitle}>Finish</h3>
              <ul className={s.menuList}>
                {FINISHES.map(([name, note, price], i) => (
                  <li key={name}>
                    <span data-edit={`flavors.menuName3.${i}`} data-edit-max="60" className={s.menuName}>{name}</span>
                    <span data-edit={`flavors.menuPrice.${i}`} data-edit-max="60" className={s.menuPrice}>{price}</span>
                    <span data-edit={`flavors.menuNote3.${i}`} data-edit-max="60" className={s.menuNote}>{note}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="flavors.menuAside" data-edit-max="240" data-edit-multiline className={s.menuAside}>Fresh flowers, gold leaf and hand-piped names are quoted with the sketch.</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4,5,1" className={s.ribbon} aria-hidden="true">
          <TabbiedPattern
            pattern={spandrel}
            palette={RIBBON}
            fit="grid"
            cellSize={46}
            seed="spun-sugar-ribbon"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- TASTING
            A box of six, laid out the way it opens. */}
        <section id="tasting" className={s.sec} aria-labelledby="tasting-h">
          <div className={s.tastingGrid}>
            <div className={s.tastingText}>
              <p data-edit="tasting.step" data-edit-max="240" data-edit-multiline className={s.step}>Not sure yet?</p>
              <h2 data-edit="tasting.secTitle" data-edit-max="60" id="tasting-h" className={s.secTitle}>Tasting boxes</h2>
              <p data-edit="tasting.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Six squares of cake, each with its filling and a swipe of
                buttercream, in a box that fits on the passenger seat. Enough for
                two people to argue over.
              </p>
              <p data-edit="tasting.tastingPrice" data-edit-max="240" data-edit-multiline className={s.tastingPrice}>$38</p>
              <p data-edit="tasting.tastingTerms" data-edit-max="240" data-edit-multiline className={s.tastingTerms}>Collected Thursday to Saturday. The $38 comes off any order over $300.</p>
              <a data-edit="tasting.button" data-edit-max="28" className={s.button} href="#order">Order a tasting box</a>
            </div>
            <div className={s.box}>
              <div data-edit-pattern="tasting.field" data-edit-roles="transparent,5,3,4,2,0" className={s.boxLid} aria-hidden="true">
                <TabbiedPattern
                  pattern={spandrel}
                  palette={BOX}
                  fit="grid"
                  cellSize={30}
                  seed="spun-sugar-box"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ul className={s.squares}>
                {TASTING.map(([name, with_, tone], i) => (
                  <li key={name} className={`${s.square} ${s[tone]}`}>
                    <span data-edit={`tasting.squareName.${i}`} data-edit-max="60" className={s.squareName}>{name}</span>
                    <span data-edit={`tasting.squareWith.${i}`} data-edit-max="60" className={s.squareWith}>{with_}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ LEAD TIMES */}
        <section id="lead-times" className={s.sec} aria-labelledby="lead-h">
          <div className={s.secHead}>
            <p data-edit="leadTimes.step" data-edit-max="240" data-edit-multiline className={s.step}>Step 3</p>
            <h2 data-edit="leadTimes.secTitle" data-edit-max="60" id="lead-h" className={s.secTitle}>Pick a date, with notice</h2>
            <p data-edit="leadTimes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One oven, one baker, about twelve cakes a week. A 30% deposit
              holds your date; the rest is due a week before.
            </p>
          </div>
          <p className={s.scale}>
            <span data-edit="leadTimes.text" data-edit-max="60">Order today</span>
            <span data-edit="leadTimes.text2" data-edit-max="60">4 weeks</span>
            <span data-edit="leadTimes.text3" data-edit-max="60">8 weeks</span>
            <span data-edit="leadTimes.text4" data-edit-max="60">12 weeks</span>
          </p>
          <ol className={s.leads}>
            {LEADS.map(([what, when, width], i) => (
              <li key={what} className={s.lead}>
                <span data-edit={`leadTimes.leadWhat.${i}`} data-edit-max="60" className={s.leadWhat}>{what}</span>
                <span className={s.leadTrack}>
                  <span className={`${s.leadBar} ${s[width]}`} />
                </span>
                <span data-edit={`leadTimes.leadWhen.${i}`} data-edit-max="60" className={s.leadWhen}>{when}</span>
              </li>
            ))}
          </ol>
          <p data-edit="leadTimes.leadNote" data-edit-max="240" data-edit-multiline className={s.leadNote}>Sooner than that? Rush orders of 4 days are sometimes possible, for $40 more. Ask.</p>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.sec} aria-labelledby="order-h">
          <div className={s.orderGrid}>
            <div className={s.orderInfo}>
              <p data-edit="order.step" data-edit-max="240" data-edit-multiline className={s.step}>Step 4</p>
              <h2 data-edit="order.secTitle" data-edit-max="60" id="order-h" className={s.secTitle}>Send your order</h2>
              <p data-edit="order.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                This is a request, not a booking. Mara replies within two days
                with a sketch, a price and the dates still open.
              </p>
              <p data-edit="order.address" data-edit-max="240" data-edit-multiline className={s.address}>7 Larkspur Row, Millhaven</p>
              <p data-edit="order.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>The pink door between the florist and the bookbinder.</p>
              <p className={s.contactLine}>
                <a data-edit="order.link" data-edit-max="28" href="tel:+15550177100">(555) 017-7100</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="order.link2" data-edit-max="28" href="mailto:mara@spunsugar.example">mara@spunsugar.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([label, value], i) => (
                  <div key={label}>
                    <dt data-edit={`order.term.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`order.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="order.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Cake order request</p>
              <div className={s.field}>
                <label data-edit="order.label" htmlFor="sp-name">Your name</label>
                <input id="sp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label2" htmlFor="sp-email">Email</label>
                <input id="sp-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label3" htmlFor="sp-date">Date of the party</label>
                <input id="sp-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label4" htmlFor="sp-size">Size</label>
                <select id="sp-size" name="size" defaultValue="party">
                  <option value="little">Little cake, 8-10</option>
                  <option value="party">Party cake, 16-20</option>
                  <option value="tall">Tall party cake, 24-30</option>
                  <option value="two">Two tiers, 30-40</option>
                  <option value="three">Three tiers, 60-75</option>
                  <option value="four">Four tiers, 110-130</option>
                  <option value="tasting">Just a tasting box</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="order.label5" htmlFor="sp-sponge">Sponge</label>
                <select id="sp-sponge" name="sponge" defaultValue="vanilla">
                  <option value="vanilla">Vanilla bean</option>
                  <option value="chocolate">Dark chocolate</option>
                  <option value="lemon">Lemon and poppy seed</option>
                  <option value="pistachio">Pistachio and rose</option>
                  <option value="banana">Brown butter banana</option>
                  <option value="carrot">Carrot and walnut</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="order.label6" htmlFor="sp-filling">Filling</label>
                <select id="sp-filling" name="filling" defaultValue="raspberry">
                  <option value="raspberry">Raspberry jam</option>
                  <option value="caramel">Salted caramel</option>
                  <option value="lemon">Lemon curd</option>
                  <option value="passion">Passion fruit curd</option>
                  <option value="ganache">Chocolate ganache</option>
                  <option value="cheese">Cream cheese</option>
                </select>
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="order.legend">Pickup or delivery</legend>
                <div className={s.choices}>
                  <input id="sp-pickup" type="radio" name="handover" value="pickup" defaultChecked />
                  <label data-edit="order.label7" htmlFor="sp-pickup">I will collect it</label>
                  <input id="sp-deliver" type="radio" name="handover" value="delivery" />
                  <label data-edit="order.label8" htmlFor="sp-deliver">Please deliver</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="order.label9" htmlFor="sp-idea">The idea, colors, a name to pipe</label>
                <textarea id="sp-idea" name="idea" rows={4} />
              </div>
              <button data-edit="order.submit" data-edit-max="24" className={s.submit} type="submit">Send my request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Spun Sugar Cakes</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional cake studio. The baker, cakes, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
