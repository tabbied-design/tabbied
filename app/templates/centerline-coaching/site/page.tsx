import { TabbiedPattern } from 'tabbied/react';
import { spiralblock } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './centerline-coaching.module.css';

export const metadata = {
  title: 'Centerline Coaching: Life coaching toward one clear next step',
  description:
    'Centerline is a life coaching practice for people at a turning point: a career change, a new role, a life that has drifted. Programs from a single session to six months, and a free discovery call to start.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   squared spiral that winds toward its center. The hero is one turn of it,
   five blocks closing in on the call to action, two of them filled with
   spiralblock's coils; below, each section is a ring inside the last, its
   rules one continuous line, and at the very center the discovery call
   sits on a field of the same coils. */
const LILAC = '#ebe5f2';
const INDIGO = '#261f4a';
const PERSIMMON = '#e2603a';
const GOLD = '#e9b44c';
const SAGE = '#7fa38b';
const VIOLET = '#8a76c4';

const COILS = ['transparent', INDIGO, PERSIMMON, GOLD, SAGE, VIOLET];
const COILS_WARM = ['transparent', GOLD, PERSIMMON, VIOLET, INDIGO, SAGE];
const COILS_CENTER = ['transparent', VIOLET, SAGE, GOLD, PERSIMMON, LILAC];
const COILS_FOOT = ['transparent', LILAC, VIOLET, PERSIMMON, GOLD, SAGE];

const NAV = [
  ['What coaching is', '#coaching'],
  ['Programs', '#programs'],
  ['How it works', '#process'],
  ['About', '#coach'],
  ['Discovery call', '#call'],
];

const IS = [
  ['About your next step', 'We look forward. The past comes in only where it explains what keeps repeating.'],
  ['Your agenda', 'You bring the question. I ask better ones, and I say what I notice.'],
  ['Small experiments', 'Each session ends with one thing to try before the next. Most are done in a week.'],
  ['Confidential', 'Nothing you say leaves the room, including to an employer who pays for it.'],
];

const IS_NOT = [
  ['Therapy', 'If grief, anxiety or depression is in the way, I will help you find a therapist, and we can coach alongside.'],
  ['Advice', 'I will not tell you to quit your job. You will know whether to by the end.'],
  ['A quick fix', 'One session clears the air. Change takes about three months of trying things.'],
  ['For a crisis', 'If you are in danger or crisis, call your doctor or local emergency services first.'],
];

type Program = { name: string; length: string; price: string; text: string; includes: string[] };

const PROGRAMS: Program[] = [
  {
    name: 'One clear session',
    length: '90 minutes',
    price: '$240',
    text: 'For one decision that will not settle. We map it, weigh it, and you leave with a next step and a date for it.',
    includes: ['A short questionnaire first', 'Notes from the session by email'],
  },
  {
    name: 'Twelve weeks',
    length: 'Six sessions, every two weeks',
    price: '$1,450',
    text: 'The core program, for a career change, a new role or a life that has drifted. Most clients start here.',
    includes: ['Six 60-minute sessions', 'Messages between sessions', 'A values and strengths review'],
  },
  {
    name: 'Leading well',
    length: 'Six months',
    price: '$3,200',
    text: 'For new managers and founders. Monthly sessions, a feedback interview with your team, and a plan for your first year.',
    includes: ['Six 75-minute sessions', '360 interviews with five colleagues', 'Employer invoicing available'],
  },
];

const STEPS = [
  ['The discovery call', 'Thirty minutes, free. You tell me what is going on; I tell you honestly whether coaching will help and which program fits.'],
  ['The outer ring', 'The first session maps everything at once: work, health, people, money, time. We find the one area pulling the rest off center.'],
  ['Turning inward', 'Each session narrows the question and ends with one experiment. You report what happened; we adjust.'],
  ['The center', 'A last session to name what changed and what you will keep doing without me. Then a check-in call three months later.'],
];

const FACTS = [
  ['Clients coached', '310'],
  ['Coaching hours', '2,400'],
  ['Credential', 'Professional Certified Coach'],
  ['Before coaching', '14 years as a school principal'],
];

export default function CenterlineCoachingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--lilac': '#ebe5f2',
        '--indigo': '#261f4a',
        '--persimmon': '#e2603a',
        '--gold': '#e9b44c',
        '--sage': '#7fa38b',
        '--violet': '#8a76c4',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="lilac,indigo,persimmon,gold,sage,violet"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Centerline</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Coaching</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="#call">Free discovery call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            One turn of the spiral: text, coils, a question, coils, and the
            way in at the center. */}
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Life coaching on Meridian Street and by video</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Find the center, <em>then move from it.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              For people at a turning point: a career change, a new role, a life
              that drifted while you were busy. We start wide, turn inward
              session by session, and finish with one clear next step you
              actually take.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#call">Book a free discovery call</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#programs">See the programs</a>
            </div>
          </div>
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,5" className={s.cellB} aria-hidden="true">
            <TabbiedPattern
              pattern={spiralblock}
              palette={COILS}
              fit="grid"
              cellSize={56}
              seed="centerline-outer"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.cellC}>
            <p data-edit="hero.cLabel" data-edit-max="240" data-edit-multiline className={s.cLabel}>Where we start</p>
            <p data-edit="hero.cQuestion" data-edit-max="240" data-edit-multiline className={s.cQuestion}>What would you do if this year went exactly right?</p>
          </div>
          <div data-edit-pattern="hero.field2" data-edit-roles="transparent,3,2,5,1,4" className={s.cellD} aria-hidden="true">
            <TabbiedPattern
              pattern={spiralblock}
              palette={COILS_WARM}
              fit="grid"
              cellSize={40}
              seed="centerline-inner"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <a className={s.cellE} href="#call">
            <span data-edit="hero.eLabel" data-edit-max="60" className={s.eLabel}>Start here</span>
            <span data-edit="hero.eText" data-edit-max="60" className={s.eText}>30 minutes, free</span>
          </a>
        </section>

        {/* The spiral: each ring holds a section and the next ring. */}
        <div className={s.spiral}>
          <section id="coaching" className={s.turn} aria-labelledby="coaching-h">
            <p data-edit="coaching.turnNo" data-edit-max="240" data-edit-multiline className={s.turnNo}>Turn 1</p>
            <h2 data-edit="coaching.title" data-edit-max="60" id="coaching-h" className={s.title}>What coaching is, and what it is not</h2>
            <div className={s.isGrid}>
              <div className={s.isCol}>
                <h3 data-edit="coaching.isHead" data-edit-max="40" className={s.isHead}>Coaching is</h3>
                <dl className={s.isList}>
                  {IS.map(([t, d], i) => (
                    <div key={t}>
                      <dt data-edit={`coaching.term.${i}`} data-edit-max="28">{t}</dt>
                      <dd data-edit={`coaching.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={`${s.isCol} ${s.isNot}`}>
                <h3 data-edit="coaching.isHead2" data-edit-max="40" className={s.isHead}>Coaching is not</h3>
                <dl className={s.isList}>
                  {IS_NOT.map(([t, d], i) => (
                    <div key={t}>
                      <dt data-edit={`coaching.term2.${i}`} data-edit-max="28">{t}</dt>
                      <dd data-edit={`coaching.body2.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          <div className={s.ring}>
            <section id="programs" className={s.turn} aria-labelledby="programs-h">
              <p data-edit="programs.turnNo" data-edit-max="240" data-edit-multiline className={s.turnNo}>Turn 2</p>
              <h2 data-edit="programs.title" data-edit-max="60" id="programs-h" className={s.title}>Programs</h2>
              <p data-edit="programs.note" data-edit-max="240" data-edit-multiline className={s.note}>
                Every program starts with the free call and can be paid in
                monthly parts. Sessions are in the studio or by video, your
                choice each time.
              </p>
              <ul className={s.programs}>
                {PROGRAMS.map((p, i) => (
                  <li key={p.name} className={s.program}>
                    <p data-edit={`programs.progLength.${i}`} data-edit-max="240" data-edit-multiline className={s.progLength}>{p.length}</p>
                    <h3 data-edit={`programs.progName.${i}`} data-edit-max="40" className={s.progName}>{p.name}</h3>
                    <p data-edit={`programs.progPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.progPrice}>{p.price}</p>
                    <p data-edit={`programs.progText.${i}`} data-edit-max="240" data-edit-multiline className={s.progText}>{p.text}</p>
                    <ul className={s.progIncludes}>
                      {p.includes.map((inc, i2) => (
                        <li data-edit={`programs.item.${i}.${i2}`} data-edit-max="80" key={inc}>{inc}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>

            <div className={s.ring}>
              <section id="process" className={s.turn} aria-labelledby="process-h">
                <p data-edit="process.turnNo" data-edit-max="240" data-edit-multiline className={s.turnNo}>Turn 3</p>
                <h2 data-edit="process.title" data-edit-max="60" id="process-h" className={s.title}>How it works, from the outside in</h2>
                <ol className={s.steps}>
                  {STEPS.map(([t, d], i) => (
                    <li key={t} className={s.step}>
                      <span className={s.stepNo}>{i + 1}</span>
                      <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                      <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <div className={s.ring}>
                <section id="coach" className={s.turn} aria-labelledby="coach-h">
                  <p data-edit="coach.turnNo" data-edit-max="240" data-edit-multiline className={s.turnNo}>Turn 4</p>
                  <div className={s.coachGrid}>
                    <div>
                      <h2 data-edit="coach.title" data-edit-max="60" id="coach-h" className={s.title}>Imogen Teller</h2>
                      <p data-edit="coach.coachLead" data-edit-max="240" data-edit-multiline className={s.coachLead}>
                        I ran a school for fourteen years and spent most of them
                        in conversations about what people wanted next, for their
                        children and for themselves. I trained as a coach in 2017
                        and opened Centerline two years later.
                      </p>
                      <p data-edit="coach.coachText" data-edit-max="240" data-edit-multiline className={s.coachText}>
                        My clients are mostly between thirty and sixty: teachers
                        leaving teaching, managers new to managing, parents going
                        back to work, and people who simply feel off center. I am
                        direct, I laugh a lot, and I will hold you to the thing
                        you said you would try.
                      </p>
                    </div>
                    <dl className={s.facts}>
                      {FACTS.map(([t, d], i) => (
                        <div key={t}>
                          <dt data-edit={`coach.term.${i}`} data-edit-max="28">{t}</dt>
                          <dd data-edit={`coach.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </section>

                <div className={`${s.ring} ${s.center}`}>
                  <section id="call" className={s.turn} aria-labelledby="call-h">
                    <p data-edit="call.turnNo" data-edit-max="240" data-edit-multiline className={s.turnNo}>The center</p>
                    <h2 data-edit="call.title" data-edit-max="60" id="call-h" className={s.title}>Book a free discovery call</h2>
                    <div className={s.callGrid}>
                      <div className={s.callInfo}>
                        <p data-edit="call.note" data-edit-max="240" data-edit-multiline className={s.note}>
                          Thirty minutes by phone or video. No preparation, no
                          pitch: if coaching is not the right help, I will say so.
                        </p>
                        <dl className={s.contactList}>
                          <div>
                            <dt data-edit="call.term" data-edit-max="28">Studio</dt>
                            <dd data-edit="call.body" data-edit-max="200" data-edit-multiline>2nd floor, 64 Meridian Street, Ashgrove</dd>
                          </div>
                          <div>
                            <dt data-edit="call.term2" data-edit-max="28">Phone</dt>
                            <dd data-edit="call.body2" data-edit-max="200" data-edit-multiline>(555) 017-2290</dd>
                          </div>
                          <div>
                            <dt data-edit="call.term3" data-edit-max="28">Email</dt>
                            <dd data-edit="call.body3" data-edit-max="200" data-edit-multiline>imogen@centerline.example</dd>
                          </div>
                          <div>
                            <dt data-edit="call.term4" data-edit-max="28">Sessions</dt>
                            <dd data-edit="call.body4" data-edit-max="200" data-edit-multiline>Monday to Thursday 8:00-7:00, Friday 8:00-1:00</dd>
                          </div>
                        </dl>
                      </div>
                      <div className={s.callField}>
                        <div data-edit-pattern="call.field" data-edit-roles="transparent,5,4,3,2,0" className={s.coreCoils} aria-hidden="true">
                          <TabbiedPattern
                            pattern={spiralblock}
                            palette={COILS_CENTER}
                            fit="grid"
                            cellSize={44}
                            seed="centerline-center"
                            style={{ position: 'absolute', inset: 0 }}
                          />
                        </div>
                        <form className={s.form} action="#">
                          <div className={s.field}>
                            <label data-edit="call.label" htmlFor="cl-name">Name</label>
                            <input id="cl-name" name="name" type="text" autoComplete="name" />
                          </div>
                          <div className={s.field}>
                            <label data-edit="call.label2" htmlFor="cl-email">Email</label>
                            <input id="cl-email" name="email" type="email" autoComplete="email" />
                          </div>
                          <div className={s.field}>
                            <label data-edit="call.label3" htmlFor="cl-when">Best time for the call</label>
                            <select id="cl-when" name="when" defaultValue="morning">
                              <option value="morning">Weekday morning</option>
                              <option value="lunch">Lunchtime</option>
                              <option value="evening">Early evening</option>
                            </select>
                          </div>
                          <div className={s.field}>
                            <label data-edit="call.label4" htmlFor="cl-what">What would you like to change</label>
                            <textarea id="cl-what" name="what" rows={3} />
                          </div>
                          <button data-edit="call.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
                        </form>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,5,2,3,4" className={s.footCoils} aria-hidden="true">
          <TabbiedPattern
            pattern={spiralblock}
            palette={COILS_FOOT}
            fit="grid"
            cellSize={32}
            seed="centerline-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Centerline Coaching</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional coaching practice. The coach, programs, prices and address are invented, and nothing here is medical or psychological advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
