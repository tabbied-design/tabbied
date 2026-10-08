import { TabbiedPattern } from 'tabbied/react';
import { piechart } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './tidy-books-bookkeeping.module.css';

export const metadata = {
  title: 'Tidy Books: Monthly bookkeeping for small businesses, Alder Row',
  description:
    'Tidy Books closes your books every month and sends a plain-English month-end report by the 10th. Flat monthly pricing by number of transactions, for shops, studios and trades.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is
   the month-end report a client receives, and the pie charts are its
   figures: coral, navy and teal slices on a transparent ground, so the
   report paper shows through the donut holes. */
const PAPER = '#f6f3ec';
const NAVY = '#1f2c47';
const CORAL = '#df5f3d';
const TEAL = '#3f8f86';
const BUTTER = '#ecc55b';

const CHARTS = ['transparent', CORAL, NAVY, TEAL];
const NIGHT = ['transparent', CORAL, PAPER, BUTTER];
const WARM = ['transparent', TEAL, NAVY, BUTTER];

const NAV = [
  ['The report', '#report'],
  ['Month-end close', '#close'],
  ['Pricing', '#pricing'],
  ['Questions', '#faq'],
  ['Contact', '#contact'],
];

const SUMMARY = [
  ['Money in', '$48,210'],
  ['Money out', '$39,870'],
  ['Net profit', '$8,340'],
  ['Cash in the bank', '$21,560'],
  ['Owed to you', '$3,120'],
];

const CONTENTS = [
  ['The month on one page, in plain English', 'p. 1'],
  ['Profit and loss, this month and year to date', 'p. 2'],
  ['Balance sheet: what you own and what you owe', 'p. 3'],
  ['Cash flow: where the money actually went', 'p. 4'],
  ['Who owes you, and for how long', 'p. 5'],
  ['Every bank and card account, reconciled', 'p. 6'],
  ['Our questions for you (usually three to five)', 'p. 7'],
];

type Share = { label: string; amount: string; pct: number; share: string; tone: string };

const SPEND: Share[] = [
  { label: 'Ingredients', amount: '$15,150', pct: 38, share: '38%', tone: 'coral' },
  { label: 'Wages', amount: '$12,360', pct: 31, share: '31%', tone: 'navy' },
  { label: 'Rent', amount: '$4,780', pct: 12, share: '12%', tone: 'teal' },
  { label: 'Packaging', amount: '$1,990', pct: 5, share: '5%', tone: 'butter' },
  { label: 'Utilities', amount: '$2,390', pct: 6, share: '6%', tone: 'teal' },
  { label: 'Everything else', amount: '$3,200', pct: 8, share: '8%', tone: 'navy' },
];

const CLOSE = [
  ['Day 1', 'Feeds pulled', 'Every bank, card and payment account, including the one you forgot you opened.'],
  ['Day 2-3', 'Every line reconciled', 'Each transaction matched to a receipt, an invoice or a question for you. Balances agree to the cent.'],
  ['Day 4', 'Sales and receivables', 'Paid invoices marked, overdue ones listed, polite reminders drafted for you to send.'],
  ['Day 5', 'Bills and payables', 'What you owe and when it is due, so nothing turns up as a late fee.'],
  ['Day 6', 'Payroll and sales tax booked', 'Wages, employer taxes and the sales tax you collected, set aside on paper.'],
  ['Day 7-8', 'A second bookkeeper reviews', 'Every close is checked by someone who did not do it, before you see a number.'],
  ['Day 9', 'Your questions list', 'Short and specific: what was the $412 at Harlow Supply, and is it a repair or a tool?'],
  ['Day 10', 'The report lands', 'In your inbox by noon, with a 20-minute call if you want to walk through it.'],
];

type Tier = { name: string; range: string; price: string; fits: string; items: string[]; pick?: boolean };

const TIERS: Tier[] = [
  {
    name: 'Quiet',
    range: 'Up to 60 transactions a month',
    price: '$225',
    fits: 'Consultants, a one-chair studio, a shop with one bank account.',
    items: ['Monthly close and report', 'Up to 2 bank or card accounts', 'Email answers within a business day', 'Year-end package for your CPA'],
  },
  {
    name: 'Steady',
    range: '61-200 transactions a month',
    price: '$390',
    fits: 'Most of our clients: cafes, trades, small agencies.',
    items: ['Everything in Quiet', 'Up to 5 accounts', 'Overdue invoices chased', 'A 20-minute call each month'],
    pick: true,
  },
  {
    name: 'Busy',
    range: '201-500 transactions a month',
    price: '$640',
    fits: 'Retail with stock, two locations, a growing payroll.',
    items: ['Everything in Steady', 'Up to 10 accounts', 'Inventory and cost of goods', 'A cash snapshot every Monday'],
  },
];

const EXTRAS = [
  ['Payroll, up to 10 people', '$45 a run'],
  ['Sales tax returns', '$60 a filing'],
  ['1099 forms for contractors', '$12 a form'],
  ['Catch-up, per month behind', '$180'],
  ['Over 500 transactions', 'Quoted after a look'],
];

const FAQ = [
  ['Which software do you work in?', 'QuickBooks Online or Xero. If you are on a spreadsheet or a shoebox, we set one up for you during the first month at no charge.'],
  ['Do you do my taxes?', 'No. We are bookkeepers, not tax preparers. At year end we hand your CPA a clean, reconciled package, and most of them thank us for it.'],
  ['I am six months behind. Is that a problem?', 'It is the most common first call we get. Catch-up is billed per month behind, done oldest first, and you are current within three to five weeks.'],
  ['Who will I actually talk to?', 'One named bookkeeper who does your close every month, and a second who reviews it. You get both of their direct lines.'],
  ['What if my month is busier than my tier?', 'Nothing happens the first time. If it happens three months running, we suggest the next tier and you decide.'],
  ['Can I leave?', 'With 30 days notice, any time. Your file and every report are yours, exported in whatever format your next bookkeeper wants.'],
];

const HOURS = [
  ['Monday to Thursday', '8:30-5:00'],
  ['Friday', '8:30-3:00'],
  ['Close week (1st-10th)', 'Phones until 7:00'],
];

export default function TidyBooksPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f3ec',
        '--navy': '#1f2c47',
        '--coral': '#df5f3d',
        '--teal': '#3f8f86',
        '--butter': '#ecc55b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,navy,coral,teal,butter"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Public+Sans:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Tidy Books</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Bookkeeping, closed monthly</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550142210">(555) 014-2210</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The cover of the report: the promise on the left, the figures on
            the right, with this month's summary card laid on the charts. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Bookkeeping for small businesses, 18 Alder Row</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your books, closed and explained <em>by the 10th.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Every month we reconcile every account, chase what is owed to you
              and send a short report in plain English: what came in, what went
              out, and what to watch next month. One flat fee, set by how busy
              your accounts are.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free books review</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#report">See a sample report</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Businesses on the books</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>142</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Reports late since 2019</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>0</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Setup fee, any plan</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>$0</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroFigure}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,1,3" className={s.heroCharts} aria-hidden="true">
              <TabbiedPattern
                pattern={piechart}
                palette={CHARTS}
                fit="grid"
                cellSize={78}
                seed="tidy-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.summary}>
              <p data-edit="hero.summaryLabel" data-edit-max="240" data-edit-multiline className={s.summaryLabel}>Month-end summary</p>
              <p data-edit="hero.summaryTitle" data-edit-max="240" data-edit-multiline className={s.summaryTitle}>September 2026, Larkspur Bakery</p>
              <dl className={s.summaryList}>
                {SUMMARY.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`hero.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`hero.body4.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hero.summaryNote" data-edit-max="240" data-edit-multiline className={s.summaryNote}>Flour up 14% on August. Worth a call to the mill before the holiday orders.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- REPORT */}
        <section id="report" className={s.sec} aria-labelledby="report-h">
          <div className={s.secHead}>
            <p data-edit="report.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 1</p>
            <h2 data-edit="report.secTitle" data-edit-max="60" id="report-h" className={s.secTitle}>What lands in your inbox on the 10th</h2>
            <p data-edit="report.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Seven pages, the same seven every month, so you learn where to
              look. Page one is the only one most owners read, and it is
              written for them.
            </p>
          </div>

          <div className={s.reportGrid}>
            <ol className={s.contents}>
              {CONTENTS.map(([title, pageNo], i) => (
                <li key={title}>
                  <span data-edit={`report.contentsTitle.${i}`} data-edit-max="60" className={s.contentsTitle}>{title}</span>
                  <span data-edit={`report.contentsPage.${i}`} data-edit-max="60" className={s.contentsPage}>{pageNo}</span>
                </li>
              ))}
            </ol>

            <figure className={s.glance}>
              <figcaption data-edit="report.glanceTitle" data-edit-max="120" data-edit-multiline className={s.glanceTitle}>Page 1, September: where the money went</figcaption>
              <ul className={s.bars}>
                {SPEND.map((row, i) => (
                  <li key={row.label} className={s.barRow}>
                    <span data-edit={`report.barLabel.${i}`} data-edit-max="60" className={s.barLabel}>{row.label}</span>
                    <span data-edit={`report.barAmount.${i}`} data-edit-max="60" className={s.barAmount}>{row.amount}</span>
                    <span className={s.barTrack} aria-hidden="true">
                      <span className={`${s.barFill} ${s[row.tone]}`} style={{ width: `${row.pct * 2.4}%` }} />
                    </span>
                    <span data-edit={`report.barPct.${i}`} data-edit-max="60" className={s.barPct}>{row.share}</span>
                  </li>
                ))}
              </ul>
              <blockquote data-edit="report.plain" data-edit-max="240" data-edit-multiline className={s.plain}>
                A good month. Sales beat August by $3,900, mostly the new
                wholesale account. Wages held steady. Two invoices to the
                Corner Market are now 45 days old.
              </blockquote>
            </figure>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,0,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={piechart}
            palette={NIGHT}
            fit="grid"
            cellSize={56}
            seed="tidy-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- CLOSE */}
        <section id="close" className={s.close} aria-labelledby="close-h">
          <div className={s.closeInner}>
            <div className={s.closeHead}>
              <p data-edit="close.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 2</p>
              <h2 data-edit="close.closeTitle" data-edit-max="60" id="close-h" className={s.closeTitle}>The monthly close, ticked off day by day</h2>
              <p data-edit="close.closeLead" data-edit-max="240" data-edit-multiline className={s.closeLead}>
                The same checklist runs for every client, every month. You can
                see where yours is at any time in the shared folder.
              </p>
            </div>
            <ol className={s.checklist}>
              {CLOSE.map(([day, title, text], i) => (
                <li key={title} className={s.check}>
                  <span data-edit={`close.checkDay.${i}`} data-edit-max="60" className={s.checkDay}>{day}</span>
                  <h3 data-edit={`close.checkTitle.${i}`} data-edit-max="40" className={s.checkTitle}>{title}</h3>
                  <p data-edit={`close.checkText.${i}`} data-edit-max="240" data-edit-multiline className={s.checkText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- PRICING */}
        <section id="pricing" className={s.sec} aria-labelledby="pricing-h">
          <div className={s.secHead}>
            <p data-edit="pricing.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 3</p>
            <h2 data-edit="pricing.secTitle" data-edit-max="60" id="pricing-h" className={s.secTitle}>Priced by how busy your accounts are</h2>
            <p data-edit="pricing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A transaction is one line on a bank or card statement. A deposit
              of forty card sales is one line. We count an average month
              before we quote.
            </p>
          </div>

          <ul className={s.tiers}>
            {TIERS.map((t, i) => (
              <li key={t.name} className={t.pick ? `${s.tier} ${s.tierPick}` : s.tier}>
                {t.pick ? <p data-edit={`pricing.tierFlag.${i}`} data-edit-max="240" data-edit-multiline className={s.tierFlag}>Most clients</p> : null}
                <h3 data-edit={`pricing.tierName.${i}`} data-edit-max="40" className={s.tierName}>{t.name}</h3>
                <p data-edit={`pricing.tierRange.${i}`} data-edit-max="240" data-edit-multiline className={s.tierRange}>{t.range}</p>
                <p data-edit={`pricing.tierPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.tierPrice}>{t.price}</p>
                <p data-edit={`pricing.tierPer.${i}`} data-edit-max="240" data-edit-multiline className={s.tierPer}>a month, billed on the 1st</p>
                <p data-edit={`pricing.tierFits.${i}`} data-edit-max="240" data-edit-multiline className={s.tierFits}>{t.fits}</p>
                <ul className={s.tierItems}>
                  {t.items.map((item, i2) => (
                    <li data-edit={`pricing.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className={s.extras}>
            <div data-edit-pattern="pricing.field" data-edit-roles="transparent,3,1,4" className={s.extrasCharts} aria-hidden="true">
              <TabbiedPattern
                pattern={piechart}
                palette={WARM}
                fit="grid"
                cellSize={46}
                seed="tidy-extras"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.extrasBody}>
              <h3 data-edit="pricing.extrasTitle" data-edit-max="40" className={s.extrasTitle}>Add-ons, on any plan</h3>
              <dl className={s.extrasList}>
                {EXTRAS.map(([term, price], i) => (
                  <div key={term}>
                    <dt data-edit={`pricing.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`pricing.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqGrid}>
            <div>
              <p data-edit="faq.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 4</p>
              <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Questions owners ask first</h2>
            </div>
            <div className={s.faq}>
              {FAQ.map(([q, a], i) => (
                <details key={q} className={s.faqItem}>
                  <summary data-edit={`faq.faqQ.${i}`} data-edit-max="80" className={s.faqQ}>{q}</summary>
                  <p data-edit={`faq.faqA.${i}`} data-edit-max="240" data-edit-multiline className={s.faqA}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactInner}>
            <div className={s.contactText}>
              <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 5</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a free books review</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Send us one month of statements. We tell you which plan you
                would be on, what we would fix first, and how long a catch-up
                would take. Thirty minutes, on the phone or at our table.
              </p>
              <div className={s.visit}>
                <div>
                  <h3 data-edit="contact.visitTitle" data-edit-max="40" className={s.visitTitle}>Office</h3>
                  <p data-edit="contact.visitLine" data-edit-max="240" data-edit-multiline className={s.visitLine}>18 Alder Row, Suite 3</p>
                  <p data-edit="contact.visitLine2" data-edit-max="240" data-edit-multiline className={s.visitLine}>Brookhaven, OR 97405</p>
                </div>
                <div>
                  <h3 data-edit="contact.visitTitle2" data-edit-max="40" className={s.visitTitle}>Reach us</h3>
                  <p className={s.visitLine}>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550142210">(555) 014-2210</a>
                  </p>
                  <p className={s.visitLine}>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@tidybooks.example">hello@tidybooks.example</a>
                  </p>
                </div>
                <div className={s.visitWide}>
                  <h3 data-edit="contact.visitTitle3" data-edit-max="40" className={s.visitTitle}>Hours</h3>
                  <dl className={s.hours}>
                    {HOURS.map(([d, h], i) => (
                      <div key={d}>
                        <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                        <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="tb-name">Your name</label>
                <input id="tb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="tb-business">Business</label>
                <input id="tb-business" name="business" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="tb-email">Email</label>
                <input id="tb-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="tb-volume">Transactions a month, roughly</label>
                <select id="tb-volume" name="volume" defaultValue="unsure">
                  <option value="quiet">Up to 60</option>
                  <option value="steady">61-200</option>
                  <option value="busy">201-500</option>
                  <option value="more">More than 500</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="tb-note">Where are your books today?</label>
                <textarea id="tb-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a review</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We reply within one business day, from a person.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,0,4" className={s.footCharts} aria-hidden="true">
          <TabbiedPattern
            pattern={piechart}
            palette={NIGHT}
            fit="grid"
            cellSize={40}
            seed="tidy-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tidy Books</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            Tidy Books is a fictional business: the names, people, prices and
            address are invented, and nothing here is financial advice.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
