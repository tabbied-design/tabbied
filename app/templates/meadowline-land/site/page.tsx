import { TabbiedPattern } from 'tabbied/react';
import { windrow } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './meadowline-land.module.css';

export const metadata = {
  title: 'Meadowline Land & Farm: Farm, pasture and acreage brokers, Harlan County',
  description:
    'Meadowline lists and sells farmland, pasture and rural acreage in Harlan County. Every listing comes with a spec sheet: acres, soils, water rights, buildings and access, checked on foot before it goes to market.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The windrow is
   the brokerage's field: grass blades on a transparent ground, so the hay
   paper shows between them. It is the featured parcel in the hero, each
   listing's outline, the township behind the plat map, and the verge the
   footer stands on. */
const HAY = '#f3eddc';
const FIELD = '#24382b';
const RUST = '#b0502a';
const WHEAT = '#c99a32';
const SAGE = '#71844f';

const MEADOW = ['transparent', FIELD, SAGE, WHEAT, RUST, SAGE];
const STUBBLE = ['transparent', WHEAT, RUST, SAGE, FIELD, WHEAT];
const VERGE = ['transparent', SAGE, FIELD, WHEAT, SAGE, RUST];

const NAV = [
  ['Listings', '#listings'],
  ['Plat map', '#plat'],
  ['Before you buy', '#questions'],
  ['Selling land', '#selling'],
  ['Contact', '#contact'],
];

type Parcel = {
  name: string;
  legal: string;
  acres: string;
  price: string;
  total: string;
  shape: string;
  status: string;
  specs: string[][];
};

const PARCELS: Parcel[] = [
  {
    name: 'Cutler Creek Quarter',
    legal: 'SE 1/4, Sec. 14, T12N R4W',
    acres: '160.0',
    price: '$4,150',
    total: '$664,000',
    shape: 'quarter',
    status: 'For sale',
    specs: [
      ['Tillable', '138 ac in corn and beans, lease ends Dec. 31'],
      ['Soils', 'Harlan silt loam, Class II, CSR2 82'],
      ['Water', 'Well at 40 gpm, plus a 1951 creek right for 120 acre-feet'],
      ['Buildings', '40 x 60 machine shed (1998), two 10,000 bu bins'],
      ['Access', 'Half a mile of county gravel, two field entrances'],
      ['Taxes', '$2,140 a year at agricultural value'],
    ],
  },
  {
    name: 'Holloway Home Place',
    legal: 'Pt. NW 1/4, Sec. 22, T12N R4W',
    acres: '86.5',
    price: '$6,900',
    total: '$596,850',
    shape: 'ell',
    status: 'Under contract',
    specs: [
      ['House', '1912 farmhouse, four bedrooms, roof 2021'],
      ['Pasture', '52 ac in four paddocks, woven wire, good gates'],
      ['Water', 'Two wells, a stock pond, rural water at the road'],
      ['Buildings', 'Bank barn, 30 x 48 shop with power, hen house'],
      ['Access', 'Paved county road, on the school bus route'],
      ['Taxes', '$3,480 a year, one more home site allowed'],
    ],
  },
  {
    name: 'Sand Hill Pasture',
    legal: 'E 1/2, Sec. 27, T12N R4W',
    acres: '312.0',
    price: '$1,850',
    total: '$577,200',
    shape: 'creek',
    status: 'For sale',
    specs: [
      ['Grass', 'Native bluestem and grama, about 60 pairs'],
      ['Water', 'Solar well and tank, creek on the north line'],
      ['Fence', 'Five-strand barbed wire, perimeter rebuilt 2019'],
      ['Hunting', 'Deer and turkey, no lease for next season'],
      ['Access', 'Recorded 30 ft easement from Road 140'],
      ['Taxes', '$960 a year, minerals transfer with the land'],
    ],
  },
];

/* A survey township is 36 sections of 640 acres, numbered back and forth
   from the northeast corner the way a plow turns at the headland. */
const TOWNSHIP = [6, 5, 4, 3, 2, 1, 7, 8, 9, 10, 11, 12, 18, 17, 16, 15, 14, 13, 19, 20, 21, 22, 23, 24, 30, 29, 28, 27, 26, 25, 31, 32, 33, 34, 35, 36];

const MARKED: Record<number, string> = {
  14: 'For sale',
  22: 'Contract',
  27: 'For sale',
  9: 'Sold',
  31: 'Sold',
  35: 'Sold',
};

const QUESTIONS = [
  ['Who owns the water?', 'A well on the land is not a right to pump it. Ask for the permit, its priority date and the acre-feet, and whether it transfers.'],
  ['How do I get in?', 'Road frontage, or a recorded easement? A handshake across the neighbor ends when the neighbor sells.'],
  ['Where are the corners?', 'Fences drift. A boundary survey with set pins costs $1,800-4,000 and settles it before you own the argument.'],
  ['Will it perc?', 'No septic permit, no house. A percolation test runs about $650 and takes a dry week.'],
  ['What did the seller keep?', 'Mineral, wind and timber rights can be split off the surface. Read the abstract, not the listing.'],
  ['Is it in a program?', 'A CRP contract or a conservation easement rides with the land, and so do its limits.'],
  ['What does the soil say?', 'The county soil survey and the CSR2 rating tell you what the ground has grown, and what it will rent for.'],
  ['Does it flood?', 'Check the FEMA map, then ask the neighbors which year the creek came over the road.'],
  ['Who farms it now?', 'A cash rent lease may run past closing. In this state it ends on September 1 only if notice was served.'],
];

const STEPS = [
  ['Walk it with us', 'We walk every line, open every gate and look in every building before we write a word. Half a day for most farms.'],
  ['Build the spec sheet', 'FSA maps, the soil survey, water right records, the abstract and the tax card, gathered into one sheet a buyer can trust.'],
  ['Price it by the acre and by its parts', 'Comparable sales within 20 miles in the last two years, with the house, the bins and the water valued apart.'],
  ['Sell it, or take it to auction', 'A private listing for most land, a public auction when there are three or more likely bidders in the township.'],
];

const FEES = [
  ['Farmland over 40 acres', '4% of the sale price'],
  ['Acreage under 40 acres', '6% of the sale price'],
  ['Public land auction', '3%, plus advertising at cost'],
  ['Written land value', '$450, credited if you list'],
];

const HOURS = [
  ['Monday to Friday', '8:00-5:00'],
  ['Saturday', 'By appointment'],
  ['Land walks', 'Any day the lane is dry'],
];

export default function MeadowlineLandPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--hay': '#f3eddc',
        '--field': '#24382b',
        '--rust': '#b0502a',
        '--wheat': '#c99a32',
        '--sage': '#71844f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="hay,field,rust,wheat,sage"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,500;0,700;1,500&family=Karla:wght@400;600&family=IBM+Plex+Mono:wght@400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Meadowline</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Land & Farm Brokers</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550172200">(555) 017-2200</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The featured listing, drawn as a sheet: the quarter section in
            grass, its survey lines over it, and the numbers under it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Farm, pasture and rural acreage in Harlan County</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              We sell land the way <em>a buyer walks it.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Every acre we list has been walked, measured against the plat and
              written up on one sheet: soils, water rights, buildings, access and
              taxes. You know what you are bidding on before you drive out.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#listings">See the listings</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#contact">Book a land walk</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Acres sold since 2004</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>41,600</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Median days to close</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>74</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Counties we cover</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>5</dd>
              </div>
            </dl>
          </div>

          <div className={s.sheet}>
            <div className={s.sheetHead}>
              <span data-edit="hero.text" data-edit-max="60">Listing sheet 0417</span>
              <span data-edit="hero.text2" data-edit-max="60">Featured</span>
            </div>
            <div className={s.sheetField}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,4,3,2,4" className={s.sheetGrass} aria-hidden="true">
                <TabbiedPattern
                  pattern={windrow}
                  palette={MEADOW}
                  fit="grid"
                  cellSize={46}
                  seed="meadowline-hero"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.quarters} aria-hidden="true" />
              <div className={s.parcelLine} aria-hidden="true" />
              <p data-edit="hero.fieldTag" data-edit-max="240" data-edit-multiline className={s.fieldTag}>SE 1/4, 160.0 ac</p>
              <p data-edit="hero.northTag" data-edit-max="240" data-edit-multiline className={s.northTag}>N</p>
            </div>
            <dl className={s.sheetSpecs}>
              <div>
                <dt data-edit="hero.term4" data-edit-max="28">Parcel</dt>
                <dd data-edit="hero.body4" data-edit-max="200" data-edit-multiline>Cutler Creek Quarter</dd>
              </div>
              <div>
                <dt data-edit="hero.term5" data-edit-max="28">Asking</dt>
                <dd data-edit="hero.body5" data-edit-max="200" data-edit-multiline>$4,150 / acre</dd>
              </div>
              <div>
                <dt data-edit="hero.term6" data-edit-max="28">Soil</dt>
                <dd data-edit="hero.body6" data-edit-max="200" data-edit-multiline>CSR2 82</dd>
              </div>
              <div>
                <dt data-edit="hero.term7" data-edit-max="28">Water</dt>
                <dd data-edit="hero.body7" data-edit-max="200" data-edit-multiline>40 gpm well</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* -------------------------------------------------------- LISTINGS
            One spec sheet per parcel, the outline cut from the grass. */}
        <section id="listings" className={s.sec} aria-labelledby="listings-h">
          <div className={s.secHead}>
            <p data-edit="listings.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="listings.secTitle" data-edit-max="60" id="listings-h" className={s.secTitle}>Land for sale this season</h2>
            <p data-edit="listings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are per deeded acre. Every sheet is checked against the
              county records the week it is posted, and the abstract is in the
              office for anyone to read.
            </p>
          </div>
          <ul className={s.parcels}>
            {PARCELS.map((p, i) => (
              <li key={p.name} className={s.parcel}>
                <div className={s.parcelTop}>
                  <div data-edit-pattern={`listings.field.${i}`} data-edit-roles="transparent,3,2,4,1,3" className={`${s.outline} ${s[p.shape]}`} aria-hidden="true">
                    <TabbiedPattern
                      pattern={windrow}
                      palette={STUBBLE}
                      fit="grid"
                      cellSize={30}
                      seed={`meadowline-parcel-${i}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <span data-edit={`listings.status.${i}`} data-edit-max="60" className={s.status}>{p.status}</span>
                </div>
                <h3 data-edit={`listings.parcelName.${i}`} data-edit-max="40" className={s.parcelName}>{p.name}</h3>
                <p data-edit={`listings.legal.${i}`} data-edit-max="240" data-edit-multiline className={s.legal}>{p.legal}</p>
                <dl className={s.parcelPrice}>
                  <div>
                    <dt data-edit={`listings.term.${i}`} data-edit-max="28">Acres</dt>
                    <dd data-edit={`listings.body.${i}`} data-edit-max="200" data-edit-multiline>{p.acres}</dd>
                  </div>
                  <div>
                    <dt data-edit={`listings.term2.${i}`} data-edit-max="28">Per acre</dt>
                    <dd data-edit={`listings.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.price}</dd>
                  </div>
                  <div>
                    <dt data-edit={`listings.term3.${i}`} data-edit-max="28">Total</dt>
                    <dd data-edit={`listings.body3.${i}`} data-edit-max="200" data-edit-multiline>{p.total}</dd>
                  </div>
                </dl>
                <table className={s.specs}>
                  <caption className={s.srOnly}>{`Specifications for ${p.name}`}</caption>
                  <tbody>
                    {p.specs.map(([k, v], i2) => (
                      <tr key={k}>
                        <th data-edit={`listings.heading.${i}.${i2}`} scope="row">{k}</th>
                        <td data-edit={`listings.cell.${i}.${i2}`}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ PLAT
            The township, section by section, with the grass showing through
            the sections we are selling. */}
        <section id="plat" className={s.sec} aria-labelledby="plat-h">
          <div className={s.platGrid}>
            <div className={s.platText}>
              <p data-edit="plat.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
              <h2 data-edit="plat.secTitle" data-edit-max="60" id="plat-h" className={s.secTitle}>Cutler Township on the county plat</h2>
              <p data-edit="plat.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Township 12 North, Range 4 West: six miles on a side, 36 sections
                of 640 acres each. Our listings are open to the grass; the sales
                we closed this year are shaded.
              </p>
              <h3 data-edit="plat.platSub" data-edit-max="40" className={s.platSub}>Reading a legal description</h3>
              <ol className={s.readList}>
                <li data-edit="plat.item" data-edit-max="80">Start at the end: Section 14 of Township 12 North, Range 4 West.</li>
                <li data-edit="plat.item2" data-edit-max="80">Then read backward: the SE 1/4 is the southeast quarter of that section.</li>
                <li data-edit="plat.item3" data-edit-max="80">A quarter is 160 acres, a quarter of a quarter is 40, the old unit of a field.</li>
              </ol>
              <ul className={s.legend}>
                <li>
                  <span className={`${s.key} ${s.keyOpen}`} aria-hidden="true" />
                  <span data-edit="plat.text" data-edit-max="60">Listed by us</span>
                </li>
                <li>
                  <span className={`${s.key} ${s.keySold}`} aria-hidden="true" />
                  <span data-edit="plat.text2" data-edit-max="60">Sold in 2026</span>
                </li>
                <li>
                  <span className={s.key} aria-hidden="true" />
                  <span data-edit="plat.text3" data-edit-max="60">Not for sale</span>
                </li>
              </ul>
            </div>
            <div className={s.platWrap}>
              <div className={s.plat}>
              <div data-edit-pattern="plat.field" data-edit-roles="transparent,1,4,3,2,4" className={s.platGrass} aria-hidden="true">
                <TabbiedPattern
                  pattern={windrow}
                  palette={MEADOW}
                  fit="grid"
                  cellSize={24}
                  seed="meadowline-plat"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ol className={s.township}>
                {TOWNSHIP.map((n, i) => (
                  <li key={n} className={MARKED[n] === 'Sold' ? s.sold : MARKED[n] ? s.open : undefined}>
                    <span data-edit={`plat.secNum.${i}`} data-edit-max="60" className={s.secNum}>{n}</span>
                    {MARKED[n] ? <span data-edit={`plat.secMark.${i}`} data-edit-max="60" className={s.secMark}>{MARKED[n]}</span> : null}
                  </li>
                ))}
              </ol>
              </div>
              <p data-edit="plat.platScale" data-edit-max="240" data-edit-multiline className={s.platScale}>Each square is one section, one square mile, 640 acres</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.secHead}>
            <p data-edit="questions.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
            <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Nine things to ask before you buy land</h2>
            <p data-edit="questions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Land is sold on what the records say, not on what the fence line
              suggests. We answer these on every sheet; ask them of anyone else.
            </p>
          </div>
          <ol className={s.questions}>
            {QUESTIONS.map(([q, a], i) => (
              <li key={q}>
                <h3 data-edit={`questions.qTitle.${i}`} data-edit-max="40" className={s.qTitle}>{q}</h3>
                <p data-edit={`questions.qText.${i}`} data-edit-max="240" data-edit-multiline className={s.qText}>{a}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- SELLING */}
        <section id="selling" className={s.selling} aria-labelledby="selling-h">
          <div className={s.sellingInner}>
            <div className={s.sellingHead}>
              <p data-edit="selling.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
              <h2 data-edit="selling.secTitle" data-edit-max="60" id="selling-h" className={s.secTitle}>Selling a farm, start to finish</h2>
              <p data-edit="selling.sellingNote" data-edit-max="240" data-edit-multiline className={s.sellingNote}>
                Most of our sellers inherited the land or farmed it for forty
                years. We take the time that deserves, and we say plainly what it
                will bring.
              </p>
              <table className={s.fees}>
                <caption data-edit="selling.feesCap" className={s.feesCap}>What we charge</caption>
                <tbody>
                  {FEES.map(([k, v], i) => (
                    <tr key={k}>
                      <th data-edit={`selling.heading.${i}`} scope="row">{k}</th>
                      <td data-edit={`selling.cell.${i}`}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t}>
                  <span className={s.stepNo}>{`Step ${i + 1}`}</span>
                  <h3 data-edit={`selling.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                  <p data-edit={`selling.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Come out to the office, or we will come out to you</h2>
              <address className={s.address}>
                <span data-edit="contact.text" data-edit-max="60">88 Granary Road</span>
                <span data-edit="contact.text2" data-edit-max="60">Cutler, Harlan County</span>
              </address>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550172200">(555) 017-2200</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:land@meadowline.example">land@meadowline.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="contact.brokers" data-edit-max="240" data-edit-multiline className={s.brokers}>Ada Lindqvist, managing broker, and Wes Corrigan, accredited land consultant.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ml-name">Name</label>
                <input id="ml-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ml-phone">Phone</label>
                <input id="ml-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">I am looking to</legend>
                <div className={s.picks}>
                  <input id="ml-buy" type="radio" name="intent" value="buy" />
                  <label data-edit="contact.label3" htmlFor="ml-buy">Buy land</label>
                  <input id="ml-sell" type="radio" name="intent" value="sell" />
                  <label data-edit="contact.label4" htmlFor="ml-sell">Sell land</label>
                  <input id="ml-value" type="radio" name="intent" value="value" />
                  <label data-edit="contact.label5" htmlFor="ml-value">Get a value</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="contact.label6" htmlFor="ml-acres">About how many acres</label>
                <input id="ml-acres" name="acres" type="text" inputMode="numeric" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label7" htmlFor="ml-where">County or legal description</label>
                <input id="ml-where" name="where" type="text" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label8" htmlFor="ml-note">Tell us about the ground</label>
                <textarea id="ml-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to the office</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,1,3,4,2" className={s.footGrass} aria-hidden="true">
          <TabbiedPattern
            pattern={windrow}
            palette={VERGE}
            fit="grid"
            cellSize={38}
            seed="meadowline-verge"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Meadowline Land & Farm</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional land brokerage. The parcels, people, prices and address are invented, and nothing here is legal or financial advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
