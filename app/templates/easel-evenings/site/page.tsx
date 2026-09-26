import { TabbiedPattern } from 'tabbied/react';
import { dimmer, drybrush } from 'tabbied/patterns';
import s from './easel-evenings.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Easel Evenings: Paint-and-sip classes, Tanner\'s Yard',
  description:
    'Easel Evenings runs two-hour paint-and-sip classes in Tanner\'s Yard. The calendar of classes, what your ticket includes, how an evening goes, the artists who lead them and private parties.',
};

/* Site colors. The canvases are dimmer fields: one solid ink per cell with
   a second color fading across it, the way wet paint drags into the next. */
const WALL = '#f5f0e6';
const INK = '#1c1b2b';
const CADMIUM = '#e2432a';
const ULTRA = '#2d3fbf';
const YELLOW = '#f3b11b';
const VIRIDIAN = '#178a6a';

const CANVAS = [INK, ULTRA, CADMIUM, YELLOW, VIRIDIAN, WALL];
const WARM = [CADMIUM, YELLOW, WALL, ULTRA, CADMIUM, VIRIDIAN];
const STROKES = ['transparent', INK, ULTRA, CADMIUM, VIRIDIAN, YELLOW];

const NAV = [
  ['Calendar', '#calendar'],
  ['What you get', '#included'],
  ['The evening', '#evening'],
  ['Artists', '#artists'],
  ['Parties', '#parties'],
  ['Book', '#book'],
];

type Night = {
  day: string;
  date: string;
  time: string;
  title: string;
  level: string;
  price: string;
  seats: string;
  status: string;
  paints: string[];
};

const NIGHTS: Night[] = [
  { day: 'Thu', date: '01', time: '7-9 pm', title: 'Lemon grove at dusk', level: 'Beginner', price: '$45', seats: '6 seats left', status: 'open', paints: ['yellow', 'viridian', 'cadmium', 'ink'] },
  { day: 'Fri', date: '02', time: '7-9:30 pm', title: 'Blue heron, low tide', level: 'Some brush time', price: '$52', seats: 'Sold out, waiting list', status: 'full', paints: ['ultra', 'wall', 'viridian', 'ink'] },
  { day: 'Sat', date: '03', time: '10 am-noon', title: 'Sunflower cat', level: 'Kids 7 to 12', price: '$30', seats: '9 seats left', status: 'open', paints: ['yellow', 'cadmium', 'ultra', 'wall'] },
  { day: 'Sat', date: '03', time: '7-9:30 pm', title: 'Night market lanterns', level: 'Beginner', price: '$48', seats: '11 seats left', status: 'open', paints: ['ink', 'cadmium', 'yellow', 'ultra'] },
  { day: 'Wed', date: '07', time: '7-9:30 pm', title: 'Paint your pet', level: 'Send us a photo', price: '$65', seats: '4 seats left', status: 'low', paints: ['wall', 'ink', 'cadmium', 'yellow'] },
  { day: 'Thu', date: '08', time: '7-9 pm', title: 'The red room, after Matisse', level: 'Beginner', price: '$48', seats: '14 seats left', status: 'open', paints: ['cadmium', 'ultra', 'yellow', 'viridian'] },
  { day: 'Fri', date: '09', time: '7-9:30 pm', title: 'Ultramarine waves', level: 'Some brush time', price: '$52', seats: '2 seats left', status: 'low', paints: ['ultra', 'wall', 'ink', 'viridian'] },
  { day: 'Sun', date: '11', time: '4-6 pm', title: 'Maple road in October', level: 'Families welcome', price: '$45', seats: '16 seats left', status: 'open', paints: ['cadmium', 'yellow', 'viridian', 'ink'] },
];

const INCLUDED = [
  ['A 16 x 20 inch canvas', 'Stretched, primed and waiting on your easel.'],
  ['Every paint and brush', 'Artist acrylics, five brushes, a palette, a water jar and an apron.'],
  ['An artist at the front', 'Painting the same picture on a big easel, one step at a time.'],
  ['One drink on us', 'Wine, beer, cider or a soft drink. The bar stays open, $8 a glass.'],
  ['Something to nibble', 'Cheese, crackers, grapes, and chocolate at the break.'],
  ['Your painting', 'In a carry bag, dry enough for the car ride home.'],
];

const EVENING = [
  ['6:40', 'Doors', 'Pour a glass, pick an easel, tie on an apron. Phones away soon.'],
  ['7:00', 'Sketch', 'We chalk in the big shapes together. Nothing is permanent yet.'],
  ['7:20', 'Block in', 'Background first, biggest brush, no fussing. This is the loud part.'],
  ['8:00', 'Break', 'Second glass, a lap of the room to see everyone else\'s.'],
  ['8:10', 'Details', 'Highlights, shadows, and whatever makes yours different from the one at the front.'],
  ['8:50', 'Sign it', 'Initials in the corner, a photo against the wall, and home.'],
];

const ARTISTS = [
  { name: 'Noor Haddad', role: 'Founder, painter', note: 'Opened the studio in 2019 after ten years teaching high school art. Leads Thursdays and every pet portrait night.', block: 'cadmium' },
  { name: 'Felix Oyelaran', role: 'Landscapes and water', note: 'Paints the river most mornings. Fridays are his, and so is every wave on the calendar.', block: 'ultra' },
  { name: 'Ana Sofía Brandt', role: 'Kids and Sundays', note: 'Illustrator. Runs the Saturday kids mornings and the Sunday family sessions, with patience to spare.', block: 'viridian' },
];

const PARTIES = [
  { name: 'Birthdays', size: '8 to 24 guests', price: '$50', per: 'a head', note: 'Pick any painting from our library of 120. Bring a cake; we have plates and a knife.' },
  { name: 'Team nights', size: '10 to 40 guests', price: '$58', per: 'a head', note: 'Weeknights, invoiced to the company. Your logo as the painting for $150 more.' },
  { name: 'Kids\' parties', size: '6 to 14 children', price: '$32', per: 'a child', note: 'Saturday and Sunday mornings. Juice, snacks, smocks, and the mess stays here.' },
  { name: 'The whole room', size: 'Up to 40 easels', price: '$900', per: 'an evening', note: 'For a wedding party, a fundraiser, or a very large family.' },
];

const QUESTIONS = [
  ['I cannot paint. Is that a problem?', 'That is who comes. Most people have not held a brush since school, and every one of them goes home with a painting.'],
  ['Can we bring our own wine?', 'No, we are licensed, so outside drinks are not allowed. Your first glass is included and the bar is open all evening.'],
  ['What if I am late?', 'The first twenty minutes are the sketch. Come in quietly and the artist will catch you up at the break.'],
  ['Can I cancel?', 'Move your seat to another night up to 48 hours before, free. After that, we refund you if someone on the waiting list takes it.'],
  ['How old do you have to be?', 'Evening classes are 18 and over, and 21 to drink. Kids 7 to 12 have their own Saturday mornings.'],
];

export default function EaselEveningsPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Easel Evenings</a>
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
        {/* ------------------------------------------------------ THE EASEL */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Paint-and-sip studio, Tanner's Yard</p>
            <h1 id="hero-h" className={s.title}>Paint a picture <em>tonight.</em></h1>
            <p className={s.lede}>
              Two hours, one canvas, a glass of something, and an artist at the
              front showing you every stroke. Nobody here can paint when they
              arrive. Everybody leaves with a painting.
            </p>
            <p className={s.actions}>
              <a className={s.primary} href="#calendar">See this month's canvases</a>
              <a className={s.secondary} href="#parties">Book a party</a>
            </p>
          </div>

          <div className={s.easel}>
            <div className={s.legs}>
              <div className={s.canvas} aria-hidden="true">
                <TabbiedPattern
                  pattern={dimmer}
                  palette={CANVAS}
                  fit="grid"
                  cellSize={72}
                  seed="easel-canvas"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <p className={s.wallLabel}>
              <strong>Untitled, Thursday</strong>
              <span>Acrylic on canvas, 16 x 20 in. Painted by 22 people at once.</span>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------ CALENDAR */}
        <section id="calendar" className={s.calendar} aria-labelledby="calendar-h">
          <div className={s.inner}>
            <div className={s.blockHead}>
              <p className={s.kicker}>October</p>
              <h2 id="calendar-h">This month's canvases</h2>
              <p className={s.blockNote}>
                Each night is one painting, the same for everyone in the room.
                The dots are the paints you will use. Tickets are per easel and
                include everything below.
              </p>
            </div>

            <ol className={s.tickets}>
              {NIGHTS.map((n) => (
                <li key={`${n.date}-${n.time}`} className={`${s.ticket} ${s[n.status]}`}>
                  <div className={s.stub}>
                    <span className={s.stubDay}>{n.day}</span>
                    <span className={s.stubDate}>{n.date}</span>
                    <span className={s.stubTime}>{n.time}</span>
                  </div>
                  <div className={s.ticketBody}>
                    <h3>{n.title}</h3>
                    <p className={s.level}>{n.level}</p>
                    <p className={s.paints} aria-hidden="true">
                      {n.paints.map((p, j) => (
                        <span key={`${p}-${j}`} className={s[p]} />
                      ))}
                    </p>
                    <p className={s.ticketFoot}>
                      <span className={s.price}>{n.price}</span>
                      <span className={s.seats}>{n.seats}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------ INCLUDED */}
        <section id="included" className={s.included} aria-labelledby="included-h">
          <div className={s.inner}>
            <div className={s.includedGrid}>
              <div className={s.blockHead}>
                <p className={s.kicker}>Every ticket</p>
                <h2 id="included-h">What your seat <em>comes with</em></h2>
                <p className={s.blockNote}>
                  Wear something you do not mind. The aprons are good; acrylic
                  on a sleeve is forever.
                </p>
                <div className={s.swatch} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dimmer}
                    palette={WARM}
                    fit="grid"
                    cellSize={56}
                    seed="easel-swatch"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <ol className={s.includedList}>
                {INCLUDED.map(([t, d]) => (
                  <li key={t}>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ THE EVENING */}
        <section id="evening" className={s.evening} aria-labelledby="evening-h">
          <div className={s.inner}>
            <div className={s.blockHead}>
              <p className={s.kicker}>6:40 to 9 pm</p>
              <h2 id="evening-h">How an evening goes</h2>
            </div>
            <ol className={s.steps}>
              {EVENING.map(([at, what, how]) => (
                <li key={at}>
                  <time className={s.at}>{at}</time>
                  <h3>{what}</h3>
                  <p>{how}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className={s.strokes} aria-hidden="true">
            <TabbiedPattern
              pattern={drybrush}
              palette={STROKES}
              fit="grid"
              cellSize={40}
              seed="easel-strokes"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------ ARTISTS */}
        <section id="artists" className={s.artists} aria-labelledby="artists-h">
          <div className={s.inner}>
            <div className={s.blockHead}>
              <p className={s.kicker}>At the front of the room</p>
              <h2 id="artists-h">The artists</h2>
            </div>
            <ul className={s.artistList}>
              {ARTISTS.map((a) => (
                <li key={a.name} className={s.artist}>
                  <span className={`${s.artistBlock} ${s[a.block]}`} aria-hidden="true" />
                  <h3>{a.name}</h3>
                  <p className={s.artistRole}>{a.role}</p>
                  <p>{a.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ PARTIES */}
        <section id="parties" className={s.parties} aria-labelledby="parties-h">
          <div className={s.inner}>
            <div className={s.partiesGrid}>
              <div className={s.blockHead}>
                <p className={s.kicker}>Private parties</p>
                <h2 id="parties-h">The room is <em>yours</em></h2>
                <p className={s.blockNote}>
                  Any day of the week, with your own artist and your choice of
                  painting. Send us a date and a head count and we will hold it
                  for three days while you decide.
                </p>
              </div>
              <ul className={s.partyList}>
                {PARTIES.map((p) => (
                  <li key={p.name} className={s.party}>
                    <h3>{p.name}</h3>
                    <p className={s.partySize}>{p.size}</p>
                    <p className={s.partyPrice}>
                      <strong>{p.price}</strong>
                      <span>{p.per}</span>
                    </p>
                    <p className={s.partyNote}>{p.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.inner}>
            <div className={s.bookGrid}>
              <div>
                <div className={s.blockHead}>
                  <p className={s.kicker}>Seats and questions</p>
                  <h2 id="book-h">Save an easel</h2>
                </div>
                <div className={s.faq}>
                  {QUESTIONS.map(([q, a]) => (
                    <details key={q}>
                      <summary>{q}</summary>
                      <p>{a}</p>
                    </details>
                  ))}
                </div>
                <p className={s.address}>
                  Second floor, 58 Tanner's Yard
                  <br />
                  <a href="tel:+15550182290">(555) 018-2290</a>
                  <br />
                  <a href="mailto:paint@easelevenings.example">paint@easelevenings.example</a>
                </p>
                <p className={s.small}>
                  Studio open Wednesday to Sunday. Classes as listed; the front
                  desk answers the phone from noon. Lift to the second floor.
                </p>
              </div>

              <form className={s.form} action="#">
                <div className={s.formGrid}>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label htmlFor="ee-night">Night</label>
                    <select id="ee-night" name="night" defaultValue="lemon">
                      <option value="lemon">Thu 1 Oct, Lemon grove at dusk</option>
                      <option value="kids">Sat 3 Oct, Sunflower cat (kids)</option>
                      <option value="lanterns">Sat 3 Oct, Night market lanterns</option>
                      <option value="pet">Wed 7 Oct, Paint your pet</option>
                      <option value="matisse">Thu 8 Oct, The red room</option>
                      <option value="waves">Fri 9 Oct, Ultramarine waves</option>
                      <option value="maple">Sun 11 Oct, Maple road in October</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="ee-seats">Easels</label>
                    <select id="ee-seats" name="seats" defaultValue="2">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="ee-name">Name</label>
                    <input id="ee-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label htmlFor="ee-email">Email</label>
                    <input id="ee-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label htmlFor="ee-note">Anything we should know?</label>
                    <textarea id="ee-note" name="note" rows={3} />
                  </div>
                </div>
                <button className={s.submit} type="submit">Hold my easel</button>
                <p className={s.formNote}>We email a ticket within the hour. Pay at the door or ahead, either way.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={dimmer}
            palette={CANVAS}
            fit="grid"
            cellSize={48}
            seed="easel-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p className={s.footName}>Easel Evenings</p>
        <p>A fictional paint-and-sip studio. The classes, artists and prices are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
