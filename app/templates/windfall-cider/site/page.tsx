import { TabbiedPattern } from 'tabbied/react';
import { giornata, sunsetrings, horizonbands, foliage, quartercirclequilt } from 'tabbied/patterns';
import s from './windfall-cider.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Windfall Cider: Cidery and tasting room, Hollins Farm, Bramleigh',
  description:
    'Windfall Cider presses the fruit of 212 old trees at Hollins Farm. Four ciders and a perry, the orchard\'s varieties, a tasting room by day and by lamplight, pressing day in October and the wassail in January.',
};

/* Site colors: crate pine for the ground, the red of a Kingston Black, the
   leaf, a label-printer's sky and the black of the stencil. Pattern
   windows keep a transparent ground so the label's own field shows. */
const CRATE = '#ead4a9';
const RED = '#a8262b';
const LEAF = '#3f6b35';
const SKY = '#6fa8c7';
const BLACK = '#1f1a16';

const FALL = ['transparent', RED, LEAF, SKY, BLACK, CRATE];
const FALL_DARK = ['transparent', RED, CRATE, LEAF, CRATE, SKY];
const BANDS = ['transparent', CRATE, LEAF, SKY, CRATE, RED];
const LEAVES = ['transparent', CRATE, SKY, CRATE, RED, BLACK];
const QUILT = ['transparent', CRATE, RED, SKY, BLACK, LEAF, CRATE, RED, SKY, LEAF];
const HEDGE = ['transparent', LEAF, RED, LEAF, SKY, LEAF];
const BONFIRE = ['transparent', RED, CRATE, SKY, RED];
const FOOT = ['transparent', CRATE, RED, SKY, LEAF, CRATE];

const NAV = [
  ['Ciders', '#ciders'],
  ['Orchard', '#orchard'],
  ['Tasting room', '#tasting'],
  ['Pressing day', '#pressing'],
  ['Wassail', '#wassail'],
  ['Visit', '#visit'],
];

type Variety = {
  name: string;
  kind: 'bittersweet' | 'bittersharp' | 'sharp' | 'sweet' | 'pear';
  kindLabel: string;
  from: number;
  to: number;
  month: string;
  trees: string;
  goes: string;
};

/* Harvest windows in weeks from 1 September. */
const VARIETIES: Variety[] = [
  { name: 'Foxwhelp', kind: 'bittersharp', kindLabel: 'Bittersharp', from: 0, to: 3, month: 'Early Sep', trees: '14', goes: 'Blends' },
  { name: 'Thorn pear', kind: 'pear', kindLabel: 'Perry pear', from: 1, to: 4, month: 'Sep', trees: '9', goes: 'Perry' },
  { name: 'Ellis Bitter', kind: 'bittersweet', kindLabel: 'Bittersweet', from: 2, to: 5, month: 'Late Sep', trees: '22', goes: 'Hollins Dry' },
  { name: 'Kingston Black', kind: 'bittersharp', kindLabel: 'Bittersharp', from: 5, to: 9, month: 'Oct', trees: '41', goes: 'Kingston Black' },
  { name: 'Brown\'s Apple', kind: 'sharp', kindLabel: 'Sharp', from: 5, to: 8, month: 'Oct', trees: '26', goes: 'Hollins Dry' },
  { name: 'Yarlington Mill', kind: 'bittersweet', kindLabel: 'Bittersweet', from: 6, to: 9, month: 'Oct', trees: '30', goes: 'Hollins Dry' },
  { name: 'Blakeney Red', kind: 'pear', kindLabel: 'Perry pear', from: 6, to: 9, month: 'Oct', trees: '12', goes: 'Perry' },
  { name: 'Sweet Coppin', kind: 'sweet', kindLabel: 'Sweet', from: 7, to: 10, month: 'Late Oct', trees: '18', goes: 'Scrumpy' },
  { name: 'Dabinett', kind: 'bittersweet', kindLabel: 'Bittersweet', from: 9, to: 12, month: 'Nov', trees: '40', goes: 'Hollins Dry' },
];

const MONTHS = ['September', 'October', 'November'];

const FLIGHTS = [
  { name: 'The four', note: 'A third of each of the ciders and the perry, on a board.', price: '$12' },
  { name: 'Kingston Black, three years', note: 'The same tree, pressed in three different autumns.', price: '$15' },
  { name: 'Perry and cheese', note: 'Two perries with Bramleigh Blue and a hard goat.', price: '$16' },
  { name: 'Juice for the driver', note: 'This year\'s pressed apple juice, as much as you like.', price: '$4' },
];

const HOURS = [
  ['Thursday', '12:00-18:00'],
  ['Friday', '12:00-22:00, lamplit from 18:00'],
  ['Saturday', '11:00-22:00, lamplit from 18:00'],
  ['Sunday', '11:00-17:00'],
  ['Monday to Wednesday', 'Closed; the shop by the gate is honesty-box'],
];

const PRESS_JOBS = [
  ['08:00', 'Gather', 'Pick up the windfalls in the long orchard, into sacks.'],
  ['10:00', 'Wash and mill', 'Tip them in the trough, then through the scratter.'],
  ['12:30', 'Lunch in the barn', 'Soup, bread, cheese and last year\'s Kingston Black.'],
  ['13:30', 'Build the cheese', 'Layer the pulp in cloths on the old twin-screw press.'],
  ['15:00', 'Press', 'Turn the screws, and carry the pomace out to the pigs.'],
];

const PRESS_GETS = [
  'Lunch, and tea all day',
  'A gallon of this year\'s juice to take home',
  'Your name chalked on the barrel it goes into',
  'A bottle of that barrel, next autumn',
];

const WASSAIL = [
  ['18:00', 'Lanterns lit at the gate, and the procession to the oldest tree'],
  ['18:30', 'Toast in the branches for the robins, and a cup poured on the roots'],
  ['19:00', 'Pots and pans, and the shotgun fired over the orchard'],
  ['19:30', 'The bonfire, mulled cider and the Bramleigh Morris'],
  ['21:00', 'Songs in the barn until the cider runs out'],
];

export default function WindfallCiderPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--crate': '#ead4a9',
        '--red': '#a8262b',
        '--leaf': '#3f6b35',
        '--sky': '#6fa8c7',
        '--black': '#1f1a16',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="crate,red,leaf,sky,black"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bevan&family=Asap+Condensed:ital,wght@0,400;0,600;0,700;1,400&family=Allerta+Stencil&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markApple} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Windfall</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Cider</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#visit">Book a tour</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.stack}>
        {/* ------------------------------------------------------------ HERO
            The first crate end: the farm's own label, pasted on the pine. */}
        <section className={`${s.crate} ${s.heroCrate}`} aria-labelledby="wc-hero-h">
          <p data-edit="wcHero.body" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">Hollins Farm 1931</p>
          <div className={`${s.label} ${s.heroLabel}`}>
            <div className={s.archWrap}>
            <div className={s.arch}>
              <div data-edit-pattern="wcHero.field" data-edit-roles="transparent,1,2,3,4,0" className={s.archField} aria-hidden="true">
                <TabbiedPattern
                  pattern={giornata}
                  palette={FALL}
                  fit="grid"
                  cellSize={44}
                  seed="windfall-fall"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.sun} aria-hidden="true" />
              <Artwork
                slug="windfall-cider-apple"
                alt="A whole red apple with two leaves, and another cut in half to show its core and seeds"
                inks={{ red: 'var(--red)', yellow: 'var(--crate)', blue: 'var(--leaf)', black: 'var(--black)' }}
                className={s.heroApple}
              />
            </div>
              <p className={s.seal}>
                <span data-edit="wcHero.sealTop" data-edit-max="60" className={s.sealTop}>Grown</span>
                <span data-edit="wcHero.sealMid" data-edit-max="60" className={s.sealMid}>Pressed</span>
                <span data-edit="wcHero.sealTop2" data-edit-max="60" className={s.sealTop}>Bottled here</span>
              </p>
            </div>

            <div className={s.heroText}>
              <svg className={s.ribbon} viewBox="0 0 440 120" aria-hidden="true">
                <path className={s.ribbonTail} d="M18 96 L52 84 L60 112 L26 120 L36 106 Z" />
                <path className={s.ribbonTail} d="M422 96 L388 84 L380 112 L414 120 L404 106 Z" />
                <path className={s.ribbonBand} d="M44 100 Q220 8 396 100" />
                <path id="wc-arc-hero" className={s.ribbonPath} d="M44 100 Q220 8 396 100" />
                <text className={s.ribbonText}>
                  <textPath href="#wc-arc-hero" startOffset="50%" textAnchor="middle" dominantBaseline="central">Hollins Farm, 1931</textPath>
                </text>
              </svg>
              <h1 id="wc-hero-h" className={s.title}>
                <span data-edit="wcHero.titleA" data-edit-max="60" className={s.titleA}>Windfall</span>
                <span data-edit="wcHero.titleB" data-edit-max="60" className={s.titleB}>Cider &amp; Perry</span>
              </h1>
              <p data-edit="wcHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Pressed from the fruit of 212 old trees in the long orchard on
                Lower Orchard Lane, the windfalls included. The tasting room is
                open Thursday to Sunday, and lamplit on Friday and Saturday
                nights.
              </p>
              <p className={s.actions}>
                <a data-edit="wcHero.btn" data-edit-max="28" className={s.btn} href="#ciders">The four ciders</a>
                <a data-edit="wcHero.btnLine" data-edit-max="28" className={s.btnLine} href="#visit">Book an orchard tour</a>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- CIDERS
            Four crate ends, one label each, the apple drawn in its colors. */}
        <section id="ciders" className={s.cidersSec} aria-labelledby="wc-ciders-h">
          <div className={s.secHead}>
            <h2 data-edit="ciders.secTitle" data-edit-max="60" id="wc-ciders-h" className={s.secTitle}>Our ciders</h2>
            <p data-edit="ciders.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Four from the one orchard, bottled in the barn and sold at the gate, in the tasting room and to three pubs in Bramleigh. Cases of twelve.</p>
          </div>
          <ul className={s.ciders}>
            <li className={s.crate}>
              <p data-edit="wcKb.body4" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">No. 1</p>
              <article className={`${s.label} ${s.ciderLabel} ${s.fieldBlack}`} aria-labelledby="wc-kb-h">
                <svg className={s.ribbon} viewBox="0 0 440 120" aria-hidden="true">
                  <path className={s.ribbonTail} d="M18 96 L52 84 L60 112 L26 120 L36 106 Z" />
                  <path className={s.ribbonTail} d="M422 96 L388 84 L380 112 L414 120 L404 106 Z" />
                  <path className={s.ribbonBand} d="M44 100 Q220 8 396 100" />
                  <path id="wc-arc-kb" className={s.ribbonPath} d="M44 100 Q220 8 396 100" />
                  <text className={s.ribbonText}>
                    <textPath href="#wc-arc-kb" startOffset="50%" textAnchor="middle" dominantBaseline="central">Kingston Black</textPath>
                  </text>
                </svg>
                <h3 data-edit="wcKb.srOnly" data-edit-max="40" id="wc-kb-h" className={s.srOnly}>Kingston Black</h3>
                <div className={s.ciderBody}>
                  <div className={s.window}>
                    <div data-edit-pattern="wcKb.field" data-edit-roles="transparent,1,0,2,0,3" className={s.windowField} aria-hidden="true">
                      <TabbiedPattern pattern={giornata} palette={FALL_DARK} fit="grid" cellSize={30} seed="windfall-kb" style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <Artwork slug="windfall-cider-apple" alt="The Kingston Black apple, whole and halved, in red with a pale cut face" inks={{ red: 'var(--red)', yellow: 'var(--crate)', blue: 'var(--leaf)', black: 'var(--black)' }} className={s.ciderApple} />
                  </div>
                  <div className={s.ciderText}>
                    <p className={s.stackType}>
                      <span data-edit="wcKb.text" data-edit-max="60">Single</span>
                      <span data-edit="wcKb.text2" data-edit-max="60">Variety</span>
                    </p>
                    <p data-edit="wcKb.abv" data-edit-max="240" data-edit-multiline className={s.abv}>7.2%</p>
                    <p data-edit="wcKb.notes" data-edit-max="240" data-edit-multiline className={s.notes}>Bittersharp and full, like a good red: tannin, dark fruit and a long dry finish.</p>
                  </div>
                </div>
                <dl className={s.specs}>
                  <div>
                    <dt data-edit="wcKb.term" data-edit-max="28">Fruit</dt>
                    <dd data-edit="wcKb.body" data-edit-max="200" data-edit-multiline>Kingston Black, from the 1931 trees</dd>
                  </div>
                  <div>
                    <dt data-edit="wcKb.term2" data-edit-max="28">Bottle</dt>
                    <dd data-edit="wcKb.body2" data-edit-max="200" data-edit-multiline>$14</dd>
                  </div>
                  <div>
                    <dt data-edit="wcKb.term3" data-edit-max="28">Case</dt>
                    <dd data-edit="wcKb.body3" data-edit-max="200" data-edit-multiline>$150</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li className={s.crate}>
              <p data-edit="wcKb.body5" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">No. 2</p>
              <article className={`${s.label} ${s.ciderLabel} ${s.fieldSky}`} aria-labelledby="wc-dry-h">
                <svg className={s.ribbon} viewBox="0 0 440 120" aria-hidden="true">
                  <path className={s.ribbonTail} d="M18 96 L52 84 L60 112 L26 120 L36 106 Z" />
                  <path className={s.ribbonTail} d="M422 96 L388 84 L380 112 L414 120 L404 106 Z" />
                  <path className={s.ribbonBand} d="M44 100 Q220 8 396 100" />
                  <path id="wc-arc-dry" className={s.ribbonPath} d="M44 100 Q220 8 396 100" />
                  <text className={s.ribbonText}>
                    <textPath href="#wc-arc-dry" startOffset="50%" textAnchor="middle" dominantBaseline="central">Hollins Dry</textPath>
                  </text>
                </svg>
                <h3 data-edit="wcDry.srOnly" data-edit-max="40" id="wc-dry-h" className={s.srOnly}>Hollins Dry</h3>
                <div className={s.ciderBody}>
                  <div className={s.window}>
                    <div data-edit-pattern="wcDry.field" data-edit-roles="transparent,0,2,3,0,1" className={s.windowField} aria-hidden="true">
                      <TabbiedPattern pattern={horizonbands} palette={BANDS} options={{ frequency: 0.5 }} fit="grid" cellSize={34} seed="windfall-dry" style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <Artwork slug="windfall-cider-apple" alt="A green apple, whole and halved" inks={{ red: 'var(--leaf)', yellow: 'var(--crate)', blue: 'var(--black)', black: 'var(--red)' }} className={s.ciderApple} />
                  </div>
                  <div className={s.ciderText}>
                    <p className={s.stackType}>
                      <span data-edit="wcDry.text" data-edit-max="60">Extra</span>
                      <span data-edit="wcDry.text2" data-edit-max="60">Dry</span>
                    </p>
                    <p data-edit="wcDry.abv" data-edit-max="240" data-edit-multiline className={s.abv}>6.0%</p>
                    <p data-edit="wcDry.notes" data-edit-max="240" data-edit-multiline className={s.notes}>Bone dry with a little smoke. The one we drink with lunch in the barn.</p>
                  </div>
                </div>
                <dl className={s.specs}>
                  <div>
                    <dt data-edit="wcDry.term" data-edit-max="28">Fruit</dt>
                    <dd data-edit="wcDry.body" data-edit-max="200" data-edit-multiline>Dabinett, Yarlington Mill and Brown&apos;s</dd>
                  </div>
                  <div>
                    <dt data-edit="wcDry.term2" data-edit-max="28">Bottle</dt>
                    <dd data-edit="wcDry.body2" data-edit-max="200" data-edit-multiline>$9</dd>
                  </div>
                  <div>
                    <dt data-edit="wcDry.term3" data-edit-max="28">Case</dt>
                    <dd data-edit="wcDry.body3" data-edit-max="200" data-edit-multiline>$96</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li className={s.crate}>
              <p data-edit="wcKb.body6" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">No. 3</p>
              <article className={`${s.label} ${s.ciderLabel} ${s.fieldLeaf}`} aria-labelledby="wc-perry-h">
                <svg className={s.ribbon} viewBox="0 0 440 120" aria-hidden="true">
                  <path className={s.ribbonTail} d="M18 96 L52 84 L60 112 L26 120 L36 106 Z" />
                  <path className={s.ribbonTail} d="M422 96 L388 84 L380 112 L414 120 L404 106 Z" />
                  <path className={s.ribbonBand} d="M44 100 Q220 8 396 100" />
                  <path id="wc-arc-perry" className={s.ribbonPath} d="M44 100 Q220 8 396 100" />
                  <text className={s.ribbonText}>
                    <textPath href="#wc-arc-perry" startOffset="50%" textAnchor="middle" dominantBaseline="central">Bramleigh Perry</textPath>
                  </text>
                </svg>
                <h3 data-edit="wcPerry.srOnly" data-edit-max="40" id="wc-perry-h" className={s.srOnly}>Bramleigh Perry</h3>
                <div className={s.ciderBody}>
                  <div className={s.window}>
                    <div data-edit-pattern="wcPerry.field" data-edit-roles="transparent,0,3,0,1,4" className={s.windowField} aria-hidden="true">
                      <TabbiedPattern pattern={foliage} palette={LEAVES} fit="grid" cellSize={30} seed="windfall-perry" style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <Artwork slug="windfall-cider-apple" alt="A pale gold fruit, whole and halved" inks={{ red: 'color-mix(in oklab, var(--crate) 55%, var(--leaf))', yellow: 'var(--crate)', blue: 'var(--black)', black: 'var(--leaf)' }} className={s.ciderApple} />
                  </div>
                  <div className={s.ciderText}>
                    <p className={s.stackType}>
                      <span data-edit="wcPerry.text" data-edit-max="60">Old</span>
                      <span data-edit="wcPerry.text2" data-edit-max="60">Perry</span>
                    </p>
                    <p data-edit="wcPerry.abv" data-edit-max="240" data-edit-multiline className={s.abv}>5.4%</p>
                    <p data-edit="wcPerry.notes" data-edit-max="240" data-edit-multiline className={s.notes}>Pale and soft with a light sparkle: pear drops, elderflower, a clean end.</p>
                  </div>
                </div>
                <dl className={s.specs}>
                  <div>
                    <dt data-edit="wcPerry.term" data-edit-max="28">Fruit</dt>
                    <dd data-edit="wcPerry.body" data-edit-max="200" data-edit-multiline>Thorn and Blakeney Red pears</dd>
                  </div>
                  <div>
                    <dt data-edit="wcPerry.term2" data-edit-max="28">Bottle</dt>
                    <dd data-edit="wcPerry.body2" data-edit-max="200" data-edit-multiline>$12</dd>
                  </div>
                  <div>
                    <dt data-edit="wcPerry.term3" data-edit-max="28">Case</dt>
                    <dd data-edit="wcPerry.body3" data-edit-max="200" data-edit-multiline>$130</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li className={s.crate}>
              <p data-edit="wcKb.body7" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">No. 4</p>
              <article className={`${s.label} ${s.ciderLabel} ${s.fieldRed}`} aria-labelledby="wc-scrumpy-h">
                <svg className={s.ribbon} viewBox="0 0 440 120" aria-hidden="true">
                  <path className={s.ribbonTail} d="M18 96 L52 84 L60 112 L26 120 L36 106 Z" />
                  <path className={s.ribbonTail} d="M422 96 L388 84 L380 112 L414 120 L404 106 Z" />
                  <path className={s.ribbonBand} d="M44 100 Q220 8 396 100" />
                  <path id="wc-arc-scrumpy" className={s.ribbonPath} d="M44 100 Q220 8 396 100" />
                  <text className={s.ribbonText}>
                    <textPath href="#wc-arc-scrumpy" startOffset="50%" textAnchor="middle" dominantBaseline="central">Old Scrumpy</textPath>
                  </text>
                </svg>
                <h3 data-edit="wcScrumpy.srOnly" data-edit-max="40" id="wc-scrumpy-h" className={s.srOnly}>Old Scrumpy</h3>
                <div className={s.ciderBody}>
                  <div className={s.window}>
                    <div data-edit-pattern="wcScrumpy.field" data-edit-roles="transparent,0,1,3,4,2,0,1,3,2" className={s.windowField} aria-hidden="true">
                      <TabbiedPattern pattern={quartercirclequilt} palette={QUILT} fit="grid" cellSize={36} seed="windfall-scrumpy" style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <Artwork slug="windfall-cider-apple" alt="A dark red apple, whole and halved" inks={{ red: 'color-mix(in oklab, var(--red) 55%, var(--black))', yellow: 'var(--crate)', blue: 'var(--leaf)', black: 'var(--black)' }} className={s.ciderApple} />
                  </div>
                  <div className={s.ciderText}>
                    <p className={s.stackType}>
                      <span data-edit="wcScrumpy.text" data-edit-max="60">Still</span>
                      <span data-edit="wcScrumpy.text2" data-edit-max="60">Cloudy</span>
                    </p>
                    <p data-edit="wcScrumpy.abv" data-edit-max="240" data-edit-multiline className={s.abv}>7.8%</p>
                    <p data-edit="wcScrumpy.notes" data-edit-max="240" data-edit-multiline className={s.notes}>Unfiltered, from the barrel, sold by the jug. Strong, sharp and honest.</p>
                  </div>
                </div>
                <dl className={s.specs}>
                  <div>
                    <dt data-edit="wcScrumpy.term" data-edit-max="28">Fruit</dt>
                    <dd data-edit="wcScrumpy.body" data-edit-max="200" data-edit-multiline>Every windfall in the orchard</dd>
                  </div>
                  <div>
                    <dt data-edit="wcScrumpy.term2" data-edit-max="28">Bottle</dt>
                    <dd data-edit="wcScrumpy.body2" data-edit-max="200" data-edit-multiline>$8 a litre jug</dd>
                  </div>
                  <div>
                    <dt data-edit="wcScrumpy.term3" data-edit-max="28">Case</dt>
                    <dd data-edit="wcScrumpy.body3" data-edit-max="200" data-edit-multiline>Bring your own</dd>
                  </div>
                </dl>
              </article>
            </li>
          </ul>
        </section>

        {/* --------------------------------------------------------- ORCHARD */}
        <section id="orchard" className={s.crate} aria-labelledby="wc-orchard-h">
          <p data-edit="orchard.body" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">Long orchard</p>
          <div className={s.label}>
            <div data-edit-pattern="orchard.field" data-edit-roles="transparent,2,1,2,3,2" className={s.hedge} aria-hidden="true">
              <TabbiedPattern
                pattern={foliage}
                palette={HEDGE}
                fit="grid"
                cellSize={30}
                seed="windfall-hedge"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.labelInner}>
              <div className={s.secHeadIn}>
                <h2 data-edit="orchard.secTitle" data-edit-max="60" id="wc-orchard-h" className={s.secTitle}>The orchard</h2>
                <p data-edit="orchard.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Nine varieties on twelve acres, most of them standard trees
                  planted by Walter Hollins between 1931 and 1954. We shake
                  nothing: the fruit falls when it is ready, and we pick it up.
                </p>
              </div>
              <div className={s.tableWrap}>
                <table className={s.varieties}>
                  <caption data-edit="orchard.srOnly" className={s.srOnly}>Apple and pear varieties in the orchard, their type, when they fall and what they go into</caption>
                  <thead>
                    <tr>
                      <th data-edit="orchard.heading" scope="col">Variety</th>
                      <th data-edit="orchard.heading2" scope="col">Type</th>
                      <th scope="col" className={s.calHead}>
                        <span className={s.months}>
                          {MONTHS.map((m, i) => (
                            <span data-edit={`orchard.text.${i}`} data-edit-max="60" key={m}>{m}</span>
                          ))}
                        </span>
                      </th>
                      <th data-edit="orchard.num" scope="col" className={s.num}>Trees</th>
                      <th data-edit="orchard.heading3" scope="col">Goes into</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VARIETIES.map((v, i) => (
                      <tr key={v.name}>
                        <th data-edit={`orchard.heading4.${i}`} scope="row">{v.name}</th>
                        <td>
                          <span data-edit={`orchard.kind.${i}`} data-edit-max="60" className={`${s.kind} ${s[v.kind]}`}>{v.kindLabel}</span>
                        </td>
                        <td className={s.cal}>
                          <span className={s.calTrack}>
                            <span
                              className={`${s.calBar} ${s[v.kind]}`}
                              style={{ left: `${(v.from / 13) * 100}%`, width: `${((v.to - v.from) / 13) * 100}%` }}
                            />
                          </span>
                          <span data-edit={`orchard.calText.${i}`} data-edit-max="60" className={s.calText}>{v.month}</span>
                        </td>
                        <td data-edit={`orchard.num2.${i}`} className={s.num}>{v.trees}</td>
                        <td data-edit={`orchard.cell.${i}`}>{v.goes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p data-edit="orchard.small" data-edit-max="240" data-edit-multiline className={s.small}>Bittersweet apples bring tannin and body, sharps bring acid, and the bittersharps bring both. Perry pears are a different tree altogether and live in the top field.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- TASTING ROOM
            One orchard, drawn twice: by day, and by the lamps at night. */}
        <section id="tasting" className={s.crate} aria-labelledby="wc-tasting-h">
          <p data-edit="tasting.body" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">Tasting room</p>
          <div className={s.label}>
            <div className={s.labelInner}>
              <div className={s.secHeadIn}>
                <h2 data-edit="tasting.secTitle" data-edit-max="60" id="wc-tasting-h" className={s.secTitle}>The tasting room</h2>
                <p data-edit="tasting.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  In the old press house, with the doors open onto the orchard.
                  Flights at the bar, bottles to take home, and on Friday and
                  Saturday nights the lamps go up in the trees.
                </p>
              </div>
              <div className={s.scenes}>
                <figure className={s.scene}>
                  <div className={`${s.sceneBox} ${s.day}`}>
                    <span className={s.daySun} aria-hidden="true" />
                    <Artwork
                      slug="windfall-cider-orchard"
                      alt="The orchard by day: rows of apple trees on rolling hills, the red barn, the press house and the winding lane"
                      inks={{ yellow: 'var(--day-field)', blue: 'var(--day-lane)', red: 'var(--red)', black: 'var(--day-tree)' }}
                      className={s.orchard}
                    />
                  </div>
                  <figcaption className={s.sceneCap}>
                    <span data-edit="tasting.sceneTitle" data-edit-max="60" className={s.sceneTitle}>By day</span>
                    <span data-edit="tasting.text" data-edit-max="60">Thursday to Sunday from noon. Flights at the bar, a table under the trees.</span>
                  </figcaption>
                </figure>
                <figure className={s.scene}>
                  <div className={`${s.sceneBox} ${s.night}`}>
                    <span className={s.moon} aria-hidden="true" />
                    <span className={s.stars} aria-hidden="true" />
                    <Artwork
                      slug="windfall-cider-orchard"
                      alt="The same orchard at night under a moon, the barn and press house windows lit"
                      inks={{ yellow: 'var(--night-field)', blue: 'var(--night-lane)', red: 'var(--night-barn)', black: 'var(--night-tree)' }}
                      className={s.orchard}
                    />
                    <span className={`${s.lamp} ${s.lampBarn}`} aria-hidden="true" />
                    <span className={`${s.lamp} ${s.lampPress}`} aria-hidden="true" />
                    <span className={`${s.lamp} ${s.lampTree1}`} aria-hidden="true" />
                    <span className={`${s.lamp} ${s.lampTree2}`} aria-hidden="true" />
                    <span className={`${s.lamp} ${s.lampTree3}`} aria-hidden="true" />
                    <span className={`${s.lamp} ${s.lampTree4}`} aria-hidden="true" />
                  </div>
                  <figcaption className={s.sceneCap}>
                    <span data-edit="tasting.sceneTitle2" data-edit-max="60" className={s.sceneTitle}>By night</span>
                    <span data-edit="tasting.text2" data-edit-max="60">Friday and Saturday from six, lamplit. Cheese boards, the fire, and the last bus at 22:40.</span>
                  </figcaption>
                </figure>
              </div>

              <div className={s.tastingGrid}>
                <div>
                  <h3 data-edit="tasting.boxTitle" data-edit-max="40" className={s.boxTitle}>Flights</h3>
                  <ul className={s.flights}>
                    {FLIGHTS.map((f, i) => (
                      <li key={f.name}>
                        <p data-edit={`tasting.flightName.${i}`} data-edit-max="240" data-edit-multiline className={s.flightName}>{f.name}</p>
                        <p data-edit={`tasting.flightNote.${i}`} data-edit-max="240" data-edit-multiline className={s.flightNote}>{f.note}</p>
                        <p data-edit={`tasting.flightPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.flightPrice}>{f.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 data-edit="tasting.boxTitle2" data-edit-max="40" className={s.boxTitle}>Opening hours</h3>
                  <dl className={s.hours}>
                    {HOURS.map(([day, time], i) => (
                      <div key={day}>
                        <dt data-edit={`tasting.term.${i}`} data-edit-max="28">{day}</dt>
                        <dd data-edit={`tasting.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- PRESSING DAY */}
        <section id="pressing" className={s.crate} aria-labelledby="wc-press-h">
          <p data-edit="pressing.body" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">Volunteers</p>
          <div className={`${s.label} ${s.bill}`}>
            <div className={s.billDate}>
              <p data-edit="pressing.billDay" data-edit-max="240" data-edit-multiline className={s.billDay}>Saturday</p>
              <p data-edit="pressing.billNum" data-edit-max="240" data-edit-multiline className={s.billNum}>18</p>
              <p data-edit="pressing.billMonth" data-edit-max="240" data-edit-multiline className={s.billMonth}>October</p>
              <p data-edit="pressing.billTime" data-edit-max="240" data-edit-multiline className={s.billTime}>08:00 till the juice stops</p>
            </div>
            <div className={s.billBody}>
              <h2 data-edit="pressing.billTitle" data-edit-max="60" id="wc-press-h" className={s.billTitle}>Pressing day</h2>
              <p data-edit="pressing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Once a year the whole orchard is pressed in a day, and we need
                about forty pairs of hands. No experience; wellingtons and old
                clothes. Children welcome with a grown-up.
              </p>
              <ol className={s.jobs}>
                {PRESS_JOBS.map(([time, job, note], i) => (
                  <li key={time}>
                    <span data-edit={`pressing.jobTime.${i}`} data-edit-max="60" className={s.jobTime}>{time}</span>
                    <span data-edit={`pressing.jobName.${i}`} data-edit-max="60" className={s.jobName}>{job}</span>
                    <span data-edit={`pressing.jobNote.${i}`} data-edit-max="60" className={s.jobNote}>{note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <aside className={s.billGets} aria-labelledby="wc-gets-h">
              <h3 data-edit="wcGets.boxTitle" data-edit-max="40" id="wc-gets-h" className={s.boxTitle}>You take home</h3>
              <ul>
                {PRESS_GETS.map((g, i) => (
                  <li data-edit={`wcGets.item.${i}`} data-edit-max="80" key={g}>{g}</li>
                ))}
              </ul>
              <a data-edit="wcGets.btn" data-edit-max="28" className={s.btn} href="#visit">Put my name down</a>
            </aside>
          </div>
        </section>

        {/* --------------------------------------------------------- WASSAIL */}
        <section id="wassail" className={s.crate} aria-labelledby="wc-wassail-h">
          <p data-edit="wassail.body" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">Twelfth Night</p>
          <div className={`${s.label} ${s.wassail}`}>
            <div data-edit-pattern="wassail.field" data-edit-roles="transparent,1,0,3,1" className={s.fire} aria-hidden="true">
              <TabbiedPattern
                pattern={sunsetrings}
                palette={BONFIRE}
                fit="grid"
                cellSize={48}
                seed="windfall-bonfire"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.wassailText}>
              <p data-edit="wassail.wassailKick" data-edit-max="240" data-edit-multiline className={s.wassailKick}>Old Twelvy Night, Saturday 17 January</p>
              <h2 data-edit="wassail.wassailTitle" data-edit-max="60" id="wc-wassail-h" className={s.wassailTitle}>The Wassail</h2>
              <p data-edit="wassail.wassailLede" data-edit-max="240" data-edit-multiline className={s.wassailLede}>
                We wake the trees for next year&apos;s crop the old way: toast in
                the branches, cider on the roots, and enough noise to see off
                anything that might be sleeping in them.
              </p>
              <ol className={s.program}>
                {WASSAIL.map(([time, what], i) => (
                  <li key={time}>
                    <span data-edit={`wassail.progTime.${i}`} data-edit-max="60" className={s.progTime}>{time}</span>
                    <span data-edit={`wassail.text.${i}`} data-edit-max="60">{what}</span>
                  </li>
                ))}
              </ol>
              <p className={s.wassailTicket}>
                <span data-edit="wassail.ticketPrice" data-edit-max="60" className={s.ticketPrice}>$15</span>
                <span data-edit="wassail.text2" data-edit-max="60">Tickets include a cup of mulled cider and a lantern. Children free. Book below; it sells out by Christmas.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.crate} aria-labelledby="wc-visit-h">
          <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.stencil} aria-hidden="true">Deliver to</p>
          <div className={s.label}>
            <div className={`${s.labelInner} ${s.visitGrid}`}>
              <div className={s.visitText}>
                <h2 data-edit="visit.secTitle" data-edit-max="60" id="wc-visit-h" className={s.secTitle}>Visit, and book a tour</h2>
                <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>Hollins Farm, Lower Orchard Lane, Bramleigh</p>
                <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Two miles out of Bramleigh on the Stowe road; turn left at the
                  red post box, and the farm is at the end of the lane. The 38
                  bus stops at the post box every hour until 22:40.
                </p>
                <ul className={s.tours}>
                  <li>
                    <span data-edit="visit.tourName" data-edit-max="60" className={s.tourName}>Orchard walk and tasting</span>
                    <span data-edit="visit.tourNote" data-edit-max="60" className={s.tourNote}>Saturdays and Sundays at 14:00, 90 minutes, $18</span>
                  </li>
                  <li>
                    <span data-edit="visit.tourName2" data-edit-max="60" className={s.tourName}>Pressing day</span>
                    <span data-edit="visit.tourNote2" data-edit-max="60" className={s.tourNote}>Saturday 18 October, volunteers, free</span>
                  </li>
                  <li>
                    <span data-edit="visit.tourName3" data-edit-max="60" className={s.tourName}>The Wassail</span>
                    <span data-edit="visit.tourNote3" data-edit-max="60" className={s.tourNote}>Saturday 17 January, from 18:00, $15</span>
                  </li>
                </ul>
                <p className={s.contact}>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550192214">(555) 019-2214</a>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:press@windfallcider.example">press@windfallcider.example</a>
                </p>
              </div>
              <form className={s.form} action="#">
                <h3 data-edit="visit.boxTitle" data-edit-max="40" className={s.boxTitle}>Book</h3>
                <div className={s.field}>
                  <label data-edit="visit.label" htmlFor="wc-name">Name</label>
                  <input id="wc-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="visit.label2" htmlFor="wc-email">Email</label>
                  <input id="wc-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <label data-edit="visit.label3" htmlFor="wc-what">What for</label>
                    <select id="wc-what" name="what" defaultValue="tour">
                      <option value="tour">Orchard walk and tasting</option>
                      <option value="press">Pressing day</option>
                      <option value="wassail">The Wassail</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="visit.label4" htmlFor="wc-people">People</label>
                    <input id="wc-people" name="people" type="number" min={1} max={20} defaultValue={2} />
                  </div>
                </div>
                <div className={s.field}>
                  <label data-edit="visit.label5" htmlFor="wc-date">Date</label>
                  <input id="wc-date" name="date" type="date" />
                </div>
                <button data-edit="visit.submit" data-edit-max="24" className={s.submit} type="submit">Send the booking</button>
                <p data-edit="visit.small" data-edit-max="240" data-edit-multiline className={s.small}>We confirm by email within a day. Tours run in all weathers; bring boots.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,1,3,2,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={giornata}
            palette={FOOT}
            fit="grid"
            cellSize={40}
            seed="windfall-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Windfall Cider</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional cidery. The farm, the trees, the ciders, the prices and the dates are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The apples and the orchard are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
