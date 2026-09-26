import { TabbiedPattern } from 'tabbied/react';
import { bothcut } from 'tabbied/patterns';
import s from './long-table-catering.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Long Table: Catering for dinners and weddings, Carver Street',
  description:
    'Long Table cooks dinners for twelve to two hundred and forty, mostly at one long table. This season\'s menus by the course, the events we cater, prices per guest, and how a booking goes from first call to the last plate.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The runner is
   the bothcut design: lens-shaped cuts in gold and claret on a transparent
   ground, so the table's own charcoal shows through like a damask. It runs
   down the table in the hero, under the pricing, and along the footer. */
const BONE = '#ece3d0';
const GOLD = '#c29a52';
const CLARET = '#6d2430';

const RUNNER = ['transparent', GOLD, CLARET, GOLD];
const DAMASK = ['transparent', GOLD, CLARET, CLARET, GOLD];
const LINEN = ['transparent', CLARET, GOLD, CLARET];

const NAV = [
  ['Menus', '#menus'],
  ['Occasions', '#occasions'],
  ['Per guest', '#prices'],
  ['Booking', '#booking'],
  ['The kitchen', '#kitchen'],
  ['Enquire', '#enquire'],
];

/* One place setting per seat, ten a side. */
const SEATS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

type Course = { no: string; label: string; dish: string; note: string };
type Menu = { name: string; season: string; price: string; courses: Course[] };

const MENUS: Menu[] = [
  {
    name: 'The Harvest Table',
    season: 'September to November',
    price: '$95',
    courses: [
      { no: 'I', label: 'At the table', dish: 'Sourdough from Ferrand\'s, cultured butter, radishes and salt', note: 'Set down as the first guests sit' },
      { no: 'II', label: 'To begin', dish: 'Roast squash, brown butter, sage and hazelnut', note: 'On shared plates, one to four guests' },
      { no: 'III', label: 'The middle', dish: 'Hand-cut pappardelle, slow-cooked shin ragu', note: 'In the pan it was made in' },
      { no: 'IV', label: 'The main', dish: 'Whole roast pork loin, apples, cider gravy, bitter leaves', note: 'Carved at the table' },
      { no: 'V', label: 'To finish', dish: 'Pear and almond tart, creme fraiche', note: 'With coffee and a piece of fudge' },
    ],
  },
  {
    name: 'The Coast',
    season: 'All year, fish depending',
    price: '$110',
    courses: [
      { no: 'I', label: 'At the table', dish: 'Potato bread, seaweed butter, pickled mussels', note: 'Set down as the first guests sit' },
      { no: 'II', label: 'To begin', dish: 'Crab on toast, brown meat mayonnaise, lemon', note: 'Two slices each, passed hand to hand' },
      { no: 'III', label: 'The middle', dish: 'Chowder of smoked haddock, leeks and clams', note: 'Ladled at the table from a tureen' },
      { no: 'IV', label: 'The main', dish: 'Whole baked hake, fennel, new potatoes, green sauce', note: 'One fish for every six guests' },
      { no: 'V', label: 'To finish', dish: 'Burnt honey custard, shortbread', note: 'With coffee and a piece of fudge' },
    ],
  },
  {
    name: 'The Garden',
    season: 'Vegetarian, and vegan on request',
    price: '$85',
    courses: [
      { no: 'I', label: 'At the table', dish: 'Flatbreads from the wood oven, whipped feta, herbs', note: 'Set down as the first guests sit' },
      { no: 'II', label: 'To begin', dish: 'Heritage tomatoes, peach, burrata, basil oil', note: 'July to September; beetroot after' },
      { no: 'III', label: 'The middle', dish: 'Risotto of barley, wild mushrooms and parmesan', note: 'Finished in front of the table' },
      { no: 'IV', label: 'The main', dish: 'Whole roast celeriac, walnut, capers, lentils', note: 'Carved at the table like a joint' },
      { no: 'V', label: 'To finish', dish: 'Chocolate and olive oil cake, cherries', note: 'With coffee and a piece of fudge' },
    ],
  },
];

const OCCASIONS = [
  ['Long table dinners', 'Birthdays, anniversaries, a farewell. One table, family style.', '12-120'],
  ['Weddings', 'Dinner, and the late food at eleven. We work with your venue\'s rules.', '40-240'],
  ['Company dinners', 'Board dinners, team suppers, a client night. Invoiced to the business.', '12-160'],
  ['Harvest suppers', 'In a barn or an orchard, with a field kitchen and lights strung over.', '30-200'],
  ['Wakes and memorials', 'At a week\'s notice, sometimes less. We handle the room so you do not have to.', '20-150'],
  ['Standing receptions', 'Six to ten small plates passed on trays, for when nobody sits.', '40-300'],
];

const PRICES = [
  { menu: 'The Garden', a: '$85', b: '$79', c: '$72' },
  { menu: 'The Harvest Table', a: '$95', b: '$88', c: '$81' },
  { menu: 'The Coast', a: '$110', b: '$102', c: '$94' },
  { menu: 'Standing reception, 8 plates', a: '$64', b: '$58', c: '$52' },
];

const INCLUDED = [
  'Cooks and servers, one server for every ten guests',
  'Plates, cutlery, glassware and linen napkins',
  'Setting the tables and clearing them',
  'A menu card at every place',
  'Taking everything away the same night',
];

const EXTRAS = [
  ['Bar service, four hours', '$24 per guest'],
  ['Wine matched to the menu', 'from $38 per guest'],
  ['Long tables and benches, hired', '$18 per seat'],
  ['Late food at eleven', '$12 per guest'],
  ['A field kitchen for sites with none', '$950 flat'],
];

const STEPS = [
  { when: '12 weeks out', what: 'The first call', text: 'Sam asks the date, the numbers, the place and what the evening is for. We tell you honestly if we are the wrong caterer.' },
  { when: '10 weeks', what: 'A tasting for four', text: 'At our kitchen on Carver Street, the whole menu, with wine. $180, taken off the bill if you book.' },
  { when: '8 weeks', what: 'The date is held', text: 'A deposit of 30 percent holds it. We visit the venue with you and draw the room to scale.' },
  { when: '3 weeks', what: 'The menu is final', text: 'Every allergy and preference, by name, so the right plate reaches the right seat.' },
  { when: '10 days', what: 'Final numbers', text: 'The number you give us here is the number you pay for, and the balance is due.' },
  { when: 'The day', what: 'Five hours early', text: 'We arrive five hours before the first guest and leave with every last glass.' },
];

const PEOPLE = [
  { name: 'Ines Carvalho', role: 'Chef and owner', text: 'Cooked for twelve years in restaurant kitchens before deciding she preferred feeding a room at once. Writes every menu, and tastes every one on the day.' },
  { name: 'Sam Whitlow', role: 'Events', text: 'Your one contact from the first call to the last invoice. Has walked more than four hundred venues and remembers where the fuse boxes are.' },
  { name: 'Marguerite Obi', role: 'Head of service', text: 'Trains every server we send and runs the floor on the night. You will not see her unless something needs doing.' },
];

export default function LongTablePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--char': '#171614',
        '--bone': '#ece3d0',
        '--gold': '#c29a52',
        '--claret': '#6d2430',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="char,bone,gold,claret"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@0,400..700;1,400..700&family=Tenor+Sans&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Long Table</a>
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
            The headline, then the table itself, seen from above: a runner
            down the middle and ten places a side. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Catering from a kitchen on Carver Street, since 2012</p>
          <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
            Dinner for forty, <em>at one table.</em>
          </h1>
          <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
            We cook for twelve to two hundred and forty, and we would rather
            everyone sat together. Five courses, set down in the middle and
            passed hand to hand, the way a family eats when it is celebrating.
          </p>

          <div className={s.table} aria-hidden="true">
            <div className={s.tableTop} />
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,2" className={s.runner}>
              <TabbiedPattern
                pattern={bothcut}
                palette={RUNNER}
                fit="grid"
                cellSize={24}
                seed="longtable-runner"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={`${s.seats} ${s.seatsTop}`}>
              {SEATS.map((seat) => (
                <span key={seat} className={s.place} />
              ))}
            </div>
            <div className={`${s.seats} ${s.seatsBottom}`}>
              {SEATS.map((seat) => (
                <span key={seat} className={s.place} />
              ))}
            </div>
          </div>
          <p data-edit="hero.tableCaption" data-edit-max="240" data-edit-multiline className={s.tableCaption}>A table for twenty, from the rafters of the old printworks.</p>
        </section>

        {/* ----------------------------------------------------------- MENUS
            Three menus, written the way they are printed for the table. */}
        <section id="menus" className={s.sec} aria-labelledby="menus-h">
          <div className={s.secHead}>
            <p data-edit="menus.label" data-edit-max="240" data-edit-multiline className={s.label}>This season</p>
            <h2 data-edit="menus.secTitle" data-edit-max="60" id="menus-h" className={s.secTitle}>Menus, course by course</h2>
            <p data-edit="menus.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every course is brought to the table on shared plates. Change any
              dish you like; the prices below hold for any five courses.
            </p>
          </div>
          <Artwork
            slug="long-table-catering-roast"
            alt="A carved roast on a wooden board with a carving knife and fork and sprigs of rosemary"
            inks={['var(--char)', 'var(--gold-text)']}
            className={s.roast}
          />
          <div className={s.menus}>
            {MENUS.map((m, i) => (
              <article key={m.name} className={s.menu} aria-labelledby={`menu-${i}`}>
                <p data-edit={`menu.menuSeason.${i}`} data-edit-max="240" data-edit-multiline className={s.menuSeason}>{m.season}</p>
                <h3 data-edit={`menu.menuName.${i}`} data-edit-max="40" id={`menu-${i}`} className={s.menuName}>{m.name}</h3>
                <ol className={s.courses}>
                  {m.courses.map((c, i2) => (
                    <li key={c.no} className={s.course}>
                      <span data-edit={`menu.courseNo.${i}.${i2}`} data-edit-max="60" className={s.courseNo}>{c.no}</span>
                      <span data-edit={`menu.courseLabel.${i}.${i2}`} data-edit-max="60" className={s.courseLabel}>{c.label}</span>
                      <span data-edit={`menu.courseDish.${i}.${i2}`} data-edit-max="60" className={s.courseDish}>{c.dish}</span>
                      <span data-edit={`menu.courseNote.${i}.${i2}`} data-edit-max="60" className={s.courseNote}>{c.note}</span>
                    </li>
                  ))}
                </ol>
                <p className={s.menuPrice}>
                  <span data-edit={`menu.menuPriceNo.${i}`} data-edit-max="60" className={s.menuPriceNo}>{m.price}</span>
                  <span data-edit={`menu.menuPricePer.${i}`} data-edit-max="60" className={s.menuPricePer}>per guest, from</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- OCCASIONS */}
        <section id="occasions" className={s.sec} aria-labelledby="occasions-h">
          <div className={s.occasionsGrid}>
            <div className={s.secHeadSide}>
              <p data-edit="occasions.label" data-edit-max="240" data-edit-multiline className={s.label}>What we cater</p>
              <h2 data-edit="occasions.secTitle" data-edit-max="60" id="occasions-h" className={s.secTitle}>Occasions</h2>
              <p data-edit="occasions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The numbers are guests. Below twelve we are too many people in
                your kitchen; above the top of a range we bring in a second team.
              </p>
            </div>
            <ul className={s.occasions}>
              {OCCASIONS.map(([name, text, range], i) => (
                <li key={name} className={s.occasion}>
                  <h3 data-edit={`occasions.occName.${i}`} data-edit-max="40" className={s.occName}>{name}</h3>
                  <p data-edit={`occasions.occText.${i}`} data-edit-max="240" data-edit-multiline className={s.occText}>{text}</p>
                  <span data-edit={`occasions.occRange.${i}`} data-edit-max="60" className={s.occRange}>{range}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES
            The damask panel behind the price table. */}
        <section id="prices" className={s.pricesSec} aria-labelledby="prices-h">
          <div data-edit-pattern="prices.field" data-edit-roles="transparent,2,3,3,2" className={s.damask} aria-hidden="true">
            <TabbiedPattern
              pattern={bothcut}
              palette={DAMASK}
              fit="grid"
              cellSize={40}
              seed="longtable-damask"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.pricesCard}>
            <div className={s.secHead}>
              <p data-edit="prices.label" data-edit-max="240" data-edit-multiline className={s.label}>Per guest</p>
              <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>What it costs</h2>
              <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Five courses, cooks, servers and everything on the table. The
                more guests, the less each one costs.
              </p>
            </div>
            <table className={s.prices}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Price per guest by menu and number of guests</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Menu</th>
                  <th data-edit="prices.heading2" scope="col">12-49</th>
                  <th data-edit="prices.heading3" scope="col">50-99</th>
                  <th data-edit="prices.heading4" scope="col">100 and over</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((p, i) => (
                  <tr key={p.menu}>
                    <th data-edit={`prices.heading5.${i}`} scope="row">{p.menu}</th>
                    <td data-edit={`prices.cell.${i}`}>{p.a}</td>
                    <td data-edit={`prices.cell2.${i}`}>{p.b}</td>
                    <td data-edit={`prices.cell3.${i}`}>{p.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={s.priceNotes}>
              <div>
                <h3 data-edit="prices.noteTitle" data-edit-max="40" className={s.noteTitle}>Always included</h3>
                <ul className={s.included}>
                  {INCLUDED.map((item, i) => (
                    <li data-edit={`prices.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 data-edit="prices.noteTitle2" data-edit-max="40" className={s.noteTitle}>If you want them</h3>
                <dl className={s.extras}>
                  {EXTRAS.map(([what, price], i) => (
                    <div key={what}>
                      <dt data-edit={`prices.term.${i}`} data-edit-max="28">{what}</dt>
                      <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <p data-edit="prices.minimum" data-edit-max="240" data-edit-multiline className={s.minimum}>Minimum spend $1,800 before tax and a 20 percent service charge, which goes to the staff.</p>
          </div>
        </section>

        {/* --------------------------------------------------------- BOOKING */}
        <section id="booking" className={s.sec} aria-labelledby="booking-h">
          <div className={s.secHead}>
            <p data-edit="booking.label" data-edit-max="240" data-edit-multiline className={s.label}>How it goes</p>
            <h2 data-edit="booking.secTitle" data-edit-max="60" id="booking-h" className={s.secTitle}>From the first call to the last plate</h2>
            <p data-edit="booking.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Most dinners book three months ahead. Weddings, a year. Call anyway: sometimes a date is free.</p>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.what} className={s.step}>
                <span data-edit={`booking.stepWhen.${i}`} data-edit-max="60" className={s.stepWhen}>{st.when}</span>
                <h3 data-edit={`booking.stepWhat.${i}`} data-edit-max="40" className={s.stepWhat}>{st.what}</h3>
                <p data-edit={`booking.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{st.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- KITCHEN */}
        <section id="kitchen" className={s.sec} aria-labelledby="kitchen-h">
          <div className={s.kitchen}>
            <div className={s.kitchenHead}>
              <p data-edit="kitchen.label" data-edit-max="240" data-edit-multiline className={s.label}>The kitchen</p>
              <h2 data-edit="kitchen.secTitle" data-edit-max="60" id="kitchen-h" className={s.secTitle}>Nine cooks, one printworks</h2>
              <blockquote className={s.quote}>
                <p data-edit="kitchen.body" data-edit-max="240" data-edit-multiline>A dinner at one table is the only kind where the food has to wait for the conversation.</p>
                <cite data-edit="kitchen.attribution" data-edit-max="48">Ines Carvalho, chef</cite>
              </blockquote>
            </div>
            <ul className={s.people}>
              {PEOPLE.map((p, i) => (
                <li key={p.name} className={s.person}>
                  <h3 data-edit={`kitchen.personName.${i}`} data-edit-max="40" className={s.personName}>{p.name}</h3>
                  <p data-edit={`kitchen.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{p.role}</p>
                  <p data-edit={`kitchen.personText.${i}`} data-edit-max="240" data-edit-multiline className={s.personText}>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-edit-pattern="kitchen.field" data-edit-roles="transparent,3,2,3" className={s.linen} aria-hidden="true">
            <TabbiedPattern
              pattern={bothcut}
              palette={LINEN}
              fit="grid"
              cellSize={30}
              seed="longtable-linen"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* --------------------------------------------------------- ENQUIRE */}
        <section id="enquire" className={s.sec} aria-labelledby="enquire-h">
          <div className={s.enquire}>
            <div>
              <p data-edit="enquire.label" data-edit-max="240" data-edit-multiline className={s.label}>Enquire</p>
              <h2 data-edit="enquire.secTitle" data-edit-max="60" id="enquire-h" className={s.secTitle}>Tell us about the evening</h2>
              <p data-edit="enquire.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Sam answers every enquiry within two working days, with a first
                idea of the menu and a price.
              </p>
              <p className={s.contact}>
                <a data-edit="enquire.link" data-edit-max="28" href="tel:+15550197720">(555) 019-7720</a>
              </p>
              <p className={s.contact}>
                <a data-edit="enquire.link2" data-edit-max="28" href="mailto:sam@longtable.example">sam@longtable.example</a>
              </p>
              <p data-edit="enquire.address" data-edit-max="240" data-edit-multiline className={s.address}>The Printworks, 41 Carver Street. Tastings by appointment.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="enquire.label2" htmlFor="lt-name">Your name</label>
                <input id="lt-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label3" htmlFor="lt-email">Email</label>
                <input id="lt-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label4" htmlFor="lt-date">Date, or a few that would do</label>
                <input id="lt-date" name="date" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label5" htmlFor="lt-guests">Guests</label>
                <input id="lt-guests" name="guests" type="text" inputMode="numeric" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label6" htmlFor="lt-occasion">Occasion</label>
                <select id="lt-occasion" name="occasion" defaultValue="dinner">
                  <option value="dinner">Long table dinner</option>
                  <option value="wedding">Wedding</option>
                  <option value="company">Company dinner</option>
                  <option value="harvest">Harvest supper</option>
                  <option value="memorial">Wake or memorial</option>
                  <option value="reception">Standing reception</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label7" htmlFor="lt-venue">Venue, if you have one</label>
                <input id="lt-venue" name="venue" type="text" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="enquire.label8" htmlFor="lt-notes">The evening, in a few lines</label>
                <textarea id="lt-notes" name="notes" rows={4} />
              </div>
              <button data-edit="enquire.submit" data-edit-max="24" className={s.submit} type="submit">Send the enquiry</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,2" className={s.footRunner} aria-hidden="true">
          <TabbiedPattern
            pattern={bothcut}
            palette={RUNNER}
            fit="grid"
            cellSize={30}
            seed="longtable-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Long Table</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional catering company. The menus, prices, people and address are invented.</p>
        <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The roast is a generated image, drawn in the page's own colors.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
