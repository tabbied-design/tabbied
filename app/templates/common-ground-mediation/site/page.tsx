import { TabbiedPattern } from 'tabbied/react';
import { meetpart } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './common-ground-mediation.module.css';

export const metadata = {
  title: 'Common Ground Mediation: Family mediation for separating parents',
  description:
    'Common Ground helps separating parents agree on the children, the money and the house in five sessions, for a fraction of the cost of court. Two mediators, one from family law and one from family therapy.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Meetpart is
   two sectors from opposite corners with only the diamond where they meet
   left, which is the whole idea of the page: two sides, and the part they
   share. It is the diamond on the seam of the hero, a band under the five
   sessions, the seam between the two lists and the edge of the footer. */
const LINEN = '#f4f0e8';
const SLATE = '#252a40';
const VIOLET = '#6a55a4';
const LILAC = '#c8b9e6';
const APRICOT = '#e3a27c';

const MEET = ['transparent', LILAC, VIOLET, SLATE, APRICOT, LILAC];
const SOFT = ['transparent', LILAC, APRICOT, LILAC, VIOLET, LILAC];
const SEAM = ['transparent', VIOLET, LILAC, APRICOT, VIOLET, SLATE];
const DUSK = ['transparent', LILAC, APRICOT, VIOLET, LINEN, LILAC];

const NAV = [
  ['How it works', '#sessions'],
  ['Mediation or court', '#cost'],
  ['What to bring', '#bring'],
  ['The mediators', '#mediators'],
  ['Questions', '#questions'],
  ['Contact', '#contact'],
];

const OUTCOMES = [
  'A parenting plan the two of you wrote',
  'Child support worked out to the dollar',
  'The house, the accounts and the debts divided',
  'A memorandum your lawyers can file',
];

const FACTS = [
  ['5', 'sessions, on average'],
  ['8 weeks', 'from first call to signing'],
  ['$2,450', 'in total, shared'],
];

const SESSIONS = [
  {
    n: '1',
    title: 'Each of you, on your own',
    length: '60 minutes, separately',
    text: 'We meet each parent alone, in person or by video. We ask about safety, explain how mediation works and what it costs, and answer the questions you would rather not ask in front of the other parent.',
    leave: 'You leave with the agreement to mediate and a budget worksheet.',
  },
  {
    n: '2',
    title: 'The children first',
    length: '2 hours, together',
    text: 'Where the children sleep on school nights, who has them at Thanksgiving, how you will decide about doctors and schools. The parenting plan comes before anything else, because everything else depends on it.',
    leave: 'You leave with a draft parenting schedule on paper.',
  },
  {
    n: '3',
    title: 'The money',
    length: '2 hours, together',
    text: 'Two household budgets side by side, child support worked out on the state guideline worksheet, and spousal support if it applies. We bring the calculator; you bring the numbers.',
    leave: 'You leave with a support figure you both understand.',
  },
  {
    n: '4',
    title: 'The house and everything else',
    length: '2 hours, together',
    text: 'The house, the cars, the retirement accounts, the credit card debt and the dog. We list every asset and debt, then you decide who keeps what, with a running total so the split stays fair.',
    leave: 'You leave with a property list you have both initialed.',
  },
  {
    n: '5',
    title: 'Putting it in writing',
    length: '90 minutes, together',
    text: 'We draft the memorandum of understanding and read it through with you line by line. Each of you takes it to your own lawyer before signing; most couples then file an uncontested divorce.',
    leave: 'You leave with the memorandum, ready for review.',
  },
];

const COMPARE = [
  ['Cost for each of you', '$1,200 to $2,500, with fees shared', '$15,000 to $30,000 in lawyer fees'],
  ['How long it takes', '6 to 10 weeks', '12 to 18 months, often longer'],
  ['Who decides', 'The two of you', 'A judge who has met you twice'],
  ['Who hears it', 'Only us. Sessions are confidential.', 'A courtroom, and a public record'],
  ['The children', 'Never in the room. The plan is built around them.', 'May be interviewed by a court evaluator'],
  ['When life changes', 'Book one session to adjust the plan', 'File a new motion and wait for a hearing'],
];

const FEES = [
  ['Introductory call', 'Free, 20 minutes'],
  ['Individual intake', '$150 each'],
  ['Joint sessions', '$240 an hour, shared'],
  ['Memorandum of understanding', '$650 flat'],
];

const BRING = [
  'Your last two years of tax returns',
  'Three recent pay stubs, or a profit and loss statement if you work for yourself',
  'Statements for every bank, retirement and credit card account',
  'The mortgage statement and a recent valuation of the house',
  'A month of household spending. Rough is fine.',
  "The children's school calendar and activity schedules",
];

const LEAVE = [
  'The children. They are never part of a session.',
  'A new partner, however supportive',
  'Recordings, screenshots and old messages',
  'A decision already made about the house',
  'The need to win every point',
];

const MEDIATORS = [
  {
    initials: 'HM',
    name: 'Helen Marsh',
    role: 'Mediator, from family law',
    bio: 'Twelve years as a family law attorney before she stopped arguing for one side. She now writes the kind of agreement she used to spend a year fighting over.',
    creds: ['Certified family mediator, county court roster', '40 hours of divorce mediation training', 'Family law attorney, 2008 to 2020'],
  },
  {
    initials: 'TR',
    name: 'Tomas Reyes',
    role: 'Co-mediator, from family therapy',
    bio: 'A clinical social worker who spent a decade with the children of separating parents. He joins the parenting sessions and keeps the room calm when it is not.',
    creds: ['Licensed clinical social worker since 2009', '20 hours of domestic violence screening', 'Trained in child-inclusive mediation'],
  },
];

const QUESTIONS = [
  ['Do we still need lawyers?', 'We recommend that each of you has one review the memorandum before you sign: usually an hour or two of their time rather than a year of it. We do not give legal advice to either of you.'],
  ['What if we cannot agree on something?', 'Most couples get stuck at least once. We slow down, put the options on paper, and sometimes bring in a neutral appraiser or financial planner. If one point stays stuck, you can settle everything else and ask a judge about that one.'],
  ['What if there has been abuse or control?', 'Tell us in your individual intake. Mediation is not right for every family, and we screen every couple. Where it can work, we use separate rooms or separate video calls, and either of you can stop at any time.'],
  ['Is the agreement legally binding?', 'Not on its own. Your lawyers turn the memorandum into a settlement agreement and the court approves it. That step is the safeguard, not a formality.'],
  ['Can we mediate online?', 'Yes. About half of our sessions are by video, and parents who live in different cities can do the whole process that way.'],
];

const HOURS = [
  ['Monday to Thursday', '9:00-7:00'],
  ['Friday', '9:00-3:00'],
  ['Saturday', 'By appointment'],
];

export default function CommonGroundMediationPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--linen': '#f4f0e8',
        '--slate': '#252a40',
        '--violet': '#6a55a4',
        '--lilac': '#c8b9e6',
        '--apricot': '#e3a27c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="linen,slate,violet,lilac,apricot"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Public+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Common Ground</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Family Mediation</span>
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
        {/* HERO: two halves of one room, meeting at the diamond. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroLeft}>
            <div className={s.heroInner}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Family mediation for separating parents</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Two sides, <em>one table.</em>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Common Ground helps parents who are separating agree on the
                children, the money and the house, in five sessions instead of a
                year of court dates. We take no side, and we keep the talk on
                the next ten years rather than the last ten.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free 20-minute call</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#sessions">See the five sessions</a>
              </div>
            </div>
          </div>

          <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,1,4,3" className={s.heroMeet} aria-hidden="true">
            <TabbiedPattern
              pattern={meetpart}
              palette={MEET}
              fit="grid"
              cellSize={54}
              seed="cg-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.heroRight}>
            <div className={s.heroInner}>
              <h2 data-edit="hero.sideTitle" data-edit-max="60" className={s.sideTitle}>What you leave with</h2>
              <ul className={s.outcomes}>
                {OUTCOMES.map((o, i) => (
                  <li data-edit={`hero.item.${i}`} data-edit-max="80" key={o}>{o}</li>
                ))}
              </ul>
              <dl className={s.facts}>
                {FACTS.map(([k, v], i) => (
                  <div key={v}>
                    <dt data-edit={`hero.term.${i}`} data-edit-max="28">{v}</dt>
                    <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* SESSIONS: alternating left and right, joined at one spine. */}
        <section id="sessions" className={s.sec} aria-labelledby="sessions-h">
          <div className={s.secHead}>
            <p data-edit="sessions.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>How it works</p>
            <h2 data-edit="sessions.secTitle" data-edit-max="60" id="sessions-h" className={s.secTitle}>Five sessions, from two sides to one plan</h2>
            <p data-edit="sessions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The first meeting is with each of you alone. The other four are
              together, at our office on Alder Row or by video, usually a week
              or two apart so there is time to think and to gather paperwork.
            </p>
          </div>
          <ol className={s.spine}>
            {SESSIONS.map((x, i) => (
              <li key={x.n} className={s.session}>
                <span data-edit={`sessions.sessionNo.${i}`} data-edit-max="60" className={s.sessionNo}>{x.n}</span>
                <div className={s.sessionCard}>
                  <p data-edit={`sessions.sessionLength.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionLength}>{x.length}</p>
                  <h3 data-edit={`sessions.sessionTitle.${i}`} data-edit-max="40" className={s.sessionTitle}>{x.title}</h3>
                  <p data-edit={`sessions.sessionText.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionText}>{x.text}</p>
                  <p data-edit={`sessions.sessionLeave.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionLeave}>{x.leave}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,4,3,2,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={meetpart}
            palette={SOFT}
            fit="grid"
            cellSize={40}
            seed="cg-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* COST: mediation on the left, court on the right, the question in
            the middle where they meet. */}
        <section id="cost" className={s.sec} aria-labelledby="cost-h">
          <div className={s.secHead}>
            <p data-edit="cost.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Mediation or court</p>
            <h2 data-edit="cost.secTitle" data-edit-max="60" id="cost-h" className={s.secTitle}>The same separation, two ways</h2>
            <p data-edit="cost.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Typical figures in this county for parents with two children and a
              house. Court is sometimes the right road, and we will say so if it
              is yours.
            </p>
          </div>
          <div className={s.compareWrap}>
            <table className={s.compare}>
              <caption data-edit="cost.srOnly" className={s.srOnly}>Mediation and court compared</caption>
              <thead>
                <tr>
                  <th data-edit="cost.colMed" scope="col" className={s.colMed}>Mediation</th>
                  <th data-edit="cost.colMid" scope="col" className={s.colMid}>What it takes</th>
                  <th data-edit="cost.colCourt" scope="col" className={s.colCourt}>Court</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, med, court], i) => (
                  <tr key={label}>
                    <td data-edit={`cost.med.${i}`} className={s.med}>{med}</td>
                    <th data-edit={`cost.mid.${i}`} scope="row" className={s.mid}>{label}</th>
                    <td data-edit={`cost.court.${i}`} className={s.court}>{court}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.fees}>
            <h3 data-edit="cost.feesTitle" data-edit-max="40" className={s.feesTitle}>Our fees</h3>
            <dl className={s.feeList}>
              {FEES.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`cost.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`cost.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="cost.feesNote" data-edit-max="240" data-edit-multiline className={s.feesNote}>
              Fees are split between you unless you agree otherwise. A sliding
              scale is open to households earning under $60,000 together.
            </p>
          </div>
        </section>

        {/* BRING: two lists, with the pattern as the seam between them. */}
        <section id="bring" className={s.bring} aria-labelledby="bring-h">
          <div className={s.secHead}>
            <p data-edit="bring.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Before the first joint session</p>
            <h2 data-edit="bring.secTitle" data-edit-max="60" id="bring-h" className={s.secTitle}>What to bring, and what to leave at home</h2>
          </div>
          <div className={s.bringGrid}>
            <div className={s.bringCol}>
              <h3 data-edit="bring.bringTitle" data-edit-max="40" className={s.bringTitle}>Bring</h3>
              <ul className={s.bringList}>
                {BRING.map((b, i) => (
                  <li data-edit={`bring.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div data-edit-pattern="bring.field" data-edit-roles="transparent,2,3,4,2,1" className={s.bringSeam} aria-hidden="true">
              <TabbiedPattern
                pattern={meetpart}
                palette={SEAM}
                fit="grid"
                cellSize={36}
                seed="cg-seam"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={`${s.bringCol} ${s.leaveCol}`}>
              <h3 data-edit="bring.bringTitle2" data-edit-max="40" className={s.bringTitle}>Leave at home</h3>
              <ul className={s.bringList}>
                {LEAVE.map((b, i) => (
                  <li data-edit={`bring.item2.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
              <p data-edit="bring.leaveNote" data-edit-max="240" data-edit-multiline className={s.leaveNote}>
                If the children ask where you are going, a meeting to make a
                plan for them is true, and it is enough.
              </p>
            </div>
          </div>
        </section>

        {/* MEDIATORS: one from each side of the profession. */}
        <section id="mediators" className={s.mediators} aria-labelledby="mediators-h">
          <div className={s.secHeadDark}>
            <p data-edit="mediators.eyebrowDark" data-edit-max="240" data-edit-multiline className={s.eyebrowDark}>The mediators</p>
            <h2 data-edit="mediators.secTitleDark" data-edit-max="60" id="mediators-h" className={s.secTitleDark}>One from the law, one from the family</h2>
            <p data-edit="mediators.secNoteDark" data-edit-max="240" data-edit-multiline className={s.secNoteDark}>
              Every couple works with both of us. Helen keeps the agreement
              sound; Tomas keeps it about the children.
            </p>
          </div>
          <ul className={s.people}>
            {MEDIATORS.map((m, i) => (
              <li key={m.name} className={s.person}>
                <span className={s.monogram} aria-hidden="true">{m.initials}</span>
                <h3 data-edit={`mediators.personName.${i}`} data-edit-max="40" className={s.personName}>{m.name}</h3>
                <p data-edit={`mediators.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{m.role}</p>
                <p data-edit={`mediators.personBio.${i}`} data-edit-max="240" data-edit-multiline className={s.personBio}>{m.bio}</p>
                <ul className={s.creds}>
                  {m.creds.map((c, i2) => (
                    <li data-edit={`mediators.item.${i}.${i2}`} data-edit-max="80" key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.qGrid}>
            <div>
              <p data-edit="questions.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Questions parents ask</p>
              <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Before you call</h2>
              <p data-edit="questions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Ask anything on the free call. These are the five we hear most
                often, usually in the first two minutes.
              </p>
            </div>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a], i) => (
                <details key={q} className={s.faqItem}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book the free call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Either parent can call first. We will offer the other parent the
                same twenty minutes, so neither of you starts a step behind.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>41 Alder Row, Suite 3, Millbrook</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Second floor, lift from the lobby. Two waiting rooms, so you need not sit together.</p>
              <p className={s.line}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550142260">(555) 014-2260</a>
              </p>
              <p className={s.line}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@commonground.example">hello@commonground.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="cg-name">Your name</label>
                <input id="cg-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="cg-phone">Phone</label>
                <input id="cg-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label3" htmlFor="cg-email">Email</label>
                <input id="cg-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label4" htmlFor="cg-when">Best time to call</label>
                <select id="cg-when" name="when" defaultValue="evening">
                  <option value="morning">Weekday mornings</option>
                  <option value="afternoon">Weekday afternoons</option>
                  <option value="evening">Weekday evenings</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label5" htmlFor="cg-note">Anything we should know first</label>
                <textarea id="cg-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call back</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We call from a withheld number and never leave a message that says why.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2,0,3" className={s.footEdge} aria-hidden="true">
          <TabbiedPattern
            pattern={meetpart}
            palette={DUSK}
            fit="grid"
            cellSize={32}
            seed="cg-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Common Ground Mediation</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>
            A fictional family mediation practice. The mediators, prices and
            address are invented, and nothing here is legal advice.
          </p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
