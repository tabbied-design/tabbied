import { TabbiedPattern } from 'tabbied/react';
import { housing, rebate, ribline, stitch, quire } from 'tabbied/patterns';
import s from './maple-street-library.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Maple Street Branch Library: Public library branch, Eastfield',
  description:
    'The Maple Street branch of the Eastfield Public Library. What is on this week, the things you can borrow besides books, staff picks, the librarians to ask, a free card and rooms to book.',
};

/* Site colors. The card catalog is the whole page: drawers of slots in the
   hero, cloth-bound spines on the staff shelf, a borrower's card and the
   plinth of the cabinet in the footer. Slots and gaps are transparent, so
   the wood or the card behind them shows through. */
const CARD = '#f4efe2';
const INK = '#22211f';
const GREEN = '#2f5e4d';
const STAMP = '#6a42a0';

const DRAWERS = ['transparent', GREEN, INK, GREEN, GREEN, INK];
const CLOTH_A = ['transparent', CARD, GREEN, CARD];
const CLOTH_B = ['transparent', CARD, INK, STAMP, CARD, GREEN];
const CLOTH_C = ['transparent', CARD, STAMP, CARD, INK, CARD];
const CLOTH_D = ['transparent', GREEN, INK, CARD, STAMP, INK];
const CLOTH_E = ['transparent', CARD, STAMP, GREEN, CARD, CARD];
const CLOTH_F = ['transparent', STAMP, CARD, INK];
const BORROWER = ['transparent', CARD, STAMP, CARD, INK, CARD];

const NAV = [
  ['What\'s on', '#whats-on'],
  ['Borrow', '#borrow'],
  ['Staff picks', '#picks'],
  ['Ask us', '#ask'],
  ['Get a card', '#card'],
  ['Rooms', '#rooms'],
  ['Visit', '#visit'],
];

const TRACINGS = [
  '1. Public libraries, Eastfield.',
  '2. Reading rooms.',
  '3. Community life.',
  'I. Title.',
];

const HOURS = [
  ['Mon', '10-8'],
  ['Tue', '10-8'],
  ['Wed', '10-8'],
  ['Thu', '10-8'],
  ['Fri', '10-6'],
  ['Sat', '10-5'],
  ['Sun', '1-5'],
];

type Happening = {
  day: string;
  date: string;
  name: string;
  time: string;
  place: string;
  who: string;
  note: string;
  stamp: string;
};

const WEEK: Happening[] = [
  {
    day: 'Mon',
    date: 'Oct 5',
    name: 'Storytime',
    time: '10:30-11:00',
    place: 'Children\'s corner',
    who: 'Ages 2-5, with a grown-up',
    note: 'Dolores reads three picture books, then we sing the one about the bus. Shakers and scarves provided.',
    stamp: 'Drop in',
  },
  {
    day: 'Tue',
    date: 'Oct 6',
    name: 'Homework help',
    time: '15:30-17:30',
    place: 'Study pods 1-4',
    who: 'Grades 3-8',
    note: 'Volunteer tutors from Eastfield High for math, reading and science fair panic. Snacks after five.',
    stamp: 'Drop in',
  },
  {
    day: 'Wed',
    date: 'Oct 7',
    name: 'English conversation club',
    time: '18:00-19:30',
    place: 'The Maple Room',
    who: 'Adults, all levels',
    note: 'Small tables, one topic a week (this week: the weather, and complaining about it). Tea and cookies.',
    stamp: 'Drop in',
  },
  {
    day: 'Thu',
    date: 'Oct 8',
    name: 'Tax help',
    time: '13:00-16:00',
    place: 'Study pod 2',
    who: 'Households under $67,000',
    note: 'Trained volunteers file your return with you, free. Bring ID, last year\'s return and every form that came in the mail.',
    stamp: 'Sign up',
  },
  {
    day: 'Sat',
    date: 'Oct 10',
    name: 'Seed library',
    time: '10:00-12:00',
    place: 'Front lobby',
    who: 'Everyone',
    note: 'Borrow a packet of seeds with your card, grow them, and bring some back at harvest. Fall swap: garlic and poppies.',
    stamp: 'Free',
  },
];

type Loan = {
  what: string;
  detail: string;
  loan: string;
  holds: string;
  dates: string[];
};

const LOANS: Loan[] = [
  {
    what: 'Museum passes',
    detail: 'Free entry for two adults and up to four children at the Eastfield Art Museum, the Harbor Science Center or the County Historical Society.',
    loan: '3 days',
    holds: '9 waiting',
    dates: ['Sep 18', 'Sep 26', 'Oct 3'],
  },
  {
    what: 'Wifi hotspots',
    detail: 'A pocket hotspot with unlimited data for up to ten devices. Charger and a laminated how-to in the case.',
    loan: '21 days',
    holds: '4 waiting',
    dates: ['Aug 30', 'Sep 21', 'Oct 12'],
  },
  {
    what: 'A telescope',
    detail: 'A 4.5-inch reflector on a tabletop mount, with a star chart and a red flashlight. Given to us by the Eastfield Astronomy Club.',
    loan: '14 days',
    holds: '2 waiting',
    dates: ['Sep 4', 'Sep 19', 'Oct 6'],
  },
  {
    what: 'Sewing machines',
    detail: 'Two sturdy machines with bobbins, needles and a starter kit. Tomas shows you how to thread one on Tuesdays at 4.',
    loan: '14 days',
    holds: 'On the shelf',
    dates: ['Sep 9', 'Sep 24', 'Oct 9'],
  },
];

type Pick = {
  title: string;
  author: string;
  call: string;
  by: string;
  says: string;
};

const PICKS: Pick[] = [
  { title: 'The Salt Road', author: 'Imogen Ashby', call: 'FIC ASH', by: 'Ruth', says: 'A cook walks the old salt road from the coast. I read it in two evenings and then drove there.' },
  { title: 'Small Hours', author: 'Teo Marchetti', call: '811 MAR', by: 'Amara', says: 'Short poems for the time between the alarm and getting up. Our conversation club read three aloud.' },
  { title: 'Nine Bridges', author: 'K. L. Oduya', call: 'FIC ODU', by: 'Tomas', says: 'A heist across a city of canals, told by the getaway rower. Hand it to anyone who says they do not read.' },
  { title: 'River Learns Its Name', author: 'Pilar Wendt', call: 'E WEN', by: 'Dolores', says: 'A picture book that follows one raindrop to the sea. Storytime asks for it every single week.' },
  { title: 'The Census Taker', author: 'Harriet Vail', call: 'FIC VAI', by: 'Ruth', says: 'Eastfield in 1910, door by door. I checked her street names against our records and she got them right.' },
  { title: 'Soil, Seed, Supper', author: 'Noor Haddad', call: '635 HAD', by: 'Tomas', says: 'The seed library\'s favorite: what to grow in a small yard, and what to cook when it all comes at once.' },
];

type Librarian = {
  slug: string;
  name: string;
  role: string;
  ask: string;
  desk: string;
  since: string;
  alt: string;
  inks: string[];
};

const PAIR_A = ['var(--text)', 'var(--card)'];
const PAIR_B = ['var(--deep-green)', 'var(--card)'];

const STAFF: Librarian[] = [
  {
    slug: 'maple-street-library-ruth',
    name: 'Ruth Abernathy',
    role: 'Branch manager',
    ask: 'Ask Ruth about local history and the census records.',
    desk: 'At the desk Mon, Wed, Fri mornings',
    since: 'Here since 1994',
    alt: 'Ruth, an older woman with short grey hair and reading glasses on a chain, smiling',
    inks: PAIR_A,
  },
  {
    slug: 'maple-street-library-tomas',
    name: 'Tomas Reyes',
    role: 'Teen and technology',
    ask: 'Ask Tomas about the 3D printer, the sewing machines and anything with a cable.',
    desk: 'At the desk Tue, Thu afternoons',
    since: 'Here since 2021',
    alt: 'Tomas, a young man with a short beard and round glasses, in a knit sweater',
    inks: PAIR_B,
  },
  {
    slug: 'maple-street-library-dolores',
    name: 'Dolores Kemp',
    role: 'Children\'s librarian',
    ask: 'Ask Dolores about first library cards, reading lists by age and storytime.',
    desk: 'At the desk Mon, Sat',
    since: 'Here since 2009',
    alt: 'Dolores, a woman with curly hair and a patterned scarf, laughing',
    inks: PAIR_B,
  },
  {
    slug: 'maple-street-library-amara',
    name: 'Amara Nwosu',
    role: 'Adult services',
    ask: 'Ask Amara about book groups, the conversation club and borrowing e-books on your phone.',
    desk: 'At the desk Wed, Thu evenings',
    since: 'Here since 2023',
    alt: 'Amara, a young woman with long braids in a denim shirt, holding a hardback book',
    inks: PAIR_A,
  },
];

const ASK_WAYS = [
  ['Call', '(555) 013-4471'],
  ['Text', '(555) 013-4400'],
  ['Email', 'ask@maplestreet.example'],
  ['In person', 'The desk by the door'],
];

const CARD_FACTS = [
  ['Who', 'Anyone who lives, works, studies or owns property in Eastfield County.'],
  ['Bring', 'Photo ID and something with your address on it. A letter is fine.'],
  ['Kids', 'Under 14 needs a grown-up to sign. Dolores does first cards with a certificate.'],
  ['Fines', 'None. We stopped charging late fines in 2021; just bring things back.'],
];

type Room = {
  name: string;
  seats: string;
  has: string;
  book: string;
};

const ROOMS: Room[] = [
  { name: 'The Maple Room', seats: '40', has: 'Projector, screen, kitchenette, folding tables', book: 'Up to 60 days ahead' },
  { name: 'Study pods 1-4', seats: '2-4', has: 'Whiteboard, a big table, a door that shuts', book: 'Two hours a day' },
  { name: 'The Grange Room', seats: '12', has: 'The local history collection, a long oak table', book: 'Ask Ruth' },
  { name: 'Quiet reading room', seats: '18', has: 'Armchairs, lamps, the newspapers', book: 'No booking' },
];

const ROOM_RULES = [
  'Free for nonprofits, clubs, tutors and neighbors. $25 an hour for businesses.',
  'Doors open 15 minutes before your booking; leave it as you found it.',
  'Rooms close 15 minutes before the library does.',
];

const GETTING_HERE = [
  ['Bus', 'Routes 6 and 14 stop at Maple and Orchard, forty steps from the door.'],
  ['Parking', '22 spaces behind the building, two of them accessible, plus bike racks.'],
  ['Step-free', 'The Orchard Avenue entrance has a ramp; the elevator goes up to the Grange Room.'],
  ['Book drop', 'Open all night, in the wall by the Maple Street steps.'],
];

export default function MapleStreetLibraryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--card': '#f4efe2',
        '--ink': '#22211f',
        '--green': '#2f5e4d',
        '--stamp': '#6a42a0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="card,ink,green,stamp"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Brygada+1918:ital,wght@0,400..700;1,400..700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDrawer} aria-hidden="true" />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Maple Street</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Branch Library</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open today until 8 pm</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The cabinet: a wall of drawers, each with its label slot, and
            the library's own catalog card pulled out in front of it. */}
        <section className={s.hero} aria-labelledby="msl-hero-h">
          <div data-edit-pattern="mslHero.field" data-edit-roles="transparent,2,1,2,2,1" className={s.cabinet} aria-hidden="true">
            <TabbiedPattern
              pattern={housing}
              palette={DRAWERS}
              fit="grid"
              cellSize={64}
              seed="maple-cabinet"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.heroInner}>
            <article className={s.catalog}>
              <p className={s.callNo}>
                <span data-edit="catalog.text" data-edit-max="60">027.4</span>
                <span data-edit="catalog.text2" data-edit-max="60">MAP</span>
              </p>
              <div className={s.catalogBody}>
                <p className={s.entry}>
                  <span data-edit="catalog.text3" data-edit-max="60">Eastfield Public Library.</span> <span data-edit="catalog.text4" data-edit-max="60">Branch no. 4.</span>
                </p>
                <h1 data-edit="catalog.title" data-edit-max="70" id="msl-hero-h" className={s.title}>Maple Street Branch Library</h1>
                <p data-edit="catalog.imprint" data-edit-max="240" data-edit-multiline className={s.imprint}>220 Maple Street, Eastfield. Founded 1931 in the old Grange hall; new roof, 2024.</p>
                <p data-edit="catalog.collation" data-edit-max="240" data-edit-multiline className={s.collation}>41,200 items : 6 librarians : 1 seed library : no late fines.</p>
                <ol className={s.tracings}>
                  {TRACINGS.map((t, i) => (
                    <li data-edit={`catalog.item.${i}`} data-edit-max="80" key={t}>{t}</li>
                  ))}
                </ol>
              </div>
              <p className={s.heroStamp}>
                <span data-edit="catalog.text5" data-edit-max="60">Open today</span>
                <strong data-edit="catalog.emphasis">10 am-8 pm</strong>
              </p>
              <span className={s.hole} aria-hidden="true" />
            </article>

            <div className={s.heroSide}>
              <form className={s.lookup} action="#" role="search">
                <p data-edit="mslHero.lookupHead" data-edit-max="240" data-edit-multiline className={s.lookupHead}>Look it up</p>
                <div className={s.lookupRow}>
                  <label data-edit="mslHero.label" htmlFor="msl-q">Author, title or subject</label>
                  <input id="msl-q" name="q" type="search" placeholder="e.g. bread, Ashby, telescopes" />
                </div>
                <div className={s.lookupRow}>
                  <label data-edit="mslHero.label2" htmlFor="msl-in">Look in</label>
                  <select id="msl-in" name="in" defaultValue="all">
                    <option value="all">Everything we have</option>
                    <option value="books">Books and audiobooks</option>
                    <option value="films">Films and music</option>
                    <option value="things">Things to borrow</option>
                    <option value="events">Events</option>
                  </select>
                </div>
                <button data-edit="mslHero.lookupGo" data-edit-max="24" className={s.lookupGo} type="submit">Search the catalog</button>
                <p data-edit="mslHero.lookupNote" data-edit-max="240" data-edit-multiline className={s.lookupNote}>Or ask at the desk. We like the hard ones.</p>
              </form>

              <div className={s.slip}>
                <p data-edit="mslHero.slipHead" data-edit-max="240" data-edit-multiline className={s.slipHead}>Date due</p>
                <ul className={s.slipList} aria-label="Opening hours this week">
                  {HOURS.map(([day, time], i) => (
                    <li key={day}>
                      <span data-edit={`mslHero.slipDay.${i}`} data-edit-max="60" className={s.slipDay}>{day}</span>
                      <span data-edit={`mslHero.slipTime.${i}`} data-edit-max="60" className={s.slipTime}>{time}</span>
                    </li>
                  ))}
                </ul>
                <p data-edit="mslHero.slipFoot" data-edit-max="240" data-edit-multiline className={s.slipFoot}>Sundays September to May</p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- WHAT'S ON
            Guide cards, their tabs staggered the way a drawer's are. */}
        <section id="whats-on" className={s.sec} aria-labelledby="msl-on-h">
          <div className={s.drawer}>
            <div className={s.plate}>
              <p data-edit="whatsOn.dewey" data-edit-max="240" data-edit-multiline className={s.dewey}>790.1</p>
              <h2 data-edit="whatsOn.title" data-edit-max="60" id="msl-on-h">What&apos;s on this week</h2>
              <p data-edit="whatsOn.range" data-edit-max="240" data-edit-multiline className={s.range}>Storytime to Seed library</p>
            </div>
            <span className={s.pull} aria-hidden="true" />
          </div>
          <p data-edit="whatsOn.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Everything here is free. Drop in unless the stamp says otherwise; sign-ups are at the desk or on the phone.</p>

          <ol className={s.week}>
            {WEEK.map((h, i) => (
              <li key={h.day} className={s.guide}>
                <p className={s.tab}>
                  <span data-edit={`whatsOn.text.${i}`} data-edit-max="60">{h.day}</span>
                  <span data-edit={`whatsOn.tabDate.${i}`} data-edit-max="60" className={s.tabDate}>{h.date}</span>
                </p>
                <div className={s.guideCard}>
                  <h3 data-edit={`whatsOn.title2.${i}`} data-edit-max="40">{h.name}</h3>
                  <p data-edit={`whatsOn.guideTime.${i}`} data-edit-max="240" data-edit-multiline className={s.guideTime}>{h.time}</p>
                  <p data-edit={`whatsOn.guidePlace.${i}`} data-edit-max="240" data-edit-multiline className={s.guidePlace}>{h.place}</p>
                  <p data-edit={`whatsOn.guideWho.${i}`} data-edit-max="240" data-edit-multiline className={s.guideWho}>{h.who}</p>
                  <p data-edit={`whatsOn.guideNote.${i}`} data-edit-max="240" data-edit-multiline className={s.guideNote}>{h.note}</p>
                  <p data-edit={`whatsOn.stamp.${i}`} data-edit-max="240" data-edit-multiline className={s.stamp}>{h.stamp}</p>
                  <span className={s.hole} aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- BORROW
            Book pockets, each holding its card with the last three dates. */}
        <section id="borrow" className={s.sec} aria-labelledby="msl-borrow-h">
          <div className={s.drawer}>
            <div className={s.plate}>
              <p data-edit="borrow.dewey" data-edit-max="240" data-edit-multiline className={s.dewey}>025.6</p>
              <h2 data-edit="borrow.title" data-edit-max="60" id="msl-borrow-h">Borrow more than books</h2>
              <p data-edit="borrow.range" data-edit-max="240" data-edit-multiline className={s.range}>Museums to Sewing machines</p>
            </div>
            <span className={s.pull} aria-hidden="true" />
          </div>
          <p data-edit="borrow.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>The library of things lives behind the desk. Put a hold on anything with your card number and we call you when it comes back.</p>

          <ul className={s.pockets}>
            {LOANS.map((l, i) => (
              <li key={l.what} className={s.pocketItem}>
                <div className={s.loanCard}>
                  <p data-edit={`borrow.loanHead.${i}`} data-edit-max="240" data-edit-multiline className={s.loanHead}>Date due</p>
                  <ul className={s.loanDates} aria-label={`Last three loans of ${l.what}`}>
                    {l.dates.map((d, i2) => (
                      <li data-edit={`borrow.item.${i}.${i2}`} data-edit-max="80" key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.pocket}>
                  <h3 data-edit={`borrow.title2.${i}`} data-edit-max="40">{l.what}</h3>
                  <p data-edit={`borrow.pocketDetail.${i}`} data-edit-max="240" data-edit-multiline className={s.pocketDetail}>{l.detail}</p>
                  <dl className={s.pocketTerms}>
                    <div>
                      <dt data-edit={`borrow.term.${i}`} data-edit-max="28">Loan</dt>
                      <dd data-edit={`borrow.body.${i}`} data-edit-max="200" data-edit-multiline>{l.loan}</dd>
                    </div>
                    <div>
                      <dt data-edit={`borrow.term2.${i}`} data-edit-max="28">Holds</dt>
                      <dd data-edit={`borrow.body2.${i}`} data-edit-max="200" data-edit-multiline>{l.holds}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ PICKS
            Six spines on the staff shelf, each bound in its own cloth, and
            the shelf talkers hanging from the plank under them. */}
        <section id="picks" className={s.sec} aria-labelledby="msl-picks-h">
          <div className={s.drawer}>
            <div className={s.plate}>
              <p data-edit="picks.dewey" data-edit-max="240" data-edit-multiline className={s.dewey}>028.1</p>
              <h2 data-edit="picks.title" data-edit-max="60" id="msl-picks-h">Staff picks</h2>
              <p data-edit="picks.range" data-edit-max="240" data-edit-multiline className={s.range}>Ashby to Wendt</p>
            </div>
            <span className={s.pull} aria-hidden="true" />
          </div>
          <p data-edit="picks.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>The shelf by the window, changed on the first of the month. Take one home; there is a second copy of each in the stacks.</p>

          <div className={s.shelfWrap}>
            <ul className={s.shelf}>
              <li className={s.tent}>
                <span data-edit="picks.tentHead" data-edit-max="60" className={s.tentHead}>Staff picks</span>
                <span data-edit="picks.tentSub" data-edit-max="60" className={s.tentSub}>October</span>
              </li>
              <li className={`${s.spine} ${s.spineA}`}>
                <div data-edit-pattern="picks.field" data-edit-roles="transparent,0,2,0" className={s.cloth} aria-hidden="true">
                  <TabbiedPattern pattern={ribline} palette={CLOTH_A} fit="grid" cellSize={18} seed="maple-spine-salt" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="picks.spineTitle" data-edit-max="240" data-edit-multiline className={s.spineTitle}>{PICKS[0].title}</p>
                <p data-edit="picks.spineCall" data-edit-max="240" data-edit-multiline className={s.spineCall}>{PICKS[0].call}</p>
              </li>
              <li className={`${s.spine} ${s.spineB}`}>
                <div data-edit-pattern="picks.field2" data-edit-roles="transparent,0,1,3,0,2" className={s.cloth} aria-hidden="true">
                  <TabbiedPattern pattern={stitch} palette={CLOTH_B} options={{ frequency: 0.7 }} fit="grid" cellSize={16} seed="maple-spine-hours" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="picks.spineTitle2" data-edit-max="240" data-edit-multiline className={s.spineTitle}>{PICKS[1].title}</p>
                <p data-edit="picks.spineCall2" data-edit-max="240" data-edit-multiline className={s.spineCall}>{PICKS[1].call}</p>
              </li>
              <li className={`${s.spine} ${s.spineC}`}>
                <div data-edit-pattern="picks.field3" data-edit-roles="transparent,0,3,0,1,0" className={s.cloth} aria-hidden="true">
                  <TabbiedPattern pattern={quire} palette={CLOTH_C} fit="grid" cellSize={22} seed="maple-spine-bridges" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="picks.spineTitle3" data-edit-max="240" data-edit-multiline className={s.spineTitle}>{PICKS[2].title}</p>
                <p data-edit="picks.spineCall3" data-edit-max="240" data-edit-multiline className={s.spineCall}>{PICKS[2].call}</p>
              </li>
              <li className={`${s.spine} ${s.spineD}`}>
                <div data-edit-pattern="picks.field4" data-edit-roles="transparent,2,1,0,3,1" className={s.cloth} aria-hidden="true">
                  <TabbiedPattern pattern={housing} palette={CLOTH_D} fit="grid" cellSize={20} seed="maple-spine-river" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="picks.spineTitle4" data-edit-max="240" data-edit-multiline className={s.spineTitle}>{PICKS[3].title}</p>
                <p data-edit="picks.spineCall4" data-edit-max="240" data-edit-multiline className={s.spineCall}>{PICKS[3].call}</p>
              </li>
              <li className={`${s.spine} ${s.spineE}`}>
                <div data-edit-pattern="picks.field5" data-edit-roles="transparent,0,3,2,0,0" className={s.cloth} aria-hidden="true">
                  <TabbiedPattern pattern={rebate} palette={CLOTH_E} options={{ frequency: 0.8 }} fit="grid" cellSize={16} seed="maple-spine-census" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="picks.spineTitle5" data-edit-max="240" data-edit-multiline className={s.spineTitle}>{PICKS[4].title}</p>
                <p data-edit="picks.spineCall5" data-edit-max="240" data-edit-multiline className={s.spineCall}>{PICKS[4].call}</p>
              </li>
              <li className={`${s.spine} ${s.spineF}`}>
                <div data-edit-pattern="picks.field6" data-edit-roles="transparent,3,0,1" className={s.cloth} aria-hidden="true">
                  <TabbiedPattern pattern={ribline} palette={CLOTH_F} fit="grid" cellSize={14} seed="maple-spine-soil" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="picks.spineTitle6" data-edit-max="240" data-edit-multiline className={s.spineTitle}>{PICKS[5].title}</p>
                <p data-edit="picks.spineCall6" data-edit-max="240" data-edit-multiline className={s.spineCall}>{PICKS[5].call}</p>
              </li>
              <li className={s.bookend} aria-hidden="true" />
            </ul>
            <div className={s.plank} aria-hidden="true" />
          </div>

          <ol className={s.talkers}>
            {PICKS.map((p, i) => (
              <li key={p.title} className={s.talker}>
                <p className={s.talkerBy}>{`${p.by} says`}</p>
                <h3 data-edit={`picks.title2.${i}`} data-edit-max="40">{p.title}</h3>
                <p data-edit={`picks.talkerAuthor.${i}`} data-edit-max="240" data-edit-multiline className={s.talkerAuthor}>{p.author}</p>
                <p data-edit={`picks.talkerSays.${i}`} data-edit-max="240" data-edit-multiline className={s.talkerSays}>{p.says}</p>
                <p data-edit={`picks.talkerCall.${i}`} data-edit-max="240" data-edit-multiline className={s.talkerCall}>{p.call}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------------- ASK
            The librarians, each photograph paper-clipped to a card. */}
        <section id="ask" className={s.sec} aria-labelledby="msl-ask-h">
          <div className={s.drawer}>
            <div className={s.plate}>
              <p data-edit="ask.dewey" data-edit-max="240" data-edit-multiline className={s.dewey}>025.52</p>
              <h2 data-edit="ask.title" data-edit-max="60" id="msl-ask-h">Ask a librarian</h2>
              <p data-edit="ask.range" data-edit-max="240" data-edit-multiline className={s.range}>Abernathy to Reyes</p>
            </div>
            <span className={s.pull} aria-hidden="true" />
          </div>
          <p data-edit="ask.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Four people who know where everything is, and how to find what we do not have. No question is too small or too strange.</p>

          <ul className={s.staff}>
            {STAFF.map((p, i) => (
              <li key={p.slug} className={s.person}>
                <figure className={s.snapshot}>
                  <span className={s.clip} aria-hidden="true" />
                  <Artwork slug={p.slug} alt={p.alt} inks={p.inks} className={s.portrait} />
                </figure>
                <div className={s.personCard}>
                  <h3 data-edit={`ask.title2.${i}`} data-edit-max="40">{p.name}</h3>
                  <p data-edit={`ask.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{p.role}</p>
                  <p data-edit={`ask.personAsk.${i}`} data-edit-max="240" data-edit-multiline className={s.personAsk}>{p.ask}</p>
                  <p data-edit={`ask.personDesk.${i}`} data-edit-max="240" data-edit-multiline className={s.personDesk}>{p.desk}</p>
                  <p data-edit={`ask.personSince.${i}`} data-edit-max="240" data-edit-multiline className={s.personSince}>{p.since}</p>
                </div>
                <span className={s.hole} aria-hidden="true" />
              </li>
            ))}
          </ul>

          <dl className={s.askWays}>
            {ASK_WAYS.map(([how, where], i) => (
              <div key={how}>
                <dt data-edit={`ask.term.${i}`} data-edit-max="28">{how}</dt>
                <dd data-edit={`ask.body.${i}`} data-edit-max="200" data-edit-multiline>{where}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------- CARD */}
        <section id="card" className={s.sec} aria-labelledby="msl-card-h">
          <div className={s.drawer}>
            <div className={s.plate}>
              <p data-edit="card.dewey" data-edit-max="240" data-edit-multiline className={s.dewey}>025.1</p>
              <h2 data-edit="card.title" data-edit-max="60" id="msl-card-h">Get a card</h2>
              <p data-edit="card.range" data-edit-max="240" data-edit-multiline className={s.range}>Free, and good at all six branches</p>
            </div>
            <span className={s.pull} aria-hidden="true" />
          </div>

          <div className={s.cardGrid}>
            <div className={s.cardSide}>
              <div className={s.borrower}>
                <div data-edit-pattern="card.field" data-edit-roles="transparent,0,3,0,1,0" className={s.borrowerBand} aria-hidden="true">
                  <TabbiedPattern pattern={stitch} palette={BORROWER} options={{ frequency: 0.8 }} fit="grid" cellSize={20} seed="maple-borrower" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="card.borrowerLib" data-edit-max="240" data-edit-multiline className={s.borrowerLib}>Eastfield Public Library</p>
                <p data-edit="card.borrowerBranch" data-edit-max="240" data-edit-multiline className={s.borrowerBranch}>Maple Street</p>
                <p data-edit="card.borrowerNo" data-edit-max="240" data-edit-multiline className={s.borrowerNo}>2 2031 00418 7736</p>
                <span className={s.barcode} aria-hidden="true" />
                <p data-edit="card.borrowerSign" data-edit-max="240" data-edit-multiline className={s.borrowerSign}>Signature of borrower</p>
              </div>
              <dl className={s.cardFacts}>
                {CARD_FACTS.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`card.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`card.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.apply} action="#">
              <p data-edit="card.applyHead" data-edit-max="240" data-edit-multiline className={s.applyHead}>Application for a borrower&apos;s card</p>
              <p data-edit="card.applyNote" data-edit-max="240" data-edit-multiline className={s.applyNote}>Fill this in, then come by with ID. Your card is ready while you wait.</p>
              <div className={s.applyGrid}>
                <div className={s.field}>
                  <label data-edit="card.label" htmlFor="msl-name">Full name</label>
                  <input id="msl-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="card.label2" htmlFor="msl-email">Email, for notices</label>
                  <input id="msl-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="card.label3" htmlFor="msl-address">Street address in Eastfield County</label>
                  <input id="msl-address" name="address" type="text" autoComplete="street-address" />
                </div>
                <div className={s.field}>
                  <label data-edit="card.label4" htmlFor="msl-type">Card</label>
                  <select id="msl-type" name="type" defaultValue="adult">
                    <option value="adult">Adult</option>
                    <option value="teen">Teen, 13-17</option>
                    <option value="child">Child, under 13</option>
                    <option value="visitor">Visitor, 3 months, $10</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="card.label5" htmlFor="msl-branch">Home branch</label>
                  <select id="msl-branch" name="branch" defaultValue="maple">
                    <option value="maple">Maple Street</option>
                    <option value="central">Central, Court Square</option>
                    <option value="north">North Eastfield</option>
                    <option value="harbor">Harbor Road</option>
                  </select>
                </div>
              </div>
              <button data-edit="card.applyGo" data-edit-max="24" className={s.applyGo} type="submit">Send my application</button>
              <p data-edit="card.applyStamp" data-edit-max="240" data-edit-multiline className={s.applyStamp}>Received</p>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------ ROOMS
            The shelflist card: rooms typed in columns. */}
        <section id="rooms" className={s.sec} aria-labelledby="msl-rooms-h">
          <div className={s.drawer}>
            <div className={s.plate}>
              <p data-edit="rooms.dewey" data-edit-max="240" data-edit-multiline className={s.dewey}>727.8</p>
              <h2 data-edit="rooms.title" data-edit-max="60" id="msl-rooms-h">Meeting rooms</h2>
              <p data-edit="rooms.range" data-edit-max="240" data-edit-multiline className={s.range}>Grange Room to Study pods</p>
            </div>
            <span className={s.pull} aria-hidden="true" />
          </div>

          <div className={s.roomsGrid}>
            <div className={s.shelflist}>
              <p data-edit="rooms.shelflistHead" data-edit-max="240" data-edit-multiline className={s.shelflistHead}>Shelflist: rooms at Maple Street</p>
              <div className={s.tableWrap}>
                <table className={s.rooms}>
                  <caption data-edit="rooms.srOnly" className={s.srOnly}>The rooms you can book, how many they seat, what they have and how far ahead to book</caption>
                  <thead>
                    <tr>
                      <th data-edit="rooms.heading" scope="col">Room</th>
                      <th data-edit="rooms.heading2" scope="col">Seats</th>
                      <th data-edit="rooms.heading3" scope="col">Has</th>
                      <th data-edit="rooms.heading4" scope="col">Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROOMS.map((r, i) => (
                      <tr key={r.name}>
                        <th data-edit={`rooms.heading5.${i}`} scope="row">{r.name}</th>
                        <td data-edit={`rooms.seats.${i}`} className={s.seats}>{r.seats}</td>
                        <td data-edit={`rooms.cell.${i}`}>{r.has}</td>
                        <td data-edit={`rooms.cell2.${i}`}>{r.book}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <span className={s.hole} aria-hidden="true" />
            </div>
            <div className={s.roomNotes}>
              <h3 data-edit="rooms.title2" data-edit-max="40">Before you book</h3>
              <ul>
                {ROOM_RULES.map((r, i) => (
                  <li data-edit={`rooms.item.${i}`} data-edit-max="80" key={r}>{r}</li>
                ))}
              </ul>
              <a data-edit="rooms.roomCall" data-edit-max="28" className={s.roomCall} href="tel:+15550134471">Book on (555) 013-4471</a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="msl-visit-h">
          <div className={s.drawer}>
            <div className={s.plate}>
              <p data-edit="visit.dewey" data-edit-max="240" data-edit-multiline className={s.dewey}>912</p>
              <h2 data-edit="visit.title" data-edit-max="60" id="msl-visit-h">Visit</h2>
              <p data-edit="visit.range" data-edit-max="240" data-edit-multiline className={s.range}>Maple Street at Orchard Avenue</p>
            </div>
            <span className={s.pull} aria-hidden="true" />
          </div>

          <div className={s.visit}>
            <div className={s.mapCard}>
              <div className={s.map} aria-hidden="true">
                <span className={`${s.street} ${s.streetMaple}`} />
                <span className={`${s.street} ${s.streetOrchard}`} />
                <span className={`${s.street} ${s.streetElm}`} />
                <span className={s.park} />
                <span className={s.building} />
                <span className={s.busStop} />
              </div>
              <p data-edit="visit.mapLabel" data-edit-max="240" data-edit-multiline className={`${s.mapLabel} ${s.mapLabelMaple}`}>Maple St</p>
              <p data-edit="visit.mapLabel2" data-edit-max="240" data-edit-multiline className={`${s.mapLabel} ${s.mapLabelOrchard}`}>Orchard Ave</p>
              <p data-edit="visit.mapLabel3" data-edit-max="240" data-edit-multiline className={`${s.mapLabel} ${s.mapLabelLib}`}>Library</p>
              <p data-edit="visit.mapLabel4" data-edit-max="240" data-edit-multiline className={`${s.mapLabel} ${s.mapLabelPark}`}>Linden Green</p>
            </div>
            <div className={s.visitText}>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>220 Maple Street, Eastfield</p>
              <p data-edit="visit.visitLede" data-edit-max="240" data-edit-multiline className={s.visitLede}>On the corner of Orchard Avenue, the brick building with the green doors and the clock that is right twice a day.</p>
              <dl className={s.getting}>
                {GETTING_HERE.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550134471">(555) 013-4471</a>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:ask@maplestreet.example">ask@maplestreet.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,1,2,2,1" className={s.plinth} aria-hidden="true">
          <TabbiedPattern pattern={housing} palette={DRAWERS} fit="grid" cellSize={40} seed="maple-plinth" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Maple Street Branch Library</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional branch library. The staff, books, events, rooms and addresses are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The staff portraits are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
