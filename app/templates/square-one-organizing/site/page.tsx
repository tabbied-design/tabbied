import { TabbiedPattern } from 'tabbied/react';
import { pentomino } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './square-one-organizing.module.css';

export const metadata = {
  title: 'Square One Organizing: Professional organizer for rooms and moves',
  description:
    'Square One is a professional organizing service: room-by-room sessions, a moving-day plan from six weeks out to the week after, before-and-after checklists, and plain hourly and package prices.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The pentomino
   is the packing grid itself: twelve pieces fitted edge to edge in indigo,
   teal, tangerine and lilac, with the chalk ground as the grout. It is the
   square in the hero, the last cell of the room grid, the band between the
   plan and the checklists, and the footer. */
const CHALK = '#f2f3ee';
const INDIGO = '#1c2140';
const TEAL = '#129a8b';
const TANGERINE = '#f4a024';
const LILAC = '#8f7ff0';

const PIECES = ['transparent', INDIGO, TEAL, TANGERINE, LILAC];
const BRIGHT = ['transparent', TEAL, TANGERINE, LILAC, TEAL];
const DUSK = ['transparent', CHALK, TEAL, TANGERINE, LILAC];

const NAV = [
  ['Rooms', '#rooms'],
  ['Moving', '#moving'],
  ['Checklists', '#checklists'],
  ['Prices', '#prices'],
  ['Book', '#book'],
];

const FACTS = [
  ['3 hours', 'a session, with you'],
  ['Same day', 'donations dropped off'],
  ['Nothing', 'thrown out without your yes'],
];

type Room = { key: string; name: string; time: string; what: string };

const ROOMS: Room[] = [
  { key: 'closet', name: 'Closets', time: '3 hours', what: 'One pass, try-on optional. Hangers matched, seasons split, a bag for the consignment shop.' },
  { key: 'bath', name: 'Bathroom', time: '2 hours', what: 'Expired out, duplicates in a bin, the under-sink fixed.' },
  { key: 'garage', name: 'Garage', time: '8 hours, with a helper', what: 'Zones for tools, sport, garden and keep-for-later. Walls before shelves, shelves before bins.' },
  { key: 'office', name: 'Home office', time: '4 hours', what: 'Desk cleared to the wood. Cables tied, a paper system you will actually use, a shelf for the printer and only the printer.' },
  { key: 'kids', name: 'Kids rooms', time: '3 hours', what: 'Toy rotation in labeled bins, at a height they can reach and put back.' },
  { key: 'paper', name: 'Paperwork', time: '3 hours', what: 'Keep, scan, shred. A one-drawer file and a list of what to keep for how long.' },
  { key: 'pantry', name: 'Pantry', time: '2 hours', what: 'Decanted, dated, front-facing.' },
];

type Bar = { key: string; phase: string; task: string; when: string };

const PLAN_WEEKS = ['6 weeks out', '4 weeks out', '2 weeks out', 'Moving day', 'Week after'];

const PLAN: Bar[] = [
  { key: 'edit', phase: 'Edit', task: 'Decide what moves, sells and goes to donation, room by room.', when: '6 to 4 weeks out' },
  { key: 'pack', phase: 'Pack', task: 'Rarely used rooms first. Every box numbered, listed and labeled for its new room.', when: '4 weeks out to the day before' },
  { key: 'move', phase: 'Move', task: 'We run the house while the movers load. You hold the coffee.', when: 'Moving day' },
  { key: 'unpack', phase: 'Unpack', task: 'Kitchen and beds first, made up that night.', when: 'Moving day and after' },
  { key: 'settle', phase: 'Settle', task: 'Every box gone, empties recycled, the junk drawer named.', when: 'Week after' },
];

const BEFORE = [
  'Pick one room, not the whole house',
  'Clear a table or a patch of floor to sort on',
  'Put aside anything you already know you are keeping',
  'Do not buy containers yet, we measure first',
  'Plan to be home for the whole session',
];

const AFTER = [
  'Every shelf and bin labeled, in plain words',
  'Donations in our van, receipt emailed to you',
  'A photo of each finished space, to put it back by',
  'A short list of anything to buy, with sizes',
  'A ten-minute reset routine for the room',
];

const PRICES = [
  ['By the hour', '$68', 'an hour, three-hour minimum', 'For one room, or a start on a stubborn one.'],
  ['One room reset', '$390', 'six hours over two sessions', 'Our most booked: a kitchen, a garage or a closet, done.'],
  ['Whole home', '$1,450', 'twenty-four hours, at your pace', 'Every room in turn, over a few weeks, with a plan.'],
  ['Moving day', '$1,890', 'plan, pack and unpack', 'Two organizers on packing day and moving day, and the week-after visit.'],
];

const HOURS = [
  ['Sessions', 'Monday to Saturday, 9:00-6:00'],
  ['Phone and email', 'Weekdays, 8:30-5:00'],
  ['Walk-throughs', 'Free, 30 minutes, at your home'],
];

/* The kitchen, the room most people start with, drawn as its cupboard:
   what goes on which shelf. */
const SHELVES = [
  ['Top shelf', 'Twice a year: the roasting tin, the fondue set'],
  ['Eye level', 'Every day: plates, mugs, the good knife'],
  ['Counter', 'Only what is used daily, and the kettle'],
  ['Low drawers', 'Pots with their lids, trays standing up'],
];

const ROOM_PICKS = ['Kitchen', 'Closets', 'Garage', 'Office', 'Paperwork', 'A move'];

export default function SquareOneOrganizingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--chalk': '#f2f3ee',
        '--indigo': '#1c2140',
        '--teal': '#129a8b',
        '--tangerine': '#f4a024',
        '--lilac': '#8f7ff0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="chalk,indigo,teal,tangerine,lilac"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&family=Red+Hat+Text:wght@400;500;700&family=Red+Hat+Mono:wght@500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandSquare} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Square One</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Organizing</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Free walk-through</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Graph paper, and on it one square packed full of pieces, with a
            label-maker strip across it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.tape" data-edit-max="240" data-edit-multiline className={s.tape}>Professional organizer</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              A place for everything, <span>starting at square one.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We sort kitchens, closets, garages and whole moves, room by
              room and side by side with you. Nothing leaves without your
              yes, and every shelf ends up labeled in words you would use.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a free walk-through</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#prices">See prices</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([value, label], i) => (
                <div key={label}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4" className={s.square} aria-hidden="true">
              <TabbiedPattern
                pattern={pentomino}
                palette={PIECES}
                fit="grid"
                cellSize={44}
                seed="square-one-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.heroLabel" data-edit-max="240" data-edit-multiline className={s.heroLabel}>Square one. Everything fits.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROOMS
            The rooms packed into one grid, each sized by how long it takes,
            and the last space filled with pieces. */}
        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p data-edit="rooms.tape" data-edit-max="240" data-edit-multiline className={s.tape}>Room by room</p>
            <h2 data-edit="rooms.secTitle" data-edit-max="60" id="rooms-h" className={s.secTitle}>One room at a time, sized by the hours it takes</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Times are for an average home and a client who is there to
              decide. We book in three-hour sessions and stop when you have
              had enough.
            </p>
          </div>
          <ul className={s.rooms}>
            <li className={`${s.room} ${s.kitchen}`}>
              <h3 data-edit="rooms.roomName" data-edit-max="40" className={s.roomName}>Kitchen</h3>
              <p data-edit="rooms.roomTime" data-edit-max="240" data-edit-multiline className={s.roomTime}>Usually 6 hours, over two sessions</p>
              <dl className={s.shelves}>
                {SHELVES.map(([shelf, what], i) => (
                  <div key={shelf}>
                    <dt data-edit={`rooms.term.${i}`} data-edit-max="28">{shelf}</dt>
                    <dd data-edit={`rooms.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="rooms.roomWhat" data-edit-max="240" data-edit-multiline className={s.roomWhat}>
                Everything out and onto the table, sorted by how often you
                cook with it, then back in by that order. The drawer of lids
                finally matched.
              </p>
            </li>
            {ROOMS.map((r, i) => (
              <li key={r.key} className={`${s.room} ${s[r.key]}`}>
                <h3 data-edit={`rooms.roomName2.${i}`} data-edit-max="40" className={s.roomName}>{r.name}</h3>
                <p data-edit={`rooms.roomTime2.${i}`} data-edit-max="240" data-edit-multiline className={s.roomTime}>{r.time}</p>
                <p data-edit={`rooms.roomWhat2.${i}`} data-edit-max="240" data-edit-multiline className={s.roomWhat}>{r.what}</p>
              </li>
            ))}
            <li className={s.roomFill} aria-hidden="true">
              <div data-edit-pattern="rooms.field" data-edit-roles="transparent,2,3,4,2" className={s.fillField} aria-hidden="true">
                <TabbiedPattern
                  pattern={pentomino}
                  palette={BRIGHT}
                  fit="grid"
                  cellSize={34}
                  seed="square-one-rooms"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </li>
          </ul>
        </section>

        {/* ---------------------------------------------------------- MOVING
            The moving plan as a chart: weeks across, phases down. */}
        <section id="moving" className={s.moving} aria-labelledby="moving-h">
          <div className={s.movingInner}>
            <div className={s.movingHead}>
              <p data-edit="moving.tapeLight" data-edit-max="240" data-edit-multiline className={s.tapeLight}>The moving plan</p>
              <h2 data-edit="moving.movingTitle" data-edit-max="60" id="moving-h" className={s.movingTitle}>Six weeks out to the week after</h2>
              <p data-edit="moving.movingNote" data-edit-max="240" data-edit-multiline className={s.movingNote}>
                The Moving day package follows this chart. Book us six weeks
                ahead if you can; three is possible, with longer packing days.
              </p>
            </div>
            <div className={s.chart}>
              <div className={s.weeks} aria-hidden="true">
                {PLAN_WEEKS.map((w, i) => (
                  <span data-edit={`moving.text.${i}`} data-edit-max="60" key={w}>{w}</span>
                ))}
              </div>
              <ol className={s.bars}>
                {PLAN.map((b, i) => (
                  <li key={b.key} className={`${s.barRow} ${s[b.key]}`}>
                    <h3 data-edit={`moving.phase.${i}`} data-edit-max="40" className={s.phase}>{b.phase}</h3>
                    <div className={s.barFill}>
                      <p data-edit={`moving.barWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.barWhen}>{b.when}</p>
                      <p data-edit={`moving.barTask.${i}`} data-edit-max="240" data-edit-multiline className={s.barTask}>{b.task}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={pentomino}
            palette={PIECES}
            fit="grid"
            cellSize={30}
            seed="square-one-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------ CHECKLISTS */}
        <section id="checklists" className={s.sec} aria-labelledby="checklists-h">
          <div className={s.secHead}>
            <p data-edit="checklists.tape" data-edit-max="240" data-edit-multiline className={s.tape}>Before and after</p>
            <h2 data-edit="checklists.secTitle" data-edit-max="60" id="checklists-h" className={s.secTitle}>Two short checklists</h2>
            <p data-edit="checklists.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The first is yours, the night before. The second is ours, and
              we go through it with you before we leave.
            </p>
          </div>
          <div className={s.lists}>
            <div className={s.list}>
              <h3 data-edit="checklists.listTitle" data-edit-max="40" className={s.listTitle}>Before your session</h3>
              <ul className={s.boxes}>
                {BEFORE.map((item, i) => (
                  <li data-edit={`checklists.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${s.list} ${s.listDone}`}>
              <h3 data-edit="checklists.listTitle2" data-edit-max="40" className={s.listTitle}>After we leave</h3>
              <ul className={`${s.boxes} ${s.ticked}`}>
                {AFTER.map((item, i) => (
                  <li data-edit={`checklists.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.tape" data-edit-max="240" data-edit-multiline className={s.tape}>Prices</p>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>By the hour, or by the job</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Bins, baskets and labels are bought to measure and billed at
              cost, with no markup. Seniors and first-time movers: ask about
              the sliding scale.
            </p>
          </div>
          <ul className={s.prices}>
            {PRICES.map(([name, price, unit, note], i) => (
              <li key={name} className={s.priceCard}>
                <h3 data-edit={`prices.priceName.${i}`} data-edit-max="40" className={s.priceName}>{name}</h3>
                <p data-edit={`prices.priceFig.${i}`} data-edit-max="240" data-edit-multiline className={s.priceFig}>{price}</p>
                <p data-edit={`prices.priceUnit.${i}`} data-edit-max="240" data-edit-multiline className={s.priceUnit}>{unit}</p>
                <p data-edit={`prices.priceNote.${i}`} data-edit-max="240" data-edit-multiline className={s.priceNote}>{note}</p>
              </li>
            ))}
          </ul>
          <p data-edit="prices.virtual" data-edit-max="240" data-edit-multiline className={s.virtual}>Far away, or just want a plan? A virtual session is $45 for 45 minutes, with a written list after.</p>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <p data-edit="book.tape" data-edit-max="240" data-edit-multiline className={s.tape}>Book</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Start with a free walk-through</h2>
              <p data-edit="book.bookLead" data-edit-max="240" data-edit-multiline className={s.bookLead}>
                Thirty minutes at your home: we look, you talk, and you get a
                written estimate in hours. No pressure to book.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550173341">(555) 017-3341</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:hello@squareone.example">hello@squareone.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Studio</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>18 Kestrel Lane, Unit 2, Fairbank</dd>
                </div>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`book.body2.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="so-name">Name</label>
                <input id="so-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="so-email">Email</label>
                <input id="so-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="so-phone">Phone</label>
                <input id="so-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="so-date">Moving date, if any</label>
                <input id="so-date" name="date" type="date" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="book.legend">Where to start</legend>
                <div className={s.picks}>
                  {ROOM_PICKS.map((room, i) => (
                    <span key={room} className={s.pick}>
                      <input id={`so-room-${i}`} type="checkbox" name="rooms" value={room} />
                      <label data-edit={`book.label5.${i}`} htmlFor={`so-room-${i}`}>{room}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label6" htmlFor="so-note">What is bothering you most</label>
                <textarea id="so-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a walk-through</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,2,3,4" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={pentomino}
            palette={DUSK}
            fit="grid"
            cellSize={28}
            seed="square-one-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Square One Organizing</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>
            A fictional organizing business: the names, people, prices and
            address are invented.
          </p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
