import { TabbiedPattern } from 'tabbied/react';
import { ziggurat } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './stepwell-executive.module.css';

export const metadata = {
  title: 'Stepwell Executive Coaching: A leadership program in five levels',
  description:
    'Stepwell coaches senior leaders through a twelve-month program in five levels, from knowing your own defaults to building the leaders who follow you. The 360 review explained, who we work with, and the engagement terms in plain words.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The stepped
   field is the practice's mark: staircases climbing in four directions. It
   fills a stepped temple in the hero, runs as a band under the program,
   climbs beside the contact form and lays the last course of the footer. */
const STONE = '#f2f0ea';
const INK = '#10292b';
const TEAL = '#2a7f79';
const SIGNAL = '#e0663a';
const OCHRE = '#f0b440';
const MINT = '#bcd9d1';

const TEMPLE = ['transparent', MINT, TEAL, SIGNAL, OCHRE, STONE];
const BAND = ['transparent', TEAL, INK, OCHRE, SIGNAL, MINT];
const CLIMB = ['transparent', MINT, TEAL, OCHRE, SIGNAL, STONE];
const COURSE = ['transparent', TEAL, INK, SIGNAL, OCHRE, MINT];

const NAV = [
  ['The program', '#program'],
  ['360 review', '#review'],
  ['Clients', '#clients'],
  ['Terms', '#terms'],
  ['Contact', '#contact'],
];

/* The program, bottom step to top. */
const LEVELS = [
  {
    no: 'Level 1',
    tone: 'lv1',
    name: 'Self',
    months: 'Months 1 and 2',
    focus: 'Know your defaults: how you decide, what you avoid, and what you do under pressure.',
    work: ['The 360 review', 'Two weeks of energy and calendar audit', 'A one-page leadership charter'],
  },
  {
    no: 'Level 2',
    tone: 'lv2',
    name: 'One to one',
    months: 'Months 3 and 4',
    focus: 'The hard conversations: feedback that lands, saying no, and asking for what you need.',
    work: ['Rehearsals of real conversations', 'Your manager joins one session', 'A feedback habit you keep'],
  },
  {
    no: 'Level 3',
    tone: 'lv3',
    name: 'Team',
    months: 'Months 5 to 7',
    focus: 'Delegating whole outcomes, running meetings worth attending, and letting others be good.',
    work: ['One team session, observed', 'A decision rights map', 'Your meeting calendar, halved'],
  },
  {
    no: 'Level 4',
    tone: 'lv4',
    name: 'Organization',
    months: 'Months 8 to 10',
    focus: 'Influence without authority: peers, the board, and the strategy you are asked to carry.',
    work: ['A map of the people you need', 'A board or exec presentation, rehearsed', 'Your strategy in one page'],
  },
  {
    no: 'Level 5',
    tone: 'lv5',
    name: 'Succession',
    months: 'Months 11 and 12',
    focus: 'Building the leaders who follow you, so the next promotion is not blocked by your chair.',
    work: ['A named successor plan', 'Two people you are now coaching', 'A closing 360, to see the climb'],
  },
];

/* The 360, seen from above like a stepped temple: rings of raters round
   the person at the center. */
const RINGS = [
  ['ringOthers', 'Others', 'A board member, a key client, a partner from outside'],
  ['ringReports', 'Direct reports', 'Five to eight of them'],
  ['ringPeers', 'Peers', 'Four to six, chosen with your manager'],
  ['ringManager', 'Your manager', 'One, and named'],
];

const REVIEW_STEPS = [
  ['Choose', 'You and I pick twelve to sixteen people who see you work from different sides.'],
  ['Ask', 'Each answers 30 questions and three open ones, in about fifteen minutes, anonymously.'],
  ['Read', 'Your report arrives in three weeks. Groups under three are folded together so no one is exposed.'],
  ['Debrief', 'Two hours with me, the report on the table, and no defending allowed for the first hour.'],
  ['Choose again', 'Two strengths to lean on and one habit to change. That is the plan for Level 2 onwards.'],
];

const CLIENTS = [
  ['VP of Engineering, a 400-person software company', 'I stopped being the bottleneck in about four months, and nobody noticed except my calendar.'],
  ['Chief Operating Officer, a regional hospital group', 'The 360 told me something my team had been too polite to say for three years.'],
  ['Founder and CEO, a 60-person design firm', 'We built a second layer of leaders, so I could take my first real holiday since we started.'],
];

const NUMBERS = [
  ['84', 'leaders coached since 2016'],
  ['9', 'months, the average engagement'],
  ['7 in 10', 'promoted within two years'],
];

const FEES = [
  ['The full program', 'Five levels, twelve months, 24 sessions, both 360s', '$21,000'],
  ['A single level', 'Three months, six sessions', '$4,800'],
  ['The 360 review alone', 'Survey, report and a two-hour debrief', '$3,200'],
  ['Leadership team day', 'One facilitated day, up to ten people', '$5,500'],
];

const TERMS = [
  ['Confidential', 'Your company pays, but hears only that we met and the goals you agreed to share. Never what you said.'],
  ['A chemistry call first', 'Thirty minutes, free. If we are not the right fit, I will name two coaches who might be.'],
  ['Sessions', 'Ninety minutes, every two weeks, in person or by video. Reschedule with 48 hours notice at no charge.'],
  ['Paying', 'Quarterly in advance. Either side may end the engagement with thirty days notice, and unused sessions are refunded.'],
];

export default function StepwellExecutivePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stone': '#f2f0ea',
        '--ink': '#10292b',
        '--teal': '#2a7f79',
        '--signal': '#e0663a',
        '--ochre': '#f0b440',
        '--mint': '#bcd9d1',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stone,ink,teal,signal,ochre,mint"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Manrope:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markGlyph} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Stepwell</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Executive Coaching</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="#contact">Book a chemistry call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* -------------------------------------------------------------- HERO
            A stepped temple of stairs, beside the promise. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Executive coaching for senior leaders</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Leadership, <em>one level</em> at a time.
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Stepwell is a twelve-month program for people who have just been
              handed more than they can do alone. Five levels, from knowing
              your own defaults to building the leaders who come after you,
              with a 360 review at the start and the end to show the climb.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#contact">Book a chemistry call</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#program">See the five levels</a>
            </div>
            <p data-edit="intro.heroWho" data-edit-max="240" data-edit-multiline className={s.heroWho}>Dana Whitcombe, coach. Twenty years running operations, nine years coaching.</p>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,5,2,3,4,0" className={s.temple} aria-hidden="true">
              <TabbiedPattern
                pattern={ziggurat}
                palette={TEMPLE}
                fit="grid"
                cellSize={40}
                seed="stepwell-temple"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- PROGRAM
            Five cards that climb like stairs. */}
        <section id="program" className={s.sec} aria-labelledby="program-h">
          <div className={s.secHead}>
            <p data-edit="program.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The program</p>
            <h2 data-edit="program.secTitle" data-edit-max="60" id="program-h" className={s.secTitle}>Five levels, twelve months, one climb</h2>
            <p data-edit="program.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Each level ends with something you can show: a charter, a
              decision map, a successor. You can join at any level; most people
              start at the bottom whatever their title.
            </p>
          </div>
          <ol className={s.stairs}>
            {LEVELS.map((l, i) => (
              <li key={l.no} className={`${s.stair} ${s[l.tone]}`}>
                <p data-edit={`program.stairNo.${i}`} data-edit-max="240" data-edit-multiline className={s.stairNo}>{l.no}</p>
                <h3 data-edit={`program.stairName.${i}`} data-edit-max="40" className={s.stairName}>{l.name}</h3>
                <p data-edit={`program.stairMonths.${i}`} data-edit-max="240" data-edit-multiline className={s.stairMonths}>{l.months}</p>
                <p data-edit={`program.stairFocus.${i}`} data-edit-max="240" data-edit-multiline className={s.stairFocus}>{l.focus}</p>
                <ul className={s.stairWork}>
                  {l.work.map((w, j) => (
                    <li data-edit={`program.item.${i}.${j}`} data-edit-max="80" key={`${i}-${j}`}>{w}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,1,4,3,5" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={ziggurat}
            palette={BAND}
            fit="grid"
            cellSize={36}
            seed="stepwell-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ REVIEW
            The 360, drawn from above as rings of raters. */}
        <section id="review" className={s.sec} aria-labelledby="review-h">
          <div className={s.secHead}>
            <p data-edit="review.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The 360 review, explained</p>
            <h2 data-edit="review.secTitle" data-edit-max="60" id="review-h" className={s.secTitle}>How everyone around you sees you, in one report</h2>
            <p data-edit="review.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              It is called a 360 because the answers come from every side:
              above, beside and below. It is the most useful two hours of the
              program, and the most uncomfortable.
            </p>
          </div>
          <div className={s.reviewGrid}>
            <div className={s.rings}>
              {RINGS.map(([cls, who, count], i) => (
                <div key={cls} className={`${s.ring} ${s[cls]}`}>
                  <p data-edit={`review.ringWho.${i}`} data-edit-max="240" data-edit-multiline className={s.ringWho}>{who}</p>
                  <p data-edit={`review.ringCount.${i}`} data-edit-max="240" data-edit-multiline className={s.ringCount}>{count}</p>
                </div>
              ))}
              <div className={s.ringYou}>
                <p data-edit="review.ringWho2" data-edit-max="240" data-edit-multiline className={s.ringWho}>You</p>
              </div>
            </div>
            <ol className={s.reviewSteps}>
              {REVIEW_STEPS.map(([t, d], i) => (
                <li key={t}>
                  <h3 data-edit={`review.reviewStep.${i}`} data-edit-max="40" className={s.reviewStep}>{t}</h3>
                  <p data-edit={`review.reviewText.${i}`} data-edit-max="240" data-edit-multiline className={s.reviewText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- CLIENTS */}
        <section id="clients" className={s.clients} aria-labelledby="clients-h">
          <div className={s.clientsInner}>
            <div className={s.clientsHead}>
              <p data-edit="clients.clientsKicker" data-edit-max="240" data-edit-multiline className={s.clientsKicker}>Clients</p>
              <h2 data-edit="clients.clientsTitle" data-edit-max="60" id="clients-h" className={s.clientsTitle}>Who climbs with us</h2>
              <dl className={s.numbers}>
                {NUMBERS.map(([n, d], i) => (
                  <div key={d}>
                    <dt data-edit={`clients.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`clients.body.${i}`} data-edit-max="200" data-edit-multiline>{n}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ul className={s.quotes}>
              {CLIENTS.map(([who, quote], i) => (
                <li key={who} className={s.quote}>
                  <blockquote data-edit={`clients.quoteText.${i}`} data-edit-max="240" data-edit-multiline className={s.quoteText}>{quote}</blockquote>
                  <p data-edit={`clients.quoteWho.${i}`} data-edit-max="240" data-edit-multiline className={s.quoteWho}>{who}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- TERMS */}
        <section id="terms" className={s.sec} aria-labelledby="terms-h">
          <div className={s.secHead}>
            <p data-edit="terms.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Engagement terms</p>
            <h2 data-edit="terms.secTitle" data-edit-max="60" id="terms-h" className={s.secTitle}>What it costs, and what you can count on</h2>
            <p data-edit="terms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most clients are paid for by their company. The terms below are
              the same either way, and they are the whole contract.
            </p>
          </div>
          <div className={s.termsGrid}>
            <table className={s.fees}>
              <caption data-edit="terms.srOnly" className={s.srOnly}>Engagement fees</caption>
              <thead>
                <tr>
                  <th data-edit="terms.heading" scope="col">Engagement</th>
                  <th data-edit="terms.heading2" scope="col">Fee</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map(([name, what, fee], i) => (
                  <tr key={name}>
                    <th scope="row">
                      <span data-edit={`terms.feeName.${i}`} data-edit-max="60" className={s.feeName}>{name}</span>
                      <span data-edit={`terms.feeWhat.${i}`} data-edit-max="60" className={s.feeWhat}>{what}</span>
                    </th>
                    <td data-edit={`terms.cell.${i}`}>{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ol className={s.terms}>
              {TERMS.map(([t, d], i) => (
                <li key={t}>
                  <h3 data-edit={`terms.termTitle.${i}`} data-edit-max="40" className={s.termTitle}>{t}</h3>
                  <p data-edit={`terms.termText.${i}`} data-edit-max="240" data-edit-multiline className={s.termText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Start with a thirty-minute call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                No pitch. We talk about what changed in your job, and whether
                coaching is the right next step. If it is not, I will say so.
              </p>
              <dl className={s.reach}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550196600">(555) 019-6600</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:dana@stepwell.example">dana@stepwell.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>300 Granary Row, sixth floor</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Sessions</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Monday to Thursday, 7:30 to 6:00</dd>
                </div>
              </dl>
              <div data-edit-pattern="contact.field" data-edit-roles="transparent,5,2,4,3,0" className={s.climb} aria-hidden="true">
                <TabbiedPattern
                  pattern={ziggurat}
                  palette={CLIMB}
                  fit="grid"
                  cellSize={32}
                  seed="stepwell-climb"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="sw-name">Name</label>
                <input id="sw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="sw-email">Work email</label>
                <input id="sw-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="sw-role">Your role</label>
                <input id="sw-role" name="role" type="text" autoComplete="organization-title" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="sw-org">Organization and size</label>
                <input id="sw-org" name="org" type="text" autoComplete="organization" />
              </div>
              <fieldset className={`${s.fieldset} ${s.wide}`}>
                <legend data-edit="contact.legend">Who would pay</legend>
                <div className={s.picks}>
                  <input id="sw-p1" type="radio" name="payer" value="me" />
                  <label data-edit="contact.label5" htmlFor="sw-p1">I would</label>
                  <input id="sw-p2" type="radio" name="payer" value="company" />
                  <label data-edit="contact.label6" htmlFor="sw-p2">My company</label>
                  <input id="sw-p3" type="radio" name="payer" value="unsure" />
                  <label data-edit="contact.label7" htmlFor="sw-p3">Not sure yet</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label8" htmlFor="sw-note">What changed in your job</label>
                <textarea id="sw-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>I reply within one working day with three times to choose from.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,1,3,4,5" className={s.course} aria-hidden="true">
          <TabbiedPattern
            pattern={ziggurat}
            palette={COURSE}
            fit="grid"
            cellSize={30}
            seed="stepwell-course"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Stepwell Executive Coaching</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>300 Granary Row, sixth floor. (555) 019-6600.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional coaching practice. The coach, clients, figures, fees and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
