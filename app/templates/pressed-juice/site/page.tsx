import { TabbiedPattern } from 'tabbied/react';
import { lobe, pebble } from 'tabbied/patterns';
import s from './pressed-juice.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Pressed: Cold-pressed juice bar, Orchard Street',
  description:
    'Pressed makes six cold-pressed juices every morning, plus one, three and five day cleanses and smoothie bowls. Three counters in town, open from 7.',
};

/* Site colors. Both fields sit on `transparent`: the leaves on the lime
   panel behind the bottle, the seeds on the page's own cream. */
const INK = '#1E2A1C';
const ORANGE = '#FF8A1F';
const LIME = '#7CB518';
const BERRY = '#E63946';
const PALE = '#FCE9CF';
const PAPER = '#FFF8EC';

const LEAVES = ['transparent', PAPER, ORANGE, PALE];
const SEEDS = ['transparent', ORANGE, LIME, BERRY, PALE];

const NAV = [
  ['Juices', '#juices'],
  ['Cleanses', '#cleanses'],
  ['Bowls', '#bowls'],
  ['Locations', '#locations'],
];

/* A bottle on the counter. `size` sets its height: a pint stands tallest,
   a shot comes up to its shoulder. */
type Juice = {
  no: string;
  name: string;
  tone: 'orange' | 'lime' | 'berry' | 'pale' | 'ink';
  size: 'tall' | 'mid' | 'shot';
  oz: string;
  price: string;
  taste: string;
  ingredients: string[];
};

const JUICES: Juice[] = [
  { no: '01', name: 'Sunrise', tone: 'orange', size: 'tall', oz: '16 oz', price: '$9', taste: 'Sweet, then a kick', ingredients: ['Orange', 'Carrot', 'Ginger', 'Turmeric'] },
  { no: '02', name: 'Green Nine', tone: 'lime', size: 'tall', oz: '16 oz', price: '$10', taste: 'Grassy and bright', ingredients: ['Kale', 'Spinach', 'Cucumber', 'Celery', 'Parsley', 'Apple', 'Lemon'] },
  { no: '03', name: 'Beet Street', tone: 'berry', size: 'tall', oz: '16 oz', price: '$9', taste: 'Earthy and tart', ingredients: ['Beet', 'Apple', 'Lemon', 'Ginger'] },
  { no: '04', name: 'Golden Mylk', tone: 'pale', size: 'mid', oz: '12 oz', price: '$11', taste: 'Creamy, warm spice', ingredients: ['Cashew', 'Dates', 'Turmeric', 'Cinnamon', 'Sea salt'] },
  { no: '05', name: 'Black Lemonade', tone: 'ink', size: 'tall', oz: '16 oz', price: '$8', taste: 'Sharp and clean', ingredients: ['Lemon', 'Charcoal', 'Agave', 'Filtered water'] },
  { no: '06', name: 'Fire Shot', tone: 'orange', size: 'shot', oz: '2 oz', price: '$4', taste: 'One gulp, eyes open', ingredients: ['Ginger', 'Lemon', 'Cayenne'] },
];

type Cleanse = {
  days: string;
  unit: string;
  title: string;
  price: string;
  bottles: string;
  note: string;
  fruit: { key: string; inks: Record<string, string> }[];
};

const HALF_ORANGE = { red: 'var(--orange)', yellow: 'var(--pale)' };
const HALF_LIME = { red: 'var(--lime)', yellow: 'var(--pale)' };
const HALF_GRAPEFRUIT = { red: 'var(--berry)', yellow: 'var(--pale)' };

const CLEANSES: Cleanse[] = [
  {
    days: '1',
    unit: 'day',
    title: 'The reset',
    price: '$58',
    bottles: '6 juices',
    note: 'A Saturday that ends on a Sunday feeling lighter. Good for a first go.',
    fruit: [{ key: 'a', inks: HALF_ORANGE }],
  },
  {
    days: '3',
    unit: 'days',
    title: 'The classic',
    price: '$165',
    bottles: '18 juices',
    note: 'The one most people come back for. Day two is the hard one, day three is easy.',
    fruit: [
      { key: 'a', inks: HALF_ORANGE },
      { key: 'b', inks: HALF_LIME },
      { key: 'c', inks: HALF_GRAPEFRUIT },
    ],
  },
  {
    days: '5',
    unit: 'days',
    title: 'The long one',
    price: '$265',
    bottles: '30 juices',
    note: 'A working week on juice. We check in by text every morning and adjust the order.',
    fruit: [
      { key: 'a', inks: HALF_ORANGE },
      { key: 'b', inks: HALF_LIME },
      { key: 'c', inks: HALF_GRAPEFRUIT },
      { key: 'd', inks: HALF_ORANGE },
      { key: 'e', inks: HALF_LIME },
    ],
  },
];

const DAY = [
  ['8 am', 'Green Nine'],
  ['10 am', 'Sunrise'],
  ['12:30 pm', 'Beet Street'],
  ['3 pm', 'Green Nine'],
  ['5:30 pm', 'Black Lemonade'],
  ['8 pm', 'Golden Mylk'],
];

const BOWLS = [
  {
    name: 'Acai Classic',
    base: 'Acai, banana, strawberry, oat milk',
    top: 'Granola, banana, blueberries, honey',
    price: '$12',
  },
  {
    name: 'Pink Pitaya',
    base: 'Dragon fruit, mango, pineapple, coconut water',
    top: 'Kiwi, coconut flakes, hemp seeds',
    price: '$13',
  },
  {
    name: 'Green Bowl',
    base: 'Spinach, avocado, banana, mango, almond milk',
    top: 'Granola, green apple, pumpkin seeds',
    price: '$12',
  },
  {
    name: 'PB Crunch',
    base: 'Banana, cacao, peanut butter, oat milk',
    top: 'Peanuts, cacao nibs, banana, a pinch of salt',
    price: '$12',
  },
];

const ADDONS = ['Extra granola $1', 'Nut butter $1.50', 'Collagen $2', 'Chia pudding $2.50'];

const LOCATIONS = [
  {
    name: 'The Press Room',
    addr: '48 Orchard Street',
    note: 'Where every bottle is pressed, at 5 am. Seats inside and a bench out front.',
    hours: [
      ['Mon-Fri', '7 am - 7 pm'],
      ['Sat-Sun', '8 am - 5 pm'],
    ],
  },
  {
    name: 'Riverside Market',
    addr: 'Stall 12, Riverside Market Hall',
    note: 'Bowls and the full juice counter, next to the bakery stall.',
    hours: [
      ['Tue-Sat', '8 am - 4 pm'],
      ['Sun', '9 am - 3 pm'],
    ],
  },
  {
    name: 'Campus Kiosk',
    addr: 'Library Plaza, Northgate College',
    note: 'Juices and shots only. Show a student card for a dollar off.',
    hours: [
      ['Mon-Fri', '7:30 am - 3 pm'],
      ['Weekends', 'Closed'],
    ],
  },
];

const FAQS = [
  {
    q: 'How long does a juice keep?',
    a: 'Three days in the fridge from the date on the cap. Nothing is heated or pasteurized, so it does not last longer than that, and it tastes best on day one.',
  },
  {
    q: 'Do you take the bottles back?',
    a: 'Yes, rinsed, at any counter. A dollar back for each glass bottle, or ten returned bottles for a free juice.',
  },
  {
    q: 'How do I order a cleanse?',
    a: 'Online or at a counter, 48 hours ahead. Pick it up from 7 am on your first day, or have it delivered in a cool bag before 8 for $6 a day.',
  },
];

export default function PressedJuicePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;700;800;900&family=Martian+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDot} aria-hidden="true" />
          <span className={s.markName}>Pressed</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBtn} href="#cleanses">Order ahead</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A bottle and its fruit standing on the counter, in front of a
            lime panel of leaves. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Cold-pressed juice, Orchard Street</p>
            <h1 id="hero-h" className={s.title}>
              Pressed at five, <em>gone by six.</em>
            </h1>
            <p className={s.lede}>
              Six juices, pressed every morning from whole fruit and vegetables
              and bottled in glass. No water added, nothing heated, nothing
              kept past its third day.
            </p>
            <div className={s.actions}>
              <a className={s.btn} href="#juices">See the counter</a>
              <a className={s.btnLine} href="#cleanses">Book a cleanse</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt>5 am</dt>
                <dd>Pressing starts</dd>
              </div>
              <div>
                <dt>3 lb</dt>
                <dd>Of produce a bottle</dd>
              </div>
              <div>
                <dt>$1</dt>
                <dd>Back for every bottle</dd>
              </div>
            </dl>
          </div>

          <div className={s.stage}>
            <div className={s.panel}>
              <div className={s.leaves} aria-hidden="true">
                <TabbiedPattern
                  pattern={lobe}
                  palette={LEAVES}
                  fit="grid"
                  cellSize={64}
                  seed="press-room"
                  options={{ frequency: 0.45 }}
                  redrawInterval={8000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <Artwork
              slug="pressed-juice-pineapple"
              alt=""
              inks={{ red: 'var(--orange)', yellow: 'var(--pale)', blue: 'var(--ink)' }}
              className={s.heroPine}
            />
            <Artwork
              slug="pressed-juice-bottle"
              alt="A glass bottle of orange juice with a leaf on its label"
              inks={{ red: 'var(--orange)', blue: 'var(--ink)', yellow: 'var(--paper)' }}
              className={s.heroBottle}
            />
            <Artwork
              slug="pressed-juice-orange"
              alt="A halved orange"
              inks={HALF_ORANGE}
              className={s.heroOrange}
            />
            <span className={s.heroCounter} aria-hidden="true" />
          </div>
        </section>

        {/* --------------------------------------------------------- COUNTER
            The juices as bottles lined up on the counter, each one a column
            of its own color with its label, ingredients and price. */}
        <section id="juices" className={s.juices} aria-labelledby="juices-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The counter</p>
            <h2 id="juices-h">Six bottles, pressed this morning</h2>
            <p className={s.secNote}>
              Every juice is in the fridge by 7. When a flavor sells out, it is
              gone until tomorrow; the board by the till says what is left.
            </p>
          </div>
          <ul className={s.shelf}>
            {JUICES.map((j) => (
              <li key={j.no} className={s.bottle} data-tone={j.tone} data-size={j.size}>
                <span className={s.cap} aria-hidden="true" />
                <div className={s.glass}>
                  <span className={s.bottleNo}>{j.no}</span>
                  <div className={s.label}>
                    <h3 className={s.bottleName}>{j.name}</h3>
                    <p className={s.bottleTaste}>{j.taste}</p>
                  </div>
                  <ul className={s.ingredients}>
                    {j.ingredients.map((ing) => (
                      <li key={ing}>{ing}</li>
                    ))}
                  </ul>
                  <p className={s.bottlePrice}>
                    <strong>{j.price}</strong>
                    <span>{j.oz}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className={s.counterNote}>
            Any juice as a 2 oz tasting pour for $2. Glass bottles only; bring
            one back for a dollar.
          </p>
        </section>

        {/* -------------------------------------------------------- CLEANSES */}
        <section id="cleanses" className={s.cleanses} aria-labelledby="cleanses-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Cleanses</p>
            <h2 id="cleanses-h">One, three or five days</h2>
            <p className={s.secNote}>
              Six bottles a day, in the order you drink them, numbered on the
              cap. Order 48 hours ahead; pick up from 7 or have them delivered.
            </p>
          </div>
          <div className={s.cleanseGrid}>
            <ul className={s.plans}>
              {CLEANSES.map((c) => (
                <li key={c.days} className={s.plan}>
                  <div className={s.planFruit} aria-hidden="true">
                    {c.fruit.map((f) => (
                      <Artwork key={f.key} slug="pressed-juice-orange" alt="" inks={f.inks} className={s.half} />
                    ))}
                  </div>
                  <p className={s.planDays}>
                    <strong>{c.days}</strong>
                    <span>{c.unit}</span>
                  </p>
                  <h3 className={s.planTitle}>{c.title}</h3>
                  <p className={s.planNote}>{c.note}</p>
                  <p className={s.planPrice}>
                    <strong>{c.price}</strong>
                    <span>{c.bottles}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className={s.day}>
              <h3 className={s.dayHead}>A day on the cleanse</h3>
              <ol className={s.dayList}>
                {DAY.map(([t, j]) => (
                  <li key={t}>
                    <time>{t}</time>
                    <span>{j}</span>
                  </li>
                ))}
              </ol>
              <p className={s.dayNote}>
                Drink water in between, as much as you like. Swap any bottle
                for another when you order.
              </p>
            </div>
          </div>
        </section>

        {/* The pulp band: pips and drops in the fruit colors, between sections. */}
        <div className={s.seedBand} aria-hidden="true">
          <TabbiedPattern
            pattern={pebble}
            palette={SEEDS}
            fit="grid"
            cellSize={52}
            seed="pips"
            options={{ frequency: 0.7 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- BOWLS */}
        <section id="bowls" className={s.bowls} aria-labelledby="bowls-h">
          <div className={s.bowlArt}>
            <Artwork
              slug="pressed-juice-pineapple"
              alt="A pineapple"
              inks={{ red: 'var(--orange)', yellow: 'var(--pale)', blue: 'var(--lime)' }}
              className={s.bowlPine}
            />
          </div>
          <div className={s.bowlBody}>
            <p className={s.secKick}>Smoothie bowls</p>
            <h2 id="bowls-h">Thick enough to stand a spoon in</h2>
            <p className={s.bowlLede}>
              Blended to order with frozen fruit and no ice, so they stay thick
              to the last spoonful. Every bowl is 16 oz and vegan unless you add
              honey.
            </p>
            <ul className={s.bowlList}>
              {BOWLS.map((b) => (
                <li key={b.name}>
                  <h3>{b.name}</h3>
                  <strong>{b.price}</strong>
                  <p className={s.bowlBase}>{b.base}</p>
                  <p className={s.bowlTop}>{b.top}</p>
                </li>
              ))}
            </ul>
            <ul className={s.addons}>
              {ADDONS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- LOCATIONS */}
        <section id="locations" className={s.locations} aria-labelledby="locations-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Locations and hours</p>
            <h2 id="locations-h">Three counters in town</h2>
            <p className={s.secNote}>
              Order ahead by text at (555) 017-3380 and skip the line at any of
              them. Delivery within three miles of the Press Room, $4.
            </p>
          </div>
          <ul className={s.places}>
            {LOCATIONS.map((l, i) => (
              <li key={l.name} className={s.place}>
                <span className={s.placeNo}>{`0${i + 1}`}</span>
                <h3 className={s.placeName}>{l.name}</h3>
                <p className={s.placeAddr}>{l.addr}</p>
                <p className={s.placeNote}>{l.note}</p>
                <dl className={s.placeHours}>
                  {l.hours.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <div className={s.faq}>
            <h3 className={s.faqHead}>Good to know</h3>
            {FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div className={s.footBrand}>
            <p className={s.footName}>Pressed</p>
            <p className={s.footTag}>Cold-pressed juice, bowls and cleanses. 48 Orchard Street.</p>
          </div>
          <p className={s.footAddr}>
            hello@pressed.example
            <br />
            (555) 017-3380
          </p>
          <Artwork
            slug="pressed-juice-bottle"
            alt=""
            inks={{ red: 'var(--lime)', blue: 'var(--orange)', yellow: 'var(--pale)' }}
            className={s.footBottle}
          />
        </div>
        <div className={s.footFine}>
          <p>A fictional juice bar. Juices, prices and addresses are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
