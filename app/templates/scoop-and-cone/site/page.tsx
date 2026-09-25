import { TabbiedPattern } from 'tabbied/react';
import { confettidotfield, cove } from 'tabbied/patterns';
import s from './scoop-and-cone.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Scoop & Cone: Ice cream parlor, Gull Harbor',
  description:
    'Scoop & Cone churns twenty-four flavors every morning on the boardwalk at Gull Harbor. The day\'s flavor board, sundaes, build-your-own, and opening hours season by season.',
};

/* Site colors. The confetti burst behind the cone and the scalloped band
   both draw on a `transparent` ground, straight onto the cream. */
const PINK = '#F26D7D';
const BLUE = '#6CC3D5';
const YELLOW = '#F7C948';
const INK = '#2A1E24';
const CREAM = '#FFF6EE';

const BURST = ['transparent', PINK, BLUE, YELLOW, INK];
const SCALLOP = ['transparent', PINK, YELLOW, BLUE];
const SPRINKLES = ['transparent', YELLOW, PINK, BLUE];
const AWNING = ['transparent', PINK, CREAM];
const DOILY = ['transparent', BLUE];

const NAV = [
  ['Flavors', '#flavors'],
  ['Sundaes', '#sundaes'],
  ['Build your own', '#build'],
  ['Hours', '#hours'],
  ['Visit', '#visit'],
];

/* The chip is the flavor's color, drawn from the palette (see the chip
   classes in the stylesheet), so a re-color changes the whole board. */
type Flavor = {
  name: string;
  note: string;
  chip: string;
  tags: string[];
};

const FLAVORS: Flavor[] = [
  { name: 'Sweet cream', note: 'The base of everything: this morning\'s milk, cane sugar, a pinch of salt.', chip: 'chipCream', tags: [] },
  { name: 'Strawberry buttermilk', note: 'Roasted berries from Hollow Farm with a buttermilk tang.', chip: 'chipPink', tags: [] },
  { name: 'Fresh mint chip', note: 'Mint leaves steeped overnight, shards of dark chocolate.', chip: 'chipMint', tags: [] },
  { name: 'Double chocolate', note: 'Dutch cocoa and 70% chocolate, very nearly black.', chip: 'chipChoc', tags: [] },
  { name: 'Blue moon', note: 'Vanilla, raspberry and a little almond. Ask anyone from the Midwest.', chip: 'chipBlue', tags: ['New'] },
  { name: 'Lemon sherbet', note: 'Half the dairy and all of the pucker.', chip: 'chipLemon', tags: [] },
  { name: 'Peach and honey', note: 'White peaches and wildflower honey from up the coast road.', chip: 'chipPeach', tags: ['New'] },
  { name: 'Coffee toffee', note: 'Cold-brew coffee with shards of butter toffee.', chip: 'chipCoffee', tags: [] },
  { name: 'Pistachio', note: 'Whole pistachios, ground to a paste in the back.', chip: 'chipPistachio', tags: ['Nuts'] },
  { name: 'Black sesame', note: 'Toasted and nutty, and not too sweet.', chip: 'chipGray', tags: [] },
  { name: 'Raspberry sorbet', note: 'Fruit, sugar and water. That is the recipe.', chip: 'chipBerry', tags: ['Vegan'] },
  { name: 'Coconut lime', note: 'Coconut milk and a lot of lime zest.', chip: 'chipCoconut', tags: ['Vegan'] },
  { name: 'Mango chili', note: 'Ripe mango with a slow chili finish.', chip: 'chipMango', tags: ['Vegan', 'New'] },
  { name: 'Cookies and cream', note: 'Our own chocolate wafers, crushed in by hand.', chip: 'chipCookie', tags: [] },
  { name: 'Birthday cake', note: 'Cake batter and rainbow sprinkles.', chip: 'chipParty', tags: ['Kids\' pick'] },
  { name: 'Oat milk chocolate', note: 'As rich as the double, without the dairy.', chip: 'chipChoc', tags: ['Vegan'] },
];

const SIZES = [
  ['Kid', '$3.75'],
  ['Single', '$4.95'],
  ['Double', '$6.75'],
  ['Pint to go', '$9.50'],
];

const CONES = ['Cup or cake cone, free', 'Sugar cone, free', 'Waffle cone, pressed here, +$1', 'Dipped waffle, +$1.75'];

const SUNDAES = [
  {
    name: 'Hot fudge',
    price: '$8.50',
    body: 'Two scoops of sweet cream, fudge made here, whipped cream and a cherry. The one to start with.',
    card: 'cardBlue',
    inks: { red: 'var(--pink)', blue: 'var(--ink)', yellow: 'var(--yellow)' },
  },
  {
    name: 'Shortcake',
    price: '$9',
    body: 'Strawberry buttermilk and sweet cream over crumbled shortcake, with roasted berries poured on warm.',
    card: 'cardYellow',
    inks: { red: 'var(--ink)', blue: 'var(--pink)', yellow: 'var(--blue)' },
  },
  {
    name: 'The big dipper',
    price: '$12',
    body: 'Four scoops, three sauces, sprinkles and three cherries. Serves two, or one person on a very hot day.',
    card: 'cardPink',
    inks: { red: 'var(--ink)', blue: 'var(--blue)', yellow: 'var(--yellow)' },
  },
];

const STEPS = [
  {
    no: '1',
    title: 'Pick a base',
    note: 'Included',
    options: ['Cup', 'Waffle bowl', 'Tall glass', 'Brownie'],
  },
  {
    no: '2',
    title: 'Two scoops',
    note: 'Any two from the board',
    options: ['A third scoop, +$2'],
  },
  {
    no: '3',
    title: 'One sauce',
    note: 'Warm or cold',
    options: ['Hot fudge', 'Salted caramel', 'Strawberry', 'Marshmallow'],
  },
  {
    no: '4',
    title: 'Two toppings',
    note: 'Then $0.75 each',
    options: ['Sprinkles', 'Toasted almonds', 'Crushed wafers', 'Mochi', 'Whipped cream', 'A cherry'],
  },
];

const SEASONS = [
  { name: 'Spring', months: 'March to May', hours: 'Tuesday-Sunday, noon-9 pm', note: 'Closed Mondays', tone: 'seasonBlue' },
  { name: 'Summer', months: 'June to August', hours: 'Every day, 11 am-11 pm', note: 'The line moves fast, promise', tone: 'seasonYellow' },
  { name: 'Fall', months: 'September to November', hours: 'Wednesday-Sunday, noon-8 pm', note: 'Open now', tone: 'seasonPink', now: true },
  { name: 'Winter', months: 'December to February', hours: 'Friday-Sunday, 1-7 pm', note: 'Pints and hot chocolate', tone: 'seasonGray' },
];

export default function ScoopAndConePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fff6ee',
        '--ink': '#2a1e24',
        '--pink': '#f26d7d',
        '--blue': '#6cc3d5',
        '--yellow': '#f7c948',
        '--gray': '#b7a9ad',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,ink,pink,blue,yellow,gray"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;600;800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork
            slug="scoop-and-cone-cone"
            alt=""
            inks={{ red: 'var(--pink)', blue: 'var(--blue)', yellow: 'var(--yellow)' }}
            className={s.markCone}
          />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Scoop & Cone</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#flavors">Today's board</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The cone, as big as the screen allows, standing in a confetti
            burst drawn in the same four colors. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Ice cream parlor on the boardwalk, Gull Harbor</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Churned every morning, <em>gone by nine.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Sixteen flavors on the board today, made in the back from milk
              that left Hollow Farm at dawn, and scooped into waffle cones we
              press at the window.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#flavors">See today's flavors</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#build">Build a sundae</a>
            </div>
            <ul className={s.heroFacts}>
              <li>
                <strong data-edit="hero.emphasis">16</strong>
                <span data-edit="hero.text" data-edit-max="60">flavors today</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis2">4</strong>
                <span data-edit="hero.text2" data-edit-max="60">of them vegan</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis3">$4.95</strong>
                <span data-edit="hero.text3" data-edit-max="60">a single scoop</span>
              </li>
            </ul>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,1" className={s.burst} aria-hidden="true">
              <TabbiedPattern
                pattern={confettidotfield}
                palette={BURST}
                fit="grid"
                cellSize={140}
                seed="scoop"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="scoop-and-cone-cone"
              alt="A waffle cone with two scoops of ice cream"
              inks={{ red: 'var(--pink)', blue: 'var(--blue)', yellow: 'var(--yellow)' }}
              className={s.heroCone}
            />
          </div>
        </section>

        {/* ----------------------------------------------------- FLAVOR BOARD
            The parlor's board: ink ground, every flavor with its chip. */}
        <section id="flavors" className={s.board} aria-labelledby="flavors-h">
          <div data-edit-pattern="flavors.field" data-edit-roles="transparent,2,0" className={s.awning} aria-hidden="true">
            <TabbiedPattern
              pattern={cove}
              palette={AWNING}
              fit="grid"
              cellSize={40}
              seed="scoop-awning"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.boardInner}>
            <div className={s.boardHead}>
              <h2 data-edit="flavors.title" data-edit-max="60" id="flavors-h">Today's board</h2>
              <p data-edit="flavors.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>It changes every morning; this is Friday's. Ask for a taste of anything, as many as you like.</p>
            </div>

            <div className={s.boardPrices}>
              <dl className={s.sizes}>
                {SIZES.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`flavors.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`flavors.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.cones}>
                {CONES.map((c, i) => (
                  <li data-edit={`flavors.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <ul className={s.flavors}>
              {FLAVORS.map((f, i) => (
                <li key={f.name} className={s.flavor}>
                  <span className={`${s.chip} ${s[f.chip]}`} aria-hidden="true" />
                  <div className={s.flavorText}>
                    <h3 data-edit={`flavors.title2.${i}`} data-edit-max="40">{f.name}</h3>
                    <p data-edit={`flavors.body2.${i}`} data-edit-max="240" data-edit-multiline>{f.note}</p>
                    {f.tags.length > 0 ? (
                      <ul className={s.tags}>
                        {f.tags.map((t, i2) => (
                          <li data-edit={`flavors.tagVegan.${i}.${i2}`} data-edit-max="80" key={t} className={t === 'Vegan' ? s.tagVegan : t === 'New' ? s.tagNew : s.tag}>{t}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={cove}
            palette={SCALLOP}
            options={{ frequency: 0.55 }}
            fit="grid"
            cellSize={44}
            redrawInterval={8000}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- SUNDAES
            One sundae drawn three times, colored three ways from the same
            palette. */}
        <section id="sundaes" className={s.sec} aria-labelledby="sundaes-h">
          <div className={s.secHead}>
            <h2 data-edit="sundaes.title" data-edit-max="60" id="sundaes-h">Sundaes</h2>
            <p data-edit="sundaes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>In a tall glass with a long spoon, at the counter or at the tables out on the boards.</p>
          </div>
          <div className={s.sundaes}>
            {SUNDAES.map((su, i) => (
              <div key={su.name} className={`${s.sundae} ${s[su.card]}`}>
                <Artwork slug="scoop-and-cone-sundae" alt={`${su.name} sundae`} inks={su.inks} className={s.sundaeArt} />
                <div className={s.sundaeText}>
                  <div className={s.sundaeTop}>
                    <h3 data-edit={`sundaes.title2.${i}`} data-edit-max="40">{su.name}</h3>
                    <span data-edit={`sundaes.sundaePrice.${i}`} data-edit-max="60" className={s.sundaePrice}>{su.price}</span>
                  </div>
                  <p data-edit={`sundaes.body.${i}`} data-edit-max="240" data-edit-multiline>{su.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- BUILD */}
        <section id="build" className={s.sec} aria-labelledby="build-h">
          <div className={s.secHead}>
            <h2 data-edit="build.title" data-edit-max="60" id="build-h">Build your own sundae</h2>
            <p data-edit="build.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>$8 for the lot, in four steps at the counter. Kids get a half-size one for $5.</p>
          </div>
          <div className={s.build}>
            <div className={s.buildArt} aria-hidden="true">
              <div data-edit-pattern="build.field" data-edit-roles="transparent,4,2,3" className={s.sprinkles}>
                <TabbiedPattern
                  pattern={confettidotfield}
                  palette={SPRINKLES}
                  fit="grid"
                  cellSize={140}
                  seed="sundae"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="scoop-and-cone-sundae"
                alt=""
                inks={{ red: 'var(--pink)', blue: 'var(--blue)', yellow: 'var(--yellow)' }}
                className={s.buildSundae}
              />
            </div>
            <ol className={s.steps}>
              {STEPS.map((st, i) => (
                <li key={st.no} className={s.step}>
                  <span data-edit={`build.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                  <div className={s.stepText}>
                    <h3 data-edit={`build.title2.${i}`} data-edit-max="40">{st.title}</h3>
                    <span data-edit={`build.stepNote.${i}`} data-edit-max="60" className={s.stepNote}>{st.note}</span>
                    <ul className={s.options}>
                      {st.options.map((o, i2) => (
                        <li data-edit={`build.item.${i}.${i2}`} data-edit-max="80" key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.sec} aria-labelledby="hours-h">
          <div className={s.hoursWrap}>
            <div className={s.hoursLead}>
              <div className={s.popPlate}>
                <div data-edit-pattern="hours.field" data-edit-roles="transparent,2,3,4,1" className={s.popBurst} aria-hidden="true">
                  <TabbiedPattern
                    pattern={confettidotfield}
                    palette={BURST}
                    fit="grid"
                    cellSize={90}
                    seed="scoop-pop"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="scoop-and-cone-popsicle"
                  alt="An ice lolly with a bite taken out"
                  inks={{ red: 'var(--pink)', blue: 'var(--blue)', yellow: 'var(--yellow)' }}
                  className={s.pop}
                />
              </div>
              <div>
                <h2 data-edit="hours.title" data-edit-max="60" id="hours-h">Hours by season</h2>
                <p data-edit="hours.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>The boardwalk sets our clock. If it is warm and busy we stay open late, and say so on the door.</p>
              </div>
            </div>
            <ul className={s.seasons}>
              {SEASONS.map((se, i) => (
                <li key={se.name} className={`${s.season} ${s[se.tone]}`}>
                  <div className={s.seasonTop}>
                    <h3 data-edit={`hours.title2.${i}`} data-edit-max="40">{se.name}</h3>
                    {se.now ? <span data-edit={`hours.nowTag.${i}`} data-edit-max="60" className={s.nowTag}>Now</span> : null}
                  </div>
                  <span data-edit={`hours.seasonMonths.${i}`} data-edit-max="60" className={s.seasonMonths}>{se.months}</span>
                  <p data-edit={`hours.seasonHours.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonHours}>{se.hours}</p>
                  <p data-edit={`hours.seasonNote.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonNote}>{se.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div className={s.visitCard}>
              <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Come by the window</h2>
              <p data-edit="visit.visitAddr" data-edit-max="240" data-edit-multiline className={s.visitAddr}>Pier 3, the Boardwalk, Gull Harbor</p>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>Between the carousel and the bait shop. Bikes lock up at the rack out front; dogs get a free pup cup.</p>
              <dl className={s.visitList}>
                <div>
                  <dt data-edit="visit.term" data-edit-max="28">Call</dt>
                  <dd>
                    <a data-edit="visit.link" data-edit-max="28" href="tel:+15550126644">(555) 012-6644</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="visit.term2" data-edit-max="28">Write</dt>
                  <dd>
                    <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@scoopandcone.example">hello@scoopandcone.example</a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className={s.party}>
              <h3 data-edit="visit.title2" data-edit-max="40">Parties and pints</h3>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline>The back room seats sixteen for a birthday: a sundae each, a candle in the big dipper, two hours, $180. Pints and quarts to go all year, and we pack them in dry ice for the drive home.</p>
              <a data-edit="visit.btn" data-edit-max="28" className={s.btn} href="mailto:parties@scoopandcone.example">Book the back room</a>
              <div data-edit-pattern="visit.field" data-edit-roles="transparent,3" className={s.partyEdge} aria-hidden="true">
                <TabbiedPattern
                  pattern={cove}
                  palette={DOILY}
                  fit="grid"
                  cellSize={32}
                  seed="scoop-party"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <Artwork
              slug="scoop-and-cone-cone"
              alt=""
              inks={{ red: 'var(--pink)', blue: 'var(--blue)', yellow: 'var(--yellow)' }}
              className={s.footCone}
            />
            <div>
              <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Scoop & Cone</p>
              <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Ice cream churned every morning on the boardwalk at Gull Harbor.</p>
            </div>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional ice cream parlor. Flavors, prices, hours and places are invented.</p>
          <p>
            Patterns by{' '}
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live on a transparent ground.
          </p>
        </div>
      </footer>
    </div>
  );
}
