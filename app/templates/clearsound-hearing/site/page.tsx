import { TabbiedPattern } from 'tabbied/react';
import { ripplering } from 'tabbied/patterns';
import s from './clearsound-hearing.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Clearsound Hearing: Hearing clinic and audiology, Alder Avenue',
  description:
    'Clearsound Hearing tests hearing for free, fits and repairs hearing aids of every make and visits people at home. Large print, step by step: the test, your results, the prices.',
};

/* Site colors: the warm paper and four inks. The ring fields take only
   these, so a re-color reaches them too. */
const PAPER = '#fbf6ea';
const NAVY = '#14254a';
const YELLOW = '#ffcf33';
const SKY = '#9cc3e6';

const RINGS = [NAVY, SKY, PAPER, YELLOW];
const QUIET = ['transparent', SKY, NAVY];
const WARM = [YELLOW, NAVY, PAPER];

const NAV = [
  ['The test', '#test'],
  ['Results', '#results'],
  ['Hearing aids', '#aids'],
  ['Home visits', '#home'],
  ['Questions', '#faq'],
  ['Book', '#book'],
];

const SIGNS = [
  'You turn the television up, and other people turn it down.',
  'You hear people talking but miss the words, especially in a restaurant.',
  'You ask people to repeat themselves more than you used to.',
  'Women\'s and children\'s voices are harder to follow than men\'s.',
  'You hear a ringing or hissing when the room is quiet.',
  'Someone who loves you has said, more than once, that you should get tested.',
];

type Step = {
  n: string;
  min: number;
  time: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  { n: '1', min: 10, time: '10 minutes', title: 'We talk', body: 'About your hearing, your health, your work and what you find hardest. Bring a friend or family member if you like; they notice things you do not.' },
  { n: '2', min: 5, time: '5 minutes', title: 'We look in your ears', body: 'With a small light, and you can watch on a screen. If there is wax in the way we clear it first, free, so the test is fair.' },
  { n: '3', min: 15, time: '15 minutes', title: 'Beeps in headphones', body: 'You sit in our quiet room and press a button each time you hear a tone, however faint. Low notes, high notes, each ear on its own.' },
  { n: '4', min: 10, time: '10 minutes', title: 'Words in noise', body: 'You repeat short words, first in quiet, then with the sound of a busy cafe behind them. This is the part that matches real life.' },
  { n: '5', min: 10, time: '10 minutes', title: 'Your results', body: 'We draw them on a chart while you watch and explain every mark. You take a printed copy home.' },
  { n: '6', min: 10, time: '10 minutes', title: 'What happens next', body: 'Often nothing: many people just need a check in two years. If hearing aids would help, we say so, and then we let you go home and think.' },
];

const FREQS = ['250', '500', '1k', '2k', '4k', '8k'];
const LEVELS = ['0', '20', '40', '60', '80', '100', '120'];

/* A sample chart, the shape we see most: fine in the low notes, falling
   away in the high ones. dB is the level at which each ear first heard the
   tone; lo and hi are where speech sounds sit at that pitch. */
const POINTS = [
  { f: '250', right: 15, left: 20, lo: 20, hi: 45, sounds: 'm, oo' },
  { f: '500', right: 20, left: 20, lo: 20, hi: 50, sounds: 'd, b, i' },
  { f: '1k', right: 25, left: 30, lo: 25, hi: 55, sounds: 'a, o, ch' },
  { f: '2k', right: 40, left: 45, lo: 25, hi: 55, sounds: 'sh, k' },
  { f: '4k', right: 55, left: 60, lo: 25, hi: 50, sounds: 'f, s, th' },
  { f: '8k', right: 65, left: 70, lo: 30, hi: 45, sounds: 's' },
];

const BANDS = [
  ['Up to 25 dB', 'Typical hearing', 'You hear a whisper across a room.'],
  ['26 to 40 dB', 'Mild loss', 'Soft voices and the ends of words go missing.'],
  ['41 to 55 dB', 'Moderate loss', 'Conversation is hard without seeing faces.'],
  ['56 to 70 dB', 'Moderately severe', 'Most speech is too quiet to follow.'],
  ['71 dB and over', 'Severe to profound', 'Loud speech, and some sounds not at all.'],
];

type Aid = {
  band: string;
  price: string;
  suits: string;
  rows: string[];
};

const AIDS: Aid[] = [
  {
    band: 'Essential',
    price: '$1,800',
    suits: 'Quiet homes, one-to-one conversation, television.',
    rows: ['Battery, lasts about a week', 'Two programs, quiet and busy', 'Two-year warranty', 'Every fitting and follow-up included'],
  },
  {
    band: 'Everyday',
    price: '$3,200',
    suits: 'Most people. Shops, family dinners, the phone.',
    rows: ['Rechargeable, one night a charge', 'Adjusts itself to the room', 'Phone calls straight to the aids', 'Three-year warranty', 'Every fitting and follow-up included'],
  },
  {
    band: 'Advanced',
    price: '$4,600',
    suits: 'Busy restaurants, meetings, music, work.',
    rows: ['Rechargeable, with a charging case', 'Picks out the voice in front of you', 'Phone, television and music streaming', 'Four-year warranty, loss and damage cover', 'Every fitting and follow-up included'],
  },
];

const EXTRAS = [
  ['Hearing test', 'Free'],
  ['Wax removal', '$45 both ears, free before a test'],
  ['Repairs, any make', 'from $60, most done while you wait'],
  ['Batteries', '$6 for a card of six'],
  ['Custom earplugs, swimming or music', '$120 a pair'],
];

const HOME_READY = [
  'A quiet room, with the television and radio off',
  'A table and two chairs',
  'Your current hearing aids, if you have them',
  'A list of your medicines',
];

const TEAM = [
  { name: 'Dr. Nora Achebe, AuD', role: 'Audiologist, and the owner', note: 'Twenty-two years of testing ears. Does the tests, the fittings and most home visits.' },
  { name: 'Tom Whitfield', role: 'Hearing aid specialist', note: 'Repairs, tuning and the drop-in clinic. Can fix most makes on the spot.' },
  { name: 'Maria Lopes', role: 'Front desk', note: 'Answers the phone slowly and clearly, and signs ASL.' },
];

const FAQ = [
  ['Do I need a doctor\'s referral?', 'No. Call us or fill in the form and we will book you in. If we find anything a doctor should see, such as sudden loss in one ear, we will tell you the same day and write the letter.'],
  ['Will you try to sell me something?', 'We will tell you what we found and what would help. If that is hearing aids, you get a written quote to take home. We do not call you afterwards unless you ask us to.'],
  ['Can I try hearing aids before I pay?', 'Yes. Every pair comes with a 60-day trial. Bring them back in that time and we refund everything except a $150 fitting fee.'],
  ['Does insurance or Medicare pay for this?', 'Many plans pay for the test and some pay toward hearing aids. Bring your card and we will check your cover while you are here.'],
  ['I already have hearing aids from somewhere else.', 'Bring them in. We clean, repair and retune most makes, and we will not tell you to replace aids that still work.'],
];

const HOURS = [
  ['Monday to Friday', '9 am to 5 pm'],
  ['Saturday', '9 am to noon, drop-in repairs'],
  ['Sunday', 'Closed'],
];

export default function ClearsoundHearingPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;700&family=Atkinson+Hyperlegible+Next:ital,wght@0,400;0,700;0,800;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Clearsound Hearing</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.call} href="tel:+15550142290">(555) 014-2290</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* Text size: three targets the stylesheet reads with :has(), so the
            whole page grows with no script at all. */}
        <span id="text-standard" className={s.sizeTarget} />
        <span id="text-larger" className={s.sizeTarget} />
        <span id="text-largest" className={s.sizeTarget} />

        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Hearing tests and hearing aids, 212 Alder Avenue</p>
            <h1 id="hero-h" className={s.title}>A hearing test takes an hour. <em>It is free.</em></h1>
            <p className={s.lede}>
              We test adults of every age, fit and repair hearing aids of every
              make, and come to your home if getting here is hard. We face you
              when we speak, and we write everything down.
            </p>
            <div className={s.actions}>
              <a className={s.btnBig} href="tel:+15550142290">Call (555) 014-2290</a>
              <a className={s.btnLine} href="#book">Book online</a>
            </div>
            <div className={s.sizer}>
              <span className={s.sizerLabel}>Text size</span>
              <a className={s.sizeA} href="#text-standard">Standard</a>
              <a className={s.sizeB} href="#text-larger">Larger</a>
              <a className={s.sizeC} href="#text-largest">Largest</a>
            </div>
          </div>
          <div className={s.dish}>
            <div className={s.dishField} aria-hidden="true">
              <TabbiedPattern
                pattern={ripplering}
                palette={RINGS}
                fit="grid"
                cellSize={92}
                seed="clearsound-dish"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- SIGNS */}
        <section id="signs" className={s.signs} aria-labelledby="signs-h">
          <div className={s.col}>
            <h2 id="signs-h">Is it time for a test?</h2>
            <p className={s.note}>If two or more of these sound like you, it is worth an hour.</p>
            <ul className={s.checks}>
              {SIGNS.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEST */}
        <section id="test" className={s.test} aria-labelledby="test-h">
          <div className={s.col}>
            <p className={s.kicker}>Your first visit</p>
            <h2 id="test-h">The test, step by step</h2>
            <p className={s.note}>
              One hour in all. Nothing hurts, nothing goes inside your ear, and
              you can stop and ask a question at any point.
            </p>
          </div>

          <div className={s.wide}>
            <ol className={s.hour} aria-label="How the hour is spent">
              {STEPS.map((st) => (
                <li key={st.n} style={{ flexGrow: st.min }}>
                  <span className={s.hourNum}>{st.n}</span>
                  <span className={s.hourMin}>{st.time}</span>
                </li>
              ))}
            </ol>
            <p className={s.hourScale}>
              <span>0</span>
              <span>30 minutes</span>
              <span>60</span>
            </p>
          </div>

          <ol className={s.steps}>
            {STEPS.map((st) => (
              <li key={st.n}>
                <span className={s.stepNum}>{st.n}</span>
                <div>
                  <h3>{st.title}</h3>
                  <p className={s.stepTime}>{st.time}</p>
                  <p>{st.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- RESULTS */}
        <section id="results" className={s.results} aria-labelledby="results-h">
          <div className={s.col}>
            <p className={s.kicker}>The chart you take home</p>
            <h2 id="results-h">Reading your results</h2>
            <p className={s.note}>
              Your results are drawn on a chart called an audiogram. Low notes
              are on the left, high notes on the right. The lower a mark sits,
              the louder that note had to be before you heard it.
            </p>
          </div>

          <div className={s.chartWrap}>
            <figure className={s.chart}>
              <div className={s.chartGrid}>
                <ol className={s.levels} aria-hidden="true">
                  {LEVELS.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ol>
                <ol className={s.freqs}>
                  {POINTS.map((p) => (
                    <li
                      key={p.f}
                      className={s.freq}
                      style={{ '--right': p.right, '--left': p.left, '--lo': p.lo, '--hi': p.hi } as React.CSSProperties}>
                      <span className={s.freqLabel}>{p.f}</span>
                      <span className={s.speech}>{p.sounds}</span>
                      <span className={s.markRight}>
                        <span className={s.srOnly}>{`Right ear ${p.right} dB`}</span>
                      </span>
                      <span className={s.markLeft}>
                        <span className={s.srOnly}>{`Left ear ${p.left} dB`}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption className={s.chartCaption}>
                A sample chart: pitch in hertz across the top, loudness in
                decibels down the side. Circles are the right ear, crosses the
                left. The shaded band is where speech sounds sit.
              </figcaption>
            </figure>

            <div className={s.chartSide}>
              <h3>What this one says</h3>
              <p>
                Low notes are heard at normal levels. From 2,000 hertz up, the
                marks fall below the speech band: the sounds s, f and th are
                too quiet to hear. Vowels come through, so speech sounds loud
                enough but unclear.
              </p>
              <p>
                This is the most common pattern we see after sixty, and the one
                hearing aids help most.
              </p>
              <dl className={s.bands}>
                {BANDS.map(([range, name, what]) => (
                  <div key={range}>
                    <dt>{name}</dt>
                    <dd className={s.bandRange}>{range}</dd>
                    <dd>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* The quiet room: a band of rings between the chart and the prices. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={ripplering}
            palette={QUIET}
            fit="grid"
            cellSize={60}
            seed="clearsound-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ AIDS */}
        <section id="aids" className={s.aids} aria-labelledby="aids-h">
          <div className={s.col}>
            <p className={s.kicker}>Prices for a pair, everything included</p>
            <h2 id="aids-h">Hearing aids and what they cost</h2>
            <p className={s.note}>
              Three price bands, not thirty models. Every band includes the
              fitting, all the follow-up visits you need, cleaning for life and
              a 60-day trial.
            </p>
          </div>

          <div className={s.aidGrid}>
            {AIDS.map((a) => (
              <article key={a.band} className={s.aid} aria-labelledby={`aid-${a.band}`}>
                <h3 id={`aid-${a.band}`}>{a.band}</h3>
                <p className={s.aidPrice}>{a.price}</p>
                <p className={s.aidPer}>for a pair</p>
                <p className={s.aidSuits}>{a.suits}</p>
                <ul>
                  {a.rows.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={s.col}>
            <h3 className={s.extrasTitle}>Everything else</h3>
            <dl className={s.extras}>
              {EXTRAS.map(([what, cost]) => (
                <div key={what}>
                  <dt>{what}</dt>
                  <dd>{cost}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ HOME */}
        <section id="home" className={s.home} aria-labelledby="home-h">
          <div className={s.homeGrid}>
            <div className={s.homeField} aria-hidden="true">
              <TabbiedPattern
                pattern={ripplering}
                palette={WARM}
                fit="grid"
                cellSize={72}
                seed="clearsound-home"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.homeText}>
              <p className={s.kicker}>Tuesdays and Thursdays</p>
              <h2 id="home-h">We come to you</h2>
              <p>
                If getting to Alder Avenue is hard, we bring the clinic to your
                kitchen table: the same test with a portable audiometer and
                sound-proof headphones, and the same price, which is nothing.
                Anywhere within ten miles.
              </p>
              <p>
                We also visit six care homes each month. Staff can book a round
                of checks and repairs for residents with one call.
              </p>
              <h3>Please have ready</h3>
              <ul className={s.ready}>
                {HOME_READY.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <a className={s.btnBig} href="#book">Ask for a home visit</a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.team} aria-labelledby="team-h">
          <div className={s.col}>
            <h2 id="team-h">Who you will see</h2>
          </div>
          <ul className={s.people}>
            {TEAM.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p className={s.role}>{p.role}</p>
                <p>{p.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.col}>
            <h2 id="faq-h">Questions people ask us</h2>
            <div className={s.qs}>
              {FAQ.map(([q, a]) => (
                <details key={q} className={s.q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <h2 id="book-h">Book a test</h2>
              <p className={s.bookLede}>The quickest way is to call. Maria answers.</p>
              <a className={s.btnBig} href="tel:+15550142290">Call (555) 014-2290</a>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.address}>212 Alder Avenue, Suite 3</p>
              <p className={s.address}>Riverside Park, ground floor</p>
              <p className={s.getting}>
                Buses 14 and 22 stop outside. Four parking spaces at the back,
                two of them wide. Step-free from the pavement, with a hearing
                loop at the desk.
              </p>
            </div>

            <form className={s.form} action="#">
              <h3>Or ask us to call you</h3>
              <div className={s.field}>
                <label htmlFor="cs-name">Your name</label>
                <input id="cs-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="cs-phone">Phone number</label>
                <input id="cs-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={s.choice}>
                <legend>What would you like?</legend>
                <label className={s.option}>
                  <input type="radio" name="want" value="test" defaultChecked />
                  <span>A hearing test</span>
                </label>
                <label className={s.option}>
                  <input type="radio" name="want" value="home" />
                  <span>A home visit</span>
                </label>
                <label className={s.option}>
                  <input type="radio" name="want" value="repair" />
                  <span>A repair or retune</span>
                </label>
              </fieldset>
              <fieldset className={s.choice}>
                <legend>Best time to call</legend>
                <label className={s.option}>
                  <input type="radio" name="when" value="morning" defaultChecked />
                  <span>Morning</span>
                </label>
                <label className={s.option}>
                  <input type="radio" name="when" value="afternoon" />
                  <span>Afternoon</span>
                </label>
              </fieldset>
              <button className={s.submit} type="submit">Please call me</button>
              <p className={s.formNote}>We call back the same working day. If you prefer a text message, say so when we ring.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={ripplering}
            palette={RINGS}
            fit="grid"
            cellSize={48}
            seed="clearsound-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footText}>
          <p className={s.footName}>Clearsound Hearing</p>
          <p>A fictional hearing clinic. The people, prices and results are invented.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
