import { TabbiedPattern } from 'tabbied/react';
import { pindot } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './plumbline-payroll.module.css';

export const metadata = {
  title: 'Plumbline Payroll: Payroll and HR for small teams, Brennick Falls',
  description:
    'Plumbline Payroll runs payroll, files payroll taxes and keeps the HR paperwork straight for teams of 2 to 80. Flat monthly pricing per employee, a pay-day calendar you can plan around, and one person who answers the phone.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   pay stub: security-tint paper, check-green ink, a ledger blue for pay
   days and a red pencil for deductions. Pindot is the safety print behind
   the stub in the hero, the perforation between sections and the edge of
   the footer. */
const PAPER = '#eaf0e8';
const INK = '#18302a';
const LEDGER = '#2f5f9e';
const MINUS = '#b2483a';
const MINT = '#8cb8a0';

const SECURITY = ['transparent', INK, LEDGER, MINT, MINUS, MINT];
const PERFORATION = ['transparent', LEDGER, INK, MINT, LEDGER, INK];
const NIGHT = ['transparent', MINT, PAPER, LEDGER, MINT, PAPER];

const NAV = [
  ['Services', '#stub'],
  ['Pay days', '#calendar'],
  ['Pricing', '#pricing'],
  ['Switching', '#switch'],
  ['HR desk', '#hr'],
  ['Contact', '#contact'],
];

/* The hero stub: one employee, one pay period, worked to the cent. */
const STUB_EARN = [
  ['Regular', '80.00', '28.50', '2,280.00'],
  ['Overtime', '4.00', '42.75', '171.00'],
];

const STUB_DEDUCT = [
  ['Federal income tax', '-214.60'],
  ['Social Security 6.2%', '-151.96'],
  ['Medicare 1.45%', '-35.54'],
  ['State income tax', '-87.20'],
  ['401(k) 4%', '-98.04'],
];

/* The services, set out the way a stub sets out a paycheck. */
const EARNINGS = [
  ['RUN', 'Payroll run', 'Gross to net for every employee, direct deposit two banking days before pay day, stubs emailed.', 'Every pay day', 'Included'],
  ['NEW', 'New hire setup', 'W-4, I-9, the state new-hire report and the direct deposit form, done before the first shift.', 'Per hire', 'Included'],
  ['OFF', 'Off-cycle checks', 'Bonuses, final pay on the last day, a missed shift corrected without waiting two weeks.', 'As needed', '$25 each'],
  ['PTO', 'Time-off balances', 'Vacation and sick hours accrued by your policy and printed on every stub.', 'Every pay day', 'Included'],
  ['W-2', 'Year-end forms', 'W-2s and 1099s checked with you in December, mailed and e-filed in January.', 'Once a year', 'Included'],
];

const DEDUCTIONS = [
  ['TAX', 'Payroll tax deposits', 'Federal and state withholding paid on the deposit schedule the IRS gave you.', 'Semiweekly'],
  ['941', 'Quarterly returns', 'Form 941, state withholding and unemployment returns, filed before the deadline.', 'Quarterly'],
  ['GAR', 'Garnishments', 'Child support and wage orders read, calculated and remitted on time.', 'As ordered'],
  ['BEN', 'Benefit deductions', '401(k), health premiums and HSA amounts taken pre-tax and sent to the right place.', 'Every pay day'],
  ['WC', 'Workers comp reporting', 'Pay-as-you-go wages reported to your carrier, so the audit has no surprises.', 'Every pay day'],
];

/* Fourth quarter 2026, a client on biweekly Friday pay. */
type Mark = 'pay' | 'cutoff' | 'file' | 'closed';
type Month = { name: string; offset: number; days: number; marks: Record<number, Mark>; notes: string[] };

const MONTHS: Month[] = [
  { name: 'October 2026', offset: 4, days: 31, marks: { 6: 'cutoff', 9: 'pay', 12: 'closed', 20: 'cutoff', 23: 'pay' },
    notes: ['Mon 12: banks closed, nothing moves', 'Sat 31: Q3 Form 941 due, filed by us on the 2nd'] },
  { name: 'November 2026', offset: 0, days: 30, marks: { 2: 'file', 3: 'cutoff', 6: 'pay', 11: 'closed', 17: 'cutoff', 20: 'pay', 26: 'closed' },
    notes: ['Wed 11: banks closed, pay day unaffected', 'Thu 26: deposits sent a day early'] },
  { name: 'December 2026', offset: 2, days: 31, marks: { 1: 'cutoff', 4: 'pay', 11: 'file', 15: 'cutoff', 18: 'pay', 25: 'closed', 29: 'cutoff', 31: 'pay' },
    notes: ['Fri 11: W-2 names and addresses checked', 'Thu 31: pay day moved from New Year\'s Day'] },
];

const MARK_NAMES: Record<Mark, string> = {
  pay: 'pay day',
  cutoff: 'hours due by noon',
  file: 'filing or year-end check',
  closed: 'bank holiday',
};

const LEGEND: [Mark, string][] = [
  ['pay', 'Pay day: money in accounts by 9 am'],
  ['cutoff', 'Hours due to us by Tuesday noon'],
  ['file', 'Form 941 filed, W-2 data checked'],
  ['closed', 'Banks closed: we run a day early'],
];

const cells = (m: Month) => [
  ...Array.from({ length: m.offset }, () => 0),
  ...Array.from({ length: m.days }, (_, i) => i + 1),
];

const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const RUN_STEPS = [
  ['Tuesday, noon', 'Hours in', 'Your manager sends timesheets, or approves them in the app.'],
  ['Wednesday', 'We run it', 'Nadia checks every line against last period and sends you a preview.'],
  ['Thursday', 'Money moves', 'One debit from your account covers net pay and the tax deposit.'],
  ['Friday, 9 am', 'Everyone paid', 'Deposits land, stubs go out, the taxes are already filed.'],
];

const PLANS = [
  { name: 'Payroll', base: 40, per: 7, line: 'Runs, deposits, filings, year-end forms.' },
  { name: 'Payroll and HR', base: 60, per: 12, line: 'Adds onboarding, the handbook, leave tracking and the HR line.' },
  { name: 'Full desk', base: 95, per: 18, line: 'Adds benefits enrollment, terminations and a quarterly review.' },
];

const HEADCOUNTS = [5, 12, 25, 50];

const SWITCH_STEPS = [
  ['Send last year and this year', 'Your last 941s, the year-to-date register and each employee W-4. A copy of the old provider report is fine.'],
  ['We load the year to date', 'Every employee arrives with the wages and taxes they already have, so the W-2 in January is one form, not two.'],
  ['A parallel run', 'We run your next pay day beside the old provider and compare to the cent before anyone is paid from ours.'],
  ['First live pay day', 'Usually two pay periods after your first call. Mid-quarter is fine; we file the handover.'],
];

const HR_DESK = [
  ['Employee handbook', 'Written for your business and your state, reviewed each January when the laws change.'],
  ['Onboarding packet', 'Offer letter, policies, forms and the first-week checklist, signed online.'],
  ['Leave and time off', 'Family leave, jury duty and sick time tracked against the rules that apply to you.'],
  ['Hard conversations', 'Warnings, final pay and separation letters, drafted with you before the meeting, not after.'],
  ['Posters and notices', 'The required wall posters, kept current, mailed to you when they change.'],
  ['Annual check-up', 'One hour each spring: classifications, exempt status, overtime and what is coming.'],
];

const HOURS = [
  ['Monday to Thursday', '8:00-5:00'],
  ['Friday (pay day)', '7:00-5:00'],
  ['Saturday', 'Closed, phones forwarded'],
];

export default function PlumblinePayrollPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#eaf0e8',
        '--ink': '#18302a',
        '--ledger': '#2f5f9e',
        '--minus': '#b2483a',
        '--mint': '#8cb8a0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,ledger,minus,mint"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.bob} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Plumbline</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Payroll and HR</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550142290">(555) 014-2290</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Payroll and HR for teams of 2 to 80</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Everyone paid right, <em>every pay day.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Plumbline runs your payroll, deposits and files the payroll taxes,
              and keeps the HR paperwork straight. You approve the hours. We do
              the rest, and we answer the phone when an employee asks why.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a payroll review</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#pricing">See per-employee prices</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Pay runs last year</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>3,940</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Late filings</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>0</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Client businesses</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>58</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,4,3,4" className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={pindot}
                palette={SECURITY}
                fit="grid"
                cellSize={90}
                options={{ frequency: 0.8 }}
                seed="plumbline-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figure className={s.stub}>
              <div className={s.stubHead}>
                <span data-edit="hero.stubTitle" data-edit-max="60" className={s.stubTitle}>Earnings statement</span>
                <span data-edit="hero.stubNo" data-edit-max="60" className={s.stubNo}>No. 004417</span>
              </div>
              <dl className={s.stubMeta}>
                <div>
                  <dt data-edit="hero.term4" data-edit-max="28">Pay period</dt>
                  <dd data-edit="hero.body4" data-edit-max="200" data-edit-multiline>Oct 5-18, 2026</dd>
                </div>
                <div>
                  <dt data-edit="hero.term5" data-edit-max="28">Pay date</dt>
                  <dd data-edit="hero.body5" data-edit-max="200" data-edit-multiline>Fri, Oct 23</dd>
                </div>
              </dl>
              <table className={s.stubTable}>
                <caption data-edit="hero.srOnly" className={s.srOnly}>A sample pay stub</caption>
                <thead>
                  <tr>
                    <th data-edit="hero.heading" scope="col">Earnings</th>
                    <th data-edit="hero.heading2" scope="col">Hours</th>
                    <th data-edit="hero.heading3" scope="col">Rate</th>
                    <th data-edit="hero.heading4" scope="col">Current</th>
                  </tr>
                </thead>
                <tbody>
                  {STUB_EARN.map(([label, hours, rate, amount], i) => (
                    <tr key={label}>
                      <th data-edit={`hero.heading5.${i}`} scope="row">{label}</th>
                      <td data-edit={`hero.cell.${i}`}>{hours}</td>
                      <td data-edit={`hero.cell2.${i}`}>{rate}</td>
                      <td data-edit={`hero.cell3.${i}`}>{amount}</td>
                    </tr>
                  ))}
                  <tr className={s.stubSplit}>
                    <th data-edit="hero.heading6" scope="row">Deductions</th>
                    <td />
                    <td />
                    <td />
                  </tr>
                  {STUB_DEDUCT.map(([label, amount], i) => (
                    <tr key={label}>
                      <th data-edit={`hero.heading7.${i}`} scope="row">{label}</th>
                      <td />
                      <td />
                      <td data-edit={`hero.minus.${i}`} className={s.minus}>{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={s.net}>
                <span data-edit="hero.text" data-edit-max="60">Net pay</span>
                <strong data-edit="hero.emphasis">$1,863.66</strong>
              </p>
              <figcaption data-edit="hero.stubCaption" data-edit-max="120" data-edit-multiline className={s.stubCaption}>Gross $2,451.00, less $587.34. Every line explained.</figcaption>
            </figure>
          </div>
        </section>

        <section id="stub" className={s.sec} aria-labelledby="stub-h">
          <div className={s.secHead}>
            <p data-edit="stub.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Section 01 / What you get</p>
            <h2 data-edit="stub.secTitle" data-edit-max="60" id="stub-h" className={s.secTitle}>Our services, read like a pay stub</h2>
            <p data-edit="stub.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              On the left, what we run for you. On the right, what comes off your
              desk. The net is the afternoon you get back every pay day.
            </p>
          </div>
          <div className={s.ledger}>
            <div className={s.ledgerCol}>
              <h3 data-edit="stub.ledgerHead" data-edit-max="40" className={s.ledgerHead}>Earnings: what we run</h3>
              <ul className={s.lines}>
                {EARNINGS.map(([code, name, what, when, price], i) => (
                  <li key={code} className={s.line}>
                    <span data-edit={`stub.code.${i}`} data-edit-max="60" className={s.code}>{code}</span>
                    <div className={s.lineBody}>
                      <h4 data-edit={`stub.lineName.${i}`} data-edit-max="36" className={s.lineName}>{name}</h4>
                      <p data-edit={`stub.lineWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.lineWhat}>{what}</p>
                    </div>
                    <span data-edit={`stub.lineWhen.${i}`} data-edit-max="60" className={s.lineWhen}>{when}</span>
                    <span data-edit={`stub.linePrice.${i}`} data-edit-max="60" className={s.linePrice}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.ledgerCol}>
              <h3 data-edit="stub.ledgerHead2" data-edit-max="40" className={s.ledgerHead}>Deductions: off your desk</h3>
              <ul className={s.lines}>
                {DEDUCTIONS.map(([code, name, what, when], i) => (
                  <li key={code} className={s.line}>
                    <span data-edit={`stub.code2.${i}`} data-edit-max="60" className={`${s.code} ${s.codeMinus}`}>{code}</span>
                    <div className={s.lineBody}>
                      <h4 data-edit={`stub.lineName2.${i}`} data-edit-max="36" className={s.lineName}>{name}</h4>
                      <p data-edit={`stub.lineWhat2.${i}`} data-edit-max="240" data-edit-multiline className={s.lineWhat}>{what}</p>
                    </div>
                    <span data-edit={`stub.lineWhen2.${i}`} data-edit-max="60" className={s.lineWhen}>{when}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.netRow}>
              <p data-edit="stub.netLabel" data-edit-max="240" data-edit-multiline className={s.netLabel}>Net pay to you</p>
              <p data-edit="stub.netValue" data-edit-max="240" data-edit-multiline className={s.netValue}>About six hours a month back, and no penalty notices in the mail.</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,1,4,2,1" className={s.perforation} aria-hidden="true">
          <TabbiedPattern
            pattern={pindot}
            palette={PERFORATION}
            fit="grid"
            cellSize={48}
            seed="plumbline-perforation"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="calendar" className={s.calendar} aria-labelledby="calendar-h">
          <div className={s.calendarInner}>
            <div className={s.calendarIntro}>
              <p data-edit="calendar.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Section 02 / Pay days</p>
              <h2 data-edit="calendar.secTitle" data-edit-max="60" id="calendar-h" className={s.secTitle}>A pay-day calendar you can plan around</h2>
              <p data-edit="calendar.calNote" data-edit-max="240" data-edit-multiline className={s.calNote}>
                The fourth quarter for a client on biweekly Friday pay. Every
                client gets theirs in December for the whole next year, with
                the holidays already moved.
              </p>
              <ul className={s.legend}>
                {LEGEND.map(([kind, label], i) => (
                  <li key={kind}>
                    <span className={`${s.dot} ${s[kind]}`} aria-hidden="true" />
                    <span data-edit={`calendar.text.${i}`} data-edit-max="60">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.months}>
              {MONTHS.map((m, i) => (
                <div key={m.name} className={s.month}>
                  <h3 data-edit={`calendar.monthName.${i}`} data-edit-max="40" className={s.monthName}>{m.name}</h3>
                  <div className={s.days}>
                    {WEEK.map((w, wi) => (
                      <span key={`w${wi}`} className={s.weekday} aria-hidden="true">{w}</span>
                    ))}
                    {cells(m).map((d, di) =>
                      d === 0 ? (
                        <span key={`b${di}`} className={s.blank} aria-hidden="true" />
                      ) : (
                        <span data-edit={`calendar.day.${i}.${di}`} data-edit-max="60"
                          key={`d${di}`}
                          className={`${s.day} ${m.marks[d] ? s[m.marks[d]] : ''}`}
                          title={m.marks[d] ? MARK_NAMES[m.marks[d]] : undefined}>
                          {d}
                        </span>
                      )
                    )}
                  </div>
                  <ul className={s.monthNotes}>
                    {m.notes.map((note, i2) => (
                      <li data-edit={`calendar.item.${i}.${i2}`} data-edit-max="80" key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <ol className={s.run}>
            {RUN_STEPS.map(([when, what, detail], i) => (
              <li key={when} className={s.runStep}>
                <span data-edit={`calendar.runWhen.${i}`} data-edit-max="60" className={s.runWhen}>{when}</span>
                <h3 data-edit={`calendar.runWhat.${i}`} data-edit-max="40" className={s.runWhat}>{what}</h3>
                <p data-edit={`calendar.runDetail.${i}`} data-edit-max="240" data-edit-multiline className={s.runDetail}>{detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="pricing" className={s.sec} aria-labelledby="pricing-h">
          <div className={s.secHead}>
            <p data-edit="pricing.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Section 03 / Rates</p>
            <h2 data-edit="pricing.secTitle" data-edit-max="60" id="pricing-h" className={s.secTitle}>One base fee, then a price per employee</h2>
            <p data-edit="pricing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Monthly, however often you pay. No setup fee, no charge per run,
              no year-end surcharge for W-2s. Contractors on 1099 count as half.
            </p>
          </div>
          <div className={s.pricing}>
            <ul className={s.plans}>
              {PLANS.map((p, i) => (
                <li key={p.name} className={i === 1 ? `${s.plan} ${s.planPick}` : s.plan}>
                  <h3 data-edit={`pricing.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                  <p className={s.planPrice}>
                    <span className={s.planPer}>${p.per}</span>
                    <span data-edit={`pricing.planUnit.${i}`} data-edit-max="60" className={s.planUnit}>per employee a month</span>
                  </p>
                  <p className={s.planBase}>plus ${p.base} base</p>
                  <p data-edit={`pricing.planLine.${i}`} data-edit-max="240" data-edit-multiline className={s.planLine}>{p.line}</p>
                </li>
              ))}
            </ul>
            <div className={s.matrixWrap}>
              <table className={s.matrix}>
                <caption data-edit="pricing.matrixCaption" className={s.matrixCaption}>What a month costs, by headcount</caption>
                <thead>
                  <tr>
                    <th data-edit="pricing.heading" scope="col">Employees</th>
                    {PLANS.map((p, i) => (
                      <th data-edit={`pricing.heading2.${i}`} key={p.name} scope="col">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HEADCOUNTS.map((n, i) => (
                    <tr key={n}>
                      <th data-edit={`pricing.heading3.${i}`} scope="row">{n}</th>
                      {PLANS.map((p) => (
                        <td key={p.name}>${p.base + p.per * n}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div data-edit-pattern="pricing.field" data-edit-roles="transparent,1,2,4,3,4" className={s.matrixField} aria-hidden="true">
                <TabbiedPattern
                  pattern={pindot}
                  palette={SECURITY}
                  fit="grid"
                  cellSize={40}
                  options={{ frequency: 0.7 }}
                  seed="plumbline-rates"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="switch" className={s.sec} aria-labelledby="switch-h">
          <div className={s.switchGrid}>
            <div>
              <p data-edit="switch.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Section 04 / Moving to us</p>
              <h2 data-edit="switch.secTitle" data-edit-max="60" id="switch-h" className={s.secTitle}>Switching in the middle of the year</h2>
              <p data-edit="switch.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Most clients come to us mid-quarter, after a missed deposit or a
                provider that stopped answering. It takes about two pay periods,
                and nobody is paid late on the way.
              </p>
            </div>
            <ol className={s.steps}>
              {SWITCH_STEPS.map(([title, text], i) => (
                <li key={title} className={s.step}>
                  <span className={s.stepNo}>0{i + 1}</span>
                  <h3 data-edit={`switch.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                  <p data-edit={`switch.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="hr" className={s.sec} aria-labelledby="hr-h">
          <div className={s.hrPanel}>
            <div className={s.hrIntro}>
              <p data-edit="hr.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Section 05 / The HR desk</p>
              <h2 data-edit="hr.secTitle" data-edit-max="60" id="hr-h" className={s.secTitle}>HR for businesses too small for an HR person</h2>
              <p data-edit="hr.hrNote" data-edit-max="240" data-edit-multiline className={s.hrNote}>
                Nadia Ferro holds the CPP and has run payroll for restaurants,
                clinics and builders for nineteen years. Included in Payroll and
                HR and in Full desk.
              </p>
            </div>
            <dl className={s.desk}>
              {HR_DESK.map(([term, detail], i) => (
                <div key={term} className={s.deskItem}>
                  <dt data-edit={`hr.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`hr.body.${i}`} data-edit-max="200" data-edit-multiline>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Section 06 / Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a payroll review</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Thirty minutes, free: bring last quarter and we will tell you what
                it should have cost and anything that was filed wrong.
              </p>
              <dl className={s.office}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>41 Tallow Street, Suite 3, Brennick Falls</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550142290">(555) 014-2290</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:desk@plumblinepayroll.example">desk@plumblinepayroll.example</a>
                  </dd>
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
              <p data-edit="contact.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Request form PR-1</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="pp-name">Your name</label>
                <input id="pp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="pp-company">Business</label>
                <input id="pp-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="pp-email">Email</label>
                <input id="pp-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="pp-staff">Number of employees</label>
                <input id="pp-staff" name="employees" type="number" min="1" inputMode="numeric" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">How often you pay</legend>
                <div className={s.picks}>
                  <input id="pp-f1" type="radio" name="frequency" value="weekly" />
                  <label data-edit="contact.label5" htmlFor="pp-f1">Weekly</label>
                  <input id="pp-f2" type="radio" name="frequency" value="biweekly" />
                  <label data-edit="contact.label6" htmlFor="pp-f2">Every two weeks</label>
                  <input id="pp-f3" type="radio" name="frequency" value="semimonthly" />
                  <label data-edit="contact.label7" htmlFor="pp-f3">Twice a month</label>
                  <input id="pp-f4" type="radio" name="frequency" value="monthly" />
                  <label data-edit="contact.label8" htmlFor="pp-f4">Monthly</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label9" htmlFor="pp-note">What is not working now</label>
                <textarea id="pp-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send the request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,0,2,4,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={pindot}
            palette={NIGHT}
            fit="grid"
            cellSize={36}
            options={{ frequency: 0.6 }}
            seed="plumbline-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Plumbline Payroll</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional payroll practice. The names, people, prices and address are
            invented, and nothing here is financial, tax or legal advice.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
