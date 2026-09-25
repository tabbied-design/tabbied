import { TabbiedPattern } from 'tabbied/react';
import { battlement, keyway } from 'tabbied/patterns';
import s from './keyway-locksmiths.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Keyway Locksmiths: Locksmith, Harwick',
  description:
    'Keyway Locksmiths opens, rekeys and fits locks for homes, cars, safes and businesses in Harwick, 24 hours a day. Prices are fixed before we start and we are usually there in about 22 minutes.',
};

/* Site colors. Both fields draw on a `transparent` ground, so the rings and
   the teeth sit straight on the ink or the paper behind them. */
const INK = '#15171B';
const BRASS = '#C9962B';
const STEEL = '#7F8187';
const PALE = '#DEDBD3';

const CYLINDERS = ['transparent', BRASS, STEEL, PALE];
const QUIET = ['transparent', STEEL, BRASS];
const TEETH = ['transparent', BRASS, STEEL, INK];

const PHONE = '(555) 019-4400';
const PHONE_HREF = 'tel:+15550194400';

const NAV = [
  ['Services', '#services'],
  ['Prices', '#prices'],
  ['Areas', '#areas'],
  ['Questions', '#faq'],
  ['Call us', '#call'],
];

type Service = {
  id: string;
  title: string;
  tag: string;
  body: string;
  from: string;
  unit: string;
  icon: string;
  turn: string;
  urgent?: boolean;
};

/* Three icons for six services: the key lies down for a car key, the lever
   faces the other way for a building, and the padlock does two jobs. */
const SERVICES: Service[] = [
  {
    id: 'lockout',
    title: 'Locked out',
    tag: '24 hours',
    body: 'House, apartment or office. We open nine doors in ten without a scratch, and tell you before we drill the tenth.',
    from: '$85',
    unit: 'nights $125',
    icon: 'keyway-locksmiths-handle',
    turn: 'upright',
    urgent: true,
  },
  {
    id: 'rekey',
    title: 'Rekey',
    tag: 'Moved in, lost a key',
    body: 'Same locks, new pins, new keys. Every old key stops working. Cheaper than new locks and done in twenty minutes a door.',
    from: '$65',
    unit: '+ $25 a lock',
    icon: 'keyway-locksmiths-key',
    turn: 'upright',
  },
  {
    id: 'car',
    title: 'Car keys',
    tag: 'At the curb',
    body: 'Transponder, flip and smart keys cut and programmed from the van, for most makes since 1995. Car lockouts too.',
    from: '$120',
    unit: 'lockout $75',
    icon: 'keyway-locksmiths-key',
    turn: 'lying',
  },
  {
    id: 'safe',
    title: 'Safes',
    tag: 'Home and business',
    body: 'Opened when the code is lost, combinations changed, new safes delivered and bolted to the floor where no one looks.',
    from: '$150',
    unit: 'opening',
    icon: 'keyway-locksmiths-padlock',
    turn: 'upright',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    tag: 'Shops, offices, schools',
    body: 'Master key systems, restricted keys that cannot be copied, panic bars, closers and keypad entry, with a key register.',
    from: '$95',
    unit: 'an hour',
    icon: 'keyway-locksmiths-handle',
    turn: 'mirror',
  },
  {
    id: 'upgrade',
    title: 'New locks',
    tag: 'Fitted and guaranteed',
    body: 'Grade 1 deadbolts, smart locks, window and patio locks, and gate padlocks. Parts carry the maker warranty, our work 90 days.',
    from: '$65',
    unit: '+ parts',
    icon: 'keyway-locksmiths-padlock',
    turn: 'tilt',
  },
];

const STRIP = [
  ['22 min', 'Average arrival in Zone 1, last 12 months'],
  ['24/7', 'Including holidays, one number, a person answers'],
  ['$0', 'Call-out fee 8 am-6 pm inside Zone 1'],
  ['90 days', 'Guarantee on every job we do'],
];

const PRICES = [
  ['House or office lockout', '$85', '$125'],
  ['Car lockout', '$75', '$110'],
  ['Rekey, first lock', '$65', '$95'],
  ['Rekey, each extra lock', '$25', '$25'],
  ['Grade 1 deadbolt, supplied and fitted', '$165', '$205'],
  ['Transponder car key, cut and programmed', '$120-260', '$160-300'],
  ['Safe opening', 'from $150', 'from $220'],
  ['Commercial work, per hour', '$95', '$140'],
];

const ZONES = [
  {
    zone: 'Zone 1',
    time: '15-25 min',
    fee: 'No call-out fee in the day',
    places: 'Old Town, Mill End, Canal Row, Harwick Heights, the station',
  },
  {
    zone: 'Zone 2',
    time: '25-40 min',
    fee: '$20 call-out',
    places: 'Five Bridges, Eastfield, Larkspur, Tanner Hill, the college',
  },
  {
    zone: 'Zone 3',
    time: '40-60 min',
    fee: '$40 call-out',
    places: 'Ridgeway, Beckham, Ollerton, the airport road as far as the toll',
  },
];

const FAQ = [
  {
    q: 'Do I have to prove I live there?',
    a: 'Yes, once the door is open: a license, a bill or a lease with the address on it. If your ID is inside, we wait while you fetch it. For a car, the registration or the insurance card.',
  },
  {
    q: 'Will the price change when you arrive?',
    a: 'No. We give the price on the phone from what you tell us and write it on the job sheet before we touch the lock. If the lock turns out to need drilling, we stop and ask first.',
  },
  {
    q: 'Rekey or new locks?',
    a: 'If the locks work and you just want the old keys dead, rekey. If they are loose, worn, or a cheap brand, replace them. We will say which on the day and not upsell.',
  },
  {
    q: 'Can one key open every door?',
    a: 'Yes, if the locks share a keyway. We can rekey most brands to one key, and set up a master key for a building so each tenant opens only their own door.',
  },
  {
    q: 'How do I know it is you at the door?',
    a: 'The van is gray with our name on it, the locksmith carries a photo ID card, and we text you their name and the van plate when they set off.',
  },
];

export default function KeywayLocksmithsPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork slug="keyway-locksmiths-key" alt="" inks={['var(--brass)']} className={s.markIcon} />
          <span className={s.markName}>Keyway</span>
          <span className={s.markSub}>Locksmiths</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href={PHONE_HREF}>
          <span className={s.phoneWord}>Call</span>
          <span className={s.phoneNum}>{PHONE}</span>
        </a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Ink, with a field of lock cylinders behind the phone number. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={keyway}
              palette={CYLINDERS}
              options={{ frequency: 0.5 }}
              fit="grid"
              cellSize={72}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p className={s.kicker}>Harwick and the Five Bridges, since 1998</p>
              <h1 id="hero-h" className={s.heroTitle}>
                Locked out? <em>We are about 22 minutes away.</em>
              </h1>
              <p className={s.heroLede}>
                Homes, cars, safes and businesses, day and night. The price is
                fixed on the phone, before anyone gets in the van.
              </p>
            </div>
            <div className={s.callCard}>
              <span className={s.callLabel}>Call, day or night</span>
              <a className={s.callNumber} href={PHONE_HREF}>{PHONE}</a>
              <span className={s.callNote}>A person answers, not a menu.</span>
              <a className={s.callBack} href="#call">Or ask us to call you</a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- SERVICE PICKER
            Six big tiles, one per job, each with its icon and a price-from. */}
        <section id="services" className={s.picker} aria-labelledby="services-h">
          <div className={s.pickerHead}>
            <h2 id="services-h">What do you need?</h2>
            <p className={s.pickerNote}>Pick one and we will ask the right questions. Prices are weekdays 8 am-6 pm in Zone 1.</p>
          </div>
          <ul className={s.tiles}>
            {SERVICES.map((sv) => (
              <li key={sv.id} className={sv.urgent ? `${s.tile} ${s.tileUrgent}` : s.tile}>
                <span className={s.tileTag}>{sv.tag}</span>
                <div className={`${s.tileArt} ${s[sv.turn]}`}>
                  <Artwork slug={sv.icon} alt="" inks={['var(--ink)']} className={s.tileIcon} />
                </div>
                <h3>{sv.title}</h3>
                <p className={s.tileBody}>{sv.body}</p>
                <div className={s.tileFoot}>
                  <span className={s.tileFrom}>From</span>
                  <strong className={s.tilePrice}>{sv.from}</strong>
                  <span className={s.tileUnit}>{sv.unit}</span>
                  <a className={s.tileLink} href="#call">Book this</a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------- RESPONSE STRIP */}
        <section className={s.strip} aria-label="How fast, how much">
          <dl className={s.stripList}>
            {STRIP.map(([v, k]) => (
              <div key={v}>
                <dt>{v}</dt>
                <dd>{k}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <span className={s.secNo}>01</span>
            <h2 id="prices-h">What it costs</h2>
            <p className={s.secNote}>
              Labor and the visit. Parts are extra and priced before fitting;
              a zone call-out fee is added outside Zone 1 or outside the day.
            </p>
          </div>
          <table className={s.prices}>
            <caption className={s.visuallyHidden}>Prices by time of day</caption>
            <thead>
              <tr>
                <th scope="col">Job</th>
                <th scope="col">Weekdays 8-6</th>
                <th scope="col">Nights, weekends, holidays</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map(([job, day, night]) => (
                <tr key={job}>
                  <th scope="row">{job}</th>
                  <td data-label="Weekdays 8-6">{day}</td>
                  <td data-label="Nights and weekends">{night}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ----------------------------------------------------------- AREAS */}
        <section id="areas" className={s.sec} aria-labelledby="areas-h">
          <div className={s.secHead}>
            <span className={s.secNo}>02</span>
            <h2 id="areas-h">Where we go, and how fast</h2>
            <p className={s.secNote}>
              Three vans, parked at night in Old Town, Eastfield and Ridgeway,
              so one is never far. Times are the usual, not a promise, on a
              snowy Friday night.
            </p>
          </div>
          <div className={s.areas}>
            <div className={s.zoneMap} aria-hidden="true">
              <span className={s.ring3}>
                <span className={s.ringLabel}>3</span>
              </span>
              <span className={s.ring2}>
                <span className={s.ringLabel}>2</span>
              </span>
              <span className={s.ring1}>
                <span className={s.ringLabel}>1</span>
              </span>
              <span className={s.zoneCore}>
                <Artwork slug="keyway-locksmiths-key" alt="" inks={['var(--ink)']} className={s.zoneKey} />
              </span>
            </div>
            <ol className={s.zones}>
              {ZONES.map((z) => (
                <li key={z.zone}>
                  <div className={s.zoneTop}>
                    <h3>{z.zone}</h3>
                    <span className={s.zoneTime}>{z.time}</span>
                  </div>
                  <p className={s.zonePlaces}>{z.places}</p>
                  <p className={s.zoneFee}>{z.fee}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ CALL */}
        <section id="call" className={s.call} aria-labelledby="call-h">
          <div className={s.callPanel}>
            <div className={s.callField} aria-hidden="true">
              <TabbiedPattern
                pattern={keyway}
                palette={QUIET}
                options={{ frequency: 0.35 }}
                fit="grid"
                cellSize={64}
                seed="call"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork slug="keyway-locksmiths-padlock" alt="A closed padlock" inks={['var(--brass)']} className={s.callLock} />
            <h2 id="call-h" className={s.callTitle}>Tell us what happened</h2>
            <p className={s.callText}>We call back within ten minutes, day or night, with a price and a time. If you would rather talk now:</p>
            <a className={s.callBig} href={PHONE_HREF}>{PHONE}</a>
            <p className={s.callSafety}>If anyone is in danger, a child or a pet locked in a car, call 911 first.</p>
          </div>

          <form className={s.form} action="#">
            <fieldset className={s.choice}>
              <legend>What do you need?</legend>
              {SERVICES.map((sv) => (
                <label key={sv.id}>
                  <input type="radio" name="service" value={sv.id} defaultChecked={sv.urgent} />
                  <span>{sv.title}</span>
                </label>
              ))}
            </fieldset>
            <div className={s.field}>
              <label htmlFor="kw-name">Name</label>
              <input id="kw-name" name="name" type="text" autoComplete="name" />
            </div>
            <div className={s.field}>
              <label htmlFor="kw-phone">Phone</label>
              <input id="kw-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className={`${s.field} ${s.fieldWide}`}>
              <label htmlFor="kw-where">Street address or cross streets</label>
              <input id="kw-where" name="where" type="text" autoComplete="street-address" />
            </div>
            <div className={s.field}>
              <label htmlFor="kw-when">When</label>
              <select id="kw-when" name="when" defaultValue="now">
                <option value="now">Now, please</option>
                <option value="today">Later today</option>
                <option value="week">This week</option>
                <option value="quote">Just a quote</option>
              </select>
            </div>
            <div className={s.field}>
              <label htmlFor="kw-lock">The lock, if you know</label>
              <input id="kw-lock" name="lock" type="text" placeholder="Front door deadbolt" />
            </div>
            <div className={`${s.field} ${s.fieldWide}`}>
              <label htmlFor="kw-more">Anything else</label>
              <textarea id="kw-more" name="more" rows={3} />
            </div>
            <button type="submit" className={s.submit}>Call me back</button>
            <small className={s.formFine}>We use your number for this job only.</small>
          </form>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <span className={s.secNo}>03</span>
            <h2 id="faq-h">Questions we get at the door</h2>
            <p className={s.secNote}>And the answers, so you know before the van does.</p>
          </div>
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Teeth along the top of the footer, like the cuts on a key blade. */}
      <div className={s.teeth} aria-hidden="true">
        <TabbiedPattern
          pattern={battlement}
          palette={TEETH}
          options={{ frequency: 0.75 }}
          fit="grid"
          cellSize={40}
          redrawInterval={8600}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <p className={s.footName}>Keyway Locksmiths</p>
            <p className={s.footTag}>Locks opened, rekeyed and fitted in Harwick since 1998. License LS-40217, bonded and insured.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Call</h2>
            <p className={s.footBig}>
              <a href={PHONE_HREF}>{PHONE}</a>
            </p>
            <p className={s.footSmall}>24 hours, every day of the year</p>
          </div>
          <div>
            <h2 className={s.footHead}>Workshop</h2>
            <p className={s.footAddr}>
              41 Tanner Street, Harwick
              <br />
              Key cutting Mon-Sat 8-6
              <br />
              desk@keyway.example
            </p>
          </div>
          <div>
            <h2 className={s.footHead}>Pages</h2>
            <ul className={s.footLinks}>
              <li><a href="#services">Services</a></li>
              <li><a href="#prices">Prices</a></li>
              <li><a href="#areas">Areas</a></li>
              <li><a href="#call">Book a callback</a></li>
            </ul>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional locksmith. Prices, times, places and the license number are invented.</p>
          <p>
            Patterns by{' '}
            <a href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live on a transparent ground.
          </p>
        </div>
      </footer>
    </div>
  );
}
