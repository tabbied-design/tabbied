import { TabbiedPattern } from 'tabbied/react';
import { snubsquare } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './qed-math-tutoring.module.css';

export const metadata = {
  title: 'Q.E.D. Math Tutoring: Math tutor, middle school to university',
  description:
    'Q.E.D. is one math tutor and a blackboard: pre-algebra to calculus, statistics and first proofs, online or in person at the Larch Street Library. The first lesson is free.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   blackboard and the snub square tiling is chalked on it: squares and
   triangles, five to a vertex. It is Figure 1 in the hero, Figure 2 between
   the lemmas, the border of the corollary and the foot of the board. */
const SLATE = '#1f2d2b';
const CHALK = '#ecebe2';
const YELLOW = '#f0cf62';
const PINK = '#ec8f8a';
const BLUE = '#8cc3e6';

const TILING = ['transparent', CHALK, PINK, BLUE, YELLOW, CHALK];
const BAND = ['transparent', BLUE, CHALK, PINK, YELLOW, BLUE];
const FRAME = ['transparent', PINK, CHALK, BLUE, YELLOW, CHALK];
const FOOT = ['transparent', YELLOW, BLUE, CHALK, PINK, CHALK];

const NAV = [
  ['Levels', '#levels'],
  ['Sessions', '#sessions'],
  ['Method', '#method'],
  ['Free lesson', '#free'],
  ['Book', '#book'],
];

const LEVELS = [
  ['Middle school', 'Fractions, ratios, negative numbers, first equations', 'Ages 11-13', '$55'],
  ['Algebra I and II', 'Linear and quadratic functions, systems, exponents, logs', 'Ages 13-16', '$60'],
  ['Geometry', 'Two-column proofs, constructions, right-triangle trig', 'Ages 14-16', '$60'],
  ['Precalculus', 'Functions, the unit circle, sequences, limits by intuition', 'Ages 15-17', '$65'],
  ['AP Calculus AB and BC', 'Derivatives, integrals, series, and the free-response section', 'Ages 16-18', '$75'],
  ['AP Statistics', 'Distributions, inference, and reading a study critically', 'Ages 16-18', '$70'],
  ['SAT and ACT math', 'Timing, the traps, and the twelve topics that come up most', 'Any age', '$75'],
  ['University', 'Linear algebra, discrete math, and learning to write a proof', 'Adults', '$85'],
];

const SESSIONS = [
  ['Case 1', 'Online', '60 minutes', 'Live on a shared whiteboard: a tablet and pen on my side, whatever you have on yours. Every board is saved as a PDF and sent after the lesson.'],
  ['Case 2', 'In person', '60 minutes', 'In study room 4 at the Larch Street Library, or at your kitchen table within four miles for $15 more.'],
  ['Case 3', 'Small group', '90 minutes', 'Two to four students at the same level, Saturday mornings, $35 each. Good for a class that has the same test coming.'],
];

/* The method as a two-column proof: each statement with its reason. */
const PROOF = [
  ['We find exactly where understanding stops.', 'A 20-minute diagnostic, no grade, no pressure.'],
  ['We repair the earliest gap first.', 'Every later topic rests on it.'],
  ['The student explains each idea back to me.', 'Explaining is the test of knowing.'],
  ['Practice is short, daily and mixed.', 'Spaced practice outlasts cramming.'],
  ['Parents get a note after every lesson.', 'What we did, what is next, what to practice.'],
  ['Therefore the grades follow.', 'By steps 1 to 5.'],
];

const REMARKS = [
  ['How soon do grades improve?', 'Most students see it on the second test after starting, usually six to eight weeks in. Confidence comes sooner, often by the third lesson.'],
  ['Do you set homework?', 'Fifteen minutes a day, never more, with the answers given so the student can check. Little and often is the point.'],
  ['There is a test next week. Can you help?', 'Yes, and we will cover what is on it. But the real fix takes longer than a week, and I will say so honestly.'],
  ['Do you teach adults?', 'Often: nurses with a dosage exam, engineers going back to school, parents who want to help with homework. Nobody is too old.'],
];

const HOURS = [
  ['Monday to Friday', '3:30-8:30 pm'],
  ['Saturday', '9 am-1 pm, groups at 10'],
  ['Sunday', 'Closed'],
];

const PICK_LEVELS = ['Middle school', 'Algebra', 'Geometry', 'Precalculus', 'Calculus', 'Statistics', 'SAT or ACT', 'University'];
const PICK_WHERE = ['Online', 'At the library', 'At home'];

export default function QedMathTutoringPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--slate': '#1f2d2b',
        '--chalk': '#ecebe2',
        '--yellow': '#f0cf62',
        '--pink': '#ec8f8a',
        '--blue': '#8cc3e6',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="slate,chalk,yellow,pink,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,600;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Q.E.D.</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Math Tutoring</span>
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
        {/* HERO: the theorem, the start of its proof, and Figure 1. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.label" data-edit-max="240" data-edit-multiline className={s.label}>Theorem 1</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Anyone can learn mathematics, <em>one clear step at a time.</em>
            </h1>
            <p data-edit="intro.proofMark" data-edit-max="240" data-edit-multiline className={s.proofMark}>Proof.</p>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Let the student be anyone from eleven to adult, with any grade so
              far. We begin from what they already know, find the first step
              that went missing, and build forward from there, one lesson a
              week, until the next step is obvious to them.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#free">Claim the free first lesson</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#levels">See the levels</a>
            </div>
          </div>
          <figure className={s.figure}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,1,3,4,2,1" className={s.tiling} aria-hidden="true">
              <TabbiedPattern pattern={snubsquare} palette={TILING} fit="grid" cellSize={64} seed="qed-figure-1" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <figcaption data-edit="intro.figCaption" data-edit-max="120" data-edit-multiline className={s.figCaption}>Fig. 1. The snub square tiling. Two squares and three triangles meet at every vertex, always in the order 3.3.4.3.4.</figcaption>
          </figure>
        </section>

        {/* LEMMA 1: levels */}
        <section id="levels" className={s.sec} aria-labelledby="levels-h">
          <div className={s.secHead}>
            <p data-edit="levels.label" data-edit-max="240" data-edit-multiline className={s.label}>Lemma 1</p>
            <h2 data-edit="levels.title" data-edit-format="emphasis" data-edit-max="60" id="levels-h" className={s.secTitle}>
              There is a course <em>for every level.</em>
            </h2>
            <p data-edit="levels.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
              Rates are per hour, the same online and in person. Ten lessons
              booked together are 10 percent less.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.levels}>
              <caption data-edit="levels.srOnly" className={s.srOnly}>Courses by level with ages and hourly rate</caption>
              <thead>
                <tr>
                  <th data-edit="levels.heading" scope="col">Course</th>
                  <th data-edit="levels.heading2" scope="col">What it covers</th>
                  <th data-edit="levels.heading3" scope="col">Who</th>
                  <th data-edit="levels.heading4" scope="col">Per hour</th>
                </tr>
              </thead>
              <tbody>
                {LEVELS.map(([course, covers, who, rate], i) => (
                  <tr key={course}>
                    <th data-edit={`levels.heading5.${i}`} scope="row">{course}</th>
                    <td data-edit={`levels.cell.${i}`}>{covers}</td>
                    <td data-edit={`levels.who.${i}`} className={s.who}>{who}</td>
                    <td data-edit={`levels.rate.${i}`} className={s.rate}>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* LEMMA 2: sessions */}
        <section id="sessions" className={s.sec} aria-labelledby="sessions-h">
          <div className={s.secHead}>
            <p data-edit="sessions.label" data-edit-max="240" data-edit-multiline className={s.label}>Lemma 2</p>
            <h2 data-edit="sessions.title" data-edit-format="emphasis" data-edit-max="60" id="sessions-h" className={s.secTitle}>
              The board can be <em>yours or mine.</em>
            </h2>
          </div>
          <ul className={s.sessions}>
            {SESSIONS.map(([label, name, length, text], i) => (
              <li key={name} className={s.session}>
                <p data-edit={`sessions.caseNo.${i}`} data-edit-max="240" data-edit-multiline className={s.caseNo}>{label}</p>
                <h3 data-edit={`sessions.sessionName.${i}`} data-edit-max="40" className={s.sessionName}>{name}</h3>
                <p data-edit={`sessions.sessionLength.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionLength}>{length}</p>
                <p data-edit={`sessions.sessionText.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionText}>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <figure className={s.band}>
          <div data-edit-pattern="top.field" data-edit-roles="transparent,4,1,3,2,4" className={s.bandTiling} aria-hidden="true">
            <TabbiedPattern pattern={snubsquare} palette={BAND} fit="grid" cellSize={48} seed="qed-figure-2" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <figcaption data-edit="top.bandCaption" data-edit-max="120" data-edit-multiline className={s.bandCaption}>Fig. 2. The same tiling, extended without end. Every new tile is forced by the ones beside it.</figcaption>
        </figure>

        {/* LEMMA 3: method as a two-column proof */}
        <section id="method" className={s.sec} aria-labelledby="method-h">
          <div className={s.methodGrid}>
            <div className={s.secHead}>
              <p data-edit="method.label" data-edit-max="240" data-edit-multiline className={s.label}>Lemma 3</p>
              <h2 data-edit="method.title" data-edit-format="emphasis" data-edit-max="60" id="method-h" className={s.secTitle}>
                Every lesson is <em>a small proof.</em>
              </h2>
              <p data-edit="method.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
                Written the way geometry class writes them, statements on the
                left and reasons on the right, because that is how the lessons
                actually run.
              </p>
              <div className={s.tutor}>
                <p data-edit="method.tutorName" data-edit-max="240" data-edit-multiline className={s.tutorName}>Ruth Abernathy</p>
                <p data-edit="method.tutorText" data-edit-max="240" data-edit-multiline className={s.tutorText}>
                  PhD in mathematics. Nine years teaching high school, five
                  tutoring full time. State teaching license, grades 7-12, and a
                  background check renewed this year.
                </p>
              </div>
            </div>
            <table className={s.proof}>
              <caption data-edit="method.srOnly" className={s.srOnly}>The method as a two-column proof</caption>
              <thead>
                <tr>
                  <th data-edit="method.heading" scope="col">Statement</th>
                  <th data-edit="method.heading2" scope="col">Reason</th>
                </tr>
              </thead>
              <tbody>
                {PROOF.map(([statement, reason], i) => (
                  <tr key={statement}>
                    <th data-edit={`method.heading3.${i}`} scope="row">{statement}</th>
                    <td data-edit={`method.cell.${i}`}>{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* COROLLARY: the free first lesson, framed in the tiling. */}
        <section id="free" className={s.freeSec} aria-labelledby="free-h">
          <div className={s.corollary}>
            <div data-edit-pattern="free.field" data-edit-roles="transparent,3,1,4,2,1" className={s.frame} aria-hidden="true">
              <TabbiedPattern pattern={snubsquare} palette={FRAME} fit="grid" cellSize={40} seed="qed-frame" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className={s.corollaryCard}>
              <p data-edit="free.label" data-edit-max="240" data-edit-multiline className={s.label}>Corollary</p>
              <h2 data-edit="free.title" data-edit-format="emphasis" data-edit-max="60" id="free-h" className={s.corollaryTitle}>
                The first lesson <em>costs nothing.</em>
              </h2>
              <p data-edit="free.corollaryText" data-edit-max="240" data-edit-multiline className={s.corollaryText}>
                Forty-five minutes, online or at the library. The student leaves
                with a diagnosis, the one gap to close first and a plan for the
                term, whether or not you book a second lesson.
              </p>
              <a data-edit="free.button" data-edit-max="28" className={s.button} href="#book">Book the free lesson</a>
            </div>
          </div>
        </section>

        {/* REMARKS */}
        <section id="remarks" className={s.sec} aria-labelledby="remarks-h">
          <div className={s.secHead}>
            <p data-edit="remarks.label" data-edit-max="240" data-edit-multiline className={s.label}>Remarks</p>
            <h2 data-edit="remarks.secTitle" data-edit-max="60" id="remarks-h" className={s.secTitle}>Questions parents ask</h2>
          </div>
          <dl className={s.remarks}>
            {REMARKS.map(([q, a], i) => (
              <div key={q} className={s.remark}>
                <dt data-edit={`remarks.term.${i}`} data-edit-max="28">{q}</dt>
                <dd data-edit={`remarks.body.${i}`} data-edit-max="200" data-edit-multiline>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* BOOK: the end of the proof. */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <p data-edit="book.label" data-edit-max="240" data-edit-multiline className={s.label}>Conclusion</p>
              <h2 data-edit="book.title" data-edit-format="emphasis" data-edit-max="60" id="book-h" className={s.secTitle}>
                Book a lesson, <em>and the rest follows.</em>
              </h2>
              <p data-edit="book.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
                Write, call, or fill in the form. I answer between lessons,
                always the same day.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Room</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Study room 4, Larch Street Library</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>(555) 018-4471</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>proofs@qedtutoring.example</dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body4.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="book.qed" data-edit-max="240" data-edit-multiline className={s.qed}>Q.E.D.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="qd-student">Student name</label>
                <input id="qd-student" name="student" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="qd-parent">Parent or guardian, if under 18</label>
                <input id="qd-parent" name="parent" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="qd-email">Email</label>
                <input id="qd-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="qd-phone">Phone</label>
                <input id="qd-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="book.legend">Level</legend>
                <div className={s.picks}>
                  {PICK_LEVELS.map((p, i) => (
                    <div key={p} className={s.pick}>
                      <input id={`qd-level-${i}`} type="radio" name="level" value={p} />
                      <label data-edit={`book.label6.${i}`} htmlFor={`qd-level-${i}`}>{p}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="book.legend2">Where</legend>
                <div className={s.picks}>
                  {PICK_WHERE.map((p, j) => (
                    <div key={p} className={s.pick}>
                      <input id={`qd-where-${j}`} type="radio" name="where" value={p} />
                      <label data-edit={`book.label7.${j}`} htmlFor={`qd-where-${j}`}>{p}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label8" htmlFor="qd-note">What feels hard right now</label>
                <textarea id="qd-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Book the free lesson</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,1,3,1" className={s.footTiling} aria-hidden="true">
          <TabbiedPattern pattern={snubsquare} palette={FOOT} fit="grid" cellSize={36} seed="qed-foot-b" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Q.E.D. Math Tutoring</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional tutoring practice. The names, people, prices and address
            are invented for this template.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
