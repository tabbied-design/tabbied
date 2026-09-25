import { TabbiedPattern } from 'tabbied/react';
import { lunette, ortho } from 'tabbied/patterns';
import s from './hollis-hart.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Hollis & Hart: Real estate agency, Alder Row and Kingsgate',
  description:
    'Hollis & Hart sells houses in Alder Row, Kingsgate and the streets around them. This month\'s featured house, every current listing, the agents, and a free valuation.',
};

/* Site colors, the same five as the stylesheet's root rule. The fields take
   `transparent` first, so the arches and the grid sit on the page's paper. */
const INK = '#151A1F';
const BRASS = '#9B7B4A';
const GRAY = '#8C8E90';
const PALE = '#E6E1D7';

const ARCHES = ['transparent', PALE, BRASS, GRAY];
const PLAN = ['transparent', GRAY, PALE, INK];

const NAV = [
  ['Featured', '#featured'],
  ['Listings', '#listings'],
  ['Agents', '#agents'],
  ['Valuation', '#valuation'],
  ['Contact', '#contact'],
];

const SPECS = [
  ['Asking', '$1,185,000'],
  ['Bedrooms', '4'],
  ['Bathrooms', '2.5'],
  ['Floor area', '2,850 sq ft'],
  ['Lot', '0.21 acre'],
  ['Built', '1891'],
];

const TEASERS = [
  {
    id: 'glass',
    art: 'hollis-hart-glass',
    alt: 'A two-story modern house with walls of glass and a cantilevered upper floor',
    kicker: 'New to market',
    title: 'All glass, on the ridge',
    body: 'A 2019 house by a local studio, with the living floor wrapped in glass and the bedrooms tucked above. Views to the reservoir from every room.',
    meta: '9 Crestline Way, $1,640,000',
  },
  {
    id: 'terrace',
    art: 'hollis-hart-townhouse',
    alt: 'A terrace of five brick townhouses with dormer windows and front steps',
    kicker: 'Under offer in a week',
    title: 'What a Kingsgate terrace sells for now',
    body: 'Three of the five houses on Mercer Terrace have changed hands this year. We look at what each one fetched, and why the middle one did best.',
    meta: 'Market notes, page 22',
  },
];

type Listing = {
  address: string;
  area: string;
  kind: string;
  beds: string;
  baths: string;
  size: string;
  price: string;
  status: string;
  tone: 'new' | 'open' | 'offer' | 'sold' | 'plain';
};

const LISTINGS: Listing[] = [
  { address: '18 Alder Row', area: 'Alder Row', kind: 'Victorian', beds: '4', baths: '2.5', size: '2,850', price: '$1,185,000', status: 'Featured', tone: 'new' },
  { address: '9 Crestline Way', area: 'North Ridge', kind: 'Modern', beds: '3', baths: '3', size: '3,120', price: '$1,640,000', status: 'New', tone: 'new' },
  { address: '4 Mercer Terrace', area: 'Kingsgate', kind: 'Townhouse', beds: '3', baths: '2', size: '1,960', price: '$915,000', status: 'Under offer', tone: 'offer' },
  { address: '27 Quarry Lane', area: 'Alder Row', kind: 'Craftsman', beds: '3', baths: '2', size: '1,780', price: '$789,000', status: 'Open Sat 11-1', tone: 'open' },
  { address: '112 Linnet Street, Apt 3', area: 'Kingsgate', kind: 'Apartment', beds: '2', baths: '1', size: '1,050', price: '$468,000', status: 'Open Sun 2-4', tone: 'open' },
  { address: '61 Orchard Hill', area: 'Hilltop', kind: 'Colonial', beds: '5', baths: '3.5', size: '3,640', price: '$1,295,000', status: 'For sale', tone: 'plain' },
  { address: '3 Weir Cottages', area: 'Millbrook', kind: 'Cottage', beds: '2', baths: '1', size: '910', price: '$412,000', status: 'For sale', tone: 'plain' },
  { address: '40 Mercer Terrace', area: 'Kingsgate', kind: 'Townhouse', beds: '4', baths: '2', size: '2,140', price: '$958,000', status: 'Sold', tone: 'sold' },
];

const AGENTS = [
  {
    initials: 'CH',
    name: 'Clara Hart',
    role: 'Founding partner',
    areas: 'Alder Row, Hilltop',
    note: 'Sells the old houses and writes most of this review. Ask her about porches.',
    phone: '(555) 016-4420',
    email: 'clara@hollishart.example',
  },
  {
    initials: 'DH',
    name: 'David Hollis',
    role: 'Founding partner',
    areas: 'Kingsgate, Millbrook',
    note: 'Twenty-two years of terraces and townhouses, and the valuations nobody argues with.',
    phone: '(555) 016-4421',
    email: 'david@hollishart.example',
  },
  {
    initials: 'RO',
    name: 'Ruth Okafor',
    role: 'Senior agent',
    areas: 'North Ridge, new builds',
    note: 'Handles architect-designed and new homes, and every buyer moving from out of state.',
    phone: '(555) 016-4425',
    email: 'ruth@hollishart.example',
  },
  {
    initials: 'SM',
    name: 'Sam Morrow',
    role: 'Lettings and apartments',
    areas: 'All areas',
    note: 'Apartments, condos and first homes. Also runs the Saturday open houses.',
    phone: '(555) 016-4430',
    email: 'sam@hollishart.example',
  },
];

const OFFICES = [
  {
    name: 'Alder Row office',
    lines: ['2 Alder Row, on the corner of Quarry Lane'],
    hours: 'Mon-Fri 9-6, Sat 10-4',
    phone: '(555) 016-4400',
  },
  {
    name: 'Kingsgate office',
    lines: ['58 Linnet Street, next to the library'],
    hours: 'Mon-Fri 9-6, Sun 11-3',
    phone: '(555) 016-4410',
  },
];

export default function HollisHartPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Libre+Franklin:wght@400;500;600&display=swap"
      />

      {/* ---------------------------------------------------------- MASTHEAD
          Set like the cover line of a monthly: the issue on a rule, the name
          across the middle, the sections in small capitals below it. */}
      <header className={s.masthead}>
        <div className={s.issue}>
          <span>The Property Review</span>
          <span className={s.issueNo}>No. 38, Autumn 2026</span>
          <span className={s.issueFree}>Free in both offices</span>
        </div>
        <a className={s.mark} href="#top">
          <span>Hollis</span>
          <em>&amp;</em>
          <span>Hart</span>
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
        {/* ----------------------------------------------------------- SPREAD
            Two facing pages with a fold between them: the house tinted
            across the left page, the story in columns on the right. */}
        <section id="featured" className={s.spread} aria-labelledby="featured-h">
          <div className={s.pageLeft}>
            <div className={s.runHead}>
              <span>Hollis &amp; Hart</span>
              <span>Alder Row</span>
            </div>
            <p className={s.kicker}>Featured property</p>
            <h1 className={s.spreadTitle} id="featured-h">
              The house on
              <br />
              <em>Alder Row</em>
            </h1>
            <div className={s.houseWrap}>
              <Artwork
                slug="hollis-hart-victorian"
                alt="A Victorian house with a wraparound porch, a corner turret and tall sash windows"
                mode="tint"
                inks={['var(--ink)', 'var(--ivory)']}
                className={s.house}
              />
            </div>
            <p className={s.photoCaption}>18 Alder Row, from the street, on a September morning.</p>
            <span className={s.folio}>14</span>
          </div>

          <div className={s.pageRight}>
            <div className={s.runHead}>
              <span>The featured house</span>
              <span>No. 38</span>
            </div>
            <p className={s.deck}>
              A Victorian with its porch, its turret and nearly all of its 1891
              detail, three minutes from the park and on the market for the
              first time in forty years.
            </p>
            <p className={s.byline}>Words by Clara Hart. Photographs by the agency.</p>

            <div className={s.columns}>
              <p className={s.dropcap}>
                The Ashdowns bought number 18 in 1985 for less than a car costs
                now, and raised three children and a great many tomatoes in
                it. What they did not do was modernize it, and that is the
                reason to come and see it. The staircase is the original
                walnut. The fireplaces work. The stained glass over the front
                door has been taken out once, to be releaded, and put back.
              </p>
              <p>
                Downstairs there are two parlors joined by pocket doors, a
                dining room with a bay, and a kitchen that was redone in 2011
                with more restraint than most. Upstairs there are four
                bedrooms, the largest in the turret, and a bathroom with its
                clawfoot tub.
              </p>
              <blockquote className={s.pull}>
                <p>The porch alone is fifty feet long, and it catches the evening sun.</p>
              </blockquote>
              <p>
                The roof was replaced in 2019 and the wiring in 2016, both with
                paperwork. The garden runs back to an old stone wall and a
                garage that could, with a permit, be a studio. It is a house
                for someone who likes old houses, and it will not be on the
                market long.
              </p>
            </div>

            <dl className={s.specs}>
              {SPECS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className={s.spreadActions}>
              <a className={s.button} href="#contact">Book a viewing</a>
              <a className={s.textLink} href="#listings">See every listing</a>
            </div>
            <span className={s.folio}>15</span>
          </div>
        </section>

        {/* ----------------------------------------------------------- ISSUE
            Also in this issue: the other two houses, as smaller features. */}
        <section className={s.issueMore} aria-labelledby="more-h">
          <div className={s.moreHead}>
            <h2 id="more-h">Also in this issue</h2>
            <div className={s.planTile} aria-hidden="true">
              <TabbiedPattern
                pattern={ortho}
                palette={PLAN}
                options={{ frequency: 1 }}
                fit="grid"
                cellSize={36}
                seed="hollis-plan"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.teasers}>
            {TEASERS.map((t) => (
              <article key={t.id} className={s.teaser}>
                <div className={s.teaserPic}>
                  <Artwork slug={t.art} alt={t.alt} mode="tint" inks={['var(--ink)', 'var(--ivory)']} className={s.teaserArt} />
                </div>
                <p className={s.kicker}>{t.kicker}</p>
                <h3>{t.title}</h3>
                <p className={s.teaserBody}>{t.body}</p>
                <p className={s.teaserMeta}>{t.meta}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- LISTINGS */}
        <section id="listings" className={s.sec} aria-labelledby="listings-h">
          <div className={s.secHead}>
            <p className={s.kicker}>Current listings</p>
            <h2 id="listings-h">Every house we have for sale this month</h2>
            <p className={s.secNote}>
              Sizes are finished floor area in square feet. Open houses need
              no appointment; for anything else, call the office that lists it.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.listings}>
              <thead>
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Area</th>
                  <th scope="col">Type</th>
                  <th scope="col" className={s.num}>Beds</th>
                  <th scope="col" className={s.num}>Baths</th>
                  <th scope="col" className={s.num}>Sq ft</th>
                  <th scope="col" className={s.num}>Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {LISTINGS.map((l) => (
                  <tr key={l.address}>
                    <th scope="row" className={s.addr}>{l.address}</th>
                    <td data-label="Area">{l.area}</td>
                    <td data-label="Type">{l.kind}</td>
                    <td data-label="Beds" className={s.num}>{l.beds}</td>
                    <td data-label="Baths" className={s.num}>{l.baths}</td>
                    <td data-label="Sq ft" className={s.num}>{l.size}</td>
                    <td data-label="Price" className={`${s.num} ${s.price}`}>{l.price}</td>
                    <td className={s.statusCell}>
                      <span className={`${s.status} ${s[`status_${l.tone}`]}`}>{l.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------------------------------------- AGENTS
            Set like a magazine's contributors page. */}
        <section id="agents" className={s.sec} aria-labelledby="agents-h">
          <div className={s.secHead}>
            <p className={s.kicker}>The agents</p>
            <h2 id="agents-h">Four agents, two offices, one list</h2>
            <p className={s.secNote}>
              Every listing is shared between the offices, so whoever you call
              can show you any house.
            </p>
          </div>
          <ul className={s.agents}>
            {AGENTS.map((a) => (
              <li key={a.name} className={s.agent}>
                <span className={s.initials} aria-hidden="true">{a.initials}</span>
                <h3>{a.name}</h3>
                <p className={s.agentRole}>{a.role}</p>
                <p className={s.agentAreas}>{a.areas}</p>
                <p className={s.agentNote}>{a.note}</p>
                <a className={s.agentLink} href={`tel:${a.phone.replace(/[^0-9]/g, '')}`}>{a.phone}</a>
                <a className={s.agentLink} href={`mailto:${a.email}`}>{a.email}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- VALUATION
            The one loud panel: fanlights in brass and pale, and the form. */}
        <section id="valuation" className={s.valuation} aria-labelledby="valuation-h">
          <div className={s.valuationField} aria-hidden="true">
            <TabbiedPattern
              pattern={lunette}
              palette={ARCHES}
              options={{ frequency: 0.6 }}
              fit="grid"
              cellSize={72}
              seed="hollis-valuation"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.valuationInner}>
            <div className={s.valuationText}>
              <p className={s.kicker}>Free valuation</p>
              <h2 id="valuation-h">What would your house sell for this autumn?</h2>
              <p>
                One of the partners comes to see it, walks every room, and
                sends you a written figure within three days, with the sales
                on your street it is based on. There is no charge and no
                obligation to list with us.
              </p>
              <ul className={s.valuationFacts}>
                <li>
                  <strong>3 days</strong>
                  <span>From the visit to the written figure</span>
                </li>
                <li>
                  <strong>1.2%</strong>
                  <span>Our fee if we sell it, and nothing if we do not</span>
                </li>
              </ul>
            </div>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span>Address of the property</span>
                <input type="text" name="address" autoComplete="street-address" required />
              </label>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>Type</span>
                  <select name="type" defaultValue="house">
                    <option value="house">House</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="apartment">Apartment</option>
                    <option value="land">Land</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span>Bedrooms</span>
                  <select name="beds" defaultValue="3">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 or more</option>
                  </select>
                </label>
              </div>
              <fieldset className={s.when}>
                <legend>Thinking of selling</legend>
                <label>
                  <input type="radio" name="when" value="now" defaultChecked />
                  <span>Now</span>
                </label>
                <label>
                  <input type="radio" name="when" value="year" />
                  <span>Within a year</span>
                </label>
                <label>
                  <input type="radio" name="when" value="curious" />
                  <span>Just curious</span>
                </label>
              </fieldset>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>Your name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className={s.field}>
                  <span>Email or phone</span>
                  <input type="text" name="contact" required />
                </label>
              </div>
              <button className={s.button} type="submit">Ask for a valuation</button>
            </form>
          </div>
        </section>

        {/* ---------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contact}>
            <div>
              <p className={s.kicker}>Contact</p>
              <h2 id="contact-h" className={s.contactTitle}>Two offices, open six days a week</h2>
              <p className={s.contactNote}>
                Viewings run from 8 am to 8 pm, weekends included. The inbox
                is read every day, and a partner answers within the day.
              </p>
              <p className={s.contactMail}>
                <a href="mailto:hello@hollishart.example">hello@hollishart.example</a>
              </p>
            </div>
            {OFFICES.map((o) => (
              <div key={o.name} className={s.office}>
                <h3>{o.name}</h3>
                {o.lines.map((line) => (
                  <p key={line} className={s.officeAddr}>{line}</p>
                ))}
                <p className={s.officeHours}>{o.hours}</p>
                <a className={s.agentLink} href={`tel:${o.phone.replace(/[^0-9]/g, '')}`}>{o.phone}</a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footMark}>Hollis &amp; Hart</p>
        <ul className={s.footLinks}>
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className={s.footFine}>
          <p>A fictional real estate agency. Houses, prices, streets and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live; the houses are printed in the page's own ink and paper.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
