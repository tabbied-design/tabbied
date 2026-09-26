import { TabbiedPattern } from 'tabbied/react';
import { buttonhole, mercerising, corduroy, fustian, percale } from 'tabbied/patterns';
import s from './tack-and-button.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Tack & Button: Upholstery workshop, Weaver\'s Row',
  description:
    'Tack & Button re-covers and rebuilds chairs, sofas and headboards in a workshop on Weaver\'s Row. Prices by piece, how a seat is stripped and rebuilt, fabric by the meter from our swatch book, and pickup and delivery by van.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The ground is
   unbleached calico, the cloth under every top cover; the four velvets are
   the book's colors. The cover is the buttonhole design in oxblood with its
   holes left transparent, so the brass shows through like buttons on a
   deep-buttoned back. Each swatch in the book is a different weave. */
const CALICO = '#efe8dc';
const INK = '#221c1e';
const OXBLOOD = '#6e1f2b';
const BOTTLE = '#1f4a40';
const MIDNIGHT = '#26305a';
const BRASS = '#b98a2e';

const TUFTED = ['transparent', OXBLOOD];
const TOPCOVER = ['transparent', OXBLOOD];
const VELVET = ['transparent', BRASS, OXBLOOD, CALICO, OXBLOOD];
const CORD = ['transparent', INK, BOTTLE, INK];
const TWEED = ['transparent', MIDNIGHT, CALICO, MIDNIGHT, BRASS];
const TICKING = ['transparent', BRASS, INK, BRASS];
const DEEP = ['transparent', BOTTLE];

const NAV = [
  ['Prices', '#pieces'],
  ['The rebuild', '#rebuild'],
  ['Swatch book', '#swatches'],
  ['Your fabric', '#own'],
  ['The van', '#van'],
  ['Quote', '#quote'],
];

type Piece = { piece: string; note: string; labour: string; fabric: string; weeks: string };

const PIECES: Piece[] = [
  { piece: 'Dining chair, drop-in seat', note: 'Webbing, foam or fiber, calico, top cover', labour: '$85', fabric: '0.5 m', weeks: '2' },
  { piece: 'Dining chair, sprung seat', note: 'Springs retied, traditional stuffing', labour: '$180', fabric: '0.7 m', weeks: '3' },
  { piece: 'Footstool or ottoman', note: 'Piped edge, buttons if it had them', labour: '$220', fabric: '1.5 m', weeks: '3' },
  { piece: 'Headboard, double', note: 'Buttoned or plain, on a new ply back', labour: '$380', fabric: '2 m', weeks: '3' },
  { piece: 'Armchair', note: 'Full strip and rebuild, one seat cushion', labour: '$650-$950', fabric: '6 m', weeks: '5' },
  { piece: 'Wingback chair', note: 'Hand-stitched edges on the wings and arms', labour: '$900-$1,300', fabric: '7 m', weeks: '6' },
  { piece: 'Chesterfield, three seat', note: 'Deep buttoning, about 120 buttons', labour: '$2,400-$3,600', fabric: '14 m', weeks: '8' },
  { piece: 'Window seat cushion', note: 'Foam cut to a template of your window', labour: '$160', fabric: '1.5 m', weeks: '2' },
];

type Layer = { no: string; name: string; what: string; stage: string; kind: string };

/* A traditional seat, from the frame up. The stack is drawn top cover
   first, the way you see it, but numbered from the frame, the way we build. */
const LAYERS: Layer[] = [
  { no: '09', name: 'Wadding', what: 'Cotton skin wadding, so no stuffing works through the weave', stage: 'Cover', kind: 'lWad' },
  { no: '08', name: 'Calico', what: 'Pulled tight and tacked off: the shape is fixed at this stage', stage: 'Rebuild', kind: 'lCalico' },
  { no: '07', name: 'Second stuffing', what: 'Horsehair, teased by hand and laid in a dome', stage: 'Rebuild', kind: 'lHair' },
  { no: '06', name: 'Scrim and first stuffing', what: 'Coir, stitched into a firm edge you can sit on', stage: 'Rebuild', kind: 'lScrim' },
  { no: '05', name: 'Hessian', what: 'Heavy jute over the springs, stitched to each one', stage: 'Rebuild', kind: 'lHessian' },
  { no: '04', name: 'Springs', what: 'Copper-coated coils, tied eight ways with laid cord', stage: 'Rebuild', kind: 'lSprings' },
  { no: '03', name: 'Webbing', what: 'Jute webbing, stretched and tacked every inch', stage: 'Rebuild', kind: 'lWeb' },
  { no: '02', name: 'Frame', what: 'Stripped to the wood, joints knocked apart and re-glued', stage: 'Strip', kind: 'lFrame' },
];

const STAGES = [
  ['Strip', 'Every tack out, every layer off, down to bare wood. We photograph what we find and call you if the frame needs a joiner.'],
  ['Rebuild', 'New webbing, springs retied, stuffing reused where it is sound and replaced where it is not. This is the part that lasts fifty years.'],
  ['Cover', 'Your fabric, cut so the pattern sits true on every face, then piped, buttoned and tacked off by hand.'],
];

const MORE_FABRIC = [
  ['TB-0131', 'Linen union, natural', '$42 / m'],
  ['TB-0204', 'Wool bouclé, oatmeal', '$74 / m'],
  ['TB-0233', 'Leather hide, conker', '$9 / sq ft'],
  ['TB-0317', 'Chenille, moss', '$56 / m'],
  ['TB-0460', 'Mohair velvet, black', '$128 / m'],
  ['TB-0502', 'Cotton damask, ivory', '$61 / m'],
];

const OWN = [
  ['How much', 'Use the meters in the price list, plus a repeat: add 10% for a small pattern, 20% for a large one. We tell you exactly once we have measured.'],
  ['How tough', 'For chairs that get sat on daily, 25,000 rubs on the Martindale test or more. Curtain fabric will look lovely for a year.'],
  ['Fire', 'Every cover needs to pass the cigarette and match tests. If yours does not, we fit a barrier cloth under it, $12 a meter.'],
  ['Delivery', 'Have it sent straight to the workshop with your name on the parcel. We check it for flaws before we cut.'],
];

const ZONES = [
  { zone: 'Zone 1', reach: 'Within 5 miles', price: 'Free on jobs over $400' },
  { zone: 'Zone 2', reach: '5 to 15 miles', price: '$45 each way' },
  { zone: 'Zone 3', reach: '15 to 40 miles', price: '$90 each way' },
];

const PEOPLE = [
  { name: 'Agnes Mbeki', role: 'Master upholsterer', since: 'At the bench since 1991', note: 'Opened the workshop in 1998. Still does every deep-buttoned piece herself, and counts the buttons twice.' },
  { name: 'Pip Laurent', role: 'Cushions and sewing', since: 'Here since 2009', note: 'Runs the two industrial machines: piping, zips, box cushions and every pleat on a skirt.' },
  { name: 'Joe Harrow', role: 'Apprentice, third year', since: 'Here since 2023', note: 'Strips, webs and springs. Ask him about the newspapers from 1954 he found inside a sofa.' },
];

export default function TackAndButtonPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--calico': '#efe8dc',
        '--ink': '#221c1e',
        '--oxblood': '#6e1f2b',
        '--bottle': '#1f4a40',
        '--midnight': '#26305a',
        '--brass': '#b98a2e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="calico,ink,oxblood,bottle,midnight,brass"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Brygada+1918:ital,wght@0,400..700;1,400..700&family=Azeret+Mono:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Tack & Button</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Upholstery workshop</span>
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
            The cover of the swatch book: deep-buttoned oxblood with a brass
            label plate, beside the headline. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>No. 9 Weaver's Row. Upholsterers since 1998.</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Good chairs, <em>re-covered</em> for another fifty years.
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We strip old furniture to the frame, rebuild it the traditional
              way with webbing, springs and horsehair, and cover it in a fabric
              you chose from the book. Bring us the chair your grandmother sat
              in. We will not tell you to buy a new one.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#quote">Send us a photo</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="#pieces">What it costs</a>
            </div>
          </div>
          <div className={s.coverWrap}>
          <div className={s.cover}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2" className={s.tufted} aria-hidden="true">
              <TabbiedPattern
                pattern={buttonhole}
                palette={TUFTED}
                fit="grid"
                cellSize={30}
                seed="tack-cover"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.plate}>
              <p data-edit="hero.plateName" data-edit-max="240" data-edit-multiline className={s.plateName}>Swatch book</p>
              <p data-edit="hero.plateNo" data-edit-max="240" data-edit-multiline className={s.plateNo}>Vol. 7</p>
              <p data-edit="hero.plateNote" data-edit-max="240" data-edit-multiline className={s.plateNote}>Velvets, cords, tweeds and tickings, autumn</p>
            </div>
          </div>
          <div className={s.wingback}>
            <Artwork
              slug="tack-and-button-wingback"
              alt="A deep-buttoned velvet wingback armchair, seen at a three-quarter angle"
              inks={['var(--text)', 'var(--brass-light)']}
              className={s.wingbackArt}
            />
          </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- PIECES
            The price list, set as the book's index. */}
        <section id="pieces" className={s.sec} aria-labelledby="pieces-h">
          <div className={s.secHead}>
            <p data-edit="pieces.tab" data-edit-max="240" data-edit-multiline className={s.tab}>Section A</p>
            <h2 data-edit="pieces.secTitle" data-edit-max="60" id="pieces-h" className={s.secTitle}>What we re-cover, and roughly what it costs</h2>
            <p data-edit="pieces.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Labour and materials for the rebuild, not the top fabric. Every
              quote is fixed once we have seen the piece, and it holds for three
              months.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.pieces}>
              <caption data-edit="pieces.srOnly" className={s.srOnly}>Upholstery prices by piece</caption>
              <thead>
                <tr>
                  <th data-edit="pieces.heading" scope="col">Piece</th>
                  <th data-edit="pieces.heading2" scope="col">From</th>
                  <th data-edit="pieces.heading3" scope="col">Fabric</th>
                  <th data-edit="pieces.heading4" scope="col">Weeks</th>
                </tr>
              </thead>
              <tbody>
                {PIECES.map((p, i) => (
                  <tr key={p.piece}>
                    <th scope="row">
                      <span data-edit={`pieces.pieceName.${i}`} data-edit-max="60" className={s.pieceName}>{p.piece}</span>
                      <span data-edit={`pieces.pieceNote.${i}`} data-edit-max="60" className={s.pieceNote}>{p.note}</span>
                    </th>
                    <td data-edit={`pieces.pieceLabour.${i}`} className={s.pieceLabour}>{p.labour}</td>
                    <td data-edit={`pieces.cell.${i}`}>{p.fabric}</td>
                    <td data-edit={`pieces.cell2.${i}`}>{p.weeks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --------------------------------------------------------- REBUILD
            A seat cut through: every layer from the top cover down to the
            frame, grouped into the three stages of the job. */}
        <section id="rebuild" className={s.sec} aria-labelledby="rebuild-h">
          <div className={s.secHead}>
            <p data-edit="rebuild.tab" data-edit-max="240" data-edit-multiline className={s.tab}>Section B</p>
            <h2 data-edit="rebuild.secTitle" data-edit-max="60" id="rebuild-h" className={s.secTitle}>Strip, rebuild, cover</h2>
            <p data-edit="rebuild.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A traditional seat, cut through. A modern one swaps the springs and
              hair for webbing and foam; we do both, and tell you which the chair
              was built for.
            </p>
          </div>
          <div className={s.rebuild}>
            <ol className={s.layers}>
              <li className={s.layer}>
                <div data-edit-pattern="rebuild.field" data-edit-roles="transparent,2" className={`${s.layerBand} ${s.lTop}`} aria-hidden="true">
                  <TabbiedPattern
                    pattern={buttonhole}
                    palette={TOPCOVER}
                    fit="grid"
                    cellSize={24}
                    seed="tack-topcover"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <span data-edit="rebuild.layerNo" data-edit-max="60" className={s.layerNo}>10</span>
                <span data-edit="rebuild.layerName" data-edit-max="60" className={s.layerName}>Top cover</span>
                <span data-edit="rebuild.layerWhat" data-edit-max="60" className={s.layerWhat}>Pattern centered, piped, buttoned if it was, finished with close-nailed tacks or a braid</span>
                <span data-edit="rebuild.layerStage" data-edit-max="60" className={s.layerStage}>Cover</span>
              </li>
              {LAYERS.map((l, i) => (
                <li key={l.no} className={s.layer}>
                  <span className={`${s.layerBand} ${s[l.kind]}`} aria-hidden="true" />
                  <span data-edit={`rebuild.layerNo2.${i}`} data-edit-max="60" className={s.layerNo}>{l.no}</span>
                  <span data-edit={`rebuild.layerName2.${i}`} data-edit-max="60" className={s.layerName}>{l.name}</span>
                  <span data-edit={`rebuild.layerWhat2.${i}`} data-edit-max="60" className={s.layerWhat}>{l.what}</span>
                  <span data-edit={`rebuild.layerStage2.${i}`} data-edit-max="60" className={s.layerStage}>{l.stage}</span>
                </li>
              ))}
            </ol>
            <dl className={s.stages}>
              {STAGES.map(([t, d], i) => (
                <div key={t} className={s.stage}>
                  <dt>
                    <span className={s.stageNo}>{`0${i + 1}`}</span>
                    <span data-edit={`rebuild.stageName.${i}`} data-edit-max="60" className={s.stageName}>{t}</span>
                  </dt>
                  <dd data-edit={`rebuild.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* -------------------------------------------------------- SWATCHES
            The book itself: four swatches pinked and stapled to their cards. */}
        <section id="swatches" className={s.sec} aria-labelledby="swatches-h">
          <div className={s.secHead}>
            <p data-edit="swatches.tab" data-edit-max="240" data-edit-multiline className={s.tab}>Section C</p>
            <h2 data-edit="swatches.secTitle" data-edit-max="60" id="swatches-h" className={s.secTitle}>Fabric by the meter</h2>
            <p data-edit="swatches.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              All 140 cm wide unless it says so. Borrow the book for a weekend,
              or ask for cuttings to hold against your walls: five free, then a
              dollar each.
            </p>
          </div>
          <ul className={s.swatches}>
            <li className={s.swatch}>
              <div className={s.cloth}>
                <div data-edit-pattern="swatches.field" data-edit-roles="transparent,5,2,0,2" className={`${s.clothField} ${s.velvetGround}`} aria-hidden="true">
                  <TabbiedPattern
                    pattern={mercerising}
                    palette={VELVET}
                    fit="grid"
                    cellSize={40}
                    seed="tack-velvet"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <p data-edit="swatches.catNo" data-edit-max="240" data-edit-multiline className={s.catNo}>TB-0412</p>
              <h3 data-edit="swatches.clothName" data-edit-max="40" className={s.clothName}>Cotton velvet, oxblood</h3>
              <dl className={s.spec}>
                <div>
                  <dt data-edit="swatches.term" data-edit-max="28">Fiber</dt>
                  <dd data-edit="swatches.body" data-edit-max="200" data-edit-multiline>100% cotton pile</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term2" data-edit-max="28">Rubs</dt>
                  <dd data-edit="swatches.body2" data-edit-max="200" data-edit-multiline>45,000</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term3" data-edit-max="28">Per meter</dt>
                  <dd data-edit="swatches.body3" data-edit-max="200" data-edit-multiline>$68</dd>
                </div>
              </dl>
            </li>
            <li className={s.swatch}>
              <div className={s.cloth}>
                <div data-edit-pattern="swatches.field2" data-edit-roles="transparent,1,3,1" className={`${s.clothField} ${s.cordGround}`} aria-hidden="true">
                  <TabbiedPattern
                    pattern={corduroy}
                    palette={CORD}
                    fit="grid"
                    cellSize={32}
                    seed="tack-cord"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <p data-edit="swatches.catNo2" data-edit-max="240" data-edit-multiline className={s.catNo}>TB-0388</p>
              <h3 data-edit="swatches.clothName2" data-edit-max="40" className={s.clothName}>Basketweave, bottle</h3>
              <dl className={s.spec}>
                <div>
                  <dt data-edit="swatches.term4" data-edit-max="28">Fiber</dt>
                  <dd data-edit="swatches.body4" data-edit-max="200" data-edit-multiline>Wool and cotton</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term5" data-edit-max="28">Rubs</dt>
                  <dd data-edit="swatches.body5" data-edit-max="200" data-edit-multiline>60,000</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term6" data-edit-max="28">Per meter</dt>
                  <dd data-edit="swatches.body6" data-edit-max="200" data-edit-multiline>$54</dd>
                </div>
              </dl>
            </li>
            <li className={s.swatch}>
              <div className={s.cloth}>
                <div data-edit-pattern="swatches.field3" data-edit-roles="transparent,4,0,4,5" className={`${s.clothField} ${s.tweedGround}`} aria-hidden="true">
                  <TabbiedPattern
                    pattern={fustian}
                    palette={TWEED}
                    fit="grid"
                    cellSize={28}
                    seed="tack-tweed"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <p data-edit="swatches.catNo3" data-edit-max="240" data-edit-multiline className={s.catNo}>TB-0290</p>
              <h3 data-edit="swatches.clothName3" data-edit-max="40" className={s.clothName}>Wool tweed, midnight</h3>
              <dl className={s.spec}>
                <div>
                  <dt data-edit="swatches.term7" data-edit-max="28">Fiber</dt>
                  <dd data-edit="swatches.body7" data-edit-max="200" data-edit-multiline>100% wool, woven in Wales</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term8" data-edit-max="28">Rubs</dt>
                  <dd data-edit="swatches.body8" data-edit-max="200" data-edit-multiline>40,000</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term9" data-edit-max="28">Per meter</dt>
                  <dd data-edit="swatches.body9" data-edit-max="200" data-edit-multiline>$89</dd>
                </div>
              </dl>
            </li>
            <li className={s.swatch}>
              <div className={s.cloth}>
                <div data-edit-pattern="swatches.field4" data-edit-roles="transparent,5,1,5" className={`${s.clothField} ${s.tickGround}`} aria-hidden="true">
                  <TabbiedPattern
                    pattern={percale}
                    palette={TICKING}
                    fit="grid"
                    cellSize={36}
                    seed="tack-ticking"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <p data-edit="swatches.catNo4" data-edit-max="240" data-edit-multiline className={s.catNo}>TB-0175</p>
              <h3 data-edit="swatches.clothName4" data-edit-max="40" className={s.clothName}>Ticking stripe, brass</h3>
              <dl className={s.spec}>
                <div>
                  <dt data-edit="swatches.term10" data-edit-max="28">Fiber</dt>
                  <dd data-edit="swatches.body10" data-edit-max="200" data-edit-multiline>Linen and cotton</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term11" data-edit-max="28">Rubs</dt>
                  <dd data-edit="swatches.body11" data-edit-max="200" data-edit-multiline>30,000</dd>
                </div>
                <div>
                  <dt data-edit="swatches.term12" data-edit-max="28">Per meter</dt>
                  <dd data-edit="swatches.body12" data-edit-max="200" data-edit-multiline>$38</dd>
                </div>
              </dl>
            </li>
          </ul>
          <div className={s.more}>
            <h3 data-edit="swatches.moreTitle" data-edit-max="40" className={s.moreTitle}>Also in the book</h3>
            <ul className={s.moreList}>
              {MORE_FABRIC.map(([no, name, price], i) => (
                <li key={no}>
                  <span data-edit={`swatches.moreNo.${i}`} data-edit-max="60" className={s.moreNo}>{no}</span>
                  <span data-edit={`swatches.moreName.${i}`} data-edit-max="60" className={s.moreName}>{name}</span>
                  <span data-edit={`swatches.morePrice.${i}`} data-edit-max="60" className={s.morePrice}>{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- OWN */}
        <section id="own" className={s.sec} aria-labelledby="own-h">
          <div className={s.ownGrid}>
            <div>
              <p data-edit="own.tab" data-edit-max="240" data-edit-multiline className={s.tab}>Section D</p>
              <h2 data-edit="own.secTitle" data-edit-max="60" id="own-h" className={s.secTitle}>Bringing your own fabric</h2>
              <p data-edit="own.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Welcome, and no surcharge. A few things to check before you
                order it, because we cannot un-cut a meter.
              </p>
            </div>
            <dl className={s.own}>
              {OWN.map(([t, d], i) => (
                <div key={t}>
                  <dt data-edit={`own.term.${i}`} data-edit-max="28">{t}</dt>
                  <dd data-edit={`own.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------- VAN
            Three rings round the workshop, and the van's two days. */}
        <section id="van" className={s.vanSec} aria-labelledby="van-h">
          <div className={s.vanGrid}>
            <div className={s.vanText}>
              <p data-edit="van.tabLight" data-edit-max="240" data-edit-multiline className={s.tabLight}>Section E</p>
              <h2 data-edit="van.vanTitle" data-edit-max="60" id="van-h" className={s.vanTitle}>Pickup and delivery</h2>
              <p data-edit="van.vanLead" data-edit-max="240" data-edit-multiline className={s.vanLead}>
                The van goes out on Tuesdays and Fridays with two of us, blankets
                and a trolley. Stairs are fine. We wrap everything on the way back
                so it arrives as clean as it left the bench.
              </p>
              <ul className={s.zones}>
                {ZONES.map((z, i) => (
                  <li key={z.zone}>
                    <span data-edit={`van.zoneName.${i}`} data-edit-max="60" className={s.zoneName}>{z.zone}</span>
                    <span data-edit={`van.zoneReach.${i}`} data-edit-max="60" className={s.zoneReach}>{z.reach}</span>
                    <span data-edit={`van.zonePrice.${i}`} data-edit-max="60" className={s.zonePrice}>{z.price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="van.vanNote" data-edit-max="240" data-edit-multiline className={s.vanNote}>Dining sets: we leave four folding chairs with you while yours are away.</p>
            </div>
            <div className={s.rings} aria-hidden="true">
              <span className={`${s.ring} ${s.ring3}`} />
              <span className={`${s.ring} ${s.ring2}`} />
              <span className={`${s.ring} ${s.ring1}`} />
              <span className={s.pin} />
              <span data-edit="van.ringLabel" data-edit-max="60" className={`${s.ringLabel} ${s.rl1}`}>1</span>
              <span data-edit="van.ringLabel2" data-edit-max="60" className={`${s.ringLabel} ${s.rl2}`}>2</span>
              <span data-edit="van.ringLabel3" data-edit-max="60" className={`${s.ringLabel} ${s.rl3}`}>3</span>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- WORKSHOP */}
        <section id="workshop" className={s.sec} aria-labelledby="workshop-h">
          <div className={s.secHead}>
            <p data-edit="workshop.tab" data-edit-max="240" data-edit-multiline className={s.tab}>Section F</p>
            <h2 data-edit="workshop.secTitle" data-edit-max="60" id="workshop-h" className={s.secTitle}>At the bench</h2>
            <p data-edit="workshop.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Three of us, one long room, a radio and about nine thousand tacks.</p>
          </div>
          <ul className={s.people}>
            {PEOPLE.map((p, i) => (
              <li key={p.name} className={s.person}>
                <h3 data-edit={`workshop.personName.${i}`} data-edit-max="40" className={s.personName}>{p.name}</h3>
                <p data-edit={`workshop.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{p.role}</p>
                <p data-edit={`workshop.personSince.${i}`} data-edit-max="240" data-edit-multiline className={s.personSince}>{p.since}</p>
                <p data-edit={`workshop.personNote.${i}`} data-edit-max="240" data-edit-multiline className={s.personNote}>{p.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.sec} aria-labelledby="quote-h">
          <div className={s.quoteGrid}>
            <div>
              <p data-edit="quote.tab" data-edit-max="240" data-edit-multiline className={s.tab}>Section G</p>
              <h2 data-edit="quote.secTitle" data-edit-max="60" id="quote-h" className={s.secTitle}>Get a quote from a photo</h2>
              <p data-edit="quote.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Three photos do it: the front, the side, and underneath if you
                can tip it over. We reply within two working days with a price
                range and the meters of fabric it needs.
              </p>
              <div className={s.visit}>
                <p data-edit="quote.visitLine" data-edit-max="240" data-edit-multiline className={s.visitLine}>9 Weaver's Row, Old Dye Works, unit 4</p>
                <p data-edit="quote.visitLine2" data-edit-max="240" data-edit-multiline className={s.visitLine}>Tuesday to Saturday, 9 to 5. Drop-ins welcome, chairs too.</p>
                <p className={s.visitLine}>
                  <a data-edit="quote.link" data-edit-max="28" href="tel:+15550137740">(555) 013-7740</a>
                </p>
                <p className={s.visitLine}>
                  <a data-edit="quote.link2" data-edit-max="28" href="mailto:bench@tackandbutton.example">bench@tackandbutton.example</a>
                </p>
              </div>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="quote.label" htmlFor="tb-name">Name</label>
                <input id="tb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label2" htmlFor="tb-email">Email</label>
                <input id="tb-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label3" htmlFor="tb-piece">The piece</label>
                <select id="tb-piece" name="piece" defaultValue="armchair">
                  <option value="dining">Dining chairs</option>
                  <option value="armchair">Armchair</option>
                  <option value="wingback">Wingback</option>
                  <option value="sofa">Sofa or chesterfield</option>
                  <option value="headboard">Headboard</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="quote.label4" htmlFor="tb-how">How many</label>
                <input id="tb-how" name="count" type="text" inputMode="numeric" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="quote.legend">Fabric</legend>
                <div className={s.picks}>
                  <input id="tb-f1" type="radio" name="fabric" value="book" defaultChecked />
                  <label data-edit="quote.label5" htmlFor="tb-f1">From your book</label>
                  <input id="tb-f2" type="radio" name="fabric" value="own" />
                  <label data-edit="quote.label6" htmlFor="tb-f2">I have my own</label>
                  <input id="tb-f3" type="radio" name="fabric" value="unsure" />
                  <label data-edit="quote.label7" htmlFor="tb-f3">Not sure yet</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="quote.label8" htmlFor="tb-photos">Photos</label>
                <input id="tb-photos" name="photos" type="file" accept="image/*" multiple />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="quote.label9" htmlFor="tb-notes">What is wrong with it, if anything</label>
                <textarea id="tb-notes" name="notes" rows={4} />
              </div>
              <button data-edit="quote.submit" data-edit-max="24" className={s.submit} type="submit">Send for a quote</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3" className={s.footTufted} aria-hidden="true">
          <TabbiedPattern
            pattern={buttonhole}
            palette={DEEP}
            fit="grid"
            cellSize={32}
            seed="tack-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tack & Button</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional upholstery workshop. The fabrics, prices, people and address are invented.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The wingback is a generated image, drawn in the page's own colors.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
