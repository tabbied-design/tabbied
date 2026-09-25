import { TabbiedPattern } from 'tabbied/react';
import { pebble, softbubbles } from 'tabbied/patterns';
import s from './clearwater-dental.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Clearwater Dental: Family dental practice, Brookmere',
  description:
    'Clearwater Dental is a family practice on Harbor Street in Brookmere. Checkups, fillings, crowns and aligners with the fee range printed, evening hours twice a week and same-day emergency slots.',
};

/* Site colors. The hero plate is the one dark surface on the page, and the
   bubbles glow on it; the team tiles sit on the page's own ground. */
const SLATE = '#14232B';
const TEAL = '#2BA59A';
const GRAY = '#7F9096';
const PALE = '#DDEBE8';

const BUBBLES = ['transparent', TEAL, PALE, GRAY, TEAL];
const AVATAR = ['transparent', TEAL, SLATE, GRAY];

const NAV = [
  ['Treatments', '#treatments'],
  ['New patients', '#new-patients'],
  ['Insurance and fees', '#insurance'],
  ['Our team', '#team'],
  ['Emergencies', '#emergencies'],
  ['Questions', '#faq'],
  ['Find us', '#visit'],
];

const HOURS = [
  ['Monday', '8:00-5:00'],
  ['Tuesday', '8:00-7:00'],
  ['Wednesday', '8:00-5:00'],
  ['Thursday', '8:00-7:00'],
  ['Friday', '8:00-2:00'],
  ['Saturday', '9:00-1:00'],
  ['Sunday', 'Closed'],
];

const FACTS = [
  ['Since 2009', 'on Harbor Street'],
  ['Tue and Thu', 'open until 7 p.m.'],
  ['Same day', 'emergency slots, most days'],
];

type Treatment = {
  name: string;
  note: string;
  fee: string;
};

type Group = {
  title: string;
  lede: string;
  items: Treatment[];
};

const GROUPS: Group[] = [
  {
    title: 'Everyday care',
    lede: 'Twice a year for most adults, and the visit most children come for.',
    items: [
      { name: 'Checkup and cleaning', note: 'Exam, scale and polish, two bitewing x-rays', fee: '$140-190' },
      { name: 'Child checkup', note: 'Under 12, with fluoride varnish', fee: '$75-95' },
      { name: 'Deep cleaning', note: 'Per quarter of the mouth, numbed', fee: '$220-280' },
      { name: 'Sealants', note: 'Per back tooth that traps food', fee: '$45-60' },
    ],
  },
  {
    title: 'Repairs',
    lede: 'Always with a written plan and the fee agreed before we begin.',
    items: [
      { name: 'Tooth-colored filling', note: 'One to three surfaces, by size', fee: '$160-320' },
      { name: 'Crown', note: 'Porcelain, from a local lab, two visits', fee: '$1,150-1,400' },
      { name: 'Root canal', note: 'Front tooth to molar, crown extra', fee: '$780-1,350' },
      { name: 'Extraction', note: 'Simple to surgical', fee: '$180-450' },
    ],
  },
  {
    title: 'Cosmetic and straightening',
    lede: 'Offered after a checkup, never instead of one.',
    items: [
      { name: 'Whitening', note: 'Take-home trays or one chair session', fee: '$350-600' },
      { name: 'Clear aligners', note: 'Full course, retainers included', fee: '$3,800-5,600' },
      { name: 'Night guard', note: 'For grinding, made to measure', fee: '$420-520' },
      { name: 'Implant consultation', note: 'With a 3D scan, credited if you go ahead', fee: '$95' },
    ],
  },
];

const STEPS = [
  {
    no: '1',
    title: 'Book',
    body: 'Call, or send the form at the bottom of this page. Tell us if anything hurts and we will find you a sooner slot.',
  },
  {
    no: '2',
    title: 'Fill in one form',
    body: 'We email a short health history the day you book. It takes ten minutes and saves twenty in the waiting room.',
  },
  {
    no: '3',
    title: 'Your first visit',
    body: 'Sixty minutes with a dentist and a hygienist: an exam, a full set of x-rays, a cleaning, and time for your questions.',
  },
  {
    no: '4',
    title: 'A plan in writing',
    body: 'You leave with what we found, what we suggest, what can wait, and what each part costs after insurance.',
  },
];

const BRING = [
  'Your insurance card, front and back',
  'A list of the medicines you take',
  'X-rays from your last dentist, if they are under two years old',
  'For children: a parent or guardian, and their favorite toy',
];

const PLANS = [
  'Northstar Dental PPO',
  'Bayline Benefits',
  'Keystone Mutual Dental',
  'Harborview Health',
  'State children\'s dental program',
  'Federal employee dental plans',
];

const MEMBERSHIP = [
  ['Adult', '$29 a month'],
  ['Child under 18', '$19 a month'],
  ['Each extra family member', '$24 a month'],
];

type Person = {
  name: string;
  role: string;
  note: string;
  days: string;
};

const TEAM: Person[] = [
  { name: 'Dr. Nadia Okafor, DDS', role: 'Principal dentist', note: 'Opened the practice in 2009. Crowns, root canals and nervous first visits.', days: 'Mon, Tue, Thu, Fri' },
  { name: 'Dr. Samuel Reyes, DMD', role: 'Family dentist', note: 'Children and teenagers, sealants and aligners. Speaks Spanish.', days: 'Mon, Wed, Thu, Sat' },
  { name: 'Dr. Leah Brandt, DDS', role: 'Visiting oral surgeon', note: 'Wisdom teeth and implants, here so you do not have to go elsewhere.', days: 'Alternate Wednesdays' },
  { name: 'Priya Natarajan, RDH', role: 'Hygienist', note: 'Deep cleaning and gum care. Nineteen years in the chair.', days: 'Mon-Thu' },
  { name: 'Tomas Lindqvist, RDH', role: 'Hygienist', note: 'Checkups, cleaning and the kindest fluoride varnish in town.', days: 'Tue-Sat' },
  { name: 'Grace Mbeki', role: 'Practice manager', note: 'Insurance questions, estimates and payment plans. Call her first.', days: 'Every day we are open' },
];

const URGENT = [
  {
    title: 'A knocked-out adult tooth',
    body: 'Pick it up by the crown, not the root. Rinse it once, keep it in milk, and come straight in: within an hour it can often be saved.',
  },
  {
    title: 'A broken tooth or lost filling',
    body: 'Rinse with warm water, keep any pieces, and cover a sharp edge with sugar-free gum. It is rarely urgent at night, and we will see you the next day.',
  },
  {
    title: 'Toothache',
    body: 'Take the pain relief you would normally take and call us at 8:00. Toothache that wakes you up gets a slot that same day.',
  },
  {
    title: 'Swelling with a fever',
    body: 'A swollen face with a temperature, or swelling that makes it hard to swallow or breathe, is for the emergency room first, then us.',
  },
];

const FAQ = [
  {
    q: 'When should my child first see a dentist?',
    a: 'When the first tooth appears, or by their first birthday. Visits under three are short, mostly on a parent\'s lap, and we do not charge for them.',
  },
  {
    q: 'I am nervous about the dentist. What can you do?',
    a: 'Tell us when you book. We give you a longer first visit, explain each step before we do it, agree a stop signal, and offer nitrous oxide for $60 a visit.',
  },
  {
    q: 'How much will I pay if I have insurance?',
    a: 'We check your benefits before the visit and give you a written estimate for any treatment. Most plans cover checkups and cleanings in full twice a year.',
  },
  {
    q: 'Do you take x-rays at every visit?',
    a: 'No. Adults usually have two small x-rays once a year and a full set every five years. We take more only when something needs a closer look.',
  },
  {
    q: 'What if I need to cancel?',
    a: 'Please call a day ahead so someone else can have the time. We do not charge for a first missed visit; after that it is $50.',
  },
  {
    q: 'Is the practice accessible?',
    a: 'Yes. It is on the ground floor with a step-free entrance, a wide treatment room and a chair you can transfer to from a wheelchair.',
  },
];

export default function ClearwaterDentalPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Fraunces:opsz,wght@9..144,300;9..144,400&display=swap"
      />

      {/* The sidebar is the site header: full height and fixed beside the
          content on a desktop, a top bar with a menu below 900px. */}
      <header className={s.side}>
        <a className={s.mark} href="#top">
          <span className={s.markName}>Clearwater</span>
          <span className={s.markSub}>Dental</span>
        </a>

        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className={s.sideCall}>
          <span className={s.sideLabel}>Call the front desk</span>
          <a className={s.sidePhone} href="tel:+15550142290">(555) 014-2290</a>
        </div>

        <a className={s.book} href="#book">Book a visit</a>

        <div className={s.sideHours}>
          <span className={s.sideLabel}>Hours</span>
          <dl>
            {HOURS.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
          <small className={s.sideNote}>Saturdays: the first and third of each month.</small>
        </div>

        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <div className={s.body}>
        <main id="top">
          {/* ------------------------------------------------------------ HERO */}
          <section className={s.hero} aria-labelledby="hero-h">
            <div className={s.heroText}>
              <p className={s.kicker}>Family dentistry in Brookmere</p>
              <h1 id="hero-h" className={s.heroTitle}>
                Calm, careful dentistry <em>for the whole family.</em>
              </h1>
              <p className={s.lede}>
                Checkups for toddlers and grandparents in the same afternoon,
                fees printed before you sit down, and a dentist who explains
                what she sees. New patients are welcome this month.
              </p>
              <div className={s.actions}>
                <a className={s.primary} href="#book">Book a visit</a>
                <a className={s.secondary} href="#new-patients">New patient? Start here</a>
              </div>
            </div>

            {/* The primary field: a plate of slow bubbles on the slate. */}
            <div className={s.heroPlate} aria-hidden="true">
              <TabbiedPattern
                pattern={softbubbles}
                palette={BUBBLES}
                options={{ frequency: 0.5 }}
                fit="grid"
                cellSize={72}
                redrawInterval={8400}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <dl className={s.facts}>
              {FACTS.map(([v, k]) => (
                <div key={v}>
                  <dt>{v}</dt>
                  <dd>{k}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ------------------------------------------------------ TREATMENTS */}
          <section id="treatments" className={s.sec} aria-labelledby="treatments-h">
            <div className={s.secHead}>
              <span className={s.secNo}>01</span>
              <h2 id="treatments-h">Treatments and what they cost</h2>
              <p className={s.secNote}>
                Fees before insurance. The range is the difference between a
                small job and a large one, and you will know which yours is
                before we start.
              </p>
            </div>
            <div className={s.groups}>
              {GROUPS.map((g) => (
                <div key={g.title} className={s.group}>
                  <h3>{g.title}</h3>
                  <p className={s.groupLede}>{g.lede}</p>
                  <ul className={s.fees}>
                    {g.items.map((t) => (
                      <li key={t.name}>
                        <span className={s.feeName}>{t.name}</span>
                        <span className={s.feeAmount}>{t.fee}</span>
                        <small className={s.feeNote}>{t.note}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------- NEW PATIENTS */}
          <section id="new-patients" className={s.sec} aria-labelledby="new-h">
            <div className={s.secHead}>
              <span className={s.secNo}>02</span>
              <h2 id="new-h">New patients, in four steps</h2>
              <p className={s.secNote}>
                The new patient visit is $165 without insurance, with the
                x-rays and the cleaning included.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map((st) => (
                <li key={st.no}>
                  <span className={s.stepNo}>{st.no}</span>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </li>
              ))}
            </ol>
            <div className={s.bring}>
              <h3>What to bring</h3>
              <ul>
                {BRING.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ------------------------------------------------------- INSURANCE */}
          <section id="insurance" className={s.sec} aria-labelledby="insurance-h">
            <div className={s.secHead}>
              <span className={s.secNo}>03</span>
              <h2 id="insurance-h">Insurance and paying</h2>
              <p className={s.secNote}>
                We send the claim for you and tell you your share before
                treatment, not after.
              </p>
            </div>
            <div className={s.payGrid}>
              <div className={s.payCol}>
                <h3>In network with</h3>
                <ul className={s.planList}>
                  {PLANS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className={s.payNote}>
                  Another plan? We are glad to file out of network and most
                  PPO plans still pay their share.
                </p>
              </div>
              <div className={s.payCol}>
                <h3>No insurance: the Clearwater plan</h3>
                <p className={s.payBody}>
                  Two checkups and cleanings a year, the x-rays you need, one
                  emergency exam, and 15% off any other treatment.
                </p>
                <dl className={s.memberList}>
                  {MEMBERSHIP.map(([who, price]) => (
                    <div key={who}>
                      <dt>{who}</dt>
                      <dd>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={s.payCol}>
                <h3>Spreading the cost</h3>
                <p className={s.payBody}>
                  Treatment over $500 can be paid in equal parts over 3, 6 or
                  12 months with no interest and no credit check.
                </p>
                <p className={s.payNote}>
                  We take cards, HSA and FSA cards, checks and cash. Payment
                  is due on the day for your share of each visit.
                </p>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------ TEAM */}
          <section id="team" className={s.sec} aria-labelledby="team-h">
            <div className={s.secHead}>
              <span className={s.secNo}>04</span>
              <h2 id="team-h">The people you will see</h2>
              <p className={s.secNote}>
                Three dentists, two hygienists and Grace, who knows every
                insurance form by heart.
              </p>
            </div>
            <ul className={s.team}>
              {TEAM.map((p, i) => (
                <li key={p.name} className={s.member}>
                  {/* A pattern tile stands in for the portrait. */}
                  <span className={s.avatar} aria-hidden="true">
                    <TabbiedPattern
                      pattern={pebble}
                      palette={AVATAR}
                      options={{ frequency: 0.8 }}
                      seed={`clearwater-${i}`}
                      fit="grid"
                      cellSize={24}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </span>
                  <h3>{p.name}</h3>
                  <span className={s.memberRole}>{p.role}</span>
                  <p className={s.memberNote}>{p.note}</p>
                  <span className={s.memberDays}>{p.days}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ----------------------------------------------------- EMERGENCIES */}
          <section id="emergencies" className={s.urgent} aria-labelledby="urgent-h">
            <div className={s.urgentHead}>
              <span className={s.secNo}>05</span>
              <h2 id="urgent-h">Dental emergencies</h2>
              <p className={s.urgentLede}>
                Call at 8:00 for a same-day slot. After hours, the message on
                the front desk line gives you the number of the dentist on
                call.
              </p>
              <a className={s.urgentPhone} href="tel:+15550142290">(555) 014-2290</a>
              <p className={s.urgentFee}>Emergency exam and x-ray: $95</p>
            </div>
            <dl className={s.urgentList}>
              {URGENT.map((u) => (
                <div key={u.title}>
                  <dt>{u.title}</dt>
                  <dd>{u.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ------------------------------------------------------------- FAQ */}
          <section id="faq" className={s.sec} aria-labelledby="faq-h">
            <div className={s.secHead}>
              <span className={s.secNo}>06</span>
              <h2 id="faq-h">Questions we are asked</h2>
            </div>
            <div className={s.faq}>
              {FAQ.map((f) => (
                <details key={f.q} className={s.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ----------------------------------------------------------- VISIT */}
          <section id="visit" className={s.sec} aria-labelledby="visit-h">
            <div className={s.secHead}>
              <span className={s.secNo}>07</span>
              <h2 id="visit-h">Find us, and book</h2>
              <p className={s.secNote}>
                Ground floor of the old post office, across from the library.
              </p>
            </div>
            <div className={s.visit}>
              <div className={s.where}>
                <h3>Address</h3>
                <p className={s.address}>
                  Clearwater Dental
                  <br />
                  220 Harbor Street, Suite 2
                  <br />
                  Brookmere
                </p>
                <h3>Hours</h3>
                <dl className={s.hoursList}>
                  {HOURS.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.hoursNote}>Saturdays are the first and third of each month. Evening slots go first, so book them early.</p>
                <h3>Getting here</h3>
                <ul className={s.directions}>
                  <li>Free parking behind the building, 14 spaces, two of them wide</li>
                  <li>Bus 12 and 31 stop at Harbor and Fifth, one minute away</li>
                  <li>Bike racks by the side door</li>
                </ul>
                <h3>Write</h3>
                <p>
                  <a className={s.mail} href="mailto:hello@clearwaterdental.example">hello@clearwaterdental.example</a>
                </p>
              </div>

              <form id="book" className={s.form} action="#">
                <h3 className={s.formTitle}>Request an appointment</h3>
                <p className={s.formNote}>
                  We call back within one working day to find a time.
                </p>
                <div className={s.field}>
                  <label htmlFor="cw-name">Name</label>
                  <input id="cw-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="cw-phone">Phone</label>
                  <input id="cw-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="cw-email">Email</label>
                  <input id="cw-email" name="email" type="email" autoComplete="email" />
                </div>
                <fieldset className={s.choice}>
                  <legend>I am</legend>
                  <label>
                    <input type="radio" name="who" value="new" defaultChecked />
                    <span>A new patient</span>
                  </label>
                  <label>
                    <input type="radio" name="who" value="existing" />
                    <span>A current patient</span>
                  </label>
                </fieldset>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="cw-reason">Reason for the visit</label>
                  <select id="cw-reason" name="reason" defaultValue="checkup">
                    <option value="checkup">Checkup and cleaning</option>
                    <option value="child">A child's first visit</option>
                    <option value="pain">Toothache or a broken tooth</option>
                    <option value="cosmetic">Whitening or aligners</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <fieldset className={s.choice}>
                  <legend>Times that suit you</legend>
                  <label>
                    <input type="checkbox" name="when" value="morning" />
                    <span>Mornings</span>
                  </label>
                  <label>
                    <input type="checkbox" name="when" value="afternoon" />
                    <span>Afternoons</span>
                  </label>
                  <label>
                    <input type="checkbox" name="when" value="evening" />
                    <span>Tue or Thu evening</span>
                  </label>
                  <label>
                    <input type="checkbox" name="when" value="saturday" />
                    <span>Saturday</span>
                  </label>
                </fieldset>
                <button type="submit" className={s.submit}>Send the request</button>
                <small className={s.formFine}>Please keep medical details for the phone call.</small>
              </form>
            </div>
          </section>
        </main>

        <footer className={s.footer}>
          <div className={s.footTop}>
            <p className={s.footName}>Clearwater Dental</p>
            <p className={s.footTag}>
              A family practice on Harbor Street, Brookmere.
            </p>
          </div>
          <div className={s.footFine}>
            <p>A fictional dental practice. Prices, hours and people are invented.</p>
            <p>
              <span>Patterns by </span>
              <a href="https://tabbied.com" rel="noopener">Tabbied</a>
              <span>, drawn live on the page.</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
