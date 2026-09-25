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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4f0ea',
        '--ink': '#1e1b18',
        '--wren': '#7d5a44',
        '--stone': '#a0968b',
        '--linen': '#e6ded3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,wren,stone,linen"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gilda+Display&family=Jost:wght@300;400;500&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">The Wren</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Check rates</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The key hangs in an arched wallpaper panel; the ogee is the
            pattern on the landing walls. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>A hotel of eleven rooms, Tanner Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Eleven rooms, and a <em>brass key</em> for each.
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              The Wren is an old bookbinder's building turned into a small
              hotel: eleven rooms over three floors, a bar where the presses
              stood, breakfast until eleven, and a key on a tassel you will
              not lose.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Check rates</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#rooms">See the rooms</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3" className={s.heroWall} aria-hidden="true">
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
            {FACTS.map(([value, label], i) => (
              <div key={label}>
                <dt data-edit={`hero.term.${i}`} data-edit-max="28">{value}</dt>
                <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- ROOMS
            Three kinds of room, each a large picture and its facts, the
            sides swapping from one row to the next. */}
        <section id="rooms" className={s.rooms} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p data-edit="rooms.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Rooms</p>
            <h2 data-edit="rooms.title" data-edit-max="60" id="rooms-h">Three kinds of room, eleven doors.</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every room has its own bathroom, blackout curtains, a proper
              mattress and windows that open. Rates are for two, before tax.
            </p>
          </div>

          <div className={s.roomList}>
            {ROOMS.map((r, i) => (
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
                  <p data-edit={`room.roomWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.roomWhere}>{r.where}</p>
                  <h3 data-edit={`room.roomName.${i}`} data-edit-max="40" className={s.roomName}>{r.name}</h3>
                  <p data-edit={`room.roomBody.${i}`} data-edit-max="240" data-edit-multiline className={s.roomBody}>{r.body}</p>
                  <dl className={s.specs}>
                    {r.specs.map(([k, v], i2) => (
                      <div key={k}>
                        <dt data-edit={`room.term.${i}.${i2}`} data-edit-max="28">{k}</dt>
                        <dd data-edit={`room.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className={s.amenities} aria-label={`In the ${r.name} rooms`}>
                    {r.amenities.map((a, i2) => (
                      <li key={a.label}>
                        <span className={`${s.icon} ${s[a.icon]}`} aria-hidden="true" />
                        <span data-edit={`room.text.${i}.${i2}`} data-edit-max="60">{a.label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={s.roomFoot}>
                    <strong data-edit={`room.rate.${i}`} className={s.rate}>{r.rate}</strong>
                    <a data-edit={`room.roomLink.${i}`} data-edit-max="28" className={s.roomLink} href="#book">{r.cta}</a>
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
              <p data-edit="house.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>The house</p>
              <h2 data-edit="house.title" data-edit-max="60" id="house-h">Downstairs, and in between.</h2>
              <p data-edit="house.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The ground floor belongs to guests and to the street in equal
                parts. Nobody needs a room key to have a drink.
              </p>
            </div>
            <div className={s.houseGrid}>
              {HOUSE.map((h, i) => (
                <article key={h.title} className={s.houseCard}>
                  <h3 data-edit={`houseCard.title.${i}`} data-edit-max="40">{h.title}</h3>
                  <p data-edit={`houseCard.houseTime.${i}`} data-edit-max="240" data-edit-multiline className={s.houseTime}>{h.time}</p>
                  <p data-edit={`houseCard.body.${i}`} data-edit-max="240" data-edit-multiline>{h.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- NEIGHBORHOOD
            Minutes on foot, drawn as the length of a rule. */}
        <section id="neighborhood" className={s.hood} aria-labelledby="hood-h">
          <div data-edit-pattern="neighborhood.field" data-edit-roles="transparent,4,3" className={s.hoodBand} aria-hidden="true">
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
              <p data-edit="neighborhood.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Neighborhood</p>
              <h2 data-edit="neighborhood.title" data-edit-max="60" id="hood-h">Everything worth it is a short walk.</h2>
              <p data-edit="neighborhood.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tanner Street runs from the station to the harbor. We are
                halfway along it, above the bookshop, and the front desk keeps
                a hand-drawn map for you.
              </p>
            </div>
            <ol className={s.places}>
              {PLACES.map((p, i) => (
                <li key={p.name} className={s.place} style={{ '--min': p.min } as React.CSSProperties}>
                  <span className={s.placeMin}>{`${p.min} min`}</span>
                  <span data-edit={`neighborhood.placeName.${i}`} data-edit-max="60" className={s.placeName}>{p.name}</span>
                  <span data-edit={`neighborhood.placeWhat.${i}`} data-edit-max="60" className={s.placeWhat}>{p.what}</span>
                  <span className={s.placeRule} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- RATES */}
        <section id="rates" className={s.rates} aria-labelledby="rates-h">
          <div className={s.secHead}>
            <p data-edit="rates.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Rates</p>
            <h2 data-edit="rates.title" data-edit-max="60" id="rates-h">What a night costs, all year.</h2>
            <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Per room, per night, for two guests. A third guest in the Loft is
              $40. Breakfast is $18 each, or $30 for two added to any rate.
            </p>
          </div>
          <div className={s.rateTable} role="table" aria-label="Nightly rates by season">
            <div className={s.rateHead} role="row">
              <span data-edit="rates.text" data-edit-max="60" role="columnheader">Season</span>
              <span data-edit="rates.text2" data-edit-max="60" role="columnheader">Nest</span>
              <span data-edit="rates.text3" data-edit-max="60" role="columnheader">Study</span>
              <span data-edit="rates.text4" data-edit-max="60" role="columnheader">Loft</span>
            </div>
            {RATES.map((r, i) => (
              <div key={r.season} className={s.rateRow} role="row">
                <div className={s.rateSeason} role="rowheader">
                  <strong data-edit={`rates.emphasis.${i}`}>{r.season}</strong>
                  <small data-edit={`rates.note.${i}`}>{r.months}</small>
                </div>
                <div className={s.rateCell} role="cell">
                  <small data-edit={`rates.note2.${i}`}>Nest</small>
                  <span data-edit={`rates.text5.${i}`} data-edit-max="60">{r.nest}</span>
                </div>
                <div className={s.rateCell} role="cell">
                  <small data-edit={`rates.note3.${i}`}>Study</small>
                  <span data-edit={`rates.text6.${i}`} data-edit-max="60">{r.study}</span>
                </div>
                <div className={s.rateCell} role="cell">
                  <small data-edit={`rates.note4.${i}`}>Loft</small>
                  <span data-edit={`rates.text7.${i}`} data-edit-max="60">{r.loft}</span>
                </div>
              </div>
            ))}
          </div>
          <dl className={s.policies}>
            {POLICIES.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`rates.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`rates.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The ogee again, on the dark wall of the bar, with the key. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div data-edit-pattern="book.field" data-edit-roles="transparent,2,1" className={s.bookWall} aria-hidden="true">
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
              <p data-edit="book.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Book</p>
              <h2 data-edit="book.title" data-edit-max="60" id="book-h">Ask for a room, and we will hold it.</h2>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline>
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
                  <dt data-edit="book.term" data-edit-max="28">Call the desk</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>(555) 014-2290</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Write</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="mailto:stay@thewren.example">stay@thewren.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Find us</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>14 Tanner Street, above the bookshop</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="wren-arrive">Arriving</label>
                <input id="wren-arrive" name="arrive" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="wren-nights">Nights</label>
                <select id="wren-nights" name="nights" defaultValue="2">
                  <option value="1">1 night</option>
                  <option value="2">2 nights</option>
                  <option value="3">3 nights</option>
                  <option value="4">4 nights</option>
                  <option value="7">A week</option>
                </select>
              </div>
              <div className={`${s.field} ${s.span2}`}>
                <label data-edit="book.label3" htmlFor="wren-room">Room</label>
                <select id="wren-room" name="room" defaultValue="study">
                  <option value="nest">Nest, from $168</option>
                  <option value="study">Study, from $214</option>
                  <option value="loft">Loft, from $268</option>
                  <option value="any">Whichever is free</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="wren-name">Name</label>
                <input id="wren-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="wren-email">Email</label>
                <input id="wren-email" name="email" type="email" autoComplete="email" />
              </div>
              <label className={s.check} htmlFor="wren-breakfast">
                <input id="wren-breakfast" name="breakfast" type="checkbox" />
                <span data-edit="book.text" data-edit-max="60">Add breakfast for two, $30 a morning</span>
              </label>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request these dates</button>
              <small data-edit="book.formNote" className={s.formNote}>No payment now. We reply by email within four hours, 8 am to 10 pm.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>The Wren</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Eleven rooms above the bookshop on Tanner Street.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Stay</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.rooms" data-edit-max="28" href="#rooms">Rooms</a></li>
              <li><a data-edit="footer.rates" data-edit-max="28" href="#rates">Rates and policies</a></li>
              <li><a data-edit="footer.book" data-edit-max="28" href="#book">Book</a></li>
            </ul>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Visit</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.house" data-edit-max="28" href="#house">Bar and breakfast</a></li>
              <li><a data-edit="footer.neighborhood" data-edit-max="28" href="#neighborhood">Neighborhood</a></li>
            </ul>
          </div>
          <div>
            <h2 data-edit="footer.footHead3" data-edit-max="60" className={s.footHead}>Desk</h2>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
              14 Tanner Street
              <br />
              Old Harbor
              <br />
              (555) 014-2290
            </p>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional hotel. Rooms, rates and people are invented.</p>
          <p className={s.credit}>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
