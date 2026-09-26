import { TabbiedPattern } from 'tabbied/react';
import { louvre, rafter } from 'tabbied/patterns';
import s from './ridgecap-roofing.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Ridgecap Roofing: Roofing contractor, Millrace',
  description:
    'Ridgecap Roofing replaces, repairs and inspects roofs around Millrace with three crews on payroll. Job types with specs, a materials table, the free 20-point inspection, how a job runs day by day, and the warranty in writing.',
};

/* Site colors. The gable is rafter stripes in navy and sky on the drawing
   sheet; the tape is the same stripes in safety orange on navy; the shingle
   sample is louvre in the page's own inks. */
const SHEET = '#f3f5f7';
const NAVY = '#14284a';
const ORANGE = '#f26419';
const SKY = '#8fb3dc';

const GABLE = [SHEET, NAVY, SKY, NAVY];
const TAPE = [NAVY, ORANGE];
const SHINGLE = [NAVY, SKY, SHEET, SKY];

const NAV = [
  ['Work', '#work'],
  ['Materials', '#materials'],
  ['Inspection', '#inspection'],
  ['Schedule', '#schedule'],
  ['Warranty', '#warranty'],
  ['Request', '#request'],
];

const SPAN = `32'-0"`;
const DIM_NOTE = `Typical two-story gable, 6:12 pitch, overhang 1'-6"`;

const CALLOUTS = [
  'Architectural shingle, 30-year, nailed six per shingle',
  'Ridge vent, shingle-over, full length',
  'Ice and water membrane, 6 ft up from the eave',
  'Drip edge, pre-finished aluminum',
];

const ASSEMBLY = [
  'Rafters as found, sistered where they sag',
  'Deck: 5/8 in plywood, replaced where soft, $95 a sheet',
  'Ice and water membrane at eaves and valleys',
  'Synthetic underlayment over the whole field',
  'Architectural shingles, six nails each',
];

const STATS = [
  ['Free inspection', 'within 5 working days'],
  ['Workmanship warranty', '20 years, in writing'],
  ['License', 'RC-40217, insured $2M'],
  ['Crews', '3, all on payroll, no subs'],
];

type Job = {
  tag: string;
  type: string;
  system: string;
  onSite: string;
  crew: string;
  from: string;
  warranty: string;
};

const JOBS: Job[] = [
  { tag: 'R-1', type: 'Full replacement', system: 'Architectural asphalt over new synthetic underlayment', onSite: '1-2 days', crew: '5', from: '$520 / sq', warranty: '20 yr + 50 yr mfr' },
  { tag: 'R-2', type: 'Standing seam metal', system: '24 ga steel, 16 in panels, concealed clips', onSite: '3-5 days', crew: '4', from: '$1,180 / sq', warranty: '20 yr + 40 yr finish' },
  { tag: 'R-3', type: 'Low-slope roof', system: '60 mil TPO, fully adhered, tapered insulation', onSite: '2-3 days', crew: '4', from: '$790 / sq', warranty: '20 yr + 20 yr mfr' },
  { tag: 'R-4', type: 'Leak repair', system: 'Found, photographed, fixed, and shown to you', onSite: '2-4 hr', crew: '2', from: '$375 flat', warranty: '5 yr on the repair' },
  { tag: 'R-5', type: 'Flashing and skylights', system: 'Step and counter flashing, curb-mounted units', onSite: '1 day', crew: '2', from: '$1,450 each', warranty: '10 yr' },
  { tag: 'R-6', type: 'Gutters', system: '6 in seamless aluminum, hidden hangers every 24 in', onSite: '1 day', crew: '2', from: '$16 / ft', warranty: '10 yr' },
];

const MATERIALS = [
  { name: 'Architectural asphalt shingle', weight: '240 lb', wind: '130 mph', impact: 'Class 3', life: '25-30 yr', cost: '$520' },
  { name: 'Impact-rated asphalt shingle', weight: '270 lb', wind: '130 mph', impact: 'Class 4', life: '30 yr', cost: '$610' },
  { name: 'Standing seam steel, 24 ga', weight: '110 lb', wind: '160 mph', impact: 'Class 4', life: '50 yr', cost: '$1,180' },
  { name: 'Cedar shake, tapersawn', weight: '350 lb', wind: '110 mph', impact: 'Class 2', life: '25-30 yr', cost: '$1,050' },
  { name: 'TPO membrane, 60 mil', weight: '30 lb', wind: 'per system', impact: 'n/a', life: '20-25 yr', cost: '$790' },
  { name: 'Natural slate', weight: '800 lb', wind: '110 mph', impact: 'Class 4', life: '100 yr', cost: 'repairs only' },
];

const CHECKS = [
  'Shingles: lifted, cracked, curled or missing',
  'Granule loss, checked in the gutters too',
  'Nail pops through the field',
  'Ridge cap and ridge vent',
  'Valleys: open or closed, and wear',
  'Step flashing at walls',
  'Chimney flashing and cricket',
  'Pipe boots and roof vents',
  'Skylight curbs and seals',
  'Drip edge and eave line',
  'Soffit and fascia rot',
  'Gutters: pitch, hangers, overflow marks',
  'Downspouts discharging clear of the wall',
  'Attic: daylight through the deck',
  'Attic: stains, mold, damp insulation',
  'Attic ventilation: intake and exhaust',
  'Deck: soft spots underfoot',
  'Moss, algae and overhanging limbs',
  'Earlier repairs, and how well they held',
  'Photos of all of it, in the report',
];

const DAYS = [
  { day: 'Day 0', what: 'Inspection', note: '45 minutes on the roof and in the attic' },
  { day: 'Day 2', what: 'Written quote', note: 'Fixed price, photos, line by line' },
  { day: 'Day 14', what: 'Materials land', note: 'Dropped on the drive, tarped' },
  { day: 'Day 15', what: 'Tear-off, dry-in', note: 'Old roof off, deck checked, underlayment on by dusk' },
  { day: 'Day 16', what: 'Install', note: 'Shingles, flashing, vents, ridge' },
  { day: 'Day 17', what: 'Clean-up', note: 'Magnet sweep of the yard for nails, twice' },
  { day: 'Day 18', what: 'Walk-round', note: 'You sign off; the warranty certificate is posted' },
];

const COVERED = [
  'Leaks caused by our installation, for 20 years from the finish date.',
  'Flashing we installed, including where it meets old work.',
  'Shingles that blow off below the rated wind speed.',
  'Labor to repair any of the above, at no charge.',
  'Transfer to the next owner of the house, once, free.',
];

const NOT_COVERED = [
  'Damage from falling trees, hail over 2 in, or fire.',
  'Work by anyone else on the roof after us.',
  'Satellite dishes or solar mounts added later.',
  'Ice dams on houses without the ventilation we quoted.',
  'Cosmetic streaking from algae after year 10.',
];

const CREWS = [
  ['Crew A', 'Dale Okoro', 'Asphalt replacements, 22 years on roofs'],
  ['Crew B', 'Rosa Lindgren', 'Low-slope and repairs, 14 years'],
  ['Crew C', 'Tomas Varga', 'Standing seam metal, 18 years'],
];

export default function RidgecapPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markRidge} aria-hidden="true" />
          <span className={s.markName}>Ridgecap</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550192750">(555) 019-2750</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ---------------------------------------------------- A-001 COVER
            The gable drawn as an elevation: the stripes are the rafters,
            with a span dimension, a pitch triangle and numbered callouts. */}
        <section className={`${s.sheet} ${s.grid}`} aria-labelledby="cover-h">
          <p className={s.sheetNo}>Sheet A-001</p>
          <div className={s.cover}>
            <div className={s.coverText}>
              <p className={s.kicker}>Roofing contractor, Millrace. Est. 1998.</p>
              <h1 id="cover-h" className={s.title}>
                Roofs specified <em>before they are sold</em>
              </h1>
              <p className={s.lede}>
                Every Ridgecap quote is a spec sheet: what comes off, what goes
                on, by the square, with the product names and the days on site.
                You can hand it to any other roofer and get a fair comparison.
              </p>
              <div className={s.actions}>
                <a className={s.button} href="#request">Book a free inspection</a>
                <a className={s.ghost} href="#work">See the job specs</a>
              </div>
            </div>

            <div className={s.drawing}>
              <div className={s.elevation}>
                <div className={s.gable} aria-hidden="true">
                  <TabbiedPattern
                    pattern={rafter}
                    palette={GABLE}
                    fit="grid"
                    cellSize={34}
                    seed="ridgecap-gable"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.walls} aria-hidden="true">
                  <span className={s.win} />
                  <span className={s.door} />
                  <span className={s.win} />
                </div>
                <span className={`${s.bubble} ${s.b1}`}>1</span>
                <span className={`${s.bubble} ${s.b2}`}>2</span>
                <span className={`${s.bubble} ${s.b3}`}>3</span>
                <span className={`${s.bubble} ${s.b4}`}>4</span>
                <div className={s.pitch}>
                  <span className={s.pitchRise}>6</span>
                  <span className={s.pitchRun}>12</span>
                </div>
              </div>
              <div className={s.dim}>
                <span className={s.dimText}>{SPAN}</span>
              </div>
              <p className={s.dimNote}>{DIM_NOTE}</p>
              <ol className={s.legend}>
                {CALLOUTS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
            </div>
          </div>

          <dl className={s.stats}>
            {STATS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className={s.tape} aria-hidden="true">
          <TabbiedPattern
            pattern={rafter}
            palette={TAPE}
            fit="grid"
            cellSize={28}
            seed="ridgecap-tape"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------- A-201 JOB TYPES */}
        <section id="work" className={s.sheet} aria-labelledby="work-h">
          <p className={s.sheetNo}>Sheet A-201</p>
          <div className={s.workTop}>
            <div className={s.head}>
              <p className={s.kicker}>Schedule of work</p>
              <h2 id="work-h" className={s.h2}>Six jobs we do, and the spec for each</h2>
              <p className={s.note}>
                Prices are per square (100 sq ft of roof) installed, tear-off and
                disposal included, for a walkable pitch up to 8:12. Steeper roofs
                add 15 percent for the harness and the time.
              </p>
              <ol className={s.assembly}>
                {ASSEMBLY.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            </div>
            <figure className={s.detail}>
              <Artwork
                slug="ridgecap-roofing-layers"
                alt="A cutaway of a pitched roof: rafters, deck boards, membrane, underlayment and overlapping shingles"
                inks={['var(--text)']}
                className={s.detailArt}
              />
              <figcaption className={s.detailTag}>Detail 1: R-1 assembly, bottom to top. Not to scale.</figcaption>
            </figure>
          </div>
          <table className={s.schedule}>
            <caption className={s.srOnly}>Job types with system, time on site, crew size, starting price and warranty</caption>
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Job</th>
                <th scope="col">System</th>
                <th scope="col">On site</th>
                <th scope="col">Crew</th>
                <th scope="col">From</th>
                <th scope="col">Warranty</th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map((j) => (
                <tr key={j.tag}>
                  <td className={s.tagCell}>
                    <span className={s.tag}>{j.tag}</span>
                  </td>
                  <th scope="row" className={s.jobName}>{j.type}</th>
                  <td className={s.system}>{j.system}</td>
                  <td data-label="On site">{j.onSite}</td>
                  <td data-label="Crew">{j.crew}</td>
                  <td data-label="From" className={s.from}>{j.from}</td>
                  <td data-label="Warranty">{j.warranty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ----------------------------------------------- A-301 MATERIALS */}
        <section id="materials" className={s.sheet} aria-labelledby="materials-h">
          <p className={s.sheetNo}>Sheet A-301</p>
          <div className={s.materials}>
            <div className={s.sample}>
              <div className={s.sampleField} aria-hidden="true">
                <TabbiedPattern
                  pattern={louvre}
                  palette={SHINGLE}
                  fit="grid"
                  cellSize={30}
                  seed="ridgecap-shingle"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.sampleTag}>Sample board 04: architectural shingle, harbor slate</p>
            </div>
            <div className={s.materialsBody}>
              <div className={s.head}>
                <p className={s.kicker}>Materials</p>
                <h2 id="materials-h" className={s.h2}>What goes on the roof, by the numbers</h2>
                <p className={s.note}>
                  Weight is per square, which matters for old framing. Wind is
                  the rating with our nailing pattern. We stopped installing
                  3-tab shingle in 2019 and will tell you why on the roof.
                </p>
              </div>
              <table className={s.matTable}>
                <caption className={s.srOnly}>Roofing materials compared</caption>
                <thead>
                  <tr>
                    <th scope="col">Material</th>
                    <th scope="col">Weight / sq</th>
                    <th scope="col">Wind</th>
                    <th scope="col">Impact</th>
                    <th scope="col">Life</th>
                    <th scope="col">Installed / sq</th>
                  </tr>
                </thead>
                <tbody>
                  {MATERIALS.map((m) => (
                    <tr key={m.name}>
                      <th scope="row">{m.name}</th>
                      <td data-label="Weight / sq">{m.weight}</td>
                      <td data-label="Wind">{m.wind}</td>
                      <td data-label="Impact">{m.impact}</td>
                      <td data-label="Life">{m.life}</td>
                      <td data-label="Installed / sq" className={s.from}>{m.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------- A-401 INSPECTION */}
        <section id="inspection" className={s.blueprint} aria-labelledby="inspection-h">
          <div className={s.blueInner}>
            <p className={s.sheetNoBlue}>Sheet A-401</p>
            <div className={s.blueHead}>
              <p className={s.kicker}>Free inspection checklist</p>
              <h2 id="inspection-h" className={s.h2}>Twenty points, forty-five minutes, no charge</h2>
              <p className={s.note}>
                One of our foremen, not a salesperson. We go up if it is safe
                and fly a small drone if it is not. You get the checklist back
                within 48 hours with a photo against every line, whether you
                hire us or not.
              </p>
            </div>
            <ol className={s.checks}>
              {CHECKS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------ A-402 SCHEDULE */}
        <section id="schedule" className={s.sheet} aria-labelledby="schedule-h">
          <p className={s.sheetNo}>Sheet A-402</p>
          <div className={s.head}>
            <p className={s.kicker}>How a replacement runs</p>
            <h2 id="schedule-h" className={s.h2}>Eighteen days, dimensioned</h2>
            <p className={s.note}>
              A typical asphalt replacement from the first visit to the signed
              certificate. The house is never left open overnight: if rain is
              due, we only strip what we can dry in by dusk.
            </p>
          </div>
          <ol className={s.run}>
            {DAYS.map((d) => (
              <li key={d.day} className={s.runStep}>
                <span className={s.runDay}>{d.day}</span>
                <span className={s.runWhat}>{d.what}</span>
                <span className={s.runNote}>{d.note}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------ A-501 WARRANTY */}
        <section id="warranty" className={s.sheet} aria-labelledby="warranty-h">
          <p className={s.sheetNo}>Sheet A-501</p>
          <div className={s.head}>
            <p className={s.kicker}>General notes: warranty</p>
            <h2 id="warranty-h" className={s.h2}>Twenty years on our work, in plain terms</h2>
          </div>
          <div className={s.terms}>
            <div className={s.termsCol}>
              <h3 className={s.termsTitle}>Covered</h3>
              <ol className={s.termsList}>
                {COVERED.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
            </div>
            <div className={s.termsCol}>
              <h3 className={s.termsTitle}>Not covered</h3>
              <ol className={s.termsList}>
                {NOT_COVERED.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
            </div>
          </div>
          <p className={s.claim}>
            To claim: call or email with a photo if you can. We inspect within
            72 hours, and a leak we caused is tarped the same day.
          </p>
          <dl className={s.crews}>
            {CREWS.map(([crew, name, what]) => (
              <div key={crew}>
                <dt>{crew}</dt>
                <dd className={s.crewName}>{name}</dd>
                <dd className={s.crewWhat}>{what}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------- A-601 REQUEST */}
        <section id="request" className={`${s.sheet} ${s.grid}`} aria-labelledby="request-h">
          <p className={s.sheetNo}>Sheet A-601</p>
          <div className={s.request}>
            <form className={s.form} action="#">
              <h2 id="request-h" className={s.h2}>Request an inspection</h2>
              <p className={s.note}>We call back within one working day to set a time.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="rc-name">Name</label>
                  <input id="rc-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="rc-phone">Phone</label>
                  <input id="rc-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="rc-address">Property address</label>
                  <input id="rc-address" name="address" type="text" autoComplete="street-address" />
                </div>
                <div className={s.field}>
                  <label htmlFor="rc-roof">Roof type</label>
                  <select id="rc-roof" name="roof" defaultValue="asphalt">
                    <option value="asphalt">Asphalt shingle</option>
                    <option value="metal">Metal</option>
                    <option value="flat">Flat or low-slope</option>
                    <option value="wood">Cedar shake</option>
                    <option value="slate">Slate or tile</option>
                    <option value="unsure">Not sure</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="rc-age">Roof age, roughly</label>
                  <select id="rc-age" name="age" defaultValue="15">
                    <option value="5">Under 10 years</option>
                    <option value="15">10 to 20 years</option>
                    <option value="25">Over 20 years</option>
                    <option value="unknown">No idea</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="rc-reason">Reason</label>
                  <select id="rc-reason" name="reason" defaultValue="check">
                    <option value="check">A check-up, nothing wrong yet</option>
                    <option value="leak">A leak</option>
                    <option value="storm">Storm damage</option>
                    <option value="replace">A replacement quote</option>
                    <option value="gutters">Gutters</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="rc-notes">Notes (where the stain is, a gate code)</label>
                  <textarea id="rc-notes" name="notes" rows={3} />
                </div>
              </div>
              <button className={s.button} type="submit">Send request</button>
            </form>

            <div className={s.yard}>
              <p className={s.kicker}>The yard</p>
              <p className={s.address}>
                1180 Tannery Road
                <br />
                Millrace
              </p>
              <dl className={s.hours}>
                <div>
                  <dt>Office</dt>
                  <dd>Mon-Fri, 7:00-17:00</dd>
                </div>
                <div>
                  <dt>Saturday</dt>
                  <dd>8:00-12:00, repairs only</dd>
                </div>
                <div>
                  <dt>Storm line</dt>
                  <dd>24 hours, tarping same day</dd>
                </div>
              </dl>
              <p className={s.contact}>
                <a href="tel:+15550192750">(555) 019-2750</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:office@ridgecap.example">office@ridgecap.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTape} aria-hidden="true">
          <TabbiedPattern
            pattern={rafter}
            palette={TAPE}
            fit="grid"
            cellSize={28}
            seed="ridgecap-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.titleBlock}>
          <div className={s.tbCell}>
            <p className={s.tbLabel}>Project</p>
            <p className={s.tbName}>Ridgecap Roofing</p>
          </div>
          <div className={s.tbCell}>
            <p className={s.tbLabel}>Note</p>
            <p>A fictional roofing contractor. Jobs, prices and license numbers are invented. The roof detail is a generated image, drawn in the page's own colors.</p>
          </div>
          <div className={s.tbCell}>
            <p className={s.tbLabel}>Drawn by</p>
            <p>
              Patterns by{' '}
              <a href="https://tabbied.com" rel="noopener">Tabbied</a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
