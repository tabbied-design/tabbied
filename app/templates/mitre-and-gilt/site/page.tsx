import { TabbiedPattern } from 'tabbied/react';
import { casing, fustian, mitre } from 'tabbied/patterns';
import s from './mitre-and-gilt.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

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

const DOUBLE = ['transparent', GREEN, GILT, WALNUT, INK];
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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--wall': '#e9e4da',
        '--ink': '#1c1a17',
        '--gilt': '#b08a3e',
        '--walnut': '#5b3a25',
        '--green': '#2c4a40',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="wall,ink,gilt,walnut,green"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400..700&family=Spectral:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Mitre &amp; Gilt</a>
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
            Wall text on the left, a small salon hang on the right, and a
            label beside each frame saying what it is and what it costs. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.wallText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Picture framers, 44 Lantern Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>
              Frames made by hand, <em>for the things worth keeping.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Prints, paintings, photographs, a child's first drawing, a
              shirt with a signature on it. We have cut and joined every
              frame in the back room since 1998, and we will tell you when
              a simple one is the right one.
            </p>
            <p className={s.heroLinks}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#prices">Prices by size</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="#visit">Bring a piece in</a>
            </p>
          </div>

          <div className={s.salon}>
            <figure className={s.hangBig}>
              <div className={`${s.frame} ${s.frameGilt}`}>
                <div className={s.mat}>
                  <div className={s.paper}>
                    <Artwork
                      slug="mitre-and-gilt-stilllife"
                      alt="An etching of a pear, a small jug and a folded cloth on a tabletop"
                      inks={['var(--text)']}
                      className={s.etching}
                    />
                  </div>
                </div>
              </div>
              <figcaption className={s.label}>
                <strong data-edit="hero.labelName" className={s.labelName}>No. 1</strong>
                <span data-edit="hero.labelTitle" data-edit-max="60" className={s.labelTitle}>Still life with pear, an etching</span>
                <span data-edit="hero.labelBody" data-edit-max="60" className={s.labelBody}>Gilded maple, 8-ply mat, museum glass, 24 x 20 in</span>
                <span data-edit="hero.labelPrice" data-edit-max="60" className={s.labelPrice}>$386 framed</span>
              </figcaption>
            </figure>

            <figure className={s.hangSmall}>
              <div className={`${s.frame} ${s.frameBlack}`}>
                <div className={s.mat}>
                  <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,0" className={s.art} aria-hidden="true">
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
                <strong data-edit="hero.labelName2" className={s.labelName}>No. 2</strong>
                <span data-edit="hero.labelTitle2" data-edit-max="60" className={s.labelTitle}>Black ash, 4-ply mat</span>
                <span data-edit="hero.labelBody2" data-edit-max="60" className={s.labelBody}>Clear glass, 8 x 10 in</span>
                <span data-edit="hero.labelPrice2" data-edit-max="60" className={s.labelPrice}>$95 framed</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* --------------------------------------------------------- PROCESS */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <p data-edit="process.room" data-edit-max="240" data-edit-multiline className={s.room}>Room I</p>
            <h2 data-edit="process.title" data-edit-max="60" id="process-h">How a frame is made</h2>
            <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>From the counter to your wall in five steps and about ten days.</p>
          </div>
          <ol className={s.process}>
            {PROCESS.map(([n, title, body], i) => (
              <li key={n}>
                <span data-edit={`process.numeral.${i}`} data-edit-max="60" className={s.numeral}>{n}</span>
                <h3 data-edit={`process.title2.${i}`} data-edit-max="40">{title}</h3>
                <p data-edit={`process.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ MOULDINGS */}
        <section id="mouldings" className={s.sec} aria-labelledby="mouldings-h">
          <div className={s.secHead}>
            <p data-edit="mouldings.room" data-edit-max="240" data-edit-multiline className={s.room}>Room II</p>
            <h2 data-edit="mouldings.title" data-edit-max="60" id="mouldings-h">Mouldings</h2>
            <p data-edit="mouldings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Over four hundred lengths on the rack; these six are the ones
              we reach for first. Priced by the running foot of frame, so a
              16 x 20 in piece takes six feet.
            </p>
          </div>
          <ul className={s.corners}>
            {MOULDINGS.map((m, i) => (
              <li key={m.name} className={s.cornerItem}>
                <div className={`${s.corner} ${s[m.tone]}`} aria-hidden="true" />
                <div className={s.label}>
                  <strong data-edit={`mouldings.labelName.${i}`} className={s.labelName}>{m.name}</strong>
                  <span data-edit={`mouldings.labelBody.${i}`} data-edit-max="60" className={s.labelBody}>{m.detail}</span>
                  <span data-edit={`mouldings.labelPrice.${i}`} data-edit-max="60" className={s.labelPrice}>{m.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------ MATS AND GLASS */}
        <section id="mats" className={s.sec} aria-labelledby="mats-h">
          <div className={s.matsHead}>
            <div className={s.secHead}>
              <p data-edit="mats.room" data-edit-max="240" data-edit-multiline className={s.room}>Room III</p>
              <h2 data-edit="mats.title" data-edit-max="60" id="mats-h">Mats and glass</h2>
              <p data-edit="mats.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The mat keeps the work off the glass and gives it room. The
                glass decides how long the colors last.
              </p>
            </div>
            <figure className={s.matDemo}>
              <div className={`${s.frame} ${s.frameWalnut}`}>
                <div className={`${s.mat} ${s.matDouble}`}>
                  <div className={s.matInner}>
                    <div data-edit-pattern="mats.field" data-edit-roles="transparent,4,2,3,1" className={`${s.art} ${s.artSquare}`} aria-hidden="true">
                      <TabbiedPattern
                        pattern={casing}
                        palette={DOUBLE}
                        fit="grid"
                        cellSize={28}
                        seed="mitre-mats"
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className={s.label}>
                <strong data-edit="mats.labelName" className={s.labelName}>No. 3</strong>
                <span data-edit="mats.labelTitle" data-edit-max="60" className={s.labelTitle}>A double mat</span>
                <span data-edit="mats.labelBody" data-edit-max="60" className={s.labelBody}>Walnut, white over green lacquer, 11 x 14 in</span>
                <span data-edit="mats.labelPrice" data-edit-max="60" className={s.labelPrice}>$210 framed</span>
              </figcaption>
            </figure>
          </div>
          <div className={s.matsGrid}>
            <div>
              <h3 data-edit="mats.subHead" data-edit-max="40" className={s.subHead}>Mats and mounts</h3>
              <dl className={s.list}>
                {MATS.map(([name, what, price], i) => (
                  <div key={name}>
                    <dt data-edit={`mats.term.${i}`} data-edit-max="28">{name}</dt>
                    <dd data-edit={`mats.listWhat.${i}`} data-edit-max="200" data-edit-multiline className={s.listWhat}>{what}</dd>
                    <dd data-edit={`mats.listPrice.${i}`} data-edit-max="200" data-edit-multiline className={s.listPrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 data-edit="mats.subHead2" data-edit-max="40" className={s.subHead}>Glazing, per square foot</h3>
              <div className={s.tableWrap}>
                <table className={s.table}>
                  <caption data-edit="mats.srOnly" className={s.srOnly}>Glass types, UV protection, glare and price per square foot</caption>
                  <thead>
                    <tr>
                      <th data-edit="mats.heading" scope="col">Glass</th>
                      <th data-edit="mats.heading2" scope="col">UV blocked</th>
                      <th data-edit="mats.heading3" scope="col">Glare</th>
                      <th data-edit="mats.right" scope="col" className={s.right}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GLASS.map((g, i) => (
                      <tr key={g.name}>
                        <th scope="row">
                          <span data-edit={`mats.glassName.${i}`} data-edit-max="60" className={s.glassName}>{g.name}</span>
                          <small data-edit={`mats.glassGood.${i}`} className={s.glassGood}>{g.good}</small>
                        </th>
                        <td data-edit={`mats.cell.${i}`}>{g.uv}</td>
                        <td data-edit={`mats.cell2.${i}`}>{g.glare}</td>
                        <td data-edit={`mats.right2.${i}`} className={s.right}>{g.price}</td>
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
            <p data-edit="prices.room" data-edit-max="240" data-edit-multiline className={s.room}>Room IV</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">What it costs, by size</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Five common sizes drawn to scale and hung the museum way, with
              their centers on one line at 57 inches. Prices include the
              mat, the glass, fitting and a hanging wire.
            </p>
          </div>

          <div className={s.sizeWrap}>
            <ul className={s.sizeWall} aria-hidden="true">
              {SIZES.map((z, i) => (
                <li key={z.size} className={`${s.scaled} ${s[z.hang]}`}>
                  <span data-edit={`prices.text.${i}`} data-edit-max="60">{z.size}</span>
                </li>
              ))}
            </ul>
          </div>
          <p data-edit="prices.centerLine" data-edit-max="240" data-edit-multiline className={s.centerLine}>Center line, 57 in from the floor</p>

          <div className={s.tableWrap}>
            <table className={`${s.table} ${s.priceTable}`}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Framing prices by size for three builds</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Size</th>
                  {BUILDS.map(([name], i) => (
                    <th data-edit={`prices.right.${i}`} key={name} scope="col" className={s.right}>{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((z, i) => (
                  <tr key={z.size}>
                    <th data-edit={`prices.heading2.${i}`} scope="row">{z.size}</th>
                    <td data-edit={`prices.right2.${i}`} className={s.right}>{z.simple}</td>
                    <td data-edit={`prices.right3.${i}`} className={s.right}>{z.gallery}</td>
                    <td data-edit={`prices.right4.${i}`} className={s.right}>{z.museum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className={s.builds}>
            {BUILDS.map(([name, what], i) => (
              <div key={name}>
                <dt data-edit={`prices.term.${i}`} data-edit-max="28">{name}</dt>
                <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* --------------------------------------------------------- OBJECTS */}
        <section id="objects" className={s.sec} aria-labelledby="objects-h">
          <div className={s.objectsGrid}>
            <div className={s.boxHang}>
              <div className={s.box}>
                <div data-edit-pattern="objects.field" data-edit-roles="transparent,4,0,2,1" className={s.boxInner} aria-hidden="true">
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
                <strong data-edit="objects.labelName" className={s.labelName}>No. 4</strong>
                <span data-edit="objects.labelTitle" data-edit-max="60" className={s.labelTitle}>Walnut shadow box, 3 in deep</span>
                <span data-edit="objects.labelBody" data-edit-max="60" className={s.labelBody}>A striped shirt stitched to linen, 24 x 30 in</span>
                <span data-edit="objects.labelPrice" data-edit-max="60" className={s.labelPrice}>$340 framed</span>
              </div>
            </div>
            <div>
              <div className={s.secHead}>
                <p data-edit="objects.room" data-edit-max="240" data-edit-multiline className={s.room}>Room V</p>
                <h2 data-edit="objects.title" data-edit-max="60" id="objects-h">Objects, shirts and shadow boxes</h2>
                <p data-edit="objects.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  If it fits through the door, we have probably framed
                  something like it. Nothing is glued that can be sewn,
                  pinned or strapped instead.
                </p>
              </div>
              <dl className={s.list}>
                {OBJECTS.map(([name, what, price], i) => (
                  <div key={name}>
                    <dt data-edit={`objects.term.${i}`} data-edit-max="28">{name}</dt>
                    <dd data-edit={`objects.listWhat.${i}`} data-edit-max="200" data-edit-multiline className={s.listWhat}>{what}</dd>
                    <dd data-edit={`objects.listPrice.${i}`} data-edit-max="200" data-edit-multiline className={s.listPrice}>{price}</dd>
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
              <p data-edit="window.room" data-edit-max="240" data-edit-multiline className={s.room}>In the window this month</p>
              <h2 data-edit="window.title" data-edit-max="60" id="window-h">A large frame, and the rest of the bench</h2>
              <p data-edit="window.featureNote" data-edit-max="240" data-edit-multiline className={s.featureNote}>
                This one is in our window until the end of the month: a
                30 x 40 in print in black ash with a four-inch mat, the
                size people ask about most and hesitate over longest.
              </p>
              <dl className={s.services}>
                {SERVICES.map(([name, what, price], i) => (
                  <div key={name}>
                    <dt data-edit={`window.term.${i}`} data-edit-max="28">{name}</dt>
                    <dd data-edit={`window.listWhat.${i}`} data-edit-max="200" data-edit-multiline className={s.listWhat}>{what}</dd>
                    <dd data-edit={`window.listPrice.${i}`} data-edit-max="200" data-edit-multiline className={s.listPrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.featureHang}>
              <div className={`${s.frame} ${s.frameBlack} ${s.frameWide}`}>
                <div className={`${s.mat} ${s.matDeep}`}>
                  <div data-edit-pattern="window.field" data-edit-roles="transparent,2,0,3" className={`${s.art} ${s.artTall}`} aria-hidden="true">
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
                <strong data-edit="window.labelName" className={s.labelName}>No. 5</strong>
                <span data-edit="window.labelTitle" data-edit-max="60" className={s.labelTitle}>Black ash, 4 in mat, museum glass</span>
                <span data-edit="window.labelBody" data-edit-max="60" className={s.labelBody}>30 x 40 in</span>
                <span data-edit="window.labelPrice" data-edit-max="60" className={s.labelPrice}>$840 framed</span>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.room" data-edit-max="240" data-edit-multiline className={s.room}>The front desk</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Visit the shop</h2>
          </div>
          <div className={s.visit}>
            <div>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>44 Lantern Street, Old Mill Quarter</p>
              <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Load at the curb, we will carry it in. Big pieces are easier
                on a weekday morning, when the table is clear.
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550194470">(555) 019-4470</a>
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:bench@mitreandgilt.example">bench@mitreandgilt.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.faq}>
            {FAQ.map(([q, a], i) => (
              <details key={q} className={s.faqItem}>
                <summary data-edit={`visit.question.${i}`} data-edit-max="80">{q}</summary>
                <p data-edit={`visit.body2.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Mitre &amp; Gilt</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional picture framing shop. The mouldings, prices, people and address are invented.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>; the etching is a generated picture drawn in the page's own colors.
        </p>
      </footer>
    </div>
  );
}
