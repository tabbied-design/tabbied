import { TabbiedPattern } from 'tabbied/react';
import { dogtooth, fustian, hurdle, isometry, speckfield, tulle } from 'tabbied/patterns';
import s from './brim-hat-shop.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Brim: Hat shop and hat repairs, Cordwainer Street',
  description:
    'Felt fedoras, straw sun hats and tweed caps, fitted and steamed to your head while you wait. Find your size, bring a tired hat in for repair, or book a fitting.',
};

/* Site colors. Each hat is its photograph's silhouette cut out of a Tabbied
   pattern in these colors, with the photograph's shading laid back over it. */
const INK = '#1D1B1A';
const TAN = '#7C5A3A';
const SLATE = '#3D6B7D';
const GRAY = '#928B82';
const PALE = '#E2DBD0';

const HOUNDSTOOTH = [PALE, INK];
const PAPER_STRAW = [PALE, TAN, GRAY];
const HERRINGBONE = [GRAY, INK, PALE];
const SLATE_FELT = [SLATE, INK, PALE];
const RAFFIA = [TAN, PALE, GRAY];
const DONEGAL = [TAN, PALE, INK];

const NAV = [
  ['The hats', '#hats'],
  ['Sizes', '#sizes'],
  ['Repairs', '#repairs'],
  ['Visit', '#visit'],
];

const SIZES = [
  ['XS', '6 3/4', '54', '21 1/4'],
  ['S', '6 7/8', '55', '21 5/8'],
  ['S', '7', '56', '22'],
  ['M', '7 1/8', '57', '22 3/8'],
  ['M', '7 1/4', '58', '22 3/4'],
  ['L', '7 3/8', '59', '23 1/8'],
  ['L', '7 1/2', '60', '23 1/2'],
  ['XL', '7 5/8', '61', '24'],
  ['XL', '7 3/4', '62', '24 3/8'],
];

const MEASURE = [
  { t: 'A soft tape, level', b: 'Round the widest part of the head: across the forehead a finger above the brows, just over the tops of the ears, round the back.' },
  { t: 'Snug, not tight', b: 'The tape should sit where the hat will, with one finger slipped under it. Measure twice, and wear your hair the way you usually do.' },
  { t: 'Between two sizes', b: 'Take the larger. A felt can be taken in with a sizing tape for nothing; a hat that pinches gives you a headache by lunch.' },
];

const REPAIRS = [
  ['Steam and reshape', 'While you wait', '$15'],
  ['Stretch, up to half a size', 'Next day', '$20'],
  ['Reblock a crushed crown', '5 days', '$60'],
  ['New leather sweatband', '5 days', '$35'],
  ['New ribbon or band', '3 days', '$25-40'],
  ['Clean a felt', '3 days', '$30'],
  ['Re-stiffen a straw', '5 days', '$28'],
  ['Sizing tape, taken in', 'While you wait', 'Free'],
];

const HOURS = [
  ['Tuesday-Friday', '10 am-6 pm'],
  ['Saturday', '10 am-5 pm'],
  ['Sunday and Monday', 'Closed'],
];

export default function BrimPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Brim</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#visit">Book a fitting</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            One fedora on one tall stand, cut out of houndstooth. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Hat shop and hat repairs, Cordwainer Street</p>
            <h1 className={s.title} id="hero-h">
              Hats, fitted <em>to your head.</em>
            </h1>
            <p className={s.lede}>
              Felt, straw and tweed, in every size from 6 3/4 to 7 3/4. We
              measure you, steam the hat to the shape of your head while you
              wait, and put it right again whenever it needs it.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#hats">See the stands</a>
              <a className={s.btnLine} href="#sizes">Find your size</a>
            </div>
          </div>
          <div className={s.heroStand}>
            <Artwork slug="brim-hat-shop-fedora" alt="A fedora in black and cream houndstooth" mode="fill" inks={[]} className={s.heroHat}>
              <TabbiedPattern
                pattern={dogtooth}
                palette={HOUNDSTOOTH}
                fit="grid"
                cellSize={24}
                seed="hero-carrow"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
            <span className={s.heroPole} aria-hidden="true" />
            <span className={s.heroFoot} aria-hidden="true" />
            <p className={s.heroTag}>
              <span>The Carrow, in houndstooth</span>
              <strong>$165</strong>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- STANDS
            The shop window: six hats on six stands of different heights. */}
        <section id="hats" className={s.hats} aria-labelledby="hats-h">
          <div className={s.secHead}>
            <p className={s.secKick}>On the stands this season</p>
            <h2 id="hats-h">Six hats in the window</h2>
            <p className={s.secNote}>
              Every style comes in every size, in stock. Try them on in the shop;
              we will steam the one you choose to fit before it goes in the box.
            </p>
          </div>
          <ul className={s.stands}>
            <li className={s.stand}>
              <div className={s.standHat}>
                <Artwork slug="brim-hat-shop-fedora" alt="The Carrow fedora, houndstooth" mode="fill" inks={[]} className={s.hatFedora}>
                  <TabbiedPattern pattern={dogtooth} palette={HOUNDSTOOTH} fit="grid" cellSize={24} seed="carrow" style={{ position: 'absolute', inset: 0 }} />
                </Artwork>
              </div>
              <span className={s.pole} aria-hidden="true" />
              <span className={s.foot} aria-hidden="true" />
              <div className={s.tag}>
                <h3>The Carrow</h3>
                <span className={s.tagStyle}>Fedora, houndstooth wool felt</span>
                <strong className={s.tagPrice}>$165</strong>
              </div>
            </li>
            <li className={s.stand}>
              <div className={s.standHat}>
                <Artwork slug="brim-hat-shop-straw" alt="The Wren sun hat, woven paper straw" mode="fill" inks={[]} className={s.hatStraw}>
                  <TabbiedPattern pattern={hurdle} palette={PAPER_STRAW} fit="grid" cellSize={24} seed="wren" style={{ position: 'absolute', inset: 0 }} />
                </Artwork>
              </div>
              <span className={s.pole} aria-hidden="true" />
              <span className={s.foot} aria-hidden="true" />
              <div className={s.tag}>
                <h3>The Wren</h3>
                <span className={s.tagStyle}>Sun hat, woven paper straw</span>
                <strong className={s.tagPrice}>$95</strong>
              </div>
            </li>
            <li className={s.stand}>
              <div className={s.standHat}>
                <Artwork slug="brim-hat-shop-cap" alt="The Holborn flat cap, herringbone tweed" mode="fill" inks={[]} className={s.hatCap}>
                  <TabbiedPattern pattern={isometry} palette={HERRINGBONE} fit="grid" cellSize={24} seed="holborn" style={{ position: 'absolute', inset: 0 }} />
                </Artwork>
              </div>
              <span className={s.pole} aria-hidden="true" />
              <span className={s.foot} aria-hidden="true" />
              <div className={s.tag}>
                <h3>The Holborn</h3>
                <span className={s.tagStyle}>Flat cap, herringbone tweed</span>
                <strong className={s.tagPrice}>$68</strong>
              </div>
            </li>
            <li className={s.stand}>
              <div className={s.standHat}>
                <Artwork slug="brim-hat-shop-fedora" alt="The Marlow fedora, slate fur felt" mode="fill" inks={[]} className={s.hatFedora}>
                  <TabbiedPattern pattern={tulle} palette={SLATE_FELT} fit="grid" cellSize={24} seed="marlow" style={{ position: 'absolute', inset: 0 }} />
                </Artwork>
              </div>
              <span className={s.pole} aria-hidden="true" />
              <span className={s.foot} aria-hidden="true" />
              <div className={s.tag}>
                <h3>The Marlow</h3>
                <span className={s.tagStyle}>Fedora, fur felt in slate</span>
                <strong className={s.tagPrice}>$210</strong>
              </div>
            </li>
            <li className={s.stand}>
              <div className={s.standHat}>
                <Artwork slug="brim-hat-shop-straw" alt="The Riviera wide brim, raffia" mode="fill" inks={[]} className={s.hatStraw}>
                  <TabbiedPattern pattern={fustian} palette={RAFFIA} fit="grid" cellSize={24} seed="riviera" style={{ position: 'absolute', inset: 0 }} />
                </Artwork>
              </div>
              <span className={s.pole} aria-hidden="true" />
              <span className={s.foot} aria-hidden="true" />
              <div className={s.tag}>
                <h3>The Riviera</h3>
                <span className={s.tagStyle}>Wide brim, crocheted raffia</span>
                <strong className={s.tagPrice}>$140</strong>
              </div>
            </li>
            <li className={s.stand}>
              <div className={s.standHat}>
                <Artwork slug="brim-hat-shop-cap" alt="The Donegal flat cap, flecked tweed" mode="fill" inks={[]} className={s.hatCap}>
                  <TabbiedPattern pattern={speckfield} palette={DONEGAL} fit="grid" cellSize={24} seed="donegal" style={{ position: 'absolute', inset: 0 }} />
                </Artwork>
              </div>
              <span className={s.pole} aria-hidden="true" />
              <span className={s.foot} aria-hidden="true" />
              <div className={s.tag}>
                <h3>The Donegal</h3>
                <span className={s.tagStyle}>Flat cap, flecked Donegal tweed</span>
                <strong className={s.tagPrice}>$72</strong>
              </div>
            </li>
          </ul>
          <p className={s.standsNote}>Every hat is lined, has a leather sweatband, and comes in a round box.</p>
        </section>

        {/* ----------------------------------------------------------- SIZES
            A tape measure across the top, then how to measure and the table. */}
        <section id="sizes" className={s.sizes} aria-labelledby="sizes-h">
          <div className={s.tape} aria-hidden="true" />
          <div className={s.sizesInner}>
            <div className={s.measure}>
              <p className={s.secKick}>Size guide</p>
              <h2 id="sizes-h">Measure once, at home</h2>
              <ol className={s.measureList}>
                {MEASURE.map((m) => (
                  <li key={m.t}>
                    <h3>{m.t}</h3>
                    <p>{m.b}</p>
                  </li>
                ))}
              </ol>
              <p className={s.measureNote}>No tape? Come in: measuring takes a minute and costs nothing.</p>
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <caption>Hat sizes, by the measure round the head</caption>
                <thead>
                  <tr>
                    <th scope="col">Letter</th>
                    <th scope="col">Hat size</th>
                    <th scope="col">cm</th>
                    <th scope="col">Inches</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map(([letter, us, cm, inch]) => (
                    <tr key={us}>
                      <td>{letter}</td>
                      <th scope="row">{us}</th>
                      <td>{cm}</td>
                      <td>{inch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- REPAIRS */}
        <section id="repairs" className={s.repairs} aria-labelledby="repairs-h">
          <div className={s.repairsArt}>
            <Artwork slug="brim-hat-shop-straw" alt="A wide-brimmed straw hat with a ribbon band" mode="fill" inks={[]} className={s.repairsHat}>
              <TabbiedPattern pattern={fustian} palette={RAFFIA} fit="grid" cellSize={28} seed="repairs-straw" style={{ position: 'absolute', inset: 0 }} />
            </Artwork>
            <p className={s.repairsCaption}>A straw that came in flat from a car seat. Five days and $28.</p>
          </div>
          <div className={s.repairsBody}>
            <p className={s.secKick}>Steaming, stretching and repairs</p>
            <h2 id="repairs-h">Bring in a tired hat</h2>
            <p className={s.secNote}>
              Ours or anyone else's. We look at it with you at the counter,
              tell you what it needs and what it will cost, and tag it with a
              date. Nothing is done without a yes.
            </p>
            <table className={s.priceTable}>
              <caption>Repairs and prices</caption>
              <thead>
                <tr>
                  <th scope="col">Work</th>
                  <th scope="col">Ready</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {REPAIRS.map(([work, ready, price]) => (
                  <tr key={work}>
                    <th scope="row">{work}</th>
                    <td>{ready}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitText}>
            <p className={s.secKick}>Visit and fittings</p>
            <h2 id="visit-h">Come in, or book half an hour</h2>
            <p className={s.visitAddr}>31 Cordwainer Street, by the covered market</p>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.visitContact}>
              <span>(555) 013-7812</span>
              <a href="mailto:shop@brimhats.example">shop@brimhats.example</a>
            </p>
            <Artwork slug="brim-hat-shop-cap" alt="" mode="fill" inks={[]} className={s.visitCap}>
              <TabbiedPattern pattern={isometry} palette={HERRINGBONE} fit="grid" cellSize={24} seed="visit-cap" style={{ position: 'absolute', inset: 0 }} />
            </Artwork>
          </div>
          <form className={s.form} action="#">
            <h3 className={s.formHead}>Book a fitting</h3>
            <p className={s.formLede}>Thirty minutes with a hatter, free, with no need to buy.</p>
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="br-name">Name</label>
                <input id="br-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="br-email">Email</label>
                <input id="br-email" name="email" type="email" autoComplete="email" />
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="br-date">Day</label>
                <input id="br-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="br-time">Time</label>
                <select id="br-time" name="time" defaultValue="11">
                  <option value="10">10 am</option>
                  <option value="11">11 am</option>
                  <option value="12">12 pm</option>
                  <option value="14">2 pm</option>
                  <option value="15">3 pm</option>
                  <option value="16">4 pm</option>
                </select>
              </div>
            </div>
            <fieldset className={s.kinds}>
              <legend>Looking for</legend>
              <label className={s.kind}>
                <input type="checkbox" name="kind" value="felt" />
                <span>Felt</span>
              </label>
              <label className={s.kind}>
                <input type="checkbox" name="kind" value="straw" />
                <span>Straw</span>
              </label>
              <label className={s.kind}>
                <input type="checkbox" name="kind" value="cap" />
                <span>Cap</span>
              </label>
              <label className={s.kind}>
                <input type="checkbox" name="kind" value="repair" />
                <span>A repair</span>
              </label>
            </fieldset>
            <button className={s.submit} type="submit">Request a fitting</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Brim</p>
          <p className={s.footTag}>Hats and hat repairs, 31 Cordwainer Street.</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional hat shop. Hats, prices and hours are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
