import { TabbiedPattern } from 'tabbied/react';
import { contourlines, warpribbon } from 'tabbied/patterns';
import s from './keel-wealth.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Keel Wealth: Independent financial advice, Harbor Street',
  description:
    'Keel Wealth is a fee-only financial planning practice of three advisors. Every fee is published on the first screen: fixed prices for plans, a flat retainer, and no commission or percentage of your savings.',
};

/* Site colors, for the pattern fields. Both are line drawings on
   `transparent`, over the page's own paper. */
const BLUE = '#2B5DA8';
const GRAY = '#8A8F99';
const PALE = '#E1E3E8';

const CHART = ['transparent', BLUE, GRAY, PALE];
const SWELL = ['transparent', GRAY, BLUE];

const NAV = [
  ['Fees', '#fees'],
  ['Services', '#services'],
  ['How we work', '#process'],
  ['Advisors', '#advisors'],
  ['Disclosures', '#disclosures'],
  ['Book a call', '#book'],
];

const FEES = [
  { item: 'Introductory call', detail: '30 minutes, by phone or video', price: 'Free' },
  { item: 'First meeting', detail: 'An hour, and a written summary after', price: 'Free' },
  { item: 'Financial plan', detail: 'Goals, cash flow, tax, pensions, investments', price: '$2,400' },
  { item: 'Retirement plan', detail: 'When you can stop, and how to draw an income', price: '$3,200' },
  { item: 'Single question', detail: 'One topic, answered in writing', price: '$220 an hour' },
  { item: 'Ongoing advice', detail: 'Two reviews a year, calls and email between', price: '$2,000 a year' },
];

const NEVER = ['Commission on products', 'A percentage of your savings', 'Fees to leave'];

/* What a 1% advisor would charge each year, beside our flat retainer. The
   bar classes set the widths against the largest figure. */
const COMPARE = [
  { size: '$500,000 saved', them: '$5,000', themW: 'w50', us: '$2,000', usW: 'w20' },
  { size: '$1,000,000 saved', them: '$10,000', themW: 'w100', us: '$2,000', usW: 'w20' },
];

const SERVICES = [
  {
    name: 'Retirement',
    body: 'When you can afford to stop, how to take an income from what you have saved, and in what order, so the tax stays low.',
    fee: 'Retirement plan, $3,200',
  },
  {
    name: 'Pensions and 401(k)s',
    body: 'Old workplace plans found, compared and, only where it helps, consolidated. We never earn a cent from a transfer.',
    fee: 'Part of any plan',
  },
  {
    name: 'Investments',
    body: 'Low-cost index funds, held in your name at an independent custodian. We recommend; you own it and can leave with it.',
    fee: 'Part of any plan',
  },
  {
    name: 'Tax and giving',
    body: 'Using the allowances you already have, and giving to family or to causes in a way that does not cost you twice.',
    fee: 'Financial plan, $2,400',
  },
  {
    name: 'Wills and estates',
    body: 'Working alongside your attorney so the plan and the paperwork agree, and the people you leave behind know where things are.',
    fee: 'Financial plan, $2,400',
  },
  {
    name: 'A second opinion',
    body: 'Someone else\'s plan or product, read by us, with a plain answer on whether it is good value and what we would change.',
    fee: '$220 an hour',
  },
];

const STEPS = [
  { no: '01', title: 'A short call', time: 'Free, 30 minutes', body: 'You tell us what is on your mind. We tell you whether we can help, and if not, who can.' },
  { no: '02', title: 'First meeting', time: 'Free, an hour', body: 'We go through your numbers together and agree in writing what the plan will cover and what it costs.' },
  { no: '03', title: 'Your plan', time: '3-4 weeks, fixed fee', body: 'A written plan of about twenty pages, then a meeting to go through it line by line. You keep it either way.' },
  { no: '04', title: 'Putting it in place', time: 'Included', body: 'We fill in the forms with you. Accounts are opened in your name at the custodian; we never hold your money.' },
  { no: '05', title: 'Each year after', time: 'Optional, $2,000', body: 'Two reviews a year and advice whenever something changes. Stop the retainer with one email.' },
];

const ADVISORS = [
  {
    art: 'keel-wealth-a1',
    name: 'Helen Marsh',
    role: 'Founder, Certified Financial Planner',
    focus: 'Retirement and pensions',
    years: '26 years in advice',
    body: 'Spent sixteen years at a bank watching clients pay fees they could not see. Started Keel to do the opposite.',
    panel: 'panelPale',
  },
  {
    art: 'keel-wealth-a2',
    name: 'Daniel Okafor',
    role: 'Chartered Financial Analyst',
    focus: 'Investments and tax',
    years: '14 years in advice',
    body: 'Chooses the funds and checks their costs every quarter. Can explain an index fund in one sentence, and will.',
    panel: 'panelBlue',
  },
  {
    art: 'keel-wealth-a3',
    name: 'Sara Lindqvist',
    role: 'Certified Financial Planner',
    focus: 'Young families and first homes',
    years: '8 years in advice',
    body: 'Works with people starting out: a first house, a first child, a first pension that is worth reading.',
    panel: 'panelGray',
  },
];

const DISCLOSURES = [
  {
    q: 'How we are paid',
    a: 'Only by our clients, through the fees on this page. We accept no commission, referral fees or payments from fund companies, insurers or lenders.',
  },
  {
    q: 'Acting in your interest',
    a: 'We are a fee-only practice and act as fiduciaries at all times, which means your interest comes before ours in every recommendation.',
  },
  {
    q: 'Where your money is held',
    a: 'Investments are held in your own name by an independent custodian. We can advise on the accounts; we cannot withdraw from them.',
  },
  {
    q: 'Risk and past performance',
    a: 'Investments can fall as well as rise, and you may get back less than you put in. Past returns are not a guide to future ones.',
  },
  {
    q: 'Complaints',
    a: 'Write to Helen Marsh at the address below. We acknowledge within three working days and reply in full within four weeks.',
  },
];

export default function KeelWealthPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f4f0',
        '--navy': '#111b2b',
        '--blue': '#2b5da8',
        '--gray': '#8a8f99',
        '--pale': '#e1e3e8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,navy,blue,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400..600&family=Onest:wght@400..600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markKeel} aria-hidden="true" />
          <span data-edit="bar.text" data-edit-max="60">Keel Wealth</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ FEES
            The fee schedule is the first thing on the page, on a chart of
            depth lines. */}
        <section id="fees" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="fees.field" data-edit-roles="transparent,2,3,4" className={s.chart} aria-hidden="true">
            <TabbiedPattern
              pattern={contourlines}
              palette={CHART}
              options={{ frequency: 0.7 }}
              fit="grid"
              cellSize={120}
              seed="keel-chart"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p data-edit="fees.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Independent financial advice, 9 Harbor Street</p>
              <h1 data-edit="fees.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>
                What we charge, <em>before anything else.</em>
              </h1>
              <p data-edit="fees.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                We are paid by you and only by you. No commission, no percentage
                of your savings, nothing buried in a fund we chose. The whole
                price list fits on one card, and this is it.
              </p>
              <div className={s.founder}>
                <div className={s.avatar}>
                  <Artwork
                    slug="keel-wealth-a1"
                    alt="Helen Marsh, founder"
                    inks={['var(--navy)', 'var(--paper)']}
                    className={s.avatarArt}
                  />
                </div>
                <blockquote className={s.quote}>
                  <p data-edit="fees.body" data-edit-max="240" data-edit-multiline>If you cannot read an advisor&apos;s fees on one card, the fees are the problem.</p>
                  <cite data-edit="fees.attribution" data-edit-max="48">Helen Marsh, founder</cite>
                </blockquote>
              </div>
            </div>

            <div className={s.schedule}>
              <div className={s.scheduleHead}>
                <h2 data-edit="fees.scheduleTitle" data-edit-max="60" className={s.scheduleTitle}>Fee schedule, 2026</h2>
                <p data-edit="fees.scheduleNote" data-edit-max="240" data-edit-multiline className={s.scheduleNote}>Fixed prices. Nothing added later.</p>
              </div>
              <table className={s.fees}>
                <caption data-edit="fees.visuallyHidden" className={s.visuallyHidden}>Keel Wealth fees for 2026</caption>
                <thead>
                  <tr>
                    <th data-edit="fees.heading" scope="col">Service</th>
                    <th data-edit="fees.heading2" scope="col">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f, i) => (
                    <tr key={f.item}>
                      <th scope="row">
                        <span data-edit={`fees.feeItem.${i}`} data-edit-max="60" className={s.feeItem}>{f.item}</span>
                        <span data-edit={`fees.feeDetail.${i}`} data-edit-max="60" className={s.feeDetail}>{f.detail}</span>
                      </th>
                      <td data-edit={`fees.cell.${i}`}>{f.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.never}>
                <p data-edit="fees.neverHead" data-edit-max="240" data-edit-multiline className={s.neverHead}>We never charge</p>
                <ul className={s.neverList}>
                  {NEVER.map((n, i) => (
                    <li data-edit={`fees.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                  ))}
                </ul>
              </div>
              <a data-edit="fees.cta" data-edit-max="28" className={s.cta} href="#book">Book the free call</a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- COMPARE */}
        <section className={s.compare} aria-labelledby="compare-h">
          <div className={s.compareInner}>
            <div className={s.compareText}>
              <h2 data-edit="compare.compareTitle" data-edit-max="60" id="compare-h" className={s.compareTitle}>Why a flat fee matters</h2>
              <p data-edit="compare.compareBody" data-edit-max="240" data-edit-multiline className={s.compareBody}>
                Many advisors charge 1% of what you have saved, every year, for
                the same two meetings. As your savings grow, so does their fee.
                Ours does not.
              </p>
            </div>
            <ul className={s.bars}>
              {COMPARE.map((c, i) => (
                <li key={c.size} className={s.barGroup}>
                  <p data-edit={`compare.barSize.${i}`} data-edit-max="240" data-edit-multiline className={s.barSize}>{c.size}</p>
                  <p className={s.barRow}>
                    <span data-edit={`compare.barLabel.${i}`} data-edit-max="60" className={s.barLabel}>At 1% a year</span>
                    <span data-edit={`compare.barFill.${i}`} data-edit-max="60" className={`${s.barFill} ${s.barThem} ${s[c.themW]}`}>{c.them}</span>
                  </p>
                  <p className={s.barRow}>
                    <span data-edit={`compare.barLabel2.${i}`} data-edit-max="60" className={s.barLabel}>Keel, flat</span>
                    <span data-edit={`compare.barFill2.${i}`} data-edit-max="60" className={`${s.barFill} ${s.barUs} ${s[c.usW]}`}>{c.us}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Services</p>
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Planning for the whole of your money</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Each service belongs to one of the fees above. If a question needs
              more than the plan covers, we say so, and price it, before we start.
            </p>
          </div>
          <ul className={s.services}>
            {SERVICES.map((sv, i) => (
              <li key={sv.name} className={s.service}>
                <h3 data-edit={`services.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                <p data-edit={`services.serviceBody.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceBody}>{sv.body}</p>
                <p data-edit={`services.serviceFee.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceFee}>{sv.fee}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- PROCESS */}
        <section id="process" className={s.process} aria-labelledby="process-h">
          <div className={s.processInner}>
            <div className={s.secHead}>
              <p data-edit="process.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>How we work</p>
              <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>Five steps, two of them free</h2>
              <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                You can stop after any step. Most people know by the end of the
                first meeting whether we are right for them.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map((st, i) => (
                <li key={st.no} className={s.step}>
                  <span data-edit={`process.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                  <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{st.title}</h3>
                  <p data-edit={`process.stepTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stepTime}>{st.time}</p>
                  <p data-edit={`process.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------- ADVISORS */}
        <section id="advisors" className={s.sec} aria-labelledby="advisors-h">
          <div className={s.secHead}>
            <p data-edit="advisors.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The advisors</p>
            <h2 data-edit="advisors.secTitle" data-edit-max="60" id="advisors-h" className={s.secTitle}>Three people, and you meet all of them</h2>
            <p data-edit="advisors.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One of us leads your plan and another checks it. None of us is paid
              a bonus for anything you buy.
            </p>
          </div>
          <ul className={s.advisors}>
            {ADVISORS.map((a, i) => (
              <li key={a.name} className={s.advisor}>
                <div className={`${s.portrait} ${s[a.panel]}`}>
                  <Artwork slug={a.art} alt={a.name} inks={['var(--navy)', 'var(--paper)']} className={s.portraitArt} />
                </div>
                <h3 data-edit={`advisors.advisorName.${i}`} data-edit-max="40" className={s.advisorName}>{a.name}</h3>
                <p data-edit={`advisors.advisorRole.${i}`} data-edit-max="240" data-edit-multiline className={s.advisorRole}>{a.role}</p>
                <dl className={s.advisorFacts}>
                  <div>
                    <dt data-edit={`advisors.term.${i}`} data-edit-max="28">Focus</dt>
                    <dd data-edit={`advisors.body.${i}`} data-edit-max="200" data-edit-multiline>{a.focus}</dd>
                  </div>
                  <div>
                    <dt data-edit={`advisors.term2.${i}`} data-edit-max="28">Experience</dt>
                    <dd data-edit={`advisors.body2.${i}`} data-edit-max="200" data-edit-multiline>{a.years}</dd>
                  </div>
                </dl>
                <p data-edit={`advisors.advisorBody.${i}`} data-edit-max="240" data-edit-multiline className={s.advisorBody}>{a.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- DISCLOSURES */}
        <section id="disclosures" className={s.sec} aria-labelledby="disclosures-h">
          <div className={s.discGrid}>
            <div>
              <p data-edit="disclosures.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Disclosures</p>
              <h2 data-edit="disclosures.secTitle" data-edit-max="60" id="disclosures-h" className={s.secTitle}>The small print, in normal print</h2>
              <p data-edit="disclosures.body" data-edit-max="240" data-edit-multiline className={s.body}>
                What a regulator would ask us, answered before you have to. Our
                full client agreement and brochure are free on request.
              </p>
            </div>
            <div className={s.discs}>
              {DISCLOSURES.map((d, i) => (
                <details key={d.q} className={s.disc}>
                  <summary data-edit={`disclosures.question.${i}`} data-edit-max="80">{d.q}</summary>
                  <p data-edit={`disclosures.body2.${i}`} data-edit-max="240" data-edit-multiline>{d.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div data-edit-pattern="book.field" data-edit-roles="transparent,3,2" className={s.swell} aria-hidden="true">
            <TabbiedPattern
              pattern={warpribbon}
              palette={SWELL}
              fit="grid"
              cellSize={32}
              seed="keel-swell"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.bookInner}>
            <div className={s.bookText}>
              <p data-edit="book.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Book a call</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Thirty minutes, free, and no sales pitch</h2>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline className={s.body}>
                Tell us roughly what is on your mind and when suits you. One of
                the three of us will call at that time.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Office</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>9 Harbor Street, second floor</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Hours</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>Monday to Friday, 8:30 to 6; Thursday until 8</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Phone</dt>
                  <dd data-edit="book.body4" data-edit-max="200" data-edit-multiline>(555) 012-7730</dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="mailto:hello@keelwealth.example">hello@keelwealth.example</a>
                  </dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <p className={s.field}>
                <label data-edit="book.label" htmlFor="kw-name">Name</label>
                <input id="kw-name" name="name" type="text" autoComplete="name" />
              </p>
              <p className={s.field}>
                <label data-edit="book.label2" htmlFor="kw-phone">Phone</label>
                <input id="kw-phone" name="phone" type="tel" autoComplete="tel" />
              </p>
              <p className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label3" htmlFor="kw-email">Email</label>
                <input id="kw-email" name="email" type="email" autoComplete="email" />
              </p>
              <p className={s.field}>
                <label data-edit="book.label4" htmlFor="kw-topic">Mostly about</label>
                <select id="kw-topic" name="topic" defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Retirement</option>
                  <option>Pensions and 401(k)s</option>
                  <option>Investing savings</option>
                  <option>Tax and giving</option>
                  <option>A second opinion</option>
                  <option>Not sure yet</option>
                </select>
              </p>
              <p className={s.field}>
                <label data-edit="book.label5" htmlFor="kw-time">Best time to call</label>
                <select id="kw-time" name="time" defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Weekday morning</option>
                  <option>Weekday afternoon</option>
                  <option>Thursday evening</option>
                </select>
              </p>
              <p className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label6" htmlFor="kw-note">Anything we should know first</label>
                <textarea id="kw-note" name="note" rows={4} />
              </p>
              <button data-edit="book.submit" data-edit-max="24" type="submit" className={s.submit}>Request the call</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Keel Wealth</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Fee-only financial planning. 9 Harbor Street.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p data-edit="footer.footLegal" data-edit-max="240" data-edit-multiline className={s.footLegal}>
            Keel Wealth is paid only by its clients. The value of investments can
            fall as well as rise. This page is general information, not advice.
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional financial advisor. People, fees and figures are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
