import { TabbiedPattern } from 'tabbied/react';
import { bangle, dotset } from 'tabbied/patterns';
import s from './chatterbox-speech.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Chatterbox: Speech therapy for children, Linden Avenue',
  description:
    'Chatterbox is a pediatric speech and language practice on Linden Avenue. Milestones by age, what happens at a first assessment, the four therapists, fees and insurance, and how to book a free first call.',
};

/* Site colors. The babble fields draw their arcs on a transparent ground,
   so each bubble's own fill shows between them. */
const MILK = '#fdf8ef';
const TOMATO = '#e8604c';
const SUN = '#f5c243';
const SKY = '#5b9bd9';
const INK = '#26315c';

const BABBLE = ['transparent', TOMATO, INK, SUN, MILK];
const RIPPLE = ['transparent', SUN, INK, TOMATO];
const DOTS = ['transparent', INK, TOMATO, SKY];
const COINS = ['transparent', TOMATO, INK, SKY, MILK];

const NAV = [
  ['Milestones', '#milestones'],
  ['What we help with', '#help'],
  ['First visit', '#first-visit'],
  ['Therapists', '#team'],
  ['Fees', '#fees'],
  ['Book', '#book'],
];

const CHIPS = ['Ages 18 months to 12 years', 'English and Spanish', 'At the clinic, at home or at school'];

type Age = { age: string; label: string; items: string[] };

const MILESTONES: Age[] = [
  {
    age: '12',
    label: 'By 12 months',
    items: [
      'Babbles in strings: ba-ba, da-da, ma-ma',
      'Turns when you say their name',
      'Points, waves, reaches up to be lifted',
      'Understands no and bye-bye',
      'Says a first word or two, often mama or dada',
    ],
  },
  {
    age: '18',
    label: 'By 18 months',
    items: [
      'Uses 10 to 20 words, even if not clearly',
      'Points to show you something, not only to ask',
      'Follows a simple instruction with a gesture: give me the cup',
      'Copies sounds and words you say',
    ],
  },
  {
    age: '2',
    label: 'By 2 years',
    items: [
      'Uses 50 words or more',
      'Puts two words together: more juice, daddy go',
      'People outside the family understand about half of it',
      'Points to pictures in a book when you name them',
    ],
  },
  {
    age: '3',
    label: 'By 3 years',
    items: [
      'Talks in sentences of three or four words',
      'Asks who, what and where',
      'Most people understand most of it',
      'Talks about things that are not in the room',
    ],
  },
  {
    age: '4',
    label: 'By 4 years',
    items: [
      'Tells a short story in the right order',
      'Uses most sounds, though r, l, th and s may still wobble',
      'Answers why questions',
      'Plays pretend with other children, and talks while doing it',
    ],
  },
  {
    age: '5',
    label: 'By 5 years',
    items: [
      'Says nearly every sound clearly',
      'Joins ideas with and, because and but',
      'Follows an instruction in three steps',
      'Retells a story they have heard',
    ],
  },
];

const HELP = [
  ['Late talking', 'Toddlers with fewer words than their friends, or none yet.'],
  ['Speech sounds', 'Tat for cat, wabbit for rabbit, long after it stopped being cute.'],
  ['Stuttering', 'Repeated sounds, stretched words, getting stuck. We use the Lidcombe program.'],
  ['Understanding', 'Children who nod along but miss what was asked of them.'],
  ['Social talk', 'Taking turns, staying on a topic, reading a friend\'s face.'],
  ['Sounds for reading', 'Rhyme, syllables and the sound skills that spelling sits on.'],
];

type Line = { at: string; who: string; side: string; text: string };

/* The first assessment as it goes. `side` is who is speaking: us on the
   left, you and your child on the right. */
const VISIT: Line[] = [
  { at: 'A week before', who: 'Us', side: 'us', text: 'We send a short form about your child\'s history, then call you for fifteen minutes to hear what worries you.' },
  { at: '0:00', who: 'Your child', side: 'you', text: 'Arrives, finds the train table, ignores us completely. That is fine. Nothing is being tested yet.' },
  { at: '0:10', who: 'Us', side: 'us', text: 'On the floor, we play games that happen to be tests: naming pictures, finding things in a book, copying silly sounds.' },
  { at: '0:40', who: 'Your child', side: 'you', text: 'Earns a sticker and five minutes with the bubble machine while we write things down.' },
  { at: '0:45', who: 'Us', side: 'us', text: 'We tell you what we saw, in plain words, and whether therapy would help. You ask anything you like.' },
  { at: 'Ten days later', who: 'You', side: 'you', text: 'Get the written report by email: the results, a plan, and three games to play at home this week.' },
];

type Therapist = { initials: string; name: string; role: string; about: string; days: string; tone: string };

const TEAM: Therapist[] = [
  { initials: 'DW', name: 'Dana Whitlock', role: 'MS, CCC-SLP. Founder', about: 'Fourteen years with late talkers and children who stutter. Trained in the Lidcombe program.', days: 'Monday to Thursday', tone: 'tomato' },
  { initials: 'MO', name: 'Marisol Ortega', role: 'MA, CCC-SLP', about: 'Assesses and treats in English and Spanish. Speech sounds and early language.', days: 'Tuesday to Saturday', tone: 'sky' },
  { initials: 'TP', name: 'Theo Park', role: 'MS, CCC-SLP', about: 'School-age language, reading and social talk. Does the school and daycare visits.', days: 'Monday, Wednesday, Friday', tone: 'sun' },
  { initials: 'PR', name: 'Priya Raman', role: 'SLP assistant', about: 'Runs the Saturday talk groups and the home practice packs. Knows every sticker we own.', days: 'Thursday to Saturday', tone: 'ink' },
];

const FEES = [
  ['First phone call', '15 minutes', 'Free'],
  ['Assessment and written report', 'About an hour', '$260'],
  ['Therapy session', '45 minutes', '$135'],
  ['Short session, under 3s', '30 minutes', '$95'],
  ['Saturday talk group, four children', '50 minutes', '$55'],
  ['School or daycare visit', 'Up to 90 minutes', '$160'],
];

const QUESTIONS = [
  ['Should we wait and see?', 'Some late talkers catch up on their own, and about a third do not. A first call is free, and you will leave it knowing which way to lean.'],
  ['Do we need a referral from our doctor?', 'Not from us. Some insurance plans want one before they pay, and we can tell you which.'],
  ['Will my child sit at a table for an hour?', 'No. We work on the floor, with toys. Most children think they came to play, and they did.'],
  ['We speak Spanish at home. Should we switch to English?', 'Please do not. Two languages do not cause a delay. Marisol assesses in both, which is the only fair way to do it.'],
  ['How long does therapy take?', 'Most children come once a week for three to six months, then we check again. Some need a few sessions, some a school year.'],
];

const HOURS = [
  ['Monday to Thursday', '8 am to 6 pm'],
  ['Friday', '8 am to 3 pm'],
  ['Saturday', 'Groups only, 9 am to 1 pm'],
  ['Sunday', 'Closed'],
];

export default function ChatterboxSpeechPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wdth,wght@75..125,300..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Chatterbox</a>
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
        {/* ----------------------------------------------------------- HELLO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroWords}>
            <p className={s.kicker}>Speech and language therapy for children</p>
            <div className={s.bigBubble}>
              <h1 id="hero-h" className={s.title}>Every child has something <em>to say.</em></h1>
            </div>
            <div className={s.replyBubble}>
              <p className={s.lede}>
                We help children from eighteen months to twelve years with late
                talking, unclear speech, stuttering and understanding. Sessions
                are play, and parents stay in the room.
              </p>
            </div>
            <p className={s.actions}>
              <a className={s.primary} href="#book">Book a free first call</a>
              <a className={s.secondary} href="#milestones">Check the milestones</a>
            </p>
          </div>

          <div className={s.talk}>
            <div className={s.babble}>
              <div className={s.babbleField} aria-hidden="true">
                <TabbiedPattern
                  pattern={bangle}
                  palette={BABBLE}
                  fit="grid"
                  cellSize={56}
                  seed="chatterbox-babble"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.babbleSays}>Ba-ba! Mo! More!</p>
            </div>
            <Artwork
              slug="chatterbox-speech-talk"
              alt="A parent and a toddler sitting on the floor with a picture book, the toddler pointing and talking"
              inks={{ red: 'var(--tomato-art)', blue: 'var(--sky-type)', yellow: 'var(--sun-art)', black: 'var(--text)' }}
              className={s.talkArt}
            />
          </div>

          <ul className={s.chips}>
            {CHIPS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ MILESTONES */}
        <section id="milestones" className={s.milestones} aria-labelledby="milestones-h">
          <div className={s.sideHead}>
            <p className={s.eyebrow}>Is my child on track?</p>
            <h2 id="milestones-h">Talking milestones, <em>by age</em></h2>
            <p className={s.secNote}>
              Open the age closest to your child's. These are what most
              children do by then, not a test to pass. Children do not read the
              charts.
            </p>
            <p className={s.callout}>
              Two or more lines your child is not doing yet, or just a feeling
              you cannot shake? Call us. The first call is free.
            </p>
          </div>

          <div className={s.ages}>
            {MILESTONES.map((m) => (
              <details key={m.age} className={s.age} open={m.age === '2'}>
                <summary>
                  <span className={s.ageNum}>{m.age}</span>
                  <span className={s.ageLabel}>{m.label}</span>
                </summary>
                <ul className={s.checks}>
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------ RIPPLE BAND */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={bangle}
            palette={RIPPLE}
            fit="grid"
            cellSize={56}
            seed="chatterbox-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ HELP */}
        <section id="help" className={s.help} aria-labelledby="help-h">
          <div className={s.centerHead}>
            <p className={s.eyebrow}>What we help with</p>
            <h2 id="help-h">Six things parents <em>call about</em></h2>
          </div>
          <ul className={s.cloud}>
            {HELP.map(([t, d]) => (
              <li key={t} className={s.cloudItem}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ FIRST VISIT */}
        <section id="first-visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitHead}>
            <p className={s.eyebrow}>Your first assessment</p>
            <h2 id="visit-h">An hour on the floor, <em>as it goes</em></h2>
            <p className={s.secNote}>
              Assessments are on weekday mornings, when children are freshest.
              Bring a snack and a favorite toy. Siblings are welcome in the
              waiting room with a grown-up.
            </p>
            <div className={s.visitField} aria-hidden="true">
              <TabbiedPattern
                pattern={dotset}
                palette={DOTS}
                fit="grid"
                cellSize={32}
                seed="chatterbox-dots"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>

          <ol className={s.thread}>
            {VISIT.map((l) => (
              <li key={l.at} className={l.side === 'us' ? s.fromUs : s.fromYou}>
                <p className={s.meta}>
                  <span className={s.who}>{l.who}</span>
                  <time className={s.at}>{l.at}</time>
                </p>
                <p className={s.msg}>{l.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.team} aria-labelledby="team-h">
          <div className={s.centerHead}>
            <p className={s.eyebrow}>The therapists</p>
            <h2 id="team-h">Four people, <em>one playroom</em></h2>
            <p className={s.secNote}>
              Your child sees the same therapist every week. We pair you by
              what your child needs, and by which days work for you.
            </p>
          </div>
          <ul className={s.people}>
            {TEAM.map((t) => (
              <li key={t.name} className={s.person}>
                <p className={`${s.avatar} ${s[t.tone]}`}>{t.initials}</p>
                <div className={s.personBubble}>
                  <h3>{t.name}</h3>
                  <p className={s.role}>{t.role}</p>
                  <p>{t.about}</p>
                  <p className={s.days}>{t.days}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.fees} aria-labelledby="fees-h">
          <div className={s.feesBox}>
            <div className={s.feesField} aria-hidden="true">
              <TabbiedPattern
                pattern={bangle}
                palette={COINS}
                fit="grid"
                cellSize={48}
                seed="chatterbox-fees"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.feesBody}>
              <p className={s.eyebrow}>Fees and insurance</p>
              <h2 id="fees-h">What it costs, <em>up front</em></h2>
              <table className={s.feeTable}>
                <caption className={s.srOnly}>Fees for each service</caption>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Length</th>
                    <th scope="col">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map(([what, len, fee]) => (
                    <tr key={what}>
                      <th scope="row">{what}</th>
                      <td>{len}</td>
                      <td className={s.fee}>{fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.feeNotes}>
                <p>
                  In network with Harbor Family Health and Keystone Kids. For
                  other plans we give you a superbill to claim back yourself.
                </p>
                <p>
                  Six sliding-scale places each school term, no paperwork beyond
                  a conversation. Ask Dana.
                </p>
                <p>
                  Moving a session needs 24 hours. Later than that, we charge
                  half, unless your child is sick: then stay home, no charge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section className={s.faq} aria-labelledby="faq-h">
          <div className={s.centerHead}>
            <p className={s.eyebrow}>Things parents ask</p>
            <h2 id="faq-h">Questions, <em>answered</em></h2>
          </div>
          <div className={s.faqList}>
            {QUESTIONS.map(([q, a], i) => (
              <details key={q} className={s.qa} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <form className={s.form} action="#">
            <h2 id="book-h" className={s.formTitle}>Book a free <em>first call</em></h2>
            <p className={s.formNote}>
              Tell us a little, and one of us calls you back within two working
              days. Fifteen minutes, no charge, no obligation.
            </p>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="cb-child">Child's first name</label>
                <input id="cb-child" name="child" type="text" />
              </div>
              <div className={s.field}>
                <label htmlFor="cb-age">Age</label>
                <input id="cb-age" name="age" type="text" placeholder="e.g. 2 years 4 months" />
              </div>
              <div className={s.field}>
                <label htmlFor="cb-name">Your name</label>
                <input id="cb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="cb-phone">Phone</label>
                <input id="cb-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="cb-lang">Languages at home</label>
                <select id="cb-lang" name="lang" defaultValue="en">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="both">English and Spanish</option>
                  <option value="other">Another language</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="cb-when">Best time to call</label>
                <select id="cb-when" name="when" defaultValue="morning">
                  <option value="morning">Morning</option>
                  <option value="midday">Nap time</option>
                  <option value="evening">After 5 pm</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="cb-worry">What made you get in touch?</label>
                <textarea id="cb-worry" name="worry" rows={4} />
              </div>
            </div>
            <button className={s.submit} type="submit">Ask for a call</button>
          </form>

          <div className={s.place}>
            <h3 className={s.placeTitle}>The playroom</h3>
            <p className={s.address}>
              Suite 3, 88 Linden Avenue
              <br />
              Brookfield Heights
            </p>
            <p className={s.address}>
              <a href="tel:+15550173364">(555) 017-3364</a>
              <br />
              <a href="mailto:hello@chatterbox.example">hello@chatterbox.example</a>
            </p>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.small}>
              Ground floor, step-free, stroller parking inside the door. Two
              free parking spaces behind the building, marked with a bubble.
            </p>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Chatterbox</p>
        <p>A fictional speech therapy practice for children. The therapists, fees and plans are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
        <p>The parent and toddler are a generated picture, drawn in the page's own colors.</p>
      </footer>
    </div>
  );
}
