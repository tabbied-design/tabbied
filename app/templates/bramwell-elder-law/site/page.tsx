import { TabbiedPattern } from 'tabbied/react';
import { fadedbar } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './bramwell-elder-law.module.css';

export const metadata = {
  title: 'Bramwell Elder Law: Care planning, Medicaid and guardianship, in plain words',
  description:
    'Bramwell Elder Law helps older people and their families plan for care, pay for a nursing home, sign a power of attorney and, when nothing gentler will do, apply for guardianship. Flat fees, large print, and home visits at no extra charge.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The faded bars
   are the practice's one ornament: slanted strokes that thin toward one end,
   like a pen line drawn calmly. They stand in an arched window in the hero,
   rest under the guide, sit beside the home visits and edge the footer. */
const LINEN = '#f5f1e8';
const NAVY = '#1f2d44';
const HARBOR = '#4f7590';
const BRASS = '#b48b4c';
const MIST = '#b7c7cf';

const WINDOW = ['transparent', MIST, LINEN, BRASS, HARBOR, LINEN];
const REST = ['transparent', NAVY, HARBOR, BRASS, MIST, HARBOR];
const VISIT = ['transparent', LINEN, MIST, BRASS, HARBOR, MIST];
const EDGE = ['transparent', MIST, HARBOR, BRASS, LINEN, MIST];

const NAV = [
  ['The guide', '#guide'],
  ['Home visits', '#visits'],
  ['Fees', '#fees'],
  ['Questions', '#questions'],
  ['Contact', '#contact'],
];

type Chapter = {
  id: string;
  numeral: string;
  label: string;
  title: string;
  when: string;
  lead: string;
  signsTitle: string;
  signs: string[];
  we: string[];
  short: string;
  fee: string;
};

/* The family guide: four chapters, each written to be read aloud at a
   kitchen table in under five minutes. */
const CHAPTERS: Chapter[] = [
  {
    id: 'care',
    numeral: '1',
    label: 'Chapter one',
    title: 'Planning for care',
    when: 'Read this when a parent is starting to need help at home, or a diagnosis has changed the plans.',
    lead: 'Care planning is deciding, while there is still time to think, where care will happen, who will give it and how it will be paid for. Families who plan early keep more choices open, and they spend less.',
    signsTitle: 'Signs it is time',
    signs: [
      'A fall, a hospital stay or a new diagnosis',
      'Help needed with bathing, meals or medicines',
      'One family member doing all of the caring',
      'Savings being spent on care with no plan',
    ],
    we: [
      'Meet the whole family, together or one at a time',
      'Map the care nearby and what each kind costs',
      'Write a care plan anyone can read in ten minutes',
      'Review it every year, or the week anything changes',
    ],
    short: 'One family meeting, a written plan and a year of check-ins.',
    fee: 'Flat fee $1,850',
  },
  {
    id: 'medicaid',
    numeral: '2',
    label: 'Chapter two',
    title: 'Medicaid and nursing home costs',
    when: 'Read this when a nursing home is likely in the next five years, or is already here.',
    lead: 'A nursing home in our county costs about $11,400 a month. Medicaid will pay once savings fall below a limit, but it looks back five years at every gift and transfer, and one mistake can hold up care for months.',
    signsTitle: 'Signs it is time',
    signs: [
      'A move to a nursing home is being talked about',
      'Savings will run out within two years',
      'Money was given to children or grandchildren',
      'A husband or wife will stay at home and needs an income',
    ],
    we: [
      'Read five years of statements before anyone applies',
      'Protect the home and the spouse at home where the law allows',
      'Prepare and file the application, and answer the caseworker',
      'Appeal a denial, at no extra fee',
    ],
    short: 'The application, from the first statement to the approval letter.',
    fee: 'Flat fee $4,500',
  },
  {
    id: 'poa',
    numeral: '3',
    label: 'Chapter three',
    title: 'Power of attorney and health care proxy',
    when: 'Read this now, whatever your age. These are the two papers every adult should sign while they can.',
    lead: 'A power of attorney lets someone you trust pay your bills and look after your money if you cannot. A health care proxy lets them speak to your doctors. Without them, your family may have to go to court to help you.',
    signsTitle: 'Who needs them',
    signs: [
      'Anyone over eighteen, honestly',
      'Anyone with a diagnosis that may affect memory',
      'Couples who assume a spouse can sign for them',
      'Anyone whose papers were signed in another state',
    ],
    we: [
      'Explain each power in plain words before you choose',
      'Name a first and a second choice of agent',
      'Sign with witnesses at our office or at your home',
      'Send copies to your doctor and your bank',
    ],
    short: 'Both documents, signed, witnessed and copied to the right people.',
    fee: '$650, or $975 for a couple',
  },
  {
    id: 'guardianship',
    numeral: '4',
    label: 'Chapter four',
    title: 'Guardianship, when nothing gentler will do',
    when: 'Read this when someone can no longer make safe decisions and never signed a power of attorney.',
    lead: 'Guardianship is a court order that lets one person make decisions for another. It is the last resort, and we will always ask first whether something gentler will do. When it is needed, we make the hearing as calm as a hearing can be.',
    signsTitle: 'Signs it is time',
    signs: [
      'Bills unpaid and letters left unopened',
      'Someone taking money who should not be',
      'Care refused that is plainly needed',
      'No power of attorney was ever signed',
    ],
    we: [
      'Look for a less restrictive way first',
      'File the petition and arrange the medical report',
      'Prepare the family for the hearing, step by step',
      'File the yearly reports the court asks for',
    ],
    short: 'An uncontested petition, start to finish, with the court date.',
    fee: 'From $3,800 plus court fees',
  },
];

const PEOPLE = [
  ['Margaret Bramwell', 'Attorney, founded the practice in 1996', 'Twenty-nine years of elder law. She began after caring for her own grandmother, and she still makes most of the home visits.'],
  ['Theo Lindqvist', 'Attorney, Medicaid and guardianship', 'Spent eight years at the county legal aid office. He knows the caseworkers by name and the forms by heart.'],
  ['Rosa Ferraro', 'Care coordinator', 'A hospital social worker for fifteen years. She knows every care home in the county and which ones have a bed this month.'],
];

const FEES = [
  ['First meeting', 'One hour, at our office or at your home', 'Free'],
  ['Power of attorney and health care proxy', 'Both documents, signed and witnessed', '$650'],
  ['The same, for a couple', 'Four documents, one visit', '$975'],
  ['Will with a letter of wishes', 'Includes one free update within three years', '$1,200'],
  ['Care plan and family meeting', 'Written plan and a year of check-ins', '$1,850'],
  ['Medicaid application', 'Nursing home care, appeal included', '$4,500'],
  ['Guardianship petition', 'Uncontested, plus court fees', 'from $3,800'],
];

const QUESTIONS = [
  ['Do we have to come to the office?', 'No. About half of our meetings happen at home, in a hospital or in a care home. Tell us where, and we will come to you.'],
  ['Can I call on behalf of my mother?', 'Yes, and we are glad to talk with family. Before we act we will meet your mother herself, because she is the client and the decisions are hers.'],
  ['How long does a Medicaid application take?', 'Gathering five years of statements takes most families three to six weeks. Once it is filed, the county usually decides within 45 to 90 days.'],
  ['My father forgets things now. Can he still sign?', 'Often, yes. Many people with early memory loss can still sign a power of attorney. We meet them, ask a few simple questions, and if there is doubt we ask their doctor for a short letter.'],
  ['Will you tell us if we do not need you?', 'Yes. If a free form from the county will do the job, we will say so and show you how to fill it in.'],
  ['Do you charge by the hour?', 'No. Every piece of work has a flat fee, agreed in writing before we start and printed in large type.'],
];

const HOURS = [
  ['Monday to Friday', '9:00 to 5:00'],
  ['Saturday', 'By appointment'],
  ['Home visits', 'Tuesdays and Thursdays'],
  ['Hospital visits', 'Any weekday'],
];

export default function BramwellElderLawPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--linen': '#f5f1e8',
        '--navy': '#1f2d44',
        '--harbor': '#4f7590',
        '--brass': '#b48b4c',
        '--mist': '#b7c7cf',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="linen,navy,harbor,brass,mist"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Bramwell</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Elder Law</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550132200">(555) 013-2200</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* -------------------------------------------------------------- HERO
            Large print and calm: the words on the left, and the bars in an
            arched window on the right, with a note pinned to its sill. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Elder law attorneys on Orchard Row, since 1996</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Plain answers for <em>the years ahead.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We help older people and their families plan for care, pay for
              it, and make sure the right person can speak for them. We explain
              everything in plain words, as many times as you need, and we come
              to your kitchen table if that is easier.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="tel:+15550132200">Call (555) 013-2200</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#visits">Ask for a home visit</a>
            </div>
            <p data-edit="intro.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>The first meeting is free, lasts an hour, and commits you to nothing.</p>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,4,0,3,2,0" className={s.window} aria-hidden="true">
              <TabbiedPattern
                pattern={fadedbar}
                palette={WINDOW}
                fit="grid"
                cellSize={64}
                seed="bramwell-window"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.sill}>
              <p data-edit="intro.sillLabel" data-edit-max="240" data-edit-multiline className={s.sillLabel}>This page is in large print</p>
              <p data-edit="intro.sillText" data-edit-max="240" data-edit-multiline className={s.sillText}>
                So are our letters, our fee agreements and every paper we ask
                you to sign. Ask for this guide on paper and we will post it.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- GUIDE
            The contents page of the family guide. */}
        <section id="guide" className={s.guide} aria-labelledby="guide-h">
          <div className={s.guideHead}>
            <p data-edit="guide.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The family guide</p>
            <h2 data-edit="guide.secTitle" data-edit-max="60" id="guide-h" className={s.secTitle}>Four chapters, read in any order</h2>
            <p data-edit="guide.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most families come to us about one of these four things. Start
              with the one that is worrying you today.
            </p>
          </div>
          <ol className={s.contents}>
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <a className={s.contentsLink} href={`#${c.id}`}>
                  <span data-edit={`guide.contentsNo.${i}`} data-edit-max="60" className={s.contentsNo}>{c.numeral}</span>
                  <span data-edit={`guide.contentsTitle.${i}`} data-edit-max="60" className={s.contentsTitle}>{c.title}</span>
                  <span data-edit={`guide.contentsWhen.${i}`} data-edit-max="60" className={s.contentsWhen}>{c.when}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4,2" className={s.rest} aria-hidden="true">
          <TabbiedPattern
            pattern={fadedbar}
            palette={REST}
            fit="grid"
            cellSize={48}
            options={{ frequency: 0.7 }}
            seed="bramwell-rest"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- CHAPTERS */}
        {CHAPTERS.map((c, i) => (
          <section key={c.id} id={c.id} className={s.chapter} aria-labelledby={`${c.id}-h`}>
            <div className={s.chapterHead}>
              <p className={s.chapterNo} aria-hidden="true">{c.numeral}</p>
              <p data-edit={`chapter.chapterLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.chapterLabel}>{c.label}</p>
              <h2 data-edit={`chapter.chapterTitle.${i}`} data-edit-max="60" id={`${c.id}-h`} className={s.chapterTitle}>{c.title}</h2>
              <p data-edit={`chapter.chapterWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.chapterWhen}>{c.when}</p>
            </div>
            <div className={s.chapterBody}>
              <p data-edit={`chapter.chapterLead.${i}`} data-edit-max="240" data-edit-multiline className={s.chapterLead}>{c.lead}</p>
              <div className={s.lists}>
                <div className={s.list}>
                  <h3 data-edit={`chapter.listTitle.${i}`} data-edit-max="40" className={s.listTitle}>{c.signsTitle}</h3>
                  <ul>
                    {c.signs.map((x, j) => (
                      <li data-edit={`chapter.item.${i}.${j}`} data-edit-max="80" key={`${i}-${j}`}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.list}>
                  <h3 data-edit={`chapter.listTitle2.${i}`} data-edit-max="40" className={s.listTitle}>What we do</h3>
                  <ul>
                    {c.we.map((x, k) => (
                      <li data-edit={`chapter.item2.${i}.${k}`} data-edit-max="80" key={`${i}-${k}`}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={s.inShort}>
                <p data-edit={`chapter.inShortLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.inShortLabel}>In short</p>
                <p data-edit={`chapter.inShortText.${i}`} data-edit-max="240" data-edit-multiline className={s.inShortText}>{c.short}</p>
                <p data-edit={`chapter.inShortFee.${i}`} data-edit-max="240" data-edit-multiline className={s.inShortFee}>{c.fee}</p>
              </div>
            </div>
          </section>
        ))}

        {/* ------------------------------------------------------------ VISITS
            The one dark room: we come to you. */}
        <section id="visits" className={s.visits} aria-labelledby="visits-h">
          <div className={s.visitsGrid}>
            <div className={s.visitsText}>
              <p data-edit="visits.visitsKicker" data-edit-max="240" data-edit-multiline className={s.visitsKicker}>Home visits</p>
              <h2 data-edit="visits.visitsTitle" data-edit-max="60" id="visits-h" className={s.visitsTitle}>We come to you</h2>
              <p data-edit="visits.visitsLead" data-edit-max="240" data-edit-multiline className={s.visitsLead}>
                Many of our clients find the office hard to reach, and nobody
                should sign something important in a hurry in a strange room.
                So we come to the house, the hospital or the care home, with the
                papers printed in large type and a witness if one is needed.
              </p>
              <ul className={s.visitList}>
                <li data-edit="visits.item" data-edit-max="80">We arrive when we said, and call if we are delayed</li>
                <li data-edit="visits.item2" data-edit-max="80">We sit where you are comfortable, for as long as it takes</li>
                <li data-edit="visits.item3" data-edit-max="80">A family member can join by phone from anywhere</li>
                <li data-edit="visits.item4" data-edit-max="80">We leave a printed summary of everything we discussed</li>
              </ul>
              <p data-edit="visits.visitArea" data-edit-max="240" data-edit-multiline className={s.visitArea}>
                No extra charge within 30 miles of Millbrook: Ashford Green,
                Kellerton, Owl Creek, Darrow, Pine Hollow and the towns between.
              </p>
              <a data-edit="visits.lightButton" data-edit-max="28" className={s.lightButton} href="#contact">Ask for a home visit</a>
            </div>
            <div className={s.visitsSide}>
              <div data-edit-pattern="visits.field" data-edit-roles="transparent,0,4,3,2,4" className={s.visitField} aria-hidden="true">
                <TabbiedPattern
                  pattern={fadedbar}
                  palette={VISIT}
                  fit="grid"
                  cellSize={56}
                  seed="bramwell-visit"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="visits.peopleTitle" data-edit-max="40" className={s.peopleTitle}>Who will come to see you</h3>
              <ul className={s.people}>
                {PEOPLE.map(([name, role, note], i) => (
                  <li key={name}>
                    <p data-edit={`visits.personName.${i}`} data-edit-max="240" data-edit-multiline className={s.personName}>{name}</p>
                    <p data-edit={`visits.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{role}</p>
                    <p data-edit={`visits.personNote.${i}`} data-edit-max="240" data-edit-multiline className={s.personNote}>{note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Flat fees, agreed before we start</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              No hourly bills and no charge for a phone call. You can pay in
              three parts, and the price on the agreement is the price you pay.
            </p>
          </div>
          <table className={s.fees}>
            <caption data-edit="fees.srOnly" className={s.srOnly}>Fees for each kind of work</caption>
            <thead>
              <tr>
                <th data-edit="fees.heading" scope="col">The work</th>
                <th data-edit="fees.heading2" scope="col">What it includes</th>
                <th data-edit="fees.feeCol" scope="col" className={s.feeCol}>Fee</th>
              </tr>
            </thead>
            <tbody>
              {FEES.map(([work, note, fee], i) => (
                <tr key={work}>
                  <th data-edit={`fees.heading3.${i}`} scope="row">{work}</th>
                  <td data-edit={`fees.cell.${i}`}>{note}</td>
                  <td data-edit={`fees.feeCol2.${i}`} className={s.feeCol}>{fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* --------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.secHead}>
            <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Questions families ask us</h2>
            <p data-edit="questions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              If yours is not here, call and ask. There is no such thing as a
              silly question about a parent you love.
            </p>
          </div>
          <div className={s.faq}>
            {QUESTIONS.map(([q, a], i) => (
              <details key={q} className={s.faqItem}>
                <summary data-edit={`questions.faqQ.${i}`} data-edit-max="80" className={s.faqQ}>{q}</summary>
                <p data-edit={`questions.faqA.${i}`} data-edit-max="240" data-edit-multiline className={s.faqA}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Talk to us</h2>
              <p className={s.bigPhone}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550132200">(555) 013-2200</a>
              </p>
              <p data-edit="contact.contactNote" data-edit-max="240" data-edit-multiline className={s.contactNote}>Answered by a person, 9 to 5 on weekdays.</p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">The office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>41 Orchard Row, Suite 2, Millbrook</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Getting in</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Ground floor and step-free, with four parking spaces by the door</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:help@bramwell-law.example">help@bramwell-law.example</a>
                  </dd>
                </div>
              </dl>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body3.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <p data-edit="contact.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Ask us to call you</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="bw-name">Your name</label>
                <input id="bw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="bw-phone">Phone number</label>
                <input id="bw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={s.fieldset}>
                <legend data-edit="contact.legend">Who is it for</legend>
                <div className={s.picks}>
                  <input id="bw-for1" type="radio" name="for" value="myself" />
                  <label data-edit="contact.label3" htmlFor="bw-for1">Myself</label>
                  <input id="bw-for2" type="radio" name="for" value="parent" />
                  <label data-edit="contact.label4" htmlFor="bw-for2">A parent</label>
                  <input id="bw-for3" type="radio" name="for" value="spouse" />
                  <label data-edit="contact.label5" htmlFor="bw-for3">My husband or wife</label>
                  <input id="bw-for4" type="radio" name="for" value="other" />
                  <label data-edit="contact.label6" htmlFor="bw-for4">Someone else</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="contact.label7" htmlFor="bw-when">Best time to call</label>
                <input id="bw-when" name="when" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label8" htmlFor="bw-note">What is happening</label>
                <textarea id="bw-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask us to call</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We call back within one working day, at the time you choose.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2,3,0,4" className={s.edge} aria-hidden="true">
          <TabbiedPattern
            pattern={fadedbar}
            palette={EDGE}
            fit="grid"
            cellSize={40}
            seed="bramwell-edge"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Bramwell Elder Law</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>41 Orchard Row, Suite 2, Millbrook</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional elder law practice. The attorneys, fees, towns and address are invented, and nothing here is legal advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
