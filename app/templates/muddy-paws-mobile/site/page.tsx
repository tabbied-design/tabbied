import { TabbiedPattern } from 'tabbied/react';
import { chain, bobbin, odessa } from 'tabbied/patterns';
import s from './muddy-paws-mobile.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Muddy Paws: Mobile dog grooming van, Alder Heights to Northgate',
  description:
    'Muddy Paws is a grooming van that parks at your curb. The weekly route by neighborhood, prices by dog size, what is on board, how a groom works and how to book.',
};

/* Site colors. The van's livery is a chain of links laid over its teal
   paint, the bone band sits on the cream ground, and the suds rise over
   the sun-yellow panel: every pattern has a transparent ground so the
   surface under it shows through. */
const SUDS = '#fff6e5';
const MUD = '#2e1f16';
const TEAL = '#0f8a80';
const SUN = '#ffc83d';
const CORAL = '#f2735a';

const LIVERY = ['transparent', SUDS, SUN, CORAL, SUDS, SUN];
const BONES = ['transparent', MUD, TEAL, CORAL, SUN];
const FOAM = ['transparent', SUDS, TEAL, SUDS, CORAL, SUDS];
const LEASH = ['transparent', TEAL, CORAL, MUD, SUN];

const NAV = [
  ['The route', '#route'],
  ['Prices', '#prices'],
  ['On board', '#van'],
  ['How it works', '#how'],
  ['Book', '#book'],
];

type Stop = {
  name: string;
  time: string;
  slots: string;
  full: boolean;
};

type Day = {
  short: string;
  day: string;
  note: string;
  today: boolean;
  stops: Stop[];
};

const ROUTE: Day[] = [
  {
    short: 'Tu',
    day: 'Tuesday',
    note: 'North loop',
    today: false,
    stops: [
      { name: 'Alder Heights', time: '8:30-11:00', slots: '1 slot left', full: false },
      { name: 'Briar Hill', time: '11:30-2:00', slots: 'Full', full: true },
      { name: 'Canal Row', time: '2:30-5:30', slots: '2 slots left', full: false },
    ],
  },
  {
    short: 'We',
    day: 'Wednesday',
    note: 'Over the bridge',
    today: false,
    stops: [
      { name: 'Dunmore', time: '8:30-12:00', slots: '3 slots left', full: false },
      { name: 'Elm Park', time: '12:30-3:00', slots: '1 slot left', full: false },
      { name: 'Fenwick', time: '3:30-6:00', slots: 'Full', full: true },
    ],
  },
  {
    short: 'Th',
    day: 'Thursday',
    note: 'The van is here today',
    today: true,
    stops: [
      { name: 'Gasworks', time: '8:30-11:00', slots: 'Full', full: true },
      { name: 'Hollis Green', time: '11:30-3:00', slots: 'Full', full: true },
      { name: 'Ivy Bank', time: '3:30-6:00', slots: '1 slot left', full: false },
    ],
  },
  {
    short: 'Fr',
    day: 'Friday',
    note: 'South loop',
    today: false,
    stops: [
      { name: 'Juniper Flats', time: '8:30-12:00', slots: '2 slots left', full: false },
      { name: 'Kestrel Rise', time: '12:30-3:30', slots: '3 slots left', full: false },
      { name: 'Lark Lane', time: '4:00-6:00', slots: '1 slot left', full: false },
    ],
  },
  {
    short: 'Sa',
    day: 'Saturday',
    note: 'Half day',
    today: false,
    stops: [
      { name: 'Mill Bend', time: '8:00-11:00', slots: 'Full', full: true },
      { name: 'Northgate', time: '11:30-2:00', slots: '2 slots left', full: false },
    ],
  },
];

const SIZES = [
  { size: 'S', weight: 'Up to 20 lb', like: 'Terriers, dachshunds, pugs' },
  { size: 'M', weight: '20-45 lb', like: 'Beagles, spaniels, corgis' },
  { size: 'L', weight: '45-80 lb', like: 'Labs, doodles, shepherds' },
  { size: 'XL', weight: '80 lb and up', like: 'Newfies, mountain dogs' },
];

const SERVICES = [
  { name: 'Full groom', what: 'Bath, haircut, nails, ears and a tooth brush', prices: ['$85', '$100', '$120', '$150'] },
  { name: 'Bath and brush', what: 'Bath, blow-dry, brush-out, nails and ears', prices: ['$60', '$70', '$85', '$105'] },
  { name: 'De-shed', what: 'Bath and an hour on the undercoat', prices: ['$75', '$90', '$110', '$135'] },
  { name: 'Puppy intro', what: 'Under six months: short, warm and full of treats', prices: ['$45', '$45', '$55', '$55'] },
  { name: 'Nails only', what: 'At the van door, ten minutes', prices: ['$20', '$20', '$20', '$25'] },
];

const EXTRAS = [
  ['Flea and tick bath', '$15'],
  ['Mats, per 15 minutes', '$15'],
  ['Paw balm', '$8'],
  ['Second dog, same address', '$10 off'],
];

const ON_BOARD = [
  ['A walk-in tub', 'Twenty inches off the floor, with a ramp for older knees.'],
  ['Forty gallons of warm water', 'Heated to 95 F before we arrive, clean for every dog.'],
  ['A lift table', 'It drops to a foot off the floor so nobody gets lifted.'],
  ['A quiet dryer', 'About as loud as a dishwasher. No roar, no panic.'],
  ['Our own power and water', 'We only need a parking space the length of a car.'],
  ['Heat and air', 'Warm in January, cool in August, the door shut either way.'],
];

const STEPS = [
  ['The day before', 'We text a two-hour window, and you reply to confirm.'],
  ['Thirty minutes out', 'A second text with the van\'s real arrival time.'],
  ['At the curb', 'We collect your dog from the door. You do not have to be home if a neighbor has a key.'],
  ['In the van', 'One dog at a time, sixty to ninety minutes. No cages and no waiting room.'],
  ['Back at the door', 'A clean dog, a photo by text, and the card on file charged.'],
];

const RULES = [
  ['Cancelling', 'By 6 pm the day before is free. Later than that, or nobody home, is $25.'],
  ['Weather', 'We groom in rain and snow. In a thunderstorm we wait it out or move you a day.'],
  ['Nervous dogs', 'Tell us when you book. We start with a ten-minute meet in the van, no charge.'],
  ['Vaccines', 'Rabies, current. Send a photo of the certificate before the first groom.'],
];

export default function MuddyPawsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--suds': '#fff6e5',
        '--mud': '#2e1f16',
        '--teal': '#0f8a80',
        '--sun': '#ffc83d',
        '--coral': '#f2735a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="suds,mud,teal,sun,coral"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wdth,wght@75..125,400..700&family=Nunito:ital,wght@0,400..800;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Muddy Paws</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barPhone" data-edit-max="28" className={s.barPhone} href="tel:+15550168841">(555) 016-8841</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.sign}>
              <span data-edit="hero.signNum" data-edit-max="60" className={s.signNum}>7</span>
              <span data-edit="hero.signText" data-edit-max="60" className={s.signText}>Mobile dog grooming, Tuesday to Saturday</span>
            </p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>The dog wash that comes to your <em>curb</em></h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              A grooming van with a warm tub, a dryer that does not roar and
              Robin at the clippers. We park outside, your dog walks up a ramp,
              and an hour later walks back to your door clean.
            </p>
            <div className={s.ctas}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#route">Find your day</a>
              <a data-edit="hero.btnAlt" data-edit-max="28" className={s.btnAlt} href="#book">Book a groom</a>
            </div>
          </div>

          <div className={s.van}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,3,4,0,3" className={s.vanBody} aria-hidden="true">
              <TabbiedPattern
                pattern={chain}
                palette={LIVERY}
                fit="grid"
                cellSize={52}
                seed="muddy-livery"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.vanWindow} aria-hidden="true" />
            <span className={`${s.wheel} ${s.wheelBack}`} aria-hidden="true" />
            <span className={`${s.wheel} ${s.wheelFront}`} aria-hidden="true" />
            <p data-edit="hero.plate" data-edit-max="240" data-edit-multiline className={s.plate}>BIG DOT</p>
            <Artwork
              slug="muddy-paws-mobile-dog"
              alt="A scruffy terrier fresh from the bath, head tilted and tongue out, with soap bubbles around it"
              inks={{ yellow: 'var(--suds)', red: 'var(--coral)', blue: 'var(--teal)', black: 'var(--text)' }}
              className={s.dog}
            />
          </div>
        </section>

        {/* ----------------------------------------------------------- ROUTE */}
        <section id="route" className={s.route} aria-labelledby="route-h">
          <div className={s.routeHead}>
            <h2 data-edit="route.h2" data-edit-max="60" id="route-h" className={s.h2}>This week's route</h2>
            <p data-edit="route.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              The van runs the same five lines every week. Find your
              neighborhood, then book the day it stops near you. Slots are
              about an hour and a half each.
            </p>
          </div>

          <ol className={s.lines}>
            {ROUTE.map((d, i) => (
              <li key={d.day} className={d.today ? `${s.line} ${s.lineToday}` : s.line}>
                <div className={s.lineHead}>
                  <span data-edit={`route.roundel.${i}`} data-edit-max="60" className={s.roundel}>{d.short}</span>
                  <div>
                    <h3 data-edit={`route.lineDay.${i}`} data-edit-max="40" className={s.lineDay}>{d.day}</h3>
                    <p data-edit={`route.lineNote.${i}`} data-edit-max="240" data-edit-multiline className={s.lineNote}>{d.note}</p>
                  </div>
                </div>
                <ol className={s.stops}>
                  {d.stops.map((stop, i2) => (
                    <li key={`${i}-${stop.name}`} className={stop.full ? s.stopFull : undefined}>
                      <span data-edit={`route.stopTime.${i}.${i2}`} data-edit-max="60" className={s.stopTime}>{stop.time}</span>
                      <span data-edit={`route.stopName.${i}.${i2}`} data-edit-max="60" className={s.stopName}>{stop.name}</span>
                      <span data-edit={`route.stopSlots.${i}.${i2}`} data-edit-max="60" className={s.stopSlots}>{stop.slots}</span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>

          <p data-edit="route.routeFoot" data-edit-max="240" data-edit-multiline className={s.routeFoot}>
            Sunday and Monday the van is off the road, being scrubbed and
            restocked. Not on a line? Three neighbors on the same street and
            we add a stop.
          </p>
        </section>

        {/* The leash: a band of links between the route and the prices. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,1,3" className={s.leash} aria-hidden="true">
          <TabbiedPattern
            pattern={chain}
            palette={LEASH}
            fit="grid"
            cellSize={48}
            seed="muddy-leash"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 data-edit="prices.h2" data-edit-max="60" id="prices-h" className={s.h2}>Priced by the size of the dog</h2>
            <p data-edit="prices.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Bigger dogs take more water, more time and more towels. Weigh at
              home if you can; if you are between sizes, we charge the smaller.
            </p>
          </div>

          <div className={s.priceWrap}>
            <table className={s.prices}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Grooming services and their prices for small, medium, large and extra large dogs</caption>
              <thead>
                <tr>
                  <th data-edit="prices.priceCorner" scope="col" className={s.priceCorner}>Service</th>
                  {SIZES.map((z, i) => (
                    <th scope="col" key={z.size} className={s.sizeHead}>
                      <span data-edit={`prices.sizeDot.${i}`} data-edit-max="60" className={s.sizeDot}>{z.size}</span>
                      <span data-edit={`prices.sizeWeight.${i}`} data-edit-max="60" className={s.sizeWeight}>{z.weight}</span>
                      <span data-edit={`prices.sizeLike.${i}`} data-edit-max="60" className={s.sizeLike}>{z.like}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((row, i) => (
                  <tr key={row.name}>
                    <th scope="row">
                      <span data-edit={`prices.serviceName.${i}`} data-edit-max="60" className={s.serviceName}>{row.name}</span>
                      <span data-edit={`prices.serviceWhat.${i}`} data-edit-max="60" className={s.serviceWhat}>{row.what}</span>
                    </th>
                    {row.prices.map((price, j) => (
                      <td data-edit={`prices.cell.${i}.${j}`} key={`${i}-${SIZES[j].size}`}>{price}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={s.extrasRow}>
            <dl className={s.extras}>
              {EXTRAS.map(([name, price], i) => (
                <div key={name}>
                  <dt data-edit={`prices.term.${i}`} data-edit-max="28">{name}</dt>
                  <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="prices.tripFee" data-edit-max="240" data-edit-multiline className={s.tripFee}>No trip fee anywhere on the route. Off the route, $25 each way.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- ON BOARD */}
        <section id="van" className={s.sec} aria-labelledby="van-h">
          <div className={s.board}>
            <div data-edit-pattern="van.field" data-edit-roles="transparent,0,2,0,4,0" className={s.foam} aria-hidden="true">
              <TabbiedPattern
                pattern={odessa}
                palette={FOAM}
                fit="grid"
                cellSize={44}
                seed="muddy-foam"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.boardText}>
              <h2 data-edit="van.h2" data-edit-max="60" id="van-h" className={s.h2}>What is on board</h2>
              <p data-edit="van.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Big Dot is a long-wheelbase van we fitted out ourselves. It is
                a small salon on wheels, and it smells of oatmeal shampoo.
              </p>
              <ol className={s.kit}>
                {ON_BOARD.map(([name, text], i) => (
                  <li key={name}>
                    <h3 data-edit={`van.title.${i}`} data-edit-max="40">{name}</h3>
                    <p data-edit={`van.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={`${s.sec} ${s.howSec}`} aria-labelledby="how-h">
          <div className={s.secHead}>
            <h2 data-edit="how.h2" data-edit-max="60" id="how-h" className={s.h2}>How a groom goes</h2>
            <p data-edit="how.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Robin grooms, Kai bathes and dries. Between them they see about
              eight dogs a day, one at a time.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([when, what], i) => (
              <li key={when}>
                <h3 data-edit={`how.title.${i}`} data-edit-max="40">{when}</h3>
                <p data-edit={`how.body.${i}`} data-edit-max="240" data-edit-multiline>{what}</p>
              </li>
            ))}
          </ol>

          <div className={s.crew}>
            <div data-edit-pattern="how.field" data-edit-roles="transparent,1,2,4,3" className={s.bones} aria-hidden="true">
              <TabbiedPattern
                pattern={bobbin}
                palette={BONES}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={36}
                seed="muddy-bones"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.crewPeople}>
              <div className={s.person}>
                <h3 data-edit="how.title2" data-edit-max="40">Robin Achebe</h3>
                <p data-edit="how.personRole" data-edit-max="240" data-edit-multiline className={s.personRole}>Owner and groomer, since 2013</p>
                <p data-edit="how.body2" data-edit-max="240" data-edit-multiline>Scissor work, doodles, and the dogs other groomers send away.</p>
              </div>
              <div className={s.person}>
                <h3 data-edit="how.title3" data-edit-max="40">Kai Lindgren</h3>
                <p data-edit="how.personRole2" data-edit-max="240" data-edit-multiline className={s.personRole}>Bather, Tuesday to Friday</p>
                <p data-edit="how.body3" data-edit-max="240" data-edit-multiline>Warm water, the de-shed brush, and the pocket of treats.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={s.sec} aria-labelledby="rules-h">
          <div className={s.secHead}>
            <h2 data-edit="rules.h2" data-edit-max="60" id="rules-h" className={s.h2}>The small print, in large print</h2>
          </div>
          <dl className={s.rules}>
            {RULES.map(([term, text], i) => (
              <div key={term}>
                <dt data-edit={`rules.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`rules.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <form className={s.form} action="#">
            <div className={s.formHead}>
              <h2 data-edit="book.h2" data-edit-max="60" id="book-h" className={s.h2}>Book a groom</h2>
              <p data-edit="book.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>We reply by text within a working day with a two-hour window.</p>
            </div>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="mp-name">Your name</label>
                <input id="mp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="mp-phone">Mobile, for the texts</label>
                <input id="mp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="mp-street">Street address</label>
                <input id="mp-street" name="street" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="mp-stop">Neighborhood</label>
                <select id="mp-stop" name="stop" defaultValue="">
                  <option value="" disabled>Pick your stop</option>
                  {ROUTE.map((d) => (
                    <optgroup key={d.day} label={d.day}>
                      {d.stops.map((stop) => (
                        <option key={stop.name} value={stop.name}>{stop.name}</option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="off-route">Somewhere else</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="mp-dog">Dog's name and breed</label>
                <input id="mp-dog" name="dog" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="mp-service">Service</label>
                <select id="mp-service" name="service" defaultValue="full">
                  <option value="full">Full groom</option>
                  <option value="bath">Bath and brush</option>
                  <option value="deshed">De-shed</option>
                  <option value="puppy">Puppy intro</option>
                  <option value="nails">Nails only</option>
                </select>
              </div>
              <fieldset className={s.sizePick}>
                <legend data-edit="book.legend">Size</legend>
                {SIZES.map((z, i) => (
                  <label key={z.size} className={s.sizeOption}>
                    <input type="radio" name="size" value={z.size} defaultChecked={z.size === 'M'} />
                    <span data-edit={`book.text.${i}`} data-edit-max="60">{z.size}</span>
                  </label>
                ))}
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label7" htmlFor="mp-notes">Anything we should know</label>
                <textarea id="mp-notes" name="notes" rows={3} />
              </div>
            </div>
            <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send the booking</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Muddy Paws</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional mobile dog grooming van. The route, neighborhoods, prices and people are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The dog is a generated image, drawn in the page's own colors.</p>
        </div>
      </footer>
    </div>
  );
}
