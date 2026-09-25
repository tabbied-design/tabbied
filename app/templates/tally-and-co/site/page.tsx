import { TabbiedPattern } from 'tabbied/react';
import { cornernotch, trigram } from 'tabbied/patterns';
import s from './tally-and-co.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Tally & Co.: Bookkeeping and tax accountants, Fairhaven',
  description:
    'Tally & Co. keeps the books for small businesses for a fixed monthly price, closes them by the 10th and files the taxes on time. Three plans, printed in full, and a free 20-minute call to start.',
};

/* Site colors. The hero plate draws its notches in the green on the pale
   ground; the highlighted plan's strip draws on the ink card. */
const GREEN = '#1F7A4D';
const GRAY = '#8E948F';
const PALE = '#E4E9E4';

const NOTCH = ['transparent', GREEN];
const MARKS = ['transparent', GREEN, PALE, GRAY];

const NAV = [
  ['Plans', '#plans'],
  ['Included', '#included'],
  ['Deadlines', '#deadlines'],
  ['Switching', '#switching'],
  ['Questions', '#questions'],
  ['Contact', '#contact'],
];

const PROOF = [
  ['340', 'small businesses on our books'],
  ['10th', 'of the month, books closed by'],
  ['0', 'late filings in the last three years'],
  ['2014', 'the year we opened'],
];

type Plan = {
  name: string;
  forWho: string;
  price: string;
  note: string;
  items: string[];
  cta: string;
  badge: string;
  featured: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Starter',
    forWho: 'For sole traders and first-year businesses.',
    price: '$190',
    note: 'a month, billed monthly',
    items: [
      'Up to 60 transactions a month',
      'One bank or card account',
      'Monthly reconciliation',
      'Quarterly profit and loss',
      'Email support, reply in a working day',
    ],
    cta: 'Start with Starter',
    badge: '',
    featured: false,
  },
  {
    name: 'Growth',
    forWho: 'For businesses with staff and sales tax.',
    price: '$390',
    note: 'a month, billed monthly',
    items: [
      'Up to 250 transactions a month',
      'Up to four bank and card accounts',
      'Payroll for up to 10 people',
      'Monthly profit and loss and balance sheet',
      'Sales tax filings',
      'A named bookkeeper and a quarterly call',
    ],
    cta: 'Start with Growth',
    badge: 'Most chosen',
    featured: true,
  },
  {
    name: 'Established',
    forWho: 'For teams, stock and more than one location.',
    price: '$690',
    note: 'a month, billed monthly',
    items: [
      'Up to 600 transactions a month',
      'Unlimited accounts',
      'Payroll for up to 30 people',
      'Books closed by the 10th',
      'A cash-flow forecast, updated monthly',
      'Bill pay and a monthly call',
    ],
    cta: 'Start with Established',
    badge: '',
    featured: false,
  },
];

type Row = {
  label: string;
  values: (string | boolean)[];
};

type RowGroup = {
  group: string;
  rows: Row[];
};

const COMPARE: RowGroup[] = [
  {
    group: 'Bookkeeping',
    rows: [
      { label: 'Transactions a month', values: ['60', '250', '600'] },
      { label: 'Bank and card accounts', values: ['1', '4', 'Unlimited'] },
      { label: 'Monthly reconciliation', values: [true, true, true] },
      { label: 'Receipt capture app', values: [true, true, true] },
      { label: 'Books closed by', values: ['20th', '15th', '10th'] },
    ],
  },
  {
    group: 'Reports',
    rows: [
      { label: 'Profit and loss', values: ['Quarterly', 'Monthly', 'Monthly'] },
      { label: 'Balance sheet', values: [false, true, true] },
      { label: 'Cash-flow forecast', values: [false, false, true] },
    ],
  },
  {
    group: 'Payroll and tax',
    rows: [
      { label: 'People on payroll', values: [false, '10', '30'] },
      { label: 'Contractor 1099s at year end', values: [false, true, true] },
      { label: 'Sales tax filings', values: [false, true, true] },
      { label: 'Estimated tax reminders', values: [true, true, true] },
      { label: 'Year-end package for your return', values: [true, true, true] },
    ],
  },
  {
    group: 'Support',
    rows: [
      { label: 'Named bookkeeper', values: [false, true, true] },
      { label: 'Review call', values: [false, 'Quarterly', 'Monthly'] },
      { label: 'Reply by', values: ['Next day', 'Same day', 'Same day'] },
    ],
  },
];

type Month = {
  month: string;
  items: { day: string; what: string }[];
  quiet: string;
};

const YEAR: Month[] = [
  { month: 'Jan', items: [{ day: '15', what: 'Q4 estimated tax' }, { day: '31', what: 'W-2s and 1099s out' }], quiet: '' },
  { month: 'Feb', items: [], quiet: 'Nothing due' },
  { month: 'Mar', items: [{ day: '15', what: 'Partnership and S-corp returns' }], quiet: '' },
  { month: 'Apr', items: [{ day: '15', what: 'Personal returns, Q1 estimate' }, { day: '30', what: 'Q1 payroll return' }], quiet: '' },
  { month: 'May', items: [], quiet: 'Nothing due' },
  { month: 'Jun', items: [{ day: '15', what: 'Q2 estimated tax' }], quiet: '' },
  { month: 'Jul', items: [{ day: '31', what: 'Q2 payroll return' }], quiet: '' },
  { month: 'Aug', items: [], quiet: 'Nothing due' },
  { month: 'Sep', items: [{ day: '15', what: 'Q3 estimate, extended business returns' }], quiet: '' },
  { month: 'Oct', items: [{ day: '15', what: 'Extended personal returns' }, { day: '31', what: 'Q3 payroll return' }], quiet: '' },
  { month: 'Nov', items: [], quiet: 'Nothing due' },
  { month: 'Dec', items: [{ day: '31', what: 'Last day for this year\'s spending' }], quiet: '' },
];

/* A comparison cell is a check, a dash or a value. The check and the dash
   keep their words for screen readers and draw the mark in CSS. */
const cellText = (v: string | boolean) => (v === true ? 'Included' : v === false ? 'Not included' : v);
const cellClass = (v: string | boolean) => (v === true ? s.yes : v === false ? s.no : s.val);

const STEPS = [
  {
    no: '1',
    when: 'Day 1',
    title: 'A free 20-minute call',
    body: 'We look at your books with you, read-only, and quote a fixed monthly price. You have it in writing the same day.',
  },
  {
    no: '2',
    when: 'Weeks 1-2',
    title: 'We take over',
    body: 'You add us to your bank feeds and your accounting software, and we tell your old bookkeeper. If you are behind, we catch you up first.',
  },
  {
    no: '3',
    when: 'The next month',
    title: 'Your first close',
    body: 'By the date on your plan you have reconciled books and a one-page summary of the month. Then the same, every month.',
  },
];

const FAQ = [
  {
    q: 'Which accounting software do you work in?',
    a: 'Whichever of the main cloud ledgers you already use. If you are on spreadsheets, we set one up for you at no charge and move your history across.',
  },
  {
    q: 'What counts as a transaction?',
    a: 'One line on a bank or card statement. A month of 400 card sales settled in 30 deposits counts as 30.',
  },
  {
    q: 'What if I go over my plan?',
    a: 'We tell you. If it happens three months running we suggest the next plan up, and we never bill an overage without asking first.',
  },
  {
    q: 'Do you file my tax returns too?',
    a: 'Every plan includes the year-end package your return is built from. The returns themselves are priced per year: a business return from $850, a personal one from $325.',
  },
  {
    q: 'I am months behind. Can you still take me on?',
    a: 'Yes, most new clients are. Catch-up work is $95 for each month behind on Starter and Growth, and quoted on Established. It is done before your first close.',
  },
  {
    q: 'How do I leave?',
    a: 'Thirty days\' notice by email, at any time. The books are yours: we hand over the ledger, the reports and every receipt we hold.',
  },
];

export default function TallyAndCoPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fafaf7',
        '--ink': '#151a16',
        '--green': '#1f7a4d',
        '--gray': '#8e948f',
        '--pale': '#e4e9e4',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,green,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Tally & Co.</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Book a free call</a>
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
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Bookkeeping and tax for small businesses</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Books closed by the 10th. <em>Taxes filed on time.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              We keep your books every month for a fixed price, file the
              payroll and sales tax as they fall due, and hand your year to
              the tax return already finished. You get one page a month to
              read, and a person to call about it.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.primary" data-edit-max="28" className={s.primary} href="#plans">See the plans</a>
              <a data-edit="hero.secondary" data-edit-max="28" className={s.secondary} href="#contact">Book a free 20-minute call</a>
            </div>
            <p data-edit="hero.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>From $190 a month. No hourly billing, no setup fee.</p>
          </div>
          {/* The primary field: notches like a tally, drawn on the pale. */}
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2" className={s.heroPlate} aria-hidden="true">
            <TabbiedPattern
              pattern={cornernotch}
              palette={NOTCH}
              fit="grid"
              cellSize={52}
              redrawInterval={7800}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        <dl className={s.proof}>
          {PROOF.map(([v, k], i) => (
            <div key={k}>
              <dt data-edit={`top.term.${i}`} data-edit-max="28">{v}</dt>
              <dd data-edit={`top.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
            </div>
          ))}
        </dl>

        {/* ----------------------------------------------------------- PLANS */}
        <section id="plans" className={s.sec} aria-labelledby="plans-h">
          <div className={s.secHead}>
            <p data-edit="plans.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Plans</p>
            <h2 data-edit="plans.title" data-edit-max="60" id="plans-h">One price a month, agreed before we start</h2>
            <p data-edit="plans.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Pick by the size of the business, not by the features. You can
              move up or down at the start of any month.
            </p>
          </div>
          <div className={s.plans}>
            {/* The highlighted plan's crown: a strip of tally marks that the
                grid seats on top of the middle card. */}
            <div data-edit-pattern="plans.field" data-edit-roles="transparent,2,4,3" className={s.planStrip} aria-hidden="true">
              <TabbiedPattern
                pattern={trigram}
                palette={MARKS}
                options={{ frequency: 0.8, roundedCorners: false }}
                fit="grid"
                cellSize={36}
                redrawInterval={8600}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            {PLANS.map((p, i) => (
              <div key={p.name} className={p.featured ? `${s.plan} ${s.planFeatured}` : s.plan}>
                <div className={s.planBody}>
                  <div className={s.planTop}>
                    <h3 data-edit={`plans.title2.${i}`} data-edit-max="40">{p.name}</h3>
                    <span data-edit={`plans.badge.${i}`} data-edit-max="60" className={s.badge}>{p.badge}</span>
                  </div>
                  <p data-edit={`plans.planFor.${i}`} data-edit-max="240" data-edit-multiline className={s.planFor}>{p.forWho}</p>
                  <p className={s.price}>
                    <strong data-edit={`plans.emphasis.${i}`}>{p.price}</strong>
                    <span data-edit={`plans.text.${i}`} data-edit-max="60">{p.note}</span>
                  </p>
                  <ul className={s.planList}>
                    {p.items.map((it, i2) => (
                      <li data-edit={`plans.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                    ))}
                  </ul>
                  <a data-edit={`plans.planCta.${i}`} data-edit-max="28" className={s.planCta} href="#contact">{p.cta}</a>
                </div>
              </div>
            ))}
          </div>
          <p data-edit="plans.plansNote" data-edit-max="240" data-edit-multiline className={s.plansNote}>
            Tax returns are priced per year: a business return from $850, a
            personal return from $325. Catch-up work is $95 for each month
            behind.
          </p>
        </section>

        {/* -------------------------------------------------------- INCLUDED */}
        <section id="included" className={s.sec} aria-labelledby="included-h">
          <div className={s.secHead}>
            <p data-edit="included.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>What is included</p>
            <h2 data-edit="included.title" data-edit-max="60" id="included-h">Every line, side by side</h2>
          </div>
          <div className={s.tableWrap}>
            <table className={s.compare}>
              <caption data-edit="included.srOnly" className={s.srOnly}>What each plan includes</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span data-edit="included.srOnly2" data-edit-max="60" className={s.srOnly}>Feature</span>
                  </th>
                  {PLANS.map((p, i) => (
                    <th data-edit={`included.colFeatured.${i}`} key={p.name} scope="col" className={p.featured ? s.colFeatured : undefined}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              {COMPARE.map((g, i) => (
                <tbody key={g.group}>
                  <tr className={s.groupRow}>
                    <th data-edit={`included.heading.${i}`} scope="colgroup" colSpan={4}>{g.group}</th>
                  </tr>
                  {g.rows.map((r, i2) => (
                    <tr key={r.label}>
                      <th data-edit={`included.heading2.${i}.${i2}`} scope="row">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td key={PLANS[i].name} className={PLANS[i].featured ? s.colFeatured : undefined}>
                          <span className={cellClass(v)}>{cellText(v)}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------- DEADLINES */}
        <section id="deadlines" className={s.sec} aria-labelledby="deadlines-h">
          <div className={s.secHead}>
            <p data-edit="deadlines.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The tax year</p>
            <h2 data-edit="deadlines.title" data-edit-max="60" id="deadlines-h">Twelve months, eleven dates we watch for you</h2>
            <p data-edit="deadlines.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The federal dates every small business meets. When one falls on
              a weekend it moves to the next working day, and we remind you
              two weeks before each.
            </p>
          </div>
          <ol className={s.year}>
            {YEAR.map((m, i) => (
              <li key={m.month} className={m.items.length ? s.monthOn : s.month}>
                <span data-edit={`deadlines.monthName.${i}`} data-edit-max="60" className={s.monthName}>{m.month}</span>
                <ul className={s.dates}>
                  {m.items.map((d, i2) => (
                    <li key={d.day + d.what}>
                      <span data-edit={`deadlines.day.${i}.${i2}`} data-edit-max="60" className={s.day}>{d.day}</span>
                      <span data-edit={`deadlines.what.${i}.${i2}`} data-edit-max="60" className={s.what}>{d.what}</span>
                    </li>
                  ))}
                </ul>
                <span data-edit={`deadlines.quiet.${i}`} data-edit-max="60" className={s.quiet}>{m.quiet}</span>
              </li>
            ))}
          </ol>
          <p data-edit="deadlines.yearNote" data-edit-max="240" data-edit-multiline className={s.yearNote}>
            State sales tax is due on the 20th of each month or quarter,
            depending on your volume. It is on Growth and Established.
          </p>
        </section>

        {/* ------------------------------------------------------- SWITCHING */}
        <section id="switching" className={s.sec} aria-labelledby="switching-h">
          <div className={s.secHead}>
            <p data-edit="switching.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Switching</p>
            <h2 data-edit="switching.title" data-edit-max="60" id="switching-h">Moving your books to us takes three steps</h2>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.no}>
                <span data-edit={`switching.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                <span data-edit={`switching.stepWhen.${i}`} data-edit-max="60" className={s.stepWhen}>{st.when}</span>
                <h3 data-edit={`switching.title2.${i}`} data-edit-max="40">{st.title}</h3>
                <p data-edit={`switching.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.faqGrid}>
            <div className={s.secHead}>
              <p data-edit="questions.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Questions</p>
              <h2 data-edit="questions.title" data-edit-max="60" id="questions-h">Asked on almost every first call</h2>
              <p data-edit="questions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Anything else, ask us on the call. It is free and there is no
                follow-up unless you want one.
              </p>
            </div>
            <div className={s.faq}>
              {FAQ.map((f, i) => (
                <details key={f.q} className={s.faqItem}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{f.q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactInner}>
            <div className={s.contactText}>
              <p data-edit="contact.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Contact</p>
              <h2 data-edit="contact.title" data-edit-max="60" id="contact-h">Book a free call</h2>
              <p data-edit="contact.contactLede" data-edit-max="240" data-edit-multiline className={s.contactLede}>
                Twenty minutes, on video or by phone. Tell us a little about
                the business and we will send you two or three times this
                week. Bring last month's bank statement if you can.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550167720">(555) 016-7720</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@tallyandco.example">hello@tallyandco.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>18 Quay Street, second floor, Fairhaven</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Monday to Friday, 8:30-5:30. Until 8:00 in the first half of April.</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="tc-name">Your name</label>
                <input id="tc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="tc-business">Business name</label>
                <input id="tc-business" name="business" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="tc-email">Email</label>
                <input id="tc-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="tc-phone">Phone</label>
                <input id="tc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="tc-volume">Transactions a month</label>
                <select id="tc-volume" name="volume" defaultValue="under60">
                  <option value="under60">Fewer than 60</option>
                  <option value="under250">60 to 250</option>
                  <option value="under600">250 to 600</option>
                  <option value="more">More than 600</option>
                  <option value="unknown">I do not know yet</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label6" htmlFor="tc-state">Your books are</label>
                <select id="tc-state" name="state" defaultValue="current">
                  <option value="current">Up to date</option>
                  <option value="behind">A few months behind</option>
                  <option value="year">A year or more behind</option>
                  <option value="none">Not started</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label7" htmlFor="tc-note">Anything we should know</label>
                <textarea id="tc-note" name="note" rows={3} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" type="submit" className={s.submit}>Ask for a call</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tally & Co.</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Bookkeeping and tax accountants, Fairhaven.</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional accounting firm. Prices, people and figures are invented, and the dates are a guide, not tax advice.</p>
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
