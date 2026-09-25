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
const FACADE = ['transparent', BRICK, SLATE, INK, SLATE, BRICK];

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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f4f1',
        '--ink': '#1b1d22',
        '--brick': '#b5523b',
        '--slate': '#858a92',
        '--pale': '#e3e1dc',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,brick,slate,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Schibsted+Grotesk:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#listings">Northgate Homes</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barPhone" data-edit-max="28" className={s.barPhone} href="tel:+15550142210">(555) 014-2210</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main>
        {/* -------------------------------------------------------- LISTINGS
            The grid is the front page: a one-line promise, the filter strip,
            and the homes on the books this week. */}
        <section id="listings" className={s.listings} aria-labelledby="listings-h">
          <div className={s.intro}>
            <p data-edit="listings.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Independent real estate, Northgate and the river villages</p>
            <h1 data-edit="listings.title" data-edit-format="emphasis" data-edit-max="70" id="listings-h" className={s.title}>
              Homes for sale and rent in Northgate, <em>listed by people who live here.</em>
            </h1>
            <p data-edit="listings.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Thirty-two homes on our books this week. Every one has been
              measured, visited and priced by one of the three of us, and
              every viewing is with the agent who listed it.
            </p>
          </div>

          <form className={s.filter} action="#" aria-label="Filter listings">
            <fieldset className={s.group}>
              <legend data-edit="listings.legend">Looking to</legend>
              <div className={s.chips}>
                {MODES.map((m, i) => (
                  <label key={m} className={s.chip}>
                    <input type="radio" name="mode" value={m} defaultChecked={i === 0} />
                    <span data-edit={`listings.text.${i}`} data-edit-max="60">{m}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={s.group}>
              <legend data-edit="listings.legend2">Bedrooms</legend>
              <div className={s.chips}>
                {BEDS.map((b, i) => (
                  <label key={b} className={s.chip}>
                    <input type="radio" name="beds" value={b} defaultChecked={i === 0} />
                    <span data-edit={`listings.text2.${i}`} data-edit-max="60">{b}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={s.group}>
              <label data-edit="listings.selectLabel" className={s.selectLabel} htmlFor="price">Price</label>
              <select id="price" name="price" className={s.select} defaultValue={PRICES[0]}>
                {PRICES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <button data-edit="listings.filterGo" data-edit-max="24" type="submit" className={s.filterGo}>Show homes</button>
          </form>

          <div className={s.gridHead}>
            <p data-edit="listings.count" data-edit-max="240" data-edit-multiline className={s.count}>Showing 9 of 32 homes</p>
            <p data-edit="listings.sort" data-edit-max="240" data-edit-multiline className={s.sort}>Newest first</p>
          </div>

          <ul className={s.grid}>
            {LISTINGS.map((l, i) => (
              <li key={l.street} className={s.card}>
                <div className={s.photo}>
                  <div data-edit-pattern={`listings.field.${i}`} data-edit-roles="transparent,0,4,3" className={s.photoField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={isometricblocks}
                      palette={TILE}
                      fit="grid"
                      cellSize={120}
                      seed={`northgate-${l.street}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <span data-edit={`listings.tag.${i}`} data-edit-max="60" className={`${s.tag} ${s[l.tone]}`}>{l.status}</span>
                </div>
                <div className={s.cardBody}>
                  <p data-edit={`listings.price.${i}`} data-edit-max="240" data-edit-multiline className={s.price}>{l.price}</p>
                  <h3 data-edit={`listings.street.${i}`} data-edit-max="40" className={s.street}>{l.street}</h3>
                  <p data-edit={`listings.place.${i}`} data-edit-max="240" data-edit-multiline className={s.place}>{l.place}</p>
                  <dl className={s.specs}>
                    <div>
                      <dt data-edit={`listings.term.${i}`} data-edit-max="28">Beds</dt>
                      <dd data-edit={`listings.body.${i}`} data-edit-max="200" data-edit-multiline>{l.beds}</dd>
                    </div>
                    <div>
                      <dt data-edit={`listings.term2.${i}`} data-edit-max="28">Baths</dt>
                      <dd data-edit={`listings.body2.${i}`} data-edit-max="200" data-edit-multiline>{l.baths}</dd>
                    </div>
                    <div>
                      <dt data-edit={`listings.term3.${i}`} data-edit-max="28">Sq ft</dt>
                      <dd data-edit={`listings.body3.${i}`} data-edit-max="200" data-edit-multiline>{l.sqft}</dd>
                    </div>
                  </dl>
                  <a data-edit={`listings.cardLink.${i}`} data-edit-max="28" className={s.cardLink} href="#contact">Book a viewing</a>
                </div>
              </li>
            ))}
          </ul>

          <div className={s.more}>
            <p data-edit="listings.body4" data-edit-max="240" data-edit-multiline>Twenty-three more homes, and the ones not yet listed, are on the full list.</p>
            <a data-edit="listings.moreLink" data-edit-max="28" className={s.moreLink} href="#contact">Ask for the full list</a>
          </div>
        </section>

        {/* ------------------------------------------------------- VALUATION
            The one change of ground on the page, with the facade field
            standing where a photograph of a street would. */}
        <section id="valuation" className={s.valuation} aria-labelledby="valuation-h">
          <div className={s.valInner}>
            <div className={s.valCopy}>
              <p data-edit="valuation.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Thinking of selling</p>
              <h2 data-edit="valuation.valTitle" data-edit-max="60" id="valuation-h" className={s.valTitle}>What is your home worth this month?</h2>
              <p data-edit="valuation.valLede" data-edit-max="240" data-edit-multiline className={s.valLede}>
                A free valuation, in person, within 48 hours. We walk through,
                look at the last six sales on your street, and give you a
                number and a range in writing. No obligation, and no follow-up
                calls unless you ask for them.
              </p>
              <form className={s.valForm} action="#">
                <label className={s.field}>
                  <span data-edit="valuation.text" data-edit-max="60">Address</span>
                  <input type="text" name="address" autoComplete="street-address" placeholder="14 Linden Row" />
                </label>
                <label className={s.field}>
                  <span data-edit="valuation.text2" data-edit-max="60">Phone or email</span>
                  <input type="text" name="reach" placeholder="(555) 000-0000" />
                </label>
                <button data-edit="valuation.button" data-edit-max="24" type="submit" className={s.button}>Book a valuation</button>
              </form>
            </div>
            <div data-edit-pattern="valuation.field" data-edit-roles="transparent,2,3,1,3,2" className={s.valField} aria-hidden="true">
              <TabbiedPattern
                pattern={lintel}
                palette={FACADE}
                fit="grid"
                cellSize={56}
                seed="northgate-facade"
                options={{ frequency: 0.35 }}
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- AGENTS */}
        <section id="agents" className={s.sec} aria-labelledby="agents-h">
          <div className={s.secHead}>
            <h2 data-edit="agents.title" data-edit-max="60" id="agents-h">Three agents, one office</h2>
            <p data-edit="agents.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              You deal with the same person from the valuation to the keys.
              Figures are for the last twelve months.
            </p>
          </div>
          <ul className={s.agents}>
            {AGENTS.map((a, i) => (
              <li key={a.name} className={s.agent}>
                <span className={s.monogram} aria-hidden="true">{a.initials}</span>
                <h3 data-edit={`agents.agentName.${i}`} data-edit-max="40" className={s.agentName}>{a.name}</h3>
                <p data-edit={`agents.agentRole.${i}`} data-edit-max="240" data-edit-multiline className={s.agentRole}>{a.role}</p>
                <p data-edit={`agents.agentMeta.${i}`} data-edit-max="240" data-edit-multiline className={s.agentMeta}>{a.since}</p>
                <p data-edit={`agents.agentMeta2.${i}`} data-edit-max="240" data-edit-multiline className={s.agentMeta}>{a.areas}</p>
                <dl className={s.agentStats}>
                  <div>
                    <dt data-edit={`agents.term.${i}`} data-edit-max="28">Homes sold or let</dt>
                    <dd data-edit={`agents.body.${i}`} data-edit-max="200" data-edit-multiline>{a.sold}</dd>
                  </div>
                  <div>
                    <dt data-edit={`agents.term2.${i}`} data-edit-max="28">Median days to contract</dt>
                    <dd data-edit={`agents.body2.${i}`} data-edit-max="200" data-edit-multiline>{a.days}</dd>
                  </div>
                </dl>
                <a data-edit={`agents.agentLink.${i}`} data-edit-max="28" className={s.agentLink} href={a.tel}>{a.phone}</a>
                <a data-edit={`agents.agentLink2.${i}`} data-edit-max="28" className={s.agentLink} href={`mailto:${a.email}`}>{a.email}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- MARKET */}
        <section id="market" className={s.sec} aria-labelledby="market-h">
          <div className={s.secHead}>
            <h2 data-edit="market.title" data-edit-max="60" id="market-h">The Northgate market, August 2026</h2>
            <p data-edit="market.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Closed sales and signed leases from the county records over the
              last twelve months, updated on the first Monday of the month.
            </p>
          </div>
          <dl className={s.headlines}>
            {HEADLINES.map(([v, k, d], i) => (
              <div key={k}>
                <dt data-edit={`market.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`market.headValue.${i}`} data-edit-max="200" data-edit-multiline className={s.headValue}>{v}</dd>
                <dd data-edit={`market.headNote.${i}`} data-edit-max="200" data-edit-multiline className={s.headNote}>{d}</dd>
              </div>
            ))}
          </dl>
          <table className={s.areas}>
            <caption data-edit="market.caption">By neighborhood</caption>
            <thead>
              <tr>
                <th data-edit="market.heading" scope="col">Neighborhood</th>
                <th data-edit="market.heading2" scope="col">Median price</th>
                <th data-edit="market.heading3" scope="col">12-month change</th>
                <th data-edit="market.heading4" scope="col">Days on market</th>
                <th data-edit="market.heading5" scope="col">Homes sold</th>
              </tr>
            </thead>
            <tbody>
              {AREAS.map(([name, price, change, days, sold], i) => (
                <tr key={name}>
                  <th data-edit={`market.heading6.${i}`} scope="row">{name}</th>
                  <td>
                    <span data-edit={`market.cellLabel.${i}`} data-edit-max="60" className={s.cellLabel}>Median price</span>
                    <span data-edit={`market.text.${i}`} data-edit-max="60">{price}</span>
                  </td>
                  <td>
                    <span data-edit={`market.cellLabel2.${i}`} data-edit-max="60" className={s.cellLabel}>12-month change</span>
                    <span data-edit={`market.text2.${i}`} data-edit-max="60">{change}</span>
                  </td>
                  <td>
                    <span data-edit={`market.cellLabel3.${i}`} data-edit-max="60" className={s.cellLabel}>Days on market</span>
                    <span data-edit={`market.text3.${i}`} data-edit-max="60">{days}</span>
                  </td>
                  <td>
                    <span data-edit={`market.cellLabel4.${i}`} data-edit-max="60" className={s.cellLabel}>Homes sold</span>
                    <span data-edit={`market.text4.${i}`} data-edit-max="60">{sold}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <h2 data-edit="fees.title" data-edit-max="60" id="fees-h">What selling or renting with us costs</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three ways to work with us, written down before you sign
              anything. Fees are plus state sales tax where it applies.
            </p>
          </div>
          <div className={s.fees}>
            {FEES.map((f, i) => (
              <div key={f.name} className={s.fee}>
                <h3 data-edit={`fees.feeName.${i}`} data-edit-max="40" className={s.feeName}>{f.name}</h3>
                <p data-edit={`fees.feePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.feePrice}>{f.price}</p>
                <p data-edit={`fees.feeTerms.${i}`} data-edit-max="240" data-edit-multiline className={s.feeTerms}>{f.terms}</p>
                <ul className={s.feeList}>
                  {f.items.map((item, i2) => (
                    <li data-edit={`fees.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <dl className={s.terms}>
            {TERMS.map(([t, d], i) => (
              <div key={t}>
                <dt data-edit={`fees.term.${i}`} data-edit-max="28">{t}</dt>
                <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.secHead}>
            <h2 data-edit="contact.title" data-edit-max="60" id="contact-h">Call, write, or come in</h2>
            <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The office is on Market Street, opposite the library. We answer
              the phone ourselves and reply to email the same working day.
            </p>
          </div>
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <h3 data-edit="contact.smallHead" data-edit-max="40" className={s.smallHead}>Office</h3>
              <p data-edit="contact.body" data-edit-max="240" data-edit-multiline className={s.address}>
                212 Market Street
                <br />
                Northgate
              </p>
              <a data-edit="contact.bigLink" data-edit-max="28" className={s.bigLink} href="tel:+15550142210">(555) 014-2210</a>
              <a data-edit="contact.bigLink2" data-edit-max="28" className={s.bigLink} href="mailto:hello@northgatehomes.example">hello@northgatehomes.example</a>
              <h3 data-edit="contact.smallHead2" data-edit-max="40" className={s.smallHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="contact.parking" data-edit-max="240" data-edit-multiline className={s.parking}>Free parking behind the building, entrance on Cooper Lane.</p>
            </div>
            <form className={s.contactForm} action="#">
              <label className={s.field}>
                <span data-edit="contact.text" data-edit-max="60">Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span data-edit="contact.text2" data-edit-max="60">Email or phone</span>
                <input type="text" name="reach" autoComplete="email" />
              </label>
              <label className={s.field}>
                <span data-edit="contact.text3" data-edit-max="60">I would like to</span>
                <select name="topic" defaultValue="Buy">
                  <option value="Buy">Buy a home</option>
                  <option value="Sell">Sell a home</option>
                  <option value="Rent">Rent a home</option>
                  <option value="Let">Rent out a home</option>
                  <option value="Value">Book a valuation</option>
                </select>
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span data-edit="contact.text4" data-edit-max="60">Message</span>
                <textarea name="message" rows={4} placeholder="The address, or what you are looking for" />
              </label>
              <button data-edit="contact.button" data-edit-max="24" type="submit" className={s.button}>Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Northgate Homes</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Independent real estate in Northgate and the river villages, since 2009.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
            212 Market Street, Northgate
            <br />
            (555) 014-2210
            <br />
            hello@northgatehomes.example
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional real estate agency. Listings, prices, people and market figures are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the site's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
