import { TabbiedPattern } from 'tabbied/react';
import { jigsaw } from 'tabbied/patterns';
import s from './small-steps-ot.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Small Steps Pediatric OT: Occupational therapy for children',
  description:
    'Small Steps is a pediatric occupational therapy clinic on Tumbling Lane. Play-based therapy for fine motor skills, handwriting, sensory processing and self-care, for children from 1 to 12.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The jigsaw is
   the clinic's mark, because every child is a puzzle that fits together in
   its own way: the hero is cut out of it, a band runs under the first
   session, the take-home kit is a box of it, and it edges the footer. */
const CREAM = '#fbf6ec';
const INDIGO = '#2f2a5a';
const SKY = '#2d8fd5';
const GRASS = '#6fb43f';
const SUN = '#ffc83d';
const CORAL = '#ff6b5b';

const PIECES = ['transparent', INDIGO, SKY, GRASS, SUN, CORAL];
const BRIGHT = ['transparent', CORAL, SUN, SKY, GRASS, SUN];
const KIT = ['transparent', SKY, GRASS, SUN, CORAL, SKY];
const FOOT = ['transparent', SKY, GRASS, SUN, CORAL, CREAM];

const NAV = [
  ['What we help with', '#helps'],
  ['First visit', '#first'],
  ['Home programs', '#home'],
  ['Parent FAQ', '#faq'],
  ['Contact', '#contact'],
];

/* The pieces: each area of everyday life, with the milestones most
   children reach in it. */
const AREAS = [
  {
    name: 'Fine motor',
    tone: 'sky',
    what: 'The small muscles of the hand: buttons, zips, snaps, scissors and the pincer grip.',
    marks: [['By 3', 'Turns pages one at a time'], ['By 5', 'Snips along a line'], ['By 6', 'Does up most buttons']],
  },
  {
    name: 'Handwriting',
    tone: 'sun',
    what: 'Holding a pencil comfortably, forming letters, and writing without tiring or tears.',
    marks: [['By 4', 'Draws a circle and a cross'], ['By 5', 'Writes their own name'], ['By 7', 'Copies a sentence']],
  },
  {
    name: 'Self-care',
    tone: 'grass',
    what: 'Dressing, eating with a fork and spoon, brushing teeth and the morning routine.',
    marks: [['By 2', 'Pulls off socks and hat'], ['By 4', 'Dresses with a little help'], ['By 6', 'Ties shoelaces']],
  },
  {
    name: 'Sensory',
    tone: 'coral',
    what: 'Noise, textures, haircuts, sock seams and picky eating: how a body takes in the world.',
    marks: [['By 3', 'Tries a new food with help'], ['By 4', 'Copes with a busy room'], ['By 6', 'Sits through a haircut']],
  },
  {
    name: 'Play and friends',
    tone: 'indigo',
    what: 'Taking turns, sharing a game, joining in at the playground without a meltdown.',
    marks: [['By 3', 'Plays beside other children'], ['By 4', 'Takes turns in a game'], ['By 5', 'Plays by simple rules']],
  },
  {
    name: 'Coordination',
    tone: 'sky',
    what: 'Stairs, catching, bikes, climbing frames, and knowing where the body is in space.',
    marks: [['By 3', 'Walks up stairs, a foot per step'], ['By 5', 'Hops on one foot'], ['By 6', 'Rides with training wheels']],
  },
];

const STEPS = [
  { when: '15 minutes, free', what: 'A phone chat', text: 'Tell us what you are seeing at home or at school. We say honestly whether OT is the right fit.' },
  { when: '90 minutes', what: 'The evaluation', text: 'It looks like play: games, puzzles and an obstacle course. You stay in the room the whole time.' },
  { when: 'Within a week', what: 'Goals together', text: 'A written report in plain words, and three or four goals agreed with you, not handed to you.' },
  { when: '45 minutes, weekly', what: 'Sessions', text: 'Play with a purpose, the same therapist every week, and five minutes at the end on what to try at home.' },
];

const GAMES = [
  ['Pom-pom rescue', 'Tweezers, pom-poms and an ice cube tray.', 'Pincer grip for pencils'],
  ['Playdough snakes', 'Roll, pinch and hide beads inside.', 'Hand strength'],
  ['Cushion mountain', 'An obstacle course from the sofa cushions.', 'Planning and balance'],
  ['Shaving-cream letters', 'Write on a baking tray, wipe, try again.', 'Letters without pressure'],
  ['Heavy work', 'Carry the shopping, push the laundry basket.', 'Calming a busy body'],
];

const KIT_ITEMS = [
  'Therapy putty in two strengths',
  'A slant board for writing',
  'Pencil grips to try',
  'A picture schedule for mornings',
];

const FAQS = [
  ['Do we need a referral?', 'No. You can book an evaluation directly. Some insurance plans ask for a note from your pediatrician, and we will tell you if yours does before the first visit.'],
  ['Does insurance cover it?', 'Most plans cover pediatric OT with a diagnosis code from the evaluation. We bill in-network for six plans and give you a receipt for the rest. A session is $125 without insurance.'],
  ['How long will my child need therapy?', 'Most children come weekly for three to six months, then less often. We look at the goals together every eight weeks and stop when they are met.'],
  ['Can I watch the sessions?', 'Yes, and we hope you will. Younger children usually do best with a parent in the room. Older ones sometimes prefer a window.'],
  ['What if my child will not join in?', 'That happens, and it is information too. We start with whatever they will do, even if it is lying under the swing, and build from there.'],
  ['Is this the same as physical therapy?', 'Not quite. Physical therapy works on big movement like walking. OT works on the everyday jobs of being a child: playing, eating, dressing and school.'],
];

const HOURS = [
  ['Monday to Thursday', '8:00-6:30'],
  ['Friday', '8:00-3:00'],
  ['Saturday', '9:00-12:00, every other week'],
];

export default function SmallStepsOtPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fbf6ec',
        '--indigo': '#2f2a5a',
        '--sky': '#2d8fd5',
        '--grass': '#6fb43f',
        '--sun': '#ffc83d',
        '--coral': '#ff6b5b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,indigo,sky,grass,sun,coral"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDot} aria-hidden="true" />
          <span className={s.brandText}>
            <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Small Steps</span>
            <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Pediatric OT</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="#contact">Book a free call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A whole puzzle, with the hero card as the piece laid on top. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,5" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={jigsaw}
              palette={PIECES}
              fit="grid"
              cellSize={72}
              seed="small-steps-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroCard}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Pediatric occupational therapy, ages 1 to 12</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Helping kids fit the <em>everyday pieces</em> together.
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Buttons and pencils, bedtime and haircuts, playgrounds and
                lunchboxes. Play-based therapy in a bright clinic on Tumbling
                Lane, with parents in the room and homework that feels like games.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free 15-minute call</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#helps">What OT helps with</a>
              </div>
              <ul className={s.heroFacts}>
                <li data-edit="hero.item" data-edit-max="80">No referral needed</li>
                <li data-edit="hero.item2" data-edit-max="80">Six insurance plans</li>
                <li data-edit="hero.item3" data-edit-max="80">Evaluations within two weeks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- HELPS
            Six pieces of a childhood, each with the milestones in it. */}
        <section id="helps" className={s.sec} aria-labelledby="helps-h">
          <div className={s.secHead}>
            <h2 data-edit="helps.secTitle" data-edit-max="60" id="helps-h" className={s.secTitle}>The pieces we work on</h2>
            <p data-edit="helps.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every child reaches these in their own order and at their own
              pace. If one piece keeps not fitting, and it is making daily life
              hard, that is when OT helps.
            </p>
          </div>
          <ul className={s.pieces}>
            {AREAS.map((area, i) => (
              <li key={area.name} className={`${s.piece} ${s[area.tone]}`}>
                <h3 data-edit={`helps.pieceName.${i}`} data-edit-max="40" className={s.pieceName}>{area.name}</h3>
                <p data-edit={`helps.pieceWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.pieceWhat}>{area.what}</p>
                <dl className={s.marks}>
                  {area.marks.map(([age, mark], i2) => (
                    <div key={mark}>
                      <dt data-edit={`helps.term.${i}.${i2}`} data-edit-max="28">{age}</dt>
                      <dd data-edit={`helps.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{mark}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <p data-edit="helps.helpsNote" data-edit-max="240" data-edit-multiline className={s.helpsNote}>Milestones are averages, not deadlines. Plenty of children reach one late and catch up on their own.</p>
        </section>

        {/* ----------------------------------------------------------- FIRST */}
        <section id="first" className={s.sec} aria-labelledby="first-h">
          <div className={s.secHead}>
            <h2 data-edit="first.secTitle" data-edit-max="60" id="first-h" className={s.secTitle}>Your first visit, step by step</h2>
            <p data-edit="first.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              From the first call to a weekly session usually takes two to three
              weeks. Nothing about it should feel like a test, for your child or
              for you.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map((step, i) => (
              <li key={step.what} className={s.step}>
                <span className={s.stepNo}>{i + 1}</span>
                <p data-edit={`first.stepWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.stepWhen}>{step.when}</p>
                <h3 data-edit={`first.stepWhat.${i}`} data-edit-max="40" className={s.stepWhat}>{step.what}</h3>
                <p data-edit={`first.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,5,4,2,3,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={jigsaw}
            palette={BRIGHT}
            fit="grid"
            cellSize={56}
            seed="small-steps-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ HOME
            Five-minute games for the kitchen table, and the kit to take home. */}
        <section id="home" className={s.sec} aria-labelledby="home-h">
          <div className={s.homeGrid}>
            <div>
              <h2 data-edit="home.secTitle" data-edit-max="60" id="home-h" className={s.secTitle}>Home programs: five minutes, most days</h2>
              <p data-edit="home.homeNote" data-edit-max="240" data-edit-multiline className={s.homeNote}>
                Therapy is one hour a week. Home is the other hundred. Every
                child leaves with two or three games picked for them, and these
                are the ones families ask for again.
              </p>
              <ul className={s.games}>
                {GAMES.map(([name, how, builds], i) => (
                  <li key={name} className={s.game}>
                    <h3 data-edit={`home.gameName.${i}`} data-edit-max="40" className={s.gameName}>{name}</h3>
                    <p data-edit={`home.gameHow.${i}`} data-edit-max="240" data-edit-multiline className={s.gameHow}>{how}</p>
                    <p data-edit={`home.gameBuilds.${i}`} data-edit-max="240" data-edit-multiline className={s.gameBuilds}>{builds}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.kit}>
              <div data-edit-pattern="home.field" data-edit-roles="transparent,2,3,4,5,2" className={s.kitField} aria-hidden="true">
                <TabbiedPattern
                  pattern={jigsaw}
                  palette={KIT}
                  fit="grid"
                  cellSize={48}
                  seed="small-steps-kit"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.kitLabel}>
                <h3 data-edit="home.kitTitle" data-edit-max="40" className={s.kitTitle}>The take-home kit</h3>
                <p data-edit="home.kitPrice" data-edit-max="240" data-edit-multiline className={s.kitPrice}>$35, yours to keep</p>
                <ul className={s.kitList}>
                  {KIT_ITEMS.map((item, i) => (
                    <li data-edit={`home.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqGrid}>
            <div>
              <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Questions parents ask</h2>
              <p data-edit="faq.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                And if yours is not here, ask it on the free call. There is no
                such thing as a silly question about your own child.
              </p>
            </div>
            <div className={s.faqs}>
              {FAQS.map(([q, a], i) => (
                <details key={q} className={s.faq}>
                  <summary data-edit={`faq.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a free call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Leave a time that suits you and one of our therapists will ring,
                usually the same day.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>18 Tumbling Lane, Hollowbrook</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Ground floor, stroller parking by the door, a quiet room for waiting.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550158800">(555) 015-8800</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@smallstepsot.example">hello@smallstepsot.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ss-name">Your name</label>
                <input id="ss-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ss-phone">Phone</label>
                <input id="ss-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="ss-email">Email</label>
                <input id="ss-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="ss-age">Your child&apos;s age</label>
                <select id="ss-age" name="age" defaultValue="3-5">
                  <option value="1-2">1 to 2</option>
                  <option value="3-5">3 to 5</option>
                  <option value="6-8">6 to 8</option>
                  <option value="9-12">9 to 12</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="ss-worry">What are you noticing?</label>
                <textarea id="ss-worry" name="worry" rows={4} />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="ss-when">A good time to call</label>
                <input id="ss-when" name="when" type="text" />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,5,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={jigsaw}
            palette={FOOT}
            fit="grid"
            cellSize={40}
            seed="small-steps-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Small Steps Pediatric OT</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional therapy clinic. The therapists, prices, plans and address are invented, and nothing here is medical advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
