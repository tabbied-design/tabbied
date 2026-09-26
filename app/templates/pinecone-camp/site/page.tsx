import { TabbiedPattern } from 'tabbied/react';
import { driftspiral, frond } from 'tabbied/patterns';
import s from './pinecone-camp.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Pinecone Camp: Summer day camp, Loon Lake',
  description:
    'Pinecone Camp is a summer day camp on the shore of Loon Lake for children aged 5 to 12. Eight themed weeks, canoes, campfires and a Thursday sleepover, with fees and enrollment on one page.',
};

/* Site colors. The sparks spiral over the pine panel on a transparent
   ground; the leaves sit on the birch paper the same way. */
const MOSS = '#2F7A5B';
const EMBER = '#E07A3F';
const MIST = '#E2E5DB';
const STONE = '#8E968F';

const SPARKS = ['transparent', EMBER, MIST, EMBER, MOSS];
const LEAVES = ['transparent', MOSS, STONE, MIST];
/* The footer's hedge is laid on the mist, which also veins each leaf. */
const HEDGE = [MIST, MOSS, STONE, EMBER];

const NAV = [
  ['Sessions', '#sessions'],
  ['Activities', '#activities'],
  ['A day', '#day'],
  ['Fees', '#fees'],
  ['Enroll', '#enroll'],
  ['FAQ', '#faq'],
];

type Week = {
  n: string;
  dates: string;
  month: 'jun' | 'jul' | 'aug';
  theme: string;
  body: string;
  status: string;
  state: 'open' | 'few' | 'full';
};

const WEEKS: Week[] = [
  {
    n: '1',
    dates: 'Jun 15-19',
    month: 'jun',
    theme: 'Lake Days',
    body: 'Swim checks, the canoe dock and how to get back in after you fall out.',
    status: 'A few spots',
    state: 'few',
  },
  {
    n: '2',
    dates: 'Jun 22-26',
    month: 'jun',
    theme: 'Forest Detectives',
    body: 'Tracks, bark rubbings, a bug census and the mystery of the missing canoe.',
    status: 'Open',
    state: 'open',
  },
  {
    n: '3',
    dates: 'Jun 29-Jul 2',
    month: 'jun',
    theme: 'Camp Olympics',
    body: 'Four days, four teams, one very serious egg-and-spoon final. No camp Friday.',
    status: 'Open',
    state: 'open',
  },
  {
    n: '4',
    dates: 'Jul 6-10',
    month: 'jul',
    theme: 'Starry Nights',
    body: 'Constellations, a telescope on the dock and the Thursday sleepover in tents.',
    status: 'Waitlist',
    state: 'full',
  },
  {
    n: '5',
    dates: 'Jul 13-17',
    month: 'jul',
    theme: 'Makers Week',
    body: 'Whittling with a guard, clay from the lake bank, knots that actually hold.',
    status: 'Open',
    state: 'open',
  },
  {
    n: '6',
    dates: 'Jul 20-24',
    month: 'jul',
    theme: 'Waterfront',
    body: 'The big paddle: across Loon Lake and back, for campers who passed week 1.',
    status: 'A few spots',
    state: 'few',
  },
  {
    n: '7',
    dates: 'Jul 27-31',
    month: 'jul',
    theme: 'Trailblazers',
    body: 'Map and compass, trail snacks, and the hike to the top of Pinecone Knob.',
    status: 'Open',
    state: 'open',
  },
  {
    n: '8',
    dates: 'Aug 3-7',
    month: 'aug',
    theme: 'Carnival',
    body: 'Booths the campers build, a talent show and families on the field Friday at 2.',
    status: 'Open',
    state: 'open',
  },
];

const ACTIVITIES = [
  {
    art: 'pinecone-camp-canoe',
    alt: 'A canoe with two paddles crossed over it',
    title: 'On the water',
    body: 'Every camper swims every day, in the roped beach with two lifeguards on the dock. From age eight they paddle, two to a canoe, one counselor to three boats.',
    tag: 'Daily, 11 am',
  },
  {
    art: 'pinecone-camp-campfire',
    alt: 'A campfire with three logs and tall flames',
    title: 'Round the fire',
    body: 'Friday afternoons end at the fire circle: songs, skits, the week\'s awards and one marshmallow each, toasted by the camper who is holding the stick.',
    tag: 'Fridays, 2 pm',
  },
  {
    art: 'pinecone-camp-tent',
    alt: 'A camping tent pitched under a pine tree',
    title: 'Under canvas',
    body: 'In Starry Nights week the Pinecones and Tall Pines stay over on Thursday: tents in the meadow, a night walk, and pancakes at seven for the parents who come early.',
    tag: 'Week 4, Thursday',
  },
];

const MORE = [
  ['Archery', 'Ages 9 and up, on the range behind the barn.'],
  ['Nature lab', 'Pond dipping, owl pellets, a microscope each.'],
  ['Arts and crafts', 'Tie-dye on Tuesdays. Wear something you can lose.'],
  ['Trail games', 'Capture the flag across two acres of woods.'],
  ['Theater', 'A ten-minute play, written and staged by Friday.'],
  ['Rest hour', 'Hammocks, books and a counselor reading aloud.'],
];

const DAY = [
  ['8:00', 'Early drop-off', 'Quiet games in the lodge, for families who booked it.'],
  ['8:45', 'Drop-off at the Big Pine', 'Drive through the loop; a counselor walks each camper in.'],
  ['9:00', 'Morning circle', 'Names, the weather, the plan, and one terrible joke.'],
  ['9:30', 'Activity block one', 'Groups rotate through archery, crafts and the nature lab.'],
  ['10:45', 'Snack in the shade', 'Fruit and crackers from us. Nut-free, always.'],
  ['11:00', 'Swim and paddle', 'Lessons by level, then free swim in the roped beach.'],
  ['12:15', 'Lunch at the tables', 'Bring a packed lunch and a full water bottle.'],
  ['1:00', 'Rest hour', 'Under the trees, in the hammocks or in the lodge if it rains.'],
  ['1:45', 'Activity block two', 'The week\'s theme: the big build, the hike, the rehearsal.'],
  ['3:00', 'Closing circle', 'What went well, what we saw, who needs their towel back.'],
  ['3:30', 'Pick-up', 'Same loop. Show the card with your camper\'s name on it.'],
];

const PACK = [
  'Swimsuit and a towel with a name on it',
  'Packed lunch and a refillable water bottle',
  'Closed-toe shoes for the trail',
  'Sunscreen, already on at drop-off',
  'A sweatshirt, even in July',
];

const FEES = [
  ['Full week, Monday to Friday', '$345'],
  ['Week 3, four days', '$280'],
  ['Early bird, enrolled by March 1', '$315 a week'],
  ['Brothers and sisters', '10% off the second camper'],
  ['Early drop-off from 8:00', '$30 a week'],
  ['Aftercare until 5:30', '$60 a week or $15 a day'],
  ['Camp bus from Maple Street Library', '$40 a week'],
];

const GROUPS = [
  ['Sprouts', 'Ages 5-6', '1 counselor to 6'],
  ['Pinecones', 'Ages 7-9', '1 counselor to 8'],
  ['Tall Pines', 'Ages 10-12', '1 counselor to 10'],
];

const FAQ = [
  {
    q: 'Does my camper need to swim?',
    a: 'No. Everyone takes a swim check on their first morning and wears a colored cap for their level. Non-swimmers stay in the shallow crib with an instructor.',
  },
  {
    q: 'What happens when it rains?',
    a: 'Camp goes on. Light rain is outdoor weather; thunder moves everyone into the lodge and the barn, which have games, the craft tables and a very long rope for tug of war.',
  },
  {
    q: 'Are you nut-free?',
    a: 'We serve nothing with nuts and ask that lunches leave them out. Allergies and medicines go on the enrollment form and are kept by the camp nurse.',
  },
  {
    q: 'Who are the counselors?',
    a: 'College students and teachers, most of them former campers. All are first-aid trained and background checked, and the waterfront staff hold lifeguard certificates.',
  },
  {
    q: 'Can we get money back if plans change?',
    a: 'The $75 deposit moves to another week for free. Cancel more than 30 days out and everything but the deposit is refunded.',
  },
];

export default function PineconeCampPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--birch': '#f4f1e8',
        '--pine': '#1d2a24',
        '--moss': '#2f7a5b',
        '--ember': '#e07a3f',
        '--stone': '#8e968f',
        '--mist': '#e2e5db',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="birch,pine,moss,ember,stone,mist"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&family=Zilla+Slab:wght@500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork
            slug="pinecone-camp-tent"
            alt=""
            inks={{ red: 'var(--ember)', blue: 'var(--moss)' }}
            className={s.markArt}
          />
          <span data-edit="bar.text" data-edit-max="60">Pinecone Camp</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#enroll">Enroll</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The copy on birch paper, and the fire on the pine panel with its
            sparks spiraling up out of it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Summer day camp, ages 5 to 12, on Loon Lake</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Eight weeks of lake, woods <em>and campfire songs.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Monday to Friday, 9 to 3:30, on forty acres of pine at the north
              end of the lake. Pick one week or all eight: each has its own
              theme, and every day has a swim in it.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#sessions">See the eight weeks</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#enroll">Hold a spot</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Ages</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>5 to 12</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Hours</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>9:00-3:30</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">From</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>$345 a week</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroPanel}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,5,3,2" className={s.sparks} aria-hidden="true">
              <TabbiedPattern
                pattern={driftspiral}
                palette={SPARKS}
                fit="grid"
                cellSize={56}
                seed="pinecone-sparks"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="pinecone-camp-campfire"
              alt="A campfire burning on three logs"
              inks={{ red: 'var(--ember)', blue: 'var(--mist)' }}
              className={s.fire}
            />
            <p className={s.panelNote}>
              <span data-edit="hero.text" data-edit-max="60">Friday fire circle</span>
              <strong data-edit="hero.emphasis">2:00 pm, every week</strong>
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- SESSIONS
            The summer as one line, June to August, a week to a stop. */}
        <section id="sessions" className={s.sessions} aria-labelledby="sessions-h">
          <div className={s.head}>
            <p data-edit="sessions.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The summer</p>
            <h2 data-edit="sessions.title" data-edit-max="60" id="sessions-h">Eight weeks, eight themes</h2>
            <p data-edit="sessions.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Every week stands on its own, so a camper can come for one or for
              the lot. Spots are counted live on the enrollment form.
            </p>
          </div>
          <div className={s.timelineWrap}>
            <ol className={s.months} aria-hidden="true">
              <li data-edit="sessions.monthJun" data-edit-max="80" className={s.monthJun}>June</li>
              <li data-edit="sessions.monthJul" data-edit-max="80" className={s.monthJul}>July</li>
              <li data-edit="sessions.monthAug" data-edit-max="80" className={s.monthAug}>August</li>
            </ol>
            <ol className={s.timeline}>
              {WEEKS.map((w, i) => (
                <li key={w.n} className={`${s.week} ${s[w.state]}`}>
                  <span className={s.weekNo}>{`Week ${w.n}`}</span>
                  <span className={s.node} aria-hidden="true" />
                  <time data-edit={`sessions.weekDates.${i}`} className={s.weekDates}>{w.dates}</time>
                  <h3 data-edit={`sessions.weekTheme.${i}`} data-edit-max="40" className={s.weekTheme}>{w.theme}</h3>
                  <p data-edit={`sessions.weekBody.${i}`} data-edit-max="240" data-edit-multiline className={s.weekBody}>{w.body}</p>
                  <span data-edit={`sessions.weekStatus.${i}`} data-edit-max="60" className={s.weekStatus}>{w.status}</span>
                </li>
              ))}
            </ol>
          </div>
          <ul className={s.groups}>
            {GROUPS.map(([name, ages, ratio], i) => (
              <li key={name}>
                <strong data-edit={`sessions.emphasis.${i}`}>{name}</strong>
                <span data-edit={`sessions.text.${i}`} data-edit-max="60">{ages}</span>
                <span data-edit={`sessions.text2.${i}`} data-edit-max="60">{ratio}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ ACTIVITIES */}
        <section id="activities" className={s.activities} aria-labelledby="activities-h">
          <div data-edit-pattern="activities.field" data-edit-roles="transparent,2,4,5" className={s.leaves} aria-hidden="true">
            <TabbiedPattern
              pattern={frond}
              palette={LEAVES}
              fit="grid"
              cellSize={88}
              seed="pinecone-leaves"
              options={{ frequency: 0.4 }}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.activitiesInner}>
            <div className={s.head}>
              <p data-edit="activities.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Activities</p>
              <h2 data-edit="activities.title" data-edit-max="60" id="activities-h">What a week is made of</h2>
              <p data-edit="activities.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Three things happen every week whatever the theme. The rest
                rotate, so nobody does archery five days running.
              </p>
            </div>
            <ul className={s.cards}>
              {ACTIVITIES.map((a, i) => (
                <li key={a.title} className={s.card}>
                  <div className={s.cardArt}>
                    <Artwork
                      slug={a.art}
                      alt={a.alt}
                      inks={{ red: 'var(--ember)', blue: 'var(--moss)' }}
                      className={s.cardPic}
                    />
                  </div>
                  <span data-edit={`activities.cardTag.${i}`} data-edit-max="60" className={s.cardTag}>{a.tag}</span>
                  <h3 data-edit={`activities.cardTitle.${i}`} data-edit-max="40" className={s.cardTitle}>{a.title}</h3>
                  <p data-edit={`activities.cardBody.${i}`} data-edit-max="240" data-edit-multiline className={s.cardBody}>{a.body}</p>
                </li>
              ))}
            </ul>
            <ul className={s.more}>
              {MORE.map(([t, d], i) => (
                <li key={t}>
                  <strong data-edit={`activities.emphasis.${i}`}>{t}</strong>
                  <span data-edit={`activities.text.${i}`} data-edit-max="60">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- DAY */}
        <section id="day" className={s.day} aria-labelledby="day-h">
          <div className={s.dayAside}>
            <div className={s.head}>
              <p data-edit="day.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>A day at camp</p>
              <h2 data-edit="day.title" data-edit-max="60" id="day-h">From the Big Pine to pick-up</h2>
              <p data-edit="day.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                The same shape every day, so the youngest know what comes next.
              </p>
            </div>
            <div className={s.tentBed}>
              <div data-edit-pattern="day.field" data-edit-roles="transparent,2,4,5" className={s.tentLeaves} aria-hidden="true">
                <TabbiedPattern
                  pattern={frond}
                  palette={LEAVES}
                  fit="grid"
                  cellSize={44}
                  seed="pinecone-tent"
                  options={{ frequency: 0.5 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="pinecone-camp-tent"
                alt="A tent pitched under a tall pine"
                inks={{ red: 'var(--ember)', blue: 'var(--moss)' }}
                className={s.tent}
              />
            </div>
            <div className={s.pack}>
              <h3 data-edit="day.packHead" data-edit-max="40" className={s.packHead}>In the backpack</h3>
              <ul className={s.packList}>
                {PACK.map((p, i) => (
                  <li data-edit={`day.item.${i}`} data-edit-max="80" key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <ol className={s.schedule}>
            {DAY.map(([time, what, note], i) => (
              <li key={time}>
                <time data-edit={`day.slotTime.${i}`} className={s.slotTime}>{time}</time>
                <strong data-edit={`day.slotWhat.${i}`} className={s.slotWhat}>{what}</strong>
                <span data-edit={`day.slotNote.${i}`} data-edit-max="60" className={s.slotNote}>{note}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.fees} aria-labelledby="fees-h">
          <div className={s.feesInner}>
            <div className={s.head}>
              <p data-edit="fees.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Fees</p>
              <h2 data-edit="fees.title" data-edit-max="60" id="fees-h">What it costs</h2>
              <p data-edit="fees.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Snacks, swim lessons, the T-shirt and every craft supply are
                included. Lunch comes from home.
              </p>
            </div>
            <table className={s.feeTable}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>Camp fees for the summer</caption>
              <tbody>
                {FEES.map(([what, cost], i) => (
                  <tr key={what}>
                    <th data-edit={`fees.heading.${i}`} scope="row">{what}</th>
                    <td data-edit={`fees.cell.${i}`}>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={s.aid}>
              <h3 data-edit="fees.aidHead" data-edit-max="40" className={s.aidHead}>One camper in five comes on a scholarship</h3>
              <p data-edit="fees.aidBody" data-edit-max="240" data-edit-multiline className={s.aidBody}>
                Ask for the short form when you enroll. We decide within a
                week, nobody else sees it, and the camper never knows.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- ENROLL */}
        <section id="enroll" className={s.enroll} aria-labelledby="enroll-h">
          <div className={s.enrollIntro}>
            <p data-edit="enroll.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Enroll</p>
            <h2 data-edit="enroll.title" data-edit-max="60" id="enroll-h">Hold your camper's weeks</h2>
            <p data-edit="enroll.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Send this and we hold the weeks for three days while we email the
              invoice. A $75 deposit a week confirms them.
            </p>
            <div className={s.canoeBay}>
              <div data-edit-pattern="enroll.field" data-edit-roles="transparent,3,5,3,2" className={s.fireflies} aria-hidden="true">
                <TabbiedPattern
                  pattern={driftspiral}
                  palette={SPARKS}
                  fit="grid"
                  cellSize={40}
                  seed="pinecone-fireflies"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="pinecone-camp-canoe"
                alt=""
                inks={{ red: 'var(--moss)', blue: 'var(--ember)' }}
                className={s.canoe}
              />
            </div>
          </div>
          <form className={s.form} action="#">
            <div className={s.formRow}>
              <label className={s.field}>
                <span data-edit="enroll.text" data-edit-max="60">Camper's name</span>
                <input type="text" name="camper" autoComplete="off" />
              </label>
              <label className={s.field}>
                <span data-edit="enroll.text2" data-edit-max="60">Age this summer</span>
                <select name="age" defaultValue="">
                  <option value="" disabled>Choose</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </label>
            </div>
            <fieldset className={s.weeksField}>
              <legend data-edit="enroll.legend">Weeks</legend>
              <div className={s.weekChecks}>
                {WEEKS.map((w) => (
                  <label key={w.n} className={s.check}>
                    <input type="checkbox" name="weeks" value={w.n} disabled={w.state === 'full'} />
                    <span>{`${w.n}. ${w.theme}`}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={s.formRow}>
              <label className={s.field}>
                <span data-edit="enroll.text3" data-edit-max="60">Parent or guardian</span>
                <input type="text" name="parent" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span data-edit="enroll.text4" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
            </div>
            <label className={s.field}>
              <span data-edit="enroll.text5" data-edit-max="60">Anything we should know</span>
              <textarea name="notes" rows={3} />
            </label>
            <div className={s.formFoot}>
              <label className={s.check}>
                <input type="checkbox" name="aftercare" />
                <span data-edit="enroll.text6" data-edit-max="60">Add aftercare until 5:30</span>
              </label>
              <button data-edit="enroll.btn" data-edit-max="24" type="submit" className={s.btn}>Hold the weeks</button>
            </div>
          </form>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.head}>
            <p data-edit="faq.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Questions</p>
            <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">What parents ask us first</h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="5,2,4,3" className={s.hedge} aria-hidden="true">
          <TabbiedPattern
            pattern={frond}
            palette={HEDGE}
            fit="grid"
            cellSize={36}
            seed="pinecone-hedge"
            options={{ frequency: 0.8 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Pinecone Camp</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>A summer day camp on the north shore of Loon Lake.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Find us</h2>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>1 Big Pine Road, off Route 9</p>
            <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>Gate opens 8:00 on camp days</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Talk to us</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.link" data-edit-max="28" href="tel:5550148800">(555) 014-8800</a></li>
              <li><a data-edit="footer.link2" data-edit-max="28" href="mailto:hello@pineconecamp.example">hello@pineconecamp.example</a></li>
              <li><a data-edit="footer.faq" data-edit-max="28" href="#faq">Questions</a></li>
            </ul>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional summer camp. Weeks, fees and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the camp's own colors; the pictures follow the same palette.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
