import { TabbiedPattern } from 'tabbied/react';
import { ortho, halftone } from 'tabbied/patterns';
import s from './solefit-podiatry.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Solefit Podiatry: Foot and ankle clinic, Harwood Square',
  description:
    'Solefit Podiatry treats heel pain, ingrown toenails, bunions, running injuries and diabetic feet on Harwood Square. Conditions A to Z, how treatment works, fees and booking, no referral needed.',
};

/* Site colors. The squares are ortho, drawn in ink and signal red on a
   transparent ground, their frames thickening row by row down the field.
   The booking panel's halftone is ink only. */
const INK = '#141414';
const RED = '#e2231a';

const SQUARES = ['transparent', INK, INK, RED, INK, INK];
const STRIP = ['transparent', RED, INK, INK, RED, INK];
const DOTS = ['transparent', INK, RED];

const NAV = [
  ['Conditions', '#conditions'],
  ['Treatment', '#treatment'],
  ['First visit', '#first-visit'],
  ['Fees', '#fees'],
  ['Podiatrists', '#podiatrists'],
  ['Clinic', '#clinic'],
];

const META = [
  ['Podiatry clinic', 'Feet, ankles and the way you walk'],
  ['Harwood Square', '14 Linden Street, second floor'],
  ['No referral needed', 'Book directly, by phone or online'],
  ['Open six days', 'Weekdays 8 to 7, Saturday 9 to 1'],
];

const STATS = [
  ['5', 'working days: the longest anyone has waited for a first appointment this year'],
  ['45', 'minutes for a first assessment, with time left for your questions'],
  ['$120', 'for that assessment, the same fee for everyone who walks in'],
  ['4', 'podiatrists and one assistant, all in the clinic every week'],
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type Condition = { name: string; note: string; see: string[] };

const INDEX: { letter: string; items: Condition[] }[] = [
  { letter: 'A', items: [
    { name: 'Achilles tendinopathy', note: 'Pain and thickening at the back of the heel, worst first thing in the morning.', see: ['02.3', '02.4'] },
    { name: 'Ankle sprains that keep happening', note: 'Strength, balance and support, so the next one does not.', see: ['02.6'] },
  ] },
  { letter: 'B', items: [
    { name: 'Bunions', note: 'Hallux valgus. Footwear, padding and orthotics, and a surgical referral when that is right.', see: ['02.3'] },
  ] },
  { letter: 'C', items: [
    { name: 'Calluses and corns', note: 'Pared away painlessly, and the pressure behind them found.', see: ['02.1'] },
    { name: 'Chilblains', note: 'Itchy, swollen toes in cold weather.', see: ['02.1'] },
  ] },
  { letter: 'D', items: [
    { name: 'Diabetic foot', note: 'Yearly checks of sensation and circulation, and wounds that are slow to heal.', see: ['02.7'] },
  ] },
  { letter: 'F', items: [
    { name: 'Flat feet', note: 'In adults, and in children only when it hurts.', see: ['02.3', '02.6'] },
    { name: 'Fungal nails', note: 'Thick, discolored nails: tested first, then treated.', see: ['02.1'] },
  ] },
  { letter: 'H', items: [
    { name: 'Hammer and claw toes', note: 'Splints, padding and shoes with room in them.', see: ['02.1', '02.3'] },
    { name: 'Heel pain', note: 'Usually plantar fasciitis. Most cases settle within three months.', see: ['02.3', '02.4'] },
  ] },
  { letter: 'I', items: [
    { name: 'Ingrown toenails', note: 'Partial nail removal under local anesthetic, back in shoes the next day.', see: ['02.2'] },
  ] },
  { letter: 'M', items: [
    { name: 'Metatarsalgia', note: 'Pain under the ball of the foot.', see: ['02.3'] },
    { name: 'Morton\'s neuroma', note: 'Burning or numbness between the third and fourth toes.', see: ['02.3', '02.8'] },
  ] },
  { letter: 'P', items: [
    { name: 'Plantar warts', note: 'Verrucas that have not gone on their own after a year.', see: ['02.5'] },
    { name: 'Pes cavus', note: 'High arches, and the rolled ankles that come with them.', see: ['02.3'] },
  ] },
  { letter: 'R', items: [
    { name: 'Running injuries', note: 'From shin splints to stress fractures, with a gait study.', see: ['02.6'] },
  ] },
  { letter: 'S', items: [
    { name: 'Sever\'s disease', note: 'Heel pain in active children between eight and fourteen.', see: ['02.3'] },
    { name: 'Shin splints', note: 'Pain along the inside edge of the shin bone.', see: ['02.6'] },
  ] },
  { letter: 'T', items: [
    { name: 'Tarsal tunnel syndrome', note: 'Nerve pain and tingling on the inside of the ankle.', see: ['02.8'] },
  ] },
  { letter: 'V', items: [
    { name: 'Verrucas', note: 'See plantar warts.', see: ['02.5'] },
  ] },
];

const HAS = new Set(INDEX.map((g) => g.letter));
const STRIP_LETTERS = LETTERS.map((l) => ({ l, on: HAS.has(l), href: `#idx-${l.toLowerCase()}` }));

const STEPS = [
  ['Assessment', '45 minutes. We ask, look, press, and watch you walk, barefoot and in your own shoes.'],
  ['Diagnosis', 'Before you leave, in plain words and in writing, including what we are not yet sure of.'],
  ['Plan', 'The options and what each one costs. You choose; nothing is done on the day unless you want it.'],
  ['Treatment', 'In the clinic, at home, or both. Most plans take two to four visits.'],
  ['Review', 'Six weeks on, to check it worked. If it has not, we change the plan or refer you on.'],
];

const TREATMENTS = [
  ['02.1', 'Routine foot care', 'Nails cut and thinned, corns and calluses removed, skin and circulation checked.', '30 min'],
  ['02.2', 'Nail surgery', 'Part or all of a nail removed under local anesthetic, with phenol so it does not grow back.', '60 min, two dressings'],
  ['02.3', 'Custom orthotics', 'A 3D scan of each foot, insoles milled here in the clinic, then fitted and adjusted.', 'Two visits, two weeks apart'],
  ['02.4', 'Shockwave therapy', 'Pulses of pressure over a painful tendon or fascia to restart the healing.', 'Three to five weekly sessions'],
  ['02.5', 'Verruca needling', 'The wart punctured under local anesthetic, so the body finally notices it.', '45 min, usually once'],
  ['02.6', 'Gait and running analysis', 'Treadmill video from three angles, a pressure plate and strength tests.', '75 min'],
  ['02.7', 'Diabetic foot review', 'Sensation, pulses, skin and nails, with a written risk grade for your doctor.', '40 min, once a year'],
  ['02.8', 'Injection therapy', 'Ultrasound-guided, for neuromas and painful small joints.', '30 min'],
];

const VISIT = [
  { title: 'Bring', items: ['The shoes you wear most, however worn', 'Any insoles or orthotics, ours or anyone\'s', 'A list of the medicines you take', 'Your running watch, if you run'] },
  { title: 'Wear', items: ['Shorts, or trousers that roll above the knee', 'Socks you do not mind taking off', 'Nothing you need to arrive early for: we run to time'] },
  { title: 'Leave with', items: ['A diagnosis, in writing, by email the same day', 'The fee for anything we suggest, before it starts', 'A follow-up booked only if you want one'] },
];

const FEES = [
  ['First assessment', '45 min', '$120'],
  ['Follow-up appointment', '30 min', '$85'],
  ['Routine foot care', '30 min', '$70'],
  ['Gait and running analysis', '75 min', '$160'],
  ['Custom orthotics, a pair, two reviews included', 'Two visits', '$420'],
  ['Nail surgery, one side of one nail', '60 min', '$450'],
  ['Nail surgery, each further side', 'Same visit', '$150'],
  ['Shockwave therapy, per session', '20 min', '$95'],
  ['Verruca needling', '45 min', '$300'],
  ['Diabetic foot review', '40 min', '$90'],
  ['Injection therapy', '30 min', '$180'],
];

const FEE_NOTES = [
  ['Insurance', 'We are out of network with every insurer and do not bill them directly. You get an itemized receipt with the codes on it the same day; most plans refund part of it.'],
  ['Paying', 'At the desk, after the appointment. Card, HSA and FSA cards. No deposits except for nail surgery.'],
  ['Children', 'Under sixteen, the first assessment is $95, and a parent stays in the room.'],
  ['Cancelling', 'With a day of notice there is no charge. Later than that, or not at all, it is $40.'],
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S'];

const PEOPLE = [
  { name: 'Dr. Ines Albrecht', role: 'Podiatrist, DPM. Founded the clinic in 2011', focus: 'Heel and Achilles pain, shockwave therapy, orthotics', on: [true, true, false, true, false, false] },
  { name: 'Dr. Marcus Obi', role: 'Podiatrist, DPM', focus: 'Running injuries and gait analysis. Has run the city marathon eleven times, badly twice', on: [false, true, true, false, true, true] },
  { name: 'Dr. Hana Kovac', role: 'Podiatrist, DPM', focus: 'Nail surgery, diabetic foot care and wounds that will not close', on: [true, false, true, true, true, false] },
  { name: 'Priya Raman', role: 'Podiatry assistant', focus: 'Routine care, children\'s appointments and orthotic fittings', on: [true, true, true, true, true, true] },
];

const HOURS = [
  ['Monday to Friday', '8:00-19:00'],
  ['Saturday', '9:00-13:00'],
  ['Sunday', 'Closed'],
];

const GETTING = [
  ['Tram', 'Line 4 to Harwood Square, then two minutes on foot.'],
  ['Access', 'Step-free, with a lift from the street. Every chair lowers to 45 cm.'],
  ['Parking', 'Two bays behind the building. Ask at the desk for a permit.'],
];

export default function SolefitPodiatryPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Solefit Podiatry</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBook} href="#book">Book</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.cols} aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={`col-${i}`} />
            ))}
          </div>

          <dl className={s.meta}>
            {META.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h1 id="hero-h" className={s.name}>Solefit Podiatry</h1>

          <div className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={ortho}
              palette={SQUARES}
              fit="grid"
              cellSize={56}
              seed="solefit-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.heroText}>
            <p className={s.lede}>
              Heel pain, ingrown toenails, bunions, running injuries and
              diabetic foot care, seen by four podiatrists in one clinic above
              the pharmacy on Harwood Square.
            </p>
            <p className={s.ctas}>
              <a className={s.btn} href="#book">Book an assessment</a>
              <a className={s.textLink} href="#conditions">Conditions A to Z</a>
            </p>
          </div>

          <ul className={s.stats}>
            {STATS.map(([n, t]) => (
              <li key={n}>
                <strong>{n}</strong>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------ 01 CONDITIONS */}
        <section id="conditions" className={s.sec} aria-labelledby="conditions-h">
          <div className={s.secHead}>
            <p className={s.num}>01</p>
            <h2 id="conditions-h">Conditions, A to Z</h2>
            <p className={s.secNote}>
              What we see most, with the treatments we usually start with.
              The numbers point to section 02. If your problem is not here,
              call: it is still very likely a foot.
            </p>
          </div>

          <nav className={s.letters} aria-label="Conditions by letter">
            {STRIP_LETTERS.map((x) => (x.on ? (
              <a key={x.l} href={x.href}>{x.l}</a>
            ) : (
              <span key={x.l} aria-hidden="true">{x.l}</span>
            )))}
          </nav>

          <div className={s.index}>
            {INDEX.map((g) => (
              <div key={g.letter} id={`idx-${g.letter.toLowerCase()}`} className={s.group}>
                <h3 className={s.groupLetter}>{g.letter}</h3>
                <ul className={s.groupList}>
                  {g.items.map((c) => (
                    <li key={c.name}>
                      <h4>{c.name}</h4>
                      <p>{c.note}</p>
                      <p className={s.see}>
                        {c.see.map((ref) => (
                          <span key={ref}>{ref}</span>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------- 02 TREATMENT */}
        <section id="treatment" className={s.sec} aria-labelledby="treatment-h">
          <div className={s.secHead}>
            <p className={s.num}>02</p>
            <h2 id="treatment-h">Treatment, in five steps</h2>
            <p className={s.secNote}>
              The same order for every problem, from a stubborn nail to a
              stress fracture.
            </p>
          </div>

          <ol className={s.steps}>
            {STEPS.map(([t, d]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>

          <div className={s.strip} aria-hidden="true">
            <TabbiedPattern
              pattern={ortho}
              palette={STRIP}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={48}
              seed="solefit-strip"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <table className={s.treatments}>
            <caption className={s.srOnly}>Treatments, what happens and how long they take</caption>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Treatment</th>
                <th scope="col">What happens</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {TREATMENTS.map(([no, name, what, time]) => (
                <tr key={no}>
                  <td className={s.tNo}>{no}</td>
                  <th scope="row">{name}</th>
                  <td>{what}</td>
                  <td className={s.tTime}>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ------------------------------------------------ 03 FIRST VISIT */}
        <section id="first-visit" className={s.sec} aria-labelledby="first-h">
          <div className={s.secHead}>
            <p className={s.num}>03</p>
            <h2 id="first-h">Your first visit</h2>
            <p className={s.secNote}>
              Forty-five minutes with one podiatrist, in a room with a
              treatment chair, a walkway and a scanner.
            </p>
          </div>

          <div className={s.visit}>
            {VISIT.map((v) => (
              <div key={v.title} className={s.visitCol}>
                <h3>{v.title}</h3>
                <ul>
                  {v.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- 04 FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p className={s.num}>04</p>
            <h2 id="fees-h">Fees</h2>
            <p className={s.secNote}>
              Every fee we charge, as of September. They change once a year,
              in January, and never mid-treatment.
            </p>
          </div>

          <div className={s.feesGrid}>
            <table className={s.fees}>
              <caption className={s.srOnly}>Fees by appointment type</caption>
              <thead>
                <tr>
                  <th scope="col">Appointment</th>
                  <th scope="col">Time</th>
                  <th scope="col">Fee</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map(([what, time, fee]) => (
                  <tr key={what}>
                    <th scope="row">{what}</th>
                    <td className={s.feeTime}>{time}</td>
                    <td className={s.fee}>{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className={s.feeNotes}>
              {FEE_NOTES.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------ 05 PODIATRISTS */}
        <section id="podiatrists" className={s.sec} aria-labelledby="people-h">
          <div className={s.secHead}>
            <p className={s.num}>05</p>
            <h2 id="people-h">Podiatrists</h2>
            <p className={s.secNote}>
              You can ask for someone by name. Squares show the days each of
              us is in, Monday to Saturday.
            </p>
          </div>

          <ul className={s.people}>
            {PEOPLE.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p className={s.role}>{p.role}</p>
                <p className={s.focus}>{p.focus}</p>
                <ol className={s.days} aria-label={`Days in clinic for ${p.name}`}>
                  {p.on.map((on, j) => (
                    <li key={`${p.name}-${j}`} className={on ? s.dayOn : s.dayOff}>
                      <span>{DAYS[j]}</span>
                      <span className={s.srOnly}>{on ? 'in clinic' : 'not in'}</span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- 06 CLINIC */}
        <section id="clinic" className={s.sec} aria-labelledby="clinic-h">
          <div className={s.secHead}>
            <p className={s.num}>06</p>
            <h2 id="clinic-h">The clinic</h2>
          </div>

          <div className={s.clinic}>
            <div className={s.where}>
              <p className={s.addr}>14 Linden Street, second floor</p>
              <p className={s.addrSub}>Harwood Square, above the pharmacy</p>
              <p className={s.contact}>
                <a href="tel:+15550134400">(555) 013-4400</a>
                <a href="mailto:desk@solefit.example">desk@solefit.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <dl className={s.getting}>
                {GETTING.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form id="book" className={s.form} action="#">
              <div className={s.formField} aria-hidden="true">
                <TabbiedPattern
                  pattern={halftone}
                  palette={DOTS}
                  fit="grid"
                  cellSize={36}
                  seed="solefit-book"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.formBody}>
                <h3 className={s.formTitle}>Request an appointment</h3>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label htmlFor="sf-name">Name</label>
                    <input id="sf-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sf-phone">Phone</label>
                    <input id="sf-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={`${s.field} ${s.wide}`}>
                    <label htmlFor="sf-email">Email</label>
                    <input id="sf-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sf-what">The problem</label>
                    <select id="sf-what" name="what" defaultValue="heel">
                      <option value="heel">Heel or arch pain</option>
                      <option value="nail">A nail</option>
                      <option value="running">A running injury</option>
                      <option value="diabetic">Diabetic foot review</option>
                      <option value="skin">Skin, corns or warts</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sf-when">Best time</label>
                    <select id="sf-when" name="when" defaultValue="any">
                      <option value="any">Any time</option>
                      <option value="morning">Weekday morning</option>
                      <option value="afternoon">Weekday afternoon</option>
                      <option value="evening">Weekday, after 5</option>
                      <option value="saturday">Saturday morning</option>
                    </select>
                  </div>
                  <div className={`${s.field} ${s.wide}`}>
                    <label htmlFor="sf-note">Anything we should know</label>
                    <textarea id="sf-note" name="note" rows={3} />
                  </div>
                </div>
                <button className={s.submit} type="submit">Send the request</button>
                <p className={s.formNote}>We call back within one working day with two times to choose from.</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Solefit Podiatry</p>
        <p>A fictional podiatry clinic. The clinicians, fees, address and notes on conditions are invented, and none of it is medical advice.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
