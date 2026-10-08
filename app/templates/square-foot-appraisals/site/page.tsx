import { TabbiedPattern } from 'tabbied/react';
import { bevelset } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './square-foot-appraisals.module.css';

export const metadata = {
  title: 'Square Foot Appraisals: Certified residential appraiser, Marlow County',
  description:
    'Square Foot Appraisals values houses, condos and small rentals across Marlow and Ashby counties. Full interior reports from $525, five business days, comparables you can read.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is an
   appraisal report: pale form paper, navy rules and type, a red pencil for
   the reviewer's marks. Bevelset is the old octagon-and-dot hall floor every
   appraiser has measured a hundred times: it fills the subject photo box,
   runs as the section break, cuts the certification seal and edges the
   footer. */
const FORM = '#eef1ec';
const NAVY = '#1f2d4a';
const RED = '#c4402f';
const TEAL = '#3f8a7e';
const OCHRE = '#e2ac3f';
const SKY = '#9db8d6';

const HALL = [NAVY, FORM, FORM, SKY, FORM, TEAL];
const BREAK = ['transparent', NAVY, TEAL, OCHRE, SKY, RED];
const SEAL = [NAVY, FORM, OCHRE, FORM, SKY, RED];
const EDGE = ['transparent', SKY, TEAL, OCHRE, RED, FORM];

const NAV = [
  ['Subject', '#subject'],
  ['Comparables', '#comps'],
  ['Fees', '#fees'],
  ['Inspection', '#inspection'],
  ['Credentials', '#credentials'],
  ['Order', '#order'],
];

const HERO_FIELDS = [
  ['Full report', '$525'],
  ['Turnaround', '5 days'],
  ['Reports', '3,140'],
  ['State license', 'CR-004417'],
];

const PROPERTY_TYPES: [string, boolean][] = [
  ['Single family, detached', true],
  ['Condominium', true],
  ['Townhouse or row house', true],
  ['Two to four units', true],
  ['Manufactured, on owned land', true],
  ['Commercial or mixed use', false],
];

const PURPOSES: [string, boolean][] = [
  ['Purchase', true],
  ['Refinance', true],
  ['Estate and probate', true],
  ['Divorce and separation', true],
  ['PMI removal', true],
  ['Property tax appeal', true],
];

const AREA = [
  ['County', 'Marlow, Ashby, eastern Fenwick'],
  ['Travel included', '25 miles from Cobbler Row'],
  ['Intended users', 'Lenders, attorneys, executors, owners'],
  ['Lender panels', 'Eleven, plus direct orders'],
];

type Comp = { label: string; subject: string; c1: string; a1: string; c2: string; a2: string; c3: string; a3: string };

/* A real-shaped grid from a 2025 refinance, addresses changed. Each comp is
   adjusted toward the subject: a smaller house gets money added, a bigger
   one has money taken away. */
const COMPS: Comp[] = [
  { label: 'Address', subject: '18 Quarry Hill Rd', c1: '7 Tanner Ct', a1: '', c2: '203 Quarry Hill Rd', a2: '', c3: '55 Old Orchard Way', a3: '' },
  { label: 'Proximity', subject: 'Subject', c1: '0.3 mi NE', a1: '', c2: '0.1 mi W', a2: '', c3: '0.6 mi S', a3: '' },
  { label: 'Sale price', subject: 'Refinance', c1: '$398,500', a1: '', c2: '$431,000', a2: '', c3: '$405,000', a3: '' },
  { label: 'Date of sale', subject: 'Eff. 06/2026', c1: '04/2026', a1: '0', c2: '02/2026', a2: '0', c3: '05/2026', a3: '0' },
  { label: 'Living area', subject: '1,860 sq ft', c1: '1,720 sq ft', a1: '+9,800', c2: '2,010 sq ft', a2: '-10,500', c3: '1,880 sq ft', a3: '-1,400' },
  { label: 'Bed / bath', subject: '3 / 2', c1: '3 / 1.5', a1: '+6,000', c2: '4 / 2.5', a2: '-9,000', c3: '3 / 2', a3: '0' },
  { label: 'Garage', subject: '1 car', c1: '1 car', a1: '0', c2: '2 car', a2: '-8,000', c3: 'None', a3: '+7,500' },
  { label: 'Condition', subject: 'C3, kitchen 2021', c1: 'C4, original', a1: '+12,000', c2: 'C3', a2: '0', c3: 'C3', a3: '0' },
  { label: 'Net adjustment', subject: '', c1: '+27,800', a1: '7.0%', c2: '-27,500', a2: '6.4%', c3: '+6,100', a3: '1.5%' },
  { label: 'Adjusted price', subject: '', c1: '$426,300', a1: '', c2: '$403,500', a2: '', c3: '$411,100', a3: '' },
];

type Fee = { report: string; form: string; use: string; fee: string; days: string };

const FEES: Fee[] = [
  { report: 'Full interior appraisal', form: 'Form 1004', use: 'Purchase, refinance, most loans', fee: '$525', days: '5 days' },
  { report: 'Condominium unit', form: 'Form 1073', use: 'Condo purchase or refinance', fee: '$500', days: '5 days' },
  { report: 'Two to four units', form: 'Form 1025', use: 'Small rentals, with rent schedule', fee: '$750', days: '7 days' },
  { report: 'Exterior only', form: 'Form 2055', use: 'Home equity lines, some refinances', fee: '$375', days: '3 days' },
  { report: 'Desktop appraisal', form: '1004 Desktop', use: 'Lender-approved purchases only', fee: '$325', days: '2 days' },
  { report: 'Date-of-death value', form: 'Narrative', use: 'Estates, probate, stepped-up basis', fee: '$475', days: '7 days' },
  { report: 'Pre-listing appraisal', form: 'Narrative', use: 'Sellers setting an asking price', fee: '$395', days: '4 days' },
  { report: 'Completion re-inspection', form: 'Form 1004D', use: 'After repairs a lender required', fee: '$150', days: '2 days' },
];

const FEE_NOTES = [
  ['Rush', '$150 added, report in two business days'],
  ['Over 25 miles', '$75 added for the drive'],
  ['Over 4,000 sq ft or 5 acres', 'Quoted before we book'],
  ['Paid by', 'Card or check at the visit, or through your lender'],
];

const STEPS = [
  ['We call to book', 'Within one business day of the order. Most visits happen inside the week, early mornings and Saturdays included.'],
  ['The visit, 30 to 60 minutes', 'We measure the outside walls, walk every room, photograph each one and note the age of the roof, the furnace and the kitchen. You do not need to tidy.'],
  ['The research', 'Closed sales from the multiple listing service and county records, within a mile and six months where the market allows. Three to six comparables make the grid.'],
  ['The report', 'Adjustments, a reconciliation in plain words and a signed PDF. Lenders get it through their portal, owners get it by email and a printed copy on request.'],
];

const READY = [
  'A list of updates with the year and rough cost: roof, windows, kitchen, baths',
  'The survey or plot plan, if you have one',
  'Permits for any finished basement or addition',
  'For a condo, the association name and the monthly fee',
  'Keys or codes for an outbuilding, attic hatch or crawl space',
];

const CREDENTIALS = [
  ['Appraiser', 'Martin Ochs'],
  ['Certification', 'Certified Residential, license CR-004417'],
  ['Valid through', '06/30/2027'],
  ['Appraising since', '2007, about 3,140 reports signed'],
  ['Continuing education', 'USPAP 7-hour update, March 2026'],
  ['Errors and omissions', 'Insured to $1,000,000'],
  ['Government panels', 'FHA roster and VA fee panel'],
];

const HOURS = [
  ['Monday to Friday', '8:00-5:30'],
  ['Saturday', 'Inspections only, 8:00-1:00'],
  ['Sunday', 'Closed'],
];

export default function SquareFootAppraisalsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--form': '#eef1ec',
        '--navy': '#1f2d4a',
        '--red': '#c4402f',
        '--teal': '#3f8a7e',
        '--ochre': '#e2ac3f',
        '--sky': '#9db8d6',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="form,navy,red,teal,ochre,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&family=Archivo+Narrow:wght@500;600&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Square Foot</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Appraisals</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barOrder" data-edit-max="28" className={s.barOrder} href="#order">Order an appraisal</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Page one of the report: a file line, the headline as the
            appraiser's summary, the boxed facts, and the subject photo box,
            which holds the hall floor instead of a photograph. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.fileLine}>
            <p data-edit="intro.fileCell" data-edit-max="240" data-edit-multiline className={s.fileCell}>Residential appraisal services</p>
            <p data-edit="intro.fileCell2" data-edit-max="240" data-edit-multiline className={s.fileCell}>File no. SFA-26-0418</p>
            <p data-edit="intro.fileCell3" data-edit-max="240" data-edit-multiline className={s.fileCell}>Marlow County</p>
          </div>
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Certified residential appraiser, Cobbler Row</p>
              <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                An honest number for the house, <em>shown line by line.</em>
              </h1>
              <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                We value houses, condos and small rentals for buyers, lenders,
                executors and owners. Every report shows the sales we used and
                every dollar we added or took away, so you can follow the
                arithmetic to the final value.
              </p>
              <div className={s.heroActions}>
                <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#order">Order an appraisal</a>
                <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#fees">See fees and turnaround</a>
              </div>
              <dl className={s.heroFields}>
                {HERO_FIELDS.map(([term, value], i) => (
                  <div key={term} className={s.box}>
                    <dt data-edit={`intro.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`intro.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className={s.photoBox}>
              <p data-edit="intro.photoLabel" data-edit-max="240" data-edit-multiline className={s.photoLabel}>Subject photo, front hall</p>
              <div data-edit-pattern="intro.field" data-edit-roles="1,0,0,5,0,3" className={s.hallField} aria-hidden="true">
                <TabbiedPattern
                  pattern={bevelset}
                  palette={HALL}
                  fit="grid"
                  cellSize={64}
                  seed="sfa-hall"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="intro.photoCaption" data-edit-max="120" data-edit-multiline className={s.photoCaption}>Octagon and dot tile, about 1912. Measured, noted, adjusted for.</figcaption>
            </figure>
          </div>
        </section>

        {/* --------------------------------------------------------- SUBJECT
            The subject block of the form: tick boxes for what we take on. */}
        <section id="subject" className={s.part} aria-labelledby="subject-h">
          <div className={s.strip}>
            <span data-edit="subject.stripNo" data-edit-max="60" className={s.stripNo}>Section 1</span>
            <span data-edit="subject.stripTag" data-edit-max="60" className={s.stripTag}>Subject</span>
          </div>
          <div className={s.partHead}>
            <h2 data-edit="subject.partTitle" data-edit-max="60" id="subject-h" className={s.partTitle}>What we appraise, and for whom</h2>
          </div>
          <div className={s.subjectGrid}>
            <div className={s.box}>
              <h3 data-edit="subject.boxTitle" data-edit-max="40" className={s.boxTitle}>Property type</h3>
              <ul className={s.ticks}>
                {PROPERTY_TYPES.map(([label, on], i) => (
                  <li data-edit={`subject.on.${i}`} data-edit-max="80" key={label} className={on ? s.on : s.off}>{label}</li>
                ))}
              </ul>
            </div>
            <div className={s.box}>
              <h3 data-edit="subject.boxTitle2" data-edit-max="40" className={s.boxTitle}>Purpose of the appraisal</h3>
              <ul className={s.ticks}>
                {PURPOSES.map(([label, on], i) => (
                  <li data-edit={`subject.on2.${i}`} data-edit-max="80" key={label} className={on ? s.on : s.off}>{label}</li>
                ))}
              </ul>
            </div>
            <dl className={s.areaBox}>
              {AREA.map(([term, value], i) => (
                <div key={term} className={s.box}>
                  <dt data-edit={`subject.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`subject.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p data-edit="subject.partNote" data-edit-max="240" data-edit-multiline className={s.partNote}>
            Commercial buildings, farms over 20 acres and new construction from
            plans go to colleagues we trust. Ask and we will pass on a name.
          </p>
        </section>

        {/* ----------------------------------------------------------- COMPS */}
        <section id="comps" className={s.part} aria-labelledby="comps-h">
          <div className={s.strip}>
            <span data-edit="comps.stripNo" data-edit-max="60" className={s.stripNo}>Section 2</span>
            <span data-edit="comps.stripTag" data-edit-max="60" className={s.stripTag}>Sales comparison approach</span>
          </div>
          <div className={s.partHead}>
            <h2 data-edit="comps.partTitle" data-edit-max="60" id="comps-h" className={s.partTitle}>How the number is made</h2>
          </div>
          <div className={s.compsIntro}>
            <p data-edit="comps.compsLead" data-edit-max="240" data-edit-multiline className={s.compsLead}>
              An appraisal is not an opinion pulled from the air. We find recent
              sales of houses like yours, then adjust each one for what it has
              that yours lacks, or lacks that yours has. Where the adjusted
              prices settle is the value.
            </p>
            <p data-edit="comps.compsAside" data-edit-max="240" data-edit-multiline className={s.compsAside}>From a 2025 refinance. Addresses changed, arithmetic kept.</p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.comps}>
              <caption data-edit="comps.srOnly" className={s.srOnly}>Comparable sales grid with adjustments</caption>
              <thead>
                <tr>
                  <th data-edit="comps.rowHead" scope="col" className={s.rowHead}>Feature</th>
                  <th data-edit="comps.subjectCol" scope="col" className={s.subjectCol}>Subject</th>
                  <th data-edit="comps.heading" scope="col">Comparable 1</th>
                  <th data-edit="comps.heading2" scope="col">Comparable 2</th>
                  <th data-edit="comps.heading3" scope="col">Comparable 3</th>
                </tr>
              </thead>
              <tbody>
                {COMPS.map((r, i) => (
                  <tr key={r.label} className={r.label === 'Adjusted price' ? s.totalRow : undefined}>
                    <th data-edit={`comps.rowHead2.${i}`} scope="row" className={s.rowHead}>{r.label}</th>
                    <td data-edit={`comps.subjectCol2.${i}`} className={s.subjectCol}>{r.subject}</td>
                    <td>
                      <span data-edit={`comps.val.${i}`} data-edit-max="60" className={s.val}>{r.c1}</span>
                      <span data-edit={`comps.adj.${i}`} data-edit-max="60" className={s.adj}>{r.a1}</span>
                    </td>
                    <td>
                      <span data-edit={`comps.val2.${i}`} data-edit-max="60" className={s.val}>{r.c2}</span>
                      <span data-edit={`comps.adj2.${i}`} data-edit-max="60" className={s.adj}>{r.a2}</span>
                    </td>
                    <td>
                      <span data-edit={`comps.val3.${i}`} data-edit-max="60" className={s.val}>{r.c3}</span>
                      <span data-edit={`comps.adj3.${i}`} data-edit-max="60" className={s.adj}>{r.a3}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.reconcile}>
            <p data-edit="comps.reconcileLabel" data-edit-max="240" data-edit-multiline className={s.reconcileLabel}>Indicated value by sales comparison</p>
            <p data-edit="comps.reconcileValue" data-edit-max="240" data-edit-multiline className={s.reconcileValue}>$412,000</p>
            <p data-edit="comps.reconcileNote" data-edit-max="240" data-edit-multiline className={s.reconcileNote}>
              Comparable 3 needed the least adjusting, so it carried the most
              weight. Net adjustments stayed under 10 percent on all three.
            </p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,3,4,5,2" className={s.breakField} aria-hidden="true">
          <TabbiedPattern
            pattern={bevelset}
            palette={BREAK}
            fit="grid"
            cellSize={40}
            seed="sfa-break"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.part} aria-labelledby="fees-h">
          <div className={s.strip}>
            <span data-edit="fees.stripNo" data-edit-max="60" className={s.stripNo}>Section 3</span>
            <span data-edit="fees.stripTag" data-edit-max="60" className={s.stripTag}>Fees</span>
          </div>
          <div className={s.partHead}>
            <h2 data-edit="fees.partTitle" data-edit-max="60" id="fees-h" className={s.partTitle}>Fees and turnaround by report type</h2>
          </div>
          <div className={s.tableWrap}>
            <table className={s.fees}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>Appraisal fees and turnaround in business days</caption>
              <thead>
                <tr>
                  <th data-edit="fees.heading" scope="col">Report</th>
                  <th data-edit="fees.heading2" scope="col">Form</th>
                  <th data-edit="fees.heading3" scope="col">Used for</th>
                  <th data-edit="fees.num" scope="col" className={s.num}>Fee</th>
                  <th data-edit="fees.num2" scope="col" className={s.num}>Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f, i) => (
                  <tr key={f.report}>
                    <th data-edit={`fees.heading4.${i}`} scope="row">{f.report}</th>
                    <td data-edit={`fees.form.${i}`} className={s.form}>{f.form}</td>
                    <td data-edit={`fees.cell.${i}`}>{f.use}</td>
                    <td data-edit={`fees.num3.${i}`} className={s.num}>{f.fee}</td>
                    <td data-edit={`fees.num4.${i}`} className={s.num}>{f.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className={s.feeNotes}>
            {FEE_NOTES.map(([term, value], i) => (
              <div key={term} className={s.box}>
                <dt data-edit={`fees.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------ INSPECTION */}
        <section id="inspection" className={s.part} aria-labelledby="inspection-h">
          <div className={s.strip}>
            <span data-edit="inspection.stripNo" data-edit-max="60" className={s.stripNo}>Section 4</span>
            <span data-edit="inspection.stripTag" data-edit-max="60" className={s.stripTag}>Inspection</span>
          </div>
          <div className={s.partHead}>
            <h2 data-edit="inspection.partTitle" data-edit-max="60" id="inspection-h" className={s.partTitle}>Inspection day, and what happens after</h2>
          </div>
          <div className={s.inspectGrid}>
            <ol className={s.steps}>
              {STEPS.map(([title, text], i) => (
                <li key={title} className={s.step}>
                  <span className={s.stepNo}>{`Line ${i + 1}`}</span>
                  <h3 data-edit={`inspection.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                  <p data-edit={`inspection.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                </li>
              ))}
            </ol>
            <div className={s.readyCard}>
              <h3 data-edit="inspection.readyTitle" data-edit-max="40" className={s.readyTitle}>Have these ready</h3>
              <ul className={s.ready}>
                {READY.map((item, i) => (
                  <li data-edit={`inspection.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <p data-edit="inspection.readyNote" data-edit-max="240" data-edit-multiline className={s.readyNote}>Nothing on this list is required. Each one usually moves the number in your favor.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- CREDENTIALS
            The certification page: the facts in boxes, the signature line,
            and a seal cut out of the hall floor. */}
        <section id="credentials" className={s.part} aria-labelledby="credentials-h">
          <div className={s.strip}>
            <span data-edit="credentials.stripNo" data-edit-max="60" className={s.stripNo}>Section 5</span>
            <span data-edit="credentials.stripTag" data-edit-max="60" className={s.stripTag}>Certification</span>
          </div>
          <div className={s.partHead}>
            <h2 data-edit="credentials.partTitle" data-edit-max="60" id="credentials-h" className={s.partTitle}>The appraiser, on the record</h2>
          </div>
          <div className={s.certGrid}>
            <div className={s.sealFrame}>
              <div className={s.sealRing}>
                <div data-edit-pattern="credentials.field" data-edit-roles="1,0,4,0,5,2" className={s.seal} aria-hidden="true">
                  <TabbiedPattern
                    pattern={bevelset}
                    palette={SEAL}
                    fit="grid"
                    cellSize={46}
                    seed="sfa-seal"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <p data-edit="credentials.sealText" data-edit-max="240" data-edit-multiline className={s.sealText}>Certified Residential, State Board of Appraisers</p>
            </div>
            <div className={s.certBody}>
              <dl className={s.certFacts}>
                {CREDENTIALS.map(([term, value], i) => (
                  <div key={term} className={s.certRow}>
                    <dt data-edit={`credentials.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`credentials.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <blockquote data-edit="credentials.pledge" data-edit-max="240" data-edit-multiline className={s.pledge}>
                I have no present or prospective interest in the property, my fee
                does not depend on the value I report, and I will not be told what
                number to reach. If a lender asks, the answer is the same.
              </blockquote>
              <div className={s.signature}>
                <p data-edit="credentials.signName" data-edit-max="240" data-edit-multiline className={s.signName}>Martin Ochs</p>
                <p data-edit="credentials.signLine" data-edit-max="240" data-edit-multiline className={s.signLine}>Signature of appraiser, Certified Residential</p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.part} aria-labelledby="order-h">
          <div className={s.strip}>
            <span data-edit="order.stripNo" data-edit-max="60" className={s.stripNo}>Section 6</span>
            <span data-edit="order.stripTag" data-edit-max="60" className={s.stripTag}>Order</span>
          </div>
          <div className={s.partHead}>
            <h2 data-edit="order.partTitle" data-edit-max="60" id="order-h" className={s.partTitle}>Order an appraisal</h2>
          </div>
          <div className={s.orderGrid}>
            <div className={s.office}>
              <h3 data-edit="order.officeTitle" data-edit-max="40" className={s.officeTitle}>The office</h3>
              <p data-edit="order.officeLine" data-edit-max="240" data-edit-multiline className={s.officeLine}>1407 Cobbler Row, Suite 3</p>
              <p data-edit="order.officeLine2" data-edit-max="240" data-edit-multiline className={s.officeLine}>Marlow, 20 minutes from either county seat</p>
              <p className={s.officeLink}>
                <a data-edit="order.link" data-edit-max="28" href="tel:+15550142290">(555) 014-2290</a>
              </p>
              <p className={s.officeLink}>
                <a data-edit="order.link2" data-edit-max="28" href="mailto:orders@squarefoot.example">orders@squarefoot.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`order.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`order.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="order.officeNote" data-edit-max="240" data-edit-multiline className={s.officeNote}>Lenders: order through your management company and ask for us by name.</p>
            </div>
            <form className={s.orderForm} action="#">
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="order.label" htmlFor="sfa-address">Property address</label>
                <input id="sfa-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label2" htmlFor="sfa-purpose">Purpose</label>
                <select id="sfa-purpose" name="purpose" defaultValue="purchase">
                  <option value="purchase">Purchase</option>
                  <option value="refinance">Refinance</option>
                  <option value="estate">Estate or probate</option>
                  <option value="divorce">Divorce</option>
                  <option value="pmi">PMI removal</option>
                  <option value="tax">Tax appeal</option>
                  <option value="listing">Pre-listing</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="order.label3" htmlFor="sfa-type">Property type</label>
                <select id="sfa-type" name="type" defaultValue="house">
                  <option value="house">Single family</option>
                  <option value="condo">Condominium</option>
                  <option value="town">Townhouse</option>
                  <option value="multi">Two to four units</option>
                  <option value="manufactured">Manufactured</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="order.label4" htmlFor="sfa-name">Your name</label>
                <input id="sfa-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label5" htmlFor="sfa-phone">Phone</label>
                <input id="sfa-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label6" htmlFor="sfa-email">Email</label>
                <input id="sfa-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="order.label7" htmlFor="sfa-date">Needed by</label>
                <input id="sfa-date" name="needed" type="date" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="order.label8" htmlFor="sfa-notes">Access notes: lockbox, tenants, dogs</label>
                <textarea id="sfa-notes" name="notes" rows={3} />
              </div>
              <button data-edit="order.submit" data-edit-max="24" className={s.submit} type="submit">Send the order</button>
              <p data-edit="order.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We confirm the fee and a visit time by phone within one business day.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,5,3,4,2,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={bevelset}
            palette={EDGE}
            fit="grid"
            cellSize={36}
            seed="sfa-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Square Foot Appraisals</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional appraisal practice. The appraiser, license number,
            sales, prices and address are invented, and nothing here is
            financial or legal advice.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
