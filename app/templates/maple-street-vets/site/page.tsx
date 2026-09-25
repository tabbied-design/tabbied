import { TabbiedPattern } from 'tabbied/react';
import { pebble, tealboomerang } from 'tabbied/patterns';
import s from './maple-street-vets.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Maple Street Vets: Veterinary clinic, Maple Street',
  description:
    'Maple Street Vets is an independent clinic for cats, dogs and small pets, open seven days with a 24-hour emergency line. Vaccinations, dental care, surgery, health plans and clear fees.',
};

/* Site colors, the same hexes as the root rule. */
const PAPER = '#FBF8F3';
const TEAL = '#1B8A8F';
const APRICOT = '#F29E6D';
const PALE = '#E8EFEE';

/* The dashboard tile: boomerangs on a teal plate. */
const TILE = ['transparent', TEAL, APRICOT, PAPER, PALE];
/* The new-client panel: pebbles in the page's own colors on the pale card. */
const PEBBLES = ['transparent', TEAL, APRICOT, PAPER];

const NAV = [
  ['Today', '#today'],
  ['Services', '#services'],
  ['Health plans', '#plans'],
  ['Our team', '#team'],
  ['New clients', '#new'],
  ['Fees', '#fees'],
  ['Find us', '#find'],
];

const PHONE = '(555) 017-3300';
const EMERGENCY = '(555) 017-3399';

const WEEK = [
  ['Mon-Fri', '8am-7pm'],
  ['Saturday', '9am-4pm'],
  ['Sunday', '10am-2pm'],
];

type Service = {
  title: string;
  who: string;
  body: string;
  price: string;
};

const SERVICES: Service[] = [
  {
    title: 'Vaccinations',
    who: 'Vet',
    body: 'Puppy and kitten courses, yearly boosters and kennel cough. Every vaccination comes with a full health check, nose to tail.',
    price: 'Booster from $58',
  },
  {
    title: 'Dental care',
    who: 'Vet and nurse',
    body: 'Free dental checks with a nurse, then a scale and polish under anesthetic when it is needed, with X-rays of every tooth.',
    price: 'Scale and polish from $340',
  },
  {
    title: 'Surgery',
    who: 'Vet',
    body: 'Neutering, lump removals and soft-tissue surgery in our own theater, with a nurse watching every patient from sleep to waking.',
    price: 'Cat neuter from $185',
  },
  {
    title: 'Nutrition',
    who: 'Nurse clinic',
    body: 'Weight clinics, diets for sensitive stomachs and kidney care. We weigh, plan and check in every four weeks until it works.',
    price: 'Free for plan members',
  },
  {
    title: 'Microchips and travel',
    who: 'Nurse clinic',
    body: 'Microchipping in a normal appointment, and the certificates and treatments your pet needs to travel abroad with you.',
    price: 'Microchip $35',
  },
  {
    title: 'Senior pets',
    who: 'Vet',
    body: 'A longer appointment every six months for cats and dogs over eight, with blood pressure, bloods and a plan for arthritis.',
    price: 'Senior check $84',
  },
];

type Plan = {
  name: string;
  size: string;
  price: string;
  featured: boolean;
};

const PLANS: Plan[] = [
  { name: 'Cat', size: 'Any size', price: '$19', featured: false },
  { name: 'Small dog', size: 'Up to 22 lb', price: '$21', featured: false },
  { name: 'Medium dog', size: '22-55 lb', price: '$24', featured: true },
  { name: 'Large dog', size: 'Over 55 lb', price: '$29', featured: false },
];

const PLAN_INCLUDES = [
  'Yearly vaccinations and booster check',
  'Two health checks with a vet a year',
  'Flea, tick and worm treatment, posted monthly',
  'Unlimited nurse clinics',
  '10% off everything else, including surgery',
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type Person = {
  name: string;
  role: string;
  quals: string;
  note: string;
  days: boolean[];
  daysLabel: string;
};

const TEAM: Person[] = [
  {
    name: 'Dr. Ruth Okafor',
    role: 'Vet, clinical director',
    quals: 'DVM, 18 years in practice',
    note: 'Soft-tissue surgery and the cats nobody else can catch.',
    days: [true, true, false, true, true, false, false],
    daysLabel: 'In clinic Monday, Tuesday, Thursday and Friday',
  },
  {
    name: 'Dr. Tomas Lindqvist',
    role: 'Vet',
    quals: 'DVM, dentistry certificate',
    note: 'Teeth, mostly, and the older dogs he calls his regulars.',
    days: [false, true, true, true, false, true, false],
    daysLabel: 'In clinic Tuesday, Wednesday, Thursday and Saturday',
  },
  {
    name: 'Dr. Amara Singh',
    role: 'Vet',
    quals: 'DVM, internal medicine',
    note: 'Itchy skin, sore tummies and anything that is hard to pin down.',
    days: [true, false, true, false, true, false, true],
    daysLabel: 'In clinic Monday, Wednesday, Friday and Sunday',
  },
  {
    name: 'Jo Petersen',
    role: 'Head nurse',
    quals: 'Credentialed vet technician',
    note: 'Runs the weight and dental clinics and the theater list.',
    days: [true, true, true, true, false, false, false],
    daysLabel: 'In clinic Monday to Thursday',
  },
  {
    name: 'Sam Achebe',
    role: 'Nurse',
    quals: 'Credentialed vet technician',
    note: 'Puppy parties, microchips and the nervous ones.',
    days: [false, false, true, true, true, true, false],
    daysLabel: 'In clinic Wednesday to Saturday',
  },
  {
    name: 'Lena Moreau',
    role: 'Client care',
    quals: 'Front desk and insurance claims',
    note: 'Answers the phone, books you in and sends the claim forms.',
    days: [true, true, false, true, true, false, true],
    daysLabel: 'In clinic Monday, Tuesday, Thursday, Friday and Sunday',
  },
];

const STEPS = [
  {
    no: '1',
    title: 'Register',
    body: 'Five minutes online or at the desk. Registering is free and there is no joining fee.',
  },
  {
    no: '2',
    title: 'We fetch the records',
    body: "Tell us your old clinic and we ask for your pet's history, so you do not have to.",
  },
  {
    no: '3',
    title: 'A free first check',
    body: 'A 20-minute nurse appointment to meet your pet, weigh them and talk about what they need.',
  },
];

const FEES = [
  ['Consultation with a vet, 15 minutes', '$68'],
  ['Follow-up for the same problem, within 10 days', '$38'],
  ['Nurse clinic, 20 minutes', '$32'],
  ['Senior check, 30 minutes', '$84'],
  ['Home visit, within 3 miles', '$95 + consultation'],
  ['Emergency consultation, 7pm-8am', '$165'],
  ['Written prescription', '$22'],
  ['Repeat prescription, collected', 'Free'],
];

export default function MapleStreetVetsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbf8f3',
        '--ink': '#1d2a30',
        '--teal': '#1b8a8f',
        '--apricot': '#f29e6d',
        '--gray': '#8c979b',
        '--pale': '#e8efee',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,teal,apricot,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Outfit:wght@400;500;600&display=swap"
      />

      {/* The emergency line sits above everything, on every screen. */}
      <div className={s.alert} role="note">
        <strong data-edit="page.alertLabel" className={s.alertLabel}>Emergency?</strong>
        <span data-edit="page.alertText" data-edit-max="60" className={s.alertText}>We answer 24 hours a day, every day.</span>
        <a data-edit="page.alertPhone" data-edit-max="28" className={s.alertPhone} href="tel:+15550173399">{EMERGENCY}</a>
      </div>

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDot} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Maple Street Vets</span>
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
        {/* ------------------------------------------------------- DASHBOARD
            The page opens as a board of cards: who we are, when we are
            open, the emergency line, booking and repeat prescriptions,
            with the boomerang tile as the one picture. */}
        <section id="today" className={s.dash} aria-labelledby="hero-h">
          <div className={s.cardWelcome}>
            <p data-edit="today.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Independent vets for cats, dogs and small pets</p>
            <div>
              <h1 data-edit="today.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Your pet's vets, <em>just off Maple Street.</em>
              </h1>
              <p data-edit="today.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
                Three vets, three nurses and one waiting room with a separate
                corner for cats. Same-day appointments for anything that
                cannot wait, and a vet on the phone at 3am if it comes to that.
              </p>
              <div className={s.actions}>
                <a data-edit="today.btn" data-edit-max="28" className={s.btn} href="#book">Book an appointment</a>
                <a data-edit="today.btnGhost" data-edit-max="28" className={s.btnGhost} href="#new">Register a new pet</a>
              </div>
            </div>
          </div>

          <div className={s.card}>
            <div className={s.cardHead}>
              <span className={s.dotLive} aria-hidden="true" />
              <h2 data-edit="today.cardLabel" data-edit-max="60" className={s.cardLabel}>Hours</h2>
            </div>
            <p data-edit="today.cardBig" data-edit-max="240" data-edit-multiline className={s.cardBig}>Open 7 days</p>
            <dl className={s.miniHours}>
              {WEEK.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`today.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`today.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.cardDark}>
            <div className={s.cardHead}>
              <span className={s.dotAlert} aria-hidden="true" />
              <h2 data-edit="today.cardLabel2" data-edit-max="60" className={s.cardLabel}>Emergency line</h2>
            </div>
            <a data-edit="today.cardPhone" data-edit-max="28" className={s.cardPhone} href="tel:+15550173399">{EMERGENCY}</a>
            <p data-edit="today.cardNote" data-edit-max="240" data-edit-multiline className={s.cardNote}>
              A vet answers day and night. After 7pm, come to the side door on
              Elm Row and ring the bell.
            </p>
          </div>

          <div id="book" className={s.card}>
            <div className={s.cardHead}>
              <span className={s.dotTeal} aria-hidden="true" />
              <h2 data-edit="today.cardLabel3" data-edit-max="60" className={s.cardLabel}>Book</h2>
            </div>
            <p data-edit="today.cardBig2" data-edit-max="240" data-edit-multiline className={s.cardBig}>Same-day slots</p>
            <p data-edit="today.cardNote2" data-edit-max="240" data-edit-multiline className={s.cardNote}>
              Held back every morning for pets who are unwell. Routine visits
              are usually free within three days.
            </p>
            <div className={s.cardLinks}>
              <a data-edit="today.link" data-edit-max="28" href="tel:+15550173300">{PHONE}</a>
              <a data-edit="today.link2" data-edit-max="28" href="mailto:hello@maplestreetvets.example">Book by email</a>
            </div>
          </div>

          <div className={s.card}>
            <div className={s.cardHead}>
              <span className={s.dotTeal} aria-hidden="true" />
              <h2 data-edit="today.cardLabel4" data-edit-max="60" className={s.cardLabel}>Repeat prescriptions</h2>
            </div>
            <p data-edit="today.cardBig3" data-edit-max="240" data-edit-multiline className={s.cardBig}>Ready in 48 hours</p>
            <p data-edit="today.cardNote3" data-edit-max="240" data-edit-multiline className={s.cardNote}>
              Order by email with your pet's name and the medicine. Collect
              from the desk, or we post it for $6.
            </p>
            <div className={s.cardLinks}>
              <a data-edit="today.link3" data-edit-max="28" href="mailto:scripts@maplestreetvets.example">scripts@maplestreetvets.example</a>
            </div>
          </div>

          <div data-edit-pattern="today.field" data-edit-roles="transparent,2,3,0,5" className={s.cardTile} aria-hidden="true">
            <TabbiedPattern
              pattern={tealboomerang}
              palette={TILE}
              options={{ frequency: 0.9 }}
              fit="grid"
              cellSize={100}
              seed="maple-tile"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.card}>
            <div className={s.cardHead}>
              <span className={s.dotTeal} aria-hidden="true" />
              <h2 data-edit="today.cardLabel5" data-edit-max="60" className={s.cardLabel}>Health plans</h2>
            </div>
            <p data-edit="today.cardBig4" data-edit-max="240" data-edit-multiline className={s.cardBig}>From $19 a month</p>
            <p data-edit="today.cardNote4" data-edit-max="240" data-edit-multiline className={s.cardNote}>
              Vaccinations, checks and parasite treatment spread across the
              year, with 10% off everything else.
            </p>
            <div className={s.cardLinks}>
              <a data-edit="today.plans" data-edit-max="28" href="#plans">Compare the plans</a>
            </div>
          </div>

          <div className={s.card}>
            <div className={s.cardHead}>
              <span className={s.dotTeal} aria-hidden="true" />
              <h2 data-edit="today.cardLabel6" data-edit-max="60" className={s.cardLabel}>Find us</h2>
            </div>
            <p data-edit="today.cardBig5" data-edit-max="240" data-edit-multiline className={s.cardBig}>112 Maple Street</p>
            <p data-edit="today.cardNote5" data-edit-max="240" data-edit-multiline className={s.cardNote}>
              Twelve parking spaces behind the clinic, off Elm Row. The number
              9 bus stops outside.
            </p>
            <div className={s.cardLinks}>
              <a data-edit="today.find" data-edit-max="28" href="#find">Directions and parking</a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <h2 data-edit="services.title" data-edit-max="60" id="services-h">Services</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Everything a pet needs in a normal life, under one roof. Prices
              include the examination; medicines are itemized on the bill.
            </p>
          </div>
          <ul className={s.services}>
            {SERVICES.map((sv, i) => (
              <li key={sv.title} className={s.svc}>
                <span data-edit={`services.svcWho.${i}`} data-edit-max="60" className={s.svcWho}>{sv.who}</span>
                <h3 data-edit={`services.title2.${i}`} data-edit-max="40">{sv.title}</h3>
                <p data-edit={`services.svcBody.${i}`} data-edit-max="240" data-edit-multiline className={s.svcBody}>{sv.body}</p>
                <span data-edit={`services.svcPrice.${i}`} data-edit-max="60" className={s.svcPrice}>{sv.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- PLANS */}
        <section id="plans" className={s.sec} aria-labelledby="plans-h">
          <div className={s.secHead}>
            <h2 data-edit="plans.title" data-edit-max="60" id="plans-h">Pet health plans</h2>
            <p data-edit="plans.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One monthly payment for the routine care every pet needs. No
              waiting period, and you can leave after twelve months.
            </p>
          </div>
          <div className={s.plans}>
            <ul className={s.planCards}>
              {PLANS.map((p, i) => (
                <li key={p.name} className={p.featured ? s.planFeatured : s.plan}>
                  <h3 data-edit={`plans.title2.${i}`} data-edit-max="40">{p.name}</h3>
                  <span data-edit={`plans.planSize.${i}`} data-edit-max="60" className={s.planSize}>{p.size}</span>
                  <strong data-edit={`plans.planPrice.${i}`} className={s.planPrice}>{p.price}</strong>
                  <span data-edit={`plans.planPer.${i}`} data-edit-max="60" className={s.planPer}>a month</span>
                </li>
              ))}
            </ul>
            <div className={s.planIncludes}>
              <h3 data-edit="plans.title3" data-edit-max="40">Every plan includes</h3>
              <ul>
                {PLAN_INCLUDES.map((it, i) => (
                  <li data-edit={`plans.item.${i}`} data-edit-max="80" key={it}>{it}</li>
                ))}
              </ul>
              <p data-edit="plans.planNote" data-edit-max="240" data-edit-multiline className={s.planNote}>
                Rabbits and guinea pigs have their own plan at $12 a month. Ask
                at the desk.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM
            Each person is a card with the week under it, the days they are
            in the clinic filled in. */}
        <section id="team" className={s.sec} aria-labelledby="team-h">
          <div className={s.secHead}>
            <h2 data-edit="team.title" data-edit-max="60" id="team-h">Vets and nurses</h2>
            <p data-edit="team.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Ask for the same vet each time and we will do our best. The
              week under each name shows the days they are in.
            </p>
          </div>
          <ul className={s.team}>
            {TEAM.map((p, i) => (
              <li key={p.name} className={s.person}>
                <span data-edit={`team.personRole.${i}`} data-edit-max="60" className={s.personRole}>{p.role}</span>
                <h3 data-edit={`team.title2.${i}`} data-edit-max="40">{p.name}</h3>
                <span data-edit={`team.personQuals.${i}`} data-edit-max="60" className={s.personQuals}>{p.quals}</span>
                <p data-edit={`team.personNote.${i}`} data-edit-max="240" data-edit-multiline className={s.personNote}>{p.note}</p>
                <span data-edit={`team.srOnly.${i}`} data-edit-max="60" className={s.srOnly}>{p.daysLabel}</span>
                <ol className={s.days} aria-hidden="true">
                  {DAYS.map((d, j) => (
                    <li data-edit={`team.dayOn.${i}.${j}`} data-edit-max="80" key={`${i}-${j}`} className={p.days[j] ? s.dayOn : s.day}>{d}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- NEW CLIENTS */}
        <section id="new" className={s.sec} aria-labelledby="new-h">
          <div className={s.newGrid}>
            <div className={s.newCard}>
              <h2 data-edit="new.title" data-edit-max="60" id="new-h">New clients</h2>
              <p data-edit="new.newLede" data-edit-max="240" data-edit-multiline className={s.newLede}>
                We are taking on new cats, dogs, rabbits and guinea pigs.
                Registering takes three steps, and the first one is the only
                one you have to do.
              </p>
              <ol className={s.steps}>
                {STEPS.map((st, i) => (
                  <li key={st.no}>
                    <span data-edit={`new.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                    <h3 data-edit={`new.title2.${i}`} data-edit-max="40">{st.title}</h3>
                    <p data-edit={`new.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
                  </li>
                ))}
              </ol>
              <a data-edit="new.btn" data-edit-max="28" className={s.btn} href="mailto:hello@maplestreetvets.example">Register by email</a>
            </div>
            <div data-edit-pattern="new.field" data-edit-roles="transparent,2,3,0" className={s.newPanel} aria-hidden="true">
              <TabbiedPattern
                pattern={pebble}
                palette={PEBBLES}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={64}
                seed="maple-pebbles"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <h2 data-edit="fees.title" data-edit-max="60" id="fees-h">Fees</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              What a visit costs before any medicine or tests. We always give
              you an estimate before treatment, and ask before going over it.
            </p>
          </div>
          <div className={s.fees}>
            <table className={s.feeTable}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>Consultation and clinic fees</caption>
              <thead>
                <tr>
                  <th data-edit="fees.heading" scope="col">Appointment</th>
                  <th data-edit="fees.heading2" scope="col">Fee</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map(([what, fee], i) => (
                  <tr key={what}>
                    <td data-edit={`fees.cell.${i}`}>{what}</td>
                    <td data-edit={`fees.cell2.${i}`}>{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={s.payCard}>
              <h3 data-edit="fees.title2" data-edit-max="40">Paying</h3>
              <p data-edit="fees.body" data-edit-max="240" data-edit-multiline>
                Payment is due on the day, by card or cash. For bills over $500
                we offer a three-month payment plan with no interest.
              </p>
              <h3 data-edit="fees.title3" data-edit-max="40">Insurance</h3>
              <p data-edit="fees.body2" data-edit-max="240" data-edit-multiline>
                We claim directly from most insurers, so you pay only the
                excess. Bring your policy number to the first visit.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FIND */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.secHead}>
            <h2 data-edit="find.title" data-edit-max="60" id="find-h">Find us</h2>
            <p data-edit="find.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              On the corner of Maple Street and Elm Row, opposite the library.
            </p>
          </div>
          <div className={s.findGrid}>
            <div className={s.card}>
              <h3 data-edit="find.cardLabel" data-edit-max="40" className={s.cardLabel}>Address</h3>
              <p data-edit="find.body" data-edit-max="240" data-edit-multiline className={s.findAddr}>
                Maple Street Vets
                <br />
                112 Maple Street
                <br />
                Corner of Elm Row
              </p>
            </div>
            <div className={s.card}>
              <h3 data-edit="find.cardLabel2" data-edit-max="40" className={s.cardLabel}>Getting here</h3>
              <ul className={s.findList}>
                <li data-edit="find.item" data-edit-max="80">Parking behind the clinic, entrance on Elm Row</li>
                <li data-edit="find.item2" data-edit-max="80">Bus 9 and 14 to Maple Street Library</li>
                <li data-edit="find.item3" data-edit-max="80">Step-free entrance and a pet ramp</li>
              </ul>
            </div>
            <div className={s.card}>
              <h3 data-edit="find.cardLabel3" data-edit-max="40" className={s.cardLabel}>Call or write</h3>
              <ul className={s.findList}>
                <li>
                  <a data-edit="find.link" data-edit-max="28" href="tel:+15550173300">{PHONE}</a>
                </li>
                <li>
                  <a data-edit="find.link2" data-edit-max="28" href="mailto:hello@maplestreetvets.example">hello@maplestreetvets.example</a>
                </li>
                <li>
                  <span data-edit="find.text" data-edit-max="60">Emergencies, day or night: </span>
                  <a data-edit="find.link3" data-edit-max="28" href="tel:+15550173399">{EMERGENCY}</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Maple Street Vets</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>An independent veterinary clinic, open seven days.</p>
          </div>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.services" data-edit-max="28" href="#services">Services</a></li>
            <li><a data-edit="footer.plans" data-edit-max="28" href="#plans">Health plans</a></li>
            <li><a data-edit="footer.team" data-edit-max="28" href="#team">Vets and nurses</a></li>
          </ul>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.new" data-edit-max="28" href="#new">New clients</a></li>
            <li><a data-edit="footer.fees" data-edit-max="28" href="#fees">Fees</a></li>
            <li><a data-edit="footer.find" data-edit-max="28" href="#find">Find us</a></li>
          </ul>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
            112 Maple Street
            <br />
            (555) 017-3300
            <br />
            hello@maplestreetvets.example
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional veterinary clinic. Prices, hours and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
