import { TabbiedPattern } from 'tabbied/react';
import { northstar, stitch } from 'tabbied/patterns';
import s from './pinewood-rv.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Pinewood RV Park: Campground and RV park, Cedar Fork Road',
  description:
    'Sixty-two shaded sites on forty acres of pine: full hookups to 50 amps, pull-throughs for rigs to 45 feet, tent sites, camper cabins and a fire ring at every site. Open April 15 to October 31.',
};

/* Site colors. The blanket band sits on `transparent` on the paper; the
   stars sit on `transparent` behind the campfire picture, so they show
   only in its empty sky. */
const INK = '#17201A';
const PINE = '#3F6B4B';
const ORANGE = '#D9853B';
const GRAY = '#8A938B';
const PALE = '#D7DED4';

const BLANKET = ['transparent', PINE, ORANGE, GRAY, INK];
const NIGHT = ['transparent', PALE, ORANGE, GRAY];

const NAV = [
  ['Sites', '#sites'],
  ['Amenities', '#amenities'],
  ['Park rules', '#rules'],
  ['Directions', '#directions'],
  ['FAQ', '#faq'],
  ['Reserve', '#reserve'],
];

const FACTS = [
  ['62', 'sites on 40 acres'],
  ['50 amp', 'full hookups'],
  ['45 ft', 'pull-throughs'],
  ['Free', 'Wi-Fi, park-wide'],
  ['2', 'dogs per site, free'],
];

type Site = {
  kind: string;
  hookups: string;
  length: string;
  night: string;
  week: string;
  month: string;
};

const SITES: Site[] = [
  { kind: 'Pull-through', hookups: 'Full, 30 and 50 amp', length: '45 ft', night: '$58', week: '$348', month: '$990' },
  { kind: 'Creekside back-in', hookups: 'Full, 30 and 50 amp', length: '38 ft', night: '$54', week: '$324', month: '$920' },
  { kind: 'Back-in', hookups: 'Water and 30 amp', length: '32 ft', night: '$44', week: '$264', month: '$760' },
  { kind: 'Tent site', hookups: 'None, water nearby', length: 'Tents only', night: '$26', week: '$156', month: 'No' },
  { kind: 'Camper cabin', hookups: 'Power, sleeps four', length: 'Park and walk', night: '$89', week: '$534', month: 'No' },
];

const RATE_NOTES = [
  'Rates are for up to four people; each extra guest is $5 a night.',
  'Two dogs stay free. 10% off for veterans and seniors.',
  'Plus 7% county lodging tax. Monthly stays pay metered electric.',
];

type Amenity = {
  name: string;
  body: string;
  hours: string;
};

const AMENITIES: Amenity[] = [
  { name: 'Bathhouse', body: 'Hot showers, private stalls, cleaned twice a day.', hours: 'Open around the clock' },
  { name: 'Laundry', body: 'Six washers and six dryers beside the bathhouse.', hours: '$2.50 a load' },
  { name: 'Camp store', body: 'Ice, firewood, propane refills, milk, bread and bug spray.', hours: '7 am to 9 pm' },
  { name: 'Wi-Fi', body: 'Free across the park, fast enough to stream by the store.', hours: 'Password at check-in' },
  { name: 'Dump station', body: 'Two lanes by the exit, with a rinse hose.', hours: 'Free for guests' },
  { name: 'Dog run', body: 'Half an acre, fenced, with a wash station and bags.', hours: 'Dawn to dusk' },
  { name: 'Playground and field', body: 'Swings, a sandbox and a mown field for ball games.', hours: 'Dawn to dusk' },
  { name: 'Creek trail', body: 'A two-mile loop through the pines down to Cedar Fork creek.', hours: 'Marked in blue' },
];

const RULES = [
  ['Quiet hours', '10 pm to 7 am. Voices carry under the pines.'],
  ['Check-in and out', 'In from 1 pm, out by 11 am. Late arrivals find their packet in the box by the office door.'],
  ['Speed', '5 miles an hour, everywhere. There are children on bikes.'],
  ['Fires', 'In the steel ring at your site only, and never left burning.'],
  ['Firewood', 'Buy it here or within 10 miles. Wood from farther away carries beetles.'],
  ['Pets', 'On a leash of 6 feet or less, never left alone, cleaned up after.'],
  ['Generators', 'Not allowed. Every RV site has power.'],
];

const NEARBY = [
  ['Hollis', '6 miles', 'Groceries, diesel, a pharmacy and the diner'],
  ['Hollis Lake', '3 miles', 'Beach, boat launch, kayak rental'],
  ['Hollis Regional Hospital', '22 miles', 'Emergency room, open all hours'],
];

const FAQS = [
  {
    q: 'Can we arrive after the office closes?',
    a: 'Yes. Your site number, map and Wi-Fi password are in an envelope with your name on it in the box by the office door. Pull in quietly and settle up in the morning.',
  },
  {
    q: 'Is the park big-rig friendly?',
    a: 'The roads are paved, 24 feet wide and loop one way, and the pull-throughs take rigs to 45 feet with a tow. Tell us your length and we will pick the site.',
  },
  {
    q: 'Is there cell service?',
    a: 'Two bars on the main carriers in most of the park, better by the store. The Wi-Fi covers every site.',
  },
  {
    q: 'Can we get packages delivered?',
    a: 'Yes, to the office, with your name and site number on the label. We will text you when it comes in.',
  },
  {
    q: 'Are you open in winter?',
    a: 'No. We close November 1 and open again April 15, when the water lines are safe from frost.',
  },
];

export default function PinewoodRvPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;700&family=Work+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markBadge} aria-hidden="true" />
          <span className={s.markName}>Pinewood RV Park</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The treeline and the camper, tinted pine and pale, across the
            whole screen. Its sky is empty, so the section's evening glow
            shows through behind the trees. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <Artwork slug="pinewood-rv-treeline" alt="" mode="tint" fit="cover" inks={['color-mix(in srgb, var(--ink) 50%, var(--pine))', 'var(--paper)']} />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>Open April 15 to October 31</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Pull in under
              <br />
              <em>the pines.</em>
            </h1>
            <p className={s.heroLede}>
              Sixty-two shaded sites on forty acres of old pine, full hookups
              to 50 amps, a bathhouse with hot showers, and a fire ring at
              every site.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#reserve">Reserve a site</a>
              <a className={s.btnGhost} href="#sites">Sites and rates</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- FACTS */}
        <div className={s.facts}>
          <dl className={s.factsList}>
            {FACTS.map(([big, small]) => (
              <div key={small}>
                <dt>{big}</dt>
                <dd>{small}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ----------------------------------------------------------- SITES */}
        <section id="sites" className={s.sec} aria-labelledby="sites-h">
          <div className={s.secHead}>
            <span className={s.secTag}>Sites and rates</span>
            <h2 id="sites-h">Five kinds of site, all under trees</h2>
            <p className={s.secNote}>
              Every site has a picnic table, a fire ring and a level gravel
              pad. The 2026 season rates, per site:
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.rates}>
              <caption className={s.srOnly}>Site types and rates for the 2026 season</caption>
              <thead>
                <tr>
                  <th scope="col">Site</th>
                  <th scope="col">Hookups</th>
                  <th scope="col">Max length</th>
                  <th scope="col">Night</th>
                  <th scope="col">Week</th>
                  <th scope="col">Month</th>
                </tr>
              </thead>
              <tbody>
                {SITES.map((site) => (
                  <tr key={site.kind}>
                    <th scope="row">{site.kind}</th>
                    <td data-label="Hookups">{site.hookups}</td>
                    <td data-label="Max length">{site.length}</td>
                    <td data-label="Night" className={s.rateNight}>{site.night}</td>
                    <td data-label="Week">{site.week}</td>
                    <td data-label="Month">{site.month}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={s.rateNotes}>
            {RATE_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- AMENITIES */}
        <section id="amenities" className={s.sec} aria-labelledby="amenities-h">
          <div className={s.secHead}>
            <span className={s.secTag}>Amenities</span>
            <h2 id="amenities-h">Everything within a short walk</h2>
            <p className={s.secNote}>
              The bathhouse, laundry and store are together at the center of
              the park, so no site is more than three minutes away.
            </p>
          </div>
          <ul className={s.amenities}>
            {AMENITIES.map((a) => (
              <li key={a.name} className={s.amenity}>
                <h3>{a.name}</h3>
                <p>{a.body}</p>
                <span className={s.amenityHours}>{a.hours}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BAND
            Cross-stitch like the camp blanket on the office bench: the
            loudest pattern on the page. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={stitch}
              palette={BLANKET}
              options={{ frequency: 0.5 }}
              fit="grid"
              cellSize={64}
              seed="pinewood-blanket"
              redrawInterval={8000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={s.sec} aria-labelledby="rules-h">
          <div className={s.rulesGrid}>
            <div className={s.secHeadSide}>
              <span className={s.secTag}>Park rules</span>
              <h2 id="rules-h">A short list, kept by everyone</h2>
              <p className={s.secNote}>
                Mostly about sleep and fire. The host couple in site 1 can help
                with anything after the office closes.
              </p>
            </div>
            <dl className={s.rules}>
              {RULES.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------ DIRECTIONS */}
        <section id="directions" className={s.sec} aria-labelledby="directions-h">
          <div className={s.secHead}>
            <span className={s.secTag}>Directions</span>
            <h2 id="directions-h">Finding the gate</h2>
          </div>
          <div className={s.directions}>
            <div className={s.route}>
              <p className={s.address}>4410 Cedar Fork Road</p>
              <p>
                From Highway 12, take exit 44 and go north on Cedar Fork Road
                for nine miles. The gate is on the left, just past the
                volunteer fire station.
              </p>
              <p className={s.warn}>
                After the bridge your GPS may send you up Old Mill Road. Do
                not follow it: the underpass there is 10 feet high.
              </p>
            </div>
            <dl className={s.nearby}>
              {NEARBY.map(([place, dist, what]) => (
                <div key={place}>
                  <dt>{place}</dt>
                  <dd className={s.nearbyDist}>{dist}</dd>
                  <dd className={s.nearbyWhat}>{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- RESERVE
            The fire ring in its clearing, edge to edge, in two inks. Stars
            sit behind the picture, so they show only between the trees. */}
        <section id="reserve" className={s.reserve} aria-labelledby="reserve-h">
          <div className={s.reserveStars} aria-hidden="true">
            <TabbiedPattern
              pattern={northstar}
              palette={NIGHT}
              options={{ frequency: 0.2 }}
              fit="grid"
              cellSize={24}
              seed="pinewood-night"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <span className={s.glow} aria-hidden="true" />
          <div className={s.reserveArt} aria-hidden="true">
            <Artwork slug="pinewood-rv-fire" alt="" fit="cover" inks={['var(--ink)', 'var(--gray)']} />
          </div>
          <div className={s.reserveInner}>
            <div className={s.reserveText}>
              <span className={s.secTagLight}>Reservations</span>
              <h2 id="reserve-h">Save a site by the fire</h2>
              <p>
                A one-night deposit holds the site. Cancel up to seven days
                before and it all comes back; after that, it moves to another
                stay this season.
              </p>
              <a className={s.phone} href="tel:+15550166210">(555) 016-6210</a>
              <span className={s.phoneNote}>Office, 8 am to 8 pm</span>
            </div>
            <form className={s.form} action="#">
              <div className={s.formPair}>
                <div className={s.field}>
                  <label htmlFor="pw-arrive">Arrive</label>
                  <input id="pw-arrive" name="arrive" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pw-nights">Nights</label>
                  <input id="pw-nights" name="nights" type="number" min="1" max="60" defaultValue="3" />
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="pw-site">Site</label>
                <select id="pw-site" name="site" defaultValue={SITES[0].kind}>
                  {SITES.map((site) => (
                    <option key={site.kind} value={site.kind}>{site.kind}</option>
                  ))}
                </select>
              </div>
              <div className={s.formPair}>
                <div className={s.field}>
                  <label htmlFor="pw-length">Rig length, ft</label>
                  <input id="pw-length" name="length" type="number" min="0" max="45" placeholder="32" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pw-amp">Power</label>
                  <select id="pw-amp" name="amp" defaultValue="50">
                    <option value="30">30 amp</option>
                    <option value="50">50 amp</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="pw-email">Email</label>
                <input id="pw-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <button className={s.formBtn} type="submit">Check availability</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <span className={s.secTag}>FAQ</span>
            <h2 id="faq-h">Asked at the office window</h2>
          </div>
          <div className={s.faq}>
            {FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Pinewood RV Park</p>
            <p className={s.footTag}>Sixty-two sites under the pines, April 15 to October 31.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Gate</h2>
            <p className={s.footText}>
              4410 Cedar Fork Road
              <br />
              Exit 44 off Highway 12
            </p>
          </div>
          <div>
            <h2 className={s.footHead}>Office</h2>
            <a className={s.footLink} href="tel:+15550166210">(555) 016-6210</a>
            <a className={s.footLink} href="mailto:office@pinewoodrv.example">office@pinewoodrv.example</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional RV park. Sites, rates, rules and roads are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, photographs painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
