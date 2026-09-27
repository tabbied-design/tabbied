import { TabbiedPattern } from 'tabbied/react';
import { shearpair, sandfield, gritfield, raking, sliver } from 'tabbied/patterns';
import s from './whetstone-sharpening.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Whetstone: Knife sharpening by hand, Cutler\'s Yard and the Saturday market',
  description:
    'Whetstone sharpens kitchen knives, scissors and garden tools by hand on water stones, from 220 grit to 8000. Drop off at 7 Cutler\'s Yard, Sheaf Street, bring them to the Saturday market stall, or post them in.',
};

/* Site colors, the same hexes as the root roles. The bevels in the hero
   are shearpair on a clear ground over the steel plate; the grit band runs
   from coarse to fine through sandfield and gritfield. */
const STEEL = '#e9ecee';
const BLACK = '#121416';
const STONE = '#c7843f';
const RUST = '#a43a2e';

const BEVELS = ['transparent', BLACK, STONE, RUST, BLACK, STONE];
const BEVEL_BAND = [BLACK, STONE, STEEL, RUST, STONE, STEEL];
const GRIT_220 = [BLACK, STONE, STEEL, STONE, STEEL, STONE];
const GRIT_1000 = [RUST, STONE, BLACK, STONE, BLACK, STEEL];
const GRIT_3000 = [STONE, BLACK, RUST, BLACK, RUST, BLACK];
const GRIT_6000 = [STEEL, STONE, RUST, STONE, BLACK, STONE];
const GRIT_8000 = [STEEL, BLACK, STONE, BLACK, STONE, BLACK];
const STROKES = [STEEL, BLACK, STONE, RUST, BLACK, STONE];
const FILINGS = [BLACK, STEEL, STONE, RUST, STEEL, STONE];

const NAV = [
  ['Prices', '#prices'],
  ['How we sharpen', '#how'],
  ['Where', '#where'],
  ['Mail-in', '#mail'],
  ['Care', '#care'],
  ['Contact', '#contact'],
];

const HERO_FACTS = [
  ['$8', 'a knife, from'],
  ['5', 'stones, 220 to 8000'],
  ['2 hrs', 'at the market stall'],
];

type Line = {
  item: string;
  note: string;
  price: string;
};

const BY_LENGTH: Line[] = [
  { item: 'Paring and small knives', note: 'up to 12 cm', price: '$8' },
  { item: 'Utility, santoku, petty', note: '12-20 cm', price: '$10' },
  { item: 'Chef\'s knife, gyuto', note: '20-26 cm', price: '$12' },
  { item: 'Slicers, carving knives', note: 'over 26 cm', price: '$15' },
];

const SPECIALS: Line[] = [
  { item: 'Serrated and bread knives', note: 'each gullet by hand', price: '$12' },
  { item: 'Japanese single bevel', note: 'yanagiba, deba, usuba', price: '$18-25' },
  { item: 'Scissors and shears', note: 'kitchen, fabric, hair', price: '$9' },
  { item: 'Pinking shears', note: 'every tooth', price: '$14' },
];

const GARDEN: Line[] = [
  { item: 'Secateurs', note: 'cleaned and oiled', price: '$10' },
  { item: 'Loppers and hedge shears', note: 'both blades', price: '$14' },
  { item: 'Spades, hoes, edgers', note: 'filed, not stoned', price: '$8' },
  { item: 'Chip or broken tip repair', note: 'per cm of steel removed', price: '+$6' },
];

type Place = {
  name: string;
  where: string;
  when: string;
  back: string;
};

const PLACES: Place[] = [
  { name: 'The workshop', where: '7 Cutler\'s Yard, Sheaf Street', when: 'Tue-Fri 09:00-17:30', back: 'Ready the next working day' },
  { name: 'Saturday market', where: 'Stall 14, Corn Square, by the fountain', when: 'Sat 08:00-13:00', back: 'Ready in two hours, while you shop' },
  { name: 'Drop box, Hartley\'s Hardware', where: '22 Bridge Street', when: 'Shop hours, Mon-Sat', back: 'Collected Tuesday, back Thursday' },
  { name: 'Drop box, The Larder Cafe', where: '3 Mill Lane, Upperthorpe', when: 'Daily 08:00-16:00', back: 'Collected Tuesday, back Thursday' },
];

const MARKET_DAYS = [
  ['04', 'Oct'],
  ['11', 'Oct'],
  ['18', 'Oct'],
  ['25', 'Oct'],
  ['01', 'Nov'],
];

const MAIL_STEPS = [
  ['Wrap', 'Fold card over each edge and tape it shut. Knives in a roll can go as they are, roll and all.'],
  ['Box', 'A sturdy box with the form below inside. Mark it "tools", never "knives".'],
  ['Post', 'Tracked and signed for, to the workshop address. We text you when it lands.'],
  ['Back', 'Sharpened within three working days and posted back tracked, for $9.50.'],
];

const CARE = [
  ['Hone, do not grind', 'A few light strokes on a ceramic rod before each use push the edge straight again. A steel with ridges takes metal off.'],
  ['Board, not plate', 'Wood or soft plastic. Glass, marble and stone dull an edge in a single dinner.'],
  ['Wash by hand', 'Dishwashers knock edges against the rack, and the heat loosens handles. Dry it straight away.'],
  ['Store it apart', 'A block, a magnetic strip or a guard. A loose knife in a drawer meets every other knife in it.'],
  ['Cut, do not scrape', 'Turn the knife over to sweep food off the board. The edge is for cutting only.'],
  ['Come back yearly', 'A home cook needs us once a year; a keen one twice. Honing buys you the months between.'],
];

export default function WhetstoneSharpeningPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--steel': '#e9ecee',
        '--black': '#121416',
        '--stone': '#c7843f',
        '--rust': '#a43a2e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="steel,black,stone,rust"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Marcellus+SC&family=Marcellus&family=Fragment+Mono&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markEdge} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Whetstone</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Market today, stall 14</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The plate: bevels cut against their slope, and over them the
            protractor with an edge standing in it at 15 degrees a side. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Knife sharpening by hand, Sheaf Street</p>
            <h1 data-edit="hero.title" data-edit-max="70" id="hero-h" className={s.title}>Whetstone</h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Every edge done by hand on water stones, from 220 grit to 8000.
              Leave your knives at 7 Cutler&apos;s Yard, or bring them to the
              Saturday market and collect them sharp before you go home.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#prices">See the prices</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#where">Find the stall</a>
            </div>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([figure, label], i) => (
                <div key={label}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{figure}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className={s.plate}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,1,2" className={s.bevels} aria-hidden="true">
              <TabbiedPattern
                pattern={shearpair}
                palette={BEVELS}
                fit="grid"
                cellSize={60}
                seed="whetstone-bevels"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.protractor} aria-hidden="true">
              <span className={s.ticks} />
              <span className={`${s.wedge} ${s.wedge20}`} />
              <span className={`${s.wedge} ${s.wedge15}`} />
              <span className={`${s.ray} ${s.rayL20}`} />
              <span className={`${s.ray} ${s.rayR20}`} />
              <span className={`${s.ray} ${s.rayL15}`} />
              <span className={`${s.ray} ${s.rayR15}`} />
              <span className={s.blade}>
                <span className={s.bladeBevel} />
              </span>
              <span className={s.hub} />
              <span data-edit="hero.deg" data-edit-max="60" className={`${s.deg} ${s.degL20}`}>20&#176;</span>
              <span data-edit="hero.deg2" data-edit-max="60" className={`${s.deg} ${s.degL15}`}>15&#176;</span>
              <span data-edit="hero.deg3" data-edit-max="60" className={`${s.deg} ${s.degR15}`}>15&#176;</span>
              <span data-edit="hero.deg4" data-edit-max="60" className={`${s.deg} ${s.degR20}`}>20&#176;</span>
            </div>
            <figcaption className={s.plateCaption}>
              <span data-edit="hero.capKey" data-edit-max="60" className={s.capKey}>15&#176; a side</span>
              <span data-edit="hero.text" data-edit-max="60">Japanese knives, thin and hard</span>
              <span data-edit="hero.capKey2" data-edit-max="60" className={s.capKey}>20&#176; a side</span>
              <span data-edit="hero.text2" data-edit-max="60">European knives, softer and tougher</span>
            </figcaption>
          </figure>
        </section>

        {/* ---------------------------------------------------------- PRICES
            The knife roll, open: four knives in their stitched pockets with
            a tag on each, then the full list, engraved along a spine. */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>I</p>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Prices</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Priced by the knife, whatever state it arrives in. Bring a roll
              of six or more and the cheapest one is free.
            </p>
          </div>

          <div className={s.roll}>
            <span className={s.flap} aria-hidden="true" />
            <ul className={s.pockets}>
              <li className={s.pocket}>
                <Artwork
                  slug="whetstone-sharpening-chef"
                  alt="A chef's knife with a riveted handle, lying in the roll"
                  inks={['var(--on-canvas)']}
                  className={`${s.knife} ${s.knifeChef}`}
                />
                <span className={s.sleeve} aria-hidden="true" />
                <p className={s.tag}>
                  <span data-edit="prices.tagName" data-edit-max="60" className={s.tagName}>Chef&apos;s knife, 21 cm</span>
                  <span data-edit="prices.tagPrice" data-edit-max="60" className={s.tagPrice}>$12</span>
                </p>
              </li>
              <li className={s.pocket}>
                <Artwork
                  slug="whetstone-sharpening-santoku"
                  alt="A santoku with a dimpled blade, lying in the roll"
                  inks={['var(--on-canvas)']}
                  className={`${s.knife} ${s.knifeSantoku}`}
                />
                <span className={s.sleeve} aria-hidden="true" />
                <p className={s.tag}>
                  <span data-edit="prices.tagName2" data-edit-max="60" className={s.tagName}>Santoku, 18 cm</span>
                  <span data-edit="prices.tagPrice2" data-edit-max="60" className={s.tagPrice}>$10</span>
                </p>
              </li>
              <li className={s.pocket}>
                <Artwork
                  slug="whetstone-sharpening-bread"
                  alt="A serrated bread knife, lying in the roll"
                  inks={['var(--on-canvas)']}
                  className={`${s.knife} ${s.knifeBread}`}
                />
                <span className={s.sleeve} aria-hidden="true" />
                <p className={s.tag}>
                  <span data-edit="prices.tagName3" data-edit-max="60" className={s.tagName}>Bread knife, serrated</span>
                  <span data-edit="prices.tagPrice3" data-edit-max="60" className={s.tagPrice}>$12</span>
                </p>
              </li>
              <li className={s.pocket}>
                <Artwork
                  slug="whetstone-sharpening-paring"
                  alt="A small paring knife, lying in the roll"
                  inks={['var(--on-canvas)']}
                  className={`${s.knife} ${s.knifeParing}`}
                />
                <span className={s.sleeve} aria-hidden="true" />
                <p className={s.tag}>
                  <span data-edit="prices.tagName4" data-edit-max="60" className={s.tagName}>Paring knife, 9 cm</span>
                  <span data-edit="prices.tagPrice4" data-edit-max="60" className={s.tagPrice}>$8</span>
                </p>
              </li>
            </ul>
            <span className={s.ties} aria-hidden="true" />
          </div>

          <div className={s.spines}>
            <div className={s.spineGroup}>
              <h3 data-edit="prices.spineTitle" data-edit-max="40" className={s.spineTitle}>Kitchen knives, by length</h3>
              <ul className={s.spineList}>
                {BY_LENGTH.map((l, i) => (
                  <li key={l.item} className={s.spine}>
                    <span data-edit={`prices.spineItem.${i}`} data-edit-max="60" className={s.spineItem}>{l.item}</span>
                    <span data-edit={`prices.spineNote.${i}`} data-edit-max="60" className={s.spineNote}>{l.note}</span>
                    <span data-edit={`prices.spinePrice.${i}`} data-edit-max="60" className={s.spinePrice}>{l.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.spineGroup}>
              <h3 data-edit="prices.spineTitle2" data-edit-max="40" className={s.spineTitle}>Serrated, single bevel, scissors</h3>
              <ul className={s.spineList}>
                {SPECIALS.map((l, i) => (
                  <li key={l.item} className={s.spine}>
                    <span data-edit={`prices.spineItem2.${i}`} data-edit-max="60" className={s.spineItem}>{l.item}</span>
                    <span data-edit={`prices.spineNote2.${i}`} data-edit-max="60" className={s.spineNote}>{l.note}</span>
                    <span data-edit={`prices.spinePrice2.${i}`} data-edit-max="60" className={s.spinePrice}>{l.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.spineGroup}>
              <h3 data-edit="prices.spineTitle3" data-edit-max="40" className={s.spineTitle}>Garden tools and repairs</h3>
              <ul className={s.spineList}>
                {GARDEN.map((l, i) => (
                  <li key={l.item} className={s.spine}>
                    <span data-edit={`prices.spineItem3.${i}`} data-edit-max="60" className={s.spineItem}>{l.item}</span>
                    <span data-edit={`prices.spineNote3.${i}`} data-edit-max="60" className={s.spineNote}>{l.note}</span>
                    <span data-edit={`prices.spinePrice3.${i}`} data-edit-max="60" className={s.spinePrice}>{l.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW
            The grit chart: the stone first, then five fields, each finer
            than the last. */}
        <section id="how" className={s.howSec} aria-labelledby="how-h">
          <div className={s.howInner}>
            <div className={s.secHead}>
              <p data-edit="how.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>II</p>
              <h2 data-edit="how.secTitle" data-edit-max="60" id="how-h" className={s.secTitle}>How we sharpen</h2>
              <p data-edit="how.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                No belts and no grinding wheels, which heat the steel and take
                years off a knife. Water stones only, in this order, with the
                angle held by hand.
              </p>
            </div>

            <ol className={s.grits}>
              <li className={s.gritStone}>
                <Artwork
                  slug="whetstone-sharpening-stone"
                  alt="A two-sided water stone in its wooden base"
                  inks={['var(--on-black)', 'var(--hone)']}
                  className={s.stonePic}
                />
                <p data-edit="how.stoneNote" data-edit-max="240" data-edit-multiline className={s.stoneNote}>Soaked for ten minutes, flattened after every knife.</p>
              </li>
              <li className={s.grit}>
                <div data-edit-pattern="how.field" data-edit-roles="1,2,0,2,0,2" className={s.gritField} aria-hidden="true">
                  <TabbiedPattern pattern={sandfield} palette={GRIT_220} fit="grid" cellSize={56} seed="whetstone-grit-220" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="how.gritNo" data-edit-max="240" data-edit-multiline className={s.gritNo}>220</p>
                <h3 data-edit="how.gritName" data-edit-max="40" className={s.gritName}>Coarse</h3>
                <p data-edit="how.gritDoes" data-edit-max="240" data-edit-multiline className={s.gritDoes}>Takes out chips and rolls, sets a new bevel on a dull edge.</p>
                <p data-edit="how.gritTime" data-edit-max="240" data-edit-multiline className={s.gritTime}>4-8 min</p>
              </li>
              <li className={s.grit}>
                <div data-edit-pattern="how.field2" data-edit-roles="3,2,1,2,1,0" className={s.gritField} aria-hidden="true">
                  <TabbiedPattern pattern={sandfield} palette={GRIT_1000} fit="grid" cellSize={34} seed="whetstone-grit-1000" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="how.gritNo2" data-edit-max="240" data-edit-multiline className={s.gritNo}>1000</p>
                <h3 data-edit="how.gritName2" data-edit-max="40" className={s.gritName}>Medium</h3>
                <p data-edit="how.gritDoes2" data-edit-max="240" data-edit-multiline className={s.gritDoes}>The working edge. Most knives are sharp enough to use from here.</p>
                <p data-edit="how.gritTime2" data-edit-max="240" data-edit-multiline className={s.gritTime}>3 min</p>
              </li>
              <li className={s.grit}>
                <div data-edit-pattern="how.field3" data-edit-roles="2,1,3,1,3,1" className={s.gritField} aria-hidden="true">
                  <TabbiedPattern pattern={gritfield} palette={GRIT_3000} fit="grid" cellSize={30} seed="whetstone-grit-3000" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="how.gritNo3" data-edit-max="240" data-edit-multiline className={s.gritNo}>3000</p>
                <h3 data-edit="how.gritName3" data-edit-max="40" className={s.gritName}>Fine</h3>
                <p data-edit="how.gritDoes3" data-edit-max="240" data-edit-multiline className={s.gritDoes}>Refines the scratches left by the 1000, so the edge lasts longer.</p>
                <p data-edit="how.gritTime3" data-edit-max="240" data-edit-multiline className={s.gritTime}>2 min</p>
              </li>
              <li className={s.grit}>
                <div data-edit-pattern="how.field4" data-edit-roles="0,2,3,2,1,2" className={s.gritField} aria-hidden="true">
                  <TabbiedPattern pattern={gritfield} palette={GRIT_6000} fit="grid" cellSize={20} seed="whetstone-grit-6000" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="how.gritNo4" data-edit-max="240" data-edit-multiline className={s.gritNo}>6000</p>
                <h3 data-edit="how.gritName4" data-edit-max="40" className={s.gritName}>Polish</h3>
                <p data-edit="how.gritDoes4" data-edit-max="240" data-edit-multiline className={s.gritDoes}>A mirror on the bevel; tomato skins give way without pressure.</p>
                <p data-edit="how.gritTime4" data-edit-max="240" data-edit-multiline className={s.gritTime}>2 min</p>
              </li>
              <li className={s.grit}>
                <div data-edit-pattern="how.field5" data-edit-roles="0,1,2,1,2,1" className={s.gritField} aria-hidden="true">
                  <TabbiedPattern pattern={gritfield} palette={GRIT_8000} fit="grid" cellSize={14} seed="whetstone-grit-8000" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="how.gritNo5" data-edit-max="240" data-edit-multiline className={s.gritNo}>8000</p>
                <h3 data-edit="how.gritName5" data-edit-max="40" className={s.gritName}>Finish</h3>
                <p data-edit="how.gritDoes5" data-edit-max="240" data-edit-multiline className={s.gritDoes}>For Japanese knives and anyone who asks. Then leather, and paper.</p>
                <p data-edit="how.gritTime5" data-edit-max="240" data-edit-multiline className={s.gritTime}>2 min</p>
              </li>
            </ol>
            <p className={s.gritScale} aria-hidden="true">
              <span data-edit="how.text" data-edit-max="60">coarse</span>
              <span data-edit="how.text2" data-edit-max="60">fine</span>
            </p>

            <div className={s.bench}>
              <p data-edit="how.benchLead" data-edit-max="240" data-edit-multiline className={s.benchLead}>
                Each knife is checked under a loupe between stones, then
                stropped on leather and tested on a folded sheet of newspaper.
                If it tears instead of slicing, it goes back to the 1000.
              </p>
              <dl className={s.benchFacts}>
                <div>
                  <dt data-edit="how.term" data-edit-max="28">Angle</dt>
                  <dd data-edit="how.body" data-edit-max="200" data-edit-multiline>15&#176; or 20&#176;</dd>
                </div>
                <div>
                  <dt data-edit="how.term2" data-edit-max="28">Steel removed</dt>
                  <dd data-edit="how.body2" data-edit-max="200" data-edit-multiline>0.1-0.3 mm</dd>
                </div>
                <div>
                  <dt data-edit="how.term3" data-edit-max="28">Knives a day</dt>
                  <dd data-edit="how.body3" data-edit-max="200" data-edit-multiline>60</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- WHERE */}
        <section id="where" className={s.sec} aria-labelledby="where-h">
          <div className={s.secHead}>
            <p data-edit="where.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>III</p>
            <h2 data-edit="where.secTitle" data-edit-max="60" id="where-h" className={s.secTitle}>Where to find us</h2>
            <p data-edit="where.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Four places to leave a knife. Wrap each one in a tea towel or
              newspaper, and put a name on the bundle.
            </p>
          </div>

          <div className={s.where}>
            <ul className={s.places}>
              {PLACES.map((p, i) => (
                <li key={p.name} className={s.place}>
                  <h3 data-edit={`where.placeName.${i}`} data-edit-max="40" className={s.placeName}>{p.name}</h3>
                  <p data-edit={`where.placeWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.placeWhere}>{p.where}</p>
                  <p data-edit={`where.placeWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.placeWhen}>{p.when}</p>
                  <p data-edit={`where.placeBack.${i}`} data-edit-max="240" data-edit-multiline className={s.placeBack}>{p.back}</p>
                </li>
              ))}
            </ul>

            <aside className={s.stall} aria-labelledby="stall-h">
              <div data-edit-pattern="stall.field" data-edit-roles="1,2,0,3,2,0" className={s.awning} aria-hidden="true">
                <TabbiedPattern
                  pattern={shearpair}
                  palette={BEVEL_BAND}
                  fit="grid"
                  cellSize={36}
                  seed="whetstone-awning"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.stallBody}>
                <h3 data-edit="stall.stallTitle" data-edit-max="40" id="stall-h" className={s.stallTitle}>Next market days</h3>
                <ol className={s.days}>
                  {MARKET_DAYS.map(([day, month], i) => (
                    <li key={`${day}-${month}`}>
                      <span data-edit={`stall.dayNo.${i}`} data-edit-max="60" className={s.dayNo}>{day}</span>
                      <span data-edit={`stall.dayMonth.${i}`} data-edit-max="60" className={s.dayMonth}>{month}</span>
                    </li>
                  ))}
                </ol>
                <p data-edit="stall.stallNote" data-edit-max="240" data-edit-multiline className={s.stallNote}>
                  Stall 14, Corn Square, 08:00-13:00. Knives in before 11:00
                  are ready by 13:00; after that, they come back to the
                  workshop and are ready on Tuesday.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------------ MAIL */}
        <section id="mail" className={s.mailSec} aria-labelledby="mail-h">
          <div className={s.mailInner}>
            <div className={s.mailText}>
              <p data-edit="mail.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>IV</p>
              <h2 data-edit="mail.secTitle" data-edit-max="60" id="mail-h" className={s.secTitle}>Mail-in service</h2>
              <p data-edit="mail.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Too far from Sheaf Street? Post them. Knives come back within a
                week of leaving you, insured up to $500 a parcel.
              </p>
              <ol className={s.steps}>
                {MAIL_STEPS.map(([step, text], i) => (
                  <li key={step} className={s.step}>
                    <span className={s.stepNo} aria-hidden="true">{i + 1}</span>
                    <h3 data-edit={`mail.stepName.${i}`} data-edit-max="40" className={s.stepName}>{step}</h3>
                    <p data-edit={`mail.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className={s.label}>
              <p className={s.labelHead}>
                <span data-edit="mail.text" data-edit-max="60">Tracked, signed for</span>
                <span data-edit="mail.labelClass" data-edit-max="60" className={s.labelClass}>Tools</span>
              </p>
              <p data-edit="mail.labelTo" data-edit-max="240" data-edit-multiline className={s.labelTo}>To</p>
              <p data-edit="mail.labelAddress" data-edit-max="240" data-edit-multiline className={s.labelAddress}>Whetstone Mail-in</p>
              <p data-edit="mail.labelAddress2" data-edit-max="240" data-edit-multiline className={s.labelAddress}>7 Cutler&apos;s Yard, Sheaf Street</p>
              <p data-edit="mail.labelAddress3" data-edit-max="240" data-edit-multiline className={s.labelAddress}>Sheffold SH1 4RK</p>
              <span className={s.barcode} aria-hidden="true" />
              <p data-edit="mail.labelFoot" data-edit-max="240" data-edit-multiline className={s.labelFoot}>Return postage $9.50, up to 8 knives</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ CARE */}
        <section id="care" className={s.sec} aria-labelledby="care-h">
          <div className={s.care}>
            <div className={s.careSide}>
              <div className={s.careHead}>
                <p data-edit="care.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>V</p>
                <h2 data-edit="care.secTitle" data-edit-max="60" id="care-h" className={s.secTitle}>Care between sharpenings</h2>
              </div>
              <div data-edit-pattern="care.field" data-edit-roles="0,1,2,3,1,2" className={s.strokes} aria-hidden="true">
                <TabbiedPattern
                  pattern={raking}
                  palette={STROKES}
                  fit="grid"
                  cellSize={30}
                  seed="whetstone-honing"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.careList}>
              {CARE.map(([title, text], i) => (
                <li key={title} className={s.careItem}>
                  <span className={s.careNo} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 data-edit={`care.careTitle.${i}`} data-edit-max="40" className={s.careTitle}>{title}</h3>
                  <p data-edit={`care.careText.${i}`} data-edit-max="240" data-edit-multiline className={s.careText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contactSec} aria-labelledby="contact-h">
          <div className={s.contactInner}>
            <form className={s.form} action="#">
              <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>VI</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Contact</h2>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                Book a slot, ask about a knife, or send the form before you post
                a parcel. We answer the same day, apart from market Saturdays.
              </p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="contact.label" htmlFor="ws-name">Name</label>
                  <input id="ws-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label2" htmlFor="ws-email">Email</label>
                  <input id="ws-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label3" htmlFor="ws-how">How are they coming?</label>
                  <select id="ws-how" name="how" defaultValue="workshop">
                    <option value="workshop">To the workshop</option>
                    <option value="market">To the market stall</option>
                    <option value="box">A drop box</option>
                    <option value="post">By post</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label4" htmlFor="ws-count">How many pieces?</label>
                  <input id="ws-count" name="count" type="number" min="1" max="40" defaultValue="3" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="contact.label5" htmlFor="ws-what">What are they, and anything wrong?</label>
                  <textarea id="ws-what" name="what" rows={4} placeholder="Two chef's knives, one with a chipped tip; a bread knife; garden secateurs." />
                </div>
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
            </form>

            <aside className={s.shop} aria-labelledby="shop-h">
              <h3 data-edit="shop.shopTitle" data-edit-max="40" id="shop-h" className={s.shopTitle}>The workshop</h3>
              <p data-edit="shop.shopText" data-edit-max="240" data-edit-multiline className={s.shopText}>7 Cutler&apos;s Yard, Sheaf Street. Through the arch by the tool hire, second door on the left.</p>
              <dl className={s.shopHours}>
                <div>
                  <dt data-edit="shop.term" data-edit-max="28">Tue-Fri</dt>
                  <dd data-edit="shop.body" data-edit-max="200" data-edit-multiline>09:00-17:30</dd>
                </div>
                <div>
                  <dt data-edit="shop.term2" data-edit-max="28">Saturday</dt>
                  <dd data-edit="shop.body2" data-edit-max="200" data-edit-multiline>At the market</dd>
                </div>
                <div>
                  <dt data-edit="shop.term3" data-edit-max="28">Sun, Mon</dt>
                  <dd data-edit="shop.body3" data-edit-max="200" data-edit-multiline>Closed</dd>
                </div>
              </dl>
              <p className={s.shopContact}>
                <a data-edit="shop.link" data-edit-max="28" href="tel:+15550149921">(555) 014-9921</a>
              </p>
              <p className={s.shopContact}>
                <a data-edit="shop.link2" data-edit-max="28" href="mailto:edges@whetstone.example">edges@whetstone.example</a>
              </p>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,0,2,3,0,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={sliver}
            palette={FILINGS}
            fit="grid"
            cellSize={28}
            seed="whetstone-filings"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Whetstone</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional knife sharpening service. The places, prices and dates are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>The knives and the stone are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
