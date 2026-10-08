import { TabbiedPattern } from 'tabbied/react';
import { basse } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './keel-finance.module.css';

export const metadata = {
  title: 'Keel Finance: Fractional CFO for growing companies',
  description:
    'Keel Finance is a fractional CFO practice for companies between $3M and $40M in revenue: board packs, cash forecasts, fundraising models and interim cover, by the month or by the project.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Basse is the
   practice's chart: wide columns rising through counted levels, which is
   what a board deck is made of. It is the hero's chart, the section-break
   slide, and the strip over the footer. */
const PAPER = '#f5f6f3';
const INK = '#101935';
const SIGNAL = '#3b5bdb';
const CORAL = '#e8603c';
const LILAC = '#a9b4ea';

const CHART = ['transparent', INK, SIGNAL, LILAC, CORAL, SIGNAL];
const BREAK = ['transparent', SIGNAL, LILAC, INK, SIGNAL, CORAL];
const NIGHT = ['transparent', LILAC, SIGNAL, CORAL, PAPER, LILAC];

const NAV = [
  ['Metrics', '#metrics'],
  ['Engagements', '#models'],
  ['First 90 days', '#plan'],
  ['Clients', '#clients'],
  ['Questions', '#questions'],
];

type Metric = { label: string; unit: string; before: string; after: string; b: number; a: number; note: string };

/* Bar lengths are a share of each row's own scale. */
const METRICS: Metric[] = [
  { label: 'Month-end close', unit: 'working days to close the books', before: '19', after: '6', b: 95, a: 30, note: 'Bank feeds and reconciliations automated, one owner for every account.' },
  { label: 'Cash forecast accuracy', unit: 'percent, thirteen weeks out', before: '61%', after: '94%', b: 61, a: 94, note: 'A weekly forecast built from invoices and payroll, not from last year.' },
  { label: 'Runway you can see', unit: 'months of cash, modeled', before: '4', after: '18', b: 20, a: 90, note: 'Three scenarios the board agreed to, updated every month.' },
  { label: 'Board pack preparation', unit: 'founder hours a quarter', before: '42', after: '9', b: 93, a: 20, note: 'We write the pack. You read it the night before, like everyone else.' },
];

type Model = { name: string; price: string; per: string; fit: string; gets: string[]; term: string };

const MODELS: Model[] = [
  {
    name: 'Monthly retainer',
    price: '$7,500',
    per: 'a month, about three days',
    fit: 'For companies with a bookkeeper and no finance lead, from roughly $3M in revenue.',
    gets: ['Month-end close review and sign-off', 'A 13-week cash forecast, updated weekly', 'The board pack, written and presented', 'Budget and reforecast twice a year'],
    term: 'Three months to start, then rolling monthly',
  },
  {
    name: 'Interim CFO',
    price: '$2,100',
    per: 'a day, three to five days a week',
    fit: 'When your finance chief leaves, or before you hire the first one.',
    gets: ['Everything in the retainer, in person', 'Lender, auditor and investor meetings', 'Hiring and training your finance team', 'A written hand-over to your new hire'],
    term: 'Up to six months, ended on two weeks notice',
  },
  {
    name: 'Project',
    price: '$18,000',
    per: 'fixed fee, six to ten weeks',
    fit: 'For one hard thing at a time: a raise, a sale, a new system.',
    gets: ['Fundraising model and data room', 'Due diligence preparation', 'Accounting system migration', 'Pricing and unit economics review'],
    term: 'Half on signing, half on delivery',
  },
];

type Step = { weeks: string; task: string; detail: string; start: number; span: number };

const PLAN: Step[] = [
  { weeks: 'Weeks 1-2', task: 'Diagnose', detail: 'Read the books, interview the founders, list every question the board has asked twice.', start: 1, span: 2 },
  { weeks: 'Weeks 2-6', task: 'Fix the close', detail: 'Chart of accounts, reconciliations, a close calendar your bookkeeper can keep.', start: 2, span: 5 },
  { weeks: 'Weeks 5-9', task: 'Build the forecast', detail: 'Thirteen weeks of cash and a three-year model, on assumptions you can defend.', start: 5, span: 5 },
  { weeks: 'Weeks 8-12', task: 'First board pack', detail: 'Ten pages, the same ten every quarter: results, cash, risks, decisions needed.', start: 8, span: 5 },
  { weeks: 'Week 13', task: 'Review', detail: 'Keep going on the retainer, change the scope, or part with the files in order.', start: 13, span: 1 },
];

const WEEKS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

const CLIENTS = [
  ['Quillon Robotics', 'Warehouse automation', 'Series A', 'Raised $14M on a model built in five weeks'],
  ['Bellwood Dental Group', 'Nine clinics', '$22M revenue', 'Close cut from 23 days to 7'],
  ['Pell & Hart Coffee', 'Roaster and wholesale', 'Founder owned', 'Freed $1.1M of cash tied up in green beans'],
  ['Tallgrass Software', 'Scheduling for clinics', 'Seed', 'First audit passed with no adjustments'],
  ['Mainstay Marine Supply', 'Distribution', 'Family owned', 'Five months of interim cover through a sale'],
];

const FAQS = [
  ['How is this different from our accountant?', 'Your accountant looks back: tax returns, year-end, compliance. We look forward: cash, forecasts, the board and the next raise. We work well together, and we never replace them.'],
  ['Will you work with our bookkeeper?', 'Yes, and we would rather keep them. Most of the close fixes in the first month are about giving a good bookkeeper a calendar, a checklist and someone to ask.'],
  ['Do you sign off the accounts or run the audit?', 'No. We prepare you for the audit and sit in the meetings, but an outside firm signs the accounts. That separation is what makes them worth reading.'],
  ['What happens when we hire a full-time CFO?', 'We help you write the role, sit on the interview panel, and hand over a binder: every model, every process, every password. Most retainers end that way, and that is the point.'],
  ['Can you talk to our investors?', 'We present the numbers at board meetings and take the hard questions in a raise. The story is yours to tell; we make sure the arithmetic holds when someone checks it.'],
];

const HOURS = [
  ['Monday to Thursday', '8:00-6:00'],
  ['Friday', '8:00-3:00'],
  ['Board weeks', 'Whenever your board meets'],
];

export default function KeelFinancePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f6f3',
        '--ink': '#101935',
        '--signal': '#3b5bdb',
        '--coral': '#e8603c',
        '--lilac': '#a9b4ea',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,signal,coral,lilac"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Keel Finance</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="#contact">Book a first call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.deck}>
        {/* ------------------------------------------------ 01 TITLE SLIDE */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.slideBar}>
            <span data-edit="hero.slideNo" data-edit-max="60" className={s.slideNo}>01</span>
            <span data-edit="hero.slideLabel" data-edit-max="60" className={s.slideLabel}>Title</span>
            <span data-edit="hero.slideCo" data-edit-max="60" className={s.slideCo}>Fractional CFO for growing companies</span>
          </div>
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>A finance chief, three days a month</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Numbers your board <em>can act on.</em>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Keel Finance is the part-time CFO for companies between $3M and
                $40M in revenue: a close you can trust, a cash forecast that is
                right, and a board pack that answers the question before it is
                asked.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a first call</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#models">See the three ways to work</a>
              </div>
              <dl className={s.heroFacts}>
                <div>
                  <dt data-edit="hero.term" data-edit-max="28">Companies served</dt>
                  <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>41</dd>
                </div>
                <div>
                  <dt data-edit="hero.term2" data-edit-max="28">Raised on our models</dt>
                  <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>$212M</dd>
                </div>
                <div>
                  <dt data-edit="hero.term3" data-edit-max="28">Average engagement</dt>
                  <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>22 mo</dd>
                </div>
              </dl>
            </div>
            <div className={s.heroChart}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,4,3,2" className={s.heroField} aria-hidden="true">
                <TabbiedPattern
                  pattern={basse}
                  palette={CHART}
                  fit="grid"
                  cellSize={64}
                  seed="keel-hero"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.chartCard}>
                <p data-edit="hero.chartLabel" data-edit-max="240" data-edit-multiline className={s.chartLabel}>Median runway, months</p>
                <p data-edit="hero.chartFigure" data-edit-max="240" data-edit-multiline className={s.chartFigure}>7 to 19</p>
                <p data-edit="hero.chartNote" data-edit-max="240" data-edit-multiline className={s.chartNote}>Across our clients, two quarters in.</p>
              </div>
            </div>
          </div>
          <div className={s.slideFoot}>
            <span data-edit="hero.text" data-edit-max="60">Keel Finance, board pack</span>
            <span data-edit="hero.text2" data-edit-max="60">01 / 07</span>
          </div>
        </section>

        {/* ------------------------------------------------ 02 METRICS */}
        <section id="metrics" className={s.slide} aria-labelledby="metrics-h">
          <div className={s.slideBar}>
            <span data-edit="metrics.slideNo" data-edit-max="60" className={s.slideNo}>02</span>
            <span data-edit="metrics.slideLabel" data-edit-max="60" className={s.slideLabel}>Operating metrics</span>
            <span data-edit="metrics.slideCo" data-edit-max="60" className={s.slideCo}>Median of our clients</span>
          </div>
          <div className={s.slideHead}>
            <h2 data-edit="metrics.slideTitle" data-edit-max="60" id="metrics-h" className={s.slideTitle}>Four numbers we move first</h2>
            <p data-edit="metrics.slideNote" data-edit-max="240" data-edit-multiline className={s.slideNote}>
              Before Keel, and two quarters after, across the 41 companies we
              have worked with. Yours will start somewhere else; the direction
              will not.
            </p>
          </div>
          <ul className={s.metrics}>
            {METRICS.map((m, i) => (
              <li key={m.label} className={s.metric}>
                <div className={s.metricHead}>
                  <h3 data-edit={`metrics.metricLabel.${i}`} data-edit-max="40" className={s.metricLabel}>{m.label}</h3>
                  <p data-edit={`metrics.metricUnit.${i}`} data-edit-max="240" data-edit-multiline className={s.metricUnit}>{m.unit}</p>
                </div>
                <div className={s.bars}>
                  <span data-edit={`metrics.barKey.${i}`} data-edit-max="60" className={s.barKey}>Before</span>
                  <span className={s.track}>
                    <span className={s.barBefore} style={{ inlineSize: `${m.b}%` }} />
                  </span>
                  <span data-edit={`metrics.barValue.${i}`} data-edit-max="60" className={s.barValue}>{m.before}</span>
                  <span data-edit={`metrics.barKey2.${i}`} data-edit-max="60" className={s.barKey}>After</span>
                  <span className={s.track}>
                    <span className={s.barAfter} style={{ inlineSize: `${m.a}%` }} />
                  </span>
                  <span data-edit={`metrics.barValue2.${i}`} data-edit-max="60" className={s.barValue}>{m.after}</span>
                </div>
                <p data-edit={`metrics.metricNote.${i}`} data-edit-max="240" data-edit-multiline className={s.metricNote}>{m.note}</p>
              </li>
            ))}
          </ul>
          <div className={s.slideFoot}>
            <span data-edit="metrics.text" data-edit-max="60">Keel Finance, board pack</span>
            <span data-edit="metrics.text2" data-edit-max="60">02 / 07</span>
          </div>
        </section>

        {/* ------------------------------------------------ 03 MODELS */}
        <section id="models" className={s.slide} aria-labelledby="models-h">
          <div className={s.slideBar}>
            <span data-edit="models.slideNo" data-edit-max="60" className={s.slideNo}>03</span>
            <span data-edit="models.slideLabel" data-edit-max="60" className={s.slideLabel}>Engagement models</span>
            <span data-edit="models.slideCo" data-edit-max="60" className={s.slideCo}>Fees in US dollars</span>
          </div>
          <div className={s.slideHead}>
            <h2 data-edit="models.slideTitle" data-edit-max="60" id="models-h" className={s.slideTitle}>Three ways to work with us</h2>
            <p data-edit="models.slideNote" data-edit-max="240" data-edit-multiline className={s.slideNote}>
              Every engagement starts with a free hour on a call and a written
              scope. Nothing is billed by the hour, and nothing renews without
              asking you.
            </p>
          </div>
          <div className={s.models}>
            {MODELS.map((m, i) => (
              <article key={m.name} className={i === 0 ? `${s.model} ${s.modelPick}` : s.model}>
                <h3 data-edit={`model.modelName.${i}`} data-edit-max="40" className={s.modelName}>{m.name}</h3>
                <p data-edit={`model.modelPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.modelPrice}>{m.price}</p>
                <p data-edit={`model.modelPer.${i}`} data-edit-max="240" data-edit-multiline className={s.modelPer}>{m.per}</p>
                <p data-edit={`model.modelFit.${i}`} data-edit-max="240" data-edit-multiline className={s.modelFit}>{m.fit}</p>
                <ul className={s.modelGets}>
                  {m.gets.map((g, i2) => (
                    <li data-edit={`model.item.${i}.${i2}`} data-edit-max="80" key={g}>{g}</li>
                  ))}
                </ul>
                <p data-edit={`model.modelTerm.${i}`} data-edit-max="240" data-edit-multiline className={s.modelTerm}>{m.term}</p>
              </article>
            ))}
          </div>
          <div className={s.slideFoot}>
            <span data-edit="models.text" data-edit-max="60">Keel Finance, board pack</span>
            <span data-edit="models.text2" data-edit-max="60">03 / 07</span>
          </div>
        </section>

        {/* ------------------------------------------------ 04 PLAN */}
        <section id="plan" className={s.slide} aria-labelledby="plan-h">
          <div className={s.slideBar}>
            <span data-edit="plan.slideNo" data-edit-max="60" className={s.slideNo}>04</span>
            <span data-edit="plan.slideLabel" data-edit-max="60" className={s.slideLabel}>The first quarter</span>
            <span data-edit="plan.slideCo" data-edit-max="60" className={s.slideCo}>Thirteen weeks</span>
          </div>
          <div className={s.slideHead}>
            <h2 data-edit="plan.slideTitle" data-edit-max="60" id="plan-h" className={s.slideTitle}>Your first 90 days</h2>
            <p data-edit="plan.slideNote" data-edit-max="240" data-edit-multiline className={s.slideNote}>
              The same plan for every retainer, because the same things are
              broken in almost every growing company. By week twelve your board
              has a pack it has never had before.
            </p>
          </div>
          <div className={s.gantt}>
            <div className={s.ganttWeeks} aria-hidden="true">
              {WEEKS.map((w, i) => (
                <span data-edit={`plan.text.${i}`} data-edit-max="60" key={w}>{w}</span>
              ))}
            </div>
            <ol className={s.ganttRows}>
              {PLAN.map((p, i) => (
                <li key={p.task} className={s.ganttRow}>
                  <div className={s.ganttText}>
                    <h3 data-edit={`plan.ganttTask.${i}`} data-edit-max="40" className={s.ganttTask}>{p.task}</h3>
                    <p data-edit={`plan.ganttWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.ganttWhen}>{p.weeks}</p>
                    <p data-edit={`plan.ganttDetail.${i}`} data-edit-max="240" data-edit-multiline className={s.ganttDetail}>{p.detail}</p>
                  </div>
                  <div className={s.ganttTrack} aria-hidden="true">
                    <span className={s.ganttBar} style={{ gridColumn: `${p.start} / span ${p.span}` }} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={s.slideFoot}>
            <span data-edit="plan.text2" data-edit-max="60">Keel Finance, board pack</span>
            <span data-edit="plan.text3" data-edit-max="60">04 / 07</span>
          </div>
        </section>

        {/* ------------------------------------------------ SECTION BREAK */}
        <div className={s.breakSlide}>
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,1,2,3" className={s.breakField} aria-hidden="true">
            <TabbiedPattern
              pattern={basse}
              palette={BREAK}
              fit="grid"
              cellSize={52}
              seed="keel-break"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.breakCard}>
            <p data-edit="top.breakNo" data-edit-max="240" data-edit-multiline className={s.breakNo}>Part two</p>
            <p data-edit="top.breakTitle" data-edit-max="240" data-edit-multiline className={s.breakTitle}>Who we work for, and what they ask</p>
          </div>
        </div>

        {/* ------------------------------------------------ 05 CLIENTS */}
        <section id="clients" className={s.slide} aria-labelledby="clients-h">
          <div className={s.slideBar}>
            <span data-edit="clients.slideNo" data-edit-max="60" className={s.slideNo}>05</span>
            <span data-edit="clients.slideLabel" data-edit-max="60" className={s.slideLabel}>Selected clients</span>
            <span data-edit="clients.slideCo" data-edit-max="60" className={s.slideCo}>Shared with permission</span>
          </div>
          <div className={s.slideHead}>
            <h2 data-edit="clients.slideTitle" data-edit-max="60" id="clients-h" className={s.slideTitle}>A short client list</h2>
            <p data-edit="clients.slideNote" data-edit-max="240" data-edit-multiline className={s.slideNote}>
              Five of the eleven companies on retainer today, from a seed-stage
              software start-up to a distributor in its third generation.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.clients}>
              <caption data-edit="clients.srOnly" className={s.srOnly}>Selected Keel Finance clients</caption>
              <thead>
                <tr>
                  <th data-edit="clients.heading" scope="col">Company</th>
                  <th data-edit="clients.heading2" scope="col">What they do</th>
                  <th data-edit="clients.heading3" scope="col">Stage</th>
                  <th data-edit="clients.heading4" scope="col">What changed</th>
                </tr>
              </thead>
              <tbody>
                {CLIENTS.map(([name, sector, stage, result], i) => (
                  <tr key={name}>
                    <th data-edit={`clients.heading5.${i}`} scope="row">{name}</th>
                    <td data-edit={`clients.cell.${i}`}>{sector}</td>
                    <td data-edit={`clients.cell2.${i}`}>{stage}</td>
                    <td data-edit={`clients.cell3.${i}`}>{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.slideFoot}>
            <span data-edit="clients.text" data-edit-max="60">Keel Finance, board pack</span>
            <span data-edit="clients.text2" data-edit-max="60">05 / 07</span>
          </div>
        </section>

        {/* ------------------------------------------------ 06 QUESTIONS */}
        <section id="questions" className={s.slide} aria-labelledby="questions-h">
          <div className={s.slideBar}>
            <span data-edit="questions.slideNo" data-edit-max="60" className={s.slideNo}>06</span>
            <span data-edit="questions.slideLabel" data-edit-max="60" className={s.slideLabel}>Appendix</span>
            <span data-edit="questions.slideCo" data-edit-max="60" className={s.slideCo}>Questions founders ask</span>
          </div>
          <div className={s.faqGrid}>
            <h2 data-edit="questions.slideTitle" data-edit-max="60" id="questions-h" className={s.slideTitle}>Before you ask</h2>
            <div className={s.faqs}>
              {FAQS.map(([q, a], i) => (
                <details key={q} className={s.faq}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className={s.slideFoot}>
            <span data-edit="questions.text" data-edit-max="60">Keel Finance, board pack</span>
            <span data-edit="questions.text2" data-edit-max="60">06 / 07</span>
          </div>
        </section>

        {/* ------------------------------------------------ 07 CONTACT */}
        <section id="contact" className={`${s.slide} ${s.contactSlide}`} aria-labelledby="contact-h">
          <div className={s.slideBar}>
            <span data-edit="contact.slideNo" data-edit-max="60" className={s.slideNo}>07</span>
            <span data-edit="contact.slideLabel" data-edit-max="60" className={s.slideLabel}>Next steps</span>
            <span data-edit="contact.slideCo" data-edit-max="60" className={s.slideCo}>Decision needed</span>
          </div>
          <div className={s.contactGrid}>
            <div>
              <h2 data-edit="contact.slideTitle" data-edit-max="60" id="contact-h" className={s.slideTitle}>Book a first call</h2>
              <p data-edit="contact.slideNote" data-edit-max="240" data-edit-multiline className={s.slideNote}>
                An hour, free, with the partner who would do the work. Bring
                last month's accounts if you have them; we will tell you what
                we see.
              </p>
              <dl className={s.office}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Suite 4, 88 Tillman Row, Harborview</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="tel:+15550142260">(555) 014-2260</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="mailto:partners@keelfinance.example">partners@keelfinance.example</a></dd>
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
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="kf-name">Your name</label>
                <input id="kf-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="kf-company">Company</label>
                <input id="kf-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="kf-email">Email</label>
                <input id="kf-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="kf-revenue">Annual revenue</label>
                <select id="kf-revenue" name="revenue" defaultValue="">
                  <option value="" disabled>Choose a range</option>
                  <option>Under $3M</option>
                  <option>$3M to $10M</option>
                  <option>$10M to $40M</option>
                  <option>Over $40M</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="kf-note">What is on the board's mind</label>
                <textarea id="kf-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>A partner replies within one working day. We sign your NDA before you send a number.</p>
            </form>
          </div>
          <div className={s.slideFoot}>
            <span data-edit="contact.text" data-edit-max="60">Keel Finance, board pack</span>
            <span data-edit="contact.text2" data-edit-max="60">07 / 07</span>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2,3,0,4" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={basse}
            palette={NIGHT}
            fit="grid"
            cellSize={40}
            seed="keel-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Keel Finance</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional fractional CFO practice. The partners, clients, figures, fees and address are invented, and nothing here is financial advice.</p>
          <p>Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
        </div>
      </footer>
    </div>
  );
}
