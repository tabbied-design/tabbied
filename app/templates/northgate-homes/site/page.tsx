import { TabbiedPattern } from 'tabbied/react';
import { isometricblocks, lintel } from 'tabbied/patterns';
import s from './northgate-homes.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Northgate Homes: Independent real estate agent, Northgate',
  description:
    'Northgate Homes sells and rents houses and apartments in Northgate and the river villages. Current listings, a free valuation within 48 hours, and fees you can read before you call.',
};

/* Site colors. The listing "photos" are the cube tile in the site's own
   inks; every card shares one palette and the stylesheet crops each one
   differently, so a re-color reaches all of them. */
const PAPER = '#F6F4F1';
const BRICK = '#B5523B';
const SLATE = '#858A92';
const PALE = '#E3E1DC';
const INK = '#1B1D22';
const TILE = ['transparent', PAPER, PALE, SLATE];
const FACADE = ['transparent', BRICK, SLATE, INK];

const NAV = [
  ['Listings', '#listings'],
  ['Valuation', '#valuation'],
  ['Agents', '#agents'],
  ['Market', '#market'],
  ['Fees', '#fees'],
  ['Contact', '#contact'],
];

const MODES = ['Buy', 'Rent', 'Sold'];
const BEDS = ['Any', '1+', '2+', '3+', '4+'];
const PRICES = ['Any price', 'Up to $300k', '$300k to $500k', '$500k to $750k', '$750k and up'];

type Listing = {
  status: string;
  tone: 'accent' | 'ink' | 'muted';
  price: string;
  street: string;
  place: string;
  beds: string;
  baths: string;
  sqft: string;
};

const LISTINGS: Listing[] = [
  {
    status: 'New this week',
    tone: 'accent',
    price: '$615,000',
    street: '7 Quarry Lane',
    place: 'Quarry Hill. Detached house, 1931',
    beds: '4',
    baths: '2.5',
    sqft: '2,210',
  },
  {
    status: 'For sale',
    tone: 'ink',
    price: '$489,000',
    street: '14 Linden Row',
    place: 'Old Town. Brick row house',
    beds: '3',
    baths: '2',
    sqft: '1,640',
  },
  {
    status: 'For rent',
    tone: 'muted',
    price: '$2,150 a month',
    street: 'Apt 3B, 220 Mill Street',
    place: 'Upper Mill. Loft apartment',
    beds: '2',
    baths: '1',
    sqft: '910',
  },
  {
    status: 'Open house Sat 11-1',
    tone: 'accent',
    price: '$545,000',
    street: '2 Beacon Court',
    place: 'Beacon Park. Corner lot',
    beds: '3',
    baths: '2',
    sqft: '1,820',
  },
  {
    status: 'Pending',
    tone: 'muted',
    price: '$372,500',
    street: '31 Orchard Terrace',
    place: 'Riverside. Townhouse',
    beds: '2',
    baths: '1.5',
    sqft: '1,080',
  },
  {
    status: 'For sale',
    tone: 'ink',
    price: '$739,000',
    street: '9 Ferry Road',
    place: 'Ferry Flats. Half an acre',
    beds: '4',
    baths: '3',
    sqft: '2,650',
  },
  {
    status: 'For rent',
    tone: 'muted',
    price: '$1,675 a month',
    street: 'Unit 12, The Granary',
    place: 'Old Town. Converted granary',
    beds: '1',
    baths: '1',
    sqft: '640',
  },
  {
    status: 'Sold in 9 days',
    tone: 'ink',
    price: '$419,000',
    street: '58 Kiln Street',
    place: 'Upper Mill. Semi-detached',
    beds: '3',
    baths: '1.5',
    sqft: '1,390',
  },
  {
    status: 'Price reduced',
    tone: 'accent',
    price: '$298,000',
    street: '140 Hollis Avenue',
    place: 'Riverside. Ranch, one level',
    beds: '2',
    baths: '1',
    sqft: '1,020',
  },
];

type Agent = {
  initials: string;
  name: string;
  role: string;
  since: string;
  areas: string;
  sold: string;
  days: string;
  phone: string;
  tel: string;
  email: string;
};

const AGENTS: Agent[] = [
  {
    initials: 'DO',
    name: 'Dana Okafor',
    role: 'Broker and owner',
    since: 'Licensed since 2009',
    areas: 'Old Town, Quarry Hill, Beacon Park',
    sold: '41',
    days: '17',
    phone: '(555) 014-2211',
    tel: 'tel:+15550142211',
    email: 'dana@northgatehomes.example',
  },
  {
    initials: 'LF',
    name: 'Luis Ferreira',
    role: 'Listing agent',
    since: 'Licensed since 2016',
    areas: 'Riverside, Ferry Flats, Upper Mill',
    sold: '33',
    days: '21',
    phone: '(555) 014-2212',
    tel: 'tel:+15550142212',
    email: 'luis@northgatehomes.example',
  },
  {
    initials: 'PR',
    name: 'Priya Raman',
    role: 'Rentals and property management',
    since: 'Licensed since 2019',
    areas: 'All of Northgate, 86 homes managed',
    sold: '52',
    days: '11',
    phone: '(555) 014-2213',
    tel: 'tel:+15550142213',
    email: 'priya@northgatehomes.example',
  },
];

const HEADLINES = [
  ['$468,000', 'Median sale price', 'Up 4.1% on a year ago'],
  ['21', 'Median days on market', 'Down from 26'],
  ['99.2%', 'Sale price to asking', 'Most sell within 2% of it'],
  ['$1,980', 'Median rent, 2 bedrooms', 'Up 2.6% on a year ago'],
];

const AREAS = [
  ['Old Town', '$512,000', '+5.3%', '18', '74'],
  ['Upper Mill', '$436,000', '+3.8%', '22', '61'],
  ['Riverside', '$381,000', '+2.9%', '24', '88'],
  ['Quarry Hill', '$598,000', '+6.1%', '16', '39'],
  ['Beacon Park', '$527,000', '+4.4%', '19', '52'],
  ['Ferry Flats', '$664,000', '+1.7%', '31', '23'],
];

type Fee = {
  name: string;
  price: string;
  terms: string;
  items: string[];
};

const FEES: Fee[] = [
  {
    name: 'Full service',
    price: '2.25%',
    terms: 'Of the final sale price, paid at closing. Nothing up front.',
    items: [
      'Valuation and a written pricing plan',
      'Measured floor plan and listing copy',
      'On the MLS and every major portal',
      'Accompanied viewings, seven days a week',
      'Written feedback after every viewing',
      'Offers, inspection and negotiation to closing',
    ],
  },
  {
    name: 'Fixed fee',
    price: '$6,500',
    terms: 'Flat, paid at closing, whatever the home sells for.',
    items: [
      'Valuation and a written pricing plan',
      'Measured floor plan and listing copy',
      'On the MLS and every major portal',
      'You show the home, we book the viewings',
      'Offers, inspection and negotiation to closing',
    ],
  },
  {
    name: 'Renting out',
    price: '1 month',
    terms: 'Of rent to find a tenant, or 9% of rent collected to manage.',
    items: [
      'Rent appraisal and a compliance check',
      'Tenant screening and references',
      'Lease, deposit and move-in inventory',
      'Managed: rent collection and repairs',
      'Managed: two inspections a year',
    ],
  },
];

const TERMS = [
  ['No sale, no fee', 'If the home does not close, you owe us nothing, including for the floor plan.'],
  ['30 days to leave', 'End the listing agreement with 30 days of notice, for any reason, in writing.'],
  ['Buyers pay nothing', 'We are paid by the seller. A buyer never gets a bill from us.'],
];

const HOURS = [
  ['Monday to Friday', '9:00 to 18:00'],
  ['Saturday', '10:00 to 16:00'],
  ['Sunday', 'Viewings by appointment'],
];

export default function NorthgateHomesPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Schibsted+Grotesk:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#listings">Northgate Homes</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550142210">(555) 014-2210</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main>
        {/* -------------------------------------------------------- LISTINGS
            The grid is the front page: a one-line promise, the filter strip,
            and the homes on the books this week. */}
        <section id="listings" className={s.listings} aria-labelledby="listings-h">
          <div className={s.intro}>
            <p className={s.kicker}>Independent real estate, Northgate and the river villages</p>
            <h1 id="listings-h" className={s.title}>
              Homes for sale and rent in Northgate, <em>listed by people who live here.</em>
            </h1>
            <p className={s.lede}>
              Thirty-two homes on our books this week. Every one has been
              measured, visited and priced by one of the three of us, and
              every viewing is with the agent who listed it.
            </p>
          </div>

          <form className={s.filter} action="#" aria-label="Filter listings">
            <fieldset className={s.group}>
              <legend>Looking to</legend>
              <div className={s.chips}>
                {MODES.map((m, i) => (
                  <label key={m} className={s.chip}>
                    <input type="radio" name="mode" value={m} defaultChecked={i === 0} />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={s.group}>
              <legend>Bedrooms</legend>
              <div className={s.chips}>
                {BEDS.map((b, i) => (
                  <label key={b} className={s.chip}>
                    <input type="radio" name="beds" value={b} defaultChecked={i === 0} />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={s.group}>
              <label className={s.selectLabel} htmlFor="price">Price</label>
              <select id="price" name="price" className={s.select} defaultValue={PRICES[0]}>
                {PRICES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <button type="submit" className={s.filterGo}>Show homes</button>
          </form>

          <div className={s.gridHead}>
            <p className={s.count}>Showing 9 of 32 homes</p>
            <p className={s.sort}>Newest first</p>
          </div>

          <ul className={s.grid}>
            {LISTINGS.map((l) => (
              <li key={l.street} className={s.card}>
                <div className={s.photo}>
                  <div className={s.photoField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={isometricblocks}
                      palette={TILE}
                      fit="grid"
                      cellSize={120}
                      seed={`northgate-${l.street}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <span className={`${s.tag} ${s[l.tone]}`}>{l.status}</span>
                </div>
                <div className={s.cardBody}>
                  <p className={s.price}>{l.price}</p>
                  <h3 className={s.street}>{l.street}</h3>
                  <p className={s.place}>{l.place}</p>
                  <dl className={s.specs}>
                    <div>
                      <dt>Beds</dt>
                      <dd>{l.beds}</dd>
                    </div>
                    <div>
                      <dt>Baths</dt>
                      <dd>{l.baths}</dd>
                    </div>
                    <div>
                      <dt>Sq ft</dt>
                      <dd>{l.sqft}</dd>
                    </div>
                  </dl>
                  <a className={s.cardLink} href="#contact">Book a viewing</a>
                </div>
              </li>
            ))}
          </ul>

          <div className={s.more}>
            <p>Twenty-three more homes, and the ones not yet listed, are on the full list.</p>
            <a className={s.moreLink} href="#contact">Ask for the full list</a>
          </div>
        </section>

        {/* ------------------------------------------------------- VALUATION
            The one change of ground on the page, with the facade field
            standing where a photograph of a street would. */}
        <section id="valuation" className={s.valuation} aria-labelledby="valuation-h">
          <div className={s.valInner}>
            <div className={s.valCopy}>
              <p className={s.kicker}>Thinking of selling</p>
              <h2 id="valuation-h" className={s.valTitle}>What is your home worth this month?</h2>
              <p className={s.valLede}>
                A free valuation, in person, within 48 hours. We walk through,
                look at the last six sales on your street, and give you a
                number and a range in writing. No obligation, and no follow-up
                calls unless you ask for them.
              </p>
              <form className={s.valForm} action="#">
                <label className={s.field}>
                  <span>Address</span>
                  <input type="text" name="address" autoComplete="street-address" placeholder="14 Linden Row" />
                </label>
                <label className={s.field}>
                  <span>Phone or email</span>
                  <input type="text" name="reach" placeholder="(555) 000-0000" />
                </label>
                <button type="submit" className={s.button}>Book a valuation</button>
              </form>
            </div>
            <div className={s.valField} aria-hidden="true">
              <TabbiedPattern
                pattern={lintel}
                palette={FACADE}
                fit="grid"
                cellSize={56}
                seed="northgate-facade"
                options={{ frequency: 0.45 }}
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- AGENTS */}
        <section id="agents" className={s.sec} aria-labelledby="agents-h">
          <div className={s.secHead}>
            <h2 id="agents-h">Three agents, one office</h2>
            <p className={s.secNote}>
              You deal with the same person from the valuation to the keys.
              Figures are for the last twelve months.
            </p>
          </div>
          <ul className={s.agents}>
            {AGENTS.map((a) => (
              <li key={a.name} className={s.agent}>
                <span className={s.monogram} aria-hidden="true">{a.initials}</span>
                <h3 className={s.agentName}>{a.name}</h3>
                <p className={s.agentRole}>{a.role}</p>
                <p className={s.agentMeta}>{a.since}</p>
                <p className={s.agentMeta}>{a.areas}</p>
                <dl className={s.agentStats}>
                  <div>
                    <dt>Homes sold or let</dt>
                    <dd>{a.sold}</dd>
                  </div>
                  <div>
                    <dt>Median days to contract</dt>
                    <dd>{a.days}</dd>
                  </div>
                </dl>
                <a className={s.agentLink} href={a.tel}>{a.phone}</a>
                <a className={s.agentLink} href={`mailto:${a.email}`}>{a.email}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- MARKET */}
        <section id="market" className={s.sec} aria-labelledby="market-h">
          <div className={s.secHead}>
            <h2 id="market-h">The Northgate market, August 2026</h2>
            <p className={s.secNote}>
              Closed sales and signed leases from the county records over the
              last twelve months, updated on the first Monday of the month.
            </p>
          </div>
          <dl className={s.headlines}>
            {HEADLINES.map(([v, k, d]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className={s.headValue}>{v}</dd>
                <dd className={s.headNote}>{d}</dd>
              </div>
            ))}
          </dl>
          <table className={s.areas}>
            <caption>By neighborhood</caption>
            <thead>
              <tr>
                <th scope="col">Neighborhood</th>
                <th scope="col">Median price</th>
                <th scope="col">12-month change</th>
                <th scope="col">Days on market</th>
                <th scope="col">Homes sold</th>
              </tr>
            </thead>
            <tbody>
              {AREAS.map(([name, price, change, days, sold]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>
                    <span className={s.cellLabel}>Median price</span>
                    <span>{price}</span>
                  </td>
                  <td>
                    <span className={s.cellLabel}>12-month change</span>
                    <span>{change}</span>
                  </td>
                  <td>
                    <span className={s.cellLabel}>Days on market</span>
                    <span>{days}</span>
                  </td>
                  <td>
                    <span className={s.cellLabel}>Homes sold</span>
                    <span>{sold}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <h2 id="fees-h">What selling or renting with us costs</h2>
            <p className={s.secNote}>
              Three ways to work with us, written down before you sign
              anything. Fees are plus state sales tax where it applies.
            </p>
          </div>
          <div className={s.fees}>
            {FEES.map((f) => (
              <div key={f.name} className={s.fee}>
                <h3 className={s.feeName}>{f.name}</h3>
                <p className={s.feePrice}>{f.price}</p>
                <p className={s.feeTerms}>{f.terms}</p>
                <ul className={s.feeList}>
                  {f.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <dl className={s.terms}>
            {TERMS.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.secHead}>
            <h2 id="contact-h">Call, write, or come in</h2>
            <p className={s.secNote}>
              The office is on Market Street, opposite the library. We answer
              the phone ourselves and reply to email the same working day.
            </p>
          </div>
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <h3 className={s.smallHead}>Office</h3>
              <p className={s.address}>
                212 Market Street
                <br />
                Northgate
              </p>
              <a className={s.bigLink} href="tel:+15550142210">(555) 014-2210</a>
              <a className={s.bigLink} href="mailto:hello@northgatehomes.example">hello@northgatehomes.example</a>
              <h3 className={s.smallHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.parking}>Free parking behind the building, entrance on Cooper Lane.</p>
            </div>
            <form className={s.contactForm} action="#">
              <label className={s.field}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span>Email or phone</span>
                <input type="text" name="reach" autoComplete="email" />
              </label>
              <label className={s.field}>
                <span>I would like to</span>
                <select name="topic" defaultValue="Buy">
                  <option value="Buy">Buy a home</option>
                  <option value="Sell">Sell a home</option>
                  <option value="Rent">Rent a home</option>
                  <option value="Let">Rent out a home</option>
                  <option value="Value">Book a valuation</option>
                </select>
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span>Message</span>
                <textarea name="message" rows={4} placeholder="The address, or what you are looking for" />
              </label>
              <button type="submit" className={s.button}>Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Northgate Homes</p>
            <p className={s.footTag}>Independent real estate in Northgate and the river villages, since 2009.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p className={s.footAddr}>
            212 Market Street, Northgate
            <br />
            (555) 014-2210
            <br />
            hello@northgatehomes.example
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional real estate agency. Listings, prices, people and market figures are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the site's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
