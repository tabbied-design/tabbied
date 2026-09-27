import { TabbiedPattern } from 'tabbied/react';
import { speckfield, pindot, tulle, dotwash, eclipserings } from 'tabbied/patterns';
import s from './sleepwell-clinic.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Sleepwell Sleep Clinic: Sleep studies and insomnia care, Farrow',
  description:
    'Sleepwell diagnoses and treats insomnia, sleep apnea and restless legs on the third floor of 88 Wellbrook Road, Farrow. Home sleep tests, overnight studies, a six-session CBT program for insomnia and a sleep diary to start tonight.',
};

/* Site colors. The sky is a star field of cream and lavender specks over a
   transparent ground, so the night of the page shows between them; the other
   fields do the same over the surfaces they sit on. */
const NIGHT = '#111a33';
const CREAM = '#f1e9d2';
const LAVENDER = '#9c8ed5';
const TEAL = '#2f6f7e';

const SKY = ['transparent', CREAM, LAVENDER, CREAM, TEAL, CREAM];
const LAB = ['transparent', LAVENDER, CREAM, TEAL, LAVENDER, CREAM];
const VEIL = ['transparent', LAVENDER, TEAL, LAVENDER, CREAM, LAVENDER];
const WASH = ['transparent', NIGHT, TEAL, NIGHT, LAVENDER, NIGHT];
const DESK = ['transparent', CREAM, LAVENDER, TEAL, CREAM, LAVENDER];
const MOONS = [NIGHT, TEAL, LAVENDER, TEAL, CREAM];

const NAV = [
  ['Signs', '#signs'],
  ['Tests', '#tests'],
  ['CBT-I', '#cbti'],
  ['Your night', '#overnight'],
  ['Referrals', '#referrals'],
  ['Sleep diary', '#diary'],
  ['Contact', '#contact'],
];

/* The hypnogram: minutes after 23:00 and the stage entered then
   (0 Awake, 1 REM, 2 N1, 3 N2, 4 N3). The night ends at 480, 07:00. */
const NIGHT_STEPS: [number, number][] = [
  [0, 0], [14, 2], [22, 3], [44, 4], [84, 3], [96, 1], [106, 0], [109, 3],
  [138, 4], [168, 3], [184, 1], [206, 3], [238, 4], [254, 3], [284, 1],
  [311, 2], [316, 0], [320, 3], [366, 1], [398, 3], [418, 2], [424, 3],
  [438, 1], [471, 0],
];
const STAGES = ['Awake', 'REM', 'N1', 'N2', 'N3'];
const HOURS = ['23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'];

const stageY = (stage: number) => stage * 20 + 10;

function hypnogramPath() {
  let d = `M 0 ${stageY(NIGHT_STEPS[0][1])}`;
  NIGHT_STEPS.forEach(([minute, stage], i) => {
    if (i === 0) return;
    d += ` H ${minute} V ${stageY(stage)}`;
  });
  return `${d} H 480`;
}

function remPath() {
  let d = '';
  NIGHT_STEPS.forEach(([minute, stage], i) => {
    if (stage !== 1) return;
    const end = NIGHT_STEPS[i + 1]?.[0] ?? 480;
    d += ` M ${minute} ${stageY(1)} H ${end}`;
  });
  return d.trim();
}

const HERO_FACTS = [
  ['4', 'quiet bedrooms for overnight studies'],
  ['10 days', 'from your study night to your results'],
  ['No referral', 'needed for a first consultation'],
];

const SIGNS = [
  { id: 'sw-sign-snore', text: 'Someone has told you that you snore loudly, or stop breathing for a moment.' },
  { id: 'sw-sign-gasp', text: 'You wake up gasping, choking or with your heart racing.' },
  { id: 'sw-sign-doze', text: 'You nod off in meetings, at the cinema or at red lights.' },
  { id: 'sw-sign-hours', text: 'It takes you more than half an hour to fall asleep, most nights.' },
  { id: 'sw-sign-three', text: 'You wake at 3 or 4 in the morning and lie there until the alarm.' },
  { id: 'sw-sign-legs', text: 'Your legs ache, twitch or crawl in the evening until you move them.' },
  { id: 'sw-sign-head', text: 'You wake with a headache or a dry mouth more mornings than not.' },
  { id: 'sw-sign-weeks', text: 'It has been going on for three months or more.' },
];

type Row = { label: string; home: string; lab: string };

const COMPARE: Row[] = [
  { label: 'What it records', home: 'Breathing, oxygen, pulse and snoring', lab: 'Everything at home, plus brain waves, eye and leg movement' },
  { label: 'Where you sleep', home: 'Your own bed', lab: 'A private room on our third floor' },
  { label: 'Good for', home: 'Suspected sleep apnea, and nothing else complicated', lab: 'Narcolepsy, parasomnias, restless legs, and anything unclear' },
  { label: 'Setting up', home: 'We fit it at 17:00, you take it home in a bag', lab: 'A technician fits 22 sensors, about 40 minutes' },
  { label: 'Results', home: 'A doctor reads it within 7 days', lab: 'A doctor reads it within 10 days' },
  { label: 'Cost before insurance', home: '$240', lab: '$1,150' },
];

type Session = { week: string; name: string; what: string; phase: string };

const SESSIONS: Session[] = [
  { week: 'Week 1', name: 'The diary', what: 'Two weeks of your sleep diary, read together. We work out what your nights actually look like.', phase: 'm1' },
  { week: 'Week 2', name: 'A smaller window', what: 'Time in bed is cut to the time you really sleep. The hardest week, and the one that works.', phase: 'm2' },
  { week: 'Week 3', name: 'Bed is for sleep', what: 'If you are awake after twenty minutes, you get up. No phone, no clock watching.', phase: 'm3' },
  { week: 'Week 4', name: 'The racing mind', what: 'A worry slot at 19:00, and what to do with the thoughts that arrive at 3 in the morning.', phase: 'm4' },
  { week: 'Week 5', name: 'Widening again', what: 'Fifteen minutes back each week you sleep well, until the window fits your life.', phase: 'm5' },
  { week: 'Week 6', name: 'A bad night', what: 'What to do when one comes back, so one bad night does not become a bad month.', phase: 'm6' },
];

const BRING = [
  'Loose pajamas that button at the front',
  'Your own pillow, if it helps',
  'Your regular medicines and a list of them',
  'Clean, dry hair: no oil, gel or spray',
  'A book. The rooms have no television',
  'Breakfast is on us; tell us what you drink',
];

const TIMELINE = [
  { time: '19:30', what: 'Arrive', note: 'Ring the night bell at the Wellbrook Road door. The lift takes you to the third floor.' },
  { time: '20:00', what: 'Settle in', note: 'Your room, your bathroom, a chair for reading. Change when you like.' },
  { time: '20:45', what: 'Sensors', note: 'Twenty-two small sensors on your scalp, face, chest and legs. It does not hurt.' },
  { time: '22:00', what: 'Checks', note: 'Look left, look right, grit your teeth. Two minutes to check the signal.' },
  { time: '22:30', what: 'Lights out', note: 'Sleep when you are ready. A technician watches from the next room all night.' },
  { time: '06:00', what: 'Morning', note: 'We wake you, unless you are already up. Most people sleep better than they expect.' },
  { time: '06:30', what: 'Sensors off', note: 'Five minutes, then a shower to wash out the paste.' },
  { time: '07:15', what: 'Home', note: 'Coffee, toast, and out of the door in time for work.' },
];

const ROUTES = [
  ['On your own', 'Book a first consultation directly. Most plans cover it without a referral.'],
  ['From your doctor', 'Your GP sends a letter; we call you within five working days.'],
  ['From your dentist', 'For mouth guards to treat snoring and mild apnea.'],
  ['Back to us', 'Seen here before? Call the clinic line and skip the paperwork.'],
];

const PRICES = [
  ['First consultation', '45 min', '$180'],
  ['Home sleep test', '1 night', '$240'],
  ['Overnight lab study', '1 night', '$1,150'],
  ['CBT-I program', '6 sessions', '$640'],
  ['Follow-up visit', '20 min', '$85'],
];

const PLANS = ['Farrow Health Mutual', 'Wellbrook Care', 'Northline Assurance', 'Civic Staff Plan', 'Harbor & Vale', 'Medicare'];

const DIARY_STEPS = [
  ['Every morning', 'Fill it in within an hour of getting up, from memory. Not at night: that keeps you awake.'],
  ['Shade the sleep', 'Shade the half hours you think you slept. Guesses are fine; nobody sleeps with a stopwatch.'],
  ['Mark the rest', 'An arrow down when you went to bed, up when you got up. C for coffee, A for alcohol, N for a nap.'],
  ['Two weeks', 'Keep going for fourteen nights, weekends included. The pattern shows in the second week.'],
];

/* One week of a sample diary: half hours from 21:00 to 09:00 (24 slots),
   the slots asleep, the slot to bed and the slot up, and any marks. */
type DiaryDay = { day: string; bed: number; up: number; asleep: [number, number][]; marks: string };

const DIARY: DiaryDay[] = [
  { day: 'Mon', bed: 3, up: 19, asleep: [[5, 11], [13, 18]], marks: 'C' },
  { day: 'Tue', bed: 3, up: 19, asleep: [[4, 18]], marks: '' },
  { day: 'Wed', bed: 4, up: 19, asleep: [[7, 12], [14, 16]], marks: 'C A' },
  { day: 'Thu', bed: 3, up: 19, asleep: [[5, 18]], marks: '' },
  { day: 'Fri', bed: 5, up: 21, asleep: [[6, 20]], marks: 'A' },
  { day: 'Sat', bed: 5, up: 22, asleep: [[6, 13], [14, 21]], marks: 'N' },
  { day: 'Sun', bed: 3, up: 19, asleep: [[6, 10], [12, 17]], marks: 'C' },
];
const SLOTS = Array.from({ length: 24 }, (_, i) => i);
const DIARY_HOURS = ['21', '22', '23', '00', '01', '02', '03', '04', '05', '06', '07', '08'];

const slotClass = (day: DiaryDay, slot: number) => {
  const asleep = day.asleep.some(([from, to]) => slot >= from && slot < to);
  if (asleep) return s.slotSleep;
  if (slot >= day.bed && slot < day.up) return s.slotBed;
  return s.slotOff;
};

const OPENING = [
  ['Clinic, Mon-Fri', '08:30-17:30'],
  ['Night desk, Sun-Thu', '19:30-07:30'],
  ['Saturday', 'Home test returns, 09:00-12:00'],
  ['Sunday day', 'Closed'],
];

export default function SleepwellClinicPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#111a33',
        '--cream': '#f1e9d2',
        '--lavender': '#9c8ed5',
        '--teal': '#2f6f7e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,cream,lavender,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,300..700;1,300..700&family=Gantari:ital,wght@0,300..700;1,400&family=Azeret+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMoon} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Sleepwell</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Sleep Clinic</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550148820">(555) 014-8820</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The night sky over Farrow: a star field, a crescent moon, the
            rooftops along the bottom with a few windows still lit, and the
            night itself drawn as a hypnogram across the sky. */}
        <section className={s.hero} aria-labelledby="sw-hero-h">
          <div data-edit-pattern="swHero.field" data-edit-roles="transparent,1,2,1,3,1" className={s.sky} aria-hidden="true">
            <TabbiedPattern
              pattern={speckfield}
              palette={SKY}
              options={{ frequency: 0.3 }}
              fit="grid"
              cellSize={31}
              seed="sleepwell-sky"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <span className={s.crescent} aria-hidden="true" />

          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p className={s.kicker}>
                <span data-edit="swHero.kickerStage" data-edit-max="60" className={s.kickerStage}>Awake</span>
                <span data-edit="swHero.kickerTime" data-edit-max="60" className={s.kickerTime}>23:00</span>
                <span data-edit="swHero.text" data-edit-max="60">Third floor, 88 Wellbrook Road, Farrow</span>
              </p>
              <h1 data-edit="swHero.title" data-edit-max="70" id="sw-hero-h" className={s.title}>Sleep through to morning.</h1>
              <p data-edit="swHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Sleepwell finds out what is keeping you awake, and treats it:
                insomnia, sleep apnea, restless legs, and the nights nobody
                has a name for yet. Home tests, overnight studies in four quiet
                rooms, and a six-week course that fixes most insomnia without a
                pill.
              </p>
              <div className={s.actions}>
                <a data-edit="swHero.btn" data-edit-max="28" className={s.btn} href="#contact">Book a consultation</a>
                <a data-edit="swHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#signs">Do I need a study?</a>
              </div>
            </div>

            <figure className={s.hypno}>
              <figcaption className={s.hypnoHead}>
                <span data-edit="swHero.hypnoTitle" data-edit-max="60" className={s.hypnoTitle}>A good night, as the lab draws it</span>
                <span data-edit="swHero.hypnoNote" data-edit-max="60" className={s.hypnoNote}>Five trips down to deep sleep; REM grows longer toward morning.</span>
              </figcaption>
              <div className={s.hypnoChart}>
                <ol className={s.hypnoStages}>
                  {STAGES.map((stage, i) => (
                    <li data-edit={`swHero.item.${i}`} data-edit-max="80" key={stage}>{stage}</li>
                  ))}
                </ol>
                <div className={s.hypnoPlot}>
                  <svg className={s.hypnoSvg} viewBox="0 0 480 100" preserveAspectRatio="none" aria-hidden="true">
                    <path className={s.hypnoGrid} d="M 0 10 H 480 M 0 30 H 480 M 0 50 H 480 M 0 70 H 480 M 0 90 H 480" />
                    <path className={s.hypnoLine} d={hypnogramPath()} />
                    <path className={s.hypnoRem} d={remPath()} />
                  </svg>
                </div>
                <ol className={s.hypnoHours}>
                  {HOURS.map((hour, i) => (
                    <li data-edit={`swHero.item2.${i}`} data-edit-max="80" key={hour}>{hour}</li>
                  ))}
                </ol>
              </div>
            </figure>

            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([figure, text], i) => (
                <div key={figure}>
                  <dt data-edit={`swHero.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`swHero.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.roofs}>
            <Artwork
              slug="sleepwell-clinic-rooftops"
              alt="The rooftops of Farrow at night: pitched roofs, chimneys and dormers, with a few windows still lit"
              fit="cover"
              inks={{
                red: 'color-mix(in oklab, var(--lavender) 48%, var(--night))',
                blue: 'color-mix(in oklab, var(--teal) 78%, var(--night))',
                yellow: 'var(--cream)',
                black: 'color-mix(in oklab, var(--teal) 30%, var(--night))',
              }}
            />
          </div>
        </section>

        {/* ----------------------------------------------------------- SIGNS */}
        <section id="signs" className={`${s.sec} ${s.laneN1} ${s.fromAwake}`} aria-labelledby="sw-signs-h">
          <div className={s.rail}>
            <p className={s.tag}>
              <span className={`${s.moon} ${s.m1}`} aria-hidden="true" />
              <span data-edit="signs.tagStage" data-edit-max="60" className={s.tagStage}>N1</span>
              <span data-edit="signs.tagTime" data-edit-max="60" className={s.tagTime}>23:14</span>
            </p>
          </div>
          <div className={s.body}>
            <div className={s.head}>
              <p data-edit="signs.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Drifting off</p>
              <h2 data-edit="signs.title" data-edit-max="60" id="sw-signs-h">Do you need a sleep study?</h2>
              <p data-edit="signs.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Tick what sounds like you. Nothing is sent anywhere: it is a
                list to bring to the phone call, not a diagnosis.
              </p>
            </div>

            <div className={s.signsGrid}>
              <form className={s.checklist} action="#">
                <fieldset>
                  <legend data-edit="signs.srOnly" className={s.srOnly}>Signs you might need a sleep study</legend>
                  {SIGNS.map((sign, i) => (
                    <div key={sign.id} className={s.check}>
                      <input id={sign.id} type="checkbox" name="signs" value={sign.id} />
                      <label data-edit={`signs.label.${i}`} htmlFor={sign.id}>{sign.text}</label>
                    </div>
                  ))}
                </fieldset>
                <p className={s.tally} aria-live="polite">
                  <span data-edit="signs.tallyLabel" data-edit-max="60" className={s.tallyLabel}>Ticked</span>
                </p>
              </form>

              <aside className={s.verdicts} aria-labelledby="sw-verdict-h">
                <h3 data-edit="swVerdict.verdictTitle" data-edit-max="40" id="sw-verdict-h" className={s.verdictTitle}>What it usually means</h3>
                <dl className={s.verdictList}>
                  <div>
                    <dt data-edit="swVerdict.term" data-edit-max="28">Snoring, gasping, dozing</dt>
                    <dd data-edit="swVerdict.body" data-edit-max="200" data-edit-multiline>The shape of sleep apnea. A home test is often enough to confirm it, and it is very treatable.</dd>
                  </div>
                  <div>
                    <dt data-edit="swVerdict.term2" data-edit-max="28">Slow to sleep, awake at 4</dt>
                    <dd data-edit="swVerdict.body2" data-edit-max="200" data-edit-multiline>The shape of insomnia. You may not need a study at all: start with the diary and the CBT-I program.</dd>
                  </div>
                  <div>
                    <dt data-edit="swVerdict.term3" data-edit-max="28">Restless legs</dt>
                    <dd data-edit="swVerdict.body3" data-edit-max="200" data-edit-multiline>Often a blood test and a conversation first; sometimes a night in the lab.</dd>
                  </div>
                  <div>
                    <dt data-edit="swVerdict.term4" data-edit-max="28">Three months or more</dt>
                    <dd data-edit="swVerdict.body4" data-edit-max="200" data-edit-multiline>That is the line doctors use. Past it, call us rather than waiting for it to pass.</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TESTS */}
        <section id="tests" className={`${s.sec} ${s.laneN2} ${s.fromN1}`} aria-labelledby="sw-tests-h">
          <div className={s.rail}>
            <p className={s.tag}>
              <span className={`${s.moon} ${s.m2}`} aria-hidden="true" />
              <span data-edit="tests.tagStage" data-edit-max="60" className={s.tagStage}>N2</span>
              <span data-edit="tests.tagTime" data-edit-max="60" className={s.tagTime}>23:22</span>
            </p>
          </div>
          <div className={s.body}>
            <div className={s.head}>
              <p data-edit="tests.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Light sleep</p>
              <h2 data-edit="tests.title" data-edit-max="60" id="sw-tests-h">A home sleep test, or a night in the lab</h2>
              <p data-edit="tests.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Your consultant decides with you which one answers the
                question. Most people with suspected apnea start at home.
              </p>
            </div>

            <div className={s.compare}>
              <div className={s.compareHeads} aria-hidden="true">
                <p className={s.compareHome}>
                  <span data-edit="tests.compareKind" data-edit-max="60" className={s.compareKind}>At home</span>
                  <span data-edit="tests.compareName" data-edit-max="60" className={s.compareName}>Home sleep test</span>
                </p>
                <div className={s.compareLab}>
                  <div data-edit-pattern="tests.field" data-edit-roles="transparent,2,1,3,2,1" className={s.labField}>
                    <TabbiedPattern
                      pattern={pindot}
                      palette={LAB}
                      options={{ frequency: 0.8 }}
                      fit="grid"
                      cellSize={56}
                      seed="sleepwell-lab"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <p className={s.compareLabText}>
                    <span data-edit="tests.compareKind2" data-edit-max="60" className={s.compareKind}>On the third floor</span>
                    <span data-edit="tests.compareName2" data-edit-max="60" className={s.compareName}>Night in the lab</span>
                  </p>
                </div>
              </div>
              <table className={s.compareTable}>
                <caption data-edit="tests.srOnly" className={s.srOnly}>A home sleep test compared with an overnight study in the lab</caption>
                <thead className={s.srOnly}>
                  <tr>
                    <th data-edit="tests.heading" scope="col">Question</th>
                    <th data-edit="tests.heading2" scope="col">Home sleep test</th>
                    <th data-edit="tests.heading3" scope="col">Night in the lab</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr key={row.label}>
                      <th data-edit={`tests.heading4.${i}`} scope="row">{row.label}</th>
                      <td data-edit={`tests.cell.${i}`}>{row.home}</td>
                      <td data-edit={`tests.cell2.${i}`}>{row.lab}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ CBTI */}
        <section id="cbti" className={`${s.sec} ${s.laneN3} ${s.fromN2}`} aria-labelledby="sw-cbti-h">
          <div className={s.rail}>
            <p className={s.tag}>
              <span className={`${s.moon} ${s.m3}`} aria-hidden="true" />
              <span data-edit="cbti.tagStage" data-edit-max="60" className={s.tagStage}>N3</span>
              <span data-edit="cbti.tagTime" data-edit-max="60" className={s.tagTime}>23:44</span>
            </p>
          </div>
          <div className={s.body}>
            <div className={s.head}>
              <p data-edit="cbti.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Deep sleep</p>
              <h2 data-edit="cbti.title" data-edit-max="60" id="sw-cbti-h">CBT for insomnia: six sessions</h2>
              <p data-edit="cbti.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Cognitive behavioral therapy for insomnia is the first
                treatment doctors recommend, ahead of sleeping pills. One
                session a week with Dr. Imogen Hale or Sam Okafor, in the
                clinic or by video.
              </p>
            </div>

            <ol className={s.sessions}>
              {SESSIONS.map((session, i) => (
                <li key={session.week} className={s.session}>
                  <span className={`${s.moon} ${s.moonBig} ${s[session.phase]}`} aria-hidden="true" />
                  <p data-edit={`cbti.sessionWeek.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionWeek}>{session.week}</p>
                  <h3 data-edit={`cbti.sessionName.${i}`} data-edit-max="40" className={s.sessionName}>{session.name}</h3>
                  <p data-edit={`cbti.sessionWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionWhat}>{session.what}</p>
                </li>
              ))}
            </ol>

            <aside className={s.course} aria-labelledby="sw-course-h">
              <div data-edit-pattern="swCourse.field" data-edit-roles="transparent,2,3,2,1,2" className={s.veil} aria-hidden="true">
                <TabbiedPattern
                  pattern={tulle}
                  palette={VEIL}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={34}
                  seed="sleepwell-veil"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.courseText}>
                <h3 data-edit="swCourse.courseTitle" data-edit-max="40" id="sw-course-h" className={s.courseTitle}>The whole course, $640</h3>
                <p data-edit="swCourse.body" data-edit-max="240" data-edit-multiline>
                  Six 50-minute sessions, the diary, and a follow-up call three
                  months later. Covered in full by four of the six plans we
                  accept. New groups start on the first Monday of each month.
                </p>
              </div>
              <a data-edit="swCourse.btn" data-edit-max="28" className={s.btn} href="#contact">Ask about the next group</a>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------- OVERNIGHT */}
        <section id="overnight" className={`${s.sec} ${s.laneRem} ${s.fromN3}`} aria-labelledby="sw-night-h">
          <div className={s.rail}>
            <p className={s.tag}>
              <span className={`${s.moon} ${s.m4}`} aria-hidden="true" />
              <span data-edit="overnight.tagStage" data-edit-max="60" className={s.tagStage}>REM</span>
              <span data-edit="overnight.tagTime" data-edit-max="60" className={s.tagTime}>00:36</span>
            </p>
          </div>
          <div className={s.body}>
            <div className={s.head}>
              <p data-edit="overnight.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Dreaming</p>
              <h2 data-edit="overnight.title" data-edit-max="60" id="sw-night-h">Your overnight study, hour by hour</h2>
              <p data-edit="overnight.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Studies run Sunday to Thursday night. The rooms are carpeted,
                dark and warm, with blackout blinds and a real bed, not a
                hospital one.
              </p>
            </div>

            <div className={s.nightGrid}>
              <div className={s.bring}>
                <h3 data-edit="overnight.subTitle" data-edit-max="40" className={s.subTitle}>What to bring</h3>
                <ul className={s.bringList}>
                  {BRING.map((item, i) => (
                    <li data-edit={`overnight.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <p data-edit="overnight.small" data-edit-max="240" data-edit-multiline className={s.small}>
                  Do not nap on the day, and skip coffee after noon. Take your
                  medicines as usual unless we tell you otherwise.
                </p>
              </div>

              <ol className={s.timeline}>
                {TIMELINE.map((step, i) => (
                  <li key={step.time}>
                    <p data-edit={`overnight.stepTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stepTime}>{step.time}</p>
                    <div>
                      <h3 data-edit={`overnight.stepWhat.${i}`} data-edit-max="40" className={s.stepWhat}>{step.what}</h3>
                      <p data-edit={`overnight.stepNote.${i}`} data-edit-max="240" data-edit-multiline className={s.stepNote}>{step.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- REFERRALS */}
        <section id="referrals" className={`${s.sec} ${s.laneN2} ${s.fromRem}`} aria-labelledby="sw-ref-h">
          <div className={s.rail}>
            <p className={s.tag}>
              <span className={`${s.moon} ${s.m5}`} aria-hidden="true" />
              <span data-edit="referrals.tagStage" data-edit-max="60" className={s.tagStage}>N2</span>
              <span data-edit="referrals.tagTime" data-edit-max="60" className={s.tagTime}>01:49</span>
            </p>
          </div>
          <div className={s.body}>
            <div className={s.head}>
              <p data-edit="referrals.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Back to light sleep</p>
              <h2 data-edit="referrals.title" data-edit-max="60" id="sw-ref-h">Referrals and insurance</h2>
              <p data-edit="referrals.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                You do not need a referral to see us. If you have one, bring
                it: some plans pay more with one.
              </p>
            </div>

            <div className={s.refGrid}>
              <dl className={s.routes}>
                {ROUTES.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`referrals.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`referrals.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>

              <div className={s.fees}>
                <table className={s.feeTable}>
                  <caption data-edit="referrals.feeCaption" className={s.feeCaption}>Fees before insurance</caption>
                  <thead>
                    <tr>
                      <th data-edit="referrals.heading" scope="col">Service</th>
                      <th data-edit="referrals.heading2" scope="col">Length</th>
                      <th data-edit="referrals.num" scope="col" className={s.num}>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICES.map(([service, length, fee], i) => (
                      <tr key={service}>
                        <th data-edit={`referrals.heading3.${i}`} scope="row">{service}</th>
                        <td data-edit={`referrals.cell.${i}`}>{length}</td>
                        <td data-edit={`referrals.num2.${i}`} className={s.num}>{fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p data-edit="referrals.plansLabel" data-edit-max="240" data-edit-multiline className={s.plansLabel}>Plans we bill directly</p>
                <ul className={s.plans}>
                  {PLANS.map((plan, i) => (
                    <li data-edit={`referrals.item.${i}`} data-edit-max="80" key={plan}>{plan}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- DIARY */}
        <section id="diary" className={`${s.sec} ${s.laneRem} ${s.fromN2}`} aria-labelledby="sw-diary-h">
          <div className={s.rail}>
            <p className={s.tag}>
              <span className={`${s.moon} ${s.m6}`} aria-hidden="true" />
              <span data-edit="diary.tagStage" data-edit-max="60" className={s.tagStage}>REM</span>
              <span data-edit="diary.tagTime" data-edit-max="60" className={s.tagTime}>06:18</span>
            </p>
          </div>
          <div className={s.body}>
            <div className={s.head}>
              <p data-edit="diary.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The long dream before waking</p>
              <h2 data-edit="diary.title" data-edit-max="60" id="sw-diary-h">The sleep diary</h2>
              <p data-edit="diary.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Everything we do starts with two weeks of it. Print the sheet,
                keep it by the kettle, and fill it in with your first cup.
              </p>
            </div>

            <div className={s.diaryGrid}>
              <div className={s.clockWrap}>
                <div data-edit-pattern="diary.field" data-edit-roles="transparent,0,3,0,2,0" className={s.wash} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dotwash}
                    palette={WASH}
                    options={{ frequency: 0.7 }}
                    fit="grid"
                    cellSize={40}
                    seed="sleepwell-wash"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="sleepwell-clinic-clock"
                  alt="A twin-bell wind-up alarm clock"
                  inks={['var(--on-cream)']}
                  className={s.clock}
                />
                <p data-edit="diary.clockNote" data-edit-max="240" data-edit-multiline className={s.clockNote}>Same time up, every morning. Weekends too.</p>
              </div>

              <div className={s.diaryText}>
                <ol className={s.diarySteps}>
                  {DIARY_STEPS.map(([term, text], i) => (
                    <li key={term}>
                      <h3 data-edit={`diary.title2.${i}`} data-edit-max="40">{term}</h3>
                      <p data-edit={`diary.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                    </li>
                  ))}
                </ol>

                <figure className={s.sheet}>
                  <figcaption data-edit="diary.sheetCaption" data-edit-max="120" data-edit-multiline className={s.sheetCaption}>A week from a real-looking diary, 21:00 to 09:00</figcaption>
                  <div className={s.sheetScroll}>
                    <div className={s.sheetGrid}>
                      <span className={s.sheetCorner} aria-hidden="true" />
                      {DIARY_HOURS.map((hour, i) => (
                        <span data-edit={`diary.sheetHour.${i}`} data-edit-max="60" key={hour} className={s.sheetHour}>{hour}</span>
                      ))}
                      <span data-edit="diary.sheetMarkHead" data-edit-max="60" className={s.sheetMarkHead}>Marks</span>
                      {DIARY.map((day, i) => (
                        <div key={day.day} className={s.sheetRow}>
                          <span data-edit={`diary.sheetDay.${i}`} data-edit-max="60" className={s.sheetDay}>{day.day}</span>
                          <span className={s.sheetSlots} aria-hidden="true">
                            {SLOTS.map((slot) => (
                              <span
                                key={slot}
                                className={`${s.slot} ${slotClass(day, slot)} ${slot === day.bed ? s.slotIn : ''} ${slot === day.up - 1 ? s.slotOut : ''}`}
                              />
                            ))}
                          </span>
                          <span data-edit={`diary.sheetMarks.${i}`} data-edit-max="60" className={s.sheetMarks}>{day.marks}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className={s.sheetKey}>
                    <span data-edit="diary.keySleep" data-edit-max="60" className={s.keySleep}>Asleep</span>
                    <span data-edit="diary.keyBed" data-edit-max="60" className={s.keyBed}>In bed, awake</span>
                    <span data-edit="diary.text" data-edit-max="60">C coffee, A alcohol, N nap</span>
                  </p>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={`${s.sec} ${s.laneAwake} ${s.fromRem}`} aria-labelledby="sw-contact-h">
          <div className={s.rail}>
            <p className={s.tag}>
              <span className={`${s.moon} ${s.m7}`} aria-hidden="true" />
              <span data-edit="contact.tagStage" data-edit-max="60" className={s.tagStage}>Awake</span>
              <span data-edit="contact.tagTime" data-edit-max="60" className={s.tagTime}>06:51</span>
            </p>
          </div>
          <div className={s.body}>
            <div className={s.head}>
              <p data-edit="contact.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Good morning</p>
              <h2 data-edit="contact.title" data-edit-max="60" id="sw-contact-h">Book a first consultation</h2>
              <p data-edit="contact.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Leave your details and a good time to call. A nurse rings you
                back within two working days to talk it through.
              </p>
            </div>

            <div className={s.contactGrid}>
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
                  <label data-edit="contact.label4" htmlFor="sw-reason">Mostly about</label>
                  <select id="sw-reason" name="reason" defaultValue="insomnia">
                    <option value="insomnia">Trouble sleeping</option>
                    <option value="snoring">Snoring or stopped breathing</option>
                    <option value="sleepy">Sleepy in the day</option>
                    <option value="legs">Restless legs</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="contact.label5" htmlFor="sw-when">Best time to call</label>
                  <select id="sw-when" name="when" defaultValue="morning">
                    <option value="morning">Morning, 08:30-12:00</option>
                    <option value="afternoon">Afternoon, 12:00-17:30</option>
                    <option value="evening">Evening, the night desk, 19:30-21:00</option>
                  </select>
                </div>
                <button data-edit="contact.btn" data-edit-max="24" className={s.btn} type="submit">Request a call back</button>
              </form>

              <div className={s.deskCard}>
                <div data-edit-pattern="contact.field" data-edit-roles="transparent,1,2,3,1,2" className={s.deskSky} aria-hidden="true">
                  <TabbiedPattern
                    pattern={speckfield}
                    palette={DESK}
                    options={{ frequency: 0.5 }}
                    fit="grid"
                    cellSize={24}
                    seed="sleepwell-desk"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <span className={s.deskMoon} aria-hidden="true" />
                <div className={s.deskText}>
                  <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>Third floor, 88 Wellbrook Road, Farrow</p>
                  <p data-edit="contact.small" data-edit-max="240" data-edit-multiline className={s.small}>
                    Above the Wellbrook pharmacy, lift from the side door. Two
                    minutes from Farrow Central on foot; patient parking in the
                    Mill Lane garage, validated at the desk.
                  </p>
                  <dl className={s.opening}>
                    {OPENING.map(([when, hours], i) => (
                      <div key={when}>
                        <dt data-edit={`contact.term.${i}`} data-edit-max="28">{when}</dt>
                        <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{hours}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className={s.contactLine}>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550148820">(555) 014-8820</a>
                  </p>
                  <p className={s.contactLine}>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:rest@sleepwell.example">rest@sleepwell.example</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="0,3,2,3,1" className={s.footMoons} aria-hidden="true">
          <TabbiedPattern
            pattern={eclipserings}
            palette={MOONS}
            fit="grid"
            cellSize={60}
            seed="sleepwell-moons"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Sleepwell Sleep Clinic</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional sleep clinic. The doctors, plans, prices and times are invented, and nothing here is medical advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The rooftops and the alarm clock are generated images, drawn in the page's own colors.</p>
        </div>
      </footer>
    </div>
  );
}
