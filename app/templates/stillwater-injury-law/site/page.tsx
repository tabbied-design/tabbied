import { TabbiedPattern } from 'tabbied/react';
import { overbar } from 'tabbied/patterns';
import s from './stillwater-injury-law.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Stillwater Injury Law: No fee unless we win',
  description:
    'Stillwater Injury Law represents people hurt in crashes, falls and at work. No fee unless we win, every cost paid up front, and a lawyer who answers the phone at any hour.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The overbar is
   the firm's mark: a brass bar with a second one let down across it, on the
   dark ink of the case file. It fills the file in the hero, runs as a band
   under the fee agreement, and edges the footer. */
const PAPER = '#f6f1e7';
const INK = '#241a1e';
const OXBLOOD = '#8a2c35';
const BRASS = '#c99a2e';
const FAWN = '#dcc9a8';
const SLATE = '#5d6f80';

const FILE = ['transparent', BRASS, OXBLOOD, FAWN, SLATE, PAPER];
const BAND = ['transparent', OXBLOOD, BRASS, SLATE, FAWN, INK];
const FOOT = ['transparent', BRASS, FAWN, OXBLOOD, SLATE, FAWN];

const NAV = [
  ['No fee', '#fees'],
  ['After an accident', '#after'],
  ['Your claim', '#claim'],
  ['Cases', '#cases'],
  ['Lawyers', '#lawyers'],
  ['Contact', '#contact'],
];

/* The fee agreement, clause by clause, with the plain words beside it. */
const CLAUSES = [
  {
    legal: 'The Firm shall advance all costs reasonably necessary to investigate and prosecute the Claim, including records, expert witnesses, filing and deposition fees.',
    plain: 'We pay for everything the case needs. You will never get a bill from us.',
  },
  {
    legal: 'Attorney fees shall be contingent upon recovery and shall equal one third (33.3%) of the gross recovery if resolved before suit is filed, and forty percent (40%) thereafter.',
    plain: 'We are paid a third of what we win. If it has to go to court, 40 percent, because a lawsuit is a lot more work.',
  },
  {
    legal: 'Costs advanced shall be reimbursed from the recovery. In the event of no recovery, the Client shall owe the Firm neither fees nor costs.',
    plain: 'Costs come back out of the settlement. If we lose, we swallow them. You owe nothing, not one dollar.',
  },
  {
    legal: 'The Client may terminate this Agreement at any time by written notice, without penalty.',
    plain: 'You can fire us whenever you like. No cancellation fee, no hard feelings.',
  },
];

const WORKED = [
  ['Settlement from the insurer', '$90,000'],
  ['Our fee, one third', '- $30,000'],
  ['Case costs we paid up front', '- $2,400'],
  ['Medical bills, negotiated down from $19,000', '- $12,600'],
];

const SCENE = [
  'Call 911, even if nobody looks hurt. A police report is the first piece of evidence.',
  'Photograph the cars, the road, the signs, your injuries. Wide shots first, then close.',
  'Swap names, insurers and plate numbers. Ask witnesses for a phone number.',
  'Get checked by a doctor the same day. Some injuries take a day to hurt.',
];

const AFTER = [
  'Keep every bill, receipt and pay stub. Start a folder, paper or phone.',
  'Write down what happened tonight, while you still remember the details.',
  'Say no to a recorded statement for the other driver\'s insurer.',
  'Stay off social media about it. Insurers read it, every word.',
  'Sign nothing until a lawyer has read it. A quick check costs you nothing.',
];

const STEPS = [
  { when: 'Day 1', what: 'First call', text: 'Free and confidential. A lawyer listens, asks a few questions and tells you honestly whether you have a case.' },
  { when: 'Week 1', what: 'We take over', text: 'We notify the insurers, collect the police report and photos, and stop the calls to your phone.' },
  { when: 'Months 1-6', what: 'You get better', text: 'You focus on treatment. We gather records and bills as you go, and send you an update every two weeks.' },
  { when: 'Month 7', what: 'The demand', text: 'Once you are well, or as well as you will get, we send the insurer a full demand with every cost counted.' },
  { when: 'Months 8-10', what: 'Negotiation', text: 'Most cases settle here. We bring you every offer, explain it, and you decide. Never us.' },
  { when: '30 days after signing', what: 'You are paid', text: 'The check comes to our trust account. Bills and liens are paid off, and the rest is wired to you.' },
];

const AREAS = [
  ['Car and truck crashes', 'Rear-end, T-bone, delivery vans, eighteen-wheelers and rideshares.'],
  ['Motorcycle and bicycle', 'Riders are blamed first. We start by proving who was not paying attention.'],
  ['Falls on someone\'s property', 'Wet floors, broken stairs, icy lots and missing handrails.'],
  ['Hurt at work', 'Workers\' compensation, and a claim against the contractor whose fault it was.'],
  ['Dog bites', 'Homeowner policies pay for most of these, and owners rarely know it.'],
];

const RESULTS = [
  ['$1,240,000', 'Rear-end collision, spinal fusion, 2025'],
  ['$615,000', 'Fall on an unlit parking garage stair, 2025'],
  ['$380,000', 'Cyclist struck by a turning van, 2024'],
  ['$96,500', 'Dog bite, a child\'s face, 2024'],
];

const LAWYERS = [
  { initials: 'RA', name: 'Ruth Abernethy', role: 'Founding partner', years: '24 years', note: 'Spent her first eight years defending insurance companies. She still knows their playbook by heart.' },
  { initials: 'DM', name: 'Daniel Moreno', role: 'Trial lawyer', years: '15 years', note: 'Tries the cases that do not settle. Forty-one jury trials, and he still rehearses every opening aloud.' },
  { initials: 'KL', name: 'Keisha Lowell', role: 'Client advocate', years: '11 years', note: 'Your first call and your every-two-weeks update. Negotiates medical bills down for a living.' },
];

const HOURS = [
  ['Phone', 'Answered 24 hours, every day'],
  ['Office', 'Monday to Friday, 8:00-6:00'],
  ['Visits', 'At home or in hospital, if you cannot come to us'],
];

export default function StillwaterInjuryLawPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f1e7',
        '--ink': '#241a1e',
        '--oxblood': '#8a2c35',
        '--brass': '#c99a2e',
        '--fawn': '#dcc9a8',
        '--slate': '#5d6f80',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,oxblood,brass,fawn,slate"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Stillwater</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Injury Law</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550112200">24 hours: (555) 011-2200</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The case file: a dark folder papered with the overbar, and the
            free review card clipped to its corner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Personal injury lawyers, 61 Harbor Row</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              You pay us nothing <em>unless we win.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Hurt in a crash, a fall or at work? We take the case, pay every
              cost up front, and are paid only out of what we recover for you.
              If we recover nothing, you owe us nothing.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Ask for a free review</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#after">What to do after an accident</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Up front</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>$0</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Recovered for clients</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>$41M</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Cases taken to a verdict</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>41</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroFile}>
            <span data-edit="hero.fileTab" data-edit-max="60" className={s.fileTab}>Case file</span>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,4,5,0" className={s.fileField} aria-hidden="true">
              <TabbiedPattern
                pattern={overbar}
                palette={FILE}
                fit="grid"
                cellSize={66}
                seed="stillwater-file"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.fileCard}>
              <p data-edit="hero.fileCardLabel" data-edit-max="240" data-edit-multiline className={s.fileCardLabel}>Free case review</p>
              <p className={s.fileCardPhone}>
                <a data-edit="hero.link" data-edit-max="28" href="tel:+15550112200">(555) 011-2200</a>
              </p>
              <p data-edit="hero.fileCardNote" data-edit-max="240" data-edit-multiline className={s.fileCardNote}>Call or text at any hour. A lawyer, not a call center, rings you back within the hour.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FEE
            The agreement itself, with the plain words written in the margin. */}
        <section id="fees" className={s.sec} aria-labelledby="fee-h">
          <div className={s.secHead}>
            <p data-edit="fees.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fee-h" className={s.secTitle}>No fee unless we win, in plain words</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              This is our fee agreement, word for word. Every client signs the
              same one. Beside each clause is what it actually means.
            </p>
          </div>

          <ol className={s.clauses}>
            {CLAUSES.map((c, i) => (
              <li key={c.plain} className={s.clause}>
                <span className={s.clauseNo}>{`Clause ${i + 1}`}</span>
                <p data-edit={`fees.clauseLegal.${i}`} data-edit-max="240" data-edit-multiline className={s.clauseLegal}>{c.legal}</p>
                <p data-edit={`fees.clausePlain.${i}`} data-edit-max="240" data-edit-multiline className={s.clausePlain}>{c.plain}</p>
              </li>
            ))}
          </ol>

          <div className={s.worked}>
            <div className={s.workedIntro}>
              <h3 data-edit="fees.workedTitle" data-edit-max="40" className={s.workedTitle}>A $90,000 settlement, worked through</h3>
              <p data-edit="fees.workedNote" data-edit-max="240" data-edit-multiline className={s.workedNote}>
                A typical car crash case: a broken wrist, ten weeks off work,
                settled in month nine without a lawsuit.
              </p>
            </div>
            <table className={s.ledger}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>How a settlement is divided</caption>
              <tbody>
                {WORKED.map(([label, amount], i) => (
                  <tr key={label}>
                    <th data-edit={`fees.heading.${i}`} scope="row">{label}</th>
                    <td data-edit={`fees.cell.${i}`}>{amount}</td>
                  </tr>
                ))}
                <tr className={s.ledgerTotal}>
                  <th data-edit="fees.heading2" scope="row">Paid to you</th>
                  <td data-edit="fees.cell2">$45,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,5,4,1" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={overbar}
            palette={BAND}
            fit="grid"
            cellSize={54}
            seed="stillwater-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- AFTER
            A glovebox card: what to do at the scene and in the days after. */}
        <section id="after" className={s.sec} aria-labelledby="after-h">
          <div className={s.afterGrid}>
            <div className={s.afterIntro}>
              <p data-edit="after.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
              <h2 data-edit="after.secTitle" data-edit-max="60" id="after-h" className={s.secTitle}>After an accident: a checklist</h2>
              <p data-edit="after.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Nobody thinks clearly after a crash. Read this once now, and
                keep it in the glovebox for the day you need it.
              </p>
              <p className={s.afterCall}>
                <a data-edit="after.link" data-edit-max="28" href="tel:+15550112200">Stuck at the scene? Call (555) 011-2200</a>
              </p>
            </div>
            <div className={s.card}>
              <div className={s.cardCol}>
                <h3 data-edit="after.cardTitle" data-edit-max="40" className={s.cardTitle}>At the scene</h3>
                <ul className={s.checks}>
                  {SCENE.map((item, i) => (
                    <li data-edit={`after.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={s.cardCol}>
                <h3 data-edit="after.cardTitle2" data-edit-max="40" className={s.cardTitle}>In the days after</h3>
                <ul className={s.checks}>
                  {AFTER.map((item, i) => (
                    <li data-edit={`after.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p data-edit="after.cardFoot" data-edit-max="240" data-edit-multiline className={s.cardFoot}>Cut along the line and keep with your insurance card.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- CLAIM
            The road from the first call to the check, as a timeline. */}
        <section id="claim" className={s.claim} aria-labelledby="claim-h">
          <div className={s.claimInner}>
            <div className={s.claimHead}>
              <p data-edit="claim.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
              <h2 data-edit="claim.claimTitle" data-edit-max="60" id="claim-h" className={s.claimTitle}>Your claim, from first call to settlement</h2>
              <p data-edit="claim.claimNote" data-edit-max="240" data-edit-multiline className={s.claimNote}>
                A typical case takes ten months. About one in eight needs a
                lawsuit, which adds a year. You are told where things stand at
                every stop.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map((step, i) => (
                <li key={step.what} className={s.step}>
                  <span data-edit={`claim.stepWhen.${i}`} data-edit-max="60" className={s.stepWhen}>{step.when}</span>
                  <h3 data-edit={`claim.stepWhat.${i}`} data-edit-max="40" className={s.stepWhat}>{step.what}</h3>
                  <p data-edit={`claim.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- CASES */}
        <section id="cases" className={s.sec} aria-labelledby="cases-h">
          <div className={s.casesGrid}>
            <div>
              <p data-edit="cases.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
              <h2 data-edit="cases.secTitle" data-edit-max="60" id="cases-h" className={s.secTitle}>The cases we take</h2>
              <dl className={s.areas}>
                {AREAS.map(([name, note], i) => (
                  <div key={name}>
                    <dt data-edit={`cases.term.${i}`} data-edit-max="28">{name}</dt>
                    <dd data-edit={`cases.body.${i}`} data-edit-max="200" data-edit-multiline>{note}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className={s.results} aria-labelledby="results-h">
              <h3 data-edit="results.resultsTitle" data-edit-max="40" id="results-h" className={s.resultsTitle}>Recent results</h3>
              <ul className={s.resultList}>
                {RESULTS.map(([amount, what], i) => (
                  <li key={amount}>
                    <strong data-edit={`results.emphasis.${i}`}>{amount}</strong>
                    <span data-edit={`results.text.${i}`} data-edit-max="60">{what}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="results.resultsNote" data-edit-max="240" data-edit-multiline className={s.resultsNote}>Every case is different, and past results do not promise yours.</p>
            </aside>
          </div>
        </section>

        {/* --------------------------------------------------------- LAWYERS */}
        <section id="lawyers" className={s.sec} aria-labelledby="lawyers-h">
          <div className={s.secHead}>
            <p data-edit="lawyers.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
            <h2 data-edit="lawyers.secTitle" data-edit-max="60" id="lawyers-h" className={s.secTitle}>Three lawyers, one phone number</h2>
            <p data-edit="lawyers.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A small firm on purpose. The lawyer who takes your first call is
              the one who works your case to the end.
            </p>
          </div>
          <ul className={s.lawyers}>
            {LAWYERS.map((l, i) => (
              <li key={l.name} className={s.lawyer}>
                <span className={s.monogram} aria-hidden="true">{l.initials}</span>
                <h3 data-edit={`lawyers.lawyerName.${i}`} data-edit-max="40" className={s.lawyerName}>{l.name}</h3>
                <p className={s.lawyerRole}>{`${l.role}, ${l.years}`}</p>
                <p data-edit={`lawyers.lawyerNote.${i}`} data-edit-max="240" data-edit-multiline className={s.lawyerNote}>{l.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>06</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Ask for a free review</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us what happened in a few lines. A lawyer reads it the same
                day and calls you back, free and with no obligation.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([label, value], i) => (
                  <div key={label}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>61 Harbor Row, Suite 300, Millbrook</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550112200">(555) 011-2200</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:help@stillwaterlaw.example">help@stillwaterlaw.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="sw-name">Your name</label>
                <input id="sw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="sw-phone">Phone</label>
                <input id="sw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="sw-email">Email</label>
                <input id="sw-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="sw-date">When it happened</label>
                <input id="sw-date" name="date" type="date" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="sw-kind">What kind of accident</label>
                <select id="sw-kind" name="kind" defaultValue="car">
                  <option value="car">Car or truck crash</option>
                  <option value="bike">Motorcycle or bicycle</option>
                  <option value="fall">A fall on someone&apos;s property</option>
                  <option value="work">Hurt at work</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="sw-what">What happened</label>
                <textarea id="sw-what" name="what" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to a lawyer</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Confidential. Sending this does not make us your lawyers until we both sign the agreement above.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2,5,4" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={overbar}
            palette={FOOT}
            fit="grid"
            cellSize={44}
            seed="stillwater-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Stillwater Injury Law</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional law firm. The lawyers, cases, results, fees and address are invented, and nothing here is legal advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
