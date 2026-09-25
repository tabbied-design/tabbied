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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--linen': '#f7f2e9',
        '--ink': '#1e1b18',
        '--tomato': '#c8402b',
        '--gray': '#8a8275',
        '--pale': '#e7dfd1',
        '--olive': '#6b7a3a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="linen,ink,tomato,gray,pale,olive"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Osteria Lume</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550142290">(555) 014-2290</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.main}>
        {/* The tablecloth: the card is laid on it, so it shows above the card
            and to either side of it on a wide screen. */}
        <div className={s.cloth} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,5,3,0" className={s.clothField}>
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
            <p data-edit="name.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Cucina di quartiere, since 2014</p>
            <h1 data-edit="name.title" data-edit-format="emphasis" data-edit-max="70" id="name-h" className={s.name}>
              Osteria <em>Lume</em>
            </h1>
            <p data-edit="name.mastLine" data-edit-max="240" data-edit-multiline className={s.mastLine}>
              Pasta made each morning, a wood grill, and a short list of
              Italian wine, on the corner of Vine and Fifth.
            </p>
            <dl className={s.mastHours}>
              {MAST_HOURS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`name.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`name.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ------------------------------------------------------------ MENU */}
          <section id="menu" className={s.menu} aria-labelledby="menu-h">
            <div className={s.secHead}>
              <h2 data-edit="menu.title" data-edit-max="60" id="menu-h">La carta</h2>
              <p data-edit="menu.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The autumn menu, week 39. It changes a little every Tuesday,
                when the market does.
              </p>
            </div>

            {COURSES.map((course, i) => (
              <div key={course.id} className={s.course}>
                <h3 data-edit={`menu.courseName.${i}`} data-edit-max="40" className={s.courseName}>{course.name}</h3>
                <p data-edit={`menu.courseNote.${i}`} data-edit-max="240" data-edit-multiline className={s.courseNote}>{course.note}</p>
                <ul className={s.dishes}>
                  {course.dishes.map((d, i2) => (
                    <li key={d.name}>
                      <div className={s.dishLine}>
                        <span data-edit={`menu.dishName.${i}.${i2}`} data-edit-max="60" className={s.dishName}>{d.name}</span>
                        {d.veg ? <span data-edit={`menu.veg.${i}.${i2}`} data-edit-max="60" className={s.veg}>v</span> : null}
                        <span className={s.leader} aria-hidden="true" />
                        <span data-edit={`menu.price.${i}.${i2}`} data-edit-max="60" className={s.price}>{d.price}</span>
                      </div>
                      <p data-edit={`menu.dishDesc.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.dishDesc}>{d.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={s.course}>
              <h3 data-edit="menu.courseName2" data-edit-max="40" className={s.courseName}>Vini</h3>
              <p data-edit="menu.courseNote2" data-edit-max="240" data-edit-multiline className={s.courseNote}>By the glass and by the bottle</p>
              <ul className={s.dishes}>
                {WINES.map((w, i) => (
                  <li key={w.name}>
                    <div className={s.dishLine}>
                      <span data-edit={`menu.dishName2.${i}`} data-edit-max="60" className={s.dishName}>{w.name}</span>
                      <span className={s.leader} aria-hidden="true" />
                      <span data-edit={`menu.price2.${i}`} data-edit-max="60" className={s.price}>{w.price}</span>
                    </div>
                    <p data-edit={`menu.dishDesc2.${i}`} data-edit-max="240" data-edit-multiline className={s.dishDesc}>{w.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <p data-edit="menu.menuFine" data-edit-max="240" data-edit-multiline className={s.menuFine}>
              v: vegetarian. Prices in dollars; nothing is added to the bill
              for service, and our cooks and servers are paid a full wage.
            </p>
          </section>

          {/* -------------------------------------------------------- SPECIALS */}
          <section id="specials" className={s.specials} aria-labelledby="specials-h">
            <p data-edit="specials.specialsKicker" data-edit-max="240" data-edit-multiline className={s.specialsKicker}>Written up at five o'clock</p>
            <h2 data-edit="specials.specialsTitle" data-edit-max="60" id="specials-h" className={s.specialsTitle}>Tonight's specials</h2>
            <ul className={s.specialList}>
              {SPECIALS.map((d, i) => (
                <li key={d.name}>
                  <div className={s.dishLine}>
                    <span data-edit={`specials.dishName.${i}`} data-edit-max="60" className={s.dishName}>{d.name}</span>
                    <span className={s.leader} aria-hidden="true" />
                    <span data-edit={`specials.price.${i}`} data-edit-max="60" className={s.price}>{d.price}</span>
                  </div>
                  <p data-edit={`specials.dishDesc.${i}`} data-edit-max="240" data-edit-multiline className={s.dishDesc}>{d.desc}</p>
                </li>
              ))}
            </ul>
            <p data-edit="specials.specialsNote" data-edit-max="240" data-edit-multiline className={s.specialsNote}>
              When they are gone, they are gone. Ask your server what is left.
            </p>
          </section>

          {/* The fold in the card: a cross-stitched hem, like the edge of a cloth. */}
          <div data-edit-pattern="top.field2" data-edit-roles="transparent,2,5" className={s.seam} aria-hidden="true">
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
              <h2 data-edit="reservations.title" data-edit-max="60" id="reservations-h">Reservations</h2>
              <p data-edit="reservations.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Book online below, or call us after two in the afternoon.
              </p>
            </div>
            <div className={s.booking}>
              <dl className={s.notes}>
                {BOOKING_NOTES.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`reservations.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`reservations.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label data-edit="reservations.label" htmlFor="lume-name">Name</label>
                  <input id="lume-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="reservations.label2" htmlFor="lume-phone">Mobile number</label>
                  <input id="lume-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <label data-edit="reservations.label3" htmlFor="lume-date">Date</label>
                    <input id="lume-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="reservations.label4" htmlFor="lume-time">Time</label>
                    <select id="lume-time" name="time" defaultValue="7:00">
                      {TIMES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="reservations.label5" htmlFor="lume-guests">Guests</label>
                    <select id="lume-guests" name="guests" defaultValue="2">
                      {GUESTS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={s.field}>
                  <label data-edit="reservations.label6" htmlFor="lume-notes">Anything we should know</label>
                  <textarea id="lume-notes" name="notes" rows={3} />
                </div>
                <button data-edit="reservations.submit" data-edit-max="24" className={s.submit} type="submit">Request a table</button>
              </form>
            </div>
          </section>

          {/* --------------------------------------------------------- PRIVATE */}
          <section id="private" className={s.block} aria-labelledby="private-h">
            <div className={s.secHead}>
              <h2 data-edit="private.title" data-edit-max="60" id="private-h">Private dining</h2>
              <p data-edit="private.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The saletta is the old wine store at the back: one long table,
                its own door to the terrace, and a server of your own.
              </p>
            </div>
            <dl className={s.facts}>
              {PRIVATE.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`private.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`private.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={s.blockNote}>
              <span data-edit="private.text" data-edit-max="60">Write to </span>
              <a data-edit="private.link" data-edit-max="28" href="mailto:saletta@osterialume.example">saletta@osterialume.example</a>
              <span data-edit="private.text2" data-edit-max="60"> with a date and a number, and we will send the menus.</span>
            </p>
          </section>

          {/* ------------------------------------------------------------ ROOM */}
          <section id="room" className={s.block} aria-labelledby="room-h">
            <div className={s.secHead}>
              <h2 data-edit="room.title" data-edit-max="60" id="room-h">The room</h2>
              <p data-edit="room.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A former hardware store with its tin ceiling still up, warm
                light, and tables far enough apart to talk.
              </p>
            </div>
            <dl className={s.roomList}>
              {ROOM.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`room.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`room.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ----------------------------------------------------------- VISIT */}
          <section id="visit" className={s.block} aria-labelledby="visit-h">
            <div className={s.secHead}>
              <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Find us</h2>
              <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                On the corner of Vine Street and Fifth, opposite the library.
              </p>
            </div>
            <div className={s.visit}>
              <div>
                <h3 data-edit="visit.label" data-edit-max="40" className={s.label}>Address</h3>
                <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.address}>
                  Osteria Lume
                  <br />
                  214 Vine Street
                  <br />
                  at Fifth Avenue
                </p>
                <p className={s.address}>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550142290">(555) 014-2290</a>
                </p>
                <p className={s.address}>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:tavola@osterialume.example">tavola@osterialume.example</a>
                </p>
              </div>
              <div>
                <h3 data-edit="visit.label2" data-edit-max="40" className={s.label}>Hours</h3>
                <dl className={s.hours}>
                  {HOURS.map(([d, h], i) => (
                    <div key={d}>
                      <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                      <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 data-edit="visit.label3" data-edit-max="40" className={s.label}>Getting here</h3>
                <p data-edit="visit.getting" data-edit-max="240" data-edit-multiline className={s.getting}>
                  The 12 and 40 buses stop outside. Street parking is free after
                  six, and there is a bike rack by the terrace gate.
                </p>
              </div>
            </div>
          </section>

          <p data-edit="top.cardFoot" data-edit-max="240" data-edit-multiline className={s.cardFoot}>Grazie, e buon appetito.</p>
        </div>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional neighborhood restaurant. Dishes, prices, people and hours are invented.</p>
        <p>
          Patterns by{' '}
          <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">
            Tabbied
          </a>
          , drawn live on a transparent ground.
        </p>
      </footer>
    </div>
  );
}
