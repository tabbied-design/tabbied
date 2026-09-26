import { TabbiedPattern } from 'tabbied/react';
import { cavetto, roundpair } from 'tabbied/patterns';
import s from './willow-midwifery.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Willow Midwifery: Midwives and doulas, Alder Hill',
  description:
    'Willow Midwifery cares for you through pregnancy, birth at home or at the Birth House on Fern Street, and the six weeks after. Care by trimester, where to give birth, fees and insurance, and the midwives.',
};

/* Site colors, the same values as the roles on .page. The leaves and the
   quarter-rounds are laid on a transparent ground, so each arch is filled
   by the color of the frame it sits in. */
const LINEN = '#f5ede3';
const BARK = '#3a2a22';
const TERRA = '#b35a3a';
const BLUSH = '#e9b8a5';
const OLIVE = '#66703f';

const WILLOW = ['transparent', BLUSH, TERRA, LINEN, OLIVE];
const HOME = ['transparent', TERRA, BLUSH, OLIVE, BARK];
const FEES = ['transparent', OLIVE, TERRA, BLUSH, LINEN];
const HEDGE = ['transparent', OLIVE, BLUSH, TERRA];

const NAV = [
  ['Care', '#care'],
  ['Where to give birth', '#where'],
  ['Visits', '#visits'],
  ['Fees', '#fees'],
  ['Midwives', '#team'],
  ['Questions', '#questions'],
  ['Get in touch', '#contact'],
];

type Trimester = {
  numeral: string;
  name: string;
  weeks: string;
  items: string[];
};

const TRIMESTERS: Trimester[] = [
  {
    numeral: 'I',
    name: 'First trimester',
    weeks: 'Weeks 4 to 13',
    items: [
      'A first talk, free, an hour, at the house or by phone',
      'Booking visit at 8 to 10 weeks: your history, your due date, blood work if you want it',
      'A dating scan, if you want one, at the imaging center on Mill Road',
      'We talk about nausea, food, work, and whether to tell anyone yet',
    ],
  },
  {
    numeral: 'II',
    name: 'Second trimester',
    weeks: 'Weeks 14 to 27',
    items: [
      'A visit every four weeks, forty-five minutes, never rushed',
      'The anatomy scan at about 20 weeks',
      'Glucose screening at 24 to 28 weeks, or a week of food diary instead',
      'Choosing where to give birth, and a tour of the Birth House',
    ],
  },
  {
    numeral: 'III',
    name: 'Third trimester',
    weeks: 'Week 28 to birth',
    items: [
      'Every two weeks until 36, then every week',
      'A home visit at 36 weeks: we see the room, you get the list for the birth kit',
      'Group B strep swab at 36 to 37 weeks',
      'From 37 weeks, a midwife on call for you day and night',
    ],
  },
  {
    numeral: 'IV',
    name: 'The fourth trimester',
    weeks: 'Birth to six weeks',
    items: [
      'Home visits on day 1, day 3 and day 5',
      'Feeding help from Tove, at your house or on the phone',
      'Newborn checks: weight, color, the heel prick at 48 hours',
      'A last visit at six weeks, about the baby and about how you really are',
    ],
  },
];

const PLACES = [
  { label: 'The room', home: 'Your bedroom, your living room, wherever you end up.', house: 'Two birth rooms at 14 Fern Street, each with a double bed and a deep pool.' },
  { label: 'Who is there', home: 'Two midwives, your doula if you have one, anyone you invite.', house: 'Two midwives, a birth assistant, and up to four people of yours.' },
  { label: 'Water', home: 'We bring a pool and fill it. You need a ground floor or a strong one.', house: 'A built-in pool, filled while you labor.' },
  { label: 'Pain relief', home: 'Water, massage, TENS and gas and air.', house: 'Water, massage, TENS, gas and air, and sterile water injections.' },
  { label: 'If you need a hospital', home: "St. Brigid's is twelve minutes away. We call ahead and come with you.", house: "St. Brigid's is six minutes away. We call ahead and come with you." },
  { label: 'Going home', home: 'You are home. We leave about three hours after, once you have eaten and slept a little.', house: 'Four to six hours after the birth, once the baby has fed.' },
  { label: 'Cost', home: 'Included in the fee for care.', house: 'Adds a facility fee of $1,100, which most plans cover.' },
];

type Visit = {
  when: string;
  what: string;
  phase: 'p1' | 'p2' | 'p3' | 'p4';
};

const VISITS: Visit[] = [
  { when: '8', what: 'Booking', phase: 'p1' },
  { when: '12', what: 'Scan', phase: 'p1' },
  { when: '16', what: 'Visit', phase: 'p2' },
  { when: '20', what: 'Anatomy', phase: 'p2' },
  { when: '24', what: 'Visit', phase: 'p2' },
  { when: '28', what: 'Glucose', phase: 'p3' },
  { when: '30', what: 'Visit', phase: 'p3' },
  { when: '32', what: 'Visit', phase: 'p3' },
  { when: '34', what: 'Visit', phase: 'p3' },
  { when: '36', what: 'At home', phase: 'p3' },
  { when: '37', what: 'On call', phase: 'p3' },
  { when: '38', what: 'Visit', phase: 'p3' },
  { when: '39', what: 'Visit', phase: 'p3' },
  { when: '40', what: 'Due', phase: 'p3' },
  { when: '41', what: 'A plan', phase: 'p3' },
  { when: 'D1', what: 'At home', phase: 'p4' },
  { when: 'D3', what: 'At home', phase: 'p4' },
  { when: 'D5', what: 'At home', phase: 'p4' },
  { when: 'W2', what: 'Feeding', phase: 'p4' },
  { when: 'W6', what: 'Last visit', phase: 'p4' },
];

const LEGEND = [
  ['p1', 'First trimester'],
  ['p2', 'Second'],
  ['p3', 'Third, then on call'],
  ['p4', 'After the birth: D is day, W is week'],
];

const DOULA = [
  ['Birth doula', '$1,850', 'Two visits before, on call from 38 to 42 weeks, with you through labor wherever you give birth, hospital included, and one visit after.'],
  ['Postpartum doula', '$40 an hour', 'Days or nights, three hours at least. Feeding, sleep, laundry, soup, and a shower for you while someone holds the baby.'],
  ['Feeding help', '$140', 'Ninety minutes at home with Tove, an IBCLC. Most plans pay it back; we give you the form.'],
];

const FEE_LIST = [
  ['Midwifery care, birth at home', 'Every visit, the birth, six weeks after', '$4,600'],
  ['Midwifery care, birth at the Birth House', 'The same, plus the facility fee', '$5,700'],
  ['Pregnancy care only', 'If you give birth elsewhere', '$2,200'],
  ['After-birth care only', 'Six weeks of visits, from day one', '$950'],
];

const MONEY = [
  ['Insurance', 'In network with Harborline Health and Evergreen Mutual. For other plans we bill out of network and give you the papers to claim. Medicaid is accepted for midwifery care.'],
  ['Paying', 'A deposit of $500 at 20 weeks, the rest in monthly payments, settled by 36 weeks. No interest, no card fees.'],
  ['Sliding scale', 'Six places a year at a reduced fee. Ask; nobody has to explain why.'],
];

type Person = {
  initials: string;
  name: string;
  role: string;
  note: string;
};

const TEAM: Person[] = [
  { initials: 'RA', name: 'Ruth Adeyemi', role: 'Midwife, CPM, LM. Founder', note: 'Midwife since 2006, more than six hundred births, most of them at home. Planted the willow by the gate.' },
  { initials: 'MV', name: 'Marisol Vega', role: 'Nurse-midwife, CNM', note: "Twelve years on the labor ward at St. Brigid's before she came here. Does the birth-after-cesarean talks." },
  { initials: 'TL', name: 'Tove Lindqvist', role: 'Doula and IBCLC', note: 'Birth and postpartum doula, and the one to call about feeding. Speaks Swedish and English.' },
  { initials: 'PR', name: 'Priya Raman', role: 'Student midwife', note: 'In her final year, at most births with Ruth. Answers the phone on Tuesdays.' },
];

const FAQ = [
  ['Is it safe to give birth at home?', 'For a healthy pregnancy, with two trained midwives and a hospital close by, the large studies say it is as safe for the baby as a hospital, with fewer interventions for you. We go through what the numbers mean for you, and when home is not the right place.'],
  ['What if something goes wrong?', 'We carry oxygen, resuscitation equipment, medicines to stop bleeding and fluids for a drip, and we practice emergencies together every month. If you or the baby need a hospital, we call ahead and we come with you.'],
  ['Can I see an obstetrician as well?', 'Yes. Some of our families see one for a single consult, some share care all the way through. We write to them and they write to us.'],
  ['Do you support birth after a cesarean?', 'At home and at the Birth House, after a talk with Marisol about your first birth. Most people who ask turn out to be good candidates.'],
  ['When do I call you?', 'From 37 weeks, whenever you think it might be starting. Before that, whenever something feels wrong. A midwife answers the number, never a machine.'],
  ['Can my other children be there?', 'Yes, with a grown-up whose only job is them.'],
];

export default function WillowMidwiferyPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Castoro:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Willow Midwifery</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
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
            <p className={s.kicker}>Midwives and doulas on Alder Hill, since 2011</p>
            <h1 id="hero-h" className={s.title}>
              Midwives for the nine months, <em>and the six weeks after.</em>
            </h1>
            <p className={s.lede}>
              We are two midwives, a doula and a student. We see you at our
              house on Fern Street or at yours, we are with you when you give
              birth at home or at the Birth House, and afterward we come to
              you on day one, three and five.
            </p>
            <div className={s.actions}>
              <a className={s.button} href="#contact">Book a first talk</a>
              <a className={s.buttonQuiet} href="#fees">Fees and insurance</a>
            </div>
            <p className={s.small}>The first talk is free and takes an hour. Partners, mothers and long lists of questions are welcome.</p>
          </div>

          <div className={s.heroArch}>
            <div className={s.arch} aria-hidden="true">
              <TabbiedPattern
                pattern={roundpair}
                palette={WILLOW}
                fit="grid"
                cellSize={56}
                seed="willow-hero"
                options={{ frequency: 0.85 }}
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.archNote}>Now booking due dates from March 2027</p>
          </div>
        </section>

        {/* ------------------------------------------------------------ CARE */}
        <section id="care" className={s.sec} aria-labelledby="care-h">
          <div className={s.head}>
            <h2 id="care-h">Care by <em>trimester</em></h2>
            <p className={s.headNote}>
              The same two midwives from the first talk to the last visit.
              Every appointment is forty-five minutes or longer, and there is
              always time for the question you forgot.
            </p>
          </div>

          <ol className={s.trimesters}>
            {TRIMESTERS.map((t) => (
              <li key={t.numeral}>
                <p className={s.numeral}>{t.numeral}</p>
                <h3>{t.name}</h3>
                <p className={s.weeks}>{t.weeks}</p>
                <ul>
                  {t.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- WHERE */}
        <section id="where" className={s.whereSec} aria-labelledby="where-h">
          <div className={s.whereInner}>
            <div className={s.head}>
              <h2 id="where-h">At home, or at <em>the Birth House</em></h2>
              <p className={s.headNote}>
                You do not have to decide until 36 weeks, and you can change
                your mind in labor. About one first-time parent in six moves to
                the hospital during labor, most often for a long labor and an
                epidural, rarely in a hurry.
              </p>
            </div>

            <div className={s.where}>
              <article className={s.place} aria-labelledby="home-h">
                <div className={s.window} aria-hidden="true">
                  <TabbiedPattern
                    pattern={cavetto}
                    palette={HOME}
                    fit="grid"
                    cellSize={40}
                    seed="willow-home"
                    options={{ frequency: 0.9 }}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <h3 id="home-h">At home</h3>
                <dl className={s.placeList}>
                  {PLACES.map((p) => (
                    <div key={p.label}>
                      <dt>{p.label}</dt>
                      <dd>{p.home}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <article className={s.place} aria-labelledby="house-h">
                <div className={`${s.window} ${s.windowHouse}`}>
                  <Artwork
                    slug="willow-midwifery-birthroom"
                    alt="A birth room: a low wide bed with pillows, a round birth pool, a tall arched window and a hanging plant"
                    inks={{ red: 'var(--clay-ink)', blue: 'var(--leaf-ink)', black: 'var(--text)' }}
                    className={s.roomArt}
                  />
                </div>
                <h3 id="house-h">At the Birth House</h3>
                <dl className={s.placeList}>
                  {PLACES.map((p) => (
                    <div key={p.label}>
                      <dt>{p.label}</dt>
                      <dd>{p.house}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- VISITS */}
        <section id="visits" className={s.sec} aria-labelledby="visits-h">
          <div className={s.head}>
            <h2 id="visits-h">Your visits, <em>week by week</em></h2>
            <p className={s.headNote}>
              Twenty visits for a pregnancy that runs to 41 weeks, fewer if the
              baby is early. The numbers are weeks of pregnancy; after the
              birth they are days and weeks of the baby.
            </p>
          </div>

          <ol className={s.path}>
            {VISITS.map((v) => (
              <li key={v.when} className={s[v.phase]}>
                <span className={s.when}>{v.when}</span>
                <span className={s.what}>{v.what}</span>
              </li>
            ))}
          </ol>

          <ul className={s.legend}>
            {LEGEND.map(([phase, label]) => (
              <li key={phase} className={s[phase]}>{label}</li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- DOULAS */}
        <section className={s.sec} aria-labelledby="doula-h">
          <div className={s.head}>
            <h2 id="doula-h">Doula care, <em>with us or without</em></h2>
            <p className={s.headNote}>
              A doula does not do anything medical. She stays, from the first
              hour of labor to the last, and she remembers what you asked for.
            </p>
          </div>
          <ul className={s.doulas}>
            {DOULA.map(([name, price, note]) => (
              <li key={name}>
                <h3>{name}</h3>
                <p className={s.doulaPrice}>{price}</p>
                <p>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.fees}>
            <div className={s.feesArch} aria-hidden="true">
              <TabbiedPattern
                pattern={cavetto}
                palette={FEES}
                fit="grid"
                cellSize={48}
                seed="willow-fees"
                options={{ frequency: 0.85 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div>
              <h2 id="fees-h" className={s.feesTitle}>Fees and <em>insurance</em></h2>
              <table className={s.feeTable}>
                <caption className={s.srOnly}>What our care costs</caption>
                <tbody>
                  {FEE_LIST.map(([what, note, price]) => (
                    <tr key={what}>
                      <th scope="row">
                        <span className={s.feeWhat}>{what}</span>
                        <span className={s.feeNote}>{note}</span>
                      </th>
                      <td>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className={s.money}>
                {MONEY.map(([term, body]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.sec} aria-labelledby="team-h">
          <div className={s.head}>
            <h2 id="team-h">The <em>midwives</em></h2>
            <p className={s.headNote}>
              Two of us are on call at any time, and you will have met both by
              36 weeks. Nobody new walks in when you are in labor.
            </p>
          </div>
          <ul className={s.team}>
            {TEAM.map((p) => (
              <li key={p.name}>
                <p className={s.portrait} aria-hidden="true">{p.initials}</p>
                <h3>{p.name}</h3>
                <p className={s.role}>{p.role}</p>
                <p className={s.bio}>{p.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqWrap}>
            <div>
              <h2 id="faq-h" className={s.faqTitle}>What people <em>ask us first</em></h2>
              <p className={s.faqNote}>
                Anything else, ring the office. A midwife answers, and no
                question is too small to ask twice.
              </p>
            </div>
            <div className={s.faq}>
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.door}>
            <h2 id="contact-h" className={s.doorTitle}>Come and <em>meet us</em></h2>
            <p className={s.doorLede}>
              Tell us a little and we will ring you within two working days to
              find an hour for the first talk.
            </p>

            <div className={s.doorGrid}>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label htmlFor="willow-name">Your name</label>
                  <input id="willow-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="willow-email">Email</label>
                  <input id="willow-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label htmlFor="willow-due">Due date, if you know it</label>
                  <input id="willow-due" name="due" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="willow-where">Where you are thinking of giving birth</label>
                  <select id="willow-where" name="where" defaultValue="unsure">
                    <option value="home">At home</option>
                    <option value="house">At the Birth House</option>
                    <option value="hospital">In hospital, with a doula</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="willow-note">Anything you would like us to know</label>
                  <textarea id="willow-note" name="note" rows={4} />
                </div>
                <button className={s.button} type="submit">Ask for a first talk</button>
              </form>

              <dl className={s.visit}>
                <div>
                  <dt>The Birth House</dt>
                  <dd>14 Fern Street, Alder Hill. Two parking spaces behind the house and a ramp to the side door.</dd>
                </div>
                <div>
                  <dt>The office</dt>
                  <dd>Monday to Thursday 9 to 5, Friday 9 to 1.</dd>
                </div>
                <div>
                  <dt>For our families</dt>
                  <dd>A midwife on the phone day and night, from 37 weeks and for six weeks after.</dd>
                </div>
                <div>
                  <dt>Call</dt>
                  <dd>
                    <a href="tel:+15550173344">(555) 017-3344</a>
                  </dd>
                </div>
                <div>
                  <dt>Write</dt>
                  <dd>
                    <a href="mailto:hello@willowmidwifery.example">hello@willowmidwifery.example</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.hedge} aria-hidden="true">
          <TabbiedPattern
            pattern={roundpair}
            palette={HEDGE}
            fit="grid"
            cellSize={32}
            seed="willow-hedge"
            options={{ frequency: 0.7 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p className={s.footName}>Willow Midwifery</p>
        <p>A fictional midwifery and doula practice. The people, fees, insurers and address are invented.</p>
        <p>The birth room is a generated picture, drawn in the page's own colors.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
