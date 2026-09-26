import { TabbiedPattern } from 'tabbied/react';
import { casing, fustian, mitre } from 'tabbied/patterns';
import s from './mitre-and-gilt.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Mitre & Gilt: Custom picture framing, Lantern Street',
  description:
    'Mitre & Gilt frames prints, paintings, photographs and objects by hand on Lantern Street. Mouldings, mats and glass explained, prices by size, shadow boxes, and what happens when you bring a piece in.',
};

/* Site colors. Every framed field lays its shapes on a transparent ground,
   so the mat or the box behind it shows through as the paper. */
const WALL = '#e9e4da';
const INK = '#1c1a17';
const GILT = '#b08a3e';
const WALNUT = '#5b3a25';
const GREEN = '#2c4a40';

const HANG = ['transparent', INK, GILT, WALNUT, GREEN];
const SMALL = ['transparent', INK, GILT, WALL];
const CLOTH = ['transparent', GREEN, WALL, GILT, INK];
const WINDOW = ['transparent', GILT, WALL, WALNUT];

const NAV = [
  ['How it works', '#process'],
  ['Mouldings', '#mouldings'],
  ['Mats and glass', '#mats'],
  ['Prices', '#prices'],
  ['Objects', '#objects'],
  ['Visit', '#visit'],
];

const PROCESS = [
  ['I', 'Bring it in', 'The piece itself, not a photo of it. Half an hour at the big table, no appointment needed on weekdays.'],
  ['II', 'Choose', 'We hold corner samples against the work, one after another, until one of us says that one. It is usually you.'],
  ['III', 'Cut and join', 'Mouldings are cut on the mitre saw, glued and pinned, and filled and touched up by hand at every corner.'],
  ['IV', 'Fit', 'The work is hinged to the backing with Japanese tissue, never taped down, then sealed with a dust cover.'],
  ['V', 'Collect', 'Seven to ten working days. We hang it for you if you like, anywhere within five miles.'],
];

type Moulding = {
  name: string;
  detail: string;
  price: string;
  tone: string;
};

const MOULDINGS: Moulding[] = [
  { name: 'Water-gilded maple', detail: '2 in, 22-carat leaf over red clay', price: '$38 a foot', tone: 'toneGilt' },
  { name: 'Black ash', detail: '1 1/4 in, open grain, satin', price: '$14 a foot', tone: 'toneBlack' },
  { name: 'Oiled walnut', detail: '1 1/2 in, flat, from Ohio', price: '$19 a foot', tone: 'toneWalnut' },
  { name: 'Limed oak', detail: '1 in, pale, the grain left showing', price: '$16 a foot', tone: 'toneOak' },
  { name: 'Gesso white', detail: '3/4 in, hand-sanded', price: '$12 a foot', tone: 'toneWhite' },
  { name: 'Green lacquer', detail: '1 in, six coats, rubbed back', price: '$21 a foot', tone: 'toneGreen' },
];

const MATS = [
  ['4-ply mat', 'Acid-free, white core, the standard window', '$22-$48'],
  ['8-ply mat', 'Twice as deep, for a shadow line around the work', '$45-$95'],
  ['Double mat', 'A second, narrower window in a second color', '+$20'],
  ['Float mount', 'The whole sheet shown, deckle edges and all', '$35-$70'],
  ['Gilt fillet', 'A thin gold slip inside the mat window', '$3 a foot'],
];

type Glass = {
  name: string;
  uv: string;
  glare: string;
  good: string;
  price: string;
};

const GLASS: Glass[] = [
  { name: 'Clear', uv: '45%', glare: 'Normal', good: 'Posters, family photos out of the sun', price: '$6' },
  { name: 'Conservation', uv: '99%', glare: 'Normal', good: 'Originals, signed prints, anything irreplaceable', price: '$12' },
  { name: 'Museum glass', uv: '99%', glare: 'Almost none', good: 'Dark work, bright rooms, opposite windows', price: '$24' },
  { name: 'Acrylic', uv: '66%', glare: 'Normal', good: 'Big pieces, nurseries, anything shipped', price: '$10' },
];

type Size = {
  size: string;
  simple: string;
  gallery: string;
  museum: string;
  hang: string;
};

const SIZES: Size[] = [
  { size: '8 x 10 in', simple: '$95', gallery: '$165', museum: '$290', hang: 'hang1' },
  { size: '11 x 14 in', simple: '$125', gallery: '$210', museum: '$365', hang: 'hang2' },
  { size: '16 x 20 in', simple: '$175', gallery: '$295', museum: '$520', hang: 'hang3' },
  { size: '24 x 36 in', simple: '$285', gallery: '$465', museum: '$840', hang: 'hang4' },
  { size: '30 x 40 in', simple: '$360', gallery: '$590', museum: '$1,080', hang: 'hang5' },
];

const BUILDS = [
  ['Simple', 'Black ash, 4-ply mat, clear glass'],
  ['Gallery', 'Walnut or oak, 8-ply mat, conservation glass'],
  ['Museum', 'Gilded maple, double mat, museum glass'],
];

const OBJECTS = [
  ['A signed football shirt', 'Stitched to a linen board, 3 in deep box', '$260-$420'],
  ['Medals and ribbons', 'Pinned in a row with a small engraved plate', '$180-$240'],
  ['A finished jigsaw puzzle', 'Glued from behind, 1,000 pieces and up', '$140-$260'],
  ['Baby shoes, keys, a pressed flower', 'Floated on a mat in a 2 in box', '$120-$190'],
  ['A canvas you painted', 'Stretched, then a floater frame with a gap all round', '$110-$320'],
];

const SERVICES = [
  ['Hanging', 'Two of us, a laser level and the right fixings for your wall', '$85 a visit'],
  ['Restretching', 'A slack or torn canvas put back on its bars', 'from $60'],
  ['Refitting', 'Your old frame, new glass, a new mat and a clean', 'from $45'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Friday', '10 am to 6 pm'],
  ['Saturday', '10 am to 5 pm'],
  ['Sunday', 'By appointment'],
];

const FAQ = [
  ['Can I bring in my own frame?', 'Yes. If it is sound we will cut a new mat and glass for it and fit your piece. If it is not, we will say so before you pay for anything.'],
  ['Do you need the work to quote?', 'For a firm price, yes: sizes on a phone are never quite right. For a rough idea, the table above is honest to within ten percent.'],
  ['Is a poster worth framing well?', 'Worth framing simply, and our simple frames are good. We will never sell you museum glass for a poster that lives in a hallway.'],
  ['Do you frame on site for businesses?', 'Offices, restaurants and hotels, yes. We quote by the wall and install out of hours.'],
];

export default function MitreAndGiltPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400..700&family=Spectral:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Mitre &amp; Gilt</a>
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
        {/* ------------------------------------------------------------ HERO
            Wall text on the left, a small salon hang on the right, and a
            label beside each frame saying what it is and what it costs. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.wallText}>
            <p className={s.kicker}>Picture framers, 44 Lantern Street</p>
            <h1 id="hero-h" className={s.title}>
              Frames made by hand, <em>for the things worth keeping.</em>
            </h1>
            <p className={s.lede}>
              Prints, paintings, photographs, a child's first drawing, a
              shirt with a signature on it. We have cut and joined every
              frame in the back room since 1998, and we will tell you when
              a simple one is the right one.
            </p>
            <p className={s.heroLinks}>
              <a className={s.button} href="#prices">Prices by size</a>
              <a className={s.textLink} href="#visit">Bring a piece in</a>
            </p>
          </div>

          <div className={s.salon}>
            <figure className={s.hangBig}>
              <div className={`${s.frame} ${s.frameGilt}`}>
                <div className={s.mat}>
                  <div className={s.art} aria-hidden="true">
                    <TabbiedPattern
                      pattern={casing}
                      palette={HANG}
                      fit="grid"
                      cellSize={30}
                      seed="mitre-hang"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                </div>
              </div>
              <figcaption className={s.label}>
                <strong className={s.labelName}>No. 1</strong>
                <span className={s.labelTitle}>Gilded maple, 8-ply mat</span>
                <span className={s.labelBody}>Museum glass, 20 x 24 in</span>
                <span className={s.labelPrice}>$386 framed</span>
              </figcaption>
            </figure>

            <figure className={s.hangSmall}>
              <div className={`${s.frame} ${s.frameBlack}`}>
                <div className={s.mat}>
                  <div className={s.art} aria-hidden="true">
                    <TabbiedPattern
                      pattern={mitre}
                      palette={SMALL}
                      fit="grid"
                      cellSize={24}
                      seed="mitre-small"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                </div>
              </div>
              <figcaption className={s.label}>
                <strong className={s.labelName}>No. 2</strong>
                <span className={s.labelTitle}>Black ash, 4-ply mat</span>
                <span className={s.labelBody}>Clear glass, 8 x 10 in</span>
                <span className={s.labelPrice}>$95 framed</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* --------------------------------------------------------- PROCESS */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <p className={s.room}>Room I</p>
            <h2 id="process-h">How a frame is made</h2>
            <p className={s.secNote}>From the counter to your wall in five steps and about ten days.</p>
          </div>
          <ol className={s.process}>
            {PROCESS.map(([n, title, body]) => (
              <li key={n}>
                <span className={s.numeral}>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ MOULDINGS */}
        <section id="mouldings" className={s.sec} aria-labelledby="mouldings-h">
          <div className={s.secHead}>
            <p className={s.room}>Room II</p>
            <h2 id="mouldings-h">Mouldings</h2>
            <p className={s.secNote}>
              Over four hundred lengths on the rack; these six are the ones
              we reach for first. Priced by the running foot of frame, so a
              16 x 20 in piece takes six feet.
            </p>
          </div>
          <ul className={s.corners}>
            {MOULDINGS.map((m) => (
              <li key={m.name} className={s.cornerItem}>
                <div className={`${s.corner} ${s[m.tone]}`} aria-hidden="true" />
                <div className={s.label}>
                  <strong className={s.labelName}>{m.name}</strong>
                  <span className={s.labelBody}>{m.detail}</span>
                  <span className={s.labelPrice}>{m.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------ MATS AND GLASS */}
        <section id="mats" className={s.sec} aria-labelledby="mats-h">
          <div className={s.secHead}>
            <p className={s.room}>Room III</p>
            <h2 id="mats-h">Mats and glass</h2>
            <p className={s.secNote}>
              The mat keeps the work off the glass and gives it room. The
              glass decides how long the colors last.
            </p>
          </div>
          <div className={s.matsGrid}>
            <div>
              <h3 className={s.subHead}>Mats and mounts</h3>
              <dl className={s.list}>
                {MATS.map(([name, what, price]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd className={s.listWhat}>{what}</dd>
                    <dd className={s.listPrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className={s.subHead}>Glazing, per square foot</h3>
              <div className={s.tableWrap}>
                <table className={s.table}>
                  <caption className={s.srOnly}>Glass types, UV protection, glare and price per square foot</caption>
                  <thead>
                    <tr>
                      <th scope="col">Glass</th>
                      <th scope="col">UV blocked</th>
                      <th scope="col">Glare</th>
                      <th scope="col" className={s.right}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GLASS.map((g) => (
                      <tr key={g.name}>
                        <th scope="row">
                          <span className={s.glassName}>{g.name}</span>
                          <small className={s.glassGood}>{g.good}</small>
                        </th>
                        <td>{g.uv}</td>
                        <td>{g.glare}</td>
                        <td className={s.right}>{g.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p className={s.room}>Room IV</p>
            <h2 id="prices-h">What it costs, by size</h2>
            <p className={s.secNote}>
              Five common sizes drawn to scale and hung the museum way, with
              their centers on one line at 57 inches. Prices include the
              mat, the glass, fitting and a hanging wire.
            </p>
          </div>

          <div className={s.sizeWrap}>
            <ul className={s.sizeWall} aria-hidden="true">
              {SIZES.map((z) => (
                <li key={z.size} className={`${s.scaled} ${s[z.hang]}`}>
                  <span>{z.size}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className={s.centerLine}>Center line, 57 in from the floor</p>

          <div className={s.tableWrap}>
            <table className={`${s.table} ${s.priceTable}`}>
              <caption className={s.srOnly}>Framing prices by size for three builds</caption>
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  {BUILDS.map(([name]) => (
                    <th key={name} scope="col" className={s.right}>{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((z) => (
                  <tr key={z.size}>
                    <th scope="row">{z.size}</th>
                    <td className={s.right}>{z.simple}</td>
                    <td className={s.right}>{z.gallery}</td>
                    <td className={s.right}>{z.museum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className={s.builds}>
            {BUILDS.map(([name, what]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{what}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* --------------------------------------------------------- OBJECTS */}
        <section id="objects" className={s.sec} aria-labelledby="objects-h">
          <div className={s.objectsGrid}>
            <div className={s.boxHang}>
              <div className={s.box}>
                <div className={s.boxInner} aria-hidden="true">
                  <TabbiedPattern
                    pattern={fustian}
                    palette={CLOTH}
                    fit="grid"
                    cellSize={38}
                    seed="mitre-cloth"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <div className={s.label}>
                <strong className={s.labelName}>No. 3</strong>
                <span className={s.labelTitle}>Walnut shadow box, 3 in deep</span>
                <span className={s.labelBody}>A striped shirt stitched to linen, 24 x 30 in</span>
                <span className={s.labelPrice}>$340 framed</span>
              </div>
            </div>
            <div>
              <div className={s.secHead}>
                <p className={s.room}>Room V</p>
                <h2 id="objects-h">Objects, shirts and shadow boxes</h2>
                <p className={s.secNote}>
                  If it fits through the door, we have probably framed
                  something like it. Nothing is glued that can be sewn,
                  pinned or strapped instead.
                </p>
              </div>
              <dl className={s.list}>
                {OBJECTS.map(([name, what, price]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd className={s.listWhat}>{what}</dd>
                    <dd className={s.listPrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ IN THE WINDOW
            The green room: a feature wall with one large frame on it. */}
        <section id="window" className={s.feature} aria-labelledby="window-h">
          <div className={s.featureInner}>
            <div className={s.featureText}>
              <p className={s.room}>In the window this month</p>
              <h2 id="window-h">A large frame, and the rest of the bench</h2>
              <p className={s.featureNote}>
                This one is in our window until the end of the month: a
                30 x 40 in print in black ash with a four-inch mat, the
                size people ask about most and hesitate over longest.
              </p>
              <dl className={s.services}>
                {SERVICES.map(([name, what, price]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd className={s.listWhat}>{what}</dd>
                    <dd className={s.listPrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.featureHang}>
              <div className={`${s.frame} ${s.frameBlack} ${s.frameWide}`}>
                <div className={`${s.mat} ${s.matDeep}`}>
                  <div className={`${s.art} ${s.artTall}`} aria-hidden="true">
                    <TabbiedPattern
                      pattern={casing}
                      palette={WINDOW}
                      fit="grid"
                      cellSize={40}
                      seed="mitre-window"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className={`${s.label} ${s.labelOnGreen}`}>
                <strong className={s.labelName}>No. 4</strong>
                <span className={s.labelTitle}>Black ash, 4 in mat, museum glass</span>
                <span className={s.labelBody}>30 x 40 in</span>
                <span className={s.labelPrice}>$840 framed</span>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p className={s.room}>The front desk</p>
            <h2 id="visit-h">Visit the shop</h2>
          </div>
          <div className={s.visit}>
            <div>
              <p className={s.address}>44 Lantern Street, Old Mill Quarter</p>
              <p className={s.secNote}>
                Load at the curb, we will carry it in. Big pieces are easier
                on a weekday morning, when the table is clear.
              </p>
              <p className={s.contact}>
                <a href="tel:+15550194470">(555) 019-4470</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:bench@mitreandgilt.example">bench@mitreandgilt.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.faq}>
            {FAQ.map(([q, a]) => (
              <details key={q} className={s.faqItem}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Mitre &amp; Gilt</p>
        <p>A fictional picture framing shop. The mouldings, prices, people and address are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
