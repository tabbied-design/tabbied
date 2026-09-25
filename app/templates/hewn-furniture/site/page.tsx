import { TabbiedPattern } from 'tabbied/react';
import { randomrings, reeding } from 'tabbied/patterns';
import s from './hewn-furniture.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Hewn: Furniture store and workshop, the Mill District',
  description:
    'Hewn makes and sells a short catalog of chairs, lamps and sideboards from its workshop in the Mill District. Dimensions, materials, prices, delivery and showroom hours.',
};

/* Site colors, the same five as the stylesheet's root rule. The fields take
   `transparent` first, so the grain lines sit on the plate or the paper. */
const WALNUT = '#9A5B36';
const GRAY = '#8E857B';
const PALE = '#E4DBCF';
const PAPER = '#F3EFE8';

const GRAIN = ['transparent', WALNUT, GRAY, PALE];
const FLUTE = ['transparent', PALE, GRAY];
const HALO = ['transparent', WALNUT, GRAY];
const FORM_FLUTE = ['transparent', PAPER, GRAY];

const NAV = [
  ['Catalog', '#catalog'],
  ['Materials', '#materials'],
  ['Delivery', '#delivery'],
  ['Workshop', '#workshop'],
  ['Showroom', '#showroom'],
];

const CONTENTS = [
  ['01', 'Seating', '#seating', 'p. 04'],
  ['02', 'Lighting', '#lighting', 'p. 10'],
  ['03', 'Storage', '#storage', 'p. 16'],
  ['04', 'Materials', '#materials', 'p. 22'],
];

type Product = {
  no: string;
  name: string;
  variant: string;
  price: string;
  art: string;
  alt: string;
  /** Duotone inks: the shadow color, then the light. */
  inks: string[];
  dims: [string, string][];
  materials: [string, string][];
};

type Chapter = {
  id: string;
  no: string;
  title: string;
  intro: string;
  aside: string;
  products: Product[];
};

const CHAPTERS: Chapter[] = [
  {
    id: 'seating',
    no: '01',
    title: 'Seating',
    intro:
      'One lounge chair, made two ways. A molded shell in veneer, a cushion set that lifts out, and a five-star base that turns without a sound.',
    aside: 'A matching ottoman is $1,240 in either leather.',
    products: [
      {
        no: 'No. 101',
        name: 'Loll lounge chair',
        variant: 'Black aniline leather, walnut shell',
        price: '$3,480',
        art: 'hewn-furniture-chair',
        alt: 'A lounge chair in dark leather with a molded wooden shell on a swivel base',
        inks: ['var(--ink)', 'var(--paper)'],
        dims: [['W', '33'], ['D', '32'], ['H', '33'], ['Seat', '15']],
        materials: [
          ['Shell', 'Seven-ply walnut veneer'],
          ['Leather', 'Aniline, full grain'],
          ['Base', 'Cast aluminum, black'],
          ['Lead time', 'In stock'],
        ],
      },
      {
        no: 'No. 102',
        name: 'Loll lounge chair',
        variant: 'Cognac leather, white oak shell',
        price: '$3,480',
        art: 'hewn-furniture-chair',
        alt: 'The same lounge chair in a lighter, warmer leather',
        inks: ['var(--walnut)', 'var(--paper)'],
        dims: [['W', '33'], ['D', '32'], ['H', '33'], ['Seat', '15']],
        materials: [
          ['Shell', 'Seven-ply oak veneer'],
          ['Leather', 'Vegetable tanned'],
          ['Base', 'Cast aluminum, brushed'],
          ['Lead time', '6-8 weeks'],
        ],
      },
    ],
  },
  {
    id: 'lighting',
    no: '02',
    title: 'Lighting',
    intro:
      'A floor lamp tall enough to read under from the Loll, with a linen drum shade that throws the light down and a little out.',
    aside: 'Takes one E26 bulb up to 100 W equivalent. A 2700 K bulb is included.',
    products: [
      {
        no: 'No. 201',
        name: 'Stem floor lamp',
        variant: 'Blackened steel, natural linen shade',
        price: '$640',
        art: 'hewn-furniture-lamp',
        alt: 'A slender floor lamp with a round weighted base and a fabric drum shade',
        inks: ['var(--ink)', 'var(--paper)'],
        dims: [['Base', '11'], ['Shade', '16'], ['H', '64'], ['Cord', '96']],
        materials: [
          ['Stem', 'Steel, hand blackened'],
          ['Shade', 'Belgian linen'],
          ['Switch', 'Foot, on the cord'],
          ['Lead time', 'In stock'],
        ],
      },
      {
        no: 'No. 202',
        name: 'Stem floor lamp',
        variant: 'Oiled brass, oatmeal linen shade',
        price: '$720',
        art: 'hewn-furniture-lamp',
        alt: 'The same floor lamp in warm brass',
        inks: ['var(--walnut)', 'var(--paper)'],
        dims: [['Base', '11'], ['Shade', '16'], ['H', '64'], ['Cord', '96']],
        materials: [
          ['Stem', 'Solid brass, unlacquered'],
          ['Shade', 'Belgian linen'],
          ['Switch', 'Foot, on the cord'],
          ['Lead time', '3-4 weeks'],
        ],
      },
    ],
  },
  {
    id: 'storage',
    no: '03',
    title: 'Storage',
    intro:
      'A low sideboard on turned legs, with sliding doors that close on a felt stop and an adjustable shelf behind each one.',
    aside: 'Made to order at any length from 48 to 96 inches, in steps of 6.',
    products: [
      {
        no: 'No. 301',
        name: 'Low Line sideboard 64',
        variant: 'Walnut, two sliding doors',
        price: '$2,950',
        art: 'hewn-furniture-sideboard',
        alt: 'A low wooden sideboard with two sliding doors on four slim legs',
        inks: ['var(--ink)', 'var(--paper)'],
        dims: [['W', '64'], ['D', '18'], ['H', '30'], ['Shelf', '15']],
        materials: [
          ['Case', 'Solid black walnut'],
          ['Doors', 'Walnut, book-matched'],
          ['Finish', 'Hardwax oil'],
          ['Lead time', '8-10 weeks'],
        ],
      },
      {
        no: 'No. 302',
        name: 'Low Line sideboard 80',
        variant: 'Smoked oak, two sliding doors',
        price: '$3,400',
        art: 'hewn-furniture-sideboard',
        alt: 'The same sideboard, longer, in a darker smoked oak',
        inks: ['var(--walnut)', 'var(--pale)'],
        dims: [['W', '80'], ['D', '18'], ['H', '30'], ['Shelf', '15']],
        materials: [
          ['Case', 'Fumed white oak'],
          ['Doors', 'Oak, rift sawn'],
          ['Finish', 'Hardwax oil'],
          ['Lead time', '8-10 weeks'],
        ],
      },
    ],
  },
];

const MATERIALS = [
  {
    name: 'Black walnut',
    tone: 'walnut',
    body: 'Air dried for two years, then kilned. We oil it rather than lacquer it, so a scratch can be rubbed out at home with the tin we send.',
  },
  {
    name: 'White oak',
    tone: 'pale',
    body: 'Rift sawn for straight grain on doors and tops. Fumed with ammonia for the smoked finish, which colors the wood right through.',
  },
  {
    name: 'Leather',
    tone: 'ink',
    body: 'Full-grain hides from one tannery, dyed through and left uncoated. They mark at first and darken into a patina within a year.',
  },
  {
    name: 'Steel and brass',
    tone: 'gray',
    body: 'Lamp stems are blackened by hand in the workshop. Brass is left unlacquered and will go from bright to brown unless you polish it.',
  },
];

const DELIVERY = [
  ['Mill District and downtown', 'Free', 'Two people, carried in and assembled'],
  ['Up to 40 miles', '$95', 'Two people, carried in and assembled'],
  ['40 to 150 miles', '$240', 'Booked on one of our Thursday runs'],
  ['Further', 'By quote', 'Crated and sent by freight, curbside'],
];

const HOURS = [
  ['Tuesday to Friday', '11 am - 7 pm'],
  ['Saturday', '10 am - 6 pm'],
  ['Sunday', '12 - 5 pm'],
  ['Monday', 'Closed, workshop only'],
];

const FACTS = [
  ['2012', 'Workshop opened'],
  ['6', 'Makers on the floor'],
  ['10 yr', 'Frame guarantee'],
  ['1,900', 'Pieces delivered'],
];

export default function HewnFurniturePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f3efe8',
        '--ink': '#201a16',
        '--walnut': '#9a5b36',
        '--gray': '#8e857b',
        '--pale': '#e4dbcf',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,walnut,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Hewn</a>
        <span data-edit="bar.edition" data-edit-max="60" className={s.edition}>Catalog 14</span>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#showroom">Book a visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ COVER
            The catalog's cover: a contents list on the left, plate one on
            the right, the chair on a field of grain lines. */}
        <section className={s.cover} aria-labelledby="cover-h">
          <div className={s.coverText}>
            <p data-edit="cover.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Catalog 14, autumn and winter 2026</p>
            <h1 data-edit="cover.title" data-edit-format="emphasis" data-edit-max="70" className={s.coverTitle} id="cover-h">
              Furniture for
              <br />
              <em>a long time.</em>
            </h1>
            <p data-edit="cover.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Six pieces from our own workshop in the Mill District: a lounge
              chair, a floor lamp and a low sideboard, each made two ways.
              Delivered and assembled by the people who built them.
            </p>
            <div className={s.coverActions}>
              <a data-edit="cover.button" data-edit-max="28" className={s.button} href="#catalog">Browse the catalog</a>
              <a data-edit="cover.textLink" data-edit-max="28" className={s.textLink} href="#showroom">Ask for the printed copy</a>
            </div>
            <ol className={s.contents} aria-label="Contents">
              {CONTENTS.map(([no, label, href, pageNo], i) => (
                <li key={href}>
                  <span data-edit={`cover.contentsNo.${i}`} data-edit-max="60" className={s.contentsNo}>{no}</span>
                  <a data-edit={`cover.link.${i}`} data-edit-max="28" href={href}>{label}</a>
                  <span data-edit={`cover.contentsPage.${i}`} data-edit-max="60" className={s.contentsPage}>{pageNo}</span>
                </li>
              ))}
            </ol>
          </div>

          <figure className={s.plate}>
            <div data-edit-pattern="cover.field" data-edit-roles="transparent,2,3,4" className={s.plateField} aria-hidden="true">
              <TabbiedPattern
                pattern={randomrings}
                palette={GRAIN}
                fit="grid"
                cellSize={140}
                seed="hewn-cover"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span data-edit="cover.plateNo" data-edit-max="60" className={s.plateNo}>Plate 1</span>
            <Artwork
              slug="hewn-furniture-chair"
              alt="The Loll lounge chair in black leather and walnut"
              inks={['var(--ink)', 'var(--paper)']}
              className={s.coverChair}
            />
            <figcaption className={s.plateCaption}>
              <span data-edit="cover.plateItem" data-edit-max="60" className={s.plateItem}>No. 101, Loll lounge chair</span>
              <span data-edit="cover.platePrice" data-edit-max="60" className={s.platePrice}>From $3,480</span>
            </figcaption>
          </figure>
        </section>

        <ul className={s.promises} aria-label="What comes with every piece">
          <li>
            <strong data-edit="top.emphasis">Made here.</strong>
            <span data-edit="top.text" data-edit-max="60">Every piece is built in our workshop behind the showroom.</span>
          </li>
          <li>
            <strong data-edit="top.emphasis2">Carried in.</strong>
            <span data-edit="top.text2" data-edit-max="60">Free delivery and assembly in the Mill District and downtown.</span>
          </li>
          <li>
            <strong data-edit="top.emphasis3">Kept up.</strong>
            <span data-edit="top.text3" data-edit-max="60">A ten-year guarantee on every frame, joint and base.</span>
          </li>
        </ul>

        {/* ---------------------------------------------------------- CATALOG
            Three chapters, each an intro column and two product cards. The
            same photograph appears twice per chapter, once per colorway. */}
        <section id="catalog" className={s.catalog} aria-labelledby="catalog-h">
          <div className={s.secHead}>
            <span data-edit="catalog.secNo" data-edit-max="60" className={s.secNo}>The catalog</span>
            <h2 data-edit="catalog.title" data-edit-max="60" id="catalog-h">Six pieces, two ways each</h2>
            <p data-edit="catalog.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices include assembly within 40 miles. Dimensions are in
              inches: width, depth and height unless the table says otherwise.
            </p>
          </div>

          {CHAPTERS.map((c, i) => (
            <div key={c.id} id={c.id} className={s.chapter}>
              <div className={s.chapterIntro}>
                <span data-edit={`catalog.chapterNo.${i}`} data-edit-max="60" className={s.chapterNo}>{c.no}</span>
                <h3 data-edit={`catalog.title2.${i}`} data-edit-max="40">{c.title}</h3>
                <p data-edit={`catalog.chapterBody.${i}`} data-edit-max="240" data-edit-multiline className={s.chapterBody}>{c.intro}</p>
                <p data-edit={`catalog.chapterAside.${i}`} data-edit-max="240" data-edit-multiline className={s.chapterAside}>{c.aside}</p>
              </div>
              {c.products.map((p, i2) => (
                <article key={p.no} className={s.product}>
                  <div className={s.productPlate}>
                    <span data-edit={`product.productNo.${i}.${i2}`} data-edit-max="60" className={s.productNo}>{p.no}</span>
                    <Artwork slug={p.art} alt={p.alt} inks={p.inks} className={s.productPic} />
                  </div>
                  <div className={s.productHead}>
                    <h4 data-edit={`product.title.${i}.${i2}`} data-edit-max="36">{p.name}</h4>
                    <span data-edit={`product.productPrice.${i}.${i2}`} data-edit-max="60" className={s.productPrice}>{p.price}</span>
                  </div>
                  <p data-edit={`product.productVariant.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.productVariant}>{p.variant}</p>
                  <table className={s.dims}>
                    <caption data-edit={`product.caption.${i}.${i2}`}>Dimensions, in</caption>
                    <thead>
                      <tr>
                        {p.dims.map(([k], i3) => (
                          <th data-edit={`product.heading.${i}.${i2}.${i3}`} key={k} scope="col">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {p.dims.map(([k, v], i3) => (
                          <td data-edit={`product.cell.${i}.${i2}.${i3}`} key={k}>{v}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <dl className={s.specs}>
                    {p.materials.map(([k, v], i3) => (
                      <div key={k}>
                        <dt data-edit={`product.term.${i}.${i2}.${i3}`} data-edit-max="28">{k}</dt>
                        <dd data-edit={`product.body.${i}.${i2}.${i3}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          ))}
        </section>

        {/* ------------------------------------------------------------ BAND
            Fluted panels in the pale tone, the one texture between chapters
            and the materials. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={reeding}
            palette={FLUTE}
            options={{ frequency: 0.9 }}
            fit="grid"
            cellSize={44}
            seed="hewn-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- MATERIALS */}
        <section id="materials" className={s.materials} aria-labelledby="materials-h">
          <div className={s.materialsPic}>
            <Artwork
              slug="hewn-furniture-sideboard"
              alt="The Low Line sideboard in walnut, doors closed"
              inks={['var(--walnut)', 'var(--paper)']}
              className={s.materialsBoard}
            />
            <p data-edit="materials.materialsCaption" data-edit-max="240" data-edit-multiline className={s.materialsCaption}>Low Line 64 in black walnut, oiled.</p>
          </div>
          <div className={s.materialsText}>
            <span data-edit="materials.secNo" data-edit-max="60" className={s.secNo}>04 Materials</span>
            <h2 data-edit="materials.title" data-edit-max="60" id="materials-h">Four materials, and how they age</h2>
            <p data-edit="materials.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Samples of every wood and leather are in the showroom, and we
              will post you cut samples for free.
            </p>
            <ul className={s.materialList}>
              {MATERIALS.map((m, i) => (
                <li key={m.name} className={s.material}>
                  <span className={`${s.chip} ${s[`chip_${m.tone}`]}`} aria-hidden="true" />
                  <h3 data-edit={`materials.title2.${i}`} data-edit-max="40">{m.name}</h3>
                  <p data-edit={`materials.body.${i}`} data-edit-max="240" data-edit-multiline>{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- DELIVERY */}
        <section id="delivery" className={s.sec} aria-labelledby="delivery-h">
          <div className={s.secHead}>
            <span data-edit="delivery.secNo" data-edit-max="60" className={s.secNo}>05 Delivery</span>
            <h2 data-edit="delivery.title" data-edit-max="60" id="delivery-h">Delivery, returns and the guarantee</h2>
            <p data-edit="delivery.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Our own two vans, our own people. We call the day before with a
              two-hour window and take the packaging away with us.
            </p>
          </div>
          <div className={s.deliveryGrid}>
            <table className={s.zones}>
              <caption data-edit="delivery.caption">Delivery by distance from the showroom</caption>
              <thead>
                <tr>
                  <th data-edit="delivery.heading" scope="col">Where</th>
                  <th data-edit="delivery.heading2" scope="col">Cost</th>
                  <th data-edit="delivery.heading3" scope="col">How</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY.map(([where, cost, how], i) => (
                  <tr key={where}>
                    <th data-edit={`delivery.heading4.${i}`} scope="row">{where}</th>
                    <td data-edit={`delivery.zoneCost.${i}`} className={s.zoneCost}>{cost}</td>
                    <td data-edit={`delivery.cell.${i}`}>{how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className={s.terms}>
              <div>
                <dt data-edit="delivery.term" data-edit-max="28">Returns</dt>
                <dd data-edit="delivery.body" data-edit-max="200" data-edit-multiline>
                  Pieces marked in stock can come back within 30 days. We
                  collect them for the delivery price and refund the rest.
                </dd>
              </div>
              <div>
                <dt data-edit="delivery.term2" data-edit-max="28">Made to order</dt>
                <dd data-edit="delivery.body2" data-edit-max="200" data-edit-multiline>
                  A 30% deposit starts the work and the balance is due on
                  delivery. Made-to-order sizes cannot be returned.
                </dd>
              </div>
              <div>
                <dt data-edit="delivery.term3" data-edit-max="28">Guarantee</dt>
                <dd data-edit="delivery.body3" data-edit-max="200" data-edit-multiline>
                  Ten years on frames, joints and bases. Leather and fabric
                  wear is not covered, but we recover at cost.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- WORKSHOP
            The dark page of the catalog: the lamp lit in walnut and paper. */}
        <section id="workshop" className={s.workshop} aria-labelledby="workshop-h">
          <div className={s.workshopInner}>
            <div className={s.workshopLamp}>
              <div className={s.lampHalo} aria-hidden="true">
                <TabbiedPattern
                  pattern={randomrings}
                  palette={HALO}
                  fit="grid"
                  cellSize={120}
                  seed="hewn-halo"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="hewn-furniture-lamp"
                alt="The Stem floor lamp, standing in the workshop"
                inks={['var(--walnut)', 'var(--paper)']}
                className={s.lamp}
              />
            </div>
            <div className={s.workshopText}>
              <span data-edit="workshop.secNo" data-edit-max="60" className={s.secNo}>06 Workshop</span>
              <h2 data-edit="workshop.title" data-edit-max="60" id="workshop-h">Behind the showroom, a door, and the workshop</h2>
              <p data-edit="workshop.body" data-edit-max="240" data-edit-multiline>
                Hewn started in 2012 in one bay of the old rail shed on Tanner
                Street. There are six of us now, and the showroom is the front
                third of the building, so on a weekday you will hear the
                planer and smell the oil.
              </p>
              <p data-edit="workshop.body2" data-edit-max="240" data-edit-multiline>
                One maker follows a piece from the rough board to the van.
                Their initials are burned under the seat, inside the lamp base
                or on the back of the sideboard, and they are the person who
                answers if anything ever needs fixing.
              </p>
              <dl className={s.facts}>
                {FACTS.map(([v, k], i) => (
                  <div key={k}>
                    <dt data-edit={`workshop.term.${i}`} data-edit-max="28">{v}</dt>
                    <dd data-edit={`workshop.body3.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SHOWROOM */}
        <section id="showroom" className={s.sec} aria-labelledby="showroom-h">
          <div className={s.secHead}>
            <span data-edit="showroom.secNo" data-edit-max="60" className={s.secNo}>07 Showroom</span>
            <h2 data-edit="showroom.title" data-edit-max="60" id="showroom-h">Sit in everything before you buy it</h2>
            <p data-edit="showroom.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Walk in any time we are open. Book an hour if you want a maker
              to go through sizes, woods and leathers with you.
            </p>
          </div>
          <div className={s.visit}>
            <div className={s.visitInfo}>
              <h3 data-edit="showroom.visitHead" data-edit-max="40" className={s.visitHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`showroom.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`showroom.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <h3 data-edit="showroom.visitHead2" data-edit-max="40" className={s.visitHead}>Where</h3>
              <p data-edit="showroom.body" data-edit-max="240" data-edit-multiline className={s.address}>
                218 Tanner Street
                <br />
                The Mill District
              </p>
              <p data-edit="showroom.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>
                Free parking in the yard off Cooper Lane. The 12 bus stops at
                the corner.
              </p>
              <p className={s.contactLine}>
                <a data-edit="showroom.link" data-edit-max="28" href="tel:+15550148210">(555) 014-8210</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="showroom.link2" data-edit-max="28" href="mailto:showroom@hewn.example">showroom@hewn.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.formStrip} aria-hidden="true">
                <TabbiedPattern
                  pattern={reeding}
                  palette={FORM_FLUTE}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={28}
                  seed="hewn-form"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="showroom.visitHead3" data-edit-max="40" className={s.visitHead}>Book an hour with a maker</h3>
              <label className={s.field}>
                <span data-edit="showroom.text" data-edit-max="60">Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span data-edit="showroom.text2" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <div className={s.fieldRow}>
                <label className={s.field}>
                  <span data-edit="showroom.text3" data-edit-max="60">Day</span>
                  <input type="date" name="date" />
                </label>
                <label className={s.field}>
                  <span data-edit="showroom.text4" data-edit-max="60">Interested in</span>
                  <select name="piece" defaultValue="any">
                    <option value="any">Everything</option>
                    <option value="seating">Seating</option>
                    <option value="lighting">Lighting</option>
                    <option value="storage">Storage</option>
                  </select>
                </label>
              </div>
              <label className={s.check}>
                <input type="checkbox" name="catalog" />
                <span data-edit="showroom.text5" data-edit-max="60">Post me the printed catalog as well</span>
              </label>
              <button data-edit="showroom.button" data-edit-max="24" className={s.button} type="submit">Request the appointment</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <div className={s.footPlate} aria-hidden="true">
              <TabbiedPattern
                pattern={randomrings}
                palette={GRAIN}
                fit="grid"
                cellSize={26}
                seed="hewn-foot"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Hewn</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Chairs, lamps and sideboards, made in the Mill District.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
            218 Tanner Street
            <br />
            (555) 014-8210
            <br />
            showroom@hewn.example
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional furniture store. Pieces, prices and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live; the furniture is printed in the page's own two colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
