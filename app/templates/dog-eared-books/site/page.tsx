import { TabbiedPattern } from 'tabbied/react';
import { halftone, moleskin, patternsampler } from 'tabbied/patterns';
import s from './dog-eared-books.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Dog-Eared Books: Independent bookshop, Linden Row',
  description:
    'An independent bookshop in the Old Quarter, laid out like its own weekly paper: staff picks, readings and the book club, new titles, special orders and where everything is shelved.',
};

/* Shop colors. Each field has `transparent` in the background slot, so it
   prints straight onto the newsprint. */
const INK = '#1C1A17';
const BLUE = '#2B59A3';
const PALE = '#E4DCCB';
const MUSTARD = '#D9A43B';

const SAMPLER = ['transparent', BLUE, MUSTARD, INK, PALE];
const SPINES = ['transparent', BLUE, INK, MUSTARD, PALE];
const DOTS = ['transparent', INK, BLUE];

const NAV = [
  ['Staff picks', '#picks'],
  ['Events', '#events'],
  ['New this week', '#new'],
  ['Orders', '#orders'],
  ['The shelves', '#shelves'],
  ['Visit', '#visit'],
];

type Pick = {
  section: string;
  title: string;
  author: string;
  review: string;
  by: string;
  price: string;
};

const LEAD: Pick = {
  section: 'Pick of the week, fiction',
  title: "The Lighthouse Keeper's Almanac",
  author: 'Ines Varga',
  review:
    'A year on a rock in the Atlantic, told in the logbook of the woman who keeps the light, one entry a day. Nothing happens for sixty pages and then everything does, and by the winter storms I was reading it at the counter between customers and not ringing anyone up. The best novel I have sold in five years, and I have sold a lot of novels.',
  by: 'Picked by Ruth, who owns the shop',
  price: 'Hardcover, $28',
};

const PICKS: Pick[] = [
  {
    section: 'Fiction',
    title: 'Small Hours',
    author: 'Tomas Reyes',
    review:
      'Three night-shift workers in one city, and the single morning their shifts overlap. Short, sad and very funny, often in the same sentence.',
    by: 'Picked by Dev',
    price: 'Paperback, $17',
  },
  {
    section: 'Nature',
    title: 'A Field Guide to Puddles',
    author: 'Hannah Oduya',
    review:
      'An ecologist spends a year looking down. Tadpoles, water boatmen, the whole sky upside down. You will never step over one again without checking.',
    by: 'Picked by Ama',
    price: 'Hardcover, $22',
  },
  {
    section: 'History',
    title: 'The Salt Road',
    author: 'Marguerite Bell',
    review:
      'How one mineral built cities, started wars and paid soldiers. Big, readable history with good maps, and the author is here on the 15th.',
    by: 'Picked by Ruth',
    price: 'Hardcover, $30',
  },
  {
    section: 'Poetry',
    title: 'Nine Kinds of Quiet',
    author: 'Leo Park',
    review:
      'Short poems about kitchens, buses and fathers. I read the whole thing standing up in the poetry corner and then bought it, which is the test.',
    by: 'Picked by Jun',
    price: 'Paperback, $16',
  },
  {
    section: 'Crime',
    title: 'Murder at the Allotment',
    author: 'P. D. Fenwick',
    review:
      'A retired detective, a prize marrow and a body under the compost. Cozy on the surface, properly clever underneath. First in a series, thank goodness.',
    by: 'Picked by Dev',
    price: 'Paperback, $18',
  },
  {
    section: "Children's, ages 5-8",
    title: 'Moth and the Midnight Bus',
    author: 'Sadie Quill',
    review:
      'A small moth rides the night bus to find the biggest light in town. Asked for again every night for a month by my nephew. Beautiful pictures.',
    by: 'Picked by Jun',
    price: 'Hardcover, $15',
  },
];

type BookEvent = {
  day: string;
  date: string;
  time: string;
  kind: string;
  title: string;
  note: string;
  tickets: string;
};

const EVENTS: BookEvent[] = [
  {
    day: 'Thu',
    date: 'Oct 1',
    time: '7:00 pm',
    kind: 'Reading',
    title: "Ines Varga, The Lighthouse Keeper's Almanac",
    note: 'Reading and questions, then signing. Wine from the shop next door.',
    tickets: 'Free, please reserve',
  },
  {
    day: 'Sat',
    date: 'Oct 3',
    time: '10:30 am',
    kind: 'Story time',
    title: 'Moth and the Midnight Bus, with Sadie Quill',
    note: 'For under-eights and their grown-ups, upstairs on the rug.',
    tickets: 'Free',
  },
  {
    day: 'Tue',
    date: 'Oct 6',
    time: '7:30 pm',
    kind: 'Book club',
    title: 'Small Hours, by Tomas Reyes',
    note: 'The first Tuesday of every month. Tea, biscuits and strong opinions.',
    tickets: '$5, members free',
  },
  {
    day: 'Thu',
    date: 'Oct 15',
    time: '7:00 pm',
    kind: 'In conversation',
    title: 'Marguerite Bell on The Salt Road',
    note: 'With Dr. Kofi Mensah of the university history department.',
    tickets: '$8, taken off the book',
  },
  {
    day: 'Sat',
    date: 'Oct 24',
    time: '2:00 pm',
    kind: 'Open mic',
    title: 'Poetry afternoon',
    note: 'Five minutes each. Put your name on the list at the counter.',
    tickets: 'Free',
  },
  {
    day: 'Thu',
    date: 'Oct 29',
    time: '6:30 pm',
    kind: 'Late night',
    title: 'Secondhand night in the basement',
    note: 'The basement stays open until ten, with 20% off everything down there.',
    tickets: 'Free',
  },
];

const NEW_BOOKS = [
  ['The Orchard Year', 'Clara Winslow', 'Hardcover, $26'],
  ['Everything Is a Map', 'Rafael Osei', 'Paperback, $19'],
  ['Letters to the Night Ferry', 'Mei Tanaka', 'Hardcover, $25'],
  ['The Quiet Engineer', 'Bruno Adler', 'Hardcover, $29'],
  ['Soup for Every Weather', 'Nell Hargreaves', 'Hardcover, $32'],
  ['A Short History of Doors', 'Otto Lind', 'Paperback, $18'],
  ['The Borrowed Summer', 'Aisha Rahman', 'Paperback, $17'],
  ['Stones That Float', 'Pieter de Wit', 'Hardcover, $27'],
  ['Hedgehog Goes to Sea', 'Bea Lowry', 'Picture book, $14'],
  ['Last Train to Merrow', 'Frank Dooley', 'Paperback, $16'],
];

const SHELVES = [
  ['Front table', 'By the door', 'New hardcovers and whatever we are excited about this week.'],
  ['Fiction, A to Z', 'The long left wall', 'Novels and short stories, with a ladder for the top shelf.'],
  ['Crime and mystery', 'The back room', 'Next to the armchair, where a chapter becomes three.'],
  ['Science fiction and fantasy', 'The back room', 'Including a shelf of old paperbacks with the good covers.'],
  ['Poetry', 'Under the stairs', 'Small, well chosen, and the quietest corner in the shop.'],
  ['History and politics', 'The right wall', 'From the ancient world to last year, roughly in order.'],
  ['Nature and travel', 'By the window', 'Field guides, walking books and maps of places near and far.'],
  ['Cookery', 'The kitchen shelf', 'Near the kettle, which is not a coincidence.'],
  ["Children's and young adult", 'Upstairs', 'The room with the rug, the beanbags and the reading tent.'],
  ['Secondhand and rare', 'The basement', 'Priced in pencil on the first page. We buy on Wednesdays.'],
];

const HOURS = [
  ['Monday', '10 am to 6 pm'],
  ['Tuesday to Saturday', '9 am to 8 pm'],
  ['Sunday', '11 am to 5 pm'],
];

export default function DogEaredBooksPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f1e7',
        '--ink': '#1c1a17',
        '--blue': '#2b59a3',
        '--gray': '#8c857a',
        '--pale': '#e4dccb',
        '--mustard': '#d9a43b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,blue,gray,pale,mustard"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..600&family=Libre+Franklin:wght@400..700&display=swap"
      />

      {/* ---------------------------------------------------------- MASTHEAD
          A broadsheet front: folio line, the title between two ears, the
          dateline, and the section links as the paper's index. */}
      <header className={s.masthead}>
        <div className={s.folio}>
          <span data-edit="masthead.text" data-edit-max="60">No. 612</span>
          <span data-edit="masthead.folioMid" data-edit-max="60" className={s.folioMid}>The weekly edition of an independent bookshop</span>
          <span data-edit="masthead.text2" data-edit-max="60">Free to browse</span>
        </div>
        <div className={s.titleRow}>
          <div className={s.ear}>
            <span data-edit="masthead.earHead" data-edit-max="60" className={s.earHead}>Open today</span>
            <span data-edit="masthead.earBody" data-edit-max="60" className={s.earBody}>9 am to 8 pm</span>
          </div>
          <a data-edit="masthead.title" data-edit-max="28" className={s.title} href="#top">Dog-Eared Books</a>
          <div className={s.ear}>
            <span data-edit="masthead.earHead2" data-edit-max="60" className={s.earHead}>Special orders</span>
            <span data-edit="masthead.earBody2" data-edit-max="60" className={s.earBody}>Any book in print, in 2-3 days</span>
          </div>
        </div>
        <div className={s.dateline}>
          <span data-edit="masthead.text3" data-edit-max="60">14 Linden Row, the Old Quarter</span>
          <span data-edit="masthead.text4" data-edit-max="60">Est. 2014</span>
          <span data-edit="masthead.text5" data-edit-max="60">(555) 016-4410</span>
        </div>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`masthead.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu} label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`masthead.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* -------------------------------------------------------- PICKS
            The front page: a lead picture and the pick of the week side by
            side, then the rest of the picks set in newspaper columns. */}
        <section id="picks" className={s.sec} aria-labelledby="picks-h">
          <div className={s.secRule}>
            <span data-edit="picks.text" data-edit-max="60">Staff picks</span>
            <span data-edit="picks.text2" data-edit-max="60">Page 1</span>
          </div>
          <h2 data-edit="picks.headline" data-edit-max="60" className={s.headline} id="picks-h">
            Seven books the staff cannot stop pressing into people's hands
          </h2>
          <p data-edit="picks.standfirst" data-edit-max="240" data-edit-multiline className={s.standfirst}>
            Chosen by the four of us who work here, read cover to cover, and on the
            front table until they sell out. Ask any of us about them; we will not
            stop talking.
          </p>

          <div className={s.front}>
            <figure className={s.leadFig}>
              <div data-edit-pattern="picks.field" data-edit-roles="transparent,2,5,1,4" className={s.leadField} aria-hidden="true">
                <TabbiedPattern
                  pattern={patternsampler}
                  palette={SAMPLER}
                  fit="grid"
                  cellSize={64}
                  seed="front-table"
                  redrawInterval={9000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="picks.caption" data-edit-max="120" data-edit-multiline>Fig. 1. The front table at ten on a Saturday morning, approximately.</figcaption>
            </figure>
            <article className={s.lead}>
              <span data-edit="lead.pickSection" data-edit-max="60" className={s.pickSection}>{LEAD.section}</span>
              <h3 data-edit="lead.leadTitle" data-edit-max="40" className={s.leadTitle}>{LEAD.title}</h3>
              <p data-edit="lead.pickAuthor" data-edit-max="240" data-edit-multiline className={s.pickAuthor}>{LEAD.author}</p>
              <p data-edit="lead.leadReview" data-edit-max="240" data-edit-multiline className={s.leadReview}>{LEAD.review}</p>
              <p data-edit="lead.pickBy" data-edit-max="240" data-edit-multiline className={s.pickBy}>{LEAD.by}</p>
              <p data-edit="lead.pickPrice" data-edit-max="240" data-edit-multiline className={s.pickPrice}>{LEAD.price}</p>
            </article>
          </div>

          <div className={s.columns}>
            {PICKS.map((p, i) => (
              <article key={p.title} className={s.pick}>
                <span data-edit={`pick.pickSection.${i}`} data-edit-max="60" className={s.pickSection}>{p.section}</span>
                <h3 data-edit={`pick.pickTitle.${i}`} data-edit-max="40" className={s.pickTitle}>{p.title}</h3>
                <p data-edit={`pick.pickAuthor.${i}`} data-edit-max="240" data-edit-multiline className={s.pickAuthor}>{p.author}</p>
                <p data-edit={`pick.pickReview.${i}`} data-edit-max="240" data-edit-multiline className={s.pickReview}>{p.review}</p>
                <p data-edit={`pick.pickBy.${i}`} data-edit-max="240" data-edit-multiline className={s.pickBy}>{p.by}</p>
                <p data-edit={`pick.pickPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.pickPrice}>{p.price}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- EVENTS */}
        <section id="events" className={s.sec} aria-labelledby="events-h">
          <div className={s.secRule}>
            <span data-edit="events.text" data-edit-max="60">Events</span>
            <span data-edit="events.text2" data-edit-max="60">Page 2</span>
          </div>
          <h2 data-edit="events.headline" data-edit-max="60" className={s.headline} id="events-h">Readings, signings and the book club</h2>
          <p data-edit="events.standfirst" data-edit-max="240" data-edit-multiline className={s.standfirst}>
            Everything happens in the shop. Seats are limited to forty, so reserve at
            the counter, by phone or by email; tickets are taken off the book on the
            night.
          </p>
          <table className={s.events}>
            <caption data-edit="events.visuallyHidden" className={s.visuallyHidden}>Events in October</caption>
            <thead>
              <tr>
                <th data-edit="events.heading" scope="col">Date</th>
                <th data-edit="events.heading2" scope="col">Time</th>
                <th data-edit="events.heading3" scope="col">Event</th>
                <th data-edit="events.heading4" scope="col">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((e, i) => (
                <tr key={e.date}>
                  <td className={s.evDate}>
                    <span data-edit={`events.evDay.${i}`} data-edit-max="60" className={s.evDay}>{e.day}</span>
                    <span data-edit={`events.evNum.${i}`} data-edit-max="60" className={s.evNum}>{e.date}</span>
                  </td>
                  <td data-edit={`events.evTime.${i}`} className={s.evTime}>{e.time}</td>
                  <td className={s.evWhat}>
                    <span data-edit={`events.evKind.${i}`} data-edit-max="60" className={s.evKind}>{e.kind}</span>
                    <strong data-edit={`events.evTitle.${i}`} className={s.evTitle}>{e.title}</strong>
                    <span data-edit={`events.evNote.${i}`} data-edit-max="60" className={s.evNote}>{e.note}</span>
                  </td>
                  <td data-edit={`events.evTickets.${i}`} className={s.evTickets}>{e.tickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ---------------------------------------------------- NEW BOOKS */}
        <section id="new" className={s.sec} aria-labelledby="new-h">
          <div className={s.secRule}>
            <span data-edit="new.text" data-edit-max="60">New this week</span>
            <span data-edit="new.text2" data-edit-max="60">Page 3</span>
          </div>
          <div className={s.newGrid}>
            <div className={s.newIntro}>
              <h2 data-edit="new.headline" data-edit-max="60" className={s.headline} id="new-h">Ten new arrivals, unpacked on Tuesday</h2>
              <p data-edit="new.standfirst" data-edit-max="240" data-edit-multiline className={s.standfirst}>
                Listed in the order they came out of the boxes. Signed copies of the
                first and third while they last.
              </p>
            </div>
            <ol className={s.newList}>
              {NEW_BOOKS.map(([title, author, format], i) => (
                <li key={title}>
                  <span data-edit={`new.newTitle.${i}`} data-edit-max="60" className={s.newTitle}>{title}</span>
                  <span data-edit={`new.newAuthor.${i}`} data-edit-max="60" className={s.newAuthor}>{author}</span>
                  <span data-edit={`new.newFormat.${i}`} data-edit-max="60" className={s.newFormat}>{format}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- ORDERS
            Set as a column of text beside a boxed advertisement, with a
            halftone band where the ad's picture would be. */}
        <section id="orders" className={s.sec} aria-labelledby="orders-h">
          <div className={s.secRule}>
            <span data-edit="orders.text" data-edit-max="60">Orders and requests</span>
            <span data-edit="orders.text2" data-edit-max="60">Page 4</span>
          </div>
          <div className={s.ordersGrid}>
            <div className={s.ordersText}>
              <h2 data-edit="orders.headline" data-edit-max="60" className={s.headline} id="orders-h">If we do not have it, we will get it</h2>
              <div className={s.ordersCols}>
                <p data-edit="orders.body" data-edit-max="240" data-edit-multiline>
                  Our shelves hold about twelve thousand books, which is a small fraction
                  of what is in print. Anything else we can order from the wholesaler,
                  usually in two or three working days, at the cover price and with no
                  deposit.
                </p>
                <p data-edit="orders.body2" data-edit-max="240" data-edit-multiline>
                  Out-of-print and secondhand requests go in the book in the basement.
                  We check it against every collection we buy, and some of the longest
                  waits have ended happily after four years.
                </p>
                <p data-edit="orders.body3" data-edit-max="240" data-edit-multiline>
                  Book groups get ten percent off six or more copies of the same title,
                  and schools and libraries have an account with us on request.
                </p>
              </div>
            </div>
            <div className={s.ad}>
              <div data-edit-pattern="orders.field" data-edit-roles="transparent,1,2" className={s.adField} aria-hidden="true">
                <TabbiedPattern
                  pattern={halftone}
                  palette={DOTS}
                  fit="grid"
                  cellSize={18}
                  seed="press"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.adBody}>
                <p data-edit="orders.adHead" data-edit-max="240" data-edit-multiline className={s.adHead}>Order any book in print</p>
                <p data-edit="orders.adSub" data-edit-max="240" data-edit-multiline className={s.adSub}>Held at the counter, or posted for $4.50</p>
                <form className={s.form} action="#">
                  <label className={s.field}>
                    <span data-edit="orders.text3" data-edit-max="60">Title</span>
                    <input type="text" name="title" required />
                  </label>
                  <label className={s.field}>
                    <span data-edit="orders.text4" data-edit-max="60">Author</span>
                    <input type="text" name="author" />
                  </label>
                  <label className={s.field}>
                    <span data-edit="orders.text5" data-edit-max="60">Your name</span>
                    <input type="text" name="name" autoComplete="name" required />
                  </label>
                  <label className={s.field}>
                    <span data-edit="orders.text6" data-edit-max="60">Email or phone</span>
                    <input type="text" name="contact" autoComplete="email" required />
                  </label>
                  <label className={`${s.field} ${s.fieldWide}`}>
                    <span data-edit="orders.text7" data-edit-max="60">When it arrives</span>
                    <select name="collect" defaultValue="hold">
                      <option value="hold">Hold it at the counter</option>
                      <option value="post">Post it to me ($4.50)</option>
                    </select>
                  </label>
                  <button data-edit="orders.btn" data-edit-max="24" className={s.btn} type="submit">Place the order</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ SHELVES */}
        <section id="shelves" className={s.sec} aria-labelledby="shelves-h">
          <div className={s.secRule}>
            <span data-edit="shelves.text" data-edit-max="60">The shelves</span>
            <span data-edit="shelves.text2" data-edit-max="60">Page 5</span>
          </div>
          <div className={s.shelvesGrid}>
            <figure className={s.shelfFig}>
              <div data-edit-pattern="shelves.field" data-edit-roles="transparent,2,1,5,4" className={s.shelfField} aria-hidden="true">
                <TabbiedPattern
                  pattern={moleskin}
                  palette={SPINES}
                  fit="grid"
                  cellSize={56}
                  seed="spines"
                  options={{ frequency: 0.8 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="shelves.caption" data-edit-max="120" data-edit-multiline>Fig. 2. Fiction, A to K, seen from the top of the ladder.</figcaption>
            </figure>
            <div>
              <h2 data-edit="shelves.headline" data-edit-max="60" className={s.headline} id="shelves-h">Where everything lives</h2>
              <p data-edit="shelves.standfirst" data-edit-max="240" data-edit-multiline className={s.standfirst}>
                Three floors and a basement in a narrow house. If you cannot find
                something, ask: it is probably on a trolley waiting to be shelved.
              </p>
              <dl className={s.shelves}>
                {SHELVES.map(([name, where, note], i) => (
                  <div key={name}>
                    <dt data-edit={`shelves.term.${i}`} data-edit-max="28">{name}</dt>
                    <dd data-edit={`shelves.shelfWhere.${i}`} data-edit-max="200" data-edit-multiline className={s.shelfWhere}>{where}</dd>
                    <dd data-edit={`shelves.shelfNote.${i}`} data-edit-max="200" data-edit-multiline className={s.shelfNote}>{note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secRule}>
            <span data-edit="visit.text" data-edit-max="60">Visit</span>
            <span data-edit="visit.text2" data-edit-max="60">Page 6</span>
          </div>
          <h2 data-edit="visit.headline" data-edit-max="60" className={s.headline} id="visit-h">Hours, address and how to reach us</h2>
          <div className={s.visit}>
            <div className={s.visitBox}>
              <h3 data-edit="visit.boxHead" data-edit-max="40" className={s.boxHead}>Opening hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="visit.boxNote" data-edit-max="240" data-edit-multiline className={s.boxNote}>Open until ten on event nights. Closed on public holidays.</p>
            </div>
            <div className={s.visitBox}>
              <h3 data-edit="visit.boxHead2" data-edit-max="40" className={s.boxHead}>Find us</h3>
              <p data-edit="visit.visitAddr" data-edit-max="240" data-edit-multiline className={s.visitAddr}>14 Linden Row, the Old Quarter</p>
              <p data-edit="visit.boxNote2" data-edit-max="240" data-edit-multiline className={s.boxNote}>
                Opposite the fountain, with the green door and the cart of dollar books
                outside. The number 7 bus stops at the corner.
              </p>
              <p data-edit="visit.boxNote3" data-edit-max="240" data-edit-multiline className={s.boxNote}>
                One step at the entrance; ring the bell by the door and we will bring
                the ramp. Upstairs is by the staircase only.
              </p>
            </div>
            <div className={s.visitBox}>
              <h3 data-edit="visit.boxHead3" data-edit-max="40" className={s.boxHead}>Get in touch</h3>
              <ul className={s.contact}>
                <li>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550164410">(555) 016-4410</a>
                </li>
                <li>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:shop@dogearedbooks.example">shop@dogearedbooks.example</a>
                </li>
              </ul>
              <p data-edit="visit.boxNote4" data-edit-max="240" data-edit-multiline className={s.boxNote}>
                We answer the phone when nobody is waiting at the counter, and email
                within a day.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footTitle" data-edit-max="240" data-edit-multiline className={s.footTitle}>Dog-Eared Books</p>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional bookshop. Titles, authors, events and prices are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
