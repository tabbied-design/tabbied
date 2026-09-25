import { TabbiedPattern } from 'tabbied/react';
import { pebble, teardropleaves } from 'tabbied/patterns';
import s from './restore-clinic.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Restore: Chiropractic and massage clinic, Elm Park',
  description:
    'Restore is a chiropractic and massage therapy clinic in Elm Park. Every treatment with its length and price, the practitioners, what happens at a first visit, and the insurers we bill directly.',
};

/* Site colors, the same six as the stylesheet's root rule. Both fields take
   `transparent` first, so the leaves and pebbles sit on the arch or the
   page. */
const EUCALYPTUS = '#5E8C7A';
const CLAY = '#C98C6B';
const GRAY = '#8F9B96';
const PALE = '#E0E8E3';

const LEAVES = ['transparent', EUCALYPTUS, PALE];
const STONES = ['transparent', PALE, GRAY, CLAY];
const FRAME_LEAVES = ['transparent', 'transparent', PALE];
const NIGHT_LEAVES = ['transparent', 'transparent', EUCALYPTUS];
const SHORE = ['transparent', EUCALYPTUS, GRAY, CLAY];

const NAV = [
  ['Treatments', '#treatments'],
  ['Practitioners', '#practitioners'],
  ['First visit', '#first-visit'],
  ['Insurance', '#insurance'],
  ['Book', '#book'],
];

type Treatment = {
  name: string;
  length: string;
  price: string;
  body: string;
  helps: string[];
  note: string;
  open?: boolean;
};

const CHIRO: Treatment[] = [
  {
    name: 'Initial assessment',
    length: '60 min',
    price: '$120',
    body: 'A full history, posture and movement tests, and a first adjustment if it is safe to give one. You leave with a written plan and an honest guess at how many visits it will take.',
    helps: ['Back and neck pain', 'Headaches', 'Sciatica'],
    note: 'Required before any other chiropractic visit.',
    open: true,
  },
  {
    name: 'Follow-up adjustment',
    length: '20 min',
    price: '$65',
    body: 'A short check of how the last visit held, then the adjustment itself. Gentle, low-force techniques are always available if you would rather not hear a joint click.',
    helps: ['Ongoing care', 'Stiffness', 'Recovery'],
    note: 'Packs of five are $295.',
  },
  {
    name: 'Sports and rehab session',
    length: '40 min',
    price: '$95',
    body: 'Adjustment plus soft tissue work and exercises you can do at home, for an injury or for getting back to a sport after one. We send the exercises by email with short videos.',
    helps: ['Running injuries', 'Shoulders', 'Post-surgery'],
    note: 'Wear something you can move in.',
  },
  {
    name: 'Pregnancy chiropractic',
    length: '30 min',
    price: '$80',
    body: 'Adjustments on a table with a drop-away middle, so you can lie face down at any stage. Aimed at the low back and pelvis pain that the second and third trimesters bring.',
    helps: ['Pelvic pain', 'Low back', 'Round ligament'],
    note: 'From 12 weeks, with your midwife or OB informed.',
  },
];

const MASSAGE: Treatment[] = [
  {
    name: 'Relaxation massage',
    length: '60 / 90 min',
    price: '$95 / $135',
    body: 'Long, even strokes with warm oil, the whole body or the parts you choose. The lights are low, the music is optional and nobody will talk to you unless you want them to.',
    helps: ['Stress', 'Sleep', 'General tension'],
    note: 'Unscented oil on request.',
    open: true,
  },
  {
    name: 'Deep tissue massage',
    length: '60 / 90 min',
    price: '$105 / $145',
    body: 'Slow, firm pressure worked into specific knots and tight bands of muscle. It can be uncomfortable in the moment; tell us, and we will keep it on the right side of useful.',
    helps: ['Chronic tightness', 'Desk posture', 'Athletes'],
    note: 'Drink water afterward, and expect to feel it the next day.',
  },
  {
    name: 'Hot stone massage',
    length: '75 min',
    price: '$130',
    body: 'Smooth basalt stones heated in water to about 125 degrees, placed along the back and used as an extension of the hands. The heat lets muscles give way with less pressure.',
    helps: ['Cold, tight muscles', 'Winter', 'Deep relaxation'],
    note: 'Not suitable in pregnancy or with some heart conditions.',
  },
  {
    name: 'Prenatal massage',
    length: '60 min',
    price: '$100',
    body: 'Side-lying with pillows and a bolster, so you are comfortable and safe from the second trimester on. Focused on the low back, hips, legs and the swelling around the ankles.',
    helps: ['Low back', 'Swelling', 'Sleep'],
    note: 'From 14 weeks.',
  },
  {
    name: 'Cupping add-on',
    length: '+15 min',
    price: '+$25',
    body: 'Silicone cups that lift rather than press, moved over the back and shoulders at the end of any massage. It can leave round marks for a few days, which fade on their own.',
    helps: ['Shoulders', 'Upper back'],
    note: 'Add it when you book or ask on the day.',
  },
];

const TEAM = [
  {
    art: 'restore-clinic-r1',
    name: 'Dr. Helena Voss',
    role: 'Chiropractor, DC',
    alt: 'Portrait of Dr. Helena Voss, smiling, in a white clinic tunic',
    frame: 'eucalyptus',
    bio: 'Helena opened Restore in 2014 after ten years in a sports clinic. She treats a lot of runners, a lot of new parents, and anyone whose job involves a laptop.',
    days: 'Monday to Thursday, Saturday mornings',
    treats: 'Assessments, adjustments, pregnancy care',
  },
  {
    art: 'restore-clinic-r2',
    name: 'Marco Lindqvist',
    role: 'Registered massage therapist, RMT',
    alt: 'Portrait of Marco Lindqvist in a dark polo shirt',
    frame: 'clay',
    bio: 'Marco trained in sports and remedial massage and spent four seasons with a pro cycling team. He is the one to see for deep tissue, hot stones or a first cupping session.',
    days: 'Tuesday to Sunday, including evenings',
    treats: 'All massage, cupping, prenatal',
  },
];

const STEPS = [
  {
    no: '1',
    title: 'Fill in the intake form',
    body: 'We email it when you book. Ten minutes, and it means the appointment is spent on you rather than on paperwork.',
  },
  {
    no: '2',
    title: 'Talk it through',
    body: 'Where it hurts, since when, what makes it better or worse. For chiropractic we also test how you move.',
  },
  {
    no: '3',
    title: 'The first treatment',
    body: 'Only once we both know what the plan is and you are happy with it. You can stop or change anything at any time.',
  },
  {
    no: '4',
    title: 'A plan you can check',
    body: 'A written summary by email the same day, with the number of visits we expect and exercises if you have any.',
  },
];

const QUESTIONS = [
  ['Do I need a doctor referral?', 'No. Some insurance plans ask for one before they pay for massage, so check yours or ask us.'],
  ['What should I wear?', 'Comfortable clothes for chiropractic. For massage you undress to your comfort level and stay covered by a sheet.'],
  ['Does an adjustment hurt?', 'It should not. There can be some soreness the next day, like after a new exercise.'],
  ['What if I have to cancel?', 'Free with 24 hours notice. Later than that we charge half the treatment price.'],
];

const INSURERS = [
  'Northfield Mutual',
  'Beacon Health',
  'Evergreen Benefits',
  'Harborline',
  'Unity Care',
  'Cardinal Group',
  'Pinecrest Life',
  'Meridian Plans',
  'Coastline Health',
];

const HOURS = [
  ['Monday - Thursday', '8 am - 8 pm'],
  ['Friday', '8 am - 6 pm'],
  ['Saturday', '9 am - 4 pm'],
  ['Sunday', '10 am - 3 pm, massage only'],
];

export default function RestoreClinicPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--mist': '#f3f6f3',
        '--ink': '#1b2622',
        '--eucalyptus': '#5e8c7a',
        '--clay': '#c98c6b',
        '--gray': '#8f9b96',
        '--pale': '#e0e8e3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="mist,ink,eucalyptus,clay,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Young+Serif&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Restore</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Chiropractic and massage</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book online</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- HERO
            An arch of leaves with the stones standing in it, and the one
            sentence beside it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Chiropractic and massage therapy in Elm Park</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Move easier.
              <br />
              <em>Rest deeper.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              A small clinic with one chiropractor, one massage therapist and
              four quiet rooms. Most people come for a sore back and stay for
              the hour where nobody needs anything from them.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a treatment</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="tel:+15550132270">Call (555) 013-2270</a>
            </div>
            <ul className={s.heroFacts}>
              <li>
                <strong data-edit="hero.emphasis">7 days</strong>
                <span data-edit="hero.text" data-edit-max="60">Mornings, evenings, weekends</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis2">9 insurers</strong>
                <span data-edit="hero.text2" data-edit-max="60">Billed directly, no forms</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis3">This week</strong>
                <span data-edit="hero.text3" data-edit-max="60">New patients seen within days</span>
              </li>
            </ul>
          </div>

          <div className={s.heroArt}>
            <div className={s.arch}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,5" className={s.archField} aria-hidden="true">
                <TabbiedPattern
                  pattern={teardropleaves}
                  palette={LEAVES}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={64}
                  seed="restore-arch"
                  redrawInterval={9000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="restore-clinic-stones"
                alt="A stack of five smooth massage stones"
                mode="tint"
                inks={['var(--ink)', 'var(--mist)']}
                className={s.stones}
              />
            </div>
            <p className={s.heroCard}>
              <span data-edit="hero.heroCardName" data-edit-max="60" className={s.heroCardName}>Hot stone massage</span>
              <span data-edit="hero.heroCardMeta" data-edit-max="60" className={s.heroCardMeta}>75 min, $130</span>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------- TREATMENTS
            Two columns of cards, each a disclosure: the summary is the name,
            length and price, and opening it says what happens. */}
        <section id="treatments" className={s.treatments} aria-labelledby="treatments-h">
          <div className={s.secHead}>
            <p data-edit="treatments.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Treatments and prices</p>
            <h2 data-edit="treatments.title" data-edit-max="60" id="treatments-h">Nine treatments, priced by the hour we spend with you</h2>
            <p data-edit="treatments.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Open a card for what happens and who it is for. Prices include
              tax, and every visit ends with ten minutes to get up slowly.
            </p>
          </div>

          <div className={s.menus}>
            <div className={s.menu}>
              <div className={s.menuHead}>
                <h3 data-edit="treatments.title2" data-edit-max="40">Chiropractic</h3>
                <span data-edit="treatments.menuWho" data-edit-max="60" className={s.menuWho}>With Dr. Helena Voss</span>
              </div>
              {CHIRO.map((t, i) => (
                <details key={t.name} className={s.treatment} open={t.open}>
                  <summary>
                    <span data-edit={`treatments.tName.${i}`} data-edit-max="60" className={s.tName}>{t.name}</span>
                    <span data-edit={`treatments.tLength.${i}`} data-edit-max="60" className={s.tLength}>{t.length}</span>
                    <span data-edit={`treatments.tPrice.${i}`} data-edit-max="60" className={s.tPrice}>{t.price}</span>
                  </summary>
                  <div className={s.tBody}>
                    <p data-edit={`treatments.body.${i}`} data-edit-max="240" data-edit-multiline>{t.body}</p>
                    <ul className={s.tHelps} aria-label="Often booked for">
                      {t.helps.map((h, i2) => (
                        <li data-edit={`treatments.item.${i}.${i2}`} data-edit-max="80" key={h}>{h}</li>
                      ))}
                    </ul>
                    <p data-edit={`treatments.tNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tNote}>{t.note}</p>
                    <a data-edit={`treatments.tBook.${i}`} data-edit-max="28" className={s.tBook} href="#book">Book this treatment</a>
                  </div>
                </details>
              ))}
            </div>

            <div className={s.menu}>
              <div className={s.menuHead}>
                <h3 data-edit="treatments.title3" data-edit-max="40">Massage therapy</h3>
                <span data-edit="treatments.menuWho2" data-edit-max="60" className={s.menuWho}>With Marco Lindqvist, RMT</span>
              </div>
              {MASSAGE.map((m, i) => (
                <details key={m.name} className={s.treatment} open={m.open}>
                  <summary>
                    <span data-edit={`treatments.tName2.${i}`} data-edit-max="60" className={s.tName}>{m.name}</span>
                    <span data-edit={`treatments.tLength2.${i}`} data-edit-max="60" className={s.tLength}>{m.length}</span>
                    <span data-edit={`treatments.tPrice2.${i}`} data-edit-max="60" className={s.tPrice}>{m.price}</span>
                  </summary>
                  <div className={s.tBody}>
                    <p data-edit={`treatments.body2.${i}`} data-edit-max="240" data-edit-multiline>{m.body}</p>
                    <ul className={s.tHelps} aria-label="Often booked for">
                      {m.helps.map((h, i2) => (
                        <li data-edit={`treatments.item2.${i}.${i2}`} data-edit-max="80" key={h}>{h}</li>
                      ))}
                    </ul>
                    <p data-edit={`treatments.tNote2.${i}`} data-edit-max="240" data-edit-multiline className={s.tNote}>{m.note}</p>
                    <a data-edit={`treatments.tBook2.${i}`} data-edit-max="28" className={s.tBook} href="#book">Book this treatment</a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- PRACTITIONERS
            Tinted portraits, each standing in an arch of its own color. */}
        <section id="practitioners" className={s.team} aria-labelledby="team-h">
          <div className={s.secHead}>
            <p data-edit="practitioners.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The practitioners</p>
            <h2 data-edit="practitioners.title" data-edit-max="60" id="team-h">Two people, and you will see the same one every time</h2>
          </div>
          <div className={s.people}>
            {TEAM.map((p, i) => (
              <article key={p.name} className={s.person}>
                <div className={`${s.portraitFrame} ${s[`frame_${p.frame}`]}`}>
                  <div className={s.frameField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={teardropleaves}
                      palette={FRAME_LEAVES}
                      options={{ frequency: 0.6 }}
                      fit="grid"
                      cellSize={44}
                      seed={`restore-frame-${i}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <Artwork
                    slug={p.art}
                    alt={p.alt}
                    mode="tint"
                    inks={['var(--ink)', 'var(--mist)']}
                    className={s.portrait}
                  />
                </div>
                <div className={s.personText}>
                  <h3 data-edit={`person.title.${i}`} data-edit-max="40">{p.name}</h3>
                  <p data-edit={`person.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{p.role}</p>
                  <p data-edit={`person.personBio.${i}`} data-edit-max="240" data-edit-multiline className={s.personBio}>{p.bio}</p>
                  <dl className={s.personFacts}>
                    <div>
                      <dt data-edit={`person.term.${i}`} data-edit-max="28">In clinic</dt>
                      <dd data-edit={`person.body.${i}`} data-edit-max="200" data-edit-multiline>{p.days}</dd>
                    </div>
                    <div>
                      <dt data-edit={`person.term2.${i}`} data-edit-max="28">Sees you for</dt>
                      <dd data-edit={`person.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.treats}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,5,4,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={pebble}
            palette={STONES}
            options={{ frequency: 0.55 }}
            fit="grid"
            cellSize={48}
            seed="restore-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------ FIRST VISIT */}
        <section id="first-visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="firstVisit.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Your first visit</p>
            <h2 data-edit="firstVisit.title" data-edit-max="60" id="visit-h">What happens the first time</h2>
            <p data-edit="firstVisit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Arrive ten minutes early. Bring your insurance card and a list of
              any medication you take.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.no}>
                <span data-edit={`firstVisit.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                <h3 data-edit={`firstVisit.title2.${i}`} data-edit-max="40">{st.title}</h3>
                <p data-edit={`firstVisit.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
              </li>
            ))}
          </ol>
          <dl className={s.questions}>
            {QUESTIONS.map(([q, a], i) => (
              <div key={q}>
                <dt data-edit={`firstVisit.term.${i}`} data-edit-max="28">{q}</dt>
                <dd data-edit={`firstVisit.body2.${i}`} data-edit-max="200" data-edit-multiline>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* -------------------------------------------------------- INSURANCE */}
        <section id="insurance" className={s.insurance} aria-labelledby="insurance-h">
          <div className={s.insuranceField} aria-hidden="true">
            <TabbiedPattern
              pattern={teardropleaves}
              palette={NIGHT_LEAVES}
              options={{ frequency: 0.45 }}
              fit="grid"
              cellSize={72}
              seed="restore-night"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.insuranceInner}>
            <div className={s.insuranceText}>
              <p data-edit="insurance.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Insurance and payment</p>
              <h2 data-edit="insurance.title" data-edit-max="60" id="insurance-h">We bill your insurer, so you only pay the difference</h2>
              <p data-edit="insurance.body" data-edit-max="240" data-edit-multiline>
                Show us your card at the first visit and we send every claim
                from then on. If your plan is not listed, we give you an
                itemized receipt with our registration numbers the same day.
              </p>
              <dl className={s.pay}>
                <div>
                  <dt data-edit="insurance.term" data-edit-max="28">Paying yourself</dt>
                  <dd data-edit="insurance.body2" data-edit-max="200" data-edit-multiline>Card, cash, HSA and FSA cards</dd>
                </div>
                <div>
                  <dt data-edit="insurance.term2" data-edit-max="28">Car accidents</dt>
                  <dd data-edit="insurance.body3" data-edit-max="200" data-edit-multiline>We work with auto insurers on an open claim</dd>
                </div>
                <div>
                  <dt data-edit="insurance.term3" data-edit-max="28">Workplace injury</dt>
                  <dd data-edit="insurance.body4" data-edit-max="200" data-edit-multiline>Bring your claim number and we bill the insurer</dd>
                </div>
              </dl>
            </div>
            <div className={s.insurers}>
              <h3 data-edit="insurance.title2" data-edit-max="40">Billed directly</h3>
              <ul>
                {INSURERS.map((name, i) => (
                  <li data-edit={`insurance.item.${i}`} data-edit-max="80" key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.book}>
            <div className={s.bookInfo}>
              <p data-edit="book.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Book</p>
              <h2 data-edit="book.title" data-edit-max="60" id="book-h">Book online, or call and we will find a time</h2>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline className={s.address}>
                41 Linden Avenue, second floor
                <br />
                Elm Park
              </p>
              <p data-edit="book.bookNote" data-edit-max="240" data-edit-multiline className={s.bookNote}>
                Step-free access by the lift at the back. Two-hour parking on
                Linden, and the Elm Park stop is a four-minute walk.
              </p>
              <p className={s.contactLine}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550132270">(555) 013-2270</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:hello@restoreclinic.example">hello@restoreclinic.example</a>
              </p>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="book.title2" data-edit-max="40">Request an appointment</h3>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text" data-edit-max="60">Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className={s.field}>
                  <span data-edit="book.text2" data-edit-max="60">Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="book.text3" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={s.field}>
                <span data-edit="book.text4" data-edit-max="60">Treatment</span>
                <select name="treatment" defaultValue="">
                  <option value="" disabled>Choose a treatment</option>
                  <option>Initial chiropractic assessment</option>
                  <option>Relaxation massage</option>
                  <option>Deep tissue massage</option>
                  <option>Hot stone massage</option>
                  <option>Prenatal massage</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <fieldset className={s.times}>
                <legend data-edit="book.legend">Best time for you</legend>
                <label>
                  <input type="radio" name="time" value="morning" defaultChecked />
                  <span data-edit="book.text5" data-edit-max="60">Morning</span>
                </label>
                <label>
                  <input type="radio" name="time" value="afternoon" />
                  <span data-edit="book.text6" data-edit-max="60">Afternoon</span>
                </label>
                <label>
                  <input type="radio" name="time" value="evening" />
                  <span data-edit="book.text7" data-edit-max="60">Evening</span>
                </label>
              </fieldset>
              <button data-edit="book.button" data-edit-max="24" className={s.button} type="submit">Send the request</button>
              <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We reply within one working day with two or three times to choose from.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footStrip} aria-hidden="true">
          <TabbiedPattern
            pattern={pebble}
            palette={SHORE}
            options={{ frequency: 0.5 }}
            fit="grid"
            cellSize={36}
            seed="restore-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footTop}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Restore</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Chiropractic and massage therapy, 41 Linden Avenue, Elm Park.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional clinic. Treatments, prices, insurers and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live; the portraits are tinted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
