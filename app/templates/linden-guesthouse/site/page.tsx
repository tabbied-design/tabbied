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
const TERRA = '#A45A3C';
const LINDEN = '#6F7D5C';
const PAPER = '#F5F2EA';
const GRAY = '#9C978C';
const PALE = '#E7E1D3';

/* The two wings of the house wear two colorings of the same wallpaper. */
const HOUSE = ['transparent', GRAY, PALE, PAPER, TERRA, PAPER];
const YARD = ['transparent', GRAY, PALE, PAPER, LINDEN, PAPER];
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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f2ea',
        '--ink': '#25271f',
        '--terra': '#a45a3c',
        '--linden': '#6f7d5c',
        '--gray': '#9c978c',
        '--pale': '#e7e1d3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,terra,linden,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markThe" data-edit-max="60" className={s.markThe}>The</span>
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Linden Guesthouse</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Check dates</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Type only. The rooms below are the picture. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Bed and breakfast, 14 Mill Lane, Ashby Green</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Five rooms under an old linden tree, <em>and breakfast until ten.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              A brick house at the quiet end of Mill Lane, kept by Ruth and
              Tomas Pell since 2009. Three rooms in the house, two across the
              yard, a long table in the front room and the river path at the
              end of the lane.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#rooms">See the five rooms</a>
              <a data-edit="hero.btnQuiet" data-edit-max="28" className={s.btnQuiet} href="#book">Book direct</a>
            </div>
          </div>
          <dl className={s.glance}>
            {GLANCE.map(([term, value], i) => (
              <div key={term}>
                <dt data-edit={`hero.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- ROOMS
            Full-width rows, edge to edge: a swatch of wallpaper, the room,
            then the numbers. The house and the yard wear two colorings. */}
        <section id="rooms" className={s.rooms} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <h2 data-edit="rooms.title" data-edit-max="60" id="rooms-h">The rooms</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every room has its own bathroom, a kettle, good towels and a
              window that opens. Rates are per room, per night, and include
              breakfast for everyone in it.
            </p>
          </div>

          <div className={s.wing}>
            <h3 data-edit="rooms.wingHead" data-edit-max="40" className={s.wingHead}>In the house</h3>
            <span data-edit="rooms.wingNote" data-edit-max="60" className={s.wingNote}>Three rooms, up the stairs</span>
          </div>
          <ol className={s.roomList}>
            {HOUSE_ROOMS.map((r, i) => (
              <li key={r.no} className={s.room}>
                <div data-edit-pattern={`rooms.field.${i}`} data-edit-roles="transparent,4,5,0,2,0" className={s.roomPlate} aria-hidden="true">
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
                    <span data-edit={`rooms.roomNo.${i}`} data-edit-max="60" className={s.roomNo}>{r.no}</span>
                    <span data-edit={`rooms.text.${i}`} data-edit-max="60">{r.where}</span>
                  </p>
                  <h4 data-edit={`rooms.roomName.${i}`} data-edit-max="36" className={s.roomName}>{r.name}</h4>
                  <p data-edit={`rooms.roomText.${i}`} data-edit-max="240" data-edit-multiline className={s.roomText}>{r.body}</p>
                  <ul className={s.roomFeatures}>
                    {r.features.map((f, i2) => (
                      <li data-edit={`rooms.item.${i}.${i2}`} data-edit-max="80" key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.roomFacts}>
                  <dl className={s.roomSpecs}>
                    <div>
                      <dt data-edit={`rooms.term.${i}`} data-edit-max="28">Sleeps</dt>
                      <dd data-edit={`rooms.body.${i}`} data-edit-max="200" data-edit-multiline>{r.sleeps}</dd>
                    </div>
                    <div>
                      <dt data-edit={`rooms.term2.${i}`} data-edit-max="28">Bed</dt>
                      <dd data-edit={`rooms.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.bed}</dd>
                    </div>
                    <div>
                      <dt data-edit={`rooms.term3.${i}`} data-edit-max="28">Bathroom</dt>
                      <dd data-edit={`rooms.body3.${i}`} data-edit-max="200" data-edit-multiline>{r.bath}</dd>
                    </div>
                  </dl>
                  <p className={s.rate}>
                    <strong data-edit={`rooms.emphasis.${i}`}>{r.rate}</strong>
                    <span data-edit={`rooms.text2.${i}`} data-edit-max="60">{r.rateNote}</span>
                  </p>
                  <a data-edit={`rooms.roomBook.${i}`} data-edit-max="28" className={s.roomBook} href="#book">Book this room</a>
                </div>
              </li>
            ))}
          </ol>

          <div className={s.wing}>
            <h3 data-edit="rooms.wingHead2" data-edit-max="40" className={s.wingHead}>Across the yard</h3>
            <span data-edit="rooms.wingNote2" data-edit-max="60" className={s.wingNote}>Two rooms in the old stable</span>
          </div>
          <ol className={s.roomList}>
            {YARD_ROOMS.map((r, i) => (
              <li key={r.no} className={s.room}>
                <div data-edit-pattern={`rooms.field2.${i}`} data-edit-roles="transparent,4,5,0,3,0" className={s.roomPlate} aria-hidden="true">
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
                    <span data-edit={`rooms.roomNo2.${i}`} data-edit-max="60" className={s.roomNo}>{r.no}</span>
                    <span data-edit={`rooms.text3.${i}`} data-edit-max="60">{r.where}</span>
                  </p>
                  <h4 data-edit={`rooms.roomName2.${i}`} data-edit-max="36" className={s.roomName}>{r.name}</h4>
                  <p data-edit={`rooms.roomText2.${i}`} data-edit-max="240" data-edit-multiline className={s.roomText}>{r.body}</p>
                  <ul className={s.roomFeatures}>
                    {r.features.map((f, i2) => (
                      <li data-edit={`rooms.item2.${i}.${i2}`} data-edit-max="80" key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.roomFacts}>
                  <dl className={s.roomSpecs}>
                    <div>
                      <dt data-edit={`rooms.term4.${i}`} data-edit-max="28">Sleeps</dt>
                      <dd data-edit={`rooms.body4.${i}`} data-edit-max="200" data-edit-multiline>{r.sleeps}</dd>
                    </div>
                    <div>
                      <dt data-edit={`rooms.term5.${i}`} data-edit-max="28">Bed</dt>
                      <dd data-edit={`rooms.body5.${i}`} data-edit-max="200" data-edit-multiline>{r.bed}</dd>
                    </div>
                    <div>
                      <dt data-edit={`rooms.term6.${i}`} data-edit-max="28">Bathroom</dt>
                      <dd data-edit={`rooms.body6.${i}`} data-edit-max="200" data-edit-multiline>{r.bath}</dd>
                    </div>
                  </dl>
                  <p className={s.rate}>
                    <strong data-edit={`rooms.emphasis2.${i}`}>{r.rate}</strong>
                    <span data-edit={`rooms.text4.${i}`} data-edit-max="60">{r.rateNote}</span>
                  </p>
                  <a data-edit={`rooms.roomBook2.${i}`} data-edit-max="28" className={s.roomBook} href="#book">Book this room</a>
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
              <h2 data-edit="breakfast.title" data-edit-max="60" id="breakfast-h">Breakfast</h2>
              <p data-edit="breakfast.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Cooked to order from the card in your room: tick it before
                bed and leave it on the hall table. Vegan and gluten-free
                versions of everything, if you tell us.
              </p>
            </div>
            <dl className={s.times}>
              {BREAKFAST_TIMES.map(([days, hours], i) => (
                <div key={days}>
                  <dt data-edit={`breakfast.term.${i}`} data-edit-max="28">{days}</dt>
                  <dd data-edit={`breakfast.body.${i}`} data-edit-max="200" data-edit-multiline>{hours}</dd>
                </div>
              ))}
            </dl>
            <h3 data-edit="breakfast.menuHead" data-edit-max="40" className={s.menuHead}>From the kitchen</h3>
            <ul className={s.menu}>
              {COOKED.map((c, i) => (
                <li key={c.name}>
                  <strong data-edit={`breakfast.emphasis.${i}`}>{c.name}</strong>
                  <span data-edit={`breakfast.text.${i}`} data-edit-max="60">{c.body}</span>
                </li>
              ))}
            </ul>
            <h3 data-edit="breakfast.menuHead2" data-edit-max="40" className={s.menuHead}>On the sideboard, always</h3>
            <ul className={s.sideboard}>
              {SIDEBOARD.map((item, i) => (
                <li data-edit={`breakfast.item.${i}`} data-edit-max="80" key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={s.teaPlate}>
            <div data-edit-pattern="breakfast.field" data-edit-roles="transparent,3,5,2" className={s.teaField} aria-hidden="true">
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
            <Figure editId="photo.linden-guesthouse-teapot-cutout"
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
            <h2 data-edit="rules.title" data-edit-max="60" id="rules-h">House rules</h2>
            <p data-edit="rules.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Not many, and all of them for the sake of whoever is in the
              next room.
            </p>
          </div>
          <ol className={s.rules}>
            {RULES.map((r, i) => (
              <li key={r.title}>
                <h3 data-edit={`rules.title2.${i}`} data-edit-max="40">{r.title}</h3>
                <p data-edit={`rules.body.${i}`} data-edit-max="240" data-edit-multiline>{r.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- GUIDE */}
        <section id="guide" className={s.guideSec} aria-labelledby="guide-h">
          <div className={s.guideInner}>
            <div className={s.secHead}>
              <h2 data-edit="guide.title" data-edit-max="60" id="guide-h">A local guide</h2>
              <p data-edit="guide.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Distances are from our front door. There are maps in every
                room and a shelf of walking guides in the hall to borrow.
              </p>
            </div>
            <ul className={s.guide}>
              {GUIDE.map((g, i) => (
                <li key={g.name} className={s.place}>
                  <span data-edit={`guide.placeKind.${i}`} data-edit-max="60" className={s.placeKind}>{g.kind}</span>
                  <h3 data-edit={`guide.title2.${i}`} data-edit-max="40">{g.name}</h3>
                  <span data-edit={`guide.placeDist.${i}`} data-edit-max="60" className={s.placeDist}>{g.distance}</span>
                  <p data-edit={`guide.body.${i}`} data-edit-max="240" data-edit-multiline>{g.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------- GETTING HERE */}
        <section id="getting-here" className={s.sec} aria-labelledby="here-h">
          <div className={s.secHead}>
            <h2 data-edit="gettingHere.title" data-edit-max="60" id="here-h">Getting here</h2>
            <p data-edit="gettingHere.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Mill Lane is unpaved for the last hundred yards. Drive slowly;
              the hens have right of way.
            </p>
          </div>
          <div className={s.here}>
            <address className={s.address}>
              <span data-edit="gettingHere.addrLabel" data-edit-max="60" className={s.addrLabel}>The address</span>
              <span data-edit="gettingHere.addrLine" data-edit-max="60" className={s.addrLine}>The Linden Guesthouse</span>
              <span data-edit="gettingHere.addrLine2" data-edit-max="60" className={s.addrLine}>14 Mill Lane</span>
              <span data-edit="gettingHere.addrLine3" data-edit-max="60" className={s.addrLine}>Ashby Green</span>
              <a data-edit="gettingHere.addrLink" data-edit-max="28" className={s.addrLink} href="tel:+15552380147">(555) 238-0147</a>
              <a data-edit="gettingHere.addrLink2" data-edit-max="28" className={s.addrLink} href="mailto:stay@lindenguesthouse.example">stay@lindenguesthouse.example</a>
            </address>
            <ul className={s.routes}>
              {ROUTES.map((r, i) => (
                <li key={r.title}>
                  <h3 data-edit={`gettingHere.title2.${i}`} data-edit-max="40">{r.title}</h3>
                  <p data-edit={`gettingHere.body.${i}`} data-edit-max="240" data-edit-multiline>{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInner}>
            <div className={s.bookIntro}>
              <h2 data-edit="book.title" data-edit-max="60" id="book-h">Book direct</h2>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline>
                Send us your dates and we will reply within a few hours with
                what is free and a link to pay the first night. Booking direct
                is always the lowest rate, and the jam is the same either way.
              </p>
              <dl className={s.bookFacts}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Deposit</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>The first night, when you book</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">The rest</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>On the morning you leave, by card</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">By phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15552380147">(555) 238-0147</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Office hours</dt>
                  <dd data-edit="book.body4" data-edit-max="200" data-edit-multiline>Every day, 9 am to 8 pm</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="lg-arrive">Arriving</label>
                <input id="lg-arrive" name="arrive" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="lg-nights">Nights</label>
                <input id="lg-nights" name="nights" type="number" min="1" max="21" defaultValue="2" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label3" htmlFor="lg-room">Room</label>
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
                <label data-edit="book.label4" htmlFor="lg-adults">Adults</label>
                <input id="lg-adults" name="adults" type="number" min="1" max="4" defaultValue="2" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="lg-children">Children</label>
                <input id="lg-children" name="children" type="number" min="0" max="2" defaultValue="0" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="lg-name">Your name</label>
                <input id="lg-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label7" htmlFor="lg-email">Email</label>
                <input id="lg-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label8" htmlFor="lg-note">Anything we should know</label>
                <textarea id="lg-note" name="note" rows={3} placeholder="A late arrival, a dog, a birthday" />
              </div>
              <div className={s.formFoot}>
                <button data-edit="book.btn" data-edit-max="24" className={s.btn} type="submit">Send booking request</button>
                <small data-edit="book.note">No payment is taken until we confirm.</small>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* A coda: a strip of the house wallpaper, then the footer. */}
      <div data-edit-pattern="page.field" data-edit-roles="transparent,4,5,0,2,0" className={s.coda} aria-hidden="true">
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
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>The Linden Guesthouse</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Five rooms and a long breakfast table on Mill Lane, Ashby Green.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Stay</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.rooms" data-edit-max="28" href="#rooms">The rooms</a></li>
              <li><a data-edit="footer.breakfast" data-edit-max="28" href="#breakfast">Breakfast</a></li>
              <li><a data-edit="footer.rules" data-edit-max="28" href="#rules">House rules</a></li>
            </ul>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Around</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.guide" data-edit-max="28" href="#guide">Local guide</a></li>
              <li><a data-edit="footer.gettingHere" data-edit-max="28" href="#getting-here">Getting here</a></li>
              <li><a data-edit="footer.book" data-edit-max="28" href="#book">Book direct</a></li>
            </ul>
          </div>
          <div>
            <h2 data-edit="footer.footHead3" data-edit-max="60" className={s.footHead}>Write or call</h2>
            <ul className={s.footLinks}>
              <li><a data-edit="footer.link" data-edit-max="28" href="mailto:stay@lindenguesthouse.example">stay@lindenguesthouse.example</a></li>
              <li><a data-edit="footer.link2" data-edit-max="28" href="tel:+15552380147">(555) 238-0147</a></li>
            </ul>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional bed and breakfast. Rooms, rates, places and people are invented.</p>
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
