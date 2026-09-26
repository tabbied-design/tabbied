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
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wdth,wght@75..125,400..700&family=Nunito:ital,wght@0,400..800;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Muddy Paws</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550168841">(555) 016-8841</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.sign}>
              <span className={s.signNum}>7</span>
              <span className={s.signText}>Mobile dog grooming, Tuesday to Saturday</span>
            </p>
            <h1 id="hero-h" className={s.title}>The dog wash that comes to your <em>curb</em></h1>
            <p className={s.lede}>
              A grooming van with a warm tub, a dryer that does not roar and
              Robin at the clippers. We park outside, your dog walks up a ramp,
              and an hour later walks back to your door clean.
            </p>
            <div className={s.ctas}>
              <a className={s.btn} href="#route">Find your day</a>
              <a className={s.btnAlt} href="#book">Book a groom</a>
            </div>
          </div>

          <div className={s.van}>
            <div className={s.vanBody} aria-hidden="true">
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
            <p className={s.plate}>BIG DOT</p>
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
            <h2 id="route-h" className={s.h2}>This week's route</h2>
            <p className={s.headNote}>
              The van runs the same five lines every week. Find your
              neighborhood, then book the day it stops near you. Slots are
              about an hour and a half each.
            </p>
          </div>

          <ol className={s.lines}>
            {ROUTE.map((d, i) => (
              <li key={d.day} className={d.today ? `${s.line} ${s.lineToday}` : s.line}>
                <div className={s.lineHead}>
                  <span className={s.roundel}>{d.short}</span>
                  <div>
                    <h3 className={s.lineDay}>{d.day}</h3>
                    <p className={s.lineNote}>{d.note}</p>
                  </div>
                </div>
                <ol className={s.stops}>
                  {d.stops.map((stop) => (
                    <li key={`${i}-${stop.name}`} className={stop.full ? s.stopFull : undefined}>
                      <span className={s.stopTime}>{stop.time}</span>
                      <span className={s.stopName}>{stop.name}</span>
                      <span className={s.stopSlots}>{stop.slots}</span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>

          <p className={s.routeFoot}>
            Sunday and Monday the van is off the road, being scrubbed and
            restocked. Not on a line? Three neighbors on the same street and
            we add a stop.
          </p>
        </section>

        {/* The leash: a band of links between the route and the prices. */}
        <div className={s.leash} aria-hidden="true">
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
            <h2 id="prices-h" className={s.h2}>Priced by the size of the dog</h2>
            <p className={s.headNote}>
              Bigger dogs take more water, more time and more towels. Weigh at
              home if you can; if you are between sizes, we charge the smaller.
            </p>
          </div>

          <div className={s.priceWrap}>
            <table className={s.prices}>
              <caption className={s.srOnly}>Grooming services and their prices for small, medium, large and extra large dogs</caption>
              <thead>
                <tr>
                  <th scope="col" className={s.priceCorner}>Service</th>
                  {SIZES.map((z) => (
                    <th scope="col" key={z.size} className={s.sizeHead}>
                      <span className={s.sizeDot}>{z.size}</span>
                      <span className={s.sizeWeight}>{z.weight}</span>
                      <span className={s.sizeLike}>{z.like}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((row, i) => (
                  <tr key={row.name}>
                    <th scope="row">
                      <span className={s.serviceName}>{row.name}</span>
                      <span className={s.serviceWhat}>{row.what}</span>
                    </th>
                    {row.prices.map((price, j) => (
                      <td key={`${i}-${SIZES[j].size}`}>{price}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={s.extrasRow}>
            <dl className={s.extras}>
              {EXTRAS.map(([name, price]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{price}</dd>
                </div>
              ))}
            </dl>
            <p className={s.tripFee}>No trip fee anywhere on the route. Off the route, $25 each way.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- ON BOARD */}
        <section id="van" className={s.sec} aria-labelledby="van-h">
          <div className={s.board}>
            <div className={s.foam} aria-hidden="true">
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
              <h2 id="van-h" className={s.h2}>What is on board</h2>
              <p className={s.headNote}>
                Big Dot is a long-wheelbase van we fitted out ourselves. It is
                a small salon on wheels, and it smells of oatmeal shampoo.
              </p>
              <ol className={s.kit}>
                {ON_BOARD.map(([name, text]) => (
                  <li key={name}>
                    <h3>{name}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={`${s.sec} ${s.howSec}`} aria-labelledby="how-h">
          <div className={s.secHead}>
            <h2 id="how-h" className={s.h2}>How a groom goes</h2>
            <p className={s.headNote}>
              Robin grooms, Kai bathes and dries. Between them they see about
              eight dogs a day, one at a time.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([when, what]) => (
              <li key={when}>
                <h3>{when}</h3>
                <p>{what}</p>
              </li>
            ))}
          </ol>

          <div className={s.crew}>
            <div className={s.bones} aria-hidden="true">
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
                <h3>Robin Achebe</h3>
                <p className={s.personRole}>Owner and groomer, since 2013</p>
                <p>Scissor work, doodles, and the dogs other groomers send away.</p>
              </div>
              <div className={s.person}>
                <h3>Kai Lindgren</h3>
                <p className={s.personRole}>Bather, Tuesday to Friday</p>
                <p>Warm water, the de-shed brush, and the pocket of treats.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={s.sec} aria-labelledby="rules-h">
          <div className={s.secHead}>
            <h2 id="rules-h" className={s.h2}>The small print, in large print</h2>
          </div>
          <dl className={s.rules}>
            {RULES.map(([term, text]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <form className={s.form} action="#">
            <div className={s.formHead}>
              <h2 id="book-h" className={s.h2}>Book a groom</h2>
              <p className={s.headNote}>We reply by text within a working day with a two-hour window.</p>
            </div>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="mp-name">Your name</label>
                <input id="mp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="mp-phone">Mobile, for the texts</label>
                <input id="mp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="mp-street">Street address</label>
                <input id="mp-street" name="street" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label htmlFor="mp-stop">Neighborhood</label>
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
                <label htmlFor="mp-dog">Dog's name and breed</label>
                <input id="mp-dog" name="dog" type="text" />
              </div>
              <div className={s.field}>
                <label htmlFor="mp-service">Service</label>
                <select id="mp-service" name="service" defaultValue="full">
                  <option value="full">Full groom</option>
                  <option value="bath">Bath and brush</option>
                  <option value="deshed">De-shed</option>
                  <option value="puppy">Puppy intro</option>
                  <option value="nails">Nails only</option>
                </select>
              </div>
              <fieldset className={s.sizePick}>
                <legend>Size</legend>
                {SIZES.map((z) => (
                  <label key={z.size} className={s.sizeOption}>
                    <input type="radio" name="size" value={z.size} defaultChecked={z.size === 'M'} />
                    <span>{z.size}</span>
                  </label>
                ))}
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="mp-notes">Anything we should know</label>
                <textarea id="mp-notes" name="notes" rows={3} />
              </div>
            </div>
            <button className={s.submit} type="submit">Send the booking</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p className={s.footName}>Muddy Paws</p>
          <p>A fictional mobile dog grooming van. The route, neighborhoods, prices and people are invented.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
          <p>The dog is a generated image, drawn in the page's own colors.</p>
        </div>
      </footer>
    </div>
  );
}
