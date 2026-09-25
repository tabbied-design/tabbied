import { TabbiedPattern } from 'tabbied/react';
import { midnightblossoms, stitch } from 'tabbied/patterns';
import s from './osteria-lume.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Osteria Lume: Neighborhood Italian restaurant, Vine Street',
  description:
    'Osteria Lume is a small Italian restaurant on the corner of Vine and Fifth: pasta made each morning, a wood grill and a short list of Italian wine. Dinner Tuesday to Sunday, lunch at the weekend.',
};

/* Site colors. The tablecloth paints the pale linen as its own cloth; the
   stitched fold takes `transparent`, so it sits in the card's paper. */
const LINEN = '#F7F2E9';
const INK = '#1E1B18';
const TOMATO = '#C8402B';
const GRAY = '#8A8275';
const PALE = '#E7DFD1';
const OLIVE = '#6B7A3A';

const CLOTH = ['transparent', PALE, TOMATO, OLIVE, GRAY, LINEN];
const SEAM = ['transparent', TOMATO, OLIVE];

const NAV = [
  ['Menu', '#menu'],
  ['Specials', '#specials'],
  ['Reservations', '#reservations'],
  ['Private dining', '#private'],
  ['The room', '#room'],
  ['Find us', '#visit'],
];

const MAST_HOURS = [
  ['Dinner', 'Tuesday to Sunday, 5:30-10:30'],
  ['Lunch', 'Saturday and Sunday, 12-3'],
  ['Closed', 'Monday'],
];

type Dish = {
  name: string;
  desc: string;
  price: string;
  veg?: boolean;
};

type Course = {
  id: string;
  name: string;
  note: string;
  dishes: Dish[];
};

const COURSES: Course[] = [
  {
    id: 'antipasti',
    name: 'Antipasti',
    note: 'To start, or to share across the table',
    dishes: [
      { name: 'Burrata', desc: 'roasted grapes, toasted hazelnuts, a little saba', price: '16', veg: true },
      { name: 'Vitello tonnato', desc: 'cold sliced veal, tuna mayonnaise, salted capers', price: '17' },
      { name: 'Carciofi fritti', desc: 'fried baby artichokes, lemon, garlic aioli', price: '14', veg: true },
      { name: 'Crudo di ricciola', desc: 'amberjack, blood orange, fennel pollen, olive oil', price: '19' },
      { name: 'Panzanella d\'autunno', desc: 'roast squash, torn bread, red onion, crisp sage', price: '13', veg: true },
      { name: 'Salumi e formaggi', desc: 'for two: three cured meats, two cheeses, mostarda', price: '24' },
    ],
  },
  {
    id: 'primi',
    name: 'Primi',
    note: 'Pasta rolled each morning in the front window',
    dishes: [
      { name: 'Tagliatelle al ragu', desc: 'beef and pork ragu cooked for six hours, Parmigiano', price: '24' },
      { name: 'Cacio e pepe', desc: 'tonnarelli, pecorino romano, a great deal of pepper', price: '21', veg: true },
      { name: 'Agnolotti del plin', desc: 'pinched parcels of roast meats, butter, sage', price: '26' },
      { name: 'Pappardelle ai funghi', desc: 'wild mushrooms, thyme, a spoon of cream', price: '25', veg: true },
      { name: 'Risotto al limone', desc: 'Carnaroli rice, Amalfi lemon, mascarpone', price: '23', veg: true },
      { name: 'Spaghetti alle vongole', desc: 'clams, garlic, chili, parsley, white wine', price: '27' },
    ],
  },
  {
    id: 'secondi',
    name: 'Secondi',
    note: 'From the wood grill and the slow oven',
    dishes: [
      { name: 'Pollo al mattone', desc: 'half a chicken cooked under a brick, salsa verde', price: '29' },
      { name: 'Branzino', desc: 'whole sea bass from the grill, lemon, good oil', price: '34' },
      { name: 'Brasato al Barolo', desc: 'beef cheek braised eight hours, soft polenta', price: '36' },
      { name: 'Melanzane alla parmigiana', desc: 'eggplant, tomato, basil, mozzarella, baked to order', price: '24', veg: true },
      { name: 'Bistecca per due', desc: 'dry-aged porterhouse, about a kilo, rosemary potatoes', price: '88' },
      { name: 'Contorni', desc: 'bitter greens, roast potatoes or white beans in oil', price: '8', veg: true },
    ],
  },
  {
    id: 'dolci',
    name: 'Dolci',
    note: 'Made in the afternoon, finished when they run out',
    dishes: [
      { name: 'Tiramisu', desc: 'savoiardi, espresso, mascarpone, bitter cocoa', price: '11', veg: true },
      { name: 'Panna cotta', desc: 'buttermilk, quince poached in white wine', price: '10', veg: true },
      { name: 'Torta della nonna', desc: 'custard tart with pine nuts and lemon zest', price: '11', veg: true },
      { name: 'Affogato', desc: 'vanilla gelato drowned in a double espresso', price: '8', veg: true },
      { name: 'Cantucci e vin santo', desc: 'almond biscuits and a glass to dip them in', price: '12', veg: true },
      { name: 'Formaggi', desc: 'three Italian cheeses, honey, walnut bread', price: '15', veg: true },
    ],
  },
];

const WINES = [
  { name: 'Prosecco Superiore', desc: 'Valdobbiadene, Veneto, dry and bright', price: '12 / 48' },
  { name: 'Vermentino 2024', desc: 'Riviera Ligure, salty, with the fish', price: '13 / 52' },
  { name: 'Soave Classico 2023', desc: 'Veneto, almond and pear', price: '12 / 46' },
  { name: 'Rosato 2024', desc: 'Salento, Negroamaro, cold', price: '12 / 46' },
  { name: 'Chianti Classico 2022', desc: 'Tuscany, cherry and dried herbs', price: '14 / 56' },
  { name: 'Barbera d\'Alba 2022', desc: 'Piedmont, the house red', price: '13 / 52' },
  { name: 'Nero d\'Avola 2023', desc: 'Sicily, dark fruit, soft', price: '12 / 44' },
  { name: 'Barolo 2019', desc: 'Piedmont, for the bistecca', price: 'bottle 110' },
];

const SPECIALS = [
  { name: 'Risotto ai porcini', desc: 'the first porcini of the year, from a forager we trust', price: '28' },
  { name: 'Orata alla griglia', desc: 'whole gilthead bream, grilled, six on the boat today', price: '38' },
  { name: 'Ravioli di zucca', desc: 'squash, amaretti, brown butter, a little mostarda', price: '25' },
  { name: 'Zabaglione', desc: 'whisked to order with Marsala, figs from the tree out back', price: '12' },
];

const TIMES = ['5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30'];
const GUESTS = ['1', '2', '3', '4', '5', '6'];

const BOOKING_NOTES = [
  ['Walk-ins', 'Half the room and the whole counter are kept for people who just turn up. Come early or late and you will almost always eat.'],
  ['Booking', 'Tables for one to six, up to thirty days ahead. We confirm by text within the day, and hold a table for fifteen minutes.'],
  ['Larger groups', 'Seven or more sit in the saletta at the back, on a set menu. See private dining below.'],
  ['Allergies', 'Tell us when you book and again at the table. Most pasta can be made without egg; none of it without wheat.'],
];

const PRIVATE = [
  ['Seats', '8 to 18 at one long table'],
  ['Menu', 'Four courses at $65 a head, or $85 with wine'],
  ['Evenings', 'Tuesday to Thursday, and Sunday lunch'],
  ['Deposit', '$200, returned in full up to a week ahead'],
];

const ROOM = [
  ['42 seats', 'and eight stools at the counter, facing the pasta board and the grill'],
  ['Step-free', 'through the Fifth Street door, with an accessible restroom on the same floor'],
  ['Children', 'welcome, with high chairs and a small plate of buttered pasta for $9'],
  ['The terrace', 'eighteen seats under the vine from May to September; dogs are welcome out there'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Friday', '5:30-10:30 pm'],
  ['Saturday', '12-3 and 5:30-11 pm'],
  ['Sunday', '12-3 and 5:30-9:30 pm'],
];

export default function OsteriaLumePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Osteria Lume</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="tel:+15550142290">(555) 014-2290</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.main}>
        {/* The tablecloth: the card is laid on it, so it shows above the card
            and to either side of it on a wide screen. */}
        <div className={s.cloth} aria-hidden="true">
          <div className={s.clothField}>
            <TabbiedPattern
              pattern={midnightblossoms}
              palette={CLOTH}
              options={{ frequency: 0.5 }}
              fit="grid"
              cellSize={120}
              seed="lume-cloth"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        <div className={s.card}>
          {/* -------------------------------------------------------- MASTHEAD */}
          <section className={s.mast} aria-labelledby="name-h">
            <p className={s.kicker}>Cucina di quartiere, since 2014</p>
            <h1 id="name-h" className={s.name}>
              Osteria <em>Lume</em>
            </h1>
            <p className={s.mastLine}>
              Pasta made each morning, a wood grill, and a short list of
              Italian wine, on the corner of Vine and Fifth.
            </p>
            <dl className={s.mastHours}>
              {MAST_HOURS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ------------------------------------------------------------ MENU */}
          <section id="menu" className={s.menu} aria-labelledby="menu-h">
            <div className={s.secHead}>
              <h2 id="menu-h">La carta</h2>
              <p className={s.secNote}>
                The autumn menu, week 39. It changes a little every Tuesday,
                when the market does.
              </p>
            </div>

            {COURSES.map((course) => (
              <div key={course.id} className={s.course}>
                <h3 className={s.courseName}>{course.name}</h3>
                <p className={s.courseNote}>{course.note}</p>
                <ul className={s.dishes}>
                  {course.dishes.map((d) => (
                    <li key={d.name}>
                      <div className={s.dishLine}>
                        <span className={s.dishName}>{d.name}</span>
                        {d.veg ? <span className={s.veg}>v</span> : null}
                        <span className={s.leader} aria-hidden="true" />
                        <span className={s.price}>{d.price}</span>
                      </div>
                      <p className={s.dishDesc}>{d.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={s.course}>
              <h3 className={s.courseName}>Vini</h3>
              <p className={s.courseNote}>By the glass and by the bottle</p>
              <ul className={s.dishes}>
                {WINES.map((w) => (
                  <li key={w.name}>
                    <div className={s.dishLine}>
                      <span className={s.dishName}>{w.name}</span>
                      <span className={s.leader} aria-hidden="true" />
                      <span className={s.price}>{w.price}</span>
                    </div>
                    <p className={s.dishDesc}>{w.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <p className={s.menuFine}>
              v: vegetarian. Prices in dollars; nothing is added to the bill
              for service, and our cooks and servers are paid a full wage.
            </p>
          </section>

          {/* -------------------------------------------------------- SPECIALS */}
          <section id="specials" className={s.specials} aria-labelledby="specials-h">
            <p className={s.specialsKicker}>Written up at five o'clock</p>
            <h2 id="specials-h" className={s.specialsTitle}>Tonight's specials</h2>
            <ul className={s.specialList}>
              {SPECIALS.map((d) => (
                <li key={d.name}>
                  <div className={s.dishLine}>
                    <span className={s.dishName}>{d.name}</span>
                    <span className={s.leader} aria-hidden="true" />
                    <span className={s.price}>{d.price}</span>
                  </div>
                  <p className={s.dishDesc}>{d.desc}</p>
                </li>
              ))}
            </ul>
            <p className={s.specialsNote}>
              When they are gone, they are gone. Ask your server what is left.
            </p>
          </section>

          {/* The fold in the card: a cross-stitched hem, like the edge of a cloth. */}
          <div className={s.seam} aria-hidden="true">
            <TabbiedPattern
              pattern={stitch}
              palette={SEAM}
              options={{ frequency: 0.55 }}
              fit="grid"
              cellSize={26}
              seed="lume-seam"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          {/* ---------------------------------------------------- RESERVATIONS */}
          <section id="reservations" className={s.block} aria-labelledby="reservations-h">
            <div className={s.secHead}>
              <h2 id="reservations-h">Reservations</h2>
              <p className={s.secNote}>
                Book online below, or call us after two in the afternoon.
              </p>
            </div>
            <div className={s.booking}>
              <dl className={s.notes}>
                {BOOKING_NOTES.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label htmlFor="lume-name">Name</label>
                  <input id="lume-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="lume-phone">Mobile number</label>
                  <input id="lume-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <label htmlFor="lume-date">Date</label>
                    <input id="lume-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="lume-time">Time</label>
                    <select id="lume-time" name="time" defaultValue="7:00">
                      {TIMES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="lume-guests">Guests</label>
                    <select id="lume-guests" name="guests" defaultValue="2">
                      {GUESTS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={s.field}>
                  <label htmlFor="lume-notes">Anything we should know</label>
                  <textarea id="lume-notes" name="notes" rows={3} />
                </div>
                <button className={s.submit} type="submit">Request a table</button>
              </form>
            </div>
          </section>

          {/* --------------------------------------------------------- PRIVATE */}
          <section id="private" className={s.block} aria-labelledby="private-h">
            <div className={s.secHead}>
              <h2 id="private-h">Private dining</h2>
              <p className={s.secNote}>
                The saletta is the old wine store at the back: one long table,
                its own door to the terrace, and a server of your own.
              </p>
            </div>
            <dl className={s.facts}>
              {PRIVATE.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={s.blockNote}>
              <span>Write to </span>
              <a href="mailto:saletta@osterialume.example">saletta@osterialume.example</a>
              <span> with a date and a number, and we will send the menus.</span>
            </p>
          </section>

          {/* ------------------------------------------------------------ ROOM */}
          <section id="room" className={s.block} aria-labelledby="room-h">
            <div className={s.secHead}>
              <h2 id="room-h">The room</h2>
              <p className={s.secNote}>
                A former hardware store with its tin ceiling still up, warm
                light, and tables far enough apart to talk.
              </p>
            </div>
            <dl className={s.roomList}>
              {ROOM.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ----------------------------------------------------------- VISIT */}
          <section id="visit" className={s.block} aria-labelledby="visit-h">
            <div className={s.secHead}>
              <h2 id="visit-h">Find us</h2>
              <p className={s.secNote}>
                On the corner of Vine Street and Fifth, opposite the library.
              </p>
            </div>
            <div className={s.visit}>
              <div>
                <h3 className={s.label}>Address</h3>
                <p className={s.address}>
                  Osteria Lume
                  <br />
                  214 Vine Street
                  <br />
                  at Fifth Avenue
                </p>
                <p className={s.address}>
                  <a href="tel:+15550142290">(555) 014-2290</a>
                </p>
                <p className={s.address}>
                  <a href="mailto:tavola@osterialume.example">tavola@osterialume.example</a>
                </p>
              </div>
              <div>
                <h3 className={s.label}>Hours</h3>
                <dl className={s.hours}>
                  {HOURS.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className={s.label}>Getting here</h3>
                <p className={s.getting}>
                  The 12 and 40 buses stop outside. Street parking is free after
                  six, and there is a bike rack by the terrace gate.
                </p>
              </div>
            </div>
          </section>

          <p className={s.cardFoot}>Grazie, e buon appetito.</p>
        </div>
      </main>

      <footer className={s.footer}>
        <p>A fictional neighborhood restaurant. Dishes, prices, people and hours are invented.</p>
        <p>
          Patterns by{' '}
          <a href="https://tabbied.com" rel="noopener">
            Tabbied
          </a>
          , drawn live on a transparent ground.
        </p>
      </footer>
    </div>
  );
}
