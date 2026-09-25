import { TabbiedPattern } from 'tabbied/react';
import {
  bauhaus,
  capstan,
  dimetric,
  disque,
  frieze,
  gasket,
  hilbert,
  meridianhatch,
  odessa,
  quarterfall,
  quaver,
  sail,
  shatter,
  sound,
  sunsetrings,
  tidering,
  truchetrings,
} from 'tabbied/patterns';
import s from './vinyl-vault.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Vinyl Vault: Used and new records, Canal Street',
  description:
    'Vinyl Vault sells used and new records on Canal Street: what is in the crates this week, staff picks, what we pay for your records, in-store events and opening hours.',
};

/* Site colors, the same six as the stylesheet's root rule. Every sleeve is
   a pattern, and each crate prints its sleeves from one palette: the first
   color is the sleeve, the rest the artwork. */
const PAPER = '#F2EFE9';
const BLACK = '#121212';
const RED = '#E94F37';
const CHARCOAL = '#393E41';
const GRAY = '#8B8883';
const PALE = '#DCD7CF';

const GROOVES = ['transparent', BLACK, CHARCOAL, PAPER];
const JAZZ_SLEEVE = [CHARCOAL, PAPER, RED, GRAY];
const SOUL_SLEEVE = [RED, BLACK, PAPER, PALE];
const ROCK_SLEEVE = [PALE, BLACK, RED, CHARCOAL];
const BEATS_SLEEVE = [BLACK, RED, PALE, GRAY];

const NAV = [
  ['Crates', '#crates'],
  ['Staff picks', '#picks'],
  ['We buy', '#buy'],
  ['Events', '#events'],
  ['Visit', '#visit'],
];

const JAZZ = [
  { artist: 'Marlon Teague Quartet', title: 'Blue Hours at the Tivoli', meta: 'LP, 1961, VG+', price: '$38', design: sail, seed: 'tivoli' },
  { artist: 'Ada Price', title: 'Late Light', meta: 'LP, 1974, NM', price: '$24', design: meridianhatch, seed: 'late-light' },
  { artist: 'The Omar Kell Trio', title: 'Standards for a Wet City', meta: 'LP, 1958, VG', price: '$45', design: bauhaus, seed: 'wet-city' },
  { artist: 'Juno Reyes', title: 'Night Ferry', meta: 'LP, 2025, new', price: '$32', design: quarterfall, seed: 'night-ferry' },
];

const SOUL = [
  { artist: 'The Velvet Sundays', title: 'Keep It Warm', meta: 'LP, 1971, VG+', price: '$30', design: sunsetrings, seed: 'keep-warm' },
  { artist: 'Lorraine Wells', title: 'Say It Plain', meta: 'LP, 1968, VG+', price: '$42', design: disque, seed: 'say-plain' },
  { artist: 'Brass Street Union', title: 'Hot Tar', meta: 'LP, 1975, VG', price: '$26', design: odessa, seed: 'hot-tar' },
  { artist: 'Dee Holloway', title: 'Slow Burn', meta: '7 inch, 1977, VG+', price: '$12', design: gasket, seed: 'slow-burn' },
];

const ROCK = [
  { artist: 'Paper Satellites', title: 'Longwave', meta: 'LP, 1996, NM', price: '$28', design: shatter, seed: 'longwave' },
  { artist: 'The Harlow Line', title: 'Grey Coast', meta: 'LP, 1983, VG+', price: '$18', design: frieze, seed: 'grey-coast' },
  { artist: 'Nettle', title: 'Soft Machinery', meta: '2LP, 2004, NM', price: '$34', design: dimetric, seed: 'machinery' },
  { artist: 'Wren and the Weather', title: 'Porchlight', meta: 'LP, 2024, new', price: '$29', design: quaver, seed: 'porchlight' },
];

const BEATS = [
  { artist: 'Kiln', title: 'Transit Loops', meta: '12 inch, 1999, VG+', price: '$16', design: sound, seed: 'transit' },
  { artist: 'Oskar Mael', title: 'Night Bus Frequencies', meta: 'LP, 2002, NM', price: '$20', design: capstan, seed: 'night-bus' },
  { artist: 'Sola Grid', title: 'Tessellate', meta: '2LP, 2018, NM', price: '$27', design: truchetrings, seed: 'tessellate' },
  { artist: 'Cassia', title: 'Room Tone', meta: 'LP, 1994, VG+', price: '$34', design: hilbert, seed: 'room-tone' },
];

const PICKS = [
  {
    who: 'Dana, jazz buyer',
    record: 'The Omar Kell Trio, Standards for a Wet City',
    why: 'A first pressing with the original inner sleeve. Side two, track one, is the best four minutes of piano in the shop.',
    where: 'Jazz crate, $45',
  },
  {
    who: 'Theo, weekends',
    record: 'The Velvet Sundays, Keep It Warm',
    why: 'Horns, handclaps and a bass line you will hum for a week. It sounds better loud, so we play it loud on Saturdays.',
    where: 'Soul crate, $30',
  },
  {
    who: 'Priya, owner',
    record: 'Cassia, Room Tone',
    why: 'Ambient records from the nineties are finally getting reissued. This is not a reissue, and it is still cheaper than one.',
    where: 'Electronic crate, $34',
  },
];

const GRADES = [
  ['Mint or near mint', 'Played a handful of times, no marks you can see or hear, sleeve crisp.', '50-60%'],
  ['Very good plus', 'Light surface marks, plays through without noise. Most of our stock.', '40%'],
  ['Very good', 'Some crackle between tracks, a worn sleeve or a name written on it.', '25-30%'],
  ['Good and below', 'Plays, but you know it has been loved. Goes in the dollar bins.', '$0.25 each'],
];

const STEPS = [
  ['Bring them in', 'Any day before 5 pm, in boxes or crates. No appointment for fewer than 300.'],
  ['We grade them', 'Every record is checked by eye and played if we are not sure. Usually within the hour.'],
  ['Cash or credit', 'An offer on the spot. Take cash, or 25% more as store credit.'],
];

const EVENTS = [
  { day: 'Thu', date: '02', month: 'Oct', title: 'New arrivals night', body: 'Four hundred records priced and put out at once, with a DJ playing from the pile.', time: '6-9 pm', price: 'Free' },
  { day: 'Sat', date: '11', month: 'Oct', title: 'Record fair in the lot', body: 'Twenty dealers, crates on trestle tables, coffee from the van at the gate.', time: '10 am-4 pm', price: 'Free' },
  { day: 'Fri', date: '17', month: 'Oct', title: 'Listening club', body: 'One album, both sides, good speakers, no talking. Then we talk about it.', time: '7 pm', price: '$5' },
  { day: 'Sat', date: '25', month: 'Oct', title: 'In-store set: Juno Reyes', body: 'Songs from Night Ferry on a piano we will somehow get through the door.', time: '5 pm', price: 'Free, RSVP' },
  { day: 'Sun', date: '02', month: 'Nov', title: 'Turntable clinic', body: 'Bring your deck. We check the stylus, the belt and the speed, and fix what we can.', time: '12-3 pm', price: 'Free' },
];

const HOURS = [
  ['Monday - Thursday', '11 am - 8 pm'],
  ['Friday and Saturday', '10 am - 9 pm'],
  ['Sunday', '12 - 6 pm'],
];

export default function VinylVaultPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDisc} aria-hidden="true" />
          <span className={s.markName}>Vinyl Vault</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barHours}>Open today 11-8</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- HERO
            The turntable, tinted black and paper, on a red panel cut with
            grooves. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Used and new records, 402 Canal Street</p>
            <h1 className={s.heroTitle} id="hero-h">
              Dig
              <br />
              <em>deeper.</em>
            </h1>
            <p className={s.lede}>
              Twelve thousand records in the racks, four hundred new ones out
              every Thursday, and a dollar bin by the door that has never once
              been empty. Listen to anything before you buy it.
            </p>
            <div className={s.heroActions}>
              <a className={s.button} href="#crates">See the crates</a>
              <a className={s.buttonGhost} href="#buy">Sell us your records</a>
            </div>
          </div>
          <div className={s.heroPanel}>
            <div className={s.grooves} aria-hidden="true">
              <TabbiedPattern
                pattern={tidering}
                palette={GROOVES}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={96}
                seed="vault-grooves"
                redrawInterval={7000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="vinyl-vault-turntable"
              alt="A turntable with a record on the platter, seen at an angle"
              mode="tint"
              inks={['var(--black)', 'var(--paper)']}
              className={s.turntable}
            />
            <p className={s.nowPlaying}>
              <span className={s.nowLabel}>On the shop deck</span>
              <span className={s.nowTitle}>Juno Reyes, Night Ferry</span>
            </p>
          </div>
        </section>

        <ul className={s.ticker} aria-label="The shop in numbers">
          <li>
            <strong>12,000</strong>
            <span>records in the racks</span>
          </li>
          <li>
            <strong>400</strong>
            <span>new in every Thursday</span>
          </li>
          <li>
            <strong>4</strong>
            <span>listening stations</span>
          </li>
          <li>
            <strong>$1</strong>
            <span>bins out front, always</span>
          </li>
        </ul>

        {/* ----------------------------------------------------------- CRATES
            Four crates, each a divider card and four sleeves. Every sleeve
            is a pattern printed in its crate's palette, with a record
            half out of it. */}
        <section id="crates" className={s.crates} aria-labelledby="crates-h">
          <div className={s.secHead}>
            <p className={s.kicker}>In the crates this week</p>
            <h2 id="crates-h">Pulled from the new arrivals</h2>
            <p className={s.secNote}>
              Prices are per record. Grades follow the usual scale, from NM
              (near mint) to VG (very good). Ask at the counter and we will
              put anything on a deck for you.
            </p>
          </div>

          <div className={s.crate}>
            <div className={`${s.divider} ${s.dividerCharcoal}`}>
              <h3>Jazz</h3>
              <span className={s.dividerCount}>1,840 in the racks</span>
            </div>
            <ul className={s.sleeves}>
              {JAZZ.map((r) => (
                <li key={r.title} className={s.record}>
                  <span className={s.disc} aria-hidden="true" />
                  <div className={s.cover} aria-hidden="true">
                    <TabbiedPattern pattern={r.design} palette={JAZZ_SLEEVE} fit="grid" cellSize={52} seed={r.seed} style={{ position: 'absolute', inset: 0 }} />
                  </div>
                  <span className={s.sticker}>{r.price}</span>
                  <h4 className={s.title}>{r.title}</h4>
                  <p className={s.artist}>{r.artist}</p>
                  <p className={s.meta}>{r.meta}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.crate}>
            <div className={`${s.divider} ${s.dividerRed}`}>
              <h3>Soul and funk</h3>
              <span className={s.dividerCount}>2,210 in the racks</span>
            </div>
            <ul className={s.sleeves}>
              {SOUL.map((r) => (
                <li key={r.title} className={s.record}>
                  <span className={s.disc} aria-hidden="true" />
                  <div className={s.cover} aria-hidden="true">
                    <TabbiedPattern pattern={r.design} palette={SOUL_SLEEVE} fit="grid" cellSize={52} seed={r.seed} style={{ position: 'absolute', inset: 0 }} />
                  </div>
                  <span className={s.sticker}>{r.price}</span>
                  <h4 className={s.title}>{r.title}</h4>
                  <p className={s.artist}>{r.artist}</p>
                  <p className={s.meta}>{r.meta}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.crate}>
            <div className={`${s.divider} ${s.dividerPale}`}>
              <h3>Rock and indie</h3>
              <span className={s.dividerCount}>4,760 in the racks</span>
            </div>
            <ul className={s.sleeves}>
              {ROCK.map((r) => (
                <li key={r.title} className={s.record}>
                  <span className={s.disc} aria-hidden="true" />
                  <div className={s.cover} aria-hidden="true">
                    <TabbiedPattern pattern={r.design} palette={ROCK_SLEEVE} fit="grid" cellSize={52} seed={r.seed} style={{ position: 'absolute', inset: 0 }} />
                  </div>
                  <span className={s.sticker}>{r.price}</span>
                  <h4 className={s.title}>{r.title}</h4>
                  <p className={s.artist}>{r.artist}</p>
                  <p className={s.meta}>{r.meta}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.crate}>
            <div className={`${s.divider} ${s.dividerBlack}`}>
              <h3>Electronic</h3>
              <span className={s.dividerCount}>1,390 in the racks</span>
            </div>
            <ul className={s.sleeves}>
              {BEATS.map((r) => (
                <li key={r.title} className={s.record}>
                  <span className={s.disc} aria-hidden="true" />
                  <div className={s.cover} aria-hidden="true">
                    <TabbiedPattern pattern={r.design} palette={BEATS_SLEEVE} fit="grid" cellSize={52} seed={r.seed} style={{ position: 'absolute', inset: 0 }} />
                  </div>
                  <span className={s.sticker}>{r.price}</span>
                  <h4 className={s.title}>{r.title}</h4>
                  <p className={s.artist}>{r.artist}</p>
                  <p className={s.meta}>{r.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ STAFF PICKS */}
        <section id="picks" className={s.picks} aria-labelledby="picks-h">
          <div className={s.picksInner}>
            <div className={s.station}>
              <div className={s.stationDisc} aria-hidden="true" />
              <Artwork
                slug="vinyl-vault-headphones"
                alt="A pair of over-ear headphones from one of the listening stations"
                mode="tint"
                inks={['var(--black)', 'var(--pale)']}
                className={s.headphones}
              />
              <p className={s.stationNote}>Four listening stations at the back. Take anything off the rack and play it.</p>
            </div>
            <div className={s.picksText}>
              <p className={s.kicker}>Staff picks</p>
              <h2 id="picks-h">Three records we would take home</h2>
              <ol className={s.pickList}>
                {PICKS.map((p, i) => (
                  <li key={p.who} className={s.pick}>
                    <span className={s.pickNo}>{`0${i + 1}`}</span>
                    <p className={s.pickWho}>{p.who}</p>
                    <h3>{p.record}</h3>
                    <p className={s.pickWhy}>{p.why}</p>
                    <p className={s.pickWhere}>{p.where}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- WE BUY */}
        <section id="buy" className={s.sec} aria-labelledby="buy-h">
          <div className={s.buy}>
            <div className={s.buyText}>
              <p className={s.kicker}>We buy records</p>
              <h2 id="buy-h">Bring us the crate from the attic</h2>
              <p className={s.buyLede}>
                One record or five thousand. We pay a share of what we will
                sell it for, and we tell you the grade and the shelf price of
                anything you ask about.
              </p>
              <ol className={s.steps}>
                {STEPS.map(([title, body], i) => (
                  <li key={title}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.buyArt}>
              <Artwork
                slug="vinyl-vault-records"
                alt="A plastic milk crate full of records"
                mode="tint"
                inks={['var(--black)', 'var(--paper)']}
                className={s.crateArt}
              />
              <p className={s.buyNote}>More than 500 records? We come to you, anywhere within 60 miles.</p>
            </div>
          </div>

          <table className={s.grades}>
            <caption>What we pay, as a share of our shelf price</caption>
            <thead>
              <tr>
                <th scope="col">Grade</th>
                <th scope="col">What it means</th>
                <th scope="col">We pay</th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map(([grade, means, pay]) => (
                <tr key={grade}>
                  <th scope="row">{grade}</th>
                  <td>{means}</td>
                  <td className={s.pay}>{pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ----------------------------------------------------------- EVENTS */}
        <section id="events" className={s.sec} aria-labelledby="events-h">
          <div className={s.secHead}>
            <p className={s.kicker}>In the shop</p>
            <h2 id="events-h">Events this fall</h2>
            <p className={s.secNote}>
              All in the shop, all ages. RSVP by email for the in-store set;
              the room holds sixty.
            </p>
          </div>
          <ul className={s.events}>
            {EVENTS.map((e) => (
              <li key={e.title} className={s.event}>
                <p className={s.date}>
                  <span className={s.dateDay}>{e.day}</span>
                  <span className={s.dateNum}>{e.date}</span>
                  <span className={s.dateMonth}>{e.month}</span>
                </p>
                <div className={s.eventText}>
                  <h3>{e.title}</h3>
                  <p>{e.body}</p>
                </div>
                <span className={s.eventTime}>{e.time}</span>
                <span className={s.eventPrice}>{e.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div>
              <p className={s.kicker}>Visit</p>
              <h2 id="visit-h">402 Canal Street</h2>
              <p className={s.visitNote}>
                Across from the old tram depot, with the red awning. Bikes
                lock to the rail out front; the 7 and 21 buses stop at the
                corner.
              </p>
              <p className={s.contactLine}>
                <a href="tel:+15550189034">(555) 018-9034</a>
              </p>
              <p className={s.contactLine}>
                <a href="mailto:dig@vinylvault.example">dig@vinylvault.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <form className={s.form} action="#">
              <h3>New arrivals, every Thursday</h3>
              <p className={s.formNote}>One email a week with the best of what came in. Nothing else.</p>
              <label className={s.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <fieldset className={s.likes}>
                <legend>Send me</legend>
                <label>
                  <input type="checkbox" name="genre" value="jazz" defaultChecked />
                  <span>Jazz</span>
                </label>
                <label>
                  <input type="checkbox" name="genre" value="soul" defaultChecked />
                  <span>Soul</span>
                </label>
                <label>
                  <input type="checkbox" name="genre" value="rock" />
                  <span>Rock</span>
                </label>
                <label>
                  <input type="checkbox" name="genre" value="electronic" />
                  <span>Electronic</span>
                </label>
              </fieldset>
              <button className={s.button} type="submit">Sign up</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footMark}>Vinyl Vault</p>
        <ul className={s.footLinks}>
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className={s.footFine}>
          <p>A fictional record store. Records, artists, prices and events are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live as the sleeves; the photographs are tinted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
