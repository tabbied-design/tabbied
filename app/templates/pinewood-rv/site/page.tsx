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
const HEARTH = ['transparent', PINE, ORANGE, GRAY, PALE];

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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#eef0ea',
        '--ink': '#17201a',
        '--pine': '#3f6b4b',
        '--orange': '#d9853b',
        '--gray': '#8a938b',
        '--pale': '#d7ded4',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,pine,orange,gray,pale"
      className={s.page}>
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
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Pinewood RV Park</span>
        </a>
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
            The treeline and the camper, tinted pine and pale, across the
            whole screen. Its sky is empty, so the section's evening glow
            shows through behind the trees. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <Artwork slug="pinewood-rv-treeline" alt="" mode="tint" fit="cover" inks={['color-mix(in srgb, var(--ink) 50%, var(--pine))', 'var(--paper)']} />
          </div>
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Open April 15 to October 31</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Pull in under
              <br />
              <em>the pines.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Sixty-two shaded sites on forty acres of old pine, full hookups
              to 50 amps, a bathhouse with hot showers, and a fire ring at
              every site.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#reserve">Reserve a site</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#sites">Sites and rates</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- FACTS */}
        <div className={s.facts}>
          <dl className={s.factsList}>
            {FACTS.map(([big, small], i) => (
              <div key={small}>
                <dt data-edit={`top.term.${i}`} data-edit-max="28">{big}</dt>
                <dd data-edit={`top.body.${i}`} data-edit-max="200" data-edit-multiline>{small}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ----------------------------------------------------------- SITES */}
        <section id="sites" className={s.sec} aria-labelledby="sites-h">
          <div className={s.secHead}>
            <span data-edit="sites.secTag" data-edit-max="60" className={s.secTag}>Sites and rates</span>
            <h2 data-edit="sites.title" data-edit-max="60" id="sites-h">Five kinds of site, all under trees</h2>
            <p data-edit="sites.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every site has a picnic table, a fire ring and a level gravel
              pad. The 2026 season rates, per site:
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.rates}>
              <caption data-edit="sites.srOnly" className={s.srOnly}>Site types and rates for the 2026 season</caption>
              <thead>
                <tr>
                  <th data-edit="sites.heading" scope="col">Site</th>
                  <th data-edit="sites.heading2" scope="col">Hookups</th>
                  <th data-edit="sites.heading3" scope="col">Max length</th>
                  <th data-edit="sites.heading4" scope="col">Night</th>
                  <th data-edit="sites.heading5" scope="col">Week</th>
                  <th data-edit="sites.heading6" scope="col">Month</th>
                </tr>
              </thead>
              <tbody>
                {SITES.map((site, i) => (
                  <tr key={site.kind}>
                    <th data-edit={`sites.heading7.${i}`} scope="row">{site.kind}</th>
                    <td data-edit={`sites.cell.${i}`} data-label="Hookups">{site.hookups}</td>
                    <td data-edit={`sites.cell2.${i}`} data-label="Max length">{site.length}</td>
                    <td data-edit={`sites.rateNight.${i}`} data-label="Night" className={s.rateNight}>{site.night}</td>
                    <td data-edit={`sites.cell3.${i}`} data-label="Week">{site.week}</td>
                    <td data-edit={`sites.cell4.${i}`} data-label="Month">{site.month}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={s.rateNotes}>
            {RATE_NOTES.map((n, i) => (
              <li data-edit={`sites.item.${i}`} data-edit-max="80" key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- AMENITIES */}
        <section id="amenities" className={s.sec} aria-labelledby="amenities-h">
          <div className={s.secHead}>
            <span data-edit="amenities.secTag" data-edit-max="60" className={s.secTag}>Amenities</span>
            <h2 data-edit="amenities.title" data-edit-max="60" id="amenities-h">Everything within a short walk</h2>
            <p data-edit="amenities.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The bathhouse, laundry and store are together at the center of
              the park, so no site is more than three minutes away.
            </p>
          </div>
          <ul className={s.amenities}>
            {AMENITIES.map((a, i) => (
              <li key={a.name} className={s.amenity}>
                <h3 data-edit={`amenities.title2.${i}`} data-edit-max="40">{a.name}</h3>
                <p data-edit={`amenities.body.${i}`} data-edit-max="240" data-edit-multiline>{a.body}</p>
                <span data-edit={`amenities.amenityHours.${i}`} data-edit-max="60" className={s.amenityHours}>{a.hours}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BAND
            Cross-stitch like the camp blanket on the office bench: the
            loudest pattern on the page. */}
        <div className={s.band} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4,1" className={s.bandField}>
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
              <span data-edit="rules.secTag" data-edit-max="60" className={s.secTag}>Park rules</span>
              <h2 data-edit="rules.title" data-edit-max="60" id="rules-h">A short list, kept by everyone</h2>
              <p data-edit="rules.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Mostly about sleep and fire. The host couple in site 1 can help
                with anything after the office closes.
              </p>
              <div className={s.rulesPatch} aria-hidden="true">
                <TabbiedPattern
                  pattern={stitch}
                  palette={BLANKET}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={36}
                  seed="pinewood-patch"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <dl className={s.rules}>
              {RULES.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`rules.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`rules.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------ DIRECTIONS */}
        <section id="directions" className={s.sec} aria-labelledby="directions-h">
          <div className={s.secHead}>
            <span data-edit="directions.secTag" data-edit-max="60" className={s.secTag}>Directions</span>
            <h2 data-edit="directions.title" data-edit-max="60" id="directions-h">Finding the gate</h2>
          </div>
          <div className={s.directions}>
            <div className={s.route}>
              <p data-edit="directions.address" data-edit-max="240" data-edit-multiline className={s.address}>4410 Cedar Fork Road</p>
              <p data-edit="directions.body" data-edit-max="240" data-edit-multiline>
                From Highway 12, take exit 44 and go north on Cedar Fork Road
                for nine miles. The gate is on the left, just past the
                volunteer fire station.
              </p>
              <p data-edit="directions.warn" data-edit-max="240" data-edit-multiline className={s.warn}>
                After the bridge your GPS may send you up Old Mill Road. Do
                not follow it: the underpass there is 10 feet high.
              </p>
            </div>
            <dl className={s.nearby}>
              {NEARBY.map(([place, dist, what], i) => (
                <div key={place}>
                  <dt data-edit={`directions.term.${i}`} data-edit-max="28">{place}</dt>
                  <dd data-edit={`directions.nearbyDist.${i}`} data-edit-max="200" data-edit-multiline className={s.nearbyDist}>{dist}</dd>
                  <dd data-edit={`directions.nearbyWhat.${i}`} data-edit-max="200" data-edit-multiline className={s.nearbyWhat}>{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- RESERVE
            The fire ring in its clearing, edge to edge, in two inks. Stars
            sit behind the picture, so they show only between the trees. */}
        <section id="reserve" className={s.reserve} aria-labelledby="reserve-h">
          <div data-edit-pattern="reserve.field" data-edit-roles="transparent,5,3,4" className={s.reserveStars} aria-hidden="true">
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
              <span data-edit="reserve.secTagLight" data-edit-max="60" className={s.secTagLight}>Reservations</span>
              <h2 data-edit="reserve.title" data-edit-max="60" id="reserve-h">Save a site by the fire</h2>
              <p data-edit="reserve.body" data-edit-max="240" data-edit-multiline>
                A one-night deposit holds the site. Cancel up to seven days
                before and it all comes back; after that, it moves to another
                stay this season.
              </p>
              <a data-edit="reserve.phone" data-edit-max="28" className={s.phone} href="tel:+15550166210">(555) 016-6210</a>
              <span data-edit="reserve.phoneNote" data-edit-max="60" className={s.phoneNote}>Office, 8 am to 8 pm</span>
            </div>
            <form className={s.form} action="#">
              <div className={s.formPair}>
                <div className={s.field}>
                  <label data-edit="reserve.label" htmlFor="pw-arrive">Arrive</label>
                  <input id="pw-arrive" name="arrive" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="reserve.label2" htmlFor="pw-nights">Nights</label>
                  <input id="pw-nights" name="nights" type="number" min="1" max="60" defaultValue="3" />
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="reserve.label3" htmlFor="pw-site">Site</label>
                <select id="pw-site" name="site" defaultValue={SITES[0].kind}>
                  {SITES.map((site) => (
                    <option key={site.kind} value={site.kind}>{site.kind}</option>
                  ))}
                </select>
              </div>
              <div className={s.formPair}>
                <div className={s.field}>
                  <label data-edit="reserve.label4" htmlFor="pw-length">Rig length, ft</label>
                  <input id="pw-length" name="length" type="number" min="0" max="45" placeholder="32" />
                </div>
                <div className={s.field}>
                  <label data-edit="reserve.label5" htmlFor="pw-amp">Power</label>
                  <select id="pw-amp" name="amp" defaultValue="50">
                    <option value="30">30 amp</option>
                    <option value="50">50 amp</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="reserve.label6" htmlFor="pw-email">Email</label>
                <input id="pw-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <button data-edit="reserve.formBtn" data-edit-max="24" className={s.formBtn} type="submit">Check availability</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <span data-edit="faq.secTag" data-edit-max="60" className={s.secTag}>FAQ</span>
            <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Asked at the office window</h2>
          </div>
          <div className={s.faq}>
            <div className={s.faqWindow} aria-hidden="true">
              <TabbiedPattern
                pattern={northstar}
                palette={NIGHT}
                options={{ frequency: 0.22 }}
                fit="grid"
                cellSize={22}
                seed="pinewood-window"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            {FAQS.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footStitch} aria-hidden="true">
          <TabbiedPattern
            pattern={stitch}
            palette={HEARTH}
            options={{ frequency: 0.55 }}
            fit="grid"
            cellSize={40}
            seed="pinewood-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Pinewood RV Park</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Sixty-two sites under the pines, April 15 to October 31.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Gate</h2>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footText}>
              4410 Cedar Fork Road
              <br />
              Exit 44 off Highway 12
            </p>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Office</h2>
            <a data-edit="footer.footLink" data-edit-max="28" className={s.footLink} href="tel:+15550166210">(555) 016-6210</a>
            <a data-edit="footer.footLink2" data-edit-max="28" className={s.footLink} href="mailto:office@pinewoodrv.example">office@pinewoodrv.example</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional RV park. Sites, rates, rules and roads are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, photographs painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
