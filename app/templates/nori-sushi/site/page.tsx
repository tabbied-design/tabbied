import { TabbiedPattern } from 'tabbied/react';
import { dashfield, tidering } from 'tabbied/patterns';
import s from './nori-sushi.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Nori: Omakase sushi counter, Harbor Lane',
  description:
    'Nori is an eight-seat sushi counter on Harbor Lane serving a twelve-course omakase twice a night, Tuesday to Saturday, with an a la carte menu and a short sake list after nine.',
};

/* Site colors. The waves sit on the green hero panel; the dashes on the
   rice-paper ground. Both on `transparent`. */
const RICE = '#F4F1EA';
const RED = '#D1473A';
const GREEN = '#2E6B5E';
const GRAY = '#8B8C84';
const PALE = '#E0DDD4';

const WAVES = ['transparent', RICE, PALE, RED, RICE];
const DASHES = ['transparent', GRAY, RED, PALE, GREEN];

const NAV = [
  ['Omakase', '#omakase'],
  ['A la carte', '#a-la-carte'],
  ['Sake', '#sake'],
  ['Reserve', '#reserve'],
  ['Visit', '#visit'],
];

const FACTS = [
  ['$145', 'per guest'],
  ['8', 'seats at the counter'],
  ['5:30 / 8:15', 'two seatings'],
];

/* The spine of the page. Each course has its words on one side of the
   line and, on the other, where it comes from or a picture of it. */
type Course = {
  no: string;
  name: string;
  kind: string;
  body: string;
  side: string;
  art?: 'chopsticks' | 'nigiri' | 'maki';
};

const COURSES: Course[] = [
  {
    no: '01',
    name: 'Sakizuke',
    kind: 'The opening bite',
    body: 'Chilled tomato dashi with shiso and a single sweet shrimp. A sip and a mouthful, to start.',
    side: 'Set at your place with the chopsticks and the soy dish before you sit down.',
    art: 'chopsticks',
  },
  {
    no: '02',
    name: 'Chawanmushi',
    kind: 'Warm',
    body: 'Steamed egg custard, crab from the morning boat, ginkgo nut, a spoon of clear broth over the top.',
    side: 'Crab cooked at 11 am, picked by hand at the counter.',
  },
  {
    no: '03',
    name: 'Sashimi',
    kind: 'Three cuts',
    body: 'Fluke with ponzu, lean bluefin, and a scallop torn by hand with sea salt and lime.',
    side: 'Day-boat fluke; line-caught tuna, aged four days in-house.',
  },
  {
    no: '04',
    name: 'Madai',
    kind: 'Nigiri',
    body: 'Sea bream, lightly cured in kelp, brushed with yuzu kosho.',
    side: 'The rice is seasoned with red vinegar and served at body temperature.',
  },
  {
    no: '05',
    name: 'Akami',
    kind: 'Nigiri',
    body: 'The lean back of the tuna, marinated for ten minutes in soy and mirin.',
    side: 'One fish a week, broken down on Tuesday morning.',
  },
  {
    no: '06',
    name: 'Chutoro',
    kind: 'Nigiri',
    body: 'Medium-fatty tuna from the belly, a thin band of nori, nothing else.',
    side: 'Two pieces, the only course served as a pair.',
    art: 'nigiri',
  },
  {
    no: '07',
    name: 'Hotate',
    kind: 'Nigiri',
    body: 'Raw scallop scored and seared on one side, finished with sudachi and flaky salt.',
    side: 'Diver scallops, delivered live in the shell.',
  },
  {
    no: '08',
    name: 'Kinmedai',
    kind: 'Nigiri',
    body: 'Golden-eye snapper, the skin blistered with charcoal just before it is handed over.',
    side: 'Binchotan charcoal, lit at four for the whole night.',
  },
  {
    no: '09',
    name: 'Uni',
    kind: 'Served on the hand',
    body: 'Sea urchin over a small ball of rice, placed in your palm. Eat it at once.',
    side: 'From two divers we have bought from for nine years.',
  },
  {
    no: '10',
    name: 'Temaki',
    kind: 'Hand roll',
    body: 'Chopped toro and scallion in crisp nori, rolled and passed across the counter.',
    side: 'The nori is toasted over the charcoal a moment before.',
    art: 'maki',
  },
  {
    no: '11',
    name: 'Akadashi',
    kind: 'Soup',
    body: 'Red miso with small clams and a few leaves of mitsuba.',
    side: 'The dashi is made fresh twice a day.',
  },
  {
    no: '12',
    name: 'Tamago and sorbet',
    kind: 'To finish',
    body: 'A slice of the sweet layered omelet, then a scoop of yuzu sorbet made that afternoon.',
    side: 'The tamago takes forty minutes and is the last thing the chef learned.',
  },
];

const ADDONS = [
  ['Wagyu nigiri, seared', '$18'],
  ['A second uni', '$16'],
  ['Sake pairing, five pours', '$65'],
];

type Plate = { name: string; note: string; price: string };

type Group = { title: string; note: string; items: Plate[] };

const CARTE: Group[] = [
  {
    title: 'Nigiri',
    note: 'Two pieces',
    items: [
      { name: 'Sake', note: 'Salmon', price: '9' },
      { name: 'Hamachi', note: 'Yellowtail', price: '10' },
      { name: 'Akami', note: 'Lean tuna', price: '11' },
      { name: 'Chutoro', note: 'Medium-fatty tuna', price: '15' },
      { name: 'Otoro', note: 'Fatty tuna', price: '19' },
      { name: 'Unagi', note: 'Grilled eel', price: '10' },
    ],
  },
  {
    title: 'Maki',
    note: 'Six pieces',
    items: [
      { name: 'Tekka', note: 'Tuna', price: '9' },
      { name: 'Kappa', note: 'Cucumber and sesame', price: '6' },
      { name: 'Negitoro', note: 'Toro and scallion', price: '12' },
      { name: 'Ume shiso', note: 'Pickled plum and shiso', price: '7' },
    ],
  },
  {
    title: 'Small plates',
    note: 'From the kitchen',
    items: [
      { name: 'Edamame', note: 'Sea salt', price: '6' },
      { name: 'Agedashi tofu', note: 'In warm dashi', price: '9' },
      { name: 'Miso soup', note: 'Red miso, clams', price: '5' },
      { name: 'Tamago', note: 'Sweet omelet', price: '6' },
    ],
  },
];

type Sake = {
  name: string;
  style: string;
  note: string;
  glass: string;
  bottle: string;
};

const SAKE: Sake[] = [
  { name: 'Snow Crane', style: 'Junmai', note: 'Dry and round, good warm', glass: '12', bottle: '68' },
  { name: 'Morning River', style: 'Junmai ginjo', note: 'Pear, rice, a clean finish', glass: '15', bottle: '84' },
  { name: 'Blue Lantern', style: 'Daiginjo', note: 'Melon and white flowers', glass: '21', bottle: '120' },
  { name: 'Old Pine', style: 'Kimoto junmai', note: 'Savory, mushroom, long', glass: '16', bottle: '90' },
  { name: 'Cloud Field', style: 'Nigori', note: 'Cloudy, creamy, a little sweet', glass: '13', bottle: '64' },
  { name: 'Plum wine', style: 'Umeshu', note: 'Served on one large ice cube', glass: '11', bottle: '-' },
];

const POLICIES = [
  ['Deposit', '$50 a seat, taken when you book and taken off the bill.'],
  ['Cancelling', 'Free up to 48 hours before. After that the deposit is kept.'],
  ['Allergies', 'Tell us when you book. We cannot make the omakase without fish or rice.'],
  ['Late', 'The counter starts together. We hold seats for 15 minutes.'],
];

export default function NoriSushiPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          Nori
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className={s.barCta} href="#reserve">
          Book a seat
        </a>
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
            Words on the rice ground; the nigiri on a green panel of waves. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p className={s.kicker}>Sushi counter, Harbor Lane</p>
            <h1 className={s.heroTitle} id="hero-h">
              Twelve courses,
              <br />
              <em>one counter.</em>
            </h1>
            <p className={s.heroLede}>
              Eight seats around a slab of hinoki, one chef, and a menu that is decided that morning at the fish market.
              Sit down at 5:30 or 8:15 and we will take it from there.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#reserve">
                Reserve a seat
              </a>
              <a className={s.btnLine} href="#omakase">
                Read the courses
              </a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([v, k]) => (
                <div key={k}>
                  <dt>{v}</dt>
                  <dd>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroPanel}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={tidering}
                palette={WAVES}
                fit="grid"
                cellSize={72}
                seed="nori-hero"
                redrawInterval={9000}
                options={{ frequency: 0.55 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="nori-sushi-nigiri"
              alt="Two pieces of tuna nigiri"
              inks={{ red: 'var(--red)', black: 'var(--rice)' }}
              className={s.heroNigiri}
            />
          </div>
        </section>

        {/* --------------------------------------------------------- OMAKASE
            The spine: one line down the middle, a numbered stop for every
            course, the words on one side and the source on the other. */}
        <section id="omakase" className={s.omakase} aria-labelledby="omakase-h">
          <div className={s.omakaseHead}>
            <p className={s.kicker}>Omakase, about two hours</p>
            <h2 id="omakase-h">The twelve courses</h2>
            <p className={s.lede}>
              A typical evening in the autumn. The fish changes with the boats, so the names may change; the order and
              the pace do not.
            </p>
          </div>
          <ol className={s.spine}>
            {COURSES.map((c) => (
              <li key={c.no} className={s.course}>
                <span className={s.node}>{c.no}</span>
                <div className={s.courseText}>
                  <span className={s.courseKind}>{c.kind}</span>
                  <h3>{c.name}</h3>
                  <p>{c.body}</p>
                </div>
                <div className={s.courseSide}>
                  {c.art === 'chopsticks' ? (
                    <span className={`${s.plate} ${s.plateLight}`}>
                      <Artwork
                        slug="nori-sushi-chopsticks"
                        alt="Chopsticks resting on a small soy dish"
                        inks={{ red: 'var(--ink)', blue: 'var(--red)', black: 'var(--ink)' }}
                        className={s.sideArt}
                      />
                    </span>
                  ) : null}
                  {c.art === 'nigiri' ? (
                    <span className={`${s.plate} ${s.plateDark}`}>
                      <Artwork
                        slug="nori-sushi-nigiri"
                        alt="Two pieces of chutoro nigiri"
                        inks={{ red: 'var(--red)', black: 'var(--rice)' }}
                        className={s.sideArt}
                      />
                    </span>
                  ) : null}
                  {c.art === 'maki' ? (
                    <span className={`${s.plate} ${s.plateGreen}`}>
                      <Artwork
                        slug="nori-sushi-maki"
                        alt="Three maki rolls"
                        inks={{ red: 'var(--red)', blue: 'var(--rice)', black: 'var(--ink)' }}
                        className={s.sideArt}
                      />
                    </span>
                  ) : null}
                  <p className={s.sideNote}>{c.side}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={s.addons}>
            <h3 className={s.addonsHead}>Add to the omakase</h3>
            <dl className={s.addonList}>
              {ADDONS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* A quiet strip of dashes, like chopsticks set down. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={dashfield}
            palette={DASHES}
            fit="grid"
            cellSize={44}
            seed="nori-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------ A LA CARTE */}
        <section id="a-la-carte" className={s.carte} aria-labelledby="carte-h">
          <div className={s.carteHead}>
            <div className={s.secHead}>
              <p className={s.kicker}>After 9 pm, and at the four tables</p>
              <h2 id="carte-h">A la carte</h2>
              <p className={s.lede}>
                The same fish as the omakase, ordered by the piece. Prices in dollars; the chef will say what is
                especially good tonight.
              </p>
            </div>
            <Artwork
              slug="nori-sushi-maki"
              alt="Three maki rolls"
              inks={{ red: 'var(--red)', blue: 'var(--pale)', black: 'var(--ink)' }}
              className={s.carteArt}
            />
          </div>
          <div className={s.carteGrid}>
            {CARTE.map((g) => (
              <div key={g.title} className={s.group}>
                <div className={s.groupHead}>
                  <h3>{g.title}</h3>
                  <span>{g.note}</span>
                </div>
                <ul className={s.items}>
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <span className={s.itemName}>{it.name}</span>
                      <span className={s.itemNote}>{it.note}</span>
                      <span className={s.itemPrice}>{it.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ SAKE */}
        <section id="sake" className={s.sake} aria-labelledby="sake-h">
          <div className={s.sakeInner}>
            <div className={s.secHead}>
              <p className={s.kicker}>Poured cold unless you ask</p>
              <h2 id="sake-h">Sake</h2>
              <p className={s.lede}>
                Six bottles, chosen to go with raw fish. A glass is 4 oz; the pairing is five smaller pours matched to
                the courses.
              </p>
            </div>
            <div className={s.sakeTable} role="table" aria-label="Sake list">
              <div className={s.sakeRowHead} role="row">
                <span role="columnheader">Sake</span>
                <span role="columnheader">Style</span>
                <span role="columnheader">Glass</span>
                <span role="columnheader">Bottle</span>
              </div>
              {SAKE.map((k) => (
                <div key={k.name} className={s.sakeRow} role="row">
                  <span className={s.sakeName} role="cell">
                    <strong>{k.name}</strong>
                    <small>{k.note}</small>
                  </span>
                  <span className={s.sakeStyle} role="cell">
                    {k.style}
                  </span>
                  <span className={s.sakeGlass} role="cell">
                    {k.glass}
                  </span>
                  <span className={s.sakeBottle} role="cell">
                    {k.bottle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- RESERVE */}
        <section id="reserve" className={s.reserve} aria-labelledby="reserve-h">
          <div className={s.reserveText}>
            <p className={s.kicker}>Tuesday to Saturday</p>
            <h2 id="reserve-h">Reserve a seat</h2>
            <p className={s.lede}>
              Bookings open on the first of each month for the month after. The counter seats eight; for a party of
              six to eight, ask about taking the whole counter.
            </p>
            <dl className={s.policies}>
              {POLICIES.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <form className={s.form} action="#">
            <div className={s.formRow}>
              <label className={s.field}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
            </div>
            <div className={s.formRow}>
              <label className={s.field}>
                <span>Date</span>
                <input type="date" name="date" />
              </label>
              <label className={s.field}>
                <span>Guests</span>
                <select name="guests" defaultValue="2">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </label>
            </div>
            <fieldset className={s.seatings}>
              <legend>Seating</legend>
              <label className={s.radio}>
                <input type="radio" name="seating" value="early" defaultChecked />
                <span>5:30 pm</span>
              </label>
              <label className={s.radio}>
                <input type="radio" name="seating" value="late" />
                <span>8:15 pm</span>
              </label>
            </fieldset>
            <label className={s.field}>
              <span>Allergies or anything we should know</span>
              <textarea name="notes" rows={3} />
            </label>
            <button className={s.submit} type="submit">
              Request the booking
            </button>
            <small className={s.formNote}>We confirm by email within a day and take the deposit then.</small>
          </form>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <h2 id="visit-h" className={s.visitTitle}>
            Visit
          </h2>
          <dl className={s.visitList}>
            <div>
              <dt>Where</dt>
              <dd>18 Harbor Lane, down the steps under the blue curtain</dd>
            </div>
            <div>
              <dt>Seatings</dt>
              <dd>Tuesday-Saturday, 5:30 pm and 8:15 pm</dd>
            </div>
            <div>
              <dt>A la carte</dt>
              <dd>Tuesday-Saturday, 9 pm-11 pm, no booking</dd>
            </div>
            <div>
              <dt>Call</dt>
              <dd>
                <a href="tel:5550181818">(555) 018-1818</a>
              </dd>
            </div>
            <div>
              <dt>Write</dt>
              <dd>
                <a href="mailto:counter@nori.example">counter@nori.example</a>
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Nori</p>
        <p className={s.footTag}>Omakase and a la carte, 18 Harbor Lane.</p>
        <div className={s.footFine}>
          <p>A fictional sushi bar. Courses, prices and people are invented.</p>
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
