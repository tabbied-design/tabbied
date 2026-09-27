import { TabbiedPattern } from 'tabbied/react';
import { schist, grosgrain, reeding, wale, corduroy } from 'tabbied/patterns';
import s from './crosscut-timber.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Crosscut Timber: Sawmill and timber yard, Oakenholt',
  description:
    'A sawmill and timber yard on Sawmill Lane, off the A38 at Oakenholt: oak, ash, douglas fir, larch, sweet chestnut and elm, milled to order, air-dried or kiln-dried, with firewood, delivery and quotes.',
};

/* Site colors: sawdust on the yard floor, the bark of a log, the orange
   of a stack tag and the pine of the drying shed. */
const SAWDUST = '#efe3cb';
const BARK = '#2b2119';
const ORANGE = '#e4632a';
const PINE = '#2e5a3f';

/* Sawn boards in parallel planes, behind the log stack. */
const PLANES = ['transparent', SAWDUST, ORANGE, SAWDUST, PINE];
/* Board ends along the top of the price board. */
const ENDS = ['transparent', SAWDUST, ORANGE, PINE];
/* The stickered stack in the drying shed. */
const STACK = [PINE, SAWDUST, ORANGE, SAWDUST, BARK];
/* Split logs in the firewood bay. */
const SPLITS = [BARK, SAWDUST, ORANGE, PINE, SAWDUST];
/* Furrowed fields along the delivery road. */
const FURROWS = ['transparent', PINE, SAWDUST, ORANGE, PINE];
/* The corduroy of a sawyer's jacket, along the foot. */
const CORD = ['transparent', SAWDUST, ORANGE, PINE];

const NAV = [
  ['Species', '#species'],
  ['Price list', '#prices'],
  ['Milling', '#milling'],
  ['Drying', '#drying'],
  ['Firewood', '#firewood'],
  ['Delivery', '#delivery'],
  ['Yard hours', '#hours'],
];

type Species = {
  lot: string;
  name: string;
  code: string;
  uses: string;
  stock: string;
  ad: string;
  kd: string;
  cuft: string;
};

const SPECIES: Species[] = [
  { lot: 'Lot 2291', name: 'English oak', code: 'QURO', uses: 'Beams, frames, flooring, gates and doors', stock: '27, 52, 75 and 100 mm boards; beams to 300 x 300', ad: '$62', kd: '$78', cuft: '14.2 cu ft' },
  { lot: 'Lot 2306', name: 'Ash', code: 'FXEX', uses: 'Tool handles, furniture, stair treads, steam bending', stock: '27, 38, 52 and 65 mm boards', ad: '$44', kd: '$56', cuft: '9.8 cu ft' },
  { lot: 'Lot 2312', name: 'Douglas fir', code: 'PSMN', uses: 'Framing, joists, cladding, decking', stock: '47 x 100 to 75 x 300; beams to 8 m', ad: '$32', kd: '$41', cuft: '31.5 cu ft' },
  { lot: 'Lot 2318', name: 'Larch', code: 'LADC', uses: 'Cladding, decking, boat planks, fence rails', stock: '22 x 150 cladding; 32 and 47 mm boards', ad: '$30', kd: '$38', cuft: '26.0 cu ft' },
  { lot: 'Lot 2324', name: 'Sweet chestnut', code: 'CTSV', uses: 'Posts, cleft pale fencing, cladding, benches', stock: 'Posts 100 x 100 to 1.8 m; 27 mm boards', ad: '$38', kd: '$49', cuft: '17.4 cu ft' },
  { lot: 'Lot 2330', name: 'Elm', code: 'ULMP', uses: 'Table tops, chair seats, waney-edge shelves', stock: 'Waney boards 50-75 mm, up to 700 mm wide', ad: '$58', kd: '$74', cuft: '8.6 cu ft' },
];

type Price = { species: string; size: string; grade: string; ad: string; kd: string };

const PRICES: Price[] = [
  { species: 'Oak', size: '1 in (27 mm)', grade: 'Prime', ad: '$5.20', kd: '$6.50' },
  { species: 'Oak', size: '2 in (52 mm)', grade: 'Character', ad: '$4.60', kd: '$5.90' },
  { species: 'Ash', size: '1 in (27 mm)', grade: 'Prime', ad: '$3.70', kd: '$4.70' },
  { species: 'Douglas fir', size: '2 x 6 in', grade: 'C24 structural', ad: '$2.70', kd: '$3.40' },
  { species: 'Larch', size: '7/8 x 6 in', grade: 'Cladding', ad: '$2.50', kd: '$3.20' },
  { species: 'Sweet chestnut', size: '1 in (27 mm)', grade: 'Prime', ad: '$3.20', kd: '$4.10' },
  { species: 'Elm', size: '2 in waney edge', grade: 'Character', ad: '$4.80', kd: '$6.20' },
];

const MILL_FACTS = [
  ['1.2 m', 'the widest log the carriage takes'],
  ['6 m', 'the longest, end to end'],
  ['$95', 'an hour on our mill, two hours minimum'],
  ['$140', 'an hour on your land, plus the travel'],
];

const MILL_STEPS = [
  ['Ring us', 'With the species, the length and the girth at chest height, and a photo if you can.'],
  ['Bring it or we fetch it', 'Our timber crane lifts up to 2.5 tonnes. Collection is priced like delivery.'],
  ['We saw your list', 'Through and through, quarter-sawn or beams boxed out of the heart, in the order you choose.'],
  ['Stickered or straight home', 'Take it green, or leave it in our shed to air-dry at $3 a cubic foot a year.'],
];

type Drying = { term: string; ad: string; kd: string };

const DRYING: Drying[] = [
  { term: 'Moisture', ad: '18-22%, whatever the weather lets it reach', kd: '10-12%, or 8% for furniture that lives indoors' },
  { term: 'Time', ad: 'About a year for every inch of thickness', kd: 'Two to four weeks in the kiln after air-drying' },
  { term: 'Movement', ad: 'Will shrink a little more once it comes inside', kd: 'Stable, if it is kept dry until it is used' },
  { term: 'Best for', ad: 'Frames, cladding, gates, fencing, anything outdoors', kd: 'Joinery, flooring, furniture, anything heated' },
  { term: 'Price', ad: 'The list price', kd: 'About a quarter more' },
];

type Firewood = { name: string; detail: string; price: string };

const FIREWOOD: Firewood[] = [
  { name: 'Seasoned hardwood logs', detail: 'Oak and ash, split to 25 cm, under 20% moisture, in a 1 cubic metre bag', price: '$135' },
  { name: 'Half bag of logs', detail: 'The same logs, for a small stove or a first try', price: '$75' },
  { name: 'Offcut bundle', detail: 'Oak and ash ends, good for a workshop or a fire pit', price: '$15' },
  { name: 'Kindling net', detail: 'Softwood, split fine, kiln-dried with the boards', price: '$6' },
  { name: 'Sawdust sack', detail: 'For animal bedding, compost or the smoker. Bring a bag', price: 'Free' },
  { name: 'Bark chip, tonne bag', detail: 'Douglas fir and larch bark for paths and borders', price: '$40' },
];

type Zone = { zone: string; key: string; reach: string; places: string; price: string; from: string; to: string };

const ZONES: Zone[] = [
  { zone: 'Zone 1', key: '1', reach: 'Up to 10 miles', places: 'Oakenholt, Castle Brook, Linthwaite', price: '$35', from: '0%', to: '25%' },
  { zone: 'Zone 2', key: '2', reach: '10-25 miles', places: 'Hadley Cross, Monks Heath, the Ford villages', price: '$60', from: '25%', to: '62%' },
  { zone: 'Zone 3', key: '3', reach: '25-40 miles', places: 'Wrenbury, Arden Vale, the coast road', price: '$95', from: '62%', to: '100%' },
];

const HOURS = [
  ['Monday to Friday', '07:30-17:00'],
  ['Saturday', '08:00-12:30'],
  ['Sunday', 'Closed'],
  ['Bank holidays', 'Closed'],
];

export default function CrosscutTimberPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sawdust': '#efe3cb',
        '--bark': '#2b2119',
        '--orange': '#e4632a',
        '--pine': '#2e5a3f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sawdust,bark,orange,pine"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Staatliches&family=Graduate&family=Asap:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markRings} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Crosscut Timber</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#quote">Get a quote</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The log stack, full bleed, with sawn planes showing through the
            gaps; the name sits on a dark panel only where it is read. */}
        <section className={s.hero} aria-labelledby="ct-hero-h">
          <div data-edit-pattern="ctHero.field" data-edit-roles="transparent,0,2,0,3" className={s.planes} aria-hidden="true">
            <TabbiedPattern
              pattern={schist}
              palette={PLANES}
              fit="grid"
              cellSize={48}
              seed="crosscut-planes"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.logs}>
            <Artwork
              slug="crosscut-timber-logs"
              alt="The cut ends of a big stack of logs, every end showing its growth rings"
              inks={['var(--bark)', 'var(--log-light)']}
              fit="cover"
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroPanel}>
              <p data-edit="ctHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Sawmill and timber yard, Oakenholt</p>
              <h1 data-edit="ctHero.name" data-edit-max="70" id="ct-hero-h" className={s.name}>Crosscut Timber</h1>
              <p data-edit="ctHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Home-grown hardwood and softwood, sawn on our band mill and
                stacked to dry in the yard. Come and pick your boards, bring
                us a log, or send a cutting list and we will deliver it.
              </p>
              <div className={s.heroActions}>
                <a data-edit="ctHero.btn" data-edit-max="28" className={s.btn} href="#quote">Send a cutting list</a>
                <a data-edit="ctHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#species">See what is in the yard</a>
              </div>
            </div>
            <div className={s.heroTag}>
              <span className={s.staple} aria-hidden="true" />
              <p data-edit="ctHero.tagLot" data-edit-max="240" data-edit-multiline className={s.tagLot}>Lot 2291</p>
              <p data-edit="ctHero.tagSpecies" data-edit-max="240" data-edit-multiline className={s.tagSpecies}>English oak</p>
              <p data-edit="ctHero.tagSize" data-edit-max="240" data-edit-multiline className={s.tagSize}>27 x 200 mm, 2.4-3.6 m</p>
              <p data-edit="ctHero.tagCuft" data-edit-max="240" data-edit-multiline className={s.tagCuft}>14.2 cu ft</p>
            </div>
            <p className={`${s.stamp} ${s.heroStamp}`}>
              <span data-edit="ctHero.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
              <span className={s.stampLines}>
                <span data-edit="ctHero.text" data-edit-max="60">Crosscut</span>
                <span data-edit="ctHero.text2" data-edit-max="60">Oakenholt</span>
                <span data-edit="ctHero.text3" data-edit-max="60">Est. 1962</span>
              </span>
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- SPECIES
            Six stack tags, one stapled to each stack in the yard. */}
        <section id="species" className={s.sec} aria-labelledby="ct-species-h">
          <div className={s.secHead}>
            <p className={`${s.stamp} ${s.stamp_orange}`}>
              <span data-edit="species.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
              <span className={s.stampLines}>
                <span data-edit="species.text" data-edit-max="60">Crosscut</span>
                <span data-edit="species.text2" data-edit-max="60">Species</span>
                <span data-edit="species.text3" data-edit-max="60">6 in stock</span>
              </span>
            </p>
            <h2 data-edit="species.secTitle" data-edit-max="60" id="ct-species-h" className={s.secTitle}>Species in the yard</h2>
            <p data-edit="species.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Everything here grew within sixty miles of the mill, felled for
              forestry, storm damage or a tree surgeon&apos;s job. The tag on
              each stack is the one we staple on when it is sawn.
            </p>
          </div>
          <ul className={s.tags}>
            {SPECIES.map((sp, i) => (
              <li key={sp.lot} className={s.tag}>
                <span className={s.staple} aria-hidden="true" />
                <p className={s.tagTop}>
                  <span data-edit={`species.tagLotSmall.${i}`} data-edit-max="60" className={s.tagLotSmall}>{sp.lot}</span>
                  <span data-edit={`species.tagCode.${i}`} data-edit-max="60" className={s.tagCode}>{sp.code}</span>
                </p>
                <h3 data-edit={`species.tagName.${i}`} data-edit-max="40" className={s.tagName}>{sp.name}</h3>
                <dl className={s.tagFacts}>
                  <div>
                    <dt data-edit={`species.term.${i}`} data-edit-max="28">Good for</dt>
                    <dd data-edit={`species.body.${i}`} data-edit-max="200" data-edit-multiline>{sp.uses}</dd>
                  </div>
                  <div>
                    <dt data-edit={`species.term2.${i}`} data-edit-max="28">Stock sizes</dt>
                    <dd data-edit={`species.body2.${i}`} data-edit-max="200" data-edit-multiline>{sp.stock}</dd>
                  </div>
                  <div>
                    <dt data-edit={`species.term3.${i}`} data-edit-max="28">In the stack</dt>
                    <dd data-edit={`species.body3.${i}`} data-edit-max="200" data-edit-multiline>{sp.cuft}</dd>
                  </div>
                </dl>
                <p className={s.tagPrice}>
                  <span className={s.tagPriceItem}>
                    <strong data-edit={`species.emphasis.${i}`}>{sp.ad}</strong>
                    <small data-edit={`species.note.${i}`}>cu ft, air-dried</small>
                  </span>
                  <span className={s.tagPriceItem}>
                    <strong data-edit={`species.emphasis2.${i}`}>{sp.kd}</strong>
                    <small data-edit={`species.note2.${i}`}>cu ft, kiln-dried</small>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="ct-prices-h">
          <div className={s.priceBoard}>
            <div data-edit-pattern="prices.field" data-edit-roles="transparent,0,2,3" className={s.boardEnds} aria-hidden="true">
              <TabbiedPattern
                pattern={grosgrain}
                palette={ENDS}
                fit="grid"
                cellSize={28}
                seed="crosscut-ends"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.boardHead}>
              <p className={`${s.stamp} ${s.stamp_bark}`}>
                <span data-edit="prices.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
                <span className={s.stampLines}>
                  <span data-edit="prices.text" data-edit-max="60">Grade</span>
                  <span data-edit="prices.text2" data-edit-max="60">Prime and</span>
                  <span data-edit="prices.text3" data-edit-max="60">Character</span>
                </span>
              </p>
              <h2 data-edit="prices.boardTitle" data-edit-max="60" id="ct-prices-h" className={s.boardTitle}>Board-foot price list</h2>
              <p data-edit="prices.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>
                One board foot is 12 x 12 inches, one inch thick. A cubic foot
                is twelve of them. Prices include sawing to width; planing is
                $0.60 a board foot more.
              </p>
            </div>
            <div className={s.priceWrap}>
              <table className={s.prices}>
                <caption data-edit="prices.srOnly" className={s.srOnly}>Price per board foot by species, thickness and grade, air-dried and kiln-dried</caption>
                <thead>
                  <tr>
                    <th data-edit="prices.heading" scope="col">Species</th>
                    <th data-edit="prices.heading2" scope="col">Thickness</th>
                    <th data-edit="prices.colGrade" scope="col" className={s.colGrade}>Grade</th>
                    <th data-edit="prices.num" scope="col" className={s.num}>Air-dried</th>
                    <th data-edit="prices.num2" scope="col" className={s.num}>Kiln-dried</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map((p, i) => (
                    <tr key={`${p.species}-${p.size}`}>
                      <th data-edit={`prices.heading3.${i}`} scope="row">{p.species}</th>
                      <td data-edit={`prices.cell.${i}`}>{p.size}</td>
                      <td data-edit={`prices.colGrade2.${i}`} className={s.colGrade}>{p.grade}</td>
                      <td className={s.num}>
                        <span data-edit={`prices.cellLabel.${i}`} data-edit-max="60" className={s.cellLabel}>Air-dried</span>
                        {p.ad}
                      </td>
                      <td className={s.num}>
                        <span data-edit={`prices.cellLabel2.${i}`} data-edit-max="60" className={s.cellLabel}>Kiln-dried</span>
                        {p.kd}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p data-edit="prices.worked" data-edit-max="240" data-edit-multiline className={s.worked}>
              Worked out: a 2.4 m oak board, 27 x 200 mm, is 5.2 board feet.
              That is $27 air-dried or $34 kiln-dried.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- MILLING
            The band mill, with its capacity drawn on it. */}
        <section id="milling" className={s.sec} aria-labelledby="ct-mill-h">
          <div className={s.secHead}>
            <p className={`${s.stamp} ${s.stamp_pine}`}>
              <span data-edit="milling.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
              <span className={s.stampLines}>
                <span data-edit="milling.text" data-edit-max="60">Mobile mill</span>
                <span data-edit="milling.text2" data-edit-max="60">1.2 x 6 m</span>
                <span data-edit="milling.text3" data-edit-max="60">To order</span>
              </span>
            </p>
            <h2 data-edit="milling.secTitle" data-edit-max="60" id="ct-mill-h" className={s.secTitle}>Milling to order</h2>
            <p data-edit="milling.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              A tree down in the garden, a field oak you want as a table, a
              barn frame for your own land: we saw it on our mill, or bring
              the mobile mill to you.
            </p>
          </div>
          <div className={s.millGrid}>
            <figure className={s.sawFig}>
              <div className={s.saw}>
                <Artwork
                  slug="crosscut-timber-bandsaw"
                  alt="Our band mill, engraved: a log on the carriage between the two wheels of the saw"
                  inks={['var(--text)']}
                  className={s.sawArt}
                />
                <span className={s.dimDia} aria-hidden="true">
                  <span data-edit="milling.dimLabel" data-edit-max="60" className={s.dimLabel}>1.2 m</span>
                </span>
                <span className={s.dimLen} aria-hidden="true">
                  <span data-edit="milling.dimLabel2" data-edit-max="60" className={s.dimLabel}>6 m</span>
                </span>
              </div>
              <figcaption data-edit="milling.sawCap" data-edit-max="120" data-edit-multiline className={s.sawCap}>The Crosscut band mill: logs up to 1.2 m across and 6 m long.</figcaption>
            </figure>
            <div className={s.millText}>
              <dl className={s.millFacts}>
                {MILL_FACTS.map(([value, what], i) => (
                  <div key={what}>
                    <dt data-edit={`milling.term.${i}`} data-edit-max="28">{value}</dt>
                    <dd data-edit={`milling.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
              <ol className={s.millSteps}>
                {MILL_STEPS.map(([name, body], i) => (
                  <li key={name}>
                    <h3 data-edit={`milling.stepName.${i}`} data-edit-max="40" className={s.stepName}>{name}</h3>
                    <p data-edit={`milling.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{body}</p>
                  </li>
                ))}
              </ol>
              <p data-edit="milling.millNote" data-edit-max="240" data-edit-multiline className={s.millNote}>
                Every log is swept with a metal detector first. A nail we miss
                costs a blade, and we charge $45 for it.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- DRYING */}
        <section id="drying" className={s.drying} aria-labelledby="ct-dry-h">
          <div className={s.dryInner}>
            <div className={s.secHead}>
              <p className={`${s.stamp} ${s.stamp_orange}`}>
                <span data-edit="drying.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
                <span className={s.stampLines}>
                  <span data-edit="drying.text" data-edit-max="60">KD 12%</span>
                  <span data-edit="drying.text2" data-edit-max="60">AD 20%</span>
                  <span data-edit="drying.text3" data-edit-max="60">Stickered</span>
                </span>
              </p>
              <h2 data-edit="drying.secTitle" data-edit-max="60" id="ct-dry-h" className={s.secTitle}>Air-dried or kiln-dried?</h2>
              <p data-edit="drying.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                The same boards, dried two ways. Tell us where the wood will
                live and we will say which to buy.
              </p>
            </div>
            <div data-edit-pattern="drying.field" data-edit-roles="3,0,2,0,1" className={s.stack} aria-hidden="true">
              <TabbiedPattern
                pattern={schist}
                palette={STACK}
                fit="grid"
                cellSize={32}
                seed="crosscut-stack"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.compare}>
              <div className={s.compareHead}>
                <span />
                <p className={s.compareCol}>
                  <span className={s.gauge} style={{ '--m': '64%' } as React.CSSProperties} aria-hidden="true" />
                  <span data-edit="drying.gaugeNum" data-edit-max="60" className={s.gaugeNum}>About 20% moisture</span>
                  <span data-edit="drying.compareName" data-edit-max="60" className={s.compareName}>Air-dried</span>
                </p>
                <p className={s.compareCol}>
                  <span className={s.gauge} style={{ '--m': '34%' } as React.CSSProperties} aria-hidden="true" />
                  <span data-edit="drying.gaugeNum2" data-edit-max="60" className={s.gaugeNum}>About 12% moisture</span>
                  <span data-edit="drying.compareName2" data-edit-max="60" className={s.compareName}>Kiln-dried</span>
                </p>
              </div>
              <dl className={s.compareRows}>
                {DRYING.map((d, i) => (
                  <div key={d.term} className={s.compareRow}>
                    <dt data-edit={`drying.term.${i}`} data-edit-max="28">{d.term}</dt>
                    <dd data-edit={`drying.body.${i}`} data-edit-max="200" data-edit-multiline>{d.ad}</dd>
                    <dd data-edit={`drying.body2.${i}`} data-edit-max="200" data-edit-multiline>{d.kd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- FIREWOOD */}
        <section id="firewood" className={s.sec} aria-labelledby="ct-fire-h">
          <div className={s.fireGrid}>
            <div>
              <div className={s.secHead}>
                <p className={`${s.stamp} ${s.stamp_pine}`}>
                  <span data-edit="firewood.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
                  <span className={s.stampLines}>
                    <span data-edit="firewood.text" data-edit-max="60">Seasoned</span>
                    <span data-edit="firewood.text2" data-edit-max="60">Under 20%</span>
                    <span data-edit="firewood.text3" data-edit-max="60">Hardwood</span>
                  </span>
                </p>
                <h2 data-edit="firewood.secTitle" data-edit-max="60" id="ct-fire-h" className={s.secTitle}>Firewood and offcuts</h2>
                <p data-edit="firewood.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Nothing from the mill is wasted. What is too short for a
                  board goes in the log bags, and what is too small for those
                  goes in the kindling.
                </p>
              </div>
              <ul className={s.fireList}>
                {FIREWOOD.map((f, i) => (
                  <li key={f.name}>
                    <span className={s.endGrain} aria-hidden="true" />
                    <span className={s.fireText}>
                      <strong data-edit={`firewood.fireName.${i}`} className={s.fireName}>{f.name}</strong>
                      <span data-edit={`firewood.fireDetail.${i}`} data-edit-max="60" className={s.fireDetail}>{f.detail}</span>
                    </span>
                    <span data-edit={`firewood.firePrice.${i}`} data-edit-max="60" className={s.firePrice}>{f.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className={s.bay} aria-labelledby="ct-bay-h">
              <div data-edit-pattern="ctBay.field" data-edit-roles="1,0,2,3,0" className={s.splits} aria-hidden="true">
                <TabbiedPattern
                  pattern={reeding}
                  palette={SPLITS}
                  options={{ frequency: 0.9 }}
                  fit="grid"
                  cellSize={40}
                  seed="crosscut-splits"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.bayCard}>
                <h3 data-edit="ctBay.bayTitle" data-edit-max="40" id="ct-bay-h" className={s.bayTitle}>The log bay</h3>
                <p data-edit="ctBay.bayText" data-edit-max="240" data-edit-multiline className={s.bayText}>
                  Self-serve from the bay by the gate when the yard is open.
                  Pay at the office; we will load the bag onto your trailer
                  with the forklift.
                </p>
                <p className={s.bayMeter}>
                  <span data-edit="ctBay.text" data-edit-max="60">Moisture this week</span>
                  <strong data-edit="ctBay.emphasis">16%</strong>
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------------- DELIVERY */}
        <section id="delivery" className={s.sec} aria-labelledby="ct-del-h">
          <div className={s.secHead}>
            <p className={`${s.stamp} ${s.stamp_bark}`}>
              <span data-edit="delivery.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
              <span className={s.stampLines}>
                <span data-edit="delivery.text" data-edit-max="60">Crane lorry</span>
                <span data-edit="delivery.text2" data-edit-max="60">8 m max</span>
                <span data-edit="delivery.text3" data-edit-max="60">10 t</span>
              </span>
            </p>
            <h2 data-edit="delivery.secTitle" data-edit-max="60" id="ct-del-h" className={s.secTitle}>Delivery zones</h2>
            <p data-edit="delivery.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Our crane lorry carries 10 tonnes and lengths up to 8 m, and
              lifts it over the hedge if the gate is too narrow.
            </p>
          </div>
          <div className={s.road}>
            <div data-edit-pattern="delivery.field" data-edit-roles="transparent,3,0,2,3" className={s.fields} aria-hidden="true">
              <TabbiedPattern
                pattern={wale}
                palette={FURROWS}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={30}
                seed="crosscut-fields"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.roadLine}>
              <span data-edit="delivery.roadStart" data-edit-max="60" className={s.roadStart}>Mill</span>
              {ZONES.map((z, i) => (
                <span
                  key={z.zone}
                  className={`${s.roadZone} ${s[`zone_${z.key}`]}`}
                  style={{ '--from': z.from, '--to': z.to } as React.CSSProperties}
                >
                  <span data-edit={`delivery.roadZoneLabel.${i}`} data-edit-max="60" className={s.roadZoneLabel}>{z.zone}</span>
                </span>
              ))}
              <span data-edit="delivery.roadEnd" data-edit-max="60" className={s.roadEnd}>40 miles</span>
            </div>
          </div>
          <ul className={s.zones}>
            {ZONES.map((z, i) => (
              <li key={z.zone} className={s.zoneCard}>
                <p data-edit={`delivery.zoneNum.${i}`} data-edit-max="240" data-edit-multiline className={s.zoneNum}>{z.zone}</p>
                <p data-edit={`delivery.zoneReach.${i}`} data-edit-max="240" data-edit-multiline className={s.zoneReach}>{z.reach}</p>
                <p data-edit={`delivery.zonePlaces.${i}`} data-edit-max="240" data-edit-multiline className={s.zonePlaces}>{z.places}</p>
                <p data-edit={`delivery.zonePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.zonePrice}>{z.price}</p>
              </li>
            ))}
            <li className={`${s.zoneCard} ${s.zoneFar}`}>
              <p data-edit="delivery.zoneNum2" data-edit-max="240" data-edit-multiline className={s.zoneNum}>Further</p>
              <p data-edit="delivery.zoneReach2" data-edit-max="240" data-edit-multiline className={s.zoneReach}>Beyond 40 miles</p>
              <p data-edit="delivery.zonePlaces2" data-edit-max="240" data-edit-multiline className={s.zonePlaces}>Priced by the mile, or on a shared run when the lorry is out that way</p>
              <p data-edit="delivery.zonePrice2" data-edit-max="240" data-edit-multiline className={s.zonePrice}>Ask</p>
            </li>
          </ul>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.sec} aria-labelledby="ct-hours-h">
          <div className={s.hoursGrid}>
            <div className={s.hoursBoard}>
              <p className={`${s.stamp} ${s.stamp_orange}`}>
                <span data-edit="hours.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
                <span className={s.stampLines}>
                  <span data-edit="hours.text" data-edit-max="60">Yard open</span>
                  <span data-edit="hours.text2" data-edit-max="60">Boots on</span>
                  <span data-edit="hours.text3" data-edit-max="60">Mon-Sat</span>
                </span>
              </p>
              <h2 data-edit="hours.hoursTitle" data-edit-max="60" id="ct-hours-h" className={s.hoursTitle}>Yard hours</h2>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`hours.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.visit}>
              <p data-edit="hours.address" data-edit-max="240" data-edit-multiline className={s.address}>Sawmill Lane, off the A38, Oakenholt</p>
              <p data-edit="hours.visitText" data-edit-max="240" data-edit-multiline className={s.visitText}>
                Turn off the A38 at the green shed and follow the lane for half
                a mile; the mill is at the end, past the stacks. Park by the
                office and come in for a hi-vis before you walk the yard.
              </p>
              <ul className={s.rules}>
                <li>
                  <span className={s.endGrain} aria-hidden="true" />
                  <span data-edit="hours.text4" data-edit-max="60">Boots on in the yard. We lend hard hats.</span>
                </li>
                <li>
                  <span className={s.endGrain} aria-hidden="true" />
                  <span data-edit="hours.text5" data-edit-max="60">Forklifts have right of way, always.</span>
                </li>
                <li>
                  <span className={s.endGrain} aria-hidden="true" />
                  <span data-edit="hours.text6" data-edit-max="60">Children and dogs stay in the car park.</span>
                </li>
              </ul>
              <p className={s.contact}>
                <a data-edit="hours.link" data-edit-max="28" href="tel:+15550172264">(555) 017-2264</a>
                <a data-edit="hours.link2" data-edit-max="28" href="mailto:yard@crosscut.example">yard@crosscut.example</a>
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={`${s.sec} ${s.quoteSec}`} aria-labelledby="ct-quote-h">
          <div className={s.secHead}>
            <p className={`${s.stamp} ${s.stamp_pine}`}>
              <span data-edit="quote.stampMill" data-edit-max="60" className={s.stampMill}>07</span>
              <span className={s.stampLines}>
                <span data-edit="quote.text" data-edit-max="60">Quote</span>
                <span data-edit="quote.text2" data-edit-max="60">Two days</span>
                <span data-edit="quote.text3" data-edit-max="60">No charge</span>
              </span>
            </p>
            <h2 data-edit="quote.secTitle" data-edit-max="60" id="ct-quote-h" className={s.secTitle}>Ask for a quote</h2>
            <p data-edit="quote.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              A cutting list gets the most exact price: pieces, lengths and
              finished sizes. We reply within two working days.
            </p>
          </div>
          <form className={s.form} action="#">
            <p className={s.docket}>
              <span data-edit="quote.text4" data-edit-max="60">Yard docket, quote request</span>
              <span data-edit="quote.text5" data-edit-max="60">No. 4471</span>
            </p>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label data-edit="quote.label" htmlFor="ct-name">Name</label>
                <input id="ct-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label2" htmlFor="ct-phone">Phone</label>
                <input id="ct-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label3" htmlFor="ct-email">Email</label>
                <input id="ct-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label4" htmlFor="ct-species">Species</label>
                <select id="ct-species" name="species" defaultValue="oak">
                  <option value="oak">English oak</option>
                  <option value="ash">Ash</option>
                  <option value="fir">Douglas fir</option>
                  <option value="larch">Larch</option>
                  <option value="chestnut">Sweet chestnut</option>
                  <option value="elm">Elm</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="quote.label5" htmlFor="ct-dried">Dried</label>
                <select id="ct-dried" name="dried" defaultValue="ad">
                  <option value="ad">Air-dried</option>
                  <option value="kd">Kiln-dried</option>
                  <option value="green">Green, straight off the saw</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="quote.label6" htmlFor="ct-post">Delivery postcode</label>
                <input id="ct-post" name="postcode" type="text" autoComplete="postal-code" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="quote.label7" htmlFor="ct-making">What you are making</label>
                <input id="ct-making" name="making" type="text" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="quote.label8" htmlFor="ct-list">Cutting list</label>
                <textarea id="ct-list" name="list" rows={5} placeholder="4 @ 2400 x 200 x 27 mm" />
              </div>
            </div>
            <button data-edit="quote.btn" data-edit-max="24" className={s.btn} type="submit">Send for a quote</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,2,3" className={s.cord} aria-hidden="true">
          <TabbiedPattern
            pattern={corduroy}
            palette={CORD}
            fit="grid"
            cellSize={36}
            seed="crosscut-cord"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Crosscut Timber</p>
          <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>Sawmill Lane, off the A38, Oakenholt</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional sawmill; the lots, species, prices and zones are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The log stack and the band mill are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
