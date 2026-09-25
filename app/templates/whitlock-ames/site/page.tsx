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
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Public+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Whitlock &amp; Ames</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550184400">(555) 018-4400</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Attorneys at law, Alderbay</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Employment and family law, <em>explained plainly.</em>
            </h1>
            <p className={s.lede}>
              We are five attorneys acting for employees, small employers and
              families, when work or a household comes apart. We quote a fixed
              fee wherever the work allows it, and we print those fees below.
            </p>
            <div className={s.actions}>
              <a className={s.primary} href="#consultation">Request a consultation</a>
              <a className={s.textLink} href="#fees">Read our fees</a>
            </div>
          </div>
          {/* The primary field: a plate of hairline weave, framed like a
              frontispiece. */}
          <div className={s.plate} aria-hidden="true">
            <div className={s.plateField}>
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
              <p className={s.railLabel}>Contents</p>
              <nav aria-label="Contents">
                <ol className={s.toc}>
                  {CONTENTS.map(([no, label, href]) => (
                    <li key={href}>
                      <a href={href}>
                        <span className={s.tocNo}>{no}</span>
                        <span className={s.tocLabel}>{label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={s.railCall}>
                <p className={s.railLabel}>Call</p>
                <a className={s.railPhone} href="tel:+15550184400">(555) 018-4400</a>
                <p className={s.railNote}>Monday to Friday, 8:30-6:00. Evenings by appointment.</p>
              </div>
            </div>
          </aside>

          <div className={s.body}>
            {/* ------------------------------------------------ 1 PRACTICE */}
            <section id="practice" className={s.sec} aria-labelledby="practice-h">
              <span className={s.secNo}>1</span>
              <h2 id="practice-h">Practice areas</h2>
              <p className={s.secLede}>
                Two areas of law and nothing else, because a firm of five
                cannot be good at twelve. Each has two attorneys who know the
                local judges, agencies and opposing counsel by name.
              </p>
              <div className={s.areas}>
                <div className={s.area}>
                  <h3>Employment</h3>
                  <dl>
                    {EMPLOYMENT.map((a) => (
                      <div key={a.term}>
                        <dt>{a.term}</dt>
                        <dd>{a.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className={s.area}>
                  <h3>Family</h3>
                  <dl>
                    {FAMILY.map((a) => (
                      <div key={a.term}>
                        <dt>{a.term}</dt>
                        <dd>{a.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className={s.notUs}>
                <p className={s.notUsHead}>We do not handle</p>
                <ul>
                  {NOT_US.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <p className={s.notUsNote}>We will give you the names of people who do.</p>
              </div>
            </section>

            {/* ---------------------------------------------------- 2 FEES */}
            <section id="fees" className={s.sec} aria-labelledby="fees-h">
              <span className={s.secNo}>2</span>
              <h2 id="fees-h">How we charge</h2>
              <p className={s.secLede}>
                Most of what we do has a fixed fee, agreed in writing before we
                start. Court filing fees and expert reports are extra and are
                passed on at cost.
              </p>
              <table className={s.fees}>
                <caption>Fixed fees</caption>
                <thead>
                  <tr>
                    <th scope="col">Matter</th>
                    <th scope="col">Fee</th>
                    <th scope="col">What it covers</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f) => (
                    <tr key={f.matter}>
                      <th scope="row">{f.matter}</th>
                      <td className={s.feeCell}>{f.fee}</td>
                      <td className={s.coverCell}>{f.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.feeMore}>
                <div>
                  <h3>Hourly work</h3>
                  <p className={s.small}>
                    Contested custody, litigation and anything that cannot
                    be scoped in advance. Billed in six-minute units, monthly.
                  </p>
                  <dl className={s.rates}>
                    {HOURLY.map(([who, rate]) => (
                      <div key={who}>
                        <dt>{who}</dt>
                        <dd>{rate}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3>Contingency</h3>
                  <p className={s.small}>
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
              <span className={s.secNo}>3</span>
              <h2 id="attorneys-h">The attorneys</h2>
              <p className={s.secLede}>
                Every client has one named attorney and one paralegal, and a
                reply from one of them within a working day.
              </p>
              <ul className={s.people}>
                {ATTORNEYS.map((a) => (
                  <li key={a.name} className={s.person}>
                    <div className={s.personHead}>
                      <h3>{a.name}</h3>
                      <span className={s.personRole}>{a.role}</span>
                    </div>
                    <dl className={s.personFacts}>
                      <div>
                        <dt>Admitted</dt>
                        <dd>{a.admitted}</dd>
                      </div>
                      <div>
                        <dt>Languages</dt>
                        <dd>{a.languages}</dd>
                      </div>
                    </dl>
                    <p className={s.personFocus}>{a.focus}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* -------------------------------------------- 4 CONSULTATION */}
            <section id="consultation" className={s.sec} aria-labelledby="consultation-h">
              <span className={s.secNo}>4</span>
              <h2 id="consultation-h">A first consultation</h2>
              <p className={s.secLede}>
                Three steps, usually inside a week. You decide at the end of
                them whether to go on, and nothing is owed beyond the $250.
              </p>
              <ol className={s.steps}>
                {STEPS.map((st) => (
                  <li key={st.title}>
                    <h3>{st.title}</h3>
                    <p>{st.body}</p>
                  </li>
                ))}
              </ol>
              <div className={s.bring}>
                {BRING.map((b) => (
                  <div key={b.head}>
                    <h3>{b.head}</h3>
                    <ul>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <form className={s.form} action="#">
                <h3 className={s.formTitle}>Request a consultation</h3>
                <p className={s.formNote}>
                  Please do not describe your case here. Until the conflict
                  check clears, nothing you send us is confidential.
                </p>
                <div className={s.field}>
                  <label htmlFor="wa-name">Your name</label>
                  <input id="wa-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="wa-other">Name of the other side</label>
                  <input id="wa-other" name="other" type="text" />
                </div>
                <div className={s.field}>
                  <label htmlFor="wa-phone">Phone</label>
                  <input id="wa-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label htmlFor="wa-email">Email</label>
                  <input id="wa-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label htmlFor="wa-area">The matter concerns</label>
                  <select id="wa-area" name="area" defaultValue="employment">
                    <option value="employment">Work or employment</option>
                    <option value="family">Family</option>
                    <option value="unsure">I am not sure</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="wa-how">Meet</label>
                  <select id="wa-how" name="how" defaultValue="downtown">
                    <option value="downtown">At the Downtown office</option>
                    <option value="eastside">At the Eastside office</option>
                    <option value="video">On video</option>
                    <option value="phone">By phone</option>
                  </select>
                </div>
                <button type="submit" className={s.submit}>Send the request</button>
              </form>
            </section>

            {/* ----------------------------------------------- 5 QUESTIONS */}
            <section id="questions" className={s.sec} aria-labelledby="questions-h">
              <span className={s.secNo}>5</span>
              <h2 id="questions-h">Client questions</h2>
              <div className={s.faq}>
                {QUESTIONS.map((f) => (
                  <details key={f.q} className={s.faqItem}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------- 6 OFFICES */}
            <section id="offices" className={s.sec} aria-labelledby="offices-h">
              <span className={s.secNo}>6</span>
              <h2 id="offices-h">Offices</h2>
              <p className={s.secLede}>
                Two offices across town, one telephone number, and video
                appointments for anyone who would rather not come in.
              </p>
              <div className={s.offices}>
                {OFFICES.map((o) => (
                  <div key={o.name} className={s.office}>
                    <h3>{o.name}</h3>
                    <p className={s.officeAddr}>
                      {o.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                    <p className={s.officeHours}>{o.hours}</p>
                    <p className={s.officeAccess}>{o.access}</p>
                  </div>
                ))}
              </div>
              <dl className={s.contact}>
                <div>
                  <dt>Telephone</dt>
                  <dd>
                    <a href="tel:+15550184400">(555) 018-4400</a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:office@whitlockames.example">office@whitlockames.example</a>
                  </dd>
                </div>
                <div>
                  <dt>Post</dt>
                  <dd>PO Box 118, Alderbay</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </main>

      {/* A quiet band of loose thread before the footer. */}
      <div className={s.coda} aria-hidden="true">
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
          <p className={s.footName}>Whitlock &amp; Ames</p>
          <p className={s.footTag}>Employment and family law, Alderbay.</p>
        </div>
        <div className={s.footFine}>
          <p>
            A fictional law firm. Attorneys, fees and offices are invented, and
            nothing on this page is legal advice.
          </p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live on the page.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
