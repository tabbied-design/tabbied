import { TabbiedPattern } from 'tabbied/react';
import { pennantbox, bilateral, sail, wavelet, seamband } from 'tabbied/patterns';
import s from './mariners-chandlery.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: "Mariner's Chandlery: Ship chandler and rope shop, Saltcombe",
  description:
    "Rope cut by the metre, shackles, blocks, fenders, paint and charts in the Old Sail Loft on Quay Street, Saltcombe. A rigging service, harbour notices, the tide table and free knot lessons on Saturdays.",
};

/* Site colors. Each pennant folds its corner back in color 0, so the wall
   and the footer bunting take the ground they hang on as color 0; the other
   fields keep a transparent ground and let their section show through. */
const SAILCLOTH = '#f4f2eb';
const NAVY = '#172a4a';
const RED = '#cc2f2a';
const YELLOW = '#f2c230';
const BLUE = '#2c6fb0';

const PENNANTS = [SAILCLOTH, NAVY, RED, YELLOW, BLUE, NAVY];
const BUNTING = [NAVY, RED, YELLOW, BLUE, SAILCLOTH, RED];
const LAID = ['transparent', NAVY, YELLOW, SAILCLOTH, BLUE, SAILCLOTH];
const BURGEES = ['transparent', NAVY, BLUE, RED, NAVY, YELLOW];
const CANVAS = ['transparent', SAILCLOTH, YELLOW, BLUE, SAILCLOTH, RED];
const HARBOUR = ['transparent', SAILCLOTH, BLUE, NAVY, SAILCLOTH, BLUE];

const NAV = [
  ['Rope', '#rope'],
  ['Knot board', '#knots'],
  ['Chandlery', '#chandlery'],
  ['Rigging', '#rigging'],
  ['Notices', '#notices'],
  ['Visit', '#visit'],
];

/* A word as a hoist of International Code flags, each with its letter
   underneath for anyone who does not read flags. Decorative: the heading
   beside it carries the words. */
const hoist = (word: string) =>
  word.split('').map((letter, i) =>
    letter === ' ' ? (
      <span key={i} className={s.sigGap} />
    ) : (
      <span key={i} className={s.sig}>
        <span className={`${s.flag} ${s[`f${letter}`]}`} />
        <span className={s.sigLetter}>{letter}</span>
      </span>
    )
  );

type RopeRow = { rope: string; dia: string; material: string; load: string; metre: string; stock: string };

const ROPES: RopeRow[] = [
  { rope: 'Quayline 3-strand', dia: '8 mm', material: 'Polyester', load: '1,450 kg', metre: '$2.10', stock: 'Reel 4' },
  { rope: 'Quayline 3-strand', dia: '12 mm', material: 'Polyester', load: '3,100 kg', metre: '$3.60', stock: 'Reel 5' },
  { rope: 'Quayline 3-strand', dia: '16 mm', material: 'Polyester', load: '5,200 kg', metre: '$5.90', stock: 'Reel 6' },
  { rope: 'Harbour braid', dia: '10 mm', material: 'Braid on braid', load: '2,650 kg', metre: '$4.40', stock: 'Reel 9' },
  { rope: 'Harbour braid', dia: '12 mm', material: 'Braid on braid', load: '3,700 kg', metre: '$5.80', stock: 'Reel 10' },
  { rope: 'Racing sheet', dia: '8 mm', material: 'Dyneema core', load: '4,100 kg', metre: '$7.50', stock: 'Reel 12' },
  { rope: 'Heritage manila', dia: '20 mm', material: 'Manila fibre', load: '2,900 kg', metre: '$6.20', stock: 'Coil' },
  { rope: 'Floating line', dia: '10 mm', material: 'Polypropylene', load: '1,500 kg', metre: '$1.40', stock: 'Reel 2' },
  { rope: 'Anchor leadline', dia: '14 mm', material: 'Lead-core polyester', load: '3,300 kg', metre: '$8.90', stock: 'Coil' },
  { rope: 'Shock cord', dia: '6 mm', material: 'Rubber, braided cover', load: '180 kg', metre: '$1.10', stock: 'Reel 1' },
];

const SPLICES = [
  ['Whipped ends', 'Free, both ends, while you wait'],
  ['Eye splice, 3-strand', '$12, ten minutes'],
  ['Eye splice, braid', '$28, next morning'],
  ['Mooring lines made up', 'Ask for a quote'],
];

type Knot = { slug: string; name: string; use: string; alt: string; shape: string };

const KNOTS_TOP: Knot[] = [
  { slug: 'mariners-chandlery-bowline', name: 'Bowline', use: 'A fixed loop that will not slip or jam', alt: 'A bowline knot tied in three-strand rope', shape: 'kTall' },
  { slug: 'mariners-chandlery-figure', name: 'Figure eight', use: 'Stops a line running out of a block', alt: 'A figure-eight stopper knot in three-strand rope', shape: 'kSlim' },
  { slug: 'mariners-chandlery-clove', name: 'Clove hitch', use: 'Fenders to a rail, quickly', alt: 'A clove hitch tied around a wooden post', shape: 'kPost' },
];

const KNOTS_BOTTOM: Knot[] = [
  { slug: 'mariners-chandlery-reef', name: 'Reef knot', use: 'Ties two ends round a bundle', alt: 'A reef knot joining two ropes', shape: 'kWide' },
  { slug: 'mariners-chandlery-sheetbend', name: 'Sheet bend', use: 'Joins a thick rope to a thin one', alt: 'A sheet bend joining a thick rope and a thin rope', shape: 'kWide' },
  { slug: 'mariners-chandlery-cleat', name: 'Cleat hitch', use: 'Makes a line fast on a cleat', alt: 'A rope made fast to a boat cleat with a cleat hitch', shape: 'kCleat' },
];

const LESSONS = [
  ['When', 'Every Saturday, 10:00-11:00, April to October'],
  ['Where', 'Upstairs in the loft, at the long table'],
  ['Who', 'Anyone aged eight and up; children with a grown-up'],
  ['Bring', 'Nothing. We lend the rope and you keep a practice length'],
];

type Drawer = { no: string; name: string; items: [string, string][] };

const DRAWERS: Drawer[] = [
  { no: '01', name: 'Shackles', items: [['D shackle, galvanised, 6-16 mm', 'from $3.20'], ['Bow shackle, stainless', 'from $7.50'], ['Snap shackle, swivel', '$24.00']] },
  { no: '02', name: 'Blocks', items: [['Single, 40 mm, plain bearing', '$18.50'], ['Double with becket', '$46.00'], ['Snatch block, 60 mm', '$72.00']] },
  { no: '03', name: 'Cleats', items: [['Horn cleat, 150 mm, bronze', '$38.00'], ['Cam cleat with fairlead', '$29.00'], ['Clam cleat, nylon', '$6.80']] },
  { no: '04', name: 'Fenders', items: [['Cylinder, 15 x 55 cm', '$34.00'], ['Ball fender, 45 cm', '$58.00'], ['Knitted fender cover', '$19.00']] },
  { no: '05', name: 'Paint', items: [['Antifouling, 2.5 L', '$129.00'], ['Topside enamel, 750 ml', '$42.00'], ['Varnish, eight coats worth', '$36.00']] },
  { no: '06', name: 'Charts', items: [['Saltcombe to Farrow Head', '$32.00'], ['Harbour plan, 1:5,000', '$18.00'], ['Tide atlas, this year', '$21.00']] },
];

const RIG_PRICES = [
  ['Standing rigging survey, up to 35 ft', '$180'],
  ['Replace one shroud or stay, swaged', 'from $140'],
  ['Full re-rig, 30 ft sloop', 'from $2,400'],
  ['Running rigging, new halyards and sheets', 'rope + $60 an hour'],
  ['Furler service', '$210'],
];

const RIG_STEPS = [
  ['Survey', 'Up the mast in the bosun\'s chair, top to bottom, with a written report and photographs.'],
  ['Measure', 'Every wire measured on the boat, not from a drawing. Rigs change over forty years.'],
  ['Make', 'Wire cut and swaged in the loft; rope spliced by hand. Each piece tagged with its place.'],
  ['Fit', 'On the quay crane or on your mooring, tensioned and tuned, with a card of the numbers.'],
];

type Tide = { day: string; hw1: string; h1: string; lw: string; l: string; hw2: string; h2: string };

const TIDES: Tide[] = [
  { day: 'Mon 6', hw1: '05:42', h1: '4.6', lw: '11:58', l: '0.8', hw2: '18:07', h2: '4.4' },
  { day: 'Tue 7', hw1: '06:28', h1: '4.8', lw: '12:44', l: '0.6', hw2: '18:51', h2: '4.6' },
  { day: 'Wed 8', hw1: '07:13', h1: '4.9', lw: '13:29', l: '0.5', hw2: '19:35', h2: '4.7' },
  { day: 'Thu 9', hw1: '07:57', h1: '4.9', lw: '14:12', l: '0.5', hw2: '20:19', h2: '4.7' },
  { day: 'Fri 10', hw1: '08:41', h1: '4.7', lw: '14:55', l: '0.7', hw2: '21:04', h2: '4.5' },
  { day: 'Sat 11', hw1: '09:26', h1: '4.5', lw: '15:40', l: '0.9', hw2: '21:51', h2: '4.3' },
  { day: 'Sun 12', hw1: '10:14', h1: '4.2', lw: '16:29', l: '1.2', hw2: '22:43', h2: '4.0' },
];

const SMALL_NOTICES = [
  { title: 'Found on the slip', text: 'One blue ball fender, 45 cm, name rubbed off. At the counter until it goes home.' },
  { title: 'Crew wanted', text: 'Folkboat Tern, Wednesday evening races. Ask for Mags at the rope reels.' },
  { title: 'Knot night', text: 'Splicing for grown-ups, Thursday 19:00, $15 with a pint from the Anchor.' },
];

const LOG = [
  { day: 'Monday', open: '08:00', close: '17:30', remarks: 'Rigging loft works; counter open' },
  { day: 'Tuesday', open: '08:00', close: '17:30', remarks: '' },
  { day: 'Wednesday', open: '08:00', close: '17:30', remarks: 'Race nights: open to 18:30' },
  { day: 'Thursday', open: '08:00', close: '17:30', remarks: '' },
  { day: 'Friday', open: '08:00', close: '18:00', remarks: 'Charts and tide atlases in' },
  { day: 'Saturday', open: '08:00', close: '16:00', remarks: 'Knot lesson at 10:00' },
  { day: 'Sunday', open: '09:00', close: '13:00', remarks: 'April to October only' },
];

export default function MarinersChandleryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sailcloth': '#f4f2eb',
        '--navy': '#172a4a',
        '--red': '#cc2f2a',
        '--yellow': '#f2c230',
        '--blue': '#2c6fb0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sailcloth,navy,red,yellow,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Rokkitt:ital,wght@0,300..800;1,400..600&family=Sofia+Sans+Extra+Condensed:wght@500..800&family=Alike&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandFlags} aria-hidden="true">
            <span className={`${s.flag} ${s.fM}`} />
            <span className={`${s.flag} ${s.fC}`} />
          </span>
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Mariner&apos;s Chandlery</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barTide" data-edit-max="240" data-edit-multiline className={s.barTide}>High water 07:13</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The loft's front: the shop's name dressed in signal flags on a
            halyard, and a porthole into the back room where the lantern is
            lit, set in a wall of pennants. */}
        <section className={s.hero} aria-labelledby="mc-hero-h">
          <div className={s.heroText}>
            <div className={s.halyard} aria-hidden="true">
              {hoist('MARINERS')}
            </div>
            <p data-edit="mcHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Ship chandler and rope shop, since 1911</p>
            <h1 data-edit="mcHero.title" data-edit-max="70" id="mc-hero-h" className={s.title}>
              Mariner&apos;s Chandlery
            </h1>
            <p data-edit="mcHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Rope cut from the reel by the metre, shackles by the drawerful,
              antifouling, charts and a rigging loft upstairs. In the Old Sail
              Loft on Quay Street, Saltcombe, a hundred steps from the slip.
            </p>
            <div className={s.actions}>
              <a data-edit="mcHero.btn" data-edit-max="28" className={s.btn} href="#rope">Rope by the metre</a>
              <a data-edit="mcHero.btnLine" data-edit-max="28" className={s.btnLine} href="#knots">Saturday knot lessons</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="mcHero.term" data-edit-max="28">42</dt>
                <dd data-edit="mcHero.body" data-edit-max="200" data-edit-multiline>reels of rope on the wall</dd>
              </div>
              <div>
                <dt data-edit="mcHero.term2" data-edit-max="28">1911</dt>
                <dd data-edit="mcHero.body2" data-edit-max="200" data-edit-multiline>the loft first cut a sail</dd>
              </div>
              <div>
                <dt data-edit="mcHero.term3" data-edit-max="28">Free</dt>
                <dd data-edit="mcHero.body3" data-edit-max="200" data-edit-multiline>whipping on every length</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroWall}>
            <div data-edit-pattern="mcHero.field" data-edit-roles="0,1,2,3,4,1" className={s.pennants} aria-hidden="true">
              <TabbiedPattern
                pattern={pennantbox}
                palette={PENNANTS}
                fit="grid"
                cellSize={48}
                seed="mariners-pennants"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figure className={s.porthole}>
              <span className={s.bolts} aria-hidden="true" />
              <div className={s.glass}>
                <Artwork
                  slug="mariners-chandlery-lantern"
                  alt="A brass ship's oil lantern with a glass globe, lit in the back room"
                  inks={['var(--navy)', 'color-mix(in oklab, var(--yellow) 55%, var(--sailcloth))']}
                  className={s.lantern}
                />
              </div>
              <figcaption data-edit="mcHero.portCaption" data-edit-max="120" data-edit-multiline className={s.portCaption}>Storm lanterns, brass, from $86</figcaption>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------------ ROPE */}
        <section id="rope" className={s.sec} aria-labelledby="mc-rope-h">
          <div className={s.secHead}>
            <div className={s.hoist} aria-hidden="true">{hoist('ROPE')}</div>
            <h2 data-edit="rope.title" data-edit-max="60" id="mc-rope-h">Rope by the metre</h2>
            <p data-edit="rope.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Cut from the reel on the brass tape along the counter. Tell us
              what it is for and we will tell you if it is the wrong rope.
            </p>
          </div>

          <div className={s.ropeGrid}>
            <div className={s.counter}>
              <div className={s.tape} aria-hidden="true">
                <span data-edit="rope.tapeEnd" data-edit-max="60" className={s.tapeEnd}>0</span>
                <span data-edit="rope.tapeMid" data-edit-max="60" className={s.tapeMid}>50 cm</span>
                <span data-edit="rope.tapeEnd2" data-edit-max="60" className={s.tapeEnd}>1 m</span>
              </div>
              <div className={s.ropeScroll}>
                <table className={s.ropeTable}>
                  <caption data-edit="rope.srOnly" className={s.srOnly}>Rope sold by the metre: diameter, material, breaking load and price</caption>
                  <thead>
                    <tr>
                      <th data-edit="rope.heading" scope="col">Rope</th>
                      <th data-edit="rope.heading2" scope="col">Dia.</th>
                      <th data-edit="rope.heading3" scope="col">Material</th>
                      <th data-edit="rope.num" scope="col" className={s.num}>Breaking load</th>
                      <th data-edit="rope.num2" scope="col" className={s.num}>Per metre</th>
                      <th data-edit="rope.reelCol" scope="col" className={s.reelCol}>On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROPES.map((r, i) => (
                      <tr key={`${r.rope}-${r.dia}`}>
                        <th data-edit={`rope.heading4.${i}`} scope="row">{r.rope}</th>
                        <td data-edit={`rope.dia.${i}`} className={s.dia}>{r.dia}</td>
                        <td data-edit={`rope.cell.${i}`}>{r.material}</td>
                        <td data-edit={`rope.num3.${i}`} className={s.num}>{r.load}</td>
                        <td data-edit={`rope.num4.${i}`} className={`${s.num} ${s.price}`}>{r.metre}</td>
                        <td data-edit={`rope.reelCol2.${i}`} className={s.reelCol}>{r.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className={s.splice} aria-labelledby="mc-splice-h">
              <div data-edit-pattern="mcSplice.field" data-edit-roles="transparent,1,3,0,4,0" className={s.laid} aria-hidden="true">
                <TabbiedPattern
                  pattern={seamband}
                  palette={LAID}
                  fit="grid"
                  cellSize={30}
                  seed="mariners-laid"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.spliceText}>
                <h3 data-edit="mcSplice.spliceTitle" data-edit-max="40" id="mc-splice-h" className={s.spliceTitle}>Spliced and whipped</h3>
                <dl className={s.spliceList}>
                  {SPLICES.map(([what, cost], i) => (
                    <div key={what}>
                      <dt data-edit={`mcSplice.term.${i}`} data-edit-max="28">{what}</dt>
                      <dd data-edit={`mcSplice.body.${i}`} data-edit-max="200" data-edit-multiline>{cost}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="mcSplice.small" data-edit-max="240" data-edit-multiline className={s.small}>Breaking loads are the maker&apos;s figures for new rope. Work to a fifth of them.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------------- KNOTS
            The knot board: six knots mounted on navy baize inside a rope
            border, each over its brass plate. */}
        <section id="knots" className={`${s.sec} ${s.knotSec}`} aria-labelledby="mc-knots-h">
          <div className={s.secHead}>
            <div className={s.hoist} aria-hidden="true">{hoist('KNOTS')}</div>
            <h2 data-edit="knots.title" data-edit-max="60" id="mc-knots-h">The knot board</h2>
            <p data-edit="knots.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six knots that do nearly everything on a boat. The board hangs
              by the door; the lessons are upstairs, free, every Saturday.
            </p>
          </div>

          <div className={s.knotGrid}>
            <figure className={s.boardFrame}>
              <div className={s.boardRope}>
                <div className={s.baize}>
                  <p data-edit="knots.boardTitle" data-edit-max="240" data-edit-multiline className={s.boardTitle}>Six useful knots</p>
                  <ul className={s.knotRow}>
                    {KNOTS_TOP.map((k, i) => (
                      <li key={k.slug} className={s.knot}>
                        <span className={s.knotMount}>
                          <Artwork
                            slug={k.slug}
                            alt={k.alt}
                            inks={['var(--rope-ink)']}
                            className={`${s.knotArt} ${s[k.shape]}`}
                          />
                        </span>
                        <span className={s.plate}>
                          <span data-edit={`knots.plateName.${i}`} data-edit-max="60" className={s.plateName}>{k.name}</span>
                          <span data-edit={`knots.plateUse.${i}`} data-edit-max="60" className={s.plateUse}>{k.use}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul className={`${s.knotRow} ${s.knotRowWide}`}>
                    {KNOTS_BOTTOM.map((k, i) => (
                      <li key={k.slug} className={s.knot}>
                        <span className={s.knotMount}>
                          <Artwork
                            slug={k.slug}
                            alt={k.alt}
                            inks={['var(--rope-ink)']}
                            className={`${s.knotArt} ${s[k.shape]}`}
                          />
                        </span>
                        <span className={s.plate}>
                          <span data-edit={`knots.plateName2.${i}`} data-edit-max="60" className={s.plateName}>{k.name}</span>
                          <span data-edit={`knots.plateUse2.${i}`} data-edit-max="60" className={s.plateUse}>{k.use}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <figcaption data-edit="knots.srOnly" data-edit-max="120" data-edit-multiline className={s.srOnly}>The knot board: bowline, figure eight, clove hitch, reef knot, sheet bend and cleat hitch</figcaption>
            </figure>

            <aside className={s.lessons} aria-labelledby="mc-lessons-h">
              <p data-edit="mcLessons.lessonsKicker" data-edit-max="240" data-edit-multiline className={s.lessonsKicker}>Free, no booking</p>
              <h3 data-edit="mcLessons.lessonsTitle" data-edit-max="40" id="mc-lessons-h" className={s.lessonsTitle}>Knot lessons, Saturdays at ten</h3>
              <dl className={s.lessonsList}>
                {LESSONS.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`mcLessons.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`mcLessons.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="mcLessons.lessonsNote" data-edit-max="240" data-edit-multiline className={s.lessonsNote}>
                Learn the six on the board in an hour. Come back and Mags will
                teach you the monkey&apos;s fist.
              </p>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------- CHANDLERY
            The wall of drawers behind the counter: brass card holders, cup
            pulls, and what is inside each one. */}
        <section id="chandlery" className={s.sec} aria-labelledby="mc-chand-h">
          <div className={s.secHead}>
            <div className={s.hoist} aria-hidden="true">{hoist('GEAR')}</div>
            <h2 data-edit="chandlery.title" data-edit-max="60" id="mc-chand-h">The chandlery</h2>
            <p data-edit="chandlery.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Eleven hundred lines in a room built for sails. If it fits in a
              drawer, it is probably in one; ask and we will find it.
            </p>
          </div>

          <div data-edit-pattern="chandlery.field" data-edit-roles="transparent,1,4,2,1,3" className={s.burgeeStrip} aria-hidden="true">
            <TabbiedPattern
              pattern={bilateral}
              palette={BURGEES}
              fit="grid"
              cellSize={36}
              seed="mariners-burgees"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <ul className={s.drawers}>
            {DRAWERS.map((d, i) => (
              <li key={d.no} className={s.drawer}>
                <div className={s.drawerFront}>
                  <p className={s.cardHolder}>
                    <span data-edit={`chandlery.drawerNo.${i}`} data-edit-max="60" className={s.drawerNo}>{d.no}</span>
                    <span data-edit={`chandlery.drawerName.${i}`} data-edit-max="60" className={s.drawerName}>{d.name}</span>
                  </p>
                  <span className={s.pull} aria-hidden="true" />
                </div>
                <ul className={s.drawerItems}>
                  {d.items.map(([item, price], i2) => (
                    <li key={item}>
                      <span data-edit={`chandlery.text.${i}.${i2}`} data-edit-max="60">{item}</span>
                      <span data-edit={`chandlery.itemPrice.${i}.${i2}`} data-edit-max="60" className={s.itemPrice}>{price}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- RIGGING */}
        <section id="rigging" className={s.rigSec} aria-labelledby="mc-rig-h">
          <div data-edit-pattern="rigging.field" data-edit-roles="transparent,0,3,4,0,2" className={s.rigCanvas} aria-hidden="true">
            <TabbiedPattern
              pattern={sail}
              palette={CANVAS}
              fit="grid"
              cellSize={44}
              seed="mariners-canvas"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.rigInner}>
            <div className={s.rigHead}>
              <div className={`${s.hoist} ${s.hoistOnNavy}`} aria-hidden="true">{hoist('RIGGING')}</div>
              <h2 data-edit="rigging.title" data-edit-max="60" id="mc-rig-h">The rigging loft</h2>
              <p data-edit="rigging.body" data-edit-max="240" data-edit-multiline>
                Upstairs, where the sails were cut. Owen and Priya survey,
                make and fit standing and running rigging for boats up to 45
                feet, and most of the dinghies in the harbour.
              </p>
            </div>

            <ol className={s.rigSteps}>
              {RIG_STEPS.map(([step, text], i) => (
                <li key={step}>
                  <span className={s.rigNo}>{`0${i + 1}`}</span>
                  <h3 data-edit={`rigging.title2.${i}`} data-edit-max="40">{step}</h3>
                  <p data-edit={`rigging.body2.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                </li>
              ))}
            </ol>

            <div className={s.rigPrices}>
              <h3 data-edit="rigging.rigPricesTitle" data-edit-max="40" className={s.rigPricesTitle}>Loft prices</h3>
              <dl>
                {RIG_PRICES.map(([job, price], i) => (
                  <div key={job}>
                    <dt data-edit={`rigging.term.${i}`} data-edit-max="28">{job}</dt>
                    <dd data-edit={`rigging.body3.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <a data-edit="rigging.btnYellow" data-edit-max="28" className={s.btnYellow} href="#visit">Book a survey</a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- NOTICES */}
        <section id="notices" className={s.sec} aria-labelledby="mc-notices-h">
          <div className={s.secHead}>
            <div className={s.hoist} aria-hidden="true">{hoist('TIDES')}</div>
            <h2 data-edit="notices.title" data-edit-max="60" id="mc-notices-h">Harbour notices</h2>
            <p data-edit="notices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The board in the window, where the harbour master pins the week.
              Times are for Saltcombe bar, heights above chart datum.
            </p>
          </div>

          <div className={s.noticeGrid}>
            <div className={s.tideCard}>
              <div className={s.tideScroll}>
                <table className={s.tideTable}>
                  <caption data-edit="notices.tideCaption" className={s.tideCaption}>Tide table, week of 6 October</caption>
                  <thead>
                    <tr>
                      <th data-edit="notices.heading" scope="col">Day</th>
                      <th data-edit="notices.heading2" scope="col">High</th>
                      <th data-edit="notices.heading3" scope="col">m</th>
                      <th data-edit="notices.heading4" scope="col">Low</th>
                      <th data-edit="notices.heading5" scope="col">m</th>
                      <th data-edit="notices.heading6" scope="col">High</th>
                      <th data-edit="notices.heading7" scope="col">m</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TIDES.map((t, i) => (
                      <tr key={t.day}>
                        <th data-edit={`notices.heading8.${i}`} scope="row">{t.day}</th>
                        <td data-edit={`notices.cell.${i}`}>{t.hw1}</td>
                        <td data-edit={`notices.height.${i}`} className={s.height}>{t.h1}</td>
                        <td data-edit={`notices.cell2.${i}`}>{t.lw}</td>
                        <td data-edit={`notices.height2.${i}`} className={s.height}>{t.l}</td>
                        <td data-edit={`notices.cell3.${i}`}>{t.hw2}</td>
                        <td data-edit={`notices.height3.${i}`} className={s.height}>{t.h2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div data-edit-pattern="notices.field" data-edit-roles="transparent,0,4,1,0,4" className={s.water} aria-hidden="true">
                <TabbiedPattern
                  pattern={wavelet}
                  palette={HARBOUR}
                  fit="grid"
                  cellSize={32}
                  seed="mariners-water"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>

            <div className={s.board}>
              <article className={s.poster}>
                <p data-edit="poster.posterKicker" data-edit-max="240" data-edit-multiline className={s.posterKicker}>Harbour master&apos;s notice 14</p>
                <h3 data-edit="poster.posterTitle" data-edit-max="40" className={s.posterTitle}>Winter lift-out</h3>
                <p data-edit="poster.posterDate" data-edit-max="240" data-edit-multiline className={s.posterDate}>Saturday 25 and Sunday 26 October</p>
                <p data-edit="poster.posterBody" data-edit-max="240" data-edit-multiline className={s.posterBody}>
                  The quay crane lifts from 07:00 on the morning tide. Boats
                  over 7 tonnes on Saturday, the rest on Sunday. Masts down
                  and sails off before you come alongside, please.
                </p>
                <p data-edit="poster.posterBody2" data-edit-max="240" data-edit-multiline className={s.posterBody}>
                  Put your name on the list at the chandlery counter by 18
                  October. $12 a foot, cradle and pressure wash included.
                </p>
              </article>
              <ul className={s.cards}>
                {SMALL_NOTICES.map((n, i) => (
                  <li key={n.title} className={s.card}>
                    <h3 data-edit={`notices.title2.${i}`} data-edit-max="40">{n.title}</h3>
                    <p data-edit={`notices.body.${i}`} data-edit-max="240" data-edit-multiline>{n.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="mc-visit-h">
          <div className={s.secHead}>
            <div className={s.hoist} aria-hidden="true">{hoist('VISIT')}</div>
            <h2 data-edit="visit.title" data-edit-max="60" id="mc-visit-h">Come aboard</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The Old Sail Loft, Quay Street, Saltcombe. The tall brick
              building with the loading door on the gable, opposite the slip.
            </p>
          </div>

          <div className={s.visitGrid}>
            <div className={s.log}>
              <table className={s.logTable}>
                <caption className={s.logCaption}>
                  <span data-edit="visit.text" data-edit-max="60">Ship&apos;s log</span>
                  <span data-edit="visit.logSub" data-edit-max="60" className={s.logSub}>Opening hours, kept at the counter</span>
                </caption>
                <thead>
                  <tr>
                    <th data-edit="visit.heading" scope="col">Day</th>
                    <th data-edit="visit.heading2" scope="col">Opens</th>
                    <th data-edit="visit.heading3" scope="col">Closes</th>
                    <th data-edit="visit.remarks" scope="col" className={s.remarks}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {LOG.map((l, i) => (
                    <tr key={l.day}>
                      <th data-edit={`visit.heading4.${i}`} scope="row">{l.day}</th>
                      <td data-edit={`visit.cell.${i}`}>{l.open}</td>
                      <td data-edit={`visit.cell2.${i}`}>{l.close}</td>
                      <td data-edit={`visit.remarks2.${i}`} className={s.remarks}>{l.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={s.where}>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>The Old Sail Loft, Quay Street, Saltcombe</p>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline>
                Parking on the quay for loading only; the long stay is up
                Chapel Hill. Dinghies can tie up at the pontoon below the
                loft door for half an hour.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="visit.term" data-edit-max="28">Counter</dt>
                  <dd><a data-edit="visit.link" data-edit-max="28" href="tel:+15550173344">(555) 017-3344</a></dd>
                </div>
                <div>
                  <dt data-edit="visit.term2" data-edit-max="28">Rigging loft</dt>
                  <dd><a data-edit="visit.link2" data-edit-max="28" href="tel:+15550173351">(555) 017-3351</a></dd>
                </div>
                <div>
                  <dt data-edit="visit.term3" data-edit-max="28">Email</dt>
                  <dd><a data-edit="visit.link3" data-edit-max="28" href="mailto:counter@marinerschandlery.example">counter@marinerschandlery.example</a></dd>
                </div>
                <div>
                  <dt data-edit="visit.term4" data-edit-max="28">VHF</dt>
                  <dd data-edit="visit.body2" data-edit-max="200" data-edit-multiline>Channel 12, &quot;Chandlery&quot;, in office hours</dd>
                </div>
              </dl>
              <form className={s.form} action="#">
                <p data-edit="visit.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Order rope for collection</p>
                <div className={s.formRow}>
                  <div className={s.field}>
                    <label data-edit="visit.label" htmlFor="mc-rope">Rope and diameter</label>
                    <input id="mc-rope" name="rope" type="text" placeholder="Quayline 3-strand, 12 mm" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="visit.label2" htmlFor="mc-length">Metres</label>
                    <input id="mc-length" name="length" type="number" min="1" defaultValue="10" />
                  </div>
                </div>
                <div className={s.field}>
                  <label data-edit="visit.label3" htmlFor="mc-email">Email</label>
                  <input id="mc-email" name="email" type="email" autoComplete="email" />
                </div>
                <button data-edit="visit.btn" data-edit-max="24" className={s.btn} type="submit">Cut it for me</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,2,3,4,0,2" className={s.footBunting} aria-hidden="true">
          <TabbiedPattern
            pattern={pennantbox}
            palette={BUNTING}
            fit="grid"
            cellSize={36}
            seed="mariners-bunting"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <div className={s.hoist} aria-hidden="true">{hoist('MC')}</div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Mariner&apos;s Chandlery</p>
          </div>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional ship chandler and rope shop. The ropes, prices, tides and people are invented; do not navigate by this page.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The knots and the lantern are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
