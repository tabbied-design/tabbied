import { TabbiedPattern } from 'tabbied/react';
import { diadem, hourglass } from 'tabbied/patterns';
import s from './saffron-house.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Saffron House: Family-run Indian restaurant, Lantern Street',
  description:
    'Saffron House is the Menon family kitchen on Lantern Street: a different regional thali every lunchtime, the four regions at dinner, a spice scale from nought to five and a Sunday feast.',
};

/* Site colors: the plum ground and its four inks. The jewelled fields
   take only these, so a re-color reaches every one of them. */
const PLUM = '#2b1030';
const SAFFRON = '#f2a31b';
const TEAL = '#0f6d68';
const RUBY = '#c7304e';
const CREAM = '#f7ead3';

const ARCH = [TEAL, SAFFRON, RUBY, CREAM, PLUM];
const RIM = [PLUM, SAFFRON, CREAM, RUBY];
const BORDER = ['transparent', SAFFRON, RUBY, TEAL];
const HEM = [PLUM, SAFFRON, TEAL, RUBY];

const NAV = [
  ['Thali', '#thali'],
  ['Menu', '#menu'],
  ['Spice', '#spice'],
  ['Family', '#family'],
  ['Feasts', '#feasts'],
  ['Visit', '#visit'],
];

const HERO_FACTS = [
  ['Lunch', 'Tuesday to Sunday, the thali of the day, $19'],
  ['Dinner', 'Tuesday to Saturday, the whole menu by region'],
  ['Sunday', 'The family feast, noon to three'],
];

/* The plate map: where each bowl sits on Thursday's plate, clockwise from
   the top. The numbers on the plate match the list beside it. */
const KATORIS = [
  { n: '1', role: 'Dal', dish: 'Gujarati dal', note: 'Toor lentils, sweet and sour, with jaggery, kokum and peanuts.' },
  { n: '2', role: 'Kadhi', dish: 'Kadhi', note: 'Yogurt and gram flour, thin as soup, tempered with curry leaves.' },
  { n: '3', role: 'Shaak', dish: 'Ringan batata', note: 'Aubergine and potato, slow in a covered pan.' },
  { n: '4', role: 'Farsan', dish: 'Khaman dhokla', note: 'Steamed, soft, with mustard seed and green chili.' },
  { n: '5', role: 'Chaas', dish: 'Chaas', note: 'Salted buttermilk with roasted cumin. Drink it last.' },
  { n: '6', role: 'Mithai', dish: 'Shrikhand', note: 'Hung yogurt with saffron and cardamom.' },
  { n: '7', role: 'Achaar', dish: 'Chhundo', note: 'Nani\'s grated mango pickle, a spoonful is plenty.' },
];

type Day = {
  day: string;
  region: string;
  cook: string;
  dishes: string;
};

const WEEK: Day[] = [
  { day: 'Tuesday', region: 'Punjabi', cook: 'Ravi', dishes: 'Dal makhani, sarson ka saag, jeera rice, two rotis, gajar halwa' },
  { day: 'Wednesday', region: 'Kerala', cook: 'Nani', dishes: 'Sambar, avial, cabbage thoran, rasam, red rice, payasam' },
  { day: 'Thursday', region: 'Gujarati', cook: 'Priya', dishes: 'Dal, kadhi, ringan batata, dhokla, rotli, shrikhand' },
  { day: 'Friday', region: 'Bengali', cook: 'Ravi', dishes: 'Fish in mustard, cholar dal, begun bhaja, rice, mishti doi' },
  { day: 'Saturday', region: 'Hyderabadi', cook: 'Ravi', dishes: 'Chicken or vegetable biryani, mirchi ka salan, raita, double ka meetha' },
  { day: 'Sunday', region: 'The feast', cook: 'Everyone', dishes: 'Ten dishes, family style, see below' },
];

const HEAT_STEPS = ['1', '2', '3', '4', '5'];

type Dish = {
  name: string;
  note: string;
  price: string;
  heat: number;
  veg: boolean;
};

type Region = {
  name: string;
  states: string;
  dishes: Dish[];
};

const REGIONS: Region[] = [
  {
    name: 'North',
    states: 'Punjab, Delhi, Kashmir',
    dishes: [
      { name: 'Dal makhani', note: 'Black lentils cooked overnight on the back of the tandoor, finished with butter', price: '$15', heat: 1, veg: true },
      { name: 'Paneer tikka', note: 'Our own paneer, marinated in mustard oil and yogurt, charred', price: '$17', heat: 2, veg: true },
      { name: 'Butter chicken', note: 'Tandoor chicken in tomato, cream and dried fenugreek', price: '$21', heat: 1, veg: false },
      { name: 'Rogan josh', note: 'Lamb shoulder with Kashmiri chili and fennel, on the bone', price: '$24', heat: 3, veg: false },
    ],
  },
  {
    name: 'South',
    states: 'Kerala, Tamil Nadu',
    dishes: [
      { name: 'Avial', note: 'Seven vegetables in coconut and sour yogurt, raw coconut oil on top', price: '$14', heat: 0, veg: true },
      { name: 'Masala dosa', note: 'Rice and lentil crepe, potato inside, sambar and chutney beside. Lunch only', price: '$14', heat: 1, veg: true },
      { name: 'Kerala fish curry', note: 'Kingfish in kudampuli and coconut, the way Nani learned it in Kochi', price: '$23', heat: 3, veg: false },
      { name: 'Chettinad chicken', note: 'Black pepper, star anise and kalpasi, dry and dark', price: '$21', heat: 4, veg: false },
    ],
  },
  {
    name: 'West',
    states: 'Gujarat, Maharashtra, Goa',
    dishes: [
      { name: 'Khaman dhokla', note: 'Steamed gram flour cake, mustard seed, green chili', price: '$8', heat: 1, veg: true },
      { name: 'Pav bhaji', note: 'Mashed vegetable curry cooked on the flat griddle, buttered buns', price: '$13', heat: 2, veg: true },
      { name: 'Prawn balchao', note: 'Goan pickled prawns in red chili and palm vinegar', price: '$24', heat: 4, veg: false },
      { name: 'Pork vindaloo', note: 'The real one: vinegar, garlic, a lot of chili. We will ask you twice', price: '$22', heat: 5, veg: false },
    ],
  },
  {
    name: 'East',
    states: 'Bengal, Odisha',
    dishes: [
      { name: 'Begun bhaja', note: 'Aubergine slices, turmeric and salt, fried in mustard oil', price: '$9', heat: 0, veg: true },
      { name: 'Cholar dal', note: 'Split chickpeas with coconut, raisins and a little ghee', price: '$13', heat: 1, veg: true },
      { name: 'Shorshe maach', note: 'Fish steamed in mustard paste and green chili', price: '$23', heat: 3, veg: false },
      { name: 'Kosha mangsho', note: 'Goat, slow fried until the gravy is almost gone', price: '$25', heat: 3, veg: false },
    ],
  },
];

const SPICE = [
  { n: '0', name: 'Nani\'s', note: 'No chili at all. Still full of flavor, and what the under-tens get.' },
  { n: '1', name: 'Gentle', note: 'A warmth you notice on the third bite.' },
  { n: '2', name: 'House', note: 'How most of the menu is cooked unless you say otherwise.' },
  { n: '3', name: 'Ravi\'s', note: 'You will want the raita. Ask for more, it is free.' },
  { n: '4', name: 'Kitchen', note: 'What the cooks eat after service.' },
  { n: '5', name: 'Vindaloo', note: 'One dish lives here. We will check you meant it.' },
];

const TIMELINE = [
  ['1998', 'Kamala Menon opens a twelve-seat lunch counter on Lantern Street: Kerala food, one ceiling fan, cash only.'],
  ['2004', 'Her son Ravi leaves a job in insurance and teaches himself the tandoor, one regular at a time.'],
  ['2009', 'Ravi marries Priya Parekh. Her mother\'s Gujarati thali joins the menu on Thursdays and never leaves.'],
  ['2016', 'The tailor next door retires. We knock through and the dining room grows to sixty-four seats.'],
  ['2024', 'Anjali, Ravi and Priya\'s daughter, takes over the front of house and the bar.'],
];

const FEAST = [
  'Banana chips and three chutneys',
  'Parippu, Kerala moong dal with ghee',
  'Sambar and rasam',
  'Avial and beans thoran',
  'Chicken roast, Nani\'s Sunday one',
  'Paneer butter masala',
  'Lemon rice and plain rice',
  'Appam, made to order at the pass',
  'Pickles, papad, curd',
  'Palada payasam',
];

const TRAYS = [
  ['Dal or vegetable curry', '$70', '$130'],
  ['Chicken or paneer curry', '$85', '$160'],
  ['Lamb or goat curry', '$110', '$205'],
  ['Biryani, chicken or vegetable', '$80', '$150'],
  ['Rice, plain or jeera', '$30', '$55'],
];

const HOURS = [
  ['Monday', 'Closed, we are at the market'],
  ['Tuesday to Thursday', '11:30-2:30 and 5-10'],
  ['Friday and Saturday', '11:30-2:30 and 5-11'],
  ['Sunday', 'Feast 12-3, then 5-9'],
];

export default function SaffronHousePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Rozha+One&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Saffron House</a>
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
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Family kitchen on Lantern Street, since 1998</p>
            <h1 id="hero-h" className={s.title}>Saffron <em>House</em></h1>
            <p className={s.lede}>
              We are the Menons. My grandmother cooks Kerala, my mother cooks
              Gujarat, and my father learned the rest one regular at a time.
              Lunch is one thali, a different region every day. Dinner is the
              whole map.
            </p>
            <p className={s.sign}>Anjali Menon, front of house</p>
            <dl className={s.facts}>
              {HERO_FACTS.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
            <div className={s.actions}>
              <a className={s.btn} href="#visit">Book a table</a>
              <a className={s.btnGhost} href="#thali">This week's thalis</a>
            </div>
          </div>

          <div className={s.archFrame}>
            <div className={s.arch} aria-hidden="true">
              <TabbiedPattern
                pattern={diadem}
                palette={ARCH}
                fit="grid"
                cellSize={44}
                seed="saffron-arch"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- THALI */}
        <section id="thali" className={s.thali} aria-labelledby="thali-h">
          <div className={s.inner}>
            <div className={s.secHead}>
              <p className={s.eyebrow}>Lunch, Tuesday to Sunday</p>
              <h2 id="thali-h">One plate, a different region every day</h2>
              <p className={s.secNote}>
                A thali is a whole meal on one steel plate: small bowls around
                the edge, bread and rice in the middle. Dal, rice and rotis are
                refilled until you stop us. $19, or $12 for under-twelves.
              </p>
            </div>

            <div className={s.thaliGrid}>
              <div className={s.plateWrap}>
                <div className={s.plate}>
                  <div className={s.rim} aria-hidden="true">
                    <TabbiedPattern
                      pattern={diadem}
                      palette={RIM}
                      fit="grid"
                      cellSize={30}
                      seed="saffron-rim"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <div className={s.surface} />
                  <ol className={s.katoris} aria-label="The bowls on Thursday's plate">
                    {KATORIS.map((k) => (
                      <li key={k.n} className={s.katori}>
                        <span className={s.kNum}>{k.n}</span>
                        <span className={s.kRole}>{k.role}</span>
                      </li>
                    ))}
                  </ol>
                  <p className={s.center}>Rotli, rice and papad</p>
                </div>
                <p className={s.plateCaption}>Thursday's plate, Priya's Gujarati thali, drawn from above.</p>
              </div>

              <ol className={s.plateKey}>
                {KATORIS.map((k) => (
                  <li key={k.n}>
                    <span className={s.keyNum}>{k.n}</span>
                    <div>
                      <h3>{k.dish}</h3>
                      <p>{k.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <h3 className={s.weekTitle}>The week's plates</h3>
            <ol className={s.week}>
              {WEEK.map((d) => (
                <li key={d.day}>
                  <span className={s.wDay}>{d.day}</span>
                  <strong className={s.wRegion}>{d.region}</strong>
                  <span className={s.wCook}>{`Cooked by ${d.cook}`}</span>
                  <p className={s.wDishes}>{d.dishes}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ MENU */}
        <section id="menu" className={s.menu} aria-labelledby="menu-h">
          <div className={s.inner}>
            <div className={s.secHead}>
              <p className={s.eyebrow}>Dinner, from 5</p>
              <h2 id="menu-h">The menu, by region</h2>
              <p className={s.secNote}>
                Order from one corner of the country or all four. Everything
                comes with plain rice; breads, raita and pickles are on the
                side list at the table.
              </p>
              <ul className={s.legend}>
                <li className={s.legVeg}>Vegetarian</li>
                <li className={s.legMeat}>Meat or fish</li>
                <li className={s.legHeat}>Heat, out of five</li>
              </ul>
            </div>

            <div className={s.regions}>
              {REGIONS.map((r) => (
                <article key={r.name} className={s.region} aria-labelledby={`region-${r.name}`}>
                  <header className={s.regionHead}>
                    <h3 id={`region-${r.name}`}>{r.name}</h3>
                    <p>{r.states}</p>
                  </header>
                  <ul className={s.dishes}>
                    {r.dishes.map((d) => (
                      <li key={d.name}>
                        <div className={s.dishLine}>
                          <span className={d.veg ? s.veg : s.meat}>
                            <span className={s.srOnly}>{d.veg ? 'Vegetarian' : 'Meat or fish'}</span>
                          </span>
                          <h4>{d.name}</h4>
                          <span className={s.price}>{d.price}</span>
                        </div>
                        <p className={s.dishNote}>{d.note}</p>
                        <span className={s.heat}>
                          <span className={s.srOnly}>{`Heat ${d.heat} of 5`}</span>
                          {HEAT_STEPS.map((step, j) => (
                            <span key={step} className={j < d.heat ? s.hot : s.cool} />
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- SPICE */}
        <div className={s.hem} aria-hidden="true">
          <TabbiedPattern
            pattern={hourglass}
            palette={HEM}
            fit="grid"
            cellSize={36}
            seed="saffron-hem"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="spice" className={s.spice} aria-labelledby="spice-h">
          <div className={s.inner}>
            <div className={s.secHead}>
              <p className={s.eyebrow}>Tell us a number</p>
              <h2 id="spice-h">The spice scale</h2>
              <p className={s.secNote}>
                Every dish on the menu has a number. Any of them can be cooked
                one step milder; not every one can go hotter, because some
                sauces are built on the chili. Ask and we will say which.
              </p>
            </div>
            <ol className={s.scale}>
              {SPICE.map((step) => (
                <li key={step.n}>
                  <span className={s.scaleNum}>{step.n}</span>
                  <strong className={s.scaleName}>{step.name}</strong>
                  <p className={s.scaleNote}>{step.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- FAMILY */}
        <section id="family" className={s.family} aria-labelledby="family-h">
          <div className={s.inner}>
            <div className={s.familyGrid}>
              <div>
                <p className={s.eyebrow}>Three generations, one kitchen</p>
                <h2 id="family-h">The family</h2>
                <p className={s.story}>
                  Nani came from Kochi in 1996 with two suitcases and a jar of
                  her mother's pickle. Two years later she was feeding the
                  mill workers on Lantern Street from a counter with twelve
                  stools. Most of what she cooked then is still on the
                  Wednesday plate.
                </p>
                <p className={s.story}>
                  We are not a Kerala restaurant, or a Gujarati one. We are a
                  family from two ends of the country that married into a
                  third and cooked for a fourth, and the menu is the result.
                  Nani is eighty-one. She still makes the payasam and the
                  pickles every Sunday morning, and she still tastes the
                  sambar before we open.
                </p>
              </div>

              <div className={s.tree}>
                <div className={s.treeRow}>
                  <p className={s.person}>
                    <strong>Kamala Menon</strong>
                    <span>Nani. Kerala dishes, pickles, payasam, Sundays</span>
                  </p>
                </div>
                <div className={`${s.treeRow} ${s.treePair}`}>
                  <p className={s.person}>
                    <strong>Ravi Menon</strong>
                    <span>Head chef. The tandoor, the north and the east</span>
                  </p>
                  <p className={s.person}>
                    <strong>Priya Parekh-Menon</strong>
                    <span>The thali, the west, and the books</span>
                  </p>
                </div>
                <div className={s.treeRow}>
                  <p className={s.person}>
                    <strong>Anjali Menon</strong>
                    <span>Front of house, the bar, this website</span>
                  </p>
                </div>
                <p className={s.treeNote}>
                  And Suresh Pillai, on the tandoor since 2011, who is family by
                  now whether he likes it or not.
                </p>
              </div>
            </div>

            <ol className={s.timeline}>
              {TIMELINE.map(([year, text]) => (
                <li key={year}>
                  <span className={s.year}>{year}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- FEASTS */}
        <section id="feasts" className={s.feasts} aria-labelledby="feasts-h">
          <div className={s.inner}>
            <div className={s.secHead}>
              <p className={s.eyebrow}>Sundays, rooms and trays</p>
              <h2 id="feasts-h">Feasts</h2>
            </div>

            <div className={s.feastGrid}>
              <div className={s.feastCard}>
                <div className={s.feastBorder} aria-hidden="true">
                  <TabbiedPattern
                    pattern={diadem}
                    palette={BORDER}
                    fit="grid"
                    cellSize={26}
                    seed="saffron-feast"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.feastInner}>
                  <p className={s.eyebrow}>Every Sunday, noon to three</p>
                  <h3 className={s.feastTitle}>The Sunday feast</h3>
                  <p className={s.feastPrice}>$32 a head, $14 under twelve</p>
                  <ol className={s.feastList}>
                    {FEAST.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ol>
                  <p className={s.small}>
                    Served to the table in bowls, family style, and brought
                    round again. Booking is wise; the first sitting fills by
                    Thursday.
                  </p>
                </div>
              </div>

              <div className={s.feastSide}>
                <Artwork
                  slug="saffron-house-bowls"
                  alt="Three brass bowls of curry, dal and rice on a round tray, with a folded flatbread"
                  inks={{ black: 'var(--teal)', blue: 'var(--gild)', red: 'var(--ruby)' }}
                  className={s.bowls}
                />
                <h3 className={s.sideTitle}>Catering trays</h3>
                <p className={s.small}>
                  Collected from the side door, hot or ready to reheat. Two
                  days' notice, three for more than six trays.
                </p>
                <table className={s.trays}>
                  <caption className={s.srOnly}>Catering tray prices, half and full</caption>
                  <thead>
                    <tr>
                      <th scope="col">Tray</th>
                      <th scope="col">Half, 10-12</th>
                      <th scope="col">Full, 20-25</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRAYS.map(([what, half, full]) => (
                      <tr key={what}>
                        <th scope="row">{what}</th>
                        <td>{half}</td>
                        <td>{full}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className={s.sideTitle}>The back room</h3>
                <p className={s.small}>
                  Behind the old tailor's shop, twenty-four seats at one long
                  table. No room fee on weeknights; Friday and Saturday have a
                  $400 minimum spend. Birthdays, engagements and one very
                  long book club so far.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.inner}>
            <div className={s.visitGrid}>
              <div>
                <p className={s.eyebrow}>41 Lantern Street, Mill Quarter</p>
                <h2 id="visit-h">Come and eat</h2>
                <dl className={s.hours}>
                  {HOURS.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.address}>41 Lantern Street, between the mill and the library</p>
                <p className={s.address}>
                  <a href="tel:+15550134418">(555) 013-4418</a>
                </p>
                <p className={s.address}>
                  <a href="mailto:table@saffronhouse.example">table@saffronhouse.example</a>
                </p>
                <p className={s.small}>
                  Step-free from the street, one accessible restroom. Tables are
                  held for fifteen minutes. Walk-ins welcome at lunch; at dinner
                  we keep four tables back for them.
                </p>
              </div>

              <form className={s.form} action="#">
                <h3 className={s.formTitle}>Book a table</h3>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label htmlFor="sh-name">Name</label>
                    <input id="sh-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sh-phone">Phone</label>
                    <input id="sh-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sh-date">Day</label>
                    <input id="sh-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sh-time">Time</label>
                    <select id="sh-time" name="time" defaultValue="19:00">
                      <option value="12:00">Lunch, 12:00</option>
                      <option value="13:00">Lunch, 1:00</option>
                      <option value="17:30">Dinner, 5:30</option>
                      <option value="19:00">Dinner, 7:00</option>
                      <option value="20:30">Dinner, 8:30</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sh-guests">Guests</label>
                    <input id="sh-guests" name="guests" type="number" min={1} max={24} defaultValue={2} />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="sh-heat">Usual heat</label>
                    <select id="sh-heat" name="heat" defaultValue="2">
                      <option value="0">0, Nani's</option>
                      <option value="1">1, Gentle</option>
                      <option value="2">2, House</option>
                      <option value="3">3, Ravi's</option>
                      <option value="4">4, Kitchen</option>
                    </select>
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label htmlFor="sh-note">Allergies, high chairs, birthdays</label>
                    <textarea id="sh-note" name="note" rows={3} />
                  </div>
                </div>
                <button className={s.submit} type="submit">Ask for the table</button>
                <p className={s.small}>Anjali confirms every booking by text within the hour.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Saffron House</p>
        <p>A fictional family-run Indian restaurant. The family, dishes, prices and hours are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
        <p>The bowls are a generated image, drawn in the page's own colors.</p>
      </footer>
    </div>
  );
}
