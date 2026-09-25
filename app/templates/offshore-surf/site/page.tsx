import { TabbiedPattern } from 'tabbied/react';
import { cove, elbow, quarterfall, sunsetrings, tidering, wander, wavelet } from 'tabbied/patterns';
import s from './offshore-surf.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Offshore Surf Co.: Surf shop and surf school, Breakwater Road',
  description:
    'Offshore Surf Co. is a board shop and surf school at the end of Breakwater Road. See the quiver to scale, book a lesson, check the tides and rent a board by the hour, day or week.',
};

/* Site colors. Each board is cut out of a pattern whose first color is the
   board's own; the photograph's shading gives it its rails and stringer. */
const DEEP = '#0E2230';
const TEAL = '#1BA3B8';
const SUN = '#F4A259';
const FOAM = '#F1F5F4';
const PALE = '#DDE9EA';

const LOG_FILL = [SUN, TEAL, SUN, FOAM];
const MID_FILL = [TEAL, FOAM, SUN, DEEP];
const SHORT_FILL = [FOAM, TEAL, SUN, DEEP];
const FIN_FILL = [TEAL, PALE, DEEP];
const SWELL = ['transparent', TEAL, TEAL];

const NAV = [
  ['Quiver', '#quiver'],
  ['Lessons', '#lessons'],
  ['Tides', '#tides'],
  ['Rentals', '#rentals'],
  ['Visit', '#visit'],
];

type Board = {
  name: string;
  len: string;
  inches: number;
  dims: string;
  vol: string;
  fins: string;
  price: string;
  rent: string;
  art: string;
  design: typeof wavelet;
};

const LOGS: Board[] = [
  { name: 'The Log', len: '9\'6"', inches: 114, dims: '23 x 3 in', vol: '76 L', fins: 'Single', price: '$1,150', rent: '$45 a day', art: 'offshore-surf-longboard', design: sunsetrings },
  { name: 'Noserider', len: '9\'2"', inches: 110, dims: '22.75 x 2.9 in', vol: '71 L', fins: 'Single', price: '$1,080', rent: '$45 a day', art: 'offshore-surf-longboard', design: sunsetrings },
];

const MIDS: Board[] = [
  { name: 'Mid', len: '8\'0"', inches: 96, dims: '21.5 x 2.75 in', vol: '56 L', fins: '2 + 1', price: '$960', rent: '$40 a day', art: 'offshore-surf-longboard', design: cove },
  { name: 'Egg', len: '7\'2"', inches: 86, dims: '21 x 2.7 in', vol: '48 L', fins: '2 + 1', price: '$890', rent: '$40 a day', art: 'offshore-surf-longboard', design: wander },
];

const SHORTS: Board[] = [
  { name: 'Funboard', len: '6\'10"', inches: 82, dims: '20.5 x 2.6 in', vol: '41 L', fins: 'Thruster', price: '$820', rent: '$35 a day', art: 'offshore-surf-shortboard', design: quarterfall },
  { name: 'Shortboard', len: '6\'0"', inches: 72, dims: '19 x 2.4 in', vol: '29 L', fins: 'Thruster', price: '$760', rent: '$35 a day', art: 'offshore-surf-shortboard', design: elbow },
  { name: 'Fish', len: '5\'8"', inches: 68, dims: '20.5 x 2.5 in', vol: '33 L', fins: 'Twin', price: '$780', rent: '$35 a day', art: 'offshore-surf-shortboard', design: wavelet },
];

const REPORT = [
  ['Surf', '3-4 ft, clean'],
  ['Wind', 'Offshore NE, 8 mph'],
  ['Water', '64 F, a 4/3 suit'],
  ['Next high', '11:31 am, 5.4 ft'],
];

const LESSONS = [
  { name: 'Group lesson', time: '2 hours', price: '$75', body: 'Up to five people to one coach, on soft-tops in the white water. Board, wetsuit and a hot shower included.', kind: 'group' },
  { name: 'Private lesson', time: '90 minutes', price: '$140', body: 'One coach, one or two of you, at the pace you want. $190 for two people.', kind: 'private' },
  { name: 'Kids camp', time: 'Five mornings', price: '$320', body: 'Ages 8 to 14, Monday to Friday, 9 to 12. Beach games when the sea says no.', kind: 'kids' },
  { name: 'Coaching', time: '2 hours', price: '$110', body: 'For surfers who can already stand: out back, filmed, then a coffee and the video.', kind: 'coach' },
];

const WEEK = [
  { day: 'Mon', slots: [{ t: '7:30', k: 'group' }, { t: '10:00', k: 'private' }, { t: '3:30', k: 'group' }] },
  { day: 'Tue', slots: [{ t: '8:00', k: 'group' }, { t: '11:00', k: 'coach' }, { t: '4:00', k: 'private' }] },
  { day: 'Wed', slots: [{ t: '8:30', k: 'group' }, { t: '12:00', k: 'private' }, { t: '4:30', k: 'group' }] },
  { day: 'Thu', slots: [{ t: '9:00', k: 'kids' }, { t: '1:00', k: 'group' }, { t: '5:00', k: 'coach' }] },
  { day: 'Fri', slots: [{ t: '9:00', k: 'kids' }, { t: '1:30', k: 'group' }, { t: '5:30', k: 'private' }] },
  { day: 'Sat', slots: [{ t: '7:00', k: 'group' }, { t: '9:30', k: 'group' }, { t: '2:00', k: 'private' }] },
  { day: 'Sun', slots: [{ t: '7:30', k: 'coach' }, { t: '10:00', k: 'group' }, { t: '2:30', k: 'group' }] },
];

const KINDS = [
  { k: 'group', label: 'Group' },
  { k: 'private', label: 'Private' },
  { k: 'kids', label: 'Kids camp' },
  { k: 'coach', label: 'Coaching' },
];

const TIDES = [
  { day: 'Sat', date: 'Sep 26', low1: '5:12 am, 0.6 ft', high1: '11:31 am, 5.4 ft', low2: '5:40 pm, 0.9 ft', best: '8 to 10:30 am', wind: 'Offshore until 11' },
  { day: 'Sun', date: 'Sep 27', low1: '5:58 am, 0.4 ft', high1: '12:14 pm, 5.6 ft', low2: '6:25 pm, 0.7 ft', best: '8:30 to 11 am', wind: 'Light and variable' },
  { day: 'Mon', date: 'Sep 28', low1: '6:41 am, 0.3 ft', high1: '12:55 pm, 5.7 ft', low2: '7:08 pm, 0.6 ft', best: '9 to 11:30 am', wind: 'Onshore after 1' },
  { day: 'Tue', date: 'Sep 29', low1: '7:22 am, 0.4 ft', high1: '1:34 pm, 5.6 ft', low2: '7:49 pm, 0.7 ft', best: '10 am to noon', wind: 'Offshore, light' },
  { day: 'Wed', date: 'Sep 30', low1: '8:03 am, 0.6 ft', high1: '2:12 pm, 5.3 ft', low2: '8:30 pm, 0.9 ft', best: '10:30 am to 1', wind: 'Cross-shore, 12 mph' },
];

const RENTALS = [
  { item: 'Soft-top, 8 ft', note: 'For your first weeks', h: '$20', d: '$35', w: '$140' },
  { item: 'Any board in the quiver', note: 'Try before you buy', h: '$25', d: '$40', w: '$160' },
  { item: 'Wetsuit, 4/3', note: 'Chest zip, all sizes', h: '$10', d: '$18', w: '$70' },
  { item: 'Booties and hood', note: 'October to May', h: '$5', d: '$8', w: '$30' },
  { item: 'Bodyboard and fins', note: 'For kids and days off', h: '$12', d: '$20', w: '$80' },
];

const FAQ = [
  { q: 'Do I need to be a strong swimmer?', a: 'You need to be comfortable in water over your head and able to swim 50 yards. Lessons stay in the white water, waist deep, and your coach is always within reach.' },
  { q: 'What if the waves are too big, or flat?', a: 'We call it at 7 am and text you. You can move the lesson to any other slot or take the money back; your choice.' },
  { q: 'Can I rent a board without a lesson?', a: 'Yes, if you can paddle out and stand up on your own. We will ask a question or two and point you at the right peak.' },
  { q: 'Does rent count toward a board?', a: 'Up to three days of rent comes off the price of any board you buy from the quiver within a month.' },
];

export default function OffshoreSurfPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markSun} aria-hidden="true" />
          <span>Offshore Surf Co.</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barReport}>Today 3-4 ft, offshore</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ HERO, RACK
            The quiver stands in a row, every board drawn to scale against
            a height chart, with its numbers under its tail. */}
        <section id="quiver" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroHead}>
            <div className={s.heroText}>
              <p className={s.kicker}>Surf shop and surf school, Breakwater Road</p>
              <h1 className={s.title} id="hero-h">
                Seven boards, <em>drawn to scale.</em>
              </h1>
              <p className={s.lede}>
                This is the whole quiver, from the nine-and-a-half foot log to
                the fish. Every board here can be rented by the day, tried for
                a week and bought when you know.
              </p>
            </div>
            <dl className={s.report}>
              <div className={s.reportHead}>
                <dt>Surf report</dt>
                <dd>Friday, 6:40 am</dd>
              </div>
              {REPORT.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.rackWrap}>
            <div className={s.rack}>
              <div className={s.rackSea} aria-hidden="true">
                <TabbiedPattern
                  pattern={wavelet}
                  palette={SWELL}
                  fit="grid"
                  cellSize={40}
                  seed="breakwater"
                  options={{ frequency: 0.6 }}
                  redrawInterval={9000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ol className={s.scale} aria-hidden="true">
                <li>10 ft</li>
                <li>9 ft</li>
                <li>8 ft</li>
                <li>7 ft</li>
                <li>6 ft</li>
                <li>5 ft</li>
              </ol>
              <ul className={s.boards}>
                {LOGS.map((b) => (
                  <li key={b.name} className={s.board} style={{ '--len': b.inches } as React.CSSProperties}>
                    <div className={s.boardStand}>
                      <Artwork slug={b.art} alt={`${b.name}, ${b.len}`} mode="fill" inks={[]} className={s.boardPic}>
                        <TabbiedPattern
                          pattern={b.design}
                          palette={LOG_FILL}
                          fit="grid"
                          cellSize={26}
                          seed={b.name}
                          style={{ position: 'absolute', inset: 0 }}
                        />
                      </Artwork>
                    </div>
                    <div className={s.spec}>
                      <span className={s.specKind}>Log</span>
                      <span className={s.specName}>{b.name}</span>
                      <strong className={s.specLen}>{b.len}</strong>
                      <span>{b.dims}</span>
                      <span>{`${b.vol}, ${b.fins}`}</span>
                      <span className={s.specPrice}>{b.price}</span>
                      <span className={s.specRent}>{b.rent}</span>
                    </div>
                  </li>
                ))}
                {MIDS.map((b) => (
                  <li key={b.name} className={s.board} style={{ '--len': b.inches } as React.CSSProperties}>
                    <div className={s.boardStand}>
                      <Artwork slug={b.art} alt={`${b.name}, ${b.len}`} mode="fill" inks={[]} className={s.boardPic}>
                        <TabbiedPattern
                          pattern={b.design}
                          palette={MID_FILL}
                          fit="grid"
                          cellSize={24}
                          seed={b.name}
                          style={{ position: 'absolute', inset: 0 }}
                        />
                      </Artwork>
                    </div>
                    <div className={s.spec}>
                      <span className={s.specKind}>Mid-length</span>
                      <span className={s.specName}>{b.name}</span>
                      <strong className={s.specLen}>{b.len}</strong>
                      <span>{b.dims}</span>
                      <span>{`${b.vol}, ${b.fins}`}</span>
                      <span className={s.specPrice}>{b.price}</span>
                      <span className={s.specRent}>{b.rent}</span>
                    </div>
                  </li>
                ))}
                {SHORTS.map((b) => (
                  <li key={b.name} className={s.board} style={{ '--len': b.inches } as React.CSSProperties}>
                    <div className={s.boardStand}>
                      <Artwork slug={b.art} alt={`${b.name}, ${b.len}`} mode="fill" inks={[]} className={s.boardPic}>
                        <TabbiedPattern
                          pattern={b.design}
                          palette={SHORT_FILL}
                          fit="grid"
                          cellSize={24}
                          seed={b.name}
                          style={{ position: 'absolute', inset: 0 }}
                        />
                      </Artwork>
                    </div>
                    <div className={s.spec}>
                      <span className={s.specKind}>Short</span>
                      <span className={s.specName}>{b.name}</span>
                      <strong className={s.specLen}>{b.len}</strong>
                      <span>{b.dims}</span>
                      <span>{`${b.vol}, ${b.fins}`}</span>
                      <span className={s.specPrice}>{b.price}</span>
                      <span className={s.specRent}>{b.rent}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={s.swipe}>Swipe the rack for all seven boards</p>
          <p className={s.rackNote}>
            Not sure which? Tell us your height, weight and how often you surf,
            and we will hand you two to try.
          </p>
        </section>

        {/* --------------------------------------------------------- LESSONS */}
        <section id="lessons" className={s.lessons} aria-labelledby="lessons-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Surf school</p>
            <h2 id="lessons-h">Lessons, set by the tide</h2>
            <p className={s.secNote}>
              Times move with the tide, so the week is posted every Sunday
              evening. Book online, by phone, or at the shack.
            </p>
          </div>
          <div className={s.lessonGrid}>
            <ul className={s.lessonTypes}>
              {LESSONS.map((l) => (
                <li key={l.name} className={`${s.lessonType} ${s[l.kind]}`}>
                  <div className={s.lessonTop}>
                    <h3>{l.name}</h3>
                    <strong>{l.price}</strong>
                  </div>
                  <span className={s.lessonTime}>{l.time}</span>
                  <p>{l.body}</p>
                </li>
              ))}
            </ul>
            <div className={s.week}>
              <div className={s.weekHead}>
                <h3>This week</h3>
                <ul className={s.legend}>
                  {KINDS.map((k) => (
                    <li key={k.k}>
                      <span className={`${s.dot} ${s[k.k]}`} aria-hidden="true" />
                      <span>{k.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ol className={s.days}>
                {WEEK.map((d) => (
                  <li key={d.day} className={s.dayCol}>
                    <span className={s.dayName}>{d.day}</span>
                    <ul className={s.slots}>
                      {d.slots.map((sl) => (
                        <li key={sl.t} className={`${s.slot} ${s[sl.k]}`}>
                          <span>{sl.t}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
              <p className={s.weekNote}>
                Morning slots are am, the rest pm. Full lessons show on the
                booking page; we keep two places back for walk-ins every Saturday.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TIDES */}
        <section id="tides" className={s.tides} aria-labelledby="tides-h">
          <div className={s.tidesInner}>
            <div className={s.secHead}>
              <p className={s.secKick}>Tides at the breakwater</p>
              <h2 id="tides-h">The next five days</h2>
              <p className={s.secNote}>
                Our beach works best on a rising tide, two to three hours before
                high. The best window is our guess, and we are usually right.
              </p>
            </div>
            <div className={s.tideTable} role="table" aria-label="Tide times for the next five days">
              <div className={s.tideHead} role="row">
                <span role="columnheader">Day</span>
                <span role="columnheader">Low</span>
                <span role="columnheader">High</span>
                <span role="columnheader">Low</span>
                <span role="columnheader">Best window</span>
                <span role="columnheader">Wind</span>
              </div>
              {TIDES.map((t) => (
                <div key={t.date} className={s.tideRow} role="row">
                  <div className={s.tideDay} role="rowheader">
                    <strong>{t.day}</strong>
                    <span>{t.date}</span>
                  </div>
                  <div className={s.tideCell} role="cell">
                    <small>Low</small>
                    <span>{t.low1}</span>
                  </div>
                  <div className={`${s.tideCell} ${s.tideHigh}`} role="cell">
                    <small>High</small>
                    <span>{t.high1}</span>
                  </div>
                  <div className={s.tideCell} role="cell">
                    <small>Low</small>
                    <span>{t.low2}</span>
                  </div>
                  <div className={`${s.tideCell} ${s.tideBest}`} role="cell">
                    <small>Best window</small>
                    <span>{t.best}</span>
                  </div>
                  <div className={s.tideCell} role="cell">
                    <small>Wind</small>
                    <span>{t.wind}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- RENTALS */}
        <section id="rentals" className={s.rentals} aria-labelledby="rentals-h">
          <div className={s.rentText}>
            <div className={s.secHead}>
              <p className={s.secKick}>Rentals</p>
              <h2 id="rentals-h">By the hour, day or week</h2>
              <p className={s.secNote}>
                Two hours is the right length for a first go. Bring ID and a
                card for the deposit; we hose everything down for you.
              </p>
            </div>
            <div className={s.rentTable} role="table" aria-label="Rental prices">
              <div className={s.rentHead} role="row">
                <span role="columnheader">Item</span>
                <span role="columnheader">2 hours</span>
                <span role="columnheader">Day</span>
                <span role="columnheader">Week</span>
              </div>
              {RENTALS.map((r) => (
                <div key={r.item} className={s.rentRow} role="row">
                  <div className={s.rentItem} role="rowheader">
                    <strong>{r.item}</strong>
                    <span>{r.note}</span>
                  </div>
                  <div className={s.rentCell} role="cell">
                    <small>2 hours</small>
                    <span>{r.h}</span>
                  </div>
                  <div className={s.rentCell} role="cell">
                    <small>Day</small>
                    <span>{r.d}</span>
                  </div>
                  <div className={s.rentCell} role="cell">
                    <small>Week</small>
                    <span>{r.w}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className={s.fins} aria-labelledby="fins-h">
            <div className={s.finArt}>
              <Artwork slug="offshore-surf-fin" alt="A single surfboard fin" mode="fill" inks={[]} className={s.finPic}>
                <TabbiedPattern
                  pattern={tidering}
                  palette={FIN_FILL}
                  fit="grid"
                  cellSize={34}
                  seed="single-fin"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </Artwork>
            </div>
            <h3 id="fins-h">Fins, leashes, repairs</h3>
            <dl className={s.finList}>
              <div>
                <dt>Single fin, 9 in</dt>
                <dd>$38</dd>
              </div>
              <div>
                <dt>Thruster set</dt>
                <dd>$64</dd>
              </div>
              <div>
                <dt>Leash, 6 to 10 ft</dt>
                <dd>$32</dd>
              </div>
              <div>
                <dt>Ding repair</dt>
                <dd>from $40</dd>
              </div>
            </dl>
            <p className={s.finNote}>Dings back in three days, sanded flush and sun-cured.</p>
          </aside>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Visit</p>
            <h2 id="visit-h">The shack at the end of the road</h2>
            <p className={s.secNote}>
              Park in the lot by the breakwater, walk toward the flag, and
              the shack is the blue one with boards out front.
            </p>
          </div>
          <div className={s.visitGrid}>
            <div className={s.visitCard}>
              <h3>Open every day</h3>
              <dl className={s.hours}>
                <div>
                  <dt>April to October</dt>
                  <dd>7 am to 7 pm</dd>
                </div>
                <div>
                  <dt>November to March</dt>
                  <dd>8 am to 5 pm</dd>
                </div>
                <div>
                  <dt>Storm days</dt>
                  <dd>Shop only, 10 to 4</dd>
                </div>
              </dl>
              <p className={s.addr}>
                1 Breakwater Road
                <br />
                Next to the lifeguard tower
              </p>
              <p className={s.addr}>
                <a href="mailto:paddleout@offshore.example">paddleout@offshore.example</a>
              </p>
              <p className={s.addr}>(555) 019-3302</p>
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
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Offshore Surf Co.</p>
          <p className={s.footTag}>Boards, lessons and rentals at the end of Breakwater Road.</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional surf shop. Boards, tides and prices are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
