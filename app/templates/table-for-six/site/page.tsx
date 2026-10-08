import { TabbiedPattern } from 'tabbied/react';
import { tesserae } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './table-for-six.module.css';

export const metadata = {
  title: 'Table for Six: Private chef for dinner parties and weekly meals',
  description:
    'Table for Six is a private chef who cooks seasonal dinner parties in your kitchen and weekly meals for busy households. Every diet and allergy planned for, groceries included, the dishes done before dessert.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   dinner laid on a tiled table: tesserae is the mosaic tabletop under the
   menu card in the hero, a strip of tiles between the courses, and the
   border along the foot of the page. The tiles are paprika, saffron and
   herb, the three things in every dish on the autumn card. */
const CLOTH = '#1f2b26';
const CARD = '#f3ebdc';
const PAPRIKA = '#c8553d';
const SAFFRON = '#e3a73e';
const HERB = '#8aa37b';

const TABLETOP = ['transparent', PAPRIKA, SAFFRON, HERB];
const STRIP = ['transparent', HERB, CARD, SAFFRON];
const BORDER = ['transparent', SAFFRON, PAPRIKA, CARD];

const NAV = [
  ['The menu', '#menu'],
  ['Dinner parties', '#dinners'],
  ['Meal prep', '#mealprep'],
  ['Dietary needs', '#dietary'],
  ['Booking', '#booking'],
  ['Contact', '#contact'],
];

type Course = { course: string; dishes: [string, string][] };

/* The autumn card: guests choose one dish from each course. */
const MENU: Course[] = [
  {
    course: 'To begin',
    dishes: [
      ['Roast squash soup', 'brown butter, sage, toasted seeds'],
      ['Burrata and charred pears', 'hazelnuts, aged balsamic'],
    ],
  },
  {
    course: 'Second',
    dishes: [
      ['Hand-cut tagliatelle', 'wild mushrooms, thyme, parmesan'],
      ['Beet and citrus salad', 'whipped feta, pistachio'],
    ],
  },
  {
    course: 'The main',
    dishes: [
      ['Braised short rib', 'smoked paprika, polenta, gremolata'],
      ['Saffron fish stew', 'mussels, fennel, grilled bread'],
      ['Stuffed delicata squash', 'farro, chestnuts, herb salsa'],
    ],
  },
  {
    course: 'To finish',
    dishes: [
      ['Apple and quince galette', 'creme fraiche'],
      ['Dark chocolate pot', 'sea salt, olive oil, orange'],
    ],
  },
];

const EVENING = [
  ['3:30', 'We arrive with the groceries, our own knives and pans, and a plan for your kitchen.'],
  ['6:30', 'Your guests arrive. Something small is already on the table with the first drink.'],
  ['7:15', 'Dinner, course by course, plated or passed family style. We introduce each dish if you want us to.'],
  ['10:00', 'Coffee and the last plate. The kitchen is cleaner than we found it, and we are gone.'],
];

const DINNERS = [
  { name: 'Family style', price: '$70', note: 'Three courses on platters for the middle of the table. Best for birthdays and big, loud families.' },
  { name: 'The seasonal card', price: '$95', note: 'Four plated courses from the menu above. The one most people book.' },
  { name: 'Tasting dinner', price: '$140', note: 'Six small courses written for your table, with a wine pairing list from our merchant.' },
];

const PREP = [
  { plan: 'Five dinners for two', price: '$310 a week', note: 'Cooked in your kitchen on Sunday, labeled with the day and how to reheat it.' },
  { plan: 'Five dinners for four', price: '$460 a week', note: 'Children\'s portions on request, with the sauce on the side for the suspicious.' },
  { plan: 'Lunches, added on', price: '$120 a week', note: 'Ten grain bowls and soups, packed to carry to work.' },
];

const DIETS = [
  ['Gluten-free', 'Separate boards and pans, and flour stays out of the kitchen that day.'],
  ['Dairy-free', 'Rich without cream: nut milks, olive oil, slow-cooked onions.'],
  ['Vegetarian and vegan', 'Every course on the card has a plant-based twin, not a side salad.'],
  ['Nut and seed allergies', 'We cook nut-free for the whole table and label every container.'],
  ['Low sodium', 'Flavor from acid, herbs and spice. We salt at the table, never in secret.'],
  ['Halal and kosher-style', 'Meat from certified butchers, and no pork or shellfish in your kitchen.'],
  ['Diabetes-friendly', 'Balanced plates and desserts that do not spike, planned with your notes.'],
  ['Little eaters', 'A plain version of anything, ready ten minutes before the grown-ups.'],
];

const BOOKING = [
  ['Pick a date', 'Weekends book about three weeks ahead, weeknights about one. Up to twelve guests at a time.'],
  ['A twenty-minute call', 'We talk through the guests, their diets, your kitchen and the mood, then send a written menu.'],
  ['A deposit holds it', '30 percent, refundable until seven days before. Groceries are included in the price per guest.'],
  ['We shop that morning', 'From the farmers market and our butcher, then cook, serve and clean. The balance is invoiced the next day.'],
];

export default function TableForSixPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cloth': '#1f2b26',
        '--card': '#f3ebdc',
        '--paprika': '#c8553d',
        '--saffron': '#e3a73e',
        '--herb': '#8aa37b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cloth,card,paprika,saffron,herb"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Table for Six</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Private chef</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#contact">Check a date</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The menu card, set down on the mosaic table. */}
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4" className={s.tabletop} aria-hidden="true">
            <TabbiedPattern
              pattern={tesserae}
              palette={TABLETOP}
              fit="grid"
              cellSize={56}
              seed="tablesix-tabletop"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroCard}>
            <p data-edit="hero.cardTop" data-edit-max="240" data-edit-multiline className={s.cardTop}>Table for Six, private chef</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Dinner at your table, <em>cooked by us.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Seasonal dinner parties for four to twelve, cooked in your own
              kitchen, and weekly meals for households with no time to shop.
              Groceries included, every allergy planned for, the dishes done
              before dessert.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Check a date</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#menu">Read the autumn card</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Dinners cooked</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>640</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Guests at a table</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>4-12</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">From, per guest</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>$70</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ MENU */}
        <section id="menu" className={s.menuSec} aria-labelledby="menu-h">
          <div className={s.menuCard}>
            <p data-edit="menu.season" data-edit-max="240" data-edit-multiline className={s.season}>October to December</p>
            <h2 data-edit="menu.menuTitle" data-edit-max="60" id="menu-h" className={s.menuTitle}>The autumn card</h2>
            <p data-edit="menu.menuIntro" data-edit-max="240" data-edit-multiline className={s.menuIntro}>
              Your guests choose one dish from each course when they reply to
              your invitation. We cook to their answers.
            </p>
            {MENU.map((c, i) => (
              <div key={c.course} className={s.course}>
                <h3 data-edit={`menu.courseName.${i}`} data-edit-max="40" className={s.courseName}>{c.course}</h3>
                <ul className={s.dishes}>
                  {c.dishes.map(([dish, note], i2) => (
                    <li key={dish}>
                      <span data-edit={`menu.dish.${i}.${i2}`} data-edit-max="60" className={s.dish}>{dish}</span>
                      <span data-edit={`menu.dishNote.${i}.${i2}`} data-edit-max="60" className={s.dishNote}>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p data-edit="menu.menuPrice" data-edit-max="240" data-edit-multiline className={s.menuPrice}>Four courses, $95 a guest</p>
            <p data-edit="menu.menuSmall" data-edit-max="240" data-edit-multiline className={s.menuSmall}>Groceries, cooking, serving and the washing up included. Minimum four guests.</p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,1,3" className={s.strip} aria-hidden="true">
          <TabbiedPattern
            pattern={tesserae}
            palette={STRIP}
            fit="grid"
            cellSize={40}
            seed="tablesix-strip"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------- DINNER PARTIES */}
        <section id="dinners" className={s.sec} aria-labelledby="dinners-h">
          <div className={s.secHead}>
            <p data-edit="dinners.label" data-edit-max="240" data-edit-multiline className={s.label}>Course one</p>
            <h2 data-edit="dinners.title" data-edit-max="60" id="dinners-h" className={s.title}>Dinner parties at home</h2>
            <p data-edit="dinners.note" data-edit-max="240" data-edit-multiline className={s.note}>
              You host; we do the rest. A chef and, for eight guests or more, a
              server who keeps glasses filled and plates cleared.
            </p>
          </div>
          <div className={s.dinnerGrid}>
            <ol className={s.evening}>
              {EVENING.map(([time, text], i) => (
                <li key={time}>
                  <span data-edit={`dinners.time.${i}`} data-edit-max="60" className={s.time}>{time}</span>
                  <p data-edit={`dinners.timeText.${i}`} data-edit-max="240" data-edit-multiline className={s.timeText}>{text}</p>
                </li>
              ))}
            </ol>
            <ul className={s.dinnerPlans}>
              {DINNERS.map((d, i) => (
                <li key={d.name} className={s.plan}>
                  <h3 data-edit={`dinners.planName.${i}`} data-edit-max="40" className={s.planName}>{d.name}</h3>
                  <p data-edit={`dinners.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{d.price}</p>
                  <p data-edit={`dinners.planPer.${i}`} data-edit-max="240" data-edit-multiline className={s.planPer}>a guest</p>
                  <p data-edit={`dinners.planNote.${i}`} data-edit-max="240" data-edit-multiline className={s.planNote}>{d.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- MEAL PREP */}
        <section id="mealprep" className={`${s.sec} ${s.paper}`} aria-labelledby="mealprep-h">
          <div className={s.secHead}>
            <p data-edit="mealprep.label" data-edit-max="240" data-edit-multiline className={s.label}>Course two</p>
            <h2 data-edit="mealprep.title" data-edit-max="60" id="mealprep-h" className={s.title}>Weekly meal prep</h2>
            <p data-edit="mealprep.note" data-edit-max="240" data-edit-multiline className={s.note}>
              One Sunday visit, five dinners in the fridge. The menu changes every
              week and you can strike anything off it by Thursday.
            </p>
          </div>
          <ul className={s.prep}>
            {PREP.map((p, i) => (
              <li key={p.plan} className={s.prepItem}>
                <h3 data-edit={`mealprep.prepPlan.${i}`} data-edit-max="40" className={s.prepPlan}>{p.plan}</h3>
                <p data-edit={`mealprep.prepPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.prepPrice}>{p.price}</p>
                <p data-edit={`mealprep.prepNote.${i}`} data-edit-max="240" data-edit-multiline className={s.prepNote}>{p.note}</p>
              </li>
            ))}
          </ul>
          <p data-edit="mealprep.prepSmall" data-edit-max="240" data-edit-multiline className={s.prepSmall}>
            Groceries are billed at cost with the receipt attached. Glass
            containers are ours; we swap them each week.
          </p>
        </section>

        {/* ---------------------------------------------------------- DIETARY */}
        <section id="dietary" className={s.sec} aria-labelledby="dietary-h">
          <div className={s.dietGrid}>
            <div className={s.secHead}>
              <p data-edit="dietary.label" data-edit-max="240" data-edit-multiline className={s.label}>Course three</p>
              <h2 data-edit="dietary.title" data-edit-max="60" id="dietary-h" className={s.title}>Every diet at one table</h2>
              <p data-edit="dietary.note" data-edit-max="240" data-edit-multiline className={s.note}>
                Tell us each guest's needs when you book. They go on the prep
                sheet by name, and nobody eats a lesser version of dinner.
              </p>
            </div>
            <dl className={s.diets}>
              {DIETS.map(([d, t], i) => (
                <div key={d} className={s.diet}>
                  <dt data-edit={`dietary.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`dietary.body.${i}`} data-edit-max="200" data-edit-multiline>{t}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- BOOKING */}
        <section id="booking" className={`${s.sec} ${s.paper}`} aria-labelledby="booking-h">
          <div className={s.secHead}>
            <p data-edit="booking.label" data-edit-max="240" data-edit-multiline className={s.label}>To finish</p>
            <h2 data-edit="booking.title" data-edit-max="60" id="booking-h" className={s.title}>How booking works</h2>
          </div>
          <ol className={s.booking}>
            {BOOKING.map(([t, d], i) => (
              <li key={t} className={s.bookStep}>
                <span className={s.bookNo}>{i + 1}</span>
                <h3 data-edit={`booking.bookTitle.${i}`} data-edit-max="40" className={s.bookTitle}>{t}</h3>
                <p data-edit={`booking.bookText.${i}`} data-edit-max="240" data-edit-multiline className={s.bookText}>{d}</p>
              </li>
            ))}
          </ol>
          <blockquote className={s.chefNote}>
            <p data-edit="booking.body" data-edit-max="240" data-edit-multiline>
              I cooked in restaurants for twelve years and missed seeing who I
              was cooking for. Now I can hear the table from the stove.
            </p>
            <cite data-edit="booking.attribution" data-edit-max="48">Marguerite Oyelaran, chef and owner</cite>
          </blockquote>
        </section>

        {/* ---------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.label" data-edit-max="240" data-edit-multiline className={s.label}>Reservations</p>
              <h2 data-edit="contact.title" data-edit-max="60" id="contact-h" className={s.title}>Check a date</h2>
              <p data-edit="contact.note" data-edit-max="240" data-edit-multiline className={s.note}>
                Send the date and the guest count and we will answer within a
                day with whether we are free and a first menu.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Phone</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>(555) 016-4406</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>chef@tableforsix.example</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Prep kitchen</dt>
                  <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>9 Copperpot Lane, Eastmarket</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Calls</dt>
                  <dd data-edit="contact.body4" data-edit-max="200" data-edit-multiline>Tuesday to Friday, 10:00-2:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="t6-name">Name</label>
                <input id="t6-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="t6-email">Email</label>
                <input id="t6-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="t6-date">Date</label>
                <input id="t6-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="t6-guests">Guests</label>
                <select id="t6-guests" name="guests" defaultValue="6">
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="prep">Weekly meal prep</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="t6-diets">Allergies and diets at the table</label>
                <textarea id="t6-diets" name="diets" rows={3} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask about the date</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,1" className={s.border} aria-hidden="true">
          <TabbiedPattern
            pattern={tesserae}
            palette={BORDER}
            fit="grid"
            cellSize={30}
            seed="tablesix-border"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Table for Six</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional private chef. The chef, menus, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
