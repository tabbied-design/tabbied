import { TabbiedPattern } from 'tabbied/react';
import { elbow, rimband, bangle } from 'tabbied/patterns';
import s from './arc-orthodontics.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Arc Orthodontics: Braces and clear aligners, Linden Park',
  description:
    'Arc Orthodontics straightens teeth for kids and adults in Linden Park. The five steps of treatment, braces against clear aligners, every fee and monthly plan in writing, and a free first consult.',
};

/* Site colors. The hero's pipes and the booking panel's run over the violet
   and the tinted card behind them, so their grounds are transparent; the
   elastics tile and the aligner arcs do the same over the compare cards. */
const PAPER = '#fcfbff';
const INK = '#17152e';
const VIOLET = '#5b3cf5';
const BUBBLE = '#ff8fb1';

const PIPES = ['transparent', PAPER, BUBBLE, PAPER, INK];
const PIPES_SOFT = ['transparent', VIOLET, BUBBLE, VIOLET, INK];
const ELASTICS = ['transparent', VIOLET, BUBBLE, INK, VIOLET];
const TRAYS = ['transparent', VIOLET, PAPER, VIOLET];
const STRIP = ['transparent', VIOLET, BUBBLE, INK];

const NAV = [
  ['How it works', '#journey'],
  ['Braces or aligners', '#compare'],
  ['Fees', '#fees'],
  ['Kids and adults', '#who'],
  ['Team', '#team'],
  ['FAQ', '#faq'],
];

const SPECS = [
  ['Free', 'first consult and 3D scan, no obligation'],
  ['0%', 'monthly plans over up to 24 months'],
  ['7 to 70', 'the ages we see every week'],
  ['2,400', 'smiles finished here since 2012'],
];

type Step = {
  n: string;
  name: string;
  when: string;
  text: string;
};

const STEPS: Step[] = [
  { n: '1', name: 'Consult', when: 'Free, 45 min', text: 'Photos, a look at the bite, and a straight answer: treatment now, later, or never.' },
  { n: '2', name: 'Scan', when: '10 min', text: 'A 3D scan with a small wand. No goopy impressions, and a preview of the finished smile.' },
  { n: '3', name: 'Fit', when: '60-90 min', text: 'Braces bonded on, or your first aligners handed over with a lesson in putting them in.' },
  { n: '4', name: 'Adjust', when: 'Every 6-8 weeks', text: 'Twenty-minute check-ins: new wires or new trays. Kids pick their band colors.' },
  { n: '5', name: 'Retainers', when: 'Nights, for life', text: 'A thin wire behind the front teeth and a clear night retainer. Checks at 3, 6 and 12 months.' },
];

const COMPARE = [
  ['What people see', 'Small brackets on each tooth, metal or tooth-colored', 'Clear trays, hard to spot across a table'],
  ['Good for', 'Every case, including big bite corrections', 'Mild to moderate crowding and gaps, teens and adults'],
  ['Wearing them', 'On all the time; only we take them off', '22 hours a day, out to eat and to brush'],
  ['Eating', 'Skip popcorn, hard candy and gum', 'Anything at all, with the trays out'],
  ['Visits', 'Every 6-8 weeks, 20 minutes', 'Every 8-10 weeks; new trays at home in between'],
  ['Typical length', '18-24 months', '6-20 months'],
  ['What it asks of you', 'Careful brushing around the brackets', 'Discipline: they only work while they are in'],
  ['From', '$5,400, or $200 a month', '$3,200, or $117 a month'],
];

type Fee = {
  name: string;
  length: string;
  fee: string;
  down: string;
  monthly: string;
};

const FEES: Fee[] = [
  { name: 'Consult and 3D scan', length: '45 min', fee: 'Free', down: '-', monthly: '-' },
  { name: 'Early treatment, ages 7-10', length: '9-12 months', fee: '$2,900', down: '$300', monthly: '$109' },
  { name: 'Metal braces', length: '18-24 months', fee: '$5,400', down: '$600', monthly: '$200' },
  { name: 'Ceramic braces', length: '18-24 months', fee: '$5,900', down: '$600', monthly: '$221' },
  { name: 'Clear aligners, mild', length: '6-10 months', fee: '$3,200', down: '$400', monthly: '$117' },
  { name: 'Clear aligners, full', length: '12-20 months', fee: '$5,600', down: '$600', monthly: '$209' },
  { name: 'Replacement retainer', length: 'One visit', fee: '$450', down: '-', monthly: '-' },
];

const INCLUDED = [
  'Every visit and every adjustment',
  'Broken bracket and lost tray repairs',
  'Your first set of retainers',
  'A year of retainer checks after',
];

type Group = {
  who: string;
  title: string;
  text: string;
  points: string[];
};

const KIDS: Group = {
  who: 'For kids',
  title: 'A first check at seven',
  text: 'Most seven-year-olds need nothing yet. We look, we write down what we see, and we check again in a year.',
  points: [
    'After-school slots, 3-5 pm, kept for under-18s',
    'Band colors picked fresh at every visit',
    'A free sports mouthguard with braces',
    'A parent can sit in, always',
  ],
};

const ADULTS: Group = {
  who: 'For adults',
  title: 'One in three of our patients is over 25',
  text: 'It is not too late, and nobody here will make it strange. Most adults choose aligners or ceramic braces.',
  points: [
    'Thursday evenings until 7:30',
    'Clear aligners or tooth-colored braces',
    'Whitening at the end, at half price',
    'A plan built around a wedding date, if there is one',
  ],
};

const TEAM = [
  { initials: 'PR', name: 'Dr. Priya Raman', role: 'Orthodontist, founder', note: 'Board-certified. Fourteen years of braces, most of them on eleven-year-olds.' },
  { initials: 'MO', name: 'Dr. Marcus Oyelaran', role: 'Orthodontist', note: 'Leads our aligner cases. Thursdays and Saturdays.' },
  { initials: 'JO', name: 'Jess Ortega', role: 'Treatment coordinator', note: 'The money questions, insurance forms and the rescheduling.' },
  { initials: 'SW', name: 'Sam Whitlock', role: 'Orthodontic assistant', note: 'Changes wires, hands out the band colors, remembers everyone.' },
];

const FAQ = [
  ['Do I need a referral from my dentist?', 'No. Call or book below. We send your dentist a short note after the consult so everyone is on the same page.'],
  ['Does it hurt?', 'The fitting does not. Teeth ache for two or three days after it and after each adjustment; soft food and the usual painkiller are enough for nearly everyone.'],
  ['What if a bracket breaks or a tray goes missing?', 'Call us. We see you within two working days, and the repair or the replacement tray is part of the fee.'],
  ['Can I play sports or a wind instrument?', 'Yes. We give a mouthguard made for braces, and most trumpet and flute players adjust within a couple of weeks.'],
  ['Why is the first consult free?', 'Because a lot of people only need to hear that nothing is wrong. We would rather you came in and found that out.'],
  ['What if I stop wearing my retainers?', 'Teeth drift back, slowly and then quickly. If it has only been a few weeks, come in; a new retainer usually pulls them back.'],
];

const HOURS = [
  ['Mon to Wed', '8:00 am-5:00 pm'],
  ['Thursday', '10:00 am-7:30 pm'],
  ['Friday', '8:00 am-2:00 pm'],
  ['Saturday', '1st and 3rd, 8:00 am-noon'],
];

export default function ArcOrthodonticsPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">arc</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#book">Book a free consult</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <a href="#book">Book a free consult</a>
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.chip}>Free consults open for October</p>
            <h1 id="hero-h" className={s.title}>Straight teeth, on a plan <em>you can see.</em></h1>
            <p className={s.lede}>
              Arc Orthodontics is two orthodontists and a small team in Linden
              Park, fitting braces and clear aligners for kids and adults. Every
              step, every visit and every dollar is on this page before you
              book.
            </p>
            <div className={s.ctas}>
              <a className={s.btn} href="#book">Book a free consult</a>
              <a className={s.btnGhost} href="#fees">See every fee</a>
            </div>
          </div>
          <div className={s.product}>
            <div className={s.productField} aria-hidden="true">
              <TabbiedPattern
                pattern={elbow}
                palette={PIPES}
                fit="grid"
                cellSize={72}
                seed="arc-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.priceTag}>
              <span className={s.priceFrom}>Aligners from</span>
              <strong>$117</strong>
              <span className={s.priceFrom}>a month, 0% interest</span>
            </p>
          </div>
        </section>

        <dl className={s.specs}>
          {SPECS.map(([figure, what]) => (
            <div key={figure}>
              <dt>{figure}</dt>
              <dd>{what}</dd>
            </div>
          ))}
        </dl>

        {/* --------------------------------------------------------- JOURNEY */}
        <section id="journey" className={s.sec} aria-labelledby="journey-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>How it works</p>
            <h2 id="journey-h">Five steps, from hello to retainer</h2>
            <p className={s.secNote}>
              The same five for braces and for aligners. Most people are at
              step three within two weeks of the consult.
            </p>
          </div>
          <ol className={s.track}>
            {STEPS.map((step) => (
              <li key={step.n}>
                <span className={s.node}>{step.n}</span>
                <p className={s.when}>{step.when}</p>
                <h3>{step.name}</h3>
                <p className={s.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- COMPARE */}
        <section id="compare" className={s.sec} aria-labelledby="compare-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Braces or aligners</p>
            <h2 id="compare-h">Both work. They ask different things of you.</h2>
            <p className={s.secNote}>
              We tell you at the consult which one your teeth can use. When
              both can, it is your call, and here is the whole trade.
            </p>
          </div>

          <div className={s.compare}>
            <div className={s.compareHead}>
              <p className={s.compareCorner}>Side by side</p>
              <div className={s.option}>
                <div className={s.optionTile} aria-hidden="true">
                  <TabbiedPattern
                    pattern={rimband}
                    palette={ELASTICS}
                    fit="grid"
                    cellSize={30}
                    seed="arc-elastics"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <h3>Braces</h3>
                <p>Metal or ceramic</p>
              </div>
              <div className={s.option}>
                <div className={`${s.optionTile} ${s.optionTileClear}`} aria-hidden="true">
                  <TabbiedPattern
                    pattern={bangle}
                    palette={TRAYS}
                    fit="grid"
                    cellSize={34}
                    seed="arc-trays"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <h3>Clear aligners</h3>
                <p>A new set of trays every week or two</p>
              </div>
            </div>
            <table className={s.compareTable}>
              <caption className={s.srOnly}>Braces and clear aligners compared, row by row</caption>
              <thead className={s.srOnly}>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Braces</th>
                  <th scope="col">Clear aligners</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([q, braces, aligners]) => (
                  <tr key={q}>
                    <th scope="row">{q}</th>
                    <td>{braces}</td>
                    <td>{aligners}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Fees, in writing</p>
            <h2 id="fees-h">The fee is the fee</h2>
            <p className={s.secNote}>
              One price for the whole treatment, quoted at the consult and
              held for sixty days. Spread it over up to 24 months at 0%, or pay
              in full and take 5% off.
            </p>
          </div>

          <div className={s.feesGrid}>
            <div className={s.feesCard}>
              <table className={s.fees}>
                <caption className={s.srOnly}>Treatments, typical length, full fee, down payment and monthly payment</caption>
                <thead>
                  <tr>
                    <th scope="col">Treatment</th>
                    <th scope="col" className={s.colLength}>Typical length</th>
                    <th scope="col" className={s.num}>Full fee</th>
                    <th scope="col" className={`${s.num} ${s.colDown}`}>Down</th>
                    <th scope="col" className={`${s.num} ${s.colMonthly}`}>Monthly, 24 mo</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f) => (
                    <tr key={f.name}>
                      <th scope="row">{f.name}</th>
                      <td className={s.colLength}>{f.length}</td>
                      <td className={s.num}>{f.fee}</td>
                      <td className={`${s.num} ${s.colDown}`}>{f.down}</td>
                      <td className={`${s.num} ${s.colMonthly}`}>{f.monthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={s.feesSide}>
              <div className={s.includes}>
                <h3>Every fee includes</h3>
                <ul>
                  {INCLUDED.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={s.insurance}>
                <h3>Insurance and HSA</h3>
                <p>
                  We bill your insurer for you. Plans with orthodontic cover
                  usually pay $1,000-$2,500 for a lifetime, and that comes off
                  the full fee before the monthly plan is worked out. HSA and
                  FSA cards are welcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- WHO */}
        <section id="who" className={s.sec} aria-labelledby="who-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Kids and adults</p>
            <h2 id="who-h">Same chairs, different afternoons</h2>
          </div>
          <div className={s.who}>
            <article className={`${s.group} ${s.groupKids}`}>
              <p className={s.groupWho}>{KIDS.who}</p>
              <h3>{KIDS.title}</h3>
              <p className={s.groupText}>{KIDS.text}</p>
              <ul className={s.groupList}>
                {KIDS.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
            <article className={`${s.group} ${s.groupAdults}`}>
              <p className={s.groupWho}>{ADULTS.who}</p>
              <h3>{ADULTS.title}</h3>
              <p className={s.groupText}>{ADULTS.text}</p>
              <ul className={s.groupList}>
                {ADULTS.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.sec} aria-labelledby="team-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>The team</p>
            <h2 id="team-h">Four people you will get to know</h2>
          </div>
          <ul className={s.team}>
            {TEAM.map((t) => (
              <li key={t.name}>
                <span className={s.avatar} aria-hidden="true">{t.initials}</span>
                <h3>{t.name}</h3>
                <p className={s.teamRole}>{t.role}</p>
                <p className={s.teamNote}>{t.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Questions</p>
            <h2 id="faq-h">What people ask on the phone</h2>
          </div>
          <div className={s.faq}>
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.book}>
            <form className={s.form} action="#">
              <p className={s.eyebrow}>Free first consult</p>
              <h2 id="book-h" className={s.formTitle}>Book a consult</h2>
              <p className={s.formNote}>Jess calls back within one working day to find a time.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="arc-name">Patient's name</label>
                  <input id="arc-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="arc-age">Patient's age</label>
                  <input id="arc-age" name="age" type="number" min="5" max="99" />
                </div>
                <div className={s.field}>
                  <label htmlFor="arc-phone">Phone</label>
                  <input id="arc-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label htmlFor="arc-email">Email</label>
                  <input id="arc-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label htmlFor="arc-want">Interested in</label>
                  <select id="arc-want" name="want" defaultValue="unsure">
                    <option value="unsure">Not sure yet</option>
                    <option value="braces">Braces</option>
                    <option value="aligners">Clear aligners</option>
                    <option value="early">An early check for a child</option>
                    <option value="second">A second opinion</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="arc-when">Best time</label>
                  <select id="arc-when" name="when" defaultValue="after-school">
                    <option value="morning">Weekday morning</option>
                    <option value="after-school">After school, 3-5 pm</option>
                    <option value="thursday">Thursday evening</option>
                    <option value="saturday">Saturday morning</option>
                  </select>
                </div>
              </div>
              <button className={s.submit} type="submit">Request my free consult</button>
            </form>

            <aside className={s.visit} aria-labelledby="visit-h">
              <div className={s.visitField} aria-hidden="true">
                <TabbiedPattern
                  pattern={elbow}
                  palette={PIPES_SOFT}
                  fit="grid"
                  cellSize={64}
                  seed="arc-visit"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.visitBody}>
                <h3 id="visit-h">240 Linden Park Road, Suite 2</h3>
                <p className={s.visitNote}>Upstairs from the pharmacy, lift at the back. Free parking behind the building.</p>
                <dl className={s.hours}>
                  {HOURS.map(([day, time]) => (
                    <div key={day}>
                      <dt>{day}</dt>
                      <dd>{time}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.contact}>
                  <a href="tel:+15550134470">(555) 013-4470</a>
                </p>
                <p className={s.contact}>
                  <a href="mailto:hello@arcortho.example">hello@arcortho.example</a>
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footStrip} aria-hidden="true">
          <TabbiedPattern
            pattern={bangle}
            palette={STRIP}
            fit="grid"
            cellSize={40}
            seed="arc-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>Arc Orthodontics</p>
          <p>A fictional orthodontic practice. The team, fees and hours are invented.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
