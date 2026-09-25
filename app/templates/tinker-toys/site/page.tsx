import { TabbiedPattern } from 'tabbied/react';
import { bauhaus, stitch } from 'tabbied/patterns';
import s from './tinker-toys.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Tinker & Co.: Toy store, Orchard Street',
  description:
    'Tinker & Co. is an independent toy store on Orchard Street, sorted by age from newborn to nine and up. Staff picks, Saturday story time, and free gift wrap on everything.',
};

/* Site colors. The hero shapes and the wrapping paper both sit on the
   cream ground: `transparent` first in both. */
const PINK = '#EF476F';
const BLUE = '#118AB2';
const YELLOW = '#FFD166';
const INK = '#1F2240';

const SHAPES = ['transparent', YELLOW, PINK, BLUE, YELLOW];
const PAPER = ['transparent', PINK, BLUE, YELLOW, INK];

const NAV = [
  ['By age', '#ages'],
  ['Featured', '#featured'],
  ['Story time', '#events'],
  ['Gift wrap', '#gifts'],
  ['Visit', '#visit'],
];

const PROMISES = ['Sorted by age', 'Try anything on the play table', 'Free gift wrap', 'Returns for 60 days'];

type Pick = { name: string; price: string };

type Age = {
  id: string;
  band: string;
  label: string;
  blurb: string;
  look: string;
  picks: Pick[];
};

const AGES: Age[] = [
  {
    id: 'tiny',
    band: '0-2',
    label: 'Babies and toddlers',
    blurb:
      'Things to hold, chew, stack and drop again. Nothing smaller than a toilet-paper tube, and nothing that needs a battery.',
    look: 'Solid wood, water-based paint, washable cloth.',
    picks: [
      { name: 'Rainbow ring stacker', price: '$24' },
      { name: 'Crinkle cloth book', price: '$16' },
      { name: 'Beech push walker', price: '$89' },
      { name: 'Bath boats, set of 3', price: '$18' },
    ],
  },
  {
    id: 'small',
    band: '3-5',
    label: 'Preschool',
    blurb:
      'Pretend play and first puzzles. Trains that link with magnets, kitchens with real-feeling pans, and puzzles of 12 to 48 pieces.',
    look: 'Toys that grow a story rather than tell one.',
    picks: [
      { name: 'Magnetic train, 3 cars', price: '$38' },
      { name: 'Wooden play kitchen', price: '$145' },
      { name: 'Floor puzzle, 24 pieces', price: '$22' },
      { name: 'Dress-up cape and crown', price: '$28' },
    ],
  },
  {
    id: 'middle',
    band: '6-8',
    label: 'Early readers',
    blurb:
      'Building sets, first board games and the rocket everyone asks about. Instructions they can read on their own, mostly.',
    look: 'Two players or more, and nothing over an hour.',
    picks: [
      { name: 'Stomp rocket, 3 rockets', price: '$29' },
      { name: 'Marble run, 80 pieces', price: '$54' },
      { name: 'Cooperative forest game', price: '$32' },
      { name: 'Loom and bead kit', price: '$19' },
    ],
  },
  {
    id: 'big',
    band: '9+',
    label: 'Makers and strategists',
    blurb: 'Kits with a soldering iron, games with a rulebook, and puzzles of a thousand pieces for a long weekend.',
    look: 'Real tools, sized for smaller hands.',
    picks: [
      { name: 'Build-a-radio kit', price: '$48' },
      { name: 'Trading-route board game', price: '$45' },
      { name: 'Jigsaw, 1000 pieces', price: '$26' },
      { name: 'Crystal growing lab', price: '$34' },
    ],
  },
];

type Toy = {
  name: string;
  age: string;
  price: string;
  note: string;
  maker: string;
};

const TOYS: Toy[] = [
  {
    name: 'Heritage wooden railway',
    age: 'Ages 3 and up',
    price: '$64',
    note: 'An engine and three carriages in painted beech, magnets at both ends, and a figure-eight of track that fits on a coffee table. Every piece of the old sets still links to it.',
    maker: 'Made by Holmfirth Wood Co.',
  },
  {
    name: 'Rainbow ring stacker',
    age: 'Ages 6 months and up',
    price: '$24',
    note: 'Six rings on a rocking base. The first toy most babies here are given.',
    maker: 'Made by Little Birch',
  },
  {
    name: 'Stomp rocket',
    age: 'Ages 6 and up',
    price: '$29',
    note: 'Stamp on the pad and it clears the house. Three foam rockets included.',
    maker: 'Staff pick, Priya',
  },
  {
    name: 'Cardboard castle',
    age: 'Ages 4 and up',
    price: '$42',
    note: 'Four feet tall, slots together without tape, and comes plain for coloring in.',
    maker: 'Staff pick, Tom',
  },
  {
    name: 'Pocket microscope',
    age: 'Ages 8 and up',
    price: '$36',
    note: 'Sixty times, with a light, and a clip for a phone camera.',
    maker: 'Staff pick, June',
  },
  {
    name: 'Felt play food, 30 pieces',
    age: 'Ages 3 and up',
    price: '$34',
    note: 'Hand-stitched fruit, bread and a whole fried egg, in a wicker basket.',
    maker: 'Made by Stitch Hen',
  },
];

type Happening = {
  day: string;
  date: string;
  month: string;
  title: string;
  time: string;
  who: string;
  cost: string;
};

const EVENTS: Happening[] = [
  {
    day: 'Sat',
    date: '4',
    month: 'Oct',
    title: 'Story time: stories about trains',
    time: '10:30-11:15 am',
    who: 'Ages 2-5 with a grown-up',
    cost: 'Free',
  },
  {
    day: 'Wed',
    date: '8',
    month: 'Oct',
    title: 'Baby and me: songs and stacking',
    time: '9:30-10:15 am',
    who: 'Ages 0-2',
    cost: 'Free',
  },
  {
    day: 'Sat',
    date: '11',
    month: 'Oct',
    title: 'Story time: the moon and the stars',
    time: '10:30-11:15 am',
    who: 'Ages 2-5 with a grown-up',
    cost: 'Free',
  },
  {
    day: 'Sun',
    date: '12',
    month: 'Oct',
    title: 'Build club: marble runs',
    time: '2:00-3:30 pm',
    who: 'Ages 6-10',
    cost: '$8, materials included',
  },
  {
    day: 'Fri',
    date: '17',
    month: 'Oct',
    title: 'Board game night for families',
    time: '5:30-7:30 pm',
    who: 'Ages 7 and up',
    cost: 'Free, snacks $3',
  },
  {
    day: 'Sat',
    date: '25',
    month: 'Oct',
    title: 'Costume parade and story time',
    time: '10:30 am-12:00 pm',
    who: 'All ages',
    cost: 'Free',
  },
];

const WRAP = [
  ['Three papers', 'This month: shapes, stripes and stars. All recyclable, no foil.'],
  ['A handwritten card', 'Tell us what to write, or write it yourself at the counter.'],
  ['Wrapped to ship', 'We post wrapped gifts anywhere in the country for $7.'],
  ['Birthday lists', 'Families can keep a wish list with us; friends buy from it in the shop.'],
];

const HOURS = [
  ['Monday-Friday', '10 am-6 pm'],
  ['Saturday', '9 am-6 pm'],
  ['Sunday', '11 am-5 pm'],
];

export default function TinkerToysPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          Tinker &amp; Co.
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The rocket takes off through a field of shapes. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={bauhaus}
              palette={SHAPES}
              fit="grid"
              cellSize={84}
              seed="tinker-hero"
              redrawInterval={7000}
              options={{ frequency: 0.3 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroCopy}>
            <p className={s.kicker}>Independent toy store, Orchard Street</p>
            <h1 className={s.heroTitle} id="hero-h">
              Toys worth keeping,
              <br />
              <em>sorted by age.</em>
            </h1>
            <p className={s.heroLede}>
              Two rooms of wooden trains, first puzzles, building sets and board games, each shelf marked for the age it
              suits. Tell us who it is for and we will walk you to the right one.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#ages">
                Shop by age
              </a>
              <a className={s.btnLine} href="#events">
                Story time
              </a>
            </div>
          </div>
          <div className={s.heroArt}>
            <Artwork
              slug="tinker-toys-rocket"
              alt="A toy rocket taking off"
              inks={{ red: 'var(--pink)', blue: 'var(--blue)', yellow: 'var(--yellow)', black: 'var(--ink)' }}
              className={s.rocket}
            />
          </div>
          <ul className={s.promises}>
            {PROMISES.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------- SHOP BY AGE
            Four cards filed like dividers in a box: each has a tab with its
            age, and the tabs step across so all four can be read at once. */}
        <section id="ages" className={s.ages} aria-labelledby="ages-h">
          <div className={s.secHead}>
            <h2 id="ages-h">Shop by age</h2>
            <p className={s.secNote}>
              Every shelf in the shop is marked with one of these four bands. The picks below are what the staff give
              their own nieces and nephews.
            </p>
          </div>
          <ol className={s.ageStack}>
            {AGES.map((a) => (
              <li key={a.id} className={`${s.ageCard} ${s[a.id]}`}>
                <p className={s.ageTab}>
                  <span className={s.ageBand}>{a.band}</span>
                  <span className={s.ageYears}>years</span>
                </p>
                <div className={s.ageArt}>
                  {a.id === 'tiny' ? (
                    <Artwork
                      slug="tinker-toys-rings"
                      alt="A stacking ring toy"
                      inks={{ red: 'var(--pink)', blue: 'var(--blue)', yellow: 'var(--yellow)', black: 'var(--ink)' }}
                      className={s.artRings}
                    />
                  ) : null}
                  {a.id === 'small' ? (
                    <Artwork
                      slug="tinker-toys-train"
                      alt="A wooden toy train"
                      inks={{ red: 'var(--pink)', blue: 'var(--ink)', yellow: 'var(--yellow)', black: 'var(--ink)' }}
                      className={s.artTrain}
                    />
                  ) : null}
                  {a.id === 'middle' ? (
                    <Artwork
                      slug="tinker-toys-rocket"
                      alt="A toy rocket"
                      inks={{ red: 'var(--blue)', blue: 'var(--pink)', yellow: 'var(--yellow)', black: 'var(--ink)' }}
                      className={s.artRocket}
                    />
                  ) : null}
                  {a.id === 'big' ? (
                    <Artwork
                      slug="tinker-toys-rings"
                      alt="A stacking ring toy in two colors"
                      inks={{
                        red: 'var(--yellow)',
                        blue: 'var(--pink)',
                        yellow: 'var(--cream)',
                        black: 'var(--cream)',
                      }}
                      className={s.artRings}
                    />
                  ) : null}
                </div>
                <div className={s.ageText}>
                  <h3>{a.label}</h3>
                  <p className={s.ageBlurb}>{a.blurb}</p>
                  <p className={s.ageLook}>{a.look}</p>
                </div>
                <ul className={s.picks}>
                  {a.picks.map((p) => (
                    <li key={p.name}>
                      <span className={s.pickName}>{p.name}</span>
                      <span className={s.pickPrice}>{p.price}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- FEATURED
            One wide card for the railway, one tall for the stacker, then
            four staff picks as price tags. */}
        <section id="featured" className={s.featured} aria-labelledby="featured-h">
          <div className={s.secHead}>
            <h2 id="featured-h">On the front table this month</h2>
            <p className={s.secNote}>
              Six things we cannot keep in stock. Ask at the counter and we will set one aside.
            </p>
          </div>
          <ul className={s.toys}>
            {TOYS.map((t, i) => (
              <li key={t.name} className={`${s.toy} ${i === 0 ? s.toyWide : ''} ${i === 1 ? s.toyTall : ''}`}>
                {i === 0 ? (
                  <div className={s.toyArt}>
                    <Artwork
                      slug="tinker-toys-train"
                      alt="The wooden railway: an engine and three carriages"
                      inks={{ red: 'var(--blue)', blue: 'var(--pink)', yellow: 'var(--yellow)', black: 'var(--ink)' }}
                      className={s.toyTrain}
                    />
                  </div>
                ) : null}
                {i === 1 ? (
                  <div className={s.toyArt}>
                    <Artwork
                      slug="tinker-toys-rings"
                      alt="A rainbow ring stacker"
                      inks={{ red: 'var(--blue)', blue: 'var(--yellow)', yellow: 'var(--pink)', black: 'var(--ink)' }}
                      className={s.toyRings}
                    />
                  </div>
                ) : null}
                <div className={s.toyBody}>
                  <span className={s.toyAge}>{t.age}</span>
                  <h3>{t.name}</h3>
                  <p className={s.toyNote}>{t.note}</p>
                  <div className={s.toyFoot}>
                    <span className={s.toyMaker}>{t.maker}</span>
                    <span className={s.toyPrice}>{t.price}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- EVENTS */}
        <section id="events" className={s.events} aria-labelledby="events-h">
          <div className={s.eventsInner}>
            <div className={s.eventsHead}>
              <h2 id="events-h">Story time and things to do</h2>
              <p className={s.secNote}>
                Everything happens on the rug in the back room. Story time is free and needs no booking; build club has
                twelve places, so sign up at the counter.
              </p>
              <Artwork
                slug="tinker-toys-train"
                alt=""
                inks={{ red: 'var(--yellow)', blue: 'var(--cream)', yellow: 'var(--pink)', black: 'var(--cream)' }}
                className={s.eventsTrain}
              />
            </div>
            <ol className={s.eventList}>
              {EVENTS.map((e) => (
                <li key={e.title}>
                  <p className={s.cal}>
                    <span className={s.calDay}>{e.day}</span>
                    <span className={s.calDate}>{e.date}</span>
                    <span className={s.calMonth}>{e.month}</span>
                  </p>
                  <div className={s.eventText}>
                    <h3>{e.title}</h3>
                    <span className={s.eventMeta}>{e.time}</span>
                    <span className={s.eventMeta}>{e.who}</span>
                  </div>
                  <span className={s.eventCost}>{e.cost}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- GIFTS
            The gift: this month's wrapping paper is a live pattern, tied
            with a ribbon drawn in CSS. */}
        <section id="gifts" className={s.gifts} aria-labelledby="gifts-h">
          <div className={s.gift} aria-hidden="true">
            <div className={s.giftPaper} aria-hidden="true">
              <TabbiedPattern
                pattern={stitch}
                palette={PAPER}
                fit="grid"
                cellSize={40}
                seed="tinker-wrap"
                redrawInterval={9000}
                options={{ frequency: 0.8 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.ribbonV} />
            <span className={s.ribbonH} />
            <span className={s.bow} />
          </div>
          <div className={s.giftBody}>
            <h2 id="gifts-h">
              Gift wrap is free,
              <br />
              <em>on everything.</em>
            </h2>
            <p className={s.secNote}>
              Bring the toy to the counter and choose a paper. It takes us about five minutes, and we have never once
              run out of tape.
            </p>
            <dl className={s.wrapList}>
              {WRAP.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <h2 id="visit-h">Come and play</h2>
            <p className={s.secNote}>
              Strollers fit through every aisle, there is a changing table in the restroom, and the play table by the
              window is always set up with something new.
            </p>
          </div>
          <div className={s.visitGrid}>
            <div className={s.visitCard}>
              <h3>Find us</h3>
              <p className={s.visitBig}>27 Orchard Street</p>
              <p>
                Across from the library, next to the ice cream shop. Two-hour parking on the street and behind the bank.
              </p>
            </div>
            <div className={s.visitCard}>
              <h3>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.visitCard}>
              <h3>Ask us</h3>
              <a className={s.visitLink} href="tel:5550124455">
                (555) 012-4455
              </a>
              <a className={s.visitLink} href="mailto:hello@tinkerandco.example">
                hello@tinkerandco.example
              </a>
              <p>We answer the phone between customers, so leave a message if it rings out.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Tinker &amp; Co.</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p>A fictional toy store. Toys, prices and events are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            <span>, drawn live in the page's own colors; the pictures follow the palette too.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
