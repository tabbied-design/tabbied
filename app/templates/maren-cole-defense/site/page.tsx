import { TabbiedPattern } from 'tabbied/react';
import { cleat } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './maren-cole-defense.module.css';

export const metadata = {
  title: 'Maren Cole: Criminal defense attorney, Calder County',
  description:
    'Maren Cole defends people charged with crimes in Calder County and federal court. A lawyer answers the arrest line at any hour, jail visits within four hours, flat written fees.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   poster: bone and signal red on a night ground, with the cleat chevrons as
   the only picture. The chevrons point, like a sign on a wall, so they sit
   where the eye should go next: beside the hotline, between the record and
   the first 72 hours, and behind the lawyer's name. */
const NIGHT = '#121314';
const BONE = '#f0e8da';
const RED = '#d8402f';
const AMBER = '#eea63a';
const TEAL = '#1c8c8f';

const CHEVRONS = ['transparent', TEAL, NIGHT, AMBER, RED, BONE];
const STRIP = ['transparent', RED, NIGHT, BONE, AMBER, TEAL];
const NAMEPLATE = ['transparent', AMBER, TEAL, BONE, RED, AMBER];

const NAV = [
  ['Your rights', '#rights'],
  ['Practice', '#practice'],
  ['The record', '#record'],
  ['First 72 hours', '#hours'],
  ['About Maren', '#about'],
  ['Contact', '#contact'],
];

/* The fold-out card: four panels, each one situation and the words to say. */
const RIGHTS = [
  {
    n: '1',
    when: 'If police stop you',
    say: 'Am I free to go?',
    do: 'Give your name and license if driving. Keep your hands where they can be seen. Do not argue, and do not run.',
  },
  {
    n: '2',
    when: 'If they ask to search',
    say: 'I do not consent to a search.',
    do: 'Say it clearly, once. Do not physically resist. A search you agreed to is very hard to challenge later.',
  },
  {
    n: '3',
    when: 'If they want to talk',
    say: 'I am going to remain silent.',
    do: 'Then stop talking. Silence is not guilt, and nothing you explain at the station will get you sent home.',
  },
  {
    n: '4',
    when: 'If you are arrested',
    say: 'I want to speak to my lawyer.',
    do: 'Ask for your phone call and call the hotline. Sign nothing but the property sheet.',
  },
];

const PRACTICE = [
  { area: 'DUI and OWI', note: 'Breath and blood results challenged, and the license hearing requested inside its 10-day window.', fee: 'Flat $3,500, first offense' },
  { area: 'Drug charges', note: 'Possession to trafficking. Most of these cases are won or lost on how the search was done.', fee: 'From $4,000' },
  { area: 'Assault', note: 'Self-defense claims, domestic charges, protective and no-contact orders.', fee: 'From $3,000' },
  { area: 'Theft and fraud', note: 'Shoplifting to embezzlement, with restitution negotiated before anyone talks about trial.', fee: 'From $2,500' },
  { area: 'Weapons', note: 'Carry permits, prohibited-person charges and the sentence enhancements that ride on them.', fee: 'From $4,500' },
  { area: 'Juvenile', note: 'Detention hearings, school discipline that turns criminal, and records sealed at 18.', fee: 'From $2,000' },
  { area: 'Probation', note: 'Violation hearings defended and terms modified, so a missed meeting does not become jail.', fee: 'From $1,800' },
  { area: 'Record clearing', note: 'Expungement and sealing petitions drafted, filed and argued for old convictions and arrests.', fee: 'Flat $900' },
];

type Case = { year: string; client: string; charge: string; outcome: string; kind: 'dismissed' | 'acquitted' | 'reduced'; how: string };

const RECORD: Case[] = [
  { year: '2026', client: 'State v. D.R.', charge: 'Felony drug possession', outcome: 'Dismissed', kind: 'dismissed', how: 'Search of the car ruled unlawful' },
  { year: '2025', client: 'State v. K.M.', charge: 'DUI, 0.11 breath', outcome: 'Dismissed', kind: 'dismissed', how: 'Breath machine out of calibration' },
  { year: '2025', client: 'State v. A.L.', charge: 'Aggravated assault', outcome: 'Not guilty', kind: 'acquitted', how: 'Jury trial, self-defense' },
  { year: '2025', client: 'State v. T.W.', charge: 'Retail theft', outcome: 'Diverted', kind: 'reduced', how: 'Six months of classes, record sealed' },
  { year: '2024', client: 'U.S. v. J.P.', charge: 'Firearm, prohibited person', outcome: 'Reduced', kind: 'reduced', how: 'Misdemeanor plea, no prison' },
  { year: '2024', client: 'State v. S.H.', charge: 'Domestic battery', outcome: 'Not guilty', kind: 'acquitted', how: 'Bench trial, two days' },
];

const HOURS = [
  { at: 'Hour 0', title: 'You call', body: 'A lawyer answers, not a service. Tell us where the person is held and the charge on the booking sheet, if you know it.' },
  { at: 'By hour 4', title: 'Jail visit', body: 'Maren or an associate sees the client in person, reads the arrest report and says plainly what to expect.' },
  { at: 'By hour 24', title: 'Bail hearing', body: 'We argue for release on recognizance, or a bond the family can make, with a job and an address to show the judge.' },
  { at: 'By hour 72', title: 'Arraignment', body: 'Not-guilty plea entered. Requests for the body-camera video and the lab reports go out the same afternoon.' },
];

const STATS = [
  ['212', 'cases dismissed or diverted since 2017'],
  ['38', 'jury trials taken to verdict'],
  ['24', 'of them ending in not guilty'],
];

export default function MarenColeDefense() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#121314',
        '--bone': '#f0e8da',
        '--red': '#d8402f',
        '--amber': '#eea63a',
        '--teal': '#1c8c8f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,bone,red,amber,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;700&display=swap"
      />

      <header className={s.top}>
        <p className={s.hotStrip}>
          <a data-edit="top.link" data-edit-max="28" href="tel:+15550142400">Arrested, or police want to talk? Say nothing. Call (555) 014-2400, any hour.</a>
        </p>
        <div className={s.bar}>
          <a className={s.brand} href="#main">
            <span data-edit="top.brandName" data-edit-max="60" className={s.brandName}>Maren Cole</span>
            <span data-edit="top.brandSub" data-edit-max="60" className={s.brandSub}>Criminal Defense</span>
          </a>
          <nav className={s.nav} aria-label="Sections">
            {NAV.map(([label, href], i) => (
              <a data-edit={`top.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </nav>
          <a data-edit="top.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550142400">24h line</a>
          <TemplateMenu className={s.siteMenu}>
            {NAV.map(([label, href], i) => (
              <a data-edit={`top.link3.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </TemplateMenu>
        </div>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ HERO
            Poster first: the instruction, then the number, as big as the
            page allows. The chevrons stand at the right edge, cut into an
            arrow that points back at the phone number. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Criminal defense, Calder County and federal court</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Say nothing. <em>Call Maren.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              The minutes after an arrest decide more cases than the trial does.
              A defense lawyer answers this line day and night, and is at the
              jail within four hours.
            </p>
            <div className={s.hotline}>
              <p data-edit="hero.hotLabel" data-edit-max="240" data-edit-multiline className={s.hotLabel}>24-hour arrest line</p>
              <p className={s.hotNumber}>
                <a data-edit="hero.link" data-edit-max="28" href="tel:+15550142400">(555) 014-2400</a>
              </p>
              <p data-edit="hero.hotNote" data-edit-max="240" data-edit-multiline className={s.hotNote}>Answered by a lawyer. Free and confidential.</p>
            </div>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="tel:+15550142400">Call the hotline</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#contact">Ask for a case review</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,4,0,3,2,1" className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={cleat}
                palette={CHEVRONS}
                fit="grid"
                cellSize={64}
                seed="maren-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.heroCard}>
              <p data-edit="hero.heroCardBig" data-edit-max="240" data-edit-multiline className={s.heroCardBig}>4 hrs</p>
              <p data-edit="hero.heroCardText" data-edit-max="240" data-edit-multiline className={s.heroCardText}>From your call to a lawyer at the jail, any day of the year.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- RIGHTS
            A wallet card, unfolded: four panels split by fold lines, each
            one a situation and the exact words to say. */}
        <section id="rights" className={s.rights} aria-labelledby="rights-h">
          <div className={s.rightsHead}>
            <h2 data-edit="rights.text" data-edit-format="emphasis" data-edit-max="60" id="rights-h" className={s.sectionTitle}>
              Know your rights. <span>Keep this card.</span>
            </h2>
            <p data-edit="rights.sectionNote" data-edit-max="240" data-edit-multiline className={s.sectionNote}>
              Fold it twice and it fits behind a driver license. Four
              situations, and the one sentence that protects you in each.
            </p>
          </div>
          <div className={s.card}>
            {RIGHTS.map((r, i) => (
              <div key={r.n} className={s.fold}>
                <p data-edit={`rights.foldNum.${i}`} data-edit-max="240" data-edit-multiline className={s.foldNum}>{r.n}</p>
                <h3 data-edit={`rights.foldWhen.${i}`} data-edit-max="40" className={s.foldWhen}>{r.when}</h3>
                <p data-edit={`rights.foldSayLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.foldSayLabel}>Say</p>
                <p data-edit={`rights.foldSay.${i}`} data-edit-max="240" data-edit-multiline className={s.foldSay}>{r.say}</p>
                <p data-edit={`rights.foldDo.${i}`} data-edit-max="240" data-edit-multiline className={s.foldDo}>{r.do}</p>
              </div>
            ))}
          </div>
          <p data-edit="rights.cardFoot" data-edit-max="240" data-edit-multiline className={s.cardFoot}>Then call (555) 014-2400. The call is free, at any hour, and it stays between us.</p>
        </section>

        {/* -------------------------------------------------------- PRACTICE */}
        <section id="practice" className={s.practice} aria-labelledby="practice-h">
          <div className={s.practiceHead}>
            <h2 data-edit="practice.sectionTitle" data-edit-max="60" id="practice-h" className={s.sectionTitle}>What we defend</h2>
            <p data-edit="practice.sectionNote" data-edit-max="240" data-edit-multiline className={s.sectionNote}>
              Fees are flat and written into the agreement before any work
              starts. Payment plans on every case; no one waits in jail while
              the family finds the money.
            </p>
          </div>
          <ul className={s.areas}>
            {PRACTICE.map((p, i) => (
              <li key={p.area} className={s.area}>
                <h3 data-edit={`practice.areaName.${i}`} data-edit-max="40" className={s.areaName}>{p.area}</h3>
                <p data-edit={`practice.areaNote.${i}`} data-edit-max="240" data-edit-multiline className={s.areaNote}>{p.note}</p>
                <p data-edit={`practice.areaFee.${i}`} data-edit-max="240" data-edit-multiline className={s.areaFee}>{p.fee}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- RECORD
            A short docket: initials only, the charge, and how it ended. */}
        <section id="record" className={s.record} aria-labelledby="record-h">
          <div className={s.recordHead}>
            <h2 data-edit="record.sectionTitle" data-edit-max="60" id="record-h" className={s.sectionTitle}>The record</h2>
            <dl className={s.stats}>
              {STATS.map(([n, label], i) => (
                <div key={label} className={s.stat}>
                  <dt data-edit={`record.statLabel.${i}`} data-edit-max="28" className={s.statLabel}>{label}</dt>
                  <dd data-edit={`record.statNum.${i}`} data-edit-max="200" data-edit-multiline className={s.statNum}>{n}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.docketWrap}>
            <table className={s.docket}>
              <caption data-edit="record.srOnly" className={s.srOnly}>Recent outcomes, by year</caption>
              <thead>
                <tr>
                  <th data-edit="record.heading" scope="col">Year</th>
                  <th data-edit="record.heading2" scope="col">Case</th>
                  <th data-edit="record.heading3" scope="col">Charge</th>
                  <th data-edit="record.heading4" scope="col">Outcome</th>
                  <th data-edit="record.heading5" scope="col">How</th>
                </tr>
              </thead>
              <tbody>
                {RECORD.map((r, i) => (
                  <tr key={r.client}>
                    <td data-edit={`record.year.${i}`} className={s.year}>{r.year}</td>
                    <th data-edit={`record.client.${i}`} scope="row" className={s.client}>{r.client}</th>
                    <td data-edit={`record.cell.${i}`}>{r.charge}</td>
                    <td>
                      <span data-edit={`record.outcome.${i}`} data-edit-max="60" className={`${s.outcome} ${s[r.kind]}`}>{r.outcome}</span>
                    </td>
                    <td data-edit={`record.how.${i}`} className={s.how}>{r.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="record.recordNote" data-edit-max="240" data-edit-multiline className={s.recordNote}>Past results do not promise a future outcome. Every case turns on its own facts.</p>
        </section>

        <div data-edit-pattern="main.field" data-edit-roles="transparent,2,0,1,3,4" className={s.strip} aria-hidden="true">
          <TabbiedPattern
            pattern={cleat}
            palette={STRIP}
            fit="grid"
            cellSize={48}
            seed="maren-strip"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hours} aria-labelledby="hours-h">
          <h2 data-edit="hours.sectionTitle" data-edit-max="60" id="hours-h" className={s.sectionTitle}>The first 72 hours</h2>
          <ol className={s.timeline}>
            {HOURS.map((h, i) => (
              <li key={h.at} className={s.step}>
                <p data-edit={`hours.stepAt.${i}`} data-edit-max="240" data-edit-multiline className={s.stepAt}>{h.at}</p>
                <h3 data-edit={`hours.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{h.title}</h3>
                <p data-edit={`hours.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{h.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- ABOUT */}
        <section id="about" className={s.about} aria-labelledby="about-h">
          <div data-edit-pattern="about.field" data-edit-roles="transparent,3,4,1,2,3" className={s.plate} aria-hidden="true">
            <TabbiedPattern
              pattern={cleat}
              palette={NAMEPLATE}
              fit="grid"
              cellSize={56}
              seed="maren-plate"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.aboutText}>
            <h2 data-edit="about.sectionTitle" data-edit-max="60" id="about-h" className={s.sectionTitle}>Maren Cole</h2>
            <p data-edit="about.aboutLead" data-edit-max="240" data-edit-multiline className={s.aboutLead}>
              Eight years as a public defender, carrying ninety files at a time,
              taught her that most cases are decided by whoever reads the police
              report most carefully. She opened this office in 2017 to read
              fewer of them, more carefully.
            </p>
            <dl className={s.facts}>
              <div>
                <dt data-edit="about.term" data-edit-max="28">Admitted</dt>
                <dd data-edit="about.body" data-edit-max="200" data-edit-multiline>State bar 2009, federal district court 2011</dd>
              </div>
              <div>
                <dt data-edit="about.term2" data-edit-max="28">Before</dt>
                <dd data-edit="about.body2" data-edit-max="200" data-edit-multiline>Calder County Public Defender, 2009-2017</dd>
              </div>
              <div>
                <dt data-edit="about.term3" data-edit-max="28">The team</dt>
                <dd data-edit="about.body3" data-edit-max="200" data-edit-multiline>Two associate attorneys and a licensed investigator</dd>
              </div>
              <div>
                <dt data-edit="about.term4" data-edit-max="28">Teaching</dt>
                <dd data-edit="about.body4" data-edit-max="200" data-edit-multiline>Trial advocacy clinic, Calder State law school</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactInfo}>
            <h2 data-edit="contact.sectionTitle" data-edit-max="60" id="contact-h" className={s.sectionTitle}>Talk to a lawyer</h2>
            <p data-edit="contact.sectionNote" data-edit-max="240" data-edit-multiline className={s.sectionNote}>
              If someone is in custody now, call. The form is for everything
              else, and Maren reads it herself the same day.
            </p>
            <dl className={s.contactList}>
              <div>
                <dt data-edit="contact.term" data-edit-max="28">Arrest line</dt>
                <dd>
                  <a data-edit="contact.link" data-edit-max="28" href="tel:+15550142400">(555) 014-2400</a>
                </dd>
              </div>
              <div>
                <dt data-edit="contact.term2" data-edit-max="28">Office</dt>
                <dd>
                  <a data-edit="contact.link2" data-edit-max="28" href="tel:+15550142410">(555) 014-2410</a>
                </dd>
              </div>
              <div>
                <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="contact.link3" data-edit-max="28" href="mailto:intake@marencole.example">intake@marencole.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="contact.term4" data-edit-max="28">Address</dt>
                <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>418 Bastion Street, Suite 3, Calder City</dd>
              </div>
              <div>
                <dt data-edit="contact.term5" data-edit-max="28">Hours</dt>
                <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Arrest line, 24 hours. Office, Monday to Friday, 8:30 to 6.</dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <p data-edit="contact.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Confidential case review</p>
            <label className={s.field}>
              <span data-edit="contact.text" data-edit-max="60">Your name</span>
              <input type="text" name="name" autoComplete="name" />
            </label>
            <label className={s.field}>
              <span data-edit="contact.text2" data-edit-max="60">Phone</span>
              <input type="tel" name="phone" autoComplete="tel" />
            </label>
            <label className={s.field}>
              <span data-edit="contact.text3" data-edit-max="60">Who is the case for?</span>
              <select name="who" defaultValue="me">
                <option value="me">Me</option>
                <option value="family">A family member</option>
                <option value="custody">Someone in custody now</option>
              </select>
            </label>
            <label className={s.field}>
              <span data-edit="contact.text4" data-edit-max="60">What happened, and the court date if you have one</span>
              <textarea name="message" rows={4} />
            </label>
            <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to Maren</button>
            <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Sending this does not make us your lawyers yet, but it is kept confidential.</p>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,0,1,3,4" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={cleat}
            palette={STRIP}
            fit="grid"
            cellSize={40}
            seed="maren-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Maren Cole</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional law office: the names, cases, fees and address are
            invented, and nothing here is legal advice.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
