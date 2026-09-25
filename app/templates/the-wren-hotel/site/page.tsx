import { TabbiedPattern } from 'tabbied/react';
import { lunette, ogee } from 'tabbied/patterns';
import s from './the-wren-hotel.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'The Wren: Boutique hotel, Tanner Street',
  description:
    'The Wren is a hotel of eleven rooms in an old bindery on Tanner Street, with a bar downstairs, breakfast until eleven and a brass key for every door.',
};

/* Site colors. The wallpaper fields take `transparent` first, so the
   ogee sits on the panel's own color rather than on a plate of its own. */
const INK = '#1E1B18';
const WREN = '#7D5A44';
const STONE = '#A0968B';
const LINEN = '#E6DED3';

const PAPER_WALL = ['transparent', WREN, STONE];
const NIGHT_WALL = ['transparent', WREN, INK];
const ARCHES = ['transparent', LINEN, STONE];

const NAV = [
  ['Rooms', '#rooms'],
  ['The house', '#house'],
  ['Neighborhood', '#neighborhood'],
  ['Rates', '#rates'],
  ['Book', '#book'],
];

const FACTS = [
  ['11', 'rooms on three floors'],
  ['$168', 'a night, from'],
  ['3 pm', 'check-in, 11 am out'],
  ['7-11', 'breakfast, every day'],
];

type Amenity = { icon: string; label: string };

type Picture = { slug: string; alt: string; place: string; inks: string[] };

type Room = {
  id: string;
  name: string;
  where: string;
  body: string;
  pictures: Picture[];
  specs: [string, string][];
  amenities: Amenity[];
  rate: string;
  cta: string;
};

const ROOMS: Room[] = [
  {
    id: 'nest',
    name: 'Nest',
    where: 'Rooms 1-5, second floor, courtyard side',
    body: 'Our smallest rooms, and our quietest: they look over the courtyard and the fig tree, not the street. A queen bed under the slope of the old roof, a reading lamp on each side, a shower lined in green tile.',
    pictures: [
      { slug: 'the-wren-hotel-lamp', alt: 'A bedside lamp with a pleated shade', place: 'solo', inks: ['var(--ink)', 'var(--paper)'] },
    ],
    specs: [
      ['Bed', 'Queen'],
      ['Size', '190 sq ft'],
      ['Sleeps', '2'],
      ['View', 'Courtyard'],
    ],
    amenities: [
      { icon: 'bed', label: 'Queen bed, linen sheets' },
      { icon: 'shower', label: 'Rain shower' },
      { icon: 'lamp', label: 'Two reading lamps' },
      { icon: 'tea', label: 'Kettle and loose tea' },
      { icon: 'wifi', label: 'Fast wifi' },
    ],
    rate: 'From $168 a night',
    cta: 'Book a Nest room',
  },
  {
    id: 'study',
    name: 'Study',
    where: 'Rooms 6-9, second and third floors, street side',
    body: 'The rooms where the binders kept their accounts. Tall windows over Tanner Street, a writing desk that was here before we were, and a velvet armchair set where the afternoon light lands.',
    pictures: [
      { slug: 'the-wren-hotel-armchair', alt: 'A velvet armchair', place: 'chairSolo', inks: ['var(--ink)', 'var(--linen)'] },
    ],
    specs: [
      ['Bed', 'King'],
      ['Size', '260 sq ft'],
      ['Sleeps', '2'],
      ['View', 'Tanner Street'],
    ],
    amenities: [
      { icon: 'bed', label: 'King bed' },
      { icon: 'chair', label: 'Velvet armchair' },
      { icon: 'desk', label: 'Writing desk' },
      { icon: 'window', label: 'Two street windows' },
      { icon: 'tea', label: 'Coffee and tea tray' },
    ],
    rate: 'From $214 a night',
    cta: 'Book a Study',
  },
  {
    id: 'loft',
    name: 'Loft',
    where: 'Rooms 10 and 11, top floor, both sides',
    body: 'The whole width of the building under the beams. A king bed at one end, a sitting room at the other, a clawfoot tub between them, and windows onto the harbor roofs one way and the courtyard the other.',
    pictures: [
      { slug: 'the-wren-hotel-armchair', alt: 'A velvet armchair', place: 'pairChair', inks: ['var(--wren)', 'var(--linen)'] },
      { slug: 'the-wren-hotel-lamp', alt: 'A lamp beside it', place: 'pairLamp', inks: ['var(--wren)', 'var(--linen)'] },
    ],
    specs: [
      ['Bed', 'King, plus a daybed'],
      ['Size', '410 sq ft'],
      ['Sleeps', '3'],
      ['View', 'Harbor roofs'],
    ],
    amenities: [
      { icon: 'bed', label: 'King bed and a daybed' },
      { icon: 'tub', label: 'Clawfoot tub' },
      { icon: 'chair', label: 'A sitting room' },
      { icon: 'window', label: 'Windows on both sides' },
      { icon: 'key', label: 'Its own landing' },
    ],
    rate: 'From $268 a night',
    cta: 'Book the Loft',
  },
];

const HOUSE = [
  {
    title: 'Breakfast',
    time: 'Daily, 7 to 11 am',
    body: 'In the front room: bread from Halden Bakery across the street, eggs any way, yogurt with stewed fruit, good coffee. $18, or included in the bed and breakfast rate.',
  },
  {
    title: 'The Bindery bar',
    time: 'Tuesday to Sunday, 4 pm to midnight',
    body: 'Downstairs, where the presses stood. Twelve seats at the bar, a short list of cocktails, wine by the glass and toasted sandwiches until 10.',
  },
  {
    title: 'The library',
    time: 'Always open to guests',
    body: 'Three walls of books left by guests and the bookshop next door, two armchairs, and an honesty tray of port and chocolate. Take a book, leave a book.',
  },
];

const PLACES = [
  { name: 'Halden Bakery', what: 'Bread, and the best cardamom bun in town', min: 1 },
  { name: 'Tanner Street Books', what: 'Next door, open until 8', min: 1 },
  { name: 'Harbor market', what: 'Fish, flowers and coffee, Tuesday to Saturday', min: 4 },
  { name: 'Old Harbor station', what: 'Trains to the city every 20 minutes', min: 6 },
  { name: 'The Ropewalk', what: 'A long park by the water, good for a run', min: 8 },
  { name: 'Maritime museum', what: 'Free on Thursday evenings', min: 12 },
];

const RATES = [
  { season: 'Winter', months: 'November to March', nest: '$168', study: '$214', loft: '$268' },
  { season: 'Spring and fall', months: 'April to June, September and October', nest: '$192', study: '$238', loft: '$298' },
  { season: 'Summer', months: 'July and August', nest: '$218', study: '$264', loft: '$336' },
];

const POLICIES = [
  ['Check-in', 'From 3 pm. Earlier if the room is ready; we will text you.'],
  ['Check-out', 'By 11 am. Bags can stay behind the desk all day.'],
  ['Cancellation', 'Free up to 48 hours before arrival, then one night is charged.'],
  ['Dogs', 'Welcome in the Nest rooms, $25 a stay, with a bed and a bowl.'],
  ['Parking', 'None of our own. Harbor garage is two blocks away, $22 a night.'],
  ['Access', 'An elevator to every floor. Room 6 is step-free with a roll-in shower.'],
];

export default function TheWrenHotelPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gilda+Display&family=Jost:wght@300;400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">The Wren</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBook} href="#book">Check rates</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The key hangs in an arched wallpaper panel; the ogee is the
            pattern on the landing walls. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>A hotel of eleven rooms, Tanner Street</p>
            <h1 className={s.heroTitle} id="hero-h">
              Eleven rooms, and a <em>brass key</em> for each.
            </h1>
            <p className={s.heroLede}>
              The Wren is an old bookbinder's building turned into a small
              hotel: eleven rooms over three floors, a bar where the presses
              stood, breakfast until eleven, and a key on a tassel you will
              not lose.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Check rates</a>
              <a className={s.btnGhost} href="#rooms">See the rooms</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroWall} aria-hidden="true">
              <TabbiedPattern
                pattern={ogee}
                palette={PAPER_WALL}
                fit="grid"
                cellSize={76}
                seed="wren-hall"
                options={{ frequency: 0.8 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="the-wren-hotel-key"
              alt="A brass room key on a ring with a heavy tassel"
              mode="tint"
              inks={['var(--ink)', 'var(--paper)']}
              className={s.heroKey}
            />
          </div>
          <dl className={s.facts}>
            {FACTS.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- ROOMS
            Three kinds of room, each a large picture and its facts, the
            sides swapping from one row to the next. */}
        <section id="rooms" className={s.rooms} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p className={s.secNo}>Rooms</p>
            <h2 id="rooms-h">Three kinds of room, eleven doors.</h2>
            <p className={s.secNote}>
              Every room has its own bathroom, blackout curtains, a proper
              mattress and windows that open. Rates are for two, before tax.
            </p>
          </div>

          <div className={s.roomList}>
            {ROOMS.map((r) => (
              <article key={r.id} className={s.room} id={`room-${r.id}`}>
                <div className={`${s.roomArt} ${s[r.id]}`}>
                  {r.pictures.map((p) => (
                    <Artwork
                      key={p.place}
                      slug={p.slug}
                      alt={p.alt}
                      mode="tint"
                      inks={p.inks}
                      className={`${s.roomPic} ${s[p.place]}`}
                    />
                  ))}
                </div>
                <div className={s.roomText}>
                  <p className={s.roomWhere}>{r.where}</p>
                  <h3 className={s.roomName}>{r.name}</h3>
                  <p className={s.roomBody}>{r.body}</p>
                  <dl className={s.specs}>
                    {r.specs.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className={s.amenities} aria-label={`In the ${r.name} rooms`}>
                    {r.amenities.map((a) => (
                      <li key={a.label}>
                        <span className={`${s.icon} ${s[a.icon]}`} aria-hidden="true" />
                        <span>{a.label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={s.roomFoot}>
                    <strong className={s.rate}>{r.rate}</strong>
                    <a className={s.roomLink} href="#book">{r.cta}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- HOUSE */}
        <section id="house" className={s.house} aria-labelledby="house-h">
          <div className={s.houseInner}>
            <div className={s.secHead}>
              <p className={s.secNo}>The house</p>
              <h2 id="house-h">Downstairs, and in between.</h2>
              <p className={s.secNote}>
                The ground floor belongs to guests and to the street in equal
                parts. Nobody needs a room key to have a drink.
              </p>
            </div>
            <div className={s.houseGrid}>
              {HOUSE.map((h) => (
                <article key={h.title} className={s.houseCard}>
                  <h3>{h.title}</h3>
                  <p className={s.houseTime}>{h.time}</p>
                  <p>{h.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- NEIGHBORHOOD
            Minutes on foot, drawn as the length of a rule. */}
        <section id="neighborhood" className={s.hood} aria-labelledby="hood-h">
          <div className={s.hoodBand} aria-hidden="true">
            <TabbiedPattern
              pattern={lunette}
              palette={ARCHES}
              fit="grid"
              cellSize={56}
              seed="tanner-street"
              options={{ frequency: 0.7 }}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.hoodInner}>
            <div className={s.secHead}>
              <p className={s.secNo}>Neighborhood</p>
              <h2 id="hood-h">Everything worth it is a short walk.</h2>
              <p className={s.secNote}>
                Tanner Street runs from the station to the harbor. We are
                halfway along it, above the bookshop, and the front desk keeps
                a hand-drawn map for you.
              </p>
            </div>
            <ol className={s.places}>
              {PLACES.map((p) => (
                <li key={p.name} className={s.place} style={{ '--min': p.min } as React.CSSProperties}>
                  <span className={s.placeMin}>{`${p.min} min`}</span>
                  <span className={s.placeName}>{p.name}</span>
                  <span className={s.placeWhat}>{p.what}</span>
                  <span className={s.placeRule} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- RATES */}
        <section id="rates" className={s.rates} aria-labelledby="rates-h">
          <div className={s.secHead}>
            <p className={s.secNo}>Rates</p>
            <h2 id="rates-h">What a night costs, all year.</h2>
            <p className={s.secNote}>
              Per room, per night, for two guests. A third guest in the Loft is
              $40. Breakfast is $18 each, or $30 for two added to any rate.
            </p>
          </div>
          <div className={s.rateTable} role="table" aria-label="Nightly rates by season">
            <div className={s.rateHead} role="row">
              <span role="columnheader">Season</span>
              <span role="columnheader">Nest</span>
              <span role="columnheader">Study</span>
              <span role="columnheader">Loft</span>
            </div>
            {RATES.map((r) => (
              <div key={r.season} className={s.rateRow} role="row">
                <div className={s.rateSeason} role="rowheader">
                  <strong>{r.season}</strong>
                  <small>{r.months}</small>
                </div>
                <div className={s.rateCell} role="cell">
                  <small>Nest</small>
                  <span>{r.nest}</span>
                </div>
                <div className={s.rateCell} role="cell">
                  <small>Study</small>
                  <span>{r.study}</span>
                </div>
                <div className={s.rateCell} role="cell">
                  <small>Loft</small>
                  <span>{r.loft}</span>
                </div>
              </div>
            ))}
          </div>
          <dl className={s.policies}>
            {POLICIES.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The ogee again, on the dark wall of the bar, with the key. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookWall} aria-hidden="true">
            <TabbiedPattern
              pattern={ogee}
              palette={NIGHT_WALL}
              fit="grid"
              cellSize={64}
              seed="wren-bar"
              options={{ frequency: 0.6 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.bookInner}>
            <div className={s.bookIntro}>
              <p className={s.kicker}>Book</p>
              <h2 id="book-h">Ask for a room, and we will hold it.</h2>
              <p>
                Tell us your dates and the room you would like. We answer every
                request by hand within a few hours, with a price for your exact
                nights and nothing to pay until you confirm.
              </p>
              <Artwork
                slug="the-wren-hotel-key"
                alt=""
                mode="tint"
                inks={['var(--wren)', 'var(--linen)']}
                className={s.bookKey}
              />
              <dl className={s.contact}>
                <div>
                  <dt>Call the desk</dt>
                  <dd>(555) 014-2290</dd>
                </div>
                <div>
                  <dt>Write</dt>
                  <dd>
                    <a href="mailto:stay@thewren.example">stay@thewren.example</a>
                  </dd>
                </div>
                <div>
                  <dt>Find us</dt>
                  <dd>14 Tanner Street, above the bookshop</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="wren-arrive">Arriving</label>
                <input id="wren-arrive" name="arrive" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="wren-nights">Nights</label>
                <select id="wren-nights" name="nights" defaultValue="2">
                  <option value="1">1 night</option>
                  <option value="2">2 nights</option>
                  <option value="3">3 nights</option>
                  <option value="4">4 nights</option>
                  <option value="7">A week</option>
                </select>
              </div>
              <div className={`${s.field} ${s.span2}`}>
                <label htmlFor="wren-room">Room</label>
                <select id="wren-room" name="room" defaultValue="study">
                  <option value="nest">Nest, from $168</option>
                  <option value="study">Study, from $214</option>
                  <option value="loft">Loft, from $268</option>
                  <option value="any">Whichever is free</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="wren-name">Name</label>
                <input id="wren-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="wren-email">Email</label>
                <input id="wren-email" name="email" type="email" autoComplete="email" />
              </div>
              <label className={s.check} htmlFor="wren-breakfast">
                <input id="wren-breakfast" name="breakfast" type="checkbox" />
                <span>Add breakfast for two, $30 a morning</span>
              </label>
              <button className={s.submit} type="submit">Request these dates</button>
              <small className={s.formNote}>No payment now. We reply by email within four hours, 8 am to 10 pm.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>The Wren</p>
            <p className={s.footTag}>Eleven rooms above the bookshop on Tanner Street.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Stay</h2>
            <ul className={s.footLinks}>
              <li><a href="#rooms">Rooms</a></li>
              <li><a href="#rates">Rates and policies</a></li>
              <li><a href="#book">Book</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Visit</h2>
            <ul className={s.footLinks}>
              <li><a href="#house">Bar and breakfast</a></li>
              <li><a href="#neighborhood">Neighborhood</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Desk</h2>
            <p className={s.footAddr}>
              14 Tanner Street
              <br />
              Old Harbor
              <br />
              (555) 014-2290
            </p>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional hotel. Rooms, rates and people are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
