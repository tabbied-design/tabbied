import { TabbiedPattern } from 'tabbied/react';
import { facetgrad, isocube, shatter, prismfold } from 'tabbied/patterns';
import s from './geode-and-co.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Geode & Co.: Rocks, minerals and fossils, Stonebury',
  description:
    'Minerals, crystals and fossils with proper museum labels at 19 Flint Lane, Stonebury. The specimen of the week, the mineral drawer, fossils, the Mohs scale, fossil dig parties and a free identification clinic.',
};

/* Site colors. The geode's crystals are gradient facets of amethyst and
   quartz; the same facets make the hardness rule, and the dig pit, the
   crystal lattice and the footer strata take the roles in turn. */
const SLATE = '#1b1d22';
const QUARTZ = '#edebe6';
const AMETHYST = '#7b4fb5';
const PYRITE = '#c9a43e';
const MALACHITE = '#2e8c69';

const CRYSTALS = [AMETHYST, QUARTZ, AMETHYST, QUARTZ, AMETHYST, QUARTZ];
const HARDNESS = [SLATE, QUARTZ, AMETHYST, PYRITE, MALACHITE, QUARTZ];
const DIGPIT = ['transparent', PYRITE, QUARTZ, SLATE, PYRITE, MALACHITE];
const LATTICE = ['transparent', MALACHITE, AMETHYST, QUARTZ, SLATE, PYRITE];
const STRATA = [SLATE, AMETHYST, PYRITE, MALACHITE, QUARTZ, AMETHYST];

const NAV = [
  ['This week', '#week'],
  ['The drawer', '#drawer'],
  ['Fossils', '#fossils'],
  ['Mohs scale', '#mohs'],
  ['Dig parties', '#parties'],
  ['ID clinic', '#clinic'],
  ['Visit', '#visit'],
];

type Formula = [string, string][];

type Specimen = {
  cat: string;
  name: string;
  formula: Formula;
  locality: string;
  system: string;
  hardness: string;
  size: string;
  price: string;
  slug: string;
  alt: string;
  inks: string[];
  tray: string;
};

/* The drawer: each specimen's picture takes its namesake color where
   there is one, over the dark ink of the slate. */
const DRAWER: Specimen[] = [
  {
    cat: 'GC 1187',
    name: 'Amethyst geode, half',
    formula: [['SiO', '2']],
    locality: 'Artigas, Uruguay',
    system: 'Trigonal',
    hardness: '7',
    size: '11 x 9 cm',
    price: '$120',
    slug: 'geode-and-co-amethyst',
    alt: 'A split amethyst geode, the hollow full of crystals',
    inks: ['var(--slate)', 'color-mix(in oklab, var(--amethyst) 70%, var(--quartz))'],
    tray: 'trayAmethyst',
  },
  {
    cat: 'GC 1203',
    name: 'Pyrite cubes',
    formula: [['FeS', '2']],
    locality: 'Navajun, La Rioja, Spain',
    system: 'Cubic',
    hardness: '6-6.5',
    size: '5 x 4 cm',
    price: '$85',
    slug: 'geode-and-co-pyrite',
    alt: 'A cluster of shiny cubic pyrite crystals',
    inks: ['var(--slate)', 'var(--pyrite)'],
    tray: 'trayPyrite',
  },
  {
    cat: 'GC 1164',
    name: 'Quartz point',
    formula: [['SiO', '2']],
    locality: 'Hot Springs, Arkansas',
    system: 'Trigonal',
    hardness: '7',
    size: '9 cm tall',
    price: '$38',
    slug: 'geode-and-co-quartz',
    alt: 'A single clear quartz crystal point standing upright',
    inks: ['var(--slate)', 'var(--quartz)'],
    tray: 'trayQuartz',
  },
  {
    cat: 'GC 1210',
    name: 'Ammonite, whole',
    formula: [['Aragonite shell, CaCO', '3']],
    locality: 'Charmouth, Dorset',
    system: 'Fossil, Jurassic',
    hardness: '3.5-4',
    size: '8 cm across',
    price: '$64',
    slug: 'geode-and-co-ammonite',
    alt: 'An ammonite fossil with its spiral clearly visible',
    inks: ['var(--slate)', 'color-mix(in oklab, var(--pyrite) 45%, var(--quartz))'],
    tray: 'trayAmmonite',
  },
  {
    cat: 'GC 1195',
    name: 'Malachite slab, polished',
    formula: [['Cu', '2'], ['CO', '3'], ['(OH)', '2']],
    locality: 'Kolwezi, Congo',
    system: 'Monoclinic',
    hardness: '3.5-4',
    size: '7 x 6 cm',
    price: '$56',
    slug: 'geode-and-co-malachite',
    alt: 'A polished slab of banded malachite with rounded edges',
    inks: ['var(--slate)', 'var(--malachite)'],
    tray: 'trayMalachite',
  },
];

const WEEK_FACTS = [
  ['Specimen', 'Pyrite on matrix'],
  ['Locality', 'Navajun, La Rioja, Spain'],
  ['Crystal system', 'Cubic'],
  ['Hardness', '6-6.5 (Mohs)'],
  ['Size', '6.2 x 5 x 4 cm, 212 g'],
  ['Price', '$145'],
];

const PERIODS = [
  { name: 'Cambrian', start: '541', cls: 'pCambrian' },
  { name: 'Ordovician', start: '485', cls: 'pOrdovician' },
  { name: 'Silurian', start: '444', cls: 'pSilurian' },
  { name: 'Devonian', start: '419', cls: 'pDevonian' },
  { name: 'Carboniferous', start: '359', cls: 'pCarboniferous' },
  { name: 'Permian', start: '299', cls: 'pPermian' },
  { name: 'Triassic', start: '252', cls: 'pTriassic' },
  { name: 'Jurassic', start: '201', cls: 'pJurassic' },
  { name: 'Cretaceous', start: '145', cls: 'pCretaceous' },
  { name: 'Cenozoic', start: '66', cls: 'pCenozoic' },
];

const FOSSILS = [
  { name: 'Trilobite, Elrathia kingii', period: 'Cambrian, 505 million years', from: 'Utah', price: '$42' },
  { name: 'Orthoceras plate, polished', period: 'Ordovician, 470 million years', from: 'Morocco', price: '$36' },
  { name: 'Fern frond in shale', period: 'Carboniferous, 305 million years', from: 'Mazon Creek, Illinois', price: '$55' },
  { name: 'Ammonite pair, cut and polished', period: 'Jurassic, 180 million years', from: 'Madagascar', price: '$48' },
  { name: 'Shark tooth, Otodus', period: 'Paleocene, 60 million years', from: 'Khouribga, Morocco', price: '$18' },
  { name: 'Sea urchin, Micraster', period: 'Cretaceous, 85 million years', from: 'Kent chalk', price: '$24' },
];

const MOHS = [
  { n: '1', mineral: 'Talc' },
  { n: '2', mineral: 'Gypsum' },
  { n: '3', mineral: 'Calcite' },
  { n: '4', mineral: 'Fluorite' },
  { n: '5', mineral: 'Apatite' },
  { n: '6', mineral: 'Orthoclase' },
  { n: '7', mineral: 'Quartz' },
  { n: '8', mineral: 'Topaz' },
  { n: '9', mineral: 'Corundum' },
  { n: '10', mineral: 'Diamond' },
];

const TOOLS = [
  { what: 'Fingernail', at: '2.5', cls: 't25' },
  { what: 'Copper coin', at: '3.5', cls: 't35' },
  { what: 'Knife, window glass', at: '5.5', cls: 't55' },
  { what: 'Steel file', at: '6.5', cls: 't65' },
];

const PARTY = [
  ['The dig', 'A sand pit in the back room with 30 real fossils buried in it, and a brush and trowel each.'],
  ['The finds', 'Every child keeps three: a shark tooth, an ammonite and a mystery, with labels to fill in.'],
  ['The talk', 'Twenty minutes with Dr. Ruth Okoye on how a fossil forms, with things to hold.'],
];

const CLINIC_STEPS = [
  ['Bring it', 'Anything you found on a beach, in a field or in a grandparent\'s shed. Up to five pieces each.'],
  ['We look', 'A hand lens, a streak plate, a scratch test and, if we need it, the UV lamp.'],
  ['You leave with', 'A name, a written label like the ones on this page, and where to find more.'],
];

const HOURS = [
  ['Tuesday to Friday', '10:00-17:30'],
  ['Saturday', '09:30-17:30'],
  ['Sunday', '11:00-16:00'],
  ['Monday', 'Closed'],
];

const renderFormula = (formula: Formula) =>
  formula.map(([text, sub], i) => (
    <span key={i}>
      {text}
      <sub>{sub}</sub>
    </span>
  ));

export default function GeodeAndCoPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--slate': '#1b1d22',
        '--quartz': '#edebe6',
        '--amethyst': '#7b4fb5',
        '--pyrite': '#c9a43e',
        '--malachite': '#2e8c69',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="slate,quartz,amethyst,pyrite,malachite"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Chivo+Mono:ital,wght@0,300..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandTile} aria-hidden="true">
            <span data-edit="bar.brandNo" data-edit-max="60" className={s.brandNo}>19</span>
            <span data-edit="bar.brandSym" data-edit-max="60" className={s.brandSym}>Gc</span>
          </span>
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Geode &amp; Co.</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>19 Flint Lane, Stonebury</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The window case: the geode under a spotlight, its crystals a
            field of gradient facets shaded by the photograph, and its label. */}
        <section className={s.hero} aria-labelledby="gc-hero-h">
          <div className={s.heroText}>
            <div className={s.heroTile} aria-hidden="true">
              <span data-edit="gcHero.tileNo" data-edit-max="60" className={s.tileNo}>19</span>
              <span data-edit="gcHero.tileSym" data-edit-max="60" className={s.tileSym}>Gc</span>
              <span data-edit="gcHero.tileName" data-edit-max="60" className={s.tileName}>Geodium</span>
              <span data-edit="gcHero.tileMass" data-edit-max="60" className={s.tileMass}>1987</span>
            </div>
            <p data-edit="gcHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Rocks, minerals and fossils, 19 Flint Lane, Stonebury</p>
            <h1 data-edit="gcHero.title" data-edit-max="70" id="gc-hero-h" className={s.title}>Geode &amp; Co.</h1>
            <p data-edit="gcHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              A shop of drawers and glass cases. Crystals from forty
              countries, fossils from the cliffs down the road, and every
              piece with a proper label: what it is, where it was found, and
              how hard it is.
            </p>
            <div className={s.actions}>
              <a data-edit="gcHero.btn" data-edit-max="28" className={s.btn} href="#drawer">Open the mineral drawer</a>
              <a data-edit="gcHero.btnLine" data-edit-max="28" className={s.btnLine} href="#clinic">Bring us a find</a>
            </div>
          </div>

          <figure className={s.case}>
            <div className={s.spot} aria-hidden="true" />
            <Artwork data-edit-pattern="gcHero.field" data-edit-roles="2,1,2,1,2,1"
              slug="geode-and-co-amethyst"
              alt="An amethyst geode split open, its hollow lined with crystals drawn as facets of color"
              mode="fill"
              inks={[]}
              className={s.geode}
            >
              <TabbiedPattern
                pattern={facetgrad}
                palette={CRYSTALS}
                fit="grid"
                cellSize={24}
                seed="geode-crystals"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
            <span className={s.plinth} aria-hidden="true" />
            <figcaption className={s.heroLabel}>
              <span data-edit="gcHero.labelCat" data-edit-max="60" className={s.labelCat}>GC 0001</span>
              <span data-edit="gcHero.labelName" data-edit-max="60" className={s.labelName}>Amethyst geode</span>
              <span data-edit="gcHero.labelLine" data-edit-max="60" className={s.labelLine}>Artigas, Uruguay. Not for sale.</span>
            </figcaption>
          </figure>
        </section>

        {/* ----------------------------------------------------------- WEEK */}
        <section id="week" className={s.sec} aria-labelledby="gc-week-h">
          <div className={s.secHead}>
            <p className={`${s.element} ${s.elPyrite}`} aria-hidden="true">
              <span data-edit="week.elNo" data-edit-max="60" className={s.elNo}>26</span>
              <span data-edit="week.elSym" data-edit-max="60" className={s.elSym}>Fe</span>
              <span data-edit="week.elName" data-edit-max="60" className={s.elName}>Iron</span>
            </p>
            <div>
              <p data-edit="week.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Specimen of the week</p>
              <h2 data-edit="week.title" data-edit-max="60" id="gc-week-h">Fool&apos;s gold, and nothing foolish about it</h2>
            </div>
          </div>

          <div className={s.weekGrid}>
            <div className={s.weekStage}>
              <Artwork
                slug="geode-and-co-pyrite"
                alt="A cluster of pyrite cubes, the specimen of the week"
                inks={['var(--slate)', 'color-mix(in oklab, var(--pyrite) 80%, var(--quartz))']}
                className={s.weekArt}
              />
              <span className={s.scaleBar} aria-hidden="true">
                <span data-edit="week.text" data-edit-max="60">0</span>
                <span data-edit="week.text2" data-edit-max="60">2 cm</span>
              </span>
            </div>

            <div className={s.bigLabel}>
              <p className={s.bigLabelTop}>
                <span data-edit="week.text3" data-edit-max="60">Geode &amp; Co., Stonebury</span>
                <span data-edit="week.labelCat" data-edit-max="60" className={s.labelCat}>GC 1188</span>
              </p>
              <p data-edit="week.bigLabelName" data-edit-max="240" data-edit-multiline className={s.bigLabelName}>Pyrite</p>
              <p className={s.bigLabelFormula}>{renderFormula([['FeS', '2']])}</p>
              <dl className={s.bigLabelFacts}>
                {WEEK_FACTS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`week.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`week.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="week.bigLabelNote" data-edit-max="240" data-edit-multiline className={s.bigLabelNote}>
                Three cubes grown through each other, straight from the clay
                at Navajun, where they form so perfectly square that the first
                collectors thought they had been cut. Not polished; that shine
                is natural.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- DRAWER
            The mineral drawer, pulled out: five trays in a row that scroll
            sideways, each specimen with its label card. */}
        <section id="drawer" className={s.sec} aria-labelledby="gc-drawer-h">
          <div className={s.secHead}>
            <p className={`${s.element} ${s.elAmethyst}`} aria-hidden="true">
              <span data-edit="drawer.elNo" data-edit-max="60" className={s.elNo}>14</span>
              <span data-edit="drawer.elSym" data-edit-max="60" className={s.elSym}>Si</span>
              <span data-edit="drawer.elName" data-edit-max="60" className={s.elName}>Silicon</span>
            </p>
            <div>
              <p data-edit="drawer.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Drawer 7 of 60</p>
              <h2 data-edit="drawer.title" data-edit-max="60" id="gc-drawer-h">The mineral drawer</h2>
            </div>
            <p data-edit="drawer.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Five from this week&apos;s drawer. Slide it sideways; the rest are in the shop.</p>
          </div>

          <div className={s.drawerFrame}>
            <ul className={s.drawer}>
              {DRAWER.map((sp, i) => (
                <li key={sp.cat} className={s.slot}>
                  <div className={`${s.tray} ${s[sp.tray]}`}>
                    <Artwork slug={sp.slug} alt={sp.alt} mode="tint" inks={sp.inks} className={s.trayArt} />
                  </div>
                  <div className={s.card}>
                    <p className={s.cardTop}>
                      <span data-edit={`drawer.labelCat.${i}`} data-edit-max="60" className={s.labelCat}>{sp.cat}</span>
                      <span data-edit={`drawer.cardPrice.${i}`} data-edit-max="60" className={s.cardPrice}>{sp.price}</span>
                    </p>
                    <h3 data-edit={`drawer.cardName.${i}`} data-edit-max="40" className={s.cardName}>{sp.name}</h3>
                    <p className={s.cardFormula}>{renderFormula(sp.formula)}</p>
                    <dl className={s.cardFacts}>
                      <div>
                        <dt data-edit={`drawer.term.${i}`} data-edit-max="28">Locality</dt>
                        <dd data-edit={`drawer.body.${i}`} data-edit-max="200" data-edit-multiline>{sp.locality}</dd>
                      </div>
                      <div>
                        <dt data-edit={`drawer.term2.${i}`} data-edit-max="28">System</dt>
                        <dd data-edit={`drawer.body2.${i}`} data-edit-max="200" data-edit-multiline>{sp.system}</dd>
                      </div>
                      <div>
                        <dt data-edit={`drawer.term3.${i}`} data-edit-max="28">Hardness</dt>
                        <dd data-edit={`drawer.body3.${i}`} data-edit-max="200" data-edit-multiline>{sp.hardness}</dd>
                      </div>
                      <div>
                        <dt data-edit={`drawer.term4.${i}`} data-edit-max="28">Size</dt>
                        <dd data-edit={`drawer.body4.${i}`} data-edit-max="200" data-edit-multiline>{sp.size}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
            <span className={s.drawerPull} aria-hidden="true" />
          </div>
        </section>

        {/* -------------------------------------------------------- FOSSILS */}
        <section id="fossils" className={s.sec} aria-labelledby="gc-fossil-h">
          <div className={s.secHead}>
            <p className={`${s.element} ${s.elQuartz}`} aria-hidden="true">
              <span data-edit="fossils.elNo" data-edit-max="60" className={s.elNo}>20</span>
              <span data-edit="fossils.elSym" data-edit-max="60" className={s.elSym}>Ca</span>
              <span data-edit="fossils.elName" data-edit-max="60" className={s.elName}>Calcium</span>
            </p>
            <div>
              <p data-edit="fossils.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Five hundred million years, one cabinet</p>
              <h2 data-edit="fossils.title" data-edit-max="60" id="gc-fossil-h">Fossils</h2>
            </div>
            <p data-edit="fossils.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Each one legally collected, and each with the rock it came from written on the back.</p>
          </div>

          <ol className={s.timescale}>
            {PERIODS.map((p, i) => (
              <li key={p.name} className={`${s.period} ${s[p.cls]}`}>
                <span data-edit={`fossils.periodName.${i}`} data-edit-max="60" className={s.periodName}>{p.name}</span>
                <span data-edit={`fossils.periodStart.${i}`} data-edit-max="60" className={s.periodStart}>{p.start}</span>
              </li>
            ))}
          </ol>
          <p data-edit="fossils.timescaleNote" data-edit-max="240" data-edit-multiline className={s.timescaleNote}>Millions of years ago, oldest on the left.</p>

          <div className={s.fossilGrid}>
            <figure className={s.fossilFeature}>
              <Artwork
                slug="geode-and-co-ammonite"
                alt="An ammonite fossil, its spiral chambers clear"
                inks={['var(--slate)', 'color-mix(in oklab, var(--quartz) 80%, var(--pyrite))']}
                className={s.fossilArt}
              />
              <figcaption className={s.fossilCaption}>
                <span data-edit="fossils.labelCat" data-edit-max="60" className={s.labelCat}>GC 1172</span>
                <span data-edit="fossils.text" data-edit-max="60">Dactylioceras, Whitby, Jurassic. $95</span>
              </figcaption>
            </figure>

            <ul className={s.fossilList}>
              {FOSSILS.map((f, i) => (
                <li key={f.name}>
                  <div>
                    <h3 data-edit={`fossils.title2.${i}`} data-edit-max="40">{f.name}</h3>
                    <p className={s.fossilMeta}>{`${f.period}. ${f.from}`}</p>
                  </div>
                  <p data-edit={`fossils.fossilPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.fossilPrice}>{f.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- MOHS */}
        <section id="mohs" className={s.sec} aria-labelledby="gc-mohs-h">
          <div className={s.secHead}>
            <p className={`${s.element} ${s.elSlate}`} aria-hidden="true">
              <span data-edit="mohs.elNo" data-edit-max="60" className={s.elNo}>6</span>
              <span data-edit="mohs.elSym" data-edit-max="60" className={s.elSym}>C</span>
              <span data-edit="mohs.elName" data-edit-max="60" className={s.elName}>Carbon</span>
            </p>
            <div>
              <p data-edit="mohs.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The scratch test</p>
              <h2 data-edit="mohs.title" data-edit-max="60" id="gc-mohs-h">How hard is it?</h2>
            </div>
            <p data-edit="mohs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Friedrich Mohs ranked ten minerals in 1812 by which scratches
              which. Anything scratches what is below it on the rule, and is
              scratched by what is above.
            </p>
          </div>

          <div className={s.mohs}>
            <ul className={s.tools}>
              {TOOLS.map((t, i) => (
                <li key={t.what} className={`${s.tool} ${s[t.cls]}`}>
                  <span data-edit={`mohs.toolAt.${i}`} data-edit-max="60" className={s.toolAt}>{t.at}</span>
                  <span data-edit={`mohs.toolWhat.${i}`} data-edit-max="60" className={s.toolWhat}>{t.what}</span>
                </li>
              ))}
            </ul>
            <div className={s.rule}>
              <div data-edit-pattern="mohs.field" data-edit-roles="0,1,2,3,4,1" className={s.ruleFacets} aria-hidden="true">
                <TabbiedPattern
                  pattern={facetgrad}
                  palette={HARDNESS}
                  fit="grid"
                  cellSize={28}
                  seed="geode-hardness"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ol className={s.ruleMarks}>
                {MOHS.map((m, i) => (
                  <li key={m.n}>
                    <span data-edit={`mohs.markNo.${i}`} data-edit-max="60" className={s.markNo}>{m.n}</span>
                    <span data-edit={`mohs.markMineral.${i}`} data-edit-max="60" className={s.markMineral}>{m.mineral}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p data-edit="mohs.mohsNote" data-edit-max="240" data-edit-multiline className={s.mohsNote}>
              The steps are not even: diamond, at 10, is about four times
              harder than corundum at 9. Scratch kits with all ten minerals,
              a streak plate and a lens are $34 at the counter.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- PARTIES */}
        <section id="parties" className={s.sec} aria-labelledby="gc-party-h">
          <div className={s.secHead}>
            <p className={`${s.element} ${s.elMalachite}`} aria-hidden="true">
              <span data-edit="parties.elNo" data-edit-max="60" className={s.elNo}>2</span>
              <span data-edit="parties.elSym" data-edit-max="60" className={s.elSym}>He</span>
              <span data-edit="parties.elName" data-edit-max="60" className={s.elName}>Helium</span>
            </p>
            <div>
              <p data-edit="parties.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Ages 6-11, Saturday afternoons</p>
              <h2 data-edit="parties.title" data-edit-max="60" id="gc-party-h">Fossil dig parties</h2>
            </div>
          </div>

          <div className={s.pit}>
            <div data-edit-pattern="parties.field" data-edit-roles="transparent,3,1,0,3,4" className={s.pitField} aria-hidden="true">
              <TabbiedPattern
                pattern={shatter}
                palette={DIGPIT}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={40}
                seed="geode-digpit"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.pitCard}>
              <dl className={s.pitList}>
                {PARTY.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`parties.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`parties.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.pitPrice}>
                <span data-edit="parties.pitFigure" data-edit-max="60" className={s.pitFigure}>$210</span>
                <span data-edit="parties.text" data-edit-max="60">for up to ten diggers, two hours, 14:00-16:00. Bring the cake; we bring the dust sheets.</span>
              </p>
              <a data-edit="parties.btn" data-edit-max="28" className={s.btn} href="#visit">Book a dig</a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CLINIC */}
        <section id="clinic" className={s.sec} aria-labelledby="gc-clinic-h">
          <div className={s.secHead}>
            <p className={`${s.element} ${s.elMalachite}`} aria-hidden="true">
              <span data-edit="clinic.elNo" data-edit-max="60" className={s.elNo}>29</span>
              <span data-edit="clinic.elSym" data-edit-max="60" className={s.elSym}>Cu</span>
              <span data-edit="clinic.elName" data-edit-max="60" className={s.elName}>Copper</span>
            </p>
            <div>
              <p data-edit="clinic.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>First Saturday of the month, 10:00-13:00</p>
              <h2 data-edit="clinic.title" data-edit-max="60" id="gc-clinic-h">The identification clinic</h2>
            </div>
            <p data-edit="clinic.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Free, no booking. Bring your finds to the big table at the back and we will tell you what they are.</p>
          </div>

          <div className={s.clinicGrid}>
            <ol className={s.clinicSteps}>
              {CLINIC_STEPS.map(([term, text], i) => (
                <li key={term}>
                  <span className={s.clinicNo}>{`0${i + 1}`}</span>
                  <h3 data-edit={`clinic.title2.${i}`} data-edit-max="40">{term}</h3>
                  <p data-edit={`clinic.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                </li>
              ))}
            </ol>
            <aside className={s.lattice} aria-labelledby="gc-dates-h">
              <div data-edit-pattern="gcDates.field" data-edit-roles="transparent,4,2,1,0,3" className={s.latticeField} aria-hidden="true">
                <TabbiedPattern
                  pattern={isocube}
                  palette={LATTICE}
                  options={{ frequency: 0.75 }}
                  fit="grid"
                  cellSize={30}
                  seed="geode-lattice"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.latticeCard}>
                <h3 data-edit="gcDates.latticeTitle" data-edit-max="40" id="gc-dates-h" className={s.latticeTitle}>Next clinics</h3>
                <ul className={s.dates}>
                  <li data-edit="gcDates.item" data-edit-max="80">Saturday 4 October</li>
                  <li data-edit="gcDates.item2" data-edit-max="80">Saturday 1 November</li>
                  <li data-edit="gcDates.item3" data-edit-max="80">Saturday 6 December</li>
                </ul>
                <p data-edit="gcDates.small" data-edit-max="240" data-edit-multiline className={s.small}>We do not value for insurance, and a meteorite is almost always slag. We will still look.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="gc-visit-h">
          <div className={s.secHead}>
            <p className={`${s.element} ${s.elPyrite}`} aria-hidden="true">
              <span data-edit="visit.elNo" data-edit-max="60" className={s.elNo}>79</span>
              <span data-edit="visit.elSym" data-edit-max="60" className={s.elSym}>Au</span>
              <span data-edit="visit.elName" data-edit-max="60" className={s.elName}>Gold</span>
            </p>
            <div>
              <p data-edit="visit.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Worth the trip</p>
              <h2 data-edit="visit.title" data-edit-max="60" id="gc-visit-h">19 Flint Lane, Stonebury</h2>
            </div>
          </div>

          <div className={s.visitGrid}>
            <div className={s.visitLabel}>
              <p className={s.bigLabelTop}>
                <span data-edit="visit.text" data-edit-max="60">Locality</span>
                <span data-edit="visit.labelCat" data-edit-max="60" className={s.labelCat}>GC 0019</span>
              </p>
              <p data-edit="visit.visitAddress" data-edit-max="240" data-edit-multiline className={s.visitAddress}>19 Flint Lane, Stonebury</p>
              <p data-edit="visit.visitText" data-edit-max="240" data-edit-multiline className={s.visitText}>
                Off the High Street by the museum steps, in the old
                saddler&apos;s with the bow window. Level entry, one step down
                to the fossil room.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={s.visitInfo}>
              <p className={s.contactLine}><a data-edit="visit.link" data-edit-max="28" href="tel:+15550157719">(555) 015-7719</a></p>
              <p className={s.contactLine}><a data-edit="visit.link2" data-edit-max="28" href="mailto:drawers@geodeandco.example">drawers@geodeandco.example</a></p>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>
                We buy collections, and we post anything that fits in a box.
                Parking behind the museum; the 22 bus stops at the market.
              </p>
              <form className={s.form} action="#">
                <p data-edit="visit.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Looking for something?</p>
                <div className={s.field}>
                  <label data-edit="visit.label" htmlFor="gc-want">Mineral or fossil</label>
                  <input id="gc-want" name="want" type="text" placeholder="A pink fluorite, under $60" />
                </div>
                <div className={s.field}>
                  <label data-edit="visit.label2" htmlFor="gc-email">Email</label>
                  <input id="gc-email" name="email" type="email" autoComplete="email" />
                </div>
                <button data-edit="visit.btn" data-edit-max="24" className={s.btn} type="submit">Put it on the list</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="0,2,3,4,1,2" className={s.strata} aria-hidden="true">
          <TabbiedPattern
            pattern={prismfold}
            palette={STRATA}
            fit="grid"
            cellSize={36}
            seed="geode-strata"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Geode &amp; Co.</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional rock, mineral and fossil shop. The specimens, labels, prices and people are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The geode, crystals and fossils are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
