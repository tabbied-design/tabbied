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

const GRAIN = ['transparent', WALNUT, GRAY, PALE];
const FLUTE = ['transparent', PALE, GRAY];

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
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Hewn</a>
        <span className={s.edition}>Catalog 14</span>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#showroom">Book a visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ COVER
            The catalog's cover: a contents list on the left, plate one on
            the right, the chair on a field of grain lines. */}
        <section className={s.cover} aria-labelledby="cover-h">
          <div className={s.coverText}>
            <p className={s.kicker}>Catalog 14, autumn and winter 2026</p>
            <h1 className={s.coverTitle} id="cover-h">
              Furniture for
              <br />
              <em>a long time.</em>
            </h1>
            <p className={s.lede}>
              Six pieces from our own workshop in the Mill District: a lounge
              chair, a floor lamp and a low sideboard, each made two ways.
              Delivered and assembled by the people who built them.
            </p>
            <div className={s.coverActions}>
              <a className={s.button} href="#catalog">Browse the catalog</a>
              <a className={s.textLink} href="#showroom">Ask for the printed copy</a>
            </div>
            <ol className={s.contents} aria-label="Contents">
              {CONTENTS.map(([no, label, href, pageNo]) => (
                <li key={href}>
                  <span className={s.contentsNo}>{no}</span>
                  <a href={href}>{label}</a>
                  <span className={s.contentsPage}>{pageNo}</span>
                </li>
              ))}
            </ol>
          </div>

          <figure className={s.plate}>
            <div className={s.plateField} aria-hidden="true">
              <TabbiedPattern
                pattern={randomrings}
                palette={GRAIN}
                fit="grid"
                cellSize={140}
                seed="hewn-cover"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.plateNo}>Plate 1</span>
            <Artwork
              slug="hewn-furniture-chair"
              alt="The Loll lounge chair in black leather and walnut"
              inks={['var(--ink)', 'var(--paper)']}
              className={s.coverChair}
            />
            <figcaption className={s.plateCaption}>
              <span className={s.plateItem}>No. 101, Loll lounge chair</span>
              <span className={s.platePrice}>From $3,480</span>
            </figcaption>
          </figure>
        </section>

        <ul className={s.promises} aria-label="What comes with every piece">
          <li>
            <strong>Made here.</strong>
            <span>Every piece is built in our workshop behind the showroom.</span>
          </li>
          <li>
            <strong>Carried in.</strong>
            <span>Free delivery and assembly in the Mill District and downtown.</span>
          </li>
          <li>
            <strong>Kept up.</strong>
            <span>A ten-year guarantee on every frame, joint and base.</span>
          </li>
        </ul>

        {/* ---------------------------------------------------------- CATALOG
            Three chapters, each an intro column and two product cards. The
            same photograph appears twice per chapter, once per colorway. */}
        <section id="catalog" className={s.catalog} aria-labelledby="catalog-h">
          <div className={s.secHead}>
            <span className={s.secNo}>The catalog</span>
            <h2 id="catalog-h">Six pieces, two ways each</h2>
            <p className={s.secNote}>
              Prices include assembly within 40 miles. Dimensions are in
              inches: width, depth and height unless the table says otherwise.
            </p>
          </div>

          {CHAPTERS.map((c) => (
            <div key={c.id} id={c.id} className={s.chapter}>
              <div className={s.chapterIntro}>
                <span className={s.chapterNo}>{c.no}</span>
                <h3>{c.title}</h3>
                <p className={s.chapterBody}>{c.intro}</p>
                <p className={s.chapterAside}>{c.aside}</p>
              </div>
              {c.products.map((p) => (
                <article key={p.no} className={s.product}>
                  <div className={s.productPlate}>
                    <span className={s.productNo}>{p.no}</span>
                    <Artwork slug={p.art} alt={p.alt} inks={p.inks} className={s.productPic} />
                  </div>
                  <div className={s.productHead}>
                    <h4>{p.name}</h4>
                    <span className={s.productPrice}>{p.price}</span>
                  </div>
                  <p className={s.productVariant}>{p.variant}</p>
                  <table className={s.dims}>
                    <caption>Dimensions, in</caption>
                    <thead>
                      <tr>
                        {p.dims.map(([k]) => (
                          <th key={k} scope="col">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {p.dims.map(([k, v]) => (
                          <td key={k}>{v}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <dl className={s.specs}>
                    {p.materials.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
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
        <div className={s.band} aria-hidden="true">
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
            <p className={s.materialsCaption}>Low Line 64 in black walnut, oiled.</p>
          </div>
          <div className={s.materialsText}>
            <span className={s.secNo}>04 Materials</span>
            <h2 id="materials-h">Four materials, and how they age</h2>
            <p className={s.secNote}>
              Samples of every wood and leather are in the showroom, and we
              will post you cut samples for free.
            </p>
            <ul className={s.materialList}>
              {MATERIALS.map((m) => (
                <li key={m.name} className={s.material}>
                  <span className={`${s.chip} ${s[`chip_${m.tone}`]}`} aria-hidden="true" />
                  <h3>{m.name}</h3>
                  <p>{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- DELIVERY */}
        <section id="delivery" className={s.sec} aria-labelledby="delivery-h">
          <div className={s.secHead}>
            <span className={s.secNo}>05 Delivery</span>
            <h2 id="delivery-h">Delivery, returns and the guarantee</h2>
            <p className={s.secNote}>
              Our own two vans, our own people. We call the day before with a
              two-hour window and take the packaging away with us.
            </p>
          </div>
          <div className={s.deliveryGrid}>
            <table className={s.zones}>
              <caption>Delivery by distance from the showroom</caption>
              <thead>
                <tr>
                  <th scope="col">Where</th>
                  <th scope="col">Cost</th>
                  <th scope="col">How</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY.map(([where, cost, how]) => (
                  <tr key={where}>
                    <th scope="row">{where}</th>
                    <td className={s.zoneCost}>{cost}</td>
                    <td>{how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className={s.terms}>
              <div>
                <dt>Returns</dt>
                <dd>
                  Pieces marked in stock can come back within 30 days. We
                  collect them for the delivery price and refund the rest.
                </dd>
              </div>
              <div>
                <dt>Made to order</dt>
                <dd>
                  A 30% deposit starts the work and the balance is due on
                  delivery. Made-to-order sizes cannot be returned.
                </dd>
              </div>
              <div>
                <dt>Guarantee</dt>
                <dd>
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
              <Artwork
                slug="hewn-furniture-lamp"
                alt="The Stem floor lamp, standing in the workshop"
                inks={['var(--walnut)', 'var(--paper)']}
                className={s.lamp}
              />
            </div>
            <div className={s.workshopText}>
              <span className={s.secNo}>06 Workshop</span>
              <h2 id="workshop-h">Behind the showroom, a door, and the workshop</h2>
              <p>
                Hewn started in 2012 in one bay of the old rail shed on Tanner
                Street. There are six of us now, and the showroom is the front
                third of the building, so on a weekday you will hear the
                planer and smell the oil.
              </p>
              <p>
                One maker follows a piece from the rough board to the van.
                Their initials are burned under the seat, inside the lamp base
                or on the back of the sideboard, and they are the person who
                answers if anything ever needs fixing.
              </p>
              <dl className={s.facts}>
                {FACTS.map(([v, k]) => (
                  <div key={k}>
                    <dt>{v}</dt>
                    <dd>{k}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SHOWROOM */}
        <section id="showroom" className={s.sec} aria-labelledby="showroom-h">
          <div className={s.secHead}>
            <span className={s.secNo}>07 Showroom</span>
            <h2 id="showroom-h">Sit in everything before you buy it</h2>
            <p className={s.secNote}>
              Walk in any time we are open. Book an hour if you want a maker
              to go through sizes, woods and leathers with you.
            </p>
          </div>
          <div className={s.visit}>
            <div className={s.visitInfo}>
              <h3 className={s.visitHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <h3 className={s.visitHead}>Where</h3>
              <p className={s.address}>
                218 Tanner Street
                <br />
                The Mill District
              </p>
              <p className={s.visitNote}>
                Free parking in the yard off Cooper Lane. The 12 bus stops at
                the corner.
              </p>
              <p className={s.contactLine}>
                <a href="tel:+15550148210">(555) 014-8210</a>
              </p>
              <p className={s.contactLine}>
                <a href="mailto:showroom@hewn.example">showroom@hewn.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <h3 className={s.visitHead}>Book an hour with a maker</h3>
              <label className={s.field}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <div className={s.fieldRow}>
                <label className={s.field}>
                  <span>Day</span>
                  <input type="date" name="date" />
                </label>
                <label className={s.field}>
                  <span>Interested in</span>
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
                <span>Post me the printed catalog as well</span>
              </label>
              <button className={s.button} type="submit">Request the appointment</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p className={s.footName}>Hewn</p>
            <p className={s.footTag}>Chairs, lamps and sideboards, made in the Mill District.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p className={s.footAddr}>
            218 Tanner Street
            <br />
            (555) 014-8210
            <br />
            showroom@hewn.example
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional furniture store. Pieces, prices and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live; the furniture is printed in the page's own two colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
