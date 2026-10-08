import { TabbiedPattern } from 'tabbied/react';
import { ell } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './corner-case-ux.module.css';

export const metadata = {
  title: 'Corner Case UX: User research and usability testing for product teams',
  description:
    'Corner Case is an independent UX research practice. Interviews, usability testing and diary studies, written up as findings your team can act on. Methods, sample findings, case studies and engagement types.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The ell is
   the practice's mark: L-shaped brackets locking a grid together, every
   one turned to its own corner. In ink, cobalt, signal pink and lime on a
   transparent ground, it fills the big L on the report's cover, a band
   between the findings and the case studies, and the footer's edge. */
const PAPER = '#fbfbf8';
const INK = '#141414';
const COBALT = '#2f4cf0';
const PINK = '#ff5c8a';
const LIME = '#c8f04f';

const COVER = ['transparent', INK, COBALT, PINK, LIME, COBALT];
const BAND = ['transparent', COBALT, PINK, LIME, INK, PINK];
const NOTE = ['transparent', LIME, COBALT, PINK, PAPER, LIME];

const NAV = [
  ['Methods', '#methods'],
  ['Findings', '#findings'],
  ['Case studies', '#cases'],
  ['Engagements', '#engagements'],
  ['Contact', '#contact'],
];

const STATS = [
  ['Interviews run in 2026', '212'],
  ['Usability studies', '38'],
  ['Median days to findings', '9'],
];

type Method = { name: string; when: string; sample: string; takes: string };

const METHODS: Method[] = [
  { name: 'Contextual interviews', when: 'You are not sure what problem you are solving, or for whom.', sample: '10-16 people', takes: '3-4 weeks' },
  { name: 'Moderated usability tests', when: 'A flow exists, in production or in a prototype, and people stumble in it.', sample: '6-8 people a round', takes: '2 weeks' },
  { name: 'Unmoderated task tests', when: 'You need numbers on a specific task: success rate, time, where they drop.', sample: '40-120 people', takes: '1 week' },
  { name: 'Diary studies', when: 'The behavior happens over days, at home or at work, and not in a lab.', sample: '12-20 people', takes: '4-6 weeks' },
  { name: 'Card sorts and tree tests', when: 'Navigation, menus and labels: where people expect things to live.', sample: '30-60 people', takes: '1-2 weeks' },
  { name: 'Heuristic audits', when: 'You need a fast, expert read before spending on participants.', sample: 'Two researchers', takes: '1 week' },
];

type Finding = { no: string; severity: string; tone: string; title: string; quote: string; who: string; hit: number; hits: string; fix: string };

const FINDINGS: Finding[] = [
  { no: 'F-01', severity: 'Critical', tone: 'critical', title: 'The Save button sits below the fold on every laptop we tested', quote: 'I thought it saved on its own. Did I just lose all of that?', who: 'Participant 4, clinic manager', hit: 7, hits: '7 of 8 participants', fix: 'Pin the action bar to the bottom of the form, and autosave drafts every 30 seconds.' },
  { no: 'F-02', severity: 'High', tone: 'high', title: '"Archive" was read as "delete" by most of the people who saw it', quote: 'I would never press that. Where would it go?', who: 'Participant 2, office lead', hit: 5, hits: '5 of 8 participants', fix: 'Rename to "Move to past projects" and show where archived items live.' },
  { no: 'F-03', severity: 'Medium', tone: 'medium', title: 'Search worked, but nobody believed the empty state', quote: 'No results? It must be broken. I will just scroll.', who: 'Participant 7, bookkeeper', hit: 4, hits: '4 of 8 participants', fix: 'Say what was searched, and suggest the nearest match by spelling.' },
];

type Case = { client: string; kind: string; question: string; did: string; before: string; after: string; metric: string };

const CASES: Case[] = [
  { client: 'Fernway Clinics', kind: 'Patient intake, web', question: 'Why do four in ten patients abandon online check-in?', did: 'Twelve interviews in two waiting rooms, then two rounds of usability tests on a rebuilt form.', before: '41%', after: '12%', metric: 'Check-in abandoned' },
  { client: 'Pennywhistle Invoicing', kind: 'Payouts, mobile app', question: 'Why are payout questions half of all support tickets?', did: 'A three-week diary study with 16 freelancers, and a tree test of the settings menu.', before: '1,140', after: '480', metric: 'Payout tickets a month' },
  { client: 'Marlow County Library', kind: 'Catalog search, kiosk and web', question: 'Why does finding a book take longer than asking a librarian?', did: 'A heuristic audit, then moderated tests with patrons aged 11 to 84 at three branches.', before: '2:40', after: '0:55', metric: 'Time to find a title' },
];

type Engagement = { name: string; length: string; gets: string; fee: string };

const ENGAGEMENTS: Engagement[] = [
  { name: 'Usability sprint', length: '2 weeks', gets: 'Eight moderated sessions, a findings report like the one above, and a fix list ranked by severity.', fee: '$9,500' },
  { name: 'Discovery study', length: '5-6 weeks', gets: 'Twelve to sixteen interviews, a journey map, and the three opportunities we would build first.', fee: '$24,000' },
  { name: 'Heuristic audit', length: '1 week', gets: 'Two researchers, one product, every screen scored against ten heuristics, with fixes.', fee: '$4,200' },
  { name: 'Research retainer', length: 'Monthly', gets: 'Two days a week inside your team: planning, running and teaching research.', fee: '$6,800 / mo' },
];

const HOURS = [
  ['Studio', 'Monday to Thursday, 9:00-5:30'],
  ['Research lab', 'By booking, evenings too'],
];

export default function CornerCasePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbfbf8',
        '--ink': '#141414',
        '--cobalt': '#2f4cf0',
        '--pink': '#ff5c8a',
        '--lime': '#c8f04f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,cobalt,pink,lime"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;700;800&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Space+Mono:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Corner Case</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>UX research</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Start a study</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The report's cover: title and abstract on the left, the cover
            art a giant L cut from the ell field, and the headline figures
            set into its corner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.cover}>
            <dl className={s.coverMeta}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Report</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>No. 14</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Prepared by</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Corner Case UX</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Status</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>Taking studies for November</dd>
              </div>
            </dl>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              We find the corner cases <span>before your users do.</span>
            </h1>
            <p data-edit="hero.abstractLabel" data-edit-max="240" data-edit-multiline className={s.abstractLabel}>Abstract</p>
            <p data-edit="hero.abstract" data-edit-max="240" data-edit-multiline className={s.abstract}>
              Corner Case is a two-person research practice for product teams.
              We talk to the people who use what you build, watch them try it,
              and write down what goes wrong in plain words, ranked by how much
              it costs you, with a fix beside every finding.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Start a study</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#findings">Read sample findings</a>
            </div>
          </div>

          <figure className={s.figure}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,2" className={s.ell} aria-hidden="true">
              <TabbiedPattern
                pattern={ell}
                palette={COVER}
                fit="grid"
                cellSize={52}
                seed="corner-case-cover"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <dl className={s.stats}>
              {STATS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`hero.term4.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`hero.body4.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
            <figcaption data-edit="hero.figCaption" data-edit-max="120" data-edit-multiline className={s.figCaption}>Fig. 1: Every bracket turned to its own corner. So are your users.</figcaption>
          </figure>
        </section>

        {/* --------------------------------------------------------- METHODS */}
        <section id="methods" className={s.sec} aria-labelledby="methods-h">
          <div className={s.secHead}>
            <p data-edit="methods.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>2.0</p>
            <h2 data-edit="methods.secTitle" data-edit-max="60" id="methods-h" className={s.secTitle}>Methods</h2>
            <p data-edit="methods.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We choose the method from the question, not the other way round.
              Most studies combine two: one to find the problem, one to measure it.
            </p>
          </div>
          <ul className={s.methods}>
            {METHODS.map((m, i) => (
              <li key={m.name} className={s.method}>
                <h3 data-edit={`methods.methodName.${i}`} data-edit-max="40" className={s.methodName}>{m.name}</h3>
                <p data-edit={`methods.methodWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.methodWhen}>{m.when}</p>
                <dl className={s.methodFacts}>
                  <div>
                    <dt data-edit={`methods.term.${i}`} data-edit-max="28">Sample</dt>
                    <dd data-edit={`methods.body.${i}`} data-edit-max="200" data-edit-multiline>{m.sample}</dd>
                  </div>
                  <div>
                    <dt data-edit={`methods.term2.${i}`} data-edit-max="28">Takes</dt>
                    <dd data-edit={`methods.body2.${i}`} data-edit-max="200" data-edit-multiline>{m.takes}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- FINDINGS
            Three findings from a real-looking report, as they are written:
            severity, evidence, how many of eight participants, the fix. */}
        <section id="findings" className={s.sec} aria-labelledby="findings-h">
          <div className={s.secHead}>
            <p data-edit="findings.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>3.0</p>
            <h2 data-edit="findings.secTitle" data-edit-max="60" id="findings-h" className={s.secTitle}>Sample findings</h2>
            <p data-edit="findings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              From a usability sprint on a scheduling tool, eight participants,
              shared with permission from the client and the names changed.
            </p>
          </div>
          <ol className={s.findings}>
            {FINDINGS.map((f, i) => (
              <li key={f.no} className={s.finding}>
                <div className={s.findingHead}>
                  <p data-edit={`findings.findingNo.${i}`} data-edit-max="240" data-edit-multiline className={s.findingNo}>{f.no}</p>
                  <p data-edit={`findings.severity.${i}`} data-edit-max="240" data-edit-multiline className={`${s.severity} ${s[f.tone]}`}>{f.severity}</p>
                </div>
                <h3 data-edit={`findings.findingTitle.${i}`} data-edit-max="40" className={s.findingTitle}>{f.title}</h3>
                <blockquote className={s.quote}>
                  <p data-edit={`findings.quoteText.${i}`} data-edit-max="240" data-edit-multiline className={s.quoteText}>{f.quote}</p>
                  <cite data-edit={`findings.quoteWho.${i}`} data-edit-max="48" className={s.quoteWho}>{f.who}</cite>
                </blockquote>
                <div className={s.hits}>
                  <span className={s.hitTrack} aria-hidden="true">
                    <span className={s.hitFill} style={{ width: `${(f.hit / 8) * 100}%` }} />
                  </span>
                  <span data-edit={`findings.hitText.${i}`} data-edit-max="60" className={s.hitText}>{f.hits}</span>
                </div>
                <p data-edit={`findings.fixLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.fixLabel}>Recommendation</p>
                <p data-edit={`findings.fix.${i}`} data-edit-max="240" data-edit-multiline className={s.fix}>{f.fix}</p>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4,1,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={ell}
            palette={BAND}
            fit="grid"
            cellSize={40}
            seed="corner-case-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- CASES */}
        <section id="cases" className={s.sec} aria-labelledby="cases-h">
          <div className={s.secHead}>
            <p data-edit="cases.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>4.0</p>
            <h2 data-edit="cases.secTitle" data-edit-max="60" id="cases-h" className={s.secTitle}>Case studies</h2>
            <p data-edit="cases.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The question we were asked, what we did, and the number the team
              watched afterward. All three teams made the changes themselves.
            </p>
          </div>
          <div className={s.cases}>
            {CASES.map((c, i) => (
              <article key={c.client} className={s.case}>
                <p data-edit={`case.caseKind.${i}`} data-edit-max="240" data-edit-multiline className={s.caseKind}>{c.kind}</p>
                <h3 data-edit={`case.caseClient.${i}`} data-edit-max="40" className={s.caseClient}>{c.client}</h3>
                <p data-edit={`case.caseQuestion.${i}`} data-edit-max="240" data-edit-multiline className={s.caseQuestion}>{c.question}</p>
                <p data-edit={`case.caseDid.${i}`} data-edit-max="240" data-edit-multiline className={s.caseDid}>{c.did}</p>
                <dl className={s.caseResult}>
                  <div>
                    <dt data-edit={`case.term.${i}`} data-edit-max="28">Before</dt>
                    <dd data-edit={`case.body.${i}`} data-edit-max="200" data-edit-multiline>{c.before}</dd>
                  </div>
                  <div>
                    <dt data-edit={`case.term2.${i}`} data-edit-max="28">After</dt>
                    <dd data-edit={`case.body2.${i}`} data-edit-max="200" data-edit-multiline>{c.after}</dd>
                  </div>
                </dl>
                <p data-edit={`case.caseMetric.${i}`} data-edit-max="240" data-edit-multiline className={s.caseMetric}>{c.metric}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- ENGAGEMENTS */}
        <section id="engagements" className={s.sec} aria-labelledby="engagements-h">
          <div className={s.secHead}>
            <p data-edit="engagements.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>5.0</p>
            <h2 data-edit="engagements.secTitle" data-edit-max="60" id="engagements-h" className={s.secTitle}>Engagement types</h2>
            <p data-edit="engagements.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Fixed fees, agreed before we start. Participant incentives and
              recruiting are billed at cost, usually $60-$150 a person.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.engage}>
              <caption data-edit="engagements.tableCaption" className={s.tableCaption}>Table 5.1: Engagements, length, deliverables and fee</caption>
              <thead>
                <tr>
                  <th data-edit="engagements.heading" scope="col">Engagement</th>
                  <th data-edit="engagements.heading2" scope="col">Length</th>
                  <th data-edit="engagements.heading3" scope="col">What you get</th>
                  <th data-edit="engagements.heading4" scope="col">Fee</th>
                </tr>
              </thead>
              <tbody>
                {ENGAGEMENTS.map((e, i) => (
                  <tr key={e.name}>
                    <th data-edit={`engagements.heading5.${i}`} scope="row">{e.name}</th>
                    <td data-edit={`engagements.length.${i}`} className={s.length}>{e.length}</td>
                    <td data-edit={`engagements.cell.${i}`}>{e.gets}</td>
                    <td data-edit={`engagements.fee.${i}`} className={s.fee}>{e.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactInner}>
            <div className={s.contactText}>
              <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>6.0</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Start a study</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us what you are trying to learn. We reply within two days
                with the method we would use, how long it takes and what it costs.
              </p>
              <div data-edit-pattern="contact.field" data-edit-roles="transparent,4,2,3,0,4" className={s.note} aria-hidden="true">
                <TabbiedPattern
                  pattern={ell}
                  palette={NOTE}
                  fit="grid"
                  cellSize={30}
                  seed="corner-case-note"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Suite 4, 210 Larkin Street, Riverside</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550174402">(555) 017-4402</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:studies@cornercase.example">studies@cornercase.example</a>
                  </dd>
                </div>
                {HOURS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="cc-name">Name</label>
                <input id="cc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="cc-company">Company</label>
                <input id="cc-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="cc-email">Work email</label>
                <input id="cc-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label4" htmlFor="cc-question">What are you trying to learn?</label>
                <textarea id="cc-question" name="question" rows={4} />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="cc-when">Needed by</label>
                <select id="cc-when" name="when" defaultValue="month">
                  <option value="asap">As soon as possible</option>
                  <option value="month">Within a month</option>
                  <option value="quarter">This quarter</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label6" htmlFor="cc-type">Engagement</label>
                <select id="cc-type" name="type" defaultValue="unsure">
                  <option value="sprint">Usability sprint</option>
                  <option value="discovery">Discovery study</option>
                  <option value="audit">Heuristic audit</option>
                  <option value="retainer">Research retainer</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send the question</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,1,3" className={s.footEll} aria-hidden="true">
          <TabbiedPattern
            pattern={ell}
            palette={BAND}
            fit="grid"
            cellSize={30}
            seed="corner-case-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Corner Case UX</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional practice: the researchers, clients, findings, figures,
            prices and address are invented.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
