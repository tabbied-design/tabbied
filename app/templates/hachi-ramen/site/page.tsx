import { TabbiedPattern } from 'tabbied/react';
import { bowl, curl } from 'tabbied/patterns';
import s from './hachi-ramen.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Hachi Ramen: Ramen counter, Canal Street',
  description:
    'A twelve-seat ramen counter with three broths, noodles made every morning and no reservations. The menu, the sides, the drinks and how the queue works.',
};

/* Site colors. The noodle loops behind the hero are mostly the pale tone
   with the odd gold one; the band of stacked bowls is chili and gold. */
const INK = '#161311';
const CHILI = '#C8102E';
const GOLD = '#D9A441';
const PALE = '#E6DCCB';

const NOODLES = ['transparent', PALE, PALE, GOLD];
const BOWLS = ['transparent', CHILI, GOLD, INK];

const NAV = [
  ['The bowl', '#bowl'],
  ['Menu', '#menu'],
  ['Sides', '#sides'],
  ['Drinks', '#drinks'],
  ['Queue and hours', '#queue'],
];

/* The anatomy: each part has a point on the picture (x, y in the plate's
   100 by 48 box) and a label on one side at its own height (ly). */
type Part = {
  n: string;
  name: string;
  text: string;
  side: 'left' | 'right';
  x: number;
  y: number;
  ly: number;
};

const PARTS: Part[] = [
  {
    n: '1',
    name: 'Broth',
    text: 'Pork bone, chicken or kombu, on the stove eight hours before the first bowl goes out.',
    side: 'right',
    x: 68.4,
    y: 20.5,
    ly: 9,
  },
  {
    n: '2',
    name: 'Noodles',
    text: 'Made every morning in the back room. Thin and straight for tonkotsu, wavy for miso.',
    side: 'left',
    x: 48.4,
    y: 12.5,
    ly: 8,
  },
  {
    n: '3',
    name: 'Chashu',
    text: 'Pork belly rolled, braised in soy and mirin, sliced thick and torched to order.',
    side: 'right',
    x: 62,
    y: 22.6,
    ly: 24,
  },
  {
    n: '4',
    name: 'Egg',
    text: 'Ajitama: six and a half minutes, then a night in the tare. The yolk stays jammy.',
    side: 'left',
    x: 38.5,
    y: 22.2,
    ly: 23,
  },
  {
    n: '5',
    name: 'Toppings',
    text: 'Scallion, menma, wood ear, nori and a spoon of black garlic oil if you ask.',
    side: 'right',
    x: 54.6,
    y: 24.6,
    ly: 39,
  },
  {
    n: '6',
    name: 'The bowl',
    text: 'Heavy porcelain, warmed in hot water so the broth is still hot at the bottom.',
    side: 'left',
    x: 39.9,
    y: 33.4,
    ly: 38,
  },
];

type Broth = {
  name: string;
  from: string;
  text: string;
  tone: 'pale' | 'gold' | 'chili' | 'ink';
  body: string;
  bowls: { name: string; what: string; price: string }[];
};

const BROTHS: Broth[] = [
  {
    name: 'Tonkotsu',
    from: 'Pork bone',
    text: 'Boiled hard until it turns milky. Rich, round and the one most people come for.',
    tone: 'pale',
    body: 'Rich',
    bowls: [
      { name: 'Hachi tonkotsu', what: 'Chashu, egg, wood ear, scallion, nori', price: '$17' },
      { name: 'Black garlic', what: 'The same, with burnt garlic oil on top', price: '$18' },
      { name: 'Red tonkotsu', what: 'Chili oil and spiced ground pork', price: '$18' },
    ],
  },
  {
    name: 'Shoyu',
    from: 'Chicken, dashi',
    text: 'Clear, amber and seasoned with aged soy. The lightest bowl and the chef\'s favorite.',
    tone: 'gold',
    body: 'Light',
    bowls: [
      { name: 'Tokyo shoyu', what: 'Chashu, egg, menma, naruto, scallion', price: '$16' },
      { name: 'Yuzu shoyu', what: 'Yuzu peel and chicken breast, sliced thin', price: '$17' },
      { name: 'Duck shoyu', what: 'Seared duck breast, leek and watercress', price: '$21' },
    ],
  },
  {
    name: 'Miso',
    from: 'Chicken, miso',
    text: 'Red, white and barley miso whisked in at the pass, with ground sesame.',
    tone: 'chili',
    body: 'Hearty',
    bowls: [
      { name: 'Hokkaido miso', what: 'Corn, butter, bean sprouts, chashu', price: '$17' },
      { name: 'Tan tan', what: 'Sesame, chili and spiced pork, bok choy', price: '$18' },
      { name: 'Hot miso', what: 'Spice level 3 to start, egg, scallion', price: '$17' },
    ],
  },
  {
    name: 'Kombu',
    from: 'Kelp, shiitake',
    text: 'Our vegan broth, made in its own pot with its own ladle. No fish, no dairy.',
    tone: 'ink',
    body: 'Clean',
    bowls: [
      { name: 'Vegan shio', what: 'Tofu, corn, menma, wood ear, scallion', price: '$16' },
      { name: 'Vegan tan tan', what: 'Sesame, chili, soy mince, bok choy', price: '$17' },
    ],
  },
];

const EXTRAS = [
  ['Kaedama (a second portion of noodles)', '$3'],
  ['Extra egg', '$2.50'],
  ['Extra chashu, two slices', '$4'],
  ['Black garlic oil', '$1.50'],
  ['Spice level 0-5', 'free'],
];

const SIDES = [
  { name: 'Pork gyoza', note: 'Six, pan-fried with a lace skirt', price: '$8' },
  { name: 'Vegetable gyoza', note: 'Six, cabbage, shiitake and chive', price: '$7' },
  { name: 'Karaage', note: 'Fried chicken thigh, yuzu mayo', price: '$9' },
  { name: 'Chashu bao', note: 'Two buns, hoisin, cucumber', price: '$7' },
  { name: 'Edamame', note: 'Salt, or chili and garlic', price: '$5' },
  { name: 'Tamago kake gohan', note: 'Rice, raw egg, soy, nori', price: '$5' },
  { name: 'Pickles', note: 'Whatever is in the jars this week', price: '$4' },
];

const DRINKS = [
  { group: 'Beer', items: [['Draft lager', '$7'], ['Black lager', '$8'], ['Yuzu sour', '$8']] },
  { group: 'Sake and more', items: [['Junmai, 180 ml', '$11'], ['Umeshu on ice', '$9'], ['Yuzu highball', '$10']] },
  { group: 'No alcohol', items: [['Ramune soda', '$4'], ['Iced barley tea', '$3'], ['Hot green tea', 'free']] },
];

const QUEUE_STEPS = [
  ['Write your name', 'On the board by the door, with how many of you. Come back when you like; we hold your place for ten minutes.'],
  ['Buy a ticket', 'At the machine inside: pick your bowl, pay by card or cash, hand the ticket to whoever is at the pass.'],
  ['Take a stool', 'We seat in the order of the board. Parties of more than four are split along the counter.'],
];

const WAIT = [
  { time: '17:30', minutes: 5 },
  { time: '18:30', minutes: 25 },
  { time: '19:30', minutes: 40 },
  { time: '20:30', minutes: 30 },
  { time: '21:30', minutes: 10 },
  { time: '22:30', minutes: 0 },
];

const HOURS = [
  ['Tuesday to Thursday', '11:30 - 14:30, 17:30 - 22:00'],
  ['Friday and Saturday', '11:30 - 14:30, 17:30 - 23:30'],
  ['Sunday', '12:00 - 20:00'],
  ['Monday', 'Closed, the broth still cooks'],
];

export default function HachiRamenPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true">{'\u516B'}</span>
          <span className={s.brandName}>Hachi Ramen</span>
        </a>
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
        {/* ----------------------------------------------------------- BOWL
            The bowl drawn large, its parts numbered, each label on a leader
            line. Pale noodle loops fill the width behind it. */}
        <section id="bowl" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroHead}>
            <div className={s.heroTitleWrap}>
              <p className={s.kicker}>Ramen counter, 8 Canal Street</p>
              <h1 id="hero-h" className={s.heroTitle}>
                Eight hours of broth,
                <br />
                <em>one bowl.</em>
              </h1>
            </div>
            <div className={s.heroAside}>
              <p className={s.heroLede}>
                Twelve stools, three broths and a vegan one, noodles made every
                morning and no reservations. Here is what goes into a bowl.
              </p>
              <div className={s.heroActions}>
                <a className={s.btn} href="#menu">See the menu</a>
                <a className={s.btnGhost} href="#queue">How the queue works</a>
              </div>
            </div>
          </div>

          <div className={s.stage}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={curl}
                palette={NOODLES}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={64}
                seed="hachi-noodles"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.plate}>
              <Artwork
                slug="hachi-ramen-bowl"
                alt="A bowl of ramen with noodles lifted on chopsticks and a halved egg"
                inks={{ red: 'var(--chili)', blue: 'var(--ink)', yellow: 'var(--gold)', black: 'var(--ink)' }}
                className={s.bowl}
              />
              <svg className={s.leaders} viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true">
                {PARTS.map((p) => (
                  <line key={p.n} x1={p.side === 'left' ? 23 : 77} y1={p.ly} x2={p.x} y2={p.y} vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
              {PARTS.map((p) => (
                <span
                  key={p.n}
                  className={s.pin}
                  style={{ left: `${p.x}%`, top: `${(p.y / 48) * 100}%` }}
                  aria-hidden="true">
                  {p.n}
                </span>
              ))}
            </div>

            <ol className={s.parts}>
              {PARTS.map((p) => (
                <li
                  key={p.n}
                  className={p.side === 'left' ? s.partLeft : s.partRight}
                  style={{ top: `${(p.ly / 48) * 100}%` }}>
                  <span className={s.partNo}>{p.n}</span>
                  <strong className={s.partName}>{p.name}</strong>
                  <p className={s.partText}>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- MENU
            Four columns, one per broth, each with its own color chip. */}
        <section id="menu" className={s.menu} aria-labelledby="menu-h">
          <div className={s.secHead}>
            <h2 id="menu-h">The menu, by broth</h2>
            <p className={s.secNote}>
              Pick the broth first, then the bowl. Every bowl can be made
              spicier, from 0 to 5, and every one comes with a second portion
              of noodles for three dollars.
            </p>
          </div>

          <div className={s.broths}>
            {BROTHS.map((b) => (
              <article key={b.name} className={s.broth} data-tone={b.tone} aria-labelledby={`broth-${b.name}`}>
                <div className={s.brothHead}>
                  <span className={s.swatch} aria-hidden="true" />
                  <h3 id={`broth-${b.name}`}>{b.name}</h3>
                  <p className={s.brothFrom}>{b.from}</p>
                </div>
                <strong className={s.brothBody}>{b.body}</strong>
                <p className={s.brothText}>{b.text}</p>
                <ul className={s.bowls}>
                  {b.bowls.map((item) => (
                    <li key={item.name}>
                      <div className={s.bowlTop}>
                        <strong>{item.name}</strong>
                        <span className={s.bowlPrice}>{item.price}</span>
                      </div>
                      <span className={s.bowlWhat}>{item.what}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={s.extras}>
            <div className={s.extrasArt}>
              <Artwork
                slug="hachi-ramen-lantern"
                alt=""
                inks={{ red: 'var(--chili)', blue: 'var(--ink)', yellow: 'var(--gold)' }}
                className={s.extrasLantern}
              />
            </div>
            <h3 className={s.extrasHead}>On any bowl</h3>
            <dl className={s.extrasList}>
              {EXTRAS.map(([what, price]) => (
                <div key={what}>
                  <dt>{what}</dt>
                  <dd>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={bowl}
            palette={BOWLS}
            options={{ frequency: 0.9 }}
            fit="grid"
            cellSize={56}
            seed="hachi-stack"
            redrawInterval={8000}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------- SIDES, DRINKS */}
        <div className={s.pair}>
          <section id="sides" className={s.sides} aria-labelledby="sides-h">
            <div className={s.sidesArt}>
              <Artwork
                slug="hachi-ramen-gyoza"
                alt="Three pan-fried gyoza dumplings"
                inks={{ red: 'var(--chili)', blue: 'var(--ink)', yellow: 'var(--gold)' }}
                className={s.gyoza}
              />
            </div>
            <h2 id="sides-h">Sides</h2>
            <p className={s.pairNote}>The gyoza are folded by hand at four every afternoon, about six hundred a day.</p>
            <ul className={s.list}>
              {SIDES.map((d) => (
                <li key={d.name}>
                  <div className={s.listTop}>
                    <strong>{d.name}</strong>
                    <span className={s.dots} aria-hidden="true" />
                    <span className={s.listPrice}>{d.price}</span>
                  </div>
                  <span className={s.listNote}>{d.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="drinks" className={s.drinks} aria-labelledby="drinks-h">
            <h2 id="drinks-h">Drinks</h2>
            <p className={s.pairNote}>Two taps, a short sake list and cold tea on the house when the queue is long.</p>
            {DRINKS.map((g) => (
              <div key={g.group} className={s.drinkGroup}>
                <h3>{g.group}</h3>
                <ul className={s.list}>
                  {g.items.map(([name, price]) => (
                    <li key={name}>
                      <div className={s.listTop}>
                        <strong>{name}</strong>
                        <span className={s.dots} aria-hidden="true" />
                        <span className={s.listPrice}>{price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>

        {/* ----------------------------------------------------------- QUEUE
            Ink, the paper lantern lit in the window. */}
        <section id="queue" className={s.queue} aria-labelledby="queue-h">
          <div className={s.queueInner}>
            <div className={s.queueArt}>
              <span className={s.cord} aria-hidden="true" />
              <Artwork
                slug="hachi-ramen-lantern"
                alt="A round paper lantern"
                inks={{ red: 'var(--chili)', blue: 'var(--pale)', yellow: 'var(--gold)' }}
                className={s.queueLantern}
              />
            </div>

            <div className={s.queueBody}>
              <p className={s.queueKicker}>No reservations</p>
              <h2 id="queue-h">The queue, and when it is shortest</h2>
              <ol className={s.qSteps}>
                {QUEUE_STEPS.map(([title, text]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>

              <div className={s.wait}>
                <h3>A Friday night, typical wait</h3>
                <ul className={s.bars}>
                  {WAIT.map((w) => (
                    <li key={w.time} style={{ '--m': w.minutes } as React.CSSProperties}>
                      <span className={s.barValue}>{`${w.minutes} min`}</span>
                      <span className={s.barFill} aria-hidden="true" />
                      <span className={s.barTime}>{w.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={s.visit}>
              <h3>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([day, time]) => (
                  <div key={day}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
              <h3>Find us</h3>
              <p className={s.address}>8 Canal Street, under the red lantern, two doors from the bridge.</p>
              <a className={s.visitLink} href="tel:+15550168808">(555) 016-8808</a>
              <a className={s.visitLink} href="mailto:counter@hachi.example">counter@hachi.example</a>
              <p className={s.takeaway}>Broth kits to take home: two portions of broth, noodles and toppings, $24. Order by 14:00 for the evening.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <span className={s.footMark} aria-hidden="true">{'\u516B'}</span>
            <div>
              <p className={s.footName}>Hachi Ramen</p>
              <p className={s.footTag}>Eight hours of broth, one bowl. 8 Canal Street.</p>
            </div>
          </div>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p>A fictional ramen shop. The menu, prices, hours and address are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
