import { TabbiedPattern } from 'tabbied/react';
import { bowl, rimband } from 'tabbied/patterns';
import s from './pho-nam.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Pho Nam: Vietnamese noodle house, Lantern Street',
  description:
    'Pho Nam serves beef and chicken pho from one fourteen-hour pot on Lantern Street. The numbered board, the broth, the extras, the kitchen hours with the time the pot goes on, and pick-up orders.',
};

/* Site colors, the same values as the roles on .page. Every pattern draws
   on a transparent ground, so the bowls sit on whatever the counter behind
   them is: the green board, or the cream of the broth card. */
const BOARD = '#0e3a2c';
const RICE = '#f2e9d4';
const CHILI = '#cf3328';
const BROTH = '#e6ab3a';
const JADE = '#2a6b50';

const STACK = ['transparent', CHILI, RICE, BROTH, JADE];
const SHELF = ['transparent', CHILI, BROTH, RICE];
const RIMS = ['transparent', BOARD, CHILI, BROTH, JADE];
const SILL = ['transparent', JADE, CHILI, BROTH];

const NAV = [
  ['The board', '#board'],
  ['Broth', '#broth'],
  ['Extras', '#extras'],
  ['The table', '#table'],
  ['Hours', '#hours'],
  ['Pick-up', '#pickup'],
  ['Find us', '#find'],
];

const TODAY = [
  ['Broth on', '4:30 am'],
  ['Doors', '10:30 am'],
  ['Last bowl', '9:00 pm'],
];

type Pho = {
  no: string;
  vn: string;
  en: string;
  note: string;
  small: string;
  large: string;
};

const PHO: Pho[] = [
  { no: '1', vn: 'Phở tái', en: 'Rare steak', note: 'Eye of round sliced thin and laid raw on the noodles. The broth cooks it on the way to your table.', small: '13.00', large: '15.50' },
  { no: '2', vn: 'Phở chín', en: 'Well-done brisket', note: 'Brisket that spent the morning in the pot, sliced across the grain.', small: '13.00', large: '15.50' },
  { no: '3', vn: 'Phở tái nạm', en: 'Rare steak and flank', note: 'Half and half, for anyone who cannot choose between 1 and 2.', small: '13.50', large: '16.00' },
  { no: '4', vn: 'Phở đặc biệt', en: 'The house special', note: 'Rare steak, brisket, flank, tendon, tripe and meatballs. The one the cooks eat.', small: '15.50', large: '18.00' },
  { no: '5', vn: 'Phở bò viên', en: 'Beef meatballs', note: 'Pounded by hand on Tuesdays, springy, flecked with black pepper.', small: '12.50', large: '15.00' },
  { no: '6', vn: 'Phở gà', en: 'Chicken', note: 'Clear chicken broth, poached thigh and breast, ginger and scallion sauce on the side.', small: '12.50', large: '15.00' },
  { no: '7', vn: 'Phở chay', en: 'Vegetable', note: 'Charred onion, daikon and shiitake broth, fried tofu, bok choy. Vegan as it comes.', small: '12.00', large: '14.50' },
];

type Plate = {
  no: string;
  vn: string;
  en: string;
  note: string;
  price: string;
};

const RICEBOWLS: Plate[] = [
  { no: '8', vn: 'Bún bò Huế', en: 'Spicy lemongrass beef noodles', note: 'Thick round noodles, shank and pork hock under a slick of red chili oil. Friday to Sunday.', price: '16.50' },
  { no: '9', vn: 'Bún thịt nướng', en: 'Grilled pork vermicelli', note: 'Cold noodles, lemongrass pork off the grill, herbs, peanuts, nước chấm to pour.', price: '15.00' },
  { no: '10', vn: 'Cơm tấm', en: 'Broken rice and pork chop', note: 'A grilled chop, a fried egg, pickles and a cup of broth on the side.', price: '16.00' },
];

const SMALL: Plate[] = [
  { no: '11', vn: 'Gỏi cuốn', en: 'Fresh rolls, two', note: 'Shrimp, pork, herbs and rice paper, with peanut hoisin to dip.', price: '7.50' },
  { no: '12', vn: 'Chả giò', en: 'Fried spring rolls, three', note: 'Pork and taro, with lettuce and herbs to wrap them in.', price: '8.00' },
  { no: '13', vn: 'Gỏi gà', en: 'Chicken and cabbage salad', note: 'Poached chicken, shredded cabbage, rau răm and fried shallot.', price: '11.00' },
  { no: '14', vn: 'Bánh mì', en: 'Brisket banh mi', note: 'Brisket from the pot, pickles, chili, and broth to dip it in. Until 3 pm.', price: '11.50' },
];

const POT = [
  { time: '4:30', half: 'am', what: 'Bones in', note: 'Forty kilos of marrow and knuckle bones, blanched hard for ten minutes, drained and scrubbed. That is what keeps the broth clear.' },
  { time: '5:00', half: 'am', what: 'Back in the pot', note: 'Fresh water, a hundred and twenty liters, and six oxtails. From here it never boils again. It only shivers.' },
  { time: '6:30', half: 'am', what: 'Onion and ginger', note: 'Twelve onions and a hand of ginger charred black on the burner grate, peeled and dropped in whole.' },
  { time: '8:00', half: 'am', what: 'The spice bag', note: 'Star anise, cinnamon bark, clove, black cardamom, coriander and fennel seed, toasted dry. In for two hours, then out.' },
  { time: '10:00', half: 'am', what: 'Seasoned', note: 'Fish sauce, rock sugar and salt. Tasted by Lan, then by whoever is on the pass. They have to agree.' },
  { time: '10:30', half: 'am', what: 'First bowl', note: 'Doors open. The broth has had six hours and keeps going all day.' },
  { time: '9:00', half: 'pm', what: 'Pot empty', note: 'Or near enough. When the ladle scrapes the bottom, we close.' },
];

const OTHER_POTS = [
  ['Chicken', 'Whole birds and feet with charred shallot and ginger, six hours. Its own pot and its own ladle.'],
  ['Vegetable', 'Daikon, charred onion, shiitake, apple and corn cobs, five hours. No meat goes near it.'],
  ['Bún bò Huế', 'Shank and pork bones with lemongrass and fermented shrimp, Friday to Sunday only.'],
];

const EXTRAS = [
  ['Extra rare steak', '4.00'],
  ['Extra brisket', '4.00'],
  ['Extra tendon', '4.00'],
  ['Meatballs, three', '3.00'],
  ['Bone marrow, in the bowl', '4.50'],
  ['Raw egg yolk', '1.50'],
  ['Nước béo, a spoon of beef fat', '1.00'],
  ['Extra noodles', '2.50'],
  ['Quẩy, fried dough to dunk', '2.50'],
  ['A side bowl of broth', '3.50'],
  ['More herbs and sprouts', 'Free'],
  ['A second lime', 'Free'],
];

const DRINKS = [
  ['Cà phê sữa đá', 'Iced coffee with condensed milk, dripped through a phin at your table', '5.50'],
  ['Trà đá', 'Iced jasmine tea, refilled without asking', '2.00'],
  ['Soda chanh', 'Salted lime soda', '4.50'],
  ['Nước mía', 'Sugarcane pressed to order, weekends', '5.00'],
  ['Sữa đậu nành', 'Our own soy milk, with pandan', '3.50'],
];

const ON_TABLE = [
  'Thai basil',
  'Sawtooth herb',
  'Bean sprouts',
  'Lime',
  'Sliced jalapeño',
  'Hoisin',
  'Sriracha',
  'House chili oil',
  'Pickled garlic vinegar',
  'Fish sauce',
];

const HOW = [
  'Taste the broth first, before anything goes in.',
  'Tear the basil and the sawtooth into the bowl. Sprouts too, if you like a crunch; they wilt in a minute.',
  'One squeeze of lime. One, not three.',
  'Hoisin and sriracha go in the little dish, for dipping the meat. Not in the broth. We will not stop you, but we will notice.',
  'Noodles with the chopsticks, broth with the spoon, and lift the bowl to finish it. That is allowed here.',
];

type Day = {
  day: string;
  pot: string;
  open: string;
  last: string;
  shut?: boolean;
};

const HOURS: Day[] = [
  { day: 'Monday', pot: 'The pot rests', open: 'Closed', last: '', shut: true },
  { day: 'Tuesday', pot: '4:30 am', open: '10:30 am', last: '9:00 pm' },
  { day: 'Wednesday', pot: '4:30 am', open: '10:30 am', last: '9:00 pm' },
  { day: 'Thursday', pot: '4:30 am', open: '10:30 am', last: '9:00 pm' },
  { day: 'Friday', pot: '4:00 am', open: '10:30 am', last: '10:00 pm' },
  { day: 'Saturday', pot: '4:00 am', open: '10:00 am', last: '10:00 pm' },
  { day: 'Sunday', pot: '5:00 am', open: '10:00 am', last: '8:00 pm' },
];

const FAMILY = [
  ['Lan Trần', 'The broth', 'Starts the pot at 4:30 and has since the first morning in 2009. Tastes every batch.'],
  ['Hải Trần', 'The weekend pot', 'Makes the bún bò Huế, keeps the books, fixes the burners.'],
  ['Minh Trần', 'The pass', 'Their son. Takes your number, calls it back, and knows the regulars by their order.'],
];

export default function PhoNamPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Pho Nam</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550142288">(555) 014-2288</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div>
            <p className={s.kicker}>Noodle house, 88 Lantern Street, since 2009</p>
            <h1 id="hero-h" className={s.name}>Pho Nam</h1>
            <p className={s.lede}>
              Beef and chicken pho from one fourteen-hour pot, a short list of
              noodles and rice around it, and a counter where you order by
              number. Say it, pay, sit anywhere. Minh will call it.
            </p>
            <dl className={s.today}>
              {TODAY.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.heroArt}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={bowl}
                palette={STACK}
                fit="grid"
                cellSize={64}
                seed="pho-nam-stack"
                options={{ frequency: 0.9 }}
                redrawInterval={7000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.sticker}>Order by number</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- BOARD */}
        <section id="board" className={s.board} aria-labelledby="board-h">
          <div className={s.head}>
            <h2 id="board-h">The board</h2>
            <p className={s.headNote}>
              Say the number at the counter. A small is a lunch bowl, a large
              is dinner. Every pho comes with a plate of basil, sprouts, lime
              and chili, and more if you ask.
            </p>
          </div>

          <ol className={s.phoList}>
            {PHO.map((d) => (
              <li key={d.no}>
                <span className={s.no}>{d.no}</span>
                <div className={s.dish}>
                  <h3>{d.vn}</h3>
                  <p className={s.en}>{d.en}</p>
                  <p className={s.note}>{d.note}</p>
                </div>
                <dl className={s.sizes}>
                  <div>
                    <dt>S</dt>
                    <dd>{d.small}</dd>
                  </div>
                  <div>
                    <dt>L</dt>
                    <dd>{d.large}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>

          <div className={s.lower}>
            <div>
              <h3 className={s.groupTitle}>Not soup</h3>
              <ol className={s.plateList}>
                {RICEBOWLS.map((d) => (
                  <li key={d.no}>
                    <span className={s.noSmall}>{d.no}</span>
                    <div className={s.dish}>
                      <h4>{d.vn}</h4>
                      <p className={s.en}>{d.en}</p>
                      <p className={s.note}>{d.note}</p>
                    </div>
                    <span className={s.price}>{d.price}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className={s.groupTitle}>Small plates</h3>
              <ol className={s.plateList}>
                {SMALL.map((d) => (
                  <li key={d.no}>
                    <span className={s.noSmall}>{d.no}</span>
                    <div className={s.dish}>
                      <h4>{d.vn}</h4>
                      <p className={s.en}>{d.en}</p>
                      <p className={s.note}>{d.note}</p>
                    </div>
                    <span className={s.price}>{d.price}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* The shelf of bowls between the board and the kitchen. */}
        <div className={s.shelf} aria-hidden="true">
          <TabbiedPattern
            pattern={bowl}
            palette={SHELF}
            fit="grid"
            cellSize={44}
            seed="pho-nam-shelf"
            options={{ frequency: 0.8 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- BROTH */}
        <section id="broth" className={s.broth} aria-labelledby="broth-h">
          <div className={s.brothInner}>
            <div className={s.brothHead}>
              <p className={s.kickerDark}>The pot, every morning but Monday</p>
              <h2 id="broth-h">The broth goes on at <em>4:30</em></h2>
              <p className={s.brothLede}>
                One stockpot the size of a barrel, on the back burner, from
                before the street lights go off until the last bowl. This is
                its day.
              </p>
            </div>

            <ol className={s.pot}>
              {POT.map((p) => (
                <li key={p.what}>
                  <p className={s.potTime}>
                    <span>{p.time}</span>
                    <small>{p.half}</small>
                  </p>
                  <div>
                    <h3>{p.what}</h3>
                    <p>{p.note}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className={s.otherPots} aria-labelledby="pots-h">
              <div className={s.bowlTop} aria-hidden="true">
                <TabbiedPattern
                  pattern={rimband}
                  palette={RIMS}
                  fit="grid"
                  cellSize={36}
                  seed="pho-nam-rims"
                  options={{ frequency: 0.85 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 id="pots-h" className={s.potsTitle}>The other pots</h3>
              <dl className={s.potsList}>
                {OTHER_POTS.map(([name, note]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{note}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------- EXTRAS */}
        <section id="extras" className={s.sec} aria-labelledby="extras-h">
          <div className={s.head}>
            <h2 id="extras-h">Extras, said after the number</h2>
            <p className={s.headNote}>
              Tell us at the counter, the way the regulars do.
            </p>
          </div>

          <p className={s.sayIt}>Four, large, extra tendon, no onion.</p>

          <div className={s.extrasGrid}>
            <ul className={s.extras}>
              {EXTRAS.map(([name, price]) => (
                <li key={name}>
                  <span className={s.extraPrice}>{price}</span>
                  <span className={s.extraName}>{name}</span>
                </li>
              ))}
            </ul>

            <div className={s.drinks}>
              <h3 className={s.groupTitle}>To drink</h3>
              <ul>
                {DRINKS.map(([vn, en, price]) => (
                  <li key={vn}>
                    <div>
                      <strong>{vn}</strong>
                      <span>{en}</span>
                    </div>
                    <span className={s.price}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TABLE */}
        <section id="table" className={s.table} aria-labelledby="table-h">
          <div className={s.tableInner}>
            <div>
              <h2 id="table-h">On every table</h2>
              <ul className={s.chips}>
                {ON_TABLE.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className={s.tableNote}>
                Chopsticks and a soup spoon at every place. Forks at the
                counter, no questions asked. Napkins are in the tin; take a
                handful, you will need them.
              </p>
            </div>
            <div>
              <h3 className={s.groupTitle}>How we would eat it</h3>
              <ol className={s.how}>
                {HOW.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS
            The sign on the door, in red: the one band that is not the board. */}
        <section id="hours" className={s.hoursBand} aria-labelledby="hours-h">
          <div className={s.hoursInner}>
            <div className={s.head}>
              <h2 id="hours-h">Kitchen hours</h2>
              <p className={s.headNote}>
                The first column is when Lan lights the burner. The last bowl
                is the time below or the moment the pot runs dry, whichever
                comes first. Most nights it is the time.
              </p>
            </div>

            <table className={s.hours}>
              <caption className={s.srOnly}>Opening hours and the time the broth goes on, by day</caption>
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Broth on</th>
                  <th scope="col">Doors</th>
                  <th scope="col">Last bowl</th>
                </tr>
              </thead>
              <tbody>
                {HOURS.map((h) => (
                  <tr key={h.day} className={h.shut ? s.shut : undefined}>
                    <th scope="row">{h.day}</th>
                    <td className={s.potCol}>{h.pot}</td>
                    <td>{h.open}</td>
                    <td>{h.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------------------------------------------------- PICKUP */}
        <section id="pickup" className={s.sec} aria-labelledby="pickup-h">
          <div className={s.pickup}>
            <div>
              <h2 id="pickup-h">Pick-up</h2>
              <p className={s.prose}>
                Everything on the board travels. The broth goes in its own
                quart, the noodles, meat and herbs beside it, so nothing is
                soggy by the time you are home. Bring the broth back to a boil
                and pour it over; the rare steak cooks in the bowl, as it does
                here.
              </p>
              <dl className={s.quarts}>
                <div>
                  <dt>Beef broth, frozen, by the quart</dt>
                  <dd>9.00</dd>
                </div>
                <div>
                  <dt>Chicken broth, frozen, by the quart</dt>
                  <dd>8.00</dd>
                </div>
                <div>
                  <dt>Ten bowls or more</dt>
                  <dd>Two days' notice</dd>
                </div>
              </dl>
            </div>

            <form className={s.form} action="#">
              <h3 className={s.formTitle}>Order ahead</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="pho-name">Name</label>
                  <input id="pho-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pho-phone">Phone</label>
                  <input id="pho-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pho-time">Pick-up time</label>
                  <input id="pho-time" name="time" type="time" min="10:30" max="21:00" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pho-pack">Packing</label>
                  <select id="pho-pack" name="pack" defaultValue="apart">
                    <option value="apart">Broth packed apart</option>
                    <option value="together">Eating it in the car</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label htmlFor="pho-order">Your order, by number</label>
                  <textarea id="pho-order" name="order" rows={3} placeholder="2 x No. 4 large, 1 x No. 11" />
                </div>
              </div>
              <button className={s.submit} type="submit">Send it to the pass</button>
              <p className={s.formNote}>Ready in fifteen minutes at the counter's left end. Pay when you collect.</p>
            </form>
          </div>
        </section>

        {/* ---------------------------------------------------------- FAMILY */}
        <section className={s.sec} aria-labelledby="family-h">
          <div className={s.head}>
            <h2 id="family-h">Behind the counter</h2>
            <p className={s.headNote}>
              Lan and Hải opened with one pot and six stools. There are
              thirty-eight seats now and still one pot.
            </p>
          </div>
          <ul className={s.family}>
            {FAMILY.map(([name, role, note]) => (
              <li key={name}>
                <p className={s.role}>{role}</p>
                <h3>{name}</h3>
                <p className={s.note}>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ FIND */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.find}>
            <div>
              <h2 id="find-h">88 Lantern Street</h2>
              <p className={s.prose}>
                On the corner of the Canal Market arcade, under the red awning.
                The 14 bus stops outside; it is two stops from Riverside.
              </p>
            </div>
            <dl className={s.facts}>
              <div>
                <dt>Call</dt>
                <dd>
                  <a href="tel:+15550142288">(555) 014-2288</a>
                </dd>
              </div>
              <div>
                <dt>Write</dt>
                <dd>
                  <a href="mailto:hello@phonam.example">hello@phonam.example</a>
                </dd>
              </div>
              <div>
                <dt>Seats</dt>
                <dd>Thirty-eight, and eight stools at the counter. Two high chairs.</dd>
              </div>
              <div>
                <dt>Getting in</dt>
                <dd>Step-free from the arcade side. One step from the street.</dd>
              </div>
              <div>
                <dt>Paying</dt>
                <dd>Card and cash at the till. No tabs, no checks.</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.sill} aria-hidden="true">
          <TabbiedPattern
            pattern={bowl}
            palette={SILL}
            fit="grid"
            cellSize={36}
            seed="pho-nam-sill"
            options={{ frequency: 0.6 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>Pho Nam</p>
          <p>A fictional Vietnamese noodle house. The menu, prices, hours and family are invented.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
