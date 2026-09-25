import { TabbiedPattern } from 'tabbied/react';
import { radiantswirl, contourlines, dashfield } from 'tabbied/patterns';
import s from './wayfarer-travel.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Wayfarer Travel: Independent travel agency, Port Ellery',
  description:
    'Wayfarer Travel plans slow trips by rail, sail and on foot, from a small office on Harbor Street. Eight journeys for this year, a free first consult and a planning fee you see up front.',
};

/* Site colors, the same five as the stylesheet's root rule. Each field takes
   `transparent` first, so the rings sit on the paper rather than a plate. */
const NAVY = '#1B2B3A';
const CORAL = '#E0673B';
const TEAL = '#2E8B8B';
const SAND = '#E9DFC9';

const SWIRL = ['transparent', NAVY, SAND, TEAL, CORAL];
const CONTOUR = ['transparent', TEAL, SAND, CORAL];
const ROUTE = ['transparent', CORAL, SAND, TEAL];

const NAV = [
  ['Destinations', '#destinations'],
  ['Trip styles', '#styles'],
  ['How it works', '#planning'],
  ['Postcards', '#postcards'],
  ['Consult', '#consult'],
];

/* The illustrations are flat color layers. Each plate color gets its own
   pairing of inks, so the same lighthouse reads on sand, teal or navy. */
type Plate = 'sand' | 'teal' | 'navy' | 'coral';

const INKS: Record<Plate, Record<string, string>> = {
  sand: { red: 'var(--coral)', blue: 'var(--navy)', black: 'var(--teal)' },
  teal: { red: 'var(--paper)', blue: 'var(--navy)', black: 'var(--navy)' },
  navy: { red: 'var(--coral)', blue: 'var(--sand)', black: 'var(--teal)' },
  coral: { red: 'var(--paper)', blue: 'var(--navy)', black: 'var(--navy)' },
};

type Trip = {
  no: string;
  art: string;
  alt: string;
  plate: Plate;
  region: string;
  name: string;
  body: string;
  length: string;
  from: string;
  months: string;
  tag?: string;
};

const TRIPS: Trip[] = [
  {
    no: '01',
    art: 'wayfarer-travel-lighthouse',
    alt: 'A lighthouse on a rocky point',
    plate: 'sand',
    region: 'Maine, USA',
    name: 'The lighthouse coast',
    body: 'Portland to Bar Harbor on the coast road, with a night in a keeper\'s cottage and a lobster boat at dawn.',
    length: '8 days, self-drive',
    from: '$2,480',
    months: 'June to September',
  },
  {
    no: '02',
    art: 'wayfarer-travel-sailboat',
    alt: 'A small sailing boat on a wave',
    plate: 'teal',
    region: 'Cyclades, Greece',
    name: 'Islands under sail',
    body: 'A skippered yacht for eight, anchoring off Paros, Naxos and Folegandros, with the cooking done ashore.',
    length: '10 days, small boat',
    from: '$3,950',
    months: 'May to October',
    tag: 'Two cabins left',
  },
  {
    no: '03',
    art: 'wayfarer-travel-temple',
    alt: 'A pagoda on a hill',
    plate: 'navy',
    region: 'Kyoto and Kii, Japan',
    name: 'Temples and the old road',
    body: 'Four days in Kyoto, then four days on the Kumano Kodo from inn to inn, with your bags sent ahead.',
    length: '12 days, rail and foot',
    from: '$5,200',
    months: 'April, May, October, November',
  },
  {
    no: '04',
    art: 'wayfarer-travel-balloon',
    alt: 'A hot-air balloon with a striped envelope',
    plate: 'coral',
    region: 'Cappadocia, Turkey',
    name: 'The valleys at first light',
    body: 'A cave hotel in Uchisar, a balloon flight at sunrise and three days walking the Rose and Red valleys.',
    length: '7 days, hotel based',
    from: '$2,150',
    months: 'April to November',
    tag: 'New this year',
  },
  {
    no: '05',
    art: 'wayfarer-travel-lighthouse',
    alt: 'A lighthouse on a rocky point',
    plate: 'teal',
    region: 'Brittany, France',
    name: 'The pink granite coast',
    body: 'The customs officers\' path from Perros-Guirec to Trebeurden, a crepe at every harbor and a sea-view room each night.',
    length: '9 days, inn to inn',
    from: '$2,890',
    months: 'May to September',
  },
  {
    no: '06',
    art: 'wayfarer-travel-sailboat',
    alt: 'A small sailing boat on a wave',
    plate: 'navy',
    region: 'Dalmatia, Croatia',
    name: 'A small ship down the coast',
    body: 'Split to Dubrovnik on a thirty-guest motor sailer, swimming stops every afternoon and a bike on board.',
    length: '8 days, small ship',
    from: '$2,640',
    months: 'June to September',
  },
  {
    no: '07',
    art: 'wayfarer-travel-temple',
    alt: 'A pagoda on a hill',
    plate: 'sand',
    region: 'Luang Prabang, Laos',
    name: 'Slow boat on the Mekong',
    body: 'Two days downriver from the Thai border, then a week in a town of monasteries, markets and early nights.',
    length: '11 days, river and town',
    from: '$3,380',
    months: 'November to March',
  },
  {
    no: '08',
    art: 'wayfarer-travel-balloon',
    alt: 'A hot-air balloon with a striped envelope',
    plate: 'teal',
    region: 'New Mexico, USA',
    name: 'The balloon fiesta',
    body: 'Five hundred balloons at dawn in Albuquerque, then the high road to Taos and two nights in Santa Fe.',
    length: '5 days, fly-drive',
    from: '$1,790',
    months: 'First week of October',
  },
];

const STYLES = [
  {
    name: 'Slow rail',
    body: 'Sleepers and day trains instead of short flights, with seats reserved on the side that has the view.',
    length: '9-16 days',
    from: 'From $2,900',
    planner: 'Planned by Ines',
  },
  {
    name: 'Small ships and sail',
    body: 'Boats for 8 to 40 guests, which fit into the harbors the big ships sail past. No formal nights.',
    length: '7-12 days',
    from: 'From $2,600',
    planner: 'Planned by Theo',
  },
  {
    name: 'Inn to inn on foot',
    body: 'Four to six hours of walking a day on marked paths, a different bed each night, your bags moved for you.',
    length: '6-12 days',
    from: 'From $2,100',
    planner: 'Planned by Marisol',
  },
  {
    name: 'A first big trip with kids',
    body: 'Two bases rather than six, a pool somewhere in the middle, and days that end before anyone is tired.',
    length: '8-14 days',
    from: 'From $3,400 per family',
    planner: 'Planned by Ines',
  },
];

const STEPS = [
  {
    no: '1',
    title: 'A free consult',
    when: '45 minutes',
    body: 'At the office or on a call. We ask where you have been, what you liked about it, and what a bad day on holiday looks like for you.',
  },
  {
    no: '2',
    title: 'A written plan',
    when: 'Within 5 working days',
    body: 'A day-by-day itinerary with the hotels named, the trains timed and one honest price per person. Change anything, as often as you like.',
  },
  {
    no: '3',
    title: 'Booked and bundled',
    when: 'Once you say yes',
    body: 'We book everything in your name, hold it on a trust account and send one folder: tickets, maps, restaurant notes and the phone numbers you need.',
  },
  {
    no: '4',
    title: 'While you are away',
    when: 'Day and night',
    body: 'A missed connection or a closed road is a call to our 24-hour line, not an afternoon on hold with an airline.',
  },
];

const FEES = [
  ['First consult', 'Free'],
  ['Planning fee, per trip', '$250'],
  ['Credited back on bookings over', '$4,000'],
  ['Changes after booking', 'At cost, no fee'],
];

const POSTCARDS = [
  {
    quote: 'Every train was on the platform the folder said it would be. We spent the whole trip looking out of windows instead of at our phones.',
    who: 'Dana and Rui, Kyoto and Kii',
    mark: 'Kii, Oct',
    art: 'wayfarer-travel-temple',
    alt: 'A pagoda on a hill',
  },
  {
    quote: 'The ferry was cancelled on day four. Theo had us on a fishing boat to the next island before the harbor cafe had brought our coffee.',
    who: 'The Okafor family, Cyclades',
    mark: 'Naxos, Jul',
    art: 'wayfarer-travel-sailboat',
    alt: 'A small sailing boat on a wave',
  },
  {
    quote: 'I asked for somewhere quiet with good bread. I got a lighthouse, a harbor with four boats in it and the best bread of my life.',
    who: 'Harriet P., Brittany',
    mark: 'Brittany, Jun',
    art: 'wayfarer-travel-lighthouse',
    alt: 'A lighthouse on a rocky point',
  },
];

const FAQ = [
  {
    q: 'Do you charge for the first consult?',
    a: 'No. The first 45 minutes are free, at the office or on a call, and you leave with notes whether or not you book with us.',
  },
  {
    q: 'Why is there a planning fee at all?',
    a: 'A written plan takes a planner about two days. The fee covers that work, and it comes back to you as a credit on any trip that costs more than $4,000 to book.',
  },
  {
    q: 'Can you book just the flights?',
    a: 'We can, but we are not the cheapest way to do it. We are useful where the pieces have to fit: trains, ferries, small hotels and the days in between.',
  },
  {
    q: 'Where does my money sit?',
    a: 'In a trust account in your name until each supplier is paid. We are a registered seller of travel, number 555-0192, and every booking carries our protection.',
  },
  {
    q: 'Do you arrange travel insurance?',
    a: 'We will send you three quotes from insurers we have claimed with, but we do not sell it ourselves, so there is no commission in the advice.',
  },
];

const HOURS = [
  ['Monday to Friday', '9 am - 6 pm'],
  ['Saturday', '10 am - 2 pm'],
  ['Sunday', 'Closed'],
];

export default function WayfarerTravelPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gloock&family=Albert+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandName}>Wayfarer</span>
          <span className={s.brandTag}>Travel</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#consult">Book a free consult</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The balloon rises through the swirl: one big radial field on the
            right, the promise and three figures on the left. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Independent travel agency, Port Ellery, since 2009</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Trips planned by people who have <em>been there.</em>
            </h1>
            <p className={s.heroLede}>
              Slow journeys by rail, sail and on foot, built one day at a time
              by a planner who has walked the route. One written plan, one
              honest price, and a real person on the phone while you are away.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#destinations">See this year's trips</a>
              <a className={s.btnGhost} href="#consult">Book a free consult</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt>Trips planned</dt>
                <dd>2,140</dd>
              </div>
              <div>
                <dt>Countries we know on foot</dt>
                <dd>38</dd>
              </div>
              <div>
                <dt>Line while you travel</dt>
                <dd>24 h</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroArt}>
            <div className={s.swirl} aria-hidden="true">
              <TabbiedPattern
                pattern={radiantswirl}
                palette={SWIRL}
                fit="grid"
                cellSize={110}
                seed="wayfarer-hero"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="wayfarer-travel-balloon"
              alt="A hot-air balloon with a striped envelope"
              inks={{ red: 'var(--coral)', blue: 'var(--navy)', black: 'var(--navy)' }}
              className={s.heroBalloon}
            />
            <p className={s.heroStamp}>
              <span className={s.stampTop}>Next departure</span>
              <span className={s.stampMain}>Cappadocia</span>
              <span className={s.stampDate}>12 October</span>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- DESTINATIONS
            The carousel: one row of cards that scrolls sideways and snaps,
            bleeding off the right edge so the next trip is always half in
            view. */}
        <section id="destinations" className={s.dest} aria-labelledby="dest-h">
          <div className={s.destHead}>
            <div className={s.secHead}>
              <p className={s.secKicker}>This year's journeys</p>
              <h2 id="dest-h" className={s.secTitle}>Eight trips we would take again tomorrow</h2>
            </div>
            <div className={s.destMeta}>
              <p className={s.destNote}>
                Prices are per person sharing, including stays, trains, boats
                and guides, excluding flights to the start.
              </p>
              <p className={s.scrollHint}>Scroll or swipe the row</p>
            </div>
          </div>

          <ol className={s.rail}>
            {TRIPS.map((t) => (
              <li key={t.no} className={s.card}>
                <div className={`${s.plate} ${s[t.plate]}`}>
                  <span className={s.cardNo}>{t.no}</span>
                  {t.tag ? <span className={s.cardTag}>{t.tag}</span> : null}
                  <Artwork slug={t.art} alt={t.alt} inks={INKS[t.plate]} className={s.plateArt} />
                </div>
                <div className={s.cardBody}>
                  <p className={s.cardRegion}>{t.region}</p>
                  <h3 className={s.cardName}>{t.name}</h3>
                  <p className={s.cardText}>{t.body}</p>
                  <dl className={s.cardFacts}>
                    <div>
                      <dt>Length</dt>
                      <dd>{t.length}</dd>
                    </div>
                    <div>
                      <dt>Best months</dt>
                      <dd>{t.months}</dd>
                    </div>
                    <div className={s.cardPrice}>
                      <dt>From, per person</dt>
                      <dd>{t.from}</dd>
                    </div>
                  </dl>
                  <a className={s.cardLink} href="#consult">Ask about this trip</a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- STYLES
            Four ways to travel, each with its planner. A contour field sits
            behind the heading like the corner of a map. */}
        <section id="styles" className={s.styles} aria-labelledby="styles-h">
          <div className={s.stylesInner}>
            <div className={s.stylesHead}>
              <p className={s.secKicker}>Trip styles</p>
              <h2 id="styles-h" className={s.secTitle}>Four ways we like to travel</h2>
              <p className={s.secLede}>
                Every trip on this page is one of these four, and each style
                has one planner who has done it more times than anyone else in
                the office.
              </p>
              <div className={s.contour} aria-hidden="true">
                <TabbiedPattern
                  pattern={contourlines}
                  palette={CONTOUR}
                  options={{ frequency: 0.55 }}
                  fit="grid"
                  cellSize={80}
                  seed="wayfarer-map"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ul className={s.styleList}>
              {STYLES.map((st, i) => (
                <li key={st.name} className={s.style}>
                  <span className={s.styleNo}>{`0${i + 1}`}</span>
                  <h3 className={s.styleName}>{st.name}</h3>
                  <p className={s.styleBody}>{st.body}</p>
                  <p className={s.styleMeta}>
                    <span>{st.length}</span>
                    <span>{st.from}</span>
                  </p>
                  <p className={s.stylePlanner}>{st.planner}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- PLANNING
            Four steps along a dashed route, then the fees in plain numbers. */}
        <section id="planning" className={s.planning} aria-labelledby="planning-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>How it works</p>
            <h2 id="planning-h" className={s.secTitle}>From a first chat to a folder of tickets</h2>
          </div>
          <div className={s.route} aria-hidden="true">
            <TabbiedPattern
              pattern={dashfield}
              palette={ROUTE}
              fit="grid"
              cellSize={44}
              seed="wayfarer-route"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <ol className={s.steps}>
            {STEPS.map((st) => (
              <li key={st.no} className={s.step}>
                <span className={s.stepNo}>{st.no}</span>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepWhen}>{st.when}</p>
                <p className={s.stepBody}>{st.body}</p>
              </li>
            ))}
          </ol>
          <div className={s.fees}>
            <div className={s.feesText}>
              <h3 className={s.feesTitle}>What we charge</h3>
              <p className={s.feesBody}>
                Hotels and operators pay us a commission, which we are happy to
                show you line by line. The planning fee is the only thing we
                ask of you directly.
              </p>
            </div>
            <dl className={s.feeList}>
              {FEES.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------ POSTCARDS
            Three notes from travelers, each on a postcard with its stamp. */}
        <section id="postcards" className={s.postcards} aria-labelledby="postcards-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Postcards</p>
            <h2 id="postcards-h" className={s.secTitle}>What came back in the mail</h2>
          </div>
          <ul className={s.cards}>
            {POSTCARDS.map((p) => (
              <li key={p.who} className={s.postcard}>
                <div className={s.postMessage}>
                  <blockquote className={s.postQuote}>
                    <p>{p.quote}</p>
                  </blockquote>
                  <cite className={s.postWho}>{p.who}</cite>
                </div>
                <div className={s.postSide}>
                  <div className={s.stamp}>
                    <Artwork slug={p.art} alt={p.alt} inks={INKS.navy} className={s.stampArt} />
                  </div>
                  <span className={s.postmark}>{p.mark}</span>
                  <span className={s.postLines} aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.faqHead}>
            <p className={s.secKicker}>Before you ask</p>
            <h2 id="faq-h" className={s.secTitle}>The questions we hear first</h2>
            <Artwork
              slug="wayfarer-travel-lighthouse"
              alt=""
              inks={INKS.sand}
              className={s.faqArt}
            />
          </div>
          <div className={s.faqList}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- CONSULT
            The form on a navy panel, the office and hours beside it. */}
        <section id="consult" className={s.consult} aria-labelledby="consult-h">
          <div className={s.consultPanel}>
            <div className={s.consultIntro}>
              <p className={s.secKickerLight}>Book a free consult</p>
              <h2 id="consult-h" className={s.consultTitle}>Tell us where you have been dreaming of.</h2>
              <p className={s.consultLede}>
                A planner replies within one working day to set a time. Bring
                photos, a rough budget and anyone who is coming with you.
              </p>
              <Artwork
                slug="wayfarer-travel-sailboat"
                alt="A small sailing boat on a wave"
                inks={{ red: 'var(--coral)', blue: 'var(--sand)', black: 'var(--sand)' }}
                className={s.consultArt}
              />
            </div>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={s.fieldWide}>
                <span>Where would you like to go?</span>
                <input type="text" name="where" placeholder="A country, a region, or just a feeling" />
              </label>
              <label className={s.field}>
                <span>When</span>
                <select name="when" defaultValue="">
                  <option value="" disabled>Choose a season</option>
                  <option>Spring 2027</option>
                  <option>Summer 2027</option>
                  <option>Fall 2027</option>
                  <option>Winter 2027-28</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className={s.field}>
                <span>Travelers</span>
                <select name="travelers" defaultValue="2">
                  <option>1</option>
                  <option>2</option>
                  <option>3-4</option>
                  <option>5 or more</option>
                </select>
              </label>
              <label className={s.fieldWide}>
                <span>Budget per person</span>
                <select name="budget" defaultValue="">
                  <option value="" disabled>Choose a range</option>
                  <option>Under $2,500</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>Over $10,000</option>
                </select>
              </label>
              <label className={s.fieldWide}>
                <span>Anything else</span>
                <textarea name="notes" rows={3} placeholder="Mobility, diets, a birthday on the way" />
              </label>
              <button className={s.submit} type="submit">Request my consult</button>
            </form>
          </div>

          <div className={s.office}>
            <div>
              <h3 className={s.officeTitle}>The office</h3>
              <p className={s.officeText}>
                212 Harbor Street, second floor
                <br />
                Port Ellery
              </p>
              <p className={s.officeText}>
                <a href="tel:+15550142290">(555) 014-2290</a>
              </p>
              <p className={s.officeText}>
                <a href="mailto:plan@wayfarer.example">plan@wayfarer.example</a>
              </p>
            </div>
            <div>
              <h3 className={s.officeTitle}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className={s.officeTitle}>While you travel</h3>
              <p className={s.officeText}>
                Our 24-hour line, for travelers with a booking only:
              </p>
              <p className={s.officeText}>
                <a href="tel:+15550142291">(555) 014-2291</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p className={s.footName}>Wayfarer Travel</p>
            <p className={s.footTag}>Slow trips by rail, sail and on foot, planned on Harbor Street.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p>A fictional travel agency. Trips, prices and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
