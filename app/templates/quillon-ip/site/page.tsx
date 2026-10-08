import { TabbiedPattern } from 'tabbied/react';
import { dimetric } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './quillon-ip.module.css';

export const metadata = {
  title: 'Quillon IP: Patent and trademark attorneys, Ferrule Street',
  description:
    'Quillon IP is a small firm of registered patent attorneys. Flat-fee provisional, utility and design patent applications, trademark clearance and filing, and office action responses, explained in plain English.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   patent drawing sheet, and FIG. 1 is the firm itself drawn as a dimetric
   solid: three faces tiled with the dimetric chevrons, one face per
   practice, each with its reference numeral. The chevrons come back as a
   detail band under the fee schedule and along the footer's title block. */
const SHEET = '#f7f5ef';
const INK = '#1c2230';
const COBALT = '#2f4f9c';
const VERMILION = '#c8442c';
const GRAPHITE = '#8a93a3';
const VELLUM = '#d8dde8';

const FACE_TOP = ['transparent', VELLUM, GRAPHITE, COBALT, VELLUM, VERMILION];
const FACE_LEFT = ['transparent', COBALT, GRAPHITE, VELLUM, INK, VERMILION];
const FACE_RIGHT = ['transparent', INK, COBALT, GRAPHITE, INK, VERMILION];
const DETAIL = ['transparent', INK, COBALT, VERMILION, GRAPHITE, VELLUM];
const TITLE_BLOCK = ['transparent', VELLUM, GRAPHITE, COBALT, VERMILION, SHEET];

const NAV = [
  ['Practice', '#practice'],
  ['Process', '#process'],
  ['Fees', '#fees'],
  ['Intake', '#intake'],
  ['Attorneys', '#attorneys'],
  ['Contact', '#contact'],
];

/* FIG. 1's legend: what each face of the solid stands for. */
const LEGEND = [
  ['100', 'Utility patents: how a thing works'],
  ['102', 'Design patents: how a thing looks'],
  ['104', 'Trademarks: what a thing is called'],
];

type Practice = { no: string; title: string; text: string; fee: string };

const PRACTICE: Practice[] = [
  {
    no: '200',
    title: 'Utility patents',
    text: 'Machines, processes, chemical compositions and software that does something technical. We draft the claims first, then write the specification to support every one of them, so the patent covers the next version of your product too.',
    fee: 'Provisional $2,400 flat. Full application from $9,500.',
  },
  {
    no: '202',
    title: 'Design patents',
    text: 'The ornamental shape of a product: a bottle, a handle, a screen layout. Protection lasts fifteen years from grant and the drawings are the whole claim, so ours are done in house by a draftsman.',
    fee: '$2,800 flat, drawings included.',
  },
  {
    no: '204',
    title: 'Trademarks',
    text: 'Names, logos and slogans. A clearance search before you print the packaging, the application in the right classes, answers to the examining attorney, and reminders at every renewal deadline.',
    fee: 'Search $650 per mark. Filing $900 per class.',
  },
  {
    no: '206',
    title: 'Office actions and appeals',
    text: 'A rejection is the normal start of a conversation with the examiner. We take over applications from other firms and from inventors who filed on their own, and we tell you honestly when an appeal is worth it.',
    fee: '$1,800 to $3,500 per response.',
  },
  {
    no: '208',
    title: 'Opinions before you spend',
    text: 'Is it new, and are you free to make it? A patentability or freedom-to-operate opinion before you pay for tooling costs less than one injection mold.',
    fee: 'From $3,200, quoted after a call.',
  },
];

type Step = { no: string; title: string; when: string; text: string };

/* FIG. 3 is a flowchart, the way a method claim is drawn. */
const STEPS: Step[] = [
  { no: 'S300', title: 'First call', when: 'Free, 30 minutes', text: 'Is it patentable, is it worth patenting, and has the one-year clock already started? You leave with straight answers.' },
  { no: 'S302', title: 'Prior-art search', when: 'Weeks 1-2', text: 'We search issued patents, published applications and the trade press, and send a short report in plain English. $1,200, credited to the filing.' },
  { no: 'S304', title: 'Claims and drawings', when: 'Weeks 3-7', text: 'Claims first, broad to narrow, then the specification and the sheets. You review two drafts and nothing is filed until you sign off.' },
  { no: 'S306', title: 'Filing', when: 'Week 8', text: 'A provisional to hold your date for twelve months, or the full application. You get the filing receipt the same day.' },
  { no: 'S308', title: 'Examination', when: 'Months 14-26', text: 'The examiner answers, usually with an office action. We reply, call the examiner where it helps, and report every turn to you.' },
  { no: 'S310', title: 'Grant', when: 'At allowance', text: 'Issue fee paid, patent granted. We diary the maintenance fees at three and a half, seven and a half and eleven and a half years.' },
];

const FEES = [
  ['Provisional patent application', '$2,400 flat', '$130', '2-3 weeks'],
  ['Utility patent application', 'from $9,500', '$760', '6-8 weeks to file'],
  ['Design patent application', '$2,800 flat', '$440', '3-4 weeks'],
  ['Office action response', '$1,800-$3,500', 'usually none', '2-3 weeks'],
  ['Trademark clearance search', '$650 per mark', 'none', '1 week'],
  ['Trademark application', '$900 per class', '$350 per class', '8-12 months to register'],
];

/* FIG. 5: what to bring to the disclosure meeting. */
const INTAKE = [
  ['500', 'Sketches, photos, CAD files or a prototype', 'Dated if you have them. A phone photo of a napkin counts.'],
  ['502', 'The first day you showed, sold or published it', 'The one-year grace period runs from that day, trade shows and crowdfunding pages included.'],
  ['504', 'Everyone who added to the idea', 'Inventorship is a legal question, not a courtesy. Leaving someone off can sink the patent.'],
  ['506', 'Any agreement that mentions inventions', 'Employment, university, contractor or investor papers. Some already own what you make.'],
  ['508', 'Products that look similar', 'Competitors, patents you have seen, the thing that made you think you could do better.'],
  ['510', 'How you plan to earn from it', 'Make and sell, license to a manufacturer, or keep others out. Each wants different claims.'],
];

type Attorney = { name: string; reg: string; role: string; back: string; line: string; tel: string };

const ATTORNEYS: Attorney[] = [
  { name: 'Ines Calloway', reg: 'Reg. No. 68,412', role: 'Founding partner, utility and design patents', back: 'Mechanical engineer before law school. Fourteen years drafting for medical-device and tool makers, from surgical clamps to garden shears.', line: '(555) 014-2211', tel: '+15550142211' },
  { name: 'Theo Brannigan', reg: 'Reg. No. 74,903', role: 'Partner, chemistry and prosecution', back: 'Ph.D. in polymer chemistry and six years as a patent examiner. He reads an office action the way the examiner wrote it.', line: '(555) 014-2212', tel: '+15550142212' },
  { name: 'Pia Lund', reg: 'Trademark paralegal', role: 'Trademarks and the docket', back: 'Runs every clearance search and every deadline. If a renewal is due in nine months, Pia has already written to you.', line: '(555) 014-2213', tel: '+15550142213' },
];

const HOURS = [
  ['Monday to Thursday', '8:30-6:00'],
  ['Friday', '8:30-4:00'],
  ['Weekends', 'Filing deadlines only'],
];

export default function QuillonIpPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sheet': '#f7f5ef',
        '--ink': '#1c2230',
        '--cobalt': '#2f4f9c',
        '--vermilion': '#c8442c',
        '--graphite': '#8a93a3',
        '--vellum': '#d8dde8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sheet,ink,cobalt,vermilion,graphite,vellum"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Quillon IP</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Patent and trademark attorneys</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="#contact">Free first call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.sheet}>
        <div className={s.sheetStrip}>
          <span data-edit="top.text" data-edit-max="60">Quillon IP</span>
          <span data-edit="top.text2" data-edit-max="60">118 Ferrule Street</span>
          <span data-edit="top.text3" data-edit-max="60">Sheet 1 of 1</span>
          <span data-edit="top.text4" data-edit-max="60">Est. 2011</span>
        </div>

        {/* ---------------------------------------------------------- FIG. 1 */}
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Registered patent attorneys, flat fees, plain English</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your invention, claimed <em>so it holds.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We are two registered patent attorneys and a trademark paralegal.
              We file patents and trademarks for inventors, workshops and small
              manufacturers, quote a flat fee before we start, and write the
              claims as if a competitor will read them, because one will.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free first call</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#fees">See the fee schedule</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Patents granted for clients</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>312</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Filings at a flat fee</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>9 in 10</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Reply to every email</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>1 day</dd>
              </div>
            </dl>
          </div>

          <figure className={s.fig1}>
            <div className={s.solid}>
              <div className={s.solidBack} aria-hidden="true" />
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,4,2,5,3" className={s.faceTop} aria-hidden="true">
                <TabbiedPattern
                  pattern={dimetric}
                  palette={FACE_TOP}
                  fit="grid"
                  cellSize={34}
                  seed="quillon-face-top"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div data-edit-pattern="hero.field2" data-edit-roles="transparent,2,4,5,1,3" className={s.faceLeft} aria-hidden="true">
                <TabbiedPattern
                  pattern={dimetric}
                  palette={FACE_LEFT}
                  fit="grid"
                  cellSize={34}
                  seed="quillon-face-left"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div data-edit-pattern="hero.field3" data-edit-roles="transparent,1,2,4,1,3" className={s.faceRight} aria-hidden="true">
                <TabbiedPattern
                  pattern={dimetric}
                  palette={FACE_RIGHT}
                  fit="grid"
                  cellSize={34}
                  seed="quillon-face-right"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span data-edit="hero.callout" data-edit-max="60" className={`${s.callout} ${s.c100}`}>100</span>
              <span data-edit="hero.callout2" data-edit-max="60" className={`${s.callout} ${s.c102}`}>102</span>
              <span data-edit="hero.callout3" data-edit-max="60" className={`${s.callout} ${s.c104}`}>104</span>
            </div>
            <figcaption data-edit="hero.figCaption" data-edit-max="120" data-edit-multiline className={s.figCaption}>FIG. 1</figcaption>
            <dl className={s.legend}>
              {LEGEND.map(([no, text], i) => (
                <div key={no}>
                  <dt data-edit={`hero.term4.${i}`} data-edit-max="28">{no}</dt>
                  <dd data-edit={`hero.body4.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </section>

        {/* ---------------------------------------------------------- FIG. 2 */}
        <section id="practice" className={s.sec} aria-labelledby="practice-h">
          <div className={s.secHead}>
            <p data-edit="practice.figLabel" data-edit-max="240" data-edit-multiline className={s.figLabel}>FIG. 2</p>
            <h2 data-edit="practice.secTitle" data-edit-max="60" id="practice-h" className={s.secTitle}>The practice, by reference numeral</h2>
            <p data-edit="practice.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Five kinds of work, each with a fee you know before we begin. Most
              clients start with a provisional or a trademark search and come
              back when the product does.
            </p>
          </div>
          <ol className={s.practice}>
            {PRACTICE.map((p, i) => (
              <li key={p.no} className={s.practiceItem}>
                <span data-edit={`practice.refNo.${i}`} data-edit-max="60" className={s.refNo}>{p.no}</span>
                <div>
                  <h3 data-edit={`practice.practiceTitle.${i}`} data-edit-max="40" className={s.practiceTitle}>{p.title}</h3>
                  <p data-edit={`practice.practiceText.${i}`} data-edit-max="240" data-edit-multiline className={s.practiceText}>{p.text}</p>
                  <p data-edit={`practice.practiceFee.${i}`} data-edit-max="240" data-edit-multiline className={s.practiceFee}>{p.fee}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- FIG. 3 */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <p data-edit="process.figLabel" data-edit-max="240" data-edit-multiline className={s.figLabel}>FIG. 3</p>
            <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>From a sketch to a granted patent</h2>
            <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Drawn the way a method claim is drawn: one box per step. The
              Patent Office sets the slow part; we keep the rest to about eight
              weeks.
            </p>
          </div>
          <ol className={s.flow}>
            {STEPS.map((st, i) => (
              <li key={st.no} className={s.flowStep}>
                <div className={s.flowBox}>
                  <span data-edit={`process.flowNo.${i}`} data-edit-max="60" className={s.flowNo}>{st.no}</span>
                  <h3 data-edit={`process.flowTitle.${i}`} data-edit-max="40" className={s.flowTitle}>{st.title}</h3>
                </div>
                <p data-edit={`process.flowWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.flowWhen}>{st.when}</p>
                <p data-edit={`process.flowText.${i}`} data-edit-max="240" data-edit-multiline className={s.flowText}>{st.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- FIG. 4 */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p data-edit="fees.figLabel" data-edit-max="240" data-edit-multiline className={s.figLabel}>FIG. 4</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Fee schedule</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Our fee and the Patent Office fee are shown apart, so you can see
              what goes where. Office fees are for a small entity; a micro
              entity pays less, and we will tell you if you qualify.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.fees}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>Attorney fees, filing fees and timing for each kind of matter</caption>
              <thead>
                <tr>
                  <th data-edit="fees.heading" scope="col">Matter</th>
                  <th data-edit="fees.heading2" scope="col">Our fee</th>
                  <th data-edit="fees.heading3" scope="col">Office fee</th>
                  <th data-edit="fees.heading4" scope="col">Usually takes</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map(([matter, ours, office, takes], i) => (
                  <tr key={matter}>
                    <th data-edit={`fees.heading5.${i}`} scope="row">{matter}</th>
                    <td data-edit={`fees.cell.${i}`}>{ours}</td>
                    <td data-edit={`fees.cell2.${i}`}>{office}</td>
                    <td data-edit={`fees.cell3.${i}`}>{takes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="fees.tableNote" data-edit-max="240" data-edit-multiline className={s.tableNote}>
            Formal drawings are included in design patents and billed at $95 a
            sheet otherwise. Payment plans in three parts for any filing over
            $2,000.
          </p>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4,5" className={s.detail} aria-hidden="true">
          <TabbiedPattern
            pattern={dimetric}
            palette={DETAIL}
            fit="grid"
            cellSize={30}
            seed="quillon-detail"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p data-edit="top.detailCaption" data-edit-max="240" data-edit-multiline className={s.detailCaption}>FIG. 4A: detail, enlarged. One claim, many embodiments.</p>

        {/* ---------------------------------------------------------- FIG. 5 */}
        <section id="intake" className={s.sec} aria-labelledby="intake-h">
          <div className={s.intakeGrid}>
            <div className={s.secHead}>
              <p data-edit="intake.figLabel" data-edit-max="240" data-edit-multiline className={s.figLabel}>FIG. 5</p>
              <h2 data-edit="intake.secTitle" data-edit-max="60" id="intake-h" className={s.secTitle}>The inventor intake checklist</h2>
              <p data-edit="intake.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Bring what you have to the disclosure meeting. Missing pieces are
                normal; we will tell you which ones matter for your filing date.
              </p>
              <p data-edit="intake.intakeWarn" data-edit-max="240" data-edit-multiline className={s.intakeWarn}>
                Do not post, pitch or sell it before we talk. Public disclosure
                starts a one-year clock in the United States and can end your
                rights abroad on the same day.
              </p>
            </div>
            <ol className={s.intake}>
              {INTAKE.map(([no, title, text], i) => (
                <li key={no} className={s.intakeItem}>
                  <span data-edit={`intake.intakeNo.${i}`} data-edit-max="60" className={s.intakeNo}>{no}</span>
                  <h3 data-edit={`intake.intakeTitle.${i}`} data-edit-max="40" className={s.intakeTitle}>{title}</h3>
                  <p data-edit={`intake.intakeText.${i}`} data-edit-max="240" data-edit-multiline className={s.intakeText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- FIG. 6 */}
        <section id="attorneys" className={s.sec} aria-labelledby="attorneys-h">
          <div className={s.secHead}>
            <p data-edit="attorneys.figLabel" data-edit-max="240" data-edit-multiline className={s.figLabel}>FIG. 6</p>
            <h2 data-edit="attorneys.secTitle" data-edit-max="60" id="attorneys-h" className={s.secTitle}>Who reads your invention</h2>
            <p data-edit="attorneys.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Both attorneys are registered to practice before the Patent
              Office. The one who takes your first call drafts your claims.
            </p>
          </div>
          <ul className={s.people}>
            {ATTORNEYS.map((a, i) => (
              <li key={a.name} className={s.person}>
                <p data-edit={`attorneys.personReg.${i}`} data-edit-max="240" data-edit-multiline className={s.personReg}>{a.reg}</p>
                <h3 data-edit={`attorneys.personName.${i}`} data-edit-max="40" className={s.personName}>{a.name}</h3>
                <p data-edit={`attorneys.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{a.role}</p>
                <p data-edit={`attorneys.personBack.${i}`} data-edit-max="240" data-edit-multiline className={s.personBack}>{a.back}</p>
                <a data-edit={`attorneys.personLine.${i}`} data-edit-max="28" className={s.personLine} href={`tel:${a.tel}`}>{a.line}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.figLabel" data-edit-max="240" data-edit-multiline className={s.figLabel}>Correspondence</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book the free first call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Thirty minutes by phone or video. Tell us what it does, not how
                it works: details come later, under an engagement letter.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Suite 4, 118 Ferrule Street, Harlow Mills</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>(555) 014-2210</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>docket@quillonip.example</dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body4.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="qi-name">Name</label>
                <input id="qi-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="qi-email">Email</label>
                <input id="qi-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="qi-kind">What is it about</label>
                <select id="qi-kind" name="kind" defaultValue="utility">
                  <option value="utility">A utility patent</option>
                  <option value="design">A design patent</option>
                  <option value="mark">A trademark</option>
                  <option value="action">An office action I received</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="qi-shown">First shown in public, if ever</label>
                <input id="qi-shown" name="shown" type="date" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="qi-note">What it does, in a sentence or two</label>
                <textarea id="qi-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                Please keep confidential details out of this form. Nothing you
                send makes us your attorneys until we both sign an engagement
                letter.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,5,4,2,3,0" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={dimetric}
            palette={TITLE_BLOCK}
            fit="grid"
            cellSize={28}
            seed="quillon-title-block"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.titleBlock}>
          <div className={s.tbName}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Quillon IP</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Patent and trademark attorneys, 118 Ferrule Street, Harlow Mills.</p>
          </div>
          <div className={s.tbCell}>
            <p data-edit="footer.tbLabel" data-edit-max="240" data-edit-multiline className={s.tbLabel}>Drawn</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional firm. The attorneys, registration numbers, fees and address are invented, and nothing here is legal advice.</p>
          </div>
          <div className={s.tbCell}>
            <p data-edit="footer.tbLabel2" data-edit-max="240" data-edit-multiline className={s.tbLabel}>Sheet</p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>1 of 1</p>
          </div>
          <div className={s.tbCell}>
            <p data-edit="footer.tbLabel3" data-edit-max="240" data-edit-multiline className={s.tbLabel}>Credit</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
