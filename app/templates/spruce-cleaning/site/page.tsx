import { TabbiedPattern } from 'tabbied/react';
import { crosslattice, sparkle } from 'tabbied/patterns';
import s from './spruce-cleaning.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Spruce: Home cleaning service, Lakemont',
  description:
    'Spruce cleans homes in Lakemont at a fixed price by the size of the home: regular, deep and move-out cleans, with the checklist on the page and a 48-hour re-clean guarantee.',
};

/* Site colors. The tile plate lays the mist tile over the page's own
   ground; the sparkle field sits on the ink band, so its slot is empty. */
const INK = '#1A2322';
const GREEN = '#5BAF7A';
const LEMON = '#F2C94C';
const MIST = '#E6ECE7';

const TILES = ['transparent', MIST, GREEN];
const SPARKS = ['transparent', MIST, LEMON, GREEN];

const NAV = [
  ['Prices', '#prices'],
  ['Checklist', '#included'],
  ['How it works', '#how'],
  ['Cleaners', '#cleaners'],
  ['Areas', '#areas'],
  ['FAQ', '#faq'],
];

type Size = {
  id: string;
  cls: string;
  short: string;
  name: string;
  time: string;
  regular: string;
  deep: string;
  moveOut: string;
};

const SIZES: Size[] = [
  { id: 'studio', cls: 'qStudio', short: 'Studio', name: 'Studio', time: 'About 2 hours', regular: '$109', deep: '$189', moveOut: '$219' },
  { id: 'one', cls: 'qOne', short: '1 bed', name: '1 bedroom', time: 'About 2.5 hours', regular: '$129', deep: '$219', moveOut: '$259' },
  { id: 'two', cls: 'qTwo', short: '2 bed', name: '2 bedrooms', time: 'About 3 hours', regular: '$159', deep: '$269', moveOut: '$319' },
  { id: 'three', cls: 'qThree', short: '3 bed', name: '3 bedrooms', time: 'About 4 hours', regular: '$199', deep: '$329', moveOut: '$389' },
  { id: 'four', cls: 'qFour', short: '4+ bed', name: '4 bedrooms or more', time: 'About 5 hours', regular: '$239', deep: '$389', moveOut: '$459' },
];

const FREQUENCY = [
  ['Every week', '20% off'],
  ['Every two weeks', '15% off'],
  ['Every four weeks', '10% off'],
];

const EXTRAS = [
  ['Inside the oven', '$35'],
  ['Inside the fridge', '$30'],
  ['Interior windows', '$6 each'],
  ['A load of laundry, washed and folded', '$25'],
  ['Extra bathroom', '$25'],
];

type Room = {
  room: string;
  items: { text: string; deep: boolean }[];
};

const ROOMS: Room[] = [
  {
    room: 'Kitchen',
    items: [
      { text: 'Counters, backsplash and sink scrubbed', deep: false },
      { text: 'Stovetop and knobs degreased', deep: false },
      { text: 'Outside of every appliance wiped', deep: false },
      { text: 'Microwave, inside and out', deep: false },
      { text: 'Floor vacuumed and mopped', deep: false },
      { text: 'Cabinet fronts and handles', deep: true },
      { text: 'Inside the oven', deep: true },
      { text: 'Inside the fridge, on a move-out', deep: true },
    ],
  },
  {
    room: 'Bathrooms',
    items: [
      { text: 'Toilet, inside and out, and behind it', deep: false },
      { text: 'Shower, tub and wall tiles scrubbed', deep: false },
      { text: 'Sink, mirror and fixtures polished', deep: false },
      { text: 'Floor washed by hand', deep: false },
      { text: 'Towels folded, trash emptied', deep: false },
      { text: 'Grout brushed and rinsed', deep: true },
      { text: 'Exhaust fan cover dusted', deep: true },
    ],
  },
  {
    room: 'Bedrooms',
    items: [
      { text: 'Beds made, fresh linens if left out', deep: false },
      { text: 'Every surface dusted, lamps too', deep: false },
      { text: 'Mirrors and glass', deep: false },
      { text: 'Floors vacuumed, under the bed', deep: false },
      { text: 'Baseboards and door frames wiped', deep: true },
      { text: 'Inside closets and drawers, on a move-out', deep: true },
    ],
  },
  {
    room: 'Living and hallways',
    items: [
      { text: 'Shelves and surfaces dusted', deep: false },
      { text: 'Sofa vacuumed, cushions set straight', deep: false },
      { text: 'Switches and door handles disinfected', deep: false },
      { text: 'Floors vacuumed and mopped', deep: false },
      { text: 'Blinds and window sills', deep: true },
      { text: 'Vents and ceiling fans', deep: true },
    ],
  },
];

const STEPS = [
  {
    no: '1',
    title: 'Pick the size and the clean',
    body: 'The price on this page is the price on the day. Nothing is added for a messy week.',
  },
  {
    no: '2',
    title: 'Choose an arrival window',
    body: 'Two-hour windows from 8:00 and from 12:30, Monday to Saturday. Most weeks have a slot within three days.',
  },
  {
    no: '3',
    title: 'Meet your cleaners',
    body: 'The evening before, a text with their names and a photo. Regular clients get the same two people each time.',
  },
  {
    no: '4',
    title: 'Pay after you look around',
    body: 'We charge the card on file once the clean is done, and not before you have had the evening to check it.',
  },
];

const PROMISES = [
  {
    title: 'Employed, not gig work',
    body: 'Every cleaner is on staff, paid $24-29 an hour with sick pay and health cover. People stay, which is why your cleaners know your home.',
  },
  {
    title: 'Vetted before a first visit',
    body: 'A background check, two references called, and three weeks cleaning alongside a team lead before anyone works in your home.',
  },
  {
    title: 'Insured and bonded',
    body: '$2 million liability cover and a fidelity bond. If something is broken, we pay to repair or replace it, and we tell you the same day.',
  },
];

const TEAM = [
  ['Marisol Ortega', 'Team lead', 'Since 2017', 'English, Spanish'],
  ['Dev Anand', 'Team lead', 'Since 2019', 'English, Hindi'],
  ['Joon Park', 'Cleaner', 'Since 2021', 'English, Korean'],
  ['Ruth Adeyemi', 'Cleaner', 'Since 2022', 'English, Yoruba'],
];

const AREAS = [
  'Old Town',
  'Harbor Point',
  'Ridgeview',
  'Millrace',
  'Cedar Park',
  'North Lakemont',
  'Eastfield',
  'Brookside',
  'Tamarack Hill',
  'The Flats',
];

const FAQ = [
  {
    q: 'Do I need to be home?',
    a: 'No. Most clients leave a key in a lockbox or give us a door code, which is stored encrypted and only shown to your cleaners on the day.',
  },
  {
    q: 'Do you bring supplies?',
    a: 'Yes: vacuum, mop, cloths and plant-based cleaners, all included. If you would rather we used your own products, leave them out and say so in the notes.',
  },
  {
    q: 'What about pets?',
    a: 'We love them and we clean around them. Tell us about anyone who is nervous of visitors and we will work room by room with the door shut.',
  },
  {
    q: 'Can I skip or move a clean?',
    a: 'Up to 24 hours before, free, by text or from the link in your confirmation. Inside 24 hours there is a $40 fee, because your cleaners have kept the time for you.',
  },
  {
    q: 'Should I tip?',
    a: 'It is never expected, since our cleaners are paid properly. If you want to, you can add a tip after the clean and all of it goes to them.',
  },
];

export default function SprucePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400..700;1,400&family=Outfit:wght@300..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Spruce</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBook} href="#book">Book a clean</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The quote is radio buttons and one price row per size; :has()
            shows the row for the size that is checked, with no script. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p className={s.kicker}>Home cleaning in Lakemont</p>
            <h1 id="hero-h" className={s.heroTitle}>
              A clean home, priced by its size, <em>never by the hour.</em>
            </h1>
            <p className={s.heroLede}>
              Two cleaners, every supply, and a checklist you can read before
              you book. Pick your home below for the price.
            </p>
            <form className={s.quote} action="#book">
              <fieldset className={s.quoteSizes}>
                <legend className={s.quoteLegend}>Your home</legend>
                {SIZES.map((z) => (
                  <label key={z.id} className={s.chip}>
                    <input type="radio" name="size" value={z.id} defaultChecked={z.id === 'two'} />
                    <span>{z.short}</span>
                  </label>
                ))}
              </fieldset>
              {SIZES.map((z) => (
                <dl key={z.id} className={`${s.quoteRow} ${s[z.cls]}`}>
                  <div className={s.quoteMain}>
                    <dt>Regular clean from</dt>
                    <dd>{z.regular}</dd>
                  </div>
                  <div>
                    <dt>Deep clean</dt>
                    <dd>{z.deep}</dd>
                  </div>
                  <div>
                    <dt>Move-out</dt>
                    <dd>{z.moveOut}</dd>
                  </div>
                </dl>
              ))}
              <div className={s.quoteFoot}>
                <a className={s.btn} href="#book">Book this clean</a>
                <a className={s.textLink} href="#prices">See every price</a>
              </div>
            </form>
          </div>
          <div className={s.heroTiles} aria-hidden="true">
            <TabbiedPattern
              pattern={crosslattice}
              palette={TILES}
              fit="grid"
              cellSize={80}
              seed="spruce-tiles"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p className={s.kicker}>Prices</p>
            <h2 id="prices-h">One price for your home, set before we arrive</h2>
            <p className={s.secNote}>
              Prices include two cleaners, supplies, and one bathroom per
              bedroom. A regular clean keeps a home that is already in shape;
              book a deep clean first if it has been a while.
            </p>
          </div>
          <table className={s.priceTable}>
            <caption className={s.visuallyHidden}>Prices by home size and type of clean</caption>
            <thead>
              <tr>
                <th scope="col">Home size</th>
                <th scope="col" className={s.colRegular}>
                  <span className={s.colName}>Regular</span>
                  <span className={s.colTag}>Most booked</span>
                </th>
                <th scope="col">
                  <span className={s.colName}>Deep</span>
                </th>
                <th scope="col">
                  <span className={s.colName}>Move-out</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((z) => (
                <tr key={z.id}>
                  <th scope="row" className={s.sizeCell}>
                    <span className={s.sizeName}>{z.name}</span>
                    <span className={s.sizeTime}>{z.time}</span>
                  </th>
                  <td className={s.colRegular} data-label="Regular">{z.regular}</td>
                  <td data-label="Deep">{z.deep}</td>
                  <td data-label="Move-out">{z.moveOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={s.priceNotes}>
            <div>
              <h3 className={s.miniHead}>Regular cleans on a schedule</h3>
              <dl className={s.miniList}>
                {FREQUENCY.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className={s.miniHead}>Add to any clean</h3>
              <dl className={s.miniList}>
                {EXTRAS.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- INCLUDED
            The checklists. Every box is drawn in CSS: green for what every
            clean covers, lemon for what a deep or move-out clean adds. */}
        <section id="included" className={s.included} aria-labelledby="included-h">
          <div className={s.includedInner}>
            <div className={s.secHead}>
              <p className={s.kicker}>The checklist</p>
              <h2 id="included-h">What we clean, room by room</h2>
              <p className={s.secNote}>
                Your cleaners work from this list and tick it off on the day.
                You get the ticked copy by text when they leave.
              </p>
            </div>
            <ul className={s.legend}>
              <li className={s.legendAll}>Every clean</li>
              <li className={s.legendDeep}>Deep and move-out cleans</li>
            </ul>
            <div className={s.rooms}>
              {ROOMS.map((r) => (
                <div key={r.room} className={s.room}>
                  <h3 className={s.roomName}>{r.room}</h3>
                  <ul className={s.checklist}>
                    {r.items.map((it) => (
                      <li key={it.text} className={it.deep ? s.checkDeep : s.checkAll}>{it.text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={s.sec} aria-labelledby="how-h">
          <div className={s.secHead}>
            <p className={s.kicker}>How it works</p>
            <h2 id="how-h">Booked in two minutes, cleaned in an afternoon</h2>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st) => (
              <li key={st.no}>
                <span className={s.stepNo}>{st.no}</span>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- CLEANERS */}
        <section id="cleaners" className={s.sec} aria-labelledby="cleaners-h">
          <div className={s.secHead}>
            <p className={s.kicker}>Our cleaners</p>
            <h2 id="cleaners-h">Twenty-two people, all of them on staff</h2>
          </div>
          <div className={s.cleaners}>
            <ul className={s.promises}>
              {PROMISES.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ul>
            <div className={s.team}>
              <h3 className={s.miniHead}>Some of the team</h3>
              <ul className={s.teamList}>
                {TEAM.map(([name, role, since, langs]) => (
                  <li key={name}>
                    <span className={s.teamName}>{name}</span>
                    <span className={s.teamRole}>{role}</span>
                    <span className={s.teamMeta}>{since}</span>
                    <span className={s.teamMeta}>{langs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- GUARANTEE
            The one dark band: the promise on the left, the sparkle field on
            the right, never behind the words. */}
        <section className={s.guarantee} aria-labelledby="guarantee-h">
          <div className={s.guaranteeCopy}>
            <p className={s.guaranteeKicker}>The Spruce guarantee</p>
            <h2 id="guarantee-h">Missed a spot? We come back within 48 hours.</h2>
            <p>
              If anything on the checklist was not done, tell us within two
              days and your cleaners return to do it again, free. If it is
              still not right after that, the clean is on us.
            </p>
            <p className={s.guaranteeSmall}>
              Cancel or move a clean free up to 24 hours before. Inside 24
              hours the fee is $40.
            </p>
          </div>
          <div className={s.sparkField} aria-hidden="true">
            <TabbiedPattern
              pattern={sparkle}
              palette={SPARKS}
              options={{ frequency: 0.35 }}
              fit="grid"
              cellSize={60}
              seed="spruce-sparkle"
              redrawInterval={7000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ----------------------------------------------------------- AREAS */}
        <section id="areas" className={s.sec} aria-labelledby="areas-h">
          <div className={s.areas}>
            <div className={s.secHead}>
              <p className={s.kicker}>Areas</p>
              <h2 id="areas-h">Where we clean</h2>
              <p className={s.secNote}>
                Everywhere within twelve miles of our base on Tamarack Street.
                Beyond that, up to twenty miles, a $20 travel fee is added to
                each visit.
              </p>
            </div>
            <ul className={s.areaList}>
              {AREAS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqWrap}>
            <div className={s.secHead}>
              <p className={s.kicker}>Questions</p>
              <h2 id="faq-h">Before you book</h2>
            </div>
            <div className={s.faq}>
              {FAQ.map((f) => (
                <details key={f.q} className={s.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInner}>
            <div className={s.bookIntro}>
              <p className={s.kicker}>Book</p>
              <h2 id="book-h">Request a clean</h2>
              <p className={s.secNote}>
                We reply within two working hours to confirm the window and
                the price. Nothing is charged until after the clean.
              </p>
              <dl className={s.bookContact}>
                <div>
                  <dt>Call or text</dt>
                  <dd>(555) 018-4420</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:hello@sprucecleaning.example">hello@sprucecleaning.example</a>
                  </dd>
                </div>
                <div>
                  <dt>Office</dt>
                  <dd>Monday to Saturday, 7:30-6:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.bookForm} action="#">
              <label className={s.field}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span>Phone</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={s.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
              <label className={s.field}>
                <span>ZIP code</span>
                <input type="text" name="zip" inputMode="numeric" autoComplete="postal-code" />
              </label>
              <label className={s.field}>
                <span>Home size</span>
                <select name="home" defaultValue="two">
                  {SIZES.map((z) => (
                    <option key={z.id} value={z.id}>{z.name}</option>
                  ))}
                </select>
              </label>
              <label className={s.field}>
                <span>Type of clean</span>
                <select name="type" defaultValue="regular">
                  <option value="regular">Regular</option>
                  <option value="deep">Deep</option>
                  <option value="moveout">Move-out</option>
                </select>
              </label>
              <label className={s.field}>
                <span>How often</span>
                <select name="often" defaultValue="once">
                  <option value="once">Just once</option>
                  <option value="weekly">Every week</option>
                  <option value="biweekly">Every two weeks</option>
                  <option value="monthly">Every four weeks</option>
                </select>
              </label>
              <label className={s.field}>
                <span>First date</span>
                <input type="date" name="date" />
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span>Anything we should know: access, pets, rooms to skip</span>
                <textarea name="notes" rows={3} />
              </label>
              <button className={s.btn} type="submit">Request this clean</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <p className={s.footName}>Spruce</p>
          <p className={s.footAddr}>18 Tamarack Street, Lakemont</p>
          <p className={s.footAddr}>(555) 018-4420</p>
          <ul className={s.footLinks}>
            <li><a href="#prices">Prices</a></li>
            <li><a href="#included">Checklist</a></li>
            <li><a href="#book">Book</a></li>
          </ul>
        </div>
        <div className={s.footFine}>
          <p>A fictional cleaning service. Prices, people and places are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
