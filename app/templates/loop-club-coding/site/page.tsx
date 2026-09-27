import { TabbiedPattern } from 'tabbied/react';
import { merlon, ell, tetro, jerkinhead, bloks } from 'tabbied/patterns';
import s from './loop-club-coding.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Loop Club: Coding club for kids, Oakfield Library',
  description:
    'Loop Club teaches children aged 8-14 to code in the basement of Oakfield Library and online: Scratch Starters, Python Pioneers and Game Jam Saturdays, with volunteer mentors and a show and tell every term.',
};

/* Site colors, the same hexes as the root roles. The puzzle wall behind
   the editor is merlon on the paper ground; the project thumbnails and the
   bands reuse the same five roles. */
const WHITE = '#f7f4ee';
const INK = '#232046';
const ORANGE = '#ff8a1e';
const BLUE = '#4c97ff';
const GREEN = '#59c059';

const WALL = ['transparent', BLUE, ORANGE, GREEN, INK, BLUE];
const BAND = ['transparent', ORANGE, BLUE, GREEN, ORANGE, INK];
const DROP = [INK, ORANGE, BLUE, GREEN, WHITE, BLUE];
const BUBBLES = [WHITE, BLUE, GREEN, ORANGE, BLUE, GREEN];
const CASTLE = [BLUE, WHITE, GREEN, INK, WHITE, ORANGE];
const MAZE = [GREEN, WHITE, INK, ORANGE, WHITE, INK];
const CALENDAR = ['transparent', BLUE, GREEN, ORANGE, BLUE, GREEN];

const NAV = [
  ['Clubs', '#clubs'],
  ['Term dates', '#dates'],
  ['Projects', '#projects'],
  ['Parents', '#parents'],
  ['Mentors', '#mentors'],
  ['Sign up', '#signup'],
];

const CATEGORIES = [
  ['Motion', 'motion'],
  ['Events', 'events'],
  ['Control', 'control'],
  ['Operators', 'ops'],
];

const STARTER_FACTS = ['Tuesdays 16:00-17:30', '12 weeks', '$120 a term'];
const PYTHON_FACTS = ['Thursdays 17:00-18:30', '12 weeks', '$140 a term'];
const JAM_FACTS = ['Saturdays 10:00-13:00', 'Monthly', '$15 a jam'];

type Term = {
  term: string;
  dates: string;
  weeks: string;
  off: string;
};

const TERMS: Term[] = [
  { term: 'Autumn', dates: '16 Sep - 9 Dec', weeks: '12', off: 'No club 28 Oct - 1 Nov' },
  { term: 'Spring', dates: '13 Jan - 7 Apr', weeks: '12', off: 'No club 17 - 21 Feb' },
  { term: 'Summer', dates: '21 Apr - 14 Jul', weeks: '12', off: 'No club 26 - 30 May' },
];

const JAMS = [
  ['Sat 11 Oct', 'Theme: gravity'],
  ['Sat 8 Nov', 'Theme: things that glow'],
  ['Sat 6 Dec', 'Show and tell, parents welcome'],
  ['Sat 17 Jan', 'Theme: one button'],
];

const PROJECT_TOTALS = [
  ['412', 'projects shared'],
  ['180', 'games'],
  ['96', 'remixes'],
];

const FAQS = [
  ['Does my child need a laptop?', 'No. The library lends us twelve laptops for every session, and we have six spare. For online sessions any computer with a browser will do; a tablet is hard work.'],
  ['Do they need to know any coding?', 'Not for Scratch Starters. Python Pioneers expects a term of Scratch or something like it; if you are not sure, come to a taster and the mentors will say.'],
  ['Can I stay and watch?', 'You are welcome to stay for the first session. After that we ask parents to wait upstairs in the library, which has a cafe and a lot of books.'],
  ['What if we miss a week?', 'Every session is written up on the club page, so a missed week can be caught up at home. We do not refund single weeks, but we do move children between days.'],
  ['Is there help with the cost?', 'Yes. A third of places are free or half price, no questions and no forms, thanks to the Oakfield Library Friends. Tick the box on the sign-up form.'],
  ['Who looks after them?', 'Every session has a lead teacher and at least one mentor for every five children. All of us are background checked and first aid trained.'],
];

type Mentor = {
  name: string;
  job: string;
  helps: string;
  sessions: string;
};

const MENTORS: Mentor[] = [
  { name: 'Dev Raman', job: 'Games programmer', helps: 'Game Jam Saturdays', sessions: '64 sessions' },
  { name: 'Hollie Brandt', job: 'Maths student, Oakfield College', helps: 'Python Pioneers', sessions: '38 sessions' },
  { name: 'Marcus Oyelaran', job: 'Retired engineer', helps: 'Scratch Starters', sessions: '112 sessions' },
  { name: 'Yuki Tan', job: 'Web developer', helps: 'Online sessions', sessions: '27 sessions' },
];

const VISIT = [
  ['Where', 'Oakfield Library, lower ground floor. Take the lift by the children\'s books.'],
  ['Online', 'The same sessions on a video call, link sent on the Monday.'],
  ['Next taster', 'Saturday 4 October, 10:00-11:00'],
];

const MENTOR_ASKS = [
  'Two sessions a month, for a term',
  'A background check, which we arrange and pay for',
  'A two-hour training evening in September',
  'Patience with a cat that will not stop spinning',
];

export default function LoopClubCodingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--white': '#f7f4ee',
        '--ink': '#232046',
        '--orange': '#ff8a1e',
        '--blue': '#4c97ff',
        '--green': '#59c059',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="white,ink,orange,blue,green"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Mali:wght@500;600;700&family=Varela+Round&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markLoop} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Loop Club</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#signup">Sign up</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The editor, open on the puzzle wall: the block categories, the
            club written as a script, and the stage with its three sprites
            and their coordinates in the sprite list. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,4,1,3" className={s.wall} aria-hidden="true">
            <TabbiedPattern
              pattern={merlon}
              palette={WALL}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={48}
              seed="loop-club-wall"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.editor}>
            <div className={s.tabs} aria-hidden="true">
              <span data-edit="hero.tabOn" data-edit-max="60" className={s.tabOn}>Code</span>
              <span data-edit="hero.text" data-edit-max="60">Costumes</span>
              <span data-edit="hero.text2" data-edit-max="60">Sounds</span>
            </div>

            <ul className={s.rail} aria-hidden="true">
              {CATEGORIES.map(([label, cat], i) => (
                <li key={label} className={s[cat]}>
                  <span className={s.railDot} />
                  <span data-edit={`hero.railLabel.${i}`} data-edit-max="60" className={s.railLabel}>{label}</span>
                </li>
              ))}
            </ul>

            <div className={s.scriptArea}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Coding club for kids, ages 8-14</p>
              <h1 data-edit="hero.title" data-edit-max="70" id="hero-h" className={s.title}>Loop Club</h1>
              <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                After school in the basement of Oakfield Library, and online.
                Children build games, animations and odd little machines in
                Scratch and Python, with a mentor at every table.
              </p>

              <div className={s.script}>
                <p className={`${s.hat} ${s.events}`}>
                  <span data-edit="hero.text3" data-edit-max="60">when</span>
                  <span className={s.flag} role="img" aria-label="green flag" />
                  <span data-edit="hero.text4" data-edit-max="60">clicked</span>
                </p>
                <p className={`${s.block} ${s.ops}`}>
                  <span data-edit="hero.text5" data-edit-max="60">set</span>
                  <span data-edit="hero.drop" data-edit-max="60" className={s.drop}>age</span>
                  <span data-edit="hero.text6" data-edit-max="60">to</span>
                  <span data-edit="hero.slot" data-edit-max="60" className={s.slot}>8-14</span>
                </p>
                <p className={`${s.block} ${s.motion}`}>
                  <span data-edit="hero.text7" data-edit-max="60">go to</span>
                  <span data-edit="hero.drop2" data-edit-max="60" className={s.drop}>Oakfield Library basement</span>
                </p>
                <div className={`${s.cblock} ${s.control}`}>
                  <p className={s.cTop}>
                    <span data-edit="hero.text8" data-edit-max="60">repeat</span>
                    <span data-edit="hero.slot2" data-edit-max="60" className={s.slot}>12</span>
                    <span data-edit="hero.text9" data-edit-max="60">weeks</span>
                  </p>
                  <div className={s.cMouth}>
                    <p className={`${s.block} ${s.ops}`}>
                      <span data-edit="hero.text10" data-edit-max="60">make a</span>
                      <span data-edit="hero.drop3" data-edit-max="60" className={s.drop}>game</span>
                      <span data-edit="hero.text11" data-edit-max="60">with</span>
                      <span data-edit="hero.drop4" data-edit-max="60" className={s.drop}>friends</span>
                    </p>
                    <p className={`${s.block} ${s.motion}`}>
                      <span data-edit="hero.text12" data-edit-max="60">say</span>
                      <span data-edit="hero.slot3" data-edit-max="60" className={s.slot}>I made that!</span>
                      <span data-edit="hero.text13" data-edit-max="60">for</span>
                      <span data-edit="hero.slot4" data-edit-max="60" className={s.slot}>2</span>
                      <span data-edit="hero.text14" data-edit-max="60">seconds</span>
                    </p>
                  </div>
                  <span className={s.cBottom} aria-hidden="true" />
                </div>
                <p className={`${s.block} ${s.events} ${s.capBlock}`}>
                  <span data-edit="hero.text15" data-edit-max="60">broadcast</span>
                  <span data-edit="hero.drop5" data-edit-max="60" className={s.drop}>show and tell</span>
                </p>
              </div>

              <div className={s.heroActions}>
                <a data-edit="hero.pillBtn" data-edit-max="28" className={s.pillBtn} href="#signup">Sign up for autumn</a>
                <a data-edit="hero.pillLine" data-edit-max="28" className={s.pillLine} href="#clubs">See the three clubs</a>
              </div>
            </div>

            <div className={s.stageCol}>
              <div className={s.stageBar} aria-hidden="true">
                <span className={s.goFlag} />
                <span className={s.stop} />
                <span data-edit="hero.stageName" data-edit-max="60" className={s.stageName}>Stage</span>
              </div>
              <div className={s.stage}>
                <span className={s.axes} aria-hidden="true" />
                <p className={s.monitors}>
                  <span className={s.monitor}>
                    <span data-edit="hero.monitorName" data-edit-max="60" className={s.monitorName}>members</span>
                    <span data-edit="hero.monitorValue" data-edit-max="60" className={s.monitorValue}>64</span>
                  </span>
                  <span className={s.monitor}>
                    <span data-edit="hero.monitorName2" data-edit-max="60" className={s.monitorName}>mentors</span>
                    <span data-edit="hero.monitorValue2" data-edit-max="60" className={s.monitorValue}>14</span>
                  </span>
                </p>
                <figure className={`${s.sprite} ${s.spriteRobot}`}>
                  <Artwork
                    slug="loop-club-coding-robot"
                    alt="Robo, a round robot with an antenna, waving"
                    inks={{ red: 'var(--orange)', blue: 'var(--blue)', yellow: 'var(--green)', black: 'var(--text)' }}
                    className={s.spriteArt}
                  />
                  <figcaption data-edit="hero.spriteXY" data-edit-max="120" data-edit-multiline className={s.spriteXY}>x: -130 y: -62</figcaption>
                </figure>
                <figure className={`${s.sprite} ${s.spriteRocket}`}>
                  <Artwork
                    slug="loop-club-coding-rocket"
                    alt="Zoom, a chunky rocket with round windows, taking off"
                    inks={{ red: 'var(--orange)', blue: 'var(--ink)', yellow: 'var(--green)', black: 'var(--blue)' }}
                    className={s.spriteArt}
                  />
                  <figcaption data-edit="hero.spriteXY2" data-edit-max="120" data-edit-multiline className={s.spriteXY}>x: 150 y: 60</figcaption>
                </figure>
                <figure className={`${s.sprite} ${s.spriteBulb}`}>
                  <Artwork
                    slug="loop-club-coding-bulb"
                    alt="Idea, a light bulb with rays"
                    inks={{ blue: 'var(--blue)', yellow: 'var(--orange)' }}
                    className={s.spriteArt}
                  />
                  <figcaption data-edit="hero.spriteXY3" data-edit-max="120" data-edit-multiline className={s.spriteXY}>x: -24 y: 118</figcaption>
                </figure>
                <p data-edit="hero.mouse" data-edit-max="240" data-edit-multiline className={s.mouse}>x: 142 y: -36</p>
              </div>

              <ul className={s.spriteList}>
                <li className={s.spriteTile}>
                  <Artwork
                    slug="loop-club-coding-robot"
                    alt=""
                    inks={{ red: 'var(--orange)', blue: 'var(--blue)', yellow: 'var(--green)', black: 'var(--text)' }}
                    className={s.tileArt}
                  />
                  <span data-edit="hero.tileName" data-edit-max="60" className={s.tileName}>Robo</span>
                  <span data-edit="hero.tileXY" data-edit-max="60" className={s.tileXY}>x -130, y -62</span>
                </li>
                <li className={`${s.spriteTile} ${s.tileOn}`}>
                  <Artwork
                    slug="loop-club-coding-rocket"
                    alt=""
                    inks={{ red: 'var(--orange)', blue: 'var(--ink)', yellow: 'var(--green)', black: 'var(--blue)' }}
                    className={s.tileArt}
                  />
                  <span data-edit="hero.tileName2" data-edit-max="60" className={s.tileName}>Zoom</span>
                  <span data-edit="hero.tileXY2" data-edit-max="60" className={s.tileXY}>x 150, y 60</span>
                </li>
                <li className={s.spriteTile}>
                  <Artwork
                    slug="loop-club-coding-bulb"
                    alt=""
                    inks={{ blue: 'var(--blue)', yellow: 'var(--orange)' }}
                    className={s.tileArt}
                  />
                  <span data-edit="hero.tileName3" data-edit-max="60" className={s.tileName}>Idea</span>
                  <span data-edit="hero.tileXY3" data-edit-max="60" className={s.tileXY}>x -24, y 118</span>
                </li>
              </ul>

              <p data-edit="hero.comment" data-edit-max="240" data-edit-multiline className={s.comment}>
                This week: Robo learns to jump, and Zoom needs a countdown.
                Bring a USB stick if you want to take your game home.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- CLUBS
            Each club is a C-block: its hat in the category color, the
            mascot sprite inside, the facts as reporters and booleans. */}
        <section id="clubs" className={s.sec} aria-labelledby="clubs-h">
          <div className={s.secHead}>
            <div className={`${s.hatHead} ${s.events}`}>
              <span data-edit="clubs.hatWord" data-edit-max="60" className={s.hatWord}>when I receive</span>
              <h2 data-edit="clubs.hatTitle" data-edit-max="60" id="clubs-h" className={s.hatTitle}>Clubs</h2>
            </div>
            <p data-edit="clubs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three ways in. Most children start with Scratch, move to Python
              around eleven, and come to the jams whatever they are learning.
            </p>
          </div>

          <ul className={s.clubs}>
            <li className={`${s.club} ${s.events}`}>
              <div className={s.clubHat}>
                <h3 data-edit="clubs.clubName" data-edit-max="40" className={s.clubName}>Scratch Starters</h3>
                <span data-edit="clubs.clubAge" data-edit-max="60" className={s.clubAge}>ages 8-10</span>
              </div>
              <div className={s.clubMouth}>
                <Artwork
                  slug="loop-club-coding-robot"
                  alt="Robo the robot, the Scratch Starters mascot"
                  inks={{ red: 'var(--orange)', blue: 'var(--ink)', yellow: 'var(--blue)', black: 'var(--text)' }}
                  className={s.mascot}
                />
                <p data-edit="clubs.clubAbout" data-edit-max="240" data-edit-multiline className={s.clubAbout}>
                  Drag, drop, press the green flag. Sprites that move, talk and
                  bump into things, then a first whole game by week twelve.
                </p>
                <ul className={s.reporters}>
                  {STARTER_FACTS.map((f, i) => (
                    <li data-edit={`clubs.item.${i}`} data-edit-max="80" key={f}>{f}</li>
                  ))}
                </ul>
                <ul className={s.booleans}>
                  <li data-edit="clubs.item2" data-edit-max="80">laptops provided</li>
                  <li data-edit="clubs.item3" data-edit-max="80">no experience needed</li>
                </ul>
              </div>
              <span className={s.clubFoot} aria-hidden="true" />
            </li>

            <li className={`${s.club} ${s.motion}`}>
              <div className={s.clubHat}>
                <h3 data-edit="clubs.clubName2" data-edit-max="40" className={s.clubName}>Python Pioneers</h3>
                <span data-edit="clubs.clubAge2" data-edit-max="60" className={s.clubAge}>ages 11-14</span>
              </div>
              <div className={s.clubMouth}>
                <Artwork
                  slug="loop-club-coding-rocket"
                  alt="Zoom the rocket, the Python Pioneers mascot"
                  inks={{ red: 'var(--blue)', blue: 'var(--orange)', yellow: 'var(--green)', black: 'var(--text)' }}
                  className={s.mascot}
                />
                <p data-edit="clubs.clubAbout2" data-edit-max="240" data-edit-multiline className={s.clubAbout}>
                  Real typed code: variables, loops, lists and functions,
                  through small programs that draw, guess, quiz and play.
                </p>
                <ul className={s.reporters}>
                  {PYTHON_FACTS.map((f, i) => (
                    <li data-edit={`clubs.item4.${i}`} data-edit-max="80" key={f}>{f}</li>
                  ))}
                </ul>
                <ul className={s.booleans}>
                  <li data-edit="clubs.item5" data-edit-max="80">laptops provided</li>
                  <li data-edit="clubs.item6" data-edit-max="80">a term of Scratch first</li>
                </ul>
              </div>
              <span className={s.clubFoot} aria-hidden="true" />
            </li>

            <li className={`${s.club} ${s.ops}`}>
              <div className={s.clubHat}>
                <h3 data-edit="clubs.clubName3" data-edit-max="40" className={s.clubName}>Game Jam Saturdays</h3>
                <span data-edit="clubs.clubAge3" data-edit-max="60" className={s.clubAge}>ages 8-14</span>
              </div>
              <div className={s.clubMouth}>
                <Artwork
                  slug="loop-club-coding-bulb"
                  alt="Idea the light bulb, the Game Jam mascot"
                  inks={{ blue: 'var(--ink)', yellow: 'var(--green)' }}
                  className={s.mascot}
                />
                <p data-edit="clubs.clubAbout3" data-edit-max="240" data-edit-multiline className={s.clubAbout}>
                  One theme, three hours, teams of two or three. Pizza at
                  noon, then everyone plays everyone else&apos;s game.
                </p>
                <ul className={s.reporters}>
                  {JAM_FACTS.map((f, i) => (
                    <li data-edit={`clubs.item7.${i}`} data-edit-max="80" key={f}>{f}</li>
                  ))}
                </ul>
                <ul className={s.booleans}>
                  <li data-edit="clubs.item8" data-edit-max="80">any language</li>
                  <li data-edit="clubs.item9" data-edit-max="80">pizza included</li>
                </ul>
              </div>
              <span className={s.clubFoot} aria-hidden="true" />
            </li>
          </ul>
        </section>

        {/* ------------------------------------------------------ TERM DATES */}
        <section id="dates" className={s.sec} aria-labelledby="dates-h">
          <div className={s.secHead}>
            <div className={`${s.hatHead} ${s.control}`}>
              <span data-edit="dates.hatWord" data-edit-max="60" className={s.hatWord}>when I receive</span>
              <h2 data-edit="dates.hatTitle" data-edit-max="60" id="dates-h" className={s.hatTitle}>Term dates</h2>
            </div>
            <p data-edit="dates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Clubs follow the Oakfield school terms. Online sessions run on the
              same days, at the same times, on a video call.
            </p>
          </div>

          <div className={s.dates}>
            <ol className={s.terms}>
              {TERMS.map((t, i) => (
                <li key={t.term} className={`${s.cblock} ${s.control} ${s.termBlock}`}>
                  <p className={s.cTop}>
                    <span data-edit={`dates.text.${i}`} data-edit-max="60">repeat</span>
                    <span data-edit={`dates.slot.${i}`} data-edit-max="60" className={s.slot}>{t.weeks}</span>
                    <span data-edit={`dates.text2.${i}`} data-edit-max="60">weeks of</span>
                    <span data-edit={`dates.drop.${i}`} data-edit-max="60" className={s.drop}>{t.term}</span>
                  </p>
                  <div className={s.cMouth}>
                    <p className={`${s.block} ${s.motion}`}>
                      <span data-edit={`dates.text3.${i}`} data-edit-max="60">glide from</span>
                      <span data-edit={`dates.slot2.${i}`} data-edit-max="60" className={s.slot}>{t.dates}</span>
                    </p>
                    <p className={`${s.block} ${s.ops}`}>
                      <span data-edit={`dates.text4.${i}`} data-edit-max="60">skip</span>
                      <span data-edit={`dates.slot3.${i}`} data-edit-max="60" className={s.slot}>{t.off}</span>
                    </p>
                  </div>
                  <span className={s.cBottom} aria-hidden="true" />
                </li>
              ))}
            </ol>

            <aside className={s.jams} aria-labelledby="jams-h">
              <div data-edit-pattern="jams.field" data-edit-roles="transparent,3,4,2,3,4" className={s.jamsField} aria-hidden="true">
                <TabbiedPattern
                  pattern={ell}
                  palette={CALENDAR}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={32}
                  seed="loop-club-calendar"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.jamsCard}>
                <h3 data-edit="jams.jamsTitle" data-edit-max="40" id="jams-h" className={s.jamsTitle}>Next game jams</h3>
                <dl className={s.jamList}>
                  {JAMS.map(([date, theme], i) => (
                    <div key={date}>
                      <dt data-edit={`jams.term.${i}`} data-edit-max="28">{date}</dt>
                      <dd data-edit={`jams.body.${i}`} data-edit-max="200" data-edit-multiline>{theme}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="jams.jamsNote" data-edit-max="240" data-edit-multiline className={s.jamsNote}>Jams are booked one at a time, from the first of the month before.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------------- PROJECTS
            Project cards the way the sharing page shows them: thumbnail,
            title, maker, loves and remixes. */}
        <section id="projects" className={s.projectsSec} aria-labelledby="projects-h">
          <div className={s.projectsInner}>
            <div className={s.secHead}>
              <div className={`${s.hatHead} ${s.motion}`}>
                <span data-edit="projects.hatWord" data-edit-max="60" className={s.hatWord}>when I receive</span>
                <h2 data-edit="projects.hatTitle" data-edit-max="60" id="projects-h" className={s.hatTitle}>What they make</h2>
              </div>
              <p data-edit="projects.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Everything made at Loop Club is shared on the club page, where
                other members can play it, love it and remix it. Four from this
                year.
              </p>
            </div>

            <ul className={s.projects}>
              <li className={s.project}>
                <div data-edit-pattern="projects.field" data-edit-roles="1,2,3,4,0,3" className={s.thumb} aria-hidden="true">
                  <TabbiedPattern pattern={tetro} palette={DROP} fit="grid" cellSize={28} seed="loop-club-block-drop" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className={s.projectBody}>
                  <h3 data-edit="projects.projectTitle" data-edit-max="40" className={s.projectTitle}>Block Drop</h3>
                  <p data-edit="projects.projectMaker" data-edit-max="240" data-edit-multiline className={s.projectMaker}>by Priya, 11, Python Pioneers</p>
                  <p data-edit="projects.projectAbout" data-edit-max="240" data-edit-multiline className={s.projectAbout}>Falling shapes, a score that speeds things up, and a high-score table saved to a file.</p>
                  <p className={s.projectStats}>
                    <span data-edit="projects.loves" data-edit-max="60" className={s.loves}>48 loves</span>
                    <span data-edit="projects.remixes" data-edit-max="60" className={s.remixes}>6 remixes</span>
                  </p>
                </div>
              </li>
              <li className={s.project}>
                <div data-edit-pattern="projects.field2" data-edit-roles="0,3,4,2,3,4" className={s.thumb} aria-hidden="true">
                  <TabbiedPattern pattern={bloks} palette={BUBBLES} fit="grid" cellSize={36} seed="loop-club-bubble-pop" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className={s.projectBody}>
                  <h3 data-edit="projects.projectTitle2" data-edit-max="40" className={s.projectTitle}>Bubble Pop</h3>
                  <p data-edit="projects.projectMaker2" data-edit-max="240" data-edit-multiline className={s.projectMaker}>by Theo, 8, Scratch Starters</p>
                  <p data-edit="projects.projectAbout2" data-edit-max="240" data-edit-multiline className={s.projectAbout}>Pop the bubbles before they float away. Every tenth one plays a song Theo recorded.</p>
                  <p className={s.projectStats}>
                    <span data-edit="projects.loves2" data-edit-max="60" className={s.loves}>31 loves</span>
                    <span data-edit="projects.remixes2" data-edit-max="60" className={s.remixes}>12 remixes</span>
                  </p>
                </div>
              </li>
              <li className={s.project}>
                <div data-edit-pattern="projects.field3" data-edit-roles="3,0,4,1,0,2" className={s.thumb} aria-hidden="true">
                  <TabbiedPattern pattern={jerkinhead} palette={CASTLE} fit="grid" cellSize={30} seed="loop-club-castle-run" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className={s.projectBody}>
                  <h3 data-edit="projects.projectTitle3" data-edit-max="40" className={s.projectTitle}>Castle Run</h3>
                  <p data-edit="projects.projectMaker3" data-edit-max="240" data-edit-multiline className={s.projectMaker}>by Amara and Jonah, 13, Game Jam, theme: gravity</p>
                  <p data-edit="projects.projectAbout3" data-edit-max="240" data-edit-multiline className={s.projectAbout}>A knight who can flip the castle upside down. Built in three hours; still being finished.</p>
                  <p className={s.projectStats}>
                    <span data-edit="projects.loves3" data-edit-max="60" className={s.loves}>67 loves</span>
                    <span data-edit="projects.remixes3" data-edit-max="60" className={s.remixes}>3 remixes</span>
                  </p>
                </div>
              </li>
              <li className={s.project}>
                <div data-edit-pattern="projects.field4" data-edit-roles="4,0,1,2,0,1" className={s.thumb} aria-hidden="true">
                  <TabbiedPattern pattern={ell} palette={MAZE} fit="grid" cellSize={26} seed="loop-club-library-maze" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className={s.projectBody}>
                  <h3 data-edit="projects.projectTitle4" data-edit-max="40" className={s.projectTitle}>Library Maze</h3>
                  <p data-edit="projects.projectMaker4" data-edit-max="240" data-edit-multiline className={s.projectMaker}>by Sofia, 10, Scratch Starters</p>
                  <p data-edit="projects.projectAbout4" data-edit-max="240" data-edit-multiline className={s.projectAbout}>A maze of the library upstairs, drawn from the fire exit plan, with the librarian as the boss.</p>
                  <p className={s.projectStats}>
                    <span data-edit="projects.loves4" data-edit-max="60" className={s.loves}>52 loves</span>
                    <span data-edit="projects.remixes4" data-edit-max="60" className={s.remixes}>9 remixes</span>
                  </p>
                </div>
              </li>
            </ul>

            <dl className={s.totals}>
              {PROJECT_TOTALS.map(([figure, label], i) => (
                <div key={label}>
                  <dt data-edit={`projects.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`projects.body.${i}`} data-edit-max="200" data-edit-multiline>{figure}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- PARENTS
            Each question is an "if" block: the question in its boolean
            slot, the answer in the mouth. */}
        <section id="parents" className={s.sec} aria-labelledby="parents-h">
          <div className={s.secHead}>
            <div className={`${s.hatHead} ${s.ops}`}>
              <span data-edit="parents.hatWord" data-edit-max="60" className={s.hatWord}>when I receive</span>
              <h2 data-edit="parents.hatTitle" data-edit-max="60" id="parents-h" className={s.hatTitle}>For parents</h2>
            </div>
            <p data-edit="parents.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The questions we are asked most at the door. Anything else, ask
              Nell, who runs the club: (555) 012-7730.
            </p>
          </div>

          <div className={s.faqs}>
            {FAQS.map(([q, a], i) => (
              <details key={q} className={`${s.faq} ${s.control}`} open={i === 0}>
                <summary className={s.faqTop}>
                  <span data-edit={`parents.faqIf.${i}`} data-edit-max="60" className={s.faqIf}>if</span>
                  <span data-edit={`parents.faqQ.${i}`} data-edit-max="60" className={s.faqQ}>{q}</span>
                  <span data-edit={`parents.faqThen.${i}`} data-edit-max="60" className={s.faqThen}>then</span>
                </summary>
                <div className={s.faqMouth}>
                  <p data-edit={`parents.faqA.${i}`} data-edit-max="240" data-edit-multiline className={s.faqA}>{a}</p>
                </div>
                <span className={s.faqFoot} aria-hidden="true" />
              </details>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- MENTORS */}
        <section id="mentors" className={s.mentorsSec} aria-labelledby="mentors-h">
          <div data-edit-pattern="mentors.field" data-edit-roles="transparent,2,3,4,2,1" className={s.mentorBand} aria-hidden="true">
            <TabbiedPattern
              pattern={merlon}
              palette={BAND}
              fit="grid"
              cellSize={40}
              seed="loop-club-mentor-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.mentorsInner}>
            <div className={s.secHead}>
              <div className={`${s.hatHead} ${s.control}`}>
                <span data-edit="mentors.hatWord" data-edit-max="60" className={s.hatWord}>define</span>
                <h2 data-edit="mentors.hatTitle" data-edit-max="60" id="mentors-h" className={s.hatTitle}>Volunteer mentors</h2>
              </div>
              <p data-edit="mentors.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Fourteen volunteers sit with the children, one to every five.
                Most write code for a living; some have simply learned a lot
                from their own kids.
              </p>
            </div>

            <div className={s.mentors}>
              <ul className={s.mentorList}>
                {MENTORS.map((m, i) => (
                  <li key={m.name} className={s.mentor}>
                    <span className={s.mentorInitial} aria-hidden="true">{m.name.slice(0, 1)}</span>
                    <h3 data-edit={`mentors.mentorName.${i}`} data-edit-max="40" className={s.mentorName}>{m.name}</h3>
                    <p data-edit={`mentors.mentorJob.${i}`} data-edit-max="240" data-edit-multiline className={s.mentorJob}>{m.job}</p>
                    <p data-edit={`mentors.mentorHelps.${i}`} data-edit-max="240" data-edit-multiline className={s.mentorHelps}>{m.helps}</p>
                    <p data-edit={`mentors.mentorSessions.${i}`} data-edit-max="240" data-edit-multiline className={s.mentorSessions}>{m.sessions}</p>
                  </li>
                ))}
              </ul>

              <div className={s.asks}>
                <h3 data-edit="mentors.asksTitle" data-edit-max="40" className={s.asksTitle}>What we ask of a mentor</h3>
                <ul className={s.askList}>
                  {MENTOR_ASKS.map((a, i) => (
                    <li key={a} className={`${s.block} ${s.motion}`}>
                      <span data-edit={`mentors.text.${i}`} data-edit-max="60">{a}</span>
                    </li>
                  ))}
                </ul>
                <p data-edit="mentors.asksNote" data-edit-max="240" data-edit-multiline className={s.asksNote}>Write to Nell, then come and sit in on a Tuesday first.</p>
                <p className={s.asksMail}>
                  <a data-edit="mentors.link" data-edit-max="28" href="mailto:mentors@loopclub.example">mentors@loopclub.example</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SIGN UP
            The form is a script: every answer sets a variable, and the
            button broadcasts it. */}
        <section id="signup" className={s.sec} aria-labelledby="signup-h">
          <div className={s.secHead}>
            <div className={`${s.hatHead} ${s.events}`}>
              <span data-edit="signup.hatWord" data-edit-max="60" className={s.hatWord}>when I receive</span>
              <h2 data-edit="signup.hatTitle" data-edit-max="60" id="signup-h" className={s.hatTitle}>Sign up</h2>
            </div>
            <p data-edit="signup.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Places for the autumn term are given in the order we hear from
              you. We reply within two days with a start date, or a place on the
              waiting list.
            </p>
          </div>

          <div className={s.signup}>
          <form className={s.form} action="#">
            <div className={`${s.hat} ${s.events}`}>
              <span data-edit="signup.text" data-edit-max="60">when</span>
              <span data-edit="signup.formHatDrop" data-edit-max="60" className={s.formHatDrop}>sign up</span>
              <span data-edit="signup.text2" data-edit-max="60">clicked</span>
            </div>
            <div className={`${s.formBlock} ${s.ops}`}>
              <label data-edit="signup.label" htmlFor="lc-child">set child&apos;s name to</label>
              <input id="lc-child" name="child" type="text" autoComplete="off" />
            </div>
            <div className={`${s.formBlock} ${s.ops}`}>
              <label data-edit="signup.label2" htmlFor="lc-age">set age to</label>
              <select id="lc-age" name="age" defaultValue="9">
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
              </select>
            </div>
            <div className={`${s.formBlock} ${s.motion}`}>
              <label data-edit="signup.label3" htmlFor="lc-club">go to club</label>
              <select id="lc-club" name="club" defaultValue="starters">
                <option value="starters">Scratch Starters, Tuesdays</option>
                <option value="python">Python Pioneers, Thursdays</option>
                <option value="jam">Game Jam Saturdays</option>
                <option value="online">Online, either club</option>
              </select>
            </div>
            <div className={`${s.formBlock} ${s.control}`}>
              <label data-edit="signup.label4" htmlFor="lc-parent">set grown-up&apos;s name to</label>
              <input id="lc-parent" name="parent" type="text" autoComplete="name" />
            </div>
            <div className={`${s.formBlock} ${s.control}`}>
              <label data-edit="signup.label5" htmlFor="lc-email">set email to</label>
              <input id="lc-email" name="email" type="email" autoComplete="email" />
            </div>
            <div className={`${s.formBlock} ${s.control}`}>
              <label data-edit="signup.label6" htmlFor="lc-phone">set phone to</label>
              <input id="lc-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className={`${s.formBlock} ${s.motion} ${s.formWide}`}>
              <label data-edit="signup.label7" htmlFor="lc-notes">ask anything we should know? and wait</label>
              <textarea id="lc-notes" name="notes" rows={3} />
            </div>
            <div className={`${s.formBlock} ${s.ops} ${s.formCheck}`}>
              <input id="lc-help" name="help" type="checkbox" />
              <label data-edit="signup.label8" htmlFor="lc-help">if a free or half-price place would help, then tick</label>
            </div>
            <button data-edit="signup.submit" data-edit-max="24" className={`${s.submit} ${s.events}`} type="submit">broadcast sign me up</button>
          </form>

          <aside className={s.visit} aria-labelledby="visit-h">
            <Artwork
              slug="loop-club-coding-bulb"
              alt=""
              inks={{ blue: 'var(--text)', yellow: 'var(--orange)' }}
              className={s.visitBulb}
            />
            <h3 data-edit="visit.visitTitle" data-edit-max="40" id="visit-h" className={s.visitTitle}>Come to a taster first</h3>
            <p data-edit="visit.visitText" data-edit-max="240" data-edit-multiline className={s.visitText}>
              Free, an hour, the first Saturday of every month at 10:00.
              Children try both clubs; grown-ups meet the mentors.
            </p>
            <dl className={s.visitList}>
              {VISIT.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>Nell Achterberg, club lead: (555) 012-7730</p>
          </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,4,1,3" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={merlon}
            palette={WALL}
            fit="grid"
            cellSize={30}
            seed="loop-club-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Loop Club</p>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>Oakfield Library, lower ground floor, 2 Quarry Lane, Oakfield</p>
            <p className={s.footText}>
              <a data-edit="footer.link" data-edit-max="28" href="mailto:hello@loopclub.example">hello@loopclub.example</a>
            </p>
          </div>
          <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional coding club for children. The clubs, people, projects and prices are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footText3" data-edit-max="240" data-edit-multiline className={s.footText}>The sprites are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
