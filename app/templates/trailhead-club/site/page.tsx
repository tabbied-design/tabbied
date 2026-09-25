import { TabbiedPattern } from 'tabbied/react';
import { baste, contourlines } from 'tabbied/patterns';
import s from './trailhead-club.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Trailhead Club: Hiking club, Ashby Valley',
  description:
    'Trailhead Club is a volunteer hiking club in the Ashby Valley. A led hike every Saturday and most Sundays, graded, carpooled and free for members, with a gear closet to borrow from.',
};

/* Site colors. The contour rings take `transparent` in the ground slot, so
   they are drawn straight onto the paper or the mist disc behind them. */
const INK = '#1C2418';
const MOSS = '#4F6B3A';
const STONE = '#8D8C80';
const MIST = '#DFDDD1';

const CONTOURS = ['transparent', MOSS, STONE, MOSS];
const TRAIL = ['transparent', MOSS, STONE, INK];
const CODA = ['transparent', STONE, MIST, MOSS];

const NAV = [
  ['Hikes', '#hikes'],
  ['Grades', '#grades'],
  ['Gear', '#gear'],
  ['Join', '#join'],
  ['First hike', '#first-hike'],
  ['Contact', '#contact'],
];

/* One bold icon per kind of outing, painted in the moss through its mask. */
const ICON: Record<string, string> = {
  summit: 'trailhead-club-peak',
  walk: 'trailhead-club-boot',
  skills: 'trailhead-club-compass',
  overnight: 'trailhead-club-tent',
};

/* The tallest climb on the calendar sets the length of every bar. */
const MAX_GAIN = 3500;

type Hike = {
  day: string;
  weekday: string;
  kind: string;
  kindLabel: string;
  name: string;
  meet: string;
  leader: string;
  miles: string;
  gain: number;
  gainLabel: string;
  grade: 'g1' | 'g2' | 'g3';
  gradeLabel: string;
  spots: string;
  full?: boolean;
};

type Month = {
  name: string;
  count: string;
  hikes: Hike[];
};

const CALENDAR: Month[] = [
  {
    name: 'October',
    count: '6 outings',
    hikes: [
      {
        day: '03',
        weekday: 'Sat',
        kind: 'summit',
        kindLabel: 'Summit',
        name: 'Cinder Ridge loop',
        meet: 'Hollis Creek trailhead, 8:00 am',
        leader: 'Led by Ruth Okafor',
        miles: '7.8 mi',
        gain: 1900,
        gainLabel: '1,900 ft',
        grade: 'g2',
        gradeLabel: 'Moderate',
        spots: '5 of 14 left',
      },
      {
        day: '07',
        weekday: 'Wed',
        kind: 'skills',
        kindLabel: 'Skills',
        name: 'Map and compass, after work',
        meet: 'Alder Park shelter, 5:30 pm',
        leader: 'Led by Dev Marsh',
        miles: '2.5 mi',
        gain: 300,
        gainLabel: '300 ft',
        grade: 'g1',
        gradeLabel: 'Easy',
        spots: '12 of 20 left',
      },
      {
        day: '11',
        weekday: 'Sun',
        kind: 'walk',
        kindLabel: 'First-hike friendly',
        name: 'Millrace Falls and the old flume',
        meet: 'Millrace lot on Route 9, 9:30 am',
        leader: 'Led by Ana Whitfield',
        miles: '5.2 mi',
        gain: 700,
        gainLabel: '700 ft',
        grade: 'g1',
        gradeLabel: 'Easy',
        spots: '9 of 16 left',
      },
      {
        day: '17',
        weekday: 'Sat',
        kind: 'summit',
        kindLabel: 'Summit',
        name: 'Bald Knob by the north ridge',
        meet: 'Kettle Road gate, 7:00 am',
        leader: 'Led by Tom Reyes',
        miles: '11.4 mi',
        gain: 3200,
        gainLabel: '3,200 ft',
        grade: 'g3',
        gradeLabel: 'Hard',
        spots: 'Waitlist',
        full: true,
      },
      {
        day: '24',
        weekday: 'Sat',
        kind: 'overnight',
        kindLabel: 'Overnight, back Sunday',
        name: 'One night at Tamarack Lake',
        meet: 'Upper Ashby trailhead, 10:00 am',
        leader: 'Led by Ruth Okafor and Lee Chen',
        miles: '9.6 mi',
        gain: 1500,
        gainLabel: '1,500 ft',
        grade: 'g2',
        gradeLabel: 'Moderate',
        spots: '3 of 8 left',
      },
      {
        day: '31',
        weekday: 'Sat',
        kind: 'walk',
        kindLabel: 'First-hike friendly',
        name: 'Owl Hollow at dusk',
        meet: 'Owl Hollow picnic area, 4:30 pm',
        leader: 'Led by Priya Das',
        miles: '3.1 mi',
        gain: 250,
        gainLabel: '250 ft',
        grade: 'g1',
        gradeLabel: 'Easy',
        spots: '14 of 24 left',
      },
    ],
  },
  {
    name: 'November',
    count: '5 outings',
    hikes: [
      {
        day: '07',
        weekday: 'Sat',
        kind: 'summit',
        kindLabel: 'Summit, car shuttle',
        name: 'Ashby Rim traverse',
        meet: 'Park-and-ride, Orchard and 3rd, 6:45 am',
        leader: 'Led by Tom Reyes',
        miles: '12.6 mi',
        gain: 2700,
        gainLabel: '2,700 ft',
        grade: 'g3',
        gradeLabel: 'Hard',
        spots: '4 of 12 left',
      },
      {
        day: '11',
        weekday: 'Wed',
        kind: 'walk',
        kindLabel: 'Midweek',
        name: 'Heron Marsh boardwalk',
        meet: 'Marsh visitor center, 10:00 am',
        leader: 'Led by Ana Whitfield',
        miles: '4.0 mi',
        gain: 120,
        gainLabel: '120 ft',
        grade: 'g1',
        gradeLabel: 'Easy',
        spots: '11 of 18 left',
      },
      {
        day: '15',
        weekday: 'Sun',
        kind: 'skills',
        kindLabel: 'Skills, off trail',
        name: 'Navigation day on Crow Hill',
        meet: 'Crow Hill fire road gate, 8:30 am',
        leader: 'Led by Dev Marsh',
        miles: '6.0 mi',
        gain: 1100,
        gainLabel: '1,100 ft',
        grade: 'g2',
        gradeLabel: 'Moderate',
        spots: '6 of 10 left',
      },
      {
        day: '21',
        weekday: 'Sat',
        kind: 'walk',
        kindLabel: 'Trail work, tools provided',
        name: 'Clearing the Hollis Creek switchbacks',
        meet: 'Hollis Creek trailhead, 8:30 am',
        leader: 'Led by Sam Oduya',
        miles: '3.0 mi',
        gain: 600,
        gainLabel: '600 ft',
        grade: 'g1',
        gradeLabel: 'Easy',
        spots: '15 of 25 left',
      },
      {
        day: '27',
        weekday: 'Fri',
        kind: 'summit',
        kindLabel: 'Summit, the day after Thanksgiving',
        name: 'Pike Lookout',
        meet: 'Pike Road trailhead, 9:00 am',
        leader: 'Led by Priya Das',
        miles: '8.8 mi',
        gain: 2100,
        gainLabel: '2,100 ft',
        grade: 'g2',
        gradeLabel: 'Moderate',
        spots: '10 of 16 left',
      },
    ],
  },
];

const GRADES = [
  {
    grade: 'g1',
    name: 'Easy',
    miles: 'Under 6 miles',
    gain: 'Under 800 ft',
    pace: 'About 2 mph, with stops',
    note: 'Good for a first hike and for children of 8 and up with a parent. Mostly good footing.',
  },
  {
    grade: 'g2',
    name: 'Moderate',
    miles: '6-10 miles',
    gain: '800-2,200 ft',
    pace: 'About 2 mph, lunch on top',
    note: 'A steady climb, some rocky or rooty sections, and a full day out. Come on an easy one first.',
  },
  {
    grade: 'g3',
    name: 'Hard',
    miles: '10 miles or more',
    gain: '2,200 ft or more',
    pace: '2.5 mph, short stops',
    note: 'Long days, steep ground and sometimes a scramble. Write to the leader before you sign up.',
  },
];

const GEAR = [
  {
    slug: 'trailhead-club-boot',
    title: 'On your feet',
    note: 'Every hike',
    items: [
      'Boots or trail shoes you have already walked in',
      'Wool or synthetic socks, and a dry spare pair',
      'Gaiters from November to April',
      'Poles if your knees like them (we lend them)',
    ],
  },
  {
    slug: 'trailhead-club-compass',
    title: 'Finding the way',
    note: 'Every hike',
    items: [
      'The route map (the leader hands them out)',
      'A compass, and a phone that is charged',
      'A whistle and a headlamp, even at noon',
      'The leader and sweep numbers in your phone',
    ],
  },
  {
    slug: 'trailhead-club-peak',
    title: 'Summit days',
    note: 'Moderate and hard',
    items: [
      'A rain shell and a warm layer, whatever the forecast',
      'Hat and gloves from October on',
      'Two liters of water and lunch, plus a spare snack',
      'Sunscreen and a small first-aid kit',
    ],
  },
  {
    slug: 'trailhead-club-tent',
    title: 'Overnights',
    note: 'Overnight trips only',
    items: [
      'A tent (the closet has six two-person tents)',
      'A sleeping bag rated to 30 F and a pad',
      'Stove, fuel and a pot, shared in pairs',
      'A pack of 45-60 liters, packed under 30 lb',
    ],
  },
];

const TIERS = [
  {
    name: 'Single',
    price: '$30',
    per: 'a year',
    note: 'One adult, every hike on the calendar.',
    perks: ['Every led hike and clinic', 'The gear closet', 'The printed trail map set', 'Leader training after six hikes'],
  },
  {
    name: 'Household',
    price: '$45',
    per: 'a year',
    note: 'Two adults and children under 18 at one address.',
    perks: ['Everything in Single', 'Kids hike free with you', 'Two votes at the spring meeting', 'Family hikes in July'],
    featured: true,
  },
  {
    name: 'Student',
    price: '$12',
    per: 'a year',
    note: 'Anyone under 26 or in full-time study.',
    perks: ['Everything in Single', 'First pick of carpool seats', 'Free place on the first-aid course', 'A club patch'],
  },
];

const FAQ = [
  {
    q: 'Do I have to be a member to come?',
    a: 'No. Anyone can come on two hikes as a guest before joining. Sign up by email like everyone else and tell the leader it is your first time.',
  },
  {
    q: 'What if I cannot keep up?',
    a: 'Every hike has a leader at the front and a sweep at the back, and nobody walks behind the sweep. The group waits at every junction. Pick an easy hike first and you will know where you stand.',
  },
  {
    q: 'How do I get to the trailhead?',
    a: 'Carpools leave the park-and-ride at Orchard and 3rd thirty minutes before the meet time. Drivers are paid back 20 cents a mile, split between the passengers.',
  },
  {
    q: 'What happens if it rains?',
    a: 'We hike in rain. We cancel for lightning, snow on the roads or a red flag warning, and the trail line says so by 6 am on the day.',
  },
  {
    q: 'Can I bring my dog, or my kids?',
    a: 'Dogs on a leash are welcome on hikes marked easy, one per household. Children of 8 and up can come on easy hikes with a parent.',
  },
  {
    q: 'What does it cost?',
    a: 'Hikes are free for members and guests. Overnights share the campsite fee, usually $6-10 each, and the leader collects it at the trailhead.',
  },
];

const FACTS = [
  ['1987', 'Walking since'],
  ['96', 'Led hikes a year'],
  ['412', 'Members'],
  ['2', 'Free guest hikes'],
];

export default function TrailheadClubPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800&family=Overpass+Mono:wght@400;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork slug="trailhead-club-peak" alt="" inks={['var(--moss)']} className={s.markIcon} />
          <span>Trailhead Club</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#join">Join the club</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The club's patch: a summit on its own contour rings. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Volunteer hiking club, Ashby Valley, since 1987</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Every Saturday, <em>someone knows the way.</em>
            </h1>
            <p className={s.heroLede}>
              Led hikes from easy creek walks to long ridge days, graded
              honestly, carpooled from town and free for members. Your first
              two are on us.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#hikes">See the calendar</a>
              <a className={s.btnGhost} href="#first-hike">Your first hike</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([v, k]) => (
                <div key={k}>
                  <dt>{v}</dt>
                  <dd>{k}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.badge}>
            <div className={s.badgeDisc}>
              <div className={s.badgeField} aria-hidden="true">
                <TabbiedPattern
                  pattern={contourlines}
                  palette={CONTOURS}
                  options={{ frequency: 0.55 }}
                  fit="grid"
                  cellSize={120}
                  seed="trailhead"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork slug="trailhead-club-peak" alt="A mountain peak with a flag on the summit" inks={['var(--ink)']} className={s.badgePeak} />
            </div>
            <div className={s.nextHike}>
              <span className={s.nextLabel}>Next up</span>
              <strong className={s.nextName}>Cinder Ridge loop</strong>
              <span className={s.nextMeta}>Sat 3 Oct, 7.8 mi, 1,900 ft</span>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- CALENDAR
            The trip calendar: one row per outing, the climb drawn as a bar. */}
        <section id="hikes" className={s.calendar} aria-labelledby="hikes-h">
          <div className={s.secHead}>
            <span className={s.secNo}>01</span>
            <h2 id="hikes-h">The trip calendar</h2>
            <p className={s.secNote}>
              Autumn 2026. Sign up by email to the address under each hike; the
              leader writes back with the carpool plan two days before.
            </p>
          </div>

          <div className={s.legend} aria-hidden="true">
            <span className={s.legendItem}>
              <Artwork slug="trailhead-club-peak" alt="" inks={['var(--moss)']} className={s.legendIcon} />
              <span>Summit</span>
            </span>
            <span className={s.legendItem}>
              <Artwork slug="trailhead-club-boot" alt="" inks={['var(--moss)']} className={s.legendIcon} />
              <span>Walk</span>
            </span>
            <span className={s.legendItem}>
              <Artwork slug="trailhead-club-compass" alt="" inks={['var(--moss)']} className={s.legendIcon} />
              <span>Skills</span>
            </span>
            <span className={s.legendItem}>
              <Artwork slug="trailhead-club-tent" alt="" inks={['var(--moss)']} className={s.legendIcon} />
              <span>Overnight</span>
            </span>
          </div>

          {CALENDAR.map((m) => (
            <div key={m.name} className={s.month}>
              <div className={s.monthHead}>
                <h3>{m.name}</h3>
                <span className={s.monthCount}>{m.count}</span>
              </div>
              <div className={s.colHead} aria-hidden="true">
                <span>Date</span>
                <span>Hike</span>
                <span>Distance</span>
                <span>Climb</span>
                <span>Grade</span>
                <span>Places</span>
              </div>
              <ol className={s.hikes}>
                {m.hikes.map((h) => (
                  <li key={h.name} className={`${s.hike} ${s[h.grade]}`}>
                    <div className={s.date}>
                      <span className={s.day}>{h.day}</span>
                      <span className={s.weekday}>{h.weekday}</span>
                    </div>
                    <Artwork slug={ICON[h.kind]} alt="" inks={['var(--moss)']} className={s.hikeIcon} />
                    <div className={s.hikeInfo}>
                      <span className={s.hikeKind}>{h.kindLabel}</span>
                      <h4>{h.name}</h4>
                      <p className={s.hikeMeet}>{h.meet}</p>
                      <p className={s.hikeLeader}>{h.leader}</p>
                    </div>
                    <span className={s.miles}>{h.miles}</span>
                    <div className={s.gain}>
                      <span className={s.gainBar} aria-hidden="true">
                        <span style={{ width: `${Math.round((h.gain / MAX_GAIN) * 100)}%` }} />
                      </span>
                      <span className={s.gainNum}>{h.gainLabel}</span>
                    </div>
                    <div className={s.grade}>
                      <span className={s.dots} aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>{h.gradeLabel}</span>
                    </div>
                    <span className={h.full ? `${s.spots} ${s.spotsFull}` : s.spots}>{h.spots}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div className={s.signup}>
            <p className={s.signupText}>To sign up, write to the hikes desk with the date and the hike.</p>
            <a className={s.signupLink} href="mailto:hikes@trailheadclub.example">hikes@trailheadclub.example</a>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND
            Dashed trail marks, edge to edge, between the calendar and the
            grades. Thinned out so it reads as a path, not a texture. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={baste}
            palette={TRAIL}
            options={{ frequency: 0.8 }}
            fit="grid"
            cellSize={48}
            redrawInterval={8000}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- GRADES */}
        <section id="grades" className={s.sec} aria-labelledby="grades-h">
          <div className={s.secHead}>
            <span className={s.secNo}>02</span>
            <h2 id="grades-h">How we grade a hike</h2>
            <p className={s.secNote}>
              By distance and climb together, and by the slower of the two. If
              you are between grades, go with the easier one.
            </p>
          </div>
          <div className={s.grades}>
            {GRADES.map((g) => (
              <div key={g.name} className={`${s.gradeCard} ${s[g.grade]}`}>
                <div className={s.gradeTop}>
                  <span className={s.dots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <h3>{g.name}</h3>
                </div>
                <dl className={s.gradeFacts}>
                  <div>
                    <dt>Distance</dt>
                    <dd>{g.miles}</dd>
                  </div>
                  <div>
                    <dt>Climb</dt>
                    <dd>{g.gain}</dd>
                  </div>
                  <div>
                    <dt>Pace</dt>
                    <dd>{g.pace}</dd>
                  </div>
                </dl>
                <p className={s.gradeNote}>{g.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ GEAR
            The checklist, one icon per list, large enough to lead. */}
        <section id="gear" className={s.gearSec} aria-labelledby="gear-h">
          <div className={s.gearInner}>
            <div className={s.secHead}>
              <span className={s.secNo}>03</span>
              <h2 id="gear-h">What to bring</h2>
              <p className={s.secNote}>
                The leader checks packs at the trailhead, kindly. Anything you
                are missing, the gear closet probably has: packs, poles, tents,
                headlamps and boots in sizes 5-13.
              </p>
            </div>
            <div className={s.gear}>
              {GEAR.map((g) => (
                <div key={g.title} className={s.gearCard}>
                  <Artwork slug={g.slug} alt="" inks={['var(--moss)']} className={s.gearIcon} />
                  <span className={s.gearNote}>{g.note}</span>
                  <h3>{g.title}</h3>
                  <ul className={s.checklist}>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP */}
        <section id="join" className={s.sec} aria-labelledby="join-h">
          <div className={s.secHead}>
            <span className={s.secNo}>04</span>
            <h2 id="join-h">Membership</h2>
            <p className={s.secNote}>
              A year from the day you join. The money pays for the insurance,
              the maps, the gear closet and the trail work tools, and nothing
              else: every leader is a volunteer.
            </p>
          </div>
          <div className={s.tiers}>
            {TIERS.map((t) => (
              <div key={t.name} className={t.featured ? `${s.tier} ${s.tierFeatured}` : s.tier}>
                <h3>{t.name}</h3>
                <p className={s.tierPrice}>
                  <strong>{t.price}</strong>
                  <span>{t.per}</span>
                </p>
                <p className={s.tierNote}>{t.note}</p>
                <ul className={s.tierPerks}>
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <form className={s.joinForm} action="#">
            <div className={s.joinIntro}>
              <Artwork slug="trailhead-club-tent" alt="" inks={['var(--moss)']} className={s.joinIcon} />
              <h3>Join online</h3>
              <p>We send your card and the map set by post within a week. Pay at your first hike, by card or cash.</p>
            </div>
            <div className={s.field}>
              <label htmlFor="th-name">Name</label>
              <input id="th-name" name="name" type="text" autoComplete="name" />
            </div>
            <div className={s.field}>
              <label htmlFor="th-email">Email</label>
              <input id="th-email" name="email" type="email" autoComplete="email" />
            </div>
            <div className={s.field}>
              <label htmlFor="th-tier">Membership</label>
              <select id="th-tier" name="tier" defaultValue="single">
                <option value="single">Single, $30 a year</option>
                <option value="household">Household, $45 a year</option>
                <option value="student">Student, $12 a year</option>
              </select>
            </div>
            <div className={s.field}>
              <label htmlFor="th-hike">Your first hike (optional)</label>
              <input id="th-hike" name="hike" type="text" placeholder="Millrace Falls, 11 Oct" />
            </div>
            <button type="submit" className={s.btn}>Send my details</button>
          </form>
        </section>

        {/* ------------------------------------------------------ FIRST HIKE */}
        <section id="first-hike" className={s.sec} aria-labelledby="first-h">
          <div className={s.secHead}>
            <span className={s.secNo}>05</span>
            <h2 id="first-h">Your first hike</h2>
            <p className={s.secNote}>
              The questions new people ask at the trailhead, answered before
              you get there.
            </p>
          </div>
          <div className={s.faqWrap}>
            <div className={s.faqArt} aria-hidden="true">
              <Artwork slug="trailhead-club-boot" alt="" inks={['var(--ink)']} className={s.faqBoot} />
            </div>
            <div className={s.faq}>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.secHead}>
            <span className={s.secNo}>06</span>
            <h2 id="contact-h">Find us</h2>
            <p className={s.secNote}>
              The club has no office. It has a room at the library once a
              month, a phone line and an inbox that three volunteers read.
            </p>
          </div>
          <dl className={s.contact}>
            <div>
              <dt>Trail line</dt>
              <dd>
                <a href="tel:+15550142290">(555) 014-2290</a>
              </dd>
              <dd className={s.contactNote}>A recording, updated by 6 am on hike days.</dd>
            </div>
            <div>
              <dt>Write</dt>
              <dd>
                <a href="mailto:hello@trailheadclub.example">hello@trailheadclub.example</a>
              </dd>
              <dd className={s.contactNote}>Answered within two days.</dd>
            </div>
            <div>
              <dt>Club night</dt>
              <dd>Ashby Library, 212 Orchard Street</dd>
              <dd className={s.contactNote}>First Tuesday of the month, 7 pm. Slides, maps, cookies.</dd>
            </div>
            <div>
              <dt>Carpools</dt>
              <dd>Park-and-ride, Orchard and 3rd</dd>
              <dd className={s.contactNote}>Thirty minutes before every meet time.</dd>
            </div>
          </dl>
        </section>
      </main>

      {/* The rings again, quieter, as the ground the footer stands on. */}
      <div className={s.coda} aria-hidden="true">
        <TabbiedPattern
          pattern={contourlines}
          palette={CODA}
          options={{ frequency: 0.8 }}
          fit="grid"
          cellSize={120}
          seed="coda"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <Artwork slug="trailhead-club-compass" alt="" inks={['var(--paper)']} className={s.footIcon} />
            <p className={s.footName}>Trailhead Club</p>
            <p className={s.footTag}>A volunteer hiking club in the Ashby Valley. Every Saturday since 1987.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Hiking</h2>
            <ul className={s.footLinks}>
              <li><a href="#hikes">The trip calendar</a></li>
              <li><a href="#grades">How we grade</a></li>
              <li><a href="#gear">What to bring</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>The club</h2>
            <ul className={s.footLinks}>
              <li><a href="#join">Membership</a></li>
              <li><a href="#first-hike">Your first hike</a></li>
              <li><a href="#contact">Club night</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Reach us</h2>
            <p className={s.footAddr}>
              hello@trailheadclub.example
              <br />
              Trail line (555) 014-2290
              <br />
              212 Orchard Street, Ashby
            </p>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional hiking club. Hikes, trails, people and prices are invented.</p>
          <p>
            Patterns by{' '}
            <a href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live on a transparent ground.
          </p>
        </div>
      </footer>
    </div>
  );
}
