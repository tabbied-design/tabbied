import { TabbiedPattern } from 'tabbied/react';
import { batiste, diagonalweave } from 'tabbied/patterns';
import s from './whitlock-ames.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Whitlock & Ames: Employment and family law, Alderbay',
  description:
    'Whitlock & Ames is a firm of five attorneys in Alderbay acting for employees, small employers and families. Fixed fees for most work, printed here, and a first consultation for $250.',
};

/* Site colors. Both fields draw on a transparent ground, so the hairlines
   sit in the parchment itself. */
const OXFORD = '#2F4B7C';
const GRAY = '#8B8A85';
const PALE = '#DEDBD2';

const WEAVE = ['transparent', OXFORD, GRAY, OXFORD];
const THREAD = ['transparent', PALE, GRAY, OXFORD];

const NAV = [
  ['Practice', '#practice'],
  ['Fees', '#fees'],
  ['Attorneys', '#attorneys'],
  ['Consultation', '#consultation'],
  ['Questions', '#questions'],
  ['Offices', '#offices'],
];

const CONTENTS = [
  ['1', 'Practice areas', '#practice'],
  ['2', 'How we charge', '#fees'],
  ['3', 'The attorneys', '#attorneys'],
  ['4', 'A first consultation', '#consultation'],
  ['5', 'Client questions', '#questions'],
  ['6', 'Offices', '#offices'],
];

const EMPLOYMENT = [
  {
    term: 'Dismissal and severance',
    body: 'Whether a dismissal was lawful, what a severance agreement really gives up, and whether to sign it.',
  },
  {
    term: 'Discrimination and harassment',
    body: 'Complaints to the employer, to the state civil rights agency and, when it comes to it, to court.',
  },
  {
    term: 'Unpaid wages and overtime',
    body: 'Misclassified contractors, missing overtime, commission held back and final paychecks that never came.',
  },
  {
    term: 'Non-compete agreements',
    body: 'Before you sign one, and when a former employer writes to say you are in breach of it.',
  },
  {
    term: 'For small employers',
    body: 'Handbooks, workplace investigations, and a second opinion before a dismissal rather than after.',
  },
];

const FAMILY = [
  {
    term: 'Divorce',
    body: 'Uncontested, mediated or contested, with or without children, and with a family business in it.',
  },
  {
    term: 'Custody and parenting plans',
    body: 'Schedules that survive school years, holidays and a move, written so that both homes can follow them.',
  },
  {
    term: 'Child and spousal support',
    body: 'The guideline figures, agreements that depart from them, and changes when a job or a household changes.',
  },
  {
    term: 'Prenuptial agreements',
    body: 'Drafted or reviewed for one party, in plain language, and signed well before the wedding.',
  },
  {
    term: 'Adoption and guardianship',
    body: 'Stepparent adoptions, kinship guardianship and the court hearing that makes it final.',
  },
];

const NOT_US = ['Criminal defense', 'Immigration', 'Personal injury', 'Wills and estates'];

type Fee = {
  matter: string;
  fee: string;
  covers: string;
};

const FEES: Fee[] = [
  { matter: 'First consultation, 60 minutes', fee: '$250', covers: 'Credited against any fixed fee if you instruct us within 30 days.' },
  { matter: 'Severance agreement review', fee: '$950', covers: 'Written advice and one round of negotiation with the employer.' },
  { matter: 'Non-compete review', fee: '$650', covers: 'Written advice on what a court here would and would not enforce.' },
  { matter: 'Demand letter to an employer', fee: '$1,200', covers: 'Drafting, sending, and one follow-up letter.' },
  { matter: 'Uncontested divorce, no children', fee: '$3,400', covers: 'Petition, settlement agreement, filing and the final decree. Court fees extra.' },
  { matter: 'Uncontested divorce with children', fee: '$4,800', covers: 'As above, with the parenting plan and the support worksheet.' },
  { matter: 'Prenuptial agreement', fee: '$2,600', covers: 'Drafting for one party, two rounds of revisions, the signing.' },
  { matter: 'Stepparent adoption', fee: '$2,900', covers: 'Petition, consents, the home study and the hearing.' },
];

const HOURLY = [
  ['Partners', '$395 an hour'],
  ['Senior associate', '$300 an hour'],
  ['Associates', '$275 an hour'],
  ['Paralegals', '$140 an hour'],
];

type Attorney = {
  name: string;
  role: string;
  admitted: string;
  languages: string;
  focus: string;
};

const ATTORNEYS: Attorney[] = [
  {
    name: 'Eleanor Whitlock',
    role: 'Founding partner',
    admitted: '1998',
    languages: 'English, French',
    focus: 'Employment: dismissal, discrimination and executive severance. Previously eleven years at the state civil rights agency.',
  },
  {
    name: 'Marcus Ames',
    role: 'Founding partner',
    admitted: '2003',
    languages: 'English, Spanish',
    focus: 'Family: contested custody and divorces with a business or a pension to divide. A certified family law specialist.',
  },
  {
    name: 'Ruth Adeyemi',
    role: 'Senior associate',
    admitted: '2012',
    languages: 'English, Yoruba',
    focus: 'Employment: wage and overtime claims, and the firm\'s work for small employers.',
  },
  {
    name: 'Daniel Kowalczyk',
    role: 'Associate',
    admitted: '2017',
    languages: 'English, Polish',
    focus: 'Family: uncontested divorce, support, and prenuptial agreements.',
  },
  {
    name: 'Hana Sato',
    role: 'Of counsel, mediator',
    admitted: '1995',
    languages: 'English, Japanese',
    focus: 'Family mediation and parenting plans. Sits with both parties, acts for neither.',
  },
];

const STEPS = [
  {
    title: 'A conflict check',
    body: 'Before you tell us anything about your case, we need the name of the other side, so we can be sure we do not already act for them. It takes one working day.',
  },
  {
    title: 'Sixty minutes',
    body: 'With the attorney who would handle the matter, at either office, by phone or on video. The fee is $250 and it is credited if you go on with us.',
  },
  {
    title: 'A letter',
    body: 'Within three working days: your options as we see them, what we advise, and a fixed fee or a written estimate for the next stage.',
  },
];

const BRING = [
  {
    head: 'For a matter at work',
    items: [
      'Your contract or offer letter',
      'The employee handbook',
      'Your last three pay stubs',
      'The letter or email that ended it',
      'A short timeline, in your own words',
    ],
  },
  {
    head: 'For a family matter',
    items: [
      'Two years of tax returns',
      'A list of what you own and owe',
      'Any existing court orders',
      'Your children\'s school schedule',
      'Anything the other side has sent you',
    ],
  },
];

const QUESTIONS = [
  {
    q: 'Is what I tell you confidential?',
    a: 'Yes, from the moment the conflict check clears and we begin advising you, including in the first consultation. The consultation form on this page is not confidential, which is why it asks only for names.',
  },
  {
    q: 'Can you tell me whether I have a case before I pay?',
    a: 'A paralegal will take a free fifteen-minute call and tell you whether it is the kind of matter we handle and who else might if we do not. Whether you have a case is what the consultation is for.',
  },
  {
    q: 'What if the fixed fee turns out not to be enough?',
    a: 'It is fixed. If the matter changes shape, for example an uncontested divorce becomes contested, we stop, tell you in writing, and quote the next stage before doing any of it.',
  },
  {
    q: 'Can I pay in installments?',
    a: 'Fixed fees over $2,000 can be paid in three equal monthly payments. Hourly work is billed monthly against a retainer that we agree at the start.',
  },
  {
    q: 'Will I have to go to court?',
    a: 'Most of our employment matters settle without a lawsuit, and most divorces we handle are finished on paper. We tell you early if we think yours will not be.',
  },
  {
    q: 'I need a protective order today. Can you help?',
    a: 'Call the main line and say "protective order". An attorney will call you back the same day. If you are in danger now, call 911 first.',
  },
];

type Office = {
  name: string;
  lines: string[];
  hours: string;
  access: string;
};

const OFFICES: Office[] = [
  {
    name: 'Downtown',
    lines: ['40 Mercer Street, fourth floor', 'Alderbay'],
    hours: 'Monday to Friday, 8:30-6:00',
    access: 'Elevator from the lobby. Paid parking in the Mercer Street garage; we validate two hours.',
  },
  {
    name: 'Eastside',
    lines: ['212 Orchard Avenue', 'Alderbay'],
    hours: 'Tuesday and Thursday, 9:00-7:00',
    access: 'Ground floor, step-free, with free parking behind the building. Evening appointments here.',
  },
];

export default function WhitlockAmesPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--parchment': '#f4f2ec',
        '--ink': '#141b26',
        '--oxford': '#2f4b7c',
        '--gray': '#8b8a85',
        '--pale': '#dedbd2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="parchment,ink,oxford,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Public+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Whitlock & Ames</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barPhone" data-edit-max="28" className={s.barPhone} href="tel:+15550184400">(555) 018-4400</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Attorneys at law, Alderbay</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Employment and family law, <em>explained plainly.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              We are five attorneys acting for employees, small employers and
              families, when work or a household comes apart. We quote a fixed
              fee wherever the work allows it, and we print those fees below.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.primary" data-edit-max="28" className={s.primary} href="#consultation">Request a consultation</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="#fees">Read our fees</a>
            </div>
          </div>
          {/* The primary field: a plate of hairline weave, framed like a
              frontispiece. */}
          <div className={s.plate} aria-hidden="true">
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,2" className={s.plateField}>
              <TabbiedPattern
                pattern={diagonalweave}
                palette={WEAVE}
                fit="grid"
                cellSize={44}
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* The document: a numbered body with its contents in a rail that
            stays in view. */}
        <div className={s.doc}>
          <aside className={s.rail} aria-label="On this page">
            <div className={s.railInner}>
              <p data-edit="rail.railLabel" data-edit-max="240" data-edit-multiline className={s.railLabel}>Contents</p>
              <nav aria-label="Contents">
                <ol className={s.toc}>
                  {CONTENTS.map(([no, label, href], i) => (
                    <li key={href}>
                      <a href={href}>
                        <span data-edit={`rail.tocNo.${i}`} data-edit-max="60" className={s.tocNo}>{no}</span>
                        <span data-edit={`rail.tocLabel.${i}`} data-edit-max="60" className={s.tocLabel}>{label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={s.railCall}>
                <p data-edit="rail.railLabel2" data-edit-max="240" data-edit-multiline className={s.railLabel}>Call</p>
                <a data-edit="rail.railPhone" data-edit-max="28" className={s.railPhone} href="tel:+15550184400">(555) 018-4400</a>
                <p data-edit="rail.railNote" data-edit-max="240" data-edit-multiline className={s.railNote}>Monday to Friday, 8:30-6:00. Evenings by appointment.</p>
              </div>
            </div>
          </aside>

          <div className={s.body}>
            {/* ------------------------------------------------ 1 PRACTICE */}
            <section id="practice" className={s.sec} aria-labelledby="practice-h">
              <span data-edit="practice.secNo" data-edit-max="60" className={s.secNo}>1</span>
              <h2 data-edit="practice.title" data-edit-max="60" id="practice-h">Practice areas</h2>
              <p data-edit="practice.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Two areas of law and nothing else, because a firm of five
                cannot be good at twelve. Each has two attorneys who know the
                local judges, agencies and opposing counsel by name.
              </p>
              <div className={s.areas}>
                <div className={s.area}>
                  <h3 data-edit="practice.title2" data-edit-max="40">Employment</h3>
                  <dl>
                    {EMPLOYMENT.map((a, i) => (
                      <div key={a.term}>
                        <dt data-edit={`practice.term.${i}`} data-edit-max="28">{a.term}</dt>
                        <dd data-edit={`practice.body.${i}`} data-edit-max="200" data-edit-multiline>{a.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className={s.area}>
                  <h3 data-edit="practice.title3" data-edit-max="40">Family</h3>
                  <dl>
                    {FAMILY.map((a, i) => (
                      <div key={a.term}>
                        <dt data-edit={`practice.term2.${i}`} data-edit-max="28">{a.term}</dt>
                        <dd data-edit={`practice.body2.${i}`} data-edit-max="200" data-edit-multiline>{a.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className={s.notUs}>
                <p data-edit="practice.notUsHead" data-edit-max="240" data-edit-multiline className={s.notUsHead}>We do not handle</p>
                <ul>
                  {NOT_US.map((n, i) => (
                    <li data-edit={`practice.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                  ))}
                </ul>
                <p data-edit="practice.notUsNote" data-edit-max="240" data-edit-multiline className={s.notUsNote}>We will give you the names of people who do.</p>
              </div>
            </section>

            {/* ---------------------------------------------------- 2 FEES */}
            <section id="fees" className={s.sec} aria-labelledby="fees-h">
              <span data-edit="fees.secNo" data-edit-max="60" className={s.secNo}>2</span>
              <h2 data-edit="fees.title" data-edit-max="60" id="fees-h">How we charge</h2>
              <p data-edit="fees.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Most of what we do has a fixed fee, agreed in writing before we
                start. Court filing fees and expert reports are extra and are
                passed on at cost.
              </p>
              <table className={s.fees}>
                <caption data-edit="fees.caption">Fixed fees</caption>
                <thead>
                  <tr>
                    <th data-edit="fees.heading" scope="col">Matter</th>
                    <th data-edit="fees.heading2" scope="col">Fee</th>
                    <th data-edit="fees.heading3" scope="col">What it covers</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f, i) => (
                    <tr key={f.matter}>
                      <th data-edit={`fees.heading4.${i}`} scope="row">{f.matter}</th>
                      <td data-edit={`fees.feeCell.${i}`} className={s.feeCell}>{f.fee}</td>
                      <td data-edit={`fees.coverCell.${i}`} className={s.coverCell}>{f.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.feeMore}>
                <div>
                  <h3 data-edit="fees.title2" data-edit-max="40">Hourly work</h3>
                  <p data-edit="fees.small" data-edit-max="240" data-edit-multiline className={s.small}>
                    Contested custody, litigation and anything that cannot
                    be scoped in advance. Billed in six-minute units, monthly.
                  </p>
                  <dl className={s.rates}>
                    {HOURLY.map(([who, rate], i) => (
                      <div key={who}>
                        <dt data-edit={`fees.term.${i}`} data-edit-max="28">{who}</dt>
                        <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{rate}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 data-edit="fees.title3" data-edit-max="40">Contingency</h3>
                  <p data-edit="fees.small2" data-edit-max="240" data-edit-multiline className={s.small}>
                    For discrimination and unpaid wage claims we will often
                    work for one third of what is recovered, and nothing if
                    nothing is. You pay the court costs as they arise, and we
                    tell you what they are likely to be before you decide.
                  </p>
                </div>
              </div>
            </section>

            {/* ----------------------------------------------- 3 ATTORNEYS */}
            <section id="attorneys" className={s.sec} aria-labelledby="attorneys-h">
              <span data-edit="attorneys.secNo" data-edit-max="60" className={s.secNo}>3</span>
              <h2 data-edit="attorneys.title" data-edit-max="60" id="attorneys-h">The attorneys</h2>
              <p data-edit="attorneys.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Every client has one named attorney and one paralegal, and a
                reply from one of them within a working day.
              </p>
              <ul className={s.people}>
                {ATTORNEYS.map((a, i) => (
                  <li key={a.name} className={s.person}>
                    <div className={s.personHead}>
                      <h3 data-edit={`attorneys.title2.${i}`} data-edit-max="40">{a.name}</h3>
                      <span data-edit={`attorneys.personRole.${i}`} data-edit-max="60" className={s.personRole}>{a.role}</span>
                    </div>
                    <dl className={s.personFacts}>
                      <div>
                        <dt data-edit={`attorneys.term.${i}`} data-edit-max="28">Admitted</dt>
                        <dd data-edit={`attorneys.body.${i}`} data-edit-max="200" data-edit-multiline>{a.admitted}</dd>
                      </div>
                      <div>
                        <dt data-edit={`attorneys.term2.${i}`} data-edit-max="28">Languages</dt>
                        <dd data-edit={`attorneys.body2.${i}`} data-edit-max="200" data-edit-multiline>{a.languages}</dd>
                      </div>
                    </dl>
                    <p data-edit={`attorneys.personFocus.${i}`} data-edit-max="240" data-edit-multiline className={s.personFocus}>{a.focus}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* -------------------------------------------- 4 CONSULTATION */}
            <section id="consultation" className={s.sec} aria-labelledby="consultation-h">
              <span data-edit="consultation.secNo" data-edit-max="60" className={s.secNo}>4</span>
              <h2 data-edit="consultation.title" data-edit-max="60" id="consultation-h">A first consultation</h2>
              <p data-edit="consultation.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Three steps, usually inside a week. You decide at the end of
                them whether to go on, and nothing is owed beyond the $250.
              </p>
              <ol className={s.steps}>
                {STEPS.map((st, i) => (
                  <li key={st.title}>
                    <h3 data-edit={`consultation.title2.${i}`} data-edit-max="40">{st.title}</h3>
                    <p data-edit={`consultation.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
                  </li>
                ))}
              </ol>
              <div className={s.bring}>
                {BRING.map((b, i) => (
                  <div key={b.head}>
                    <h3 data-edit={`consultation.title3.${i}`} data-edit-max="40">{b.head}</h3>
                    <ul>
                      {b.items.map((it, i2) => (
                        <li data-edit={`consultation.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <form className={s.form} action="#">
                <h3 data-edit="consultation.formTitle" data-edit-max="40" className={s.formTitle}>Request a consultation</h3>
                <p data-edit="consultation.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                  Please do not describe your case here. Until the conflict
                  check clears, nothing you send us is confidential.
                </p>
                <div className={s.field}>
                  <label data-edit="consultation.label" htmlFor="wa-name">Your name</label>
                  <input id="wa-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="consultation.label2" htmlFor="wa-other">Name of the other side</label>
                  <input id="wa-other" name="other" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="consultation.label3" htmlFor="wa-phone">Phone</label>
                  <input id="wa-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="consultation.label4" htmlFor="wa-email">Email</label>
                  <input id="wa-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="consultation.label5" htmlFor="wa-area">The matter concerns</label>
                  <select id="wa-area" name="area" defaultValue="employment">
                    <option value="employment">Work or employment</option>
                    <option value="family">Family</option>
                    <option value="unsure">I am not sure</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="consultation.label6" htmlFor="wa-how">Meet</label>
                  <select id="wa-how" name="how" defaultValue="downtown">
                    <option value="downtown">At the Downtown office</option>
                    <option value="eastside">At the Eastside office</option>
                    <option value="video">On video</option>
                    <option value="phone">By phone</option>
                  </select>
                </div>
                <button data-edit="consultation.submit" data-edit-max="24" type="submit" className={s.submit}>Send the request</button>
              </form>
            </section>

            {/* ----------------------------------------------- 5 QUESTIONS */}
            <section id="questions" className={s.sec} aria-labelledby="questions-h">
              <span data-edit="questions.secNo" data-edit-max="60" className={s.secNo}>5</span>
              <h2 data-edit="questions.title" data-edit-max="60" id="questions-h">Client questions</h2>
              <div className={s.faq}>
                {QUESTIONS.map((f, i) => (
                  <details key={f.q} className={s.faqItem}>
                    <summary data-edit={`questions.question.${i}`} data-edit-max="80">{f.q}</summary>
                    <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------- 6 OFFICES */}
            <section id="offices" className={s.sec} aria-labelledby="offices-h">
              <span data-edit="offices.secNo" data-edit-max="60" className={s.secNo}>6</span>
              <h2 data-edit="offices.title" data-edit-max="60" id="offices-h">Offices</h2>
              <p data-edit="offices.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Two offices across town, one telephone number, and video
                appointments for anyone who would rather not come in.
              </p>
              <div className={s.offices}>
                {OFFICES.map((o, i) => (
                  <div key={o.name} className={s.office}>
                    <h3 data-edit={`offices.title2.${i}`} data-edit-max="40">{o.name}</h3>
                    <p className={s.officeAddr}>
                      {o.lines.map((line, i2) => (
                        <span data-edit={`offices.text.${i}.${i2}`} data-edit-max="60" key={line}>{line}</span>
                      ))}
                    </p>
                    <p data-edit={`offices.officeHours.${i}`} data-edit-max="240" data-edit-multiline className={s.officeHours}>{o.hours}</p>
                    <p data-edit={`offices.officeAccess.${i}`} data-edit-max="240" data-edit-multiline className={s.officeAccess}>{o.access}</p>
                  </div>
                ))}
              </div>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="offices.term" data-edit-max="28">Telephone</dt>
                  <dd>
                    <a data-edit="offices.link" data-edit-max="28" href="tel:+15550184400">(555) 018-4400</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="offices.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="offices.link2" data-edit-max="28" href="mailto:office@whitlockames.example">office@whitlockames.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="offices.term3" data-edit-max="28">Post</dt>
                  <dd data-edit="offices.body" data-edit-max="200" data-edit-multiline>PO Box 118, Alderbay</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </main>

      {/* A quiet band of loose thread before the footer. */}
      <div data-edit-pattern="page.field" data-edit-roles="transparent,4,3,2" className={s.coda} aria-hidden="true">
        <TabbiedPattern
          pattern={batiste}
          palette={THREAD}
          options={{ frequency: 0.5 }}
          fit="grid"
          cellSize={48}
          redrawInterval={9000}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Whitlock & Ames</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Employment and family law, Alderbay.</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>
            A fictional law firm. Attorneys, fees and offices are invented, and
            nothing on this page is legal advice.
          </p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on the page.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
