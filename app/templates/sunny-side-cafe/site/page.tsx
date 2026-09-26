import { TabbiedPattern } from 'tabbied/react';
import { bowl, cove, scotia } from 'tabbied/patterns';
import s from './sunny-side-cafe.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Sunny Side: Breakfast and brunch cafe, Marigold Avenue',
  description:
    'Sunny Side has served breakfast on Marigold Avenue since 1977. Eggs cooked to the egg-o-meter, pancakes, bottomless coffee, the weekend brunch rules and where to find us.',
};

/* Site colors. The wave bands and the plate lay their shapes on a
   transparent ground, so the cream of the page runs between the stripes. */
const CREAM = '#f7ead0';
const BROWN = '#4b2913';
const ORANGE = '#e2692b';
const MUSTARD = '#e7ab32';
const RUST = '#b5471f';

const WAVES = ['transparent', ORANGE, MUSTARD, RUST, BROWN, ORANGE];
const BOWLS = ['transparent', MUSTARD, CREAM, RUST, MUSTARD];
const PLATE = ['transparent', BROWN, ORANGE, MUSTARD, RUST];

const NAV = [
  ['The menu', '#menu'],
  ['Egg-o-meter', '#eggs'],
  ['Brunch rules', '#brunch'],
  ['Since 1977', '#story'],
  ['Find us', '#visit'],
];

const HOURS_STRIP = [
  ['Every day', '6:30 am to 2:30 pm'],
  ['Brunch', 'Sat and Sun from 8'],
  ['Coffee', 'bottomless, $3'],
];

type Egg = {
  name: string;
  yolk: string;
  note: string;
  cls: string;
};

const METER: Egg[] = [
  { name: 'Sunny side up', yolk: 'Runs if you look at it', note: 'Never flipped, basted in butter', cls: 'egg1' },
  { name: 'Over easy', yolk: 'Runs when you cut it', note: 'Flipped for ten seconds', cls: 'egg2' },
  { name: 'Over medium', yolk: 'Jammy in the middle', note: 'The one we get asked for most', cls: 'egg3' },
  { name: 'Over hard', yolk: 'Set, still soft', note: 'Good in a sandwich', cls: 'egg4' },
  { name: 'Scrambled', yolk: 'Soft curds, never dry', note: 'With a splash of cream', cls: 'egg5' },
];

type Dish = {
  name: string;
  body: string;
  price: string;
  eggs: string;
};

const EGGS: Dish[] = [
  { name: 'The Sunny Side', body: 'Two eggs, hash browns, bacon or sausage links, and toast', price: '$11.50', eggs: 'Comes sunny side up' },
  { name: 'Huevos rancheros', body: 'Fried eggs on corn tortillas, ranchero sauce, black beans, cotija', price: '$13.00', eggs: 'Comes over easy' },
  { name: 'Corned beef hash', body: 'Cured here, crisped on the flat-top, two eggs on top', price: '$14.50', eggs: 'Comes over medium' },
  { name: 'Eggs in a basket', body: 'Eggs fried in a hole in thick toast, greens on the side', price: '$9.50', eggs: 'Comes over easy' },
  { name: 'Three-egg omelet', body: 'Ham and cheddar, or spinach, mushroom and feta, with toast', price: '$12.50', eggs: 'Folded, not flipped' },
  { name: 'Steak and eggs', body: 'Six-ounce flat iron, two eggs, home fries', price: '$18.00', eggs: 'Comes over medium' },
];

const GRIDDLE = [
  ['Buttermilk pancakes', 'Short stack of two, or tall stack of four', '$8 / $11'],
  ['Blueberry or banana-walnut', 'Folded into any stack', '+$2'],
  ['French toast', 'Thick-cut challah, cinnamon, powdered sugar', '$11'],
  ['Malted waffle', 'Whipped butter and warm syrup', '$10'],
  ["Dolores's biscuits", 'Two buttermilk biscuits, sausage gravy', '$10.50'],
];

const SIDES = [
  ['Bacon or sausage', '$4'],
  ['Hash browns', '$4'],
  ['One egg, any way', '$2'],
  ['Toast or a muffin', '$2.50'],
  ['Grits with butter', '$3.50'],
  ['Fruit cup', '$4.50'],
];

const DRINKS = [
  ['Coffee, bottomless', '$3'],
  ['Orange juice', '$4.50'],
  ['Hot chocolate', '$3.50'],
  ['Chocolate milk', '$3'],
  ['Mimosa, from 10 am', '$8'],
];

const RULES = [
  ['No reservations', 'Write your name on the board by the door and we will call it out. Loudly.'],
  ['Everyone here first', 'We seat the whole party, not half of it. Coffee while you wait is on us.'],
  ['Big tables go early', 'Seven or more before 9 am, or after 1, when we can push tables together.'],
  ['An hour at the table', 'Only when there is a line out the door. We will never rush you before that.'],
  ['Two mimosas each', 'The coffee is bottomless. The mimosas are not.'],
  ['Specials run out', "Saturday's cinnamon roll French toast and Sunday's chilaquiles are usually gone by 11:30."],
];

const YEARS = [
  ['1977', 'Dolores and Hank Ruiz open with eight stools and the flat-top that is still behind the counter.'],
  ['1989', 'The laundromat next door closes and becomes the back room, with the orange booths.'],
  ['2019', 'Their granddaughter Tess takes over. Nothing on the menu changes except the price of coffee.'],
];

const CREW = [
  ['Tess Ruiz', 'Owner, front of house'],
  ['Manny Ocampo', 'On the griddle since 1996'],
  ['Jo Kim', 'Pancakes and biscuits'],
  ['June Adeyemi', 'Saturdays, and the board'],
];

const VISIT = [
  ['Where', '1203 Marigold Avenue, Linden Flats. Parking lot behind, off Hazel Street.'],
  ['Takeout', 'Call ahead on (555) 016-3377 and we bring it to the counter.'],
  ['Kids', 'Half stacks, high chairs and crayons. Kids eat free before 9 on Sundays.'],
  ['Dogs', 'Welcome on the patio, with a bowl of water and a plain sausage.'],
];

export default function SunnySidePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#f7ead0',
        '--brown': '#4b2913',
        '--orange': '#e2692b',
        '--mustard': '#e7ab32',
        '--rust': '#b5471f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,brown,orange,mustard,rust"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Rubik:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Sunny Side</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A striped sun coming up behind the name, 1977 all over. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.sun} aria-hidden="true" />
          <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Breakfast and brunch on Marigold Avenue, since 1977</p>
          <h1 data-edit="hero.title" data-edit-max="70" id="hero-h" className={s.title}>Sunny Side</h1>
          <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
            Eggs the way you like them, pancakes the size of the plate and
            coffee that keeps coming. Breakfast all day, every day, and
            brunch on the weekend if you can get a table.
          </p>
          <dl className={s.strip}>
            {HOURS_STRIP.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`hero.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The first wave band. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4,1,2" className={s.waves} aria-hidden="true">
          <TabbiedPattern
            pattern={cove}
            palette={WAVES}
            fit="grid"
            cellSize={46}
            seed="sunny-waves"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------ EGG-O-METER */}
        <section id="eggs" className={s.meterSec} aria-labelledby="eggs-h">
          <div className={s.meterHead}>
            <h2 data-edit="eggs.title" data-edit-max="60" id="eggs-h">The egg-o-meter</h2>
            <p data-edit="eggs.meterNote" data-edit-max="240" data-edit-multiline className={s.meterNote}>
              Point at it when you order. Manny cooks to the egg, not to the
              word, because nobody agrees what over easy means.
            </p>
          </div>
          <ol className={s.meter}>
            {METER.map((e, i) => (
              <li key={e.name}>
                <span className={`${s.egg} ${s[e.cls]}`} aria-hidden="true" />
                <strong data-edit={`eggs.eggName.${i}`} className={s.eggName}>{e.name}</strong>
                <span data-edit={`eggs.eggYolk.${i}`} data-edit-max="60" className={s.eggYolk}>{e.yolk}</span>
                <span data-edit={`eggs.eggNote.${i}`} data-edit-max="60" className={s.eggNote}>{e.note}</span>
              </li>
            ))}
          </ol>
          <p className={s.scale}>
            <span data-edit="eggs.text" data-edit-max="60">Runny</span>
            <span data-edit="eggs.text2" data-edit-max="60">Set</span>
          </p>
        </section>

        {/* ------------------------------------------------------------ MENU */}
        <section id="menu" className={s.menuSec} aria-labelledby="menu-h">
          <div className={s.menuHead}>
            <h2 data-edit="menu.title" data-edit-max="60" id="menu-h">The menu</h2>
            <p data-edit="menu.menuNote" data-edit-max="240" data-edit-multiline className={s.menuNote}>
              All day, every day. Every egg plate comes with two eggs cooked
              where you point on the meter, and toast: white, wheat, rye or
              sourdough.
            </p>
            <Artwork
              slug="sunny-side-cafe-pancakes"
              alt="A tall stack of pancakes with a pat of butter and syrup running down the sides"
              inks={{ red: 'var(--orange)', yellow: 'var(--mustard)', blue: 'var(--syrup)', black: 'var(--display-ink)' }}
              className={s.stack}
            />
          </div>

          <div className={s.card}>
            <div className={s.cardCol}>
              <h3 data-edit="menu.cardHead" data-edit-max="40" className={s.cardHead}>From the eggs</h3>
              <ul className={s.dishes}>
                {EGGS.map((d, i) => (
                  <li key={d.name} className={s.dish}>
                    <p className={s.dishLine}>
                      <span data-edit={`menu.dishName.${i}`} data-edit-max="60" className={s.dishName}>{d.name}</span>
                      <span data-edit={`menu.dishPrice.${i}`} data-edit-max="60" className={s.dishPrice}>{d.price}</span>
                    </p>
                    <p data-edit={`menu.dishBody.${i}`} data-edit-max="240" data-edit-multiline className={s.dishBody}>{d.body}</p>
                    <p data-edit={`menu.dishEggs.${i}`} data-edit-max="240" data-edit-multiline className={s.dishEggs}>{d.eggs}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.cardCol}>
              <h3 data-edit="menu.cardHead2" data-edit-max="40" className={s.cardHead}>Off the griddle</h3>
              <ul className={s.dishes}>
                {GRIDDLE.map(([name, body, price], i) => (
                  <li key={name} className={s.dish}>
                    <p className={s.dishLine}>
                      <span data-edit={`menu.dishName2.${i}`} data-edit-max="60" className={s.dishName}>{name}</span>
                      <span data-edit={`menu.dishPrice2.${i}`} data-edit-max="60" className={s.dishPrice}>{price}</span>
                    </p>
                    <p data-edit={`menu.dishBody2.${i}`} data-edit-max="240" data-edit-multiline className={s.dishBody}>{body}</p>
                  </li>
                ))}
              </ul>

              <div className={s.twoLists}>
                <div>
                  <h3 data-edit="menu.cardHead3" data-edit-max="40" className={s.cardHead}>On the side</h3>
                  <dl className={s.small}>
                    {SIDES.map(([name, price], i) => (
                      <div key={name}>
                        <dt data-edit={`menu.term.${i}`} data-edit-max="28">{name}</dt>
                        <dd data-edit={`menu.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 data-edit="menu.cardHead4" data-edit-max="40" className={s.cardHead}>To drink</h3>
                  <dl className={s.small}>
                    {DRINKS.map(([name, price], i) => (
                      <div key={name}>
                        <dt data-edit={`menu.term2.${i}`} data-edit-max="28">{name}</dt>
                        <dd data-edit={`menu.body2.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <p data-edit="menu.fine" data-edit-max="240" data-edit-multiline className={s.fine}>
            Gluten-free toast and pancakes on request; the griddle is shared.
            Oat milk is free. We add 18% for tables of seven or more.
          </p>
        </section>

        {/* ---------------------------------------------------------- BRUNCH */}
        <section id="brunch" className={s.brunch} aria-labelledby="brunch-h">
          <div className={s.brunchInner}>
            <div className={s.brunchText}>
              <p data-edit="brunch.brunchKicker" data-edit-max="240" data-edit-multiline className={s.brunchKicker}>Saturdays and Sundays, 8 am to 2:30 pm</p>
              <h2 data-edit="brunch.title" data-edit-max="60" id="brunch-h">Weekend brunch rules</h2>
              <p data-edit="brunch.brunchNote" data-edit-max="240" data-edit-multiline className={s.brunchNote}>
                We have forty seats and on a Sunday about four hundred
                people want one. These keep it fair.
              </p>
              <ol className={s.rules}>
                {RULES.map(([title, body], i) => (
                  <li key={title}>
                    <strong data-edit={`brunch.emphasis.${i}`}>{title}</strong>
                    <p data-edit={`brunch.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div data-edit-pattern="brunch.field" data-edit-roles="transparent,3,0,4,3" className={s.booth} aria-hidden="true">
              <TabbiedPattern
                pattern={bowl}
                palette={BOWLS}
                fit="grid"
                cellSize={52}
                seed="sunny-bowls"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- STORY */}
        <section id="story" className={s.sec} aria-labelledby="story-h">
          <div className={s.storyGrid}>
            <div className={s.plateWrap}>
              <div data-edit-pattern="story.field" data-edit-roles="transparent,1,2,3,4" className={s.plate} aria-hidden="true">
                <TabbiedPattern
                  pattern={scotia}
                  palette={PLATE}
                  fit="grid"
                  cellSize={44}
                  seed="sunny-plate"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div>
              <h2 data-edit="story.secTitle" data-edit-max="60" id="story-h" className={s.secTitle}>Since 1977</h2>
              <p data-edit="story.prose" data-edit-max="240" data-edit-multiline className={s.prose}>
                Same corner, same griddle, three owners, all of them called
                Ruiz. The booths are the orange you are thinking of, and they
                are staying that way.
              </p>
              <ol className={s.years}>
                {YEARS.map(([year, what], i) => (
                  <li key={year}>
                    <span data-edit={`story.year.${i}`} data-edit-max="60" className={s.year}>{year}</span>
                    <p data-edit={`story.body.${i}`} data-edit-max="240" data-edit-multiline>{what}</p>
                  </li>
                ))}
              </ol>
              <ul className={s.crew}>
                {CREW.map(([name, role], i) => (
                  <li key={name} className={s.badge}>
                    <strong data-edit={`story.emphasis.${i}`}>{name}</strong>
                    <span data-edit={`story.text.${i}`} data-edit-max="60">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The closing wave band. */}
        <div data-edit-pattern="top.field2" data-edit-roles="transparent,2,3,4,1,2" className={`${s.waves} ${s.wavesLow}`} aria-hidden="true">
          <TabbiedPattern
            pattern={cove}
            palette={WAVES}
            fit="grid"
            cellSize={46}
            seed="sunny-waves-low"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visitGrid}>
            <div className={s.sign}>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>Find us</h2>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>1203 Marigold Avenue</p>
              <p data-edit="visit.prose" data-edit-max="240" data-edit-multiline className={s.prose}>Open every day, 6:30 am to 2:30 pm. Closed Thanksgiving and Christmas Day, and that is it.</p>
              <p className={s.phone}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550163377">(555) 016-3377</a>
              </p>
              <p className={s.phone}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:eggs@sunnysidecafe.example">eggs@sunnysidecafe.example</a>
              </p>
            </div>
            <dl className={s.visitList}>
              {VISIT.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Sunny Side</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional breakfast and brunch cafe. The menu, prices, people and address are invented.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>; the pancakes are a generated picture drawn in the page's own colors.
        </p>
      </footer>
    </div>
  );
}
