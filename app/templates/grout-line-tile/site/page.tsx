import { TabbiedPattern } from 'tabbied/react';
import { subwaytile, hongrie } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './grout-line-tile.module.css';

export const metadata = {
  title: 'Grout Line Tile Co.: Tile installation, drawn before it is set',
  description:
    'Grout Line Tile Co. installs backsplashes, shower walls and floors in Eastbrook and the river towns. Every wall is drawn to scale first, priced per square foot, and set level with tight joints.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Subway tile
   in running bond is the company's own wall: the drawing on the hero's
   plan sheet, the running-bond sample, three grout tests and the footer's
   wainscot. Color 0 is the grout, left transparent so each panel's own
   ground is the joint color. */
const PORCELAIN = '#f3f1ec';
const BOTTLE = '#14302b';
const GLAZE = '#2e7563';
const CELADON = '#a8cfc0';
const IVORY = '#e6dcc4';
const SPACER = '#c45f35';

const WALL = ['transparent', BOTTLE, GLAZE, CELADON, IVORY, CELADON, PORCELAIN];
const TEST = ['transparent', BOTTLE, IVORY, CELADON, IVORY, GLAZE, PORCELAIN];
const WAINSCOT = ['transparent', BOTTLE, GLAZE, CELADON, GLAZE, IVORY, PORCELAIN];
const CHEVRON = ['transparent', GLAZE, CELADON, IVORY, GLAZE, CELADON];

const NAV = [
  ['Layouts', '#layouts'],
  ['Grout', '#grout'],
  ['Prices', '#prices'],
  ['How we work', '#process'],
  ['Free measure', '#estimate'],
];

const SPECS = ['Licensed and insured', '2-year workmanship warranty', 'Showers flood-tested for 24 hours'];

const SHEET = [
  ['Project', 'Shower, three walls'],
  ['Tile', '3 x 6 in glazed ceramic'],
  ['Layout', 'Running bond, 1/2 offset'],
  ['Joint', '1/16 in, unsanded'],
  ['Area', '96 sq ft + 15% waste'],
  ['Scale', '1 in to 1 ft'],
];

const GROUTS = [
  { name: 'Light grout', kind: 'light', note: 'Disappears into white and ivory tile, so the wall reads as one surface. Seal it in a kitchen.' },
  { name: 'Mid gray grout', kind: 'mid', note: 'The forgiving one. Hides a coffee splash and still lets the pattern show.' },
  { name: 'Dark grout', kind: 'dark', note: 'Draws every line, so the layout becomes the design. We use epoxy here, which never needs sealing.' },
];

const PRICES = [
  ['Kitchen backsplash', '30 sq ft', '$22', '$660'],
  ['Bathroom floor', '50 sq ft', '$14', '$700'],
  ['Shower walls', '96 sq ft', '$18', '$1,730'],
  ['Tub surround', '70 sq ft', '$16', '$1,120'],
  ['Fireplace surround', '24 sq ft', '$28', '$670'],
  ['Entry or mudroom floor', '60 sq ft', '$12', '$720'],
];

const EXTRAS = [
  ['Demolition and haul-away', '$3.50 / sq ft'],
  ['Waterproofing membrane', '$4.00 / sq ft'],
  ['Floor leveling', '$2.50 / sq ft'],
  ['Epoxy grout', '+$2.00 / sq ft'],
  ['Metal edge trim', '$11 / linear ft'],
  ['Built-in shower niche', '$275 each'],
];

const STEPS = [
  ['01', 'Measure', 'A free 45-minute visit. We measure every wall, check it against a six-foot level and photograph every outlet and valve.'],
  ['02', 'Draw the layout', 'Your wall drawn to scale, so no sliver cuts land in a corner or at eye level. You approve it before any tile is ordered.'],
  ['03', 'Prepare', 'Demolition, cement board or membrane, and for showers a 24-hour flood test before a single tile goes up.'],
  ['04', 'Set', 'Thinset, leveling clips and spacers. Joints are checked with a straightedge every row, not at the end.'],
  ['05', 'Grout and caulk', 'Joints packed and tooled, then flexible caulk wherever two planes meet, color-matched to the grout.'],
  ['06', 'Seal and walk through', 'Grout sealed if it needs it, a walk-through with you and a punch list, and a two-year warranty in writing.'],
];

const HOURS = [
  ['Monday to Friday', '7:00-5:00'],
  ['Saturday', 'Showroom 9:00-1:00'],
  ['Sunday', 'Closed'],
];

export default function GroutLineTilePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--porcelain': '#f3f1ec',
        '--bottle': '#14302b',
        '--glaze': '#2e7563',
        '--celadon': '#a8cfc0',
        '--ivory': '#e6dcc4',
        '--spacer': '#c45f35',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="porcelain,bottle,glaze,celadon,ivory,spacer"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Grout Line</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Tile Co.</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barPhone" data-edit-max="28" className={s.barPhone} href="tel:+15550134470">(555) 013-4470</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: the pitch on the left, the plan sheet on the right. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Tile installation, Eastbrook and the river towns, since 2009</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Tile, planned to the <span>sixteenth of an inch.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We draw your wall before we touch it: every row, every cut,
              every outlet. Then we set it level, grout it tight and leave the
              room cleaner than we found it.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#estimate">Book a free measure</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#prices">Prices per square foot</a>
            </div>
            <ul className={s.specs}>
              {SPECS.map((x, i) => (
                <li data-edit={`hero.item.${i}`} data-edit-max="80" key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <figure className={s.sheet}>
            <div className={s.drawing}>
              <p data-edit="hero.dimTop" data-edit-max="240" data-edit-multiline className={s.dimTop}>60 in</p>
              <p data-edit="hero.dimSide" data-edit-max="240" data-edit-multiline className={s.dimSide}>96 in</p>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,3,0" className={s.wall} aria-hidden="true">
                <TabbiedPattern
                  pattern={subwaytile}
                  palette={WALL}
                  fit="grid"
                  cellSize={44}
                  seed="gl-hero-wall"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.niche} aria-hidden="true" />
              <p data-edit="hero.calloutNiche" data-edit-max="240" data-edit-multiline className={s.calloutNiche}>Niche, 12 x 24 in, on the tile lines</p>
              <p data-edit="hero.calloutEdge" data-edit-max="240" data-edit-multiline className={s.calloutEdge}>Metal edge trim</p>
            </div>
            <figcaption className={s.titleBlock}>
              <span data-edit="hero.sheetNo" data-edit-max="60" className={s.sheetNo}>Sheet A1 / Shower elevation</span>
              <dl className={s.sheetSpecs}>
                {SHEET.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`hero.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        </section>

        {/* LAYOUTS: four sample boards, one per pattern of laying. */}
        <section id="layouts" className={s.sec} aria-labelledby="layouts-h">
          <div className={s.secHead}>
            <p data-edit="layouts.label" data-edit-max="240" data-edit-multiline className={s.label}>01 / Layouts</p>
            <h2 data-edit="layouts.secTitle" data-edit-max="60" id="layouts-h" className={s.secTitle}>Choose how the tiles run</h2>
            <p data-edit="layouts.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The same box of tile makes four different walls. Labor is per
              square foot on top of the base price below; waste is how much
              extra tile to order for cuts and breakage.
            </p>
          </div>
          <ul className={s.boards}>
            <li className={s.board}>
              <div className={`${s.sample} ${s.stack}`} aria-hidden="true" />
              <h3 data-edit="layouts.boardName" data-edit-max="40" className={s.boardName}>Stack bond</h3>
              <p data-edit="layouts.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>
                Tiles stacked square, joints straight both ways. Clean and modern, and unforgiving: every crooked wall shows in it.
              </p>
              <dl className={s.boardFacts}>
                <div>
                  <dt data-edit="layouts.term" data-edit-max="28">Labor</dt>
                  <dd data-edit="layouts.body" data-edit-max="200" data-edit-multiline>Included</dd>
                </div>
                <div>
                  <dt data-edit="layouts.term2" data-edit-max="28">Order</dt>
                  <dd data-edit="layouts.body2" data-edit-max="200" data-edit-multiline>10% extra</dd>
                </div>
              </dl>
            </li>
            <li className={s.board}>
              <div data-edit-pattern="layouts.field" data-edit-roles="transparent,1,2,3,4,3,0" className={s.sample} aria-hidden="true">
                <TabbiedPattern
                  pattern={subwaytile}
                  palette={WALL}
                  fit="grid"
                  cellSize={40}
                  seed="gl-running"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="layouts.boardName2" data-edit-max="40" className={s.boardName}>Running bond</h3>
              <p data-edit="layouts.boardNote2" data-edit-max="240" data-edit-multiline className={s.boardNote}>
                The classic subway wall. Each row shifts half a tile, which hides small waves in an old wall.
              </p>
              <dl className={s.boardFacts}>
                <div>
                  <dt data-edit="layouts.term3" data-edit-max="28">Labor</dt>
                  <dd data-edit="layouts.body3" data-edit-max="200" data-edit-multiline>Included</dd>
                </div>
                <div>
                  <dt data-edit="layouts.term4" data-edit-max="28">Order</dt>
                  <dd data-edit="layouts.body4" data-edit-max="200" data-edit-multiline>10% extra</dd>
                </div>
              </dl>
            </li>
            <li className={s.board}>
              <div className={`${s.sample} ${s.vertical}`} aria-hidden="true" />
              <h3 data-edit="layouts.boardName3" data-edit-max="40" className={s.boardName}>Vertical stack</h3>
              <p data-edit="layouts.boardNote3" data-edit-max="240" data-edit-multiline className={s.boardNote}>
                Long tiles standing on end. A low bathroom ceiling reads taller, and the cuts land at the top, not at eye level.
              </p>
              <dl className={s.boardFacts}>
                <div>
                  <dt data-edit="layouts.term5" data-edit-max="28">Labor</dt>
                  <dd data-edit="layouts.body5" data-edit-max="200" data-edit-multiline>+$1.50 / sq ft</dd>
                </div>
                <div>
                  <dt data-edit="layouts.term6" data-edit-max="28">Order</dt>
                  <dd data-edit="layouts.body6" data-edit-max="200" data-edit-multiline>12% extra</dd>
                </div>
              </dl>
            </li>
            <li className={s.board}>
              <div data-edit-pattern="layouts.field2" data-edit-roles="transparent,2,3,4,2,3" className={s.sample} aria-hidden="true">
                <TabbiedPattern
                  pattern={hongrie}
                  palette={CHEVRON}
                  fit="grid"
                  cellSize={30}
                  seed="gl-chevron"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="layouts.boardName4" data-edit-max="40" className={s.boardName}>Chevron and herringbone</h3>
              <p data-edit="layouts.boardNote4" data-edit-max="240" data-edit-multiline className={s.boardNote}>
                Tiles cut or mitered into points down the wall or across a floor. Slow work, priced as such, worth it in a small room.
              </p>
              <dl className={s.boardFacts}>
                <div>
                  <dt data-edit="layouts.term7" data-edit-max="28">Labor</dt>
                  <dd data-edit="layouts.body7" data-edit-max="200" data-edit-multiline>+$4.50 / sq ft</dd>
                </div>
                <div>
                  <dt data-edit="layouts.term8" data-edit-max="28">Order</dt>
                  <dd data-edit="layouts.body8" data-edit-max="200" data-edit-multiline>18% extra</dd>
                </div>
              </dl>
            </li>
          </ul>
        </section>

        {/* GROUT: one wall, three joint colors. */}
        <section id="grout" className={s.grout} aria-labelledby="grout-h">
          <div className={s.groutInner}>
            <div className={s.secHead}>
              <p data-edit="grout.label" data-edit-max="240" data-edit-multiline className={s.label}>02 / Grout</p>
              <h2 data-edit="grout.secTitle" data-edit-max="60" id="grout-h" className={s.secTitle}>The grout changes the wall more than the tile does</h2>
              <p data-edit="grout.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The same tiles, laid the same way, with three joint colors. We
                bring real grout sticks to the measure so you can hold them to
                your own light.
              </p>
            </div>
            <div className={s.tests}>
              {GROUTS.map((g, i) => (
                <div key={g.name} className={s.test}>
                  <div data-edit-pattern={`grout.field.${i}`} data-edit-roles="transparent,1,4,3,4,2,0" className={`${s.testWall} ${s[g.kind]}`} aria-hidden="true">
                    <TabbiedPattern
                      pattern={subwaytile}
                      palette={TEST}
                      fit="grid"
                      cellSize={46}
                      seed={`gl-grout-${i}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <div className={s.testCard}>
                    <h3 data-edit={`grout.testName.${i}`} data-edit-max="40" className={s.testName}>{g.name}</h3>
                    <p data-edit={`grout.testNote.${i}`} data-edit-max="240" data-edit-multiline className={s.testNote}>{g.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICES: per square foot, with the extras spelled out. */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.priceGrid}>
            <div>
              <p data-edit="prices.label" data-edit-max="240" data-edit-multiline className={s.label}>03 / Prices</p>
              <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Priced per square foot, written down first</h2>
              <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Labor only. Bring your own tile, or we order it at our cost
                from the supplier and you see the invoice. Our minimum is
                $650, which is a backsplash.
              </p>
              <div className={s.minimum}>
                <p data-edit="prices.minimumFigure" data-edit-max="240" data-edit-multiline className={s.minimumFigure}>$650</p>
                <p data-edit="prices.minimumText" data-edit-max="240" data-edit-multiline className={s.minimumText}>Minimum job, including setup, materials for setting and cleanup</p>
              </div>
            </div>
            <div>
              <div className={s.tableWrap}>
                <table className={s.prices}>
                  <caption data-edit="prices.srOnly" className={s.srOnly}>Labor price per square foot by project</caption>
                  <thead>
                    <tr>
                      <th data-edit="prices.heading" scope="col">Project</th>
                      <th data-edit="prices.heading2" scope="col">Typical size</th>
                      <th data-edit="prices.heading3" scope="col">Per sq ft</th>
                      <th data-edit="prices.heading4" scope="col">Typical labor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICES.map(([p, size, rate, total], i) => (
                      <tr key={p}>
                        <th data-edit={`prices.heading5.${i}`} scope="row">{p}</th>
                        <td data-edit={`prices.cell.${i}`}>{size}</td>
                        <td data-edit={`prices.cell2.${i}`}>{rate}</td>
                        <td data-edit={`prices.cell3.${i}`}>{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3 data-edit="prices.extrasTitle" data-edit-max="40" className={s.extrasTitle}>Extras, when a job needs them</h3>
              <dl className={s.extras}>
                {EXTRAS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`prices.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* PROCESS: six steps laid like tiles in running bond. */}
        <section id="process" className={s.process} aria-labelledby="process-h">
          <div className={s.processInner}>
            <div className={s.secHead}>
              <p data-edit="process.label" data-edit-max="240" data-edit-multiline className={s.label}>04 / How we work</p>
              <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>Six steps, laid in order</h2>
            </div>
            <ol className={s.steps}>
              {STEPS.map(([n, t, d], i) => (
                <li key={n} className={s.step}>
                  <span data-edit={`process.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{n}</span>
                  <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                  <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ESTIMATE */}
        <section id="estimate" className={s.sec} aria-labelledby="estimate-h">
          <div className={s.estimateGrid}>
            <div>
              <p data-edit="estimate.label" data-edit-max="240" data-edit-multiline className={s.label}>05 / Free measure</p>
              <h2 data-edit="estimate.secTitle" data-edit-max="60" id="estimate-h" className={s.secTitle}>Book a measure</h2>
              <p data-edit="estimate.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us roughly what and how big. We will call to book a
                45-minute visit, and the drawing and written price follow
                within three working days.
              </p>
              <div className={s.contactCard}>
                <p data-edit="estimate.contactHead" data-edit-max="240" data-edit-multiline className={s.contactHead}>Workshop and showroom</p>
                <p data-edit="estimate.address" data-edit-max="240" data-edit-multiline className={s.address}>18 Kiln Lane, Unit 4, Eastbrook</p>
                <p className={s.contactLine}>
                  <a data-edit="estimate.link" data-edit-max="28" href="tel:+15550134470">(555) 013-4470</a>
                </p>
                <p className={s.contactLine}>
                  <a data-edit="estimate.link2" data-edit-max="28" href="mailto:jobs@groutline.example">jobs@groutline.example</a>
                </p>
                <dl className={s.hours}>
                  {HOURS.map(([d, h], i) => (
                    <div key={d}>
                      <dt data-edit={`estimate.term.${i}`} data-edit-max="28">{d}</dt>
                      <dd data-edit={`estimate.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="estimate.label2" htmlFor="gl-name">Name</label>
                <input id="gl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="estimate.label3" htmlFor="gl-phone">Phone</label>
                <input id="gl-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="estimate.label4" htmlFor="gl-email">Email</label>
                <input id="gl-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="estimate.label5" htmlFor="gl-project">Project</label>
                <select id="gl-project" name="project" defaultValue="shower">
                  <option value="backsplash">Kitchen backsplash</option>
                  <option value="shower">Shower walls</option>
                  <option value="floor">Floor</option>
                  <option value="tub">Tub surround</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="estimate.label6" htmlFor="gl-area">Rough size, sq ft</label>
                <input id="gl-area" name="area" type="number" min="1" inputMode="numeric" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="estimate.label7" htmlFor="gl-layout">Layout you are thinking of</label>
                <select id="gl-layout" name="layout" defaultValue="running">
                  <option value="stack">Stack bond</option>
                  <option value="running">Running bond</option>
                  <option value="vertical">Vertical stack</option>
                  <option value="chevron">Chevron or herringbone</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="estimate.label8" htmlFor="gl-note">Anything else</label>
                <textarea id="gl-note" name="note" rows={4} />
              </div>
              <button data-edit="estimate.submit" data-edit-max="24" className={s.submit} type="submit">Request a measure</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,2,4,0" className={s.footWall} aria-hidden="true">
          <TabbiedPattern
            pattern={subwaytile}
            palette={WAINSCOT}
            fit="grid"
            cellSize={38}
            seed="gl-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Grout Line Tile Co.</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional tile installer. The company, prices, address and phone number are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
