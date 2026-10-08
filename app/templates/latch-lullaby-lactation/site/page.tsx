import { TabbiedPattern } from 'tabbied/react';
import { softedge } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './latch-lullaby-lactation.module.css';

export const metadata = {
  title: 'Latch & Lullaby: Lactation consultant, home and virtual visits',
  description:
    'Latch & Lullaby is a lactation consultant who visits at home or by video. A gentle guide to the first six weeks of feeding, what a consultation covers, fees, and a calm way to ask for help.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The soft-edged
   squares are a baby blanket, each patch fading to nothing: a crescent moon
   in the hero, a strip of quilt under the timeline, the moon again over the
   evening contact page, and a hem along the footer. */
const MILK = '#fbf4ef';
const COCOA = '#3e2c33';
const ROSE = '#d99aa5';
const SAGE = '#9dbaa6';
const BUTTER = '#f0d48f';
const DUSK = '#6f6aa3';

const MOON = ['transparent', ROSE, BUTTER, SAGE, DUSK, ROSE];
const QUILT = ['transparent', SAGE, ROSE, BUTTER, DUSK, SAGE];
const NIGHT = ['transparent', BUTTER, ROSE, MILK, SAGE, BUTTER];
const HEM = ['transparent', ROSE, SAGE, BUTTER, DUSK, ROSE];

const NAV = [
  ['First weeks', '#weeks'],
  ['Visits', '#visits'],
  ['A consultation', '#consult'],
  ['Questions', '#questions'],
  ['Contact', '#contact'],
];

/* The timeline, one moon phase per step, from the first night to week six. */
const WEEKS = [
  {
    when: 'The first night',
    phase: 'm1',
    title: 'Skin to skin, little and often',
    normal: 'Eight to twelve feeds in a day and a night, of colostrum measured in teaspoons. A long sleepy stretch after the birth is common.',
    call: 'Your baby has not fed in the first six hours, or the latch hurts from the very first suck.',
  },
  {
    when: 'Days 2 and 3',
    phase: 'm2',
    title: 'Cluster feeds and tender nipples',
    normal: 'Feeds bunch together in the evening, sometimes every hour. Tenderness at the start of a feed that eases within a minute.',
    call: 'Pain lasts the whole feed, or a nipple is cracked or bleeding.',
  },
  {
    when: 'Days 3 to 5',
    phase: 'm3',
    title: 'Your milk comes in',
    normal: 'Breasts feel full, warm and heavy. Diapers turn from dark to yellow, and by day five there are six or more wet ones a day.',
    call: 'Fewer than six wet diapers by day five, or breasts so full your baby cannot latch.',
  },
  {
    when: 'Week 2',
    phase: 'm4',
    title: 'Back to birth weight',
    normal: 'Most babies are back to their birth weight by day ten to fourteen. Feeds get quicker as your baby gets stronger.',
    call: 'Your baby is still under birth weight at two weeks, or is hard to wake for feeds.',
  },
  {
    when: 'Weeks 3 and 4',
    phase: 'm5',
    title: 'The first growth spurt',
    normal: 'A few days of feeding constantly and fussing in the evening. It passes, and your supply rises to meet it.',
    call: 'You are thinking about a pump, a bottle or going back to work and would like a plan.',
  },
  {
    when: 'Week 6',
    phase: 'm6',
    title: 'Settling into a rhythm',
    normal: 'Feeds are shorter and easier to predict. Many parents feel, for the first time, that they know what they are doing.',
    call: 'You want to combine breast and bottle, wean, or simply hear that all is well.',
  },
];

const VISITS = [
  {
    kind: 'Home visit',
    title: 'I come to you',
    price: '$185',
    length: '90 minutes, then two weeks of text support',
    points: [
      'In your own chair, with your own pillows',
      'Baby weighed before and after a feed',
      'A written feeding plan left on the fridge',
      'No travel fee within 12 miles of Fenwick Green',
    ],
    note: 'Seven days a week, 8 am to 8 pm',
    tone: 'rose',
  },
  {
    kind: 'Virtual visit',
    title: 'From your sofa, on video',
    price: '$120',
    length: '60 minutes, then two weeks of text support',
    points: [
      'A phone propped on a cushion is all you need',
      'Good for second babies, pumping and going back to work',
      'Your written plan emailed the same evening',
      'From anywhere, for families who have moved away',
    ],
    note: 'Mornings and evenings, booked within 48 hours',
    tone: 'sage',
  },
];

const MORE = [
  ['Follow-up visit at home', '$95'],
  ['Follow-up visit by video', '$70'],
  ['Feeding class before the birth, for two', '$110'],
  ['Pump fitting and flange sizing', '$65'],
];

/* The ninety minutes of a first visit, sized by how long each part takes. */
const CONSULT = [
  ['talk', '15 minutes', 'We talk', 'Your birth, your baby, how feeds have gone so far, and what you hope for. There is no right answer.'],
  ['weigh', '10 minutes', 'We weigh', 'Before and after a feed, on a gentle scale, to see how much milk went in.'],
  ['watch', '25 minutes', 'We watch a feed', 'The latch, the suck and the swallow, and a look inside the mouth for a tongue tie.'],
  ['tryout', '20 minutes', 'We try things', 'New holds, a deeper latch, a pillow in a different place. Small changes, one at a time.'],
  ['plan', '20 minutes', 'We write a plan', 'Three or four things to do, on one page, in words that make sense at three in the morning.'],
];

const QUESTIONS = [
  ['Is it too late to get help?', 'No. I see parents at two days and at ten months. It is never too late to make feeding more comfortable.'],
  ['Do you only help with breastfeeding?', 'I help with whatever feeding looks like in your house: breast, pumped milk, formula, or all three. There is no judging here.'],
  ['Can my partner be there?', 'Please. Partners learn the holds too, and they are often the one who remembers the plan.'],
  ['Do you check for tongue tie?', 'Yes. I look and feel, and if I think it matters, I refer you to a pediatric doctor I trust.'],
];

export default function LatchLullabyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--milk': '#fbf4ef',
        '--cocoa': '#3e2c33',
        '--rose': '#d99aa5',
        '--sage': '#9dbaa6',
        '--butter': '#f0d48f',
        '--dusk': '#6f6aa3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="milk,cocoa,rose,sage,butter,dusk"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Nunito+Sans:wght@400;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Latch &amp; Lullaby</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Lactation care at home</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#contact">Ask for a visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* -------------------------------------------------------------- HERO
            A crescent moon cut from the soft blanket. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Lactation consultant, Fenwick Green and by video</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Feeding your baby, <em>gently,</em> from the first night.
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I am Ines Calloway, a lactation consultant and former maternity
              nurse. I come to your home, sit beside you through a feed, and
              leave you with a plan that makes sense at three in the morning.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#contact">Ask for a visit</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#weeks">The first six weeks</a>
            </div>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,4,3,5,2" className={s.moon} aria-hidden="true">
              <TabbiedPattern
                pattern={softedge}
                palette={MOON}
                fit="grid"
                cellSize={52}
                seed="latch-moon"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.tonight}>
              <p data-edit="intro.tonightLabel" data-edit-max="240" data-edit-multiline className={s.tonightLabel}>Visits this week</p>
              <p data-edit="intro.tonightText" data-edit-max="240" data-edit-multiline className={s.tonightText}>Two home visits left on Thursday, and video visits every evening until 8 pm.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ WEEKS
            The first six weeks, as a path of moon phases. */}
        <section id="weeks" className={s.weeks} aria-labelledby="weeks-h">
          <div className={s.secHead}>
            <p data-edit="weeks.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>A gentle timeline</p>
            <h2 data-edit="weeks.secTitle" data-edit-max="60" id="weeks-h" className={s.secTitle}>The first six weeks, from new moon to full</h2>
            <p data-edit="weeks.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              What is normal, and when to call. Every baby keeps their own
              time, so read this as a map, not a timetable.
            </p>
          </div>
          <ol className={s.timeline}>
            {WEEKS.map((w, i) => (
              <li key={w.when} className={s.step}>
                <span className={`${s.phase} ${s[w.phase]}`} aria-hidden="true" />
                <div className={s.stepCard}>
                  <p data-edit={`weeks.stepWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.stepWhen}>{w.when}</p>
                  <h3 data-edit={`weeks.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{w.title}</h3>
                  <p data-edit={`weeks.stepLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.stepLabel}>What is normal</p>
                  <p data-edit={`weeks.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{w.normal}</p>
                  <p data-edit={`weeks.stepLabel2.${i}`} data-edit-max="240" data-edit-multiline className={s.stepLabel}>Call me if</p>
                  <p data-edit={`weeks.stepText2.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{w.call}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,4,5,3" className={s.quilt} aria-hidden="true">
          <TabbiedPattern
            pattern={softedge}
            palette={QUILT}
            fit="grid"
            cellSize={44}
            seed="latch-quilt"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ VISITS */}
        <section id="visits" className={s.sec} aria-labelledby="visits-h">
          <div className={s.secHead}>
            <p data-edit="visits.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Home and virtual visits</p>
            <h2 data-edit="visits.secTitle" data-edit-max="60" id="visits-h" className={s.secTitle}>Two ways to see me</h2>
            <p data-edit="visits.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Both come with two weeks of text support afterwards, because the
              hardest questions arrive the day after a visit.
            </p>
          </div>
          <div className={s.visitCards}>
            {VISITS.map((v, i) => (
              <article key={v.kind} className={`${s.visit} ${s[v.tone]}`}>
                <p data-edit={`visit.visitKind.${i}`} data-edit-max="240" data-edit-multiline className={s.visitKind}>{v.kind}</p>
                <h3 data-edit={`visit.visitTitle.${i}`} data-edit-max="40" className={s.visitTitle}>{v.title}</h3>
                <p data-edit={`visit.visitPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.visitPrice}>{v.price}</p>
                <p data-edit={`visit.visitLength.${i}`} data-edit-max="240" data-edit-multiline className={s.visitLength}>{v.length}</p>
                <ul className={s.visitPoints}>
                  {v.points.map((p, j) => (
                    <li data-edit={`visit.item.${i}.${j}`} data-edit-max="80" key={`${i}-${j}`}>{p}</li>
                  ))}
                </ul>
                <p data-edit={`visit.visitNote.${i}`} data-edit-max="240" data-edit-multiline className={s.visitNote}>{v.note}</p>
              </article>
            ))}
          </div>
          <div className={s.more}>
            <h3 data-edit="visits.moreTitle" data-edit-max="40" className={s.moreTitle}>And afterwards</h3>
            <dl className={s.moreList}>
              {MORE.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`visits.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`visits.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="visits.moreNote" data-edit-max="240" data-edit-multiline className={s.moreNote}>Receipts are coded for insurance and health savings accounts. Ask about a sliding fee if money is tight.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- CONSULT */}
        <section id="consult" className={s.sec} aria-labelledby="consult-h">
          <div className={s.secHead}>
            <p data-edit="consult.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>What a consultation covers</p>
            <h2 data-edit="consult.secTitle" data-edit-max="60" id="consult-h" className={s.secTitle}>Ninety minutes, unhurried</h2>
            <p data-edit="consult.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A first home visit, part by part. Feeds do not keep to a clock,
              so neither do I: if your baby falls asleep, we wait.
            </p>
          </div>
          <div className={s.clock} aria-hidden="true">
            {CONSULT.map(([key]) => (
              <span key={key} className={`${s.slice} ${s[key]}`} />
            ))}
          </div>
          <ol className={s.consult}>
            {CONSULT.map(([key, mins, title, text], i) => (
              <li key={key} className={s.part}>
                <span className={`${s.partDot} ${s[key]}`} aria-hidden="true" />
                <h3 data-edit={`consult.partTitle.${i}`} data-edit-max="40" className={s.partTitle}>{title}</h3>
                <p data-edit={`consult.partMins.${i}`} data-edit-max="240" data-edit-multiline className={s.partMins}>{mins}</p>
                <p data-edit={`consult.partText.${i}`} data-edit-max="240" data-edit-multiline className={s.partText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.questions}>
            <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Things parents ask</h2>
            <dl className={s.faq}>
              {QUESTIONS.map(([q, a], i) => (
                <div key={q}>
                  <dt data-edit={`questions.term.${i}`} data-edit-max="28">{q}</dt>
                  <dd data-edit={`questions.body.${i}`} data-edit-max="200" data-edit-multiline>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- CONTACT
            The evening page: the moon over a quiet form. */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactText}>
              <div data-edit-pattern="contact.field" data-edit-roles="transparent,4,2,0,3,4" className={s.nightMoon} aria-hidden="true">
                <TabbiedPattern
                  pattern={softedge}
                  palette={NIGHT}
                  fit="grid"
                  cellSize={30}
                  seed="latch-night"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h2 data-edit="contact.contactTitle" data-edit-max="60" id="contact-h" className={s.contactTitle}>Ask for help, whenever you are ready</h2>
              <p data-edit="contact.contactLead" data-edit-max="240" data-edit-multiline className={s.contactLead}>
                Send a few words, or just your number. I reply within three
                hours in the day, and first thing if you write at night.
              </p>
              <dl className={s.reach}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Phone and text</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550153120">(555) 015-3120</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@latchandlullaby.example">hello@latchandlullaby.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Visits</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Seven days a week, 8 am to 8 pm</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Where</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Your home in Fenwick Green, Marlow Park, Esterbrook and the villages between, or the quiet room at 22 Hollin Lane on Tuesdays</dd>
                </div>
              </dl>
              <div className={s.urgent}>
                <p data-edit="contact.urgentTitle" data-edit-max="240" data-edit-multiline className={s.urgentTitle}>Call your midwife or doctor today if</p>
                <p data-edit="contact.urgentText" data-edit-max="240" data-edit-multiline className={s.urgentText}>your baby is very hard to wake for feeds, has no wet diaper in eight hours, or you have a fever with a hot, red patch on one breast.</p>
              </div>
            </div>

            <form className={s.form} action="#">
              <p data-edit="contact.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>A quiet note to Ines</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ll-name">Your name</label>
                <input id="ll-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ll-reach">Phone or email</label>
                <input id="ll-reach" name="reach" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="ll-age">Baby's age</label>
                <input id="ll-age" name="age" type="text" />
              </div>
              <fieldset className={s.fieldset}>
                <legend data-edit="contact.legend">Kind of visit</legend>
                <div className={s.picks}>
                  <input id="ll-k1" type="radio" name="kind" value="home" />
                  <label data-edit="contact.label4" htmlFor="ll-k1">At home</label>
                  <input id="ll-k2" type="radio" name="kind" value="video" />
                  <label data-edit="contact.label5" htmlFor="ll-k2">By video</label>
                  <input id="ll-k3" type="radio" name="kind" value="unsure" />
                  <label data-edit="contact.label6" htmlFor="ll-k3">Not sure yet</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="contact.label7" htmlFor="ll-note">How are feeds going</label>
                <textarea id="ll-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send the note</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Nothing you write is shared with anyone, ever.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,5,2" className={s.hem} aria-hidden="true">
          <TabbiedPattern
            pattern={softedge}
            palette={HEM}
            fit="grid"
            cellSize={36}
            seed="latch-hem"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Latch &amp; Lullaby</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Lactation care at home and by video, Fenwick Green.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional lactation practice. The consultant, prices, places and phone number are invented, and nothing here is medical advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
