import { TabbiedPattern } from 'tabbied/react';
import { vanishingpoint } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './high-floor-realty.module.css';

export const metadata = {
  title: 'High Floor Realty: Condos and lofts with Iris Calder',
  description:
    'Iris Calder sells condos and lofts downtown and along the river. Current listings floor by floor, the buildings she knows, a guide for buyers and sellers, and her recent sales.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   lobby: limestone walls, a navy felt directory board, brass fittings. The
   lead design is the city seen from a high window, towers leaning out from
   the middle of the sheet, their lit walls in brass and their shadow walls
   in navy, roofs in brick, teal and stone. */
const STONE = '#ebe5da';
const NAVY = '#1e2840';
const BRASS = '#c4923e';
const BRICK = '#b4523a';
const TEAL = '#2c6d73';

const TOWERS = ['transparent', BRASS, NAVY, TEAL, BRICK, STONE];
const ROOFS = ['transparent', BRASS, NAVY, BRICK, TEAL, NAVY];
const NIGHT = ['transparent', TEAL, NAVY, BRASS, STONE, BRICK];

const NAV = [
  ['Directory', '#directory'],
  ['Buildings', '#buildings'],
  ['Buy or sell', '#guide'],
  ['Recent sales', '#sales'],
  ['Contact', '#contact'],
];

type Listing = { floor: string; unit: string; building: string; size: string; rooms: string; fee: string; price: string; status: string };

/* The board reads top down, the way a lobby directory does. */
const LISTINGS: Listing[] = [
  { floor: 'PH', unit: 'Penthouse 2', building: 'The Calloway', rooms: '3 bed, 3 bath', size: '2,410 sq ft', fee: '$1,420 HOA', price: '$1,840,000', status: 'Open Sun 1-3' },
  { floor: '31', unit: 'Residence 31B', building: 'The Calloway', rooms: '2 bed, 2 bath', size: '1,280 sq ft', fee: '$780 HOA', price: '$1,180,000', status: 'New' },
  { floor: '24', unit: 'Residence 24F', building: 'Meridian House', rooms: '2 bed, 2 bath', size: '1,105 sq ft', fee: '$690 HOA', price: '$865,000', status: '' },
  { floor: '18', unit: 'Loft 18A', building: 'The Foundry Lofts', rooms: '1 bed, 1.5 bath', size: '1,020 sq ft', fee: '$455 HOA', price: '$612,000', status: 'Under contract' },
  { floor: '12', unit: 'Residence 12C', building: 'Harbor Point', rooms: '1 bed, 1 bath', size: '760 sq ft', fee: '$410 HOA', price: '$449,000', status: '' },
  { floor: '09', unit: 'Loft 9', building: 'Number Nine Tannery', rooms: '2 bed, 1 bath', size: '1,640 sq ft', fee: '$380 HOA', price: '$725,000', status: 'Open Sat 11-1' },
  { floor: '04', unit: 'Residence 4D', building: 'Ashgrove Court', rooms: 'Studio, 1 bath', size: '512 sq ft', fee: '$295 HOA', price: '$289,000', status: '' },
  { floor: 'L', unit: 'Mill Loft 1', building: 'The Mill Lofts', rooms: '1 bed, 1 bath', size: '1,310 sq ft', fee: '$360 HOA', price: '$559,000', status: 'New' },
];

type Building = { name: string; address: string; built: string; floors: string; units: string; fee: string; pets: string; note: string; height: string };

const BUILDINGS: Building[] = [
  { name: 'The Calloway', address: '400 Wharfside Avenue', built: '2009', floors: '34', units: '212', fee: '$0.62 / sq ft', pets: 'Two, any size', height: 'tall', note: 'Reserve fund at 94 percent. The north stack hears the rail yard at night; the south stack never does.' },
  { name: 'Meridian House', address: '18 Ferrule Street', built: '1972', floors: '26', units: '180', fee: '$0.58 / sq ft', pets: 'One cat or dog', height: 'tall', note: 'Poured concrete and thick walls, the quietest tower in town. The window assessment was paid off in 2023.' },
  { name: 'Harbor Point', address: '2 Quayline Drive', built: '2018', floors: '22', units: '160', fee: '$0.54 / sq ft', pets: 'Two, under 60 lb', height: 'mid', note: 'Newest on the water. Balcony warranty work is still open on a few lines; ask me which before you offer.' },
  { name: 'Ashgrove Court', address: '140 Ashgrove Avenue', built: '1964', floors: '12', units: '96', fee: '$0.49 / sq ft', pets: 'Cats only', height: 'mid', note: 'Strict rules, low fees, and the best value under $350,000 in the city. Rentals capped at 10 percent.' },
  { name: 'The Foundry Lofts', address: '71 Cinder Row', built: '1911, converted 1998', floors: '6', units: '48', fee: '$0.44 / sq ft', pets: 'Two, any size', height: 'low', note: 'Fourteen-foot ceilings and the original timber. No in-unit laundry above the fourth floor.' },
  { name: 'Number Nine Tannery', address: '9 Tanyard Lane', built: '1888, converted 2004', floors: '5', units: '22', fee: '$0.23 / sq ft', pets: 'By board approval', height: 'low', note: 'No passenger elevator, a freight lift only. The roof deck is the best in the river wards.' },
];

const BUYING = [
  ['Pre-approval, with the building named', 'Lenders approve the building as well as you. I check yours is on the lender\'s list before you fall for it.'],
  ['Read the association papers', 'Budget, reserve study and two years of board minutes. The minutes are where the leaking garage shows up.'],
  ['Visit twice', 'Once at 8 am and once at 6 pm: the elevator wait, the hallway noise, where the sun lands in each room.'],
  ['Offer with a review period', 'Five days to read the resale package after it arrives, and a clean way out if it surprises you.'],
  ['Inspect the unit, read the building', 'Your inspector covers the walls in. I read the building\'s engineering report for everything else.'],
  ['Book the freight elevator', 'Most buildings want a move-in reservation and a deposit. I file it the day you sign.'],
];

const SELLING = [
  ['Order the resale package now', 'The management company can take ten days to produce it, and no buyer will sign without it.'],
  ['Price against your stack', 'Your line, the same layout and the same view, has sold three times in five years. That is the comparison that counts.'],
  ['Stage for the view', 'Furniture low, glass clean, blinds up. Above the twentieth floor the view is half the price.'],
  ['Follow the lobby rules', 'Some buildings ban open houses. I know which ones, and work with the front desk instead.'],
  ['Read every offer with the fees', 'A buyer\'s lender may balk at a special assessment. I flag it before it can sink the deal.'],
  ['Hand over every fob', 'Keys, fobs, the garage remote, the mailbox key, the storage cage. I bring the checklist to closing.'],
];

const SALES = [
  { unit: '27C', building: 'The Calloway', listed: '$995,000', sold: '$1,012,000', ratio: '101.7%', days: '6' },
  { unit: '15B', building: 'Meridian House', listed: '$719,000', sold: '$705,000', ratio: '98.1%', days: '21' },
  { unit: 'Loft 3', building: 'The Foundry Lofts', listed: '$640,000', sold: '$655,500', ratio: '102.4%', days: '9' },
  { unit: '19E', building: 'Harbor Point', listed: '$598,000', sold: '$590,000', ratio: '98.7%', days: '33' },
  { unit: '2A', building: 'Ashgrove Court', listed: '$265,000', sold: '$271,000', ratio: '102.3%', days: '4' },
  { unit: 'Loft 5', building: 'Number Nine Tannery', listed: '$820,000', sold: '$801,000', ratio: '97.7%', days: '47' },
];

const HOURS = [
  ['Monday to Friday', '9:00-6:00'],
  ['Saturday', '10:00-4:00'],
  ['Sunday', 'Showings by appointment'],
];

export default function HighFloorRealtyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stone': '#ebe5da',
        '--navy': '#1e2840',
        '--brass': '#c4923e',
        '--brick': '#b4523a',
        '--teal': '#2c6d73',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stone,navy,brass,brick,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;800&family=Instrument+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.text" data-edit-max="60" className={s.brandFloor} aria-hidden="true">31</span>
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>High Floor</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Realty</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550163100">(555) 016-3100</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Condos and lofts, downtown and the river wards</p>
            <h1 data-edit="intro.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Every floor has <span>its own price.</span>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I am Iris Calder, and I sell homes above the third floor. I know
              which stack gets the afternoon sun, which association has money in
              the reserve fund, and which elevator is always out of service.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#directory">Read the directory</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#contact">Book a showing</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="intro.term" data-edit-max="28">Condos and lofts sold</dt>
                <dd data-edit="intro.body" data-edit-max="200" data-edit-multiline>212</dd>
              </div>
              <div>
                <dt data-edit="intro.term2" data-edit-max="28">Buildings on file</dt>
                <dd data-edit="intro.body2" data-edit-max="200" data-edit-multiline>38</dd>
              </div>
              <div>
                <dt data-edit="intro.term3" data-edit-max="28">Median days on market</dt>
                <dd data-edit="intro.body3" data-edit-max="200" data-edit-multiline>19</dd>
              </div>
            </dl>
          </div>
          <figure className={s.heroView}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,1,4,3,0" className={s.window} aria-hidden="true">
              <TabbiedPattern
                pattern={vanishingpoint}
                palette={TOWERS}
                fit="grid"
                cellSize={78}
                seed="highfloor-window"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figcaption className={s.viewCaption}>
              <span data-edit="intro.viewFloor" data-edit-max="60" className={s.viewFloor}>31B</span>
              <span data-edit="intro.text2" data-edit-max="60">Looking straight down from The Calloway, listed at $1,180,000.</span>
            </figcaption>
          </figure>
        </section>

        <section id="directory" className={s.directory} aria-labelledby="directory-h">
          <div className={s.secHead}>
            <h2 data-edit="directory.secTitle" data-edit-max="60" id="directory-h" className={s.secTitle}>The directory</h2>
            <p data-edit="directory.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Everything I have listed right now, read top down like the board
              in a lobby. Prices include parking unless the line says not.
            </p>
          </div>
          <div className={s.board}>
            <p className={s.boardHead}>
              <span data-edit="directory.text" data-edit-max="60">Floor</span>
              <span data-edit="directory.text2" data-edit-max="60">Residence</span>
              <span data-edit="directory.text3" data-edit-max="60">Asking</span>
            </p>
            <ol className={s.boardList}>
              {LISTINGS.map((l, i) => (
                <li key={l.unit} className={s.boardRow}>
                  <span data-edit={`directory.boardFloor.${i}`} data-edit-max="60" className={s.boardFloor}>{l.floor}</span>
                  <span className={s.boardUnit}>
                    <strong data-edit={`directory.emphasis.${i}`}>{l.unit}</strong>
                    <span data-edit={`directory.text4.${i}`} data-edit-max="60">{l.building}</span>
                  </span>
                  <span className={s.boardMetas}>
                    <span data-edit={`directory.text5.${i}`} data-edit-max="60">{l.rooms}</span>
                    <span data-edit={`directory.text6.${i}`} data-edit-max="60">{l.size}</span>
                    <span data-edit={`directory.text7.${i}`} data-edit-max="60">{l.fee}</span>
                  </span>
                  <span data-edit={`directory.boardPrice.${i}`} data-edit-max="60" className={s.boardPrice}>{l.price}</span>
                  <span className={l.status ? s.boardStatus : s.boardQuiet}>{l.status || 'Showing by appointment'}</span>
                </li>
              ))}
            </ol>
            <p data-edit="directory.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>HOA figures are monthly. Floor plans and the resale package on request.</p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,1,3,4,1" className={s.aerial} aria-hidden="true">
          <TabbiedPattern
            pattern={vanishingpoint}
            palette={ROOFS}
            fit="grid"
            cellSize={46}
            seed="highfloor-aerial"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="buildings" className={s.sec} aria-labelledby="buildings-h">
          <div className={s.secHead}>
            <h2 data-edit="buildings.secTitle" data-edit-max="60" id="buildings-h" className={s.secTitle}>The buildings I know</h2>
            <p data-edit="buildings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Thirty-eight buildings on file, with their budgets, their minutes
              and their quirks. These six are where most of my buyers end up.
            </p>
          </div>
          <ul className={s.buildings}>
            {BUILDINGS.map((b, i) => (
              <li key={b.name} className={`${s.building} ${s[b.height]}`}>
                <div className={s.elevation}>
                  <span data-edit={`buildings.floorsBig.${i}`} data-edit-max="60" className={s.floorsBig}>{b.floors}</span>
                  <span data-edit={`buildings.floorsLabel.${i}`} data-edit-max="60" className={s.floorsLabel}>floors</span>
                </div>
                <h3 data-edit={`buildings.buildingName.${i}`} data-edit-max="40" className={s.buildingName}>{b.name}</h3>
                <p data-edit={`buildings.buildingAddress.${i}`} data-edit-max="240" data-edit-multiline className={s.buildingAddress}>{b.address}</p>
                <dl className={s.buildingFacts}>
                  <div>
                    <dt data-edit={`buildings.term.${i}`} data-edit-max="28">Built</dt>
                    <dd data-edit={`buildings.body.${i}`} data-edit-max="200" data-edit-multiline>{b.built}</dd>
                  </div>
                  <div>
                    <dt data-edit={`buildings.term2.${i}`} data-edit-max="28">Units</dt>
                    <dd data-edit={`buildings.body2.${i}`} data-edit-max="200" data-edit-multiline>{b.units}</dd>
                  </div>
                  <div>
                    <dt data-edit={`buildings.term3.${i}`} data-edit-max="28">Fees</dt>
                    <dd data-edit={`buildings.body3.${i}`} data-edit-max="200" data-edit-multiline>{b.fee}</dd>
                  </div>
                  <div>
                    <dt data-edit={`buildings.term4.${i}`} data-edit-max="28">Pets</dt>
                    <dd data-edit={`buildings.body4.${i}`} data-edit-max="200" data-edit-multiline>{b.pets}</dd>
                  </div>
                </dl>
                <p data-edit={`buildings.buildingNote.${i}`} data-edit-max="240" data-edit-multiline className={s.buildingNote}>{b.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="guide" className={s.sec} aria-labelledby="guide-h">
          <div className={s.secHead}>
            <h2 data-edit="guide.secTitle" data-edit-max="60" id="guide-h" className={s.secTitle}>Buying or selling, floor by floor</h2>
            <p data-edit="guide.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A condo is two purchases: the home, and a share of the building.
              Here is the order I take them in.
            </p>
          </div>
          <div className={s.cars}>
            <div className={s.car}>
              <div className={s.carHead}>
                <span className={s.carArrow} aria-hidden="true" />
                <h3 data-edit="guide.carTitle" data-edit-max="40" className={s.carTitle}>Buying</h3>
                <p data-edit="guide.carNote" data-edit-max="240" data-edit-multiline className={s.carNote}>Six stops, about 45 days from offer to keys.</p>
              </div>
              <ol className={s.stops}>
                {BUYING.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.stopButton} aria-hidden="true">{i + 1}</span>
                    <h4 data-edit={`guide.stopTitle.${i}`} data-edit-max="36" className={s.stopTitle}>{t}</h4>
                    <p data-edit={`guide.stopText.${i}`} data-edit-max="240" data-edit-multiline className={s.stopText}>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.car}>
              <div className={s.carHead}>
                <span className={`${s.carArrow} ${s.carDown}`} aria-hidden="true" />
                <h3 data-edit="guide.carTitle2" data-edit-max="40" className={s.carTitle}>Selling</h3>
                <p data-edit="guide.carNote2" data-edit-max="240" data-edit-multiline className={s.carNote}>Six stops, about 30 days from listing to offer.</p>
              </div>
              <ol className={s.stops}>
                {SELLING.map(([t, d], j) => (
                  <li key={t}>
                    <span className={s.stopButton} aria-hidden="true">{j + 1}</span>
                    <h4 data-edit={`guide.stopTitle2.${j}`} data-edit-max="36" className={s.stopTitle}>{t}</h4>
                    <p data-edit={`guide.stopText2.${j}`} data-edit-max="240" data-edit-multiline className={s.stopText}>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="sales" className={s.sec} aria-labelledby="sales-h">
          <div className={s.salesGrid}>
            <div className={s.salesIntro}>
              <h2 data-edit="sales.secTitle" data-edit-max="60" id="sales-h" className={s.secTitle}>Recent sales</h2>
              <p data-edit="sales.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The last six closings, sellers and buyers both. Across all of
                2025 my listings sold at 100.4 percent of asking.
              </p>
              <div data-edit-pattern="sales.field" data-edit-roles="transparent,4,1,2,0,3" className={s.salesView} aria-hidden="true">
                <TabbiedPattern
                  pattern={vanishingpoint}
                  palette={NIGHT}
                  fit="grid"
                  cellSize={52}
                  seed="highfloor-sales"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div className={s.tableWrap}>
              <table className={s.sales}>
                <caption data-edit="sales.srOnly" className={s.srOnly}>Recent condo and loft sales</caption>
                <thead>
                  <tr>
                    <th data-edit="sales.heading" scope="col">Residence</th>
                    <th data-edit="sales.hideSmall" scope="col" className={s.hideSmall}>Listed</th>
                    <th data-edit="sales.heading2" scope="col">Sold</th>
                    <th data-edit="sales.heading3" scope="col">Of asking</th>
                    <th data-edit="sales.hideSmall2" scope="col" className={s.hideSmall}>Days</th>
                  </tr>
                </thead>
                <tbody>
                  {SALES.map((r, i) => (
                    <tr key={r.unit + r.building}>
                      <th scope="row">
                        <span data-edit={`sales.saleUnit.${i}`} data-edit-max="60" className={s.saleUnit}>{r.unit}</span>
                        <span data-edit={`sales.saleBuilding.${i}`} data-edit-max="60" className={s.saleBuilding}>{r.building}</span>
                      </th>
                      <td data-edit={`sales.hideSmall3.${i}`} className={s.hideSmall}>{r.listed}</td>
                      <td data-edit={`sales.cell.${i}`}>{r.sold}</td>
                      <td data-edit={`sales.cell2.${i}`}>{r.ratio}</td>
                      <td data-edit={`sales.hideSmall4.${i}`} className={s.hideSmall}>{r.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.desk}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Front desk</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The office is on the lobby level of The Calloway. Tell the
                concierge you are here for High Floor.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>400 Wharfside Avenue, Lobby Suite 2</p>
              <p data-edit="contact.address2" data-edit-max="240" data-edit-multiline className={s.address}>Riverside, ST 20416</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550163100">(555) 016-3100</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:iris@highfloor.example">iris@highfloor.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="contact.license" data-edit-max="240" data-edit-multiline className={s.license}>Iris Calder, principal broker, license 01928374.</p>
            </div>
            <form className={s.form} action="#">
              <p data-edit="contact.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Book a showing or a valuation</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="hf-name">Name</label>
                <input id="hf-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="hf-phone">Phone</label>
                <input id="hf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="hf-email">Email</label>
                <input id="hf-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">I am</legend>
                <div className={s.picks}>
                  <input id="hf-buy" name="intent" type="radio" value="buying" />
                  <label data-edit="contact.label4" htmlFor="hf-buy">Buying</label>
                  <input id="hf-sell" name="intent" type="radio" value="selling" />
                  <label data-edit="contact.label5" htmlFor="hf-sell">Selling</label>
                  <input id="hf-both" name="intent" type="radio" value="both" />
                  <label data-edit="contact.label6" htmlFor="hf-both">Both</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label7" htmlFor="hf-building">Building or residence</label>
                <input id="hf-building" name="building" type="text" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label8" htmlFor="hf-note">Anything I should know</label>
                <textarea id="hf-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to the front desk</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>I answer within one working day, usually the same afternoon.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,1,4,3,0" className={s.footSkyline} aria-hidden="true">
          <TabbiedPattern
            pattern={vanishingpoint}
            palette={TOWERS}
            fit="grid"
            cellSize={40}
            seed="highfloor-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>High Floor Realty</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Condos and lofts, 400 Wharfside Avenue, Lobby Suite 2.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>
            High Floor Realty is a fictional business: the names, people,
            buildings, prices and address on this page are invented.
          </p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
