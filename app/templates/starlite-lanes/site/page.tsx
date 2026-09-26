import { TabbiedPattern } from 'tabbied/react';
import { comet, neon } from 'tabbied/patterns';
import s from './starlite-lanes.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Starlite Lanes: Bowling alley and bar, Orbit Boulevard',
  description:
    'Starlite Lanes has 24 lanes and a lounge on Orbit Boulevard, open till 1 on weekends. Lane rates by the hour, cosmic bowling nights, league standings and party packages.',
};

/* Site colors: the night and four inks. The tube fields and the shooting
   stars take only these, so a re-color reaches them. */
const NIGHT = '#0d1233';
const PINK = '#ff4fa3';
const CYAN = '#3de0f0';
const STAR = '#ffcf4a';
const VIOLET = '#8b5cf6';

const TUBES = [NIGHT, PINK, CYAN, VIOLET, STAR];
const COMETS = [NIGHT, CYAN, STAR, PINK, VIOLET];
const STRIP = [NIGHT, PINK, CYAN];
const EXIT = [NIGHT, VIOLET, PINK, STAR];

const NAV = [
  ['Rates', '#rates'],
  ['Cosmic', '#cosmic'],
  ['Leagues', '#leagues'],
  ['Parties', '#parties'],
  ['Lounge', '#lounge'],
  ['Visit', '#visit'],
];

const SIGN_LETTERS = ['L', 'A', 'N', 'E', 'S'];

const HOURS_HEAD = ['11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

/* One letter per hour from 11 am: D day, E evening, C cosmic, - closed. */
const RATE_ROWS = [
  ['Mon', 'DDDDDDEEEEEE--'],
  ['Tue', 'DDDDDDEEEEEE--'],
  ['Wed', 'DDDDDDEEEEEE--'],
  ['Thu', 'DDDDDDEEEEEE--'],
  ['Fri', 'DDDDDDEEEECCCC'],
  ['Sat', 'EEEEEEEEEECCCC'],
  ['Sun', 'DDDDDDDDCCC---'],
];

const TIER_NAMES: Record<string, string> = {
  D: 'Day rate',
  E: 'Evening rate',
  C: 'Cosmic',
  '-': 'Closed',
};

const TIERS = [
  ['Day', '$28', 'a lane, an hour'],
  ['Evening', '$42', 'a lane, an hour'],
  ['Cosmic', '$56', 'a lane, an hour'],
];

const EXTRAS = [
  ['Shoes', '$5 a pair, sizes kids 8 to men\'s 16'],
  ['Bumpers and ball ramps', 'Free on any lane, just ask'],
  ['By the game, before 5 pm', '$6.50 a person, Monday to Friday'],
];

const COSMIC = [
  ['Friday and Saturday', '9 pm to 1 am'],
  ['Sunday', 'Family cosmic, 7 to 10 pm'],
  ['The deal', '$24 a person for two hours, shoes in'],
];

type Team = {
  rank: string;
  team: string;
  won: number;
  lost: number;
  pins: string;
  high: number;
};

const STANDINGS: Team[] = [
  { rank: '1', team: 'Split Happens', won: 18, lost: 6, pins: '13,482', high: 268 },
  { rank: '2', team: 'The Alley Cats', won: 16, lost: 8, pins: '13,105', high: 247 },
  { rank: '3', team: 'Spare Me', won: 15, lost: 9, pins: '12,960', high: 255 },
  { rank: '4', team: 'Holy Rollers', won: 13, lost: 11, pins: '12,771', high: 239 },
  { rank: '5', team: 'Lane Changers', won: 11, lost: 13, pins: '12,644', high: 231 },
  { rank: '6', team: 'Ten Pin Pals', won: 10, lost: 14, pins: '12,302', high: 226 },
  { rank: '7', team: 'The Turkeys', won: 8, lost: 16, pins: '12,011', high: 233 },
  { rank: '8', team: 'Gutter Glory', won: 5, lost: 19, pins: '11,487', high: 212 },
];

const LEAGUES = [
  ['Monday, 1 pm', 'Golden Pins', 'Fifty-five and over, with handicap'],
  ['Tuesday, 7 pm', 'Tuesday Night Mixed', 'Teams of four, any average'],
  ['Wednesday, 4:30 pm', 'Youth league', 'Ages 8 to 17, with a coach on the lanes'],
  ['Thursday, 7 pm', 'No-tap trios', 'Nine pins on the first ball count as a strike'],
  ['Sunday, 10 am', 'Bumper league', 'Ages 4 to 7, bumpers up, ramps out'],
];

type Party = {
  mark: string;
  name: string;
  price: string;
  who: string;
  items: string[];
};

const PARTIES: Party[] = [
  {
    mark: '/',
    name: 'The Spare',
    price: '$22 a guest',
    who: 'Kids, eight guests or more',
    items: ['90 minutes of bowling', 'Shoes and bumpers', 'Pizza and soda', 'The party room for an hour'],
  },
  {
    mark: 'X',
    name: 'The Strike',
    price: '$34 a guest',
    who: 'Any age, ten guests or more',
    items: ['Two hours of bowling', 'Shoes, glow balls for everyone', 'Pizza, wings and soda pitchers', 'A host who keeps score'],
  },
  {
    mark: 'XXX',
    name: 'The Turkey',
    price: '$48 a guest',
    who: 'Adults, twelve guests or more',
    items: ['Two hours on lanes 21 to 24', 'The sofas behind them', 'Hot buffet from the lounge', 'Two drink tickets each'],
  },
];

const LOUNGE = [
  ['Draft pint', '$6'],
  ['Pitcher, any draft', '$16'],
  ['Blue Comet, gin and curacao', '$10'],
  ['Root beer float', '$5'],
  ['Tater tots', '$6'],
  ['Chili cheese dog', '$8'],
  ['Nachos, the big tray', '$11'],
  ['Pizza, 14 inch', '$18'],
];

const OPEN = [
  ['Monday to Thursday', '11 am to 11 pm'],
  ['Friday and Saturday', '11 am to 1 am'],
  ['Sunday', '11 am to 10 pm'],
];

export default function StarliteLanesPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Tilt+Neon&family=Yellowtail&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markScript}>Starlite</span>
          <span className={s.markCaps}>Lanes</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ SIGN */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.pylon}>
            <span className={s.burst} aria-hidden="true" />
            <h1 id="hero-h" className={s.signScript}>Starlite <span className={s.srOnly}>Lanes</span></h1>
            <ul className={s.letters} aria-hidden="true">
              {SIGN_LETTERS.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className={s.signSub}>Bowling, lounge, since 1959</p>
            <p className={s.arrow}>24 lanes, open till 1</p>
          </div>

          <div className={s.heroSide}>
            <div className={s.wall} aria-hidden="true">
              <TabbiedPattern
                pattern={neon}
                palette={TUBES}
                fit="grid"
                cellSize={56}
                seed="starlite-wall"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.lede}>
              Twenty-four lanes under the original 1959 roof, a lounge that
              pours until close, and a sign out front with 412 feet of neon
              tube. We re-bent every one of them in 2019. Walk in and we will
              find you a lane.
            </p>
            <div className={s.actions}>
              <a className={s.btn} href="#visit">Reserve a lane</a>
              <a className={s.btnGhost} href="#rates">See the rates</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- RATES */}
        <section id="rates" className={s.rates} aria-labelledby="rates-h">
          <div className={s.inner}>
            <div className={s.head}>
              <h2 id="rates-h" className={s.neonCyan}>Lane rates, by the hour</h2>
              <p className={s.headNote}>
                One price per lane per hour, up to six bowlers on it. Find
                your day, find your hour, and the color is the price.
              </p>
            </div>

            <ul className={s.tiers}>
              {TIERS.map(([name, price, per]) => (
                <li key={name}>
                  <span className={s.tierName}>{name}</span>
                  <strong className={s.tierPrice}>{price}</strong>
                  <span className={s.tierPer}>{per}</span>
                </li>
              ))}
            </ul>

            <div className={s.gridWrap}>
              <table className={s.rateGrid}>
                <caption className={s.srOnly}>Lane rate for each hour of the week, from 11 am to 1 am</caption>
                <thead>
                  <tr>
                    <th scope="col" className={s.dayHead}>
                      <span className={s.srOnly}>Day</span>
                    </th>
                    {HOURS_HEAD.map((h, i) => (
                      <th key={`h-${i}`} scope="col">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RATE_ROWS.map(([day, row]) => (
                    <tr key={day}>
                      <th scope="row">{day}</th>
                      {row.split('').map((c, j) => (
                        <td key={`${day}-${j}`} className={s[`t${c === '-' ? 'X' : c}`]}>
                          <span className={s.srOnly}>{TIER_NAMES[c]}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={s.gridFoot}>
                <span>11 am</span>
                <span>5 pm</span>
                <span>9 pm</span>
                <span>1 am</span>
              </p>
            </div>

            <dl className={s.extras}>
              {EXTRAS.map(([what, detail]) => (
                <div key={what}>
                  <dt>{what}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- COSMIC */}
        <section id="cosmic" className={s.cosmic} aria-labelledby="cosmic-h">
          <div className={s.sky} aria-hidden="true">
            <TabbiedPattern
              pattern={comet}
              palette={COMETS}
              fit="grid"
              cellSize={48}
              seed="starlite-sky"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.inner}>
            <div className={s.cosmicCard}>
              <span className={s.burstSmall} aria-hidden="true" />
              <h2 id="cosmic-h" className={s.neonPink}>Cosmic bowling</h2>
              <p className={s.cosmicLede}>
                The house lights go down, the blacklights come up, and the pins
                glow. Fog on the approach, DJ Orbit in the booth, and every
                strike sets off the lane lights.
              </p>
              <dl className={s.cosmicFacts}>
                {COSMIC.map(([when, what]) => (
                  <div key={when}>
                    <dt>{when}</dt>
                    <dd>{what}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.cosmicNote}>Wear white. It glows.</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- LEAGUES */}
        <section id="leagues" className={s.leagues} aria-labelledby="leagues-h">
          <div className={s.inner}>
            <div className={s.head}>
              <h2 id="leagues-h" className={s.neonCyan}>Leagues</h2>
              <p className={s.headNote}>
                Five leagues a week, fall and winter seasons of fourteen weeks.
                The winter season starts Tuesday, January 6, and every league
                has room for new bowlers.
              </p>
            </div>

            <div className={s.leagueGrid}>
              <div className={s.monitor}>
                <p className={s.monitorHead}>
                  <span>Tuesday Night Mixed</span>
                  <span>Fall 2026, after week 6</span>
                </p>
                <table className={s.standings}>
                  <caption className={s.srOnly}>Tuesday Night Mixed standings after week 6</caption>
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col" className={s.teamCol}>Team</th>
                      <th scope="col">Won</th>
                      <th scope="col">Lost</th>
                      <th scope="col">Pins</th>
                      <th scope="col">High</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STANDINGS.map((t) => (
                      <tr key={t.team}>
                        <td className={s.rank}>{t.rank}</td>
                        <th scope="row" className={s.teamCol}>{t.team}</th>
                        <td>{String(t.won)}</td>
                        <td>{String(t.lost)}</td>
                        <td>{t.pins}</td>
                        <td>{String(t.high)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className={s.monitorFoot}>Four points a week: one per game and one for total pins.</p>
              </div>

              <ul className={s.leagueList}>
                {LEAGUES.map(([when, name, who]) => (
                  <li key={name}>
                    <span className={s.leagueWhen}>{when}</span>
                    <h3>{name}</h3>
                    <p>{who}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The strip of tubes over the party lanes. */}
        <div className={s.tubeStrip} aria-hidden="true">
          <TabbiedPattern
            pattern={neon}
            palette={STRIP}
            fit="grid"
            cellSize={40}
            seed="starlite-strip"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- PARTIES */}
        <section id="parties" className={s.parties} aria-labelledby="parties-h">
          <div className={s.inner}>
            <div className={s.partyHead}>
              <div className={s.head}>
                <h2 id="parties-h" className={s.neonPink}>Party packages</h2>
                <p className={s.headNote}>
                  Named for what you write on the score sheet. Book two weeks
                  ahead for a Saturday; a $100 deposit holds the lanes.
                </p>
              </div>
              <Artwork
                slug="starlite-lanes-strike"
                alt="A bowling ball scattering a set of pins, with starbursts around them"
                inks={{ red: 'var(--pinkLit)', blue: 'var(--cyanLit)' }}
                className={s.strike}
              />
            </div>

            <ol className={s.frames}>
              {PARTIES.map((p) => (
                <li key={p.name} className={s.frame}>
                  <span className={s.frameMark} aria-hidden="true">{p.mark}</span>
                  <h3>{p.name}</h3>
                  <p className={s.framePrice}>{p.price}</p>
                  <p className={s.frameWho}>{p.who}</p>
                  <ul>
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- LOUNGE */}
        <section id="lounge" className={s.lounge} aria-labelledby="lounge-h">
          <div className={s.inner}>
            <div className={s.loungeGrid}>
              <div>
                <h2 id="lounge-h" className={s.neonCyan}>The Satellite Lounge</h2>
                <p className={s.loungeLede}>
                  Behind lane 24, with the round booths and the long bar.
                  Food comes to your lane until an hour before close.
                </p>
                <p className={s.happy}>Happy hour, Monday to Thursday, 4 to 6: $4 pints.</p>
              </div>
              <ul className={s.board}>
                {LOUNGE.map(([item, price]) => (
                  <li key={item}>
                    <span className={s.boardItem}>{item}</span>
                    <span className={s.boardPrice}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.inner}>
            <div className={s.visitGrid}>
              <div>
                <h2 id="visit-h" className={s.neonPink}>1958 Orbit Boulevard</h2>
                <p className={s.visitSub}>Northgate, under the sign. You cannot miss it.</p>
                <dl className={s.open}>
                  {OPEN.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.contact}>
                  <a href="tel:+15550196124">(555) 019-6124</a>
                </p>
                <p className={s.contact}>
                  <a href="mailto:lanes@starlitelanes.example">lanes@starlitelanes.example</a>
                </p>
                <p className={s.small}>
                  Free parking for 200 cars. Step-free throughout; lane 1 is
                  nearest the door and has a ball ramp ready for wheelchair
                  bowlers.
                </p>
              </div>

              <form className={s.form} action="#">
                <h3 className={s.formTitle}>Reserve a lane</h3>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label htmlFor="sl-name">Name</label>
                    <input id="sl-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sl-phone">Phone</label>
                    <input id="sl-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sl-date">Day</label>
                    <input id="sl-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sl-time">Start time</label>
                    <input id="sl-time" name="time" type="time" defaultValue="19:00" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sl-bowlers">Bowlers</label>
                    <input id="sl-bowlers" name="bowlers" type="number" min={1} max={60} defaultValue={4} />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sl-kind">Kind of night</label>
                    <select id="sl-kind" name="kind" defaultValue="open">
                      <option value="open">Open bowling</option>
                      <option value="cosmic">Cosmic</option>
                      <option value="party">A party package</option>
                      <option value="league">Joining a league</option>
                    </select>
                  </div>
                </div>
                <button className={s.submit} type="submit">Hold my lane</button>
                <p className={s.small}>We text to confirm within the hour. Lanes are held fifteen minutes past the time.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        {/* The tubes again, over the door on the way out. */}
        <div className={s.footTubes} aria-hidden="true">
          <TabbiedPattern
            pattern={neon}
            palette={EXIT}
            fit="grid"
            cellSize={40}
            seed="starlite-exit"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footText}>
          <p className={s.footName}>Starlite Lanes</p>
          <p>A fictional bowling alley and bar. The teams, scores, rates and hours are invented.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
          <p>The strike is a generated image, drawn in the page's own colors.</p>
        </div>
      </footer>
    </div>
  );
}
