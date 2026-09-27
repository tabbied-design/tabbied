import { TabbiedPattern } from 'tabbied/react';
import { odessa, sunsetrings, horizonbands, quaver, polkadot } from 'tabbied/patterns';
import s from './orbit-roller-rink.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Orbit Roller Rink: Roller skating and disco, Clearwater Flats',
  description:
    'Skate under the mirror ball on Beltline Road since 1979. This week\'s sessions, skate rental by size, skate school, birthday parties, Orbit After Dark and the rink rules.',
};

/* Site colors: the night outside and the four inks of the racing stripe.
   The same hexes as the root rule in the stylesheet. */
const NIGHT = '#1d1033';
const PINK = '#ff4f9a';
const ORANGE = '#ff9a3c';
const YELLOW = '#ffe15d';
const CYAN = '#3fd3e0';

/* The rink floor: pills of light in every ink, on the night. */
const FLOOR = [NIGHT, PINK, ORANGE, YELLOW, CYAN];
/* The skate school target, the party wall, the dance floor after dark. */
const TARGET = [NIGHT, PINK, ORANGE, CYAN, YELLOW];
const CONFETTI = ['transparent', PINK, CYAN, YELLOW, ORANGE, PINK];
const HORIZON = [NIGHT, PINK, ORANGE, NIGHT, YELLOW, CYAN];
/* Spots on the cubby backs. */
const SPOTS = ['transparent', PINK, ORANGE, YELLOW, CYAN, PINK];

const NAV = [
  ['Sessions', '#sessions'],
  ['Rental', '#rental'],
  ['Skate school', '#school'],
  ['Parties', '#parties'],
  ['After Dark', '#afterdark'],
  ['Rules', '#rules'],
  ['Visit', '#visit'],
];

/* Glitter: small four-point stars, placed by hand. */
const HERO_STARS = [
  { x: '6%', y: '12%', z: 's1' },
  { x: '44%', y: '8%', z: 's2' },
  { x: '38%', y: '86%', z: 's3' },
  { x: '96%', y: '18%', z: 's1' },
  { x: '90%', y: '92%', z: 's2' },
  { x: '52%', y: '48%', z: 's3' },
  { x: '3%', y: '70%', z: 's2' },
];

const DARK_STARS = [
  { x: '8%', y: '18%', z: 's2' },
  { x: '30%', y: '80%', z: 's1' },
  { x: '48%', y: '12%', z: 's3' },
  { x: '94%', y: '70%', z: 's1' },
  { x: '62%', y: '90%', z: 's2' },
];

type Session = { day: string; time: string; name: string; price: string; hot?: boolean };

/* The letterboard in the lobby, as it reads this week. */
const SESSIONS: Session[] = [
  { day: 'MON', time: '', name: 'CLOSED, FLOOR WAXING', price: '' },
  { day: 'TUE', time: '7-10 PM', name: 'ADULT SKATE 18+', price: '$10' },
  { day: 'WED', time: '4-6 PM', name: 'AFTER SCHOOL', price: '$8' },
  { day: 'WED', time: '7-9 PM', name: 'RETRO NIGHT', price: '$10' },
  { day: 'THU', time: '7-9:30 PM', name: 'JAM SKATE', price: '$12' },
  { day: 'FRI', time: '7-10 PM', name: 'ALL AGES DISCO', price: '$12', hot: true },
  { day: 'FRI', time: '10 PM-1 AM', name: 'ORBIT AFTER DARK 21+', price: '$15' },
  { day: 'SAT', time: '10 AM-12 PM', name: 'TOTS AND FAMILIES', price: '$8' },
  { day: 'SAT', time: '2-5 PM', name: 'MATINEE', price: '$10' },
  { day: 'SAT', time: '7-11 PM', name: 'SATURDAY NIGHT SPIN', price: '$14', hot: true },
  { day: 'SUN', time: '1-4 PM', name: 'FAMILY SKATE', price: '$9' },
  { day: 'SUN', time: '5-7 PM', name: 'SPEED AND FITNESS', price: '$10' },
];

type Cubby = { size: string; sub: string; count: string; skate?: 'a' | 'b' };

/* The rental wall: a cubby for each size, two with a skate out on show. */
const CUBBIES: Cubby[] = [
  { size: 'K10-13', sub: 'Kids', count: '14 pairs' },
  { size: '1-3', sub: 'Youth', count: '18 pairs' },
  { size: '4-5', sub: 'Adult', count: '22 pairs', skate: 'a' },
  { size: '6-7', sub: 'Adult', count: '30 pairs' },
  { size: '8-9', sub: 'Adult', count: '32 pairs' },
  { size: '10-11', sub: 'Adult', count: '26 pairs' },
  { size: '12-13', sub: 'Adult', count: '12 pairs', skate: 'b' },
  { size: '14-15', sub: 'Adult', count: '6 pairs' },
];

const RENTAL = [
  ['Classic quads', '$6'],
  ['Inline skates', '$8'],
  ['Speed skates', '$10'],
  ['Knee and wrist pads', '$3'],
  ['Helmet', 'Free under 12, $2'],
  ['Socks, if you forgot', '$2'],
  ['Locker, all session', '$1'],
];

type Lesson = { name: string; who: string; when: string; price: string; body: string; ink: 'pink' | 'orange' | 'yellow' | 'cyan' };

const LESSONS: Lesson[] = [
  { name: 'Tiny Orbiters', who: 'Ages 4-6', when: 'Sat 9:15 AM', price: '$12', body: 'Walkers, marching feet and a lot of falling down on purpose. Skates and helmets included.', ink: 'pink' },
  { name: 'Learn to Skate', who: 'Ages 7-12', when: '6 Saturdays, 11 AM', price: '$72', body: 'Stopping, crossovers, skating backwards. A badge for every level, sewn on at the snack bar.', ink: 'orange' },
  { name: 'Grown-up Beginners', who: 'Adults, any age', when: 'Tue 6 PM', price: '$15', body: 'The adult session nobody watches. Forty minutes of basics before the floor opens at seven.', ink: 'yellow' },
  { name: 'Jam and Rhythm', who: 'Ages 14 and up', when: 'Thu 6 PM', price: '$18', body: 'Footwork on the beat with coach Dee Marlowe: toe spins, shuffles and the Clearwater glide.', ink: 'cyan' },
];

type Party = { name: string; price: string; lines: string[]; ink: 'pink' | 'cyan' | 'yellow' };

const PARTIES: Party[] = [
  {
    name: 'Rookie',
    price: '$180',
    lines: ['10 skaters, skates included', '2 hours, Saturday or Sunday', 'A party table and two pizzas', 'Your name on the letterboard'],
    ink: 'cyan',
  },
  {
    name: 'All-Star',
    price: '$260',
    lines: ['15 skaters, skates included', '2.5 hours, with a party host', 'Pizza, sodas and glow sticks', 'A DJ shout-out and a birthday skate'],
    ink: 'pink',
  },
  {
    name: 'Hall of Fame',
    price: '$380',
    lines: ['20 skaters, skates included', '3 hours, 20 minutes of private floor', 'Pizza, sodas and a sheet cake', 'The mirror ball lowered, just for you'],
    ink: 'yellow',
  },
];

const AFTER_DARK = [
  { date: 'Fri 2 Oct', theme: 'Disco Inferno', dj: 'DJ Kitty Voltage' },
  { date: 'Fri 9 Oct', theme: 'Soul Train Line', dj: 'Marcus Gold' },
  { date: 'Fri 16 Oct', theme: 'Italo Nights', dj: 'Lorenza B' },
  { date: 'Fri 23 Oct', theme: 'Boogie Wonderland', dj: 'The Roller Twins' },
  { date: 'Fri 30 Oct', theme: 'Monster Skate, in costume', dj: 'DJ Kitty Voltage' },
];

const RULES = [
  'Skate the same way as everyone else: counter-clockwise, unless the DJ calls a reverse',
  'Fast skating in the speed session only',
  'Helmets on for everyone under 12',
  'Fall? Get up quick, or sit tight till a floor guard reaches you',
  'No food, drinks or phones on the floor',
  'Street shoes stay off the wood',
  'Be kind to beginners. You were one',
  'Lost property waits in the box by the snack bar for 30 days',
];

const HOURS = [
  ['Tuesday to Thursday', '4 PM-10 PM'],
  ['Friday', '4 PM-1 AM'],
  ['Saturday', '9 AM-11 PM'],
  ['Sunday', '12 PM-7 PM'],
  ['Monday', 'Closed'],
];

export default function OrbitRollerRinkPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#1d1033',
        '--pink': '#ff4f9a',
        '--orange': '#ff9a3c',
        '--yellow': '#ffe15d',
        '--cyan': '#3fd3e0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,pink,orange,yellow,cyan"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Titan+One&family=Baloo+2:wght@400..800&family=Sofia+Sans+Extra+Condensed:wght@400..900&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markRing} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Orbit</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open tonight 7-10 PM</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The rink itself: a stadium of light inside the racing stripe,
            stickers slapped on its corners, glitter everywhere. */}
        <section className={s.hero} aria-labelledby="or-hero-h">
          <div className={s.glitter} aria-hidden="true">
            {HERO_STARS.map((st) => (
              <span key={`${st.x}${st.y}`} className={`${s.star} ${s[st.z]}`} style={{ left: st.x, top: st.y }} />
            ))}
          </div>

          <div className={s.heroText}>
            <p data-edit="orHero.since" data-edit-max="240" data-edit-multiline className={s.since}>Beltline Road, since 1979</p>
            <h1 id="or-hero-h" className={s.title}>
              <span data-edit="orHero.titleBig" data-edit-max="60" className={s.titleBig}>Orbit</span>
              <span data-edit="orHero.titleSmall" data-edit-max="60" className={s.titleSmall}>Roller Rink</span>
            </h1>
            <p data-edit="orHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Twenty thousand square feet of maple, a mirror ball the size of
              a small car and a DJ booth that has not stopped spinning since
              the summer of 1979. Skates to rent in every size, lessons for
              every age, and a snack bar that does a very serious nacho.
            </p>
            <p className={s.ctas}>
              <a data-edit="orHero.btn" data-edit-max="28" className={s.btn} href="#sessions">This week&apos;s sessions</a>
              <a data-edit="orHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#parties">Book a party</a>
            </p>
          </div>

          <div className={s.rinkWrap}>
            <div data-edit-pattern="orHero.field" data-edit-roles="0,1,2,3,4" className={s.rink} aria-hidden="true">
              <TabbiedPattern
                pattern={odessa}
                palette={FLOOR}
                fit="grid"
                cellSize={44}
                seed="orbit-rink-floor"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="orbit-roller-rink-discoball"
              alt="A sticker of a mirror ball on a chain, with sparkles round it"
              inks={{ red: 'var(--pink)', blue: 'var(--cyan)', yellow: 'var(--yellow)' }}
              className={`${s.sticker} ${s.heroBall}`}
            />
            <Artwork
              slug="orbit-roller-rink-skate"
              alt="A sticker of a high-top quad roller skate in pink, with a cyan stripe and yellow wheels"
              inks={{ red: 'var(--pink)', blue: 'var(--cyan)', yellow: 'var(--yellow)', black: 'var(--night)' }}
              className={`${s.sticker} ${s.heroSkate}`}
            />
            <p className={s.rinkTag}>
              <span data-edit="orHero.rinkTagBig" data-edit-max="60" className={s.rinkTagBig}>Open tonight</span>
              <span data-edit="orHero.text" data-edit-max="60">All Ages Disco, 7-10 PM</span>
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- SESSIONS
            The felt letterboard from the lobby. */}
        <section id="sessions" className={s.sec} aria-labelledby="or-sessions-h">
          <span className={s.lane} aria-hidden="true">
            <span className={s.laneTrack} />
          </span>
          <div className={s.secHead}>
            <p data-edit="sessions.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Sessions this week</p>
            <h2 data-edit="sessions.title" data-edit-max="60" id="or-sessions-h">What&apos;s on the board</h2>
            <p data-edit="sessions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Admission includes the floor for the whole session. Skates are extra, and so is the nacho.</p>
          </div>

          <div className={s.boardWrap}>
            <div className={s.board}>
              <p data-edit="sessions.boardHead" data-edit-max="240" data-edit-multiline className={s.boardHead}>NOW SKATING AT ORBIT</p>
              <table className={s.letters}>
                <caption data-edit="sessions.srOnly" className={s.srOnly}>Sessions this week, with times and admission prices</caption>
                <thead className={s.srOnly}>
                  <tr>
                    <th data-edit="sessions.heading" scope="col">Day</th>
                    <th data-edit="sessions.heading2" scope="col">Time</th>
                    <th data-edit="sessions.heading3" scope="col">Session</th>
                    <th data-edit="sessions.heading4" scope="col">Admission</th>
                  </tr>
                </thead>
                <tbody>
                  {SESSIONS.map((row, i) => (
                    <tr key={`${row.day}${row.name}`} className={row.hot ? s.hot : undefined}>
                      <th data-edit={`sessions.heading5.${i}`} scope="row">{row.day}</th>
                      <td data-edit={`sessions.lTime.${i}`} className={s.lTime}>{row.time}</td>
                      <td data-edit={`sessions.lName.${i}`} className={s.lName}>{row.name}</td>
                      <td data-edit={`sessions.lPrice.${i}`} className={s.lPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="sessions.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>SKATE RENTAL $6 . LAST ENTRY 1 HR BEFORE CLOSE</p>
            </div>
            <Artwork
              slug="orbit-roller-rink-cassette"
              alt="A sticker of a cassette tape in orange, with cyan reels"
              inks={{ red: 'var(--orange)', blue: 'var(--cyan)', yellow: 'var(--yellow)', black: 'var(--night)' }}
              className={`${s.sticker} ${s.boardTape}`}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------- RENTAL
            The cubby wall behind the rental counter, a hole for each size. */}
        <section id="rental" className={s.sec} aria-labelledby="or-rental-h">
          <div className={s.secHead}>
            <p data-edit="rental.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Skate rental</p>
            <h2 data-edit="rental.title" data-edit-max="60" id="or-rental-h">Grab your size</h2>
            <p data-edit="rental.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>US sizes. Every pair is wiped down and re-laced after every session, and the wheels are swapped each month.</p>
          </div>

          <div className={s.rentalGrid}>
            <ul className={s.cubbies}>
              {CUBBIES.map((c, i) => (
                <li key={c.size} className={s.cubby}>
                  <p className={s.cubbyPlate}>
                    <span data-edit={`rental.cubbySize.${i}`} data-edit-max="60" className={s.cubbySize}>{c.size}</span>
                    <span data-edit={`rental.cubbySub.${i}`} data-edit-max="60" className={s.cubbySub}>{c.sub}</span>
                  </p>
                  <div className={s.cubbyHole}>
                    {c.skate === 'a' ? (
                      <Artwork
                        slug="orbit-roller-rink-skate"
                        alt="A rental skate in orange, with a pink stripe and cyan wheels"
                        inks={{ red: 'var(--orange)', blue: 'var(--pink)', yellow: 'var(--cyan)', black: 'var(--night)' }}
                        className={`${s.sticker} ${s.cubbySkate}`}
                      />
                    ) : c.skate === 'b' ? (
                      <Artwork
                        slug="orbit-roller-rink-skate"
                        alt="A rental skate in cyan, with a yellow stripe and pink wheels"
                        inks={{ red: 'var(--cyan)', blue: 'var(--yellow)', yellow: 'var(--pink)', black: 'var(--night)' }}
                        className={`${s.sticker} ${s.cubbySkate} ${s.cubbySkateFlip}`}
                      />
                    ) : (
                      <span data-edit={`rental.cubbyCount.${i}`} data-edit-max="60" className={s.cubbyCount}>{c.count}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className={s.counter}>
              <div data-edit-pattern="rental.field" data-edit-roles="transparent,1,2,3,4,1" className={s.counterSpots} aria-hidden="true">
                <TabbiedPattern
                  pattern={polkadot}
                  palette={SPOTS}
                  options={{ frequency: 0.5 }}
                  fit="grid"
                  cellSize={36}
                  seed="orbit-counter"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.counterCard}>
                <h3 data-edit="rental.counterTitle" data-edit-max="40" className={s.counterTitle}>At the counter</h3>
                <dl className={s.rentList}>
                  {RENTAL.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`rental.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`rental.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="rental.counterNote" data-edit-max="240" data-edit-multiline className={s.counterNote}>Bring your own skates any time: we sharpen toe stops and swap bearings at the pro shop, $12.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- SCHOOL */}
        <section id="school" className={s.sec} aria-labelledby="or-school-h">
          <div className={s.secHead}>
            <p data-edit="school.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Skate school</p>
            <h2 data-edit="school.title" data-edit-max="60" id="or-school-h">From wobbly to wow</h2>
            <p data-edit="school.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Small classes on a coned-off quarter of the floor. First lesson free for anyone who has never skated before.</p>
          </div>

          <div className={s.schoolGrid}>
            <div className={s.badgeWrap}>
              <div data-edit-pattern="school.field" data-edit-roles="0,1,2,4,3" className={s.badge} aria-hidden="true">
                <TabbiedPattern
                  pattern={sunsetrings}
                  palette={TARGET}
                  fit="grid"
                  cellSize={46}
                  seed="orbit-school-badge"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.badgeText}>
                <span data-edit="school.badgeBig" data-edit-max="60" className={s.badgeBig}>Level 1</span>
                <span data-edit="school.text" data-edit-max="60">Stop without a wall</span>
              </p>
            </div>
            <ol className={s.lessons}>
              {LESSONS.map((l, i) => (
                <li key={l.name} className={`${s.lesson} ${s[l.ink]}`}>
                  <div className={s.lessonHead}>
                    <h3 data-edit={`school.lessonName.${i}`} data-edit-max="40" className={s.lessonName}>{l.name}</h3>
                    <p data-edit={`school.lessonPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.lessonPrice}>{l.price}</p>
                  </div>
                  <p className={s.lessonMeta}>
                    <span data-edit={`school.text2.${i}`} data-edit-max="60">{l.who}</span>
                    <span data-edit={`school.text3.${i}`} data-edit-max="60">{l.when}</span>
                  </p>
                  <p data-edit={`school.lessonBody.${i}`} data-edit-max="240" data-edit-multiline className={s.lessonBody}>{l.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- PARTIES */}
        <section id="parties" className={s.sec} aria-labelledby="or-parties-h">
          <span className={`${s.lane} ${s.laneLeft}`} aria-hidden="true">
            <span className={s.laneTrack} />
          </span>
          <div className={s.secHead}>
            <p data-edit="parties.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Birthday parties</p>
            <h2 data-edit="parties.title" data-edit-max="60" id="or-parties-h">Roll out the party</h2>
            <p data-edit="parties.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Saturdays and Sundays, booked by the hour. We set up, we clean up, and the birthday skater leads the conga line.</p>
          </div>

          <div className={s.partyWall}>
            <div data-edit-pattern="parties.field" data-edit-roles="transparent,1,4,3,2,1" className={s.confetti} aria-hidden="true">
              <TabbiedPattern
                pattern={quaver}
                palette={CONFETTI}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={40}
                seed="orbit-party-wall"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ul className={s.tickets}>
              {PARTIES.map((p, i) => (
                <li key={p.name} className={`${s.ticket} ${s[p.ink]}`}>
                  <p data-edit={`parties.admit.${i}`} data-edit-max="240" data-edit-multiline className={s.admit}>Admit the whole crew</p>
                  <h3 data-edit={`parties.ticketName.${i}`} data-edit-max="40" className={s.ticketName}>{p.name}</h3>
                  <p data-edit={`parties.ticketPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketPrice}>{p.price}</p>
                  <ul className={s.ticketLines}>
                    {p.lines.map((line, i2) => (
                      <li data-edit={`parties.item.${i}.${i2}`} data-edit-max="80" key={line}>{line}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <Artwork
              slug="orbit-roller-rink-cassette"
              alt="A sticker of a cassette tape in pink, with yellow reels"
              inks={{ red: 'var(--pink)', blue: 'var(--night)', yellow: 'var(--yellow)', black: 'var(--cyan)' }}
              className={`${s.sticker} ${s.partyTape}`}
            />
          </div>
          <p data-edit="parties.partyNote" data-edit-max="240" data-edit-multiline className={s.partyNote}>Book at the counter or call (555) 019-7979. A $50 deposit holds the date; it comes off the bill.</p>
        </section>

        {/* ------------------------------------------------------ AFTER DARK */}
        <section id="afterdark" className={s.dark} aria-labelledby="or-dark-h">
          <div data-edit-pattern="afterdark.field" data-edit-roles="0,1,2,0,3,4" className={s.darkField} aria-hidden="true">
            <TabbiedPattern
              pattern={horizonbands}
              palette={HORIZON}
              fit="grid"
              cellSize={64}
              seed="orbit-after-dark"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.glitter} aria-hidden="true">
            {DARK_STARS.map((st) => (
              <span key={`${st.x}${st.y}`} className={`${s.star} ${s[st.z]}`} style={{ left: st.x, top: st.y }} />
            ))}
          </div>
          <div className={s.darkInner}>
            <div className={s.darkCard}>
              <p data-edit="afterdark.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Fridays, 10 PM-1 AM, 21 and over</p>
              <h2 data-edit="afterdark.darkTitle" data-edit-max="60" id="or-dark-h" className={s.darkTitle}>Orbit After Dark</h2>
              <p data-edit="afterdark.darkLede" data-edit-max="240" data-edit-multiline className={s.darkLede}>
                The lights go down, the ball comes out and the bar opens at the
                end of the snack counter. Grown-ups only, a theme every week,
                and skates for rent till midnight. $15 at the door, ID please.
              </p>
              <ol className={s.lineup}>
                {AFTER_DARK.map((n, i) => (
                  <li key={n.date}>
                    <span data-edit={`afterdark.luDate.${i}`} data-edit-max="60" className={s.luDate}>{n.date}</span>
                    <span data-edit={`afterdark.luTheme.${i}`} data-edit-max="60" className={s.luTheme}>{n.theme}</span>
                    <span data-edit={`afterdark.luDj.${i}`} data-edit-max="60" className={s.luDj}>{n.dj}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Artwork
              slug="orbit-roller-rink-discoball"
              alt="A big mirror ball sticker in orange, pink and yellow"
              inks={{ red: 'var(--orange)', blue: 'var(--pink)', yellow: 'var(--cyan)' }}
              className={`${s.sticker} ${s.darkBall}`}
            />
          </div>
        </section>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={s.sec} aria-labelledby="or-rules-h">
          <div className={s.sign}>
            <h2 data-edit="rules.signTitle" data-edit-max="60" id="or-rules-h" className={s.signTitle}>Rink rules</h2>
            <ol className={s.rules}>
              {RULES.map((r, i) => (
                <li data-edit={`rules.item.${i}`} data-edit-max="80" key={r}>{r}</li>
              ))}
            </ol>
            <p data-edit="rules.signFoot" data-edit-max="240" data-edit-multiline className={s.signFoot}>Floor guards wear the striped shirts. Wave at one if anything is wrong.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="or-visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Visit</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="or-visit-h">Find the big round sign</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Off the Beltline at exit 12, next to the bowling alley. The sign has been lit every night since 1979.</p>
          </div>

          <div className={s.visit}>
            <div className={s.visitCard}>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>1200 Beltline Road, Clearwater Flats</p>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>Free parking for 300 cars, with bike racks by the front doors. The 9 bus stops at Beltline and Ridge, a two-minute walk.</p>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550197979">(555) 019-7979</a>
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:skate@orbitrink.example">skate@orbitrink.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([day, time], i) => (
                <div key={day}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                </div>
              ))}
            </dl>
            <Artwork
              slug="orbit-roller-rink-skate"
              alt="A sticker of a roller skate in yellow, with an orange stripe and pink wheels"
              inks={{ red: 'var(--yellow)', blue: 'var(--orange)', yellow: 'var(--pink)', black: 'var(--night)' }}
              className={`${s.sticker} ${s.visitSkate}`}
            />
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="0,1,2,3,4" className={s.footFloor} aria-hidden="true">
          <TabbiedPattern
            pattern={odessa}
            palette={FLOOR}
            fit="grid"
            cellSize={30}
            seed="orbit-foot-floor"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Orbit Roller Rink</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional roller rink. The sessions, coaches, DJs and prices are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The skates, the mirror ball and the cassettes are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
