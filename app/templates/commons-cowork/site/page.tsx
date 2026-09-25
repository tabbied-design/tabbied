import { TabbiedPattern } from 'tabbied/react';
import { pebble, rabbet } from 'tabbied/patterns';
import s from './commons-cowork.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Commons: Coworking space, Canal Street',
  description:
    'Sixty-eight desks, four studios, two meeting rooms and a courtyard in an old print works on Canal Street. Day passes from $25, desks from $190 a month, open all hours to members.',
};

/* Site colors. Both fields take `transparent` in the background slot, so
   the blocks and pebbles sit on the page's own concrete-pale paper. */
const INK = '#1B1B1D';
const OCHRE = '#D9A21B';
const GRAY = '#8A8A85';
const PALE = '#DCDAD2';

const BLOCKS = ['transparent', OCHRE, INK, GRAY, OCHRE, PALE];
const GRAVEL = ['transparent', GRAY, PALE, OCHRE];
const STRIP = ['transparent', INK, GRAY, OCHRE, PALE];

const NAV = [
  ['Floor plan', '#floor'],
  ['Plans', '#plans'],
  ['Meeting rooms', '#rooms'],
  ['Amenities', '#amenities'],
  ['Events', '#events'],
  ['Book a tour', '#tour'],
  ['Find us', '#find-us'],
];

const FACTS = [
  ['68', 'desks'],
  ['4', 'studios'],
  ['2', 'meeting rooms'],
  ['24/7', 'for members'],
];

/* The ground floor on a twelve-by-seven grid. `area` is the zone's CSS
   grid-area (row start, column start, row end, column end). */
type Zone = {
  no: string;
  name: string;
  meta: string;
  kind: 'studio' | 'meet' | 'desk' | 'booth' | 'service' | 'social';
  area: string;
};

const ZONES: Zone[] = [
  { no: '1', name: 'Studio 1', meta: '4 desks', kind: 'studio', area: '1 / 1 / 3 / 3' },
  { no: '2', name: 'Studio 2', meta: '4 desks', kind: 'studio', area: '1 / 3 / 3 / 5' },
  { no: '3', name: 'Studio 3', meta: '6 desks', kind: 'studio', area: '1 / 5 / 3 / 7' },
  { no: '4', name: 'Studio 4', meta: '6 desks', kind: 'studio', area: '1 / 7 / 3 / 9' },
  { no: '5', name: 'The Long Room', meta: 'Meeting room, seats 12', kind: 'meet', area: '1 / 9 / 3 / 13' },
  { no: '6', name: 'Fixed desks', meta: '16 desks', kind: 'desk', area: '3 / 1 / 6 / 5' },
  { no: '7', name: 'Flex floor', meta: '32 desks, first come', kind: 'desk', area: '3 / 5 / 6 / 9' },
  { no: '9', name: 'Kitchen', meta: 'Coffee, tea, fridge', kind: 'social', area: '3 / 11 / 5 / 13' },
  { no: '10', name: 'The Snug', meta: 'Seats 4', kind: 'meet', area: '5 / 11 / 6 / 13' },
  { no: '11', name: 'Booth', meta: 'Calls', kind: 'booth', area: '6 / 1 / 8 / 2' },
  { no: '12', name: 'Booth', meta: 'Calls', kind: 'booth', area: '6 / 2 / 8 / 3' },
  { no: '13', name: 'Booth', meta: 'Calls', kind: 'booth', area: '6 / 3 / 8 / 4' },
  { no: '14', name: 'Booth', meta: 'Calls', kind: 'booth', area: '6 / 4 / 8 / 5' },
  { no: '15', name: 'Lockers', meta: 'Showers, bikes', kind: 'service', area: '6 / 5 / 8 / 7' },
  { no: '16', name: 'Reception', meta: 'Front door', kind: 'service', area: '6 / 7 / 8 / 9' },
  { no: '17', name: 'Lounge', meta: 'Sofas, events', kind: 'social', area: '6 / 9 / 8 / 13' },
];

const KEY = [
  ['1-4', 'Studios', 'Lockable rooms for teams of four to six, with their own window and thermostat.'],
  ['5', 'The Long Room', 'A table for twelve, a screen, a whiteboard wall and a door that shuts properly.'],
  ['6', 'Fixed desks', 'Your desk, your chair, your monitor arm and a pedestal that locks.'],
  ['7', 'Flex floor', 'Any free desk, and the long benches by the windows fill first.'],
  ['8', 'Courtyard', 'Open air, gravel and planters. Tables in summer, a fire bowl in winter.'],
  ['9', 'Kitchen', 'Espresso, filter, tea, oat milk and a dishwasher everyone empties.'],
  ['10', 'The Snug', 'Four chairs and a screen for calls that need more than a booth.'],
  ['11-14', 'Phone booths', 'Four, soundproofed and ventilated, with no booking needed.'],
  ['15', 'Lockers', 'Lockers, two showers, towels, and a bike store for twenty.'],
  ['16', 'Reception', 'Staffed 8:30 to 6 on weekdays. Post and parcels come here.'],
  ['17', 'Lounge', 'Sofas and a long table, and the room where events happen.'],
];

type Plan = {
  name: string;
  price: string;
  per: string;
  note: string;
};

const PLANS: Plan[] = [
  { name: 'Day pass', price: '$25', per: 'a day', note: 'Drop in, no sign-up' },
  { name: 'Flex', price: '$190', per: 'a month', note: 'Any free desk' },
  { name: 'Fixed desk', price: '$340', per: 'a month', note: 'The same desk every day' },
  { name: 'Studio', price: '$1,100', per: 'a month, from', note: 'A room for your team' },
];

type Cell = boolean | string;

const MATRIX: { feature: string; values: Cell[] }[] = [
  { feature: 'Access', values: ['Weekdays, 9 to 6', 'All hours', 'All hours', 'All hours'] },
  { feature: 'A desk of your own', values: [false, false, true, true] },
  { feature: 'A room that locks', values: [false, false, false, true] },
  { feature: 'Meeting room hours', values: ['Pay by the hour', '4 a month', '8 a month', '15 a month'] },
  { feature: 'Phone booths', values: [true, true, true, true] },
  { feature: 'Kitchen, coffee and tea', values: [true, true, true, true] },
  { feature: 'Fiber wifi', values: [true, true, true, true] },
  { feature: 'Wired connection and monitor', values: [false, false, true, true] },
  { feature: 'Locker', values: [false, 'Small', 'Large', false] },
  { feature: 'Printing', values: ['10 cents a page', '50 pages', '100 pages', '300 pages'] },
  { feature: 'Mail and parcels', values: [false, false, true, true] },
  { feature: 'Business address', values: [false, false, true, true] },
  { feature: 'Guest day passes', values: [false, '1 a month', '2 a month', '6 a month'] },
  { feature: 'Members events', values: [true, true, true, true] },
];

type Room = {
  no: string;
  name: string;
  seats: string;
  kit: string;
  rates: string[][];
};

const ROOMS: Room[] = [
  {
    no: '5',
    name: 'The Long Room',
    seats: 'Seats 12 at the table, 20 standing',
    kit: '75-inch screen, video bar, whiteboard wall, blinds',
    rates: [
      ['An hour', '$45'],
      ['Half a day', '$150'],
      ['A whole day', '$260'],
    ],
  },
  {
    no: '10',
    name: 'The Snug',
    seats: 'Seats 4 in armchairs',
    kit: '43-inch screen, speakerphone, a door that shuts',
    rates: [
      ['An hour', '$20'],
      ['Half a day', '$70'],
      ['A whole day', '$120'],
    ],
  },
  {
    no: '8',
    name: 'The Courtyard and Lounge',
    seats: 'Up to 60 for an evening',
    kit: 'Tables, a projector, a sound system, the kitchen',
    rates: [
      ['Weekday evening', '$400'],
      ['Saturday, all day', '$900'],
      ['Members', 'Half price'],
    ],
  },
];

const AMENITIES = [
  ['Fiber wifi', 'A gigabit line, and a wired port at every fixed desk.'],
  ['Coffee', 'An espresso machine, a filter jug, fresh milk and oat milk.'],
  ['Phone booths', 'Four of them, soundproofed, never booked.'],
  ['Showers', 'Two, with towels, for anyone who cycles in.'],
  ['Bike store', 'Racks for twenty, a pump and a stand.'],
  ['Printing', 'A laser printer and scanner, on your member card.'],
  ['Step-free', 'Level from the street, with an accessible bathroom.'],
  ['Dogs', 'Welcome on Fridays, on a lead in the kitchen.'],
  ['Quiet hours', 'The flex floor is silent from 9 to 11 every morning.'],
  ['Standing desks', 'Eight on the flex floor, and one in every studio.'],
  ['Mail', 'Signed for, kept safe, a message when it comes.'],
  ['Heating', 'Underfloor, and the windows open.'],
];

type Meetup = {
  day: string;
  month: string;
  weekday: string;
  time: string;
  title: string;
  body: string;
  who: string;
};

const EVENTS: Meetup[] = [
  {
    day: '06',
    month: 'Oct',
    weekday: 'Tue',
    time: '8:30 am',
    title: 'Breakfast club',
    body: 'Pastries in the lounge and five minutes each on what you are working on. Nobody has to speak.',
    who: 'Members',
  },
  {
    day: '15',
    month: 'Oct',
    weekday: 'Thu',
    time: '12:30 pm',
    title: 'Lunch and learn: bookkeeping for freelancers',
    body: 'A local accountant on invoices, quarterly taxes and what you can claim. Lunch provided.',
    who: 'Members, free',
  },
  {
    day: '23',
    month: 'Oct',
    weekday: 'Fri',
    time: '5:30 pm',
    title: 'Courtyard drinks',
    body: 'The last warm-ish Friday of the year, probably. Bring a colleague or a client.',
    who: 'Members and guests',
  },
  {
    day: '05',
    month: 'Nov',
    weekday: 'Thu',
    time: '6:30 pm',
    title: 'Portfolio night',
    body: 'Designers, writers and developers show one piece of work each and get honest notes.',
    who: 'Open to all, $5',
  },
  {
    day: '19',
    month: 'Nov',
    weekday: 'Thu',
    time: '7:00 pm',
    title: 'Founders supper',
    body: 'A long table, a cooked meal and one rule: no pitching. Twelve seats.',
    who: 'Members, $15',
  },
];

const HOURS = [
  ['Staffed', 'Mon to Fri, 8:30 am to 6 pm'],
  ['Members', 'All hours, every day, on your key fob'],
  ['Day passes', 'Mon to Fri, 9 am to 6 pm'],
  ['Tours', 'Weekdays, any time the desk is staffed'],
];

export default function CommonsCoworkPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f1f0ec',
        '--ink': '#1b1b1d',
        '--ochre': '#d9a21b',
        '--gray': '#8a8a85',
        '--pale': '#dcdad2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,ochre,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markBox} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Commons</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#tour">Book a tour</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The sentence on the left, a field of stepped blocks on the
            right: pieces cut to fit their neighbors. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Coworking, 40 Canal Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              A desk, a door or a day. <em>Room to work, among neighbors.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Commons fills the ground floor of the old Harbor print works: a
              flex floor, fixed desks, four studios that lock, two meeting
              rooms and a courtyard in the middle of it all. Come for a day,
              or stay for years; a third of our members have.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#tour">Book a tour</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#plans">Compare plans</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([value, label], i) => (
                <div key={label}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{value}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,1,3,2,4" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={rabbet}
              palette={BLOCKS}
              fit="grid"
              cellSize={88}
              seed="commons-blocks"
              options={{ frequency: 0.6 }}
              redrawInterval={8500}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------ FLOOR PLAN
            The ground floor drawn as a CSS grid: every room a cell, walls
            as rules, the courtyard open to the sky in the middle. On a
            phone the labels give way to numbers and the key does the
            talking. */}
        <section id="floor" className={s.sec} aria-labelledby="floor-h">
          <div className={s.secHead}>
            <p data-edit="floor.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>01 / Floor plan</p>
            <h2 data-edit="floor.title" data-edit-max="60" id="floor-h">The ground floor, all 6,400 square feet of it</h2>
            <p data-edit="floor.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One level, step-free from the street. The studios face the
              canal, the flex floor faces the courtyard, and the booths are
              where the noise is not.
            </p>
          </div>
          <div className={s.planWrap}>
            <p className={s.compass} aria-hidden="true">
              <span data-edit="floor.text" data-edit-max="60">N</span>
            </p>
            <ol className={s.plan} aria-label="Floor plan of the ground floor, numbered as in the key">
              {ZONES.map((z, i) => (
                <li key={z.no} className={`${s.zone} ${s[z.kind]}`} style={{ gridArea: z.area }}>
                  <span data-edit={`floor.zoneNo.${i}`} data-edit-max="60" className={s.zoneNo}>{z.no}</span>
                  <span data-edit={`floor.zoneName.${i}`} data-edit-max="60" className={s.zoneName}>{z.name}</span>
                  <span data-edit={`floor.zoneMeta.${i}`} data-edit-max="60" className={s.zoneMeta}>{z.meta}</span>
                </li>
              ))}
              <li className={`${s.zone} ${s.yard}`}>
                <div data-edit-pattern="floor.field" data-edit-roles="transparent,3,4,2" className={s.yardField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={pebble}
                    palette={GRAVEL}
                    fit="grid"
                    cellSize={24}
                    seed="commons-gravel"
                    options={{ frequency: 0.35 }}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <span data-edit="floor.zoneNo2" data-edit-max="60" className={s.zoneNo}>8</span>
                <span data-edit="floor.zoneName2" data-edit-max="60" className={s.zoneName}>Courtyard</span>
                <span data-edit="floor.zoneMeta2" data-edit-max="60" className={s.zoneMeta}>Open air</span>
              </li>
            </ol>
            <p className={s.door}>
              <span data-edit="floor.text2" data-edit-max="60">Canal Street entrance</span>
            </p>
          </div>
          <ul className={s.key}>
            {KEY.map(([no, name, body], i) => (
              <li key={no}>
                <span data-edit={`floor.keyNo.${i}`} data-edit-max="60" className={s.keyNo}>{no}</span>
                <strong data-edit={`floor.emphasis.${i}`}>{name}</strong>
                <span data-edit={`floor.keyBody.${i}`} data-edit-max="60" className={s.keyBody}>{body}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- PLANS
            The comparison matrix: four plans across, what each includes
            down the side, CSS check marks. It scrolls sideways on a phone,
            with the feature column pinned. */}
        <section id="plans" className={s.sec} aria-labelledby="plans-h">
          <div className={s.secHead}>
            <p data-edit="plans.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>02 / Plans</p>
            <h2 data-edit="plans.title" data-edit-max="60" id="plans-h">Four ways to be a member</h2>
            <p data-edit="plans.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Monthly plans roll on and stop with a month's notice. No
              deposit, no setup fee, and you can move between plans whenever
              a desk is free.
            </p>
          </div>
          <p data-edit="plans.swipe" data-edit-max="240" data-edit-multiline className={s.swipe}>Swipe the table to compare all four plans.</p>
          <div className={s.matrixScroll}>
            <table className={s.matrix}>
              <caption data-edit="plans.srOnly" className={s.srOnly}>What each membership plan includes</caption>
              <thead>
                <tr>
                  <td className={s.corner} />
                  {PLANS.map((p, i) => (
                    <th key={p.name} scope="col" className={p.name === 'Fixed desk' ? s.planHot : s.planCol}>
                      <span data-edit={`plans.planName.${i}`} data-edit-max="60" className={s.planName}>{p.name}</span>
                      <span data-edit={`plans.planPrice.${i}`} data-edit-max="60" className={s.planPrice}>{p.price}</span>
                      <span data-edit={`plans.planPer.${i}`} data-edit-max="60" className={s.planPer}>{p.per}</span>
                      <span data-edit={`plans.planNote.${i}`} data-edit-max="60" className={s.planNote}>{p.note}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => (
                  <tr key={row.feature}>
                    <th data-edit={`plans.heading.${i}`} scope="row">{row.feature}</th>
                    {row.values.map((v, j) => (
                      <td key={PLANS[j].name}>
                        {typeof v === 'string' ? (
                          <span data-edit={`plans.cellText.${i}.${j}`} data-edit-max="60" className={s.cellText}>{v}</span>
                        ) : v ? (
                          <span className={s.yes}>
                            <span data-edit={`plans.srOnly2.${i}.${j}`} data-edit-max="60" className={s.srOnly}>Included</span>
                          </span>
                        ) : (
                          <span className={s.no}>
                            <span data-edit={`plans.srOnly3.${i}.${j}`} data-edit-max="60" className={s.srOnly}>Not included</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  {PLANS.map((p, i) => (
                    <td key={p.name}>
                      <a data-edit={`plans.planLink.${i}`} data-edit-max="28" className={s.planLink} href="#tour">Start with a tour</a>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* --------------------------------------------------- MEETING ROOMS */}
        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p data-edit="rooms.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>03 / Meeting rooms</p>
            <h2 data-edit="rooms.title" data-edit-max="60" id="rooms-h">Rooms by the hour, for members and not</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Book online or at reception. Members spend their monthly hours
              first, then pay these rates less a quarter.
            </p>
          </div>
          <ul className={s.rooms}>
            {ROOMS.map((r, i) => (
              <li key={r.name} className={s.room}>
                <span data-edit={`rooms.roomNo.${i}`} data-edit-max="60" className={s.roomNo}>{r.no}</span>
                <h3 data-edit={`rooms.title2.${i}`} data-edit-max="40">{r.name}</h3>
                <p data-edit={`rooms.roomSeats.${i}`} data-edit-max="240" data-edit-multiline className={s.roomSeats}>{r.seats}</p>
                <p data-edit={`rooms.roomKit.${i}`} data-edit-max="240" data-edit-multiline className={s.roomKit}>{r.kit}</p>
                <dl className={s.roomRates}>
                  {r.rates.map(([label, price], i2) => (
                    <div key={label}>
                      <dt data-edit={`rooms.term.${i}.${i2}`} data-edit-max="28">{label}</dt>
                      <dd data-edit={`rooms.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- AMENITIES */}
        <section id="amenities" className={s.sec} aria-labelledby="amenities-h">
          <div className={s.secHead}>
            <p data-edit="amenities.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>04 / Amenities</p>
            <h2 data-edit="amenities.title" data-edit-max="60" id="amenities-h">In every plan, even the day pass</h2>
            <p data-edit="amenities.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The small things that decide whether a place works: the coffee,
              the wifi, somewhere to take a call and somewhere to shower.
            </p>
          </div>
          <dl className={s.amenities}>
            {AMENITIES.map(([name, body], i) => (
              <div key={name}>
                <dt data-edit={`amenities.term.${i}`} data-edit-max="28">{name}</dt>
                <dd data-edit={`amenities.body.${i}`} data-edit-max="200" data-edit-multiline>{body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------- EVENTS */}
        <section id="events" className={s.sec} aria-labelledby="events-h">
          <div className={s.secHead}>
            <p data-edit="events.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>05 / Events</p>
            <h2 data-edit="events.title" data-edit-max="60" id="events-h">This autumn in the lounge</h2>
            <p data-edit="events.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Small, regular and never compulsory. Members sign up on the
              board by the kitchen; guests can write to us.
            </p>
          </div>
          <ol className={s.events}>
            {EVENTS.map((e, i) => (
              <li key={e.title} className={s.event}>
                <p className={s.eventDate}>
                  <span data-edit={`events.eventDay.${i}`} data-edit-max="60" className={s.eventDay}>{e.day}</span>
                  <span data-edit={`events.eventMonth.${i}`} data-edit-max="60" className={s.eventMonth}>{e.month}</span>
                </p>
                <p className={s.eventWhen}>
                  <span data-edit={`events.text.${i}`} data-edit-max="60">{e.weekday}</span>
                  <span data-edit={`events.text2.${i}`} data-edit-max="60">{e.time}</span>
                </p>
                <div className={s.eventText}>
                  <h3 data-edit={`events.title2.${i}`} data-edit-max="40">{e.title}</h3>
                  <p data-edit={`events.body.${i}`} data-edit-max="240" data-edit-multiline>{e.body}</p>
                </div>
                <span data-edit={`events.eventWho.${i}`} data-edit-max="60" className={s.eventWho}>{e.who}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ TOUR */}
        <section id="tour" className={s.tourSec} aria-labelledby="tour-h">
          <div className={s.tour}>
            <div className={s.tourIntro}>
              <p data-edit="tour.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>06 / Book a tour</p>
              <h2 data-edit="tour.title" data-edit-max="60" id="tour-h">Come and see it working</h2>
              <p data-edit="tour.body" data-edit-max="240" data-edit-multiline>
                A tour takes twenty minutes and ends with a coffee. Stay
                afterwards and the rest of the day is on us, at any desk on
                the flex floor.
              </p>
              <ul className={s.tourList}>
                <li data-edit="tour.item" data-edit-max="80">We confirm by email within a working day.</li>
                <li data-edit="tour.item2" data-edit-max="80">Bring a laptop if you want to try the free day.</li>
                <li data-edit="tour.item3" data-edit-max="80">Teams of more than four: ask for a studio viewing.</li>
              </ul>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="tour.label" htmlFor="co-name">Name</label>
                <input id="co-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="tour.label2" htmlFor="co-email">Email</label>
                <input id="co-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="tour.label3" htmlFor="co-work">What you do</label>
                <input id="co-work" name="work" type="text" placeholder="Designer, a team of three" />
              </div>
              <div className={s.field}>
                <label data-edit="tour.label4" htmlFor="co-plan">Interested in</label>
                <select id="co-plan" name="plan" defaultValue="">
                  <option value="">Not sure yet</option>
                  <option>Day pass</option>
                  <option>Flex</option>
                  <option>Fixed desk</option>
                  <option>Studio</option>
                  <option>Meeting rooms only</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="tour.label5" htmlFor="co-date">Day</label>
                <input id="co-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="tour.label6" htmlFor="co-time">Time</label>
                <select id="co-time" name="time" defaultValue="">
                  <option value="">Any time</option>
                  <option>Morning, 9 to 12</option>
                  <option>Lunchtime, 12 to 2</option>
                  <option>Afternoon, 2 to 5:30</option>
                </select>
              </div>
              <div className={s.formFoot}>
                <button data-edit="tour.btn" data-edit-max="24" className={s.btn} type="submit">Book the tour</button>
                <small data-edit="tour.note">We never share your details.</small>
              </div>
            </form>
          </div>
        </section>

        {/* --------------------------------------------------------- FIND US */}
        <section id="find-us" className={s.sec} aria-labelledby="find-h">
          <div className={s.secHead}>
            <p data-edit="findUs.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>07 / Find us</p>
            <h2 data-edit="findUs.title" data-edit-max="60" id="find-h">On Canal Street, by the swing bridge</h2>
            <p data-edit="findUs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The brick building with PRINT WORKS still painted across the
              top. The door is the yellow one.
            </p>
          </div>
          <div className={s.find}>
            <address className={s.address}>
              <span data-edit="findUs.addrBig" data-edit-max="60" className={s.addrBig}>Commons</span>
              <span data-edit="findUs.addrBig2" data-edit-max="60" className={s.addrBig}>40 Canal Street</span>
              <span data-edit="findUs.addrBig3" data-edit-max="60" className={s.addrBig}>Harbor District</span>
              <a data-edit="findUs.link" data-edit-max="28" href="tel:+15554029911">(555) 402-9911</a>
              <a data-edit="findUs.link2" data-edit-max="28" href="mailto:desk@commons.example">desk@commons.example</a>
            </address>
            <dl className={s.hours}>
              {HOURS.map(([who, when], i) => (
                <div key={who}>
                  <dt data-edit={`findUs.term.${i}`} data-edit-max="28">{who}</dt>
                  <dd data-edit={`findUs.body.${i}`} data-edit-max="200" data-edit-multiline>{when}</dd>
                </div>
              ))}
            </dl>
            <ul className={s.getting}>
              <li>
                <strong data-edit="findUs.emphasis">Tram</strong>
                <span data-edit="findUs.text" data-edit-max="60">Line 2 to Swing Bridge, then two minutes along the canal.</span>
              </li>
              <li>
                <strong data-edit="findUs.emphasis2">Bike</strong>
                <span data-edit="findUs.text2" data-edit-max="60">The towpath runs past the door; the bike store is through reception.</span>
              </li>
              <li>
                <strong data-edit="findUs.emphasis3">Car</strong>
                <span data-edit="findUs.text3" data-edit-max="60">No parking of our own. The Wharf garage is $9 a day with a member card.</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* The blocks again, as a strip along the foot of the page. */}
      <div data-edit-pattern="page.field" data-edit-roles="transparent,1,3,2,4" className={s.strip} aria-hidden="true">
        <TabbiedPattern
          pattern={rabbet}
          palette={STRIP}
          fit="grid"
          cellSize={48}
          seed="commons-strip"
          options={{ frequency: 0.45 }}
          redrawInterval={9000}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Commons</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Coworking in the old print works, 40 Canal Street.</p>
          </div>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.floor" data-edit-max="28" href="#floor">Floor plan</a></li>
            <li><a data-edit="footer.plans" data-edit-max="28" href="#plans">Plans and prices</a></li>
            <li><a data-edit="footer.rooms" data-edit-max="28" href="#rooms">Meeting rooms</a></li>
          </ul>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.amenities" data-edit-max="28" href="#amenities">Amenities</a></li>
            <li><a data-edit="footer.events" data-edit-max="28" href="#events">Events</a></li>
            <li><a data-edit="footer.tour" data-edit-max="28" href="#tour">Book a tour</a></li>
          </ul>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.link" data-edit-max="28" href="mailto:desk@commons.example">desk@commons.example</a></li>
            <li><a data-edit="footer.link2" data-edit-max="28" href="tel:+15554029911">(555) 402-9911</a></li>
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional coworking space. Plans, prices, rooms and events are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
