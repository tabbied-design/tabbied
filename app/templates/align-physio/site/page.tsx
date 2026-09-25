import { TabbiedPattern } from 'tabbied/react';
import { warpribbon, gimbal } from 'tabbied/patterns';
import s from './align-physio.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Align Physio: Physiotherapy clinic, Linden Avenue',
  description:
    'Align Physio treats back and neck pain, sports injuries and recovery after surgery. Book a first visit online, see the conditions we treat from A to Z, and check prices and insurers.',
};

/* Site colors, the same six as the stylesheet's root rule. The fields take
   `transparent` first so the threads sit on the panel's own ground. */
const BLUE = '#2F6FDE';
const CORAL = '#F2765C';
const GRAY = '#8795A5';

const RIBBON = ['transparent', BLUE, CORAL];
const RINGS = ['transparent', GRAY, BLUE, GRAY];

const NAV = [
  ['Conditions', '#conditions'],
  ['Treatments', '#treatments'],
  ['Physios', '#physios'],
  ['Prices', '#prices'],
  ['First visit', '#first-visit'],
  ['Clinic', '#clinic'],
];

const HERO_FACTS = [
  ['No referral', 'needed to book'],
  ['Same week', 'first appointments'],
  ['9 insurers', 'billed directly'],
];

const TYPES = [
  ['Initial assessment', '60 min', '$120'],
  ['Sports injury assessment', '60 min', '$120'],
  ['Follow-up treatment', '40 min', '$85'],
  ['Video consultation', '45 min', '$75'],
];

const SLOTS = [
  ['Tue 30 Sep', '8:15 am'],
  ['Tue 30 Sep', '12:40 pm'],
  ['Wed 1 Oct', '7:30 am'],
  ['Wed 1 Oct', '5:50 pm'],
  ['Thu 2 Oct', '10:00 am'],
  ['Thu 2 Oct', '6:30 pm'],
];

const INDEX: [string, string[]][] = [
  ['A', ['Achilles tendinopathy', 'ACL reconstruction rehab', 'Ankle sprains', 'Arthritis of the hip and knee']],
  ['B', ['Back pain, new or long-standing', 'Bursitis', 'Bunion surgery rehab']],
  ['C', ['Carpal tunnel syndrome', 'Concussion and return to sport', 'Costochondritis']],
  ['D', ["De Quervain's tenosynovitis", 'Disc bulges']],
  ['F', ['Fractures, once the cast is off', 'Frozen shoulder']],
  ['G', ["Golfer's elbow", 'Groin strains']],
  ['H', ['Hamstring strains', 'Headaches from the neck', 'Hip replacement rehab', 'Hypermobility']],
  ['I', ['IT band pain']],
  ['J', ['Jaw pain and clicking (TMJ)']],
  ['K', ['Knee pain in runners', 'Knee replacement rehab']],
  ['L', ['Ligament injuries', 'Low back pain in pregnancy']],
  ['M', ['Meniscus tears', 'Muscle strains']],
  ['N', ['Neck pain', 'Nerve pain and tingling']],
  ['O', ['Osgood-Schlatter disease', 'Osteoarthritis']],
  ['P', ['Plantar fasciitis', 'Posture-related pain', 'Post-surgical rehab']],
  ['R', ['Rotator cuff injuries', "Runner's knee"]],
  ['S', ['Sciatica', 'Scoliosis', 'Shin splints', 'Shoulder impingement']],
  ['T', ['Tendinopathy', 'Tennis elbow']],
  ['W', ['Whiplash', 'Wrist pain']],
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LETTERS_IN_USE = new Set(INDEX.map(([letter]) => letter));

const TREATMENTS = [
  {
    name: 'Manual therapy',
    body: 'Joint mobilization and soft tissue work to calm pain down enough that you can start moving it again.',
    use: 'Stiff necks and backs, frozen shoulder',
  },
  {
    name: 'Exercise rehab',
    body: 'A short program built for you, taught in the gym and sent to your phone with videos. Most of the work happens here.',
    use: 'Almost everything we see',
  },
  {
    name: 'Dry needling',
    body: 'Fine needles into tight, sore muscle. Always optional, always explained first, and never on a first visit without asking.',
    use: 'Muscle pain, tension headaches',
  },
  {
    name: 'Shockwave therapy',
    body: 'Pulses of sound to a tendon that has stopped healing. Three to five weekly sessions, fifteen minutes each.',
    use: 'Plantar fasciitis, tennis elbow',
  },
  {
    name: 'Clinical Pilates',
    body: 'Classes of six on reformers, led by a physio. Good for strength after an injury and for backs that keep coming back.',
    use: 'Back pain, pregnancy, hypermobility',
  },
  {
    name: 'Return to run',
    body: 'A treadmill gait check, a load plan, and a graded route back to your usual distance over six to ten weeks.',
    use: 'Runners with any lower-limb injury',
  },
];

const PHYSIOS = [
  {
    initials: 'PR',
    name: 'Dr. Priya Raman, DPT',
    role: 'Clinical director',
    focus: 'Spine, persistent pain, headaches',
    days: 'Mon-Thu',
    lang: 'English, Tamil',
  },
  {
    initials: 'MW',
    name: 'Marcus Webb, PT',
    role: 'Sports physio',
    focus: 'Running injuries, ACL rehab, return to sport',
    days: 'Tue-Sat',
    lang: 'English',
  },
  {
    initials: 'ES',
    name: 'Elena Sokolova, PT',
    role: 'Pelvic health physio',
    focus: 'Pregnancy, postpartum, pelvic floor',
    days: 'Mon, Wed, Fri',
    lang: 'English, Russian',
  },
  {
    initials: 'TO',
    name: 'Tom Okafor, PT, CSCS',
    role: 'Rehab and strength',
    focus: 'After surgery, joint replacements, older adults',
    days: 'Mon-Fri, evenings',
    lang: 'English, Yoruba',
  },
  {
    initials: 'HK',
    name: 'Hana Kim, LMT',
    role: 'Sports massage therapist',
    focus: 'Pre-event and recovery massage',
    days: 'Wed-Sat',
    lang: 'English, Korean',
  },
];

const PRICES = [
  ['Initial assessment', '60 min', '$120'],
  ['Follow-up treatment', '40 min', '$85'],
  ['Extended follow-up', '60 min', '$115'],
  ['Video consultation', '45 min', '$75'],
  ['Shockwave session', '15 min', '$60'],
  ['Sports massage', '60 min', '$95'],
  ['Clinical Pilates class', '55 min', '$28, or 10 for $250'],
];

const INSURERS = [
  'Blue Harbor Health',
  'Northstar Mutual',
  'Keystone Care',
  'Meridian Plans',
  'Cedar Life',
  'Unity Health Group',
  'Summit Benefits',
  'Workers comp claims',
  'Auto accident claims',
];

const PAY_NOTES = [
  ['Pay after, not before', 'You pay at the end of each visit. Card, HSA and FSA cards are all fine.'],
  ['Out of network', 'We give you a superbill the same day to claim back from your insurer.'],
  ['Cancelling', 'Free up to 24 hours before. Inside that, a $40 fee, waived once a year.'],
];

const VISIT_STEPS = [
  {
    time: '0-15 min',
    title: 'We listen',
    body: 'What happened, what it stops you doing, and what you want back. Bring the scan report if there is one.',
  },
  {
    time: '15-35 min',
    title: 'We look',
    body: 'How you move, where it hurts and where it does not. Strength, range, and a few tests that rule things out.',
  },
  {
    time: '35-50 min',
    title: 'We treat',
    body: 'Usually some hands-on work and the first two or three exercises, so you leave with something that helps tonight.',
  },
  {
    time: '50-60 min',
    title: 'We plan',
    body: 'What we think it is, how long it should take, and how many visits. Most people need three to six.',
  },
];

const BRING = [
  'Shorts or leggings, and a T-shirt or tank top',
  'Your insurance card and a photo ID',
  'Any scan or surgery reports',
  'Running shoes, if it is a running injury',
];

const HOURS = [
  ['Monday-Thursday', '7 am-8 pm'],
  ['Friday', '7 am-6 pm'],
  ['Saturday', '8 am-1 pm'],
  ['Sunday', 'Closed'],
];

export default function AlignPhysioPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f7f9fb',
        '--ink': '#13202e',
        '--blue': '#2f6fde',
        '--coral': '#f2765c',
        '--gray': '#8795a5',
        '--pale': '#e3eaf2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,blue,coral,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDot} aria-hidden="true" />
          <span data-edit="bar.text" data-edit-max="60">Align Physio</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ----------------------------------------------------------- HERO
            Two columns: the promise, and a booking card standing on a panel
            of threads that shade from blue to coral. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Physiotherapy clinic, Linden Avenue</p>
            <h1 data-edit="hero.title2" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Back to the things <em>you move for.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Assessment and treatment for back and neck pain, sports
              injuries and recovery after surgery. You see a licensed physical
              therapist within the week, usually within two days, for a full
              hour the first time.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a first visit</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="tel:+15550184470">Or call (555) 018-4470</a>
            </div>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.heroPanel}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3" className={s.ribbon} aria-hidden="true">
              <TabbiedPattern
                pattern={warpribbon}
                palette={RIBBON}
                fit="grid"
                cellSize={36}
                seed="align-ribbon"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <form id="book" className={s.card} action="#" aria-labelledby="book-h">
              <div className={s.cardHead}>
                <h2 data-edit="hero.title" data-edit-max="60" id="book-h">Book a first visit</h2>
                <p data-edit="hero.cardPrice" data-edit-max="240" data-edit-multiline className={s.cardPrice}>From $120</p>
              </div>
              <fieldset className={s.field}>
                <legend data-edit="hero.legend">Appointment type</legend>
                <div className={s.types}>
                  {TYPES.map(([name, length, price], i) => (
                    <label key={name} className={s.type}>
                      <input type="radio" name="type" value={name} defaultChecked={i === 0} />
                      <span data-edit={`hero.typeName.${i}`} data-edit-max="60" className={s.typeName}>{name}</span>
                      <span data-edit={`hero.typeLen.${i}`} data-edit-max="60" className={s.typeLen}>{length}</span>
                      <span data-edit={`hero.typePrice.${i}`} data-edit-max="60" className={s.typePrice}>{price}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={s.field}>
                <legend data-edit="hero.legend2">Next available</legend>
                <div className={s.slots}>
                  {SLOTS.map(([day, time], i) => (
                    <label key={day + time} className={s.slot}>
                      <input type="radio" name="slot" value={`${day} ${time}`} defaultChecked={i === 0} />
                      <span data-edit={`hero.slotDay.${i}`} data-edit-max="60" className={s.slotDay}>{day}</span>
                      <span data-edit={`hero.slotTime.${i}`} data-edit-max="60" className={s.slotTime}>{time}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button data-edit="hero.submit" data-edit-max="24" type="submit" className={s.submit}>Continue to your details</button>
              <p data-edit="hero.cardNote" data-edit-max="240" data-edit-multiline className={s.cardNote}>
                Nothing to pay now. We bill your insurer directly, or you pay
                at the end of the visit.
              </p>
            </form>
          </div>
        </section>

        {/* ----------------------------------------------------- CONDITIONS
            An index, like the back of a book: a letter bar that stays in
            view, and the conditions flowing in columns under their letters. */}
        <section id="conditions" className={s.sec} aria-labelledby="conditions-h">
          <div className={s.secHead}>
            <p data-edit="conditions.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Conditions we treat</p>
            <h2 data-edit="conditions.title" data-edit-max="60" id="conditions-h">From Achilles to wrist, A to Z</h2>
            <p data-edit="conditions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Not on the list? Call and ask. If it is not something a physio
              should treat, we will say so and tell you who should.
            </p>
          </div>
          <nav className={s.letters} aria-label="Conditions by letter">
            {ALPHABET.map((letter, i) =>
              LETTERS_IN_USE.has(letter) ? (
                <a data-edit={`conditions.link.${i}`} data-edit-max="28" key={letter} href={`#az-${letter.toLowerCase()}`}>{letter}</a>
              ) : (
                <span key={letter} className={s.letterOff} aria-hidden="true">{letter}</span>
              )
            )}
          </nav>
          <div className={s.index}>
            {INDEX.map(([letter, items], i) => (
              <div key={letter} id={`az-${letter.toLowerCase()}`} className={s.group}>
                <h3 data-edit={`conditions.groupLetter.${i}`} data-edit-max="40" className={s.groupLetter}>{letter}</h3>
                <ul>
                  {items.map((item, i2) => (
                    <li data-edit={`conditions.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- TREATMENTS */}
        <section id="treatments" className={s.sec} aria-labelledby="treatments-h">
          <div className={s.secHead}>
            <p data-edit="treatments.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Treatments</p>
            <h2 data-edit="treatments.title" data-edit-max="60" id="treatments-h">What an hour with us is made of</h2>
            <p data-edit="treatments.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Hands-on care to get you moving, then exercise to keep you
              moving. We will not sell you a machine or a block of twenty
              sessions.
            </p>
          </div>
          <ol className={s.treatments}>
            {TREATMENTS.map((t, i) => (
              <li key={t.name}>
                <h3 data-edit={`treatments.title2.${i}`} data-edit-max="40">{t.name}</h3>
                <p data-edit={`treatments.treatBody.${i}`} data-edit-max="240" data-edit-multiline className={s.treatBody}>{t.body}</p>
                <p data-edit={`treatments.treatUse.${i}`} data-edit-max="240" data-edit-multiline className={s.treatUse}>{t.use}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- PHYSIOS */}
        <section id="physios" className={s.sec} aria-labelledby="physios-h">
          <div className={s.secHead}>
            <p data-edit="physios.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The physios</p>
            <h2 data-edit="physios.title" data-edit-max="60" id="physios-h">Five people, one of whom you will see every time</h2>
            <p data-edit="physios.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              You keep the same physio from the first visit to the last. Ask
              for someone by name when you book, or tell us what is wrong and
              we will match you.
            </p>
          </div>
          <ul className={s.team}>
            {PHYSIOS.map((p, i) => (
              <li key={p.name}>
                <span className={s.avatar} aria-hidden="true">{p.initials}</span>
                <div className={s.who}>
                  <h3 data-edit={`physios.title2.${i}`} data-edit-max="40">{p.name}</h3>
                  <p data-edit={`physios.role.${i}`} data-edit-max="240" data-edit-multiline className={s.role}>{p.role}</p>
                </div>
                <p data-edit={`physios.focus.${i}`} data-edit-max="240" data-edit-multiline className={s.focus}>{p.focus}</p>
                <dl className={s.teamFacts}>
                  <div>
                    <dt data-edit={`physios.term.${i}`} data-edit-max="28">In clinic</dt>
                    <dd data-edit={`physios.body.${i}`} data-edit-max="200" data-edit-multiline>{p.days}</dd>
                  </div>
                  <div>
                    <dt data-edit={`physios.term2.${i}`} data-edit-max="28">Speaks</dt>
                    <dd data-edit={`physios.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.lang}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Prices and insurers</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">What it costs, before you come</h2>
          </div>
          <div className={s.prices}>
            <table className={s.priceTable}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Appointment prices</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Appointment</th>
                  <th data-edit="prices.heading2" scope="col">Length</th>
                  <th data-edit="prices.heading3" scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map(([name, length, price], i) => (
                  <tr key={name}>
                    <th data-edit={`prices.heading4.${i}`} scope="row">{name}</th>
                    <td data-edit={`prices.cell.${i}`}>{length}</td>
                    <td data-edit={`prices.cell2.${i}`}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={s.insure}>
              <h3 data-edit="prices.title2" data-edit-max="40">We bill these directly</h3>
              <ul className={s.insurers}>
                {INSURERS.map((name, i) => (
                  <li data-edit={`prices.item.${i}`} data-edit-max="80" key={name}>{name}</li>
                ))}
              </ul>
              <dl className={s.payNotes}>
                {PAY_NOTES.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`prices.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- FIRST VISIT
            A tile of crossed rings beside the hour, laid out as a timeline. */}
        <section id="first-visit" className={s.sec} aria-labelledby="first-h">
          <div className={s.firstGrid}>
            <div className={s.firstSide}>
              <div className={s.secHead}>
                <p data-edit="firstVisit.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Your first visit</p>
                <h2 data-edit="firstVisit.title" data-edit-max="60" id="first-h">One hour, in four parts</h2>
                <p data-edit="firstVisit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  Nothing happens that you have not agreed to, and you can
                  bring someone with you.
                </p>
              </div>
              <div data-edit-pattern="firstVisit.field" data-edit-roles="transparent,4,2,4" className={s.rings} aria-hidden="true">
                <TabbiedPattern
                  pattern={gimbal}
                  palette={RINGS}
                  options={{ frequency: 0.45 }}
                  fit="grid"
                  cellSize={80}
                  seed="align-rings"
                  redrawInterval={8000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div>
              <ol className={s.steps}>
                {VISIT_STEPS.map((st, i) => (
                  <li key={st.title}>
                    <span data-edit={`firstVisit.stepTime.${i}`} data-edit-max="60" className={s.stepTime}>{st.time}</span>
                    <h3 data-edit={`firstVisit.title2.${i}`} data-edit-max="40">{st.title}</h3>
                    <p data-edit={`firstVisit.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
                  </li>
                ))}
              </ol>
              <div className={s.bring}>
                <h3 data-edit="firstVisit.title3" data-edit-max="40">What to bring and wear</h3>
                <ul>
                  {BRING.map((b, i) => (
                    <li data-edit={`firstVisit.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CLINIC */}
        <section id="clinic" className={s.sec} aria-labelledby="clinic-h">
          <div className={s.secHead}>
            <p data-edit="clinic.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The clinic</p>
            <h2 data-edit="clinic.title" data-edit-max="60" id="clinic-h">Second floor, above the pharmacy</h2>
          </div>
          <div className={s.clinic}>
            <div>
              <h3 data-edit="clinic.clinicHead" data-edit-max="40" className={s.clinicHead}>Address</h3>
              <p data-edit="clinic.body" data-edit-max="240" data-edit-multiline className={s.address}>
                48 Linden Avenue, Suite 210
                <br />
                Entrance on Mill Street
              </p>
              <ul className={s.contact}>
                <li>
                  <a data-edit="clinic.link" data-edit-max="28" href="tel:+15550184470">(555) 018-4470</a>
                </li>
                <li>
                  <a data-edit="clinic.link2" data-edit-max="28" href="mailto:hello@alignphysio.example">hello@alignphysio.example</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 data-edit="clinic.clinicHead2" data-edit-max="40" className={s.clinicHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`clinic.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`clinic.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 data-edit="clinic.clinicHead3" data-edit-max="40" className={s.clinicHead}>Getting here</h3>
              <ul className={s.getting}>
                <li data-edit="clinic.item" data-edit-max="80">Step-free from the street, with an elevator to the second floor.</li>
                <li data-edit="clinic.item2" data-edit-max="80">Free parking behind the building for two hours; ask for a ticket at the desk.</li>
                <li data-edit="clinic.item3" data-edit-max="80">The 7 and 22 buses stop at Linden and Mill, one minute away.</li>
                <li data-edit="clinic.item4" data-edit-max="80">A changing room and a shower, if you are coming from a run.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>Hurting now? We keep two same-day slots open every morning.</p>
          <a data-edit="footer.button" data-edit-max="28" className={s.button} href="tel:+15550184470">Call (555) 018-4470</a>
        </div>
        <div className={s.footGrid}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Align Physio</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional physiotherapy clinic. Prices, hours, insurers and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
