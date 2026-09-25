import { TabbiedPattern } from 'tabbied/react';
import { circusposter, lantern } from 'tabbied/patterns';
import s from './el-farolito-truck.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'El Farolito: Taco truck, seven stops a week',
  description:
    'El Farolito is a little red taco truck with al pastor off the spit and corn tortillas pressed to order. Where it parks each day this week, the menu, the salsas and how to book it.',
};

/* Site colors. The bunting and the flag field take `transparent` first, so
   the pennants hang on the masa ground; the lanterns glow on the char panel. */
const CHAR = '#20161A';
const CHILE = '#E23E57';
const AGAVE = '#2BAE9A';
const SOL = '#F6C343';

const BUNTING = ['transparent', CHILE, AGAVE, SOL];
const FLAGS = ['transparent', CHILE, SOL, AGAVE, CHAR];
const LANTERNS = ['transparent', SOL, CHILE, AGAVE];

const NAV = [
  ['This week', '#week'],
  ['Menu', '#menu'],
  ['Salsas', '#salsas'],
  ['Catering', '#catering'],
  ['Follow', '#follow'],
  ['FAQ', '#faq'],
];

type Stop = {
  day: string;
  tag: string;
  tone: 'chile' | 'agave' | 'sol' | 'off';
  place: string;
  where: string;
  time: string;
  note: string;
};

const WEEK: Stop[] = [
  {
    day: 'Mon',
    tag: 'Day off',
    tone: 'off',
    place: 'In the shop',
    where: 'The truck gets its oil changed',
    time: 'Closed',
    note: 'We spend Monday roasting chiles and making the week of salsa.',
  },
  {
    day: 'Tue',
    tag: 'Lunch',
    tone: 'chile',
    place: 'Civic Plaza',
    where: '4th and Alder, by the fountain',
    time: '11 am - 2:30 pm',
    note: 'Facing the library steps. Text an order and skip the line.',
  },
  {
    day: 'Wed',
    tag: 'Lunch',
    tone: 'agave',
    place: 'Harbor Works',
    where: 'Business park, Lot C',
    time: '11 am - 2 pm',
    note: 'Between the print shop and the climbing gym.',
  },
  {
    day: 'Thu',
    tag: 'Evening',
    tone: 'sol',
    place: 'Cerveceria Norte',
    where: '1180 Rail Street',
    time: '5 pm - 10 pm',
    note: 'Tacos in the beer garden. All ages until 8.',
  },
  {
    day: 'Fri',
    tag: 'Late',
    tone: 'chile',
    place: 'Old Mill Night Market',
    where: 'Old Mill Square',
    time: '5 pm - midnight',
    note: 'Fish tacos start Friday and run all weekend.',
  },
  {
    day: 'Sat',
    tag: 'Market',
    tone: 'agave',
    place: 'Grove Park Market',
    where: 'East gate, stall 14',
    time: '9 am - 1:30 pm',
    note: 'Breakfast tacos with egg and chorizo until 11.',
  },
  {
    day: 'Sun',
    tag: 'Family',
    tone: 'sol',
    place: 'Lakeview Fields',
    where: 'North parking lot',
    time: '10 am - 3 pm',
    note: 'Soccer Sunday. Kids plates are $5 all day.',
  },
];

const TACOS = [
  { name: 'Al pastor', desc: 'Pork shaved off the trompo, pineapple, salsa verde', price: '3.50' },
  { name: 'Carne asada', desc: 'Grilled flank steak, guacamole, radish', price: '3.75' },
  { name: 'Pollo asado', desc: 'Achiote chicken, pickled red onion', price: '3.50' },
  { name: 'Carnitas', desc: 'Pork cooked slow in its own fat, crackling, salsa roja', price: '3.50' },
  { name: 'Hongos', desc: 'Mushrooms, roasted poblano, black beans. Vegan', price: '3.50' },
  { name: 'Pescado', desc: 'Beer-battered cod, cabbage, chipotle crema. Fri-Sun', price: '4.50' },
];

const MORE = [
  { name: 'Burrito', desc: 'Any filling, rice, beans, cheese, salsa', price: '11' },
  { name: 'Quesadilla', desc: 'Flour tortilla, Oaxaca cheese, one filling', price: '9' },
  { name: 'Nachos to share', desc: 'Beans, queso, pico, crema, jalapenos', price: '12' },
  { name: 'Elote', desc: 'Grilled corn, mayo, cotija, chile, lime', price: '5' },
  { name: 'Kids plate', desc: 'Two cheese tacos, rice, a horchata', price: '6' },
];

const DRINKS = [
  { name: 'Horchata', price: '4' },
  { name: 'Agua de jamaica', price: '4' },
  { name: 'Tamarindo', price: '4' },
  { name: 'Mexican cola', price: '3.50' },
];

const SALSAS = [
  { name: 'Pico de gallo', desc: 'Tomato, onion, cilantro, lime', heat: 0 },
  { name: 'Verde', desc: 'Roasted tomatillo and serrano', heat: 1 },
  { name: 'Roja', desc: 'Guajillo and arbol, toasted garlic', heat: 2 },
  { name: 'Morita', desc: 'Smoked chile, a little sweet', heat: 3 },
  { name: 'Habanero', desc: 'Orange habanero and carrot. Ask first', heat: 4 },
];

const PACKAGES = [
  {
    name: 'Taco bar',
    guests: 'Up to 30 guests',
    price: '$540',
    items: ['Three meats and the hongos', 'Rice, beans, three salsas', 'Two hours of service'],
  },
  {
    name: 'Truck party',
    guests: '30 to 80 guests',
    price: '$16 a guest',
    items: ['Everything in the taco bar', 'Aguas frescas in glass jars', 'Three hours, one more cook'],
  },
  {
    name: 'The big day',
    guests: '80 guests and up',
    price: 'From $14 a guest',
    items: ['Weddings, festivals, plant days', 'Late-night tacos at 10 pm', 'A tasting for two first'],
  },
];

const TERMS = [
  ['Deposit', '25% holds the date. The rest is due a week before.'],
  ['Distance', 'Free within 25 miles of the commissary, $2 a mile after that.'],
  ['Space', 'A flat, level spot about 30 feet long. We bring our own power.'],
  ['Notice', 'Three weeks for most dates, two months for June Saturdays.'],
];

const FAQ = [
  {
    q: 'Do you take cards?',
    a: 'Yes: cards, tap and cash. There is no minimum and no surcharge.',
  },
  {
    q: 'Can I order ahead?',
    a: 'Text your order and your name to the truck line. We text back a time, usually ten minutes, and you walk to the side window.',
  },
  {
    q: 'What is vegan or gluten-free?',
    a: 'The hongos taco is vegan, and so are the rice, the beans and every salsa. The corn tortillas are gluten-free; the fryer is shared with the fish.',
  },
  {
    q: 'What happens when it rains?',
    a: 'A drizzle, we stay. A downpour or wind, we go home and send a text by 10 am so nobody walks out for nothing.',
  },
  {
    q: 'Can the truck come to our office once a week?',
    a: 'On Mondays, yes: we are closed to the public then. Twenty orders guarantees the visit.',
  },
];

export default function ElFarolitoPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;500;700&family=Lilita+One&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">El Farolito</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="sms:5550142290">Text an order</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A string of pennants across the top, the truck parked on a road
            line under it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.bunting} aria-hidden="true">
            <TabbiedPattern
              pattern={circusposter}
              palette={BUNTING}
              fit="grid"
              cellSize={64}
              seed="farolito-bunting"
              redrawInterval={8000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroCopy}>
              <p className={s.kicker}>Taco truck, seven stops a week</p>
              <h1 id="hero-h" className={s.heroTitle}>
                Al pastor off the spit, <em>wherever we park.</em>
              </h1>
              <p className={s.heroLede}>
                A little red truck, a trompo turning from ten in the morning,
                and corn tortillas pressed to order. Here is where to find us
                this week, and what to order when you do.
              </p>
              <div className={s.heroActions}>
                <a className={s.btn} href="#week">This week's stops</a>
                <a className={s.btnGhost} href="#catering">Book the truck</a>
              </div>
            </div>
            <div className={s.heroArt}>
              <Artwork
                slug="el-farolito-truck-truck"
                alt="The El Farolito taco truck, side on, with its serving hatch open"
                inks={{ red: 'var(--chile)', blue: 'var(--agave)', yellow: 'var(--sol)', black: 'var(--char)' }}
                className={s.truck}
              />
              <span className={s.road} aria-hidden="true" />
              <p className={s.sticker}>
                <strong>3 for $10</strong>
                <span>any tacos</span>
              </p>
            </div>
          </div>
          <ul className={s.facts}>
            <li>Corn tortillas pressed to order</li>
            <li>A vegan taco at every stop</li>
            <li>Cards, tap and cash</li>
            <li>Text ahead, skip the line</li>
          </ul>
        </section>

        {/* -------------------------------------------------------- THE WEEK
            Seven day cards, each topped with a cut-paper strip. */}
        <section id="week" className={s.week} aria-labelledby="week-h">
          <div className={s.head}>
            <p className={s.eyebrow}>Where we park</p>
            <h2 id="week-h">This week's stops</h2>
            <p className={s.headNote}>
              Posted every Sunday night and pinned to the truck line. If the
              weather turns, we text by 10 am.
            </p>
          </div>
          <ol className={s.days}>
            {WEEK.map((d) => (
              <li key={d.day} className={`${s.day} ${s[d.tone]}`}>
                <div className={s.dayTop}>
                  <span className={s.dayName}>{d.day}</span>
                  <span className={s.dayTag}>{d.tag}</span>
                </div>
                <div className={s.dayBody}>
                  <time className={s.dayTime}>{d.time}</time>
                  <h3 className={s.dayPlace}>{d.place}</h3>
                  <p className={s.dayWhere}>{d.where}</p>
                  <p className={s.dayNote}>{d.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ MENU */}
        <section id="menu" className={s.menu} aria-labelledby="menu-h">
          <div className={s.menuArt}>
            <Artwork
              slug="el-farolito-truck-tacos"
              alt="Three tacos on a plate"
              inks={{ red: 'var(--chile)', blue: 'var(--agave)', yellow: 'var(--sol)', black: 'var(--char)' }}
              className={s.tacos}
            />
            <p className={s.menuDeal}>
              <strong>Any three tacos, $10</strong>
              <span>Mix them however you like.</span>
            </p>
          </div>
          <div className={s.menuCopy}>
            <div className={s.head}>
              <p className={s.eyebrow}>The menu</p>
              <h2 id="menu-h">Tacos first, then the rest</h2>
              <p className={s.headNote}>
                Every taco comes on two corn tortillas with onion, cilantro and
                a wedge of lime.
              </p>
            </div>
            <h3 className={s.groupHead}>Tacos</h3>
            <ul className={s.items}>
              {TACOS.map((t) => (
                <li key={t.name}>
                  <span className={s.itemName}>{t.name}</span>
                  <span className={s.itemDesc}>{t.desc}</span>
                  <span className={s.itemPrice}>{t.price}</span>
                </li>
              ))}
            </ul>
            <div className={s.menuCols}>
              <div>
                <h3 className={s.groupHead}>Bigger</h3>
                <ul className={s.items}>
                  {MORE.map((t) => (
                    <li key={t.name}>
                      <span className={s.itemName}>{t.name}</span>
                      <span className={s.itemDesc}>{t.desc}</span>
                      <span className={s.itemPrice}>{t.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={s.groupHead}>Aguas and sodas</h3>
                <ul className={s.items}>
                  {DRINKS.map((t) => (
                    <li key={t.name}>
                      <span className={s.itemName}>{t.name}</span>
                      <span className={s.itemPrice}>{t.price}</span>
                    </li>
                  ))}
                </ul>
                <p className={s.menuNote}>Prices in dollars, tax included.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- SALSAS */}
        <section id="salsas" className={s.salsas} aria-labelledby="salsas-h">
          <div className={s.salsaArt}>
            <Artwork
              slug="el-farolito-truck-chili"
              alt="A halved lime beside a red chili pepper"
              inks={{ red: 'var(--chile)', blue: 'var(--agave)', yellow: 'var(--sol)' }}
              className={s.chili}
            />
          </div>
          <div className={s.salsaCopy}>
            <div className={s.head}>
              <p className={s.eyebrow}>The salsa bar</p>
              <h2 id="salsas-h">Five salsas, mild to mean</h2>
              <p className={s.headNote}>
                Made on Mondays, in small tubs, and free with everything. The
                habanero is kept behind the window: ask and we will hand it over.
              </p>
            </div>
            <ol className={s.heatList}>
              {SALSAS.map((x) => (
                <li key={x.name} className={s[`heat${x.heat}`]}>
                  <span className={s.heatName}>{x.name}</span>
                  <span className={s.heatDesc}>{x.desc}</span>
                  <span className={s.heatMeter} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------- CATERING
            The char panel, with a few lanterns glowing in its far corner. */}
        <section id="catering" className={s.catering} aria-labelledby="catering-h">
          <div className={s.lanterns} aria-hidden="true">
            <TabbiedPattern
              pattern={lantern}
              palette={LANTERNS}
              fit="grid"
              cellSize={72}
              seed="farolito-lanterns"
              options={{ frequency: 0.5 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.cateringInner}>
            <div className={s.head}>
              <p className={s.eyebrow}>Catering</p>
              <h2 id="catering-h">Book the truck for your day</h2>
              <p className={s.headNote}>
                Weddings, birthdays, office Fridays and block parties. We pull
                up, open the hatch and cook for everybody, then leave the place
                cleaner than we found it.
              </p>
            </div>
            <ul className={s.packages}>
              {PACKAGES.map((p) => (
                <li key={p.name} className={s.pack}>
                  <h3 className={s.packName}>{p.name}</h3>
                  <p className={s.packGuests}>{p.guests}</p>
                  <p className={s.packPrice}>{p.price}</p>
                  <ul className={s.packItems}>
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <dl className={s.terms}>
              {TERMS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className={s.cateringCta}>
              <a className={s.btnSol} href="mailto:truck@elfarolito.example">truck@elfarolito.example</a>
              <span className={s.cateringOr}>or call Rosa on</span>
              <a className={s.cateringPhone} href="tel:5550142291">(555) 014-2291</a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- FOLLOW
            The flags at full strength, with the sign-up card pinned on top. */}
        <section id="follow" className={s.follow} aria-labelledby="follow-h">
          <div className={s.flags} aria-hidden="true">
            <TabbiedPattern
              pattern={circusposter}
              palette={FLAGS}
              fit="grid"
              cellSize={72}
              seed="farolito-flags"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.followCard}>
            <p className={s.eyebrow}>Follow along</p>
            <h2 id="follow-h">The week, by text, every Sunday</h2>
            <p className={s.followLede}>
              One message on Sunday night with all seven stops, and one more
              if the weather changes the plan. Nothing else, ever.
            </p>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span>Your mobile number</span>
                <input type="tel" name="phone" placeholder="(555) 000-0000" autoComplete="tel" />
              </label>
              <button type="submit" className={s.btn}>Send me the week</button>
            </form>
            <ul className={s.handles}>
              <li>@elfarolito.truck</li>
              <li>Truck line (555) 014-2290</li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.head}>
            <p className={s.eyebrow}>Before you walk over</p>
            <h2 id="faq-h">Questions we get at the window</h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>El Farolito</p>
            <p className={s.footTag}>A little red taco truck, seven stops a week.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Find us</h2>
            <ul className={s.footLinks}>
              <li><a href="#week">This week's stops</a></li>
              <li><a href="#menu">The menu</a></li>
              <li><a href="#catering">Catering</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footHead}>Get in touch</h2>
            <ul className={s.footLinks}>
              <li><a href="sms:5550142290">Truck line (555) 014-2290</a></li>
              <li><a href="mailto:hola@elfarolito.example">hola@elfarolito.example</a></li>
              <li>Commissary: 44 Tannery Lane, no walk-up</li>
            </ul>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional taco truck. Stops, prices and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the page's own colors; the pictures follow the same palette.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
