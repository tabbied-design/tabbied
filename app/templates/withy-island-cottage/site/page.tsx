import { TabbiedPattern } from 'tabbied/react';
import { eyot } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './withy-island-cottage.module.css';

export const metadata = {
  title: 'Withy Island Cottage: A riverside holiday cottage for four',
  description:
    'Withy Island Cottage stands on its own willow island in the river, a footbridge from the lane. Two bedrooms, a woodstove, a punt and a jetty. Weekly stays in summer, short breaks in winter.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The eyot is
   the island itself: a river islet held between two straight banks, cell
   after cell, in reed, moss and willow over the river's own color. It is
   the plate tipped into the guest book, the river map and the footer. */
const LINEN = '#f3eee0';
const WILLOW = '#2f4a3a';
const RIVER = '#5b8c99';
const REED = '#c2a75a';
const MOSS = '#8aa37c';
const ROSE = '#b0603f';

const PLATE = ['transparent', LINEN, REED, MOSS, WILLOW, REED];
const MAP = ['transparent', MOSS, REED, LINEN, MOSS, ROSE];
const BANKS = ['transparent', REED, MOSS, RIVER, LINEN, MOSS];

const NAV = [
  ['The rooms', '#rooms'],
  ['The river', '#river'],
  ['Availability', '#availability'],
  ['House rules', '#rules'],
  ['Getting there', '#getting-there'],
  ['Book', '#book'],
];

type Room = { name: string; sleeps: string; text: string };

const ROOMS: Room[] = [
  { name: 'The sitting room', sleeps: 'Woodstove, two sofas', text: 'Low beams, a window seat over the water and a shelf of other guests\' paperbacks. The stove is lit for you on arrival from October to April.' },
  { name: 'The kitchen', sleeps: 'Range, table for six', text: 'A plain kitchen that works: a gas range, a big table, proper knives and a kettle that sings. Eggs from the farm on the lane are in the larder.' },
  { name: 'The willow room', sleeps: 'Double bed', text: 'The bigger bedroom, looking downstream to the weir. You hear the water all night, and the willows brush the window when the wind is up.' },
  { name: 'The boathouse room', sleeps: 'Two single beds', text: 'Up the outside stair, over the boathouse, under the eaves. Children love it. Tall adults mind the beam by the door.' },
  { name: 'The bathroom', sleeps: 'Bath and shower', text: 'A deep bath under a skylight, a rainfall shower, towels and a heated rail. Bring river shoes; leave them at the door.' },
  { name: 'The garden and jetty', sleeps: 'Punt, canoe, firepit', text: 'An acre of meadow round the cottage, a firepit, and the jetty with the punt and a two-seat canoe, both yours for the week.' },
];

const RIVER_SPOTS = [
  ['1', 'The jetty', 'Swim from the steps when the flag on the boathouse is green. Never below the weir.'],
  ['2', 'Kingfisher bend', 'Sit on the bench by the alders at dawn. They nest in the far bank most springs.'],
  ['3', 'The ferry', 'A rowing ferry crosses to the Swan at Ashcombe, Thursday to Sunday, noon to six.'],
  ['4', 'The weir pool', 'Fishing for chub and perch, with a day ticket from the lock keeper.'],
];

type Day = { d: number; booked: boolean } | null;
type Month = { name: string; days: Day[] };

/* Weeks run Saturday to Saturday in summer; the grid starts on Monday. */
function month(name: string, offset: number, length: number, booked: number[][]): Month {
  const days: Day[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= length; d++) {
    days.push({ d, booked: booked.some(([from, to]) => d >= from && d < to) });
  }
  return { name, days };
}

const MONTHS: Month[] = [
  month('May 2027', 5, 31, [[1, 8], [15, 22], [29, 32]]),
  month('June 2027', 1, 30, [[1, 12], [19, 31]]),
  month('July 2027', 3, 31, [[1, 10], [17, 32]]),
];

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const RATES = [
  ['April, May, September', '$1,150 a week'],
  ['June and October half-term', '$1,450 a week'],
  ['July and August', '$1,850 a week'],
  ['November to March', '$520 for three nights'],
];

const RULES = [
  'Shoes off at the boathouse stair, please. It is steep and the treads are oak.',
  'Life jackets hang in the boathouse. Wear one in the punt and the canoe, every time.',
  'Swim only from the jetty steps, and only when the flag is green. Never below the weir.',
  'Two dogs are welcome. Not on the beds, and not in the meadow when the sheep are in.',
  'Keep the jetty gate shut in May: the swans nest under the alders beside it.',
  'The stove is yours to keep going. More logs in the store; kindling in the basket.',
  'Leave on the last Saturday by ten, with the key back in the tin on the bridge.',
];

const ROUTES = [
  ['By train', 'Ashcombe Halt is on the branch line, two hours from the city. From the station, a fifteen-minute walk along the towpath, or we meet you with the barrow for the bags.'],
  ['By car', 'Mill Lane ends at a gate with two parking spaces. The cottage is 200 yards on, over the footbridge. Wheelbarrows are by the gate for the shopping.'],
  ['By boat', 'Moor at our jetty, on the left bank above the weir, two hours upstream from the river mouth. Tell us your draught; the channel is shallow in August.'],
];

const ENTRIES = [
  ['We came for a week and stayed for the kingfisher. Saw it on the last morning, of course.', 'The Okonkwo family', 'August'],
  ['The punt is harder than it looks and the river is colder than it looks. Both worth it.', 'Hal and Priya', 'June'],
  ['Read four books, lit the stove every night, spoke to nobody but the heron. Perfect.', 'M. Lindqvist', 'November'],
];

export default function WithyIslandCottagePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--linen': '#f3eee0',
        '--willow': '#2f4a3a',
        '--river': '#5b8c99',
        '--reed': '#c2a75a',
        '--moss': '#8aa37c',
        '--rose': '#b0603f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="linen,willow,river,reed,moss,rose"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Mulish:wght@400;600;700&family=Caveat:wght@500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Withy Island Cottage</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>On the river at Ashcombe</span>
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
            The guest book lying open on the table: the welcome on the left
            page, a plate of the river tipped in on the right. */}
        <section id="welcome" className={s.hero} aria-labelledby="hero-h">
          <div className={s.book}>
            <div className={s.leftPage}>
              <p data-edit="welcome.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The guest book, page one</p>
              <h1 data-edit="welcome.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                A cottage on its own island, <em>a footbridge from the lane.</em>
              </h1>
              <p data-edit="welcome.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Withy Island is an acre of willow and meadow in the middle of
                the river, with one stone cottage on it. Two bedrooms, a
                woodstove, a punt at the jetty, and nobody else.
              </p>
              <div className={s.heroActions}>
                <a data-edit="welcome.button" data-edit-max="28" className={s.button} href="#availability">See free weeks</a>
                <a data-edit="welcome.ghost" data-edit-max="28" className={s.ghost} href="#rooms">Look round</a>
              </div>
              <ul className={s.facts}>
                <li data-edit="welcome.item" data-edit-max="80">Sleeps four</li>
                <li data-edit="welcome.item2" data-edit-max="80">Two dogs welcome</li>
                <li data-edit="welcome.item3" data-edit-max="80">From $1,150 a week</li>
              </ul>
            </div>
            <div className={s.rightPage}>
              <div className={s.plate}>
                <div data-edit-pattern="welcome.field" data-edit-roles="transparent,0,3,4,1,3" className={s.plateField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={eyot}
                    palette={PLATE}
                    fit="grid"
                    cellSize={56}
                    seed="withy-plate"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <p data-edit="welcome.plateCaption" data-edit-max="240" data-edit-multiline className={s.plateCaption}>Plate I. The island between its banks, from the footbridge.</p>
              <p data-edit="welcome.signature" data-edit-max="240" data-edit-multiline className={s.signature}>Welcome. Put the kettle on.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROOMS */}
        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p data-edit="rooms.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Page two</p>
            <h2 data-edit="rooms.secTitle" data-edit-max="60" id="rooms-h" className={s.secTitle}>The rooms</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A two-hundred-year-old ferryman's cottage, mended rather than
              made over. Everything you need, nothing that beeps.
            </p>
          </div>
          <ul className={s.rooms}>
            {ROOMS.map((r, i) => (
              <li key={r.name} className={s.room}>
                <h3 data-edit={`rooms.roomName.${i}`} data-edit-max="40" className={s.roomName}>{r.name}</h3>
                <p data-edit={`rooms.roomSleeps.${i}`} data-edit-max="240" data-edit-multiline className={s.roomSleeps}>{r.sleeps}</p>
                <p data-edit={`rooms.roomText.${i}`} data-edit-max="240" data-edit-multiline className={s.roomText}>{r.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- RIVER
            A map of the reach, drawn as the eyot, with four places pinned. */}
        <section id="river" className={s.sec} aria-labelledby="river-h">
          <div className={s.riverGrid}>
            <div className={s.mapBox}>
              <div data-edit-pattern="river.field" data-edit-roles="transparent,4,3,0,4,5" className={s.mapField} aria-hidden="true">
                <TabbiedPattern
                  pattern={eyot}
                  palette={MAP}
                  fit="grid"
                  cellSize={44}
                  seed="withy-map"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ol className={s.pins} aria-hidden="true">
                {RIVER_SPOTS.map(([n], i) => (
                  <li data-edit={`river.item.${i}`} data-edit-max="80" key={n} className={s[`pin${n}`]}>{n}</li>
                ))}
              </ol>
            </div>
            <div className={s.riverText}>
              <p data-edit="river.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Page three</p>
              <h2 data-edit="river.secTitle" data-edit-max="60" id="river-h" className={s.secTitle}>The river</h2>
              <p data-edit="river.riverLead" data-edit-max="240" data-edit-multiline className={s.riverLead}>
                The island splits the river in two: a fast channel on the weir
                side, a slow backwater on the meadow side where the punt lives.
              </p>
              <ol className={s.spots}>
                {RIVER_SPOTS.map(([n, place, note], i) => (
                  <li key={n}>
                    <span data-edit={`river.spotNo.${i}`} data-edit-max="60" className={s.spotNo}>{n}</span>
                    <h3 data-edit={`river.spotName.${i}`} data-edit-max="40" className={s.spotName}>{place}</h3>
                    <p data-edit={`river.spotNote.${i}`} data-edit-max="240" data-edit-multiline className={s.spotNote}>{note}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- AVAILABILITY */}
        <section id="availability" className={s.sec} aria-labelledby="availability-h">
          <div className={s.secHead}>
            <p data-edit="availability.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Page four</p>
            <h2 data-edit="availability.secTitle" data-edit-max="60" id="availability-h" className={s.secTitle}>Free weeks next summer</h2>
            <p data-edit="availability.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Summer stays run Saturday to Saturday. Struck-through days are
              taken; everything else is free. Winter short breaks start any day.
            </p>
          </div>
          <div className={s.calendarGrid}>
            {MONTHS.map((m, i) => (
              <div key={m.name} className={s.month}>
                <h3 data-edit={`availability.monthName.${i}`} data-edit-max="40" className={s.monthName}>{m.name}</h3>
                <div className={s.weekdays} aria-hidden="true">
                  {WEEKDAYS.map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </div>
                <div className={s.days}>
                  {m.days.map((day, j) =>
                    day ? (
                      <span data-edit={`availability.booked.${i}.${j}`} data-edit-max="60" key={j} className={day.booked ? s.booked : s.free}>{day.d}</span>
                    ) : (
                      <span key={j} className={s.blank} aria-hidden="true" />
                    )
                  )}
                </div>
              </div>
            ))}
            <div className={s.rates}>
              <h3 data-edit="availability.ratesTitle" data-edit-max="40" className={s.ratesTitle}>Rates</h3>
              <dl className={s.rateList}>
                {RATES.map(([when, price], i) => (
                  <div key={when}>
                    <dt data-edit={`availability.term.${i}`} data-edit-max="28">{when}</dt>
                    <dd data-edit={`availability.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="availability.ratesNote" data-edit-max="240" data-edit-multiline className={s.ratesNote}>Linen, towels, logs and the boats included. A $200 deposit holds a week.</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,4,2,0,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={eyot}
            palette={BANKS}
            fit="grid"
            cellSize={40}
            seed="withy-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={s.sec} aria-labelledby="rules-h">
          <div className={s.rulesGrid}>
            <div>
              <p data-edit="rules.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Page five</p>
              <h2 data-edit="rules.secTitle" data-edit-max="60" id="rules-h" className={s.secTitle}>The rules of the house</h2>
              <p data-edit="rules.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Seven of them, pinned inside the boathouse door. Most are about
                the river, and all of them are there for a reason.
              </p>
            </div>
            <ol className={s.rules}>
              {RULES.map((r, i) => (
                <li data-edit={`rules.item.${i}`} data-edit-max="80" key={r}>{r}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------- GETTING THERE */}
        <section id="getting-there" className={s.sec} aria-labelledby="getting-h">
          <div className={s.secHead}>
            <p data-edit="gettingThere.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Page six</p>
            <h2 data-edit="gettingThere.secTitle" data-edit-max="60" id="getting-h" className={s.secTitle}>How to get there</h2>
            <p data-edit="gettingThere.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              No car reaches the island. Everyone arrives on foot over the
              footbridge, or by water.
            </p>
          </div>
          <div className={s.routes}>
            {ROUTES.map(([how, text], i) => (
              <div key={how} className={s.route}>
                <h3 data-edit={`gettingThere.routeHow.${i}`} data-edit-max="40" className={s.routeHow}>{how}</h3>
                <p data-edit={`gettingThere.routeText.${i}`} data-edit-max="240" data-edit-multiline className={s.routeText}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- GUESTBOOK */}
        <section id="guestbook" className={s.sec} aria-labelledby="guestbook-h">
          <h2 data-edit="guestbook.entriesTitle" data-edit-max="60" id="guestbook-h" className={s.entriesTitle}>From the guest book</h2>
          <ul className={s.entries}>
            {ENTRIES.map(([text, who, when], i) => (
              <li key={who} className={s.entry}>
                <blockquote data-edit={`guestbook.entryText.${i}`} data-edit-max="240" data-edit-multiline className={s.entryText}>{text}</blockquote>
                <p data-edit={`guestbook.entryWho.${i}`} data-edit-max="240" data-edit-multiline className={s.entryWho}>{who}</p>
                <p data-edit={`guestbook.entryWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.entryWhen}>{when}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.bookInfo}>
              <p data-edit="book.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Page seven</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Ask for a week</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                We answer every request the same day. Bookings are held for
                three days while you think about it.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Address</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Withy Island, end of Mill Lane, Ashcombe</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550184412">(555) 018-4412</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:stay@withyisland.example">stay@withyisland.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Calls</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Every day, 9 to 7. Arrivals from 4 pm.</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label" htmlFor="wi-name">Your name</label>
                <input id="wi-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="wi-email">Email</label>
                <input id="wi-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="wi-guests">Guests</label>
                <input id="wi-guests" name="guests" type="number" min={1} max={4} />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="wi-arrive">Arriving</label>
                <input id="wi-arrive" name="arrive" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="wi-leave">Leaving</label>
                <input id="wi-leave" name="leave" type="date" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label6" htmlFor="wi-note">Anything we should know, dogs included</label>
                <textarea id="wi-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send the request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2,0,4" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={eyot}
            palette={BANKS}
            fit="grid"
            cellSize={34}
            seed="withy-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Withy Island Cottage</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional holiday cottage. The island, the people, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
