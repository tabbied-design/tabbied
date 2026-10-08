import { TabbiedPattern } from 'tabbied/react';
import { jerkinhead } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './gablewise-property.module.css';

export const metadata = {
  title: 'Gablewise Property Management: Rentals looked after in Eastgate and the river wards',
  description:
    'Gablewise manages 340 rented homes for small landlords. Owners get a flat 8 percent fee and a statement on the 10th; tenants get one phone number that answers, and repairs that are tracked from the first call.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The jerkinhead
   is the firm's street: clipped gables, the roofline of the old river wards,
   in door red, brass, shutter teal and limewash. It is the wall the two front
   doors are set into in the hero, the roofline over the repairs desk and the
   eaves along the footer. */
const STONE = '#eeebe4';
const SLATE = '#1e2a35';
const DOOR = '#b23b30';
const BRASS = '#e0b44a';
const TEAL = '#2f7472';

const WALL = ['transparent', DOOR, BRASS, TEAL, BRASS, DOOR];
const STREET = ['transparent', SLATE, DOOR, BRASS, TEAL, SLATE];
const EAVES = ['transparent', STONE, BRASS, TEAL, DOOR, BRASS];

const NAV = [
  ['Owners', '#owners'],
  ['Tenants', '#tenants'],
  ['Fees', '#fees'],
  ['Repairs', '#repairs'],
  ['Apply', '#apply'],
  ['Contact', '#contact'],
];

const OWNER_DOOR = [
  'Tenants found, screened and signed',
  'Rent in your account by the 10th',
  'Repairs approved by you over $400',
];

const TENANT_DOOR = [
  'Pay rent online, no card fee by bank transfer',
  'Report a repair at any hour',
  'One named manager for your home',
];

type Service = { title: string; body: string };

const OWNER_SERVICES: Service[] = [
  { title: 'A rent you can defend', body: 'Before we list, we price the home against the last ninety days of leases within half a mile, and show you the comparables.' },
  { title: 'Screening on paper', body: 'Income, rental history, a credit report and a landlord reference for every adult. Our criteria are written down and the same for everyone.' },
  { title: 'Statements on the 10th', body: 'One page per property: rent received, every invoice attached, the balance sent to your bank. A year-end summary for your accountant in January.' },
  { title: 'Two inspections a year', body: 'A walk-through with photographs each spring and autumn, plus the move-in and move-out reports that decide a deposit.' },
  { title: 'Vendors at their own price', body: 'Licensed, insured trades we have used for years. You pay their invoice as written; we add no markup to any repair.' },
  { title: 'The hard letters', body: 'Late notices, lease violations and, rarely, an eviction, handled by the book and with you told at every step.' },
];

const TENANT_SERVICES: Service[] = [
  { title: 'Paying rent', body: 'Due on the 1st, late after the 5th. Bank transfer through the resident portal is free; a card costs what the card company charges, 2.9 percent.' },
  { title: 'Asking for a repair', body: 'Use the portal and add a photo, or call. You get a ticket number straight away and a text at each stage, so you never have to chase.' },
  { title: 'Renewing your lease', body: 'We write to you 75 days before the lease ends with the new rent, if any, and the reason for it. Renewing costs you nothing.' },
  { title: 'Moving out', body: 'Give 30 days notice in writing. We send a move-out checklist, walk the home with you if you like, and return the deposit within 21 days.' },
];

type Fee = { name: string; amount: string; when: string };

const FEES: Fee[] = [
  { name: 'Monthly management', amount: '8% of rent collected', when: 'Only in months the rent arrives' },
  { name: 'Finding a tenant', amount: 'Half of one month\'s rent', when: 'Once, when the lease is signed' },
  { name: 'Lease renewal', amount: '$200', when: 'When a tenant signs on for another year' },
  { name: 'Setting up a new property', amount: '$0', when: 'Never charged' },
  { name: 'Vacancy', amount: '$0', when: 'We earn nothing while a home is empty' },
  { name: 'Spring and autumn inspections', amount: 'Included', when: 'With photographs, in your portal' },
  { name: 'Markup on repairs', amount: 'None', when: 'You pay the vendor\'s invoice as written' },
  { name: 'Eviction coordination', amount: '$350 plus court costs', when: 'Only if it comes to that' },
  { name: 'Leaving Gablewise', amount: '$0, 30 days notice', when: 'No term, no cancellation fee' },
];

type Stop = { time: string; title: string; body: string };

/* How a repair request travels, from the tenant's first message to the
   invoice on the owner's statement. */
const ROUTE: Stop[] = [
  { time: '0:00', title: 'Reported', body: 'Through the portal with a photo, or by phone. A ticket number goes back by text.' },
  { time: 'within 2 hrs', title: 'Triaged', body: 'Your manager sorts it: emergency, urgent within 48 hours, or routine within a week.' },
  { time: 'same day', title: 'Vendor booked', body: 'The right trade is booked and the tenant chooses a visit window that suits them.' },
  { time: 'over $400', title: 'Owner asked', body: 'Anything over your limit waits for your yes, with the quote and photos attached.' },
  { time: 'on the visit', title: 'Fixed', body: 'The vendor closes the ticket with before and after photographs.' },
  { time: 'on the 10th', title: 'On the statement', body: 'The invoice, unmarked-up, appears on the owner statement beside the rent.' },
];

const STEPS: Service[] = [
  { title: 'See the home', body: 'Book a showing from the listing, weekday evenings or Saturday mornings. Self-guided tours with a lockbox code for most vacant homes.' },
  { title: 'Apply online', body: 'One application per adult who will live there, $40 each, covering the credit and background check. Takes about fifteen minutes.' },
  { title: 'We check, in two working days', body: 'We call your employer and your current landlord. You hear back in writing either way, with the reason if it is no.' },
  { title: 'Hold it with a deposit', body: 'A holding deposit of $300 takes the home off the market for seven days and is credited to your first month.' },
  { title: 'Sign and get the keys', body: 'Lease signed online, first month and security deposit paid, a move-in walk-through together, and the keys are yours.' },
];

const CRITERIA = [
  'Household income of two and a half times the rent',
  'No eviction judgment in the last five years',
  'A good reference from your current or last landlord',
  'Pets welcome in most homes, $35 a month per pet',
  'Housing vouchers accepted at every property',
];

const HOURS = [
  ['Monday to Friday', '8:30-5:30'],
  ['Saturday', '9:00-1:00, showings only'],
  ['Emergency repairs', 'Every hour of every day'],
];

export default function GablewisePropertyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stone': '#eeebe4',
        '--slate': '#1e2a35',
        '--door': '#b23b30',
        '--brass': '#e0b44a',
        '--teal': '#2f7472',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stone,slate,door,brass,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Gablewise</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Property Management</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550142290">Repairs: (555) 014-2290</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroHead}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Residential property management, Eastgate and the river wards, since 2009</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              One building, <em>two front doors.</em>
            </h1>
            <div className={s.heroAside}>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Gablewise looks after 340 rented homes for small landlords. The
                owner gets a fair rent and a clean statement. The tenant gets a
                phone that answers and a repair that is tracked. We work for
                both sides of the door, and say so.
              </p>
              <dl className={s.heroFacts}>
                <div>
                  <dt data-edit="hero.term" data-edit-max="28">Homes managed</dt>
                  <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>340</dd>
                </div>
                <div>
                  <dt data-edit="hero.term2" data-edit-max="28">Average tenancy</dt>
                  <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>3.4 yrs</dd>
                </div>
                <div>
                  <dt data-edit="hero.term3" data-edit-max="28">Repairs closed in 7 days</dt>
                  <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>91%</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className={s.facade}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,3,2" className={s.wall} aria-hidden="true">
              <TabbiedPattern
                pattern={jerkinhead}
                palette={WALL}
                fit="grid"
                cellSize={58}
                options={{ frequency: 0.85 }}
                seed="gablewise-wall"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.doors}>
              <div className={s.door}>
                <p data-edit="hero.plaque" data-edit-max="240" data-edit-multiline className={s.plaque}>No. 1</p>
                <h2 data-edit="hero.doorTitle" data-edit-max="60" className={s.doorTitle}>I own a rental</h2>
                <p data-edit="hero.doorText" data-edit-max="240" data-edit-multiline className={s.doorText}>Hand us the keys and the paperwork. Keep the say on anything that costs real money.</p>
                <ul className={s.doorList}>
                  {OWNER_DOOR.map((item, i) => (
                    <li data-edit={`hero.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <a data-edit="hero.doorButton" data-edit-max="28" className={s.doorButton} href="#owners">For owners</a>
              </div>
              <div className={s.door}>
                <p data-edit="hero.plaque2" data-edit-max="240" data-edit-multiline className={s.plaque}>No. 2</p>
                <h2 data-edit="hero.doorTitle2" data-edit-max="60" className={s.doorTitle}>I rent a home</h2>
                <p data-edit="hero.doorText2" data-edit-max="240" data-edit-multiline className={s.doorText}>Live in a Gablewise home, or want to? Everything you need is behind this door.</p>
                <ul className={s.doorList}>
                  {TENANT_DOOR.map((item, i) => (
                    <li data-edit={`hero.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <a data-edit="hero.doorButton2" data-edit-max="28" className={s.doorButton} href="#tenants">For tenants</a>
              </div>
            </div>
            <div className={s.step} aria-hidden="true" />
          </div>
        </section>

        <div className={s.sides}>
          <section id="owners" className={s.side} aria-labelledby="owners-h">
            <p data-edit="owners.sideLabel" data-edit-max="240" data-edit-multiline className={s.sideLabel}>Door 1</p>
            <h2 data-edit="owners.sideTitle" data-edit-max="60" id="owners-h" className={s.sideTitle}>For owners</h2>
            <p data-edit="owners.sideLead" data-edit-max="240" data-edit-multiline className={s.sideLead}>
              Most of our owners have one to four homes and a day job. We run the
              rental as if it were ours, and you can see everything we do in the
              owner portal.
            </p>
            <ul className={s.services}>
              {OWNER_SERVICES.map((item, i) => (
                <li key={item.title}>
                  <h3 data-edit={`owners.title.${i}`} data-edit-max="40">{item.title}</h3>
                  <p data-edit={`owners.body.${i}`} data-edit-max="240" data-edit-multiline>{item.body}</p>
                </li>
              ))}
            </ul>
            <a data-edit="owners.sideButton" data-edit-max="28" className={s.sideButton} href="#contact">Ask for a rental analysis</a>
          </section>

          <section id="tenants" className={`${s.side} ${s.sideTenant}`} aria-labelledby="tenants-h">
            <p data-edit="tenants.sideLabel" data-edit-max="240" data-edit-multiline className={s.sideLabel}>Door 2</p>
            <h2 data-edit="tenants.sideTitle" data-edit-max="60" id="tenants-h" className={s.sideTitle}>For tenants</h2>
            <p data-edit="tenants.sideLead" data-edit-max="240" data-edit-multiline className={s.sideLead}>
              You are the person who lives there. You get a named manager, a
              straight answer, and the same rules whoever owns your building.
            </p>
            <ul className={s.services}>
              {TENANT_SERVICES.map((item, i) => (
                <li key={item.title}>
                  <h3 data-edit={`tenants.title.${i}`} data-edit-max="40">{item.title}</h3>
                  <p data-edit={`tenants.body.${i}`} data-edit-max="240" data-edit-multiline>{item.body}</p>
                </li>
              ))}
            </ul>
            <div className={s.emergency}>
              <h3 data-edit="tenants.emergencyTitle" data-edit-max="40" className={s.emergencyTitle}>Emergency, day or night</h3>
              <p data-edit="tenants.emergencyText" data-edit-max="240" data-edit-multiline className={s.emergencyText}>Water coming through a ceiling, a gas smell, no heat below 55 degrees, a door that will not lock.</p>
              <p className={s.emergencyLine}>
                <a data-edit="tenants.link" data-edit-max="28" href="tel:+15550142290">(555) 014-2290</a>
              </p>
            </div>
          </section>
        </div>

        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.feesGrid}>
            <div className={s.secHead}>
              <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Every fee we charge owners</h2>
              <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                This is the whole list. If it is not on this table, we do not
                charge it, and the agreement says the same in fewer words.
              </p>
              <div className={s.example}>
                <h3 data-edit="fees.exampleTitle" data-edit-max="40" className={s.exampleTitle}>A worked month</h3>
                <dl className={s.exampleRows}>
                  <div>
                    <dt data-edit="fees.term" data-edit-max="28">Rent received</dt>
                    <dd data-edit="fees.body" data-edit-max="200" data-edit-multiline>$1,850.00</dd>
                  </div>
                  <div>
                    <dt data-edit="fees.term2" data-edit-max="28">Management, 8%</dt>
                    <dd data-edit="fees.body2" data-edit-max="200" data-edit-multiline>- $148.00</dd>
                  </div>
                  <div>
                    <dt data-edit="fees.term3" data-edit-max="28">Faucet repair, at the plumber invoice</dt>
                    <dd data-edit="fees.body3" data-edit-max="200" data-edit-multiline>- $165.00</dd>
                  </div>
                  <div className={s.exampleTotal}>
                    <dt data-edit="fees.term4" data-edit-max="28">Sent to you on the 10th</dt>
                    <dd data-edit="fees.body4" data-edit-max="200" data-edit-multiline>$1,537.00</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className={s.tableWrap}>
              <table className={s.fees}>
                <caption data-edit="fees.srOnly" className={s.srOnly}>Fees charged to property owners</caption>
                <thead>
                  <tr>
                    <th data-edit="fees.heading" scope="col">Fee</th>
                    <th data-edit="fees.heading2" scope="col">Amount</th>
                    <th data-edit="fees.heading3" scope="col">When</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((fee, i) => (
                    <tr key={fee.name}>
                      <th data-edit={`fees.heading4.${i}`} scope="row">{fee.name}</th>
                      <td data-edit={`fees.amount.${i}`} className={s.amount}>{fee.amount}</td>
                      <td data-edit={`fees.cell.${i}`}>{fee.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4,1" className={s.roofline} aria-hidden="true">
          <TabbiedPattern
            pattern={jerkinhead}
            palette={STREET}
            fit="grid"
            cellSize={44}
            seed="gablewise-roofline"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="repairs" className={s.repairs} aria-labelledby="repairs-h">
          <div className={s.repairsInner}>
            <div className={s.repairsHead}>
              <h2 data-edit="repairs.repairsTitle" data-edit-max="60" id="repairs-h" className={s.repairsTitle}>How a repair request travels</h2>
              <p data-edit="repairs.repairsLead" data-edit-max="240" data-edit-multiline className={s.repairsLead}>
                Every request is a ticket with a number, and both the tenant and
                the owner can see where it is. Here is a dripping kitchen faucet,
                from the first message to the statement.
              </p>
            </div>
            <ol className={s.route}>
              {ROUTE.map((stop, i) => (
                <li key={stop.title} className={s.stop}>
                  <span className={s.stopNo}>{i + 1}</span>
                  <p data-edit={`repairs.stopTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stopTime}>{stop.time}</p>
                  <h3 data-edit={`repairs.stopTitle.${i}`} data-edit-max="40" className={s.stopTitle}>{stop.title}</h3>
                  <p data-edit={`repairs.stopBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stopBody}>{stop.body}</p>
                </li>
              ))}
            </ol>
            <p data-edit="repairs.repairsNote" data-edit-max="240" data-edit-multiline className={s.repairsNote}>Last year: 2,316 tickets, a median of 3 days from report to fixed, and 41 emergencies answered within the hour.</p>
          </div>
        </section>

        <section id="apply" className={s.sec} aria-labelledby="apply-h">
          <div className={s.applyGrid}>
            <div>
              <h2 data-edit="apply.secTitle" data-edit-max="60" id="apply-h" className={s.secTitle}>Renting from us, in five steps</h2>
              <p data-edit="apply.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                From the first showing to the keys usually takes eight to twelve
                days. Nothing is decided by a computer alone; a person reads every
                application.
              </p>
              <ol className={s.steps}>
                {STEPS.map((step, i) => (
                  <li key={step.title}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <div>
                      <h3 data-edit={`apply.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{step.title}</h3>
                      <p data-edit={`apply.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <aside className={s.criteria} aria-labelledby="criteria-h">
              <div data-edit-pattern="criteria.field" data-edit-roles="transparent,1,2,3,4,1" className={s.criteriaRoof} aria-hidden="true">
                <TabbiedPattern
                  pattern={jerkinhead}
                  palette={STREET}
                  fit="grid"
                  cellSize={36}
                  seed="gablewise-criteria"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.criteriaBody}>
                <h3 data-edit="criteria.criteriaTitle" data-edit-max="40" id="criteria-h" className={s.criteriaTitle}>What we look for</h3>
                <ul className={s.criteriaList}>
                  {CRITERIA.map((item, i) => (
                    <li data-edit={`criteria.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <p data-edit="criteria.criteriaNote" data-edit-max="240" data-edit-multiline className={s.criteriaNote}>We follow fair housing law in every decision, and we will tell you which criterion an application missed.</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>The office on Weir Street</h2>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>58 Weir Street, Eastgate</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Ground floor of the old ropeworks, two doors down from the library. Parking in the yard.</p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550142200">Office: (555) 014-2200</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@gablewise.example">hello@gablewise.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <fieldset className={s.who}>
                <legend data-edit="contact.legend">I am</legend>
                <span className={s.whoPick}>
                  <input id="gw-owner" type="radio" name="who" value="owner" />
                  <label data-edit="contact.label" htmlFor="gw-owner">An owner</label>
                </span>
                <span className={s.whoPick}>
                  <input id="gw-tenant" type="radio" name="who" value="tenant" />
                  <label data-edit="contact.label2" htmlFor="gw-tenant">A tenant</label>
                </span>
                <span className={s.whoPick}>
                  <input id="gw-applicant" type="radio" name="who" value="applicant" />
                  <label data-edit="contact.label3" htmlFor="gw-applicant">Looking to rent</label>
                </span>
              </fieldset>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="gw-name">Name</label>
                <input id="gw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="gw-email">Email</label>
                <input id="gw-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="gw-address">Property address, if you have one</label>
                <input id="gw-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label7" htmlFor="gw-note">How can we help</label>
                <textarea id="gw-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to the office</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>For a repair, use the portal or call the repairs line, so it gets a ticket.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,3,4,2,3" className={s.footEaves} aria-hidden="true">
          <TabbiedPattern
            pattern={jerkinhead}
            palette={EAVES}
            fit="grid"
            cellSize={32}
            seed="gablewise-eaves"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Gablewise Property Management</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional property manager. The names, homes, fees and address are invented, and nothing here is legal or financial advice.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
