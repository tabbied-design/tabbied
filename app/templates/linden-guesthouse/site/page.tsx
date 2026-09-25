import { TabbiedPattern } from 'tabbied/react';
import { diamondember, frond } from 'tabbied/patterns';
import s from './linden-guesthouse.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Figure } from 'components/Figure';

export const metadata = {
  title: 'The Linden Guesthouse: Bed and breakfast, Ashby Green',
  description:
    'Five rooms in a brick house on Mill Lane, under a linden tree older than the house. Breakfast is cooked to order, the river path starts at the end of the lane, and rates start at $125 a night.',
};

/* Site colors. Every field takes `transparent` in the background slot, so
   the room swatches and the leaves sit on the page's own paper. */
const INK = '#25271F';
const TERRA = '#A45A3C';
const LINDEN = '#6F7D5C';
const PAPER = '#F5F2EA';
const PALE = '#E7E1D3';

/* The two wings of the house wear two colorings of the same wallpaper. */
const HOUSE = ['transparent', INK, PALE, PAPER, TERRA, PALE];
const YARD = ['transparent', INK, PALE, PAPER, LINDEN, PALE];
const LEAVES = ['transparent', LINDEN, PALE, TERRA];

const NAV = [
  ['Rooms', '#rooms'],
  ['Breakfast', '#breakfast'],
  ['House rules', '#rules'],
  ['Local guide', '#guide'],
  ['Getting here', '#getting-here'],
  ['Book', '#book'],
];

const GLANCE = [
  ['Check-in', '3 pm to 8 pm'],
  ['Check-out', 'By 10:30 am'],
  ['Rooms', 'Five, all with their own bathroom'],
  ['Rates', 'From $125 a night, breakfast included'],
];

type Room = {
  no: string;
  where: string;
  name: string;
  body: string;
  features: string[];
  sleeps: string;
  bed: string;
  bath: string;
  rate: string;
  rateNote: string;
};

const HOUSE_ROOMS: Room[] = [
  {
    no: '01',
    where: 'First floor, front',
    name: 'Linden',
    body: 'The largest room in the house, with the bay window that looks straight into the tree. In June the scent of the blossom comes in with the morning. Two armchairs, a writing table and a roll-top bath.',
    features: ['Bay window', 'Roll-top bath', 'Armchairs'],
    sleeps: '2',
    bed: 'King',
    bath: 'Bath and shower',
    rate: '$175',
    rateNote: 'a night for two',
  },
  {
    no: '02',
    where: 'First floor, back',
    name: 'Rowan',
    body: 'The quietest room, at the back over the garden. The king bed unzips into two singles if you ask when you book, and the shower is the best in the house.',
    features: ['Garden view', 'King or twin', 'Walk-in shower'],
    sleeps: '2',
    bed: 'King or two singles',
    bath: 'Shower',
    rate: '$150',
    rateNote: 'a night for two',
  },
  {
    no: '03',
    where: 'Second floor',
    name: 'Hazel',
    body: 'Under the eaves: a sloping ceiling, a skylight over the bed and a small desk by the window. Mind your head on the way to the shower. The best value in the house, and the favorite of people who come back.',
    features: ['Skylight', 'Desk', 'Top of the house'],
    sleeps: '2',
    bed: 'Double',
    bath: 'Shower',
    rate: '$125',
    rateNote: 'a night for two',
  },
];

const YARD_ROOMS: Room[] = [
  {
    no: '04',
    where: 'Across the yard, upstairs',
    name: 'The Hayloft',
    body: 'The old hayloft over the stable, now a family room: a queen bed at one end, two single beds behind a half wall at the other, a small fridge and a kettle. Cots and high chairs are free.',
    features: ['Family room', 'Own entrance', 'Fridge'],
    sleeps: '4',
    bed: 'Queen and two singles',
    bath: 'Shower',
    rate: '$210',
    rateNote: 'a night for up to four',
  },
  {
    no: '05',
    where: 'Across the yard, ground floor',
    name: 'The Garden Room',
    body: 'Step-free from the parking yard to the bed, with a wide-door shower room and rails, and French doors onto the garden. The one room where dogs are welcome.',
    features: ['Step-free', 'Garden doors', 'Dogs welcome'],
    sleeps: '2',
    bed: 'Queen',
    bath: 'Step-free shower',
    rate: '$160',
    rateNote: 'a night for two',
  },
];

const COOKED = [
  {
    name: 'The Linden',
    body: 'Two eggs, bacon and a sausage from Hollin Farm, mushrooms, a grilled tomato and toast.',
  },
  {
    name: 'Eggs your way',
    body: 'Poached, fried or scrambled on sourdough, with spinach or smoked trout.',
  },
  {
    name: 'Buttermilk pancakes',
    body: 'A stack of three, with berries and maple syrup, or with bacon.',
  },
  {
    name: 'Mushrooms on toast',
    body: 'Garlic, thyme and a spoon of sour cream. Vegan with oil instead.',
  },
  {
    name: 'Porridge',
    body: 'Oats cooked slowly with milk or water, brown sugar, cream and stewed fruit.',
  },
];

const SIDEBOARD = [
  'Granola we bake on Sundays',
  'Yogurt and seasonal fruit',
  'Honey from the hives by the tree',
  'Bread from Marlow\'s bakery',
  'Apple juice from the orchard',
  'Tea in a pot, coffee in a press',
];

const BREAKFAST_TIMES = [
  ['Monday to Friday', '8:00 to 9:30'],
  ['Saturday and Sunday', '8:30 to 10:00'],
];

const RULES = [
  {
    title: 'Arriving',
    body: 'Check-in is from 3 pm to 8 pm. Arriving later is fine if you tell us: we leave a key in a lockbox and a light on.',
  },
  {
    title: 'Leaving',
    body: 'Check-out is by 10:30 am. You are welcome to leave bags in the hall and a car in the yard until 4 pm.',
  },
  {
    title: 'Quiet',
    body: 'The house is quiet after 10 pm. The walls are old but thin, and the floorboards talk.',
  },
  {
    title: 'Children',
    body: 'Welcome in every room, and the Hayloft sleeps four. Cots and high chairs are free; ask when you book.',
  },
  {
    title: 'Dogs',
    body: 'Up to two dogs in the Garden Room, for $15 a night. They can come to breakfast if they stay under the table.',
  },
  {
    title: 'Smoking',
    body: 'Not in the house, the yard or the garden. There is a bench at the end of the lane.',
  },
  {
    title: 'Weekends',
    body: 'Two nights minimum on Friday and Saturday. A single night often comes free a week before; call and ask.',
  },
  {
    title: 'Cancelling',
    body: 'Free up to seven days before you arrive. After that we keep the first night unless we can let the room again.',
  },
];

type Place = {
  kind: string;
  name: string;
  distance: string;
  body: string;
};

const GUIDE: Place[] = [
  {
    kind: 'Walk',
    name: 'The river path to Kell Weir',
    distance: '2.5 mile loop, flat',
    body: 'Starts at the gate at the end of the lane. Herons most mornings, and a bench at the weir.',
  },
  {
    kind: 'Walk',
    name: 'Beacon Hill',
    distance: '4 miles there and back',
    body: 'A steady climb of forty minutes for a view over three valleys. Boots after rain.',
  },
  {
    kind: 'Walk',
    name: 'The orchard trail',
    distance: '1.2 miles, 30 minutes',
    body: 'Through the community orchard and back by the church. Blossom in April, apples in September.',
  },
  {
    kind: 'Pub',
    name: 'The Plough',
    distance: '0.3 miles, 6 minutes on foot',
    body: 'Food until 9 pm, local ales, a fire in winter and a quiz on Tuesdays.',
  },
  {
    kind: 'Pub',
    name: 'The Wheatsheaf',
    distance: '1.1 miles, 25 minutes on foot',
    body: 'The Sunday roast people drive for. Book by Friday, and take the river path home.',
  },
  {
    kind: 'Food',
    name: 'Marlow\'s Bakery',
    distance: '200 yards',
    body: 'Where our bread comes from. Open at 7 am, and sold out of cinnamon buns by ten.',
  },
  {
    kind: 'Sight',
    name: 'Ashby Mill',
    distance: '0.5 miles, 10 minutes on foot',
    body: 'A working water mill. The wheel turns on Saturdays, when they sell the flour.',
  },
  {
    kind: 'Sight',
    name: 'St Oswin\'s Church',
    distance: '0.4 miles, 8 minutes on foot',
    body: 'Twelfth century, with wall paintings uncovered in the 1950s. Open every day until dusk.',
  },
  {
    kind: 'Sight',
    name: 'Kell Castle',
    distance: '6 miles, 15 minutes by car',
    body: 'A ruined keep on a bend of the river, free to wander. Go late in the day for the light.',
  },
];

const ROUTES = [
  {
    title: 'By train',
    body: 'Ashby Green station is on the Valley Line, a 14-minute walk away. Between 3 pm and 8 pm we will collect you: call from the platform.',
  },
  {
    title: 'By car',
    body: 'Leave Route 9 at exit 14 and follow the signs for Ashby Green. Mill Lane is the second left after the church. Four free spaces in the yard, and one car charger.',
  },
  {
    title: 'By bus',
    body: 'The 22 from Kellbridge stops outside The Plough every half hour until 7 pm. From there it is a six-minute walk up the lane.',
  },
  {
    title: 'By bike',
    body: 'A locked shed with room for four bikes, a pump, a hose and a stand. The river path is a quiet way in from Kellbridge.',
  },
];

export default function LindenGuesthousePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markThe}>The</span>
          <span className={s.markName}>Linden Guesthouse</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBook} href="#book">Check dates</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Type only. The rooms below are the picture. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Bed and breakfast, 14 Mill Lane, Ashby Green</p>
            <h1 className={s.heroTitle} id="hero-h">
              Five rooms under an old linden tree, <em>and breakfast until ten.</em>
            </h1>
            <p className={s.heroLede}>
              A brick house at the quiet end of Mill Lane, kept by Ruth and
              Tomas Pell since 2009. Three rooms in the house, two across the
              yard, a long table in the front room and the river path at the
              end of the lane.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#rooms">See the five rooms</a>
              <a className={s.btnQuiet} href="#book">Book direct</a>
            </div>
          </div>
          <dl className={s.glance}>
            {GLANCE.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- ROOMS
            Full-width rows, edge to edge: a swatch of wallpaper, the room,
            then the numbers. The house and the yard wear two colorings. */}
        <section id="rooms" className={s.rooms} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <h2 id="rooms-h">The rooms</h2>
            <p className={s.secNote}>
              Every room has its own bathroom, a kettle, good towels and a
              window that opens. Rates are per room, per night, and include
              breakfast for everyone in it.
            </p>
          </div>

          <div className={s.wing}>
            <h3 className={s.wingHead}>In the house</h3>
            <span className={s.wingNote}>Three rooms, up the stairs</span>
          </div>
          <ol className={s.roomList}>
            {HOUSE_ROOMS.map((r) => (
              <li key={r.no} className={s.room}>
                <div className={s.roomPlate} aria-hidden="true">
                  <TabbiedPattern
                    pattern={diamondember}
                    palette={HOUSE}
                    fit="grid"
                    cellSize={60}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.roomBody}>
                  <p className={s.roomWhere}>
                    <span className={s.roomNo}>{r.no}</span>
                    <span>{r.where}</span>
                  </p>
                  <h4 className={s.roomName}>{r.name}</h4>
                  <p className={s.roomText}>{r.body}</p>
                  <ul className={s.roomFeatures}>
                    {r.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.roomFacts}>
                  <dl className={s.roomSpecs}>
                    <div>
                      <dt>Sleeps</dt>
                      <dd>{r.sleeps}</dd>
                    </div>
                    <div>
                      <dt>Bed</dt>
                      <dd>{r.bed}</dd>
                    </div>
                    <div>
                      <dt>Bathroom</dt>
                      <dd>{r.bath}</dd>
                    </div>
                  </dl>
                  <p className={s.rate}>
                    <strong>{r.rate}</strong>
                    <span>{r.rateNote}</span>
                  </p>
                  <a className={s.roomBook} href="#book">Book this room</a>
                </div>
              </li>
            ))}
          </ol>

          <div className={s.wing}>
            <h3 className={s.wingHead}>Across the yard</h3>
            <span className={s.wingNote}>Two rooms in the old stable</span>
          </div>
          <ol className={s.roomList}>
            {YARD_ROOMS.map((r) => (
              <li key={r.no} className={s.room}>
                <div className={s.roomPlate} aria-hidden="true">
                  <TabbiedPattern
                    pattern={diamondember}
                    palette={YARD}
                    fit="grid"
                    cellSize={60}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.roomBody}>
                  <p className={s.roomWhere}>
                    <span className={s.roomNo}>{r.no}</span>
                    <span>{r.where}</span>
                  </p>
                  <h4 className={s.roomName}>{r.name}</h4>
                  <p className={s.roomText}>{r.body}</p>
                  <ul className={s.roomFeatures}>
                    {r.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.roomFacts}>
                  <dl className={s.roomSpecs}>
                    <div>
                      <dt>Sleeps</dt>
                      <dd>{r.sleeps}</dd>
                    </div>
                    <div>
                      <dt>Bed</dt>
                      <dd>{r.bed}</dd>
                    </div>
                    <div>
                      <dt>Bathroom</dt>
                      <dd>{r.bath}</dd>
                    </div>
                  </dl>
                  <p className={s.rate}>
                    <strong>{r.rate}</strong>
                    <span>{r.rateNote}</span>
                  </p>
                  <a className={s.roomBook} href="#book">Book this room</a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------- BREAKFAST
            The menu on the left, the teapot on a plate of leaves beside it. */}
        <section id="breakfast" className={s.breakfast} aria-labelledby="breakfast-h">
          <div className={s.breakfastText}>
            <div className={s.secHead}>
              <h2 id="breakfast-h">Breakfast</h2>
              <p className={s.secNote}>
                Cooked to order from the card in your room: tick it before
                bed and leave it on the hall table. Vegan and gluten-free
                versions of everything, if you tell us.
              </p>
            </div>
            <dl className={s.times}>
              {BREAKFAST_TIMES.map(([days, hours]) => (
                <div key={days}>
                  <dt>{days}</dt>
                  <dd>{hours}</dd>
                </div>
              ))}
            </dl>
            <h3 className={s.menuHead}>From the kitchen</h3>
            <ul className={s.menu}>
              {COOKED.map((c) => (
                <li key={c.name}>
                  <strong>{c.name}</strong>
                  <span>{c.body}</span>
                </li>
              ))}
            </ul>
            <h3 className={s.menuHead}>On the sideboard, always</h3>
            <ul className={s.sideboard}>
              {SIDEBOARD.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={s.teaPlate}>
            <div className={s.teaField} aria-hidden="true">
              <TabbiedPattern
                pattern={frond}
                palette={LEAVES}
                fit="grid"
                cellSize={72}
                seed="linden-leaves"
                options={{ frequency: 0.45 }}
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Figure
              slug="linden-guesthouse-teapot-cutout"
              cutout
              alt="A round terracotta teapot with a green lid knob and a dark wooden side handle"
              className={s.teapot}
            />
          </div>
        </section>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={s.sec} aria-labelledby="rules-h">
          <div className={s.secHead}>
            <h2 id="rules-h">House rules</h2>
            <p className={s.secNote}>
              Not many, and all of them for the sake of whoever is in the
              next room.
            </p>
          </div>
          <ol className={s.rules}>
            {RULES.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- GUIDE */}
        <section id="guide" className={s.guideSec} aria-labelledby="guide-h">
          <div className={s.guideInner}>
            <div className={s.secHead}>
              <h2 id="guide-h">A local guide</h2>
              <p className={s.secNote}>
                Distances are from our front door. There are maps in every
                room and a shelf of walking guides in the hall to borrow.
              </p>
            </div>
            <ul className={s.guide}>
              {GUIDE.map((g) => (
                <li key={g.name} className={s.place}>
                  <span className={s.placeKind}>{g.kind}</span>
                  <h3>{g.name}</h3>
                  <span className={s.placeDist}>{g.distance}</span>
                  <p>{g.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------- GETTING HERE */}
        <section id="getting-here" className={s.sec} aria-labelledby="here-h">
          <div className={s.secHead}>
            <h2 id="here-h">Getting here</h2>
            <p className={s.secNote}>
              Mill Lane is unpaved for the last hundred yards. Drive slowly;
              the hens have right of way.
            </p>
          </div>
          <div className={s.here}>
            <address className={s.address}>
              <span className={s.addrLabel}>The address</span>
              <span className={s.addrLine}>The Linden Guesthouse</span>
              <span className={s.addrLine}>14 Mill Lane</span>
              <span className={s.addrLine}>Ashby Green</span>
              <a className={s.addrLink} href="tel:+15552380147">(555) 238-0147</a>
              <a className={s.addrLink} href="mailto:stay@lindenguesthouse.example">stay@lindenguesthouse.example</a>
            </address>
            <ul className={s.routes}>
              {ROUTES.map((r) => (
                <li key={r.title}>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInner}>
            <div className={s.bookIntro}>
              <h2 id="book-h">Book direct</h2>
              <p>
                Send us your dates and we will reply within a few hours with
                what is free and a link to pay the first night. Booking direct
                is always the lowest rate, and the jam is the same either way.
              </p>
              <dl className={s.bookFacts}>
                <div>
                  <dt>Deposit</dt>
                  <dd>The first night, when you book</dd>
                </div>
                <div>
                  <dt>The rest</dt>
                  <dd>On the morning you leave, by card</dd>
                </div>
                <div>
                  <dt>By phone</dt>
                  <dd>
                    <a href="tel:+15552380147">(555) 238-0147</a>
                  </dd>
                </div>
                <div>
                  <dt>Office hours</dt>
                  <dd>Every day, 9 am to 8 pm</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="lg-arrive">Arriving</label>
                <input id="lg-arrive" name="arrive" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="lg-nights">Nights</label>
                <input id="lg-nights" name="nights" type="number" min="1" max="21" defaultValue="2" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="lg-room">Room</label>
                <select id="lg-room" name="room" defaultValue="">
                  <option value="">Any room that is free</option>
                  <option>Linden, $175</option>
                  <option>Rowan, $150</option>
                  <option>Hazel, $125</option>
                  <option>The Hayloft, $210</option>
                  <option>The Garden Room, $160</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="lg-adults">Adults</label>
                <input id="lg-adults" name="adults" type="number" min="1" max="4" defaultValue="2" />
              </div>
              <div className={s.field}>
                <label htmlFor="lg-children">Children</label>
                <input id="lg-children" name="children" type="number" min="0" max="2" defaultValue="0" />
              </div>
              <div className={s.field}>
                <label htmlFor="lg-name">Your name</label>
                <input id="lg-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="lg-email">Email</label>
                <input id="lg-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="lg-note">Anything we should know</label>
                <textarea id="lg-note" name="note" rows={3} placeholder="A late arrival, a dog, a birthday" />
              </div>
              <div className={s.formFoot}>
                <button className={s.btn} type="submit">Send booking request</button>
                <small>No payment is taken until we confirm.</small>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* A coda: a strip of the house wallpaper, then the footer. */}
      <div className={s.coda} aria-hidden="true">
        <TabbiedPattern
          pattern={diamondember}
          palette={HOUSE}
          fit="grid"
          cellSize={60}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>The Linden Guesthouse</p>
            <p className={s.footTag}>Five rooms and a long breakfast table on Mill Lane, Ashby Green.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Stay</h2>
            <ul className={s.footLinks}>
              <li><a href="#rooms">The rooms</a></li>
              <li><a href="#breakfast">Breakfast</a></li>
              <li><a href="#rules">House rules</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Around</h2>
            <ul className={s.footLinks}>
              <li><a href="#guide">Local guide</a></li>
              <li><a href="#getting-here">Getting here</a></li>
              <li><a href="#book">Book direct</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Write or call</h2>
            <ul className={s.footLinks}>
              <li><a href="mailto:stay@lindenguesthouse.example">stay@lindenguesthouse.example</a></li>
              <li><a href="tel:+15552380147">(555) 238-0147</a></li>
            </ul>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional bed and breakfast. Rooms, rates, places and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
