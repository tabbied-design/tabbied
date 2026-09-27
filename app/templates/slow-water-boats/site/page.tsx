import { TabbiedPattern } from 'tabbied/react';
import { bight, wavelet, lunette, drift } from 'tabbied/patterns';
import s from './slow-water-boats.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Slow Water Boats: Narrowboat holiday hire, Lock 14, Brindley Wharf',
  description:
    'Three painted narrowboats for hire from Wharf Cottage at Lock 14 on the Tamber Canal. The fleet, two cruising rings as strip maps, your first lock, what is aboard, dogs, short breaks and booking.',
};

/* Site colors: the cream of a cabin roof, and the four paints of the
   roses and castles. Every pattern keeps a transparent ground so the
   section's own paintwork shows through. */
const CREAM = '#f3ead6';
const GREEN = '#1f4a3c';
const RED = '#b8302a';
const YELLOW = '#e7b23a';
const BLUE = '#2b4f8c';

const PAINTWORK = ['transparent', GREEN, RED, GREEN, BLUE, YELLOW];
const WATER = ['transparent', BLUE, CREAM, BLUE, GREEN, BLUE];
const BRIDGES = ['transparent', RED, GREEN, YELLOW, BLUE, GREEN];
const BANKS = ['transparent', GREEN, GREEN, YELLOW, RED, GREEN];
const BUNTING = ['transparent', RED, YELLOW, BLUE, CREAM, GREEN];
const WAKE = ['transparent', CREAM, BLUE, CREAM, GREEN, CREAM];

const NAV = [
  ['The fleet', '#fleet'],
  ['Routes', '#routes'],
  ['First lock', '#lock'],
  ['Aboard', '#aboard'],
  ['Dogs', '#dogs'],
  ['Short breaks', '#breaks'],
  ['Book', '#book'],
];

const HERO_FACTS = [
  ['3', 'painted boats'],
  ['2 mph', 'the speed limit'],
  ['4 mph', 'your top speed on a good day'],
];

type Boat = {
  name: string;
  berths: string;
  length: string;
  cabins: string;
  week: string;
  short: string;
  note: string;
  inks: Record<string, string>;
  pos: string;
};

const FLEET: Boat[] = [
  {
    name: 'Kingfisher',
    berths: '4 berths',
    length: '57 ft',
    cabins: 'A fixed double, and a dinette that makes two singles',
    week: '$1,450',
    short: '$890',
    note: 'Our all-rounder, and the one first-timers usually take.',
    inks: { red: 'var(--blue)', blue: 'var(--red)', yellow: 'var(--yellow)', black: 'var(--green)' },
    pos: 'kingfisher',
  },
  {
    name: 'Otter',
    berths: '2 berths',
    length: '45 ft',
    cabins: 'A cross double at the stern and a wood stove',
    week: '$1,090',
    short: '$690',
    note: 'Short enough to turn almost anywhere. Built for two and a dog.',
    inks: { red: 'var(--green)', blue: 'var(--yellow)', yellow: 'var(--red)', black: 'var(--blue)' },
    pos: 'otter',
  },
  {
    name: 'Heron',
    berths: '6 berths',
    length: '66 ft',
    cabins: 'Two doubles, two singles, two bathrooms',
    week: '$1,850',
    short: '$1,150',
    note: 'The long one, for families and friends who get on.',
    inks: { red: 'var(--red)', blue: 'var(--blue)', yellow: 'var(--yellow)', black: 'var(--green)' },
    pos: 'heron',
  },
];

type Leg = { mi: string; locks: string; hours: string };
type Ring = { name: string; nights: string; totals: string; note: string; stops: string[]; kinds: string[]; legs: Leg[] };

const RINGS: Ring[] = [
  {
    name: 'The Tamber Ring',
    nights: '7 nights',
    totals: '58 miles, 42 locks, about 32 hours',
    note: 'Up the Foxley Flight, through Ashby Tunnel and home by the Wenlow Arm. A proper week.',
    stops: ['Brindley Wharf', 'Coldmoor', 'Foxley Top Lock', 'Ashby', 'Tamber Junction', 'Wenlow', 'Brindley Wharf'],
    kinds: ['Start', 'The Navigation', 'Seven locks', 'The Swan', 'Water point', 'The Boat Inn', 'Home'],
    legs: [
      { mi: '7 mi', locks: '3 locks', hours: '3.5 h' },
      { mi: '1 mi', locks: '7 locks', hours: '3 h' },
      { mi: '8 mi', locks: 'Tunnel', hours: '3.5 h' },
      { mi: '15 mi', locks: '10 locks', hours: '8 h' },
      { mi: '13 mi', locks: '8 locks', hours: '6.5 h' },
      { mi: '14 mi', locks: '14 locks', hours: '7.5 h' },
    ],
  },
  {
    name: 'The Little Tamber',
    nights: '4 nights',
    totals: '26 miles, 15 locks, about 14 hours',
    note: 'The gentle way round: wide water, a pub every evening, no flight to climb.',
    stops: ['Brindley Wharf', 'Wenlow', 'Tamber Junction', 'Coldmoor', 'Brindley Wharf'],
    kinds: ['Start', 'The Boat Inn', 'Water point', 'The Navigation', 'Home'],
    legs: [
      { mi: '8 mi', locks: '4 locks', hours: '4 h' },
      { mi: '6 mi', locks: '6 locks', hours: '4 h' },
      { mi: '5 mi', locks: '2 locks', hours: '2.5 h' },
      { mi: '7 mi', locks: '3 locks', hours: '3.5 h' },
    ],
  },
];

const FLIGHT = [
  ['15', '7 ft 4 in'],
  ['16', '7 ft 1 in'],
  ['17', '7 ft 6 in'],
  ['18', '7 ft 2 in'],
  ['19', '7 ft 5 in'],
  ['20', '7 ft 3 in'],
  ['21', '7 ft 4 in'],
];

const LOCK_STEPS = [
  ['Moor below', 'Tie up on the lock landing and walk up with a windlass.'],
  ['Check it is empty', 'Top gates shut, top paddles down. If it is full, empty it first.'],
  ['Open the bottom gates', 'Lean on the balance beam and walk it round.'],
  ['Bring her in', 'Slowly, into the middle. Crew closes the gates behind.'],
  ['Fill it, gently', 'Wind the top paddles up a little at a time. Keep the boat forward of the cill.'],
  ['Out you go', 'Open the top gates, steer out, and close up behind you.'],
];

const ABOARD = [
  { title: 'Galley', items: ['Gas hob, oven and grill', 'Fridge with a small freezer', 'Kettle, cafetiere, toaster', 'Pans, plates and a good knife'] },
  { title: 'Cabins', items: ['Duvets, pillows and linen', 'Towels for everyone', 'Diesel central heating', 'A shower with hot water'] },
  { title: 'On deck', items: ['Two windlasses', 'Boat hook and centre line', 'Life jackets, all sizes', 'Folding chairs for the towpath'] },
  { title: 'And', items: ['Charging points in every cabin', 'Radio and a shelf of books', 'Guide to the Tamber, marked up', 'A tin of our flapjack'] },
];

const DOG_RULES = [
  ['Up to two dogs', 'On any boat, $60 a stay, whatever the size.'],
  ['On board', 'A bed, two bowls, an old towel and a dog life jacket to borrow.'],
  ['At the locks', 'Dogs on a lead or inside. Lock sides are high and the water is cold.'],
  ['Not on the beds', 'We ask. Most dogs listen.'],
];

const BREAKS = [
  ['Weekend', 'Friday to Monday, 3 nights', 'Out to the Swan at Ashby and back through the tunnel.'],
  ['Midweek', 'Monday to Friday, 4 nights', 'The Little Tamber ring, with an evening to spare.'],
];

const BREAK_PRICES = [
  ['Otter', '$690', '$790'],
  ['Kingfisher', '$890', '$1,010'],
  ['Heron', '$1,150', '$1,320'],
];

export default function SlowWaterBoatsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#f3ead6',
        '--green': '#1f4a3c',
        '--red': '#b8302a',
        '--yellow': '#e7b23a',
        '--blue': '#2b4f8c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,green,red,yellow,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Diplomata+SC&family=Gelasio:ital,wght@0,400..700;1,400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDiamond} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Slow Water Boats</span>
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
            The cabin side: a painted panel with a scalloped frame and
            diamond corners, the roses and castle whole in a cream oval, the
            name signwritten beside it, all on the lead pattern. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,1,4,3" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={bight}
              palette={PAINTWORK}
              options={{ frequency: 0.62 }}
              fit="grid"
              cellSize={48}
              seed="slow-water-paintwork"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={`${s.painted} ${s.heroPanel}`}>
            <span className={s.corners} aria-hidden="true"><span /></span>
            <div className={s.oval}>
              <Artwork
                slug="slow-water-boats-roses"
                alt="A canal-art painting of big roses and daisies around a small castle above the water"
                inks={{ red: 'var(--red)', blue: 'var(--green)', yellow: 'color-mix(in oklab, var(--yellow) 72%, var(--red))', black: 'var(--blue)' }}
                className={s.ovalArt}
              />
            </div>
            <div className={s.heroText}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Narrowboat holidays from Lock 14, the Tamber Canal</p>
              <h1 id="hero-h" className={s.title}>
                <span data-edit="hero.text" data-edit-max="60">Slow Water</span>
                <span data-edit="hero.titleSmall" data-edit-max="60" className={s.titleSmall}>Boats</span>
              </h1>
              <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Three painted narrowboats, a week of slow water, and a lock
                every mile or so to keep you honest. We show you the ropes at
                the wharf before you cast off.
              </p>
              <div className={s.actions}>
                <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Ask for dates</a>
                <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#fleet">Meet the boats</a>
              </div>
              <dl className={s.heroFacts}>
                {HERO_FACTS.map(([n, what], i) => (
                  <div key={what}>
                    <dt data-edit={`hero.term.${i}`} data-edit-max="28">{n}</dt>
                    <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- FLEET
            The three boats under way on one waterline, each in its own
            paints, and their details on painted boards below. */}
        <section id="fleet" className={s.fleetSec} aria-labelledby="fleet-h">
          <div className={s.secHead}>
            <p data-edit="fleet.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The fleet</p>
            <h2 data-edit="fleet.secTitle" data-edit-max="60" id="fleet-h" className={s.secTitle}>Three boats, all painted by hand</h2>
            <p data-edit="fleet.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Every one steered from the back with a tiller, heated, and fitted out by Mick in the wharf shed. Prices are for a week in summer and a short break in spring or autumn.</p>
          </div>

          <div className={s.canal}>
            {FLEET.map((b, i) => (
              <figure key={b.name} className={`${s.boat} ${s[b.pos]}`}>
                <figcaption data-edit={`fleet.boatBoard.${i}`} data-edit-max="120" data-edit-multiline className={s.boatBoard}>{b.name}</figcaption>
                <Artwork
                  slug="slow-water-boats-narrowboat"
                  alt={`The narrowboat ${b.name}, in side view, with flower pots on the roof`}
                  inks={b.inks}
                  className={s.boatArt}
                />
                <span className={s.wake} aria-hidden="true" />
              </figure>
            ))}
            <div data-edit-pattern="fleet.field" data-edit-roles="transparent,4,0,4,1,4" className={s.water} aria-hidden="true">
              <TabbiedPattern
                pattern={wavelet}
                palette={WATER}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={32}
                seed="slow-water-waterline"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>

          <ul className={s.boards}>
            {FLEET.map((b, i) => (
              <li key={b.name} className={`${s.painted} ${s.boardCard}`}>
                <span className={s.corners} aria-hidden="true"><span /></span>
                <h3 data-edit={`fleet.boardName.${i}`} data-edit-max="40" className={s.boardName}>{b.name}</h3>
                <p className={s.boardSpec}>
                  <span data-edit={`fleet.text.${i}`} data-edit-max="60">{b.berths}</span>
                  <span data-edit={`fleet.text2.${i}`} data-edit-max="60">{b.length}</span>
                </p>
                <p data-edit={`fleet.boardCabins.${i}`} data-edit-max="240" data-edit-multiline className={s.boardCabins}>{b.cabins}</p>
                <dl className={s.boardPrices}>
                  <div>
                    <dt data-edit={`fleet.term.${i}`} data-edit-max="28">A week</dt>
                    <dd data-edit={`fleet.body.${i}`} data-edit-max="200" data-edit-multiline>{b.week}</dd>
                  </div>
                  <div>
                    <dt data-edit={`fleet.term2.${i}`} data-edit-max="28">Short break</dt>
                    <dd data-edit={`fleet.body2.${i}`} data-edit-max="200" data-edit-multiline>{b.short}</dd>
                  </div>
                </dl>
                <p data-edit={`fleet.boardNote.${i}`} data-edit-max="240" data-edit-multiline className={s.boardNote}>{b.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- ROUTES
            Two cruising rings as strip maps: stops along a line, with the
            miles, locks and hours between them. */}
        <section id="routes" className={s.sec} aria-labelledby="routes-h">
          <div data-edit-pattern="routes.field" data-edit-roles="transparent,2,1,3,4,1" className={s.bridges} aria-hidden="true">
            <TabbiedPattern
              pattern={lunette}
              palette={BRIDGES}
              options={{ frequency: 0.75 }}
              fit="grid"
              cellSize={34}
              seed="slow-water-bridges"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.secHead}>
            <p data-edit="routes.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Cruising routes</p>
            <h2 data-edit="routes.secTitle" data-edit-max="60" id="routes-h" className={s.secTitle}>Two rings from the wharf</h2>
            <p data-edit="routes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>A ring brings you home without turning round. Hours are cruising time at an easy pace, locks included; add the pubs yourself.</p>
          </div>

          <div className={s.rings}>
            {RINGS.map((ring, i) => (
              <article key={ring.name} className={s.ring}>
                <div className={s.ringHead}>
                  <h3 data-edit={`ring.ringName.${i}`} data-edit-max="40" className={s.ringName}>{ring.name}</h3>
                  <p data-edit={`ring.ringNights.${i}`} data-edit-max="240" data-edit-multiline className={s.ringNights}>{ring.nights}</p>
                  <p data-edit={`ring.ringTotals.${i}`} data-edit-max="240" data-edit-multiline className={s.ringTotals}>{ring.totals}</p>
                  <p data-edit={`ring.ringNote.${i}`} data-edit-max="240" data-edit-multiline className={s.ringNote}>{ring.note}</p>
                </div>
                <ol className={s.strip} style={{ '--legs': ring.legs.length } as React.CSSProperties}>
                  {ring.stops.map((stop, i) => (
                    <li key={`${stop}-${i}`} className={s.stripItem}>
                      <div className={s.stop}>
                        <span className={i === 0 || i === ring.stops.length - 1 ? `${s.stopDot} ${s.stopHome}` : s.stopDot} aria-hidden="true" />
                        <p className={s.stopName}>{stop}</p>
                        <p className={s.stopKind}>{ring.kinds[i]}</p>
                      </div>
                      {ring.legs[i] && (
                        <div className={s.leg}>
                          <p className={s.legTop}>
                            <span>{ring.legs[i].mi}</span>
                            <span>{ring.legs[i].locks}</span>
                          </p>
                          <p className={s.legHours}>{ring.legs[i].hours}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ LOCK
            The Foxley Flight drawn as a staircase: the banks are the lead
            pattern, the pounds between the gates are water. */}
        <section id="lock" className={s.sec} aria-labelledby="lock-h">
          <div className={s.secHead}>
            <p data-edit="lock.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Your first lock</p>
            <h2 data-edit="lock.secTitle" data-edit-max="60" id="lock-h" className={s.secTitle}>Up the Foxley Flight</h2>
            <p data-edit="lock.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Seven locks in half a mile, rising 51 feet. Everyone does their first one here on the Monday morning, with Jo from the wharf walking alongside.</p>
          </div>

          <div className={s.flight} role="img" aria-label="Diagram of the Foxley Flight: seven locks, numbered 15 to 21, each raising the boat about seven feet, climbing left to right">
            <div data-edit-pattern="lock.field" data-edit-roles="transparent,1,1,3,2,1" className={s.banks} aria-hidden="true">
              <TabbiedPattern
                pattern={bight}
                palette={BANKS}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={28}
                seed="slow-water-banks"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            {Array.from({ length: 8 }, (_, i) => (
              <span key={`pound-${i}`} className={s.pound} style={{ left: `${i * 12.5}%`, bottom: `${17 + i * 8}%` }} aria-hidden="true" />
            ))}
            {FLIGHT.map(([n, rise], k) => (
              <span key={n} className={s.gate} style={{ left: `${(k + 1) * 12.5}%`, bottom: `${17 + k * 8}%` }} aria-hidden="true">
                <span data-edit={`lock.gateNo.${k}`} data-edit-max="60" className={s.gateNo}>{n}</span>
                <span data-edit={`lock.gateRise.${k}`} data-edit-max="60" className={s.gateRise}>{rise}</span>
              </span>
            ))}
            <span data-edit="lock.text" data-edit-max="60" className={s.flightStart} aria-hidden="true">Brindley side</span>
            <span data-edit="lock.text2" data-edit-max="60" className={s.flightEnd} aria-hidden="true">Foxley Top</span>
          </div>

          <ol className={s.lockSteps}>
            {LOCK_STEPS.map(([title, note], i) => (
              <li key={title}>
                <span className={s.stepNo}>{i + 1}</span>
                <h3 data-edit={`lock.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                <p data-edit={`lock.stepNote.${i}`} data-edit-max="240" data-edit-multiline className={s.stepNote}>{note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- ABOARD */}
        <section id="aboard" className={s.sec} aria-labelledby="aboard-h">
          <div className={s.secHead}>
            <p data-edit="aboard.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>What is aboard</p>
            <h2 data-edit="aboard.secTitle" data-edit-max="60" id="aboard-h" className={s.secTitle}>Bring food and a jumper</h2>
            <p data-edit="aboard.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Everything else is on the boat, checked by Jo the morning you arrive. Tanks full, gas full, beds made.</p>
          </div>
          <ul className={s.tins}>
            {ABOARD.map((group, i) => (
              <li key={group.title} className={s.tin}>
                <h3 data-edit={`aboard.tinTitle.${i}`} data-edit-max="40" className={s.tinTitle}>{group.title}</h3>
                <ul className={s.tinList}>
                  {group.items.map((item, i2) => (
                    <li data-edit={`aboard.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ DOGS
            A frieze of the roses along the top edge, cropped and turned
            back to front on every other panel. */}
        <section id="dogs" className={s.dogsSec} aria-labelledby="dogs-h">
          <div className={s.frieze} aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={`frieze-${i}`} className={i % 2 ? `${s.friezeTile} ${s.mirror}` : s.friezeTile}>
                <Artwork
                  slug="slow-water-boats-roses"
                  alt=""
                  inks={{ red: 'var(--red)', blue: 'var(--yellow)', yellow: 'var(--cream)', black: 'var(--blue)' }}
                  className={s.friezeArt}
                />
              </span>
            ))}
          </div>
          <div className={s.dogsInner}>
            <div className={s.dogsHead}>
              <p data-edit="dogs.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Dogs welcome</p>
              <h2 data-edit="dogs.secTitle" data-edit-max="60" id="dogs-h" className={s.secTitle}>Bring the dog</h2>
              <p data-edit="dogs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Half our boats go out with a dog on the roof. The towpath is the best walk in the county, and it goes the whole way.</p>
            </div>
            <dl className={s.dogRules}>
              {DOG_RULES.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`dogs.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`dogs.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- BREAKS */}
        <section id="breaks" className={s.sec} aria-labelledby="breaks-h">
          <div className={s.secHead}>
            <p data-edit="breaks.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Short breaks</p>
            <h2 data-edit="breaks.secTitle" data-edit-max="60" id="breaks-h" className={s.secTitle}>Three or four nights</h2>
            <p data-edit="breaks.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>March to May and September to November, when the water is quiet. Handover at 14:00, back by 09:30 on your last morning.</p>
          </div>

          <div className={s.breaksGrid}>
            <ul className={s.breakList}>
              {BREAKS.map(([name, when, where], i) => (
                <li key={name} className={s.breakItem}>
                  <p data-edit={`breaks.breakName.${i}`} data-edit-max="240" data-edit-multiline className={s.breakName}>{name}</p>
                  <p data-edit={`breaks.breakWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.breakWhen}>{when}</p>
                  <p data-edit={`breaks.breakWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.breakWhere}>{where}</p>
                </li>
              ))}
            </ul>
            <table className={s.breakTable}>
              <caption data-edit="breaks.srOnly" className={s.srOnly}>Short break prices by boat</caption>
              <thead>
                <tr>
                  <th data-edit="breaks.heading" scope="col">Boat</th>
                  <th data-edit="breaks.heading2" scope="col">Weekend</th>
                  <th data-edit="breaks.heading3" scope="col">Midweek</th>
                </tr>
              </thead>
              <tbody>
                {BREAK_PRICES.map(([boat, wk, mid], i) => (
                  <tr key={boat}>
                    <th data-edit={`breaks.heading4.${i}`} scope="row">{boat}</th>
                    <td data-edit={`breaks.cell.${i}`}>{wk}</td>
                    <td data-edit={`breaks.cell2.${i}`}>{mid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <form className={s.form} action="#">
              <p data-edit="book.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Book</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Ask for dates</h2>
              <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Tell us roughly when and who. We reply within a day with what is free; a deposit of a quarter holds it.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="sw-name">Name</label>
                  <input id="sw-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="sw-email">Email</label>
                  <input id="sw-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="sw-boat">Boat</label>
                  <select id="sw-boat" name="boat" defaultValue="kingfisher">
                    <option value="otter">Otter, 2 berths</option>
                    <option value="kingfisher">Kingfisher, 4 berths</option>
                    <option value="heron">Heron, 6 berths</option>
                    <option value="any">Whichever is free</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="sw-nights">How long</label>
                  <select id="sw-nights" name="nights" defaultValue="7">
                    <option value="3">Weekend, 3 nights</option>
                    <option value="4">Midweek, 4 nights</option>
                    <option value="7">A week</option>
                    <option value="14">Two weeks</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label5" htmlFor="sw-date">Starting around</label>
                  <input id="sw-date" name="date" type="text" placeholder="e.g. late May" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label6" htmlFor="sw-people">People, and dogs</label>
                  <input id="sw-people" name="people" type="text" placeholder="e.g. 3 and a spaniel" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="book.label7" htmlFor="sw-first">Been on a narrowboat before?</label>
                  <select id="sw-first" name="first" defaultValue="no">
                    <option value="no">No, first time</option>
                    <option value="once">Once or twice</option>
                    <option value="often">Plenty of times</option>
                  </select>
                </div>
              </div>
              <button data-edit="book.btn" data-edit-max="24" className={s.btn} type="submit">Send it to the wharf</button>
            </form>

            <aside className={s.wharf} aria-labelledby="wharf-h">
              <div data-edit-pattern="wharf.field" data-edit-roles="transparent,2,3,4,0,1" className={s.bunting} aria-hidden="true">
                <TabbiedPattern
                  pattern={drift}
                  palette={BUNTING}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={36}
                  seed="slow-water-bunting"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={`${s.painted} ${s.wharfPanel}`}>
                <span className={s.corners} aria-hidden="true"><span /></span>
                <h3 data-edit="wharf.wharfTitle" data-edit-max="40" id="wharf-h" className={s.wharfTitle}>Wharf Cottage</h3>
                <p data-edit="wharf.wharfLine" data-edit-max="240" data-edit-multiline className={s.wharfLine}>Lock 14, the Tamber Canal</p>
                <p data-edit="wharf.wharfLine2" data-edit-max="240" data-edit-multiline className={s.wharfLine}>Brindley Wharf</p>
                <p className={s.wharfPhone}>
                  <a data-edit="wharf.link" data-edit-max="28" href="tel:+15550186614">(555) 018-6614</a>
                </p>
                <p className={s.wharfLine}>
                  <a data-edit="wharf.link2" data-edit-max="28" href="mailto:wharf@slowwaterboats.example">wharf@slowwaterboats.example</a>
                </p>
                <p data-edit="wharf.wharfNote" data-edit-max="240" data-edit-multiline className={s.wharfNote}>Handover at 14:00 with a cup of tea, a lock lesson and the keys.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,4,0,1,0" className={s.footWater} aria-hidden="true">
          <TabbiedPattern
            pattern={wavelet}
            palette={WAKE}
            options={{ frequency: 0.6 }}
            fit="grid"
            cellSize={32}
            seed="slow-water-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Slow Water Boats</p>
          <div className={s.footText}>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Wharf Cottage, Lock 14, the Tamber Canal, Brindley Wharf.</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional boat hire company; the boats, canal, locks and prices are invented.</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The roses and the boats are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
