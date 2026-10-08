import { TabbiedPattern } from 'tabbied/react';
import { regimental } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './ashby-crane-law.module.css';

export const metadata = {
  title: 'Ashby & Crane: Wills, trusts and estate planning attorneys',
  description:
    'Ashby & Crane draft wills, living trusts and powers of attorney at a flat fee agreed before we start. A free first meeting, plain-English drafts, and a signing in our office about three weeks later.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   bound instrument: numbered articles, clauses in the margin, a signature
   block for the partners. Regimental is the cloth it is bound in: a repp
   stripe in oxblood, green and gold on the navy of a law library binding,
   with a vellum pinstripe. It lines the hero, runs as a ribbon between the
   articles, marks the partners' page and edges the footer. */
const VELLUM = '#f3eee3';
const NAVY = '#1b2340';
const OXBLOOD = '#7c2735';
const GREEN = '#2d5a44';
const GOLD = '#b48d2e';

const CLOTH = ['transparent', OXBLOOD, GREEN, GOLD, OXBLOOD, VELLUM];
const RIBBON = ['transparent', GOLD, OXBLOOD, GREEN, GOLD, VELLUM];
const SPINE = ['transparent', GREEN, GOLD, OXBLOOD, GREEN, VELLUM];

const NAV = [
  ['The plans', '#plans'],
  ['Without a will', '#intestacy'],
  ['How it works', '#process'],
  ['The partners', '#partners'],
  ['Questions', '#questions'],
  ['Contact', '#contact'],
];

const CONTENTS = [
  { no: 'I', title: 'The plans, at a flat fee', note: 'from $1,450', href: '#plans' },
  { no: 'II', title: 'If there is no will', note: 'seven consequences', href: '#intestacy' },
  { no: 'III', title: 'How a plan is made', note: 'about three weeks', href: '#process' },
  { no: 'IV', title: 'The partners', note: 'two attorneys', href: '#partners' },
  { no: 'V', title: 'Questions asked most', note: 'six answers', href: '#questions' },
  { no: 'VI', title: 'Execution: book a meeting', note: 'first meeting free', href: '#contact' },
];

type Plan = { letter: string; name: string; single: string; couple: string; sub: string; clauses: string[]; tag: string; pick?: boolean };

const PLANS: Plan[] = [
  {
    letter: 'A',
    name: 'The Will Plan',
    single: '$1,450',
    couple: '$1,950',
    sub: 'For most people with a home, savings and children under 18.',
    clauses: [
      'Last will and testament, with a guardian named for minor children',
      'Durable power of attorney for finances',
      'Health care directive and medical power of attorney',
      'HIPAA release, so family can speak to doctors',
      'One revision free within twelve months of signing',
    ],
    tag: 'The simplest complete plan',
  },
  {
    letter: 'B',
    name: 'The Trust Plan',
    single: '$3,200',
    couple: '$3,800',
    sub: 'Keeps the estate out of probate, private and quick to settle.',
    clauses: [
      'Everything in the Will Plan, with a pour-over will',
      'Revocable living trust, drafted for your family',
      'Deed moving your home into the trust, recorded for you',
      'Certification of trust for banks and brokers',
      'A funding meeting, with letters for every account',
    ],
    tag: 'Chosen by most homeowners',
    pick: true,
  },
  {
    letter: 'C',
    name: 'The Legacy Plan',
    single: '$5,400',
    couple: '$6,200',
    sub: 'For a child who needs care, a business, or a second marriage.',
    clauses: [
      'Everything in the Trust Plan',
      'Supplemental needs or spendthrift trust for one beneficiary',
      'Succession memo for a family business or rental property',
      'Separate-share provisions for blended families',
      'A review meeting every year for three years',
    ],
    tag: 'For the most involved estates',
  },
];

const WITHOUT = [
  ['Who manages the estate', 'An administrator appointed by the court, who must usually buy a bond paid for by the estate.', 'The executor or trustee you chose, with no bond.'],
  ['Who inherits', 'A formula in the state code. Spouse and children split it in shares you did not pick.', 'The people you named, in the shares you set, on the terms you wrote.'],
  ['Unmarried partner, stepchildren, friends', 'Nothing at all, however long you were together.', 'Whatever you leave them.'],
  ['Guardian for young children', 'Chosen by a judge, sometimes after relatives disagree in open court.', 'The guardian you named, with a second choice behind them.'],
  ['Money for young children', 'Held by a court conservator and handed over in full at 18.', 'Held in trust and paid out at the ages you choose.'],
  ['Privacy', 'Probate is public. The inventory of what you owned is a court record.', 'A trust is settled privately, without a court file.'],
  ['Time and cost', 'Nine to eighteen months, with court costs and fees paid from the estate.', 'Weeks, not months, for a funded trust.'],
];

const STEPS = [
  ['First meeting', 'Forty-five minutes, free, at our office or by video. We listen, recommend one plan, and confirm its flat fee in writing before you leave.'],
  ['The questionnaire', 'Twelve pages about family, property and wishes. Fill it in at home, or do it with our paralegal over the phone.'],
  ['Drafts in ten working days', 'Every document comes with a one-page summary in plain English on top, so you read what it does before how it says it.'],
  ['Review meeting', 'We go through every page together. Change as much as you like; the fee does not move.'],
  ['The signing', 'About an hour in our conference room. We provide the two witnesses and the notary. Originals go in our fire safe, a bound copy goes home with you.'],
  ['Funding the trust', 'For trust plans we record the deed and give you a letter for each bank and broker, so the trust actually holds what it should.'],
];

type Partner = { initials: string; name: string; role: string; bio: string; admitted: string; focus: string; speaks: string; line: string; tel: string };

const PARTNERS: Partner[] = [
  {
    initials: 'MA',
    name: 'Margaret Ashby',
    role: 'Founding partner',
    bio: 'Eleven years as a probate court clerk before law school, which is why she drafts every plan as if she will be the one reading it after a death.',
    admitted: 'State bar, 2004',
    focus: 'Trusts for blended families, special needs planning',
    speaks: 'English, French',
    line: '(555) 014-2211',
    tel: '+15550142211',
  },
  {
    initials: 'JC',
    name: 'Julian Crane',
    role: 'Partner',
    bio: 'Board-certified in estate planning and probate law. Handles trust administration and probate when a client dies, so families deal with someone who knew the plan.',
    admitted: 'State bar, 2009',
    focus: 'Probate, trust administration, family businesses',
    speaks: 'English, Spanish',
    line: '(555) 014-2212',
    tel: '+15550142212',
  },
];

const FAQ = [
  ['Do I need a trust, or is a will enough?', 'A will is enough for many people renting or with modest savings. A trust earns its fee when you own a home, own property in two states, or want money held for children past 18. We tell you which at the first meeting, and we will say so if the cheaper plan fits.'],
  ['We have a will from another state. Is it still valid?', 'Almost always, yes. But powers of attorney and health care forms are state-specific, and banks here can refuse an out-of-state one. We review an old plan for $250, credited against any new plan.'],
  ['How often should a plan be updated?', 'Look at it after a marriage, a divorce, a birth, a death, a move or a large change in what you own. Otherwise every five years. Small changes to a trust are a flat $350 amendment.'],
  ['Do you handle probate after a death?', 'Yes. Julian Crane leads probate and trust administration, billed hourly at $320 with a written estimate, or as a flat fee for a funded trust.'],
  ['Can you come to a hospital or care home?', 'Yes, within twenty miles, for a $200 travel fee. We bring the witnesses and the notary.'],
  ['What does the flat fee leave out?', 'County recording fees for deeds, usually $40 to $90, passed through at cost. Nothing else. Phone calls and emails about your plan are never billed.'],
];

const HOURS = [
  ['Monday to Thursday', '8:30-5:30'],
  ['Friday', '8:30-3:00'],
  ['Evenings', 'Tuesdays to 7:30, by appointment'],
  ['Hospital visits', 'Any day, on request'],
];

export default function AshbyCraneLawPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--vellum': '#f3eee3',
        '--navy': '#1b2340',
        '--oxblood': '#7c2735',
        '--green': '#2d5a44',
        '--gold': '#b48d2e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="vellum,navy,oxblood,green,gold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Ashby &amp; Crane</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Wills, trusts and estates</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#contact">Free first meeting</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The cover sheet of the instrument, lying on its binding cloth. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,2,0" className={s.heroCloth} aria-hidden="true">
            <TabbiedPattern
              pattern={regimental}
              palette={CLOTH}
              fit="grid"
              cellSize={76}
              seed="ashby-cloth"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.sheet}>
            <p data-edit="hero.docNo" data-edit-max="240" data-edit-multiline className={s.docNo}>Instrument no. 1, estate planning at a flat fee</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Put your affairs in order, <em>once and in writing.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Ashby &amp; Crane draft wills, living trusts and powers of attorney
              for families in the county. You know the fee before we write a
              word, you read every page in plain English, and you sign in our
              office about three weeks after we first meet.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free first meeting</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#plans">Read the flat fees</a>
            </div>
            <dl className={s.terms}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Flat fee from</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>$1,450</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">First meeting</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Free, 45 min</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Plans signed since 2009</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>2,140</dd>
              </div>
            </dl>
            <p className={s.seal} aria-hidden="true">
              <span data-edit="hero.sealMark" data-edit-max="60" className={s.sealMark}>A&amp;C</span>
              <span data-edit="hero.sealYear" data-edit-max="60" className={s.sealYear}>Est. 2009</span>
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- CONTENTS */}
        <section id="contents" className={s.contents} aria-labelledby="contents-h">
          <h2 data-edit="contents.contentsTitle" data-edit-max="60" id="contents-h" className={s.contentsTitle}>Contents</h2>
          <ol className={s.contentsList}>
            {CONTENTS.map((c, i) => (
              <li key={c.href}>
                <a href={c.href} className={s.contentsLink}>
                  <span data-edit={`contents.contentsNo.${i}`} data-edit-max="60" className={s.contentsNo}>{c.no}</span>
                  <span data-edit={`contents.contentsName.${i}`} data-edit-max="60" className={s.contentsName}>{c.title}</span>
                  <span className={s.leader} aria-hidden="true" />
                  <span data-edit={`contents.contentsNote.${i}`} data-edit-max="60" className={s.contentsNote}>{c.note}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------- ARTICLE I */}
        <section id="plans" className={s.article} aria-labelledby="plans-h">
          <div className={s.margin}>
            <p className={s.artNo}>
              <span data-edit="plans.artWord" data-edit-max="60" className={s.artWord}>Article</span>
              <span data-edit="plans.artNum" data-edit-max="60" className={s.artNum}>I</span>
            </p>
          </div>
          <div className={s.artBody}>
            <h2 data-edit="plans.artTitle" data-edit-max="60" id="plans-h" className={s.artTitle}>The plans, at a flat fee</h2>
            <p data-edit="plans.preamble" data-edit-max="240" data-edit-multiline className={s.preamble}>
              Three plans cover nearly every family we see. The fee is fixed at
              the first meeting and written into the engagement letter: half
              when you sign it, half at the signing.
            </p>
            <div className={s.plans}>
              {PLANS.map((p, i) => (
                <article key={p.name} className={p.pick ? `${s.plan} ${s.planPick}` : s.plan}>
                  <p className={s.schedule}>{`Schedule ${p.letter}`}</p>
                  <h3 data-edit={`plan.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                  <p data-edit={`plan.planSub.${i}`} data-edit-max="240" data-edit-multiline className={s.planSub}>{p.sub}</p>
                  <dl className={s.fees}>
                    <div>
                      <dt data-edit={`plan.term.${i}`} data-edit-max="28">One person</dt>
                      <dd data-edit={`plan.body.${i}`} data-edit-max="200" data-edit-multiline>{p.single}</dd>
                    </div>
                    <div>
                      <dt data-edit={`plan.term2.${i}`} data-edit-max="28">A couple</dt>
                      <dd data-edit={`plan.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.couple}</dd>
                    </div>
                  </dl>
                  <ol className={s.clauses}>
                    {p.clauses.map((c, j) => (
                      <li key={c}>
                        <span className={s.clauseNo}>{`${i + 1}.${j + 1}`}</span>
                        <span data-edit={`plan.text.${i}.${j}`} data-edit-max="60">{c}</span>
                      </li>
                    ))}
                  </ol>
                  <p data-edit={`plan.pickNote.${i}`} data-edit-max="240" data-edit-multiline className={s.pickNote}>{p.tag}</p>
                </article>
              ))}
            </div>
            <p data-edit="plans.fine" data-edit-max="240" data-edit-multiline className={s.fine}>
              County recording fees for a deed, usually $40 to $90, are passed
              through at cost. Calls and emails about your plan are never billed.
            </p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,3,4,0" className={s.ribbon} aria-hidden="true">
          <TabbiedPattern
            pattern={regimental}
            palette={RIBBON}
            fit="grid"
            cellSize={46}
            seed="ashby-ribbon"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------ ARTICLE II */}
        <section id="intestacy" className={s.article} aria-labelledby="intestacy-h">
          <div className={s.margin}>
            <p className={s.artNo}>
              <span data-edit="intestacy.artWord" data-edit-max="60" className={s.artWord}>Article</span>
              <span data-edit="intestacy.artNum" data-edit-max="60" className={s.artNum}>II</span>
            </p>
          </div>
          <div className={s.artBody}>
            <h2 data-edit="intestacy.artTitle" data-edit-max="60" id="intestacy-h" className={s.artTitle}>If there is no will</h2>
            <p data-edit="intestacy.preamble" data-edit-max="240" data-edit-multiline className={s.preamble}>
              Every state has already written a will for you. It is called
              intestacy, it is the same for everyone, and it was not drafted with
              your family in mind. Here is what it says, beside what a plan says.
            </p>
            <div className={s.tableWrap}>
              <table className={s.compare}>
                <caption data-edit="intestacy.srOnly" className={s.srOnly}>What happens without a will, compared with a written plan</caption>
                <thead>
                  <tr>
                    <th data-edit="intestacy.heading" scope="col">The matter</th>
                    <th data-edit="intestacy.heading2" scope="col">Without a will</th>
                    <th data-edit="intestacy.heading3" scope="col">With a plan</th>
                  </tr>
                </thead>
                <tbody>
                  {WITHOUT.map(([m, without, plan], i) => (
                    <tr key={m}>
                      <th data-edit={`intestacy.heading4.${i}`} scope="row">{m}</th>
                      <td data-edit={`intestacy.cell.${i}`}>{without}</td>
                      <td data-edit={`intestacy.withPlan.${i}`} className={s.withPlan}>{plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <blockquote className={s.quote}>
              <p data-edit="intestacy.body" data-edit-max="240" data-edit-multiline>The most expensive estate plan is the one a judge writes for you after the funeral.</p>
              <cite data-edit="intestacy.attribution" data-edit-max="48">Margaret Ashby, to almost every new client</cite>
            </blockquote>
          </div>
        </section>

        {/* ----------------------------------------------------- ARTICLE III */}
        <section id="process" className={s.article} aria-labelledby="process-h">
          <div className={s.margin}>
            <p className={s.artNo}>
              <span data-edit="process.artWord" data-edit-max="60" className={s.artWord}>Article</span>
              <span data-edit="process.artNum" data-edit-max="60" className={s.artNum}>III</span>
            </p>
          </div>
          <div className={s.artBody}>
            <h2 data-edit="process.artTitle" data-edit-max="60" id="process-h" className={s.artTitle}>How a plan is made</h2>
            <p data-edit="process.preamble" data-edit-max="240" data-edit-multiline className={s.preamble}>
              Six steps, about three weeks from the first meeting to the signing,
              and you are never asked to sign anything you have not had explained.
            </p>
            <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t} className={s.step}>
                  <span className={s.stepNo}>{`3.${i + 1}`}</span>
                  <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                  <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------ ARTICLE IV
            The signature page: in witness whereof, the two partners. */}
        <section id="partners" className={`${s.article} ${s.witness}`} aria-labelledby="partners-h">
          <div className={s.margin}>
            <p className={s.artNo}>
              <span data-edit="partners.artWord" data-edit-max="60" className={s.artWord}>Article</span>
              <span data-edit="partners.artNum" data-edit-max="60" className={s.artNum}>IV</span>
            </p>
            <div data-edit-pattern="partners.field" data-edit-roles="transparent,3,4,2,3,0" className={s.spine} aria-hidden="true">
              <TabbiedPattern
                pattern={regimental}
                palette={SPINE}
                fit="grid"
                cellSize={40}
                seed="ashby-spine"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.artBody}>
            <h2 data-edit="partners.artTitle" data-edit-max="60" id="partners-h" className={s.artTitle}>In witness whereof, the partners</h2>
            <p data-edit="partners.preamble" data-edit-max="240" data-edit-multiline className={s.preamble}>
              Two attorneys and one paralegal. The partner who meets you drafts
              your plan, signs it with you, and is the one who answers when your
              family calls.
            </p>
            <div className={s.partners}>
              {PARTNERS.map((p, i) => (
                <article key={p.name} className={s.partner}>
                  <span className={s.monogram} aria-hidden="true">{p.initials}</span>
                  <p data-edit={`partner.partnerRole.${i}`} data-edit-max="240" data-edit-multiline className={s.partnerRole}>{p.role}</p>
                  <p data-edit={`partner.partnerBio.${i}`} data-edit-max="240" data-edit-multiline className={s.partnerBio}>{p.bio}</p>
                  <dl className={s.partnerFacts}>
                    <div>
                      <dt data-edit={`partner.term.${i}`} data-edit-max="28">Admitted</dt>
                      <dd data-edit={`partner.body.${i}`} data-edit-max="200" data-edit-multiline>{p.admitted}</dd>
                    </div>
                    <div>
                      <dt data-edit={`partner.term2.${i}`} data-edit-max="28">Focus</dt>
                      <dd data-edit={`partner.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.focus}</dd>
                    </div>
                    <div>
                      <dt data-edit={`partner.term3.${i}`} data-edit-max="28">Speaks</dt>
                      <dd data-edit={`partner.body3.${i}`} data-edit-max="200" data-edit-multiline>{p.speaks}</dd>
                    </div>
                  </dl>
                  <div className={s.signLine} aria-hidden="true" />
                  <h3 data-edit={`partner.partnerName.${i}`} data-edit-max="40" className={s.partnerName}>{p.name}</h3>
                  <a className={s.partnerLine} href={`tel:${p.tel}`}>{`Direct line ${p.line}`}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- ARTICLE V */}
        <section id="questions" className={s.article} aria-labelledby="questions-h">
          <div className={s.margin}>
            <p className={s.artNo}>
              <span data-edit="questions.artWord" data-edit-max="60" className={s.artWord}>Article</span>
              <span data-edit="questions.artNum" data-edit-max="60" className={s.artNum}>V</span>
            </p>
          </div>
          <div className={s.artBody}>
            <h2 data-edit="questions.artTitle" data-edit-max="60" id="questions-h" className={s.artTitle}>Questions asked most</h2>
            <div className={s.faq}>
              {FAQ.map(([q, a], i) => (
                <details key={q} className={s.faqItem}>
                  <summary className={s.faqQ}>
                    <span className={s.faqNo}>{`5.${i + 1}`}</span>
                    <span data-edit={`questions.text.${i}`} data-edit-max="60">{q}</span>
                  </summary>
                  <p data-edit={`questions.faqA.${i}`} data-edit-max="240" data-edit-multiline className={s.faqA}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ ARTICLE VI */}
        <section id="contact" className={s.article} aria-labelledby="contact-h">
          <div className={s.margin}>
            <p className={s.artNo}>
              <span data-edit="contact.artWord" data-edit-max="60" className={s.artWord}>Article</span>
              <span data-edit="contact.artNum" data-edit-max="60" className={s.artNum}>VI</span>
            </p>
          </div>
          <div className={s.artBody}>
            <h2 data-edit="contact.artTitle" data-edit-max="60" id="contact-h" className={s.artTitle}>Execution: book a first meeting</h2>
            <div className={s.contactGrid}>
              <div className={s.office}>
                <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>40 Quarry Lane, Suite 3</p>
                <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Old Town, above the stationer. Lift from the courtyard, parking behind on Mercer Row.</p>
                <p className={s.contactLine}>
                  <a data-edit="contact.link" data-edit-max="28" href="tel:+15550142210">(555) 014-2210</a>
                </p>
                <p className={s.contactLine}>
                  <a data-edit="contact.link2" data-edit-max="28" href="mailto:office@ashbycrane.example">office@ashbycrane.example</a>
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
                <p data-edit="contact.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Request for a first meeting</p>
                <div className={s.field}>
                  <label data-edit="contact.label" htmlFor="ac-name">Full name</label>
                  <input id="ac-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label2" htmlFor="ac-phone">Phone</label>
                  <input id="ac-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="contact.label3" htmlFor="ac-email">Email</label>
                  <input id="ac-email" name="email" type="email" autoComplete="email" />
                </div>
                <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                  <legend data-edit="contact.legend">The plan you have in mind</legend>
                  <div className={s.picks}>
                    <input id="ac-p1" type="radio" name="plan" value="will" />
                    <label data-edit="contact.label4" htmlFor="ac-p1">Will Plan</label>
                    <input id="ac-p2" type="radio" name="plan" value="trust" />
                    <label data-edit="contact.label5" htmlFor="ac-p2">Trust Plan</label>
                    <input id="ac-p3" type="radio" name="plan" value="legacy" />
                    <label data-edit="contact.label6" htmlFor="ac-p3">Legacy Plan</label>
                    <input id="ac-p4" type="radio" name="plan" value="unsure" />
                    <label data-edit="contact.label7" htmlFor="ac-p4">Not sure yet</label>
                  </div>
                </fieldset>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="contact.label8" htmlFor="ac-note">Anything we should know first</label>
                  <textarea id="ac-note" name="note" rows={4} />
                </div>
                <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Request the meeting</button>
                <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Sent to the office, read by an attorney, answered within one working day.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,2,0" className={s.footCloth} aria-hidden="true">
          <TabbiedPattern
            pattern={regimental}
            palette={CLOTH}
            fit="grid"
            cellSize={40}
            seed="ashby-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ashby &amp; Crane</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional law firm. The attorneys, fees, cases and address are invented, and nothing here is legal advice.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
