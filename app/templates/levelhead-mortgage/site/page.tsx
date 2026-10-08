import { TabbiedPattern } from 'tabbied/react';
import { fulcrum } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './levelhead-mortgage.module.css';

export const metadata = {
  title: 'Levelhead Mortgage: Independent mortgage broker, Quarry Lane',
  description:
    'Levelhead is an independent mortgage broker. We publish our rate sheet every week, compare nine lenders for every loan, and walk you from pre-approval to the keys with one worked example of what you can afford.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Fulcrum is the
   firm's mark: wedges that tip further the further they stand from the
   balance point. It fills the hero panel on slate, it is the fulcrum under
   the affordability beam, and it runs along the foot of the page. */
const STONE = '#eeefe9';
const SLATE = '#1d2a33';
const BRASS = '#b98a2e';
const TEAL = '#2f6b66';
const CLAY = '#b0532f';

const ON_SLATE = ['transparent', BRASS, STONE, TEAL, CLAY, STONE];
const ON_STONE = ['transparent', SLATE, BRASS, TEAL, CLAY, SLATE];
const FOOT = ['transparent', BRASS, TEAL, STONE, CLAY, BRASS];

const NAV = [
  ['Rate sheet', '#rates'],
  ['Pre-approval to keys', '#path'],
  ['What you can afford', '#afford'],
  ['Lenders', '#lenders'],
  ['Questions', '#questions'],
  ['Contact', '#contact'],
];

type Rate = { product: string; rate: string; apr: string; points: string; per100: string; lock: string };

const RATES: Rate[] = [
  { product: '30-year fixed', rate: '6.125%', apr: '6.241%', points: '0.50', per100: '$608', lock: '45 days' },
  { product: '20-year fixed', rate: '5.990%', apr: '6.118%', points: '0.50', per100: '$716', lock: '45 days' },
  { product: '15-year fixed', rate: '5.500%', apr: '5.672%', points: '0.25', per100: '$817', lock: '45 days' },
  { product: '7/6 ARM, 30 years', rate: '5.750%', apr: '6.402%', points: '0.25', per100: '$584', lock: '45 days' },
  { product: 'FHA 30-year fixed', rate: '5.875%', apr: '6.810%', points: '0.00', per100: '$592', lock: '45 days' },
  { product: 'VA 30-year fixed', rate: '5.625%', apr: '5.899%', points: '0.00', per100: '$576', lock: '45 days' },
  { product: 'Jumbo 30-year fixed', rate: '6.375%', apr: '6.433%', points: '0.50', per100: '$624', lock: '60 days' },
];

type Step = { when: string; title: string; text: string; bring: string };

const STEPS: Step[] = [
  { when: 'Day 1', title: 'A thirty-minute call', text: 'What you earn, what you owe, what you have saved, and what kind of house. We tell you the honest price range before anyone pulls your credit.', bring: 'Nothing yet. A rough idea of your monthly debts.' },
  { when: 'Days 2-3', title: 'Pre-approval letter', text: 'We run one credit check, read your documents properly, and send a letter a seller will take seriously, with the price your offer can go to.', bring: 'Two pay stubs, two years of W-2s, two bank statements, ID.' },
  { when: 'Weeks', title: 'You go shopping', text: 'We refresh the letter for each offer so it shows that house and that price, often within the hour, evenings included.', bring: 'The listing link when you are about to offer.' },
  { when: 'Contract day', title: 'Application and lock', text: 'Your offer is accepted. We send the file to the lender we chose together and lock the rate in writing. You get a Loan Estimate within three days.', bring: 'The signed purchase contract and the earnest money receipt.' },
  { when: 'Days 7-25', title: 'Appraisal and underwriting', text: 'The appraiser values the house and an underwriter checks everything again. We answer their conditions the day they arrive so the file never sits.', bring: 'Updated statements, and a letter for any large deposit.' },
  { when: '3 days before', title: 'Closing Disclosure', text: 'The final figures, line by line. We go through it with you on the phone and compare it with the Loan Estimate before you sign anything.', bring: 'Questions. There are always some.' },
  { when: 'Closing day', title: 'Keys', text: 'You sign at the title office, the money moves, and the keys are yours. We stay your broker for the life of the loan, including the refinance.', bring: 'Photo ID and the cashier\'s check for cash to close.' },
];

const LEDGER = [
  ['Price of the house', '$385,000'],
  ['Down payment, 10 percent', '$38,500'],
  ['Loan amount', '$346,500'],
  ['Principal and interest, 6.25% over 30 years', '$2,133'],
  ['Property tax, 1.2% a year', '$385'],
  ['Home insurance', '$140'],
  ['Mortgage insurance until 20% equity', '$116'],
];

const CASH = [
  ['Down payment', '$38,500'],
  ['Closing costs, about 2.4%', '$9,200'],
  ['Seller credit we negotiated', '-$3,000'],
];

type Lender = { name: string; kind: string; best: string; rate: string; fees: string; days: string };

const LENDERS: Lender[] = [
  { name: 'Quarry Valley Credit Union', kind: 'Credit union', best: 'First-time buyers, low fees', rate: '6.125%', fees: '$1,150', days: '28' },
  { name: 'Northgate National', kind: 'National bank', best: 'Jumbo loans, relationship pricing', rate: '6.250%', fees: '$1,495', days: '32' },
  { name: 'Cobble Street Bank', kind: 'Community bank', best: 'Self-employed, two years of returns', rate: '6.375%', fees: '$995', days: '30' },
  { name: 'Linden Home Lending', kind: 'Wholesale lender', best: 'Fast closings, FHA and VA', rate: '6.000%', fees: '$1,690', days: '21' },
  { name: 'Halfmoon Mortgage Co.', kind: 'Wholesale lender', best: 'Condos and townhouses', rate: '6.125%', fees: '$1,320', days: '25' },
  { name: 'Ridgeback Portfolio', kind: 'Portfolio lender', best: 'Unusual houses, rural acreage', rate: '6.625%', fees: '$1,850', days: '35' },
];

const QUESTIONS = [
  ['Does a broker cost more than going to my bank?', 'Usually less. We are paid by the lender you choose, 1.25 percent of the loan, capped at $6,000, and the law says it cannot change with your rate. It appears on page 2 of your Loan Estimate, the same line your bank would fill.'],
  ['Will you pull my credit more than once?', 'Once, at pre-approval. We shop the lenders on that one report. Several mortgage checks inside 45 days count as one for your score anyway.'],
  ['What credit score do I need?', 'Conventional loans start at 620, FHA at 580. Every 20 points above 680 usually takes something off the rate, and we will say whether waiting three months to improve it is worth it.'],
  ['Is the rate on your sheet the rate I get?', 'It is the rate for the scenario printed above it. Your rate depends on your score, down payment, the property and the day you lock. We quote yours in writing before you commit.'],
  ['Can you help if I am self-employed?', 'Yes. Two years of tax returns is the usual rule, and two of our lenders will use twelve months of bank statements instead.'],
];

const HOURS = [
  ['Monday to Friday', '8:30-6:00'],
  ['Tuesday and Thursday evenings', 'Calls until 8:00'],
  ['Saturday', '10:00-1:00'],
];

export default function LevelheadMortgagePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stone': '#eeefe9',
        '--slate': '#1d2a33',
        '--brass': '#b98a2e',
        '--teal': '#2f6b66',
        '--clay': '#b0532f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stone,slate,brass,teal,clay"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&family=DM+Mono&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Levelhead</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Mortgage</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550142200">(555) 014-2200</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: the panel is the balance point; the wedges tip away from it. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Independent mortgage broker, NMLS 2049117</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              A mortgage, weighed <em>level.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We compare nine lenders for every loan, publish our rates every
              Tuesday, and show you the arithmetic before you sign. Buying your
              first house or your fourth, the numbers should make sense to you
              before they make sense to a lender.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#contact">Start a pre-approval</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#rates">Read this week&apos;s rates</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="intro.term" data-edit-max="28">Lenders compared</dt>
                <dd data-edit="intro.body" data-edit-max="200" data-edit-multiline>9</dd>
              </div>
              <div>
                <dt data-edit="intro.term2" data-edit-max="28">Pre-approval</dt>
                <dd data-edit="intro.body2" data-edit-max="200" data-edit-multiline>48 hours</dd>
              </div>
              <div>
                <dt data-edit="intro.term3" data-edit-max="28">Average close</dt>
                <dd data-edit="intro.body3" data-edit-max="200" data-edit-multiline>27 days</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroPanel}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,0,3,4,0" className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={fulcrum}
                palette={ON_SLATE}
                fit="grid"
                cellSize={58}
                seed="levelhead-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.ticket}>
              <p data-edit="intro.ticketLabel" data-edit-max="240" data-edit-multiline className={s.ticketLabel}>Best 30-year fixed this week</p>
              <p data-edit="intro.ticketRate" data-edit-max="240" data-edit-multiline className={s.ticketRate}>6.125%</p>
              <p data-edit="intro.ticketApr" data-edit-max="240" data-edit-multiline className={s.ticketApr}>APR 6.241%, 0.50 points</p>
              <p data-edit="intro.ticketNote" data-edit-max="240" data-edit-multiline className={s.ticketNote}>Week of 5 October 2026, from the sheet below.</p>
            </div>
          </div>
        </section>

        {/* RATE SHEET: printed like the paper a broker pins to the wall. */}
        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.secHead}>
            <h2 data-edit="rates.secTitle" data-edit-max="60" id="rates-h" className={s.secTitle}>This week&apos;s rate sheet</h2>
            <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Published every Tuesday at 9:00. Rates move daily; a rate is only
              yours once it is locked in writing.
            </p>
          </div>

          <div className={s.sheet}>
            <div className={s.sheetHead}>
              <div>
                <p data-edit="rates.sheetNo" data-edit-max="240" data-edit-multiline className={s.sheetNo}>Sheet 41</p>
                <p data-edit="rates.sheetDate" data-edit-max="240" data-edit-multiline className={s.sheetDate}>Week of 5 October 2026</p>
              </div>
              <dl className={s.scenario}>
                <div>
                  <dt data-edit="rates.term" data-edit-max="28">Purchase</dt>
                  <dd data-edit="rates.body" data-edit-max="200" data-edit-multiline>$400,000</dd>
                </div>
                <div>
                  <dt data-edit="rates.term2" data-edit-max="28">Down</dt>
                  <dd data-edit="rates.body2" data-edit-max="200" data-edit-multiline>20%</dd>
                </div>
                <div>
                  <dt data-edit="rates.term3" data-edit-max="28">Credit score</dt>
                  <dd data-edit="rates.body3" data-edit-max="200" data-edit-multiline>760</dd>
                </div>
                <div>
                  <dt data-edit="rates.term4" data-edit-max="28">Property</dt>
                  <dd data-edit="rates.body4" data-edit-max="200" data-edit-multiline>Single-family, owner-occupied</dd>
                </div>
              </dl>
            </div>
            <div className={s.tableWrap}>
              <table className={s.rates}>
                <caption data-edit="rates.srOnly" className={s.srOnly}>Mortgage rates for the scenario above</caption>
                <thead>
                  <tr>
                    <th data-edit="rates.heading" scope="col">Loan</th>
                    <th data-edit="rates.heading2" scope="col">Rate</th>
                    <th data-edit="rates.heading3" scope="col">APR</th>
                    <th data-edit="rates.heading4" scope="col">Points</th>
                    <th data-edit="rates.heading5" scope="col">Per $100k a month</th>
                    <th data-edit="rates.heading6" scope="col">Lock</th>
                  </tr>
                </thead>
                <tbody>
                  {RATES.map((r, i) => (
                    <tr key={r.product}>
                      <th data-edit={`rates.heading7.${i}`} scope="row">{r.product}</th>
                      <td data-edit={`rates.num.${i}`} className={s.num}>{r.rate}</td>
                      <td data-edit={`rates.num2.${i}`} className={s.num}>{r.apr}</td>
                      <td data-edit={`rates.num3.${i}`} className={s.num}>{r.points}</td>
                      <td data-edit={`rates.num4.${i}`} className={s.num}>{r.per100}</td>
                      <td data-edit={`rates.cell.${i}`}>{r.lock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p data-edit="rates.sheetFoot" data-edit-max="240" data-edit-multiline className={s.sheetFoot}>
              Monthly figures are principal and interest only. One point is 1
              percent of the loan, paid at closing to lower the rate. FHA and VA
              rows assume 3.5 and 0 percent down.
            </p>
          </div>
        </section>

        {/* PATH: from the first call to the keys, on the dark band. */}
        <section id="path" className={s.path} aria-labelledby="path-h">
          <div className={s.pathInner}>
            <div className={s.pathHead}>
              <h2 data-edit="path.title" data-edit-max="60" id="path-h" className={s.pathTitle}>From pre-approval<br />to keys</h2>
              <p data-edit="path.pathNote" data-edit-max="240" data-edit-multiline className={s.pathNote}>
                Seven stages, usually five to eight weeks from the first call. What
                happens at each, and what we will ask you for.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map((st, i) => (
                <li key={st.title} className={s.step}>
                  <span className={s.stepNo}>{i + 1}</span>
                  <p data-edit={`path.stepWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.stepWhen}>{st.when}</p>
                  <h3 data-edit={`path.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{st.title}</h3>
                  <p data-edit={`path.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{st.text}</p>
                  <p data-edit={`path.stepBring.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBring}>{st.bring}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* AFFORD: one household, worked through, on a balance beam. */}
        <section id="afford" className={s.sec} aria-labelledby="afford-h">
          <div className={s.secHead}>
            <h2 data-edit="afford.secTitle" data-edit-max="60" id="afford-h" className={s.secTitle}>What can you afford? One worked example</h2>
            <p data-edit="afford.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The Alvarez household: two incomes, one car loan, ten percent saved.
              Lenders weigh the monthly cost of the house against what comes in.
            </p>
          </div>

          <div className={s.afford}>
            <div className={s.balance}>
              <div className={s.pans}>
                <div className={s.pan}>
                  <p data-edit="afford.panLabel" data-edit-max="240" data-edit-multiline className={s.panLabel}>Comes in each month</p>
                  <p data-edit="afford.panFigure" data-edit-max="240" data-edit-multiline className={s.panFigure}>$9,400</p>
                  <p data-edit="afford.panNote" data-edit-max="240" data-edit-multiline className={s.panNote}>Gross pay, both salaries</p>
                </div>
                <div className={s.pan}>
                  <p data-edit="afford.panLabel2" data-edit-max="240" data-edit-multiline className={s.panLabel}>Goes out each month</p>
                  <p data-edit="afford.panFigure2" data-edit-max="240" data-edit-multiline className={s.panFigure}>$3,294</p>
                  <p data-edit="afford.panNote2" data-edit-max="240" data-edit-multiline className={s.panNote}>House $2,774 plus car $520</p>
                </div>
              </div>
              <div className={s.beam} aria-hidden="true" />
              <div data-edit-pattern="afford.field" data-edit-roles="transparent,1,2,3,4,1" className={s.fulcrumField} aria-hidden="true">
                <TabbiedPattern
                  pattern={fulcrum}
                  palette={ON_STONE}
                  fit="grid"
                  cellSize={32}
                  seed="levelhead-beam"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.ratios}>
                <p className={s.ratio}>
                  <strong data-edit="afford.emphasis">29.5%</strong>
                  <span data-edit="afford.text" data-edit-max="60">Housing to income. The guide is 28 to 31.</span>
                </p>
                <p className={s.ratio}>
                  <strong data-edit="afford.emphasis2">35.0%</strong>
                  <span data-edit="afford.text2" data-edit-max="60">All debts to income. Most lenders allow up to 45.</span>
                </p>
              </div>
            </div>

            <div className={s.ledgerWrap}>
              <h3 data-edit="afford.ledgerTitle" data-edit-max="40" className={s.ledgerTitle}>The monthly payment</h3>
              <dl className={s.ledger}>
                {LEDGER.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`afford.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`afford.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
                <div className={s.ledgerTotal}>
                  <dt data-edit="afford.term2" data-edit-max="28">Total a month, the figure lenders use</dt>
                  <dd data-edit="afford.body2" data-edit-max="200" data-edit-multiline>$2,774</dd>
                </div>
              </dl>
              <h3 data-edit="afford.ledgerTitle2" data-edit-max="40" className={s.ledgerTitle}>Cash to close</h3>
              <dl className={s.ledger}>
                {CASH.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`afford.term3.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`afford.body3.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
                <div className={s.ledgerTotal}>
                  <dt data-edit="afford.term4" data-edit-max="28">Brought to the title office</dt>
                  <dd data-edit="afford.body4" data-edit-max="200" data-edit-multiline>$44,700</dd>
                </div>
              </dl>
              <p data-edit="afford.ledgerNote" data-edit-max="240" data-edit-multiline className={s.ledgerNote}>
                Our advice to them: approved to $430,000, comfortable at $385,000.
                The gap is the rest of their life.
              </p>
            </div>
          </div>
        </section>

        {/* LENDERS: the nine we work with, six shown with today's numbers. */}
        <section id="lenders" className={s.sec} aria-labelledby="lenders-h">
          <div className={s.secHead}>
            <h2 data-edit="lenders.secTitle" data-edit-max="60" id="lenders-h" className={s.secTitle}>The lenders, compared</h2>
            <p data-edit="lenders.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six of the nine lenders we place loans with, priced for the
              Alvarez file above on the morning of 6 October.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.lenders}>
              <caption data-edit="lenders.srOnly" className={s.srOnly}>Lenders compared for one loan</caption>
              <thead>
                <tr>
                  <th data-edit="lenders.heading" scope="col">Lender</th>
                  <th data-edit="lenders.heading2" scope="col">Kind</th>
                  <th data-edit="lenders.heading3" scope="col">Best for</th>
                  <th data-edit="lenders.heading4" scope="col">30-year rate</th>
                  <th data-edit="lenders.heading5" scope="col">Lender fees</th>
                  <th data-edit="lenders.heading6" scope="col">Days to close</th>
                </tr>
              </thead>
              <tbody>
                {LENDERS.map((l, i) => (
                  <tr key={l.name}>
                    <th data-edit={`lenders.heading7.${i}`} scope="row">{l.name}</th>
                    <td data-edit={`lenders.cell.${i}`}>{l.kind}</td>
                    <td data-edit={`lenders.cell2.${i}`}>{l.best}</td>
                    <td data-edit={`lenders.num.${i}`} className={s.num}>{l.rate}</td>
                    <td data-edit={`lenders.num2.${i}`} className={s.num}>{l.fees}</td>
                    <td data-edit={`lenders.num3.${i}`} className={s.num}>{l.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.paid}>
            <h3 data-edit="lenders.paidTitle" data-edit-max="40" className={s.paidTitle}>How we are paid</h3>
            <p data-edit="lenders.paidText" data-edit-max="240" data-edit-multiline className={s.paidText}>
              The lender you choose pays us 1.25 percent of the loan, capped at
              $6,000. It is the same at every lender on this list, it cannot
              change with your rate, and it is printed on your Loan Estimate.
              You never write us a check.
            </p>
          </div>
        </section>

        {/* QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.qaGrid}>
            <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Questions we hear every week</h2>
            <div className={s.qa}>
              {QUESTIONS.map(([q, a], i) => (
                <details key={q} className={s.q}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Start with a call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Thirty minutes, no credit check, and an honest price range at the
                end of it. Or send the form and we will call you within a
                working day.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>48 Quarry Lane, Suite 3, Millbrook</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550142200">(555) 014-2200</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@levelheadmortgage.example">hello@levelheadmortgage.example</a>
                  </dd>
                </div>
              </dl>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="lh-name">Name</label>
                <input id="lh-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="lh-phone">Phone</label>
                <input id="lh-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label3" htmlFor="lh-email">Email</label>
                <input id="lh-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="lh-goal">I want to</label>
                <select id="lh-goal" name="goal" defaultValue="buy">
                  <option value="buy">Buy a home</option>
                  <option value="refinance">Refinance</option>
                  <option value="cash-out">Take cash out</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="lh-price">Price range</label>
                <input id="lh-price" name="price" type="text" inputMode="numeric" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label6" htmlFor="lh-note">Anything we should know</label>
                <textarea id="lh-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>No credit check until you say so.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,0,4,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={fulcrum}
            palette={FOOT}
            fit="grid"
            cellSize={40}
            seed="levelhead-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Levelhead Mortgage</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional mortgage broker. The people, lenders, rates, license
            number and address are invented, and nothing here is financial
            advice.
          </p>
          <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>Equal housing opportunity.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
