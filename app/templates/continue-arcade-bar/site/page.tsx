import { TabbiedPattern } from 'tabbied/react';
import { subdivide, tetro, dotmatrix, circuit, ziggurat } from 'tabbied/patterns';
import s from './continue-arcade-bar.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Continue?: Arcade bar, 66 Bitmap Alley, Lowtown',
  description:
    'Forty arcade cabinets, six pinball tables and a bar, in Lowtown. The games, the drinks as a high-score table, tournament nights, private hire and opening hours.',
};

/* Site colors: the SAME hexes as the root roles in the stylesheet. */
const VOID = '#0e0b1e';
const WHITE = '#f4f1e8';
const PINK = '#ff3d6e';
const GREEN = '#3ddc84';
const YELLOW = '#ffd23f';

/* The planet on the title screen, in chunky quartered pixels. */
const PLANET = [PINK, YELLOW, PINK, WHITE, YELLOW, GREEN];
/* Falling blocks behind the new arrival. */
const BLOCKS = ['transparent', PINK, GREEN, YELLOW, WHITE, PINK];
/* The world map's terrain. */
const TERRAIN = ['transparent', GREEN, GREEN, YELLOW, WHITE, GREEN];
/* The inside of the coin door. */
const BOARD = ['transparent', GREEN, PINK, YELLOW, WHITE, GREEN];
/* The streets of Lowtown from above. */
const CITY = ['transparent', PINK, WHITE, PINK, YELLOW, GREEN];
/* The ground the credits stand on. */
const GROUND = [VOID, PINK, YELLOW, GREEN, PINK, WHITE];

/* Sprite inks, one role per layer so the shapes stay apart in any palette. */
const CABINET_INKS = { red: 'var(--pink)', blue: 'var(--green)', yellow: 'var(--yellow)', black: 'var(--void)' };
const JOYSTICK_INKS = { red: 'var(--pink)', blue: 'var(--green)', yellow: 'var(--yellow)', black: 'var(--text)' };
const ROCKET_INKS = { red: 'var(--white)', blue: 'var(--pink)', yellow: 'var(--yellow)', black: 'var(--void)' };
const HEART_INKS = { red: 'var(--pink)', blue: 'var(--white)', yellow: 'var(--yellow)', black: 'var(--void)' };

const NAV = [
  ['1-1', 'The games', '#games'],
  ['1-2', 'Drinks', '#drinks'],
  ['1-3', 'Tournaments', '#tournaments'],
  ['2-1', 'Private hire', '#hire'],
  ['2-2', 'Hours', '#hours'],
  ['2-3', 'Find us', '#find'],
];

const LIVES = [0, 1, 2];

type Game = { title: string; year: string; kind: string; count: string; players: string };

const CABINETS: Game[] = [
  { title: 'Astro Raiders', year: '1979', kind: 'Space shooter', count: 'x2', players: '1-2P' },
  { title: 'Maze Muncher', year: '1980', kind: 'Maze chase', count: 'x3', players: '1-2P' },
  { title: 'Barrel Bros.', year: '1981', kind: 'Platformer', count: 'x1', players: '1-2P' },
  { title: 'Hyper Volley', year: '1984', kind: 'Sports', count: 'x2', players: '1-4P' },
  { title: 'Dragon Bubbles', year: '1986', kind: 'Puzzle platformer', count: 'x2', players: '1-2P' },
  { title: 'Kaiju Punch', year: '1987', kind: 'Brawler', count: 'x1', players: '1-2P' },
  { title: 'Turbo Drift', year: '1989', kind: 'Sit-down racer', count: 'x2', players: '1P' },
  { title: 'Street Rumble II', year: '1992', kind: 'Fighting', count: 'x4', players: '1-2P' },
];

const PINBALL: Game[] = [
  { title: 'Lava Lagoon', year: '1986', kind: 'Pinball', count: 'x1', players: '1-4P' },
  { title: 'Space Station Omega', year: '1987', kind: 'Pinball', count: 'x1', players: '1-4P' },
  { title: 'Haunted Manor', year: '1992', kind: 'Pinball', count: 'x2', players: '1-4P' },
  { title: 'Midnight Circus', year: '1993', kind: 'Pinball', count: 'x2', players: '1-4P' },
];

type Drink = { rank: string; name: string; style: string; price: string };

const DRINKS: Drink[] = [
  { rank: '1ST', name: 'Extra Life', style: 'Gin, green chartreuse, lime, a cherry', price: '$12' },
  { rank: '2ND', name: 'Power Pellet', style: 'Vodka, yuzu, sour cherry, egg white', price: '$11' },
  { rank: '3RD', name: 'Boss Fight', style: 'Mezcal, chili, pink grapefruit, salt', price: '$13' },
  { rank: '4TH', name: '1UP', style: 'Dark rum, pineapple, coconut, nutmeg', price: '$12' },
  { rank: '5TH', name: 'Game Over', style: 'Espresso, vodka, coffee liqueur', price: '$12' },
  { rank: '6TH', name: 'Warp Pipe', style: 'Lowtown IPA on tap, pint', price: '$7' },
  { rank: '7TH', name: 'Pixel Pils', style: 'Crisp lager on tap, pint', price: '$6' },
  { rank: '8TH', name: 'Continue Sour', style: 'No alcohol: passion fruit, lime, soda', price: '$7' },
  { rank: '9TH', name: 'Coin-Op Cola', style: 'House cola, bottomless', price: '$4' },
  { rank: '10TH', name: 'Hot Pretzel', style: 'With beer cheese, to share', price: '$8' },
];

const RANK_TONES = ['pink', 'yellow', 'green', 'white'];

type Night = { day: string; event: string; what: string; time: string; entry: string };

const NIGHTS: Night[] = [
  { day: 'MON', event: 'Free play', what: 'No tokens needed on any cabinet. No tournament, just games.', time: 'From 17:00', entry: 'Free' },
  { day: 'TUE', event: 'Fight club', what: 'Street Rumble II, double elimination, best of three.', time: '20:00', entry: '$5 entry' },
  { day: 'WED', event: 'Score hunt', what: 'One game a week. Top three scores by midnight win a bar tab.', time: 'All night', entry: '1 token' },
  { day: 'THU', event: 'Pinball league', what: 'Twelve weeks, four tables, points for every game.', time: '19:30', entry: '$40 a season' },
  { day: 'FRI', event: 'Co-op chaos', what: 'Teams of four on Neon Knights. Last team standing drinks free.', time: '21:00', entry: '$4 a head' },
  { day: 'SAT', event: 'Speedrun', what: 'Barrel Bros., any per cent, the clock on the big screen.', time: '15:00', entry: '$3 entry' },
  { day: 'SUN', event: 'Retro quiz', what: 'Six rounds, one of them all sound effects.', time: '18:00', entry: '$2 a player' },
];

type Package = { name: string; who: string; what: string; price: string };

const PACKAGES: Package[] = [
  { name: 'The back room', who: 'Up to 30 players', what: 'Eight cabinets and a pinball set to free play, your own bar and a playlist of your choosing.', price: 'From $350 min. spend' },
  { name: 'The whole bar', who: 'Up to 120 players', what: 'All forty cabinets on free play, both bars, the big screen and the high-score board with your names on it.', price: 'From $2,400' },
  { name: 'Birthday level', who: '10 players, 2 hours', what: 'A tray of 200 tokens, two pizzas and a cake with a pixel candle. Under-18s welcome until 19:00.', price: 'From $180' },
];

const HOURS = [
  ['Mon', '17:00-24:00', 'Free play'],
  ['Tue-Thu', '16:00-24:00', ''],
  ['Fri', '16:00-02:00', ''],
  ['Sat', '12:00-02:00', ''],
  ['Sun', '12:00-22:00', ''],
];

const TOKENS = [
  ['$5', '20 tokens'],
  ['$10', '44 tokens'],
  ['$20', '90 tokens'],
];

const TRAVEL = [
  ['Tram', 'Lowtown Loop to Circuit Row, two minutes on foot'],
  ['Bus', 'Routes 8 and 31 to Bitmap Alley'],
  ['Bike', 'Racks outside, shaped like a certain yellow maze eater'],
  ['Access', 'Step-free entrance and bar; one accessible cabinet'],
];

export default function ContinueArcadeBarPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--void': '#0e0b1e',
        '--white': '#f4f1e8',
        '--pink': '#ff3d6e',
        '--green': '#3ddc84',
        '--yellow': '#ffd23f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="void,white,pink,green,yellow"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Silkscreen:wght@400;700&display=swap"
      />

      <header className={s.hud}>
        <div className={s.hudTop}>
          <a data-edit="hud.mark" data-edit-max="28" className={s.mark} href="#top">Continue?</a>
          <p className={s.stat}>
            <span data-edit="hud.statLabel" data-edit-max="60" className={s.statLabel}>1UP</span>
            <span data-edit="hud.statValue" data-edit-max="60" className={s.statValue}>004200</span>
          </p>
          <p className={s.stat}>
            <span data-edit="hud.statLabel2" data-edit-max="60" className={s.statLabel}>Hi-score</span>
            <span data-edit="hud.statValue2" data-edit-max="60" className={s.statValue}>128450</span>
          </p>
          <div className={s.lives}>
            <span data-edit="hud.statLabel3" data-edit-max="60" className={s.statLabel}>Lives</span>
            <span className={s.hearts}>
              {LIVES.map((n) => (
                <Artwork key={n} slug="continue-arcade-bar-heart" alt="" inks={HEART_INKS} className={s.heart} />
              ))}
            </span>
          </div>
          <p className={s.stat}>
            <span data-edit="hud.statLabel4" data-edit-max="60" className={s.statLabel}>Credits</span>
            <span data-edit="hud.statValue3" data-edit-max="60" className={s.statValue}>02</span>
          </p>
          <TemplateMenu className={s.siteMenu}>
            {NAV.map(([level, label, href]) => (
              <a key={href} href={href}>{`${level} ${label}`}</a>
            ))}
          </TemplateMenu>
        </div>
        <nav className={s.levels} aria-label="Level select">
          {NAV.map(([level, label, href], i) => (
            <a key={href} href={href}>
              <span data-edit={`hud.levelNo.${i}`} data-edit-max="60" className={s.levelNo}>{level}</span>
              <span data-edit={`hud.levelName.${i}`} data-edit-max="60" className={s.levelName}>{label}</span>
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="ca-title">
          <div className={s.stars} aria-hidden="true" />
          <div data-edit-pattern="ca.field" data-edit-roles="2,4,2,1,4,3" className={s.planet} aria-hidden="true">
            <TabbiedPattern pattern={subdivide} palette={PLANET} fit="grid" cellSize={36} seed="ca-planet" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.rocketPath} aria-hidden="true">
            <span className={s.exhaust} />
            <Artwork slug="continue-arcade-bar-rocket" alt="" inks={ROCKET_INKS} className={s.heroRocket} />
          </div>

          <div className={s.titleScreen}>
            <p data-edit="ca.player" data-edit-max="240" data-edit-multiline className={s.player}>Player 1</p>
            <h1 data-edit="ca.title" data-edit-max="70" id="ca-title" className={s.title}>Continue?</h1>
            <p data-edit="ca.body" data-edit-max="240" data-edit-multiline className={s.countdown} aria-hidden="true">9</p>
            <p data-edit="ca.subtitle" data-edit-max="240" data-edit-multiline className={s.subtitle}>An arcade bar at 66 Bitmap Alley, Lowtown</p>
            <div className={s.dialog}>
              <p data-edit="ca.speaker" data-edit-max="240" data-edit-multiline className={s.speaker}>Barkeep</p>
              <p data-edit="ca.dialogText" data-edit-max="240" data-edit-multiline className={s.dialogText}>
                Forty cabinets, six pinball tables and a long bar. Tokens at
                the counter, cocktails named after the games, and free play
                every Monday. Ready?
              </p>
            </div>
            <p data-edit="ca.pressStart" data-edit-max="240" data-edit-multiline className={s.pressStart}>Press start</p>
            <div className={s.heroActions}>
              <a data-edit="ca.btn" data-edit-max="28" className={s.btn} href="#games">Start: the games</a>
              <a data-edit="ca.btnGhost" data-edit-max="28" className={s.btnGhost} href="#hours">Insert coin: hours</a>
            </div>
          </div>

          <div className={s.scene} aria-hidden="true">
            <div className={`${s.platform} ${s.platformHigh}`}>
              <span data-edit="ca.qBlock" data-edit-max="60" className={s.qBlock}>?</span>
              <span className={s.brickBlock} />
              <span data-edit="ca.qBlock2" data-edit-max="60" className={s.qBlock}>?</span>
              <span className={s.brickBlock} />
            </div>
            <div className={`${s.platform} ${s.platformLow}`}>
              <Artwork slug="continue-arcade-bar-cabinet" alt="" inks={CABINET_INKS} className={s.heroCabinet} />
              <span className={s.brickBlock} />
              <span className={s.brickBlock} />
              <span className={s.brickBlock} />
            </div>
            <span className={`${s.coin} ${s.coin1}`} />
            <span className={`${s.coin} ${s.coin2}`} />
            <span className={`${s.coin} ${s.coin3}`} />
          </div>
          <div className={s.ground} aria-hidden="true" />
        </section>

        {/* ----------------------------------------------------------- GAMES */}
        <section id="games" className={s.sec} aria-labelledby="games-h">
          <div className={s.secHead}>
            <div>
              <p data-edit="games.world" data-edit-max="240" data-edit-multiline className={s.world}>World 1-1</p>
              <h2 data-edit="games.h2" data-edit-max="60" id="games-h" className={s.h2}>The games</h2>
              <p data-edit="games.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Forty cabinets and six pinball tables, all original boards,
                restored in the workshop behind the bar. Most take one token;
                pinball takes three.
              </p>
            </div>
            <div className={s.headSprite} aria-hidden="true">
              <Artwork slug="continue-arcade-bar-cabinet" alt="" inks={CABINET_INKS} className={s.sideCabinet} />
              <span className={s.miniPlatform} />
            </div>
          </div>

          <p data-edit="games.selectLabel" data-edit-max="240" data-edit-multiline className={s.selectLabel}>Select a cabinet</p>
          <ul className={s.games}>
            {CABINETS.map((g, i) => (
              <li key={g.title} className={`${s.game} ${i === 0 ? s.cursor : ''}`}>
                <div className={s.gameScreen}>
                  <h3 data-edit={`games.gameTitle.${i}`} data-edit-max="40" className={s.gameTitle}>{g.title}</h3>
                </div>
                <p className={s.gameMeta}>
                  <span data-edit={`games.text.${i}`} data-edit-max="60">{g.year}</span>
                  <span data-edit={`games.text2.${i}`} data-edit-max="60">{g.kind}</span>
                </p>
                <p className={s.gameFoot}>
                  <span data-edit={`games.text3.${i}`} data-edit-max="60">{g.players}</span>
                  <span data-edit={`games.gameCount.${i}`} data-edit-max="60" className={s.gameCount}>{g.count}</span>
                </p>
              </li>
            ))}
          </ul>

          <p data-edit="games.selectLabel2" data-edit-max="240" data-edit-multiline className={s.selectLabel}>The pinball row</p>
          <ul className={s.pinball}>
            {PINBALL.map((g, i) => (
              <li key={g.title} className={s.table}>
                <h3 data-edit={`games.tableTitle.${i}`} data-edit-max="40" className={s.tableTitle}>{g.title}</h3>
                <p className={s.gameMeta}>
                  <span data-edit={`games.text4.${i}`} data-edit-max="60">{g.year}</span>
                  <span data-edit={`games.text5.${i}`} data-edit-max="60">{g.players}</span>
                  <span data-edit={`games.gameCount2.${i}`} data-edit-max="60" className={s.gameCount}>{g.count}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className={s.arrival}>
            <div data-edit-pattern="games.field" data-edit-roles="transparent,2,3,4,1,2" className={s.arrivalField} aria-hidden="true">
              <TabbiedPattern pattern={tetro} palette={BLOCKS} fit="grid" cellSize={30} seed="ca-tetro" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className={`${s.dialog} ${s.arrivalBox}`}>
              <p data-edit="games.speaker" data-edit-max="240" data-edit-multiline className={s.speaker}>New challenger</p>
              <p data-edit="games.arrivalTitle" data-edit-max="240" data-edit-multiline className={s.arrivalTitle}>Neon Knights, 1991</p>
              <p data-edit="games.dialogText" data-edit-max="240" data-edit-multiline className={s.dialogText}>
                Four players, four swords, one very long cabinet. Restored over
                the winter and plugged in this week, next to the pinball row.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- DRINKS */}
        <section id="drinks" className={s.sec} aria-labelledby="drinks-h">
          <div className={s.secHead}>
            <div>
              <p data-edit="drinks.world" data-edit-max="240" data-edit-multiline className={s.world}>World 1-2</p>
              <h2 data-edit="drinks.h2" data-edit-max="60" id="drinks-h" className={s.h2}>Drinks</h2>
              <p data-edit="drinks.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Ranked by how many we poured last month. Every cocktail comes
                as a no-alcohol version for $4 less. Happy hour 16:00-18:00,
                $2 off the whole table.
              </p>
            </div>
          </div>

          <div className={s.scoreBoard}>
            <p data-edit="drinks.boardTitle" data-edit-max="240" data-edit-multiline className={s.boardTitle}>High scores</p>
            <table className={s.scores}>
              <caption data-edit="drinks.srOnly" className={s.srOnly}>The drinks menu: rank, name, what is in it and the price</caption>
              <thead>
                <tr>
                  <th data-edit="drinks.heading" scope="col">Rank</th>
                  <th data-edit="drinks.heading2" scope="col">Name</th>
                  <th data-edit="drinks.colStyle" scope="col" className={s.colStyle}>In it</th>
                  <th data-edit="drinks.colScore" scope="col" className={s.colScore}>Score</th>
                </tr>
              </thead>
              <tbody>
                {DRINKS.map((d, i) => (
                  <tr key={d.name}>
                    <td>
                      <span data-edit={`drinks.rank.${i}`} data-edit-max="60" className={`${s.rank} ${s[RANK_TONES[i % 4]]}`}>{d.rank}</span>
                    </td>
                    <th data-edit={`drinks.drinkName.${i}`} scope="row" className={s.drinkName}>{d.name}</th>
                    <td data-edit={`drinks.colStyle2.${i}`} className={s.colStyle}>{d.style}</td>
                    <td data-edit={`drinks.colScore2.${i}`} className={s.colScore}>{d.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p data-edit="drinks.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>Enter your initials at the bar for a tab.</p>
          </div>
        </section>

        {/* ----------------------------------------------------- TOURNAMENTS */}
        <section id="tournaments" className={s.sec} aria-labelledby="tour-h">
          <div className={s.secHead}>
            <div>
              <p data-edit="tournaments.world" data-edit-max="240" data-edit-multiline className={s.world}>World 1-3</p>
              <h2 data-edit="tournaments.h2" data-edit-max="60" id="tour-h" className={s.h2}>Tournament nights</h2>
              <p data-edit="tournaments.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Something every night of the week. Sign up at the bar before
                the start time; brackets go up on the big screen.
              </p>
            </div>
            <div className={s.headSprite} aria-hidden="true">
              <Artwork slug="continue-arcade-bar-joystick" alt="" inks={JOYSTICK_INKS} className={s.sideJoystick} />
            </div>
          </div>

          <div className={s.worldMap} aria-hidden="true">
            <div data-edit-pattern="tournaments.field" data-edit-roles="transparent,3,3,4,1,3" className={s.mapField}>
              <TabbiedPattern pattern={dotmatrix} palette={TERRAIN} options={{ frequency: 0.6 }} fit="grid" cellSize={32} seed="ca-map" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <span className={s.mapPath} />
            <ol className={s.mapNodes}>
              {NIGHTS.map((n, i) => (
                <li data-edit={`tournaments.item.${i}`} data-edit-max="80" key={n.day}>{n.day}</li>
              ))}
            </ol>
          </div>
          <ol className={s.nights}>
            {NIGHTS.map((n, i) => (
              <li key={n.day} className={s.night}>
                <p data-edit={`tournaments.nightDay.${i}`} data-edit-max="240" data-edit-multiline className={s.nightDay}>{n.day}</p>
                <h3 data-edit={`tournaments.nightEvent.${i}`} data-edit-max="40" className={s.nightEvent}>{n.event}</h3>
                <p data-edit={`tournaments.nightWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.nightWhat}>{n.what}</p>
                <p className={s.nightFoot}>
                  <span data-edit={`tournaments.text.${i}`} data-edit-max="60">{n.time}</span>
                  <span data-edit={`tournaments.text2.${i}`} data-edit-max="60">{n.entry}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ HIRE */}
        <section id="hire" className={`${s.sec} ${s.hireSec}`} aria-labelledby="hire-h">
          <div className={s.sideRocket} aria-hidden="true">
            <Artwork slug="continue-arcade-bar-rocket" alt="" inks={ROCKET_INKS} className={s.climbRocket} />
            <span className={s.trail} />
          </div>
          <div className={s.secHead}>
            <div>
              <p data-edit="hire.world" data-edit-max="240" data-edit-multiline className={s.world}>World 2-1</p>
              <h2 data-edit="hire.h2" data-edit-max="60" id="hire-h" className={s.h2}>Private hire</h2>
            </div>
          </div>
          <p className={s.joined}>
            <span data-edit="hire.text" data-edit-max="60">Player 2 has joined</span>
          </p>

          <div className={s.hireGrid}>
            <ul className={s.packages}>
              {PACKAGES.map((p, i) => (
                <li key={p.name} className={s.package}>
                  <h3 data-edit={`hire.packName.${i}`} data-edit-max="40" className={s.packName}>{p.name}</h3>
                  <p data-edit={`hire.packWho.${i}`} data-edit-max="240" data-edit-multiline className={s.packWho}>{p.who}</p>
                  <p data-edit={`hire.packWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.packWhat}>{p.what}</p>
                  <p data-edit={`hire.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                </li>
              ))}
            </ul>

            <form className={`${s.dialog} ${s.form}`} action="#">
              <p data-edit="hire.speaker" data-edit-max="240" data-edit-multiline className={s.speaker}>Enter your name</p>
              <div className={s.field}>
                <label data-edit="hire.label" htmlFor="ca-name">Name</label>
                <input id="ca-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="hire.label2" htmlFor="ca-email">Email</label>
                <input id="ca-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label data-edit="hire.label3" htmlFor="ca-date">Date</label>
                  <input id="ca-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="hire.label4" htmlFor="ca-players">Players</label>
                  <input id="ca-players" name="players" type="number" min="1" max="120" inputMode="numeric" />
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="hire.label5" htmlFor="ca-package">Package</label>
                <select id="ca-package" name="package" defaultValue="back">
                  <option value="back">The back room</option>
                  <option value="whole">The whole bar</option>
                  <option value="birthday">Birthday level</option>
                </select>
              </div>
              <button data-edit="hire.btn" data-edit-max="24" className={s.btn} type="submit">Ready player 2</button>
            </form>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.sec} aria-labelledby="hours-h">
          <div className={s.secHead}>
            <div>
              <p data-edit="hours.world" data-edit-max="240" data-edit-multiline className={s.world}>World 2-2</p>
              <h2 data-edit="hours.h2" data-edit-max="60" id="hours-h" className={s.h2}>Insert coin</h2>
              <p data-edit="hours.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Opening hours, and what a token costs. 18 and over after
                19:00; bring ID, we ask everyone.
              </p>
            </div>
          </div>

          <div className={s.coinDoor}>
            <div data-edit-pattern="hours.field" data-edit-roles="transparent,3,2,4,1,3" className={s.boardField} aria-hidden="true">
              <TabbiedPattern pattern={circuit} palette={BOARD} fit="grid" cellSize={40} seed="ca-circuit" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className={s.door}>
              <div className={s.slots} aria-hidden="true">
                <span className={s.slot}>
                  <span data-edit="hours.slotLamp" data-edit-max="60" className={s.slotLamp}>25c</span>
                </span>
                <span className={s.slot}>
                  <span data-edit="hours.slotLamp2" data-edit-max="60" className={s.slotLamp}>Token</span>
                </span>
              </div>
              <dl className={s.hours}>
                {HOURS.map(([day, time, note], i) => (
                  <div key={day}>
                    <dt data-edit={`hours.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd>
                      <span data-edit={`hours.text.${i}`} data-edit-max="60">{time}</span>
                      {note ? <span data-edit={`hours.freePlay.${i}`} data-edit-max="60" className={s.freePlay}>{note}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
              <dl className={s.tokens}>
                {TOKENS.map(([cost, gets], i) => (
                  <div key={cost}>
                    <dt data-edit={`hours.term2.${i}`} data-edit-max="28">{cost}</dt>
                    <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{gets}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hours.doorNote" data-edit-max="240" data-edit-multiline className={s.doorNote}>1 coin = 1 credit. Pinball = 3 credits.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FIND */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.secHead}>
            <div>
              <p data-edit="find.world" data-edit-max="240" data-edit-multiline className={s.world}>World 2-3</p>
              <h2 data-edit="find.h2" data-edit-max="60" id="find-h" className={s.h2}>Find us</h2>
            </div>
          </div>

          <div className={s.findGrid}>
            <div className={s.cityMap} aria-hidden="true">
              <div data-edit-pattern="find.field" data-edit-roles="transparent,2,1,2,4,3" className={s.cityField}>
                <TabbiedPattern pattern={ziggurat} palette={CITY} options={{ frequency: 0.7 }} fit="grid" cellSize={36} seed="ca-city" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <span className={`${s.street} ${s.streetH1}`} />
              <span className={`${s.street} ${s.streetH2}`} />
              <span className={`${s.street} ${s.streetV1}`} />
              <span className={`${s.street} ${s.streetV2}`} />
              <span data-edit="find.streetLabel" data-edit-max="60" className={s.streetLabel}>Bitmap Alley</span>
              <span className={s.marker}>
                <Artwork slug="continue-arcade-bar-heart" alt="" inks={HEART_INKS} className={s.markerHeart} />
                <span data-edit="find.markerTag" data-edit-max="60" className={s.markerTag}>You are here</span>
              </span>
            </div>

            <div className={`${s.dialog} ${s.findBox}`}>
              <p data-edit="find.speaker" data-edit-max="240" data-edit-multiline className={s.speaker}>Map</p>
              <address className={s.address}>
                <span data-edit="find.addrMain" data-edit-max="60" className={s.addrMain}>66 Bitmap Alley</span>
                <span data-edit="find.text" data-edit-max="60">Lowtown LT3 8KB</span>
                <a data-edit="find.link" data-edit-max="28" href="tel:+15550188830">(555) 018-8830</a>
                <a data-edit="find.link2" data-edit-max="28" href="mailto:player2@continuebar.example">player2@continuebar.example</a>
              </address>
              <dl className={s.travel}>
                {TRAVEL.map(([how, what], i) => (
                  <div key={how}>
                    <dt data-edit={`find.term.${i}`} data-edit-max="28">{how}</dt>
                    <dd data-edit={`find.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.credits}>
          <p data-edit="footer.gameOver" data-edit-max="240" data-edit-multiline className={s.gameOver}>Game over?</p>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Continue? 66 Bitmap Alley, Lowtown</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional arcade bar; the games, drinks, scores and prices are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The sprites are generated images, drawn in the page&apos;s own colors.</p>
        </div>
        <div data-edit-pattern="footer.field" data-edit-roles="0,2,4,3,2,1" className={s.footGround} aria-hidden="true">
          <TabbiedPattern pattern={subdivide} palette={GROUND} fit="grid" cellSize={32} seed="ca-ground" style={{ position: 'absolute', inset: 0 }} />
        </div>
      </footer>
    </div>
  );
}
