import { TabbiedPattern } from 'tabbied/react';
import { cardiograph } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './steadybeat-cardiology.module.css';

export const metadata = {
  title: 'Steadybeat Cardiology: Heart care and testing, Linden Medical Building',
  description:
    'Steadybeat is a cardiology practice of three physicians with its own testing lab: ECG, echocardiograms, stress tests and heart monitors, with results explained in plain words, usually the same week.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   printout from the ECG cart: warm white paper, a charcoal trace, the coral
   of the printed grid and a clinical teal for the things you press. The
   cardiograph is the strip itself, on a transparent ground so the page's
   paper is the chart paper. It fills the hero, runs across the page as
   strips between sections, and prints out once more along the foot. */
const PAPER = '#fbf6f3';
const INK = '#1c2230';
const CORAL = '#de5b52';
const TEAL = '#1d6b68';

const CHART = ['transparent', INK, CORAL];
const STRIP = ['transparent', TEAL, CORAL];
const NIGHT = ['transparent', PAPER, CORAL];

const NAV = [
  ['Tests', '#tests'],
  ['First visit', '#first-visit'],
  ['Referrals', '#referrals'],
  ['Physicians', '#physicians'],
  ['Contact', '#contact'],
];

type Test = { code: string; name: string; shows: string; time: string; prep: string };

const TESTS: Test[] = [
  { code: 'ECG', name: 'Electrocardiogram', shows: 'The electrical rhythm of the heart at rest: its rate, its regularity, and signs of an old or new strain on the muscle.', time: '10 minutes', prep: 'Nothing. Wear a top that opens or lifts easily; skip body lotion that morning.' },
  { code: 'ECHO', name: 'Echocardiogram', shows: 'An ultrasound of the heart moving: how well it pumps, how the four valves open and close, the size of each chamber.', time: '45 minutes', prep: 'Eat and take your medicines as usual. You lie on your left side; the gel is warmed.' },
  { code: 'STRESS', name: 'Exercise stress test', shows: 'How the heart copes when it has to work: the ECG and blood pressure while you walk a treadmill that steepens every three minutes.', time: '60 minutes', prep: 'Nothing to eat for 3 hours, no caffeine for 12. Walking shoes. Ask us about beta blockers.' },
  { code: 'S-ECHO', name: 'Stress echocardiogram', shows: 'The echo pictures taken straight after the treadmill, to see whether any wall of the heart lags when it is short of blood.', time: '90 minutes', prep: 'As for the stress test. Bring a list of every medicine, with doses.' },
  { code: 'HOLTER', name: 'Holter monitor', shows: 'Every beat for one or two days of ordinary life, for palpitations, dizzy spells and rhythms that do not show up in the office.', time: '24-48 hours', prep: 'Shower before you come; you cannot get it wet while it is on. Keep a diary of symptoms.' },
  { code: 'EVENT', name: 'Event monitor', shows: 'A small patch worn for up to 30 days that records when you press it, for symptoms that come once a week or less.', time: 'Up to 30 days', prep: 'We fit it in ten minutes and show you how to press it. It mails back in a padded envelope.' },
];

const DAY_PLAN = [
  ['8:40', 'Check in', 'Twenty minutes before your time, at the third-floor desk, with your card and photo ID.'],
  ['8:50', 'ECG and measurements', 'A resting ECG, blood pressure in both arms, height and weight, in a private room.'],
  ['9:00', 'With the cardiologist', 'Forty minutes: your history, an examination, and the ECG read with you, on the screen.'],
  ['9:40', 'A plan, written down', 'Which tests, if any, and why; any change in medicine; when we will speak again.'],
];

const BRING = [
  'Every medicine you take, in its boxes or as a list with doses',
  'Your referral letter, if your doctor gave you one',
  'Any ECGs, scans or blood results from the last two years',
  'A note of your symptoms: when, how long, what you were doing',
  'Someone with you, if you would like a second pair of ears',
];

const REFERRAL = [
  ['Routine referral', 'Seen within 10 working days. Send the letter by e-referral or fax with a recent ECG if you have one.'],
  ['Urgent slot', 'Two held every weekday for suspected angina, new heart failure or syncope. Call the referral line before 2:00.'],
  ['Open-access tests', 'Order an echo or a Holter without a consultation. Report within 48 hours, read by a cardiologist.'],
  ['Letter back', 'A typed letter to you within one working day of every visit, and a call when a result needs action.'],
];

type Doctor = { initials: string; name: string; role: string; focus: string; board: string };

const DOCTORS: Doctor[] = [
  { initials: 'NO', name: 'Dr. Nadia Osei', role: 'Cardiologist, founder', focus: 'Heart failure and valve disease. Runs the echo lab and still scans on Tuesdays.', board: 'Board certified in cardiovascular disease and echocardiography' },
  { initials: 'TL', name: 'Dr. Tomas Lindqvist', role: 'Cardiologist', focus: 'Rhythm: palpitations, atrial fibrillation, fainting. Reads every monitor himself.', board: 'Board certified in cardiovascular disease and electrophysiology' },
  { initials: 'RP', name: 'Dr. Ruth Pemberton', role: 'Cardiologist', focus: 'Prevention: blood pressure, cholesterol and the heart in pregnancy and after it.', board: 'Board certified in cardiovascular disease and lipidology' },
];

const HOURS = [
  ['Monday to Thursday', '7:30-6:00'],
  ['Friday', '7:30-4:00'],
  ['Saturday', 'Monitor fittings, 8:00-11:00'],
];

export default function SteadybeatCardiologyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbf6f3',
        '--ink': '#1c2230',
        '--coral': '#de5b52',
        '--teal': '#1d6b68',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,coral,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Steadybeat</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Cardiology</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550162400">(555) 016-2400</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The whole hero is chart paper; the words sit on a printed card. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2" className={s.heroChart} aria-hidden="true">
            <TabbiedPattern
              pattern={cardiograph}
              palette={CHART}
              fit="grid"
              cellSize={64}
              seed="steadybeat-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroCard}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Cardiology and heart testing, Linden Medical Building</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Your heart, <em>read clearly.</em>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Three cardiologists and a testing lab under one roof. ECGs,
                echocardiograms, stress tests and heart monitors, with every
                result explained to you in plain words, usually the same week.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Request an appointment</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#referrals">For referring doctors</a>
              </div>
            </div>
            <div className={s.readout}>
              <p data-edit="hero.readoutNote" data-edit-max="240" data-edit-multiline className={s.readoutNote}>Lead II, 25 mm/s</p>
              <dl className={s.readoutList}>
                <div>
                  <dt data-edit="hero.term" data-edit-max="28">New patient wait</dt>
                  <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>6 days</dd>
                </div>
                <div>
                  <dt data-edit="hero.term2" data-edit-max="28">Echo report</dt>
                  <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>48 hours</dd>
                </div>
                <div>
                  <dt data-edit="hero.term3" data-edit-max="28">Tests in house</dt>
                  <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>6</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <p data-edit="top.urgent" data-edit-max="240" data-edit-multiline className={s.urgent}>
          Chest pain, fainting or sudden breathlessness now: call 911, not the practice.
        </p>

        {/* ----------------------------------------------------------- TESTS */}
        <section id="tests" className={s.sec} aria-labelledby="tests-h">
          <div className={s.secHead}>
            <p data-edit="tests.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>01 / Tests</p>
            <h2 data-edit="tests.secTitle" data-edit-max="60" id="tests-h" className={s.secTitle}>Every test, explained before you have it</h2>
            <p data-edit="tests.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most people we see need one or two of these, not all six. Your
              cardiologist says which and why, and none of them hurt.
            </p>
          </div>
          <ul className={s.tests}>
            {TESTS.map((t, i) => (
              <li key={t.code} className={s.test}>
                <div className={s.testHead}>
                  <span data-edit={`tests.testCode.${i}`} data-edit-max="60" className={s.testCode}>{t.code}</span>
                  <h3 data-edit={`tests.testName.${i}`} data-edit-max="40" className={s.testName}>{t.name}</h3>
                  <span data-edit={`tests.testTime.${i}`} data-edit-max="60" className={s.testTime}>{t.time}</span>
                </div>
                <div className={s.testBody}>
                  <p data-edit={`tests.testLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.testLabel}>What it shows</p>
                  <p data-edit={`tests.testText.${i}`} data-edit-max="240" data-edit-multiline className={s.testText}>{t.shows}</p>
                </div>
                <div className={s.testBody}>
                  <p data-edit={`tests.testLabel2.${i}`} data-edit-max="240" data-edit-multiline className={s.testLabel}>Before you come</p>
                  <p data-edit={`tests.testText2.${i}`} data-edit-max="240" data-edit-multiline className={s.testText}>{t.prep}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2" className={s.strip} aria-hidden="true">
          <TabbiedPattern
            pattern={cardiograph}
            palette={STRIP}
            fit="grid"
            cellSize={48}
            seed="steadybeat-strip-1"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------- FIRST VISIT */}
        <section id="first-visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="firstVisit.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>02 / First visit</p>
            <h2 data-edit="firstVisit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>Your first appointment, minute by minute</h2>
            <p data-edit="firstVisit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              About an hour in all. Most first visits end with a plan rather than
              a test, and any test you need is booked before you leave.
            </p>
          </div>
          <div className={s.visitGrid}>
            <ol className={s.timeline}>
              {DAY_PLAN.map(([time, title, text], i) => (
                <li key={time} className={s.tick}>
                  <span data-edit={`firstVisit.tickTime.${i}`} data-edit-max="60" className={s.tickTime}>{time}</span>
                  <h3 data-edit={`firstVisit.tickTitle.${i}`} data-edit-max="40" className={s.tickTitle}>{title}</h3>
                  <p data-edit={`firstVisit.tickText.${i}`} data-edit-max="240" data-edit-multiline className={s.tickText}>{text}</p>
                </li>
              ))}
            </ol>
            <div className={s.bring}>
              <h3 data-edit="firstVisit.bringTitle" data-edit-max="40" className={s.bringTitle}>Bring with you</h3>
              <ul className={s.bringList}>
                {BRING.map((b, i) => (
                  <li data-edit={`firstVisit.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
              <p data-edit="firstVisit.bringNote" data-edit-max="240" data-edit-multiline className={s.bringNote}>Parking is free under the building for the length of your visit; take the ticket to the desk.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- REFERRALS */}
        <section id="referrals" className={s.referrals} aria-labelledby="ref-h">
          <div className={s.refInner}>
            <div className={s.refHead}>
              <p data-edit="referrals.secLabelDark" data-edit-max="240" data-edit-multiline className={s.secLabelDark}>03 / Referrals</p>
              <h2 data-edit="referrals.refTitle" data-edit-max="60" id="ref-h" className={s.refTitle}>For referring doctors</h2>
              <p data-edit="referrals.refNote" data-edit-max="240" data-edit-multiline className={s.refNote}>
                We work for the doctor who sent the patient as much as for the
                patient. Everything comes back to you in writing.
              </p>
              <dl className={s.refLines}>
                <div>
                  <dt data-edit="referrals.term" data-edit-max="28">Referral line</dt>
                  <dd data-edit="referrals.body" data-edit-max="200" data-edit-multiline>(555) 016-2410</dd>
                </div>
                <div>
                  <dt data-edit="referrals.term2" data-edit-max="28">Fax</dt>
                  <dd data-edit="referrals.body2" data-edit-max="200" data-edit-multiline>(555) 016-2419</dd>
                </div>
                <div>
                  <dt data-edit="referrals.term3" data-edit-max="28">E-referral</dt>
                  <dd data-edit="referrals.body3" data-edit-max="200" data-edit-multiline>referrals@steadybeat.example</dd>
                </div>
              </dl>
            </div>
            <ul className={s.refList}>
              {REFERRAL.map(([t, d], i) => (
                <li key={t} className={s.refItem}>
                  <h3 data-edit={`referrals.refItemTitle.${i}`} data-edit-max="40" className={s.refItemTitle}>{t}</h3>
                  <p data-edit={`referrals.refItemText.${i}`} data-edit-max="240" data-edit-multiline className={s.refItemText}>{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div data-edit-pattern="top.field2" data-edit-roles="transparent,1,2" className={s.strip} aria-hidden="true">
          <TabbiedPattern
            pattern={cardiograph}
            palette={CHART}
            fit="grid"
            cellSize={48}
            seed="steadybeat-strip-2"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------ PHYSICIANS */}
        <section id="physicians" className={s.sec} aria-labelledby="doc-h">
          <div className={s.secHead}>
            <p data-edit="physicians.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>04 / Physicians</p>
            <h2 data-edit="physicians.secTitle" data-edit-max="60" id="doc-h" className={s.secTitle}>Three cardiologists, one chart</h2>
            <p data-edit="physicians.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              You have a named cardiologist, and the other two read the same
              notes, so a holiday never means starting again.
            </p>
          </div>
          <ul className={s.doctors}>
            {DOCTORS.map((d, i) => (
              <li key={d.name} className={s.doctor}>
                <span className={s.docMono} aria-hidden="true">{d.initials}</span>
                <h3 data-edit={`physicians.docName.${i}`} data-edit-max="40" className={s.docName}>{d.name}</h3>
                <p data-edit={`physicians.docRole.${i}`} data-edit-max="240" data-edit-multiline className={s.docRole}>{d.role}</p>
                <p data-edit={`physicians.docFocus.${i}`} data-edit-max="240" data-edit-multiline className={s.docFocus}>{d.focus}</p>
                <p data-edit={`physicians.docBoard.${i}`} data-edit-max="240" data-edit-multiline className={s.docBoard}>{d.board}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.secTint} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>05 / Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Request an appointment</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The front desk calls back within one working day to offer a time.
                Many insurers need a referral first; we can check yours for you.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>Linden Medical Building, 3rd floor, 220 Alder Avenue</p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550162400">(555) 016-2400</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:frontdesk@steadybeat.example">frontdesk@steadybeat.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="sb-name">Full name</label>
                <input id="sb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="sb-phone">Phone</label>
                <input id="sb-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="sb-email">Email</label>
                <input id="sb-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="sb-reason">Reason for the visit</label>
                <select id="sb-reason" name="reason" defaultValue="new">
                  <option value="new">New patient consultation</option>
                  <option value="test">A test my doctor ordered</option>
                  <option value="follow">Follow-up</option>
                  <option value="second">Second opinion</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="sb-ref">Referring doctor, if any</label>
                <input id="sb-ref" name="referrer" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label6" htmlFor="sb-when">Best time to call</label>
                <select id="sb-when" name="when" defaultValue="any">
                  <option value="am">Morning</option>
                  <option value="pm">Afternoon</option>
                  <option value="any">Any time</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label7" htmlFor="sb-note">Anything we should know</label>
                <textarea id="sb-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send the request</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Please do not use this form for symptoms happening now.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,2" className={s.footStrip} aria-hidden="true">
          <TabbiedPattern
            pattern={cardiograph}
            palette={NIGHT}
            fit="grid"
            cellSize={40}
            seed="steadybeat-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Steadybeat Cardiology</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional cardiology practice. The physicians, prices and address are invented, and nothing here is medical advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
