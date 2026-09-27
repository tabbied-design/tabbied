import { TabbiedPattern } from 'tabbied/react';
import { notchblock, housing, cornernotch, chip, mutule } from 'tabbied/patterns';
import s from './old-kiln-reclamation.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Old Kiln Reclamation: Architectural salvage yard, Hatherden',
  description:
    'An architectural salvage yard in the old kiln works on Brickfield Road, Hatherden: reclaimed bricks, flooring, doors, fireplaces, baths and garden stone, with stripping, restoration and delivery. We buy salvage too.',
};

/* Site colors: the concrete of the yard floor, a marker's ink, kiln brick,
   rust off an old radiator and the verdigris on a copper cistern. */
const CONCRETE = '#e6e2da';
const INK = '#1e1c1a';
const BRICK = '#b24e35';
const RUST = '#7a4a2a';
const VERDIGRIS = '#5e9c8c';

/* The yard wall: big blocks with a corner knocked out. */
const WALL = ['transparent', BRICK, RUST, INK, VERDIGRIS, BRICK];
/* Reclaimed bricks stacked on a pallet, frogs showing. */
const PALLET = [INK, BRICK, RUST, CONCRETE, BRICK];
/* Chalk scratches on the buying board. */
const CHALK = ['transparent', CONCRETE];
/* Chipped enamel and stripped paint, for the workshop. */
const CHIPS = [CONCRETE, VERDIGRIS, RUST, BRICK, INK];
/* Corbels and blocks for the visit panel. */
const CORBELS = [RUST, CONCRETE, BRICK, VERDIGRIS, INK];
/* The wall again, along the foot of the page. */
const FOOT = [INK, BRICK, RUST, CONCRETE, VERDIGRIS];

const NAV = [
  ['New in', '#new'],
  ['What we stock', '#stock'],
  ['We buy', '#buy'],
  ['Restoration', '#restore'],
  ['Delivery', '#delivery'],
  ['Visit', '#visit'],
  ['Contact', '#contact'],
];

type Entry = {
  lot: string;
  date: string;
  item: string;
  from: string;
  size: string;
  price: string;
  sold?: boolean;
};

const LEDGER: Entry[] = [
  { lot: '318', date: '22 Sep', item: 'Pine door, four panel, brass knob', from: 'Rectory, Upper Hatherden', size: '1980 x 760 mm', price: '$240' },
  { lot: '319', date: '22 Sep', item: 'Roll-top bath on claw feet', from: 'Hotel refit, Kingsmere', size: '1680 mm long', price: '$690' },
  { lot: '320', date: '23 Sep', item: 'Cast iron column radiator, 9 section', from: 'Board school, Mill Lane', size: '640 mm high', price: '$310' },
  { lot: '321', date: '23 Sep', item: 'Terracotta chimney pot, crown top', from: 'Villa roof, Ashgrove', size: '1050 mm tall', price: '$95' },
  { lot: '322', date: '24 Sep', item: 'Imperial red bricks, cleaned, 2,400', from: 'Chapel wall, Brickfield Road', size: '9 x 4 3/8 x 3 in', price: '$1.40 each' },
  { lot: '323', date: '24 Sep', item: 'Oak parquet, herringbone blocks', from: 'Library, Castle Street', size: '38 sq m', price: '$62 sq m' },
  { lot: '324', date: '25 Sep', item: 'Victorian tiled hearth and grate', from: 'Terrace, Kiln Row', size: '915 mm wide', price: '$420', sold: true },
  { lot: '325', date: '26 Sep', item: 'York stone flags, riven', from: 'Farmyard, Hatherden Moor', size: '22 sq m', price: '$95 sq m' },
];

type Stock = {
  name: string;
  what: string;
  range: string;
  unit: string;
  lot: string;
};

const STOCK: Stock[] = [
  { name: 'Bricks', what: 'Imperial reds, London stocks, Flettons, blue engineering and paviors', range: '$0.60-$2.40', unit: 'each', lot: 'Section A' },
  { name: 'Flooring', what: 'Pine boards, oak parquet, quarry tiles and Victorian encaustics', range: '$38-$95', unit: 'per sq m', lot: 'Section B' },
  { name: 'Doors', what: 'Four-panel pine, ledged and braced, glazed, and the odd church door', range: '$45-$650', unit: 'each', lot: 'Section C' },
  { name: 'Fireplaces', what: 'Cast iron inserts, marble and slate surrounds, range cookers', range: '$120-$2,800', unit: 'each', lot: 'Section D' },
  { name: 'Bathrooms', what: 'Roll-top baths, Belfast sinks, high cisterns and brass taps', range: '$60-$1,450', unit: 'each', lot: 'Section E' },
  { name: 'Garden stone', what: 'York stone flags, granite setts, troughs and staddle stones', range: '$25-$180', unit: 'per piece or sq m', lot: 'Section F' },
];

const WE_PAY = [
  ['Imperial bricks', '25c each cleaned, 15c as they come'],
  ['Pine doors', '$20-$60, more with the furniture on'],
  ['Roll-top baths', '$60-$200, chips and all'],
  ['York stone', '$30 a square metre, lifted'],
];

const VALUE_STEPS = [
  ['Send photos', 'Of the whole thing and the worst corner of it, with rough sizes. A phone photo is fine.'],
  ['We give a range', 'Within two days: what it sells for here, and what we can pay for it.'],
  ['We come and look', 'For a clearance or anything heavy. A price on the day, paid on collection.'],
  ['We take it away', 'Our crew lifts, stacks and sweeps up. We carry our own insurance.'],
];

type Service = {
  n: string;
  name: string;
  body: string;
  price: string;
  time: string;
};

const SERVICES: Service[] = [
  { n: '01', name: 'Doors dipped', body: 'Stripped of every coat in our caustic tank, neutralised, rinsed and left to dry slowly so the joints do not open.', price: '$45 a door', time: 'Ten days' },
  { n: '02', name: 'Baths re-enamelled', body: 'Cast iron baths blasted inside, re-enamelled in white or your color, feet painted or polished.', price: '$480', time: 'Three weeks' },
  { n: '03', name: 'Radiators blasted', body: 'Shot-blasted, pressure-tested to 10 bar, painted in any color from the card, with new valves if you want them.', price: '$28 a section', time: 'Two weeks' },
  { n: '04', name: 'Fireplaces restored', body: 'Rust taken back, cracks welded, grate blacked with stove polish and the tiles cleaned or replaced.', price: 'From $90', time: 'Two weeks' },
];

type Zone = { where: string; price: string };

const DELIVERY: Zone[] = [
  { where: 'Hatherden and within 10 miles', price: '$30' },
  { where: '10-30 miles', price: '$55' },
  { where: '30-60 miles', price: '$90' },
  { where: 'Anywhere further, by pallet carrier', price: 'From $75 a pallet' },
];

const HOURS = [
  ['Tuesday to Friday', '09:00-17:00'],
  ['Saturday', '09:00-16:00'],
  ['Sunday', '10:00-14:00'],
  ['Monday', 'Closed, we are out collecting'],
];

export default function OldKilnReclamationPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--concrete': '#e6e2da',
        '--ink': '#1e1c1a',
        '--brick': '#b24e35',
        '--rust': '#7a4a2a',
        '--verdigris': '#5e9c8c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="concrete,ink,brick,rust,verdigris"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Encode+Sans+Condensed:wght@400;500;600;700&family=Shadows+Into+Light+Two&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markKiln} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Old Kiln Reclamation</span>
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
            This week's arrivals propped against the yard wall, each with its
            manila tag tied on. */}
        <section className={s.hero} aria-labelledby="ok-hero-h">
          <div className={s.heroText}>
            <p data-edit="okHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Architectural salvage, Hatherden</p>
            <h1 data-edit="okHero.name" data-edit-max="70" id="ok-hero-h" className={s.name}>Old Kiln Reclamation</h1>
            <p data-edit="okHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Three acres of doors, baths, bricks and fireplaces in the old
              kiln works on Brickfield Road. Everything here came out of a
              building, and most of it will go back into one.
            </p>
            <div className={s.heroActions}>
              <a data-edit="okHero.btn" data-edit-max="28" className={s.btn} href="#visit">Visit the yard</a>
              <a data-edit="okHero.btnLine" data-edit-max="28" className={s.btnLine} href="#buy">Sell us salvage</a>
            </div>
            <p className={s.heroNote}>
              <span data-edit="okHero.heroNoteText" data-edit-max="60" className={s.heroNoteText}>New in this week</span>
              <svg className={s.arrow} viewBox="0 0 160 70" aria-hidden="true">
                <path d="M4 52 C 40 62, 88 60, 122 30" />
                <path d="M106 26 L 124 28 L 120 46" />
              </svg>
            </p>
          </div>

          <div className={s.yard}>
            <div data-edit-pattern="okHero.field" data-edit-roles="transparent,2,3,1,4,2" className={s.wall} aria-hidden="true">
              <TabbiedPattern
                pattern={notchblock}
                palette={WALL}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={58}
                seed="old-kiln-wall"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.floor} aria-hidden="true" />

            <div className={`${s.item} ${s.itemDoor}`}>
              <Artwork
                slug="old-kiln-reclamation-door"
                alt="A four-panel pine door with a brass knob, standing up against the wall"
                mode="tint"
                inks={['var(--text)', 'var(--concrete)']}
                className={s.art}
              />
              <div className={`${s.hang} ${s.hangDoor}`}>
                <span className={s.string} aria-hidden="true" />
                <div className={s.mTag}>
                  <p data-edit="okHero.mLot" data-edit-max="240" data-edit-multiline className={s.mLot}>Lot 318</p>
                  <p data-edit="okHero.mPrice" data-edit-max="240" data-edit-multiline className={s.mPrice}>$240</p>
                  <p data-edit="okHero.mWhat" data-edit-max="240" data-edit-multiline className={s.mWhat}>Pine, 4 panel</p>
                </div>
              </div>
            </div>

            <div className={`${s.item} ${s.itemPot}`}>
              <Artwork
                slug="old-kiln-reclamation-chimneypot"
                alt="A tall terracotta chimney pot with a crown top"
                mode="tint"
                inks={['var(--text)', 'var(--brick)']}
                className={s.art}
              />
              <div className={`${s.hang} ${s.hangPot}`}>
                <span className={s.string} aria-hidden="true" />
                <div className={s.mTag}>
                  <p data-edit="okHero.mLot2" data-edit-max="240" data-edit-multiline className={s.mLot}>Lot 321</p>
                  <p data-edit="okHero.mPrice2" data-edit-max="240" data-edit-multiline className={s.mPrice}>$95</p>
                  <p data-edit="okHero.mWhat2" data-edit-max="240" data-edit-multiline className={s.mWhat}>Crown pot</p>
                </div>
              </div>
            </div>

            <div className={`${s.item} ${s.itemRad}`}>
              <Artwork
                slug="old-kiln-reclamation-radiator"
                alt="A cast iron column radiator with nine sections"
                mode="tint"
                inks={['var(--text)', 'var(--rust)']}
                className={s.art}
              />
              <div className={`${s.hang} ${s.hangRad}`}>
                <span className={s.string} aria-hidden="true" />
                <div className={s.mTag}>
                  <p data-edit="okHero.mLot3" data-edit-max="240" data-edit-multiline className={s.mLot}>Lot 320</p>
                  <p data-edit="okHero.mPrice3" data-edit-max="240" data-edit-multiline className={s.mPrice}>$310</p>
                  <p data-edit="okHero.mWhat3" data-edit-max="240" data-edit-multiline className={s.mWhat}>9 section</p>
                </div>
              </div>
            </div>

            <div className={`${s.item} ${s.itemBath}`}>
              <Artwork
                slug="old-kiln-reclamation-bath"
                alt="A cast iron roll-top bath on claw feet"
                mode="tint"
                inks={['var(--text)', 'var(--verdigris)']}
                className={s.art}
              />
              <div className={`${s.hang} ${s.hangBath}`}>
                <span className={s.string} aria-hidden="true" />
                <div className={s.mTag}>
                  <p data-edit="okHero.mLot4" data-edit-max="240" data-edit-multiline className={s.mLot}>Lot 319</p>
                  <p data-edit="okHero.mPrice4" data-edit-max="240" data-edit-multiline className={s.mPrice}>$690</p>
                  <p data-edit="okHero.mWhat4" data-edit-max="240" data-edit-multiline className={s.mWhat}>Roll-top</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- NEW
            The yard book: what came in this week, in the order it came. */}
        <section id="new" className={s.sec} aria-labelledby="ok-new-h">
          <div className={s.secHead}>
            <p data-edit="new.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>01</p>
            <h2 data-edit="new.secTitle" data-edit-max="60" id="ok-new-h" className={s.secTitle}>New in the yard</h2>
            <p data-edit="new.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Straight out of the yard book. The four in the picture above are
              lots 318 to 321; ring to hold anything for 48 hours.
            </p>
          </div>
          <div className={s.ledger}>
            <p className={s.ledgerHead}>
              <span data-edit="new.text" data-edit-max="60">Yard book</span>
              <span data-edit="new.ledgerHand" data-edit-max="60" className={s.ledgerHand}>Week of 22 September</span>
            </p>
            <div className={s.bookWrap}>
              <table className={s.book}>
                <caption data-edit="new.srOnly" className={s.srOnly}>New arrivals this week: lot, date in, item, where it came from, size and price</caption>
                <thead>
                  <tr>
                    <th data-edit="new.colLot" scope="col" className={s.colLot}>Lot</th>
                    <th data-edit="new.colDate" scope="col" className={s.colDate}>In</th>
                    <th data-edit="new.heading" scope="col">Item</th>
                    <th data-edit="new.colFrom" scope="col" className={s.colFrom}>Came from</th>
                    <th data-edit="new.colSize" scope="col" className={s.colSize}>Size</th>
                    <th data-edit="new.colPrice" scope="col" className={s.colPrice}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {LEDGER.map((e, i) => (
                    <tr key={e.lot} className={e.sold ? s.sold : undefined}>
                      <th data-edit={`new.colLot2.${i}`} scope="row" className={s.colLot}>{e.lot}</th>
                      <td data-edit={`new.colDate2.${i}`} className={s.colDate}>{e.date}</td>
                      <td data-edit={`new.colItem.${i}`} className={s.colItem}>{e.item}</td>
                      <td data-edit={`new.colFrom2.${i}`} className={s.colFrom}>{e.from}</td>
                      <td data-edit={`new.colSize2.${i}`} className={s.colSize}>{e.size}</td>
                      <td className={s.colPrice}>{e.sold ? 'Sold' : e.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- STOCK
            Six tags on two strings: the yard, section by section. */}
        <section id="stock" className={s.sec} aria-labelledby="ok-stock-h">
          <div className={s.secHead}>
            <p data-edit="stock.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>02</p>
            <h2 data-edit="stock.secTitle" data-edit-max="60" id="ok-stock-h" className={s.secTitle}>What we stock</h2>
            <p data-edit="stock.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The yard is laid out in six sections, lettered on the gateposts.
              Prices run from a single brick to a whole marble fireplace.
            </p>
          </div>
          <ul className={s.rail}>
            {STOCK.map((st, i) => (
              <li key={st.name} className={s.railItem}>
                <div className={s.swing}>
                  <span className={s.string} aria-hidden="true" />
                  <div className={`${s.mTag} ${s.bigTag}`}>
                    <p data-edit={`stock.mLot.${i}`} data-edit-max="240" data-edit-multiline className={s.mLot}>{st.lot}</p>
                    <h3 data-edit={`stock.bigName.${i}`} data-edit-max="40" className={s.bigName}>{st.name}</h3>
                    <p data-edit={`stock.bigWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.bigWhat}>{st.what}</p>
                    <p data-edit={`stock.bigRange.${i}`} data-edit-max="240" data-edit-multiline className={s.bigRange}>{st.range}</p>
                    <p data-edit={`stock.bigUnit.${i}`} data-edit-max="240" data-edit-multiline className={s.bigUnit}>{st.unit}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div data-edit-pattern="stock.field" data-edit-roles="1,2,3,0,2" className={s.pallet} aria-hidden="true">
            <TabbiedPattern
              pattern={housing}
              palette={PALLET}
              fit="grid"
              cellSize={28}
              seed="old-kiln-pallet"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------------- BUY
            The chalkboard by the gate. */}
        <section id="buy" className={s.buy} aria-labelledby="ok-buy-h">
          <div data-edit-pattern="buy.field" data-edit-roles="transparent,0" className={s.chalk} aria-hidden="true">
            <TabbiedPattern
              pattern={cornernotch}
              palette={CHALK}
              fit="grid"
              cellSize={46}
              seed="old-kiln-chalk"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.buyInner}>
            <div className={s.buyHead}>
              <p data-edit="buy.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>03</p>
              <h2 data-edit="buy.buyTitle" data-edit-max="60" id="ok-buy-h" className={s.buyTitle}>We buy salvage</h2>
              <p data-edit="buy.buyLede" data-edit-max="240" data-edit-multiline className={s.buyLede}>
                House clearances, strip-outs, demolition lots and single
                pieces. If it came out of an old building and it is sound, we
                will make you an offer.
              </p>
              <dl className={s.pays}>
                {WE_PAY.map(([what, pay], i) => (
                  <div key={what}>
                    <dt data-edit={`buy.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`buy.body.${i}`} data-edit-max="200" data-edit-multiline>{pay}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.value}>
              <h3 data-edit="buy.valueTitle" data-edit-max="40" className={s.valueTitle}>How we value it</h3>
              <ol className={s.valueSteps}>
                {VALUE_STEPS.map(([name, body], i) => (
                  <li key={name}>
                    <p data-edit={`buy.valueName.${i}`} data-edit-max="240" data-edit-multiline className={s.valueName}>{name}</p>
                    <p data-edit={`buy.valueBody.${i}`} data-edit-max="240" data-edit-multiline className={s.valueBody}>{body}</p>
                    {i < VALUE_STEPS.length - 1 ? (
                      <svg className={s.chalkArrow} viewBox="0 0 60 40" aria-hidden="true">
                        <path d="M6 6 C 14 22, 30 30, 50 30" />
                        <path d="M40 22 L 51 30 L 40 37" />
                      </svg>
                    ) : null}
                  </li>
                ))}
              </ol>
              <p data-edit="buy.valueNote" data-edit-max="240" data-edit-multiline className={s.valueNote}>
                What decides the price: the condition, how many there are,
                how much people want them this year, and how hard they are to
                get out.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- RESTORE */}
        <section id="restore" className={s.sec} aria-labelledby="ok-restore-h">
          <div className={s.restoreGrid}>
            <div className={s.restoreSide}>
              <div className={s.secHead}>
                <p data-edit="restore.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>04</p>
                <h2 data-edit="restore.secTitle" data-edit-max="60" id="ok-restore-h" className={s.secTitle}>Stripping and restoration</h2>
                <p data-edit="restore.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  The workshop behind the kiln chimney does our own stock and
                  yours. Bring it in, or we collect with a delivery.
                </p>
              </div>
              <div data-edit-pattern="restore.field" data-edit-roles="0,4,3,2,1" className={s.chips} aria-hidden="true">
                <TabbiedPattern
                  pattern={chip}
                  palette={CHIPS}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={40}
                  seed="old-kiln-chips"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ul className={s.services}>
              {SERVICES.map((sv, i) => (
                <li key={sv.name} className={s.service}>
                  <p data-edit={`restore.serviceNum.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceNum}>{sv.n}</p>
                  <div className={s.serviceText}>
                    <h3 data-edit={`restore.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                    <p data-edit={`restore.serviceBody.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceBody}>{sv.body}</p>
                  </div>
                  <div className={s.servicePrice}>
                    <p data-edit={`restore.servicePriceNum.${i}`} data-edit-max="240" data-edit-multiline className={s.servicePriceNum}>{sv.price}</p>
                    <p data-edit={`restore.serviceTime.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceTime}>{sv.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- DELIVERY */}
        <section id="delivery" className={s.sec} aria-labelledby="ok-del-h">
          <div className={s.delGrid}>
            <div className={s.secHead}>
              <p data-edit="delivery.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>05</p>
              <h2 data-edit="delivery.secTitle" data-edit-max="60" id="ok-del-h" className={s.secTitle}>Delivery</h2>
              <p data-edit="delivery.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                A flatbed with a tail lift and two of us to carry. We take
                baths upstairs for $40 a flight, and we put pallets of bricks
                exactly where you point.
              </p>
            </div>
            <div className={s.delSide}>
              <dl className={s.delList}>
                {DELIVERY.map((d, i) => (
                  <div key={d.where}>
                    <dt data-edit={`delivery.term.${i}`} data-edit-max="28">{d.where}</dt>
                    <dd data-edit={`delivery.body.${i}`} data-edit-max="200" data-edit-multiline>{d.price}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="delivery.delNote" data-edit-max="240" data-edit-multiline className={s.delNote}>
                The lorry goes out on Wednesdays and Fridays. Collecting it
                yourself is free, and we load it with the forklift.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="ok-visit-h">
          <div className={s.visitGrid}>
            <div className={s.visitPanel}>
              <div data-edit-pattern="visit.field" data-edit-roles="3,0,2,4,1" className={s.corbels} aria-hidden="true">
                <TabbiedPattern
                  pattern={mutule}
                  palette={CORBELS}
                  fit="grid"
                  cellSize={36}
                  seed="old-kiln-corbels"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.sign}>
                <p data-edit="visit.signSmall" data-edit-max="240" data-edit-multiline className={s.signSmall}>The yard is open</p>
                <dl className={s.hours}>
                  {HOURS.map(([day, time], i) => (
                    <div key={day}>
                      <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                      <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className={s.visitText}>
              <p data-edit="visit.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>06</p>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="ok-visit-h" className={s.secTitle}>Visit the yard</h2>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>The Old Kiln works, Brickfield Road, Hatherden</p>
              <p data-edit="visit.visitBody" data-edit-max="240" data-edit-multiline className={s.visitBody}>
                From the town centre follow Brickfield Road past the canal
                bridge; the kiln chimney is the one with our name down it.
                Park inside the gate. The number 22 bus stops at Kiln Corner,
                five minutes away.
              </p>
              <p data-edit="visit.boots" data-edit-max="240" data-edit-multiline className={s.boots}>Boots advised. The yard is gravel, puddles and the odd nail.</p>
              <ul className={s.visitList}>
                <li data-edit="visit.item" data-edit-max="80">Trolleys and a forklift to your car</li>
                <li data-edit="visit.item2" data-edit-max="80">Tea in the kiln office, cake on Saturdays</li>
                <li data-edit="visit.item3" data-edit-max="80">Dogs on leads are welcome</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={`${s.sec} ${s.contactSec}`} aria-labelledby="ok-contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactText}>
              <p data-edit="contact.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>07</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="ok-contact-h" className={s.secTitle}>Contact</h2>
              <p data-edit="contact.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Looking for something, or selling something? Tell us the size
                and send a photo if you can. We answer the same day.
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550139907">(555) 013-9907</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:yard@oldkiln.example">yard@oldkiln.example</a>
              </p>
              <div className={s.holdTag}>
                <div className={s.swing}>
                  <span className={s.string} aria-hidden="true" />
                  <div className={s.mTag}>
                    <p data-edit="contact.mLot" data-edit-max="240" data-edit-multiline className={s.mLot}>On hold</p>
                    <p data-edit="contact.mPrice" data-edit-max="240" data-edit-multiline className={s.mPrice}>48 hrs</p>
                    <p data-edit="contact.mWhat" data-edit-max="240" data-edit-multiline className={s.mWhat}>free, just ring</p>
                  </div>
                </div>
              </div>
            </div>
            <form className={s.form} action="#">
              <fieldset className={s.choice}>
                <legend data-edit="contact.legend">I am</legend>
                <div className={s.radio}>
                  <input id="ok-buying" name="why" type="radio" value="buying" defaultChecked />
                  <label data-edit="contact.label" htmlFor="ok-buying">Looking for something</label>
                </div>
                <div className={s.radio}>
                  <input id="ok-selling" name="why" type="radio" value="selling" />
                  <label data-edit="contact.label2" htmlFor="ok-selling">Selling salvage</label>
                </div>
                <div className={s.radio}>
                  <input id="ok-restoring" name="why" type="radio" value="restoring" />
                  <label data-edit="contact.label3" htmlFor="ok-restoring">Asking about restoration</label>
                </div>
              </fieldset>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="contact.label4" htmlFor="ok-name">Name</label>
                  <input id="ok-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label5" htmlFor="ok-phone">Phone</label>
                  <input id="ok-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="contact.label6" htmlFor="ok-email">Email</label>
                  <input id="ok-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="contact.label7" htmlFor="ok-what">What, and roughly what size</label>
                  <textarea id="ok-what" name="what" rows={4} />
                </div>
              </div>
              <button data-edit="contact.btn" data-edit-max="24" className={s.btn} type="submit">Send to the yard</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,2,3,0,4" className={s.footWall} aria-hidden="true">
          <TabbiedPattern
            pattern={notchblock}
            palette={FOOT}
            fit="grid"
            cellSize={36}
            seed="old-kiln-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Old Kiln Reclamation</p>
          <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>The Old Kiln works, Brickfield Road, Hatherden</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional salvage yard; the lots, prices and people are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The door, bath, radiator and chimney pot are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
