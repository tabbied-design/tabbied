import { TabbiedPattern } from 'tabbied/react';
import { chamfer } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './true-grain-carpentry.module.css';

export const metadata = {
  title: 'True Grain Carpentry: Finish carpenter and joiner, Sawpit Lane',
  description:
    'True Grain is a two-person finish carpentry shop: built-in bookcases, window seats, stairs, trim and interior doors, drawn before they are cut and priced as a cut list, with a day rate for everything else.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Chamfer is the
   shop's mark: squares with one corner planed off. It stocks the shelves of
   the library wall in the hero, runs as the sample board between the day
   rate and the glossary, and edges the footer. */
const PAPER = '#efe8d8';
const WALNUT = '#2a2017';
const OAK = '#c58a3e';
const PENCIL = '#b4442b';
const SLATE = '#3f5b6b';
const BIRCH = '#dcc59a';

const SHELVES = ['transparent', WALNUT, OAK, PENCIL, SLATE, BIRCH];
const SAMPLES = ['transparent', OAK, SLATE, BIRCH, PENCIL, WALNUT];
const EDGE = ['transparent', OAK, BIRCH, PENCIL, SLATE, PAPER];

const NAV = [
  ['Cut list', '#cut-list'],
  ['Day rate', '#rate'],
  ['How a job runs', '#process'],
  ['Glossary', '#glossary'],
  ['Contact', '#contact'],
];

type Part = { no: string; item: string; note: string; unit: string; material: string; from: string };

const PARTS: Part[] = [
  { no: 'A1', item: 'Built-in bookcase', note: 'Floor to ceiling, scribed to the wall, adjustable shelves on brass pins.', unit: 'per linear foot', material: 'Paint-grade poplar or white oak', from: '$520' },
  { no: 'A2', item: 'Window seat with drawers', note: 'Two or three drawers on full-extension runners, a lift-off cushion board.', unit: 'each, up to 6 ft', material: 'Birch ply carcass, oak top', from: '$3,400' },
  { no: 'A3', item: 'Alcove cupboards', note: 'Either side of a chimney breast, doors below and open shelves above.', unit: 'pair', material: 'Poplar, painted on site', from: '$4,800' },
  { no: 'B1', item: 'Stair treads and risers', note: 'Old carpet up, new treads glued and screwed from below so they never creak.', unit: 'per flight of 13', material: 'Rift-sawn white oak', from: '$6,800' },
  { no: 'B2', item: 'Balustrade and newel', note: 'Spindles turned to match the old ones, or square stock for a plainer house.', unit: 'per flight', material: 'Oak handrail, poplar spindles', from: '$4,200' },
  { no: 'C1', item: 'Casing and baseboard', note: 'Mitred or coped, nailed and filled, ready for the painter.', unit: 'per room', material: 'Poplar, profiles to match', from: '$1,150' },
  { no: 'C2', item: 'Crown molding', note: 'Built up from two or three profiles on old plaster that is never straight.', unit: 'per linear foot', material: 'Poplar or MDF', from: '$18' },
  { no: 'D1', item: 'Interior door, hung', note: 'Hinges let in, latch fitted, a 1/8" gap all round and nothing that sticks.', unit: 'each', material: 'Solid core, five panel', from: '$640' },
  { no: 'D2', item: 'Pocket door', note: 'Frame, track and soft-close, cased so nobody can tell where it went.', unit: 'each', material: 'To match your doors', from: '$1,450' },
];

const RATE = [
  ['Two carpenters, one day', '$640'],
  ['One carpenter, one day', '$420'],
  ['Half day, minimum', '$240'],
  ['Materials', 'At cost, plus 10%'],
  ['Shop drawings', 'Free on jobs over $2,500'],
  ['Deposit', '30% to order timber'],
];

const STEPS = [
  ['Site visit', 'We measure, look behind the baseboards and talk through what you want. Forty-five minutes, no charge.'],
  ['Shop drawing', 'An elevation and a section, to scale, with a cut list priced line by line. Nothing is cut until you sign it.'],
  ['In the shop', 'Two to six weeks. Carcasses are built and finished in the shop, so your house is not a workshop for a month.'],
  ['Install', 'Dust sheets down, doors masked, a vacuum at the end of every day. Most built-ins go in within three days.'],
  ['Thirty-day visit', 'Timber moves when the heating comes on. We come back to adjust doors and fill any gap that opened.'],
];

const TERMS = [
  ['Chamfer', 'A small bevel planed along a square edge, so it does not splinter or catch a sleeve. Our mark.'],
  ['Scribe', 'Shaping the edge of a cabinet to the exact wobble of an old wall, traced with a compass and cut by hand.'],
  ['Cope', 'Cutting one molding to the profile of the other at an inside corner, so the joint stays closed when the house moves.'],
  ['Dovetail', 'Interlocking fan-shaped pins and tails. On a drawer front it means the drawer will outlive the house.'],
  ['Mortise and tenon', 'A tongue on one rail glued into a slot in the other. How every door and face frame we make is held together.'],
  ['Rabbet', 'A step cut along the edge of a board, so a back panel or a pane of glass sits flush inside it.'],
  ['Dado', 'A groove across the grain that a fixed shelf slides into. Stronger than any bracket and invisible.'],
  ['Reveal', 'The small, deliberate step between a casing and its door frame. It hides what is never quite straight.'],
  ['Stile and rail', 'The upright and cross pieces of a frame-and-panel door. The panel floats between them and is free to move.'],
];

const HOURS = [
  ['Monday to Friday', '7:00-3:30, in the shop or on site'],
  ['Saturday', 'Site visits, by appointment'],
  ['Phone answered', '7:00-8:00 and 3:00-5:00'],
];

export default function TrueGrainCarpentryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#efe8d8',
        '--walnut': '#2a2017',
        '--oak': '#c58a3e',
        '--pencil': '#b4442b',
        '--slate': '#3f5b6b',
        '--birch': '#dcc59a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,walnut,oak,pencil,slate,birch"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>True Grain</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Carpentry and joinery</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barVisit" data-edit-max="28" className={s.barVisit} href="#contact">Book a site visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------ SHEET A-1
            The hero is a drawing sheet: a double border, the copy on the
            left, the elevation of a library wall on the right whose open
            shelves are stocked with the chamfer, and the title block in
            the corner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.sheet}>
            <div className={s.heroText}>
              <p data-edit="hero.sheetTag" data-edit-max="240" data-edit-multiline className={s.sheetTag}>Sheet A-1, general arrangement</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Joinery, stairs and trim, <em>fitted to the sixteenth.</em>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                True Grain is two finish carpenters with a shop on Sawpit Lane.
                We draw every job before we cut it, price it as a cut list you
                can read line by line, and scribe it to the walls you actually
                have.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a site visit</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#cut-list">Read the cut list</a>
              </div>
            </div>

            <figure className={s.elevation}>
              <div className={s.wall}>
                <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,5" className={s.shelfField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={chamfer}
                    palette={SHELVES}
                    fit="grid"
                    cellSize={34}
                    seed="truegrain-shelves"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.carcass} aria-hidden="true" />
                <div className={s.doors} aria-hidden="true" />
              </div>
              <p className={s.dimWide}>
                <span data-edit="hero.text" data-edit-max="60">8'-4 1/2"</span>
              </p>
              <p className={s.dimTall}>
                <span data-edit="hero.text2" data-edit-max="60">7'-10"</span>
              </p>
              <figcaption data-edit="hero.figcap" data-edit-max="120" data-edit-multiline className={s.figcap}>Elevation 1: library wall, Elm Terrace. Not to scale on a phone.</figcaption>
            </figure>

            <dl className={s.titleBlock}>
              <div className={s.tbWide}>
                <dt data-edit="hero.term" data-edit-max="28">Project</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>Finish carpentry and joinery</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Drawn</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>J. Marsh</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Checked</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>E. Varga</dd>
              </div>
              <div>
                <dt data-edit="hero.term4" data-edit-max="28">Scale</dt>
                <dd data-edit="hero.body4" data-edit-max="200" data-edit-multiline>1:20</dd>
              </div>
              <div>
                <dt data-edit="hero.term5" data-edit-max="28">Sheet</dt>
                <dd data-edit="hero.body5" data-edit-max="200" data-edit-multiline>A-1 of 5</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------ SHEET A-2 CUT LIST */}
        <section id="cut-list" className={s.sec} aria-labelledby="cut-h">
          <div className={s.secHead}>
            <p data-edit="cutList.sheetTag" data-edit-max="240" data-edit-multiline className={s.sheetTag}>Sheet A-2</p>
            <h2 data-edit="cutList.secTitle" data-edit-max="60" id="cut-h" className={s.secTitle}>The cut list</h2>
            <p data-edit="cutList.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              What we make most, priced the way we quote it. Prices are from,
              installed, and include finishing in the shop; painting on site
              is yours or your painter's.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.cutList}>
              <caption data-edit="cutList.srOnly" className={s.srOnly}>Typical jobs and prices</caption>
              <thead>
                <tr>
                  <th data-edit="cutList.heading" scope="col">No.</th>
                  <th data-edit="cutList.heading2" scope="col">Item</th>
                  <th data-edit="cutList.heading3" scope="col">Unit</th>
                  <th data-edit="cutList.heading4" scope="col">Material</th>
                  <th data-edit="cutList.heading5" scope="col">From</th>
                </tr>
              </thead>
              <tbody>
                {PARTS.map((p, i) => (
                  <tr key={p.no}>
                    <td data-edit={`cutList.partNo.${i}`} className={s.partNo}>{p.no}</td>
                    <th scope="row" className={s.partItem}>
                      <span data-edit={`cutList.partName.${i}`} data-edit-max="60" className={s.partName}>{p.item}</span>
                      <span data-edit={`cutList.partNote.${i}`} data-edit-max="60" className={s.partNote}>{p.note}</span>
                    </th>
                    <td data-edit={`cutList.partUnit.${i}`} className={s.partUnit}>{p.unit}</td>
                    <td data-edit={`cutList.partMat.${i}`} className={s.partMat}>{p.material}</td>
                    <td data-edit={`cutList.partFrom.${i}`} className={s.partFrom}>{p.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------ SHEET A-3 RATE */}
        <section id="rate" className={s.sec} aria-labelledby="rate-h">
          <div className={s.rateGrid}>
            <div className={s.ticket}>
              <p data-edit="rate.ticketHead" data-edit-max="240" data-edit-multiline className={s.ticketHead}>Work order</p>
              <h2 data-edit="rate.ticketTitle" data-edit-max="60" id="rate-h" className={s.ticketTitle}>The day rate</h2>
              <p data-edit="rate.ticketNote" data-edit-max="240" data-edit-multiline className={s.ticketNote}>
                For repairs, small jobs and anything that is not on the cut
                list: a sticking door, a stair that creaks, a run of base after
                new floors.
              </p>
              <dl className={s.rates}>
                {RATE.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`rate.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`rate.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="rate.ticketFoot" data-edit-max="240" data-edit-multiline className={s.ticketFoot}>Invoiced weekly, payable in 14 days. No charge for the drive inside the city.</p>
            </div>

            <div id="process" className={s.process}>
              <p data-edit="rate.sheetTag" data-edit-max="240" data-edit-multiline className={s.sheetTag}>Sheet A-3</p>
              <h2 data-edit="rate.secTitle" data-edit-max="60" className={s.secTitle}>How a job runs</h2>
              <ol className={s.steps}>
                {STEPS.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <h3 data-edit={`rate.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                    <p data-edit={`rate.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <div className={s.sampleBand}>
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,5,3,1" className={s.sampleField} aria-hidden="true">
            <TabbiedPattern
              pattern={chamfer}
              palette={SAMPLES}
              fit="grid"
              cellSize={56}
              seed="truegrain-samples"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p data-edit="top.sampleCard" data-edit-max="240" data-edit-multiline className={s.sampleCard}>Fig. 1: the chamfer, a square with its corner planed off.</p>
        </div>

        {/* ------------------------------------------------ SHEET A-4 GLOSSARY */}
        <section id="glossary" className={s.sec} aria-labelledby="glossary-h">
          <div className={s.secHead}>
            <p data-edit="glossary.sheetTag" data-edit-max="240" data-edit-multiline className={s.sheetTag}>Sheet A-4</p>
            <h2 data-edit="glossary.secTitle" data-edit-max="60" id="glossary-h" className={s.secTitle}>A joinery glossary</h2>
            <p data-edit="glossary.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Words you will hear on a site visit and see on a shop drawing.
              Ask about any of them; we like explaining this more than we
              should.
            </p>
          </div>
          <dl className={s.glossary}>
            {TERMS.map(([t, d], i) => (
              <div key={t} className={s.term}>
                <dt>
                  <span className={s.fig}>{`Fig. ${i + 1}`}</span>
                  <span data-edit={`glossary.termName.${i}`} data-edit-max="60" className={s.termName}>{t}</span>
                </dt>
                <dd data-edit={`glossary.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------ SHEET A-5 CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.sheetTag" data-edit-max="240" data-edit-multiline className={s.sheetTag}>Sheet A-5</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a site visit</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us what you want built and roughly where. We call back
                before eight or after three, when the saws are off.
              </p>
              <dl className={s.shop}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Shop</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Unit 3, 41 Sawpit Lane, Millbrook</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="tel:+15550127731">(555) 012-7731</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="mailto:shop@truegrain.example">shop@truegrain.example</a></dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="tg-name">Name</label>
                <input id="tg-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="tg-phone">Phone</label>
                <input id="tg-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="tg-email">Email</label>
                <input id="tg-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="tg-job">What are we building</label>
                <select id="tg-job" name="job" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Built-ins or shelving</option>
                  <option>Stairs or balustrade</option>
                  <option>Trim and molding</option>
                  <option>Doors</option>
                  <option>Repairs, on the day rate</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="tg-note">Rough sizes, and the age of the house</label>
                <textarea id="tg-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to the shop</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Photos help. Reply to our email with them once we have written back.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,5,3,4,0" className={s.footEdge} aria-hidden="true">
          <TabbiedPattern
            pattern={chamfer}
            palette={EDGE}
            fit="grid"
            cellSize={30}
            seed="truegrain-edge"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>True Grain Carpentry</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional carpentry shop. The carpenters, jobs, prices and address are invented.</p>
          <p>Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
        </div>
      </footer>
    </div>
  );
}
