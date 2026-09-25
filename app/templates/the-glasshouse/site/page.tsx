import { TabbiedPattern } from 'tabbied/react';
import { lobe, randomrings, sparkle } from 'tabbied/patterns';
import s from './the-glasshouse.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'The Glasshouse: Wedding and event venue, Larkfield',
  description:
    'An 1887 palm house in a walled acre of garden. Ceremonies under glass, dinner for 140 in the Long Room, and eight rooms for the wedding party.',
};

/* Venue colors. Every field has `transparent` in the background slot, so
   it draws on whichever ground its panel has. */
const EVERGREEN = '#2F5D4E';
const CHAMPAGNE = '#B89B6A';
const PALE = '#E8E2D6';

const RINGS = ['transparent', CHAMPAGNE, EVERGREEN, PALE];
const STARS = ['transparent', CHAMPAGNE];
const LEAVES = ['transparent', EVERGREEN, PALE, CHAMPAGNE];

const NAV = [
  ['Ceremonies', '#ceremonies'],
  ['Receptions', '#receptions'],
  ['Garden', '#garden'],
  ['Dining', '#dining'],
  ['Stay', '#stay'],
  ['Capacity', '#capacity'],
  ['Packages', '#packages'],
  ['Enquire', '#enquire'],
];

const CEREMONY_FACTS = [
  ['120', 'Guests seated under the dome'],
  ['200', 'On the lawn, in summer'],
  ['7', 'Days a week, from 11:00 to 17:00'],
];

const RECEPTION_FACTS = [
  ['140', 'Seated for dinner'],
  ['220', 'Standing, for the evening'],
  ['00:00', 'Last dance, Friday to Sunday'],
];

const GARDEN_FACTS = [
  ['1 acre', 'Walled, and yours for the day'],
  ['12:00', 'When the gates close to the public'],
  ['3', 'Covered places if it rains'],
];

const DINING_FACTS = [
  ['$78', 'Three courses, per guest, from'],
  ['2', 'Guests at your tasting, included'],
  ['$18', 'Children under twelve, per head'],
];

const STAY_FACTS = [
  ['8', 'Rooms, sleeping 18'],
  ['15:00', 'Check-in the day before'],
  ['11:00', 'Check-out the day after'],
];

type Space = {
  name: string;
  where: string;
  ceremony: string;
  dinner: string;
  standing: string;
  size: string;
};

const SPACES: Space[] = [
  {
    name: 'The Palm House',
    where: 'Under the dome',
    ceremony: '120',
    dinner: '90',
    standing: '150',
    size: '2,260 sq ft',
  },
  {
    name: 'The Long Room',
    where: 'The old potting range',
    ceremony: '140',
    dinner: '140',
    standing: '220',
    size: '3,100 sq ft',
  },
  {
    name: 'The Orangery',
    where: 'South wall, heated',
    ceremony: '60',
    dinner: '48',
    standing: '90',
    size: '1,150 sq ft',
  },
  {
    name: 'The Terrace',
    where: 'Stone, with an awning',
    ceremony: 'Not licensed',
    dinner: '60',
    standing: '160',
    size: 'Open air',
  },
  {
    name: 'The Lawn',
    where: 'Marquee from May to September',
    ceremony: '200',
    dinner: '200',
    standing: '300',
    size: 'Half an acre',
  },
];

type Package = {
  name: string;
  when: string;
  price: string;
  guests: string;
  items: string[];
  featured: boolean;
};

const PACKAGES: Package[] = [
  {
    name: 'The Afternoon',
    when: 'Monday to Thursday, 11:00-18:00',
    price: '$6,400',
    guests: 'For up to 60 guests',
    items: [
      'Ceremony in the Palm House',
      'Drinks and canapes on the terrace',
      'Afternoon tea or a two-course lunch',
      'Tables, chairs, linen and candles',
      'A coordinator from arrival to goodbye',
    ],
    featured: false,
  },
  {
    name: 'The Day',
    when: 'Friday or Sunday, 11:00-00:00',
    price: '$14,800',
    guests: '100 guests, then $96 each up to 140',
    items: [
      'Ceremony under the dome or on the lawn',
      'Drinks and canapes in the garden',
      'Three-course dinner in the Long Room',
      'Evening food and a bar until 23:30',
      'The bridal suite on the night',
      'A coordinator from 09:00 to the last car',
    ],
    featured: true,
  },
  {
    name: 'The Weekend',
    when: 'Friday to Sunday, exclusive use',
    price: '$26,500',
    guests: 'Up to 140 guests, 18 staying',
    items: [
      'Everything in The Day',
      'Friday supper for up to 40',
      'All eight rooms for two nights',
      'Sunday brunch in the orangery',
      'Check-out at 13:00 on Sunday',
    ],
    featured: false,
  },
];

const PLAN = [
  {
    when: '18-12 months',
    title: 'Visit and hold',
    body: 'Come to an open day or book a private visit. We hold a date for 14 days while you decide, with no charge.',
  },
  {
    when: '12 months',
    title: 'Deposit',
    body: 'A 25% deposit and a two-page contract. Your coordinator is named on it and stays with you until the day.',
  },
  {
    when: '6 months',
    title: 'Tasting',
    body: 'Dinner for two from the season you are marrying in. You choose the menu at the table, and the wine with it.',
  },
  {
    when: '3 months',
    title: 'The running order',
    body: 'An hour with your coordinator: timings, suppliers, the wet-weather plan and where the speeches go.',
  },
  {
    when: '4 weeks',
    title: 'Final numbers',
    body: 'Guest count, seating plan and dietary notes. The balance is due now, and nothing changes the price after.',
  },
  {
    when: 'The day',
    title: 'Over to us',
    body: 'We open the gates at 09:00 and your coordinator is on the floor until the last car leaves the drive.',
  },
];

const GUESTS = ['Up to 40', '40-80', '80-120', '120-140', 'More than 140'];

export default function TheGlasshousePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f8f5ef',
        '--ink': '#1b2420',
        '--evergreen': '#2f5d4e',
        '--champagne': '#b89b6a',
        '--pale': '#e8e2d6',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,evergreen,champagne,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Italiana&family=Hanken+Grotesk:wght@300..700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">The Glasshouse</a>
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
        {/* ------------------------------------------------------------ 01
            The venue. The rings are centered by the design itself, so the
            field reads as a frame of glass panes around the name; a mask
            keeps the middle clear for the type. */}
        <section className={`${s.panel} ${s.hero}`} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,4" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={randomrings}
              palette={RINGS}
              fit="grid"
              cellSize={120}
              seed="glasshouse"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.panelInner}>
            <span data-edit="hero.count" data-edit-max="60" className={s.count}>01 / 06</span>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Weddings and events in a walled garden, Larkfield</p>
            <h1 data-edit="hero.heroTitle" data-edit-max="70" className={s.heroTitle} id="hero-h">The Glasshouse</h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              An 1887 palm house in a walled acre of garden. Ceremonies under glass,
              dinner for 140, and eight rooms for the people who would rather not
              drive home.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#enquire">Check a date</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#packages">See packages</a>
            </div>
            <p data-edit="hero.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>Open days on the first Sunday of every month, 11:00-15:00</p>
          </div>
          <span className={s.cue} aria-hidden="true" />
        </section>

        {/* ------------------------------------------------------------ 02 */}
        <section id="ceremonies" className={`${s.panel} ${s.panelPale}`} aria-labelledby="ceremonies-h">
          <div className={s.panelInner}>
            <span data-edit="ceremonies.count" data-edit-max="60" className={s.count}>02 / 06</span>
            <h2 data-edit="ceremonies.panelTitle" data-edit-max="60" className={s.panelTitle} id="ceremonies-h">Ceremonies</h2>
            <p data-edit="ceremonies.panelLede" data-edit-max="240" data-edit-multiline className={s.panelLede}>
              Under the dome, among palms older than the town hall. Licensed for civil
              ceremonies and partnerships, with the registrar booked through us. In
              summer the doors fold back and the aisle runs out onto the lawn.
            </p>
            <dl className={s.facts}>
              {CEREMONY_FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`ceremonies.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`ceremonies.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <span className={s.cue} aria-hidden="true" />
        </section>

        {/* ------------------------------------------------------------ 03
            The one dark panel with stars: champagne points on the ink,
            thinned out so they read as candlelight rather than confetti. */}
        <section id="receptions" className={`${s.panel} ${s.panelInk}`} aria-labelledby="receptions-h">
          <div data-edit-pattern="receptions.field" data-edit-roles="transparent,3" className={s.starField} aria-hidden="true">
            <TabbiedPattern
              pattern={sparkle}
              palette={STARS}
              fit="grid"
              cellSize={56}
              options={{ frequency: 0.35 }}
              redrawInterval={8000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.panelInner}>
            <span data-edit="receptions.count" data-edit-max="60" className={s.count}>03 / 06</span>
            <h2 data-edit="receptions.panelTitle" data-edit-max="60" className={s.panelTitle} id="receptions-h">Receptions</h2>
            <p data-edit="receptions.panelLede" data-edit-max="240" data-edit-multiline className={s.panelLede}>
              The terrace, the Long Room and the dome, one after another: drinks
              outside while the light goes, dinner at long tables, then dancing under
              the glass until midnight.
            </p>
            <dl className={s.facts}>
              {RECEPTION_FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`receptions.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`receptions.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <span className={s.cue} aria-hidden="true" />
        </section>

        {/* ------------------------------------------------------------ 04
            Leaves at both edges, like the box hedges either side of the
            path, and clear paper in the middle for the words. */}
        <section id="garden" className={`${s.panel} ${s.panelGarden}`} aria-labelledby="garden-h">
          <div data-edit-pattern="garden.field" data-edit-roles="transparent,2,4,3" className={s.leafField} aria-hidden="true">
            <TabbiedPattern
              pattern={lobe}
              palette={LEAVES}
              fit="grid"
              cellSize={64}
              options={{ frequency: 0.7 }}
              seed="hedge"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.panelInner}>
            <span data-edit="garden.count" data-edit-max="60" className={s.count}>04 / 06</span>
            <h2 data-edit="garden.panelTitle" data-edit-max="60" className={s.panelTitle} id="garden-h">The garden</h2>
            <p data-edit="garden.panelLede" data-edit-max="240" data-edit-multiline className={s.panelLede}>
              A walled acre with a lawn for games, a pear walk for photographs and a
              kitchen garden that feeds the menu in season. If it rains, the Palm
              House, the orangery and the terrace awning are all a few steps away.
            </p>
            <dl className={s.facts}>
              {GARDEN_FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`garden.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`garden.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <span className={s.cue} aria-hidden="true" />
        </section>

        {/* ------------------------------------------------------------ 05 */}
        <section id="dining" className={`${s.panel} ${s.panelPale}`} aria-labelledby="dining-h">
          <div className={s.panelInner}>
            <span data-edit="dining.count" data-edit-max="60" className={s.count}>05 / 06</span>
            <h2 data-edit="dining.panelTitle" data-edit-max="60" className={s.panelTitle} id="dining-h">Dining</h2>
            <p data-edit="dining.panelLede" data-edit-max="240" data-edit-multiline className={s.panelLede}>
              Our own kitchen, not a caterer. Three courses from the season and the
              garden, cooked in the old boiler house, with a tasting for two before
              you choose a thing.
            </p>
            <ul className={s.menu}>
              <li>
                <span data-edit="dining.menuCourse" data-edit-max="60" className={s.menuCourse}>To start</span>
                <span data-edit="dining.menuDish" data-edit-max="60" className={s.menuDish}>Garden beets, whipped goat cheese, toasted hazelnuts</span>
              </li>
              <li>
                <span data-edit="dining.menuCourse2" data-edit-max="60" className={s.menuCourse}>Main</span>
                <span data-edit="dining.menuDish2" data-edit-max="60" className={s.menuDish}>Roast chicken, tarragon, the first potatoes from the walled beds</span>
              </li>
              <li>
                <span data-edit="dining.menuCourse3" data-edit-max="60" className={s.menuCourse}>Pudding</span>
                <span data-edit="dining.menuDish3" data-edit-max="60" className={s.menuDish}>Poached pears from the pear walk, brown butter cake, cream</span>
              </li>
            </ul>
            <dl className={s.facts}>
              {DINING_FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`dining.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`dining.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <span className={s.cue} aria-hidden="true" />
        </section>

        {/* ------------------------------------------------------------ 06 */}
        <section id="stay" className={`${s.panel} ${s.panelGreen}`} aria-labelledby="stay-h">
          <div className={s.panelInner}>
            <span data-edit="stay.count" data-edit-max="60" className={s.count}>06 / 06</span>
            <h2 data-edit="stay.panelTitle" data-edit-max="60" className={s.panelTitle} id="stay-h">Stay</h2>
            <p data-edit="stay.panelLede" data-edit-max="240" data-edit-multiline className={s.panelLede}>
              Eight rooms in the gardener's cottage and the old bothy, kept for the
              wedding party from the afternoon before until the morning after.
              Breakfast is in the orangery, and nobody asks what time you went to bed.
            </p>
            <dl className={s.facts}>
              {STAY_FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`stay.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`stay.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
            <a data-edit="stay.btnLight" data-edit-max="28" className={s.btnLight} href="#packages">Rooms come with The Weekend</a>
          </div>
        </section>

        {/* ------------------------------------------------------- CAPACITY */}
        <section id="capacity" className={s.sec} aria-labelledby="capacity-h">
          <div className={s.secHead}>
            <span data-edit="capacity.secKicker" data-edit-max="60" className={s.secKicker}>The spaces</span>
            <h2 data-edit="capacity.title" data-edit-max="60" id="capacity-h">Capacity, room by room</h2>
            <p data-edit="capacity.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Ceremonies are seated in rows. Dinner is at round tables of ten; long
              tables seat about a tenth more.
            </p>
          </div>
          <table className={s.table}>
            <caption data-edit="capacity.visuallyHidden" className={s.visuallyHidden}>Guest numbers for each space</caption>
            <thead>
              <tr>
                <th data-edit="capacity.heading" scope="col">Space</th>
                <th data-edit="capacity.heading2" scope="col">Ceremony</th>
                <th data-edit="capacity.heading3" scope="col">Dinner</th>
                <th data-edit="capacity.heading4" scope="col">Standing</th>
                <th data-edit="capacity.heading5" scope="col">Size</th>
              </tr>
            </thead>
            <tbody>
              {SPACES.map((sp, i) => (
                <tr key={sp.name}>
                  <th scope="row">
                    <span data-edit={`capacity.spaceName.${i}`} data-edit-max="60" className={s.spaceName}>{sp.name}</span>
                    <span data-edit={`capacity.spaceWhere.${i}`} data-edit-max="60" className={s.spaceWhere}>{sp.where}</span>
                  </th>
                  <td data-edit={`capacity.cell.${i}`} data-label="Ceremony">{sp.ceremony}</td>
                  <td data-edit={`capacity.cell2.${i}`} data-label="Dinner">{sp.dinner}</td>
                  <td data-edit={`capacity.cell3.${i}`} data-label="Standing">{sp.standing}</td>
                  <td data-edit={`capacity.cell4.${i}`} data-label="Size">{sp.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <span data-edit="packages.secKicker" data-edit-max="60" className={s.secKicker}>Packages</span>
            <h2 data-edit="packages.title" data-edit-max="60" id="packages-h">Three ways to have the place</h2>
            <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices include tax, service, the coordinator and every table, chair and
              candle. Saturdays from May to September are $2,200 more.
            </p>
          </div>
          <div className={s.packages}>
            {PACKAGES.map((p, i) => (
              <article key={p.name} className={p.featured ? `${s.pack} ${s.packFeatured}` : s.pack}>
                <h3 data-edit={`pack.title.${i}`} data-edit-max="40">{p.name}</h3>
                <p data-edit={`pack.packWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.packWhen}>{p.when}</p>
                <p data-edit={`pack.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                <p data-edit={`pack.packGuests.${i}`} data-edit-max="240" data-edit-multiline className={s.packGuests}>{p.guests}</p>
                <ul className={s.packList}>
                  {p.items.map((item, i2) => (
                    <li data-edit={`pack.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <a data-edit={`pack.packLink.${i}`} data-edit-max="28" className={s.packLink} href="#enquire">Ask about dates</a>
              </article>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- PLANNING */}
        <section id="planning" className={s.sec} aria-labelledby="planning-h">
          <div className={s.secHead}>
            <span data-edit="planning.secKicker" data-edit-max="60" className={s.secKicker}>Planning</span>
            <h2 data-edit="planning.title" data-edit-max="60" id="planning-h">From the first visit to the last dance</h2>
            <p data-edit="planning.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most couples book a year to eighteen months ahead. Short notice is
              welcome; we will tell you honestly what is left.
            </p>
          </div>
          <ol className={s.plan}>
            {PLAN.map((st, i) => (
              <li key={st.title}>
                <span data-edit={`planning.planWhen.${i}`} data-edit-max="60" className={s.planWhen}>{st.when}</span>
                <h3 data-edit={`planning.title2.${i}`} data-edit-max="40">{st.title}</h3>
                <p data-edit={`planning.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- ENQUIRE */}
        <section id="enquire" className={s.enquire} aria-labelledby="enquire-h">
          <div className={s.enquireInner}>
            <div className={s.enquireIntro}>
              <span data-edit="enquire.secKicker" data-edit-max="60" className={s.secKicker}>Enquire</span>
              <h2 data-edit="enquire.title" data-edit-max="60" id="enquire-h">Check a date</h2>
              <p data-edit="enquire.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us roughly when and roughly how many. We reply within one working
                day with the dates we have and a written proposal.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="enquire.term" data-edit-max="28">Call</dt>
                  <dd data-edit="enquire.body" data-edit-max="200" data-edit-multiline>(555) 014-2270</dd>
                </div>
                <div>
                  <dt data-edit="enquire.term2" data-edit-max="28">Write</dt>
                  <dd>
                    <a data-edit="enquire.link" data-edit-max="28" href="mailto:events@theglasshouse.example">events@theglasshouse.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="enquire.term3" data-edit-max="28">Visit</dt>
                  <dd data-edit="enquire.body2" data-edit-max="200" data-edit-multiline>The Walled Garden, 4 Orchard Lane, Larkfield</dd>
                </div>
                <div>
                  <dt data-edit="enquire.term4" data-edit-max="28">Parking</dt>
                  <dd data-edit="enquire.body3" data-edit-max="200" data-edit-multiline>60 cars, and a coach drop-off at the gate</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span data-edit="enquire.text" data-edit-max="60">Your names</span>
                <input type="text" name="names" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text2" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text3" data-edit-max="60">Phone</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text4" data-edit-max="60">Preferred date</span>
                <input type="date" name="date" />
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text5" data-edit-max="60">Guests</span>
                <select name="guests" defaultValue="80-120">
                  {GUESTS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text6" data-edit-max="60">Package</span>
                <select name="package" defaultValue="The Day">
                  {PACKAGES.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span data-edit="enquire.text7" data-edit-max="60">Anything we should know</span>
                <textarea name="message" rows={4} />
              </label>
              <label className={s.check}>
                <input type="checkbox" name="openday" />
                <span data-edit="enquire.text8" data-edit-max="60">Put us down for the next open day</span>
              </label>
              <button data-edit="enquire.btn" data-edit-max="24" className={s.btn} type="submit">Send enquiry</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>The Glasshouse</p>
          <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>The Walled Garden, 4 Orchard Lane, Larkfield</p>
          <p data-edit="footer.footAddr2" data-edit-max="240" data-edit-multiline className={s.footAddr}>(555) 014-2270, events@theglasshouse.example</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional wedding venue. Dates, prices, rooms and menus are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
