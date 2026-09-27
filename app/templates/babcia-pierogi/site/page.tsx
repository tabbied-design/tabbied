import { TabbiedPattern } from 'tabbied/react';
import { bilateral, diadem, ogee, lobe } from 'tabbied/patterns';
import s from './babcia-pierogi.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Babcia: Pierogi kitchen, Linden Row, Millbrook',
  description:
    'Pierogi folded by hand every morning at 12 Linden Row, Millbrook: ruskie, sauerkraut and mushroom, beef, sweet cheese and blueberry, boiled or fried. Soups, Sunday lunch at one long table, frozen dozens and a folding class.',
};

/* Site colors. Every field runs over a transparent ground, so the paper
   shows between the cut shapes the way it does in a real wycinanka. */
const PAPER = '#faf7f0';
const BLACK = '#151515';
const RED = '#d42b2b';
const GREEN = '#2e8b3e';
const YELLOW = '#f4c21e';
const BLUE = '#2466b8';

const FOLD = ['transparent', RED, GREEN, BLUE, YELLOW, RED];
const STITCH = ['transparent', RED, BLACK, GREEN, RED, BLUE];
const RUNNER = ['transparent', RED, BLUE, YELLOW, GREEN, RED];
const LEAVES = ['transparent', GREEN, RED, GREEN, YELLOW];
const HEM = ['transparent', GREEN, RED, BLUE, YELLOW, RED];

const NAV_LEFT = [
  ['Pierogi', '#pierogi'],
  ['Soups', '#soups'],
  ['Sunday', '#sunday'],
];

const NAV_RIGHT = [
  ['Frozen', '#frozen'],
  ['Folding class', '#class'],
  ['Visit', '#visit'],
];

const NAV = [...NAV_LEFT, ...NAV_RIGHT];

/* The garland over the menu: one rooster cut again and again, the colors
   of the paper changed on each, every other one turned over. */
const GARLAND = [
  { id: 'g1', inks: { red: 'var(--red)', blue: 'var(--blue)', yellow: 'var(--yellow)', black: 'var(--green)' } },
  { id: 'g2', inks: { red: 'var(--green)', blue: 'var(--red)', yellow: 'var(--yellow)', black: 'var(--blue)' } },
  { id: 'g3', inks: { red: 'var(--blue)', blue: 'var(--yellow)', yellow: 'var(--red)', black: 'var(--green)' } },
  { id: 'g4', inks: { red: 'var(--red)', blue: 'var(--green)', yellow: 'var(--blue)', black: 'var(--yellow)' } },
  { id: 'g5', inks: { red: 'var(--black)', blue: 'var(--red)', yellow: 'var(--yellow)', black: 'var(--green)' } },
  { id: 'g6', inks: { red: 'var(--red)', blue: 'var(--green)', yellow: 'var(--blue)', black: 'var(--yellow)' } },
  { id: 'g7', inks: { red: 'var(--blue)', blue: 'var(--yellow)', yellow: 'var(--red)', black: 'var(--green)' } },
  { id: 'g8', inks: { red: 'var(--green)', blue: 'var(--red)', yellow: 'var(--yellow)', black: 'var(--blue)' } },
  { id: 'g9', inks: { red: 'var(--red)', blue: 'var(--blue)', yellow: 'var(--yellow)', black: 'var(--green)' } },
];

type Dish = {
  name: string;
  note: string;
  six: string;
  ten: string;
};

const SAVORY: Dish[] = [
  { name: 'Ruskie', note: 'Potato, farmer\'s cheese and onion fried slowly in butter. The one everybody orders first.', six: '6 for $11', ten: '10 for $17' },
  { name: 'Sauerkraut and mushroom', note: 'Sour cabbage with wild mushrooms: the Christmas Eve filling, all year round.', six: '6 for $12', ten: '10 for $18' },
  { name: 'Beef', note: 'Beef shin braised all night with marjoram, onion and a lot of black pepper.', six: '6 for $13', ten: '10 for $20' },
];

const SWEET: Dish[] = [
  { name: 'Sweet cheese', note: 'Farmer\'s cheese with vanilla and lemon zest, served with sour cream and sugar.', six: '6 for $11', ten: '10 for $17' },
  { name: 'Blueberry', note: 'Whole berries sealed in tight, with sweet cream. When they are gone, they are gone.', six: '6 for $12', ten: '10 for $18' },
];

const EXTRAS = [
  ['Bacon and onion on top', '$2'],
  ['Sour cream, a whole bowl', '$1.50'],
  ['Half and half, two fillings', 'Free'],
];

type Soup = {
  name: string;
  say: string;
  what: string;
  price: string;
};

const SOUPS: Soup[] = [
  { name: 'Zurek', say: 'ZHOO-rek', what: 'Sour rye soup with white sausage and half an egg. On Fridays it comes in a bread bowl.', price: '$9' },
  { name: 'Barszcz', say: 'BARSHCH', what: 'Clear beetroot broth, ruby red, with tiny mushroom dumplings floating in it.', price: '$8' },
  { name: 'Mizeria', say: 'mee-ZEHR-ya', what: 'Cucumber salad in sour cream and dill. Cold and sharp, and the reason the pierogi taste so good.', price: '$5' },
];

const SIDES = [
  ['Pickled beets', '$4'],
  ['Rye bread and butter', '$3'],
  ['Dill pickles, from the barrel', '$3'],
  ['Kompot, stewed fruit to drink', '$3'],
];

/* Twenty chairs at the long table; the booked ones are filled in. */
const SEATS_TOP = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'];
const SEATS_BOTTOM = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'];
const BOOKED = ['t1', 't2', 't3', 't5', 't6', 't9', 'b1', 'b2', 'b4', 'b5', 'b6', 'b10'];

const COURSES = [
  ['First', 'Rosol', 'Golden chicken soup with thin noodles and parsley, the way every Polish Sunday starts.'],
  ['Then', 'Every pierogi', 'A platter down the middle of the table with all five kinds, boiled and fried.'],
  ['Last', 'Plum cake', 'Placek with the plums from the tree behind the kitchen, and a pot of black tea.'],
];

type Frozen = {
  name: string;
  dozen: string;
};

const FROZEN: Frozen[] = [
  { name: 'Ruskie', dozen: '$15' },
  { name: 'Sauerkraut and mushroom', dozen: '$16' },
  { name: 'Beef', dozen: '$18' },
  { name: 'Sweet cheese', dozen: '$15' },
  { name: 'Blueberry', dozen: '$16' },
  { name: 'The mixed dozen, three of each savory', dozen: '$16' },
];

const FROZEN_NOTES = [
  ['Keeps', 'Three months in the freezer, frozen flat the morning they are folded.'],
  ['Cook', 'Straight into boiling salted water. Two minutes after they float, they are done.'],
  ['Order', 'By 18:00 for the next day. A box of three dozen is $42.'],
];

const STEPS = [
  ['1', 'Roll', 'The dough as thin as a coin, on a floured board.'],
  ['2', 'Cut', 'Circles with Babcia\'s own glass, its rim worn smooth.'],
  ['3', 'Fill', 'One spoonful and never more, or they burst.'],
  ['4', 'Pinch', 'Fold, press, then crimp the edge between two fingers.'],
];

const CLASS_FACTS = [
  ['When', 'Saturdays, 10:00-12:30'],
  ['Cost', '$45, flour on your apron included'],
  ['Size', 'Eight people round one table'],
  ['Home', 'Thirty pierogi and the recipe card'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Thursday', '11:00-21:00'],
  ['Friday and Saturday', '11:00-22:00'],
  ['Sunday', '12:30-18:00'],
];

export default function BabciaPierogiPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#faf7f0',
        '--black': '#151515',
        '--red': '#d42b2b',
        '--green': '#2e8b3e',
        '--yellow': '#f4c21e',
        '--blue': '#2466b8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,black,red,green,yellow,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&family=Yeseva+One&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap"
      />

      <header className={s.bar}>
        <nav className={s.navLeft} aria-label="Food">
          {NAV_LEFT.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Babcia</a>
        <nav className={s.navRight} aria-label="Visit">
          {NAV_RIGHT.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link3.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="bp-hero-h">
          <div data-edit-pattern="bpHero.field" data-edit-roles="transparent,2,3,5,4,2" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={bilateral}
              palette={FOLD}
              options={{ frequency: 0.6 }}
              fit="grid"
              cellSize={46}
              seed="bp-fold"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.heroStack}>
            <div className={s.heroSheet}>
              <p data-edit="bpHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Pierogi kitchen, 12 Linden Row, Millbrook</p>
              <h1 data-edit="bpHero.name" data-edit-max="70" id="bp-hero-h" className={s.name}>Babcia</h1>

              <div className={s.heroRow}>
                <div className={s.heroLeft}>
                  <p data-edit="bpHero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>Folded by hand every morning</p>
                  <p data-edit="bpHero.heroText" data-edit-max="240" data-edit-multiline className={s.heroText}>
                    Thin dough, a generous filling and a pinch to close, the way
                    Halina Nowak folded them in Krakow for sixty years. Her
                    grandchildren run the kitchen now. She still checks the edges.
                  </p>
                </div>

                <div className={s.rosette}>
                  <span className={s.rosetteDisc} aria-hidden="true" />
                  <Artwork
                    slug="babcia-pierogi-rooster"
                    alt="A paper-cut of two roosters facing each other among tulips, leaves and small blue flowers, perfectly mirrored"
                    inks={{ red: 'var(--red)', blue: 'var(--blue)', yellow: 'var(--yellow)', black: 'var(--green)' }}
                    className={s.rooster}
                  />
                </div>

                <div className={s.heroRight}>
                  <p data-edit="bpHero.heroLead2" data-edit-max="240" data-edit-multiline className={s.heroLead}>Boiled or fried, six or ten</p>
                  <dl className={s.heroFacts}>
                    <div>
                      <dt data-edit="bpHero.term" data-edit-max="28">Kitchen today</dt>
                      <dd data-edit="bpHero.body" data-edit-max="200" data-edit-multiline>11:00-21:00</dd>
                    </div>
                    <div>
                      <dt data-edit="bpHero.term2" data-edit-max="28">Fillings</dt>
                      <dd data-edit="bpHero.body2" data-edit-max="200" data-edit-multiline>Five, and a soup</dd>
                    </div>
                    <div>
                      <dt data-edit="bpHero.term3" data-edit-max="28">Sunday lunch</dt>
                      <dd data-edit="bpHero.body3" data-edit-max="200" data-edit-multiline>13:00, one long table</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className={s.heroActions}>
                <a data-edit="bpHero.btnRed" data-edit-max="28" className={s.btnRed} href="#pierogi">See the pierogi</a>
                <a data-edit="bpHero.btnLine" data-edit-max="28" className={s.btnLine} href="#sunday">Book Sunday lunch</a>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- PIEROGI */}
        <section id="pierogi" className={s.menuSec} aria-labelledby="bp-menu-h">
          <ul className={s.garland} aria-hidden="true">
            {GARLAND.map((g) => (
              <li key={g.id}>
                <Artwork slug="babcia-pierogi-rooster" alt="" inks={g.inks} className={s.garlandRooster} />
              </li>
            ))}
          </ul>

          <div className={s.secHead}>
            <p data-edit="pierogi.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The menu</p>
            <h2 data-edit="pierogi.title" data-edit-max="60" id="bp-menu-h">The pierogi</h2>
            <p data-edit="pierogi.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Boiled with butter and fried onions, or fried until the edges
              crackle. The same price either way, and a plate of six or ten.
            </p>
          </div>

          <div className={s.menu}>
            <div className={s.menuSide}>
              <p data-edit="pierogi.menuGroup" data-edit-max="240" data-edit-multiline className={s.menuGroup}>Savory</p>
              <ul className={s.dishes}>
                {SAVORY.map((d, i) => (
                  <li key={d.name} className={s.dish}>
                    <h3 data-edit={`pierogi.dishName.${i}`} data-edit-max="40" className={s.dishName}>{d.name}</h3>
                    <p data-edit={`pierogi.dishNote.${i}`} data-edit-max="240" data-edit-multiline className={s.dishNote}>{d.note}</p>
                    <p className={s.dishPrice}>
                      <span data-edit={`pierogi.text.${i}`} data-edit-max="60">{d.six}</span>
                      <span data-edit={`pierogi.text2.${i}`} data-edit-max="60">{d.ten}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <figure className={s.plate}>
              <div className={s.plateRim}>
                <div className={s.plateFace}>
                  <Artwork
                    slug="babcia-pierogi-pierogi"
                    alt="A plate of pierogi topped with fried onions, with a spoonful of sour cream on the side"
                    mode="tint"
                    inks={['color-mix(in oklab, var(--blue) 62%, var(--text))', 'var(--paper)']}
                    className={s.pierogi}
                  />
                </div>
              </div>
              <figcaption data-edit="pierogi.plateCap" data-edit-max="120" data-edit-multiline className={s.plateCap}>Ruskie, fried, with onions and a spoon of sour cream</figcaption>
            </figure>

            <div className={s.menuSide}>
              <p data-edit="pierogi.menuGroup2" data-edit-max="240" data-edit-multiline className={s.menuGroup}>Sweet</p>
              <ul className={s.dishes}>
                {SWEET.map((d, i) => (
                  <li key={d.name} className={s.dish}>
                    <h3 data-edit={`pierogi.dishName2.${i}`} data-edit-max="40" className={s.dishName}>{d.name}</h3>
                    <p data-edit={`pierogi.dishNote2.${i}`} data-edit-max="240" data-edit-multiline className={s.dishNote}>{d.note}</p>
                    <p className={s.dishPrice}>
                      <span data-edit={`pierogi.text3.${i}`} data-edit-max="60">{d.six}</span>
                      <span data-edit={`pierogi.text4.${i}`} data-edit-max="60">{d.ten}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <dl className={s.extras}>
                {EXTRAS.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`pierogi.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`pierogi.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- SOUPS */}
        <section id="soups" className={s.soupSec} aria-labelledby="bp-soup-h">
          <div data-edit-pattern="soups.field" data-edit-roles="transparent,2,1,3,2,5" className={s.stitchBand} aria-hidden="true">
            <TabbiedPattern
              pattern={diadem}
              palette={STITCH}
              options={{ frequency: 0.7 }}
              fit="grid"
              cellSize={30}
              seed="bp-diadem"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.secHead}>
            <p data-edit="soups.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>From the big pots</p>
            <h2 data-edit="soups.title" data-edit-max="60" id="bp-soup-h">Soups and sides</h2>
            <p data-edit="soups.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Three bowls Babcia would not let a meal go without. Say them out
              loud at the counter; we will not laugh, much.
            </p>
          </div>

          <ul className={s.soups}>
            {SOUPS.map((soup, i) => (
              <li key={soup.name} className={s.soupStack}>
                <div className={s.soupCard}>
                  <p data-edit={`soups.soupSay.${i}`} data-edit-max="240" data-edit-multiline className={s.soupSay}>{soup.say}</p>
                  <h3 data-edit={`soups.soupName.${i}`} data-edit-max="40" className={s.soupName}>{soup.name}</h3>
                  <p data-edit={`soups.soupWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.soupWhat}>{soup.what}</p>
                  <p data-edit={`soups.soupPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.soupPrice}>{soup.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <dl className={s.sides}>
            {SIDES.map(([what, price], i) => (
              <div key={what}>
                <dt data-edit={`soups.term.${i}`} data-edit-max="28">{what}</dt>
                <dd data-edit={`soups.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------- SUNDAY */}
        <section id="sunday" className={s.sec} aria-labelledby="bp-sun-h">
          <div className={s.secHead}>
            <p data-edit="sunday.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Every Sunday at 13:00</p>
            <h2 data-edit="sunday.title" data-edit-max="60" id="bp-sun-h">Babcia&apos;s Sunday</h2>
            <p data-edit="sunday.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The tables are pushed together into one, the way they were in her
              flat on Sundays. Twenty chairs, three courses, and you will leave
              knowing your neighbors.
            </p>
          </div>

          <div className={s.table}>
            <ol className={s.seats} aria-label="Chairs on the window side">
              {SEATS_TOP.map((seat) => (
                <li key={seat} className={BOOKED.includes(seat) ? s.seatTaken : s.seatFree}>
                  <span className={s.srOnly}>{BOOKED.includes(seat) ? 'Booked' : 'Free'}</span>
                </li>
              ))}
            </ol>
            <div className={s.tableTop}>
              <div data-edit-pattern="sunday.field" data-edit-roles="transparent,2,5,4,3,2" className={s.runner} aria-hidden="true">
                <TabbiedPattern
                  pattern={ogee}
                  palette={RUNNER}
                  options={{ frequency: 0.85 }}
                  fit="grid"
                  cellSize={28}
                  seed="bp-ogee"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="sunday.tableLabel" data-edit-max="240" data-edit-multiline className={s.tableLabel}>Sunday 4 October: 8 chairs left</p>
            </div>
            <ol className={s.seats} aria-label="Chairs on the wall side">
              {SEATS_BOTTOM.map((seat) => (
                <li key={seat} className={BOOKED.includes(seat) ? s.seatTaken : s.seatFree}>
                  <span className={s.srOnly}>{BOOKED.includes(seat) ? 'Booked' : 'Free'}</span>
                </li>
              ))}
            </ol>
            <p className={s.tableKey}>
              <span data-edit="sunday.keyTaken" data-edit-max="60" className={s.keyTaken}>Booked</span>
              <span data-edit="sunday.keyFree" data-edit-max="60" className={s.keyFree}>Still free</span>
            </p>
          </div>

          <ol className={s.courses}>
            {COURSES.map(([when, name, what], i) => (
              <li key={name}>
                <p data-edit={`sunday.courseWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.courseWhen}>{when}</p>
                <h3 data-edit={`sunday.courseName.${i}`} data-edit-max="40" className={s.courseName}>{name}</h3>
                <p data-edit={`sunday.courseWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.courseWhat}>{what}</p>
              </li>
            ))}
          </ol>

          <div className={s.sundayFoot}>
            <p className={s.sundayPrice}>
              <strong data-edit="sunday.emphasis">$32</strong>
              <span data-edit="sunday.text" data-edit-max="60">a person, $15 under twelve</span>
            </p>
            <a data-edit="sunday.btnRed" data-edit-max="28" className={s.btnRed} href="tel:+15550162208">Call to book a chair</a>
          </div>
        </section>

        {/* ---------------------------------------------------------- FROZEN */}
        <section id="frozen" className={s.frozenSec} aria-labelledby="bp-frozen-h">
          <div className={s.frozen}>
            <div data-edit-pattern="frozen.field" data-edit-roles="transparent,3,2,3,4" className={s.leafPanel} aria-hidden="true">
              <TabbiedPattern
                pattern={lobe}
                palette={LEAVES}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={30}
                seed="bp-lobe-left"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.frozenBody}>
              <p data-edit="frozen.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>From our freezer to yours</p>
              <h2 data-edit="frozen.frozenTitle" data-edit-max="60" id="bp-frozen-h" className={s.frozenTitle}>Frozen to take home</h2>
              <p data-edit="frozen.frozenLede" data-edit-max="240" data-edit-multiline className={s.frozenLede}>By the dozen, folded that morning and frozen flat on trays.</p>
              <ul className={s.dozens}>
                {FROZEN.map((f, i) => (
                  <li key={f.name}>
                    <span data-edit={`frozen.dozenName.${i}`} data-edit-max="60" className={s.dozenName}>{f.name}</span>
                    <span data-edit={`frozen.dozenPrice.${i}`} data-edit-max="60" className={s.dozenPrice}>{f.dozen}</span>
                  </li>
                ))}
              </ul>
              <dl className={s.frozenNotes}>
                {FROZEN_NOTES.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`frozen.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`frozen.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div data-edit-pattern="frozen.field2" data-edit-roles="transparent,3,2,3,4" className={s.leafPanel} aria-hidden="true">
              <TabbiedPattern
                pattern={lobe}
                palette={LEAVES}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={30}
                seed="bp-lobe-right"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- CLASS */}
        <section id="class" className={s.sec} aria-labelledby="bp-class-h">
          <div className={s.secHead}>
            <p data-edit="class.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Saturday mornings</p>
            <h2 data-edit="class.title" data-edit-max="60" id="bp-class-h">The folding class</h2>
            <p data-edit="class.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Two and a half hours at the kitchen table with Kasia, Halina&apos;s
              granddaughter, and a bowl of dough each. By the end your pinch will
              hold.
            </p>
          </div>

          <ol className={s.steps}>
            {STEPS.map(([n, name, what], i) => (
              <li key={n}>
                <span data-edit={`class.stepBadge.${i}`} data-edit-max="60" className={s.stepBadge}>{n}</span>
                <h3 data-edit={`class.stepName.${i}`} data-edit-max="40" className={s.stepName}>{name}</h3>
                <p data-edit={`class.stepWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.stepWhat}>{what}</p>
              </li>
            ))}
          </ol>

          <div className={s.classGrid}>
            <dl className={s.classFacts}>
              {CLASS_FACTS.map(([term, text], i) => (
                <div key={term}>
                  <dt data-edit={`class.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`class.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>

            <div className={s.formStack}>
              <form className={s.form} action="#">
                <h3 data-edit="class.formTitle" data-edit-max="40" className={s.formTitle}>Save a place at the table</h3>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label data-edit="class.label" htmlFor="bp-name">Name</label>
                    <input id="bp-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="class.label2" htmlFor="bp-email">Email</label>
                    <input id="bp-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="class.label3" htmlFor="bp-date">Saturday</label>
                    <select id="bp-date" name="date" defaultValue="oct10">
                      <option value="oct10">10 October</option>
                      <option value="oct24">24 October</option>
                      <option value="nov7">7 November</option>
                      <option value="nov21">21 November</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="class.label4" htmlFor="bp-people">People</label>
                    <select id="bp-people" name="people" defaultValue="1">
                      <option value="1">Just me</option>
                      <option value="2">Two of us</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </select>
                  </div>
                </div>
                <button data-edit="class.submit" data-edit-max="24" className={s.submit} type="submit">Hold my place</button>
                <p data-edit="class.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We confirm by email the same day. Pay on the morning, cash or card.</p>
              </form>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="bp-visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Come hungry</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="bp-visit-h">Hours and the way in</h2>
          </div>

          <div className={s.visit}>
            <dl className={s.hours}>
              {HOURS.map(([day, time], i) => (
                <div key={day}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                </div>
              ))}
            </dl>

            <div className={s.visitMedal}>
              <p data-edit="visit.medalNo" data-edit-max="240" data-edit-multiline className={s.medalNo}>12</p>
              <p data-edit="visit.medalStreet" data-edit-max="240" data-edit-multiline className={s.medalStreet}>Linden Row</p>
              <p data-edit="visit.medalTown" data-edit-max="240" data-edit-multiline className={s.medalTown}>Millbrook</p>
            </div>

            <div className={s.visitText}>
              <p data-edit="visit.visitWay" data-edit-max="240" data-edit-multiline className={s.visitWay}>
                Between the bakery and the bookshop, opposite Saint Anne&apos;s.
                Parking on Mill Street, two minutes away. The door is step-free
                and we have two high chairs.
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550162208">(555) 016-2208</a>
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:kitchen@babciapierogi.example">kitchen@babciapierogi.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,5,4,2" className={s.hem} aria-hidden="true">
          <TabbiedPattern
            pattern={bilateral}
            palette={HEM}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={30}
            seed="bp-hem"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Babcia</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional pierogi kitchen. The family, the dishes, the prices and the Sunday table are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The rooster and the plate are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
