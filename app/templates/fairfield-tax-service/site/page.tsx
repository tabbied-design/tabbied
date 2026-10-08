import { TabbiedPattern } from 'tabbied/react';
import { trigram } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './fairfield-tax-service.module.css';

export const metadata = {
  title: 'Fairfield Tax Service: Walk-in tax preparation on Commerce Row',
  description:
    'Fairfield Tax Service is a storefront tax office open all season. Walk in with your paperwork, get a flat fee before we start, and leave with your return e-filed.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The trigram is
   the office's tally board: three strokes to a cell, standing, lying and
   leaning, like the marks on the back room wall that count every return
   filed this season. It fills the shop window in the hero, runs as a band
   under the fee board, and edges the footer. */
const PAPER = '#f3f0e6';
const GREEN = '#1d3f33';
const RED = '#c8442c';
const GOLD = '#e0a630';
const SAGE = '#3f7f6a';

const WINDOW = ['transparent', GREEN, RED, SAGE, GOLD];
const BAND = ['transparent', PAPER, GOLD, SAGE, RED];
const EDGE = ['transparent', GREEN, SAGE, RED, GREEN];

const NAV = [
  ['What to bring', '#bring'],
  ['Fees', '#fees'],
  ['Walk-in hours', '#hours'],
  ['This season', '#tally'],
  ['Questions', '#questions'],
  ['Visit', '#visit'],
];

type Group = { title: string; note: string; items: string[] };

/* The checklist on the shop door, grouped the way the preparer asks. */
const BRING: Group[] = [
  {
    title: 'Who you are',
    note: 'For everyone on the return',
    items: [
      'Photo ID for you and your spouse',
      'Social Security cards or ITIN letters, dependents included',
      'Last year\'s return, federal and state',
      'A voided check for a direct-deposit refund',
    ],
  },
  {
    title: 'What you earned',
    note: 'Every form that came in the mail',
    items: [
      'W-2 from each employer',
      '1099-NEC and 1099-K for side work and app payments',
      '1099-INT and 1099-DIV from banks and brokers',
      'SSA-1099 for Social Security, 1099-R for pensions',
      '1099-G for unemployment or a state refund',
    ],
  },
  {
    title: 'What you paid',
    note: 'These can lower the bill',
    items: [
      '1098 mortgage interest statement',
      'Property tax bill, paid receipts',
      'Childcare costs and the provider\'s tax ID',
      '1098-T tuition and 1098-E student loan interest',
      'Receipts for gifts to charity over $250',
    ],
  },
  {
    title: 'If it applies',
    note: 'Ask us if you are not sure',
    items: [
      '1095-A if you bought marketplace health cover',
      'Business income and expenses, totaled by month',
      'Rent collected and repairs paid on a rental',
      'Estimated tax payments, with the dates',
      'Any letter from the IRS or the state',
    ],
  },
];

/* The fee board: flat prices by return type, quoted before we start. */
const FEES = [
  ['Form 1040, W-2 income, standard deduction', '$120'],
  ['Form 1040 with itemized deductions', '$195'],
  ['Self-employed or gig work, Schedule C', '$260'],
  ['Each rental property, Schedule E', '+ $95'],
  ['State return, resident or part-year', '$55'],
  ['Amended or prior-year return', '$150'],
  ['Extension, filed the same day', '$40'],
  ['Answering an IRS letter about a return we filed', 'Free'],
];

const HOURS = [
  ['Monday to Friday', '9:00 to 7:00'],
  ['Saturday', '9:00 to 5:00'],
  ['Sunday, March and April', '12:00 to 4:00'],
  ['April 15', '8:00 until the last return is in'],
];

const DATES = [
  ['Jan 26', 'The IRS starts taking returns'],
  ['Jan 31', 'Employers send W-2s and 1099s'],
  ['Feb 27', 'First refunds with family credits arrive'],
  ['Apr 15', 'Filing deadline, and last day to extend'],
  ['Oct 15', 'Extended returns are due'],
];

const TALLY = [
  ['1,284', 'returns filed since January 26'],
  ['96%', 'sent to the IRS electronically, same day'],
  ['11 days', 'average wait for an e-filed refund'],
  ['18 min', 'average walk-in wait before 11 am'],
];

const PREPARERS = [
  ['Dolores Fairfield, EA', 'Enrolled agent, founded the office in 1994. Takes the small business and rental returns.'],
  ['Marcus Bell', 'Registered preparer, nine seasons. Families, students and anyone with a 1099-K.'],
  ['Ana Ruiz', 'Registered preparer, bilingual in English and Spanish. Retirees and amended returns.'],
];

const RETURN_TYPES = [
  ['w2', 'W-2 only'],
  ['itemized', 'Itemized'],
  ['business', 'Self-employed'],
  ['rental', 'Rental'],
  ['amended', 'Amended'],
];

const FAQ = [
  ['Do I need an appointment?', 'No. From late January to April 15 we take walk-ins all day. If you would rather not wait, book a sit-down slot by phone, or drop your papers off and collect the return two days later.'],
  ['How do I know the price before you start?', 'We look through your paperwork with you at the counter, circle the lines on the fee board that apply, and write the total on your folder. That is the price, however long it takes us.'],
  ['Can you take the fee out of my refund?', 'Yes, for a $25 bank charge, which we tell you about first. Most people pay at the counter by card or cash and keep the whole refund.'],
  ['What if the IRS writes to me?', 'Bring the letter in. If it is about a return we prepared, answering it is free, and if we made the mistake we pay any penalty and interest.'],
  ['Do you work after April?', 'Yes, on Tuesdays and Thursdays by appointment: extensions, amended returns, estimated payments and letters.'],
];

export default function FairfieldTaxServicePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f3f0e6',
        '--green': '#1d3f33',
        '--red': '#c8442c',
        '--gold': '#e0a630',
        '--sage': '#3f7f6a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,green,red,gold,sage"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Public+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Courier+Prime:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Fairfield</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Tax Service, since 1994</span>
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
        {/* ------------------------------------------------------------ HERO
            The shop front: an awning over a window of tally marks, with the
            counter sign hung inside the glass. */}
        <section id="welcome" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="welcome.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Storefront tax office, 88 Commerce Row</p>
            <h1 data-edit="welcome.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Bring the shoebox. <span>We file the rest.</span>
            </h1>
            <p data-edit="welcome.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Walk in with your W-2s, the 1099s and the envelope of receipts.
              We sort it at the counter, tell you the flat fee before we start,
              and e-file while you wait or by the next morning.
            </p>
            <div className={s.heroActions}>
              <a data-edit="welcome.button" data-edit-max="28" className={s.button} href="#bring">See what to bring</a>
              <a data-edit="welcome.ghost" data-edit-max="28" className={s.ghost} href="#fees">Read the fee board</a>
            </div>
            <ul className={s.heroFacts}>
              <li data-edit="welcome.item" data-edit-max="80">Walk-ins all day, no appointment</li>
              <li data-edit="welcome.item2" data-edit-max="80">Price written on your folder first</li>
              <li data-edit="welcome.item3" data-edit-max="80">IRS letters answered free</li>
            </ul>
          </div>

          <div className={s.shop}>
            <div className={s.awning} aria-hidden="true" />
            <div className={s.window}>
              <div data-edit-pattern="welcome.field" data-edit-roles="transparent,1,2,4,3" className={s.windowField} aria-hidden="true">
                <TabbiedPattern
                  pattern={trigram}
                  palette={WINDOW}
                  fit="grid"
                  cellSize={46}
                  seed="fairfield-window"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.openSign}>
                <p data-edit="welcome.openWord" data-edit-max="240" data-edit-multiline className={s.openWord}>Open</p>
                <p data-edit="welcome.openNote" data-edit-max="240" data-edit-multiline className={s.openNote}>Walk-ins welcome until 7 pm</p>
              </div>
              <div className={s.counter}>
                <p data-edit="welcome.counterLabel" data-edit-max="240" data-edit-multiline className={s.counterLabel}>Returns filed this season</p>
                <p data-edit="welcome.counterNumber" data-edit-max="240" data-edit-multiline className={s.counterNumber}>1,284</p>
                <p data-edit="welcome.counterNote" data-edit-max="240" data-edit-multiline className={s.counterNote}>One mark on the board for every one</p>
              </div>
            </div>
            <p data-edit="welcome.sill" data-edit-max="240" data-edit-multiline className={s.sill}>88 Commerce Row, between the bakery and the shoe repair</p>
          </div>
        </section>

        {/* ------------------------------------------------------------ BRING
            The checklist from the door, large enough to read from the
            sidewalk. */}
        <section id="bring" className={s.sec} aria-labelledby="bring-h">
          <div className={s.secHead}>
            <p data-edit="bring.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="bring.secTitle" data-edit-max="60" id="bring-h" className={s.secTitle}>What to bring</h2>
            <p data-edit="bring.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Tick off what you have. Missing something? Bring the rest anyway:
              we start with what is on the table and you drop off the last form
              later, at no extra charge.
            </p>
          </div>
          <div className={s.bring}>
            {BRING.map((g, i) => (
              <div key={g.title} className={s.group}>
                <h3 data-edit={`bring.groupTitle.${i}`} data-edit-max="40" className={s.groupTitle}>{g.title}</h3>
                <p data-edit={`bring.groupNote.${i}`} data-edit-max="240" data-edit-multiline className={s.groupNote}>{g.note}</p>
                <ul className={s.checks}>
                  {g.items.map((item, i2) => (
                    <li data-edit={`bring.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- FEES
            The fee board behind the counter: white letters on green, a
            dotted leader to each price. */}
        <section id="fees" className={s.fees} aria-labelledby="fees-h">
          <div className={s.feesInner}>
            <div className={s.feesHead}>
              <p data-edit="fees.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
              <h2 data-edit="fees.feesTitle" data-edit-max="60" id="fees-h" className={s.feesTitle}>The fee board</h2>
              <p data-edit="fees.feesNote" data-edit-max="240" data-edit-multiline className={s.feesNote}>
                Flat fees, by return type. We circle what applies to you and
                write the total on your folder before anyone touches a keyboard.
                If your return takes longer than we thought, that is our problem.
              </p>
              <p data-edit="fees.feesStamp" data-edit-max="240" data-edit-multiline className={s.feesStamp}>Federal e-file included in every price</p>
            </div>
            <div className={s.board}>
              <ul className={s.feeList}>
                {FEES.map(([what, price], i) => (
                  <li key={what}>
                    <span data-edit={`fees.feeWhat.${i}`} data-edit-max="60" className={s.feeWhat}>{what}</span>
                    <span data-edit={`fees.feePrice.${i}`} data-edit-max="60" className={s.feePrice}>{price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="fees.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>Most households pay $175: one federal and one state return.</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,0,3,4,2" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={trigram}
            palette={BAND}
            fit="grid"
            cellSize={40}
            seed="fairfield-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ HOURS
            The card that hangs on the door, beside the season's dates. */}
        <section id="hours" className={s.sec} aria-labelledby="hours-h">
          <div className={s.hoursGrid}>
            <div className={s.doorCard}>
              <p data-edit="hours.doorTop" data-edit-max="240" data-edit-multiline className={s.doorTop}>Season hours</p>
              <h2 data-edit="hours.doorTitle" data-edit-max="60" id="hours-h" className={s.doorTitle}>Walk right in</h2>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`hours.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hours.doorFoot" data-edit-max="240" data-edit-multiline className={s.doorFoot}>January 26 to April 15. After that, Tuesdays and Thursdays by appointment.</p>
            </div>
            <div className={s.dates}>
              <h3 data-edit="hours.datesTitle" data-edit-max="40" className={s.datesTitle}>Dates worth a note on the fridge</h3>
              <ol className={s.dateList}>
                {DATES.map(([d, what], i) => (
                  <li key={d}>
                    <time data-edit={`hours.dateDay.${i}`} className={s.dateDay}>{d}</time>
                    <span data-edit={`hours.dateWhat.${i}`} data-edit-max="60" className={s.dateWhat}>{what}</span>
                  </li>
                ))}
              </ol>
              <p data-edit="hours.waitNote" data-edit-max="240" data-edit-multiline className={s.waitNote}>
                Shortest waits: weekday mornings before 11. Longest: the two
                Saturdays before the deadline, when we hand out numbered tickets.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ TALLY
            The back wall: every return a mark, and the people making them. */}
        <section id="tally" className={s.sec} aria-labelledby="tally-h">
          <div className={s.secHead}>
            <p data-edit="tally.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
            <h2 data-edit="tally.secTitle" data-edit-max="60" id="tally-h" className={s.secTitle}>This season, so far</h2>
            <p data-edit="tally.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Each return gets a mark on the back room wall when it is accepted.
              The count is updated every evening at closing.
            </p>
          </div>
          <div className={s.tallyGrid}>
            <div className={s.wallBox}>
              <div data-edit-pattern="tally.field" data-edit-roles="transparent,1,4,2,1" className={s.wall} aria-hidden="true">
                <TabbiedPattern
                  pattern={trigram}
                  palette={EDGE}
                  fit="grid"
                  cellSize={34}
                  seed="fairfield-wall"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.wallCard}>
                <p data-edit="tally.wallCardTitle" data-edit-max="240" data-edit-multiline className={s.wallCardTitle}>The back room wall</p>
                <p data-edit="tally.wallCardNote" data-edit-max="240" data-edit-multiline className={s.wallCardNote}>Three strokes for every return accepted. Painted over each May.</p>
              </div>
            </div>
            <dl className={s.stats}>
              {TALLY.map(([n, what], i) => (
                <div key={what}>
                  <dt data-edit={`tally.term.${i}`} data-edit-max="28">{what}</dt>
                  <dd data-edit={`tally.body.${i}`} data-edit-max="200" data-edit-multiline>{n}</dd>
                </div>
              ))}
            </dl>
            <ul className={s.preparers}>
              {PREPARERS.map(([who, does], i) => (
                <li key={who}>
                  <h3 data-edit={`tally.prepName.${i}`} data-edit-max="40" className={s.prepName}>{who}</h3>
                  <p data-edit={`tally.prepDoes.${i}`} data-edit-max="240" data-edit-multiline className={s.prepDoes}>{does}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.secHead}>
            <p data-edit="questions.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
            <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Asked at the counter</h2>
            <p data-edit="questions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>The five questions we hear most in February.</p>
          </div>
          <div className={s.faq}>
            {FAQ.map(([q, a], i) => (
              <details key={q} className={s.qa}>
                <summary data-edit={`questions.q.${i}`} data-edit-max="80" className={s.q}>{q}</summary>
                <p data-edit={`questions.a.${i}`} data-edit-max="240" data-edit-multiline className={s.a}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visitGrid}>
            <div className={s.visitInfo}>
              <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>Find the office</h2>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>88 Commerce Row, Fairfield</p>
              <p data-edit="visit.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Green awning between the bakery and the shoe repair. Two free parking spaces out front, more behind the bank.</p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="visit.term" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="visit.link" data-edit-max="28" href="tel:+15550142290">(555) 014-2290</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="visit.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="visit.link2" data-edit-max="28" href="mailto:desk@fairfieldtax.example">desk@fairfieldtax.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="visit.term3" data-edit-max="28">Season</dt>
                  <dd data-edit="visit.body" data-edit-max="200" data-edit-multiline>Mon-Fri 9-7, Sat 9-5, Sun 12-4</dd>
                </div>
                <div>
                  <dt data-edit="visit.term4" data-edit-max="28">Off-season</dt>
                  <dd data-edit="visit.body2" data-edit-max="200" data-edit-multiline>Tue and Thu, by appointment</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="visit.formTitle" data-edit-max="40" className={s.formTitle}>Book a sit-down slot</h3>
              <p data-edit="visit.formLead" data-edit-max="240" data-edit-multiline className={s.formLead}>Skip the line: we call back within the working day to fix a time.</p>
              <div className={s.field}>
                <label data-edit="visit.label" htmlFor="ff-name">Name</label>
                <input id="ff-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label2" htmlFor="ff-phone">Phone</label>
                <input id="ff-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="visit.legend">Your return</legend>
                <div className={s.picks}>
                  {RETURN_TYPES.map(([value, label], i) => (
                    <span key={value} className={s.pick}>
                      <input id={`ff-${value}`} type="radio" name="type" value={value} />
                      <label data-edit={`visit.label3.${i}`} htmlFor={`ff-${value}`}>{label}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="visit.label4" htmlFor="ff-note">Anything we should know</label>
                <textarea id="ff-note" name="note" rows={3} />
              </div>
              <button data-edit="visit.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a slot</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,3,4,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={trigram}
            palette={BAND}
            fit="grid"
            cellSize={30}
            seed="fairfield-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Fairfield Tax Service</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional tax office. The preparers, prices, counts and address are invented, and nothing here is financial or tax advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
