import { TabbiedPattern } from 'tabbied/react';
import { cendal, northstar } from 'tabbied/patterns';
import s from './pointe-and-pulse.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Pointe & Pulse: Dance school, Alder Street',
  description:
    'Ballet, jazz, hip hop and contemporary classes for ages 2 to adult. The weekly timetable, the teachers, the winter recital and a free trial class.',
};

/* Site colors. The sashes in the two hero panels are blush and paper on
   the rose, rose and blush on the violet; the recital stars are blush,
   rose and violet on ink. */
const PAPER = '#F7F1EE';
const ROSE = '#D6456B';
const VIOLET = '#6B5BD1';
const BLUSH = '#EDE3E6';

const SASH_ROSE = ['transparent', BLUSH, PAPER, VIOLET];
const SASH_VIOLET = ['transparent', ROSE, BLUSH, PAPER];
const STARS = ['transparent', BLUSH, ROSE, VIOLET, BLUSH];
const SASH_BLUSH = ['transparent', PAPER, ROSE, VIOLET];

const NAV = [
  ['Timetable', '#timetable'],
  ['Teachers', '#teachers'],
  ['Recital', '#recital'],
  ['Fees', '#fees'],
  ['Free trial', '#trial'],
];

type Style = 'ballet' | 'jazz' | 'hiphop' | 'contemporary';

const STYLES: { id: Style; name: string; text: string; wear: string }[] = [
  {
    id: 'ballet',
    name: 'Ballet',
    text: 'Graded classes from pre-primary to Grade 8, with exams in spring for those who want them. Pointe work from twelve, when your teacher says your ankles are ready.',
    wear: 'Leotard, pink tights, ballet shoes, hair in a bun',
  },
  {
    id: 'jazz',
    name: 'Jazz',
    text: 'Kicks, turns, leaps and a lot of shoulders, to show tunes and pop. Where most of our dancers learn to perform with a grin.',
    wear: 'Leggings or shorts, a fitted top, jazz shoes',
  },
  {
    id: 'hiphop',
    name: 'Hip hop',
    text: 'Grooves, footwork and freestyle, then choreography built one eight-count at a time. The Crew performs at events all year.',
    wear: 'Anything loose, clean sneakers you only wear indoors',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    text: 'Floor work, release and improvisation, built on a ballet base. For juniors from eight and for anyone who wants to move bigger.',
    wear: 'Leggings, a fitted top, bare feet',
  },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIMES = ['9:00', '10:00', '11:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

type Klass = { day: string; time: string; style: Style; name: string; ages: string; len: string };

const CLASSES: Klass[] = [
  { day: 'Monday', time: '16:00', style: 'ballet', name: 'Pre-primary ballet', ages: '5-6', len: '45 min' },
  { day: 'Monday', time: '17:00', style: 'jazz', name: 'Junior jazz', ages: '7-10', len: '60 min' },
  { day: 'Monday', time: '18:00', style: 'ballet', name: 'Grade 3 ballet', ages: '10-12', len: '60 min' },
  { day: 'Monday', time: '19:00', style: 'contemporary', name: 'Senior contemporary', ages: '14-18', len: '90 min' },
  { day: 'Monday', time: '20:00', style: 'hiphop', name: 'Adult hip hop', ages: 'Adults', len: '60 min' },
  { day: 'Tuesday', time: '10:00', style: 'ballet', name: 'Tiny toes', ages: '2-3, with a grown-up', len: '30 min' },
  { day: 'Tuesday', time: '16:00', style: 'hiphop', name: 'Kids hip hop', ages: '6-9', len: '45 min' },
  { day: 'Tuesday', time: '17:00', style: 'ballet', name: 'Grade 1 ballet', ages: '7-8', len: '45 min' },
  { day: 'Tuesday', time: '18:00', style: 'jazz', name: 'Teen jazz', ages: '13-17', len: '60 min' },
  { day: 'Tuesday', time: '19:00', style: 'ballet', name: 'Adult ballet', ages: 'Adults', len: '60 min' },
  { day: 'Wednesday', time: '10:00', style: 'ballet', name: 'Adult barre', ages: 'Adults', len: '60 min' },
  { day: 'Wednesday', time: '16:00', style: 'contemporary', name: 'Junior contemporary', ages: '8-11', len: '60 min' },
  { day: 'Wednesday', time: '17:00', style: 'ballet', name: 'Grade 5 ballet', ages: '12-14', len: '75 min' },
  { day: 'Wednesday', time: '18:00', style: 'ballet', name: 'Pointe', ages: '12 and up', len: '45 min' },
  { day: 'Wednesday', time: '19:00', style: 'hiphop', name: 'Teen hip hop', ages: '12-17', len: '60 min' },
  { day: 'Thursday', time: '10:00', style: 'ballet', name: 'Tiny toes', ages: '2-3, with a grown-up', len: '30 min' },
  { day: 'Thursday', time: '16:00', style: 'jazz', name: 'Mini jazz', ages: '4-6', len: '45 min' },
  { day: 'Thursday', time: '17:00', style: 'hiphop', name: 'Junior hip hop', ages: '9-12', len: '60 min' },
  { day: 'Thursday', time: '18:00', style: 'contemporary', name: 'Teen contemporary', ages: '13-17', len: '60 min' },
  { day: 'Thursday', time: '19:00', style: 'jazz', name: 'Adult jazz', ages: 'Adults', len: '60 min' },
  { day: 'Friday', time: '16:00', style: 'ballet', name: 'Primary ballet', ages: '6-7', len: '45 min' },
  { day: 'Friday', time: '17:00', style: 'hiphop', name: 'The Crew', ages: '12-18, audition', len: '90 min' },
  { day: 'Friday', time: '19:00', style: 'contemporary', name: 'Adult contemporary', ages: 'Adults', len: '60 min' },
  { day: 'Saturday', time: '9:00', style: 'ballet', name: 'Pre-primary ballet', ages: '4-5', len: '45 min' },
  { day: 'Saturday', time: '10:00', style: 'hiphop', name: 'Kids hip hop', ages: '6-9', len: '45 min' },
  { day: 'Saturday', time: '11:00', style: 'contemporary', name: 'Junior contemporary', ages: '8-11', len: '60 min' },
];

const TEACHERS = [
  {
    initials: 'MO',
    name: 'Margit Olsen',
    role: 'Principal, ballet and pointe',
    bio: 'Nine seasons with a touring ballet company, then twenty years teaching. Registered with the Royal Academy of Dance.',
    style: 'ballet' as Style,
  },
  {
    initials: 'DR',
    name: 'Dante Reyes',
    role: 'Hip hop, the Crew',
    bio: 'Battled his way through the regional circuit, choreographs for local artists, and runs the Friday Crew.',
    style: 'hiphop' as Style,
  },
  {
    initials: 'IC',
    name: 'Imani Clarke',
    role: 'Contemporary',
    bio: 'Trained at a conservatoire in contemporary and release technique. Makes a new piece for the seniors every spring.',
    style: 'contemporary' as Style,
  },
  {
    initials: 'TL',
    name: 'Theo Laurent',
    role: 'Jazz and adult classes',
    bio: 'Eight years in touring musicals. Teaches jazz to minis and adults alike, with the same number of jazz hands.',
    style: 'jazz' as Style,
  },
];

const RECITAL_FACTS = [
  ['Shows', '14:00 and 18:30'],
  ['Tickets', '$14, under 12s $9'],
  ['Dress rehearsal', 'Friday 12 December, 17:00-20:00'],
  ['Costumes', '$35 a dance, yours to keep'],
];

const FEES = [
  ['30 or 45 minute class', '$120 a term'],
  ['60 minute class', '$150 a term'],
  ['75 or 90 minute class', '$190 a term'],
  ['Teen unlimited, ages 12-18', '$420 a term'],
  ['Adult drop-in, any class', '$16'],
  ['Adult ten-class card', '$140'],
];

const FEE_NOTES = [
  'Terms run twelve weeks. Autumn term: 8 September to 13 December.',
  'A second class, or a brother or sister, is 10% off.',
  'Registration is $25 a year per dancer, including insurance.',
];

export default function PointeAndPulsePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f7f1ee',
        '--ink': '#1e1a22',
        '--rose': '#d6456b',
        '--violet': '#6b5bd1',
        '--gray': '#978e97',
        '--blush': '#ede3e6',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,rose,violet,gray,blush"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Prata&family=Be+Vietnam+Pro:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandA" data-edit-max="60" className={s.brandA}>Pointe</span>
          <span data-edit="bar.brandAmp" data-edit-max="60" className={s.brandAmp}>&amp;</span>
          <span data-edit="bar.brandB" data-edit-max="60" className={s.brandB}>Pulse</span>
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
        {/* ------------------------------------------------------------ HERO
            Two panels, the ballet dancer in an arch of rose and the hip
            hop dancer in a block of violet, with the words between. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.panelBallet}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,0,3" className={s.panelField} aria-hidden="true">
              <TabbiedPattern
                pattern={cendal}
                palette={SASH_ROSE}
                options={{ frequency: 0.45 }}
                fit="grid"
                cellSize={84}
                seed="pointe-sash"
                redrawInterval={8500}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="pointe-and-pulse-ballet"
              alt="A ballet dancer in arabesque"
              inks={['var(--ink)', 'var(--paper)']}
              className={s.ballet}
            />
          </div>

          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Dance school, 22 Alder Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              From first position
              <br />
              <em>to freestyle.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Ballet, jazz, hip hop and contemporary for dancers from two to
              adult, in two sprung-floor studios. Your first class is free.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#trial">Book a free trial</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#timetable">See the timetable</a>
            </div>
            <p data-edit="hero.term" data-edit-max="240" data-edit-multiline className={s.term}>Autumn term runs 8 September to 13 December.</p>
          </div>

          <div className={s.panelPulse}>
            <div data-edit-pattern="hero.field2" data-edit-roles="transparent,2,5,0" className={s.panelField} aria-hidden="true">
              <TabbiedPattern
                pattern={cendal}
                palette={SASH_VIOLET}
                options={{ frequency: 0.45 }}
                fit="grid"
                cellSize={84}
                seed="pulse-sash"
                redrawInterval={7500}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="pointe-and-pulse-hiphop"
              alt="A hip hop dancer mid-jump"
              inks={['var(--ink)', 'var(--blush)']}
              className={s.hiphop}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- TIMETABLE
            Days across, times down, each class colored by its style. */}
        <section id="timetable" className={s.timetable} aria-labelledby="timetable-h">
          <div className={s.secHead}>
            <h2 data-edit="timetable.title" data-edit-max="60" id="timetable-h">The week, class by class</h2>
            <p data-edit="timetable.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Studio 1 unless marked. Ages are a guide: we move dancers up when
              they are ready, not on their birthday.
            </p>
          </div>

          <ul className={s.legend} aria-label="Styles">
            {STYLES.map((st, i) => (
              <li key={st.id} data-style={st.id}>
                <span className={s.legendChip} aria-hidden="true" />
                <span data-edit={`timetable.text.${i}`} data-edit-max="60">{st.name}</span>
              </li>
            ))}
          </ul>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <caption data-edit="timetable.srOnly" className={s.srOnly}>Weekly class timetable, autumn term</caption>
              <thead>
                <tr>
                  <th scope="col" className={s.corner}>
                    <span data-edit="timetable.srOnly2" data-edit-max="60" className={s.srOnly}>Time</span>
                  </th>
                  {DAYS.map((day, i) => (
                    <th data-edit={`timetable.heading.${i}`} key={day} scope="col">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map((time, i) => (
                  <tr key={time} className={time === '16:00' ? s.afterSchool : undefined}>
                    <th data-edit={`timetable.heading2.${i}`} scope="row">{time}</th>
                    {DAYS.map((day, i2) => {
                      const c = CLASSES.find((k) => k.day === day && k.time === time);
                      return (
                        <td key={day}>
                          {c ? (
                            <div className={s.cls} data-style={c.style}>
                              <strong data-edit={`timetable.clsName.${i}.${i2}`} className={s.clsName}>{c.name}</strong>
                              <span data-edit={`timetable.clsAges.${i}.${i2}`} data-edit-max="60" className={s.clsAges}>{c.ages}</span>
                              <span data-edit={`timetable.clsLen.${i}.${i2}`} data-edit-max="60" className={s.clsLen}>{c.len}</span>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="timetable.swipe" data-edit-max="240" data-edit-multiline className={s.swipe}>Swipe the timetable sideways to see the whole week.</p>

          <ul className={s.styles}>
            {STYLES.map((st, i) => (
              <li key={st.id} className={s.style} data-style={st.id}>
                <h3 data-edit={`timetable.title2.${i}`} data-edit-max="40">{st.name}</h3>
                <p data-edit={`timetable.body.${i}`} data-edit-max="240" data-edit-multiline>{st.text}</p>
                <p className={s.wear}>
                  <span data-edit={`timetable.wearLabel.${i}`} data-edit-max="60" className={s.wearLabel}>Wear</span>
                  <span data-edit={`timetable.text2.${i}`} data-edit-max="60">{st.wear}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- TEACHERS */}
        <section id="teachers" className={s.teachers} aria-labelledby="teachers-h">
          <div className={s.secHead}>
            <h2 data-edit="teachers.title" data-edit-max="60" id="teachers-h">The teachers</h2>
            <p data-edit="teachers.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Four full-time teachers and two assistants, all first aid trained
              and background checked.
            </p>
          </div>
          <ul className={s.teacherGrid}>
            {TEACHERS.map((t, i) => (
              <li key={t.name} className={s.teacher} data-style={t.style}>
                <span className={s.monogram} aria-hidden="true">{t.initials}</span>
                <h3 data-edit={`teachers.title2.${i}`} data-edit-max="40">{t.name}</h3>
                <p data-edit={`teachers.teacherRole.${i}`} data-edit-max="240" data-edit-multiline className={s.teacherRole}>{t.role}</p>
                <p data-edit={`teachers.teacherBio.${i}`} data-edit-max="240" data-edit-multiline className={s.teacherBio}>{t.bio}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- RECITAL
            Ink, a field of stars, and the ballet dancer again in violet. */}
        <section id="recital" className={s.recital} aria-labelledby="recital-h">
          <div data-edit-pattern="recital.field" data-edit-roles="transparent,5,2,3,5" className={s.recitalField} aria-hidden="true">
            <TabbiedPattern
              pattern={northstar}
              palette={STARS}
              options={{ frequency: 0.14 }}
              fit="grid"
              cellSize={40}
              seed="pointe-stars"
              redrawInterval={6500}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.recitalInner}>
            <div className={s.recitalArt}>
              <Artwork
                slug="pointe-and-pulse-ballet"
                alt=""
                inks={['var(--violet)', 'var(--blush)']}
                className={s.recitalDancer}
              />
            </div>
            <div className={s.recitalBody}>
              <p data-edit="recital.recitalKicker" data-edit-max="240" data-edit-multiline className={s.recitalKicker}>The winter recital</p>
              <h2 data-edit="recital.title" data-edit-max="60" id="recital-h">Every class on one stage</h2>
              <div className={s.date}>
                <span data-edit="recital.dateDay" data-edit-max="60" className={s.dateDay}>13</span>
                <span data-edit="recital.dateMonth" data-edit-max="60" className={s.dateMonth}>December</span>
                <span data-edit="recital.datePlace" data-edit-max="60" className={s.datePlace}>Saturday, Alder Hall</span>
              </div>
              <p data-edit="recital.recitalText" data-edit-max="240" data-edit-multiline className={s.recitalText}>
                From Tiny toes to the Crew, every class performs one dance,
                with the seniors closing each half. Tickets go on sale to
                families on 1 November and to everyone a week later.
              </p>
              <dl className={s.recitalFacts}>
                {RECITAL_FACTS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`recital.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`recital.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.fees} aria-labelledby="fees-h">
          <div className={s.feesInner}>
            <div>
              <h2 data-edit="fees.title" data-edit-max="60" id="fees-h">Fees</h2>
              <ul className={s.feeNotes}>
                {FEE_NOTES.map((n, i) => (
                  <li data-edit={`fees.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                ))}
              </ul>
              <div className={s.feesTile} aria-hidden="true">
                <TabbiedPattern
                  pattern={cendal}
                  palette={SASH_ROSE}
                  options={{ frequency: 0.9 }}
                  fit="grid"
                  cellSize={30}
                  seed="fees-sash"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <dl className={s.feeList}>
              {FEES.map(([what, price], i) => (
                <div key={what}>
                  <dt data-edit={`fees.term.${i}`} data-edit-max="28">{what}</dt>
                  <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- TRIAL */}
        <section id="trial" className={s.trial} aria-labelledby="trial-h">
          <div className={s.trialInner}>
            <div className={s.trialArt}>
              <div className={s.trialField} aria-hidden="true">
                <TabbiedPattern
                  pattern={cendal}
                  palette={SASH_BLUSH}
                  options={{ frequency: 0.45 }}
                  fit="grid"
                  cellSize={72}
                  seed="trial-sash"
                  redrawInterval={9500}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="pointe-and-pulse-hiphop"
                alt=""
                inks={['var(--ink)', 'var(--rose)']}
                className={s.trialDancer}
              />
            </div>

            <div className={s.trialBody}>
              <h2 data-edit="trial.title" data-edit-max="60" id="trial-h">Try a class, free</h2>
              <p data-edit="trial.trialLede" data-edit-max="240" data-edit-multiline className={s.trialLede}>
                Pick a style and a day, and we will reply within a day with the
                class that fits. Come ten minutes early; wear something you can
                move in.
              </p>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label data-edit="trial.label" htmlFor="pp-dancer">Dancer's name</label>
                  <input id="pp-dancer" name="dancer" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="trial.label2" htmlFor="pp-age">Age</label>
                  <input id="pp-age" name="age" type="number" min="2" max="99" />
                </div>
                <div className={s.field}>
                  <label data-edit="trial.label3" htmlFor="pp-style">Style</label>
                  <select id="pp-style" name="style" defaultValue="Ballet">
                    {STYLES.map((st) => (
                      <option key={st.id} value={st.name}>{st.name}</option>
                    ))}
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="trial.label4" htmlFor="pp-day">Best day</label>
                  <select id="pp-day" name="day" defaultValue="Saturday">
                    {DAYS.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="trial.label5" htmlFor="pp-email">Email (a parent's, for under 18s)</label>
                  <input id="pp-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="trial.label6" htmlFor="pp-note">Anything we should know</label>
                  <textarea id="pp-note" name="note" rows={3} placeholder="Past classes, an injury, a shy first-timer." />
                </div>
                <button data-edit="trial.submit" data-edit-max="24" className={s.submit} type="submit">Book the free class</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footStars} aria-hidden="true">
          <TabbiedPattern
            pattern={northstar}
            palette={STARS}
            options={{ frequency: 0.3 }}
            fit="grid"
            cellSize={32}
            seed="footer-stars"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Pointe &amp; Pulse</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Dance school, 22 Alder Street. Two studios, one sprung floor each.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Office hours</h2>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>Monday to Friday, 15:30 - 20:30</p>
            <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>Saturday, 8:30 - 12:30</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Contact</h2>
            <a data-edit="footer.footLink" data-edit-max="28" className={s.footLink} href="tel:+15550184412">(555) 018-4412</a>
            <a data-edit="footer.footLink2" data-edit-max="28" className={s.footLink} href="mailto:hello@pointeandpulse.example">hello@pointeandpulse.example</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional dance school. Classes, teachers, prices and dates are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
