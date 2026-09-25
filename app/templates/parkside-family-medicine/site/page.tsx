import { TabbiedPattern } from 'tabbied/react';
import { frond, pindot } from 'tabbied/patterns';
import s from './parkside-family-medicine.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Parkside Family Medicine: Family doctors, Linden Park',
  description:
    'A family practice across from Linden Park: book an appointment, renew a prescription, get test results or travel vaccines, and register as a new patient. Same-day slots every weekday.',
};

/* Site colors. The fields sit on `transparent`, so the leaves and dots are
   drawn on whatever panel holds them. */
const SAGE = '#2E7D6B';
const CORAL = '#E86F4E';
const GRAY = '#8C9A94';
const PALE = '#DDE8E3';
const PAPER = '#F5F8F6';

const LEAVES = ['transparent', SAGE, PAPER, GRAY];
const DOTS = ['transparent', SAGE, GRAY];

const NAV = [
  ['I need to', '#paths'],
  ['Hours', '#hours'],
  ['Doctors', '#doctors'],
  ['New patients', '#new'],
  ['Questions', '#faq'],
  ['Find us', '#visit'],
];

type Path = {
  task: string;
  how: string;
  time: string;
  cta: string;
  href: string;
};

const PATHS: Path[] = [
  {
    task: 'book an appointment',
    how: 'Online through the patient portal at any hour, by phone from 8:00 am, or at the front desk.',
    time: 'Routine visits within 5 working days',
    cta: 'Book online',
    href: '#new',
  },
  {
    task: 'renew a prescription',
    how: 'Request it in the portal, ask your pharmacy to send it, or leave a slip in the box by the door.',
    time: 'Ready in 2 working days',
    cta: 'Request a renewal',
    href: '#faq',
  },
  {
    task: 'get my test results',
    how: 'They appear in the portal once a doctor has read them. The results line is open 2:00 to 4:00 pm.',
    time: 'Bloods 3-5 days, scans about a week',
    cta: 'Open the portal',
    href: '#faq',
  },
  {
    task: 'get travel vaccines',
    how: 'Book the travel clinic with Mei Chen, NP, on a Tuesday or Thursday. Bring your itinerary.',
    time: 'Come 8 weeks before you fly',
    cta: 'Book the travel clinic',
    href: '#hours',
  },
  {
    task: 'become a patient',
    how: 'Fill in the form below, then bring photo ID, your insurance card and a list of your medicines.',
    time: 'Welcome visit within 2 weeks',
    cta: 'Register now',
    href: '#new',
  },
  {
    task: 'get a form signed',
    how: 'School, sports and work forms go in the tray at the front desk or upload them in the portal.',
    time: 'Back to you in 5 working days',
    cta: 'Fees for forms',
    href: '#faq',
  },
];

type Day = {
  day: string;
  doors: string;
  phones: string;
  slots: number;
  note: string;
};

const HOURS: Day[] = [
  { day: 'Monday', doors: '7:30 am to 7 pm', phones: 'from 8 am', slots: 32, note: 'Late clinic to 7' },
  { day: 'Tuesday', doors: '8 am to 6 pm', phones: 'from 8 am', slots: 28, note: 'Travel clinic' },
  { day: 'Wednesday', doors: '8 am to 6 pm', phones: 'from 8 am', slots: 28, note: 'Baby clinic, mornings' },
  { day: 'Thursday', doors: '7:30 am to 7 pm', phones: 'from 8 am', slots: 32, note: 'Travel clinic, late to 7' },
  { day: 'Friday', doors: '8 am to 5 pm', phones: 'from 8 am', slots: 24, note: 'Flu shots in season' },
  { day: 'Saturday', doors: '9 am to noon', phones: 'from 9 am', slots: 12, note: 'Urgent visits only' },
];

const TODAY_STEPS = [
  ['Call at 8:00', 'Or ask in the portal from 7:45. Say it is for today and give a line on what is wrong.'],
  ['A nurse calls back', 'Within the hour. Some things are sorted on the phone; most get a time.'],
  ['Seen the same day', 'By a doctor or our nurse practitioner, usually before 4:00 pm.'],
];

type Doctor = {
  initials: string;
  name: string;
  role: string;
  sees: string;
  days: string;
  speaks: string;
  tone: 'sage' | 'coral' | 'pale';
};

const DOCTORS: Doctor[] = [
  {
    initials: 'AO',
    name: 'Dr. Amara Okafor, MD',
    role: 'Family physician, practice lead',
    sees: 'Diabetes, heart health, care for older adults',
    days: 'Mon, Tue, Thu',
    speaks: 'English, Igbo',
    tone: 'sage',
  },
  {
    initials: 'DR',
    name: 'Dr. Daniel Reyes, MD',
    role: 'Family physician',
    sees: 'Sports injuries, teenagers, mental health',
    days: 'Mon, Wed, Fri, Sat',
    speaks: 'English, Spanish',
    tone: 'coral',
  },
  {
    initials: 'HL',
    name: 'Dr. Hannah Lindqvist, DO',
    role: 'Family physician',
    sees: 'Pregnancy, newborns, children under 12',
    days: 'Tue, Wed, Thu',
    speaks: 'English, Swedish',
    tone: 'pale',
  },
  {
    initials: 'MC',
    name: 'Mei Chen, NP',
    role: 'Nurse practitioner',
    sees: 'Travel health, asthma, contraception',
    days: 'Tue, Thu, Fri',
    speaks: 'English, Mandarin',
    tone: 'sage',
  },
  {
    initials: 'JB',
    name: 'Joe Barrett, RN',
    role: 'Practice nurse',
    sees: 'Vaccines, dressings, blood pressure checks',
    days: 'Every weekday',
    speaks: 'English',
    tone: 'coral',
  },
];

const JOIN_STEPS = [
  ['Send the form', 'Ten minutes, below or on paper at the front desk. We confirm by email within a working day.'],
  ['Bring three things', 'Photo ID, your insurance card, and your medicines, or a list of them.'],
  ['A welcome visit', 'Thirty minutes with Joe, our practice nurse: height, weight, blood pressure and your history.'],
  ['Meet your doctor', 'We match you to one of the five. You can always ask to see someone else.'],
];

const PRICES = [
  ['Office visit, no insurance', '$95'],
  ['Welcome visit', '$60'],
  ['Travel consultation', '$40, vaccines from $55'],
  ['Forms and letters', '$20 to $45'],
];

const FAQS = [
  {
    q: 'Which insurance plans do you take?',
    a: 'Medicare, Medicaid and most employer and marketplace plans. If you are not sure about yours, call the front desk with your card in hand and we will check while you wait.',
  },
  {
    q: 'How do I renew a prescription I take every month?',
    a: 'Ask in the portal or have your pharmacy send the request. Allow two working days. Controlled medicines need a visit at least every three months.',
  },
  {
    q: 'Will you call me about my results?',
    a: 'If anything needs action, yes, the same day the doctor reads it. Normal results go to the portal with a short note, so no call means nothing to worry about.',
  },
  {
    q: 'Can I bring my children to my appointment?',
    a: 'Of course. There is a play corner in the waiting room and a changing table in both restrooms. If they need to be seen too, book a family slot: two people, one visit.',
  },
  {
    q: 'What happens when you are closed?',
    a: 'Call the practice number and press 1 for the on-call doctor, who can see your record. For chest pain, trouble breathing or a serious injury, call 911.',
  },
];

export default function ParksideFamilyMedicinePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Atkinson+Hyperlegible+Next:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <Artwork
            slug="parkside-family-medicine-heart"
            alt=""
            inks={{ red: 'var(--coral)', blue: 'var(--paper)' }}
            className={s.brandMark}
          />
          <span className={s.brandName}>Parkside Family Medicine</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="tel:+15550142200">(555) 014-2200</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The words on the left; on the right a pale panel of leaves with
            the heart and its pulse line standing in a paper disc. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Family medicine for every age, since 1998</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Your doctors,
              <br />
              <em>across from the park.</em>
            </h1>
            <p className={s.heroLede}>
              Five clinicians who know your family by name. Tell us what you
              need and we will show you the quickest way to it, online, on
              the phone or at the front desk.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#paths">What do you need?</a>
              <a className={s.btnLine} href="tel:+15550142200">Call (555) 014-2200</a>
            </div>
            <p className={s.heroNote}>Same-day slots open at 8:00 am, Monday to Saturday.</p>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={frond}
                palette={LEAVES}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={64}
                seed="parkside-leaves"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.heroDisc}>
              <Artwork
                slug="parkside-family-medicine-heart"
                alt="A heart with a pulse line running across it"
                inks={{ red: 'var(--coral)', blue: 'var(--paper)' }}
                className={s.heroHeart}
              />
            </div>
            <p className={s.heroBadge}>
              <strong>Taking new patients</strong>
              <span>All ages, most insurance plans</span>
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- PATHS
            Task first: the sentence starts in the heading and each card
            finishes it. The same-day card is the loud one. */}
        <section id="paths" className={s.paths} aria-labelledby="paths-h">
          <div className={s.pathsHead}>
            <h2 id="paths-h" className={s.pathsTitle}>I need to...</h2>
            <p className={s.pathsNote}>
              Pick the line that finishes the sentence. Each card says how to
              do it and how long it takes.
            </p>
          </div>
          <div className={s.pathGrid}>
            <div className={s.urgent}>
              <p className={s.urgentNo}>Today</p>
              <h3 className={s.urgentTask}>see someone today</h3>
              <p className={s.urgentHow}>
                Call at 8:00 am. A nurse rings you back within the hour and,
                if you need to be seen, gives you a time before 4:00 pm.
              </p>
              <Artwork
                slug="parkside-family-medicine-kit"
                alt="A first aid kit"
                inks={{ red: 'var(--paper)', blue: 'var(--coral)', black: 'var(--ink)' }}
                className={s.urgentKit}
              />
              <a className={s.urgentLink} href="tel:+15550142200">Call (555) 014-2200</a>
            </div>
            <ol className={s.pathList}>
              {PATHS.map((p, i) => (
                <li key={p.task} className={s.path}>
                  <span className={s.pathNo}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={s.pathTask}>{p.task}</h3>
                  <dl className={s.pathFacts}>
                    <div>
                      <dt>How</dt>
                      <dd>{p.how}</dd>
                    </div>
                    <div>
                      <dt>How long</dt>
                      <dd>{p.time}</dd>
                    </div>
                  </dl>
                  <a className={s.pathLink} href={p.href}>{p.cta}</a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hours} aria-labelledby="hours-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Opening hours</p>
            <h2 id="hours-h">Open six days, with slots kept back for today</h2>
            <p className={s.secNote}>
              Every morning a share of the day is held for people who wake up
              ill. The bar shows how many.
            </p>
          </div>
          <div className={s.hoursGrid}>
            <table className={s.table}>
              <caption className={s.srOnly}>Opening hours and same-day slots</caption>
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Doors open</th>
                  <th scope="col">Same-day slots</th>
                </tr>
              </thead>
              <tbody>
                {HOURS.map((d) => (
                  <tr key={d.day}>
                    <th scope="row">
                      <span className={s.dayName}>{d.day}</span>
                      <span className={s.dayNote}>{d.note}</span>
                    </th>
                    <td>
                      <span className={s.doors}>{d.doors}</span>
                      <span className={s.phones}>{`Phones ${d.phones}`}</span>
                    </td>
                    <td>
                      <span className={s.slotBar} aria-hidden="true">
                        <span className={s.slotFill} style={{ width: `${(d.slots / 32) * 100}%` }} />
                      </span>
                      <span className={s.slotCount}>{`${d.slots} slots`}</span>
                    </td>
                  </tr>
                ))}
                <tr className={s.closed}>
                  <th scope="row">
                    <span className={s.dayName}>Sunday</span>
                    <span className={s.dayNote}>On-call doctor by phone</span>
                  </th>
                  <td>
                    <span className={s.doors}>Closed</span>
                  </td>
                  <td>
                    <span className={s.slotCount}>Press 1 on our number</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={s.today}>
              <h3 className={s.todayTitle}>How a same-day visit works</h3>
              <ol className={s.todaySteps}>
                {TODAY_STEPS.map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </li>
                ))}
              </ol>
              <div className={s.emergency}>
                <p className={s.emergencyHead}>Chest pain, trouble breathing, a bad injury?</p>
                <p className={s.emergencyBody}>Do not wait for us. Call 911 or go to the emergency room at Linden General.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- DOCTORS */}
        <section id="doctors" className={s.doctors} aria-labelledby="doctors-h">
          <div className={s.doctorsHead}>
            <div className={s.secHead}>
              <p className={s.secKicker}>The team</p>
              <h2 id="doctors-h">Three doctors, a nurse practitioner and a nurse</h2>
              <p className={s.secNote}>
                You have one named doctor, and you can see any of us. Everyone
                here has worked at Parkside for at least six years.
              </p>
            </div>
            <Artwork
              slug="parkside-family-medicine-stethoscope"
              alt=""
              inks={{ red: 'var(--coral)', blue: 'var(--sage)' }}
              className={s.steth}
            />
          </div>
          <ul className={s.team}>
            {DOCTORS.map((d) => (
              <li key={d.name} className={s.member}>
                <span className={s.initials} data-tone={d.tone} aria-hidden="true">{d.initials}</span>
                <h3 className={s.memberName}>{d.name}</h3>
                <p className={s.memberRole}>{d.role}</p>
                <dl className={s.memberFacts}>
                  <div>
                    <dt>Sees</dt>
                    <dd>{d.sees}</dd>
                  </div>
                  <div>
                    <dt>In on</dt>
                    <dd>{d.days}</dd>
                  </div>
                  <div>
                    <dt>Speaks</dt>
                    <dd>{d.speaks}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- NEW PATIENTS
            A quiet field of dots behind the steps, the form on paper. */}
        <section id="new" className={s.join} aria-labelledby="new-h">
          <div className={s.joinField} aria-hidden="true">
            <TabbiedPattern
              pattern={pindot}
              palette={DOTS}
              fit="grid"
              cellSize={48}
              seed="parkside-dots"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.joinInner}>
            <div className={s.joinText}>
              <p className={s.secKicker}>New patients</p>
              <h2 id="new-h">Joining takes four steps and about two weeks</h2>
              <ol className={s.joinSteps}>
                {JOIN_STEPS.map(([title, body], i) => (
                  <li key={title}>
                    <span className={s.joinNo}>{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <dl className={s.prices}>
                {PRICES.map(([what, price]) => (
                  <div key={what}>
                    <dt>{what}</dt>
                    <dd>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <h3 className={s.formTitle}>Register with Parkside</h3>
              <p className={s.formNote}>We cover the 01770 to 01774 zip codes. Outside them, call and ask.</p>
              <div className={s.field}>
                <label htmlFor="pk-name">Full name</label>
                <input id="pk-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label htmlFor="pk-dob">Date of birth</label>
                  <input id="pk-dob" name="dob" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pk-phone">Phone</label>
                  <input id="pk-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="pk-email">Email</label>
                <input id="pk-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <div className={s.field}>
                <label htmlFor="pk-cover">How you will pay</label>
                <select id="pk-cover" name="cover" defaultValue="employer">
                  <option value="employer">Employer or marketplace plan</option>
                  <option value="medicare">Medicare</option>
                  <option value="medicaid">Medicaid</option>
                  <option value="self">Self-pay</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="pk-family">Registering others too?</label>
                <input id="pk-family" name="family" type="text" placeholder="Names and ages" />
              </div>
              <button className={s.formBtn} type="submit">Send my registration</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Questions</p>
            <h2 id="faq-h">What people ask the front desk</h2>
          </div>
          <div className={s.faqList}>
            {FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div className={s.visitHead}>
              <p className={s.secKicker}>Find us</p>
              <h2 id="visit-h">210 Linden Avenue, on the corner of the park</h2>
            </div>
            <dl className={s.visitList}>
              <div>
                <dt>Parking</dt>
                <dd>Free lot behind the building, with three accessible bays by the side door.</dd>
              </div>
              <div>
                <dt>Bus</dt>
                <dd>The 12 and the 40 stop outside; get off at Linden Park Gate.</dd>
              </div>
              <div>
                <dt>Access</dt>
                <dd>Step-free throughout, a hearing loop at reception, interpreters on request.</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+15550142200">(555) 014-2200</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:frontdesk@parksidemed.example">frontdesk@parksidemed.example</a>
                </dd>
              </div>
              <div>
                <dt>Fax</dt>
                <dd>(555) 014-2201</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Parkside Family Medicine</p>
            <p className={s.footTag}>Family doctors across from Linden Park since 1998.</p>
          </div>
          <div>
            <h2 className={s.footHead}>I need to</h2>
            <ul className={s.footLinks}>
              <li><a href="#paths">Book an appointment</a></li>
              <li><a href="#paths">Renew a prescription</a></li>
              <li><a href="#new">Become a patient</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Practice</h2>
            <ul className={s.footLinks}>
              <li><a href="#hours">Opening hours</a></li>
              <li><a href="#doctors">Doctors and nurses</a></li>
              <li><a href="#visit">Parking and access</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>After hours</h2>
            <p className={s.footText}>Call (555) 014-2200 and press 1. In an emergency, call 911.</p>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional family practice. Doctors, hours, prices and the address are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
