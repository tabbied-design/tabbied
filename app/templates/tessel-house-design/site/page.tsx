import { TabbiedPattern } from 'tabbied/react';
import { cairo } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './tessel-house-design.module.css';

export const metadata = {
  title: 'Tessel House Design: Residential architect, one-person practice',
  description:
    'Tessel House Design is a one-architect practice drawing new houses, additions and careful renovations. Every sheet of the set, from the first sketch to the last site visit, by the same hand.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The Cairo
   tiling is the practice's mark: house-shaped pentagons laid in pairs, each
   pair turned to its neighbors, with the vellum showing between them as the
   grout. It fills the cover sheet, the featured project and the footer. */
const VELLUM = '#efebe1';
const GRAPHITE = '#26292c';
const CLAY = '#b4532f';
const SAGE = '#7f9474';
const OCHRE = '#d6a645';
const SLATE = '#4d6a80';

const TILES = ['transparent', GRAPHITE, CLAY, SAGE, OCHRE, SLATE];
const WARM = ['transparent', CLAY, OCHRE, SAGE, CLAY, OCHRE];
const NIGHT = ['transparent', SLATE, CLAY, OCHRE, SAGE, VELLUM];

const NAV = [
  ['A-101', 'Projects', '#projects'],
  ['A-201', 'Stages', '#stages'],
  ['A-301', 'Fees', '#fees'],
  ['A-401', 'Studio', '#studio'],
  ['A-901', 'Contact', '#contact'],
];

type Sheet = { no: string; title: string; place: string; kind: string; size: string; year: string };

/* The project list, set out as the sheet list of a drawing set. */
const SHEETS: Sheet[] = [
  { no: 'A-101', title: 'Hollow Lane House', place: 'Ridgeback', kind: 'New house, three bedrooms', size: '2,150 sq ft', year: '2025' },
  { no: 'A-102', title: 'Elm Row kitchen and porch', place: 'Old Town', kind: 'Rear addition', size: '640 sq ft', year: '2025' },
  { no: 'A-103', title: 'Quarry Road barn', place: 'Millbrook', kind: 'Barn to dwelling', size: '1,820 sq ft', year: '2024' },
  { no: 'A-104', title: 'Mercer Street cottage', place: 'East Side', kind: 'Backyard ADU', size: '540 sq ft', year: '2024' },
  { no: 'A-105', title: 'Ninth Avenue two-family', place: 'Hillcrest', kind: 'Energy retrofit', size: '3,100 sq ft', year: '2023' },
  { no: 'A-106', title: 'Linder Pond cabin', place: 'Lake Orrin', kind: 'Addition and screened room', size: '410 sq ft', year: '2022' },
];

type Stage = { no: string; name: string; weeks: string; share: string; what: string; get: string };

/* The five stages of a house, as the five sheets of a set. */
const STAGES: Stage[] = [
  { no: '01', name: 'Site and brief', weeks: '2-3 weeks', share: '10%', what: 'We walk the lot or the house together. I measure, check zoning and setbacks, and write down how you live now and how you want to.', get: 'A written brief, existing-condition drawings, a budget check' },
  { no: '02', name: 'Schematic design', weeks: '4-6 weeks', share: '20%', what: 'Two or three different plans, drawn quickly, with sketch elevations and a rough model. You choose one, or parts of two.', get: 'Plans, sketches, a cardboard model, a first cost estimate' },
  { no: '03', name: 'Design development', weeks: '6-8 weeks', share: '25%', what: 'The chosen scheme gets real: walls get thicknesses, windows get sizes, materials and the structural engineer come in.', get: 'Scaled plans, sections, elevations, a material board' },
  { no: '04', name: 'Construction drawings', weeks: '8-10 weeks', share: '30%', what: 'The set a builder prices and the town permits: every dimension, detail and specification, coordinated with the engineers.', get: 'The permit set, specifications, help choosing a builder' },
  { no: '05', name: 'Construction', weeks: 'Through the build', share: '15%', what: 'I visit the site every week or two, answer the builder\'s questions, review their invoices and walk the house with you at the end.', get: 'Site reports, a punch list, the record drawings' },
];

const FEES = [
  ['New house', '12% of construction cost', 'Full service, all five stages'],
  ['Addition or renovation', '15% of construction cost', 'Smaller jobs carry more existing work to draw'],
  ['Feasibility study', '$1,800 fixed', 'Can it be built here, and roughly what will it cost'],
  ['Design only', '$145 an hour', 'Stages 1-3, then your builder draws the rest'],
];

const SPLIT = [
  ['01', 'Site and brief', '10%', '$7,200'],
  ['02', 'Schematic design', '20%', '$14,400'],
  ['03', 'Design development', '25%', '$18,000'],
  ['04', 'Construction drawings', '30%', '$21,600'],
  ['05', 'Construction', '15%', '$10,800'],
];

const CREDS = [
  ['License', 'Registered architect in two states, NCARB certified'],
  ['Practice', 'Eighteen years, the last nine on my own'],
  ['Projects', 'Three to five at a time, never more'],
  ['Builders', 'Worked with eleven local contractors; you choose'],
  ['Energy', 'Certified passive house designer'],
];

export default function TesselHouseDesignPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--vellum': '#efebe1',
        '--graphite': '#26292c',
        '--clay': '#b4532f',
        '--sage': '#7f9474',
        '--ochre': '#d6a645',
        '--slate': '#4d6a80',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="vellum,graphite,clay,sage,ochre,slate"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Tessel House Design</span>
        </a>
        <nav className={s.nav} aria-label="Sheets">
          {NAV.map(([no, label, href], i) => (
            <a key={href} href={href}>
              <span data-edit={`bar.navNo.${i}`} data-edit-max="60" className={s.navNo}>{no}</span>
              <span data-edit={`bar.text.${i}`} data-edit-max="60">{label}</span>
            </a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([no, label, href], i) => (
            <a key={href} href={href}>
              <span data-edit={`bar.navNo2.${i}`} data-edit-max="60" className={s.navNo}>{no}</span>
              <span data-edit={`bar.text2.${i}`} data-edit-max="60">{label}</span>
            </a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------- A-001 COVER
            The cover sheet of the set: a border, the drawing, and a title
            block along the bottom edge. */}
        <section id="welcome" className={s.cover} aria-labelledby="hero-h">
          <div className={s.sheet}>
            <div className={s.coverText}>
              <p data-edit="welcome.sheetTag" data-edit-max="240" data-edit-multiline className={s.sheetTag}>A-001 Cover sheet</p>
              <h1 data-edit="welcome.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Houses drawn by one architect, <em>first sketch to last nail.</em>
              </h1>
              <p data-edit="welcome.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Tessel House Design is a practice of one. New houses, additions
                and careful renovations, with every sheet of the set and every
                site visit by the same person, so nothing you said in the first
                meeting is lost by the last.
              </p>
              <div className={s.heroActions}>
                <a data-edit="welcome.button" data-edit-max="28" className={s.button} href="#contact">Book a site visit</a>
                <a data-edit="welcome.ghost" data-edit-max="28" className={s.ghost} href="#projects">See the sheet list</a>
              </div>
            </div>
            <div className={s.drawing}>
              <div data-edit-pattern="welcome.field" data-edit-roles="transparent,1,2,3,4,5" className={s.drawingField} aria-hidden="true">
                <TabbiedPattern
                  pattern={cairo}
                  palette={TILES}
                  fit="grid"
                  cellSize={80}
                  seed="tessel-cover"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="welcome.drawingNote" data-edit-max="240" data-edit-multiline className={s.drawingNote}>Detail 1: Cairo tiling, pentagons in pairs. Scale 1:10.</p>
            </div>
            <dl className={s.titleBlock}>
              <div className={s.tbWide}>
                <dt data-edit="welcome.term" data-edit-max="28">Practice</dt>
                <dd data-edit="welcome.body" data-edit-max="200" data-edit-multiline>Tessel House Design</dd>
              </div>
              <div>
                <dt data-edit="welcome.term2" data-edit-max="28">Architect</dt>
                <dd data-edit="welcome.body2" data-edit-max="200" data-edit-multiline>Ruth Tessel, AIA</dd>
              </div>
              <div>
                <dt data-edit="welcome.term3" data-edit-max="28">Studio</dt>
                <dd data-edit="welcome.body3" data-edit-max="200" data-edit-multiline>14 Pell Street</dd>
              </div>
              <div>
                <dt data-edit="welcome.term4" data-edit-max="28">Taking on</dt>
                <dd data-edit="welcome.body4" data-edit-max="200" data-edit-multiline>Spring starts</dd>
              </div>
              <div>
                <dt data-edit="welcome.term5" data-edit-max="28">Sheet</dt>
                <dd data-edit="welcome.body5" data-edit-max="200" data-edit-multiline>A-001 of A-901</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------- A-101 PROJECTS
            The work, listed the way a set lists its sheets. */}
        <section id="projects" className={s.sec} aria-labelledby="projects-h">
          <div className={s.secHead}>
            <p className={s.marker}>
              <span data-edit="projects.text" data-edit-max="60">A-101</span>
            </p>
            <h2 data-edit="projects.secTitle" data-edit-max="60" id="projects-h" className={s.secTitle}>Sheet list: recent houses</h2>
            <p data-edit="projects.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six projects from the last four years, each one drawn, permitted
              and seen through construction by this office.
            </p>
          </div>
          <div className={s.projectsGrid}>
            <div className={s.tableWrap}>
              <table className={s.sheetTable}>
                <caption data-edit="projects.srOnly" className={s.srOnly}>Recent projects as a sheet list</caption>
                <thead>
                  <tr>
                    <th data-edit="projects.heading" scope="col">Sheet</th>
                    <th data-edit="projects.heading2" scope="col">Title</th>
                    <th data-edit="projects.heading3" scope="col">Work</th>
                    <th data-edit="projects.heading4" scope="col">Area</th>
                    <th data-edit="projects.heading5" scope="col">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {SHEETS.map((p, i) => (
                    <tr key={p.no}>
                      <td data-edit={`projects.sheetNo.${i}`} className={s.sheetNo}>{p.no}</td>
                      <th scope="row">
                        <span data-edit={`projects.projTitle.${i}`} data-edit-max="60" className={s.projTitle}>{p.title}</span>
                        <span data-edit={`projects.projPlace.${i}`} data-edit-max="60" className={s.projPlace}>{p.place}</span>
                      </th>
                      <td data-edit={`projects.cell.${i}`}>{p.kind}</td>
                      <td data-edit={`projects.num.${i}`} className={s.num}>{p.size}</td>
                      <td data-edit={`projects.num2.${i}`} className={s.num}>{p.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figure className={s.feature}>
              <div className={s.featureBox}>
                <div data-edit-pattern="projects.field" data-edit-roles="transparent,2,4,3,2,4" className={s.featureField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={cairo}
                    palette={WARM}
                    fit="grid"
                    cellSize={48}
                    seed="tessel-hollow-lane"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit="projects.featureTag" data-edit-max="240" data-edit-multiline className={s.featureTag}>A-101</p>
              </div>
              <figcaption data-edit="projects.featureCap" data-edit-max="120" data-edit-multiline className={s.featureCap}>
                Hollow Lane House: a long, low house on a north slope, its clay
                tile floor laid in this pattern from the hall to the terrace.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ----------------------------------------------------- A-201 STAGES */}
        <section id="stages" className={s.sec} aria-labelledby="stages-h">
          <div className={s.secHead}>
            <p className={s.marker}>
              <span data-edit="stages.text" data-edit-max="60">A-201</span>
            </p>
            <h2 data-edit="stages.secTitle" data-edit-max="60" id="stages-h" className={s.secTitle}>Five stages of a house</h2>
            <p data-edit="stages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A new house takes about eight months to draw and a year to build.
              You can stop after any stage, and you pay only for the stages done.
            </p>
          </div>
          <ol className={s.stages}>
            {STAGES.map((st, i) => (
              <li key={st.no} className={s.stage}>
                <p data-edit={`stages.stageNo.${i}`} data-edit-max="240" data-edit-multiline className={s.stageNo}>{st.no}</p>
                <h3 data-edit={`stages.stageName.${i}`} data-edit-max="40" className={s.stageName}>{st.name}</h3>
                <p data-edit={`stages.stageMeta.${i}`} data-edit-max="240" data-edit-multiline className={s.stageMeta}>{st.weeks}</p>
                <p data-edit={`stages.stageWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.stageWhat}>{st.what}</p>
                <p data-edit={`stages.stageGetLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.stageGetLabel}>Delivered</p>
                <p data-edit={`stages.stageGet.${i}`} data-edit-max="240" data-edit-multiline className={s.stageGet}>{st.get}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------- A-301 FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p className={s.marker}>
              <span data-edit="fees.text" data-edit-max="60">A-301</span>
            </p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Fees, in writing</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Agreed in a written contract before any drawing starts, and billed
              monthly against the stage we are in. No markup on consultants.
            </p>
          </div>
          <div className={s.feesGrid}>
            <table className={s.feeTable}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>Fee basis by type of project</caption>
              <tbody>
                {FEES.map(([what, fee, note], i) => (
                  <tr key={what}>
                    <th data-edit={`fees.heading.${i}`} scope="row">{what}</th>
                    <td>
                      <span data-edit={`fees.feeAmount.${i}`} data-edit-max="60" className={s.feeAmount}>{fee}</span>
                      <span data-edit={`fees.feeNote.${i}`} data-edit-max="60" className={s.feeNote}>{note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={s.worked}>
              <h3 data-edit="fees.workedTitle" data-edit-max="40" className={s.workedTitle}>Worked example</h3>
              <p data-edit="fees.workedText" data-edit-max="240" data-edit-multiline className={s.workedText}>
                A new house that costs $600,000 to build carries a fee of
                $72,000, paid across the five stages like this:
              </p>
              <ol className={s.split}>
                {SPLIT.map(([no, name, share, amount], i) => (
                  <li key={no} className={s[`split${no}`]}>
                    <span data-edit={`fees.splitName.${i}`} data-edit-max="60" className={s.splitName}>{name}</span>
                    <span className={s.splitBar} aria-hidden="true" />
                    <span data-edit={`fees.splitShare.${i}`} data-edit-max="60" className={s.splitShare}>{share}</span>
                    <span data-edit={`fees.splitAmount.${i}`} data-edit-max="60" className={s.splitAmount}>{amount}</span>
                  </li>
                ))}
              </ol>
              <p data-edit="fees.workedNote" data-edit-max="240" data-edit-multiline className={s.workedNote}>Engineers and the land survey are billed by them directly, usually $6,000 to $9,000 in all.</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4,5" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={cairo}
            palette={TILES}
            fit="grid"
            cellSize={40}
            seed="tessel-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------- A-401 STUDIO */}
        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studioGrid}>
            <div>
              <p className={s.marker}>
                <span data-edit="studio.text" data-edit-max="60">A-401</span>
              </p>
              <h2 data-edit="studio.secTitle" data-edit-max="60" id="studio-h" className={s.secTitle}>The studio is one person</h2>
            </div>
            <div className={s.studioText}>
              <p data-edit="studio.studioLead" data-edit-max="240" data-edit-multiline className={s.studioLead}>
                I am Ruth Tessel. I spent nine years in a large firm drawing
                hospitals, and left to draw houses for the people who will live
                in them. I work from a converted garage on Pell Street, with a
                model table, a plotter and room for you and a pot of coffee.
              </p>
              <p data-edit="studio.studioBody" data-edit-max="240" data-edit-multiline className={s.studioBody}>
                Working with one architect means you always know who to call. It
                also means I take on three to five houses at a time, and some
                months I am booked. When that happens I will tell you the date I
                can start, and I will keep it.
              </p>
              <dl className={s.creds}>
                {CREDS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`studio.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`studio.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- A-901 CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.secHead}>
            <p className={s.marker}>
              <span data-edit="contact.text" data-edit-max="60">A-901</span>
            </p>
            <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Start with a site visit</h2>
            <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The first visit is an hour on your lot or in your house, and it is
              free. Tell me a little about the project and I will call to book it.
            </p>
          </div>
          <div className={s.contactGrid}>
            <dl className={s.contactBlock}>
              <div>
                <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>14 Pell Street, rear building</dd>
              </div>
              <div>
                <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                <dd>
                  <a data-edit="contact.link" data-edit-max="28" href="tel:+15550193320">(555) 019-3320</a>
                </dd>
              </div>
              <div>
                <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="contact.link2" data-edit-max="28" href="mailto:ruth@tesselhouse.example">ruth@tesselhouse.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="contact.term4" data-edit-max="28">Hours</dt>
                <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Tuesday to Friday, 9 to 5. Site visits Mondays.</dd>
              </div>
            </dl>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="th-name">Name</label>
                <input id="th-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="th-email">Email</label>
                <input id="th-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="th-site">Address of the site</label>
                <input id="th-site" name="site" type="text" autoComplete="street-address" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">The project</legend>
                <div className={s.picks}>
                  {['New house', 'Addition', 'Renovation', 'Backyard ADU', 'Not sure yet'].map((kind, i) => (
                    <span key={kind} className={s.pick}>
                      <input id={`th-kind-${i}`} type="radio" name="kind" value={kind} />
                      <label data-edit={`contact.label4.${i}`} htmlFor={`th-kind-${i}`}>{kind}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="th-note">How you live, and what is not working</label>
                <textarea id="th-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to the studio</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,5,2,4,3,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={cairo}
            palette={NIGHT}
            fit="grid"
            cellSize={44}
            seed="tessel-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tessel House Design</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional architecture practice. The architect, projects, fees and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
